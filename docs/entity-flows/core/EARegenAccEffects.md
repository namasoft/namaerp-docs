---
title: EARegenAccEffects
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARegenAccEffects

## Overview

Regenerates accounting effects for records that generate an accounting (ledger) request. Can process either the current entity directly or entities referenced through a specified field, triggering recalculation of journal entries and ledger transactions.

## When This Action Runs

Manual execution after configuration changes, account corrections, or when accounting effects need to be recalculated due to data inconsistencies or system updates.

## How It Works

1. **Determines scope** - If no field specified, processes current entity; if field specified, processes referenced entities
2. **Filters entities** - A record found through the field that does not generate accounting effects is skipped
3. **Generates effects** - Rebuilds and sends the accounting request of each target entity
4. **Handles collections** - For reference fields pointing to collections, processes each unique entity once
5. **Accumulates results** - Collects and reports results from all accounting effect generation operations

## Parameters

**Parameter 1:** Reference Field To Regenerate ACC Effects For (Optional) - Field ID pointing to entities to process (if empty, processes current entity)

## Database Tables Affected

- **Ledger Transaction Tables** - Regenerates journal entries and accounting transactions
- **Referenced Entity Tables** - Processes entities found through the specified reference field
- **Accounting Effect Tables** - Updates accounting calculations and balances

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARegenAccEffects`


</div>