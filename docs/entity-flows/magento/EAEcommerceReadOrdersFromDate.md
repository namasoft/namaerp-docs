---
title: EAEcommerceReadOrdersFromDate
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEcommerceReadOrdersFromDate

## Overview

Reads orders from an e-commerce site starting from a point in time: the site's last order-read date when parameter 2 is empty, or a point counted back from the current time when it is filled. The orders are saved through the site's order import.

## When This Action Runs

Manual execution or scheduled tasks for bulk order imports. Typically used for regular synchronization jobs, catch-up processing after system downtime, or initial data migration from Magento to the ERP system.

## How It Works

1. **Validates site code** - Finds the e-commerce site (`MAGMagentoSite`) by the code in parameter 1; the flow fails with *Can not find site with code {0}* when there is none
2. **Calculates the start** - With parameter 2 empty, the start is the date and time the site's orders were last read up to. With a number N in parameter 2, the start is the current time minus N minutes
3. **Reads and saves the orders** - Reads the site's orders from that start onwards and saves them through the site's order import
4. **Accumulates results** - Collects status information and errors during processing

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to read orders from

**Parameter 2:** Read Orders Before (N - Number) days (Optional) - A whole number N, or empty. Empty reads from the site's last order-read date. A number reads from the current time minus N minutes

## Database Tables Affected

- **MAGMagentoSite** - References the e-commerce site configuration
- **Order Tables** - Creates or updates order data (varies by implementation)
- **Customer Tables** - May update customer information from orders
- **Product Tables** - May update product information from order lines
- **Integration Logs** - Creates log entries for API calls and processing

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadOrdersFromDate`


</div>