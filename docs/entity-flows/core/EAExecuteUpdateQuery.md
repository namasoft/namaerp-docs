---
title: EAExecuteUpdateQuery
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAExecuteUpdateQuery

## Overview

Executes custom SQL UPDATE, INSERT, or DELETE statements directly against the database for bulk operations and data modifications with optional cache eviction.

## When This Action Runs

Manual or automated execution for bulk data operations, data migration, and database maintenance.

## How It Works

1. **Prepares SQL statement** with parameter substitution using {fieldName} syntax
2. **Executes query directly** against database within current transaction. A statement that uses line fields (`{details.item.item.id}`) is executed once per line of the record
3. **Optionally evicts cache** to maintain data consistency

## Parameters

**Parameter 1:** Update Query (Required) - Valid SQL UPDATE, INSERT, or DELETE statement (use {fieldName} for entity references)

**Parameter 2:** Evict Cache After Execution(true,false) (Optional) - `true` clears all the system caches after execution (default: false)

## Database Tables Affected

- **Any Database Tables** - Direct modifications to specified tables in SQL statement
- **Hibernate Cache** - May require eviction to maintain consistency

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAExecuteUpdateQuery`


</div>