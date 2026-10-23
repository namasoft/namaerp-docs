---
description: "How to restore a deleted record from the Recycle Bin (what lands there, restoring, who can use it, emptying it) and how to find any record by code with the All Records screen."
entities: [EntityVersion, EntitySystemEntry]
---

# Recovering and Finding Records

Sooner or later a customer calls to say that an invoice, an item or a whole entity flow has
vanished. Usually it has not vanished at all: somebody deleted it, and Nama ERP kept a copy. Two
screens under **Administration → Other** answer the two questions that follow — *"what was deleted,
and can we get it back?"* (the **Recycle Bin**) and *"does this record exist anywhere, under any
type?"* (**All Records**).

## The Recycle Bin

### What lands there

Every time a record is deleted, the system stores a complete copy of it as it stood at that
moment, together with who deleted it and when. This applies to every kind of record — documents,
master files, and configuration records such as document terms, entity flows or translation
overrides alike. A draft that was never committed is kept too.

Two things never reach the bin, because they are not deletions:

- A **cancelled** document. Cancelling (through a Document Cancel Document) keeps the document in
  place with the *Cancelled* status; it is still in its own list and in **All Records**.
- A delete that was **sent for approval** and not yet approved. The record is still alive until the
  approval completes.

Open **Administration → Other → Recycle Bin**. Each row is one deleted record:

| Column | What it tells you |
|---|---|
| **Author** | The user who deleted it. |
| **Entity Type** | The kind of record — Sales Invoice, Customer, Entity Flow… |
| **Owner Code** | The record's code at the moment it was deleted. |
| **Version Number** | Which saved version of the record the deletion was. |
| **Date** | When it was deleted. The list is sorted by this column. |

You can filter on all five columns. If your administrator has grouped entity types into an
**EntityType List** marked to be used as a module, a **Module** quick filter appears along the top,
so "everything deleted from Sales last week" is two clicks away.

### Looking before you restore

Select a row and choose **More → Preview Deleted Record**. The record opens on its own screen
exactly as it was when it was deleted, lines and all, so you can confirm
it is the right one before bringing it back.

### Restoring

Select one or more rows and choose **More → Restore Deleted Record**. Each record is brought back
under its **original code** and saved again through the normal save, which means:

1. Every check a normal save runs, runs again. If the period has been closed since, or another
   record has taken the code in the meantime, the restore is refused with the same message an
   ordinary save would show. Fix the cause and restore again.
2. Its effects are recreated. A restored invoice is processed again, so its ledger and stock
   effects come back with it.
3. If the record's type is under an approval, the restored record enters the approval cycle like
   any new save, rather than becoming final at once.
4. When you restore a single record, its screen opens straight away. When you restore several, the
   list simply refreshes.

A restored record leaves the bin. If it is deleted again later, it returns to the bin as a new row.

::: tip "My customer deleted it by mistake an hour ago"
Filter **Owner Code** on the code they give you, or **Entity Type** plus **Date** if they do not
remember the code. Preview it, then restore it. Nothing else needs to be re-entered.
:::

### Who can use it

The Recycle Bin is an ordinary list in the Administration menu, so the usual tools decide who sees
it. To keep a role out of it, block the list view **recycleBin** on the **Configuration Group** type
in that role's [List View Security](/platform/security/field-page-listview-security#List-View-Security),
or remove the entry from their menu — see [Who Sees Which Menu](/platform/menus/menu-visibility).

### How long things stay, and emptying the bin

Nothing in the bin expires. Every deleted record stays there, restorable, until the bin is emptied —
and there is no button on the screen to remove an entry permanently. Emptying is a database job:
the *Cleanup Utility* script in
[Database Operations](/admin/reprocessing/db-operations#Cleanup-Utility-for-Recycle-Bin-Action-History-Notifications-and-Pending-Tasks)
does it when run with its recycle-bin flag set. It removes **every** deleted record at once, along
with all the earlier saved versions of those records, and what it removes cannot be restored. Run
it only after a backup, and only when the customer accepts that nothing deleted so far can come
back.

## All Records

**Administration → Other → All Records** is the opposite view: one list containing every record
that currently exists in the system, of every type, one row each. It is the place to start when you
have a code, a name or a date but do not know which screen the record lives on.

The columns cover what every record has in common: the type, code and name, the legal entity,
branch, sector, department and analysis set, the **File Status** (draft, committed, cancelled…),
the **Value Date**, book, term and group, the **First Author**, the **Creation Date** and the
**Last update Date**. The filters add the **Actual Code**, the **English Code**, the **Module**, and
whether the record is a master file or a document. Open any row to jump straight to that record on
its own screen.

Two actions under **More** work on the selected rows, whatever their types:

- **ReCommit From All Records View** saves each selected record again, so its effects are rebuilt.
  Tick **Stop With First Error** to halt at the first record that fails; leave it unticked to carry
  on and get a list of every failure at the end.
- **ReReplicate Any** sends each selected record to the other sites again, for installations that
  use Replication.

A record that is not in All Records does not exist any more. Look for it in the Recycle Bin.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Please Select Rows* — «من فضلك اختر السجلات أولا» | An action under **More** was pressed with no row selected. | Tick the rows first. |
| *You can not delete cancelled Document {0}* — «تم الغاءالمستند {0} فبالتالي لا يمكن حذفه» | Cancelled documents cannot be deleted, so they never reach the bin. | Nothing to recover — the document is still in place with the Cancelled status. |
| *You cannot delete {0} because it is awaiting approval.* | A delete for this record is already waiting for approval. The message has no Arabic translation, so it appears in English on Arabic screens. | Finish the approval; the record reaches the bin only once the delete is approved. |

## See also

- [Why a Record Will Not Save or Delete](/platform/documents-and-records/why-a-record-will-not-save-or-delete) — the checks a delete must pass before anything reaches the bin
- [Document Cancel Document](/platform/documents-and-records/document-cancel-document) — the supported way to take a committed document back without deleting it
- [Database Operations](/admin/reprocessing/db-operations) — the cleanup script that empties the bin
