# How Installment Collection Works

Every contract in the Real Estate module ends up as a schedule of money: a sales contract, an opening sales contract, a rent contract, an opening rent contract, a reservation and even a waiver all carry a grid of installments. Each line has a code, a due date, a value, its own discount and penalty columns, its taxes — and a family of columns with names like *Requested Collect*, *Collected By Commercial Paper*, *System Paid*, *Remaining* and *Paid*.

Those last columns are the ones everybody stares at, and they are the ones nobody may type into. This page explains why, because once you understand it every money document in the module — the collect document, the bulk rent run, the exemption, the return payment — behaves predictably.

Throughout the page we will follow one line: **installment `INS-07` on a sales contract, worth 10,000, due on 1 March**. The customer turns up with 8,000 and asks for 500 off to settle it early.

## The Installment Grid Is a Projection

Nothing on a contract is "collected" because somebody typed a number into it. Money is recognised only when a **collection document is committed against an installment code**.

When that happens, the system writes a payment entry of its own — one per collect line — recording which contract, which installment code, how much, which tracking column and how much collection discount. Then it does something that surprises people the first time they see it: it **wipes the contract's system-maintained paid columns back to zero and rebuilds them from every payment entry that points at that contract**.

So the paid and remaining figures you see on a contract are not stored facts. They are a recomputed summary of the collection documents that exist right now. That single design decision explains a lot of behaviour:

- Cancel a collect document and the contract's figures fall back on their own — the entries are deleted and the summary is rebuilt without them.
- Cancel one and enter it again and nothing drifts; the numbers are derived, not incremented.
- Two people collecting against the same contract at the same time cannot corrupt each other's totals.
- And there is no meaningful way to "fix" a wrong figure by editing the contract. The fix is always to correct the collection document that produced it.

::: warning Never hand-edit the paid columns
The paid, system-paid, requested, collected-by-paper and remaining columns on a contract's installment grid are system-maintained. Anything typed into them is overwritten the next time a collection document touches that contract. If a figure looks wrong, look for the collect document behind it.
:::

## Which Column Moves Is a Decision You Make on the Term

A contract carries four separate tracking columns, not one, because a company usually wants to distinguish *promised*, *received as a cheque*, and *received as money*:

| Column on the installment line | What it is normally used for |
|---|---|
| *Requested Collect* / مطلوب تحصيله | The amount a collection officer has been asked to go and collect |
| *Collected By Commercial Paper* / محصل باوراق قبض | Settled by a cheque that has not necessarily cleared yet |
| *System Paid* / المحصل نظاميا | Genuinely settled |
| *Remaining* / المتبقي | What is left, derived from the above |

Which of them a collection document feeds is set on the document's term (توجيه), in the *installment Effect* option — the choices are *Requested Collect*, *Collected By Commercial Paper*, *System Paid* and *None*.

::: danger There is no fallback
The collect family reads this option and nothing else. **If the term leaves *installment Effect* empty, the collection lands nowhere** — the ledger entry is still created, the document still looks committed, and the contract's paid and remaining columns do not move at all. This is the single most common cause of the complaint "I collected the money but the contract still shows it as outstanding". Configure it on every collect, exemption and bulk-collection term you create.
:::

The same term also carries *Do not apply effects on installments* — the deliberate way to say "this document creates its accounting effect but must not touch the schedule". That is a choice; an empty *installment Effect* is an accident that looks like the same thing.

## The Three Rules People Fight With

### Over-payment is refused outright

Before a collect document commits, the system adds up every payment entry against each installment code — including the lines of the document you are committing right now — and compares the total to what that installment is considered to owe. If the total is bigger, the commit fails and names the installment and the excess.

There is no tolerance and no "credit the difference" behaviour. If the customer hands over more than the installment is worth, the extra belongs on the next installment, as a second line in the same document.

### Paying out of order is refused unless the term allows it

If installment `INS-05` is still partly unpaid, committing a collection against `INS-07` fails with a message naming both codes: you cannot pay the later one before the earlier one is settled.

Two things switch this off:

- the term option *Ignore Pay Installments In Order* (تجاهل دفع الأقساط بالترتيب), which is the normal answer for a business that lets customers pay whatever they like; and
- contracts that declare payment order unimportant by their own nature.

Note what the rule *does not* forbid. Paying an installment **before its due date** is perfectly legal — early settlement is a normal case. The rule is about skipping unpaid earlier installments, not about dates in the future.

### The installment code must already exist on the contract

Every line of a collection document is matched to a contract line by its installment code, and a code that is not on the contract fails validation. This is why the code column offers a suggestion list built from the contract you selected — use it rather than typing.

It also means that regenerating a contract's installment plan after money has been collected is dangerous: rebuilding the grid can leave collected entries pointing at codes that no longer exist. Build the plan first, then collect. The [installment plan page](/modules/realestate/sales/realestate-installment-plans.md) covers the generator and its overwrite behaviour.

Two smaller gates belong in the same list: a collect document needs a **contract in the *Based On* field**, unless every line names its own contract (that is how you collect several contracts in one document); and a contract that has been cancelled or waivered is closed to collection unless the term carries *Allow Collection From Finished Contracts*.

## The Collection Discount Shrinks the Debt Rather Than Paying It

Now the interesting part of our example. The customer owes 10,000 on `INS-07` and offers 8,000 to close it, on the understanding that 500 is forgiven as a prompt-settlement discount.

The collect line therefore carries:

- a collected value of 8,000 — actual money;
- a **collection discount** of 500 — in the discount column that sits immediately after the collected value in the details grid.

What the discount does is **reduce the amount that installment is considered to owe**. The installment's trackable total becomes its net value minus the accumulated collection discount — 10,000 − 500 = 9,500 — and 8,000 of that is now paid. The line's remaining figure is 1,500, not 2,000.

That is a genuinely different mechanism from an exemption. An exemption **settles** the installment: it consumes the balance exactly the way cash does, only the accounts differ. A collection discount **shrinks** the balance so that less cash is needed to close it. Both forgive money; only one of them counts as a payment. The [exemptions page](/modules/realestate/collections/realestate-exemptions-and-returns.md) draws the contrast in detail, because these two are constantly mixed up.

The discount is not free of accounting either — it carries its own debit and credit sides on the term, so the forgiven 500 is booked rather than quietly lost.

## Do Taxes Count Towards What an Installment Owes?

This is a single, module-wide decision, not a per-document one. In the Real Estate settings record there is an option **Consider Taxes In Calculation Of Installment Net Value Upon Payment** (اعتبار الضرائب في احتساب صافي الاقساط عند الدفع):

- **On** — an installment is only settled once the customer has paid it *including* its taxes; the over-payment ceiling and the remaining column both use the tax-inclusive total.
- **Off** (the default) — tax sits outside the installment's payable amount.

Because the same option drives the validation, the arithmetic and the on-screen remaining figure, it must be decided once, at implementation time, and then left alone. See [module configuration](/modules/realestate/realestate-configuration.md).

## These Documents Create the Effect — They Do Not Move the Cash

A committed collection document does two things: it writes the payment entries described above, and it creates an accounting effect that is **processed in the background as a business request**. The document saves instantly; the journal entry appears when the request is processed. If processing fails — a closed period, a missing account — the document is still there and the request is retried from the Business Requests list view (filter by failed, select the rows, More menu → Reprocess / Recommit).

What none of them do is touch a safe or a bank account. Cash movement is always a separate, deliberate step:

- On a collect document or a fine, the *Create Receipt Voucher* button raises the receipt voucher (سند قبض) that actually receives the money — or *Create Receipt Request* if your process routes it through a request first.
- On a return payment, *Create Payment Voucher* raises the payment voucher (سند صرف) that pays money out.

Which accounts the collection itself hits is entirely a term matter; the [collection, maintenance, investment and cost terms page](/modules/realestate/document-terms/realestate-terms-other.md) is where those pages are described.

## The Family, and What Each Member Does to the Schedule

| Document | Ledger effect | Effect on the contract's installments |
|---|---|---|
| Collect Document (سند تحصيل) | Yes | Settles installments through the term's *installment Effect* |
| Collect Request (طلب تحصيل) | None | None — it is a note, not a document with effects |
| Aggregated Collect Document (سند تحصيل مجمع) | None of its own | None of its own — it generates one collect document per line, and those carry everything |
| Exemption Document (سند إعفاء إيجار) | Yes | Settles installments exactly like a collection, without cash |
| RE Return Payment Document (سند سداد عائد) | Yes | Yes — money going back to the buyer |
| Fine Document (سند غرامة) | Yes | **None** — a fine is a separate receivable |
| Pay Request For Bank / For Owner | Yes | None — they move already-collected money onward |

The [collect documents page](/modules/realestate/collections/realestate-collect-documents.md) covers the first three, [payouts](/modules/realestate/collections/realestate-collection-payouts.md) the last, and [fines](/modules/realestate/collections/realestate-fines.md) the one document in the family that deliberately stays out of the schedule.
