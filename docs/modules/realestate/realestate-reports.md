---
description: "The seven Real Estate system reports SYSR-RLS001 to SYSR-RLS007 — sales by building, sold and remaining units, model prices, unit status, unpaid installments, amounts remaining and sales contract details — with their criteria and columns."
---

# Real Estate Reports

Real Estate ships seven system reports, `SYSR-RLS001` to `SYSR-RLS007`, and all seven answer questions from the selling side of the module: what have we sold, what is still free, what is each layout priced at, and how much do buyers still owe. There is no shipped report for the leasing side, for maintenance or for investment funds. Those are custom reports.

The reports belong to the `realestate-sales` licence. They are installed with the system reports and need no setup beyond that. Like every report in Nama they are not in the Real Estate menu. They sit under **Reports** → **All Reports**: type `RLS` and all seven come up together. Who may run them is decided the same way as for any other system report — see [System reports](/platform/reports/reports-guide#System-reports).

| Code | Title (Arabic) | Title printed in English | It answers |
|---|---|---|---|
| `SYSR-RLS001` | اجمالى المبيعات مقسم بالعمائر | Total Sales by Buildings | Which contracts did we sign in this period, and for how much? |
| `SYSR-RLS002` | اجمالى الوحدات المباعة والمتبقى | Total Sold and Remaining Units | How many units has each project sold, and how many are left? |
| `SYSR-RLS003` | اسعار النماذج | Model Prices | What is each unit model priced at on each price list? |
| `SYSR-RLS004` | تفاصيل الوحدات | Units Details | Unit by unit, which are sold, which are reserved, and who bought them? |
| `SYSR-RLS005` | تفاصيل الاقساط الغير مسدده | Unpaid Installment Details | Which contracts have installments outstanding, and when were they due? |
| `SYSR-RLS006` | بيان بالمبالغ المتبقية فى عقود البيع | Amounts Remaining in Sales Contracts | How much does each contract still owe, installment by installment? |
| `SYSR-RLS007` | تفاصيل عقود البيع | Sales Contracts Details | What was due on each installment, what was paid, when, and by what means? |

Three things are true of all seven, so learn them once:

- **Record criteria are lists, dates are ranges, and an empty criterion does not filter.** A project, building, unit, buyer or unit model criterion takes a list: pick one record or several, and the report keeps only the rows that match one of them. A date criterion is one range with a from date and a to date; fill only one end and the range is open on the other side. You never have to fill a criterion you do not care about.
- **Contracts mean both kinds.** The reports that read contracts read the [sales contract](/modules/realestate/sales/realestate-sales-contract.md) and the [opening sales contract](/modules/realestate/opening/realestate-opening-sales.md) together. Opening contracts carry codes such as `REOS…` and sit among the ordinary ones.
- **The tables give both criteria labels.** Each criterion below is named by its English label, followed by the label the Arabic interface shows.

## Total Sales by Buildings — SYSR-RLS001

This is the "what did we sell this month" report. It lists every sales contract and opening sales contract whose **value date** falls in the range, one row per contract, with the contract's code, the unit it sold and the contract price. The rows are grouped by building, each building ends with a total line, and a grand total of the price closes the report. Click a contract code to open the contract.

| Criterion (on screen) | Filters on |
|---|---|
| Date (التاريخ) | The contract's value date. Defaults to the current month. |
| RE Project (مشروع استثمار عقاري) | The project of the sold unit. |
| RE Building (مبنى استثمار عقاري) | The building on the contract. |
| Rental Unit (وحدة استثمار عقاري) | The unit itself. |
| ShowDetails (إظهار التفاصيل) | Ticked by default. Untick it and the contract rows are not printed, so the report shows only the building totals and the grand total. |

## Total Sold Units and Remaining — SYSR-RLS002

The stock count. For each project it prints three numbers: **Total Sold Units**, **Total Remaining Units** and **Total Units**. It reads the **Sold** mark on each [rental unit](/modules/realestate/properties/realestate-buildings-floors-and-units#Rental-Unit----the-thing-customers-buy), which the sales contract sets, so it is a picture of today and takes no dates.

"Remaining" means *not sold*. A unit that is reserved but not yet sold counts as remaining here. If you need reserved units counted on their own, use the Units Details report below.

| Criterion (on screen) | Filters on |
|---|---|
| RE Project (مشروع استثمار عقاري) | The unit's project. |
| Rental Unit (وحدة استثمار عقاري) | The unit. |

## Models Price — SYSR-RLS003

A price sheet for the sales office. It lists each [unit model](/modules/realestate/properties/realestate-buildings-floors-and-units#Unit-Model----the-layout-you-define-once) with its name, its unit area and its price — one row for every line of a [price list](/modules/realestate/sales/realestate-price-lists-and-payment-methods.md) that names the model. A model priced on three price lists appears three times, once per list.

Its only criterion is **Unit Model** (نموذج وحدة), a list of unit models.

The sheet also has **Advance payment**, **Installment Value**, **Installment Count** and **Receipt Date** columns. The model screen has no fields for these. The report reads them from the model's spare fields: **Number 2** (advance payment), **Number 4** (installment value), **Number 3** (installment count) and **Date 2** (receipt date). Those fields are not on the Unit Model screen by default, so the columns print zero and blank until you add the fields to the screen with a [Screen Modifier](/platform/screen-modifier/) and fill them in.

## Units Details — SYSR-RLS004

The unit-by-unit view of the same stock. It lists every rental unit with its building, floor, model, status and buyer, grouped by building. The **Status** column reads «مباعة» for a sold unit, «محجوزة» for a reserved one, and is blank for a unit that is still free. After each building, three subtotals count its available, reserved and sold units. The buyer comes from the unit's sales contract or opening sales contract.

| Criterion (on screen) | Filters on |
|---|---|
| RE Project (مشروع استثمار عقاري) | The unit's project. |
| RE Building (مبنى استثمار عقاري) | The unit's building. |
| Rental Unit (وحدة استثمار عقاري) | The unit. |
| Owner (مالك - مشتري) | The buyer on the unit's contract. Unsold units drop out as soon as this criterion is filled. |
| Unit Model (نموذج وحدة) | The unit's model. |
| HideZeroItems (اظهار المتاح فقط) | Show available units only. Sold and reserved rows are hidden; the building subtotals still count every unit. |

## Details of Unpaid Installments — SYSR-RLS005

The collector's list. It prints one block per contract that still has money owing — the project, building, floor, buyer and unit area — followed by the **due date** of every installment line that still has a remaining amount, and a count of those installments. An installment that has been partly paid still counts as unpaid. The report shows dates, not amounts: for amounts, use the next report.

| Criterion (on screen) | Filters on |
|---|---|
| Due Date (تاريخ الاستحقاق) | The installment's due date. Fill it to see only what fell due in a period. |
| RE Project (مشروع استثمار عقاري) | The contract's project. |
| RE Building (مبنى استثمار عقاري) | The contract's building. |
| Rental Unit (وحدة استثمار عقاري) | The contract's unit. |
| Owner (مالك - مشتري) | The buyer. |

## Amounts Remaining in Sales Contracts — SYSR-RLS006

The same population as the unpaid-installments report, with the money on it. Each contract that still has an unpaid installment gets a header row — code, value date, unit, project, building, floor, buyer, area, **Advance payment**, **Maintenance Deposit** and **Total Price** — and beneath it one row per unpaid installment line with its **Installment Code**, **Value**, **Due Date** and **Remaining Amount**. The report ends with totals of the unpaid amount, the advance payments, the maintenance deposits and the contract prices.

The **Advance payment** figure is the contract's down payment. Any installment line whose code contains «باق» — as in «باقي المقدم», the rest of the down payment — is added to it, because the report treats such a line as part of the down payment.

Its criteria are those of `SYSR-RLS005`, read the same way.

## Sales Contracts Details — SYSR-RLS007

The full installment ledger of each contract, and the report to open when a buyer disputes what they have paid. It lists every installment line of every contract — paid or not — with the contract's code, value date, unit, project, building, floor and buyer, then the installment's **Installment Code**, **Due Date** and **Value**, the amount **Collected Receipt Papers** (collected through cheques and other receivable papers), the **Paid Value**, the **Remaining Amount**, the **Payment Date**, and a **Status** that reads *Paid* («تم الدفع») or *Not Paid* («لم يتم الدفع»). The last line totals the **Value**, **Collected Receipt Papers**, **Paid Value** and **Remaining Amount** columns.

The paid value and paid date come from the payments recorded against the installment by collection documents. An installment settled in two payments therefore appears on two rows, one per payment, each with its own date and amount.

| Criterion (on screen) | Filters on |
|---|---|
| Due Date (تاريخ الاستحقاق) | The installment's due date. |
| Payment Date (تاريخ الدفع) | The payment date. Once this range is filled, installments with no payment drop out — the report then lists payments rather than installments. |
| Date (التاريخ) | The contract's value date. |
| RE Project (مشروع استثمار عقاري) | The contract's project. |
| RE Building (مبنى استثمار عقاري) | The contract's building. |
| Rental Unit (وحدة استثمار عقاري) | The contract's unit. |
| Owner (مالك - مشتري) | The buyer. |
| From Installment / To Installment (من قسط / إلى قسط) | The installment code, typed as text (for example `INS01`). |
| HideZeroItems (إظهار الاكواد الغير مسدده فقط) | Show unpaid installments only. Lines marked paid are hidden. |

## Where to Go Next

- [How Installment Collection Works](/modules/realestate/collections/realestate-collection-basics.md) — what moves an installment's paid and remaining amounts, which these reports read.
- [The Sales Contract](/modules/realestate/sales/realestate-sales-contract.md) — where the installment lines come from.
- [Reports Guide](/platform/reports/reports-guide.md) — running reports, exporting them, and copying a system report to change it.
