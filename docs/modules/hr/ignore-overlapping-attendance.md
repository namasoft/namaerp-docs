---
description: "How to ignore incomplete or overlapping lines from fingerprint imports: enabling the option in Payroll Settings, the header option on the Time Attendance voucher, the overlap rules and the effect on working hours."
entities: [TimeAttendance]
menu: Payroll → Time Attendance → Time Attendance
---
# Ignoring Overlapping Attendance and Departure Lines

## Why Do We Need This Feature?

In day-to-day operations, data coming from fingerprint machines is not always complete. There are very common situations that HR departments face:

**Case 1: Forgetting to scan on entry or exit**

An employee arrives in the morning and scans in, but forgets to scan out at the end of the day. The result in the automatically imported voucher is a line that contains a **From Date and Time** only, with no **To** value. A line in this state will negatively affect the calculation of working hours.

**Case 2: Employee stays on site for more than 24 hours**

When an employee remains on site for more than one continuous day (for example, a shift engineer or emergency work), the machine produces two separate lines on import: one with a check-in scan only, and another with a check-out scan only. Each line appears incomplete, and the system cannot automatically combine them.

### The Traditional Solution and Its Problem

The usual solution is to manually edit the automatically imported voucher to fix the incomplete lines. However, this corrupts the original data coming from the machine and makes later auditing difficult.

### The Solution with This Feature

This feature allows the HR department to create a separate **manual attendance voucher** containing the correct data (with complete From and To date/time), and enable the **Ignore Overlapping Attendance** option on that voucher. The system will then automatically ignore the incomplete lines in the automatically imported voucher and rely on the manual voucher when calculating working hours.

This way, the original data from the machine remains preserved as-is for review and auditing, while the manual correction is used only for payroll calculation purposes.

## Enabling the Feature in Payroll Settings

::: warning Important Notice
This feature does not work by default in order to preserve existing customer behavior. It must first be enabled from Payroll Settings.
:::

Open **Payroll Settings**, and in the **Attendance Settings** group, you will find the option:

<HRConfigOption option-code="value.allowIgnoreOverlappingAttendance" link-title="Allow ignoring overlapping attendance and departure vouchers" />

Once this option is enabled, you can use the overlapping line ignore feature on attendance and departure vouchers.

::: tip
If a user tries to enable the ignore option at the attendance voucher level without enabling this setting, the system will refuse to save the voucher and will direct the user to enable the setting first.
:::

## Using the Feature at the Attendance and Departure Voucher Level

When opening any attendance and departure voucher, you will find a new option in the header:

> **Ignore attendance and departure that overlaps with this document**

When this option is enabled, this voucher becomes the "primary source" for the lines it contains. Any line in another voucher that overlaps with a line in this voucher — according to the rules below — will be automatically ignored when calculating working hours.

### The "Line Was Ignored Due to Overlap with Other Vouchers" Field

At the line level, you will find a new field called **Line was ignored due to overlap with other vouchers**.

This field is **automatically flagged on save**, and you do not need to edit it manually. The system checks the lines when the voucher is saved and marks every line that overlaps with a line in another voucher that has the ignore option enabled.

## Overlap Rules Between Lines

### Rule 1: Lines in the Voucher with Ignore Enabled Are Not Subject to the Rule

If the current voucher has the **Ignore attendance and departure that overlaps with this document** option enabled, all its lines remain active and none of them are marked as ignored. This feature applies only to other vouchers.

### Rule 2: A Line with Both a From Date and a To Date

If the line contains both a **From Date** and a **To Date**, it is ignored if there is a line in another voucher (with ignore enabled) that contains **the same From Date value and the same To Date value**.

**Example:** Employee Ahmed correctly registered his check-in and check-out on 2026-05-15, but the scan times were wrong for some reason. The HR department created a manual voucher containing the same day with the correct times, and enabled the ignore option on it.

| Voucher | Employee | From Date | To Date | Status |
|---------|----------|-----------|---------|--------|
| Manual voucher (ignore enabled) | Ahmed | 2026-05-15 | 2026-05-15 | Remains active and used in calculation |
| Automatically imported voucher | Ahmed | 2026-05-15 | 2026-05-15 | Line is ignored |

### Rule 3: A Line with a From Date Only

If the line contains a **From Date** only (without a To Date), it is ignored if there is a line in another voucher (with ignore enabled) that contains **a matching From Date or a matching To Date**.

**Example:** Employee Ahmed forgot to scan out on 2026-05-15, so an incomplete line appeared in the imported voucher containing a From Date only. The HR department created a manual voucher containing the full day.

| Voucher | Employee | From Date | To Date | Status |
|---------|----------|-----------|---------|--------|
| Manual voucher (ignore enabled) | Ahmed | 2026-05-15 | 2026-05-15 | Remains active |
| Automatically imported voucher | Ahmed | 2026-05-15 | – | Line is ignored (From Date match) |

### Rule 4: A Line with a To Date Only

If the line contains a **To Date** only (without a From Date), it is ignored if there is a line in another voucher (with ignore enabled) that contains **a matching From Date or a matching To Date**.

**Example:** This is the case of an employee staying on site for more than 24 hours. The imported voucher produces two separate lines: one with a check-in scan only on one day, and another with a check-out scan only on the following day. The manual voucher corrects both lines.

| Voucher | Employee | From Date | To Date | Status |
|---------|----------|-----------|---------|--------|
| Manual voucher (ignore enabled) | Ahmed | 2026-05-15 | 2026-05-16 | Remains active |
| Automatically imported voucher (check-in line) | Ahmed | 2026-05-15 | – | Line is ignored (From Date match) |
| Automatically imported voucher (check-out line) | Ahmed | – | 2026-05-16 | Line is ignored (To Date match) |

## What Happens After Saving?

When an attendance and departure voucher is saved:

1. The system first clears the flag on all lines of the current voucher (returning them to their default state).
2. If the current voucher has the ignore option enabled, it stops here — no lines are flagged.
3. If the ignore option is not enabled, the system searches the database for lines in other vouchers that have the ignore option enabled, belonging to the same employees, within the same time range.
4. It applies the overlap rules described above and marks the matching lines as ignored.

## Effect of Ignoring on Working Hours Calculation

Lines marked as ignored **do not enter the working hours calculation** when the employee's attendance and departure data is aggregated. The system automatically excludes them when loading the employee's attendance data, so they do not appear in the total hours, overtime, or delay figures.

::: tip
The advantage of this design is that ignored lines remain stored in the database for reference or auditing, but they do not affect payroll calculation results.
:::

## Notes on Updates

When editing an old attendance voucher and saving it:

* Overlaps are re-checked and the field is updated automatically.
* The system does not check the current voucher against itself (even when changing the option from enabled to disabled).
* Other vouchers that were previously affected by this voucher **are not automatically re-checked** — if you disable the ignore option on a voucher that was previously enabled, you will need to re-save the other affected vouchers to re-evaluate their lines.
