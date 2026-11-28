---
title: EALiptisSetComponentFromAnotherWithMax
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EALiptisSetComponentFromAnotherWithMax

## Overview

Sets a target salary component value based on the total of other components, with a maximum limit from the component's original value. Calculates the sum of specified salary components and applies it to the target component, ensuring it doesn't exceed the original configured amount.

## When This Action Runs

Manual execution during salary processing when you need to set a component value based on other components' totals. Typically used for calculating allowances, bonuses, or deductions that depend on other salary elements but have maximum limits.

## How It Works

1. **Validates parameters** - Ensures both required parameters are provided
2. **Parses component list** - Converts CSV parameter into list of component type codes to sum
3. **Calculates total** - Sums additions minus deductions for all salary lines whose component type is in the list
4. **Finds target component** - Locates the first salary line whose component type has the target code
5. **Applies maximum limit** - Sets value to the lesser of the calculated total (as an absolute value) or original value
6. **Handles zero totals** - Uses original value if calculated total is zero
7. **Updates calculations** - Recalculates addition/deduction amounts and salary totals

## Parameters

**Parameter 1:** Target Component Type (Required) - Code of the salary component type to update

**Parameter 2:** Components To Normalize (Required) - Comma-separated list of component type codes to sum (e.g., "basic,insurance")

## Database Tables Affected

- **SalaryDocumentLine** - Updates base value for the target component
- **SalaryDocument** - Updates total calculations after component modification

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.clientscripts.EALiptisSetComponentFromAnotherWithMax`


</div>