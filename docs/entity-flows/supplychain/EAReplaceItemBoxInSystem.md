---
title: EAReplaceItemBoxInSystem
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAReplaceItemBoxInSystem

## Overview

Performs system-wide replacement of item box values across all supply chain document tables. Updates box dimensions for specific items from old values to new values throughout the entire database, ensuring consistency of box tracking across all historical and current transactions.

## When This Action Runs

Manual execution when item box specifications need to be corrected or updated system-wide. Typically used when box dimensions are found to be incorrect, when item packaging changes, or during data cleanup operations to standardize box values across all documents.

## How It Works

1. **Extracts field values** - Reads item, old box, and new box values from document lines
2. **Validates data consistency** - Fails with *The items size is {0}, old properties size is {1}, new properties size is {2}. They must be equal.* unless the three fields return the same number of values
3. **Filters changes** - Skips lines without an item, lines where old and new values are the same, and lines whose old or new value is empty unless Parameter 5 or Parameter 6 allows it
4. **Updates all tables** - For each item, replaces the old value by the new one in the stock taking lines table and in every supply chain document line table, each update in its own transaction
5. **Handles current document** - Unless Parameter 4 is `true`, the line table of the current document's own type is skipped completely, so no document of that type is updated
6. **Regenerates inventory effects** - Unless Parameter 7 is `true`, regenerates the inventory effects of every document that had quantity transactions for the item with the old value
7. **Provides progress tracking** - Shows progress through context updates during processing

## Parameters

**Parameter 1:** Item Field (Optional) - Field path to item reference (default: details.item.item)

**Parameter 2:** Old Value Field (Optional) - Field path to current box value (default: details.specificDimensions.box)

**Parameter 3:** New Value Field (Optional) - Field path to new box value (default: details.text1)

**Parameter 4:** Change Current Document Lines (Optional) - true/false to also update the line table of the current document's type (default: false)

**Parameter 5:** Handle Lines Where Old Property Is Empty (Optional) - true/false to process empty old values (default: false)

**Parameter 6:** Handle Lines Where NEW Property Is Empty (Optional) - true/false to process empty new values (default: false)

**Parameter 7:** Do Not Regen Inventory Requests After Update (Optional) - true/false to skip inventory effect regeneration (default: false)

## Database Tables Affected

- **All Supply Chain Document Line Tables** - Updates box values across all document types
- **EndStockTakingLine** - Updates box values in stock taking records
- **QtyTransLine** - References for inventory effect regeneration (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.plugnplay.EAReplaceItemBoxInSystem`

**Related Actions:**
- [EAReplaceItemSizeInSystem](EAReplaceItemSizeInSystem.md)
- [EAReplaceItemColorInSystem](EAReplaceItemColorInSystem.md)


</div>