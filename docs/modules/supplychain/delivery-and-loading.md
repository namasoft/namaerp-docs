---
entities: [DeliveryDocument, LoadingDocument, DeliveryQueue, PickRules, DeliveryCancellationDoc, LoadingCancellationDoc, DeliveryQueueConfiguration, DeliveryDriverConfig, DeliveryOrganization]
---
# Delivery & Loading

Between confirming the sales order and issuing the invoice lies the physical stage: preparing the goods, loading them, getting them to the customer, and obtaining proof of receipt. This guide gathers the documents and configuration that manage this final journey - from the warehouse shelf to the customer's door.

## Preparation: Picking Items (Pick)

**Pick Rules** (PickRules) decide which warehouses a sales invoice's quantities are drawn from. They work only on a **Sales Invoice** whose term has **Use Pick List** ticked. When such an invoice is saved, each line takes the first saved rule, in **Pick Order** sequence, whose filters it matches: item, item categories 1–5, brand, warehouse and the header dimensions. An empty filter matches anything, and a rule that names an item must leave the categories empty.

The rule's lines then choose the warehouses: the warehouse source (one **Specific** warehouse, **All** warehouses, or every warehouse whose storage type is **Normal**, **Central** or **Show**), the **Warehouse Priority** among the candidates (**Quantity**, **Warehouse Order** or **Distance**), and whether overdraft is allowed. Each picked quantity turns into a document according to the line's **Pick Policy**:

- **Out** generates a **Stock Issue** when the stock comes from the invoice's own warehouse, and a **Stock Transfer** when it comes from another warehouse.
- **Reserve** generates a **Stock Issue Request** or a **Stock Transfer Request** in the same way.

The books and terms of those documents are set on the rule, and they are required for every policy the rule's lines use.

## Loading: Consolidating the Shipment (LoadingDocument)

The **Loading Document** is created from a **Delivery Document**, and each of its lines names a **Loading Warehouse**. Saving it does not move stock: it touches inventory only by reserving, when its term has **Reserve** ticked. Its quantities count in the delivery system table when its term points at a **Delivery Configuration File** — see [Reservation & Delivery System](/modules/supplychain/document-terms/doc-term-reservation-and-delivery).

The **Loading Cancellation Document** (LoadingCancellationDoc) is created from a Loading Document and cancels it.

## Delivery and Proof of Receipt (DeliveryDocument)

The **Delivery Document** records the delivery of goods to the customer. It is created from a **Reservation Document** or a **Sales Invoice**, and the **Details** group of its main page holds the **Driver**, the **Delivery Car**, the **Technician**, the **Delivery Status** and the **Customer Password**. A new document starts as **Delivering**. Picking a car fills the driver and the technician from the car, and on save the header's driver, car, technician and status are copied onto the lines (the status only onto lines that have none). Like the loading document, it does not move stock; it reserves only when its term has **Reserve** ticked, and it books accounting effects only from the accounts its term fills.

When the term has **Update Delivery Status In From Doc** ticked, each line's delivery status is written back to its source line, and on up through that document's own source. After every save, a source document whose lines all share one delivery status takes that status in its header; when they differ, the header status is cleared.

When the document is first saved it gets a **System Password**: 4 characters, letters and digits, unless the term sets a **System Password Length** and **System Password Pattern**. When the term has **Delivery State Requires Password** ticked, the status cannot be set to **Totally Delivered** until the **Customer Password** matches it, which makes the document the **proof of delivery**.

![Delivery document screen in NaMa ERP](../../ar/modules/supplychain/images/delivery/delivery-document-en.png)

The **Delivery Cancellation Document** (DeliveryCancellationDoc) is created from a Delivery Document and records the **Canceled Quantity** of each line.

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

**On the Delivery Document:** **Add Reservation Doc** — asks you to pick a reservation document and pulls its lines into the delivery, so what was reserved is what gets delivered without re-keying it. A reservation line already pulled into the delivery is not added again. If the document's term has **Consider Satisfied Qties In From Doc** ticked, each line comes in with its unsatisfied quantity and fully satisfied lines are skipped, so nothing is delivered twice; and an empty first line with no item on it is dropped rather than left behind.

## The Full Picture

Imagine goods reserved for a customer:
1. **Picking**: on a sales invoice whose term uses the pick list, the pick rules turn each line into stock issues, transfers or their requests from the right warehouses.
2. **Routing**: with delivery organizations in use, the driver schedule books the document on a driver and car by region, weekday and priority, and the document drops into its delivery queue.
3. **Delivery**: a delivery document is created from the reservation document or the invoice, and its status is set to **Totally Delivered** — with the customer's password when the term requires it.
4. **Loading**: a loading document created from the delivery document records the loading warehouse of each line.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *System password can not be manually changed in delivery document {0}* — «لا يمكن تغيير كلمة سر النظام يدويا في سند توصيل {0}» | The delivery document already carries a system-generated password and the saved value was typed over. The password is the proof of delivery, so only the system may set it. | Restore the password the system produced — reload the document without saving — and record the customer's password in the customer password field instead. |
| *The provided password does not match system generated password* — «كلمة السر لا تطابق كلمة السر التي انشأها النظام» | The term requires a password on delivery, and the password typed in the customer password field is not the one the system generated. | Ask the customer for the code again — it is the one sent with the shipment — and retype it. |
| *Delivery status can not be modified to delivered unless you provide the correct password* — «لا يمكن تعديل الحالة إلى ( تم التوصيل ) إلا بإدخال كلمة السر الصحيحة» | The status is being set to **Totally Delivered** while the customer password is missing or does not match. That is the point of the password: nobody can mark a shipment delivered without the customer's code. | Enter the customer's password, then set the status. If the customer lost the code, the term option **Delivery State Requires Password** is what makes it mandatory. |
| *Cannot find suitable line in {0} for document {1} at date {2}* — «لم يتم ايجاد سطر مناسب في {0} للمستند {1} في التاريخ {2}» | Delivery organizations are in use and the document's term names one, but no Delivery Driver Configuration line of that organization covers the delivery date, the shipping-address region and that weekday (and the driver or car already on the document, if any). | Check the shipping address region and the delivery date, then add or extend a schedule line for that region and day. |
| *Cannot find suitable delivery cars for document {0} with delivery quantity {1}* — «لم يتم ايجاد سيارات توصيل للمستند {0} بالكميات {1}» | Matching schedule lines exist, but their cars have no free capacity for the document's quantity within the **Delivery Search Trials Count** days. | Add a car or driver to the schedule, raise the car's **Max Load**, or raise the organization's trials count. |
| *From Date should be less than To Date* | A Delivery Driver Configuration line ends before it starts. This message has no Arabic text and shows in English on Arabic screens too. | Correct the line's dates — or the header dates, which are copied onto every line. |

## Next Steps

- [The Sales Journey](./sales-journey.md) - where delivery fits in the sales cycle
- [Reservation System Guide](./reservation-system-guide.md) - reserving stock before delivery
- [Moving Stock Between Warehouses](./moving-stock.md) - internal transfers before picking
