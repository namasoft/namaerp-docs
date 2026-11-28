---
title: EAReApplyQtyTrackingEffects
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAReApplyQtyTrackingEffects

## Overview

Recalculates and reapplies quantity tracking effects for supply chain documents by treating the document as if it were being inserted for the first time. Updates satisfied quantities between related documents to ensure accurate quantity tracking relationships after data corrections or system changes.

## When This Action Runs

Manual execution when quantity tracking relationships need to be rebuilt, typically after data migration, system updates, document corrections, or when quantity tracking appears incorrect due to system issues.

## How It Works

1. **Identifies source document** - Gets the fromDoc (source document) that this document is related to
2. **Processes document lines** - Iterates through all lines in the current document
3. **Calculates satisfied quantities** - Uses SCRelatedQtiesUtil to determine how much quantity each line satisfies from the source
4. **Updates tracking relationships** - Applies quantity tracking effects as if document was newly created: the quantity of each line is added to the satisfied quantity of its source line, without first removing an effect the document applied earlier
5. **Maintains data consistency** - Ensures quantity relationships are accurately reflected in the system

## Parameters

This action does not require any parameters - it automatically recalculates quantity tracking based on document relationships.

## Database Tables Affected

- **Related Quantity Tracking Tables** - Updates quantity satisfaction relationships between documents
- **Document Lines** - May update satisfied quantity fields on source and target documents
- **Supply Chain Tracking** - Recalculates quantity fulfillment status

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAReApplyQtyTrackingEffects`

**Processing Type:** Quantity Relationship Recalculation

**Related Utilities:** SCRelatedQtiesUtil for quantity calculations


</div>

