---
title: Clear Attendance Punches Recorded at Midnight
module: hr
entities: [EntityFlow, TimeAttendance]
groovy: recommended
description: Two Groovy scripts that clear a Time Attendance line's check-in or check-out when the attendance machine recorded it as 00:00, so a missing punch is not read as a punch at midnight.
---

<div class='entity-flows'>

# Clear Attendance Punches Recorded at Midnight

These two Groovy scripts clean up **Time Attendance** lines where the attendance machine wrote 00:00 for a punch that never happened. One clears a check-in at 00:00, the other clears a check-out at 00:00.

::: tip Recommended pattern
These scripts are not tied to any customer's setup. You can paste them as they are; they take no parameters.
:::

| | |
|---|---|
| **Class names** | `EAClearFromDateIfFromTimeIsMidnight` (check-in) and `EAClearToDateIfToTimeIsMidnight` (check-out) |
| **Scripts** | [EAClearFromDateIfFromTimeIsMidnight.groovy](/groovy-examples/EAClearFromDateIfFromTimeIsMidnight.groovy), [EAClearToDateIfToTimeIsMidnight.groovy](/groovy-examples/EAClearToDateIfToTimeIsMidnight.groovy) |
| **Runs on** | Time Attendance, on the **Pre Update Calculated Fields** event |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Some attendance machines export a day on which the employee punched only once as a full line, filling the missing side with 00:00. The **Attendance** grid of the Time Attendance document then shows, for example, **In** 05-10-2026 08:00 and **Out** 05-10-2026 00:00. The system reads that as a check-out at midnight, before the check-in, and refuses the save:

*Attendance Hours in line 2 is negative*

A check-in at 00:00 does not stop the save, but it is worse: the employee appears to have arrived at midnight and to have worked a 16-hour day.

With these scripts in place, the midnight value is removed before the system calculates anything. The line keeps the real punch and is treated like any other line with a missing check-in or check-out.

## How it works

1. **Check-in script.** For every line of the **Attendance** grid whose **In** time is exactly 00:00, it clears the **In** date and the **In** time.
2. **Check-out script.** For every line whose **Out** time is exactly 00:00, it clears the **Out** date and the **Out** time.
3. Lines with any other time are left alone. A line that loses both sides is removed by the system when the document is saved, as an empty line always is.

Both scripts run on **Pre Update Calculated Fields**, which comes before the system's own calculations and checks. The document is therefore saved with the cleaned values. See [Understanding the Record Lifecycle](/platform/entity-flows/introduction-to-entity-flows) for the order of events.

::: warning A real punch at midnight is cleared too
The scripts cannot tell a missing punch from a real one at exactly 00:00. Use them only where nobody genuinely clocks in or out at midnight, for example where no shift starts or ends at 00:00.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow.
2. Set **Target Type** to **Time Attendance** and **Target Action** to **Pre Update Calculated Fields**.
3. Add a line to the **Details** grid for each script you need. Paste the whole script into **Groovy Script** and leave **Class Name** empty: it is filled in when you save.
4. Save the flow. Each line's **Description** now explains what the script does.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |

You can use either script alone, or both on the same flow.

## Example

A machine import for 4 and 5 October 2026 brings in two lines for one employee:

| Line | In | Out |
|---|---|---|
| 1 | 04-10-2026 00:00 | 04-10-2026 16:00 |
| 2 | 05-10-2026 08:00 | 05-10-2026 00:00 |

With both scripts on the flow, the document is saved as:

| Line | In | Out |
|---|---|---|
| 1 | *(empty)* | 04-10-2026 16:00 |
| 2 | 05-10-2026 08:00 | *(empty)* |

The employee now has a check-out without a check-in on the 4th and a check-in without a check-out on the 5th, which is exactly what happened.

## Messages you may see

The scripts raise no messages of their own. These are the messages they help you avoid. The first has no Arabic translation, so it appears in English on Arabic screens as well.

| Message | Why | What to do |
|---|---|---|
| *Attendance Hours in line {0} is negative* | A line's **Out** comes before its **In**, typically an **Out** of 00:00 on the same date. | Add the check-out script to the flow, then save again. |
| *Attendance Hours in line {0} is greater than Maximum allowed attendance hours* — «ساعات الحضور في السطر {0} أكبر من أقصى عدد ساعات حضور متواصل» | A line covers more hours than the HR configuration allows, which a check-in recorded as 00:00 can cause. | Add the check-in script to the flow, then save again. |

## The script

The check-in script:

<<< @/public/groovy-examples/EAClearFromDateIfFromTimeIsMidnight.groovy{groovy}

The check-out script:

<<< @/public/groovy-examples/EAClearToDateIfToTimeIsMidnight.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Time Attendance](/modules/hr/attendance/time-attendance)
- [Treat a Late Check-In as a Check-Out](/entity-flows/groovy/EATimeAttendanceMakeInOutIfBeforeTime): another clean-up script for machine imports.

</div>
