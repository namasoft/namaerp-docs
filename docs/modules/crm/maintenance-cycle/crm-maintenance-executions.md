---
entities: [MnOrderExecution]
menu: Customer Relationship Management → Maintenance Documents → Maintenance Order Execution
---
# Order Executions

The execution sheet is the technician's document. One is produced for each machine on the
[maintenance order](/modules/crm/maintenance-cycle/crm-maintenance-orders.md), it carries that
machine's checklist, it has a start button and an end button that time the job, and it has a grid
where the technician writes down the spare parts he actually fitted.

::: info The execution records the work; stock and money move elsewhere
The spare-parts grid on an execution carries warehouse, locator, lot, serial and quantity, but it is
a record of what the technician fitted. Committing an execution creates no accounting entry and
issues nothing from any store. The parts leave stock when a
[maintenance invoice](/modules/crm/maintenance-cycle/crm-maintenance-invoicing.md) is saved, or
when somebody presses *mnSparePartsIssue* and saves the supply-chain document that opens.
:::

::: info Required licence
`crm-maintenance`
:::

![The Order Execution screen](../../../ar/modules/crm/images/maintenance-cycle/crm-mn-execution-en.png)

## Producing the executions

Executions are never typed from scratch in normal use. On the committed order you press one of two
buttons:

- **Create execution for all lines** — one execution per machine line;
- **Create execution for selected lines** — the same, limited to the machine lines you ticked.

Both require the order's [document term](/modules/crm/document-terms/crm-maintenance-terms.md) to
name an **execution book and term**; without them the buttons fail. Each execution is created and
committed for you, its reference is written back into the order's machine line, and the order's
status type moves to *In Progress*.

On 1 April 2026 the three machine lines of order `MO-0513` produce three executions:

| Execution | Machine | Checklist | Start | End | Net time |
|---|---|---|---|---|---|
| `OEX-0771` | `MCH-00311` Chiller No. 1 | Chiller Monthly Checklist (3 tasks) | 08:00 | 11:30 | 3:30 |
| `OEX-0772` | `MCH-00312` Chiller No. 2 | Chiller Monthly Checklist (3 tasks) | 11:45 | 13:15 | 1:30 |
| `OEX-0773` | `MCH-00318` Air Handling Unit | AHU Monthly Checklist (3 tasks) | 14:00 | 15:00 | 1:00 |
| | | | | **On site** | **6:00** |

Which checklist arrives depends on one option on the order's term. Normally the tasks come from the
**machine line's own task template**; tick *Consider task templates tasks when creating executions*
and they come from the **header** template instead. See
[Task Templates](/modules/crm/maintenance-setup/crm-maintenance-task-templates.md).

Pressing the buttons again does not duplicate anything — the existing executions are updated in
place.

## What the technician sees

**Main page.** The order in *From document*, the machine, the task template, customer, technician,
maintenance group, building, floor, room, the five machine classifications, warranty period type,
current status, a *from date and time* pair, a *to date and time* pair, the calculated **net time**,
a **status** (*In Progress* / *Finished* / *ReOpen*), currency and rate, six attachment slots, the
maintenance contract, trouble level, trouble description, response time and two remark boxes.

**Tasks grid.** The checklist itself: a *done* tick, the task, a second task column, remarks and two
attachments per line. **Make All Lines Done** ticks the lot in one press.

**Dysfunctions grid.** Faults found while working, with the same old-warranty / new-warranty blocks
as the order.

**Spare parts and services page.** Two grids — the parts fitted and the services performed — each
with item, machine, quantity, unit of measure, unit price, discount, net value and the item
dimensions.

On the three executions of `MO-0513` the technician records `SP-FLT-14` × 4 and `SP-OIL-05` × 1 on
`OEX-0771`, `SP-FLT-14` × 2 on `OEX-0772`, and nothing on `OEX-0773` — six filters and one oil in
total, matching the order's grid exactly.

## Actions on this screen

**Main page**, above the tasks grid:

- **Make All Lines Done** (*تفعيل اختيار في جميع السطور*) — ticks *done* on every line of the tasks grid.
- **Start** (*بدء*) — stamps today's date and the current time into the *from* pair if they are
  empty, and sets the status to *In Progress* if the status is empty.
- **End** (*انهاء*) — sets the status to *Finished*, stamps the *to* pair with now, and computes the
  net time as the difference. On an execution that is already *Finished* it does nothing.
- **Change Status To In Progress** (*تغيير الحالة إلى قيد التنفيذ*) — despite its label, sets the
  status to **ReOpen** (*معاد فتحه*), not *In Progress*. It is the button you use to reopen a
  finished execution.

All four only write values into the screen in front of you — **the document is not saved by
pressing them.** If the technician presses End and closes the browser, nothing was recorded.

**Main page**, below the totals:

- **Create Maintenance Invoice** (*إنشاء فاتورة صيانة*) — opens an unsaved invoice draft in a pop-up;
  see [Straight to the invoice](#Straight-to-the-invoice). The execution must be saved first.

**Spare parts and services page:**

- **mnSparePartsIssueRequest** (*طلب صرف قطع غيار*) — opens an unsaved stock issue request for the
  spare-part lines. The English label ships as the raw name shown here.
- **mnSparePartsIssue** (*صرف قطع غيار*) — opens an unsaved stock issue for the spare-part lines. The
  English label ships as the raw name shown here.
- **Create Sales Quotation For Priceless Lines** (*إنشاء عرض أسعار للأصناف التى بدون سعر*) — opens a
  sales quotation for the lines that have no price.

The last three are explained in [Getting the parts out of the store](#Getting-the-parts-out-of-the-store).

![The action block on the main page of a Maintenance Order Execution](../../../ar/modules/crm/images/maintenance-cycle/crm-mn-execution-actions-en.png)

## What committing an execution does

| Effect | Result |
|---|---|
| **Ledger** | None. There is no accounting logic on this document at all, and its document term has no accounting pages — only tax plan, taxable, modifiable tax and "allow editing header tax in details". |
| **Stock** | **None.** See the box at the top of this page. |
| **On the order** | The execution's status is written into the matching machine line's *execution status*; the order's status type becomes *In Progress* while any line is still running and *Finished* once they all report finished; the execution's current status is pushed onto the order. |

Nothing else changes. In particular the contract entitlement is untouched — that was drawn down when
the order was committed — and the machine's *Last Visit Date* is **not** updated, here or anywhere
else.

## Getting the parts out of the store

Two buttons on the spare-parts page open a supply-chain document pre-filled from the execution's
lines:

| Button | Opens |
|---|---|
| mnSparePartsIssueRequest (*طلب صرف قطع غيار*) | A stock issue **request**, which somebody then approves and issues |
| mnSparePartsIssue (*صرف قطع غيار*) | A stock **issue** — the real inventory document |

Both open in a pop-up as an unsaved draft, and both need the execution saved first. Neither fills
in the warehouse — choose it on the document that opens. Nothing moves until you save it.

::: warning One route, not two
The maintenance invoice can generate its own stock issue from the same lines when its term says so.
These buttons are an **alternative** to that, never a supplement — saving both takes the same parts
out of stock twice, with no netting and no link between the documents. Decide once, per
installation, which route you use, and train the branch on it.
:::

A third button, **Create Sales Quotation For Priceless Lines**, collects every spare-part and
service line whose unit price is empty or zero and opens a supply-chain sales quotation containing
just those items. It is the "we need a price for this before we can bill it" helper.

## Straight to the invoice

**Create Maintenance Invoice** on the execution opens an unsaved invoice draft: the header is
copied, the execution's machine is promoted into an invoice machine line, and the spare-part and
service grids come across. Review it and save it — see
[Maintenance Invoicing](/modules/crm/maintenance-cycle/crm-maintenance-invoicing.md).

::: warning The execution validates nothing
An execution can be saved with no machine, no dates, no tasks ticked and no parts at all. There is
no completeness rule of any kind on this document, so whatever discipline you want around it has to
come from your own procedures. In particular, an execution reporting *Finished* is not evidence that
the work was done, that the checklist was worked through, or that the parts left the store.
:::

**Reporting: none.** This module ships no system reports, and this screen has no print form. The
order screen carries an embedded list of the executions raised against it, which is the closest
thing to a job-card report the module offers; beyond that, use the list view and its Excel export.
