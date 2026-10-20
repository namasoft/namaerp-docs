# Freight Management

Welcome to the Freight Management module of Nama ERP — the module built specifically for shipping, forwarding, customs-clearance, postal, and logistics companies, where the "goods" you sell aren't items on a shelf but a **service**: moving a container from port to port, clearing a shipment through customs, delivering a parcel to a customer's door.

## Who is this module for?

Most ERP modules revolve around items entering and leaving a warehouse. Your freight business is different: you sell time, routes, and services. You buy ocean freight, clearance, and trucking from suppliers (shipping lines, agents, hauliers), then resell them to your customer at a margin. The Freight Management module is built around this logic from the ground up:

- **No stock items, no balances** — instead, **service items** (ocean freight, customs clearance, trucking, genset, courier…).
- **One central document** — the *Operation Order* — that gathers every detail of a shipment in one place, and from which bills of lading and invoices branch off.
- **Purchase and sales price lists** per service, with profit **markups** calculated automatically.
- **E-invoicing** that intelligently handles the "agent" model, where part of the amount is a pass-through cost and part is your commission.

Alongside freight and logistics, the module includes a complete **International Postal System (IPS)**: receiving mail receptacles, manifesting items, transferring between offices, sorting, and final last-mile delivery. We cover it in a separate section of this guide.

## Watch the tutorial

A nine-minute video explains how an export forwarder works, then follows one shipment through Nama from the rate sheet to the profit on each line.

<iframe style="width:100%;max-width:800px;aspect-ratio:16/9;border:0" src="https://www.youtube.com/embed/trtGh5iDVFE" title="Freight Forwarding in Nama ERP: From Rate Sheet to Profit per Shipment" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## The Big Picture

Let's follow one export shipment from the rate sheet to the invoice: two refrigerated containers of frozen vegetables, from Damietta to Antwerp.

1. **Rates come in.** Shipping lines change their rates every month, route by route and container by container. You load each line's new rates as a [purchase price list](./freight-pricing.md): Damietta to Antwerp, a 40-foot high-cube reefer, $1,185.
2. **Quotations go out.** From that list, **Create Sales Quotation** builds a sales price list for one customer, with your markup added: $60 a container on ocean freight, so $1,245. Clearance, trucking and genset rates get price lists of their own, from the broker, the trucker and the genset supplier. The quotation then prices every booking that customer makes that month. The steps are on [From Supplier Rates to Customer Quotations](./freight-price-list-workflow.md).
3. **The booking.** When the customer books, you open an [operation order](./operation-orders.md), the shipment's file: shipper, consignee, shipping line, ports, vessel, voyage, booking number, containers, and a tick for each service the shipment needs. **Update All Services** prices every service tab from the customer's quotation, so each line carries its supplier, what it costs you and what you charge.
4. **The bill of lading.** **Create Bill of Lading** copies the parties, the vessel and the ports onto a [bill of lading](./bills-of-lading.md). You add what only loading day tells you: the container numbers, the goods and the weights.
5. **Paying the suppliers.** Truckers, brokers and genset suppliers usually bill per shipment: tick their lines on the order and press **Create Purchase Invoice**. Shipping lines bill many shipments at once: on a purchase invoice, **Update** collects every line from that carrier not invoiced yet, across all operation orders.
6. **Billing the customer.** The [sales invoice](./freight-invoicing.md) takes its lines from the order and matches each one to the supplier's cost on the same order, so it shows, line by line, what you paid and what you made.

Along the way the operation order tracks its **status** (under operation, shipped, arrived…), records a telex release, splits off a short shipment, and copies itself for a similar booking.

## How a forwarder makes money

Every charge on a forwarder's bill is one of three kinds, and knowing which is which explains most of the figures you will see on a sales invoice's **Cost** and **Diff** columns:

| Kind | Examples | On the sales invoice |
|---|---|---|
| **Resold with a margin** | Ocean freight, customs clearance, trucking, genset | Cost is the supplier's price; Diff is your margin. |
| **Passed on at cost** | The shipping line's port charges (THC), official government receipts | Cost equals the price, so Diff is zero. That is correct, not a fault. |
| **Your own fees** | B/L withdrawal, the VGM declaration | There is no supplier, so Cost is zero and the whole price is profit. |

The profit on a shipment is the sum of those margins and fees.

::: tip A Diff equal to the whole price
On a fee of your own, that is expected. On a service that does have a supplier, it usually means the supplier's invoice was saved after the sales invoice — see [Invoices & Returns](./freight-invoicing.md).
:::

## Words you will hear

Forwarders use these terms every day, and the screens use them too.

| Term | Meaning |
|---|---|
| **Shipper** | The exporter who owns the goods, and usually your customer. |
| **Consignee** | The buyer abroad who receives the goods. |
| **Shipping line** | The carrier that owns the ships (ZIM, MSC, Maersk…). In Nama it is an ordinary supplier. |
| **POL / POD** | Port of loading and port of discharge. |
| **Vessel and voyage** | The ship and its trip, for example *ZIM Antwerp, voyage 41S*. |
| **Booking** | The space reserved with the shipping line, with its booking number. In Nama, the operation order. |
| **Reefer / high cube** | A refrigerated container, and the taller box. |
| **Genset** | The generator that powers a reefer while it is on the truck. |
| **Bill of lading (B/L)** | The carrier's receipt for the goods, and the document the buyer needs to collect them. |
| **Telex release / sea waybill** | Releasing the cargo without sending paper original bills. |
| **Prepaid / Collect** | The shipper pays the freight at origin, or the buyer pays it at destination. |
| **VGM** | Verified gross mass: the container's weighed weight, declared before loading. |
| **THC** | Terminal handling charges, the port's fee for handling the container. |

## How documents work in Nama ERP

::: tip Understanding document states
Unlike systems that require a separate "posting" step, Nama ERP acts immediately:

**Draft mode:** Create and edit a document with no accounting effect.

**Saved:** Once a document is saved out of draft, its accounting effect is created **immediately** (revenue/cost/customer and supplier balances).

**Edits:** Any change to a saved document is reflected at once, with no separate confirm step.
:::

## Licensing

The freight and clearance documents are gated behind the module license `frm` (NaMa Freight Management). The postal half has a licence of its own, `frm-ips` — so a licence can carry one without the other. If a licence is missing, its menus simply do not appear.

## How this guide is organized

The module is large, so we've split it into two main areas that mirror how the system itself is organized.

### Freight & Logistics

<LandingGrid>
  <LandingCard icon="🗂️" title="Master Files" link="/modules/freight/freight-master-files.md" details="The infrastructure everything builds on: service items, containers and their types and sizes, vessels, ports, sailing schedules, commodities, countries, and locations." />
  <LandingCard icon="📋" title="Operation Orders" link="/modules/freight/operation-orders.md" details="The central shipment document and everything that branches from it: services, statuses, release, short shipments, and operation-order delivery/receipt/transfer." />
  <LandingCard icon="📜" title="Bills of Lading" link="/modules/freight/bills-of-lading.md" details="The official shipping document, its lines and data." />
  <LandingCard icon="💲" title="Price Lists & Markups" link="/modules/freight/freight-pricing.md" details="Sales and purchase prices per service, profit markups, and updating operation-order services from them." />
  <LandingCard icon="🔁" title="From Supplier Rates to Customer Quotations" link="/modules/freight/freight-price-list-workflow.md" details="Price-list elements, turning supplier rates into quotations, re-pricing, and bulk rate changes with the Edit Purchase Price List." />
  <LandingCard icon="🧾" title="Invoices & Returns" link="/modules/freight/freight-invoicing.md" details="Sales orders, sales and purchase invoices, returns, payments, and linking cost to sale." />
  <LandingCard icon="🏬" title="Storage Locations" link="/modules/freight/freight-storage-locations.md" details="Locations and their capacity, and receiving, moving and releasing operation-order cargo." />
</LandingGrid>

### International Postal System (IPS)

<LandingGrid>
  <LandingCard icon="📮" title="Postal System Overview" link="/modules/freight/ips-postal-intro.md" details="The core concepts: mail items, receptacles, offices, and receipt/delivery areas." />
  <LandingCard icon="✉️" title="Mail Items" link="/modules/freight/ips-mail-items.md" details="The mail-item lifecycle: manifesting, transfer between offices, adjustment, stock taking, retention, and sorting." />
  <LandingCard icon="👜" title="Receptacles" link="/modules/freight/ips-receptacles.md" details="Receiving receptacles, dispatching them on route schedules, and the customs manifest." />
  <LandingCard icon="🚚" title="Delivery Service" link="/modules/freight/ips-delivery.md" details="Delivery requests and invoices, how the sort creates and prices them, and non-delivery handling." />
  <LandingCard icon="🔌" title="IPS Integration" link="/modules/freight/ips-integration.md" details="Reading data from the external IPS server, reporting events, and following up failed events." />
</LandingGrid>

### Setup

<LandingGrid>
  <LandingCard icon="⚙️" title="Freight Configuration" link="/modules/freight/freight-configuration.md" details="The module settings: default service items, storage behaviour, invoice currency totals, and the IPS connection." />
  <LandingCard icon="📑" title="Freight Document Terms" link="/modules/freight/freight-document-terms.md" details="What each freight and postal document term controls: accounting sides, operation-order status, postal events and storage effect." />
</LandingGrid>

### E-Invoicing

<LandingGrid>
  <LandingCard icon="🏛️" title="E-Invoicing Handling" link="/modules/freight/freight-einvoicing.md" details="How the freight module sends its invoices to the tax authority, and how it handles the agent/commission model and service-item tax codes." />
</LandingGrid>
