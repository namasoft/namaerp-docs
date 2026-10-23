---
title: EAGenSalarySheet
module: hr
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAGenSalarySheet

## Overview

**Description:** Runs the salary sheet's **Generate Salary Documents** from an entity flow: it creates or refreshes one salary document for each employee line of the salary sheet the flow runs on. The three parameters are the three questions of that button's dialog. See [Salary Documents](../../modules/hr/payroll/salary-documents.md).

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.contracts.impl.actions.EAGenSalarySheet`

## Parameters

The **Title** column is the caption the entity flow line shows above each parameter after saving.

| Parameter | Title | What to enter |
|---|---|---|
| Parameter 1 | Lines to Generate GenerateSelectedLinesOnly, GenerateAllLinesExceptSelected, GenerateAllLines, default is GenerateAllLines | Which lines to process. `GenerateAllLines` (or empty): every line. `GenerateSelectedLinesOnly`: only the lines whose selection box is ticked on the saved sheet. `GenerateAllLinesExceptSelected`: only the lines whose box is not ticked. |
| Parameter 2 | ReGenerate Lines With Salaries (true or false) | `true`: lines that already have a salary document are generated again. Empty or `false`: they are left as they are. |
| Parameter 3 | Generate Lines Without Salaries (true or false)  - default is true | Empty or `true`: lines with no salary document yet get one. `false`: they are left without one. |

Whatever Parameter 2 says, a line whose salary document belongs to a different employee than the line is always generated again.

## How It Works

1. **Checks the sheet.** A sheet with **Revised** ticked is refused with *Can not regenerate revised salary sheet {0}*. While another salary sheet or salary document is being generated, the run is refused with *Can not do salary generation now for the document {0}, because the document {1} is being generated*.
2. **Queues instead of running** when the HR configuration has **Schedule Salary Documents/Sheets Regeneration By Regeneration Date And Time** ticked: the sheet is queued and the result shows *The document {0} is scheduled to be regenerated* (or *…is already scheduled…*). See [HR Configuration](../../modules/hr/setup/hr-configuration.md#Regenerating-salary-documents-and-sheets).
3. **Picks the lines** from Parameters 1-3, as in the table above.
4. **Generates the salary documents** in batches of employees, each batch in its own transaction. The batch size is **Concurrent Salary Docs In Generation** in the HR configuration (25 when empty). A failing batch stops the run; the batches before it stay generated.
5. **Saves the sheet** again: as final when it was already saved as final, otherwise as a draft.

::: tip Selected lines
`GenerateSelectedLinesOnly` and `GenerateAllLinesExceptSelected` read the ticks saved on the sheet. Tick the lines (or use **Select All** / **Deselect All**) and save the sheet before the flow runs.
:::

</div>