---
description: "Answers to three common payroll and HR questions: excusing a late arrival with a leave permission so it is not deducted, how lateness and overtime are calculated on weekly days off and public holidays, and producing one consolidated journal entry per payroll run."
entities: [LeavePermission, SalaryDocument, SalarySheet]
---

# Frequently Asked Questions — Payroll and Human Resources Module

Three questions that come up often. Each answer is short; the page that explains the mechanism in
full is linked underneath.

## An employee was late for a genuine reason. How do we stop it being deducted?

Enter a **leave permission** covering the late period — 08:00 to 10:00 on the day in question, if
they were due at eight and arrived at ten — and choose a permission type that is not deducted.

When the day's attendance is calculated, the excused time is subtracted before lateness is recorded,
so the two hours do not count as a late arrival. Record the reason in the notes, and use approvals if
the permission should be signed off by the line manager or HR first.

There is a stronger version of this for a recurring arrangement: the setting **Leave Permission
Starts The Day** on [HR Configuration](/modules/hr/setup/hr-configuration) drops the lateness
entirely whenever a leave permission precedes the arrival, rather than only subtracting the excused
minutes.

→ [Overtime and Lateness](/modules/hr/attendance/overtime-and-lateness) explains how lateness is
measured and what an excuse subtracts.

## How are lateness and overtime calculated on weekly days off and public holidays?

On a **weekly day off**, the entire attendance is treated as overtime and no lateness is calculated
at all. There is no setting that changes this.

On a **public holiday** or a **vacation day**, the same is true by default, but two settings on
[HR Configuration](/modules/hr/setup/hr-configuration) let you measure the day like an ordinary
working day instead: *Calculate Normal Work Hours For Holidays* and *Calculate Normal Work Hours For
Vacations*. Both labels end with the reminder *(Overtime will not be all day)*.

::: warning An earlier version of this page was wrong about this
It said the weekly day off was controlled by the "for vacations" setting. It is not — weekends and
weekly rest days have **no** opt-out, and the vacation setting governs vacation days only.
:::

Which shift the day is measured against comes from the employee's
[attendance plan](/modules/hr/attendance/attendance-plans-and-shifts), and a day that is a holiday
and a day off at once is resolved by the day-type collision settings on the configuration page.

→ [Overtime and Lateness](/modules/hr/attendance/overtime-and-lateness) is the full account of both
calculations.

## How do we produce one consolidated journal entry for a payroll run instead of one per employee?

Salaries are confidential, and by default each salary document creates its own entry, so anyone with
access to the ledger can read individual salaries. Moving the entry up to the sheet takes two
settings that look contradictory and are not:

1. On the **salary document term**, tick **Without Accounting Effect**. The individual documents stop
   creating entries.
2. On the **salary sheet term**, tick **Generate Accounting Effects**. The sheet creates one entry for
   the whole run.

The two switches read as opposites because they are named in opposite senses — a ticked box means
"no entry" on the document and "an entry" on the sheet.

::: danger One entry is not yet confidential
Consolidating the entry is only half the job. If the salary components and the employee payables
still resolve to **per-employee subsidiary accounts**, every salary is still legible in the entry's
subsidiary detail. Point them at a general subsidiary account as well, or the confidentiality you
set out to achieve is not there.
:::

→ [Salary and Dues Document Terms](/modules/hr/document-terms/hr-terms-salary-and-dues) covers both
terms, and [Salary Components](/modules/hr/payroll/salary-components) covers where a component's
accounts come from.
