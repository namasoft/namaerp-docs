---
title: EAGenInvestmentDocClaimingDoc
module: accounting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAGenInvestmentDocClaimingDoc

## Overview

Automatically generates Investment Document Claiming records for treasury bonds that reach their maturity date today. Creates claiming documents to track when treasury bonds become due for collection.

## When This Action Runs

- **Trigger:** Manual execution or scheduled daily processes
- **Target:** InvestmentDoc entities (treasury bonds only)
- **Purpose:** Generate claiming documents for bonds maturing today
- **Timing:** Daily processing for bonds with worth date = today

## How It Works

### Bond Selection Criteria
- **Worth Date:** Equals today's date (maturity date)
- **Type:** Treasury Bonds only (not Company Bonds)
- **Status:** "Ongoing" status (not Initial or Closed)
- **State:** Previously committed entities only

### Document Generation Process
- **Creates:** New InvestmentDocClaiming records
- **Links:** References to original investment documents
- **Copies:** Specified fields based on field mapping parameter
- **Generates:** Document codes automatically
- **Dimensions:** Copied from the book of the new claiming document
- **Saves:** Each claiming document as final; the run stops at the first one that fails to save
- **Limit:** Maximum 500 records per execution

The record the flow runs on is not used: the bonds are always found by the criteria above, so the
flow is normally run from a task schedule.

## Parameters

### Parameter 1: Fields Map (Required)
- **Title:** Fields Map
- **Type:** Text field mapping configuration
- **Purpose:** A [field map](/entity-flows/core/ai-generated-field-maps-documentation) from the investment document to the new claiming document, one `target field=investment document field` per line. Use it for what the flow does not fill, such as the claiming document's book and term.

## Business Use Cases

1. **Treasury Bond Maturity Management:** Track bonds reaching maturity date
2. **Collection Process:** Generate documents for bond collection processing
3. **Lifecycle Management:** Support treasury bond lifecycle from purchase to collection

**Module:** accounting

**Full Class Name:** `com.namasoft.modules.accounting.domain.utils.actions.EAGenInvestmentDocClaimingDoc`

</div>

