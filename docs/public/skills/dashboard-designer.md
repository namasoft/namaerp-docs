---
name: dashboard-designer
description: >
  Design and build Nama ERP BI dashboards: cross filters, widgets (charts, tables, KPI cards, filter
  controls, text blocks) and the dashboard layout. Use this skill whenever the user asks for a dashboard,
  "داشبورد", "لوحة معلومات", a chart or KPI "on a dashboard", or to fix a widget that shows wrong, empty or
  unfiltered figures. A dashboard is always built inside Nama (DashBoard + DashBoardWidget records), never as a
  local HTML page, unless the user explicitly asks for a local page.
---

# Dashboard Designer

Build Nama BI dashboards that work the first time they are opened: the right widget type, SQL that the
cross filters can reach, a chart configuration the server can fill, and a layout that does not squash tables.

---

## Step 1 — Read Before Writing

Load only what the task needs. In the support knowledge base the pages are under `namaerp-docs/docs/platform/bi/`;
live: `https://docs.namasoft.com/platform/bi/<page>.html`.

| Page | Load it for |
|---|---|
| `bi-module-technical-reference.md` | the JSON shapes: `chartConfigJSON` (§1), SQL (§2), `dataMapping` per type (§3), click emission (§4), drill-down (§5), bindings (§6), `BICrossFilter` (§8), widget types (§9), import format and layout (§10), a complete example (§11) |
| `bi-reference-wizard-mode.md` | widgets fed by a Dashboard Widget Wizard instead of SQL |
| `bi-reference-enhanced-table.md` | `EnhancedTable` columns, formatting, pivot |
| `bi-reference-enhanced-metrics-card.md` | `EnhancedMetricsCard` KPI cards |
| `bi-module-guide.md` | what the user sees: designer, filter bar, drill-down, dashboard groups on the menu |

**Schema.** Read each table from the data model, never from memory: `namaerp-dm/docs/public/dm-json/<Entity>.json`
(find the entity in `index.json` or `llms.txt` first). `table` is the header table and each field's `column` is the
real column. Every grid is an entry of `details` with its own `table` and a `joinColumn` that holds the header id:
`SalesInvoiceLine l JOIN SalesInvoice h ON h.id = l.salesInvoice_id`. `name1` is the Arabic name, `name2` the English.
All SQL is T-SQL (SQL Server).

---

## Step 2 — Pick the Widget Type

| The user wants… | `type` | Needs `chartConfigJSON` |
|---|---|---|
| a chart (bar, line, pie, gauge, funnel, heatmap, radar, scatter, treemap…) | `EChart` | yes: `echartOption` + `dataMapping` |
| a grid with formatting, renderers, totals or a pivot | `EnhancedTable` | yes: `columns`, `tableOptions` |
| a plain grid, columns straight from the SQL | `Table` | no |
| KPI cards | `EnhancedMetricsCard` | yes: the card definitions |
| a filter tile on the dashboard | `CrossFilterControl` | no — only `crossFilterRef` |
| a heading or explanatory text | `TextBlock` | yes: `html` / `htmlEn` |

`dataSource` (the SQL) is required for every type except `CrossFilterControl`, `TextBlock`, `Report`, `CardMenu`
and `RecentVisits`, and except when the widget has a `wizardDataSource`.

For an `EChart`, the `dataMapping.type` decides which `$DATA.*` placeholders the server fills
(technical reference §3):

| Chart | `dataMapping.type` | Placeholders |
|---|---|---|
| bar / line / area, one series per measure column | `CategoryValue` | `$DATA.categories`, `$DATA.series[i].data`, `$DATA.series[i].name` |
| bar / line, series taken from the values of a column (stacked, grouped) | `CategoryLabelValue` | `$DATA.categories`, `$DATA.series` |
| pie, donut, funnel, treemap | `LabelValue` | `$DATA.values` |
| two-ring pie | `NestedLabelValue` | `$DATA.innerValues`, `$DATA.outerValues` |
| one gauge / one gauge per row | `Gauge` / `GaugeMulti` | `$DATA.value`, `$DATA.min`, `$DATA.max` / `$DATA.values` |
| scatter, heatmap, radar, waterfall, twin funnel | `Scatter`, `Heatmap`, `Radar`, `Waterfall`, `FunnelComparison` | see §3 |
| anything else from raw rows / a static chart | `Custom` (or `Tree`) / `Raw` | `$DATA.rows`, `$DATA.columns` / none |

The SQL column names must be exactly the names in `dataMapping` (`categoryColumn`, `valueColumn`, `series[].column`…).
Start from a §12 pattern in the technical reference and change only what the request needs.

---

## Step 3 — Write the SQL

1. **`/*AND-FILTERS*/` goes in the `WHERE` clause**: `WHERE 1=1 /*AND-FILTERS*/`. Saving a widget that has cross
   filter bindings without it is refused. At run time every occurrence is replaced by the same text — nothing when
   no filter is set, otherwise ` AND <cond1> AND <cond2>…` — so a query with CTEs or subqueries needs the placeholder
   in **every** CTE or subquery that reads a filtered table.
2. **The condition is the filter's `sqlLeftHandSide` written verbatim**, then the operator and a bound value. So the
   alias in `sqlLeftHandSide` (`l.branch_id`) must exist at every place the placeholder sits. If two CTEs alias the
   table differently, give the binding its own `sqlLeftHandSide` or align the aliases.
3. **A Reference filter binds the record id**, so its `sqlLeftHandSide` is an id column (`l.branch_id`, `cc.id`),
   never a code or name column.
4. **Committed documents only.** Detail lines carry no status column. Join the header and add
   `h.commitedBefore = 1`. The other table conventions (names, amounts, quantities) are in
   `namaerp-docs/docs/platform/reports/querying-nama-tables.md`.
5. **Top N:** `SELECT TOP 10 … ORDER BY <measure> DESC`. Without `ORDER BY` the order is undefined.
6. **`{name}` is a widget parameter** — a line of the widget's inputs grid. A `{name}` that is not one of them is
   bound to NULL and the condition silently matches nothing. Never put `{` or `}` inside `sqlLeftHandSide`: they
   are the parameter syntax.

---

## Step 4 — Write `chartConfigJSON`

- **Shape** (technical reference §1): `echartOption` (a normal ECharts option with `$DATA.*` placeholders),
  `dataMapping`, and optionally `clickEmitMapping`, `clickAction`, `drillDownMapping`, `linkMappings`.
- **Nothing checks the JSON on save.** A typo saves fine and the widget fails when drawn with
  *Failed to build EChart option from chartConfigJSON*. Always preview (Step 7) before saving.
- **Wizard-backed widgets bind by field id, not column name.** When the widget has a `wizardDataSource`, use the
  `*WizardFieldId` keys (`categoryWizardFieldId`, `valueWizardFieldId`, …), `wizardFieldId` in `clickEmitMapping`,
  and a field path (`customer`, `customer.category`, `valueDate`) as the cross filter's left-hand side. A plain
  dotted name that resolves on the wizard's main table, or any name with two or more dots, is read as a field path;
  anything else is raw SQL. Details: `bi-reference-wizard-mode.md`.
- **Clicking a chart to filter the others** is `clickEmitMapping`: `crossFilterCode` plus, for a Reference filter,
  `idColumn` (and `codeColumn` / `name1Column` / `name2Column` / `entityType` for the chip). Select those columns in
  the SQL (§4).

---

## Step 5 — Cross Filters

A `BICrossFilter` is a master file; widgets list the filters they **respond to** in `crossFilterBindings`.

- **Operators that work:** `Equal` (default), `NotEqual`, `GreaterThan`, `GreaterThanOrEqual`, `LessThan`,
  `LessThanOrEqual`, `In`, `Contains`, `StartsWith`. Use no other operator.
- **Several values:** `listParam: true` with `operator: "In"`.
- **Date range:** one filter with `paramType: "Date"` and `showAsDateRange: true`. It produces
  `<lhs> >= from` and `<lhs> <= to` (each only when that end is set) and ignores `operator`. Its value is a preset
  (`ThisMonth`, `PreviousMonth`, `ThisYear`, `Last30`, …) or `yyyy-MM-dd@yyyy-MM-dd`.
- **Widget-level binding** (the normal one): `"crossFilterBindings": [{"crossFilter": "branchFilter"}]`, optionally
  with its own `sqlLeftHandSide`, `operator`, `customWhereClause` or `localScope`.
- **Dashboard-level binding** only overrides one widget on one dashboard and **requires `element`** (the widget
  code). Most dashboards have `"crossFilterBindings": []`.
- **`localScope: true`** moves the filter into that widget's own filter popup; the dashboard bar and other charts'
  clicks no longer drive it.
- **Filter tile:** a `CrossFilterControl` widget with `"crossFilterRef": "branchFilter"` — a bare code string.
  `crossFilterRef` is required on that type and must be empty on every other type. `autoCreateWidget: true` on the
  filter creates the tile for you on save.
- References between BI records (`crossFilter`, `crossFilterRef`, `element`, `wizardDataSource`, `subDashboard`)
  are written as bare code strings.

---

## Step 6 — Lay Out the Dashboard

`kind: "Single"` holds `charts` placements (`element`, `rowNumber`, `columnNumber`, `heightInRows`,
`widthInColumns`, all 1-based). `kind: "Tabbed"` holds `subDashboards`, each a Single dashboard; a Tabbed
dashboard cannot be a tab of another.

- **`rowsCount` is a divisor, not a cell count.** One row is the visible height ÷ `rowsCount`. Raising it makes
  every widget smaller; to make a widget taller raise its `heightInRows`.
- **When it scrolls:** extent = the largest `rowNumber + heightInRows - 1`. Extent ≤ `rowsCount` → one screen, never
  scrolls (a table squeezed into a small share shows almost no rows). Extent > `rowsCount` → the page is
  extent ÷ `rowsCount` screens tall and scrolls.
- `colsCount` divides the width the same way but never scrolls: keep `columnNumber + widthInColumns - 1 <= colsCount`.
- A good start: `rowsCount: 12`, KPI strip `heightInRows: 2`, charts `4`–`6`, a table `8`–`12`; let the extent
  run past `rowsCount` when the board has more than one screen of content.

---

## Step 7 — Deliver

### A Nama MCP server is connected

The dashboard tools come from the **AITDashboardTools** line of the server's AI Tool Definition; if
`<prefix>PreviewDashboardWidget` is not in your tool list, say so and follow the knowledge base's missing-tool rule.

1. **Preview each widget** with `<prefix>PreviewDashboardWidget`, `changes` =
   `{"type":"EChart","dataSource":"select …","chartConfigJSON":"{\"echartOption\":…}"}`. **`chartConfigJSON` is a
   JSON string** here too. Only the widget's text, number and yes/no fields can be changed: bindings, the wizard and
   other grids or references come from the saved widget, so a brand-new widget previews with no cross filters.
2. **Read the answer:** `series` / `table` / `card` is what would be drawn; `queries[].rows` is what the database
   returned before the chart grouped or cut it; `queries[].runnableSql` can be run as is with
   `<prefix>runReadOnlySqlQuery`. Rows right but chart wrong → fix `dataMapping`; rows wrong → fix the SQL.
   Iterate until the figures are right.
3. **Save** with `<prefix>ImportRecord` (shape from `<prefix>GetImportSchema`), `importMode: "CreateOnly"`, one call
   per type in dependency order: `BICrossFilter` → `DashBoardWidgetWizard` → `DashBoardWidget` → `DashBoard`. A
   reference code that matches no record fails that record, so the order matters.
   - **Stringify `chartConfigJSON`.** Through ImportRecord a nested object is read as a reference and the widget
     saves without its configuration.
4. **Check filters and the whole board:** `<prefix>RunDashboardWidget` with `dashboardCodeOrId` and
   `crossFilters` (`{"branchFilter":"01","docDate":"ThisMonth"}`: a record by its code, several values as an array,
   a widget-local filter as `code@widgetCode`, dates `dd-MM-yyyy`), then `<prefix>RunDashboard`. Each widget's
   `appliedCrossFilterCodes` shows which filters reached it.

### No Nama MCP server

Write one import file keyed `BICrossFilter`, `DashBoardWidgetWizard`, `DashBoardWidget`, `DashBoard` (in that
order). In a file, `chartConfigJSON` may be a nested object. The user imports it with **Import Records** from the
More menu of the DashBoard list (technical reference §11 "How to Import"). Exporting an existing dashboard with
**Export Dashboard JSON** gives a working template in the same format.

---

## Known Errors

| Symptom | Cause / fix |
|---|---|
| Save refused: *…its datasource does not contain the /\*AND-FILTERS\*/ placeholder.* | add `WHERE 1=1 /*AND-FILTERS*/` (Step 3.1) |
| Widget fails: *Failed to build EChart option from chartConfigJSON* | broken JSON or a key that does not match `dataMapping`; preview it |
| Widget saved but draws no chart | `chartConfigJSON` was sent as an object through ImportRecord, so it was not stored (Step 7.3) |
| Widget returns no rows, no error | a `{param}` in the SQL that is not in the inputs grid is bound to NULL; the run answer lists it under `unappliedParameters` |
| Filter set but figures unchanged | widget has no binding to it, the placeholder is missing from the CTE that reads the table, or the binding is `localScope` |
| Reference filter returns nothing | `sqlLeftHandSide` points at a code/name column instead of the id |
| `crossFilterRef` refused as empty or as not allowed | it is required on `CrossFilterControl` (a bare code string) and must be empty on every other type |
| *Sub Dashboard {0} is itself a Tabbed dashboard…* | tabs must be Single dashboards |
| RunDashboard says the server returned nothing | no widgets, no view right, or a debug server without `show-dashboards-in-debug-mode=true`; RunDashboardWidget still works |
| Table shows only its header | the dashboard fits one screen (extent = `rowsCount`); raise the table's `heightInRows` |
