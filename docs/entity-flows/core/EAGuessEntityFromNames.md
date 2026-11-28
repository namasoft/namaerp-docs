---
title: EAGuessEntityFromNames
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGuessEntityFromNames

## Overview

Intelligently guesses and assigns entity references based on name similarity matching using advanced string distance algorithms for data import, migration, and automated entity linking.

## When This Action Runs

Automated entity matching for reference fields requiring population during data import, migration, or entity linking scenarios.

## How It Works

1. **Validates field types** ensuring target is reference or generic reference field
2. **Applies matching algorithm** using exact matches first, then fuzzy matching with string distance
3. **Caches results** for performance optimization with automatic invalidation
4. **Scores potential matches** using weight-based scoring and configurable thresholds
5. **Assigns best match** to target reference field based on similarity scores

## Parameters

**Parameter 1:** Guess Into Field (Target) (Required) - Target reference field to populate (e.g., item, customer)

**Parameter 2:** Guess From Field (Source) (Required) - Source field containing text to match (e.g., `description1`, `details.text2`). The target and the source must both be header fields or both be fields of the same lines; mixing a header field with a line field fails with *The field {0} and {1} are header and detail, this is not yet supported*

**Parameter 3:** Target Entity Type (Conditional) - Required for generic reference fields (e.g., InvItem, Customer)

**Parameter 4:** Always Guess (Optional) - "true"/"false" to guess even if target field not empty (default: false)

**Parameter 5:** Max Applicable Weight (Optional) - Weight threshold for accepting matches (default: 50)

**Parameter 6:** Minimum Substring Length (Optional) - Minimum substring length for calculations (default: 4)

**Parameter 7:** Previous Result Cache Statement (Optional) - SQL query for previous matching results: its first column is a source text and its second column the id of the record that text was matched to before, e.g. `select distinct l.text2,l.item_id from PurchaseQuotationLine l where l.text2 <> '' and l.item_id is not null`. A source value found there is taken from it before any name matching

**Parameter 8:** Extra Comparison Fields (Optional) - Additional fields that must be equal, one `field of the guessed record=field of the current record` per line or separated by commas (e.g. `defaultDetailData.minPrice=details.n2`)

**Parameter 9:** Min Matched First Letters (Optional) - Minimum first letters that must match (default: 4)

## Database Tables Affected

- **Target Reference Fields** - Populates reference fields with matched entities
- **Entity Master Data** - Reads entity codes, names, and additional fields for matching (read-only)
- **Internal Cache** - Maintains matching cache for performance optimization

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGuessEntityFromNames`


</div>