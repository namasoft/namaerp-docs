---
title: EARegenAccFromQuery
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARegenAccFromQuery

## Overview

Bulk regenerates accounting effects for entities identified by a SQL query. It works like [EARecommitFromQuery](/entity-flows/core/EARecommitFromQuery), with the same six parameters, but regenerates only the accounting effects instead of recommitting the whole record. The query must return records that generate accounting effects.

## When This Action Runs

Manual execution for bulk accounting effect regeneration after chart of accounts changes, accounting configuration updates, or when financial calculations need recalculation across multiple entities.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Optional pre-update** - Runs optional update query after selection but before processing
4. **Generates accounting effects** - Rebuilds and sends the accounting request of each entity
5. **Handles errors** - Processes errors based on configuration (continue or stop)

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns 
- Example Query:
```sql
select s.entityType,s.id from SalesInvoice s left join DocumentTerm t on t.id = s.term_id
where t.code = 'term1' and s.valueDate between '20250601' and '20250630'
```
**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before starting (default: false)

**Parameter 3:** Do not RegenAccEffects cancelled Records (Optional) - true/false to skip cancelled DocumentFile entities (default: true)

**Parameter 4:** Flush After Each RegenAccEffects (Optional) - true/false to flush after each entity (default: false)

**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - true/false to continue processing if individual entities fail (default: false)

**Parameter 6:** Run Update Query After Selecting Entities, and Before RegenAccEffects (Optional) - SQL update query to run before processing

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **Ledger Transaction Tables** - Regenerates journal entries and accounting transactions
- **Accounting Effect Tables** - Updates accounting calculations and balances
- **Optional Update Tables** - Additional update query may affect other tables

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARegenAccFromQuery`

**Related Actions:**
- [EARecommitFromQuery](EARecommitFromQuery.md) - Parent class for bulk entity operations
- [EARegenAccEffects](EARegenAccEffects.md) - Single entity accounting effect regeneration


</div>