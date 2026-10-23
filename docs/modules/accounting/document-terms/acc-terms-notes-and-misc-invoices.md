---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---

# Credit/Debit Note and Miscellaneous Invoice Document Terms

Credit and debit notes adjust what a customer or supplier owes without moving goods, and the
miscellaneous invoices bill things that are not stock items — services, rent, utilities, machine
hire. Both sit between the accounting module and the invoicing world, so their terms mix two kinds
of option: account sides, and rules about how the document settles the invoices and debt ages it
touches.

The documents are on [Credit & Debit Notes](/modules/accounting/credit-and-debit-notes) and
[Misc Purchasing & Machine Rent](/modules/accounting/misc-purchasing).

![The Effect tab of a debit note term: the credit side taken from the supplier](../../../ar/modules/accounting/images/document-terms/acc-term-notes-and-misc-invoices-en.png)

## Credit Note and Debit Note

The two notes share one term layout with a **Settings** tab and an **Effect** tab.

### The Effect tab

**Debit / Credit** `termConfig.config.debit`, `termConfig.config.credit` — the note's main entry,
each a full account-side block (see
[Anatomy of an Account Side](/modules/supplychain/document-terms/doc-term-accounting-effects#Anatomy-of-an-Account-Side)).
The entry is made one line per row of the note's invoices grid, or as a single line for the header
amount when the grid is empty. When either side takes its account from the document's subsidiary,
the note's **Related Subsidiary** becomes required.

### Debt Ages group

These options decide how the note settles the party's open debts.

| Option | Field | What it does |
|---|---|---|
| **Use From Doc For Debt Ages** | `termConfig.useFromDocForDebitAges` | The note settles the document it was created from. It cannot be combined with invoice lines on the same note — see the messages below. |
| **Do Not Use Invoices In Debt Ages** | `termConfig.doNotUseInvoicesInDebtAges` | The invoices grid is kept for reference only and does not settle those invoices' debt ages. |
| **Add Taxes To Value Of Generated Debt Ages Line Whether From Header Or Lines** | `termConfig.addTaxesToDebtAgesValue` | The settled amount includes each line's share of tax 1 and tax 2. |
| **Calculate Ledger Value From Header Amount Not Lines** | `termConfig.calculateLedgerValueFromHeaderAmountNotLines` | The entry is one line for the header amount, even when the invoices grid has rows. |
| **Use Installment Lines For Debit Ages** | `termConfig.useInstallmentLinesForDebitAges` | Debt ages are settled from the note's instalment lines. |
| **installment Effect** | `termConfig.installmentEffect` | Which instalment figure the note moves (System Paid by default). |
| **Do not apply effects on installments** | `termConfig.doNotApplyEffectsOnInstallments` | The note leaves instalments' paid and remaining figures alone. |
| **Fields Map For External Payment Added Lines** | `termConfig.fieldsMapForExternalPaymentAddedLines` | When an invoice adds itself to the note's invoices grid, this map says which invoice fields are copied onto the new row. |

### Invoice Payment Options group

| Option | Field | What it does |
|---|---|---|
| **Exclude Tax 1…4 / Discount1…8 / Header Discount In Invoice Value** | `termConfig.excludeTax1InInvoiceValue` … `termConfig.excludeHeaderDiscountInInvoiceValue` | When an invoice is chosen, its **invoice value** on the note is the invoice net minus the ticked taxes and plus the ticked discounts — so a note for "the price before VAT" picks up the right figure. |
| **Add Credit/Debit Notes To Invoice Payment Dcouments** | `termConfig.addNoteToInvoicePaymentDocs` | On commit the note is registered against the source invoice as one of its payment documents, so the invoice's paid and remaining amounts include it. |
| **Calculate Value Including Tax As Invoice Payment** | `termConfig.useTotalAfterTaxesAsInvoicePayment` | The amount registered on the invoice is the note's total after taxes instead of its net. |
| **Treat in Debt Ages Similarly To** | `termConfig.debtAgesTreatment` | Payment Voucher or Receipt Voucher. A credit note normally works like a receipt and a debit note like a payment; this flips the side the note takes in debt ages. |
| **Do Not Check Invoices Total With Header Amount** | `termConfig.doNotCheckTotalInvoices` | Allows the invoices grid to add up to more than the note's amount. |
| **Calc Invoice Value when Select Invoices In Lines And Calc Amount From Percentage** | `termConfig.calcInvoiceValueFromInvoicesGrid` | Picking an invoice on a grid row fills its value before taxes and recalculates the row amount from the percentage. |
| **Calc Invoices Amount Value From Invoice Percent When Collect Invoices** | `termConfig.calcAmountValueFromInvoicePercent` | Each row's amount is the invoice value times the row percentage, and the header amount becomes the sum of the rows. |
| **Apply Effects On Parent From Doc if From Doc is Payment/Receipt Order or Request** | `termConfig.applyEffectsOnParentFromDoc` | When the note was created from a payment/receipt request or order, its effect lands on the invoice that request was raised for. |

### Taxes group and the electronic invoice

| Option | Field | What it does |
|---|---|---|
| **Tax1 Debit / Credit**, **Tax2 Debit / Credit** | `termConfig.tax1Debit` … `termConfig.tax2Credit` | Each pair is a saved [Accounting Side Config](/platform/shared-master-files/accounting-side-config) record, recording the note's header tax 1 or tax 2 value. |
| **Tax Plan** | `termConfig.taxPlan` | Fills the note's tax percentages; a tax-exempt customer or supplier gets zero. |
| **Modifiable Tax** | `termConfig.modifiableTax` | Leaves the percentages as the user typed them instead of applying the plan. |
| **Tax Item** | `termConfig.taxItem` | The item reported as the note's single line when it is sent as an electronic invoice. Without it the electronic document has no lines. |
| **Send As** | `termConfig.sendAs` | Whether the note is sent to the tax authority as an **Invoice**, a **CreditNote** or a **DebitNote**. It must be filled before the note can be sent: *Send As must be selected in the term*. |
| **E-Invoice Bank Account Field**, **E-Invoice Payment Terms Field** | `termConfig.eInvoiceBankAccountField`, `termConfig.eInvoicePaymentTermsField` | For the Egyptian electronic invoice: the document field whose value is reported as the bank account and as the payment terms. |

When the contracting module is installed, the Settings tab also shows **Cost Type**
`termConfig.costType`, which is copied onto the note (Invoice, Worker, Material, Contractor…).

## Miscellaneous Invoice, Misc Purchase Request and Misc Purchase Order

The three miscellaneous documents share one term, and it is an invoice term in everything but name:
the same main sides, tax sides, discount sides and "other side" options as a sales or purchase
invoice. Those are documented once on
[Accounting Effects Configuration](/modules/supplychain/document-terms/doc-term-accounting-effects) —
main **Debit / Credit** with **Shorten Ledger**, the **Other effects** tab (cash, tax 1-4 with their
other sides), and the **Discount Effects** tab (discounts 1-8, invoice discount, and the
**External Effects** grid).

What is particular to the miscellaneous term:

| Option | Field | What it does |
|---|---|---|
| **Is Sales Not Purchase** | `termConfig.isSalesNotPurchase` | Makes the document a sale: the entry, payments and electronic invoice run in the sales direction. Use it to bill a customer for a service with this document. |
| **Invoice Return** | `termConfig.returnInvoice` | Turns the document into a return — it runs in the opposite direction, and is sent electronically as a credit note. |
| **Expand Payment Method Effect** | `termConfig.expandPaymentMethodEffect` | Records the payment-method fees as their own lines instead of netting them. |
| **Taxable**, **Modifiable Tax**, **Tax Plan**, **Allow Editing Header Tax In Details** | `termConfig.taxable`, `termConfig.modifiableTax`, `termConfig.taxPlan`, `termConfig.allowEditingHdrTaxInDetails` | Copied onto the document: whether the tax plan applies, whether the user may change the percentages, which plan, and whether a line may carry a different tax from the header. |
| **Pay Installments In Order** | `termConfig.payInstallmentsInOrder` | Payments must settle the oldest instalment first. |
| **Allow Payment More Than Invoice Amount** | `termConfig.allowPaymentMoreThanInvoiceAmount` | Lets payments exceed the invoice, leaving a negative remaining. |
| **Link With Invoice Lines In accounting Document** | `termConfig.linkWithInvoiceLinesInAccountingDocument` | When a receipt or payment voucher pays this invoice, the invoice is added to that voucher's invoices grid and kept in step with it. |
| **Track Quantity Fields From Doc** | `termConfig.trackQuantityFieldsFromDoc` | When the document is created from an earlier miscellaneous document, the quantity it uses is written back to that document's **Consumed Quantity 1** or **Consumed Quantity 2**. |
| **Copy Remaining Quantity From Doc Considering Fields** | `termConfig.copyRemainingQtyFromDocConsideringFields` | When lines are copied from the earlier document, each comes in at its quantity less Consumed Quantity 1 or 2; fully consumed lines are left out. Together with the option above, this lets an order be invoiced in several parts. |
| **External Payment Docs That Pay Themselves** | `termConfig.externalPaymentDocsThatPayThemselves` | A grid of payment document types (with criteria and queries) that settle the invoice by themselves when it is saved. |
| **E-Invoice Bank Account Field**, **E-Invoice Payment Terms Field** | `termConfig.eInvoiceBankAccountField`, `termConfig.eInvoicePaymentTermsField` | As on the notes. |

The **Serivce Fees** group carries four service-fee pairs — **Service Fees 1…4 Debit / Credit**
(`termConfig.serviceFees1Debit` … `termConfig.serviceFees4Credit`) — and the deduction switches
**Service Fees 2…4 Deduction**, which subtract that fee from the invoice instead of adding it.

## Machine Rent Invoice

The machine rent term is the miscellaneous term without the request/order extras: main **Debit /
Credit** with **Shorten Ledger**, the **Other effects** and **Discount Effects** tabs, and **Is Sales
Not Purchase**, **Expand Payment Method Effect**, the four tax options, **Pay Installments In
Order**, **Allow Payment More Than Invoice Amount** and **Link With Invoice Lines In accounting
Document**, all with the same meaning as above. It has no service fees, no return switch and no
quantity tracking.

## Messages you may see

These messages have no Arabic text in the product and appear in English on Arabic screens, except
the last one.

| Message | Why | What to do |
|---|---|---|
| *Can not use both from doc and invoices in this document* | The term has **Use From Doc For Debt Ages** and the note also has rows in its invoices grid that settle debt ages. | Either clear the invoices grid, or use a term without the option (or with **Do Not Use Invoices In Debt Ages**). |
| *Total of invoices can not exceed amount {0}* | The invoices grid adds up to more than the note. | Reduce the rows, or use a term with **Do Not Check Invoices Total With Header Amount**. |
| *Send As must be selected in the term* — «يجب اختيار إرسال كـ في التوجيه» | The note is being sent to the tax authority and its term has no **Send As**. | Fill **Send As** on the term. |
