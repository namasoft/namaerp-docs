---
entities: [DocumentFile]
---
# The Life of a Document: Draft, Commit, Approval, Revise, Cancel

Every screen in Nama has a **Save** button and a **Draft** button, and every document in the system
moves through the same short life: it is started as a draft, committed into a real document,
possibly routed for approval, possibly signed off by a reviewer, and — if it turns out to be a
mistake — cancelled. Master files travel a shorter version of the same road.

Most of the refusals users meet in a day are this life cycle saying no. *Can not edit a commited
document*, *Can not edit while under Approval*, *Can not operate on revised record*, *Draft not
started, can not commit* — none of them is about the screen the user is on. They are about which
stage the record has reached and what that stage allows. This page is the map.

## Saving happens in two steps, always

When a user presses **Save**, two things happen in quick succession: Nama writes the record as a
**draft**, then **commits** it. The draft step stores what was typed with almost no questions
asked; the commit step is where the system checks the record, numbers it properly, and lets it
loose on the rest of the business.

The two steps exist because they are useful separately. Pressing **Draft** instead of **Save**
stops after the first one: the record is stored, it has an id, it appears in list views, it can be
reopened tomorrow — and it has done nothing. No journal entry, no stock movement, no debt against
the customer, no effect on any report that counts real business.

That is the single most important thing to know about a draft: **a draft is written down, not
counted**.

::: tip A draft is a real row, and someone has to clean it up
Drafts are not scratch paper the system throws away. They sit in the table, they show up in list
views with their status, and they stay there until a human commits or deletes them. A screen full
of week-old drafts is a housekeeping problem, and on the point of sale it becomes
[a critical error at login](/admin/troubleshooting/critical-errors) — POS documents that fail are
kept as drafts on purpose so that nothing is lost.
:::

A draft's number is provisional too. By default it comes from a separate draft series and ends in
`@draft`, and the real number is issued at commit — which is why the number a user writes down off
a draft is usually not the number the document ends up with.
[Drafts and their numbers](/platform/documents-and-records/document-books#Drafts-and-their-numbers) explains that, and the
book option that changes it.

## What the commit step actually does

Committing is where the work happens, in this order:

1. **The licence is checked** — not on every single save, but often enough that an over-committed
   licence stops a save rather than a login.
2. **Validation runs** — mandatory fields, lengths, references that must exist,
   [required fields](/platform/governance/required-fields) rules, and any
   [criteria-based validation](/platform/governance/criteria-based-validation) written for this screen.
3. **The record is numbered** from its [document book](/platform/documents-and-records/document-books) or
   [master group](/platform/documents-and-records/master-groups), replacing the provisional draft code.
4. **Approvals are consulted.** If an approval definition matches, the document does not become
   live — it goes to **Approval Pending** and waits. See
   [Approvals](/platform/approvals/approvals-system).
5. **Effects are requested.** A committed document does not write the ledger itself; it raises a
   **business request** that is processed in the background, which is what makes the save feel
   instant and a failure retryable. See
   [Business Requests](/platform/background-processing/business-requests).

If step 2 or 4 refuses, the record stays exactly where it was — a draft if it was a draft, its
previous committed version if it was already live. Nothing is left half-saved.

::: warning A committed document can still have failed
Commit and processing are two different moments. A document can be perfectly committed and its
ledger effect can fail minutes later. The document's fields look exactly as before, but its header
shows the status of the first request that is not yet processed — **Processing Failed** or
**Failed By Exception** — in place of the document status. The exception is a sales or purchase
invoice whose stock effect failed: that effect belongs to the Stock Issue or Stock Receipt the
invoice generated, and only that document's header shows it. The place that lists every failure is
the Business Requests list view (see
[Fixing a Failed Business Request](/admin/troubleshooting/failed-business-requests)); the place that
shouts about it is the critical-errors list at login — *There are {0} failed requests, please contact our support team and provide them the following message: SYSFRQS is {1}*.
:::

## The status a document carries

Every document has a **Document File Status** (حالة المستند) field, and list views can show it as a
column. It has six possible values and no others:

| Status | Arabic | What it means |
|---|---|---|
| **Draft** | مسودة | Written down, not counted. Editable and deletable by whoever has the authority for drafts. |
| **Approval Pending** | بانتظار موافقة | Committed but waiting for someone to approve it. Not yet effective. |
| **Approval Returned** | تم الإرجاع | An approver sent it back for changes. Editable again. |
| **Approval Rejected** | تم الرفض | An approver refused it. A rejected document that was never live cannot be edited at all. |
| **Stable** | ثابت | A normal, live, committed document. This is where documents spend their lives. |
| **Cancelled** | ملغي | Cancelled by a [Document Cancel Document](/platform/documents-and-records/document-cancel-document). The effects have been reversed; the record and its number stay. |

Two flags sit beside the status and explain most of the rest of this page:

- **Draft Created** (تم إنشاء مسودة) — the first step happened. A record whose draft was never
  started cannot be committed, which is what *Draft not started, can not commit* means.
- **Commited Before** (تم الحفظ مسبقا) — this record has been live at least once. It is the flag
  that separates "a draft I am still writing" from "a document I am correcting", and the two are
  governed by different permissions: **Delete Draft** for the first, **Delete** for the second.

## Editing a document after it is live

Most documents can be edited after they are committed. The edit re-runs validation, re-raises the
effects, and may start a new approval cycle. Some document types refuse outright with *Can not edit
a commited document*, because their type says corrections are made by another document rather than
by rewriting history.

Three settings and one state tighten this further:

- **Prevent Editing After From Doc** on the [document term](/platform/documents-and-records/document-books) stops editing
  a document once another document has been built on it — the receipt you already invoiced, the
  order you already delivered. The refusal names the document that is blocking you: *Record cannot
  be edited, because {0}-{1} use this record in from doc*.
- **An open approval cycle** blocks editing unless the approval definition allows it; see
  [Approvals](/platform/approvals/approvals-system) for *Allow Modify While Under Approval* and the
  per-step policy.
- **Revising** freezes the record deliberately. Unrevise it first — see
  [Revise and Unrevise](/platform/governance/revise-and-unrevise).
- **A closed fiscal period** refuses any transaction dated inside it, however the document got
  there; see [Fiscal Period Control](/platform/governance/fiscal-period-control-guide).

For everything the system checks when an edit or a delete is refused, and the way out of each one,
see [Why a Record Will Not Save or Delete](/platform/documents-and-records/why-a-record-will-not-save-or-delete).

## There is no un-commit

Nothing in Nama turns a live document back into a draft. The **Draft** button greys out on a
committed document and stays that way. When a committed document is wrong the routes are: edit it if
its type allows, cancel it with a
[Document Cancel Document](/platform/documents-and-records/document-cancel-document), or reverse it with the document the
business would normally use — a return, a credit note, a reversing journal entry.

::: tip Cancelling is itself reversible
A Document Cancel Document is a document, so deleting it takes the cancellation back — and it can
restore the documents it cancelled as drafts, if it was told to.
:::

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Draft not started, can not commit* — «لم يتم بدء مسودة. لا يمكن الحفظ» | Something asked the system to commit a record that was never drafted. Users do not normally meet it; integrations, imports and API calls that skip the draft step do. | Save the record from the screen, or fix the integration so that it drafts before committing. |
| *Element is not drafted, can not commit* — «لم يتم بدء المسودة. لا يمكن انهاء عملية الحفظ» | The same condition, caught one layer deeper. | As above. |
| *Can not save draft for documents after first save* — «لا يمكن حفظ مسودة للمستندات بعد الحفظ الطبيعي» | Someone pressed **Draft** on a document that has already been committed once. There is no un-commit. | Edit and save the document, or cancel it. |
| *Can not edit a commited document* — «لا يمكن تعديل مستند منتهي» | This document type does not allow editing after the first commit. | Correct it with the document the business uses for corrections, or cancel it and enter a new one. |
| *Can not edit a rejected document* — «لا يمكن تعديل مستند مرفوض» | The document was rejected in its approval cycle and was never live. | Enter a new document; a rejected draft cannot be rewritten into an accepted one. |
| *Can not edit while under Approval* — «لا يمكن التعديل أثناء الموافقات» | The document is in an approval cycle whose definition does not allow modification while it is pending. | Wait for the decision, or turn on **Allow Modify While Under Approval** on the approval definition if editing mid-cycle is really wanted. |
| *Can not edit while under Approval for step {0}* — «لا يمكن التعديل أثناء انتظار الموافقة للخطوة {0}» | Modification is allowed on this definition, but the step that is now waiting forbids it. | Wait for that step, or change that step's *Modify While Under Approval* policy. |
| *Can not operate on revised record {0}* — «لا يمكن التعامل مع السجل {0} لانه تمت مراجعته» | The record is revised, and revising freezes it. | Unrevise it, make the change, revise it again. |
| *The record was modified by someone else, please refresh and re-enter your changes* — «لقد تم تعديل السجل بواسطة شخص آخر. فضلا قم بتحديث السجل و أعد إدخال التعديلات المطلوبة» | Two users opened the same record and the other one saved first. Nama will not let the second save overwrite the first silently. | Reload the record, look at what changed, and re-enter your own change on top. |
| *Code {0} exists before for record with id {1}* — «الكود {0} موجود مسبقا للسجل بالمعرف {1}» | The code is already taken. It surfaces at draft time on books with **Use Next Real Number For Drafts**, and at commit time otherwise. | Let the book number the record, or pick a free code. |

## See also

- [Document Books and Terms](/platform/documents-and-records/document-books) — numbering, and the term options named here
- [Why a Record Will Not Save or Delete](/platform/documents-and-records/why-a-record-will-not-save-or-delete) — the edit and delete refusals in full
- [Messages and Refusals](/platform/documents-and-records/messages-and-refusals) — the messages any screen can raise
- [Approvals](/platform/approvals/approvals-system) · [Revise and Unrevise](/platform/governance/revise-and-unrevise) · [Document Cancel Document](/platform/documents-and-records/document-cancel-document)
- [Business Requests](/platform/background-processing/business-requests) — where a committed document's effects are processed
