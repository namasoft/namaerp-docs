---
title: EAShortenLedgerChangeToAccountCurrency
module: accounting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAShortenLedgerChangeToAccountCurrency

## Overview

Ensures ledger transaction lines use the same currency as their associated accounts. Automatically converts currencies when account currency matches the legal entity's main currency.

## When This Action Runs

- **Trigger:** Automatic during PreSendRequest event
- **Target:** Ledger transactions with currency mismatches
- **Purpose:** Align transaction line currencies with account currencies
- **Timing:** Before ledger transaction processing

## How It Works

### Currency Validation Process
1. **Identifies mismatches** between account currency and transaction line currency
2. **Validates account currency** matches legal entity's main currency
3. **Converts currency** when conditions are met
4. **Optimizes transaction** by consolidating duplicate lines

### Conversion Rules
- **Account currency ≠ Transaction currency** AND
- **Account currency = Legal entity main currency**
- **Transaction has debit or credit amount**

### Field Updates
When currency conversion occurs:
- `money.rate = 1.0` (exchange rate)
- `money.currency = account.currency` (currency alignment)  
- `money.amount = money.localAmount` (amount update)

## Business Use Cases

1. **Multi-Currency Operations:** Standardize currencies across accounting lines
2. **Main Currency Alignment:** Ensure consistency with legal entity's base currency
3. **Transaction Optimization:** Consolidate lines after currency alignment

## SQL Troubleshooting

### Find Currency Mismatches
```sql
SELECT lt.id, a.currency_id AS AccountCurrency, 
       CASE WHEN ltl.debitValueAmount <> 0 
            THEN ltl.debitValueCurrency_id
            ELSE ltl.creditValueCurrency_id END AS LineCurrency
FROM LedgerTrans lt
INNER JOIN LedgerTransLine ltl ON lt.id = ltl.ledgerTrans_id  
INNER JOIN Account a ON ltl.account_id = a.id
WHERE a.currency_id != CASE WHEN ltl.debitValueAmount <> 0 
                           THEN ltl.debitValueCurrency_id
                           ELSE ltl.creditValueCurrency_id END;
```

## Related Actions

- **EAShortenLedger** - Consolidates lines after currency alignment
- **EAGenJournalEntry** - Generates lines that may need currency alignment
- **EAClearLedgerLines** - Clears lines before processing

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAShortenLedgerChangeToAccountCurrency`

</div>

