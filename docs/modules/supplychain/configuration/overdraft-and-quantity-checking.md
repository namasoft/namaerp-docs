---
description: "The Overdraft & Quantity Checking tab: when stock may go negative, the immediate and by-date balance checks, the overdraft policy and the document and term switches, manufacturing and assembly exceptions, reservation, and the messages shown."
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Overdraft & Quantity Checking Configuration

This page documents the **Overdraft & Quantity Checking** tab. "Overdraft" means letting stock go negative — issuing or selling more than is on hand. These settings decide whether that is allowed, where, and how strictly the system enforces it.

::: info How the check works
Two checks can run when a stock document is saved. A document kept as a draft is not checked; the check runs when it is saved for real. The **immediate balance check** compares the item's total in against its total out and fails if you issue more than is available. The **by-date check** replays the item's movements in date order and makes sure the balance never goes negative at any point in time.

Whether a line is subject to these checks is decided by an overdraft policy, evaluated in this order:

1. The item's **Allow Overdraft In Reservation** (on the item's configuration). When it is ticked, the item may go negative in every document except a Stock Issue, a Stock Receipt and the three stock-transfer documents (Stock Transfer, Issue Stock Transfer, Receipt Stock Transfer). Those five, and every document for an item where it is clear, move on to step 2.
2. The matching row in *Dimensions With Allowed Overdraft* (ignored for stock transfers).
3. The item's own **Over Draft Policy**. **Yes** allows, **No** blocks, and an empty policy counts as **No**. Only **Inherited** passes the decision on.
4. The item section's policy, when the item has a section. Here too an empty policy counts as **No**, and only **Inherited** passes it on.
5. The global **Over Draft Policy** below.

So an item whose policy is **No** is blocked on its own (unless step 1 lets it through); nothing on the document term is needed for that.
:::

![The Overdraft & Quantity Checking tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-overdraft-and-quantity-checking-en.png)

## Switches on the document and its term

Three switches outside this tab change the outcome for individual documents:

- **Prevent Overdraft** on the document term works only in the strict direction. When it is on, every line of the term's documents is checked even if its item, section, dimensions row or the global policy allows overdraft. When it is off, the policy above decides. Turning it off never lets a document through that the policy blocks.
- **Do Not Check Overdraft** on the document header skips the check for the whole document.
- **Allow Overdraft** on a document line leaves that line out of the check. If every line has it on, the document is not checked at all.

Some documents that the system generates from another document skip the check — the material issue created by an assembly document and the documents created when a stock taking is ended, for example. Records received through replication are not checked either.

## Overdraft Policy

**Over Draft Policy** `value.overDraftPolicy` — The company-wide fallback answer to "may stock go negative?". It is consulted only when the item's policy is **Inherited** and the item either has no section or its section's policy is also **Inherited**. An empty item or section policy does not reach it — it counts as **No**. Leaving this global policy itself empty allows overdraft. Set it to **No** as a safety default if most items should never be oversold and overdraft should be allowed only selectively; leave it **Yes** if your business routinely issues before receiving.

**Allow Creating Closing Entry if Negative Stock Balance Found** `value.allowClosingIfNegativeBalanceFound` — Governs the year-end / period-closing entry. When off, the system blocks closing if any item has a negative balance as of the period end (forcing you to fix negatives first). Turn on only if you deliberately close with negative balances.

**Do Not Check Overdraft with Recommit** `value.doNotCheckOverdraftWithRecommit` — When on, documents that were already committed and are being **automatically re-processed** skip the overdraft error, avoiding spurious failures during batch recomputation of documents that were valid when first saved.

**Max Days Count / Max Unprocessed Documents Count to Prevent Saving Stock Documents** `value.maxDaysCountToPreventSaveStockDocs` / `value.maxUnProcessedDocsCountToPreventSaveStockDocs` — A paired guard against a processing backlog. If a document is older than the *days* value **and** the number of stock documents still awaiting cost processing exceeds the *count* value, the save is blocked. Both must be set for the guard to activate; use them to stop users back-dating new stock documents while a large processing backlog exists.

## Allow Overdraft in Manufacturing & Assembly

By default, issues generated from manufacturing, assembly/processing, and stock transfers are **never** allowed to go negative — even when the item's own policy would permit it. The switches below relax that, each strictly for one kind of document.

::: danger Very dangerous — do not enable casually
These options are flagged as critical: turning one on triggers a confirmation prompt. Enabling them lets production/transfer documents create negative stock, which can distort costs. Enable only when you must record production or movement before the matching materials/receipts are in stock, and you accept temporary negatives.
:::

**Allow Overdraft in Manufacturing Issues** `value.allowOverdraftInManufacturingIssues` — Lets stock issues generated from a manufacturing raw-material issue fall back to the normal item policy instead of being forced non-negative.

**Allow Overdraft in Stock Transfers** `value.allowOverdraftInStockTransfers` — The same relaxation for stock transfers, and also for stock issues generated from an **Assembly Document**, an **Aggregated Packaging Document** or a **Processing Document** — this is the switch that governs those issues, despite its name.

**Dimensions with Allowed Overdraft** `value.dimensionsWithAllowedOverdraft` *(table)* — A per-line override of the overdraft policy by **warehouse**, **locator** and generic dimensions (sector / branch / department / analysis set / legal entity). Each row has a **policy** column (Allowed / Not Allowed) that wins over the item/section/global setting when a document line matches it — for example, to allow negative stock only in a transit warehouse. Not applied to real transfer documents.

## Quantity Check by Date

These settings tune the date-aware overdraft check — the one that guarantees the timeline never goes negative, which matters when documents are entered out of date order.

**Check Overdraft by Date** `value.checkOverdraftByDate` *(default on)* — Turns on the date-aware check. When saving, the system replays each item's movements chronologically and refuses to let the running balance go negative at any historical point, not just at the final total. Turn off only for performance when back-dating never happens.

With it off, only the immediate balance check runs, and that check does not look at dates at all: it compares the item's total in against its total out across every movement entered so far, including receipts dated **after** the document being saved. A back-dated issue therefore passes as long as a later receipt already covers it, and the stock balance on the issue's own date — the one reports show — goes negative until that later receipt. Seeing negative balances in a date-ordered report with this option off is expected behaviour, not a failure of the overdraft policy.

**How Many Later Transactions to Check** `value.checkOverdraftNextTransCount` *(default 10)* — On screen the option is spelled out as a question — "How many transactions should the system make sure did not go overdraft" — so search for that wording when hunting for it on the tab. After validating the current document, the system also re-checks this many *later* transactions for the item to make sure inserting/editing this document doesn't push a future document negative. Increase for tighter guarantees on heavily back-dated data; set to 0 to disable the look-ahead.

**Include Reservation in Check Overdraft by Date** `value.includeReservationInCheckOverdraftByDate` — When on, the by-date balance also accounts for reserved quantities as of the document date, so reservations count toward availability on that date.

**Do Not Check Overdraft by Date for Reservation** `value.doNotCheckOverdraftByDateForReservation` — When on, the by-date check is skipped for reservation documents (useful if reservations may be made even when stock isn't available on that exact date, while issues stay strictly checked).

**Check Overdraft by Date Only** `value.checkQtyByDateOnly` — When on, only the by-date check runs and the simpler immediate balance check is skipped. This is what allows *ignoring dimensions* (for example warehouse) in the check, since that relaxation applies only to the by-date path.

**Check Overdraft by Date Only with Reservation** `value.checkQtyByDateOnlyWithReservation` — Overrides the option above specifically for reservation requests: **Yes** forces by-date-only, **No** forces both checks, **Like Quantities** follows whatever *Check Overdraft by Date Only* is set to. Use it when reservations and actual issues need different strictness.

**Enable Check Qty In Reservations By Date For Warehouses / For Locators** `value.enableIgnoreInReservationQtyCheckByDateForWarehouses` / `value.enableIgnoreInReservationQtyCheckByDateForLocators` — Read the labels carefully: they say "enable check", but what they actually enable is the ability to *skip* the check. These are the master switches that let **individual** warehouses or locators be **excluded** from the reservation by-date check — switch one on here, then tick the matching flag on the warehouse or locator itself. Use it when certain locations — quarantine, transit, a damaged-goods bay — should not count toward reservation availability. See the dedicated guide [Ignoring Specific Warehouses/Locators in Reservation Quantity Check by Date](../ignore-reservation-qty-check-by-date.md).

**Ignore Settings with Reservation** `value.reservationSettings` — Decides which "ignore dimensions" set reservations use: **Like Quantities** reuses the normal set below; **Separate** uses the dedicated reservation set, so reservations can ignore a different combination of dimensions than actual issues.

**Do Not Repeat Serial Number in More Than One Item** `value.doNotRepeatSerialNumberInMoreThanOneItem` — When on, a serial number may belong to only one item across the whole system; entering a serial already registered to a different item fails. Enable when serials are globally unique across your catalog.

**Do Not Consider the Following Dimensions in Overdraft by Date** `value.doNotConsiderDimensionsInOverdraftByDate` — A set of fourteen toggles: Warehouse, Locator, Branch, Department, Sector, Analysis Set, Revision, Size, Color, Lot, Box, Active %, Inactive % and Sub-Item. Each one you switch on is *dropped* from the by-date balance, so quantities are pooled across it rather than checked separately — for example, ignoring Warehouse judges overdraft on total company stock by date instead of per warehouse. Takes effect together with the by-date-only path.

**Do Not Consider Dimensions in Overdraft by Date with Reservation** `value.doNotConsiderDimensionsInOverdraftByDateWithReservation` — The reservation-specific version of the toggle set above, used only when *Ignore Settings with Reservation* is **Separate**.

## Reservation

**Transfer Request Reserve Quantity Out Only** `value.transReqReserveQtyOutOnly` *(default on)* — Controls how a stock transfer request reserves stock. On, it reserves only the outgoing side at the source; off, it reserves both source (out) and destination (in).

**Cancel Reservation of Direct Parent Only** `value.cancelReservationOfDirectParentsOnly` *(on in newly created databases)* — When a document cancels upstream reservations (via the document term's "cancel reservation" option), this limits the cascade: on, only the direct parent's reservation is released; off, the cancellation also cascades to further-related documents.

**Check Quantities in Reservation Documents** `value.checkQtiesInReservationDocs` *(default on)* — Whether reservation documents are subject to quantity/overdraft validation at all. On, you cannot reserve more than is available; off, reservation requests can reserve any quantity (e.g. soft holds / forecasting).

**Update Reservation Quantity with Prime Quantity Change** `value.updateReservationQtyWithPrimeQtyChange` — When on, editing the main quantity on a sales-order/invoice line automatically updates the reserved quantity to match, keeping reservations in sync with line edits.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Insufficient quantity for item {0} {1},Available Quantity is {2}, Reserved quantity is {3}* — «الكمية من الصنف {0} {1} لا تكفي. الكمية المتاحه {2} . الكميه المحجوزه {3}» | The immediate balance check: the line issues more than is on hand right now, once reservations are set aside. | Reduce the quantity, receive the stock first, or allow overdraft for the item, its section or the dimensions row. |
| *Insufficient quantity for item {0} {1},Available Quantity on Date {2}, time {3} is {4}* — «الكمية من الصنف {0} {1} لا تكفي , الكمية المتاحة في تاريخ {2} - الساعة {3} كانت: {4}» | The by-date check: the balance was not enough **at that moment in the past**, even if it is enough today. The message gives the date, the time and the balance as it stood. | Check what the document is back-dated to. Either move the date after the receipt, or turn the by-date check off for this case. |
| *Insufficient quantity for item {0} {1},Available Quantity on Date {2}, time {3} is {4} and the document {5} will lead to overdraft* — «الكمية من الصنف {0} {1} لا تكفي , الكمية المتاحة في تاريخ {2} - الساعة {3} كانت: {4}  المستند {5} سيؤدي الي كميات مكشوفة» | The same by-date check, but the negative appears on a **later** document — the one named in the message — rather than on the one you are saving. | Look at the named document. Inserting stock movements in the past is what pushes a later document negative. |
| *Cannot commit document {0} on date {1} because there are {2} documents not processed* — «لا يمكن حفظ المستند {0} في التاريخ {1} لوجود عدد مستندات {2} لم تتم معالجة تكاليفهم» | The backlog guard described above: the document is older than **Max Days Count** *and* more than **Max Unprocessed Documents Count** stock documents are still waiting for cost processing. | Let the backlog clear, or save the document with today's date. Both settings must be filled for this guard to fire at all. |
| *Negative balance for item {0} - quantity {1} on date {2}* — «رصيد بالسالب للصنف {0} - كمية {1} في التاريخ {2}» | A closing entry was attempted while an item stands negative at the period end, and **Allow Creating Closing Entry if Negative Stock Balance Found** is off. | Fix the negative — usually a missing receipt — or turn that option on if you accept closing with negatives. |
| *Allow overdraft can only be used with Stock or Assembly items* — «لا يمكن استعمال السماح بالسحب علي المكشوف إلا مع الأصناف المخزنية أو المجمعة» | An overdraft policy was set on an item that holds no stock, such as a service item. | Leave the policy empty on those items. |
