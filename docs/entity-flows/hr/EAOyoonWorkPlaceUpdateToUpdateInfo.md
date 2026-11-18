---
title: EAOyoonWorkPlaceUpdateToUpdateInfo
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAOyoonWorkPlaceUpdateToUpdateInfo

## Overview

Automatically generates or updates employee information update documents when workplace changes are committed or deleted. Creates one UpdateEmployeeInfo document for each workplace update line, maintaining employee workplace history through the standard employee update process.

## When This Action Runs

**Automatic execution** on:
- Post-commit of WorkPlaceUpdate documents
- Post-delete of WorkPlaceUpdate documents

This action runs automatically and cannot be disabled.

## How It Works

1. **Processes each workplace update line** - Iterates through all detail lines in the workplace update document
2. **Finds or creates UpdateEmployeeInfo** - Searches for existing update document or creates new one
3. **Copies field values** - Transfers data from workplace update using field mapping in Parameter 1
4. **Sets employee information** - Links to employee and sets effective date from line
5. **Retrieves current employee info** - Gets employee's information as of day before change date
6. **Updates workplace** - Sets new workplace in the target employee information
7. **Applies field mappings** - Uses Parameter 2 to map additional fields
8. **Commits update documents** - Saves all generated UpdateEmployeeInfo documents
9. **Cleans up orphaned documents** - Deletes any UpdateEmployeeInfo documents no longer needed

## Parameters

**Parameter 1:** Fields Initializer - Field assignments for the generated document
Example:
```fieldmap
book="UPDT"
term="UPDTERM"
```

**Parameter 2:** UpdateEmployeeInfo fields Map - Additional field mappings
Example:
```fieldmap
branch=toInfo.empWorkPlace.branch
```

## Database Tables Affected

- **UpdateEmployeeInfo** - Creates/updates/deletes employee update documents
- **WorkPlaceUpdateLine** - Reads workplace change details (read-only)
- **EmployeeHRInfo** - Retrieves current employee HR information
- **HRPeriod** - Determines appropriate HR period for the update

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAOyoonWorkPlaceUpdateToUpdateInfo`


</div>

