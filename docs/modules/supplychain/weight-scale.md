---
description: "Setting up the Weight Scale Configuration (barcode formats and authorities) and using the Weight Scale Preparation Document to weigh the lines of issue requests and turn them into stock issues, including what to do when the scale gives no reading."
entities: [WeightScaleConfig, WeightScalePreparationDoc, WeightScalePrepGenerator]
menu: Inventory → Weight Scale → Weight Scale Configuration
---
# Weight Scale

In facilities that issue goods by weight - grains, concrete, aggregates, metals - the scale becomes part of the workflow. NaMa ERP connects an electronic scale to the issue side of the warehouse: the lines of a **Stock Issue Request** or a **Raw Material Issue Request** are weighed at the **Weight Scale Station**, each weighed line is recorded on a **Weight Scale Preparation Document** with a printed sticker, and the stock issue can be generated from the weighed lines. The **Weight Scale** menu (under Inventory) needs the `supplychain-weight-scale` licence.

## Scale Configuration (WeightScaleConfig)

The **Weight Scale Configuration** holds the barcode specifications the station uses to read a line's barcode, the item and line fields shown to the operator, the per-user authorities, the port, printer and sticker report, and the rules the Preparation Generator uses to order and size its work. The scale app and the preparation generator read the first Weight Scale Configuration on file. Its fields, group by group:

| Field | Field id | What it does |
|---|---|---|
| Port Name/Number | `portName` | Required. The serial port the scale is plugged into. A port set in the station's own settings wins over this one. |
| Printer Name (CSV) | `printerName` | The printer the sticker goes to. A printer set in the station's own settings wins over this one. |
| Report Definition | `reportDefinition` | The sticker printed for each weighed line; it receives the preparation document, the line and its line code. With none, nothing is printed. |
| Logout Due To Inactivity For (In minutes) | `logoutDueToInactivityFor` | Logs the operator out of the scale app after this many idle minutes. Empty or zero never logs out. |
| Rack Code Field | `racksCodeField` | Required. The item field that holds the rack code shown to the operator. An item with no value there is refused. |
| Item Code | `itemCodeField` | The item field shown as the item code; empty shows the item's own code. |
| Package Field | `packageField` | The request-line field shown as the package. |
| Allowed Quantity Deviation Field / Default Quantity Deviation Percent | `qtyDeviationPercentField`, `defaultQtyDeviationPercent` | How far above the required quantity the weighed quantity may go, as a percentage of the required quantity. The station accepts a weight from the required quantity up to the required quantity plus this margin. The field is read from the request line; when it is empty or zero the default percentage applies. |
| Computed Field 1 / Computed Field 2 | `computedField1`, `computedField2` | Queries run against the stock issue request; their first row is shown on the scale screen as extra information. |
| Average Time Taken Field / Average Time Taken Query | `averageTimeTakenField`, `averageTimeTakenQuery` | How long each request line takes to prepare — a line field, or a query returning one row per line. The **Preparation Generator** adds these up and stops taking requests once the total reaches its execution time. |
| Authorities | `authorities` (`namaUser`, `allowLessThanRequiredQty`, `allowManualWeightEntry`) | Per user: **Allow Less Than Required Qty** lets them print the sticker even when the weighed quantity falls short of the required quantity, and **Allow Manual Weight Entry** lets them type a weight (see below). |
| Stock Issue Request Lines Order Methods | `stockIssueReqLinesOrderMethods` (`orderByField`, `orderByQuery`) | The order the generator lays request lines out in: each row adds one sort key, from a line field or from a query that returns one row per line. |
| Barcode Specifications 1–5 | `weightScaleBarcodeSpecs1` … `weightScaleBarcodeSpecs5` (`prefix`, `treatPrefixAsPartOfFirstProperty`, `minCodeLength`, `maxCodeLength`, `separator`) and their parts grids `parts1` … `parts5` (`property`, `separator`, `length`, `multiplyBy`, `divideOn`, `format`) | How a scanned barcode is read. The first specification whose prefix and minimum/maximum length fit the code is used, and its parts grid cuts the code into values: each part is a **Line Code**, a **Weight Package** or a **Cart Route**. The line code finds the issue request line to weigh. A code that fits none is refused. |

![Weight scale configuration screen in NaMa ERP](../../ar/modules/supplychain/images/weight-scale/weight-scale-config-en.png)

## Issue Preparation Document (WeightScalePreparationDoc)

The **Weight Scale Preparation Document** records what was weighed for the lines of an issue request. Each of its lines carries the request line's **Line Code**, the weighed quantity, the **Empty Weight** (the package), the **Gross Weight** (quantity plus empty weight), a status, the **Measurer** and the **Packaging Date And Time**. The station creates the document from the request the first time one of its lines is weighed; the **Weight Scale Preparation Documents Generator** (WeightScalePrepGenerator) creates them ahead of time, in batches, for the requests waiting to be weighed.

## How the Process Works

Imagine a warehouse issuing cement in bags against stock issue requests:
1. The **Stock Issue Request** (or **Raw Material Issue Request**) lists what is to be issued; each line gets its own **Line Code** when the request is saved.
2. Optionally, the generator gathers the waiting requests and splits their lines into preparation documents.
3. At the **Weight Scale Station** the operator scans the line's barcode, then scans the rack code, which must equal the item's value in the configuration's **Rack Code Field** (otherwise *Invalid rack code*).
4. The operator tares the package, places the goods and waits for a stable reading. The sticker can be printed only when the net weight lies between the required quantity and the required quantity plus the allowed deviation; a user with **Allow Less Than Required Qty** can force it below the required quantity.
5. The weighed line is written to the preparation document with the status *Packaged*, the request line shows the same status, and the sticker report is printed.
6. When **Generate Document(s)** is ticked in the generation settings of the preparation document's term, the packaged lines are issued by a **Stock Issue** (a **Raw Materials Issue** for a raw material request) generated from the request and kept in step with the packaged lines.

A line that was already weighed is refused at the station with *Weighted before*.

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

**On the Weight Scale Preparation Documents Generator:**

- **Documents To Prepare** — reads the document you are on and fills its grid with the documents that are waiting to be prepared on the scale, so you pick from a real list rather than searching for them.
- **Generate Weight Scale Preparation Documents** — the generator must be saved; it then creates the preparation documents for what the grid holds.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *You cannot delete a line whose status is Packaged* — «لا يمكن حذف سطر تم تعبئته» | A line was removed from a saved **Weight Scale Preparation Document** after it had already reached the *Packaged* status — the goods behind it have been weighed and packed. | Put the line back and save; deal with packed goods by a return or an adjustment rather than by deleting the line. |
| *Can not be deleted because line {0} status is packaged* — «لا يمكن حذف هذا المستند لأن السطر {0} تم تعبئته بالفعل» | The whole preparation document is being deleted while one of its lines is *Packaged*. | The document cannot be deleted once anything on it has been packed — cancel it through the flow instead. |
| *The [Average Time Taken Field] returned {0} rows for the issue request {1}, it should return {2} rows* — «تم إيجاد عدد سطور {0} للحقل {الوقت المستغرق} في طلب الصرف المخزني {1}, ولكن ينبغي أن يوجد {2} سطر» | The **Average Time Taken Field** in the scale configuration reads a field on the issue request, and it gave back a different number of values than the request has lines, so the generator cannot pair them up. | Point the setting at a field that sits on the request's own lines, so it yields exactly one value per line. |
| *The field {Average Time Taken Query} returned {0} rows for the issue request {1}, it should return {2} rows* — «تم إيجاد عدد سطور {0} للحقل {استعلام الوقت المستغرق} في طلب الصرف المخزني {1}, ولكن ينبغي أن يوجد {2} سطر» | The same mismatch when the average time comes from the configuration's **Average Time Taken Query** instead of a field — the query returned the wrong number of rows. | Fix the query so it returns one row per line of the issue request. |
| *The {Order By Field} returned {0} rows for the issue request {1}, it should return {2} rows* — «تم إيجاد عدد سطور {0} للحقل {الترتيب بناءً على حقل} في طلب الصرف المخزني {1}, ولكن ينبغي أن يوجد {2} سطر» | The same mismatch on one of the sorting rules: an **Order By Field** in the configuration's ordering methods did not yield one value per line. | Use a line-level field in the ordering method, or remove that ordering line. |
| *Please select the line you want to split* — «من فضلك اختر السطر المراد تقسيمه» | **Split Line By Maximum Quantity** was pressed with no line ticked and no line under the cursor. | Tick the lines in **Selected**, or click a line, then press the action again. |
| *Maximum quantity per line must be greater than zero* — «أقصى كمية للسطر يجب أن تكون أكبر من صفر» | The **Maximum Quantity Per Line** was left empty, zero or negative. | Enter a positive quantity. |
| *You cannot split a line whose status is Packaged or Canceled* — «لا يمكن تقسيم سطر حالته تم التعبئة أو ألغيت» | Every line you chose has already been packed or canceled at the scale. When only some of them are, the others are split and you see *Lines whose status is Packaged or Canceled were not split* — «لم يتم تقسيم السطور التي حالتها تم التعبئة أو ألغيت». | Nothing to do for packed or canceled lines; choose the lines still waiting. |
| *Splitting would create too many lines. Please increase the maximum quantity per line* — «التقسيم سينشئ عدداً كبيراً جداً من السطور. من فضلك قم بزيادة أقصى كمية للسطر» | The line quantity divided by the maximum gives more than 200 lines. | Enter a larger maximum quantity per line. |
| *Line code {0} is repeated at line {1}. Split the line from the issue request instead of copying it* — «كود السطر {0} مكرر في السطر {1}. قم بتقسيم السطر من طلب الصرف بدلاً من نسخه» | A new line on the preparation document was copied from another one, so both carry the same line code, which must be unique. | Delete the copy and split the line on the issue request with **Split Line By Maximum Quantity**. |
| *Already prepared* — «تم التحضير بالفعل» | Every line of every issue request in the generator's grid is already attached to a preparation document, so there is nothing left to prepare. | Refresh the grid with **Documents To Prepare**; the requests you are looking at have been through the scale already. |
| *Maximum execution time for each weight preparation document is zero. Please check average execution time of issue requests Lines* — «أقصى وقت تنفيذ لسند تحضير الميزان صفر. يرجى مراجعة متوسط وقت التنفيذ لسطور طلبات الصرف» | The generator adds up the average execution time of the lines it is about to prepare and gets zero, so it has no basis on which to split them into documents. | Fill the average time — through the field or the query in the scale configuration — on the issue request lines, then generate again. |

## Next Steps

- [Receiving Stock](./receiving-stock.md) - bringing the materials into the warehouse
- [Issuing Stock](./issuing-stock.md) - issuing materials by net weight
- [Understanding Inventory Items](./understanding-items.md) - items with weight measurement
