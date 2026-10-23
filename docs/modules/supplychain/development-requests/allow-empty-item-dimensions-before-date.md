---
description: "Development request SRDRQ06261: the per-dimension cut-off date on Item Configurations that lets items tracked by batch, serial or other dimensions keep moving untagged stock dated before it."
entities: [ItemConfigurations]
menu: Inventory → Settings → Item Configurations
---
# Allowing Items With Batch & Expiry to Hold Untagged Quantities

*Development Request: **SRDRQ06261** (Dar Al-Emirate Trading Company)*

## The Problem

Imagine a client who has been running their business for years, storing medicines or food items, and only now decides they want to start tracking batch numbers and expiry dates. The moment they switch an item to "track by batch," the system starts demanding a batch number on **every** transaction — including the stock that was already sitting in the warehouse long before anyone thought about batches.

That old stock has no batch number. It never did. But the warehouse staff still need to move it, issue it, and sell it. Forcing them to invent fake batch numbers for historical quantities is both wrong and painful, and it blocks the very thing the client was trying to do: start tracking properly *from now on*.

The request is simple to state: **let an item carry both kinds of stock at the same time** — quantities that are tagged with a batch (or serial, size, color, …) and quantities that are not — and stop forcing a batch number when untagged stock is what's actually being moved.

## The Idea: A Cut-Off Date Per Dimension

The solution is built around a single, intuitive idea: **a date before which empty values are acceptable.**

You pick a date — typically the day you started tracking properly. Anything dated on or before that date is allowed to have an empty value for the tracking dimension. Anything after it must be filled in, exactly as before. This way the client draws a clean line in time: "everything from here forward is tracked; everything before it can stay as it was."

This control lives on the item's configuration, and it is set **per tracking dimension**. Batch (lot), serial number, revision, size, color, measures, packaging, the active/inactive percentages, and sub-item each have their own setting, so you can relax the rule for batch numbers while still strictly requiring, say, serial numbers.

### The Two Settings

On each tracking dimension in the item configuration you'll find two new fields:

- **Allow Empty Values Before Date** — the cut-off date. When set, documents dated on or before this date may leave this dimension empty even though the item normally requires it. Leave it blank and nothing changes; the dimension stays mandatory as always.
- **Allow Admin To Receipt With Empty Value** — a stricter switch that governs *incoming* stock (see below).

::: warning These are sensitive settings
Both fields are treated as **critical (dangerous) fields**. Turning them on, or changing the cut-off date, requires the appropriate privilege and is recorded as a critical-field change. They directly affect what the system will and won't accept on inventory documents, so they're not meant to be flipped casually on a live database.
:::

## How It Behaves in Practice

The key distinction the feature draws is between stock **leaving or moving** and stock **being created**.

### Issuing and Transferring Untagged Stock

When you issue stock, transfer it between warehouses, use it in assembly or production, or count it during stock-taking, the system will accept an empty batch number — as long as the document date is on or before the cut-off and there is genuinely untagged stock to draw from.

This is the everyday case the client cares about: moving the old, unlabeled quantities without friction. The untagged stock is kept in its own bucket (a balance with no batch, no expiry), separate from the batched stock, and these documents simply draw from that bucket. If the untagged stock runs out, there is nothing left to issue without a batch — at that point the normal rules apply again.

### Receiving Stock — Stricter by Design

Receiving is different, because a **Stock Receipt is the document that actually creates supply** — it brings new quantity into existence in the warehouse. If the system let anyone receive stock with no batch number, you'd be manufacturing new untagged inventory at will, which defeats the purpose of tracking in the first place.

So receipts are gated more tightly. A Stock Receipt will only accept an empty batch when **both**:

1. **Allow Admin To Receipt With Empty Value** is enabled for that dimension, and
2. the person doing it is an **administrator** (or is treated as one).

In other words, ordinary users can move and issue the historical untagged stock freely, but creating brand-new untagged stock is reserved for an administrator who has explicitly opted in. This keeps the door open for the genuine one-time corrections an admin might need to make, while keeping it shut for day-to-day receiving.

## Why It's Safe for Everyone Else

A natural worry with a change like this is whether it disturbs clients who never asked for it. It doesn't. The whole behavior is dormant unless you set a cut-off date on a dimension. With no cut-off date configured, every tracking dimension stays exactly as mandatory as it always was, and the system behaves identically to before.

Under the hood, the inventory and costing engine now keeps untagged quantities in their own properly-keyed bucket rather than lumping them in with an arbitrary batch, so on-hand balances and cost calculations stay correct whether stock is tagged or not. The tagged and untagged quantities of the same item coexist cleanly, each tracked on its own.

## In Short

| | Untagged stock allowed? |
|---|---|
| Issue / Transfer / Assembly / Stock-taking, dated ≤ cut-off | Yes, if untagged stock exists |
| Stock Receipt (creates supply), dated ≤ cut-off | Only for an admin, and only when the admin-receipt switch is on |
| Any document dated after the cut-off | No — the dimension is mandatory again |
| Dimension with no cut-off date set | No change — mandatory as always |

This gives clients a clean, dated migration path into batch and expiry tracking: keep the old quantities moving without fuss, start every new receipt properly tracked, and reserve the creation of untagged stock for a deliberate administrator action.
