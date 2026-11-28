---
title: EASaveRecordsFromQuery
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASaveRecordsFromQuery

## Overview

Bulk saves entities identified by a SQL query. It works like [EARecommitFromQuery](/entity-flows/core/EARecommitFromQuery), with the same six parameters and rules, but opens each record for editing and saves it instead of recommitting it, triggering full validation and business logic.

## When This Action Runs

Manual execution for bulk entity saving operations after data modifications, corrections, or when entities need full save processing to trigger business rules and validation.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Optional pre-update** - Runs optional update query after selection but before saving
4. **Starts editing** - Opens each entity for editing; a record that cannot be edited fails
5. **Commits entities** - Saves the record as final
6. **Handles errors** - Processes errors based on configuration (continue or stop)

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns

Example Query:
```sql
select entityType,id from StockIssue where fromDoc_id = {id} and n1 = 5
```

**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before starting (default: false)

**Parameter 3:** Do not Save cancelled Records (Optional) - true/false to skip cancelled DocumentFile entities (default: true)

**Parameter 4:** Flush After Each Save (Optional) - true/false to flush after each entity (default: false)

**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - true/false to continue processing if individual entities fail (default: false)

**Parameter 6:** Run Update Query After Selecting Entities, and Before Save (Optional) - SQL update query to run before saving

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **Entity Tables** - Updates entities through full save operation including validation
- **Related Tables** - All tables affected by entity business logic during save
- **Optional Update Tables** - Additional update query may affect other tables

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASaveRecordsFromQuery`

**Related Actions:**
- [EARecommitFromQuery](EARecommitFromQuery.md) - Parent class for bulk entity operations
- [EASaveDraftsFromQuery](EASaveDraftsFromQuery.md) - Specialized for draft entity saving


</div>