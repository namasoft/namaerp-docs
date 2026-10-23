---
description: "Overview of the CRM support screens (Complaint, Trouble Ticket, Ticket Execution, Ticket Follow Up, Service Contract): how they link and how to set the desk up."
---
# Support Overview

::: info Required licence
`crm`. Every screen described in this folder is part of the plain CRM licence — there is no separate support licence to buy.
:::

At 09:40 on a Tuesday morning somebody at Marina Plaza Hotels picks up the phone and tells Al Nokhba that a guest-room split unit stopped working after last night's power cut. From that moment on, everything the support desk does lives in this folder: who called, what about, whether the unit is still covered, who was sent, how long they took, and what was said to the customer along the way.

This page explains how the pieces fit together — and, just as importantly, what the support corner of CRM deliberately does **not** do.

## The screens

You reach all of them from **Customer Relationship Management → Support**.

| Screen | Arabic | What it is |
|---|---|---|
| **Complaint - Suggestion** | شكوي - إقتراح | The intake log — see [Complaints](/modules/crm/support/crm-complaints.md) |
| **Trouble Ticket** | طلب دعم | The case file, with a status and a clock — see [Trouble Tickets](/modules/crm/support/crm-trouble-tickets.md) |
| **Ticket Execution** | تنفيذ طلب دعم | The technician's timesheet — see [Ticket Executions](/modules/crm/support/crm-ticket-executions.md) |
| **Ticket Follow Up** | متابعة طلب دعم | The conversation record, and the status gateway — see [Ticket Follow-Ups](/modules/crm/support/crm-ticket-follow-ups.md) |
| **CRM Service Contract** | عقد خدمة | The paid cover agreement, which is also the invoice — see [Service Contracts](/modules/crm/support/crm-service-contracts.md) |
| **CRM Update Contract Status** | تغيير حالة عقد خدمة | A one-purpose document that stamps a status onto a contract |

## Two doors into the same work

The desk has two intake documents, and new installations regularly ask which one they are supposed to use. The honest answer is that only one of them is compulsory.

**The Complaint - Suggestion** answers *"who called, about what, and is the product still covered?"* Its real value is the search built into it: pick the customer, press **Search**, and the screen offers rows drawn from that customer's committed sales invoices (or service contracts, depending on how CRM Settings is configured). Choosing the right row fills in the invoice, the product, the serial number, the warranty period and end date, and the address in one action. It is also the only screen in CRM that can record a **suggestion** or a plain **remark** rather than a fault.

**The Trouble Ticket** answers *"who is fixing it, since when, and where is it now?"* It is the document with a status, an assignment grid, a stopwatch and a running discussion thread. Any real work is tracked here.

A desk that logs every inbound call — including questions and compliments — will want both, and will press **Convert To Ticket** on the minority that turn into technical work. A desk that only ever records faults can skip the complaint entirely and raise tickets directly; nothing is lost except the invoice search.

::: warning The complaint is a log, not a workflow
The complaint validates nothing at all, and its **Status** field is never changed by any process — not even by Convert To Ticket. A complaint that has spawned three tickets still reads *Initial* until somebody edits it by hand. Treat it as a notepad with good auto-fill, not as a case that progresses.
:::

## The chain that actually exists

```
Complaint - Suggestion
        │ Convert To Ticket
        ▼
   Trouble Ticket ─────► Ticket Execution   (hours worked, completion %)
        │        └─────► Ticket Follow Up   (what the customer said, and the ticket's new status)
        │
        ├─ Convert To FAQ ──► CRM FAQ entry
        └─ development request ──► CRM Development Request
```

Every arrow on that diagram is a button somebody presses. Nothing on it happens on a timer, and each generated document opens **unsaved** — you still have to fill in what is missing and save it.

Following the canonical example: complaint `CMPL-0207` on 6 April becomes ticket `TKT-0451`; two executions (`TEXE-0662` and `TEXE-0679`) record 4.0 and 3.0 hours; follow-up `TFUP-0333` parks the ticket on *Postponed* while a compressor is on order; and service contract `CSC-0044` is what makes the ticket read *Covered By Contract*.

## Support and machine maintenance are separate worlds

This is the single most common wrong assumption about the CRM menu, so it is worth stating bluntly.

::: danger A trouble ticket cannot be raised against a maintained machine
The machine maintenance suite — machine files, maintenance orders, maintenance notices — is a **different product** that happens to sit in the same menu. The Trouble Ticket's **Product** field accepts stock items and real-estate rental units only. A machine registered in the maintenance suite cannot be selected on a ticket, on a warranty, or on a service contract line.

There is no button, no reference field and no report that joins the two. If your business maintains registered machines, faults on those machines are logged as **maintenance notices** in the [maintenance cycle](/modules/crm/maintenance-cycle/crm-maintenance-overview.md), not as trouble tickets. Do not plan an after-sales process that hands work from one to the other — the hand-off does not exist.
:::

The two also keep **separate warranty registers**. The warranty a trouble ticket consults is the CRM warranty file described on the [Warranties](/modules/crm/master-files/crm-warranties.md) page. The maintenance suite keeps its own warranty periods on the machine file. Neither one reads the other, so a product covered in one register is invisible to the other.

## What this area does not have

Read this list before you promise a customer anything.

- **No service-level agreements.** Severity, Ticket Type, Relative Weight and Expected Execution Date are labels on the ticket for filtering and reporting; no deadline or priority rule is built on them, and Estimated Fix Period is not compared automatically with Actual Fix Period.
- **No due-date alarm and no breach detection.** Nothing watches the clock.
- **No escalation state.** *Escalate To* is a single field plus a button that stamps it. It changes no status, notifies nobody, and there is no queue of escalated cases.
- **No notifications of any kind** — no e-mail, no user message, no mobile push when a ticket is assigned, changes status or goes stale.
- **No scheduler anywhere in CRM.** There is no task schedule, no reminder and no recurring job in the whole module. Everything that looks scheduled happens because a person pressed a button.
- **No stock and no money.** No document in this folder except the service contract touches inventory or the ledger. A ticket execution does not consume spare parts and does not bill labour; if parts are needed, they are issued with an ordinary stock document and nothing links that document back to the ticket.
- **No customer-facing portal.** Customers cannot see, raise or comment on their own tickets, and the FAQ file that a ticket can create is an internal notebook for your staff — see [FAQ](/modules/crm/master-files/crm-faq.md).

## Where to see a customer's history

There is no "support history" tab on the customer file. What support staff use instead:

1. **The Trouble Ticket list screen**, filtered by **Customer**. Its criteria are Customer, Responsible Employee and Product, and it shows Customer, Responsible Employee, Product, Serial Number and Status. This is the intended per-customer history view.
2. **The Ticket Execution list screen**, filtered by Trouble Ticket, Employee, External Responsible or Customer — the right place to answer "how many hours did we spend on this customer?"
3. **The complaint's Related Records tab**, which lists the tickets, executions and follow-ups descending from *that one complaint*.
4. **The ticket's own Executions and Follow Up tabs**, scoped to that one ticket.
5. **The service contract's Executions tab**, which lists tickets that were matched to that contract — see [Service Contracts](/modules/crm/support/crm-service-contracts.md).

## Reporting: none

CRM ships **no system reports and no dashboards at all** — not for tickets, not for complaints, not for contracts. The module's only printed form belongs to the CRM Visit, elsewhere in the module. For anything resembling a support report, use the list screens above with their criteria, export to Excel, or build the figures in BI. This is covered in full on [Reports and Printed Forms](/modules/crm/crm-reports-and-forms.md).

## Setting the desk up

Before the first call comes in:

1. Create the classification files the desk will pick from — **Complaint Type**, **Complaint Source**, **Problem Classification** and **Problem**. These are described on [Problem and Complaint Catalogues](/modules/crm/master-files/crm-problem-and-complaint-catalogues.md).
2. In **CRM Settings**, set **Compliant Source** (Sales Invoice or Service Contract — this decides what the complaint's search offers) and **Number Of Result Sources Of Complaint** (how many rows it pulls; it falls back to 10 when blank). See [CRM Settings](/modules/crm/crm-configuration.md).
3. Create **Books** for the four support documents, so each gets its own numbering. None of the four uses a document term, so there is nothing else to configure on them — the only document in this folder with a term is the service contract.
4. Register the **warranties** that shipped with the products you sell, and raise **service contracts** for the cover customers have bought. Without at least one of the two, every ticket will report *Not Covered*.
5. Decide whether support documents should carry satisfaction surveys. Adding Trouble Ticket or Complaint - Suggestion to **Add Questionairs Page To** in CRM Settings gives those screens an extra questionnaire tab and a *Create Questionair* action.
