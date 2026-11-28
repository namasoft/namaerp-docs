---
title: EAClearLedgerLines
module: accounting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAClearLedgerLines

## Overview

Automatically removes all ledger transaction lines and debt entries from accounting requests during the pre-processing phase. This system utility ensures clean accounting request generation by clearing any existing transaction data.

## When This Action Runs

- **Trigger:** Pre Send Request (automatic)
- **Target:** Any record that sends an accounting (ledger) request; other requests of the record are left untouched
- **Purpose:** Clear existing transaction lines before new generation
- **Timing:** Before accounting request processing

## How It Works

### Automatic Clearing Process
- **Transaction Lines:** Removes all entries from the `lines` collection
- **Debt Entries:** Removes all entries from the `debts` collection  
- **Ledger requests only:** A request of any other kind (an inventory request, for example) is not touched
- **Memory Operation:** Works on the request being sent, before it is saved, so the lines the document built for this save never reach the ledger
- **No parameters:** The flow line needs no parameter

## Business Use Cases

1. **Request Regeneration:** Clear previous attempts before generating new accounting entries
2. **Error Recovery:** Remove corrupted transaction data during error recovery
3. **Data Reset:** Start fresh when recalculating accounting effects

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAClearLedgerLines`

**ℹ️ Note:** This action is automatic and selects its own execution events

## Related Actions

- **EAReverseLedgerTrans**: Reverses existing ledger transactions
- **EASortLedger**: Sorts ledger transaction lines
- **EAShortenLedger**: Consolidates ledger transaction lines

</div>

