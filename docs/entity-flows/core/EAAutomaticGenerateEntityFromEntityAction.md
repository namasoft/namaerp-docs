---
title: EAAutomaticGenerateEntityFromEntityAction
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAAutomaticGenerateEntityFromEntityAction

## Overview

Automatically generates related entities from source entities and handles their deletion when the source entity is deleted. Provides complete lifecycle management for related entity generation.

## When This Action Runs

On Post Commit and Post Delete of the source record, and on no other event (saving a draft does nothing). Whatever is chosen in **Target Action** on the flow line is replaced with **Automatic** when the entity flow is saved.

## How It Works

1. **Detects event type** - post-delete or post-commit
2. **On Post Delete** - behaves as [DeleteRelatedEntityAction](/entity-flows/core/DeleteRelatedEntityAction) with Parameters 1 and 2: the first record the finder SQL returns is deleted
3. **On Post Commit** - behaves as [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction) with all the parameters
4. **Delete check** - the generated records the finder SQL returns do not block deleting the source with *Record cannot be deleted, {0}-{1} Created from this record*

## Key Parameters

The ten parameters, their titles and their rules are the same as in [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction#Key-Parameters): Target Type, Finder SQL, Field Map, Update Only, Inverse Copy, Run Entity Flow Per Each Line, Insert Only, Apply When Query, Group Details By and Run Only If. Parameters 1 and 2 must be filled; on Post Delete only these two are used.

### Example Field Map:
```fieldmap
code=code
fromDoc=$this
customer=customer
```

## Database Tables Affected

- **Source Entity** - Triggers automatic action on save/delete
- **Target Entity** - Created on commit, deleted on source deletion
- **Reference Fields** - Maintain relationships between entities

## Related Actions

- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)
- [DeleteRelatedEntityAction](DeleteRelatedEntityAction.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutomaticGenerateEntityFromEntityAction`

</div>

