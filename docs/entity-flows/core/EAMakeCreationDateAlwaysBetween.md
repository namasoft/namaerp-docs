---
title: EAMakeCreationDateAlwaysBetween
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAMakeCreationDateAlwaysBetween

## Overview

Adjusts document creation dates to ensure they fall within a specified time window by synchronizing with value date and adding/subtracting random milliseconds until time is between start and end hours.

## When This Action Runs

Time window enforcement for DocumentFile entities requiring creation time constraints within specific business operation hours.

## How It Works

1. **Validates document value date** and synchronizes creation date with it
2. **Analyzes current hour** against target window boundaries
3. **Determines adjustment direction** (forward or backward) to reach target window
4. **Applies random milliseconds** bidirectionally until time falls within specified hours
5. **Updates creation date** with window-compliant time and infinite loop protection

## Parameters

**Parameter 1:** Ignore (Not Used) - Leave empty.

**Parameter 2:** Start Hour (Required) - Starting hour (0-23) of time window, inclusive (e.g., 9 for 9 AM)

**Parameter 3:** End Hour (Required) - Ending hour (0-23) of time window, exclusive (e.g., 17 for 5 PM)

*Note: Start hour must be less than end hour and different from end hour. Saving the entity flow is refused otherwise with* Start hour and end hour can not be the same *or* Start hour can not be after end hour.

The flow line shows the titles *Ignore*, *Start Hour (e.g: 10,13* and *End Hour (e.g: 11,18*. A document with no value date, or one that keeps the creation date given by its From Document, is left unchanged.

## Database Tables Affected

- **DocumentFile Creation Date** - Updates creation date field with time adjusted to target window
- **Value Date** - Read only; the creation date is moved onto it
- **Self-Contained Operation** - Changes isolated to target document only

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateAlwaysBetween`

**Related Actions:**
- [EAMakeCreationDateAlwaysBefore](EAMakeCreationDateAlwaysBefore.md) - Ensures creation time is before specified hour
- [EAMakeCreationDateAlwaysAfter](EAMakeCreationDateAlwaysAfter.md) - Ensures creation time is after specified hour


</div>