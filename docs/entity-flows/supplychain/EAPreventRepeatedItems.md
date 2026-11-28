---
title: EAPreventRepeatedItems
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAPreventRepeatedItems

## Overview

Validates supply chain documents to prevent duplicate items in document lines based on configurable criteria. Checks for repeated items considering various dimensions like size, color, revision, lot, warehouse, and free item status. Can either block document save with errors or issue warnings depending on configuration.

## When This Action Runs

Automatic execution during document save/commit operations to validate that items are not duplicated within the document lines based on the specified matching criteria.

## How It Works

1. **Builds unique key for each line** - Creates composite key from item and enabled dimension parameters
2. **Processes all document lines** - Iterates through each line to check for duplicates
3. **Constructs matching criteria** - Adds item ID and optional dimensions to the uniqueness key:
   - Item (always included)
   - Size, color, revision, lot ID, box (if enabled)
   - Warehouse location (if enabled)
   - Free item status for invoice lines (if enabled)
4. **Detects duplicates** - Tracks line numbers where each unique key appears
5. **Reports violations** - Adds the error (or, when Parameter 8 is true, the warning) *The item {0} appeared in line {1} and {2}* when duplicate keys are found. Lines without an item are skipped
6. **Shows line numbers** - Identifies specific lines containing duplicate items

## Parameters

**Parameter 1:** Consider Size (Optional) - true/false to include size in uniqueness check (default: false)

**Parameter 2:** Consider Color (Optional) - true/false to include color in uniqueness check (default: false)

**Parameter 3:** Consider Revision (Optional) - true/false to include revision in uniqueness check (default: false)

**Parameter 4:** Consider Lot ID (Optional) - true/false to include lot tracking in uniqueness check (default: false)

**Parameter 5:** Consider Box (Optional) - true/false to include box dimension in uniqueness check (default: false)

**Parameter 6:** Consider Warehouse (Optional) - true/false to include warehouse in uniqueness check (default: false)

**Parameter 7:** Consider Free Item (Optional) - true/false to include free item status in uniqueness check (default: false)

**Parameter 8:** Warning Not Failure (Optional) - true/false to issue warnings instead of blocking errors (default: false)

## Database Tables Affected

- **Document Lines** - Validates uniqueness of items within document (read-only validation)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAPreventRepeatedItems`

**Validation Type:** Duplicate Prevention Control

**Uniqueness Scope:** Within single document lines only


</div>

