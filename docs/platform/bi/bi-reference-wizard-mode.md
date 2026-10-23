---
description: "Reference for dashboard widgets built on a wizard data source, whose settings use wizard field IDs instead of SQL columns: metadata caching, data-mapping keys, click and drill-down, active dimensions, cross-filters, legacy coexistence, a complete example and runtime slot selection."
entities: [DashBoardWidgetWizard, DashBoardWidget]
---
# BI Reference — Wizard Mode

Companion to [`bi-module-technical-reference.md`](./bi-module-technical-reference.md). Load this only when authoring a widget whose `wizardDataSource` is set.

When a widget has a `wizardDataSource`, its `chartConfigJSON` references **wizard field IDs** instead of raw SQL column names. The backend resolves each ID to a SQL alias from cached metadata; SQL-mode widgets are unaffected by anything here.

## 1. Metadata caching

When a `DashBoardWidgetWizard` is saved, its `postCommitAction` runs `ReportWizardQuery.build()` once and stores per-field metadata in each line's (system) `fieldMetadata` JSON:

- `fieldId` — wizard field property path
- `chartUsage` — `Dimension` | `Measure`
- `paramType` — `Reference`, `Decimal`, `Text`, `Date`, `Integer`, `Genericreference`, `Enum`, `Boolean`
- `referencedEntityType` — reference fields only
- `aggregation` — `None`, `Count`, `Sum`, `Avg`, `Min`, `Max`, `DistinctCount`
- `displayAlias` — the SQL alias for the field's primary display column
- `subColumns` — reference fields only: aliases of auto-expanded id/code/name1/name2/entityType/value sub-columns
- `sqlLeftHandSide` — fully-qualified LHS used for cross-filter WHERE injection
- `arabicTitle` / `englishTitle` — pass-through

Render-time lookup deserializes the cached records — no `ReportWizardQuery` rebuild.

## 2. Data-mapping keys

For every column slot in §3 of the main reference, wizard mode adds a `*WizardFieldId` sibling:

| SQL key | Wizard sibling | Resolves to |
|---|---|---|
| `categoryColumn` | `categoryWizardFieldId` | `displayAlias` |
| `labelColumn` | `labelWizardFieldId` | same |
| `valueColumn` | `valueWizardFieldId` | same |
| `xColumn` / `yColumn` | `xWizardFieldId` / `yWizardFieldId` | same |
| `sizeColumn` | `sizeWizardFieldId` | Scatter bubble size |
| `innerLabelColumn` / `outerLabelColumn` | `innerLabelWizardFieldId` / `outerLabelWizardFieldId` | NestedLabelValue rings |
| `innerValueColumn` / `outerValueColumn` | `innerValueWizardFieldId` / `outerValueWizardFieldId` | NestedLabelValue measures |
| `leftValueColumn` / `rightValueColumn` | `leftValueWizardFieldId` / `rightValueWizardFieldId` | FunnelComparison |
| `series[].column` | `series[].wizardFieldId` | same |
| `maxResultsRankBy` | `maxResultsRankByWizardFieldId` | top-N ranking measure |

Both keys present → `*Column` wins. Tempo / period-comparison columns are not wizard fields; use `*Column` only — `wizardFieldId` is silently ignored.

```json
"dataMapping": {
  "type": "CategoryLabelValue",
  "categoryWizardFieldId": "valueDate",
  "labelWizardFieldId": "customer.customerCategory",
  "valueWizardFieldId": "price.netValue",
  "seriesType": "bar"
}
```

## 3. Click-emit & drill-down with `wizardFieldId`

```json
"clickEmitMapping": [
  { "crossFilterCode": "customerCategoryFilter", "wizardFieldId": "customer.customerCategory" }
]
```

For each entry with a `wizardFieldId`:

1. **Sub-column inference** — backend fills missing `idColumn`/`codeColumn`/`name1Column`/`name2Column`/`entityTypeColumn`/`valueColumn`/`entityType` from the cached `subColumns` + `referencedEntityType`.
2. **Per-dimension filtering** — entry only fires when its `wizardFieldId` is one of the chart's currently-active dimensions (see §4 below).

Entries without `wizardFieldId` are always-active (legacy SQL-mode behavior).

## 4. Active dimensions

The "currently active dimensions" list, in order:

1. If the request carries `drillDownByTargetDimension`, that field ID is first.
2. Then `categoryWizardFieldId`, `labelWizardFieldId`, `xWizardFieldId`, `yWizardFieldId` — whichever are set in `dataMapping`.

Duplicates skipped. This list drives:

- **SQL rebuild** via `ReportWizardQuery.buildForDrillDown(wizard, primary, otherDims)`. Primary becomes first GROUP BY; others are appended; measures stay.
- **Click/drill filtering** (§3 above).
- **Drill-by menu exclusion** — already-active dimensions are hidden from the right-click "Drill down by…" menu.

## 5. Drill-by semantics (Option A)

When user right-clicks → "Drill down by… X":

1. Category is **replaced** — drilled dimension takes the primary slot.
2. Other active dimensions (label, x, y) **stay** — chart shape preserved.
3. Drill stack accumulates one entry per drill: `(categoryFieldId, clickedValue)`. Label's clicked value is **not** added.
4. Filters accumulate (after two drills: `WHERE month='Jan' AND region='West'`).

Drill menu = `wizard.fields` filtered to `chartUsageType=Dimension` AND not in active list AND not in drill stack.

Once drilled, server reads existing `chartConfigJSON` and surgically overrides `dataMapping.categoryColumn` with the drilled dimension's `displayAlias` (and removes `categoryWizardFieldId`). Everything else — `echartOption`, `valueColumn`/`valueWizardFieldId`, series styling, colors, mappings — is carried through untouched.

## 6. Cross-filter SQL LHS

A wizard widget's cross-filter LHS (on the binding or on the `BICrossFilter`) accepts a **wizard field path** in addition to raw `alias.column`. Any field reachable from the wizard's main entity works — it doesn't need to be displayed.

Valid LHS values:
- `customer` — reference field on main entity. Binds against the referenced ID automatically.
- `customer.salesman.code` — property path through two joins. Joins added as needed.
- `valueDate` — scalar column on main entity.
- `l.branch_id` — raw alias.column (legacy; still works).

The classifier treats two-or-more dots OR a value resolving against the main-table data model as a wizard path; otherwise raw SQL.

## 7. Coexistence with legacy widgets

Pre-existing wizard widgets (no `*WizardFieldId` keys, only `*Column`) read as before — column names, no per-dimension filtering. Re-saving via the chart designer upgrades the widget if the user picks field IDs.

## 8. Complete example

```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "legend": {},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": {"type": "value"},
    "series": "$DATA.series"
  },
  "dataMapping": {
    "type": "CategoryLabelValue",
    "categoryWizardFieldId": "valueDate",
    "labelWizardFieldId": "customer.customerCategory",
    "valueWizardFieldId": "price.netValue",
    "seriesType": "bar",
    "stack": "total"
  },
  "clickEmitMapping": [
    { "crossFilterCode": "dateFromFilter",         "wizardFieldId": "valueDate" },
    { "crossFilterCode": "customerCategoryFilter", "wizardFieldId": "customer.customerCategory" }
  ],
  "drillDownMapping": [
    {
      "key": "categoryDetails",
      "wizardFieldId": "customer.customerCategory",
      "targetWidgetCode": "bi-category-details",
      "enTitle": "Category details", "arTitle": "تفاصيل التصنيف",
      "filters": [
        { "crossFilterCode": "customerCategoryFilter", "wizardFieldId": "customer.customerCategory" }
      ]
    }
  ]
}
```

Wizard:

```json
{
  "code": "bi-sales-breakdown",
  "type": "EChartDataSource",
  "tableType": "DetailLine",
  "mainTable": "SalesInvoiceLine",
  "fields": [
    {"fieldId": "valueDate",                 "chartUsageType": "Dimension"},
    {"fieldId": "customer.customerCategory", "chartUsageType": "Dimension"},
    {"fieldId": "price.netValue",            "chartUsageType": "Measure", "sqlAggregationType": "Sum"}
  ]
}
```

## 9. Runtime slot selection

Wizard widgets expose a runtime selector (toolbar / echarts toolbox icon) so viewers can swap the category dimension, change measures, or add series — session-only.

![The Runtime Slot Selection panel open on a live wizard chart, its Category dropdown listing the dimensions the wizard exposes](../../ar/platform/bi/images/bi-wizard-runtime-selector-en.png)

| Mapping type | Dimension slots | Measure slots | Multi-measure series |
|---|---|---|---|
| `CategoryValue` | `categoryWizardFieldId` | `series[].wizardFieldId` (N) | **Yes** (flexible only) |
| `LabelValue` | `labelWizardFieldId` | `valueWizardFieldId` | No |
| `CategoryLabelValue` | `categoryWizardFieldId`, `labelWizardFieldId` | `valueWizardFieldId` | No |
| `Scatter` | — | `xWizardFieldId`, `yWizardFieldId`, `sizeWizardFieldId` | No |
| `Heatmap` | `xWizardFieldId`, `yWizardFieldId` | `valueWizardFieldId` | No |
| `Gauge` | — | `valueWizardFieldId` | No |
| `Tree` | `labelWizardFieldId` | `valueWizardFieldId` | No |

`Waterfall`, `NestedLabelValue`, `GaugeMulti`, `Radar`, `FunnelComparison`, `Custom`, `Raw` → no runtime selector.

**Flexible vs. fixed CategoryValue**: a CategoryValue is "flexible" only when every `series[]` entry is uniform — same `type`, no `yAxisIndex`, no `stack`, no `target`. Dual-axis / combo bar+line / stacked / with-target charts are fixed: their multi-measure picker is hidden.

**No selector in drill-by mode**: when the request carries `drillDownByTargetDimension`, the server omits `runtimeSelectorInfo`.

**Opt-out flags** on `chartConfigJSON`:
- `disableRuntimeDimensionSelection: true` — hides dimension pickers (keeps measures).
- `disableRuntimeMeasureSelection: true` — hides measure pickers (keeps dimensions).

Setting both `true` hides the selector entirely.

**Click/drill follow active dims**: runtime slot changes reshape `activeDimensionFieldIds`, so click-emit and drill-down entries keyed by `wizardFieldId` automatically follow the new active dimensions.

**AI guidance**: prefer wizard-mode keys (`*WizardFieldId`) whenever `wizardDataSource` is present so widgets pick up the runtime selector for free.
