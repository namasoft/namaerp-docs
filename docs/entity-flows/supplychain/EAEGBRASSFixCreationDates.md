---
title: EAEGBRASSFixCreationDates
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEGBRASSFixCreationDates

## Overview

Bulk fixes creation dates on supply chain documents identified by SQL query. Synchronizes creation dates with source documents and adjusts them based on document type (issues vs receipts) to maintain proper chronological order for inventory effects.

## When This Action Runs

Manual execution for data correction when creation dates are incorrect or inconsistent, typically after data migration, system integration issues, or when documents need chronological reordering for accurate inventory processing.

## How It Works

1. **Executes SQL query** - Finds documents to process based on query criteria
2. **Synchronizes with source** - Copies creation date from source document (fromDoc) if available
3. **Adjusts chronological order** - For StockIssue: makes creation date after source; for others: makes creation date before source
4. **Regenerates inventory effects** - Recalculates inventory transactions with corrected dates
5. **Processes in sequence** - Handles each document individually with error accumulation

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns

```sql
select entityType,id from StockIssue where fromDoc_id = {id}
```

**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before processing (default: false)

**Parameter 3:** Skip Cancelled Records (Optional) - true/false to ignore cancelled documents (default: true)

**Parameter 4:** Flush After Each Fix (Optional) - true/false to flush after each document (default: false)

**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - true/false. When true, each document is fixed in its own transaction, so an error in one document is logged and the remaining documents are still processed (default: false)

**Parameter 6:** Run Update Query After Selecting Entities, and Before Fix Creation Date (Optional) - SQL update query that runs after Parameter 1 has selected the documents and before their creation dates are fixed

## Database Tables Affected

- **Supply Chain Documents** - Updates creation dates on target documents
- **Inventory Transactions** - Regenerates inventory effects with new dates
- **Document Relationships** - Reads source document dates (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAEGBRASSFixCreationDates`

**Parent Class:** `EARecommitFromQuery`

**Related Actions:**
- [EARecommitFromQuery](../core/EARecommitFromQuery.md) - Parent class for bulk operations
- [EAMakeCreationDateAlwaysAfter](../core/EAMakeCreationDateAlwaysAfter.md) - Used for StockIssue documents
- [EAMakeCreationDateAlwaysBefore](../core/EAMakeCreationDateAlwaysBefore.md) - Used for other documents


</div>

