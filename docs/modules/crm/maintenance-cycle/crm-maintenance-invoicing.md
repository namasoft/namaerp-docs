---
description: "The Maintenance Invoice and its return: raising the invoice from an order or execution, where prices come from, how it issues the spare parts and charges the customer, the rules it enforces, and payments on the invoice."
entities: [MnInvoice, MnInvoiceReturn]
menu: Customer Relationship Management → Maintenance Documents → Maintenance Invoice
---
# Maintenance Invoicing

The maintenance invoice is the document that makes everything real. Up to this point the
[order](/modules/crm/maintenance-cycle/crm-maintenance-orders.md) has drawn quantities down from the
contract and the [executions](/modules/crm/maintenance-cycle/crm-maintenance-executions.md) have
recorded what the technician did — but no money has moved and no part has left the store. The
invoice does both.

::: danger The invoice is where stock and money move
Say this out loud to anybody learning the module: **the execution sheet records the parts, the
invoice issues them.** If your branch treats the technician's execution as the stock-consuming step,
the store will never reconcile — the parts are still there in the system and the customer was never
charged.
:::

::: info Required licence
`crm-maintenance`
:::

![The Maintenance Invoice screen, with the warehouse in the header](../../../ar/modules/crm/images/maintenance-cycle/crm-mn-invoice-en.png)

## Raising the invoice

On 5 April 2026 the back office presses **Create Sales Invoice** (*إنشاء فاتورة صيانة*) on order
`MO-0513` — the English label says "sales", but it is the maintenance invoice that opens. An
unsaved draft opens in a pop-up with the header and every grid already copied; the clerk checks it
and saves it as `MINV-0298`. The execution has its own **Create Maintenance Invoice**, which produces the same kind of
draft from the execution's lines.

Three other routes fill an invoice:

- type it, list the relevant orders in the *Orders* grid and press **Copy All From MnOrders** —
  every detail line of every listed order is appended;
- type it and pick a predecessor in *From document*, letting the standard copier bring the header
  and grids across;
- type the lines by hand.

Nothing links these routes to each other. Listing the same order on two invoices copies its lines
twice, and no warning appears.

## What `MINV-0298` looks like

| Header | Value |
|---|---|
| From document | `MO-0513` |
| Customer | `C-01188` Marina Plaza Hotels |
| Salesman | `EMP-1042` Hala Samir Abdel Rahman |
| Warehouse | `WH-ALX` Alexandria Store |
| Maintenance contract | `MC-0021` |
| Stock issue *(read-only, filled on save)* | `SI-1904` |

| Spare parts | Quantity | Unit price | Net value |
|---|---|---|---|
| `SP-FLT-14` Air filter 14 in | 6 | 300.00 | 1,800.00 |
| `SP-OIL-05` Compressor oil 5 L | 1 | 600.00 | 600.00 |
| **Total spare parts** | | | **2,400.00** |

| Services | Quantity | Unit price | Net value |
|---|---|---|---|
| `MSV-01` Chiller periodic maintenance visit | 3 | 1,200.00 | 3,600.00 |
| **Total services** | | | **3,600.00** |

| Invoice totals | |
|---|---|
| Total (2,400.00 + 3,600.00, no returns) | **6,000.00** |
| Sales tax 14 % (336.00 on parts + 504.00 on services) | **840.00** |
| Net value | **6,840.00** |

The invoice does **not** compute itself from the execution's hours or from the contract's totals. It
bills the lines that are physically on it — the spare-parts grid plus the services grid, minus the
returned-spare-parts grid — and the header totals are simply the sum of those grids.

## Where the prices come from

| Line | Default price | Overridden by |
|---|---|---|
| Spare part | The supply-chain **sales price list** | The **maintenance contract**, when the same item is on the contract with quantity remaining |
| Service | The service catalogue record's own price | The same contract line rule |

So on `MINV-0298` the filters are 300.00 apiece, the contract price, not the 350.00 on the price
list; and the periodic visit is 1,200.00, not the 1,500.00 on the
[service catalogue](/modules/crm/maintenance-setup/crm-maintenance-service-catalogue.md). Every
price remains editable; nothing stops an operator typing something else.

::: info Coverage means contract quantity at the contract price
Work is "covered" when the contract still has quantity left: the line takes the contract's price — a
contract that prices a service at zero produces a zero-value line. The contract's dates do not enter
the pricing, so whether to charge for work on a machine whose contract has ended is a decision taken
on this screen.
:::

## What committing the invoice does

| Effect | Result |
|---|---|
| **Ledger** | **Yes.** On `MINV-0298`: debit the customer receivable (subsidiary `C-01188`) 6,840.00; credit spare-parts revenue 2,400.00, maintenance-service revenue 3,600.00 and sales tax payable 840.00. The sides come from the invoice's [document term](/modules/crm/document-terms/crm-maintenance-terms.md); when that term fills both *Services Debit* and *Services Credit*, the service lines are booked against those instead of the main sides. |
| **Stock** | **Yes**, when the term names a stock-issue book and term and ticks *Generate stock issue with spare parts* and/or *with service items*. A supply-chain **Stock Issue** `SI-1904` is created from `WH-ALX` carrying `SP-FLT-14` × 6 and `SP-OIL-05` × 1, and its reference appears read-only on the invoice. |
| **Contract entitlement** | **Unchanged here.** The draw-down happened when the order was committed; this invoice's *From document* is the order, not the contract. An invoice raised directly from a contract does draw the contract down. |
| **Machine fault-warranty history** | Only if the invoice term ticks *Update Machine Dysfunction Warranties* — and then only if the order term does **not**, see below. |

Both effects are created as **business requests** and processed in the background, so the document
saves instantly. If one fails, retry it from the **Business Requests** list view: filter by status,
select the rows and use **More → Reprocess**.

Cancelling the invoice deletes the generated stock issue and withdraws the accounting entry;
re-saving the invoice updates the stock issue in place, and removing every generating line deletes
it altogether.

## The rules that keep it honest

::: warning Issue spare parts by one route only
The *Spare parts issue* buttons on the order, the execution and this screen open supply-chain
documents from the same lines the invoice term generates its stock issue from, with no link between
them. Used together, the two routes issue the parts twice.

Choose **one** — normally the maintenance-invoice term — and train people on it.
:::

::: warning *Update Machine Dysfunction Warranties* may be ticked on the order term or the invoice term, but not both
With both ticked, the invoice raised from that order is refused outright, with a message telling you
to select the option in only one of the two.
:::

::: warning The generated stock issue keeps almost none of your line detail
Only the **item, quantity and unit of measure** are carried across, plus the header: the CRM
document's book and term pairing, the **header warehouse**, the subsidiary and the source document.

That means the **per-line warehouse and locator are dropped**, and so are prices, item dimensions
and remarks. A repair whose parts come from two different stores cannot be issued correctly from
this document — everything leaves the header warehouse. Fill the header warehouse before you save.

The invoice also needs a document term whose configuration has been filled in. If saving an invoice
fails without a clear message, check the term first.
:::

::: tip Take the invoice's subsidiary from the customer
On the invoice's account sides, use the customer subsidiary. Taking the subsidiary from the salesman
is a configuration for the maintenance order and the order request.
:::

## Payments on the invoice

The invoice carries the full payments block: a payment-schedule template, a **GeneratePayments**
button that expands it into schedule lines, and buttons to generate a receipt voucher for the
selected payments, generate one receipt voucher, or collect existing receipt vouchers. The totals
group shows the total, discount, cash amount, technicians' reward, net value, vouchers' payments,
total paid and remaining. None of this changes what was billed — it is collection, not pricing.

## Actions on these screens

**Maintenance Invoice — main page:**

- **Copy All From MnOrders** (*نسخ كل السطور من أوامر الشغل*) — appends every detail line (machines,
  spare parts, returned parts, services, dysfunctions, technicians, tools, maintenance groups) of every
  order listed in the *Orders* grid. If the document term ticks *Consider Lines Of FromDoc*, the
  *From document*'s lines are appended too. Pressing it twice appends the lines twice.
- **GeneratePayments** (*إنشاء الدفعات*) — splits the value into an instalment schedule. It asks for
  the number of payments, the period between them and its unit, the start date, a grace period,
  down / first / second / last payment values and a rounding mode. The English label ships as the
  raw name shown here.
- **Generate Receipt Voucher For Selected Payments** (*إنشاء سند قبض للدفعات المختارة*) — opens an
  unsaved receipt voucher for the instalment lines you ticked. It is refused when no line is
  selected, or when none of the selected lines has a remaining value.
- **Generate Receipt Voucher** (*إنشاء سند قبض*) — opens an unsaved receipt voucher for the invoice's
  whole remaining value against the customer.
- **Collect Receipt Vouchers** (*تجميع سندات القبض*) — asks for a date range and brings the
  customer's existing receipt vouchers onto the invoice.

**Maintenance Invoice — tools and visits page:**

- **Tools Issue Request** (*طلب صرف عِدد*) — opens an unsaved stock document in a pop-up, pre-filled
  with the tools grid and the customer.

**Maintenance Invoice — spare parts and services page:**

- **Spare Parts Issue Request** (*طلب صرف قطع غيار*) — opens an unsaved stock issue request in a
  pop-up, pre-filled with the spare-part lines, the customer and the issue warehouse.
- **Returned Spare Parts Receipt Request** (*طلب توريد قطع غيار المرتجعة*) — opens an unsaved stock
  receipt request in a pop-up, pre-filled with the returned spare-part lines, the customer and the
  receipt warehouse.

These are an alternative to the stock issue the invoice term generates, never a supplement — see
[The rules that keep it honest](#The-rules-that-keep-it-honest).

**Maintenance Invoice — billing page:**

- **Request Redeem Customer Amount** — spends the customer's loyalty balance against this document.
  It shows the net value, the points owner and the reward balance still available, and asks how
  much to redeem and against which reward code. The page carries it twice under the same label: the
  one above the payment documents grid records the redemption there, the one above the payment
  methods grid records it as a payment line. This label has no Arabic translation, so it shows in
  English on Arabic screens too.
- **Pay Invoice** (*ادفع الفاتورة*), **Pay Part Of Invoice** (*دفع جزء من الفاتورة*) and **Fetch Last
  Terminal Payment Transaction** (*ايجاد اخر عمليه دفع تمت ولم تصل معلوماتها*) — the card-terminal
  buttons, which need the payment-gateway sub-module. **Pay Part Of Invoice** asks for an amount and
  is refused when nothing remains to be paid. **Fetch Last Terminal Payment Transaction** recovers a
  payment that went through on the terminal but whose confirmation never reached the document.
  The card machine is the one in the invoice's **Payment Terminal** header field (see
  [Payment Methods and Payment Terminals](/platform/payments/payment-methods-and-terminals.md)).

**Maintenance Invoice Return — main page:** only **Copy All From MnOrders** (*نسخ كل السطور من أوامر
الشغل*), working exactly as on the invoice.

## The invoice return

**Maintenance Invoice Return** is the mirror document, raised with the invoice in *From document*.
Its spare-parts grid *is* the return (there is no separate returned-parts grid), and instead of a
stock issue it carries a read-only **stock receipt** reference. Its term is shaped like the
invoice's, with a stock-**receipt** book and term and *Generate stock receipt with spare parts / with
service items*.

Committing it reverses the accounting entry and receipts the parts back into the header warehouse.

The return also inherits the header-warehouse rule above: the generated stock receipt takes item,
quantity and unit of measure only, and everything comes back into the header warehouse.

**Reporting: none.** This module ships no system reports, and this screen has no print form. For
revenue and consumption figures use the list views and their Excel export, the general ledger, or
BI over the generated stock and accounting documents.
