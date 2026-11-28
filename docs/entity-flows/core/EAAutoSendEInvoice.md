---
title: EAAutoSendEInvoice
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAAutoSendEInvoice

## Overview

Automatically submits individual invoices to tax authorities (ZATCA/Egyptian Tax Authority) immediately after invoice creation or modification. Handles single-invoice submissions with automatic document signing.

## When This Action Runs

Automatically after invoice save/commit operations on invoices that are sent to the tax authority. Must be configured to run after commit (**Run After Committing Document And Affect On Database** ticked on the entity flow).

## How It Works

1. **Validates** that the record is an invoice sent to the tax authority
2. **Creates or finds** the submission document: the first one found that either already holds this invoice or is dated today, otherwise a new one
3. **Adds submission line** linking invoice to submission document. When the invoice's line is already sent, cancelled or rejected the flow stops here and sends nothing
4. **Applies digital signing** for Egyptian e-Invoices if required
5. **Submits to tax authority** and processes response

## Key Parameters

- **Parameter 1:** Tax Submission Document Book (Required) - Code of the Tax Authority Submission book (e.g., `EINV_SUB`, `ZATCA_SUB`)
- **Parameter 2:** TaxPayerConfiguration Code or ID - The Tax Payer Configuration written on the submission document (e.g., `MAIN_TAXPAYER`)
- **Parameter 3:** Add Dimensions From Invoice (Optional) - `true` copies the invoice's branch, sector, department and analysis set to the submission document; leave empty to keep them off

## Database Tables Affected

- **TaxAuthoritySubmissionDoc** - Submission documents grouping invoices by date
- **TaxAuthoritySubmissionLine** - Links invoices to submission documents
- **Invoice Entities** - Updated with submission status and references

## Configuration Requirements

### Entity Flow Settings
- Must have **Run After Committing Document And Affect On Database** ticked; otherwise the flow refuses with *The action (EAAutoSendEInvoice) should be used only when the option {0} is active*, where {0} is that option's name
- Only works with invoice documents that are sent to the tax authority; on any other entity it refuses with *This entity flow must be used only with invoice entities*
- Should run after invoice save operations

### Tax Authority Setup
- Valid TaxPayerConfiguration required
- API credentials and digital certificates needed
- Stable internet connection to tax authority systems

## Related Actions

- [EAAutoCollectSignAndSentEInvoice](EAAutoCollectSignAndSentEInvoice.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoSendEInvoice`

</div>

