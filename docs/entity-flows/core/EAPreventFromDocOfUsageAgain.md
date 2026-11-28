---
title: EAPreventFromDocOfUsageAgain
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAPreventFromDocOfUsageAgain

## Overview

Automatically prevents source documents from being reused as "from documents" in multiple target documents by managing the `preventUseAsFromDoc` flag to maintain document chain integrity.

## When This Action Runs

Automatic execution on post-commit and post-delete events for DocumentFile entities with document references.

## How It Works

1. **On Commit:** Unmarks previous "from document" and marks current "from document" as unavailable via `preventUseAsFromDoc` flag
2. **On Delete:** Removes `preventUseAsFromDoc` flag from referenced document to restore availability
3. **State Management:** Updates protection state across all affected documents automatically


## Parameters

**No Parameters Required.** Whatever is chosen in **Target Action** on the flow line is replaced with **Automatic** when the entity flow is saved; the flow then acts on Post Commit and Post Delete only.

Once a document is marked, saving another document that newly selects it in **From Document** is refused with:
*The document {0} is prevented from usage as from doc* — «المستند {0} ممنوع من الاستخدام في بناء على»

## Database Tables Affected

- **DocumentFile** - Updates the `preventUseAsFromDoc` flag on the document chosen in **From Document** (and on the previously chosen one when it is changed) during commit and delete operations. A From Document that is not a document is ignored


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPreventFromDocOfUsageAgain`

**ℹ️ Note:** This action is an automatic action that selects the appropriate events to execute itself


</div>

