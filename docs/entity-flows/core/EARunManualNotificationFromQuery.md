---
title: EARunManualNotificationFromQuery
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARunManualNotificationFromQuery

## Overview

Bulk sends manual notifications to multiple entities identified by a SQL query. It works like [EARecommitFromQuery](/entity-flows/core/EARecommitFromQuery), with the same first six parameters and rules, but sends a notification for each record instead of recommitting it.

## When This Action Runs

Manual execution for bulk notification operations, such as sending payment reminders, status updates, or promotional communications to entities matching specific criteria.

## How It Works

1. **Executes query** - Runs the provided SQL query to find entities (must return entityType and id columns)
2. **Processes results** - Extracts entity type and ID pairs from query results
3. **Optional pre-update** - Runs optional update query after selection but before notifications
4. **Sends notifications** - Runs the notification definition of Parameter 7 on each entity
5. **Handles errors** - Processes errors based on configuration (continue or stop)

## Parameters

**Parameter 1:** Query (Required) - SQL query returning entityType and id columns

Example Query:
```sql
select entityType,id from SalesInvoice where valueDate = cast(getdate() as date)
```

**Parameter 2:** Flush Before Starting (Optional) - true/false to flush database before starting (default: false)

**Parameter 3:** Do not Run Manual Notification On  cancelled Records (Optional) - true/false to skip cancelled DocumentFile entities (default: true)

**Parameter 4:** Flush After Each Run Manual Notification On  (Optional) - true/false to flush after each entity (default: false)

**Parameter 5:** Do In New Transaction - Continue on Errors (Optional) - true/false to continue processing if individual entities fail (default: false)

**Parameter 6:** Run Update Query After Selecting Entities, and Before Run Manual Notification On  (Optional) - SQL update query to run before notifications

**Parameter 7:** Manual Notification ID or Code (Required) - Business code or ID of NotificationDefinition to send

## Database Tables Affected

- **Query Target Tables** - Reads from tables specified in the query
- **NotificationDefinition** - Reads notification configuration and templates
- **Notification Logs** - Creates notification delivery tracking records
- **Optional Update Tables** - Additional update query may affect other tables

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunManualNotificationFromQuery`

**Related Actions:**
- [EARunManualNotification](EARunManualNotification.md) - Single entity notification
- [EARecommitFromQuery](EARecommitFromQuery.md) - Parent class for bulk entity operations


</div>