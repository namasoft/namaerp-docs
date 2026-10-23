---
entities: [ReceiptVoucher, PaymentVoucher]
---
# Linking Payment Vouchers to Invoices

**Nama ERP** supports linking invoices to payment vouchers flexibly across multiple scenarios.

## Definition of Payment Vouchers

Payment vouchers in this context refer to any **receipt or payment of cash or its equivalent**. They include:

* **Receipt Voucher:** Always represents the receipt of cash.
* **Payment Voucher:** Always represents the disbursement of cash.
* **Bank Transfer:**

    * Represents the receipt of cash by default.
    * Can be directed to act as a **Receipt Voucher** or **Payment Voucher** via the option: `تعامل في أعمار الديون ومصاريف طرق الدفع مثل`

* **Electronic Receipt Voucher:**

    * Acts as a receipt voucher by default.
    * Can be changed to a payment voucher using the same direction option.
* **Debit Note:**

    * Acts as a receipt voucher by default.
    * Can be changed to a payment voucher using the same direction option.
* **Credit Note:**

    * Acts as a payment voucher by default.
    * Can be changed to a receipt voucher using the same direction option.
* **Invoice Returns:** Can be treated as a payment method by enabling the option: `addReturnToInvoicePayment`

  This option is found in the return's توجيه (Term Config) to specify whether it will be added to payment vouchers and deducted from the remaining balance.

![A receipt voucher; the Invoices tab holds the linked invoices](../../ar/modules/invoicing/images/receipt-voucher-screen-en.png)

## What Does Linking Invoices to Vouchers Mean?

When an invoice is linked to a payment voucher, the system updates the `Remaining` field (`money.remaining`) in the invoice, which represents the outstanding balance to be collected or paid.

## What Are "Invoices" in This Context?

Invoices here refer to **any document that generates a deferred obligation**, whether:

* **In favor of the company** (e.g., sales invoices), or
* **Against the company** (e.g., purchase invoices).

Linking between invoices and payment vouchers follows these rules:

* **Sales Invoice:** Linked to **Receipt** vouchers.
* **Sales Return:** Linked to **Payment** vouchers;
  it can also serve as a substitute for a receipt voucher and be linked to a sales invoice as if it were a receipt voucher.
* **Purchase Invoice:** Linked to **Payment** vouchers.
* **Purchase Return:** Linked to **Receipt** vouchers;
  it can also serve as a substitute for a payment voucher and be linked to a purchase invoice as if it were a payment voucher.

---

## Enabling Automatic Tracking of Links

Before you begin, you must **enable the following option in the global configuration**:
`usePayReceiptDocsSysEntries`

**(In Arabic: استعمال الجداول النظامية لمتابعة ربط الصرف والقبض بالفواتير)**

### The `PayReceiptDocsSysEntry` Table

Once the above option is enabled, the system tracks the link between vouchers and invoices in a dedicated system table:

| Field                | Function                                                              |
| -------------------- | --------------------------------------------------------------------- |
| `valueDate`          | The actual execution date of the voucher                              |
| `creationDate`       | The creation date of the voucher                                      |
| `owner`              | Reference to the voucher (receipt or payment)                         |
| `target`             | Reference to the linked invoice                                       |
| `currency`           | The currency used in the voucher                                      |
| `paymentLocalAmount` | Payment value in local currency                                       |
| `paymentAmount`      | Payment value in the voucher's base currency                          |
| `receiptLocalAmount` | Receipt value in local currency                                       |
| `receiptAmount`      | Receipt value in the voucher's base currency                          |
| `cloned`             | A boolean field (`true/false`) used in the cloning scenario — explained below |

---

## Ways to Link a Payment Voucher to an Invoice

Payment vouchers (such as receipt vouchers) can be linked to sales invoices through the following fields:

### 1. In the Voucher Header:

* **`fromDoc` (Based On):**
  Specifies the invoice or document linked to the voucher.

### 2. In the Voucher Details:

* **`lines.originDoc` (Document #):**
  Reference to the invoice in the details table.

### 3. In the Invoices Table Inside the Voucher:

* **`invoices.invoice` (Invoice):**
  Links the invoice to the payment voucher directly.

---

## Allowing Payment Greater Than the Invoice Remaining Balance

In some business scenarios, it may be necessary to **pay an amount that exceeds the remaining balance on an invoice**.
To enable this behavior, use the following option in the **invoice's توجيه (Term Config)**:
`allowPaymentMoreThanInvoiceAmount` — Allow payment of an amount greater than the invoice value

---

## Cloning Payment Vouchers from Orders to Invoices

When following a scenario that starts with a **Sales Order** on which a **partial receipt voucher** is issued, then a **Sales Invoice** is created based on it, it is natural for that amount to be deducted from the remaining balance on the invoice.

To implement this, enable the following option in the **Sales Invoice توجيه (Term Config)**:

`clonePayReceiptEntry` — Clone the system tracking tables for receipt/payment links associated with the "Based On" document

### Effect of Enabling This Option:

* When the invoice is saved, the system **clones all receipt vouchers linked to the Sales Order** that the invoice was created from.
* If a **new receipt voucher is later added to the Sales Order**, it will **automatically be linked to the invoice** as well.
* If the **receipt voucher is deleted or modified**, the system will **update its effect on the remaining balance in both the Sales Order and the Invoice**.
