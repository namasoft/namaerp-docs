---
title: EACalcCurrencyRate
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EACalcCurrencyRate

## Overview

Automatically calculates and sets exchange rates for foreign currency transactions on document entities. Retrieves appropriate exchange rate based on document's currency and date.

## When This Action Runs

Manual execution or automated through entity flows on DocumentFile entities with foreign currency transactions. Typically runs before document save or when currency changes.

## How It Works

1. **Retrieves currency** from specified currency field
2. **Calculates exchange rate** of that currency in the ledger of the document's legal entity on the document's value date. The ledger's main currency gets a rate of 1
3. **Sets calculated rate** to specified rate field
4. **Empty currency:** when the currency field is empty the rate field is left as it is

## Key Parameters

- **Parameter 1:** Currency Field (Required) - Field path to currency field (e.g., `money.currency`)
- **Parameter 2:** Rate Field (Required) - Field path to rate field for calculated value (e.g., `money.currencyRate`)

Both are header fields. For a currency on the document lines use [EACalcCurrencyRateInDetails](/entity-flows/core/EACalcCurrencyRateInDetails).

## Database Tables Affected

- **Target Document** - Currency field read, rate field updated
- **Currency** - Master currency data for validation
- **ExchangeRate** - Source for current/historical rates

## Related Actions

- [EACalcCurrencyRateInDetails](EACalcCurrencyRateInDetails.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACalcCurrencyRate`

</div>


