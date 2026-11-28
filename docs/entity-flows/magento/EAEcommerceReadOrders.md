---
title: EAEcommerceReadOrders
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEcommerceReadOrders

## Overview

Reads specific orders from an e-commerce site by their order IDs and saves each one through the site's order import. The IDs are either typed in parameter 2 or rendered from a template in parameter 3 against the record the flow runs on.

## When This Action Runs

Manual execution when specific orders need to be imported or synchronized. Typically used for troubleshooting individual orders, manual order imports, or selective order processing based on specific order IDs.

## How It Works

1. **Validates site code** - Finds the e-commerce site (`MAGMagentoSite`) by the code in parameter 1; the flow fails with *Can not find site with code {0}* when there is none
2. **Takes the order IDs** - Uses parameter 2 when it is filled; otherwise renders the template in parameter 3 against the record the flow runs on. When both give nothing, no order is read
3. **Parses order IDs** - Splits the list on commas and drops repeated IDs
4. **Reads and saves each order** - Reads each order from the site by its ID and saves it through the site's order import
5. **Accumulates results** - Collects the result of every saved order

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to read orders from

**Parameter 2:** Order IDs (separated by comma [,]) (Optional) - Comma-separated list of the site's order IDs to read

**Parameter 3:** Order IDs template (e.g. {remarks}), used only when Order IDs is empty (Optional) - A template rendered against the record the flow runs on; its result is used as the comma-separated list of order IDs

Fill parameter 2 or parameter 3, not both: with both filled the entity flow is rejected on saving with *Parameter {0} and parameter {1} can not both be filled, use only one of them*.

## Example Order IDs Parameter

```
100001234,100001235,100001236
```

## Database Tables Affected

- **MAGMagentoSite** - References the e-commerce site configuration (read-only)
- **Order Tables** - Creates or updates order data (varies by implementation)
- **Customer Tables** - May update customer information from orders
- **Integration Logs** - May create log entries for API calls

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadOrders`


</div>