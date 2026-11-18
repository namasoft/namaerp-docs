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

Automatically triggered on post-commit and post-delete events for supply chain documents. On commit, generates related documents using field mapping. On delete, removes any generated documents that were created from the deleted source document.

## How It Works

### For Document Commits:
1. **Executes finder SQL** - Runs SQL query to identify target documents to generate
2. **Applies field mapping** - Copies fields from source to generated documents using mapping rules
3. **Processes document lines** - Copies and transforms line items based on criteria
4. **Handles approval workflow** - Optionally manages approval status of generated documents
5. **Manages draft status** - Controls whether generated documents are saved as drafts
6. **Groups lines** - Optionally consolidates multiple lines based on grouping criteria

### For Document Deletions:
1. **Identifies related documents** - Finds documents that were generated from the deleted document
2. **Deletes related documents** - Removes all generated documents to maintain data consistency

## Parameters

**Parameter 1:** Target Type (Required) - Entity type of documents to generate

**Parameter 2:** Finder SQL (Required) - SQL query to identify target documents

```sql
select id from SalesOrder where ref5Id={id}
```

**Parameter 3:** Field Map (Required) - Mapping between source and target fields

```fieldmap
code=code
fromDoc=$this
ref5=$this
```

**Parameter 4:** After Copy Lines Fields Map (Optional) - Additional field mapping applied after copying lines

**Parameter 5:** Inverse Copy (Optional) - Copies fields from generated document back to source

```fieldmap
ref5=$this
description5=n1
```

**Parameter 6:** Handle Approval (Optional) - true/false to manage approval workflow

**Parameter 7:** Save as Draft (Optional) - true/false to control draft status

**Parameter 8:** Run Only If Number not zero

```sql
totlaizesql(select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end)
```

**Parameter 9:** Copy Lines Criteria (Optional) - Criteria definition code for line filtering

**Parameter 10:** Copy Lines Query (Optional) - SQL query to filter which lines to copy

```sql
select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end
```

**Parameter 11:** Group Lines By (Optional) - Field(s) to group lines by during generation

**Parameter 12:** Delete Query (Optional) - Query to identify documents for cleanup when grouping

## Database Tables Affected

- **Target Document Tables** - Creates new documents based on target type parameter
- **Source Document Tables** - Reads data for field mapping and line copying (read-only)
- **Document Line Tables** - Creates new lines in generated documents

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAAutoGenSCDocFromDocWithFieldsMap`

**Parent Class:** `EAGenSCDocFromDocWithFieldsMap`

**Related Actions:**
- [EAGenSCDocFromDocWithFieldsMapWithoutFlush](EAGenSCDocFromDocWithFieldsMapWithoutFlush.md)

**ℹ️ Note:** This action is an automatic action, it selects the appropriate events to execute itself


</div>