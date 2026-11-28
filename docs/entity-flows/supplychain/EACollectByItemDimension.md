---
title: EACollectByItemDimension
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACollectByItemDimension

## Overview

Splits the document lines whose lot ID, box or revision ID is empty according to the quantities available in stock per that dimension (the ItemDimensionsQty table). A line that asks for more than the first available stock record holds is split into two lines.

## When This Action Runs

Manual execution when document lines must be split by the quantities available per tracking dimension, typically during order fulfillment or inventory allocation processes.

## How It Works

1. **Identifies empty dimensions** - Takes the lines whose value in the chosen dimension is empty; a line that already has a value is skipped
2. **Searches available inventory** - Reads the ItemDimensionsQty records with a positive net quantity for the line's item in the line's warehouse (or the document's warehouse when the line has none), in the locator when one is set, and with the same values as the line in every other dimension the item tracks quantity by. The records are read in ascending order of the chosen dimension
3. **Splits lines if needed** - When the first available record holds less than the line quantity, the line keeps that quantity and a new line with the remainder is inserted right after it. The new line is then compared with the next record in the same way

## Parameters

**Parameter 1:** Property (Required) - Dimension to collect by: `lotId`, `box`, or `revisionId`. When it is empty the flow fails with *First column in entity action must contain main property (first column)*; any other value fails with *The property {0} is not supported*

## Database Tables Affected

- **ItemDimensionsQty** - Reads available inventory quantities by dimension
- **Document Lines** - Changes line quantities and may create new split lines
- **Item Configuration** - Checks tracking requirements for dimensions

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectByItemDimension`


</div>

