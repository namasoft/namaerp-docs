---
title: Add Free Lines From the References on Each Sales Line
module: supplychain
entities: [EntityFlow, SalesOrder, SalesInvoice]
groovy: customer-specific
description: A Groovy script that turns up to three item references on each sales line, with their quantities, into free lines placed right under that line.
---

<div class='entity-flows'>

# Add Free Lines From the References on Each Sales Line

This Groovy script lets the user type a line's free goods on the line itself. On each sales line, the user picks up to three free items in **Reference 1**, **Reference 2** and **Reference 3** and enters their quantities in **Number 1**, **Number 2** and **Number 3**. When the document is saved, each of those becomes a free line placed right under the line it belongs to.

::: warning Customer-specific example
This script was written for one customer's setup. It is hard-wired to these line fields; adapt it before you use it elsewhere:
- **Reference 1**, **Reference 2** and **Reference 3** hold the free items. A reference that points to anything other than an item is ignored.
- **Number 1**, **Number 2** and **Number 3** hold the matching quantities, in the free item's base unit. A reference with an empty or zero quantity is ignored.
:::

| | |
|---|---|
| **Class name** | `EAAddFreeLinesFromLineReferences` |
| **Script** | [EAAddFreeLinesFromLineReferences.groovy](/groovy-examples/EAAddFreeLinesFromLineReferences.groovy) |
| **Runs on** | Sales documents: sales order, sales invoice and the like. Target action **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

The system's own free-item offers work from rules set up in advance. Some sales teams instead agree the free goods per order: "buy two air conditioners and get three box files free". This script lets the person entering the order record that deal on the line, without a rule and without adding and linking the free lines by hand.

## How it works

1. **It goes through the lines that are not free.** Lines already marked **Free Item** are skipped.
2. **It reads the three references.** For each of **Reference 1** to **Reference 3** that points to an item and has a quantity in the matching **Number** field, it prepares one free line.
3. **It reuses the line's existing free lines.** Free lines that the script added to this line on an earlier save are linked to it, so they are updated in place rather than added again. New ones are created only when more are needed.
4. **It fills each free line.** The free line gets the item, the quantity in the item's base unit, **Free Item** ticked and an empty price. It is placed right after the line it belongs to.
5. **The document then calculates as usual.** Because the script runs on **Pre Update Calculated Fields**, the free lines are in place before the document works out its totals.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the sales document to cover (for example **Sales Order**).
2. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Leave all parameters empty, and save the flow.
4. Make sure **Reference 1** to **Reference 3** and **Number 1** to **Number 3** are visible on the document's lines, so users can fill them.

## Example

A sales order line sells 2 units of an air conditioner. On that line the user sets **Reference 1** to the item `OFF0017` with **Number 1** = 3, and **Reference 2** to the item `OFF0018` with **Number 2** = 1. After saving, the order has three lines: the air conditioner, then a free line of 3 units of `OFF0017`, then a free line of 1 unit of `OFF0018`, both with a zero price. Changing **Number 1** to 5 and saving again updates the first free line to 5 units instead of adding another one.

## The script

<<< @/public/groovy-examples/EAAddFreeLinesFromLineReferences.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.

</div>
