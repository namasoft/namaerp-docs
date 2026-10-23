---
description: "Answers to the questions that come up most on live Contracting installations: why a contract books nothing, where an extract's journal entry is, whether execution is required, extract versus execution values, budgets, subcontractor material deductions and project cost."
---
# Contracting FAQ

These are the questions that come up again and again on live Contracting installations. Most of them have the same root: the module separates the *agreement* from the *money*, and separates *what was built* from *what is being billed*. Once those two separations are clear, the rest follows.

The examples below use the same contract as the rest of the documentation: **Tower A**, a 230,000 project contract with **Al-Fanar Development**, 10% retention and a 46,000 advance.

## Why did my contract not create any journal entry?

Because a project contract is not meant to. It is a **master file**, not a document: it has a code and a name rather than a book and a value date, it has no document term (توجيه), and signing it — even for 230,000 — produces no journal entry, no receivable and no stock movement. The same is true of a subcontract and of a subcontractor offer. Money reaches the ledger only when an **extract** (مستخلص) is issued against the contract, using the accounts on the standard terms and on the extract's own document term. If you are looking for the contract's financial footprint, look at its extracts: [Project Contracts](/modules/contracting/project-contracting/contracting-project-contract.md) and [Project Extracts](/modules/contracting/project-contracting/contracting-project-extracts.md).

## My extract saved instantly but nothing is in the ledger. Where do I look?

Saving an extract does not write the journal entry there and then. It raises a **business request** that is processed in the background a moment later, which is exactly why the save felt instant. Ninety-nine times in a hundred the entry appears while you are still looking at the screen. When it does not, the request has failed and is waiting for you in the **Business Requests** list view: filter by processing status, select the failed rows, and use the **More** menu → **Reprocess** or **Recommit**. The usual causes are a document term with an empty account, or a standard term whose debit or credit side was never filled — see [Document Terms Basics](/modules/contracting/document-terms/contracting-terms-basics.md).

## Do I have to record execution?

No. Execution is genuinely optional, and there are two supported ways to build an extract. Either you record a **Project Execution** first — how much of each term was actually done this period — and then create the extract *from* that execution, which seeds the billing quantities for you; or you leave the extract's "based on" field empty and press **Collect Terms**, which pulls the contract's terms in and lets you type what you are billing. The two routes are mutually exclusive: the Collect Terms buttons refuse to run when a source document is already filled. Record execution when site measurement and commercial billing are done by different people at different times, and skip it when the quantity surveyor bills what he measures in one pass. Both routes are walked through in [Project Execution](/modules/contracting/project-contracting/contracting-project-execution.md).

## Why is my extract value different from my execution?

Usually because the two documents are counting different things, and both of them count **incrementally**. On an execution you type this period's quantity; on an extract you type this period's billing quantity, and the two need not agree — you may measure 300 m³ and certify 250 because 50 is disputed. Both documents show a previous, a current and a total column, but only the *current* one is yours to type; the cumulative figure lives on the contract's term line. On top of that, three settings can change how the extract prices its lines — pricing from the cumulative quantity, pricing only against the previous extract, or applying a payment percentage — and any of them will make the extract's value diverge from a naive quantity × rate calculation. The full two-extract worked example — a 230,000 contract certifying 61,000 of work and then 67,400, which become **52,550** and then **59,270** of net payable once VAT, retention and advance recovery have been applied — is in [Project Extracts](/modules/contracting/project-contracting/contracting-project-extracts.md); the settings are in [Contracting Configuration](/modules/contracting/contracting-configuration.md).

## Does the budget stop overspending?

Not by itself, and this is the honest answer people usually do not expect. Nothing on the estimated or executive budget screen blocks anything: creating a budget of 180,000 does not prevent 200,000 of purchase orders. There is exactly one real ceiling in the module, and it lives on the **spending** document, not on the budget — open that document's document term (توجيه) and tick the option that prevents saving when the actual cost exceeds the planned cost. From then on the document refuses to save whenever the accumulated actual cost booked against a budget term code exceeds that term line's planned total cost. To cap quantity against a budget line, tick **Do Not Exceed Quantity** on the contracting purchase order's term; it limits the ordered quantity to the line's planned quantity. Which documents expose the option, and the one indirect control on the executive budget item request, are set out in [Budget Item Requests](/modules/contracting/budgets/contracting-budget-item-requests.md).

## Why is material issued to a subcontractor deducted from his extract?

Because that issue is a **sale**, not a stock movement. When you take cement out of your own store and give it to the blockwork subcontractor, the module treats it as selling him the cement at a price: it books a full invoice effect and creates a receivable against him. Since you are also about to pay him for his work, the two are netted — the value of the material arrives on his next extract as a deduction on the conditions grid, and the extract stamps itself on the material issue so you can see which certificate absorbed which charge. A **material return** does the reverse: it becomes an addition on the extract and gives him his money back. Contrast this with issuing material *to the project*, which carries no money at all and simply attaches the inventory cost to the project's term codes. Both streams are compared in [Selling Material to a Subcontractor](/modules/contracting/costs/contracting-contractor-materials.md).

## Where do I see actual cost against contract value?

On the project contract's **Terms** grid, where three columns sit on the same row: the term's total price (the contract value), its total cost (the plan), and its actual cost, which is re-totalled the moment any cost document is processed. That is the primary place, and it is term by term rather than project-wide. Two other screens add different angles: **Cost Execution** splits actual cost by origin — materials, invoices, subcontractors, workers, fines, salaries, depreciation — and derives a unit cost from it, though it shows no revenue column; and a **Final** extract is the one document where project-level cost and project-level revenue appear together, including the variance between cost recognised on extracts and cost booked by cost documents. There is no packaged report for this; the screens are the answer. See [How Project Cost Is Built](/modules/contracting/costs/contracting-cost-model.md) and [Cost Execution](/modules/contracting/costs/contracting-cost-execution.md).

## I booked cost against the project and it never showed up. Why?

Almost always because the cost line had no **project term code**. Cost is attached to a term, not to a project: a line with an empty project term code, or with no contract, is skipped silently when the cost entries are written — no error, no warning, just no cost. The second most common cause is a document that does not contribute cost in the first place, and there are two of those worth knowing: the **Employee and Equipment Issue Invoice** books a payable but contributes nothing to project cost, and the **Equipment Statement** is an accounting-only document. Check the term code first, then check whether the document is one of those two. The definitive list of what does and does not contribute is in [How Project Cost Is Built](/modules/contracting/costs/contracting-cost-model.md).

## Why does editing one condition affect the others?

Because the **Project Contract Update** replaces the contract's conditions wholesale rather than editing them one at a time. Whatever sits in the update's conditions grid becomes the complete new set of conditions on the contract, so if you list only the retention clause you meant to change, every other condition on the contract is removed along with it. There are two safe ways to work: either list the **complete** set of conditions you want the contract to end up with, or leave the conditions grid **empty** if you are only changing terms and dates. The same applies to the terms grid, so it is also worth re-picking the contract on the update just before you commit, to refresh its snapshot against anything added since you drafted it.

::: warning The conditions grid on an update is a replacement, not an edit
A partially filled conditions grid deletes the conditions you did not list. Fill it completely or leave it empty.
:::

One related point: conditions whose value is a percentage of the term's due or net value, or of the total due value, take their percentage from the condition master file, so set those percentages there. See [Contract Conditions](/modules/contracting/setup/contracting-conditions.md) and [Project Contract Updates](/modules/contracting/project-contracting/contracting-project-contract-updates.md).

## Where are the terms I copied? There is no "copy terms" button

There isn't one, and this is the setup step people miss most often. Terms reach a contract in two ways: you select a **contract template** on the contract, which seeds its terms and conditions, or you build the contract from an **assay** (مقايسة مقاولات), the priced bill of quantities. The action labelled *Collect Terms* on an assay does something different from what its English name suggests — it pushes analysis-card **costs** onto terms that are already there. If a contract opened empty, check whether a template was selected before you started typing. See [Contract Templates](/modules/contracting/setup/contracting-contract-templates.md) and [Contracting Assays](/modules/contracting/project-contracting/contracting-assays.md).

## Does approving a quality inspection unblock anything?

No. The quality family — ITPs and their registers, concrete inspections, checklists, pressure tests, material receipt inspections — records what was inspected and who signed it off. None of those records gates an extract, a material issue or a payment, and none of them creates a journal entry. They are the electronic version of the paper forms the site keeps, and they are valuable for exactly that reason; just do not build a process that expects an unapproved inspection to stop work downstream. Note also that most of the group needs the separate `contracting-qc` licence, while three of the screens in the same menu group need only `contracting`. See [Site Quality Control](/modules/contracting/quality/contracting-quality-overview.md).
