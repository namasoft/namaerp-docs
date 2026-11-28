---
title: Maintain Limit Sales Qty Lines From Items and Customers
module: supplychain
entities: [EntityFlow, LimitSalesQty, InvItem, Customer]
groovy: customer-specific
description: Two Groovy scripts that keep a Limit Sales Qty record in step with the items and customers that are saved, finding or creating the record with a query and a fields map.
---

<div class='entity-flows'>

# Maintain Limit Sales Qty Lines From Items and Customers

These two Groovy scripts let users maintain sales quantity limits from the item and customer screens, instead of editing **Limit Sales Qty** directly. When an item is saved, its limit line in the Limit Sales Qty record is created or updated. When a customer is saved, so is its multiplier line.

::: warning Customer-specific example
These scripts were written for one customer, who had spare numeric fields to hold the limits. They are hard-wired to those fields; adapt them before you use them elsewhere:
- **Item script:** **Period In Days** is taken from the item's **Item Density**, and **Quantity Limit** from its **Item Length**.
- **Customer script:** **Period In Days** is taken from the **City** of the customer's shipping address, and **Quantity Limit Multiplied By** from its **Area**. Both must hold plain numbers.
:::

| | |
|---|---|
| **Class names** | `EAMaintainLimitSalesQtyFromItem` (item), `EAMaintainLimitSalesQtyFromCustomer` (customer) |
| **Scripts** | [EAMaintainLimitSalesQtyFromItem.groovy](/groovy-examples/EAMaintainLimitSalesQtyFromItem.groovy), [EAMaintainLimitSalesQtyFromCustomer.groovy](/groovy-examples/EAMaintainLimitSalesQtyFromCustomer.groovy) |
| **Runs on** | **Item** and **Customer**. Target action **Post Commit**. |
| **Uses** | Parameter 2 and Parameter 3. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

[Limit Sales Qty](/modules/supplychain/sales-operations-documents#Limit-Sales-Qty) caps how much of an item a customer may buy within a period, and can multiply that cap for chosen customers. When the cap belongs to each item, and the multiplier to each customer, keeping a separate master file in step with hundreds of items and customers becomes a chore. These scripts move the data entry to the item and customer screens, where the people who set the limits already work.

They also show a reusable pattern: a flow that **finds a target record by query, or creates it**, changes one of its lines and saves it, using the same finder query and fields map as the built-in [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction).

## How it works

1. **It finds the Limit Sales Qty record.** The SQL query in Parameter 2 is run for the item or customer being saved. It must return the id of the Limit Sales Qty record to use. When it returns nothing, a new record is created, with the dimensions of the item or customer.
2. **It finds the line for this record.**
   - The **item script** looks in the **Details** grid for the line whose **Item** is this item, and adds one if there is none. It sets **Period In Days** from **Item Density** and **Quantity Limit** from **Item Length**. If **Item Length** is empty or zero, the item's line is removed instead.
   - The **customer script** looks in the **Multiplied By Quantities** grid for the line whose **Customer** is this customer, and adds one if there is none. It sets **Period In Days** from the shipping address **City** and **Quantity Limit Multiplied By** from the shipping address **Area**. The line's **From Date** and **To Date** are left empty, so the multiplier applies all year.
3. **It applies the fields map.** The fields map in Parameter 3 is applied to the Limit Sales Qty record, with the item or customer as the source. Use it to fill the record's code, names and **Priority** when the record is new.
4. **It saves the Limit Sales Qty record.** If that save is refused, its messages are reported on the item's or customer's save.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with target type **Item**.
2. In the **Details** grid, add a line with **Target Action** set to **Post Commit**, and paste the whole item script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Fill in the parameters:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Finder Query (eg. select id from LimitSalesQty where code = {itemClass1.code} ) | An SQL query returning the id of the Limit Sales Qty record to maintain. Fields of the item or customer can be used in braces, as in the title. |
| Parameter 3 | `Fields Map (eg.` followed by a two-line example | One `field=value` per line, applied to the Limit Sales Qty record. Text constants go in double quotes. |

4. Save the flow, then create a second flow with target type **Customer** in the same way, using the customer script. Its titles are the same, except that the examples use `customerCategory.code` instead of `itemClass1.code`.

## Example

One Limit Sales Qty record, `MONTHLY-CAPS`, should hold every item's cap. Both flows use:

- Parameter 2: `select id from LimitSalesQty where code = 'MONTHLY-CAPS'`
- Parameter 3:

```fieldmap
code="MONTHLY-CAPS"
name1="MONTHLY-CAPS"
name2="MONTHLY-CAPS"
priority="1"
```

An item is saved with **Item Density** 7 and **Item Length** 10. The record `MONTHLY-CAPS` is created with one line for that item: **Period In Days** 7, **Quantity Limit** 10. A second item saved with 3 and 4 adds a second line to the same record. A customer saved with `30` in its shipping **City** and `2` in its shipping **Area** gets a **Multiplied By Quantities** line with **Period In Days** 30 and **Quantity Limit Multiplied By** 2.

## The scripts

The item script:

<<< @/public/groovy-examples/EAMaintainLimitSalesQtyFromItem.groovy{groovy}

The customer script:

<<< @/public/groovy-examples/EAMaintainLimitSalesQtyFromCustomer.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Limit Sales Qty](/modules/supplychain/sales-operations-documents#Limit-Sales-Qty): how the limits and multipliers are enforced on sales invoices.
- [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction): the finder query and fields map syntax.

</div>
