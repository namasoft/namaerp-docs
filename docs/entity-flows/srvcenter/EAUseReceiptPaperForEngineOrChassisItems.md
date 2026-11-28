---
title: EAUseReceiptPaperForEngineOrChassisItems
module: srvcenter
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUseReceiptPaperForEngineOrChassisItems

## Overview

Automatically manages receipt paper allocation for engine or chassis items by matching lot IDs to receipt books and assigning unused receipt papers to document lines. Ensures proper documentation and serial number tracking for high-value components requiring formal receipt papers.

## When This Action Runs

Automatically triggered on post-commit and post-delete events for supply chain documents. Runs when sales orders, invoices, or delivery notes containing engine/chassis items are committed or deleted, managing receipt paper usage and availability.

## How It Works

### For Document Commits:
1. **Clears previous assignments** - Releases any receipt papers previously assigned to this document
2. **Validates lot IDs** - Ensures all document lines have required lot ID information
3. **Matches receipt books** - Finds the unused receipt papers of the receipt book whose code equals the line's lot ID
4. **Allocates papers** - Assigns as many unused receipt papers as the line's quantity; when there are fewer, the flow fails with *Could not find {0} unused receipt papers*
5. **Updates serial numbers** - Sets serial numbers from allocated receipt paper codes
6. **Marks papers as used** - Updates receipt papers as used and linked to the document

### For Document Deletions:
1. **Clears assignments** - Finds all receipt papers assigned to the deleted document
2. **Releases papers** - Marks receipt papers as unused and removes document references
3. **Restores availability** - Makes receipt papers available for future use

## Parameters

This action does not require parameters - it works based on document line data and receipt book configuration.

## Receipt Paper Allocation Logic

- **Lot ID Matching**: Uses document line lot ID to find corresponding receipt book
- **Quantity Matching**: Allocates exact number of receipt papers equal to document line quantity
- **Serial Assignment**: Combines receipt paper codes into compressed serial number format
- **Usage Tracking**: Marks allocated papers as used and links them to the document

## Database Tables Affected

- **ReceiptPaper** - Updates usage status and document references
- **Document Lines** - Updates serial numbers with receipt paper codes (read-only for other fields)
- **Receipt Books** - References for matching lot IDs to paper series (read-only)

**Module:** srvcenter

**Full Class Name:** `com.namasoft.modules.srvcenter.domain.utils.EAUseReceiptPaperForEngineOrChassisItems`

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>

