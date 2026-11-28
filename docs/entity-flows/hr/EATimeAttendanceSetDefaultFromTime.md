---
title: EATimeAttendanceSetDefaultFromTime
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EATimeAttendanceSetDefaultFromTime

## Overview

Automatically sets punch-in (from) times for time attendance records that have missing start times. Uses employee work schedules to determine appropriate default start times based on shift patterns and existing punch-out times.

## When This Action Runs

Manual execution for fixing incomplete time attendance records, typically used during payroll processing or attendance data cleanup when employees have punch-out times but missing punch-in times.

## How It Works

1. **Identifies incomplete records** - Finds time attendance lines with missing from dates/times
2. **Retrieves work schedules** - Gets employee work day patterns and shift times
3. **Matches shift patterns** - Finds appropriate work time slots based on existing punch-out times
4. **Calculates distances** - Compares shift end times with recorded punch-out times
5. **Sets start times** - Assigns shift start times to missing from time fields
6. **Handles day wrapping** - Adjusts dates for shifts that span multiple days
7. **Validates duration** - When the resulting attendance is longer than **Max Continuous Attendance Hours** in the HR configuration, the from date and from time that were just set are cleared again; the line itself stays

## Parameters

**Parameter 1:** Criteria Code (For Employee) (Optional) - Code of a criteria definition; only lines whose employee matches it are processed. Empty processes every employee

**Parameter 2:** Calc Only If Workday (Optional) - "true" to process only on scheduled work days, "false" to process all days

**Parameter 3:** Max Distance In Hours (Optional) - Maximum difference in hours between shift end time and actual punch-out time. Empty or `0` means no limit

## Database Tables Affected

- **TimeAttendanceLine** - Updates from date and from time fields for incomplete records
- **Employee Work Schedules** - Reads work day patterns and shift definitions
- **HR Configuration** - References maximum continuous attendance settings

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceSetDefaultFromTime`

**Related Actions:**
- [EATimeAttendanceSetDefaultToTime](EATimeAttendanceSetDefaultToTime.md) - Sets default punch-out times for missing end times


</div>