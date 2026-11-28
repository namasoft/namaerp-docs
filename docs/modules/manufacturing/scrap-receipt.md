---
description: "The Scrap Receipt: booking production offcuts and waste back into stock as items that still have value, its header and details grid, and its effect on cost."
entities: [ScrapReceipt]
menu: Manufacturing → Documents → Scrap Receipt
---
# Scrap Receipts: Booking Waste Back Into Stock

## Why Scrap Is a Receipt, Not a Loss

Cut a 3-metre copper pipe into the lengths a job needs and you are left with offcuts. Turn a steel bar on a lathe and you produce a pile of swarf. None of it was the point of the exercise, but none of it is worthless either — the scrap merchant pays by the kilo, and a factory that generates a tonne of metal offcuts a month is sitting on real money.

That is why Nama treats scrap as a **receipt** rather than a write-off. The **Scrap Receipt** (استلام تالف) takes the waste that came off a production order and books it *into* a store as an item you own, can value, and can sell. Saving it generates a **Stock Receipt** for the scrap lines, using the generation book and term set in the scrap receipt's document term; deleting the scrap receipt deletes that stock receipt.

You'll find it under **Manufacturing → Documents → Scrap Receipt** (التصنيع ← المستندات ← استلام تالف).

![The scrap receipt screen](../../ar/modules/manufacturing/images/scrap/scrap-receipt-en.png)

::: info Scrap receipt and the Scrap step of an operation
[Production execution](/modules/manufacturing/production-execution) records how many of the order's units an operation lost, by moving them to that operation's **Scrap** step. The scrap receipt books the scrap *item* into stock. How the two meet depends on **Use Production Movement System Entry** in the manufacturing configuration:

- **Switched on:** each scrap receipt line takes its quantity out of the Scrap balance of the line's operation. The amount taken is **Quantity Based On Production Order** (in the order's unit) when that column is filled, otherwise the line's own quantity. A receipt that would take more than the step holds is refused with *The document {0} will lead to negative quantity for order {1}, operation {2}*, unless the order allows negative quantity for that operation.
- **Switched off:** the receipt does not change the operation balances; it only checks that the line's operation exists in the order (*Could not find step {0} in production order {1}*).
:::

::: info Required license
Scrap receipts are part of the core `manufacturing` license. If the **Manufacturing** menu is missing altogether, that license is not enabled.
:::

## The Header

**Book**, **Term** and **Value Date** work as on any document.

**Production Order** is required. Scrap belongs to the job that produced it — that link is what lets you ask which products generate the most waste, and what the scrap recovered is worth against what the job cost. A receipt against an order that is already **Closed** or **Terminated** cannot be saved or deleted: *Production order {0} is closed or terminated*.

**Item** shows the finished product the order was making, from the order itself.

**Warehouse** is where the scrap goes, and it should generally be a store kept for the purpose — the example books to a Production Scrap Store. Keeping scrap in its own store rather than mixing it into raw materials is what stops someone issuing metal turnings to a job by accident, and it makes the stock figure you quote the scrap merchant a number you can actually read off the system.

**Lot ID**, **Size**, **Color**, **Box**, **Revision ID** and the **Active / Inactive Percentage** pair carry item dimensions where the scrap item uses them. **Description** is free text.

The **Dimensions** section — **Legal Entity**, **Branch**, **Department**, **Analysis set**, **Sector** — places the receipt in the organisation for reporting.

## The Details Grid

Each row is one kind of scrap coming back.

**Operation Seq.** is the step that generated it, and it is required on every row. This is more useful than it looks: knowing that most of your waste appears at operation 10 rather than spread evenly across the routing points straight at the cutting step as the place to look for a better nesting plan.

**Code** and **Item** identify the scrap item — `SCR0001`, Metal Offcuts and Turnings, in the example. Note that scrap items are ordinary items in the item file. They need to exist before you can receive them, which is a setup step people miss on their first scrap receipt.

**Measures** (**Qty**, **L**, **W**, **H**) and **Item Quantity** (**UOM**, **Value**) carry the amount — 3 units in the example. For scrap sold by weight, the sensible unit is the one the merchant pays in, not the one the parent material was issued in.

**Quantity Based On Production Order** is how many of the order's units, in the order's unit, this row accounts for — 3 kg of offcut can stand for 1 unit of the order. It is used only with **Use Production Movement System Entry** switched on, where it is the amount taken from the operation's Scrap balance (see the box at the top of the page).

**Serial number** and **Box** apply where the scrap item is tracked that way.

**Unit Cost** is the value you put on one unit of the scrap item. **Total Cost** is worked out on save as Unit Cost × the row's quantity, and it is the cost the generated stock receipt carries into stock.

## What It Does to Cost

A scrap receipt puts value into stock, and that value has to come from somewhere. It comes off the production order: the cost of the stock receipts generated from the order's scrap receipts is subtracted from the order's cost when it is calculated — which is the correct treatment, and worth stating plainly because it surprises people: **recovering scrap reduces the cost of the units the order produced.**

The logic holds up. If a job consumed 100 kg of steel and 8 kg came back as saleable turnings, the good units did not really consume 100 kg of steel value; they consumed 100 kg less whatever the turnings are worth. Booking the scrap is what stops that recovery being silently absorbed into product cost.

Which is also the argument for actually raising these documents. A factory that skips scrap receipts is not merely losing track of a small revenue line — it is systematically overstating the cost of everything it makes.
