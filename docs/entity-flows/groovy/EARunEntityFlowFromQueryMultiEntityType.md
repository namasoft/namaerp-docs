---
title: Run Several Entity Flows on Records From a Query
module: core
entities: [EntityFlow, TaskSchedule]
groovy: recommended
description: A Groovy script that runs several manual entity flows on every record a query returns, even when the records are of different types.
---

<div class='entity-flows'>

# Run Several Entity Flows on Records From a Query

This Groovy script runs one or more manual entity flows on every record that an SQL query returns. The records can be of different types: each one gets only the flows that are meant for its type.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is and control it entirely through its parameters.
:::

| | |
|---|---|
| **Class name** | `EARunEntityFlowFromQueryMultiEntityType` |
| **Script** | [EARunEntityFlowFromQueryMultiEntityType.groovy](/groovy-examples/EARunEntityFlowFromQueryMultiEntityType.groovy) |
| **Runs on** | Any record. Usually it is attached to a task schedule. |
| **Uses** | Parameter 2 and Parameter 3. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

The built-in [EARunEntityFlowFromQuery](/entity-flows/core/EARunEntityFlowFromQuery) runs a single flow on a list of records. That is enough when every record is of the same type. This script covers the case where it is not.

Suppose a customer has a manual flow `RECALC-INV` that refreshes some fields on sales invoices, and a matching flow `RECALC-RET` for sales returns. They want both to run every night on the documents of the previous day. With the built-in action that takes two task schedules. With this script it takes one: give it both flow codes and one query that returns the invoices and the returns together. Each invoice gets `RECALC-INV`, each return gets `RECALC-RET`.

It is also more useful when something goes wrong. The built-in action reports only *how many* records failed. This script reports the actual error of every record that failed.

## How it works

1. **It finds the flows.** It looks up each code in Parameter 2. If any code is not found, it stops before touching a single record.
2. **It runs the query.** The query in Parameter 3 must return the record's entity type in its first column and the record's id in its second.
3. **It handles each record on its own.** Each record is processed in its own transaction, so a record that fails is rolled back without undoing the records before it.
4. **It picks the flows for that record.** It tries the flows in the order you listed them. A flow is skipped when its **Target Type** is a different type and its **Entity Type List** does not include the record's type. A flow is also skipped when it does not apply to the record: it is inactive, its criteria or **Apply When Query** do not match, or its dimensions, book or term are different.
5. **It runs every flow that remains** as a manual run. The flow's **Requires Commit On Manual** setting is respected. If a flow fails, that record is rolled back and the script moves on to the next record.
6. **It reports at the end.** You get the messages of every record that failed. A record that none of the flows applied to is reported too.

While the script runs, its progress (record *n* of *total*) is listed under **Monitor Current Tasks**. Pressing **Kill** there stops the run before the next record, with the message `Marked for kill`. See [When the System Is Slow](/admin/troubleshooting/system-is-slow#What-the-server-is-doing-right-now).

::: warning The flows must have a Manual line
The script runs each flow the way a user would run it manually. A flow with no active element whose target action is **Manual** does nothing, and the run does not count that as a failure.
:::

## Setting it up as a task schedule

1. Open **Basic → Settings → Task Schedule** and create a new task of type **Action**.
2. On the **Action** tab, paste the whole script from the file above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Fill in the parameters:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Ignore | Nothing. |
| Parameter 2 | Entity Flow Codes (csv) | The codes of the manual flows, separated by commas and with no spaces, for example `RECALC-INV,RECALC-RET`. |
| Parameter 3 | Query, eg: select entityType,id from SalesInvoice where dueDate = getdate() | An SQL query whose first two columns are the entity type and the id of each record to process. |

4. Save the task. **Class Name** now shows `EARunEntityFlowFromQueryMultiEntityType`, the description appears under **Action description**, and each parameter shows its title.
5. To test it, click [Run Now](/platform/automation-and-rules/scheduled-tasks#Running-a-Task-on-Demand) and check the result before you set a schedule.

The same script also works as an element of an entity flow. Paste it into the **Groovy Script** column of the **Details** grid on **Administration → Display Customization → Entity Flow**. The parameters stay the same.

## Example

This query processes the sales invoices and the sales returns dated yesterday:

```sql
select entityType, id from SalesInvoice where valueDate = cast(getdate() - 1 as date)
union all
select entityType, id from SalesReturn where valueDate = cast(getdate() - 1 as date)
```

With Parameter 2 set to `RECALC-INV,RECALC-RET`, every invoice runs whichever of the two flows targets sales invoices, and every return runs the one that targets sales returns. A flow whose entity type list covers both types runs on both.

## Messages you may see

None of these messages has an Arabic translation, so they appear in English on Arabic screens as well.

| Message | Why | What to do |
|---|---|---|
| *Could not find entity flows with codes {0}* | At least one of the codes in Parameter 2 does not exist. `{0}` is the whole parameter as you typed it. | Check the codes. Remove any spaces after the commas. |
| *Could not find a flow for entity {0}* | None of the listed flows applied to this record. Either its type did not match or its conditions did not. | Check the flows' target type, entity type list, criteria and dimensions against this record. |
| *Marked for kill* | Somebody pressed **Kill** on the task in **Monitor Current Tasks**. | Run it again. Records that were already processed stay processed, so narrow the query if the flows should not run twice. |

## The script

<<< @/public/groovy-examples/EARunEntityFlowFromQueryMultiEntityType.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [EARunEntityFlowFromQuery](/entity-flows/core/EARunEntityFlowFromQuery): the built-in single-flow version.
- [Scheduled Tasks](/platform/automation-and-rules/scheduled-tasks)

</div>
