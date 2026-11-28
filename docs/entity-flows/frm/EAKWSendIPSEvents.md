---
title: EAKWSendIPSEvents
module: frm
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAKWSendIPSEvents

## Overview

Sends mail item status events to the International Postal System (IPS) for postal tracking integration. Processes mail items from entity detail collections and creates integration tasks to update postal tracking status in the external IPS system.

## When This Action Runs

Manual execution for updating postal tracking status when mail items change location, status, or encounter delivery issues. Typically used in postal management systems for international mail tracking compliance.

## How It Works

1. **Checks configuration** - Does nothing when the FRM module configuration option Do Not Send IPS Documents Events To IPS is ticked
2. **Processes detail records** - Iterates through specified detail collection containing mail items
3. **Validates mail items** - Skips a detail line whose mail item is empty. When the configuration field Allowed Mail Item Prefix To Send To IPS is filled (comma-separated), also skips a mail item that starts with none of the listed prefixes (case is ignored)
4. **Builds event data** - Creates JSON payload with the mail item ID, its origin country (the last two characters of the mail item ID), office codes, and the event information of the IPS Event record
5. **Looks up classifications** - Finds the mail class code from the delivery entry of the mail item, and if it has none, from a postal parcels sort line of the same mail item; otherwise the class is sent empty
6. **Creates integration tasks** - Saves IPS integration tasks for asynchronous processing
7. **Flushes changes** - Ensures all integration tasks are committed to database

## Parameters

**Parameter 1:** office code (Optional) - Current postal office code handling the mail item

**Parameter 2:** next office code (Optional) - Destination office code for forwarding

**Parameter 3:** non delivery reason code (Optional) - Code indicating reason for delivery failure

**Parameter 4:** non delivery measure code (Optional) - Code indicating corrective action taken

**Parameter 5:** details field id (Required) - Field ID of the detail collection containing mail items

**Parameter 6:** mail item field id (Required) - Field ID within detail records containing mail item identifiers

**Parameter 7:** event code (Required) - Code or ID of the IPS Event record defining the type of status update

## Database Tables Affected

- **IPSIntegrationTask** - Creates new integration tasks for IPS communication
- **IPSEvent** - Reads event configuration for JSON formatting
- **DLVDeliveryEntry** - Looks up mail classification codes
- **IPSPostalParcelsSortLine** - Alternative lookup for mail classification codes
- **FRMConfiguration** - Reads module settings for IPS integration

**Module:** frm

**Full Class Name:** `com.namasoft.modules.frm.common.EAKWSendIPSEvents`


</div>