---
title: Cap a Yearly Allowance per Employee on Payment Requests
module: accounting
entities: [EntityFlow, PVRequest, DetailedRemark]
groovy: customer-specific
description: A Groovy script that checks payment requests against a yearly allowance per employee, per item and in total, for example a staff medical allowance, and writes the running totals on each line.
---

<div class='entity-flows'>

# Cap a Yearly Allowance per Employee on Payment Requests

This Groovy script turns the payment request into the tool for a yearly staff allowance, such as a medical allowance. Every claim is checked against what the same employee has already been paid this year, item by item and in total, and a claim that goes over the limit is refused.

::: warning Customer-specific example
This script works, but it is hard-wired to one setup:
- It applies only when **Paid From** is the record with code `health` (the line `EntityCodeDF.fromString("health")`). Change that code to your own cash box or bank account.
- It uses the request lines' **To**, **Ref 1**, **N1**, **N2** and **N3**, and the detailed remark's **N1**, for fixed purposes, as described below.

Adapt the script before you use it if any of these differ in your setup.
:::

| | |
|---|---|
| **Class name** | `EAYearlyLimitPerEmployeeInPVRequest` |
| **Script** | [EAYearlyLimitPerEmployeeInPVRequest.groovy](/groovy-examples/EAYearlyLimitPerEmployeeInPVRequest.groovy) |
| **Runs on** | Payment Request, on **Validate On Save** |
| **Uses** | Parameter 2. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Suppose a company covers its staff's medical bills up to a yearly limit: up to 300 a year for glasses, up to 500 for dental care, and never more than 1,000 a year in total for one employee. Claims are paid from a dedicated cash box with code `health`, through payment requests. Each line of a request is one claim: the employee in **To**, the kind of claim in **Ref 1**, and the amount.

Without help, somebody has to add up each employee's earlier claims by hand before approving a new one. This script does it on every save and refuses the request when a limit is crossed.

## How it works

1. **It checks that this is an allowance request.** If **Paid From** is not the record with code `health`, the script does nothing.
2. **It checks the lines.** Every line must have an employee in **To** and a detailed remark in **Ref 1**. The detailed remark is the kind of claim, and its **N1** is the yearly maximum per employee for that kind.
3. **It collects this year's earlier claims.** It reads the committed payment requests dated in the same calendar year as this one, paid from the same **Paid From**, that have a line for one of this request's employees.
4. **It writes the running totals on each line:**
   - **N1**: the employee's total for that kind of claim this year, including this line and the lines above it.
   - **N2**: the yearly maximum for that kind, from the detailed remark.
   - **N3**: what is left, N2 minus N1. It is negative when the maximum is exceeded.
5. **It refuses a line over the maximum.** A line whose N1 is more than N2 is refused, with the message on that line.
6. **It checks each employee's yearly total.** Adding all kinds of claims together, an employee's total for the year, this request included, must not exceed Parameter 2.

## Setting it up

1. For each kind of claim, create a **Detailed Remark** and put its yearly maximum per employee in **N1**. A detailed remark with no N1 allows nothing.
2. Open **Administration → Display Customization → Entity Flow** and create a new flow with **Target Type** set to **Payment Request**.
3. Add a line to the **Details** grid with **Target Action** set to **Validate On Save**. Paste the whole script from the file above into **Groovy Script**, and leave **Class Name** empty: it is filled in when you save.
4. Fill in the parameters:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Yearly Maximum | The most one employee may receive in a year, all kinds of claims together, for example `1000`. Always fill it in. |

5. Save the flow. **Class Name** shows the script's class name, the description appears in **Description**, and the parameter shows its title.

## Example

The detailed remark `GLASSES` (*Glasses*) has N1 = 300 and `DENTAL` (*Dental*) has N1 = 500. A first request paid from `health` has three lines:

| To | Ref 1 | Amount | N1 | N2 | N3 |
|---|---|---|---|---|---|
| Employee E0001 | Glasses | 200 | 200 | 300 | 100 |
| Employee E0001 | Dental | 100 | 100 | 500 | 400 |
| Employee E0002 | Glasses | 250 | 250 | 300 | 50 |

It is saved. A second request then claims 150 for glasses for E0001. E0001's glasses total would become 350, more than 300, so the save is refused with:

*The employee E0001 - Mohamed Ahmed El Shennawy total 350 for item GLASSES - Glasses exceeded the defined yearly maximum 300*

## Messages you may see

None of these messages has an Arabic translation, so they appear in English on Arabic screens as well.

| Message | Why | What to do |
|---|---|---|
| *The employee {0} total {1} for item {2} exceeded the defined yearly maximum {3}* | The employee's total this year for that kind of claim, this line included, is more than the detailed remark's N1. | Lower the amount, or raise the detailed remark's N1 if the limit has changed. |
| *The yearly total {0} for employee {1} is more than configured value {2}* | The employee's total for the year, all kinds of claims together, is more than Parameter 2. | Lower the amount, or raise Parameter 2 on the flow. |
| *The ref {0} must be an employee at line {1}* | **To** on that line is not an employee. | Choose the employee in **To**. |
| *The ref {0} must be a detailed remark at line {1}* | **Ref 1** on that line is not a detailed remark. | Choose the kind of claim in **Ref 1**. |

An empty **To** or **Ref 1** is refused with the system's usual message for a required field.

## The script

<<< @/public/groovy-examples/EAYearlyLimitPerEmployeeInPVRequest.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Receipt & Payment Vouchers](/modules/accounting/money-in-and-out/receipts-and-payments): payment requests and the vouchers made from them.

</div>
