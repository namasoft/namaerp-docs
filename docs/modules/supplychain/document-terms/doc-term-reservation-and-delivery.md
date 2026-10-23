---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# Reservation & Delivery System

These settings control how a document **reserves** stock for its lines and how it participates in the **delivery system** — the system table that tracks an order through reservation, loading, and final delivery. Reservation holds stock against future fulfilment; the delivery system drives the order-to-driver pipeline.

::: info Where to find it
Open the document's **Document Term** (توجيه), then the **Reservation** group, and the separate **Delivery System Table Configuration** page.
:::

::: warning Reserve fields are not shown for every document
The core `reserve*` fields below are **excluded** for `StockReceipt`, `StockIssue`, and the three transfer documents (`ReceiptStockTransfer`, `IssueStockTransfer`, `StockTransfer`). The delivery-password fields apply to **Delivery Document terms only**.
:::

![The Reservation tab of the Sales Invoice document term](../../../ar/modules/supplychain/images/document-terms/doc-term-reservation-and-delivery-en.png)

## Reservation Behavior

These six options are added for all inventory document terms and govern how reservations are sequenced, cancelled, and updated across linked documents.

**Check Reservation Sequentiality** `termConfig.checkReservationSequentiality` — Enforces that reservations are consumed or created in sequence (FIFO-style ordering of reservation usage).

**Check Reservation Sequentiality In First Save Only** `termConfig.checkReservationSequentialityInFirstSaveOnly` — Limits the sequentiality check above to the document's first save only.

**Cancel Reservation Of Related Docs** `termConfig.cancelReservationOfRelatedDocs` — On save/processing, cancels the reservation held by the related/source document(s) — for example, invoicing an order releases that order's reservation.

**Consider Origin Document In Lines With Cancel/Update Reservation** `termConfig.considerOriginDocInLinesWithCancelOrUpdateReservation` — When cancelling or updating reservations, considers the per-line origin ("copied from", بناءً على) document rather than only the header link.

**Prevent Cancel Reservation** `termConfig.preventCancelReservation` — Blocks cancellation of reservations from this document.

**Update Reservation Of Related Docs** `termConfig.updateReservationOfRelatedDocs` — On save, updates (recalculates) the reservation quantities held by related/source documents.

## Reservation Sources & Criteria

These are the core `reserve*` fields. They are shown for all inventory document terms **except** `StockReceipt`, `StockIssue`, `ReceiptStockTransfer`, `IssueStockTransfer`, and `StockTransfer`.

**Reserve** `termConfig.reserve` — The master switch: this document reserves stock for its lines.

**Reserve From Reservation** `termConfig.reserveFromReservationQty` — Reserves using the dedicated reservation quantity field instead of the document's main line quantity.

**Reservation Lines Criteria** `termConfig.reservationCriteria` — A criteria filter selecting which lines participate in reservation; only lines matching the criteria are reserved.

**Reserve Only When Criteria Is Matched** `termConfig.reserveOnlyWhenCriteriaIsMatched` — Performs the reservation only when the document/line matches the supplied criteria.

The next two fields decide where the reservation is placed — against the normal warehouse/locator on the line, or a dedicated reservation warehouse/locator.

| Option | Field ID | Values |
|---|---|---|
| Reservation Warehouse Source | `termConfig.reservationWarehouseSource` | `NormalWarehouse` / `ReservationWarehouse` |
| Reservation Locator Source | `termConfig.reservationLocatorSource` | `NormalLocator` / `ReservationLocator` |

**Reservation Satisfied Fields** `termConfig.reservationSatisfiedFields` — Selects which quantity field counts as the satisfied/released reservation quantity. Accepts `TrackInFirst` / `TrackInSecond`.

## Sequentiality & Availability Checks

**Check Available Quantities Before Save** `termConfig.checkAvailableQties` — Validates available stock quantities before allowing the save, preventing the document from reserving more than is available.

**Update Reservation Status In From Doc** `termConfig.updateReservationStatusInFromDoc` — Updates the reservation status field back in the linked from-document. Available only for `ReservationDocument` terms.

## Delivery System Table

The **Delivery System Table Configuration** page links the configuration files that drive the delivery pipeline and lets reservation draw from the delivery-system table instead of the standard reservation entries. The first four fields are shown for all inventory document terms.

**Root Delivery Document** `termConfig.rootDeliveryDocument` — Marks this document type as the root/origin of the delivery-system tracking chain.

**Delivery Configuration File** `termConfig.deliveryConfiguration` — Links a `DeliveryConfiguration` file that governs how delivery-system entries are produced and tracked for this document.

**Reserve Using Delivery System Table** `termConfig.useDelivSysEntriesForReserv` — Uses the delivery-system table entries as the basis for reservation, instead of the standard reservation entries.

**Reserve From Delivery System Table Quantity** `termConfig.reserveFromDeliveryEntryQty` — Chooses which delivery-system table quantity column the reservation draws from:

| Value | Quantity column |
|---|---|
| `ReservationQuantity` | Reservation quantity |
| `DeliveryQuantity` | Delivery quantity |
| `LoadingQuantity` | Loading quantity |
| `Other1Quantity` | Other quantity 1 |
| `Other2Quantity` | Other quantity 2 |

**Delivery Queue Configuration** `termConfig.deliveryQueueConfig` — Links the `DeliveryQueueConfiguration` controlling how this document feeds the order delivery queue.

**Delivery Organization File** `termConfig.deliveryOrganization` — Links the driver `DeliveryOrganization` configuration used to dispatch and assign deliveries.

### Delivery Document Terms Only

The following fields are defined on the delivery-document term and apply **only to Delivery Document terms**. The last three implement a password gate that must be satisfied before a delivery can be marked as delivered.

**Update Delivery Status In From Doc** `termConfig.updateDeliveryStatusInFromDoc` — Writes the delivery status back into the linked from-document.

**Delivery State Requires Password** `termConfig.deliveryStateRequiresPassword` — Requires entering/matching a system password before the delivery state can be changed to "Delivered".

**System Password Pattern** `termConfig.systemPasswordPattern` — Defines the character pattern of the generated delivery-confirmation password: `NumbersOnly`, `LettersOnly`, or `Both`.

**System Password Length** `termConfig.systemPasswordLength` — Defines the length (number of characters) of the generated delivery-confirmation password.
