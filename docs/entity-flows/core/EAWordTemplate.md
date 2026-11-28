---
title: EAWordTemplate
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAWordTemplate

## Overview

Processes Microsoft Word document templates by replacing placeholders with entity data. Reads a template document, substitutes template variables with actual values, handles table loops for detail collections, and generates a final document with entity-specific content.

## When This Action Runs

Manual execution for generating entity-specific documents like invoices, contracts, reports, certificates, or any Word document that needs dynamic content based on entity data.

## How It Works

1. **Reads template** - Loads Word document from entity flow attachment or specified field
2. **Processes placeholders** - Finds and replaces template variables in format `@#fieldName#@`
3. **Handles table loops** - Processes repeating sections for detail collections (invoiceLines, etc.)
4. **Drops empty loop rows** - Removes table rows that a loop produced but that rendered no text
5. **Replaces image markers** - Inserts images from binary fields using `image(fieldName)` syntax
6. **Generates document** - Creates final Word document with populated data
7. **Applies protection** - Unless Parameter 3 is `true`, protects the document as read-only with a random password
8. **Saves result** - Stores generated document in specified attachment field

## Parameters

**Parameter 1:** Save To Field (Required) - Target attachment field to save generated document (e.g., "attachment", "generatedDoc")

**Parameter 2:** Read Attachment From Field (Optional) - Attachment field holding the template document (e.g., "customer.attachment1"). Empty: the file in the **Attachment** field of the entity flow itself

**Parameter 3:** Do Not Make Document Read-Only (Optional) - "true" to keep document editable, "false" for read-only (default: false)

**Parameter 4:** Generated File Name Tempo (Optional) - Template for output filename using entity data. Empty: the file name of the entity flow's attachment

**Parameter 5:** Keep Empty Loop Rows (Optional) - "true" to keep table rows whose loop iteration rendered nothing, "false" or empty to remove them (default: false, meaning empty rows are removed)

## Template Syntax

### Basic Field Replacement
```
@#fieldName#@
@#customer.name1#@
@#valueDate#@
@#money.netValue#@
```

### Filtering Loop Rows

A loop inside a table cell produces one table row per detail line. When a condition inside the
loop is not met, that iteration renders no text, and the row it produced is removed from the
table instead of being left blank:

```tempo
@#{loop(details)}{if=(details.item.item.section.code, "AP")}{details.item.code}{endif}{endloop}#@
```

Only the lines whose section code is `AP` appear in the printed table. The rows for the other
lines are deleted, so the table has no blank gaps and no extra pages.

A row is removed only when **every** looping cell of that row rendered nothing for that
iteration. If any cell in the row produced text, the row is kept, so cells stay aligned with
each other. Whitespace-only output (including non-breaking spaces) counts as nothing.

To keep the old behaviour and print the blank rows, set **Parameter 5** to `true`.

::: warning Numbering the remaining rows
`{@rownumber}` prints the position of the detail line in the collection, so after filtering it
shows gaps (7, 12, 30). To number the printed rows sequentially, use a counter that is only
incremented for the lines that pass the condition:

```tempo
@#{loop(details)}{if=(details.item.item.section.code, "AP")}{incrementcounter(sn)}{countervalue(sn)}{endif}{endloop}#@
```

This prints 1, 2, 3, ... over the rows that survive the filter.
:::

### Image Insertion
Insert images from binary/attachment fields into the document:
```
image(fieldName)
image(customer.logo)
image(productImage)
```

The system will:
- Extract the image data from the specified field (must be a LargeData/attachment field)
- Replace the marker with the actual image in the document
- Take the image format from the file name's extension (`.png`, `.jpg`/`.jpeg`, `.gif`, `.bmp`, `.tif`/`.tiff`); any other extension is treated as PNG
- Size the image to 100 x 100 points

The marker must be the whole text of its run in the Word document (type it in one go, without changing its formatting halfway).

::: tip Image Field Requirements
The field referenced in `image(fieldName)` must be a binary/attachment field containing image data. Supported formats: PNG, JPEG, GIF, BMP, TIFF.
:::


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWordTemplate`


</div>