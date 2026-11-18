---
title: EAMultiCustomerSalesOfferCreator
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAMultiCustomerSalesOfferCreator

## Overview

Creates individual sales quotations for multiple customers from a single sales order that contains lines for different customers. Groups sales order lines by customer (stored in ref1 field), creates separate quotations for each customer, and maintains relationships between the original order and generated quotations.

## When This Action Runs

Manual execution on sales orders that contain lines for multiple customers, typically when a bulk order needs to be split into individual customer quotations for separate processing, pricing, or approval workflows.

## How It Works

1. **Groups lines by customer** - Uses ref1 field to identify customer for each sales order line
2. **Retrieves packing data** - Gets associated packing list information for pricing (n1 field)
3. **Finds existing quotations** - Looks for quotations already linked to this sales order
4. **Creates/updates quotations** - For each customer group:
   - Creates new quotation or updates existing one (based on ref4 reference)
   - Copies header data from sales order with field mapping
   - Sets customer, from document, and reference relationships
   - Copies pricing information from packing list
   - Creates quotation lines from corresponding sales order lines
5. **Updates order references** - Sets ref4 on sales order lines to link back to quotations
6. **Cleans up orphans** - Deletes quotations that are no longer referenced

## Parameters

**Parameter 1:** Reserved (Not used)

**Parameter 2:** Fields Map (Required) - Field mapping for copying header data from sales order to quotations

```fieldmap
code=code
currency=currency
term=term
```

## Database Tables Affected

- **SalesQuotation** - Creates new quotations or updates existing ones
- **SalesQuotationLine** - Creates quotation lines from sales order lines
- **SalesOrder** - Updates ref4 references on lines to link to quotations (read/update)
- **PackingList** - Reads pricing information (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EAMultiCustomerSalesOfferCreator`

**Related Entities:**
- **SalesOrder** - Source document containing multi-customer lines
- **SalesQuotation** - Generated quotations for individual customers
- **PackingList** - Source of pricing information


</div>