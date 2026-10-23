---
description: "Step-by-step setup of Service Center in a new database: saving the settings screen, decisions to make first, workshop setup, turning car tracking on for the dealership, and the extras."
---
# Setting Up a Service Center

Standing this module up in a fresh database is less about the number of screens and more about the order you touch them in, and about three or four decisions that are cheap to make now and painful to change later.

There is also one trap that catches almost every new installation, and it is not where you would look for it: **the car-tracking half of the module is switched off out of the box**, and switching it on takes three separate actions in three different places. That is covered below under [Turning Car Tracking On](#Turning-Car-Tracking-On) — read it before you promise a go-live date for the showroom.

This page walks the setup as Al-Sahra Motors would actually do it: the workshop first, the dealership second, the extras last.

::: info Required licence
Nothing in this module exists without a licence. Before you start, confirm which of the six codes you actually hold — `srvcenter` for the workshop, `srvcenter-subitems` for the cars, `srvcenter-insurance-and-installments`, `srvcenter-rental-assets`, `srvcenter-mobile-delivery`, `srvcenter-service-queues`. If a menu folder described here is missing, it is a licence question, not a permissions question. See [Service Center](/modules/servicecenter/servicecenter-overview.md) for what each code covers.
:::

## Step Zero — Open the Settings Screen and Save It Once

Do this before anything else, even if you change nothing.

Several parts of the module read the Service Center settings record — closing a job order and recalculating prices are two of them — so the record has to exist before they run.

So: open **Service Center → ` Settings`**, open the module settings screen, and save it. The defaults are sensible — 80 % of capacity to appointments, closing blocked while tasks are unfinished, busy technicians hidden — and you can revisit them at leisure. What matters is that the record exists.

(That folder label begins with a space on screen, so it looks slightly indented. It is the same folder.)

## Decisions to Settle Before You Type

Four questions. All four are answered on the settings screen, all four are read constantly, and all four are annoying to reverse once documents exist. The full option list is in [Service Center Settings](/modules/servicecenter/servicecenter-configuration.md); these are the ones with consequences.

### Where service prices come from

**Service Price Strategy** decides whether a task's hourly rate and a service's total price are taken from the ordinary price columns or from the manufacturer's recommended price columns. It is a single installation-wide switch, and it applies at the moment a price is pulled onto a document. Change it later and existing documents keep the prices they were given, while new ones use the other column — which is exactly the kind of inconsistency that makes a price list look broken. Decide once.

### How rentals are priced

**Pricing Method** — *By Hour* or *By Day* — is likewise **one setting for the whole installation**, not per asset and not per booking. It changes both the arithmetic and the screen layout of every rental document. All the rental examples in this documentation are By Hour; see [Renting Out Assets](/modules/servicecenter/rental-assets/servicecenter-rental-overview.md).

### One work centre, or several

A [work centre](/modules/servicecenter/workshop-setup/servicecenter-work-centers.md) is the shop: its warehouse, its fallback labour rate, its reception window, its bay count and hours per bay. Al-Sahra has two — a mechanical hall and a body shop — which is the natural modelling choice.

### Whether an item carries individually tracked cars

This one belongs to the dealership half and is the least reversible thing in the module: an item's **Has Sub Item** switch cannot be changed once the item has transactions. Decide before you buy the first car whether a given model is ordinary stock or an individually tracked vehicle. See the next section.

## Part One — The Workshop, In Order

### 1. The shop

Create a [work centre](/modules/servicecenter/workshop-setup/servicecenter-work-centers.md) for each hall. Give it the warehouse its parts come out of, an hourly labour rate to fall back on, the reception window customers can book into, and the bay count and hours per bay that add up to a day's total available hours. Al-Sahra's `WC-MECH` is five bays × eight hours = **40 hours a day** at **120** an hour.

### 2. Brands, models and categories

Set up the [three-level classification](/modules/servicecenter/workshop-setup/servicecenter-brands-and-models.md) before the catalogue, because the catalogue's price tables key on it. Al-Sahra has one brand (NAWA), three models and one category. The useful part to get right is the **model**, since model is what drives the labour time, the hourly rate and the service interval on a task.

### 3. The catalogue: tasks, then services

A [task](/modules/servicecenter/workshop-setup/servicecenter-tasks.md) is one repair step — an oil change, a brake pad replacement — with a standard duration, an hourly price, the parts it consumes and, where the job recurs, the kilometre interval that brings it round again. Build the tasks first.

Then bundle them into [services](/modules/servicecenter/workshop-setup/servicecenter-operations.md), which are what you actually sell and price. A service can price line by line or carry one package price for the whole bundle; that choice is per service, and it is the one thing on that screen worth thinking about twice.

Give each task a per-model line carrying the labour time and rate for that model. It takes longer to set up, and it is what makes the figures the job order proposes agree with the figures a later recalculation produces.

The small classification files — accessories kits, visit types, operation classifications — can wait. They are mostly labels you group, filter and report on; the visit type also decides which bookings may bypass the capacity check.

### 4. Vehicles already on the road

If you are replacing an existing system, the workshop's [vehicle files](/modules/servicecenter/workshop-setup/servicecenter-product-file.md) come across with their identity, plate, owner and current odometer. What does not come across automatically is *what was last done to them and when*, which is what the system needs in order to tell you what is due.

That is what the product task opening document is for: one per vehicle, listing the last date and odometer of each recurring task. Post those before go-live and the service-interval projections work from day one. Skip them and every vehicle looks as though it has never been serviced. See [Odometer Readings and Service Intervals](/modules/servicecenter/job-cycle/servicecenter-odometer-and-service-intervals.md).

### 5. Document books and terms

Every document in the chain needs a book, and most need a **توجيه** (document term). The terms are where the real behaviour lives — which invoices the closing generates, what the gate pass demands before it releases a car, whether spare-parts documents generate stock movements. Start from [Document Terms in Service Center](/modules/servicecenter/document-terms/servicecenter-terms-basics.md) and then [Workshop Document Terms](/modules/servicecenter/document-terms/servicecenter-terms-workshop.md).

One thing to know before you fill them in: where a term generates a stock document, the way to stop a document generating it is to leave the generation **book and term blank**. Each document's own page says whether it creates a journal entry.

### 6. Publish capacity, and start taking work

Post a [loading table](/modules/servicecenter/workshop-execution/servicecenter-loading-table.md) for the work centre and the date range, splitting the day's total available hours into appointments, carry-over, walk-ins and emergencies. Al-Sahra's split is 80 / 10 / 5 / 5, which puts **32 of the 40 hours** into the appointment bucket.

Understand what that buys you: **only the appointment bucket is enforced** when a booking is saved. The other three buckets are planning information.

From here the shop is open: [service requests](/modules/servicecenter/job-cycle/servicecenter-service-request.md) can be booked, and the [job-order cycle](/modules/servicecenter/job-cycle/servicecenter-job-cycle-overview.md) runs.

## Part Two — The Car Dealership

### Turning Car Tracking On

Here is the trap. Individually tracked cars are **not** available on a new installation, and making them available is not one switch.

::: danger Three things must all be true, or car tracking does not work
1. **The Sub Items feature must be removed from the prevented-features list.** Every configuration group ships with the sub-item feature (`الأصناف الفرعية` / *Sub Items*) on its **prevented features** list, which hides every car-related field on every screen. Until an administrator takes it off that list, users will not see the fields at all — and will report, quite reasonably, that the module is missing.
2. **Each vehicle item needs its own status configuration.** On the item that represents the model, tick **Has Sub Item** *and* attach a **Car Status Configurations** record. Both are required. Without the configuration, car creation is refused with a message naming the item. Setting a *Default SubItem Configuration* in the module settings does **not** cover this — see [Service Center Settings](/modules/servicecenter/servicecenter-configuration.md).
3. **The chassis and engine columns must be added to the purchase screens.** Out of the box, **no car-purchase screen carries a chassis-number or engine-number column** — not the purchase order, not the purchase invoice, not the proforma, not the purchase return. Automatic car creation reads those columns off the line, so add them to the line grid through a screen modification before you rely on it.

All three are needed before cars are created and tracked. This is the biggest first-day trap in the module.
:::

Remember also that **Has Sub Item** locks once the item has transactions. Decide per model, and decide before the first purchase.

### The vocabulary bridge

You will hit this within the hour, so learn it now: the record the menu calls **Customer Car** (`السياره`) is the same record that roughly forty configuration and document-term options call **Sub Item** (`الصنف الفرعي`). Same thing, two vocabularies. Documentation and option labels say *sub item*; the menu says *customer car*. See [The Car Dealership in Nama](/modules/servicecenter/cars-setup/servicecenter-cars-overview.md).

### The lifecycle you draw yourself

Nothing about a car's behaviour ships as a default. The [car status configuration](/modules/servicecenter/cars-setup/car-status-configurations.md) is where you state:

- the status a newly created car starts in, and the master group it lands in;
- which document moves a car to which status (the updater lines);
- which moves are legal (the movement lines);
- whether a line's quantity must be exactly one — worth switching on, because a hand-typed line with quantity 5 otherwise produces **one** car record for five cars;
- the filters the car picker offers.

Build the updater lines and the movement lines together and check they agree. They are not cross-validated, so an updater line can name a status that no movement row permits, and the first sign of it is a real document being refused mid-transaction.

### Where cars are born

A car record is created automatically when you save **any** Car Purchases document — order, receipt, proforma, purchase invoice or purchase return — whose term has **Create Sub Item From Line Information** switched on.

::: warning Switch it on for exactly one document type in your chain
If two documents in the same chain both carry the flag and the later one is built *from* the earlier, the existing car is re-edited — its group, status and warehouse silently rewritten from the new line. If the later document's lines are typed fresh instead, a **duplicate car record** is created; nothing checks that a chassis number is unique.

And never switch it on for a **return** term: a purchase return or sales return with the flag on will mint brand-new car records.
:::

Al-Sahra's choice — and the one this documentation assumes throughout — is the **Car Purchase Invoice**, one chassis per line. See [The Car Purchase Invoice](/modules/servicecenter/car-purchasing/car-purchase-invoice.md).

### Which document moves the stock

The other setup decision with real money attached. Both the Car Receipt and the Car Purchase Invoice can generate a stock receipt, and neither can see the other's; configure both and the same chassis is taken into stock twice, at double the cost. The same applies on the way out, between the Car Sales Invoice and the Car Final Delivery.

The rule, both times: **fill the generation book and term on exactly one of the two document terms, and leave them blank on the other.** Al-Sahra generates stock from the purchase invoice on the way in and from the sales invoice on the way out; its receipt and final-delivery terms have empty generation books.

### Then the rest of the chain

With those decisions made, set up books and terms for the sales chain — quotation, order, allocation, invoice, delivery — and read [The Car Sales Cycle](/modules/servicecenter/car-sales/car-sales-cycle.md). If you are also selling insurance or financing, remember the licence dependency: insurance needs `srvcenter-subitems` as well as its own code, because the insurance company master file lives in the cars menu. Start at [Selling Insurance with a Car](/modules/servicecenter/car-insurance/car-insurance-overview.md) and [Finance Companies and Instalment Programmes](/modules/servicecenter/car-installments/car-installment-programs.md).

## Part Three — The Extras

Each of these is independent of everything above and can be set up whenever you need it.

**Rental** — create the classifications, then the [rental assets](/modules/servicecenter/rental-assets/servicecenter-rental-asset.md) with their service item, working hours and price tiers. An asset with an empty tier grid and no classification refuses every booking, so fill the tiers before you announce the service. [Booking, Invoicing and Cancelling](/modules/servicecenter/rental-assets/servicecenter-rental-booking.md) covers the documents.

**Queues** — build one [queue configuration](/modules/servicecenter/service-queues/servicecenter-queue-configuration.md) as a reusable rulebook (queue letters, numbering, who serves which queue, waiting-room banners), then a [branch](/modules/servicecenter/service-queues/servicecenter-queue-branches.md) per reception hall with its day start time. Ticket numbering restarts at **1** each day at that time.

**Mobile delivery** — configure the courier app's document books and the collection window, then read [Delivery Documents](/modules/servicecenter/mobile-delivery/servicecenter-mobile-delivery-documents.md). One rule from the start: **one courier per delivery document**.

## A Short Checklist

If you want the setup as a list to work down:

1. Save the Service Center settings screen once.
2. Settle service price strategy and rental pricing method.
3. Work centres, then brands and models, then tasks, then services.
4. Product task opening documents for vehicles already on the road.
5. Document books and terms — with generation configured on exactly one document per stock chain.
6. Loading table for the current period, one work centre.
7. For cars: remove the Sub Items feature from the prevented list, tick *Has Sub Item* and attach a status configuration to each vehicle item, and add the chassis and engine columns to the purchase screens.
8. Build the status configuration's updater and movement lines together, and switch the creation flag on for exactly one document type.
9. Extras last.
