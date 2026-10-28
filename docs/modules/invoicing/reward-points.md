---
entities: [RewardPointsConfig]
menu: Basic → Documents → Reward Points Configuration
---
# Customer Reward Points (Loyalty Points)

This page covers the messages Nama sends customers about their reward points, the connection settings for outside providers (Al Rajhi, STC and Datanuum), and the STC Qitaf certificate. How points are earned, when they expire, how they are redeemed, and the opening, periodic-grant and restriction screens are on [Setting Up Nama Reward Points](/modules/invoicing/reward-points-setup).

![A Reward Points Configuration record](../../ar/modules/invoicing/images/reward-points-config-en.png)

## Send a notification to the customer with each invoice with rewarded points, redeemed, and total points
* English Version
```
Dear {customer.name2},
Thanks for visiting {branch.name2}.
You earned {$earnedPoints} points. Your current balance is {customer.$availableRewardPoints} points (SAR {customer.$availableRewardAmount}).
Thanks for shopping with us!
```
* Arabic Version
```
عزيزي {customer.name1}،
شكرًا لزيارتك فرع {branch.name1}.
كسبت {$earnedPoints} نقطة جديدة، ورصيدك الآن {customer.$availableRewardPoints} نقطة ({customer.$availableRewardAmount} ريال سعودي).
شكرًا لتسوقك معنا.
```

### Steps to Notify Customers with the reward points OTP:
* Create a Notification Definition for any entity (preferably Customer) and check the "Manual" option.
* In the Reward Points Configuration file, set the "OTP Notification" field to the notification definition you just created.

### Sample SMS/Email Templates

- English Version
```
To redeeem {rewardInfo.amount} {rewardInfo.currency.altCode} ({rewardInfo.redeemedPoints} points), please use the following OTP: {otpCode} 
```
- Arabic Version
```
لاسترداد {rewardInfo.amount} ({rewardInfo.redeemedPoints} نقطة) {rewardInfo.currency.code}، يرجى استخدام رمز التحقق (OTP) التالي: {otpCode}.
```

::: tip The OTP tempo is run against the customer record
- You can access any information from the customer, like name1, name2, email, and so on.
:::

## Outside providers: connection settings

When **Type** (`type`) names an outside provider, the provider keeps the customer's balance and Nama only talks to it: it reports what the customer bought, asks for a one-time code, and spends points on the customer's behalf. Pick the type with *Test* or *Pre Production* in its name while you are trying the connection, and the *Production* one when you go live. The record will not save until the settings that provider needs are filled.

### Fields on the first page

| Field | Field id | What it does |
|---|---|---|
| **URL** | `url` | The provider's address. Required for every outside provider. |
| **User Name** / **Password** | `userName`, `password` | The client id and secret the provider issued. Required for Al Rajhi, ANB, STC, Bonat and Kangaroo; Datanuum does not use them. |
| **Mobile Correction Query** | `mobileCorrectionQuery` | Providers recognise a customer by mobile number. When the numbers in Nama are not stored the way the provider expects, write a query here: Nama runs it against the coupon or the customer and sends the first column of the first row instead of the stored mobile. Leave it empty when the stored numbers are already right. |
| **Terminal and Branch ID Config** | `branchesInfo` | See below. |

### Terminal and Branch ID Config

STC wants to know which shop and which till a transaction came from, and Al Rajhi which shop. A single shop can put one **Branch ID** (and, for STC, **Terminal ID**) on its provider page. A chain fills this grid instead, one line per shop or till: **Document Book** (`branchesInfo.documentBook`), **Document Term** (`branchesInfo.documentTerm`) and the five dimensions (`branchesInfo.dimensions.legalEntity`, `branchesInfo.dimensions.sector`, `branchesInfo.dimensions.branch`, `branchesInfo.dimensions.department`, `branchesInfo.dimensions.analysisSet`) describe the documents the line covers, and **Branch ID** (`branchesInfo.branchId`) and **Terminal Id / Device Serial No** (`branchesInfo.terminalId`) are what Nama sends for them.

A column left empty matches anything. Lines are tried from the top and the first match wins, so put the narrow lines above the broad ones. A document that matches no line is sent with the Branch ID and Terminal ID from the provider page.

### Rajhi Rewards page

| Field | Field id | What it does |
|---|---|---|
| **Merchant Token** | `merchantToken` | The merchant token Al Rajhi issued. Required. |
| **Partner Code** | `partnerCode` | Your partner code with Al Rajhi. |
| **POS Register ID** | `posRegisterId` | The register id Al Rajhi mapped to you. It is also what ANB uses, and ANB refuses a transaction without it. |
| **Branch ID** | `branchID` | The location code sent when no line of the grid above matches. |
| **Certificate** / **Private Key** / **Public Key** | `certificate`, `privateKey`, `publicKey` | The key pair Nama signs its Al Rajhi requests with. |

**Generate Cetficate And Keys** creates a fresh key pair and certificate and stores them in those three fields. It works only on an Al Rajhi configuration. Download the public side from its field and send it to Al Rajhi as they instruct; never send the private key. The **Loyalty Points Reward Entries** list on the same page shows every earn and update sent to the provider.

### STC Rewards page

| Field | Field id | What it does |
|---|---|---|
| **API Token** | `apiToken` | The merchant (secret) token STC issued. It is sent with every request. Required. |
| **Merchant Token** | `merchantToken` | Must be filled for the record to save, but the STC requests use **API Token**. |
| **Branch ID** / **Terminal ID** | `branchID`, `terminalID` | Sent when no line of the Terminal and Branch ID grid matches. |
| **Certificate** / **Private Key** | `certificate`, `privateKey` | The certificate STC signed and the private key it was made from. Both are required; generating them is described in [STC Qitaf Integration Setup](#STC-Qitaf-Integration-Setup). |

### Datanuum Rewards page

| Field | Field id | What it does |
|---|---|---|
| **API Token** | `apiToken` | The token Datanuum issued. Required, together with **URL**. |
| **Branch ID** | `branchID` | The branch code sent to Datanuum. At the point of sale the register's code is sent instead. |
| **OTP Character Count**, **OTP Format**, **OTP Expires After In Minutes**, **OTP Notification** | `otpCharacterCount`, `otpFormat`, `otpExpiresAfterInMinutes`, `otpNotification` | With Datanuum, Nama itself creates the one-time code that confirms a redemption and sends it through this notification. They work as on the Nama Rewards page; see [Setting Up Nama Reward Points](/modules/invoicing/reward-points-setup). |

The **Datanuum Request Log** list on the page records each call and its answer, which is the first place to look when a redemption fails.

## STC Qitaf Integration Setup

### Generating CSR for STC Qitaf Certificate

When integrating with STC Qitaf loyalty program, STC will request a CSR (Certificate Signing Request) file. They will provide you with the following information:
- **Partner ID** - Your unique partner identifier
- **Country** - Country code (e.g., SA)
- **City** - City name (e.g., Riyadh)
- **Organization** - Your organization name

#### Step 1: Generate the CSR and Private Key

Run the following OpenSSL command, replacing the values with your information:

```bash
openssl req -newkey rsa:2048 -nodes \
  -keyout qitaf-{PartnerID}.key \
  -out qitaf-{PartnerID}.csr \
  -subj "/C=SA/ST={State}/L={City}/O={OrganizationName}/CN=qitaf-{PartnerID}"
```

For example, if your partner ID is 2244 and you're located in Riyadh:

```bash
openssl req -newkey rsa:2048 -nodes \
  -keyout qitaf-2244.key \
  -out qitaf-2244.csr \
  -subj "/C=SA/ST=Riyadh/L=Riyadh/O=YourCompanyName/CN=qitaf-2244"
```

This creates two files:
- `qitaf-2244.key` - Your private key (keep this secure and never share it)
- `qitaf-2244.csr` - The CSR file to send to STC

::: warning Keep Your Private Key Secure
Never share the `.key` file with anyone. Only send the `.csr` file to STC.
:::

#### Step 2: Send CSR to STC

Send only the `.csr` file to STC. They will process it and send back a signed certificate file.

#### Step 3: Configure in Nama ERP

1. Open the **Reward Points Config** screen
2. Upload the certificate file (received from STC) to the **Certificate** (`certificate`) field - the file is usually named `qitaf-{YourPartnerID}-{SomeSerialNumber}.pem.txt`
3. Upload your private key file (e.g., `qitaf-2244.key`) to the **Private Key** (`privateKey`) field
4. Fill in the remaining configuration:
   - **URL** (`url`) — the STC API address
   - **User Name** (`userName`) — the client id
   - **Password** (`password`) — the client password
   - **API Token** (`apiToken`) — the merchant token; fill **Merchant Token** (`merchantToken`) too, or the record will not save
   - **Branch ID** / **Terminal ID** (`branchID`, `terminalID`), or the [Terminal and Branch ID Config](#Terminal-and-Branch-ID-Config) grid for several shops

::: tip Backup Your Files
Keep secure backups of your private key file and the certificate file from STC.
:::

### Debugging STC Qitaf Requests

If you encounter issues with the STC Qitaf integration, you can enable debug logging to capture the full request and response details.

#### Enabling Debug Logging

Add the following property to your `nama.properties` file:

```properties
debug-stc-qitaf=true
```

When enabled, the system logs each API request as a curl command along with the full response. This makes it easy to share the exact request details with STC support or reproduce the request manually.

#### Sample Log Output

The logged curl command includes the `--cert` and `--key` arguments with the file names from the Reward Points Config, making it easy to reproduce the request:

```
========== STC QITAF REQUEST ==========
curl -X POST 'https://api.qitaf.stc.com.sa/redemption/otp' \
  --cert 'qitaf-2244-123456.pem.txt' \
  --key 'qitaf-2244.key' \
  -H 'Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=' \
  -H 'Content-Type: application/json' \
  -H 'X-Secret-Token: your-merchant-token' \
  -H 'GlobalId: 550e8400-e29b-41d4-a716-446655440000' \
  -d '{"Msisdn":501234567,"BranchId":"B001","TerminalId":"T001","RequestDate":"2024-01-15T10:30:00"}'
========================================

========== STC QITAF RESPONSE ==========
Status: 200 OK
Headers:
  Content-Type: application/json
Body:
{"status":"success","message":"OTP sent successfully"}
=========================================
```

#### Running the curl Command

To run the logged curl command:

1. Download the **Certificate** and **Private Key** files from the Reward Points Config
2. Place them in the directory where you'll run the curl command
3. Copy and run the curl command from the logs

::: warning Sensitive Information
The debug logs contain sensitive information including authorization headers and API tokens. Disable debug logging in production after troubleshooting is complete.
:::
