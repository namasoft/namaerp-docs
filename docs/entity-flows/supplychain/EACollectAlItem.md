---
title: EACollectAlItem
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACollectAlItem

## Overview

Automatically substitutes items in document lines with alternative items from the same category, class, section, or brand when the original item has insufficient stock. Splits lines to use multiple alternative items if needed to fulfill the full quantity requirement.

## When This Action Runs

Manual execution when documents need automatic item substitution to fulfill quantities from available alternatives, typically for sales orders or stock issues when primary items are out of stock.

## How It Works

1. **Waits for quantity processing** - Unless Parameter 4 is `false`, waits until no inventory transaction request in the whole system is still pending (status Initial or Retry), checking every 1.5 seconds
2. **Checks available quantity** - Calculates available stock for each line item at document date
3. **Searches for alternatives** - The line keeps the quantity that is available for its own item. For the rest, the fields of Parameter 1 are tried in the order written: for each one, the other items with the same value in that field are taken, sorted by Parameter 2
4. **Splits lines if needed** - Adds a new line after the original one for each alternative item that has available quantity, until the total quantity is covered. Lines left with a zero quantity are removed
5. **Validates fulfillment** - If the original item and its alternatives together do not cover the quantity, the flow fails with *Item {0} has available quantity {1} and total required quantity {2}*

## Parameters

**Parameter 1:** Field IDs (From Item - CSV) (Required) - CSV list of item fields to match for alternatives. Allowed values: `category1` to `category5`, `section`, `brand`, `itemClass1` to `itemClass10`; any other field id is refused with *You can not use field id {0} to find alt items*
Example: `itemClass1,itemClass4,category1,brand`

**Parameter 2:** Order By Field (Optional) - Sort alternatives by this field (e.g., `n1` for priority)

**Parameter 3:** Excluded Origin Ids (Optional) - SQL to exclude specific documents

```sql
select id from StockIssue where fromDoc_id = {id} 
union all select {id}
```

**Parameter 4:** Wait For All Qty Transactions To Be Processed (default is true) (Optional) - true/false to wait for pending transactions (default: true)

## Database Tables Affected

- **InvItem** - Searches for alternative items based on matching fields
- **InvTransReq** - Checks pending transactions if wait enabled
- **Document Lines** - Modifies existing lines and creates new ones
- **Inventory Tables** - Calculates available quantities at date

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectAlItem`


</div>

