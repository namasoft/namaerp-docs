---
title: Force Do Not Update Prices At All on Sales Return Request Terms
module: supplychain
entities: [EntityFlow, DocumentTerm, SalesReturnRequest]
groovy: customer-specific
description: A Groovy script on the Document Term screen that ticks Do Not Update Prices At All on every Sales Return Request term when it is saved.
---

<div class='entity-flows'>

# Force Do Not Update Prices At All on Sales Return Request Terms

This Groovy script enforces one setting on document terms. Whenever a document term for **Sales Return Request** is saved, the script ticks **Do Not Update Prices At All** in its configuration, so that no return request term can be saved with automatic repricing switched on.

::: warning Customer-specific example
This script was written for one customer's setup. It is hard-wired to one document type and one setting; adapt it before you use it elsewhere:
- It only touches terms whose document type is **Sales Return Request**.
- It only sets **Do Not Update Prices At All**, on the **From Document** page of the term's configuration. To force a different setting, the script has to be edited.
:::

| | |
|---|---|
| **Class name** | `EASetDoNotUpdateSalesPrice` |
| **Script** | [EASetDoNotUpdateSalesPrice.groovy](/groovy-examples/EASetDoNotUpdateSalesPrice.groovy) |
| **Runs on** | **Document Term**. Target action **Pre Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A sales return request is usually made from the original invoice, and the customer must be refunded at the price they actually paid. If the request's term lets the system recalculate prices, a price list that has changed since the sale can quietly alter the refund. The setting that prevents this is described under [Price-Update Control](/modules/supplychain/document-terms/doc-term-pricing-taxes-discounts#Price-Update-Control). This script makes sure it can never be left off, even when someone adds a new return request term later.

It also shows a pattern worth knowing: an entity flow on **Document Term** can read and change the term's configuration while the term is being saved.

## How it works

1. **It checks the document type.** If the term being saved is not for **Sales Return Request**, the script does nothing.
2. **It sets the option.** It ticks **Do Not Update Prices At All** in the term's configuration. The term is then saved with the option on, whatever the user chose.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with target type **Document Term**.
2. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Leave all parameters empty, and save the flow.
4. Open each existing **Sales Return Request** term on **Basic → Settings → Document Term**, make any change and save it, so that the script runs on it once. Terms created later are covered on their first save.

## The script

<<< @/public/groovy-examples/EASetDoNotUpdateSalesPrice.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Pricing, Taxes & Discounts Configuration](/modules/supplychain/document-terms/doc-term-pricing-taxes-discounts): what **Do Not Update Prices At All** does.

</div>
