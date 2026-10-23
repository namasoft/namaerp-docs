---
description: "Utilities that act on a list of records read from a text file on the server: recommit, re-replicate, delete, regenerate ledger or inventory effects, export to another server, and compare two files."
---
# Batch Utilities That Work From a List File

Some repairs are the same action applied to hundreds of records: recommit these 800 invoices, delete these 40 drafts, send these 300 records to the new server again. Doing that by hand from the list view is slow and leaves no trail of what was done. The utilities on this page do it from a plain text file instead — one record per line — and keep a second file listing every line that succeeded, so a run that stops halfway can be started again without repeating the work.

::: danger These utilities change data in bulk
Each one acts on every record in the file, with no confirmation per record. **Delete From File** deletes for good, and unrevises revised documents first so that nothing stops it. Take a backup before any run that changes data, and test the file on two or three lines first.
:::

## Before you run any of them

**Who can run them.** The links work only for a user who is signed in to that server and who is either the `admin` user or has **Allow Access to Admin Restricted Functionality (utils.html, kill tasks, logout users and so on)** ticked — see [Treat As Admin](/platform/security/users-and-login#Treat-As-Admin). Anyone else gets *You are not admin*.

**How to start one.** Each utility below is a launcher link: fill the boxes, set the customer's server address once, then copy the link and open it in a browser tab that is signed in to that server. How the launcher works is described under [Launcher links on these pages](/admin/reprocessing/#Launcher-links-on-these-pages).

**The files live on the server.** The paths (`e:/rc/recommit.txt` and so on) are read on the machine the application server runs on, not on your PC. Create the folder there and put the main file in it before you start.

**The main file.** One record per line: the entity type, a comma (or a tab), and the record's ID — the internal identifier, not its code. A query is the usual way to produce it, for example:

```sql
select entityType, id from SalesInvoice where commitedBefore = 1 and valueDate >= '20260101'
```

Paste the result into the file as it comes out of the query window (tab-separated is fine). The two export utilities are the exception: they take the record's **code** in the second column, not its ID.

**The done file and the errors file.** Every line that succeeds is appended to the done file, and every line already in the done file is skipped. That is what makes these utilities safe to start again: run the same link a second time and it carries on from where it stopped. A line that fails is not added to the done file; its error — the message the record raised, or the technical trace — goes to the errors file. The errors file is rewritten on every run, so read it before you start the next one.

**One run at a time.** While a utility is running, starting it again is refused with a message in English that begins *Please wait until running util of* and ends with the utility's name and *is finished*. Progress — *Finished 120 of 5000* — is reported as a running task, and a run that is stopped as a task stops before the next line.

## Recommit From File

Recommits every record in the file — the same as the **Recommit** action on one record: the record is saved again as it is, and its effects (ledger, inventory, entries) are produced again from what it holds now. Use it after a fix — a corrected configuration, a corrected entity flow, an SQL repair on the lines — when a known set of records must pick up the change. Safe to run again: lines in the done file are skipped.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.RecommitFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/recommit.txt' },
{ title: 'Done File', default: 'e:/rc/done.txt' },
{ title: 'Errors File', default: 'e:/rc/errors.txt' }
]" :gui = "true"
/>

## Re-Replicate From File

Sends every record in the file to the replication sites again, as if it had just been saved. Use it when a [site has missed records](/admin/reprocessing/replication.md) and you know which ones — the records themselves are not changed on this server. Safe to run again.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ReplicateFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/recommit.txt' },
{ title: 'Done File', default: 'e:/rc/done.txt' },
{ title: 'Errors File', default: 'e:/rc/errors.txt' }
]" :gui = "true"
/>

## Delete From File

Deletes every record in the file. A revised document is unrevised first and the delete confirmations are answered for you, so the only thing that stops a line is a real refusal — the record is referenced elsewhere, or a rule forbids deleting it — and that refusal goes to the errors file. Use it to clear a known set of test or wrongly imported records. **There is no undo**: take a backup first. Running it again simply skips what was already deleted.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.DeleteFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/delete.txt' },
{ title: 'Done File', default: 'e:/rc/done-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/delete-errors.txt' }
]" :gui = "true"
/>

## Regenerate Ledger From File — Accounting Effects

Rebuilds the accounting effect of every document in the file: a new ledger request is produced from the document as it stands and processed like any other. Use it when a known set of documents has a missing or wrong journal and recommitting them would do more than you want. For the whole ledger, use [Ledger and Debt Ages Reprocessing](/admin/reprocessing/reprocess-ledger-and-debt-ages.md) instead. Safe to run again.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.RegenAccFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/regen-ledger.txt' },
{ title: 'Done File', default: 'e:/rc/regen-ledger-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/regen-ledger-errors.txt' }
]" :gui = "true"
/>

## Regenerate Inventory Transactions From File

Produces the inventory transaction requests of every document in the file again and sends them for processing. It is one step of a longer repair — the full procedure, including the query that builds the file and the quantity reprocessing that must follow, is on [Inventory Utilities](/admin/reprocessing/inventory-utilities.md).

This one behaves differently from the others on this page:

- it works through the file 500 lines at a time, and a refusal from any document **stops the whole run** and undoes the current batch of 500;
- it cannot be stopped midway as a task;
- it skips lines already in the done file, but does not add to it, and it writes no errors file — a technical failure on one line is written to the server log and the run carries on. To resume after a stop, remove the lines already processed from the main file.

<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.plugnplay.RegenInvTransReqFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/regen-inv-trans.txt' },
{ title: 'Done File', default: 'e:/rc/regen-inv-done.txt' },
{ title: 'Errors File', default: 'e:/rc/regen-inv-errors.txt' }
]"
/>

## Export To Another Server From File

Copies every record in the file to another Nama ERP server. Each line is the entity type and the record's **code**. A record that was ever committed is saved and committed on the other server; a record that never was is saved there as a draft. The other server treats the record as if it had arrived by replication. Use it to move a set of master files or documents from one installation to another. Running it again sends the records not yet in the done file.

Fill **Export To Server URL** with the other server's address — the same address users type to reach it.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ExportToServerFromFileByWS"
:params="[
{ title: 'Main File', default: 'e:/rc/export.txt' },
{ title: 'Done File', default: 'e:/rc/export-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/export-errors.txt' },
{ title: 'Export To Server URL', default: 'http://localhost:7070/' }
]" :gui = "true"
/>

## Export To Another Server From File Using Excel Sheets

The same job as the previous utility, by a different route: each record is turned into the rows of an export sheet — the format the record import uses — and imported on the other server. Same file format (entity type and code), same done and errors files.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ExportToServerFromFileByExcel"
:params="[
{ title: 'Main File', default: 'e:/rc/export.txt' },
{ title: 'Done File', default: 'e:/rc/export-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/export-errors.txt' },
{ title: 'Export To Server URL', default: 'http://localhost:7070/' }
]" :gui = "true"
/>

## Get Not Committed — Compare Two Files

Changes nothing. It reads two files and shows, in the browser, every line of the first file that is not in the second. Point it at a main file and its done file and you get exactly the lines that have not gone through yet — paste them into a new main file to retry them, or to hand them to a different utility (to delete the records that refused to recommit, for example). Run it as often as you like.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.CompareTwoFiles"
:params="[
{ title: 'First File', default: 'e:/rc/recommit.txt' },
{ title: 'Second File', default: 'e:/rc/export-delete.txt' }
]" :gui = "true"
/>

## Related pages

- [Rebuilding Module System Entries](/admin/reprocessing/module-entries-rebuild-utilities.md) — the per-module utilities that empty and rebuild one set of entries.
- [Approval Repair Utilities](/admin/reprocessing/approval-repair-utilities.md)
- [Business Requests](/platform/background-processing/business-requests) — where one document's failed effect is fixed, without any of the tools on this page.
