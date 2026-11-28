---
title: EAAutoExtendExpiredRentContracts
module: realestate
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAAutoExtendExpiredRentContracts

## Overview

Automatically creates new rent contracts by extending expired contracts. Finds committed, non-cancelled rent contracts that have expired (based on configurable days past expiration) and generates new contracts with updated date ranges, maintaining most original terms and conditions.

## When This Action Runs

Manual execution or scheduled batch processing for contract renewals. Typically used for periodic contract extension processing, handling multiple expired contracts simultaneously to ensure continuity of rental agreements.

## How It Works

1. **Identifies expired contracts** - Uses SQL query to find committed, non-cancelled contracts past their expiration date
2. **Processes each contract** - Iterates through found contracts in separate transactions
3. **Duplicates contract data** - Creates a copy of the original contract maintaining most settings
4. **Updates date ranges** - The new from date is the day after the original contract's to date, the new to date is the new from date plus the contract's period, and the value date is the new from date
5. **Adjusts payment schedules** - Updates due dates for payment lines based on the new contract period
6. **Filters expenses** - Removes expenses marked as "do not copy with extension"
7. **Resets payment status** - Marks all payments as unpaid with zero paid amounts
8. **Commits new contract** - Saves the extended contract with auto-cancel flag for previous contract

## Parameters

**Parameter 1:** Generated Contract Book Code or ID (Required) - Book for the new extended contracts

**Parameter 2:** Generated Contract Term Code or ID (Required) - Document term for the new extended contracts

**Parameter 3:** Extend Contracts That have at least n days remainig (default is 0 days) (Optional) - A whole number N: only contracts whose to date is N days ago or earlier are extended (default: 0, so a contract is extended from its to date onwards)

**Parameter 4:** Manual Query (Optional) - Custom SQL to specify which contracts to extend, returning the entity type and the id (or code) of each contract. It replaces the default query below

Fill parameter 3 or parameter 4, not both: with both filled the entity flow is rejected on saving with *You must specify only one of the two parameters {0} and {1}. Provided values are {2},{3}*.

## Default Query Logic

```sql
select entityType,id from RERentContract where commitedBefore = 1 and cancelled = 0 and DATEDIFF(day,toDate,GETDATE())>=0
union all
select entityType,id from REOpeningRentContract where commitedBefore = 1 and cancelled = 0 and DATEDIFF(day,toDate,GETDATE())>=0
```

## Database Tables Affected

- **RERentContract** - Creates new extended rent contracts
- **REOpeningRentContract** - Source for opening contracts to extend
- **REPaymentLine** - Updates payment schedules with new due dates
- **RERentContractExpensesLine** - Copies applicable expenses to new contracts
- **Contract Books/Terms** - References for new contract assignment

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realstate.domain.utils.plugnplay.EAAutoExtendExpiredRentContracts`


</div>