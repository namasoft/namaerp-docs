---
title: EAPreventRepeatedValuesAtDetail
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAPreventRepeatedValuesAtDetail

## Overview

Validates document detail collections to prevent duplicate values in specified fields across detail lines. Uses configurable field combinations to define what constitutes a duplicate and blocks document save when repeated values are found in the specified detail collection.

## When This Action Runs

Automatic execution during document save/commit operations to validate that specified fields in detail collections do not contain duplicate value combinations.

## How It Works

1. **Retrieves detail collection** - Gets the specified detail collection from the document using reflection
2. **Parses field specifications** - Extracts field names from comma or newline separated list
3. **Applies query filter (optional)** - If a query is provided, evaluates which lines match the criteria using LineIndices
4. **Processes each detail line** - For each line in the collection:
   - Skips lines that don't match query criteria (if query is specified)
   - Extracts values from specified fields using reflection
   - Creates composite key from field values
   - Checks if key already exists from previous lines
5. **Detects duplicates** - Tracks which line number first used each unique key combination
6. **Reports violations** - Adds a failure for every line whose combination of values already appeared on an earlier line

## Parameters

**Parameter 1:** Details Name (Required) - Name of the detail collection field to validate

Example: `details`, `packingList`, `paymentLines`

**Parameter 2:** Not To Repeat Field Names (Required) - Field names that should not have duplicate combinations, separated by comma (,) or Enter

Format: Comma-separated or newline-separated field names with collection prefix. A name that does not start with the details name of Parameter 1 followed by a dot is refused with *The field {0} does not belong to the details {1}*

Example: `details.text1,details.item.item`

**Parameter 3:** Apply Only on Lines Matching Query (Optional) - SQL-like query to filter which lines to validate

Format: Standard Nama ERP query syntax with field references in curly braces

Example: `select case when {details.n1} > 0 then 1 else 0 end`

## Database Tables Affected

- **Detail Collections** - Validates uniqueness of field combinations within collections (read-only validation)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventRepeatedValuesAtDetail`

**Validation Type:** Generic Detail Duplicate Prevention

**Scope:** Any document detail collection with configurable fields


</div>

