---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# Document Terms Basics

A **document term** (توجيه المستند) is the small configuration record that tells one document type how to behave — and, above everything else in Contracting, **which accounts it records its entries on**. The accounts are not on the document and not on the contract: they live on the term. So when a project extract debits the owner's receivable and credits contract revenue, it is because someone once set those two accounts on the extract's term.

The consequence is worth stating before anything else: **a document whose term has no accounts on it creates no journal entry.** It will save, it will commit, it will show correct totals on screen, and the ledger will stay silent. In a module where [signing a contract books nothing and the extract books everything](/modules/contracting/contracting-overview.md), a half-configured extract term is the single most common reason a support call begins with "the contract is signed, the extract is committed, and the accountant says nothing arrived".

Terms are also where a business keeps its variants. One project extract term for ordinary interim certificates, another that collects advances and fines automatically on save, a third for a joint venture that reports to a different revenue account — same document type, three terms, and the user picks one in the document's **Document Term** field. This page covers what every contracting term has in common; the pages after it take the terms document family by document family.

![A document term screen: the target document type, the term's code and names, and the option groups that appear once the document type is a contracting one](../../../ar/modules/contracting/images/terms/document-term-main-en.png)

## Where to find it

| | |
|---|---|
| Menu | Basic > Settings > Document Term |
| Kind | Master file |
| Reached from | The **Document Term** field on any contracting document, or the Document Term list screen |
| Licence | The term itself needs no licence beyond the one the target document needs |

A term is created against **one document type**. Choose the document type first: the contracting option groups — Debit, Credit, Cost Effect, the tax effects and the rest — appear only once the term knows it is pointing at a contracting document. On a brand-new blank term you will see the generic shell and nothing else, which is expected rather than broken.

## Debit and Credit — the pair every contracting term has

Every contracting document term carries a **debit side** and a **credit side** for its main entry. On screen they sit in the groups captioned **Debit** and **Credit** (مدين / دائن) — field ids `termConfig.debit2` and `termConfig.credit2` on the extract, assay, daily labour book and equipment statement terms; the fine and payment terms use `termConfig.debit` / `termConfig.credit`, and the miscellaneous-contracting terms `termConfig.config.debit` / `termConfig.config.credit`. Those are the primary pair — the "2" in the field id is historical, and there is no "debit 1" anywhere to hunt for. Throughout these pages they are called simply the debit and the credit.

Each side is more than an account number. A side lets you say *where the account comes from* rather than naming one account for all time:

| What you set on a side | What it does |
|---|---|
| **Side Configuration** — `termConfig.debit2.sideConfig` | A saved **Accounting Side Config** record. When it is filled, the side uses that record's settings and ignores everything else set on the side |
| The account source and the account — `termConfig.debit2.accountSource.type`, `termConfig.debit2.accountRef` | Where the account comes from: **Specific** uses the account chosen in the **Account** field; **Reference** takes it from a record the document refers to, or from an account held in a field of the document; **Current User Subsidiary** takes it from the employee of the user who created the document |
| The reference type and the field it comes from — `termConfig.debit2.accountSource.entityType`, `termConfig.debit2.accountSource.fieldID` | For a **Reference** source: which record to take the account from, for example the **project**, the **contractor** or the **customer** named on the document. That record also becomes the journal line's subsidiary |
| The subsidiary account type and the bag account id — `termConfig.debit2.subsidiaryAccountType`, `termConfig.debit2.bagAccountId` | Which of that record's accounts to use: its main account, one of its numbered accounts (Account 1 to Account 20), an account from its accounts bag (named by the bag account id), or an account held in a header or line field |
| The narration templates — `termConfig.debit2.narrationTemplate`, `termConfig.debit2.narration2Template` | The wording that appears on the journal line |
| The analysis set source — `termConfig.debit2.analysisSetSource.type` (shown only when the global configuration adds dimension sources to terms) | Where the [dimensions](/modules/contracting/contracting-configuration.md) on the journal line come from |

The ids above are written for the debit side; the credit side has the same sub-fields under `termConfig.credit2.…`. Most of the other sides on a contracting term — the tax, cost, discount and difference effects, and the debit and credit of the fine and payment terms — are a single field that picks a saved **Accounting Side Config** record (جانب محاسبي), which holds the same settings.

That is why "credit the subcontractor" is not an account at all — it is a credit side whose account source is **Reference**, pointing at the contractor named on the document, so the account and the subsidiary come from the contractor's own record. Register a new subcontractor and no term needs editing.

## The standard term can override the accounts, line by line

This is the fact that surprises implementers most, and it makes contracting term configuration much less laborious than it looks.

On an extract, before Nama uses the term's debit and credit for a detail line, it looks at the line's **standard term** (بند قياسي). If that catalogue record carries its own debit or credit account, **the standard term wins for that line**. So a chart of accounts can be driven per work item — excavation to an earthworks revenue account, concrete to a concrete revenue account — from the [standard-term catalogue](/modules/contracting/setup/contracting-standard-terms.md), while the document term supplies only the fallback for terms that have nothing of their own.

::: tip Set the fallback on the term, the exceptions on the standard terms
Put the general-purpose accounts on the document term so that no amount is ever left without an account, then override only the handful of work items that genuinely need their own account. A term with a blank debit and a standard-term catalogue that is also blank in places is how lines go missing from a journal entry.
:::

## Conditions bring their own accounts

Retention, advance recovery and fines reach an extract through its **conditions** grid, and their accounts do **not** come from the document term. Each line takes its accounts from the [condition master record](/modules/contracting/setup/contracting-conditions.md) it points at — including the accounts for the condition's own tax. If a condition carries no accounts of its own, the extract falls back to the term's main debit and credit and reverses the sign for deduction-type conditions, so the withheld amount lands as a negative on the main pair instead of on a dedicated retention account.

Both arrangements work. The choice is presentational: a dedicated *retention payable* account on the condition gives you a balance you can age and release, while the fallback keeps the journal short.

## The effects are processed in the background

When a contracting document is committed, Nama works out the journal lines from the term during the save and hands them to a **business request** (طلب أعمال), which is processed in the background. A side left empty on the term adds no line. A side that is set but whose account cannot be worked out for a line, such as a **Reference** to a record the document does not name or **Current User Subsidiary** for a user with no employee, stops the save with a message.

Because the request keeps the term's accounts as they were at save time, a corrected term reaches an already committed document only through **Recommit**; **Reprocess** re-runs the old lines. Finding and re-running failed requests is covered on [Business Requests](/platform/background-processing/business-requests).

## Which documents have contracting term options

Contracting documents fall into three groups, and knowing which group a document is in saves a lot of searching.

**Group 1 — documents with their own contracting term screen.** The two extracts, the assay, both fines, the advance and other-payment documents, the term analysis card, the cost execution, the daily labour book, the equipment statement, the employee-and-equipment cost distribution, and the three miscellaneous-contracting documents. These are the subject of the three pages that follow.

**Group 2 — documents that borrow the supply chain term screen.** These documents' terms are the standard inventory / purchase term screen you already know from supply chain, plus a small set of contracting-specific additions:

| Document | Accounting-effect groups on its term? |
|---|---|
| Contracting Material Issue | No |
| Contracting Material Issue Req | No |
| Contracting Material Return | No |
| Contractor Material Issue | Yes |
| Contractor Material Issue Request | Yes |
| Contractor Material Return | Yes |
| Contracting Purchase Order | Yes |
| Contracting Purchase Request | No |
| Executive Budget Item Request | No |
| Contracting Employee And Equipment Issue Invoice | Yes |

For everything shared, read the supply chain term reference: [General](/modules/supplychain/document-terms/doc-term-general.md), [From-Document](/modules/supplychain/document-terms/doc-term-from-document.md), [Quantity Tracking](/modules/supplychain/document-terms/doc-term-quantity-tracking.md), [Pricing, Taxes & Discounts](/modules/supplychain/document-terms/doc-term-pricing-taxes-discounts.md), [Accounting Effects](/modules/supplychain/document-terms/doc-term-accounting-effects.md) and [Generation & Dimensions](/modules/supplychain/document-terms/doc-term-generation-and-dimensions.md). The contracting-specific additions are covered on [Material and Payment Document Terms](/modules/contracting/document-terms/contracting-terms-materials.md) and [Other Contracting Document Terms](/modules/contracting/document-terms/contracting-terms-other.md).

**Group 3 — documents with a term but no contracting options at all.** A term is still required, and it still governs numbering, approval and dimensions like any Nama term, but there is nothing contracting-specific to configure:

- Project Contract, Project Contract Update, Contractor Contract, Contractor Contract Offer, Contracting Offer
- Project Contract Execution, Contractor Contract Execution, Contracting Budget Execution
- Contracting Estimated Budget, Contracting Executive Budget
- Term Sheet, Contracting Job Order, Customer Submittal, Measurements Request, Daily Engineering Doings, Project Deliver Letter
- Every document in the Quality family

That list is not an oversight. None of those documents reaches the ledger, so none of them needs accounts. It is also the reason the answer to *"which term makes my contract create a journal entry?"* is always **the extract's**.

## Worked example — one term for the Tower A extracts

Tower A is a residential tower contracted with **Al-Fanar Development** at **230,000** on contract `PC-2026-001`, with a 10% retention condition and a 46,000 advance from the owner. One term, code `EXT-STD`, targeted at Project Contract Extract, is all that is needed to make every extract on that contract create its journal entry: a main debit and credit, a Tax 1 pair and a planned-cost pair. It carries no retention accounts, because those are on the retention condition record.

Had the concrete standard term `2.01` carried its own credit account, such as *Concrete works revenue*, the concrete line would credit that instead of the general revenue account, without `EXT-STD` knowing anything about it.

The term's groups, the first two extracts and the journal they produce are worked through on [Extract Document Terms](/modules/contracting/document-terms/contracting-terms-extracts.md).

## Where to go next

- [Extract Document Terms](/modules/contracting/document-terms/contracting-terms-extracts.md) — the two extract screens, what each effect group is for, and the pricing modes
- [Material and Payment Document Terms](/modules/contracting/document-terms/contracting-terms-materials.md) — material issues and returns on both sides, advances and fines
- [Other Contracting Document Terms](/modules/contracting/document-terms/contracting-terms-other.md) — cost execution, labour, equipment, purchasing, miscellaneous spend, the analysis card and the assay
