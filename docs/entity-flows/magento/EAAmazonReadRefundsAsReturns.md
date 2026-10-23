---
title: EAAmazonReadRefundsAsReturns
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAAmazonReadRefundsAsReturns

## Overview

Reads the refunds of the Amazon orders you list from Amazon's Finances API and imports them as sales returns. Use it for refunded orders that do not appear in the FBA customer returns report, so they are not picked up by the normal returns import. Orders that already have an imported return are skipped, so running it twice for the same order does not create a second return.

## When This Action Runs

Manually, usually from a Task Schedule run on demand with **Run Now**, whenever you have a list of refunded orders to bring in. It ignores the record it runs on; the site and the orders come from its parameters.

## How It Works

1. **Finds the site** - Looks up the Amazon e-commerce site (`MAGMagentoSite`) by the code in parameter 1.
2. **Reads the order IDs** - Splits parameter 2 on commas, spaces and new lines, removes blanks and duplicates. If no ID is left, the run fails with "No order IDs provided".
3. **Reads the refunds** - For each order ID, asks the Amazon Finances API for the order's refunds and turns them into returns. Refunds of the same order made on the same day are merged into one return, so an order refunded twice on one day gives one return with both refunds' items, while refunds on different days give one return per day.
4. **Skips orders that already have a return** - For each order, looks for an existing return of the site whose source ID is the order ID (or starts with the order ID followed by `-`). Such orders are skipped with a warning: "Order ... already has an imported return, skipped".
5. **Saves the returns** - The remaining returns are saved as the document type set in the site's return generation settings (Sales Return when none is set).
6. **One import at a time** - Only one returns import runs per site at a time; if another one is already running for the site, the run fails with "Another returns import is already running for site ...".

## Parameters

**Parameter 1:** Amazon Site Code (Required) - The code of the Amazon e-commerce site record.

**Parameter 2:** Amazon Order IDs (separated by comma, space or new line) (Required) - The Amazon order numbers whose refunds should be imported, for example `112-1234567-1234567, 113-7654321-7654321`.

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAAmazonReadRefundsAsReturns`

## Related Actions

- [EAEcommerceReadReturns](EAEcommerceReadReturns.md)
- [EAEcommerceReadAmazonNotifications](EAEcommerceReadAmazonNotifications.md)
- [EAEcommerceReadOrders](EAEcommerceReadOrders.md)


</div>
