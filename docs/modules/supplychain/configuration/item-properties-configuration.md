---
description: "The Item Properties tab: in which documents lot, serial, revision, size and color, and measures are entered, item dimension options, production and expiry dates, active and inactive percentages, and the checks when editing linked stock documents."
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Item Properties Configuration

This page documents the **Item Properties** tab. It controls the tracking properties carried on each stock line — **lot** (shipment), **serial number**, **revision**, **size & color**, and **measures** — plus the active/inactive percentages and sub-item. These settings decide where each property is entered, how it is suggested and validated, and how strictly it is checked when documents are edited or matched to invoices.

![The Item Properties tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-item-properties-en.png)

## Where Each Property Is Entered

The five blocks at the top — **Lot, Serial, Revision, Size & Color, Measures** — are not simple on/off switches. Each one decides **in which document types** that property is shown and entered on the line. Every block has the same set of per-document-type switches:

> Initial Receipt · Pick List · Sales Invoice · Sales Order · Sales Quotation · Purchase Invoice · Purchase Quotation · Purchase Order · Purchase Request · Purchase Return · Sales Return · Receipt Inspection

When a document of a given type is opened, the system reads the switch matching that type; if it is on, the property's field is available on the lines. This lets you, for example, require lot only on receipts and sales invoices but not on quotations.

- **Lot Configurations** (`value.lot`) — where the lot/shipment number is entered. For items tracked by batch (food, pharma, expiry-bound goods).
- **Serial Configurations** (`value.serial`) — where the serial number (and second serial) is entered. For serialized goods (electronics, machinery, warranty-tracked items).
- **Revision Configurations** (`value.revision`) — where the revision (version/model variant) is entered.
- **Size & Color Configurations** (`value.sizeAndColor`) — where the size and color variant is entered. For apparel/footwear or any variant item.
- **Measures Configurations** (`value.measures`) — where multi-dimensional measurements (length/width/height) are entered, for items stocked by physical dimensions such as glass, steel sheet, or fabric.

## Item Dimension Options

**Suggest Codes of Revisions / Sizes and Colors** (`value.suggestCodesForRevs`, `value.suggestCodesForSizAndColor`) — Includes revision-based or size/color-based item codes in the item-code search list, so a line can be found by typing a variant code.

**Show Serial / Second Serial in Grid** (`value.showSerialInGrid`, `value.showSecondSerialInGrid`) *(default on)* — Shows the serial (or second serial) column directly in the document lines grid. Turn off to declutter the grid when serials are entered through the serials dialog instead.

**Prevent Revision Purchase from Different Supplier** (`value.preventRevsionPurchaseFromDifSupplier`) *(default on)* — When a revision has a designated default supplier, it can only be purchased from that supplier; a purchase for a different supplier is blocked.

**Enable Not Sellable and Not Purchasable on Color & Size Lines** (`value.enableNotSellableAndNotPurchasableOnColorAndSizeLines`) — Lets individual size/color variants be marked "not sellable" and/or "not purchasable", so specific variants can be blocked while others stay active.

**First Revision of Allowed Revisions is Default with Color & Size** (`value.firstRevisionOfAllowedRevisionsIsDefaultWithColorAndSize`) — When building variant codes for size/color, fills in the first revision from the item's allowed-revisions list as the default instead of leaving it blank.

**Allow Issue of Non-Existing Lots** (`value.allowIssueOfNonExistingLots`) — Normally you can only issue from a lot that exists in stock. When on, the system allows issuing a lot that was never received — for migration/correction scenarios; use with caution.

**Do Not Update Item Lot and Box from Issue and Sales** (`value.doNotUpdateItemLotAndBoxFromIssueAndSales`) — When on, issue and sales documents do **not** update the item's lot and box (package) records; only receipt-side activity maintains them.

**Allow Changing Cost and Quantity Tracking After Item Usage** (`value.allowChangingCostAndQtyTrackingAfterUsage`) — Normally an item's cost-tracking and quantity-tracking settings are locked once it has transactions. When on, they can still be changed afterward — for controlled corrections only, as it can affect existing balances and costing.

**Search on Item by Box or Lot** (`value.searchOnItemByBoxOrLot`) — When on, entering a box or lot id on a line looks it up and fills in the matching item, so staff can add a line by scanning a box/lot label rather than the item code.

**Zip Serials in Dialog** (`value.zipSerialsInDialog`) — Shows serial numbers in a compressed form in the serials-selection dialog, so long runs of serials display compactly.

**Search in Serials When Entering Item Code** (`value.searchInSerialsWhenEnterItemCode`) — When on, the value typed into the item-code field is also matched against serial numbers, so scanning a unit's serial adds the corresponding item.

**Update Prices According to Lot** (`value.updatePricesAccordingToLotId`) — When on, changing the lot on a sales/invoice line re-triggers price calculation (price can depend on the chosen lot). Use it when you maintain lot-specific pricing.

**Use Color / Size / Revision in Unit Conversions** (`value.useColorInUomConversions`, `value.useSizeInUomConversions`, `value.useRevisionInUomConversions`) — When on, a unit-of-measure conversion rule that specifies a color/size/revision applies only to lines with the same value, letting the same item have variant-specific conversion factors.

**Allow Delete From Item Colors And Sizes Grid If Transactions Found** (`value.allowDeleteFromItemColorsAndSizeAfterTransactions`) — An item's colors-and-sizes grid is normally protected once a combination has been used: the system refuses to delete a row that already has movements behind it, because deleting it would leave that history pointing at nothing. When on, those rows can be deleted anyway. Use it only for a controlled clean-up of variants that were created by mistake, and switch it back off afterwards.

**Allow Delete From Item Revisions Grid If Transactions Found** (`value.allowDeleteFromItemRevisionsAfterTransactions`) — The same relaxation for the item's revisions grid, so a revision that already appears on documents can still be deleted. The same warning applies: leave it off in day-to-day operation.

## Production & Expiry Dates

**Allow Inconsistent Production Date** (`value.allowInconsistentProductionDate`) — Normally a lot must keep one production date; a line with a different production date for the same lot is rejected. When on, that check is skipped.

**Allow Inconsistent Expiry Date** (`value.allowInconsistentExpiryDate`) — The same for expiry date — different expiry dates for the same lot are allowed.

**Do Not Check Conformity of Production and Expiry Date** (`value.notCheckingConformityOfProductionAndExpiry`) — Normally the system enforces that production date is before expiry date. When on, that sanity check is skipped. Leave off to catch data-entry mistakes.

## Active & Inactive Percentage

**Allow Numbers and Letters for Active / Inactive Percentage** (`value.allowNumbersAndLettersForActivePercentage`, `value.allowNumbersAndLettersForInActivePercentage`) — The percentage property normally accepts numbers only. When on, the field may also contain letters/symbols, for use as a coded/text marker rather than a strict number.

## Measures

> "Measures" are physical dimensions captured on a line (length × width × height) used to compute quantity for cut materials such as glass, steel sheet, fabric, or wood. The "clipped" parts are the trimmed/cut-off portions deducted from the measured area.

**Only Standard Measures Used in Purchase Invoice** (`value.restrictInPurchases`) *(default on)* — Restricts purchase lines to standard (pre-defined) measures rather than ad-hoc dimensions, keeping purchased dimensions limited to your defined standard set.

**Measures Factor** (`value.measuresFactor`) — A global factor multiplied into the quantity computed from a line's measures, used to convert measured dimensions into the stocked quantity.

**Use Clipped Part One / Two Measures** (`value.useClippedPart1Measures`, `value.useClippedPart2Measures`) — Shows and tracks the first (or second) "clipped" measurement set, so the cut-off portion can be recorded and subtracted in the measures quantity calculation. For cut-to-size operations.

**Measures Factor List** (`value.mFactors`) *(table)* — Per-document-type and per-unit measures factors, used instead of the single global factor. Each line carries a factor, a document type, and an optional unit; the system picks the matching line, falling back to the global *Measures Factor* when none matches.

## Validating Old vs New Item Price (by dimension)

When a sales document is edited, the system can verify that an item line's price has not changed from before. To do that it matches the new line back to the corresponding old line. These switches decide **which dimensions are part of that match** — if a switch is on and that dimension differs between the old and new line, the lines are treated as different (so the line goes through full price re-validation rather than being treated as unchanged). Turn on a dimension when it genuinely distinguishes a different price; leave it off to ignore it when pairing old/new lines.

The dimensions available:

| Dimension | Field ID |
|---|---|
| Warehouse | `value.considerWarehouseWhenValidatingOldItemPriceWithNewItemPrice` |
| Locator | `value.considerLocatorWhenValidatingOldItemPriceWithNewItemPrice` |
| Size | `value.considerSizeWhenValidatingOldItemPriceWithNewItemPrice` |
| Color | `value.considerColorWhenValidatingOldItemPriceWithNewItemPrice` |
| Measures | `value.considerMeasuresWhenValidatingOldItemPriceWithNewItemPrice` |
| Lot | `value.considerLotIdWhenValidatingOldItemPriceWithNewItemPrice` |
| Serial Number | `value.considerSerialNumberWhenValidatingOldItemPriceWithNewItemPrice` |
| Second Serial | `value.considerSecondSerialWhenValidatingOldItemPriceWithNewItemPrice` |
| Revision | `value.considerRevisionIdWhenValidatingOldItemPriceWithNewItemPrice` |
| Box | `value.considerBoxWhenValidatingOldItemPriceWithNewItemPrice` |
| Active % | `value.considerActivePercWhenValidatingOldItemPriceWithNewItemPrice` |
| Inactive % | `value.considerInActivePercWhenValidatingOldItemPriceWithNewItemPrice` |
| Sub-Item | `value.considerSubItemWhenValidatingOldItemPriceWithNewItemPrice` |

**Ignore Serials Processing Before a Specific Date** (`value.ignoreSerialsProcessingBeforeSpecificDate`) — Any transaction dated on or before this cutoff skips serial processing/validation entirely. Set it to your serials go-live date so historical documents that predate serial tracking aren't reprocessed.

## Dimension Checks When Editing Linked Stock Documents

When you edit a stock document (issue/receipt) already linked to an invoice, the system verifies that each line's dimensions still match what the linked invoice recorded, keeping the two consistent. Each switch here **relaxes that check for one dimension** — when on, that dimension is excluded from the consistency check, so it can be edited on the stock document without forcing a match with the invoice. Default (off) means the dimension is checked.

The dimensions available:

| Dimension | Field ID |
|---|---|
| Box | `value.doNotCheckBoxWhenChangingStockDocLinkedToInvoices` |
| Color | `value.doNotCheckColorWhenChangingStockDocLinkedToInvoices` |
| Lot | `value.doNotCheckLotIdWhenChangingStockDocLinkedToInvoices` |
| Measures | `value.doNotCheckMeasuresWhenChangingStockDocLinkedToInvoices` |
| Revision | `value.doNotCheckRevisionIdWhenChangingStockDocLinkedToInvoices` |
| Serial Number | `value.doNotCheckSerialNumberWhenChangingStockDocLinkedToInvoices` |
| Second Serial | `value.doNotCheckSecondSerialWhenChangingStockDocLinkedToInvoices` |
| Size | `value.doNotCheckSizeWhenChangingStockDocLinkedToInvoices` |
| Active % | `value.doNotCheckActivePercentageWhenChangingStockDocLinkedToInvoices` |
| Inactive % | `value.doNotCheckInActivePercentageWhenChangingStockDocLinkedToInvoices` |
| Sub-Item | `value.doNotCheckSubItemWhenChangingStockDocLinkedToInvoices` |

Use these only when you intentionally allow a specific dimension to differ between the stock document and its invoice.
