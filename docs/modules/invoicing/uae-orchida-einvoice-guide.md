---
entities: [TaxPayerConfiguration, TaxAuthoritySubmissionDoc]
menu: Basic → Electronic Tax Authority Configuration → Electronic Tax Authority Configuration
---
::: warning In Progress
This document is still in progress, not yet finished
:::

# UAE E-Invoicing Integration via Orchida osTax

## Overview

NamaERP supports sending electronic invoices to the UAE Federal Tax Authority (FTA) through the Orchida osTax service provider. Orchida acts as an Accredited Service Provider (ASP) in the UAE's Peppol-based 5-corner e-invoicing model.

The system sends invoices in JSON format to Orchida, which validates them, reports tax data to the FTA, and routes them to the buyer through the Peppol network.

## Prerequisites

Before starting the setup, you need:

- An account on the Orchida osTax platform (https://app.orchidatax.com)
- An API Key (Bearer Token) from the Orchida dashboard
- A Company ID from the Orchida dashboard

### Getting Credentials from Orchida

1. Log in to the Orchida dashboard
2. Enter the OTP sent to your email
3. Select your tenant and company
4. Go to Security > Generate Key
5. Create a new key (set expiration date and name)
6. Copy the API Key and Company ID

## System Setup

### Step 1: Global E-Invoice Settings

From Global Configuration > Page 2:
- Set `e-Invoice Page To Show` to `UAE Page`
- After changing the value, perform a Regen UI

### Step 2: Tax Payer Configuration

Create a new Tax Payer Configuration or edit an existing one.

#### Basic Information

| Field          | Value |
|----------------|-------|
| Tax Payer Type | `UAE - Electronic Invoice Staging` (for testing) or `UAE - Electronic Invoice` (for production) |
| Tax Registeration NO | Your establishment's tax registration number |

#### Integration Settings

| Field              | Description |
|--------------------|-------------|
| API URL            | Auto-filled when Tax Payer Type is selected |
| Password           | API Key from Orchida (Bearer Token) |
| Orchida Company ID | Company ID from the Orchida dashboard |

![The UAE page of the Electronic Tax Authority Configuration](../../ar/modules/invoicing/images/uae-orchida-config-uae-page-en.png)

#### Tax Code Configuration

UAE tax codes follow the UN/EDIFACT 5305 standard (Aligned Tax Category Codes).

**Tax Type**:

| Code | Description |
|------|-------------|
| VAT | Value Added Tax |

**Tax SubType**:

| Code | Description |
|------|-------------|
| S | Standard rate (5%) |
| Z | Zero rated |
| E | Exempt from tax |
| O | Out of scope |
| AE | Reverse Charge |

::: warning
When using code `S` (Standard rate), the VAT rate must be exactly `5.00`
:::

![Tax 1 codes on the UAE page](../../ar/modules/invoicing/images/uae-orchida-config-tax-codes-en.png)

### Step 3: Customer Setup

For each customer that will receive electronic invoices, fill in the following fields:

#### Tax Information

| Field        | Description |
|--------------|-------------|
| Tax Registeration NO | Customer's Tax Registration Number (TRN) |
| Special Number | Customer's Peppol Endpoint ID |
| `description4` (not on the standard Customer screen) | Agency ID (e.g. `TL`) |
| `description5` (not on the standard Customer screen) | Agency Name (e.g. company name) |

#### Address

| Field       | Description |
|-------------|-------------|
| Country Code | Country code (e.g. `AE`); when it is empty, **Country** is sent instead |
| City        | City name |
| Street      | Street address |
| State       | Emirate code |

::: tip Emirate Codes

| Code | Emirate |
|------|---------|
| AUH | Abu Dhabi |
| DXB | Dubai |
| SHJ | Sharjah |
| AJM | Ajman |
| UAQ | Umm Al Quwain |
| RAK | Ras Al Khaimah |
| FUJ | Fujairah |
:::

### Step 4: Unit of Measure Setup

Each UOM used in invoices must have a valid tax authority code following UN/ECE Rec 20:

| Code | Description |
|------|-------------|
| EA | Each |
| KGM | Kilogram |
| MTR | Metre |
| LTR | Litre |
| XBX | Box |
| PCE | Piece |

### Step 5: Currency Setup

Ensure a currency with tax authority code `AED` exists and is set as the default currency.

## Sending Invoices

### Creating a Tax Authority Submission Document

1. Go to **Tax Authority Submission Document**
2. Click **Collect Tax Authority Documents** to add the invoices to be sent
3. Click **Send Selected Documents** or **Send Not Sent Documents** to submit the invoices to Orchida

### Submission Statuses

After sending, the document status is set to:
- **Sent**: Orchida accepted the invoice for processing
- **Not Send Correctly**: The invoice was rejected — check the errors field for details

## Supported Document Types

| Type | Supported |
|------|-----------|
| Invoice | Yes |
| Credit Note | Yes |
| Debit Note | No |

## Maximum Days to Send

The default number of days allowed to send an invoice after its value date is **14 days**. This can be changed in the Tax Payer Configuration under **Max Days To Send Invoices**.
