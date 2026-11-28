---
description: "How Subsidiary Reconciliation compares your books for a customer or supplier with their external statement in three steps, matches what agrees and lists the differences, with no accounting effect."
entities: [SubsidiaryReconciliation]
menu: Accounting → Reconciliations → Subsidiary Reconciliation
---

# Subsidiary Reconciliation

A customer or supplier almost always keeps their own account of your dealings — and it rarely lines up with yours to the penny: an invoice they haven't booked, a payment in transit, a credit note one side recorded and the other didn't. **Subsidiary Reconciliation** is the systematic way to lay your books for a party next to their external statement, match what matches, and surface the differences. It's the customer/supplier twin of [bank reconciliation](../banks-and-cheques/bank-reconciliation.md), using the very same workflow.

::: info Required license
Subsidiary reconciliation is part of the core `accounting` license. Its screen is under **Accounting > Reconciliations**.
:::

::: warning Reconciliation creates no journal entry by itself
The subsidiary reconciliation document produces **no accounting effect**; it's a comparison and difference-detection process only. Any genuine differences it surfaces are corrected with the appropriate document (a credit/debit note, a voucher…) afterwards. "Reconciliation" is comparison, not an entry.
:::

## The three-step workflow

The document moves through a **reconciliation step** in three stages — exactly as bank reconciliation does:

1. **Collect Data** — you specify the **account**, the **subsidiary** (the customer/supplier) and the **From Date** / **To Date** range. The **Collect Data** button gathers your transactions (**system lines**), and **Import Subsidiary Lines** loads the party's statement (**subsidiary lines**) from an attached file.
2. **Reconciliation** — you match the subsidiary lines against your system lines, within the allowed value tolerance (**Max. Tolerated Value**) and date-difference tolerance (**Allowed Difference In Date**), optionally driven by a **narration match sequence** or matching from the subsidiary side. What doesn't match lands in the **unmatched system lines** and **unmatched subsidiary lines** grids, where the real discrepancies become visible.
3. **Finished** — the document is closed once matching is complete.

![The Subsidiary Reconciliation screen](../../../ar/modules/accounting/images/subsrecon/subsidiary-reconciliation-en.png)

Each document links to the **previous reconciliation** for the same party, so it continues where the last one ended and locks the period behind it — a settled period isn't re-reconciled.

## The buttons that drive the three steps

The buttons behave as they do on bank reconciliation, and the same rule applies: a button that "does nothing" is almost always being pressed on the wrong step.

**On the Collect Data step:**

- **Collect Data** — step 1 in a button. With the **account** and the **subsidiary** set, it pulls your books for that party between **From Date** and **To Date** into the **system lines** grid, and carries over the lines left unmatched on the **Previous Reconciliation**.
- **Import Subsidiary Lines** — loads the party's own statement from a file into the **subsidiary lines** grid, limited to **Import From Date** – **Import To Date** when they are filled. Attach the file and choose the import formula first; with either missing the button refuses. The formula field is the second field labelled **Subsidiary** on this screen (the first is the party), and it names a formula written once in the accounting configuration that says how the file's columns are read — see [Reconciliation import formulas](../support/accounting-configuration.md#Reconciliation-import-formulas).

**On the Reconciliation step:**

- **Automatic Match** — runs the matching engine over both grids, honouring the **value tolerance**, the **date-difference tolerance** and the **narration match sequence**, and working from whichever side **match from subsidiary lines** points at. This clears the bulk.
- **Manual Match** — the same engine restricted to the pairings you have set up, for what automatic matching could not resolve.
- **Match** — applies what you typed into the unmatched grids: fill a row's **Matched with** (or **Reverse Ledger For**) column, press it, and those rows are matched and leave the unmatched lists.
- **Create Journal Entry** — opens a new journal entry for the selected line of the **Unmatched Subsidiary Lines** grid, carrying that line's account, value date and amount, ready for you to complete the other side and save. Note that the reconciliation still records nothing itself — the entry does.

## For Support

- **"The reconciliation didn't change the party's balance"** — correct; it creates no journal entry. Record any true difference with the appropriate document (note/voucher) afterwards.
- **"Lines that clearly match aren't matching"** — review the **value tolerance**, the **date-difference tolerance**, and the **narration match sequence**.
- **"I can't edit an old reconciliation"** — it's chained to a later document that locks it, preserving the reconciliation sequence; this is expected.
- **"Which side is which?"** — **system lines** are your books; **subsidiary lines** are the party's external statement.
