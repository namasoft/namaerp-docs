---
title: EAEmpAttendanceSysEntryCalculator
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEmpAttendanceSysEntryCalculator

## Overview

Creates employee attendance system entries automatically based on SQL query results. Processes multiple employees in batch and calculates their attendance for specified date ranges, creating system-generated attendance records.

## When This Action Runs

Manual execution or scheduled tasks for batch attendance calculation. Typically used for end-of-month processing, bulk attendance recalculation, or automated attendance generation based on time attendance data.

## How It Works

1. **Validates configuration** - When **Attendance Manual Calculation** is ticked in the HR configuration and parameter 2 is not `true`, the flow stops with the message *The entity flow {0} can not be used if the option manual attendance is selected*
2. **Executes SQL query** - Runs the provided query to retrieve employee IDs and optional date ranges
3. **Processes each employee** - Iterates through query results with progress tracking
4. **Determines date range** - Uses the query-provided dates; without them the start is the first day of the current month and the end is the last day of the start date's month
5. **Calculates attendance** - Runs attendance calculation for each employee within date boundaries
6. **Handles employment dates** - Respects employee commencement and firing dates
7. **Creates transactions** - Each employee calculation runs in a separate database transaction
8. **Accumulates results** - Collects success/failure results from all employee calculations

## Parameters

**Parameter 1:** Select Statement (Required) - SQL query returning employee data
- First column: Employee ID or code (required)
- Second column: Start date (optional, defaults to month start)
- Third column: End date (optional, defaults to the end of the start date's month)

**Parameter 2:** Ignore manual attendance(true or false) (Optional) - `true` runs the flow even when **Attendance Manual Calculation** is ticked in the HR configuration. Empty counts as `false`

## Example SQL Query

```sql
with dates as (
    select cast(DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) as date) mstart,
           cast(DATEADD(s,-1,DATEADD(mm, DATEDIFF(m,0,GETDATE())+1,0)) as date) mend
)
select distinct l.employee_id, mstart, mend 
from TimeAttendanceLine l 
left join dates on 1 = 1 
where fromDate >= dates.mstart 
  and l.toDate <= mend
```

## Database Tables Affected

- **EmpAttendanceSysEntry** - Creates new system-generated attendance entries
- **Employee** - Reads employee data including commencement and firing dates
- **TimeAttendanceLine** - May be referenced in the SQL query for employee selection
- **HRConfiguration** - Checks manual attendance calculation settings

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAEmpAttendanceSysEntryCalculator`


</div>

