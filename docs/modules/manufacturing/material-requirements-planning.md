---
description: "The MRP document: how the calculation works, its prerequisites (items, BOM, routing, warehouses, scenarios, terms) and the workflow from collecting demand to planned production and purchase lines."
entities: [MRPDocument, Scenario, MRPAvailableQtySource, ManualDemand, MRPSalesForecasting]
menu: Manufacturing → Material Resource Planning → planning raw materials Document
---
# Material Requirements Planning: Working Out What to Buy and When

## The Question MRP Answers

A customer orders 50 desks for delivery in six weeks. You know what a desk is made of, because the [BOM](/modules/manufacturing/manufacturing-bom) says so: a laminated top panel and a powder-coated steel frame. You also know the panel is made of chipboard and laminate sheet, and the frame of steel tube and powder coat. And you know that steel tube takes three weeks to arrive from your supplier.

So: do you need to order steel tube today, or not? And how much, given that you already have some in the store, some on order, and a safety stock level you would rather not dip below?

That question is easy to get wrong and tedious to get right, and it multiplies. Fifty desks is four component types and one purchase decision. A month's order book across a real product range is thousands of them, each with its own lead time, its own stock position, and its own dependency on something else being made first. **Material Requirements Planning** is the machinery for answering all of them at once.

You'll find the MRP document under **Manufacturing → Material Resource Planning → planning raw materials Document** (التصنيع ← تخطيط موارد ← سند تخطيط).

![The MRP document screen](../../ar/modules/manufacturing/images/mrp/mrp-document-en.png)

::: info Required license
MRP is part of the `manufacturing-mrp` license, a sub-license of the Manufacturing module. It covers every screen under **Manufacturing → Material Resource Planning**: the planning document, scenarios, available-quantity sources, sales forecasts, manual demand and MRP purchase requests. Without it that menu does not appear, even when the core `manufacturing` license is on.
:::

## How the Calculation Thinks

Underneath all the fields, MRP does one thing repeatedly, and it is worth understanding before you use the screen — because when a result surprises you, it is almost always one of these steps that explains it.

**It starts with demand, and demand comes in two flavours.** *Independent* demand is what the outside world asks for: sales orders, forecasts, manually entered requirements. *Dependent* demand is what the first kind implies — you did not order 200 table legs, but 50 desks means 200 legs, and that is a requirement just as real as the customer's.

**It explodes.** Starting from finished-product demand, it works down the BOM tree level by level, turning each product requirement into component requirements, until it reaches things that are bought rather than made. Fifty desks becomes fifty top panels and fifty frames; fifty frames becomes so many metres of steel tube.

**It nets off what you already have.** A gross requirement for 200 legs is not a purchase order for 200 legs. Subtract what is in stock, subtract what is already on order and due in time, add back whatever safety stock you have decided to protect, and the remainder is the *net* requirement — the amount that genuinely has to be created.

**It works backwards from the date.** This is the part that makes MRP more than a shopping list. If the desks ship in six weeks, the frames must be finished before that, so the steel tube must arrive before *that*, so the purchase order must be raised three weeks earlier still. Lead times turn a quantity into a date, and the date is usually the more actionable half of the answer.

**It rounds to how you actually buy and make.** Net requirements rarely match the sizes the world deals in. Lot sizing applies the real constraints — a fixed batch size, a supplier minimum, or lot-for-lot where you simply take exactly what you need.

::: tip When a result looks wrong, walk the five steps
Nearly every "MRP is telling me nonsense" turns out to be one of these: demand that was not collected, a BOM level that does not explode because a sub-assembly has no BOM, stock netted from a warehouse you did not mean to include, a lead time nobody has maintained, or a lot size rounding a requirement up. Checking them in that order is faster than staring at the result.
:::

## The Pieces in Nama

The **MRP Document** (سند تخطيط) is where all of this happens — one document per planning run, holding the demand it collected, the analysis it performed, and the orders it proposes.

It draws on files you will already recognise, plus a few that exist only for planning:

| Screen | Arabic | What it contributes |
|---|---|---|
| BOM | مكونات منتج | The component structure that gets exploded |
| Routing | عملية تشغيل | The operations, and the manufacturing time they imply |
| Sales Order | أمر بيع | Real customer demand |
| Sales Forecast Document | سند توقعات | Predicted demand, for planning beyond the order book |
| Manual Demand Document | سند طلب يدوي | Requirements entered by hand that no other document carries |

The forecast and manual demand documents deserve a note. Planning only from confirmed sales orders means never ordering anything with a lead time longer than your order visibility — which for most manufacturers means never ordering anything useful in time. Forecasts are how you plan past the edge of what customers have actually committed to, and manual demand is the escape hatch for requirements that are real but have no document of their own.

## Prerequisites

Before using MRP in Nama ERP, ensure the following master data is configured:

### 1. Items Configuration

For each item, configure:
- ✅ **Primary UOM** (Unit of Measure)
- ✅ **Manufacturing Lead Time** (for manufactured items)
- ✅ **Purchase Lead Time** (for purchased items)
- ✅ **Safety Stock** settings
- ✅ **Minimum Order Quantity**
- ✅ **Manufacturable Flag** (check if item can be manufactured)

### 2. Bill of Materials (BOM)

For manufactured items, create BOMs with:
- Component items and quantities
- Batch size (lot size)
- Associated routing
- Specific dimensions (if applicable)
- Default BOM flag

### 3. Routing

For manufactured items, create routings with:
- Operation sequence
- Resources required
- Time estimates
- Associated BOM (optional)

### 4. Available quantities

The analysis does not read stock balances by itself. Decide where the quantities already on hand come from: an **MRP Available Quantity Source** naming the warehouses to count, the **Available Quantities Query** and **Potential Available Query** of a **Scenario**, or the remaining quantities of a **Previous MRP Document**. With none of them, every item starts with nothing available (see [Understanding Available Quantities](#Step-5-Review-Analysis-Results)).

### 5. Scenarios (Optional)

Create MRP scenarios for:
- Different planning horizons
- What-if analysis
- Custom available quantity calculations

### 6. Document Terms

Configure MRP document terms with the book (and term) of each document the run will generate:
- MRP Purchase Request book/term
- Purchase order book/term
- Item request book/term
- Production order book/term
- Production order request book

Every one of these books must be auto-coded.

---

## MRP Document Workflow

The MRP process in Nama ERP follows this workflow:

### Step 1: Create MRP Document

1. Navigate to: **Manufacturing > Material Resource Planning > planning raw materials Document**
2. Click **New** to create a new MRP document
3. Fill in header information:

#### Header Fields

| Field | Arabic Name | Description |
|-------|-------------|-------------|
| **Code** | الكود | Auto-generated document code |
| **Value Date** | التاريخ | Document date |
| **From Date** | من تاريخ | Start date for demand collection |
| **To Date** | إلى تاريخ | End date for demand collection |
| **Aggregation Period Type** | نوع فترة التجميع | How to group requirements (Daily, Weekly, Monthly, Quarter, Yearly) |
| **Sales Forecast Field Type** | نوع الحقل المتعامل عليه | For sales forecast lines: use the Actual or the Forecasted quantity of each forecast period (Forecasted when empty) |
| **Scenario** | سيناريو | Optional scenario for what-if analysis |
| **Previous MRP Document** | سند التخطيط السابق | Link to previous MRP run (for rolling planning) |
| **Safety Stock Periods Calculation Method** | طريقة حساب فترات الSafty Stock | Used for items whose safety stock is counted in periods (see [Safety Stock Calculation Methods](#Safety-Stock-Calculation-Methods)) |
| **Available Quantity Source** | مصدر الكميات المتاحة | The MRP Available Quantity Source that decides which warehouses count as available |
| **Purchase Doc Type** | نوع مستند الشراء المنشأ | Type of purchase document to generate: MRP Purchase Request (the default), Purchase Order or Item Request |
| **Production Doc Type** | نوع مستند الإنتاج المنشأ | Type of production document to generate: Production Order Request (the default) or Production Order |

::: tip Aggregation Period
The **Aggregation Period Type** determines how demand is grouped:
- **Daily**: Separate requirements for each day
- **Weekly**: Group requirements by week
- **Monthly**: Group requirements by month (recommended for most scenarios)
- **Quarter**: Group by quarter
- **Yearly**: Group by year
:::

### Step 2: Collect Demand

After filling header information, click the **Collect** button.

#### Collect Dialog Parameters

The system will prompt you to select which demand sources to include:

- ☑️ **Include Sales Orders** (تضمين أوامر البيع)
  - Includes confirmed customer orders within the date range

- ☑️ **Include Manual Demands** (تضمين الطلبات اليدوية)
  - Includes manually created demand documents

- ☑️ **Include Forecasts** (تضمين التوقعات)
  - Includes sales forecast documents

::: warning Important
**From Date** and **To Date** are required, and at least one demand source must be ticked. Otherwise collecting stops with *From date and to date are required* — «يجب ادخال قيم من تاريخ و إلى تاريخ» — or *You must include one or more of the document types* — «يجب إختيار نوع أو أكثر من أنواع المستندات الواجب تجميعها».
:::

#### What Happens During Collection

The system will:
1. Search for demand documents within the specified date range
2. Extract item requirements from each document
3. Populate the **Lines** (التفاصيل) collection with demand sources
4. Create **Required Lines** (الاحتياجات) by aggregating demand according to the aggregation period

### Step 3: Review Required Lines

After collection, review the **Desired** (مطلوب) tab. Its grid shows, for each required line, the **Item**, the **Required Quantity** (UOM and value) and **Required On**, the **BOM** and **Routing** to use, and — once the analysis has run — the line's analysis figures (**Analysis | Safety Stock**, **Analysis | Available**, **Analysis | Potential Available**, **Analysis | Total Required**, **Analysis | Batch Size**, **Analysis | Batches Count**, **Analysis | Net Required**, **Analysis | Order On**, **Analysis | Final Net Required**, **Analysis | Remaining**).

::: tip Manual Adjustments
You can manually edit:
- **BOM** and **Routing** selections for specific items
- **Updated Net Required** (صافي المطلوب المعدل): Override calculated net requirement
- **Updated Batches Count** (عدد الباتش المعدل): Specify exact number of batches to produce
:::

### Step 4: Analyze Requirements

Click **Analyze Requirements** (تحليل المطلوب) to perform MRP explosion.

::: warning Save First
The document must be saved before you can run the analysis.
:::

#### What Happens During Analysis

The system performs these calculations:

1. **For Each Required Line:**
   - Fetches the BOM (if item is manufacturable): the one on the line, otherwise the item's default BOM, otherwise its first BOM
   - Fetches the Routing: the one on the line, otherwise the BOM's routing, otherwise the item's first routing. A manufacturable item with no routing or no BOM stops with *There is no routing defined for item {0}* — «لا يوجد عمليات تشغيل للصنف {0}» — or *There is no BOM defined for item {0}* — «لا يوجد مكونات منتج للصنف {0}»
   - Calculates available quantity
   - Calculates safety stock
   - Determines net requirement

2. **Net Requirement Calculation:**
   ```
   Net Requirement = Required Qty + Safety Stock - (Available Qty + Potential Available)
   ```

3. **Batch Size Calculation:**
   - If BOM has a batch size, calculates number of batches needed
   - Adjusts net requirement to whole batches
   - Considers minimum order quantities

4. **MRP Explosion:**
   - For manufactured items, explodes BOM to find component requirements
   - Recursively analyzes component requirements (dependent demand)
   - Considers lead times to calculate order dates

5. **Creates Analysis Lines:**
   - One analysis line for each item-period-dimension combination
   - Links parent-child relationships for BOM explosions

### Step 5: Review Analysis Results

After analysis completes, review the **Analysis** (التحليل) tab:

#### Analysis Line Fields

| Field | Arabic Name | Description |
|-------|-------------|-------------|
| **Item** | الصنف | Item being analyzed |
| **Required On** | تاريخ الاحتياج | Date needed |
| **Order On** | تاريخ الطلب | Date to order (considers lead time) |
| **Required Quantity** | الكمية المطلوبة | Gross requirement |
| **Available** | المتاح | Currently available quantity |
| **Potential Available** | المحتمل أن يكون متاح | Expected to be available |
| **Safety Stock** | Safety Stock | Safety stock requirement |
| **Total Required** | إجمالي المطلوب | Required + Safety Stock − Available − Potential Available, before batch and minimum-order rounding |
| **Net Required** | صافي المطلوب | Net requirement after rounding to batches and the minimum order quantity |
| **Final Net Required** | صافي المطلوب النهائي | Final requirement including manual edits |
| **Batch Size** | كمية الشحنة | Production batch size |
| **Batches Count** | عدد الشحنات | Number of batches to produce |
| **Remaining** | المتبقي | Quantity remaining after fulfilling requirement |
| **BOM** | مكونات المنتج | Bill of materials used |
| **Routing** | عملية التشغيل | Routing used |

::: details Understanding Available Quantities
**Available** and **Potential Available** for an item are taken, in this order:
1. From the **Previous MRP Document**: the **Remaining** of the item's analysis line there (for rolling planning).
2. From the **Available Quantity Source**, if one is set and gives a quantity: the item's stock balance in the warehouses and locators its lines name, as Total Available or as Predicted Purchase.
3. From the **Scenario**: the results of its **Available Quantities Query** and **Potential Available Query**.
4. Otherwise zero.

Once an item has been analysed, its next line in the same run starts from the **Remaining** of the previous one.
:::

### Step 6: Review Planned Orders

The analysis automatically generates planned orders in two tabs:

#### Planned Production Lines (خطوط الإنتاج المخطط)

Contains production orders to be created. An item whose BOM has a batch size gets one line per batch, each for the batch size, unless the scenario has **Create Single Production Order Without Considering Batch Size** ticked, which makes it one line for all the batches. Lines for the same item and date that do not come from batches are combined into one:

| Field | Description |
|-------|-------------|
| **Selected** | Check to include in document generation |
| **Item** | Item to produce |
| **Quantity** | Quantity to produce |
| **Date** | Production date (considering lead time) |
| **BOM** | Bill of materials to use |
| **Routing** | Routing to use |
| **Warehouse** | Production warehouse |
| **Order Type** | Production Order or Production Order Request |
| **Doc** | Generated document (after generation) |

#### Planned Purchase Lines (خطوط الشراء المخطط)

Contains purchase orders to be created:

| Field | Description |
|-------|-------------|
| **Selected** | Check to include in document generation |
| **Item** | Item to purchase |
| **Quantity** | Quantity to purchase |
| **Date** | Purchase date (considering lead time) |
| **Supplier** | Preferred supplier (if configured) |
| **Warehouse** | Receiving warehouse |
| **Order Type** | MRP Purchase Request, Purchase Order or Item Request |
| **Doc** | Generated document (after generation) |

::: tip Filtering Planned Lines
Planned lines are separated into:
- **Manufacturable items** → Planned Production Lines
- **Purchased items** → Planned Purchase Lines

Items are classified based on the **Manufacturable** flag on the item master.
:::

### Step 7: Generate Purchase and Production Orders

#### Select Lines to Generate

1. Review planned production and purchase lines
2. Check the **Selected** checkbox for lines you want to generate
3. Each tab has a **Select / Deselect All** button (تحديد / إلغاء الكل). It flips every line — ticked lines become unticked and unticked ones ticked — so press it on a tab where nothing is ticked yet to select everything

#### Generate Documents

Click one of these action buttons:

- **Generate Production Orders** (إنشاءأوامر الإنتاج)
  - Creates production documents from selected production lines
  - One document per line (by default)

- **Generate Purchase Orders** (إنشاء أوامر الشراء)
  - Creates purchase documents from selected purchase lines
  - One document per line (by default)

- **Generate Single Purchase Order For All Selected Lines** (إنشاء أمر شراء واحد بكل السطور المختارة)
  - Consolidates all selected purchase lines into one purchase document
  - Every selected purchase line goes into that one document; select at least one line first

::: warning Document Terms Required
Ensure the MRP document's term names the books (and terms) for the documents you generate:
- MRP Purchase Request
- Purchase Order
- Item Request
- Production Order
- Production Order Request (book only)

A missing one stops the generation with a message naming it, such as *To generate Purchase Order doc ,Please select book and term of the Purchase Order in The term of this Document* — «لإنشاء أمر الشراء , من فضلك قم باختيار الدفتر والتوجيه الخاص به من توجيه هذا المستند». A book that is not auto-coded is refused with *In this document term the book of {0} must be Auto* — «في توجيه هذا المستند , لابد أن يكون تكويد دفتر {0} آلي».
:::

#### After Document Generation

- Generated documents are linked in the **Doc** field of each planned line
- Generated documents are saved straight away, with codes from their auto-coded books
- The **Selected** checkbox is cleared on every planned line when **Remove Selections In Mrp Document After Generation** is ticked in the manufacturing configuration

::: tip Reviewing Generated Documents
Click the document reference in the **Doc** field to open and review the generated document.
:::

---

## Understanding MRP Results

### Reading the Analysis Tab

The analysis tab shows the complete MRP explosion with all levels of BOM:

```
Level 0: Finished Product (from sales orders/forecasts)
    ├─ Level 1: Sub-assembly 1
    │       ├─ Level 2: Component A
    │       └─ Level 2: Component B
    └─ Level 1: Raw Material C
```

**Hierarchical Relationships:**
- **Parent Analysis Line ID**: Links to parent in BOM structure
- **Master Row ID**: Links back to the original required line
- **Parent BOM**: The BOM that generated this requirement

### Net Requirement Calculation Logic

The system calculates net requirements using this logic:

```
1. Start with Gross Requirement (from demand)
2. Add Safety Stock
3. Subtract Available Quantity
4. Subtract Potential Available (incoming purchases/production)
5. Result = Net Requirement (if positive)
```

If the item has a **batch size**:
```
6. Calculate batches needed = CEILING(Net Requirement / Batch Size)
7. Final Net Requirement = Batches Needed × Batch Size
```

If the item has a **minimum order quantity**:
```
8. Final Net Requirement = CEILING(Net Requirement / Min Order Qty) × Min Order Qty
```

### Safety Stock Calculation Methods

The item's **Safety Stock Calculation Type** is **Quantity**, **Periods Count** or **None** (no safety stock). With **Periods Count**, the MRP document's **Safety Stock Periods Calculation Method** picks one of three ways (**Required In Current Period** when it is empty):

#### 1. Quantity-Based
- Fixed quantity specified on item master
- Simple and straightforward
- Best for stable demand items

#### 2. Periods Count - Required In Current Period
- Safety stock = Required Qty × the item's **Safety Stock**
- Example: If required qty = 100 and Safety Stock = 0.2, safety stock = 20

#### 3. Periods Count - Next Periods
- Looks ahead at the item's next N required lines, N being the item's **Safety Stock**
- Sums their required quantities; when fewer than N follow, the last one is counted again for each missing period
- More dynamic, responds to demand patterns

#### 4. Periods Count - Plan Average
- Calculates the item's average required quantity across its required lines
- Multiplies it by the item's **Safety Stock**
- Smooths out demand variability

::: tip Configuring Safety Stock
Configure safety stock method on the Item master:
- **Safety Stock Calculation Type**: Choose the method
- **Safety Stock**: The quantity or factor (depending on method)
- **Order Limit**: Fallback if safety stock is not set (Quantity type only)
:::

### Understanding Lead Times

Lead times affect the **Order On** date calculation:

```
Order Date = Required Date - Lead Time
```

**For Manufactured Items:**
- Uses **Manufacturing Lead Time** from item master
- Example: Required on March 15, Lead time = 5 days → Order on March 10

**For Purchased Items:**
- Uses **Purchase Lead Time** from item master
- Example: Required on March 15, Lead time = 10 days → Order on March 5

::: warning Lead Time Units
Lead times can be specified in:
- Days
- Weeks
- Months

Ensure the UOM (Unit of Measure) is correctly set on the lead time field.
:::

---

## Generating Production and Purchase Orders

### Document Generation Process

When you click generate buttons, the system:

1. **Validates Configuration**
   - Checks document terms are configured
   - Verifies books have auto-coding enabled
   - Validates required fields

2. **Creates Documents**
   - Instantiates appropriate document type
   - Sets book and term from MRP document term config
   - Copies dimensions from MRP document

3. **Populates Document Lines**
   - For purchase documents: Creates purchase lines from planned lines
   - For production documents: Creates production order with BOM components

4. **Sets Document Details**
   - Value date from planned line date
   - Warehouse from planned line
   - Supplier (for purchase documents)
   - BOM and routing (for production documents)

5. **Commits Documents**
   - Automatically commits documents
   - Links generated documents back to planned lines
   - Saves the MRP document again

### Production Order Generation

For each selected production line, the system creates:

**Production Order Header:**
- Item to produce
- Quantity
- BOM and Routing
- Warehouse

**Production Order Components:**
- Exploded from BOM
- Quantities calculated based on production quantity
- Considers yield and potency factors

**Production Order Co-Products:**
- Copied from BOM co-products
- Quantities proportionally calculated

**Production Order Resources:**
- Copied from routing resources
- Time calculated based on quantity

**Production Order Operations:**
- Copied from routing operations
- Sequenced according to routing

### Purchase Order Generation

For each selected purchase line, the system creates:

**Purchase Document Header:**
- Supplier (if specified)
- Warehouse
- Fiscal period

**Purchase Document Lines:**
- Item to purchase
- Quantity
- Value date from planned date
- Price (blank - to be filled manually)

::: tip Consolidating Purchase Orders
Use **Generate Single Purchase Order For All Selected Lines** to:
- Create one purchase document for multiple items
- Reduce number of purchase orders
- Easier to manage with suppliers

All selected purchase lines will be combined into a single document.
:::

### Handling Generated Documents

After generation:

1. **Review Generated Documents**
   - Click document reference to open
   - Review quantities and dates
   - Add pricing information (for purchases)
   - Verify BOM/routing selection (for production)

2. **Edit if Needed**
   - Documents are created and committed automatically
   - Use "Start Editing" if changes are needed
   - Make adjustments
   - Commit again

3. **Track Generation**
   - Generated documents have **From Doc** pointing to MRP document
   - Can regenerate if needed (see below)

::: warning Regeneration Behavior
If you generate again:
- A selected planned line that already has a document of its order type in **Doc** updates that document instead of creating a new one
- Every other document of the same family that this MRP document generated earlier (production orders and production order requests, or purchase orders and item requests) — those with **From Doc** = this MRP document — is **deleted**
- A document that cannot be deleted, because other documents depend on it, stops the generation with the deletion's own message

Deleting the MRP document deletes the production orders, production order requests, purchase orders and item requests it generated.
:::

---

## Advanced Features

### 1. Rolling MRP Planning

Use **Previous MRP Document** to link MRP runs:

**Benefits:**
- Carries forward remaining quantities from previous run
- Supports continuous planning (e.g., monthly MRP runs)
- Avoids double-counting requirements

**Requirements:**
- Previous and current documents must have same **Scenario**
- Previous document's **To Date** must be before current document's **From Date**

**Example:**
```
January MRP: From Date = Jan 1, To Date = Jan 31
February MRP: From Date = Feb 1, To Date = Feb 28, Previous = January MRP

February MRP will start with remaining quantities from January.
```

### 2. Scenario-Based Planning

Create scenarios for:
- Different planning assumptions
- What-if analysis
- Custom availability calculations

**Scenario Features:**
- **Available Quantities Query**: Custom SQL query to calculate available quantities
- **Potential Available Query**: Custom SQL query for potential available
- **Create Single Production Order Without Considering Batch Size**: One planned production line for all the batches of an item, rather than one line per batch

::: details Custom Query Format
The query runs once for each required line that has to look up its available quantity (see [Understanding Available Quantities](#Step-5-Review-Analysis-Results)), with the MRP document as the source of its parameters. The values in the first column of its result are added up and used as the quantity; an empty result counts as zero.
:::

### 3. MRP Available Quantity Source

Instead of scenario queries, you can create an **MRP Available Quantity Source** (مصدر الكميات المتاحة), under **Manufacturing → Material Resource Planning**:

**Features:**
- Each line has a **Quantity Type** — Total Available or Predicted Purchase — and a required **Warehouse**, with an optional **Locator**
- A line applies to the item it names, or, with no item, to every item matching its item categories, section, classes and criteria (empty filters match everything)
- The quantity is the item's current stock balance in the warehouses and locators of the matching lines: Total Available lines give **Available**, Predicted Purchase lines give **Potential Available**
- When the source gives zero for both, the scenario queries are used instead

**Usage:**
1. Create the MRP Available Quantity Source
2. Add a line per warehouse (or locator) to count
3. Select it in the MRP Document's **Available Quantity Source** field

### 4. Manual Edits to Requirements

Override calculated requirements:

**Updated Net Required** (صافي المطلوب المعدل):
- Manually specify exact net requirement
- Overrides all calculations
- Use for special cases or adjustments

**Updated Batches Count** (عدد الباتش المعدل):
- Specify exact number of batches to produce
- Only works if item has batch size defined
- Cannot be used with Updated Net Required

::: warning Edit Restrictions
- Cannot edit net required if batch size > 0 (use the updated batches count instead)
- Cannot edit batches count if batch size = 0 (use the updated net required instead)
- Both are checked when the analysis runs
:::

### 5. Merge Planned Lines

Use the **Merge** action to combine planned lines:

**Merging Production Lines:**
1. Select 2 or more planned production lines (same item and order type)
2. Click **Merge** button
3. System adds the quantities up into the last selected line in the grid
4. Removes the other selected lines

**Requirements:**
- Lines must have same **Item**
- Lines must have same **Order Type**
- At least 2 lines must be selected

::: tip When to Merge
Merge lines when:
- Multiple small requirements for same item
- Consolidating production runs
- Reducing number of production orders
:::

### 6. Dimension Handling in MRP

Two blocks of the [manufacturing configuration](/modules/manufacturing/manufacturing-configuration#MRP) decide how dimensions are used. The **Use … In MRP** options (revision, color, size, lot, box, measure, active and inactive percent, sub item) keep requirements that differ in a ticked dimension on separate lines; the **Consider … In MRP BOM And Routing Search** options use a requirement's size, lot, revision, color or active and inactive percentages to pick its BOM and routing.

Example: If **Use Color In MRP** is ticked:
- Red chairs and blue chairs are planned separately
- Requirements are tracked per color

With **Consider Color In MRP BOM And Routing Search** ticked too, red and blue chairs can be exploded with different BOMs.

### 7. Period-Based Safety Stock

For items with variable demand, set the item's **Safety Stock Calculation Type** to **Periods Count** and choose the MRP document's **Safety Stock Periods Calculation Method**; the three methods are under [Safety Stock Calculation Methods](#Safety-Stock-Calculation-Methods).

::: tip Choosing a Method
- **Current Period**: Best for steady demand
- **Next Periods**: Best for growing demand
- **Plan Average**: Best for fluctuating demand
:::

### 8. Multiple UOM Handling

MRP works with items that have multiple units of measure: required quantities are converted to each item's **Unit Used For MRP**, set in the [manufacturing configuration](/modules/manufacturing/manufacturing-configuration#MRP) (empty means the base unit), and the planned lines carry that unit.

### 9. Handling Recurring Demand

For ongoing production schedules:

**Approach 1: Monthly MRP Runs**
- Run MRP monthly
- Use previous MRP document to carry forward
- Generate orders for next month

**Approach 2: Rolling Forecast**
- Update forecast document regularly
- Rerun MRP with updated forecast
- Adjust planned orders as needed

**Approach 3: Manual Demand**
- Create manual demand documents for regular requirements
- Include in MRP collection
- Suitable for internal consumption patterns

---
## What Makes MRP Work, and What Makes It Fail

MRP has a reputation for being either indispensable or useless depending on the factory, and the difference is not the software. It comes down to a handful of things.

**Master data accuracy is the whole game.** MRP is an amplifier: it takes your BOMs, routings and lead times and multiplies them across every order in the plan. A BOM missing a component does not produce a small error — it produces a confident purchase plan that omits that component every single run, and nobody notices until the line stops. Lead times are the most commonly neglected of the three, because they are entered once at implementation and then never revisited even as suppliers change.

**Demand has to be honest, including the part you cannot confirm.** A plan built only on committed sales orders will always be too late for anything with a long lead time. That is what forecasts are for, and a rough forecast used consistently beats a precise order book used too late.

**Frequency matters more than perfection.** A plan run weekly and reviewed for ten minutes is worth far more than a quarterly plan that somebody agonises over. Rolling planning exists precisely so each run can correct the last one, and the corrections are small when the runs are frequent.

**Review before you generate.** The system proposes orders; it does not know that a supplier is in dispute, that a customer is about to cancel, or that the line is down for maintenance next week. Generating without reading is where MRP earns its bad reputation, and it is entirely avoidable — the analysis lines are there to be read.

Get those right and the eventual test is simple: are you running out of things, and are you sitting on stock you do not need? Both answers should be trending in the right direction. If neither is, the fault will be upstream in the master data, not in the calculation.
