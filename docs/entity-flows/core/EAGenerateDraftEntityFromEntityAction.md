---
title: EAGenerateDraftEntityFromEntityAction
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateDraftEntityFromEntityAction

## Overview

Creates new entities from existing entities and saves them as draft documents for review. Identical to standard entity generation but saves as drafts instead of committing, allowing review before finalization.

Please review the page at [Field Values Calculator](../../entity-flows/core/ai-generated-field-maps-documentation.md)

## When This Action Runs

Manual execution or automated through entity flows for draft entity creation requiring review or approval before finalization.

## How It Works

1. **Analyzes source entity** for data extraction
2. **Maps fields** from source to target based on configuration
3. **Searches for existing** target entities using finder SQL  
4. **Creates or updates** target entity with mapped values
5. **Saves as draft** without full commitment for review

## Key Parameters

Same as [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md) but saves result as draft:

- **Parameter 1:** Target Type (Required) - Entity type to create  
- **Parameter 2:** Finder SQL (Required) - Query to find existing entity for updates
- **Parameter 3:** Field Map (Optional) - Field mapping configuration
- **Parameter 4:** Update Only (Optional) - Only update existing entities
- **Parameter 5:** Inverse Copy (Optional) - Copy fields back to source entity
- **Parameter 6:** Run Per Each Line (Optional) - Execute for each collection item
- **Parameter 7:** Insert Only (Optional) - Only create new entities
- **Parameter 8:** Apply When Query (Optional) - Conditional logic for generation
- **Parameter 9:** Group Details By (Optional) - Group detail lines by criteria
- **Parameter 10:** Run Only If (Optional) - Execute only if expression returns > 0

## Database Tables Affected

- **Target Entity Table** - Creates/updates records with draft status
- **Source Entity Table** - May update via inverse copy configuration
- **Detail Collections** - Generates detail lines based on source collections
- **Related Tables** - Updates cross-references and relationships

## Key Difference

Creates entities in **draft status** for review/approval instead of immediate commitment like the standard generation action.

## Related Actions

- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)
- [EAGenerateDraftEntityFromEntityActionNoFlush](EAGenerateDraftEntityFromEntityActionNoFlush.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateDraftEntityFromEntityAction`

</div>