---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---

# Journal, Closing and Other Accounting Document Terms

A journal entry's lines name their own accounts, so its term has no debit and credit sides to fill
— it is about guard rails instead: which dimensions a user may change, and what to do when the entry
does not balance. This page covers the journal family and the remaining accounting terms that do not
belong to a larger family: the exchange-rate update, the year-end closing entry, aging allocation,
the inter-company transfer, financial commitments and profit distribution.

The documents are on [Journal Entries & Adjustments](/modules/accounting/ledger-setup/journal-entries),
[Year-End Closing & Period Control](/modules/accounting/ledger-setup/year-end-and-period-control),
[Aging Allocation](/modules/accounting/money-in-and-out/aging-allocation) and
[Financial Commitments](/modules/accounting/planning-and-commitments/financial-commitments).

![The Effects tab of the Journal Entry term](../../../ar/modules/accounting/images/document-terms/acc-term-journals-and-closing-en.png)

## Journal Entry and Currency Diff Journal

Both terms have a **Settings** tab with the term's basic data and a **Details Dimensions and
Modifiability** group:

| Option | Field | What it does |
|---|---|---|
| **Can not modify Sector / Branch / Department / Analysis Set** | `termConfig.detailSectorNotModifiable`, `termConfig.detailBranchNotModifiable`, `termConfig.detailDepartmentNotModifiable`, `termConfig.detailAnalysisSetNotModifiable` | Locks that dimension on the lines on screen, so the lines keep the header's value. |
| **Add Line In The End Of The Document With Difference Between Debit And Credit On Save** | `termConfig.addLineWithDiffAtEnd` | When the entry is first calculated and its debit and credit differ by more than the system's low margin, a balancing line is added at the end for the difference, in local currency. |
| **The Mediator Account Used To Handle Difference Between Debit And Credit** | `termConfig.diffLineAccount` | The account of that balancing line. Without an account no line is added. |
| **Calculate Subsidiary From Parent If Needed** | `termConfig.calcSubsidiaryFromParentIfExist` | Ledger lines carry the line party's parent as their subsidiary. |

The balancing line is useful for entries imported or built from outside data, where a rounding
difference of a few piastres would otherwise block the save. Point it at a suspense account and
review that account's balance.

The **Journal Entry** term adds:

| Option | Field | What it does |
|---|---|---|
| **Do Not Copy Dimensions With New Lines** | `termConfig.doNotCopyDimensionsWithNewLines` | A new line starts with empty dimensions instead of the header's. |
| **Tax1 / Tax2 Debit / Credit** *(Effects tab)* | `termConfig.tax1Debit` … `termConfig.tax2Credit` | Saved [side records](/platform/shared-master-files/accounting-side-config) that record the line taxes as their own ledger lines. |
| **Add Tax 1 / 2 To Total Debit / Credit** *(Effects tab)* | `termConfig.addTax1ToTotalDebit` … `termConfig.addTax2ToTotalCredit` | Adds the line taxes into the entry's total debit or total credit. |

## Exchange Rate Update

The exchange-rate update revalues foreign-currency balances at a new rate. Its **Settings** tab has
two options:

| Option | Field | What it does |
|---|---|---|
| **Include Income Statement And Other Account Chart Class** | `termConfig.includeIncomeStatementAndOtherAccountChartClass` | Left off, only balance-sheet accounts are revalued. Ticked, income-statement and other accounts are revalued too. |
| **Ignore Generic Dimensions When Processing Exchange Rate Update** | `termConfig.ignoreGenericDimensionsWhenProcessingExchangeRateUpdate` | Balances are revalued per account without splitting them by dimension — fewer, larger lines. |

## Closing Entry

The closing entry clears the income-statement accounts at year end. Its **Effect** tab decides
whether the result is also carried into the new year:

| Option | Field | What it does |
|---|---|---|
| **Relay Profit And Loss Account To The Beginning Of Next Year** | `termConfig.postProfitAndLossAccToTheBeginningOfNextYear` | Creates a second journal entry, dated the day after the closed period, that moves the year's result into the account below. |
| **Posted Entry Book** / **Posted Entry Term** | `termConfig.postedEntryBook`, `termConfig.postedEntryTerm` | Book and term of that journal entry. |
| **Posted Profit Loss Account** | `termConfig.postedProfitLossAccount` | The account that receives the result — typically retained earnings. |
| **Settle Rounding Difference** | `termConfig.settleRoundingDiff` | Clears the fractions smaller than the main currency's smallest unit (a fil, a piastre) that years of rate conversion leave on account balances. Any imbalance left on a generated closing journal entry is booked to the account below, and a last settlement entry moves the leftover fraction of each account kept in the main currency into it, so no such account carries a sub-unit balance into the new year. |
| **Rounding Difference Account** | `termConfig.roundingDiffAccount` | The account that receives those differences. Required when **Settle Rounding Difference** is ticked. |

With the first option ticked, the term cannot be saved until all three of the others are filled. The
new year must already exist as a fiscal year, or the closing refuses with the message below.

## Aging Allocation

**Allow Multiple Selection On Both Sides** `termConfig.allowMultipleSelectionOnBothSides` — normally
an allocation matches one line on one side against several lines on the other. Ticked, several lines
may be selected on both sides at once. Without it the screen refuses: *Only one side may have several
selected lines*.

## Inter Company Transfer

An inter-company transfer creates a journal entry in each legal entity it touches. The term's
**Settings** tab has a grid with one row per legal entity — **Legal Entity**, **Book**, **Term**
(`termConfig.transferBookTermLines.legalEntity`, `….book`, `….term`) — giving the book and term of
the entry generated in that entity. Every legal entity on the transfer needs a row; a missing one
stops the transfer with *Legal entity {0} does not have a line in the term*.

## Financial Commitment and Financial Commitment Payment Document

Both terms carry only the term's basic data on a **Settings** tab; there is nothing document-specific
to set.

## Profits Distribution Doc

The profit-distribution document splits profit between the management share and the partners. Its
**Effect** tab has a pair for each:

| Group on screen | Field | What it books |
|---|---|---|
| **Profit Debit** / **Profit Credit** | `termConfig.debit2`, `termConfig.credit2` | The partner-profit lines. |
| **Management shares Debit** / **Management shares Credit** | `termConfig.feesValDebit`, `termConfig.feesValCredit` | The management-share lines. |

Each side is a full account-side block — see
[Anatomy of an Account Side](/modules/supplychain/document-terms/doc-term-accounting-effects#Anatomy-of-an-Account-Side).

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *There is no fiscal year defined for posted profit date {0}, legal entity {1}* — «لا توجد سنة مالية معرفة للتاريخ الفعلي {0} لسند القيد، والشركة {1}» | The closing term carries the result into the next year, and that year is not defined. | Define the next fiscal year for the legal entity, then close again. |
| *The term {0} settles rounding differences, so its rounding difference account is required* — «التوجيه {0} يقوم بتسوية فروق التقريب، لذا يجب تحديد حساب فروق التقريب فيه» | A closing entry was saved on a term that has **Settle Rounding Difference** ticked and no **Rounding Difference Account**. | Fill the account on the term, or untick the option, then save the closing entry again. |
| *Only one side may have several selected lines* — «لا يمكن اختيار أكثر من حركة في الجانبين معاً» | Several lines are selected on both sides of an aging allocation. | Select one line on one side, or use a term with **Allow Multiple Selection On Both Sides**. |
| *Legal entity {0} does not have a line in the term* | An inter-company transfer touches a legal entity that has no row in its term. This message has no Arabic text in the product. | Add the legal entity's row with its book and term. |
