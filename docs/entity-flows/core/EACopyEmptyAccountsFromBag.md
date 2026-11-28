---
title: EACopyEmptyAccountsFromBag
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACopyEmptyAccountsFromBag

## Overview

Copies subsidiary account assignments from account bag to fill empty subsidiary account fields. Only updates empty fields, preserving existing assignments.

## When This Action Runs

Manual or automated execution on records that carry subsidiary accounts (customers, suppliers and the other subsidiary types) to populate empty subsidiary account fields.

## How It Works

1. **Checks the record** has subsidiary accounts; on any other record the flow does nothing
2. **Checks the accounts bag** chosen on the record; when no accounts bag is chosen the flow does nothing
3. **Retrieves the accounts** of that accounts bag
4. **Identifies empty fields** and fills only those from the accounts bag

## Key Parameters

**No Parameters Required** - The accounts bag is the one chosen on the record itself.


## Database Tables Affected

- **Target Entity** - Updates empty subsidiary account fields only
- **Account Bag** - Template source for account assignments
- **Account Master Data** - Referenced for validation and account resolution


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EACopyEmptyAccountsFromBag`

</div>

