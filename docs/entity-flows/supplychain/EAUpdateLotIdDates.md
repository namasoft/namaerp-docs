---
title: EAUpdateLotIdDates
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUpdateLotIdDates

## Overview

Updates lot date information (expiry, production, retest dates) across all system tables based on the dates specified in document lines. Performs a comprehensive update that synchronizes lot date information throughout the entire system, ensuring consistency across inventory, transaction history, and all document types.

## When This Action Runs

Manual execution on supply chain documents when lot date information needs to be propagated system-wide, typically used after receiving updated lot information, correcting date errors, or standardizing lot dates across all references.

## How It Works

1. **Scans document lines** - Processes each line that has both an item and lot ID
2. **Validates date parameters** - Determines which dates to update based on parameters
3. **Prepares update queries** - Creates SQL update statements for each affected table
4. **Updates critical inventory tables** - Updates in synchronized block:
   - ItemDimensionsQty (inventory quantities)
   - QtyTransLine (transaction history)
5. **Updates additional tables** - Updates without synchronization:
   - ItemLot (lot master data)
   - EndStockTakingLine (stock taking records)
   - All BasicSCDocumentLine subclasses (all document types)
6. **Processes in transactions** - Each update runs in separate transaction for isolation
7. **Tracks progress** - Updates task progress for monitoring long-running operations

## Parameters

**Parameter 1:** Do Not Update Expiry Date (Optional) - Leave empty

**Parameter 2:** Do Not Update Production Date (Optional) - true/false to skip production date updates (default: false). A line with no production date never changes the production date

**Parameter 3:** Do Not Update Retest Date (Optional) - true/false to skip retest date updates (default: false). A line with no retest date never changes the retest date

**Parameter 4:** Force Update of Current Entity Lines (Optional) - true/false to also update the line table of the current document's own type (default: false, that table is skipped)

## Database Tables Affected

- **ItemDimensionsQty** - Updates lot dates in inventory quantity records
- **QtyTransLine** - Updates lot dates in transaction history
- **ItemLot** - Updates lot master data with new date information
- **EndStockTakingLine** - Updates lot dates in stock taking records
- **All Document Line Tables** - Updates lot dates in every document type that extends BasicSCDocumentLine

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.EAUpdateLotIdDates`

**Update Scope:** System-Wide Lot Date Synchronization

**Related Actions:**
- Lot management entity flows
- Inventory date correction utilities
- Batch update processing actions


</div>

