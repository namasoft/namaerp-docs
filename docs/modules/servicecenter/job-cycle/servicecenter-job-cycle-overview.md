---
description: "Overview of the Service Center job order cycle from service request and job estimation through job order, closing, customer, insurance and warranty invoices and gate pass, and which documents need a term."
---
# Job Order Cycle Overview

A car turns into the service centre at Al-Sahra Motors on a March morning. Two days later it drives
out again, three invoices have been issued against it, a stock issue has taken five litres of oil and
a compressor out of the parts store, and the vehicle's file knows when it is next due. Between those
two moments sits a chain of documents, and this folder is about that chain.

The chain is short and it is worth learning in one go, because every other page in this folder is a
close-up of one link in it:

```
Service Request  →  Job Estimation  →  Estimation Update
        │                  │                   │
        └──────────────────┴───────────────────┘
                           ↓
                      Job Order  ←  Add Task To Job Order
                           ↓
             (work recorded on the shop floor)
                           ↓
                   Job Order Closing  →  stock issue + journal entry
                           ↓
        Customer / Insurance / Warranty invoices
                           ↓
                       Gate Pass
```

::: info Required licence
Every document on this page is gated behind the base Service Center licence code `srvcenter`.
Nothing in this folder is available on a base installation.
:::

## Nothing forces you along the chain

This is the first and most important thing to understand, because it explains a great deal of what
readers find surprising later.

There is **no wizard and no "create the next document" button** between the first four documents.
What joins them is a single field called **From Document** (بناءا على) at the top of each screen.
You open a job estimation, you point its *From Document* at yesterday's service request, and the
header, the operations, the resources and the spare-parts lines are poured into the new document for
you. That is the whole mechanism.

Two consequences follow, and both matter operationally:

- **A job order can be opened cold.** Nothing anywhere validates that a job order came from an
  estimation, or that an estimation came from a request. A workshop that never raises a service
  request is using the module perfectly correctly. Your discipline is what makes the chain a chain.
- **Copying is a snapshot, not a live link.** Once the copy has happened, the two documents go their
  separate ways. Re-price the job order and the estimation still shows the old figures; change the
  estimation and the job order does not notice. The link that remains is a reference, useful for
  tracing, not a channel through which values keep flowing.

A job order's *From Document* may be a service request, a job estimation, an estimation update, or
a reception inspection sheet. In the inspection case only the vehicle header travels across — the
inspection's findings do not become work.

### The links that *are* enforced

Four references in the whole cycle are genuinely mandatory:

| Document | Must point at | Note |
|---|---|---|
| Estimation Update | a Job Estimation | The reference is required — but see [Job Estimations](/modules/servicecenter/job-cycle/servicecenter-job-estimation.md) for what it does and does not do to that estimation |
| Add Task To Job Order | a Job Order | And the job order's term must allow it |
| Job Order Closing | a Job Order | One closing per job order, ever |
| Gate Pass | a Job Order via *From Document* | Unless the term ticks *Allow Gate Pass Without Job Order* |

Everything else is convention.

### Statuses travel back up the chain

When a job order is committed it walks back up the *From Document* trail and moves what it finds to
**Under Processing**: the estimation it came from, and — if that estimation itself came from a
service request — the request too. The job order's own number is stamped onto each of them, so from
an old service request you can always jump forward to the job that eventually came out of it.
Deleting the job order puts them back to **Not Started**.

## Following one job all the way through

Meet the canonical example this documentation uses everywhere. Fahad Al-Otaibi owns a 2023 NAWA
Saif 1.6, vehicle `VEH-2031` in the workshop's product register. He telephones on 2 March 2026.

1. **The booking.** Service request `SCSR-2026-0881` reserves 6.5 hours on 3 March in the Mechanical
   Hall [work centre](/modules/servicecenter/workshop-setup/servicecenter-work-centers.md)
   (`WC-MECH`), visit type *Scheduled Service*. Committing it consumes those hours out of the
   day's appointment capacity. See
   [Service Requests](/modules/servicecenter/job-cycle/servicecenter-service-request.md).
2. **Arrival.** He arrives at 08:20 on 3 March. Reception reads the odometer at **45,300** km — the
   previous reading was 41,600 on 1 January — and completes a
   [reception inspection sheet](/modules/servicecenter/inspections-and-campaigns/servicecenter-inspections.md).
3. **The estimate.** Job estimation `SCJE-2026-0455` prices the work. Fahad queries the wash, so a
   second, revised estimate `SCJEU-2026-0119` is raised naming the first. See
   [Job Estimations](/modules/servicecenter/job-cycle/servicecenter-job-estimation.md).
4. **The job order.** `SCJO-2026-0417` is created from the revised estimate. Five tasks, four spare
   parts, 3,215 in total. See [The Job Order](/modules/servicecenter/job-cycle/servicecenter-job-order.md).

   | | |
   |---|---|
   | Operations (labour) | 780 |
   | Spare parts | 2,435 |
   | **Job total** | **3,215** |

5. **Who pays.** The routine service is Fahad's, the air-conditioning failure is under warranty, the
   alignment follows an insurance claim, and the wash is goodwill the company absorbs. Every line
   carries that decision as four percentages and four values, and they roll up to
   **695 customer / 60 insurance / 2,400 warranty / 60 internal**. This is the module's signature
   feature and it has its own page:
   [Who Pays for What](/modules/servicecenter/job-cycle/servicecenter-payer-split.md).
6. **The work.** [Parts are issued](/modules/servicecenter/spare-parts/servicecenter-spare-parts-issue.md)
   against the order,
   [technicians clock their time](/modules/servicecenter/workshop-execution/servicecenter-production-execution.md),
   and each task line moves to *Finished*.
7. **Closing.** `SCJOC-2026-0392` pulls in the finished operations and all the materials, fills the
   four money boxes, generates the stock issue for what was consumed, projects the next visit as
   15 March 2026, and flips the order to **Closed**. See
   [Closing a Job Order](/modules/servicecenter/job-cycle/servicecenter-job-order-closing.md).
8. **Invoicing.** Three buttons produce three sales invoices — 695 to Fahad, 2,400 against the
   warranty provider, 60 against the insurer. The internal 60 is never invoiced to anybody. See
   [Invoicing a Job Order](/modules/servicecenter/job-cycle/servicecenter-job-order-invoicing.md).
9. **Release.** Gate pass `SCGP-2026-0475` is issued once the required invoices exist and the
   customer's invoice is paid. See
   [Gate Pass](/modules/servicecenter/job-cycle/servicecenter-gate-pass.md).
10. **Between visits.** Odometer readings keep the vehicle's average daily mileage current so the
    next service falls due on time. See
    [Odometer Readings and Service Intervals](/modules/servicecenter/job-cycle/servicecenter-odometer-and-service-intervals.md).

## Where the money actually goes

Read this before you design your chart of accounts around the cycle, because the shape is not the
one most people assume.

- The service request, the estimation, the estimation update, the job order, the add-task document
  and the gate pass are **all financially silent**. None of them posts anything and none of them
  moves stock. The job order in particular is a *demand* document: it plans the parts, it does not
  issue them.
- The **closing** is the only document in the cycle that posts a journal entry of its own — and it
  posts the **customer share only**.
- The **invoices** carry the rest into accounting: the customer, insurance and warranty invoices post
  revenue, tax and receivable in the ordinary way.
- The **internal share reaches accounting nowhere at all.**

::: danger The 3,215 does not become 3,215 in the ledger
The closing document shows four money boxes totalling 3,215, but its journal entry carries **695** —
the customer figure — as one debit and one credit. Insurance and warranty money only reaches the
ledger if you press their invoice buttons, and the internal 60 never reaches it by any route.
If you are relying on this module to account for warranty recovery from the manufacturer, that
recovery has to come from the warranty **invoice**, not from the closing.
:::

## What each document does behind the scenes

| Document | Posts to the ledger | Moves stock | Also does |
|---|---|---|---|
| Service Request (طلب خدمة) | no | no | Reserves hours against the day's appointment capacity; fills in empty fields on the vehicle file |
| Job Estimation (مقايسة) | no | no | Moves its source service request to *Under Processing* |
| Estimation Update (تعديل مقايسة) | no | no | Nothing to the estimation it names |
| Job Order (أمر شغل) | no | no | Pushes the odometer onto the vehicle, records which services were performed at what mileage, marks a recall executed, closes the reception queue ticket |
| Add Task To Job Order | no | no | Rebuilds the job order's operations grid — read the danger box on the job order page before using it |
| Job Order Closing (إغلاق أمر شغل) | **yes — customer share only** | **indirectly**, through a generated stock issue | Sets the order to *Closed*, projects the next visit date |
| Kilo Metrage (سجل قراءة العداد) | no | no | Updates the vehicle's odometer and its average daily mileage |
| Gate Pass (تصريح عبور البوابة) | no | no | Refuses to be issued until the required invoices exist and are paid |

Each document's effects are created as **business requests** processed in the background, which is
why saving is instant. If a closing's journal entry or a generated stock issue does not appear,
look for it in the Business Requests list view, filter by failed status and use **More → Reprocess**.

## Which documents need a document term

Only three: the **job order**, the **closing** and the **gate pass**. For the job order and the
closing the term is not optional in practice, because the
[invoice books, the invoice terms and the accounting sides](/modules/servicecenter/document-terms/servicecenter-terms-workshop.md)
all live on it — a job order on a term with no customer invoice book cannot be
invoiced, and a closing on a term with no debit and credit posts nothing.

The service request, the estimation, the estimation update, the add-task document and the kilo
metrage document require no term at all. They still *show* a **Term** (توجيه المستند) field; filling
it in is optional and mostly useful for the product-status options it carries.
