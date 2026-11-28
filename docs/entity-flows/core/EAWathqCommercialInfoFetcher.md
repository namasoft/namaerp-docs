---
title: EAWathqCommercialInfoFetcher
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAWathqCommercialInfoFetcher

## Overview

Fetches commercial registration information from Saudi government's Wathq platform using Commercial Registration National Number. Populates company name, registration details, and contact information from official registry.

## When This Action Runs

Manual execution on customers and suppliers that have a **Commercial Registration National Number**.

## How It Works

1. Checks the record's **Commercial Registration National Number**; when it is empty the flow stops with *Please enter commercial registration national number*
2. Unless Parameter 6 is `true`, checks that this flow was not already called for the same national number; otherwise it stops with *There is a previous wathq call on commercial number {0} by user {1} on {2} record {3}* — «تم استدعاء بيانات رقم السجل التجاري {0} من قبل بواسطة المستخدم {1} بتاريخ {2} على السجل {3}»
3. Makes API request to `https://api.wathq.sa/commercial-registration/fullinfo/{crNationalNumber}`, in the language of the current user (Arabic or English)
4. Records the call and the response as a Wathq call entry
5. Maps Wathq response to entity fields: Arabic name (`name1`), **Commercial Registration Number**, **Commercial Registration National Number**, and, when the response has contact details, e-mail, mobile, website and telephone 1
6. Applies the field map of Parameter 3

## Key Parameters

The three Wathq flows ([EAWathqCommercialInfoFetcher](/entity-flows/core/EAWathqCommercialInfoFetcher), [EAWathqBasicInfoFetcher](/entity-flows/core/EAWathqBasicInfoFetcher) and [EAWathqAddressFetcher](/entity-flows/core/EAWathqAddressFetcher)) take the same six parameters:

- **Parameter 1:** API Key (Required) - Wathq platform API key
- **Parameter 2:** Bearer Token (Required) - OAuth token for authentication
- **Parameter 3:** Extra Fields Copier (Optional) - A [field map](/entity-flows/core/ai-generated-field-maps-documentation) applied after the automatic copy, in which `$map.<field>` reads a field of the Wathq response, e.g. `description1=$map.issueDateHijri` and `name2=$map.headquarterCityName`
- **Parameter 4:** Do Not Copy Any Fields (Optional) - `true` skips the automatic copy, so only the field map of Parameter 3 is applied
- **Parameter 5:** Log Response (Optional) - `true` writes the Wathq response to the server log
- **Parameter 6:** Multi Call On Same Data (Optional) - `true` allows calling the same flow again on a national number already called

Parameters 1 and 2 must be filled, and Parameters 4, 5 and 6 accept only `true`, `false` or empty; the entity flow is refused on save otherwise.

## Database Tables Affected

- **Target Entity** - Updates `name1`, `taxInfo.*`, and `contactInfo.*` fields
- **WathqCallInfo** - Audit log with CR number, entity reference, timestamp, and response

## Related Actions

- [EAWathqBasicInfoFetcher](EAWathqBasicInfoFetcher.md)
- [EAWathqAddressFetcher](EAWathqAddressFetcher.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAWathqCommercialInfoFetcher`

</div>

