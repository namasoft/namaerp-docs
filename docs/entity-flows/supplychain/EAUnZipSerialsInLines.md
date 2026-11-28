---
title: EAUnZipSerialsInLines
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUnZipSerialsInLines

## Overview

Expands document lines containing multiple serial numbers into individual lines with one serial number each. Takes lines with quantity greater than 1 and multiple serial numbers, then creates separate document lines for each serial number with quantity 1, enabling individual tracking and processing of serialized items.

## When This Action Runs

Manual execution on supply chain documents containing serialized items with multiple serial numbers per line, typically used when individual serial number tracking is required for processing, shipping, or inventory management purposes.

## How It Works

1. **Scans document lines** - Iterates through all document lines in reverse order (to handle insertions)
2. **Identifies serialized items** - Finds lines with:
   - Valid items that have serial number tracking enabled (hasSerial = true)
   - Quantity greater than 1
   - Serial numbers that can be "unzipped" into individual serials
3. **Validates serial counts** - Skips the line, leaving it unchanged, when the number of serial numbers differs from the line quantity
4. **Processes second serials** - Handles secondary serial numbers if present; the line is also skipped when their number differs from the number of primary serials
5. **Creates individual lines** - For each serial number:
   - Clones the original line
   - Sets quantity to 1
   - Assigns individual serial number
   - Assigns secondary serial number if applicable
   - Generates new unique line ID
6. **Inserts new lines** - Adds the individual serial lines to the document
7. **Updates original line** - Modifies the first line to have quantity 1 with the first serial number

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **BasicSCDocumentLine** - Creates multiple new lines and modifies original line quantities
- **Serial Number Data** - Assigns individual serial numbers to separate lines
- **Item Dimensions** - Updates serial number dimensions for each line

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUnZipSerialsInLines`

**Document Type:** Supply Chain Documents with Serialized Items

**Related Actions:**
- Serial number management entity flows
- Item tracking utilities
- Document line processing actions


</div>

