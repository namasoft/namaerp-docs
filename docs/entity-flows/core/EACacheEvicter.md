---
title: EACacheEvicter
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EACacheEvicter

## Overview

Clears Hibernate second-level cache for a specific entity type, ensuring cached data is refreshed and subsequent queries retrieve current information from the database.

## When This Action Runs

Manual execution after data was changed outside the application, for example by an SQL update run directly on the database.

## How It Works

1. **Resolves the entity type** named in Parameter 1
2. **Evicts cache entries** for that entity type only, so the next reads of its records come from the database

Use it after records of a cached type (items, customers, ...) were changed by a direct SQL update, which the cache does not see.

## Key Parameters

- **Parameter 1:** Entity Type (Required) - Case-sensitive entity type name (e.g., `Customer`, `InvItem`)

## Database Tables Affected

No direct database changes. Action only affects Hibernate second-level cache. Subsequent queries will access database instead of cache until cache rebuilds.

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACacheEvicter`

</div>

