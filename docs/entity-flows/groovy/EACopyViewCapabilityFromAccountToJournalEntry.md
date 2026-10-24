---
title: Hide Entries and Vouchers Behind Their Account's View Capability
module: accounting
entities: [EntityFlow, JournalEntry, ReceiptVoucher, PaymentVoucher]
groovy: recommended
description: Two Groovy scripts that give a journal entry, or a receipt or payment voucher, the View Capability of the first account on its lines, so only users allowed to see that account can open the document.
---

<div class='entity-flows'>

# Hide Entries and Vouchers Behind Their Account's View Capability

These two Groovy scripts give a document the **View Capability** of the account it debits or credits. One works on journal entries, the other on receipt and payment vouchers. Once the document carries the capability, only users who hold it can open the document.

::: tip Recommended pattern
These scripts are not tied to any customer's setup. You can paste them as they are; they take no parameters.
:::

| | |
|---|---|
| **Class names** | `EACopyViewCapabilityFromAccountToJournalEntry` (journal entry) and `EACopyViewCapabilityFromAccountToRVPV` (receipt and payment vouchers) |
| **Scripts** | [EACopyViewCapabilityFromAccountToJournalEntry.groovy](/groovy-examples/EACopyViewCapabilityFromAccountToJournalEntry.groovy), [EACopyViewCapabilityFromAccountToRVPV.groovy](/groovy-examples/EACopyViewCapabilityFromAccountToRVPV.groovy) |
| **Runs on** | Journal Entry, or Receipt Voucher and Payment Voucher, on **Update Calculated Fields** |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A capability on an account protects the account itself, but not the documents that debit or credit it. Suppose the board's expense account carries the View Capability *Board Confidential*. Anybody who can open journal entries can still open the entry that charged a board trip to that account, and read the amount and the narration.

With this script on the journal entry, the entry takes the account's capability when it is saved. Users without *Board Confidential* are then refused the entry itself, exactly as if someone had set its **View Capability** by hand through **More → Change Capabilities**. How capabilities are held and checked is explained in [Users Counter and Capability Types](/admin/users-counter-and-security-capabilities#Locking-one-record-with-a-capability).

## How it works

1. **It reads the lines in order.** For each line it looks at the line's account.
2. **It stops at the first account with a View Capability.** That capability is copied into the document's own **View Capability**, and the remaining lines are not looked at.
3. **Otherwise it changes nothing.** When no line's account has a View Capability, the document keeps whatever View Capability it already had.

So the order of the lines matters when several accounts carry different capabilities: the first one wins. The script copies the View Capability only. The document's **Update Capability** and **Usage Capability** are not touched.

## Setting it up

1. Give the account a View Capability: open the account and use **More → Change Capabilities**.
2. Open **Administration → Display Customization → Entity Flow** and create a new flow with **Target Type** set to **Journal Entry**.
3. Add a line to the **Details** grid with **Target Action** set to **Update Calculated Fields**. Paste the whole journal-entry script into **Groovy Script**, and leave **Class Name** empty: it is filled in when you save.
4. Save the flow. **Class Name** shows the script's class name, and the description appears in **Description**.
5. For vouchers, create a second flow in the same way with **Target Type** set to **Payment Voucher** (or **Receipt Voucher**, or an **Entity Type List** holding both), and paste the voucher script instead.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

## Example

A payment voucher has three lines:

| Line | Account | Account's View Capability |
|---|---|---|
| 1 | Accounts payable | none |
| 2 | Board travel expenses | *Board Confidential* |
| 3 | Accounts payable | none |

The first line's account has no capability, so the script moves on. The second line's account has one, so the voucher is saved with **View Capability** *Board Confidential*.

## The scripts

The journal-entry script:

<<< @/public/groovy-examples/EACopyViewCapabilityFromAccountToJournalEntry.groovy{groovy}

The receipt and payment voucher script:

<<< @/public/groovy-examples/EACopyViewCapabilityFromAccountToRVPV.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Users Counter and Capability Types](/admin/users-counter-and-security-capabilities)
- [Journal Entries & Adjustments](/modules/accounting/ledger-setup/journal-entries)
- [Receipt & Payment Vouchers](/modules/accounting/money-in-and-out/receipts-and-payments)

</div>
