---
title: EAForceApplyInstallmentEffects
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAForceApplyInstallmentEffects

## Overview

Recalculates and updates installment payment tracking for documents with installment-based payments, synchronizing paid amounts and remaining balances.

## When This Action Runs

Manual or automated execution for installment recalculation when payment records become out of sync with document totals.

## How It Works

1. **Validates entity** is a document with installment lines; on any other record the flow fails with *Object {0} does not have installments effects*
2. **Retrieves installment lines** and payment records
3. **Calculates payment totals** from installment records
4. **Updates system fields** with calculated paid and remaining amounts
5. **Reports processing results** with error handling
## Parameters

**No Parameters Required** - Automatically processes installment lines and calculates payment totals

## Database Tables Affected

- **Document Entity Tables** - Updates paid amount and remaining balance fields
- **Installment Payment Tables** - Read-only access to payment records for calculation

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAForceApplyInstallmentEffects`


</div>