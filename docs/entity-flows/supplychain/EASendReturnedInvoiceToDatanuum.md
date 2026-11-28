---
title: EASendReturnedInvoiceToDatanuum
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASendReturnedInvoiceToDatanuum

## Overview

Synchronizes sales return/credit memo information with the Datanuum external service for reward points and loyalty program integration. Builds a comprehensive JSON payload containing return transaction details (original invoice reference, returned items, refund payments) and sends it to Datanuum's API to process loyalty point reversals and customer return history.

## When This Action Runs

Manual execution when sales return transactions need to be synchronized with the Datanuum loyalty system, typically after return document completion or when processing loyalty point reversals for returned items.

## How It Works

1. **Validates return document** - Fails with *The document you try to send not a return document* when the document is not a return (ifOut = true)
2. **Validates reward config** - Looks up the RewardPointsConfig by provided code or ID
3. **Extracts POS register** - Gets POS register code from the sales document
4. **Initializes API client** - Creates DatanuumApiClient with config and POS register information
5. **Builds return invoice payload** - Creates detailed JSON request body with:
   - Customer account information (phone number)
   - Original invoice reference (code and creation date)
   - Return document details (code and return time)
   - Returned item details (SKU, name, quantity, unit price, line amounts)
   - Refund payment details (methods and amounts)
6. **Formats numeric values** - Strips trailing zeros from all monetary and quantity fields
7. **Sends to Datanuum** - Transmits complete return transaction data to Datanuum API
8. **Returns results** - Accumulates API response results and any errors

## Parameters

**Parameter 1:** Reward Points Config Code Or ID (Required) - Configuration record for Datanuum integration

Example: `DATANUUM_CONFIG_01` or `12345`

## Database Tables Affected

- **RewardPointsConfig** - Reads integration configuration settings (read-only)
- **Sales Return Document Data** - Reads complete return transaction information (read-only)
- **Original Invoice Data** - Reads referenced original invoice details (read-only)
- **Customer Data** - Reads customer account details (read-only)
- **Payment Lines** - Reads refund payment method and amount details (read-only)
- **External Datanuum System** - Creates return transaction records and processes loyalty point reversals

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.datanuum.EASendReturnedInvoiceToDatanuum`

**Integration Type:** External API - Datanuum Loyalty Platform

**Document Type:** Sales Return Documents Only

**Related Actions:**
- [EASendInvoiceToDatanuum](EASendInvoiceToDatanuum.md) - Original invoice synchronization
- [EASendCustomerToDatanuum](EASendCustomerToDatanuum.md) - Customer synchronization
- Other Datanuum integration entity flows


</div>

