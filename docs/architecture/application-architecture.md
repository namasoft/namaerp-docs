---
description: "The architecture of Nama ERP as one Java web application on one server and one database: its technology stack, layers, functional modules, what happens when a document is saved, client apps, integrations, multi-company data and reporting."
---
# Application Architecture

Nama ERP is a single Java web application. Users reach it with a browser, all of its modules share one database, and there is nothing to install on an ordinary user's machine. That sentence is most of the architecture; the rest of this page fills in what sits behind it.

It is worth being clear about what Nama ERP is *not*, because it changes how you plan for it. It is not a collection of separately deployed micro-services with a database each. It is not a desktop product with a shared file on a network drive. It is one application, deployed on one application server, talking to one relational database — with a small family of companion applications at the edges for the places a browser cannot reach, such as a point-of-sale counter or an attendance device in a remote branch.

One server also shapes the questions reviewers ask next: what happens when it fails, and how far it scales. Resilience is built beneath the application rather than by clustering it. [Availability and disaster recovery](infrastructure-architecture.md#Availability-and-disaster-recovery) explains the supported approach and the recovery times it gives, and [Backup and recovery](infrastructure-architecture.md#Backup-and-recovery) covers what to back up and how often.

## The picture from outside

```text
      Browsers            POS terminals        Phones / tablets      Branch devices
    (Chrome, Edge…)       (Nama POS app)        (Nama Mobile)      (attendance, scales)
          │                      │                     │                    │
          └──────────────────────┴──────────┬──────────┴────────────────────┘
                                            │  HTTP / HTTPS
                                 ┌──────────▼───────────┐
                                 │    Apache Tomcat     │
                                 │  ┌────────────────┐  │
                                 │  │  erp           │  │  user interface
                                 │  ├────────────────┤  │
                                 │  │ basic-services │  │  business logic,
                                 │  └────────────────┘  │  services, jobs
                                 └──────────┬───────────┘
                                            │ JDBC
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
          ┌─────────▼─────────┐   ┌─────────▼─────────┐   ┌─────────▼─────────┐
          │  SQL Server       │   │  Attachments      │   │ External systems  │
          │  (one database,   │   │  folder           │   │ mail, SMS, tax    │
          │   all modules)    │   │  (documents,      │   │ authority,        │
          └───────────────────┘   │   images)         │   │ e-commerce…       │
                                  └───────────────────┘   └───────────────────┘
```

Everything a user does — opening a screen, saving an invoice, running a report — is an HTTP request to that Tomcat instance. There is no separate application tier to size, no message broker to operate, and no second database to keep in step.

## The technology stack

| Layer | What we use |
|---|---|
| Application server | Apache Tomcat 10 |
| Runtime | Java 21 (Jakarta EE APIs) |
| Application framework | Spring |
| Persistence | Hibernate over JDBC |
| Database | Microsoft SQL Server 2016 or later (2022 recommended) |
| User interface | Vue 3 with the Quasar component library, served as a browser application |
| Reporting | JasperReports for printed documents; a built-in report wizard and BI dashboards for analysis |
| Web services | REST and SOAP endpoints for integration |

Microsoft SQL Server is the only supported database for production installations. The versions it needs are listed in the [Installation Guide](../getting-started/installation-guide.md).

## How the application is layered

Internally the application is organised in the conventional way — a presentation layer, a business layer and a data-access layer — with one addition that matters a great deal in practice: a **configuration layer** that cuts across all three.

```text
   ┌───────────────────────────────────────────────┐    ┌─────────────────────┐
   │ Presentation                                  │    │  Configuration      │
   │ screens, list views, dashboards, printed docs │◄───┤                     │
   ├───────────────────────────────────────────────┤    │  screen layouts     │
   │ Business logic                                │    │  document terms     │
   │ document rules, accounting and inventory      │◄───┤  entity flows       │
   │ effects, pricing, payroll, costing            │    │  approval cycles    │
   ├───────────────────────────────────────────────┤    │  security profiles  │
   │ Data access                                   │◄───┤  scheduled tasks    │
   │ one data model, one database                  │    │  field settings     │
   └───────────────────────────────────────────────┘    └─────────────────────┘
```

That configuration layer is the reason two customers running the identical build can behave very differently. Screen layouts, validation rules, numbering schemes, approval cycles, document behaviour, calculated fields and automated actions are all stored as data and edited by administrators from inside the system. A typical implementation involves a great deal of configuration and no changes to the shipped application at all.

::: tip Why this matters for an upgrade review
Because customisation lives in configuration rather than in modified source code, upgrades do not have to be re-merged customer by customer. Every installation runs the same build.
:::

## Functional modules

The business functionality is divided into modules. They are separately licensed, so a given installation runs only the ones it has bought — but they are not separately deployed, and they all read and write the same database.

| Area | Modules |
|---|---|
| Finance | Accounting, Fixed Assets, Invoicing and e-invoicing |
| Operations | Supply Chain and inventory, Manufacturing, Point of Sale, Freight |
| Commercial | CRM, E-commerce connectors, Real Estate, Contracting |
| People | HR and Payroll |
| Sector-specific | Health Care, Service Centre, and others |
| Platform | Reporting and BI, approvals, notifications, security, import and export |

Because there is a single data model, an item sold in Point of Sale, costed by Supply Chain and processed into the accounts by Accounting is one record, not three copies synchronised between systems. This is the central design decision of the product and the source of most of its behaviour.

## What happens when a document is saved

One piece of the design surprises reviewers often enough to be worth spelling out. When a user saves a document, the document is stored immediately — but its downstream effects are not calculated in that same instant. They are queued as **business requests** and processed in the background.

```text
   User saves a sales invoice
             │
             ▼
   Document stored  ──────►  Business requests queued
   (user carries on)                    │
                          ┌─────────────┴──────────────┐
                          ▼                            ▼
              Accounting effect               Inventory effect
           (the ledger transaction)      (quantities, cost of goods)
                          └─────────────┬──────────────┘
                                        ▼
                            Processing status on the document
                     (failures are visible and retryable in the
                              Business Requests view)
```

This is what keeps saving fast under load, and it is what makes recovery possible: if an effect fails — a closed period, a missing account, a configuration gap — the document is not lost and the user is not blocked. An administrator sees the failure, fixes the cause, and reprocesses. For the operational side of this, see [Scheduled Tasks](../platform/automation-and-rules/scheduled-tasks.md) and the [Reprocessing](../admin/reprocessing/index.md) section.

Alongside these queued effects, the same background machinery runs **scheduled tasks**: recurring documents, notification sweeps, cost recalculation runs, integration polling and similar periodic work. They run inside the same Tomcat process — there is no separate job server to deploy.

## The client applications

Most users need nothing but a browser. A few roles need more, and for those Nama ships companion applications:

- **Nama POS** — a desktop application for point-of-sale counters, which keeps working through short network interruptions and syncs back to the server. See the [Point of Sale](../modules/pos/index.md) module.
- **Nama Mobile** — an Android and iOS application for staff who work away from a desk: approvals, field data capture and lookups. See [Nama Mobile](../modules/mobile/index.md).
- **The attendance agent** — a small branch-side service that collects punches from attendance devices and pushes them to the server, for sites where the devices cannot reach the ERP directly. See [The attcron Attendance Agent](../integration/attcron-agent.md).
- **Peripheral helpers** — small local utilities for label and barcode printing, weight scales and kitchen displays, installed only where that hardware exists.

Each of these talks to the same server over the same HTTP interface as the browser does. None of them talks to the database directly.

## How other systems connect

Nama ERP rarely lives alone, and the integration surface is deliberately narrow and documented:

- A **REST API** for reading and writing records programmatically — see [Nama ERP REST API](../integration/nama-erp-api.md).
- **File-based import and export** for bulk loads and periodic exchanges — see [Import and Export](../platform/import-export/index.md).
- **Built-in connectors** for e-commerce platforms, payment gateways, tax authority e-invoicing, and messaging providers for email, SMS and WhatsApp.
- **Database-level links** to external systems where that is the only practical route — see [A Legacy System with No REST API](/integration/system-integration-scenarios.md#Special-Case-A-Legacy-System-with-No-REST-API----Integration-via-Database).

Common patterns and the trade-offs between them are collected in [Integration Scenarios](../integration/system-integration-scenarios.md).

## One database, many companies and branches

A single Nama ERP installation normally serves the whole group. Multiple legal entities, branches, warehouses, cost centres and currencies live in the same database, separated by configuration and by security rules rather than by separate installations. Consolidating those entities is then a report, not an integration project: the [consolidated statements](../modules/accounting/consolidated-statements.md) translate every company into one reporting currency and eliminate intercompany balances each time they run. Filtering an ordinary report on several legal entities is not the same thing, since it adds up local amounts as they are, whatever their currency.

Where a site genuinely cannot depend on the network — a remote branch on an unreliable link — Nama supports **replication** between a head-office installation and site installations, exchanging documents and master data between them. This is a deliberate exception rather than the default shape, and it should be designed together with Nama technical support; see [Replication](../admin/reprocessing/replication.md).

## Reporting and analysis

Printed documents — invoices, vouchers, statements — are produced by a report engine using per-customer templates, so a document's appearance is part of the configuration rather than the code. On top of that sit a report wizard for building list and summary reports without technical help, and BI dashboards for aggregated analysis. All of them read the same live database; there is no separate reporting copy to keep in step, and no overnight extract to schedule. See the [Reports](../platform/reports/index.md) and [Business Intelligence](../platform/bi/index.md) sections.

::: warning A note for capacity planning
Because reports and dashboards query the production database directly, heavy analytical use competes with transactional use for the same server. This rarely matters at typical volumes, but it is the first thing to look at if a busy installation feels slow — see [Performance settings](../platform/global-config/global-config-performance.md).
:::
