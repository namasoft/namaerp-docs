---
title: EAAllowUseAsFromDocOfAField
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAAllowUseAsFromDocOfAField

## Overview

Lifts the "prevented from usage as from doc" mark from the documents that a field of the current record points to, so they can again be chosen in **From Document** of other documents. It undoes what [EAPreventUseAsFromDocOfAField](/entity-flows/core/EAPreventUseAsFromDocOfAField) does.

## When This Action Runs

- **Trigger:** The event chosen in **Target Action** on the flow line, or a manual run
- **Target:** Any record that has a field pointing to documents
- **Purpose:** Make the referenced documents usable as a From Document again

## How It Works

1. **Reads the field** named in Parameter 1 from the current record. A line field gives one value per line
2. **Keeps only documents**: a value that is not a document (a master file, for example) is skipped
3. **Clears the mark** `preventUseAsFromDoc` on each of those documents

## Parameters

### Parameter 1: Field ID (Required)
- **Title:** Field id
- **Purpose:** The reference field of the current record that points to the documents to release
- **Format:** A header field id or a line field id
- **Examples:** `fromDoc`, `ref1`, `details.ref1`

## Related Actions

- **EAPreventUseAsFromDocOfAField** - Marks the referenced documents so they cannot be used as a From Document

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAllowUseAsFromDocOfAField`

</div>

