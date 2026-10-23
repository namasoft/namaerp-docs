---
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Sales & Offers Configuration

This page documents the **Sales & Offers** tab — settings for sales documents, offers and coupons, discounts, free items, and the price classifiers used in pricing.

![The Sales & Offers tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-sales-and-offers-en.png)

## Sales

**Activate Invoice Items Count Offers** `value.activateInvoiceItemsCountOffers` — Master switch for "buy-X-get-Y" item-count promotions on the invoice. When off, offers that use item-count rules are rejected at validation; turn it on to evaluate and apply them.

**Min Sales Quantity Multiples is Per Count** `value.minSalesQtyIsPerCount` — Changes how the item's minimum-sales-quantity multiples rule is enforced: when on, the rounding is applied on the counted/packed quantity rather than the raw prime quantity. (POS sales/returns are exempt.)

**Use Control Journals** `value.useControlJournals` — When on, stock receipt/issue type setups require a second pair of debit/credit accounts, enabling dual ("control") journal entries for stock movements. Turn on when accounting policy requires control/clearing accounts alongside the main stock entries.

**Do Not Save Sales Documents if Item Not Sellable** `value.doNotSaveSalesDocsIfItemNotSellable` *(on in newly created databases)* — When on, saving a sales document is blocked if any line uses an item flagged "not sellable".

**Do Not Save Sales Return Documents if Item Not Returned** `value.doNotSaveSalesReturnDocsIfItemNotReturned` *(on in newly created databases)* — When on, saving a sales return is blocked if any line uses a non-returnable item.

**Insert N1 / N2 / N3 in Sales Invoice Lines** `value.insertN1inSalesInvoiceLines` / `value.insertN2inSalesInvoiceLines` / `value.insertN3inSalesInvoiceLines` — When on, the corresponding note/analysis field (N1, N2, N3) is shown and populated on sales lines from the **sales price list** when an item is chosen.

**Update Tax Registration and Commercial Registration Number in Sales with Save** `value.updateTaxRegNoAndCommercialRegNoInSalesWithSave` — When on, the customer's tax-registration and commercial-registration numbers are refreshed from the customer file onto the document each time it is saved.

**Calculate Total Quantity in Sales from Sales Unit** `value.totalQtyIsInSalesUnitForSales` — When on, the document's total-quantity figure on sales documents is expressed in the sales unit rather than the item's base unit.

**Do Not Create Ledger Effects for Stock Adjustments from Opening Documents** `value.doNotCreateLedgerEffectForOpeningStockAdjustmentDocs` — When on, stock-adjustment documents generated from opening-stock documents do not produce an accounting effect, avoiding duplicate ledger entries when opening adjustments are accounted for elsewhere.

**Ignore Unbalanced Adjustments Less Than** `value.ignoreUnbalancedAdjustmentsLessThan` *(default 2)* — A tolerance amount: when cost processing produces a tiny unbalanced stock-adjustment difference smaller than this value, it is ignored rather than recorded. Raise or lower it to control how large a rounding imbalance the system tolerates.

**Must Match Line Unit with Sales Price List Unit** `value.mustMatchLineUomWithSalesPriceListUom` — When on, a sales price-list price is used only if the line's unit of measure matches the price-list line's unit.

## Offers & Discounts

**Automatic Coupons in Supply Chain** `value.automcaticCouponsInSC` — When on, the sales invoice searches for and applies applicable coupons automatically, without manual entry.

**Allow Repeating Offer and Price Lists Priority** `value.allowRepeatingOfferPriority` — By default each offer / price list needs a unique priority and duplicates are rejected. When on, two or more may share the same priority number.

**Prevent Non-Offered Discounts** `value.preventNonOfferedDiscounts` — When on, manual discounts are blocked so that only discounts coming from defined offers are allowed — stopping users from giving ad-hoc discounts outside approved promotions. Concretely, when a line is priced, a discount that no offer covers is set back to zero; this happens in both the sales documents and the POS. See [Salesman Discount Limits](/modules/invoicing/salesman-discount-limits).

**Ignore Other Offers if There is an Item Count Offer** `value.ignoreOtherOffersIfThereIsItemCountOffers` — When on, if an item-count offer flagged to stop other discounts applies, the system cancels the other line discounts and free items so promotions don't stack.

**Invoice Classifications Per Line in Offers** `value.invoiceClassificationsPerLineInOffers` — When on, each free-item/offer line can carry its own invoice classification instead of inheriting the offer header's classification.

**Must Match Line Unit with Offer Unit** `value.mustMatchLineUomWithOfferUom` — When on, an offer applies to a line only if the line's unit matches the offer's unit; mismatched-unit lines are skipped.

**Activate Invoice Discount Calculation from Offers** `value.activateInvDiscountCalculationFromOffers` — When on, header-level (whole-invoice) discounts can be calculated automatically from offer rules. When off, offers containing invoice-discount rules are rejected.

**Exclude Items with Discount in Header Discount Offer** `value.excludeItemsWithDiscInHeaderDisc` — When on, lines that already have an item-level discount are excluded from the base used to compute the header discount offer, preventing double-discounting.

**Exclude Items with Free Items in Header Discount Offer** `value.excludeItemsWithFreeItemsInHeaderDisc` — When on, lines that already received free items are excluded from the header discount offer calculation.

**Activate Free Items on Invoice Offers** `value.activateFreeItemsOnInvoiceOffers` — Master switch for invoice-value free-item promotions ("spend X, get Y free"). When off, such offer lines are rejected.

**Show In-Progress Sales Orders Only** `value.showOnProgressOrderOnly` — Intended to restrict the "based-on" source-document picker so only sales orders whose status is *In Progress* are listed, hiding completed/closed orders.

**Apply Manual Free Items Automatically Without Action** `value.applyFreeItemsAutomaticallyWithoutAction` — When on, manual free-item offers are applied automatically as soon as the free-item code is entered, without running a separate action.

**Show Updated Discount Values/Percentages in Offers** `value.showUpdatedDiscountsOfItemsInOffers` — A display option: when on, the sales invoice grid shows the updated discount values/percentages produced by offers.

**Prioritized Stop Other Discounts Across Offer Types** `value.prioritizedStopOtherDiscountsAcrossTypes` — Offers and discounts each carry a priority, and an offer can be flagged to *stop other discounts*. Normally that "stop" only affects offers of the same kind. When this is on, the strongest-priority offer that is flagged to stop other discounts becomes a single cut-off applied across **all** offer types at once — item discounts, whole-invoice (header) discounts, free-item offers, and item-count offers. Any offer or discount ranked below that cut-off is dropped, and manual discounts in the discount slots it clears are forced to zero. Use it when one top-priority promotion should override every weaker discount no matter which offer type produced it.

## Offer Matching Dimensions

When the *Consider Item Total Quantity in Offers* aggregation is used, the quantities of the same item spread across several invoice lines are summed together when checking offer/discount eligibility. The switches below decide which item properties are treated as *separate* when summing — turning one on means that property becomes part of the grouping key, so different values are counted separately rather than combined.

**Consider Item Total Quantity in Offers** `value.considerItemTotalQtyInOffers` — The master switch that turns on summing an item's quantity across the whole invoice (rather than judging each line on its own) when checking offers.

Each switch below adds the corresponding property to the offer aggregation key, so variants are counted separately when totalling for offers:

| Property | Field ID |
| --- | --- |
| Consider Item Revision in Offers | `value.considerItemRevisionInOffers` |
| Consider Item Color in Offers | `value.considerItemColorInOffers` |
| Consider Item Size in Offers | `value.considerItemSizeInOffers` |
| Consider Item Lot in Offers | `value.considerItemLotInOffers` |
| Consider Item Box in Offers | `value.considerItemBoxInOffers` |
| Consider Item Active % in Offers | `value.considerItemActivePercentInOffers` |
| Consider Item Inactive % in Offers | `value.considerItemInActivePercentInOffers` |
| Consider Item Sub-Item in Offers | `value.considerItemSubItemInOffers` |

## Price Classifiers

**Use Price Classifier 1 … 5** — Each switch turns on an extra price-classifier dimension used when searching sales price lists. When on, a price-list line matches only if its classifier value matches the document line (or the price-list value is blank). Use these when you price the same item differently along extra dimensions such as customer category or sales channel.

| Property | Field ID |
| --- | --- |
| Use Price Classifier 1 | `value.usePriceClassifier1` |
| Use Price Classifier 2 | `value.usePriceClassifier2` |
| Use Price Classifier 3 | `value.usePriceClassifier3` |
| Use Price Classifier 4 | `value.usePriceClassifier4` |
| Use Price Classifier 5 | `value.usePriceClassifier5` |
