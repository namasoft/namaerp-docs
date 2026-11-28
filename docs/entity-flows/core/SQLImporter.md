---
title: SQLImporter
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# SQLImporter

## Overview

Imports entities from SQL query results and saves them as committed records immediately. Executes multiple SQL statements to fetch data, processes the results into entity format, and creates fully committed entities that are immediately available in the system.

## When This Action Runs

Manual execution for bulk data import from trusted sources, automated data synchronization, or creating production-ready entities directly from SQL queries without manual review.

## How It Works

1. **Executes SQL queries** - Runs all provided SQL statements in sequence
2. **Processes results** - Converts SQL result rows into import format with column mapping
3. **Formats data types** - Handles dates, decimals, UUIDs, and other data types appropriately
4. **Creates committed entities** - Imports results as fully committed entities using the import framework, each record in its own transaction
5. **Runs the update SQL** - After each record is saved, the Update SQL of Parameter 1 (when filled) runs on that record
6. **Handles errors** - Collects the import errors and, when there are any, ends the run with *Errors occurred: {0}*

The rows of all the statements are read in order as one import sheet: each statement's column names are the sheet's headings, so a column named `[:-record:<entity type>]` starts records of that type and `[:-detail:<grid>]` starts lines of a grid, joined to their record by the `#code` column. The headings follow the import file format described on [Anatomy of the Export File](/platform/import-export/export-file-format). Dates are passed in `dd-MM-yyyy` form.
Only one SQL importer flow runs at a time (this flow and the other SQL importer flows share the same lock).

## Parameters

**Parameter 1:** Update SQL (Optional) - SQL statement run after each imported record is saved, in the same transaction

**Parameter 2:** SQL Statement 1 (Required) - Main SQL query for entity import with column mapping

**Parameter 3:** SQL Statement 2 (Optional) - Additional SQL query for detail records or related data

**Parameter 4:** SQL Statement 3 (Optional) - Third SQL query for complex imports

**Parameter 5:** SQL Statement 4 (Optional) - Fourth SQL query for extended data processing

Parameters 6 to 15 have no title but are read the same way, as further SQL statements.

## SQL Query Format

### Entity Record Query
```sql
select 
  '' [:-record:PurchaseOrder],
  'PurchaseOrder$#PO' book,
  'PO'+CONVERT(NVARCHAR(10), GETDATE(), 112) code,
  'PurchaseOrder$#PO' term,
  getdate() valueDate
```

### Detail Record Query
```sql
select 
  '' [:-detail:details],
  'PO'+CONVERT(NVARCHAR(10), GETDATE(), 112) #code,
  i.code [details.item.itemCode],
  i.id [details.item.item],
  i.dfMinQuantity-sum(coalesce(q.net,0)) [details.quantity.quantity.primeQty.value],
  i.primBaseUnit_id [details.quantity.quantity.primeQty.uom] 
from InvItem i 
left join ItemDimensionsQty q on q.item_id = i.id 
where i.dfMinQuantity > 0
group by i.id,i.dfMinQuantity,primBaseUnit_id,i.code
having sum(coalesce(q.net,0))<i.dfMinQuantity
```

## Database Tables Affected

- **Entity Tables** - Creates new committed entities in target entity tables
- **Source Tables** - Reads data from tables specified in SQL queries
- **Import Framework Tables** - Uses import processing system for entity creation
- **Related Business Tables** - May trigger business logic affecting accounting, inventory, etc.

**Module:** core

**Full Class Name:** `com.namasoft.modules.commonbasic.importer.SQLImporter`

**Related Actions:**
- [SQLDraftImporter](SQLDraftImporter.md) - Creates draft entities for review before commitment
- [SQLImporterFromDifferentDataSource](SQLImporterFromDifferentDataSource.md) - Import committed entities from external database
- [SQLDraftImporterFromDifferentDataSource](SQLDraftImporterFromDifferentDataSource.md) - Import drafts from external database
- **SQLImporterConsideringApproval** - Same functionality as SQLImporter but considers approval status during import process


</div>