---
description: "The Salary Structure screen: a reusable template of salary component types with values or formulas, its fields and components grid, the fallback rule versus employee components, and where structures are used."
entities: [SalaryStructure]
menu: Payroll → Salary Configurations → Salary Structure
---
# Salary Structures

Setting up every allowance and deduction on every employee one by one doesn't scale once a company has more than a handful of staff. A **Salary Structure** is a reusable template — "the standard package for a sales representative", say — that lists a set of [component types](salary-components.md) with their values or formulas already filled in, ready to be applied to any employee who needs that package.

## Salary Structure

Found at **Payroll > Salary Configurations > Salary Structure**.

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Code / Group / Arabic Name / English Name | الكود / المجموعة / الاسم العربي / الاسم الإنجليزي | Identification. |
| Housing Allowance | بدل سكن | One of **None** (بدون), **Applicable** (مطبق), or **Insured** (مؤمن) — the same three-way switch found on [Employee HR Information](../setup/employee-hr-information.md). |
| Transportation Allowance | بدل مواصلات | The same None / Applicable / Insured choice, for the transportation allowance. |
| Copy Details When Use | نسخ التفاصيل عند الأستخدام | Whether the structure's component lines are copied down into the target record when the structure is applied, rather than only referenced. |

The heart of the screen is the **Salary Components** grid (مفردات رواتب), where each line names a **Component Type**, the [HR Calendar](../setup/hr-calendar-and-holidays.md) it runs against, an **Issuance**, and — the actual pricing — either a **Salary Component Value** (a flat number) or a **Component Calculation Formula**. A structure line is keyed by *component type*, not by a single fixed component record, which is exactly what lets one structure generate the right priced component for whichever employee it's applied to.

![Salary Structure, listing its component lines](../../../ar/modules/hr/images/concepts/salary-structure-en.png)

## The key rule: a fallback, not an override

This is the single most important thing to understand about salary structures: **a structure is only ever a fallback.** When a salary is generated, Nama reads the employee's *own* component lines first — the ones on their [Employee HR Information](../setup/employee-hr-information.md) record, or the ones fixed on their job offer. A structure is consulted **only when the employee has none of their own lines for that component type at all.**

::: warning A structure never silently overwrites an individual
Assigning a structure to a whole department is safe precisely because of this rule. If one employee in that department already has a personal housing allowance set on their own record, the structure's housing-allowance line simply never applies to them — it isn't compared against, blended with, or used to override what's already there. The structure fills gaps; it never replaces what an employee already has.
:::

Within the structure itself, each line's value or formula can still be adjusted independently of the component master it points to — so one structure can host small per-role variations (a slightly different transportation rate for one job grade, say) without needing to define a whole new component for each variation.

## Where structures are used

A structure is most often set directly on an employee's [HR Information](../setup/employee-hr-information.md) record, so that every one of that employee's missing component lines falls back to it. It also shows up earlier in the hiring pipeline: a [job offer](../recruitment/job-offers-and-tests.md) can carry its own proposed salary structure, which then carries forward once the candidate becomes an employee — so the structure a candidate was offered on is the same fallback their eventual payslip reads from.

Like most master data in payroll, a structure can be scoped with the standard **Dimensions** — legal entity, branch, sector, department, analysis set — so different parts of the organization can maintain their own structures without them colliding.

## Actions on this screen

The Salary Structure screen has no buttons of its own; it is filled in and saved.

## Related pages

- **[Salary Components](salary-components.md)** — the component types and components a structure's lines point to.
- **[Job Offers & Tests](../recruitment/job-offers-and-tests.md)** — where a salary structure is often first proposed, before an employee even joins.
- **[How Salary Is Calculated](../concepts/hr-salary-engine.md)** — how structures fit into the full five-step pipeline.
- **[Employee HR Information](../setup/employee-hr-information.md)** — the employee's own component lines, which always take priority over a structure.
