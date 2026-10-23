---
description: "Catalogue of the 77 system reports for inventory, purchasing, sales and point of sale: where to run them, their shared criteria conventions, and each report's code, names and purpose."
---
# Supply Chain and Sales Reports

A document answers one question at a time: what is on this invoice, what did this receipt bring in. The
questions a storekeeper, a buyer or a sales manager asks on a Monday morning are different. *How much of
item `ITM-0042` do we hold and what is it worth? Which items have not sold in six months? Which invoices
lost money? Are this year's sales ahead of last year's, month by month?* Those are report questions, and
Nama ships a large set of reports to answer them.

This page is the catalogue. It lists every system report that comes with the inventory, purchasing,
sales and point-of-sale parts of the product — **77 of them** — grouped by the question they answer,
with each report's code, its Arabic and English names exactly as the reports list shows them, what it
is for, and the criteria that matter.

## Where the Reports Live and How You Run One

The reports are not inside the inventory or sales menus. Like every report in Nama they sit under
**Reports** (التقارير) → **All Reports**. Each report has a code, and the code is the quickest way to
find it: type `INV` for the inventory reports, `PIV` for purchasing, `SLS` for sales and `POS` for the
point of sale. Typing part of the name works too, in either language.

::: tip The names are the product's own
The English names below are copied as the reports list shows them, including a few run-together or
misspelled ones (`ProfitabilityofItems`, `Invintory Types`). Search for them as written.
:::

Every report opens on a criteria screen. A handful of conventions repeat across almost all of them, and
learning them once saves reading each report's screen:

- **From/To pairs.** Most criteria come in pairs — from item to item, from warehouse to warehouse, from
  legal entity to legal entity. **An empty pair does not filter at all.** Fill only one side and the
  range is open on the other: *from item* `ITM-0100` alone means that item and every code after it.
- **Dates default to the current month** on most reports; a few default to the start of the year or to
  today. The reports that show a balance *on* a date ask for a single date instead of a range.
- **Unit** (الوحدة). Quantity reports let you choose which unit to show quantities in: the item's base
  unit (the default), a reporting unit, or its default purchase or sales unit.
- **Filter Type 1 / Filter Type 2** (with **Filter 1 / Filter 2**). Many inventory reports let you pick
  *which* item classification to filter on — item group, item section, item category, item class 1, 2
  and so on — and then a range of values for it. Pick the classification first, then the range.
- **Hide Zero Values** / **Hide Zero Items** removes items with no balance and no movement, which is
  usually what you want for anything you intend to print.

::: info Reports read processed documents
The inventory reports read the quantity and cost records that a document writes once its inventory
processing has finished. A document still in draft, or one whose processing failed, is not on them. When
a figure looks short, check the document's processing status first. A few sales and purchase detail
reports offer a **With Draft Documents** switch to include drafts on purpose.
:::

## Item Movement Statements — the Item Card

These answer *"what happened to this item?"* — one row per transaction, with the opening balance
brought forward, receipts, issues and the running balance. They differ in what they add on top of
quantity.

| Code | Arabic name | English name | Use it when |
|---|---|---|---|
| `SYSR-INV001` | كشف الحركة المخزنية (كارت صنف) | Item Movement Statement | You need quantities only: the classic item card, with lot, production and expiry dates. |
| `SYSR-INV002` | كشف الحركة المخزنية مع التكاليف | Item Movments with Costs | You need the cost of each movement and the running value next to the quantity. |
| `SYSR-INV003` | كشف الحركة المخزنية مع التكاليف يشمل إعادة التقييم | Item Movments with Costs Includes ReEvaluation | As INV002, but cost revaluations appear as their own rows, and it can be narrowed to a locator. |
| `SYSR-INV004` | كشف الحركة المخزنية مع التكاليف يشمل إعادة التقييم - برقم الباتش | Item Movments with Costs Includes ReEvaluation-Batch | As INV003, broken down by batch, with colour, size and revision ranges. |
| `SYSR-INV020` | كشف الحركة المخزنية مع التكاليف يشمل إعادة التقييم - برقم الباتش | Items Movments with Costs Includes Re-evaluation-Batch-Measures | As INV004, plus the measures (height, width, length, count) of items tracked by measure. |
| `SYSR-INV033` | كشف الحركة المخزنية مع التكاليف يشمل إعادة التقييم مع الاصدار | Item Movments with Costs Includes ReEvaluation - With Revisions | As INV003, with an item revision range. |
| `SYSR-INV026` | كشف الحركة المخزنية مع التكاليف - FIFO | Item Movments with Costs - FIFO | The site costs by FIFO and you want the movement priced from the FIFO layers. |
| `SYSR-INV034` | كشف الحركة المخزنية مع السيريال | Item Movments with Serial Numbers | You need to see which serial numbers went in and out; it can be filtered by one serial (IMEI). |
| `SYSR-INV011` | كشف الاستلامات الورادة من صنف | Total Supply | You want the receipts of an item only, with their cost, lot and expiry. |

Their criteria are the same family throughout: the date range, legal entity, branch, warehouse, item and
supplier ranges, the **Unit**, **Hide Zero Values**, and on the costed ones **Group By Lot**. INV001 and
INV002 also take a lot range.

::: tip Which statement for which question
A quantity dispute ("the system says 12, the shelf says 10") starts on **INV001**. A value question ("why
is this item's average cost 41.30?") starts on **INV003**, because a revaluation that changes cost without
moving quantity only shows as a row there. INV002 builds its rows from quantity movements, so a
revaluation never appears on it as a row of its own.
:::

## Balances and Valuation

These answer *"what do we hold, and what is it worth?"* — either across a period (opening, in, out,
closing) or on a single date.

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-INV005` | ميزان مراجعة تحليلى كميات الاصناف | Items Quantities Analytical Trial Balance | Opening, in, out and closing quantity per item for a period. |
| `SYSR-INV030` | ميزان مراجعة تحليلى كميات الاصناف - مخازن | Items Quantities Analytical Trial Balance - Warehouse | The same, with an optional breakdown by warehouse or legal entity (**Detailing By**). |
| `SYSR-INV006` | ميزان مراجعة تحليلى كميات وتكاليف الاصناف | Items Quantity and Cost Analytical Trial Balance | Opening, in and out split into purchases, sales, issues, adjustments and others, closing — in quantity and cost, per item group. |
| `SYSR-INV031` | ميزان مراجعة تحليلى كميات وتكاليف الاصناف - مخازن | Items Quantity and Cost Analytical Trial Balance - Warehouse | The same, per warehouse. |
| `SYSR-INV009` | كميات الاصناف بالمخازن | Items Quantity In Warehouses | Item-by-warehouse quantity grid, with item section and brand ranges. |
| `SYSR-INV010` | القيمة الحالية للمخزون | Inventory Current Cost Value | Quantity, average cost and value per item and warehouse on a date, with warehouse totals. |
| `SYSR-INV028` | القيمة الحالية للمخزون - FIFO | Inventory Current Cost Value - FIFO | The same valued from FIFO layers. |
| `SYSR-INV019` | رصيد المواقع بالتكلفة | Locators Quantity With Cost | Quantity, average cost and value per locator inside each warehouse. |
| `SYSR-INV027` | تفاصيل أعمار المخزون | Inventory Ages Details | How long the stock on hand has been held, in 30-, 60- or 90-day buckets, with quantity and value. |

The two cost trial balances have a **Without Opening Balances** switch, which drops the opening column
when you only want the period's activity. INV010 can be filtered by the warehouse's main account, which is
how you reconcile an inventory account against the stock behind it; its switches **Hide Details**,
**Hide Zero Items**, **Group Each Warehouse** and **Hide Total Warehouse** decide how much is printed.

::: warning Inventory Ages needs stock-age tracking
INV027 reads the stock-age records, which are only built when **Track Stock Ages** is on. See
[Stock Ages Configuration](/modules/supplychain/configuration/stock-ages-configuration). With tracking off,
the report comes back empty.
:::

## Availability, Reorder Points and Reservations

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-INV007` | حد الطلب للأصناف | Item Order Limit | Every item that has an order limit, per warehouse: the limit, the quantity on hand, and how much is needed to bring it back up to the limit. |
| `SYSR-INV008` | أنواع المخزون | Invintory Types | For each item: on hand, sold but not delivered, reserved, on proforma and purchase invoices, received — and from those, the actual, available, with-supplier and expected quantities. |
| `SYSR-INV029` | الاصناف المحجوزة | Reserved Items | Reserved quantities, grouped by legal entity, warehouse, item or the reserving document. |

INV008 is the one to run when a salesperson asks *"can I promise this?"* Its **Returns Not Considerable**
switch leaves sales returns out of the sold quantity. How reservations themselves work is on the
[Reservation System Guide](/modules/supplychain/reservation-system-guide).

## Overdraft and Cost Checks

An overdraft is a negative balance: more issued than was ever received. These reports find it, and the
documents that caused it. The rules that allow or block it are on
[Overdraft and Quantity Checking](/modules/supplychain/configuration/overdraft-and-quantity-checking).

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-INV016` | الاصناف المسحوبة على المكشوف | Over Draft Policy | Every item, warehouse and lot whose balance is negative **now**, filterable by locator. |
| `SYSR-INV017` | الاصناف المسحوبة على المكشوف بالتاريخ | Over Draft Policy By Date | The same, as it stood **on a past date**. |
| `SYSR-INV013` | بيان بالاصناف المسحوبة على المكشوف | Over draft Items | Negative balances per item and warehouse, filterable by an item classification, showing the alternative code or second name if you choose. |
| `SYSR-INV032` | حركات الأصناف التي أدت إلى وجود مكشوف | Item Overdraft Transactions | The individual issues that pushed a balance below zero. Its switch can judge overdraft by cost dimensions instead of quantity dimensions. |
| `SYSR-INV021` | مستندات المخزون - غير مربوطه بفواتير - التى ليس لها تكلفة | Inventory Documents That Have No Cost | Stock receipts that are not linked to an invoice, so their cost came from elsewhere. **Show Zero Costs Only** narrows it to receipts that carry no cost at all. |

INV021 is the first place to look when an item's cost suddenly drops: a receipt with no cost, brought in
without a purchase invoice, pulls the average down. [Inventory Costing](/modules/supplychain/inventory-costing)
explains how to correct it.

## Stock Taking and Labels

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-INV014` | نموذج الجرد اليدوى (للطباعة) | Manual Inventory Model | A blank count sheet — item code and name with empty quantity columns — to print and hand to the counters. |
| `SYSR-INV012` | الفروق الجردية بالتكاليف | StockTaking Differ with Cost | For a closed count: system quantity, counted quantity, the difference and its cost. Filtered by the end stock-taking document. |
| `SYSR-INV025` | طباعة الباركود | Barcode Generator | Barcode labels for a range of items, for up to four chosen items with their own counts, or for every line of a purchase invoice, stock receipt, sales invoice, stock issue or transfer. It can print the price from a sales price list or the item. |

The count cycle these belong to is on [Stock Taking](/modules/supplychain/stock-taking).

## Issues Against Their Requests and Invoices

When stock leaves by a separate stock issue rather than on the invoice itself, these pair the two sides
so you can see what has not been matched.

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-INV018` | تفصيلى سندات الصرف وطلباتها | StockIssue Details | Each stock issue line next to the issue request it fulfilled, with both quantities. |
| `SYSR-INV023` | تفصيلى أصناف سندات الصرف وفواتيرها | Stock Issue Items Details And Invoices | Each stock issue line next to the sales invoice it delivered. |
| `SYSR-INV024` | فواتير المبيعات وسندات الصرف المخزنى المترتبطة بها | Sales Invoices And Related Stock Issue | Sales invoices and their stock issues. **Show No Stock Issue Only** lists the invoices nothing was issued for yet. |

## Slow-Moving Items and Customers

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-INV022` | بيان بالاصناف الغير مباعة من تاريخ | Statement of unsold items from date | Items with stock but no sale since a date: quantity, last sale, last entry, cost, price and the expected profit. Items bought after a cut-off date can be left out. |
| `SYSR-SLS007` | الاصناف الأكثر مبيعا والأقل مبيعا - رواكد الاصناف | Statement itemsBest/LeastSelling | Items ranked by quantity sold in a period, best-selling first or least-selling first. |
| `SYSR-SLS034` | العملاء الراكدين | Stagnant Customers | Customers who have not bought for longer than the **Maximum Recession Duration** you give, with their balance, last invoice and last collection date. |

## Purchasing

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-PIV001` | فواتير ومردودات المشتريات | PurchaseInvoicesandReturns | Purchase invoices — and returns, unless switched off — for a period: number, date, supplier, buyer, warehouse, term and value. |
| `SYSR-PIV004` | تفاصيل مشتريات الاصناف | Purchases Details of Items | Purchase invoice lines item by item, with quantities, unit price and value. |
| `SYSR-PIV005` | تفاصيل أوامر الشراء | Purchases Order Details | The same layout for purchase orders. |
| `SYSR-PIV006` | تفاصيل عروض مشتريات الاصناف | Items Purchase Quotation Details | The same layout for purchase quotations. |
| `SYSR-PIV003` | مشتريات ومبيعات الاصناف FIFO Cost | Purchases and Sales of Items FIFO Cost | Per item: opening stock, purchases, sales, other movements and current stock in quantity and FIFO value, with the sales price and last cost. |
| `SYSR-PIV007` | قائمة اسعار مشتريات | Purchases PriceList | The prices on purchase price lists, item by item, with the supplier. |

PIV004, PIV005 and PIV006 share one criteria screen: date, legal entity, branch, warehouse, supplier,
created-by user and item ranges, the **Unit**, **Show Details**, and three sort levels (**First Sort**,
**Second Sort**, **Third Sort**) each with its own **Show … Totals** switch. The sort levels are what turn
the report from a line list into "by supplier, then by item" or "by item section, then by item".

## Sales Detail and Totals

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-SLS011` | تفاصيل مبيعات الاصناف | ItemSalesDetails | Sales invoice lines (and returns, unless switched off) with three sort levels and totals — by customer, item, salesman, paying customer, sector or section. **With Sub Customers** folds sub-customers into their parent. |
| `SYSR-SLS012` | تفاصيل مردودات الاصناف | Sales Return Details | The same for sales returns, with a return-reason range. |
| `SYSR-SLS013` | اجمالى مبيعات ومردودات | Total Sales and Returns | Sales and returns per item, quantity and value, filterable by customer, legal entity and document term. |
| `SYSR-SLS014` | اجمالى مبيعات ومردودات بالتصنيف | Total Sales and Returns By ItemClass | The same grouped by item class, including free-item quantities. |
| `SYSR-SLS015` | اجمالى قيم مبيعات ومردودات اصناف | TotalSalesandReturnsbyItems | Per item: price, discounts, tax and net value. |
| `SYSR-SLS016` | اجمالى قيم مبيعات ومردودات فواتير | TotalSalesandReturnsbyInvoice | Per invoice: customer, price, discounts, tax and net value; sales or returns can be hidden. |
| `SYSR-SLS035` | اجمالى كميات وقيم مبيعات ومردودات - تجميع أفقي ورأسي | Total Quantities and Values of sales and Returns - Horizontal and Vertical Aggregation | A pivot: choose what goes across and what goes down (branch, warehouse, customer, salesman, fiscal period, term, book, item classification, item…). It can include point-of-sale invoices. |

SLS035 is the most flexible report on the page. Branch across and fiscal period down (its defaults) gives a
month-by-branch sales grid; item section across and customer down answers "who buys what". If the
selection would produce too many columns, the report says so instead of printing.

## Profitability

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-SLS001` | ربحية الاصناف | ProfitabilityofItems | Per item: quantity, sales value, cost, profit and profit %, totalled by item section. |
| `SYSR-SLS002` | ربحية الفواتير | ProfitabilityofItems | Per invoice: value, cost, profit and profit %, grouped by customer, branch or warehouse. |
| `SYSR-SLS033` | ربحية المبيعات - مع امكانية التجميع بالفترات و المحددات | Sales Profitability - With the ability to group by Fiscal Period or dimensions | Net sales, cost and profit with three ratios, on two grouping levels you choose (legal entity, branch, customer, salesman, item section, item group, brand, warehouse, fiscal period), optionally per day, per item or per invoice. |
| `SYSR-POS002` | ربحية الفواتير تشمل فواتير نقاط البيع | Profitability Of Invoices Including POS | As SLS002, with point-of-sale invoices and returns included. |

Cost on these reports is the cost the stock issue carried, so an invoice whose stock has not been issued
yet shows no cost and an inflated profit. **Hide No Cost** removes those rows; **Without Returns** leaves
returns out.

## Sales Analysis by Period, Branch, Customer and Salesman

These are grids and charts for management: who sold what, where and in which month.

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-SLS003` | صافى قيم مبيعات عميل | TotalSalesItemsCustomer | Net sales value per customer, month by month. |
| `SYSR-SLS004` | صافى قيم مبيعات مندوب مبيعات شهرى | TotalSalesItemsCustomerMonthly | Net sales value per salesman, month by month. |
| `SYSR-SLS005` | صافى قيم مبيعات فرع | TotalSalesItemsBranchValues | Net sales value per item and branch. |
| `SYSR-SLS006` | صافى كميات مبيعات فرع | TotalSalesItemsBranchQuantity | Net sales quantity per item and branch. |
| `SYSR-SLS017` | اجمالى كميات مبيعات اصناف شهرى | TotalSalesItemsQtyMonthly | Quantity per item, January to December. |
| `SYSR-SLS018` | اجمالى قيم مبيعات اصناف شهرى | TotalSalesItemsPriceMonthly | Value per item, January to December. |
| `SYSR-SLS029` | اجمالى كميات وقيم مبيعات اصناف شهرى | TotalSalesItemsQtyandValuesMonthly | Quantity and value per item, month by month. |
| `SYSR-SLS019` | اجمالى قيم مبيعات قسم صنف شهرى | TotalSalesItemSectionPriceMonthly | Value per item section, month by month. |
| `SYSR-SLS020` | اجمالى قيم مبيعات قسم صنف بالفروع شهرى | TotalSalesItemSectionQtyMonthly - Branch | Value per item section and branch, month by month. |
| `SYSR-SLS031` | اجمالى قيم مبيعات قسم صنف بالقطاعات شهرى | TotalSalesItemSectionQtyMonthly - Sector | Value per item section and sector, month by month. |
| `SYSR-SLS008` | صافى المبيعات بالشهور - رسوم بيانية | TotalSalesMonthly - withCharts | Net sales per month, as a chart. |
| `SYSR-SLS009` | صافى المبيعات بالتصنيف - رسوم بيانية | TotalSalesItemClass - withCharts | Net sales per item class, as a chart. |
| `SYSR-SLS030` | قيم مبيعات عملاء - رسوم بيانيه | Customers Sales Value - Charts | Sales, returns and balance for the customers you select, with an optional chart. |

Most of them net returns off the sales; a returns switch on the criteria screen (عدم اعتبار المردودات) leaves
returns out. Most take date, legal entity, branch, item section and item ranges.

## Year Comparisons

Eight reports put the months of a year side by side per item (or per sector and item section), with the
difference or the share of each month. They come in pairs — quantity or value, difference or percentage:

| Code | Arabic name | English name |
|---|---|---|
| `SYSR-SLS021` | مقارنة كميات المبيعات سنوي بالشهور | SalesQuantityComparisonMonthly |
| `SYSR-SLS022` | مقارنة كميات المبيعات سنوي بالشهور - نسبة | SalesQuantityComparisonMonthly - percentage |
| `SYSR-SLS023` | مقارنة قيم المبيعات سنوي بالشهور | SalesValueComparisonMonthly |
| `SYSR-SLS024` | مقارنة قيم المبيعات سنوي بالشهور - نسبة | SalesValueComparisonMonthly - percentage |
| `SYSR-SLS025` | مقارنة كميات المبيعات سنوي بالشهور - بالفرع/قسم الصنف | SalesQuantityComparisonMonthly -Sector/ItemSection |
| `SYSR-SLS026` | مقارنة كميات المبيعات سنوي بالشهور - بالفرع/قسم الصنف - نسبة | SalesQuantityComparisonMonthly -Sector/ItemSection-percentage |
| `SYSR-SLS027` | مقارنة قيم المبيعات سنوي بالشهور - بالفرع/قسم الصنف | SalesValueComparisonMonthly -Sector/ItemSection |
| `SYSR-SLS028` | مقارنة قيم المبيعات سنوي بالشهور - بالفرع/قسم الصنف - نسبة | SalesValueComparisonMonthly -Sector/ItemSection-percentage |

## Price Lists

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-SLS010` | قوائم اسعار المبيعات | SalesPriceList | Each sales price list's lowest, highest and default price per item, with the customer class. **Item Dosen't Have Price Only** lists the items missing from the list. |
| `SYSR-PIV007` | قائمة اسعار مشتريات | Purchases PriceList | Listed under [Purchasing](#Purchasing) above. |

How price lists are built is on [Pricing, Offers & Coupons](/modules/supplychain/pricing-offers-and-coupons).

## Customer Statements With the Items Sold

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-SLS032` | كشف حساب عميل تفصيلي - يشمل الاصناف المباعة | Detailed Customer Account Statement - Includes Sold Items | The customer's account statement on their main account — opening balance, every transaction, running balance — with each invoice and return opened up to its items, quantities, prices, discounts and taxes. |
| `SYSR-SLS036` | كشف حساب عميل تفصيلي - يشمل الاصناف المباعة - على الحسابات التي | Detailed Customer Account Statement - Includes Sold Items - B5 | The same statement, but taken over every account whose general-purpose **Boolean 5** field is ticked, instead of the customer's main account. |

Both take a customer range and a date range. Use SLS036 when a customer's dealings run over more than one
account (a separate notes-receivable or retention account, for example): tick **Boolean 5** on each of
those accounts and the statement gathers them all.

## Point of Sale

| Code | Arabic name | English name | What it shows |
|---|---|---|---|
| `SYSR-POS001` | تفاصيل مبيعات نقاط البيع | Point of Sales Sales Details | Point-of-sale invoice lines (and returns, unless switched off) by branch and register, with totals per register and per branch. |
| `SYSR-POS002` | ربحية الفواتير تشمل فواتير نقاط البيع | Profitability Of Invoices Including POS | Listed under [Profitability](#Profitability) above. |

Running reports from the register itself is covered on [POS Reports & Tools](/modules/pos/pos-reports-and-tools).

## When None of These Fits

The shipped reports are a starting point. When a site needs a different layout or a criterion these do not
offer, copy the closest one and change the copy, or build a new one with the report wizard — see
[Reports](/platform/reports/).
