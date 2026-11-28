---
title: EAReplaceItemColorInSystem
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAReplaceItemColorInSystem

## Overview

Performs system-wide replacement of item color values across all supply chain document tables. Updates color specifications for specific items from old values to new values throughout the entire database, ensuring consistency of color tracking across all historical and current transactions.

## When This Action Runs

Manual execution when item color specifications need to be corrected or updated system-wide. Typically used when color codes are found to be incorrect, when item color standards change, or during data cleanup operations to standardize color values across all documents.

## How It Works

1. **Extracts field values** - Reads item, old color, and new color values from document lines
2. **Validates data consistency** - Fails with *The items size is {0}, old properties size is {1}, new properties size is {2}. They must be equal.* unless the three fields return the same number of values
3. **Filters changes** - Skips lines without an item, lines where old and new values are the same, and lines whose old or new value is empty unless Parameter 5 or Parameter 6 allows it
4. **Updates all tables** - For each item, replaces the old value by the new one in the stock taking lines table and in every supply chain document line table, each update in its own transaction
5. **Handles current document** - Unless Parameter 4 is `true`, the line table of the current document's own type is skipped completely, so no document of that type is updated
6. **Regenerates inventory effects** - Unless Parameter 7 is `true`, regenerates the inventory effects of every document that had quantity transactions for the item with the old value
7. **Provides progress tracking** - Shows progress through context updates during processing

## Parameters

**Parameter 1:** Item Field (Optional) - Field path to item reference (default: details.item.item)

**Parameter 2:** Old Value Field (Optional) - Field path to current color value (default: details.specificDimensions.color)

**Parameter 3:** New Value Field (Optional) - Field path to new color value (default: details.text1)

**Parameter 4:** Change Current Document Lines (Optional) - true/false to also update the line table of the current document's type (default: false)

**Parameter 5:** Handle Lines Where Old Property Is Empty (Optional) - true/false to process empty old values (default: false)

**Parameter 6:** Handle Lines Where NEW Property Is Empty (Optional) - true/false to process empty new values (default: false)

**Parameter 7:** Do Not Regen Inventory Requests After Update (Optional) - true/false to skip inventory effect regeneration (default: false)

## Database Tables Affected

- **All Supply Chain Document Line Tables** - Updates color values across all document types
- **EndStockTakingLine** - Updates color values in stock taking records
- **QtyTransLine** - References for inventory effect regeneration (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.plugnplay.EAReplaceItemColorInSystem`

**Related Actions:**
- [EAReplaceItemSizeInSystem](EAReplaceItemSizeInSystem.md)
- [EAReplaceItemBoxInSystem](EAReplaceItemBoxInSystem.md)


</div>