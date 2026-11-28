---
title: Set the Delivery Status of the Lines a Document Was Made From
module: supplychain
entities: [EntityFlow, SalesOrder, SalesInvoice]
groovy: recommended
description: A Groovy script that sets a fixed delivery status on the source lines of a document, even when the source is several documents back in the chain.
---

<div class='entity-flows'>

# Set the Delivery Status of the Lines a Document Was Made From

This Groovy script writes a delivery status of your choice onto the lines a document was made from. When you save, say, an invoice made from a sales order, each order line that the invoice draws on gets the status you picked, such as **Loaded** or **Delivering**.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is and control it entirely through its parameters.
:::

| | |
|---|---|
| **Class name** | `EASetDeliveryStatusInFromDocLines` |
| **Script** | [EASetDeliveryStatusInFromDocLines.groovy](/groovy-examples/EASetDeliveryStatusInFromDocLines.groovy) |
| **Runs on** | Any supply chain document made from another document. Usually **Post Commit**. |
| **Uses** | Parameter 2 and Parameter 3. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Sales lines and delivery document lines carry a **Delivery Status** column. The built-in [EAUpdateDeliveryStatusFromSalesDocToFromDoc](/entity-flows/supplychain/EAUpdateDeliveryStatusFromSalesDocToFromDoc) copies a line's own status back to the line it came from, one level up. This script is for the other common need: a fixed milestone.

Suppose the warehouse builds a stock issue from each sales invoice, and the invoice itself was made from a sales order. The sales team wants every order line to show **Loaded** the moment the stock issue is saved. Attach this script to the stock issue with Parameter 2 set to `Loaded` and Parameter 3 set to `SalesOrder`. The script walks from each issue line to its invoice line and on to the order line, and stamps that one.

## How it works

1. **It reads the parameters.** Parameter 2 is the status to set. When it is empty, the status is **Delivering**. Parameter 3 is the document type to stop at. When it is empty, that is **Sales Invoice**.
2. **It follows each line back.** For every line of the document being saved, the script finds the line it was made from. It uses the line's own origin document when there is one, and the document's **From Document** otherwise.
3. **It keeps climbing until the type matches.** If the source line belongs to a document of the type in Parameter 3, that is the line it changes. If not, it looks at where *that* line came from, and so on up the chain. A line with no source, or a chain that never reaches that type, is skipped without a message.
4. **It sets the status on the source line.** The source document is changed directly, in the same save. It is not re-saved through its own screen, so its own entity flows and validations do not run.

::: warning Deleting the document does not undo the status
The script only sets a status. Deleting the document, or removing a line from it, leaves the source lines with the status the script gave them. Change them back by hand if needed.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document that should trigger the change (for example **Stock Issue**).
2. In the **Details** grid, add a line with **Target Action** set to **Post Commit**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Fill in the parameters:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Status To Change To (NotDelivered, PartialDelivered, Delivered, Cancelled, Delivering, Loaded, Other1, Other2, Other3), default is Delivering | One of the listed values, spelt exactly as shown. Leave it empty for `Delivering`. |
| Parameter 3 | Document Type To change status in, default is SalesInvoice | The entity type of the document whose lines should change, for example `SalesOrder`. Leave it empty for `SalesInvoice`. |

4. Save the flow. **Class Name** now shows the script's class name, the line's **Description** explains what it does, and each parameter shows its title.

::: info Parameter 3 must name a document whose lines have a delivery status
Sales documents (orders, invoices and the like) and the delivery document have a **Delivery Status** on their lines. Naming a type whose lines have none, such as a stock issue, makes the flow fail when the document is saved.
:::

## Example

A sales order `SO-163` has ten lines. An invoice is made from it for two of those lines, and the flow above runs on the invoice with Parameter 2 = `Loaded` and Parameter 3 = `SalesOrder`. After the invoice is saved, those two order lines show **Loaded** in **Delivery Status**. The other eight lines keep their old status, because the invoice draws nothing from them.

## The script

<<< @/public/groovy-examples/EASetDeliveryStatusInFromDocLines.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [EAUpdateDeliveryStatusFromSalesDocToFromDoc](/entity-flows/supplychain/EAUpdateDeliveryStatusFromSalesDocToFromDoc): the built-in action that copies a line's own delivery status one level up.

</div>
