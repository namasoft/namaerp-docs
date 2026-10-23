---
title: EAIgnoringNotFoundTargetFieldsValuesCalculator
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAIgnoringNotFoundTargetFieldsValuesCalculator

## Overview

Works exactly like [EAFieldsValuesCalculator](EAFieldsValuesCalculator.md): it sets fields of the record being saved from a field map. The difference is what happens when the map hits an error, such as a field id that does not exist on the record: instead of stopping the save, the error is written to the server log and the save goes on.

## When This Action Runs

On any save event, when a field map is shared between record types that do not all have the same fields, or when a failing map must never block the save.

## How It Works

1. **Joins the parameters into one field map**, one parameter after the other, and applies its lines in order, exactly like [EAFieldsValuesCalculator](EAFieldsValuesCalculator.md).
2. **On an error, stops applying the map** and writes the error to the server log. The lines applied before the failing line keep their values; the lines after it are not applied.
3. **Lets the save continue** as if the flow had succeeded. A refusal the map returns as a message (rather than an error) still stops the save.

Because the map stops at the first error, put the lines that may fail last.

## Parameters

The **Title** column is the caption the entity flow line shows above each parameter after saving.

| Parameter | Title | What to enter |
|---|---|---|
| Parameter 1 | First | Lines of the [field map](ai-generated-field-maps-documentation.md), one `target field=value` per line. |
| Parameter 2 | Second | More field map lines, applied after those of Parameter 1. |
| Parameter 3 | Third | More field map lines. |
| Parameter 4 | Fourth | More field map lines. |
| Parameter 5 | Fifth | More field map lines. |
| Parameters 6-15 | (no title) | More field map lines. They work like Parameters 1-5 even though the screen shows no caption for them. |

## Database Tables Affected

- **The saved record** - the fields set by the map lines applied before any error
- **Referenced Data** - read by SQL expressions in the map

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAIgnoringNotFoundTargetFieldsValuesCalculator`

**Related Actions:**
- [EAFieldsValuesCalculator](EAFieldsValuesCalculator.md) - Standard field value calculator without error tolerance
- `EAAutomaticFieldsValuesCalculator` - Automatic field value calculation


</div>

