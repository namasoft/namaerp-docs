---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# General Configuration

A **Document Term** (توجيه المستند) is the main mechanism for customizing how a document type behaves in Nama — one document type can have several terms, each shaping its validation, generation, pricing, accounting and more. This **General** tab holds the term's identity (code, names, the document type it targets, active state, template flag and field filters) plus a few cross-cutting toggles that don't belong to any single feature area.

The rest of the term's behavior lives on the other tabs — From-Document, Sub-Item, Quantity Tracking, Reservation & Delivery, Pricing/Taxes/Discounts, Dimensions, Generation and Accounting Effects.

::: info Where to find it
Open the document's **Document Term** (توجيه), then the **General** tab.
:::

## Identity & Basic Information

These fields identify the term and define which document type it configures. They are shared by virtually every supply-chain term.

**Document Type** `documentType` — The entity type this term configures (e.g. StockReceipt). It drives which feature groups and document-specific options appear on the rest of the screen. Shown as a list column and a criteria field.

**Code / Alternative Code** `code`, `altCode` — The term's identifying code and an optional alternative code used to look it up.

**Name (Arabic) / Name (English)** `name1`, `name2` — The term's display names. `name1` is the Arabic name, `name2` the English name.

**System** `systemBookOrTerm` — Marks the term as system-owned: the default term used on a document when no explicit term is chosen. Shown as a quick-filter column in the list.

**Inactive** `inActive` — Disables the term so it can no longer be selected on new documents. Pair it with **Inactive From** `termInfo.inActiveFrom` to set the date on which it becomes inactive.

**Template** `template` — Marks the record as a template to be cloned when creating new terms, rather than used directly on documents.

**Allow Printing Drafts** `termInfo.allowPrintingDrafts` — Permits printing documents that are still drafts (not yet saved/committed).

**Field Filter** `filters` — Restricts which records the reference fields offer on every document that uses this term. It does not hide fields — see [field filters with criteria](/platform/field-filtering/field-filter-with-criteria).

## Shortage Document Creation

When a document cannot fully satisfy customer demand, the term can auto-create a **Customers-Requests-Shortage** document recording the unmet quantities.

**Customers Requests Shortage Book** `termConfig.customersReqsShortageBook` — The document book used when generating the shortage document.

**Customers Requests Shortage Term** `termConfig.customersReqsShortageTerm` — The document term assigned to that generated shortage document.

**Suggest Customers Requests Shortages** `termConfig.suggestCustomersReqsShortages` — Controls how the system finds an existing shortage document to append the unmet demand to, versus creating a new one.

## Product Status

**Change Product Status To** `termConfig.changeProductStatusTo` — On save, the document sets each line item's product status to this value, driving a status-tracking workflow.

## Cancellation

**Allow Cancel With Non-System-Related Stock Docs** `termConfig.allowCancelWithNonSystemRelatedStockDocs` — Permits cancelling the document even when its related stock documents were not created by the system (they were manually linked). Applies to **Sales Invoice, Sales Return, Purchase Invoice and Purchase Return** only.

## Consolidated Purchase Request Lines

**Do Not Validate Lines With Purchase Req Lines** `termConfig.doNotValidateLinesWithPurchaseReqLines` — Skips the consistency check that the document's lines must match the originating purchase-request lines, allowing the lines to be edited freely. Applies to **Consolidated Purchase Request** only.
