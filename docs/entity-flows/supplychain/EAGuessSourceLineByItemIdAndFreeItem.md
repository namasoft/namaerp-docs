---
title: EAGuessSourceLineByItemIdAndFreeItem
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGuessSourceLineByItemIdAndFreeItem

## Overview

Automatically matches document lines to their corresponding source lines when the normal origin/from document relationships are missing or broken. It is a variant of [EAGuessSourceLineIdByItem](/entity-flows/supplychain/EAGuessSourceLineIdByItem) that also looks at the free item flag of invoice lines when matching.

## When This Action Runs

Manual execution on documents with missing or incorrect line relationships, typically after data migration, document imports, or when origin document links are corrupted. Most commonly used for invoices and sales documents where free item distinction is important.

## How It Works

It follows the steps of [EAGuessSourceLineIdByItem](/entity-flows/supplychain/EAGuessSourceLineIdByItem). When both the document line and the candidate source line are invoice lines, their free item flags take part in the comparison as well.

## Parameters

It takes the same 15 parameters, in the same order and with the same meaning, as EAGuessSourceLineIdByItem: see [its Parameters section](/entity-flows/supplychain/EAGuessSourceLineIdByItem#Parameters).

## Database Tables Affected

- **Document Lines** - Updates origin line references for matched lines
- **Source Document Lines** - Reads potential match candidates (read-only)
- **Item Master Data** - Uses item references for matching (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGuessSourceLineByItemIdAndFreeItem`

**Parent Class:** `EAGuessSourceLineIdByItem`

**Related Actions:**
- [EAGuessSourceLineIdByItem](EAGuessSourceLineIdByItem.md) - Base version without free item consideration


</div>