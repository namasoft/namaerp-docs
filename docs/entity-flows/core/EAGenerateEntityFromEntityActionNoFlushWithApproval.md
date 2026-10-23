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

Batch entity creation requiring approval workflows where database flush timing needs to be controlled.

## How It Works

1. **Generates entity** using standard field mapping and validation
2. **Submits for approval** through configured approval workflows
3. **Sets approval status** on generated entity
4. **Defers database flush** keeping changes in memory
5. **Maintains approval state** until manual flush

## Parameters

Same parameters as [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) with approval workflow integration

## Database Tables Affected

- **Target Entity Tables** - Creates entities in memory with approval status (not flushed)
- **Approval Workflow Tables** - Creates approval requests and workflow tracking
- **Source Entity Tables** - May update based on inverse mapping

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