---
title: EATimeAttendanceFromDBImportIntoDocument
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EATimeAttendanceFromDBImportIntoDocument

## Overview

Imports time attendance data from an attendance machine's database directly into the current time attendance document. Runs an SQL query and transforms the result into the attendance lines of the existing document, replacing the lines it had.

## When This Action Runs

Manual execution during attendance data import processes. Used when importing attendance records from biometric devices, access control systems, or other external attendance tracking databases into the current document.

## How It Works

1. **Opens document for editing** - Starts editing mode on the current time attendance document
2. **Executes SQL query** - Runs the provided query through the Nama ERP database connection; the query reads the attendance machine's tables by naming their database, as `[DSCATM].dbo.CHECKINOUT` does in the example
3. **Processes query results** - Transforms each row using format formula
4. **Optional preprocessing** - Applies Groovy script for data transformation if provided
5. **Maps to employees** - Matches records to employees using attendance machine codes
6. **Creates attendance lines** - Generates time attendance lines from processed data
7. **Replaces the document's lines** - The imported lines overwrite the document's existing lines in order (employee, dates, times, machine code, type, day of week, `ref1`, `ref2`, `text1`), and existing lines beyond the imported count are removed, so the document ends with exactly the imported lines
8. **Saves document** - Commits changes if document was previously committed, otherwise saves as draft

## Parameters

**Parameter 1:** Query (Required) - SQL query to retrieve attendance data

**Parameter 2:** Format Formula (Required) - Transformation rules for data mapping

**Parameter 3:** Data Pre-processor (Optional) - Groovy script for custom data processing

**Parameter 4:** Ignore unfound employees (Optional) - `true` skips records with no matching employee. Empty counts as `false`

## Example SQL Query

```sql
SELECT USERID, CHECKTIME [(yyyy-MM-dd HH:mm:ss)], CHECKTYPE
FROM [DSCATM].dbo.CHECKINOUT atm 
LEFT JOIN dsc.dbo.Employee e ON e.attendanceMachineCode = CAST(atm.USERID AS nvarchar(50))
WHERE MONTH(atm.CHECKTIME) = MONTH(GETDATE()) 
  AND YEAR(atm.CHECKTIME) = YEAR(GETDATE())
```

A date column whose alias holds a pattern in round brackets, as `[(yyyy-MM-dd HH:mm:ss)]` here, is turned into text with that pattern before the format formula reads it.

## Format Formula Syntax

Example: `empid#datetime{}#type{I-O}#exact#addhours{2}`

- **empid** - Employee identifier field
- **datetime{}** - Date/time field with optional format
- **type{I-O}** - Check type mapping (I=In, O=Out)
- **exact** - Exact matching mode
- **addhours{2}** - Time adjustment (add 2 hours)

The tokens are the ones of the attendance machine formulas; see [Attendance and Departure Formulas](/modules/hr/attendance-machine-formula) for the full list.

## Database Tables Affected

- **TimeAttendance** - Updates the current document with new attendance lines
- **TimeAttendanceLine** - Creates new attendance line records
- **Employee** - References employees by attendance machine code (read-only)
- **Attendance machine database** - Read by the query in parameter 1

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceFromDBImportIntoDocument`


</div>