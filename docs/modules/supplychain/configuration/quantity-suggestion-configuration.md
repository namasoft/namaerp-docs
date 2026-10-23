---
description: "The Quantity Suggestion tab: the order in which lots, serials, sizes, warehouses and locators are suggested on document lines, what gets suggested and shown, and how similar lines are merged when documents are copied or consolidated."
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Quantity Suggestion Configuration

This page documents the **Quantity Suggestion** tab. It controls two related behaviors:

- **Quantity suggestion** — when a user enters an item (or one of its properties) on a document line, the system looks up where that item currently sits in stock (lots, serials, sizes/colors, revisions, measures, warehouses, locators) and *suggests* the available quantities and which property to pull from.
- **Collect similar lines** — when documents are copied or consolidated, identical lines can be *merged* so the resulting document is shorter.

![The Qty Suggestion tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-quantity-suggestion-en.png)

## Suggestion Order

When the system lists an item's available stock, it sorts the suggestions using up to three ordered keys, each with a direction. Each key can be:

- **Expiry Date** — order by the lot's expiry date (only when the item tracks expiry). Use for first-expiry-first-out, so near-expiry stock is suggested first.
- **First Receipt Date** — order by when the stock was first received. Use for first-in-first-out, so oldest stock comes first.
- **Search Property** — order by the property the user is currently entering (e.g. the lot/size/color being typed).

**First / Second / Third Suggestion Order** `value.firstSuggestionOrder` `value.secondSuggestionOrder` `value.thirdSuggestionOrder` *(defaults: Expiry Date, First Receipt Date, Search Property)* — the primary sort key and two tie-breakers, each with an **Ascending / Descending** direction (`value.firstOrderDescOrAsc`, `value.secondOrderDescOrAsc`, `value.thirdOrderDescOrAsc`). Set them to match your stock-rotation policy.

**Collect Property Order Configuration Lines** `value.collectPropertyOrderConfigLines` *(table)* — A per-property override of the three order keys above. Each line names a property (lot, size, color, warehouse, locator…), the field to sort its suggestions by, and the direction. When a line matches the property being searched, it fully replaces the three global keys for that property. Use it when one property needs a different sort than the global default.

## What Gets Suggested

**Add Quantity to Item Property Suggestion in Issues** `value.addQtyToItemDimensionsSuggestion` *(default on)* — Shows available on-hand quantities per property when entering an item on **issue/outgoing** documents (sales, stock issue), so the user can pick what to pull. Turn off to enter properties manually without the lookup.

**Add Quantity to Item Property Suggestion in Receipts** `value.addQtyToItemDimensionsSuggestionInRecipts` *(default on)* — The same for **receipt/incoming** documents (purchases, stock receipt), showing existing on-hand quantities while receiving.

**Use Quantity Suggestion Only in the Following Types** `value.addQtyToItemDimensionsSuggestionInTypes` *(table)* — Restricts the quantity suggestion to **only** the document types listed. Empty means no restriction (the two switches above apply normally).

**Consider Invoice Date in Quantity Suggestion** `value.considerInvoiceDateInQtySuggestion` — When on, the suggested available quantity is calculated **as of the document's date** rather than the live current balance — useful for back-dated documents.

**Show Only Non-Zero Quantities in Receipt Docs Suggestions** `value.showOnlyNonZeroQtiesInReceiptDocsSuggestions` — On receipt documents, suggestions can normally include properties with zero on-hand (so you can receive into a new lot). When on, only properties with a positive quantity are suggested.

**Consider Warehouse in Receipt Docs Suggestions** `value.considerWarehouseInReceiptDocsSuggestions` *(default on)* — On issue documents the suggestion is always filtered by the line's warehouse/locator; on receipt documents this happens only when this is on. Turn off to look across all warehouses while receiving.

**Unit Used for Quantity Suggestions** `value.unitUsedForSuggestions` — When no unit is on the line, this picks which item unit (primary, sales, purchase) the suggested quantities are expressed in.

**Set Total Quantity with Property Change** `value.addTotalQtyWithPropertyChange` — When on, after the user selects a property value (e.g. a lot), the line's quantity is auto-filled with the **total available** quantity for that property. Use it when users typically move the whole available quantity of the chosen lot.

### Don't Suggest Anything When There's No Stock

These switches apply on **issue** documents. When on, the property search returns the typed value as-is and does not propose alternative property values that have no stock — so you only issue what physically exists.

Each switch suppresses suggestions of the corresponding property when no quantity is available:

| Option | Field ID |
| --- | --- |
| Do Not Suggest Any Measures in the Absence of Quantities | `value.doNotSuggestAnyMeasuresInQtiesAbsence` |
| Do Not Suggest Any Boxes in the Absence of Quantities | `value.doNotSuggestAnyBoxInQtiesAbsence` |
| Do Not Suggest Any Lots in the Absence of Quantities | `value.doNotSuggestAnyLotInQtiesAbsence` |
| Do Not Suggest Any Revisions in the Absence of Quantities | `value.doNotSuggestAnyRevisionInQtiesAbsence` |
| Do Not Suggest Any Sizes or Colors in the Absence of Quantities | `value.doNotSuggestAnySizeColorInQtiesAbsence` |

### Filtering & Calculation Tweaks

**Calculate Measures Quantity Based on Transaction Unit Rate to Base Unit** `value.calcMeasuresQtyBasedOnTransUOMRateToBaseUOM` — For dimensional/measured items, computes the measures quantity using the transaction unit's conversion rate to the item's base unit, normalizing it when the entry unit differs from the base unit.

**Do Not Filter Warehouse and Locator by Dimensions in Quantity Suggestion** `value.doNotFilterWarehouseAndLocatorByDimensionsInQtySuggestion` — Normally suggested warehouses/locators are filtered by the document's dimensions (branch/department/sector). When on, that filtering is skipped so any warehouse/locator is suggested.

**Suggest Quantity in Locator and Warehouse** `value.suggestQtyInLocatorAndWarehouse` — When on, the locator/warehouse fields offer a per-locator / per-warehouse quantity suggestion. When off, the locator suggestion on stock issue is disabled. Turn on for warehouses that use locators.

### Assortment, Packing & Assembly Display

**Expand Item Assortment in Documents** `value.expandItemAssortmentInDocuments` *(table)* — For the listed document types, an "assortment" item (a bundle defining quantities per size/color) is automatically expanded into one detail line per size/color, with quantities multiplied by the entered quantity. Use when you sell pre-defined size/color packs.

**Show Packing List** `value.showPackingList` — Adds an extra "Packing" page to the inventory document edit screen for entering packing details.

**Show BOM Materials Only in Assembly Document** `value.showBOMMaterialsOnlyInAssembly` — When on, the assembly document only shows the materials belonging to the selected recipe (BOM), hiding unrelated entries.

**Show BOM Co-Products Only in Assembly Document** `value.showBOMCoProdsOnlyInAssembly` — The same restriction for the co-products defined by the selected recipe.

### Showing Property Names

**Add Color Name / Add Size Name / Add Revision Name** `value.addColorName` `value.addSizeName` `value.addRevisionName` — Each includes the human-readable *name* of the property next to its code in item-search/suggestion results. Turn them on when the codes alone are hard to read.

## Collect Similar Lines

When documents are consolidated or copied, identical lines can be merged into one. The grouping is controlled by which properties are treated as significant — turning on a property keeps lines **separate** when that property differs, and merges them when it matches.

**Collect Similar Request Lines in Consolidated Request** `value.collectSimilarReqLinesInConsolidated` — The master switch that enables merging request lines for the same item and unit when building a **Consolidated Purchase Request**.

Each option below adds the corresponding property to the grouping key, so lines differing in that property stay separate rather than being merged:

| Option | Field ID |
| --- | --- |
| Collect by Revision | `value.collectSimilarReqLinesInRevision` |
| Collect by Size | `value.collectSimilarReqLinesInSize` |
| Collect by Box | `value.collectSimilarReqLinesInBox` |
| Collect by Color | `value.collectSimilarReqLinesInColor` |
| Collect by Lot | `value.collectSimilarReqLinesInItemLotId` |
| Collect by Active % | `value.collectSimilarReqLinesInActivePercent` |
| Collect by Inactive % | `value.collectSimilarReqLinesInNotActivePercent` |
| Collect by Sub-Item | `value.collectSimilarReqLinesInSubItem` |
| Collect by Price Classifier 1 | `value.collectSimilarReqLinesInPriceClassifier1` |
| Collect by Price Classifier 2 | `value.collectSimilarReqLinesInPriceClassifier2` |
| Collect by Price Classifier 3 | `value.collectSimilarReqLinesInPriceClassifier3` |
| Collect by Price Classifier 4 | `value.collectSimilarReqLinesInPriceClassifier4` |
| Collect by Price Classifier 5 | `value.collectSimilarReqLinesInPriceClassifier5` |

**Collect Similar Issue Lines in Sales** `value.collectSimilarIssueLinesInSales` — When copying stock-issue lines into a sales document, identical lines are merged into one. Use it to shorten sales documents created from issues.

**Collect Similar Receipt Lines in Purchase** `value.collectSimilarRecLinesInPurchase` — The same for the purchase side — identical receipt lines are merged when building a purchase document.

**Aggregate Identical Lines of Quality Control / Assurance Documents** `value.collectSimilarLinesOfQualityContDoc` — When on, identical lines on quality control / assurance documents are combined into one.
