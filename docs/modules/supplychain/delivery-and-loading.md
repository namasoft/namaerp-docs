---
entities: [DeliveryDocument, LoadingDocument, DeliveryQueue, PickRules, DeliveryCancellationDoc, LoadingCancellationDoc, DeliveryQueueConfiguration, DeliveryDriverConfig, DeliveryOrganization]
---
# Delivery & Loading

Between confirming the sales order and issuing the invoice lies the physical stage: preparing the goods, loading them, getting them to the customer, and obtaining proof of receipt. This guide gathers the documents and configuration that manage this final journey - from the warehouse shelf to the customer's door.

## Preparation: Picking Items (Pick)

Before goods can leave, they must be gathered from their locations in the warehouse. **Pick Rules (PickRules)** determine how the system selects what to pick and from where: oldest first (FIFO), nearest expiry (FEFO), nearest location, or the right batch. A pick list is generated that guides the warehouse worker to the items and their locations in the optimal sequence through the aisles, reducing errors and speeding preparation.

## Loading: Consolidating the Shipment (LoadingDocument)

The **Loading Document** records the consolidation of several deliveries into a single load (truck or shipment): it groups them by route, driver, or vehicle, tracks loading status and vehicle capacity, and links the source orders/invoices to the shipment. This creates a logical "staging area": the goods are no longer in normal storage (not sold to others) and not yet delivered (still in your inventory), but ready on the loading dock organized by shipment.

When you need to cancel a shipment and return its goods to storage, the **Loading Cancellation** (LoadingCancellationDoc) handles it.

## Delivery and Proof of Receipt (DeliveryDocument)

The **Delivery Document** records that items were loaded onto the vehicle, delivered to the customer, and signed for, so they left your custody. The document tracks delivery status (pending, delivered, partial, cancelled), the driver and vehicle per line, and may support delivery confirmation with a customer password. It's the **proof of delivery** document - vital if the customer later claims non-receipt.

![Delivery document screen in NaMa ERP](../../ar/modules/supplychain/images/delivery/delivery-document-en.png)

When a delivery fails or needs to be cancelled and the goods returned, the **Delivery Cancellation** (DeliveryCancellationDoc) handles it, reversing the delivery's effect and returning the goods to available stock.

::: tip Delivery and Reservation
Delivery integrates with the [Reservation System](./reservation-system-guide.md): when delivering goods reserved for an order, the reservation is released and they move from "reserved" to actually "out."
:::

## Delivery Queues: Organizing Distribution (DeliveryQueue)

In delivery-intensive businesses (restaurants, distribution, e-commerce), the people who deliver need one list of what is waiting to go out. A **Delivery Queue** is that list: a named queue, protected by a **Master Pin**, onto which documents drop as entries. Each entry carries its source document, the delivery date, a delivery status (it starts as *Not Delivered*), a short summary and a details text, and whether it is postponed.

![Delivery queue screen in NaMa ERP](../../ar/modules/supplychain/images/delivery/delivery-queue-en.png)

Three configuration files sit behind the queue and the driver schedule.

### Delivery Queue Configuration

A **Delivery Queue Configuration** (DeliveryQueueConfiguration) decides which queue a document drops into. A document term points at one in its **Delivery Queue Configuration** option (`termConfig.deliveryQueueConfig`). Each time a document on that term is saved, the system walks the configuration's lines (`details`) from top to bottom and uses the **first** line the document matches; the document then has exactly one entry in that line's queue, refreshed on every save and removed when the document is deleted. A document that matches no line stays out of the queues.

| Column | Field id | What it does |
|---|---|---|
| Queue | `details.queue` | The Delivery Queue the entry goes to. Required. |
| Criteria | `details.criteriaDefinition` | The document must match these criteria for the line to apply. Empty means any document. |
| When Query | `details.whenQuery` | An extra query the document must satisfy. Empty means no extra condition. |
| Summary Template / Details Template | `details.summaryTemplate`, `details.detailsTemplate` | Text templates filled from the document — for example the customer's name and address — to give the entry's summary and details. |
| Postponed | `details.postponed` | Ticked, the entry is created as postponed. |

The entry's delivery date is the document's delivery date, or its value date when it has none.

### Delivery Driver Configuration

A **Delivery Driver Configuration File** (DeliveryDriverConfig) is a schedule: which driver, in which car, serves which delivery region, on which days of the week, between which dates. It works only when the supply chain option **Use Delivery Organization Files** (`value.useDeliveryOrganization`) is on and the sales document's term names a **Delivery Organization File** (`termConfig.deliveryOrganization`).

When such a sales document is saved, the system looks for schedule lines that belong to that delivery organization, cover the delivery date (the document's delivery date, or the day after its value date), match the region of the document's shipping address, and have the delivery date's weekday ticked. If the document already names a driver or a car, the line must have the same one. The matching lines are tried by **Priority** (lowest number first), and the document's deliverable quantity is loaded onto their cars up to each car's **Max Load**, taking into account what earlier documents already booked on that car that day. Whatever does not fit moves to the next delivery day.

| Field | Field id | What it does |
|---|---|---|
| From Date / To Date | `fromDate`, `toDate` | The period the schedule is valid for. |
| Driver | `driver` | The driver (an employee). |
| Delivery Car | `deliveryCar` | The car; its **Max Load** caps what can be booked on it per day. |
| Delivery Region | `deliveryRegion` | The region served, matched against the shipping address of the document. |
| Delivery Organization File | `deliveryOrganization` | The organization the schedule belongs to. |
| Priority | `priority` | Required. Lower numbers are tried first. |
| Delivery All Week | `allWeek` | Ticks every weekday on the lines. |
| Schedule lines | `details` (`driver`, `deliveryCar`, `deliveryRegion`, `fromDate`, `toDate`, `allWeek`, `deliversOnSaturday` … `deliversOnFriday`) | One line per driver–car–region combination, each with its own dates and **Delivery On *day*** ticks. A line's **To Date** must not be before its **From Date**. |

The header fields are shortcuts: anything filled (or ticked) on the header is copied onto every line when you save, overwriting the line's own value. Leave a header field empty when the lines differ — for example, fill only **Delivery Region** and **Priority** on the header and list one line per driver.

### Delivery Organization

A **Delivery Organization File** (DeliveryOrganization) groups driver schedules and lists them on its own screen. It holds two settings:

- **Delivery Search Trials Count** (`deliverySearchTrials`) — how many delivery days ahead the system may look for free car capacity before giving up (60 when left empty). A document that already has a delivery date gets one day only.
- **Copy Delivery Data From System Tables** (`copyDeliveryDataFromEntries`) — when ticked, the driver, car and delivery date the system booked are written back onto the sales document.

## Actions on this screen

**On the Delivery Document:** **Add Reservation Doc** — asks you to pick a reservation document and pulls its lines into the delivery, so what was reserved is what gets delivered without re-keying it. If the document's term has *Consider Satisfied Quantities In From Doc* switched on, the already-satisfied quantities are taken into account rather than delivered twice; and an empty first line with no item on it is dropped rather than left behind.

## The Full Picture

Imagine a sales order ready for fulfillment:
1. **Preparation**: a pick list is generated per its rules, and the worker gathers items from their locations.
2. **Loading**: the loading document consolidates several deliveries into the route truck, and the goods move to the loading dock.
3. **Routing**: with delivery organizations in use, the driver schedule books the shipment on a driver and car by region, weekday and priority, and the document drops into its delivery queue.
4. **Delivery**: the driver delivers, the delivery document is recorded with proof of receipt, the reservation is released, and the goods leave your inventory.
5. **Invoicing**: the [Sales Invoice](./sales-journey.md) is issued to complete the financial transaction.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *System password can not be manually changed in delivery document {0}* — «لا يمكن تغيير كلمة سر النظام يدويا في سند توصيل {0}» | The delivery document already carries a system-generated password and the saved value was typed over. The password is the proof of delivery, so only the system may set it. | Restore the password the system produced — reload the document without saving — and record the customer's password in the customer password field instead. |
| *The provided password does not match system generated password* — «كلمة السر لا تطابق كلمة السر التي انشأها النظام» | The term requires a password on delivery, and the password typed in the customer password field is not the one the system generated. | Ask the customer for the code again — it is the one sent with the shipment — and retype it. |
| *Delivery status can not be modified to delivered unless you provide the correct password* — «لا يمكن تعديل الحالة إلى ( تم التوصيل ) إلا بإدخال كلمة السر الصحيحة» | The status is being set to *Delivered* while the customer password is missing or does not match. That is the point of the password: nobody can mark a shipment delivered without the customer's code. | Enter the customer's password, then set the status. If the customer lost the code, the term option **Delivery State Requires Password** is what makes it mandatory. |
| *Cannot find suitable line in {0} for document {1} at date {2}* — «لم يتم ايجاد سطر مناسب في {0} للمستند {1} في التاريخ {2}» | Delivery organizations are in use and the document's term names one, but no Delivery Driver Configuration line of that organization covers the delivery date, the shipping-address region and that weekday (and the driver or car already on the document, if any). | Check the shipping address region and the delivery date, then add or extend a schedule line for that region and day. |
| *Cannot find suitable delivery cars for document {0} with delivery quantity {1}* — «لم يتم ايجاد سيارات توصيل للمستند {0} بالكميات {1}» | Matching schedule lines exist, but their cars have no free capacity for the document's quantity within the **Delivery Search Trials Count** days. | Add a car or driver to the schedule, raise the car's **Max Load**, or raise the organization's trials count. |
| *From Date should be less than To Date* | A Delivery Driver Configuration line ends before it starts. This message has no Arabic text and shows in English on Arabic screens too. | Correct the line's dates — or the header dates, which are copied onto every line. |

## Next Steps

- [The Sales Journey](./sales-journey.md) - where delivery fits in the sales cycle
- [Reservation System Guide](./reservation-system-guide.md) - reserving stock before delivery
- [Moving Stock Between Warehouses](./moving-stock.md) - internal transfers before picking
