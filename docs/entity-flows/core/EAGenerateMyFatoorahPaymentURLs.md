---
title: EAGenerateMyFatoorahPaymentURLs
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateMyFatoorahPaymentURLs

## Overview

Generates MyFatoorah payment URLs for documents supporting online payment processing, creating payment links through MyFatoorah's gateway for Middle East region payment methods.

## When This Action Runs

MyFatoorah payment URL generation for documents that support online payment (invoices, orders, bills).

## How It Works

1. **Validates entity compatibility:** on a record that does not support online payment the flow fails with *Entity flow {0} only could be run with document instance of ISupportOnlinePaymentDoc*
2. **Validates MyFatoorah configuration** exists and type is MyFatoorah
3. **Evaluates country code parameter** — if the value contains `'`, `"`, or `+`, it is treated as a constant value; otherwise it is resolved as a field reference
4. **Extracts customer information** from specified entity fields (name required, contact details optional)
5. **Creates payment invoice** through MyFatoorah API
6. **Assigns generated URL** to the target field:
   - If the entity is in **draft** state, the field is set directly
   - If the entity is **not draft**, the field is written on the saved record without a new save, and the record's last change version is incremented

## Parameters

**Parameter 1:** Payment Config Code (Required) - Code of MyFatoorah payment configuration (e.g., MYFATOORAH_PROD)

**Parameter 2:** Copy URL To Field (Required) - Text field name for payment URL storage

**Parameter 3:** Customer Name Field (Required) - Field reference containing customer name (e.g., customer.name1)

**Parameter 4:** Mobile Country Code Field (Optional) - Text field reference (e.g., description2) or a constant value (e.g., '+966' or +966 or "+965")

**Parameter 5:** Mobile Number Field (Optional) - Text field reference for mobile number (e.g., '10********')

**Parameter 6:** Customer Email Field (Optional) - Field reference for email address (e.g., customer.email)

**Parameter 7:** Customer Reference Field (Optional) - Text field reference for customer code (e.g., customer.code)

## Database Tables Affected

- **Entity Payment URL Field** - Updates the specified text field with the generated MyFatoorah payment URL
- **OnlinePaymentConfig Table** - Reads MyFatoorah-specific configuration by business code

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateMyFatoorahPaymentURLs`


</div>