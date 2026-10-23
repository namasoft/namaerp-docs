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

Manual execution or automated through entity flows for entity creation requiring approval workflows and immediate database commitment.

## How It Works

1. **Performs standard entity generation** with full validation and field mapping
2. **Integrates with approval workflows** - submits entity for approval through configured workflows
3. **Commits to database immediately** with auto-flush for real-time availability
4. **Tracks approval status** and maintains approval history and audit trails

## Key Parameters

Same as [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md) but with approval workflow integration.

## Key Difference

**Approval Integration:** Automatically submits generated entities for approval through configured approval workflows while maintaining immediate database commitment.

## Database Tables Affected

- **Target Entity Table** - Creates/updates records with approval status immediately  
- **Approval Tables** - Creates approval requests and maintains approval history
- **Source Entity Table** - May update via inverse copy configuration
- **Related Tables** - Updates cross-references with immediate flush

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