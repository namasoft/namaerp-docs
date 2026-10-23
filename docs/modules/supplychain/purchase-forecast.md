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
- **Other quantity sources**: via the **Quantity Source** (PFQuantitySource), the forecast can be fed numbers from other sources (such as production plans or manual entry), not from sales alone.

## Forecast Configuration (PurchaseForecastConfig)

The **Purchase Forecast Configuration** gathers the calculation criteria in one place: the adopted sources, seasonality factors, demand multipliers, and how to handle available and reserved stock. Setting this up once makes generating forecasts later consistent and fast.

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
