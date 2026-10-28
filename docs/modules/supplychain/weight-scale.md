---
description: "Setting up the Weight Scale Configuration (barcode formats and station terminals) and using the Issue Preparation Document to turn scale readings into stock movements, including what to do when the scale gives no reading."
entities: [WeightScaleConfig, WeightScalePreparationDoc, WeightScalePrepGenerator]
menu: Inventory → Weight Scale → Weight Scale Configuration
---
# Weight Scale

In facilities that handle bulk materials sold or received by weight - grains, concrete, aggregates, metals - the scale becomes part of the workflow. NaMa ERP connects electronic weight scales to receiving and loading stations, capturing weights directly and turning them into inventory movements without manual entry.

## Scale Configuration (WeightScaleConfig)

The **Weight Scale Configuration** is the central file that sets up scale terminals at receiving and loading stations. It configures:
- **Barcode formats**: up to five formats, each with its specifications and component parts, to read the item code, package, racks, and weight from the scale label.
- **Field mapping**: assigning field IDs for item code, package, racks, average time, and computed values.
- **Permissions**: a permissions matrix for scale operations and user roles.
- **Printing and connection**: the linked report definition, printer and port setup, and an inactivity logout timer.
- **Issue control**: stock-issue-request ordering methods and allowed quantity-deviation tolerance.

The scale app and the preparation generator read the first Weight Scale Configuration on file. Its fields, group by group:

| Field | Field id | What it does |
|---|---|---|
| Port Name/Number | `portName` | Required. The serial port the scale is plugged into. A port set in the station's own settings wins over this one. |
| Printer Name (CSV) | `printerName` | The printer the sticker goes to. A printer set in the station's own settings wins over this one. |
| Report Definition | `reportDefinition` | The sticker printed for each weighed line; it receives the preparation document, the line and its line code. With none, nothing is printed. |
| Logout Due To Inactivity For (In minutes) | `logoutDueToInactivityFor` | Logs the operator out of the scale app after this many idle minutes. Empty or zero never logs out. |
| Rack Code Field | `racksCodeField` | Required. The item field that holds the rack code shown to the operator. An item with no value there is refused. |
| Item Code | `itemCodeField` | The item field shown as the item code; empty shows the item's own code. |
| Package Field | `packageField` | The request-line field shown as the package. |
| Allowed Quantity Deviation Field / Default Quantity Deviation Percent | `qtyDeviationPercentField`, `defaultQtyDeviationPercent` | How far the weighed quantity may stray from the required quantity, as a percentage. The field is read from the request line; when it is empty or zero the default percentage applies. |
| Computed Field 1 / Computed Field 2 | `computedField1`, `computedField2` | Queries run against the stock issue request; their first row is shown on the scale screen as extra information. |
| Average Time Taken Field / Average Time Taken Query | `averageTimeTakenField`, `averageTimeTakenQuery` | How long each request line takes to prepare — a line field, or a query returning one row per line. The **Preparation Generator** adds these up and stops taking requests once the total reaches its execution time. |
| Authorities | `authorities` (`namaUser`, `allowLessThanRequiredQty`, `allowManualWeightEntry`) | Per user: **Allow Less Than Required Qty** lets them print the sticker even when the weighed quantity falls short of the required quantity, and **Allow Manual Weight Entry** lets them type a weight (see below). |
| Stock Issue Request Lines Order Methods | `stockIssueReqLinesOrderMethods` (`orderByField`, `orderByQuery`) | The order the generator lays request lines out in: each row adds one sort key, from a line field or from a query that returns one row per line. |
| Barcode Specifications 1–5 | `weightScaleBarcodeSpecs1` … `weightScaleBarcodeSpecs5` (`prefix`, `treatPrefixAsPartOfFirstProperty`, `minCodeLength`, `maxCodeLength`, `separator`) and their parts grids `parts1` … `parts5` (`property`, `separator`, `length`, `multiplyBy`, `divideOn`, `format`) | How a scanned barcode is read. The first specification whose prefix and minimum/maximum length fit the code is used, and its parts grid cuts the code into values. A code that fits none is refused. |

![Weight scale configuration screen in NaMa ERP](../../ar/modules/supplychain/images/weight-scale/weight-scale-config-en.png)

## Issue Preparation Document (WeightScalePreparationDoc)

The **Weight Scale Preparation Document** links the weight reading to the actual issue operation: it captures the weight from the scale and prepares the net quantity to be issued, so the data flows into the inventory movement without manual-entry errors. To generate these documents in quantities or batches, the **Preparation Generator** (WeightScalePrepGenerator) helps create them according to defined rules.

## How the Process Works

Imagine receiving a truck of grain:
1. The truck is weighed loaded (gross weight).
2. The load is unloaded.
3. The truck is weighed empty (tare weight).
4. The system computes the net weight automatically.
5. The **Preparation Document** captures the net value, and the corresponding inventory movement is created per the configuration.

This eliminates manual weight-entry errors and speeds up receiving and issuing at high-traffic locations.

### When the scale cannot give a reading

Sometimes the scale is out of order or the load cannot sit on it, and the operator has to type the weight. That is allowed only for users who have **Allow Manual Weight Entry** ticked on their line of the **Authorities** grid in the Weight Scale Configuration. For them the scale app shows a **Manual Weight** button: it stops reading the scale and asks *Enter net weight manually*. A typed weight counts as stable, so the sticker can be printed straight away; text that is not a number is refused with *Invalid weight value*, and the app goes back to reading the scale.

Every line of the preparation document records where its weight came from in the **Weight Sent By Device** column: ticked for a scale reading, clear for a typed one. Filter on it to review manual entries.

### Which lot a preparation line takes

When lots are collected for the lines of a Weight Scale Preparation Document, they are normally taken in the usual
lot order. Tick **Collect Lots From Smallest Sufficient Quantity, Otherwise From Largest** (group **Collect Lots** on the
document's term) to keep big lots intact: for each line the lot whose available quantity is the smallest one that still
covers the whole line is taken first; when no single lot covers it, the largest lot comes first and the same rule is
repeated for the rest.

## Actions on this screen

**On the Stock Issue Request and the Raw Material Issue Request:**

- **Split Line By Maximum Quantity** — breaks a long line into lines the scale can handle one by one. Tick the lines in
  the **Selected** column (or just stand on one line), press the action and enter the **Maximum Quantity Per Line**: a
  line of 2,500 kg split at 1,000 becomes lines of 1,000, 1,000 and 500, placed right under the original. The new lines
  start fresh — no line code, no status, no preparation document — and get their own line codes when the request is
  saved. Lines already *Packaged* or *Canceled* are left as they are. One split may create at most 200 lines.
  Split the line here rather than copying it on the preparation document: a copied line carries the same line code, and
  the preparation document refuses it.

**On the Weight Scale Preparation Generator:**

- **Documents To Prepare** — reads the document you are on and fills its grid with the documents that are waiting to be prepared on the scale, so you pick from a real list rather than searching for them.
- **Generate Weight Scale Preparation Documents** — the generator must be saved; it then creates the preparation documents for what the grid holds.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *You cannot delete a line whose status is Packaged* — «لا يمكن حذف سطر تم تعبئته» | A line was removed from a saved **Weight Scale Preparation Document** after it had already reached the *Packaged* status — the goods behind it have been weighed and packed. | Put the line back and save; deal with packed goods by a return or an adjustment rather than by deleting the line. |
| *Can not be deleted because line {0} status is packaged* — «لا يمكن حذف هذا المستند لان السطر {0} تم تعبئته بالفعل» | The whole preparation document is being deleted while one of its lines is *Packaged*. The message gives the line number. | The document cannot be deleted once anything on it has been packed — cancel it through the flow instead. |
| *The [Average Time Taken Field] returned {0} rows for the issue request {1}, it should return {2} rows* — «تم إيجاد عدد سطور {0} للحقل {الوقت المستغرق} في طلب الصرف المخزني {1}, ولكن ينبغي أن يوجد {2} سطر» | The **Average Time Taken Field** in the scale configuration reads a field on the issue request, and it gave back a different number of values than the request has lines, so the generator cannot pair them up. | Point the setting at a field that sits on the request's own lines, so it yields exactly one value per line. |
| *The field {Average Time Taken Query} returned {0} rows for the issue request {1}, it should return {2} rows* — «تم إيجاد عدد سطور {0} للحقل {إستعلام الوقت المستغرق} في طلب الصرف المخزني {1}, ولكن ينبغي أن يوجد {2} سطر» | The same mismatch when the average time comes from the configuration's **Average Time Taken Query** instead of a field — the query returned the wrong number of rows. | Fix the query so it returns one row per line of the issue request. |
| *The {Order By Field} returned {0} rows for the issue request {1}, it should return {2} rows* — «تم إيجاد عدد سطور {0} للحقل {الترتيب بناءاً على حقل} في طلب الصرف المخزني {1}, ولكن ينبغي أن يوجد {2} سطر» | The same mismatch on one of the sorting rules: an **Order By Field** in the configuration's ordering methods did not yield one value per line. | Use a line-level field in the ordering method, or remove that ordering line. |
| *Please select the line you want to split* — «من فضلك اختر السطر المراد تقسيمه» | **Split Line By Maximum Quantity** was pressed with no line ticked and no line under the cursor. | Tick the lines in **Selected**, or click a line, then press the action again. |
| *Maximum quantity per line must be greater than zero* — «أقصى كمية للسطر يجب أن تكون أكبر من صفر» | The **Maximum Quantity Per Line** was left empty, zero or negative. | Enter a positive quantity. |
| *You cannot split a line whose status is Packaged or Canceled* — «لا يمكن تقسيم سطر حالته تم التعبئة أو ألغيت» | Every line you chose has already been packed or canceled at the scale. When only some of them are, the others are split and you see *Lines whose status is Packaged or Canceled were not split* — «لم يتم تقسيم السطور التي حالتها تم التعبئة أو ألغيت». | Nothing to do for packed or canceled lines; choose the lines still waiting. |
| *Splitting would create too many lines. Please increase the maximum quantity per line* — «التقسيم سينشئ عدداً كبيراً جداً من السطور. من فضلك قم بزيادة أقصى كمية للسطر» | The line quantity divided by the maximum gives more than 200 lines. | Enter a larger maximum quantity per line. |
| *Line code {0} is repeated at line {1}. Split the line from the issue request instead of copying it* — «كود السطر {0} مكرر في السطر {1}. قم بتقسيم السطر من طلب الصرف بدلاً من نسخه» | A new line on the preparation document was copied from another one, so both carry the same line code, which must be unique. | Delete the copy and split the line on the issue request with **Split Line By Maximum Quantity**. |
| *Already prepared* — «تم التحضير بالفعل» | Every line of every issue request in the generator's grid is already attached to a preparation document, so there is nothing left to prepare. | Refresh the grid with **Documents To Prepare**; the requests you are looking at have been through the scale already. |
| *Maximum execution time for each weight preparation document is zero. Please check average execution time of issue requests Lines* — «أقصى وقت تنفبذ لسند تحضير الميزان صفر. يرجى مراجعة متوسط وقت التنفيذ لسطور طلبات الصرف» | The generator adds up the average execution time of the lines it is about to prepare and gets zero, so it has no basis on which to split them into documents. | Fill the average time — through the field or the query in the scale configuration — on the issue request lines, then generate again. |

## Next Steps

- [Receiving Stock](./receiving-stock.md) - receiving weighed bulk materials
- [Issuing Stock](./issuing-stock.md) - issuing materials by net weight
- [Understanding Inventory Items](./understanding-items.md) - items with weight measurement
