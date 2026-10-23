---
description: "The five shipped Fixed Assets reports: where to run them, and how the General Assets report, consolidated trial balance, depreciation matrix, detailed depreciation listing and depreciation by type and location answer register-wide questions."
---
# Fixed Assets Reports

The asset register answers questions one asset at a time. Open `MCH-0007` and you can read its cost, its accumulated depreciation, its book value and every transaction that produced them. Reports answer the other kind of question — the ones that span the whole register. What did the machinery account do over the year? Which asset took how much depreciation in March? Does the register still agree with the ledger?

Fixed Assets ships **five** reports for that, installed with the system and ready to run the day the module is switched on. Between them they cover the four questions an asset accountant actually asks: what do we own and what is it worth *today*, what *moved* during the year, what did each asset take in *depreciation*, and do the register and the ledger still *match*.

Throughout this page we run the reports over the machine the rest of the module documentation follows:

> **Al-Waha Industries** bought CNC cutting machine `MCH-0007` on 1 January 2026 for **240,000**, over a **60-month** life with a **24,000** salvage value. It depreciates **3,600** a month, so by 31 December 2026 it carries **43,200** of accumulated depreciation and a book value of **196,800**, with **48** instalments left.

## Where the Reports Live and How You Run One

The five reports are not in the Fixed Assets menu — they sit with every other report in Nama, under **Reports** (التقارير) → **All Reports**. Type part of a title to find one, or type `AST` and all five come up together.

Each report opens on a criteria screen before it runs, and almost every criterion is a **from/to pair**: from asset to asset, from location to location, from fiscal period to fiscal period. The rule for all of them is the same and it is worth learning once — **an empty pair does not filter at all.** You never have to fill a range you do not care about, and the usual cause of "the report is missing assets" is a half-filled pair: a *from asset* with no *to asset* silently cuts off everything above it.

Three of the reports carry a **Hide Details** (إخفاء التفاصيل) tick box. Leave it clear and you get every asset line; tick it and the report collapses to its totals — per account, per asset type or per master group, depending on the report. It is the difference between a working paper and a one-page summary, and it is the fastest way to make a large register printable.

Two of them also carry **Group By** (تجميع بـ), which offers **Fixed Asset Type** or **Group** — the master group on the asset record — and defaults to asset type. It changes how the rows are gathered and which subtotals you get, not which rows appear.

::: tip Reports read the register, not your draft documents
Every figure on these reports comes from what documents have already written to the asset. A depreciation run you have saved but not committed, or one whose processing has not finished yet, is not on them. If a period looks short, check the [depreciation run](/modules/fixedassets/depreciation/fixedassets-depreciation-document.md) first and the report second.
:::

## The Five Reports at a Glance

| Code | Title (Arabic) | Name in the reports list | It answers |
|---|---|---|---|
| `SYSR-AST001` | ميزان مراجعة الأصول الثابتة المجمع | FixedAssetsConsolidatedTrialBalance | Does each asset's cost, accumulated depreciation and depreciation expense agree with the ledger? |
| `SYSR-AST002` | تفاصيل إهلاك الأصول الثابتة | FixedassetsDepreciationDetails | Which asset took how much depreciation in which fiscal period? |
| `SYSR-AST003` | تقرير الأصول العام | FixedassetsGeneral | What did the register open with, what moved during the range, and what does it close with? |
| `SYSR-AST004` | اهلاك الاصول تفصيلي | FixedAssetsDepreciation | What do we own right now, asset by asset, with cost, accumulated depreciation and book value? |
| `SYSR-AST005` | اهلاكات الاصول بالفترة | FADepreciationPeriod | What is the depreciation load by asset type and location? |

## The General Assets Report — Opening, Movements, Closing

`SYSR-AST003` — **تقرير الأصول العام / FixedassetsGeneral** — is the one an accountant reconciles against, and it is the only one of the five built in the classic shape a fixed-asset note takes: **what you started with, what happened in between, what you ended with**, for cost and for accumulated depreciation side by side.

You give it a **From Date** and a **To Date** and it splits every asset's history at those two points. Everything dated before the From Date is compressed into the opening columns; everything dated between the two is spread across the movement columns; the closing columns are the arithmetic of the two. Rows are grouped by the asset's **main account** — its cost account — with a total per account and a grand total at the end, which is exactly the shape you need when you are proving a ledger account balance against the assets sitting behind it.

Its criteria are From/To **date**, and from/to **legal entity**, **branch**, **asset**, **asset location** and **group**, plus a **status** filter covering the initial, running-depreciation, depreciated and disposed states, and the **Hide Details** tick box.

### Reading the Columns

Left to right, the report tells one story per asset:

| Column | What it holds |
|---|---|
| م / No, كود / Code, اسم الاصل / AssetName | the row number, the asset code and its name |
| تاريخ الشراء / purchaseDate | the acquisition date on the asset record |
| الحساب الرئيسى / Main Account | the asset's cost account — also the grouping level |
| عمر افتراضى / UsefulLife, اقساط متبقية / Remain, قسط الاهلاك / CurrentInstallMent | useful life, instalments still to come, and the current instalment — the current state of the asset, not a period figure. The instalment is left blank for a disposed asset |
| قيمة الاقتناء الافتتاحية / Opening acquisition value | **opening cost**: the value the asset was brought in with on an opening document, adjusted by any additions and deductions dated before the From Date |
| مشتريات خلال الفترة / Purchases | the acquisition cost of assets that entered through a purchase rather than an opening balance |
| الإضافات / Addition | capitalised additions dated inside the range |
| الاستبعادات / Deduction | value written off by deductions dated inside the range |
| تخلص / Disposal | disposal values recorded inside the range |
| اجمالي الاصل الثابت / Total Fixed Asset | **closing cost**: opening + purchases + additions − deductions − disposals |
| مجمع الاهلاك اول الفترة / FADepOpen | **opening accumulated depreciation**: the accumulated depreciation the asset was brought in with, plus every depreciation entry dated before the From Date |
| اهلاك العام / GeneralDep | depreciation charged inside the range |
| مجمع إهلاك اخر الفترة / FADepLast | **closing accumulated depreciation**: the two above added together |
| صافى قيمة الأصل / NetValue | closing cost minus closing accumulated depreciation — the book value at the To Date |

Two things follow from that layout, and both save time later. First, the split between the two cost columns is a split by **how the asset arrived**: an asset entered through an [opening document](/modules/fixedassets/acquisition/fixedassets-opening-balances.md) reports its value under *opening acquisition value*, while an asset [bought on a purchase document](/modules/fixedassets/acquisition/fixedassets-purchase-document.md) reports it under *purchases*. Add the two columns together to get the cost the register carried at the From Date. Second, the depreciation columns are genuinely date-cut: move the From Date back a year and figures migrate from the *period* column into the *opening* column without the closing total changing at all. That is the property you exploit when a total will not tie — narrow the range until you find the period that moved.

### MCH-0007 Through 2026

Run the report with **From Date 1 January 2026**, **To Date 31 December 2026** and no other criteria, and the machine's row reads:

| Column | Value |
|---|---|
| Code / Name | `MCH-0007` — CNC Cutting Machine |
| Purchase date | 1 January 2026 |
| Main account | the machinery cost account |
| Useful life / Remaining / Instalment | 60 / 48 / 3,600 |
| Opening acquisition value | 0 |
| Purchases during the period | 240,000 |
| Additions | 0 |
| Deductions | 0 |
| Disposal | 0 |
| **Total fixed asset (closing cost)** | **240,000** |
| Opening accumulated depreciation | 0 |
| Depreciation for the period | 43,200 |
| **Closing accumulated depreciation** | **43,200** |
| **Net asset value** | **196,800** |

The machine's whole first year in one line: nothing brought forward, 240,000 capitalised, twelve instalments of 3,600 charged, and 196,800 of book value carried into 2027. Every one of those figures is one the register itself will show you on the asset's own screen — which is the point of the report. When the closing net value on this report and the book value on the [asset record](/modules/fixedassets/master-files/fixedassets-asset-master.md) agree, the two are telling the same story; when they do not, the range you asked for is not the range you meant.

Run the same report for **1 January 2027 to 31 December 2027** and the shape works the other way round: the 43,200 that was this year's charge is now sitting in the *opening accumulated depreciation* column, the control-unit upgrade of 30,000 appears under *additions*, and the year's charge reflects the re-levelled instalment of 4,225. See [Additions and Deductions](/modules/fixedassets/depreciation/fixedassets-additions-and-deductions.md) for where that number comes from.

> **Reach for this when** you are preparing the fixed-asset note for a set of accounts, or when a cost or accumulated-depreciation account will not tie and you need to see which movement caused it.

## The Consolidated Trial Balance

`SYSR-AST001` — **ميزان مراجعة الأصول الثابتة المجمع / FixedAssetsConsolidatedTrialBalance** — is the only report of the five that reads the **ledger** rather than the register, and that is precisely what makes it valuable. Every ledger entry Fixed Assets produces carries the asset itself as the subsidiary, so the ledger can be sliced asset by asset. This report does exactly that.

For each asset it prints three blocks of four columns side by side — one block per account:

- **حساب الأصول / Assets Account** — the asset's cost account
- **حساب مجمع الاهلاك / accumulated depreciation account**
- **حساب الإهلاك / depreciation account** — the expense account

and inside each block: **رصيد إفتتاحى / Begining Balance**, **مدين / Debit**, **دائن / Credit**, **رصيد أخر الفترة / Ending Balance**. The opening balance is the year's opening fiscal period; the debit and credit columns are the movement over the fiscal periods you selected; the ending balance is the opening plus debit minus credit. Because that arithmetic is debit-minus-credit throughout, a credit-balance account such as accumulated depreciation shows its balance as a negative figure — read the sign as the side, not as an error.

Rows are gathered by asset type or by master group according to **Group By**, with a total per group and a grand total. Its criteria are from/to **fiscal period**, **legal entity**, **branch**, **asset**, **asset location**, **group** and **asset type**, plus **Hide Details** and **Group By**.

For `MCH-0007` over the twelve fiscal periods of 2026 the three blocks read: cost account opening 0, debit 240,000, closing 240,000; accumulated depreciation opening 0, credit 43,200, closing −43,200; depreciation expense debit 43,200. Those are the same three numbers the general report showed — arrived at from the other side of the wall. When they disagree, either something reached those accounts from outside Fixed Assets, or a business request has not finished processing.

> **Reach for this when** you are closing a period and need to prove that the asset register and the general ledger say the same thing, asset by asset rather than in total.

## Depreciation Details as a Matrix

`SYSR-AST002` — **تفاصيل إهلاك الأصول الثابتة / FixedassetsDepreciationDetails** — is the odd one out in shape: it is not a list at all but a **matrix**. Fiscal periods run down the side, assets run across the top, and each cell holds the depreciation instalment that asset took in that period, with a total row and a total column on both edges.

That layout makes one particular question trivial that is painful everywhere else: *is this asset's charge steady, and if not, when did it change?* Read across a row and you see one period across the whole register; read down a column and you see one asset's whole depreciation history, with every change of instalment showing up as a step in the numbers. `MCH-0007` reads 3,600 twelve times, then 4,225 from the period after the upgrade — the re-levelling described in [How Depreciation Works](/modules/fixedassets/depreciation/fixedassets-depreciation-concepts.md), visible as a column of figures.

Its criteria are from/to **legal entity**, **branch**, **group**, **asset** and **asset location**. Note that there is deliberately **no date or period range** — the matrix covers everything the assets have ever taken. On a mature register that is a very wide report, so narrow it by asset or by group before you run it.

> **Reach for this when** you are checking a single asset's depreciation history month by month, or explaining to somebody why this period's charge is not the same as last period's.

## The Detailed Depreciation Listing

`SYSR-AST004` — **اهلاك الاصول تفصيلي / FixedAssetsDepreciation** — is a **snapshot of the register as it stands now**, not a movement report. Each row is one asset with its current numbers:

**كود الأصل / Asset Code**, **اسم الأصل / Asset Name**, **تاريخ الشراء / PurchaceDate**, **قيمة الاقتناء / OpenCost**, **قيمة قسط الاهلاك / CurrentInstallMent**, **العمر الانتاجى / UsefulLife**, **الاقساط المتبقية / RemainingLifeValue**, **مجمع الاهلاك / TotalDep**, **القيمة الدفترية الحالية / CurrentSystemValue**, and then the paperwork behind it — **فاتوره مشتريات / purchaseDocument**, **مورد / Supplier** and **موقع الاصل / Location**.

Rows are grouped by the asset's account first and then by asset type or master group, so the report doubles as a listing of what each cost account contains. Its criteria are from/to **date**, **legal entity**, **branch**, **asset**, **asset location** and — uniquely among the five — from/to **account**, plus **Hide Details** and **Group By**.

Two points of care. The **date range filters the acquisition date**, not the movements, so "1 January 2026 to 31 December 2026" here means *assets acquired during 2026*, not *what happened during 2026*. And the values are current values: the accumulated depreciation column shows the total to date, whatever range you asked for. `MCH-0007` run at the end of 2026 shows acquisition value 240,000, instalment 3,600, life 60, remaining 48, accumulated depreciation 43,200, book value 196,800, its purchase document, Gulf Machinery Trading and Riyadh Plant, Hall 2.

> **Reach for this when** somebody asks for "the fixed asset register" as a document — a listing of everything owned, with what it cost, what has been written off and what is left, per account.

## Depreciation by Type and Location

`SYSR-AST005` — **اهلاكات الاصول بالفترة / FADepreciationPeriod** — is the summary of the family. It prints **no asset lines at all**: only a total row per **asset location** within each **asset type**, showing **قسط الاهلاك / Depreciation Installment**, **مجمع الاهلاك / Accumulated Depreciation** and **قيمة الاقتناء / purchase Value**, with a total for each asset type at the end of its block.

That makes it the report to hand somebody who wants the shape of the depreciation charge rather than its detail — how much of the monthly charge comes from machinery versus vehicles, or from the Riyadh plant versus the Jeddah warehouse. Its criteria are from/to **fiscal period**, from/to **date** (again on the acquisition date), from/to **legal entity**, **branch**, **asset type**, **asset code** and **asset location**, plus a **status** filter.

> **Reach for this when** you want the depreciation charge broken down by category or by site — for a budget conversation or a cost-allocation review — and you do not want a hundred pages of asset lines with it.

## When None of the Five Fits

The module ships these five reports and no dashboards, so anything beyond them you build yourself — and most sites do, because the questions that matter locally tend to be local. Two routes are open.

For most questions the quickest answer is not a report at all but a **list view**. The asset list, the depreciation document list and the transactions grid on the asset record can all be filtered, sorted, grouped and exported, and they are live rather than a printed moment. The stocktaking document covers its own ground too: see [Stocktaking](/modules/fixedassets/movement/fixedassets-stocktaking.md) for the shortage and surplus lists, which are a reconciliation tool in document form.

When you do need a printed report, the [Report Wizard](/platform/reports/report-wizard-guide.md) builds one from the asset table without writing anything by hand — pick the fields, add the criteria, save. The five system reports themselves are locked: the system refuses any change to a system report, so if one is *almost* right, take a copy and edit the copy.
