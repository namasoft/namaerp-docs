---
title: EAPreventQtyMoreThan
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAPreventQtyMoreThan

## Overview

Validates that document line quantities stay below maximum quantity limits by comparing actual quantities against configurable maximum thresholds. Prevents processing of supply chain documents when item quantities reach or exceed specified limits, ensuring compliance with inventory controls and operational constraints.

## When This Action Runs

Validation during document processing before commitment. Typically used on sales orders, purchase orders, or inventory documents where maximum quantity constraints must be enforced to prevent over-ordering, over-selling, or exceeding storage capacity.

## How It Works

1. **Groups document lines** - Organizes lines by item to calculate total quantities per item
2. **Executes quantity query** - Runs the provided query to determine maximum quantity limits
3. **Calculates totals** - Sums base quantities for each item across all document lines
4. **Compares quantities** - Checks if total quantity reaches or exceeds the maximum
5. **Reports violations** - Fails with *The quantity for item {0} is {1}, and the maximum is {2}* for every item whose total quantity is equal to or more than the maximum. Only a total below the maximum is accepted

## Parameters

**Parameter 1:** Maximum Qty Calculation Query (Required) - Query to determine maximum quantity limits for each item

## Example Query

```sql
select {details.item.item.n1}
```

This example uses the n1 field from the item master as the maximum quantity.

## Query Result Handling

- **Per-line results**: If the query returns as many results as the document has lines, the limit of an item is the result of the first line that holds that item
- **Single result**: Otherwise the first result is the limit of all items

## Database Tables Affected

This is a validation action that does not modify any database tables. It only reads data for validation purposes.

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventQtyMoreThan`

**Related Actions:**
- [EAPreventQtyLessThan](EAPreventQtyLessThan.md)


</div>

