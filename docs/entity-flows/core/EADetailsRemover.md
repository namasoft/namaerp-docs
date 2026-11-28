---
title: EADetailsRemover
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EADetailsRemover

## Overview

Removes specific lines from document detail collections based on query conditions or predefined criteria for selective cleanup of detail records.

## When This Action Runs

Manual or automated execution during document processing for detail line cleanup and validation.

## How It Works

1. **Validates parameters:** an empty Parameter 1 fails with *You must specify detail name*; empty Parameters 2 and 3 together fail with *You must at least specify one of query or criteria code*
2. **Evaluates detail lines** using the query, then the criteria definition when both are given
3. **Collects matching indices** of lines to remove
4. **Removes lines safely** from highest index to lowest

## Parameters

**Parameter 1:** Detail ID. eg: lines (Required) - Id of the table (detail) to remove lines from (e.g., `lines`, `details`)

**Parameter 2:** Query (Optional) - Title: *Query, Example: select case when {lines.account.id} is null then 1 else 0 end*. A query run once per line; a line is removed when the query returns a value other than 0 for it; a line for which it returns no row is kept (use {collection.field} syntax)

**Parameter 3:** Criteria Definition Code (Must be on details) (Optional) - Code of a criteria definition whose conditions are on the lines; the lines that match it are removed

*Note: Must provide either Query or Criteria Definition Code*

## Database Tables Affected

- **Document Detail Collections** - In-memory modification of specified detail collection
- **CriteriaDefinition** - Read-only access when using criteria-based selection

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADetailsRemover`


</div>