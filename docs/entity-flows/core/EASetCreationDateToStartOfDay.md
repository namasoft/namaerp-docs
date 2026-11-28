---
title: EASetCreationDateToStartOfDay
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASetCreationDateToStartOfDay

## Overview

Adjusts the entity's creation date to the start of the day (00:00:00). Preserves the original date but sets the time component to midnight, useful for date normalization and grouping operations.

## When This Action Runs

Manual execution for date standardization, reporting preparation, or when grouping entities by creation date without considering specific time components.

## How It Works

1. **Checks creation date** - Verifies if the entity has a creation date set
2. **Skips if empty** - Returns success without changes if creation date is null or empty
3. **Preserves date** - Keeps the original date (year, month, day)
4. **Sets time to midnight** - Changes time component to 00:00:00.000
5. **Updates entity** - Saves the modified creation date to the entity

## Parameters

**No Parameters** - Action does not require any input parameters

## Database Tables Affected

- **Entity Tables** - Updates the creation date field (creationDate) in the entity's main table
- **Audit Tables** - May trigger audit logging if entity modification tracking is enabled

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASetCreationDateToStartOfDay`

**Related Actions:**
- [EASetCreationDateToEndOfDay](EASetCreationDateToEndOfDay.md) - The end-of-day counterpart, which is not supported


</div>

