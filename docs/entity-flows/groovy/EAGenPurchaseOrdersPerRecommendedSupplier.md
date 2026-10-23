---
title: Create One Purchase Order per Recommended Supplier From a Purchase Request
module: supplychain
entities: [EntityFlow, ItemRequest, PurchaseOrder]
groovy: customer-specific
description: A Groovy script that splits a purchase request into one purchase order per Recommended Supplier on its lines, ordering each line's Number 2, and keeps the orders in step every time the request is saved.
---

<div class='entity-flows'>

# Create One Purchase Order per Recommended Supplier From a Purchase Request

This Groovy script turns a purchase request into purchase orders. Each request line names its supplier in **Recommended Supplier**, and every time the request is saved, the script keeps one purchase order per supplier in step with it, holding that supplier's lines.

::: warning Customer-specific example
This script was written for one customer's setup. It is hard-wired to these line fields; adapt it before you use it elsewhere:
- The quantity ordered is the request line's **Number 2**, not its **Quantity**. The customer typed the approved quantity there.
- The supplier comes from **Recommended Supplier**. A line without one is not ordered.
- Each request line used gets its purchase order in **Reference 4**, and each purchase order points at the request in **Reference 5**.
:::

| | |
|---|---|
| **Class name** | `EAGenPurchaseOrdersPerRecommendedSupplier` |
| **Script** | [EAGenPurchaseOrdersPerRecommendedSupplier.groovy](/groovy-examples/EAGenPurchaseOrdersPerRecommendedSupplier.groovy) |
| **Runs on** | Purchase Request, on **Post Commit**. |
| **Uses** | Parameter 2. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A department asks for several items on one purchase request (**Purchases → Documents → Purchase Request**). The buyer reviews it, picks the supplier for each line in **Recommended Supplier**, and enters the quantity to order. Instead of making a purchase order per supplier by hand, the buyer saves the request and the orders appear, one per supplier.

When the buyer changes the request later, for example a quantity or a line's supplier, saving it again updates the orders to match.

This is the purchase request version of [Create One Purchase Order per Supplier From a Purchase Quotation](/entity-flows/groovy/EAGenMultiplePurchaseOrdersFromQuotation).

## How it works

1. **It groups the lines by Recommended Supplier.** Lines without one are left out.
2. **For each supplier it finds or creates the purchase order.** A purchase order whose **Reference 5** is this request and whose supplier is this supplier is reused. If there is none, a new one is created.
3. **It fills the order.** The field map in Parameter 2 is applied, the header is copied from the request (except the warehouse and the locator), and the field map is applied once more so that it wins. The supplier is set, and **Reference 5** and **From Document** point at the request.
4. **It replaces the order's lines** with copies of the supplier's request lines. Each copied line's quantity is the request line's **Number 2**.
5. **It saves the order**, and writes the order into **Reference 4** of each request line it used.
6. **It deletes the leftovers.** Any purchase order whose **Reference 5** is this request but whose supplier no longer appears on the request is deleted.

The script runs on every save that commits the request, not only the first one.

::: warning Reference 5 belongs to the script
Step 6 deletes every purchase order whose **Reference 5** points at the request and whose supplier is gone. Do not use **Reference 5** of those orders for anything else, and do not link a hand-made order to the request through it.
:::

::: info The orders must save on their own
Each order is saved with the full checks of a normal save. If one of them is refused, the request's save is refused too, with the order's reason after `Error while running entity flow`. The script sets no prices of its own, so check the prices on the orders before you send them.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with **Target Type** set to Purchase Request.
2. In the **Details** grid, add a line with the action **Post Commit**, and paste the whole script from the file above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Fill in the parameters:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | *(empty)* | Nothing. |
| Parameter 2 | Fields Map | A field map from the request (source) to the purchase order (target), one `target=source` pair per line. It must at least set the order's book and term. See [Field Values Calculator](/entity-flows/core/ai-generated-field-maps-documentation). |

4. Save the flow. **Class Name** now shows `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EAGenPurchaseOrdersPerRecommendedSupplier`.

**Number 2** and **Reference 4** are not columns of the standard purchase request grid. Add them with a [Screen Modifier](/platform/screen-modifier/screen-modifier-edit-screen) so the buyer can type the quantity to order and see each line's order.

## Example

Parameter 2 sets the order's book and term:

```
book='PO01'
term='PO'
```

A purchase request has four lines:

| Item | Quantity | Number 2 | Recommended Supplier |
|---|---|---|---|
| A3 paper | 10 | 4 | Supplier A |
| A4 paper | 5 | 5 | Supplier B |
| Folders | 3 | 3 | *(empty)* |
| Coloured paper | 2 | 2 | Supplier A |

Saving it creates two purchase orders: one for supplier A with A3 paper ×4 and coloured paper ×2, and one for supplier B with A4 paper ×5. The folders are not ordered. **Reference 4** of the three ordered lines shows their order.

The buyer then changes the A3 paper's **Number 2** to 6, clears the A4 paper's **Recommended Supplier**, and saves again. Supplier A's order now has A3 paper ×6, and supplier B's order is deleted.

## The script

<<< @/public/groovy-examples/EAGenPurchaseOrdersPerRecommendedSupplier.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Create One Purchase Order per Supplier From a Purchase Quotation](/entity-flows/groovy/EAGenMultiplePurchaseOrdersFromQuotation): the same idea for purchase quotations, with the supplier in **Reference 3**.
- [EAGenSCDocFromDocWithFieldsMap](/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap): the built-in element that creates one document from another through a field map.

</div>
