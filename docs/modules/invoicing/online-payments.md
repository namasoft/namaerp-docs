---
entities: [OnlinePaymentConfig, PaymentLinksCreationDoc]
menu: Basic → Documents → Online Payment Configuration
---
# Online Payments Integration

Nama ERP's online payment module lets you accept payments directly from your customers through secure payment gateways. Whether you're sending a single invoice payment link or generating hundreds of payment links for outstanding balances, this module handles the entire flow from link generation to payment confirmation and automatic receipt creation.

## Understanding the Payment Flow

When a customer clicks a payment link, here's what happens behind the scenes:

1. **Link Validation** - The system checks if the link is still valid (not expired) and if the document still requires payment
2. **Payment Page Display** - The customer sees a customized payment page showing the amount due and document details
3. **Gateway Redirect** - When ready to pay, the customer is redirected to the payment gateway (KNet or MyFatoorah)
4. **Payment Processing** - The gateway processes the payment and returns the result
5. **Success Handling** - On successful payment, Nama can automatically run entity flows, send notifications, and even create receipt vouchers
6. **Confirmation Page** - The customer sees a success or error page with transaction details

## Supported Payment Gateways

### KNet (Kuwait)

KNet is Kuwait's national payment network. To integrate KNet, you'll need:

| Field | Description |
|-------|-------------|
| **User Name** | Your KNet portal ID (tranportal ID) |
| **Terminal Alias** | The alias assigned to your terminal by KNet |
| **GUI URL** | Your server's public URL where payment callbacks will be received |
| **URL Prefix Identifier** | A unique identifier for your payment URLs (e.g., "mycompany") |
| **Resource Files Path** | Server path containing `resource.cgn` and `keystore.bin` files from KNet |

::: warning Important
KNet requires two certificate files (`resource.cgn` and `keystore.bin`) that must be placed on your server. These files are provided by KNet during merchant registration and contain your encryption keys.
:::

### MyFatoorah

MyFatoorah is a popular payment gateway in the Middle East supporting multiple payment methods including cards, Apple Pay, and local payment options.

| Field | Description |
|-------|-------------|
| **API Token** | Your MyFatoorah API token from the merchant dashboard |
| **GUI URL** | Your server's public URL for payment callbacks |

MyFatoorah is simpler to set up since it uses API-based authentication rather than certificate files.

## Setting Up Online Payment Configuration

Navigate to **Basic > Documents > Online Payment Configuration** to create your payment gateway settings.

### Basic Setup

1. **Create a new configuration** and give it a meaningful code (e.g., "KNET-MAIN" or "MYFATOORAH-PROD")
2. **Select the Type** - Choose either KNet or MyFatoorah
3. **Enter the gateway credentials** based on your provider (see fields above)
4. **Set the GUI URL** - This is your server's public address, typically something like `https://yourcompany.com/erp/`

![An Online Payment Configuration for MyFatoorah, with the link expiry hours and the weekend days](../../ar/modules/invoicing/images/online-payment-config-myfatoorah-en.png)

### Link Expiration Settings

Payment links don't last forever. You can control how long they remain valid:

- **Expire Link After (Hours)** - Number of hours before the link expires. If left empty, links expire after one year.

The system is smart about expiration - it can skip weekends and holidays when calculating expiry times. Configure this using:

- **Weekend Days** - Check which days are weekends (Friday/Saturday for GCC, Saturday/Sunday elsewhere)
- **Holidays Collection** - Add specific dates that should be excluded from expiry calculations

For example, if you set "Expire After 24 Hours" and Friday/Saturday are weekends, a link generated on Thursday at 10 AM won't expire until Sunday at 10 AM (skipping Friday and Saturday).

### Payment Templates

Templates control what your customers see at each stage of the payment process. Each template supports dynamic placeholders that get replaced with actual document values.

| Template | When It's Shown |
|----------|-----------------|
| **Payment Template** | The initial payment page showing invoice details and "Pay Now" button |
| **Success Template** | Displayed after successful payment |
| **Error Template** | Shown when the payment fails or is declined |
| **Bad Transaction Template** | Displayed when the transaction isn't approved |
| **Expired Link Template** | Shown when clicking an expired payment link |
| **Totally Paid Template** | Displayed when the invoice has already been fully paid |
| **Not Found Template** | Shown when the document doesn't exist |
| **Type Not Supported Template** | Displayed when the document type doesn't support online payments |

::: tip Loading Default Templates
Click the **"Calculate Default Templates"** button to load the system's default HTML templates. You can then customize them to match your branding.
:::

### Using Placeholders in Templates

Templates support the Nama template engine. You can include document fields using curly braces:

```html
<h2>Invoice #{code}</h2>
<p>Amount Due: {currency.code} {netTotal}</p>
<p>Customer: {customer.name1}</p>
```

After payment, you can also access the payment response:

```html
<p>Transaction ID: {opResponse.transId}</p>
<p>Authorization: {opResponse.auth}</p>
<p>Amount Paid: {opResponse.amt}</p>
<p>Date: {opResponse.date}</p>
```

#### Payment Response Map Reference (`$map.opResponse`)

The `opResponse` object is available in templates (via `{$map.opResponse.fieldName}`) and in entity flows (via `x=$map.opResponse.fieldName`). The available fields differ by payment gateway:

::: details KNet Response Fields (Click to expand)
```json
{
  // Core Transaction Data
  "result": "CAPTURED",           // Transaction result (CAPTURED, NOT CAPTURED, etc.)
  "amt": "150.000",               // Transaction amount
  "auth": "123456",               // Authorization code from bank
  "ref": "789012345678",          // Reference number
  "transId": "1234567890123456",  // Transaction ID
  "paymentId": "12345678901234",  // Payment ID
  "trackId": "9876543210",        // Your tracking ID
  "date": "01/15/2025 14:30:00",  // Transaction date/time

  // Card Information
  "card": "************1234",     // Masked card number
  "type": "VISA",                 // Card type (VISA, MASTERCARD, etc.)
  "member": "CARDHOLDER NAME",    // Cardholder name
  "expMonth": "12",               // Card expiry month
  "expYear": "2027",              // Card expiry year

  // Currency & Amount
  "currency": "414",              // Currency code (414 = KWD)
  "convertedCrncyCD": "",         // Converted currency code (if applicable)

  // User Defined Fields
  "udf1": "",                     // Custom field 1
  "udf2": "",                     // Custom field 2
  "udf3": "",                     // Custom field 3
  "udf4": "",                     // Custom field 4
  "udf5": "",                     // Custom field 5
  "custid": "",                   // Customer ID

  // 3D Secure / Authentication
  "eci": "",                      // Electronic Commerce Indicator
  "cavv": "",                     // Cardholder Authentication Verification Value
  "xid": "",                      // 3D Secure transaction ID
  "authStatus": "",               // Authentication status
  "enrolmntStatus": "",           // 3D Secure enrollment status

  // Error Information
  "error": "",                    // Error code
  "error_text": "",               // Error description
  "errorMessage": "",             // Combined error message (on failure)

  // Response Codes
  "responseCode": "",             // Gateway response code
  "avr": "",                      // Address verification result
  "cvv2Verification": "",         // CVV2 verification result

  // Additional Technical Fields
  "action": "1",                  // Action type (1 = Purchase)
  "language": "en",               // Language code
  "responseURL": "",              // Callback URL
  "errorURL": "",                 // Error callback URL
  "alias": "",                    // Terminal alias
  "tranportalId": "",             // Tranportal ID
  "rawResponse": ""               // Raw response from gateway
}
```
:::

::: details MyFatoorah Response Fields (Click to expand)
```json
{
  // Core Transaction Data (Success)
  "amt": "150.000",               // Paid amount
  "date": "15/01/2025",           // Transaction date
  "paymentId": "07012345678901",  // MyFatoorah payment ID
  "transId": "1234567890123456",  // Transaction ID
  "ref": "REF123456",             // Reference ID
  "auth": "AUTH123",              // Authorization ID

  // Error Information (Failure)
  "errorMessage": "MF002: Bank declined" // Error message with code
}
```

**MyFatoorah Error Codes in `errorMessage`:**
- `MF001` - 3DS authentication failed
- `MF002` - Bank declined (insufficient funds, invalid card)
- `MF003` - Gateway blocked (fraud detection)
- `MF004` - Insufficient funds
- `MF005` - Session timeout
- `MF006` - Transaction canceled
- `MF007` - Card expired
- `MF008` - Issuer not responding
- `MF009` - Denied by risk
- `MF010` - Wrong CVV
- `MF020` - Unspecified failure
:::

#### Using in Entity Flows

When configuring entity flows that run after payment (Success Entity Flow or Error Entity Flow), you can access these values using the `$map` variable:

```
// In entity flow parameter expressions:
x=$map.opResponse.auth           // Get authorization code
x=$map.opResponse.amt            // Get paid amount
x=$map.opResponse.transId        // Get transaction ID
x=$map.opResponse.errorMessage   // Get error message (on failure)
```

### Payment Actions - Automating Post-Payment Workflows

This is where the real power lies. When a payment succeeds (or fails), you can automatically trigger actions in the system.

| Field | Purpose |
|-------|---------|
| **Success Entity Flow** | An entity flow to run after successful payment (e.g., mark invoice as paid, change status) |
| **Success Notification** | Send an email/SMS notification after successful payment |
| **Error Entity Flow** | Run this flow when payment fails |
| **Payment Method** | Automatically add a payment line to the document using this method |

The **Payment Method** is particularly useful - when set, the system automatically adds a payment to the invoice upon successful online payment, which can trigger receipt voucher creation if configured.

### Conditional Payment Actions

Sometimes you need different behaviors based on the document type or specific conditions. The **Details** collection lets you create conditional rules:

| Field | Purpose |
|-------|---------|
| **For Type** | Apply this rule only to a specific document type (e.g., Sales Invoice, Sales Order) |
| **Entity Type List** | Or apply to multiple document types from a predefined list |
| **Apply When Query** | A query condition that must be true for this rule to apply |
| **Do Not Apply When Query** | Skip this rule when this condition is true |

Each detail line has its own **Payment Actions** section, so you can have different success flows, notifications, and templates for different scenarios.

**Example:** You might want:
- Sales Invoices to trigger a "Mark as Paid" flow and send an email
- Sales Orders to trigger a "Confirm Order" flow and send a different email
- High-value invoices (over 1000) to send an additional notification to the sales manager

### Fields Mapping (KNet)

For KNet integration, you can pass additional data to the payment gateway using User Defined Fields (UDF1-UDF5) and Customer ID:

| Field Type | Description |
|------------|-------------|
| **UDF1 - UDF5** | Custom fields that appear in your KNet settlement reports |
| **CustomerId** | The customer identifier for the transaction |

The **Value Template** column supports placeholders, so you can dynamically populate these fields:

```
{customer.code}
{code}
{netTotal}
```

### Subsidiary Source Configuration

When using the **Payment Links Creation Document** for bulk link generation, you need to tell the system which field contains the customer/subsidiary for each document type:

| Field | Purpose |
|-------|---------|
| **Entity Type** | The document type (e.g., SalesInvoice) |
| **Field ID** | The field that contains the subsidiary reference (e.g., `customer`) |

This mapping is used when aggregating invoices by customer for bulk payment link creation.

## Generating Payment Links

There are two ways to generate payment links:

### Method 1: Direct Link Generation

For documents that implement online payment support (like Sales Invoices), you can generate a payment link directly. The system creates an encrypted URL containing:
- The payment configuration ID
- The document type and ID
- The expiry timestamp

The URL format looks like: `https://yourserver.com/erp/op/prefix/ENCRYPTED_DATA`

::: tip Automated Link Generation via Entity Flows
You can automatically generate KNet payment URLs using the **EAGenerateKNetPaymentURLs** entity flow. This is useful when you want to generate payment links as part of an automated workflow (e.g., when an invoice is approved). The flow generates both direct gateway URLs and redirect URLs, storing them in specified document fields. See the [EAGenerateKNetPaymentURLs documentation](/entity-flows/core/EAGenerateKNetPaymentURLs.md) for parameters and setup details.
:::

### Method 2: Bulk Payment Links (Payment Links Creation Document)

Navigate to **Basic > Documents > Payment Links Creation Document** for bulk generation.

This powerful tool lets you:
1. Filter documents by type, date range, book, term, or period
2. Find invoices with installments due within a certain number of days
3. Aggregate amounts by customer
4. Generate payment links for all selected customers at once

#### Using the Payment Links Creation Document

1. **Select Document Type** - Choose Sales Invoice, Sales Order, or Miscellaneous Purchase Invoice
2. **Set Filters** - Define date ranges, books, terms, or periods to narrow down documents
3. **Remaining Days Filter** - Find installments due within X days
4. **Click "Collect Docs"** - The system finds matching documents and aggregates by customer
5. **Review the Details** - See individual invoices/installments in the Details tab
6. **Review Link Lines** - See aggregated amounts per customer with their contact info
7. **Save and Create Links** - Click "Create Payment Links" to generate links for all customers

The system automatically:
- Groups invoices by customer
- Pulls customer contact information (email, mobile)
- Creates individual payment links per customer
- Stores the links for later reference

#### Link Lines Fields

| Field | Description |
|-------|-------------|
| **Subsidiary** | The customer/vendor |
| **Customer Name** | Auto-populated from the subsidiary |
| **Customer Email** | Email for payment link delivery |
| **Mobile Country Code** | Country code for SMS delivery |
| **Mobile Number** | Phone number for SMS delivery |
| **Value** | Total amount to collect |
| **Payment Link** | The generated link (after clicking "Create Payment Links") |
| **Invoice ID** | The MyFatoorah invoice ID (for tracking) |

#### Notification Options (MyFatoorah)

MyFatoorah can automatically send the payment link to customers:
- **LNK** - Just generate the link (no automatic sending)
- **EML** - Send via email
- **SMS** - Send via SMS
- **ALL** - Send via both email and SMS

The system automatically selects the appropriate option based on which contact fields you provide.

## Transaction Tracking

Every payment attempt is recorded in the **Online Payment Transaction System Entry**. This record tracks:

| Field | Description |
|-------|-------------|
| **Document** | The invoice/order being paid |
| **Online Payment Config** | Which payment configuration was used |
| **Track ID / Invoice ID** | The gateway's transaction identifier |
| **Transaction Status** | Current status (Initial, Captured, Paid, etc.) |
| **Paid Amount** | The amount that was paid |
| **Authorization Number** | The bank's authorization code |
| **Transaction ID** | The gateway's transaction ID |
| **Reference** | Additional reference from the gateway |
| **Link Status** | Whether the link is Valid, Paid, or Expired |

## Automatic Receipt Voucher Creation

When configured through the document term settings, the system can automatically create receipt vouchers upon successful payment. This is particularly useful for the Payment Links Creation Document workflow where you're collecting payments for multiple invoices.

The receipt voucher creation respects your accounting configuration and can:
- Create one voucher per payment
- Apply the payment to the correct customer account
- Link back to the original invoices

## Security Considerations

- Payment links use strong encryption to protect document and configuration IDs
- Links expire automatically based on your configuration
- The system validates that documents exist and still require payment before processing
- All payment attempts are logged for audit purposes
- API tokens and credentials should be kept secure and not shared

## Common Scenarios

### Scenario 1: Simple Invoice Payment

1. Create an Online Payment Configuration for your gateway
2. Set up default templates and optionally a success entity flow
3. Generate payment links from your invoices
4. Share links with customers via email or messaging
5. Customers pay, and the system handles the rest

### Scenario 2: Monthly Statement Collection

1. Create a Payment Links Creation Document
2. Filter for unpaid invoices from the previous month
3. Generate links for all customers with outstanding balances
4. MyFatoorah automatically sends payment links via email/SMS
5. Track payments as they come in

### Scenario 3: Different Rules for Different Document Types

1. In Online Payment Configuration, add Detail lines
2. Set different rules for Sales Invoices vs Sales Orders
3. Configure different success flows and notifications for each
4. The system automatically applies the correct rules based on document type

## Error Codes (MyFatoorah)

When payments fail, MyFatoorah provides specific error codes:

| Code | Meaning |
|------|---------|
| MF001 | 3DS authentication failed (wrong password, not enrolled, or issuer issue) |
| MF002 | Bank declined (invalid card, insufficient funds, expired card) |
| MF003 | Gateway blocked (unsupported card, fraud detection, security rules) |
| MF004 | Insufficient funds |
| MF005 | Session timeout |
| MF006 | Transaction canceled by user |
| MF007 | Card is expired |
| MF008 | Card issuer not responding |
| MF009 | Denied by risk management |
| MF010 | Wrong security code (CVV) |
| MF020 | Unspecified failure |

These error codes help you and your customers understand why a payment failed and what corrective action to take.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *You should configure field {0} or field {1} for handle success transaction* — «يجب عليك إدخال الحقل {0} او {1} لنجاح عملية الدفع» | The **Online Payment Config** has neither a **success entity flow** nor a **payment method** — on the header when there are no detail lines, or on a detail line that inherits neither from the header. | Fill one of the two on the header, or on each detail line; without them a successful payment has no follow-up action. |
| *You can not leave more than 1 line  with no entity type lines are {0} and {1}* — «لا يمكنك ترك أكثر من سطر بدون تحديد النوع في السطر رقم {0} و {1}» | Two lines of the subsidiary-source grid both leave **entity type** empty; one blank line is the catch-all, two are ambiguous. The numbers are the two line numbers. | Give one of them an entity type, or delete it. |
| *Payment links lines must be filled* — «لا يمكن ترك سطور روابط الدفع فارغة» | A **Payment Links Creation Document** is being saved with an empty links grid. | Fill the links lines (or run the button that fills them) before saving. |
| *Subsidiary {0} has line in links lines but does not have detail line* — «الذمة {0} لها سطر في سطور روابط الدفع ولكن ليس لها سطر في التفاصيل» | A party appears in the links grid with no matching line in the document details, so there is no amount to build a link from. | Add the party to the details grid, or remove its links line. |
| *You can not delete payment link lines which have payment link* — «لا يمكنك حذف سطور روابط الدفع التي لديها رابط دفع» | Lines that already carry a generated payment link are being removed from a saved document; the link is live with the provider. | Leave those lines in place. A link that must not be used is cancelled with the provider, not deleted here. |
