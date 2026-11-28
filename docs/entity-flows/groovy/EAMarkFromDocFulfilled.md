---
title: Mark the From Document as Fulfilled
module: supplychain
entities: [EntityFlow, SalesOrder, SalesInvoice]
groovy: customer-specific
description: A Groovy script that writes Fullfilled into Description 1 of a from-document once the documents made from it cover every one of its lines, and clears it otherwise.
---

<div class='entity-flows'>

# Mark the From Document as Fulfilled

This Groovy script keeps a simple "done" flag on a from-document. Each time a document made from it is saved, the script checks whether all such documents together now cover every line of the from-document. If they do, it writes `Fullfilled` into the from-document's **description1**; if they do not, it empties that field.

::: warning Customer-specific example
This script was written for one customer's setup and is hard-wired in three ways. Adapt it before you use it elsewhere:
- It writes into **description1** of the from-document, and it **empties that field** whenever the from-document is not fully covered. Anything else kept in that field is lost.
- The word it writes is the literal text `Fullfilled`, spelt with a double *l*. Filters, reports and criteria must look for that exact spelling.
- It only counts documents of the **same type** as the one being saved. Sales invoices made from an order count towards that order; stock issues made from the same order do not.
:::

| | |
|---|---|
| **Class name** | `EAMarkFromDocFulfilled` |
| **Script** | [EAMarkFromDocFulfilled.groovy](/groovy-examples/EAMarkFromDocFulfilled.groovy) |
| **Runs on** | Any supply chain document made from another document. Two lines: **Post Commit** and **Post Delete**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Sales orders are often invoiced in several parts. The order screen shows quantities, but a team that works from a list view or a report wants one column that simply says "this order is finished". This script gives them that column, kept up to date by the invoices themselves.

## How it works

1. **It finds the from-document.** If the document has no **From Document**, now or before this save, the script does nothing.
2. **It collects the documents made from it.** These are the committed documents of the same type whose **From Document** is that from-document, plus the document being saved. On **Post Delete** the deleted document is left out.
3. **It adds up the quantities per source line.** For each line of the from-document, it totals the base-unit quantity of every collected line that points to it.
4. **It writes the flag.** When every from-document line is covered in full, **description1** of the from-document becomes `Fullfilled`. When even one line is short, **description1** is emptied.
5. **It also tidies a changed from-document.** If the document used to point at a different from-document, that old one is recalculated as well, without this document.

The from-document is changed directly, in the same save. It is not re-saved through its own screen.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document made from the other one (for example **Sales Invoice**).
2. In the **Details** grid, add **two** lines and paste the whole script into the **Groovy Script** column of each. Set the first line's **Target Action** to **Post Commit** and the second line's to **Post Delete**. Leave **Class Name** empty: it is filled in when you save.
3. Leave all parameters empty. The only title shown after saving is *Not used - leave empty* on Parameter 1.
4. Save the flow.

## Example

A sales order has two lines, 2 units each, and its **description1** holds an old reference. A first invoice is made from it for line 1 only. After saving, the order is not fully covered, so its **description1** is emptied. A second invoice is then made for line 2. After that save, both lines are covered and the order's **description1** reads `Fullfilled`.

## The script

<<< @/public/groovy-examples/EAMarkFromDocFulfilled.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Set the Delivery Status of the Lines a Document Was Made From](/entity-flows/groovy/EASetDeliveryStatusInFromDocLines): another script that writes back to the from-document.

</div>
