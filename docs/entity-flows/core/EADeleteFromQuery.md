---
title: EADeleteFromQuery
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EADeleteFromQuery

## Overview

Executes SQL query to find entities, then deletes all returned entities. Powerful bulk deletion tool with transaction management and error handling options.

## When This Action Runs

Manual or automated execution for bulk deletion operations, data cleanup, cascade deletions, and maintenance.

## How It Works

1. **Executes SQL query** to find entities (must return entityType and id columns)
2. **Collects entity list** with duplicate prevention and validation
3. **Runs optional update query** before deletion if specified
4. **Deletes entities individually** using proper business logic
5. **Manages transactions** and error handling based on configuration

## Parameters

**Parameter 1:** Query (Required) - SQL query whose first column is the entity type and second column is the id (read by position; supports {fieldName} substitution). A record returned more than once is deleted once

**Parameter 2:** Flush Before Starting (Optional) - `true` writes the pending changes of the current save to the database before the query of Parameter 1 runs

**Parameter 3:** Do not Delete cancelled Records (Optional) - "true"/"false" to skip cancelled documents. Empty means "true": cancelled documents are skipped unless this is set to `false`

**Parameter 4:** Flush After Each Delete (Optional) - "true"/"false" to flush after each deletion

**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - `true` deletes each record in its own transaction and carries on after a failure. Empty or `false` stops at the first failure

**Parameter 6:** Run Update Query After Selecting Entities, and Before Delete (Optional) - SQL update query run after the records are selected and before the first deletion

## Database Tables Affected

- **Query Tables** - Any tables referenced by SQL query (read-only)
- **Target Entity Tables** - Tables of entities returned by query (deleted with business logic)
- **Audit Tables** - Deletion logs and transaction logs created

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADeleteFromQuery`

## Related Actions

- [EARunManualNotificationFromQuery](EARunManualNotificationFromQuery.md)
- [EARegenAccFromQuery](EARegenAccFromQuery.md)
- [EARegenInvTransReqFromQuery](../supplychain/EARegenInvTransReqFromQuery.md)
- [EASaveRecordsFromQuery](EASaveRecordsFromQuery.md)
- [EAEGBRASSFixCreationDates](../supplychain/EAEGBRASSFixCreationDates.md)


</div>

