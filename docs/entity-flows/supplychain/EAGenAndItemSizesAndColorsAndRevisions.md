---
title: EAGenAndItemSizesAndColorsAndRevisions
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenAndItemSizesAndColorsAndRevisions

## Overview

Automatically creates missing size, color, and revision master files and adds them to item configurations based on document line dimensions. Generates new master data records when document lines reference dimensions that don't exist in the item's configuration.

## When This Action Runs

Manual execution when documents contain size, color, or revision dimensions that need to be added to item master configurations, typically during data migration or when new product variants are introduced.

## How It Works

1. **Processes document lines** - Iterates through all lines in the supply chain document
2. **Checks item dimensions** - Examines size, color, and revision values on each line. A dimension is handled only when its "Add ... To Item" parameter is `true`, the item uses that dimension and the line has a value in it
3. **Validates against item config** - Compares line dimensions with item's existing configurations
4. **Creates missing master files** - When the matching "Create ... Master File" parameter is `true`, looks for a size, color or revision master file whose code is the value on the line and links it to the new line on the item; if none exists it creates one with that code, fills it from the fields map and saves it
5. **Updates item configuration** - Adds new dimensions to the item's available options
6. **Commits changes** - Saves updated item records with new dimension configurations

## Parameters

### Size Configuration
**Parameter 1:** Add Size To Item if not found (Optional) - true/false to add sizes not found in item (default: false)

**Parameter 2:** Create Size Master File if Not Found (Optional) - true/false to create missing size master records (default: false). Used only when Parameter 1 is true

**Parameter 3:** Size File Fields Map (Optional) - Field map that copies fields of the document to the size master file being created

### Color Configuration  
**Parameter 4:** Add Color To Item if not found (Optional) - true/false to add colors not found in item (default: false)

**Parameter 5:** Create Color Master File if Not Found (Optional) - true/false to create missing color master records (default: false). Used only when Parameter 4 is true

**Parameter 6:** Color File Fields Map (Optional) - Field map that copies fields of the document to the color master file being created

### Revision Configuration
**Parameter 7:** Add Revision To Item if not found (Optional) - true/false to add revisions not found in item (default: false)

**Parameter 8:** Create Revision Master File if Not Found (Optional) - true/false to create missing revision master records (default: false). Used only when Parameter 7 is true

**Parameter 9:** Revision File Fields Map (Optional) - Field map that copies fields of the document to the revision master file being created

## Database Tables Affected

- **InvItem** - Updates item configurations with new size, color, and revision options
- **Size Master Files** - Creates new size records if configured
- **Color Master Files** - Creates new color records if configured
- **Revision Master Files** - Creates new revision records if configured
- **Item Configuration Tables** - Links new dimensions to items

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGenAndItemSizesAndColorsAndRevisions`


</div>