---
description: "Video summary, HR payroll course part 3: performance indicators, formulas, repetition counts versus ranges, overtime and lateness brackets, time rounding, taxes and payroll periods."
---
# Detailed Explanation of the Payroll Management System in Nama ERP - 3

# Detailed Explanation of HR, Formulas, Salaries, and Calculation Bases in the HR System
> A detailed educational video explaining how to work with performance indicators, formulas, repetitions, ranges, payouts, taxes, overtime, and core concepts in human resources systems

---

## Introduction and Welcome
[00:00:01](https://youtu.be/2GHsOiQPBRU?t=1)  
In the name of God, peace be upon you. We continue today with a detailed explanation of the HR topic. In the previous video we discussed payroll items, performance indicators, and basic formulas — today we will continue in detail.

---

## Quick Review of What Was Covered in the Previous Video
[00:00:15](https://youtu.be/2GHsOiQPBRU?t=15)
- We discussed performance indicators and their types: system-generated, manual, the difference between them, and when to use each.
- We explained how to select a performance indicator and how to apply it — whether daily or quarterly.
- We clarified that repetition counts affect the calculation, but a delay of half an hour or an hour has a different impact.

---

## Performance Rate and How It Is Calculated
[00:01:38](https://youtu.be/2GHsOiQPBRU?t=98)
- The performance rate is how an absence day is deducted from the basic or gross salary.
- Is tax included or not? Are social insurance contributions present?
- The daily basic salary is calculated by dividing the monthly salary by the number of days in the month.
- Some companies use a fixed 30-day month; others use the actual working days excluding weekly holidays.
- There are classifications such as basic salary, housing allowance, transportation allowance, installments, end-of-service gratuity, etc.

---

## Classification Details and Basic Salary
[00:03:22](https://youtu.be/2GHsOiQPBRU?t=202)
- Classifications such as basic salary, daily rate, and final salary.
- Daily basic salary = monthly salary ÷ number of days in the month.
- The number of days in the month is configured from the HR system settings.
- The basic salary can apply to one or more payroll items depending on the design and requirements.

---

## Indicator Multipliers and Their Values
[00:04:58](https://youtu.be/2GHsOiQPBRU?t=298)
- Indicator multipliers are numbers multiplied by the indicator value, such as for absence or lateness.
- Example: one day of absence = 1 × daily basic salary.
- Lateness under a quarter hour or half an hour is handled with only a multiplier, without an indicator value.
- Overtime is calculated using extra working hours within defined brackets.
- The indicator value is used with the multiplier when ranges (defined time intervals) are involved.

---

## Repetition Counts and Their Effect on Calculation
[00:06:32](https://youtu.be/2GHsOiQPBRU?t=392)
- Repetition counts refer to the number of times an absence or lateness occurs within a defined period (month, 3 months, 6 months, or a year).
- HR systems allow accumulating periods such as every 3 months or every year to track repetitions.
- Example: if an employee is late twice in January and February, that counts as two repetitions in the accumulated period.
- Complex scenarios can be handled to adjust penalties or deductions in line with company policy.

---

## The Difference Between Repetition Counts and Range
[00:10:12](https://youtu.be/2GHsOiQPBRU?t=612)
- **Repetition Counts:** the number of times a specific indicator occurs in a time period — for example, the number of absent days.
- **Range:** a time interval or a defined quantity within which the indicator is calculated — for example, lateness from 15 to 40 minutes.
- Absence does not normally use a range because an employee is either present or absent (0 or 1).
- Lateness can use a range to determine the deduction amount based on how long the employee was late.
- The range can be configured based on work shifts, where working hours and acceptable lateness minutes differ.

---

## Using Queries to Configure the Range in the System
[00:12:26](https://youtu.be/2GHsOiQPBRU?t=746)
- Queries can be written inside the system to retrieve values associated with the range based on the employee's shift.
- Example: determining the number of working hours in the morning or night shift and returning the appropriate lateness time for each case.
- This allows flexibility in handling different work schedules.

---

## A Practical Example of Overtime with Time Brackets
[00:15:57](https://youtu.be/2GHsOiQPBRU?t=957)
- Example: the first hour is calculated with a multiplier of 2, the second hour with 1, the third with 1, and so on.
- If an employee works 3 overtime hours, the brackets must be applied correctly to ensure accurate calculation.
- Explanation of how using an open or closed range affects the calculation and how this can be adjusted using a negative added value to correct the results.

---

## The Concept of Added Value and How to Use It
[00:20:16](https://youtu.be/2GHsOiQPBRU?t=1216)
- Added value is used to adjust calculation results within formulas.
- Example: deduct a certain number of overtime hours then multiply the remainder by a specific multiplier.
- This allows distributing overtime across multiple brackets correctly.

---

## The Practical Difference Between Repetition Counts and Range in Lateness
[00:23:52](https://youtu.be/2GHsOiQPBRU?t=1432)
- Repetition counts track how many times an employee was late, regardless of how long each lateness was.
- The range calculates the duration of lateness each time, within a defined time period.
- Example: being late 25 minutes on 3 occasions means 3 repetition counts.
- Lateness over 30 minutes results in a half-day deduction on the first occurrence, as determined by the range.

---

## Examples of Lateness Applications with Repetition Counts and Range
[00:26:40](https://youtu.be/2GHsOiQPBRU?t=1600)
- Grace period for lateness: 10 minutes.
- From 10 to 30 minutes: a quarter-day deduction on the first occurrence, a half-day on the second.
- Lateness over half an hour: a half-day deduction on the first occurrence, a full day on subsequent occurrences.
- A practical application showing how deductions are calculated based on range and repetition rules.

---

## Summary of the Differences Between Repetition Counts and Range
[00:30:00](https://youtu.be/2GHsOiQPBRU?t=1800)
- Repetition counts move across days and count the number of times an indicator occurs.
- The range is calculated within a single day only — for example, the lateness on a specific day.
- The range does not accumulate daily, whereas repetition counts do accumulate.
- Therefore the appropriate method must be chosen depending on the type of indicator.

---

## Rounding in Time Calculation (Quarter Hour, Half Hour, Hour)
[00:35:27](https://youtu.be/2GHsOiQPBRU?t=2127)
- Time rounding helps calculate overtime or lateness to an acceptable level of precision.
- Example: if an employee is 55 minutes late, it is counted as 45 minutes (a quarter to the hour).
- If the employee is 37 minutes late, it is rounded down to 30 minutes.
- This helps simplify calculations and comply with company rules.

---

## Notes on Formulas and Salary Details
[00:39:02](https://youtu.be/2GHsOiQPBRU?t=2342)
- Displaying the regulation code and formula notes in salary details within the system.
- These notes help the reviewer trace how the salary and deductions were calculated.
- Reports can be generated showing the number of lateness and absence occurrences and their impact on the salary.

---

## Release Multipliers and Special Scenarios for Days Before Holidays
[00:40:44](https://youtu.be/2GHsOiQPBRU?t=2444)
- The ability to configure special multipliers for working days that precede official or weekly holidays.
- Example: Sunday before an official holiday can be calculated differently from other days of the week.
- This helps manage absence or lateness on specific days precisely.

---

## Applying Criteria to Different Employee Files
[00:44:50](https://youtu.be/2GHsOiQPBRU?t=2690)
- Some criteria apply only to specific employees based on data in the employee file or the personnel affairs file.
- Flexibility in system queries to fetch information from multiple sources.
- This allows regulations and policies to be applied accurately across different categories of employees.

---

## Taxes and How They Are Calculated in the System
[00:48:44](https://youtu.be/2GHsOiQPBRU?t=2924)
- Taxes are calculated on the total monthly payroll items, not only on the basic salary.
- Some companies separate payroll items where the employee bears the tax from those borne by the company.
- Tax brackets are calculated monthly and annually in accordance with local law.
- The ability to perform year-end tax reconciliations to adjust differences.

---

## Detailed Explanation of Tax Brackets and Salary Payouts
[00:54:30](https://youtu.be/2GHsOiQPBRU?t=3270)
- Payouts may be disbursed in multiple instalments within the month (basic salary, overtime, incentives, allowances, etc.).
- Taxes are calculated on each payout separately or in aggregate depending on the system configuration.
- Definition of three types of payouts: basic, overtime, and incentives.
- Specific payouts can be designated to have particular formulas applied to them.

---

## Payroll Periods and the Possibility of Distributing Salaries Across Two Periods
[00:59:30](https://youtu.be/2GHsOiQPBRU?t=3570)
- The ability to have more than one payroll period in the same year (for example, first half and second half of the year).
- It is not possible to issue salaries for more than one payroll period in the same month.
- Payouts can be linked to different payroll periods.

---

## General Tips and Instructions for Viewers
[01:02:13](https://youtu.be/2GHsOiQPBRU?t=3733)
- The importance of thoroughly understanding the topics of range and repetition counts through practical application.
- A practical assignment is given on lateness and overtime to reinforce the concepts.
- Encouragement to learn and develop personally, not merely to carry out routine procedures.
- Freedom to choose whether to complete the assignment or not, with no pressure.

---

## The Required Practical Exercise
[01:03:54](https://youtu.be/2GHsOiQPBRU?t=3834)
- Prepare a lateness regulation containing:
    - Lateness on the first occurrence of half an hour with a specific deduction.
    - The second and third occurrences with different deductions.
- An overtime regulation containing:
    - The first hour with a specific multiplier.
    - The second hour with a different multiplier.
    - Subsequent hours with other multipliers.
- Submit the work before Thursday for review.

---

## Closing the Session and Q&A
[01:05:44](https://youtu.be/2GHsOiQPBRU?t=3944)
- Opening the floor for questions and comments.
- Clarification that the purpose of the training is understanding and development, not obtaining a certificate.
- Emphasis on the importance of improving personal and professional performance.
- Announcement that the next topic will be attendance and departure, a comprehensive topic that may require several sessions.

---

# Conclusion
This video provided a detailed and comprehensive explanation of the concepts and formulas of the Human Resources (HR) system related to payroll calculation, performance indicators, lateness, overtime, taxes, payouts, and various evaluation methods.  
A practical explanation was presented with many examples to illustrate how to handle each case and what rules govern it within the system.  
Emphasis was also placed on the importance of understanding the difference between repetition counts and range in calculations, and on using queries, indicator values, and multipliers accurately to ensure correct results that are consistent with company policies and local laws.

We recommend reviewing the video practically and completing the attached exercises to ensure full absorption of the content.

---

*Links back to the timestamped sections of the video are available for each section for easy reference to the detailed explanation.*
