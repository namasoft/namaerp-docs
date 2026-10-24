---
title: Number Voucher Lines per Subsidiary and Fiscal Year
module: accounting
entities: [EntityFlow, ReceiptVoucher, PaymentVoucher]
groovy: customer-specific
description: A Groovy script that gives every receipt or payment voucher line a running number per subsidiary within the fiscal year, written to N1 and to the line's Narration.
---

<div class='entity-flows'>

# Number Voucher Lines per Subsidiary and Fiscal Year

This Groovy script gives each line of a receipt or payment voucher a running number that counts that line's subsidiary — the customer, supplier or employee on the line — within the fiscal year. The third payment to supplier S0001 this year is number 3, whatever voucher it is on.

::: warning Customer-specific example
This script works, but it is hard-wired to one setup. It overwrites the line's **N1** and **Narration**, and the text it writes is fixed as `<subsidiary code> - <fiscal year code> - <number>`. If those fields are used for something else, or the text should look different, adapt the script before you use it.
:::

| | |
|---|---|
| **Class name** | `EACreateSerialForLineSubsidiary` |
| **Script** | [EACreateSerialForLineSubsidiary.groovy](/groovy-examples/EACreateSerialForLineSubsidiary.groovy) |
| **Runs on** | Receipt Voucher or Payment Voucher, on **Validate On Save** |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Some companies number their payments to each party, so that a supplier can quote "payment 2026 - 14" and both sides know which one is meant. The voucher code cannot do this, because it counts every voucher of the book, not the payments to one party. This script keeps that per-party count on the lines themselves.

## How it works

1. **It groups the lines by subsidiary.** Lines with no subsidiary are left alone.
2. **It finds where the count stands.** For each subsidiary it looks for the latest committed voucher of the same type (payment vouchers for a payment voucher, receipt vouchers for a receipt voucher) in the same fiscal year that has a line for that subsidiary. "Latest" means the latest value date; on the same date, the one created last. Vouchers dated after the one being saved do not count. The last such line's **N1** is the count so far, or 0 when there is none.
3. **It numbers the lines.** Each line of that subsidiary, in the order of the grid, gets the next number in **N1**, and the text `<subsidiary code> - <fiscal year code> - <number>` replaces its **Narration**.

The search covers every book and every legal entity, and nothing stores the numbers apart from the lines. So the numbers are recalculated every time the voucher is saved. Saving or deleting an older voucher does not renumber the vouchers after it.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow with **Target Type** set to **Payment Voucher** (or **Receipt Voucher**).
2. Add a line to the **Details** grid with **Target Action** set to **Validate On Save**. Paste the whole script from the file above into **Groovy Script**, and leave **Class Name** empty: it is filled in when you save.
3. Save the flow. **Class Name** shows the script's class name, and the description appears in **Description**.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

## Example

A payment voucher in fiscal year 2026 pays supplier S0001 on two lines and records a third line on an expense account with no subsidiary. No earlier voucher this year carries a number for S0001.

| Line | Subsidiary | N1 | Narration after saving |
|---|---|---|---|
| 1 | S0001 | 1 | S0001 - 2026 - 1 |
| 2 | (none) | | unchanged |
| 3 | S0001 | 2 | S0001 - 2026 - 2 |

The next payment voucher to S0001 continues the count: its line gets **N1** 3 and the narration `S0001 - 2026 - 3`.

## The script

<<< @/public/groovy-examples/EACreateSerialForLineSubsidiary.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Receipt & Payment Vouchers](/modules/accounting/money-in-and-out/receipts-and-payments)

</div>
