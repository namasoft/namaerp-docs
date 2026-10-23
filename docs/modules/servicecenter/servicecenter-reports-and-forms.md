---
description: "The only shipped Service Center report and print form, the rental-asset schedule and the reception inspection slip, plus what is missing (no job order form, no dashboards) and where to find the figures instead."
---
# Reports and Print Forms

Set your expectations before you go looking: **this module ships almost no reporting at all.** Across 85 record types and two complete business cycles there is exactly **one** system report and exactly **one** printed form, and no dashboard of any kind.

That is not an oversight in this documentation. It is the whole list.

::: info Required licence
Both items below belong to licensed areas — the report to `srvcenter-rental-assets`, the form to `srvcenter`. Neither is visible without its licence.
:::

## The One System Report

| Code | Name | Covers |
|---|---|---|
| `SYSR-RA001` | RentalAssetScheduleDays | Rental-asset occupancy, day by day |

It draws a grid with dates across the top and rental units down the side, so you can see at a glance which assets are booked on which days and where the gaps are. It reads the [rental assets](/modules/servicecenter/rental-assets/servicecenter-rental-asset.md), the rental requests, the classifications and the customers, and it can be narrowed by date range, legal entity, branch, analysis set, group and individual rental asset.

It is a genuinely useful report for a rental desk, and it is the only shipped report in the module. Nothing equivalent exists for the workshop or for the showroom.

## The One Printed Form

| Code | Name | Prints |
|---|---|---|
| `SYSF-SCS001` | سند فحص واستلام | The reception [inspection document](/modules/servicecenter/inspections-and-campaigns/servicecenter-inspections.md) |

This is the sheet you hand to a customer when their vehicle arrives. It prints the document's code and date, the inspection template it was built from, the service request it relates to, the customer and the current owner, the work centre, the vehicle's code, name, chassis and second serial number and colour, and then the inspection points with the finding recorded against each one.

## There Is No Printed Form for the Job Order

::: warning The module's central document has no shipped print form
There is **no printed form for the [job order](/modules/servicecenter/job-cycle/servicecenter-job-order.md)** — nor for the estimation, the execution document, the closing, the [gate pass](/modules/servicecenter/job-cycle/servicecenter-gate-pass.md) or anything else in the workshop chain. The job order is the document a customer signs and a technician works from, and every installation that needs one has to have it built as a custom form.

Internal reference material lists four further Service Center forms beyond the inspection sheet. **None of them was ever shipped and none exists in the product.** Do not plan around them, and do not go looking for them in the forms repository — they are entries with no code and no file behind them.
:::

Budget for custom forms accordingly. In practice a workshop needs at least a job-order sheet and a sheet for the [closing](/modules/servicecenter/job-cycle/servicecenter-job-order-closing.md), and a showroom needs a hand-over form for the [final delivery](/modules/servicecenter/car-sales/car-final-delivery.md); all of those are bespoke work.

## There Are No Dashboards

The module ships no dashboard. No dashboard anywhere in the product reads the workshop's job orders, the car register, the rental assets or the queue tickets. If you want a Service Center dashboard, it is built the ordinary way — as a dashboard record authored in the interface over your own queries.

## Do Not Reach for the Other Modules' Forms

One trap worth naming. The forms repository holds a family of forms whose names read like *Job Orders*, and another whose names read like *Production Execution* and *Work Center*. **None of them belongs to this module.** The first family belongs to the separate Job Orders module and the second to Manufacturing, and they query entirely different records. Point one of them at a Service Center job order and it will print nothing useful.

The same applies to the health-insurance and attendance forms and reports that turn up when you search for *insurance* or *attendance* — they belong to the HR module, and to the loan and instalment reports that belong to Real Estate.

## The One Report You Wire Up Yourself

There is a single place where the module expects *you* to name a report: the **ticket design** on the [queue service configuration](/modules/servicecenter/service-queues/servicecenter-queue-configuration.md). Point it at the report definition you want printed when a customer draws a ticket, and the kiosk prints that. It is required, and there is no default — build the ticket layout before you open the queue.

## Where the Numbers Actually Live

With so little shipped reporting, most day-to-day questions are answered from the screens rather than from reports, and it is worth knowing which screen answers which question:

- **What is in the shop right now** — the job order list view, filtered by status. The [work centre's own screen](/modules/servicecenter/workshop-setup/servicecenter-work-centers.md) also carries read-only lists of its executions, exceptions and waiting orders.
- **What was done to this vehicle** — the [vehicle file's](/modules/servicecenter/workshop-setup/servicecenter-product-file.md) history grids, which show its past job orders and its odometer readings.
- **Where a car has been in its lifecycle** — the [car's status entries grid](/modules/servicecenter/cars-setup/car-master-file.md), which records every status change, the document that caused it and its date. That grid is the first thing to open when somebody asks why a car will not sell.
- **What parts a job consumed** — the system spare-parts ledger on the [spare parts overview](/modules/servicecenter/spare-parts/servicecenter-spare-parts-overview.md).
- **Why a document's effects did not appear** — the Business Requests list view. A saved document creates its accounting and inventory effects as background business requests; filter that view by failed status and use **More → Reprocess / Recommit** to retry them.

Anything beyond that — technician productivity, shop utilisation, revenue by service, insurance settlement summaries, showroom stock ageing — is a custom report.
