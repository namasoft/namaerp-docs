---
title: EAGenerateEntityFromEntityActionNoFlushWithApproval
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionNoFlushWithApproval

## Overview

Combines entity generation with approval workflow integration but without immediate database flush for batch processing optimization.

Please review the page at [Field Values Calculator](../../entity-flows/core/ai-generated-field-maps-documentation.md)

## When This Action Runs

Like the no-flush version, when the generated records must go through their approval definitions.

## How It Works

The steps are those of [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction): check Run Only If and the Apply When query, find or create the target, copy the common data and apply the field map, save the target, apply the inverse copy. This flow differs in two of them:

- **Saves the target the way the screen does**: when an approval definition applies to it, it is sent for approval instead of being saved as final.
- **Does not flush** — the generated record is written to the database together with the rest of the save that ran the flow, not straight after it is generated. Until then a SQL query run later in the same save (for example the finder SQL of another flow line) does not see it. When a later line must find it, use the flushing version, [EAGenerateEntityFromEntityActionWithApproval](/entity-flows/core/EAGenerateEntityFromEntityActionWithApproval).

## Parameters

The ten parameters, their titles and their rules are the same as in [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction#Key-Parameters): Target Type, Finder SQL, Field Map, Update Only, Inverse Copy, Run Entity Flow Per Each Line, Insert Only, Apply When Query, Group Details By and Run Only If. Parameters 1 and 2 must be filled.

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionNoFlushWithApproval`

**Related Actions:**
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) - Standard entity generation without flush
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md) - Entity generation with approval and auto-flush
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval
- [EAGenerateDraftEntityFromEntityActionNoFlush](EAGenerateDraftEntityFromEntityActionNoFlush.md) - Draft generation without flush
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) - Draft entity generation


</div>