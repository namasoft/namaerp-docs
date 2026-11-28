---
title: EACopyTaxesFromFromDoc
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACopyTaxesFromFromDoc

## Overview

Copies maximum normal tax percentages (Tax1-Tax4) from parent invoice lines to child invoice lines. Ensures tax consistency across related documents by synchronizing tax rate settings between source and derived invoices.

## When This Action Runs

Manual execution on invoice documents that have parent-child line relationships, typically when tax rates need to be synchronized from source invoices to derived documents such as sales or purchase returns.

## How It Works

1. **Processes invoice lines** - Iterates through all document lines (only InvoiceLine types)
2. **Finds parent lines** - Locates corresponding parent invoice line from source document
3. **Initializes null values** - Updates null tax fields on both parent and child lines
4. **Copies tax percentages** - Transfers maximum normal percentages for all four tax types
5. **Skips non-invoice lines** - Ignores lines that are not InvoiceLine instances

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **Invoice Lines** - Updates tax percentage fields (MaxNormalPercent for Tax1-Tax4)
- **Parent Document References** - Reads parent line relationships (read-only)
- **Price Information** - Modifies tax components within line pricing

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACopyTaxesFromFromDoc`


</div>

