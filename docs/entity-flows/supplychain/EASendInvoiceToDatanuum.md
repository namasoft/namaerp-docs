---
title: EASendInvoiceToDatanuum
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASendInvoiceToDatanuum

## Overview

Synchronizes sales invoice/receipt information with the Datanuum external service for reward points and loyalty program integration. Builds a comprehensive JSON payload containing transaction details (customer, items, payments, discounts) and sends it to Datanuum's API to process loyalty points, rewards, and customer purchase history.

## When This Action Runs

Manual execution when sales transactions need to be synchronized with the Datanuum loyalty system, typically after invoice completion, POS sales finalization, or when processing loyalty points for completed transactions.

## How It Works

1. **Validates reward config** - Looks up the RewardPointsConfig by provided code or ID
2. **Extracts POS register** - Gets POS register code from the sales document
3. **Initializes API client** - Creates DatanuumApiClient with config and POS register information
4. **Builds comprehensive invoice payload** - Creates detailed JSON request body with:
   - Customer account information (phone, email, name)
   - Receipt details (code, open/close times)
   - Transaction totals (billed, paid, redeemed amounts)
   - Discount information (header and line discounts)
   - Item details (SKU, name, quantity, unit price, discounts)
   - Payment details (methods, amounts, loyalty redemptions)
   - Custom fields (document category)
5. **Processes payment types** - Handles different payment methods:
   - Regular payment methods (cash, card)
   - Loyalty point redemptions
   - Voucher redemptions with reference tracking
6. **Calculates redeemed values** - Sums the payments made with a discount coupon that has a voucher type other than loyalty voucher, and adds the header discount when the document itself carries a discount coupon. The paid amount sent is the document's net value minus this redeemed value
7. **Sends to Datanuum** - Transmits complete transaction data to Datanuum API
8. **Returns results** - Accumulates API response results and any errors

## Parameters

**Parameter 1:** Reward Points Config Code Or ID (Required) - Configuration record for Datanuum integration

Example: `DATANUUM_CONFIG_01` or `12345`

## Database Tables Affected

- **RewardPointsConfig** - Reads integration configuration settings (read-only)
- **Sales Document Data** - Reads complete transaction information (read-only)
- **Customer Data** - Reads customer account details (read-only)
- **Payment Lines** - Reads payment method and amount details (read-only)
- **Item Details** - Reads product information and pricing (read-only)
- **External Datanuum System** - Creates transaction records and processes loyalty points

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.datanuum.EASendInvoiceToDatanuum`

**Integration Type:** External API - Datanuum Loyalty Platform

**Related Actions:**
- [EASendCustomerToDatanuum](EASendCustomerToDatanuum.md) - Customer synchronization
- [EASendInvItemToDatanuum](EASendInvItemToDatanuum.md) - Item synchronization
- Other Datanuum integration entity flows


</div>

