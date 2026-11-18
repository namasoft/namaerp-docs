---
title: Update Items' Warehouse Settings From a Purchase Return Request
module: supplychain
entities: [EntityFlow, PurchaseReturnReq, InvItem]
menu: Purchases → Documents → Purchase Return Request
groovy: customer-specific
description: A Groovy script that, when a purchase return request is committed, writes values from its lines into each item's dimensions grid row for that warehouse, through fixed numeric fields and an optional field map.
---

<div class='entity-flows'>

# Update Items' Warehouse Settings From a Purchase Return Request

This Groovy script uses the **Purchase Return Request** as a data-entry sheet for item settings. When the request is committed, each line's values are written into the item's dimensions grid, on the row for the line's warehouse, and the item is saved. Extra fields can be copied with a field map spread over the parameters.

::: warning Customer-specific example
Six copies are written into the script and cannot be switched off through parameters. From each request line:

| Request line field | Goes to the item's dimensions row |
|---|---|
| **N1** | **Min Quantity** |
| **N2** | **Order Limit** |
| **N5** | **Slow moving period** |
| **B1** | **Suggested In Discounts And Offers** |
| **N3** | **N1** |
| **N4** | **N2** |

Keep these fields free for this purpose on the request, or change the fixed copies in the script before you paste it.
:::

| | |
|---|---|
| **Class name** | `EAUpdateItemDimensionsFromPurchaseReturnReqLines` |
| **Script** | [EAUpdateItemDimensionsFromPurchaseReturnReqLines.groovy](/groovy-examples/EAUpdateItemDimensionsFromPurchaseReturnReqLines.groovy) |
| **Runs on** | Purchase Return Request. Target action **Post Commit**. |
| **Uses** | Parameters 2 to 15 (all optional). Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Each item's dimensions grid holds per-warehouse settings such as the minimum quantity and the order limit. Keeping hundreds of those rows up to date by opening one item at a time is slow. If buyers already review slow-moving stock line by line on a purchase return request, the request can carry the new settings as well: they type them on the lines, and committing the request updates every item at once.

## How it works

For each request line that has an item:

1. **It finds the item's row.** It looks in the item's dimensions grid for a row with the same item code and the same warehouse as the line. If there is none, it adds a new row with that item code and warehouse.
2. **It copies the fixed fields.** The six fields in the table above are copied, but only when the request line has a value: a zero or empty number, or an empty B1, leaves the item's value as it was.
3. **It applies the field map.** Every map line that starts with `details.` writes into that same row. Every map line that starts with `sizesAndColors.` writes into the item's **Sizes and Colors** row that has the request line's size and color; if the item has no such row, one is added.
4. **It saves each item once.** After all lines are handled, every item touched is saved and committed, even when several lines point to it.

## The field map

Write one mapping per line, in any of Parameters 2 to 15. Lines from all parameters are read together, so you can spread a long map over several parameters.

```fieldmap
details.description2=text1
details.n3=n5
sizesAndColors.name1="Returned"
```

- The left side is the target: `details.` or `sizesAndColors.` followed by a field id of that grid's row. A line without one of these two prefixes is ignored.
- The right side is a field id of the request line, or a fixed text in double quotes.
- When the request line's value is empty, that mapping is skipped for that line.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is **Purchase Return Request**.
2. In the **Details** grid, add a line with **Target Action** set to **Post Commit**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Put the field map, if any, in Parameter 2 and onwards, and save the flow.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Field map (optional), one per line: details.&lt;field&gt;=&lt;line field&gt; or sizesAndColors.&lt;field&gt;=&lt;line field&gt; | Map lines, for example `details.description2=text1`. |
| Parameters 3 and 4 | More field map lines (optional) | More map lines. Parameters 5 to 15 are read too; they just have no title. |

::: warning The items are really saved
The item records are changed and committed as part of committing the request. If an item refuses the change because one of its own validations fails, that item's message is returned when the request is committed.
:::

## Example

Parameter 2 holds `details.description2=text1`. A request line for item `PIPE-25` in warehouse `MAIN` has **N1** = 5, **N2** = 10, **N3** = 7 and **Text 1** `Returned batch`. After the request is committed, the item's dimensions row for `MAIN` shows **Min Quantity** 5, **Order Limit** 10, **N1** 7 and **Description 2** `Returned batch`. If the item had no row for `MAIN`, that row has just been added.

## The script

<<< @/public/groovy-examples/EAUpdateItemDimensionsFromPurchaseReturnReqLines.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Understanding Inventory Items](/modules/supplychain/understanding-items#Safety-Stock-and-Reorder-Points): the item's stock settings.

</div>
