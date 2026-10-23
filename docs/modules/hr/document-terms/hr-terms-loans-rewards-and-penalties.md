---
entities: [HRLoanDocument, AggHRLoanDocument, HRLoanPaymentDocument, HRLoanReliefDocument, AggHRLoanInstallReschedule, RewardAndPenaltieDocument, AggrRewardAndPenaltieDoc, HOPenaltyDocument]
menu: Basic → Settings → Document Term
---

# Loan, Reward and Penalty Document Terms

These documents all move money that is not salary — an advance paid out, an instalment collected, a
bonus granted, a fine deducted — so unlike the vacation family, most of them have an accounting effect, and their terms
are mostly about accounts.

The shared mechanics — what a term is, why most aggregated terms only name a book and a term, and
the three differently-named accounting switches — are on
[Salary and Dues Document Terms](/modules/hr/document-terms/hr-terms-salary-and-dues#How-HR-document-terms-work).

![The Settings tab of the Loan Document term](../../../ar/modules/hr/images/document-terms/hr-term-loans-rewards-and-penalties-en.png)

## The loan family

Four documents make up the life of a loan: the loan itself, a payment against it, a relief that
writes part of it off, and a reschedule that moves its instalments.

**The Loan Document term** carries a standard **effect configuration** block `termConfig.config` —
the same debit/credit and ledger block used across the product, with its own *No Accounting Effect*
and *Shorten Ledger* switches inside it — plus three options of its own:

| Option | Field | What it does |
|---|---|---|
| **Without Accounting Effect** | `termConfig.withoutAccountingEffect` | Suppresses the document's entry. Note that the effect block inside `config` has its own switch of the same sense; either will stop the entry, which is worth knowing when one is set and the other is not. |
| **Ignore Conditions For Loan Document** | `termConfig.ignoreConditionsForLoanDocument` | Skips the loan-type conditions — length of service, maximum amount, the employee-state list on [HR Configuration](/modules/hr/setup/hr-configuration) and the rest. This is the exception term, for the loan that management approved despite the rules. |
| **Generate Installments With Save** | `termConfig.generateInstallmentsWithSave` | The instalment schedule is built automatically when the document is saved, instead of waiting for the user to press *Generate Installments*. |

**The Loan Payment and Loan Relief terms** each carry only the effect configuration block
`termConfig.config`. Everything about how much is paid or relieved is on the documents; the term
only says where it lands.

**The aggregated loan term** names *Generated HR Loan Doc Term* and *Generated HR Loan Doc Book*
(`termConfig.generatedHRLoanDocTerm`, `…Book`) for the individual loans it creates, repeats *Ignore
Conditions For Loan Document* so a batch can bypass the checks, and adds its own **Payment Amount
Debit** and **Payment Amount Credit** (`termConfig.paymentAmountDebit`, `…Credit`) for the payout
side of the batch.

**The aggregated instalment reschedule term** is the two-field shape: *Loan Installment Reschedule
Book* and *Loan Installment Reschedule Term*.

Loans themselves are on [Loan Documents](/modules/hr/loans/hr-loan-documents) and
[Loan Adjustments](/modules/hr/loans/hr-loan-adjustments).

## The Reward and Penalty term

A reward or a penalty is an amount attached to an employee for something they did. Its term decides
which accounts it hits and, importantly, **when the employee actually feels it**.

| Option | Field | What it does |
|---|---|---|
| **Debit** / **Credit** | `termConfig.debit`, `termConfig.credit` | The two account sides. |
| **With Accounting Effect** | `termConfig.withAccountingEffect` | Ticked means the document **does** create an accounting entry — the opposite sense to the salary document's *Without Accounting Effect*. |
| **Calculate Debit And Credit From Reward And Penalty** | `termConfig.calcDebitAndCreditFromRewardAndPenalty` | The accounts come from the reward or penalty **type** rather than from the two sides above. This is how one term serves a catalogue of reward types that each go to different accounts. |
| **Reward And Penalty Issue Method** | `termConfig.issueMethod` | Either **Issued Immediately** — the amount is paid or deducted on its own, at once — or **Issued With Salary**, where it waits and appears on the next payslip. |

::: warning The issue method changes who pays and when
*Issued With Salary* is the usual choice: the bonus reaches the employee through payroll, taxed and
recorded like everything else. *Issued Immediately* pays it outside the payslip, which is what some
customers want for a spot bonus in cash — but it also means the amount will not be on the salary
document, and anybody reconciling payroll to the ledger has to know that.
:::

The **aggregated** reward and penalty term is unusual in that it does not name a generated book and
term at all. It carries a **generation configuration** block `termConfig.generationConfigurations`
— the shared block that controls how the batch produces its documents — and a *Generate Accounting
Effects* switch. Its label carries no translation, so on screen it shows its internal name.

The same term has **Allow Repeating Employee With The Same Reward / Penalty**
`termConfig.allowRepeatingEmployeeWithSameReward`. Off (the default), a batch is refused when the
same employee appears on two lines with the same reward or penalty — usually a double entry. Tick
it when one run legitimately gives an employee the same reward twice, for example two separate
overtime bonuses in one month.

Rewards and penalties are on
[Rewards and Penalties](/modules/hr/discipline/rewards-and-penalties).

## The government penalty term

The government penalty document — the fine that arrives from an authority rather than from a
manager — has the shortest term in the module: a second pair of account sides, *Debit 2*
`termConfig.debit2` and *Credit 2* `termConfig.credit2`, on top of the first pair it inherits.

This document **does** have an accounting effect, which is worth stating because its sibling the government payment
request does not. If a customer asks why a government penalty appears in the ledger and a payment
request does not, that is the reason, and it is by design.

The second pair exists for the common case where the fine is recovered from the employee as well as
recorded as a company cost: one pair books the liability to the authority, the other books the
recovery against the employee.

Government penalties are on
[Government Penalties](/modules/hr/government-relations/government-penalties).

## Related pages

- **[Salary and Dues Document Terms](/modules/hr/document-terms/hr-terms-salary-and-dues)** — the
  shared mechanics and the money documents.
- **[Loan Documents](/modules/hr/loans/hr-loan-documents)** · **[Loan Types](/modules/hr/loans/hr-loan-types)**
- **[Rewards and Penalties](/modules/hr/discipline/rewards-and-penalties)**
- **[Account Side Configuration](/platform/shared-master-files/accounting-side-config)** — how a debit or credit side
  finds its account.
