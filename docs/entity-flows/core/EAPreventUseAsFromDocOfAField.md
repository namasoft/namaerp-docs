---
title: EAPreventUseAsFromDocOfAField
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAPreventUseAsFromDocOfAField

## Overview

Prevents the documents that a field of the current record points to from being used as "from documents" by setting their `preventUseAsFromDoc` flag to true.

## When This Action Runs

- **Trigger:** Manual execution or automated workflows
- **Target:** DocumentFile entities that should be restricted from copy-from operations
- **Purpose:** Security and data integrity control for document copying
- **Timing:** On-demand when document access control is needed

## How It Works

1. **Resolves field value** from parameter to identify target documents
2. **Verifies target entities** are DocumentFile instances
3. **Sets restriction flag** `preventUseAsFromDoc = true` on target documents
4. **Applies immediately** without requiring entity save

From then on, saving any other document that newly selects a marked document in **From Document** is refused with:
*The document {0} is prevented from usage as from doc* — «المستند {0} ممنوع من الاستخدام في بناء على»
A document that already had it as its From Document before the mark keeps saving normally.

## Key Difference from Allow Action

- **Restriction Direction:** Prevents instead of allows copy-from operations
- **Flag Value:** Sets `preventUseAsFromDoc = true` instead of false

## Parameters

### Parameter 1: Field ID (Required)
- **Title:** Field id
- **Purpose:** The reference field of the current record that points to the documents to restrict
- **Format:** A header field id or a line field id. A line field marks the document of every line
- **Examples:** `fromDoc`, `ref1`, `details.ref1`

## Database Tables Affected

### DocumentFile Entities
- **preventUseAsFromDoc** - Flag set to true to restrict copy-from operations
- **Common Types:** SalesInvoice, PurchaseInvoice, PaymentVoucher, JournalEntry

## Business Use Cases

1. **Document Security:** Prevent copying from confidential or completed documents
2. **Workflow Control:** Block copy-from until proper approvals obtained
3. **Data Integrity:** Stop copying from documents with known issues

## SQL Monitoring Example

```sql
SELECT entityType, id, code, preventUseAsFromDoc
FROM (
    SELECT 'SalesInvoice' as entityType, id, code, preventUseAsFromDoc 
    FROM SalesInvoice WHERE preventUseAsFromDoc = 1
    UNION ALL
    SELECT 'PurchaseInvoice' as entityType, id, code, preventUseAsFromDoc 
    FROM PurchaseInvoice WHERE preventUseAsFromDoc = 1
) AS RestrictedDocs;
```

## Related Actions

- **EAAllowUseAsFromDocOfAField** - Allows field to be used as document reference

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventUseAsFromDocOfAField`

</div>

