---
description: "Choosing between the machine maintenance and service maintenance products: how the two licensed suites differ, what the services branch lacks, the labour-charging question that decides it, naming clashes, and what the folder contains."
---
# Services or Machines?

If you have already read the maintenance pages and then opened the **Service Documents** folder, you will have felt an odd sense of déjà vu. The screens look the same. The tabs carry the same names. The buttons say almost the same words. And then, in the middle of a document about servicing a bank branch, there is a grid headed **Machines**.

That is not a fault in your installation, and it is not a second copy of the same menu. It is a second product, and this page exists to tell you which of the two you should buy and use.

::: info Required licence
Everything on this page and in the rest of this folder needs the licence code `crm-maintenance-services`. The machine maintenance folder needs a different code, `crm-maintenance`. They are sold separately.
:::

## Two Products, One Code Base

**Maintenance Documents** (licence `crm-maintenance`, menu folder *مستندات الصيانة*) and **Service Documents** (licence `crm-maintenance-services`, menu folder *سندات خدمات الصيانة*) are two separately licensed products that share one code base. Every screen exists twice: once with a **Machine** (آلة) as its subject, and once with a **Maintenance Service** (خدمة صيانة) as its subject.

That single swap — machine in, service out — is the whole conceptual difference. A maintenance order is about a compressor with a serial number; a service order is about "AC servicing, Smouha Branch". Everything around that subject — the contract, the work plan, the order, the execution sheet, the spare parts, the technicians, the status trail — was copied from the machine suite and given a service instead of a machine.

Neither branch is deprecated and neither replaces the other. The machine suite is much older, much more widely deployed and still growing. The services branch was added later, for businesses whose work is delivered to a **place** rather than to a **piece of equipment**: facility soft services, cleaning and security cover, branch servicing, site landscaping.

::: warning Never assume symmetry
The two folders are not mirror images. The services branch is a **reduced** feature set, and several of the things a reader would expect to find simply do not exist there. The exclusion list below is not a footnote — it is the reason this page is the first thing you should read.
:::

## What the Services Branch Does Not Have

There is **no service counterpart at all** for any of these:

| Missing in the services branch | What that means in practice |
|---|---|
| **Maintenance Estimation** | There is no costing sheet document in this branch. |
| **Maintenance Visit** | Visits are never recorded as their own document. The execution sheet is the only record that a visit happened. |
| **Pre-Installation Preview** | No site-survey document. |
| **CRM Maintenance Plan** | No daily plan document. |
| **Maintenance Itinerary** | No route or dispatch itinerary, so the daily-dispatch feature of the machine suite has no equivalent here. |
| **Machine Ownership Transfer** | A serviced site cannot be transferred from one customer to another by document. Change the customer on the record by hand. |
| **Machine Update** | There is no bulk field-update document for service records. |

Three more gaps are inside the documents that *do* exist:

- The **Maintenance Service Order Execution** has **no document term** at all. Its machine twin has one. The Term field is on the screen, but there are no options behind it — the same is true of the Maintenance Service Notice, Sales Order and Sales Quotation.
- There are **no instalments, no payment schedule, no external payments, no reward points and no discount coupons** anywhere in this branch. The machine suite has all of them.
- There is **no mobile check-in and check-out flow**. The Nama Mobile technician attendance feature belongs to the machine suite's notice document only.

## The Question That Decides It: Can You Charge for Labour?

Here is the fact that decides the choice for most businesses, and it is easier to say than to accept.

::: warning Services in this branch carry no price
A service line in the Service Documents folder names the service and carries **no item, no quantity and no price**. A **Maintenance Service Invoice bills its spare-part lines.**
:::

So the choice comes down to this:

- **If your product is labour** — a cleaning contract, a security contract, a monthly servicing retainer — and you expect the system to price it, total it and invoice it, then the Service Documents branch **cannot do that as it stands**. The machine maintenance branch can: it has a priced service catalogue whose lines carry an item, a quantity and a price, and those lines reach the invoice and the ledger. Register each serviced site as a machine record and use the machine suite.
- **If you already run the machine suite** and your only reason to look at Service Documents is that some of your subjects are sites rather than equipment, stay where you are. A machine record is generic enough to stand for a site, and you keep pricing, instalments, visits, itineraries and the ownership history.
- **Use the Service Documents branch** when what you need is a **dispatch-and-execute engine**: plan recurring visits from a contract, generate work plans and orders, send an employee, record the checklist and the parts consumed, and invoice the **parts**. The one supported way to charge for the labour itself is to register the service fee as a stock or service **item** and put it in the **Spare Parts** grid. That is not a workaround somebody invented — it is the only route the product supports.

## A Naming Clash You Will Trip Over

Two different files are called something very close to "Maintenance Service", and they belong to different products:

| File | Licence | What it is |
|---|---|---|
| **Maintenance Service** (خدمة صيانة) | `crm-maintenance-services` | The **thing being serviced** — a site, branch, floor or area with a customer, a location and a task checklist. This branch's equivalent of the Machine. It is *not* a list of services you can sell. |
| **Machine Maintenance Service** (خدمة صيانة ماكينة) | `crm-maintenance` | The **priced service catalogue** of the machine suite — a named service with a price and a tax plan that you put on an order line and charge for. |

The services branch has no equivalent of the second one, which is exactly why services here carry no price. If your implementer can, ask for the first file to be relabelled to something like *Serviced Location* — it removes most of the confusion in one edit. [Service Records](/modules/crm/services-suite/crm-service-records) covers that file in detail; the priced catalogue is described in [The Service Catalogue](/modules/crm/maintenance-setup/crm-maintenance-service-catalogue).

## Machine Vocabulary You Will See Anyway

Because the shared foundation was written for machines first, machine wording survives on service screens. Knowing it in advance saves a support call:

- A header field labelled **Machine Category** (تصنيف آلة) appears on service contracts, orders and notices. It filters the task-template lookup, so fill it.
- **Machine Classification 1..5** and **Serial Number** are on the screens too, as free reference fields.
- On the Maintenance Service Order the services grid is **titled "Machines" (ألآت)** although every row in it is a service. The other five documents in the folder title the same grid correctly.

## What Is in the Folder

The whole branch is ten records and documents, under **Customer Relationship Management → Service Documents** (خدمة العملاء ← سندات خدمات الصيانة):

| Screen | Arabic | Kind |
|---|---|---|
| Maintenance Service | خدمة صيانة | Master file — the serviced site |
| Maintenance Service Sales Quotation | عرض أسعار خدمة صيانة | Document |
| Maintenance Service Sales Order | أمر بيع خدمة صيانة | Document |
| Maintenance Service Contract | عقد خدمة صيانة | Document |
| Maintenance Service Work Plan | خطة عمل خدمة صيانة | Document |
| Maintenance Service Notice | بلاغ خدمة صيانة | Document |
| Maintenance Service Order | أمر خدمة صيانة | Document |
| Maintenance Service Order Execution | تنفيذ أمر خدمة صيانة | Document |
| Maintenance Service Invoice | فاتورة خدمة صيانة | Document |
| Maintenance Service Invoice Return | مردود فاتورة خدمة الصيانة | Document |

## The Licence Alone Is Not Enough

The `crm-maintenance-services` licence covers those ten screens and nothing else. But those screens ask for a lot of reference data that is licensed under **`crm-maintenance`**: buildings, floors and rooms, machine categories, the five classification files, maintenance groups, dysfunctions, trouble levels and trouble descriptions, order statuses and task templates.

::: warning Buy both codes
A site licensed for `crm-maintenance-services` alone will find reference fields on every screen whose master file it cannot create. In practice, running the services branch means licensing `crm-maintenance` as well. Raise this before the contract is signed, not during the setup.
:::

## Reporting, and What Runs on Its Own

Two module-wide facts apply here exactly as they do everywhere else in CRM:

- **There are no system reports and no dashboards for CRM at all.** One print form — the CRM Visit form — is the entire shipped reporting story, and it belongs to a different part of the module. For anything in this folder, use list views, Excel export, or a BI dashboard built by your site.
- **There is no scheduler anywhere in this module.** No task schedule, no reminder, no alarm, no escalation, no notification. Work plans, orders and executions look scheduled, but every one of them is produced by somebody pressing a button.

## The Example Used Throughout This Folder

The other three pages follow one thread, so the numbers stay consistent:

> **Nile Commercial Bank** (`C-02240`) contracts Al Nokhba to service the split air-conditioning units in three Alexandria branches. Each branch is one Maintenance Service record: `SRV-0071` Smouha, `SRV-0072` Sidi Gaber, `SRV-0073` Manshia. One service contract, `SVC-0006`, runs from 1 May to 1 November 2026 and covers 39 planned visits and 312 filters. Work plan `SWP-0011` produces service order `SO-0058`, which is executed as `SEX-0090` and invoiced as `SINV-0033`.

Read on: [Service Records](/modules/crm/services-suite/crm-service-records) for the serviced-site file, [Service Orders and Executions](/modules/crm/services-suite/crm-service-orders) for the working chain, and [Service Invoicing](/modules/crm/services-suite/crm-service-invoicing) for the money.
