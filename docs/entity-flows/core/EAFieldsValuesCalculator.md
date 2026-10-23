---
title: EAFieldsValuesCalculator
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAFieldsValuesCalculator

## Overview

Performs bulk field assignments and calculations on entities using flexible mapping syntax. Supports field copying, static values, SQL calculations, and entity commands for data manipulation and automation.

Please review the page at [Field Values Calculator](../../entity-flows/core/ai-generated-field-maps-documentation.md)

## When This Action Runs

Manual execution or automated through entity flows for field value assignments, calculations, and data processing operations.

## How It Works

1. **Processes field mappings** defined in parameters sequentially
2. **Resolves value sources** from fields, static strings, or SQL queries
3. **Executes assignments** copying values to target fields
4. **Runs entity commands** like "edit" and "save" when specified

## Key Parameters

**Parameters 1-15:** Field Mapping Definitions (Optional) - Multi-line field mapping using `targetField=sourceValue` syntax

### Supported Syntax:
- **Field Copy:** `targetField=sourceField` or `warehouse=book.ref1`
- **Static Values:** `status="ACTIVE"` or `category="STANDARD"`
- **SQL Calculations:** `totalAmount=sql(SELECT SUM(amount) FROM Table WHERE id = {id})`
- **Reference Fields:** `customerName=customer.name` or `supplierCode=supplier.code`
- **Entity Commands:** `customer.runCommand="edit"`, `runCommand="save"` (saves directly, ignoring approval definitions) or `runCommand="saveConsideringApprovals"` (saves the way the screen does, sending the record to approval when an approval definition applies)

## Database Tables Affected

- **Target Entity** - Fields modified based on assignments
- **Related Entities** - Referenced entities may be updated via field assignments
- **Any Table** - SQL calculations can read from any accessible database table

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator`

</div>
