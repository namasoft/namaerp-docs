---
description: "The document term options for receipt and payment vouchers, orders and bank transfers: where each side's account comes from, what the voucher may carry, copying from the source document and extra effects, plus payment and receipt requests, the Electronic Receipt Voucher and cashier documents."
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---

# Receipt, Payment and Request Document Terms

Receipt and payment vouchers are the most configured documents in the accounting module, and their
term is the longest in it — well over fifty options. Most of them answer one of four questions:

1. **Where does the cash side come from?** A fixed account, a safe, a bank account, the current
   user's custody, or an employee.
2. **What may the voucher carry?** Commercial papers, payment methods, invoices, instalments.
3. **What does the voucher copy** when it is created from an invoice, a request or another voucher?
4. **What else does it record?** Taxes, payment-method fees, extra lines.

The same term class serves the **Receipt Voucher**, **Payment Voucher**, **Receipt Order**, **Payment
Order** and **Bank Transfer**; the screen hides what does not apply to each. After it, this page
covers the payment and receipt **requests**, the **Electronic Receipt Voucher**, and the **cashier**
vouchers and shifts. The documents are on [Receipt & Payment Vouchers](/modules/accounting/receipts-and-payments),
[Banks, Bank Accounts & Transfers](/modules/accounting/banks-and-bank-accounts) and
[Cashier Shifts](/modules/accounting/cashier-shifts).

![The Effect tab of a cash receipt voucher term](../../../ar/modules/accounting/images/document-terms/acc-term-vouchers-and-requests-en.png)

## The two sides of a voucher

A receipt voucher's **first side** is where the money arrives — the safe or the bank — and its
**second side** is who it came from. On a payment voucher it is the other way round. The term screen
follows that: on a receipt voucher term the first-side group is titled **Debit** and the second
**Credit**; on every other document of this family the first side is **Credit** and the second
**Debit**.

### First side

| Option | Field | What it does |
|---|---|---|
| **Account resource type** | `termConfig.sourceType` | Where the first side comes from — see the table below. |
| **Account** | `termConfig.account` | The fixed account, for **Specific**. The term cannot be saved with **Specific** and no account. |
| **Subsidiary account type**, **Account Bag Code** | `termConfig.sideSubsidAccountType`, `termConfig.sideSubsidAccBagCode` | Which of the safe's, bank account's or employee's accounts is used, when it has more than one. |
| **Safe Deposit** | `termConfig.safeDeposite` | The safe, for the **Safe Deposit** source. |
| **Bank account** | `termConfig.bankAccount` | The bank account, for the **Bank Account** source. |
| **Using Payment Method** | `termConfig.paymentMethodInRV` | **Must Use It**, **May Use It** or **Cannot Use It** — whether the voucher must, may, or must not name a payment method. Whatever the value, a payment method that belongs to a different safe or bank than the first side is refused. |
| **Payment Method** | `termConfig.paymentMethod` | A payment method the term applies to every voucher. When it is set, it replaces whatever payment method the user chose each time the voucher is saved. |
| **Prevent Insert Different Values Of Term Config…** | `termConfig.preventSaveDiffValuesOfTermConfigValues` | Locks the voucher to the term: its first-side safe, bank account or employee, and its first-side account, must be the ones the term gives. |
| **Calculate Account Based On Currency** | `termConfig.calcAccountBasedOnCurrency` | Picks the safe's or bank's account in the voucher's currency, whatever the account type. |

The **Account resource type** values:

| Value | What the voucher gets |
|---|---|
| **Specific** | The term's **Account**, filled in when the voucher's own account is empty. |
| **Bank Account** | The term's bank account and its account. The first side must be a bank account. |
| **Safe Deposit** | The term's safe, or the one the user picks. The first side must be a safe. |
| **Current User Subsidiary** | The employee linked to the user who created the voucher — the cashier's or collector's own custody account. It is set again on every save. |
| **Employee** | An employee the user picks; the account comes from that employee. |

### Second side

| Option | Field | What it does |
|---|---|---|
| **Related Subsidiary** | `termConfig.otherSideRelatedEntity` | The kind of party on the lines — Customer, Supplier, Employee, Bank Account, Owner, Broker or Contractor — used to work out line accounts. |
| **Subsidiary account type**, **Account Bag Code** | `termConfig.otherSideSubsidAccountType`, `termConfig.otherSideSubsidAccBagCode` | Which of the party's accounts the lines use. |
| **Detailed Voucher** | `termConfig.detailedVoucher` | Lets each line carry its own currency, amount and rate. |

### When the source document changes the accounts

**Account and Subsidiary Source Settings** `termConfig.accountAndSubsidiarySources` (receipt and
payment vouchers only) is a grid that overrides the second side's account type and bag code
depending on what the voucher was created from. When a voucher is created from another document, the
rows are read top to bottom and the **first** matching row wins. A row matches when:

- its **From Doc Type** `…fromDocType` is empty or equals the source document's type, and
- its **Apply When From Doc Matches Criteria** `…applyWhenFromDocMatchesCriteria` and **Apply When
  From Doc Matches Query** `…applyWhenFromDocMatchesQuery`, if filled, accept the source document.

The winning row's **Subsidiary account type** and **Account Bag Code** replace the term's, and its
**Calculate Subsidiary From Field of From Doc** `…fetchSubsidiaryFromDocField` names a field of the
source document whose value becomes the line's party. This happens when the voucher is filled from
its source, on screen; changing the grid later does not touch saved vouchers.

## What the voucher may carry

| Option | Field | What it does |
|---|---|---|
| **Commercial Paper Usage** | `termConfig.fbInRVPV` | **Must Use It**, **May Use It** or **Cannot Use It** for cheques and other papers. When papers are used, their total must equal the voucher total. Not shown on bank transfers. |
| **Allow Cancelled Financial Paper** | `termConfig.allowCancelledFinancialPaper` | Accepts papers in Cancelled status. |
| **Collected Cheques** | `termConfig.impliedCollection` | Papers skip straight to **Collected**: on a receipt voucher the received cheques, on a payment voucher the issued ones. |
| **Change Status To Portfolioed** | `termConfig.changeStatusToPortfolioed` | Receipt voucher: received papers go to **Portfolioed** instead of Received — for cheques deposited the moment they arrive. Has no effect when **Collected Cheques** is ticked. |
| **Do Not Copy Subsidiary to Commecrial Papaers Concerned Party** | `termConfig.doNotCopyConcernedParty` | New papers are not given the voucher's party as their concerned party. |
| **Allow Endorsing Received Temporary / Finally Bounced Cheques** | `termConfig.allowEndorsingReceivedTemporaryBouncedCheques`, `…FinallyBouncedCheques` | Payment voucher: lets a bounced customer cheque be endorsed to a supplier. |
| **Allow Multiple Payment Mehtods** | `termConfig.allowMultiplePaymentMethods` | Allows the payment-lines grid. Without it the grid must stay empty. |
| **Invoice Usage** | `termConfig.invoicesUsage` | Receipt voucher: whether **Invoices** or **Job Order** documents are offered when choosing what the voucher is "from". |

## Invoices, debt ages and instalments

| Option | Field | What it does |
|---|---|---|
| **Use From Doc For Debt Ages** | `termConfig.useFromDocForDebtAges` | The voucher settles the document it was created from. Cannot be combined with invoice rows on the same voucher. |
| **Do Not Use Invoices In Debt Ages** | `termConfig.doNotUseInvoicesInDebtAges` | The invoices grid does not settle debt ages. |
| **Do Not Check Invoices Total With Header Amount** | `termConfig.doNotCheckTotalInvoices` | Allows the invoices to add up to more than the voucher. |
| **Consider Lines Amount When Collecting Invoices** | `termConfig.considerLinesAmountWhenCollectInvoices` | *Collect invoices* spreads the line amounts over the invoices instead of the header amount. |
| **Fields Map For External Payment Added Lines** | `termConfig.fieldsMapForExternalPaymentAddedLines` | Which invoice fields are copied when an invoice adds itself to the voucher's invoices grid. |
| **Affect On Invoices Payment Value From Field** | `termConfig.affectOnInvoicesPaymentValueFromField` | (Effect tab) A decimal field of the voucher whose value is applied to the source invoices as paid, instead of the voucher amount. |
| **Apply effects on installments** / **Do not apply effects on installments** | `termConfig.applyEffectsOnInstallments`, `termConfig.doNotApplyEffectsOnInstallments` | Payment voucher and bank transfer: instalments are updated only when the first is ticked. Receipt voucher: instalments are updated unless the second is ticked. |
| **installment Effect** | `termConfig.installmentEffect` | Which instalment figure the voucher moves. |
| **Validate Remaining And Installments Total Equality** | `termConfig.validateInstallmentsTotal` | The instalment lines must equal the voucher total exactly. Without it they must only not exceed it. |
| **Do Not Check Total Installments With Total Amount** | `termConfig.doNotCheckTotalInstallmentsWithTotalAmount` | Switches both instalment checks off. |
| **Use Installment Lines For Debit Ages** | `termConfig.useInstallmentLinesForDebitAges` | Each instalment line settles the debt age of its document. |
| **Collection Discount Debit** / **Collection Discount Credit** *(Collection Discount group)* | `termConfig.collectionDiscountDebit`, `termConfig.collectionDiscountCredit` | Receipt and payment vouchers: book the **Collection Discount** entered on the instalment lines — one debit and one credit line for each instalment line that carries a discount. Fill both sides. |
| **Apply Effects On Parent From Doc…** | `termConfig.applyEffectsOnParentFromDoc` | When the voucher is created from a request or order, the payment lands on the invoice behind it. |
| **Update Remaining in RVPV Requests** | `termConfig.updateRemainingRVPVRequest` | Receipt and payment orders: the order's amount is added to the request's processed amount and taken off its remaining. |
| **Treat in Debt Ages Similarly To** + **Make Accounting Effect Payment Or Receipt Based On Debt Ages Treatment** | `termConfig.debtAgesTreatment`, `termConfig.makeAccountingEffectPaymentOrReceiptBasedOnDebtAgesTreatment` | Bank transfer only: whether the transfer settles debt ages as a payment or as a receipt, and — with the second option — whether its entry is turned round to match. |

## Copying from the source document

These options act when the user picks the document the voucher is "from"; they change what is filled
in on screen, not what the server checks.

| Option | Field | What it does |
|---|---|---|
| **Do Not Copy Details Of From Doc** / **Invoices** / **Installments** / **Commercial Papers** | `termConfig.doNotCopyDetailsOfFromDoc`, `termConfig.doNotCopyInvoices`, `termConfig.doNotCopyInstallments`, `termConfig.doNotCopyFinancialPapers` | Leave that grid empty. |
| **Fetch Lines / Invoices / Commercial Paper Based On Related Subsidiary** | `termConfig.fetchLinesBasedOnRelatedSubsidiary`, `termConfig.fetchInvoicesBasedOnRelatedSubsidiary`, `termConfig.fetchFinancialPaperBasedOnRelatedSubsidiary` | When copying from another voucher, bring only the rows of the voucher's related party. |
| **Do Not Copy Amount WithFrom Doc** | `termConfig.doNotCopyAmountWithFromDoc` | The source's remaining amount is not copied. |
| **Do Not Update Amount After Selecting From Doc** | `termConfig.doNotUpdateAmountWhenSelectFromDoc` | Keeps whatever amount is already on the voucher. |
| **Calculate Paid Value Instead Of Remaining Of From Doc** | `termConfig.calcPaidValueInsteadOfRemainingOfFromDoc` | Takes the source's paid amount instead of its remaining. |
| **Consider Amount When Copy Installments…** | `termConfig.considerAmountWhenCopyInstallments` | Copies instalments only up to the voucher amount. |
| **Do Not Change Amount When Selecting Salary Document In Lines** | `termConfig.doNotChangeAmountWhenSelectingSalaryDocumentInLines` | Payment voucher: choosing a salary document on a line leaves the line amount alone. |
| **Copy Lines Accounts From Subsidiaries With Term Config** | `termConfig.copyLinesAccountsFromSubsidiariesWithTermConfig` | When the term is changed, line accounts are worked out again from the lines' parties. |
| **Filter First Side Account By Currency** | `termConfig.filterFirstSideAccountByCurrency` | The first-side account search shows only accounts in the voucher's currency. |
| **Use The Document Header Currency Instead Of The Account Currency In The Lines** | `termConfig.useHeaderCurrencyInsteadOfAccountCurrencyInLines` | Lines keep the header currency and rate instead of their account's. |
| **Update Details Rate With Updating Header Rate…** | `termConfig.updateDetailsRateWithHeaderRate` | Changing the header rate updates the lines in the same currency. |
| **Can not modify Sector / Branch / Department / Analysis Set** | `termConfig.detailSectorNotModifiable` … `termConfig.detailAnalysisSetNotModifiable` | Locks that dimension on the lines on screen. |

## What else the voucher records

| Option | Field | What it does |
|---|---|---|
| **Tax1 / Tax2 Debit / Credit** | `termConfig.tax1Debit` … `termConfig.tax2Credit` | Saved [side records](/platform/shared-master-files/accounting-side-config) that record line taxes as their own lines; the tax is then taken out of the line amount. |
| **Tax 1 / Tax 2 Is Deduction** | `termConfig.tax1IsDeduction`, `termConfig.tax2IsDeduction` | The tax is subtracted from the line net instead of added — withholding tax. |
| **Add Tax 1 / 2 To Total Debit / Credit** | `termConfig.addTax1ToTotalDebit` … `termConfig.addTax2ToTotalCredit` | Adds the line taxes into the voucher's total debit or total credit. |
| **Calculate Subsidiary From Parent If Needed** | `termConfig.calcSubsidiaryFromParentIfExist` | Ledger lines carry the line party's parent as subsidiary. |
| **Repeat Credit Side In Payment voucher Or Debit Side In Receipt voucher** | `termConfig.repeatCreditSideInPvOrDebitSideInRv` | The first-side entry is split into one line per voucher line, each with its own amount and narration, instead of one total. |
| **Expand Payment Method Effect** | `termConfig.expandPaymentMethodEffect` | Payment-method fees are recorded as their own lines; without it the first side is netted by the fees. |
| **Add Line With Payment Method Fees Value / Fees Tax Value For Document Header** | `termConfig.addLineWithPaymentMethodFeesValueForHeader`, `…FeesTaxValueForHeader` | (Payment Method Fees and Tax Handling group) An extra line charges the fees, or the tax on them, to the header party. |
| **Fees Value For Dimensions Source And References Only** | `termConfig.feesValForDimensionsSourceAndReferences` | (Effect tab) The dimension sources and references used for the fee lines. |
| **Create Accounting Effects** | `termConfig.createAccountingEffects` | Receipt and payment orders: without it, the order creates no ledger entry. |
| **Treated As Receipt / Payment Voucher Document With All Effects** | `termConfig.treatedAsReceiptVoucherDocWithAllEffects`, `…PaymentVoucherDocWithAllEffects` | The order behaves as a full voucher — papers, requests and ledger. |

## Payment and receipt requests

**Payment Request**, **Receipt Request** and their consolidated forms share a short term:

| Option | Field | What it does |
|---|---|---|
| **Subsidiary account type** | `termConfig.sideSubsidAccountType` | Which account of the party is used for lines brought in from an HR loan. |
| **Make Request Status Accepted With Save** | `termConfig.makeRequestStatusAcceptedWithSave` | Shown on payment requests: a new request is saved straight as **Accepted**, skipping approval. |
| **Generate Payment And Receipt Requests Automatically** | `termConfig.autoGeneratePVOrRVRequests` | Consolidated requests: each line generates (and keeps in step) a single request of its own. |
| **Automatic Generated Document Book / Term** | `termConfig.autoGeneratedDocBook`, `termConfig.autoGeneratedDocTerm` | Book and term of those generated requests. The book is required: *You must fill the book in term {0}*. |

## Electronic Receipt Voucher

The electronic receipt voucher records money that arrived by an electronic channel. Its single
**Effects** tab has a **Debit / Credit** pair (saved side records) and a **Commercial Paper
Creation** group: **Create Commercial Paper** `termConfig.createFinancialPaper` makes a paper for the
receipt in the chosen **Commercial Paper Book** `termConfig.fpBook`, on that book's bank account,
copying the fields listed in **Commercial Paper Extra Fields** `termConfig.paperExtraFields`. The
debt-age and instalment options in the same group — **Use From Doc For Debt Ages**, **Apply Effects
On Parent From Doc…**, **Do Not Check Invoices Total…**, **Use Installment Lines For Debit Ages**,
**Do Not Use Invoices In Debt Ages**, **Fields Map For External Payment Added Lines**, **Treat in Debt
Ages Similarly To**, **installment Effect**, **Do not apply effects on installments** — mean what
they mean on the receipt voucher.

## Cashier documents

The cashier documents are on [Cashier Shifts](/modules/accounting/cashier-shifts).

- **Cashier Receipt Voucher** and **Cashier Payment Voucher**: **Debit / Credit** (saved side
  records) `termConfig.debit`, `termConfig.credit`. A payment method can override one of the two —
  the side its own settings name.
- **Close Shift**: **Difference Debit / Credit** `termConfig.differenceDebit`, `…Credit` for the
  difference between the cash counted and the cash expected, and **Transferred Debit /
  Credit** `termConfig.transferredDebit`, `…Credit` for the cash handed over at the end of the shift.

## Messages you may see

Messages marked *(EN)* have no Arabic text in the product and appear in English on Arabic screens.

| Message | Why | What to do |
|---|---|---|
| *Collection discount can not be negative* — «خصم التحصيل لا يمكن أن يكون سالبًا» | An instalment line carries a negative **Collection Discount**. | Enter the discount as a positive amount, or clear it. |
| *First side subsidiary Must be bank account* — «الذمة يجب أن تكون حساب بنكي» | The term's source is **Bank Account** and the voucher's first side is something else — or the term has no bank account. | Fill **Bank account** on the term, or choose a bank account on the voucher. |
| *First side subsidiary must be safe deposit* — «الذمة يجب أن تكون خزينة» | Source **Safe Deposit**, first side is not a safe. | Choose a safe. |
| *First side subsidiary must be an employee* — «الذمة يجب ان تكون موظف» | Source **Employee** or **Current User Subsidiary**, first side is not an employee. | Choose an employee. |
| *Current user has not Employee* — «المستخدم الحالي ليس له موظف» | Source **Current User Subsidiary** and the user is not linked to an employee. | Link the user to an employee. |
| *Current user Employee has not accounts* — «موظف المستخدم الحالي ليس له حسابات» | The user's employee has no accounts. | Give the employee its accounts. |
| *Can not use payment method* — «لا يمكن إستخدام طريقة الدفع» | **Using Payment Method** is **Cannot Use It**. | Clear the payment method, or use another term. |
| *First side subsidiary {0} does not match subdiary {1} in payment method {2}* — «الذمة {0}ليس مطابقا للذمة {1} الموجودة بطريقة الدفع» | The payment method belongs to another safe or bank. | Choose the matching payment method or first side. |
| *Term Configurations For Commercial Paper Usage are not set* *(EN)* | **Commercial Paper Usage** is empty on the term. | Set it; saving the term again fills **May Use It**. |
| *Cannot use Commercial paper with this Voucher* *(EN)* | **Commercial Paper Usage** is **Cannot Use It**. | Remove the papers, or use another term. |
| *Must use commercial paper with this Voucher* — «يجب استعمال اوراق تجارية مع هذا السند» | **Must Use It** and no papers. | Add the papers. |
| *total {0} is not consistent with commercial paper total value {1}* — «الإجمالي {0} لا يساوى إجمالى قيم الأوراق التجارية {1}» | Papers and voucher total differ. | Correct the papers or the amount. |
| *Payment lines must be empty , to enable multiple payment methods you must mark option allow multiple payment methods in term* — «سطور الدفع يجب أن تكون فارغة , لتفعيل سطور طرق الدفع المتعددة يجب إختيار الأوبشن السماح بطرق الدفع المتعددة فى التوجيه» | Payment lines on a term without **Allow Multiple Payment Mehtods**. | Tick the option or clear the lines. |
| *First side subsidiary {0} mismatch with selected subsidiary in term config* — «الذمه {0} غير متطابقه مع الذمة المختارة في التوجيه» | **Prevent Insert Different Values…** is on and the first side differs from the term's. | Use the term's safe, bank or employee. |
| *First side account {0} mismatch selected account in term config* — «الجساب {0} غير متطابق مع الحساب المختار في التوجيه» | Same option; the account differs. | Use the term's account. |
| *Commercial Paper {0} is not receipted yet* — «الورقة التجارية {0} لم يتم استلامها بعد» | A payment voucher endorses a paper that is not in Received status (a bounced one, without the matching **Allow Endorsing…** option). | Tick the matching option, or choose another paper. |
| *Document total {0} is less than installments total {1}* — «اجمالي المبلغ {0} وهو اقل من اجمالي الاقساط {1}» | Instalment lines exceed the voucher. | Reduce the instalments, or tick **Do Not Check Total Installments With Total Amount**. |
| *Can not use both from doc and invoices in this document* *(EN)* | **Use From Doc For Debt Ages** with rows in the invoices grid. | Clear the invoices grid, or use another term. |
| *You must fill the book in term {0}* *(EN)* | A consolidated request generates requests and the term has no book for them. | Fill **Automatic Generated Document Book**. |
