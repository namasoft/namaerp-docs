---
description: "The Stock Ages tab: the Track Stock Ages switch and its item and item section inheritance, the tracking dimensions that split aged stock, and how background processing builds the aging records."
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Stock Ages Configuration

This page documents the **Stock Ages** tab. "Stock ages" is the inventory-aging feature: it tracks how long stock has been held so you can report on aging buckets. The aging records are built by a background processor, and these settings decide whether aging is tracked at all and how finely the held stock is broken down.

**Track Stock Ages** *(`value.stockAgesPolicy`)* — The master switch for aging tracking, resolved through an inheritance chain (item → item section → this configuration), so an item can follow the global policy or override it. Set it to **Yes** to enable inventory aging, **No** to disable it, or **Inherited** at lower levels to follow the global setting.

![The Stock Ages tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-stock-ages-en.png)

## Tracking Dimensions

Each switch below decides whether that dimension is included when the aging records are built. When a dimension is **off**, held stock is aggregated regardless of it; when **on**, aging is tracked separately for each distinct value of that dimension — finer detail, but more records to build and store. Turn on the dimensions you need to age stock by and leave the rest off to keep the aging data smaller and faster.

**Track Stock Ages on:**

| Dimension | Field ID |
|---|---|
| Sector | `value.trackStockAgesOnSector` |
| Branch | `value.trackStockAgesOnBranch` |
| Department | `value.trackStockAgesOnDepartment` |
| Analysis Set | `value.trackStockAgesOnAnalysisSet` |
| Warehouse | `value.trackStockAgesOnWarehouse` |
| Locator | `value.trackStockAgesOnLocator` |
| Revision | `value.trackStockAgesOnRevision` |
| Size | `value.trackStockAgesOnSize` |
| Color | `value.trackStockAgesOnColor` |
| Packages | `value.trackStockAgesOnPackages` |
| Lot | `value.trackStockAgesOnLotId` |
| Active Percentage | `value.trackStockAgesOnActivePercent` |
| Inactive Percentage | `value.trackStockAgesOnInactivePercent` |
| Sub-Item | `value.trackStockAgesOnSubItem` |

## Processing

**Stock Ages Processing Times** *(`value.stockAgesProcessingTimes`, table)* — Time windows (start/stop) during which the stock-ages background processor is allowed to run, so the heavy aging work can be confined to off-peak hours.
