---
entities: [TaxPlan, TaxDiscountEffectsConfig]
menu: Basic → Master Files → Tax Plan
---
# Invoice Discounts and Tax Calculation System - Comprehensive Guide
## Overview

This guide explains how Nama works out the discounts and taxes on an invoice line: which tax configuration a document uses, the order in which discounts and taxes are applied, and the options that change each step. Every option is named as it appears on screen, with its field id beside it in the tables.

::: tip Key Features
- Support for 8 sequential line discounts plus 1 header discount
- 4 configurable tax types with flexible application points  
- Complex discount-tax interactions and custom ordering
- Multi-currency and multi-rate support
- Extensive configuration options for different business scenarios
- Tax can be configured as addition or deduction
:::

## Understanding the Calculation Flow

### Basic Calculation Sequence

When an invoice is processed, Nama ERP follows this general calculation sequence:

1. **Line Total Calculation**: Quantity × Unit Price = Line Total
2. **Line Discounts Application**: Apply Discount1 through Discount8 in sequence
3. **Header Discount Application**: Apply single discount to entire invoice
4. **Tax Calculations**: Apply Tax1 through Tax4 at configured points
5. **Final Totals**: Calculate net amounts and remaining balances

::: info Important Note
The order can be changed with a **Tax and Discounts Effects Configuration** record (see [Advanced Effects Configuration](#Advanced-Effects-Configuration)), so discounts and taxes can be applied in whatever order the business needs.
:::

## Which Tax Configuration Applies

The tax options described further down are not chosen per document. They include where each tax sits in the sequence, what it is calculated on, and whether the price already includes it. They travel together as one *tax configuration*, and a document takes its configuration from one of three places. Nama checks them in this order and stops at the first one that gives an answer:

1. **The document's tax plan.** If the document header names a **Tax Plan**, that plan's **Default Tax Configuration** decides:
   - **Global Configuration**: use the tax options on the global configuration's [Taxes tab](/platform/global-config/global-config-taxes).
   - **Tax Plan Header**: use the **Tax Configuration** filled in on the tax plan itself.
   - **Tax Plan Line**: use the first row of the plan's **Legal Entity Taxes** grid that matches the document. A row matches when all three hold:
     - its **Legal Entity** is the document's legal entity, or is empty;
     - the document date falls between **Effective From** and **Effective To** (an empty date leaves that end open);
     - its **Entity Type** or **Entity Type List** includes the document's type, or both are empty.

     If no row matches, Nama moves on to step 2.
   - Left empty: Nama moves on to step 2.
2. **The line's tax plan**, which comes from the item, read the same way.
3. **The global configuration's Taxes tab**, when neither plan gives an answer. A document with no tax plan on the header or the item goes straight here.

For example, a tax plan set to **Tax Plan Line** has two rows: one for legal entity A, effective from 1 January 2025, and one with the legal entity left empty. An invoice of legal entity B uses the second row. So does an invoice of legal entity A dated December 2024, because the first row had not started yet. Row order matters: put the specific rows above the catch-all one.

### Tax Plan Configuration Fields

#### Core Tax Plan Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Item Plan** | `itemPlan` | Indicates if this plan applies to items | When true, plan is used for item-level taxes (Tax1, Tax2) |
| **No Item Taxes With This Policy** | `noItemTaxesWithThisPolicy` | Disables Tax1 and Tax2 | When true, item taxes are zeroed regardless of rates |
| **No Invoice Taxes With This Policy** | `noInvoiceTaxesWithThisPolicy` | Disables Tax3 and Tax4 | When true, invoice taxes are zeroed regardless of rates |
| **Prioritize This Policy Over Policy Specified In Customer and Supplier** | `priorityPolicyOverCusOrSup` | Policy precedence control | When true, this plan overrides customer/supplier tax settings |
| **Default Tax Configuration** | `defaultTaxConfig` | Source of tax configuration | Options: GlobalConfig, TaxPlanHeader, TaxPlanLine |
| **Tax Configuration** | `taxConfiguration` | Embedded tax behavior settings | Contains all tax calculation rules |
| **Legal Entity Taxes** | `legalEntityTaxes` | Tax rates by entity and date | List of entity-specific tax rates |
| **Subsidiary Accounts** | `subsidiaryAccounts` | Account-level settings | Contains tax exemption flags |

#### Legal Entity Tax Fields

Each row of the **Legal Entity Taxes** grid holds:

| Field Name | Database Field | Description |
|------------|---------------|-------------|
| **Legal Entity** | `legalEntity` | Specific legal entity or null for all |
| **Effective From** | `effectiveFrom` | Start date for tax rates |
| **Effective To** | `effectiveTo` | End date for tax rates |
| **Tax 1** | `tax1` | Tax1 rate (percentage or value) |
| **Tax 2** | `tax2` | Tax2 rate (percentage or value) |
| **Entity Type** | `entityType` | Specific document type |
| **Entity Type List** | `entityTypeList` | Multiple document types |
| **Revision ID** | `revisionId` | Item revision this rate applies to; empty applies to every revision |
| **Tax Configuration** | `taxConfiguration` | Override configuration for this entity |

![A Tax Plan with its legal entity taxes](../../ar/modules/invoicing/images/tax-plan-screen-en.png)

## Discount System Configuration

### Types of Discounts

#### Line Discounts (Discount 1-8)
- **Sequential Application**: Each discount applies after the previous one
- **Configurable Base**: Each discount can apply to different base amounts
- **Percentage or Value**: Can be specified as percentage or fixed amount
- **Individual Control**: Each discount has independent configuration

#### Header Discount
- **Invoice-Wide**: Applied to the entire invoice total
- **Proportional Distribution**: Distributed across all invoice lines proportionally
- **Configurable Timing**: Can be applied at different points in the calculation sequence

### Discount Configuration Fields

#### Global Configuration - Discount Apply Types

These are set on the global configuration's [Discounts tab](/platform/global-config/global-config-discounts):

| Field Name | Database Field | Description | Available Values |
|------------|---------------|-------------|------------------|
| **Discount 1 Apply Type** | `discount1ApplyType` | Base amount for Discount 1 | TotalPrice, AfterDiscount1-8, AfterHeaderDiscount, Custom, Tax/Discount Values |
| **Discount 2 Apply Type** | `discount2ApplyType` | Base amount for Discount 2 | Same as above |
| **Discount 3 Apply Type** | `discount3ApplyType` | Base amount for Discount 3 | Same as above |
| **Discount 4 Apply Type** | `discount4ApplyType` | Base amount for Discount 4 | Same as above |
| **Discount 5 Apply Type** | `discount5ApplyType` | Base amount for Discount 5 | Same as above |
| **Discount 6 Apply Type** | `discount6ApplyType` | Base amount for Discount 6 | Same as above |
| **Discount 7 Apply Type** | `discount7ApplyType` | Base amount for Discount 7 | Same as above |
| **Discount 8 Apply Type** | `discount8ApplyType` | Base amount for Discount 8 | Same as above |
| **Header Discount Apply Type** | `headerDiscountApplyType` | Base amount for header discount | Same as above |

#### Discount Calculation Method Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Calculate discount 1 percentage from value** | `calcDisc1PercentFromValue` | Calculation direction for Discount 1 | True: Calculate % from fixed value<br>False: Calculate value from % |
| **Calculate discount 2 percentage from value** | `calcDisc2PercentFromValue` | Calculation direction for Discount 2 | Same as above |
| **Calculate discount 3 percentage from value** | `calcDisc3PercentFromValue` | Calculation direction for Discount 3 | Same as above |
| **Calculate discount 4 percentage from value** | `calcDisc4PercentFromValue` | Calculation direction for Discount 4 | Same as above |
| **Calculate discount 5 percentage from value** | `calcDisc5PercentFromValue` | Calculation direction for Discount 5 | Same as above |
| **Calculate discount 6 percentage from value** | `calcDisc6PercentFromValue` | Calculation direction for Discount 6 | Same as above |
| **Calculate discount 7 percentage from value** | `calcDisc7PercentFromValue` | Calculation direction for Discount 7 | Same as above |
| **Calculate discount 8 percentage from value** | `calcDisc8PercentFromValue` | Calculation direction for Discount 8 | Same as above |

#### Tax Effect on Discount Configuration

Each of Discount 1 to 8 has its own group of these options:

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Discount Tax 1** | `discount[N].considerTax1` | Subtract Tax 1 from the discount base | When on, Tax 1 is deducted from the base before the discount is applied |
| **Discount Tax 2** | `discount[N].considerTax2` | Subtract Tax 2 from the discount base | When on, Tax 2 is deducted from the base before the discount is applied |
| **Discount Tax 3** | `discount[N].considerTax3` | Subtract Tax 3 from the discount base | When on, Tax 3 is deducted from the base before the discount is applied |
| **Discount Tax 4** | `discount[N].considerTax4` | Subtract Tax 4 from the discount base | When on, Tax 4 is deducted from the base before the discount is applied |

### How Discounts Are Calculated

#### Percentage-Based Discounts
```
Discount Amount = (Base Amount × Discount Percentage) ÷ 100
New Total = Base Amount - Discount Amount
```

#### Value-Based Discounts
```
Discount Amount = Fixed Discount Value
New Total = Base Amount - Discount Amount
```

#### Tax-Inclusive Discounts
When taxes are included in the price, the discount calculation adjusts:
```
Discount Amount = Base Amount - (Base Amount × 100) ÷ (100 + Tax Percentage)
```

::: tip Discounts that disappear when the term or customer changes
Changing the term, the value date, the subsidiary or the customer can make the document recalculate every line's price and discount. When it does, hand-entered discounts are replaced. What triggers this, and the term options that stop it, are on the term's [Price-Update Control](/modules/supplychain/document-terms/doc-term-pricing-taxes-discounts#Price-Update-Control) section.
:::

## Tax System Configuration

### The Tax Options

These are the options a tax configuration carries, whichever of the three places above it comes from:

#### Tax Location Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Tax 1 Location** | `tax1Location` | Where Tax1 sits in the calculation chain | Effects after it see a running total that includes it; adding or deducting is set by **Tax 1 Is Discount** |
| **Tax 2 Location** | `tax2Location` | Where Tax2 sits in the calculation chain | Effects after it see a running total that includes it; adding or deducting is set by **Tax 2 Is Discount** |
| **Tax 3 Location** | `tax3Location` | Where Tax3 sits in the calculation chain | Effects after it see a running total that includes it; adding or deducting is set by **Tax 3 Is Discount** |
| **Tax 4 Location** | `tax4Location` | Where Tax4 sits in the calculation chain | Effects after it see a running total that includes it; adding or deducting is set by **Tax 4 Is Discount** |

Available Location Values:
- `MainPrice`: Applied to original line total
- `Discount1` through `Discount8`: Applied after specific discount
- `HeaderDiscount`: Applied after header discount

#### Tax Apply Type Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Tax 1 Apply Type** | `tax1ApplyType` | Base for Tax1 calculation | Determines what amount Tax1 applies to |
| **Tax 2 Apply Type** | `tax2ApplyType` | Base for Tax2 calculation | Determines what amount Tax2 applies to |
| **Tax 3 Apply Type** | `tax3ApplyType` | Base for Tax3 calculation | Determines what amount Tax3 applies to |
| **Tax 4 Apply Type** | `tax4ApplyType` | Base for Tax4 calculation | Determines what amount Tax4 applies to |

#### Tax Behavior Control Fields

| Field Name | Database Field | Description | Impact on Calculation |
|------------|---------------|-------------|----------------------|
| **Tax 1 Is Discount** | `tax1IsDiscount` | Tax1 reduces total | When true: Amount is subtracted<br>When false: Amount is added |
| **Tax 2 Is Discount** | `tax2IsDiscount` | Tax2 reduces total | When true: Amount is subtracted<br>When false: Amount is added |
| **Tax 3 Is Discount** | `tax3IsDiscount` | Tax3 reduces total | When true: Amount is subtracted<br>When false: Amount is added |
| **Tax 4 Is Discount** | `tax4IsDiscount` | Tax4 reduces total | When true: Amount is subtracted<br>When false: Amount is added |

#### Tax Calculation Method Fields

| Field Name | Database Field | Description | Calculation Formula |
|------------|---------------|-------------|---------------------|
| **Tax 1 Is Value Not Percentage** | `tax1IsValue` | Tax1 as fixed amount | True: Fixed amount<br>False: Percentage of base |
| **Tax 2 Is Value Not Percentage** | `tax2IsValue` | Tax2 as fixed amount | True: Fixed amount<br>False: Percentage of base |
| **Tax 3 Is Value Not Percentage** | `tax3IsValue` | Tax3 as fixed amount | True: Fixed amount<br>False: Percentage of base |
| **Tax 4 Is Value Not Percentage** | `tax4IsValue` | Tax4 as fixed amount | True: Fixed amount<br>False: Percentage of base |

#### Tax Value Application Fields

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **Tax 1 Value Is For Total Not Per Piece** | `tax1ValueIsForTotal` | Tax1 value application | True: Flat amount<br>False: Multiplied by quantity |
| **Tax 2 Value Is For Total Not Per Piece** | `tax2ValueIsForTotal` | Tax2 value application | True: Flat amount<br>False: Multiplied by quantity |
| **Tax 3 Value Is For Total Not Per Piece** | `tax3ValueIsForTotal` | Tax3 value application | True: Flat amount<br>False: Multiplied by quantity |
| **Tax 4 Value Is For Total Not Per Piece** | `tax4ValueIsForTotal` | Tax4 value application | True: Flat amount<br>False: Multiplied by quantity |

#### Price Inclusion Fields

| Field Name | Database Field | Description | Calculation Impact |
|------------|---------------|-------------|-------------------|
| **Price Includes Tax 1** | `priceIncludesTax` | Tax1 in quoted price | True: Tax extracted from price<br>False: Tax added to price |
| **Price Includes Tax 2** | `priceIncludesTax2` | Tax2 in quoted price | True: Tax extracted from price<br>False: Tax added to price |
| **Price Includes Tax 3** | `priceIncludesTax3` | Tax3 in quoted price | True: Tax extracted from price<br>False: Tax added to price |
| **Price Includes Tax 4** | `priceIncludesTax4` | Tax4 in quoted price | True: Tax extracted from price<br>False: Tax added to price |

#### Total Inclusion Fields

| Field Name | Database Field | Description | Invoice Total Impact |
|------------|---------------|-------------|---------------------|
| **Tax 1 Not Included In Total** | `tax1NotIncludedInTotal` | Tax1 excluded from total | True: Not added to invoice total<br>False: Added to invoice total |
| **Tax 2 Not Included In Total** | `tax2NotIncludedInTotal` | Tax2 excluded from total | True: Not added to invoice total<br>False: Added to invoice total |
| **Tax 3 Not Included In Total** | `tax3NotIncludedInTotal` | Tax3 excluded from total | True: Not added to invoice total<br>False: Added to invoice total |
| **Tax 4 Not Included In Total** | `tax4NotIncludedInTotal` | Tax4 excluded from total | True: Not added to invoice total<br>False: Added to invoice total |

### Tax as Addition vs Deduction

Whether a tax adds to or subtracts from the invoice total depends on **Tax N Is Discount**:

#### When Tax Adds to Total (Standard Tax)
- **Setting**: **Tax N Is Discount** off
- **Calculation**: New Total = Base Amount + Tax Amount
- **Use Case**: VAT, GST, Sales Tax
- **Example**: 
  ```
  Line Total: $100
  Tax1 (15%): $15
  Final Total: $100 + $15 = $115
  ```

#### When Tax Reduces Total (Discount Tax)
- **Setting**: **Tax N Is Discount** on
- **Calculation**: New Total = Base Amount − Tax Amount
- **Use Case**: Withholding Tax, Discount Tax, Rebates
- **Example**:
  ```
  Line Total: $100
  Tax3 (5% withholding): $5
  Final Total: $100 - $5 = $95
  ```

### Tax Calculation Methods

#### Percentage-Based Taxes

| Setting | Tax amount | Line after the tax |
|---|---|---|
| Added to the price (**Price Includes Tax N** off, **Tax N Is Discount** off) | Base × % ÷ 100 | Base + tax |
| Included in the price (**Price Includes Tax N** on) | Base − Base × 100 ÷ (100 + %) | Base (the price already holds the tax) |
| A deduction (**Tax N Is Discount** on) | Base × % ÷ 100 | Base − tax |

#### Value-Based Taxes

With **Tax N Is Value Not Percentage** on, the rate is an amount rather than a percentage:

| Setting | Tax amount |
|---|---|
| **Tax N Value Is For Total Not Per Piece** off | Rate × quantity |
| **Tax N Value Is For Total Not Per Piece** on | Rate, once for the whole line |

## Advanced Effects Configuration

### Tax and Discounts Effects Configuration

When the fixed sequence does not fit, create a **Tax and Discounts Effects Configuration** (*Basic → Master Files*) and select it in the **Tax and Discounts Effects Configuration** field of the tax configuration. It takes full control of the sequence:

#### Effects Order Configuration

| Field Name | Database Field | Description |
|------------|---------------|-------------|
| **Effects Order** | `effectsOrder` | List defining sequence of effects |
| **Effect 1 Type** | `effect1Type` | Type of first effect (Tax1-4, Discount1-8, HeaderDiscount) |
| **Effect 1 Basis Lines** | `effect1BasisLines` | Calculation rules for effect 1 |
| **Effect 2 Type** | `effect2Type` | Type of second effect |
| **Effect 2 Basis Lines** | `effect2BasisLines` | Calculation rules for effect 2 |
| ... | ... | ... |
| **Effect 13 Type** | `effect13Type` | Type of thirteenth effect |
| **Effect 13 Basis Lines** | `effect13BasisLines` | Calculation rules for effect 13 |

#### Effect Basis Line Configuration

Each effect basis line contains:

| Field Name | Description | Impact |
|------------|-------------|---------|
| **Source Type** | What value to use (MainPrice, CurrentTotal, Discount1-8, Tax1-4, etc.) | Determines base value |
| **Source Value** | Which aspect of source (Value, AfterValue, Percentage) | Specifies exact value to extract |
| **Source Operation** | Mathematical operation (Add, Subtract, Multiply, Divide, CalcPercentage, CalcInversePercentage) | How to apply the value |

### Custom Calculation Operations

The system supports these operations for custom effect calculations:

| Operation | Formula | Use Case |
|-----------|---------|----------|
| **Add** | `total + value` | Standard addition |
| **Subtract** | `total - value` | Standard subtraction |
| **Multiply** | `total × value` | Scaling calculations |
| **Divide** | `total ÷ value` | Division operations |
| **CalcPercentage** | `(total × value) ÷ 100` | Percentage calculations |
| **CalcInversePercentage** | `total - (total ÷ ((100 + value) ÷ 100))` | Tax-inclusive extractions |

## Special Configuration Options

### Free Item Handling

Ticking **Free Item** on a document line does something more precise than "make the line free". The **Unit price** stays exactly as it was typed, untouched and visible to whoever reads the document. What gets zeroed is everything downstream of it: the line's **total price**, and every **After value** from Discount 1 through Discount 8. The line is then never added into the document's **Total**.

Because the unit price survives while the value drops out of the total, the checkbox is also the practical way to put an **optional item** in front of a customer on a quotation — a line whose price they can read but which the quoted total does not include. That is a consequence of how a giveaway is priced, not a feature of its own: the line still means *free*, and it still behaves as a giveaway everywhere else in the system.

| Field Name | Database Field | Description | Impact |
|------------|---------------|-------------|---------|
| **No Taxes For Free Item** | `noTaxesForFreeItem` | Disable taxes on free items | All taxes zeroed for lines marked as free |

**Net value on a free line is not automatically zero.** Discounts are forced to zero, but tax percentages are not — a free line still contributes its tax to the document's Net value even though it contributed nothing to the Total. Switch **No Taxes For Free Item** on when a giveaway is meant to cost nothing at all; leaving it off is the usual reason a total comes out slightly higher than anyone can account for.

::: danger Force Price List refuses hand-made free lines
When the document term has **Force Price List** on, a free line that no offer produced is rejected on save with *Invalid Free Item {0}* — «الصنف المجاني غير صحيح {0}». The system assumes a free line arrived from a promotion, checks it against the offers engine, and finds nothing that would have generated this one.

The switch that lets it through is **Ignore Force Price List With Free Item** on the [term's pricing page](/modules/supplychain/document-terms/doc-term-pricing-taxes-discounts). With Force Price List off the check never runs at all, which is why the same free line saves happily under one term and is refused under another.
:::

Two further term settings belong here. **Do Not Calculate Prices, Discounts, and Free Items If Unit Price Exists**, on that same pricing page, stops the pricing engine overwriting a unit price somebody typed by hand. And when a free line ends up at a zero unit price anyway, the [EARecalcFreeLinesUnitPriceIfZero](/entity-flows/supplychain/EARecalcFreeLinesUnitPriceIfZero) entity flow re-runs pricing for just those lines and puts a price back.

::: warning Free lines can print a zero price
A free line prints its unit price correctly only if the form reads **Unit price** directly. Some form templates derive the printed unit price by dividing the line's after-discount value by its quantity instead — and since that value is zero on a free line, the form prints zero while the screen plainly shows the real price. The shipped Sales Quotation form (**SYSF-SIV004**) reads the unit price directly and is fine; the shipped Purchase Order form (**SYSF-PIV004**) does the division.
:::

### Additional Value Usage

These fields control whether tax percentages are added as additional values to line totals:

| Field Name | Database Field | When False (Default) |
|------------|---------------|---------------------|
| **Do Not Use Tax1 Percentage As Additional Value1** | `doNotUseTax1PercentageAsAdditionalValue1` | Tax1 percentage added to line total |
| **Do Not Use Tax2 Percentage As Additional Value2** | `doNotUseTax2PercentageAsAdditionalValue2` | Tax2 percentage added to line total |
| **Do Not Use Tax3 Percentage As Additional Value3** | `doNotUseTax3PercentageAsAdditionalValue3` | Tax3 percentage added to line total |
| **Do Not Use Tax4 Percentage As Additional Value4** | `doNotUseTax4PercentageAsAdditionalValue4` | Tax4 percentage added to line total |

### Subsidiary Account Tax Exemptions

Customers and suppliers can have tax exemptions configured in their subsidiary accounts:

| Field Name | Description | Impact |
|------------|-------------|---------|
| **Tax 1 Exempt** | `subsidiaryAccounts.tax1Exempt` | When true, Tax1 is zeroed for this entity |
| **Tax 2 Exempt** | `subsidiaryAccounts.tax2Exempt` | When true, Tax2 is zeroed for this entity |
| **Tax 3 Exempt** | `subsidiaryAccounts.tax3Exempt` | When true, Tax3 is zeroed for this entity |
| **Tax 4 Exempt** | `subsidiaryAccounts.tax4Exempt` | When true, Tax4 is zeroed for this entity |

### Document-Level Extra Discount (Egypt Tax Authority)

When sending invoices to the Egypt Tax Authority (ETA), you sometimes need to grant a cash / "pay-now" discount on the whole invoice **after tax** — it lowers the total the customer pays without changing the VAT already calculated. ETA exposes a dedicated **Extra Discount** field on the invoice header for exactly this, separate from the ordinary line discounts.

A field on the **Tax Payer Configuration** named **Document Level Extra Discount Location** controls it: you pick which line discount slot (Discount 1–8) carries this extra discount. That slot's value is then reported in ETA's Extra Discount field instead of being folded into the normal Total Discount Amount.

For example: an item at 10,000, with Discount 1 = 300 and Discount 2 = 200 applied **before** tax, VAT at 14%, plus an 830 cash discount applied **after** tax and designated as the extra discount:

| ETA field | Value |
|-----------|-------|
| Total Sales Amount | 10,000 |
| Total Discount Amount | 500 (Discount 1 + 2, before tax) |
| Net Amount | 9,500 |
| Total Tax (14% of 9,500) | 1,330 |
| Extra Discount Amount | 830 (after tax) |
| Total Amount | 10,000 |

The portal reconciles the invoice as `Net + Tax − Extra Discount = 9,500 + 1,330 − 830 = 10,000`, and VAT stays exactly 14% of the net.

::: warning
The discount slot chosen as the Extra Discount Location must be applied **after all taxes** in the effect order. An extra discount is post-tax by definition — if the chosen slot is calculated before tax, the reported net amount and tax no longer reconcile, so NamaERP stops the submission with a clear error naming the discount. Move the slot to after the taxes to resolve it.
:::

::: info
This applies to Egypt Tax Authority e-invoices only (tax invoices, credit/debit notes, and their export variants). ZATCA, JoFotara, UAE, and the Egyptian e-receipt are unaffected.
:::

## Common Scenarios and Examples

### Scenario 1: Standard VAT with Trade Discount

**Configuration:**
- **Discount 1 Apply Type**: Total Price
- **Tax 1 Location**: Header Discount
- **Price Includes Tax 1**: off
- **Tax 1 Is Discount**: off

**Calculation:**
```
Line Total: $1,000
Discount 1 (10%): $100
After Discount: $900
VAT (15%): $135
Final Total: $900 + $135 = $1,035
```

### Scenario 2: Tax-Inclusive Pricing with Discount

**Configuration:**
- **Price Includes Tax 1**: on
- **Discount 1 Apply Type**: Total Price
- **Discount Tax 1** in Discount 1's group: on

**Calculation:**
```
Quoted Price (includes 15% VAT): $1,150
VAT Component: $150
Net Price: $1,000
Discount Base (net): $1,000
Discount (10%): $100
Final Net: $900
Final VAT: $135
Final Total: $1,035
```

### Scenario 3: Withholding Tax Configuration

**Configuration:**
- **Tax 3 Is Discount**: on (makes it a deduction)
- **Tax 3 Location**: Header Discount
- **Tax 3 Not Included In Total**: off

**Calculation:**
```
Line Total: $1,000
VAT (15%): $150
Subtotal: $1,150
Withholding (5%): $50 (deducted)
Final Total: $1,150 - $50 = $1,100
```

### Scenario 4: Complex Effects Order

**Configuration using a Tax and Discounts Effects Configuration:**
```
Effect 1: Discount1 (10% trade discount)
Effect 2: Discount2 (5% volume discount)  
Effect 3: Tax1 (15% VAT)
Effect 4: HeaderDiscount ($25 promotional)
Effect 5: Tax3 (3% withholding)
```

**Calculation:**
```
Line Total: $1,000
After Discount1: $900
After Discount2: $855
After Tax1: $855 + $128.25 = $983.25
After Header Discount: $958.25
After Withholding: $958.25 - $28.75 = $929.50
```
