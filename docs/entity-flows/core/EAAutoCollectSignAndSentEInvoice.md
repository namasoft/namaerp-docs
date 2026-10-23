---
title: EAAutoCollectSignAndSentEInvoice
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAAutoCollectSignAndSentEInvoice

## Overview

Automates the complete e-Invoice submission process (Egyptian Tax Authority or Saudi ZATCA) by collecting eligible invoices, creating submission documents, digitally signing them, and sending them to the tax authority. Handles high-volume electronic invoice submissions with proper batching.

## When This Action Runs

Scheduled task execution for automated e-Invoice processing on TaskSchedule entities.

## How It Works

1. **Collects invoices** of specified entity type using query filtering
2. **Creates submission documents** (TaxAuthoritySubmissionDoc) for each batch
3. **Digitally signs** documents using taxpayer certificates
4. **Submits to ZATCA** and processes responses
5. **Handles asynchronously** with transaction isolation and error recovery

## Key Parameters

- **Parameter 1:** Submission Document Book (Required) - Code of the Tax Authority Submission book the created submission documents are saved in (e.g., `EINV_SUB`)
- **Parameter 2:** Tax Payer Configuration - Tax Payer Configuration code (e.g., `MAIN_TAXPAYER`). Only documents that belong to this configuration are collected
- **Parameter 3:** Entity Type - Type of documents to collect (e.g., `SalesInvoice`). Leave empty to collect every document type waiting to be sent
- **Parameter 4:** Max Lines Per Submission Document (Optional) - Whole number; how many documents go into one submission document (default: 500)
- **Parameter 5:** Collect When Query Matched (Optional) - An SQL query that **returns the ids of e-invoice submission entries** (`EInvoiceSubmissionEntry`). Only the entries whose id is in the first column of the result are collected. The query runs once at the start of each run
- **Parameter 6:** Created Submission Extra Fields Map (Optional) - Field map applied to each created submission document, e.g. `branch="ABC"`
- **Parameter 7:** Max Submission Documents to be processed at one run (Optional) - Whole number, default 3, never more than 5. A further submission document is only created when the previous one was filled up to Parameter 4

### Collect When Query Matched examples
Each query returns submission-entry ids, never a 1/0 flag:

```sql
-- Only entries dated after 1 January 2025 (the product's own example)
select id from EInvoiceSubmissionEntry where valueDate > '20250101'

-- Only entries of one branch
select e.id from EInvoiceSubmissionEntry e
inner join Branch b on b.id = e.branch_id
where b.code = 'B01'
```

## Database Tables Affected

- **TaxAuthoritySubmissionDoc** - Created submission documents with batch references
- **TaxAuthoritySubmissionLine** - Links invoices to submission documents
- **TaskSchedule** - Source entity triggering the process
- **Invoice Entities** - Updated with submission status

## Related Actions

- [EAAutoSendEInvoice](EAAutoSendEInvoice.md)
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAutoCollectSignAndSentEInvoice`

</div>

