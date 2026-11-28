---
title: EASendNotSentTaxAuthorityDocuments
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASendNotSentTaxAuthorityDocuments

## Overview

A catch-up sweep for e-invoicing. It looks for **Tax Authority Submission Documents** that still have lines in status *Not Sent* or *Not Sent Correctly* and sends those lines to the tax authority again. Invoices sometimes get collected and prepared but never reach the authority — the connection dropped, the authority's service was down, or nobody pressed send. Scheduling this action means those documents are retried automatically instead of waiting for someone to notice.

## When This Action Runs

It ignores the record it runs on, so run it from a scheduled task (for example every hour). Two runs of this action never overlap — while one run is still working, another does not start alongside it.

## How It Works

1. **Finds the submission documents** - runs the query in parameter 1, or, when that is empty, the default query that lists every submission document with a line still *Not Sent* or *Not Sent Correctly*.
2. **Limits the batch** - processes at most the number of documents in parameter 2 (50 by default) per run; the rest are picked up by the next run.
3. **Sends each document** - for each submission document, sends every line that has not been sent yet, exactly as sending from the submission document would. A document that fails is recorded in the run's result and the action moves on to the next one.
4. **Stops cleanly** - stopping the task ends the run after the current document.

The same checks as a manual send apply: a line already *Submitted* (waiting for the authority's verdict) is not sent again, and a line whose preparation failed is refused until its source document is recommitted.

## Parameters

**Parameter 1:** SQL Query (optional) - Must return: doc_Id (TaxAuthoritySubmissionDoc id). (Optional) - A query returning the ids of the submission documents to send in its first column (the column is read by position). When empty, this default is used:

```sql
SELECT DISTINCT doc_Id
FROM TaxAuthoritySubmissionLine
WHERE taxAuthEntityStatusType IN ('NotSent', 'NotValidSent')
  AND doc_Id IS NOT NULL
```

**Parameter 2:** Max documents to process per run (Default is 50) (Optional) - A whole number.

## Example

Retry only submission documents dated in the last seven days:

```sql
SELECT DISTINCT l.doc_Id
FROM TaxAuthoritySubmissionLine l
JOIN TaxAuthoritySubmissionDoc d ON d.id = l.doc_Id
WHERE l.taxAuthEntityStatusType IN ('NotSent', 'NotValidSent')
  AND d.valueDate >= DATEADD(day, -7, GETDATE())
```

**Module:** core

**Full Class Name:** `com.namasoft.modules.basic.util.EASendNotSentTaxAuthorityDocuments`

See the [e-invoicing guide](/modules/invoicing/e-invoices-guide) for how submission documents are collected and sent.

## Related Actions

- [EAAutoSendEInvoice](EAAutoSendEInvoice.md)
- [EAAutoCollectSignAndSentEInvoice](EAAutoCollectSignAndSentEInvoice.md)
- [EACheckTaxAuthorityRejectedByReceiverDocuments](EACheckTaxAuthorityRejectedByReceiverDocuments.md)


</div>
