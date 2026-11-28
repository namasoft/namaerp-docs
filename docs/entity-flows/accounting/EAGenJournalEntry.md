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

1. **Finds or creates** the journal entry using the finder query
2. **Updates fields** of the journal entry from the source document (Parameter 2)
3. **Replaces the journal entry lines** with the lines built from the effects (Parameter 3), in the currency and rate of Parameters 7 and 8. Lines the found journal entry already had are overwritten.
4. **Merges similar lines** when Parameter 4 is `true`
5. **Saves and commits** the journal entry
6. **Copies fields back** from the journal entry to the source document (Parameter 5)

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
```fieldmap
book="JEB"
term="JET"
ref1=$this
```

### Parameter 3: Effects Configuration (Required)
One effect per line: the field holding the amount, `=`, then the codes of two accounting side records, the debit side first. A header field gives one debit and one credit line; a line field gives a pair per document line. Empty and zero amounts are skipped.
```
n1=N1EffectDR,N1EffectCR
lines.n2=DetailsN2EffectDR,DetailsN2EffectCR
```
A side code that matches no accounting side stops the run with *Could not find AccountingSideConfig with code {0}*.

### Parameter 4: Shorten Ledger (Optional)
- `true` - Merge similar lines. Lines are similar when they agree on the account, the subsidiary, the dimensions, the currency, the rate, both narrations and the three reference fields; see [EAAddAccountingEffect](/entity-flows/accounting/EAAddAccountingEffect).
- `false` or empty - Keep separate lines

### Parameter 5: Inverse Copy Fields (Optional)
Copy values back to the source document after the journal entry is committed. Here the source of each line is the journal entry, so `$this` is the journal entry itself:
```fieldmap
ref1=$this
```

### Parameter 6: Apply When Query (Optional)
SQL query run once per document line; a line whose result is 0 or empty gets no effect. It applies only to effects whose amount field is a line field. An effect on a header field is applied whatever the query returns.
```sql
select case when {lines.ref1.entityType} in ('Branch','Department') then 1 else 0 end
```

### Parameter 7: Currency Field (Optional)
Field holding the currency of the generated lines, on the header or on the lines. Empty: the main currency of the legal entity's ledger.

### Parameter 8: Rate Field (Optional)
Field holding the rate of the generated lines, on the header or on the lines. Empty: a rate of 1.

## Example Configurations

### Effect From a Header Field
```
Finder: select id from JournalEntry where ref1Id = {id}
Fields: book="JEB"\nterm="JET"\nref1=$this
Effects: n1=N1EffectDR,N1EffectCR
Shorten: true
```

### Effect From a Line Field
```
Finder: select id from JournalEntry where ref1Id = {id}
Fields: book="JEB"\nterm="JET"\nref1=$this
Effects: lines.n2=DetailsN2EffectDR,DetailsN2EffectCR
Apply When: select case when {lines.ref1.entityType} in ('Branch','Department') then 1 else 0 end
```

## Related Actions

- **EAClearLedgerLines** - Clears ledger lines before generation
- **EAShortenLedger** - Consolidates duplicate account lines
- **EASortLedger** - Sorts ledger transaction lines
- **EAReverseLedgerTrans** - Reverses existing ledger transactions

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenJournalEntry`

</div>

