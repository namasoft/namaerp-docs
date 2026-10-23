---
description: "Overview of the Service Center module: its two menu roots, the separate workshop and showroom vehicle registers, the six licence codes and what each enables, and the rental, delivery and queue extras."
---
# Service Center Overview

From the street, a car dealership and its workshop look like one business. A customer buys a car in the showroom, brings it back for its first service, and expects the people behind the counter to know both halves of the story.

Nama's Service Center module does not work that way, and the sooner you know it the fewer surprises you will meet. What ships under the name *Service Center* is really **four separate products that happen to share one licence family and one Maven module**: a workshop, a car showroom, a rental desk and a reception-queue system. They sit under **two different top-level menus**, they keep their vehicles in **two different registers**, and there is no code path between them.

This page is the map. It tells you what each part does, which licence switches it on, and — most importantly — where the seams are, so you plan around them instead of discovering them in month three.

::: info Required licence
Every one of the module's **88 records and documents is licence-gated**. Nothing at all is available in a base installation — not one master file, not one document. The six codes are `srvcenter`, `srvcenter-subitems`, `srvcenter-insurance-and-installments`, `srvcenter-rental-assets`, `srvcenter-mobile-delivery` and `srvcenter-service-queues`. What each buys you is set out in [What Each Licence Switches On](#What-Each-Licence-Switches-On) below.
:::

Throughout this documentation we follow one company:

> **Al-Sahra Motors** / **شركة الصحراء للسيارات** is an authorised NAWA dealer in Riyadh, running a showroom and a service centre on the same site. The showroom imports and sells NAWA cars; the service centre repairs anybody's vehicle, whoever sold it. Fahad Al-Otaibi brings his 2023 Saif 1.6 in for a service; Layla Al-Harbi buys a new Rimal 2.4 off the showroom floor. You will meet both of them on nearly every page.

## Two Menu Roots

The module registers **two top-level menu entries**, not one. Everything else follows from that.

| Menu root | Arabic | Folders inside it | Records and documents |
|---|---|---|---|
| **Service Center** | مركز خدمة | Master Files · ` Settings` · Documents · Mobile Apps - Service Center · Queue Service · Rental Assets | **46** |
| **cars** | سيارات | Car Files · Car Purchases · Car Inventory · Car Sales · Cars Sales Cancellation · Car Insurance · Car Installment | **39** |

Two labels are worth quoting exactly, because searching for the tidy version will not find them: the second root really is spelled **`cars`** in lower case in the English menu, and the settings folder really does begin with a **leading space** (` Settings` / ` الإعدادات`), so it sits slightly indented under its siblings.

The *Service Center* root is the workshop, plus the three bolt-on features that were filed there for want of a better home. The *cars* root is the dealership: buying vehicles from an importer, holding them as individually tracked stock, selling them, insuring them and financing them.

## The Sold Car and the Serviced Car Are Different Records

This is the single most important sentence on the page, so it gets its own heading.

**The vehicle file the workshop opens and the car record the showroom sells are two unrelated records, and nothing links them.** When Al-Sahra sells Layla the Rimal `CAR-000318` from the showroom, that car does **not** appear in the workshop's register. If she brings it back for its first service six months later, the service advisor creates a new, empty vehicle file for it and types its chassis number, plate and odometer by hand. Nothing is carried across — not the owner, not the sale date, not the warranty start, not the chassis number.

::: warning There is no vehicle lifecycle spanning both halves
Do not plan a "buy → sell → service" story around this module and expect the system to hold it together. The two registers have separate identity models and separate documents, and no document in either half writes to the other. Reporting across the two — matching a serviced vehicle back to the sale that produced it — is a job for a custom report or an integration built on the chassis number, not a product feature. Nothing in the product enforces that the chassis number is even unique.
:::

The practical consequence for how you read this documentation: the workshop pages and the cars pages are two independent stories. Read the one you need. They meet only in the settings screen and in this overview.

## What Each Licence Switches On

All 88 entities are gated, and each sits behind exactly one code. Use the code strings below verbatim when you talk to your licence contact — nothing here is derived from anything else.

| Licence code | Records and documents | What it buys |
|---|---|---|
| `srvcenter` | **36** | The whole workshop: work centres, tasks, services, the vehicle file, brands and models, the job-order chain from service request through estimation, job order, execution, spare parts, closing and gate pass, plus inspections, recall campaigns and trips |
| `srvcenter-subitems` | **26** | The car dealership: the car file and its status configurations, car purchasing, car inventory, car sales, allocation, traffic letters and the sales cancellation documents — **and** the Insurance Company and External Agency master files |
| `srvcenter-insurance-and-installments` | **16** | Insurance programmes and policies, the nine policy documents, the insurance policy purchase invoice and its return, the finance company, instalment programmes and instalment quotations |
| `srvcenter-rental-assets` | **5** | The rental asset file and its classification, and the rental request, invoice and reservation cancel |
| `srvcenter-mobile-delivery` | **3** | The courier delivery document, the batch delivery generator and the invoice receipt document |
| `srvcenter-service-queues` | **2** | Queue service configurations and queue branches |

::: warning The insurance licence is not self-contained
`srvcenter-insurance-and-installments` on its own is not enough to run car insurance. The **Insurance Company** master file (`شركة تأمين`) lives in *cars → Car Files*, which belongs to `srvcenter-subitems` — so a customer who licenses insurance and instalments alone cannot create a single insurance company. And every policy document needs one: the Insurance Policy Order and the Insurance Programme both **require** an insurance company before they can be saved, and every other policy document requires a policy that only a company-scoped programme can produce.

In practice, **buying insurance and instalments means buying `srvcenter-subitems` too.** The same applies to the External Agency master file, which sits in the same folder.
:::

Two smaller notes on licensing while you are here. First, the licence is genuinely all-or-nothing per code: an unlicensed record type is not merely hidden from the menu, it is removed from the installation, so criteria and imports referring to it will not resolve either. Second, do not go looking for finer-grained "features" inside the module — the module does not publish a usable feature list of its own, and the six codes above are the whole of the granularity available.

## The Workshop, End to End

Here is the workshop half in one story, with each step linked to the page that covers it properly.

**Before any of this**, somebody set up the shop: the [work centre](/modules/servicecenter/workshop-setup/servicecenter-work-centers.md) `WC-MECH` Mechanical Hall with its five bays, eight hours each and its 120 an hour labour rate; the [tasks](/modules/servicecenter/workshop-setup/servicecenter-tasks.md) that make up the repair catalogue; the [services](/modules/servicecenter/workshop-setup/servicecenter-operations.md) that bundle tasks into something saleable; and the [brands, models and categories](/modules/servicecenter/workshop-setup/servicecenter-brands-and-models.md) that decide which labour time and which rate apply to which car. That order is not arbitrary — [Setting Up a Service Center](/modules/servicecenter/servicecenter-getting-started.md) walks it.

1. **The booking.** Fahad telephones on 2 March 2026. The advisor raises [service request](/modules/servicecenter/job-cycle/servicecenter-service-request.md) `SCSR-2026-0881`, reserving 6.5 hours on 3 March against the day's appointment capacity — which somebody published in advance on a [loading table](/modules/servicecenter/workshop-execution/servicecenter-loading-table.md).
2. **The arrival.** He arrives at 08:20. Reception draws [queue ticket](/modules/servicecenter/service-queues/servicecenter-queue-overview.md) `A014`, reads the odometer at 45,300 and fills in [reception inspection sheet](/modules/servicecenter/inspections-and-campaigns/servicecenter-inspections.md) `SCID-2026-0623` recording the car's condition on arrival.
3. **The price.** An [estimate](/modules/servicecenter/job-cycle/servicecenter-job-estimation.md) is priced and shown to the customer. He negotiates the wash out of it, so a second, revised estimate is raised naming the first.
4. **The job order.** [`SCJO-2026-0417`](/modules/servicecenter/job-cycle/servicecenter-job-order.md) is opened: five tasks totalling 780 in labour and four parts totalling 2,435, so **3,215** in all. This is the document everything else hangs off.
5. **Who pays.** The 3,215 is split four ways on the job order's own lines — **695 customer, 60 insurance, 2,400 warranty, 60 the company's own pocket**. That split is the heart of the module and has [its own page](/modules/servicecenter/job-cycle/servicecenter-payer-split.md).
6. **The parts.** The storekeeper [issues the parts](/modules/servicecenter/spare-parts/servicecenter-spare-parts-issue.md) against the order, and one unused litre of oil comes [back](/modules/servicecenter/spare-parts/servicecenter-spare-parts-return.md). The compressor goes out to a specialist for bench testing on an [external repair](/modules/servicecenter/spare-parts/servicecenter-external-repair.md).
7. **The work.** Technician Turki clocks each task on and off on the [execution document](/modules/servicecenter/workshop-execution/servicecenter-production-execution.md). He spends 7 hours 20 minutes; the customer is billed for the catalogue's 6.5. Nothing in the module turns measured time into money — if a job stalls, work is [suspended and resumed](/modules/servicecenter/workshop-execution/servicecenter-pending-and-resume.md), and that changes neither the hours billed nor the amount.
8. **The close.** [`SCJOC-2026-0392`](/modules/servicecenter/job-cycle/servicecenter-job-order-closing.md) pulls in the finished work and all the materials, fills the four money boxes, generates the stock issue for the consumed parts and projects the next visit as 15 March 2026 from the [odometer history](/modules/servicecenter/job-cycle/servicecenter-odometer-and-service-intervals.md). Be clear about what those four boxes mean for the accounts, because it surprises people: the journal entry the closing produces carries the **customer's 695 only**. Insurance and warranty reach the ledger later, through their own invoices, and the internal 60 reaches accounting nowhere at all.
9. **The invoices.** Three [invoices](/modules/servicecenter/job-cycle/servicecenter-job-order-invoicing.md) go out — 695 to Fahad, 2,400 to the warranty provider, 60 to the insurer. The internal 60 is never invoiced to anybody.
10. **The release.** [Gate pass](/modules/servicecenter/job-cycle/servicecenter-gate-pass.md) `SCGP-2026-0475` checks that the invoices exist and are paid, and Fahad drives away.

The [Job Order Cycle](/modules/servicecenter/job-cycle/servicecenter-job-cycle-overview.md) page tells the same story properly, and makes the point that matters most about the chain: **none of it is compulsory.** Every step is linked to the one before it only by the *From Document* field, and copying a document forward takes a snapshot — it does not create a live link.

## The Showroom, End to End

The dealership half runs on entirely different documents.

Al-Sahra orders six Rimal 2.4s from the importer at 74,000 each, receives them, spreads 15,000 of freight and customs across them to a landed cost of **76,500 a car**, and sells `CAR-000318` to Layla for 87,000 plus VAT. The chain is: purchase order → purchase invoice (which is where the car records are born) → receipt → sales quotation → sales order → allocation → sales invoice → final delivery, with a traffic letter alongside and an insurance policy sold with the car.

The pages are grouped by stage:

- [The Car Dealership in Nama](/modules/servicecenter/cars-setup/servicecenter-cars-overview.md) — the hub page for this half, including the vocabulary bridge you will need immediately: the record the menu calls **Customer Car** is the same thing that every configuration and document-term option calls **Sub Item**.
- [The Car File](/modules/servicecenter/cars-setup/car-master-file.md) and [Car Status Configurations](/modules/servicecenter/cars-setup/car-status-configurations.md) — the individually tracked vehicle, and the lifecycle you draw yourself.
- [Car Purchasing](/modules/servicecenter/car-purchasing/car-purchase-invoice.md) — ordering, invoicing, [landed cost](/modules/servicecenter/car-purchasing/car-landed-cost.md), [receiving](/modules/servicecenter/car-purchasing/car-receipt.md) and [returning](/modules/servicecenter/car-purchasing/car-purchase-return.md).
- [The Car Sales Cycle](/modules/servicecenter/car-sales/car-sales-cycle.md) — quotation through [order](/modules/servicecenter/car-sales/car-sales-order.md), [allocation](/modules/servicecenter/car-sales/car-allocation.md), [invoice](/modules/servicecenter/car-sales/car-sales-invoice.md), [delivery](/modules/servicecenter/car-sales/car-final-delivery.md) and [return](/modules/servicecenter/car-sales/car-sales-return.md).
- [Car Insurance](/modules/servicecenter/car-insurance/car-insurance-overview.md) and [Car Instalments](/modules/servicecenter/car-installments/car-installment-programs.md) — sold alongside the car, and separately licensed.

::: warning Nothing about a car's behaviour is built in
The single fact that governs this whole half: **the car status configuration decides everything.** Which document moves a car to which status, which moves are legal, which master group new cars land in, whether quantities may exceed one — none of it is hard-coded. On an installation where nobody attached a status configuration to the vehicle item, every document in the cars half saves successfully and changes nothing at all. See [Car Status Configurations](/modules/servicecenter/cars-setup/car-status-configurations.md), and read [Setting Up a Service Center](/modules/servicecenter/servicecenter-getting-started.md) before you buy the licence, because car tracking is off out of the box.
:::

## The Three Extras

Three smaller features share the module and nothing else. Each has its own licence, and none of them is connected to the workshop or to the showroom.

**Rental assets** (`srvcenter-rental-assets`) — a small booking desk for anything you hire out by the hour or the day. Al-Sahra uses it for the courtesy cars it lends to customers whose repair runs long. The rental asset is a register of its own: not a car file, not a workshop vehicle, not a fixed asset. Start at [Renting Out Assets](/modules/servicecenter/rental-assets/servicecenter-rental-overview.md), which is candid about the long list of things this sub-module does not do.

**Service queues** (`srvcenter-service-queues`) — the ticket system in the reception hall: a kiosk that issues tickets, a wall display that calls them, and a counter console for the advisor. The ticket is finally closed when the job order that came out of the visit is committed. See [How Service Queues Work](/modules/servicecenter/service-queues/servicecenter-queue-overview.md).

**Mobile delivery** (`srvcenter-mobile-delivery`) — despite living in a vehicle module, this has **nothing to do with delivering cars**. It is a courier app: a driver takes a route sheet of sales invoices out, checks in and out of each stop, and records what the customer actually received. See [Delivering with the Driver App](/modules/servicecenter/mobile-delivery/servicecenter-mobile-delivery-overview.md).

## Where to Go Next

If you are standing up the module for the first time, go to [Setting Up a Service Center](/modules/servicecenter/servicecenter-getting-started.md) — it walks the workshop and the dealership in the order that avoids rework, and it opens with the prerequisite that catches nearly everybody.

If you are tuning a running installation, [Service Center Settings](/modules/servicecenter/servicecenter-configuration.md) covers the module-wide options one by one.

Almost everything else in this module is configured **per document book**, on the document term rather than centrally. [Document Terms in Service Center](/modules/servicecenter/document-terms/servicecenter-terms-basics.md) explains which documents share which term family, and which nine have no term at all.

And set your expectations about reporting before anyone asks: the module ships **one** system report and **one** printed form, with no dashboard and — notably — no printed form for the job order. [Reports and Print Forms](/modules/servicecenter/servicecenter-reports-and-forms.md) says exactly what exists.
