---
description: "Connecting the freight module's postal documents to the IPS international postal system: the IPS settings, look-ups that fill receptacle and mail item lines, and the events reported on save."
entities: [IPSEvent, IPSReceptaclesReceipt, IPSTransferReceptacles, IPSMailItemManifest, IPSManifestForCustody, IPSMailRetentionDocument, IPSMailItemTransfer, IPSMailItemStockTaking, IPSMailItemAdjustment, IPSPostalParcelsSort]
---
# IPS Integration

A postal operator does not track mail on its own. Every item crossing borders lives in the **IPS**
— the international postal system the operator shares with the post offices it exchanges mail
with. The freight module's postal documents talk to that system in both directions:

- **Reading.** When you type a receptacle or a mail item number into a postal document, the system
  asks IPS for what it already knows — weight, class, origin, recipient — and fills the line.
- **Reporting.** When you save a postal document, the system tells IPS what just happened to every
  item on it — "received at office X", "handed to customs", "delivered" — by sending an **event**.

The reporting is asynchronous: saving the document only queues the events, and a background
process sends them. So a document can be saved perfectly while its events fail. This page explains
how to set the connection up, what is sent, and where to look when IPS does not show what you
expect.

## Connecting

Open **Freight Management System → Settings → Freight Management System Settings**, tab **IPS
Configurations**:

| Setting | What it does |
|---|---|
| **IPS URL** | The address of the IPS service. Both the look-ups and the events go here. |
| **IPS Token** | The access token sent with every call. |
| **Do Not Send IPS Documents Events To IPS** | Stops all reporting. Documents save normally and no event is queued. Look-ups still work. Useful on a test copy of the database. |
| **IPS User Field Id** | A field id on the user record (for example a text field holding the user's IPS login). Its value, for the user saving the document, is sent with each mail-item event as the acting user. |
| **IPS Workstation Field Id** | The same for the workstation identifier. |
| **Allowed Mail Item Prefix To Send To IPS** | A comma-separated list of prefixes. When filled, only mail items whose number starts with one of them are reported; the rest are skipped silently. Empty means every mail item. Receptacles are always reported. |

![An IPS Receptacles Receipt](../../ar/modules/freight/images/ips/receptacles-receipt-en.png)

## Reading from IPS

The look-ups happen as you type:

- **Receptacles Receipt** — entering a **Receptacles Id** on a line fills its **Receptacles Weight
  IPS**, **Seal No**, **Receptacles Mail Items No** and **Mail Subclass Id**.
- **IPS Postal Parcels Sort** — entering the header **Receptacle Id** fills **Receptacle Mail Items
  Count**, which the sort then compares against the items you scan.
- **Every mail-item document** — entering a **Mail Item Id** on a line fills its weight, mail
  subclass, class and category, origin country, value and currency, HS code and revised HS code,
  receiver name and contact details, and description.

Two things are worth knowing. The origin country is taken from the **last two letters** of the
mail item number, which is how international mail numbers are built. And any mail class,
subclass, category, country or currency that IPS returns and Nama does not have yet is **created
automatically** with that code — so after the first weeks of work, those master files fill up by
themselves.

On the **IPS Postal Parcels Sort**, ticking **Do Not Fetch Data From IPS** turns the mail-item
look-up off, for working by hand when IPS is unreachable.

## Reporting events

### What an event is

An **IPS Event** (**Freight Management System → Master Files → IPS Event**) is a code-and-name
master file. Its **code** is what IPS understands — the postal tracking event code agreed with your
IPS. Its name is only for people.

Each postal document's term names the event it reports, in its required **Event** field — see
[Freight Document Terms](./freight-document-terms.md#The-postal-movement-terms). When a document is
first saved, the system queues one task per line (saving it again later does not report again — use
**Resend IPS Events** for that):

- **Receptacles Receipt** and **Transfer Receptacles** queue an **Update Receptacle State** task for
  each receptacle, carrying the event code as a number and the **Received In** office.
- The mail-item documents — **Mail Item Manifest**, **Manifest for Custody**, **Mail Retention
  Document**, **Mail Item Transfer**, **Mail Item Stock Taking**, **Mail Item Adjustment** and
  **Postal Parcels Sort** — queue an **Update Mail Item State** task for each mail item, carrying
  the event code, the origin country and mail class, the **Received In** office and the **Next
  Office**, and the user and workstation fields set above. A retention document also sends the
  item's retention reason.

Two event codes carry extra data, taken from the document's header:

- **36** (non-delivery) — the **Non Delivery Reason** and **Non Delivery Measure** codes.
- **37** (delivery) — the **Client Signature** image and the receiver's name and **Civil Number**.

So the **Postal Parcels Sort**, which has those fields, is the natural document for both.

### The task queue

Every queued event is visible in **Freight Management System → Settings → IPS Integration Tasks**.
Each row is one call to IPS:

| Column | Meaning |
|---|---|
| **Document #** | The document that queued the task. |
| **Mail Item Or Receptacle Id** | Which item it is about. |
| **Task Type** | **Update Mail Item State** or **Update Receptacle State**. |
| **Status** | **Initial** while waiting, **Executed** once IPS accepted it, **Failed** when it was refused or could not be delivered. |
| **Last Shipment Status** | The outcome of the latest task for the same item, repeated on all of that item's rows — handy for filtering items whose last report failed. |
| **Trials** | How many times it has been attempted. |
| **Error Message** / **Error Desciption** | Why it failed — IPS's own error when it answered with one. |
| **Request JSON** / **Response JSON** | Exactly what was sent and what came back. |
| **Submition Date**, **Execution Date**, **Requester** | When it was queued, when it ran, and by whom. |

A task that fails is marked **Failed** straight away. It is **not** retried by itself — it waits for
someone to resend it.

### Resending

From the task list, **More** menu:

- **Retry Selected** — puts the selected failed tasks back in the queue. The request is rebuilt from
  the document as it is now, so a corrected document sends corrected data.
- **Delete Selected IPS Tasks** — removes the selected rows.
- **Delete Executed IPS Tasks** — clears every executed task, to keep the list short. It runs in
  batches and is safe on a large list.

From the document itself — and from the list view of each of the nine postal documents above —
**More** menu:

- **Resend Failed IPS Tasks Only** — requeues only the document's failed tasks.
- **Resend IPS Events** — queues a fresh event for **every** line of the document, whatever
  happened before. Use it when IPS lost the events, or after you changed the term's event. Use it
  carefully: IPS receives the event a second time for items that were already reported.

::: tip Reading a failure
Open the failed row and read **Error Message** first; it usually names the problem — an unknown
event code, an item IPS does not know, an office code it rejects. Fix the master file or the
document, then **Retry Selected**. If every task fails with a connection error, check **IPS URL**
and **IPS Token**.
:::

## Reporting from any document

The events above are tied to the postal documents' terms. To report an event from some other
document — a delivery document, a custom form — use the entity action **EAKWSendIPSEvents** in an
Entity Flow. It reads a detail grid you name, takes the mail item number from a field you name, and
queues an **Update Mail Item State** task for each line with the event code and office codes you
pass as parameters. It obeys the same settings — **Do Not Send IPS Documents Events To IPS** and
the prefix filter — and its tasks appear in the same list. Its parameters are documented on
[EAKWSendIPSEvents](/entity-flows/frm/EAKWSendIPSEvents).
