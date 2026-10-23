---
description: "The core ideas behind Nama ERP for new support staff: one database, master files versus documents, modules and the platform, and the document lifecycle from draft to commit, revision and deletion."
---
# What is Nama ERP

If you have just been handed a login and told to support Nama ERP, the honest first problem is not
that the system is complicated — it is that nobody tells you the handful of ideas the whole thing is
built on. Once you have those, screens you have never seen before start making sense on their own,
because they are all the same screen underneath.

This page is those ideas. It takes about ten minutes, and it is the difference between learning three
hundred screens and learning one.

## One system, one database

Nama ERP is a single web application. Users open it in a browser; a cashier opens the point-of-sale
application and a field engineer opens the mobile app, but those talk to the same server, and
everything ends up in **one database**.

That matters more than it sounds. An item sold at a till, costed by the warehouse and recorded in the
ledger is not three records being synchronised between three systems — it is **one record** that three
parts of the business look at from different angles. There is no nightly transfer to go wrong, no
"the accounts module has not caught up yet", and no second copy to reconcile. When you are
investigating a discrepancy, this is the assumption to start from: there is only one truth in there,
and if two screens disagree, one of them is being filtered differently.

The same database also holds all of your companies. Multiple legal entities, branches, warehouses and
currencies live side by side and are kept apart by configuration and security rules rather than by
separate installations. A group therefore needs no integration project to consolidate: the
[consolidated statements](/modules/accounting/consolidated-statements.md) read every company's books
directly, translate them into one reporting currency and eliminate the business between the companies.

## Everything is a record, and there are exactly two kinds

Every screen in Nama edits a record, and every record is one of two kinds. Getting this distinction
into your head early will save you more time than anything else on this page.

**A master file** is a *thing that exists*: a customer, an item, a warehouse, an employee, a fixed
asset, an account. It has a **code** and two names — the Arabic name and the English name — it usually
belongs to a **group** that codes it and files it into the tree beside the list, and it sits there
being referred to. A master file has no date and no fiscal period, and saving one moves no money. You
can sign a project contract worth 230,000 and, if that contract is a master file, nothing whatsoever
happens in the ledger.

**A document** is *something that happened on a date*: an invoice, a receipt voucher, a stock issue, a
journal entry, a vacation request. It has a **book** that gives it its number, a **document term** that
decides how it behaves, a **value date**, a **fiscal period** — and, crucially, it has **effects**. A
document is the only thing that moves money and stock.

::: tip The first question to ask about any screen
"Is this a master file or a document?" If the screen has a book, a term and a value date, it is a
document and it will do something. If it has a code, a group and two names, it is a master file and it
will not. Half the questions that reach support — *"why didn't this produce a journal entry?"* — are answered by
that one look.
:::

Beyond the record itself, three things attach to almost anything: **detail lines** (the grids inside a
document), **attachments**, and **additional fields** — extra fields your implementer added to a
screen without changing the product.

## Modules, and the platform underneath them

The business functionality is divided into **modules** — accounting, supply chain, manufacturing, HR
and payroll, point of sale, real estate, contracting, fixed assets, service centre, hospital
management, freight, travel, education, CRM and more. They are licensed separately, so an
installation runs only the ones it bought, but they are not installed separately: they are all part of
the same application and the same database. If a whole branch of the menu is missing on one
customer's system and present on another's, the licence is the usual reason — see
[Who sees which menu](/platform/menus/menu-visibility).

Underneath all of them sits the **platform** — and this is the part worth learning first, because it
is the part that never changes. Screens, numbering, security, approvals, imports, reports, dashboards,
notifications, scheduled jobs, the audit trail and the layout editor are written once and work
identically in every module. A sales invoice, an employee file and a maintenance request all sit in
the same frame and carry the same toolbar; what differs between them is which buttons are switched on,
not which buttons exist. That frame is documented once in
[Buttons on every screen](/platform/everyday-tools/screen-buttons) — learn it there and you have learned the controls
of the entire system.

## The idea that unlocks the rest: the document lifecycle

Here is the one mechanism worth understanding properly. Everything a document does, and every question
about why it did or didn't do it, comes back to where it is in its life.

### While it is a draft

Pressing **Draft** stores what is on screen without the system taking it seriously. Required fields
are not enforced, the validation rules your implementer wrote for saving are not run, and — the
important part — **no effects are produced at all**. Nothing reaches the ledger, nothing moves in the
warehouse. A draft is a scratchpad that survives being logged out.

A draft does not usually own a real document number either. It gets a provisional code from a separate
series, marked so you can recognise it: **a draft's code ends in `@draft`**. That keeps the real number
series free of gaps left behind by drafts nobody ever finished. The consequence catches people out —
the number written on the draft is *not* the number the document will end up with. (An installation
can choose to hand drafts real numbers instead; see [Drafts and their numbers](/platform/documents-and-records/document-books).)

Because a draft is not finished, other documents cannot normally point at it. That is why a
half-finished order sometimes cannot be found in a lookup: it exists, but it is still a draft.

### What committing actually does

**Save** commits. Committing is where the system starts believing the document, and it happens in a
fixed order:

1. **It checks that nobody else changed the record while you had it open.** If someone did, the save is
   refused with *"The record was modified by someone else, please refresh and re-enter your changes"* —
   your edits are not lost, but you have to reload and redo them onto the current version.
2. **It enforces the rules.** Required fields, the validation rules configured for this record type
   (see [Criteria Based Validation](/platform/governance/criteria-based-validation)), and whatever
   [entity flows](/platform/entity-flows/introduction-to-entity-flows) are attached to saving.
3. **It checks the period.** The document's value date decides its fiscal period, and if that period is
   closed the save is rejected outright — see [Fiscal Period Control](/platform/governance/fiscal-period-control-guide).
4. **It gives the document its real number** from its book's series, replacing the `@draft` code.
5. **It stores the document** and hands you the screen back.
6. **It queues the consequences** rather than doing them while you wait.

That last step is the one that surprises everybody, so it is worth stating plainly: **the accounting
entry and the stock movement are not written during your save**. Saving raises **business requests** —
one for the ledger, one for the inventory — and a background worker carries them out a moment later.
This is what keeps saving instant no matter how heavy the document is, and it is what makes recovery
possible: if an effect fails because of a missing account or a closed period, the document is not lost
and the user is not blocked.

It also means a document can be saved, correct, and visibly numbered while its effects are missing.
When somebody says "the invoice is there but it isn't in the ledger", that is where you look:
[Business Requests](/platform/background-processing/business-requests), which explains the processing
statuses and how to re-run a failed one.

Once committed, the document's status badge at the top of the screen reads **Stable** instead of
**Draft**. If the record is routed through an approval cycle it will sit at **Approval Pending**
instead, and its effects wait until the cycle finishes — see the
[Approvals System](/platform/approvals/approvals-system).

### After it is committed

A committed document is live, not frozen. Whether it can still be edited is a **permission**, not a
property of the document: the *Can Edit* level on a security profile runs
**Disabled → Save Draft → Commit → Edit After Commit**, and only the last of those lets someone change
a document after it has been saved. Editing and re-saving re-runs the whole sequence above, which
regenerates the effects rather than adding to them. See
[Security Profile](/platform/security/security-profiles).

Two things deliberately freeze a committed document:

- **Revising** stamps it as checked by a named person on a date and locks it — see
  [Revise and unrevise](/platform/governance/revise-and-unrevise). A revised document cannot be edited, deleted or
  cancelled until someone unrevises it.
- **Printing and approval** can freeze it too, if the security profile says so: *Prevent Edit After
  Print*, *Prevent Delete After Print*, *Prevent Edit After Approval* and *Prevent Delete After Approval*
  are four separate columns, and each does exactly what it says.

### Taking a committed document back

There is no button that turns a committed document back into a draft. What there is instead is a
**[Document Cancel Document](/platform/documents-and-records/document-cancel-document.md)** — a small document of its own whose whole job is to name one or more
committed documents and cancel them.

Committing it reverses their effects and marks each one **Cancelled**. The cancelled document keeps its
number and stays visible in the list, which is the point: the history shows that the document existed
and was cancelled, rather than quietly losing a number. A document cannot be cancelled if it is still a
draft, if it has been revised, if it is waiting on an approval, or if another cancel document already
cancelled it.

The recall is in the reverse direction. **Deleting the cancel document brings the cancelled documents
back**, and there is a switch on it that decides in what state: normally they are re-committed exactly
as they were, but tick **Restore Cancelled Doc As Draft After Deleting Cancel Document** and they come
back as **drafts** instead — so they can be corrected before they count again. That is the closest thing
Nama has to "put this document back in my hands".

### Deleting, and when it refuses

Deleting a **draft** is cheap: nothing has happened yet, so nothing is unwound.

Deleting a **committed** document is not a quiet operation. Its effects have to be reversed, and that
reversal is queued as a business request of its own — which can fail for exactly the reasons the
original could, and needs looking at in the same place. Along with the record itself, its attachments,
its additional fields and its number sequence go too.

Several rules will stop a delete outright:

- **A cancelled document cannot be deleted.** Undo the cancellation first by deleting the cancel
  document.
- **A revised document cannot be deleted** until it is unrevised.
- **A record in an approval cycle cannot be deleted** until the cycle has finished, and a record whose
  approval has already completed can only be deleted by someone holding the specific permission for
  that.
- **A record that has been printed** can be locked against deletion, again by permission.
- **Deleting drafts is its own permission**, separate from deleting committed records — and it can be
  narrowed further to "only the drafts I created myself".

### Creation date, issue date, and value date

Documents carry three dates and they are not interchangeable. Support calls go wrong when they get
mixed up.

| Date | What it is |
|---|---|
| **Creation Date** (تاريخ الإنشاء) | When the record entered the system. The system stamps it the first time the document is committed and does not move it afterwards. It is a fact about the data entry, not about the business. |
| **Issue Date** (تاريخ التحرير) | The date written on the paper — when the document was issued to whoever received it. |
| **Value Date** (التاريخ الفعلي) | **The one that matters.** It is the business date of the transaction, and it decides which fiscal period and which fiscal year the document belongs to — and therefore which period its ledger entry and its stock movement land in. |

So a receipt entered on 3 February for money taken on 28 January has a creation date in February and a
value date in January, and it belongs to January's figures. Change a document's value date and you
change which month it counts in; that is not a cosmetic edit. The detail is in
[Fiscal periods, period locking and multi-currency](/modules/accounting/support/accounting-periods-and-currency).

## Where to go next

- **The vocabulary.** Almost every page on this site assumes you already know what a term, a book, a
  subsidiary or a dimension is. They are all defined, in both languages, in the
  [Glossary of Nama ERP terms](/getting-started/nama-erp-glossary).
- **The controls.** [Buttons on every screen](/platform/everyday-tools/screen-buttons) — the toolbar, the More menu and
  the grid buttons that every screen in the system shares.
- **Numbering.** [Document books](/platform/documents-and-records/document-books) — where a document's number comes from and
  what a book decides on its behalf.
- **Behaviour.** [Supply Chain Document Terms](/modules/supplychain/document-terms/) — the record that decides what a
  document type actually does when it is saved.
- **When something did not happen.** [Business requests](/platform/background-processing/business-requests).
- **The platform toolbox.** [Platform features](/platform/) — security, approvals, screen layout,
  imports, reports and dashboards.
- **Your module.** [The module guides](/modules/) — pick the one your customer runs.
- **For your IT department.** [Architecture](/architecture/) — servers, deployment and security, written
  for the people who run the machines rather than the people who enter invoices.
