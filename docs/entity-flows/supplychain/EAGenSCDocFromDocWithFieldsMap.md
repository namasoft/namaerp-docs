---
title: EAGenSCDocFromDocWithFieldsMap
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenSCDocFromDocWithFieldsMap

## Overview

Generates supply chain documents from other documents using configurable field mapping and line filtering. Creates target documents based on SQL criteria, copies data using field mappings, and supports advanced features like line grouping, conditional execution, and approval workflow integration.

## When This Action Runs

Manual execution to generate related documents from source documents, typically for creating invoices from orders, returns from sales, or any document-to-document transformation requiring field mapping.

## How It Works

1. **Executes finder SQL** - Finds or creates target document using SQL query
2. **Applies field mapping** - Copies header fields from source to target using mapping rules
3. **Filters lines** - Selects which lines to copy based on criteria or SQL queries  
4. **Groups lines** - Optionally groups lines by specified fields creating multiple documents
5. **Copies document lines** - Transfers filtered lines with field transformations
6. **Handles workflow** - Manages approval processes and draft status
7. **Inverse mapping** - Copies fields back from generated document to source
8. **Cleanup** - Deletes a generated document that ends up with no lines, and, when grouping, the documents returned by Parameter 12 that this run did not create or update
9. **Flush** - Writes the changes to the database after each generated document

## Parameters

**Parameter 1:** Target Type (Required) - Entity type of document to generate

**Parameter 2:** Finder SQL (Required) - SQL to find/create target document

```sql
select id from SalesOrder where ref5Id={id}
```

**Parameter 3:** Field Map (Required) - Mapping between source and target fields

```fieldmap
code=code
fromDoc=$this
ref5=$this
```

**Parameter 4:** After Copy Lines Fields Map (Optional) - Field map applied after the lines are copied. Both sides of each mapping refer to the generated document

**Parameter 5:** Inverse Copy (Optional) - Copy fields from generated back to source

```fieldmap
ref5=$this
description5=n1
```

**Parameter 6:** Handle Approval (Optional) - true/false to manage approval workflow

**Parameter 7:** Save as Draft (Optional) - true/false to save as draft

**Parameter 8:** Run Only If number greater not zero (Optional) - A value expression evaluated on the source document, such as a field or a `totalizesql(...)` query; the document is generated only when the result is not zero

```fieldmap
totalizesql(select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end)
```

**Parameter 9:** Copy only lines matching criteria (Criteria Definition Code) (Optional) - Code of a criteria definition; only the source lines that match it are copied

**Parameter 10:** Copy Only Lines Matching Query (Optional) - SQL query evaluated per source line to decide which lines are copied

```sql
select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end
```

**Parameter 11:** Group Lines By (Optional) - Field(s) to group lines creating multiple documents

**Parameter 12:** Query to list all docs that should be deleted if not handled by the entity flow (For Group Lines By) (Optional) - Used only when Parameter 11 is filled. A query returning the ids of documents of the target type; every one of them that this run did not create or update is deleted

## Database Tables Affected

- **Target Document Tables** - Creates or updates generated documents
- **Source Document Tables** - Reads data for mapping (read-only)
- **Document Line Tables** - Copies and transforms line items

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGenSCDocFromDocWithFieldsMap`

**Related Actions:**
- [EAAutoGenSCDocFromDocWithFieldsMap](EAAutoGenSCDocFromDocWithFieldsMap.md) - Automatic version that runs on events


</div>