---
description: "The hospital patient file, outpatient reservations and clinic schedules, admitting an inpatient through the Patient Admission form, and recording diagnosis and health status."
entities: [HMSPatient, HMSPatientAdmission, HMSOutpatientReservation, HMSOutpatientSchedule, HMSPatientDiagnosis, HMSPatientHealthStatus, HMSQuestionnaireTemplate, HMSQuestion]
menu: Hospital Management System → Master Files → Patient
---
# Patients & Admission

This is where the patient's journey really begins. On this page we cover the patient file itself, how an outpatient is booked, how an inpatient is admitted via the admission form, plus recording diagnosis and health status.

| Screen | Menu | Its own buttons |
|---|---|---|
| **Patient** | Hospital Management System → Master Files → Patient | **Create Patient Admission** |
| **Patient Admission** | Hospital Management System → Documents → Patient Admission | **Update Prices Data On All Invoices** |
| **Outpatient Schedule** | Hospital Management System → Master Files → Outpatient Schedule | None |
| **Outpatient Reservation** | Hospital Management System → Documents → Outpatient Reservation | None |
| **Patient Diagnosis** | Hospital Management System → Documents → Patient Diagnosis | None |
| **Patient Health Status** | Hospital Management System → Documents → Patient Health Status | None |
| **Health Status Question** | Hospital Management System → Master Files → Health Status Question | None |
| **Health Status Questionnaire Template** | Hospital Management System → Master Files → Health Status Questionnaire Template | None |

## The patient file

**Patient** is the pivotal record everything attaches to. It is at once a medical record **and an accounting party** (via the Subsidiary Accounts tab), so the patient can be billed and tracked financially like any customer. Its data spans tabs: Basic Information (attending doctor, blood group, height, weight, patient class, insurance class, insurance company, endurance percentages), New Born Information (linking an infant to mother and father), Personal Information (gender, birth date and place, national ID and insurance card), current accommodation info, plus Accounts, Taxes and Contact info.

![Patient](../../ar/modules/hms/images/patient/patient-en.png)

A few fields on the file do work elsewhere, so they are worth filling in carefully:

- **Doctor**, **Medical Insurance Company**, **Birth date**, **Patient Endurance Percent** and **Company Endurance Percent** are copied onto every admission opened for the patient (see below), so an insured regular patient does not have to be re-typed at each visit.
- **Gender** and **Adult Or Child** choose which normal range a [laboratory test result](./hms-clinical-orders.md#The-laboratory-test-result) loads for the patient.
- In **New Born Information**, the **Mother** lookup offers only female patients and the **Father** lookup only male ones. The **Obstetrician** is the doctor who delivered the baby.
- The current accommodation group (building, section, floor, room, bed) is not typed. The system keeps it on the bed the patient occupies now, and empties it when the patient leaves (see [Accommodation & Feeding](./hms-accommodation.md)).

The **Patient History** tab holds a grid of past conditions (diagnosis date, disease, diagnosis, degree, medication, remark). It is typed by hand: saving a Patient Diagnosis does not add a row to it. The **Related Records** tab gives a 360° view of the patient in collapsible lists: admissions, checks, accommodations, accommodation invoices, lab tests, radiology, surgeries, diagnoses, and the pharmacy, services, medical supplies, physical therapy, service-and-supply, laboratory, radiology and closing invoices.

::: tip From patient file to admission
The patient file carries a **Create Patient Admission** button that opens a new admission form pre-filled with the patient, their doctor, insurer and birth date — the start of the inpatient journey. The [Check Invoice](./hms-invoicing.md) has the same button for an outpatient who turns out to need admission.
:::

## The patient admission

**Patient Admission** is the pivotal document for an inpatient — accommodation, surgeries, lab tests, diagnosis and the closing invoice all branch from it. It's the richest document in the module.

Its header carries: patient, doctor and admission date/time (today and now by default); insurance company and medical document category; the insurance card number, issue and end dates; endurance percentages; the **insurance maximum value across all invoices** with a live **remaining** counter; price classifiers; an initial diagnosis; and a **diagnosis diseases** group of up to five diseases (used later to choose the patient's meals on the [Feeding Issue](./hms-accommodation.md#Feeding-issue)). The admission also shows, read-only, the exit document, the closing invoice and the surgery package if any.

![Patient admission](../../ar/modules/hms/images/patient/patient-admission-en.png)

### What picking the patient fills in

Choosing the **Patient** copies the doctor, the medical insurance company, the birth date and both endurance percentages from the patient file, and works out the patient's **Age** in days, months and years from the birth date. Changing the birth date on the admission recalculates the age. Everything copied can be overwritten for this stay only — the patient file is not changed.

### The accommodation the admission creates

A key feature is the **Generate Accommodation Doc** flag. Tick it, choose the bed, and the admission's accommodation and medical-supervision price blocks open for editing; picking the room prices both blocks from the [price list or insurance approval](./hms-pricing.md) for that room. A bed is then required to save. When the admission is saved, an **[Accommodation](./hms-accommodation.md)** document is created automatically — booking the bed and starting accommodation charges — and shown in **Generated Accommodation Doc**.

It only happens when the admission's term names an accommodation book and term (see [Stay and Operations Document Terms](./document-terms/hms-terms-stay-and-operations.md)). The link stays live afterwards:

- Every later save of the admission updates the same accommodation: its in date and time, bed, prices, insurer and endurance percentages follow the admission.
- Unticking the flag clears the bed and price fields on screen, and saving deletes the generated accommodation.
- Cancelling or deleting the admission deletes its generated accommodation too.

Two read-only parts of the main tab follow the stay as it moves. **Current Accommodation Info** shows the bed the patient is in now — after a transfer it shows the new bed, while the bed fields above keep the bed of admission. The collapsible **Patient Accommodation moves** list shows the stay history itself: one row per in or out of every accommodation, transfer and exit, with its room, bed, from and to date and time, and **Billable Days**. A stretch that is still running shows today's date as its end.

### Endurance and the insurance cap

The **Patient Endurance Percent** and **Company Endurance Percent** decide how the stay is split between patient and insurer. Typing one fills the other with the rest of 100. When either is filled, the two percentages are written into the patient and insurance percentages of both price blocks, and they must add up to 100. When the insurer's share is zero, the patient pays 100% of the accommodation and supervision.

**Insurance Endurance Max Value On All Invoices** caps what the insurer pays across the whole stay. Every HMS invoice linked to the admission records the insurer's share. **Remaining Of Insurance Endurance Max Value** is the cap minus those shares, refreshed as the invoices are saved and each time the admission is saved. When an invoice would take the insurer past the cap, the insurer's share on it is cut down to what remains and the difference moves to the patient, spread over the invoice's lines in proportion to their insurance values. Each line shows its capped amount in **Insurance Max Value From Admission**.

For example, the cap is 10,000 and the stay's invoices so far give the insurer 9,200. A pharmacy invoice whose insurance share is 1,500 is saved with an insurance share of 800, and the patient pays the other 700 on top of their own share. Leave the cap empty or zero for no cap.

You can type the cap, but it also follows the insurer's approvals: saving or deleting an [Insurance Company Approval](./hms-insurance.md) linked to the admission resets it to the largest **Insurance Max Value** among the admission's approvals — or to zero when none of them has one.

### Correcting the insurer or the doctor after billing

When the insurer, the endurance percentages or the doctor change after invoices have been issued, correct them on the admission, save it, and press **Update Prices Data On All Invoices**: it copies the admission's insurance company, patient and company endurance percents and doctor onto every invoice of the admission and saves each one again, so their splits are recalculated. It is refused once the admission has an exit (*You can not use this action with the admission {0} because it has an exit document {1}* — «لا يمكنك استخدام هذه الأداة مع الاستمارة {0} لأن لها سند خروج {1}»); after discharge, use [Change Patient Price Plan](./hms-pricing.md) instead.

### Planned services, lab tests and the package

The admission carries grids for next-of-kin (**Relatives Information**: name, relation, mobile, address) and three planning lists that save typing later:

- **Services** — the procedures planned for the stay. Each row has a **Procedure Type** (the kind of invoice), an **Invoice Type** (the surgery, lab test, radiology or physical-therapy type to bill), a **Cost** that is priced as soon as you pick the invoice type, and remarks. When a Surgery Invoice, Laboratory Test Invoice, Radiology Invoice or Physical Therapy Invoice later picks this admission, it adds one line for each planned row of its own kind.
- **Lab Test** tab — the tests requested at admission (test type, device, blood quantity, tube and tube colour, time taken, test, antibiotic, price and discount). A [Laboratory Test Result](./hms-clinical-orders.md#The-laboratory-test-result) offers these test types when it has no request.
- **Surgery Package Deal** tab — when the admission names a **Surgery Package**, saving fills this tab with the package items and their agreed prices. See [The package deal and the admission](./hms-surgery-lifecycle.md#The-package-deal-and-the-admission).

### After the exit

Once an [Accommodation Exit](./hms-accommodation.md#Exit) is saved for the admission, it shows in **Accommodation Exit Doc** and the admission counts as closed. Closed admissions drop out of the admission lookups of the accommodation documents, the HMS invoices (except the Closing Invoice and the Surgery Package Invoice), and the diagnosis and health-status documents, and **Collect Meals** on the feeding issue skips them. The accommodation, accommodation-invoice, supervision-invoice and transfer lookups go further and list only admissions with **Generate Accommodation Doc** ticked.

## Outpatient clinics

For patients who don't need admission, we use the scheduling system:

- **Outpatient Schedule** — the recurring weekly availability of a clinic, doctor and specialty. Its grid has one row per slot: the weekday, from and to time, the specialty, clinic and doctor of that slot, a **Reserved** flag and a remark.
- **Outpatient Reservation** — booking an actual visit: patient, clinic, doctor, specialty, procedure type, medical document category, the reservation date and time, and remarks.

The two are not linked by the system. Saving a reservation does not look at the schedule, does not refuse a slot that is outside the doctor's hours or already taken, and does not tick **Reserved** on the schedule row — the schedule is a reference for the person booking, and the **Reserved** flag is ticked by hand.

The reservation pays off at the visit: on a [Check Invoice](./hms-invoicing.md), pick the reservation in **From Document** and the invoice copies its procedure type, patient, doctor, clinic, specialty and medical document category, and prices the check from them.

![Outpatient reservation](../../ar/modules/hms/images/patient/outpatient-reservation-en.png)

![Outpatient schedule](../../ar/modules/hms/images/patient/outpatient-schedule-en.png)

## Diagnosis and health status

**Patient Diagnosis** records the doctor's assessment of the patient (optionally linked to an admission): patient, doctor, and the diagnosis text. It needs no document term. It is a record in its own right: it does not change the admission's diagnosis diseases or the patient file's history grid. Each patient's diagnoses are listed on the **Related Records** tab of the patient file.

![Patient diagnosis](../../ar/modules/hms/images/patient/patient-diagnosis-en.png)

**Patient Health Status** is a structured questionnaire filled in for a patient based on a reusable **template**. The template is built from reusable **health-status questions**:

- **Health Status Question** — a single question with a required **Response Type** (Free Text, Choice, Number or Date) and an **Answers** box listing the allowed answers for a choice question.
- **Health Status Questionnaire Template** — a reusable bundle of questions applied to patients. A question can appear only once in a template.

The health-status document names the template, the admission, the patient, the doctor and an attachment, and records one row per question with a text, number or date answer and a remark — ideal for nursing and intake forms. Like the diagnosis, it needs no document term.

Picking the template does not fill the answers grid: add one row per question yourself. A question can be answered only once per document. The grid does not check the answer against the question's response type or its list of answers, so fill the column that fits the question.

![Patient health status](../../ar/modules/hms/images/patient/health-status-en.png)

![Questionnaire template](../../ar/modules/hms/images/patient/questionnaire-template-en.png)

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Total of patient endurance percent and company endurance percent must equal 100* — «مجموع حقلي نسبة تحمل المريض ونسبة تحمل الشركة يجب أن يساوي 100» | The admission has endurance percentages, and the patient and insurance percentages of its accommodation or supervision price block do not add up to 100. | Fix the two endurance percentages so that together they make 100. |
| *You can not use this action with the admission {0} because it has an exit document {1}* — «لا يمكنك استخدام هذه الأداة مع الاستمارة {0} لأن لها سند خروج {1}» | **Update Prices Data On All Invoices** was pressed on a discharged admission. | Use [Change Patient Price Plan](./hms-pricing.md) to re-price a closed stay. |
| *Repeated question* | The same question appears twice in a questionnaire template or on a health-status document. The message has no Arabic translation, so Arabic screens show it in English too. | Delete the duplicate row. |
