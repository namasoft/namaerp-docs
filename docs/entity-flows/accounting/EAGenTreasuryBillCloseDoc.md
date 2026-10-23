---
title: EAGenTreasuryBillCloseDoc
module: accounting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAGenTreasuryBillCloseDoc

## Overview

Automatically generates Treasury Bill Close Documents for treasury bills that have reached their due date and are still in "Running" status. Processes expired bills in batches to create proper closing documentation.

## When This Action Runs

- **Trigger:** Manual execution or scheduled batch processing
- **Target:** TreasuryBill entities with due date <= today
- **Purpose:** Create close documents for expired treasury bills
- **Timing:** Daily processing for bills reaching due dates

## How It Works

### Bill Selection Criteria
- **Due Date:** Due date <= today's date
- **Status:** anything except "Closed"
- **State:** Previously committed entities only
- **Limit:** Maximum 500 bills per execution

### Document Generation Process
- **Creates:** New TreasuryBillCloseDoc records
- **Links:** References to original treasury bills
- **Copies:** Key financial data (bank account, ROI rate, current value)
- **Dimensions:** Transfers all dimension fields automatically
- **Fields Map:** Applies Parameter 1, then saves each close document as final

The record the flow runs on is not used: the bills are always found by the criteria above, so the
flow is normally run from a task schedule.

## Parameters

The **Title** column is the caption the entity flow line shows above each parameter after saving.

| Parameter | Title | What to enter |
|---|---|---|
| Parameter 1 | Fields Map | A [field map](../core/ai-generated-field-maps-documentation.md) from the treasury bill to the new close document, one `target field=bill field` per line. It is applied after the treasury bill, bank account, ROI rate, current value and dimensions are copied, so it can override them. Use it for what the flow does not fill, such as the close document's book and term (`book="TBC"`, `term="TBC"`). |

## SQL Queries for Troubleshooting

### Find Bills Ready for Closing
```sql
SELECT tb.id, tb.code, tb.dueDate, tb.status, tb.currentValue
FROM TreasuryBill tb
WHERE tb.dueDate <= GETDATE()
    AND tb.status != 'Closed'
    AND tb.commitedBefore = 1
ORDER BY tb.dueDate ASC;
```

### Check Recent Close Documents
```sql
SELECT tbc.id, tbc.code, tb.code AS originalBill
FROM TreasuryBillCloseDoc tbc
    INNER JOIN TreasuryBill tb ON tbc.treasuryBill_id = tb.id
WHERE tbc.creationDate >= DATEADD(day, -1, GETDATE());
```

### Find Overdue Bills Not Closed
```sql
SELECT tb.id, tb.code, DATEDIFF(day, tb.dueDate, GETDATE()) AS daysOverdue
FROM TreasuryBill tb
WHERE tb.dueDate < GETDATE()
    AND tb.status = 'Running'
    AND NOT EXISTS (SELECT 1 FROM TreasuryBillCloseDoc tbc WHERE tbc.treasuryBill_id = tb.id);
```

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenTreasuryBillCloseDoc`

</div>

