---
title: EAMakeCreationDateAlwaysAfter
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAMakeCreationDateAlwaysAfter

## Overview

Moves a document's creation date onto its value date and adjusts the time so it always falls at or after a specified hour, by adding random milliseconds while keeping the date within the same day. A document with no value date, or one that keeps the creation date given by its From Document, is left unchanged.

## When This Action Runs

Date/time enforcement during entity creation or when time-based business rule validation is needed.

## How It Works

1. **Synchronizes with the value date:** when the creation date is on another day, its date becomes the value date and its time is kept. Then compares the hour with the specified minimum
2. **Adds random milliseconds** incrementally until time is after specified hour
3. **Maintains same-day constraint** with end-of-day boundary protection
4. **Updates creation date** with adjusted time ensuring business rule compliance
5. **Applies infinite loop protection** for edge cases and performance

## Parameters

**Parameter 1:** Hour (Optional) - Title: *Hour (e.g: 10,13,23*. Minimum hour (1-23) from which creation time must occur (e.g., 9 for business hours, 13 for afternoon). Empty, `0` or a value that is not a whole number means 12

## Database Tables Affected

- **Entity Creation Date Fields** - Updates creation date field with adjusted time
- **Value Date** - Read only; the creation date is moved onto it
- **Self-Contained Operation** - Changes isolated to target entity only

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateAlwaysAfter`

**Related Actions:**
- [EAMakeCreationDateAlwaysBefore](EAMakeCreationDateAlwaysBefore.md) - Ensures creation time is before specified hour


</div>

