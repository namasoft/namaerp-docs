---
title: EASupplyChainMergeStockTakingElectronicDocLines
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASupplyChainMergeStockTakingElectronicDocLines

## Overview

Consolidates duplicate lines in electronic stock taking documents by merging lines with identical properties (item code, date, lot, serial numbers, etc.) and combining their quantities. Eliminates redundant entries that have the same tracking attributes, creating a cleaner and more accurate stock taking document.

## When This Action Runs

Manual execution on electronic stock taking documents when duplicate or similar lines need to be consolidated, typically used after importing data from multiple sources, combining partial counts, or cleaning up stock taking documents before final processing.

## How It Works

1. **Scans document lines** - Iterates through all stock taking electronic lines in the document
2. **Compares line properties** - For each line, checks all subsequent lines for identical properties
3. **Identifies matches** - Lines are considered identical when all of these are the same: item code, department code, expiry date, production date, item, department, locator, unit, lot, serial number, second serial and revision
4. **Merges quantities** - Adds the quantity from duplicate lines to the first matching line
5. **Removes duplicates** - Deletes the duplicate lines after merging their quantities
6. **Continues processing** - Repeats for all lines until no duplicates remain
7. **Returns success** - Processing completes successfully with consolidated lines

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **StockTakingElectronicLine** - Consolidates duplicate lines and updates quantities
- **Stock Taking Data** - Modifies line structure by removing duplicates and merging quantities

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASupplyChainMergeStockTakingElectronicDocLines`

**Document Type:** Electronic Stock Taking Documents

**Related Actions:**
- Stock taking processing entity flows
- Document line consolidation utilities
- Inventory counting management actions


</div>

