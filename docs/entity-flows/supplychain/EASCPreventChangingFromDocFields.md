---
title: EASCPreventChangingFromDocFields
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASCPreventChangingFromDocFields

## Overview

Enforces data integrity by preventing unauthorized changes to specified fields when comparing supply chain documents with their source documents (fromDoc). Validates that protected fields, line additions, and line deletions are not modified after the source document relationship is established, with support for conditional validation using SQL queries.

## When This Action Runs

Automatic execution during document save/commit operations to validate that protected fields and line structures have not been changed relative to the source document (fromDoc). This ensures referential integrity between related supply chain documents.

## How It Works

1. **Identifies source document** - Gets the fromDoc (source document) reference from the current document. If the document has no source document the action does nothing
2. **Retrieves stable data** - Accesses the stable/committed version of the source document for comparison
3. **Applies field validation** - Compares each listed line field between a line of the current document and the line of the source document it came from (matched through the source line reference). Listed header fields are compared with the values the current document itself had at its last commit, not with the source document
4. **Validates line changes** - If configured, refuses a line that does not come from any line of the source document (*The line at {0} in the table ({1}) was added, this is not permitted*) and a source document line that has no line in the current document (*The line that was at {0} in the table ({1}) was removed, this is not permitted*)
5. **Executes conditional queries** - Runs SQL queries to determine validation scope for specific lines
6. **Blocks unauthorized changes** - Returns validation errors if protected fields have been modified

## Parameters

It takes the same six parameters, in the same order, as EAPreventChangingFields: see [its Parameters section](/entity-flows/core/EAPreventChangingFields#Parameters). On this flow:

- **Parameter 2** (Prevent Adding NEW Lines) blocks lines that do not come from a line of the source document
- **Parameter 3** (Prevent Deleting Lines) blocks leaving out a line of the source document
- In the query of **Parameter 4**, `line` is the line of the current document and `oldLine` is the line of the source document it came from

## Database Tables Affected

- **Current Document Data** - Validates current field values (read-only validation)
- **Source Document Data** - Compares against stable source document data (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCPreventChangingFromDocFields`

**Parent Class:** `EAPreventChangingFields`

**Validation Type:** Source Document Relationship Protection

**Related Actions:**
- [EAPreventChangingSCDocumentCriticalFields](EAPreventChangingSCDocumentCriticalFields.md) - General critical field protection


</div>

