---
description: "Forecasting purchase quantities with the Purchase Forecast document: choosing quantity sources such as sales history, the forecast and sales source configurations, and turning the suggested quantities into a purchase order."
entities: [NewPurchaseForecast, PurchaseForecastConfig, PFSalesSourceConfig, PFQuantitySource]
menu: Purchases → New Purchase Forecast → New Purchase Forecast
---
# Purchase Forecast

The best purchase is the one made before you run out, not after. **Purchase forecasting** turns the purchasing department from reactive ("out of stock! order now!") to proactive ("it'll run out in three weeks, so let's order now with standard delivery and better prices").

## Why Forecast?

Reactive buying is expensive: rush shipping, higher prices, and stockouts that halt production or lose sales. Forecasting gives you advance visibility of demand, so you buy in economical quantities, negotiate better prices, account for lead times, and avoid both stockouts and overstock.

![Purchase forecast screen in NaMa ERP](../../ar/modules/supplychain/images/purchase-forecast/purchase-forecast-en.png)

## The Purchase Forecast Document (NewPurchaseForecast)

The **Purchase Forecast** document is the tool you use to estimate future demand for each item over an upcoming period. The estimate is based on a quantity source you choose, then it suggests purchase quantities after deducting what's available in stock and what's actually required.

You can narrow the forecast's scope by item, brand, or date range, and set the lookback period (the historical span over which consumption is measured).

## Quantity Sources: On What Basis Do We Forecast?

The forecast's power is in its data source. The system supports more than one source, and they can be blended:

- **Sales history**: use the past selling rate to predict upcoming demand - best for distribution and retail items. The rules for extracting sales are configured via the **Sales Source Config** (PFSalesSourceConfig): date range, item filters, and the invoice types included or excluded.
- **Stock on hand**: a **Quantity Source** (PFQuantitySource) is a list of warehouses and locators (`quantitySourceLines`). The forecast reads each item's current balance in them, so one source can stand for "the main store" and another for "the branch shops".

## Forecast Configuration (PurchaseForecastConfig)

The **Purchase Forecast Configuration** is the recipe a Purchase Forecast follows: which sales periods to measure, which stock to count, and the formulas that turn those numbers into coverage and a suggested order. Every Purchase Forecast names one in its **Purchase Forecast Configuration** field, so several buyers — or several product families — can each keep their own recipe. Pressing **Calculate Data** (or saving with **Calculate Data With Save Every Time** ticked) runs the recipe in this order: net sales, stock quantities, the line totals, the last purchase, then the coverage formulas.

### Consider… flags

By default, a line's net sales add up every sale of its item, whatever branch or size it was sold in. Each **Consider** flag splits the sales by one dimension instead: when it is ticked and the forecast line carries a value for that dimension, only sales made with the same value count towards the line. A line that leaves the dimension empty still collects all of the item's sales. Use them when you forecast per branch or per size — say, one line per branch with **Consider Branch** ticked. The flags apply to net sales only; stock quantities are always the whole item's balance in the source's warehouses.

| Option | Field id |
|---|---|
| Consider Legal Entity · Consider Branch · Consider Department · Consider Sector · Consider Analysis Set | `considerLegalEntity`, `considerBranch`, `considerDepartment`, `considerSector`, `considerAnalysisSet` |
| Consider Size · Consider Color · Consider Revision · Consider Box · Consider Lot | `considerSize`, `considerColor`, `considerRevisionId`, `considerBox`, `considerLotId` |
| Consider SubItem · Consider Active Percentage · Consider Inactive Percentage | `considerSubItem`, `considerActivePerc`, `considerInactivePerc` |

### Net Sales 1–5 Configuration

**Net Sales 1 Configuration** to **Net Sales 5 Configuration** (`netSales1Configuration` … `netSales5Configuration`) each point at a **Sales Source Configuration**, and fill the **Net Sales 1–5** columns of the forecast lines. Leave one empty and its column is not calculated. Five slots let you compare periods side by side — last month, last quarter, the same quarter last year — and the forecast then picks the largest of the five into **Highest Sales Period**.

A **Sales Source Configuration** (PFSalesSourceConfig) holds:

| Field | Field id | What it does |
|---|---|---|
| Start Period / End Period | `periodStart`, `periodEnd` | How far back the window opens and closes, counted back from the forecast's date — a start of *6 Months* and an end of *1 Month* measure the five months that ended a month ago. An empty start or end means "yesterday". The window actually used is written on the forecast's header as **Net Sales *N* From Date / To Date**. |
| Sales Source | `salesSources` (`entityType`, `entityList`, `effectType`) | The document types whose lines are summed — one type per row, or an entity list of several. **Effect Type** decides the sign: *Addition* adds, *Deduction* subtracts, and *Default* adds sales and subtracts returns (any invoice-type document that brings goods back in). Only saved documents dated inside the window count. |
| Data Filters | `dataFilters` (`book`, `term`, `invoiceClassification`, `docCategory`, `customer`, item dimensions, accounting dimensions) | Narrows the documents read: by book, term, invoice classification, document category, customer (a customer, customer class 1 or 2, or customer category), warehouse, locator, size, colour, lot and the other item dimensions, and legal entity / sector / branch / department / analysis set. Values in the same column on several rows are alternatives; different columns must all match. |

### Quantity 1–20 Source

**Quantity 1 Source** to **Quantity 20 Source** (`quantity1Source` … `quantity20Source`) each point at a **Quantity Source** and fill the **Quantity 1–20** columns with the item's current balance in that source's warehouses and locators. An empty slot puts zero in its column. The forecast adds all twenty into **Total Quantities**.

### Coverage 1–10 Calculation Formula and Suggested Order

**Coverage 1–10 Calculation Formula** (`coverage1CalcFormula` … `coverage10CalcFormula`) and **Suggested Order Based on Coverage Formula** (`suggestedOrderBasedOnCoverageFormula`) are short Groovy formulas run once per forecast line; each result goes into the matching **Coverage *N*** or **Suggested Order Based on Coverage** column. An empty formula leaves its column alone. Inside a formula you can use:

- `line` — the forecast line, with its columns: `line.netSales1` … `line.netSales5`, `line.highestSalesPeriod`, `line.quantity1` … `line.quantity20`, `line.totalQuantities`, `line.lastPurchaseQuantity`, `line.lastPurchaseDate`, and the coverages already worked out (`line.coverage1` …), since the formulas run in order 1 to 10 and the suggested order comes last.
- `requiredCoverageInMonths` and `minimumSpecifiedCoverageForReorderInMonths` — the two header fields of the forecast, **Required Coverage In Months** and **Minimum Specified Coverage For Reorder In Months**.

For example, with **Net Sales 1** measuring the last single month, the suggested order formula `line.netSales1.multiply(requiredCoverageInMonths).minus(line.totalQuantities)` orders enough for the required months minus what is already on hand.

The suggested order is where the buyer starts: the purchase document generated from the forecast takes its quantities from **Suggested Order Based on Coverage (Adjusted)**, which the buyer fills — by hand, or with the copy action listed below.

::: tip Combine the Forecast with Lead Times
The forecast alone tells you "how much" you'll need, but the item's **lead time** (defined on the [item card](./understanding-items.md#Purchase-Configuration)) tells you "when" to order. Combine the two to order at the timing that ensures goods arrive just before you run out.
:::

## Actions on these screens

**On the Purchase Forecast document:**

- **Calculate Data** — the document must be saved; it runs the forecast and fills the detail lines from the quantity sources you chose.
- **Collect Items** — fills the lines from the item-collection criteria instead of item by item, honouring the header's switches for spreading revisions and spreading sizes and colours. It refuses when the collection lines are empty.
- **Spread Selected Line Data** — takes the line you are standing on and expands it across the item's revisions, sizes and colours, again following those switches.
- **Select All Lines** and **Unselect All Lines** — tick or untick every detail line at once, which is what the two actions below and the document generation work from.
- **Delete Suggested Order Based On Adjusted Coverage Values From Details For Selected Lines** — clears the adjusted-coverage suggestion on the ticked lines, so you can redo it.
- **Copy Values Of Suggested Order Based On Coverage To Suggested Order Based On Adjusted Coverage If Empty For Selected Lines** — fills the adjusted-coverage suggestion from the plain coverage suggestion on the ticked lines, but only where it is still empty, so anything you adjusted by hand survives.
- **Generate Purchase Document For Selected Items** — the document must be saved; it asks whether to produce a **Purchase Order** or an **Item Request** (order is the default) and creates it from the ticked lines.

**On the older Purchase Forecast and the Sales Forecast**, the detail page carries **Calculate Cost**, **Calculate Values** and **Calculate Current Year Values**, and the aggregated page its own **Calculate Cost**, **Calculate Aggregate Values** and **Calculate Aggregate Current Year Values**.

## From Forecast to Purchase Order

The forecast isn't an end in itself, but a prelude to purchasing. After generating and reviewing the forecast, its suggestions become [purchase requests or orders](./purchasing-journey.md), closing the loop from anticipating the need to fulfilling it. This makes purchasing data-driven rather than guesswork.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *You should at least select one line* — «يجب تحديد سطر واحد علي الأقل» | A purchase document is being generated from the forecast while no forecast line is ticked in the **Selected Line** column. | Tick the lines you want to buy, then run the generation action again. |
| *Period end can not be greater than period start* — «نهاية الفترة لا يمكن أن تكون اكبر من بداية الفترة» | On a **Purchase Forecast Sales Source Configuration**, the two periods are counted *backwards* from the record's creation date, so the start of the window must be the further one back. The refusal fires when **Period Start** reaches back less far than **Period End**. | Put the longer period in **Period Start** and the shorter one in **Period End** — six months ago as the start, one month ago as the end. |
| *Warehouse {0} in line {1} not equal warehouse in locator {2}* — «المخزن {0} في السطر {1} لا يساوي المخزن الموجود في الموقع {2}» | A quantity source line names a warehouse and a locator that belongs to a different warehouse, so the balance it would read is ambiguous. | Use a locator of the warehouse on the line, or clear the warehouse and let the locator decide it. |

## Next Steps

- [The Purchasing Journey](./purchasing-journey.md) - turning the forecast into actual purchase orders
- [Understanding Inventory Items](./understanding-items.md) - where lead times and safety stock are set
- [Stock Taking](./stock-taking.md) - inventory accuracy is the basis of forecast accuracy
