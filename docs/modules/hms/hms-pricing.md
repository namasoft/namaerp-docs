---
description: "HMS pricing screens: Medical Sales Price List, Medical Cost List, Medical Discount, the overhead items, lists and Actual Overhead Calculation, and Change Patient Price Plan — with the exact rules that pick a price, a cost, a discount and an overhead for each invoice line."
entities: [HMSSalesPriceList, HMSCostList, HMSDiscount, HMSOverheadItem, HMSOverheadList, HMSActualOverheadCalculation, HMSChangePatientPricePlan]
menu: Hospital Management System → Master Files → Medical Sales Price List
---
# Pricing, Costing & Discounts

Every hospital service has a selling price and a cost. As a hospital grows, pricing each service individually becomes impractical, so **lists** gather prices, costs and discounts in one place. These lists all share a single structure, so learning it once is enough.

| Screen | Menu | Its own buttons |
|---|---|---|
| **Medical Sales Price List** | Hospital Management System → Master Files → Medical Sales Price List | One update button per tab |
| **Medical Cost List** | Hospital Management System → Master Files → Medical Cost List | One update button per tab |
| **Medical Discount** | Hospital Management System → Master Files → Medical Discount | One update button per tab |
| **Medical Overhead Item** | Hospital Management System → Medical Overhead → Medical Overhead Item | None |
| **Medical Overhead List** | Hospital Management System → Medical Overhead → Medical Overhead List | One update button per tab |
| **Actual Overhead Calculation** | Hospital Management System → Medical Overhead → Actual Overhead Calculation | **Collect Invoices And Overhead Items**, **Calculate Overhead Value**, **Distribute Overhead Actual Value** |
| **Change Patient Price Plan** | Hospital Management System → Documents → Change Patient Price Plan | **Collect Invoices** |

## The shared structure: a tab per service type

The **sales price list, cost list, discount, and overhead list** all follow the same pattern — and so does the [insurance approval](./hms-insurance.md): a tab per service area (accommodation, patient checks, attendants, laboratory tests, radiology, surgeries, physical therapy, pharmacies, medical supplies, supervision, medical services, blood banks), and a grid of lines on each tab.

The header at the top of each tab is the same set of fields repeated on every tab: code and name, **Valid from** / **Valid to**, **Priority**, **Medical Insurance Company**, **Medical Document Category**, **Patient Endurance Percent** / **Company Endurance Percent**, and the price classifiers that are switched on in [HMS settings](./hms-configuration.md#Classifiers-Configurations----the-five-price-classifiers). The lines on every grid share the same **matching keys** used to select a line at billing time: the relevant service reference (room / doctor / test type / radiology type / surgery type / item…), degree, **Insurance Class, Medical Insurance Company, Medical Insurance Company Class, Patient Classification**, the validity dates, and **Priority** to break ties. The cost list, discount and overhead list also have a **Subsidiary** column, matched against the invoice's subsidiary. What differs between the lists is only the **value columns**.

Saving a list stamps part of the header onto every line of every tab: the priority and the valid from/to dates when they are filled on the header, the medical insurance company and the document category when they are filled, and the two endurance percents always. So the endurance split of a price list is set once on its header — a list whose header says *Company Endurance Percent* 80 gives every one of its lines an 80 % insurer share. Each line needs a priority, either its own or the header's.

Every tab of the four lists ends with its own **update** button — on the sales price list's
accommodation tab it is *Update Price List Accommodation Details*, and each tab names its own service
type. The button copies the tab's header values — priority, valid from and to, the price classifiers,
the insurance company, the patient and company endurance percents and the document category — onto
**every line of that tab's grid**, so you can enter a block of lines and stamp them with one set of
matching keys instead of filling each line by hand. It copies empty header fields too, so an empty
header classifier clears that column on every line. The lines are changed on screen; save the list to
keep them.

## How a price is found

When a service is entered on a hospital invoice — and again on every save when the invoice's term has
*Update Prices With Save* (see [Freezing a price](./hms-invoicing.md#Freezing-a-price)) — the system
looks the line up. It uses what is on the invoice: the line's service (room, test type, radiology type,
surgery type, physical therapy type, medical service or item, with its quantity and unit), the
**value date**, the patient and his **Patient Classification**, the patient admission, the **Insurance
Class**, the **Medical Insurance Company** and its class, the **Medical Document Category**, the
**doctor** and his degree, the **subsidiary**, and the five price classifiers (the line's own when it
has them, otherwise the header's).

### Which line matches

A list line matches when every key it fills equals the invoice's value. **An empty key matches
anything**, so a line with only a test type and a price applies to every patient, insurer and doctor.
On top of that:

- **Dates** — the invoice's value date must fall between the line's *Valid from* and *Valid to*; an
  empty date leaves that side open.
- **Doctor and degree** — a line naming a doctor matches only that doctor; a line naming a degree
  matches every doctor of that degree. A line may not name both.
- **Insurer class** — a line naming a *Medical Insurance Company Class* only matches insurers of that
  class; an invoice whose insurer has no class (or a cash invoice) never matches it.
- **Room classification** comes from the invoice's room, and the **surgery classification** from the
  line's surgery type, so a line keyed on a classification covers every room or surgery type in it.
- **Patient checks** also match on the procedure type, and on the medical specialty when the invoice has
  one.
- **Pharmacy and supplies** fall back on each other: an item with no matching line on the pharmacy tab
  is looked up on the medical supplies tab, and the other way round — for the price, the discount and
  the cost alike.

The system never asks which price list applies: **the lines of every Medical Sales Price List compete
together**. Of all the lines that match, the one with the **smallest Priority** wins — it is the
priority, not how specific the line is, that decides. If nothing matches, the price comes back as zero.

::: tip Example — priority beats detail
Two price lists hold these laboratory-test lines:

| Line | Test type | Medical Insurance Company | Priority | Price |
|---|---|---|---|---|
| A | CBC | — | 10 | 200 |
| B | CBC | Insurer X | 5 | 170 |
| C | — (all tests) | Insurer X | 1 | 150 |

An Insurer X patient's CBC matches all three lines, and line C wins with priority 1: the test costs
**150**, not the 170 of the more specific line B. Give B priority 0 or C priority 20 and B wins. A cash
patient matches only line A (B and C name an insurer) and pays **200**. If B were valid only until
30 June, an invoice dated 1 July would not see it at all.
:::

### What each list contributes

The lookup runs in a fixed order, and each step fills its own part of the line's price block:

| Step | Source | What it gives the line |
|---|---|---|
| 1 | **Medical Sales Price List** — the winning line | The unit price (× quantity), and the endurance percents of that list's header |
| 2 | **Medical Discount** — **all** matching lines | Discount 1 % and Discount 2 % (see [Medical discounts](#Medical-discounts)) |
| 3 | **Medical Cost List** — the winning line | Cost percentage/value and the three subsidiary shares |
| 4 | **Insurance Company Approval** of the invoice's admission — the winning line | Overrides the price, the endurance percents and the insurer's maximum, wherever it fills them ([details](./hms-insurance.md#How-an-approval-is-applied-to-an-invoice)) |
| 5 | Tax plan | Tax 1 and Tax 2 percents |
| 6 | **Medical Overhead List** — every matching line | One estimated overhead row per overhead item (see [Indirect (overhead) costing](#Indirect-overhead-costing)) |

For the taxes, the tax plan comes from the line's medical service, item, test, radiology, room,
surgery, specialty or physical-therapy type — or from its parent category when it has none — and
otherwise from the invoice term's *Tax Plan*. A term that is not *Taxable* gives no tax, and a
**Medical Document Category** with *Not Taxable Tax 1* / *Not Taxable Tax 2* removes that tax from its
invoices. The term options are on
[Invoice Document Terms](./document-terms/hms-terms-invoices.md#The-Effect-group----the-options). How the
result is then split between the patient and the insurer, taxed and capped is explained on
[Medical Insurance & Approvals](./hms-insurance.md#Splitting-a-line-between-patient-and-insurer).

## The medical sales price list

**Medical Sales Price List** is the selling-price book — its core column is **Price**. Each tab carries the keys of its service type: room and room classification (accommodation, attendants); procedure type, medical specialty, doctor and degree (patient checks); doctor, degree and the test, radiology or physical-therapy type; doctor, degree and room (supervision); medical specialty, service, doctor and degree (medical services); and the item with its unit (pharmacies, medical supplies, blood banks). The pharmacy, supplies, supervision and blood-bank tabs also have a **Patient** column, for a price that applies to one patient only.

![Medical sales price list](../../ar/modules/hms/images/pricing/sales-price-list-en.png)

- **Items are priced per unit.** A pharmacy, supplies or blood-bank line's price is for the unit on the
  line; an invoice line in another unit of the same item gets the price converted by the item's unit
  factors, then multiplied by the quantity.
- **Attendants** are priced per attendant: the price is multiplied by the attendants count.
- **Surgeries** are priced by their fee components. The surgeries tab has **Open Surgery**, **Surgeon
  Fees**, **Surgeon Assistant**, **Anesthesia Fees** and **other**; their sum is the operation's
  standard price. Beyond the **Standard Hours Number**, every extra hour of the operation (from the
  surgery invoice's start and end) adds the **Additional Hour Price**. Fee components typed on the
  surgery invoice line itself take precedence over the list's.

::: tip Example — a surgery line
A line for an appendectomy has components 3,000 + 1,500 + 500 + 800 + 200 = 6,000, a standard of 2
hours and an additional-hour price of 400. An operation lasting 3½ hours is priced
6,000 + 1.5 × 400 = **6,600**.
:::

A surgery line is keyed on either a **Surgery Type** or a **Surgery Classification**, never both, and a
line on any doctor-keyed tab may name the doctor or the degree, not both — both are refused on save
(see the messages below).

You do not have to type every price here. The price grid on a **Laboratory Test Type**, **Radiology
Type**, **Physical Therapy Type**, **Surgery Type**, **Medical Service** or **Room Classification** has
an **Add To Sales Price List** column: saving that file writes its lines into the chosen list's tab
(replacing the lines it wrote there before), and deleting the file removes them. See
[Medical Service Catalog](./hms-service-catalog.md#A-shared-pattern-a-sellable-service-type).

## The medical cost list

**Medical Cost List** has the same shape, but its columns capture **cost** rather than price: **Cost Percentage** and **Cost Value**, with up to three **subsidiary** splits per line (*Subsidiary Cost*, *Subsidiary 1 Cost*, *Subsidiary 2 Cost*, each a percentage and a value — the doctor's, lab's or external party's share of the revenue). On the surgeries tab every fee component expands into percentage + value + an additional-time cost. This list is used for revenue-sharing with doctors and for profitability.

![Medical cost list](../../ar/modules/hms/images/pricing/cost-list-en.png)

The winning cost line (smallest priority, as for prices) is applied like this:

- **Cost Value**, when filled, is the cost of **one unit** and is multiplied by the line's quantity; the
  cost percentage is then worked out from it. When it is empty, the cost is **Cost Percentage** of the
  line's price.
- Each subsidiary share works the same way: its value × quantity when filled, otherwise its percentage
  of the price.
- On a surgery line, when the fee components carry costs, the line's cost is the sum of the component
  costs.

::: tip Example
A radiology line is priced 500 × 2 = 1,000. Its cost line has *Cost Percentage* 30 and *Subsidiary
Cost Value* 120 for the radiologist. The line's cost is 300 (30 % of 1,000) and the radiologist's share
is 240 (120 × 2).
:::

The cost and the subsidiary shares are recorded through the term's *Debit Cost / Credit Cost* and
*Subsidiary Debit / Credit* sides — see
[Invoice Document Terms](./document-terms/hms-terms-invoices.md#The-Effect-group----the-sides).

## Medical discounts

**Medical Discount** gives each line two stacked discounts: **Discount 1 Percent** and **Discount 2 Percent**. As on the other lists, each tab's update button stamps the header's insurance company, period, priority and endurance percents onto its lines. It's used to apply patient-, class- or insurer-specific discounts to services.

![Medical discount](../../ar/modules/hms/images/pricing/discount-en.png)

Two rules make discounts different from prices:

- **Every matching discount line counts.** Discount lines are not ranked by priority: the percents of
  all the lines that match the invoice — from every Medical Discount file — are added together.
- **Discount 2 is taken after Discount 1.** Discount 1 is a percent of the price; Discount 2 is a
  percent of what is left.

::: tip Example
One discount file gives *Patient Classification* "Staff" 10 % Discount 1 on laboratory tests; another
gives Insurer X 5 % Discount 1 and 10 % Discount 2. A staff member insured by Insurer X gets Discount 1
= 15 % and Discount 2 = 10 %. On a 400 test: Discount 1 = 60, Discount 2 = 10 % of 340 = 34, price
before tax 306.
:::

A discount the cashier changes on the invoice is limited by the user's own employee file: when
**Max Discount 1 Percentage**, **Max Discount 1 Value**, **Max Discount 2 Percentage** or **Max Discount
2 Value** is filled there, an invoice whose discount goes beyond it is refused on save.

## Indirect (overhead) costing

Not every cost is direct — there's electricity, cleaning, administration. The system allocates these onto services through a three-piece machinery:

- **Overhead Item** — defines a single indirect-cost item (electricity, housekeeping…) and its accounts, **how to read its actual value** from the ledger, and **how to distribute it** across invoice types by weights (shares).

![Overhead item](../../ar/modules/hms/images/pricing/overhead-item-en.png)

- **Overhead List** — the **estimated** indirect cost loaded onto each service (it follows the shared tabbed structure), applied automatically to invoices.

- **Actual Overhead Calculation** — a period-end document that replaces the estimate on each invoice with its share of the **actual** cost (below).

### The overhead item

| Field / grid | What it does |
|---|---|
| **Estimated Value Debit** / **Estimated Value Credit** | The sides an invoice's estimated overhead is recorded through. |
| **Actual Value Debit** / **Actual Value Credit** | The sides used instead once the invoice's overhead line has an actual value. |
| **Actual Value Calculation Method Lines** | Where the real cost is read from: an account — or an accounts chart, meaning every account under it — optionally narrowed by subsidiary, analysis set, branch, sector, department and entity dimension. **Account Side Type** says what to add up: *Debit and Credit* (debits minus credits, also used when empty), *Only Debit* or *Only Credit*. |
| **Actual Value Distribution Lines** | One line per **Invoice Type** with its **shares** — the weight of that invoice type in the actual cost. |

### The estimate on each invoice

An overhead-list line names an **Overhead Item** besides the usual keys, and either a **Cost Value** or
a **Cost Percentage**. When a service is entered on an invoice, every matching overhead-list line adds a
row to the invoice's overhead grid, with:

- **Estimated Value** = the line's *Cost Value*, as it is (it is not multiplied by the quantity), or,
  when that is empty, *Cost Percentage* of the service's price on the medical sales price list;
- **Actual value** and **Actual Overhead Calculation Document**, filled later by the period-end
  calculation.

The invoice shows the **Total Overhead Actual Value** and **Total Overhead Estimated Value** of its
rows. Each overhead item may appear only once on an invoice — a repeated row is refused on save.

### The period-end routine

Each invoice already carries an **estimated** overhead from the overhead list, recorded through the
overhead item's estimated-value sides. At period end, the **Actual Overhead Calculation** works out
what the overhead really cost and spreads it back over the same invoices. Its three buttons are meant
to be pressed in order:

1. **Collect Invoices And Overhead Items** — fill in a date range, a period range, a book range or a
   term range (any one is enough; they combine) and press it. It lists every saved hospital invoice in
   the range — accommodation, check, attendant, laboratory, radiology, surgery, physical therapy,
   pharmacy, supplies, services, blood bank and supervision invoices — on the **Invoices** grid, and
   every overhead item those invoices carry on the **Overhead Items** grid. Save the document.
2. **Calculate Overhead Value** — for each overhead item, reads its actual-value calculation lines and
   writes one row per calculation line on the **Actual Overheads** grid, with the **Overhead Value**
   summed from the ledger (in local currency) for the document's date and period range. The document
   is saved.
3. **Distribute Overhead Actual Value** — fills, for each item on the **Overhead Items** grid, its
   **Total Value** (the sum of its actual-overhead rows) and its **Total Estimated Value From
   Invoices**, and saves the document.

That save is what writes the result back: each overhead item's actual total is split
between invoice types by the **shares** on the item, and each invoice of that type receives the part
proportional to its own estimate. From then on the invoice's overhead line holds an actual value and a
link to the calculation document, and its overhead is recorded through the item's **actual-value** sides
instead of the estimated ones. Cancelling the calculation clears those actual values again.

::: tip Example — distributing electricity
The *Electricity* item reads account "Electricity expense" with *Debit and Credit*; for January the
ledger nets **12,000**. Its distribution lines give *Accommodation Invoice* 3 shares and *Laboratory
Test Invoice* 1 share, so accommodation carries 9,000 and laboratory 3,000.

The collected accommodation invoices estimated 400 (invoice A) and 600 (invoice B) for electricity,
1,000 in all. Invoice A receives 400 × 9,000 ÷ 1,000 = **3,600** and invoice B **5,400**. The
laboratory invoices share their 3,000 the same way.
:::

![Actual overhead calculation](../../ar/modules/hms/images/pricing/actual-overhead-en.png)

![An Actual Overhead Calculation with its overhead items](../../ar/modules/hms/images/pricing/hms-actual-overhead-calculation-en.png)

An overhead item is distributed once per period: a calculation is refused when another saved calculation dated inside its date and period range already distributes the same item.

## Changing a patient's price plan

Sometimes insurance coverage is confirmed after a patient is admitted and their invoices have been issued. The **Change Patient Price Plan** document re-prices a patient's issued invoices retroactively. You pick the **Patient** (required), their **Patient Admission** and/or a **From Date – To Date** range, and the new **Medical Insurance Company** and **Patient Endurance Percent** / **Company Endurance Percent**. The document needs no term.

![Change patient price plan](../../ar/modules/hms/images/pricing/change-price-plan-en.png)

**Collect Invoices** needs the patient and either the admission or the dates. It replaces the grid with
every invoice and return of that patient that matches — all sixteen hospital invoice and return types —
showing for each its **Invoice Total Before Change** and its current price classifiers (**Old Price
Classifier 1–5**, locked). In the **New Price Classifier 1–5** columns you enter the classifiers each
invoice should be priced with.

Saving the document does the work, invoice by invoice:

1. The invoice's price classifiers are replaced by the row's new ones. **An empty new classifier clears
   the invoice's classifier**, so fill the new columns for every classifier the invoice should keep.
2. When the header has an insurance company, it replaces the invoice's insurer; when either endurance
   percent is filled, both replace the invoice's (the grid's percent columns show the header's values).
3. The invoice is priced again from the price lists, discounts, cost lists and the admission's approval —
   except the grids whose *Allow Changing … Prices* switch is on, which keep their prices.
4. The invoice is saved again, so its split, its taxes and its ledger entry are updated, and the row's
   **Invoice Total After Change** is filled.

The before and after totals are the invoices' net values; they differ only when the new insurer or
classifiers bring different prices — a change of split alone moves money between patient and insurer
without changing the total. Deleting or cancelling the document does not put the old prices back; to
reverse it, issue another one with the old values.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Field {0} and field {1} can not be filled together* — «لا يمكن ملء الحقل {0} والحقل {1} معاً» | A line on the **surgeries** tab of a medical sales price list names both a Surgery Type and a Surgery Classification. A line may be keyed on one or the other, never both. | Clear whichever of the two is not the matching key you want, and add a second line if you need both kinds of rule. |
| *You must fill only doctor or doctor degree field, at line {0}* — «يجب ملء حقل واحد فقط الطبيب أو الدرجة، في السطر {0}» | A line on a doctor-keyed tab (patient checks, laboratory tests, radiology, surgeries, physical therapy, supervision, medical services) of a medical sales price list or an insurance approval names both a doctor and a degree. | Keep the doctor for a doctor-specific price, or the degree for a price that applies to every doctor of that degree. |
| *The current discount value {0} is greater than the max discount value {1} of current employee* — «قيمة الخصم الحالي {0} أكبر من أقصى قيمة خصم {1} للموظف الحالي» | A discount on the invoice is above the *Max Discount 1/2 Value* on the current user's employee file. | Lower the discount, or have a user with a higher limit save the invoice. |
| *The current discount percentage {0} is greater than the max discount percentage {1} of current employee* — «نسبة الخصم الحالية {0} أكبر من أقصى نسبة خصم {1} للموظف الحالي» | The same for *Max Discount 1/2 Percentage*. | As above. |
| *Overhead item {0} is repeated in line {1}* — «بند التكلفة الغير مباشرة {0} مكرر في السطر {1}» | The invoice's overhead grid lists the same overhead item twice, typically after two services each brought the same item from the overhead list. | Delete the repeated row, or merge the two estimates into one row. |
| *You can not use overhead item {0} because it is already used in the same period in the document {1}* — «لا يمكنك استخدام بند التكلفة غير المباشرة {0} حيث أنه بالفعل مستخدم في نفس الفترة في المستند {1}» | Another saved Actual Overhead Calculation, dated inside this document's date and period range, already distributes the same overhead item; the message names it. | Remove the item from this document, or narrow the ranges so the two do not overlap — an overhead item is distributed once per period. |
| *You Must At Least Fill From Date - To Date Or From Period - To Period* — «يجب على الأقل ملء الحقول من تاريخ - إلى تاريخ أو من فترة إلى فترة» | **Collect Invoices And Overhead Items** was pressed with no range at all. | Fill a date, period, book or term range, then press it again. |
| *Patient Admission or From Date and To Date is Required* — «يجب إدخال استمارة الدخول أو من تاريخ إلى تاريخ» | **Collect Invoices** on a Change Patient Price Plan was pressed with neither an admission nor dates. | Choose the admission, or fill the date range. |
| *Patient is required* — «يجب إدخال مريض» | **Collect Invoices** was pressed before choosing the patient. | Choose the patient first. |
| *Repeated invoice {0}* — «الفاتورة {0} مكررة» | The same invoice is listed twice in the Change Patient Price Plan grid — a row added by hand for an invoice that is already there. | Delete the duplicate row, or clear the grid and collect again. |
| *Invoice {0} do not belong to patient {1}* — «الفاتورة {0} لا تخص المريض {1}» | A row in the grid names an invoice issued to a different patient — typically a row typed by hand, or left behind after the header patient was changed. | Press *Collect Invoices* again so only that patient's invoices are listed. |
