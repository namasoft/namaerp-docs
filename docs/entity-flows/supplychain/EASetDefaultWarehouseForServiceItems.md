---
title: EASetDefaultWarehouseForServiceItems
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASetDefaultWarehouseForServiceItems

## Overview

Automatically assigns a default warehouse to service items in supply chain documents that don't already have a warehouse specified. Scans all document lines, identifies service items without warehouse assignments, and sets the specified warehouse for proper inventory tracking and reporting.

## When This Action Runs

Manual execution on supply chain documents when service items need warehouse assignments, typically used for standardizing warehouse locations for service items or ensuring all items have proper warehouse tracking for reporting purposes.

## How It Works

1. **Scans document lines** - Iterates through all lines in the supply chain document
2. **Filters for service items** - Identifies lines with items that have service item type
3. **Checks warehouse assignment** - Skips lines that already have warehouse assignments
4. **Updates dimensions** - Calls updateNulls() to initialize dimension fields
5. **Assigns warehouse** - Looks up the warehouse whose code is in Parameter 2 and sets it in the line's specific dimensions
6. **Validates assignment** - Verifies the warehouse was found and assigned successfully
7. **Accumulates errors** - Adds a failure for every service line whose warehouse could not be found by that code

## Parameters

**Parameter 1:** Warehouse code (Required) - Must be filled

**Parameter 2:** (shown without a title) - Code of the warehouse to assign to service items

Example: `WH001`, `SERVICES`, `MAIN`

## Database Tables Affected

- **BasicSCDocumentLine** - Updates warehouse assignment in line dimensions
- **Warehouse** - Reads warehouse record by business code (read-only)
- **Item Dimensions** - Updates specific dimensions with warehouse information

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASetDefaultWarehouseForServiceItems`

**Document Type:** Supply Chain Documents with Service Items

**Related Actions:**
- Warehouse management entity flows
- Item dimension management actions
- Document line processing utilities


</div>

