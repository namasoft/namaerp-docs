---
title: EAEGBRASSFixCreationDates
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEGBRASSFixCreationDates

## Overview

Bulk fixes creation dates on the stock issues and stock receipts that an assembly document generated, identified by SQL query. Gives each document the creation date its assembly document assigns to it (the issue is dated before the receipt) and regenerates its inventory effects.

## When This Action Runs

Manual execution for data correction when creation dates are incorrect or inconsistent, typically after data migration, system integration issues, or when documents need chronological reordering for accurate inventory processing.

## How It Works

1. **Executes SQL query** - Finds documents to process based on query criteria
2. **Synchronizes with source** - Sets the creation date of the document to the one its source document (fromDoc) assigns to the documents it generates
3. **Regenerates inventory effects** - Recalculates inventory transactions with corrected dates
4. **Processes in sequence** - Handles each document individually with error accumulation

## Parameters

It takes the same six parameters, in the same order and with the same rules, as EARecommitFromQuery: see [its Parameters section](/entity-flows/core/EARecommitFromQuery#Parameters). On this flow the titles of Parameters 3, 4 and 6 read *Do not Fix Creation Date cancelled Records (true,false)*, *Flush After Each Fix Creation Date (true,false)* and *Run Update Query After Selecting Entities, and Before Fix Creation Date*.

Example for Parameter 1:

```sql
select entityType,id from StockIssue where fromDoc_id = {id}
```

## Database Tables Affected

- **Supply Chain Documents** - Updates creation dates on target documents
- **Inventory Transactions** - Regenerates inventory effects with new dates
- **Document Relationships** - Reads source document dates (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAEGBRASSFixCreationDates`

**Parent Class:** `EARecommitFromQuery`

**Related Actions:**
- [EARecommitFromQuery](../core/EARecommitFromQuery.md) - Parent class for bulk operations


</div>

