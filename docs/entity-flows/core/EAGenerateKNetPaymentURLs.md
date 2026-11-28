---
title: EAGenerateKNetPaymentURLs
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateKNetPaymentURLs

## Overview

Generates KNet payment URLs for documents supporting online payment processing, creating both direct and redirect URLs for Kuwait's KNet payment gateway integration.

::: tip Related Documentation
For a comprehensive guide on setting up payment gateways, configuring templates, and understanding the full payment workflow, see the [Online Payments Integration Guide](../../modules/invoicing/online-payments.md).
:::

## When This Action Runs

Online payment URL generation for documents that support online payment (invoices, orders, bills).

## How It Works

1. **Validates entity compatibility:** on a record that does not support online payment the flow fails with *Entity flow {0} only could be run with document instance of ISupportOnlinePaymentDoc*
2. **Retrieves payment configuration** using provided config code
3. **Generates payment URLs** for both direct KNet gateway and redirect processing
4. **Creates payment entries** for tracking and audit purposes
5. **Assigns URLs to entity fields** as specified in parameters

## Parameters

**Parameter 1:** Payment Config Code (Required) - Code of OnlinePaymentConfig entity (e.g., KNET_PROD, KNET_TEST)

**Parameter 2:** Copy URL To Field (Required) - Field name for redirect payment URL storage

**Parameter 3:** Copy Nama Payment URL To Field (Required) - Field name for direct payment URL storage

## Database Tables Affected

- **Entity Payment URL Fields** - Updates specified fields with generated payment URLs
- **OnlinePaymentConfig Table** - Reads payment gateway configuration settings
- **Payment Tracking Tables** - Creates payment entries for audit and monitoring

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateKNetPaymentURLs`


</div>