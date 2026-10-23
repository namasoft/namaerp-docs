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

Automatically on entity save/commit and delete operations. Runs without manual intervention (isAutomaticForced = true).

## How It Works

1. **Checks approval definitions** for target entity type
2. **Creates entities** with draft/pending status if approvals required
3. **Initiates approval workflow** when definitions exist
4. **Handles deletion** using DeleteRelatedEntityAction for cleanup

## Key Difference

Unlike standard automatic generation, this version:
- Respects approval workflows instead of bypassing them
- Creates entities in draft/pending status when approvals required
- Initiates approval processes automatically
- Provides controlled activation through authorization

## Key Parameters

Uses the same parameters as [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md):

- **Parameter 1:** Target Type (Required) - Entity type to create (checked for approval definitions)
- **Parameter 2:** Finder SQL (Required) - Query to find existing entity
- **Parameter 3:** Field Map (Required) - Field mapping expressions
- **Parameter 4:** Update Only (Optional) - Only update existing entities
- **Parameter 5:** Inverse Copy (Optional) - Copy fields back to source
- **Parameter 6:** Run Entity Flow Per Each Line (Optional) - Process collections
- **Parameter 7:** Insert Only (Optional) - Only create new entities
- **Parameter 8:** Apply When Query (Optional) - Conditional processing
- **Parameter 9:** Group Details By (Optional) - Group collection items
- **Parameter 10:** Run Only If (Optional) - Execution condition

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

