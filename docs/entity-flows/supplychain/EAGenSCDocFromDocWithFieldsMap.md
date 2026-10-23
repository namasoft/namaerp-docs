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
8. **Cleanup** - Deletes empty documents or orphaned records

## Parameters

**Parameter 1:** Target Type (Required) - Entity type of document to generate

**Parameter 2:** Finder SQL (Required) - SQL to find/create target document

```sql
select id from SalesOrder where ref5Id={id}
```

**Parameter 3:** Field Map (Required) - Mapping between source and target fields

```
code=code
fromDoc=$this
ref5=$this
```

**Parameter 4:** After Copy Lines Map (Optional) - Additional field mapping after line copying

**Parameter 5:** Inverse Copy (Optional) - Copy fields from generated back to source

```
ref5=$this
description5=n1
```

**Parameter 6:** Handle Approval (Optional) - true/false to manage approval workflow

**Parameter 7:** Save as Draft (Optional) - true/false to save as draft

**Parameter 8:** Run Only If number greater not zero (Optional) - A value expression evaluated on the source document, such as a field or a `totalizesql(...)` query; the document is generated only when the result is not zero

```
totalizesql(select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end)
```

**Parameter 9:** Line Criteria Filter (Optional) - Criteria definition code for line filtering

**Parameter 10:** Line Query Filter (Optional) - SQL query for line filtering

```sql
select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end
```

**Parameter 11:** Group Lines By (Optional) - Field(s) to group lines creating multiple documents

**Parameter 12:** Cleanup Query (Optional) - SQL to identify documents for deletion when grouping

## Database Tables Affected

- **Target Document Tables** - Creates or updates generated documents
- **Source Document Tables** - Reads data for mapping (read-only)
- **Document Line Tables** - Copies and transforms line items

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGenSCDocFromDocWithFieldsMap`

**Related Actions:**
- [EAAutoGenSCDocFromDocWithFieldsMap](EAAutoGenSCDocFromDocWithFieldsMap.md) - Automatic version that runs on events


</div>