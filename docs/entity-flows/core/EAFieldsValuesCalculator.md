---
title: EAFieldsValuesCalculator
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAFieldsValuesCalculator

## Overview

Performs bulk field assignments and calculations on entities using flexible mapping syntax. Supports field copying, static values, SQL calculations, and entity commands for data manipulation and automation.

The full field map syntax is on [Field Maps in Nama ERP](/entity-flows/core/ai-generated-field-maps-documentation).

## When This Action Runs

Manual execution or automated through entity flows for field value assignments, calculations, and data processing operations.

## How It Works

1. **Processes field mappings** defined in parameters sequentially
2. **Resolves value sources** from fields, static strings, or SQL queries
3. **Executes assignments** copying values to target fields
4. **Runs entity commands** like "edit" and "save" when specified

## Key Parameters

**Parameters 1-15:** Field Mapping Definitions (Optional) - Multi-line field mapping using `targetField=sourceValue` syntax. The flow line shows the titles *First*, *Second*, *Third*, *Fourth* and *Fifth* above Parameters 1-5 and no title above Parameters 6-15; all fifteen are joined, in order, into one field map

### Supported Syntax:
- **Field Copy:** `targetField=sourceField` or `warehouse=book.ref1`
- **Static Values:** `description1="ACTIVE"` or `remarks="STANDARD"`
- **SQL Calculations:** `n1=sql(select max(n1) from InvItem where id <> {id})`
- **Reference Fields:** `description1=customer.name1` or `description2=supplier.code`
- **Entity Commands:** `customer.runCommand="edit"`, `runCommand="save"` (saves directly, ignoring approval definitions) or `runCommand="saveConsideringApprovals"` (saves the way the screen does, sending the record to approval when an approval definition applies)

## Database Tables Affected

- **Target Entity** - Fields modified based on assignments
- **Related Entities** - Referenced entities may be updated via field assignments
- **Any Table** - SQL calculations can read from any accessible database table

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator`

</div>
