---
title: SQLImporterFromDifferentDataSource
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# SQLImporterFromDifferentDataSource

## Overview

Imports entities from SQL queries executed against external databases and saves them as committed records immediately. Connects to different data sources (external databases) to fetch data, processes the results into entity format, and creates fully committed entities directly in production.

## When This Action Runs

Manual execution for importing production data from external systems, automated data synchronization between databases, or creating committed entities from trusted remote data sources without manual review.

## How It Works

1. **Connects to external database** - Establishes connection to specified data source
2. **Executes SQL queries** - Runs all provided SQL statements against the external database
3. **Processes results** - Converts SQL result rows into import format with column mapping
4. **Formats data types** - Handles dates, decimals, UUIDs appropriately for the target system
5. **Creates committed entities** - Imports results as fully committed entities using the import framework
6. **Restores connection** - Returns to original database connection after processing

## Parameters

**Parameter 1:** Update SQL (Optional) - SQL statement run after each imported record is saved

**Parameter 2:** Data Source Name (Required) - External database connection name (must be defined in context.xml)

**Parameter 3:** SQL Statement 1 (Required) - Main SQL query for entity import with column mapping

**Parameter 4:** SQL Statement 2 (Optional) - Additional SQL query for detail records or related data

**Parameter 5:** SQL Statement 3 (Optional) - Third SQL query for complex imports

The statements, the column headings, the Update SQL and the error handling are those of [SQLImporter](/entity-flows/core/SQLImporter). Here the SQL statements start at Parameter 3, and both the statements and the Update SQL run on the data source of Parameter 2. Parameters 6 to 15 have no title but are read as further SQL statements.

## Database Tables Affected

- **External Database Tables** - Reads data from tables in the specified external data source
- **Entity Tables** - Creates new committed entities in target entity tables
- **Import Framework Tables** - Uses import processing system for entity creation
- **Related Business Tables** - May trigger business logic affecting accounting, inventory, etc.

**Module:** core

**Full Class Name:** `com.namasoft.modules.commonbasic.importer.SQLImporterFromDifferentDataSource`

**Related Actions:**
- [SQLDraftImporterFromDifferentDataSource](SQLDraftImporterFromDifferentDataSource.md) - Import drafts from external database for review
- [SQLImporter](SQLImporter.md) - Import committed entities from main database
- [SQLDraftImporter](SQLDraftImporter.md) - Import drafts from main database


</div>