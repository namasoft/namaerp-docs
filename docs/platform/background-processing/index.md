---
description: "Landing page for the background queues: business requests, pending tasks, system actions, report monitoring and task queues, and which screen to check for a given complaint."
---
# Background Processing

Nama does a great deal of work behind you. Saving an invoice hands you the screen back immediately
and writes its accounting entry a moment later; approving a document sends the email afterwards;
a payroll rebuild is queued rather than made to happen while you wait.

That is what keeps the system quick, and it is also why work can occasionally go missing without
anyone being told. A document can be saved and correct while its accounting effect failed. A
notification can be raised and never sent. These are the screens where that becomes visible, and
they are the first place to look whenever the answer to "but I saved it" is "yes, you did".

Each queue below is separate, with its own screen, its own worker and its own rules about
retrying.

<LandingGrid>
  <LandingCard icon="🧾" title="Business Requests" link="/platform/background-processing/business-requests.md" details="A document's accounting and inventory effects — how to find one that failed, and the difference between reprocessing it and recommitting the document." />
  <LandingCard icon="📤" title="Pending Tasks" link="/platform/background-processing/pending-tasks.md" details="The outbox for email, SMS, WhatsApp and push notifications — why a message is stuck, and how to revive one the system has given up on." />
  <LandingCard icon="⚙️" title="System Actions" link="/platform/background-processing/system-actions.md" details="Deferred internal work such as payroll rebuilds and outgoing calls, plus the journal of automatic stock-cost repairs." />
  <LandingCard icon="📊" title="Report Monitoring" link="/platform/background-processing/report-monitoring.md" details="What the server is running right now, how to end a report that will not finish, and the log of who ran what." />
  <LandingCard icon="🚦" title="Task Queues" link="/platform/background-processing/task-queues.md" details="Split background work into parallel lanes so a slow scheduled task or entity flow stops holding up everything behind it." />
</LandingGrid>

## Which queue am I looking for?

| The complaint | The screen |
|---|---|
| "The invoice is saved but it is not in the ledger." | Business Requests |
| "Stock did not move." | Business Requests |
| "The approval email never arrived." | Pending Tasks |
| "The customer got no SMS." | Pending Tasks |
| "The salary sheet did not rebuild." | System Actions |
| "The system is slow and I do not know what it is doing." | Report Monitoring |
| "One slow job is holding up all the others." | Task Queues |

The one queue **not** covered here is the task scheduler, which runs jobs on a timer and keeps its
own execution log — see [Scheduled Tasks](/platform/automation-and-rules/scheduled-tasks). How its work, and deferred
entity flows, can be split into parallel lanes is covered in
[Task Queues](/platform/background-processing/task-queues).
