---
entities: [HMSDoctor, HMSMedicalService, HMSMedicalSpecialty, HMSMedServiceCategory, HMSDisease, HMSAntibiotic, HMSMedicalDevice, HMSFeedingType, HMSPatientClass, HMSDocumentCategory, HMSProcedureType]
menu: Hospital Management System → Master Files → Doctor
---
# Medical Master Files

Having mapped the building, we now define the staff and medical concepts that the documents work with every day: doctors, specialties, diseases, medical services, analyzers, feeding, and patient classes. Most live under **Hospital Management System → Master Files** (some under specialized menus such as Laboratory Tests and Feeding, as noted).

These files have no buttons of their own.

| Screen | Menu | Its own buttons |
|---|---|---|
| **Doctor** | Hospital Management System → Master Files → Doctor | None |
| **Medical Specialty** | Hospital Management System → Master Files → Medical Specialty | None |
| **Patient Classification** | Hospital Management System → Master Files → Patient Classification | None |
| **Disease** | Hospital Management System → Master Files → Disease | None |
| **Procedure Type** | Hospital Management System → Master Files → Procedure Type | None |
| **Medical Document Category** | Hospital Management System → Hospital Structure → Medical Document Category | None |
| **Medical Service Category** | Hospital Management System → Medical Services → Medical Service Category | None |
| **Medical Service** | Hospital Management System → Medical Services → Medical Service | None |
| **Feeding Type** | Hospital Management System → Feeding → Feeding Type | None |
| **Antibiotic** | Hospital Management System → Laboratory Tests → Antibiotic | None |
| **Medical Device** | Hospital Management System → Laboratory Tests → Medical Device | None |

## The doctor

**Doctor** is one of the richest files. It records the physician's details, specialty and degree, can be linked to an HR **Employee** record, and — crucially — it acts as an **accounting party**, with its own ledger account so the doctor's share/commission can be paid out. Its data spans tabs: Basic Information (employee, job title, specialty, degree, attachment), Personal Information (gender, birth date and place, marital status, religion, first and last name, national ID, remarks), Accounts, Taxes, Contact Info, and Tax Information.

Two fields on the doctor decide prices:

- **Degree** — Advisor, Specialist, Technician or Advisor Professor. A price line that names a degree is used only for doctors of that degree; a line with no degree is used for any doctor. A doctor left without a degree is priced only from lines that name no degree.
- The **doctor** itself — a price line can name one doctor, and then only that doctor's services are priced from it.

So a consultation can cost one amount with a specialist and another with a professor, and a star surgeon can have prices of their own, all from the same price list.

The **Medical Specialty** links the doctor to their department. On a **Check Invoice** the two lists filter each other: pick the doctor and the specialty list offers only the doctor's specialty; pick the specialty and the doctor list offers only the doctors of that specialty.

![Doctor](../../ar/modules/hms/images/master-files/doctor-en.png)

A **Medical Specialty** classifies doctors, clinics and services (cardiology, orthopedics, pediatrics…) and is itself an accounting party, so revenue can be tracked per specialty. Its **Tax Plan** is the tax plan of the check (consultation) invoices issued for the specialty.

::: info Doctors, specialties and services as account sources
The doctor, the medical specialty, the medical service and every service type (lab test, radiology, physiotherapy, surgery) each carry their own accounts. When you set up the accounting of an HMS invoice term, any of them can be chosen as the source of an account, so revenue can be split by doctor, by specialty or by service without separate account codes on every invoice.
:::

## The medical service

**Medical Service** is the core priced item in the system — a consultation, a procedure, a nursing service. On its main tab you set its **Medical Specialty**, its **Medical Service Category**, a **Tax Plan**, the **Tax Authority Item** (for e-invoicing) and an attachment. The specialty and category also steer the pickers: on a **Service And Supply Invoice**, a line's service list offers only services of the chosen specialty and category, plus services that have none.

The service's price is not typed on the service: it comes from the services tab of a [Medical Sales Price List](/modules/hms/hms-pricing#The-medical-sales-price-list), matched by service, doctor, degree, insurer, patient class and period. The service's **Service Price in Lists** grid lets you write those price lines from the service screen itself, with a **Doctor** and **Degree** column on top of the usual matching keys — see [How the Price in Lists grid writes to price lists](/modules/hms/hms-service-catalog#How-the-Price-in-Lists-grid-writes-to-price-lists).

What's distinctive is its **Medical Supplies** tab: a list of items consumed when the service is performed, each with its quantity, warehouse and the usual item dimensions. When you pick the service on a **Services Invoice**, these items are copied into the invoice's supplies grid, each priced from the supplies tab of the price list, so the items are issued from inventory and billed with the service. An item ticked **Free Item** is issued but carries no price.

![Medical service](../../ar/modules/hms/images/master-files/medical-service-en.png)

Services are grouped under a **Medical Service Category** to organize the catalog and reporting.

## Diseases and antibiotics

**Disease** is the catalog of diagnoses used when recording a patient's diagnosis. A disease can be flagged by nature — **Infectious**, **Cancerous**, **Viral** — and the three flags are filters and columns on the disease list, handy for statistics. Diseases also drive diet selection, through the feeding types below.

![Disease](../../ar/modules/hms/images/master-files/disease-en.png)

**Antibiotic** is a list used by the labs (especially in sensitivity/culture testing) to record which antibiotics a sample was tested against. You'll find it under the **Laboratory Tests** menu.

## Analyzers

Despite its English label "Medical Device," this is a **lab analyzer**, and its definition specifies **which tests the device runs** and each test's requirements: blood quantity, tube type and color, time taken, and the associated test and antibiotic. You'll find it under the **Laboratory Tests** menu.

This is what drives the sample-collection instructions. On a **Lab Test Request** line, once the test type is chosen, picking the **Device** fills the line's **Blood Quantity**, **Test Tube**, **Test Tube Color**, **Taken Time**, **HMS Test** and **Antibiotic** from the device's row for that test. A device with no row for the test leaves the line as it is.

![Analyzer](../../ar/modules/hms/images/master-files/medical-device-en.png)

## Feeding, patient classes and document categories

- **Feeding Type** — a patient diet (normal, diabetic, liquid…). It defines a priority **Type Order**, up to five diseases it is meant for (the **Diagnosis Disease** group), and a recipe-like list of food items with quantities to issue from the kitchen. On each item line, picking the item fills **Assembly BOM** with a matching bill of materials — one built for that item, or one with no item — and the BOM list then offers only the item's BOMs. This file plays a central role in **[Feeding Issues](./hms-accommodation.md)**.

  How the diet is chosen automatically: when a feeding issue collects the meals, each admitted patient with a diagnosis gets the feeding type whose diseases all appear in the diagnosis — a disease slot left empty matches anything, so a type with no diseases fits every diagnosed patient. When several types fit, the one with the **highest** Type Order wins. Patients without a diagnosis are skipped. So give the general diet a low order and the specific diets (diabetic, renal…) higher ones.

![Feeding type](../../ar/modules/hms/images/master-files/feeding-type-en.png)

- **Patient Classification** — a patient tier (cash, staff, company, exempt, VIP…), and a key **pricing classifier**: a price line that names a patient class is used only for patients of that class (the class set on the patient file), and a line without one is used for everybody. It can hold an attachment, such as the agreement behind a staff tier.

- **Medical Document Category** — controls the **tax and accounting behaviour** of a whole class of documents. **Not Taxable Tax 1** and **Not Taxable Tax 2** zero that tax on every line of a document in the category, whatever the tax plan says. **Use Doctor Instead Of Patient In Accounting Effects** makes the document's accounting charge the doctor instead of the patient — handy for the doctor revenue-sharing model. The category is also a pricing key: each tab of a price list carries a **Medical Document Category**, so you can keep, say, a separate price scale for documents of a charity category.

![Medical document category](../../ar/modules/hms/images/master-files/document-category-en.png)

- **Procedure Type** — a code and a name that classify consultations (first visit, follow-up, home visit…). It is picked on the **Check Invoice** and the **Outpatient Reservation**, and the check tabs of the sales price list, cost list, discount and overhead list carry a **Procedure Type** column, so a follow-up visit can be priced, costed and discounted differently from a first visit.
