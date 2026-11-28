---
title: EAImportItemsFromLongTextField
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAImportItemsFromLongTextField

## Overview

Imports items into a supply chain document by parsing item codes from a long text field. Reads item codes separated by line breaks, looks up the corresponding items, and creates document lines with quantity 1 for each item. If an item already exists in the document, increments its quantity instead.

## When This Action Runs

Manual execution when bulk item entry is needed from a text list, typically for quick document creation from barcode scans, item lists, or when importing items from external sources that provide code lists.

## How It Works

1. **Reads source field** - Extracts text from specified field (defaults to remarks field). If the field is empty the flow stops and the document lines are left as they are
2. **Parses item codes** - Splits text by line breaks to get individual item codes
3. **Clears existing lines** - Removes current document lines (reuses existing line objects)
4. **Processes each code** - Trims whitespace and skips empty lines
5. **Looks up items** - Finds InvItem records using business codes. A code with no item adds the error *Could not find item with code {0}* and the flow fails
6. **Creates/updates lines** - Adds new lines or increments quantity for existing items
7. **Sets default values** - Assigns quantity 1 and primary unit of measure

## Parameters

**Parameter 1:** (shown without a title) (Optional) - Id of the header field containing the item codes (default: `remarks`)

The field should contain item codes separated by line breaks, for example:
```
ITEM001  
ITEM002
ITEM003
```

## Database Tables Affected

- **Document Lines** - Replaces existing lines with new lines based on item codes
- **InvItem** - Reads item master records using business codes (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAImportItemsFromLongTextField`


</div>

