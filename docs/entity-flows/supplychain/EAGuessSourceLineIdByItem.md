---
title: EAGuessSourceLineIdByItem
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGuessSourceLineIdByItem

## Overview

Automatically establishes document line relationships by matching lines to their corresponding source lines when normal origin/from document links are missing or broken. Uses configurable matching criteria to find the best possible matches based on item IDs and additional line properties.

## When This Action Runs

Manual execution on documents with missing or incorrect line relationships, typically after data migration, document imports, batch processing, or when origin document links are corrupted and need to be rebuilt.

## How It Works

1. **Optional line filtering** - If conditional query provided, processes only matching lines
2. **Identifies unlinked lines** - Finds document lines without valid source line references
3. **Locates source documents** - Uses origin document or from document references  
4. **Searches potential matches** - Looks for lines in source documents with matching item IDs
5. **Applies matching criteria** - Compares lines based on enabled parameters (size, color, etc.) and takes the first source line that has the same item and the same value in every enabled field
6. **Validates existing links** - Checks if current source line ID still matches criteria
7. **Updates relationships** - Sets source line ID to establish proper document linkage

## Parameters

**Parameter 1:** Consider Size (Optional) - true/false to match size dimensions (default: false)

**Parameter 2:** Consider Color (Optional) - true/false to match color dimensions (default: false)

**Parameter 3:** Consider Revision (Optional) - true/false to match revision dimensions (default: false)

**Parameter 4:** Consider Lot ID (Optional) - true/false to match lot tracking (default: false)

**Parameter 5:** Consider Box (Optional) - true/false to match box dimensions (default: false)

**Parameter 6:** Consider Warehouse (Optional) - true/false to match warehouse locations (default: false)

**Parameter 7:** Consider Sales Man or Purchases Man (Optional) - true/false to match responsible person (default: false)

**Parameter 8:** Consider Ref 1 (Optional) - true/false to match reference field 1 (default: false)

**Parameter 9:** Consider Ref 2 (Optional) - true/false to match reference field 2 (default: false)

**Parameter 10:** Consider Locator (Optional) - true/false to match storage locations (default: false)

**Parameter 11:** Consider SubItem (Optional) - true/false to match sub-item references (default: false)

**Parameter 12:** Consider Active Percentage (Optional) - true/false to match active percentages (default: false)

**Parameter 13:** Consider Inactive Percentage (Optional) - true/false to match inactive percentages (default: false)

**Parameter 14:** Consider Remarks (Optional) - true/false to match remarks/notes (default: false)

**Parameter 15:** Apply Only If Query Applicable (Optional) - Query evaluated per line; only the lines for which it applies are processed

```sql
select case when {details.item.item.code} in ('A','B') then 1 else 0 end
```

## Database Tables Affected

- **Document Lines** - Updates source line ID references for matched lines
- **Source Document Lines** - Reads potential match candidates (read-only)
- **Item Master Data** - Uses item references for matching (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGuessSourceLineIdByItem`

**Related Actions:**
- [EAGuessSourceLineByItemIdAndFreeItem](EAGuessSourceLineByItemIdAndFreeItem.md) - Enhanced version with free item consideration


</div>