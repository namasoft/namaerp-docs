---
entities: [HMSLabTestType, HMSRadiologyType, HMSSurgeryType, HMSPhysicalTherapyType, HMSSurgeryPackage, HMSPackageItem, HMSLabTestCategory, HMSRadiologyCategory, HMSPhyTherapyCategory, HMSSurgeryClassification, HMSTest, HMSTestTube, HMSTestTubeColor]
menu: Hospital Management System → Laboratory Tests → Laboratory Test Type
---
# Medical Service Catalog

Alongside general medical services, the hospital keeps specialized catalogs for each kind of clinical activity: **lab tests**, **radiology**, **physiotherapy**, and **surgeries**. These catalogs are what a doctor orders and what invoices are later priced from.

These catalogue files have no buttons of their own.

| Screen | Menu | Its own buttons |
|---|---|---|
| **Laboratory Test Type** | Hospital Management System → Laboratory Tests → Laboratory Test Type | None |
| **Laboratory Test Category** | Hospital Management System → Laboratory Tests → Laboratory Test Category | None |
| **HMS Test** | Hospital Management System → Laboratory Tests → HMS Test | None |
| **Test Tube** | Hospital Management System → Laboratory Tests → Test Tube | None |
| **Test Tube Color** | Hospital Management System → Laboratory Tests → Test Tube Color | None |
| **Radiology Type** | Hospital Management System → Radiology → Radiology Type | None |
| **Radiology Category** | Hospital Management System → Radiology → Radiology Category | None |
| **Physical Therapy Type** | Hospital Management System → Physical Therapy → Physical Therapy Type | None |
| **Physical Therapy Category** | Hospital Management System → Physical Therapy → Physical Therapy Category | None |
| **Surgery Type** | Hospital Management System → Surgeries → Surgery Type | None |
| **Surgery Classification** | Hospital Management System → Surgeries → Surgery Classification | None |
| **Surgery Package Deal** | Hospital Management System → Surgery Package Deal → Surgery Package Deal | None |
| **Packages Items Deal** | Hospital Management System → Surgery Package Deal → Packages Items Deal | None |

## A shared pattern: "a sellable service type"

Lab, radiology, physiotherapy and surgery types all share the same shape — they are the items the hospital actually charges for:

- **Basic Information:** code, name, the parent **category**, **tax plan**, the **tax-authority item** (for e-invoicing), and an attachment.
- **Price-in-lists grid:** a quick way to push this item's price straight into one or more price lists, varying by doctor/degree/insurer/patient class and period.
- **Accounts and Taxes:** each type behaves as its own accounting party, and the accounting of an HMS invoice term can take an account from the type of each line — see [the doctor](/modules/hms/hms-medical-master-files#The-doctor).
- **Medical Supplies tab:** the default items issued from the warehouse when the service is performed.
- **Medical Services tab:** default linked medical services, each with its specialty, service category, count, remark and attachment.

The type's **Tax Plan** is the tax plan of every invoice line for that type. When the type has none, the tax plan of the invoice's term applies.

### How the Price in Lists grid writes to price lists

Prices are charged from the [Medical Sales Price List](/modules/hms/hms-pricing#The-medical-sales-price-list), not from the type. The **Price in Lists** grid on each type (*Lab Price in Lists*, *Radiology Price in Lists*, *Physical Price in Lists*, *Surgery Price in Lists* — and *Service Price in Lists* on the medical service, *Room Class Price in Lists* on the room classification) is a shortcut that writes those price-list lines for you, so a new test can be priced in every list without leaving its screen.

Each row names:

- **Add To Sales Price List** (required) — the price list the row is written to;
- **Doctor** and **Degree** — to price the service differently per doctor or per doctor degree (the room classification has a **Room** column instead);
- **Insurance Class**, **Medical Insurance Company**, **Patient Classification**, **Valid from**, **Valid to**, **Price Classifier 1** and **Price Classifier 2** — the matching keys; leave one empty to match anything;
- **Price** and **Priority** (required). When several lines match a service, the line with the lowest priority number wins.

When you save the type, the system goes through each price list named in the grid. If that list's rows changed since the last save, the list's lines for this type are replaced by the grid's rows — including any line for this type that someone typed on the price list directly — and the list is saved. Lines for other services on the list are never touched. Remove every row of a price list from the grid and, on save, that list loses its lines for this type; delete the type and its lines go from every list it fed.

So treat the grid as the master: once a type pushes to a price list, maintain its prices there and not on the price list. Columns the grid does not have — the surgery tab's standard hours and fee components, for instance — are entered on the price list itself.

### Supplies and services travel with the service

The two extra tabs are what make one click bill a whole procedure. When you pick a type on the line of its invoice — a **Laboratory Test Invoice**, **Radiology Invoice**, **Physical Therapy Invoice** or **Surgery Invoice** — the system copies the type's **Medical Supplies** rows into the invoice's supplies grid and its **Medical Services** rows into the invoice's services grid. Every copied line is priced on the spot from the price list (supplies from the supplies tab, services from the services tab), remembers which invoice line it came from, and keeps the type's quantity as its planned quantity. A supply ticked **Free Item** on the type is issued without a price.

Clear the type on the invoice line and the lines it brought are removed with it. Switching the line to another type, on the other hand, adds the new type's lines and leaves the earlier ones in place, so delete those yourself. Filling a surgery invoice from a surgery request brings the surgery type's supplies and services the same way.

## Lab tests

**Laboratory Test Type** defines a single test the lab offers (CBC, fasting glucose…). On top of the shared pattern, it has a unique grid defining the **normal reference ranges** for each result component (**Test Case**): a from–to range for a male, a female, a male child and a female child, the **Measuring Unit** and a remark.

The ranges are what the lab result shows next to each value. When you pick the test type on a **Laboratory Test Result**, every test case becomes a result line carrying its measuring unit, its remark and the one range that fits the patient: the patient file's **Gender** and **Adult Or Child** choose among the four. A patient with neither set gets the adult-male range.

![Laboratory test type](../../ar/modules/hms/images/catalog/lab-test-type-en.png)

Tests are grouped under a **Laboratory Test Category**. The system also includes lab support lists: **HMS Test** as a result component, and **Test Tube** and **Test Tube Color** to describe sample tubes and their conventional cap colours. All three are code-and-name lists used in the rows of a [Medical Device](/modules/hms/hms-medical-master-files#Analyzers) and in the lines of a lab test request.

## Radiology and physiotherapy

**Radiology Type** defines a single imaging procedure (X-ray, CT, MRI, ultrasound…), follows the shared pattern, and is grouped under a **Radiology Category**.

![Radiology type](../../ar/modules/hms/images/catalog/radiology-type-en.png)

Similarly, **Physical Therapy Type** defines a physiotherapy session/procedure, grouped under a **Physical Therapy Category**.

## Surgeries

**Surgery Type** defines an operation the hospital performs. It follows the shared pattern and adds up to five attachment fields for operative documents (consent templates, protocols…). Its price lines carry the operation's **standard hours** and **additional-hour price**, and its **fee components** (surgeon fees, assistant, anesthesia, open surgery, other) — those columns live on the surgeries tab of the [sales price list](/modules/hms/hms-pricing#The-medical-sales-price-list), and the [surgery invoice](/modules/hms/hms-surgery-lifecycle#The-operation-lines-and-their-hours) uses them to work out the hours and fees of each operation.

It's grouped under a **Surgery Classification** used as a pricing dimension: a surgery price line that names a classification is used only for surgery types of that classification.

![Surgery type](../../ar/modules/hms/images/catalog/surgery-type-en.png)

## Surgery packages

Instead of billing an operation item by item, you can agree a **fixed all-in price** for it via a **Surgery Package**. The package links a **Doctor** and **Surgery Type** to a **Non Agreed Items** package item for anything billed outside the bundle, and its details list a set of **package items**, each with a room classification, a **Count** and its agreed **Price**. Picking a package item on a line fills the line's room classification from the package item.

![Surgery package](../../ar/modules/hms/images/catalog/surgery-package-en.png)

A **Package Item** is the line that appears inside the package. It can carry a **Room** and **Room Classification**, and a set of flags that define **what this line covers** — i.e. which invoices of the stay count against it:

| Flag | Counts against the package line |
|---|---|
| **Patient Check** | Check invoices |
| **Accommodation** | Accommodation invoices |
| **Attendant** | Attendant invoices |
| **Supervision** | Supervision invoices |
| **Lab Test** | Laboratory test invoices |
| **Radiology** | Radiology invoices |
| **Physical Therapy** | Physical therapy invoices |
| **Pharmacies** | Pharmacy invoices, less pharmacy returns |
| **Medical Supplies** | Supplies invoices, less supply returns |
| **Service** | Services invoices, and the service lines of service and supply invoices |
| **Services And Supplies** | The supply lines of service and supply invoices |
| **Surgery (Main Page)** | The operation lines of surgery invoices |
| **Surgery Supplies** | The supply lines of surgery invoices |
| **Surgery Services** | The service lines of surgery invoices |
| **Blood Bank** | Blood bank invoices, less blood bank returns |

When the package is settled, each invoice of the admission is counted against the **first** package line, in the package's order, whose item covers it; whatever no line covers is gathered on a line for the package's **Non Agreed Items** item. The package is billed via the **[Surgery Package Invoice](./hms-invoicing.md)**, which compares the agreed price to the actual price and records the difference.
