---
title: EAWathqBasicInfoFetcher
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAWathqBasicInfoFetcher

## Overview

Fetches basic commercial registration information from Saudi government's Wathq platform. Provides a lightweight alternative to the full commercial info fetcher, focusing on essential company identification data.

## When This Action Runs

Manual execution on customers and suppliers that have a **Commercial Registration National Number**.

## How It Works

It works as [EAWathqCommercialInfoFetcher](/entity-flows/core/EAWathqCommercialInfoFetcher), with the same checks, messages and automatic copy, except that it calls the `/commercial-registration/info/` endpoint (basic information) instead of `/fullinfo/`. The contact details are copied only when the response contains them.

## Key Parameters

The six parameters are those of [EAWathqCommercialInfoFetcher](/entity-flows/core/EAWathqCommercialInfoFetcher#Key-Parameters). The title of Parameter 3 shows the example `description1=$map.crNumber`.

## Database Tables Affected

- **Target Entity** - Updates `name1`, `taxInfo.*` fields
- **WathqCallInfo** - Audit log with CR number, entity reference, timestamp, and response

## Related Actions

- [EAWathqAddressFetcher](EAWathqAddressFetcher.md)
- [EAWathqCommercialInfoFetcher](EAWathqCommercialInfoFetcher.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqBasicInfoFetcher`

</div>

