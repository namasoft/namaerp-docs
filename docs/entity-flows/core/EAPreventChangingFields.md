---
title: EAPreventChangingFields
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAPreventChangingFields

## Overview

Enforces field-level data integrity by preventing unauthorized changes to specified header and detail fields, with optional line addition/deletion protection and conditional SQL logic support.

## When This Action Runs

Data integrity validation during entity save/commit operations for previously committed entities requiring field-level change protection.

## How It Works

1. **Validates entity state** (only applies to previously committed entities)
2. **Processes field configuration** from comma/line-separated field ID lists
3. **Compares header fields** between old and new entity data
4. **Validates detail collections** for line additions, deletions, and field changes
5. **Applies conditional SQL logic** for complex business rules when configured


## Parameters

**Parameter 1:** Field IDs (Required)
- Comma/line-separated field IDs to protect
- Examples: `code,name1` or `details.n1`

**Parameter 2:** Prevent Adding New Lines (Optional)
- Boolean value: `true` or `false`
- Prevents adding new detail lines (default: `false`)

**Parameter 3:** Prevent Deleting Lines (Optional)
- Boolean value: `true` or `false`
- Prevents deleting detail lines (default: `false`)

**Parameter 4:** Change Validation Query (Optional)
- SQL query returning 1 (enable validation) or 0 (disable validation)
- Conditionally enables field change validation for current line
- Example: `select case when {line.item.item.code} = 'ABC' or {oldLine.item.item.code} = 'ABC' then 1 else 0 end`
- Available variables: `{line.*}` for new values, `{oldLine.*}` for previous values

**Parameter 5:** Added Lines Validation Query (Optional)
- SQL query returning 1 (enable validation) or 0 (disable validation)
- Conditionally validates newly added lines
- Example: `select case when {currentLine.n1} > 0 then 1 else 0 end`
- Use `{currentLine.*}` to access the added line fields

**Parameter 6:** Deleted Lines Validation Query (Optional)
- SQL query returning 1 (enable validation) or 0 (disable validation)
- Conditionally validates deleted lines
- **Important:** Use `{currentLine.*}` to access deleted line data, NOT the detail field name
- Example: `select case when {currentLine.n1} > 0 then 1 else 0 end`
- Access deleted line fields via `{currentLine.*}` pattern

Parameters 2 and 3 protect only the tables that have at least one field listed in Parameter 1: to stop lines being added to or removed from `details`, Parameter 1 must name a `details.` field. Parameter 5 is read only when Parameter 2 is `true`, and Parameter 6 only when Parameter 3 is `true`. On the entity flow line the titles of Parameters 4, 5 and 6 begin *SQL Query to enable or disable CHANGE VALIDATION for current line*, *SQL Query to enable or disable ADDED LINES VALIDATION for current line* and *SQL Query to enable or disable DELETED LINES VALIDATION for current line*.

## Messages you may see

| Message | Why |
|---|---|
| *Field ({0}) Value changed from {1} to {2}* — «لقد تغيرت قيمة الحقل ({0}) من {1} إلى {2}» | A protected header field was changed |
| *Field ({0}) Value changed from {1} to {2} line number {3} in grid ({4})* — «لقد تغيرت قيمة الحقل ({0}) من {1} إلى {2} في السطر رقم {3} في الجدول ({4})» | A protected line field was changed on an existing line |
| *The line at {0} in the table ({1}) was added, this is not permitted* — «لقد تم إضافة السطر رقم {0} في الجدول ({1}) و هذا غير مسموح به» | A line was added while Parameter 2 is `true` |
| *The line that was at {0} in the table ({1}) was removed, this is not permitted* — «السطر الذي كان رقمه {0} تم حذفه من الجدول ({1}) و هذا غير مسموح به» | A line was removed while Parameter 3 is `true` |

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventChangingFields`


</div>