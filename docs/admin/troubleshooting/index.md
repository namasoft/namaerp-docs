---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Troubleshooting
description: "Troubleshooting landing page that maps common support complaints (slowness, freezes, missing ledger entries, background work, licence and access, wrong figures, e-invoicing) to the page that explains each."
---

# Troubleshooting

A support ticket rarely names the screen it is about. It names a symptom: the system is slow, the
invoice is not in the ledger, the email never arrived, a red message at login, a field that has
vanished. The answers are spread across the whole site, next to the screens they belong to. This
page is the way in from the symptom: find the complaint in the table below, and it points to the
page that explains it.

## The pages in this section

<LandingGrid>
  <LandingCard icon="🐢" title="When the System Is Slow" link="/admin/troubleshooting/system-is-slow.md" details="What to check when users say everything is slow: running reports, background jobs, searching and the database." />
  <LandingCard icon="⏳" title="System Hanging or Unresponsiveness" link="/admin/troubleshooting/troubleshooting-system-hanging.md" details="The system has stopped responding: capture thread dumps before restarting, and send them to Namasoft." />
  <LandingCard icon="🚨" title="Critical Errors at Login" link="/admin/troubleshooting/critical-errors.md" details="The red list of health checks shown at login: every check, what raises it, and what to do about it." />
  <LandingCard icon="❓" title="General FAQ" link="/admin/troubleshooting/general-faq.md" details="Answers to everyday administration questions, from blank lens errors to SMS formatting." />
</LandingGrid>

## Find the page by the symptom

### Speed and availability

| The complaint | Read |
|---|---|
| "The system is slow." | [When the System Is Slow](/admin/troubleshooting/system-is-slow) |
| "The system has frozen; nobody can work." | [Troubleshooting System Hanging or Unresponsiveness](/admin/troubleshooting/troubleshooting-system-hanging) |
| "A report has been running for half an hour." | [Report Monitoring](/platform/background-processing/report-monitoring) |
| "One slow scheduled job holds up all the others." | [Task Queues](/platform/background-processing/task-queues) |
| "Red messages appear as soon as I log in." | [Critical Errors at Login](/admin/troubleshooting/critical-errors) |

### Saving and messages

| The complaint | Read |
|---|---|
| "The system refused to save and showed a message." | [Messages and Refusals](/platform/documents-and-records/messages-and-refusals) |
| "I cannot delete or edit this record." | [Why a Record Will Not Save or Delete](/platform/documents-and-records/why-a-record-will-not-save-or-delete) |
| "It says a field is required, but it never was before." | [Required Fields](/platform/governance/required-fields) |
| "The period is closed, but I need to post into it." | [Fiscal Period Control](/platform/governance/fiscal-period-control-guide) |
| "Who changed this record, and when?" | [Audit Trail and Version History](/platform/governance/audit-trail) |

### Work that happens in the background

| The complaint | Read |
|---|---|
| "The invoice is saved but it is not in the ledger." / "Stock did not move." | [Business Requests](/platform/background-processing/business-requests) |
| "The email, SMS or WhatsApp message never arrived." | [Pending Tasks](/platform/background-processing/pending-tasks) |
| "The scheduled report did not go out." | [Scheduled Tasks](/platform/automation-and-rules/scheduled-tasks) |
| "The salary sheet did not rebuild." | [System Actions](/platform/background-processing/system-actions) |
| "My entity flow does not do what I expected." | [Entity Flow FAQ](/platform/entity-flows/entity-flow-faq) |
| "The approval is stuck or went to the wrong person." | [Approvals](/platform/approvals/) |
| "The import finished but the records are not right." | [Importing Records](/platform/import-export/importing-records) |

### Screens, licence and access

| The complaint | Read |
|---|---|
| "A screen or a field is missing." | [Licensing, and Why a Screen or Field Is Missing](/getting-started/licensing) |
| "A user cannot log in." | [Users and Login](/platform/security/users-and-login) |
| "A user can see, or cannot see, what they should." | [Security System Overview](/platform/security/security-overview) |
| *Could not perform the action.* when opening a screen. | [General FAQ](/admin/troubleshooting/general-faq) |

### Figures that look wrong

| The complaint | Read |
|---|---|
| "Item quantities or costs do not add up." | [Queries to Check for (and Fix) Cost And Qty Problems](/admin/reprocessing/cost-and-qty-problems), then [Reprocessing Quantity, Cost, and Stock Ages](/admin/reprocessing/reprocess-qty-and-cost) |
| "The ledger or the debt ages are out of step with the documents." | [Ledger and Debt Ages Reprocessing](/admin/reprocessing/reprocess-ledger-and-debt-ages) |

### E-invoicing, point of sale and apps

| The complaint | Read |
|---|---|
| "ZATCA rejected the invoice." | [Integration with ZATCA](/modules/invoicing/zatca-guide) |
| "The Egyptian tax authority rejected the invoice or receipt." | [Egyptian e-Invoice and e-Receipt](/modules/invoicing/egypt-einvoice-guide) |
| "Eltezam sending failed." | [Eltezam Troubleshooting](/modules/integrations/eltezam/eltezam-troubleshooting) |
| "A problem at the point of sale." | [Point of Sale FAQ](/modules/pos/pos-faq) |
| "A problem with the mobile app." | [Nama Mobile App — Overview, Navigation & Settings](/modules/mobile/mobile-application-guide) |
| "Notifications are not reaching users." | [Notifications and Messages FAQ](/platform/notifications/notification-fq) |
