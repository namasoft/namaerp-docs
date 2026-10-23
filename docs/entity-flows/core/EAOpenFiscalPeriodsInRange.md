---
title: EAOpenFiscalPeriodsInRange
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAOpenFiscalPeriodsInRange

## Overview

Opens fiscal periods that overlap with a specified target date. Changes status from Closed/Locked to "Opened" to allow transaction entry and modifications.

## When This Action Runs

- **Trigger:** Manual execution or scheduled automation
- **Target:** System-wide fiscal period management
- **Purpose:** Reopen periods for transaction entry and corrections
- **Timing:** On-demand when period adjustments are needed

## How It Works

1. **Calculates target date** using today's date + parameter days offset
2. **Finds overlapping periods** where `startDate ≤ target date ≤ endDate` and status is NOT "Opened"
3. **Groups by fiscal year** for transactional processing
4. **Updates period status** to "Opened" in fiscal year details

## Key Difference from Close Action

- **Date Logic:** Uses overlapping range (startDate ≤ target ≤ endDate) vs end date comparison
- **Purpose:** Opens periods for transaction entry vs closing them
- **Target Status:** Sets to "Opened" vs "Closed"

## Parameters

### Parameter 1: Days From Today
- **Type:** Integer (defaults to 0 if empty)
- **Examples:**
  - `0` - Open periods that contain today's date
  - `-7` - Open periods that contained the date 7 days ago
  - `30` - Open periods that will contain the date 30 days from now

## Database Tables Affected

### FiscalPeriod
- **startDate/endDate** - Define period date range
- **periodStatus** - Must not be "Opened" to be eligible

### FiscalYear
- Contains collection of fiscal year periods
- Updated transactionally for data integrity

### FiscalYearPeriod
- **periodStatus** - Updated to "Opened"

## SQL Query Example

```sql
SELECT fp.id, fp.code, fp.startDate, fp.endDate, fp.periodStatus, fy.code
FROM FiscalPeriod fp
INNER JOIN FiscalYear fy ON fp.year_id = fy.id
WHERE fp.startDate <= DATEADD(day, 0, GETDATE())
    AND fp.endDate >= DATEADD(day, 0, GETDATE())
    AND fp.periodStatus != 'Opened';
```

## Business Impact

### Financial Operations
- **Transaction Entry:** Allows transactions to be recorded in previously closed periods
- **Period Corrections:** Allows adjustments in historical periods
- **Audit Flexibility:** Provides ability to reopen for compliance adjustments

### Operational Effects
- **Data Modification:** Permits changes to transactions in reopened periods
- **Control Relaxation:** Temporarily removes period-end restrictions

## Related Actions

- **EACloseFiscalPeriodsInRange** - Closes fiscal periods in specified date range

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAOpenFiscalPeriodsInRange`

</div>

