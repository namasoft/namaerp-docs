---
description: "The Car Sales Invoice versus the Car Proforma Sales Invoice: which one is the sale, what the invoice books, its extra fields, the setup rule that keeps stock correct, and what follows the invoice."
entities: [SISalesInvoice, SIProformaSalesInvoice]
menu: cars → Car Sales → Car Sales Invoice
---
# Car Sales Invoices

There are two documents in the menu with "invoice" in the name, they look almost identical on
screen, and only one of them is a sale. Getting the difference straight is the single most valuable
thing on this page.

- **Car Proforma Sales Invoice** (`سيارات > مبيعات السيارات > فاتورة مبيعات سيارة مبدئية`) — a
  priced, complete-looking document you can print and hand to a bank, an insurer or a customs
  broker. It books nothing meaningful.
- **Car Sales Invoice** (`سيارات > مبيعات السيارات > فاتورة مبيعات سيارة`) — the sale. Revenue, tax,
  the customer receivable, the cost of goods sold, the stock issue and the e-invoice submission all
  come from here, and from nowhere else.

::: info Required licence
`srvcenter-subitems`.
:::

## The two documents, side by side

| | Pro-forma Sales Invoice | **Sales Invoice** |
|---|---|---|
| Revenue and receivable | **No.** Only a generic debit/credit pair, and only if the term happens to fill it | **Yes, always** |
| Tax | No | **Yes** — taxes 1–4 and header taxes |
| Cost of goods sold | No | **Yes**, through the stock issue |
| Stock movement | **None at all** | **Out** — a stock issue for the car |
| Submitted to the tax authority | No | **Yes** |
| Can be returned | No return document targets it | **Yes** — the Car Sales Return |
| نوع البيع / المرخص له on screen | No | Yes |
| Payment lines, schedule, external payments | Yes | Yes |
| Moves the car's status, stamps references | Yes | Yes |

Read that table once more from the top: **the pro-forma is not a financial document.** Do not
present it to anyone as a "provisional entry" or an "invoice awaiting confirmation" — nothing is
waiting, because nothing was booked. Its value is entirely that it is a complete, printable,
priced document with a book and a number, safe to issue outside the company without touching your
ledger, your tax return or your stock.

The one thing the pro-forma shares with every other car document is its effect on the car itself: it
writes a status line and can stamp its reference onto the car's Statistics tab. So a showroom that
wants "a pro-forma has been issued" to be visible on the car can model exactly that as a status.

## The Car Sales Invoice

This is the point of no return. Once it commits, undoing the sale means raising a **Car Sales
Return** — deleting is not the answer, and the cancellation documents in this module do not touch
money or stock.

### What it books

On commit the invoice produces, in the ordinary way and always:

- the **customer receivable** (or cash, if the term points there) against **revenue**;
- **tax** on the line and header taxes;
- invoice and line **discounts**, and any of the service-fee sides the term configures;
- the **stock issue** that takes the car out of the showroom warehouse, and with it the **cost of
  goods sold** entry that relieves the car's
  [landed cost](/modules/servicecenter/car-purchasing/car-landed-cost.md).

All of this is created as **business requests** processed in the background — the invoice itself
saves immediately. If an effect fails, retry it from the **Business Requests** list view: filter by
failed, select the rows and use **More → Reprocess / Recommit**.

### Fields you meet only here

![The Car Sales Invoice screen](../../../ar/modules/servicecenter/images/car-sales/sc-car-sales-invoice-en.png)

Alongside the standard sales-invoice layout, the car sales invoice carries **نوع البيع (Sale Type)**
— Cash or Instalment — and **المرخص له (Licensee)**, plus the
[instalment block](/modules/servicecenter/car-installments/car-installment-quotation.md) and the
**Used Car Info** tab carried forward from the sales order.

The chassis is named in the **السياره (Customer Car)** column of the line, exactly as on every other
document in this family. When the invoice is built on an allocation or an order through **From
Document**, the picker offers only the cars on that source.

::: info What can refuse the sale
The allocation fields record who the car is promised to; they do not hold it — see
[Allocating a Chassis](/modules/servicecenter/car-sales/car-allocation.md). What refuses a sale is
the car's own status configuration, or the **منع البيع (Prevent Sales)** flag on
[the car record](/modules/servicecenter/cars-setup/car-master-file.md).
:::

## The worked example

`CAR-000318` is invoiced to Layla Al-Harbi on **1 March 2026** as `SISI-2026-0498`:

| | Amount |
|---|---|
| Agreed sale price | **87,000** |
| VAT at 15 % | 13,050 |
| **Invoice total** | **100,050** |
| Cost of sales — the car's landed cost | **76,500** |
| **Gross margin** | **10,500** |

The 76,500 is what the car actually cost Al-Sahra: 74,000 paid to the importer plus 2,500 of freight
and customs spread over the six cars in the shipment. The invoice generates stock issue
`STI-2026-1201` out of the showroom store `WH-SHOW`, and that issue is what relieves the 76,500 to
cost of sales.

Note what has already happened before this document: the sales order recorded a **5,000** booking
deposit on its reservation-value accounts back on 24 February. That entry is not touched by the
invoice; it is settled the ordinary way, through the customer's account.

## The one setup rule that keeps stock correct

::: danger The car can be issued from stock twice
The Car Sales Invoice generates a stock issue. So can the
[**Car Final Delivery**](/modules/servicecenter/car-sales/car-final-delivery.md). Neither document
can see the other's stock document — each looks only for an issue raised from itself — and neither
checks whether the car has already left stock.

Follow the natural path with both terms configured to generate, and the same chassis is issued
**twice**: the landed cost is relieved to cost of sales twice and the car sits at **−1** on hand.
Where negative stock is allowed, both documents commit silently and nothing warns. Where it is
blocked, the second document fails with a generic shortage error that names an auto-generated stock
document rather than the car document you were saving — which reads as an unrelated inventory
problem.

**The rule: fill *Generation Book* and *Generation Term* on exactly one of the two
[document terms](/modules/servicecenter/document-terms/servicecenter-terms-cars-and-other.md).**
If the invoice is your stock-out document — the normal choice for an ordinary sale, and the one
Al-Sahra makes — leave the final-delivery term's generation book and term **empty**.

To stop the final delivery generating, clear the generation book or the generation term on its
term. The invoice and the final delivery are **alternatives** for moving stock, never a sequence.
:::

## Actions on these screens

Both screens are built on the supply chain Sales Invoice screen and carry most of its buttons. The
ones a car sale actually uses:

**Main page:**

- **Sales Collect Lots** (*تجميع الشحنات*) and **=Supplychain  Collect Locators** (*تحميع المواقع*) —
  fill the lot and the locator on every line from what is available in the header warehouse. The
  second one's English label ships exactly as shown.
- **Pay Invoice** (*ادفع الفاتورة*), **Pay Part Of Invoice** (*دفع جزء من الفاتورة*), **Fetch Last
  Terminal Payment Transaction** (*ايجاد اخر عمليه دفع تمت ولم تصل معلوماتها*), **Request Redeem
  Customer Amount** and **Upload Invoice To GoPay** (*إرسال الفاتورة إلى GoPay*) — the card-terminal,
  loyalty and payment-gateway buttons, which behave as on the
  [Sales Invoice](/modules/supplychain/sales-journey.md#Actions-on-this-screen). *Request Redeem
  Customer Amount* reads the same in Arabic.

**Billing page:**

- **GeneratePayments** (*إنشاء الدفعات*) — splits the remaining value into an instalment schedule,
  asking for the number of payments, the period between them and its unit, the start date, a grace
  period, down / first / second / last payment values and a rounding mode. The English label ships as
  the raw name shown here.
- **Generate Receipt Voucher** (*إنشاء سند قبض*) — creates a receipt voucher for the whole remaining
  value against the customer. **Generate Receipt Voucher For Selected Payments** (*إنشاء سند قبض
  للدفعات المختارة*) does the same for only the instalment lines you ticked, and refuses when none is
  selected or none has anything remaining. **Collect Receipt Vouchers** (*تجميع سندات القبض*) brings
  existing vouchers onto the invoice.

**Related documents page (Car Sales Invoice only):**

- **Collect** (*تجميع*) — asks for a from date and a to date and fills the stock documents grid with the
  stock issues already made to this customer from the same warehouse that have not been invoiced yet.
- **Apply Receipts** (*تطبيق*) — turns the stock issues in that grid into priced invoice lines.
- **Create Inventory Doc.** (*إنشاء سند مخزني*) — for an invoice typed by hand, generates the stock
  issue and opens it. Mind the stock rule above before you press it.

**More menu:**

- **Reverse Document** (*عكس المستند*, Car Sales Invoice only) — the invoice must be saved; opens a new,
  unsaved [Car Sales Return](/modules/servicecenter/car-sales/car-sales-return.md) with this invoice's
  lines copied in.
- **Collect Without Dates** (*تجميع بدون تواريخ*, Car Sales Invoice only) — the same as *Collect* on the
  related documents page, without asking for a date range.
- **Generate Doc** (*إنشاء مستند بناءا على*) — asks which kind of document to create (stock issue,
  stock receipt, stock transfer, purchase invoice, purchase return, car purchase return, sales invoice
  or car sales invoice) and opens a new, unsaved one built from this document.
- **Remove Taxes** (*حذف الضرائب*) and **Restore Taxes** (*احتساب الضرائب*) — the first asks which
  taxes to clear and empties them on every line; the second recalculates them. Both are refused when
  the document is not taxable.
- **Add Current Line To Shortage Document** (*إضافة السطر الحالي الي مستند النواقص*) — appends the line
  you are standing on to a
  [shortage document](/modules/supplychain/sales-operations-documents.md).
- **Installment Payments** (*سندات سداد الدفعات*) — opens a list of the vouchers that paid this
  document's instalments.
- **Cancel Reservation Of Related Docs** (*إلغاء الحجز*) and **Apply Reservation** (*تطبيق الحجز*) —
  the document must be saved; release or re-apply the stock reservations linked to it.
- **Add Document** (*إضافة مستند*) — asks for another document and appends its lines.
- The pricing and stock helpers shared with the Sales Invoice: **View Available Quantities**
  (*عرض الكميات المتاحة*), **Sales Collect Available Quantities For Inserted Lines** (*تجميع الكميات
  المتاحة للسطور المدخلة*), **Update Expiry Dates from Lot Code** (*حساب تواريخ الصلاحية من كود
  الشحنة*), **Apply Offers And Update Prices** (*تطبيق العروض وتحديث الأسعار*), **Apply Coupons**
  (*تطبيق قسائم الخصم*), **Apply Offers And Coupons** (*تطبيق العروض وقسائم الخصم*), **Calculate
  Discounts From Offers** (*حساب خصم الفاتوره من العروض*) and **Copy To First Cash Line** (*نسخ لأول
  سطر طريقة دفع نقدية*). The Car Sales Invoice adds **Replace Free Item** (*تبديل صنف مجاني*), **Add
  Free Items Offer** (*تطبيق عروض الأصناف المجانية على الأصناف*) and **Add Invoice Offers** (*إضافة
  عروض الفاتورة*).
- The read-outs and integrations shared with the Sales Invoice: **Owner Document Quantity Tracking
  Entries** (*مدخلات المستند في متابعة الكميات*), **Root Document Quantity Tracking Entries**
  (*مدخلات المستند الرئيسي في متابعة الكميات*), **Payment/Receipt System Entries Related To Invoices**
  (*عرض سندات الدفع و الصرف المرتبطة بالفاتورة*), **Validate Tax Authority Document** (*التأكد من صحة
  المستند بالنسبة للضرائب*), **View Invoice At E Invoice Site** (*عرض الفاتورة في موقع الفاتورة
  الإلكترونية*), **View Invoice At E Invoice Site For Not Loggend In** (*عرض الفاتورة في موقع الفاتورة
  الإلكترونية للغير مسجل*) and **Re Read Order From Ecommerce Site** (*إعادة قراءة الأمر من الموقع*).

On the list screen, **Update Prices** (*تحديث الأسعار*, More menu) recalculates the unit prices of every
selected document and saves it.

![The car sales invoice with its More menu open](../../../ar/modules/servicecenter/images/car-sales/sc-car-sales-invoice-more-menu-en.png)

## After the invoice

- The car's status moves — typically to *مفوتر كلياً (Invoiced)* — if a
  [status updater line](/modules/servicecenter/cars-setup/car-status-configurations.md) targets
  the sales invoice, and the invoice's reference is stamped onto the car's Statistics tab.
- The physical hand-over is recorded on a
  [Car Final Delivery](/modules/servicecenter/car-sales/car-final-delivery.md), which is a record and
  a status move, not a financial event.
- If the sale falls through, raise a
  [Car Sales Return](/modules/servicecenter/car-sales/car-sales-return.md). There is no cancellation
  document for a sales invoice, and there should not be — money that has reached the ledger comes
  back through a return, not through a marker.
