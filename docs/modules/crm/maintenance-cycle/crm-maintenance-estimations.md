---
entities: [MnEstimation]
menu: Customer Relationship Management → Maintenance Documents → Maintenance Estimation
---
# Maintenance Estimations

The Maintenance Estimation (مقايسة صيانة) is the most misunderstood screen in the maintenance suite. Its name promises a quotation — price the repair, show it to the customer, and turn it into a work order when they agree. That is not what it is: it is a costing sheet built from maintenance orders that already exist.

Menu: **CRM → Maintenance Documents → Maintenance Estimation**.

::: info Required licence
`crm-maintenance`. A **document term (توجيه) is required**. See [Maintenance Document Terms](/modules/crm/document-terms/crm-maintenance-terms.md).
:::

![The Maintenance Estimation screen](../../../ar/modules/crm/images/maintenance-cycle/crm-mn-estimation-en.png)

## Effects

Saving an estimation creates no accounting entry and no receivable. The stock and the money for the job come from the normal chain — [maintenance order](/modules/crm/maintenance-cycle/crm-maintenance-orders.md), execution, [maintenance invoice](/modules/crm/maintenance-cycle/crm-maintenance-invoicing.md).

## What the Estimation Really Is

It is a **costing sheet built from work that already exists**.

Nothing produces an estimation — no button, no generation, no other document creates one. And an estimation produces nothing: there is no convert-to-order action and no approve action. Its status is a label you set by hand and can filter and report on.

Look at the direction of its one button and the picture clicks into place. The estimation's main page starts with an **Orders** grid and a button labelled **Copy All From MnOrders** — an oddly worded label, but the right one to look for on screen. You list one or more existing maintenance orders and the button appends all of their lines to the estimation. Lines flow **from** the orders **into** the estimation. It sits *after* the order, not before it.

::: tip An estimation does not become an order
There is no path from an estimation to a maintenance order. If the customer accepts, type the work into a [maintenance order](/modules/crm/maintenance-cycle/crm-maintenance-orders.md) — or copy it across with the order's own *From document* field.
:::

Used within those limits it is genuinely useful: a place to assemble the cost of a big repair on `MCH-00311` out of the lines of the orders already raised against it, price it, print nothing, and show the total to a customer or a manager.

## The Screen

**Main page.** The header is the order's header plus a **warehouse**, which is mandatory. Then the **Orders** grid and its **Copy All From MnOrders** button, a **Machines** grid, a **Dysfunctions** grid, and a totals group.

**Tools and visits page.** A tools grid and a read-only list of the maintenance visits pointing at this document.

**Spare parts and services page.** The spare-parts grid and its totals, then the services grid and its totals. The price block here is noticeably thinner than the invoice's: unit price, discount percentage and value, and net value — **no tax columns at all**. An estimation therefore shows a net figure, not a figure a customer would pay after tax; add the tax yourself when you quote.

**Technicians page.** Technicians and their rewards.

The document refuses to save when: the warehouse is empty; the per-technician rewards do not sum to the header reward; a machine used in the spare-part, service, dysfunction or tools grids is not listed in the machines grid; the same machine appears twice in the machines grid; a spare-part line has an item but no quantity; or a service line has a service or item but no quantity.

::: warning List every machine in the Machines grid yourself
On the estimation, add the machines to the Machines grid first, then set the header machine.
:::

## Actions on this screen

- **Copy All From MnOrders** (*نسخ كل السطور من أوامر الشغل*) — on the main page. Appends every detail
  line (machines, spare parts, services, dysfunctions, technicians, tools, maintenance groups) of
  every order listed in the *Orders* grid. If the document term ticks *Consider Lines Of FromDoc*,
  the *From document*'s lines are appended too. Pressing it twice appends the lines twice.

Stock does not leave the store from a button on this screen. The order, the execution and the
invoice carry issue buttons of their own, and none of them checks what the others have already issued — decide
once, per installation, where stock leaves the store, and tell the technicians.

## How to Use It

1. Use the estimation as a costing sheet: list the relevant maintenance orders, press **Copy All From MnOrders**, adjust quantities and prices, and read the total.
2. Remember there is no tax on the screen — quote the customer the net plus tax.
3. When the work is agreed, raise a real [maintenance order](/modules/crm/maintenance-cycle/crm-maintenance-orders.md) and let the normal chain — order, execution, invoice — do the stock and the money.

## Reporting

**Reporting: none.** This module ships no system reports, and this screen has no print form. There is nothing shipped that prints an estimation for a customer; if you need one, that is a custom print form your implementer builds.
