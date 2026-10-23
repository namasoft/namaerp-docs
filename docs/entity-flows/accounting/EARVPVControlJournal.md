---
title: EARVPVControlJournal
module: accounting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EARVPVControlJournal

## Overview

Automatically generates control journal entries for Receipt and Payment Vouchers (RVPV) when they have a related subsidiary account. Creates accounting entries to track subsidiary account movements with proper debit and credit lines.

## When This Action Runs

- **Trigger:** Automatic during RVPV processing for accounting effects
- **Target:** Receipt and Payment Voucher entities with related subsidiary
- **Purpose:** Create control journal entries for subsidiary tracking
- **Timing:** When voucher is sent to generate ledger transaction request

## How It Works

### Processing Logic
1. **Safety Check:** Validates related subsidiary and ledger transaction request exist
2. **Account Configuration:** Sets up debit and credit side configurations using Customer dimension
3. **Data Collection:** Gathers voucher amount, remarks, and subsidiary details
4. **Journal Creation:** Generates debit and credit lines for control tracking

### Key Fields Used
- **relatedSubsidiary:** The subsidiary account for the voucher
- **amount:** Monetary amount for journal entries
- **remarks:** Used as narration in journal entries
- **code/id:** Document reference and tracking

## Parameters

### Parameter 1: Debit Side Account Type (Required)
- **Type:** Text
- **Purpose:** Which account of the voucher's related subsidiary receives the debit line
- **Examples:** `MainAccount`, `Account1` … `Account20`

### Parameter 2: Credit Side Account Type (Required)
- **Type:** Text
- **Purpose:** Which account of the voucher's related subsidiary receives the credit line
- **Examples:** `MainAccount`, `Account1` … `Account20`

The parameters have no titles on the entity flow line; enter the values in Parameter 1 and Parameter 2.

## Database Tables Affected

### Accounting Ledger System
- **General Ledger:** Creates entries appearing in general ledger reports
- **Subsidiary Balances:** Updates subsidiary account balance tracking
- **Control Journals:** Generates control journal report entries

## Business Use Cases

1. **Subsidiary Tracking:** Track movements in subsidiary accounts for customers/vendors
2. **Control Accounting:** Maintain control totals for subsidiary ledgers
3. **Audit Trail:** Provide detailed audit trail linking vouchers to subsidiary movements

## Related Actions

- **EAGenJournalEntry** - Generates journal entries from any document
- **EAClearLedgerLines** - Clears ledger lines before generation
- **EAShortenLedger** - Consolidates duplicate account lines

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.utils.entityactions.EARVPVControlJournal`

</div>

