---
description: "The Annual Increases Document for a raise round: its period and employee scope, the rule for which salary components rise and by how much, its workflow and the per-employee changes it generates."
entities: [AnnualIncreasesDoc]
menu: Payroll → Main → Annual Increases Document
---
# Annual Increases

Salaries don't stay still. Once a year — or whenever a company decides on a raise round — every employee's pay needs to move: a percentage on the basic salary, a fixed bump to an allowance, a new insurable base. Doing that one employee at a time is exactly the kind of repetitive work that invites mistakes. The **Annual Increases Document** turns a raise campaign into a single, reviewable document: you describe *who* gets raised and *how*, collect the matching employees, and let the document generate the individual salary changes.

## Where to find it

**Payroll > Main > Annual Increases Document** (الرواتب > الأساسيات > مستند الزيادة السنوية).

## Why it exists

A raise round has two moving parts that this document keeps together in one place: the **scope** (which employees are in the round) and the **rule** (what happens to their pay). Rather than editing hundreds of employee records by hand, you state the rule once, let the document harvest the eligible employees from filter criteria, and — for each one — it produces the actual per-employee change that carries the new figures onto the employee's record.

::: info This document creates no ledger entry
An Annual Increases Document is a **payroll-configuration** action, not an accounting one. It changes what employees will be *paid going forward*; it does not itself create any general-ledger entry. The financial effect only shows up later, when the next [salary documents](salary-documents.md) are generated with the raised figures.
:::

## The header: period, scope, and blanket increases

The top of the document fixes the timing and the population, and offers a few whole-population increases:

| Field (English) | Arabic label | Purpose |
|---|---|---|
| HR Year / HR Period / HR Calendar | سنة الرواتب / فترة الرواتب / تقويم الرواتب | The [payroll year, period and calendar](../setup/hr-years-and-periods.md) the raise round belongs to. |
| Issue Date / Value Date | تاريخ الإصدار / التاريخ الفعلي | When the document is written up, and the effective date the increase takes hold. |
| Generation Type | نوع الإنشاء | The field every document carries: whether this document was itself created by another record. It says nothing about the employee lines. |
| Basic Fixed Insurance Percent / Basic Fixed Insurance Value | نسبة الزيادة في الأساسي التأميني الثابت / قيمة الزيادة في الأساسي التأميني الثابت | A blanket percentage or fixed amount added to the **fixed insurable basic salary** for the whole round. |
| Basic Variable Insurance Percent | نسبة الزيادة في الأساسي التأميني المتغير | A blanket percentage added to the **variable insurable basic salary**. |
| Daily Salary Percent | نسبة الزيادة في الأجر اليومي | A blanket percentage added to the **daily wage**, for daily-paid labor. |
| Branch / Department / Sector / Legal Entity / Analysis Set | الفرع / الإدارة / القطاع / الشركة / مجموعة التحليل | The standard **Dimensions** that scope the document. |

### Who gets raised — the employee range

The document doesn't take a hand-typed list of employees. Instead you define a **range of criteria** — a set of *from / to* filters — and the document collects everyone who matches. The available bands cover employee, department, employee's department, department section, branch, sector, group, job position, organization position, work place, nationality, health-insurance company, analysis set, and the generic reference/description fields. Leaving a band open widens the net; narrowing it targets a specific slice of the workforce — one branch, one nationality, one job grade.

## The rule: which components get raised, and by how much

The **Details** grid (التفاصيل) is where the actual raise rule lives. Each line targets a salary component and states how it moves:

| Field (Arabic → English) | Purpose |
|---|---|
| نوع المفرد (Component Type) | The [salary component](salary-components.md) whose current value on the employee is the base of a percentage increase. It is also the component that receives the increase when **Target Salary Component** is empty. |
| مفرد الراتب هدف الزيادة (Target Salary Component) | The component that receives the increase. Leave it empty to raise the **Component Type** itself; fill it to raise one component by a percentage of another (for example, a housing allowance raised by 5% of the basic salary). |
| نوع الزيادة (Increase Type) | *How* the component moves — see the values below. Empty means **Addition Percentage**. |
| نسبة/قيمة الزيادة (Increase Percentage / Value) | The magnitude — read as a percentage or an amount, depending on the increase type. |

**Increase Type** (نوع الزيادة) decides the mechanism:

| Value (Arabic → English) | Meaning |
|---|---|
| نسبة مضافة (Addition Percentage) | Add the percentage of the **Component Type**'s current value to the target component. |
| قيمة مضافة (Addition Value) | Add a fixed amount to the target component. |
| نسبة مخصومة (Deduction Percentage) | Subtract the percentage of the **Component Type**'s current value from the target component — a negative round. |
| قيمة مخصومة (Deduction Value) | Subtract a fixed amount from the target component. |
| استبدال القيمة (Replace Value) | Overwrite the target component's value with the figure entered — used when the new pay is set outright rather than nudged. |

When the document term ticks **Apply Increase relative to Service months count** (تطبيق الزيادة نسبة لعدد شهور الخدمة), an employee with fewer than 12 months of service on the value date gets only *months ÷ 12* of each increase (Replace Value is not prorated). The term's fields are described under [The Annual Increases term](/modules/hr/document-terms/hr-terms-salary-and-dues#The-Annual-Increases-term).

::: tip Blanket rules apply to everyone collected — exceptions handle the edge cases
The Details grid is the *blanket* rule for the whole round. When a handful of employees should be treated differently — a larger raise for a top performer, no raise for someone still on probation — you record them in the **Exceptions** grid (الاستثناءات) instead. Each exception line names the employee, the target component, an increase type and a magnitude of its own, overriding the blanket rule for that one person.
:::

## Workflow

1. **Create** the document under **Payroll > Main > Annual Increases Document** and set its HR Year, Period, Calendar, and effective (Value) date.
2. **Define the scope** by filling the employee range criteria — as wide or as narrow as the round requires.
3. **Define the rule(s)** in the Details grid: for each component you want to move, pick the target component, the increase type, and the magnitude. Add any per-employee overrides in Exceptions.
4. **Collect the employees.** Use **Collect Employees** (تجميع الموظفين) to resolve the range criteria into concrete employee lines, then, if individual employees need fine-tuning, **Collect Employees With Components** (تجميع الموظفين مع المفردات) to write every employee × Details rule into the **Exceptions** grid, where you edit the few that differ.
5. **Review the generated lines.** Each collected employee appears in the **Employees Lines** grid (سطور الموظفين), showing the employee, their supervisor, and — once saved — a link to the per-employee change document that actually carries the new figures onto the employee's record.
6. **Save.** The document then creates one employee-info change per line in the Employees Lines grid, applying the raised figures going forward.

::: warning Edit the campaign, not the generated changes
Like other batch documents in Nama, the per-employee changes an Annual Increases Document produces are managed *by* the document. Re-collecting or reprocessing the campaign is the right way to adjust the round — editing the generated single changes directly puts them out of step with the campaign that owns them.
:::

## Actions on this screen

- **Collect Employees** — adds one employee line for every employee who matches the range and is still **working** at the end of the chosen period. The **HR Period** must be filled first. Employees already on the document are kept and never duplicated, so you can widen the range and press it again.
- **Collect Employees With Components** — builds the **Exceptions** grid from what is already on the document: one line per collected employee for every **Details** rule, carrying that rule's component, increase type and percentage. It **replaces** whatever the Exceptions grid held, so press it before you start editing exceptions, then change or delete lines until only the real exceptions remain. It does nothing until both the employee lines and the Details grid have something in them.

## How it's processed

Saving works only on the lines already in the **Employees Lines** grid; the range criteria are read only by **Collect Employees**. The save is refused while the **Details** grid is empty, or while an employee line repeats an employee, names an employee who is not **working**, or names an employee with no job offer.

For each employee line the save creates an **Update Employee Info** document (in the book named by the term's **update Employee Info Book**) and saves it as part of the same save, so one failing line refuses the whole document. That document starts from the employee's information as it stood the day before the **Value Date**, raises the components as the Details and Exceptions grids say, and adds the blanket insurance and daily-salary increases. When **Basic Fixed Insurance Value** is filled it is added as an amount; otherwise **Basic Fixed Insurance Percent** is applied. It also carries the line's supervisor, contact information, references and descriptions. Saving the document again rebuilds these changes; removing an employee line deletes that employee's change, and deleting the document deletes all of them.

No amount is recorded in the general ledger by this document — the money only moves when the *next* salary run picks up the new figures.

![Annual Increases Document, with its increase rule and collected employee lines](../../../ar/modules/hr/images/payroll/annual-increases-en.png)

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *You can fill only the field Basic Fixed Insurance Value or Percent the field , not both* — «يمكنك ملء الحقل نسبة الزيادة في الأساسي التأميني الثابت أو حقل القيمة و ليس كلاهما معا» | Both **Basic Fixed Insurance Percent** and **Basic Fixed Insurance Value** carry a figure, so the blanket increase to the fixed insurable basic could be read two ways. | Keep the percentage or the amount, and clear the other. |
| *The Employee {0} is not working* — «الموظف {0} ليس على رأس العمل» | An employee line names someone whose state is no longer **Working**. | Remove the line. |
| *The Employee {0} does not have a job offer* | An employee line names someone with no job offer, so there is no employee information to raise. | Remove the line, or complete the employee's hiring first. |
| *The Employee {0} is repeated* | The same employee appears twice in the **Employees Lines** grid. | Delete one of the two lines. |
| *Employee {0} must be in employee lines* — «يجب أن يكون الموظف {0} في سطور الموظفين» | An **Exceptions** row names an employee who is not among the employees the document collected, so there is no blanket rule for the exception to override. | Widen the employee range so the document collects that employee, or remove the exception row. |
| *You must enter one of the target component or the component type* — «يجب أن يتم إدخال مكون الراتب هدف الزيادة أو مكون الراتب» | An exception row says nothing about *what* is being increased — both **Target Salary Component** and **Component Type** are empty. | Fill one of the two on that row. |
| *Target component {0} must be in the details* — «مكون الراتب هدف الزيادة {0} يجب أن يكون في التفاصيل» | The exception targets a component that the **Details** grid does not raise at all; an exception can only override a blanket rule that exists. | Add the component to the Details grid, or point the exception at a component the round already covers. |
| *The employee {0} with component type {1} is repeated in line {2} and {3}* — «الموظف {0} مع مكون الراتب {1} مكرر في السطر {2} و {3}» | Two exception rows give the same employee a different treatment for the same component. | Delete one of the two rows — the message gives both line numbers. |

## Related pages

- **[Salary Components](salary-components.md)** — the components an increase rule targets, and where the raised values ultimately live.
- **[Salary Documents](salary-documents.md)** — where the raised figures finally turn into paid salary and a ledger effect.
- **[How Salary Is Calculated](../concepts/hr-salary-engine.md)** — the full pipeline the raised components feed into.
- **[HR Years, Periods & Salary Issuance](../setup/hr-years-and-periods.md)** — the payroll calendar a raise round is tied to.
