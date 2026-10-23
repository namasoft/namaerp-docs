---
description: "Overview of the Travel module for tour operators and travel agencies: the operations half (tour programs, tours, hotel and restaurant vouchers), the purchase and sales documents that carry the money, the master files, licensing and a map of the guide."
---
# Travel

Welcome to the Travel module of Nama ERP — the module built for tour operators and travel
agencies, where what you sell isn't a product on a shelf but an **arrangement**: forty people
landing on the 14th, five nights split between two hotels, a guide who speaks Italian, a Nile
cruise on day four, and a coach waiting at the airport.

## Who is this module for?

An inbound tour operator receives a group from a partner agency abroad, books everything the
group will need on the ground, and invoices the partner for the package. A travel agency sells
the same arrangements directly to its own customers. Either way the business has a shape that a
normal stock-based module cannot express:

- **Nothing is ever in stock.** You never hold a hotel night in a warehouse. You buy it for a
  specific group on a specific date, and if nobody comes, it simply isn't bought.
- **Your suppliers are hotels, restaurants and guides** — and you owe each of them money
  directly, by name.
- **One trip has dozens of moving parts** across several days, several cities and several
  suppliers, and someone has to be able to see the whole thing on one screen.

The Travel module is built around exactly that.

## The big picture — two halves, and the bridge between them

The most useful thing to understand before you touch a single screen is that this module has
**two halves that do two different jobs**.

**The operations half** answers *who, where, when and how many*. This is the tour program, the
tour itself, and the hotel and restaurant vouchers. It is where you build the itinerary, record
that the Rossi group of 40 arrives on 14 March, splits into 12 double and 16 triple rooms, stays
three nights in Cairo and two in Luxor, and eats at a particular restaurant on the Tuesday.
**None of this carries any money at all** — no rates, no costs, no totals. That is deliberate:
it lets the operations team plan and re-plan a trip freely without anyone's accounts moving.

**The financial half** answers *how much, to whom, and against which accounts*. This is the
travel service purchase orders, invoices and returns on the cost side, and the travel service
sales orders, invoices and returns on the revenue side. These behave like Nama's other financial
documents — discounts, taxes, payment methods, instalments, contract terms, e-invoicing — and
their effects reach the general ledger.

**The bridge** between the two is a single button on the tour: **Create Tourism Service Purchase
Orders**. It reads the tour's bookings, groups them by the party you owe, and raises one purchase
order per party for you to price.

## Following one group through the system

Suppose you run the same eight-day Cairo–Luxor–Aswan itinerary a dozen times a season.

1. You build that itinerary **once** as a **Tour Program**: day 1 arrival and transfer, days 1–3
   at a five-star Cairo hotel, day 4 the flight south, and so on. A program has day *numbers*
   rather than dates, because it is a template you will reuse all season.
2. A partner agency confirms a group. You create a **Tour**, name the group, enter the arrival
   date and the pax breakdown, and pick the program — the system lays the whole itinerary out
   against real dates, working every check-in, check-out and service date forward from the
   arrival date. From there you adjust this particular group's trip freely.
3. You issue **Hotel Vouchers** and **Restaurant Vouchers** so each supplier knows exactly what
   has been booked in their name.
4. You press **Create Tourism Service Purchase Orders** on the tour. The system raises one
   **Travel Service Purchase Order** per hotel, per restaurant, per guide and per airline, and
   you enter the agreed prices on each.
5. As suppliers bill you, those orders become **Travel Service Purchase Invoices** — the cost of
   the trip.
6. You raise a **Travel Service Sales Invoice** on the partner agency for the package price.
   The difference between what you invoiced and what you were billed is the margin on the group.

## Your suppliers are master files, not supplier records

This is the second idea worth grasping early. A **Hotel**, a **Restaurant** and a **Tour Guide**
are each their own master file in this module — and each one carries its own accounts. You do
not create a matching Supplier record alongside it. When you raise a travel purchase invoice
against the Nile Hotel, the Nile Hotel *is* the party on that document, its balance is a real
balance in your ledger, and you settle it like any other payable.

Your customers, on the other hand, are ordinary Nama customers. The partner agency you bill is a
normal Customer record.

## What a travel document sells

Every line of every travel invoice — sales or purchase — sells one **Tour Service**: an airport
transfer, a room-night, a half-day city tour, a single-room supplement, a guide day. A tour
service is not an inventory item. It has no warehouse, no unit of measure and no quantity on
hand, and nothing in this module ever moves stock.

::: tip How documents work in Nama ERP
There is no separate step that pushes a document into the accounts. Once a document is saved out of draft, its effects are created
straight away as a **business request** processed in the background — so saving is instant and
the work happens behind you. If an effect fails, you can find and retry it from the **Business
Requests** list view. Later edits to a saved document flow through the same way.
:::

## Licensing

The whole module sits behind a single licence code, **`travel`** (NaMa Travel System). There are
no sub-licences to buy screen by screen — if the module is in your licence, the full Travel menu
appears; if it isn't, nothing does.

## How this guide is organized

The Travel menu itself has just two groups, **Master Files** and **Documents**, and this guide
follows the same shape.

### Setting up

<LandingGrid>
  <LandingCard icon="🗂️" title="Master Files" link="/modules/travel/travel-master-files.md" details="The foundation: travel countries and cities, hotel and restaurant classes, the hotels, restaurants and guides you work with, and the tour services that every invoice line sells." />
  <LandingCard icon="⚙️" title="Document Terms" link="/modules/travel/travel-document-terms.md" details="The real configuration of the module. Which accounts each document uses, and what the tour's generate button should produce." />
</LandingGrid>

### Planning the trip

<LandingGrid>
  <LandingCard icon="🗺️" title="Tour Programs" link="/modules/travel/tour-programs.md" details="The reusable, day-numbered itinerary template." />
  <LandingCard icon="🧳" title="Tours" link="/modules/travel/tours.md" details="One real group, on real dates, with its accommodation, services and flights, and the button that raises the purchase orders for it." />
  <LandingCard icon="🏨" title="Hotel & Restaurant Vouchers" link="/modules/travel/travel-vouchers.md" details="The reservation slips that tell each supplier what you have booked in their name." />
</LandingGrid>

### The money

<LandingGrid>
  <LandingCard icon="🛒" title="Buying from Suppliers" link="/modules/travel/travel-purchase-cycle.md" details="Travel service purchase orders, invoices and returns: the cost side of every trip." />
  <LandingCard icon="💼" title="Selling to the Client" link="/modules/travel/travel-sales-cycle.md" details="Travel service sales orders, invoices and returns: the revenue side." />
  <LandingCard icon="💳" title="Payments, Instalments & Contract Terms" link="/modules/travel/travel-payments-and-terms.md" details="The payment, instalment and contract-clause grids shared by all six financial documents." />
</LandingGrid>
