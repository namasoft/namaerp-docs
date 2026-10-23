---
title: Rebuild Quantity Tracking for Documents From a Query
module: supplychain
entities: [EntityFlow, TaskSchedule]
groovy: recommended
description: A Groovy script that rebuilds the satisfied and remaining quantities that documents leave on their source documents, for every document an SQL query returns.
---

<div class='entity-flows'>

# Rebuild Quantity Tracking for Documents From a Query

This Groovy script rebuilds the quantity tracking of every supply chain document that an SQL query returns: how much of each source document line the document satisfies, and so how much remains open on the source.

::: tip Recommended pattern
This script is not tied to any customer's setup. You control it entirely through the query in Parameter 2.
:::

| | |
|---|---|
| **Class name** | `EAUpdateQtyTrackingEffectsFromQuery` |
| **Script** | [EAUpdateQtyTrackingEffectsFromQuery.groovy](/groovy-examples/EAUpdateQtyTrackingEffectsFromQuery.groovy) |
| **Runs on** | A task schedule. |
| **Uses** | Parameter 2. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

When a sales invoice is made from a sales order, or a return from an invoice, the system records how much of each source line the new document covers. That is what makes the order show as partly or fully delivered, and what stops a second invoice from taking the same quantity again.

Sometimes those records go wrong for a set of documents, for example after a failed import or a restore of part of the data. The order then shows quantities as still open although they were invoiced, or the other way round. Re-saving each document by hand rebuilds them, but it is slow and it re-sends every document's other effects too.

This script rebuilds only the quantity tracking, for exactly the documents your query returns.

::: warning Only with the system table for quantity tracking
The script is meant for installations where **Use System Table to Track Quantities** is ticked in the supply chain settings (**Documents & Details → Document Behavior**). With that option, every run deletes the document's tracking entries and creates them again, so running it twice gives the same result as running it once. Check the option before you use the script.
:::

## How it works

1. **It runs the query** in Parameter 2. The query returns the entity type in its first column and the record's id (or its code) in its second.
2. **It handles each document on its own transaction.** A document that fails is rolled back without undoing the ones before it.
3. **It skips documents that were never committed.** A draft has no quantity effect to rebuild.
4. **It rebuilds the document's tracking entries** in both directions: what the document takes from its own source documents, and what later documents take from it.
5. **It reports the failures** at the end. A row that is not a supply chain document at all is skipped without a message.

## Setting it up as a task schedule

1. Open **Basic → Settings → Task Schedule** and create a new task of type **Action**.
2. On the **Action** tab, paste the whole script from the file above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Fill in Parameter 2:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Query returning entityType, id - eg: select entityType, id from SalesInvoice where valueDate >= '20260101' | An SQL query whose first two columns are the entity type and the id of each document. |

4. Save, then click [Run Now](/platform/automation-and-rules/scheduled-tasks#Running-a-Task-on-Demand). For a one-off repair, tick **Inactive** first: **Run Now** still works, and the task does not run on a schedule.

## Example

A customer's sales order `SO-1045` still shows 40 units open although two invoices covered the full quantity. To rebuild the tracking of every invoice made from that order:

```sql
select i.entityType, i.id
from SalesInvoice i
where i.fromDoc_type = 'SalesOrder' and i.fromDoc_Code = 'SO-1045'
```

After the run, the order's remaining quantity is calculated again from the invoices that really exist. Start with a narrow query like this one, check the result on screen, and only then widen it to a date range.

On the demo database a sales return's tracking entry was deleted and its invoice line was set back to "2 units open". One run of the script on that return created the entry again and the invoice line showed 0 open. A second run changed nothing.

## The script

<<< @/public/groovy-examples/EAUpdateQtyTrackingEffectsFromQuery.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Scheduled Tasks](/platform/automation-and-rules/scheduled-tasks)
- [Business Requests](/platform/background-processing/business-requests): for a document whose stock or ledger effect failed, rather than its quantity tracking.

</div>
