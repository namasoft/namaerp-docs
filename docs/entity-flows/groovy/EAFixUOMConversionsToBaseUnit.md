---
title: Rewrite an Item's Unit Conversions to the Base Unit
module: supplychain
entities: [EntityFlow, InvItem]
groovy: recommended
description: A Groovy script that rewrites an item's chained unit conversions, such as 1 Pallet = 50 Carton, as direct conversions to the base unit, such as 1 Pallet = 1200 Piece.
---

<div class='entity-flows'>

# Rewrite an Item's Unit Conversions to the Base Unit

This Groovy script lets users enter an **Item**'s unit conversions the way they think about them, unit by unit, and rewrites them on save into the form the system needs: every unit converted directly to the base unit.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is; it takes no parameters.
:::

| | |
|---|---|
| **Class name** | `EAFixUOMConversionsToBaseUnit` |
| **Script** | [EAFixUOMConversionsToBaseUnit.groovy](/groovy-examples/EAFixUOMConversionsToBaseUnit.groovy) |
| **Runs on** | Item, on the **Pre Update Calculated Fields** event |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

An item sold by the piece, packed 24 to a carton and 50 cartons to a pallet, is naturally described as:

| X of | Unit | Equal Y of | Unit |
|---|---|---|---|
| 1 | Carton | 24 | Piece |
| 1 | Pallet | 50 | Carton |

The system does not accept the second line. As [Units of Measure](/modules/supplychain/units-of-measure) explains, every unit must reach the base unit directly, because the system never multiplies one rate by another. The user has to work out that a pallet is 1200 pieces and type that instead, and items with several packing levels are where the arithmetic goes wrong.

With this script, the user types the chain and the script does the multiplication when the item is saved.

## How it works

1. When the item is saved, the script looks at every line of the **Conversions** grid whose target unit (the unit after **Equal Y of**) is not the item's **Base Unit (Smallest)**.
2. For each such line it looks for another line that converts that target unit to the base unit. For `1 Pallet = 50 Carton`, that is `1 Carton = 24 Piece`.
3. If it finds one, it rewrites the line to the base unit and multiplies the quantities: `1 Pallet = 50 × 24 ÷ 1 = 1200 Piece`.
4. If it finds none, the line is left as it is, and the system's normal check applies to it.

The script runs on **Pre Update Calculated Fields**, before the system computes and checks the item's conversions, so the item is saved with the rewritten lines.

::: info Longer chains may need a second save
Each line is rewritten through a line that reaches the base unit at that moment. In a chain of three levels, such as `Pallet → Carton → Box → Piece`, the Pallet line can only be rewritten once the Carton line already reaches Piece. Whether that happens in one save depends on the order of the lines, so check the grid after saving, and save again if a line is still chained.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow.
2. Set **Target Type** to **Item** and **Target Action** to **Pre Update Calculated Fields**.
3. In the **Details** grid, paste the whole script into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
4. Save the flow.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

## Example

An item has **Gram** as its **Base Unit (Smallest)**, and its **Conversions** grid is entered as:

| X of | Unit | Equal Y of | Unit |
|---|---|---|---|
| 1 | Kilo Gram | 1000 | Gram |
| 1 | Ton | 1000 | Kilo Gram |

After saving, the grid reads:

| X of | Unit | Equal Y of | Unit |
|---|---|---|---|
| 1 | Kilo Gram | 1000 | Gram |
| 1 | Ton | 1000000 | Gram |

## Messages you may see

The script raises no messages of its own. This is the message it helps you avoid:

| Message | Why | What to do |
|---|---|---|
| *Could not find conversion between base unit ({0}) and unit ({1})* — «لم يمكن العثور على تحويل بين الوحدة الأساسية ({0}) و الوحدة ({1})» | Unit `{1}` still has no direct conversion to the base unit `{0}`, because no line connects its target unit to the base unit. | Add the missing line that converts that unit to the base unit, then save again. |

## The script

<<< @/public/groovy-examples/EAFixUOMConversionsToBaseUnit.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Units of Measure](/modules/supplychain/units-of-measure)

</div>
