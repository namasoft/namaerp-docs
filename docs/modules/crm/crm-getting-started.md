---
description: "The setup order for each part of the CRM menu: what to create first for the sales and support side, for machine maintenance and for service maintenance, and a sensible sequence for a mixed implementation."
---
# CRM Getting Started

Because the CRM menu holds [four separate products](/modules/crm/crm-overview), there is no single setup order that covers all of it. Decide first which part you are implementing, then follow that part's sequence. Setting up a maintenance operation and setting up a sales pipeline share almost nothing.

Whichever part you start with, the same three things are true: nothing here runs on a schedule, no screen produces a report, and none of the master files below are optional in the sense of "the system will fill it in for you" — an empty classification file simply means an empty picker.

## If you are setting up the sales and support side

The `crm` licence covers all of it.

**1. Decide who your people are.**
Responsible employees on leads and tickets come from the HR employee file, so that must exist first. If your salespeople are not yet employees, create them there before you start.

**2. Build the classification files.**
These are small, quick, and everything downstream references them. Create them in this order because a couple of them nest:

- Main Category, then Activity Type beneath it
- Lead Classification
- Industry
- Campaign Type
- Rejection Reason

The full detail is in [Classification Files](/modules/crm/master-files/crm-lead-classification-files). Two of these are more load-bearing than they look: **Lead Classification** and **Activity Type** are written back onto a lead every time a call or visit is committed, so they are part of your pipeline's working mechanics, not just labels.

**3. Create the mediator file.**
[Mediators](/modules/crm/master-files/crm-mediators-and-agents) are referenced from roughly twenty-five fields across the module and are also an accounting subsidiary type. If introducers or brokers matter to your business, set this up before you start capturing leads. The Agent file is a near-identical twin reachable from only three fields — most sites need only mediators.

**4. Set up the support catalogues, if you run a support desk.**
Complaint Type, Complaint Source, Problem and Problem Classification, covered in [Problem and Complaint Catalogues](/modules/crm/master-files/crm-problem-and-complaint-catalogues). Remember these serve complaints only; the maintenance suite has its own.

**5. Configure the module settings.**
[CRM Settings](/modules/crm/crm-configuration) is short — nine options — but two of them shape daily data entry: the default complaint source, and whether a new lead's responsible employee defaults to the logged-in user.

**6. Create books and terms for the documents that have them.**
Most CRM screens are master files and need nothing. Calls, visits, work plans, trouble tickets, ticket executions, complaints and service contracts are the ones to configure. See [How CRM Document Terms Work](/modules/crm/document-terms/crm-terms-basics).

**7. Only then start capturing leads.**

## If you are setting up machine maintenance

The `crm-maintenance` licence covers all of it. This is the larger and more configuration-hungry half.

**1. Build the location register.**
Buildings, then floors, then rooms — [Buildings, Floors and Rooms](/modules/crm/maintenance-setup/crm-machine-locations). Be aware the hierarchy is not enforced, so establish a naming convention and stick to it; nothing will stop a room being attached to the wrong floor.

**2. Create the machine classification and fault catalogues.**
The five [machine classifications](/modules/crm/maintenance-setup/crm-machine-classifications) are generic dimensions you name yourself, and the [fault catalogues](/modules/crm/maintenance-setup/crm-fault-catalogues) — dysfunction, trouble description, trouble level, notice category — drive what a technician can record.

**3. Set up warranty period types and machine types.**
Warranty period types are what actually compute warranty end dates. Machine types matter more than they appear: the **spare parts list that drives lookups lives on the machine type, not on the machine**. See [Machine Types and Categories](/modules/crm/maintenance-setup/crm-machine-types-and-categories).

**4. Define your order and visit statuses — carefully.**

::: danger Do not skip the status type
Maintenance order statuses are yours to define, but each one carries a *Status* setting that tells the system what that status means. **Leave it blank and your workflow records nothing.** This is the single most common way to end up with a maintenance operation that appears to work but tracks no progress at all. See [Order and Visit Statuses](/modules/crm/maintenance-setup/crm-maintenance-statuses).
:::

**5. Build the service catalogue and task templates.**
[The Service Catalogue](/modules/crm/maintenance-setup/crm-maintenance-service-catalogue) prices the work; [Task Templates](/modules/crm/maintenance-setup/crm-maintenance-task-templates) are the checklists a technician follows.

**6. Create your machines.**
[The Machine File](/modules/crm/maintenance-setup/crm-machines) is the spine of everything that follows. You can create them by hand or generate them from a maintenance sales order — but if you generate them, read that page's warning first, because the generated record does not carry the customer, which makes it invisible in later lookups.

**7. Configure books, terms and the generation pairs.**
This is where maintenance differs most from the rest of the ERP. Every "generate" button in the suite is driven by a book-and-term pair on the source document's term. The button needs both before it can generate its document. See [Maintenance Document Terms](/modules/crm/document-terms/crm-maintenance-terms).

**8. Then write your first contract** and follow [The Maintenance Cycle](/modules/crm/maintenance-cycle/crm-maintenance-overview).

## If you are setting up service maintenance

Read [Services or Machines?](/modules/crm/services-suite/crm-services-suite-overview) **before** you buy or configure anything. The service branch is a genuinely different product with a genuinely smaller feature set, and one limitation decides most cases: it can only bill spare parts, not labour.

Note also that the reference data the service suite uses — fault catalogues, statuses, task templates — sits in the Maintenance Files folder under the `crm-maintenance` licence. Running the service suite in practice usually means holding both licences.

## A sensible order for a mixed implementation

If you are implementing more than one part, do them in separate phases and let each one settle before starting the next. The parts do not depend on each other, so there is no technical reason to run them in parallel — and every reason not to, given how much reference data each one needs.

A reasonable sequence is: support desk first (smallest, fastest to show value), then the sales pipeline, then maintenance last, since it is the largest and its document terms need the most care.
