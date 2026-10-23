---
description: "Overview of the Hospital Management module: the patient journey from registration and admission through medical services to the closing invoice, split billing between patient and insurer, licensing, and how the guide is organized."
---
# Hospital Management System

Welcome to the Hospital Management module of Nama ERP — the module that runs the full patient lifecycle: from the moment a patient is registered, through admission and a bed assignment, then consultations, lab tests, radiology and surgeries, all the way to the final closing invoice at discharge. It's a complete hospital system built on top of Nama's solid accounting and inventory engine.

## What makes a hospital different?

A hospital isn't a shop that sells goods. What it "sells" are **medical services** — a consultation, a blood test, an X-ray, a night in a room, a surgery — many of which consume drugs and supplies from the warehouse at the same time. And crucially, **the patient often doesn't pay alone**: an **insurance company** shares the bill at an agreed percentage. The Hospital Management module is built around these two ideas from the ground up:

- **Every service has a price and a cost** — the price is charged to the patient/insurer, and the cost may be shared with the doctor or another party.
- **Split billing** — every invoice line is automatically divided into the **patient's share** and the **insurance company's share**, based on endurance percentages coming from the insurance approval and the admission.
- **Insurance cap** — an admission has a maximum value the insurer will cover across all invoices, with a live remaining counter.

## The patient journey (the big picture)

Let's follow a single patient from the front door to discharge.

A patient arrives and is registered in a **Patient** file — which is at once a medical record and an accounting party. If they're an outpatient, a slot is booked via an **Outpatient Reservation** against an **Outpatient Schedule**. If they're to be admitted, a **Patient Admission** is opened — the pivotal document from which the rest of the journey branches.

From the admission, an **Accommodation** document is generated that assigns the patient a bed in a room and starts charging the daily accommodation and medical-supervision fees. During the stay they may be moved between rooms via an **Accommodation Transfer**, fed via **Feeding Issues**, and the doctor orders **lab tests**, **radiology** and **surgeries** whose **results** are recorded, while drugs and supplies are dispensed from the pharmacy.

Each of these services produces its own **invoice** (lab test invoice, radiology invoice, pharmacy invoice…) split between the patient and the insurer. At discharge, an **Accommodation Exit** document frees the bed and ends the stay, and then a single **Closing Invoice** gathers every invoice from the admission into the final statement of account.

## How documents work in Nama ERP

::: tip Understanding document states
Unlike systems that require a separate step before a saved document reaches the accounts, Nama ERP acts immediately:

**Draft:** create and edit the document with no accounting effect.

**Saved:** the moment a document is saved out of draft, it creates its accounting effect **immediately** (revenue, costs, patient and insurer balances), and may auto-generate other documents (accommodation, invoice, stock issue).

**Edits:** any change to a saved document is reflected at once, with no separate confirmation step.
:::

## Licensing

Every document in this module is protected by the module license `hms` (NaMa Hospital Management). If the module isn't enabled in your license, its menus won't appear.

## How this guide is organized

The module is large, so we've split it into pages that follow the way hospital data is built and operated.

### Setup & master files

<LandingGrid>
  <LandingCard icon="⚙️" title="Hospital Management System Settings" link="/modules/hms/hms-configuration.md" details="How a stay is counted into billable days (check-in and check-out hours), and which discount, tax and price-classifier fields the screens show." />
  <LandingCard icon="🏥" title="Hospital Structure & Rooms" link="/modules/hms/hms-facility.md" details="Buildings, floors, sections, rooms, beds and clinics, and the room classifications that drive accommodation pricing." />
  <LandingCard icon="🩺" title="Medical Master Files" link="/modules/hms/hms-medical-master-files.md" details="Doctors, specialties, diseases, medical services, analyzers, feeding types, patient classes and document categories." />
  <LandingCard icon="🧪" title="Medical Service Catalog" link="/modules/hms/hms-service-catalog.md" details="Lab, radiology, physiotherapy and surgery types and their categories, plus surgery packages." />
</LandingGrid>

### Insurance & pricing

<LandingGrid>
  <LandingCard icon="🛡️" title="Medical Insurance & Approvals" link="/modules/hms/hms-insurance.md" details="Insurance companies and their classes, and the insurance approval that is the source of prices and the patient/insurer split." />
  <LandingCard icon="🏷️" title="Pricing, Costing & Discounts" link="/modules/hms/hms-pricing.md" details="Sales price lists, cost lists and discounts, indirect (overhead) costing, and changing a patient's price plan." />
</LandingGrid>

### The patient journey

<LandingGrid>
  <LandingCard icon="🧑‍⚕️" title="Patients & Admission" link="/modules/hms/hms-patients.md" details="The patient file, the admission form, outpatient clinics, diagnosis and health status." />
  <LandingCard icon="🛏️" title="Accommodation & Feeding" link="/modules/hms/hms-accommodation.md" details="Bed accommodation, transfers, exit, and meal issuing." />
  <LandingCard icon="🔬" title="Clinical Orders & Results" link="/modules/hms/hms-clinical-orders.md" details="Lab and radiology requests and results, surgery requests, reservations and approvals, and the blood bank." />
  <LandingCard icon="🩻" title="The Surgery Lifecycle" link="/modules/hms/hms-surgery-lifecycle.md" details="From the surgeon's request through the theatre booking, the consent and the surgery invoice, to settling a surgery package against its agreed price." />
</LandingGrid>

### Billing

<LandingGrid>
  <LandingCard icon="🧾" title="Invoicing & Billing" link="/modules/hms/hms-invoicing.md" details="All service invoices (lab, radiology, pharmacy, surgery…), freezing a price, and the closing invoice that consolidates them at discharge." />
  <LandingCard icon="💊" title="Pharmacy, Supplies & Blood Bank" link="/modules/hms/hms-pharmacy-and-supplies.md" details="The Pharmacy and Blood Bank files; pharmacy, supplies, service-and-supply and blood bank invoices and their returns; and how they move stock." />
</LandingGrid>

### Document terms

<LandingGrid>
  <LandingCard icon="📑" title="Invoice Document Terms" link="/modules/hms/document-terms/hms-terms-invoices.md" details="The accounting sides every hospital invoice records its entry on, the price and tax options, and what each invoice family adds." />
  <LandingCard icon="📋" title="Stay and Operations Document Terms" link="/modules/hms/document-terms/hms-terms-stay-and-operations.md" details="The terms that make an admission create its accommodation, a stay create its invoices, and a feeding issue create its stock documents; plus the closing and surgery package invoices." />
</LandingGrid>
