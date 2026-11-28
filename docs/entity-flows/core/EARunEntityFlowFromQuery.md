---
title: EARunEntityFlowFromQuery
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARunEntityFlowFromQuery

## Overview

Bulk executes an entity flow on multiple entities identified by a SQL query. Each entity found by the query has the specified entity flow executed against it in separate transactions with error isolation.

## When This Action Runs

Manual execution for bulk entity flow operations, such as running scheduled maintenance, batch processing, or applying business logic across multiple entities matching specific criteria.

## How It Works

1. **Locates target flow** - Finds EntityFlow by the specified business code
2. **Executes query** - Runs the provided SQL query to find target entities (must return entityType and id columns)
3. **Processes each entity** - For each result, loads the entity and checks flow applicability
4. **Executes in transactions** - Runs the entity flow on each entity in separate transactions
5. **Handles errors** - Continues processing remaining entities even if individual entities fail, then fails at the end with *Failed to apply entity flow {0} on {1} records*
6. **Supports cancellation** - Monitors for task cancellation during bulk operations

## Parameters

**Parameter 1:** Entity Flow Code (Required) - Code of the entity flow to execute. It is run as a manual entity flow on each record; a record it does not apply to is skipped. An unknown code stops the run with *Could not find entity flow with code {0}*

**Parameter 2:** Query (Required) - SQL query returning entityType and id columns
- Example Query:
```sql
select entityType,id from SalesInvoice where valueDate = getdate()
```

## Database Tables Affected

- **EntityFlow** - Reads flow configuration and execution parameters
- **Query Target Tables** - Reads from tables specified in the query
- **Variable Tables** - Depends on the target entity flow being executed
- **Target Flow Impact** - Database changes depend entirely on what the target flow does

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunEntityFlowFromQuery`

**Related Actions:**
- [EARunEntityFlow](EARunEntityFlow.md) - Single entity flow execution
- [EARecommitFromQuery](EARecommitFromQuery.md) - Bulk entity recommit operations


</div>