---
entities: [IPSReceptaclesReceipt, IPSManifestForCustody, IPSTransferReceptacles]
---
# Receptacles

A receptacle is the transport container that gathers several mail items for movement between offices — a sealed bag or box. Before you deal with individual items, you deal with receptacles: you receive them, clear them through customs, and dispatch them onward. The documents for this stage are found under **Freight Management System → Documents**.

All receptacle documents share a header carrying **Received From** and **Received In**, and the total item count and receptacle weight.

## Receptacles Receipt

The entry point for inbound mail. When receptacles arrive from abroad, this document records every receptacle with its data:

- **Receptacle ID**, **Seal No**, and **Dispatch ID**.
- **Mail subclass** and country of origin.
- **Number of items inside the receptacle**, and its **declared (IPS)** weight versus the **actual weight**, with the **weight difference** computed automatically.
- The **Action Type** that defines the nature of the receipt operation.

The document also totals the **actual weight total** and the **overall weight variance** for customs reconciliation.

![Receptacles receipt](../../ar/modules/freight/images/ips/receptacles-receipt-en.png)

::: info Weight difference is an important indicator
Comparing the declared weight in the dispatch documents against the actual weight at receipt reveals shortages or tampering early. The system computes the difference at the level of a single receptacle and at the level of the whole document.
:::

## Manifest for Custody

To clear items subject to customs control, this document gathers the mail items into a manifest presented to customs. It carries the items' data (classes, HS codes, values, countries of origin) in a form that matches the requirements for customs release of inbound mail.

## Transfer Receptacles

The reverse of receipt: to dispatch outbound receptacles onward. It records the dispatched receptacles with their seal numbers, IPS weights and item counts, and the **Car** and **Driver** that carry them, completing the tracking of a receptacle from the moment it's received until it leaves the network.

## How receptacles connect to items

The relationship is simple and gradual: **Receptacles Receipt** brings the sealed receptacles into the network → when opened, the [Mail Item Manifest](./ips-mail-items.md) records the individual items inside → and from there the [mail item's](./ips-mail-items.md) journey begins toward transfer, sorting, and [delivery](./ips-delivery.md). This is how the work moves from the transport unit (the receptacle) to the delivery unit (the item).

## Reading from and reporting to IPS

On the **Receptacles Receipt**, typing a **Receptacles Id** fills the line's IPS weight, seal number,
item count, mail subclass, dispatch id and origin country from the external IPS server. When the Receptacles Receipt or the
Transfer Receptacles is first saved, it reports the event set on its term for every receptacle on
it; the **More** menu has **Resend IPS Events** and **Resend Failed IPS Tasks Only** for when that
failed. The Manifest for Custody reports for every mail item instead. See
[IPS Integration](./ips-integration.md) and [Freight Document Terms](./freight-document-terms.md#The-postal-movement-terms).
