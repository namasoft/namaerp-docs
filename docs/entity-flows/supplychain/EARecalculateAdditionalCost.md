---
title: EARecalculateAdditionalCost
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARecalculateAdditionalCost

## Overview

Recalculates the additional cost lines of an assembly document from their expense items. For each additional cost line that has an expense item, it takes the value per unit and total again from the matching line of that expense item.

## When This Action Runs

Manual execution on assembly documents when additional costs need to be recalculated, typically after changes to assembly configuration, cost structures, expense rates, or when expense calculations appear incorrect.

## How It Works

1. **Goes through the additional cost lines** - Takes every additional cost line of the assembly document that has an expense item; lines without one are left as they are
2. **Resets the line** - Sets value per unit, total and total units of the line to zero
3. **Finds the matching expense item line** - Takes the first line of the expense item that is valid on the document's value date. A line with no "calculate from" grid matches directly; otherwise it must match one of the items of the component lines or of the co-product lines (by item, brand, section, categories and item classes) and its quantity range
4. **Updates the line** - When a match is found, copies its value per unit and total, and the account, subsidiary and credit side of the expense item, clears the four taxes of the line, fills total units when the expense item line asks for it, and recalculates the total from the value per unit
5. **Returns success** - Always completes successfully after calculation

## Parameters

This action does not require any parameters - it automatically recalculates all additional costs in the assembly document.

## Database Tables Affected

- **Assembly Document Additional Cost Lines** - Updates value per unit, total, total units and account data
- **Expense Item Masters** - Reads expense item definitions (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalculateAdditionalCost`

**Document Type:** Assembly Documents Only



</div>

