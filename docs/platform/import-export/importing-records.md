# Importing Records

Importing is the mirror image of exporting: you hand the system a workbook, and it creates or updates records from it. It is how opening balances, item catalogues, customer lists and price changes get into a new installation — and how a bulk correction gets applied to four hundred existing documents without anyone opening four hundred screens.

The mechanism is deliberately unglamorous. There is no wizard and no column-matching step, because the file already says which column feeds which field. That is why the strong advice is always the same: **export first, then edit what you exported.** Starting from a file the system produced means the marker rows and headings are already right, and you only have to worry about the values.

If the correction you have in mind is the *same* new value on every record — one salesman for four hundred customers — there is a lighter tool that needs no file at all: see [Bulk Edit](/platform/list-views/bulk-edit). Import is the one to reach for when each record needs a different value, or when detail lines are involved.

## Starting an Import

Open the list screen for the records you want to load — customers, items, invoices — and choose **Import Records** (استيراد سجلات) from the **More** menu. The same command is available from the **More** menu of an open record, and it behaves identically: the file decides what is imported, not the screen you happened to be on.

The command only appears for users whose security profile grants **Can Import** on that entity type. See [Security Profiles](/platform/security/security-profiles.md).

## The Import Options

| Option | Arabic label | Default | What it does |
|---|---|---|---|
| **File** | الملف | — | The workbook or data file to import. |
| **Attachments** | المرفقات | — | The companion zip of attached files, if your sheet references any. A cell holding `remove-attachment` removes that record's attachment instead, and needs no zip (release 20261110 or later); an empty cell leaves it alone. |
| **Add** | إضافة | **On** | Allows rows that match no existing record to create one. Switch it off for an update-only run — then a row for a record that does not exist fails instead of quietly creating it. |
| **Update** | تحديث | **On** | Allows rows that match an existing record to overwrite it. Switch it off for an insert-only run, so an accidental re-upload cannot damage existing data. |
| **Ignore not found references** | تجاهل مراجع السجلات الغير موجودة | Off | Off, a row whose customer or item code cannot be found fails. On, the reference is simply left empty and the record is still saved — read the warning below before using this. |
| **Continue On Errors** | المتابعة عند حدوث خطأ | **On** | On, every row is attempted and the failures are reported at the end. Off, the import stops at the first failing row. |
| **Trim Extra Spaces** | حذف المسافات الزائدة | **On** | Strips leading and trailing spaces from every cell before using it. This is what stops a code typed as `CUST01 ` from failing to match `CUST01`. |
| **Save As Draft** | الحفظ كمسودة | Off | Imported records are saved as drafts rather than committed, so you can review them before they take effect. |
| **Use User Dimensions While Importing** | استعمال محددات المستخدم اثناء الاستيراد | Off | Resolves codes and saves records under your own legal entity, branch, sector and department rather than the record's. Useful when the same code exists in several companies. |
| **Add To Current Lines** | إضافة إلى السطور الحالية | Off | Off, the detail lines in the file replace the record's existing lines. On, they are added alongside them. |

::: warning "Continue On Errors" does not mean "undo on errors"
Switching it off stops the run at the first failure — but the rows that already succeeded stay saved. There is no rollback of a partial import. If a bad file gets halfway through, you will need to undo the damage yourself, which is the best argument for testing on a handful of rows before running the full sheet.
:::

::: danger Be careful with "Ignore not found references"
It sounds like a convenience and it is occasionally necessary, but it turns a loud failure into a silent one. A row whose warehouse could not be matched is saved with **no warehouse at all** rather than being rejected, and you find out weeks later when the stock figures do not add up. Prefer leaving it off, letting the rows fail, and fixing the codes.
:::

## How a Row Finds Its Record

Two questions get answered for every row: is this an existing record, and what does each reference point at?

### Existing record, or new one?

The importer looks for a match first by the **`id`** column if the file has one, then by the **`code`**. What happens next depends on your options:

- Matched, and *Update* is on → the record is overwritten with the values in the row.
- Matched, and *Update* is off → the row fails with *"Record already exists and you do not want to update"*.
- No match, and *Add* is on → a new record is created.
- No match, and *Add* is off → the row fails with *"Record does not exist and you do not want to add"*.

Detail lines follow the same idea one level down. When every line in your file carries its identifier, those exact lines are updated. When the identifiers are missing, lines are matched **by position** — which is fine for a fresh import and dangerous on a re-import where rows have been added, deleted or reordered.

### What a reference column matches on

When a cell says `10011` in a `customer` column, the system tries, in order:

1. the internal **identifier**, if the cell looks like one;
2. the **code** — this is the normal case, and the one you should rely on;
3. the **alternate code**, for record types that have one;
4. the **alias**;
5. for items only, a barcode, when barcode-specification searching is enabled;
6. the **name**, in Arabic then English — but *only* for record types an administrator has explicitly allowed to be matched by name, in [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-reference-lookups). This is switched off by default.

Two conveniences are worth knowing. Books, document terms and master groups have the owning entity type prefixed onto the code automatically, so `SalesInvoice$#SINV` in an exported file is exactly what the importer expects to see. And a reference can point at a record **defined further down the same file** — if your sheet creates a parent and a child, the importer will jump ahead, create the parent, and then finish the child. You do not have to order the rows.

If a code is genuinely ambiguous — two records sharing it — the lookup fails with an error rather than picking one at random.

::: tip Codes, not names
The single most common cause of a failed import is editing the readable `customer: Name` column instead of the `customer` code column beside it. Name columns are written on export and completely ignored on import.
:::

## Fields You Are Not Allowed to Change

An import cannot be used to get around [Field Settings](/platform/security/field-page-listview-security.md#Imports-exports-and-the-API-follow-the-same-rows). The sheet is checked against the importing user's rows on the security profile and user record before any value is written. A field you may not change is one that is *Disabled* or *InVisible* for that kind of record. For the *Apply on* flags, a new record counts as New, a draft as Draft and a committed record as Edit.

What happens to such a field depends on one Global Config option, **Reject Imports Containing Fields The User Cannot Change**, in the *Records Security* group of the [Security and Login](/platform/global-config/global-config-security.md#Record-security) page. It is off by default.

**With the option off (the default), the field is skipped.** Its value in the sheet is ignored and the field keeps the value the record already has — or its default value, on a new record — while the rest of the row is saved. It makes no difference whether the value in the sheet differs from the record's. The row is stamped `inserted` as usual, and in the returned file the cell where an error would go names the fields that were skipped:

*The following fields were left unchanged because you are not allowed to change them: {0}* — «لم يتم تعديل الحقول التالية لعدم وجود صلاحية لك بتعديلها: {0}»

The message shown when the import finishes adds one line, so you know to look:

*Some records were saved without the fields you are not allowed to change. The returned file names those fields* — «تم حفظ بعض السجلات دون الحقول التي ليس لك صلاحية تعديلها، ويوضح الملف المرتجع هذه الحقول»

This is what makes the round trip work. You can export a screen, edit the columns you are allowed to edit and import the same file back. The *Excel export* leaves out fields you cannot see, and a *Disabled* field, which you can see and which is therefore exported, is simply skipped on the way back in.

**With the option on, the row is refused instead.** A row fails when the sheet has a column for such a field, whatever the value in it, and its `@errors` cell names the field. A column left exactly as it was exported fails the row too, because the system does not try to work out whether the value changed. Under this option, delete such columns before importing. It suits a company that would rather have a sheet rejected than have part of it ignored.

Lines are checked too, and these checks refuse the row **whatever the option says**, because skipping rows would lose data without anyone noticing. When the security profile prevents inserting or deleting rows in a grid, a row that would add lines to that grid, or drop some of its lines, fails. With line identifiers in the sheet, a line whose identifier the record does not have is an addition, and a record line missing from the sheet is a deletion. Without identifiers, the lines are counted: more rows than the record has is an addition, and fewer is a deletion. *Add To Current Lines* always adds.

A record waiting for approval is protected the same way. If the current approval step limits which fields may be edited, every other field counts as one you may not change: skipped while the option is off, refused while it is on. Line insertion or deletion that the step prevents always fails the row — see [Approvals](/platform/approvals/approvals-system.md#Field-Level-Editing-Control). Users exempted from the step's lock are not affected.

Users with Full Authority are not subject to field settings, but approval locks still apply to them.

The `evalsql(...)` cell function (see [Importing Data from Excel or Queries](/platform/entity-flows/excel-and-sql-import-by-entity-flow.md)) runs a database query, so it works only for users with Full Authority. Other users get a failed row instead of the value.

## Watching It Run, and Reading the Result

The import is handed to a background task, so your screen stays usable. A progress entry counts through the file — *"Importing 12 of 400 — Fail: 1 Success: 11"* — and you can cancel it partway if you spot something going wrong.

When it finishes you get **your own file back**, annotated. That returned workbook is the real result report:

- successful rows are stamped **`inserted`** in column A;
- failed rows are stamped **`erorr`** in column A, and the reason is written into the `@errors` cell at the end of the row — with detail lines getting their own error cells on their own sheets;
- a row saved without some of its fields (see [Fields You Are Not Allowed to Change](#Fields-You-Are-Not-Allowed-to-Change)) is stamped `inserted`, and the same cell at the end of the row names the fields that were left unchanged.

So the repair loop is simple and self-correcting: download the returned file, fix the rows stamped `erorr`, and upload the same file again. The rows already marked `inserted` are skipped on the second pass, so nothing is imported twice — including those carrying a note, which are already saved.

::: info Import is a background task, not a business request
An import does not appear in the Business Requests list and is not retried from there. It runs on the server while you wait, and its result is the annotated file. What *does* land in Business Requests is the processing each imported document then triggers — its accounting and inventory effects — and those are monitored and retried in the usual way.
:::

## Supported File Types

Excel workbooks (`.xlsx`), `.csv` and `.txt` files with the same row layout, `.json`, `.xml` and `.zip` bundles are all accepted.

`.xls` — the old Excel 97 format — is **not**. Uploading one produces a message asking you to save it as `.xlsx` first.

## Importing Into the Record You Have Open

There is a second, much smaller command in an open record's **More** menu: **Import Into Current Record**. Instead of a file it takes JSON pasted into a text box, and instead of saving anything it simply *fills the screen in front of you*. You review what appeared and press Save yourself — or discard it.

It has one option, **Add To Current Lines**, which decides whether pasted detail lines replace or join the ones already on the record.

This is the tool for a single record handed to you as a snippet — a configuration someone sent you, a sample document from support. For anything with more than one record, use **Import Records**.

The command is hidden until you ask for it: press **Ctrl + Alt + X** on the open record first (see [Keyboard Shortcuts](/platform/everyday-tools/shortcuts.md)), and it appears in **More** — provided your security profile lets you import that type. Many pages on this site end a worked example with a *JSON for direct import* block; this is how you load it:

1. Open a new record of the type the example is for (an Approval Definition, a Payment Schedule Template, …).
2. Press **Ctrl + Alt + X**, then choose **More → Import Into Current Record**.
3. Paste the JSON. Tick **Add To Current Lines** if the lines should join the ones already on the record rather than replace them.
4. Check what appeared on screen, then save.

The same menu carries the opposite command, **Simple Export For Docs**. It turns the open record into that same compact JSON — only the fields shown on screen, no internal ids, no attachments — and hands it to you to copy, so you can send a working configuration to a colleague or to support. It asks first whether to include the record's code and names and its dimensions; leave both off when the JSON is meant to be pasted into another record.

## When the Sheet Is Not Yours to Reshape

Everything above assumes the file uses Nama's own layout. Often it does not: a supplier sends a price list in their format, or a legacy system produces an export whose columns are in the wrong order with the wrong headings and three rows of company letterhead on top.

You could reshape it by hand every month. Or you could describe its layout once and reuse that description — which is what [Advanced Record Import](/platform/import-export/advanced-record-import.md) is for.

## Messages you may see

Apart from the second, which appears in the message shown when the import finishes, these are written into the `@errors` cell at the end of the row. `{0}` is the field id, such as `customer` or `details.price`, or for line messages the grid, such as `details`. The first two mean the rows were saved; the rest are on rows that failed.

| Message | Why | What to do |
|---|---|---|
| *The following fields were left unchanged because you are not allowed to change them: {0}* — «لم يتم تعديل الحقول التالية لعدم وجود صلاحية لك بتعديلها: {0}» | The row was saved, but the sheet had values for fields you may not change, so those values were ignored. `{0}` lists the fields. Only while *Reject Imports Containing Fields The User Cannot Change* is off. | Nothing, if you did not mean to change them. Otherwise ask someone allowed to change those fields, or an administrator to change the Field Settings row. |
| *Some records were saved without the fields you are not allowed to change. The returned file names those fields* — «تم حفظ بعض السجلات دون الحقول التي ليس لك صلاحية تعديلها، ويوضح الملف المرتجع هذه الحقول» | At least one row got the note above. | Open the returned file and read the notes. |
| *You are not allowed to change the field {0}* — «غير مسموح لك بتعديل الحقل {0}» | *Reject Imports Containing Fields The User Cannot Change* is on, and the sheet has a column for a field your Field Settings make *Disabled* or *InVisible* for this kind of record. | Delete the column from the sheet, or ask an administrator to change the Field Settings row. |
| *The field {0} is locked while the record is under approval* — «الحقل {0} مقفل أثناء انتظار السجل للموافقة» | *Reject Imports Containing Fields The User Cannot Change* is on, the record is waiting for approval and the current step does not allow editing this field. | Remove the column, or wait until the approval finishes. |
| *You are not allowed to add lines to {0}* — «غير مسموح لك بإضافة سطور إلى {0}» | The sheet adds lines to a grid whose *Prevent Insert Row* applies to you. | Keep the sheet to the record's existing lines, with their identifiers. |
| *You are not allowed to delete lines from {0}* — «غير مسموح لك بحذف سطور من {0}» | The sheet has fewer lines than the record, or leaves out some of its line identifiers, in a grid whose *Prevent Delete Row* applies to you. | Include every existing line, or tick *Add To Current Lines* if you meant to add. |
| *Lines cannot be added to {0} while the record is under approval* — «لا يمكن إضافة سطور إلى {0} أثناء انتظار السجل للموافقة» | The current approval step prevents adding lines to this grid. | Wait until the approval finishes. |
| *Lines cannot be deleted from {0} while the record is under approval* — «لا يمكن حذف سطور من {0} أثناء انتظار السجل للموافقة» | The current approval step prevents deleting lines from this grid. | Include every existing line, or wait until the approval finishes. |
| *Only users with full authority can use evalsql in imported values* — «استخدام evalsql في القيم المستوردة متاح فقط للمستخدمين أصحاب الصلاحيات الكاملة» | A cell uses `evalsql(...)` and your security profile does not have Full Authority. | Put the actual values in the cells, or have an administrator run the import. |
