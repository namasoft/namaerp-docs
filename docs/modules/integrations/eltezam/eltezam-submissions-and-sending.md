---
entities: [EltezamSubmissionDoc]
menu: Integrations → Documents → MCS Eltezam Submission
---
# Eltezam Submissions and Sending

Every time the agency reports to MCS — the monthly payslips, a batch of new hires, the year's
appraisals — it does so through an **MCS Eltezam Submission** (إرسال بيانات التزام), under
**Documents → MCS Eltezam Submission** in the integrations menu. The document says *who* is being
reported, for *which period* and *what* is being sent. Once it has been sent, it becomes the record
of what happened: which employees went through, which failed, and every request with the
ministry's answer.

## Filling in the document

![The MCS Eltezam Submission document](../../../ar/modules/integrations/images/eltezam-submission-en.png)

| Field | Meaning |
|---|---|
| **Document Code, Fiscal Period, Value Date** | As on any document. The value date is also the date vacation balances are computed at |
| **Eltezam Configuration** (إعدادات التزام) | **Required.** The configuration to send with |
| **Employee Group** (مجموعة موظفين) | The employees to report. Leave it empty to use the configuration's group |
| **HR Year** (سنة الرواتب), **HR Period** (فترة الرواتب), **From Date** (من تاريخ), **To Date** (إلى تاريخ) | The period whose documents are sent — see [which documents count as "in the period"](./eltezam-data-sources#Which-documents-count-as-in-the-period). Leave all four empty to send the whole history |
| The seven **Send …** check boxes | Which operations this submission sends. Leave them all unticked to take the configuration's choice |
| **Succeeded Requests Count** (عدد الطلبات الناجحة), **Failed Requests Count** (عدد الطلبات الفاشلة) | Filled in by the system after each send |

When you save, Nama completes the document for you:

- an empty **Employee Group** is copied from the configuration;
- if no **Send …** box is ticked, all seven are copied from the configuration;
- if the **Details** grid is empty, it is filled with one line per employee of the group.

You can then remove employees from the grid, or add others by hand, before committing. The
document needs no document term.

### The Details grid

| Column | Meaning |
|---|---|
| **Employee** (الموظف) | The employee reported on this line |
| **Eltezam Send State** (حالة الإرسال لالتزام) | **Not Sent** (لم يرسل بعد), **Succeeded** (نجح) or **Failed** (فشل) |
| **Succeeded Operations** (العمليات الناجحة) | The operations the ministry accepted for this employee |
| **Failed Operations** (العمليات الفاشلة) | The operations that failed |
| **Last Eltezam Error** (آخر خطأ من التزام) | The latest error for this employee |

A line is **Failed** if any of its requests failed, **Succeeded** if at least one request went
through and none failed, and **Not Sent** if nothing was produced or sent for it — for example an
employee with no salary document in the period when only payslips are being sent.

## Committing does not send

Committing the submission checks that it has employees and at least one operation, and then
stops. **Nothing is sent to the ministry when you commit, and there is no Send button on the
screen.** Sending is done by one of two entity actions, run from an entity flow or a task
schedule. Setting one of them up is a one-time job for whoever administers the system.

In the **Class Name** field of the entity flow line or the task schedule, the action must be
written with its **full name**: `com.namasoft.modules.integrations.utils.actions.` followed by the
short name used on this page — for example
`com.namasoft.modules.integrations.utils.actions.EASendEltezamSubmissionDoc`. The short name on
its own is not found. Type the short name into the field and pick the full name from its
suggestion list.

### Sending on commit: `EASendEltezamSubmissionDoc`

The usual arrangement is an entity flow on **MCS Eltezam Submission** that runs
`EASendEltezamSubmissionDoc` on **Post Commit**, so every submission is sent the moment it is
committed (see [Introduction to Entity Flows](/platform/entity-flows/introduction-to-entity-flows)).
The action runs only on a committed submission.

| Parameter | Meaning |
|---|---|
| 1. **MCS Server (IP, host or full URL)** | **Required.** Where to send |
| 2. **Eltezam Configuration Code (Can be Empty)** | A configuration to use instead of the document's. It is written onto the document's **Eltezam Configuration** field and saved there |
| 3. **From Date (yyyy-MM-dd, Can be Empty)** | Overrides the document's From Date for this run |
| 4. **To Date (yyyy-MM-dd, Can be Empty)** | Overrides the document's To Date |
| 5. **HR Period Code (Can be Empty)** | Overrides the document's HR Period |
| 6. **HR Year Code (Can be Empty)** | Overrides the document's HR Year |

Each period parameter that is filled wins over the document's own value for that run only — the
document itself is not changed. Dates must be written as `yyyy-MM-dd`, for example `2026-01-31`.

### Sending on a schedule: `EASubmitEltezamData`

For sending at night or re-sending on demand, use a task schedule of type **Action** with
`EASubmitEltezamData` (see [Scheduled Tasks](/platform/automation-and-rules/scheduled-tasks)).

| Parameter | Meaning |
|---|---|
| 1. **Eltezam Configuration Code (Can be Empty when documents are given)** | The configuration to send with. With document codes, it replaces each document's own configuration and is saved on it |
| 2. **MCS Server (IP, host or full URL)** | **Required.** Where to send |
| 3. **Eltezam Submission Document Codes (Comma Separated, Can be Empty)** | The committed submissions to send, e.g. `EZS-0012, EZS-0013` |
| 4–7. **From Date, To Date, HR Period Code, HR Year Code** | The same period overrides as above |
| 8. **Book Code of the Created Eltezam Submission Document (Can be Empty)** | Used only without document codes: the book of the submission the action creates. Empty means the first book of MCS Eltezam Submission |

With document codes, each listed submission is sent exactly as the post-commit flow would send
it, and its grid and log are updated. Without document codes, the action creates a new MCS
Eltezam Submission for the configuration — value date today, From Date, To Date, HR Period and HR
Year taken from parameters 4–7 — commits it, which fills its grid from the configuration's
employee group, and sends it. The new document holds the results like any other submission, and
it is kept even when the run ends as a failure.

### The MCS Server parameter

Both actions require the server parameter, even when the configuration has a Service URL. What
you write there combines with the Service URL:

- a **full URL** (`http://10.1.2.3/EltezamDataService.svc`) is used as it is;
- a **bare host or IP** (`10.1.2.3`) keeps the scheme and path of the configuration's Service URL
  and only swaps the host — handy when the same service path is reached through a different
  gateway.

## What happens during a send

1. The document's previous request log is cleared.
2. For every employee line and every selected operation, Nama builds the requests from the HR
   data, checks them (see **Do Not Send Records Having Validation Errors** on
   [the configuration](./eltezam-setup)), and sends them to the ministry one by one.
3. Each request is logged with the ministry's answer, and each line's state and the document's
   counts are updated.

A request **succeeds** when the ministry answers with a request number. Anything else is a failure
and the ministry's error code and message are kept.

If the ministry's server does not answer — unreachable, timing out, answering with a web page —
three times in a row, Nama stops rather than wait out every remaining employee, and the run ends
as a failure. What that failure keeps depends on what started the run; see
[the three-failures stop rule](/modules/integrations/eltezam/eltezam-troubleshooting#The-three-failures-stop-rule).

## The request log (second page)

The second page of the document, **MCS Eltezam System Entry** (قيد التزام النظامي), holds three
collapsible lists.

![The request log on the MCS Eltezam System Entry tab](../../../ar/modules/integrations/images/eltezam-submission-system-entry-en.png)

**MCS Eltezam System Entry** has one row per request: employee, operation, send state, **Eltezam
Request Number** (رقم طلب التزام) returned by the ministry, **Eltezam Error Code** (كود خطأ التزام),
**Error Message** (رسالة الخطأ), send time, and the key values that were sent — employee ID, job
number, job codes, organization, location, transaction code, gender, health status, basic salary
and IsActive. Many more columns are hidden and can be shown from the column chooser, including
**Request XML** (ملف الإرسال), the exact envelope sent (empty when the configuration's **Do Not
Store Request XML** is ticked), and **Response XML** (ملف الرد), the exact answer received. Filter
the list by employee, operation, send state, request number or error code.

**MCS Eltezam Payslip Element** (عنصر مسير رواتب التزام) has one row per payslip element sent:
employee, state, MCS employee ID, Hijri year and month, consolidation set, element code, name and
classification, amount, net pay and paid date. Filter it by employee, state or Hijri year and
month.

**Eltezam Vacations** (إجازات التزام) has one row per vacation sent: employee, state, MCS employee
ID, vacation ID, vacation code, start and end date, number of days, transaction type, decision
number and decision date. Filter it by employee, state, vacation code or start date.

::: warning Saving a sent submission again clears its log
Saving a committed submission again — even without changing anything — empties the request log on
the second page. An entity flow that runs `EASendEltezamSubmissionDoc` on **Post Commit** runs on
that save too, so with the usual arrangement the whole submission is sent again and the log is
rebuilt from the new answers. Without such a flow nothing is sent, and the grid keeps its
Succeeded / Failed states over an empty log. Check the log before editing a submission you have
already sent.
:::

## Resending the employees that failed

Once the data or the code tables are fixed, press **Resend Failed Employees** (إعادة إرسال
الموظفين الذين فشل إرسالهم), in the actions block of the submission and in the More Actions menu.

It asks nothing: it sends straight to the **Service URL** of the submission's Eltezam configuration
and resends every line that is not **Succeeded**. To send to a different server, correct the Service
URL on the configuration first. Only those employees' old log rows are replaced; the successful employees' rows are
kept. The counts are recalculated, and a summary appears, one line per employee:

```
Retried 3 employees: 5 requests succeeded, 1 failed
1045 Ahmed Ali: 2 succeeded, 0 failed
1046 Sara Omar: 1 succeeded, 1 failed (the ministry's error for her failed request)
…
```

If the ministry's server stops answering during the resend, the summary ends with the same
"Sending stopped…" line as a normal send.

The resend uses the document's own period, not the period overrides an entity flow or task
schedule may have passed. It uses the configuration on the document, which is the one an earlier
run's configuration parameter wrote there, if any.
