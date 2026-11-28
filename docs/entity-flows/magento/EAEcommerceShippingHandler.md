---
title: EAEcommerceShippingHandler
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEcommerceShippingHandler

## Overview

Handles e-commerce shipping operations for supply chain documents through configured shipping sites. Processes various shipping requests including order creation, updates, cancellations, and status checks via integrated shipping APIs.

## When This Action Runs

Manual execution on supply chain documents that require shipping integration. Typically used during order fulfillment processes when shipments need to be created, updated, or tracked through third-party shipping providers.

## How It Works

1. **Validates document type** - On a record that is not a supply chain document the flow fails with *You can only use this entity flow with supply chain documents*
2. **Finds shipping site** - Locates the EcommerceShippingSite using the provided site code; the flow fails with *Can not find shipping site with code {0}* when there is none
3. **Creates request info** - Packages document and parameters into shipping request structure
4. **Validates request type** - A request parameter that is not one of the supported values is rejected when the entity flow is saved, with *Request parameter {0} is not supported*
5. **Delegates to site** - Hands the request to the shipping site, which sends it to the shipping provider
6. **Processes response** - Handles results and any errors from the shipping operation

## Parameters

**Parameter 1:** Site Code (Required) - Code of the EcommerceShippingSite to use for shipping

**Parameter 2:** Request Parameter (Required) - Type of shipping operation to perform, one of the values under Supported Request Parameters, written exactly as shown

**Parameter 3:** Default Customer Email (Optional) - Fallback email for shipping notifications

**Parameter 4:** Default Shipping Note (Optional) - Default note to include with shipments

**Parameter 5:** Refresh Token (Optional) - Authentication token for API access

**Parameter 6:** Magento Order Number Tempo (Optional) - Template for extracting Magento order numbers

**Parameter 7:** Invoice Code Template (Optional) - Template for generating invoice codes

**Parameter 8:** Count Items Query (Executed per line) (Optional) - SQL query executed per line; the order's package count adds the line's quantity multiplied by the number it returns. The quantity sent for the line itself is not changed

**Parameter 9:** Send Warehouse From Line (Optional) - true/false to include warehouse info from line

**Parameter 10:** Send Warehouse From Header (Optional) - true/false to include warehouse info from header

**Parameter 11:** Order ID From Tempo (Optional) - Tempo template to directly set the shipping order ID. When provided, this takes **highest priority** over other order ID resolution methods (such as sales code or Invoice Code Template)

**Parameter 12:** Ref1 Tempo (Optional) - Tempo template to directly set the Ref1 field. When provided, this takes **highest priority** over the default Ref1 resolution (Magento Source ID or Magento Order Number Tempo)

**Parameter 13:** Delivery Slot Date Field (Optional) - Field ID on the document to read the delivery slot date from. Directly sets the shipping order's delivery slot date from the specified field. Note: This must be a date field

## Supported Request Parameters

- `healthCheck` - Check API connectivity and status
- `createOrder` - Create new shipping order
- `createPickupOrder` - Create pickup order for returns
- `updateOrder` - Update existing shipping order
- `cancelOrder` - Cancel shipping order
- `orderHistory` - Retrieve order history and status


**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceShippingHandler`


</div>