---
title: EAChangeEmployeeStateFromFiringHandler
module: hr
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAChangeEmployeeStateFromFiringHandler

**Module:** Human Resources (HR)

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAChangeEmployeeStateFromFiringHandler`

## Purpose

This entity flow automatically updates employee status when their termination date arrives. It processes firing documents that have a delayed status update and applies the termination when the work end date is reached.

## When to Use

This flow should be configured as a **scheduled task** that runs periodically (typically daily) to process pending employee terminations. It's essential for organizations that create firing documents in advance but want the actual employee status change to occur automatically on the termination date.

## How It Works

### Process Overview

1. **Searches for Pending Documents**: The flow queries the database for firing documents that meet these criteria:
   - Document is committed (`commitedBefore = 1`)
   - Work end date has passed or is today (`workEndDate <= current date`)
   - Employee status update is marked as delayed (`empStatusUpdateDelayed = 1`)

2. **Processes Each Document**: For each qualifying document:
   - Creates a new transaction to ensure data consistency
   - Retrieves the full FiringDocument record
   - Skips the document when it has no firing reason
   - Changes the employee's state according to the firing reason, dated the work end date, and clears the delayed flag on the document
   - Tracks any failures for reporting

3. **Reports Results**: 
   - Returns success if all documents are processed successfully
   - Returns failure with details if any documents fail (shows up to 20 failed documents)

## Important Details

### Database Query Used

The system runs this SQL query to find documents to process:

```sql
select d.id from FiringDocument d
where d.commitedBefore = 1 
  and d.workEndDate <= cast(getdate() as date)
  and d.empStatusUpdateDelayed = 1
```

### Fields Involved

Key fields in the FiringDocument entity:
- **employee**: The employee being terminated (required field)
- **workEndDate**: The last working day for the employee (required field)
- **firingReason**: The reason for termination (required field)
- **empStatusUpdateDelayed**: System flag indicating the status update should happen later
- **commitedBefore**: Standard document commit flag

## Configuration Requirements

### Setting Up the Scheduled Task

1. Open **Basic → Settings → Task Schedule**
2. Create a new task schedule with:
   - **Task Type**: `Action`
   - **Class Name**: `com.namasoft.modules.humanresource.utils.actions.EAChangeEmployeeStateFromFiringHandler`
   - **Schedule**: Typically set to run daily at a specific time (e.g., 12:01 AM)

The flow takes no parameters. See [Scheduled Tasks](/platform/automation-and-rules/scheduled-tasks) for the scheduling options.

### HR Configuration

Check the HR module configuration for the setting:
- **Update Employee Status From Firing Document Only If Work End Date is Today** (`updateEmpStatusFromFiringDocInSameDate`): When ticked, a firing document saved with a work end date after today does not change the employee's state; the system sets `empStatusUpdateDelayed = 1` on the document instead, and this flow applies the change once the work end date arrives

## Performance Considerations

- **Processing Time**: Each document is processed in a separate transaction, which may take time for large volumes
- **Database Load**: The initial query is lightweight, but processing many documents can impact database performance
- **Error Handling**: If one document fails, others will still be processed
- **Maximum Error Reporting**: Only the first 20 failed documents are reported to avoid overwhelming error messages

## Related Entities and Flows

- **FiringDocument**: The main document entity being processed
- **Employee**: The employee entity whose status is updated
- **EmployeeStateSysEntry**: System entries tracking employee state changes

</div>