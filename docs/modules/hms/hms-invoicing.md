---
description: "The hospital invoices, one per service type: where each sits in the menu, their common structure, how an invoice is started from the admission, how a line is priced and split between patient and insurer, the admission-wide insurance ceiling, what each invoice records in the ledger, doctor fees, payment, cancellation and e-invoicing, the surgery package and closing invoices, freezing a price, and the messages shown."
entities: [HMSClosingInvoice, HMSSurgeryInvoice, HMSSurgeryPackageInvoice, HMSAccommodationInvoice, HMSPatientCheckInvoice, HMSLabTestInvoice, HMSRadiologyInvoice, HMSPhysicalTherapyInvoice, HMSSupervisionInvoice, HMSServicesInvoice, HMSAttendantInvoice, HMSPharmacyInvoice, HMSPharmacyReturn, HMSSuppliesInvoice, HMSSupplyReturn, HMSServiceSupplyInvoice, HMSBloodBankInvoice]
---
# Invoicing & Billing

Billing is the hospital's financial backbone. The rule is simple: **one invoice per service type**. These invoices are very similar in structure and then differ in their lines by service type. All of them are documents that produce an **accounting effect**.

## Where the invoices are

Each invoice sits in the menu group of the service it bills:

| Invoice | Menu |
|---|---|
| **Check Invoice**, **Accommodation Invoice**, **Attendant Invoice**, **Supervision Invoice** | Hospital Management System → Documents |
| **Laboratory Test Invoice** | Hospital Management System → Laboratory Tests |
| **Radiology Invoice** | Hospital Management System → Radiology |
| **Surgery Invoice** | Hospital Management System → Surgeries |
| **Physical Therapy Invoice** | Hospital Management System → Physical Therapy |
| **Pharmacy Invoice**, **Pharmacy Return** | Hospital Management System → Pharmacies |
| **Blood Bank Invoice**, **Blood Bank Return** | Hospital Management System → Blood Banks |
| **Medical Supplies Invoice**, **Services Invoice**, **Service And Supply Invoice**, **Supply Return** | Hospital Management System → Medical Services |
| **Surgery Package Invoice** | Hospital Management System → Surgery Package Deal |
| **Closing Patient Invoice** | Hospital Management System → Closing Invoice |

Their own buttons: the **Check Invoice** has **Create Patient Admission**, which opens a new admission
for the patient being examined; the **Closing Patient Invoice** has **Collect Invoices** (below). Every
priced invoice except the returns, the surgery package invoice and the closing invoice also has three
actions in its **More** menu — see [Freezing a price](#Freezing-a-price).

## The common pattern across all invoices

Service invoices share one skeleton:

1. **Document header** — document code, term, issue and value dates, fiscal period, and dimensions.
2. **Patient context** — patient, **patient admission** (linking the charge to the admission), insurance company and class, patient/company endurance percentages, often the doctor, specialty and document category, the **Subsidiary**, **Subsidiary 1** and **Subsidiary 2** fields, the five price classifiers, and up to six attachments.
3. **Service lines** — each with a rich price block that computes: price, discount 1/2, **patient/insurer split** (a percent and value each), the **insurance max value from the approval and from the admission**, taxes split between patient and insurer, **total patient due** and **total insurance due**, and the cost percentage/value with up to three subsidiary shares. Lines also carry their own **analysis set, branch, sector and department**.
4. **Totals** — mirroring the above at document level: **Prices Total** on the main tab, and on invoices with supplies and services tabs, a **Supplies Total** and a **Services Total** on those tabs.
5. **Overhead lines** — on most invoices, with the **Total Overhead Actual Value** and **Total Overhead Estimated Value** beside them (see [Indirect (overhead) costing](./hms-pricing.md)).

Which price columns you see — the costs, each discount, each tax — is decided by the module settings,
not by the invoice; see [Hospital Management System Settings](./hms-configuration.md).

::: tip Split billing is the core idea
Every line is automatically divided into a **patient share** and an **insurance share** (using the endurance percentages from the [insurance approval](./hms-insurance.md) and the admission), each taxed separately and recorded on a distinct account named on the invoice's **document term**. That term is what maps the value types (patient value, insurance value, discounts, taxes, cost, subsidiary cost) to ledger accounts — pair by pair, and only where both sides are filled. See [Invoice Document Terms](./document-terms/hms-terms-invoices.md).
:::

## Starting an invoice from the admission

Most inpatient invoices begin by picking the **Patient Admission**, and the admission does much of the
typing for you. Picking it fills the patient, the doctor, the insurance company, the patient and company
endurance percents and the five price classifiers, and on invoices that show the patient's room, the
building, section, floor, room and bed the patient currently occupies.

The admission picker is filtered. It lists only admissions that have no **Accommodation Exit Doc** yet,
so a discharged patient cannot be billed through a new invoice by mistake; on the **Accommodation
Invoice** and **Supervision Invoice** it also lists only admissions that have **Generate Accommodation
Doc** ticked. The surgery invoice adds its own filter when the surgery term allows one invoice per
admission — see [The Surgery Lifecycle](./hms-surgery-lifecycle.md).

Three more things happen on their own:

- **The admission's planned services become lines.** On the **Laboratory Test Invoice**, **Radiology
  Invoice**, **Physical Therapy Invoice** and **Surgery Invoice**, picking the admission adds one line
  for every row of the admission's **Services** grid whose **Procedure Type** is this invoice — the
  tests, scans, sessions or operations booked at admission are already on the invoice, ready to price.
- **The two endurance percents complete each other.** Type *30* in **Patient Endurance Percent** and
  **Company Endurance Percent** becomes *70*, and the other way round.
- **The header specialty reaches the lines.** When the header carries a **Medical Specialty**, every
  main line takes it on save.

On save the invoice checks that the patient is the admission's patient, and an invoice with a
**Company Endurance Percent** above zero must name its **Medical Insurance Company**. The
**Accommodation Invoice** and **Supervision Invoice** cannot be saved without an admission at all.

## How a line is priced and split

Where a line's price, endurance percents, discounts and cost come from — the insurance approval, the
sales price list, the cost list and the discount list — is explained on
[Pricing, Costing & Discounts](./hms-pricing.md) and [Medical Insurance & Approvals](./hms-insurance.md).
What the invoice does with them is always the same arithmetic. Take a lab test priced at 1,000 for a
patient whose insurer covers 80%:

| Step | Column | Value |
|---|---|---|
| The price | **Price** | 1,000 |
| Discount 1 is a percent of the price | **Discount 1** 10% | 100 |
| Discount 2 is a percent of what is left after Discount 1 | **Discount 2** 5% | 45 |
| | **Price Before Tax** | 855 |
| The insurer's share of the price before tax | **Insurance Value** 80% | 684 |
| The patient pays the rest | **Patient Value** 20% | 171 |
| Tax is charged on the price before tax | **Tax 1** 15% | 128.25 |
| … and split by the same endurance percents | **Insurance Tax1 Value** / **Patient Tax1 Value** | 102.60 / 25.65 |
| | **Total Insurance Due Amount** | 786.60 |
| | **Total Patient Due Amount** | 196.65 |
| | **Price After Tax** | 983.25 |

A line with no endurance percents at all is billed 100% to the patient. When the header's **Patient
Endurance Percent** or **Company Endurance Percent** is filled, it is copied onto every line on save,
replacing what the line had. Patient and company percents on each main line must add up to 100.

Two ceilings can cut the insurer's share, and whatever is cut moves to the patient:

- **Insurance Max Value From Approval** — the most the insurance approval lets the insurer pay for this
  service. If it says 600 in the example above, the insurer's value becomes 600 and the patient's 255.
- **Insurance Max Value From Admission** — the line's part of the admission-wide ceiling, below.

Three switches outside the invoice change the taxes. **Not Taxable Tax 1** / **Not Taxable Tax 2** on the
invoice's **Medical Document Category** removes that tax from every line. **Do Not Endure From Tax1** /
**Do Not Endure From Tax2** on the **Medical Insurance Company** keeps the insurer out of that tax, so the
patient pays all of it. And unless the term's **Editable Taxes** is ticked, the tax percents of the main
lines are looked up again on every save, from the tax plan of the line's service or type, or else the
term's **Tax Plan** — provided the term's **Taxable** is ticked; without it those lines carry no tax.

The **Cost Value** is the line's cost (a percent of the price, or on surgery lines the sum of the fee
components' costs), and the **Subsidiary Cost**, **Subsidiary 1 Cost** and **Subsidiary 2 Cost** columns
are revenue shares from the cost list. None of them changes what the patient or the insurer pays; they
exist for the ledger — see [Doctor fees and other revenue shares](#Doctor-fees-and-other-revenue-shares).

A supplies line ticked **Free Item** is still issued from stock, but its price block is cleared on save,
so it adds nothing to the bill. And when the term has **Do Not Add Supplies To Invoice** or **Do Not Add
Services To Invoice** ticked, that grid is left out of the **Prices Total** and out of the entry.

### The admission-wide insurance ceiling

An insurer often agrees to cover a stay up to a fixed amount, whatever services it includes. That amount
goes on the admission, in **Insurance Endurance Max Value On All Invoices** (see
[Patients & Admission](./hms-patients.md)). From then on, every invoice saved against the admission
reports its total insurance due, and the admission's **Remaining Of Insurance Endurance Max Value** shows
what is still available.

Say the ceiling is 10,000 and the invoices already saved bring the insurer to 9,200. A new radiology
invoice whose insurer share would be 1,500 is cut down on save: only 800 is left, so the insurer's share is
reduced to fit, spread over the invoice's lines in proportion to their insurer values, and the patient's
share on each line grows by the same amount. Each line's **Insurance Max Value From Admission** shows its
reduced share, and the admission's remaining value drops to zero. Cancelling one of the earlier invoices
gives its amount back to the remaining value. Leave the ceiling at zero and no ceiling applies.

## Service invoices

These follow the service pattern (price + supervision + addition-time cost for surgeries):

- **Accommodation Invoice** — the room/bed accommodation fee, usually auto-generated from the accommodation document.
- **Attendant Invoice** — accommodation for the patient's companion.
- **Lab Test Invoice** — lab tests, with optional supplies and services.
- **Radiology Invoice** — imaging and its supplies.
- **Physical Therapy Invoice** — physiotherapy sessions.
- **Supervision Invoice** — the doctor's supervision of the patient.
- **Services Invoice** — general medical services.
- **Check Invoice** — the outpatient consultation, uniquely carrying a **Medicines** grid for drugs prescribed at the visit.

Two of them are priced as a single amount in a **Price Info** group rather than line by line. The
**Check Invoice** is priced from its doctor, **Medical Specialty**, procedure type and the patient's
insurance, and is re-priced whenever one of them changes; **Check Date** and **Check Time** default to
the moment the invoice is opened. Its **Medicines** grid (item, dosage, remarks) is the prescription: it
is neither priced nor issued from stock. **Create Patient Admission** opens a new admission carrying the
check invoice's patient, doctor, birth date, insurance company and remarks, with the check invoice as
its source document. The **Attendant Invoice** is priced for the room and the **Attendants Count**
(taken as 1 when left empty).

The lab, radiology and physical therapy invoices add a **Medical Supplies** tab and a **Medical
Services** tab next to their main lines; the services invoice adds the **Medical Supplies** tab. The
supplies tab names the **Warehouse** and shows the
**Generated Issue Document**: the stock issue (or stock issue request) the term creates from the supplies
grid, kept in step with the invoice on every save. How the supplies get there is on
[Pharmacy, Supplies & Blood Bank](./hms-pharmacy-and-supplies.md).

The richest of these is the **Surgery Invoice**: three tabs (surgery, supplies, services), with anesthesia and assistant doctors, price classifiers, accommodation info and attachments in the header; the surgery line breaks the fee into its components (open surgery, surgeon, assistant, anesthesia, other) with standard and additional hours. The supplies tab is a full inventory line that produces a stock issue.

![Surgery invoice](../../ar/modules/hms/images/invoicing/surgery-invoice-en.png)

![Lab test invoice](../../ar/modules/hms/images/invoicing/lab-test-invoice-en.png)

![Accommodation invoice](../../ar/modules/hms/images/invoicing/accommodation-invoice-en.png)

![Check invoice](../../ar/modules/hms/images/invoicing/patient-check-invoice-en.png)

## Inventory invoices and returns

These invoices **move stock** and add **Service Fees** accounts; their line is a full inventory line (item, unit, lot, batch, expiry, warehouse):

- **Pharmacy Invoice** and **Pharmacy Return** — dispensing drugs and returning them.
- **Supplies Invoice** and **Supply Return** — issuing supplies and returning them.
- **Service And Supply Invoice** — services and supplies on one document.
- **Blood Bank Invoice** — issuing blood units and related services (moves blood stock).

![Pharmacy invoice](../../ar/modules/hms/images/invoicing/pharmacy-invoice-en.png)

## What an invoice records in the ledger

Saving an invoice creates its accounting entry as a business request processed in the background.
Every line is recorded value by value, and each value goes where the invoice's document term sends it:

| Value on the line | Term pair | A usual set-up |
|---|---|---|
| The patient's share | **Patient Value** | Debit the patient, credit the revenue of the test type, service or pharmacy. |
| The insurer's share | **Insurance Value** | Debit the insurance company, credit the same revenue. |
| Discount 1 and Discount 2 | **Discount1**, **Discount2** | Debit a discounts-allowed account, credit revenue, when revenue should show the gross price. |
| Each tax, split | **Tax1 Patient**, **Tax2 Patient**, **Tax1 Insurance**, **Tax2 Insurance** | Debit the patient or the insurer, credit output tax. |
| The cost | **Debit Cost** / **Credit Cost** | Debit the cost of the service, credit what is owed for it. |
| The revenue shares | **Subsidiary**, **Subsidiary 1**, **Subsidiary 2** | Debit an expense, credit the doctor (below). |
| The surgery fee components | **Price Components Costs** | One pair per component, on the surgery term. |

So one invoice raises **two receivables** — the patient's and the insurer's — each with its own taxes.
The overhead grid is recorded through each **Overhead Item**'s own sides, not the term. A pair records
only when both its sides are filled; the sides, their sources and every option are on
[Invoice Document Terms](./document-terms/hms-terms-invoices.md).

Each line's own **analysis set**, **branch**, **sector** and **department** go on that line's ledger
lines, so a single invoice can split its revenue across departments; a line that leaves them empty takes
the header's. The legal entity is always the header's.

### Doctor fees and other revenue shares

A doctor paid a share of what he bills — or an outside lab paid per test — is handled through the
subsidiary shares. The [medical cost list](./hms-pricing.md) gives each service up to three
**Subsidiary Cost** splits (percent and value); they land on the invoice line with the price, and the
term's **Subsidiary** pairs record them, typically crediting the account of the invoice's **Doctor**.
The patient's bill is not affected.

The other route moves the whole charge. When the invoice's **Medical Document Category** has **Use Doctor
Instead Of Patient In Accounting Effects** ticked, every side that would go to the patient goes to the
doctor instead — for arrangements where the doctor, not the patient, owes the hospital.

## Paying an invoice

A hospital invoice has no payment grid and takes no cash itself: it records what the patient and the
insurer owe. The money is collected afterwards with an ordinary
[receipt](/modules/accounting/money-in-and-out/receipts-and-payments) against the account the invoice
debited — the patient's for his share, the insurer's for the claim.

## Correcting and cancelling an invoice

A saved invoice can be edited and saved again: its entry, its generated stock issue and its share of the
admission's insurance ceiling are all rebuilt from the new lines. Cancelling or deleting it (see
[the life of a document](/platform/documents-and-records/document-lifecycle)) undoes all three — the entry
is removed, the generated stock issue is deleted, and its insurer amount returns to the admission's
remaining value.

Only the pharmacy, supplies and blood bank invoices have return documents, because they move stock.
A service charged by mistake is removed from its invoice, or the invoice is cancelled.

## Sending invoices to the tax authority

The hospital invoices can be sent to the tax authority like any other taxed document, once their book or
term is set up for it (see [Electronic Invoicing in Nama ERP](/modules/invoicing/e-invoices-guide)). By
default the patient is the invoice's receiver. Each line is reported under the tax-authority item of its own test type,
radiology type, therapy type, service or drug; the check, attendant, supervision and accommodation
invoices use the **Tax Authority Item** on their term instead — see
[Invoice Document Terms](./document-terms/hms-terms-invoices.md).

## The surgery package invoice

**Surgery Package Invoice** bills an operation against an **agreed package price** instead of itemized billing. It shows the **agreed price total**, the **actual** total and the **difference**, and per item: the agreed price, the actual price, and the difference and revenue difference. Accounting-wise, it records the gap between the package price and the actual cost of services via dedicated difference accounts. The full story is on [The Surgery Lifecycle](./hms-surgery-lifecycle.md).

![Surgery package invoice](../../ar/modules/hms/images/invoicing/surgery-package-invoice-en.png)

## The closing invoice

**Closing Invoice** is the discharge settlement document. When a patient leaves, this single invoice gathers **every individual invoice issued during the stay** into one statement, then applies admission-level taxes, fees and discounts to reach the final amount owed by the patient/insurer.

Start by picking the **Patient Admission**. The picker lists only admissions that have no closing
invoice yet (and only the patient's, if you picked the patient first); picking it fills the patient and
the admission's **In Date** and time. The header also carries the **Currency** and **Currency Rate**.

Its heart is the **Collect Invoices** button. It looks up every hospital invoice and return linked to the
admission — check, accommodation, attendant, supervision, lab, radiology, physical therapy, services,
surgery, pharmacy, supplies, service-and-supply and blood bank invoices, and the three returns — and
fills the **Invoices** grid with one row each: the invoice, its date and its value. Returns come in with a
negative value, so they reduce the total. The **Surgery Package Invoice** is not collected. Pressing the
button again rebuilds the grid from scratch, so press it last, after every invoice of the stay is saved;
rows can also be added by hand.

**Total** is the sum of the grid. Beside it sit **Tax 1** and **Tax 2**, **Fees 1** and **Fees 2**, and
**Discount 1** and **Discount 2**, each as a percent and a value of that total: type either one and the
other follows. On save, a tax keeps its percent (the value is worked out again from the total), while fees
and discounts keep their value (the percent is worked out again).

It does **not** record the collected invoices again — each of them has already created its own entry.
What the closing invoice records is only those admission-level taxes, fees and discounts, through the
sides on its term, with the **Patient** available as the account source (see
[Stay and Operations Document Terms](./document-terms/hms-terms-stay-and-operations.md)).

Saving it links the admission to it — the admission's **Closing Invoice** field — and a second closing
invoice for the same admission is refused. Cancelling it clears that link, so a new one can be written.
Nothing stops you from issuing further invoices on the admission after its closing invoice; press
*Collect Invoices* again and save to bring them in.

![Closing invoice](../../ar/modules/hms/images/invoicing/closing-invoice-en.png)

## Freezing a price

When the invoice's term has **Update Prices With Save** ticked, every save looks each line's price up
again from the insurance approval and the price lists, so a price typed at the desk is overwritten the
next time anyone saves. Three switches on the invoice stop that, one per grid:

- **Allow Changing Main Prices** — the main service, drug or supply lines keep their prices;
- **Allow Changing Services Prices** — the services grid keeps its prices;
- **Allow Changing Supplies Prices** — the supplies grid keeps its prices.

On a saved invoice they are switched on from the **More** menu, using the actions of the same names;
the invoice reopens with the switch ticked. Without *Update Prices With Save* on the term, prices are
only looked up when a line is entered and the switches make no difference. See
[Invoice Document Terms](./document-terms/hms-terms-invoices.md).

## Messages you may see

Several of these only appear when the invoice's term config asks for them: the empty-grid rules are switched on by *Prevent Save Without Services* and *Prevent Save Without Supplies*, and the two surgery-per-admission rules by their own options on the surgery term.

| Message | Why | What to do |
|---|---|---|
| *Main lines can not be empty* — «لا يمكنك ترك تفاصيل الرئيسية فارغة» | The invoice's main service grid has no rows. Every invoice except the Check Invoice and the Attendant Invoice requires at least one; on a pharmacy invoice or return it is the term option *Prevent Save Without Supplies* that raises it. | Add the service, drug or supply line that is being billed. |
| *Services lines can not be empty* — «لا يمكنك ترك تفاصيل الخدمات فارغة» | The invoice's term config has *Prevent Save Without Services* ticked and the Services grid is empty. | Add a services row, or untick that option on the term config if services are genuinely optional here. |
| *Supplies lines can not be empty* — «لا يمكنك ترك تفاصيل المستلزمات فارغة» | The invoice's term config has *Prevent Save Without Supplies* ticked and the Supplies grid is empty. | Add a supplies row, or untick the option on the term config. |
| *Patient {0} does not match patient {1} in admission {2}* — «المريض {0} لا يطابق المريض {1} الموجود في استمارة الدخول {2}» | The invoice's patient is not the patient of the admission it names. | Pick the admission again (it fills the right patient), or correct the patient. |
| *Total of patient endurance percent and company endurance percent must equal 100* — «مجموع حقلي نسبة تحمل المريض ونسبة تحمل الشركة يجب أن يساوي 100» | A line's patient and company percents — or, on the check and attendant invoices, the header's — add up to something other than 100. | Correct one of the two percents; typing one in the header fills the other. |
| *Unit price can not be negative* — «سعر الوحدة لا يمكن أن يكون سالب» | A line's unit price is below zero. | Enter the price as a positive amount; a refund belongs on a return or a cancellation. |
| *Overhead item {0} is repeated in line {1}* — «بند التكلفة الغير مباشرة {0} مكرر في السطر {1}» | The same overhead item appears twice in the overhead grid. | Remove the duplicate row. |
| *The current discount value {0} is greater than the max discount value {1} of current employee* — «قيمة الخصم الحالي {0} أكبر من أقصى قيمة خصم {1} للموظف الحالي» | A discount value exceeds the maximum the employee behind the logged-in user is allowed to give. On a line discount the two numbers are not filled in and the message shows `{0}` and `{1}` literally; on the surgery package invoice's header discount they are. | Reduce the discount, or have the invoice entered by someone whose employee record allows it. The limits are the Max Discount fields on the employee file. |
| *The current discount percentage {0} is greater than the max discount percentage {1} of current employee* — «نسبة الخصم الحالية {0} أكبر من أقصى نسبة خصم {1} للموظف الحالي» | As above, for a discount percentage rather than a value. | As above. |
| *Surgery type {0} is repeated* — «نوع عملية {0} مكرر» | Two surgery lines on a Surgery Invoice name the same surgery type, and the term config does not allow repeating it. | Merge the lines, or tick *Allow Repeating Surgery Type In Invoice Line* on the surgery term config if two operations of the same type really were performed. |
| *Surgery type {0} was not found in the surgery lines* — «نوع العملية {0} غير موجود في سطور العمليات الجراحية» | A supplies or services row on a Surgery Invoice is attributed to a surgery type that has no line in the surgery grid. | Correct the surgery type on the row, or add the missing surgery line — every supply and service must hang off an operation being billed. |
| *From Date can not be after To Date* — «من تاريخ يجب أن يكون قبل إلى تاريخ» | On a Surgery Invoice line, the surgery-hours from date and hour fall after the to date and hour. | Correct the surgery hours; the check compares date *and* hour, so an operation crossing midnight needs the later date on the To side. |
| *There is an invoice {0} on the admission {1}, you can not create more than one invoice on the same admission* — «لا يمكنك إنشاء أكثر من فاتورة على استمارة دخول المريض {1}، حيث يوجد فاتورة {0} على نفس استمارة دخول المريض» | The surgery term config has *Do Not Create More Than Invoice On The Same Admission* ticked and a committed Surgery Invoice already exists for this admission. | Add the lines to the existing invoice, or cancel it first. |
| *There is an invoice {0} on the admission {1} and surgery type {2}, you can not use the same surgery type more than once* — «يوجد فاتورة {0} للاستمارة {1} لنوع العملية {2} - لا يمكنك إنشاء أكثر من فاتورة لنفس نوع العملية الجراحية» | The surgery term config forbids the same surgery type twice on one admission, and a committed invoice on this admission already bills that type. | Bill the operation on the existing invoice, or relax the option on the term config. |
| *Surgery request used in another surgery invoice* — «طلب العملية الجراحية مستخدم بالفعل في فاتورة عملية جراحية أخرى» | The From Document is a surgery request that is already linked to a different Surgery Invoice. | Open the request to find the invoice it belongs to; one request bills once. |
| *The patient Admission {0} does not have a surgery package* — «استمارة الدخول {0} ليس بها اتفاق عملية» | A Surgery Package Invoice names an admission that carries no agreed surgery package, so there is no package price to bill against. | Put the package on the admission, or bill the operation with an ordinary Surgery Invoice. |
| *Patient Admission Is Required* — «يجب إدخال استمارة الدخول» | **Collect Invoices** was pressed on a closing invoice with no admission picked. | Pick the patient admission first, then press the button. |
| *You can not create closing document for the admission document {0} because that document already has an closing document {1}* — «لا يمكن عمل فاتورة ختامية لهذا السند {0} حيث أنه له فاتورة ختامية بالفعل {1}» | The admission already has a Closing Invoice — the message names it. One discharge settlement per admission. | Open the existing closing invoice and press *Collect Invoices* again to pick up anything added since, or cancel it before writing a new one. |
