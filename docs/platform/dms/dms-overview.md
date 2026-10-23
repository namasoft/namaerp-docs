---
description: "Overview of the Document Management System: its seven screens (archives, folders, topics, archived documents, document and folder movements, ZIP import), the basic-dms licence and how a document moves."
---
# Document Management Overview

Most of what an ERP stores is data you typed. But every business also has a room full of paper
it cannot throw away — signed employment contracts, commercial registrations, title deeds,
customer agreements, copies of national IDs. Somebody has to know which cabinet each one is in,
who borrowed the original last March, and when the licence needs renewing.

That is what the Document Management System is for. It is best understood as **a register of
physical paperwork that happens to carry scans**, rather than a place to dump files. Nama already
lets you attach a file to any record; DMS exists for the documents that also have a physical life
— a shelf, a custodian, a borrowing history.

Keeping that distinction in mind explains almost every design decision on the screens that follow.

## The Two Halves

The seven screens divide cleanly in two.

**The filing structure** answers *where does paperwork live*. You build it once, at
implementation time, and rarely touch it again:

- **DMS Location / أرشيف** — a physical archive: a room, a strong room, a cabinet bank. Each one
  carries a catalogue of the slots inside it.
- **DMS Folder / مجلد** — the logical filing tree: Company Documents → Employee Files →
  Employment Contracts.
- **Document Management System Topic / موضوع المستند** — the subject classification: "Employment
  Contract", "Licence", "Identity Document".

**The day-to-day records** answer *what do we have and who has it*:

- **DMS Document / مستند أرشيفي** — one archived document. The heart of the sub-module.
- **Document Movement / حركة المستند** — the voucher recording that documents left the archive,
  came back, or were moved.
- **Folder Movement / حركة المجلد** — the same idea applied to a whole folder at once.
- **Compressed File To DMS Document / ملف مضغوط إلى مستندات أرشيفية** — a bulk loader that turns
  one ZIP file into many documents.

All seven live together under **Basic → Document Management System / الأساسيات ← إدارة المستندات**,
and all seven are gated behind the same licence code, `basic-dms`. If the menu section is missing
entirely, the licence is the first thing to check.

## How a Document Moves Through the System

The everyday cycle is short. A new document is registered, filed into a folder, given a topic and
a shelf, and saved — at which point it sits in the **Initial** state. From then on its state is
driven only by committed movement vouchers: check it out and it becomes **Temporary Out**, bring
it back and it returns to **Inside**.

::: tip The state is a label, not a lock
The document state is filled in by the system and cannot be edited by hand — but it also does not
*restrain* anything. A document marked **Disposed** can still be edited, moved again, or deleted.
Treat the state as a report of what the last movement said, not as a control that will stop
somebody doing the wrong thing.
:::

## What This Sub-Module Does Not Do

Worth knowing before you design a process around it, because each of these is a reasonable thing
to expect and none of them is there:

- **No expiry reminders.** A document carries a Renewal Date and an Expiration Date, but DMS sends
  no alert or notification of its own. If you need to be warned that a
  licence lapses next month, build it yourself with a [scheduled task](/platform/automation-and-rules/scheduled-tasks.md)
  over a filtered list.
- **No searching inside files.** You can find documents by folder, topic, owner, archive or code.
  You cannot search the *contents* of the attached scans.
- **No per-folder permissions.** There is no access control specific to a folder or a topic. DMS
  uses the ordinary [security profiles](/platform/security/security-profiles.md) like any other
  entity; the closest thing to per-folder access is a row filter on the profile.
- **No physical relocation.** This one surprises people, so it has its own warning below.
- **No reports.** Nothing ships for DMS — no printed form, no dashboard. Use the ordinary
  [list views](/platform/list-views/) and exports.

::: warning A Transfer records an intention, not a result
Transferring documents to another shelf writes the destination onto the movement voucher, and
records the movement in the document's history — but it does **not** update the document's own
Location, Sub Location or Detailed Location. Move a contract from shelf A-01 to B-01 and the
document still reads A-01 afterwards.

So treat Transfer as a log of what somebody did physically, and **edit the
document's location fields yourself** to keep the register truthful. The same caution applies to
the History tab, which records where a document came *from*, never where it went *to*.
:::

## Where to Start

If you are setting DMS up for the first time, build it in this order — each step depends on the
one before it:

1. **Archives first.** Create your DMS Locations and list their shelves and drawers, because
   folders and topics both point at them. See
   [Archives, Folders and Topics](/platform/dms/dms-filing-structure.md).
2. **Then the folder tree**, working top-down, and remember to clear *Accepts Elements* on any
   folder that is meant to hold other folders rather than documents.
3. **Then topics**, tying each one to the folder and archive it belongs with.
4. **Then a movement book**, if you intend to track borrowing at all — Document Movement is a
   document, so it needs a book before anyone can record anything. See
   [Checking Documents In and Out](/platform/dms/dms-movements.md).
5. **Finally the documents themselves**, either one at a time or in bulk from a ZIP file.

Only after that is it worth turning on the setting that adds a **DMS Documents** page to your
customer, supplier and employee screens — covered in
[Settings and Integration](/platform/dms/dms-configuration.md).
