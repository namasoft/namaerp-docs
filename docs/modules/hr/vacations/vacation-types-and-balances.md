---
description: "The Vacation Type master file and its accrual, consumption and carry-forward rules, the Vacation Balance Range File for seniority-based entitlement, and the Opening Vacation Balance Document."
entities: [VacationType, VacationBalanceRange, OpeningVacationBalanceDoc]
---
# Vacation Types & Balances

Before anyone can take a day of leave, Nama needs to know what *kind* of leave it is and how many days the employee is entitled to. That is the job of three master-data screens: the **Vacation Type** (نوع الإجازة) that defines each kind of leave and its rules, an optional **Vacation Balance Range File** (ملف أرصدة الإجازات (بناءً على الخبرات)) that scales the entitlement with seniority, and the **Opening Vacation Balance Document** (سند إدخال رصيد إجازة افتتاحية) that seeds a starting balance for an employee. Everything else in the vacations area — requests, documents, plans — reads its rules from here.

## Vacation Type: the rulebook for one kind of leave

A **Vacation Type** (نوع الإجازة) is not just a label like "Annual" or "Sick." It is a small rulebook that controls how days accrue, how they are consumed, what happens to what is left over, and what the leave does to the employee's pay and service record.

**Where to find it:** Payroll > Vacations > Vacation Type.

![Vacation type](../../../ar/modules/hr/images/vacations/vacation-type-en.png)

### Classification and accrual

| Field (English) | Arabic | What it controls |
|---|---|---|
| Group | المجموعة | Optional master-group folder, for organizing many vacation types. |
| Vacation Classification | تصنيف الإجازة | `Annual Vacation` (إجازة سنوية) is the special class the rest of HR treats as *the* main leave balance (service-period math, dues liquidation, and the balance-range file all key off it); `Other 1/2/3` (أخرى 1/2/3) are free-form additional buckets you define yourself — sick leave, marriage leave, bereavement leave, and so on. |
| Vacation Calculation Policy | سياسة استحقاق الإجازة | When the year's entitlement is credited: Beginning Of Year Regarding Commencement Date (أول السنة مع الأخذ في الحسبان تاريخ التعيين), With Month Start (مع بداية الشهر), With Month End (مع نهاية الشهر), or Beginning Of Year Regardless of Commencement Date (أول السنة بغض النظر عن تاريخ التعيين). |
| Applicable After (months) | شهور العمل قبل استحقاق الإجازة | How many months of service must pass before an employee can take this leave at all. |
| Default Vacation Days | أيام الإجازة الافتراضية | The flat day entitlement — used unless a Vacation Balance Range File is attached (see below). |
| Vacation Balance Range File | ملف أرصدة الإجازات (بناءً على الخبرات) | Reference to a seniority-scaled entitlement table, instead of one flat number. |
| Vacation Days (Max) | الحد الأقصى للإجازة(يوم) | The longest a single vacation document of this type may run. |
| Balance Days (Max) | الحد الأقصى لرصيد الإجازة (يوم) | A ceiling on the accumulated balance itself. |
| Vacation Number During Service Period | عدد مرات الإجازة خلال فترة الخدمة | Caps how many times this leave can be taken across the whole employment (useful for one-off leave types like a pilgrimage or marriage leave). |

::: tip Reading it as a business rule
Annual leave is normally set up as `Vacation Class = Annual Vacation`, credited `With Month Start` (a twelfth of the year accrues every month) with a `Default Vacation Days` of, say, 21 or 30 — or, better, pointed at a **Vacation Balance Range File** so a 2-year employee earns fewer days than a 15-year one. Sick leave is usually a separate `Other` type with its own `Applicable After` and a `Vacation Days (Max)` per episode, and no balance-range dependency at all.
:::

### Which days a vacation consumes

A vacation that starts on a Sunday with a return date two Sundays later spans fourteen calendar days, but whether the balance drops by fourteen depends on what those days are. The first group on the screen decides it separately for three kinds of day: **weekends** (shift days that are neither a work day nor a weekly rest), **official holidays** from the holiday calendar, and **weekly rest** days (days marked *Weekly Rest* on the employee's shift). The *(Balance)* settings decide what comes off the vacation balance; the *(Salary)* settings decide how many vacation days payroll sees.

| Field | Arabic | What it controls |
|---|---|---|
| Include Weekend (Balance) | تشمل العطلة الأسبوعية (أرصدة) | On (the default): weekend days inside the vacation are deducted from the balance like any other day. Off: they are skipped. |
| Exclude Last Weekend If Immediately Before Return | لا تشمل العطلة الأسبوعية إذا كانت قبل يوم العودة مباشرة | Weekend days that run right up to the return date are not deducted. Example: with a Friday–Saturday weekend, a vacation from Sunday the 1st returning Sunday the 15th consumes 12 days instead of 14. It works only while **Include Weekend (Balance)** is on — with that flag off, no weekend is counted anyway. |
| Include Holiday (Balance) | تشمل العطلة الرسمية (أرصدة) | The same choice for official holidays. On by default. |
| Exclude Last Holiday If Immediately Before Return | لا تشمل العطلة الرسمية إذا كانت قبل يوم العودة مباشرة | Holidays that run right up to the return date are not deducted. Works only while **Include Holiday (Balance)** is on. With both *Exclude Last* flags on, a mixed run of weekend and holiday days before the return date is skipped as a whole. |
| Weekend Policy (Salary) | معاملة إجازة أسبوعية (رواتب) | `Like Balances` (مثل الأرصدة — the default) makes payroll follow **Include Weekend (Balance)**. `Include` (تشمل) or `Exclude` (لا تشمل) makes payroll count or skip weekend days whatever the balance flag says. |
| Holiday Policy (Salary) | معاملة عطلة رسمية (رواتب) | The same three choices for official holidays. |
| Week Rest Policy (Balance) | معاملة راحة أسبوعية (أرصدة) | How weekly rest days count against the balance: `Like Weekend` (مثل العطلة الأسبوعية — the default) treats them as weekend days; `Include` or `Exclude` decides on its own. |
| Week Rest Policy (Salary) | معاملة راحة أسبوعية (رواتب) | The same choice for payroll; `Like Weekend` follows the weekend's salary treatment. |

The two *Exclude Last* flags apply to the balance and to payroll alike.

### What happens to leftover balance and to pay

| Field | Arabic | Meaning |
|---|---|---|
| Vacation Transfer Policy | سياسة ترحيل الإجازة | What happens to days left unused at year end: Ignored (تجاهل — simply lost), Repaid (تعويض — cashed out, see [Vacation Compensation & Transfer](vacation-compensation-and-transfer.md)), or Migrated (ترحيل — carried into next year's balance). |
| Minimum Consumed Days Per Year | الترحيل بحد أدنى من المستهلك سنويا | A floor on how many days must actually be *used* before migration/repayment of the rest is allowed. |
| No Max Limit | السماح بتعدي رصيد الإجازة | Lets an employee go negative on this vacation type's balance with no limit at all — the balance check is skipped. |
| Allowed Days For Balance Exceed | السماح بتعدي رصيد الإجازة بمدة(أيام) | How many days into negative the balance may go. It is used while **No Max Limit** is unticked — with No Max Limit ticked there is no limit to apply. |
| Without Salary Deducted From Termination | بدون مرتب و يخصم من نهاية الخدمة | Marks this as unpaid leave whose days *do* reduce the end-of-service gratuity calculation. |
| Without Salary Not Deducted From Termination | بدون مرتب ولا يخصم من نهاية الخدمة | Unpaid leave that does **not** touch the gratuity calculation. |
| Deduct Percentage From Salary Components | استقطاع نسبة من المفردات | Instead of an all-or-nothing unpaid day, deduct only a percentage from selected salary components — configured on the **Deduction Percentage Lines** grid. |
| Discard Components | المفردات الواجب تجاهلها مع الإجازة بدون مرتب | The salary components to simply skip (not deduct, not pay) while this leave type is unpaid. |

### The flag that feeds end-of-service settlement

| Field | Arabic | Meaning |
|---|---|---|
| Deducted From Work Period | تخصم من مدة العمل | When on, days taken under this vacation type do **not** count as credited service — they shrink the service period used later to compute the end-of-service gratuity. |

::: warning This flag has downstream consequences
`Deducted From Work Period` is not cosmetic. An employee with several months of this kind of leave over their career will show a shorter *net* service period the day they leave the company, and a shorter service period means a smaller gratuity. Nama's [dues liquidation](../end-of-service/dues-liquidation.md) settlement reads this flag when it works out how many service days the payout is based on — that is the whole reason this field lives on the Vacation Type rather than being decided case-by-case on each document.
:::

### A few more behaviors worth knowing

- **Always Show In Vacation Document** (تُعرض في سند الإجازة دائما) — keeps a vacation type in the picker even if the employee's balance is zero, so HR can still record it (with `No Max Limit`, for example).
- **Must Be Added To Contract** (يجب إضافته إلى العقد) — the type only applies to employees whose employment contract explicitly lists it.
- **Change Employee State To** (تغيير حالة الموظف إلى) — a vacation document of this type sets the employee's working state (for example to *In Vacation*/في إجازة, or *Suspended*/موقوف) from its start date; a value on the document's Vacation Reason takes precedence over the type's. The return to *Working* is recorded by the employee's Work Starting Document. These are the same state values used by [Change Employee State](change-employee-state.md).
- **Reason Is Required** (عدم الحفظ إذا كان سبب الإجازة فارغاً) — blocks saving a vacation document of this type without a leave reason.
- **Prevent Generate Salary If Working Start Document Not Registered** (منع إصدار الراتب إذا لم يتم تسجيل سند مباشرة عمل) — a salary document is refused for an employee who has a vacation of this type whose return date is on or before the end of the salary period but which has no [Work Starting Document](../recruitment/work-starting.md) yet. Register the employee's return first, then generate the salary.
- **Do Not Show In Mobile App** (عدم الإظهار في تطبيق الموبايل) — hides this vacation type from the vacation-type list in the [mobile app](../../mobile/mobile-hr-self-service.md), so employees cannot request it from their phones; HR can still record it on the desktop screens.

This module requires the `humanresource-payroll` license component.

## Vacation Balance Range File: scaling entitlement by seniority

A flat `Default Vacation Days` number is fine when every employee gets the same annual leave regardless of tenure — but many labor laws (and many company policies) grant *more* days the longer someone has worked. The **Vacation Balance Range File** (ملف أرصدة الإجازات (بناءً على الخبرات), found under Human Resources > Main > Vacation Balance Range File) exists exactly for that: a small table of service-length brackets, each with its own day entitlement.

| Field | Arabic | Meaning |
|---|---|---|
| Greater Than Or Equal (Days) | أكبر من أو يساوي (أيام) | The lower bound of the service-length bracket. |
| Less Than (Days) | أقل من (أيام) | The upper bound of the bracket. |
| Default Vacation Days | أيام الإجازة الافتراضية | The entitlement that applies inside this bracket. |

For example, one range file might read: 0 up to 1,825 days of service (5 years) → 21 days; 1,825 up to 3,650 days (10 years) → 30 days; 3,650 days and beyond → 36 days. Attach this file to a Vacation Type's **Vacation Balance Range File** field and the flat `Default Vacation Days` on the type is overridden — every employee's entitlement is looked up from their own service length instead.

## Opening Vacation Balance Document: setting the starting point

When a company first switches to Nama, or when an employee joins with leave days already carried over from elsewhere, someone has to enter that number *somewhere* — otherwise Nama would assume every balance starts at zero. That is exactly what the **Opening Vacation Balance Document** (سند إدخال رصيد إجازة افتتاحية) is for.

**Where to find it:** Payroll > Vacations > Opening Vacation Balance Document.

| Field | Arabic | Meaning |
|---|---|---|
| Period / Value Date | الفترة / التاريخ الفعلي | The HR period and date this opening balance is booked as of. |
| Details — Employee | الموظف | Which employee this line sets a balance for. |
| Details — Vacation Type | نوع الإجازة | Which vacation type's balance this line sets. |
| Details — From Date | من تاريخ | The date the balance is considered to run from (relevant to accrual policies). |
| Details — Current Balance | الرصيد الحالي | The opening number of days credited to the employee for this vacation type. |

One document can carry many lines — one per employee/vacation-type combination — so a single opening-balance run can seed an entire company at go-live.

![Opening vacation balance document](../../../ar/modules/hr/images/vacations/opening-vacation-balance-en.png)

::: info No accounting or GL effect
Unlike most Nama documents, an Opening Vacation Balance Document does not generate a business request or touch the ledger. It simply establishes the number that every later vacation document, request, and balance inquiry will be calculated against.
:::

## Actions on this screen

None of the three screens on this page — **Vacation Type**, **Vacation Balance Range File** and **Opening Vacation Balance Document** — has buttons of its own; they are filled in and saved.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Cannot enable both Deducted From Service Period and Deducted From Working Days When Calc Balance at the same time* — «لا يمكن تفعيل تخصم من مدة العمل و تخصم مدتها من أيام العمل عند احتساب رصيد الإجازات في نفس الوقت» | Both flags are ticked on the vacation type; the leave cannot be taken out of the service period *and* out of the working days used to accrue balance. | Keep the one your policy means: deduct from the service period (affects gratuity), or from the working days used when balance is calculated. |
| *Vacation type {0} can not affect vacation type {1} because vacation type {1} affects vacation type {2}* — «نوع الإجازة {0} لا يمكن أن يؤثر في رصيد الإجازة {1} حيث أن رصيد الإجازة {1} يؤثر في رصيد الإجازة {2}» | The **Affected Vacation Type** chain would be two levels deep: the type you picked already affects a third type, and balance effects are only followed one step. | Point this type directly at the type whose balance should really be reduced, and leave the chain one level deep. |
| *Vacation type {0} can not affect itself, please select a different vacation type or leave the field empty* — «نوع الإجازة {0} لا يمكن أن يؤثر في نفسه، من فضلك قم باختيار نوع إجازة آخر أو اترك الحقل فارغا» | **Affected Vacation Type** points at the type being edited. | Clear the field, or choose the other type whose balance this leave consumes. |
| *Vacation Type {0} and Vacation Type {1} are not consistent in the field Allow Over Balance* — «نوع الإجازة {0} ونوع الإجازة {1} ليسوا متطابقين في الحقل السماح بتعدي رصيد الإجازة» | A type and the type it affects disagree on **No Max Limit**, so one of them would permit a negative balance that the other forbids. | Set the same **No Max Limit** value on both types. |
| *Field ( days greater than ) {0} , must be less than field ( days less than or equal ) {1}* — «يجب أن يكون حقل ( عدد الأيام أكبر من ) {0} أقل من حقل ( عدد الأيام أقل من أو يساوي ) {1}» | On a deduction-percentage line the lower bound of the day bracket is above its upper bound, so the bracket covers nothing. | Put the smaller number in *days greater than or equal* and the larger one in *days less than or equal*. |
| *Ignore policy needs to activate the option {0} in hr configuration* — «سياسة التجاهل تحتاج لتفعيل الأوبشن {0} في إعدادات الموارد البشرية» | The type's transfer policy is **Ignored** — leftover balance is dropped at year end — while HR Configuration has **Calculate Vacation Balance Based On Start Date** on and **Allow Ignore Previous Years Balance In Gulf Vacations** off. | Enable that option in HR Configuration, or choose a **Repaid** or **Migrated** transfer policy instead. |
| *{0} must be less than {1}* — «{0} يجب أن يكون أقل من {1}» | On a period-of-vacation-request line the vacation-period bracket is inverted: the **Min Vacation Period \| Less Than** figure ({0}) is below the **Max Vacation Period \| Greater Than Or Equal** figure ({1}), which is filled. | Put the bracket's lower bound in *Greater Than Or Equal* and its upper bound in *Less Than*. |
| *You must fill only one field (period vacation request before or after , field {0} - line {1}* — «يجب ملء حقل واحد فقط (الفترة كحد أدنى قبل طلب الإجازة أو بعدها) - الحقل {0} - السطر {1}» | The same line carries both a **Minimum Period Before Vacation Request** and a **Maximum Period After Taking Vacation**; only one of the two notice rules can apply. | Keep the notice rule you enforce and clear the other column. |
| *Value of field {0} cannot be less than value of field {1}* — «قيمة الحقل {0} لا يمكن أن تكون أقل من قيمة الحقل {1}» | On the Vacation Balance Range File a bracket's **Less Than (Days)** is below its own **Greater Than Or Equal (Days)**. | Correct the bracket so it runs upwards. |
| *Value of field {0} of line number {1} must be less than or equal value of field {2} of line number {3}* — «قيمة الحقل {0} في السطر {1} يجب أن تكون أقل من أو تساوي قيمة الحقل {2} في السطر {3}» | The brackets in the range file do not meet end to end: a line's **Greater Than Or Equal** does not continue exactly where the previous line's **Less Than** stopped, leaving a gap or an overlap in service lengths. | Make each bracket start on the number the previous one ended at — 0–1,825, 1,825–3,650, and so on. |
| *Can not use this document with egypt vacations* | The Opening Vacation Balance Document only works where balances are calculated from the employee's start date; on the other accrual basis it refuses outright. This message has no Arabic string, so it stays in English on Arabic screens. | Seed the balance through the vacation-balance update route your accrual basis uses instead. |

## Where this fits

- **[Vacation Documents](vacation-documents.md)** — how vacation types and balances are actually consumed when an employee takes leave.
- **[Vacation Compensation & Transfer](vacation-compensation-and-transfer.md)** — what happens to balances under the Repaid/Migrated transfer policies.
- **[Dues Liquidation](../end-of-service/dues-liquidation.md)** — reads the `Deducted From Work Period` flag when computing the final gratuity service period.
- **[Change Employee State](change-employee-state.md)** — the same working-state values used by a vacation type's `Change Employee State To` field.
