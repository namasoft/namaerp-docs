---
title: EADSCNormalizeTimeAttendance
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EADSCNormalizeTimeAttendance

## Overview

Normalizes time attendance records to align with employee work shifts and schedules. Adjusts attendance times to fit within defined work periods, splits attendance lines that span break periods, and removes attendance outside work hours.

## When This Action Runs

Manual execution during attendance processing to clean up and standardize attendance data based on employee work schedules. Typically used to correct attendance times that don't align with official work shifts.

## How It Works

1. **Processes each attendance line** - Iterates through all time attendance lines in the document
2. **Validates required data** - Skips a line that has no employee, from date, to date or from time, and a line that has a **Machine Code**
3. **Applies exclusion criteria** - Optionally excludes specific employees based on criteria definition
4. **Retrieves work schedule** - Gets employee's attendance plan and work day configuration for the line's from date; the line is skipped when the employee has no plan for that date or the date is a weekend in the plan
5. **Calculates work shifts** - Identifies first and second work time periods for the day
6. **Adjusts attendance times** - Modifies from/to times to align with work shift boundaries
7. **Handles break periods** - Splits attendance lines that span lunch breaks or non-work periods
8. **Removes invalid records** - Deletes an attendance line that ends before the first work period starts, or that lies entirely in the break between the first and second work periods

## Parameters

**Parameter 1:** Excluded Employees Criteria (Optional) - Code of criteria definition to exclude specific employees from normalization

## Example Normalization Logic

**Work Schedule Example:**
- First Shift: 8:30 AM - 12:00 PM
- Second Shift: 12:45 PM - 5:30 PM

**Normalization Rules:**
- Attendance at 8:20 AM → Adjusted to 8:30 AM (work start)
- Attendance at 12:40 PM → Adjusted to 12:45 PM (second shift start)
- Attendance 8:00 AM - 4:00 PM → Split into: 8:30 AM - 12:00 PM AND 12:45 PM - 4:00 PM

## Database Tables Affected

- **TimeAttendanceLine** - Updates from/to times, may delete invalid lines, may create new split lines
- **AttendancePlanLine** - Referenced for employee work schedule data (read-only)
- **CriteriaDefinition** - Used for employee exclusion logic (read-only)

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EADSCNormalizeTimeAttendance`


</div>

