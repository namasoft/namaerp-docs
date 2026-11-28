---
title: EAGenSCDocFromDocWithFieldsMapWithoutFlush
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenSCDocFromDocWithFieldsMapWithoutFlush

## Overview

Generates supply chain documents from other documents using configurable field mapping and line filtering, but without automatic database flushing during the process. This is identical to [EAGenSCDocFromDocWithFieldsMap](/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap) except that it does not write the changes to the database after each generated document; they are written with the rest of the transaction that runs the flow.

## When This Action Runs

Manual execution to generate related documents from source documents when database performance is critical, typically for bulk document generation operations where multiple documents are created in sequence.

## How It Works

It runs steps 1 to 8 of [EAGenSCDocFromDocWithFieldsMap](/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap) and skips step 9: no flush is done after each generated document.

## Parameters

It takes the same 12 parameters, in the same order and with the same meaning, as EAGenSCDocFromDocWithFieldsMap: see [its Parameters section](/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap#Parameters).

## Database Tables Affected

- **Target Document Tables** - Creates or updates generated documents
- **Source Document Tables** - Reads data for mapping (read-only)
- **Document Line Tables** - Copies and transforms line items

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGenSCDocFromDocWithFieldsMapWithoutFlush`

**Parent Class:** `EAGenSCDocFromDocWithFieldsMap`

**Related Actions:**
- [EAGenSCDocFromDocWithFieldsMap](EAGenSCDocFromDocWithFieldsMap.md) - Version that flushes after each generated document
- [EAAutoGenSCDocFromDocWithFieldsMap](EAAutoGenSCDocFromDocWithFieldsMap.md) - Automatic version that runs on events


</div>