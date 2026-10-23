---
description: "Freight sales and purchase documents: the Sales Order, Sales Invoice and Sales Return, the Purchase Invoice and Purchase Return, how they link to the operation order, and their term configuration and accounting effect."
entities: [FRMSalesInvoice, FRMPurchaseInvoice, FRMSalesOrder, FRMSalesReturn, FRMPurchaseReturn]
---
# Invoices & Returns

This is where operational work turns into financial effect: you sell services to the customer, buy them from suppliers, and track the difference between the two. Every document in this section is found under **Freight Management System → Documents**, and all are usually linked to an [operation order](./operation-orders.md).

## The sales cycle

### Sales Order

The optional starting point: you offer the customer the services and their prices before executing the shipment. The sales order carries the same structure as the invoice (customer, sales man, operation order, service lines with prices and taxes) but creates no financial effect — it's a promise of service, later converted into an invoice.

![Sales order](../../ar/modules/freight/images/invoicing/sales-order-en.png)

### Sales Invoice

The invoice is the document that records the sale in accounting and bills the customer for the service value. It consists of:

- **Customer, sales man, and operation order**, plus the service provider.
- **Service lines (Details)** — each line with its service item, quantity, price, currency, and tax, plus the **Cost** and **Diff** computed automatically.
- **Invoiced Bills of Lading** — links bills to the invoice, so bill and container numbers are gathered into the invoice header.
- **E-Invoice Details** — a consolidated version of the lines sent to the tax authority (see [E-Invoicing](./freight-einvoicing.md)).
- **Payment Lines / External Payments** — to record cash collection or collection via payment methods.

![Sales invoice](../../ar/modules/freight/images/invoicing/sales-invoice-en.png)

::: info Linking cost to sale automatically
Every time the sales invoice is saved, the system looks for the matching purchase lines in the same operation order and links them to the sale lines, computing each service's cost and marking the purchase lines as "used" in this invoice. This way you know your net profit on each service, and cost is never counted twice.
:::

::: warning Save the supplier invoices first
The match only finds purchase invoices that were already saved. A supplier invoice saved after the sales invoice does not update it: that line keeps a **Cost** of 0 and a **Diff** equal to its whole price. To pick up the cost, open the sales invoice, make any change, and save it again — the screen will not save a record with nothing changed.

Where a service item has a commission item, the [e-invoice](./freight-einvoicing.md) is built from the same cost, so a missing cost sends the whole amount as your commission. Correct the cost before the invoice goes to the tax authority.
:::

#### Buttons on the sales invoice

- **Update Data** (main tab) — rebuilds the service lines from the invoice's **Operation Order**:
  one line per operation-order service line priced in the invoice currency, at its selling price,
  with the line's tax taken from the service item's tax plan. Ocean-freight lines that carry ENS-CDD
  or ISPS amounts add a line for each, under the default service items of
  [Freight Configuration](./freight-configuration.md). The same lines are brought in when you pick
  the invoice currency after the operation order. The invoice must already have the operation order.
- **Pay Invoice** and **Sales Collect Lots** (main tab), and **GeneratePayments**, **Generate
  Receipt Voucher** and **Collect Receipt Vouchers** on the **Billing** tab — the standard payment
  buttons of Nama invoices; they behave here as on an ordinary sales invoice.
- **Collect Bill of Ladings** (**Bills of Lading** tab) — fills the tab with every container line of
  every bill of lading created from the invoice's operation order. Tick the ones this invoice
  covers and press **Delete UnRelated Lines** to drop the rest.

The Sales Return carries the payment buttons but not **Update Data** or the bill-of-lading buttons;
the Sales Order has only **Generate Receipt Voucher** and **Collect Receipt Vouchers**.

### Sales Return

To reverse a sales invoice fully or partially (a service that wasn't performed, or an invoicing correction), recording the reverse effect on the customer and revenue accounts.

## The purchase cycle

### Purchase Invoice

Records what you buy from suppliers (shipping line, clearance agent, transport company…). It's usually created from the [operation order](./operation-orders.md) with the **Create Purchase Invoice** button, inheriting the purchased service lines. Its lines are the source of the **cost** that is later matched against the sale lines.

![Purchase invoice](../../ar/modules/freight/images/invoicing/purchase-invoice-en.png)

On the purchase invoice, the lines also fill by themselves when you pick the **Operation Order**
and the **Service Provider**: every service line of that order bought from that provider in the
invoice currency, at its purchase price. The **Update** button goes further and needs no operation
order — given the **Service Provider** and currency, it collects every operation-order service line
from that provider that has not been invoiced yet, across all operation orders, so one supplier
invoice can cover a month of shipments.

### Purchase Return

To reverse a purchase invoice fully or partially when cancelling a service you bought from a supplier or correcting its value.

## Term Config and accounting effect

The document's **Term Config** controls each invoice's accounting effect: revenue/cost accounts, tax accounts (Tax / Tax 2 / addition and discount taxes), the various discount accounts, and cash. The sales invoice term config also carries two freight-specific settings:

- **Status** — the operation-order status that is recorded automatically when the invoice is saved, so you track which shipment has been invoiced.
- **Do not send a cost line for commission items** — an option for the agent model in [E-Invoicing](./freight-einvoicing.md).

Every option on the freight invoice terms is explained on [Freight Document Terms](./freight-document-terms.md).

::: warning Repeated items not allowed
The system won't accept the same service item with the same currency and same quantity twice in one invoice, to keep cost matching accurate. If you need two identical lines, merge them into one line with a combined quantity.
:::
