---
title: EAUpdateItemPricesFromQuery
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUpdateItemPricesFromQuery

## Overview

Recomputes prices for the items returned by an "Items Finder Query" and writes each price into a numeric field of the item card. The price is calculated by the normal sales pricing engine for a quantity of 1, optionally for a given customer, legal entity and analysis set. Use it to refresh a stored item price for any set of items you can select with SQL.

## When This Action Runs

It can be attached to any record's event, or run from a Task Schedule. The record it runs on is only used to fill `{fieldName}` placeholders in the query; the action changes the items the query returns, not the record itself.

## How It Works

1. **Runs the query** - Placeholders such as `{code}` are replaced with values from the record the action runs on before the query is executed. If the query parameter is empty, nothing happens.
2. **Reads each row** - Column 1 must be the item id. Columns 2, 3 and 4 are optional and give the color code, size code and revision code. Rows without an item id are skipped.
3. **Calculates the price** - Asks the pricing engine for the unit price of the item (with the color, size and revision when given) for a quantity of 1, using the customer, legal entity and analysis set from the parameters when they are given.
4. **Skips zero prices** - If the result is empty or zero, nothing is written for that row.
5. **Writes the price** - If the item uses colors or sizes, the price is written into the target field of the matching rows in the item's sizes and colors grid. Otherwise it is written into the target field on the item header.

## Parameters

**Parameter 1:** Customer Code (Optional) - Code of the customer to price for.

**Parameter 2:** Legal Entity (Optional) - Code of the legal entity to price for.

**Parameter 3:** Analysis Set (Optional) - Code of the analysis set to price for.

**Parameter 4:** Target Field (Required) - The field id that receives the price, on the item header or on the sizes and colors row, for example `n2`, `n3` or `n4`.

**Parameter 5:** Default color code (Optional) - Used when a query row's color column is empty.

**Parameter 6:** Default size code (Optional) - Used when a query row's size column is empty.

**Parameter 7:** Default revision code (Optional) - Used when a query row's revision column is empty.

**Parameter 8:** Items Finder Query (Required) - SQL that returns the items to update. The columns must come in this order: id, color, size, revision. Select `NULL` (or leave the column out) when the item does not use that dimension.

## Example

Update two items that use neither colors nor sizes:

```sql
select id from InvItem where code in ('ITM-001','ITM-002')
```

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EAUpdateItemPricesFromQuery`

## Related Actions

- [EAUpdateItemPricesFromPriceList](EAUpdateItemPricesFromPriceList.md) - same price update for the items of a sales price list


</div>
