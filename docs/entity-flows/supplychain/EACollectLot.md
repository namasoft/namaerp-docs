---
title: EACollectLot
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACollectLot

## Overview

Automatically fills empty dimension fields (lot ID, box, size, color, revision, etc.) in document lines by collecting from available inventory quantities. Splits lines based on available quantities with specific dimension values from the ItemDimensionsQty table.

## When This Action Runs

Manual execution when document lines need dimension values populated from available inventory, typically during order fulfillment or inventory allocation where specific lots, colors, sizes, or revisions are required.

## How It Works

1. **Updates base quantities** - Recalculates base unit quantities for all lines
2. **Clears existing dimensions** - Optionally removes the existing value of the collected dimension first. A line that still has a value in that dimension is left as it is
3. **Searches available inventory** - Queries ItemDimensionsQty for items with positive quantities and specific dimensions
4. **Splits lines by availability** - Creates multiple lines when quantities are available in different lots/dimensions
5. **Fills dimension values** - Populates lot ID, color, size, box, revision, warehouse, locator from inventory records
6. **Respects minimum quantities** - Skips quantities below the specified threshold

## Parameters

**Parameter 1:** Property, can be one of the following(lotId,box,size,color,revisionId,warehouse,locator) (Optional) - Dimension to collect by
- Options: `lotId`, `box`, `size`, `color`, `revisionId`, `warehouse`, `locator`
- Default: `lotId`

**Parameter 2:** Clear Existing Data(true,false) (Optional) - true/false to clear the value of the collected dimension on every line first
- Default: false

**Parameter 3:** Do Not Collect If Quantity Less Than (Optional) - A quantity taken from one stock record is skipped when it is below this value, in the unit of the line
- Example: `10` to ignore available quantities of less than 10 units

## Database Tables Affected

- **ItemDimensionsQty** - Reads available inventory with dimension details
- **Document Lines** - Creates new split lines with assigned dimensions
- **ItemLot** - Reads lot-specific dates (production, expiry, retest)
- **Item Configuration** - Checks dimension tracking settings

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectLot`


</div>

