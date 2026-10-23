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

**Patient** is the pivotal record everything attaches to. It is at once a medical record **and an accounting party** (via the Subsidiary Accounts tab), so the patient can be billed and tracked financially like any customer. Its data spans tabs: Basic Information (attending doctor, blood group, height, weight, patient class, insurance company, endurance percentages), New Born Information (linking an infant to mother and father), Personal Information (gender, birth — age is auto-calculated — national ID and insurance card), current accommodation info, plus Accounts, Taxes and Contact info.

![Patient](../../ar/modules/hms/images/patient/patient-en.png)

The file also holds a **patient-history** grid (diagnosis date, disease, degree, medication) and a **Related Records** tab that gives a 360° view of the patient: admissions, checks, accommodations, lab tests, radiology, surgeries and all their invoices.

::: tip From patient file to admission
The patient file carries a **Create Patient Admission** button that opens a new admission form pre-filled with the patient's details, doctor and insurer — the start of the inpatient journey.
:::

## The patient admission

**Patient Admission** is the pivotal document for an inpatient — accommodation, surgeries, lab tests, diagnosis and the closing invoice all branch from it. It's the richest document in the module.

Its header carries: patient, doctor and admission date/time; insurance company and document category; endurance percentages; the **insurance maximum value across all invoices** with a live **remaining** counter; price classifiers; an initial diagnosis; and a **diagnosis diseases** group (used later to choose feeding). The admission also links the exit document, the closing invoice and a surgery package if any.

A key feature is the **Generate Accommodation Doc** flag: when ticked and the admission is saved, an **[Accommodation](./hms-accommodation.md)** document is generated automatically (booking the bed and starting accommodation charges). When the insurer, the endurance percentages or the doctor change after invoices have been issued, correct them on the admission, save it, and press **Update Prices Data On All Invoices**: it copies the admission's insurance company, patient and company endurance percents and doctor onto every invoice of the admission and saves each one again, so their splits are recalculated. It is refused once the admission has an exit (*You can not use this action with the admission {0} because it has an exit document {1}* — «لا يمكنك إستخدام هذه الأداة مع الإستمارة {0} لان لها سند خروج {1}»); after discharge, use [Change Patient Price Plan](./hms-pricing.md) instead. The admission carries grids for next-of-kin, services rendered during the stay, surgery-package items, and lab tests requested at admission.

![Patient admission](../../ar/modules/hms/images/patient/patient-admission-en.png)

## Outpatient clinics

For patients who don't need admission, we use the scheduling system:

- **Outpatient Schedule** — the recurring weekly availability for a clinic, doctor and specialty: per weekday, time slots (from/to) with a flag for whether each is taken.
- **Outpatient Reservation** — booking an actual visit: patient, clinic, doctor, specialty, procedure type, and the reservation date and time.

![Outpatient reservation](../../ar/modules/hms/images/patient/outpatient-reservation-en.png)

![Outpatient schedule](../../ar/modules/hms/images/patient/outpatient-schedule-en.png)

## Diagnosis and health status

**Patient Diagnosis** records the doctor's assessment of the patient (optionally linked to an admission): patient, doctor, and the diagnosis text.

![Patient diagnosis](../../ar/modules/hms/images/patient/patient-diagnosis-en.png)

**Patient Health Status** is a structured questionnaire filled in for a patient based on a reusable **template**. The template is built from reusable **health-status questions**:

- **Health Status Question** — a single question with a response type (text/choice/number/date); for "choice" it carries the list of allowed answers.
- **Questionnaire Template** — a reusable bundle of questions applied to patients.

The health-status document then records an answer per question (text/number/date) — ideal for nursing and intake forms.

![Patient health status](../../ar/modules/hms/images/patient/health-status-en.png)

![Questionnaire template](../../ar/modules/hms/images/patient/questionnaire-template-en.png)
