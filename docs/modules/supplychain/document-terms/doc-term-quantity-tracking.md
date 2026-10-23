---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# Quantity Tracking Configuration

These settings control **quantity tracking** — the engine that links documents and records how much of a source document has been satisfied by the documents created from it (for example, how much of a Sales Order has been invoiced or delivered). The system keeps a tracking table of satisfied vs. remaining quantities and validates each new document against the policy you set here.

::: info Where to find it
Open the document's **Document Term** (توجيه), then the **Track Quantities** / **Related Doc Track Quantity** groups.
:::

::: tip Two policies, two directions
`trackInvoiceQuantity` controls **this document's own** quantity policy. `relatedDocQtyPolicy` controls the policy applied **against the related/source document** this one was created from (بناءً على). They are independent — set each according to whether you are checking the document itself or its link back to the order/receipt that spawned it.
:::

![The quantity tracking tab of the Sales Invoice document term](../../../ar/modules/supplychain/images/document-terms/doc-term-quantity-tracking-en.png)

## Tracking This Document's Quantities

This group is hidden entirely when the supply-chain configuration option to hide it is enabled; otherwise it is shown for all inventory document terms.

**Track Quantities** `termConfig.trackInvoiceQuantity` — The master switch for this document's own quantity-tracking policy. It decides whether the document's quantity must be less than, equal to, or more than the source quantity it satisfies, or whether no policy check runs at all.

**Track Invoice Quantity Fields** `termConfig.trackInvoiceQuantityFields` — Selects which quantity field (the first/primary quantity or the second quantity) the policy above is applied to.

**Update Qty at Save** `termConfig.updateQtyOnSave` — Controls which line quantity-tracking values are refreshed on every save: all values, only reservation-related values, or none.

The two policy fields above accept these values:

| Policy value (`trackInvoiceQuantity` / `relatedDocQtyPolicy`) | Meaning |
|---|---|
| `LessQuantity` | The tracked quantity may be **less than** the source quantity. |
| `SameQuantity` | The tracked quantity must **equal** the source quantity. |
| `MoreQuantity` | The tracked quantity may be **more than** the source quantity. |
| `None` | No policy check is applied. |

The "fields" selectors above accept these values:

| Field selector (`trackInvoiceQuantityFields` / `relatedDocQtyFields`) | Meaning |
|---|---|
| `TrackInFirst` | Track against the first (primary) quantity. |
| `TrackInSecond` | Track against the second quantity. |

And `updateQtyOnSave` accepts:

| Value | Meaning |
|---|---|
| `None` | Do not refresh tracking values on save. |
| `UpdateAll` | Refresh all line tracking values. |
| `UpdateForReservation` | Refresh only reservation-related tracking values. |

## Tracking Related Documents' Quantities

This group is added for all inventory document terms. It governs how the document tracks its quantities back against the related (from/origin) document — and writes the satisfied amount back into it.

**relatedDocQtyPolicy** `termConfig.relatedDocQtyPolicy` — The quantity-tracking policy applied specifically against the related/linked document — the counterpart of `trackInvoiceQuantity`, but for the from-document relationship. Uses the same `TrackQuantityPolicy` values (`LessQuantity` / `SameQuantity` / `MoreQuantity` / `None`).

**Related Doc Qty Fields** `termConfig.relatedDocQtyFields` — Selects which quantity field (first or second) is tracked for the related-document policy.

**Force Qty** `termConfig.forceTrackQtyOfRelatedDocs` — Forces quantity tracking against the related (from/origin) document even when it would not otherwise be triggered.

**Ignore Track Qty When Adding Lines Manually** `termConfig.ignoreTrackQtyWhenAddingLinesManually` — Skips track-quantity validation and recording for lines the user adds by hand, rather than lines pulled from a linked document.

**Force Do Not Include Reserved With Qty Validation** `termConfig.forceDoNotIncludeReserved` — When validating available/remaining quantities, excludes already-reserved quantity from the calculation.

**Do Not Allow Deleting Line In Track Quantity Documents** `termConfig.doNotAllowDeletingLineInTrackQtyDocs` — Prevents deleting a line once it participates in quantity tracking, protecting the integrity of satisfied/remaining values.

**Prevent Saving If Qty Tracking Fields Negative** `termConfig.preventSavingIfQtyTrackingFieldsNegative` — Blocks the save when any tracked quantity field would become negative.

**Update Track Qty In Related Doc** `termConfig.updateTrackQtyInRelatedDoc` — On save, writes the satisfied quantity back into the related/source document's tracking values (for example, marking the Sales Order as partly invoiced).

**Allow Negative Remaining In Track Quantity** `termConfig.allowNegativeRemainingInTrackQty` — Permits over-satisfying: the remaining (un-satisfied) tracked quantity may go below zero.

**Order Status Qty Track Config** `termConfig.orderStatusQtyTrackConfig` — References an `OrderStatusQtyTrackConfig` master file whose lines map order-status criteria to which quantity value is copied into tracking — i.e. it defines the *source* of the tracked quantity.

**Negate Quantity Tracking** `termConfig.negativeQtyTrackValue` — Records the tracking quantity with a negated sign, used for return / reverse-direction documents.

**Create All Track Entries With Save** `termConfig.createTrackEntriesWithSave` — Creates all system quantity-tracking table entries immediately on save, rather than lazily on a later action.

**Update Order Status In Case Of** `termConfig.orderStatusWithQtyTrackType` — Chooses which tracked quantity field (first or second) drives automatic order-status updates — for example, changing the status when the first vs. second quantity is fully satisfied. Uses the `TrackQuantityFields` values.

**Validate Satisfied Quantity (System + Manual) For Order Cancelled Status** `termConfig.validateSatisfiedQtyWithCancelledOrderStatus` — When an order is set to Cancelled, validates that the satisfied quantity — both system-tracked and manually entered — is consistent before allowing the status change.

**Permitted Percentage Value To Skip Quantity Track Value** `termConfig.permittedPercentageToSkipQtyTrackValue` — A tolerance percentage by which the tracked quantity may be exceeded or skipped without triggering a track-quantity validation error.

**Track Quantity For Matched Lines With Query Applies** `termConfig.trackQtyForLinesMatchingQuery` — Restricts quantity tracking to the lines that match the given query/filter.

### Return-aware and stock-document tracking

These options apply only to specific document types.

**Consider Returned Qty For Track Qty In Related Doc** `termConfig.considerReturnQtyForTrackQtyInRelatedDoc` — Subtracts returned quantities when computing the satisfied quantity against the related document. Available only for Sales Invoice, Service-Center Sales Invoice, Purchase Invoice, and Service-Center Purchase Invoice terms.

**Deducting Track Quantity From Stock Document Quantity** `termConfig.deductTrackQtyFromStockDocQty` — Deducts the tracked quantity from the linked stock document's quantity, avoiding double-counting between the invoice and the stock receipt. Available only for Purchase Invoice and Service-Center Purchase Invoice terms.

**Allow Quantity Tracking for System Generated Documents** `termConfig.allowTrackQtyForSysGeneratedDocs` — When a Stock Issue or Stock Receipt is produced automatically by the system (a fully generated document spawned from another document's workflow), it normally sits outside quantity tracking — the system assumes its origin document already handled the tracking. Turn this on to bring those system-generated documents back into tracking, so they record and validate their satisfied/remaining quantities just like manually entered ones. Available only for Stock Issue and Stock Receipt terms.

## Serial & Special-Serial Handling

These options govern how serial numbers interact with quantity tracking and line-quantity entry.

**Allow Special Serial Numbers** `termConfig.allowSpecialSerialNumbers` — Allows special / non-standard serial numbers in the context of quantity tracking.

**Calculate Quantity From Serial With Data Entry** `termConfig.calcQtyFromSerialWithEntry` — Derives the line quantity from the count of serial numbers entered during data entry, so the quantity stays in step with the serials captured.
