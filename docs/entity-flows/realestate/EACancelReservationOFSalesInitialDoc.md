---
title: EACancelReservationOFSalesInitialDoc
module: realestate
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACancelReservationOFSalesInitialDoc

## Overview

Cancels estate reservations for initial sales contracts by setting the reserveEstate flag to false. Uses a custom SQL query to identify which contracts should have their reservations cancelled, enabling bulk processing of expired or unwanted reservations.

## When This Action Runs

Manual execution when estate reservations need to be cancelled in bulk. Typically used for expired reservations, cancelled contracts, or administrative cleanup when initial sales contracts no longer require estate reservation status.

## How It Works

1. **Executes custom query** - Runs the provided SQL query to find contract IDs
2. **Processes each contract** - Iterates through found contract IDs
3. **Loads contract** - Retrieves each REInitialSalesContract by ID
4. **Starts editing** - Puts the contract in edit mode
5. **Cancels reservation** - Sets reserveEstate flag to false
6. **Commits changes** - Saves the updated contract
7. **Stops at the first failure** - When a contract cannot be saved, the run stops and returns that failure; the remaining contracts are not processed

## Parameters

**Parameter 1:** Query (Required) - Query whose first column is the id of each initial sales contract that should have its reservation cancelled

## Example Query

```sql
select id from REInitialSalesContract where toDate < GETDATE() and reserveEstate = 1
```

## Database Tables Affected

- **REInitialSalesContract** - Updates the reserveEstate field to false for selected contracts

**Module:** realestate

**Full Class Name:** `com.namasoft.modules.realestate.domain.entities.EACancelReservationOFSalesInitialDoc`


</div>

