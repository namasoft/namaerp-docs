# FAQ — Distribution, Warehousing, Sales & Purchasing Module

Answers to questions support often gets about stock, sales and purchasing: capping quantities, tying items to warehouses, which price an invoice picks, costing bundles and purchase returns, and the three kinds of stock transfer.

---

## **Can the system prevent a user from receiving or purchasing an item that exceeds the maximum quantity?**

Yes, this is possible through system settings by using custom Entity Flows or criteria-based validation.

---

### ✅ **Best Option: Use the `EAPreventQtyMoreThan` Entity Flow**

* This flow prevents transactions (such as purchasing or receiving) when the **total item quantity** in the document exceeds the value defined in the `maxQuantity` field on the item card.

#### 🟢 **Comparison Query:**

```sql
select {details.item.item.defaultDetailData.maxQuantity}
```

> This query is used inside the flow to compare the total quantity against the maximum allowed quantity per item.

---

### ⚠️ **Important Note:**

::: tip The system validates against the **quantity converted to the smallest unit** (the item's base unit).

* Example: If the smallest unit is "gram" and the quantity is entered in kilograms, the system will convert the quantity to grams before comparing.
* Therefore, it is recommended to attach the flow to the **pre-save stage** to ensure the quantity is actually converted to the smallest unit.
  :::

---

### 🔁 **Alternative: `EAPreventQtyLessThan` Flow**

::: tip If you need to prevent entering a quantity **below a certain threshold**, you can use the following flow: `EAPreventQtyLessThan`
:::

---

::: tip ⚙️ **Another Option (Less Precise): Criteria-Based Validation**
You can also implement validation using **direct criteria** inside validation files, by comparing the line quantity against the `maxQuantity` field on the item card.

However, note:

* This validation is performed **per line individually**.
* If the same item appears in more than one line, the quantities will not be aggregated, which may allow the maximum to be exceeded across multiple lines.

✅ For this reason, using the `EAPreventQtyMoreThan` Entity Flow is preferred, as it considers the **total quantity** per item within the document.
:::

## What is the accounting treatment for the difference between the purchase return value recovered from the supplier and the cost of the resulting stock issue?
- Please read [this article](https://www.namasoft.com/ar/article/%d8%a7%d9%84%d8%b9%d8%b1%d8%a8%d9%8a%d8%a9-%d8%a7%d9%84%d9%85%d8%b9%d8%a7%d9%84%d8%ac%d8%a9-%d8%a7%d9%84%d9%85%d8%ad%d8%a7%d8%b3%d8%a8%d9%8a%d8%a9-%d9%84%d9%84%d9%81%d8%b1%d9%82-%d8%a8%d9%8a%d9%86/) to learn about the problem details and available solutions
- You can learn more through the following video:
  <iframe width="560" height="315" src="https://www.youtube.com/embed/UXodW-O9wN0?si=JzzcgpmAHhtktXaH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## **Can an item be linked to a specific warehouse or location, or to multiple warehouses, so the system prevents transactions outside those warehouses?**

Yes, this is possible by using the <LinkToNewRecord entityType="ItemWarehouseRelation" /> file.

### **Required Steps:**

1. **Enable the following option in Supply Chain settings:**
<SupplyChainOption option-code="value.activateItemWarehouseRelation" link-title="Activate Item-Warehouse Relation" />

2. **Create an "Item-Warehouse Relation" record:**
   This record contains a details table divided into two main sections:

   #### **First: Specify the Item**

   Items can be specified using one or more of the following criteria:

  * The item itself
  * Any of the item's ten classifications
  * Item category
  * Any of the five item classes

   #### **Second: Specify the Warehouse or Location and Relation Type**

  * The **warehouse or location** you want to restrict transactions with.
  * The **relation type**, which includes:

    * **Allow dealings**: Permits transactions only from the specified warehouses.
    * **Prevent dealings**: Prevents transactions with the specified warehouses.

---

### **Practical Examples:**

#### ✅ Allow Dealings:

**Example:** Allow items whose category is "Raw Materials" to be issued and received only from the "Raw Materials" warehouse.

* Enter "Raw Materials" in the **Item Category** field.
* Enter "Raw Materials" in the **Warehouse** field.
* Select relation type: **Allow dealings**.

#### ❌ Prevent Dealings:

**Example:** Prevent dealings with the item "Sulfuric Acid" in the "Finished Goods" warehouse.

* Create a new line containing:

  * **Item:** Sulfuric Acid
  * **Warehouse:** Finished Goods
  * **Relation Type:** Prevent dealings

---

::: warning **Important Note:**

When enabling the following option in Supply Chain settings:
<SupplyChainOption option-code="value.itemRelationToWarehouseMustBeSpecified" link-title="Item-Warehouse relation must be specified" />
The system **will not allow saving or executing transactions** unless an **"Allow dealings"** relation is defined between the item and the warehouse.
:::

## Example query to calculate the cost of a sales receipt from the sales issue cost linked to the invoice

By default, **Nama ERP** automatically calculates the sales receipt cost using the **average item cost at the time of receipt**.
However, in some scenarios, you may want to tie the receipt cost directly to the item cost that was actually issued in the **sales invoice** itself.

You can implement this using the following query inside the **Cost Sources for Uncosted Receipt** grid in the **Supply Chain Configuration** settings:

```sql
select top 1 l.unitCost 
from SalesReturn sr
inner join CostOutTransLine l on l.invoiceId = sr.fromDoc_id
where l.item_id = {item_id}
  and l.revisionId = coalesce({dimensions.specificDimensions.revisionId}, '')
  and l.color = coalesce({dimensions.specificDimensions.color}, '')
  and l.size = coalesce({dimensions.specificDimensions.size}, '')
  and sr.id = {invoiceId}
```

::: tip
For this query to be used in calculating the receipt cost, you must enable the following option in Supply Chain settings:
<SupplyChainOption option-code="value.ignoreCurrentAvgForUnCostedReceipt" link-title="Ignore current average cost for uncosted receipts" />

This option makes the system skip the current average for every uncosted receipt and take its cost from the cost sources, starting with the query above. If the query returns no row, the next source on the line is tried.
:::

## How do I set a specific price for a wholesale invoice classification in Point of Sale or the sales invoice in the system?

If you need a wholesale invoice to use a price different from the default price on the item card (such as "minimum price"), you can do this through:

Using the **`Price List Default Price`** field found in the **Invoice Classification** settings.

This field determines where the system sources the price used in invoice lines, even if you are not using a price list.

### Options for this field:

* **MinPrice**
* **MaxPrice**
* **DefaultPrice**
  These let you use the corresponding values inside the price list or the unit definition line inside the item.

* **CustomPrice**
* **N1** through **N5**
  These let you use the corresponding values inside the price list.
---

### Practical Example:

If you want wholesale invoices to be priced based on "minimum price", all you need to do is:

1. Open the invoice classification used for wholesale.
2. Set the **`Price List Default Price`** field to the value **"MinPrice"**.
3. Save the changes.

After that, any new invoice following this classification will automatically use the lowest available price for the item in Point of Sale.

## How does the system determine the price used in the invoice based on the **`Price List Default Price`** field?

You can control the price used inside sales invoices through the **`Price List Default Price`** field, which is available in several locations within the system.

### Where the field appears:

This field appears in the following locations (ordered by application priority):

1. **Customer**
2. **Document Term**
3. **Customer Category**
4. **Customer Classy**
5. **Invoice Classification**
6. **Price Classifier 1**
7. **Price Classifier 2**
8. **Price Classifier 3**
9. **Price Classifier 4**
10. **Price Classifier 5**
11. **Supply Chain settings**

### Selection mechanism:

The system searches for the first defined value of this field according to the order above.
In other words, if a value for this field exists on the customer record, it will be used directly.
If not defined, the system automatically moves to the next record in the order (Document Term, then Customer Classification, and so on) until it finds the first defined value.

### Illustrative Example:

If you have set the "Price List Default Price" field in the **Invoice Classification** to "MinPrice", but you also have a different setting inside the **Customer**, the system will take the value from the customer and ignore what is in the Invoice Classification, because the **Customer has higher priority** in the order.

---

### Summary:

* The price source can be customized for each type of customer or invoice depending on where the setting is placed.
* Priority starts from the customer record and ends with Supply Chain settings.
* It is sufficient to define the value in the first location within the order for it to be automatically applied to pricing inside the invoice.

### ❓ How can the cost of an invoice containing composite items (such as packages/bundles) be calculated, where the components are issued from stock rather than the item itself?

When dealing with an invoice containing composite items such as:

> `Package: 6 Niche Perfumes — Niche Black + Niche Gold + Dreams Palace + In the Mood + History Note + Niche in Business`

The stock issue process does not apply to the composite item itself, but to its sub-components, such as:

* Niche Black perfume `NESH BLACK`
* Niche Gold perfume `NESH GOLD`
* Dreams Palace perfume `DREAMS PALACE`
* And others...

As a result, the main item (the package) does not appear in the stock issue voucher; instead, each component is issued as a separate item. To calculate the true cost of this invoice, you must account for the cost of the components used in each composite item, not the composite item itself.

---

### How to link the composite item to its components?

Each component is linked to the composite item via the `masterRowId` field in the `SalesInvoiceLine` table:

* The line for the composite item (e.g., "Perfume Package") has `masterRowId = NULL`
* The lines for components (e.g., "NESH BLACK") have `masterRowId = <ID of the main line>`

---

### Steps to calculate cost:

1. **Start from the sales invoice table** to identify the required invoice.
2. **Fetch every main line** in the invoice (where `masterRowId IS NULL`).
3. **Find the sub-lines** linked to it via `SalesInvoiceLine.masterRowId`.
4. **Find the stock issue line** corresponding to each component, or the original line if there are no components.
5. **Join the cost record** (`CostOutTransLine`) via `originLineId`.
6. **Use the `coalesce(sub.id, l.id)` function** to select the component if it exists, or the main line if it has no components.
7. **Exclude lines that have a `masterRowId`** when aggregating, because the cost of components will already be included.

---

### SQL Query to Calculate the Cost of Each Composite Item in the Invoice

::: details SQL Query to Calculate cost of a sales invoice

```sql
select 
  l.itemCode,
  l.item_id,
  sum(co.totalCost) as cost
from SalesInvoice s
left join SalesInvoiceLine l on l.salesInvoice_id = s.id
left join SalesInvoiceLine sub on sub.masterRowId = l.id
left join StockIssueLine sil on sil.sourceLineId = coalesce(sub.id, l.id)
left join CostOutTransLine co on co.originLineId = sil.id
where s.code = 'Salla2025229014'
  and l.masterRowId is null
group by l.itemCode, l.item_id
```

:::

---

- Additional note:

If you only want the **total invoice cost** without item details, you can modify the previous query as follows:
::: details SQL Query to Calculate total cost of a sales invoice
```sql
select 
  sum(co.totalCost) as total_invoice_cost
from SalesInvoice s
left join SalesInvoiceLine l on l.salesInvoice_id = s.id
left join SalesInvoiceLine sub on sub.masterRowId = l.id
left join StockIssueLine sil on sil.sourceLineId = coalesce(sub.id, l.id)
left join CostOutTransLine co on co.originLineId = sil.id
where s.code = 'Salla2025229014'
  and l.masterRowId is null
```
:::

---

### How to calculate the provisional cost of a stock receipt from a purchase order?

To calculate the provisional cost of a stock receipt based on a purchase order, follow these steps:

In the stock receipt Document Term, do the following:
1. Enable the **Uncosted Delivery** option.
2. Enable the **Calculate provisional cost based on (purchase order)** option.

In the **Supply Chain** settings, do the following:
1. Enable the **Ignore current average cost for uncosted receipts** option
<SupplyChainOption option-code="value.ignoreCurrentAvgForUnCostedReceipt" link-title="Ignore current average cost for uncosted receipts" />
2. Set **Line Cost** as the first source in the cost sources grid for uncosted receipts.
<SupplyChainOption option-code="value.costSources" link-title="Cost sources grid for uncosted receipts" />

---

#### How does the system calculate the provisional cost?

When saving the stock receipt voucher, the system performs the following steps:

1. **Check settings**: The system verifies that the "Calculate provisional cost from purchase order" option is enabled in the receipt Document Term.

2. **Find the matching purchase line**: The system searches for the purchase line corresponding to each receipt line by:
   - Looking for the source document (purchase order or purchase invoice)
   - Matching the line using the `sourceLineId`
   - If not found, it searches for the first matching line with the same item and quantity

3. **Calculate unit cost**: The unit cost is copied from the purchase line, taking into account the **exchange rate**:
   ```
   Unit cost in receipt = Unit cost in purchase × Exchange rate
   ```

4. **Calculate total cost**: The total cost for the line is calculated:
   ```
   Total cost = Unit cost × Original quantity
   ```

::: tip Important note about cost source order
If no custom cost sources are specified in the settings grid, the system uses the following default order:
1. Issue cost by date (OutCostOnDate)
2. Receipt cost by date (InCostOnDate)
3. Last average cost (LastAverageCost)
4. Line cost (LineCost)
5. Standard cost (StandardCost)

Therefore, if you want to use **Line Cost** as the first source, you must specify it explicitly in the cost sources grid.
:::

---

## Why does the system allow saving stock receipt vouchers with a quantity greater than the quantity in the purchase invoice?

If you notice that the system allows saving a stock receipt voucher containing a quantity greater than the quantity entered in the purchase invoice, the reason is that the **"Distribute cost based on received quantity regardless of invoice quantity"** option (DistributeCostBasedOnReceiptQty) is enabled in the purchase invoice Document Term.

- *What does this option do?*

When this option is enabled:

1. **It allows the receipt quantity to differ from the invoice quantity** — whether more or less
2. **It distributes the total invoice cost over the actually received quantity** — not the quantity stated in the invoice

- *Practical Result*

You will notice that the **unit cost differs** between the purchase invoice and the stock receipt voucher.

**Example:**
- Purchase invoice: 100 units × 10 SAR = 1,000 SAR total
- Stock receipt voucher: 120 units (actual quantity received)
- Unit cost in receipt = 1,000 ÷ 120 = 8.33 SAR

::: tip When is this option used?
It is used in cases where the actual quantity received differs from the agreed quantity in the invoice, and the customer wants to distribute the full invoice value over the actually received quantity.
:::

::: warning Note
If you want to force the system to match the receipt quantity with the purchase invoice quantity, make sure this option is **not enabled** in the invoice Document Term.
:::

---

## What is the difference between Stock Transfer, Issue Stock Transfer, and Receipt Stock Transfer?

There are three types of stock transfers in the system. They all serve the same fundamental purpose but differ in implementation based on the customer's workflow:

### 📦 Stock Transfer (StockTransfer)
- **Use:** Direct transfer in a single voucher from one warehouse to another
- **Meaning:** Move goods directly from the source warehouse to the destination warehouse

### 📤 Issue Stock Transfer (IssueStockTransfer)  
- **Use:** Issue goods from the original warehouse to "goods in transit"
- **Meaning:** The first step in the transfer process — removing goods from the original warehouse

### 📥 Receipt Stock Transfer (ReceiptStockTransfer)
- **Use:** Receive goods from "goods in transit" to the destination warehouse
- **Meaning:** The second step in the transfer process — bringing goods into the new warehouse

---

### 🔄 Difference in Implementation:

#### **Method One: Direct Transfer**
- Use `StockTransfer` only
- A single operation that moves goods directly from one warehouse to another

#### **Method Two: Staged Transfer**  
- Use `IssueStockTransfer` then `ReceiptStockTransfer`
- Two separate operations:
  1. Issue from the original warehouse → goods in transit
  2. Receive from goods in transit → destination warehouse

---

### 🎯 When to use each type?

::: tip **Direct Transfer (StockTransfer)**
- When warehouses are in the same location
- When there is no need to track transfer stages
- For quick, direct operations
:::

::: info **Staged Transfer (Issue + Receipt)**
- When warehouses are in different locations
- When goods need to be tracked during transit
- When the transfer process may take a long time
- For greater control over issue and receipt operations
:::

**In summary:** All three types achieve the same final outcome, but the choice between them depends on the workflow and the need to track transfer stages.

---

## Why does a warehouse or location not appear in quantity suggestions even though branch-level quantity tracking is not enabled?

**Scenario:**
- You have a quantity of a specific item in a certain location, and it was received against a location whose branch is "General" in a stock receipt whose branch is also "General".
- When creating a sales invoice with branch "General" and clicking on the location field, the quantity and location appear normally.
- But when creating another invoice on branch "001", for example, and clicking on the location field, the quantity does not appear even though branch-level quantity tracking is not enabled nor any other dimensions.

**Reason:**
The issue here is not related to quantity tracking; the reason is **a mismatch between the invoice's dimensions and the location's dimensions**. By default, the system filters warehouses and locations based on dimensions (such as branch) when displaying quantity suggestions.

**Solution:**
To allow the warehouse or location to appear in quantity suggestions regardless of dimension differences, enable the following option in Supply Chain settings:

<SupplyChainOption option-code="value.doNotFilterWarehouseAndLocatorByDimensionsInQtySuggestion" link-title="Do not filter warehouse and location by dimensions in quantity suggestion" />

::: tip Note
This option affects both warehouse and location in quantity suggestions, not just the location.
:::

---
