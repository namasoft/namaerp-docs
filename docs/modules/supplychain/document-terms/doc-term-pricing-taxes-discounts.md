---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# Pricing, Taxes & Discounts Configuration

This tab controls how unit prices, discounts, and taxes are calculated on documents created under the term — whether they are forced from price lists, recalculated on save, locked after a from-document, or excluded from item cost. The options apply to both sales and purchase documents; many are restricted to one side or to a single document type, as noted on each option.

::: info Where to find it
Open the document's **Document Term** (توجيه), then the **Pricing, Taxes & Discounts** tab.
:::

![The Prices tab of the Sales Invoice document term](../../../ar/modules/supplychain/images/document-terms/doc-term-pricing-taxes-discounts-en.png)

## Taxes

Tax basics surface for any taxable `IInvoice` document (sales and purchase) and require the **Sales Tax** feature to be enabled.

**Taxable** `termConfig.taxable` — Marks documents created under this term as subject to tax, enabling tax calculation on the document. When off, no tax is computed.

**Tax Plan** `termConfig.taxPlan` — Selects the tax plan (the set of tax rules and rates) applied to documents of this term.

**Modifiable Tax** `termConfig.modifiableTax` — Allows the user to manually edit the computed tax value on the document instead of using only the auto-calculated tax.

**Allow Editing Header Tax In Details** `termConfig.allowEditingHdrTaxInDetails` — Permits editing the header (invoice-level) tax from within the detail lines.

**Editable Taxes** `termConfig.editableTaxes` — Allows the taxes to be edited manually. Defined on additional-cost / expense-style documents (receipt additional cost, LC expense, job-order expense) rather than the main sales/purchase invoice terms.

## Purchase Prices & Order Lock

These options live in the purchase **prices** group and govern how prices, discounts, and payments carried from a source purchase order behave on the purchase invoice. The lock family below applies to **Purchase Invoice / SI Purchase Invoice** only and each flag freezes one value copied from the source purchase order.

| Option | Field ID |
|---|---|
| Prevent Order Price Update | `termConfig.preventOrderPriceUpdate` |
| Prevent Order Total Discount Update | `termConfig.preventOrderTotalDiscountUpdate` |
| Prevent Order Discount Update | `termConfig.preventOrderDiscountUpdate` |
| Prevent Order First Discount Update | `termConfig.preventOrderFirstDiscountUpdate` |
| Prevent Order Second Discount Update | `termConfig.preventOrderSecondDiscountUpdate` |

**Disable After Use** `termConfig.disableAfterUse` — Once the order/document has been consumed by a downstream document, it is locked from further editing. Applies to Contracting Purchase Order, Purchase Order, Proforma Purchase Invoice, SI Purchase Order, and SI Purchase Invoice.

**Copy Remaining To Cash** `termConfig.copyRemainingToCash` — Copies the remaining (unpaid) amount into the cash-paid field, settling the document as paid in cash. Available on both purchase and sales documents.

**Payment Date Not Required** `termConfig.paymentDateNotRequired` — Makes the payment-line date optional, so payment lines can be saved without a payment date. Available on both purchase and sales documents.

**Run Auto Sales Pricing With Save** `termConfig.runAutoSalesPricingWithSaving` — Triggers the automatic sales-pricing routine (recomputing item sale prices) whenever a purchase document of this term is saved. Purchase documents only.

## Vendor Price Strategy

These sub-fields of the price strategy (ids `termConfig.priceStrategy.<x>`) govern how purchase prices and vendor discounts are sourced and re-applied. They appear in the purchase **prices** group.

**Force Price List** `termConfig.priceStrategy.forcePriceList` — On a purchase invoice, checks every line's price against the purchase price list when the document is saved and refuses the save where the two differ, so hand-typed prices cannot deviate from the list. Two limits are worth knowing: the check runs **only while *Reapply Price List on Save* is off** — with that option on, prices are simply re-fetched from the list and nothing is validated — and it applies to purchase invoices only, not to the other purchase documents.

**Do Not Check Items Without Price List** `termConfig.priceStrategy.doNotCheckItemsWithoutPriceList` — When Force Price List is on, allows saving even if some items have no price-list entry (skips the "item has no price" block).

**Apply Discounts** `termConfig.priceStrategy.useVendorDiscounts` — Applies the configured vendor/supplier discounts when pricing the purchase document. On by default.

**Reapply Price List on Save** `termConfig.priceStrategy.usePriceList` — Re-applies the price list to the document on each save, re-fetching prices from the list. On by default.

Each flag below suppresses the matching vendor discount slot so that discount tier is not applied during purchase pricing:

| Option | Field ID |
|---|---|
| Do Not Use Vendor Discount 1 | `termConfig.priceStrategy.doNotUseVendorDiscount1` |
| Do Not Use Vendor Discount 2 | `termConfig.priceStrategy.doNotUseVendorDiscount2` |
| Do Not Use Vendor Discount 3 | `termConfig.priceStrategy.doNotUseVendorDiscount3` |
| Do Not Use Vendor Discount 4 | `termConfig.priceStrategy.doNotUseVendorDiscount4` |
| Do Not Use Vendor Discount 5 | `termConfig.priceStrategy.doNotUseVendorDiscount5` |
| Do Not Use Vendor Discount 6 | `termConfig.priceStrategy.doNotUseVendorDiscount6` |
| Do Not Use Vendor Discount 7 | `termConfig.priceStrategy.doNotUseVendorDiscount7` |
| Do Not Use Vendor Discount 8 | `termConfig.priceStrategy.doNotUseVendorDiscount8` |

## Excluding Taxes & Discounts from Cost

These flags live in the purchase **taxAndDiscounts** group and control whether a given tax or discount is included in the computed **item cost**. They apply to purchase documents only.

Each flag below excludes the corresponding tax (1–4) from the computed item cost, so that tax is not capitalized into inventory cost:

| Option | Field ID |
|---|---|
| Exclude Tax 1 From Cost | `termConfig.excludeTax1` |
| Exclude Tax 2 From Cost | `termConfig.excludeTax2` |
| Exclude Tax 3 From Cost | `termConfig.excludeTax3` |
| Exclude Tax 4 From Cost | `termConfig.excludeTax4` |

Each flag below excludes the corresponding discount (1–8) from the item-cost calculation (the discount is not deducted from cost):

| Option | Field ID |
|---|---|
| Exclude Discount 1 From Cost | `termConfig.excludeDiscount1` |
| Exclude Discount 2 From Cost | `termConfig.excludeDiscount2` |
| Exclude Discount 3 From Cost | `termConfig.excludeDiscount3` |
| Exclude Discount 4 From Cost | `termConfig.excludeDiscount4` |
| Exclude Discount 5 From Cost | `termConfig.excludeDiscount5` |
| Exclude Discount 6 From Cost | `termConfig.excludeDiscount6` |
| Exclude Discount 7 From Cost | `termConfig.excludeDiscount7` |
| Exclude Discount 8 From Cost | `termConfig.excludeDiscount8` |

**Exclude Header Discount From Cost** `termConfig.excludeHeaderDiscount` — Excludes the header (invoice-level) discount from the item-cost calculation.

## Sales Pricing

This block is added only for **Sales** documents. It governs how sale prices are forced from price lists, how offers and free items are applied, minimum-quantity checks, coupons, and reward points.

**Invoice Type** `termConfig.invoiceType` — Classifies the sales document (invoice type), influencing downstream pricing and accounting treatment.

**Force Price List** `termConfig.forcePriceList` — Forces sale prices to be taken from the price list and blocks deviating manual prices.

**Do Not Check Header Discount While Force Price List** `termConfig.doNotCheckDiscountsWhileForcePriceList` — When Force Price List is active, skips validation of the header discount against the price list.

**Price List Default Price** `termConfig.priceListDefaultPrice` — Chooses which price-list price tier (e.g. default/min/max) is used as the default when pricing lines.

**Ignore Force Price List With Free Item** `termConfig.ignoreForcePriceListWithFreeItem` — Skips the Force-Price-List check for free items, so giveaway lines are not rejected for having no list price.

**Do Not Check Items Without Price List** `termConfig.doNotCheckItemsWithoutPriceList` — With Force Price List on, allows saving even if some sale items have no price-list entry.

**Do Not Force Price List When There is Sales Doc In From Doc** `termConfig.doNotForcePriceListWhenThereSalesDocInFromDoc` — Disables Force Price List when the from-document chain already contains a sales document, keeping the prices carried from the prior sales doc.

**Ignore Current Price When Calculating Prices** `termConfig.ignoreCurrentPriceWhenCalculatingPrices` — Ignores the line's existing/current price during recalculation, recomputing prices from scratch.

**Consider Discount Offers For Employee Discount Percentage Validation** `termConfig.considerDiscountOffersForEmpDiscountPercentageValidation` — Includes discount offers when validating the maximum discount percentage an employee may grant — an alternative to using Force Price List.

**Ignore Max Discount Validation If Discount Exists In From Doc** `termConfig.ignoreMaxDiscValidationIfDiscountExistsInFromDoc` — Skips the employee maximum-discount check for a discount that was already granted on the from-document. A quotation may have been approved with a 20% discount that exceeds what the salesman is normally allowed to give; without this option, converting it into an invoice re-runs the check and blocks the save even though nothing changed. With it on, each discount slot (1–8) on the line is compared with the same slot on the matching from-document line, and the header discount with the from-document's header discount — if the value and percentage are not higher than what was already there, the check is skipped. Raise a discount above the from-document figure and it is validated against the employee's limit as usual. Line matching relies on the line being carried over from the source document, so lines added manually on the new document are always validated.

**Calculate Invoice Discount From Offer With Save** `termConfig.calcDiscountFromOfferWithSave` — Recomputes the invoice discount from active offers every time the document is saved.

**Apply Free Items On Invoice With Save** `termConfig.applyFreeItemsOnInvoiceWithSave` — Applies free-item offers to the invoice value automatically on save.

**Force Item Prices From Units** `termConfig.forceItemPricesFromUnits` — Keeps every line's unit price inside the **Min Price** and **Max Price** of the matching row in the item's unit-of-measure table; a price outside that range is refused on save with
*Unit price cannot be less than {0} as force prices from units is activated* — «سعر الوحده لا يمكن ان يكون أقل من {0} حيث الألتزام بالاسعار من جدول الواحدات مفعله», or
*Unit price cannot be greater than {0} as force prices from units is activated* (no Arabic text; it shows in English on Arabic screens). An empty Max Price sets no ceiling. A free line with a zero or empty price is not checked.

**Prevent Sales If Quantity Less Than UOM Min Quantity** `termConfig.preventSalesIfQtyLessThanUOMMinQty` — Blocks saving when a line quantity is below the item's minimum sale quantity defined in the unit table.

**Consider Total Qty In Doc For Prevent Sales Less Than Min Qty** `termConfig.considerTotalQtyInDocForPreventSalesLessThanMinQty` — When applying the min-quantity check, sums the item's total quantity across the whole document rather than evaluating each line separately.

**Do Not Consider Current Discount Values When Recalculating** `termConfig.doNotConsiderCurrentDiscountValuesWhenRecalculating` — Ignores existing line discount values when re-running the price/discount recalculation.

**Stop Items Count Offers If From Document Not Empty** `termConfig.stopItemsCountOffersIfFromDocNotEmpty` — Disables item-count-based free-item offers when the document was built from a from-document.

**Stop Items Count Offers With Save** `termConfig.stopItemsCountOffersWithSave` — Disables item-count-based free-item offers from being (re)applied on save.

**Update Lines Discounts From Offers With Save** `termConfig.updateLinesDiscsFromOffersWithSave` — Refreshes line-level discounts from active offers on every save.

**Recalculate Discounts With Invoice Classifications** `termConfig.recalculateDiscountsWithInvoiceClassifications` — Recomputes discounts when an invoice classification is selected or changed.

**Discount Coupon Group** `termConfig.discountCouponGroup` — Restricts which discount-coupon group applies to documents of this term.

**Discount Coupon Book** `termConfig.discountCouponBook` — Selects the discount-coupon book whose coupons can be redeemed on these documents.

**Reward Points Configuration** `termConfig.rewardPointsConfig` — Links the reward/loyalty-points configuration applied when these sales documents are saved.

**Use Pick List** `termConfig.usePickList` — Enables pick-list (stock pulling) rules for the sales invoice. Sales Invoice only.

## Price-Update Control

A common complaint is "I changed the term and my discounts disappeared". This is not data loss. On a sales document, the prices and discounts of **every line** are worked out again when the user changes the **term**, the **value date** or the **subsidiary**. They are also worked out again when the user changes the **customer**, but only if *Update Price After Updating Customer* is on in supply chain configuration. Any price or discount typed by hand is replaced by what the price lists and offers give. Changing an item's quantity or unit reprices that one line. The options below switch these recalculations off, either for one event or completely.

These options are added to the From-Document group for any `IInvoice` document (sales and purchase). They decide when automatic price recalculation runs, which suggested price is offered, and whether prices freeze after a from-document, term change, or value-date change.

**Do Not Update Prices At All** `termConfig.doNotUpdatePricesAtAll` — Completely disables automatic price recalculation for the document; prices remain as entered.

**Do Not Calculate Prices, Discounts, and Free Items If Unit Price Exists** `termConfig.doNotCalcPricesIfUnitPriceExist` — Skips price/discount/free-item calculation for any line that already has a unit price.

**Ignore "Do Not Calculate Prices If Unit Price Exists" Before First Save** `termConfig.ignoreDoNotCalcPricesIfUnitPriceExistBeforeFirstSave` — Suspends the above flag until the document's first save, so initial pricing still runs.

**Do Not Automatically Add Unit Price** `termConfig.doNotAddUnitPriceAuto` — Prevents the unit price from being auto-filled when an item is selected; the user must enter it.

**Suggest Minimum Price** `termConfig.suggestMinPrice` — Suggests the item's minimum price as the line price.

**Suggest Default Price** `termConfig.suggestDefaultPrice` — Suggests the item's default price as the line price.

**Suggest Maximum Price** `termConfig.suggestMaxPrice` — Suggests the item's maximum price as the line price.

The flags below freeze prices after specific events so they are not recalculated:

| Option | Field ID |
|---|---|
| Do Not Update Prices After From Document | `termConfig.doNotUpdatePricesAfterFromDoc` |
| Do Not Update Prices And Discounts Copied From Document | `termConfig.doNotUpdatePricesAndDiscountsCopiedFromDoc` |
| Do Not Update Prices When There is Sales Doc In From Doc | `termConfig.doNotUpdatePricesWhenThereSalesDocInFromDoc` |
| Do Not Update Prices After Term | `termConfig.doNotUpdatePricesAfterTerm` |
| Do Not Update Prices After Value Date | `termConfig.doNotUpdatePricesAfterValueDate` |

## Installments

These options govern installment scheduling on `IInvoice` documents and the broader from-document set.

**Paid in Installments** `termConfig.paidInInstallments` — Marks documents under this term as paid via an installment schedule, enabling installment lines.

**Pay Installments In Order** `termConfig.payInstallmentsInOrder` — Forces installments to be paid in their defined sequence (earliest first).

**Do Not Copy Installments Lines Of From Doc** `termConfig.doNotCopyInstallmentsLinesOfFromDoc` — Prevents installment lines from being copied when building the document from a from-document.

**Allow Payment More Than Invoice Amount** `termConfig.allowPaymentMoreThanInvoiceAmount` — Permits recording payment amounts that exceed the invoice total (overpayment).
