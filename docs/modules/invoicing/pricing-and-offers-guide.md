---
entities: [SalesPriceList, SalesOffers]
menu: Sales → Prices And Offers → Price List
---
# Pricing and Offers Management Guide

This comprehensive guide covers the pricing system in Nama ERP, including price lists, sales offers, and automated pricing mechanisms that help maintain accurate and competitive pricing throughout your sales processes.

## Overview

Nama ERP provides a sophisticated pricing engine that supports:
- **Sales Price Lists** - Fixed pricing structures for items
- **Sales Offers** - Discount-based promotional pricing  
- **Automated Price Updates** - System-driven price adjustments
- **Multi-dimensional Pricing** - Support for customer classes, seasons, and classifications

## Sales Price Lists

### Navigation
**Menu Path**: Sales > Prices And Offers > Price List  

### Purpose
Sales Price Lists define standardized pricing structures for inventory items, allowing businesses to maintain consistent pricing across different customer segments, time periods, and business scenarios.

### Key Features

#### Header Configuration

**Basic Information:**
- **Code** - Unique identifier for the price list
- **Name** - Descriptive name for easy identification
- **Priority** - Determines which price list takes precedence when multiple apply
- **Currency** - Base currency for all prices in the list

**Date Range Management:**
- **From Date** - Start date when prices become effective
- **To Date** - End date when prices expire
- **From Time/To Time** - Optional time-specific pricing

**Customer Targeting:**
- **Customer** - Link to specific customers, customer classes, or categories
- **Invoice Classification** - Apply to specific invoice types
- **Price Classifiers 1-5** - Multi-dimensional classification system

![A sales price list header](../../ar/modules/invoicing/images/sales-price-list-screen-en.png)

#### Price List Details

Each price list contains comprehensive detail lines with extensive configuration options:

**Item Identification & Selection:**
- **Item** - Primary inventory item for pricing
- **Item Code** - Alternative item identification method
- **Item Dimensions** - Complete dimensional support:
  - Color, Size, Revision ID, Lot ID, Serial Numbers (first and second)
  - Box, Measures, Sub-item, Warehouse, Locator specifications
  - Active/Inactive percentages for item variants
- **Apply On Items** - Link to item groups or pricing ranges
- **Apply Only If Item In Invoice** - Conditional pricing activation

**Pricing Structure:**
- **Default Price** - Standard selling price for the item
- **Custom Price** - Override price for special circumstances
- **Min Price** - Minimum allowable selling price
- **Max Price** - Maximum allowable selling price
- **Price After Tax 1/2** - Tax-inclusive pricing options
- **This Unit Only** - Unit-specific price constraints

**Quantity & UOM Configuration:**
- **Quantity** - Minimum purchase quantity for price tier
- **Max Qty** - Maximum quantity for this price level
- **Unit of Measure** - Pricing UOM specification
- **Qty In Base UOM** - Converted base unit quantity

**Customer & Classification Targeting:**
- **Customer** - Specific customer, class, or category targeting
- **Price Classifiers 1-5** - Multi-dimensional price classification
- **Dimensions** - Generic dimensional constraints
- **Invoice Classification** - Document type specific pricing
- **Security Capability** - User permission requirements

**Time & Lot Management:**
- **From Date/To Date** - Price validity period
- **From/To Lot ID** - Lot-specific pricing periods

**Advanced Features:**
- **Stop Discounts** - Prevents discount applications on this item
- **Selected For Price Change** - Marks items for bulk price updates
- **Free Item Is Same As Invoice Item** - Self-referential pricing
- **Deactivate Price List** - Line-level deactivation
- **Origin** - Reference to source price list for traceability

**Display & Reference Fields:**
- **Color Name** - Display name for item color
- **Size Name** - Display name for item size  
- **Revision Name** - Display name for item revision

**Extended Data Storage:**
- **Numeric Fields (n1-n5)** - Custom numeric data
- **Reference Fields (ref1-ref5)** - Custom reference data
- **Text Fields (text1-text5)** - Custom text information
- **Date Fields (date1-date5)** - Custom date tracking

**System Tracking:**
- **Created From Order ID/Line ID** - Tracks price list generation from sales orders for audit purposes

#### Advanced Pricing Features

**Price Updaters:**
The system provides a sophisticated 5-stage price update mechanism with comprehensive calculation and rounding capabilities:

**Update Process Overview:**
The `updatePrices` GUI action orchestrates price updates through a sequential 5-stage process, where each updater can be configured independently and operates on the result of the previous stage.

**Sequential Processing Logic:**
1. **Stage 1**: Source price → Price Updater 1 → Destination Field 1
2. **Stage 2**: Previous result → Price Updater 2 → Destination Field 2  
3. **Stage 3**: Previous result → Price Updater 3 → Destination Field 3
4. **Stage 4**: Previous result → Price Updater 4 → Destination Field 4
5. **Stage 5**: Previous result → Price Updater 5 → Final Destination Field

**Source Field Configuration:**
- **Source Field** - Defines the starting price for calculations:
  - Default Price, Custom Price, Min Price, Max Price
  - Item cost-based fields, last sales price
  - Fixed Price - Uses header-level fixed price value
- **Fixed Price** - Header-level fixed amount used when source field is "FixedPrice"

**Destination Field Mapping:**
- **Destination Field** - Final target field for price updates
- **Destination Fields 1-4** - Intermediate stage targets
- **Default behavior**: If no destination specified, uses source field as destination

**Price Updater Configuration (Per Stage):**
Each of the 5 price updaters supports:

**Operation Types:**
- **Add** - Adds value/percentage to current price
- **Subtract** - Subtracts value/percentage from current price  
- **Multiply** - Multiplies current price by value (percentages not allowed)
- **Divide** - Divides current price by value (percentages not allowed)

**Value Types:**
- **Fixed Value** - Absolute monetary amount
- **Percentage** - Percentage of current price (only with Add/Subtract operations)

**Rounding Control:**
- **Rounding Type** - Mathematical rounding method
- **Rounding Value** - Precision level for rounding
- **Currency Scale** - Automatic decimal place adjustment based on currency configuration

**Line Applicability Control:**
- **Applied On Lines:**
  - **All** - Apply to all price list lines
  - **Selected** - Only lines marked with "Selected for Price Change"
  - **Not Selected** - Lines not marked for price changes

**Validation & Error Handling:**
- **Percentage Validation**: System prevents percentage values with multiply/divide operations
- **Empty Updater Handling**: Skips processing for empty updater configurations  
- **Currency Integration**: Automatically applies currency-specific decimal scaling
- **Line Filtering**: Respects line-level applicability settings

**Bulk Item Collection (`collectItems` Action):**
Automated item collection for price list population with comprehensive filtering:

**Range-Based Selection:**
- **Item Range** - Item code range selection
- **Category Ranges** - 5-level category filtering
- **Classification Ranges** - 5-level item class filtering
- **Brand Range** - Brand-based selection
- **Section Range** - Departmental section filtering
- **Dimensional Ranges** - Branch, sector, analysis set, department filtering

**Automatic Spreading Options:**
- **Spread Units** - Creates lines for all item UOM variants
- **Spread Revisions** - Includes all item revision variants
- **Spread Colors/Sizes** - Expands for all color/size combinations

**Average Cost Price Calculation (`calculateAverageCostPrice` Action):**
Automated cost-based pricing with real-time cost calculation:

**Configuration:**
- **Average Cost Field** - Source field for cost calculation
- **Destination Field** - Target field for calculated prices
- **Applied On Lines** - Line applicability control

**Calculation Process:**
- Retrieves real-time average costs from inventory system
- Considers item dimensions (color, size, revision, lot) in cost calculation
- Applies business dimensional constraints (branch, department, legal entity)
- Updates specified destination fields with calculated costs

**Additional Utility Actions:**
- **Copy Deactivate Status** - Propagates header deactivation flag to all lines
- **Add Additional Source Lines** - Merges lines from additional source price lists
- **Spread Selected Line Data** - Expands selected lines across dimensions

**Automated Spreading:**
- **Spread Units** - Automatically create lines for all item UOMs
- **Spread Revisions** - Include all item revisions  
- **Spread Sizes/Colors** - Expand for all variants

### Price List Management

#### Creating Price Lists

1. **Navigate** to Sales > Prices And Offers > Price List
2. **Set Header Information**:
   - Enter unique code and descriptive name
   - Define date range for validity
   - Set priority level (lower numbers = higher priority)
   - Select target customers or customer groups

3. **Configure Price Updates** (Optional):
   - Set up to 5 price updaters for automated calculations
   - Choose source fields (cost, previous price, etc.)
   - Define mathematical operations and rounding rules

4. **Add Detail Lines**:
   - Select items manually or use bulk import
   - Configure item dimensions and quantities
   - Set prices or use updaters for automatic calculation

#### Bulk Price Updates

**From Source Documents:**
- **Source** - Import from existing price lists, invoices, or orders
- **Additional Source** - Combine multiple sources
- **Include Discounts** - Factor in promotional pricing

**Filter Criteria:**
- Item ranges (From Item to To Item)
- Category ranges across 5 classification levels
- Department, branch, sector filtering
- Analysis set constraints

### System Integration

#### Price Resolution Logic

When determining prices, the system follows this hierarchy:

1. **Document-Specific Pricing** - Manual overrides on sales documents
2. **Active Price Lists** - Based on priority, date, and customer matching
3. **Last Sales Price** - Historical pricing when enabled in configuration
4. **Item Master Price** - Default item selling price
5. **Cost-Plus Pricing** - Calculated from item cost with markup

#### Real-Time Price Updates

The pricing engine automatically:
- Validates date ranges and customer eligibility
- Applies quantity-based tiered pricing
- Calculates tax implications
- Considers contract pricing agreements
- Factors in promotional offers and discounts

## Sales Offers

### Navigation  
**Menu Path**: Sales > Prices And Offers > Sales Offer  

### Purpose
Sales Offers provide sophisticated discount and promotion management, enabling businesses to create complex promotional campaigns with multiple discount types, free items, and conditional applications.

### Offer Types and Collections

#### 1. Item Discounts
**Collection**: `details`  
**Table**: `ItemDiscountLine`

Provides sophisticated item-specific discount structures with comprehensive targeting and conditional logic:

**Item Targeting & Selection:**
- **Item** - Specific inventory item for discount application
- **Item Code** - Alternative item identification method
- **Item Dimensions** - Full dimensional support including:
  - Color, Size, Revision ID, Lot ID, Serial Numbers
  - Box, Measures, Sub-item specifications
  - Warehouse and Locator specific pricing
- **Related Items** - Apply to item groups or free item groups
- **Apply On Items** - Link to free item groups or pricing ranges

**Category & Classification Filters:**
- **Categories 1-5** - Multi-level category targeting
- **Item Classes 1-10** - Extended classification system
- **Brand** - Brand-specific discounts
- **Section** - Departmental item grouping

**Discount Configuration:**
- **Discount Location** - **Required field** defining when/where discount applies in invoice processing
- **Value or Percent** - Discount calculation method
- **Discount Min Value** - Minimum discount amount
- **Discount Max Value** - Maximum discount ceiling  
- **Discount Default Value** - Standard discount amount
- **Special Discount** - Flag for exceptional discount handling
- **Deactivate Salesman Discounts Validations** - Discounts from this line are not checked against the employee's maximum discount

::: tip Min, Default and Max form a range
A discount the user types survives only if it lies between Min and Max; anything else is replaced by the Default, silently. An empty Max counts as zero, so a line with only a Default locks the discount at that Default. How this range works together with each employee's own limit is explained in [Salesman Discount Limits](./salesman-discount-limits.md).
:::

**Quantity & Value Controls:**
- **Quantity** - Minimum purchase quantity for discount eligibility
- **Max Qty** - Maximum quantity for tiered pricing
- **Min Item Value to Apply Discount** - Individual item value threshold
- **Max Item Value to Apply Discount** - Upper item value limit
- **Min Invoice Value to Apply Discount** - Document-level minimum amount
- **Max Invoice Value to Apply Discount** - Document-level maximum amount

**Time & Date Restrictions:**
- **From Date/To Date** - Validity period for discount
- **From Time/To Time** - Daily time window restrictions
- **From/To Lot ID** - Lot-specific discount periods

**Advanced Discount Logic:**
- **Accumulate Value By** - Defines how values are accumulated for discount calculation:
  - Item sections, classes, categories 1-5
  - Master groups, invoice value
- **Apply Offer Discount Once** - Prevents multiple applications
- **Stop Same Type Other Discounts** - Controls discount stacking
- **Sales Items Count Type** - Method for counting qualifying items

**Conditional Application:**
- **Apply Only If Item In Invoice** - Requires specific items presence
- **Price Classifiers 1-5** - Multi-dimensional price classification
- **Dimensions** - Generic dimensional constraints (branch, department, sector, etc.)
- **Security Capability** - User permission requirements
- **Subsidiary** - Multi-entity business unit targeting

#### 2. Free Items  
**Collection**: `freeItems`  
**Table**: `FreeItemLine`

Comprehensive free item management extending base offer line functionality with sophisticated conditional logic:

**Trigger Item Configuration:**
- **Item** - Primary item that triggers the free item offer
- **Item Code** - Alternative identification for trigger item
- **Item Dimensions** - Full dimensional support for trigger items:
  - Color, Size, Revision ID, Lot ID, Serial Numbers
  - Box, Measures, Warehouse, Locator specifications
- **Quantity** - Required purchase quantity to activate offer
- **Max Qty** - Maximum qualifying quantity

**Free Item Definition:**
- **Free Item Code** - Unique identifier for the free item
- **Free Item Data** - **Required** comprehensive free item configuration:
  - **Free Item** - The actual item to be given free
  - **Free Item Dimensions** - Complete dimensional specifications
  - **Free Quantity** - Amount to be provided free
  - **Max Qty** - Limit on free quantity
  - **Free Policy** - Rules governing free item provision
  - **Replace Policy** - Item replacement rules
  - **Offer Apply Rules** - Complex application logic
  - **Taxable** - Tax treatment for free items
  - **Manual** - Manual override capability

**Alternative Discount Mode:**
- **Not Free But Discount** - **Key Feature** - Instead of providing items free, apply percentage discount to the item price
- **Discount Location** - Defines where discount is applied in invoice processing
- **Discount Percentage** - Percentage discount amount when using discount mode

**Category & Classification Targeting:**
- **Categories 1-5** - Multi-level category filtering for trigger items
- **Item Classes 1-10** - Extended classification targeting
- **Brand** - Brand-specific free item offers
- **Apply On Items** - Link to item groups or pricing ranges
- **Apply Only If Item In Invoice** - Conditional activation

**Advanced Configuration:**
- **Apply Offer By Slides Way** - Specialized application methodology
- **Sales Items Count Type** - Method for counting qualifying items
- **Item Max Qty** - Maximum quantity limits per item
- **Free Item Is Same As Invoice Item** - Self-referential offers
- **This Unit Only** - Unit-specific constraints
- **Do Not Copy Master Item Data** - Data inheritance control

**Time & Date Management:**
- **From Date/To Date** - Offer validity period
- **From/To Lot ID** - Lot-specific offer periods
- **Invoice Classification** - Document type targeting

**Price Classification & Targeting:**
- **Price Classifiers 1-5** - Multi-dimensional price targeting
- **Dimensions** - Generic dimensional constraints
- **Subsidiary** - Multi-entity business unit support

**Extended Data Fields:**
- **Numeric Fields (n1-n5)** - Custom numeric data storage
- **Reference Fields (ref1-ref5)** - Custom reference data
- **Text Fields (text1-text5)** - Custom text information
- **Date Fields (date1-date5)** - Custom date tracking

#### 3. Invoice-Level Discounts
**Collection**: `invDiscountLines`  
**Table**: `InvoiceDiscountLine`

Document-wide discount management with sophisticated threshold and conditional logic:

**Invoice Value Thresholds:**
- **Min Invoice Value** - Minimum document total for discount eligibility
- **Max Invoice Value** - Maximum document total for discount application
- **Min Invoice Items** - Minimum line item count requirement
- **Max Invoice Items** - Maximum line item count for eligibility

**Discount Configuration:**
- **Discount Type** - Method of discount calculation (percentage, fixed amount, etc.)
- **Discount Min Value** - Minimum discount amount to apply
- **Discount Max Value** - Maximum discount ceiling

**Discount Control Logic:**
- **Stop Other Discounts** - Prevents other discount applications when this discount is applied
- **Consider Stop Other Discounts** - Respects other discounts' stop flags
- **Ignore Other Offers** - Excludes other promotional offers
- **Ignore Free Items In Count** - Excludes free items from item count calculations

**Advanced Item Counting:**
- **Items Count Mechanism** - Defines how items are counted for threshold calculations
- **Discount Basis From Matched Lines** - Calculates discount only on qualifying line items

**Conditional Application:**
- **Offer Apply Rules** - Links to complex rule sets for conditional logic
- **Price Classifiers 1-5** - Multi-dimensional price targeting
- **Dimensions** - Generic dimensional constraints (branch, department, legal entity, etc.)
- **Security Capability** - User permission requirements
- **Subsidiary** - Multi-entity business unit targeting

#### 4. Invoice Free Items
**Collection**: `invOffersLines`  
**Table**: `InvoiceFreeItemLine`

Document-level free item promotions with comprehensive threshold management and dimensional controls:

**Invoice Thresholds:**
- **Min Invoice Value** - Minimum document total to trigger free items
- **Max Invoice Value** - Maximum document total for free item eligibility

**Free Item Configuration:**
- **Free Item Data** - Complete free item specification including:
  - **Free Item** - The item to be provided free
  - **Free Item Dimensions** - Full dimensional support (color, size, revision, lot, etc.)
  - **Free Quantity** - Amount to be given free
  - **Max Qty** - Maximum free quantity limit
  - **Free Policy** - Rules governing free item provision
  - **Replace Policy** - Item replacement logic
  - **Offer Apply Rules** - Complex conditional application rules
  - **Taxable** - Tax handling for free items
  - **Manual** - Manual override capability
  - **Sold Qty** - Track quantities in sales context

**Discount Control:**
- **Stop Other Discounts** - Prevents other discount applications
- **Consider Stop Other Discounts** - Respects other discounts' stop flags
- **Ignore Other Offers** - Excludes other promotional offers

**Targeting & Classification:**
- **Price Classifiers 1-5** - Multi-dimensional price targeting
- **Dimensions** - Generic dimensional constraints (branch, department, legal entity, etc.)
- **Security Capability** - User permission requirements
- **Subsidiary** - Multi-entity business unit targeting

#### 5. Items Count Offers
**Collection**: `itemsCountOffers`  
**Table**: `OfferOnItemsCountLine`

Advanced quantity-based promotional system with sophisticated counting mechanisms and flexible reward structures:

**Counting & Threshold Configuration:**
- **Number of Invoice Items** - Minimum item count to trigger offer
- **Items Count Mechanism** - Defines how items are counted and grouped
- **Multiple Policy Mechanism** - Controls behavior when multiple qualifying groups exist
- **Priority** - Order of evaluation when multiple offers apply
- **Ignore Matched Item To Be Free Qty** - Excludes trigger items from free quantity

**Item Targeting & Classification:**
- **Categories 1-5** - Multi-level category targeting for counting
- **Item Classes 1-10** - Extended classification system
- **Brand** - Brand-specific counting and rewards
- **Section** - Departmental item grouping
- **Items Group** - Predefined item collections for counting
- **Free Item Group** - Categories of items available as rewards
- **Free Item Classification** - Classification system for reward items

**Reward Configuration:**
- **Free Item Qty** - Quantity of free items to provide
- **Free Policy** - Rules governing free item distribution
- **Not Free But Discount** - **Alternative Mode** - Apply discount instead of free items
- **Discount Location** - Where discount is applied in invoice processing
- **Discount Percentage** - Percentage discount when using discount mode
- **Discount Value** - Fixed discount amount option

**Time & Date Management:**
- **From Date/To Date** - Offer validity period for this specific count offer

**Control & Exclusion Logic:**
- **Stop Other Discounts** - Prevents other discount applications
- **Ignore Other Offers** - Excludes other promotional offers from consideration

**Targeting & Classification:**
- **Price Classifiers 1-5** - Multi-dimensional price targeting
- **Dimensions** - Generic dimensional constraints (branch, department, legal entity, etc.)
- **Subsidiary** - Multi-entity business unit targeting

#### 6. Coupon Management
**Collection**: `coupons`  
**Table**: `OfferCouponLine`

Comprehensive coupon and voucher management system with advanced validation and tracking capabilities:

**Coupon Configuration:**
- **Coupon Value** - Monetary value or discount amount
- **Coupon Value Type** - Defines whether value is percentage, fixed amount, etc.
- **Coupon Period** - Validity duration with UOM (days, months, etc.)
- **Coupon Used Once** - Single-use restriction
- **Deactivated** - Manual deactivation flag

**Invoice Value Thresholds:**
- **Invoice Value From** - Minimum invoice amount for coupon eligibility
- **Invoice Value To** - Maximum invoice amount for coupon application

**Generation & Control Logic:**
- **Do Not Create Coupon If Invoice Has** - Conditional coupon creation based on invoice content
- **Sales Items Count Type** - Method for counting qualifying items for coupon generation
- **Dimensions Copy Method** - How dimensional data is inherited in coupon creation

**Time & Date Management:**
- **From Date/To Date** - Coupon validity period
- **Priority** - Resolution order when multiple coupons apply

**Application Rules:**
- **Offer Apply Rules** - Complex conditional logic for coupon application
- **Consider Stop Other Discounts** - Respects other discounts' exclusion flags

**Targeting & Classification:**
- **Dimensions** - Generic dimensional constraints (branch, department, legal entity, etc.)
- **Subsidiary** - Multi-entity business unit targeting

### Offer Configuration

#### Header Settings

**Basic Configuration:**
- **Code/Name** - Offer identification
- **Priority** - Resolution order when multiple offers apply
- **Date/Time Range** - Precise scheduling of promotional periods
- **Customer Targeting** - Specific customers, classes, or categories

**Behavior Controls:**
- **Stop Other Discounts** - Prevent discount combination
- **Currency** - Offer pricing currency
- **Season** - Seasonal promotion linking

**Advanced Features:**
- **Price Classifiers 1-5** - Multi-dimensional targeting
- **Employee Restrictions** - Limit offers to specific sales staff
- **Subsidiary Controls** - Multi-entity business support

#### Offer Logic Implementation

**Discount Cascading:**
The system implements sophisticated discount cascading where:
1. Header-level "Stop Other Discounts" prevents all other discount applications
2. Line-level stops control individual item discount stacking  
3. Priority-based resolution ensures predictable offer application

**Price Updater Integration:**
Sales offers can use the same 5-level price updater system as price lists:
- **Source Field** - Base calculation field
- **Destination Field** - Target field for updates
- **Mathematical Operations** - Add, subtract, multiply, divide
- **Rounding Control** - Precision management

## System Price Update Mechanisms

### Automated Price Calculation

The system's `SalesPriceUtils.updateLinePriceAndDiscounts()` method orchestrates complex pricing calculations:

#### Price Resolution Process

1. **Tax Calculation** - Recalculates tax percentages if required
2. **Detail Validation** - Removes lines without items
3. **Configuration Loading** - Retrieves system pricing preferences
4. **Base Price Calculation** - Determines starting prices from:
   - Price lists (by priority and eligibility)
   - Last sales prices (if configured)
   - Item master prices
   - Cost-plus calculations

#### Discount Application Sequence

1. **Item-Level Discounts** - Applied first from offers
2. **Header Discount Calculation** - Document-wide discount determination
3. **Discount Cascade Processing** - Applies discounts in priority order
4. **Tax Recalculation** - Updates tax amounts after discounts
5. **Free Item Processing** - Adds qualifying free items
6. **Boundary Validation** - Ensures min/max price compliance

### Integration Points

#### Sales Document Processing

The `updateLinesPrices()` method in `SalesOrderInvoicePostActions` demonstrates real-world price updating:

#### Configuration Controls

The system respects various configuration flags:
- **doNotUpdatePricesAtAll** - Completely disable automatic pricing
- **doNotUpdatePricesWhenThereSalesDocInFromDoc** - Preserve prices from source documents
- **considerValueDateFromFromDocInPricingAndOffers** - Use source document dates for price/offer eligibility

## Advanced Configuration

### Multi-Currency Pricing

When operating across multiple currencies:
- Set base currency at price list level
- Use currency-specific price lists for local markets
- Consider exchange rate fluctuation impact
- Implement currency-specific offer strategies

### Integration with Other Modules

**Inventory Management:**
- Price lists automatically filter for sellable items
- Item availability impacts free item offers
- Inventory dimensions integrate with pricing dimensions

**Customer Management:**
- Customer classes enable group pricing strategies
- Customer credit limits may affect offer eligibility
- Sales territory alignment with pricing regions

**Financial Management:**
- Price changes trigger financial impact reporting
- Margin analysis based on pricing vs. cost data
- Revenue recognition implications for free items

This pricing and offers system provides comprehensive tools for maintaining competitive pricing while maximizing profitability through strategic promotional campaigns and automated price management.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Found overlapped price list {0} with same priority* — «قائمة الأسعار {0} لها نفس الترتيب» | Another active price list covers the same period with the same **priority**, so the engine cannot tell which price wins. | Change the priority on one of the two lists, or enable **allow repeating offer priority** in the supply chain configuration if overlaps are intentional. |
| *The line at {0} is repeated with the line {1}* — «السطر رقم {0} مكرر مع السطر رقم {1}» | Two price-list lines carry the same combination of item, dimensions and unit, so they would give the item two prices. | Delete one of the two lines, or make them differ on a real dimension. |
| *Line {0} must have either an item or item class, but not both* — «السطر {0} يجب أن يحتوي على صنف أو تصنيف صنف وليس الاثنين معا» | The line names an item **and** an item class; a price line prices one or the other. | Clear whichever of the two columns you did not mean. |
| *Line {0} must have either an item or item class* — «السطر {0} يجب أن يحتوي على صنف أو تصنيف صنف» | The line names neither an item nor an item class, so there is nothing to price. | Fill one of the two columns, or delete the line. |
| *Line {0} cannot be priced by item class before setting the supply chain configuration Price By Item Class* — «السطر {0} لا يمكن التسعير على مستوى تصنيف الصنف قبل ضبط إعداد سلسلة الإمداد التسعير على مستوى تصنيف الصنف» | The line prices an item class while the supply chain configuration has no **price by item class** level selected. | Choose the item-class level in the supply chain configuration, or price the individual items instead. |
| *Line {0} item class must be of type {1} per supply chain configuration* — «السطر {0} تصنيف الصنف يجب أن يكون من نوع {1} حسب إعدادات سلسلة الإمداد» | The line uses a different item-class level from the one the supply chain configuration nominates for pricing. | Use the class level the message names, or change the configuration. |
| *Revision {0} is not found in item {1} at line number {2}* — «الصنف {1} لا يحتوي على الإصدار {0} في السطر {2}» | The revision typed on the line is not one of the revisions defined on that item. | Pick a revision from the item's own list, or add it on the item first. |
| *Color {0} is not found in item {1} at line number {2}* — «الصنف {1} لا يحتوي على اللون {0} في السطر {2}» | The colour on the line is not defined on that item. | Pick a colour the item actually has, or add it to the item. |
| *Size {0} is not found in item {1} at line number {2}* — «الصنف {1} لا يحتوي على المقاس {0} في السطر {2}» | The size on the line is not defined on that item. | Pick a size the item actually has, or add it to the item. |
| *You must choose offer apply rules, because you mark option discount basis from matched lines* — «يجب عليك إختيار قواعد تطبيق العروض , لأنك قد قمت بتفعيل الأوبشن اساس الخصم من إجمالى السطور المنطبقة فقط» | An invoice-discount line has **discount basis from matched lines** ticked but no **offer apply rules**, so there is nothing to define which lines match. | Choose the offer apply rules on that line, or untick the basis option. |
| *Discount Minimum Value {0} can not be greater than Discount Maximum Value {1}* — «قيمة الخصم الأدني {0} لا يمكن ان تكون اكبر من قيمة الخصم الأقصي {1}» | The minimum and maximum discount values on an invoice-discount line are the wrong way round. | Swap them, or clear the one you did not mean to cap. |
| *Activate (Ignore Other Offers If There is Item Count Offers and Ignore Other Offers is active) in supply chain configuration* — «قم بتفعيل اوبشن ( تجاهل العروض الأخرى عند وجود عروض على عدد أصناف الفاتورة بها تجاهل العروض الأخرى ) من اعدادات ال Supply Chain» | An item-count offer line has **ignore other offers** ticked while the matching supply chain configuration option is off, so the line would not behave as written. | Enable that option in the supply chain configuration, or untick **ignore other offers** on the line. |
| *You must enter discount percentage or discount value* — «يجب عليك إدخال نسبة او قيمة التخفيض» | A free-item line is marked **not free but discount** and carries neither a discount percentage nor a discount value. | Enter one of the two, or untick **not free but discount** to give the item away. |
| *Invoice Value -from- must be equal to invoice value -to- {0}* — «قيمه الفاتوره يجب ان تساوي قيمة الفاتوره -الي - {0}» | A coupon line counts items as well as invoice value, and a counting coupon needs a single invoice value, not a range. | Make the from and to values equal, or set the sales items count type to **None**. |
| *Max quantity {0} can not be less than qty {1}* — «لا يمكن ان تكون قيمة أقصى كمية {0} أقل من الكمية {1}» | A **max quantity** ceiling on an offer or free-item line is below the line's own quantity, so the line could never apply. | Raise the max quantity, or lower the quantity. |
| *Activate free items on invoice from supply chain configuration* — «قم بتفعيل الاوبشن - تفعيل الاصناف المجانية علي قيمة الفاتورة - من اعدادات ال supply chain» | The offer uses invoice-level free items while **activate free items on invoice offers** is off in the supply chain configuration. The same message comes back from the invoice's own offer-calculation button. | Enable that option in the supply chain configuration, or remove the invoice free-item lines. |
