---
title: Record Inventory Effects Under the Warehouse's Analysis Set
module: supplychain
entities: [EntityFlow, Warehouse, StockIssue]
groovy: recommended
description: A Groovy script that runs just before a document sends its inventory transaction request and gives every request line the analysis set of its warehouse.
---

<div class='entity-flows'>

# Record Inventory Effects Under the Warehouse's Analysis Set

This Groovy script makes the inventory effect of a document follow the warehouse's analysis set rather than the document's. Just before the document sends its inventory transaction request for processing, the script gives every line of that request the analysis set of the line's warehouse.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters: attach it and it works.
:::

| | |
|---|---|
| **Class name** | `EASetInvRequestAnalysisSetFromWarehouse` |
| **Script** | [EASetInvRequestAnalysisSetFromWarehouse.groovy](/groovy-examples/EASetInvRequestAnalysisSetFromWarehouse.groovy) |
| **Runs on** | Any document with an inventory effect. Target action **Pre Send Business Request**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Some companies use the analysis set to stand for a site or a business line, and give each warehouse the analysis set it belongs to on the **Warehouse** screen. Stock reports filtered by analysis set then only add up correctly if every movement in that warehouse carries the warehouse's analysis set. Users, however, often save stock issues and similar documents under their own login analysis set, which is usually different.

With this script on the flow, the document is saved as the user entered it, but its quantity transactions are recorded under the warehouse's analysis set. Nobody has to remember to change the dimension by hand.

## How it works

1. **It waits for the inventory request.** A saved document is processed in the background through business requests. **Pre Send Business Request** flows run once for each request the document sends, just before it is sent. The script acts only on the inventory transaction request and leaves every other request, such as the accounting one, untouched.
2. **It goes through the request lines.** Each request line that has a warehouse is given that warehouse's analysis set, as set on the **Warehouse** screen. Lines without a warehouse are skipped.
3. **The document itself does not change.** Only the request is changed. The document's lines keep the analysis set the user saved them with, and the quantity transactions created when the request is processed carry the warehouse's.

::: info A warehouse with no analysis set
The script copies whatever the warehouse holds. If a warehouse's analysis set is empty, its request lines lose their analysis set too.
:::

## Setting it up

1. On **Inventory → Master Files → Warehouse**, give each warehouse the analysis set its movements should carry.
2. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document to cover (for example **Stock Issue**). Add one flow per document type, or use an entity type list.
3. In the **Details** grid, add a line with **Target Action** set to **Pre Send Business Request**, and paste the whole script into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
4. Leave all parameters empty, and save the flow.

The flow affects documents saved from now on. A document that was already processed keeps its old quantity transactions until its inventory request is regenerated.

## Example

Warehouse `W-NORTH` has the analysis set `NORTH`. A user whose login analysis set is `PUBLIC` saves a stock issue from `W-NORTH`. The issue's line still shows `PUBLIC`, but the quantity transaction for that line is recorded under `NORTH`, the same analysis set as every other movement in that warehouse.

## The script

<<< @/public/groovy-examples/EASetInvRequestAnalysisSetFromWarehouse.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Business Requests](/platform/background-processing/business-requests): how a saved document's effects are processed in the background.

</div>
