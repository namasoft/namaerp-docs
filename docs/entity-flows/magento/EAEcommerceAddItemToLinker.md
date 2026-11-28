---
title: EAEcommerceAddItemToLinker
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEcommerceAddItemToLinker

## Overview

Adds inventory items to Magento e-commerce integration linkers. Creates or updates MagentoItemLinker documents to establish connections between ERP inventory items and Magento site configurations, enabling product synchronization between systems.

## When This Action Runs

Manual execution on inventory items that need to be linked to Magento e-commerce sites. Typically used during product setup or when adding existing items to e-commerce integration workflows.

## How It Works

1. **Validates site code** - Finds the Magento site using the provided site code; the flow fails with *Can not find site with code {0}* when there is none
2. **Searches existing linkers** - Looks for committed MagentoItemLinker documents for the site, or for a site group that contains the site
3. **Checks for existing item** - Searches for the current item in existing linker documents
4. **Creates or updates linker** - When the item is already on a linker line, that linker is edited. Otherwise the last linker found is edited, or a new linker is created for the site when there is none, with its code rendered from parameter 3
5. **Adds item line** - Only when the item is not yet on a linker line: creates a new MagentoItemLinkerLine with the item, and the item's code as its SKU
6. **Applies field mappings** - Copies additional fields using the field mapping parameter
7. **Sets current line** - Marks the new/existing line as the current line for processing
8. **Commits changes** - Saves the linker document with the new item association

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to link the item to

**Parameter 2:** Linker Line Fields Map (Optional) - Field mappings for additional data copying

**Parameter 3:** Linker File Code Template (Required) - Template for the code of a newly created linker, for example `{magentoSite.code}`

## Example Field Mapping

```fieldmap
line.dimensions.box=name2
line.description=description
line.weight=weight
```

## Database Tables Affected

- **MagentoItemLinker** - Creates new or updates existing linker documents
- **MagentoItemLinkerLine** - Creates new line entries for items
- **MAGMagentoSite** - References the target Magento site (read-only)
- **InvItem** - Source inventory item being linked (read-only)

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceAddItemToLinker`


</div>