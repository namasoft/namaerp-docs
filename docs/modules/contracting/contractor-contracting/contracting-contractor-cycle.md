---
description: "Overview of the subcontractor chain under Contracting > Contractor Contracting (offer, contract, execution, update, extract and payment), what is optional, what books, and how it mirrors the owner-side cycle."
entities: [ContractorContract, ContractorContrExtract, ContractorContractOffer, ContractorContractExecution, ContractorContractUpdate, Contractor]
---

# The Subcontractor Cycle

A contracting business runs two mirrored chains at once. On the owner side it bills the client for work delivered; on this side it *buys* work — from the blockwork gang, the electrical subcontractor, the piling specialist — and pays for it. Same vocabulary, same screens, same term codes. Opposite direction of money.

That is the sentence to keep in your head while reading these pages. Everything the [project contracting cycle](/modules/contracting/project-contracting/contracting-owner-cycle.md) says about revenue, receivables and receipt vouchers is true here about **cost, payables and payment vouchers**. The chain is deliberately the same shape, because the same code builds both sides.

You will find the chain at **Contracting > Contractor Contracting**, under licence `contracting`. The subcontractor's own record, his classification and the fine reasons live one menu group up, under **Contracting > Master Files**. And one document filed in this group does not belong to this side at all: the *Measurements Request* is a customer-facing document — the [owner side](/modules/contracting/project-contracting/contracting-measurements-and-approvals.md) covers it.

::: tip The rule that governs the chain
**Signing a subcontract books nothing. The extract (مستخلص) books everything.** The offer and the subcontract are both master files, the execution and the update produce no journal entry, and cost, payables, retention, advance recovery and tax all reach the ledger through the subcontractor extract.

The qualifier matters, though, because this side has more documents standing *beside* the chain than the owner side does. Advance payments, other payments, fines, material sold to the subcontractor, the daily labour book and the miscellaneous purchase invoices all post in their own right the moment they are committed. What the rule really says is: **within the contract chain**, only the extract posts.
:::

And one thing about signing that surprises people who have just learned that rule:

::: warning Saving a subcontract does have one side effect
It creates the **financial papers** — cheques or promissory notes, issued to the subcontractor — from the instalment schedule on the contract's payments grid, when your [module configuration](/modules/contracting/contracting-configuration.md) allows this document type to mint them. No journal entry, no payable, but real commercial paper in the treasury. On the owner side the same mechanism produces papers *received from* the customer.
:::

Throughout these pages we follow one package: on the **Tower A** project for **Al-Fanar Development**, the blockwork is subcontracted as **CC-0042** — 2,000 m² of 200 mm blockwork at 40, an **80,000** subcontract, with **10% retention** withheld from every certificate and a **16,000** mobilisation advance paid up front and recovered as the work proceeds.

## The chain, step by step

```
Contractor  (master file — who you subcontract to)
        ↓
Subcontractor Offer   (master file — his quotation. Optional)
        ↓  Convert To Contract
Subcontract           (master file — books nothing; mints his cheques)
        ↓                    ↘  Subcontract Update  — the variation order
Subcontractor Execution  (optional — what he actually built)
        ↓
Subcontractor Extract  ← THE money document: cost, payable, retention,
        ↓                 advance recovery, fines, material charge-back
Payment vouchers
```

**1. Register the subcontractor.** The [subcontractor record](/modules/contracting/setup/contracting-contractors-and-consultants.md) is a party master file with its own accounting subsidiary (الذمة), and it may optionally point at a **supplier**. That link is worth thinking about once, up front: link him and his contracting balance lands on the supplier's accounts, so contracting and purchasing show one balance for one firm; leave it empty and the contractor's own accounts group is used and the balance lives only in contracting.

**2. Ask for prices.** A [subcontractor offer](/modules/contracting/contractor-contracting/contracting-contractor-offers.md) is one firm's priced quotation for one package. You capture each quote as its own record, compare them, and convert the winner with one button. It is entirely optional — for a trade you buy every month at a framework rate you would go straight to the subcontract.

**3. Award the work.** [The subcontract](/modules/contracting/contractor-contracting/contracting-contractor-contract.md) is the centre of gravity of this side, exactly as the project contract is of the other: the rates you have agreed to pay, the retention and other clauses that will reduce every certificate, the instalment schedule, the site team. It stays alive — executions, extracts and cost documents write their running totals back onto its term lines.

**4. Vary it when the scope moves.** Once the first extract exists the subcontract freezes its prices, quantities and conditions, and the sanctioned way to change it is a [subcontract update](/modules/contracting/contractor-contracting/contracting-contractor-contract-updates.md). It is a genuine document with a book and a value date, and it rewrites the contract in place.

**5. Measure what he did.** [Subcontractor execution](/modules/contracting/contractor-contracting/contracting-contractor-execution.md) (حصر كميات) is the site measurement: 800 m² of wall this month. It is **optional**, and it is **incremental per document** — each execution states only what was measured since the last one, and the subcontract's term line carries the running total.

**6. Certify and book.** [The subcontractor extract](/modules/contracting/contractor-contracting/contracting-contractor-extracts.md) is his payment application and the only document in the chain that reaches the ledger. It prices the certified quantities, adds tax, then applies everything that reduces what he is paid — retention, a slice of the advance, [fines](/modules/contracting/contractor-contracting/contracting-contractor-fines.md), and the [material you sold him](/modules/contracting/costs/contracting-contractor-materials.md) — and arrives at a net payable. Committing it builds an accounting business request (طلب أعمال) that is processed in the background.

**7. Pay him.** Payment vouchers (سند صرف) settle the extract, and the extract itself shows how much of the certificate has actually been paid. Separately, [advances and other payments](/modules/contracting/contractor-contracting/contracting-contractor-advances-and-payments.md) are paid outside the extract and recovered inside it.

## What is optional, and what books

| Step | Optional? | Books anything? |
|---|---|---|
| Subcontractor record | No | No |
| Subcontractor offer | Yes | No |
| **Subcontract** | **No** | **No** — but it can mint financial papers |
| Subcontract update | Yes | No |
| Subcontractor execution | Yes | No |
| **Subcontractor extract** | **No** | **Yes — cost, payable, tax, retention, recoveries** |
| Advance payment / other payment | Yes | Yes |
| Fine | Yes | Yes |
| Material sold to the subcontractor | Yes | Yes — it is a sale |

The emptiness of that middle block is the design, not an oversight. The commercial record (the subcontract) and the accounting record (the extract) are kept apart deliberately, which is why you can negotiate, amend and re-amend a subcontract for months without disturbing a single journal entry.

## Where this side differs from the owner side

This is the list to read before you assume a screen behaves the way its twin does. Everything here is deliberate.

| | Owner side | Subcontractor side |
|---|---|---|
| Direction of money | a receivable — revenue, the client owes you | a **payable** — cost, you owe the subcontractor |
| Settled by | receipt vouchers | **payment vouchers** |
| Whose accounts the balance lands on | the customer's | the **contractor's own accounts**, or those of the supplier linked to him |
| Instalment financial papers | received from the customer | **issued to the contractor** |
| Cross-reference to the other side | none — the project contract *is* the top | every non-parent subcontract line, and every fine line, must carry the **project term code** of the client-contract item it belongs to |
| A ceiling on quantity | none | the quantities of the **same client-contract item across all subcontracts** may not exceed what you sold, unless the configuration allows over-letting |
| Write-back | executions and extracts write onto the contract | the same, **plus** an optional write-back of extracted quantities up onto the client contract and both budgets |
| Deductions on the extract come from | contract conditions, project advances, project fines | contract conditions, subcontractor advances, **other payments**, fines — **and material you sold him** |
| Owner-side fines | deducted from the client's extracts | deliberately **excluded** — a penalty on your client can never be charged to a subcontractor |
| An extra payment document | — | **Other Payment**, a second advance-shaped document with its own accounts and numbering |
| Taxes on the extract | a tax-term mechanism derives the tax lines, with its own tax detail grid | **percentages typed on the document**; no tax-term derivation and no tax detail grid |
| Actual-cost accounting entries on the extract | yes | **no** — actual-cost postings are an owner-side feature |
| Cost analysis on extract lines | — | the extract fills the **analysis term code and analysis card** from the matching subcontract term |
| Closing the contract | — | a **Final** extract marks the subcontract *finished*, and it then stops appearing in contract pickers |

Two of those are worth a sentence more, because they are the ones that generate support calls.

**The project term code is not optional.** A subcontract term is a slice of a client-contract term: *your* blockwork item, sold to Al-Fanar as term `3.01`, might be delivered by three different firms' term `3.01`s. Unless the configuration says otherwise, every priced line on a subcontract has to name the client-contract item it belongs to. That single column is what makes the quantity ceiling, the write-back and the "how much of the blockwork have I sublet?" question possible.

**Material issued to a subcontractor is a sale, not a project cost.** Issue cement from your store to the blockwork gang and he is invoiced for it, VAT and all. Nobody expects a cheque back — the money returns as a **deduction on his next extract**, and a return arrives as an addition. This mechanism has no owner-side counterpart at all. See [selling material to a subcontractor](/modules/contracting/costs/contracting-contractor-materials.md).

## The numbers, end to end

CC-0042's three extracts, which the [extracts page](/modules/contracting/contractor-contracting/contracting-contractor-extracts.md) builds line by line:

| | Extract 1 | Extract 2 | Extract 3 (Final) |
|---|---|---|---|
| Quantity certified | 800 m² | 700 m² | 500 m² |
| Work value | 32,000 | 28,000 | 20,000 |
| VAT 15% | 4,800 | 4,200 | 3,000 |
| Retention 10% | −3,200 | −2,800 | −2,000 |
| Advance recovered | −6,400 | −5,600 | −4,000 |
| Material charge-back | −2,400 | — | — |
| Fine | — | −1,500 | — |
| **Net payable** | **24,800** | **22,300** | **17,000** |

Retention withheld comes to 8,000 — 10% of the 80,000 subcontract. The advance clears exactly as the last certificate closes. And none of it existed in the ledger until the first extract was committed: the day CC-0042 was signed, the only thing that happened in the system was that his cheques were minted.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *The total of contractor contracts for term {0} - {1} in the project contract {2} is {3}, while term quantity is {4}* — «إجمالي كميات عقود مقاول الباطن لكود البند {0} - {1} في عقد المشروع {2} تساوي {3}، بينما كمية كود البند تساوي {4}» | Saving a subcontract that names a project contract: the quantity sublet against that client-contract term, added up over **every** committed subcontract on that contract plus this one, is more than the client contract sold. | Reduce the quantity, vary the client contract first, or — if the business prefers to over-let and vary afterwards — tick **Allow Contractor Contracts to exceed Original Contract Qty** (السماح لكميات عقود مقاولي الباطن بتعدي كمية العقد الرئيسي) in the contracting configuration. |
| *Sum of current and previous {0} value of condition {1} can not exceed {2}* — «مجموع القيمة الحالية والسابقة {0} للشرط {1} لا يمكن أن تتخطى {2}» | On a subcontractor extract, a condition line — retention, advance recovery, a deduction — would take the running total for that condition past the value planned for it on the subcontract. Previous extracts count towards the total. | Reduce the value on this certificate, or tick **Condition Value Can Exceed Contract Planned Value** (قيمة الشرط يمكن أن تتخطى القيمة المخططة في العقد) on the contracting condition itself when the overrun is legitimate. |
| *You can not use the contract {0} because it has a final extract {1}* — «لا يمكنك استخدام العقد {0} حيث أنه منتهي طبقًا للمستخلص الختامي {1}» | The contract already carries a committed **Final** extract, which closes it. It is refused on any later document that points at it, not only on extracts. | Work on another contract, or — when late documents on a closed contract are genuinely needed — tick **Allow Creating Documents For Contracts That Have a Final Extract** (السماح بعمل مستندات لعقود لها مستخلص ختامي) in the contracting configuration. |

## Where to read next

- [Subcontractor offers](/modules/contracting/contractor-contracting/contracting-contractor-offers.md) and [subcontracts](/modules/contracting/contractor-contracting/contracting-contractor-contract.md) — the two master files this side is built on.
- [Subcontract updates](/modules/contracting/contractor-contracting/contracting-contractor-contract-updates.md) — changing a live subcontract.
- [Subcontractor execution](/modules/contracting/contractor-contracting/contracting-contractor-execution.md) and [subcontractor extracts](/modules/contracting/contractor-contracting/contracting-contractor-extracts.md) — measuring and certifying.
- [Advances and other payments](/modules/contracting/contractor-contracting/contracting-contractor-advances-and-payments.md) and [fines](/modules/contracting/contractor-contracting/contracting-contractor-fines.md) — the documents that arrive on the extract as deductions.
- [The project contracting cycle](/modules/contracting/project-contracting/contracting-owner-cycle.md) — the mirror image of this page.
- [How project cost is built](/modules/contracting/costs/contracting-cost-model.md) — where subcontractor extracts sit among the other sources of actual cost.
