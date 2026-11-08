---
description: "One operation through the HMS surgery screens: Surgery Request, Surgery Reservation, Surgery Approval, Surgery Invoice and the surgery package deal and its settlement invoice."
entities: [HMSSurgeryReq, HMSSurgeryReservation, HMSSurgeryApproval, HMSSurgeryInvoice, HMSSurgeryPackage, HMSSurgeryPackageInvoice]
menu: Hospital Management System → Surgeries → Surgery Request
---

# The Surgery Lifecycle

An operation touches more screens than any other service in the hospital. The surgeon asks for it, the
theatre is booked, the patient signs a consent, the operation is billed with its supplies and services —
and, when the hospital has sold the patient an all-in package, the whole stay is later settled against the
agreed price. This page follows one operation through all of those screens, in the order a hospital meets
them.

The screens are spread over three menu groups, which is the first thing to know when you look for them:

| Screen | Where it lives in the menu |
|---|---|
| Surgery Request | Hospital Management System → Surgeries |
| Surgery Invoice | Hospital Management System → Surgeries |
| Surgery Approval | Hospital Management System → Documents |
| Surgery Reservation | Hospital Management System → Surgery Package Deal |
| Surgery Package Deal | Hospital Management System → Surgery Package Deal |
| Surgery Package Invoice | Hospital Management System → Surgery Package Deal |

None of the documents creates the next one automatically. Each is entered on its own, and they are tied
together by the patient, the admission and — between the request and the invoice — the **From Document**
field.

## 1. The surgery request

A **Surgery Request** is the surgeon's order: which patient, which admission, which **Surgery Type**, the
**Surgery Classification**, and a **Surgery Status** — *Initial*, *In Progress* or *Done*, set by hand as the
case moves on. The **Patient** and the **Surgery Type** are required. It also carries the insurance context
the invoice will need — **Medical Insurance Company**, **Insurance Class**, **Company Endurance Percent** and
**Patient Endurance Percent**, the price classifiers — plus the patient's **Accommodation Info** (building,
section, floor, room, bed), an attachment and a **Price Info** block.

Unlike the invoices, the request fills nothing in for you: picking the patient or the admission leaves the
other fields as they are, and the **Price Info** block is typed by hand for reference. The invoice prices
the operation afresh from the price sources.

The request creates no accounting effect and has no buttons of its own. Its read-only **Surgery Invoice** field stays empty
until an invoice is saved from it, and is what tells you the request has been billed.

![Surgery request](../../ar/modules/hms/images/clinical/surgery-req-en.png)

## 2. Booking the theatre: the surgery reservation

A **Surgery Reservation** books an operating room for a date and time: **Doctor**, **Medical Specialty**,
**Medical Document Category**, **Patient**, **Surgery Type**, **Room**, **Reservation Date** and
**Reservation Time**. It is not linked to the request or to the admission; it is the scheduling record.

Rooms need time between operations for cleaning and preparation. Each room carries a **Difference In Time
Between Reservations Of The Same Room**, and when the reservation's document term has **Consider Difference In Times
Between Reservations Of The Same Room** ticked, saving checks every other saved reservation of the same room.
If one starts within that gap either side of yours — a 60-minute gap and an existing booking at 10:00 blocks
anything from 09:00 to 11:00, both ends included — the reservation is refused and the message names each
conflicting booking. With the option ticked, the room's gap field becomes mandatory too, so the room file
must have it filled in.

The check is about the room only. Nothing stops the same surgeon or the same patient from being booked in
two rooms at the same time, and a reservation without a room is not checked at all.

![Surgery reservation](../../ar/modules/hms/images/clinical/surgery-reservation-en.png)

## 3. The consent: the surgery approval

A **Surgery Approval** records that the patient (or guardian) agreed to the operation: **Patient Admission**,
**Patient**, **Doctor**, **Surgery Type**, **Medical Document Category** and up to five attachments for the
signed forms. Picking the admission fills the patient and the doctor from it. It has no buttons, creates no
accounting effect, and no other document checks for it — the surgery invoice can be saved without one. It is
the hospital's record, kept against the admission.

![Surgery approval](../../ar/modules/hms/images/clinical/surgery-approval-en.png)

## 4. Billing the operation: the surgery invoice

The **Surgery Invoice** is where the money is. It has three tabs — **Main** (the operations themselves),
**Medical Supplies** and **Medical Services** — and every priced line is split between patient and insurer
as on any other hospital invoice (see [Invoicing & Billing](./hms-invoicing)). The insurer's share is also
held within the maximum that the [insurance approval](./hms-insurance.md) and the admission allow.

### Starting from the request

Pick the request in **From Document** and the invoice fills itself in: patient, doctor, admission, insurance
company and class, endurance percentages, price classifiers, accommodation info and the remarks are copied,
and one operation line is added for the request's surgery type, classification and status, priced afresh from
the price sources, together with the surgery type's default supplies and services and its overhead items.
The From Document lookup only offers requests that are not yet billed (or are billed on
this same invoice), so one request bills once; saving the invoice writes the invoice back into the request's
**Surgery Invoice** field, and cancelling or deleting it clears that field again.

### Starting from the admission

You can also leave From Document empty and start from the **Patient Admission**. Its lookup offers the
patient's admissions that have no exit yet; when the term has *Do Not Create More Than One Invoice On The
Same Admission* ticked, it also hides admissions that already have a surgery invoice. Picking one copies the
patient, doctor, insurance company, endurance percentages, price classifiers, document category and the
patient's current bed.

If the admission lists planned procedures in its **Services** grid, every row whose **Procedure Type** is
*Surgery Invoice* becomes an operation line carrying that row's surgery type. Those lines arrive with the
type only: when the term has **Update Prices With Save** ticked they are priced on save, otherwise choose the
surgery type again on each line so that it is priced and brings its supplies and services.

Typing one of the header endurance percentages fills the other with the rest of 100 — 30 in **Patient
Endurance Percent** puts 70 in **Company Endurance Percent**. Changing the **Medical Insurance Company**
prices every operation line again for the new insurer.

### The operation lines and their hours

Choosing a **Surgery Type** on a line does a lot at once:

- fills the **Surgery Classification** from the surgery type;
- prices the line, including its **Standard Surgery Price**, **Standard Hours Number** and **Additional Hour
  Price**, and the split into the fee components **Open Surgery**, **Surgeon Fees**, **Surgeon Assistant**,
  **Anesthesia Fees** and **other**, each with its cost percentage and value;
- loads the surgery type's default supplies onto the **Medical Supplies** tab and its default services onto
  the **Medical Services** tab, each priced, with the supplies' **Planned Quantity** and **Free Item** taken
  from the surgery type;
- recalculates the overhead items.

A line can carry its own price classifiers; filled in, they replace the header's for that line and the line
is priced again. The header's **Medical Specialty**, when filled, is copied onto every operation line on save.

**The fee components make up the price.** Whenever any of the five components has a value, saving sets the
line's **Standard Surgery Price** to their total. Typing a component's cost percentage fills its cost value
(and the other way round), and the line's **Cost Value** is the total of the five component costs. Editing a
component normally prices the line again from the price sources, which puts the price list's components
back; to bill a component of your own — a surgeon who charges more for this patient, say — tick **Allow
Changing Main Prices** first (from the **More** menu, below) and then type it.

Operations often run longer than planned, and the line's **From** and **To** date and hour handle that. On
save, the system measures the real duration, subtracts the standard hours and writes the rest into **Number
Of Additional Hours**. The line price is then the standard price plus additional hours × additional hour
price. A surgery with 2 standard hours at 5,000 and 800 per extra hour that runs from 10:00 to 13:30 is
billed 5,000 + 1.5 × 800 = 6,200. When only one of the two dates is filled it is used for both, and with no
date at all the invoice's value date is used. A surgery type without standard hours never produces
additional hours, and an operation shorter than planned is not reduced below the standard price.

The cost of that extra time is tracked per fee component: the **Calc Addition Time For …** ticks (for open
surgery, surgeon, surgeon assistant, anesthesia, other and subsidiary) decide which components carry an
addition-time cost value — the number of additional hours times the hourly addition-time cost the price
sources give for that component. Untick one and its addition-time cost is set to zero.

Each operation line takes its taxes from the surgery type's tax plan (or the term's, when the type has
none) on every save, unless the term has **Editable Taxes** ticked; its tax-authority item for electronic
invoicing also comes from the surgery type.

![The operation lines of a surgery invoice with their hours](../../ar/modules/hms/images/invoicing/hms-surgery-invoice-operations-en.png)

### The supplies and services that come with an operation

Every supply and service line belongs to one of the operations on the invoice (its **Surgery Type** column,
whose lookup offers only the surgery types on the operation lines); if it is left empty, the first
operation's type is filled in on save.

- **Planned Quantity** is set again on every save from the surgery type's supplies list — zero for an item the
  surgery type does not list — so it can be compared with the quantity actually used.
- Clearing the surgery type on an operation line removes the supplies and services that line brought.
  Choosing a different type adds the new type's defaults next to the old ones; delete the old rows by hand.
- Deleting an operation line deletes its supplies and services too. With *Allow Repeating Surgery Type In
  Invoice Line* on the term, only the rows that line brought go; without it, every supply and service row of
  that surgery type goes. **Do Not Remove Supplies And Services With Surgery Type** on the header keeps them.

The **Warehouse** and **Generated Issue Document** on the Medical Supplies tab are the warehouse the supplies
are issued from and the stock issue (or stock issue request) created for them, as set by the term's **Origin
Issue Document Type** — see [Pharmacy, Supplies & Blood Bank](./hms-pharmacy-and-supplies.md).

### Other header options

- **Multiple Surgery In Same Time** — when several operations are done in one session, the most expensive
  line keeps its price and every other line gets the **Other Surgery Discount Value** percentage as a
  discount, placed in Discount 1 or Discount 2 according to **Other Surgery Discount In**. In Discount 2 the
  percentage is taken of the price after Discount 1. Their cost and subsidiary values are reduced by the same
  percentage. Two lines sharing the highest price both keep it.
- **Anesthesia Doctor** and **Assistant Doctor** — recorded alongside the surgeon.
- **Do Not Remove Supplies And Services With Surgery Type** — see above.

### Freezing prices: the More-menu actions

The invoice's term can have **Update Prices With Save** ticked. Then every save prices the lines again from
the price sources, which keeps the invoice in step with price lists and approvals but overwrites any price
typed by hand. The **More** menu of a saved invoice has three actions that turn re-pricing off for one part
of this invoice:

| Action | What stays as entered |
|---|---|
| **Allow Changing Main Prices** | The operation lines |
| **Allow Changing Services Prices** | The Medical Services lines |
| **Allow Changing Supplies Prices** | The Medical Supplies lines |

Each action ticks the header check box of the same name, and the screen reloads. From then on, prices
you type on that part survive saving.

### The term options that govern surgery invoices

Three term options exist mainly for surgery:

- **Allow Repeating Surgery Type In Invoice Line** — lets one invoice carry the same surgery type on two
  lines. Without it, the second line is refused.
- **Do Not Create More Than One Invoice On The Same Admission** — one surgery invoice per admission.
- **Do Not Create More Than One Invoice for The Same Surgery Type On The Same Admission** — a surgery type
  can be billed only once per admission, across invoices.

The general options of the service invoices apply too: **Prevent Save Without Services** and **Prevent Save
Without Supplies** refuse an invoice whose Medical Services or Medical Supplies tab is empty, and **Do Not Add
Supplies To Invoice** / **Do Not Add Services To Invoice** keep a tab out of the bill while its supplies are
still issued from stock.

The term also maps the accounting: besides the usual patient, insurance, discount, tax and cost sides, a
surgery term has a side pair per fee component and per addition-time cost (**Price Components Costs**) —
see [Invoice Document Terms](./document-terms/hms-terms-invoices.md).

![Surgery invoice](../../ar/modules/hms/images/invoicing/surgery-invoice-en.png)

## 5. The package path

Some patients buy the operation as a package: one agreed price for the operation and, often, the stay around
it. That path adds two screens.

### The package deal and the admission

A **Surgery Package Deal** names a **Doctor** and a **Surgery Type**, a **Non Agreed Items** package item for
anything billed outside the deal, and a details grid of package items, each with a room classification, a
count and a **Price** — the agreed price for that part of the stay. Picking a package item fills the room
classification from it. See [Medical Service Catalog](./hms-service-catalog#Surgery-packages) for package
items.

![Surgery package](../../ar/modules/hms/images/catalog/surgery-package-en.png)

The package is attached to the patient through the **Patient Admission**: its **Surgery Package** field, and
the admission's **Surgery Package Deal** tab, which lists the package items and their agreed prices when the
admission is saved. Every invoice of the stay is then billed normally — surgery invoice, accommodation,
pharmacy and so on.

### Settling the package: the surgery package invoice

At the end, the **Surgery Package Invoice** compares what was agreed with what was actually billed. Pick the
**Patient Admission** — the lookup offers admissions of the chosen patient that carry a package and have not
yet been closed by an accommodation exit; the term option **Show All Patient Admissions** removes that filter
— and the invoice fills the patient and the package, then builds one line per package item:

- **Agreed Price** — from the package.
- **Actual Price** — the total of the admission's saved invoices that the package item covers, matched by
  the item's flags (a surgery invoice is matched in three parts: its operations, its supplies and its
  services). Returns (pharmacy, supplies, blood bank) are subtracted and shown in **Return value**.
- **Total Required** — the larger of the two.
- **Difference** — how far the actual exceeded the agreed price.
- **Revenue Difference** — how much of the agreed price was not used.

Each invoice (or each part of a surgery invoice) is counted once, under the first package item in the deal's
grid whose flags cover it, so the order of the package lines matters when two items cover the same kind of
invoice. Invoices that no package item covers are gathered on a last line under the package's **Non Agreed Items**,
which has no agreed price, so its whole actual price is required. The header shows **Agreed Price Total**,
**Actual Price Total**, **Required Total** and **Difference Total**, and the **Discount** group (percent or value,
each filling the other) gives **Required Net After Discount**. The header discount is held within the
**Max Header Discount Value** and **Max Header Discount Percentage** of the employee behind the logged-in user
(see the messages on [Invoicing & Billing](./hms-invoicing.md)). The lines are rebuilt from the admission's
invoices on every save.

On save, the invoice records three amounts, each only when the term has both sides of its pair: the total
**Difference** (Difference Debit / Credit), the total **Revenue Difference** (Revenue Difference Debit /
Credit) and the header discount (Invoice Discount Debit / Credit). The individual invoices have already
recorded the patient's and insurer's receivables; this document records only the settlement against the
package.

The package invoice has no buttons of its own.

![Surgery package invoice](../../ar/modules/hms/images/invoicing/surgery-package-invoice-en.png)

![A surgery package invoice](../../ar/modules/hms/images/invoicing/hms-surgery-package-invoice-en.png)

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *There is a reservation doc {0} on the room {1}, reserved at {2} and the allowed time to make another reserve on this room is {3}* — «يوجد سند حجز {0} على الغرفة {1} تم الحجز في {2} والوقت المسموح به لعمل حجز آخر على نفس الغرفة هو {3}» | Another saved Surgery Reservation books the same room within the room's gap, and the reservation term has *Consider Difference In Times Between Reservations Of The Same Room* ticked. | Move the reservation outside the gap, book another room, or review the gap on the room file. |
| *Main lines can not be empty* — «لا يمكنك ترك تفاصيل الرئيسية فارغة» | The surgery invoice has no operation line. | Add the operation being billed. |
| *Services lines can not be empty* — «لا يمكنك ترك تفاصيل الخدمات فارغة» | The Medical Services tab is empty and the term has *Prevent Save Without Services* ticked. | Add the services, or choose a surgery type whose default services fill the tab. |
| *Supplies lines can not be empty* — «لا يمكنك ترك تفاصيل المستلزمات فارغة» | The Medical Supplies tab is empty and the term has *Prevent Save Without Supplies* ticked. | Add the supplies used in the operation. |
| *Surgery type {0} is repeated* — «نوع عملية {0} مكرر» | Two operation lines name the same surgery type and the term does not allow repeating it. | Merge the lines, or tick *Allow Repeating Surgery Type In Invoice Line* on the term if two such operations really were done. |
| *Surgery type {0} was not found in the surgery lines* — «نوع العملية {0} غير موجود في سطور العمليات الجراحية» | A supply or service line is attributed to a surgery type that has no operation line. | Correct the surgery type on the row, or add the missing operation line. |
| *From Date can not be after To Date* — «من تاريخ يجب أن يكون قبل إلى تاريخ» | On an operation line, the From date and hour fall after the To date and hour. | Correct the hours; an operation crossing midnight needs the later date on the To side. |
| *Total of patient endurance percent and company endurance percent must equal 100* — «مجموع حقلي نسبة تحمل المريض ونسبة تحمل الشركة يجب أن يساوي 100» | On an operation or service line, the patient and insurance percentages do not add up to 100. | Correct the two percentages on the line. |
| *Surgery request used in another surgery invoice* — «طلب العملية الجراحية مستخدم بالفعل في فاتورة عملية جراحية أخرى» | The From Document is a request already billed on a different surgery invoice. | Open the request; its Surgery Invoice field names the invoice that billed it. |
| *There is an invoice {0} on the admission {1}, you can not create more than one invoice on the same admission* — «لا يمكنك إنشاء أكثر من فاتورة على استمارة دخول المريض {1}، حيث يوجد فاتورة {0} على نفس استمارة دخول المريض» | The term allows one surgery invoice per admission and a saved one exists. | Add the lines to the existing invoice, or cancel it first. |
| *There is an invoice {0} on the admission {1} and surgery type {2}, you can not use the same surgery type more than once* — «يوجد فاتورة {0} للاستمارة {1} لنوع العملية {2} - لا يمكنك إنشاء أكثر من فاتورة لنفس نوع العملية الجراحية» | The term allows each surgery type once per admission and a saved invoice already bills this one. | Bill it on the existing invoice, or relax the option on the term. |
| *The patient Admission {0} does not have a surgery package* — «استمارة الدخول {0} ليس بها اتفاق عملية» | The package invoice names an admission without a surgery package. | Put the package on the admission, or bill with an ordinary surgery invoice. |
