---
description: "Item add-ons at the POS: the POS Item Additional Items setup that offers up to ten groups of choices when an item is added, with single or multiple, required and default choices."
entities: [NamaPosItemAdditionalItems]
menu: Point of sale → Settings → POS Item Additional Items
---

# Item Add-ons

Some items are not sold plain. A coffee comes with choices of milk and sugar; a shirt comes in sizes and colours; a meal comes with extras. **Add-ons** let the cashier capture those choices when the item is added, so the order — and the kitchen ticket — is exactly what the customer asked for.

## How it works at the counter

When you add an item that has add-ons configured, the **add-ons dialog** opens automatically. It presents the choices in tidy, titled groups, and you tap your way through before confirming the item onto the invoice.

![Add-ons dialog](../../ar/modules/pos/images/addons/pos-addons-dialog-en.png)

An item can have up to **ten groups** of add-ons, each with its own title in the POS — "Milk", "Sugar", "Extras", "Sauce", whatever fits. For each group your business decides:

- **Single or multiple choice** — pick exactly one (like a size) or several (like toppings).
- **Required or optional** — a required group must be answered before you can confirm. Try to skip it and the dialog stops you.
- **A default choice** — a group can come pre-selected with the most common option, so the cashier only changes it when the customer asks for something different.
- **Search and browse buttons** — for groups with many options, so a long list stays manageable.

![Required add-on prompt](../../ar/modules/pos/images/addons/pos-addons-required-en.png)

## Sizes, colours and revisions

Beyond free-form groups, an item can also offer its built-in **sizes**, **colours**, and **revisions** (variants) as choices in the same dialog. Each can be shown by name, by code, or both, and in the order your business prefers. This is how a clothing store rings up "blue, medium" or a workshop picks the right variant of a part.

![Sizes and colours](../../ar/modules/pos/images/addons/pos-addons-sizes-colors-en.png)

## A note on free items

Add-ons are about **choices** on an item you are selling. They are different from **free items** — the "buy one, get one free" kind of promotion — which have their own behaviour around when the free line appears and how it is reconciled at payment. That is covered separately in [Free items in POS](./pos-free-items-claim-and-reconciliation.md).

::: tip Keep groups sensible
A few well-named groups beat a dozen crowded ones. Put the common extras first, make only the genuinely essential groups required, and turn on the search button only where a group is long enough to need it — the cashier will thank you on a busy night.
:::
