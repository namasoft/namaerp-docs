---
title: EASortFields
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASortFields

## Overview

Sorts detail collections within an entity based on specified field values. Allows reordering of detail records (like invoice lines, payment details) and optionally preserves original order in a backup field before sorting.

## When This Action Runs

Manual execution for organizing detail collections, improving data presentation, or preparing data for reports that require specific ordering of detail records.

## How It Works

1. **Identifies detail collection** - Locates the specified detail field collection in the entity
2. **Extracts sort values** - Retrieves values from the specified sort field for each detail record
3. **Saves original order** - Optionally stores current record positions in a backup field
4. **Applies sorting** - Sorts the detail collection based on the sort field values and direction
5. **Updates collection** - Reorders the detail records in the entity according to sort results

## Parameters

**Parameter 1:** Detail Field (Required) - Name of the detail collection field to sort (e.g., "details", "lines")

**Parameter 2:** Sort On Field (Required) - Field of the detail lines to sort by, written with the detail name first (e.g., "details.n2", "details.text1")

**Parameter 3:** Save Original Order In Field (Optional) - Field to store original position numbers before sorting (e.g. "details.n1")

**Parameter 4:** Sort Direction (Optional) - "asc" for ascending or "desc" for descending (default: "asc")

## Usage Examples

Sort lines by a number field and keep their original order in another:
```
Parameter 1: details
Parameter 2: details.n2
Parameter 3: details.n1
Parameter 4: asc
```

Sort lines by a text field (descending):
```
Parameter 1: details
Parameter 2: details.text1
Parameter 3: (empty)
Parameter 4: desc
```

## Database Tables Affected

- **Detail Collection Tables** - Reorders records within the specified detail collection
- **Backup Fields** - Updates original position field if specified in Parameter 3

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASortFields`


</div>