---
title: EATimeAttendanceSetDefaultToTime
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EATimeAttendanceSetDefaultToTime

## Overview

Automatically sets punch-out (to) times for time attendance records that have missing end times. Uses employee work schedules to determine appropriate default end times based on shift patterns and existing punch-in times.

## When This Action Runs

Manual execution for fixing incomplete time attendance records, typically used during payroll processing or attendance data cleanup when employees have punch-in times but missing punch-out times.

## How It Works

1. **Identifies incomplete records** - Finds time attendance lines with missing to dates/times
2. **Retrieves work schedules** - Gets employee work day patterns and shift times
3. **Matches shift patterns** - Finds appropriate work time slots based on existing punch-in times
4. **Calculates distances** - Compares shift start times with recorded punch-in times
5. **Sets end times** - Assigns shift end times to missing to time fields
6. **Handles day wrapping** - Adjusts dates for shifts that span multiple days
7. **Validates duration** - When the resulting attendance is longer than **Max Continuous Attendance Hours** in the HR configuration, the to date and to time that were just set are cleared again; the line itself stays

## Parameters

**Parameter 1:** Criteria Code (For Employee) (Optional) - Code of a criteria definition; only lines whose employee matches it are processed. Empty processes every employee

**Parameter 2:** Calc Only If Workday (Optional) - "true" to process only on scheduled work days, "false" to process all days

**Parameter 3:** Max Distance In Hours (Optional) - Maximum difference in hours between shift start time and actual punch-in time. Empty or `0` means no limit

## Database Tables Affected

- **TimeAttendanceLine** - Updates to date and to time fields for incomplete records
- **Employee Work Schedules** - Reads work day patterns and shift definitions
- **HR Configuration** - References maximum continuous attendance settings

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceSetDefaultToTime`

**Related Actions:**
- [EATimeAttendanceSetDefaultFromTime](EATimeAttendanceSetDefaultFromTime.md) - Sets default punch-in times for missing start times


</div>