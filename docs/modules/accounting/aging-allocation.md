---
description: "The Aging Allocation document: manually matching a party's open debit and credit items so debt-age reports are right, the steps on the screen, what saving does, and reading matches for custom aging reports."
entities: [AgingAllocation]
menu: Banks → Master Files → Aging Allocation
---

# Aging Allocation

A debt-age report answers one question: how old is this balance? To answer it the system has to know
which receipt paid which invoice — not just that a customer owes 40,000 and has paid 25,000, but that
the 25,000 settled January's invoices and the 15,000 still open is from March. Every debit and credit
on an account that is marked **Track Debt Ages** produces an open item, and the system spends its time
matching those items against each other.

Most of that matching happens by itself. A receipt voucher entered against a customer is matched to
that customer's oldest open invoices, and nobody has to think about it. But not every case is
machine-decidable. A customer pays a round 50,000 against six invoices and expects it applied to the
three the sales manager agreed on. A supplier's payment was captured before the invoice was entered,
so at the time there was nothing to match. Some installations switch automatic matching off
altogether — the **Never Automatically Match Debt Ages** setting on
[the accounting tab of Global Configuration](/platform/global-config/global-config-accounting) — because
the accounting team insists on deciding every allocation itself.

That leaves open items on both sides of an account that ought to cancel each other and don't. The
**Aging Allocation** screen is where somebody sits down and pairs them up.

You will find it under **Banks → Master Files → Aging Allocation**. Despite the menu group it is a
document, with a book, a code, a term and a value date like any other, and it needs no licence of its
own.

## The screen in three movements

The screen reads top to bottom as a sequence: say who you are looking at, press a button to see what
is open, tick what belongs together, press a second button, and save.

### 1. Say whose account you are untangling

The header carries four fields that scope the work:

| Field | What it does |
|---|---|
| **Subsidiary** | The party whose open items you want — a customer, a supplier, an employee, a project, a patient, a student. Required; nothing happens without it. |
| **Account** | Optional. Narrows the work to one account. The lookup only offers accounts that genuinely have open items for the subsidiary you chose, so an empty list is itself an answer. |
| **From Date** | Optional. Ignores anything older. |
| **To Date** | Optional. Ignores anything newer; left empty, the system fills in today's date for you when it collects. |

### 2. Collect Data

**Collect Data** goes and finds the open items and fills the two grids beneath it:

- **Debit Transactions** — every debit on that account with an amount still outstanding. For a
  customer these are the sales invoices and debit notes.
- **Credit Transactions** — every credit with an amount still outstanding. For a customer these are
  the receipt vouchers and credit notes.

Both grids arrive **oldest first**, and both carry the same columns: **Selected**, **Document #**,
**Value Date**, **Amount**, **Previously Paid**, **Paid By This Document** and **Remaining**. The value
date and the previously-paid figure are shown for information and cannot be typed over — they are
facts about the document, not about this allocation. *Remaining* is what is left after both what other
documents already settled and what you are about to settle here.

Two things about the search are worth knowing. It is confined to the legal entity you are working in,
and it is confined further by whichever dimensions the installation tracks debt ages on: if debt ages
are tracked by branch, a receipt taken in one branch will not be offered against an invoice raised in
another. That is the same rule that governs automatic matching, so the screen shows you exactly the
pairs the system itself would have considered. And pressing **Collect Data** starts the work over: it
refills both grids and clears any linking you had built up. If nothing is open in the range you get
**"No unmatched transactions found"** and two empty grids.

![Aging Allocation after Collect Data: the customer's open invoices fill the Debit Transactions grid, oldest first](../../ar/modules/accounting/images/banks/aging-allocation-collect-data-en.png)

### 3. Tick, then Link Data

Now the human part. Tick **Selected** on the debit rows and the credit rows that belong together, then
press **Link Data**.

The rule about what you may tick is deliberately narrow: you need at least one row on each side, and
only **one** of the two sides may have several rows ticked. One receipt against five invoices is fine.
Five receipts against one invoice is fine. Five against five is refused — the answer would be
ambiguous, and the screen would rather you were explicit. Where a business genuinely needs the
many-to-many case, the document term carries **Allow Multiple Selection On Both Sides**, and turning it
on lifts the restriction.

Given a valid selection, the screen works out the pairing itself. It takes the credits oldest first,
and among the debits it starts with the ones that need the least to close. Its first pass makes only
the pairs that settle a debit outright, so the money goes to whatever it can actually clear rather
than being spread thin; a second pass then applies whatever is left over as partial payments. Each
pair it produces becomes a row in the **Linking Lines** grid at the bottom:

| Column | What it holds |
|---|---|
| **Debit Document** | The document being settled |
| **Credit Document** | The document doing the settling |
| **Paid Amount** | How much of it this pair accounts for |
| **Debit Remaining** | What is still open on the debit document after this pair |
| **Credit Remaining** | What is still unapplied on the credit document after this pair |

Linking Lines is built by the button and cannot be typed into. When the button finishes it also clears
your ticks and updates **Paid By This Document** and **Remaining** on the two grids above, so the
screen always shows you what is still to be dealt with. That is what makes the screen usable on a
messy account: tick a group, link it, look at what is left, tick the next group, link that too. The
linking lines accumulate.

There is one rule the screen enforces when you save rather than when you link: on every pair, exactly
one of the two documents must be a receipt or payment voucher or a credit or debit note. Pairing two
invoices against each other is not an allocation, and the screen says so, naming the row.

## What saving it does

The allocation is not an accounting document — it writes no journal entry and moves no money. What it
does is record the decision on the document that carries it: the **Invoices** grid of the document on
the credit side of each pair.

That grid is the one you already know from
[receipt and payment vouchers](/modules/accounting/receipts-and-payments) — the tab where a receipt
names the invoices it settles, and which the voucher's own **Collect Vouchers** action fills in when
you are working inside a single voucher. Aging Allocation fills the same grid from the outside: for
each pair it either adds a line naming the debit document, or increases the amount on the line that is
already there. The voucher is then processed again, which is what makes the new allocation show up in
the debt-age reports.

So the two screens are two doors into the same room. **Collect Vouchers** is the door you use while
you have the voucher open and the payment in front of you. **Aging Allocation** is the door you use
when the vouchers are already history and somebody has handed you an account statement that does not
add up.

Editing a saved allocation moves the amounts rather than doubling them: the pairs you removed are
taken back off the vouchers, the pairs you added are applied, and the pairs you left alone stay put.
Cancelling or deleting the allocation takes all of it back off.

::: tip Accounts in a different currency
Where the debt is tracked on an account whose currency is not the one the voucher was written in, the
paid amount is converted using the voucher's own exchange rate before it is recorded. The figure you
typed is in the debt's currency; the figure that lands on the voucher is in the voucher's.
:::

## Writing your own aging report: read the matches, not the remaining figures

Every pairing this screen makes is stored as a match of its own, and each match carries **both** value
dates — the debit document's and the credit document's. Alongside the matches, each open item also
keeps a **remaining** figure: what is still outstanding on it.

That remaining figure is a running total. It is reduced the moment a pairing is made, and it is never
dated. It tells you where the account stands *now*, and only now. A receipt dated in September reduces
the remaining amount on an August invoice, and nothing in the stored figure records that the reduction
belongs to September.

So a report asked for an earlier date cannot use it. Filtering the open items by value date and then
reading their remaining amounts mixes two different dates: the items are as of the date you asked for,
the remaining figures are as of today. What makes this worth a warning is that it fails quietly — the
report still prints, the totals still look like money, and nothing about the numbers says they are
wrong.

A report with an "up to date" parameter has to rebuild the outstanding amount for itself: take each
item's original debit or credit, and subtract only those matches whose **two** value dates both fall on
or before the report date. The system debt-age reports all do exactly this, so the shortest route to a
correct custom report is to copy the pattern from one of them.

::: danger The stored remaining amounts are undated
For anyone writing SQL behind a custom report: `DebtLine.remainingDebit` and `DebtLine.remainingCredit`
are a current-state snapshot and must not be used for an as-of-date report. Derive the figure from
`DebtLineMatcher` instead, filtered on `debitValueDate <= @date AND creditValueDate <= @date`.
`SYSR-ACC024-DebitAge`, `SYSR-ACC025-DebtAgeDocumentsDetails` and `SYSR-ACC045-DebitAgeByInvoice` each
show the pattern.

Watch out for one trap on the way: `SYSR-ACC025` *names* two of its computed columns `remainingDebit`
and `remainingCredit`, but it calculates them from the dated matches rather than reading the stored
columns. Borrowing the names without the calculation behind them is the easiest way to get this wrong.
:::

## Where this fits with everything else

- The **Track Debt Ages** flag on the account is the precondition for any of this. An account without
  it produces no open items at all, so Collect Data will find nothing — see [Accounts](/modules/accounting/accounts).
- The settings that decide how aggressively the system matches on its own, and which dimensions form
  the matching key, are on
  [the accounting tab of Global Configuration](/platform/global-config/global-config-accounting).
- The reports that show the result — debt ages, its document detail, and by invoice — are on
  [Account statements and trial balance](/modules/accounting/reports-account-statements-and-trial-balance).
- When the problem is not a handful of unmatched items but a whole account or a whole period that
  needs rebuilding, that is a job for the administrative
  [ledger and debt-ages reprocessing](/admin/reprocessing/reprocess-ledger-and-debt-ages) tools rather
  than for this screen.
