---
title: EASaveToAnotherServerUsingJSON
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EASaveToAnotherServerUsingJSON

## Overview

Synchronizes data between Nama ERP servers using JSON format for data transmission. Provides more flexible alternative to direct DTO transfer through JSON export/import.

## When This Action Runs

- **Trigger:** Manual execution or automated synchronization
- **Target:** Any entity record requiring JSON-based replication
- **Purpose:** Server synchronization with JSON format flexibility
- **Timing:** On-demand or scheduled for data consistency

## How It Works

1. **Exports entity to JSON** using JsonRecordExporter (full structure)
2. **Applies field overrides** to JSON before transmission
3. **Transmits via CoreWS** using `importJsonFromAnotherServer()` method
4. **Imports on target server** with configuration options for references and drafts

## Key Differences from Standard EASaveToAnotherServer

### Advantages
- **Format Flexibility:** JSON is more portable and debugging-friendly
- **Complete Structure:** Exports both header and collection data

### Limitations
- **Keep Creation Date:** NOT SUPPORTED (throws exception)
- **Performance:** JSON serialization adds processing overhead

## Parameters

The parameters are the same as [EASaveToAnotherServer](EASaveToAnotherServer.md):

**Parameter 1:** Other Server URL (Required) - `http://hostname:port/` or `https://hostname:port/`, for example `http://localhost:7070/`

**Parameter 2:** Login ID (Required) - Username for target server authentication

**Parameter 3:** Password (Required) - Plain text password (automatically hashed)

**Parameter 4:** Append @draft to document files code if first save (true/false) - Adds `@draft` to the code when the record has never been committed

**Parameter 5:** Ignore Not Found References on the Other Server (true/false) - Saves the record even when some of its references do not exist on the other server

**Parameter 6:** Save As Draft (true/false) - Saves the record as a draft on the other server instead of committing it

**Parameter 7:** Fields Value Overrider (Optional) - Field map of header fields whose values replace the exported ones, for example:
```
book="ABC"
name1=sql(select case when {group.code} = '11' then '' else {group.name1} end)
```

**Parameter 8:** Do Not Use Current User Dimensions (true/false) - Does not send the current user's dimensions with the import

**Parameter 9:** Max Trials Count (Optional) - How many times to retry on a connection failure (default 10)

**Parameter 10:** Save From Query (Optional) - SQL returning `entityType, id` of the records to send instead of the current record, for example `select entityType,id from SalesInvoice where valueDate >= {date1}`

**Parameter 11:** Add Manual Code Prefix - Leave empty.

**Parameter 12:** Keep Creation Date - Not supported by this flow; setting it to `true` stops the flow with an error. Use [EASaveToAnotherServer](EASaveToAnotherServer.md) to keep the creation date

## JSON Structure Example

```json
{
  "EntityTypeName": [
    {
      "code": "INV001",
      "description": "Sample Invoice",
      "valueDate": "2023-12-01",
      "lines": [
        {
          "itemCode": "ITEM001",
          "quantity": 5,
          "unitPrice": 100.00
        }
      ]
    }
  ]
}
```

## Database Tables Affected

**Same as base class:**
- **Source Entity** - The entity being synchronized
- **SentEntityToAnotherServerSysEntry** - Audit log of synchronization attempts

## Related Actions

- **EASaveToAnotherServer** - Standard DTO-based server synchronization

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EASaveToAnotherServerUsingJSON`

</div>

