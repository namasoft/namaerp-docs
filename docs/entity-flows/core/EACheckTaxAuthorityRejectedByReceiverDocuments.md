---
title: EACheckTaxAuthorityRejectedByReceiverDocuments
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EACheckTaxAuthorityRejectedByReceiverDocuments

## Overview

Automatically checks tax authority status for documents within their 3-day review window (from document date) and updates their status in the system.
Specifically designed to detect when documents are rejected by the receiver and mark them as `RejectedByReceiver`. Also updates other status changes
like Cancelled, NotValidSent, and regular Rejected.

## When This Action Runs

Typically scheduled to run periodically (e.g., every 6 hours) via TaskSchedule to monitor recent submissions for status changes, particularly receiver
rejections.

## How It Works

1. **Queries submission lines** within their 3-day review window with status `Sent` and
   `statusInTaxAuthority = 'Valid'`
2. **Groups by submission UUID** and tax configuration to optimize API calls
3. **Processes each submission** (one submission UUID with its tax configuration) in its own transaction, so a failed submission does not undo the others
4. **Checks status** with tax authority API for each submission. A *Status 504* answer is retried up to 6 times with a growing wait
5. **Updates document status** based on tax authority response:
    - `RejectedByReceiver` - **Rejected by document receiver** (when `rejectRequestDate` is present)
    - `Sent` - Successfully accepted
    - `NotValidSent` - Invalid submission (statusInTaxAuthority = 'Invalid')
    - `Cancelled` - Cancelled by tax authority
    - `Rejected` - Rejected by tax authority

## Key Parameters

- **Parameter 1:** Custom SQL Query (Optional) - SQL query to find submission lines to check. If not provided, uses default query.

### Default Query

```sql
SELECT DISTINCT submissionUUID, taxConfiguration_id
FROM TaxAuthoritySubmissionLine
WHERE taxAuthEntityStatusType = 'Sent'
  AND statusInTaxAuthority = 'Valid'
  AND valueDate >= CAST(DATEADD(day, -3, GETDATE()) as DATE)
  AND submissionUUID IS NOT NULL
  AND taxConfiguration_id IS NOT NULL
```

### Custom Query Requirements

- Must return 2 columns: `submissionUUID`, then `taxConfiguration_id`
- The columns are read by position, so they must be in this order. A row with an empty value in either column is skipped

### TaskSchedule Setup

Create a TaskSchedule with:

**Class Name:**

```
com.namasoft.modules.basic.util.EACheckTaxAuthorityRejectedByReceiverDocuments
```



## Supported APIs

- **Egypt Tax Authority integration**

## Related Actions

- [EAAutoSendEInvoice](EAAutoSendEInvoice.md) - Automatically sends invoices
- [EAAutoCollectSignAndSentEInvoice](EAAutoCollectSignAndSentEInvoice.md) - Batch submission

**Module:** core

**Full Class Name:** `com.namasoft.modules.basic.util.EACheckTaxAuthorityRejectedByReceiverDocuments`

</div>
