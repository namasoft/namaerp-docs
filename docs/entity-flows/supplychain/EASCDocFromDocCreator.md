---
title: EASCDocFromDocCreator
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASCDocFromDocCreator

## Overview

Creates a new supply chain document from an existing document by copying header information and all document lines. If a target document already exists in the specified field, it updates that document instead of creating a new one. Establishes proper document relationships and maintains references between source and generated documents.

## When This Action Runs

Manual execution to generate related documents from source documents, typically for creating invoices from orders, returns from sales, or any document-to-document workflow where the entire document structure needs to be replicated with different book and term settings.

## How It Works

1. **Validates parameters** - Fails with *You Must Specify the first four parameters for entity flow {0}* unless the first four parameters are provided (target type, book, term, field ID)
2. **Checks for existing document** - Looks for existing target document in the specified field
3. **Resolves book and term** - Finds DocumentBook and DocumentTerm by ID or code, with document type matching
4. **Creates or updates target** - Creates new document or starts editing existing one
5. **Sets book and term** - Assigns the specified book and term to target document
6. **Determines header source** - Takes the header data from the current document, or from the document held in the field of Parameter 5 when that parameter is filled
7. **Copies common data** - Transfers header information using standard copying logic
8. **Sets header details** - Applies warehouse, locator, and other header information
9. **Copies all lines** - Copies all the lines of the current document to the target, whatever Parameter 5 holds. A target line that already points to a source line is reused; other target lines are removed
10. **Commits document** - Saves the target document
11. **Updates reference** - Sets the target document reference in the specified field

## Parameters

**Parameter 1:** Target Type (Required) - Entity type of document to create/update

Example: `SalesInvoice`, `PurchaseOrder`

**Parameter 2:** Book Code (Required) - Document book code or ID for the target document

**Parameter 3:** Term Code (Required) - Document term code or ID for the target document

**Parameter 4:** Field ID To Keep Doc (Required) - Field where target document reference is stored

Example: `ref1`, `ref2`, `ref3`, `ref4`, `ref5`

**Parameter 5:** Field ID to Keep Make From Document (Optional) - Id of a header field of the current document that holds the supply chain document to take the header data from. The lines are always copied from the current document

## Database Tables Affected

- **Target Document Tables** - Creates new document or updates existing one
- **Target Document Lines** - Creates complete copy of all source document lines
- **Source Document** - Updates specified field with target document reference
- **DocumentBook/DocumentTerm** - Reads book and term configuration (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EASCDocFromDocCreator`

**Related Actions:**
- [EASCDocFromDocDeleter](EASCDocFromDocDeleter.md) - Deletes documents created by this action
- [EAGenSCDocFromDocWithFieldsMap](EAGenSCDocFromDocWithFieldsMap.md) - More configurable document generation


</div>

