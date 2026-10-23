---
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Pricing & Price Lists Configuration

This page documents the **Pricing & Price Lists** tab — how the system falls back to the last price an item was traded at, how price lists behave, and the default units for new items.

![The Pricing & Price Lists tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-pricing-and-price-lists-en.png)

## Last Sales Price

When you add an item to a sales document, the system looks for a unit price. If no price list applies and **Use Last Sales Price** is on, it reuses the price from the most recent processed sales invoice for the same item and customer. The "Consider …" switches make that search stricter by adding matching conditions — each one only applies when the current line actually carries that property, so enabling more of them gives a closer match but finds a price less often.

**Use Last Sales Price** (`value.useLastSalesPrice`) — Turns on the last-sales-price fallback. Use it when you want sales prices to "stick" to whatever the customer was last charged instead of leaving the line at the item default when no price list matches.

**Consider Color / Size / Unit / Revision / Active % / Inactive % / Sub-Item in Last Sales Price** — Each restricts the last-price search to lines matching that property of the current line, so the reused price respects color, size, unit, etc.

| Property | Field ID |
| --- | --- |
| Consider Color in Last Sales Price | `value.considerColorInLastSalesPrice` |
| Consider Size in Last Sales Price | `value.considerSizeInLastSalesPrice` |
| Consider Unit in Last Sales Price | `value.considerUomInLastSalesPrice` |
| Consider Revision in Last Sales Price | `value.considerRevisionInLastSalesPrice` |
| Consider Active % in Last Sales Price | `value.considerActivePercentageInLastSalesPrice` |
| Consider Inactive % in Last Sales Price | `value.considerInActivePercentageInLastSalesPrice` |
| Consider Sub-Item in Last Sales Price | `value.considerSubItemInLastSalesPrice` |
| Consider Subsidiary in Last Sales Price | `value.considerSubsidiaryInLastSalesPrice` |

**Consider Subsidiary in Last Sales Price** (`value.considerSubsidiaryInLastSalesPrice`) — Widens the search to also match the document's subsidiary (account), so a last price recorded against the subsidiary can be reused even under a different customer.

## Last Purchase Price

The purchase side mirrors the sales side: when **Use Last Purchase Price** is on and no purchase price list matches, the line takes the price from the most recent processed purchase invoice for the same item and supplier.

**Use Last Purchase Price** (`value.useLastPurchasePrice`) — Turns on the last-purchase-price fallback, reusing the last cost you actually paid.

**Consider Color / Size / Unit / Revision / Active % / Inactive % / Sub-Item / Subsidiary in Last Purchase Price** — The same matching conditions as the sales side, narrowing (or, for subsidiary, widening) the last-purchase-price search.

| Property | Field ID |
| --- | --- |
| Consider Color in Last Purchase Price | `value.considerColorInLastPurchasePrice` |
| Consider Size in Last Purchase Price | `value.considerSizeInLastPurchasePrice` |
| Consider Unit in Last Purchase Price | `value.considerUomInLastPurchasePrice` |
| Consider Revision in Last Purchase Price | `value.considerRevisionInLastPurchasePrice` |
| Consider Active % in Last Purchase Price | `value.considerActivePercentageInLastPurchasePrice` |
| Consider Inactive % in Last Purchase Price | `value.considerInActivePercentageInLastPurchasePrice` |
| Consider Sub-Item in Last Purchase Price | `value.considerSubItemInLastPurchasePrice` |
| Consider Subsidiary in Last Purchase Price | `value.considerSubsidiaryInLastPurchasePrice` |

## Price Lists

**Price List Default Price** (`value.priceListDefaultPrice`) — A price list line can hold several candidate prices (default, minimum, maximum, plus custom tiers N1–N5). This setting decides **which column becomes the unit price** on the document line, company-wide. The choice is resolved in priority order (customer → document term → customer category → customer class → invoice classification → price classifiers → this setting); the first that specifies a column wins, otherwise the default price is used.

**Do Not Auto-Fill Min and Max Prices in Price Lists with Save** (`value.doNotAutoFillMinAndMaxInPriceLists`) — By default, saving a sales price list line with a base price but empty minimum/maximum fills them from the base price. When on, that auto-fill is disabled and min/max stay exactly as typed.

**Do not Update Lines From Price List Header** (`value.doNotUpdateLinesFromPriceListHeader`) — By default, every save of a price list pushes the header down onto its lines: wherever the header carries a value it is written over whatever the line already held — the from and to dates, the dimensions, the supplier, the invoice classification and price classifiers 1 to 5. When on, that wholesale copy stops, but it does not stop completely: the supplier, the invoice classification and the price classifiers are still forced onto every line, the two dates are only filled in where the line left them empty, and the dimensions are left untouched.

**Use Fast Commit When Adding Sales Price List to Items** (`value.useFastCommitWhenAddingSalesPriceListToItems`) *(default on)* — A sales price list can push its lines onto each item's own price-line list. With fast commit on, those item price lines are written in place without a full edit/save cycle per item — much faster when one price list touches many items. Turn off only if each item must run its full save logic.

**Update Sales Price List from Item Regardless of Change** (`value.updateSalesPriceListFromItemRegardlessIfThereIsChangeOrNot`) — By default, saving an item refreshes its linked sales price lists only when prices actually changed. When on, the refresh runs on every item save even when nothing changed — rarely needed, and adds processing to each save.

**Clear Sales Price List Update Prices After Update** (`value.clearSalesPriceListUpdatePricesAfterUpdate`) — The sales price list has an "update prices" helper used to recalculate or bulk-set line prices. When on, those helper inputs are cleared after the update runs, so they don't accidentally re-apply next time.

**Use Inactive on Sales Price List Lines** (`value.useInActiveInSalesPriceListLines`) — Enables a per-line "inactive" flag on sales price list lines so individual lines can be deactivated rather than the whole list. This is required for the auto-pricing policy that creates one price list for the current document and deactivates the item's pricing elsewhere.

**Number of Days of Expired Price List to Show Critical Errors After Them** (`value.numberOfDaysOfExpiredPriceListToShowCriticalErrorsAfterThem`) — A price list expired longer than this many days is escalated to a critical error in the system's checks. Set a negative number to disable the warning; zero/empty uses a 100-day default.

**Add Item Cost List to Separate Page** (`value.addItemCostListToSeparatePage`) *(on in newly created databases)* — Controls where the item's cost-summary grid appears on the Item screen: on moves it to its own Statistics page; off keeps it on the Prices page.

**Add Price After Tax to Sales Price List Lines** (`value.addPriceAfterTaxToSPListLines`) — When on, each sales price list line also stores a tax-inclusive price (computed by applying the relevant taxes to the default price), so users can see/enter prices including tax.

**Update Sub-Item Dimensions from Warehouse in Last Quantity Transaction** (`value.updateSubItemDimensionFromWarehouseInLastQuantityTransaction`) — When on, a sub-item's dimensions are refreshed from the warehouse used in the item's most recent stock-quantity transaction.

## Default Units

**Unit Group / Base Unit(Smallest)** (`value.unitConfig.uomGroup` / `value.unitConfig.baseUnit`) — Defines the default unit-of-measure group and base unit for new items. When an item is created without its own units, the system applies this base unit and group to the item's primary unit and seeds its purchase, sales, and reporting units from it. Set it when most items share the same base unit (e.g. "Piece") so new items come pre-filled.

**Calculate Purchase Return Prices** (`value.calculatePurchaseReturnPrices`) *(default on)* — When on, saving a purchase return auto-fills each line's price from the last purchase price for that item and supplier (falling back to the item's average cost), so returns are valued consistently with what was paid. Turn off only if returns must always be priced by hand.
