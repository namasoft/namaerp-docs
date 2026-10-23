---
title: Point Invoice Lines Back at the From Document's Lines
module: srvcenter
entities: [EntityFlow, SalesInvoice, PurchaseInvoice]
groovy: recommended
description: A Groovy script that re-points an invoice line whose Source Line Id names a line of one of the invoice's stock documents, so that it names the matching line of the invoice's From Document instead.
---

<div class='entity-flows'>

# Point Invoice Lines Back at the From Document's Lines

This Groovy script repairs the **Source Line Id** of invoice lines. When an invoice is made from an order, but its lines were taken from the stock issues (or stock receipts) listed in its **Stock Documents** grid, those lines point at the stock document's lines. The script follows each of them back to the matching line of the invoice's **From Document**, and writes that line's id into **Source Line Id** instead.

::: tip Recommended pattern
This script is not tied to any customer's setup. It takes no parameters, so you can paste it as it is.
:::

| | |
|---|---|
| **Class name** | `EAGuessInvoiceSourceLineOfSourceLineId` |
| **Script** | [EAGuessInvoiceSourceLineOfSourceLineId.groovy](/groovy-examples/EAGuessInvoiceSourceLineOfSourceLineId.groovy) |
| **Runs on** | Sales Invoice or Purchase Invoice, on **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Every document line can name the line it came from in **Source Line Id**. An invoice whose **From Document** is a sales order is expected to name the order's lines there, so the invoice line and the order line are linked.

Some installations deliver first and invoice later: the goods leave on stock issues made from the order, and the invoice is then built from those stock issues, which are listed in its **Stock Documents** grid. The invoice's lines then name the stock issue's lines, not the order's. This script puts the link back where the **From Document** says it should be.

The same applies to a purchase invoice made from a purchase order, whose lines were taken from stock receipts.

## How it works

1. **It needs a From Document.** An invoice without one is left as it is.
2. **It checks each line.** A line with an empty **Source Line Id**, or whose **Source Line Id** already names a line of the **From Document**, is left alone.
3. **It looks the id up in the stock documents.** For a sales invoice these are the stock issues in **Stock Documents**; for a purchase invoice, the stock receipts.
4. **It climbs back to the From Document.** From the stock document's line it follows that line's own **Source Line Id** into the stock document's **From Document**, and keeps climbing, one document at a time, until it reaches the invoice's own **From Document**. The line found in the **From Document** replaces the invoice line's **Source Line Id**.

So with the chain sales order → stock issue → sales invoice (invoice made from the order), the invoice line ends up naming the order line. With sales quotation → sales order → stock issue → sales invoice (invoice made from the quotation), it ends up naming the quotation line.

::: warning A line that cannot be traced loses its Source Line Id
When the id is in none of the invoice's stock documents, or the chain never reaches the invoice's **From Document**, the line's **Source Line Id** is cleared. Make sure the stock documents in the grid are the ones the lines were taken from.
:::

The script runs on **Pre Update Calculated Fields**, so the repaired ids are in place before the system's own calculations and checks. It runs on drafts as well as on committed saves.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with **Target Type** set to Sales Invoice (or Purchase Invoice).
2. In the **Details** grid, add a line with the action **Pre Update Calculated Fields**, and paste the whole script from the file above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Leave every parameter empty.
4. Save the flow. **Class Name** now shows `com.namasoft.modules.srvcenter.domain.utils.EAGuessInvoiceSourceLineOfSourceLineId`.

## Example

Sales order SO-27 has one line for 2 units of an appliance. Stock issue SI-1 is made from it, and its line names the order line as its source. A sales invoice is then made with **From Document** SO-27, SI-1 in its **Stock Documents** grid, and its line taken from SI-1, so the line's **Source Line Id** names SI-1's line.

On save, the script finds that id on SI-1, follows SI-1's line back to SO-27, and the invoice line's **Source Line Id** now names the line of SO-27.

The same invoice saved without a **From Document** keeps the stock issue's line id unchanged.

## Messages you may see

None. The script never refuses a save.

## The script

<<< @/public/groovy-examples/EAGuessInvoiceSourceLineOfSourceLineId.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Collect a Purchase Invoice's Stock Receipts From Its Car Receipts](/entity-flows/groovy/EACollectStockReceiptsByFromDoc): fills the **Stock Documents** grid that this script reads.

</div>
