---
title: CalcBasicSalaryForNetSalary
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# CalcBasicSalaryForNetSalary

## Overview

Reverse-calculates the basic salary component needed to achieve a desired net salary amount. Uses iterative calculations to determine the basic salary that, after all deductions and additions, results in the target net salary.

## When This Action Runs

Manual execution when determining basic salary components to achieve specific net salary targets, typically used for contract negotiations or salary planning where the net amount is fixed.

## How It Works

1. **Validates target amount** - Checks that required net salary (N1) is specified and non-zero
2. **Adjusts for additional amount** - Subtracts N2 value from target net to get working target
3. **Initializes iteration** - Sets first salary line base value to the working target amount
4. **Iterative calculation** - Repeatedly calculates salary with current basic amount
5. **Adjusts basic salary** - Modifies basic component based on difference between actual and target net
6. **Convergence check** - Continues until difference is within acceptable threshold or max trials reached
7. **Sets result** - Stores final calculated basic salary plus N2 in N3 field

## Parameters

**Parameter 1:** Max Number of Trials (Required) - Maximum iterations for convergence, for example `25`. When it is empty, the action does nothing

**Parameter 2:** Minimum Accepted Difference (Optional) - Acceptable difference between target and actual net salary (default: 0.01)

## Field Usage

- **N1** - Target net salary amount (required input)
- **N2** - Additional amount to subtract from target before calculation
- **N3** - Final calculated total salary (output: basic salary + N2)

## Database Tables Affected

- **SalaryDocumentLine** - Updates base value and original value for the first salary line (basic component)
- **SalaryDocument** - Reads employee, period, and date information for salary calculations
- **Employee Attendance Data** - Accessed during salary calculation iterations

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.CalcBasicSalaryForNetSalary`

**Reference:** Related to ticket ECDRQ00114 for specific implementation requirements


</div>