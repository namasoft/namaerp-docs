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

The state is filled in by the system and only reports what the last movement said; it does not
stop anything. See [Document States](/platform/dms/dms-documents#Document-States).

## What This Sub-Module Does Not Do

Worth knowing before you design a process around it, because each of these is a reasonable thing
to expect and none of them is there:

- **No expiry reminders.** A document carries a Renewal Date and an Expiration Date, but DMS sends
  no alert or notification of its own. If you need to be warned that a
  licence lapses next month, build it yourself with a [scheduled task](/platform/automation-and-rules/scheduled-tasks)
  over a filtered list.
- **No searching inside files.** You can find documents by folder, topic, owner, archive or code.
  You cannot search the *contents* of the attached scans.
- **No per-folder permissions.** There is no access control specific to a folder or a topic. DMS
  uses the ordinary [security profiles](/platform/security/security-profiles) like any other
  entity; the closest thing to per-folder access is a row filter on the profile.
- **No physical relocation.** A **Transfer** movement writes the destination on the voucher only;
  the document keeps its own Location, Sub Location and Detailed Location until you edit them. See
  [What Committing Actually Does](/platform/dms/dms-movements#What-Committing-Actually-Does).
- **No reports.** Nothing ships for DMS — no printed form, no dashboard. Use the ordinary
  [list views](/platform/list-views/) and exports.

## Where to Start

If you are setting DMS up for the first time, build it in this order — each step depends on the
one before it:

1. **Archives first.** Create your DMS Locations and list their shelves and drawers, because
   folders and topics both point at them. See
   [Archives, Folders and Topics](/platform/dms/dms-filing-structure).
2. **Then the folder tree**, working top-down, and remember to clear *Accepts Elements* on any
   folder that is meant to hold other folders rather than documents.
3. **Then topics**, tying each one to the folder and archive it belongs with.
4. **Then a movement book**, if you intend to track borrowing at all — Document Movement is a
   document, so it needs a book before anyone can record anything. See
   [Checking Documents In and Out](/platform/dms/dms-movements).
5. **Finally the documents themselves**, either one at a time or in bulk from a ZIP file.

Only after that is it worth turning on the setting that adds a **DMS Documents** page to your
customer, supplier and employee screens — covered in
[Settings and Integration](/platform/dms/dms-configuration).
