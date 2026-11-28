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
2. **Retrieves packing data** - Groups the packing list lines of the sales order by their ref1 field and takes the n1 value of the first line of each customer
3. **Finds existing quotations** - Looks for quotations already linked to this sales order
4. **Creates/updates quotations** - For each customer group:
   - Creates new quotation or updates existing one (based on ref4 reference)
   - Copies header data from sales order with field mapping
   - Sets customer, from document, and reference relationships
   - Copies that n1 value to the n1 field of the quotation when it is not zero
   - Creates quotation lines from corresponding sales order lines
5. **Updates order references** - Sets ref4 on sales order lines to link back to quotations
6. **Cleans up orphans** - Deletes the quotations whose ref5 is this sales order and that no line of the order points to any more

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
- **Sales order packing list lines** - Reads ref1 and n1 (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EAMultiCustomerSalesOfferCreator`

**Related Entities:**
- **SalesOrder** - Source document containing multi-customer lines
- **SalesQuotation** - Generated quotations for individual customers
- **Sales order packing list lines** - Source of the n1 value copied to each quotation


</div>