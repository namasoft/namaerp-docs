---
entities: [ConfigEntry]
menu: Administration → Settings → System Settings
---

# Reports and Printing

Everything about producing output: the format a report opens in, what appears on the printed page, how dimension parameters are filled, what is logged, how values are formatted, and how Excel exports are built.

For writing and running reports, see the [Reports guide](../reports/reports-guide.md).

![Reports and Printing tab](../../ar/platform/global-config/images/gc-reports-en.png)

## Viewing and printing

**Viewing Format** `value.info.viewingFormat` *(default HTML)* — Whether a report opens as **HTML**, **PDF** or **XLSX**. HTML renders faster and reflows on screen; PDF is what people want when the report is going to be printed or emailed as-is; XLSX hands the reader a spreadsheet to work in. A report definition and a user's own settings can each override this.

**Use Ledger Calendar For Year Start And End In Reports** `value.info.useLedgerCalendarForYearStartAndEndInReports` — Points at a ledger whose fiscal calendar defines what "start of year" and "end of year" mean in report parameters. Essential where the financial year doesn't run January to December.

**Allow Printing Drafts** `value.info.allowPrintingDrafts` *(default off)* — Whether a draft may be printed. Off by default because a printed draft looks exactly like a printed document to whoever receives it.

**Allow Printing Awaiting Approval Records** `value.info.allowPrintingAwaitingApprovalRecords` *(default off)* — The same question for records still waiting on an approval.

**Open Print In Browser Window** `value.info.openPrintInBrowserWindow` — Output opens in a browser window instead of the built-in viewer, letting users use the browser's own print dialog.

**Print Using Nama Server** `value.info.printUsingNamaServer` — Routes printing through the Nama direct-printing agent, which sends output straight to a named printer instead of through the browser. This is how you print a receipt to a counter printer without a dialog appearing.

**Do Not Show Document Code In Nama Server Printing Log** `value.info.doNotShowDocumentCodeInNamaServerPrintingLog` — Keeps document codes out of that agent's log.

**use Entity Code As File Name** `value.info.useEntityCodeForFileName` — Names the exported or printed file after the record's code, so a saved invoice PDF is recognisable in a downloads folder.

**Use Adobe Syntax For PDF Printing** `value.info.useAdobeSyntaxForPDFPrinting` — Produces PDF using Adobe-compatible syntax. Try it if a particular viewer or printer mishandles your output.

**Use Legacy Printing Code In PDF** `value.info.useLegacyPrintingCodeInPDF` — Falls back to the older PDF rendering path, for layouts that depended on its behaviour.

## Report content

**Reports Footer Note 1** / **Reports Footer Note 2** `value.info.reportsFooterNote1`, `value.info.reportsFooterNote2` *(default "Powered by Nama ERP" and "www.namasoft.com")* — The two footer lines on every report. Most installations replace these with the company name and contact details.

**Use This Legal Entity Logo For Public** `value.info.useLogoForPublic` — Which legal entity's logo to use when the record being printed is public and so has no legal entity of its own.

**Use Document LegalEntity Logo When Print Form** `value.info.useEntityLegalEntityLogoWhenPrintForm` *(default on)* — A printed form carries the logo of the record's own legal entity. In a group of companies this is what makes each subsidiary's invoice look like its own.

**Search LegalEntity Logo In Report Parameters When Public LegalEntity** `value.info.whenPublicLegalEntitySearchLegalEntityLogoInReportParameters` *(default on)* — For a public legal entity, look the logo up from the report's parameters instead.

## Report definitions

What a system report is, what an update does to it and who may run a report are explained in the [Jasper Reports guide](/platform/reports/reports-guide#System-reports).

**Allow Report If User/Group/Security Profile Allowed Through Security Table Regardless Of Security** `value.info.allowReportIfUserAllowedThroughSecurityTableRegardlessOfSecurity` — A grant in the security table is enough to run a report even where normal security would refuse.

**Allow Change System Report To Non System** `value.info.allowChangeSystemReportToNonSystem` — Permits converting a system report into an ordinary one, so it can be edited locally.

**Do Not Update Report Not A System Report But Have Same Code Of System Report** `value.info.dontUpdateReportNotASystemReportButHaveSameCodeOfSystemReport` — During a system-report refresh, leaves alone any user report that happens to share a system report's code.

::: warning The two above are linked
The system refuses to save *Allow Change System Report To Non System* unless the second option is also on, and says so. The reason is straightforward: converting a system report leaves a user report carrying a system code, and without the second option the next system-report update would overwrite your edits.
:::

**Get Reviewed And Approved Reports Only When Update System Reports** `value.info.fetchReviewedAndApprovedReportsOnlyWhenUpdateSystemReports` — Restricts a system-report refresh to definitions that have been reviewed and approved.

## Subsidiary types in report parameters

A report that takes a subsidiary as a parameter asks first *what kind* of subsidiary, and the list it offers is long — Nama defines around eighty subsidiary types, covering every module ever built. Most businesses use five or six of them.

**Show Only These Subsidiary Types In Reports Subsidiary Type Parameter** `value.info.showOnlyTheseSubsidiaryTypesInReports` *(table)* — Each row names one type in its **Subsidiary Type** column `value.info.showOnlyTheseSubsidiaryTypesInReports.subsidiaryType`. Leave the table empty and the parameter offers every type your licence enables, which is the default; add rows and it offers only those. A trading company that only ever reports on customers, suppliers and employees can cut that dropdown from eighty entries to three, which removes a real source of wrong-parameter reruns. Types belonging to a module you do not have stay hidden either way.

This affects the report parameter only. It does not change what any report returns, and it does not restrict the subsidiary fields on documents.

## Dimension parameters in reports

**Override Selected LegalEntity** / **Override Selected Sector** / **Override Selected Branch** / **Override Selected Department** / **Override Selected AnalysisSet** `value.info.overrideSelectedLegalEntity`, `...overrideSelectedSector`, `...overrideSelectedBranch`, `...overrideSelectedDepartment`, `...overrideSelectedAnalysisSet` — Each takes **Never**, **Always** or **When Not Public**, and decides whether the dimension the user currently has selected is forced into the report's matching parameter.

**Always** guarantees a user only ever reports on their own branch, at the cost of not being able to run a cross-branch report. **When Not Public** is the usual middle ground: force the dimension when the user is working inside one, leave the parameter free when they aren't. **Never** leaves the choice entirely to whoever runs the report.

## Report logging

**Log Report Performance To DB** `value.info.logReportPerformanceToDB` — Records how long each report took. This is the master switch for the three below.

**Log Report Parameters To DB When Running** `value.info.logParametersToDB` — Also stores the parameter values each run was given, which is what lets you tell a slow report from a slow *set of parameters*.

**Log Report Exports To DB** `value.info.logExportsToDB` — Logs exports as well as report runs.

**Log Forms To Report Log** `value.info.logFormsToReportLog` — Includes printed forms in the same log.

::: info The three depend on the first
Turning on any of the three above while report performance logging is off is refused at save time with an explicit message naming the option. They record detail *about* a logged run, so there has to be a logged run to attach it to.
:::

**Add Report Runs To Action History** / **Add Export Action To Action History** `value.info.addReportRunsToActionHistory`, `value.info.addExportToActionHistory` — Write report runs and exports into the record's own action history. This is the audit-trail answer to "who exported this customer list?".

## Value patterns in reports

These control how numbers and dates are formatted in report output.

**Currency Pattern In Reports** `value.info.currencyPatternInReports` *(default `#,##0.00;(#,##0.00)`)* — Note the two halves separated by a semicolon: the second is used for negative values, so a negative amount prints in parentheses in the accounting style rather than with a minus sign.

**Quantity Pattern In Reports** `value.info.quantityPatternInReports` *(default `#,##0.##`)* — Trailing zeros are dropped, so a quantity of 5 prints as `5` and not `5.00`.

**Rate Pattern In Reports** / **Percent Pattern In Reports** `value.info.ratePatternInReports`, `value.info.percentPatternInReports` — For exchange rates and percentages.

**Date Pattern In Reports** `value.info.datePatternInReports` *(default `yyyy-MM-dd`)*, **Date Time Pattern In Reports** `value.info.dateTimePatternInReports` *(default `yyyy-MM-dd HH:mm:ss`)*, **Time Pattern In Reports** `value.info.timePatternInReports` *(default `hh:mm a`)* — Set these to whatever your readers expect; `dd/MM/yyyy` is the common alternative.

## Excel export

When a report is exported to Excel, the layout that looked right on a printed page usually looks wrong in a spreadsheet — page headers repeat, merged cells block sorting, and background graphics get in the way. These options clean that up.

**Detect Cell Type** `value.info.excelExportConfig.detectCellType` *(default on)* — Writes numbers as numbers and dates as dates rather than as text. This is the one that decides whether the exported sheet can be summed and sorted, so leave it on.

**White Background** `value.info.excelExportConfig.whiteBackground` *(on)*, **Prevent Row Span** `value.info.excelExportConfig.preventRowSpan` *(on)*, **Ignore Cell Border** `value.info.excelExportConfig.ignoreCellBorder` *(on)*, **Igonre Cell Background** `value.info.excelExportConfig.igonreCellBackground`, **Ignore Graphics** `value.info.excelExportConfig.ignoreGraphics` — Strip the visual styling that a spreadsheet doesn't need. Preventing row span in particular is what stops merged cells from breaking filters and sorting.

**Remove Empty Space Between Rows** / **Remove Empty Space Between Columns** `value.info.excelExportConfig.removeEmptySpaceBetweenRows`, `...removeEmptySpaceBetweenColumns` — Remove the spacer rows and columns that a print layout uses for margins.

**Remove Page Header** `value.info.excelExportConfig.removePageHeader` *(on)* and **Do Not Remove First Page Header** `value.info.excelExportConfig.dontRemoveFirstPageHeader` *(on)* — Together these keep the header once at the top and drop its repetition on every subsequent page, which is exactly what a spreadsheet wants.

**Remove Page Footer** `value.info.excelExportConfig.removePageFooter` *(on)*, **Remove Column Header** `value.info.excelExportConfig.removeColumnHeader` *(on)*, **Remove Column Footer** `value.info.excelExportConfig.removeColumnFooter` *(on)*, **Remove Report Title** `value.info.excelExportConfig.removeReportTitle` *(on)* — Drop the remaining print furniture.

**Export Draft Version** `value.info.exportDraftVersion` *(default on)* — Exporting a record exports its draft version where one exists.

## Settings on this tab

Every field on this tab with its exact on-screen label in both languages, so you can find a setting by the name you see. The last column points to the section that explains it.

| Field id | English label | Arabic label | Meaning |
|---|---|---|---|
| `value.info.viewingFormat` | Viewing Format | نسق المطالعة | [Viewing and printing](#Viewing-and-printing) |
| `value.info.useLedgerCalendarForYearStartAndEndInReports` | Use Ledger Calendar For Year Start And End In Reports | Use Ledger Calendar For Year Start And End In Reports | [Viewing and printing](#Viewing-and-printing) |
| `value.info.allowPrintingDrafts` | Allow Printing Drafts | السماح بطباعة المسودات | [Viewing and printing](#Viewing-and-printing) |
| `value.info.allowPrintingAwaitingApprovalRecords` | Allow Printing Awaiting Approval Records | السماح بطباعة المستندات التي تنتظر الموافقة | [Viewing and printing](#Viewing-and-printing) |
| `value.info.openPrintInBrowserWindow` | Open Print In Browser Window | فتح الطباعة في نافذة جديدة | [Viewing and printing](#Viewing-and-printing) |
| `value.info.printUsingNamaServer` | Print Using Nama Server | الطباعة باستخدام تطبيق الطباعة المباشرة | [Viewing and printing](#Viewing-and-printing) |
| `value.info.doNotShowDocumentCodeInNamaServerPrintingLog` | Do Not Show Document Code In Nama Server Printing Log | إخفاء كود المستندات في سجل تطبيق الطباعة المباشرة | [Viewing and printing](#Viewing-and-printing) |
| `value.info.useEntityCodeForFileName` | use Entity Code As File Name | استعمال الكود كإسم لملف الطباعه | [Viewing and printing](#Viewing-and-printing) |
| `value.info.useAdobeSyntaxForPDFPrinting` | Use Adobe Syntax For PDF Printing | Use Adobe Syntax For PDF Printing | [Viewing and printing](#Viewing-and-printing) |
| `value.info.useLegacyPrintingCodeInPDF` | Use Legacy Printing Code In PDF | Use Legacy Printing Code In PDF | [Viewing and printing](#Viewing-and-printing) |
| `value.info.reportsFooterNote1` | Reports Footer Note 1 | Reports Footer Note 1 | [Report content](#Report-content) |
| `value.info.reportsFooterNote2` | Reports Footer Note 2 | Reports Footer Note 2 | [Report content](#Report-content) |
| `value.info.showCompanyNameNextToLogo` | Show Company Name Next To Logo In New GUI | عرض اسم الشركه بديل عن اللوجو في ال GUI الجديد | Shows the company name instead of the logo in the top bar of the older web interface. |
| `value.info.useLogoForPublic` | Use This Legal Entity Logo For Public | استعمال لوجو هذه الشركة عند الدخول بالعام | [Report content](#Report-content) |
| `value.info.useEntityLegalEntityLogoWhenPrintForm` | Use Document LegalEntity Logo When Print Form | استعمال لوجو شركة السند عند طباعة نموذج الشاشة | [Report content](#Report-content) |
| `value.info.whenPublicLegalEntitySearchLegalEntityLogoInReportParameters` | Search LegalEntity Logo In Report Parameters When Public LegalEntity | البحث عن لوجو الشركة في مدخلات التقرير عند الدخول بالشركة عام | [Report content](#Report-content) |
| `value.info.allowReportIfUserAllowedThroughSecurityTableRegardlessOfSecurity` | Allow Report If User/Group/Security Profile Allowed Through Security Table Regardless Of Security | عرض التقرير اذا كان المستخدم/المجموعة/ملف الصلاحية مسموح له من خلال جدول الصلاحيات بغض النظر عن الصلاحيات | [Report definitions](#Report-definitions) |
| `value.info.allowChangeSystemReportToNonSystem` | Allow Change System Report To Non System | السماح بتغيير التقرير النظامي الي غير نظامي | [Report definitions](#Report-definitions) |
| `value.info.dontUpdateReportNotASystemReportButHaveSameCodeOfSystemReport` | Do Not Update Report Not A System Report But Have Same Code Of System Report | عدم تحديث تقرير غير نظامي ولكن له كود تقرير نظامي | [Report definitions](#Report-definitions) |
| `value.info.fetchReviewedAndApprovedReportsOnlyWhenUpdateSystemReports` | Get Reviewed And Approved Reports Only When Update System Reports | جلب التقارير المعتمدة فقط عند تحديث تقارير النظام | [Report definitions](#Report-definitions) |
| `value.info.showOnlyTheseSubsidiaryTypesInReports` | Show Only These Subsidiary Types In Reports Subsidiary Type Parameter | اظهار الذمم التالية فقط في مدخل نوع الذمة بالتقارير | [Subsidiary types in report parameters](#Subsidiary-types-in-report-parameters) |
| `value.info.showOnlyTheseSubsidiaryTypesInReports.subsidiaryType` | Subsidiary Type | نوع الذمة | [Subsidiary types in report parameters](#Subsidiary-types-in-report-parameters) |
| `value.info.overrideSelectedLegalEntity` | Override Selected LegalEntity | تعديل الشركة المختارة | [Dimension parameters in reports](#Dimension-parameters-in-reports) |
| `value.info.overrideSelectedSector` | Override Selected Sector | تعديل القطاع المختار | [Dimension parameters in reports](#Dimension-parameters-in-reports) |
| `value.info.overrideSelectedBranch` | Override Selected Branch | تعديل الفرع المختار | [Dimension parameters in reports](#Dimension-parameters-in-reports) |
| `value.info.overrideSelectedDepartment` | Override Selected Department | تعديل الادارة المختارة | [Dimension parameters in reports](#Dimension-parameters-in-reports) |
| `value.info.overrideSelectedAnalysisSet` | Override Selected AnalysisSet | تعديل المجموعة التحليلية المختارة | [Dimension parameters in reports](#Dimension-parameters-in-reports) |
| `value.info.logReportPerformanceToDB` | Log Report Performance To DB | تسجيل أداء التقارير في قاعدة البيانات | [Report logging](#Report-logging) |
| `value.info.logParametersToDB` | Log Report Parameters To DB When Running | تخزين مدخلات التقارير في قاعدة البيانات عند التشغيل | [Report logging](#Report-logging) |
| `value.info.logExportsToDB` | Log Report Exports To DB | Log Report Exports To DB | [Report logging](#Report-logging) |
| `value.info.logFormsToReportLog` | Log Forms To Report Log | Log Forms To Report Log | [Report logging](#Report-logging) |
| `value.info.addReportRunsToActionHistory` | Add Report Runs To Action History | إضافة تشغيل التقارير إلى سجل التعديل | [Report logging](#Report-logging) |
| `value.info.addExportToActionHistory` | Add Export Action To Action History | إضافة التصدير إلى سجل التعديل | [Report logging](#Report-logging) |
| `value.info.currencyPatternInReports` | Currency Pattern In Reports | Currency Pattern In Reports | [Value patterns in reports](#Value-patterns-in-reports) |
| `value.info.quantityPatternInReports` | Quantity Pattern In Reports | Quantity Pattern In Reports | [Value patterns in reports](#Value-patterns-in-reports) |
| `value.info.ratePatternInReports` | Rate Pattern In Reports | Rate Pattern In Reports | [Value patterns in reports](#Value-patterns-in-reports) |
| `value.info.percentPatternInReports` | Percent Pattern In Reports | Percent Pattern In Reports | [Value patterns in reports](#Value-patterns-in-reports) |
| `value.info.datePatternInReports` | Date Pattern In Reports | Date Pattern In Reports | [Value patterns in reports](#Value-patterns-in-reports) |
| `value.info.dateTimePatternInReports` | Date Time Pattern In Reports | Date Time Pattern In Reports | [Value patterns in reports](#Value-patterns-in-reports) |
| `value.info.timePatternInReports` | Time Pattern In Reports | Time Pattern In Reports | [Value patterns in reports](#Value-patterns-in-reports) |
| `value.info.excelExportConfig.detectCellType` | Detect Cell Type | تخمين نوع الخلية | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.whiteBackground` | White Background | خلفية بيضاء | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.preventRowSpan` | Prevent Row Span | منع دمج السطور | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.ignoreCellBorder` | Ignore Cell Border | تجاهل إطار الخلايا | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.igonreCellBackground` | Igonre Cell Background | تجاهل خلفية الخلايا | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.ignoreGraphics` | Ignore Graphics | تجاهل الرسومات | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.removeEmptySpaceBetweenRows` | Remove Empty Space Between Rows | بدون مسافات بين السطور | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.removeEmptySpaceBetweenColumns` | Remove Empty Space Between Columns | بدون مسافات بين الأعمدة | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.removePageHeader` | Remove Page Header | حذف رأس الصفحة | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.dontRemoveFirstPageHeader` | Do Not Remove First Page Header | عدم حذف رأس أول صفحة | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.removePageFooter` | Remove Page Footer | حذف ذيل الصفحة | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.removeColumnHeader` | Remove Column Header | حذف رأس الأعمدة | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.removeColumnFooter` | Remove Column Footer | حذف رأس الأعمدة | [Excel export](#Excel-export) |
| `value.info.excelExportConfig.removeReportTitle` | Remove Report Title | حذف عنوان التقرير | [Excel export](#Excel-export) |
| `value.info.exportDraftVersion` | Export Draft Version | استعمال نسخة المسودة عند التصدير | [Excel export](#Excel-export) |
