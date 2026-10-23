---
title: EATimeAttendanceFromDBImporter
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EATimeAttendanceFromDBImporter

## Overview

Creates or updates time attendance documents by importing data from external databases. Automatically generates one attendance document per period based on SQL query results, typically used for bulk import from biometric attendance systems.

## When This Action Runs

Manual execution or scheduled tasks for regular attendance data imports. Commonly used for monthly imports from attendance machines, creating new documents or updating existing ones based on period.

## How It Works

1. **Executes attendance query** - Runs SQL to retrieve attendance records from external database
2. **Processes data** - Transforms results using format formula and optional Groovy preprocessing
3. **Maps to employees** - Matches records to employees using attendance machine codes
4. **Finds or creates document** - Uses initialization query to determine document properties
5. **Imports attendance lines** - Adds processed attendance records to the document
6. **Saves document** - Either commits (if previously committed) or saves as draft based on parameter
7. **Disables versioning** - Temporarily disables entity versioning during save to improve performance

## Parameters

**Parameter 1:** Query (Required) - SQL query to retrieve attendance data

**Parameter 2:** Format Formula (Required) - Transformation rules for data mapping

**Parameter 3:** Document Initialization Query (Required) - SQL to determine document properties

**Parameter 4:** Save as Draft (Optional) - true to save as draft; false or empty to commit

**Parameter 5:** Data Pre-processor (Optional) - Groovy script for custom data processing

**Parameter 6:** Ignore Unfound Employees (Optional) - true/false to skip unmatched records

**Parameter 7:** Split To Multiple Documents Each With N Lines (Optional) - a positive number N spreads the lines over several documents of at most N lines each, coded `<code>_001`, `<code>_002`, … from the `code` column of parameter 3. One employee's lines are never split across documents. Documents left over from a larger earlier run are deleted. Empty means one document.

**Parameter 8:** Employees Query (Optional) - a query whose first column returns employee codes or ids. Only those employees are imported: their lines in the existing documents are replaced, other employees' lines are kept untouched, and selected employees not yet in any document get a new one. Requires parameter 7. If the query returns no known employee the run fails with *Employees query returned no known employee, nothing was imported*.

## Example Attendance Query

```sql
SELECT USERID, CHECKTIME, CHECKTYPE
FROM [DSCATM].dbo.CHECKINOUT atm 
LEFT JOIN dsc.dbo.Employee e ON e.attendanceMachineCode = CAST(atm.USERID AS nvarchar(50))
WHERE MONTH(atm.CHECKTIME) = MONTH(GETDATE()) 
  AND YEAR(atm.CHECKTIME) = YEAR(GETDATE())
```

## Example Document Initialization Query

```sql
SELECT 
  'TA' + CAST(YEAR(GETDATE()) * 100 + MONTH(GETDATE()) AS nvarchar(6)) AS code,
  'TAB' AS book,
  YEAR(GETDATE()) * 100 + MONTH(GETDATE()) AS fiscalPeriod,
  CAST(DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AS date) AS valueDate
```

## Database Tables Affected

- **TimeAttendance** - Creates new documents or updates existing ones
- **TimeAttendanceLine** - Creates attendance line records
- **Employee** - References employees by attendance machine code (read-only)
- **External Database** - Source of attendance data

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EATimeAttendanceFromDBImporter`


</div>