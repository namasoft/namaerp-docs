---
entities: [DocumentFile, MasterFile]
---
# Why a Record Will Not Save or Delete

"Why can't I delete this?" is the most-asked question in any ERP, and Nama answers it with a short
message that names the rule but not the way out. This page takes the refusals one by one — what the
system was protecting, and what a support agent actually does about it.

The checks run in a fixed order, and they are cumulative: a record can fail one, be fixed, and then
fail the next. It helps to know the order, because it tells you which answer to give first.

## Deleting: the checks, in the order they run

### 1. The record has been used somewhere, so it was locked

This is the one that surprises people, and the message is the least helpful in the product:

> Can not Delete this  record because it used in another record

It is raised for a small family of master files that the rest of the system depends on. The moment
any saved record *points at* one of them, Nama marks it as used — permanently, even if the record
that pointed at it is later deleted — and from then on it refuses to delete it.

Fifteen types behave this way:

| | |
|---|---|
| **Users and security** | User · Security Capability |
| **Dimensions** | Legal Entity · Sector · Branch · Department · Analysis Set |
| **Books and terms** | Document Book · Document Term · Doc Category |
| **Periods** | Fiscal Year · Fiscal Period |
| **Files** | Master Group · Customer · Supplier |

::: warning The mark is one-way on its own
Nothing clears the mark when the last user of the record goes away. A document book used once by a
document that was later deleted is still marked as used, and still refuses to be deleted.
:::

**The way out** is a hidden action that exists exactly for this. On the record's screen — or with the
rows selected in its list view — press **Ctrl + Alt + X** to bring out the advanced items, then open
the **More** menu and choose **cancelActivated**. The item carries no translated title, so it reads
as that word in both languages. It clears the used-mark and nothing else; the delete is then an
ordinary delete, subject to every other check on this page.

::: danger Clear the mark only when you know the record is genuinely unused
The mark is not a lie — something did point at this record once. Clearing it and deleting a book,
term or dimension that is still referenced leaves rows pointing at a record that no longer exists,
and those screens will fail to open. Check first: search the documents for the book, the term or the
dimension you are about to delete. The action needs the **Delete** permission on the type, so it is
not something an ordinary user stumbles into.
:::

### 2. The system generated this record, and generated it as final

> Record {0} can not be deleted, because it is generated final

The record was produced by another record — an entity flow, a document generated from a document —
and was marked final at the moment it was generated. Deleting it would break the chain that produced
it. Delete or cancel the record that generated it instead, and let the generator take its own output
back.

### 3. Something is built on this document

Two different messages, two different mechanisms:

> Cannot delete because there are transactions by the document {0}

The document has processed effects — ledger lines, stock movements, debt lines. It cannot simply
vanish; use a [Document Cancel Document](/platform/documents-and-records/document-cancel-document), which reverses the
effects and leaves a trace.

> Record {0} can not be deleted because it is used in {1}

An installment document whose installments have already been paid, or a record used by a specific
named record that the message points at. Open the record named in `{1}` first; if it is a payment,
undo the payment before the plan.

### 4. The user is not allowed to delete this kind of record, in this state

Four separate permissions decide a delete, and which one applies depends on the record's state:

| The record is | The permission checked | Refusal |
|---|---|---|
| A draft | **Draft Deletion Capability** on the [security profile](/platform/security/security-profiles) | *{0} can not be deleted because current user dos not have the authority for deleting drafts* |
| A draft, with **Delete Only Created Drafts** on | the same, plus authorship | *{0} can not be deleted because current user is not the creator of this draft* |
| Committed | **Can Delete** | *You do not have the authority {1} on entity {0}* (with `{1}` = Delete) |
| Approved | **Prevent Delete After Approval** | *Current user can not delete {0} after approval* |
| Printed at least once | **Prevent Delete After Print** | *Current user can not delete {0} after being printed* |

The last two are worth reading carefully, because they are *prevention* flags on the profile rather
than grants: ticking them takes the ability away from that profile, and a document that has been
printed once is then frozen for everybody who carries that profile.

Authorship for the draft rule is worked out from the action history if the record does not carry a
first author, so a draft whose history was purged behaves as though it has no owner and passes the
check.

### 5. The period is closed

> Can not delete transactions on closed periods

Nothing dated inside a closed fiscal period may be added, changed or deleted, unless an *Ignore
Closed Periods* rule covers you or the document type. The three layers — the period's own status,
the Fiscal Year Status Update rules that close it further, and the *Ignore Closed Periods* exceptions
that open it for chosen users or document types — are explained in
[Fiscal Period Control](/platform/governance/fiscal-period-control-guide).

### 6. The record is revised, prevented from usage, or in an approval cycle

These three freeze a record for deleting exactly as they freeze it for editing, and they are covered
in [Revise and Unrevise](/platform/governance/revise-and-unrevise),
[Prevent Usage](/platform/everyday-tools/prevent-usage) and
[Approvals](/platform/approvals/approvals-system).

## Editing: the same idea, different rules

An edit is refused by the life-cycle state of the record —
[the lifecycle page](/platform/documents-and-records/document-lifecycle#Editing-a-document-after-it-is-live) owns that
list — plus three rules that belong here:

**Another document was built on this one.** With **Prevent Editing Documents After Using In From
Doc** ticked on the [document term](/platform/documents-and-records/document-books), a document becomes read-only as soon
as anything is built on it, and the refusal names the culprit: *Record cannot be edited, because
{0}-{1} use this record in from doc*. The message is a clickable route to the term that imposed the
rule. To edit the document anyway, delete the document built on it first — or turn the term option
off if the rule was never wanted.

**The record is public and you are not.** *You can not change public records* means the record has
no legal entity (it is shared by all of them) while your user is tied to one. Public records are
edited by a user whose own legal entity is public. See [Dimensions](/getting-started/nama-erp-glossary)
for what a public record is.

**Someone else saved first.** *The record was modified by someone else, please refresh and re-enter
your changes* is Nama refusing to let your save quietly overwrite a colleague's. Reload, look at
what changed, redo your change on top. It is not a defect and it is not a lock — nothing needs
clearing, the save simply has to be repeated against the current version.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Can not Delete this  record because it used in another record* | One of the fifteen types above was pointed at by a saved record and is marked as used. The message has no Arabic translation, so it appears in English on Arabic screens. | Confirm nothing really uses it, then **Ctrl + Alt + X** → **More** → **cancelActivated**, and delete. |
| *Record {0} can not be deleted, because it is generated final* — «لا يمكن حذف السجل {0} لأنه خاص بالنظام» | The record was generated by another record as final output. | Delete or cancel the record that generated it. |
| *Record {0} can not be deleted because it is used in {1}* — «لا يمكن حذف السجل {0} حيث انه مستخدم في {1}» | A named record — typically a payment against an installment plan — depends on this one. | Open the record named in the message and undo it first. |
| *Cannot delete because there are transactions by the document {0}* — «لا يمكن الحذف لوجود حركات بواسطة المستند {0}» | The document has processed effects in the ledger or the warehouse. | Cancel it with a Document Cancel Document instead of deleting. |
| *Cannot delete as {0} value is paid* | A point-of-sale payment has been taken against this document. | Reverse the payment first. |
| *{0} can not be deleted because current user dos not have the authority for deleting drafts* — «لا يمكن حذف {0} لأن المستخدم الحالى لا يملك صلاحية حذف المسودات» | **Draft Deletion Capability** is not granted on the profile. | Grant it on the security profile, or have someone who has it delete the draft. |
| *{0} can not be deleted because current user is not the creator of this draft* — «لا يمكن حذف {0} لأن المستخدم الحالى ليس هو منشئ المستند» | **Delete Only Created Drafts** is on, and this draft was entered by somebody else. | Its author deletes it, or the option is relaxed for that profile. |
| *You do not have the authority {1} on entity {0}* — «لا توجد لديك الصلاحية {1} على النوع {0}» | The profile's line for this type does not grant the named permission. | See [security profiles](/platform/security/security-profiles) — the row that decides is chosen by type, then type list, then wildcard. |
| *Current user can not delete {0} after approval* — «لا يمكن للمستخدم الحالي حذف {0} بعد الموافقة» | The document completed its approval cycle and the profile has **Prevent Delete After Approval** ticked. | Untick it for that profile, or cancel the document instead. |
| *Current user can not delete {0} after being printed* — «لا يمكن للمستخدم الحالى حذف {0} بعد طباعته» | The document has been printed and the profile has **Prevent Delete After Print** ticked. | Untick it for that profile, or cancel the document instead. |
| *Can not delete transactions on closed periods* — «لا يمكن حذف مستندات في فترة مغلقة» | The document's date falls in a closed period. | Reopen the period, or use the *Ignore Closed Periods* permission where policy allows. |
| *Record cannot be edited, because {0}-{1} use this record in from doc* — «لا يمكن تعديل السجل لأن {0} - {1} يستخدم هذا السجل في بناءا على» | The term option **Prevent Editing Documents After Using In From Doc** is on, and the named document was built on this one. | Delete the dependent document first, or turn the term option off. |
| *You can not change public records* — «لا يمكنك تعديل السجلات العامة» | The record belongs to no legal entity; your user belongs to one. | Edit it with a user whose legal entity is public. |
| *Can not use record {0}-{1}, usage is prevented* — «لا يمكن استعمال السجلات التي تم منع استعمالها {0}-{1}» | A field points at a record that has been retired with Prevent Usage. | Pick a live record, or relax the rule — see [Prevent Usage](/platform/everyday-tools/prevent-usage). |

## See also

- [The Life of a Document](/platform/documents-and-records/document-lifecycle) — the states these rules are defending
- [Messages and Refusals](/platform/documents-and-records/messages-and-refusals) — the messages every screen can raise
- [Security Profiles](/platform/security/security-profiles) — where every permission named here lives
- [Fiscal Period Control](/platform/governance/fiscal-period-control-guide) · [Prevent Usage](/platform/everyday-tools/prevent-usage) · [Revise and Unrevise](/platform/governance/revise-and-unrevise)
- [Document Cancel Document](/platform/documents-and-records/document-cancel-document) — the supported way to undo a committed document
