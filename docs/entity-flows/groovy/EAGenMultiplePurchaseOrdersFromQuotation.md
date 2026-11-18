---
title: Create One Purchase Order per Supplier From a Purchase Quotation
module: supplychain
entities: [EntityFlow, PurchaseQuotation, PurchaseOrder, PurchaseInvoice]
groovy: recommended
description: Two Groovy scripts that split a purchase quotation into one purchase order, or one purchase invoice, per supplier named on its lines, and keep them in step every time the quotation is saved.
---

<div class='entity-flows'>

# Create One Purchase Order per Supplier From a Purchase Quotation

These two Groovy scripts split a purchase quotation by supplier. Each line names its supplier in **Reference 3**, and every time the quotation is saved, the first script keeps one purchase order per supplier in step with it. The second script does the same with purchase invoices, and can also set each invoice's currency.

::: tip Recommended pattern
These scripts are not tied to any customer's setup. You can paste them as they are and control them entirely through their parameters.
:::

| | |
|---|---|
| **Class names** | `EAGenMultiplePurchaseOrdersFromQuotation`, `EAGenMultiplePurchaseInvoicesFromQuotationWithCurrency` |
| **Scripts** | [EAGenMultiplePurchaseOrdersFromQuotation.groovy](/groovy-examples/EAGenMultiplePurchaseOrdersFromQuotation.groovy), [EAGenMultiplePurchaseInvoicesFromQuotationWithCurrency.groovy](/groovy-examples/EAGenMultiplePurchaseInvoicesFromQuotationWithCurrency.groovy) |
| **Runs on** | Purchase Quotation, on **Post Commit**. |
| **Uses** | Parameter 2 (required) and Parameter 3 (optional). Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A buyer collects prices for a list of items and records them on one purchase quotation (**Purchases → Documents → Purchase Quotation**). The cheapest supplier is not the same for every item: the toner is best from one supplier, the paper from another. The standard way to order would be to make one purchase order per supplier by hand and copy the right lines into each.

With these scripts, the buyer just picks the winning supplier on each line, in **Reference 3**, and saves. One purchase order per supplier appears, holding exactly that supplier's lines. Change a line's supplier and save again: the line moves to the other supplier's order, and an order that no longer has any lines is deleted.

## How it works

1. **It chooses the lines.** When Parameter 3 holds the code of a [Criteria Definition](/platform/automation-and-rules/criteria-definitions), only the lines matching it are used. Otherwise every line is used. Lines with an empty **Reference 3** are always left out.
2. **It groups the lines by supplier**, taken from **Reference 3**.
3. **For each supplier it finds or creates the document.** A purchase order (or invoice) whose **Reference 5** is this quotation and whose supplier is this supplier is reused. If there is none, a new one is created.
4. **It fills the document.** The field map in Parameter 2 is applied, the header is copied from the quotation (except the warehouse and the locator), and the field map is applied once more so that it wins. The supplier is set, and **Reference 5** and **From Document** point at the quotation. The lines are replaced with copies of the supplier's quotation lines.
5. **It saves the document**, and writes the document into **Reference 4** of each of the quotation lines it used.
6. **It deletes the leftovers.** Any purchase order (or invoice) whose **Reference 5** is this quotation but whose supplier no longer appears on the quotation is deleted.

**The invoice script** (`EAGenMultiplePurchaseInvoicesFromQuotationWithCurrency`) also reads two fields from each line it copies: a non-zero **Number 1** becomes the invoice's currency rate, and a currency in **Reference 2** becomes the invoice's currency.

::: warning Reference 5 belongs to the script
Step 6 deletes every purchase order (or invoice) whose **Reference 5** points at the quotation and whose supplier is gone. Do not use **Reference 5** of those documents for anything else, and do not link a hand-made order to the quotation through it.
:::

::: info The generated documents must save on their own
Each order or invoice is saved with the full checks of a normal save. If one of them is refused, the quotation's save is refused too, with the generated document's reason after `Error while running entity flow`. A purchase invoice needs a warehouse, which is not copied from the quotation, so set it in the field map; otherwise the save stops with *Field Warehouse is required, can not be empty*.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with **Target Type** set to Purchase Quotation.
2. In the **Details** grid, add a line with the action **Post Commit**, and paste the whole script from one of the files above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Fill in the parameters:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Fields Map | A field map from the quotation (source) to the new document (target), one `target=source` pair per line. It must at least set the book and the term of the new document. See [Field Values Calculator](/entity-flows/core/ai-generated-field-maps-documentation). |
| Parameter 3 | Lines Criteria | Optional. The code of a Criteria Definition on Purchase Quotation that picks the lines to use. |

4. Save the flow. **Class Name** now shows `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EAGenMultiplePurchaseOrdersFromQuotation` (or the invoice script's name), and each parameter shows its title.

## Example

For purchase orders, Parameter 2 sets the order's book and term:

```fieldmap
book='PO01'
term='PO'
```

For purchase invoices, it also sets the warehouse:

```fieldmap
book='PI01'
term='PI'
warehouse='01'
```

A quotation has three lines: toner and paper with supplier A in **Reference 3**, and folders with supplier B. Saving it creates two purchase orders: one for supplier A with two lines, one for supplier B with one line. Each quotation line's **Reference 4** shows its order. When the folders line is changed to supplier A and the quotation is saved again, supplier A's order is updated to three lines and supplier B's order is deleted.

To order only some lines, create a Criteria Definition on Purchase Quotation, for example the textual criteria `details.n1,GreaterThan,0,AND;`, and put its code in Parameter 3. Then only the lines with a **Number 1** greater than zero are ordered.

## The scripts

The purchase order script, `EAGenMultiplePurchaseOrdersFromQuotation`:

<<< @/public/groovy-examples/EAGenMultiplePurchaseOrdersFromQuotation.groovy{groovy}

The purchase invoice script, `EAGenMultiplePurchaseInvoicesFromQuotationWithCurrency`:

<<< @/public/groovy-examples/EAGenMultiplePurchaseInvoicesFromQuotationWithCurrency.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [EAGenSCDocFromDocWithFieldsMap](/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap): the built-in element that creates one document from another through a field map.
- [Criteria Definitions](/platform/automation-and-rules/criteria-definitions)

</div>
