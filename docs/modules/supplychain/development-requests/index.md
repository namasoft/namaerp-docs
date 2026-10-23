---
description: "Index of Supply Chain development request notes: untagged quantities for batch and expiry items before a cut-off date, and stock receipts for the unsatisfied part of a purchase order."
---
# Development Request Notes

Every now and then a client asks for something that changes how a core part of the Supply Chain module behaves — not a bug fix, but a deliberate new capability that touches inventory, costing, or document validation. These changes are important enough that the people who configure and support the system need to understand **why** they exist, **what** they change, and **when** to turn them on.

This section is where we keep those notes. Each page documents one significant development request: the business problem behind it, how the feature works, the settings that control it, and any behavior you should be aware of before enabling it on a live database.

These are not step-by-step tutorials. Think of them as the story behind a feature — the kind of context you'd want if you were deciding whether a particular option is right for a client, or trying to understand why the system suddenly allows something it used to forbid.

## Requests Documented Here

- **[Allowing Items With Batch & Expiry to Hold Untagged Quantities](./allow-empty-item-dimensions-before-date.md)** — letting items that normally require a batch number, expiry, or other tracking dimension also carry quantities **without** those dimensions, up to a chosen cut-off date. *(Request SRDRQ06261)*
- **[Stock Receipts for the Unsatisfied Part of a Purchase Order](./stock-receipt-for-unsatisfied-order-quantities.md)** — a purchase order that keeps a stock receipt in sync with its outstanding quantity, plus options to hide fully-executed orders in the from-document picker and to date and split the receipts a purchase invoice generates. *(Request SRDRQ06178)*
