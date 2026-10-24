---
description: "The document term account sides for letter of guarantee issue, opening, changing and closing documents, and for letters of credit: which account is debited and credited for the value, cash cover, fees, tax and facility usage."
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---

# Letter of Guarantee and Letter of Credit Document Terms

A letter of guarantee moves several different amounts at once: the face value the bank commits to,
the cash cover the bank holds back from your account, the fees it charges, and the share of your
credit facility the letter uses up. Each of those amounts has its own pair of account sides on the
term, so the term screen for these documents is long — but every pair answers the same question:
*for this amount, which account is debited and which is credited?*

This page goes through the terms of the guarantee documents — issue, opening balance, changing and
closing — and then the letter-of-credit terms that copy their shape. The documents themselves are on
[Letters of Guarantee](/modules/accounting/bank-facilities/letters-of-guarantee) and
[Letters of Credit](/modules/accounting/bank-facilities/bank-letters-of-credit).

::: info Two kinds of side on these screens
Some pairs are a full **account-side block** — side configuration, account source, subsidiary type,
narrations, dimension sources — described once in
[Anatomy of an Account Side](/modules/supplychain/document-terms/doc-term-accounting-effects#Anatomy-of-an-Account-Side).
Others are a **single reference field** that points at an
[Accounting Side Config](/platform/shared-master-files/accounting-side-config) record. Below, a pair
marked *(record)* is the second kind: you pick a saved side record rather than filling a block.
A pair creates a ledger entry only when **both** its debit and its credit are filled in.
:::

![The Effects tab of the LG Issue term](../../../ar/modules/accounting/images/document-terms/acc-term-guarantees-and-credits-en.png)

## LG Issue

The issue document is where the letter's money first moves. Its term has one **Effects** tab and one
**Tax Effect** tab.

| Group on screen | Field | What it books |
|---|---|---|
| **LGT Amount Debit / Credit** *(record)* | `termConfig.lgtAmountDebit`, `termConfig.lgtAmountCredit` | The letter's face value — taken from the letter of guarantee record itself, not from the issue document. This is the memo pair most customers point at off-balance-sheet commitment accounts. |
| **Debit / Credit Facilities Amount** *(record)* | `termConfig.facilitiesDebit`, `termConfig.facilitiesCredit` | The facilities amount on the document — the share of the bank facility the letter consumes. |
| Covering debit / credit | `termConfig.coveringDebit`, `termConfig.coveringCredit` | The **covered amount**: the cash the bank sets aside as margin against the letter. |
| **Fess Debit / Fees Credit** | `termConfig.feesDebit`, `termConfig.feesCredit` | The **fees value** on the document. |
| **Issue Feeses Debit / Credit** | `termConfig.collectDebit1`, `termConfig.collectCredit1` | The **issue fees** on the document. |
| **Guarantee Type** | `termConfig.guaranteeType` | Not a side — see below. |

::: tip The covering groups' English title
On the English screen the two covering groups of the issue, opening and closing terms read *Old
Covering Debit* and *Old Covering Credit*; the Arabic screen reads «مدين التغطية» / «دائن التغطية».
On these documents they hold the current cover — there is no "old" cover on an issue.
:::

**Guarantee Type** `termConfig.guaranteeType` ties the term to one kind of letter (bid bond,
performance bond, advance payment…). When both the term and the document carry a type and the two
differ, the document refuses to save with:

*Guarantee Type in the Term and the Document must be the same*

So one term per guarantee type is the usual setup: the bid-bond term can record entries on bid-bond accounts
without anybody remembering to choose them.

**The Tax Effect tab** carries the tax on the bank's fees.

| Option | Field | What it does |
|---|---|---|
| **Tax fees Debit 1 / Credit 1** *(record)* | `termConfig.feesTax1Debit`, `termConfig.feesTax1Credit` | Books the document's tax 1 value. |
| **Tax fees Debit 2 / Credit 2** *(record)* | `termConfig.feesTax2Debit`, `termConfig.feesTax2Credit` | Books the document's tax 2 value. |
| **Tax Plan** | `termConfig.taxPlan` | The tax plan that fills the document's tax percentages for its legal entity and date. With no plan the percentages are set to zero. |
| **Is Editable Tax** | `termConfig.isEditableTax` | Left off, the percentages are reset from the tax plan every time the document is saved. Ticked, the user's own percentages are kept. |

## LG Opening Document

The opening document loads letters that already existed before the company started on Nama, one
line per letter, and each line can be a different guarantee type. So the term does not hold one
set of sides — it holds a grid.

**LGT Open Lines** `termConfig.lgtopenLines` has one row per guarantee type, each with its own
covering, fees and LG-value sides (`…guaranteeType`, `…coveringDebit`/`…coveringCredit`,
`…feesDebit`/`…feesCredit`, `…lgtValueDebit`/`…lgtValueCredit`). For each line of the document the
system finds the row whose guarantee type matches the line and records:

- the line's **covered amount** on the row's covering sides,
- the line's **fees value** on the row's fees sides,
- the line's **LG value** on the row's LG-value sides.

Any side the matching row leaves empty falls back to the header groups above the grid: the covering
groups (`termConfig.coveringDebit`/`…Credit`), **Fees Debit / Old Fees Credit**
(`termConfig.feesDebit`/`…Credit`) and the two **lGT Value** groups
(`termConfig.loanValDebit`/`…Credit`). A sensible setup puts the common accounts in the header and
uses the grid only for the types that differ.

## LG Changing

A change replaces the letter's cover and fees with new values, so the term needs a pair for the old
amount and a pair for the new one.

| Group on screen | Field | What it books |
|---|---|---|
| **LGT Amount Debit / Credit** *(record)* | `termConfig.lgtAmountDebit`, `…Credit` | The letter's face value from the letter record. |
| **Debit / Credit Facilities Amount** *(record)* | `termConfig.facilitiesDebit`, `…Credit` | The facilities amount. |
| **New Covering Debit / Credit** | `termConfig.coveringDebit`, `…Credit` | The **new** covered amount. |
| **Old Covering Debit / Credit** | `termConfig.interestValDebit`, `…Credit` | The **old** covered amount. |
| **New Fees Debit / Credit** | `termConfig.feesDebit`, `…Credit` | The **new** fees value. |
| **Fees Debit / Old Fees Credit** | `termConfig.issuedDebit`, `…Credit` | The **old** fees value. |
| **Change Fees Debit / Credit** | `termConfig.loanValDebit`, `…Credit` | The **change fees** the bank charges for the amendment. |
| **Guarantee Type** | `termConfig.guaranteeType` | The same type check as on the issue term, with the same message. |
| **Shorten Ledger Effect** | `termConfig.shortenLedgerEffect` | Merges ledger lines that share the same account, dimensions and narration into one. |

::: warning Old amounts are recorded in the same direction as new ones
The old-amount pairs are recorded exactly as their debit and credit are set, the same way the
new-amount pairs are. Nothing reverses them for you. To release the old cover and take the new one,
set the **Old Covering** pair with its accounts the other way round from **New Covering** — debit
the account the issue credited, and credit the account the issue debited. The same goes for the old
and new fees.
:::

The **Tax Effect** tab carries the same tax 1 and tax 2 pairs, **Tax Plan** and **Is Editable Tax**
as the issue term. On this screen the tax 1 pair sits in the first tax group and the tax 2 pair in
the second.

## LG Closing

A letter ends in one of three ways, and the closing document's **status** decides which pair of
sides records the covered amount:

| Status | Group on screen | Field |
|---|---|---|
| Finished | **Closed Debit / Credit** | `termConfig.closedDebit`, `termConfig.closedCredit` |
| Canceled | **Cancel Debit / Credit** | `termConfig.cancelDebit`, `termConfig.cancelCredit` |
| Liquidated | **Liquied Debit / Liquied credit** | `termConfig.liquidDebit`, `termConfig.liquidCredit` |

Liquidation is the case where the beneficiary called the guarantee and the bank paid out of the
cover; that is why it has its own pair, usually crediting the cover account and debiting an expense
or a claim on the customer.

The rest of the closing term:

| Group on screen | Field | What it books |
|---|---|---|
| **LGT Amount Debit / Credit** | `termConfig.lgtAmountDebit`, `…Credit` | The letter's value on the closing document — typically the reverse of the issue's face-value pair, to clear the commitment. |
| **Debit / Credit Facilities Amount** *(record)* | `termConfig.facilitiesDebit`, `…Credit` | The facilities amount released. |
| **Fees Value Debit / Credit** | `termConfig.feesDebit`, `…Credit` | The **LGT Closing Fees** on the document. |
| **Guarantee Type** | `termConfig.guaranteeType` | The same type check as the issue term. |

## Letter of credit terms

The letter-of-credit documents copy the guarantee terms almost field for field, with *Bank LC* in
place of *LGT*.

**Bank LC Opening** is laid out like the LG issue term: facilities, covering, fees (**Fess Debit /
Fees Credit**), issue fees (**Issue Feeses Debit / Credit**) and the **Tax Effect** tab with tax 1
and tax 2, **Tax Plan** and **Is Editable Tax**. The amounts come from the opening document in the
same way, and are always recorded in the legal entity's main currency.

**Bank LC Closing** is laid out like the LG closing term: **Closed**, **Cancel** and **Liquied**
pairs chosen by the document's status, **Bank LC Amount Debit / Credit**
(`termConfig.blcAmountDebit`, `…Credit`) for the credit's value, the facilities pair, and **Fees
Value Debit / Credit** for the **Bank LC Closing Fees**. Its **Guarantee Type**
`termConfig.guaranteeType` is compared with the document's LC type, and a mismatch refuses the save
with:

*Bank LC Type in the Term and the Document must be the same*

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Guarantee Type in the Term and the Document must be the same* — «لابد من تشابه نوع الضمان في المستند وتوجيه المستند» | The guarantee document and its term both carry a guarantee type, and they differ. | Choose the term made for this guarantee type, or clear the type on the term if it should serve every type. |
| *Bank LC Type in the Term and the Document must be the same* — «لابد من تشابه نوع الاعتماد في المستند وتوجيه المستند» | On a letter-of-credit closing, the term's type and the document's LC type differ. | Choose the matching term, or clear the type on the term. |
