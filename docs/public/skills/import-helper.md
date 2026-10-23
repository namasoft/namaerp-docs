---
name: import-helper
description: >
  Load data into Nama ERP in bulk: build an Excel or JSON import file, or save records through the
  `<prefix>ImportRecord` MCP tool. Use this skill whenever the user wants to import, bulk-create, bulk-update or
  migrate records (customers, items, opening balances, documents, configuration records), fix an import file that
  fails, or asks why imported values did not stick. Covers field ids, reference and date formats, codes for
  auto-numbered books, import modes, and the values the importer ignores without an error.
---

# Import Helper

Get records into Nama through the importer, and prove they arrived. "Import finished successfully" only means
that no record was refused. Always read the records back (Step 5).

The user-facing pages are the reference for the screens. Read them in the local docs checkout
(`namaerp-docs/docs/platform/import-export/`) or on https://docs.namasoft.com/platform/import-export/:
`importing-records.md` (options and matching), `export-file-format.md` (the file layout, the JSON shape) and
`exporting-records.md`.

---

## Step 1 — Pick the Channel

| Situation | Use |
|---|---|
| A Nama MCP server is connected with `<prefix>GetImportSchema` / `<prefix>ImportRecord` | **ImportRecord**. Each record goes through the same save as the screen, so all validations apply |
| No MCP, and a person will fill or check the data | An **Excel** file the user loads with **More → Import Records** on the list screen |
| No MCP, and a script or another system produces the data | A **JSON** file loaded the same way |
| One record handed over as a JSON snippet | **More → Import Into Current Record** on an open record (press **Ctrl + Alt + X** first). It fills the screen and saves nothing |

If the import tools are missing from the MCP server, say so and follow the KB's missing-tool rule. Do not fall back
to SQL: never write `INSERT`/`UPDATE` statements for data entry.

Document **term settings** (`termConfig`) and **config entries** cannot go through ImportRecord: it refuses them.
Use `<prefix>ListTermAndConfigTargets` → `<prefix>GetTermOrConfigSchema` → `<prefix>UpdateTermOrConfig` instead.

---

## Step 2 — Start From What the System Produces

Never build an import from a guess about the field names.

- **MCP:** call `<prefix>GetImportSchema` for the entity type. It lists each field's type, whether it is required,
  enum values, the entity a reference points at, the detail collections, and a ready-to-fill `example`. It returns
  on-screen fields only; pass `mode=all` for every importable field. To copy an existing record's shape, read it
  with `<prefix>GetRecord`: the JSON it returns has the shape ImportRecord takes.
- **Files:** tell the user to export one existing record of the same type (**More → Export Current** on the
  record, or **Export Selected** on the list) and to fill the new rows under the exported ones. The marker rows and
  field-id headings are then already correct.

---

## Step 3 — Write the Values

### Field ids

| | Excel | JSON / ImportRecord |
|---|---|---|
| Header field | heading = field id (`valueDate`) | key = field id |
| Value object | one dotted heading (`contactInfo.mobile`) | **nested objects**: `{"contactInfo":{"mobile":"…"}}` |
| Detail line | own sheet, field id with the collection prefix (`details.item.item`) | an array under the collection key, keys without the prefix |
| Line → its record | first column `#code` holds the parent record's code | none: the array sits inside its record |

In JSON a dotted key such as `"contactInfo.mobile"` is never read, so it stores nothing. A key that is not a
field of the entity is ignored the same way. Always nest. Copy the nesting from the schema's `example`:
money is `{"value":{"amount":100,"currency":"EGP"}}` and a line quantity is
`quantity.quantity.primeQty.value`.

In Excel, a detail row whose `#code` matches no record on the main sheet is dropped silently. Check that
column first when lines go missing.

### References

- **Ordinary reference** (customer, item, warehouse): the record's **code** as a string. ImportRecord refuses a
  record whose reference code matches nothing. In Excel the row fails too, unless **Ignore not found references**
  is on. In that case the field is saved empty, so leave it off.
- **Generic reference** (a field that can point at several entity types, shown in the schema as an object with
  `entityType` and `code`): always send the object, `{"entityType":"Customer","code":"10011"}`. In Excel it is the
  `field#type` + `field#code` column pair. A plain string in a generic reference is not looked up by code.
- **Books, terms and master groups**: write `<DocumentEntityType>$#<code>`, for example `SalesInvoice$#SINV`.
  The entity type is the document's own type, never `DocumentBook`. Codes of books, terms and groups are unique
  only within their entity type, so this is the safe form everywhere. In the record's own `book`, `term` and
  `group` fields, the importer adds the record's type when you leave it out.
- A reference may point at a record defined **later in the same import**. The importer saves that record first.
  This works only by the code you sent. A record that gets its number from its book on commit has a different
  code after the save (see Step 4), so import it first and reference it by its saved code.

### Dates, yes/no and numbers

- **Dates:** `dd-MM-yyyy` (`15-01-2026`) or `yyyy-MM-dd` (`2026-01-15`). The importer turns `/` and `\` into
  `-`. Never use month-first `MM-dd-yyyy`: the day-first parser does not refuse an impossible month, it rolls it
  over into a different date. **Date-and-time** fields take `yyyy-MM-dd'T'HH:mm` (seconds optional).
- **Yes/no:** `true` or `false`. Any other text (`yes`, `1`, `نعم`) is saved as **false**, with no error.
- **Numbers:** plain digits with `.` as the decimal point (`1250.5`). A thousands separator fails the record.
- **Enums:** the values the schema lists, not the screen labels. A field that shows only an `enumType` is
  resolved with `<prefix>GetEnumValues`.

### Clearing a value on update

On an update, a field you do not send keeps its current value, and so does a field sent as JSON `null`. To
empty a field, send an empty string `""`.

### Calculated fields

Saving recalculates the fields the system computes, such as totals, net values and statuses, so a value you send
for one of them is overwritten. Send the inputs (quantities, prices, discounts) and let the save compute the rest.

---

## Step 4 — Codes, Modes and Drafts

**Codes of auto-numbered records.** For a document whose book numbers automatically, or a master file whose
group does, **omit `code`**. The real number is assigned when the record is committed. A placeholder is also
accepted, but it must start with the book's **prefix** (the prefix field on the book, not the book's code) and
end in `@draft`, for example `JE1000@draft`. A code that does not start with the prefix is refused with
"code must start with …". The ImportRecord response gives every record under the code it was saved with,
including "(sent as …)" when that differs. Use that saved code from then on. Once the record is committed, the
`@draft` placeholder no longer exists.

**Matching.** A record is matched to an existing one by `id`, then by `code`. Importing the same code again
**updates that record in place**, whether it is a master file or a committed document. No duplicate error is
raised.

- **ImportRecord:** `importMode` is required. `CreateOnly` refuses a code that already exists. `UpdateOnly`
  refuses a code that does not exist. `CreateOrUpdate` allows both. Use **CreateOnly** whenever the intent is
  to add records: it is the only mode that stops a colliding code from overwriting someone else's record. When
  several agents or people import in parallel, give each one its own code range.
- **Excel/JSON file:** the **Add** and **Update** options do the same job. Both are on by default. Switch
  Update off for an insert-only run.

**New records start from the default values.** ImportRecord asks the system for a blank record first, as the
New button does, so the user's default-values template fills the fields you leave out.

**Detail lines on an update.** The lines you send **replace** the record's lines, so any line you do not send is
removed. A collection you leave out entirely is not touched. Lines sent without their `id` are matched **by
position**: line 1 overwrites line 1, and so on. To change one line safely, read the record back with
`<collection>.id` included (`fields` parameter, or `mode=all`) and send every line with its id. To add lines
without touching the existing ones, set `appendDetailLines=true` (in a file, the **Add To Current Lines** option).

**Draft or committed.** `saveAsDraft=true` saves without committing (in a file, the **Save As Draft** option).
The default saves and commits. A document that was committed before stays committed even with `saveAsDraft`.
The `@draft` suffix on a code does not decide this. A committed record can still come back pending when an
approval definition matches it.

**Not atomic.** Each record is saved on its own. A failing record does not roll back the ones before it, and
the rest of the batch carries on. After an error, read back what was actually saved before you retry. A blind
retry of the whole batch updates or duplicates the records that already went in. In a file, the rows that
succeeded are marked `inserted` in column A of the returned workbook and are skipped when the same file is
loaded again.

---

## Step 5 — Read It Back

Check every import before telling the user it worked:

1. `<prefix>FindRecords` with a criteria on the codes you imported (dates in criteria are `dd-MM-yyyy`) to
   confirm the count.
2. `<prefix>GetRecord` on one or two records, with `fields` listing the values you sent. Compare them to the
   source. A value that is missing or different is one of the cases in Step 3.
3. For a file import, ask the user for the workbook the import returns. Failed rows carry `erorr` in column A
   and the reason in the `@errors` cell.

---

## Attachments

Through ImportRecord, an attachment field takes `{"uploadId":"<id>"}`, where the id comes from a link obtained
with `<prefix>PrepareAttachmentUpload`, or `{"url":"<http(s) address>"}`. Either form may add `"fileName"`.
A path on the server or on the user's machine is refused. In a file import, the cell holds the file's name
inside the companion attachments zip, which the user uploads in the dialog's **Attachments** field.
