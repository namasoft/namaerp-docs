---
entities: [HOViolationItem, HOViolationList, HOPenaltyDocument, HOPenaltyRequest]
---
# Government Penalties

Alongside the visa and fee work, the government-relations desk maintains the company's **disciplinary
code** — the internal list of workplace violations and the penalties attached to them — and issues the
documents that apply a penalty to an employee. In Nama this is a small, self-contained subsystem: you
define the rulebook once (the violation articles and their escalating penalties), then raise a
**Penalty Request** and turn it into a **Penalty Document** when a specific employee breaches a rule.

::: warning These are labour / company-code penalties — not two other things they resemble
It is easy to confuse this subsystem with two others; keep them apart:

- **Not traffic / vehicle fines.** A speeding ticket or a parking fine on a company car is recorded
  against the vehicle, not here. Those live in
  [Employee Services (Vehicles, Transport & Meals)](../employee-services).
- **Not the payroll reward / penalty family.** An ad-hoc bonus or a one-off salary deduction the
  manager decides on is the payroll reward/penalty flow — see
  [Rewards & Penalties](../discipline/rewards-and-penalties). The documents on *this* page are driven
  by the formal **violation code** with tiered escalation, and they behave differently in the ledger
  (see below).
:::

This area needs the advanced HR licence (`humanresource-advanced`). For the shared PRO cycle it sits
inside, see the [Government Relations Overview](./government-relations-overview).

## The rulebook: Violation List and Violation Item

The disciplinary code is defined in two layers.

The **Violation List** (`مادة لائحة إدارية`) is the top-level article — the heading in the company's
regulations, such as *attendance violations* or *safety violations*. It carries a code, a group, an
Arabic and an English name, and attachment slots for the official regulation text. Find it under
**Human Resources → Work List → Violation List**
(`الموارد البشرية > لائحة العمل > مادة لائحة إدارية`).

The **Violation Item** (`بند مخالفة`) is the specific offence within an article — *arriving late*,
*leaving without permission* — together with its **base penalty**. This is where the real rulebook
lives. Find it under **Human Resources → Work List → Violation Item**
(`الموارد البشرية > لائحة العمل > بند مخالفة`).

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Code | الكود | The item's code. |
| Group | المجموعة | Its grouping. |
| Arabic Name / English Name | الاسم العربي / الاسم الإنجليزي | The offence's display name. |
| Violation List | مادة لائحة إدارية | The parent article this item belongs to. |
| Violation | المخالفة | A description of the violation. |
| Penalty | العقوبة | A description of the penalty. |
| Financial Penalty | الغرامة المالية | A flat fine amount (and currency). |
| Penalty From Salary | الخصم من الراتب | A salary deduction expressed as a time period (e.g. deduct 2 days' pay). |
| From Salary \| Percentage | من الراتب \| % | A penalty expressed as a percentage of salary. |
| Unit | الوحدة | `Day` takes the percentage of one day's salary (the salary ÷ 30); `Month` takes it of the whole salary. |
| Component Group | مجموعة مفردات راتب | The salary components whose total is "the salary" for the time-period and percentage penalties. Left empty, the employee's basic salary is used. |
| Component Used To Show HO Violation Item In Salary Document | المفرد المستعمل لإظهار بند المخالفة في سند الراتب | The salary component whose deduction the penalty is added to on the salary document (see the accounting section below). |

![Violation Item](../../../ar/modules/hr/images/government-relations/ho-violation-item-en.png)

### Tiered escalation by repetition

The reason a Violation Item is more than a single fine is its **Details** grid: a ladder of penalty
**tiers** that get harsher the more often the same employee repeats the same offence. Each tier row
carries:

| Column (English) | Arabic label | Meaning |
|---|---|---|
| Repetition Count | عدد مرات التكرار | The occurrence number this tier applies from (1st, 2nd, 3rd…). |
| During | خلال | The window over which repetitions are counted. |
| Penalty | العقوبة | A description of the tier's penalty. |
| Financial Penalty / Penalty From Salary / From Salary \| Percentage / Unit | الغرامة المالية / الخصم من الراتب / من الراتب \| % / الوحدة | The harsher amounts for this tier. |

The **During** window decides *which* previous penalties count toward the repetition tally. It can be
one of four values, or left empty to count every earlier penalty of the employee for the item:

| During (English) | Arabic label | Counts repetitions within… |
|---|---|---|
| Salary Period | فترة الراتب | The same payroll period. |
| Salary Year | سنة الرواتب | The same payroll year. |
| Fiscal Period | فترة محاسبية | The same accounting period. |
| Fiscal Year | سنة مالية | The same accounting year. |

So a rule can read: *first offence in the payroll year — one day's pay; second offence in the same
year — three days' pay; third — a flat fine.* Each time you pick a violation item on a line of a
Penalty Request or a Penalty Document, and again when the record is saved, the system counts the
employee's earlier **committed Penalty Documents** that contain the same violation item within the
tier's window (the record being edited is not counted), and picks the **applicable tier**: the highest
tier whose Repetition Count is at or below that count plus one. An empty Repetition Count counts as 1.
When no tier qualifies, the tier with the lowest Repetition Count applies. The item's own penalty
fields (the base penalty) are used only when its Details grid has no rows.

A window that needs a value the record lacks counts nothing: a **Salary Period** or **Salary Year**
window with no HR Period on the record, or a **Fiscal Period** or **Fiscal Year** window with no fiscal
period or year.

::: tip Worked example
Suppose the *late arrival* item has three tiers, all **During = Salary Year**: tier at repetition
**1** = 1 day's pay, tier at repetition **2** = 3 days' pay, tier at repetition **3** = a flat 500
fine. An employee with **no** prior late-arrival penalties this year gets tier 1 (1 day). Their
**second** penalty this year jumps to tier 2 (3 days). Their **third** and every later one lands on
the flat 500 fine. Without the tier at repetition 1, the first offence would already get the 3 days of
tier 2, because the lowest tier applies when none qualifies.
:::

## Applying a penalty: Request then Document

Issuing a penalty follows Nama's usual request → document split.

The **Penalty Request** (`طلب مخالفة`) is the proposal: it names the employee, the payroll period it
belongs to, and one or more lines each pointing at a violation article and item. It records the
intent and computes the total, but — like every request in Nama — it has **no effect** on its own.
Find it under **Human Resources → Work List → Penalty Request**
(`الموارد البشرية > لائحة العمل > طلب مخالفة`).

The **Penalty Document** (`سند مخالفة`) is the executed penalty. It can be raised directly or built
from an accepted request (its **From Document** field records the origin). It carries the same
employee, period and violation lines, and a computed **Financial Penalty Total**. Find it under
**Human Resources → Work List → Penalty Document** (`الموارد البشرية > لائحة العمل > سند مخالفة`).

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Employee | الموظف | The employee being penalised. |
| HR Period | فترة الرواتب | The payroll period the penalty falls in (also drives repetition counting). |
| From Document | بناءا على | The request or document this one was generated from. |
| Term | توجيه المستند | The document term that supplies the ledger accounts (see below). |
| Violation List / Violation Item | مادة لائحة إدارية / بند مخالفة | The article and item breached (one per line). |
| Financial Penalty | الغرامة المالية | The computed penalty for the line. |
| Financial Penalty Total | إجمالى الغرامة المالية | The document's total penalty amount. |

![Penalty Document](../../../ar/modules/hr/images/government-relations/ho-penalty-document-en.png)

## Actions on this screen

None of these screens — **Violation List**, **Violation Item**, **Penalty Request** and **Penalty Document** — has buttons of its own; you fill them in and save.

## How it's processed / its accounting effect

This is the accounting point that sets government penalties apart from the rest of the
government-relations desk, so it is worth stating plainly.

::: warning The Penalty Document DOES create a real ledger entry — the request does not
When a **Penalty Document** is committed, it raises a genuine general-ledger entry for the penalty
total: a balanced journal with a **debit** side and a **credit** side, both taken from the document's
**term** (`توجيه المستند`) and valued at the document's Financial Penalty Total. This is a real
entry, processed like any other through a **business request** (`طلب أعمال`) with its own
**processing status** (`حالة المعالجة`) that you can retry from the **Business Requests** view.

The **Penalty Request** creates **no entry** — it is only a proposal. The
[Payment Request](/modules/hr/government-relations/government-relations-overview) is the opposite case: it records a government fee
without creating an entry.
:::

The penalty total the entry carries is the sum of each line's computed penalty, taken from the
applicable escalation tier: the flat fine, plus the time-period deduction, plus the percentage of
salary. "The salary" is the total of the employee's salary components that belong to the violation
item's **Component Group**, or the basic salary when the item has no group. A time-period deduction
counts a day as 8 hours and a month as 30 days, so 2 days cost 2 × 8 ÷ 240 = 1/15 of the salary.

The penalty reaches the employee's salary document only when the salary document's term has
**Collect HO Penalties In Salary Lines** ticked (see
[Salary and Dues Document Terms](/modules/hr/document-terms/hr-terms-salary-and-dues)). Salary
generation then takes the employee's committed Penalty Documents whose value date falls between the
salary document's from and to dates, and adds each line's Financial Penalty to the **Deduction** of
the salary document line for the violation item's **Component Used To Show HO Violation Item In Salary
Document**. A line whose item has no such component is skipped. When the salary document has no line
for that component, salary generation reports:

*The component {0} from HO Penalties could not be found for the employee {1} in salary document {2}* — «المفرد {0} الموجود في سند المخالفة لا يمكن إيجاده للموظف {1} في سند الراتب {2}»

## Related

- [Government Relations Overview](./government-relations-overview) — the PRO desk, the fee catalogue,
  and why the Payment Request does **not** create an entry while this document does.
- [Rewards & Penalties](../discipline/rewards-and-penalties) — the payroll bonus/deduction family,
  which is a different thing from these code-driven violation penalties.
