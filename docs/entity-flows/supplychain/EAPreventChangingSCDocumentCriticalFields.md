---
title: EAPreventChangingSCDocumentCriticalFields
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAPreventChangingSCDocumentCriticalFields

## Overview

Enforces data integrity by preventing modifications to critical fields in supply chain document lines after the document has been committed for the first time. Compares each line with its last committed version and blocks changes to quantity, size, color, and other essential fields that affect inventory and business logic. Only lines that carry a source line reference (lines that came from another document) are checked.

## When This Action Runs

Attach it to the save or commit event of a supply chain document to validate that critical fields have not been modified since the last committed version. On a document that was never committed it does nothing.

## How It Works

1. **Checks for existing data** - Verifies document has a previous committed version (oldData exists)
2. **Retrieves original lines** - Gets the document lines from the last committed version
3. **Compares current vs original** - For each current line that has a source line reference, finds the same line in the last committed version; lines without a source line reference and new lines are skipped
4. **Validates critical fields** - Checks that protected fields have not been changed
5. **Blocks unauthorized changes** - Returns the error *The field {0} is {1} in from document and became {2} in this document at line {3}. This field can not be changed* for every protected field that was modified

## Parameters

This action does not require any parameters - it automatically protects predefined critical fields.

## Database Tables Affected

- **Document Lines** - Validates current line data against original committed data (read-only validation)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.EAPreventChangingSCDocumentCriticalFields`

**Validation Type:** Data Integrity Control

**Protected Fields (on each line):**
- Item, sub item and subsidiary
- Primary and second quantity, with their units
- Size, color, revision, box, measures, active and inactive percentage
- Lot, expiry date, serial number and second serial
- Warehouse and locator
- Branch, sector, department and analysis set
- On lines that carry prices: free line, unit price, price, discounts 1 to 8 and header discount


</div>

