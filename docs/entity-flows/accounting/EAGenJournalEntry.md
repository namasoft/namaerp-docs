---
title: EAGenJournalEntry
module: accounting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAGenJournalEntry

## Overview

Automatically creates journal entries (accounting vouchers) from any document in the system, so that their accounting effects are recorded in the ledger automatically.

## When This Action Runs

- **Trigger:** Manual execution or automated through entity flows
- **Target:** Any document entity requiring accounting effects
- **Purpose:** Generate journal entries for business documents
- **Timing:** After document creation/modification

## How It Works

1. **Finds or creates** journal entry using finder query
2. **Updates fields** from source document to journal entry
3. **Generates accounting lines** based on effects configuration
4. **Applies currency conversion** if specified
5. **Saves and commits** journal entry to ledger

## Parameters

### Parameter 1: Finder Query (Required)
SQL query to locate existing journal entry or create new one:
```sql
-- Find by document reference
SELECT id FROM JournalEntry WHERE ref1Id = {id}

-- Always create new
SELECT id FROM JournalEntry WHERE 1 = 0
```

### Parameter 2: Fields Updater (Required)
Field assignments from source to journal entry:
```
book="JEB"
ref1=id
date1=issueDate
description1=description
```

### Parameter 3: Effects Configuration (Required)
Defines debit/credit accounting lines:
```
-- Header field
totalAmount=RECEIVABLE_DR,SALES_CR

-- Detail lines
lines.amount=EXPENSE_DR,PAYABLE_CR
```

### Parameter 4: Shorten Ledger (Optional)
- `true` - Consolidate lines with same account
- `false` - Keep separate lines

### Parameter 5: Inverse Copy Fields (Optional)
Copy values back to source document:
```
ledgerTransReqId=ledgerTransReqId
```

### Parameter 6: Apply When Query (Optional)
SQL query to conditionally include lines:
```sql
SELECT CASE WHEN {lines.amount} > 0 THEN 1 ELSE 0 END
```

### Parameter 7: Currency Field (Optional)
Field containing currency reference for multi-currency support.

### Parameter 8: Rate Field (Optional)
Field containing exchange rate for currency conversion.

## Example Configurations

### Sales Invoice
```
Finder: SELECT id FROM JournalEntry WHERE ref1Id = {id}
Fields: book="SAL"\nref1=id\ndate1=issueDate
Effects: totalAmount=RECEIVABLE_DR,SALES_CR
Shorten: true
```

### Purchase Invoice with Details
```
Finder: SELECT id FROM JournalEntry WHERE ref1Id = {id}
Fields: book="PUR"\nref1=id\ndate1=issueDate
Effects: lines.amount=EXPENSE_DR,PAYABLE_CR
Apply When: SELECT CASE WHEN {lines.amount} > 0 THEN 1 ELSE 0 END
```

## Related Actions

- **EAClearLedgerLines** - Clears ledger lines before generation
- **EAShortenLedger** - Consolidates duplicate account lines
- **EASortLedger** - Sorts ledger transaction lines
- **EAReverseLedgerTrans** - Reverses existing ledger transactions

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenJournalEntry`

</div>

