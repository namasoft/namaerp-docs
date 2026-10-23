---
entities: [BankLC, BLCOpeningDoc, BLCChanging, BLCClosingDoc, BLCReq]
menu: Banks → Bank LC → Bank LC
---

# Bank Letters of Credit

A letter of credit (LC) is a tool an importer uses to reassure the supplier: the bank undertakes to pay the supplier the shipment's value once they present shipping documents matching the terms. Like a letter of guarantee, an LC **reserves part of your facility limit** and charges you **fees**, and it's tracked as a master file with a succession of opening, amendment and closing documents, keeping the two snapshots of **initial values** and **current values**. Its structure is very close to that of [Letters of Guarantee](./letters-of-guarantee.md).

::: info Required license
Letters of credit are part of the `accounting-blc` license.
:::

## The LC's lifecycle

Every screen hangs off the **Banks > Bank LC** root:

1. **Bank LC Request** — documenting the LC request before opening it (no accounting effect).
2. **Bank LC** — the master file in its initial status "Initial".
3. **Bank LC Opening** — the moment the bank actually opens the LC (it creates a journal entry, reserves the facility, and the status flips to "Issued").
4. **Bank LC Changing** — changing the value, term or fees (updates the current values).
5. **Bank LC Closing** — closing the LC and releasing the reserved facility.

## The LC's master file

On the **Bank LC** screen (`Banks > Bank LC > Bank LC`) the LC's data is defined:

- **Basic information**: the **bank** and **bank account**, linking the LC to the **LC request**, **facility limit** and **project contract** (and **project contract extract**) when needed, and the **LC type**.
- **Initial BLC values**: a snapshot of the opening terms — the **LC amount** and **currency**, **from date / to date**, the **covered amount** (covered in cash) and its percentage, the **facilities** (reserved portion) and its percentage, the **issue fees** and **change fees**.
- **Current values**: the values in force after any amendment, plus the **status**.

![Bank LC screen](../../ar/modules/accounting/images/lc/bank-lc-en.png)

### LC statuses

The LC moves through the same statuses as a letter of guarantee: **Initial** → **Issued** → (**Received** / **Totally Delivered**) → **Finished** / **Canceled** / **Liquidated**.

## Opening and reserving the facility

When a **Bank LC Opening** (`Banks > Bank LC > Bank LC Opening`) is recorded its accounting effect is created and the facility portion is reserved. The opening term covers the sides: **LC amount debit/credit**, **facilities amount debit/credit**, **fees debit/credit** (with **tax fees 1 and 2**), and the **covering** side. (Where the accounts come from is in the [Document terms](./support/accounting-document-terms.md) reference.)

![Bank LC Opening screen](../../ar/modules/accounting/images/lc/blc-opening-en.png)

::: warning Facility-limit check
At opening, the system checks that the total reserved doesn't exceed the **facility limit** linked to the LC, blocking the opening if it does. Details in [Credit Facilities](./credit-facilities.md).
:::

## Amendment and closing

**Changing** is used to raise or lower the LC value or extend its term — it updates the current values while keeping the initial values for comparison, and records the **change fees**. **Closing** closes the LC and releases the reserved facility.

## Actions on this screen

As with letters of guarantee, the request carries the two buttons that build the rest of the chain:

- **Create Bank LC** — turns the approved request into the LC's master file, carrying over its type, amount, bank, bank account, dates, covered amount, facilities and fees, and opening it as a new record for you to review and save.
- **Create Bank LC Opening Document** — opens the **Bank LC Opening** document directly, pre-filled from the request's account, bank and bank account. Use it at the moment the bank actually opens the LC, so the accounting effect is created and the facility is reserved in one step.

Both need the request **saved** first.

## Reports

| Report | Answers |
|---|---|
| Raw-material prices by initial LC invoices (SYSR-LCD001) | Linking imported-material cost to the LC's initial invoices. |
| Analysis of costly LCs (SYSR-LCD002) | The highest-cost LCs for comparison and analysis. |

![Raw-material prices by initial LC invoices sample (SYSR-LCD001): each item on the LC's initial invoice with its quantity, price and value](../../ar/modules/accounting/images/reports/SYSR-LCD001-en.png)

## Banking or Import? — How It Differs from the Supply-Chain LC

Nama has two letters of credit that share a name but serve different purposes:

- **The Bank LC (this page)** is a *treasury/banking* instrument: it cares about your commitment to the bank — how much of your **facility limit** it reserves, the opening and amendment **fees**, and the **journal entries**. It tracks no shipments, no proforma invoices, no goods, and never touches inventory.
- **The Supply-Chain LC** (`LC > Master Files > Letter of Credit`) is an *import/procurement* process: it manages the supplier, the **shipments** (containers, bills of lading, customs), and the **proforma invoices**, and accumulates insurance, freight, and customs charges onto the goods to reach the true **landed cost**, then receives them into inventory.

In short: the Bank LC answers "what does this LC do to my facility and my ledger?", while the Supply-Chain LC answers "how do I run this import shipment and its costs all the way into the warehouse?" They are two independent features — different entities and licenses — not two views of one document.

::: info Imports and shipment management
For the full import cycle — shipments, proforma invoices, additional costs, and landed cost — see [Letters of Credit in Supply Chain](../supplychain/letters-of-credit.md).
:::

## For Support

- **"Couldn't open the LC — limit exceeded"** — the reserved amount exceeds the linked facility limit; see [Credit Facilities](./credit-facilities.md).
- **"What's the difference between initial and current values?"** — the initial ones are a snapshot of the opening terms, and the current ones reflect the latest amendment.
- **"Where do the amount, facility and fee accounts come from?"** — from the **Bank LC Opening** term; see [Document terms](./support/accounting-document-terms.md).
- The accounting-processing mechanism is in [How documents are processed into accounting effects](./support/accounting-request-processing.md).
