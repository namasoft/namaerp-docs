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

The steps are those of [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction): check Run Only If and the Apply When query, find or create the target, copy the common data and apply the field map, save the target, apply the inverse copy, flush. This flow differs in one of them:

- **Saves the target as a draft.** A target that was already saved as final once is saved as final again: only a target never saved as final stays a draft.

## Key Parameters

The ten parameters, their titles and their rules are the same as in [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction#Key-Parameters): Target Type, Finder SQL, Field Map, Update Only, Inverse Copy, Run Entity Flow Per Each Line, Insert Only, Apply When Query, Group Details By and Run Only If. Parameters 1 and 2 must be filled.

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