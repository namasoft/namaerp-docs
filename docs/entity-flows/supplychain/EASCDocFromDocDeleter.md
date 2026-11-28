---
title: EASCDocFromDocDeleter
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASCDocFromDocDeleter

## Overview

Deletes supply chain documents that are referenced in specified fields of the source document. Finds the target document stored in the specified field reference and permanently deletes it from the system, including all associated data and relationships.

## When This Action Runs

Manual execution to clean up related documents, typically used to delete generated documents that are no longer needed, remove draft documents, or clean up document relationships when business processes change.

## How It Works

1. **Validates parameters** - Fails with *You Must Specify the first two parameters for entity flow {0}* unless the first two parameters are provided (target type and field ID)
2. **Locates target document** - Uses the findDoc utility method to locate the referenced document:
   - Reads the specified field from the source document
   - Handles different reference types (direct BasicSCDocument, GenericReference, or ID/code)
   - Resolves references to actual document instances
3. **Deletes document** - If target document is found, calls EntityMediator.deleteEntityFromBusinessAction()
4. **Accumulates results** - Collects success/failure results from the deletion process

## Parameters

**Parameter 1:** Target Type (Required) - Entity type of document to delete

Example: `SalesInvoice`, `PurchaseOrder`. It must be a supply chain document type

**Parameter 2:** Field ID To Keep Doc (Required) - Field containing the document reference to delete

Example: `ref1`, `ref2`, `ref3`, `ref4`, `ref5`

## Database Tables Affected

- **Target Document Tables** - Completely removes the target document and all associated data
- **Target Document Lines** - Deletes all lines associated with the target document
- **Document Relationships** - Removes relationships and references involving the target document
- **Source Document** - Read only; the action does not clear the field that held the reference

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCDocFromDocDeleter`

**Operation Type:** Destructive - Permanent document deletion

**Related Actions:**
- [EASCDocFromDocCreator](EASCDocFromDocCreator.md) - Creates documents that can be deleted by this action


</div>

