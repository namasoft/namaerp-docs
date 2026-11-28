---
description: "How bank facility limits (a shared ceiling consumed by loans, guarantees and letters of credit) and credit facilities (issued, repaid and terminated through their own documents) are set up and tracked."
entities: [CreditFacility, FacilityLimit, FacilityLimitConfig, CreditFacilitySetting, CreditFacilityIssuance, CreditFacilityPayment, CreditFacilityTermination]
menu: Banks → Credit Facilities → Credit Facility
---

# Credit Facilities & Facility Limits

Two related but distinct ideas meet on this page:

- A **facility limit** is the **ceiling** the bank grants you, shared by a number of instruments — a loan here, a letter of guarantee there, a letter of credit — each of which reserves part of the ceiling, and the system tracks the **consumed and remaining** amounts.
- A **credit facility** is a standalone instrument: a revolving-drawdown agreement with the bank with its own value, interest and fees, issued, repaid and terminated through its own documents.

::: info Required license
Credit facilities (the facility, its setting, issuance, payment and termination) are part of the `accounting-loans` license — the same license that covers [Bank Loans](./bank-loans.md) and [Fixed Deposits](./fixed-deposits.md). The **Facility Limit** and **Facility Limit Config** screens are part of the `accounting-financial-commitments-regulation` license.
:::

## Facility limit: the shared ceiling

On the **Facility Limit** screen (`Banks > Credit Facilities > Facility Limit`) the ceiling granted by a particular **bank** is defined as a grid of lines. Each line has a required **Facility Type** (Letter Of Guarantee, Bank LC, Bank Loan, Other 1, Other 2), a **Facility Limit** amount, and a description of **Main** or **Branch**: a Branch line belongs to the Main line above it, and the amounts are booked on Branch lines. The **Facility Limit Config** (`Banks > Credit Facilities > Facility Limit Config`) holds one code prefix per facility type; when the limit points to a config, every Main line is given a code made of its type's prefix and a counter.

![Facility Limit screen](../../../ar/modules/accounting/images/facilities/facility-limit-en.png)

An instrument that carries a facility limit draws down from it when its document is saved:

| Document | Effect on the limit |
|---|---|
| **Loan Issue** | Reserves the issue's loan value. |
| **LGT Issue** | Reserves the letter of guarantee's value. |
| **LGT Closing** | Releases the letter of guarantee's value. |
| **Bank LC Opening** | Reserves the LC amount. |
| **Bank LC Closing** | Releases the LC amount. |

Deleting any of these documents removes its effect. Each amount is booked on the first **Branch** line whose **Project Contract** is empty or equals the instrument's project contract and whose **Guarantee Type** is empty; the line's facility type, LC type and loan type are not compared. A Main line's consumed amount is the total of its Branch lines. After every such save the consumed and remaining columns are recalculated, and the save is refused if any line is left with a negative remaining amount. The limit's **Related Documents** tab lists every document booked on it.

An **LGT Issue** has one more check before it is saved: it takes the first line of the limit whose **Project Contract** equals the letter's (two empty values match) and refuses the save when the letter's value is above that line's **Facility Limit** (when the line's type is **Once**) or above the line's remaining amount (for **Repeated** and **Special Limits**).

## Credit facility: from setup to termination

A credit facility is a revolving-drawdown instrument, and its cycle runs like this:

1. **Credit Facility Setting** — the shared template: the bank and bank account, the credit limit (overall and per supplier), the credit period, and the rule for allocating a payment between principal and interest.
2. **Credit Facility** — the master file in its "Not Started" status.
3. **Credit Facility Issuance** — activates the facility (it creates a journal entry, and the status flips to "In Progress").
4. **Credit Facility Payment** — repaying an installment that gets split between principal and interest per the setting (it creates a journal entry).
5. **Credit Facility Termination** — terminating the facility (status "Terminated").

### The facility master file

On the **Credit Facility** screen (`Banks > Credit Facilities > Credit Facility`) the terms are defined: the linked **setting**, the **supplier**, **bank** and **bank account**, the **credit facility value**, the **interest percentage** and **expected interest value**, the **fees percentage/value**, and the **start / end date**. The file shows live tracking totals: **total calculated interest value**, **total credit facility payments**, **total interest payments**, and the **credit-facility/interest remaining after payment**.

![Credit Facility screen](../../../ar/modules/accounting/images/facilities/credit-facility-en.png)

**Facility statuses:** Not Started → In Progress → Terminated.

### The setting

The **Credit Facility Setting** gathers the rules shared by similar facilities:

- **Bank** and **bank account**, copied onto every facility that uses the setting.
- **Credit limit**, plus an optional limit per supplier in the suppliers grid. **Credit Limit Calculation Method** decides what is measured against it: **Remaining Of Opened Credit Facilities** counts the unpaid principal of the In Progress facilities; **Sum Of Remaining Of Opened Credit Facilities And Total Interest Value Till End Of Credit Facility** adds their unpaid interest, including the interest still to accrue up to each facility's end date.
- **Payment Effect On Remaining**, the rule for splitting each payment: **Full Deduction Of Payment From Credit Facility Remaining** pays principal first and puts what is left on interest; **Interest Deduction Then Credit Facility Remaining Deduction** pays the outstanding interest first and the rest on principal; **Manual** leaves both figures to you.
- **Payment Method**: **Manually Select Credit Facility** or **Pay Oldest Then Newer**.

Interest on a payment line is the facility's remaining principal × the days since the previous payment (or since the start date for the first payment) × the interest percentage ÷ (days per year × 100). Days per year comes from the **Days Number Per Year Of Interest Calculation For Credit Facility** option, default 365 — see [Accounting configuration](../support/accounting-configuration.md).

![Credit Facility Setting screen](../../../ar/modules/accounting/images/facilities/credit-facility-setting-en.png)

### Issuance, payment and termination

**Issuance** activates the instrument and creates its accounting effect (a **debit/credit** pair). Then each **payment document** splits its installment between principal and interest per the setting, recording it on the sides: **payment of credit-facility value debit/credit**, **payment of interest value debit/credit**, and **payment value debit/credit**. Finally, the **termination document** closes the facility. (Where the accounts come from is in the [Document terms](../support/accounting-document-terms.md) reference.)

## Actions on this screen

The **Credit Facility Payment** is the one screen here you should not fill in by hand — two buttons find the facilities a payment should go against:

- **Collect Credit Facilities** — you enter the **payment value** and, optionally, narrow by **setting**, **supplier**, **bank**, **bank account** and a start-date range; it then fills the payment's details with the In Progress facilities, oldest start date first, and spreads the payment across them in that order. Tick **Only Collect Facilities with (Pay By Oldest Then Newest) Method** to bring in only the facilities whose setting has the payment method **Pay Oldest Then Newer**. The payment value must be greater than zero, or the button refuses with *"Payment value should be more than zero"*.
- **Collect Credit Facilities Without Payment Value** — the same search, but it brings in the matching facilities *without* allocating an amount to each. Use it when you want to see everything outstanding for a supplier or bank and decide the split yourself.

## Reports

| Report | Answers |
|---|---|
| Details of banking facilities (SYSR-LON002) | The bank-loan installments that still have a remaining amount, month by month for a fiscal year, filtered by bank account. It does not read facility limits or credit facilities. |

## For Support

- **"What's the difference between a facility limit and a credit facility?"** — a facility limit is a ceiling shared by several instruments, while a credit facility is a standalone drawdown instrument with its own documents.
- **"Issuing a loan/letter/LC was rejected because of the limit"** — a line of the linked facility limit would be left with a negative remaining amount, or no Branch line matched; check the consumed and remaining columns and the **Related Documents** tab of the Facility Limit.
- **"The facility interest calculation looks wrong"** — check the **days per year** in [Accounting configuration](../support/accounting-configuration.md) and the allocation rule in the facility setting.
- **"Where do the payment accounts come from?"** — from the **Credit Facility Payment** term; see [Document terms](../support/accounting-document-terms.md).
- The accounting-processing mechanism is in [How documents are processed into accounting effects](../support/accounting-request-processing.md).

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Payment value should be more than zero* — «يجب أن يكون المبلغ المدفوع أكبر من صفر» | The **Collect Credit Facilities** button was pressed with the **payment value** empty, zero or negative. | Enter the amount you are paying first, or use **Collect Credit Facilities Without Payment Value** to bring the facilities in unallocated. |
| *End date must be greater than start date* — «تاريخ النهاية يجب أن يكون أكبر من تاريخ البداية» | The credit facility's **start date** is after its **end date**. (The same wording is used by several HR screens.) | Correct whichever of the two dates is wrong. |
| *Setting {0} Credit Limit {1} Is Less Than The Remaining Of Opened Credit Facilities {2}* — «الحد الائتماني {1} للإعداد {0} أقل من المتبقي من التسهيلات الائتمانية المفتوحة {2}» | Saving this facility would push the remaining value of all In Progress facilities that share the same **Credit Facility Setting** over the setting's **credit limit**. | Lower the facility value, raise the limit on the setting, or terminate a facility that is finished. |
| *Supplier {0} Credit Limit {1} Is Less Than The Remaining Of Opened Credit Facilities {2}* — «الحد الائتماني {1} للمورد {0} أقل من المتبقي من التسهيلات الائتمانية المفتوحة {2}» | The same check, but against the per-supplier limit line inside the setting rather than the setting's overall limit. | Raise that supplier's limit in the setting's suppliers grid, or reduce the facility value. |
| *Credit facility {0} is not issued yet* — «لم يتم إصدار التسهيل الائتماني {0}» | A payment (or another document) refers to a facility that has no committed **Credit Facility Issuance**. Nothing can be paid against a facility that was never activated. | Issue the facility first, then re-save the document. |
| *You can not change the bank because the current document is used in {0}* — «لا يمكن تغيير البنك لأن الملف الحالي مستخدم في {0}» | The **bank** on a **Credit Facility Setting** is being changed after committed facilities were already created from it. | Create a new setting for the new bank instead of editing the old one. |
| *Credit limit {0} for supplier {1} is less than the total remaining credit facilities {2}* — «الحد الائتماني {0} للمورد {1} أقل من إجمالي المتبقي من التسهيلات الائتمانية {2}» | A supplier limit line on the setting is being saved with a ceiling below what that supplier's existing facilities still owe. | Raise the line's credit limit, or settle/terminate facilities for that supplier first. |
| *Value date {0} can not be after credit facility {1} start date {2}* — «لا يمكن أن يكون التاريخ الفعلي {0} بعد تاريخ البداية {2} للتسهيل الائتماني {1}» | The **Credit Facility Issuance** carries a value date later than the facility's own **start date** — the facility would be active before it was issued. | Move the issuance date back to the start date or earlier, or push the facility's start date forward. |
| *Credit facility {0} was issued before in {1}* — «التسهيل الائتماني {0} تم إصداره مسبقاً في {1}» | A second issuance document is being created for a facility that already has one; a facility is issued once. | Use the existing issuance document; delete this one. |
| *Credit facility {0} is already terminated by {1}* — «تم إنشاء مستند إنهاء تسهيل {1} للتسهيل الائتماني {0}» | The facility has a committed **Credit Facility Termination**, so it accepts no further payment or termination. | If the termination was wrong, delete it first; otherwise nothing more is due on this facility. |
| *Credit facility {0} has payments in document {1}* — «التسهيل الائتماني {0} له مدفوعات في مستند {1}» | The issuance document is being edited or deleted while payment documents already exist against the facility. | Delete the payment documents named first, then change the issuance. |
| *Payment value {0} must be equal to the sum of payment of credit facility {1} and payment of interest {2}* — «المبلغ المدفوع {0} يجب أن يساوي مجموع المدفوع من التسهيل الائتماني {1} و المدفوع من الفائدة {2}» | On a payment line whose effect on the remaining is entered by hand, the line **payment value** does not equal principal plus interest. | Make the three figures agree, or let **Collect Credit Facilities** fill the line. |
| *Payment value in line {0} can not be greater than the sum of payment of credit facility and payment of interest* — «لا يمكن أن يكون المبلغ في السطر {0} أكبر من مجموع المُسدد من التسهيل الائتماني و المُسدد من الفائدة» | The line pays more than the principal and interest portions it is split into; the number in the message is the line number. | Reduce the line payment value, or raise the principal/interest split to match it. |
| *Payment of interest value {0} can not be grater than the interest remaining before payment {1}* — «لا يمكن أن تكون قيمة المدفوع من الفائدة {0} أكبر من قيمة المتبقي من الفائدة قبل الدفع {1}» | The interest portion of the line exceeds the interest still outstanding on that facility before this payment. | Cap the interest portion at the remaining interest; put the rest against principal. |
| *Total payment of the details {0} is greater than {1}* — «إجمالي المدفوع في السطور {0} أكبر من {1}» | The header **payment value** is larger than the total the detail lines actually allocate. | Either lower the header value or allocate the difference onto a facility line. |
| *Credit facility {0} has {1} remaining unpaid amount* — «متبقي من التسهيل الائتماني {0} مبلغ {1} غير مدفوع» | A **Credit Facility Termination** is being saved while the facility's unpaid principal and interest exceed the setting's **Tolerance Amount**, and **Allow Terminating Credit Facility Without Paying Interests** is not ticked on the setting. | Record the remaining payments first, or tick **Allow Terminating Credit Facility Without Paying Interests** on the setting if that is the policy. |
| *Facility limit exceeded for line with code {0}. Remaining: {1}* | A **Loan Issue**, **LGT Issue** or **Bank LC Opening** would leave that line of the linked **Facility Limit** with a negative remaining amount. The message has no Arabic text and appears in English on Arabic screens. | Raise the line's limit, release an instrument that is finished, or link the instrument to another limit. |
| *Could not find matching line for document {0} in facility limit {1}* | The linked **Facility Limit** has no Branch line with an empty guarantee type whose project contract is empty or equals the instrument's. The message has no Arabic text and appears in English on Arabic screens. | Add such a Branch line to the limit. |
| *Could not find a relevant facility limit line in the record {0}* | An **LGT Issue** whose letter carries a facility limit that has no line with the same **Project Contract** as the letter. The message has no Arabic text and appears in English on Arabic screens. | Add a line for that project contract (or a line with an empty project contract for letters without one). |
| *You have exceeded the facility limit value {0}, please review the file {1} line {2}* | An **LGT Issue** whose letter value is above the matching line's limit (type **Once**) or remaining amount (other types). The message has no Arabic text and appears in English on Arabic screens. | Raise the line's limit or lower the letter's value. |
