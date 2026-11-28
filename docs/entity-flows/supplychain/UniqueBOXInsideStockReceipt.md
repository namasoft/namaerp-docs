---
title: UniqueBOXInsideStockReceipt
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# UniqueBOXInsideStockReceipt

## Overview

Validates that each box number is used only once per item within a stock receipt document. Prevents duplicate box assignments for the same item by checking that each combination of box number and item appears only once in the document lines, ensuring proper inventory tracking and preventing data integrity issues.

## When This Action Runs

Validation action typically executed during document save, approval, or processing to ensure box number uniqueness, commonly used in warehouse operations where box tracking is critical for inventory management and item location tracking.

## How It Works

1. **Initializes tracking set** - Creates HashSet to track box-item combinations
2. **Scans document lines** - Iterates through all lines in the stock receipt
3. **Checks for box assignment** - Only processes lines that have a box number assigned
4. **Creates combination key** - Combines box number and item into a unique identifier
5. **Tests for duplicates** - Attempts to add combination to HashSet:
   - If successfully added: combination is unique, continues processing
   - If addition fails: combination already exists, records error
6. **Records duplicate errors** - Adds the failure *Box {0} for item {1} is repeated* for each duplicate combination
7. **Returns validation result** - Success if no duplicates, failure with error details if duplicates found

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **BasicSCDocumentLine** - Reads box and item data for validation (read-only)
- **SpecificDimensions** - Reads box number from line dimensions (read-only)
- **Item References** - Reads item information for duplicate checking (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.UniqueBOXInsideStockReceipt`


</div>

