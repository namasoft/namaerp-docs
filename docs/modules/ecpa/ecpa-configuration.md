---
description: "The Project Management (ECPA) settings screen: how an hour of work is priced twice, as cost on the timesheet and as revenue on the invoice, with a worked example, each option, and how the payroll hour-cost lookup behaves."
entities: [ConfigEntry]
---
# Project Management Settings

::: info Required licence
`ecpa` — one code for the whole module. There are no sub-licences.
:::

Most of what makes a project behave the way it does — its phases, its disciplines, its rates, its
accounts — is set on the project itself. Project Management (ECPA) therefore has a very small global
settings screen, and almost everything on it answers a single question: **how does an hour of
somebody's time become an amount of money?**

You reach it from **Project Management → Settings → module settings**
(in Arabic **ادارة المشاريع ← الإعدادات**). There is one settings record per database, so whatever
you set here applies to every project, every timesheet and every invoice in that company file.

## An hour becomes money twice

The thing to hold in your head before you touch this screen is that an hour is priced **twice**, in
two different places, from two different sources.

**Once as cost, on the timesheet.** When an engineer records that she worked from 09:00 to 15:30 on
a task, Nama needs to know what that time cost the firm. It gets that from the payroll: the
employee's total constant salary, divided by a standard month's worth of hours. That division is
what **Standard Monthly Hours** and **Update Hour Cost of Time Sheet From HR** are for.

**Once as revenue, on the invoice.** When you bill the customer for approved time, Nama starts from
the hourly rate recorded against the employee on the task's executers grid — not from the payroll
figure — and multiplies it by a markup. That markup is **Normal Time Rate**.

They are deliberately independent. Cost comes from what you pay; revenue comes from what you sell.
Nothing in the module tries to derive one from the other.

## The worked example

Take a firm that runs a 200-hour standard month and an engineer, Hana, whose total constant salary
in payroll is 10 000.

1. On the settings screen, **Standard Monthly Hours** = `200` and
   **Update Hour Cost of Time Sheet From HR** is ticked.
2. Hana records a Tasks Executing line for 6.5 hours on 3 March.
3. On save, Nama asks the payroll for Hana's total constant salary on 3 March — 10 000 — and divides:

   `10 000 ÷ 200 = 50` per hour.

   That 50 lands in the line's **Cost of Hour** column.
4. The line's **Total Cost** follows immediately: `6.5 × 50 = 325`.

That 325 is the number that matters downstream. It is what the timesheet's accounting entry is
valued at, and it is what a project invoice bills when you collect executions.

Now the revenue side. Hana's rate on the task's executers grid is 60 per hour — the figure copied
from her employee record when she was added as an executor. The manager approves 6 of her 6.5 hours,
and the invoice collects approved time with **Normal Time Rate** set to `1.30`:

`60 × 6 × 1.30 = 468`

So the firm books 325 of cost and bills 468, and the two numbers travelled completely different
routes to get there.

::: tip Normal Time Rate is a multiplier, not a rate
The name reads like a price per hour, but it is a factor applied on top of the employee's own rate.
`1` means "charge the rate as it stands"; `1.30` means "charge 30 % above it". Leaving it empty means
multiplying by nothing — a collected time line comes out at **zero value**, which is by far the most
common cause of a project invoice that collects lines but shows no money.
:::

## The settings

| Option | Field id | What it controls | What changes when you set it |
|---|---|---|---|
| **Normal Time Rate** (معدل عمل اليوم العادي) | `value.normalTimeRate` | The markup applied when a project invoice collects approved time | The collected line value becomes `employee rate × approved hours × this factor`. Empty or zero produces zero-value lines |
| **Standard Monthly Hours** (عدد الساعات المعيارية شهرياً) | `value.standardMonthlyHours` | The divisor that converts a monthly salary into an hourly cost | Together with the option below it sets each timesheet line's Cost of Hour to `monthly salary ÷ this number` |
| **Update Hour Cost of Time Sheet From HR** (تحديث تكلفة الساعة في تنفيذ المهمه من الرواتب) | `value.updateHourCostOfTimeSheet` | Whether timesheet costing is driven by payroll or typed by hand | On: Cost of Hour and Total Cost are recomputed from payroll on every save. Off: see the warning below |
| **Filed Query 1 With Changing Date** (استعلام الحقل المحسوب 1 مع تغيير التاريخ) | `value.field1QueryWithChangingDate` | A site-specific query run when a timesheet's value date changes | A customisation hook — see the note at the end of this page. The screen spells it *Filed Query 1* |

::: warning With payroll costing off, timesheets are worth nothing
When **Update Hour Cost of Time Sheet From HR** is unticked, the Cost of Hour column becomes a
free field the user types — but **Total Cost is never computed at all**. It stays at whatever is in
the field, which on a fresh line is zero, and nothing else fills it in.

The consequences follow the zero all the way down. A timesheet line worth zero is dropped from the
accounting entry, contributes nothing when an invoice collects executions, and leaves the project's
cost figures understated. If you turn this option off, the site must have its own way of putting a
value into Total Cost — otherwise the labour side of the module is recording hours and nothing else.
:::

## Two things worth knowing about the payroll lookup

**If payroll is not configured, the cost is quietly left alone.** Nama asks the HR module for the
salary; if the HR configuration is missing, the lookup fails silently and the line's Cost of Hour is
simply not refreshed. You will not see an error — you will see a line whose cost never changed.

**If Standard Monthly Hours is empty or zero, the division is skipped.** The Cost of Hour keeps its
previous value, but Total Cost is still recalculated from that stale rate. On a new line that means
a total of zero; on an edited line it means a total computed from an out-of-date rate. Fill this
field in before you rely on timesheet costing at all.

::: details Filed Query 1 With Changing Date — a customisation hook
This one is not an ordinary setting. It holds a query that Nama runs whenever the value date on a
Tasks Executing document changes, passing it the date and the employee, and it was built so a site
could answer "how many hours did the attendance machine record for this person that day?" while the
timesheet is open.

The query runs, but the result is written to a field that is not on the standard timesheet screen —
so without a screen modifier that exposes it, nothing appears. Treat it as a hook for an
implementation consultant, not as a feature you can switch on from this screen.
:::

## Where the rest of the settings live

If you came here looking for something and did not find it, it is almost certainly per-project or
per-document rather than global:

- Rates per employee are on the employee record, and reach a task through its executers grid — see
  [Project Tasks](/modules/ecpa/tasks/ecpa-tasks).
- Estimated hours and costs are entered per discipline on each project — see
  [Milestones and the Phase–Discipline Matrix](/modules/ecpa/projects/ecpa-milestones-and-matrix).
- The accounts a document books to are on its document term (توجيه) — see
  [Document Terms for Project Documents](/modules/ecpa/invoicing/ecpa-document-terms).
- Which classifications exist at all is set up once in
  [Project Types, Classes and Disciplines](/modules/ecpa/projects/ecpa-project-setup).
