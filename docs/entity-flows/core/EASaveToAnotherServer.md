---
title: EASaveToAnotherServer
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EASaveToAnotherServer

## Overview

Synchronizes data between different Nama ERP servers by sending entity records to remote servers. Handles authentication, data transformation, and error tracking for reliable data replication.

## When This Action Runs

- **Trigger:** Manual execution or automated synchronization
- **Target:** Any entity record requiring replication
- **Purpose:** Multi-site data synchronization and integration
- **Timing:** On-demand or scheduled for data consistency

## How It Works

1. **Prepares data** by converting the record to the form the other server's entity service receives
2. **Authenticates** with target server using provided credentials
3. **Transmits data** via the other server's web services
4. **Tracks results** with audit logging and retry logic for failures

## Key Parameters

### Connection Parameters
- **Parameter 1:** Other Server URL (Required) - `http://hostname:port/` or `https://hostname:port/`
- **Parameter 2:** Login ID (Required) - Username for target server authentication
- **Parameter 3:** Password (Required) - Plain text password (automatically hashed)

### Processing Options
- **Parameter 4:** Append @draft to document files code if first save - `true` adds `@draft` to the code when the record has never been saved as final and its code does not already end with `@draft`
- **Parameter 5:** Ignore Not Found References on the Other Server (true/false) - `true` saves the record even when some of its references do not exist on the other server
- **Parameter 6:** Save As Draft (true/false) - `true` saves the record as a draft on the other server; empty or `false` saves it as final
- **Parameter 9:** Max Trials Count (default 10) - How many times the send is tried when the connection fails. A refusal returned by the other server is not retried

### Advanced Options
- **Parameter 10:** Save From Query - A query returning `entityType, id` of the records to send instead of the current record, e.g. `select entityType,id from SalesInvoice where valueDate >= {date1}`. Each record is sent in its own transaction and a record returned twice is sent once
- **Parameter 11:** Add Manual Code Prefix (true/false) - For a record already saved as final whose code is generated automatically on its type: `true` sends the code marked as a manual code, so the other server keeps it instead of generating a new one
- **Parameter 12:** Keep Creation Date - `true` keeps the record's creation date on the other server

## Database Tables Affected

### SentEntityToAnotherServerSysEntry
- **targetRecord** - Reference to synchronized entity
- **status** - `Executed` when the record was sent, `Failed` otherwise
- **remoteServer** - Target server URL
- **executionTime** - Synchronization timestamp
- **errorMessage** - Error details if failed

## Business Use Cases

1. **Multi-Site Synchronization:** Master data between branches
2. **Data Migration:** Moving entities between installations
3. **Integration:** Real-time or scheduled data replication

```sql
SELECT s.targetRecordEntityType, s.targetRecordCode, s.status, s.remoteServer, s.executionTime, s.errorMessage
FROM SentEntityToAnotherServerSysEntry s
WHERE s.executionTime >= DATEADD(day, -7, GETDATE())
ORDER BY s.executionTime DESC;
```

## Related Actions

- **EASaveToAnotherServerUsingJSON** - JSON-based server synchronization

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EASaveToAnotherServer`

</div>

