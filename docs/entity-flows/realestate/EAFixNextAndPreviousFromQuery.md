---
title: EAFixNextAndPreviousFromQuery
module: realestate
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAFixNextAndPreviousFromQuery

## Overview

Repairs and updates the chain linkages between consecutive rent contracts by fixing previous/next contract references. Processes committed rent contracts to ensure proper contract sequencing and renter history tracking through automated reference updates.

## When This Action Runs

Manual execution for data repair and maintenance. Typically used after contract imports, data migrations, or when contract chain linkages become corrupted due to system issues or manual data modifications.

## How It Works

1. **Executes query** - Runs the default query below to list the contracts to fix
2. **Processes each contract** - Iterates through found contracts in separate transactions
3. **Fills previous contract** - Updates references to the immediately preceding contract
4. **Updates previous renter** - Links to previous contract for the same renter
5. **Updates next contract** - Sets references to the immediately following contract
6. **Updates next renter** - Links to next contract for the same renter
7. **Commits changes** - All updates happen automatically without explicit saving

## Parameters

The contracts to fix are the ones the default query returns: every committed rent contract and opening rent contract.

## Default Query

```sql
select entityType,id from RERentContract where commitedBefore = 1 
union all
select entityType,id from REOpeningRentContract where commitedBefore = 1
```

## Database Tables Affected

- **RERentContract** - Updates previous/next contract references
- **REOpeningRentContract** - Updates previous/next contract references for opening contracts
- **Contract Chain Tables** - Updates linkage information between related contracts

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realstate.domain.utils.plugnplay.EAFixNextAndPreviousFromQuery`


</div>

