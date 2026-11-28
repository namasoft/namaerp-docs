---
description: "How Bank Reconciliation matches a bank statement against your bank account transactions in three steps, how unmatched lines become entries, and how it differs from subsidiary reconciliation; the document itself has no accounting effect."
entities: [BankReconciliation]
menu: Banks → Cheques → Bank Reconciliation
---

# Bank Reconciliation

Your bank balance in your books rarely matches the bank statement moment for moment: a cheque you deposited isn't yet collected, a fee the bank deducted you haven't recorded yet, a transfer in transit. **Bank Reconciliation** (`Banks > Cheques > Bank Reconciliation`) is the systematic process that places the bank statement next to your transactions, matches what matches, and surfaces the differences so they can be handled.

::: info Required license
Bank reconciliation is part of the banks license `accounting-banks`.
:::

::: warning Reconciliation creates no journal entry by itself
The bank reconciliation document produces **no accounting effect**; it's a comparison and difference-detection process only. The differences it finds (fees, interest...) are then recorded via a [bank adjustment](./banks-and-bank-accounts.md) or the appropriate document. Don't confuse "reconciliation" (comparison) with "adjustment" (an entry).
:::

## The three-step workflow

The document moves through a **reconciliation step** in three stages:

1. **Collect Data** — you specify the **bank account** and a date range, and the system gathers your transactions (system lines) and imports the bank statement (bank/subsidiary lines).
2. **Reconciliation** — you match the bank-statement lines against your transaction lines (manually or by matching rules on the reference/narration), within the **Max. Tolerated Value** and the **Allowed Difference In Date**. The system shows the **system total**, the **subsidiary total**, the **unmatched lines** on both sides, and the **total difference**.
3. **Finished** — the document is closed once matching is complete. A document on this step cannot be saved while either unmatched grid still has lines; the save is refused with *UnMatched Lines should be empty* (this message has no Arabic text).

![The Bank Reconciliation screen](../../../ar/modules/accounting/images/banks/bank-reconciliation-en.png)

Each document links to the **Previous Reconciliation**, so it continues where the last one ended and locks its past: saving a document that names a previous reconciliation ticks **Restrict Edit** on that previous document, which can then no longer be saved. Deleting the later document unlocks it.

## Turning an unmatched line into an entry

Most unmatched lines are the bank's own movements — a charge, an interest credit, a transfer fee — that nobody has recorded in your books yet. You do not have to leave the screen to record them.

Standing on the **Reconciliation** step, select the row in the **Unmatched Bank Lines** grid and press **Create Journal Entry**. A new journal entry opens in a popup already carrying that line: the line's value date, the fiscal year and period worked out from it, and one entry line holding the line's account, the bank account as its subsidiary, and the line's debit or credit amount.

You complete the other side of the entry, then save it. That is what actually records the difference — the reconciliation itself still creates no journal entry, and the entry you have just created is an ordinary journal entry with its own life. Collect the data again afterwards and the newly recorded movement is there to match against.

::: tip The button only works mid-reconciliation
It needs the document to be on the **Reconciliation** step with a row selected. On the Collect Data or Finished step it opens nothing and answers:
*You must be in reconcilation step* — «يجب أن تكون في مرحلة التسوية»
:::

## The buttons that drive the three steps

Each step of the workflow is a button, and the reason a reconciliation "does nothing" is nearly always that the document is on the wrong step for the button being pressed.

**On the Collect Data step:**

- **Collect Data** — the button behind step 1. With the **bank account**, the ledger **account** and the from/to dates set, it pulls your side into the **system lines** grid, continuing from the previous reconciliation.
- **Import Bank Lines** — loads the bank's own statement from a file. Attach the file and fill the **Bank** field first; if either is missing it refuses with *Attachment and Bank name must be filled* — «يجب اختيار ملف و اسم البنك». **Import Subsidiary Lines** does the same for the other grid. The **Bank** field holds the name of a formula that describes the file's columns, written once in the accounting configuration — see [Reconciliation import formulas](../support/accounting-configuration.md#Reconciliation-import-formulas).
- **Update System lines of previous document** — refreshes the system lines that were carried over from the previous reconciliation, so movements that changed since it was closed show their current figures. It works only on this step.

**On the Reconciliation step:**

- **Automatic Match** — runs the matching engine across both grids on its own, honouring the **Max. Tolerated Value**, the **Allowed Difference In Date** and the **Narration Match Sequence**, and matching from whichever side **Match from Bank Lines** points at. This is what clears the bulk of the lines.
- **Manual Match** — the same engine, but it pairs only what you have set up rather than searching freely. Use it for the lines automatic matching left behind.
- **Match** — applies the pairings you typed into the unmatched grids: fill a row's **Matched with** (or **Reverse Ledger For**) column, press it, and those rows are matched and drop out of the unmatched lists.
- **Create Journal Entry** — records an unmatched line as an entry; described in full under *Turning an unmatched line into an entry* above.

**Any time:**

- **Calculate Totals** — recomputes the system and subsidiary totals, the unmatched totals on both sides, and the total difference from the grids as they currently stand. Press it after a round of matching to see where you are.

**Automatic Match**, **Manual Match** and **Match** all require the **Reconciliation** step; on Collect Data or Finished they do nothing and answer *Step must be Reconciliation* — «المرحلة يجب أن تكون تسوية».

## Difference from subsidiary reconciliation

The same reconciliation idea applies to customers and suppliers via **Subsidiary Reconciliation** (`Accounting > Reconciliations > Subsidiary Reconciliation`): it matches the party's balance in your books against their external statement using the same three-step workflow, and chains the documents historically. The only difference is the nature of the party: a bank account here, a customer/supplier there.

## For Support

- **"The reconciliation didn't move the bank balance"** — that's correct; reconciliation creates no journal entry. Record the differences yourself: **Create Journal Entry** from the unmatched line is the quickest route, or use a bank adjustment.
- **"Many lines won't match even though they actually match"** — review the **Max. Tolerated Value**, the **Allowed Difference In Date**, and the **Narration Match Sequence**.
- **"I can't edit an old document"** — a later document names it as its **Previous Reconciliation**, which ticked **Restrict Edit** on it; the save is refused with *Cannot edit Document because it is restricted edit* — «لا يمكن حفظ المستند بعد أن تم منع التعديل عليه». This is expected, to preserve the reconciliation sequence.
