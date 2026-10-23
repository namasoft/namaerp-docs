---
title: EAChangeEmployeeStateHandler
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAChangeEmployeeStateHandler

## Overview

This entity flow automatically updates employee states based on vacation documents. When employees go on specific types of vacation (like unpaid leave or maternity leave), their employee state needs to change in the system. This handler processes vacation documents and applies the required state changes to the associated employees.

## What This Action Does

The handler takes a SQL query that finds vacation documents requiring employee state changes, then updates each employee's state to the **Change Employee State To** of the document's leave reason or, when the reason has none, of its vacation type.

It is the companion of the vacation document term option **Change Employee State only If vacation Start Date Match Today**. With that option, saving a vacation that starts in the future does not change the employee's state; this flow, run daily from a task schedule, changes it on the day the vacation starts.

## When This Action Runs

This action typically runs in the following scenarios:
- **Scheduled Tasks**: Daily, to update employee states for vacations starting today
- **Manual Execution**: Support staff can run this to correct employee states or process specific vacation batches

## Step-by-Step Process

1. **Query Execution**
   - The system runs your provided SQL query against the database
   - The query must return vacation document IDs in the first column
   - Each ID represents a vacation document that needs processing

2. **Document Loading**
   - For each ID returned by the query, the system loads the full VacationDocument record
   - If a document ID is invalid or deleted, it's skipped without error

3. **State Change Validation**
   - The target state is the **Change Employee State To** of the document's leave reason; when the reason has none, that of its vacation type
   - Documents with no target state are skipped
   - When the document's term has **Change Employee State only If vacation Start Date Match Today** ticked and the vacation starts after today, the document is skipped; it is picked up again on its start date

4. **Employee State Update**
   - The employee's state is changed to the target state from the vacation's start date, and the employee is saved

5. **Result Accumulation**
   - The messages of every document are collected and returned together

## Parameters

The **Title** column is the caption the entity flow line shows above each parameter after saving.

| Parameter | Title | What to enter |
|---|---|---|
| Parameter 1 | Query. eg: select d.id from VacationDocument d left join Employee e on e.id = d.employee_id left join VacationType t on t.id = d.vacationType_id where d.commitedBefore = 1 and d.startDate >= cast(getdate() as date) and t.changeEmployeeStateTo <> e.employeeState | A query whose first column is the id of a vacation document. Other columns are ignored, and an id that is not a vacation document is skipped. |

The query must:
- Return vacation document IDs as the first (or only) column
- Include appropriate filtering conditions

### Standard Query Template

```sql
select d.id 
from VacationDocument d 
left join Employee e on e.id = d.employee_id 
left join VacationType t on t.id = d.vacationType_id
where d.commitedBefore = 1 
  and d.startDate >= cast(getdate() as date) 
  and t.changeEmployeeStateTo <> ''
  and t.changeEmployeeStateTo <> e.employeeState
```

### Query Breakdown Explanation

- `d.commitedBefore = 1` - Only process approved/committed vacation documents
- `d.startDate >= cast(getdate() as date)` - Process vacations starting today or in the future
- `t.changeEmployeeStateTo <> ''` - Only vacation types that require state changes (a leave reason's own target state is still applied by the flow, but this filter looks at the vacation type only)
- `t.changeEmployeeStateTo <> e.employeeState` - Only if employee isn't already in the target state

## Database Tables and Fields

### Primary Tables
- **VacationDocument** - Stores all vacation requests and approvals
- **Employee** - Contains employee master data including current state
- **VacationType** - Defines vacation types and their associated state changes

### Key Fields Used

**VacationDocument Table:**
- `id` - Unique identifier for the vacation document
- `employee_id` - Links to the Employee record
- `vacationType_id` - Links to the VacationType configuration
- `startDate` - When the vacation begins
- `endDate` - When the vacation ends
- `commitedBefore` - Flag indicating if vacation is approved (1 = approved)

**Employee Table:**
- `id` - Unique employee identifier
- `employeeState` - Current state/status of the employee

**VacationType Table:**
- `id` - Unique vacation type identifier
- `changeEmployeeStateTo` - Target employee state when this vacation type is active


## Technical Details

**Module:** hr  

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAChangeEmployeeStateHandler`

</div>