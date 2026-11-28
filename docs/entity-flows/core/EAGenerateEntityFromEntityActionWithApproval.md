---
title: EAGenerateEntityFromEntityActionWithApproval
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionWithApproval

## Overview

Creates new entities from existing entities with full commitment and approval process integration. Combines standard entity generation with approval workflow integration and immediate database flush.

Please review the page at [Field Values Calculator](../../entity-flows/core/ai-generated-field-maps-documentation.md)

## When This Action Runs

Like [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md), when the generated records must go through their approval definitions.

## How It Works

The steps are those of [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction): check Run Only If and the Apply When query, find or create the target, copy the common data and apply the field map, save the target, apply the inverse copy. This flow differs in one of them:

- **Saves the target the way the screen does**: when an approval definition applies to it, it is sent for approval instead of being saved as final.

Like the standard flow it flushes: the generated record is written to the database straight away, so SQL queries run later in the same save find it.

## Parameters

The ten parameters, their titles and their rules are the same as in [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction#Key-Parameters): Target Type, Finder SQL, Field Map, Update Only, Inverse Copy, Run Entity Flow Per Each Line, Insert Only, Apply When Query, Group Details By and Run Only If. Parameters 1 and 2 must be filled.

## Related Actions

- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md)
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionWithApproval`

</div>