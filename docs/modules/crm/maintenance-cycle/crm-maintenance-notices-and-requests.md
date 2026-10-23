---
description: "The Maintenance Notice (a customer call-in) and the Maintenance Order Request: their fields, turning a notice into a maintenance order, and the actions on both screens."
entities: [MnNotice, MnRequest]
---
# Notices and Requests

Not all maintenance is planned. On 20 May 2026 Marina Plaza rings Al Nokhba: chiller 2 is losing cooling capacity and there is a smell of refrigerant in the plant room. Nobody has a work plan for that. What the call centre types is a **Maintenance Notice** — `MNOT-0140` — and from there the reactive path runs to a maintenance order in exactly the same way the preventive path does.

This page covers the two documents that sit in front of a maintenance order: the **notice**, which is the customer's call-in, and the **maintenance order request**, which looks like an approval step and is not one.

Menu: **CRM → Maintenance Documents → Maintenance Notice** and **… → Maintenance Order Request**.

::: info Required licence
`crm-maintenance`. The notice has **no document term (توجيه) at all**, so there is nothing to configure on it. The request shares the maintenance order's term — and that is where the trouble is; see below.
:::

## The Maintenance Notice

A notice is a fault log with a customer's name on it. `MNOT-0140` reads:

| Field | Value |
|---|---|
| Value date | 2026-05-20 |
| Customer | `C-01188` Marina Plaza Hotels |
| Machine | `MCH-00312` Chiller No. 2 |
| Notice category | `NC-01` Customer call-in |
| Trouble level | `TL-02` Medium |
| Trouble description | `TD-07` Reduced cooling capacity |
| Dysfunction | `DYS-021` Refrigerant leak |
| Technician | `EMP-2014` Sayed Morsy |

![The Maintenance Notice screen](../../../ar/modules/crm/images/maintenance-cycle/crm-mn-notice-en.png)

Picking the machine does most of the typing for you: the customer, contact, serial number, warranty dates and the building, floor and room all fill in from the machine file. The categories on the right come from the fault catalogues — see [Fault Catalogues](/modules/crm/maintenance-setup/crm-fault-catalogues.md). When the notice names a [maintenance contract](/modules/crm/maintenance-cycle/crm-maintenance-contracts.md) whose **Terms** page is filled in, the Trouble Level and Trouble Description lookups offer only that contract's rows, and picking one fills the other together with the response time and the remarks.

**The main page** also carries the responsible employee, machine type and category, task template, the maintenance contract, a full address block with a map location, an attachment, a ticket status, a visit date, a payment status, and two fields written by the dispatch document: **maintenance itinerary** and **planned visit date**. Below the header sit a **Machines** grid, a **Dysfunctions** grid — the fault, the machine, a free-text detail, a proposed solution — and a totals group.

**The spare parts and services page** holds the parts and services expected for the repair, with prices, taxes and totals.

**The status change page** shows a system-written history of status changes (from status, to status, date, user, remark). You cannot add, edit or remove a line in it — only the system writes there when the current status changes. Underneath it sits something more interesting, which the next section covers.

**The Billing page** has a payment-schedule template, a **GeneratePayments** button, schedule lines, payment documents and payment methods.

::: info A notice is a fault log
The notice works out the spare-part totals, the service totals, the header money block and the payment schedule as you type, so it shows the expected cost of the repair. It creates no accounting entry, no stock movement and no receivable; the money and the stock are recorded by the maintenance order and invoice that follow it.

The notice is refused if its payment-schedule lines do not add up to the money net value. If a notice will not save, check the schedule first.
:::

## Technician Attendance from the Mobile App

The notice doubles as the attendance document for field technicians. When a technician using Nama Mobile checks in and out on a call, the entries are recorded against the notice and are visible as a read-only list on the notice's **status change** page — who was on site, and between which times.

That is the whole feature: a visible record of arrival and departure against the job. Nothing is compared to a shift, nothing reaches payroll, and no rule stops a technician checking in twice.

## From a Notice to a Maintenance Order

There is no *Convert to Order* button. On 21 May somebody creates a **Maintenance Order** by hand and picks `MNOT-0140` in **From document**. That copies the header machine and the common header data across, along with the maintenance-group, spare-part, service, dysfunction, machine, tool and technician grids — unless the order's document term ticks *Do not copy header data of from-doc* or *Do not copy details of from-doc*.

The result is `MO-0527`, a normal maintenance order carrying everything the call centre recorded. From there the cycle is the same as the preventive one — see [Maintenance Orders](/modules/crm/maintenance-cycle/crm-maintenance-orders.md).

::: tip Dispatching a day's notices
If your branch works by route rather than by call, the **CRM Maintenance Plan** and **Maintenance Itinerary** pair is the tool: a plan lists the day's routes with a technician on each and the notices to be served, and saving it stamps the technician, the route and the planned visit date onto every notice listed. That is a genuine automatic effect — the one place in this area where saving a document changes another one.

It is daily dispatch, not preventive scheduling. See [Daily Dispatch](/modules/crm/maintenance-cycle/crm-maintenance-dispatch.md).
:::

## The Maintenance Order Request

The request exists so that work can be reviewed before it becomes an order. It shares the maintenance order's screen almost exactly — the same header, the same machines, dysfunctions, spare parts, services, technicians and status-change pages — with the working parts taken out. On a request there is no **Create Mn Execution** button, no **Create Sales Invoice**, no **Spare Parts Issue Request**, no **Returned Spare Parts Receipt Request**, no **Tools Issue Request**, no embedded visits list and no shipping address page — the request carries no buttons of its own at all.

![The Maintenance Order Request screen, which repeats the maintenance order layout with the working parts removed](../../../ar/modules/crm/images/maintenance-cycle/crm-mn-request-en.png)

It also validates like an order: the per-technician rewards must sum to the header reward, every machine used in a detail grid must appear in the machines grid, the same machine and task template may not appear twice, and a quantity greater than what the contract has left is refused.

::: warning Nothing converts a request into an order
There is no approve action and no convert action. When the work is agreed, somebody creates a **Maintenance Order** and picks the request in **From document** — the same manual step as from a notice. The request is not marked, not closed and not consumed, and the same request can be used as the source of any number of orders. The review it is named for is a human procedure, not a system one.
:::

::: danger A request creates an accounting entry if its term has accounts on it
The request shares the maintenance order's document term, and that term has an **Effect** page with a debit and a credit side. Those sides are read on the request exactly as they are on the order: fill both in, and saving a document whose entire purpose is to *ask* for work books a journal entry against the customer.

Leave the debit and credit sides on the maintenance order term **empty** unless you deliberately want orders and requests to book — in the normal configuration the [maintenance invoice](/modules/crm/maintenance-cycle/crm-maintenance-invoicing.md) is the only document in the cycle that reaches the ledger. See [Maintenance Document Terms](/modules/crm/document-terms/crm-maintenance-terms.md).
:::

Requests move no stock in any configuration.

## Actions on these screens

**Maintenance Notice — Billing page:**

- **GeneratePayments** (*إنشاء الدفعات*) — splits the value into an instalment schedule. It asks for
  the number of payments, the period between them and its unit, the start date, a grace period,
  down / first / second / last payment values and a rounding mode. The English label ships as the
  raw name shown here.
- **Request Redeem Customer Amount** — spends the customer's loyalty balance against this document.
  It shows the net value, the points owner and the reward balance still available, and asks how
  much to redeem and against which reward code. The page carries it twice under the same label: the
  one above the payment documents grid records the redemption there, the one above the payment
  methods grid records it as a payment line. This label has no Arabic translation, so it shows in
  English on Arabic screens too.

**Maintenance Order Request:** none — see above.

## When to Use Which

| Situation | Document |
|---|---|
| A customer reports a fault | **Maintenance Notice** — it is the only document with the fault catalogues, the address block and the mobile attendance record on it |
| Work needs signing off internally before a technician is committed | **Maintenance Order Request**, understood as a piece of paper someone has to read — with its accounting sides left empty |
| A planned preventive visit | Neither. Those come from the [work plan](/modules/crm/maintenance-cycle/crm-maintenance-work-plans.md) |

## Reporting

**Reporting: none.** This module ships no system reports, and this screen has no print form. To review open call-ins, use the notice list view with saved criteria (المعايير) — filtered by notice category, trouble level or planned visit date — and export to Excel.
