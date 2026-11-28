---
description: "The FRM Operation Order, the complete shipment file: parties, voyage and container data, service lines with costs and selling prices, its buttons, the operation order status, the Delivery, Receipt and Transfer documents, and the messages shown."
entities: [FRMOperationOrder, FRMOOStatus, FRMOODelivery, FRMOOReceipt, FRMOOTransfer]
menu: Freight Management System → Documents → FRM Operation Order
---
# Operation Orders

The operation order is the heart of the Freight Management module. Think of it as the **complete shipment file**: everything about a single shipment — the parties, the vessel and voyage, the ports, the container, and the services with their costs and selling prices — lives here. And from the operation order, the bill of lading and the sales and purchase invoices branch off.

You'll find it under **Freight Management System → Documents → FRM Operation Order**.

![Operation order](../../ar/modules/freight/images/operation-order/operation-order-en.png)

## Shipment parties

An operation order starts by identifying who is involved in the shipment:

- **Shipper** — the customer who owns the goods being sent.
- **Consignee** — the receiving party.
- **Agent** and **Notify / Notify 2** — the parties notified of the shipment's arrival.
- **Shipping Line** — the supplier carrying out the ocean freight.
- **Subsidiary** — the party billed financially (customer, supplier, employee, account…).

You also set whether the shipment is **Import** or **Export**, and **Collect** or **Prepaid**.

## Voyage and container data

In this section you record the transport details:

- **Ocean Vessel and Voyage**, plus the carrier booking number.
- **Loading, discharge, and final-destination ports**, and the gate-in/gate-out ports.
- **Estimated dates** for loading, discharge, actual sailing, and sailing days.
- **Container, its type, and count**, plus the total container number.
- Sensitive-shipment data such as **temperature, humidity, and ventilation** for reefer containers.
- **Commodity**, shipping type, and operation status.

## Services — the core of the operation order

What sets the operation order apart is that it splits services into **separate sections**, each with its own lines carrying cost and selling price:

| Section | Purpose |
|---------|---------|
| **Ocean Freight** | freight charges from the shipping line |
| **Custom Clearance** | clearance fees and services |
| **Trucking** | inland transport to/from the port |
| **Genset** | running refrigeration units |
| **Courier** | sending documents |
| **Other** | any additional services |
| **Transport / Remarks** | operational notes and data |
| **Loading Points** | goods loading locations; each line can also name the **Container**, **Loading Date** and **Loading Time** |
| **Certificates & Forms** | documents required for the shipment |
| **Dimensions** and **Commodity** | weights and volumes of the goods |

Flags such as *ocean freight? clearance? trucking?* control which sections appear, so you only see what applies to your shipment.

## Buttons on the operation order

The operation order's buttons sit on the tab they act on.

**On the Ocean Freight tab** (the first tab):

- **Create Bill of Lading** — the order must be saved first. Opens a new [bill of lading](./bills-of-lading.md)
  in a pop-up, filled from the order: the parties and their addresses, vessel, voyage, ports,
  carrier booking number, commodity, reefer settings and bill-of-lading type. Its estimated arrival
  date is the actual sailing date plus the order's sailing days.
- **Create Purchase Invoice** — opens a new [purchase invoice](./freight-invoicing.md) in a pop-up
  with one line for every service line whose **Selected** box is ticked, in any section, at its
  purchase price. Tick the lines first; with none ticked the button stops.
- **Update All Services** — refreshes every section the order uses (ocean freight, custom
  clearance, trucking, genset, courier, other) from the matching [price lists](./freight-pricing.md)
  in one go. It needs the **Shipper**, then presses each ticked section's **Update Data** button for
  you, with that button's own rules (below).
- **Update Data** — the same, for the ocean-freight section only.
- **Duplicate Operation** — the order must be saved first. Opens a copy of the order for a similar
  shipment, with the booking number, vessel, voyage, estimated dates, departure date and cut-off
  time cleared.
- **Short Shipment** — opens a follow-up order for cargo that missed the sailing. The new order is
  coded after the original with a running suffix (`OO-0012-1`, `OO-0012-2`…), points back to it in
  **From Document**, and starts with all its service sections empty.

**On the Custom Clearance, Trucking, Genset and Other tabs**, each section has its own **Update
Data** button that refreshes just that section. The Other tab has two: one for the other-services
lines and one for the courier lines.

### How the Update Data buttons find their lines

Every **Update Data** button looks for price-list lines of its own service type that are valid on
the order's **Actual Date Sailing**: a line is taken only when that date falls between its **Valid
From** and **Valid To**. On top of that, each button has its own matching rules:

| Tab | Looks in | Must be filled on the order | A price-list line is taken when it matches |
|---|---|---|---|
| Ocean Freight | sales price lists | Shipper, Shipping Line, Port Of Loading, Port Of Discharge | the customer (the Shipper), the service provider (the Shipping Line), both ports, the Commodity when the order has one, and the Collect / Prepaid choice |
| Custom Clearance | sales price lists | Shipper, Port Of Loading, Commodity | the customer, the port of loading and the commodity |
| Custom Clearance with **Update Data With Validity Only** ticked | sales price lists | Shipper | the customer only |
| Trucking | sales price lists | Shipper; also Gate In Port, Gate Out Port and Loading Point unless **Multi Loading Points** is on | the customer, plus the gate-in port, gate-out port and loading point: the order header's, or those of any line in the Loading Points table when **Multi Loading Points** is on |
| Genset | sales price lists | as for trucking | as for trucking, except that with **Multi Loading Points** on, a Loading Points line is matched on its two gate ports only |
| Other | sales price lists | Shipper | the customer only. When the Actual Date Sailing is empty, the document date is used for the validity check |
| Courier (on the Other tab) | **purchase** price lists | Shipping Line, Country | the service provider (the Shipping Line) and the country. The customer plays no part |

**Multi Loading Points** is a switch in [Freight Configuration](./freight-configuration.md).

The Collect / Prepaid choice on ocean freight works like this. With both ticked, the button brings the
collect lines priced for the **Collect CNTR** count and the prepaid lines priced for the **Prepaid
CNTR** count. With only one ticked, it brings only the lines marked the same way. With neither ticked,
it brings only the lines marked neither Collect nor Prepaid.

Every other line takes its quantity from the order's **Total CNTR**, with three exceptions:
clearance lines keep the quantity written on the price-list line, a trucking or genset line takes the
quantity of the matching Loading Points line when there is one, and other-services lines always come
in with a quantity of 1.

::: tip When clearance rates do not depend on port or commodity
Say a customer has one clearance price list whose rates apply to any port and any commodity. With
the normal rules, an order for that customer must name a port of loading and a commodity, and only
price-list lines with exactly those values come in. Tick **Update Data With Validity Only** on the
Custom Clearance tab and the button brings every clearance line from that customer's price lists
that is valid on the sailing date, whatever port or commodity it names. Only the **Shipper** is
then required.
:::

::: tip What a refresh keeps
An **Update Data** button replaces its whole section with what the price lists return. A line whose
**Ignore Update** box is ticked keeps its current values when the price list still returns its sales
element. A line the price lists no longer return is removed, even with **Ignore Update** ticked, and
so is a line you added by hand. Lines brought in by the buttons arrive with **Ignore Update** already
ticked, so press the button again only after unticking the lines you want refreshed.
:::

**On the operation order list**, the **More** menu has **Telex Released**: select the orders whose
original bills were released by telex and run it to tick **Telex Released** on all of them at once.

## Operation order status (FRM OO Status)

Each operation order tracks its **status** across its lifecycle. The status isn't only updated manually — it also changes automatically via **status entries** recorded by the documents that handle the order: a sales invoice, sales order or sales return, and the operation-order receipt, transfer and delivery, each stamp the status set on their [document term](./freight-document-terms.md). The order shows the latest one, so you instantly know which shipment is in the yard, which has left, and which has been invoiced.

## Delivery, Receipt, and Transfer

Alongside the operation order, the module offers helper documents to manage the physical movement of containers and goods:

- **FRM OO Delivery** — delivering the goods/container.
- **FRM OO Receipt** — receiving them.
- **FRM OO Transfer** — moving them between locations.

You'll find these files under **Master Files**, and they're used to track the physical location of the shipment independently of its financial effect. How they fill and empty locations is on [Storage Locations](./freight-storage-locations.md).

## Messages you may see

The capacity and dimension rules checked when an **FRM OO Receipt** is saved are listed on [Storage Locations](/modules/freight/freight-storage-locations#Messages-you-may-see).

| Message | Why | What to do |
|---|---|---|
| *You should select some lines* — «يجب اختيار بعض السطور أولا» | **Create Purchase Invoice** was pressed with no service line ticked **Selected**. | Tick the lines to be bought, then press it again. |
| *Shipper is required* — «حقول مطلوبة: العميل/مرسل من» | **Update All Services**, or the **Update Data** button of the Trucking, Genset or Other tab, or of the Custom Clearance tab with **Update Data With Validity Only** ticked, was pressed with no **Shipper**. | Fill the Shipper and press the button again. |
| *Shipper, shipping line, port of loading and port of discharge are required* — «حقول مطلوبة: العميل/مرسل من،الخط الملاحي، ميناء التحميل، ميناء التفريغ» | The ocean-freight **Update Data** button needs all four fields to find the rates. | Fill the missing fields and press the button again. |
| *Shipper, port of loading and commodity are required* — «حقول مطلوبة: العميل/مرسل من، ميناء التحميل، السلعة» | The clearance **Update Data** button matches price-list lines on the port of loading and the commodity. | Fill the missing fields, or tick **Update Data With Validity Only** when the customer's clearance rates do not depend on port or commodity. |
| *Gate in port, gate out port and loading point are required* — «حقول مطلوبة: ميناء الدخول،ميناء الخروج، نقطة التحميل» | The trucking or genset **Update Data** button was pressed while **Multi Loading Points** is off, so it matches on the header's gate ports and loading point. | Fill the three fields, or fill the Loading Points table if the module uses **Multi Loading Points**. |
| *Shipping line and country are required* — «حقول مطلوبة: الخط الملاحي،الدولة» | The courier **Update Data** button looks up the courier's purchase rates by shipping line and country. | Fill both fields and press the button again. |
| *You Must Select at least One Of Service Item Types* — «يجب اختيار خدمة واحدة على الأقل من الخدمات الأربعة التالية(شحن بحري ـ نقل ـ تخليص ـ مولدات)» | None of the four service flags — ocean freight, custom clearance, trucking, genset — is ticked on the operation order, so no service section would appear. | Tick the flags that describe the shipment; they are what makes the matching service sections visible. |
| *Sales price {0} can not be lower than the purchase price (cost price) {1}* — «لا يمكن أن يكون سعر البيع {0} أقل من سعر الشراء (سعر التكلفة) {1}» | A service line on the order sells below what it costs. The check runs on save, line by line, in the Ocean Freight, Custom Clearance, Trucking, Genset and Other sections. | Raise the line's sales price, or correct its purchase price. |
| *The Sum Of Collect CNTR and Prepaid CNTR: {0}  Not Equal To Total Container Number {1} .* — «مجموع Collect CNTR + Prepaid = {0} لا يساوي إجمالي عدد الحاويات {1} .» | On save, **Collect CNTR** plus **Prepaid CNTR** must equal **Total CNTR**. | Correct the three counts so they add up. |
