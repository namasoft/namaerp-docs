---
entities: [MnSrvInvoice, MnSrvInvoiceReturn]
menu: Customer Relationship Management → Service Documents → Maintenance Service Invoice
---
# Service Invoicing

This page covers the Maintenance Service Invoice and its return: what they bill, what saving them does, and the buttons on both screens.

::: info Required licence
The Maintenance Service Invoice and Maintenance Service Invoice Return need the licence code `crm-maintenance-services`.
:::

::: warning The services branch bills spare parts
A service line in this branch carries no item, no quantity and no price, so a **Maintenance Service Invoice bills its spare-part lines.**

If your product *is* labour — cleaning, security cover, a monthly servicing retainer — this suite cannot invoice it as it stands. The only route the product supports is to register the service fee as a stock or service **item** and put it in the **Spare Parts** grid, so that it is billed as a part. If that is not acceptable, use the machine maintenance branch instead, which has priced service lines; [Services or Machines?](/modules/crm/services-suite/crm-services-suite-overview) explains the trade.
:::

![The Maintenance Service Invoice screen](../../../ar/modules/crm/images/services-suite/crm-srv-invoice-en.png)

## Raising the Invoice

There are two buttons that produce one, both labelled **Create Service Invoice** (إنشاء فاتورة خدمة), and both open a new, unsaved Maintenance Service Invoice in a pop-up with the source document as its From Document. The one on the **Maintenance Service Order** copies the order wholesale — customer, contact, service, status, order type, salesman, serial number, warranty fields and all four money groups on the header, and the services, dysfunctions, tools, spare parts, technicians, maintenance groups and returned spare parts in the grids. The one on the **Maintenance Service Order Execution** copies less: the customer, the service (as a single services line), the remarks, the money groups and the spare parts.

Al Nokhba invoices `SO-0058` on 16 May 2026 as `SINV-0033`:

| | |
|---|---|
| Spare part `SP-FLT-10` × 8 @ 180.00 | **1,440.00** |
| Total | 1,440.00 |
| Sales tax 14 % | 201.60 |
| Net value | **1,641.60** |

## What Saving the Invoice Does

Saving is instant; the effects are created as business requests and processed in the background, so watch the document's processing status rather than the save button. If something fails, it is retried from the **Business Requests** list view — filter by failed status, select the rows and use **More → Reprocess**.

**The accounting entry.** The invoice creates a full sales-side entry from the debit and credit sides on its document term, together with the tax, discount, cash and service-fee sides configured there. For `SINV-0033` that is 1,641.60 against the customer's receivable, 1,440.00 to spare-parts revenue and 201.60 to sales tax. Only spare-part lines carry value into it.

**The stock issue.** If the invoice's document term names a stock-issue book and term and has **Generate Stock Issue With Spare Parts** (إنشاء سند صرف مخزني بقطع الغيار) ticked, saving the invoice creates a real Stock Issue and remembers it in the read-only **Stock Issue** (صرف مخزني) field on the header. `SINV-0033` produces `SI-1955` from warehouse `WH-ALX` carrying 8 × `SP-FLT-10`. **This is the document that actually takes the parts out of stock** — not the order and not the execution sheet.

::: warning Parts always leave the header warehouse
The generated stock issue takes its warehouse from the invoice **header** and carries each spare-part line's item and quantity. A visit that draws parts from two different warehouses is recorded on two invoices, one per warehouse. Fill the header warehouse before you save.
:::

## Correcting an Invoice

To reverse a saved Maintenance Service Invoice, raise a **Maintenance Service Invoice Return** against it: the return creates the reversing entry and the stock receipt, as described below. Correct service invoices with a return.

## Returns

The **Maintenance Service Invoice Return** (مردود فاتورة خدمة الصيانة) is the reverse of the invoice. It creates a purchase-side accounting entry from its own document term, and it generates a **Stock Receipt** from the term's stock-receipt book and term when *Generate Stock Receipt With Spare Parts* is ticked. Cancelling a return reverses its entry and cancels its stock receipt.

It also **requires a warehouse** before it will save.

## Actions on these screens

**On the Maintenance Service Invoice:**

- **Copy All Lines From Service Orders** (*نسخ كل السطور من أوامر الشغل*), on the main tab — fill the invoice's **Orders** grid with one or more service orders first, then press it. It copies the services, dysfunctions, tools, spare parts, technicians, maintenance groups and returned spare parts of every listed order into the invoice's grids, replacing what they held. If the invoice's document term has **Consider Lines Of FromDoc** (اعتبار سطور مستند بناءً على) ticked, the lines of the From Document are copied too. With an empty Orders grid it does nothing.
- **Tools Issue** (*طلب صرف عِدد*), on the Tools And Visits tab — opens an unsaved stock request pre-filled with the tools grid and the customer.
- **Spare Parts Issue** (*طلب صرف قطع غيار*), on the Spare Parts And Services tab — opens an unsaved Stock Issue Request with the spare parts, the customer and the invoice's issue warehouse. You do not need it when the invoice's term generates the stock issue on save, as described above.
- **Spare Parts Receipt** (*طلب توريد قطع غيار المرتجعة*), on the same tab — opens an unsaved Stock Receipt Request with the returned spare parts.

All three stock buttons need the invoice saved first, and none of them saves anything itself.

**On the Maintenance Service Invoice Return:** **Copy All Lines From Service Orders** (*نسخ كل السطور من أوامر الشغل*) works exactly as on the invoice, reading the return's own Orders grid.

## When a Document Will Not Save

Both the invoice and the return need a document term whose settings page has been filled in. If a user reports an unclear error on save, check the document term first: it is usually a term that was created and never configured.

The term settings that actually matter here are covered in [Maintenance Document Terms](/modules/crm/document-terms/crm-maintenance-terms).

## Reporting on Any of This

There are **no system reports and no dashboards for CRM at all**, and none for this branch in particular. What you have is the list view, its column set and its filters, Excel export, and whatever BI dashboards your site builds. If somebody asks for "the service revenue report", remember that this branch bills spare-part lines: a service fee billed as an item is reported under that item.
