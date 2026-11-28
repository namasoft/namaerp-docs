---
entities: [IPSMailItemManifest, IPSPostalParcelsSort, IPSMailItemTransfer, IPSMailItemAdjustment, IPSMailItemStockTaking, IPSMailRetentionDocument]
---
# Mail Items

After the inbound receptacles are opened, the **mail item** becomes the focus of the work: it's recorded, transferred between offices, adjusted, stock-taken, and sorted for delivery. This page covers the documents that manage the mail-item lifecycle, all under **Freight Management System → Documents**.

All these documents share a common header carrying **Received From**, **Received In**, and **Next Office**, the total item count and weight, and a new seal number when re-closing.

## Mail Item Manifest

The entry point for items into the system: when the inbound receptacles are opened, the manifest records every item inside — its **Mail Item Id** and description, class, category and subclass, HS code and revised HS code, IPS weight, country of origin, receiver name, and the location it is stored in. It's what builds the postal inventory the rest of the documents work on.

![Mail item manifest](../../ar/modules/freight/images/ips/mail-item-manifest-en.png)

## Mail Item Transfer

Items move from one office to another on their way to delivery. The transfer document records the movement of a group of items from the **Received From** to the **Next Office**, updating their location in the network and leaving a trail for tracking.

## Mail Item Adjustment

To correct item data when discrepancies are found — a different weight, a wrong classification, a revised HS code, or a count correction. This document keeps the postal inventory accurate without having to cancel the preceding documents.

## Mail Item Stock Taking

For periodic stock taking of the stored mail items: you list what is physically on the shelves, so you reconcile what physically exists against what's recorded in the system. What the document does to storage follows the **Component Effect Type** of its term, like the other mail-item documents (see below).

Its **Collect Mail Items From Location** button fills the grid with every mail item currently
stored in any location, each with its location, so the count starts from what the system believes is
on the shelves. How mail items occupy locations is on [Storage Locations](./freight-storage-locations.md).

## Mail Retention Document

Some items are held and not delivered immediately — for customs, security, or unreachable-recipient reasons. The retention document records the held items, each with its actual weight and **Retention Reason**, and in its header an **Action Type** — **Retention**, **Confiscation** or **Release** — and a **Retention Type**. On save it reports its term's event for each item; it does not touch storage locations.

## Postal Parcels Sort

Before delivery, items are sorted. The sort document is the richest in this group:

- It records the **sorted items** for delivery, compares the **receptacle item count** against the **count in the network (grid)**, and highlights the **difference** automatically.
- It records the **missing mail items** of the receptacle when a shortage is found.
- It links the **Non-Delivery Reason / Measure** for items that can't be delivered.
- It captures the **client's signature and the employee's signature** as proof.
- It offers a **do not fetch data from IPS** option for manual work when needed.

![Postal parcels sort](../../ar/modules/freight/images/ips/postal-parcels-sort-en.png)

::: tip Item classification governs everything
The accuracy of the **class, category, and subclass** and the HS code on each item is what makes sorting, clearance, and pricing correct. Set up the classification master files first (see the [postal overview](./ips-postal-intro.md)), then let the documents build on them.
:::

## What saving these documents does

Each of these documents, when first saved, reports the event set on its term to the external IPS
server for every mail item on it, and — except for the Mail Retention Document, depending on the
term's **Component Effect Type** — puts the items into their lines' locations, takes them out, or
leaves storage alone. Both are configured
on the term: see [Freight Document Terms](./freight-document-terms.md#The-postal-movement-terms).

Typing a **Mail Item Id** on a line fills the rest of the line from IPS. The **More** menu of each
document, and of its list view, has **Resend IPS Events** and **Resend Failed IPS Tasks Only** for
when the reporting failed — see [IPS Integration](./ips-integration.md).
