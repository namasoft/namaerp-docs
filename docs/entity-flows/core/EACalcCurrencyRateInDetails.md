---
title: EACalcCurrencyRateInDetails
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EACalcCurrencyRateInDetails

## Overview

Calculates and sets exchange rates for foreign currencies in document detail lines (collections). Processes each line individually to calculate appropriate exchange rates.

## When This Action Runs

Manual execution or automated through entity flows on DocumentFile entities with detail collections containing foreign currencies.

## How It Works

1. **Validates parameters** ensure all reference same detail collection
2. **Iterates through collection** processing each detail line
3. **Calculates rates** for each line's currency, in the ledger of the document's legal entity on the document's value date
4. **Sets individual rates** on each detail line separately
5. **Skips empty lines:** a line whose currency field is empty keeps its rate

## Key Difference

Unlike EACalcCurrencyRate which handles single document header currencies, this action processes multiple detail lines with individual currencies in collections.

## Key Parameters

- **Parameter 1:** Currency Field (Required) - Full path including collection (e.g., `details.currency`)
- **Parameter 2:** Rate Field (Required) - Full path including collection (e.g., `details.rate`)
- **Parameter 3:** Detail Name (Required) - Collection name (e.g., `details`, `lines`)

Parameters 1 and 2 must start with the detail name of Parameter 3; otherwise saving the entity flow is refused with *Parameter {0} must start with the detail name {1}*.

### Parameter Examples:
```
Currency Field: details.currency
Rate Field: details.rate
Detail Name: details
```

## Database Tables Affected

- **Document Header** - Provides context for rate calculation
- **Detail Collection Items** - Currency fields read, rate fields updated
- **Currency/ExchangeRate** - Master data for rate calculation

## Related Actions

- [EACalcCurrencyRate](EACalcCurrencyRate.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACalcCurrencyRateInDetails`

</div>

