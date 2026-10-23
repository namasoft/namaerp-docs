---
title: EAUniCreteGenItems
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUniCreteGenItems

## Overview

Generates inventory items automatically based on item class hierarchies and relationships. Creates a comprehensive tree of all possible item combinations from the specified item section or class, applies business rules and restrictions, then creates or updates inventory items with proper classifications, UOM groups, and configurations.

## When This Action Runs

Manual execution on item sections or item classes when bulk item generation is needed, typically used for creating standardized item catalogs, populating new item hierarchies, or maintaining consistency across item classifications and relationships.

## How It Works

1. **Validates input entity** - Ensures target is an item class or section with proper item section reference
2. **Prevents concurrent execution** - Uses locking mechanism to prevent multiple simultaneous runs
3. **Builds item class tree** - Loads all item classes (1-10) related to the specified section
4. **Creates hierarchical tree** - Constructs tree structure representing all class relationships
5. **Processes tree relationships** - Handles null children and copies relationships appropriately
6. **Collects item combinations** - Generates all possible item data combinations from tree leaf nodes
7. **Applies business filters** - Removes incompatible combinations based on:
   - Item class relationships and restrictions
   - Allow/disallow rules defined in item class ranges
   - Section compatibility and hierarchy constraints
8. **Creates/updates items** - For each valid combination:
   - Finds existing item or creates new one
   - Sets all item class assignments (section, class1-10)
   - Applies UOM group configurations from class hierarchy
   - Copies unit of measure definitions and conversions
   - Sets item configurations from section settings
9. **Handles deletion marking** - Optionally marks or deletes items not in generated set

## Parameters

**Parameter 1:** Test Only (Optional) - Any value (for example `true`) skips creating and updating items; leave empty to create them

**Parameter 2:** Log Into Field (Optional) - Field name to log generation details and tree structure

**Parameter 3:** Mark Items for Deletion (Optional) - true to write `Delete` in the Description 5 field of the section's items that are not in the generated set (and clear it on the others)

**Parameter 4:** Delete Unneeded Items (Optional) - true to actually delete items not in generated set

## Database Tables Affected

- **InvItem** - Creates new items or updates existing item classifications
- **Item Classes (1-10)** - Reads class hierarchies and relationships (read-only)
- **ItemSection** - Reads section configurations and settings (read-only)
- **UOMGroup** - Reads unit of measure group configurations (read-only)
- **ItemClassRange** - Reads allow/disallow relationship rules (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUniCreteGenItems`

**Input Type:** Item Classes or Item Sections

**Related Actions:**
- [EAUniCreteGenAssemblyBOM](EAUniCreteGenAssemblyBOM.md) - Related BOM generation
- Item classification management actions
- UOM group management utilities


</div>

