---
title: Lock Saved Price Lines on Items and Sales Price Lists
module: supplychain
entities: [EntityFlow, InvItem, SalesPriceList]
groovy: recommended
description: Two Groovy scripts that refuse to save an item or a sales price list when one of its existing price lines was deleted or changed. New lines can still be added.
---

<div class='entity-flows'>

# Lock Saved Price Lines on Items and Sales Price Lists

These two Groovy scripts make prices append-only. Once an item or a sales price list has been saved, its existing price lines can no longer be deleted or edited; a price change has to be entered as a new line. One script guards the item, the other the sales price list.

::: tip Recommended pattern
These scripts are not tied to any customer's setup. They have no parameters: attach them and they work.
:::

| | |
|---|---|
| **Class names** | `EAPreventChangingItemPriceLines` (item), `EAPreventChangingSalesPriceListLines` (sales price list) |
| **Scripts** | [EAPreventChangingItemPriceLines.groovy](/groovy-examples/EAPreventChangingItemPriceLines.groovy), [EAPreventChangingSalesPriceListLines.groovy](/groovy-examples/EAPreventChangingSalesPriceListLines.groovy) |
| **Runs on** | **Item** and **Price List** (the sales price list, entity type `SalesPriceList`). Target action **Validate On Save**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Prices are a common audit question: "who changed this price, and what was it before?" If users may overwrite a price line, the old value is gone from the record. With these scripts the old line stays, and each new price arrives as a new line with its own dates, so the history is in the record itself.

A price can be entered in two places: the **Item Price in Lists** grid on the item, which also writes the line into the sales price list it names, and the lines of the sales price list itself. Install both scripts so that neither screen can be used to get round the other.

## How it works

Both scripts compare the record as it was last saved with the record being saved now. They do nothing on a record's first save.

1. **The item script** goes through each line of the item's **Item Price in Lists** grid as it was last saved. It refuses the save if that line is gone, or if its sales price list, default price, minimum price, maximum price or quantity is different now.
2. **The sales price list script** does the same with the price list's lines, comparing the item, default price, minimum price, maximum price and quantity.
3. **New lines are always allowed.** Only lines that already existed are checked.
4. **Each screen trusts the other.** When an item's save updates a sales price list, or a price list's save updates an item, the record updated in the background is not checked again. The check already ran on the screen where the user made the change.

All problems found in one save are reported together, one message per line.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with target type **Item**.
2. In the **Details** grid, add a line with **Target Action** set to **Validate On Save**, and paste the whole item script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Save the flow.
4. Create a second flow with target type **Price List** (`SalesPriceList`) in the same way, using the sales price list script.

Both scripts have no parameters. After saving, Parameter 1 shows the title *Not used - leave empty*.

## Example

A sales price list `PL-2026` holds a line for item `APP0036` with default price 40000. A user opens the price list and changes that price to 42000. The save is refused with:

> Default price 40000 for item APP0036 - Union Air Air Conditioner 2.25HP Cool/Heat was changed to 42000

Adding a new line for another item to the same price list saves normally.

## Messages you may see

None of these messages has an Arabic translation, so they appear in English on Arabic screens as well. In each one, the item or the price list appears as its code followed by its name.

| Message | Why | What to do |
|---|---|---|
| *Line for price list {0}, default price {1} was deleted* | An existing line of the item's **Item Price in Lists** grid was removed. | Put the line back. To stop using a price, add a new line instead. |
| *Line for price list {0}, default price {1} was changed to price list {2}* | An existing item price line was moved to another sales price list. | Restore the original price list and add a new line for the other one. |
| *Default price {0} for price list {1} was changed to {2}* | The default price of an existing item price line was edited. | Restore the old price and add a new line with the new price. |
| *Min price {0} for price list {1} was changed to {2}* | The minimum price of an existing item price line was edited. | Same as above. |
| *Max price {0} for price list {1} was changed to {2}* | The maximum price of an existing item price line was edited. | Same as above. |
| *Quantity {0} for price list {1} was changed to {2}* | The quantity of an existing item price line was edited. | Same as above. |
| *Line for item {0}, default price {1} was deleted* | An existing line of the sales price list was removed. | Put the line back. To stop using a price, add a new line instead. |
| *Line for item {0}, default price {1} was changed to item {2}* | An existing price list line was switched to another item. | Restore the original item and add a new line for the other one. |
| *Default price {0} for item {1} was changed to {2}* | The default price of an existing price list line was edited. | Restore the old price and add a new line with the new price. |
| *Min price {0} for item {1} was changed to {2}* | The minimum price of an existing price list line was edited. | Same as above. |
| *Max price {0} for item {1} was changed to {2}* | The maximum price of an existing price list line was edited. | Same as above. |
| *Quantity {0} for item {1} was changed to {2}* | The quantity of an existing price list line was edited. | Same as above. |

## The scripts

The item script:

<<< @/public/groovy-examples/EAPreventChangingItemPriceLines.groovy{groovy}

The sales price list script:

<<< @/public/groovy-examples/EAPreventChangingSalesPriceListLines.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.

</div>
