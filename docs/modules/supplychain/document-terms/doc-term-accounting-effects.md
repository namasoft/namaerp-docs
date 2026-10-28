---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# Accounting Effects Configuration

Supply Chain documents that carry accounting effects record them in the general ledger through configurable debit and credit **account sides**. Each account side is a small self-contained block (an *account-side config*) that defines which GL account to hit plus where the account's subsidiary (portfolio) and cost-center dimensions are sourced from. A document term adds one or more **Effect** / **Invoice Effect** pages, and the groups shown on those pages differ by document type — an invoice exposes tax, discount and service-fee sides; a stock receipt exposes only a debit/credit pair and a few toggles; a Letter-of-Credit opening exposes coverage and fees sides.

::: info Where to find it
Open the document's **Document Term** (توجيه), then the **Effect** / **Invoice Effect** (التأثير / تأثير الفاتوره) tab. All field ids below are under `DocumentTerm.termConfig.…` — the searchable prefix is `termConfig.`.
:::

![The Invoice effect tab of the Sales Invoice document term](../../../ar/modules/supplychain/images/document-terms/doc-term-accounting-effects-en.png)

## Anatomy of an Account Side

Every debit, credit, tax, discount, cash, fees, warehouse, coverage and service-fee "side" on the effect pages is the **same building block** — one account-side object. The field ids below use the main debit side (`termConfig.config.debit`) as the example prefix; every other side exposes the same sub-fields under its own prefix (e.g. `termConfig.config.credit.subsidiaryAccountType`, `termConfig.cash.accountSource.type`).

**Side Configuration** `termConfig.config.debit.sideConfig` — Points the side at an [Accounting Side Config](/platform/shared-master-files/accounting-side-config) record: the same block of settings saved once as a master file and shared by as many terms as need it.

::: warning A Side Configuration replaces the block, it does not merge with it
Once this field is filled in, every other field in the same block is ignored — the account, the subsidiary type, the narrations, the dimension sources, all of it. The fields stay on screen showing whatever was typed there before, so a side can read as though it records to one account while actually recording somewhere else entirely. Clear the Side Configuration to go back to the values typed in the block.
:::

**Account source / Account** `termConfig.config.debit.accountSource.type` + `termConfig.config.debit.accountRef` — How the GL account is resolved: either a fixed account (`accountRef`) or pulled from a source on the document. When the account comes from a referenced entity, `termConfig.config.debit.accountSource.entityType` names that entity type and `termConfig.config.debit.accountSource.fieldID` names the field on it that yields the account. `termConfig.config.debit.accountSource.accFrmBagCrrncy` resolves the account using the bag (portfolio) currency.

**Subsidiary account type** `termConfig.config.debit.subsidiaryAccountType` — The subsidiary/portfolio type (customer, supplier, etc.) used to derive the subsidiary account. `termConfig.config.debit.bagAccountId` carries the bag/portfolio account identifier.

**Narration** `termConfig.config.debit.narrationTemplate` / `termConfig.config.debit.narrationQuery` — The first narration (description) of the ledger line, either from a template or a SQL query. A second narration line is set by `termConfig.config.debit.narration2Template` / `termConfig.config.debit.narration2Query`.

**Dimension sources (sector / branch / department / analysis set)** — Each cost-center dimension can be a fixed value or sourced from a field on the document. Each composite source is shown only when its matching global config flag is enabled (`AddSectorSourceToTerms`, `AddBranchSourceToTerms`, `AddDeptSourceToTerms`, `AddAnalysisSourceToTerms`).

| Dimension | Field ID |
|---|---|
| Sector source | `termConfig.config.debit.sectorSource` |
| Branch source | `termConfig.config.debit.branchSource` |
| Department source | `termConfig.config.debit.departmentSource` |
| Analysis-set source | `termConfig.config.debit.analysisSetSource` |

**Entity dimension & reference dimensions** — A generic entity dimension and up to three generic reference dimensions, each a composite (source type + entity type + field id + fixed value). Each is shown only when its global config flag is on (`AddEntityDimSourceToTerms`, `AddRef1SourceToTerms` … `AddRef3SourceToTerms`).

| Dimension | Field ID |
|---|---|
| Entity dimension source / value | `termConfig.config.debit.entityDimensionSource` / `termConfig.config.debit.entityDimension` |
| Reference 1 source | `termConfig.config.debit.ref1Source` |
| Reference 2 source | `termConfig.config.debit.ref2Source` |
| Reference 3 source | `termConfig.config.debit.ref3Source` |

**Ignore unfound fields in refs and entity dimension** `termConfig.config.debit.ignoreUnfoundFieldsInRefsAndEntityDimension` — Don't fail processing when a referenced source field is missing. Shown when any ref/entity-dimension source is enabled.

**Currency / Rate source field** `termConfig.config.debit.currencySourceField` / `termConfig.config.debit.rateSourceField` — Source fields for the currency and rate of the ledger line; shown when `AddCurrencyAndRateSourceToTerms` is on.

::: tip
In the groups below, "account side" always means a full block with the sub-fields above. Each group note gives only its **prefix** — append any sub-field id to reach a specific setting (e.g. `termConfig.cash.subsidiaryAccountType`).
:::

## Main Debit & Credit

The two primary ledger sides of the document. For an invoice the debit is typically the receivable/inventory side and the credit the revenue/supplier side; the actual account is resolved through the account-side sub-fields above.

**Debit** `termConfig.config.debit` — The main debit account side. Applies to nearly every Supply Chain document that creates a journal entry (all invoices and orders, sales/purchase return, stock receipt/issue/transfer, order delivery/execution/finished, LC cost, cost revaluation, receipt additional cost, etc.). On a Letter-of-Credit opening this side carries the *Down Payment Debit* title; on a cost revaluation it carries the *Adjustment Side* title.

**Credit** `termConfig.config.credit` — The main credit account side, the counterpart to the debit above. On a Letter-of-Credit opening it carries the *Down Payment Credit* title; on a cost revaluation it carries the *Inventory Side* title.

::: info Expense / cost documents
JOrderExpense uses the bare `termConfig.debit` / `termConfig.credit` ids (not under `config`); ReceiptAdditionalCost uses `termConfig.config.debit` / `termConfig.config.credit`.
:::

**Shorten Ledger** `termConfig.config.shortenLedger` — Summarize the entry instead of recording one line per document line. Lines that are alike are merged into a single line, and where a debit and a credit meet in the same group only the difference survives. A ten-line invoice that debits the same customer ten times produces one customer line for the total.

Two lines are "alike" only when everything about them matches: the account, the subsidiary, the entity dimension, the four cost-centre dimensions, the three generic references, both narration lines, the currency and the rate. Anything that varies per line keeps the lines apart — a narration template that prints the item name is the usual reason an entry that was expected to collapse comes out at full length.

Applies to invoices, sales/purchase return, stock receipt/issue/transfer and sales-return request.

**Calculate Ledger Trans Date From Field** `termConfig.config.calcLedgerDateFrom` — Use the value of the named field as the ledger transaction date instead of the document date. Stock receipt / issue / transfer only.

**No Accounting Effect** `termConfig.config.noAccountingEffect` — When set, the document creates no GL entry at all. Stock receipt / issue / transfer only.

## Control Journals

A second (control/memo) journal pair recorded in parallel to the main entry, for control-journal accounting.

**Debit 2** `termConfig.debit2` — The control-journal debit account side.

**Credit 2** `termConfig.credit2` — The control-journal credit account side.

::: warning Only when control journals are enabled
The Debit 2 / Credit 2 sides are rendered only when **Use Control Journals** is enabled in the Supply Chain configuration. When it is off, these groups do not appear. They apply to invoices, sales/purchase return, stock receipt, stock issue, tender and sales-return request.
:::

## Tax Effects

Taxes are configured two ways depending on the document. Invoices use account-side groups (`cash`, `tax`=tax1, `tax2`, `htax`=tax3, `htax2`=tax4) on the *Other Effects* page; expense/cost documents (JOrderExpense, ReceiptAdditionalCost, LcExpense) use a flat *Taxes Info* group with simple debit/credit accounts.

**Tax Plan** `termConfig.taxPlan` — The tax plan/policy used to compute the document's taxes. Applies to all effect-bearing documents.

**Tax account sides (invoices)** — On invoice-style documents the cash leg and four tax legs are full account sides. Each tax leg also gets a `taxesOtherSide.taxNOtherSide` toggle for its opposite ledger side (see below).

| Side | Field ID (prefix) |
|---|---|
| Cash | `termConfig.cash` |
| Tax 1 | `termConfig.tax` |
| Tax 2 | `termConfig.tax2` |
| Tax 3 | `termConfig.htax` |
| Tax 4 | `termConfig.htax2` |

**Tax debit / credit (expense & cost documents)** — On JOrderExpense, ReceiptAdditionalCost and LcExpense the four taxes are flat debit/credit accounts rather than account-side blocks.

| Tax | Debit | Credit |
|---|---|---|
| Tax 1 | `termConfig.tax1Debit` | `termConfig.tax1Credit` |
| Tax 2 | `termConfig.tax2Debit` | `termConfig.tax2Credit` |
| Tax 3 | `termConfig.tax3Debit` | `termConfig.tax3Credit` |
| Tax 4 | `termConfig.tax4Debit` | `termConfig.tax4Credit` |

### The tax "other side"

**Tax 1..4 other side** `termConfig.taxesOtherSide.tax1OtherSide` … `termConfig.taxesOtherSide.tax4OtherSide` — Each of these fields holds an [Accounting Side Config](/platform/shared-master-files/accounting-side-config) record. It is a reference to a saved account side, not a tick box and not a block you fill in here, so redirecting a tax counter-entry always starts by creating that master record.

The field answers one question — when the tax leg is recorded, what is it recorded against? — and two rules decide the answer.

**A counter-entry exists only for a tax that is added on top of the total.** Whether a tax is included in the total is decided by the tax configuration behind the document's tax plan, not here. When the tax is included in the price, the customer's own line already carries it and no counter-entry is generated at all — whatever is in this field is then simply never used. When the tax is added on top, the counter-entry appears and this field says where it goes.

**Left empty, the counter-entry lands on the document's own main side.** On a sales invoice the tax is credited to the tax account and the counter-entry is debited to the main debit side — the customer. On a purchase invoice the directions are mirrored. So an empty field is not "no effect"; it is "put it on the customer / supplier".

Take a sales invoice with one line of 1,000 and 15% VAT that is **not** included in the total, on a term whose main debit is the customer, main credit is revenue, and Tax 1 side is the VAT-payable account:

| Ledger line | Account | Debit | Credit |
|---|---|---|---|
| Main debit | Customer | 1,000 | |
| Main credit | Revenue | | 1,000 |
| Tax 1 | VAT payable | | 150 |
| Tax 1 other side (empty → main debit) | Customer | 150 | |

With **Shorten Ledger** on, the two customer lines merge and the entry reads customer 1,150 debit, revenue 1,000 credit, VAT payable 150 credit — the ordinary three-line invoice entry everyone expects.

::: tip The same three lines arrive by two different routes
Had the tax been *included* in the total, the customer's own line would already have been 1,150 and no counter-entry would have been generated — the same three-line entry, reached without this field being involved at all. That is why a term can look misconfigured and still produce the correct entry, and why a change to the tax configuration can change an entry that nobody touched.
:::

Point the field at a record for, say, a tax-clearing account, and only that last line moves: the customer is debited 1,000 and the clearing account carries the 150.

## Discount Effects

Invoices expose eight discount **account sides** plus a header-discount side on the *Discount Effects* page, each with an "other side" toggle. Expense/cost documents expose a single flat *Discount 1* debit/credit instead.

**Discount account sides (invoices)** — The eight discount sides, each a full account-side block.

| Discount | Field ID (prefix) |
|---|---|
| Line discount | `termConfig.lineDiscount` |
| Invoice (header) discount | `termConfig.invoiceDiscount` |
| Discount 1 | `termConfig.firstDiscountAcc` |
| Discount 2 | `termConfig.secondDiscountAcc` |
| Discount 3 | `termConfig.thirdDiscountAcc` |
| Discount 4 | `termConfig.fourthDiscountAcc` |
| Discount 5 | `termConfig.fifthDiscountAcc` |
| Discount 6 | `termConfig.sixthDiscountAcc` |
| Discount 7 | `termConfig.seventhDiscountAcc` |

**Discount 1 debit / credit (expense & cost documents)** `termConfig.discount1Debit` / `termConfig.discount1Credit` — The flat discount account for the single discount group on JOrderExpense, ReceiptAdditionalCost and LcExpense.

**Discount other sides** `termConfig.taxesOtherSide.discount1OtherSide` … `termConfig.taxesOtherSide.discount8OtherSide`, and `termConfig.taxesOtherSide.headerDiscountOtherSide` — Like the tax other sides, each of these holds an [Accounting Side Config](/platform/shared-master-files/accounting-side-config) record. What it does with it is different: it does not redirect a line, it adds two.

A discount is normally recorded on one side only. On a sales invoice with a line of 1,000 and a discount of 50, revenue is credited 1,000, the discount account is debited 50, and the customer — whose line is already net of the discount — is debited 950. (If no account side is configured for the discount itself, that 50 debit falls back to the document's main credit side, which is to say the discount is netted straight off revenue.)

Fill in the discount's other side and two more lines join the entry: the named record is credited 50, and the document's own main side is debited 50. The customer now carries the full 1,000 and the discount is funded by the named account instead of quietly reducing what the customer owes.

## Approximation Discount

Cash counters rarely settle to the last piastre. An invoice of 199.97 gets 200.00 handed over, and the three piastres have to land somewhere — that somewhere is the **approximation discount** side. Whether rounding happens at all, and how large a leftover still counts as "close enough", is decided globally in [Taxes and e-Invoicing](/platform/global-config/global-config-taxes#Approximation-discount); the document term only supplies the account and one behaviour switch.

Support tickets often call this the **rounding discount**. On the term screen it is the **Approximation Discount** group on the **Invoice effect** tab.

**Approximation Discount** `termConfig.approximationDiscount` — The account side that absorbs the leftover. When the outstanding amount on a document falls within the globally configured approximation value, that leftover is recorded here instead of staying on the customer's (or supplier's) account, and the invoice closes clean. Leave it empty and no rounding happens on documents using this term, however the global settings are set.

**Consider Payments Not Affecting Remaining With Approximation Discount** `termConfig.considerDoNotAffectRemainingWithApproxDisc` — Sales-side terms only.

A payment line can be marked **Do Not Affect Remaining** (either on the line or on the payment method itself). Such a payment is recorded and reaches the ledger, but deliberately does not reduce the document's **Remaining** — that is the whole point of the flag, and it is how deferred, third-party-collected and similar payments are handled. The side effect is that the *Remaining* figure no longer reflects what the customer actually still owes.

That matters here, because rounding is decided by comparing the outstanding amount against the approximation value. Take a 200.03 invoice settled with a 200.00 payment on a method flagged *Do Not Affect Remaining*: the customer's account is square apart from three piastres, but *Remaining* still reads 200.03. Against an approximation value of 0.05 that is nowhere near "close enough", so no rounding happens and the three piastres sit on the customer's account forever.

Tick this box and those payments are taken out of the comparison first, leaving the 0.03 that is genuinely outstanding — which does fall within the approximation value, so it is recorded on the approximation discount account and the invoice closes. Leave it unticked and the term keeps behaving as before.

::: tip Interaction with voucher payments
The global **Consider Vouchers Payment With Activate Approximation Discount** rounds against the voucher-payment side of the entry. When this term option is on *and* the document actually carries payments that don't affect the remaining, rounding takes the customer/supplier route instead, because that is the side the leftover really sits on. On documents with no such payments nothing changes and the global setting applies as usual.
:::

## Service Fees

Four pairs of debit/credit account sides for separate service-fee charges on the document, plus deduction flags and a guard toggle. Applies to invoices/orders, sales return, purchase invoice, purchase return and sales-return request.

**Service-fee account sides** — Four debit/credit pairs.

| Service fee | Debit | Credit |
|---|---|---|
| Service Fees 1 | `termConfig.serviceFees1Debit` | `termConfig.serviceFees1Credit` |
| Service Fees 2 | `termConfig.serviceFees2Debit` | `termConfig.serviceFees2Credit` |
| Service Fees 3 | `termConfig.serviceFees3Debit` | `termConfig.serviceFees3Credit` |
| Service Fees 4 | `termConfig.serviceFees4Debit` | `termConfig.serviceFees4Credit` |

**Service Fees N Deduction** `termConfig.serviceFees1Deduction` … `termConfig.serviceFees4Deduction` — When set, service fee N is treated as a deduction (subtracted) rather than an added charge.

**Do Not Add Service Fees Effect Without Account Side** `termConfig.doNotAddServiceFeesEffectWithoutAccSide` — Skip the service-fee GL effect entirely when no account side is configured for it.

**Service charge item / percentage / calc type** `termConfig.serviceCharge.item` / `termConfig.serviceCharge.percentage` / `termConfig.serviceCharge.serviceItemCalcType` — Defines the service-charge item, its percentage, and how the service-item amount is calculated.

## Additional Cost & Purchase-Return Difference

Different documents add (landed) additional cost and purchase-return cost differences in different ways.

**Additional Cost Debit / Credit (stock receipt)** `termConfig.config.additionalCostDebit` / `termConfig.config.additionalCostCredit` — The account sides for the two lines a stock receipt's entry gains when a Receipt Additional Cost document spreads a charge onto it. They are not on/off switches: an empty debit falls back to the receipt's main debit side (the inventory account), and an empty credit falls back to its main credit side. Set the credit to the account the additional-cost document debits, or the two entries will not offset each other. See [Freight, Customs and Landed Cost](/modules/servicecenter/car-purchasing/car-landed-cost#Where-the-accounting-goes) for a worked example.

**Additional Cost side (transfers)** `termConfig.additionalCostConfig` — On Stock Transfer / Receipt Stock Transfer / Issue Stock Transfer, the account side used to record additional (landed) cost added to transferred stock, under the *Additional Cost* group.

**Purchase Return Difference Debit / Credit** `termConfig.config.purchaseRetDiffDebit` / `termConfig.config.purchaseRetDiffCredit` — Account sides for the purchase-return cost-difference debit and credit. Stock issue only.

**Warehouse Debit / Credit** `termConfig.warehouseDebit` / `termConfig.warehouseCredit` — A separate inventory/warehouse-side journal pair generated by the order-delivery document, distinct from its main debit/credit. Order Delivery only.

## Letter of Credit

The Letter-of-Credit opening document exposes several extra sides beyond its main debit/credit (which carry the down-payment titles).

**Down Payment Debit / Credit** `termConfig.config.debit` / `termConfig.config.credit` — On an LC opening, the main debit/credit sides carry the *Down Payment Debit* / *Down Payment Credit* titles.

**Fees Debit / Credit** `termConfig.feesDebit` / `termConfig.feesCredit` — Account sides for the LC opening commission/fees entry.

**Covered Debit / Credit** `termConfig.coveredDebit` / `termConfig.coveredCredit` — Account sides for the cash-cover (margin/coverage) portion of the letter of credit, under the *Coverage Effect* group.

**LCExpense Book / Term** `termConfig.lCExpenseBook` / `termConfig.lCExpenseTerm` — The document book and document term used when the LC opening auto-generates its expense document.

## Cost Effect Flags

Toggles on expense/cost documents (JOrderExpense, ReceiptAdditionalCost, LcExpense) that control whether the effect rolls into item cost and how strictly it validates.

**Do Not Affect On Cost** `termConfig.doNotAffectOnCost` (JOrderExpense) / `termConfig.donotAffectOnCost` (ReceiptAdditionalCost, LcExpense) — The expense/cost document does not roll into item cost. The two spellings are layout-specific; both mean the same thing.

**Editable Taxes** `termConfig.editableTaxes` — Allow editing the computed taxes on the document. JOrderExpense, ReceiptAdditionalCost, LcExpense.

**Allow Empty Subsidiary Account Type** `termConfig.allowEmptySubsidiaryAccountType` — Permit processing even when the subsidiary/portfolio account type is not set. JOrderExpense, ReceiptAdditionalCost, LcExpense.

**Allow Empty Sys Distribution Lines** `termConfig.allowEmptySysDistributionLines` — Permit saving when the system cost-distribution lines are empty. ReceiptAdditionalCost only.

**Expense Type** `termConfig.expenseType` — Classifies the job-order expense, controlling how it is recorded/distributed. JOrderExpense only.

## Payment Documents and Debt Ages

These four sit in the From Document group of invoice terms. They decide how an invoice's payment lines and payment documents reach the ledger and the debt-age analysis.

**Add Line With Total Paid Of From Doc In Payment Line** `termConfig.addLineWithTotalPaidOfFromDocInPaymentLine` — On save, when the invoice is built on another document that has already been paid (cash, vouchers or payment methods), a line is added to the invoice's payment-documents grid naming that document with its total paid. An order that took a 500 deposit thus counts the 500 on the invoice made from it. The line is removed again if the source shows nothing paid. Sales and purchase invoices.

**Link With Invoice Lines In accounting Document** `termConfig.linkWithInvoiceLinesInAccountingDocument` — When a receipt or payment voucher pays this invoice through its payment-documents grid, the invoice is added to that voucher's invoices grid and kept in step with it.

**Use Payment Docs As Debt Ages** `termConfig.usePaymentDocsAsDebtAges` — The lines of the invoice's payment-documents grid are treated as debt-age rows, so the debt-age analysis sees what each payment document settled. Sales invoice, sales replacement (and its request) and purchase invoice.

**Expand Payment Method Effect** `termConfig.expandPaymentMethodEffect` — The payment lines' entries are written in full: the payment value and the payment-method fees as separate lines, instead of netting the fees off the payment line. Sales and purchase documents.

## Which Documents Expose Which Effect Pages

The effect groups present on a document term depend on the document type:

| Document | Effect groups present |
|---|---|
| Sales/Purchase invoices & orders, proforma invoices, replacement, delivery, finished-product pricing, glass job order | Main debit/credit, shorten ledger, control journals, tax effects (cash + tax 1-4 + other sides), discount effects (8 + other sides), external effect lines, approximation discount, service fees |
| Purchase Invoice | Debit/credit, shorten ledger, control journals, tax effects, discount effects, external effect lines, service fees |
| Sales Return, Sales Return Request | Debit/credit, shorten ledger, control journals (Sales Return), tax effects, discount effects, external effect lines, approximation discount, service fees |
| Purchase Return | Debit/credit, shorten ledger, tax effects, discount effects, external effect lines, service fees |
| Tender | Debit/credit, control journals, tax effects, discount effects, external effect lines, approximation discount |
| Stock Receipt | No-accounting-effect, debit/credit, additional cost (debit/credit), shorten ledger, calc-ledger-date, control journals |
| Stock Issue | No-accounting-effect, debit/credit, purchase-return difference debit/credit, shorten ledger, calc-ledger-date, control journals |
| Stock Transfer (+ Receipt/Issue Transfer) | No-accounting-effect, debit/credit, shorten ledger, calc-ledger-date, additional-cost side |
| Order Delivery | Debit/credit + warehouse debit/credit |
| Order Execution, Order Finished, Outsource Receipt, LC Cost | Debit/credit only |
| LcExpense | Debit/credit, taxes info (tax 1-4 + tax plan), discount effects (discount 1), affect-on-cost flags |
| ReceiptAdditionalCost | Debit/credit, taxes info, discount effects, affect-on-cost flags |
| JOrderExpense | Debit/credit, taxes info, discount effects, expense type, affect-on-cost flags |
| LC Opening | Debit/credit (down payment), fees debit/credit, covered debit/credit, LCExpense book/term |
| Cost Revaluation | Debit (Adjustment Side) / credit (Inventory Side) |
| Processing Document | Debit / credit of the indirect-cost entry (`termConfig.feesDebit` / `termConfig.feesCredit`) — see [Processing Document](./doc-term-document-specific.md#Processing-Document) |
| Post Sales Offer Claim | Debit / credit, each an Accounting Side Config record (`termConfig.debit` / `termConfig.credit`) — see [Post-Sales Offer Claim](./doc-term-document-specific.md#Post-Sales-Offer-Claim) |
