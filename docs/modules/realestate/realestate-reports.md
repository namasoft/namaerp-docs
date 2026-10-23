---
description: "The seven Real Estate system reports SYSR-RLS001 to SYSR-RLS007 — sales by building, sold and remaining units, model prices, unit status, unpaid installments, amounts remaining and sales contract details — with their criteria and columns."
---

# Real Estate Reports

Real Estate ships seven system reports, `SYSR-RLS001` to `SYSR-RLS007`, and all seven answer questions from the selling side of the module: what have we sold, what is still free, what is each layout priced at, and how much do buyers still owe. There is no shipped report for the leasing side, for maintenance or for investment funds. Those are custom reports.

The reports belong to the `realestate-sales` licence. They are installed with the system reports and need no setup beyond that. Like every report in Nama they are not in the Real Estate menu. They sit under **Reports** → **All Reports**: type `RLS` and all seven come up together. Who may run them is decided the same way as for any other system report — see [System reports](/platform/reports/reports-guide#System-reports).

| Code | Title (Arabic) | Title printed in English | It answers |
|---|---|---|---|
| `SYSR-RLS001` | اجمالى المبيعات مقسم بالعمائر | Total Sales by Buildings | Which contracts did we sign in this period, and for how much? |
| `SYSR-RLS002` | اجمالى الوحدات المباعة والمتبقى | TotalSoldUnitsandRemaining | How many units has each project sold, and how many are left? |
| `SYSR-RLS003` | اسعار النماذج | ModelsPrice | What is each unit model priced at on each price list? |
| `SYSR-RLS004` | تفاصيل الوحدات | Units Details | Unit by unit, which are sold, which are reserved, and who bought them? |
| `SYSR-RLS005` | تفاصيل الاقساط الغير مسدده | Details of unpaid installments | Which contracts have installments outstanding, and when were they due? |
| `SYSR-RLS006` | بيان بالمبالغ المتبقية فى عقود البيع | Amounts Remaining in Sales Contracts | How much does each contract still owe, installment by installment? |
| `SYSR-RLS007` | تفاصيل عقود البيع | Sales Contracts Details | What was due on each installment, what was paid, when, and by what means? |

Three things are true of all seven, so learn them once:

- **Every criterion is a from/to pair, and an empty pair does not filter.** You never have to fill a range you do not care about. A half-filled pair — a *from project* with no *to project* — cuts off everything above it.
- **Contracts mean both kinds.** The reports that read contracts read the [sales contract](/modules/realestate/sales/realestate-sales-contract.md) and the [opening sales contract](/modules/realestate/opening/realestate-opening-sales.md) together. Opening contracts carry codes such as `REOS…` and sit among the ordinary ones.
- **The tables give the Arabic criteria labels.** Each criterion below is named by the label the Arabic interface shows, in the order the criteria screen lists them.

## Total Sales by Buildings — SYSR-RLS001

This is the "what did we sell this month" report. It lists every sales contract and opening sales contract whose **value date** falls in the range, one row per contract, with the contract's code, the unit it sold and the contract price, and a grand total of the price at the end. Click a contract code to open the contract.

| Criterion (on screen) | Filters on |
|---|---|
| From Date / To Date | The contract's value date. Defaults to the first and last day of the current month. |
| من مشروع / إلى مشروع | The project of the sold unit. |
| من عمارة / إلى عمارة | The building on the contract. |
| من شقة / إلى شقة | The unit itself. |

## Total Sold Units and Remaining — SYSR-RLS002

The stock count. For each project it prints three numbers: **Total Sold Units**, **Total Remaining Units** and **Total Units**. It reads the **Sold** mark on each [rental unit](/modules/realestate/properties/realestate-buildings-floors-and-units#Rental-Unit----the-thing-customers-buy), which the sales contract sets, so it is a picture of today and takes no dates.

"Remaining" means *not sold*. A unit that is reserved but not yet sold counts as remaining here. If you need reserved units counted on their own, use the Units Details report below.

| Criterion (on screen) | Filters on |
|---|---|
| من مشروع / إلى مشروع | The unit's project. |
| من شقة / إلى شقة | The unit. |

## Models Price — SYSR-RLS003

A price sheet for the sales office. It lists each [unit model](/modules/realestate/properties/realestate-buildings-floors-and-units#Unit-Model----the-layout-you-define-once) with its name, its unit area and its price — one row for every line of a [price list](/modules/realestate/sales/realestate-price-lists-and-payment-methods.md) that names the model. A model priced on three price lists appears three times, once per list.

Its only criterion is a range of unit models, labelled **من نموذج** on both fields.

The sheet also has **Advance payment**, **Installment Value**, **Installment Count** and **Receipt Date** columns. The model screen has no fields for these. The report reads them from the model's spare fields: **Number 2** (advance payment), **Number 4** (installment value), **Number 3** (installment count) and **Date 2** (receipt date). Those fields are not on the Unit Model screen by default, so the columns print zero and blank until you add the fields to the screen with a [Screen Modifier](/platform/screen-modifier/) and fill them in.

## Units Details — SYSR-RLS004

The unit-by-unit view of the same stock. It lists every rental unit with its building, floor, model, status and buyer, grouped by building. The **Status** column reads «مباعة» for a sold unit, «محجوزة» for a reserved one, and is blank for a unit that is still free. After each building, three subtotals count its available, reserved and sold units. The buyer comes from the unit's sales contract or opening sales contract.

| Criterion (on screen) | Filters on |
|---|---|
| من مشروع / الى مشروع | The unit's project. |
| من مبنى / إلى مبنى | The unit's building. |
| من مشترى / إلى مشترى | The buyer on the unit's contract. Unsold units drop out as soon as this pair is filled. |
| من نموذج / الى نموذج | The unit's model. |
| اظهار المتاح فقط | Show available units only. Sold and reserved rows are hidden; the building subtotals still count every unit. |

## Details of Unpaid Installments — SYSR-RLS005

The collector's list. It prints one block per contract that still has money owing — the project, building, floor, buyer and unit area — followed by the **due date** of every installment line that still has a remaining amount, and a count of those installments. An installment that has been partly paid still counts as unpaid. The report shows dates, not amounts: for amounts, use the next report.

| Criterion (on screen) | Filters on |
|---|---|
| من تاريخ استحقاق / إلى استحقاق | The installment's due date. Fill it to see only what fell due in a period. |
| من مشروع / الى مشروع | The contract's project. |
| من مبنى / إلى مبنى | The contract's building. |
| من مشترى / إلى مشترى | The buyer. |

## Amounts Remaining in Sales Contracts — SYSR-RLS006

The same population as the unpaid-installments report, with the money on it. Each contract that still has an unpaid installment gets a header row — code, value date, unit, project, building, floor, buyer, area, **Advance payment**, **Maintenance Deposit** and **Total Price** — and beneath it one row per unpaid installment line with its **Installment Code**, **Value**, **Due Date** and **Remaining Price**. The report ends with totals of the unpaid amount, the advance payments, the maintenance deposits and the contract prices.

The **Advance payment** figure is the contract's down payment. Any installment line whose code contains «باق» — as in «باقي المقدم», the rest of the down payment — is added to it, because the report treats such a line as part of the down payment.

Its criteria are those of `SYSR-RLS005`, read the same way.

## Sales Contracts Details — SYSR-RLS007

The full installment ledger of each contract, and the report to open when a buyer disputes what they have paid. It lists every installment line of every contract — paid or not — with the contract's code, value date, unit, project, building, floor and buyer, then the installment's **Installment Code**, **Due Date** and **Value**, the amount **Collected Receipt Papers** (collected through cheques and other receivable papers), the **Paid Value**, the **Remaining Price**, the **Paid Date**, and a **Paid Status** that reads «تم الدفع» or «لم يتم الدفع». The last line totals the **Paid Value** column.

The paid value and paid date come from the payments recorded against the installment by collection documents. An installment settled in two payments therefore appears on two rows, one per payment, each with its own date and amount.

| Criterion (on screen) | Filters on |
|---|---|
| من تاريخ / إلى تاريخ | The contract's value date. |
| من تاريخ استحقاق / إلى تاريخ استحقاق | The installment's due date. |
| من تاريخ دفع / إلى تاريخ دفع | The payment date. Once this pair is filled, installments with no payment drop out — the report then lists payments rather than installments. |
| من مشروع / الى مشروع | The contract's project. |
| من مبنى / إلى مبنى | The contract's building. |
| من مشترى / إلى مشترى | The buyer. |
| من قسط / إلى قسط | The installment code, typed as text (for example `INS01`). |
| إظهار الاكواد الغير مسدده فقط | Show unpaid installments only. Lines marked paid are hidden. |

## Where to Go Next

- [How Installment Collection Works](/modules/realestate/collections/realestate-collection-basics.md) — what moves an installment's paid and remaining amounts, which these reports read.
- [The Sales Contract](/modules/realestate/sales/realestate-sales-contract.md) — where the installment lines come from.
- [Reports Guide](/platform/reports/reports-guide.md) — running reports, exporting them, and copying a system report to change it.
