---
title: EADarTibaServiceInvoiceTermSetter
module: namapos
entities: [EntityFlow]
---


<div class='entity-flows'>

# EADarTibaServiceInvoiceTermSetter

## Overview

Sets the document term (configuration) of a POS sales document, but only when all items in the document are service items. Designed specifically for service-only invoices that need their own term. If any non-service items are present, the term setting is skipped.

## When This Action Runs

Manual execution on POS sales documents where service-only documents need a different term. Typically used in service-based businesses or mixed retail environments where service sales are handled differently from physical products.

## How It Works

1. **Validates parameter** - Checks that a term code or ID is provided in parameter 1
2. **Filters non-service items** - Identifies any items in the document that are not service items
3. **Service-only check** - If any non-service items exist, skips term setting and returns
4. **Sets document term** - If all items are services, sets the specified term on the document
5. **Accumulates results** - Collects any validation errors or success status

## Parameters

**Parameter 1:** Term Code or ID (Required) - The code or ID of the document term to set on the service-only document

## Database Tables Affected

- **DocumentTerm** - The term set on the document (read-only)
- **POS Sales Document** - Updates the term field when conditions are met
- **Item/Service Tables** - Reads item type information to filter services (read-only)

**Module:** namapos

**Full Class Name:** `com.namasoft.modules.namapos.utiles.actions.EADarTibaServiceInvoiceTermSetter`


</div>

