---
title: EACollectStockDocsIfEmpty
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACollectStockDocsIfEmpty

## Overview

Fills the **Stock Documents** grid of an invoice or return with the committed stock documents that are not linked to any invoice yet. It does nothing when the grid already has lines.

## When This Action Runs

Attach it to sales or purchase invoices and returns that carry a Stock Documents grid, to collect the stock documents without the user picking them.

## How It Works

1. **Checks existing links** - Stops if the Stock Documents grid of the invoice already has lines
2. **Chooses the stock document type** - Stock issues for a sales invoice or a purchase return (and the Service Center sales invoice and purchase return); stock receipts for every other document
3. **Collects stock documents** - Takes the committed stock documents that have no invoice, are not ticked **Do Not Auto Collect In Invoices**, are in the invoice's warehouse (when the invoice has one) and belong to the same supplier (purchase documents) or customer (sales documents). The collection options of the invoice's document term (contact, subsidiary, sector, branch, department, analysis set, and **Consider From Document When Collect Documents**) narrow the list further
4. **Links to invoice** - Adds one line per collected stock document to the Stock Documents grid

## Parameters

This action does not require any parameters.

## Database Tables Affected

- **Invoice Tables** - Updates invoice with stock document references
- **Stock Document Tables** - Reads stock issues or stock receipts (read-only)

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EACollectStockDocsIfEmpty`


</div>

