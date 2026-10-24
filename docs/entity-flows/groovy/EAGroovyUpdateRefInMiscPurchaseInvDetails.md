---
title: Tick a Line Flag on Every Line That Shares a Reference
module: accounting
entities: [EntityFlow, MiscPurchaseInvoice]
groovy: recommended
description: A Groovy script for the miscellaneous invoice that ticks a yes/no line field on every line sharing the reference of the first ticked line, and unticks it everywhere else. Both fields are chosen through parameters.
---

<div class='entity-flows'>

# Tick a Line Flag on Every Line That Shares a Reference

This Groovy script keeps a yes/no field consistent across the lines of a miscellaneous invoice. The user ticks the field on one line; when the invoice is saved, every line with the same reference gets it ticked too, and every other line gets it unticked.

::: tip Recommended pattern
This script is not tied to any customer's setup. Both the yes/no field and the reference field are passed in as field ids, so the same script works for any pair of line fields.
:::

| | |
|---|---|
| **Class name** | `EAGroovyUpdateRefInMiscPurchaseInvDetails` |
| **Script** | [EAGroovyUpdateRefInMiscPurchaseInvDetails.groovy](/groovy-examples/EAGroovyUpdateRefInMiscPurchaseInvDetails.groovy) |
| **Runs on** | Miscellaneous Invoice, on **Update Calculated Fields** |
| **Uses** | Parameter 2 and Parameter 3. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A miscellaneous invoice often carries several lines for the same thing: three lines for the same purchase element, or several lines for the same project in **Ref 1**. When a flag on the line has to mean "this group", for example *include in the monthly recharge*, ticking it line by line is slow and easy to get half right. With this script the user ticks it on one line of the group, and the save does the rest.

The script is also a small example of a pattern that is useful in many Groovy flows: the fields it works on are not written into the code but read from the parameters, so one script serves many setups.

## How it works

1. **It finds the first ticked line.** It goes through the lines in order and stops at the first one whose yes/no field (Parameter 2) is ticked. If no line is ticked, nothing changes.
2. **It takes that line's reference.** It reads the field named in Parameter 3 on that line.
3. **It sets the flag on every line.** Each line whose Parameter 3 field holds the same value is ticked. Every other line is unticked, including lines the user had ticked themselves.

Only the first ticked line counts. If the user ticks lines from two different groups, the group of the upper line wins and the other group is unticked.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow with **Target Type** set to **Miscellaneous Invoice**.
2. Add a line to the **Details** grid with **Target Action** set to **Update Calculated Fields**. Paste the whole script from the file above into **Groovy Script**, and leave **Class Name** empty: it is filled in when you save.
3. Fill in the parameters. Both take the field id of a line field, not its label:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Yes/No line field id - eg: b1 | The yes/no line field to keep consistent, for example `b1` for the line's first yes/no field. |
| Parameter 3 | Reference line field id - eg: ref1 | The line field that defines the group, for example `ref1`, or `purchaseElement` for the purchase element. |

4. Save the flow. **Class Name** shows the script's class name, the description appears in **Description**, and each parameter shows its title. Saving is refused with *Parameter {0} can not be empty* when Parameter 2 or Parameter 3 is empty.

## Example

With Parameter 2 set to `b1` and Parameter 3 set to `purchaseElement`, the user enters these lines and ticks **b1** on lines 2 and 3:

| Line | Purchase element | b1 as entered | b1 after saving |
|---|---|---|---|
| 1 | Cleaning | | |
| 2 | Security | ✓ | ✓ |
| 3 | Cleaning | ✓ | |
| 4 | Security | | ✓ |

Line 2 is the first ticked line, so the group is *Security*. Line 4 is ticked because it is *Security* too, and line 3 is unticked because it is not.

## The script

<<< @/public/groovy-examples/EAGroovyUpdateRefInMiscPurchaseInvDetails.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Misc Purchasing & Machine Rent](/modules/accounting/money-in-and-out/misc-purchasing)

</div>
