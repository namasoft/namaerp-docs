---
description: "The document term account sides for treasury bills, investment documents (bonds and fund certificates), investment portfolios and prepaid expenses: the debit and credit pairs for face value, return, tax, premium and discount."
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---

# Investment and Prepaid Expense Document Terms

Investments and prepaid expenses have one thing in common: the value on day one is not the value
that ends up in profit and loss. A treasury bill is bought below face value and earns its return
over time; an investment document pays periodic returns and may be bought at a premium; a prepaid
rent contract is paid once and expensed month by month. Their terms therefore carry a pair of
sides for each component — face value, return, tax, premium, discount — rather than one debit and
one credit.

Almost every side on these screens is a single reference to a saved
[Accounting Side Config](/platform/shared-master-files/accounting-side-config) record. A pair creates a ledger entry
only when both its debit and its credit are filled in.

![The Effects tab of the Treasury Bill Purchase Document term](../../../ar/modules/accounting/images/document-terms/acc-term-investments-and-prepaid-en.png)

## Treasury bills

The documents are on [Treasury Bills](/modules/accounting/investments/treasury-bills).

| Document | Group on screen | Field | What it books |
|---|---|---|---|
| **Treasury Bill Purchase Document** | **Current Value Debit / Credit** | `termConfig.currentValueDebit`, `…Credit` | The bill's current value — what was paid for it. |
| | **Treasury Bill Group** | `termConfig.treasuryBillGroup` | Not a side: the group given to the treasury bill record the purchase creates, and from which its code is generated. |
| **Treasury Bill ROI Proof Document** | **ROI Debit / Credit** | `termConfig.roiDebit`, `…Credit` | The return earned for the period, after tax. |
| | **Total Taxes Debit / Credit** | `termConfig.totalTaxesDebit`, `…Credit` | The tax on that return. |
| **Treasury Bill Sales Document** | **Sales Price Debit / Credit** | `termConfig.salesPriceDebit`, `…Credit` | The selling value. |
| | **Difference Value Debit / Credit** | `termConfig.differenceValueDebit`, `…Credit` | The difference between selling value and carrying value. |
| | **ROI Debit / Credit** | `termConfig.roiDebit`, `…Credit` | The return already recognised in the proof documents. |
| | **Current Value Debit / Credit** | `termConfig.currentValueDebit`, `…Credit` | The bill's current value, taken off the books. |
| | **Total Taxes Debit / Credit** | `termConfig.totalTaxesDebit`, `…Credit` | The total taxes. |
| **Treasury Bill Close Document** | **Current Value**, **ROI**, **Total Taxes** pairs | as on the sales term | On maturity: the current value, the return recognised in the proof documents, and the taxes. |
| **Aggregate Treasury Bill Proof Document** | **Generated Treasury Bill Proof Document Book / Term** | `termConfig.generatedTreasuryBillProofDocBook`, `…Term` | Book and term of the individual proof documents the aggregate document creates. Both must be filled, or no proof documents are created. |

## Investment documents (bonds)

The **Investment Doc** documents handle bond-like investments with a face value, a periodic return
and an issue premium or discount. They are on
[Investment Documents & Fund Certificates](/modules/accounting/investments/investment-documents).

**Investment Doc Purchase Document** — an **Effect** tab with three groups, and a **Settings** tab:

| Group on screen | Field | What it books / does |
|---|---|---|
| **Name Value** | `termConfig.nameValueDebit`, `…Credit` | The face value bought. |
| **Issue Raise Value** | `termConfig.issueRaiseValueDebit`, `…Credit` | The issue premium paid above face value. |
| **Issue Discount Value** | `termConfig.issueDiscountValueDebit`, `…Credit` | The issue discount below face value. |
| **Automatically Create Investment Document** | `termConfig.automaticallyCreateInvestmentDoc` | The purchase creates the investment document record itself. Without it the user must pick an existing one. |
| **Investment Document Group** | `termConfig.investmentDocGroup` | The group given to the investment document record. |

**Investment Doc Claiming Document** — what the issuer pays at a due date:

| Group on screen | Field | What it books |
|---|---|---|
| **Total ROI Value** | `termConfig.totalROIValueDebit`, `…Credit` | The total return received. |
| **total Tax Value** | `termConfig.totalTaxValueDebit`, `…Credit` | The total tax on it. |
| **Name Value** | `termConfig.nameValueDebit`, `…Credit` | The face value — recorded only when the claim's value date is the document's maturity date. |
| **Period Tax Value** | `termConfig.periodTaxValueDebit`, `…Credit` | The tax for the period. |
| **Decreasing Value** | `termConfig.decreasingValueDebit`, `…Credit` | The decreasing value. |

**Investment Doc ROI Proof** — recognising the return for a period:

| Group on screen | Field | What it books |
|---|---|---|
| **ROI** | `termConfig.roiDebit`, `…Credit` | The return after tax. |
| **Tax** | `termConfig.taxDebit`, `…Credit` | The tax value. |
| **Issue Raise** / **Issue Discount** | `termConfig.issueRaiseDebit`/`…Credit`, `termConfig.issueDiscountDebit`/`…Credit` | The period's share of the premium or of the discount — whichever the investment document has. |
| **Decreasing Value Return** | `termConfig.decreasingValueReturnDebit`, `…Credit` | The decreasing value returned. |

**Aggregated Investment Document ROI Proof** — **Investment Document ROI Proof Book / Term**
(`termConfig.investmentDocROIProofBook`, `…Term`): the book and term of the individual proof
documents it creates.

## Investment documents (fund certificates)

The **Investment Document** documents handle fund certificates bought and sold by count at a
changing price.

| Document | Group / field | What it books |
|---|---|---|
| **Investment Document Purchase** | **Document Total Value Debit / Credit** `termConfig.documentTotalValueDebit`, `…Credit` | The total purchase value. |
| | **Price Difference Debit / Credit** `termConfig.priceDifferenceDebit`, `…Credit` | The revaluation of the certificates already held, from the change in price. |
| **Investment Document Sale** | **Document Total Value** and **Price Difference** pairs | The total sales value, and the revaluation as above. |
| | `termConfig.soldDocsPriceDifferenceDebit`, `…Credit` | The price difference on the certificates sold. |
| | `termConfig.remainingDocsPriceDifferenceDebit`, `…Credit` | The price difference on the certificates kept. |
| | **Documents Total Cost Debit / Credit** `termConfig.documentsTotalCostDebit`, `…Credit` | The cost of the certificates sold. |
| **Investment Document Price Update** | **Price Difference Debit / Credit** | The revaluation from the new price. |

On the English screen the sold- and remaining-certificate pairs show their field names
(*soldDocsPriceDifferenceDebit*…) as labels; the Arabic screen reads «مدين فرق السعر للوثائق المباعة»
and «مدين فرق السعر للوثائق المتبقية».

## Investment portfolios

The investment-portfolio documents are on [Investment Portfolios](/modules/accounting/investments/investment-portfolios).
Their terms share one **Effects** group:

| Document | Fields | What they book |
|---|---|---|
| **Investment Start**, **Investment Capital Increase**, **Investment End** | **Debit / Credit** `termConfig.mainDebit`, `termConfig.mainCredit`; **Tax1 Debit / Credit** `termConfig.tax1Debit`, `…Credit` | Each line's local total, and each line's tax. |
| **Investment Start** only | **Investment Expense - Debit / Credit** `termConfig.investmentExpenseDebit`, `…Credit` | The investment expense value on the document. |
| **Investment Profit Distribution** | `termConfig.totalDistributedAmountdebit`, `…Credit` | The total distributed profit. On the English screen these two read *Investment Expense - Debit / Credit*; the Arabic screen reads «إجمالي الارباح الموزعة - مدين / دائن». |

## Prepaid expenses

The documents are on [Prepaid Expenses](/modules/accounting/planning-and-commitments/prepaid-expenses). A prepaid-expense
contract generates the monthly **Prepaid Expense Ledger** documents that recognise the expense, and
the **Prepaid Expense Payment** documents that pay it.

**Prepaid Expense Contract** — an **Effect** tab:

| Option | Field | What it does |
|---|---|---|
| **Debit / Credit**, **Discount Debit / Credit**, **Tax Debit / Credit** | `termConfig.valueDebit`/`…Credit`, `termConfig.discountDebit1`/`…Credit1`, `termConfig.taxDebit1`/`…Credit1` | Each line's total, discount and tax. |
| **Prepaid Expense Ledger Book / Term** | `termConfig.generatedLedgerBook`, `termConfig.generatedLedgerTerm` | Book and term of the generated monthly ledger documents. Required. |
| **Prepaid Expense Payment Book / Term** | `termConfig.generatedPaymentBook`, `termConfig.generatedPaymentTerm` | Book and term of the generated payment documents. Required when the contract's **Prepaid Expense Payments** grid has lines. |
| **Use Fixed Monthly Amount** | `termConfig.useFixedMonthlyAmount` | Each month's amount is worked out from the calendar month it covers, instead of days in the period × daily cost. |
| **Repeat Installments Monthly on Contract Start Date Day** | `termConfig.repeatInstallmentsOnStartDateDay` | Months run from the contract's start day (the 15th to the 14th, say) instead of calendar months. Unless **Use Fixed Monthly Amount** is also ticked, each month gets the total divided by the number of months. |
| **Delete Related Documents With Contract Deletion** | `termConfig.deleteRelatedDocsWithContractDeletion` | Cancelling or deleting the contract deletes the ledger and payment documents it generated. |
| **Tax Plan**, **Is Editable Tax** *(Tax Effect group)* | `termConfig.taxPlan`, `termConfig.isEditableTax` | The line tax is the line's own percentage when **Is Editable Tax** is ticked and the line has one; otherwise the prepaid-expense item's tax plan, then this term's plan. |

**Prepaid Expense Ledger** and **Prepaid Expense Payment** — an **Effect** tab with the same three
pairs in **Accounts**, **Taxes** and **Discount** groups, booking each line's total, tax and discount,
and:

**Prevent Deletion of Generated Documents** `termConfig.preventGeneratedDocumentsDeletion` — the
documents can be deleted only through their contract, never by hand.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Field {0} in term can not be empty* — «الحقل {0} الموجود في التوجية لا يمكن أن يكون فارغاً» | A prepaid-expense contract's term lacks one of the generated books or terms. | Fill the ledger book and term, and — when the contract has payment lines — the payment book and term. |
| *You can not manually delete expense ledger documents.* | **Prevent Deletion of Generated Documents** is on the ledger's term. This message has no Arabic text in the product. | Delete or change the contract instead. |
| *You can not manually delete prepaid expense payment documents.* — «لا يمكن حذف مستندات سداد المصروفات المقدمة يدويًا.» | The same option, on the payment's term. | Delete or change the contract instead. |
