---
title: EARunManualNotification
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARunManualNotification

## Overview

Triggers a manual notification for the current entity using a predefined notification definition. Sends emails, SMS, or other configured notifications based on the notification template and recipient configuration.

## When This Action Runs

Manual execution when specific notifications need to be sent outside of automatic triggers, such as custom alerts, reminders, or status notifications for business processes.

## How It Works

1. **Locates notification definition** - Finds the notification definition by the code in Parameter 1; an unknown code stops with *Could not find notification definition with code {0}*
2. **Prepares notification data** - Uses current entity data to populate notification template
3. **Sends notification** - Runs the notification definition on the current record
4. **Returns results** - Reports success or failure of notification delivery

## Parameters

**Parameter 1:** Notification Definition Code (Required) - Business code of the NotificationDefinition to execute

## Database Tables Affected

- **NotificationDefinition** - Reads notification configuration, templates, and recipient settings
- **Notification Logs** - May create notification delivery tracking records
- **Entity Data** - Reads current entity data for notification content population

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunManualNotification`


</div>