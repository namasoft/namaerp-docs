---
description: "The Document Cancel Document screen: how a committed document is cancelled since there is no un-commit, what committing the cancellation does, what blocks it, restoring the documents, documents sent to a tax authority, and the messages you may see."
entities: [DocumentCancelDocument]
menu: Basic → Documents → Document Cancel Document
---
# Document Cancel Document

Sooner or later somebody commits a document they should not have. An invoice goes out on the wrong
customer, a receipt voucher is entered twice, a stock issue leaves the warehouse on paper but never
in reality. The natural instinct is to look for an "undo" button — something that puts the document
back the way it was before anyone pressed Save.

There isn't one. Nama has no un-commit: once a document is committed, **Draft** is greyed out and
stays greyed out, and no toolbar button turns a live document back into a scratchpad. That is
deliberate. A committed document has already produced effects — an entry in the ledger, a movement in
the warehouse, a debt line against a customer — and quietly rewinding it would leave a gap in the
numbering and no trace that it ever existed.

What Nama offers instead is a **Document Cancel Document**: a small document of its own whose entire
job is to name one or more committed documents and cancel them. Because the cancellation is itself a
document, it has a number, a date, a description and an author, and it can be found, printed and
audited later. And because it is a document, it can be deleted — which is what makes it reversible.

You will find it under **Basic → Documents → Document Cancel Document**. It is part of the base
installation (licence `basic`), so it is available on every system.

## What the screen looks like

The screen is deliberately small. Above the grid sits the usual document header — the **Book** and
**Code** that give the cancellation its own number, the **Issue Date**, the **Value Date** and the
**Fiscal Period** — and then the fields that do the work:

| Field | What it is for |
|---|---|
| **Cancelled Document** | The document you are cancelling. Any document type in the system can be chosen here; master files cannot. |
| **Restore Cancelled Doc As Draft After Deleting Cancel Document** | Decides what state the documents come back in when this cancellation is later deleted. More on this below. |
| **Attachment 1** … **Attachment 5** | Five file slots, for the credit note, the signed memo or the e-mail that justifies the cancellation. |
| **Description** | Why. On an e-invoicing system this text travels to the tax authority as the cancellation reason, so it is worth writing properly. |

Underneath, a **Details** grid repeats the same **Cancelled Document** reference once per row, with a
**Description** of its own beside it. That is how you cancel a batch: the header reference and every
row in the grid are treated as one list, duplicates are ignored, and each document in it is cancelled
by this one record. Then comes the usual **Dimensions** group.

Notice what is *not* there: there is no **Term** field. A document term decides how a document
behaves, and this one behaves exactly one way, so it does not need one.

There are no buttons specific to this screen either — it carries the standard toolbar every screen
carries, and nothing more. The cancellation happens when you save.

## What committing it actually does

Saving the cancel document runs, for each document named on it, the same unwinding the system would
run if you deleted that document — and then stops one step short of throwing it away.

1. **The effects are reversed.** The journal entry comes back out of the ledger, the stock movement
   comes back out of the warehouse, the debt line stops counting. This goes through the same
   background processing that produced the effects in the first place, so if a cancelled document's
   figures still look wrong a moment later, the place to look is the
   [Business Requests](/platform/background-processing/business-requests) list.
2. **The document is marked Cancelled.** Its status badge changes from **Stable** to **Cancelled**,
   and the same status appears in list views and searches.
3. **The document stays.** It keeps its number, keeps its lines and stays visible in the list — which
   is the whole point. The history shows that document number 4711 existed and was cancelled, rather
   than showing a hole where 4711 used to be.
4. **The document becomes read-only.** Open a cancelled document and every field is greyed. It cannot
   be edited, and it cannot be deleted either — the delete is refused because the document is
   cancelled. To get at it again you have to undo the cancellation first.

Because cancelling is a permission on the **Document Cancel Document** screen rather than on the
invoice, this is the screen to grant or withhold when you want to control who may take documents back.

## What will stop a cancellation

The system checks each named document before it will let you save, and it reports the failures per
row, so a batch where one document is refused tells you which one and why. A document cannot be
cancelled if:

- **It is still a draft.** A draft has produced no effects, so there is nothing to reverse — delete it
  instead.
- **It has been revised.** Unrevise it first; see [Revise and unrevise](/platform/governance/revise-and-unrevise).
- **It is waiting on an approval.** Let the cycle finish, or revoke the request, and then cancel.
- **Another cancel document already cancelled it.** The message names the cancellation that got there
  first.
- **Its fiscal period is closed.** Reversing effects is a transaction like any other, and a closed
  period refuses it — see [Fiscal Period Control](/platform/governance/fiscal-period-control-guide).
- **Another document was created from it.** If a delivery was raised from the order, the order cannot
  be cancelled while that delivery exists; the message names the document that stands in the way.
  Cancel the downstream document first and work backwards.
- **The system generated it.** Documents the system produced automatically as the final step of
  another document are not cancelled on their own — cancel the document that generated them, and they
  go with it.
- **It has stock documents behind it that were not generated by the system.** An invoice whose goods
  left the warehouse on a manually entered issue voucher is refused, because cancelling the invoice
  would leave that voucher stranded. Where a business genuinely wants this allowed, the sales and
  purchase invoice and return terms carry a switch for it — **Allow Cancel Even If It Has Non-System
  Related Stock Documents** — and ticking it on the term the invoice uses lets the cancellation
  through.

## Putting the documents back

This is the part that makes a Document Cancel Document worth understanding: **deleting it undoes the
cancellation**. The documents it names are restored, and the switch on the header decides in what
state.

**Leave the switch off** — the default — and each document is committed again exactly as it was. Its
effects are recreated, its status goes back to **Stable**, and as far as the ledger is concerned the
whole episode never happened.

**Tick Restore Cancelled Doc As Draft After Deleting Cancel Document** and each document comes back as
a **draft** instead. Its effects stay reversed, the record becomes editable again, and it sits there
waiting to be corrected and re-saved. This is the closest thing Nama has to "give me that document
back so I can fix it", and it is the setting to reach for when the document was wrong rather than
unwanted.

Restoring is not a formality: each document is put through its normal save checks again. Required
fields, the validation rules configured for its type and its fiscal period are all re-examined, so if
the period has closed in the meantime, or the record no longer satisfies a rule that has been
tightened since, the deletion of the cancel document is refused and everything stays as it is.

::: tip Restore state is decided when you delete, not when you cancel
The switch is read at the moment the cancel document is deleted. If you cancelled with it off and
then decide you would rather have the documents back as drafts, open the cancel document, tick the
switch, save, and then delete it.
:::

## Changing your mind about part of a batch

A committed cancel document can be edited like any other document, and it behaves sensibly when you
do. Remove a row and that document is restored, following the same switch. Add a row and that document
is cancelled, subject to all the checks above. Everything you left alone stays as it was. So a
cancellation that swept up one document too many does not have to be deleted and rebuilt — just take
the row out and save.

## When the document went to a tax authority

On an installation that submits electronic invoices, the cancel document has a second life: it is
itself a submittable document. When the invoice it cancels had already been **sent** to the portal,
the cancellation is picked up by the e-documents submission alongside ordinary invoices and sent as a
cancellation request, carrying the cancel document's **Description** as the reason.

Two consequences follow, and both are worth knowing before somebody rings the support desk:

- **Tax authorities give you a window.** How long a submitted invoice may still be cancelled comes
  from the taxpayer configuration; where nothing is set, the system works to three days.
- **A cancellation the authority has already accepted cannot be taken back.** Once the portal has
  recorded the invoice as cancelled, deleting the cancel document is refused — the restore would put
  the invoice back in the system while the authority still holds it as cancelled. Issue a fresh
  document instead.

Electronic receipts and receipt returns that have already gone to the portal are a step stricter
again: they cannot be cancelled this way at all.

## Where this sits next to the other ways of freezing a document

Three mechanisms look similar from a distance and do quite different things:

| | What it does | How you undo it |
|---|---|---|
| **Revise** | Stamps a committed document as checked and locks it. Effects untouched. | Unrevise it |
| **Cancel** | Reverses the effects, keeps the document and its number, marks it Cancelled. | Delete the cancel document |
| **Delete** | Reverses the effects and removes the document, its attachments and its number. | Nothing — it is gone |

Cancelling is the middle path, and it is usually the right one: the effects go away, the evidence
stays. If you want the full picture of how a document gets from draft to live in the first place, the
[lifecycle section of What is Nama ERP](/getting-started/what-is-nama-erp) walks through it.

## Messages you may see

The first five are refused when you save the cancel document, reported per row so a batch tells you which document is at fault. The last is refused when you delete it.

| Message | Why | What to do |
|---|---|---|
| *Document {0} can not be cancelled, because it is still draft* — «المستند {0} لا يمكن إلغاؤه ، لانه لا يزال مسودة» | The named document was never committed, so it has produced no effects to reverse. | Delete the draft instead. |
| *Document {0} can not be cancelled because it is revised* — «المستند {0} لا يمكن إلغاؤه لأنه تمت مراجعته» | The document carries the revised stamp, which locks it. | Unrevise it, then cancel — see [Revise and unrevise](/platform/governance/revise-and-unrevise). |
| *Document {0} can not be cancelled, because it is system* — «المستند {0} لا يمكن إلغاءه, لانه نظامي» | The document was generated automatically as the final step of another document, so it has no life of its own. | Cancel the document that generated it; this one goes with it. |
| *The Document {0} is cancelled by {1}* — «تم إلغاء المستند {0} بمستند إلغاء {1}» | Another cancel document got there first and already holds that document. | Remove the row. If you want it back, delete the cancel document that is named. |
| *Document {0} can not be cancelled, because it has non system related stock documents* — «المستند {0} لا يمكن إلغاؤه ، لأن له سندات مخزنية مرتبطة ليست نظامية» | Goods moved on a stock voucher somebody entered by hand, and cancelling would leave that voucher stranded. | Deal with the stock voucher first, or tick **Allow Cancel Even If It Has Non-System Related Stock Documents** on the term the document uses. |
| *You cannot delete this record {0}, document {1} was cancelled at e invoice portal* — «لا يُمكنك حذف المستند {0} , لأن المستند {1} ملغي علي موقع الفاتورة الإلكترونية» | Deleting the cancel document is how a cancellation is undone, and the tax authority has already recorded the invoice as cancelled. | Leave it cancelled and issue a fresh document. |
