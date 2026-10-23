---
title: Show What the System Thinks Each Day Is for an Employee
module: hr
entities: [EntityFlow, AttendancePlan, AttendanceShift, Employee]
groovy: recommended
description: A Groovy diagnostic that lists, day by day, the attendance shift the system finds for an employee and whether each day counts as a holiday, a weekend or a weekly rest day.
---

<div class='entity-flows'>

# Show What the System Thinks Each Day Is for an Employee

This Groovy script is a support diagnostic. For one employee and a range of dates, it lists one line per day naming the attendance shift the system finds for that day, and whether the day counts as a holiday, a weekend or a weekly rest day. It changes nothing.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is and control it entirely through its parameters.
:::

| | |
|---|---|
| **Class name** | `EAFindDaysInfoForEmployee` |
| **Script** | [EAFindDaysInfoForEmployee.groovy](/groovy-examples/EAFindDaysInfoForEmployee.groovy) |
| **Runs on** | Any record, as a **Manual** flow |
| **Uses** | Parameters 2 to 4. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Most attendance complaints come down to one question: what did the system think that day was? An employee is marked absent on a Friday, or gets overtime on a day HR considers a normal working day, or a lateness deduction appears on a public holiday. The answer depends on several documents at once: the attendance plans that cover the employee, their priorities and added shifts, the weekend lines, and the holiday definitions.

This script asks the system directly and prints the answer, so you can see in seconds whether the problem is in the plan, in the weekend setup or somewhere else.

## How it works

1. **It finds the employee** whose code is in Parameter 2.
2. **It walks through the days** from the date in Parameter 3 to the date in Parameter 4, one day at a time.
3. **For each day** it reads the attendance plan lines that cover the employee on that day, and for each one it reports:
   - the code of the shift,
   - whether the day is a holiday,
   - whether it is a weekend,
   - whether it is a weekly rest day.

   A plan line with no shift is reported as *There is no attendance for employee …*. A day that no plan covers produces no line at all.
4. **It reports everything as an error.** That is deliberate: an error is the simplest way for a script to show text on screen. Because the run is reported as failed, nothing is saved.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a new flow.
2. Set **Target Type** to any screen you have open often, for example **Employee**, and **Target Action** to **Manual**.
3. In the **Details** grid, paste the whole script into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
4. Fill in the parameters and save the flow.
5. Add the flow to the screen through **Edit Screen**, in the "Actions and Notifications" table, as for any [manual flow](/platform/entity-flows/introduction-to-entity-flows#Manual----Manual-Execution). Then open any record on that screen and run the flow.

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Employee Code | The employee's code, for example `E0003`. Required. |
| Parameter 3 | From Date (yyyy-MM-dd) | The first day to check, written year-month-day, for example `2026-10-08`. If it is empty or cannot be read, today is used. |
| Parameter 4 | To Date (yyyy-MM-dd) | The last day to check, in the same format. If it is empty, only the From Date is checked. |

To check another employee or another period, change the parameters on the flow and save it again.

## Example

With Parameter 2 set to `E0003`, Parameter 3 to `2026-10-08` and Parameter 4 to `2026-10-10`, running the flow shows:

```
Employee E0003 at date 2026-10-08 was at attendance shift with code SH-DAY (holiday: false , week end : false , week rest : false)
Employee E0003 at date 2026-10-09 was at attendance shift with code SH-DAY (holiday: false , week end : false , week rest : true)
Employee E0003 at date 2026-10-10 was at attendance shift with code SH-DAY (holiday: false , week end : false , week rest : true)
```

Thursday the 8th is a normal working day on the shift `SH-DAY`. Friday and Saturday are weekly rest days for this employee. If HR expected Saturday to be a working day, check the weekly rest and weekend settings of the shift and of the attendance plan.

Each line is shown under the usual heading of a failed flow:

*Error while running entity flow {0} for entity {1} - {2}:-* — «خطأ أثناء تشغيل مسار الكيان {0} للسجل {1} - {2}:-»

## Messages you may see

None of the script's messages has an Arabic translation, so they appear in English on Arabic screens as well.

| Message | Why | What to do |
|---|---|---|
| *Employee {0} at date {1} was at attendance shift with code {2} (holiday: {3} , week end : {4} , week rest : {5})* | The normal answer: one line per day and per plan line. | Read it. Nothing needs fixing. |
| *There is no attendance for employee {0} at date {1}* | A plan line covers the employee on that day but has no shift. | Fill the shift on the attendance plan, if the employee should have one. |
| *Could not found employee with code {0}* | No employee has the code in Parameter 2. | Correct the code on the flow and save it again. |
| *Parameter {0} can not be empty* | Parameter 2 was left empty when the flow was saved. | Enter the employee code. |

## The script

<<< @/public/groovy-examples/EAFindDaysInfoForEmployee.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Attendance Plans & Shifts](/modules/hr/attendance/attendance-plans-and-shifts)
- [Time Attendance](/modules/hr/attendance/time-attendance)

</div>
