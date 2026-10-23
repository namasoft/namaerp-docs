---
entities: [EltezamSubmissionDoc, EltezamConfiguration, EltezamCodeTable]
---
# Eltezam Troubleshooting

Eltezam problems fall into three kinds, and the error code on the request log tells you which one
you are looking at before you read a word of the message:

| Error code | Where the problem is | Who fixes it |
|---|---|---|
| `001-000000` | Nama's own check refused the request before sending, or the request could not be built | Fix the HR data or the code tables |
| `500-000001` | The ministry's server could not be reached or did not give a usable answer | Fix the server address or the network |
| Anything else | The ministry received the request and refused it | Read the ministry's message — the code and text come from MCS unchanged |

All the messages Nama itself raises for Eltezam are in English only; they appear in English on
Arabic screens too. The ministry's own refusals appear in whatever language MCS writes them.

## Where to look

1. **The Details grid** of the submission — the **Last Eltezam Error** column gives the latest
   error for each employee.
2. **The second page** (MCS Eltezam System Entry) — one row per request, with the operation, the
   error code and the full error message. Filter by send state **Failed** to see only the problems.
3. **Request XML / Response XML** — hidden columns on the same list, showing exactly what was sent
   and exactly what came back. This is what to forward to MCS when the ministry's refusal is
   unclear.
4. **The server log** — every line starts with `Eltezam: `. For each request it shows the full
   envelope, the HTTP answer and a field-by-field report of what was sent, what was left out and
   what is worth a second look; for a refused request it also prints the envelope with line
   numbers, so a ministry message that names a line can be matched to a field.

![The Details grid of a submission, with the send state, operation counts and Last Eltezam Error for each employee](../../../ar/modules/integrations/images/eltezam-submission-details-grid-en.png)

## The three-failures stop rule

When the ministry's server fails to answer — it cannot be reached, it times out, the address is
wrong, it answers with nothing or with a web page — **three times in a row**, Nama stops the run
instead of trying every remaining employee against a server that is down. The employees not yet
reached stay **Not Sent**, and the run reports:

*Sending stopped after 3 technical failures in a row, the MCS server ({0}) is not answering*

where `{0}` is the address Nama was calling. Only `500-` failures count toward the three; a
refusal from the ministry, or a record held back by Nama's own checks, does not. One successful
request resets the count. Fix the address or the connection, then press **Resend Failed
Employees** — it picks up the Failed and the Not Sent lines alike.

## Common problems

**Nothing happened when I committed the submission.** That is expected: committing does not send.
Check that an entity flow runs `EASendEltezamSubmissionDoc` on the submission's Post Commit, or
send it from a task schedule — see [Submissions and sending](./eltezam-submissions-and-sending).

**Every request fails with `500-000001`.** The address is wrong or unreachable from the Nama
server. The server parameter of the entity flow or task schedule decides the address, combined
with the configuration's **Service URL** as described on the sending page. Try the address from
the Nama server itself; the service sits on the Government Service Bus, which is usually not
reachable from ordinary networks.

**The request log is empty but the grid says Succeeded.** The submission was saved again after it
was sent, which clears its log. The grid still shows the last send's result.

**An employee's line is Not Sent although nothing failed.** Nothing was produced for that
employee: for example, only payslips were selected and the employee has no committed salary
document in the period, or only vacations were selected and none starts in the period.

**Vacations or historical info from past years were sent.** The submission had an HR Period but no
From / To Date. Those two operations are narrowed by the dates, not by the HR period — see
[which documents count as "in the period"](./eltezam-data-sources#Which-documents-count-as-in-the-period).

**A date "falls outside the configured hijri calendar".** Every date is sent in Hijri. Load the
Hijri calendar table back to the earliest date named in the message — typically an old birth date
or hiring date.

## Messages you may see

### Nama's checks before sending (code `001-000000`)

The field name at the start of each message is the ministry's name for the value. Where the
message says where to fill it, that is the place to look; the tables on
[What Nama sends to Eltezam](./eltezam-data-sources) give the full source of every value.

| Message | Why | What to do |
|---|---|---|
| *EmployeeID is required* | The employee has no code | Give the employee a code |
| *Either a national ID or an Iqama number is required* | Neither the national ID number nor the residency number is filled on the employee | Fill one of them |
| *{0} must be exactly {1} characters, but {2} is {3}* | A code or ID has the wrong length — e.g. a national ID that is not 10 characters, a location code that is not 7 digits | Correct the value on the employee or the MCS Code in the code table |
| *{0} is required, fill it in {1}* | A value MCS requires came out empty; the second half names where it comes from, for example *LocationCode is required, fill it in the LocationCode code table: a grid row keyed on the employee Work Place, …* | Add the missing code-table row, template or default the message names |
| *{0} is required* | A required value is empty — e.g. `BirthDate`, `MinistryHireDate`, `PersonNameAr.FirstName`, `Gender` | Fill the matching field on the employee, or the code table for coded values |
| *{0} is required when the code is {1}* | An "other" code (such as the job name `000000000`) needs a description beside it | Map the record to a specific MCS code instead of the "other" code |
| *TerminationDate is required when a termination reason is sent* | A termination reason was produced without a firing date | Fill the firing date, or correct the TerminationReasonCode table |
| *EndDate is required for job transaction {0}* | The job transactions `JTXN-04` and `JTXN-05` need a position end date | Use a different Default MCS Code on JobTransactionCode, or fill the firing date |
| *At least one payslip element is required* | Every line of the salary document is zero | Check the salary document |
| *A payslip request accepts at most 100 elements* | One salary document has more than 100 non-zero lines | Check the salary document |
| *A vacation request accepts at most 100 vacations* | More than 100 vacation documents fall in the period for one employee | Narrow the period |
| *A qualification request accepts at most 100 qualifications* | The employee has more than 100 qualification lines | Remove duplicate qualification lines |
| *UniversityName is required when the university code is 998 or 999* | The institute text is empty on a qualification mapped to "other" | Fill the institute on the qualification line |
| *Result (N3 of the employee evaluation, the score out of 5, is empty) is required* | The evaluation's **Number 3** (N3) score is empty or zero | Fill **Number 3** on the evaluation |
| *StartDate (Date 1 of the employee evaluation) is required* / *EndDate (Date 2 of the employee evaluation) is required* | The evaluation's Date 1 or Date 2 is empty | Fill both dates on the evaluation |
| *{0} ({1}) falls outside the configured hijri calendar, so it cannot be sent. Load the hijri calendar files back far enough to cover it* | The Hijri calendar table does not cover this date | Extend the Hijri calendar table |
| *Could not build the request: {0}* | Nama could not assemble the request from the data | Read the rest of the message; check the server log line for the employee |

### Reaching the ministry (code `500-000001`)

| Message | Why | What to do |
|---|---|---|
| *No Eltezam server was supplied, pass it as the server parameter of the entity flow action* | Neither the server parameter nor a Service URL gave an address | Fill the MCS Server parameter |
| *The Eltezam server ({0}) is not a usable address* | The address could not be read as a URL | Correct the parameter or the Service URL |
| *Empty response received from the Eltezam service* | The server answered with nothing | Check the address points at the Eltezam service itself |
| *The address answered with a web page instead of an Eltezam response, check the MCS server parameter of the entity flow. It starts with: {0}* | The address reached a web server, a login page or a proxy, not the service | Correct the path of the address |
| *The Eltezam service refused every SOAP action this version knows, so its operations are named differently. Ask MCS for the WSDL and compare it with what was tried:* | The service is reached but names its operations differently from every variant Nama knows | Send the message, which lists every variant tried, and the WSDL from MCS to Nama support |
| A technical message such as *SocketTimeoutException: Read timed out* or *UnknownHostException: …* | Time-out, unknown host or refused connection | Check the network; raise **Read Timeout Seconds** on the configuration if the ministry is only slow |

### Running the actions and the resend button

| Message | Why | What to do |
|---|---|---|
| *This action runs on an Eltezam submission document only, move the entity flow from {0} to {1}* | `EASendEltezamSubmissionDoc` was put on an entity flow of another screen | Move the flow to MCS Eltezam Submission |
| *The Eltezam submission document {0} is a draft, commit it before sending* | The submission is still a draft | Commit it first |
| *An Eltezam configuration is required, either on the document or as the second parameter* | No configuration on the document or in the parameter | Fill **Eltezam Configuration** |
| *Could not find an Eltezam configuration with code {0}* | The configuration code in the task schedule is wrong | Correct the code |
| *Either an Eltezam configuration code or the Eltezam submission documents to send is required* | `EASubmitEltezamData` was given neither | Fill parameter 1 or 3 |
| *Could not find an Eltezam submission document with code {0}* | A code in the list of submissions is wrong | Correct the list |
| *Could not find an HR period with code {0}* / *Could not find an HR year with code {0}* | The HR Period or HR Year parameter does not exist | Correct the code |
| *From Date ({0}) must be written as yyyy-MM-dd, for example 2026-01-31* (or *To Date …*) | A date parameter is in another format | Rewrite it as `yyyy-MM-dd` |
| *Save the Eltezam submission document before retrying it* | Resend was pressed on an unsaved document | Save and commit first |
| *An Eltezam configuration is required before sending* | Resend on a document with no configuration | Fill **Eltezam Configuration** |
| *Fill the Service URL of the Eltezam configuration {0}, resending the failed employees sends to it* | Resend on a document whose configuration has no Service URL; the resend always sends there | Fill the Service URL |
| *Every employee of the document {0} was already sent successfully, there is nothing to retry* | All lines are Succeeded | Nothing to do |

### Setting up

| Message | Why | What to do |
|---|---|---|
| *No employees to send, either select an employee group or add employees manually* | Committing a submission with an empty grid | Pick an employee group, or add employees |
| *No Eltezam operation is selected, either on the document or on the Eltezam configuration* | No Send … box on the document or the configuration | Tick at least one |
| *Another Eltezam code table already covers {0}, use that one instead* | A second table for the same lookup list | Open the existing table instead |
| *Could not open {0} to every context, this database has no public value for {1}* | `EACreateEltezamCodeTables` could not set a dimension of the table to "any" | Create the missing public value for the dimension named, then run the action again |
