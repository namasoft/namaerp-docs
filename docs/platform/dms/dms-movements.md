---
description: "The Document Movement and Folder Movement documents that record checking archived documents in and out, the document book they need, and what committing does."
entities: [DMSDocMovement, DMSFolderMovement]
menu: Basic → Document Management System → Document Movement
---
# Checking Documents In and Out

Paper leaves the archive. Somebody borrows the original contract for a court hearing, the auditor
takes the licence file for a week, a deed is handed over permanently when a property is sold. The
movement vouchers are how you keep a record of that.

A movement is a **document**, not a master file, so it behaves like an invoice: it needs a
document book, it has an issue date and a value date, it can be saved as a draft, and it takes
effect when you commit it.

::: tip Create a book before you start
Document Movement has no book out of the box. Until somebody creates one — a
[document book](/platform/global-config/global-config-documents) whose type is Document
Movement — nobody can record a single movement. This is the usual reason the screen appears
unusable on a fresh installation.
:::

## Recording a Document Movement

![A Document Movement recording a temporary check-out, with Exit Details enabled and Moving Details greyed out](../../ar/platform/dms/images/dms-doc-movement-out-en.png)

The header describes the movement as a whole:

| Field | Arabic label | What it is for |
|---|---|---|
| **Document Code** | الكود | The book and the voucher number. |
| **Issue Date** / **Value Date** | تاريخ الإصدار / التاريخ الفعلي | The value date is what lands on the history rows, and it must fall in an open fiscal period. |
| **Movement Type** | نوع الحركة | The kind of movement. Drives the whole screen — see below. |
| **Document Owner** | مالك المستند | Limited to **Customer** or **Employee**. Filling it narrows the document picker to that owner's paperwork. |
| **Movement Destination Or Source** | اتجاه أو مصدر الحركة | Who the paper is going to, or coming from. **Customer**, **Employee** or **Third Party**. |
| **Responsible Employee** | الموظف المسئول | Who authorised or performed the movement. Copied onto every history row. |
| **Attachment** | مرفق | Room for the signed hand-over slip. |

### Movement types

| Type | Arabic | Use it when | Resulting state |
|---|---|---|---|
| **DMS In** | دخول | Paper comes back to the archive | Inside |
| **DMS Out** | خروج | Paper leaves the archive | Depends on the exit type below |
| **DMS Transfer** | نقل | Paper moves to another shelf | Inside |

Choosing **DMS Out** enables the **Exit Details** group and pre-selects an exit type of Temporary
for you:

| Exit type | Arabic | Meaning | Resulting state |
|---|---|---|---|
| **Temporary** | مؤقت | Borrowed, expected back on the Expected Return Date | Temporary Out |
| **Final** | نهائي | Issued out for good | Final Out |
| **Disposal** | تخلص | Destroyed or shredded | Disposed |

Choosing **DMS Transfer** instead enables the **Moving Details** group, where you name the
destination archive, sub location and detailed location. The exit fields are greyed out unless the
type is DMS Out, and **To Location** and **To Sub Location** are greyed out unless it is DMS Transfer.

![A DMS Transfer movement, with the Moving Details group filled in and the Exit Details group greyed out](../../ar/platform/dms/images/dms-doc-movement-transfer-en.png)

### Listing the documents

Add one row per document in the **Details** grid. The document picker is aware of what you are
doing: for a check-in it offers only documents that are not already inside, for a transfer only
documents that are Initial or Inside, and if you filled in the header owner it shows only that
party's paperwork and documents that have no owner.

For anything more than a handful of rows, use **Get Documents / تجميع المستندات**. It asks for a
folder and pulls in every document filed there — including anything filed there as a binder —
pre-filling each row's current position.

::: warning Always answer the folder question
The folder is optional, and leaving it empty loads **every document in the system** into the grid.
On a real archive that is thousands of rows. It also ignores document state, so documents that are
already checked out are pulled in alongside the rest.
:::

## What Committing Actually Does

When you commit a Document Movement, two things happen for each row (a row whose document is already
on the same voucher is refused with *This Document {0} is already added*):

1. A **history row** is written against the document, recording the movement type, the value date,
   the responsible employee and the document's archive position.
2. The document's **state** is updated according to the table above.

That is the whole of it. In particular, a Transfer never changes where the document itself says it is:

::: info A Transfer records the move; the document keeps its position
The destination you type into Moving Details is stored on the voucher. A Transfer never updates the
document's own Location, Sub Location and Detailed Location, and the history row records the
position the document moved *from*.

So after transferring a licence from shelf A-01 to B-01, the document still reads A-01, and so
does its history row; B-01 is written on the transfer voucher.

To have the document show its new shelf, open it and update its position fields. For a large
transfer, an [import](/platform/import-export/importing-records) of the new positions is faster
than editing them one at a time.
:::

A committed movement can be corrected. Editing it rewrites each row's history row from the edited
voucher and sets the document's state again. A row you remove loses its history row, and that
document's state is set back from its latest remaining movement by value date, or to **Inside**
when it has none. Deleting a committed movement does the same for every row.

## Folder Movement

To move every document filed in a folder at once, record a **Document Movement** and fill its
grid with **Get Documents** (above): it loads the folder's documents, including those filed there
as a binder, with each row's current position.
