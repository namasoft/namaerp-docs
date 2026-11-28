---
title: EAReverseLedgerTrans
module: accounting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAReverseLedgerTrans

## Overview

Reverses previously created accounting transactions by creating opposite entries. Used for document cancellations or partial reversals.

## When This Action Runs

- **Trigger:** Automatic during PreSendRequest event
- **Target:** Documents requiring ledger transaction reversals
- **Purpose:** Cancel or partially reverse existing accounting entries
- **Timing:** Before final ledger transaction processing

## How It Works

1. **Finds original ledger transaction** using entity ID from Parameter 1
2. **Swaps debit/credit amounts** (debits become credits, credits become debits)
3. **Applies percentage adjustments** if specified for partial reversals
4. **Adds reversed lines** to current document's ledger transaction
5. **Optionally consolidates** ledger lines to reduce duplicates

## Parameters

### Parameter 1: Source Entity Field (Required)
- **Title:** The field that provides the entity to cancel its Ledger trans
- **Purpose:** The record whose ledger request is reversed into the current document's request
- **Format:** A reference field of the current document, or an `sql(...)` expression that returns the record id. An `sql(...)` expression that uses line fields is run once per line and reverses one record per line. When the value is empty, or the record has no ledger request, nothing is added.
- **Examples:** `fromDoc`, `ref1`, `sql(select {details.ref1.id})`

### Parameter 2: Shorten Reversed Lines
- **Title:** Shorten Ledger of Reversed Lines
- **Values:** `true` or `false` (defaults to `false`)
- **Purpose:** Merge the similar lines of the reversed request before they are added

### Parameter 3: Shorten Final Lines  
- **Title:** Shorten Ledger of Final Lines
- **Values:** `true` or `false` (defaults to `false`)
- **Purpose:** Merge the similar lines of the current document's request after the reversed lines are added

### Parameter 4: Percentages Field (Optional)
- **Title:** Percentages Field eg: sql(select case when {details.item.item.code} = '123' then {details.n1} else 100 end) Another example: details.n4
- **Purpose:** The percentage of each original line's amount that is reversed, where 100 reverses the full amount. Empty reverses the full amount. When Parameter 1 returns one record per line, an `sql(...)` here gives each line its own percentage.
- **Examples:** `details.n4`, `sql(select case when {details.item.item.code} = '123' then {details.n1} else 100 end)`

## Common Use Cases

1. **Document Cancellation:** Full reversal of original document's accounting effects
2. **Partial Returns:** Reverse portion of transaction based on returned quantities
3. **Multiple Document Reversal:** Reverse accounting effects from multiple documents

## Related Actions

- **EAGenJournalEntry** - Generates original journal entries that can be reversed
- **EAClearLedgerLines** - Clears ledger lines before generation
- **EAShortenLedger** - Consolidates duplicate account lines

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAReverseLedgerTrans`

</div>

