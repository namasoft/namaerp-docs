---
description: "Map of the CRM menu: the five separate products it holds (support and marketing, maintenance, services and more), their licences, and what the module does not do."
---
# CRM Overview

The Customer Relationship Management menu — «خدمة العملاء» — is one of the widest branches in Nama ERP. It holds ninety-six screens covering sales leads, marketing campaigns, customer visits, support tickets, service contracts, questionnaires, and a full equipment-maintenance operation with its own contracts, work orders and invoices.

Before you set any of it up, there is one thing worth understanding, because almost every wrong expectation about this module comes from not knowing it.

## This menu holds five separate products, not one system

It is natural to look at this menu and imagine a single journey: a lead becomes a customer, the customer buys equipment, the equipment gets a maintenance contract, and when it breaks the customer raises a support ticket that a technician closes. Every one of those screens exists here. **They are not joined up that way.**

What you actually have is five products that share a menu root and very little else:

::: warning The five products
1. **Support and Marketing** — the CRM proper. Leads, potentials, calls, visits, campaigns, questionnaires, complaints, trouble tickets and service contracts. These are genuinely integrated *with each other*.
2. **Machine maintenance** — a complete, self-contained maintenance business: equipment records, maintenance contracts, work plans, orders, executions and invoices. It is connected to the CRM half by a single reference field.
3. **Service maintenance** — the same maintenance code applied to a serviced *site* rather than a machine. A separate licence, a separate menu folder, and a noticeably smaller set of documents.
4. **Kitchen Net** — five back-office screens belonging to a separate customer-facing mobile application. They are not covered in this guide.
5. **Technician Appointments** — a small booking system for businesses that send crews to customer addresses: crews, procedures, a weekly calendar and the documents around them. Its own licence, its own menu folder, and no link to the maintenance suites. See [Technician Appointments](/modules/crm/technician-appointments/crm-technician-appointments-overview.md).
:::

The practical consequences are concrete, and each one surprises somebody eventually:

- **A trouble ticket cannot be raised against a maintained machine.** The ticket's product field accepts inventory items and rental units — not machines. Your support desk and your maintenance register are separate worlds with separate customer histories.
- **The support side's warranties and the maintenance side's warranties are two unrelated systems.** Neither reads the other.
- **Complaints use one fault catalogue and maintenance orders use a completely different one.** There is no cross-link between them.

None of this makes the module unusable. It means you should choose the part you need and set that part up properly, rather than expecting a single thread to run from first contact to final repair.

## The menu, folder by folder

| Folder | Arabic | What lives there |
|---|---|---|
| Support | الدعم | Trouble tickets, complaints, service contracts, warranties, visits, calls, tasks, and most of the CRM classification files |
| Marketing | التسويق | Leads, potentials, campaigns, marketing and target plans, competitors, offers and analysis |
| Questionairs | استبيانات | Questionnaire templates, questions, questionnaires and the follow-up document |
| Maintenance Files | ملفات الصيانة | Machines, machine types, locations, classifications, fault catalogues and the service catalogue |
| Maintenance Documents | مستندات الصيانة | The whole machine-maintenance document cycle |
| Service Documents | سندات خدمات الصيانة | The parallel service-maintenance suite |
| Management And Organization Documents | الإدارة والتنظيم | The [risk register](/modules/crm/risk-register/crm-risk-register) — unrelated to everything else here |
| Kitchen Net Configurations | إعدادات تطبيق Kitchen Net | Not covered in this guide |
| Technician Appointments | مواعيد الفنيين | Crews, procedures, booking settings, appointments, the booking calendar, My Appointments, service distributions and transfers |

Two screens inside this menu do not belong to the CRM module at all: **Contact** and **Social Media Subscriber Configuration** are shared Basic-module files that appear here for convenience, and they need only the `basic` licence.

The English spelling of the Questionnaires folder reads **"Questionairs"** on screen. That is the real label; look for it as spelled.

## Licences

The CRM branch appears as soon as the module licence is present, and then each screen hides itself according to its own licence. Use these codes exactly as written:

| Licence code | Screens | Covers |
|---|---|---|
| `crm` | 43 | Support, Marketing, Questionairs, the risk register |
| `crm-maintenance` | 38 | Maintenance Files and Maintenance Documents |
| `crm-maintenance-services` | 10 | Service Documents |
| `crm-kitchen-net` | 5 | The Kitchen Net back office |
| `crm-technician-appointments` | 7 | Technician Appointments, plus the booking calendar and My Appointments |

Two further codes exist in the licence manager — one for the maintenance mobile app and one for the visits mobile app — but they unlock no ERP screen. They license the phone applications, not anything in this menu. If a screen you expect is missing, it is one of the five codes above that you need.

## Nine screens that look like documents but are not

This trips up experienced users, so it is worth naming them plainly. **Leads, Potentials, Campaigns, Marketing Plans, Target Plans, Tasks, Projects, Warranties and Service Records are master files**, not documents.

That means no book, no document term, no document number and value date, and no approval cycle. You cannot configure accounts on them, they never create an accounting entry, and there is nothing to process. One of them is even labelled "MarketingPlan document" on screen; it is still a master file.

If you are looking for the document term of a lead, there isn't one — and the absence is by design rather than a missing setup step.

## What this module does not do

Knowing the ceiling early saves a great deal of wasted configuration:

::: danger No reporting, and no scheduling
**There are no system reports and no dashboards anywhere in CRM.** The module ships exactly one printed form, for the customer visit. Everything else you need to see, you build yourself from list views, Excel exports or BI.

**Nothing in this module runs on a schedule.** There is no task schedule, no reminder, no alarm, no SLA timer, no automatic escalation and no notification to a customer or a technician. Every "planned" date on every screen is a note to a human being. Work that looks automatic — expanding a maintenance contract into visit schedules, turning those into orders — happens when somebody presses a button.
:::

Also absent, despite fields that suggest otherwise: any weighted pipeline or sales forecast, any campaign return-on-investment calculation, any comparison of a target plan against actual results, and any aggregation of questionnaire answers.

## Where to go next

- Setting up a fresh installation: [Getting Started](/modules/crm/crm-getting-started)
- The module settings screen: [CRM Settings](/modules/crm/crm-configuration)
- What you can print and report: [Reports and Printed Forms](/modules/crm/crm-reports-and-forms)
- The sales side: [The Sales Pipeline](/modules/crm/sales-pipeline/crm-pipeline-overview)
- The support desk: [Support Overview](/modules/crm/support/crm-support-overview)
- Equipment maintenance: [The Maintenance Cycle](/modules/crm/maintenance-cycle/crm-maintenance-overview)
- Choosing between the two maintenance suites: [Services or Machines?](/modules/crm/services-suite/crm-services-suite-overview)
