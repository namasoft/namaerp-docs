---
title: EAUpdateAssemblyDocWithAssembledItemSold
module: srvcenter
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUpdateAssemblyDocWithAssembledItemSold

## Overview

Automatically updates assembly documents when assembled items are sold by managing co-product quantities and serial numbers. Ensures inventory consistency between assembly production and sales by tracking which assembled items have been sold and updating remaining quantities accordingly.

## When This Action Runs

Automatically triggered on post-commit and post-delete events for sales documents. Runs when sales orders, invoices, or delivery notes containing assembled items are committed or deleted, maintaining real-time synchronization between sales and assembly inventory.

## How It Works

### For Sales Document Commits:
1. **Picks the lines** - Works only on lines whose item is marked as having two serials; other lines are skipped. Such a line must have a lot ID. The assembly document comes from the line's reference field (parameter 2), or from the header's (parameter 1) when the line has none; when neither gives one the flow fails
2. **Processes sold items** - When the line's item is the item of the assembly BOM, creates a new co-product line for the sold quantity, copied from the main co-product line of the assembly document
3. **Updates serial numbers** - Manages serial number allocation and tracking
4. **Adjusts quantities** - Reduces available quantities on main assembly co-product lines
5. **Links documents** - Writes a reference to the sales document into the field named in parameter 3 on the new co-product line

### For Sales Document Deletions:
1. **Finds linked co-products** - Identifies assembly co-products linked to deleted sales
2. **Restores quantities** - Returns sold quantities back to main assembly co-product
3. **Removes sold lines** - Deletes co-product lines created for the cancelled sale
4. **Updates serials** - Restores serial numbers to available pool

## Parameters

**Parameter 1:** Assembly Document Ref (From Header) (Optional) - Field reference to assembly document in sales header

**Parameter 2:** Assembly Document Ref (From Line) (Optional) - Field reference to assembly document in sales line

**Parameter 3:** Sales Doc Ref In Assembly Coproducts line (Field ID) (Required) - Field ID for sales document reference in assembly co-product lines

## Serial Number Management

- **Primary Serial**: Engine or main component serial number
- **Secondary Serial**: Chassis or secondary component serial number
- **Serial Zipping**: Combines multiple serial numbers into compressed format
- **Serial Allocation**: Moves serials from available pool to sold items

## Database Tables Affected

- **AssemblyDocCoProdLine** - Creates new lines for sold items, updates quantities on main lines
- **Sales Document Lines** - Reads sold item information and serial numbers (read-only)
- **Assembly BOM** - References main assembled item configuration (read-only)

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EAUpdateAssemblyDocWithAssembledItemSold`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>