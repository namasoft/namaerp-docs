---
title: EAGenerateEntityFromEntityActionNoFlush
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionNoFlush

## Overview

Creates new entities from existing entities with full commitment but without immediate database flush. Same as standard generation but defers database synchronization for batch processing and performance optimization.

## When This Action Runs

Usually on Post Commit or from a manual flow, when several records are generated in one save and none of the later lines needs to find them with SQL.

## How It Works

The steps are those of [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction): check Run Only If and the Apply When query, find or create the target, copy the common data and apply the field map, save the target, apply the inverse copy. This flow differs in one of them:

- **Does not flush** — the generated record is written to the database together with the rest of the save that ran the flow, not straight after it is generated. Until then a SQL query run later in the same save (for example the finder SQL of another flow line) does not see it. When a later line must find it, use the flushing version, [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction).

## Parameters

The ten parameters, their titles and their rules are the same as in [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction#Key-Parameters): Target Type, Finder SQL, Field Map, Update Only, Inverse Copy, Run Entity Flow Per Each Line, Insert Only, Apply When Query, Group Details By and Run Only If. Parameters 1 and 2 must be filled.

## Related Actions

- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)
- [EAGenerateDraftEntityFromEntityActionNoFlush](EAGenerateDraftEntityFromEntityActionNoFlush.md)
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionNoFlush`

</div>