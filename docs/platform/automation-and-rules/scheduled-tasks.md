---
entities: [TaskSchedule]
menu: Basic → Settings → Task Schedule
---
# Scheduled Tasks (Task Scheduler)

Task Scheduler lets you automate recurring operations in Nama ERP. Whether you need to send daily reports to managers, run system maintenance queries, generate recurring documents, or notify users when certain conditions are met, the Task Scheduler handles it all—running quietly in the background while you focus on your business.

A task starts running on its own schedule a few minutes after the server starts (see [Initial Delay](#Initial-Delay)), and you can also trigger any task instantly with the [Run Now](#Running-a-Task-on-Demand) button.

![A Task Schedule record](../../ar/platform/images/automation-and-rules/task-schedule-screen-en.png)

## Understanding Task Types

When you create a scheduled task, the first decision you'll make is choosing the **Schedule Type**. This determines what kind of action the task performs when it runs. Let's walk through each type:

### Report (Email Report)
The most common use case. The system runs a report and emails it to the recipients you specify. You select a report definition, choose the output format (HTML, PDF, Excel, …), and decide who receives it.

### Print Report
Like the Report type, but instead of emailing, the report is sent straight to a printer. You specify the printer name that's configured on the server.

### Notification
Sends notifications to users based on a query and one or more templates. You can target three channels at once:
- In-app notifications
- Email messages
- SMS messages

### System
Executes a native SQL statement directly against the database. Use this for maintenance operations, data cleanup, or batch updates. The statement runs as-is, so use it with care.

### Action
Runs a server action class. This is the most flexible option—you enter the fully qualified class name of the action and up to 15 parameters. The system validates the parameters before execution and shows a description of what the action does (and of each parameter it expects) directly on the screen.

### Parameterized Report (Email)
A powerful variation of the Report type. Instead of running the report once, it first collects a set of parameter rows—either from a SQL query or from the **Params** grid—then runs the report once for every row. Each iteration can carry different parameter values and go to different recipients. See [Parameterized Reports](#Parameterized-Reports).

### Parameterized Report (Print)
The same as above, but each report iteration is sent to a printer instead of by email.

### Recurring Document
Automates the creation of recurring documents. You link the task to a Recurring Document definition, and it generates new documents according to the schedule.

### Read Magento Orders / Read Magento Returns
For e-commerce integration—pulls orders or returns from a configured Magento site. In a multi-site (replication) deployment, these run only on the head office or on the sites listed in **Run in Sites**.

### Purge Expired Reward Points
A specialized task for loyalty programs that removes expired reward points from the system.

### Read E-Invoice Notifications
For e-invoicing integrations—reads notifications back from the intermediary e-invoicing server.

## Scheduling Options

The scheduler offers two ways to express *when* a task runs: a friendly checkbox interface or direct cron-style fields. Whichever you choose, the result is the same underneath—the checkboxes are simply translated into the cron fields when you save.

### Simple Scheduling (Checkbox Mode)

When **Using Cron** is unchecked, you get an intuitive scheduling interface.

**Run Every X Minutes / Hours / Days / Months**
The simplest approach. Set **Run On** to a number (like 5) and **Run On Type** to "Minute" to run every 5 minutes. Examples:
- Run On: 10, Run On Type: Minute → runs every 10 minutes
- Run On: 2, Run On Type: Hour → runs every 2 hours
- Run On: 1, Run On Type: Day → runs once a day

::: tip Run Every X takes precedence
When you fill in **Run On** + **Run On Type**, that "every X" pattern overrides the time-of-day, weekly, and monthly selections for the matching unit. Use *either* "Run Every X" *or* the weekly/monthly + time-of-day selectors—not both for the same unit.
:::

**Weekly Schedule**
Check **Weekly**, then select which days of the week to run. Tick **Run On All Week Days** to run every day, or choose any combination of Saturday through Friday.

**Monthly Schedule**
Check **Monthly** and select:
- Which months to run (tick **Run On All Months**, or pick January through December)
- Which days of the month to run (1st through 31st)

**Time of Day**
For weekly and monthly schedules, you specify exactly when during the day to run. Select any 30-minute time slots from 00:00 to 23:30.

### Advanced Scheduling (Cron Mode)

When **Using Cron** is checked, you fill in five separate scheduling fields directly. Each field controls one part of the timing:

| Field | Allowed values |
|-------|---------------|
| Minute | `0`-`59`, or `*` for every minute |
| Hour | `0`-`23`, or `*` for every hour |
| Day of Month | `1`-`31`, or `*` for every day |
| Month | `1`-`12` (or `JAN`-`DEC`), or `*` for every month |
| Day of Week | `0`-`7` where both `0` and `7` mean Sunday (or `SUN`,`MON`,`TUE`,`WED`,`THU`,`FRI`,`SAT`) |

Every field accepts the standard cron forms: a single value (`8`), a list (`1,3,5`), a range (`1-5`), or a step (`*/5`). A field left blank is treated as `*`. Each field must be a single token with **no spaces**.

::: info When exactly does it fire?
A task fires at the **start (second :00)** of every minute that matches all five fields. So `Minute = 0`, `Hour = 8` means "08:00:00 every day".
:::

**Common patterns:**
- Minute `0`, Hour `8` → every day at 8:00 AM
- Minute `*/30` → every 30 minutes
- Minute `0`, Hour `0`, Day of Month `1` → first day of every month at midnight
- Minute `0`, Hour `9`, Day of Week `1-5` → every weekday at 9:00 AM

If you enter an invalid combination, the task won't save—the system validates the schedule and reports the error.

## Running a Task on Demand

You don't have to wait for the next scheduled time. Open the task and click **Run Now** to execute it immediately—handy for testing a new task or re-running one after fixing a problem. A manual run behaves exactly like a scheduled run, including [execution logging](#Execution-Log) and [error notifications](#Error-Notification).

## Targeting Recipients

You have several ways to specify who receives reports and notifications, and they can be combined:

### Direct Email Addresses
Enter email addresses directly in the **Target Emails** field, separated by commas or on separate lines.

### Target Reference
Select a single reference that resolves to one or more people:
- **Employee** → that specific employee
- **Organization Position** → all employees in that position
- **Master Group** → all members of the group
- **Special Responsible** → based on special-responsibility assignments

### Target Criteria
Define dynamic criteria that calculate the recipients. This is useful when the recipient depends on the data being processed.

### Target Lines
Add multiple target references in a grid for more complex recipient lists.

All of these are merged together: emails resolved from references, criteria, and target lines are combined with the direct **Target Emails** into one recipient list.

## Parameterized Reports

This feature runs a single report many times with different parameters—ideal for sending each manager, customer, or branch their own tailored copy. Choose **Parameterized Report (Email)** or **Parameterized Report (Print)** as the schedule type.

There are two ways to supply the parameter rows:

1. **A SQL query** — put the query in the **Query** field and the column-name mapping in **Query Fields**. The report runs once per returned row. (If you leave **Query Fields** blank, the query's own column names are used.)
2. **The Params grid** — define rows manually instead of writing a query (see [Parameters Collection](#Parameters-Collection)).

::: warning One source only
You can't use both a **Query** and the **Params** grid on the same task. Choose one.
:::

**Choosing the channel.** Each iteration respects two switches:
- **Send As Mail** (on by default) → emails the rendered report.
- **Send As Notification** → also sends the report to the recipients as an in-app notification.

::: tip Skip the email when an iteration has no data
If you don't want a message sent for an iteration whose report comes out empty, control this in the **report template (JasperReports)** itself rather than in the task. Set the template's **"When No Data"** behavior to **No Pages** (instead of "Blank Page" or a "No Data" section). A report that produces no pages generates nothing to attach, so that recipient is simply skipped—no empty email goes out. This applies to the plain **Report** type as well.
:::

### Query result column conventions

When you drive the report from a query, special column names tell the system how to use each value:

| Column | Meaning |
|--------|---------|
| `subject` | The email subject line for that row |
| `sendto` | A plain email address to send that row to |
| `sendto#type` and `sendto#id` | A reference (employee/position/group) whose members receive that row |
| `parameterName#type` and `parameterName#id` | A reference value for the report parameter named `parameterName` |
| `parameterName` | A plain value for the report parameter named `parameterName` |

**Example: Employee Residency Expiration Alerts**

This sends a personalized report to each employee's supervisor about residency permits that are expiring.

**Query:**
```sql
select
  case when DATEDIFF(day, GETDATE(), residencyEnd) < 1
       then N'الاقامة انتهت منذ '
       else N'باقي علي انتهاء الاقامة '
  end + cast(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) as nvarchar(100)) + N' يوم' as subject,
  'Employee' as sendto#type,
  supervisor_id as sendto#id,
  'Employee' as employee#type,
  id as employee#id
from Employee
where DATEDIFF(day, GETDATE(), residencyEnd) < 30
order by 2
```

**Query Fields:**
```
subject,sendto#type,sendto#id,employee#type,employee#id
```

This runs the report for each employee whose residency expires within 30 days, fills in the report's `employee` parameter, and emails the result to that employee's supervisor.

**Alternative: send to the employee's own email**

Replace the `sendto` reference columns with the employee's contact email:
```sql
select
  case when DATEDIFF(day, GETDATE(), residencyEnd) < 1
       then N'الاقامة انتهت منذ '
       else N'باقي علي انتهاء الاقامة '
  end + cast(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) as nvarchar(100)) + N' يوم' as subject,
  contactInfoEmail as sendto,
  'Employee' as employee#type,
  id as employee#id
from Employee
where DATEDIFF(day, GETDATE(), residencyEnd) < 30
order by 2
```

## Query-Based Notifications

Use the **Notification** schedule type to send in-app notifications, emails, or SMS messages built from a SQL query. Fill in:

1. **Query** — a SQL query that returns the notification data.
2. **Query Fields** — the comma-separated column names (optional; defaults to the query's own column names).
3. The **template(s)** for the channel(s) you want—Email, Notification, and/or SMS (see [Notification Templates](#Notification-Templates)). A channel is used only when its template is filled in.

The same [column conventions](#Query-result-column-conventions) apply (`subject`, `sendto`, `sendto#type`/`sendto#id`, …) so each notification can be addressed to the right person.

**Example:**
```sql
select
  case when DATEDIFF(day, GETDATE(), residencyEnd) < 1
       then N'الاقامة انتهت منذ '
       else N'باقي علي انتهاء الاقامة '
  end + cast(ABS(DATEDIFF(day, GETDATE(), residencyEnd)) as nvarchar(100)) + N' يوم' as subject,
  'Employee' as sendto#type,
  supervisor_id as sendto#id
from Employee
where DATEDIFF(day, GETDATE(), residencyEnd) < 30
order by 2
```

## Notification Templates

When using the Notification schedule type, you can configure templates for three channels:

**Email Template** — HTML content for the email body. Use placeholders like `{columnName}` to insert query-result values.

**Notification Template** — content for in-app notifications.

**SMS Template** — short text content for SMS messages.

Each template supports the complex-renderer syntax, with placeholders filled from the query results.

## Email Customization

### Subject and Attachment Name Templates
You can customize email subjects and attachment filenames using templates with placeholders:

- **Email Subject Template** — a template whose placeholders are filled from the report or query.
- **Email Subject Query** — a SQL query that supplies values for the subject template.
- **Attachment Name Template** — a template for the attached file's name.
- **Attachment Name Query** — a SQL query that supplies values for the attachment name.

### Output Format
**Attached File Format** picks the format of the report file attached to the email; left empty, it is HTML:
- HTML, PDF
- Excel (XLSX, XLS), Word (DOCX), RTF, PowerPoint (PPTX), OpenDocument (ODT, ODS)
- TXT — the report laid out as plain text
- CSV — the report's grid as comma-separated values
- JSON — one entry per printed line of the report, with its cells lined up under the column headers; useful when the
  file is read by another system rather than by a person

### Preferred Email Sender
Select a specific configured email sender to use for outgoing emails from this task.

## Monitoring & Error Handling

### Execution Log
Turn on **Enable Execution Log** to keep a history of every run. Each time the task executes—whether on schedule or via [Run Now](#Running-a-Task-on-Demand)—a new line is recorded in the **Task Schedule Execution Log** grid on the task, capturing:

- **Start Time** — when the run began
- **End Time** — when it finished
- **Status** — *Running* while in progress, then *Success* or *Failed*
- **Error Message** — a short reason when the run failed

This gives you an at-a-glance audit trail: you can confirm a task is actually firing on schedule, see how long each run takes, and spot a run that failed.

To stop the history growing without end — an every-minute job writes more than 1,400 lines a day — fill **Execution Log Retention By Days** on the task header. Each logged run then deletes this task's log lines older than that many days. Leave it at 0 or empty to keep every line.

### Error Notification
Configure **When Errors Notification** to send an alert whenever the task fails. That notification definition must be:
- Set to "Use Manually"
- Configured for Task Schedule

If no error notification is configured, the system automatically notifies the **admin** user with the error details.

### Error Information
When a task fails, the latest error is kept on the task itself (and shown in the **Task Schedule Errors** list):
- **Error Message** — a brief description of what went wrong
- **Error Description** — the full technical trace, for deeper debugging

## Advanced Options

### Task Queue

By default every scheduled task in the system shares a single lane and runs in single file: a task that overruns delays whatever was due next, however unrelated the two are. A forty-minute nightly report and a five-minute order sync end up waiting on each other for no better reason than that they were both scheduled.

Set the **Task Queue** field to move this task into a lane of its own. The rule is:

> Tasks on **different** queues run at the same time. Tasks on the **same** queue never do — each waits for the one before it to finish.

Leave the field empty and the task stays in the built-in default lane along with every other task that has no queue — exactly as it behaved before queues existed. Nothing you already have changes until you start assigning queues.

Queues are created at **Basic → Settings → Task Queue**, and each queue's screen lists the schedules assigned to it with their next run time. There is a full guide — including how the same queues carry deferred entity flows, and how many queues are worth creating — in [Task Queues](/platform/background-processing/task-queues).

::: warning Two tasks that touch the same data belong on the same queue
Splitting is not free. Before queues, two scheduled tasks could never overlap, so tasks writing to the same records were safe by accident. Put them on different queues and they really will run simultaneously. When two tasks must not collide, give them the **same** queue.
:::

### Seeing what is scheduled and what is running

Two read-only pieces of information are available for every scheduled task:

- **Expected Next Run** — when the scheduler will fire this task next.
- **Currently Running** — whether it is executing at this moment.

They are read live from the running scheduler rather than stored on the task, so they appear only where the system can ask the scheduler for them: on the **Pending Task Schedules** list (**Administration → Settings**), and on the **Queued Task Schedules** grid of each Task Queue.

The Pending Task Schedules list is the fastest answer to "why has this task not run?" — a task that is scheduled appears there with its next run time; a task that does not appear is not scheduled at all, and the reason will be on the task itself (inactive, never committed, or restricted to other sites).

### Allow Simultaneous Runs
By default, if a task is still running when its next scheduled time arrives, the new execution is skipped (and a note is logged) so the same task never overlaps itself. Enable **Allow Simultaneous Runs** to let multiple instances run in parallel.

### Run in Sites (Replication)
For multi-site deployments with replication enabled, you can specify which sites should run this task. Leave it empty to run on the current site, or select specific sites. (Magento and similar integration tasks additionally restrict themselves to the head office unless sites are listed here.)

### Inactive
Check **Inactive** to temporarily disable a task without deleting it. The task stays in the system but won't be scheduled or run.

### Development Mode
By default, scheduled tasks don't run while the server is in debug mode. To enable task execution during development, add this to `nama.properties`:
```properties
run-task-schedules-in-debug-mode=true
```

### Initial Delay
Tasks don't start the instant the server starts—there's a 5-minute default delay so the system can settle first. Customize it in `nama.properties`:
```properties
tasks-initial-delay-minutes=10
```

## Implementation Repository Integration
Tasks can be saved to the Implementation Repository for deployment across environments:
- **Save to Implementation Repository** — include this task in exports.
- **System Report** — mark it as a system-provided task.

## Parameters Collection
For Parameterized Report tasks, you can define the parameter rows in the **Params** grid instead of a SQL query. Each line specifies:
- **Send To** — the recipient (a reference or email) for this parameter set.
- **P1 through P15** — the parameter values. Each can be a reference, a date/time, a static value, or a dynamic expression evaluated against the task.

For a report parameter that accepts several values, save the values once as a [Multi Value Report Parameter](/platform/reports/multi-value-report-parameters) and pick that record in the slot's **Ref** column.

::: warning
You cannot use both a Query and the Params collection on the same task. Choose one approach.
:::

## Practical Example Scenarios

### Daily Sales Summary to Management
- Type: Report
- Report: Daily Sales Summary
- Output Format: PDF
- Weekly: all weekdays selected
- Time: 08:00
- Target Emails: management@company.com

### Monthly Invoice Reminders
- Type: Parameterized Report (Email)
- Query: select unpaid invoices older than 30 days, mapping each customer's email to `sendto`
- Report: Invoice Reminder Letter
- Monthly: all months, Day 1
- Each customer receives their own copy

### Nightly Database Maintenance
- Type: System
- Query: `EXEC sp_updatestats`
- Daily at 02:00
- No recipients needed

### Real-time Order Sync
- Type: Read Magento Orders
- Run Every: 5 Minutes
- Magento Site: configured site reference
- Enable Execution Log to confirm each sync ran
