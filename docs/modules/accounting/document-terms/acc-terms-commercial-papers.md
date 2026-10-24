---
description: "Document term settings for the commercial paper (cheque) documents: opening papers, bank portfolio, bank notice, partial payment, cancellation, agio and FP transfer, and the accounts each one moves value between."
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---

# Commercial Paper Document Terms

A cheque moves through several hands and several accounts before it is finally cash: it is received
from a customer, deposited in a bank portfolio, collected or bounced, sometimes discounted at the
bank (agio), sometimes partly paid or cancelled. Each of those steps is its own document, and each
document's term says which accounts that step moves the paper's value between.

The paper lifecycle itself is on [Cheques & Financial Papers](/modules/accounting/banks-and-cheques/cheques-financial-papers).
Every side on these screens is a full account-side block — account source, subsidiary type,
narrations and dimension sources — described once in
[Anatomy of an Account Side](/modules/supplychain/document-terms/doc-term-accounting-effects#Anatomy-of-an-Account-Side).
A pair creates a ledger entry only when both its debit and its credit are set.

![The Endorsing Effect tab of the Openning Commercial Paper term](../../../ar/modules/accounting/images/document-terms/acc-term-commercial-papers-en.png)

## Options several paper terms share

| Option | Field | What it does |
|---|---|---|
| **Shorten Ledger Effect** | `termConfig.shortenLedgerEffect` | Merges ledger lines that share the same account, dimensions and narration, so a portfolio of fifty cheques to one bank is recorded as one line per side instead of fifty. |
| **Apply effects on installments** | `termConfig.applyEffectsOnInstallments` | When the papers pay instalments of an invoice or contract, the document also updates those instalments. |
| **installment Effect** | `termConfig.installmentEffect` | Which instalment figure the document moves: **Requested Collect**, **Collected By Commercial Paper**, **System Paid** or **None**. |
| **Reverse Installments Effect** | `termConfig.reverseInstallmentsEffect` | Records the instalment movement with the opposite sign — for documents that undo an earlier collection. |
| **Validate Remaining And Installments Total Equality** | `termConfig.validateInstallmentsTotal` | Refuses the save when the instalment lines do not add up to the document: *Total installments does not equal document total*. |

Which of these each term shows is listed with the term below.

## Openning Commercial Paper

The opening document loads papers that existed before go-live, and each line carries the paper's
current status. So the term has one tab per status, each with a **Debit** and **Credit** side, and a
line is recorded using the tab that matches its status:

| Tab | Fields | Lines with status |
|---|---|---|
| **Endorsing Effect** | `termConfig.endorsedDebit`, `termConfig.endorsedCredit` | Endorsed |
| **Issue Effect** | `termConfig.issuedDebit`, `termConfig.issuedCredit` | Issued |
| **Portfolioed Effect** | `termConfig.portfolioedDebit`, `termConfig.portfolioedCredit` | Portfolioed |
| **Postponed Portfolioed Effect** | `termConfig.postponedBankPortfolioDebit`, `…Credit` | Postponed portfolioed |
| **Receive Effect** | `termConfig.receivedDebit`, `termConfig.receivedCredit` | Received |
| **Temp Bounce Effect** | `termConfig.tempBouncedDebit`, `termConfig.tempBouncedCredit` | Temporarily bounced |
| **Agio Effect** | `termConfig.agioDebit`, `termConfig.agioCredit` | Agio |

Only the tabs for statuses you actually load need filling. A line whose status has an empty tab
refuses the save with a message naming the status, for example *Receiving Account Sides are not Set*
— see the table at the end.

## Bank Portfolio, Postponed Bank Portfolio and Postponed Portfolio Return

These three documents share one **Effect** tab.

| Option | Field | What it does |
|---|---|---|
| **Debit / Credit** | `termConfig.debit`, `termConfig.credit` | The value of each paper. Both sides are required — the term cannot be saved without them. |
| **Collected Cheques** | `termConfig.impliedCollection` | The papers go straight to **Collected** instead of the document's normal status. This is for banks that credit the account on deposit, so there is no separate collection notice to wait for. |
| **Shorten Ledger Effect** | `termConfig.shortenLedgerEffect` | As above. |

Each document then adds its own:

- **Bank Portfolio** adds **Apply effects on installments**, **installment Effect** and **Reverse
  Installments Effect**.
- **Postponed Bank Portfolio** adds **Extra Expense Debit / Credit** (`termConfig.debit2`,
  `termConfig.credit2`), which books the extra expense the bank charges on the postponed portfolio.
- **Postponed Portfolio Return** adds **Use with Bank Portfolio** `termConfig.useWithBankPortfolio`.
  Left off, the return takes papers that are in a *postponed* portfolio; ticked, it takes papers in
  an ordinary bank portfolio instead. Either way the papers come back as **Received**.

## Bank Notice

The bank notice tells you what happened to deposited papers, and each line has its own **notice
type**. The term has a tab per type, and each tab has *two* pairs — **Debit / Credit** and
**Debit 2 / Credit 2** — that are recorded side by side on the same paper value. Use the second pair only when the
same paper value must also be recorded on a second pair of accounts; leave it empty otherwise.

| Tab | Fields | Lines of type |
|---|---|---|
| **Collect Effect** | `termConfig.collectDebit1`/`…Credit1`, `termConfig.collectDebit2`/`…Credit2` | Collected |
| **Temp Bounce Effect** | `termConfig.tempBounDebit1`/`…Credit1`, `termConfig.tempBounDebit2`/`…Credit2` | Temporarily bounced |
| **Finally Bounce Effect** | `termConfig.finBounDebit1`/`…Credit1`, `termConfig.finBounDebit2`/`…Credit2` | Finally bounced |
| **Extra Expence Effect** | `termConfig.debit2`, `termConfig.credit2` | Every line — the bank's extra expense on the notice. |

The **Collect Effect** tab also holds **Shorten Ledger Effect**, **Apply effects on installments**,
**installment Effect**, **Validate Remaining And Installments Total Equality** and **Reverse
Installments Effect**. The installment total is checked against the collected lines.

A line whose type has no first pair on its tab refuses the save: *Collect Account Sides are not
Set*, *Temporary Bounced Account Sides are not Set* or *Finally Bounced Account Sides are not Set*.

## Commercial Papers Partial Payment

The **Payment Effect** tab has two parallel pairs on each line's value — **Debit / Credit**
(`termConfig.debit`, `termConfig.credit`) and **Debit 2 / Credit 2** (`termConfig.debit2`,
`termConfig.credit2`) — plus:

| Option | Field | What it does |
|---|---|---|
| **Prevent Save If Paper Status Is Finally Bounced** | `termConfig.preventSaveIfPaperStatusIsFinallyBounced` | Without it, a partial payment may be recorded against a paper that is partly paid, received, temporarily bounced or finally bounced. With it, finally bounced papers are refused — the message drops "finally bounced" from the list. |
| **Use Issued Commercial Paper Instead Of Receipt** | `termConfig.useIssuedFPInsteadOfReceipt` | Makes the document pay off the company's own issued papers instead of received ones: the paper list on the lines offers issued, partly paid and bounced papers rather than received ones. |
| **Shorten Ledger Effect**, **Apply effects on installments**, **installment Effect**, **Validate Remaining And Installments Total Equality** | | As above. |

## Commercial Paper Cancel

The **Effect** tab has a required **Debit / Credit** pair (`termConfig.debit`, `termConfig.credit`)
on the cancelled value, **Shorten Ledger Effect**, **Apply effects on installments** and
**installment Effect**, and two options that decide which papers can be cancelled:

| Option | Field | What it does |
|---|---|---|
| **Use with created cheaques only** | `termConfig.useWithCreatedCheequesOnly` | For voiding cheque leaves that were printed but never handed over. Every paper must be in **Created** status, and the document makes **no ledger entry** at all — there is nothing to reverse. |
| **Partial Cancel** | `termConfig.partialCancel` | Allows cancelling part of a paper. Papers that are collected or already partly cancelled become eligible too, and the system checks that the total cancelled does not pass the paper's value: *Commercial Paper {0} was partially cancelled by {1} and the remaining is only {2}*. Without it, only received or temporarily bounced papers can be cancelled. |

## Agio and Commercial Paper Agio Return

Agio is discounting a paper at the bank before its due date: the bank pays now and keeps a discount.
The agio and agio-return terms are identical and have two tabs.

**Paper Effect** — **Debit / Credit** (`termConfig.debit`, `termConfig.credit`) on the paper's value,
and **Shorten Ledger Effect**.

**Agio Effect**:

| Group on screen | Field | What it books |
|---|---|---|
| **Debit / Credit** | `termConfig.debit2`, `termConfig.credit2` | The agio value — the discount the bank keeps. |
| **Subtraction1 Debit / Credit** | `termConfig.feesDebit`, `termConfig.feesCredit` | Deduction 1 on the document. |
| **Subtraction2 Debit / Credit** | `termConfig.feesValDebit`, `termConfig.feesValCredit` | Deduction 2. |
| **Subtraction3 Debit / Credit** | `termConfig.tempBouncedDebit`, `termConfig.tempBouncedCredit` | Deduction 3. Despite its field id, this pair has nothing to do with bounced papers. |

A deduction pair is needed only when the document carries that deduction; a non-zero deduction
with an empty pair refuses the save: *Please enter deduction 1 account sides* (2 and 3 likewise).

## FP Transfer

Moving papers from one party to another records a "from" side and a "to" side:

| Group on screen | Field | Account of |
|---|---|---|
| **From Debit / From Credit** | `termConfig.debit`, `termConfig.credit` | The party the papers leave. |
| **To Debit / To Credit** | `termConfig.issuedDebit`, `termConfig.issuedCredit` | The party the papers go to. |

Each side is recorded when it is set, so you may fill, say, From Credit and To Debit only. The term refuses
to save unless the number of debit sides equals the number of credit sides: *Debit and Credit sides
count must be equal*.

## Messages you may see

Several of these messages have no Arabic text in the product and appear in English on Arabic screens.

| Message | Why | What to do |
|---|---|---|
| *Endorsing Account Sides are not Set* — «حسابات التظهير غير موجودة فى توجية المستند» | An opening-paper line is Endorsed and the term's Endorsing Effect tab is empty. | Fill that tab's debit and credit. The same applies to *Receiving*, *Issuing*, *Portfolioed*, *Temporary Bouncing*, *Postponed Portfolioed* and *Agio Account Sides are not Set*. |
| *Collect Account Sides are not Set* | A bank-notice line is Collected and the Collect Effect tab's first pair is empty. | Fill it. Likewise *Temporary Bounced* / *Finally Bounced Account Sides are not Set*. |
| *Please enter deduction 1 account sides* — «من فضلك إدخل الجوانب المحاسبية للأستقطاع الأول» | The agio document has a deduction 1 value and its Subtraction1 pair is empty. | Fill the pair, or remove the deduction. |
| *Commercial Paper {0} was partially cancelled by {1} and the remaining is only {2}* — «الورقة التجارية {0} ملغاة جزئيا بالقيمة {1} والمتبقي {2}» | A partial cancel asks for more than what is left of the paper. | Reduce the cancelled amount to the remaining value. |
| *Debit and Credit sides count must be equal* — «لابد من تساوي عدد جوانب الدائن والدين» | On an FP Transfer term, the filled debit sides and credit sides differ in number. | Fill one more side or clear one. |
| *Total installments does not equal document total* | Validate Remaining And Installments Total Equality is on, and the instalment lines do not match the document. | Correct the instalment lines or the paper values. |
