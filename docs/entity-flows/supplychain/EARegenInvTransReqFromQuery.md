---
title: EARegenInvTransReqFromQuery
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARegenInvTransReqFromQuery

## Overview

Bulk regenerates inventory transaction requests for multiple supply chain documents identified by SQL query. Processes each document returned by the query to regenerate inventory transaction requests, with special handling for uncommitted documents (delete requests) versus committed documents (create requests).

## When This Action Runs

Manual execution for bulk inventory request regeneration across multiple documents, typically used for system-wide inventory corrections, data migration cleanup, or when inventory effects need to be rebuilt for a set of related documents.

## How It Works

1. **Executes SQL query** - Finds documents to process based on query criteria
2. **Processes each document** - For each document returned by the query:
   - Generates inventory transaction requests using InvSystemFilesUtils
   - Sets request type based on document commit status:
     - Delete requests for uncommitted documents (commitedBefore = false)
     - Create requests for committed documents (default behavior)
   - Sets current request context on the document
   - Runs post-creation entity actions
   - Sends business request through request system
3. **Handles errors gracefully** - Uses accumulating result pattern to collect all issues
4. **Supports transaction control** - Optional flushing and transaction management

## Parameters

It takes the same six parameters, in the same order and with the same rules, as EARecommitFromQuery: see [its Parameters section](/entity-flows/core/EARecommitFromQuery#Parameters). On this flow the titles of Parameters 3, 4 and 6 read *Do not RegenInvTransReq cancelled Records (true,false)*, *Flush After Each RegenInvTransReq (true,false)* and *Run Update Query After Selecting Entities, and Before RegenInvTransReq*.

Example for Parameter 1:

```sql
select entityType,id from StockIssue where fromDoc_id = {id}
```

## Database Tables Affected

- **Inventory Transaction Requests** - Creates or deletes inventory transaction requests
- **Inventory Transaction History** - Records inventory movements and changes
- **Item Quantities** - Updates available, allocated, and on-hand quantities
- **Inventory Locations** - Updates warehouse and location-specific quantities
- **Business Request Queue** - Queues inventory requests for processing

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARegenInvTransReqFromQuery`

**Parent Class:** `EARecommitFromQuery`

**Related Actions:**
- [EARegenInvTransReq](EARegenInvTransReq.md) - Single document version
- [EARecommitFromQuery](../core/EARecommitFromQuery.md) - Base class for bulk operations
- [EARegenAccFromQuery](../core/EARegenAccFromQuery.md) - Similar bulk accounting regeneration


</div>

