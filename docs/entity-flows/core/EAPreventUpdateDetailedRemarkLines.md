---
title: EAPreventUpdateDetailedRemarkLines
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAPreventUpdateDetailedRemarkLines

## Overview

Prevents updates to existing detailed remark lines while preserving the ability to add new lines. For committed entities, it preserves all original data and only appends new lines with proper timestamp and user tracking.

## When This Action Runs

Automatic execution during detailed remark entity save operations to maintain data integrity and audit trail for remark modifications.

## How It Works

1. **Validates entity state** - Only processes entities that have been committed before
2. **Compares line collections** - Identifies new lines by comparing current and old details collections using line IDs
3. **Preserves original data** - Restores all header fields from old data (code, names, remarks, dates, related entities)
4. **Processes line collections** - Combines old lines (unchanged) with new lines (with current date/user)
5. **Sets audit fields** - Assigns current date and employee to new lines for tracking

## Parameters

**No Parameters Required** - The flow line needs no parameter.

## Database Tables Affected

The flow is meant for the remark screens that have a `details` grid of remark lines, such as **Detailed Remark**, **Remark**, **Meeting Remark** and **Employee Agenda**.

- **Remark header** - Restores original header field values from old data
- **Remark lines (`details`)** - Puts back existing lines exactly as they were (a changed or deleted line returns to its saved version) and appends new lines with audit information
- **Employee Reference** - Sets current employee on new lines for user tracking

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventUpdateDetailedRemarkLines`


</div>
