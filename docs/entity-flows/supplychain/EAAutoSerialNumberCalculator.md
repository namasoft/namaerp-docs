---
title: EAAutoSerialNumberCalculator
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAAutoSerialNumberCalculator

## Overview

Automatically generates sequential serial numbers for items in supply chain documents based on configurable prefix and number range. Supports both primary and secondary serial numbers with intelligent continuation from last used serial number for each item.

## When This Action Runs

Manual execution when items require serial number assignment during document processing. It works on supply chain documents (their lines) and on assembly documents (the assembled item and the co-product lines). On any other document type it fails with *This entity flow can not be used with documents of type {0}*.

## How It Works

1. **Processes document lines** - Takes the lines with a non-zero quantity whose item uses serial numbers and whose serial number is still empty; a serial that is already filled is never changed
2. **Calculates prefix** - Uses Tempo template to generate dynamic prefix based on item properties
3. **Finds last serial** - Searches the item's saved serials of the same type for the highest one that starts with the prefix followed by the configured number of digits
4. **Generates new serials** - Creates sequential serial numbers starting from next available number
5. **Handles ranges** - For quantities > 1, generates range format like "PREFIX00001:PREFIX00005"
6. **Respects limits** - Leaves the serial of the line empty if the last number needed for its quantity exceeds the configured last number

## Parameters

**Parameter 1:** Prefix (Tempo Syntax - Supports Item Properties) (Required) - Tempo template rendered on the item of the line
Example: `{code}-{section.code}-` (the template is rendered on the item itself, so `{code}` is the item code)

**Parameter 2:** Suffix Length (Required) - Number of digits for numeric portion; the number is left-padded with zeros to this length

**Parameter 3:** First Number (Optional) - Starting number for new series (default: 1)

**Parameter 4:** Last Number (Optional) - Maximum allowed number (default: the largest number that fits the suffix length, for example 99999 for a suffix length of 5)

**Parameter 5:** Use For First Serial (default true) (Optional) - true/false to generate primary serials, for items that have a serial number (default: true)

**Parameter 6:** Use For Second Serial (default false) (Optional) - true/false to generate secondary serials, for items that have two serials (default: false)

## Database Tables Affected

- **ItemSerial** - Reads the item's last saved serial (read-only)
- **Document Line Tables** - Updates ItemSpecificDimensions with generated serials
- **Assembly Document Tables** - Updates assembly item serial numbers

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoSerialNumberCalculator`


</div>