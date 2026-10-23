---
description: "Map of the CRM machine-maintenance cycle: which document follows which, which steps are manual, where money and stock move, and the order to set it up in."
---
# Maintenance Cycle Overview

Al Nokhba Air Conditioning Systems does two things for Marina Plaza Hotels. In February 2026 it sold and installed two 300 TR chillers and an air-handling unit at the hotel's Alexandria tower. From March 2026 onwards it looks after them — a monthly check on all three machines, a quarterly check on the two chillers, whatever the hotel calls in between times, and an invoice when a job is done.

This page is about the second half of that sentence. It is the map of the maintenance cycle: which document follows which, which step happens by itself and which step only happens because a person pressed a button, and where money and stock actually move. Read it before the individual document pages, because the most common mistake with this part of NaMa is assuming that something runs on its own.

::: info Required licence
`crm-maintenance`. Every screen named on this page is gated by that one code. Without it the whole **Maintenance Files** and **Maintenance Documents** folders are absent from the menu.
:::

## A World of Its Own

The maintenance suite lives in the CRM menu next to leads, campaigns, complaints and trouble tickets — and it is connected to none of them.

A trouble ticket cannot be raised against a machine on the machine register. No maintenance document can see a ticket, a complaint, a lead or a CRM service contract, and nothing in the support half can see a maintenance order. The two halves happen to share a menu; they do not share a workflow. If you are looking for an after-sales chain that runs from a lead to a support ticket to a repair order, it does not exist — see [CRM Overview](/modules/crm/crm-overview.md) and [Support Overview](/modules/crm/support/crm-support-overview.md) for what each half really does.

Two words make this harder than it needs to be, so they are worth naming early:

- **Contract.** The support half has a *CRM Service Contract*. The maintenance half has a *Maintenance Contract*. Different files, different coverage, and neither one reads the other.
- **Warranty.** The support half has a *CRM Warranty* register. The maintenance half computes warranty dates on machines and on the faults it repairs. Again — two systems, no cross-link.

There is a third, smaller product in the same family: the **service** documents, which are the same machinery aimed at a serviced *site* rather than a machine, under a different licence. If you maintain branches or premises rather than equipment, read [Services or Machines?](/modules/crm/services-suite/crm-services-suite-overview.md) before you build anything here.

## The Real Chain

Here is the whole cycle in one picture. Every arrow is marked, and the marking is the point of the diagram.

**AUTO** means the system does it by itself the moment a document is saved — nobody presses anything.
**MANUAL** means a person does it: either by pressing a button on the screen, or by creating the next document by hand and pointing it back at its predecessor in the **From document** field.

```text
  Maintenance Sales Quotation
        |
        |  MANUAL - you create the sales order and pick the quotation in From document
        v
  Maintenance Sales Order --MANUAL (button: Generate Machine)-->  Machine files (shells only)
        |
        |  MANUAL - you create the contract and pick the sales order in From document
        v
  Maintenance Contract
        |
        |  MANUAL (button: Generate Work Plans)            <-- press 1 of 2
        v
  Maintenance Work Plans   (one document per group - 12 of them in our example)
        |
        |  MANUAL (button: Generate Mn Orders, on each work plan)   <-- press 2 of 2
        v
  Maintenance Order <--MANUAL (From document)-- Maintenance Notice
        |            <--MANUAL (From document)-- Maintenance Order Request
        |            <--MANUAL (From document)-- Maintenance Contract
        |
        +--MANUAL (button: Create execution for all / for selected lines)
        |        v
        |   Maintenance Order Executions   (one per machine line)
        |        |
        |        |  MANUAL (button: Create maintenance invoice - opens a draft you must save)
        |        v
        +--MANUAL (button: Create maintenance invoice - opens a draft you must save)
                 v
           Maintenance Invoice --AUTO on save--> a supply-chain Stock Issue
                 |              --AUTO on save--> the accounting entry
                 |
                 |  MANUAL (From document)
                 v
           Maintenance Invoice Return --AUTO on save--> Stock Receipt + accounting entry


  Maintenance Order with Order Type = Installation
                 +--AUTO on save--> a warranty Maintenance Contract

  Maintenance Estimation <--MANUAL (button: Copy All From MnOrders)-- Maintenance Orders
                 +--AUTO on save--> a supply-chain Stock Issue    [no path onward - a dead end]

  Maintenance Visit - typed by hand, nothing ever creates one
                 +--AUTO on save--> raises the contract's performed-visit counter

  CRM Maintenance Plan --AUTO on save--> stamps technician, route and planned visit date
                                         onto the notices listed on it

  Pre-Installation Preview ---------------> nothing at all
```

Count the AUTO arrows: there are six, and each one is a consequence of saving a document that a person had already decided to save. Nothing in the diagram starts by itself.

## Nothing Here Runs on a Timer

This is the fact anyone planning a preventive-maintenance operation needs before they buy, so it is said plainly rather than buried.

::: danger Preventive maintenance is a manual procedure
There is **no scheduler anywhere in the CRM module** — no task schedule, no reminder, no alarm, no escalation and no notification. The visit series for a maintenance contract is expanded into documents by **two manual button presses**:

1. Someone opens the contract and presses **Generate Work Plans**.
2. Someone opens **each** generated work plan and presses **Generate Mn Orders**.

If nobody presses the first button, no preventive work is ever planned. If nobody opens each work plan and presses the second, the plans sit there and the technicians have nothing to do. The system will never remind anybody, and no report will tell you that a month was missed.
:::

Plan around that. The sites that run this well give one person — Nahed El Gindy in our worked example — a standing diary entry to open the contract, regenerate the plans and walk each one. That is a human procedure supported by the software, not a feature of it.

## Where Visits Really Come From

Two separate things on these screens use the word *visit*, and only one of them produces anything.

| What you see | What it really is |
|---|---|
| The **Visit Type 1…7** columns on the contract's Machines grid | **This is the real one.** Each machine line carries up to seven visit frequencies, each with its own task template. The work-plan generator reads those columns and the contract's start and end dates, and nothing else. |
| The **Maintenance Visit** document | An after-the-fact log. **Nothing ever generates one** — not the contract, not the work plan, not the order. Somebody types it to record that a trip happened, and saving it raises the contract's performed-visit counter. |

::: tip Schedule preventive work on the contract's machine lines
Preventive work is scheduled by setting the **Visit Type** columns on the contract's machine lines — see [Maintenance Contracts](/modules/crm/maintenance-cycle/crm-maintenance-contracts.md).
:::

## What Moves Money, and What Moves Stock

Most of these documents move neither. Know which ones do before you configure a single document term (توجيه).

| Document | Accounting entry on save | Stock movement on save |
|---|---|---|
| Maintenance Sales Quotation | none | none |
| Maintenance Sales Order | none | none |
| **Maintenance Contract** | **yes** — a full invoice-style entry over its spare-part and service lines, but only when its term carries **both** a debit and a credit side | none |
| Maintenance Work Plan | none | none |
| Maintenance Notice | none | none |
| **Maintenance Order Request** | **yes, if its term carries accounting sides** — leave them empty | none |
| **Maintenance Order** | **yes, if its term carries accounting sides** — normally left empty so that only the invoice books | none |
| Maintenance Order Execution | none | **none** — despite the spare-parts grid on it |
| Maintenance Estimation | none | none |
| **Maintenance Invoice** | **yes** | **yes** — generates a Stock Issue |
| **Maintenance Invoice Return** | **yes**, reversed | **yes** — generates a Stock Receipt |
| Maintenance Visit | none | none |
| CRM Maintenance Plan | none | none |
| Pre-Installation Preview | none | none |

Two consequences follow, and both surprise people:

- **The document where the technician records the parts he actually fitted moves no stock.** The execution sheet's spare-parts grid — warehouse, locator, lot, serial, quantity — is a record of the work. The invoice relieves the stock, or somebody presses the manual issue button as a separate step. See [Order Executions](/modules/crm/maintenance-cycle/crm-maintenance-executions.md).
- **Two routes can issue the same parts.** The invoice term's stock-issue generation and the manual *Spare parts issue* buttons work from the same lines with no link between them. Choose **one** route per installation — normally the invoice term. See [Maintenance Invoicing](/modules/crm/maintenance-cycle/crm-maintenance-invoicing.md).

Accounting and inventory effects are created as **business requests** and processed in the background, which is why saving is instant. If one fails, retry it from the Business Requests list view: filter for failed requests, select the rows, then use the More menu → Reprocess / Recommit.

## What "Covered" Means Here

Coverage in this suite is **quantity at a price**, and nothing else.

The contract lists the spare parts and services the customer has pre-paid for, each with a quantity. As orders, invoices and returns are committed against the contract, those quantities are drawn down, and a document that asks for more than the contract has left is refused. If the contract prices a service at 1,200.00 while the service catalogue says 1,500.00, the contract price is the one that lands on the document.

::: warning Coverage is not a date check, and it does not decide who pays
Nothing compares the date of the work to the warranty period or to the contract's dates. Work on a machine whose contract expired last year is priced and billed exactly like work on a live one, and no warning appears. There is no free-versus-billed flag anywhere in the suite: the only sense in which covered work is "free" is that the contract may price it at zero. Whether to charge the customer stays a human decision.
:::

## The Documents, and Where They Are Written Up

| Document | What it is for | Page |
|---|---|---|
| Maintenance Sales Quotation / Sales Order | Selling the equipment and the maintenance deal; creating machine shells | [Maintenance Sales Quotations and Orders](/modules/crm/maintenance-cycle/crm-maintenance-sales.md) |
| Maintenance Contract | Which machines, how often, what is pre-paid, what is billed | [Maintenance Contracts](/modules/crm/maintenance-cycle/crm-maintenance-contracts.md) |
| Maintenance Work Plan | The expanded calendar of expected visits | [Maintenance Work Plans](/modules/crm/maintenance-cycle/crm-maintenance-work-plans.md) |
| Maintenance Notice / Order Request | The reactive intake path — a customer call-in, and a request for work | [Notices and Requests](/modules/crm/maintenance-cycle/crm-maintenance-notices-and-requests.md) |
| Maintenance Estimation | A costing sheet built from existing orders | [Maintenance Estimations](/modules/crm/maintenance-cycle/crm-maintenance-estimations.md) |
| Maintenance Order | The work order itself | [Maintenance Orders](/modules/crm/maintenance-cycle/crm-maintenance-orders.md) |
| Maintenance Order Execution | What the technician did, machine by machine | [Order Executions](/modules/crm/maintenance-cycle/crm-maintenance-executions.md) |
| Maintenance Visit | A manual log that a trip happened | [Maintenance Visits](/modules/crm/maintenance-cycle/crm-maintenance-visits.md) |
| Maintenance Invoice / Invoice Return | Billing, and the stock movement that goes with it | [Maintenance Invoicing](/modules/crm/maintenance-cycle/crm-maintenance-invoicing.md) |
| CRM Maintenance Plan / Maintenance Itinerary | Daily route dispatch for call-ins | [Daily Dispatch](/modules/crm/maintenance-cycle/crm-maintenance-dispatch.md) |
| Machine Update / Ownership Transfer / Pre-Installation Preview | Changing machine data after the fact | [Machine Updates, Transfers and Site Previews](/modules/crm/maintenance-cycle/crm-machine-updates-and-transfers.md) |

The master files these documents depend on — machines, machine types, task templates, fault catalogues, statuses, locations — are covered in [The Machine File](/modules/crm/maintenance-setup/crm-machines.md) and its neighbouring pages. Every generate button in the diagram above is driven by a book-and-term pair on a document term, which is why [Maintenance Document Terms](/modules/crm/document-terms/crm-maintenance-terms.md) is not optional reading for whoever sets the module up.

## The Order to Build It In

On a fresh installation, work outwards from the machine:

1. **Locations and catalogues first** — buildings, floors and rooms; machine categories and types; warranty period types; task templates; dysfunctions, trouble levels and descriptions; notice categories; the service catalogue; and the order and visit statuses. The order statuses matter more than they look: each carries a *status type* that drives the lifecycle, and a site that leaves it blank ends up with a workflow that records nothing ([Order and Visit Statuses](/modules/crm/maintenance-setup/crm-maintenance-statuses.md)).
2. **The document terms** — every generate button needs its target book and term filled in on the source document's term, and the accounting sides belong on the invoice term and nowhere else ([Maintenance Document Terms](/modules/crm/document-terms/crm-maintenance-terms.md)).
3. **The machines** — registered by hand, or created as shells from a maintenance sales order and then completed ([The Machine File](/modules/crm/maintenance-setup/crm-machines.md)).
4. **The contracts**, with their visit types and pre-paid quantities.
5. **The standing diary entry** for whoever presses the two generation buttons.

## Reporting

**Reporting: none.** This module ships no system reports, and this screen has no print form. There are no dashboards for the maintenance suite either. Use the list views with saved criteria, export to Excel, or build what you need in BI on top of the maintenance data.
