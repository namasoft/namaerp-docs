---
title: EAEcommerceReadAbandonedCarts
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEcommerceReadAbandonedCarts

## Overview

Reads abandoned carts, meaning carts a shopper filled but never checked out, from a Zid e-commerce site and saves each one as a document. It works for sites of type Zid only; on any other site it fails with *The method readAbandonedCart is available for sites with type ZID only*. See [Zid Integration](/modules/ecommerce/zid-integration) for the document each cart is saved as and how far back each run reads.

## When This Action Runs

Manual execution or scheduled tasks for abandoned cart analysis and recovery campaigns. Typically used for marketing automation, customer retention efforts, or business intelligence reporting on e-commerce behavior.

## How It Works

1. **Finds the site** - Looks up the e-commerce site (`MAGMagentoSite`) by the code in parameter 1. When no site has that code and the flow runs on an e-commerce site record, that record is used; otherwise the run fails with *Can not find site with code {0}*
2. **Sets record limit** - Uses parameter 2, or 50 when it is empty or zero
3. **Reads the carts** - Asks Zid for the abandoned carts, that many per call
4. **Saves each cart** - Saves every cart as a document and moves the site's **Last Abandoned Cart Read Date** forward
5. **One read at a time** - Only one abandoned-cart read runs per site; when another is still running the run fails with *Another readAbandonedCarts is already running for site {0} ; skipping to avoid blocking on long-running JDBC work.*

## Parameters

**Parameter 1:** Site Code (Required) - Code of the Zid e-commerce site to read abandoned carts from

**Parameter 2:** Maximum Records To Read Per Call (default 50) (Optional) - Limit for number of records per API call. It must be a whole number or empty

## Database Tables Affected

- **MAGMagentoSite** - Reads the site configuration and updates its **Last Abandoned Cart Read Date**
- The document type each cart is saved as, chosen on the site record

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceReadAbandonedCarts`


</div>