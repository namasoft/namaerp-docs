---
title: EAUnicreteGenItemsAllAllowMustApply
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUnicreteGenItemsAllAllowMustApply

## Overview

Enhanced version of the item generation process with stricter allow rule enforcement. Generates inventory items based on item class hierarchies but applies more restrictive validation where all allow rules must be satisfied at each hierarchical level, ensuring that every item class in the combination must be explicitly allowed.

## When This Action Runs

Manual execution on item sections or item classes when strict item generation is needed with comprehensive allow rule validation, typically used when business rules require that every item class level must be explicitly permitted rather than just having any applicable allow rule.

## How It Works

1. **Inherits base functionality** - Uses all features from EAUniCreteGenItems for tree building and item creation
2. **Enhances allow rule validation** - Overrides the allowRangeApplicable method with stricter logic:
   - Groups allow rules by item class level (section, class1, class2, etc.)
   - For each item class in the combination, checks if it appears in the allowed set for its level
   - First applies the parent's rule: at least one allow rule must be fully contained in the combination
   - Then every item class of the combination must be among the classes the allow rules list for its level; a level that no allow rule mentions is not restricted
3. **Applies level-by-level validation** - Ensures comprehensive rule coverage across all hierarchy levels
4. **Maintains parent processing** - All other item generation logic remains identical to parent class

## Parameters

It takes the same 4 parameters, in the same order and with the same meaning, as EAUniCreteGenItems: see [its Parameters section](/entity-flows/supplychain/EAUniCreteGenItems#Parameters).

## Database Tables Affected

- **InvItem** - Creates new items or updates existing item classifications
- **Item Classes (1-10)** - Reads class hierarchies and relationships (read-only)
- **ItemSection** - Reads section configurations and settings (read-only)
- **ItemClassRange** - Reads allow/disallow relationship rules with stricter validation (read-only)
- **UOMGroup** - Reads unit of measure group configurations (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUnicreteGenItemsAllAllowMustApply`

**Parent Class:** [EAUniCreteGenItems](EAUniCreteGenItems.md)

**Input Type:** Item Classes or Item Sections

**Related Actions:**
- [EAUniCreteGenItems](EAUniCreteGenItems.md) - Base item generation functionality
- [EAUniCreteGenAssemblyBOM](EAUniCreteGenAssemblyBOM.md) - Related BOM generation
- Item classification management actions


</div>

