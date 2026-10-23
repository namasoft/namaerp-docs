---
description: "How to read and write the export workbook layout: the marker rows on the main sheet, detail sheets and the header connector column, column heading forms for references, names, any-type references and errors, identifier columns, and the JSON shape."
---
# Anatomy of the Export File

The first time you open an exported workbook you will wonder what happened to it. Two rows start with `//`. The third starts with `:-record:SalesInvoice`. There are extra sheets called `details` and `paymentLines`, each with a mysterious `#headerconnector` column. And several fields appear twice — once as a code, once as a name.

All of it has a purpose: the file is a two-way document. The rows you can read are for you; the marker rows are for the system, so that when you upload the same file it knows exactly which entity type it holds and which cell belongs in which field. Once you can read this layout you can also *write* it, which is how you build an import file from scratch.

## The Main Sheet

Take a real export of two sales invoices. The first sheet looks like this, with column A reserved for markers and the actual data starting in column B:

| | A | B | C | D | E |
|---|---|---|---|---|---|
| **1** | `//` | Export list of SalesInvoice | created on: Sat Aug 01 19:22:52 2026 | | |
| **2** | `//` | الدفتر | الدفتر: الاسم | الكود | التاريخ الفعلي |
| **3** | `:-record:SalesInvoice` | `book` | `book@name` | `code` | `valueDate` |
| **4** | | SalesInvoice$#SINV | فاتورة مبيعات | SINV0000035 | 01-02-2024 |
| **5** | | SalesInvoice$#SINV | فاتورة مبيعات | SINV0000004 | 23-04-2024 |

Four kinds of row, and you only ever edit one of them:

**Row 1 — the banner.** `//` means "comment, ignore me". It records what was exported and when. Nothing here matters to the system.

**Row 2 — the human headings.** Also a comment. These are the labels you see on screen, written in whatever language you were using when you ran the export — Arabic labels for an Arabic session. This is the row you read while working in the sheet. Change it, delete it, translate it; the import does not care. The last column is always the error heading.

**Row 3 — the real headings.** This is the row that matters. `:-record:SalesInvoice` in column A declares the entity type, and every cell after it is a **field id** — the internal name of the field that column fills. Nothing here is translated, and nothing here should be edited casually: change `valueDate` to `Value Date` and that column simply stops working.

**Rows 4 onwards — your data.** Column A is left empty. This is the only region you add to, edit, or delete rows from.

::: warning Do not sort or reorder the first three rows
Excel's sort will happily drag the marker rows into the middle of your data. Always select only the data rows before sorting, or the file becomes unreadable to the importer.
:::

## Detail Sheets

A sales invoice is not a flat row — it has item lines, payment lines, delivery documents. Each of those becomes its own worksheet, named after the collection (`details`, `paymentLines`, `stockDocs`), and each one is wired back to its header rows.

The `details` sheet of the same export:

| | A | B | C | D |
|---|---|---|---|---|
| **1** | `//` | `#headerconnector` | الصنف | الكمية |
| **2** | `:-detail:details` | `#code` | `details.item.item` | `details.quantity.quantity.primeQty.value` |
| **3** | | SINV0000035 | 9999 | 1 |
| **4** | | SINV0000004 | 01001 | 10 |

Column A declares the collection with `:-detail:details`. Column B is the join: its heading is `#code`, and each row repeats the **code of the invoice that line belongs to**. Row 3 above belongs to invoice SINV0000035, row 4 to SINV0000004. That is the whole linking mechanism — no formulas, no row numbers, just the parent's code repeated on every line.

Notice also that detail field ids carry the collection name as a prefix: `details.item.item`, not `item`. The dots follow the field's real path inside the record, which is why some of them get long — `details.quantity.quantity.primeQty.value` is simply "the quantity, in the main unit, on this line".

::: warning A detail row whose code matches nothing is silently dropped
If you add a line to the `details` sheet and mistype the invoice code in column B, that line does not raise an error. It has no header to attach to, so it is quietly ignored. When lines go missing after an import, check this column first.
:::

Two limits are worth knowing. Sheet names are cut to 31 characters (Excel's own limit), with vowels removed to squeeze long collection names in — so the sheet name may not match the field id exactly. And **details of details are not exported**: if a detail line has its own sub-table, that second level does not appear in the file and cannot be imported this way.

If you turned **Export Details In Seperate Sheets** off, the same information is written inline instead: under each header row comes a `:-detail:details` heading block, then that record's lines, then a `:-enddetail` row, then the next header. It is compact but hard to work with by hand — separate sheets are almost always the better choice.

## Reading the Column Headings

Most headings are just a field id. Four kinds carry extra meaning.

### `field` — a reference

A column like `customer` or `warehouse` holds a **code**, not a name: `10011`, `00`. On import, that code is looked up to find the real record.

A few references look stranger than a plain code. Document books and terms are written as `SalesInvoice$#SINV` — the entity type, then the book's own code. That is normal; leave it as exported.

### `field@name` — the name beside the code

Right after `customer` you will find `customer@name`, holding "عميل 11". This column exists purely so that a sheet full of codes is readable by a human.

::: info Name columns are ignored on import
`@name` columns are written on export and completely ignored on import. Editing one changes nothing — if you want to point a line at a different customer, you must change the **code** column, not the name column. Many an import has "silently failed" because someone edited only the readable half.
:::

### `field#type` + `field#code` — a reference that can point anywhere

Some fields can hold a link to more than one kind of record. The `subsidiary` on an invoice might be a customer, a supplier, or an employee. Those export as **two adjacent columns**:

| `subsidiary#type` | `subsidiary#code` |
|---|---|
| `Customer` | `10011` |

The first says which kind of record, the second says which one. Both are needed, and they must stay adjacent and in that order — type first, then code.

### `@errors` — the report card

The last column of every sheet is `@errors`, empty on export. When you upload the file, the importer writes the reason each failing row failed into this cell. It is covered in [Importing Records](/platform/import-export/importing-records.md).

## The Identifier Columns

Depending on the options you ticked when exporting, you may also see:

- **`id`** on the main sheet — the record's internal identifier, present only if you ticked *Include ID Field*. Useful when the records have no dependable code to match on.
- **`details.id`**, **`details.masterRowId`**, **`details.sourceLineId`** on detail sheets — present by default, because *Include Lines ID Filed* is on.

Those line identifiers matter more than they look. When every detail row in your file carries its `id`, a re-import updates **those exact lines**. When they are missing, lines are matched by position instead — row 1 in the file overwrites line 1 of the record, row 2 overwrites line 2, and so on. If you have deleted or reordered rows in Excel, positional matching quietly writes values into the wrong lines.

::: tip When you are adding brand-new records, clear the identifiers
Copying an exported row to create a *new* record and leaving its `id` in place tells the importer "update the record with this identifier" — so you overwrite the original instead of creating anything. Blank the `id`, `details.id`, `masterRowId` and `sourceLineId` cells on rows that are meant to be new, and give the new record its own code.
:::

## Other Details Worth Knowing

**Attachments.** If you did not tick *Ignore Attachments*, file fields hold a value like `4f2c…/contract.pdf` and the actual files arrive in a separate `-attachments.zip`. To import attachments, upload that zip in the dialog's *Attachments* field and keep the file names in the cells.

**Numbers.** Trailing zeros are stripped, so `100.00` exports as `100`. This is cosmetic; the value is unchanged.

**Fields you cannot see.** If your security profile hides a field, that column is removed from your export altogether. Two users exporting the same screen can legitimately get files with different columns.

**A few unusual fields** — document term configurations, configuration entry values, textual criteria — are too large and structured to fit a cell, so they are exported as a single compressed column whose heading begins with `&`. Leave those cells exactly as they are; they round-trip correctly but cannot be edited by hand.

## The JSON Shape

Choosing **JSON** instead of Excel gives you the same content with the structure made explicit rather than flattened:

```json
{"SalesInvoice": [
  {
    "book": "SalesInvoice$#SINV",
    "code": "SINV0000035",
    "valueDate": "01-02-2024",
    "customer": "10011",
    "subsidiary": { "entityType": "Customer", "code": "10011" },
    "money": { "currency": "KWD", "currencyRate": 1 },
    "details": [
      { "item": { "itemCode": "9999", "item": "9999" },
        "quantity": { "quantity": { "primeQty": { "value": 1, "uom": "SRV" } } },
        "price": { "unitPrice": 100, "netValue": 100 } }
    ]
  }
]}
```

The dotted field ids from the spreadsheet become nested objects — `details.item.item` in Excel is `details` → `item` → `item` here. The `#type`/`#code` pair becomes an `entityType`/`code` object. Detail collections are arrays inside their header, so no join column is needed.

JSON is the better format when a script or another system is producing the data, and it is what the [AI record import tools](/modules/ai/ai-mcp-server.md) exchange. For anything a person is going to edit, use Excel.
