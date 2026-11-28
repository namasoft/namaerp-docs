---
title: EARefreshCriticalErrors
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARefreshCriticalErrors

## Overview

Refreshes the system's critical errors cache to update error notifications and status indicators. This action forces the system to re-evaluate and update critical error conditions across all modules and displays.

## When This Action Runs

Manual execution when critical error indicators need to be refreshed, typically after resolving system issues or updating configurations that affect error detection. The checks themselves are described on [Critical Errors](/admin/troubleshooting/critical-errors).

## How It Works

1. **Triggers refresh** - Rebuilds the critical errors cache
2. **Re-evaluates conditions** - System re-checks all critical error conditions across modules
3. **Updates displays** - The refreshed list is what users see the next time the critical errors are shown

## Parameters

**No Parameters Required** - This action runs without any configuration parameters.

## Database Tables Affected

- **Critical Error Cache** - Refreshes in-memory cache of critical system errors
- **Error Status Tables** - May read from various tables to evaluate current error conditions

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARefreshCriticalErrors`


</div>