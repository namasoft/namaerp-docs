---
title: EACodeValidator
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACodeValidator

## Overview

Validates entity code fields against formatting rules including length limits, prefixes/suffixes, and regex patterns. Ensures consistent code formatting and prevents data entry errors.

## When This Action Runs

Entity validation during save operations to enforce consistent code formatting and prevent invalid codes.

## How It Works

1. **Validates length** against min/max limits
2. **Checks prefix/suffix** requirements (case-sensitive)
3. **Tests regex patterns** for complex format rules
4. **Reports errors** with specific validation failure messages

## Key Parameters

**Parameter 1:** Min Len,Max Len (Optional) - "MinLength,MaxLength" format (e.g., `3,10`). The maximum can be left out (`3`)

**Parameter 2:** Prefix,Suffix (Optional) - "Prefix,Suffix" format (e.g., `INV,_TEMP`). The suffix can be left out (`INV`)

**Parameter 3:** Regular Expression (Optional) - Regex pattern for complex validation. The code passes when the pattern is found anywhere in it, so start the pattern with `^` and end it with `$` to match the whole code

## Messages

The messages always say "Code", also when the flow is [EAAltCodeValidator](/entity-flows/core/EAAltCodeValidator).

| Message | Raised when |
|---|---|
| *Code length should be at least {0} characters* | The code is shorter than the minimum of Parameter 1 |
| *Code length should not exceed {0} characters* | The code is longer than the maximum of Parameter 1 |
| *Code must start with {0}* | The code does not start with the prefix of Parameter 2 |
| *Code must end with {0}* | The code does not end with the suffix of Parameter 2 |
| *Code does not match expression {0}* | The pattern of Parameter 3 is not found in the code |


## Database Tables Affected

- **Target Entity** - Reads code field for validation only

No database modifications - only validates data and prevents invalid saves.

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACodeValidator`

</div>

