---
description: "Map of the Real Estate module: the estate tree from project to unit, the four licences, the menu group by group, the core ideas behind it and the cycle from an empty plot to a fully collected contract."
---
# Real Estate Module Overview

A property company has a problem that ordinary trading companies do not: its stock is a tree. You do not buy "ten units" the way you buy ten laptops — you buy a plot inside a block inside a square inside a project, you build a tower on it, you carve the tower into floors and the floors into flats, and then you sell or lease each flat individually, on a payment plan that runs for years. Meanwhile the cost of the lift, the landscaping and the site office was incurred once, for the whole building, and somebody still has to answer the question "what did flat 12 cost us?"

The Real Estate module exists for exactly that shape of business. This page is the map: what the module is made of, which licences switch which parts on, and how one flat travels from an empty plot to a fully collected contract.

Throughout the page we will follow one worked example:

> **Palm Compound** is a mixed development. Inside it, **Square A** holds **Block 3**, and on Block 3 stands **Building B**. On **Floor 3** of that building sits **Flat 12**, 150 m², which a buyer purchases for **900,000** — 20% down and the remaining **720,000** over **10 installments of 72,000**.

## "Estate" Means Every Level, Not Just the Flat

The single most useful thing to understand early is that the module has one shared idea of a property, called an **estate**, and *all eight levels* of the tree are estates. A project is as much an estate as a flat is.

```
Project        Palm Compound
 └─ Square       Square A
     └─ Block      Block 3
         ├─ Land Plot   (the plots on a block, when it is land you are selling)
         └─ Building     Building B
             └─ Floor      Floor 3
                 └─ Rental Unit   Flat 12
```

Beside the rental unit sits one more estate type, the **unit group**, which bundles several units together so they can be sold or leased as a single package.

Because they are all estates, they all share the same equipment: an owner and a buyer, a price, areas, status flags, attachments — and, importantly, its own accounting subsidiary, so the ledger can be read per property. It is also why the documents in the module accept an estate of almost any level: you can raise a cost document against Building B, sell Block 3 as one deal, or lease Flat 12 on its own.

Two consequences worth knowing before you meet them in practice:

- **The tree is stored as a set of pointers, not as a parent link.** Flat 12 carries its project, block, building and floor all at once. When you pick a floor, the system back-fills the levels above it, and copies the address and the dimensions (محددات) downwards.
- **Selling or reserving cascades down and rolls up.** Sell Block 3 and every land plot, building, floor and unit beneath it becomes unavailable; at the same time Square A is flagged *partially sold*. There is no single status field on an estate — availability is a set of flags (sold, reserved, rented, reserved for rent, waivered, partially sold, partially rented) plus one status list for lands and blocks.

The details of the model, and of every generate button that builds the tree, are in [How Properties Are Modelled](/modules/realestate/properties/realestate-estate-model.md).

## The Four Licences

The module ships as one base licence plus three sub-module licences. Quote them exactly as written — the last one contains a spelling mistake that is part of the shipped data and must not be "corrected":

| Licence code | What it unlocks |
|---|---|
| `realestate` | The base module: the estate tree and all its master files, owners, reservations, collection and payment documents, fines, maintenance, costs, ownership transfer, investment funds, purchase contracts, additions and revaluation. |
| `realestate-sales` | The selling side: sales offers, temporary reservations, initial and final sales contracts, opening sales contracts, handover, post-handover cost, waivers, cancellation requests, price lists and payment plan templates. |
| `realestate-rent` | The leasing side: rent offers and their cancellation, rent contracts, batch and opening rent contracts, rent installment accrual ledgers, lease termination, aggregated collection and exemption documents. |
| `realestate-agri-investmnent` | Agricultural investment contracts, their categories and their profit claims — a separate product, not part of the pooled investment fund. |

A missing licence does not grey a screen out; the document type simply is not there, and neither is its term screen. That is also why the **Sales** and **Rents** menu groups appear and disappear as a block.

## The Menu, Group by Group

Everything lives under **Real Estate and Property** (العقارات و الممتلكات):

| Menu group | What you find there |
|---|---|
| **Master Files** | Owners, the whole estate tree (project, square, block, land, building, floor, unit, unit group), unit models, expense items, commission types, standard contract clauses, sales price lists, payment plan templates, fee types, expense types, brokers, investment funds and maintenance funds. |
| **Documents** | The cross-cutting money and status documents: collect requests and collect documents, aggregated collection, exemptions, pay requests to the owner and to the bank, ownership transfer, the maintenance documents, inspection reports, waivers, cancellation requests, handover, post-handover cost and return payments. |
| **Sales** | Temporary reservations, reservation documents and their cancellation, sales offers, initial sales contracts, sales contracts and opening sales contracts. |
| **Rents** | Rent offers and offer cancellations, batch contracts, rent contracts, opening rent contracts, rent installment accrual ledgers and lease termination. |
| **Fines** | Late-payment fines and their classification list. |
| **Investment** | Agricultural investment contracts, their categories and profit claims, estate purchase contracts, estate additions, revaluation documents, fund finance additions and investor exits. |
| **Cost** | The cost element catalogue, the cost document and the opening cost document. |
| **Settings** | The module's own settings record — see [Module Configuration](/modules/realestate/realestate-configuration.md). |

## Five Ideas Everything Else Hangs Off

Almost every page in this section is an application of five ideas. Learn them once here.

### 1. The estate

Covered above: one shared property record across eight levels, addressed by pointers, with boolean availability flags that cascade down the tree and roll up it.

### 2. The owner

There is **one party master file** in the module, and it plays three roles that are chosen by three independent checkboxes: **owner** (the landlord or the seller), **buyer** (which is also the tenant — rent screens reuse the very same field), and **investor** (a participant in an investment fund). Every picker in the module filters on the matching flag, so a party that cannot be found on a lease screen is almost always a party whose buyer flag was never ticked. Owners can also be groups — joint heirs, for example — in which case postings are split between the members by share. See [Owners, Buyers and Standard Contract Clauses](/modules/realestate/properties/realestate-owners-and-contract-clauses.md).

### 3. The installment line

Money in this module is not a balance, it is a **schedule**. A sales contract or a lease carries a grid of installment lines, each with a code, a due date, a type (down payment, ordinary installment, insurance, commission, maintenance cost, fees…), a value and a set of paid/remaining columns.

That grid is a **projection**. You never type into the paid columns: collection documents write payment entries, and the contract's paid and remaining figures are then recomputed from all the entries that exist. Which is also why one of the module's most important buttons — *Create Installments* — is dangerous once money has moved: it rebuilds the entire grid. The mechanics live in [Building the Installment Plan](/modules/realestate/sales/realestate-installment-plans.md) and [How Installment Collection Works](/modules/realestate/collections/realestate-collection-basics.md).

### 4. The document term

Almost no accounts are stored on a Real Estate document. They live on the document's **term** (توجيه) — the configuration record attached to the document book — as pairs of accounting sides: a price pair, an owner-fees pair, a buyer-fees pair, a maintenance-deposit pair, a discount pair, and so on. Two rules to carry into every term screen:

- **A pair only fires when both of its sides are filled.** A half-configured pair is skipped in silence, which is the single most common cause of "the entry is missing lines".
- **A routing grid on the term** decides, per installment type, which accounts an amount, a penalty, a discount or a prepayment hits — so maintenance-cost installments can be sent to a deposit liability while ordinary installments hit revenue.

Read [How Real Estate Document Terms Work](/modules/realestate/document-terms/realestate-terms-basics.md) once, and the other three term pages become reference material.

### 5. The business request

Saving a Real Estate document is instant. Its effects — the journal entry, the estate status change — are created as a **business request** (طلب أعمال) that is processed in the background. So a contract can be saved and committed successfully while its accounting entry is still on its way, and a failure never blocks the user's screen.

When something does fail, you do not re-enter the document: open the **Business Requests** list view, filter by processing status, select the rows and use the **More** menu → **Reprocess** / **Recommit**. This is the normal way to deal with a mis-configured term: fix the accounts, then reprocess.

## The Cycle, End to End

Here is Flat 12's whole life, in the order the work actually happens.

1. **Build the portfolio.** Create Palm Compound, then work downwards with the generate buttons: generate squares from the project, blocks from the square, then either land plots or buildings from the block, floors from the building, and finally units from the floor or straight from the building. A unit model ("Type A — 3 rooms, 150 m²") lets you stamp two hundred identical flats in one action. → [Properties](/modules/realestate/properties/realestate-estate-model.md)

2. **Set up what the documents will need.** Owners and buyers, the standard contract clauses, the fee, commission, broker and expense catalogues, a sales price list that prices a 150 m² flat on Floor 3, and a payment plan template that says "20% down, then 10 quarterly installments". Then the books and their terms, which is where the accounts live.

3. **Hold, reserve, contract.** A salesperson may quote first (a sales offer locks nothing), or hold the flat informally for a few days. What actually locks Flat 12 is a **reservation document** once it is confirmed, and what actually sells it is the **sales contract**: it marks the estate sold, records the buyer, builds the schedule and creates the accounting entry. → [The Property Sales Cycle](/modules/realestate/sales/realestate-sales-cycle.md)

4. **Or lease it instead.** The leasing track is a parallel world with its own documents: an offer that can reserve the unit for rent, a contract whose schedule is generated by a button, and periodic accrual ledgers that recognise the revenue month by month. → [The Leasing Cycle](/modules/realestate/rent/realestate-rent-cycle.md)

5. **Collect.** 180,000 arrives as the down payment, then 72,000 a quarter. Each payment is a collect document against the contract; bulk rent collection has its own aggregated document that generates one collect document per line. Money then moves on to the bank or to the landlord, and anything unpaid can attract a fine. → [Collections and Payments](/modules/realestate/collections/realestate-collection-basics.md)

6. **Hand the unit over.** The handover document stamps the contract and the estate — and, if the term is configured that way, it is the document that finally releases a journal entry that was deliberately held back until delivery.

7. **Maintain it.** Part of Flat 12's price was a one-off maintenance deposit parked in the project's maintenance fund; separately, every year the building's maintenance budget is accrued across its units by area and spent through maintenance expenses. The two streams are independent. → [Maintenance](/modules/realestate/maintenance/realestate-maintenance-deposits-and-funds.md)

8. **Know what it cost.** Cost documents book project cost against an estate and distribute it downwards over the units by area, by price or by a numeric field, accumulating into each unit's assigned cost. → [Distributing Project Costs Over Properties](/modules/realestate/costs/realestate-cost-distribution.md)

9. **Run it as a fund (optional).** Where the property was bought with pooled investors' money, a parallel chain tracks each estate's purchase value, capitalised improvements and revaluations, and distributes fund profit between the investors. → [Real Estate Investment Funds](/modules/realestate/investment/realestate-investment-funds.md)

10. **And on day one, load the history.** An existing portfolio arrives through three opening documents — already-sold units, already-running leases and historical cost — entered in an opening fiscal period. → [Going Live: Opening Balances](/modules/realestate/opening/realestate-opening-balances.md)

::: tip Not every document in the chain touches the ledger
The pre-documents record intent by design. A temporary hold, an initial sales contract and a sale-cancellation request record intent and nothing else — no journal entry, and in most cases no lock on the unit either. A sales offer normally behaves the same way, though unlike the others it does carry a document term with a full set of accounts, so it creates a journal entry if someone fills them in. The documents that genuinely create accounting effects on the sales side are the reservation, its cancellation, the sales contract, the purchase contract, the waiver, the post-handover cost and — when configured — the handover. Knowing which is which saves a lot of hunting for a missing entry.
:::

## Where to Go Next

- New to the module: [How Properties Are Modelled](/modules/realestate/properties/realestate-estate-model.md), then [The Property Sales Cycle](/modules/realestate/sales/realestate-sales-cycle.md) or [The Leasing Cycle](/modules/realestate/rent/realestate-rent-cycle.md).
- Setting a new database up: [Module Configuration](/modules/realestate/realestate-configuration.md) and [How Real Estate Document Terms Work](/modules/realestate/document-terms/realestate-terms-basics.md).
- Migrating an existing portfolio: [Going Live: Opening Balances](/modules/realestate/opening/realestate-opening-balances.md).
