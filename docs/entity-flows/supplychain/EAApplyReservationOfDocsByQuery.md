---
title: EAApplyReservationOfDocsByQuery
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAApplyReservationOfDocsByQuery

## Overview

Applies inventory reservations to supply chain documents identified by a custom SQL query. Sets the cancelReservation flag to false on documents, enabling inventory reservation and preventing other processes from using the reserved inventory quantities.

## When This Action Runs

Manual execution when inventory reservations need to be applied to specific documents. Typically used to reserve inventory for sales orders or transfer requests based on criteria like due dates, customer priorities, or document status.

## How It Works

1. **Executes query** - Runs the provided SQL query to identify documents for reservation
2. **Validates results** - Checks that query returns valid entity types and IDs
3. **Processes each document** - Iterates through found documents
4. **Validates document state** - Ensures document is committed and not already reserved
5. **Applies reservation** - Sets cancelReservation flag to false
6. **Commits changes** - Saves the updated document with reservation applied

## Parameters

**Parameter 1:** Query (Required) - Query to select documents for inventory reservation

## Example Query

```sql
select entityType,id from ReservationDocument where dueDate = GETDATE()
```

## Query Requirements

- Must return two columns: entityType and id
- entityType must be a supply chain document type; other document types (for example a production order) are not supported
- id should be valid document IDs

## Database Tables Affected

- **Supply Chain Documents** - Updates cancelReservation flag to false on selected documents


**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.EAApplyReservationOfDocsByQuery`

**Related Actions:**
- [EACancelReservationOfDocsByQuery](EACancelReservationOfDocsByQuery.md)


</div>

