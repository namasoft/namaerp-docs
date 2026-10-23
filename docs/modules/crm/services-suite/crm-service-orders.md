---
description: "The CRM services suite chain: Service Contract, generating work plans and service orders, the Service Notice and the Execution sheet, with actions and messages."
entities: [MnSrvContract, MnSrvOrder, MnSrvWorkPlan, MnSrvOrderExecution, MnSrvNotice]
---
# Service Orders and Executions

This page follows one contract from the day it is signed to the day a technician ticks the last box on a checklist. It is the working half of the Service Documents folder; the money is on the [Service Invoicing](/modules/crm/services-suite/crm-service-invoicing) page.

::: info Required licence
Every screen on this page needs the licence code `crm-maintenance-services`. The task templates, statuses, buildings and categories they refer to are licensed under `crm-maintenance`.
:::

## The Chain, and Which Arrows Are Automatic

```
Sales Quotation ──manual──▶ Sales Order ──manual──▶ Contract
                                                      │
                                                      │ button: Generate Services Work Plans
                                                      ▼
                                                  Work Plans
                                                      │
                                                      │ button: Generate Service Orders
                                                      ▼
   Notice ──manual (From Document)──────────────▶ Service Order
                                                      │
                                                      │ button: Create Service Execution For All Lines
                                                      ▼
                                                  Execution ──▶ status back onto the order
```

Every arrow in that diagram is a **button somebody presses**. Nothing in this folder happens on a timer. There is no scheduler, no reminder, no alarm and no notification anywhere in the CRM module, so a contract that nobody opens produces no work plans, and a work plan that nobody opens produces no orders.

## The Service Contract

The contract is where the commercial arrangement is recorded and where the visit calendar comes from. Al Nokhba's agreement with Nile Commercial Bank is contract `SVC-0006`, dated 1 May 2026.

![The Maintenance Service Contract screen](../../../ar/modules/crm/images/services-suite/crm-srv-contract-en.png)

**On the main tab** you set the Contract Type, the Customer (`C-02240`), the Contact and the **Subsidiary** (الذمة) — the account the entry will be made against — plus the Currency and the Work Plan Generate Type.

::: tip The contract dates are labelled "warranty"
The contract's start and end dates are the fields labelled **Warranty Start Date** (تاريخ بداية الضمان) and **Warranty End Date** (تاريخ نهاية الضمان). They are not a warranty in any meaningful sense here — they are the period the contract runs for, and the work-plan generator reads exactly those two boxes. For `SVC-0006` they hold 1 May 2026 and 1 November 2026. Sites commonly relabel them to *Contract Start Date* and *Contract End Date*, which is worth doing.
:::

**The services grid** carries one row per serviced site. For each row you choose the **Visit Types 1 to 7** — up to seven independent recurrences on the same site — each with its own task template, plus the employee who will do the work and the building. Nile Commercial Bank's three branches all take **Bimonthly** (نصف شهرية) with template `TT-BRN-B` and employee `EMP-2014`.

::: warning The services grid on this screen and on the service order is titled "Machines"
On the Maintenance Service Order the grid holding the service lines is headed **Machines** (ألآت), and it carries Machine Classification and Odometer columns as well. Every row in it is a service. Do not spend time looking for a separate machines grid, because there is not one anywhere in this branch.
:::

Here is the grid in question — headed **Machines**, with Service and Task Template as its first columns:

![The services grid on the Maintenance Service Order, headed Machines](../../../ar/modules/crm/images/services-suite/crm-srv-services-grid-en.png)

**The Spare Parts And Services tab** holds the parts entitlement — for `SVC-0006`, 312 filters (`SP-FLT-10`) at 180.00 each, being 39 planned visits × 8 filters per visit — with **Sold Quantity** (ما تم بيعه) and **Remaining Quantity** (المتبقي) columns beside them. Service lines in this branch carry no price.

**The Terms tab** is the SLA table: trouble level, trouble description and response time, plus two remark columns. On a Maintenance Service Notice raised against the contract, the Trouble Level and Trouble Description lookups offer only these rows, and picking one fills the other together with the response time and the remarks.

**When the contract is saved**, it creates an accounting entry over the **spare-part lines only** — for `SVC-0006`, 64,022.40 against the customer's subsidiary account, 56,160.00 to spare-parts revenue and 7,862.40 sales tax. That happens only if the contract's document term has **both** a debit and a credit side configured; if either is empty, nothing is created and any existing entry is cancelled. Like all document effects it is processed in the background, so the save itself is instant and the processing status is visible on the document. The contract moves no stock.

The execution sheet is what records a visit in this branch.

## Generating the Work Plans

With the contract saved, press **Generate Services Work Plans** (إنشاء خطط عمل). The generator needs the work-plan book and term to be named on the contract's document term, and it needs the contract start and end dates; it refuses without them.

For each services line, for each of its visit types, it walks forward from the contract start date one step at a time and emits a planned visit until it passes the contract end date. The step lengths are:

| Visit type | Step |
|---|---|
| Daily | 1 day |
| Weekly | 7 days |
| **Bimonthly** | **14 days** |
| Monthly | 1 month |
| Quarterly | 3 months |
| Biannual | 6 months |
| Yearly | 12 months |

::: tip "Bimonthly" means every 14 days
The Arabic label *نصف شهرية* — *twice a month* — describes what this visit type does: a visit every 14 days. For a visit every two months, use Monthly and delete alternate lines, or use Quarterly.
:::

For `SVC-0006` that gives 13 dates per branch — 15 and 29 May, 12 and 26 June, and so on to 30 October, the next one falling past the contract end — and 13 × 3 branches = **39 planned visits**, which is where the 312 filters came from. Those 39 lines are grouped into work plans according to **Work Plan Generate Type**; `SVC-0006` uses *Based On Contract Priority*, which groups by the month of the expected date, producing six work plans `SWP-0011` to `SWP-0016`.

If the first computed visit date already falls after the contract end date, the whole action fails with *"Visit type {0} is after contract end date {1} in line number {2}"* — which usually means the contract dates are the wrong way round.

::: warning Re-running the generator deletes work plans
Pressing *Generate Services Work Plans* again is not a safe refresh. Work plans whose grouping no longer matches are **deleted**, and they take their line-to-order links with them. If you change the contract dates or the visit types on a contract that already has orders in flight, expect to lose the trail between them.
:::

A work plan has **no accounting and no inventory effect** — it is a calendar with a document number.

## Generating the Orders

Open a work plan and press **Generate Service Orders** (إنشاء أوامر خدمة). The book and term for the new orders come from the work plan's document term.

Lines are grouped by **(expected date, employee, building)** and one service order is created per group. `SWP-0011` holds two dates across three buildings, so it produces six orders, `SO-0058` to `SO-0063`. Each order gets its value date from the line's expected date, its Service Contract from the work plan's From Document, and the header service, task template, technician, maintenance group, contact, customer, warranty fields and price classifiers copied down.

Pressing the button again **edits the order it created last time** rather than making a duplicate — the work-plan line remembers which order it produced.

To build or rebuild a work plan's lines by hand, tick one or more visit types in the work plan's **Visit Type** group and press **Gather Services With Same Options** (تجميع الخدمات التى لما نفس مواعيد الزيارة). It reads the contract named in From Document and fills the services grid with every contract line that carries any of the ticked visit types, replacing what the grid held. It does nothing if From Document is not a service contract.

## The Service Order

`SO-0058` — value date 15 May 2026, from document `SWP-0011`, service contract `SVC-0006`, service `SRV-0071`, employee `EMP-2014` — is a work order. It lists the services to be attended, the dysfunctions found, the spare parts expected (8 × `SP-FLT-10`, 1,440.00), the tools to be taken, the technicians and their rewards, and it keeps a status trail.

![The Maintenance Service Order screen and its five pages](../../../ar/modules/crm/images/services-suite/crm-srv-order-en.png)

::: info The service order creates nothing in the ledger and moves no stock
Unlike the machine suite's maintenance order, a Maintenance Service Order has **no accounting effect** — its document term has no Debit and Credit pages. Only the invoice reaches the general ledger.
:::

The header's **Service Contract** (عقد خدمة صيانة) field links the order to its service contract; the same field is on the Maintenance Service Notice and the Maintenance Service Invoice.

**What the order does refuse to save.** The technicians' rewards in the grid must add up to the header reward; every service used in a spare-parts, tools or dysfunctions line must appear in the services grid; the same service and task template may not be listed twice; a service line's Current Odometer Date may not equal its Last Odometer Date, so leave both empty; and the status-change lines may not be added, removed or edited by hand. That last rule is why the **Status Change** tab is read-only on screen: every row on it is written automatically when somebody changes the Current Status, capturing the from-status, to-status, timestamp, user and remark, and then clearing the remark box.

**The status type** is copied from whichever status you choose. If your Maintenance Order Status records have no status type set, the order's lifecycle records nothing useful — that setup detail is covered with the statuses themselves in the maintenance files.

**Moving parts out of stock** is a manual step here. The **Spare Parts Issue** (طلب صرف قطع غيار) and **Tools Issue** (طلب صرف عِدد) buttons on the order open a pre-filled Stock Issue Request that the user must then save; the **Spare Parts Receipt** button does the same for returned parts. Nothing leaves the warehouse when the order is saved. A receipt request arrives with an empty *From Document*, so type the link in if you rely on it.

## Ad-Hoc Work: The Service Notice

Not everything is planned. When a branch reports a fault, the intake document is the **Maintenance Service Notice** (بلاغ خدمة صيانة): the customer, the service, the trouble level, trouble description and response time, the dysfunctions found and any parts likely to be needed. Move it through the statuses as it progresses — every change is recorded on its Status Change tab automatically — and then raise a Maintenance Service Order with the notice as its **From Document**.

The notice **has no accounting effect and no inventory effect**. It is a fault log, nothing more. It also has **no document term**, so the Term field on its screen has no options behind it. And unlike the machine suite's notice, there is **no mobile check-in and check-out** on it — the technician attendance flow in Nama Mobile belongs to the machine branch only.

## The Execution Sheet

The execution is what the technician fills in. From the order, **Create Service Execution For All Lines** (إنشاء سند تنفيذ لكل السطور) — or *For Selected Lines* — creates one **Maintenance Service Order Execution** per service line, taking its book and term from the order's document term. If that term has the option to consider task-template tasks switched on, each execution arrives with the checklist already loaded.

`SEX-0090` is the execution for `SRV-0071` on 15 May 2026. The technician presses **Start** (بدء) at 09:00 to stamp the from-time, works through the five checklist lines, records the parts actually used (8 × `SP-FLT-10`), and presses **End** (إنهاء) at 11:30. Net time comes out at 2:30. **Make All Lines Done** ticks the whole checklist in one go. **Change Status To In Progress** sets the sheet's status to *ReOpen* (معاد فتحه), which the order counts as still in progress — use it to reopen a sheet that was ended too early.

**What saving it does:** the execution writes its status back onto the matching line of the parent order, and then sets the order's overall status type — *In Progress* if any line is still in progress or reopened, *Finished* otherwise. Cancelling the execution clears the link and the status from those lines again.

::: info The execution sheet is a work record
A Maintenance Service Order Execution lists spare parts and money totals, and it has **no accounting effect and no inventory effect**. Parts are moved either by saving one of the pre-filled stock requests its buttons open, or by the invoice.
:::

The execution is also the one document in this folder with **no document term class at all**. The Term field is on its screen; there are no settings behind it. Its machine twin does have one, which is why the two screens look identical and behave differently.

Four documents in this folder — the work plan, the sales order, the sales quotation and the execution — perform **no validation whatsoever** when saved. Book, code and dimensions aside, nothing on them is checked. Do not rely on the system to catch a mistake in a work plan.

When the work is done, [Service Invoicing](/modules/crm/services-suite/crm-service-invoicing) is the next and last step.

## Actions on these screens

Every button below is pressed by a person; none of them runs on its own. Buttons that create other documents need the record saved first.

**On the Maintenance Service Contract** (main tab):

- **Collect All Services Related To Customer** (*تجميع كل الخدمات المرتبطة بالعميل*) — fills the services grid with every service record whose customer is the contract's customer, replacing what the grid held. Refused with *"Customer must be entered"* if the Customer box is empty.
- **Generate Services Work Plans** (*إنشاء خطط عمل*) — builds the work plans from the visit types, as described in [Generating the Work Plans](#Generating-the-Work-Plans).
- On the **service sales order**, the same block adds **Generate Service** (*إنشاء الخدمة*): for every services line that has no service record yet, it creates and saves one, named from the line's service name and carrying its building, floor, room and dimensions, and links it to the line.

**On the Maintenance Service Work Plan:**

- **Gather Services With Same Options** (*تجميع الخدمات التى لما نفس مواعيد الزيارة*) — refills the services grid from the contract in From Document with the lines that carry any of the visit types ticked on the work plan.
- **Generate Service Orders** (*إنشاء أوامر خدمة*) — creates or updates one service order per expected date, employee and building, as described in [Generating the Orders](#Generating-the-Orders).

**On the Maintenance Service Order:**

- **Create Service Execution For All Lines** (*إنشاء سند تنفيذ لكل السطور*) — creates and saves one execution sheet per services line, or updates the one the line already points to, and marks the order *In Progress*. It needs the execution book and term on the order's document term; otherwise it refuses with *"You must select execution doc book and term in the term {0}"*.
- **Create Service Execution For Selected Line** (*إنشاء سند تنفيد للسطور المختارة*) — the same, for the services lines you ticked in the **Selected** column only.
- **Create Service Invoice** (*إنشاء فاتورة خدمة*) — opens a new, unsaved Maintenance Service Invoice in a pop-up with the whole order copied in; see [Service Invoicing](/modules/crm/services-suite/crm-service-invoicing).
- **Tools Issue** (*طلب صرف عِدد*), on the Tools And Visits tab — opens an unsaved stock request pre-filled with the tools grid and the customer.
- **Spare Parts Issue** (*طلب صرف قطع غيار*), on the Spare Parts And Services tab — opens an unsaved Stock Issue Request with the spare-parts lines, the customer, the order's issue warehouse and the order as From Document.
- **Spare Parts Receipt** (*طلب توريد قطع غيار المرتجعة*), on the same tab — opens an unsaved Stock Receipt Request with the returned spare parts and the order's receipt warehouse.

**On the Maintenance Service Order Execution:**

- **Make All Lines Done** (*تفعيل اختيار في جميع السطور*) — ticks Done on every checklist line.
- **Start** (*بدء*) — fills the status (*In Progress*), the from-date and the from-time, but only the boxes that are still empty.
- **End** (*انهاء*) — sets the status to *Finished*, stamps today's date and the current time as the end, and calculates the net time. It does nothing if the sheet is already finished.
- **Change Status To In Progress** (*تغيير الحالة إلى قيد التنفيذ*) — sets the status to *ReOpen* (معاد فتحه).
- **Create Service Invoice** (*إنشاء فاتورة خدمة*) — opens a new, unsaved Maintenance Service Invoice in a pop-up with the execution's header, its service and its spare parts copied in.
- **SrvSparePartsIssueRequest** (*طلب صرف قطع غيار*), on the Spare Parts And Services tab — opens an unsaved Stock Issue Request with the spare parts and the customer; choose the warehouse yourself. The English label shows the button's internal name on screen.
- **Spare Parts Issue** (*طلب صرف قطع غيار*) — opens an unsaved **Stock Issue** itself, not a request, with the spare parts, the customer, your current dimensions and the execution as From Document. On an Arabic screen this button and the previous one carry the same label; the first one in the block is the request.

The **Maintenance Service Notice** has no buttons of its own beyond the standard toolbar.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Customer must be entered* — «يجب ادخال العميل» | **Collect All Services Related To Customer** was pressed on a contract with no Customer. | Fill the Customer box and press the button again. |
| *You must select execution doc book and term in the term {0}* — «يجب اختيار دفتر وتوجيه سند التنفيذ في التوجيه {0}» | **Create Service Execution For All Lines** or **For Selected Line** was pressed, but the order's document term names no execution book and term. | Fill the execution book and term on the service order's document term. |
| *Visit type {0} is after contract end date {1} in line number {2}* — «نوع الزبارة {0} هو بعد تاريخ نهاية العقد {1} في السطر {2}» | *Generate Services Work Plans* computed a first visit date that already falls after the contract's Warranty End Date. | Check the contract's Warranty Start Date and Warranty End Date — they are usually the wrong way round. |
| *Main Quantity can not be less than the Sold Quantity* — «الكمية الأساسية لا يمكن ان تقل عن الكمية المباعة» | A spare-parts line on the contract has a Quantity lower than the Sold Quantity typed beside it. | Raise the Quantity or correct the Sold Quantity. |
| *The Item {0} in line {1} is repeated* — «البند {0} في السطر {1} مكرر» | The same spare part is listed twice in the contract's Spare Parts And Services grid. | Merge the two rows into one carrying the combined quantity. |
| *Total technicians reward is not equal to total of technicians rewards in the grid* — «مكأفاة الفنين لا تساوي مجموع مكأفات الفنين في التفاصيل» | On a service order, the header Technicians Reward does not equal the sum of the rewards in the technicians grid. | Correct either the header figure or the grid rows so the two agree. |
| *The Line Number {0} is added by User,This is not permitted* — «السطر رقم {0} تم إضافته بواسطة المستخدم وهذا غير مسموح به» | A row was typed by hand into the order's Status Change tab; only an actual status change may write there. | Delete the row and move the document by setting Current Status instead. |
| *The line that was at {0} in the table ({1}) was removed, this is not permitted* — «السطر الذي كان رقمه {0} تم حذفه من الجدول ({1}) و هذا غير مسموح به» | A row that was already on the Status Change tab was deleted. | Reopen the order without saving; the status trail can not be pruned. |
| *Field ({0}) Value changed from {1} to {2} line number {3} in grid ({4})* — «لقد تغيرت قيمة الحقل ({0}) من {1} الي {2} في السطر رقم {3} في الجدول ({4})» | A value on an existing Status Change row — its date, from-status, to-status, user or remark — was edited. | Reopen the order without saving and leave the trail as the system wrote it. |
| *The field {0} and field {1} can not be the same date* — «الحقل {0} والحقل {1} لا يمكن أن يكونا بنفس التاريخ» | A service line on the order carries the same date in Current Odometer Date and Last Odometer Date. | Clear both dates — there is no odometer tracking in the services branch. |
