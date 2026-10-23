---
description: "Where each value Nama sends to Eltezam comes from, operation by operation (employee, job, payslip, qualification, vacation and appraisal info), and which documents count as in the period."
entities: [EltezamSubmissionDoc, EltezamConfiguration]
---
# What Nama Sends to Eltezam

Sooner or later a customer calls with "MCS says the job number of employee 1045 is wrong — where
does Nama get it from?". This page answers that question for every value that matters. Each
operation below lists what it sends and the Nama field behind it. Values translated through a code
table name the table; how the table itself picks a code is on
[Eltezam code tables](./eltezam-code-tables).

## Values shared by every operation

| MCS value | Taken from |
|---|---|
| Employee ID | The employee **code** |
| National ID | The employee's national ID number. If it is empty, the **residency (Iqama) number** is sent instead |
| Sub Agency ID | **Sub Agency ID** on the configuration (all operations except Employee Info) |
| Job number | **Job Number From Employee Field** on the configuration → else the employee's labour office ID → else the organizational position code |
| Job class, job name, job category chain, employment type, rank | The JobClassCode, JobNameCode, JobCatChain, EmploymentTypeCode and RankCode tables, keyed on the employee's **organizational position**. The position's Arabic name goes with the job name code |
| Actual job name code | **Actual Job Name Code From Employee Field** → else the JobNameCode table |
| Job organization ID / name | **Agency Organization ID / Name From Employee Field** → else **Agency Organization ID / Name** on the configuration |
| Actual organization ID / name | **Actual Organization ID / Name From Employee Field** → else the employee's **department** code / Arabic name → else the agency |
| Location | The LocationCode table, keyed on the employee's **work place** → else **Default Location Code** on the configuration |
| First grade date | **First Grade Date From Employee Field** → else the hiring date |
| Basic salary | The **Basic Salary Component**'s addition on the employee's latest committed salary document in the period |

## Employee Info

One request per employee, describing the person and their current state.

- **Names** come from Name1 (Arabic) and Name2 (English), split on spaces into first, second,
  third and last name. Two words become first and last name, three become first, second and last,
  and anything beyond the fourth word is kept in the last name.
- **Birth date, gender, nationality, religion, marital status** come from the employee file,
  translated through the Gender, NationalityCode, Religion and MaritalStatus tables. Health status
  and blood type come from the HealthStatus and BloodType tables. Mobile and e-mail come from the
  contact information.
- **Government hire date** and **ministry hire date** are both the employee's hiring date.
- **Employee status** is the employee state, through the EmployeeStatusCode table.
- **Remaining annual and business vacation balance** are the employee's remaining balances of the
  two vacation types on the configuration, as of the submission's value date.
- **Transaction code** comes from the TransactionCode table.
- **IsActive** is `Yes` while the employee has no firing date. Once a firing date is set, IsActive
  becomes `No` and a termination block is added with the firing date and a termination reason from
  the TerminationReasonCode table.

## Employee Historical Info

One request for **each committed Update Employee Info document** of the employee in the period.
The document code is the decision number; its value date is the decision date and the transaction
start date; its remarks are the transaction description. When the document moves the employee to
another organizational position, the job codes of that new position are sent.

## Job Info

One request per employee about the position they occupy. The **job position code** is the code of
the employee's organizational position — your own nine-character number, not a ministry code —
padded with leading zeros. The position start date is the hiring date. Position status and job
transaction code are the Default MCS Codes of the PositionStatus and JobTransactionCode tables.
For an employee with a firing date, that date is sent as the position end date and the vacant
date.

## Payslip Info

One request for **each committed salary document** of the employee in the period. It carries the
net salary, the value date as the paid date, the Hijri and Gregorian month and year, and one
element per salary line:

- the element code from the ElementCode table, keyed on the line's **salary component**, and the
  component's Arabic name;
- the amount — the addition for an earning, the deduction for a deduction — sent as a positive
  number and classified as Paid or Deduction;
- the consolidation set from the ConsolidationSetID table, keyed on the salary document's
  **issuance**.

Lines with a zero amount are left out. A payslip can carry up to 100 elements.

## Qualification Info

One request per employee listing every line of the **qualifications grid** on the employee file,
through the QualificationCode, MajorCode (specialization), UniversityCode (institute) and EduGrade
tables. A line with a graduation date is sent as completed; one without is sent as ongoing. An
employee with no qualifications is skipped.

## Vacation Info

One request per employee listing the **committed vacation documents** whose start date falls in
the period: the document code (as vacation ID and decision number), start date, return date, the
number of days, and the vacation code from the VacationCode table keyed on the vacation type. An
employee with no vacations in the period is skipped.

## Appraisal Info

One request for **each committed employee evaluation** in the period: the evaluation code as the
appraisal ID, the evaluation's **Date 1** and **Date 2** as the appraisal start and end dates, the
appraisal type from the AppraisalTypeCode table keyed on the evaluation type, the result taken from
the evaluation's **Number 3** (N3) — the score out of 5 — sent as a percentage with two decimals (4.1 goes as
`82.00`), and the rating from the RatingCode table keyed on the evaluation's **Description 1** (or the
table's Default MCS Code when Description 1 matches no row). Date 1, Date 2 and Number 3 must be
filled on the evaluation, or the employee is refused before sending.

## Which documents count as "in the period"

Employee Info, Job Info and Qualification Info always describe the employee as they are today, so
the period does not affect them. The other four operations only pick up **committed** documents,
chosen by the period on the submission:

| Period on the submission | Salary documents and evaluations | Vacation and Update Employee Info documents |
|---|---|---|
| **HR Period** filled | Those of that HR period | Those inside From Date / To Date, if given |
| **HR Year** filled (no HR Period) | Those of that year's periods, narrowed by From / To Date if given | Those inside From / To Date, or else inside the HR year's start and end |
| Only **From / To Date** | Value date inside the range | Value date (start date for vacations) inside the range |
| Nothing | The employee's whole history | The employee's whole history |

::: tip Reporting one month
When you report a single payroll month with **HR Period**, fill **From Date** and **To Date** with
the same month as well. The HR period narrows salary documents and evaluations; the dates are what
narrow vacations and historical updates — without them those two operations send the employee's
whole history.
:::
