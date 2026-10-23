---
description: "Setting up the document terms of the Course Contract and Course Contract Cancel, the module's only accounting configuration: the Effect, Other Effects and Discount Effects tabs, where each account comes from, a worked example, and how books pick a term."
entities: [EDCourseContract, EDCourseContractCancel]
menu: Basic → Settings → Document Term
---
# Education Document Terms

Open the Education menu and you find five groups of master files and documents — students and
guardians, attendance, buses, meals, school trips — and nowhere among them a Settings screen. There
is no place to say "training fees revenue goes to account 4201", or "the receivable should land on
the guardian rather than on the trainee". That decision lives where every accounting decision in Nama
lives: on the **document term** (توجيه المستند), the field sitting next to the document's book at the
top of the screen.

That matters more in Education than in most modules, because only two documents in the whole module
ever reach the ledger — the [Course Contract](./education-course-contracts) and its
[Cancel](./education-contract-cancellation). Everything else in Education records information and
creates no ledger entry. So the term on those two documents is, in practice, the module's entire accounting
configuration.

## One screen, two terms

Both documents have a term shape of their own, and the two are built from the same screen, so once
you have learned one you have learned both. Each term is typed to its document: a term created for
the Course Contract cannot be used on a Course Contract Cancel, and the other way round. A working
setup therefore needs **at least two terms** — the contract term and its mirror — and usually more
than that, one pair per branch or per business line.

The screen has three tabs: **Effect** (التأثير), **Other Effects** (تأثيرات أخرى) and
**Discount Effects** (تأثير الخصومات).

## An accounting side, read once

Nearly everything on those three tabs is an **accounting side** — one half of a journal entry pair —
and the same block of fields repeats over and over. It is worth reading once, here.

| Field | What it decides |
|---|---|
| Side Configuration | Whether this side is used at all, and how it behaves as a ledger side |
| Account Source type | Where the account comes from: a fixed account you name on the term, or a lookup that follows a reference on the document |
| Reference Type / Source Field | When the account follows the document — which reference to read it from, and which field on that reference |
| Subsidiary Account Type | Which kind of subsidiary (ذمة) the resulting ledger line is stamped with |
| Account Code From Bag / Account Field | The account taken out of an account bag, for configurations built on bags |
| Calculate Account Based On Currency From Bag | Picks the bag account matching the line's currency and account type |
| Narration Template / Narration Query, Narration 2 Template / Narration 2 Query | The two description lines written on the ledger line — either a template with placeholders, or a query |
| AnalysisSet Source type, Reference Type / On Field | Where the analysis set on the ledger line comes from — fixed, or read from a reference on the document |

## The Effect tab — the pair that carries the deal

The tab holds two groups, **Debit** (مدين) and **Credit** (دائن). Between them they record the fees
themselves; everything on the other two tabs is a refinement.

Which business meaning goes in which group is decided by the **direction of the document**, not by
your preference. The Course Contract runs outward — it is a sale of training to the person who signs
it — so its **Debit** group is the *party* side, the receivable that lands on the trainee, the
guardian or whoever else pays, and its **Credit** group is the *company* side, the fees revenue. The
Course Contract Cancel runs the other way, so on its term the two roles swap: the **Debit** group is
the company side and the **Credit** group is the party side.

::: tip The cancellation term is the contract term with its groups exchanged
Set up your contract term first, then build the cancellation term by putting whatever you configured
under Debit into Credit and whatever you configured under Credit into Debit. The accounts are the
same accounts — only the group they sit in changes. Get that backwards and a cancellation will
reinforce the contract's entry instead of reversing it.
:::

The two sides are also valued differently, which catches people out. The party side is recorded at
**what is still owed** — the line's net value less anything collected on the document's payment
lines. The company side is recorded at the line's **gross amount, before discounts and taxes**, because
the discounts and the taxes each get their own pair of sides on the other two tabs and would
otherwise be counted twice.

The **Credit** group also carries **Shorten Ledger** (إختصار القيود), which merges identical ledger
lines so a contract enrolling thirty trainees on the same terms does not produce thirty near-identical
pairs of entries.

Two switches on this tab change how the document's own money behaves rather than which account it
hits:

| Option | What it does |
|---|---|
| **Pay Installments In Order** | Forces the instalments on the [payment schedule](./education-payment-schedules) to be settled oldest first. Leave it off and any instalment can be settled at any time |
| **Allow Payment More Than Invoice Amount** | Applies when an outside receipt voucher pays this contract's instalments — with it on, the voucher may pay more than the contract still shows as remaining |

![The Effect tab of the Course Contract term](../../ar/modules/education/images/contracts/education-term-course-contract-effect-en.png)

## Where the account actually comes from

The whole point of the *Account Source* on a side is that one term can serve many contracts and still
put each receivable on the right party's account. On these two documents there are four references
the source can follow, and they are the ones worth building your terms around:

- **Student** — the trainee named on the detail line. The account is read from that student's own
  master file, so each line's receivable lands on its own trainee.
- **Guardian** — not a field on the document, but the **guardian of the student on the line**. This
  is how a school bills the parent while still recording the child on the contract line.
- **Document Subsidiary** — the **Subsidiary** field in the document header. Since that field accepts
  a Student, a Guardian or a Customer, this is the source to use when the payer is whoever the
  contract says it is — including a company paying for its employees' training.
- **Line Subsidiary** — the **Subsidiary** column on the detail line, for the case where a single
  contract splits its lines across different payers.

Students and guardians are accounting subsidiaries in their own right, which is what makes the first
three of those work: the master file carries the accounts, and the term just says which reference to
follow.

The revenue side normally does not follow anything — you name a fixed account on the term, or take
one from an account bag.

## The Other Effects tab — cash and the four taxes

This tab gives accounts to the money that is not the deal itself.

- **Cash** (النقدي) — the side used for money taken at signing. Leave it empty and that amount stays
  on the main Debit or Credit side instead of getting a line of its own.
- **Tax 1**, **Tax 2**, **Tax 3**, **Tax 4** — one group each, and each group carries both the tax
  side and its **other side**, the contra account the tax is recorded against. These are where the tax
  amounts typed into the detail lines' tax columns land.

## The Discount Effects tab

Every discount level on the detail lines gets a group here, and so does the header discount, each
with its side and its other side. Configure only the levels your contracts actually use — a group
with no side configured simply produces no entry, and the discount stays folded into the amounts.

## A worked example — tuition receivable against fees revenue

A training centre in Riyadh bills trainees directly and records all training income on one revenue
account.

**Term "Training Contract – Riyadh"**, created for the Course Contract:

| Group | Setting |
|---|---|
| Debit | Account Source = **Document Subsidiary**, with the subsidiary account type for trainee receivables — so the debit lands on the account carried by whichever student, guardian or customer is in the header |
| Credit | Account Source = a **fixed account**, 4201 Training Fees Revenue |

A contract enrolling two trainees at 12,000 each is committed. The entry is 24,000 debit on the
payer's receivable account — stamped with that payer as the subsidiary — against 24,000 credit on
4201. If 4,000 of it was taken by card at signing on the contract's payment lines, that 4,000 goes
to the account named on the payment method itself and the payer's side carries the remaining 20,000.

**Term "Training Contract Cancel – Riyadh"**, created for the Course Contract Cancel, is the same
configuration with the groups exchanged:

| Group | Setting |
|---|---|
| Debit | Account Source = a **fixed account**, 4201 Training Fees Revenue |
| Credit | Account Source = **Document Subsidiary**, same subsidiary account type as above |

Cancelling 15,000 of that contract then records 15,000 debit on 4201 against 15,000 credit on the
payer — the exact mirror of the part being undone.

::: info Change a term, and old documents keep their old entry
A term is read when the document is processed. Editing a term does not go back and rewrite entries
that already exist. If you correct a term that had the wrong account, the documents committed under
the old configuration have to be reprocessed — the **Regenerate Accounting Effects** toolbar action
re-issues the ledger entry for the documents you select using the term as it stands now.
:::

## Books, and how a term gets picked

Every Education document carries two records at the top of its screen and they are easy to confuse.
The **book** decides the document's numbering series and a few small behaviours; the **term** decides
how the document behaves and what ledger entry it creates. A term can restrict which books it will work with,
through its Allowed Books grid or an allowed-books rule, and that is how each book ends up paired
with the term that belongs to it — a Riyadh book with the Riyadh term, a corporate-training book with
the corporate term. The details are on the [Document Books](/platform/documents-and-records/document-books) page, and the
term fields that are common to every module across Nama are described in
[Document Terms](/modules/supplychain/document-terms/doc-term-general).
