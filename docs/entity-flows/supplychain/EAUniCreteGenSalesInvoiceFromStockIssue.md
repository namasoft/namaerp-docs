---
title: EAUniCreteGenSalesInvoiceFromStockIssue
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUniCreteGenSalesInvoiceFromStockIssue

## Overview

Creates sales documents (typically invoices) from stock issue documents by tracing back to the original parent documents (like sales orders). Copies line information from the parent documents while using quantities from the stock issue, establishing proper document relationships and maintaining inventory tracking continuity.

## When This Action Runs

Runs on the event it is attached to on a stock issue, when corresponding sales documents need to be generated, typically used in workflows where stock issues trigger invoice creation or when converting stock movements into billable sales transactions.

## How It Works

1. **Prevents recursion** - Uses document mapping to avoid infinite loops during automatic processing
2. **Identifies parent documents** - For each stock issue line, finds the corresponding parent document line
3. **Validates parent relationships** - Fails with *Could not find parent of line number {0} in document {1} with item {2}* when a line has no parent line in a document of the parent type
4. **Creates or finds target document** - Uses SQL query to locate existing target or creates new one
5. **Sets header information** - Keeps the target document's own book and term, and takes the warehouse, locator and the other header data from the parent document of the first line
6. **Maps fields** - Applies field mapping from source to target document
7. **Processes document lines** - Removes the existing lines of the target document, then for each stock issue line:
   - Skips service items (no physical inventory impact)
   - Creates corresponding line in target document
   - Copies line data from original parent document
   - Sets quantities from stock issue document
   - Establishes origin document relationships
   - Copies the dependent lines of the parent line as well, with the same quantity as the new line
8. **Handles special relationships** - For StockIssue → SalesInvoice:
   - Replaces the stock documents of the invoice with this stock issue
9. **Applies inverse mapping** - Copies selected fields back from target to source

## Parameters

**Parameter 1:** Target Type (Required) - Entity type of document to create

Example: `SalesInvoice`, `PurchaseInvoice`

**Parameter 2:** Parent Type (Required) - Entity type of parent documents to trace back to

Example: `SalesOrder`, `PurchaseOrder`

**Parameter 3:** Finder Query (Required) - SQL query to find or create target document

```sql
select id from SalesInvoice where ref5Id={id}
```

**Parameter 4:** Fields Map (Required) - Field mapping from source to target document, one `target=source` mapping per line

```fieldmap
customer=customer
ref5=$this
```

**Parameter 5:** Inverse Fields Map (Optional) - Field mapping from target back to source, in the same format

```fieldmap
ref5=$this
```

## Database Tables Affected

- **Target Document** - Creates new or updates existing sales/purchase documents
- **Target Document Lines** - Creates lines copying from parent documents with stock issue quantities
- **Document Relationships** - Establishes origin document links and stock document relationships
- **Parent Document Data** - Reads original order/requisition information (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAUniCreteGenSalesInvoiceFromStockIssue`

**Document Type:** Stock Issue Documents

**Related Actions:**
- Document generation entity flows
- Stock to billing conversion utilities
- Document relationship management actions


</div>

