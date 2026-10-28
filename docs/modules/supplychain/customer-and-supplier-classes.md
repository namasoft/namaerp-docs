---
description: "The customer and supplier grouping files: Customers' Class, Customer Class 1–5, Customer Category and Suppliers' Class — what each one holds, where it sits on the customer or supplier file, and which price lists, offers, item links and sales limits read it."
entities: [CustomerClass, CustomerClass1, CustomerClass2, CustomerClass3, CustomerClass4, CustomerClass5, CustomerCategory, SupplierClass]
---
# Customer and Supplier Classes

A price list written for "every wholesale customer" should not need editing each time a new wholesaler is
added. That is what the grouping files are for: you define a handful of groups once, put each customer or
supplier in the right group on its own file, and then write price lists, offers and restrictions against the
group instead of against individual customers. A new customer joins the group and inherits all of it on day one.

Nama ships seven such files for customers and one for suppliers. They are small master files — a code, Arabic
and English names, and in three cases a few settings — and they mean whatever you decide they mean.

## The screens and where they are used on the party

| Screen | Menu | Extra fields | Field on the customer / supplier file |
| --- | --- | --- | --- |
| **Customers' Class** | *Sales → Master Files → Customers' Class* | **Down Payment Percentage**, **Default UOM**, **Price List Default Price** | **Customers' Class** (`customerClass`) |
| **Customers' Class 1** … **Customers' Class 5** | *Sales → Master Files → Customers' Class 1* … *5* | none | **Customer Class 1** … **5** (`customerClass1` … `customerClass5`) |
| **Customer Category** | *Sales → Master Files → Customer Category* | **Price List Default Price** | **Customer Category** (`customerCategory`) |
| **Suppliers' Class** | *Purchases → Master Files → Suppliers' Class* | **Default UOM** | **Supplier Class** (`supplierClass`) |

All of the customer fields sit together in the **Basic Information** group of the customer file, and the supplier
class on the supplier file's **Main** tab — see
[Customers, Suppliers and Other Parties](/platform/shared-master-files/customers-suppliers-and-parties).

::: tip Customers' Class is the one with settings
The numbered classes 1–5 and the category are pure labels. Only **Customers' Class** carries a down payment,
a default unit and a price column, so if you only need one grouping, use that one.
:::

## What the extra fields do

**Down Payment Percentage** (`downPaymentPercentage`) — used by the glass job order. When you pick the customer
on a **Glass Job Order**, the order's down payment percentage is taken from the customer's own
**Down Payment Percentage**, or from its **Customers' Class** when the customer has none. See
[Specialized Scenarios](./specialized-scenarios.md).

**Default UOM** (`defaultUOM`) — the unit a line takes when you enter an item by its code on a document that has a
customer or supplier: the item's **Base Unit(Smallest)**, **Reporting Unit 1**, **Reporting Unit 2**,
**Default Sales Unit** or **Default Purchase Unit**. A barcode that already names a unit keeps that unit. The customer's (or supplier's) own **Default UOM** wins; when it is empty the class's value is
used, then — for a customer — the paying customer's, and finally the default sales or purchase unit set on the
warehouse.

**Price List Default Price** (`priceListDefaultPrice`) — a price list line holds several candidate prices
(default, minimum, maximum, custom and N1–N5). This decides which of them becomes the unit price. Nama walks a
fixed chain and stops at the first one that names a column: the customer → the document term → the
**Customer Category** → the **Customers' Class** → the invoice classification → the price classifiers → the
supply-chain configuration. If nobody names one, the default price is used. The company-wide end of the chain is
described in [Pricing and Price Lists](./configuration/pricing-and-price-lists.md).

## Where the groups are read

| Where | Which groups it accepts |
| --- | --- |
| **Price List** and **Sales Offer** — the customer they apply to, and the pricing ranges inside them | A customer, **Customers' Class**, **Customer Category** or **Customers' Class 1–4**. A document's customer matches a line written for itself, its Customers' Class, its Class 1–4, its category, its group or its paying customer. |
| **Item Customer Link**, and **Limit To Customer** on the item | A customer, **Customers' Class**, **Customers' Class 1–5** or a group — see [Creating and Maintaining Items](./item-maintenance.md). |
| **Item Supplier Link**, and **Limit To Supplier** on the item | A supplier, **Suppliers' Class** or a group. |
| **Purchase Price List** | One supplier or a whole **Suppliers' Class** — see [How a Purchase Price Is Decided](./purchase-pricing.md). |
| **Limit Sales Qty** | **Customer Category** and **Customers' Class** — see [Sales and Purchase Operations Documents](./sales-operations-documents.md). |
| **Periodic Monthly Sales Offer** — candidate customers | **Customers' Class**, **Customer Category** or **Customers' Class 1–4**. |
| **Post Sales Offer** — candidate customers | A customer or a **Customers' Class** — see [Pricing, Offers & Coupons](./pricing-offers-and-coupons.md). |

Because every class is an ordinary reference field on the customer or supplier, it is also available as a list
filter, a report parameter and a criteria field, and **Customers' Class** is one of the default filters on the
customer list.

::: info Class 5 is not offered on price lists and offers
The customer field on price lists, sales offers and the periodic monthly offer lists Customers' Class 1–4 only.
Customer Class 5 is still matched by item–customer links and item limits, so keep it for groupings you need there.
:::
