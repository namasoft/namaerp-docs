---
title: EAWathqAddressFetcher
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAWathqAddressFetcher

## Overview

Fetches address information from Saudi government's Wathq platform using Commercial Registration National Number. Populates entity address fields with official commercial registry data.

## When This Action Runs

Manual execution on customers and suppliers that have a **Commercial Registration National Number**.

## How It Works

The checks, the messages and the recording of each call are those of [EAWathqCommercialInfoFetcher](/entity-flows/core/EAWathqCommercialInfoFetcher). This flow:

1. Makes API request to `https://api.wathq.sa/spl/national/address/info/{crNationalNumber}`
2. Takes the first address of the response and writes it into the record's address: address 1, address 2, map location (latitude and longitude), postal code, district, city, street, building number and land plot number (from the unit number). A value missing from the response is written as `Not Found`. A response with no address changes nothing

## Key Parameters

The six parameters are those of [EAWathqCommercialInfoFetcher](/entity-flows/core/EAWathqCommercialInfoFetcher#Key-Parameters). The title of Parameter 3 shows the example `description1=$map.street`.

## Database Tables Affected

- **contactInfo.address*** - All address fields updated with Wathq data
- **WathqCallInfo** - Audit log with CR number, entity reference, timestamp, and response

## Related Actions

- [EAWathqBasicInfoFetcher](EAWathqBasicInfoFetcher.md)
- [EAWathqCommercialInfoFetcher](EAWathqCommercialInfoFetcher.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqAddressFetcher`

</div>

