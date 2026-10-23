---
title: Stamp and Lock the Follow-Up Lines of a Complaint
module: crm
entities: [EntityFlow, CRMComplaint]
groovy: customer-specific
description: A Groovy script that stamps each new follow-up line of a complaint with the current user's employee and today's date, and silently puts back any change made to a follow-up line that was already saved.
---

<div class='entity-flows'>

# Stamp and Lock the Follow-Up Lines of a Complaint

This Groovy script turns the **Follow Up** grid of a complaint into a log that cannot be rewritten. Every new follow-up line is stamped with the employee of the user who saves it and with today's date. A follow-up line that was already saved keeps its employee, date and remarks: if someone edits them, the old values are put back when the complaint is saved.

::: warning Customer-specific example
This script was written for one customer's setup. It takes no parameters, and the behaviour below is fixed in the source:
- The stamp always uses the employee linked to the current user and the server's date. Whatever the user typed in **Follow Up Employee** and **Follow Up Date** on a new line is replaced.
- A saved line is restored without any message.
:::

| | |
|---|---|
| **Class name** | `EAStampAndLockComplaintFollowUps` |
| **Script** | [EAStampAndLockComplaintFollowUps.groovy](/groovy-examples/EAStampAndLockComplaintFollowUps.groovy) |
| **Runs on** | Complaint - Suggestion, on **Update Calculated Fields**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A complaint (**Customer Relationship Management → Support → Complaint - Suggestion**) collects follow-ups in its **Follow Up** grid: who called the customer, when, and what was said. Some customers want that grid to be a trustworthy history. Nobody should be able to write a follow-up under a colleague's name, back-date it, or quietly reword what was recorded last week.

With this script, a user only types the remarks of a new line. The employee and the date are filled in for them, and earlier lines stay exactly as they were first saved.

## How it works

1. **It compares the grid with the saved complaint.** A line that is not in the saved complaint is new. On the first save of a complaint, every line is new.
2. **It stamps each new line.** **Follow Up Employee** becomes the employee of the current user, and **Follow Up Date** becomes today. The line's remarks are kept as typed.
3. **It restores each saved line.** For every line that was already saved, **Follow Up Employee**, **Follow Up Date** and **Remarks** are set back to their saved values. The save goes on, so the user sees no error: the edit simply does not stick.

Deleting a saved follow-up line is not prevented. The line is removed like any other.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with **Target Type** set to Complaint - Suggestion.
2. In the **Details** grid, add a line with the action **Update Calculated Fields**, and paste the whole script from the file above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Leave every parameter empty.
4. Save the flow. **Class Name** now shows `com.namasoft.modules.crm.domain.entityactions.EAStampAndLockComplaintFollowUps`.

Every user who adds follow-ups should have an employee linked to their user, because that employee is what the stamp writes.

## Example

A new complaint is saved with one follow-up line, on which the user typed employee E0002, date 01-01-2026 and the remarks *Customer called back*. The complaint is saved with the line showing the user's own employee, today's date and the remarks *Customer called back*.

Later, someone opens the complaint, changes that line's remarks to *Customer was satisfied* and its employee to E0002, and adds a second line with the remarks *Replacement sent*. After saving:

- The first line shows its original employee, date and the remarks *Customer called back* again.
- The second line shows the employee of the user who saved and today's date, with the remarks *Replacement sent*.

## Messages you may see

None. The script never refuses a save.

## The script

<<< @/public/groovy-examples/EAStampAndLockComplaintFollowUps.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Complaints](/modules/crm/support/crm-complaints)

</div>
