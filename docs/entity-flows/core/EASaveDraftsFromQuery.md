---
title: EASaveDraftsFromQuery
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASaveDraftsFromQuery

## Overview

Bulk saves draft entities identified by a SQL query. Processes entities that have draft status, committing them to permanent state with full validation and business logic execution. Continues processing remaining entities even if individual saves fail.

## When This Action Runs

Manual execution for bulk conversion of draft entities to committed state, typically for batch processing of prepared documents or completing pending transactions.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Validates draft status** - Only processes entities that have draftCreated = true; any other record returned by the query is skipped
4. **Commits entities** - Saves each draft as final, each in its own transaction
5. **Handles errors** - Continues processing remaining entities even if individual commits fail; a failed record stays a draft

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns

Example Query:
```sql
select entityType,id from StockIssue where commitedBefore = 0 and draftCreated = 1
```

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **Entity Tables** - Updates entity status from draft to committed
- **Related Tables** - All tables affected by entity business logic during commit
- **Validation Tables** - Tables accessed during commit validation

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASaveDraftsFromQuery`


</div>