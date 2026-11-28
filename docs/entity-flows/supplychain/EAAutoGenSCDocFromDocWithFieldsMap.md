---
title: EAAutoGenSCDocFromDocWithFieldsMap
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAAutoGenSCDocFromDocWithFieldsMap

## Overview

Automatically generates supply chain documents from other documents using configurable field mapping. Extends the base generation functionality to run automatically on document commit and handles document deletion cleanup. Creates related documents based on SQL criteria and copies data between them using field mapping rules.

## When This Action Runs

Automatically triggered on post-commit and post-delete events for supply chain documents. On commit, generates related documents using field mapping. On delete, runs the Finder SQL (Parameter 2) on the deleted document and deletes the first document it returns.

## How It Works

### For Document Commits:
Runs all the steps of [EAGenSCDocFromDocWithFieldsMap](/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap).

### For Document Deletions:
1. **Finds the generated document** - Runs the Finder SQL (Parameter 2) on the deleted document and takes the first id it returns, as a document of the Target Type (Parameter 1)
2. **Deletes it** - Deletes that document. Parameters 3 to 12 are not used on delete

The documents returned by the Finder SQL are left out of the check that refuses to delete a document other documents were created from (*Record cannot be deleted, {0}-{1} Created from this record*), so the source document can be deleted.

## Parameters

It takes the same 12 parameters, in the same order and with the same meaning, as EAGenSCDocFromDocWithFieldsMap: see [its Parameters section](/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap#Parameters). On delete only Parameter 1 (Target Type) and Parameter 2 (Finder SQL) are used.

## Database Tables Affected

- **Target Document Tables** - Creates new documents based on target type parameter
- **Source Document Tables** - Reads data for field mapping and line copying (read-only)
- **Document Line Tables** - Creates new lines in generated documents

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoGenSCDocFromDocWithFieldsMap`

**Parent Class:** `EAGenSCDocFromDocWithFieldsMap`

**Related Actions:**
- [EAGenSCDocFromDocWithFieldsMap](/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap) - The same generation without the automatic event handling
- [EAGenSCDocFromDocWithFieldsMapWithoutFlush](EAGenSCDocFromDocWithFieldsMapWithoutFlush.md)

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>