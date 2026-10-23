---
description: "The Real Estate sales term shared by sales, initial, opening and purchase contracts, reservations, cancellations, waivers and handovers: its account blocks, income split, tax pairs and switches."
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# Sales Document Terms

Selling a property is not one accounting event. The price is revenue, but not all of it belongs to
this year. The maintenance deposit inside the price is not revenue at all. The brokerage fee the
owner pays and the brokerage fee the buyer pays go to two different places. Penalties and discounts
accumulate over the life of the contract. And in a great many companies none of it may be recognised
until the keys are actually handed over.

The sales term is where all of that is decided. Eight document types share one option set — the
sales contract, the initial (preliminary) contract, the opening sales contract, the reservation, the
reservation cancellation, the waiver, the handover and the purchase contract — so once you have
configured one of them properly, the rest are variations on the same screen.

Read [How Real Estate Document Terms Work](/modules/realestate/document-terms/realestate-terms-basics)
first: the anatomy of an accounting side, the rule that a pair only fires when both halves are
filled, the Confiuration List routing grid and the tax-policy precedence are all explained there and
are not repeated here.

## What the term books, block by block

The heart of a sales term is page 0, titled **Effect** (التأثير). It is a long page, and it is long
because a sales contract's journal entry is assembled from up to a dozen independent blocks, each of
which is only produced when both of its sides are configured.

| Account block | Books |
|---|---|
| Debit / Credit | The contract price |
| Income Debit / Income Credit | Installments falling due inside the document's fiscal year — recognised revenue |
| Advance Income Debit / Advance Income Credit | Installments falling due in later years — deferred income |
| Fees owner debit / Fees owner credit | The brokerage fee (السعي) charged to the owner |
| Fees buyer debit / Fees buyer credit | The brokerage fee charged to the buyer |
| Maintenance Deposit Debit / Credit | The maintenance deposit built into the price |
| Total Penalties - Debit / Credit | The total of the late-payment penalties on the installment lines |
| Total Discounts - Debit / Credit | The total of the discounts on the installment lines |
| Header Discount Debit / Credit | The discount applied to the whole price at header level |
| Pre-Handover debit / Pre-Handover credit | The construction cost already accrued on the estate before it was handed over |
| Tax1 Debit / Tax1 Credit | Tax 1 on the installment lines |
| Tax2 Debit / Tax2 Credit | Tax 2 on the installment lines |

Two more amounts on a sales contract are **not** configured here at all: each line of the Other Fees
grid is booked from its own fee type's accounts, and each commission line is booked from its own
commission type's accounts. Both catalogues are described in
[Fee, Commission, Broker and Expense Catalogues](/modules/realestate/costs/realestate-fee-commission-and-expense-types).

Underneath the account blocks sit the routing grid (Confiuration List) and the term's own tax policy
grid (Legal Entity Taxes), then a group of behavioural switches.

### The income / advance income split

The one block worth dwelling on is the income pair versus the advance income pair, because it is the
mechanism that keeps a long installment plan out of a single year's profit and loss.

Villa B-12 sells on 1 March for 1,200,000 with 240,000 down and 60 monthly installments of 16,000.
When the contract is processed, the system walks the installment grid and asks of every line: is this
due inside the document's fiscal year? The ten installments falling before 31 December go to the
**income** pair. The other fifty go to the **advance income** pair. Next year's opening does not
move them — they are released as they are collected and accrued.

An installment whose period straddles the year end can be split pro-rata by day count if the term
says so, so that only the part earned this year lands in income.

### The two tax pairs

The installment grid has carried Tax 1 and Tax 2 amounts all along: the rates come from the Legal
Entity Taxes grid, the amounts sit on every installment line, and the contract totals them. What
decides where those amounts land in the journal entry is the **Taxes** (الضرائب) group further down
the same Effect page, holding *Tax1 Debit* / *Tax1 Credit* and *Tax2 Debit* / *Tax2 Credit*.

Three things about this group catch people out.

**Each tax is booked line by line, not as one document total.** A sixty-installment contract produces
sixty tax pairs, each carrying its own installment's reference data, so an analysis set that follows
the line reaches the tax entry as well. *Shorten Ledger Effect* collapses them into one pair per
account, exactly as it does the rest of the entry.

**A sales term does not fall back to the expense type or the unit.** This is the one place where the
sales family behaves differently from collections. A collect term is the *last* stop in a chain that
starts at the expense type and passes through the unit and the unit model; a sales term is the
*only* place looked at. Accounts sitting on the unit or on the expense type are not consulted here,
so if the pair is empty on the term, the tax is not booked at all.

**A tax marked as a deduction stays negative.** Withheld tax is held as a negative amount on the
installment line, and the pair books it exactly as it stands — as a negative debit against a negative
credit, not as a swapped pair. The entry still balances; it simply reads with minus signs.

And the universal rule bites here as everywhere else: a pair with only one side filled books nothing
and warns about nothing.

The group is on the five terms whose documents actually produce an entry — the sales contract, the
opening sales contract, the waiver, the purchase contract and the handover. The preliminary contract,
the reservation and the reservation cancellation have no account blocks of any kind, so there is
nothing to tax there either.

## The behavioural switches

These are the options that change what the document does rather than where the money goes. They sit
in a group at the bottom of page 0, with two of them on a second page titled **Settings**
(الإعدادات).

| Option | What it does |
|---|---|
| Create Accounting Effects For Handoverd Documents Only | Suppresses the contract's whole journal entry until the unit has actually been handed over. Nothing is posted at signature; the handover document releases it later. *(The shipped English label really does read "Handoverd".)* |
| Validate Remaining And Installments Total Equality | On by default. Blocks the commit when the installment total does not match the remaining value, within the tolerance set in the [module configuration](/modules/realestate/realestate-configuration). Turn it off only for contracts whose installment plan deliberately does not add up to the price. |
| Shorten Ledger Effect | Compresses the journal entry: lines sharing the same account and analysis are merged instead of producing one line per installment. On a 60-installment contract this is the difference between a two-line entry and a sixty-line one. |
| Manual Coding | Off by default, meaning the system numbers the installment lines itself. Turn it on when installment codes must match an external or legacy numbering the user types by hand. |
| Has Buyer | On by default; makes the Buyer field mandatory. Turned off for company-owned initial contracts where no buyer exists yet. |
| Pay Installments In Order | Forces collections against this contract to settle installments oldest first. A collection term can override it for a specific collection book — see [Collection, Maintenance, Investment and Cost Document Terms](/modules/realestate/document-terms/realestate-terms-other). |
| Calculate Maintenance From Details | Changes where the maintenance deposit total comes from. On: it is summed from the maintenance-cost installment lines, and the percentage field is cleared. Off: it is totalled from the installment-construction rows. A mismatch between the two is what produces "Total maintenance costs {0} not equal maintenance cost {1}". |
| Merge Similar Payment Lines | When the installment plan is generated, lines with the same type and the same due date are collapsed into one. The original amounts survive as the five merged-value components, which the routing grid can post separately. |
| Prevent Accounting Effects For Other Fees Lines | Skips the Other Fees postings entirely, for companies that invoice those fees separately. |
| Force Price List | Blocks the commit unless the contract price equals the price the price list produces for that estate. |
| Consider Paid With Reservation Paid From Installments | Treats the reservation deposit as already collected against the first installment instead of as a separate credit: the generated down-payment line carries the deposit as its paid value and only the balance stays outstanding. |

::: tip Recognising revenue on delivery — the worked example
This is the most-asked configuration in the module, and it takes **two** terms, not one.

1. On the **sales contract** term, tick *Create Accounting Effects For Handoverd Documents Only*.
   Villa B-12's contract is now committed on 1 March with no journal entry at all.
2. On the **handover** term, decide its own *Create Accounting Effects*. Leave it off if the handover
   is purely a trigger; turn it on if the handover document should also produce an entry of its own.
3. When the handover document is committed in September, the contract's suppressed entry is generated
   at that moment. Cancelling or deleting the handover reverses it again.

Configuring only step 1 gives you a contract that never posts. Configuring only step 2 gives you a
contract that posts at signature and a handover that posts a second time. They belong together.
:::

## Where each document differs

All eight terms carry the same underlying option set. What changes is which options the screen shows
and what each document adds.

### Sales contract

The full screen: page 0 **Effect** with every account block, the tax grid, the switch group and the
routing grid; page 1 **Settings** with *Force Price List* and *Consider Paid With Reservation Paid
From Installments*. Everything above applies as written. See
[The Sales Contract](/modules/realestate/sales/realestate-sales-contract).

### Estate handover

One page only, and it adds one option:

| Option | What it does |
|---|---|
| Create Accounting Effects | On: the handover document produces its own journal entry, built from the same blocks as a contract. Off: committing the handover only stamps the contract and the unit as delivered. Switching it off after entries exist deletes the handover's own entry. |

See [Handing the Unit Over](/modules/realestate/sales/realestate-handover).

### Purchase contract

The company is the buyer here, so the same blocks run in the opposite commercial direction. The term
adds one option:

| Option | What it does |
|---|---|
| Estate Value Field | Normally the value capitalised onto the purchased estate is the contract price. Naming a field here makes the system read that field on the purchase contract instead — used when the amount to capitalise is price plus fees plus registration costs held somewhere else on the document. |

See [Estate Values, Additions and Revaluation](/modules/realestate/investment/realestate-estate-values-and-revaluation).

### Opening sales contract

Same two pages, Effect and Settings, and the same blocks for the price, the owner and buyer fees, the
maintenance deposit, the penalties, the discounts, the recognised income, the header discount and the
two taxes — because an opening contract is an ordinary contract that happens to be dated before
go-live. One
option is specific to it:

| Option | What it does |
|---|---|
| Allow Non Opening Fiscal Period In Opening Sales | Off by default: the document refuses to commit outside an opening fiscal period, failing with *"Fiscal period must be openning"*. Turn it on only when opening balances genuinely have to be entered into a normal period. |

See [Opening Sales Contracts](/modules/realestate/opening/realestate-opening-sales).

### Initial (preliminary) sales contract

The shortest term in the family. It has a **single page titled Settings**, and it shows no account
blocks at all — which matches the document, since a preliminary contract has no accounting effect. It
carries *Has Buyer*, *Merge Similar Payment Lines*, *Force Price List*, *Consider Paid With
Reservation Paid From Installments*, the routing grid, and one option of its own:

| Option | What it does |
|---|---|
| Reserve Estate | Forces the document's own *Reserve Estate* flag on when it is saved, so committing the preliminary contract writes itself into the estate's reservation slot and blocks anybody else from selling or reserving the unit. Un-ticking it, or pointing the contract at a different unit, releases or moves that reservation. |

See [Reservations and Initial Sales Contracts](/modules/realestate/sales/realestate-reservations-and-initial-contracts).

### Reservation document

Page 0 **Effect** here holds a single pair — the reservation deposit — because that is the only money
a reservation moves. Page 1 **Settings** carries *Force Price List* and *Consider Paid With
Reservation Paid From Installments*, which is the option that later decides whether this deposit is
treated as a payment against the first installment of the sales contract.

### Reservation cancellation

A single page titled **Settings**, holding *Has Buyer*, *Merge Similar Payment Lines*, *Force Price
List*, *Consider Paid With Reservation Paid From Installments* and the routing grid. What is retained
and what is refunded is booked through the routing grid rather than through named blocks.

### Waiver document

Page 0 **Effect** carries the price, owner fees, buyer fees, maintenance deposit, header discount and
tax blocks, plus a dedicated pair for the **waiver price** — the commission the company charges for
transferring the contract to a new buyer. Page 1 is **Settings**. The option that matters is:

| Option | What it does |
|---|---|
| Reverse Commissions Accounting Effects | Posts every commission line on the waiver with its commission type's debit and credit sides swapped, so the original contract's commission entry is reversed when the buyer waives ownership. |

Worked through: a customer who paid 3 of 10 installments on a 1,200,000 villa waives it to a friend,
and the company charges 2% — 24,000 — for the transfer. The waiver-price pair books the 24,000; if
*Reverse Commissions Accounting Effects* is on, the 24,000 broker commission booked when the original
contract was signed is reversed at the same time. See
[Waivers and Cancelling a Sale](/modules/realestate/sales/realestate-waiver-and-cancellation).

## Choosing a starting point

If you are configuring the sales family from nothing, do it in this order:

1. **The sales contract term first.** It is the only one that exercises every block, and the other
   seven are trimmed versions of it.
2. **Decide the recognition moment before you fill any account.** Revenue at signature or revenue at
   handover changes which terms need which options, and it is much harder to change once contracts
   exist.
3. **Fill the income and advance income pairs even if every contract is short.** They are what keeps
   a December contract with January installments out of the wrong year.
4. **Leave the routing grid empty until you need it**, then add rows for the installment types that
   genuinely belong elsewhere — the maintenance-cost lines almost always do.
5. **Copy the finished term** for the initial contract, reservation and waiver rather than starting
   each from scratch; only the options listed above differ.
