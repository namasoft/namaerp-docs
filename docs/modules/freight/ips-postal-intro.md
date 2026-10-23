---
entities: [IPSMailClass, IPSMailCategory, IPSMailSubclass, IPSMailCondition, IPSParcelStatus, IPSDeliveryAndReceiptArea, IPSMailRetentionReason, IPSNonDeliveryReason, IPSNonDeliveryMeasure, IPSEvent]
---
# International Postal System (IPS) — Overview

Alongside freight and logistics, the Freight Management module includes a complete system for running **International Postal System (IPS)** operations. If you're a postal operator or a courier company dealing with an international exchange office, this section manages a mail item's journey from the moment receptacles arrive from abroad until the parcel is delivered to the customer's door.

::: info Who is this section for?
The postal system is a specialized part of the freight module. If your business is only ocean freight and clearance, you may not need it. Postal and parcel operators, on the other hand, will find a complete workflow here. Both sections live in the same **Freight Management System** menu, but they are licensed separately: the freight and clearance documents under `frm`, and everything postal under `frm-ips`.
:::

## Core concepts

Before getting into the documents, let's learn the vocabulary the whole system revolves around.

### Mail Item

The smallest unit: an individual parcel or letter. A mail item carries a unique identifier (Mail Item ID), a description, a **mail class, category, and subclass**, an **HS code** for customs, a weight (declared and actual), a country of origin, recipient data, and its value. It's what ultimately gets delivered to the customer.

### Receptacle

A container that gathers several mail items for transport between offices — a sealed bag or box with a seal number. The system treats receptacles as a transport unit, and the items inside them as a delivery unit.

![An IPS Mail Class record](../../ar/modules/freight/images/ips/ips-mail-class-screen-en.png)

### Delivery & Receipt Areas

The postal offices and areas the items move between: **Received From**, **Received In**, and **Next Office**. Tracking these fields on every document traces the item's path across the office network.

## A mail item's journey

A mail item passes through stages, each with its own document:

1. **Receiving receptacles** — receptacles arrive from abroad and are recorded with a [Receptacles Receipt](./ips-receptacles.md).
2. **Manifesting/opening items** — receptacles are opened and the items inside recorded via the [Mail Item Manifest](./ips-mail-items.md).
3. **Customs clearance** — items subject to customs are gathered in a [Manifest for Custody](./ips-receptacles.md).
4. **Transfer between offices** — items move to the office responsible for delivery via the [Mail Item Transfer](./ips-mail-items.md).
5. **Sorting** — items are sorted for delivery, and missing ones and non-delivery reasons are recorded in the [Postal Parcels Sort](./ips-mail-items.md).
6. **Delivery and collection** — a [Delivery Request](./ips-delivery.md) is created for the customer, then a [Delivery Invoice](./ips-delivery.md) for the service value and customs fees.

And throughout the journey, the **adjustment, stock-taking, and retention** documents let you correct discrepancies and handle held items.

## Postal master files

Defined once under **Freight Management System → Master Files**:

- **Mail Class / Category / Subclass** — classification of mail items per postal-union standards.
- **Mail Condition** and **Parcel Status** — describe the item's situation.
- **Delivery & Receipt Area** — offices and areas.
- **Delivery Service Item** and **Delivery Service Price** — delivery pricing.
- **Retention Reason** and **Non-Delivery Reason / Measure** — handling exceptions.
- **Event** — item-tracking events.

The following pages detail each group of documents.
