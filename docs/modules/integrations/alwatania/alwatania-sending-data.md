---
description: "How master data and sales invoices reach Alwatania Distributors: preparing the master data, the three ready-made actions run from a scheduled task or an entity flow, example setups for each, and what happens when a parameter is wrong."
---
# Sending Master Data and Invoices to Alwatania

The Alwatania config screen has no Send button. Data leaves Nama only when one of three
ready-made actions runs:

| Action | What it sends | Where it runs |
|---|---|---|
| `EASendMasterDataToAlwatania` | Every new or changed record of the master data types you ask for | A [Task Schedule](/platform/automation-and-rules/scheduled-tasks) of type **Action** |
| `EASendMasterDataRecordToAlwatania` | The one master record that was just saved, if the platform does not have it yet | An [Entity Flow](/platform/entity-flows/introduction-to-entity-flows) on that master file, target action **Post Commit** |
| `EASendInvoicesToAlwatania` | The sales invoices and returns a query selects, if they were not accepted before | A Task Schedule of type **Action** |

A typical installation uses two schedules — one for master data, one for invoices — and optionally
entity flows so that new customers and items reach the platform the moment they are saved.

In a task schedule, set **Task Type** to *Action* and put the action in **Class Name**; in an
entity flow, put it in the **Class Name** column of a detail line. The field needs the action's
**full name** — `com.namasoft.modules.integrations.utils.actions.` followed by the short name, for
example `com.namasoft.modules.integrations.utils.actions.EASendInvoicesToAlwatania`. The short name
on its own is not found. The easiest way is to type the short name into the field and pick the
full name from its suggestion list. Parameters are typed as plain
text into **Parameter 1**, **Parameter 2**, … — the config is referred to by its code, typed in,
not picked from a list. The parameter titles and the description the screen shows for each action
are in English only.

## Before the first run: prepare the master data

The mapping from Nama records to the platform is fixed (see
[the overview](./alwatania-overview#How-the-data-maps-onto-the-platform)), so a clean result
depends on how the Nama records are filled in:

- Give every customer a **Customer Class 5**, a **group** and a **salesman**. They become the
  client's class, branch and salesman on the platform.
- Put the **salesman** on the sales invoices and returns too.
- Give every sales document a **customer**.
- Make sure every unit you sell an item in is on that item's **Units** grid. The item details the
  platform checks invoice lines against are built from that grid.

## Sending master data on a schedule

`EASendMasterDataToAlwatania` sweeps whole master files. Run it once for the initial full push,
then leave it on a schedule to carry every later change.

| Parameter | What to enter | Required |
|---|---|---|
| **1** | The config code (or id), e.g. `ALW01` | Yes |
| **2** | The type to send: `All`, or one of `Provinces`, `Cities`, `Branches`, `Regions`, `ClientClasses`, `Salesmen`, `Clients`, `Items`, `ItemDetails`. The field suggests these values | Yes |
| **3** | Optional query that narrows which records are considered. It returns two columns, the entity type and the id | No |

With **All**, one schedule sends every type in the order the platform needs them: provinces,
cities, branches and regions, client classes, salesmen, clients, items, item details. With no
query, every record of each type is considered — but only records that are new, changed since
their last successful send, or refused last time are actually sent, so running the schedule every
few minutes or every night costs little.

The query in parameter 3 lets each master file carry its own condition. A table the query leaves
out is not sent at all. The rows can come back in any order; the types are still sent in the
platform's order.

```sql
-- Only sellable items, and only customers changed since the start of the year
select entityType, id from InvItem where sellable = 1
union all
select entityType, id from Customer where lastUpdateDate >= '2026-01-01'
```

```sql
-- Branches: send the customer groups only
select entityType, id from MasterGroup where forType = 'Customer'
```

When you use a query with parameter 2 set to `All`, list every table you want sent — legal
entities, groups, analysis sets, customer classes, employees, customers and items.

::: info Work in batches, one run at a time
Records go out in batches of the config's **Master Data Batch Size** (1000 by default), each batch
saved on its own: a batch that fails does not undo the batches before it, and the run carries on
with the next one. The progress reads
`Sending {type} {from} to {to} of {n} to Alwatania`, and the run can be stopped from the task
monitor like any other. Only one run of this action can be in progress at a time.
:::

### Example task schedule

- **Task Type:** Action
- **Class Name:** `com.namasoft.modules.integrations.utils.actions.EASendMasterDataToAlwatania`
- **Parameter 1:** `ALW01`
- **Parameter 2:** `All`
- **Parameter 3:** *(empty)*
- **Schedule:** every night, or every hour if the platform must see new customers quickly

Use [Run Now](/platform/automation-and-rules/scheduled-tasks#Running-a-Task-on-Demand) for the first full push rather
than waiting for the schedule.

## Sending a master record as it is saved

`EASendMasterDataRecordToAlwatania` sends the record the flow runs on — a customer the moment it is
saved, rather than at the next sweep. Put it in an Entity Flow on one of **Legal Entity**,
**Group**, **Analysis Set**, **Customers' Class 5**, **Employee**, **Customer** or **Item**, with
**Target Action** set to **Post Commit**.

| Parameter | What to enter | Required |
|---|---|---|
| **1** | The config code (or id) | Yes |
| **2** | Leave empty: the type is read from the record (a legal entity goes as both a province and a city). Fill it only to restrict a record to one of the types it could be sent as; the suggestions list only the types valid for the flow's screen | No |

Two things to know about it:

- **It sends new records only.** A record the platform already holds is left alone, even when the
  flow runs again on a later edit. Changes reach the platform through the scheduled sweep.
- **It sends the record on its own**, not the records it points at. A new customer arrives with a
  reference to its city, branch, class and salesman, so those must already be on the platform. Run
  the full sweep once **before** switching the flow on, and keep the sweep scheduled: it also
  catches anything a flow did not get across.

### Example entity flow

- **Entity type:** Customer
- **Target Action:** Post Commit
- **Class Name:** `com.namasoft.modules.integrations.utils.actions.EASendMasterDataRecordToAlwatania`
- **Parameter 1:** `ALW01`

## Sending invoices and returns

`EASendInvoicesToAlwatania` sends the sales documents its query selects.

| Parameter | What to enter | Required |
|---|---|---|
| **1** | The config code (or id) | Yes |
| **2** | A query returning the entity type **first** and the id **second** | Yes |

```sql
-- Yesterday's and today's invoices and returns
select entityType, id from SalesInvoice where valueDate >= dateadd(day, -1, getdate())
union all
select entityType, id from SalesReturn where valueDate >= dateadd(day, -1, getdate())
```

Keep the column order exactly as shown — entity type, then id — and select from **Sales Invoice**
and **Sales Return** only. Each document says for itself whether it goes as a `Sale` or a
`Returned` invoice.

What happens on each run:

1. **Documents already accepted are skipped.** The query can safely overlap previous runs (the
   two-day window above does): a document the log shows as accepted is never sent twice. This also
   means that once a document is accepted, later edits to it in Nama are not sent.
2. **Documents that failed before are sent again**, and their existing log row is updated.
3. Documents go out in batches of the config's **Invoices Batch Size** (5000 by default), each
   batch saved on its own. A request that would be too big for the platform is split
   automatically.
4. **One bad document does not sink the batch.** The platform checks a whole batch before it
   stores any of it. When it names the document it refuses, Nama logs that document as refused,
   takes it out, and sends the rest again.
5. At the end of the run, every document that was not accepted is tried once more. Anything still
   refused stays on its own row of the Invoices Send Log with the platform's reason, and the run
   ends with a summary of how many were refused.

::: warning Run the invoice action from a schedule only
Only one run of this action can be in progress at a time. Run it from a task schedule; if it were
also placed on an entity flow on the sales invoice, saving an invoice while the scheduled run is
working would fail.
:::

### Example task schedule

- **Task Type:** Action
- **Class Name:** `com.namasoft.modules.integrations.utils.actions.EASendInvoicesToAlwatania`
- **Parameter 1:** `ALW01`
- **Parameter 2:** the query above
- **Schedule:** every hour, or every night

## When a parameter is wrong

The screen checks the parameters when you save the schedule or the flow:

- An unknown type in parameter 2 of the master data action is refused with a message listing the
  accepted values, and so is a parameter 3 that is not a `select` query.
- `EASendMasterDataToAlwatania` refuses to be placed on an entity flow on one of the master files it
  sweeps — it ignores the record and would send the whole table on every save. Use
  `EASendMasterDataRecordToAlwatania` there.
- `EASendMasterDataRecordToAlwatania` refuses any screen other than the seven master files above.

The messages raised while sending are listed in
[Send logs and resending](./alwatania-send-logs#Messages-you-may-see).
