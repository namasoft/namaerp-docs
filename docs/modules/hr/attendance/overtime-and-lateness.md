---
description: "How HR attendance measures overtime, lateness, early leave and missing punches from punches and shifts, how days off and holidays are handled, and the settings that change each result."
entities: [TimeAttendance, AttendancePlan, PerformanceIndicator, AttendanceIndicatorWaiver]
---

# Overtime and Lateness

Two punches and a shift produce a surprising number of arguments. The employee says they worked
three hours extra; the system says their overtime is zero. Or the opposite: someone came in on their
day off and the system credits them with the whole day, mission time and overtime both. Neither is a
fault — they are two different branches of the same calculation, and which one runs depends on what
kind of day it was and on two or three settings that are easy to miss.

This page is about how the hours are **measured**. What happens to them afterwards — how an overtime
figure becomes money on a payslip — belongs to
[Performance Indicators](/modules/hr/performance/performance-indicators) and
[Salary Calculation Formulas](/modules/hr/payroll/salary-calculation-formulas), and is only
summarised at the end here.

## The figures the day produces

Punches are raw. Whether they come from a machine through
[Time Attendance](/modules/hr/attendance/time-attendance) or from the mobile app as electronic
attendance, they are rolled up into **one record per employee per day** — *Employee Attendance
Information* («معلومات الحضور والإنصراف»), which you reach as a list from the Time Attendance
screen and can filter by employee and date range.

That daily record answers what kind of day it was — vacation, holiday, weekly day off, mission,
absence, an added shift — and then carries the day's net figures:

| Figure | What it is |
|---|---|
| **Net working hours** | Hours actually worked, after all the corrections below. |
| **Net overtime** | The extra hours, calculated by one of the two rules in the next section. |
| **Net late time** | Lateness at the start of a shift. |
| **Net early leave** | Leaving before the shift's last out time. |
| **Net early arrival** | Arriving before the shift starts. This is recorded, but it is not overtime. |
| **Net mission time** | Hours covered by a mission document. |
| **Net excuse time** | Hours covered by a leave permission. |
| **Net partial vacation time** | Hours covered by a partial vacation. |
| **First in / last out** | The day's earliest punch-in and latest punch-out. |

Underneath the net figures the same set is kept **three times**, once per shift part — a working day
can have up to three time ranges, and every figure (expected hours, actual hours, overtime, late
arrival, early leave, early arrival, mid-day out time, excuse time, mission time, and the no-check-in
/ no-check-out flags) is held per part. That is why the system indicators come in
`Shift1`/`Shift2`/`Shift3` flavours as well as day totals.

::: warning Several of these columns carry no English or Arabic label
The net columns were only ever translated into French, so on an English or Arabic screen a few of
them show their internal name instead of a caption. The order is the one in the table above.
:::

![An Attendance Plan and the employees it covers](../../../ar/modules/hr/images/attendance/attendance-plan-en.png)

## The two ways overtime is measured

One switch on [HR Configuration](/modules/hr/setup/hr-configuration) decides which rule runs:
**Over Time calculated after last Work Time** («حساب الوقت الإضافي من إنتهاء الدوام»)
`value.overTimeAfterWorkTime`. It is **off** by default.

**Off — hours beyond the expected hours.** The system adds up what the employee actually worked in
the shift and subtracts the shift's expected hours. If the result is positive, that is the overtime.
An employee whose shift is eight hours, who arrives an hour late and leaves two hours late, has
worked eight hours and gets **no overtime at all** — which is the single most common reason for "the
system swallowed my overtime". The lateness is recorded separately, and the late hour and the late
departure cancel out.

**On — only time after the shift ends.** Overtime starts at the shift's official end (or at the
punch-in, if the employee arrived after the shift had already ended) and runs to the actual
punch-out. The same employee, one hour late and two hours late leaving, now gets **two hours** of
overtime and an hour of lateness. Choose this rule when staying late is what earns overtime and
arriving early or working through a break does not.

Under this rule the shift day's **Latest Allowed Time After Shift End** caps the overtime: when it is filled, overtime runs to the punch-out or to that time, whichever comes first. A shift ending at 17:00 with a latest allowed time of 20:00 gives an employee who punches out at 22:00 three hours of overtime, not five. A latest time earlier than the shift end is read as the next day, for night shifts.

::: tip Which rule do you want?
"Hours beyond expected" rewards total time and forgives a late arrival that was made up later. "Time
after the shift" rewards staying late specifically and never lets a late arrival be worked off. Most
customers who complain about overtime disappearing are on the first rule and expected the second.
:::

Two more settings decide what counts as worked time before that subtraction happens:

- **Consider Leave Permission in Overtime Calculation** `value.leavePermissionAddsOvertime` — the
  hours covered by a leave permission are added to the worked hours. Without it a permission simply
  reduces the day.
- **Consider Missions in Overtime Calculation** `value.missionsAddsOvertime` — mission hours are
  added to the worked hours.

Both only apply under the "hours beyond expected" rule. Under "time after the shift", overtime is
measured from the clock, and neither permissions nor missions enter into it.

## Days that are not working days

On a weekly day off, a holiday or a vacation day, there are no expected hours to subtract, so the
rule changes completely: **every punched hour becomes overtime**, and no lateness, early leave or
early arrival is calculated at all. The same happens on any day the employee has no shift.

Two options let you take holidays and vacations out of that rule:

- **Calculate Normal Work Hours For Holidays (Overtime will not be all day)**
  `value.calculateNormalWorkHoursForHolidays`
- **Calculate Normal Work Hours For Vacations (Overtime will not be all day)**
  `value.calculateNormalWorkHoursForVacations`

Switch either on and that kind of day is measured like an ordinary working day instead.

::: danger There is no equivalent option for the weekly day off
Weekends and weekly rest days are **always** treated as all-overtime days. Whatever you set for
holidays and vacations, work on a day off is credited in full as overtime, and there is no setting
that changes it. This is deliberate, but it catches people who assume the three day types behave
alike.
:::

**A mission on a day off produces equal overtime and mission time.** When the day is a rest day, a
holiday or a vacation and *Consider Missions in Overtime Calculation* is on, the day's overtime is
**set to** the mission time rather than added to it. So a three-day delivery run that crosses a
Friday shows that Friday with, say, nine hours of mission time and nine hours of overtime — the same
nine hours reported in two columns, not eighteen hours of credit. Neither figure is wrong: the
employee worked their day off. If that ends up paying twice, the fault is in how the salary
components read the two indicators, not in the attendance figures. Rest-day work is best separated
by **indicator type** — `OverTime In Week Ends` and `Hours Missions` are different indicators
precisely so they can be priced differently.

A related trap lives on the indicator rather than the document: the indicator flag
*Not Included In Week Ends* zeroes the whole indicator for that day type, so it also throws away
ordinary punched rest-day overtime. It is not a mission switch. See
[Leave Permissions and Missions](/modules/hr/attendance/leave-permissions-and-missions).

## Hours outside official working time

When a day has no time ranges at all — no shift to measure against — the setting
**unOfficial Working Time** `value.unOfficialWorkingTime` decides what the punches are worth:

| Value | Result |
|---|---|
| **Ignore** | The hours are dropped. |
| **OverTime** | They are added to the day's overtime. |
| **Normal** | They are added to the day's actual worked hours. |

## Lateness, early leave and the gaps in between

On a working day, four separate figures are measured against the shift's time range:

**Late arrival** — the time between the shift's start and the actual punch-in. It is only measured
when the employee punched in after the shift started, and it has one important correction: if the
line immediately before the attendance is an **excuse** — a leave permission covering the same shift
range — the excused time is subtracted before the lateness is recorded.

That correction has a stronger form. When **Leave Permission Starts The Day**
`value.leavePermissionStartsTheDay` is on and the preceding record is a leave permission, **no
lateness is recorded at all**. Its label spells out what it means: *(Late arrival does not consider
time between leave end and actual attendance start)*. This is the setting for the employee who has a
permission to arrive at ten, arrives at ten past, and should not be marked late for the ten minutes.

**Early arrival** — the time between the punch-in and the shift's start, when the employee arrives
early. It is recorded as its own figure. It is **not** overtime under either rule, though it does
increase actual worked hours, which can produce overtime indirectly under the "hours beyond
expected" rule. When the shift day has an **Earliest Allowed Time Before Shift Start**, early arrival
is counted only from that time: with a shift starting at 08:00 and an earliest allowed time of 07:30, a
punch-in at 06:45 records thirty minutes of early arrival.

**Early leave** — the time between the actual punch-out and the shift's last out time. As with
lateness, an excuse on the **following** record that falls inside the same shift range is subtracted
first, so a permission to leave an hour early does not also count as an hour of early leave.

**Mid-day out time** — the gaps in the middle: the time between a punch-out and the next punch-in
within the same shift. This is what catches an employee who leaves for two hours in the afternoon
and comes back, where neither lateness nor early leave applies.

## Missing punches

A punch-in with no punch-out (or the reverse) leaves the day incomplete, and the system flags it
rather than guessing: the day carries **no check-in** and **no check-out** flags, both per shift
part and for the day. There are two ways to resolve them.

**A Forgot Check Out permission.** A leave permission of the *Forgot Check Out* type suppresses the
no-check-out flag for that day — which is how the employee's own explanation gets into the record
instead of a manual edit of the punches.

**Automatic pairing.** **Merge Lines Missing Punch In With Lines Missing Punch Out**
`value.mergeLinesMissingPucnhInOrOut` pairs an orphaned punch-in with an orphaned punch-out, as long
as the gap between them is no more than **Max Difference In Hours To Merge Lines Missing Punch In Or
Out** `value.maxDiffInHoursToMergeLinesMissingPucnhInOrOut`, which ships at **18** hours. Turn this
on where a reader drops punches regularly; leave it off where you would rather see the gap and have
a supervisor account for it.

Two other settings shape how punches are attached to a day at all — the window before the shift
within which an early punch still belongs to that work day (**Consider Arrival Time For Work Day
When Arriving Before Attendance Time With Period**, 2 hours) and the window after it
(**Do Not Consider Arrival Time For Work Day When Arriving After Departure Time With Period**, 10
hours) — and **Max Continuous Attendance Hours**, 23 by default, above which a line is treated as an
error rather than a very long shift. All three are on
[HR Configuration](/modules/hr/setup/hr-configuration).

## When the day is several things at once

A date can be a public holiday, a weekly day off and a vacation day simultaneously, and since the
day type decides whether the whole attendance is overtime, the tie has to be broken. Four settings
do it, and they ship generously — holiday wins over both a day off and a vacation, and a vacation
wins over a day off. The full table is in
[When two day types collide](/modules/hr/setup/hr-configuration#When-two-day-types-collide).

Overlapping **records** are a different problem with a different answer. An attendance line, a
mission, a leave permission and a partial vacation can all cover the same minutes; *Handle Overlap
Between Attendance, Missions, and Leave Permissions* is on by default and resolves them by priority,
which ships as mission first, then attendance, then permission, then partial vacation. Switch it off
and the same hours are counted — and paid — more than once.

## From hours to money

Nothing on the attendance record touches a payslip by itself. The route is always the same:

1. The day's figures are measured, as above.
2. A **Performance Indicator** of the System type names one of the built-in readings — `OverTime`,
   `OverTime Normal Day`, `OverTime In Week Ends`, `OverTime In Holidays`, `OverTime In Vacations`,
   `OverTime Shift1`…`3` for the overtime side, and `Late Hours`, `Late Arrival Shift1`…`3`,
   `Early Leave`, `Under Time` and the missing-punch readings for the deduction side.
3. Optionally a **System Indicator Approval** clamps and signs off the measured value before it
   counts — the usual guard against an unreviewed overtime reading inflating pay.
4. A **Salary Calculation Formula** of the *Related To Performance Indicator* type turns the
   approved figure into an addition or a deduction on the salary document.

Each of those steps is documented on
[Performance Indicators](/modules/hr/performance/performance-indicators).

::: tip Diagnosing "the overtime is wrong" in order
1. Open the day on *Employee Attendance Information* and check what kind of day the system thinks it
   was — vacation, holiday, weekly day off or ordinary. That alone decides which rule ran.
2. Compare the day's actual hours against its expected hours. Under the default rule there is no
   overtime until the first exceeds the second.
3. Check whether *Over Time calculated after last Work Time* is on. It changes the answer completely.
4. Check whether the permission and mission switches are on, if either is involved in the day.
5. Only then look at the indicator: its Shift Type, its *Not Included In Week Ends* flag, and
   whether an approval document capped it.
:::

## Excusing a day: Attendance Indicator Waiver

Sometimes a reading is correct but should not cost the employee anything — a missed check-out on
the day the fingerprint machine was down, or an absence HR has agreed to overlook. Rather than
editing punches, record an **Attendance Indicator Waiver** (إعفاء من مؤشرات الحضور) at
**Payroll > Performance Indicators > Attendance Indicator Waiver**. Each line names an **Employee**,
a **Waiver Date** and either a **Performance Indicator** or a **System Indicator** (one or the other,
never both). When the indicators are calculated, that indicator reads zero for that employee on that
day; every other indicator and every other day is untouched.

The header carries the same four fields as a shortcut: fill the employee, date or indicator there
and every line takes it on save, so one document can waive many indicators for one employee, or one
indicator for many employees. Only saved waivers count, and a waiver saved after the indicators were
calculated takes effect the next time they are calculated.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Employee {0} has no attendance plan on day {1}* — «الموظف {0} ليس له خطة دوام في اليوم {1}» | A leave permission, mission or vacation document covers a day on which the employee has no attendance plan, and the matching *Prevent … With In No Attendence Plan* option is on. | Give the employee a plan covering those dates. If a plan exists but is not matching, check the six dimension switches that control attendance-plan matching. |
| *Employee {0} has no Attendance Plan in {1}* — «الموظف {0} ليس له خطة دوام في يوم {1}» | The same gap, found while attendance was being calculated rather than while a document was being saved. Without a plan there are no expected hours, so neither overtime nor lateness can be measured. | Create or extend the plan for that period, then recalculate attendance. |
| *Leave permission {0} overlaps with {1} for the employee {2}, From Date {3}* — «إذن الإنصراف {0} يتداخل مع إذن الإنصراف {1} للموظف {2} من تاريخ {3}» | Two leave permissions cover the same time for one employee. | Shorten or delete one of them. Overlapping permissions would otherwise both be excused against the same lateness. |
| *Full day mission must include week ends* | A full-day mission was saved with *Not Include Week Ends* ticked. A full-day mission runs round the clock from its start date to its end date, so every day in between was worked, weekly rest days included. | Clear *Not Include Week Ends*. Use it only for a multi-day hours-based mission. No Arabic text exists for this message. |
| *Cannot calculate indicator {0} for employee {1}* | The attendance figures could not be turned into an indicator value — most often because the day has no plan or the employee has no HR information for the period. | Check the employee's attendance plan and HR information for those dates, then recalculate. No Arabic text exists for this message. |
| *The employee {0} has a repeated attendance code {1}, please change it* | Two employees share one attendance machine code, so a punch cannot be attributed. | Give one of them a different code. If the duplication is across companies, *Consider Legal Entity To Find Employee* on the configuration resolves it without renumbering. No Arabic text exists for this message. |
| *Could not find employee with attendance machine code {0}* | A punch arrived with a code no employee carries. | Add the code to the right employee's HR information, or correct the machine. No Arabic text exists for this message. |
| *This document can not be used if the option manual attendance is selected* | *Attendance Manual Calculation* is on and this document only works with automatic calculation. | Switch manual calculation off, or stop using the document. No Arabic text exists for this message. |

## Related pages

- **[Time Attendance](/modules/hr/attendance/time-attendance)** — where the punches come from.
- **[Attendance Plans and Shifts](/modules/hr/attendance/attendance-plans-and-shifts)** — the
  shifts, time ranges and weekly days off this page measures against.
- **[Leave Permissions and Missions](/modules/hr/attendance/leave-permissions-and-missions)** —
  the documents that excuse, extend or reclassify a day.
- **[Ignore Overlapping Attendance](/modules/hr/ignore-overlapping-attendance)** — what to do
  with attendance documents that cross each other.
- **[HR Configuration](/modules/hr/setup/hr-configuration)** — every setting named on this page.
- **[Performance Indicators](/modules/hr/performance/performance-indicators)** — how a measured
  figure becomes pay.
