---
description: "The HMS Pharmacy and Blood Bank master files and the pharmacy, medical supplies, service and supply and blood bank invoices and returns: billing the patient and insurer, the stock they move, and their prices."
entities: [HMSPharmacyInvoice, HMSPharmacyReturn, HMSPharmacy, HMSSuppliesInvoice, HMSSupplyReturn, HMSServiceSupplyInvoice, HMSBloodBankInvoice, HMSBloodBankReturn, HMSBloodBank]
menu: Hospital Management System → Pharmacies → Pharmacy Invoice
---

# Pharmacy, Supplies & Blood Bank

Most hospital invoices sell something you cannot put on a shelf — a consultation, a night in a room, an
X-ray. This page is about the other kind: drugs, medical supplies and blood units, which leave a
warehouse when they are billed and come back into it when they are returned. Each of these invoices
does two jobs at once. It bills the patient and the insurer, with the usual
[patient/insurer split](./hms-invoicing.md), and it **moves stock** by producing a stock issue (or, for a
return, a stock receipt) behind the scenes.

There are two routes by which stock leaves the warehouse in this module:

- **Stock invoices** — Pharmacy Invoice, Medical Supplies Invoice, Service And Supply Invoice and Blood Bank
  Invoice, plus their returns. Every line is an item line, and the whole grid becomes a stock document.
- **Supplies inside a service invoice** — a lab test, radiology, surgery or other service invoice that
  carries a supplies grid alongside its services. Only that supplies grid becomes a stock document.

The two routes are configured in different places on the document term, so they are covered separately
below.

## Where the screens are

| Screen | Menu |
|---|---|
| **Pharmacy**, **Pharmacy Invoice**, **Pharmacy Return** | Hospital Management System → Pharmacies |
| **Blood Bank**, **Blood Bank Invoice**, **Blood Bank Return** | Hospital Management System → Blood Banks |
| **Medical Supplies Invoice**, **Service And Supply Invoice**, **Supply Return** | Hospital Management System → Medical Services |

The list screens of the invoices and returns can be filtered by patient, doctor and insurance company,
and the two blood bank lists by patient admission as well.

## The Pharmacy and the Blood Bank master files

A **Pharmacy** (Hospital Management System → Pharmacies → Pharmacy) is the dispensing point a pharmacy
invoice is issued from — the main pharmacy, an inpatient pharmacy, an outpatient window. The file is
deliberately small: a code, a group, the Arabic and English names, a **Subsidiary Accounts** block and the
dimensions. That accounts block is the point of the file — it makes each pharmacy an accounting party, so
the pharmacy's revenue or stock movement can be recorded on its own account.

A **Blood Bank** (Hospital Management System → Blood Banks → Blood Bank) has the same shape — basic
information, Subsidiary Accounts and dimensions — and plays the same role for blood units.

On the invoice's document term, an accounting side can take its subsidiary from the document: choose
**Pharmacy** as the source on a Pharmacy Invoice term, or **Blood Bank** on a Blood Bank Invoice term, and
the entry lands on the account of the pharmacy or blood bank named on the invoice header.

![A Pharmacy record](../../ar/modules/hms/images/master-files/hms-pharmacy-en.png)

## The pharmacy invoice

**Pharmacy Invoice** (Hospital Management System → Pharmacies → Pharmacy Invoice) dispenses drugs to a
patient. Its header carries the patient, doctor and patient admission, the insurance company and
insurance class, the **Pharmacy**, the medical document category, the subsidiaries, the medical
specialty, the patient and company endurance percentages and the price classifiers. Below that sit the
accommodation information (the patient's room at the time), the price totals, and the overhead totals.

The **details** grid is a full inventory line — item, unit and quantity, warehouse, lot, box, revision,
size and colour, production and expiry dates — followed by the unit price, the medical specialty, and
the price block that splits each line between the patient and the insurer. The overhead items grid sits
under it.

![Pharmacy invoice](../../ar/modules/hms/images/invoicing/pharmacy-invoice-en.png)

### Filling the header from the admission

This and the next two sections hold for every invoice and return on this page. For an inpatient, start with the **Patient Admission**. The lookup offers only admissions that have no
exit yet, narrowed to the patient when one is already chosen. Picking the admission fills in the
patient, the doctor, the insurance company, the five price classifiers, the patient and company
endurance percentages, the **Record Category** and the **Accommodation Info** group — the building,
section, floor, room and bed the patient occupies right now. On save, the patient must be the patient
of that admission.

The two endurance percentages complete each other: type 80 in **Patient Endurance Percent** and
**Company Endurance Percent** becomes 20. The header **Medical Specialty** is copied onto every item line
on save, so set it once on the header rather than line by line.

### The lines and their prices

When you pick an item, its price is looked up the same way as any other HMS service: by the item, unit
and quantity, the patient, the insurance company and class, the doctor and the price classifiers,
against the [insurance approval](./hms-insurance.md) and the [medical sales price list](./hms-pricing.md).
A pharmacy invoice and return are priced from the **Pharmacies** tab of those lists, the supplies
documents (and the item grid of the Service And Supply Invoice) from the **Medical Supplies** tab, the
blood bank documents from the **Blood Banks** tab, and the service rows from the **Medical Services**
tab. Changing the quantity or the unit prices the line again. Where the grid has price classifier
columns (the supplies, service-and-supply and blood bank invoices), a classifier filled on a line wins
over the header's for that line. On the invoices that have an overhead items grid (pharmacy, supplies,
and service-and-supply), the same pick fills that grid with the estimated overhead costs of the
[medical overhead list](/modules/hms/hms-pricing#Indirect-overhead-costing).

Taxes come from the item's own tax plan, or from the term's **Tax Plan** when the item has none. The
patient and insurer shares are taxed separately, as on every HMS invoice.

The item, lot, box, revision, size, colour and expiry columns, and the serial number columns that are
hidden in the grid by default, behave as on any stock document — see
[The Anatomy of a Supply Chain Document](/modules/supplychain/the-document-screen#The-Tracking-Dimension-Columns).
The header **Warehouse** is written onto every line when it is filled.

### The stock issue behind the invoice

Saving the invoice creates a **stock issue** for the details grid, taking the warehouse and locator from
the invoice header. The **Related documents** tab lists it under **Stock Issues**, so you can open the
stock document from the invoice. The stock issue carries the invoice's issue date, value date, fiscal
period, remarks and dimensions, and names the invoice as its **From Document**. Edit the invoice and the
stock issue is updated; delete or cancel it and the stock issue goes with it.

The stock issue is checked against the available quantity like any other stock issue, under the
[overdraft rules](/modules/supplychain/configuration/overdraft-and-quantity-checking) of the item and the
warehouse. When it is refused, the invoice is not saved either.

An invoice with an empty item grid is refused with *Details must be filled*, unless its term has
**Allow Save Without Details** ticked (on the Dimensions part of the
[Generation & Dimensions tab](/modules/supplychain/document-terms/doc-term-generation-and-dimensions#Dimensions)).
With that option, emptying the grid of a saved invoice deletes its stock issue.

::: info The stock issue comes from the Generation tab
For the pharmacy invoice and the other stock invoices on this page, the stock document is created only
when the document term's **Generation** tab names a **Generation Book** and a **Generation Term**. Those
two fields decide which book and term the stock issue (or, for a return, the stock receipt) is saved
under. Leave either one empty and the invoice still bills and creates its entry, but no stock moves.
:::

![The Related Documents tab of a pharmacy invoice](../../ar/modules/hms/images/invoicing/hms-pharmacy-invoice-related-en.png)

### Returning drugs: the pharmacy return

**Pharmacy Return** (Hospital Management System → Pharmacies → Pharmacy Return) is the mirror document
for drugs that come back unused. It carries the same header (patient, doctor, admission, insurer,
pharmacy, endurance percentages, price classifiers) and the same item grid, but saving it creates a
**stock receipt** into the header warehouse instead of a stock issue — the Related documents tab lists it
under **Stock Receipt**. It has no overhead grid, no header Medical Specialty and none of the
price-freezing actions, and its line discounts are not checked against the employee's discount limits.

### Building a return from the invoice

Every invoice and return on this page has a **From Document** field in its header. Pick the original
pharmacy invoice there and the return copies its lines through the standard supply chain mechanism,
governed by the [From Document tab](/modules/supplychain/document-terms/doc-term-from-document#Copying-from-the-Source-Document)
of the return's term. When the source is one of the documents on this page, the patient admission, the
patient, the doctor and the two endurance percentages are copied as well, so the return is billed to
the same patient and insurer split as the invoice.

The HMS documents add no check of their own that a return stays within what was invoiced: nothing stops
you from returning more than the invoice issued, or from returning without naming the invoice at all.
The only link to the original is the From Document, and any control over the copied quantities comes
from that tab, for example its **Consistency with from Doc.** option.

The return is recorded through the same accounting sides as the invoice (patient value, insurance value,
discounts, taxes, cost), and nothing in it reverses the direction for you: the return's own document term
must hold the sides the other way round from the invoice's term. Give the return term the patient value
on the credit side where the invoice term has it on the debit side, and so on for each pair.

## Supplies invoices and their return

**Medical Supplies Invoice** (Hospital Management System → Medical Services → Medical Supplies Invoice)
issues medical supplies — dressings, syringes, catheters — to a patient. It has the same header as the
pharmacy invoice minus the pharmacy, the same item grid, and the overhead items grid. Saving it creates a
stock issue, listed under **Stock Issues** on its Related documents tab.

**Supply Return** (Hospital Management System → Medical Services → Supply Return) takes supplies back:
same header and item grid, no overhead, and saving it creates a stock receipt. As with the pharmacy
return, its term's accounting sides must be set the other way round, and it can be built from the
supplies invoice through **From Document**.

![A medical supplies invoice](../../ar/modules/hms/images/invoicing/hms-supplies-invoice-en.png)

### The Service And Supply Invoice

**Service And Supply Invoice** (Hospital Management System → Medical Services → Service And Supply
Invoice) bills services and supplies on one document — a dressing change with its dressings, an
injection with the syringe and the drug — when no lab, radiology or surgery invoice fits. Its main tab
holds the item grid first and then a second grid, **Medical Service Details**, where each row names a
service category, medical specialty and medical service with a count and its own price block. Only the
item grid becomes the stock issue; the service rows are billed but move no stock.

A few things set it apart from the other stock invoices:

- **The item grid may be empty.** It is the only document on this page that saves with services alone
  without *Allow Save Without Details* on its term (unless *Prevent Save Without Supplies* is ticked) —
  and with no items, no stock issue is made.
- **The service lookup follows the specialty.** A row's **Medical Service** lookup offers the services of
  the row's medical specialty, or of the header's when the row has none, and of the row's service
  category; services with no specialty or category are always offered. The header specialty is also
  copied onto every service row on save.
- **Picking a service prices it, and only that.** Its price and patient/insurer split come from the
  **Medical Services** tab, and changing the count prices the row again. Unlike a services or surgery
  invoice, the service's own medical supplies are not copied in — enter the items it consumed in the
  item grid yourself.
- **Each grid has its own freeze switch.** The item grid follows *Allow Changing Supplies Prices*, the
  service rows *Allow Changing Services Prices* — see [Prices on these invoices](#Prices-on-these-invoices).

![A service and supply invoice](../../ar/modules/hms/images/invoicing/hms-service-supply-invoice-en.png)

## Blood bank invoice and return

**Blood Bank Invoice** (Hospital Management System → Blood Banks → Blood Bank Invoice) issues blood units
and bills them. Its header names the **Blood Bank**; its main grid is an item grid like the pharmacy's,
and a second tab, **Medical Services**, holds service rows (cross-matching, for example) that are billed
alongside. Saving it issues the blood units through a stock issue, listed under **Stock Issues**. The
service rows are priced from the **Medical Services** tab when you pick the service or change the count,
and follow *Allow Changing Services Prices*; the units follow *Allow Changing Main Prices*. Unlike the
pharmacy and supplies invoices, it has no overhead items grid.

**Blood Bank Return** (Hospital Management System → Blood Banks → Blood Bank Return) receives unused
units back into the warehouse on its header through a stock receipt, listed under **Stock Receipt**. It
has the units grid only — no service rows — and can be built from the blood bank invoice through
**From Document**, as described above for the pharmacy return. It is described with the clinical
documents on [Clinical Orders & Results](./hms-clinical-orders.md#The-blood-bank).

![The Medical Services tab of a blood bank invoice](../../ar/modules/hms/images/invoicing/hms-blood-bank-invoice-en.png)

## Supplies inside service invoices

The second route starts on the master files. A **Medical Service** and each sellable type — lab test,
radiology, physical therapy and surgery type — carries a **Medical Supplies** tab: the items consumed
whenever that service is performed, with their quantities, warehouse and a **Free Item** tick. (See
[Medical Master Files](./hms-medical-master-files.md) and [Medical Service Catalog](./hms-service-catalog.md).)

When you pick that service or type on a line of a service invoice, its medical supplies are copied into
the invoice's supplies grid and priced, and its linked services into the services grid. A supply marked
**Free Item** is issued but not charged: on save its price is cleared, so it moves stock without adding
to the bill.

These supplies are turned into a stock document by the **Origin Document Effect** group on the service
invoice's document term:

| Field | What it does |
|---|---|
| **Origin Issue Document Type** | **Stock Issue** issues the supplies straight away. **Stock Issue Request** creates a request instead, for the store to fulfil. Leave it empty and no stock document is created. |
| **Stock Issue Book** / **Stock Issue Term** | The book and term the generated document is saved under. Both must be filled, or nothing is generated. |

The generated document takes its warehouse from the invoice header and is kept in step with the
invoice: editing the supplies grid updates it, emptying the grid deletes it, and cancelling the invoice
deletes it.

Two options on the same term decide how the supplies are billed. **Do Not Add Supplies To Invoice** keeps
the supplies grid out of the invoice total and out of its accounting entry — the supplies are still
issued from stock, but the patient is not charged for them on this invoice. **Do Not Add Services To
Invoice** does the same for the services grid.

## Prices on these invoices

Two term options and three actions control whether a saved invoice's prices can change.

**Update Prices With Save** on the document term re-prices every line from the approval and the price
lists each time the invoice is saved. That keeps the invoice in line with the current agreements, but it
also overwrites any price somebody typed by hand. For the exception, every invoice on this page except
the three returns carries three actions in the **More** menu — **Allow Changing Main Prices**, **Allow
Changing Services Prices** and **Allow Changing Supplies Prices**. Each ticks the flag of the same name
on the saved invoice, and a ticked flag keeps the prices of its grid exactly as entered on every later
save. Which flag guards which grid depends on the invoice:

| Invoice | Item grid | Service rows |
|---|---|---|
| **Pharmacy Invoice** | Allow Changing Main Prices | — |
| **Blood Bank Invoice** | Allow Changing Main Prices | Allow Changing Services Prices |
| **Medical Supplies Invoice** | Allow Changing Supplies Prices | — |
| **Service And Supply Invoice** | Allow Changing Supplies Prices | Allow Changing Services Prices |

The other actions are shown too but change nothing on that invoice. The invoice must be saved before you
press them.

Two more term options apply to the stock invoices. **Prevent Save Without Supplies** refuses to save an
invoice whose item grid is empty, and **Prevent Save Without Services** refuses one whose services grid
is empty — so only tick the second on a term whose document has a services grid (the Service And Supply
Invoice and the Blood Bank Invoice).

**Do Not Add Supplies To Invoice** and **Do Not Add Services To Invoice**, described for service invoices
above, work on the pharmacy, supplies and blood bank documents too: there the item grid counts as the
supplies. Tick the first on a pharmacy invoice term and the drugs are still issued from stock, but they
are left out of the totals and the entry; tick the second on a blood bank invoice term and its service
rows are left out the same way.

### Discount limits, the admission ceiling and packages

A line discount on the pharmacy, supplies, service-and-supply or blood bank invoice may not exceed the
**Max Discount** value and percentage on the employee file of the user entering it — the same rule as on
the other [HMS invoices](/modules/hms/hms-invoicing#Messages-you-may-see). The returns do not check it.

When the patient admission carries an insurance maximum across all invoices, these invoices count
towards it like every other invoice of the admission. When an invoice's insurance share is more than
what is left of the ceiling, the insurer's share on its item lines is cut down to what is left, the
patient's share takes the difference, and **Insurance Max Value From Admission** on each line shows the
part the insurer still carries. The admission's remaining counter is described on
[Patients & Admission](/modules/hms/hms-patients#The-patient-admission).

For a patient on a surgery package, the package item flags decide where these documents land on the
Surgery Package Invoice: **Pharmacies** picks up the pharmacy invoices, **Medical Supplies** the supplies
invoices and **Blood Bank** the blood bank invoices, with the matching returns subtracted — see
[The Surgery Lifecycle](/modules/hms/hms-surgery-lifecycle#Settling-the-package-the-surgery-package-invoice).

A **Medical Document Category** with *Use Doctor Instead Of Patient In Accounting Effects* ticked makes
every side whose subsidiary is taken from the patient land on the invoice's doctor instead, as described under
[Medical Master Files](/modules/hms/hms-medical-master-files#Feeding-patient-classes-and-document-categories).

## Sending them to the tax authority

Each invoice and return on this page can be sent to the tax authority like any other taxable document,
through the **Send To Tax Authority** option on its book or term. The patient is the receiver, every item
line and service row is sent, and the three returns go as credit notes (or return receipts). See
[Which documents are sent](/modules/invoicing/egypt-einvoice-guide#Which-documents-are-sent).

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Details must be filled* — «لا يمكن ترك التفاصيل فارغة» | The item grid is empty and the term does not have *Allow Save Without Details* ticked. The Service And Supply Invoice never raises it. | Add the items being issued or returned, or tick *Allow Save Without Details* on the term. |
| *Main lines can not be empty* — «لا يمكنك ترك تفاصيل الرئيسية فارغة» | The term has *Prevent Save Without Supplies* ticked and the item grid of a pharmacy, supplies, service-and-supply or blood bank invoice (or one of the returns) is empty. | Add the items being issued or returned, or untick the option on the term. |
| *Services lines can not be empty* — «لا يمكنك ترك تفاصيل الخدمات فارغة» | The term has *Prevent Save Without Services* ticked and the services grid is empty. On a document with no services grid, such as the Pharmacy Invoice, this option makes every save fail. | Add a service row, or untick the option on that term. |
| *Unit price can not be negative* — «سعر الوحدة لا يمكن أن يكون سالب» | A line's unit price is below zero. | Correct the unit price; to give something away, use a discount or, on a supplies line of a service invoice, the Free Item tick. |
| *Patient {0} does not match patient {1} in admission {2}* — «المريض {0} لا يطابق المريض {1} الموجود في استمارة الدخول {2}» | The patient on the invoice is not the patient on the patient admission it names. | Pick the admission that belongs to this patient, or correct the patient. |
| *Total of patient endurance percent and company endurance percent must equal 100* — «مجموع حقلي نسبة تحمل المريض ونسبة تحمل الشركة يجب أن يساوي 100» | The patient and company endurance percentages, on the header or on a line, do not add up to 100. | Fix the two percentages so that together they make 100. |
| *The current discount value {0} is greater than the max discount value {1} of current employee* — «قيمة الخصم الحالي {0} أكبر من أقصى قيمة خصم {1} للموظف الحالي» | A line discount on one of the four invoices is above the Max Discount value on the employee file of the user saving it. On a line the two numbers are not filled in, so the message shows `{0}` and `{1}` as they are. | Reduce the discount, or have the invoice saved by a user whose employee file allows it. |
| *The current discount percentage {0} is greater than the max discount percentage {1} of current employee* — «نسبة الخصم الحالية {0} أكبر من أقصى نسبة خصم {1} للموظف الحالي» | As above, for the discount percentage. | As above. |
| *Overhead item {0} is repeated in line {1}* — «بند التكلفة الغير مباشرة {0} مكرر في السطر {1}» | The same overhead item appears twice in the invoice's overhead grid. | Delete the duplicate row. |
