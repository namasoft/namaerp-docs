---
title: EARecommitFromQuery
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARecommitFromQuery

## Overview

Bulk recommits entities identified by a SQL query. Executes the query to find entities, then recommits each one to trigger entity flows, business rules, and validation logic. Supports transaction control and error handling for large-scale operations.

## When This Action Runs

Manual execution for bulk recommitting entities after system updates, configuration changes, or data corrections that require re-triggering business logic.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Optional pre-update** - Runs optional update query after selection but before recommitting
4. **Recommits entities** - Loads and recommits each entity individually to trigger business logic
5. **Handles errors** - Processes errors based on configuration (continue or stop)

## Parameters

**Parameter 1:** Query (Required) - SQL query whose first column is the entity type and second column is the id; the columns are read by position (e.g., `select entityType,id from StockIssue where fromDoc_id = {id}`). A query that uses line fields of the record running the flow is run once per line. A record returned more than once is processed once

**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before starting (default: false)

**Parameter 3:** Do not Recommit cancelled Records (Optional) - true/false to skip cancelled DocumentFile entities (default: true)

**Parameter 4:** Flush After Each Recommit (Optional) - true/false to flush after each entity (default: false)

**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - `true` processes each record in its own transaction, so a record that fails is rolled back alone and the run carries on with the next one. Empty or `false` stops the run at the first failure (default: false)

**Parameter 6:** Run Update Query After Selecting Entities, and Before Recommit (Optional) - SQL update query run after the records are selected and before the first one is recommitted. When Parameter 5 is `true` it runs once, in a transaction of its own; otherwise a query that uses line fields runs once per line

Parameter 1 must be filled and Parameters 2 to 5 accept only `true`, `false` or empty; the entity flow is refused on save otherwise. [EADeleteFromQuery](/entity-flows/core/EADeleteFromQuery), [EASaveRecordsFromQuery](/entity-flows/core/EASaveRecordsFromQuery), [EARegenAccFromQuery](/entity-flows/core/EARegenAccFromQuery), [EARunBulkMassagesFromQuery](/entity-flows/core/EARunBulkMassagesFromQuery) and [EARunManualNotificationFromQuery](/entity-flows/core/EARunManualNotificationFromQuery) take the same six parameters with the same rules (the last one adds a seventh); only what is done to each record differs. The supply chain flows [EARegenInvTransReqFromQuery](/entity-flows/supplychain/EARegenInvTransReqFromQuery) and [EAEGBRASSFixCreationDates](/entity-flows/supplychain/EAEGBRASSFixCreationDates) take the same six parameters too. On each of these flows the titles of Parameters 3, 4 and 6 carry the flow's own operation name in place of *Recommit*.

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **Entity Tables** - Recommits affect all tables related to the target entities
- **Optional Update Tables** - Additional update query may affect other tables

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARecommitFromQuery`


</div>