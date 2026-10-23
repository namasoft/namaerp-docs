---
entities: [FRMSalesInvoice, FRMServiceItem]
---
# E-Invoicing in the Freight Module

The freight module's invoices plug into Nama ERP's e-invoicing framework exactly like ordinary sales invoices — they are Tax Authority Documents sent to the relevant authority (ZATCA in Saudi Arabia, the Egyptian Tax Authority, the UAE system…). But the nature of freight work imposes special handling, chiefly the **agent model**, where part of the invoice value is a pass-through cost and part is your commission. This page explains what is specific to the freight module; for the general setup of the framework, see the **[E-Invoices Guide](../invoicing/e-invoices-guide.md)** and the **[ZATCA Guide](../invoicing/zatca-guide.md)**.

## Which freight documents are sent to the authority?

The freight **Sales Invoice** and its **Sales Return** carry tax-authority fields and are sent electronically.

Purchase invoices are not sent to the authority (a purchase isn't an invoice issued by you). Neither are the postal [Delivery Request and Delivery Invoice](./ips-delivery.md): they carry no tax-authority fields.

## E-Invoice Details

The most distinctive thing about a freight invoice is that it keeps two sets of lines:

1. **Service lines (Details)** — the operational lines the user enters, with their cost, selling price, and all their keys (port, container, commodity…).
2. **E-Invoice Details** — an **automatically generated** list, rebuilt on every save, and the one actually sent to the authority.

Why two lists? Because what you need operationally (a line per service per port and container) differs from what the authority expects (clean, consolidated items). On save, the system consolidates the operational lines into e-invoice lines by: **service item, currency, exchange rate, the four tax percentages, and the discount percentages** — lines matching on these keys are merged into a single e-invoice line. Any e-invoice line with a zero price is dropped before sending.

::: info Don't edit the e-invoice lines manually
These lines are a computed result, regenerated on every save from the operational lines. Edit the operational lines and let the system build the electronic version.
:::

![An FRM Sales Invoice](../../ar/modules/freight/images/einvoicing/frm-sales-invoice-screen-en.png)

## The agent model: cost versus commission

In many freight services you are an **agent**: you collect an amount from the customer, part of which is a cost that passes through to the shipping line or the actual party, and part of which is your own commission. The authority sometimes needs to distinguish the two, or to not count the pass-through cost as your revenue.

The system handles this through the **Commission Item** defined on the [service item](./freight-master-files.md):

- If a service item has a **commission item**, the system splits the line value into two parts in the e-invoice: the **cost part** is sent under the original service item, and the **commission part** (the difference between sale and cost) is sent under the commission item.
- The **Do not send a cost line for commission items** option (in the [invoice term config](./freight-invoicing.md)) controls whether the cost part is sent at all, or only the commission line is sent — which suits cases where only the commission is invoiced to the authority.

This way the document sent to the authority reflects the real nature of your income (the agency commission) rather than the gross amount passing through you.

## Service-item codes for the authority

Each service needs a correct definition with the authority. The [service item](./freight-master-files.md) provides three fields for this:

- **Tax Authority Code** — the official classification of the service with the authority, sent with each line.
- **E-Invoice Item** — a substitute item sent to the authority instead of the operational one, when you want to consolidate several operational items under one representative tax item.
- **Send By Local Currency** — forces the line to be sent in local currency even if the service is priced in a foreign currency, as some authorities require.

## Validation, sending, and follow-up

From the invoice toolbar you'll find the e-invoicing actions:

- **Validate Tax Authority Document** — checks the invoice before sending and shows what it's missing (a missing tax code, incomplete customer data…).
- **View Invoice at E-Invoice Site** — opens the invoice on the authority's portal (for a logged-in user or as a visitor).

The send status and authority identifiers (UUID and others) are stored in the document's **Tax Authority System Fields**. And if sending fails, it is reprocessed from the **Business Requests** view like the rest of the framework's documents.

::: tip Set up once
Authority codes and commission items are defined once on the service items and the invoice term config. Once set, the e-invoice lines are generated and sent automatically with every invoice, with no manual intervention.
:::
