---
description: "Setting up medical insurance: insurance companies and their classes, and the Insurance Company Approval that sets an admission's agreed prices, the patient/insurer split and the insurer's maximum — with how the split, taxes and the cap are calculated on every invoice line."
entities: [InsuranceCompanyApproval, HMSInsuranceCompany, HMSInsuranceClass, HMSInsuranceCompanyClass]
menu: Hospital Management System → Master Files → Insurance Company Approval
---
# Medical Insurance & Approvals

Insurance is what makes hospital billing different: the patient rarely pays the whole bill. So before we price any service, we define the insurance companies we deal with, how we classify them, and most importantly the **insurance approval** that tells the system what the insurer agreed to pay for a given patient's stay and how each charge splits between patient and company.

These files have no buttons of their own.

| Screen | Menu | Its own buttons |
|---|---|---|
| **Insurance Company Approval** | Hospital Management System → Master Files → Insurance Company Approval | None |
| **Medical Insurance Company** | Hospital Management System → Master Files → Medical Insurance Company | None |
| **Insurance Classification** | Hospital Management System → Master Files → Insurance Classification | None |
| **Medical Insurance Company Class** | Hospital Management System → Master Files → Medical Insurance Company Class | None |

## Insurance companies and their classes

A **Medical Insurance Company** is the payer we bill for the covered portion of patients' invoices. It is a full accounting party — with a ledger account where coverage liability is recorded and aged like any receivable. Its screen carries:

- **Medical Insurance Company Class** — the class the company belongs to (see below).
- **Do Not Endure From Tax1** / **Do Not Endure From Tax2** — tick these when the insurer never pays tax. The insurer's part of that tax becomes zero on every line billed to it, and the **patient pays the whole tax** instead (worked example under [Splitting a line between patient and insurer](#Splitting-a-line-between-patient-and-insurer)).
- An attachment, the accounts tab, a **Contact Info** tab and a **Tax Information** tab.

![Medical insurance company](../../ar/modules/hms/images/insurance/insurance-company-en.png)

To organize prices and coverage we use two classifiers:

- **Insurance Classification** — a coverage tier (gold, silver, VIP…). The invoice carries an **Insurance Class**, and a price, discount, cost or approval line that names a class only matches invoices of that class.
- **Medical Insurance Company Class** — a grouping of companies, so one line can apply to a whole class of insurers instead of a single one.

On every pricing grid an empty key means "any". The company class follows one stricter rule: when the invoice's insurer has **no** class (or the invoice has no insurer at all), a line that names a company class never matches it.

## The insurance approval: the source of prices and coverage

**Insurance Company Approval** records what an insurer approved **for one patient admission**. Its **Patient Admission** field is required, and every line of the approval is tied to that admission when you save — so an approval only ever prices that admission's invoices. Prices you agreed with an insurer for *all* its patients belong on a [Medical Sales Price List](./hms-pricing.md) line that names the insurer; the approval is the case-by-case layer on top.

The approval is organized into **one tab per service type** (accommodation, patient checks, attendants, laboratory tests, radiology, surgeries, physical therapy, pharmacies, medical supplies, supervision, medical services, blood banks). The same header is shown at the top of every tab — it is one set of fields, so changing it on one tab changes it everywhere.

![Insurance company approval](../../ar/modules/hms/images/insurance/insurance-approval-en.png)

### The header

| Field | What it does |
|---|---|
| **Valid from** / **Valid to** | The dates the approval covers, compared with each invoice's value date. |
| **Priority** | Breaks ties between lines that match the same service; the **smallest** number wins. |
| **Medical Insurance Company** | The approving insurer. |
| **Medical Document Category** | Limits the approval to invoices of that category. |
| **Patient Endurance Percent** / **Company Endurance Percent** | The split the insurer approved — for example 10 and 90. |
| **Patient Admission** | Required. The admission this approval belongs to. |
| **Insurance** › **Max Value** | The most the insurer will pay (see [Capping the insurer's share](#Capping-the-insurers-share)). |
| **Price Classifier 1–5** | Shown when switched on in [HMS settings](./hms-configuration.md#Classifiers-Configurations----the-five-price-classifiers). |

Saving the approval stamps the header onto every line of every tab: the patient admission always; the two endurance percents always (so a line can never carry a split of its own); the max value, priority, valid from and valid to, insurer and document category whenever they are filled on the header.

### The grids

Each tab has a grid of the services the approval covers, keyed like the price lists: the room and room classification for accommodation and attendants; the medical specialty, doctor and degree for patient checks; doctor, degree and test type for laboratory tests; doctor, degree and radiology type; doctor, degree and surgery type for surgeries, with the standard hours, additional-hour price and the five fee components; the item for pharmacies, supplies and blood banks; doctor, degree and room for supervision; specialty, service, doctor and degree for medical services. Every grid adds the **Insurance Class**, **Medical Insurance Company Class**, **Patient Classification**, valid from/to, **Price** and **Priority** columns, and the pharmacy, supplies, supervision and blood-bank grids also have a **Patient** column.

A line may name a **doctor** or a **degree**, not both: saving a line with both is refused with *You must fill only doctor or doctor degree field, at line {0}*. A line that names the degree applies to every doctor of that degree.

## How an approval is applied to an invoice

When a service is priced, the system first finds the best line on the medical sales price lists, the discounts and the cost lists (the full lookup is on [Pricing, Costing & Discounts](./hms-pricing.md#How-a-price-is-found)). Then it looks for an approval line using the same keys — the service, the invoice's value date, insurer, company class, insurance class, patient classification, doctor, document category, classifiers — plus the invoice's **patient admission**. If one matches (the smallest priority wins), it **overrides the price-list values it fills**:

- its **Price** replaces the list price, but only when it is not zero;
- its endurance percents replace the list's, but only when they are not zero;
- its **Max Value** becomes the line's *Insurance Max Value From Approval*.

So an approval line with an empty price but a 90 % company share keeps the hospital's list price and only changes who pays it.

::: tip Example
The price list charges 400 for a CBC test. Ahmed's admission has an approval from his insurer with a CBC line at price 350 and endurance 10 / 90. His lab invoice is priced at **350**, split 35 for Ahmed and 315 for the insurer. A cash patient on the same day pays the list price of 400, because the approval only matches Ahmed's admission.
:::

## Splitting a line between patient and insurer

Every priced line ends up with a patient share and an insurer share. Where the percents come from, in the order that wins:

1. **The invoice header's Patient Endurance Percent / Company Endurance Percent.** When either is filled, saving the invoice copies them onto every line, overriding whatever the lists gave.
2. Otherwise the line keeps the percents it received from the approval, or from the price list's header.
3. When the line ends up with no company percent at all, the patient's percent is set to **100** — a cash patient.

When the invoice has lines, each line's two percents must add up to 100, or the save is refused with *Total of patient endurance percent and company endurance percent must equal 100*. A **Company Endurance Percent** on the invoice header also makes the invoice's **Medical Insurance Company** required.

The calculation itself, for each line:

1. **Price** = unit price × quantity.
2. **Discount 1** = price × Discount 1 %; **Discount 2** = (price − Discount 1) × Discount 2 %.
3. **Price Before Tax** = price − Discount 1 − Discount 2.
4. **Insurer's value** = price before tax × company %, then cut down to *Insurance Max Value From Approval* and to what is left of the admission's maximum (next section).
5. **Patient's value** = price before tax − insurer's value. The patient always pays the remainder, so a cap on the insurer moves the difference to the patient.
6. **Tax 1** and **Tax 2** are calculated on the price before tax. The insurer's part of each tax is the tax × company %, or zero when the insurer has *Do Not Endure From Tax1/2*; the patient pays the rest of the tax.
7. **Total Patient Due Amount** = patient's value + patient's taxes; **Total Insurance Due Amount** = insurer's value + insurer's taxes.

::: tip Worked example
A line priced 1,000.00 with Discount 1 = 10 %, Discount 2 = 5 %, endurance 20 / 80 and Tax 1 = 15 %:

| Step | Value |
|---|---|
| Discount 1 (10 % of 1,000) | 100.00 |
| Discount 2 (5 % of 900) | 45.00 |
| Price before tax | 855.00 |
| Insurer's value (80 %) | 684.00 |
| Patient's value | 171.00 |
| Tax 1 (15 % of 855) | 128.25 — insurer 102.60, patient 25.65 |
| **Total Patient Due Amount** | **196.65** |
| **Total Insurance Due Amount** | **786.60** |

If the insurer has *Do Not Endure From Tax1* ticked, its tax part becomes 0 and the patient pays the full 128.25: the patient owes 299.25 and the insurer 684.00.
:::

Note that the insurer's share of the tax always follows the company percent, even when a cap has reduced the insurer's value.

## Capping the insurer's share

The approval's **Insurance › Max Value** limits the insurer in two ways at once:

- **Per line** — no single line's insurer value may exceed it.
- **Per admission** — saving an approval sets the admission's **Insurance Endurance Max Value On All Invoices**. With several approvals for the same admission, it is the **largest** of their max values, not their sum. Deleting an approval recalculates it from the ones that remain. The field can also be typed on the admission itself, but the next approval saved or deleted for that admission resets it.

Each time an invoice of the admission is saved, the system adds up the insurer's due amounts already recorded on the admission's other invoices and compares the rest of the maximum with this invoice. If this invoice would go over, its insurer share is reduced to exactly what is left — spread over its lines in proportion to each line's insurer value — and the patient's share grows by the difference. The admission's **Remaining Of Insurance Endurance Max Value** shows what is still available. Cancelling or deleting an invoice gives its amount back to the admission.

::: tip Example — services with no tax
Mona's approval has a max value of 5,000 and a 90 % company share.

1. Her surgery invoice line is priced 8,000. 90 % would be 7,200, but the line is capped at 5,000; Mona pays 3,000. The remaining maximum drops to 0.
2. Her next lab invoice, priced 300, would give the insurer 270 — but nothing is left, so the insurer's share is 0 and Mona pays 300.
3. If the surgery invoice is cancelled, the 5,000 is available again for her other invoices the next time they are saved.
:::

An admission whose approvals carry no max value has no cap: the insurer simply pays its percent of every line.

Because the order of saving decides who consumes the maximum, re-save the admission's invoices after changing an approval's max value if you want them recalculated.

## When coverage changes after invoicing

Two tools re-apply coverage to invoices that already exist:

- On the [patient admission](./hms-patients.md#The-patient-admission), **Update Prices Data On All Invoices** copies the admission's insurer, endurance percents and doctor onto all its invoices and saves them again. It is refused once the admission has an exit document.
- **[Change Patient Price Plan](./hms-pricing.md#Changing-a-patients-price-plan)** re-prices a chosen set of one patient's invoices with a new insurer, new endurance percents and new price classifiers — and also works after discharge.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *You must fill only doctor or doctor degree field, at line {0}* — «يجب ملء حقل واحد فقط الطبيب أو الدرجة، في السطر {0}» | A line on the approval (or on a medical sales price list) names both a doctor and a degree. | Keep the doctor for a doctor-specific price, or the degree for a price that applies to every doctor of that degree. |
| *Total of patient endurance percent and company endurance percent must equal 100* — «مجموع حقلي نسبة تحمل المريض ونسبة تحمل الشركة يجب أن يساوي 100» | On a hospital invoice, a line's patient % and insurer % (or the header's, on an invoice without lines) do not add up to 100. | Correct the invoice header's endurance percents, which are copied to every line on save, or fix the approval / price list that supplied them. |
| *You can not use this action with the admission {0} because it has an exit document {1}* — «لا يمكنك استخدام هذه الأداة مع الاستمارة {0} لأن لها سند خروج {1}» | **Update Prices Data On All Invoices** was pressed on an admission that already has an exit. | Use [Change Patient Price Plan](./hms-pricing.md#Changing-a-patients-price-plan) for a discharged patient. |
