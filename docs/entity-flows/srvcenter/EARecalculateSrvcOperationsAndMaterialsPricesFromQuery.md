---
title: EARecalculateSrvcOperationsAndMaterialsPricesFromQuery
module: srvcenter
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARecalculateSrvcOperationsAndMaterialsPricesFromQuery

## Overview

Bulk recalculates pricing for service operations and materials on multiple service center jobs using a custom SQL query to identify target jobs. Applies the same pricing recalculation logic as individual job updates but processes multiple jobs in batch for efficiency.

## When This Action Runs

Manual execution for bulk pricing updates across multiple service jobs. Typically used after system-wide price changes, master data updates, or when multiple jobs need pricing refreshed based on specific criteria like date ranges, customers, or job types.

## How It Works

1. **Executes query** - Runs the provided SQL query to find service jobs to update
2. **Processes each job** - Iterates through found jobs in separate transactions
3. **Applies pricing recalculation** - Calls the individual job pricing recalculation action
4. **Stops on the first failure** - Each job is saved in its own transaction, so jobs recalculated before a failing job keep their new prices and the remaining jobs are not processed

## Parameters

**Parameter 1:** SQL Query (Required) - Query to select service jobs for pricing recalculation. The parameter has no title on the entity flow line

## Example Query

```sql
SELECT entityType, id FROM SrvCJobOrder
WHERE valueDate >= '2024-01-01'
```

## Query Requirements

- Must return two columns: entityType and id
- entityType should be a service center job document, such as `SrvCJobOrder` or `SrvCJobEstimation`
- id should be valid job IDs

## Database Tables Affected

- **Service Job Tasks** - Updates hour prices, total hours, and total prices
- **Service Job Materials** - Updates unit prices  
- **Service Operations** - References operation pricing data (read-only)
- **Task Definitions** - References task pricing data (read-only)
- **Item Master** - References material pricing data (read-only)

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EARecalculateSrvcOperationsAndMaterialsPricesFromQuery`


</div>

