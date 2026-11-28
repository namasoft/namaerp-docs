---
entities: [ChangeEmployeeState]
menu: Payroll → Vacations → Change Employee State
---
# Change Employee State

Every employee carries one working state at a time — Working, In Vacation, Suspended, Resigned, Dismissed, Pension, and a set of open-ended "Other" states a company can repurpose for its own needs. **Change Employee State** (تغيير حالة موظف) is the one screen that records a change to that state directly, with the date it takes effect, independent of any other document.

**Where to find it:** Payroll > Vacations > Change Employee State.

| Field (English) | Arabic | Notes |
|---|---|---|
| Employee | الموظف | Whose state is changing. |
| Value Date | التاريخ الفعلي | The date the new state takes effect from. |
| Change Employee State To | تغيير حالة الموظف إلى | The new state: `Working` (على رأس العمل), `In Vacation` (في إجازة), `Suspended` (موقوف), `Resigned` (مستقيل), `Dismissed` (تم فصله), `Pension` (على المعاش), `Appointed` (مُعين), `Offered` (بانتظار الموافقة), or one of ten free-form `Other` states a company can define its own meaning for. |
| From Document | بناءً على | An optional link to the document the change is based on. |

Committing this document does two things: it writes the employee's current state directly onto their record, and it adds a **dated state-history entry**, so the system always knows which state an employee was in on any given date in the past — not just their state today. Deleting the document removes its history entry again.

![Change employee state](../../../ar/modules/hr/images/vacations/change-employee-state-en.png)

## Other documents that change the state

Change Employee State is not the only writer of that history. Most state changes come from other documents, which record their own history entries without creating a Change Employee State record:

- A [Vacation Document](vacation-documents.md) changes the state from its start date when its **Vacation Reason**, or else its [Vacation Type](vacation-types-and-balances.md), has a **Change Employee State To** value (for example `In Vacation` or `Suspended`).
- A Work Starting Document sets the employee back to `Working` from its starting date; this is how a return from vacation is recorded.
- Job offers, Update Employee Information, Employment Information and the firing documents record their own state changes too.

Change Employee State is for the cases none of those cover — ending an unpaid leave early, marking someone `Resigned`/`Dismissed`/`Pension` outside of the [firing workflow](../end-of-service/firing-and-termination.md), or reactivating someone whose state was set to `Suspended` via a manual Change Employee State entry (often recorded alongside a [suspension document](../discipline/hr-suspension.md)). For those, HR opens Change Employee State directly and records the change by hand.

::: info No accounting effect
Change Employee State never touches the ledger. It exists purely to answer one question — "what was this employee's working state on this date?" — for everything else in HR and payroll to read.
:::

## What it does to payroll

That state history is not just informational — the [salary sheet](../payroll/salary-documents.md) generation step reads it for every employee before it will issue a salary document for a period. An employee has to be `Working` for some part of the period (or have a firing date that falls inside it) for the period's salary to be generated at all; a period spent entirely `Suspended`, `Resigned`, `Dismissed`, `Pension`, or in one of the `Other` states is normally excluded, unless the employee also spent part of that same period `In Vacation` under a paid/partially-paid vacation type (in which case the salary engine still treats the period as partially worked).

In practice this means the state history — whether written by Change Employee State, a vacation document or a work starting document — is what tells payroll whether to include that employee in the next salary run at all.

## Actions on this screen

The Change Employee State document has no buttons of its own — you fill it in and save it.

## Where this fits

- **[HR Suspension](../discipline/hr-suspension.md)** — the disciplinary suspension document; it's related but separate — recording it does **not** by itself change the employee's state. Putting someone into the `Suspended` working state still takes a Change Employee State entry, recorded here.
- **[Salary Documents](../payroll/salary-documents.md)** — where the recorded state history is read to decide whether a salary document can be generated for an employee in a given period.
