---
description: "How cost recorded against contract terms is pushed onto Real Estate units: a second route into estate cost, where the estate link comes from, the queued background run, the recursive split down the estate hierarchy, and cost before and after hand-over."
---
# Pushing Cost onto Real Estate Units

A contractor working on somebody else's land only ever needs cost per **term**: what did the blockwork
cost, what did the plastering cost, are we inside the rate we tendered. A developer building units to
sell needs something completely different — cost per **flat**. When flat 12 is handed over and invoiced,
the cost of goods sold has to be flat 12's share of everything that was ever spent on the tower, and
nobody spends money on flat 12: they spend it on the tower's blockwork, the tower's lifts, the tower's
scaffolding.

That translation is what this bridge does. It takes the cost each document deposited against a contract
term, finds the **real estate unit** that term is tied to, and records the cost against that unit — then
pushes it down the estate hierarchy, so cost booked against "the tower" ends up apportioned to every
flat in it.

If you are a pure contractor, nothing on this page will ever happen to you: leave the estate column on
your contract terms empty and the bridge is a silent no-op.

## It is a second, separate route into Real Estate cost

The Real Estate module has its own cost machinery — a catalogue of cost elements, each carrying its own
distribution rule, and a cost voucher that spreads amounts over estates. That is described in
[Distributing Project Costs Over Properties](/modules/realestate/costs/realestate-cost-distribution.md),
and it is the right tool for land, permits, lifts, marketing and every other lump sum a developer
absorbs.

The contracting bridge is **not** that. It is an entirely separate path with its own stored table, fed
automatically from construction cost, and requiring no voucher and no data entry of its own. Both routes
end up as cost on the same units, and it is worth knowing which of the two put a figure there, because
they are maintained by completely different documents.

## Where the estate comes from

Every cost slice the module records carries the term code of a project contract line. The bridge needs
to turn that term code into an estate, and there are exactly two ways it can, chosen by a single module
setting:

| Setting | The estate is read from |
|---|---|
| off — the default | the **Estate** column on the matching term line of the [project contract](/modules/contracting/project-contracting/contracting-project-contract) |
| *Calculate Estate Cost From Term Analysis Card* on | the matching line of the **term analysis card**, using the cost slice's analysis term code |

Either way, if the contract or the card cannot be found, or the matching line has no estate on it, the
slice is simply not recorded against any unit. There is no error and no warning — the bridge only speaks
when it has something to say. See
[Contracting Configuration](/modules/contracting/contracting-configuration) for the setting itself, and
note that with the analysis-card mode on, the estate column on the contract's terms grid is left empty.

## When it runs: queued, in the background, never on a timetable

This is the fact that generates support calls, so it is worth being precise.

Every time a cost document is processed, and every time the contract-level cost distribution is
triggered, the module **queues a background task** to do the estate work. Nothing is written to the
estate at the moment you press Save. The units' cost figures appear once that task has been picked up
and run.

It is **not a scheduled job**. Nobody has to set up a nightly run, and turning a schedule on will not
make it happen sooner or more often — the trigger is always a document being processed. The task has its
own view where a support user can see what is queued and what has failed, and it retries up to five
times before it gives up and marks itself failed.

Cancelling a cost document works the other way round: its estate cost rows are removed **immediately**,
along with the cost slices themselves.

## The recursive split, and how to read the figures

Once the bridge knows the estate, it records the slice's full cost against it, and then walks **down**
the estate tree. For each direct child of that estate:

```
child's share  =  child's weight  ×  parent's cost  ÷  total weight of all direct children
```

and the same thing happens again for that child's own children, all the way to the bottom. The weight is
the estate's **unit area** by default; a module setting switches it to the estate's **contracting
estimated cost** instead, for developers who price by expected cost rather than by area.

::: warning Read these figures one level at a time
The estate named on the term keeps the **full** cost, and each of its descendants also carries **its
share** of the same money. The rows are not mutually exclusive: they are the same cost expressed at
several levels of the tree. Adding them all together counts the same money once per level, so any
roll-up, report or dashboard over this data must pick a level — the units, or the buildings, or the
compound — and stay there.
:::

## Before hand-over and after

The bridge also decides *when* each slice happened relative to the unit's hand-over, and maintains two
separate figures on every unit: contracting actual cost **before** hand-over, and contracting actual
cost **after** it. The accounting treatment differs — pre-hand-over cost belongs in the unit's cost of
sale, post-hand-over cost is after-sales or warranty expense — so the split has to be made somewhere,
and it is made here.

The rule is straightforward, and it errs towards "before":

1. a unit that has not been handed over at all — everything is **before**;
2. a unit whose hand-over has no value date recorded — everything is **before**;
3. a slice dated earlier than the hand-over — **before**;
4. a slice dated later — **after**;
5. a slice dated on the hand-over date itself — decided by which of the two was created first.

Both figures are refreshed on the unit every time the background task runs for any document touching it.
The sales side reads them: the cost accumulated before delivery is what a sales contract can book as the
unit's cost, and cost arriving afterwards is swept up separately — see
[Handing the Unit Over](/modules/realestate/sales/realestate-handover.md).

## Worked example: a tower's plastering across twenty flats

**Tower A** for **Al-Fanar Development**, project contract `PC-2026-001`. This time we are the
developer: the tower is ours and the twenty flats in it are for sale.

The estate tree beneath the tower:

| Estate | What it is | Unit area |
|---|---|---|
| `EST-TWRA` | Tower A, the building | 3,000 m² |
| `EST-TWRA-01` … `EST-TWRA-12` | twelve two-bedroom flats | 140 m² each — 1,680 m² |
| `EST-TWRA-13` … `EST-TWRA-20` | eight three-bedroom flats | 165 m² each — 1,320 m² |

On the contract's Terms grid, term `3.02` *Plastering* names **`EST-TWRA`** in its Estate column. By
the time the plastering is finished, material issues, subcontractor extracts, labour sheets and misc
invoices have deposited **27,000** of cost against that term.

Each of those documents queued a task as it was processed. When the tasks have run, the bridge has
recorded:

| Estate | Parent row | Cost |
|---|---|---|
| `EST-TWRA` | — | **27,000** |
| each 140 m² flat | `EST-TWRA` | 27,000 × 140 ÷ 3,000 = **1,260** |
| each 165 m² flat | `EST-TWRA` | 27,000 × 165 ÷ 3,000 = **1,485** |

Twelve flats at 1,260 is 15,120 and eight at 1,485 is 11,880 — 27,000 exactly, which is the sanity check
worth doing when a distribution looks wrong. And note again what you must not do: 27,000 + 27,000 is not
54,000 of cost. It is 27,000, written down twice at two levels.

Now do the same for every other term on the contract that names the tower — the excavation, the
concrete, the blockwork — and each flat's **contracting actual cost before hand-over** becomes the sum of
its shares. Flat 3, still unsold, carries its 1,260 from plastering plus its share of everything else.
Flat 17, handed over on 28 February, carries the shares of every slice dated before that day in its
pre-hand-over figure, and anything dated after it — a defect put right in April, say — in its
post-hand-over figure instead.

Which of those numbers is used, and where, belongs to the Real Estate module:
[Distributing Project Costs Over Properties](/modules/realestate/costs/realestate-cost-distribution.md)
for the estate cost picture as a whole, and
[Handing the Unit Over](/modules/realestate/sales/realestate-handover.md) for the moment the pre- and
post-hand-over distinction starts to matter. For where the 27,000 came from in the first place, see
[How Project Cost Is Built](/modules/contracting/costs/contracting-cost-model).
