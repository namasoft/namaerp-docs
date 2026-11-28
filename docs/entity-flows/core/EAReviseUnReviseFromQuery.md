---
title: EAReviseUnReviseFromQuery
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAReviseUnReviseFromQuery

## Overview

Bulk marks entities as revised or unrevised based on a SQL query. Allows mass status changes for entities requiring revision control, useful for bulk document status management and workflow operations.

## When This Action Runs

Manual execution for bulk revision status changes, typically when documents need to be marked as revised after corrections, or unrevised to reset their status for further processing.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Marks entities** - Marks each record as revised or unrevised, as Parameter 2 says
4. **Handles errors** - Stops processing on first error

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns
- Example Query:
```sql
select entityType,id from SalesInvoice where datediff(day,lastUpdateDate,getdate())>2 and primitiveValue = 0
```
**Parameter 2:** Revise Or Unrevise (Optional) - true to mark as revised, false to mark as unrevised (default: true)

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **Entity Status Fields** - Updates revision status fields on target entities
- **Entity Metadata** - May update entity modification timestamps and status tracking

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAReviseUnReviseFromQuery`


</div>