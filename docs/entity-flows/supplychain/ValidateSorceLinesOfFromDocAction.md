---
title: ValidateSorceLinesOfFromDocAction
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# ValidateSorceLinesOfFromDocAction

## Overview

Validates that all lines in the current document have corresponding source lines in the parent document when the document is based on another document (fromDoc relationship). Ensures document integrity by preventing orphaned lines that reference non-existent source lines, maintaining proper document relationships and traceability.

## When This Action Runs

Validation action executed during document save or processing when the document has a fromDoc relationship, typically used in document workflows where child documents (invoices, delivery notes, receipts) must maintain references to parent document lines.

## How It Works

1. **Checks for source document** - Verifies if the document has a fromDoc reference:
   - If no fromDoc exists, validation passes (standalone document)
   - If fromDoc exists, proceeds with validation
2. **Validates source document type** - Ensures the source document is a BasicSCDocument:
   - If wrong type, validation passes (not applicable)
   - If correct type, proceeds with line validation
3. **Processes each document line** - Iterates through all lines in the current document
4. **Validates source line reference** - For each line:
   - Extracts the sourceLineId from the current line
   - Searches for matching line in source document using the ID
   - Records the error *No matching line found in source document for line number {0}* if no matching source line is found
5. **Accumulates validation errors** - Collects all orphaned line errors with line numbers
6. **Returns validation result** - Success if all lines have valid sources, failure with details if orphaned lines exist

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **BasicSCDocumentLine** - Reads sourceLineId for validation (read-only)
- **Document Relationships** - Reads fromDoc references (read-only)
- **Source Document Lines** - Searches source document line collection (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.ValidateSorceLinesOfFromDocAction`


</div>

