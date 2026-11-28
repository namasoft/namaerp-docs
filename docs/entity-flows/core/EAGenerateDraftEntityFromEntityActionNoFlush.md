---
title: EAGenerateDraftEntityFromEntityActionNoFlush
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateDraftEntityFromEntityActionNoFlush

## Overview

Same as [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) but without automatic database flush for batch processing optimization.

Visit [Field Values Calculator](../../entity-flows/core/ai-generated-field-maps-documentation.md) to know more about fields map and the available features

## When This Action Runs

Usually on Post Commit or from a manual flow, when several records are generated in one save and none of the later lines needs to find them with SQL.

## How It Works

The steps are those of [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction): check Run Only If and the Apply When query, find or create the target, copy the common data and apply the field map, save the target, apply the inverse copy. This flow differs in two of them:

- **Saves the target as a draft.** A target that was already saved as final once is saved as final again: only a target never saved as final stays a draft.
- **Does not flush** — the generated record is written to the database together with the rest of the save that ran the flow, not straight after it is generated. Until then a SQL query run later in the same save (for example the finder SQL of another flow line) does not see it. When a later line must find it, use the flushing version, [EAGenerateDraftEntityFromEntityAction](/entity-flows/core/EAGenerateDraftEntityFromEntityAction).

## Parameters

The ten parameters, their titles and their rules are the same as in [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction#Key-Parameters): Target Type, Finder SQL, Field Map, Update Only, Inverse Copy, Run Entity Flow Per Each Line, Insert Only, Apply When Query, Group Details By and Run Only If. Parameters 1 and 2 must be filled.

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateDraftEntityFromEntityActionNoFlush`

**Related Actions:**
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) - Standard draft entity generation with auto-flush
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) - Standard entity generation without flush
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md) - Generation with approval, no flush
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md) - Generation with approval process
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval


</div>