---
description: "Overview of the Gulf government relations documents (residency, visas, GOSI): their shared cycle, the Transaction Type fee catalogue, the Definition Letter, and the Payment Request for government fees."
entities: [HOTransactionType, HODefinitionLetter, HOPaymentRequest]
---
# Government Relations Overview

Every company that employs expatriate staff in the Gulf runs a small back office that never stops:
residency (Iqama) permits expire, work licences have to be renewed, exit and re-entry visas are
issued, passports are handed in and out, GOSI registrations are opened and closed, and a government
fee is attached to almost every one of those steps. The person who does this — the **government
relations officer (PRO / مندوب)** — spends the day moving between the labour portal, the passport
office and the bank. Nama's **Administrative Transactions** and **Visas** menus are the ERP side of
that desk: a family of short documents that record each official transaction, track the fee that was
paid, and — for the residency renewal and the GOSI register, once the transaction actually goes
through — write the new dates and numbers back onto the employee's master record so the rest of HR
sees an up-to-date file.

::: info Gulf / KSA-specific area
The whole government-relations family models Saudi / Gulf labour-and-immigration procedures — Iqama,
Kafala sponsorship, GOSI, exit-re-entry visas. It is not used outside that context. The letters and
fee-tracking documents need the advanced HR licence (`humanresource-advanced`); the visa procedures
need the Gulf visa licence (`humanresource-gulf-visa`).
:::

## The recurring cycle

Almost every document in this area follows the same five-beat rhythm, so it is worth learning once:

1. **Pick the employee.** You open a new transaction and choose the employee it concerns.
2. **The official documents fill themselves in.** The employee's current Iqama / residency, work
   licence, passport number, GOSI and labour details are pulled from the master record and shown as
   context. You are looking at the current state of the file, not editing it here.
3. **Record the request.** You capture what is being done — the new visa number, the extension date,
   the renewal period, the fee — and save the document.
4. **Pay the fee or get the approval.** The government charge is recorded (and marked as paid), or
   the internal approval is granted.
5. **Where the transaction changes the employee, the new facts are written back.** Two families do
   this. On a Residence Renew Request, once the boxes that say it was **paid** and **renewed** are
   ticked, the **Update Employee Information** action copies the new residency and work-licence end
   dates onto the **employee master file**; it refuses to run before both boxes are ticked, and it
   will not push a date **earlier** than the one already on record, so a stale document can never
   roll an employee's Iqama backwards (see [Residence Renewal](/modules/hr/government-relations/residence-renewal)). The GOSI add
   and remove documents write the social-insurance details onto the employee when committed (see
   [Social Insurance & Sponsorship](/modules/hr/government-relations/social-insurance-and-sponsorship)). The visa procedures, the
   sponsorship transfer and the Definition Letter write nothing back.

Keep in mind throughout that **only the document has an effect** — a request that is still waiting
for approval changes nothing.

## The fee catalogue: Transaction Type

Rather than typing a government charge freehand every time, you define each kind of charge once as a
**Transaction Type** (`نوع معاملة`) — a small master file that is, in effect, a **price list for
government fees**. Each entry fixes the expected amount and the account the fee belongs to, so the
officer can only pick a known transaction and the finance team sees consistent numbers.

You will find it under **Human Resources → Administrative Transactions → Transaction Type**
(`الموارد البشرية > معاملات إداريه > نوع معاملة`).

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Arabic Name / English Name | الاسم العربي / الاسم الإنجليزي | The transaction's display name (e.g. *Iqama renewal fee*). |
| Default Price | السعر الافتراضي | Choosing this transaction type in the header of a Payment Request puts this amount on every line of its Details grid. |
| Max Price | اقصي سعر | When set, a Payment Request whose header carries this transaction type cannot be committed while any line's amount is above it. |
| Account | الحساب | The general-ledger account the fee is charged to. |
| Legal Entity / Branch / Sector / Department | الشركة / الفرع / القطاع / الإدارة | The dimensions that scope where the transaction type is used. |

![Transaction Type](../../../ar/modules/hr/images/government-relations/ho-transaction-type-en.png)

## The employment certificate: Definition Letter

The one document here that is not about a visa or a fee is the **Definition Letter**
(`خطاب تعريف موظف`) — the salary / employment certificate that HR issues on demand: the letter an
employee takes to a bank to open an account or apply for a loan, or to an embassy for a visa. It
gathers everything such a letter has to state — who the employee is, the addressee it is written to,
the residency details, the hiring date and the monthly salary — onto one printable document.

It lives under **Human Resources → Work List → Definition Letter**
(`الموارد البشرية > لائحة العمل > خطاب تعريف موظف`).

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Employee | الموظف | The employee the letter is about. |
| Addressee | الجهة المخاطبة | The party the letter is addressed to (a bank, an embassy…). |
| Letter Purpose | الغرض من الخطاب | Why the certificate is being issued. |
| Residency (Number / Issue / End) | الأقامة (رقم / تاريخ الإصدار / تاريخ الأنتهاء) | The Iqama details reproduced on the letter. |
| Hiring Date | تاريخ التعيين | The employment start date. |
| Monthly Salary (Amount / Currency) | الراتب الشهري (المبلغ / العملة) | The salary the certificate confirms. Recalculated on every save (see below). |

A Definition Letter is a **statement, not an accounting entry** — issuing one does not touch the general
ledger. Its document term lists up to seven salary component types (see
[Employment and Government Relations Document Terms](/modules/hr/document-terms/hr-terms-employment-and-government)).
On every save the letter takes the employee's most recent committed salary document (by value date) and
sets **Monthly Salary** to the sum, over the listed types, of the addition on the first line of that
document whose component is of that type. When the term lists none, or the employee has no committed salary document, Monthly
Salary is 0.

![Definition Letter](../../../ar/modules/hr/images/government-relations/ho-definition-letter-en.png)

## Recording a fee: the Payment Request

When a government charge has to be recorded, the officer raises a **Payment Request**
(`طلب سداد مدفوعات`), found under **Human Resources → Administrative Transactions → Payment
Request** (`الموارد البشرية > معاملات إداريه > طلب سداد مدفوعات`). It captures who the money went to,
who benefited from it, which catalogue transaction it was, the amount and whether it has been paid —
and it can carry several such lines at once in its **Details** grid, so a batch of small government
charges can be logged on one document.

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Receiving Party | جهة الصرف | The party the payment is disbursed to. |
| Beneficiary Side | الجهة المستفيدة | The party that benefits from the transaction (often the employee). |
| Transaction Type | نوع المعاملة | The catalogue fee being paid, drawn from the Transaction Type list above. |
| Amount (Amount / Currency) | المبلغ (المبلغ / العملة) | The fee amount and its currency. |
| Is Paid | تم السداد | Whether the fee has actually been paid. |
| Reason | السبب | A free-text explanation of the charge. |
| Details (grid) | التفاصيل | Multiple fee lines — each with its own receiving party, transaction type, amount and paid flag. |

The header **Amount** is the sum of the line amounts and is recalculated on every save. Choosing the
header **Transaction Type** fills every line's amount with that type's Default Price. When that type has
a Max Price, committing refuses any line whose amount is above it, with a message that has no Arabic
text and shows in English on both interfaces:

*Amount can not exceed max price*

![Payment Request](../../../ar/modules/hr/images/government-relations/ho-payment-request-en.png)

::: warning The payment request records a fee — it does not create a ledger entry by itself
This is the single most important accounting point in the whole area. A **Payment Request only
tracks and records** that a government fee was paid — the beneficiary, the receiving party, the
amount. It **does not, by itself, produce a general-ledger entry.** Saving it debits and credits
nothing; the accounting for the money is driven **downstream** by the actual treasury payment /
voucher that settles it. So do not read a Payment Request as the journal entry for the fee — it
is the record that the fee exists and was paid, and the ledger movement comes from elsewhere.

This is deliberately **different** from a government **penalty**: a penalty document *does* create a
real ledger entry when it is committed. If you need the accounting behaviour of fines and
disciplinary charges, see [Government Penalties](./government-penalties) — do not assume the two
behave the same way.
:::

## How it's processed

Saving one of these documents is instant. For the fee-tracking and letter documents here there is
**no ledger effect to process** — they record facts, and the fee is accounted for as the warning
above explains.

## Actions on this screen

The **Transaction Type**, the **Definition Letter** and the **HO Payment Request** have no buttons of their own; you fill them in and save.

## The rest of the toolkit

The government-relations desk is spread across several focused pages, all built on the cycle
described above:

- [HR Visas](./hr-visas) — exit / re-entry visas (single and batched), visa extensions, final-exit
  visas, family-visit visas and passport delivery.
- [Residence Renewal](./residence-renewal) — Iqama renewal with its fee breakdown, and the batch
  that harvests residencies about to expire.
- [Visa Pool](./visa-pool) — the company's stock of hiring visas: issue, delegate to a PRO, and
  spend.
- [Social Insurance & Sponsorship](./social-insurance-and-sponsorship) — GOSI register / deregister
  and Kafala sponsorship transfers.
- [Government Penalties](./government-penalties) — the violation-and-penalty disciplinary code — and
  the one document in this area that **does** create a real ledger entry.
