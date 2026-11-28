---
title: EAAltCodeValidator
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAAltCodeValidator

## Overview

Validates the alternative code (`altCode`) field of entities to ensure they follow specific formatting requirements. Enforces length constraints, prefix/suffix requirements, and regular expression patterns.

## When This Action Runs

During entity save operations to validate the altCode field against specified formatting rules. Consider using the field format grid in Fields and Entities Settings for simpler cases.

## How It Works

1. Reads the record's alternative code
2. Validates length against minimum/maximum constraints
3. Checks prefix/suffix requirements if specified
4. Tests against regular expression pattern if provided

The parameters, their rules and the messages are those of [EACodeValidator](/entity-flows/core/EACodeValidator), applied to the alternative code instead of the code.

## Key Parameters

- **Parameter 1:** Min Len,Max Len - Format: "minimum,maximum" (e.g., "3,10")
- **Parameter 2:** Prefix,Suffix - Format: "prefix,suffix" (e.g., "ALT,_V1")
- **Parameter 3:** Regular Expression - Valid regex pattern for complex formatting

### Parameter Examples:
```
Length: "5,12" - Between 5 and 12 characters
Prefix/Suffix: "CUST,_V1" - Must start with CUST and end with _V1
Regex: "^[A-Z]{3}[0-9]{4}$" - Three letters followed by four digits
```

## Database Tables Affected

Any entity with altCode field being validated. Common entities include Customer, Supplier, InvItem, Account, and various document types.

## Related Actions

- [EACodeValidator](EACodeValidator.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAltCodeValidator`

</div>

