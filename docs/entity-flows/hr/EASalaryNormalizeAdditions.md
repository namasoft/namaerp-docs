---
title: EASalaryNormalizeAdditions
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASalaryNormalizeAdditions

## Overview

Sets the base value of a target salary component from the net of a list of component types: the total of their additions minus their deductions, taken as an absolute value and capped at the target component's original value.

## When This Action Runs

Runs on a salary document, typically used to adjust a component like basic salary or an allowance from the balance of other components.

## How It Works

1. **Calculates net total** - Computes the sum of (additions - deductions) for specified component types
2. **Finds target component** - Locates the first salary line whose component type has the target code; when there is none, no line is changed
3. **Adjusts base value** - Sets the target component's base value to the minimum of the net total's absolute value and the line's original value
4. **Updates calculations** - Recalculates the line's addition/deduction amounts
5. **Refreshes totals** - Updates overall salary document totals after normalization

When Parameter 1 or Parameter 2 is empty, the flow fails with *You must specify parameters 1 and 2 for entity flow {0}*.

## Parameters

**Parameter 1:** Target Component Type (Required) - Code of the salary component type to adjust (e.g., "basic", "allowance")

**Parameter 2:** Components To Normalize (Required) - Comma-separated list of component type codes to include in balance calculation

## Database Tables Affected

- **SalaryDocumentLine** - Updates base value and recalculates addition/deduction amounts for target component
- **SalaryDocument** - Updates total amounts after component normalization

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.clientscripts.EASalaryNormalizeAdditions`

**Related Actions:**
- [EASalaryNormalizeDeductions](EASalaryNormalizeDeductions.md) - Takes the same two parameters and applies the same calculation


</div>