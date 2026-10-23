---
entities: [RewardPointsConfig]
menu: Basic → Documents → Reward Points Configuration
---
# Customer Reward Points (Loyalty Points)

This page covers the messages Nama sends customers about their reward points and the connection to STC Qitaf. How points are earned, when they expire, how they are redeemed, and the opening, periodic-grant and restriction screens are on [Setting Up Nama Reward Points](/modules/invoicing/reward-points-setup).

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
2. Upload the certificate file (received from STC) to the **Certificate** field - the file is usually named `qitaf-{YourPartnerID}-{SomeSerialNumber}.pem.txt`
3. Upload your private key file (e.g., `qitaf-2244.key`) to the **Private Key** field
4. Fill in the remaining configuration:
   - API URL
   - Client ID (Username)
   - Client Password
   - Merchant Token (API Token)
   - Branch and Terminal ID mappings

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
