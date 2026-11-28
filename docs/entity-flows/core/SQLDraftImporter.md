---
title: SQLDraftImporter
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# SQLDraftImporter

## Overview

Imports entities from SQL query results and saves them as draft records. Executes multiple SQL statements to fetch data, processes the results into entity format, and creates draft entities that require manual review before committing to final state.

## When This Action Runs

Manual execution for bulk data import from external sources, automated data migration, or creating draft entities for review before final processing. Commonly used for importing purchase orders, invoices, or other entities from external systems.

## How It Works

1. **Executes SQL queries** - Runs all provided SQL statements in sequence
2. **Processes results** - Converts SQL result rows into import format with column mapping
3. **Formats data types** - Handles dates, decimals, UUIDs, and other data types appropriately
4. **Creates draft entities** - Imports results as draft entities using the import framework
5. **Handles errors** - Collects and reports any import errors that occur

## Parameters

**Parameter 1:** Update SQL (Optional) - SQL statement run after each imported record is saved

**Parameter 2:** SQL Statement 1 (Required) - Main SQL query for entity import with column mapping

**Parameter 3:** SQL Statement 2 (Optional) - Additional SQL query for detail records or related data

**Parameter 4:** SQL Statement 3 (Optional) - Third SQL query for complex imports

**Parameter 5:** SQL Statement 4 (Optional) - Fourth SQL query for extended data processing

The statements, the column headings, the Update SQL and the error handling are those of [SQLImporter](/entity-flows/core/SQLImporter); this flow saves the imported records as drafts instead of saving them as final.

## Database Tables Affected

- **Entity Tables** - Creates new draft entities in target entity tables
- **Source Tables** - Reads data from tables specified in SQL queries
- **Import Framework Tables** - Uses import processing system for entity creation

**Module:** core

**Full Class Name:** `com.namasoft.modules.commonbasic.importer.SQLDraftImporter`

**Related Actions:**
- [SQLImporter](SQLImporter.md) - Creates committed entities instead of drafts
- [SQLDraftImporterFromDifferentDataSource](SQLDraftImporterFromDifferentDataSource.md) - Import from external database
- [SQLImporterFromDifferentDataSource](SQLImporterFromDifferentDataSource.md) - Import committed entities from external database


</div>