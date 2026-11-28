---
title: TimeAttendanceAddExtraHoursToEmpty
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# TimeAttendanceAddExtraHoursToEmpty

## Overview

Fills missing attendance times based on employee work schedules with optional hour adjustments. Automatically calculates check-in and check-out times from employee attendance plans when dates are present but times are missing, allowing for early arrivals or late departures.

## When This Action Runs

Manual execution during attendance data processing. Typically used when you have attendance records with dates but missing times, and need to populate them based on standard work schedules with flexibility for overtime or adjusted hours.

## How It Works

1. **Processes each attendance line** - Iterates through all attendance records
2. **Identifies missing times** - Finds records with dates but no corresponding times
3. **Retrieves attendance plans** - Gets employee's work schedule for the date
4. **Calculates work times** - Takes the start and end of the first work period of the plan's work day for the line's date
5. **Applies hour adjustments** - Adds extra hours to start/end times if specified
6. **Updates missing times** - Sets calculated times only where previously empty
7. **Caches plan lookups** - Stores retrieved plans for performance optimization

## Parameters

**Parameter 1:** Extra From Hours (Optional) - Hours to add to start time (negative for earlier, default: 0)

**Parameter 2:** Extra To Hours (Optional) - Hours to add to end time (positive for later, default: 0)

## Example Usage

- Parameter 1: "-0.5" - Employees arrive 30 minutes early
- Parameter 2: "1" - Employees leave 1 hour late
- Both parameters empty - Use exact shift times

## Database Tables Affected

- **TimeAttendanceLine** - Updates from/to times for records with missing values
- **AttendancePlanLine** - Reads employee work schedules (read-only)
- **Employee** - References for attendance plan lookups (read-only)

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.TimeAttendanceAddExtraHoursToEmpty`


</div>