---
title: EARegenAssemblyDocumentDetailsFromBOM
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARegenAssemblyDocumentDetailsFromBOM

## Overview

Regenerates assembly document lines from the Bill of Materials (BOM) by replacing existing document lines with fresh component lines based on the current BOM structure. Recreates the complete assembly structure using the most up-to-date BOM configuration and component requirements.

## When This Action Runs

Manual execution on assembly documents when the BOM structure has changed and document lines need to be completely rebuilt, typically after BOM updates, component changes, or when assembly lines are out of sync with the current BOM configuration.

## How It Works

1. **Invokes BOM regeneration** - Calls the document's regenAssemblyDocumentLinesFromBom() method
2. **Clears existing lines** - Removes current assembly document lines
3. **Reads current BOM** - Reads the BOM selected on the assembly document. New lines are generated only when the document has a BOM and a non-zero quantity; otherwise the document is left with no lines
4. **Creates new lines** - Generates fresh document lines for each BOM component
5. **Applies quantities** - Sets component quantities based on BOM requirements and assembly quantity
6. **Maintains relationships** - Establishes proper parent-child relationships between components
7. **Returns success** - Always completes successfully after regeneration

## Parameters

This action does not require any parameters - it automatically regenerates all lines from the current BOM structure.

## Database Tables Affected

- **Assembly Document Lines** - Completely replaces existing lines with new BOM-based lines
- **Bill of Materials (BOM)** - Reads current BOM structure and components (read-only)
- **Item Master Data** - References component items and specifications (read-only)
- **Assembly Configuration** - Uses assembly setup and parameters (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARegenAssemblyDocumentDetailsFromBOM`

**Document Type:** Assembly Documents Only

**Operation Type:** Destructive - Complete line replacement


</div>

