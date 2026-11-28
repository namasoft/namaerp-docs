---
description: "How to hold and release an employee's pay: the Salary Block Rule that holds pay automatically, the Salary Block and Salary Unblock documents, and Partial Salary Payment templates for paying out only part of a salary."
entities: [SalaryBlockRule, SalaryBlockDocument, SalaryUnBlockDocument, PartialSalaryPayment]
---
# Salary Blocking & Partial Payment

Sometimes a salary shouldn't be paid out — at least not yet, and not in full. An employee is under investigation, hasn't returned company property, or has an unresolved clearance; the pay needs to be *held* until the situation resolves. Nama handles this with a small family of records: a **rule** that decides automatically when to hold pay, a **block document** that holds one employee's pay for one period, an **unblock document** that releases it, and a **partial payment** template for paying out only part of a salary.

A hold works inside the salary calculation: while it stands, every component of the employee's [salary document](salary-documents.md) for that period is calculated as zero.

## The pieces

| Screen | Type | What it does |
|---|---|---|
| Salary Block Rule (قاعدة حجب مرتب) | Setup | Conditions that decide *automatically* whose pay to hold. |
| Salary Block (حجب راتب موظف) | Document | Holds a specific employee's pay for a period. |
| Salary Unblock (إلغاء حجب راتب) | Document | Releases a hold, restoring normal payment. |
| Partial Salary Payment (ملف صرف راتب جزئي) | Setup | A reusable template selecting which components get paid out in a partial payment. |

## Salary Block Rule — deciding automatically whom to hold

Rather than manually blocking employees one by one, a **Salary Block Rule** lets you express the *conditions* under which pay should be held, and have the system apply them. Found at **Payroll > Settings > Salary Block Rule** (الرواتب > الإعدادات > قاعدة حجب مرتب).

| Field (Arabic → English) | Purpose |
|---|---|
| الاسم العربي / الاسم الإنجليزي (Arabic Name / English Name) | Identifies the rule. |
| تفعيل (Activate) | Turns the rule on or off. |
| الحجب عند (Block on) | Whether **Any Condition** (أي شرط) or **All Conditions** (كل الشروط) must be met before pay is held. A rule with this field empty never holds pay. |
| إدارة موظف (Employee Department) / فترة الرواتب (HR Period) | Scope the rule to one department and one period. Empty means every department or every period. |

The conditions themselves live in the **Rules** grid (القواعد الواجب توافرها): each line attaches a **Rule** (قاعدة) — a [calculation formula](salary-calculation-formulas.md), the same building block used elsewhere in payroll. Each time an employee's salary is calculated, every active rule whose department and period fit is evaluated for that employee, and a formula that returns a non-zero value counts as a met condition. The **Block on** setting decides whether *any* met condition is enough to hold the pay, or whether *all* of them must be met. A rule never creates a Salary Block document; it holds the pay directly during the calculation.

## Salary Block — holding an employee's pay

A **Salary Block** document (**Payroll > Payroll > Salary Block** — الرواتب > الرواتب > حجب راتب موظف) is the actual hold: it names an employee and a period, and while it stands, every component of that employee's salary for that period is calculated as zero. It is always raised by hand (or imported); block rules hold pay on their own without creating one. An employee can have only one Salary Block per period.

| Field (Arabic → English) | Purpose |
|---|---|
| الموظف (Employee) | Whose pay is being held. Required. |
| فترة الرواتب (HR Period) | The period the hold applies to. Required. |
| التاريخ الفعلي (Value Date) | The document's date. |
| إعادة إصدار سندات الرواتب المحفوظة (Regenerate Committed Salary Documents) | When ticked, saving this document — and deleting it — recalculates and saves again every already-saved salary document of this employee for this period, so the hold (or its removal) reaches pay that was already calculated. When it is not ticked, the hold reaches only salary documents calculated from now on. |
| مرفق 1 … مرفق 5 (Attachment 1 … Attachment 5) | Supporting files, such as the investigation memo. |

## Salary Unblock — releasing the hold

When the situation clears, a **Salary Unblock** document (**Payroll > Payroll > Salary Unblock** — الرواتب > الرواتب > إلغاء حجب راتب) releases the employee's pay for that period. It has the same fields as the block. While it stands, the employee's salary for that period is calculated normally even if a Salary Block document or a block rule would hold it: the unblock wins over both. An employee can have only one Salary Unblock per period. Like the block, it can recalculate the affected salary documents so the release takes effect immediately.

![Salary Block document](../../../ar/modules/hr/images/payroll/salary-block-en.png)

## Partial Salary Payment — paying out only part

A salary a company chooses to pay in stages sometimes needs to be paid out *partially*: this allowance now, the rest later. A **Partial Salary Payment** (**Payroll > Salary Configurations > Partial Salary Payment** — الرواتب > إعدادات الراتب > ملف صرف راتب جزئي) is the **template** that defines *which* parts get paid.

It is a reusable master record, not a payment itself. Beyond its Arabic/English name and group, its substance is the **Components** grid (المكونات):

| Field (Arabic → English) | Purpose |
|---|---|
| مكون (Component) | A [salary component](salary-components.md) to include in the partial payment. |
| نوع مكافأة / جزاء (Reward / Penalty) | Optionally, a specific [reward or penalty](../discipline/rewards-and-penalties.md) to include. |

Notice there is **no amount** on the template — it selects *which components* participate, not how much. The figure comes from the components themselves when the payment is actually made.

![Partial Salary Payment template](../../../ar/modules/hr/images/payroll/partial-salary-payment-en.png)

## How it's processed / its accounting effect

::: info The partial-payment template drives a Payment Voucher — and the voucher is what creates the entry
This is the part worth getting right. Neither the block document, the unblock document, nor the partial-payment template creates any general-ledger entry by itself — the block/unblock documents are pure HR controls that gate *whether* salary can be paid, and the partial-payment record is only a component-selection template.

The real cash-out is a **Payment Voucher** (a standard accounting payment document): when an operator pays part of a salary, they issue a payment voucher whose **From Document** is the Salary Sheet or the Salary Document, and fill its **Partial Salary Payment** field. The voucher then takes, for each saved salary document that still has an unpaid remainder, the net (additions minus deductions) of the components and rewards/penalties the template lists, less what has already been paid on that salary document, and fills its amount and lines with those figures. With the field empty it takes each salary document's net salary less what has already been paid. It is the **payment voucher** that records the actual debit/credit in the ledger, as a background **business request** with a **processing status**, retryable from the **Business Requests** view. The partial-payment file supplies the *what*; the voucher does the paying and creates the entry.
:::

## Workflow

1. **(Optional) Define a block rule** under **Payroll > Settings > Salary Block Rule** with the conditions that should automatically hold pay, and choose Any / All.
2. **Block the pay** — either let a rule hold it during the salary calculation, or raise a **Salary Block** by hand for the employee and period. Tick *Regenerate Committed Salary Documents* if the pay was already calculated.
3. **Pay partially if needed** — set up a **Partial Salary Payment** template listing the components to pay, then issue a **Payment Voucher** from the salary document or sheet with that template selected to actually pay (and record) that portion.
4. **Release the hold** — when the situation resolves, raise a **Salary Unblock** for the same employee and period (or delete the Salary Block), with *Regenerate Committed Salary Documents* ticked so the salary is recalculated.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Cannot Apply two documents of same type on {0} on the same period* — «لا يمكن حفظ مستندين للموظف {0} على نفس فترة الرواتب» | Another Salary Block (or, on the unblock screen, another Salary Unblock) already exists for this employee and HR period. | Open the existing document instead of adding a second one. |

## Actions on this screen

None of the four screens — Salary Block Rule, Salary Block, Salary Unblock and Partial Salary Payment — has buttons of its own; each is filled in and saved.

## Related pages

- **[Salary Documents](salary-documents.md)** — the payslips a block holds and an unblock releases.
- **[Salary Calculation Formulas](salary-calculation-formulas.md)** — the condition-formulas a block rule evaluates.
- **[Salary Components](salary-components.md)** — the components a partial payment selects to pay out.
- **[Rewards & Penalties](../discipline/rewards-and-penalties.md)** — the reward/penalty a partial payment can include.
