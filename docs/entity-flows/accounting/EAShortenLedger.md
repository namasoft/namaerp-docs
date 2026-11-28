---
title: EAShortenLedger
module: accounting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAShortenLedger

## Overview

Consolidates duplicate ledger transaction lines by combining multiple lines with identical characteristics into single lines with net debit/credit amounts.

## When This Action Runs

- **Trigger:** Automatic during PreSendRequest phase
- **Target:** Ledger transactions with duplicate lines
- **Purpose:** Optimize ledger by consolidating identical lines
- **Timing:** Before ledger transaction is processed

## How It Works

### Grouping Criteria
Lines are consolidated if they have identical:
- **Account, Analysis Set, Branch, Department, Sector**
- **Entity Dimension, Subsidiary, Reference Fields**
- **Narration, Currency, Exchange Rate**

### Consolidation Process
1. **Groups lines** by identical characteristics
2. **Calculates net amounts** (total debits - total credits)
3. **Keeps first line** from each group with net amount
4. **Removes duplicate lines** and sorts remaining lines

### Example
**Before:** Account 1001-Cash has 3 lines: Debit $100, Debit $50, Credit $30  
**After:** Account 1001-Cash has 1 line: Debit $120 (net amount)

## Configuration

The flow line takes no parameters and merges the lines of every ledger request sent by the records the entity flow applies to.

The same merge runs without any entity flow when **Shorten Ledger** is ticked on:
- **Document Term** - Applies to all documents using this term
- **Document Book** - Applies to all documents in this book

## Exclusions

Does not apply to:
- **Currency Difference Journals** (`CurrencyDiffJournal`)
- **Exchange Rate Updates** (`ExchangeRateUpdate`)

## Related Actions

- **EASortLedger** - Sorts consolidated lines
- **EAClearLedgerLines** - Clears lines before shortening
- **EAGenJournalEntry** - Generates lines that may be shortened

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAShortenLedger`

</div>

