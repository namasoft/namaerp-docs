---
description: "Creating a Virtual Entity from one SQL SELECT so it can be used like a real table in the Report Wizard and Dashboard Widget Wizard: the Edit Mappings dialog, column mapping, what happens on save, a worked report example, pitfalls and who should have access."
entities: [VirtualEntity]
menu: Administration → Reports → Virtual Entity
---
# Virtual Entities — Reusable SQL Building Blocks for Reports & Dashboards

You've probably been here before: the same complex SQL query keeps showing up in five different report-wizard records and three dashboard widgets. Every time you tweak it, you have to remember every place that copy lives. And the wizard's table picker only ever lists *real* entities like `SalesInvoice` or `CostInTransLine` — so anything that needs a `UNION`, a hand-rolled join, or a per-row sign flip has to keep being re-written by hand inside each widget's SQL editor.

**Virtual Entities** solve that. You write one SELECT (as fancy as you want — `UNION`, `JOIN`, expressions, aggregates, the lot), give it a code and a name, and the system turns it into a first-class entity. From that moment on, it shows up in the Report Wizard's main-table picker and in the Dashboard Widget Wizard *exactly like a real table* — same field selector, same auto-joins on reference fields, same translations, same parameters panel.

---

## The Big Idea in One Example

Suppose you want to analyze stock movements that come from two different transactions: in-transit cost arriving (`CostInTransLine`, positive quantities) and in-transit cost leaving (`CostOutTransLine`, negative quantities). There's no single physical table that gives you both with a unified sign convention. So you write:

```sql
select l.totalCost, l.totalQty, l.item_id, l.legalEntity_id, l.valueDate
from CostInTransLine l
union all
select l.totalCost * -1, l.totalQty * -1, l.item_id, l.legalEntity_id, l.valueDate
from CostOutTransLine l
```

You save this as a Virtual Entity called `InTransitMovements`. Behind the scenes, the system creates a SQL Server view named `vw_InTransitMovements`, registers a new entity definition pointing at that view, and adds it to the model the wizards consult.

Now in the Report Wizard, you pick "Main Table → InTransitMovements", and you get:

- A field called `item` typed as `Reference → InvItem` (because `item_id` on the source table mapped to that property).
- A field called `legalEntity` typed as `Reference → LegalEntity`.
- A field called `valueDate` typed as `Date`.
- Numeric fields `totalCost` and `totalQty`.

You can drop them into a report, group by `item`, sum the cost and quantity, and you're done. No raw SQL anywhere in the report. The same Virtual Entity is also pickable from the Dashboard Widget Wizard — same auto-join behavior, same translations, same drill-down support.

The SELECT itself follows the usual rules for Nama tables: documents filtered on `commitedBefore = 1`, lines joined to their header for the status, amounts from the ledger and quantities from the stock movements. They are collected on [Querying Nama Tables with SQL](/platform/reports/querying-nama-tables).

---

## Where to Find It

The Virtual Entity screen lives under **Administration → Reports**, next to Report Wizard and Data Source. Open it like you would any other master file: click **New**, fill in the header, and you're in business.

The header has just a handful of fields:

- **Code** — short identifier, letters/digits/underscore only, must start with a letter. The system uses this to name the underlying view (`vw_<code>`) and as the entity's type name. Treat it as permanent: nothing stops you from editing it after the first save, but nothing renames anything either — you get a second view under the new name while the old view, and every report pointing at it, stays behind. If you need a different code, create a new Virtual Entity (see [What's Coming Later](#Whats-Coming-Later)).
- **Arabic Name** / **English Name** — what users will see in the wizard's table picker, in field labels, and in screen titles.
- **SQL Query** — the SELECT statement that defines the entity. Multi-line; use `UNION`, `JOIN`, expressions, aggregates — whatever you need.
- **Materialization** — for now, only `View` works. `Table` is still listed in the dropdown and you can pick it, but the save is rejected with a message telling you to use `View`; it is reserved for a future phase that will materialize the data into a refreshable physical table.

After filling these in, click **Save**. Then, to map the SELECT columns to entity properties, click the **Edit Mappings** button at the top of the screen. That opens the editor where the real magic happens.

::: warning Edit Mappings needs the new UI
The mappings editor is part of the new user interface. Open the Virtual Entity screen there and the
button opens the dialog described below. Press it from the old interface and you get an error saying
the editor is available in the new UI only — the old interface has no way to show it. If you cannot
move to the new UI, fill the **Column Mapping** field by hand instead; its exact format is
[documented below](#The-Column-Mapping-field).
:::

::: tip When you only want the answer, not a whole table
A Virtual Entity gives the wizards a new *table* to build reports and widgets on. If what you actually want is a single number or piece of text from a query shown on a screen — the customer's outstanding balance beside their name on the invoice, or an extra column in a list view — that is a **calculated field**, defined in [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-calculated-fields). Same idea, much smaller: you write the query once and the answer appears on the record, with no report in between.
:::

---

## The Edit Mappings Dialog

The dialog has two halves stacked vertically.

![The Edit Mappings dialog after Bootstrap: the SQL on top, the proposed properties below](../../ar/platform/images/automation-and-rules/virtual-entity-edit-mappings-en.png)

### Top — The SQL Editor

A Monaco editor (the same one that powers VS Code) with SQL syntax highlighting, autocomplete, and full-screen height. Edit your query freely; the system parses it as you type so it can spot which columns each property is mapped to.

Above the editor, the **Bootstrap** button does the heavy lifting: it parses the entire SELECT, walks every column in the result set, figures out which physical table and column each one came from, looks up the matching property on that table's entity definition, and proposes a complete property list. Click it and the bottom half fills up with suggested mappings.

::: tip
Bootstrap is the recommended starting point. You almost never want to type out twenty property mappings by hand when the parser can derive them all from your SQL. Think of it like the "Select Fields" button in the Report Wizard — same idea, applied to virtual-entity columns.
:::

If your SQL doesn't parse, the editor shows a parse error in red just above it. The Bootstrap button still works in that case, but the proposals will mostly come back as `Unresolved` — you'll need to fill in the property details by hand.

### Bottom — The Property List

This is the table that defines what fields the wizard will see. Each row is one property, with these columns:

| Column | What it does |
|---|---|
| **Column Name** | The name of the column in the SELECT list (or its alias). This is the system's link between the property and the underlying view column. |
| **Full Name** | The property's logical name — e.g., `item`, `legalEntity`, `valueDate`. This is what shows up in field IDs (`InTransitMovements.item.code`, etc.). |
| **Field Type** | `Reference`, `Decimal`, `Text`, `Date`, `Integer`, `Boolean`, etc. Reference types unlock auto-joins in the wizard. |
| **Reference To** | Only relevant when the field type is `Reference` — the entity this column points to (e.g., `InvItem` for an `item` column). |
| **Arabic Name / English Name** | The translations users will see in the wizard's field picker. |

Two ways to add rows:

1. **Click "Add Column"**. An empty row appears. The Column Name control on that row is a picker over the columns the parser found in your SQL — unmapped ones first (highlighted), then already-mapped ones marked "pick to overwrite". Picking a column runs single-column bootstrap and fills the rest of the row.
2. **Use Bootstrap**. As described above — replaces the whole list with the parser's proposal.

If you bootstrap and rows already exist, the system asks for confirmation first. Same for picking a column on a row that already has a bootstrap-derived mapping — it asks before clobbering your work.

### Orphan Flagging

If you edit your SQL after mapping properties, and a property's `Column Name` no longer matches any column in the new SELECT list, the row gets badged with a warning: *"This column is no longer in the current SQL query."* The system doesn't auto-remove anything — you decide whether to re-bootstrap, pick a replacement column, or delete the row.

The re-parse runs ~2.5 seconds after you stop typing, so the badge updates as you work.

### The Column Mapping field

Everything the dialog builds ends up in one place: the **Column Mapping** field on the entity screen,
which holds the property list as JSON. Normally you never look at it — clicking **OK** in the dialog
writes it for you. It matters in two situations: you are on the old interface and cannot open the
dialog at all, or you are creating virtual entities from an import file.

The value is a JSON **object** with a single `properties` list, one entry per column:

```json
{
  "properties": [
    {"columnName": "item_id", "fullName": "item", "fieldType": "Reference",
     "referenceTo": "InvItem", "arabicName": "الصنف", "englishName": "Item"},
    {"columnName": "valueDate", "fullName": "valueDate", "fieldType": "Date",
     "referenceTo": null, "arabicName": "التاريخ", "englishName": "Value Date"},
    {"columnName": "totalCost", "fullName": "totalCost", "fieldType": "Decimal",
     "referenceTo": null, "arabicName": "التكلفة", "englishName": "Total Cost"}
  ]
}
```

- **`columnName`** must match the column's name (or alias) in the SELECT list exactly — this is what
  links the property to the view's column.
- **`fullName`** is the logical field name the wizard shows and builds field IDs from.
- **`fieldType`** is one of the standard field types, spelled exactly: `Text`, `Integer`, `Long`,
  `Decimal`, `Boolean`, `Date`, `Time`, `DateAndTime`, `Reference`, `BigText`, `Enum`.
- **`referenceTo`** names the target entity and only applies when the type is `Reference`; leave it
  `null` otherwise.
- **`arabicName` / `englishName`** are the labels users see in the field picker and as report column
  headers.

::: warning The wrapper is not optional
A bare array — `[{"columnName": …}, …]` without the surrounding `{"properties": …}` — is the
mistake people make most often. The save is now rejected with a message telling you so, but on
releases before that check landed it was accepted silently and produced a virtual entity with no
usable columns at all.
:::

---

## How Bootstrap Resolves Each Column

Understanding what the parser does makes it much easier to predict its output.

For a plain column reference like `l.item_id` from `CostInTransLine l`:

1. The parser sees `item_id` belongs to alias `l`, which is `CostInTransLine`.
2. It looks up `CostInTransLine` in the data model and finds the property whose underlying column is `item_id` — that's `item`.
3. It copies that property's full name (`item`), its type (`Reference`), its target entity (`InvItem`), and its Arabic/English labels into the proposal.
4. It overrides the `Column Name` on the proposal to whatever alias you used in the SELECT list, so the view's column name lines up.

Result: a fully-resolved row that needs no manual editing.

For an aggregate like `SUM(l.totalCost)`:

The parser tags this as `Aggregate Numeric`. The proposal gets `Decimal` as the field type, no reference target, and uses the SELECT alias as the column name. You may want to fill in a friendlier label.

For an expression like `l.totalCost * -1`:

If the expression wraps a single underlying column, the parser still resolves to that column's property metadata — so `l.totalCost * -1` resolves the same way `l.totalCost` would. If the expression mixes multiple columns or uses a CASE statement, the parser falls back to a `Text` type with no reference, marking the proposal as `Expression Partial`. Fill in the rest by hand.

For a `UNION ALL` (or any set operation):

The parser walks each branch and resolves columns position-by-position. For position N, it walks the branches in order and **takes the first branch that produces a fully-resolved proposal**. That's why this works:

```sql
select 0 as x from a
union all
select x from b
```

Branch 1 has a constant at position 0 (no source column). Branch 2 has `b.x`. The merger picks branch 2's resolution.

---

## What Happens When You Save

Saving runs three things:

1. **Validation** — Code shape, no name collision with an existing entity, materialization is `View`, SQL is non-empty.
2. **Data-model XML rebuild** — The mapping JSON is converted into a `DMEntity` definition (the same shape every other entity has) and stored on the record.
3. **View DDL** — The system runs `DROP VIEW IF EXISTS dbo.vw_<code>` followed by `CREATE VIEW dbo.vw_<code> AS <your SELECT>` inside the same database transaction as the entity save. If the view DDL fails — bad syntax, missing column, illegal `ORDER BY` without `TOP`, permission issue — the whole transaction rolls back and you see the SQL Server error inline. Nothing partial gets persisted.

After the save commits, the data-model cache is rebuilt so the next call to the Report Wizard or the Dashboard Widget Wizard sees the new entity in their main-table picker. No restart, no manual cache clear.

::: tip Installations running on more than one application server
That cache refresh reaches the server that handled the save. If the installation runs several
application servers behind a load balancer, the others keep serving the model they already had, so a
brand-new virtual entity can be missing from the table picker for whoever lands on another server.
Restarting those servers clears it. If a virtual entity you just saved is nowhere to be found even
though its view exists in the database, this is the first thing to check.
:::

---

## Using Virtual Entities in the Report Wizard

Open the Report Wizard, click **Main Table**, and your virtual entity appears alongside the real ones. The picker shows them under the table type **`Virtual Entity`** (parallel to `Entity`, `Detail Line`, and `System Table`).

From there, everything works as if you were on a real table:

- **Field selection** — Click **Select Fields** and you'll see the property list you defined: `item`, `legalEntity`, `valueDate`, `totalCost`, `totalQty`. Reference fields auto-expand to give you `item.code`, `item.name1`, `item.name2`, etc.
- **Parameters** — Add `valueDate` as a parameter with `Between` filter type and you get the standard date-range prompt.
- **Aggregations** — Drop `totalCost` and `totalQty` in as measures, group by `item`, get a totaled report.
- **Translations** — The Arabic/English names you set on each property show up as the column headers.

See the [Report Wizard Guide](../reports/report-wizard-guide.md) for the rest of the wizard mechanics — they all apply unchanged.

---

## Using Virtual Entities in the Dashboard Widget Wizard

In the Dashboard module, when you create a widget backed by a wizard data source, the same main-table picker appears with your virtual entity listed. Once you pick it, every BI feature that wizard-backed widgets get — dimension drill-by, auto-inferred cross-filter columns, field-ID pickers — works against the virtual entity exactly as it would against a real one.

This is where Virtual Entities pay off the most: you build one once, and from then on you can spin up new dashboard widgets visually without touching SQL again.

For details on how wizard-backed widgets behave, see the [BI Module Guide](../bi/bi-module-guide.md#Data-Sources) and the [Wizard Mode reference](../bi/bi-module-technical-reference.md#13-Wizard-Mode).

---

## Worked Example — In-Transit Cost Movements Report

Let's walk the user-facing flow end to end with the SQL from the opening section.

### Step 1 — Create the Virtual Entity

Open **Virtual Entity** from the Basic module menu, click **New**, and fill in:

- **Code:** `InTransitMovements`
- **Arabic Name:** `حركات البضاعة في الطريق`
- **English Name:** `In-Transit Movements`
- **Materialization:** `View`
- **SQL Query:**

```sql
select l.totalCost, l.totalQty, l.item_id, l.legalEntity_id, l.valueDate
from CostInTransLine l
union all
select l.totalCost * -1, l.totalQty * -1, l.item_id, l.legalEntity_id, l.valueDate
from CostOutTransLine l
```

Save the header.

### Step 2 — Map the Columns

Click **Edit Mappings**. The dialog opens with the SQL already loaded. Click **Bootstrap**. The property list fills in:

| Column Name | Full Name | Field Type | Reference To |
|---|---|---|---|
| `totalCost` | `totalCost` | Decimal | — |
| `totalQty` | `totalQty` | Decimal | — |
| `item_id` | `item` | Reference | `InvItem` |
| `legalEntity_id` | `legalEntity` | Reference | `LegalEntity` |
| `valueDate` | `valueDate` | Date | — |

Click **OK**. The dialog closes; on the entity screen, click **Save**. The view `vw_InTransitMovements` is created and the entity registers itself in the data model.

### Step 3 — Build a Report

Open the Report Wizard, create a new wizard, and pick `In-Transit Movements` as the Main Table. Add fields:

- `this` — the entity reference (so you can drill down)
- `item` — auto-joined to `InvItem` because the property is a reference
- `valueDate`
- `totalQty` (with `Sum` aggregation)
- `totalCost` (with `Sum` aggregation)

Add `valueDate` as a parameter with filter type `Between`. Save and run. You get a per-item summary of net in-transit movement over your selected date range, with no raw SQL anywhere in the wizard.

---

## Edge Cases & Common Pitfalls

| Situation | What happens |
|---|---|
| Your SQL has a syntax error | The editor shows the parser's complaint inline. You can still save, but the view DDL will then fail and surface the SQL Server error. |
| You reference a column that no longer exists in the source table | The view DDL fails on save. Fix your SELECT and try again. |
| Your SQL has `ORDER BY` without `TOP` | SQL Server rejects this in views. The save fails with the SQL Server error. Move the sort to the consuming report instead. |
| You build a virtual entity that references another virtual entity | Allowed. The DB enforces non-cyclic dependencies — if you accidentally create a cycle (A → B → A), the second `CREATE VIEW` fails. |
| Two users save the same Virtual Entity at the same time | Standard optimistic-locking conflict; one save wins, the other sees a version mismatch error. |
| You save with zero properties mapped | Allowed. The view is created but the entity has no usable fields in the wizard. Add columns later. |
| Your SQL contains a `:placeholder` parameter | Nothing stops the save at validation, but SQL Server will not accept a placeholder inside a view, so the view DDL fails and the save fails with its error. Virtual Entity SQL has to be self-contained — put the prompting on the consuming report's parameters instead. |
| You change the **Code** after first save | Accepted, and almost never what you want: a second view is created under the new name, the old view stays in the database, and reports built on the old code keep pointing at it. Create a new Virtual Entity instead. |
| Your **Column Mapping** JSON is malformed or is a bare array | Rejected at save with a message naming the problem. Older releases accepted it silently and left the entity with no columns. |

---

## Trust Model — Who Should Have Access

A Virtual Entity definition runs SQL inside the application's database connection. There's no sandbox: whatever the application user can do, the Virtual Entity's SELECT can do. That means:

- Restrict the **Virtual Entity** menu and entity-edit permissions to power users / admins.
- Don't expose the entity-creation screen to roles you wouldn't trust to write arbitrary read-only SQL against the production database.
- The view created from the SELECT is a *normal SQL view* — anyone who can read its rows can query it freely once it exists, but creating/editing the definition is what needs gating.

---

## What's Coming Later

Phase 1 ships Virtual Entities as **views only**. The JSON config already carries forward-compatible fields for the next phase, so anything you save now will round-trip cleanly when these features land:

- **Materialization → Table** — physical pre-aggregated tables for queries that are too expensive to run on every dashboard load.
- **Refresh policies** — manual, scheduled (cron), or on-write refresh of materialized tables.
- **Index management** — define indexes on the materialized table for query performance.
- **Code rename** — drop the old view and create a new one in a single transaction.
- **Dependency tracking** — see which reports, dashboards, and other virtual entities depend on a given virtual entity before you change or delete it.

For now, treat materialization as a roadmap signal: `Table` is listed in the dropdown but saving with it is rejected.
