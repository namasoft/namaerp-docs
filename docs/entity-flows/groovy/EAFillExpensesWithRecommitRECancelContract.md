---
title: Rebuild a Cancel Contract's Expense Lines From the Lease
module: realestate
entities: [EntityFlow, RECancelContract]
groovy: recommended
description: A Groovy script that clears the Expense grid of a real-estate Cancel Contract and rebuilds it from the lease's non-installment lines every time the document is saved.
---

<div class='entity-flows'>

# Rebuild a Cancel Contract's Expense Lines From the Lease

This Groovy script refills the **Expense** grid of a real-estate **Cancel Contract** from the lease it ends. Every line of the lease that is not a rent installment — insurance, commission, water, maintenance and the other charges — is copied into the grid again each time the document is saved.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is; it takes no parameters.
:::

| | |
|---|---|
| **Class name** | `EAFillExpensesWithRecommitRECancelContract` |
| **Script** | [EAFillExpensesWithRecommitRECancelContract.groovy](/groovy-examples/EAFillExpensesWithRecommitRECancelContract.groovy) |
| **Runs on** | Cancel Contract, on **Pre Update Calculated Fields** |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

When a lease is ended with the **Cancel Rent Contract** button on the lease, the new Cancel Contract arrives with its Expense grid already filled from the lease. That filling is done by the button. A Cancel Contract that reaches the system another way, for example by import, arrives with whatever Expense lines it was given. And a lease line added after the Cancel Contract was made is not picked up at all.

This script closes both gaps. Whenever the Cancel Contract is saved, including when it is recommitted, its Expense grid is rebuilt from the lease as it is now.

## How it works

1. **It reads the lease.** It takes the rent contract in **From Document**. If there is none, nothing changes.
2. **It empties the Expense grid.** Every line already in the grid is removed, including lines typed by hand.
3. **It copies the lease's other lines.** Each line of the lease whose type is not *Installment* becomes a new Expense line, with the lease line's code, amount, net value, due date, to date, type and expense type.

Because the grid is emptied first, anything changed by hand in it is lost at the next save. If users adjust the settled amounts in the grid, put the script on a **Manual** line instead, and run it only when the grid should be rebuilt.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow with **Target Type** set to **Cancel Contract**.
2. Add a line to the **Details** grid with **Target Action** set to **Pre Update Calculated Fields**, so that the document's totals are calculated from the rebuilt lines. Paste the whole script from the file above into **Groovy Script**, and leave **Class Name** empty: it is filled in when you save.
3. Save the flow. **Class Name** shows the script's class name, and the description appears in **Description**.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

## Example

A lease has four quarterly rent lines of type *Installment* and one *Insurance* line, `INS1`, of 10,000 due on 01-06-2026. A Cancel Contract is imported for it, with the lease in **From Document** and no Expense lines. When it is saved, the Expense grid holds one line: `INS1`, type *Insurance*, amount 10,000, net value 10,000, due 01-06-2026. The four rent lines are not copied.

## The script

<<< @/public/groovy-examples/EAFillExpensesWithRecommitRECancelContract.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Renewing and Ending a Lease](/modules/realestate/rent/realestate-rent-renewal-and-termination#Ending-a-lease-the-termination-document): what the Cancel Contract settles.

</div>
