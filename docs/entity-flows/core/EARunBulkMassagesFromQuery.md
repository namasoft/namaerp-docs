---
title: EARunBulkMassagesFromQuery
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EARunBulkMassagesFromQuery

## Overview

**Description:** Send bulk message notifications for all records returned by a SQL query

This entity flow allows you to send notifications (emails, SMS, or other message types) for multiple bulk message records at once. It processes each bulk message record from your query results and triggers the configured notification for that message.

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunBulkMassagesFromQuery`

---

## What This Flow Does

When you run this flow, it:

1. **Runs your SQL query** to find bulk message records
2. **Runs the update query** of Parameter 6, when there is one.
3. **For each bulk message found**, it:
   - Skips it when it is cancelled (unless Parameter 3 is `false`)
   - Refuses it with *The bulk message {0} does not have a valid notification definition* when its notification is empty
   - Sends the notification using the system's notification engine
   - Marks the message as sent by setting `sendWasCalled = 1`
4. **Handles errors** based on Parameter 5: stop at the first failure, or continue with the next message

A row that is not a bulk message is skipped.

::: tip Common Use Case
This flow is typically used to send notifications for bulk messages that were created but not yet sent. For example, after importing bulk messages or when retrying failed messages.
:::

---

## Parameters

The **Title** column is the caption the entity flow line shows above each parameter after saving.
Parameter 1 must be filled, and Parameters 2-5 accept only `true`, `false` or empty; the entity flow is
refused on save otherwise.

| Parameter | Title | What to enter |
|---|---|---|
| Parameter 1 | Query eg. select entityType,id from BulkMessage where sendWasCalled = 0 | A query whose first column is the entity type and second column is the record id. Rows with an empty type or id are ignored, and a message returned twice is sent once. |
| Parameter 2 | Flush Before Starting (true,false) | `true` writes the pending changes of the current save to the database before the query runs, so the query sees them. |
| Parameter 3 | Do not Run Bulk Massage Notification cancelled Records (true,false) | Empty or `true`: cancelled bulk messages are skipped. `false`: they are sent too. |
| Parameter 4 | Flush After Each Run Bulk Massage Notification (true,false) | `true` writes the changes to the database after each message is sent. |
| Parameter 5 | Do In New Transaction - Continue on Errors (true,false) | `true`: each message is sent in its own transaction; a failing one is reported and the flow moves on to the next, keeping the ones already sent. Empty or `false`: the first failure stops the flow. |
| Parameter 6 | Run Update Query After Selecting Entities, and Before Run Bulk Massage Notification | Optional. An update statement run once, after Parameter 1 has selected the messages and before the first one is sent. With Parameter 5 `true` it runs in its own transaction. |

**Example query** for Parameter 1:
```sql
select entityType, id from BulkMessage where sendWasCalled = 0
```

This example finds all bulk messages that haven't been sent yet.

## Technical Notes

This flow extends the base class `EARecommitFromQuery`, which provides the query execution and batch processing framework. The actual notification sending is handled by `NotificationsEngine.manualNotify()`.

**Source Code Location:** `code/infra/domain-base/src/main/java/com/namasoft/infor/domainbase/util/actions/EARunBulkMassagesFromQuery.java:10`

</div>

