---
title: EAAutomaticGenerateEntityFromEntityActionWithApproval
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAAutomaticGenerateEntityFromEntityActionWithApproval

## Overview

Automatically generates related entities from source entities while respecting approval workflows. Initiates approval processes for generated entities when approval definitions exist.

## When This Action Runs

On Post Commit and Post Delete of the source record, and on no other event. Whatever is chosen in **Target Action** on the flow line is replaced with **Automatic** when the entity flow is saved.

## How It Works

It works as [EAAutomaticGenerateEntityFromEntityAction](/entity-flows/core/EAAutomaticGenerateEntityFromEntityAction)
(generate on Post Commit, delete on Post Delete, generated records do not block deleting the source), with one difference:

- **Saves the target the way the screen does**: when an approval definition applies to it, it is sent for approval
  instead of being saved as final. The automatic version without approval always saves it as final.

## Key Parameters

The ten parameters, their titles and their rules are the same as in [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction#Key-Parameters): Target Type, Finder SQL, Field Map, Update Only, Inverse Copy, Run Entity Flow Per Each Line, Insert Only, Apply When Query, Group Details By and Run Only If. Parameters 1 and 2 must be filled; on Post Delete only these two are used.

## Database Tables Affected

- **Source/Target Entities** - Generated with approval status consideration
- **ApprovalCase** - Created when workflows initiated
- **ApprovalDefinition** - Checked for workflow requirements

## Related Actions

- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [DeleteRelatedEntityAction](DeleteRelatedEntityAction.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutomaticGenerateEntityFromEntityActionWithApproval`

</div>

