---
title: EARecalcPurchasePrices
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARecalcPurchasePrices

## Overview

Recalculates purchase prices for all lines in purchase documents by temporarily enabling price updates and triggering the standard purchase price recalculation logic. Updates unit prices, discounts, and related calculations based on current supplier pricing, purchase agreements, and system pricing rules.

## When This Action Runs

Manual execution on purchase documents when prices need to be refreshed with current supplier pricing information, typically after price list updates, supplier negotiations, or when purchase prices appear outdated.

## How It Works

1. **Initializes update scope** - Creates DiscountUpdateScope if not already present
2. **Saves current price update setting** - Preserves original updatePrice flag value
3. **Enables price updates** - Temporarily sets updatePrice to true to allow recalculation
4. **Triggers price recalculation** - Recalculates the price of every line that has an item and is not a free line; free lines and lines without an item are skipped
5. **Restores original setting** - Returns updatePrice flag to its previous state
6. **Maintains document consistency** - Ensures pricing updates don't affect other update behaviors

## Parameters

This action does not require any parameters - it automatically recalculates all purchase prices in the document.

## Database Tables Affected

- **Purchase Document Lines** - Updates unit prices, line totals, and discount calculations
- **Supplier Price Lists** - Reads current pricing information (read-only)
- **Purchase Agreements** - Uses contract pricing when applicable (read-only)
- **Item Master Data** - Reads standard purchase prices (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EARecalcPurchasePrices`

**Document Type:** Purchase Documents Only

**Related Utilities:** PurchasePriceUtils for price calculations


</div>

