---
entities: [ConfigEntry]
menu: Administration → Settings → System Settings
---

# Two-Factor Authentication (2FA) Guide

## Overview

Two-Factor Authentication (2FA) adds an extra layer of security to the Nama ERP login process by requiring users to provide a second form of verification beyond their username and password. This feature supports multiple authentication methods and provides flexible configuration options for system administrators.

## Supported Authentication Methods

### 1. Message OTP (One-Time Password)
Uses the configured notification template which can send OTP codes through multiple channels:
- **SMS**: Send OTP codes via SMS to the user's registered mobile number
- **Email**: Send OTP codes to the user's registered email address  
- **WhatsApp**: Send OTP codes via WhatsApp messaging
- **In-App Notifications**: Display OTP within the application's notification system

### 2. Estidamah API Integration
Custom authentication provider integration for organizations using the Estidamah authentication gateway. This method:
- Encrypts credentials using configured encryption keys
- Sends encrypted data to the Estidamah authentication gateway
- Gateway handles OTP delivery to users
- Validates OTP through the integrated API

### 3. None
Disables 2FA (not recommended for production environments)

## Who is never asked for a code

Even with 2FA on, three cases go straight through, and every "why was I not asked?" question ends in one of them:

- the **admin** user;
- a user whose own record has **Exclude From Two-Factor Authentication** ticked;
- a session that already validated its code — the validated code is remembered, so the calls that follow the login do not re-ask.

## Configuration Settings

### Access Login Settings
Open **Administration → Settings → System Settings**, choose the **Global Configurations** file,
then the **Security And Login** tab — the settings are in its **Two-Factor Authentication** group.

![The Two-Factor Authentication group on the Security And Login tab of Global Configurations](../ar/getting-started/images/global-config-2fa-method-en.png)

### Configuration Validation Rules

The system enforces the following validation rules when configuring 2FA:

1. **Message OTP Method Requirements**:
   - **Notification Template**: You must select a notification definition for sending OTP codes
   - Error message if not configured: *"Can not select the option Message OTP without fill Notification For Two-Factor Authentication OTP"*

2. **Estidamah API Method Requirements**:
   - The method needs **four** settings — **Estidamah Environment Url**, **Estidamah Api Key**, **Estidamah Encryption Key** and **Estidamah Encryption IV**. Three of them are checked when you save; the **Api Key** is not, so a configuration missing it saves cleanly and then fails at the gateway on the first login attempt. Fill all four.
   - **Custom Password Validator**: Must be enabled in `nama.properties`
   - Error if not enabled: *"You can not enable estidamah login method without enabling custom password validator in nama.properties first, use-custom-password-validator=true"*

### Available Configuration Fields in Global Configuration

| Field | Description | Default | Options | Validation Rules |
|-------|-------------|---------|---------|-----------------|
| **Login Two-Factor Authentication Method** | Which second factor the login asks for | None | None · Message OTP · Estidamah API | - |
| **Notification For Two-Factor Authentication OTP** | The notification definition that carries the code | - | Any manual notification definition | **Required** when the method is Message OTP |
| **OTP Format** | Shape of the generated code | Numeric | Numeric (123456) · Alphabetic (ABCDEF) · AlphaNumeric (A1B2C3) | - |
| **OTP Length** | How many characters the code has | 6 when the field is empty or zero | Any number | - |
| **OTP Expiry Time** | Seconds before the code stops being accepted | 3 minutes when the field is empty | Whole minutes — the value is divided by 60, so 90 seconds behaves as 1 minute | - |
| **OTP Resend Delay** | Seconds before the user may ask for the code again | 60 when the field is empty or zero | Any number | - |

### Estidamah-Specific Settings
Only required when using Estidamah API method:

| Field | Description |
|-------|-------------|
| **Estidamah Environment Url** | The gateway address (checked on save) |
| **Estidamah Api Key** | The account key sent with every call (not checked on save, still required by the gateway) |
| **Estidamah Encryption Key** | Encryption key for securing credentials (checked on save) |
| **Estidamah Encryption IV** | Initialization vector for encryption (checked on save) |

::: warning Important Configuration Requirement
To use Estidamah API authentication method, you must enable custom password validator in `nama.properties`:
```properties
use-custom-password-validator=true
```
This setting prevents password hashing and allows the system to send encrypted credentials to the Estidamah gateway.
:::

## User Experience Flow

### Standard Login with 2FA

1. **Initial Login**
   - User enters username and password
   - System validates credentials

2. **OTP Generation**
   - If 2FA is enabled, system generates OTP
   - OTP is sent via configured method (SMS/Email/Notification)
   - User sees OTP input screen

3. **OTP Verification**
   - User enters received OTP code
   - System validates the OTP
   - Upon successful validation, user gains access

4. **OTP Resend**
   - If user doesn't receive OTP, they can request resend
   - Resend is available after configured delay period
   - Same OTP is resent if still valid, new one generated if expired

### Messages you may see

| Message | What it means |
|---|---|
| *"You must provide OTP"* | The password was right; this is the login asking for the code, not a refusal. It carries the code's length and the resend delay, which is what the OTP screen displays. |
| *"Invalid OTP"* | The code does not match the one issued, or it has expired and a newer one was sent. Ask for a fresh code. |
| *"Error with Message OTP"* | The code could not be sent at all — almost always the notification definition: missing, not manual, or the user has no mobile/e-mail on file. |

## User Settings

### Excluding Users from 2FA

Individual users can be excluded from 2FA requirements:

1. Open **Administration → Security → User**
2. Find the user account
3. Tick **Exclude From Two-Factor Authentication** in the user's settings
4. Save changes

This is useful for:
- Service accounts
- Emergency access accounts
- Users in specific roles that don't require 2FA

## Technical Implementation Details

### Session Management

- OTP validation is tied to the login session
- Once validated, OTP ID is cached temporarily
- Subsequent API calls within the session don't require re-validation
- Session timeout triggers new 2FA requirement

## Notification Template Setup

### Creating 2FA Notification Template

1. Open **Administration → Display Customization → Notification Definition**
2. Create new manual notification with:
   - **Name**: "2FA OTP Notification"
   - **For Type**: User
   - **Manual**: True (Selected)
   - **Channel**: Choose one or multiple:
     - SMS
     - Email
     - WhatsApp
     - In-App Notification
   - **Template Variables**:
     - `{name1}` - User's full Arabic name
     - `{name2}` - User's full English name
     - `{otpCode}` - Generated OTP code
     - Any field available in the user master file

### Example SMS Template
```
Dear ${name2},
Your Nama ERP verification code is: {otpCode}
This code expires in 3 minutes.
Do not share this code with anyone.
```

### Example Email Template
```html
<p>Dear {name1},</p>
<p>Your Nama ERP login verification code is:</p>
<h2>{otpCode}</h2>
<p>This code will expire in 2 minutes.</p>
<p>If you didn't request this code, please contact your system administrator immediately.</p>
```

### Example WhatsApp Template
```
🔐 *Nama ERP Security Code*

Hello {name2},

Your verification code is: *{otpCode}*

⏱️ Valid for 3 minutes only
⚠️ Do not share this code with anyone

If you didn't request this, contact IT immediately.
```
