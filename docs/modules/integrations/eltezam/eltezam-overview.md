---
description: "Overview of the Eltezam (MCS) integration that sends HR data to the Saudi Ministry of Civil Service: its licence, the three Eltezam screens, the seven operations sent and the workflow."
entities: [EltezamSubmissionDoc, EltezamConfiguration, EltezamCodeTable]
---
# Eltezam (MCS) Integration — Overview

A Saudi government agency does not only pay its employees; it also has to tell the Ministry of
Civil Service (MCS) about them. Who each employee is, which job and position they hold, what they
were paid each month, which qualifications they carry, which vacations they took and how they were
appraised — all of it has to reach the ministry's **Eltezam** (التزام) data-collection service,
and it has to arrive in the ministry's own codes, not in the agency's.

Nama already holds every one of those facts in the HR module: the employee file, the
organizational position, the salary documents, the vacation documents, the evaluations. The
Eltezam integration reads them, translates each value into the MCS code the ministry expects, and
sends it to the Eltezam service one request at a time. It then keeps a log of every request —
what was sent, whether the ministry accepted it, and the ministry's request number or error — so
support staff can see exactly which employee failed and why.

::: info Where the requests go
Eltezam is reached over the Government Service Bus (GSB). The Nama server must sit on the network
that can reach the ministry's endpoint; there is no user name, password or certificate to enter
in Nama. The only identifiers are the agency and sub-agency IDs you put on the configuration.
:::

## Licence

The integration is part of the Integrations module and needs the licence sub-module
`integrations-ksa-estidamah-eltezam`. Without it the three Eltezam screens do not appear.

## The three screens

All three live in the integrations menu:

| Screen | Where | What it is for |
|---|---|---|
| **MCS Eltezam Configuration** (إعدادات خدمة التزام) | Master Files | The connection to the ministry and the rules for reading HR data: service URL, agency IDs, the employee group, which operations to send. Usually one per agency. See [Setting up Eltezam](./eltezam-setup). |
| **MCS Eltezam Code Table** (جدول أكواد التزام) | Master Files | One table per MCS lookup list (job class, nationality, gender, salary element, …) that translates Nama values into MCS codes. See [Eltezam code tables](./eltezam-code-tables). |
| **MCS Eltezam Submission** (إرسال بيانات التزام) | Documents | One sending run: which employees, which period, which operations — and afterwards, the per-employee result and the full request log. See [Submissions and sending](./eltezam-submissions-and-sending). |

![An MCS Eltezam Submission for September: the operations to send and the employees collected from the group](../../../ar/modules/integrations/images/eltezam-submission-filled-en.png)

## What gets sent: the seven operations

Each operation is a separate request type on the ministry's side. You choose which ones to send
with the **Send …** check boxes on the configuration (and, if you want, override them per
submission).

| Check box | What it reports | Taken from |
|---|---|---|
| **Send Employee Info** (إرسال بيانات الموظف) | Identity, names, birth date, nationality, hire dates, current job, status, vacation balances | The employee file — one request per employee |
| **Send Employee Historical Info** (إرسال البيانات التاريخية للموظف) | Past job movements with their decision number and date | Each committed Update Employee Info document in the period |
| **Send Job Info** (إرسال بيانات الوظيفة) | The job position the employee occupies | The employee's organizational position — one request per employee |
| **Send Payslip Info** (إرسال بيانات مسير الرواتب) | Net pay and each salary element of the month | Each committed salary document in the period |
| **Send Qualification Info** (إرسال بيانات المؤهلات) | The employee's qualifications | The qualifications grid of the employee file |
| **Send Vacation Info** (إرسال بيانات الإجازات) | Vacations taken | Committed vacation documents starting in the period |
| **Send Appraisal Info** (إرسال بيانات تقييم الأداء) | Performance appraisal result and rating | Each committed employee evaluation in the period |

The details of every value — where it comes from and which code table translates it — are on
[What Nama sends to Eltezam](./eltezam-data-sources).

::: tip Dates travel in Hijri
Every date is sent to the ministry as a Hijri date (`dd-MM-yyyy`), converted with Nama's Hijri
calendar table. The table must reach back far enough to cover the oldest birth date and hiring
date you send, or those requests are held back with a message that says so.
:::

## The workflow at a glance

1. **HR data first.** Make sure the employees have their code, national ID or residency number,
   Arabic and English names, birth and hiring dates, organizational position, work place and
   department, and that the salary, vacation, evaluation and Update Employee Info documents you
   want to report are committed. Put the employees you report into an **Employee Group**.
2. **Create the configuration** — the service URL and agency IDs MCS gave you, the employee group,
   the basic salary component, the two vacation types and the operations to send.
3. **Create the code tables** in one go with the `EACreateEltezamCodeTables` action, then fill
   each one from the code lists MCS publishes.
4. **Create and commit an MCS Eltezam Submission** for the period you are reporting. The employee
   grid fills itself from the group.
5. **Send it.** Sending is done by an entity flow on the submission (for example on
   Post Commit) or by a task schedule. **Committing the document on its own sends nothing** —
   there is no Send button.
6. **Read the result** on the document: each employee line shows Succeeded, Failed or Not Sent,
   and the second page lists every request with the ministry's request number or error.
7. **Fix and resend.** Correct the data or the code tables, then press **Resend Failed Employees**
   to send only the employees that did not succeed.

When something goes wrong, [Eltezam troubleshooting](./eltezam-troubleshooting) lists the messages
and what each one means.
