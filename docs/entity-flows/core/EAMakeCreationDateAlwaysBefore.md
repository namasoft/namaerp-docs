---
title: EAMakeCreationDateAlwaysBefore
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAMakeCreationDateAlwaysBefore

## Overview

Adjusts document creation dates to ensure they always occur before a specified hour by synchronizing with value date and subtracting random milliseconds.

## When This Action Runs

Document date enforcement for DocumentFile entities requiring creation time constraints within business hour limitations.

## How It Works

1. **Validates document value date** and synchronizes creation date with it
2. **Compares creation hour** with specified maximum hour
3. **Subtracts random milliseconds** backward until time is before specified hour
4. **Protects start-of-day boundary** to prevent invalid times
5. **Updates creation date** maintaining consistency with value date

## Parameters

**Parameter 1:** Hour (Optional) - Title: *Hour (e.g: 10,13,23*. Hour (1-23) before which creation time must occur. Empty, `0` or a value that is not a whole number means 12

A document with no value date, or one that keeps the creation date given by its From Document, is left unchanged.

## Database Tables Affected

- **DocumentFile Creation Date** - Updates creation date field with adjusted time aligned to value date
- **Value Date** - Read only; the creation date is moved onto it
- **Self-Contained Operation** - Changes isolated to target document only

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAMakeCreationDateAlwaysBefore`

**Related Actions:**
- [EAMakeCreationDateAlwaysAfter](EAMakeCreationDateAlwaysAfter.md) - Ensures creation time is after specified hour


</div>

