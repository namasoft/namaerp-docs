---
title: EAPostGoPayOfflinePayment
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAPostGoPayOfflinePayment

## Overview

Processes offline payments for GoPay digital wallet transactions, either recording the payment directly or crediting customer balance based on configuration for receipt vouchers linked to GoPay-enabled invoices.

## When This Action Runs

Offline GoPay payment processing for Receipt Voucher entities linked to GoPay-enabled invoices.

## How It Works

1. **Validates receipt voucher** and linked invoice with GoPay support
2. **Retrieves GoPay configuration** using provided config code
3. **Determines processing mode** based on recurring invoicing flag in configuration
4. **Processes payment** either as direct payment or customer balance credit
5. **Integrates with GoPay APIs** for transaction synchronization


## Parameters

**Parameter 1:** GoPay Config Code (Required) - Reference to GoPayConfiguration entity with payment settings and recurring invoicing flag

## Database Tables Affected

- **Receipt Voucher** - Updates payment status and GoPay integration data
- **Invoice** - Applies payment and updates GoPay status
- **GoPay Balance** - Credits customer balance for recurring invoicing mode
- **External GoPay System** - Synchronizes transaction data via APIs


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPostGoPayOfflinePayment`


</div>

