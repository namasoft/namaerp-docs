---
title: Send One Account's Ledger Lines in Local Currency at Rate 1
module: accounting
entities: [EntityFlow, JournalEntry]
groovy: recommended
description: A Groovy script that rewrites the ledger lines of one account in the local currency at rate 1, just before a document sends its accounting request.
---

<div class='entity-flows'>

# Send One Account's Ledger Lines in Local Currency at Rate 1

This Groovy script changes the ledger lines of one chosen account just before a document sends its accounting request: a line entered in a foreign currency is rewritten as its local amount, in local currency, at rate 1. Every other account on the document keeps its foreign currency and rate.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is and control it entirely through its parameters.
:::

| | |
|---|---|
| **Class name** | `EASetTransCurrencyToLocalCurrencyAndRateOne` |
| **Script** | [EASetTransCurrencyToLocalCurrencyAndRateOne.groovy](/groovy-examples/EASetTransCurrencyToLocalCurrencyAndRateOne.groovy) |
| **Runs on** | Any document that has an accounting effect, at the moment it sends its accounting request. |
| **Uses** | Parameter 2. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Each ledger line remembers the currency it was entered in. When a document is entered in US dollars at a rate of 50, every one of its lines carries *100 USD at 50*, even on an account the company only ever follows in Egyptian pounds. Statements and reports that work in the transaction currency then show dollar amounts on an account where nobody expects them.

This script lets one such account be recorded in local currency only. Suppose the expense account `53010202` (maintenance) should always read in pounds. A journal entry in dollars debits it with 100 USD at 50 and credits another account with the same amount. With the script set to `53010202`, the maintenance line is sent as *5,000 EGP at rate 1*. The other line stays *100 USD at 50*. The local amounts, and so the balances in local currency, do not change at all.

## How it works

1. **It waits for the accounting request.** The script does something only at the moment a document sends its accounting request (**Pre Send Business Request**). At every other moment it returns at once, and it ignores the document's inventory requests.
2. **It finds the account's lines.** It goes through the request's lines and picks those whose account code is the one in Parameter 2.
3. **It rewrites each foreign amount.** For a debit or credit whose rate is not 1, the amount becomes the line's local amount, the currency becomes the account's currency, and the rate becomes 1. A line that is already at rate 1, or that has no amount, is left alone.
4. **It combines matching lines.** If anything changed, lines that now match each other are combined into one, as the system does when it shortens a ledger.

The document itself is not changed. Only the accounting effect it creates is.

::: warning Only for an account kept in local currency
The script takes the currency from the account: the account's own **Currency**, or the ledger's main currency when the account has **Use Transaction Local Currency** ticked. On an account kept in a foreign currency, the line would get the local amount labelled with the foreign currency, which is wrong. Use it only for accounts whose currency is the local one.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow. Set **Target Type** to the document whose accounting effect should change, for example **Journal Entry**. Use an **Entity Type List** to cover several documents with one flow.
2. Add a line to the **Details** grid. Paste the whole script from the file above into **Groovy Script**, and leave **Class Name** empty: it is filled in when you save.
3. Fill in the parameters:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Account Code | The code of the account to send in local currency, for example `53010202`. |

4. Save the flow. **Class Name** shows the script's class name, the description appears in **Description**, and the line's **Target Action** becomes **Automatic** whatever you chose. That is expected: the script asks the system to call it at every moment and checks for itself that the accounting request is being sent.

## Example

A journal entry dated today, in US dollars at a rate of 50:

| Account | Debit | Credit |
|---|---|---|
| `53010202` Maintenance and repair | 100 USD | |
| `42010202` Other revenues | | 100 USD |

With the script set to `53010202`, the ledger lines the entry creates are:

| Account | Transaction amount | Currency | Rate | Local amount |
|---|---|---|---|---|
| `53010202` | 5,000 | EGP | 1 | 5,000 |
| `42010202` | 100 | USD | 50 | 5,000 |

Without the script, both lines would read 100 USD at 50.

## The script

<<< @/public/groovy-examples/EASetTransCurrencyToLocalCurrencyAndRateOne.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Introduction to Entity Flows](/platform/entity-flows/introduction-to-entity-flows): the **Pre Send Business Request** moment.
- [Accounts](/modules/accounting/ledger-setup/accounts)

</div>
