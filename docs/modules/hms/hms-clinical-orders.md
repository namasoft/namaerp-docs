---
entities: [HMSLabTestRequest, HMSLabTestResult, HMSRadiologyReq, HMSRadiologyResult, HMSSurgeryReq, HMSSurgeryReservation, HMSSurgeryApproval, HMSBloodBank, HMSBloodBankReturn]
menu: Hospital Management System → Laboratory Tests → Lab Test Request
---
# Clinical Orders & Results

During a patient's stay (or an outpatient visit), the doctor orders investigations and procedures: lab tests, radiology, surgeries. The system follows a clear pattern — a **request** opened by the doctor, then a **result** entered by the labs or departments, with the two linked together so that one request carries one result.

Requests and results are clinical records. They carry a price for reference, but none of them records an accounting effect or bills the patient: the charge is made on the matching invoice (Lab Test Invoice, Radiology Invoice, Surgery Invoice), as described in [Billing the orders](#Billing-the-orders) below.

None of these screens has buttons of its own. The surgery documents are followed end to end on [The Surgery Lifecycle](./hms-surgery-lifecycle.md).

| Screen | Menu | Its own buttons |
|---|---|---|
| **Lab Test Request** | Hospital Management System → Laboratory Tests → Lab Test Request | None |
| **Laboratory Test Result** | Hospital Management System → Laboratory Tests → Laboratory Test Result | None |
| **Radiology Request** | Hospital Management System → Radiology → Radiology Request | None |
| **Radiology Result** | Hospital Management System → Radiology → Radiology Result | None |
| **Surgery Request** | Hospital Management System → Surgeries → Surgery Request | None |
| **Surgery Reservation** | Hospital Management System → Surgery Package Deal → Surgery Reservation | None |
| **Surgery Approval** | Hospital Management System → Documents → Surgery Approval | None |
| **Blood Bank Return** | Hospital Management System → Blood Banks → Blood Bank Return | None |

## Lab tests: request then result

### The lab test request

**Lab Test Request** is the doctor's order to run tests. Its header carries the **Patient** (required), **Doctor**, **Patient Admission**, **Admission Date** and **Admission Time**, **Birth date** and **Age** (years, months, days), **Medical Insurance Company**, **Patient Endurance Percent** and **Company Endurance Percent**, and the five price classifiers.

Most of that header fills itself:

- Picking the **Patient** brings in the patient's doctor, insurance company, birth date and endurance percentages, and works out the age from the birth date.
- Picking the **Patient Admission** brings in the admission's patient, doctor, insurance company, endurance percentages and price classifiers.

The **Lab Test Details** grid lists the tests ordered, one row each: **Laboratory Test Type**, **Device**, **Blood Quantity**, **Test Tube**, **Test Tube Color**, **Taken Time**, **HMS Test**, **Antibiotic**, **Test Result**, and the price, discount and net value.

The sample details rarely need typing. Each analyzer (the **Medical Device** file) lists the tests it runs with their sample requirements, so choosing the **Device** on a row fills the blood quantity, tube, tube colour, taken time, test and antibiotic from the analyzer's row for that test type (see [Medical Master Files](./hms-medical-master-files.md)). The price columns are typed by hand; the request does not look prices up — that happens on the invoice.

![Lab test request](../../ar/modules/hms/images/clinical/lab-test-request-en.png)

The request is linked to its result in two places:

- The read-only **Test Result** field in the header is filled when a Laboratory Test Result that names this request is saved, and cleared again when that result is cancelled or moved to another request.
- The **Test Result** column on each row lets the lab create the result straight from the row, through the field's quick-create window (see [Quick Create and Quick Edit](/platform/everyday-tools/quick-create-and-quick-edit)). The new result opens already filled with the patient, the admission, the patient's gender and age group, the admission's doctor, the row's test type, and one result line per test component with its normal range and the row's device. A result created this way does not fill its own **Lab Test Request** field, so the header link stays empty until someone picks the request on the result.

The patient admission has a **Lab Test** tab with the same grid, for tests ordered at admission; a result entered against the admission uses it the same way as a request.

### The laboratory test result

**Laboratory Test Result** records the measured values. Its header carries the **Patient Admission**, **Patient** (required), **Doctor**, **Laboratory Test Type** (required), **Lab Test Request**, **Gender** and **Adult Or Child**, the price, an attachment and the patient's accommodation info.

Its strength is the **Laboratory Test Type**. When you pick it, the result loads one line for every test component (**Test Case**) defined on the test type, each with its **Measuring Unit** and **Remark**, and fills **From Range** and **To Range** with the normal range that suits the patient: the male, female, male-child or female-child range of the [test type](./hms-service-catalog.md), chosen from the gender and the adult/child flag on the patient file. A patient file without them gets the adult male range. The test type's remarks are copied into the result's remarks, and the **Device** on each line is taken from the request (or admission) row for that test type. The technician then types only the **Test Case Result**.

A few rules keep the result tied to its definition:

- **Test Case** and **Measuring Unit** are locked on the result; they come only from the test type.
- For a qualitative test, the range fields offer *Positive+* and *Negative-* as suggestions.
- The ranges follow the patient file. Changing **Gender** or **Adult Or Child** on the result afterwards does not reload them; pick the test type again after correcting the patient file.

Picking the **Lab Test Request** copies its patient and doctor, and the patient's gender and age group; picking the **Patient Admission** copies the patient, doctor, gender, age group and the patient's current bed. The lookups narrow themselves: **Lab Test Request** offers only requests that have no result yet (or this result's own request), and **Laboratory Test Type** offers only the test types on that request — or, without a request, on the admission's **Lab Test** tab.

![Lab test result](../../ar/modules/hms/images/clinical/lab-test-result-en.png)

## Radiology: request then result

**Radiology Request** is the doctor's order for an imaging study: **Patient** (required), **Doctor**, **Radiology Type** (required), **Radiology Status** (*Initial*, *In Progress*, *Done* — set by hand), the price with its currency and rate, the patient's accommodation info, and an attachment plus five more attachment slots for referral letters or earlier images. The price is typed by hand and the request records no accounting effect. The read-only **Radiology Result** field shows the result once one is saved.

![Radiology request](../../ar/modules/hms/images/clinical/radiology-req-en.png)

**Radiology Result** is the radiologist's report. It is created from the request: pick the request in **From Document** and the result copies its patient, doctor, radiology type, radiology status, remarks and price. The lookup offers only requests that have no result yet (or this result's own request). The **Radiology Report** group holds three report texts (**Report Text 1** to **3**) and five attachments for the image and report files.

Saving the result writes it into the request's **Radiology Result** field; cancelling it, or pointing it at another request, clears that field again.

![Radiology result](../../ar/modules/hms/images/clinical/radiology-result-en.png)

## Billing the orders

Nothing is billed automatically from a request or a result. The charge is entered on the invoice of the same kind — see [Invoicing & Billing](./hms-invoicing.md) — where the line is priced from the price lists and the insurance approval and split between patient and insurer:

- Each line of a **Laboratory Test Invoice** has a **Test Result** column, and each line of a **Radiology Invoice** a **Radiology Result** column. Their lookups list the results of the invoice's patient, so every billed line can point at the result it bills. The test or radiology type is picked on the line as usual.
- When the patient admission lists planned procedures in its **Services** grid (a **Procedure Type** and the **Invoice Type** to bill), picking that admission on a Laboratory Test Invoice or a Radiology Invoice adds one line for each planned procedure of that invoice's kind.

The surgery side is the exception only in detail: a Surgery Invoice can start from the Surgery Request through its **From Document** field — see [The Surgery Lifecycle](./hms-surgery-lifecycle.md).

## Surgeries: request, reservation and approval

A surgery moves through three complementary documents:

- **Surgery Request** — requests the operation with its type, classification, status and insurance context, and links to the surgery invoice once one bills it. Its price block is typed by hand for reference; the invoice prices the operation afresh.

![Surgery request](../../ar/modules/hms/images/clinical/surgery-req-en.png)

- **Surgery Reservation** — books the operating room for a given slot (doctor, specialty, medical document category, patient, surgery type, room, reservation date and time). It is a scheduling record of its own, not linked to the request, and it can refuse a booking that comes too close to another one in the same room.

![Surgery reservation](../../ar/modules/hms/images/clinical/surgery-reservation-en.png)

- **Surgery Approval** — the signed consent/approval to proceed, with up to five attachments. Picking the admission fills the patient and doctor. No other document checks for it.

![Surgery approval](../../ar/modules/hms/images/clinical/surgery-approval-en.png)

## The blood bank

**Blood Bank** is a master file that acts as an accounting party (the source/destination of blood units). Issuing and billing blood is done via the **[Blood Bank Invoice](./hms-pharmacy-and-supplies.md)**. When blood units come back unused, this is recorded in a **Blood Bank Return**.

The return's header carries the **Patient** (required), **Doctor**, **Patient Admission**, **Medical Insurance Company** and **Insurance Class**, the **Blood Bank**, the **Medical Document Category**, the subsidiaries, the endurance percentages and the price classifiers, plus the warehouse and the accommodation info. Its grid is a full inventory line (item, quantity, lot, expiry, warehouse) with the price block split between patient and insurer. Created from a blood bank invoice through **From Document**, it takes over that invoice's admission, patient, doctor and endurance percentages.

Saving the return does three things:

- It receives the units back into stock through a **stock receipt**, under the *Generation Book* and *Generation Term* of the return's document term; the **Related Documents** tab lists it under **Stock Receipt**. The receipt follows later edits, and is deleted when the return is cancelled or its grid emptied.
- It records the patient, insurance, discount, tax and cost values through the sides on its term. The return does not reverse those sides for you: its term must hold each pair the other way round from the invoice's — see [Invoice Document Terms](./document-terms/hms-terms-invoices.md).
- For electronic invoicing it is sent as a credit note (or a return receipt), not as an invoice.

On a surgery package, a blood bank return is subtracted from the package item that covers blood ([The Surgery Lifecycle](./hms-surgery-lifecycle.md)).

![Blood bank return](../../ar/modules/hms/images/clinical/blood-bank-return-en.png)

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Lab test request used in another lab result* — «طلب عمل تحليل مستخدم بالفعل في نتيجة تحليل أخرى» | The Lab Test Request named on this result is already linked to a different Laboratory Test Result. One request carries one result. | Open the request to find the result that already exists and enter the values there; the request picker normally hides requests that have been resulted. |
| *Radiology request used in another radiology result* — «طلب عمل أشعة مستخدم بالفعل في نتيجة أشعة أخرى» | The From Document is a Radiology Request that is already linked to a different Radiology Result. | Open the request to find the existing result and report on that one instead. |
| *There is a reservation doc {0} on the room {1}, reserved at {2} and the allowed time to make another reserve on this room is {3}* — «يوجد سند حجز {0} على الغرفة {1} تم الحجز في {2} والوقت المسموح به لعمل حجز آخر على نفس الغرفة هو {3}» | Another saved Surgery Reservation books the same operating room too close to this one. The room file carries the minimum gap between reservations, and the reservation's document term has *Consider Difference In Times Between Reservations Of The Same Room* ticked. | Move the reservation outside the gap, book another room, or review the gap on the room file if it is unrealistically wide. |
| *Main lines can not be empty* — «لا يمكنك ترك تفاصيل الرئيسية فارغة» | A Blood Bank Return with an empty item grid, on a term with *Prevent Save Without Supplies* ticked. | Add the returned units. |
