---
description: "Notes for part 2 of the payroll training course: calculation formulas for social insurance, Egyptian tax brackets and deductions, performance indicators, attendance and shifts, absences, holidays, overtime and lateness, and missing fingerprint records."
---
# Detailed Explanation of the Payroll Management System in Nama ERP - 2

# Detailed Video Content: Calculation Formulas and Performance Indicators in HR and Payroll Systems

Welcome to this detailed document that covers the content of an Arabic-language video on calculation formulas and performance indicator systems used in human resources and payroll management, with a focus on the Egyptian work environment and some references to Gulf-region systems. This document includes all explanations, examples, and procedures mentioned in the video, with clear section headings and precise timestamps for jumping back to specific segments of the original YouTube video.

---

## Introduction and Basic Definitions
[00:00:01](https://youtu.be/wmUOzWtMuhQ?t=1)

The session starts by reviewing last week's topics, which covered payroll item types and the definitions of key terms such as "payroll item" and its types, along with a brief explanation of why a single payroll item type may have multiple items.

The presenter then transitions to the topic of calculation formulas, which are used to compute various values such as the company's and employee's shares of social insurance, and how fixed and variable payroll items interact within those formulas.

---

## Social Insurance Formulas and Their Types
[00:01:30](https://youtu.be/wmUOzWtMuhQ?t=90)

- Social insurance in Egypt was previously split into a fixed base and a variable base, but it is now comprehensive.
- The formulas calculate the company's and employee's shares of social insurance based on these payroll items.
- Payroll items representing the insurance base are added to the fixed or variable insurance pool depending on the case.
- Share percentages come from insurance settings, such as the company and employee rates, which change over time.
- Example: The social rate is approximately 11%, and the combined company and employee shares are approximately 29%.

> **Note:** Order matters greatly in formulas; a payroll item will not be calculated based on any item with an equal or higher sequence number — only items with a lower sequence number are used.

---

## Taxes in Egypt and the Bracket System
[00:03:20](https://youtu.be/wmUOzWtMuhQ?t=200)

- Taxes are calculated using a bracket system, and the bracket can be determined monthly or annually.
- Example: The first 10,000 or 12,000 Egyptian pounds per year are exempt from tax (zero rate).
- After calculating the tax, additional deductions are applied at different rates depending on the bracket.
- For every salary — whether one million or 100,000 — taxes are applied in the same way, but the final deductions differ.
- Taxes are no longer calculated as a flat rate but rather using the bracket method.

---

## Using Formulas for Deducting Custody Amounts and Purchases
[00:06:10](https://youtu.be/wmUOzWtMuhQ?t=370)

- Formulas can be used to deduct custody amounts the employee has withdrawn during the month.
- Example: An employee who took a custody of 10,000 pounds and retained 3,000 pounds can have that amount deducted from their salary without requiring repayment.
- This type of processing is commonly used for employee purchases, such as from a supermarket.
- It is recommended to create a deduction payroll item and add or deduct based on the transaction type.
- Employee purchases are accumulated in a special account — "Employee Purchases" — which is reviewed monthly.

---

## Performance Indicators Linked to Employee Calculations
[00:08:00](https://youtu.be/wmUOzWtMuhQ?t=480)

- Performance indicators can be created and linked to specific payroll items.
- Example: A housing allowance might be 20% or 30% of the basic salary, and multiple payroll items can be specified to calculate the percentage.
- A file can be created containing a group of payroll items used in the indicator.
- Indicators are calculated as percentages of additions, deductions, or the insurance pool.
- Specific percentages can be entered manually instead of relying on system settings.

---

## The Calculation System and How to Choose Brackets or Percentages
[00:09:50](https://youtu.be/wmUOzWtMuhQ?t=590)

- Calculations may use the bracket system or a fixed percentage.
- The bracket system applies everything that falls within a bracket, while a fixed percentage takes only the first matching rate.
- An explanation of the minimum value output from a formula (the lowest acceptable value).
- Under Egyptian law, there are penalties that prevent a company from awarding a bonus exceeding a certain percentage of the salary (e.g., 20%).
- Penalties such as absences are handled by deducting absent days, with the option to carry over the remainder to the following month.

---

## Indicator Types and the Difference Between Daily and Period-Based Application
[00:13:00](https://youtu.be/wmUOzWtMuhQ?t=780)

- Performance indicators can be applied on a period basis or a daily basis.
- The main difference: a daily indicator calculates each day independently, whereas a period-based indicator accumulates the entire period.
- Examples of applying indicators to various types of leave (such as unauthorized absences or excused absences).
- Guidance on when to choose daily versus period-based depending on the nature of the data — for example, overtime requires daily tracking.
- Manual indicators are used to enter data that is not automatically captured by the system, such as absences due to work stoppage.

---

## The Attendance and Time-Tracking System
[00:20:00](https://youtu.be/wmUOzWtMuhQ?t=1200)

- The system handles the concepts of shifts, rosters, official workdays, and weekly schedules.
- There is a distinction between official weekly rest days such as Friday and Saturday.
- Examples of how to calculate leave that spans official holidays and weekly rest days.
- An explanation of how to handle extended leave and its effect on attendance calculations.
- Instructions on how to record employee attendance manually or automatically from biometric devices.

---

## Handling Interrupted Attendance and Shift Types
[00:31:00](https://youtu.be/wmUOzWtMuhQ?t=1860)

- An explanation of interrupted shift cases (for example, two shifts in a single day).
- How to calculate the remaining time needed to complete a shift in cases of late arrival or early departure.
- Example: An employee who arrived 30 minutes late and left 30 minutes early incurs a half-day deduction.
- Emphasis on not double-counting deductions — for instance, applying both a lateness deduction and an early departure deduction for the same event.
- Special cases in the Gulf region where shifts are split due to extreme heat conditions.

---

## Handling Employee Absence During Work Hours
[00:32:30](https://youtu.be/wmUOzWtMuhQ?t=1950)

- An explanation of how to identify absent days within attendance days.
- Special cases such as an employee working two overlapping shifts with a break in between.
- Clarification of the difference between actual absence and an incomplete shift.
- The importance of accurately tracking in/out biometric punches to avoid errors in absence calculations.

---

## Handling Official and Weekly Holidays
[00:36:15](https://youtu.be/wmUOzWtMuhQ?t=2175)

- How to define official holidays (such as 6 October or a national day).
- Setting holidays by department or nationality (especially relevant in Gulf countries).
- Holidays take priority in calculations and are not counted as working days.
- An explanation of how to add official holidays in the system and their effect on payroll.

---

## Manual Daily and Period-Based Indicators
[00:39:00](https://youtu.be/wmUOzWtMuhQ?t=2340)

- An explanation of manual indicators whose data is entered manually, such as performance evaluations.
- Example: Behavioral assessments such as dress code or interaction with colleagues.
- Using scores and ratings to determine bonuses or deductions.
- An explanation of the concept of an "inverted point" for use in calculating rating percentages.

---

## Calculating Overtime and Lateness
[00:54:00](https://youtu.be/wmUOzWtMuhQ?t=3240)

- An explanation of how overtime is calculated based on actual hours worked versus expected hours.
- The difference between calculating overtime based on actual time versus after verifying that shift hours have been completed.
- How to handle overtime on official holidays or weekly rest days.
- Example: An employee working on a Friday receives higher pay or overtime calculated at a different rate.

---

## Handling Missing Biometric Check-In or Check-Out Records
[00:44:00](https://youtu.be/wmUOzWtMuhQ?t=2640)

- An explanation of how to handle cases where an employee forgets to punch in or out.
- The system handles the gap by applying a certain deduction (half-day or full day) according to the applicable regulations.
- The importance of reviewing attendance and departure data manually or automatically to avoid errors.

---

## Special Cases: Start Date and Return-from-Leave Date
[00:46:30](https://youtu.be/wmUOzWtMuhQ?t=2790)

- The difference between the start date (the date the employee first reports to work) and the return date from leave.
- In some cases, an employee's official return date arrives but they remain at home for additional days (travel, rest).
- How these periods are calculated and handled in the system in terms of salaries and allowances.
- Some countries require documents proving the actual return, such as the employee's signature.

---

## Managing Biometric Devices and Organizing Entry and Exit
[00:50:30](https://youtu.be/wmUOzWtMuhQ?t=3030)

- An explanation of how biometric devices are used to record entry and exit.
- The need for a dedicated device for entry and another for exit to ensure accuracy.
- The importance of configuring the system so that entry and exit cannot occur through the same door, to prevent manipulation.
- How to process biometric data to generate accurate attendance reports.

---

## Detailed Explanation of Indicator Types and Coefficients
[01:10:00](https://youtu.be/wmUOzWtMuhQ?t=4200)

- Defining indicator types: system-generated, manual, daily, and aggregate.
- The difference between a coefficient only and a coefficient on the indicator value:
    - Coefficient only: used to determine the number of units (e.g., deduct a quarter-day for every 15 minutes of lateness).
    - Coefficient on the indicator value: used to multiply actual time to calculate the monetary value precisely (e.g., overtime).
- An explanation of how to define the time range for lateness and the number of repetitions for the deduction.
- How to calculate daily salaries based on a monthly salary divided by the number of days in the month or the number of working days.

---

## Summary and Closing Guidance
[01:18:50](https://youtu.be/wmUOzWtMuhQ?t=4730)

- Emphasis on the importance of accurately configuring formulas and indicators.
- The need to balance system-generated and manual entries while maintaining data integrity.
- A recommendation to consult specialists when legal or technical complexities arise.
- An invitation for questions and feedback in the next video.

---

# Important Tips

::: tip
- **Order of payroll items matters greatly** to avoid incorrect calculations.
- **Choosing the indicator type (daily or period-based)** should be based on the nature of the work.
- **Accurate attendance and departure recording** reduces errors in calculations.
- **Manual indicators are important** for covering cases that the system cannot handle automatically.
- **Compliance with local laws and regulations** is essential to avoid legal issues.
:::

---

# Video Timestamps

| Topic | Time | Link |
|---|---|---|
| Introduction and Definitions | 00:00:01 | [Link](https://youtu.be/wmUOzWtMuhQ?t=1) |
| Social Insurance Formulas | 00:01:30 | [Link](https://youtu.be/wmUOzWtMuhQ?t=90) |
| Taxes in Egypt and the Bracket System | 00:03:20 | [Link](https://youtu.be/wmUOzWtMuhQ?t=200) |
| Custody Deductions and Purchases | 00:06:10 | [Link](https://youtu.be/wmUOzWtMuhQ?t=370) |
| Linked Performance Indicators | 00:08:00 | [Link](https://youtu.be/wmUOzWtMuhQ?t=480) |
| Calculations and Brackets | 00:09:50 | [Link](https://youtu.be/wmUOzWtMuhQ?t=590) |
| Penalties and Disciplinary Actions | 00:11:20 | [Link](https://youtu.be/wmUOzWtMuhQ?t=680) |
| Daily and Period-Based Indicators | 00:13:00 | [Link](https://youtu.be/wmUOzWtMuhQ?t=780) |
| Attendance and Shift System | 00:20:00 | [Link](https://youtu.be/wmUOzWtMuhQ?t=1200) |
| Interrupted Attendance and Shifts | 00:31:00 | [Link](https://youtu.be/wmUOzWtMuhQ?t=1860) |
| Absence and Holidays | 00:36:15 | [Link](https://youtu.be/wmUOzWtMuhQ?t=2175) |
| Manual Indicators and Performance Evaluation | 00:39:00 | [Link](https://youtu.be/wmUOzWtMuhQ?t=2340) |
| Overtime and Lateness | 00:54:00 | [Link](https://youtu.be/wmUOzWtMuhQ?t=3240) |
| Missing Biometric Records | 00:44:00 | [Link](https://youtu.be/wmUOzWtMuhQ?t=2640) |
| Start Date and Return Date | 00:46:30 | [Link](https://youtu.be/wmUOzWtMuhQ?t=2790) |
| Managing Biometric Devices | 00:50:30 | [Link](https://youtu.be/wmUOzWtMuhQ?t=3030) |
| Indicator Types and Coefficients | 01:10:00 | [Link](https://youtu.be/wmUOzWtMuhQ?t=4200) |
| Closing | 01:18:50 | [Link](https://youtu.be/wmUOzWtMuhQ?t=4730) |

---

*This document was prepared carefully to reflect all details of the video without omission or summarization, with quick access to every timestamp in the original video.*
