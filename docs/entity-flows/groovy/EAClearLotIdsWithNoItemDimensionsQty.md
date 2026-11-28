---
title: Clear Lots That Were Never Received, and Unused Dimensions
module: supplychain
entities: [EntityFlow]
groovy: recommended
description: A Groovy script that clears, on every document line, the dimensions the item does not use and any lot the item has never had stock of.
---

<div class='entity-flows'>

# Clear Lots That Were Never Received, and Unused Dimensions

This Groovy script tidies the dimensions on a document's lines before the document is saved. It clears every dimension that the line's item does not use, and it clears any lot that the item has never had stock of in any warehouse.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters: attach it and it works.
:::

| | |
|---|---|
| **Class name** | `EAClearLotIdsWithNoItemDimensionsQty` |
| **Script** | [EAClearLotIdsWithNoItemDimensionsQty.groovy](/groovy-examples/EAClearLotIdsWithNoItemDimensionsQty.groovy) |
| **Runs on** | Supply chain documents that take stock out, such as a stock issue, a sales invoice or a stock transfer. Target action **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Lines often arrive with dimensions that do not belong on them: a document is copied from another one, a line is imported from a spreadsheet, or the item was changed on a line after the lot had been typed. The save then stops because the lot is not found for the item, and the user has to find and clear the offending cell by hand.

This script does that cleaning for them. After it runs, a lot remains on a line only if the item really has stock records for that lot. The line is left with an empty lot, which the user, or a lot-picking flow that runs after this one, can then fill correctly.

::: warning Not for documents that bring new lots in
A stock receipt or a purchase invoice usually introduces a lot for the first time. That lot has no stock yet, so this script would clear it. Attach the script only to documents that take existing stock out.
:::

## How it works

1. **It clears the dimensions the item does not use.** For each line with an item:
   - when the item has **Has Lot** off, the **Lot ID** is cleared together with the line's **Expiry Date**, **Production Date** and retest date;
   - otherwise, when the item has **Has Expiry** off, only the **Expiry Date** is cleared;
   - when the item has **Has Serial** off, the **Serial Number** is cleared;
   - when the item has **Has Two Serials** off, the **Second Serial** is cleared.
2. **It checks the remaining lots in one go.** Lines of lot-tracked items that still have a lot are collected, and the system's stock records are searched once for all their item and lot pairs together. The warehouse does not matter: the lot only has to exist for that item somewhere.
3. **It clears the lots that are not found.** A line whose item and lot pair has no stock record loses its lot and the three dates. The comparison ignores letter case and leading or trailing spaces, so `test-a ` on the line matches a lot saved as `TEST-A`.

The script never refuses the save. It only clears fields.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document to clean (for example **Stock Issue**).
2. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Leave all parameters empty, and save the flow.

The script also runs when a document is saved as a draft.

## Example

Item `RAW0033` is lot tracked and has stock in lot `TEST-A`. A stock issue has three lines:

| Line | Item | Lot ID | Serial Number | After saving |
|---|---|---|---|---|
| 1 | `RAW0033` | `test-a ` | | Kept: it matches `TEST-A`. |
| 2 | `RAW0033` | `NEVER-RECEIVED` | | Lot cleared: the item never had stock in it. |
| 3 | an item without lots or serials | `STRAY` | `SN1` | Lot and serial number cleared. |

## The script

<<< @/public/groovy-examples/EAClearLotIdsWithNoItemDimensionsQty.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Understanding Inventory Items](/modules/supplychain/understanding-items#Tracking-Special-Attributes): the item options that switch each dimension on.

</div>
