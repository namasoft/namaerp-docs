---
title: EAGenerateEntityFromEntityActionNoFlushWithApproval
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityActionNoFlushWithApproval

## Overview

Combines entity generation with approval workflow integration but without immediate database flush for batch processing optimization.

Please review the page at [Field Values Calculator](../../entity-flows/core/ai-generated-field-maps-documentation.md)

## When This Action Runs

Like the no-flush version, when the generated records must go through their approval definitions.

## How It Works

1. **Finds the target** with the finder SQL (Parameter 2). When it finds none, a new record of the target type (Parameter 1) is created, unless Update Only is `true`; when it finds one and Insert Only is `true`, nothing happens.
2. **Copies the common data** (dimensions, and for documents the shared document data) from the record running the flow, then applies the field map (Parameter 3).
3. **Saves the target the way the screen does**: when an approval definition applies to it, it is sent for approval instead of being saved as final.
4. **Applies the inverse copy** (Parameter 5) to the record running the flow.
5. **Does not flush** — the generated record is written to the database together with the rest of the save that ran the flow, not straight after it is generated. Until then a SQL query run later in the same save (for example the finder SQL of another flow line) does not see it. When a later line must find it, use the flushing version.

With Parameter 6 the steps run once per line of the named grid; with Parameter 9, once per group of lines.

## Parameters

The **Title** column is the caption the entity flow line shows above each parameter after saving.
Parameters 1 and 2 must be filled, and Parameters 4 and 7 accept only `true`, `false` or empty; the
entity flow is refused on save otherwise.

| Parameter | Title | What to enter |
|---|---|---|
| Parameter 1 | Target Type | The entity type to create or update, for example `CreditNote`. |
| Parameter 2 | Finder SQL. eg: select id from CreditNote where ref5Id={id} | A query returning the id of an existing record of the target type. When it finds one, that record is updated; when it finds none, a new one is created. |
| Parameter 3 | Field Map. eg: code=code fromDoc=$this ref5=$this | The [field map](ai-generated-field-maps-documentation.md) from the record running the flow to the target, one `target field=value` per line. |
| Parameter 4 | Update Only(true,false) | `true`: when Parameter 2 finds nothing, nothing is created. |
| Parameter 5 | Inverse Copy (Copy Fields from Generated to Generator). Example: ref5=$this description5=n1 | A field map applied the other way after the target is saved: the left side is a field of the record running the flow, the right side is read from the target. `ref5=$this` stores the target in `ref5`. |
| Parameter 6 | Run Entity Flow Per Each Line. eg: details | The id of a grid. The generation then runs once per line of that grid, and `$line` / `{line.…}` refer to the current line. |
| Parameter 7 | Insert Only(true,false) | `true`: when Parameter 2 finds a record, it is left unchanged and nothing is created. |
| Parameter 8 | Apply When Query (Used primarily for 'Per Each Line'). eg: select case when {line.item.item.itemType} = 'Service' then 1 else 0 end | A query; when it does not match (returns 0 or nothing), that run is skipped. With Parameter 6 it is checked for every line. |
| Parameter 9 | Group Details By (Please review samples doc) | A line field written as `grid.field`, for example `details.item.item`. The generation runs once per distinct value of that field, and during each run the grid holds only the lines of that group, so one target is generated per group. A header field is refused with *The field {0} is a header field not a details field*. |
| Parameter 10 | Run Only If number greater not zero eg: totlaizesql(select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end) | A value read from the record running the flow (a field id or an expression); when it is empty or zero, nothing is generated. The keyword for summing a query over the lines is `totalizesql(...)`. |

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityActionNoFlushWithApproval`

**Related Actions:**
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md) - Standard entity generation without flush
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md) - Entity generation with approval and auto-flush
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md) - Automatic entity generation
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md) - Automatic generation with approval
- [EAGenerateDraftEntityFromEntityActionNoFlush](EAGenerateDraftEntityFromEntityActionNoFlush.md) - Draft generation without flush
- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md) - Draft entity generation


</div>