---
description: "The five Sales Price Classifier files: what a classifier is, how the Use Price Classifier switches make sales and purchase price lists, offers and free items match on it, the item restriction, the Price List Default Price column choice, and the dated extra prices that contracting price lists add."
entities: [SalesPriceClassifier1, SalesPriceClassifier2, SalesPriceClassifier3, SalesPriceClassifier4, SalesPriceClassifier5]
---
# Sales Price Classifiers

Sales price classifiers are five extra price dimensions for when customer, item and date are not enough to tell
two prices apart.
A car dealer sells the same model at one price with the standard trim and another with the premium trim. A
clinic charges one price for a session in the morning shift and another in the evening. A caterer prices the same
meal differently for delivery and for collection. None of these differences is about the customer or the item, so
neither a customer class nor an item class can carry them. A **Sales Price Classifier** can: it is a value you
put on the document, and price lists that carry the same value answer with their own price.

Nama gives you five independent classifier files, **Sales Price Classifier 1** to **Sales Price Classifier 5**
(*Basic → Master Files → Sales Price Classifier 1* … *5*; the same screens are also listed under the car files
of the service center's cars menu). Like the item classes, the five slots mean whatever you decide: use
Classifier 1 for the trim, Classifier 2 for the sales channel, and leave the rest empty.

## The classifier screen

Every one of the five screens is the same:

| Field | What it does |
| --- | --- |
| **Code**, **Arabic Name**, **English Name**, **Remarks** | The value itself, as people will pick it on documents. |
| **Item** (`item`) | Ties the classifier to one item. When you pick a classifier on a document line, the list shows only the classifiers tied to that line's item and the ones with no item. Leave it empty for a classifier that applies to everything. |
| **Price List Default Price** (`priceListDefaultPrice`) | Which price column of the matching price list line becomes the unit price — default, minimum, maximum, custom or N1–N5. It is one link in a chain: the customer, the document term, the customer category, the customers' class and the invoice classification are asked first, then classifiers 1 to 5 in order, then the supply-chain configuration. The first one that names a column wins. |
| **Extra Prices** grid (`lines`) | Dated surcharges: **From Date**, **To Date**, **Extra Price Value Type** (value or percentage) and **Extra Price**. Read only by contracting price lists — see below. **To Date** must not be before **From Date**. |
| **Classifier Specifications** grid (`classifierSpecifications`) | Free **Remark** lines describing what the classifier stands for. Nothing reads them. |

## Putting a classifier on a document

Supply-chain documents carry **Price Classifier 1** to **Price Classifier 5** both on the header and on each line.
A value on the line beats the one on the header, so you can set the usual value once at the top and override it on
the odd line.

Sales price lists, sales offers and their free items, invoice-level discounts, item relations and purchase price
lists carry the same five columns on their lines. Whether they are
compared at all is decided per classifier by **Use Price Classifier 1** … **5** (`value.usePriceClassifier1` …
`value.usePriceClassifier5`) on the Sales & Offers tab of the supply-chain configuration — see
[Sales & Offers Configuration](./configuration/sales-and-offers-configuration.md). With the switch on:

- a document line with a classifier matches price list lines that carry the **same** classifier **or none**;
- a document line without one matches only price list lines where that classifier is **empty**.

With the switch off, that classifier is ignored when searching for a price, an offer, a discount or a free item.

::: tip Leave the general price blank
Write your normal price list line with the classifier empty and add a second line with the classifier filled
for the special case. Documents without the classifier find the first line; documents with it find both, and
the usual price list priority decides between them.
:::

## Extra prices on contracting price lists

When a [contracting price list](/modules/contracting/setup/contracting-price-lists) answers a line, Nama adds the
extra prices of every classifier on that line (a classifier on the line beats one on the document). From each
classifier it takes the **Extra Prices** rows whose date range covers the document's value date: a **Value** row
adds its amount, a **Percentage** row adds that percentage of the price. The surcharge is added to the default,
minimum and maximum price alike.

Supply-chain price lists and offers do not use the extra prices; they only match on the classifier.

## Other modules that use the classifiers

The same five files are reused outside supply-chain pricing — on the hospital pricing plans
([Pricing, Costing & Discounts](/modules/hms/hms-pricing)), on the rental asset price table
([The Rental Asset File](/modules/servicecenter/rental-assets/servicecenter-rental-asset)) and on contracting
price lists — each time as an extra key a price row can be narrowed by.
