---
title: EAEcommerceReadReturns
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEcommerceReadReturns

## Overview

Reads return orders (credit memos / RMAs) from an e-commerce site — Magento, Amazon or any other configured site reader — and imports them into the ERP as sales returns. Each imported return is linked back to the original sales document when a matching source invoice can be found.

## When This Action Runs

Manual execution or a scheduled task that keeps ERP sales returns in sync with the e-commerce site. Typically used for regular return synchronization, or for catch-up processing after downtime by supplying an explicit start date.

## How It Works

1. **Resolves the site** - Finds the `MAGMagentoSite` by the given site code; if no site matches the code and the action runs on a site record, that record is used instead
2. **Guards against parallel runs** - Only one return read may run per site at a time; simultaneous runs are prevented and a concurrent attempt fails with a clear message
3. **Reads returns from the site** - Reads the returns from the site, either from the supplied date or from the site's configured read-from date when no date is given
4. **Skips already-imported returns** - Loads the source ids of returns already present in the ERP for that site and date range, and ignores returns that were imported before
5. **Links to the source invoice** - For each new return, searches for the originating sales document and attaches it as the source document
6. **Saves each return** - Imports the return using the entity type configured in the site's return generation info (defaults to `SalesReturn`)
7. **Accumulates results** - Collects the success/failure result of every imported return into a single accumulating result

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to read returns from

**Parameter 2:** Read Returns From Date (yyyy-MM-dd, empty = site configured date) (Optional) - Start date in `yyyy-MM-dd` format; when empty, the date configured on the site is used

## Example Usage

- Parameter 2: *(empty)* - Reads returns starting from the site's configured read-from date
- Parameter 2: `2026-01-01` - Reads returns created on or after 1 January 2026

An unparsable date is rejected during parameter validation with the message "Can not parse date …, expected format is yyyy-MM-dd".

## Database Tables Affected

- **MAGMagentoSite** - References the e-commerce site configuration (read-only)
- **SalesReturn** (or the entity configured as the site's return import type) - Creates the imported return documents
- **MAGSiteError** - May create or update integration error entries for failed returns
- **Sales Documents** - Read-only lookup of the source invoice/order linked to each return

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadReturns`


</div>
