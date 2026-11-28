---
title: EAGenerateEntityFromEntityAction
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityAction

## Overview

Creates new entities from existing entities with full database commitment. Core action for most document generation workflows providing field mapping, conditional processing, and automatic persistence.

The field map syntax used by Parameters 3 and 5 is on [Field Maps in Nama ERP](/entity-flows/core/ai-generated-field-maps-documentation).

This page is the reference for the whole family of generation flows: they share the steps and the parameters below and differ only in how the target is saved and whether it is flushed (see [The Generation Flows](#The-Generation-Flows)).

## When This Action Runs

Manual execution or automated through entity flows requiring full document generation with immediate commitment.

## How It Works

1. **Checks Run Only If** (Parameter 10): when its value is empty or zero, nothing is generated.
2. **Checks the Apply When query** (Parameter 8): when it returns 0, that run is skipped.
3. **Finds the target** with the finder SQL (Parameter 2); only the first row is used. When it finds none, a new record of the target type (Parameter 1) is created, unless Update Only is `true`; when it finds one and Insert Only is `true`, nothing happens.
4. **Copies the common data** (dimensions, and for documents the shared document data) from the record running the flow, then applies the field map (Parameter 3). A document target with no code gets one from its book.
5. **Saves the target as final**, without consulting approval definitions.
6. **Applies the inverse copy** (Parameter 5) to the record running the flow.
7. **Flushes** — the generated record is written to the database straight away, so SQL queries run later in the same save (for example the finder SQL of another flow line) find it.

With Parameter 6 the steps run once per line of the named grid; with Parameter 9, once per group of lines.

## The Generation Flows

| Flow | How the target is saved (step 5) | Flush (step 7) |
|---|---|---|
| EAGenerateEntityFromEntityAction | As final, without consulting approval definitions | Yes |
| [EAGenerateEntityFromEntityActionNoFlush](/entity-flows/core/EAGenerateEntityFromEntityActionNoFlush) | As final, without consulting approval definitions | No |
| [EAGenerateEntityFromEntityActionWithApproval](/entity-flows/core/EAGenerateEntityFromEntityActionWithApproval) | The way the screen does: when an approval definition applies, it is sent for approval instead of being saved as final | Yes |
| [EAGenerateEntityFromEntityActionNoFlushWithApproval](/entity-flows/core/EAGenerateEntityFromEntityActionNoFlushWithApproval) | The way the screen does, with approvals | No |
| [EAGenerateDraftEntityFromEntityAction](/entity-flows/core/EAGenerateDraftEntityFromEntityAction) | As a draft. A target that was already saved as final once is saved as final again | Yes |
| [EAGenerateDraftEntityFromEntityActionNoFlush](/entity-flows/core/EAGenerateDraftEntityFromEntityActionNoFlush) | As a draft, same rule | No |
| [EAAutomaticGenerateEntityFromEntityAction](/entity-flows/core/EAAutomaticGenerateEntityFromEntityAction) | As final, on Post Commit only; on Post Delete it deletes the record the finder SQL returns | Yes |
| [EAAutomaticGenerateEntityFromEntityActionWithApproval](/entity-flows/core/EAAutomaticGenerateEntityFromEntityActionWithApproval) | The way the screen does, with approvals, on Post Commit only; deletes on Post Delete | Yes |

Without a flush the generated record is written to the database together with the rest of the save that ran the flow, not straight after it is generated. Until then a SQL query run later in the same save (for example the finder SQL of another flow line) does not see it.

## Key Parameters

The **Title** column is the caption the entity flow line shows above each parameter after saving.

Parameters 1 and 2 must be filled, and Parameters 4 and 7 accept only `true`, `false` or empty; the
entity flow is refused on save otherwise.

| Parameter | Title | What to enter |
|---|---|---|
| Parameter 1 | Target Type | The entity type to create or update, for example `CreditNote`. |
| Parameter 2 | Finder SQL. eg: select id from CreditNote where ref5Id={id} | A query returning the id of an existing record of the target type. When it finds one, that record is updated; when it finds none, a new one is created. |
| Parameter 3 | Field Map. eg: code=code fromDoc=$this ref5=$this | The [field map](/entity-flows/core/ai-generated-field-maps-documentation) from the record running the flow to the target, one `target field=value` per line. |
| Parameter 4 | Update Only(true,false) | `true`: when Parameter 2 finds nothing, nothing is created. |
| Parameter 5 | Inverse Copy (Copy Fields from Generated to Generator). Example: ref5=$this description5=n1 | A field map applied the other way after the target is saved: the left side is a field of the record running the flow, the right side is read from the target. `ref5=$this` stores the target in `ref5`. |
| Parameter 6 | Run Entity Flow Per Each Line. eg: details | The id of a grid. The generation then runs once per line of that grid, and `$line` / `{line.…}` refer to the current line. |
| Parameter 7 | Insert Only(true,false) | `true`: when Parameter 2 finds a record, it is left unchanged and nothing is created. |
| Parameter 8 | Apply When Query (Used primarily for 'Per Each Line'). eg: select case when {line.item.item.itemType} = 'Service' then 1 else 0 end | A query; when it returns 0, that run is skipped. With Parameter 6 it is checked for every line. |
| Parameter 9 | Group Details By (Please review samples doc) | A line field written as `grid.field`, for example `details.item.item`. The generation runs once per distinct value of that field, and during each run the grid holds only the lines of that group, so one target is generated per group. A header field is refused with *The field {0} is a header field not a details field*. |
| Parameter 10 | Run Only If number greater not zero eg: totlaizesql(select case when {details.item.item.code} in ('a','b','c') then 1 else 0 end) | A value read from the record running the flow (a field id or an expression); when it is empty or zero, nothing is generated. The keyword for summing a query over the lines is `totalizesql(...)`. |

## Database Tables Affected

- **Target Entity Table** - Creates/updates records with full commitment
- **Source Entity Table** - May update via inverse copy configuration  
- **Detail Collections** - Generates detail lines based on source collections
- **Related Tables** - Updates cross-references and relationships

## Example for creating delivery documents from FormDoc1 per line

```json
{
  "targetType": "FormDoc2",
  "details": [
    {
      "className": "com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction",
      "parameter1": "DeliveryDocument",
      "parameter2": "select id from DeliveryDocument where id={line.ref5.id}",
      "parameter3": "ref1=$line.relatedEntity1\nfromDoc=$line.relatedEntity2\nbook='DD'\nterm='DD'\nvalueDate=valueDate\nlegalEntity=$target.book.legalEntity\nbranch=$target.book.branch\ndepartment=$target.book.department\nsector=$target.book.sector\nanalysisSet=$target.book.analysisSet\ndriver=$target.ref1\ndelivStatus='Delivering'",
      "parameter5": "$line.ref5=$this",
      "parameter6": "details",
      "parameter8": "select case when {currentLine.relatedEntity2.$toReal.delivStatus} in ('' , 'NotDelivered') and {line.relatedEntity2.$toReal.sector.code} = '1' then 1 else 0 end",
      "targetAction": "PostCommit"
    }
  ]
}
```

## Related Actions

- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md)
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction`

</div>