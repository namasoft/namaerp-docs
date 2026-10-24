---
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# التقارير والطباعة

كل ما يخص إنتاج المخرجات: الصيغة التي يُفتح بها التقرير، وما يظهر على الصفحة المطبوعة، وكيف تُملأ مدخلات المحددات، وما الذي يُسجَّل، وكيف تُنسَّق القيم، وكيف يُبنى التصدير إلى إكسل.

ولكتابة التقارير وتشغيلها انظر [دليل التقارير](../reports/reports-guide.md).

![صفحة التقارير والطباعة](./images/gc-reports-ar.png)

## العرض والطباعة

**نسق المطالعة** `value.info.viewingFormat` *(الافتراضي HTML)* — هل يُفتح التقرير بصيغة **HTML** أم **PDF** أم **XLSX**. فـHTML أسرع في العرض ويتكيّف مع الشاشة، وPDF هو المطلوب حين يُطبع التقرير أو يُرسل بالبريد كما هو، وXLSX يسلّم القارئ جدولاً يعمل عليه. ويستطيع تعريف التقرير وإعدادات المستخدم نفسه تجاوز هذا الإعداد.

**Use Ledger Calendar For Year Start And End In Reports** `value.info.useLedgerCalendarForYearStartAndEndInReports` — يشير إلى دفتر يحدد تقويمه المالي معنى «بداية السنة» و«نهايتها» في مدخلات التقارير. ولا غنى عنه حيث لا تمتد السنة المالية من يناير إلى ديسمبر.

**السماح بطباعة المسودات** `value.info.allowPrintingDrafts` *(موقف افتراضياً)* — هل تُطبع المسودة. وهو موقف افتراضياً لأن المسودة المطبوعة تبدو تماماً كمستند مطبوع في عين من يستلمها.

**السماح بطباعة المستندات التي تنتظر الموافقة** `value.info.allowPrintingAwaitingApprovalRecords` *(موقف افتراضياً)* — السؤال نفسه للسجلات التي ما زالت تنتظر موافقة.

**فتح الطباعة في نافذة جديدة** `value.info.openPrintInBrowserWindow` — تُفتح المخرجات في نافذة متصفح بدل العارض المدمج، فيستعمل المستخدمون نافذة طباعة المتصفح نفسها.

**الطباعة باستخدام تطبيق الطباعة المباشرة** `value.info.printUsingNamaServer` — يوجّه الطباعة عبر تطبيق الطباعة المباشرة، الذي يرسل المخرجات إلى طابعة مسمّاة مباشرةً بدل المرور بالمتصفح. وبهذا تطبع إيصالاً على طابعة المنفذ دون ظهور أي نافذة.

**إخفاء كود المستندات في سجل تطبيق الطباعة المباشرة** `value.info.doNotShowDocumentCodeInNamaServerPrintingLog` — يبقي أكواد المستندات خارج سجل ذلك التطبيق.

**استعمال الكود كإسم لملف الطباعه** `value.info.useEntityCodeForFileName` — يسمّي الملف المصدَّر أو المطبوع بكود السجل، فيصير ملف الفاتورة معروفاً في مجلد التنزيلات.

**Use Adobe Syntax For PDF Printing** `value.info.useAdobeSyntaxForPDFPrinting` — ينتج PDF بصيغة متوافقة مع Adobe. جرّبه إذا أساء عارض أو طابعة بعينها التعامل مع مخرجاتك.

**Use Legacy Printing Code In PDF** `value.info.useLegacyPrintingCodeInPDF` — يرتد إلى مسار إنتاج PDF القديم، للتصميمات التي اعتمدت على سلوكه.

## محتوى التقارير

**Reports Footer Note 1** / **Reports Footer Note 2** `value.info.reportsFooterNote1`, `value.info.reportsFooterNote2` *(الافتراضي "Powered by Nama ERP" و"www.namasoft.com")* — سطرا التذييل في كل تقرير. ومعظم التركيبات تستبدل بهما اسم الشركة وبيانات التواصل.

**استعمال لوجو هذه الشركة عند الدخول بالعام** `value.info.useLogoForPublic` — شعار أي شركة يُستعمل حين يكون السجل المطبوع عاماً فلا شركة له.

**استعمال لوجو شركة السند عند طباعة نموذج الشاشة** `value.info.useEntityLegalEntityLogoWhenPrintForm` *(مفعل افتراضياً)* — يحمل النموذج المطبوع شعار شركة السجل نفسه. وفي مجموعة شركات هذا ما يجعل فاتورة كل تابعة تبدو فاتورتها هي.

**البحث عن لوجو الشركة في مدخلات التقرير عند الدخول بالشركة عام** `value.info.whenPublicLegalEntitySearchLegalEntityLogoInReportParameters` *(مفعل افتراضياً)* — مع الشركة العامة، يُبحث عن الشعار في مدخلات التقرير بدلاً من ذلك.

## تعريفات التقارير

ما التقرير النظامي، وما الذي يفعله به التحديث، ومن يحق له تشغيل التقرير — كل ذلك مشروح في قسمي «التقارير النظامية» و«من يحق له تشغيل التقرير» في [دليل Jasper Reports الشامل](/ar/platform/reports/reports-guide).

**عرض التقرير اذا كان المستخدم/المجموعة/ملف الصلاحية مسموح له من خلال جدول الصلاحيات بغض النظر عن الصلاحيات** `value.info.allowReportIfUserAllowedThroughSecurityTableRegardlessOfSecurity` — يكفي منح في جدول الصلاحيات لتشغيل تقرير حتى حيث ترفض الصلاحيات المعتادة.

**السماح بتغيير التقرير النظامي الي غير نظامي** `value.info.allowChangeSystemReportToNonSystem` — يسمح بتحويل تقرير نظامي إلى تقرير عادي، فيمكن تعديله محلياً.

**عدم تحديث تقرير غير نظامي ولكن له كود تقرير نظامي** `value.info.dontUpdateReportNotASystemReportButHaveSameCodeOfSystemReport` — يترك أثناء تحديث التقارير النظامية أي تقرير مستخدم يصادف أن يحمل كود تقرير نظامي.

::: warning الخياران أعلاه مترابطان
يرفض النظام حفظ **السماح بتغيير التقرير النظامي الي غير نظامي** ما لم يكن الخيار الثاني مفعّلاً أيضاً، ويخبرك بذلك. والسبب مباشر: فتحويل تقرير نظامي يترك تقرير مستخدم يحمل كوداً نظامياً، وبدون الخيار الثاني سيطمس تحديثُ التقارير النظامية التالي تعديلاتك.
:::

**جلب التقارير المعتمدة فقط عند تحديث تقارير النظام** `value.info.fetchReviewedAndApprovedReportsOnlyWhenUpdateSystemReports` — يقصر تحديث التقارير النظامية على التعريفات التي روجعت واعتُمدت.

## أنواع الذمم في مدخلات التقارير

التقرير الذي يأخذ ذمة كمدخل يسأل أولاً عن *نوع* الذمة، والقائمة المعروضة طويلة: ففي النظام نحو ثمانين نوع ذمة تغطي كل موديولات النظام. ولا تستعمل أكثر المنشآت منها إلا خمسة أو ستة.

**اظهار الذمم التالية فقط في مدخل نوع الذمة بالتقارير** `value.info.showOnlyTheseSubsidiaryTypesInReports` *(جدول)* — كل سطر يذكر نوعاً واحداً في عمود **نوع الذمة** `value.info.showOnlyTheseSubsidiaryTypesInReports.subsidiaryType`. واترك الجدول فارغاً فيعرض المدخل كل نوع تتيحه رخصتك، وهو الوضع الافتراضي؛ وأضف سطوراً فلا يعرض إلا ما ذكرته. فشركة تجارية لا ترفع تقاريرها إلا عن العملاء والموردين والموظفين تستطيع أن تختصر القائمة من ثمانين بنداً إلى ثلاثة، فيزول بذلك مصدرٌ حقيقي لإعادة تشغيل التقارير بمدخل خاطئ. أما الأنواع التابعة لموديول لا تملكه فتبقى مخفية في الحالتين.

ويمسّ هذا مدخل التقرير وحده. فهو لا يغيّر ما يُرجعه أي تقرير، ولا يقيّد حقول الذمة على المستندات.

## مدخلات المحددات في التقارير

**تعديل الشركة المختارة** / **تعديل القطاع المختار** / **تعديل الفرع المختار** / **تعديل الادارة المختارة** / **تعديل المجموعة التحليلية المختارة** `value.info.overrideSelectedLegalEntity`, `...overrideSelectedSector`, `...overrideSelectedBranch`, `...overrideSelectedDepartment`, `...overrideSelectedAnalysisSet` — يأخذ كل منها **أبداً** أو **دائماً** أو **حين لا يكون عاماً**، ويقرر هل يُفرض المحدد الذي اختاره المستخدم حالياً في مدخل التقرير المقابل.

فـ**دائماً** يضمن ألا يرفع المستخدم تقريراً إلا عن فرعه، مقابل تعذّر تشغيل تقرير عابر للفروع. و**حين لا يكون عاماً** هو الوسط المعتاد: يُفرض المحدد حين يعمل المستخدم داخل واحد، ويُترك المدخل حراً حين لا يفعل. و**أبداً** يترك الاختيار كله لمن يشغّل التقرير.

## تسجيل تشغيل التقارير

**تسجيل أداء التقارير في قاعدة البيانات** `value.info.logReportPerformanceToDB` — يسجّل كم استغرق كل تقرير. وهو المفتاح الرئيسي للخيارات الثلاثة التالية.

**تخزين مدخلات التقارير في قاعدة البيانات عند التشغيل** `value.info.logParametersToDB` — يحفظ كذلك قيم المدخلات في كل تشغيلة، وهو ما يتيح لك التمييز بين تقرير بطيء و*مجموعة مدخلات* بطيئة.

**Log Report Exports To DB** `value.info.logExportsToDB` — يسجّل عمليات التصدير كما يسجّل تشغيل التقارير.

**Log Forms To Report Log** `value.info.logFormsToReportLog` — يُدخل النماذج المطبوعة في السجل نفسه.

::: info الثلاثة تعتمد على الأول
تفعيل أي من الثلاثة أعلاه بينما تسجيل أداء التقارير موقف مرفوضٌ عند الحفظ برسالة صريحة تذكر الخيار. فهي تسجّل تفاصيل *عن* تشغيلة مسجَّلة، فلا بد من تشغيلة مسجَّلة تُلحق بها.
:::

**إضافة تشغيل التقارير إلى سجل التعديل** / **إضافة التصدير إلى سجل التعديل** `value.info.addReportRunsToActionHistory`, `value.info.addExportToActionHistory` — يكتبان تشغيل التقارير وعمليات التصدير في سجل إجراءات السجل نفسه. وهذا هو جواب الأثر الرقابي عن سؤال «من صدّر قائمة العملاء هذه؟».

## صيغ عرض القيم في التقارير

تتحكم هذه الإعدادات في تنسيق الأرقام والتواريخ في مخرجات التقارير.

**Currency Pattern In Reports** `value.info.currencyPatternInReports` *(الافتراضي `#,##0.00;(#,##0.00)`)* — لاحظ الشطرين المفصولين بفاصلة منقوطة: الثاني يُستعمل للقيم السالبة، فيُطبع المبلغ السالب بين قوسين على الطريقة المحاسبية لا بإشارة ناقص.

**Quantity Pattern In Reports** `value.info.quantityPatternInReports` *(الافتراضي `#,##0.##`)* — تُحذف الأصفار الزائدة، فتُطبع الكمية 5 هكذا `5` لا `5.00`.

**Rate Pattern In Reports** / **Percent Pattern In Reports** `value.info.ratePatternInReports`, `value.info.percentPatternInReports` — لأسعار الصرف والنسب المئوية.

**Date Pattern In Reports** `value.info.datePatternInReports` *(الافتراضي `yyyy-MM-dd`)*، **Date Time Pattern In Reports** `value.info.dateTimePatternInReports` *(الافتراضي `yyyy-MM-dd HH:mm:ss`)*، **Time Pattern In Reports** `value.info.timePatternInReports` *(الافتراضي `hh:mm a`)* — اضبطها على ما يتوقعه قراؤك؛ و`dd/MM/yyyy` هو البديل الشائع.

## التصدير إلى إكسل

حين يُصدَّر التقرير إلى إكسل، يبدو التصميم الذي كان صحيحاً على الصفحة المطبوعة خاطئاً في جدول البيانات عادةً: فترويسات الصفحات تتكرر، والخلايا المدمجة تعطّل الفرز، والرسوم الخلفية تعترض الطريق. وهذه الخيارات تنظّف ذلك.

**تخمين نوع الخلية** `value.info.excelExportConfig.detectCellType` *(مفعل افتراضياً)* — يكتب الأرقام أرقاماً والتواريخ تواريخ لا نصوصاً. وهذا هو الخيار الذي يقرر هل يمكن جمع الورقة المصدَّرة وفرزها، فاتركه مفعّلاً.

**خلفية بيضاء** `value.info.excelExportConfig.whiteBackground` *(مفعل)*، **منع دمج السطور** `value.info.excelExportConfig.preventRowSpan` *(مفعل)*، **تجاهل إطار الخلايا** `value.info.excelExportConfig.ignoreCellBorder` *(مفعل)*، **تجاهل خلفية الخلايا** `value.info.excelExportConfig.igonreCellBackground`، **تجاهل الرسومات** `value.info.excelExportConfig.ignoreGraphics` — تجرّد التنسيق البصري الذي لا يحتاجه جدول البيانات. ومنع دمج الأسطر تحديداً هو ما يمنع الخلايا المدمجة من تعطيل الفلاتر والفرز.

**بدون مسافات بين السطور** / **بدون مسافات بين الأعمدة** `value.info.excelExportConfig.removeEmptySpaceBetweenRows`, `...removeEmptySpaceBetweenColumns` — تزيل الأسطر والأعمدة الفاصلة التي يستعملها تصميم الطباعة للهوامش.

**حذف رأس الصفحة** `value.info.excelExportConfig.removePageHeader` *(مفعل)* و**عدم حذف رأس أول صفحة** `value.info.excelExportConfig.dontRemoveFirstPageHeader` *(مفعل)* — يبقيان الترويسة مرة واحدة في الأعلى ويحذفان تكرارها في كل صفحة تالية، وهو تماماً ما يريده جدول البيانات.

**حذف ذيل الصفحة** `value.info.excelExportConfig.removePageFooter` *(مفعل)*، **حذف رأس الأعمدة** `value.info.excelExportConfig.removeColumnHeader` *(مفعل)*، **إزالة تذييل العمود** `value.info.excelExportConfig.removeColumnFooter` *(مفعل)*، **حذف عنوان التقرير** `value.info.excelExportConfig.removeReportTitle` *(مفعل)* — تحذف بقية زخارف الطباعة.

**استعمال نسخة المسودة عند التصدير** `value.info.exportDraftVersion` *(مفعل افتراضياً)* — يصدّر تصديرُ السجل نسختَه المسودة حين توجد.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| نسق المطالعة | Viewing Format | `value.info.viewingFormat` | [العرض والطباعة](#laarD-wlTbaa) |
| Use Ledger Calendar For Year Start And End In Reports | Use Ledger Calendar For Year Start And End In Reports | `value.info.useLedgerCalendarForYearStartAndEndInReports` | [العرض والطباعة](#laarD-wlTbaa) |
| السماح بطباعة المسودات | Allow Printing Drafts | `value.info.allowPrintingDrafts` | [العرض والطباعة](#laarD-wlTbaa) |
| السماح بطباعة المستندات التي تنتظر الموافقة | Allow Printing Awaiting Approval Records | `value.info.allowPrintingAwaitingApprovalRecords` | [العرض والطباعة](#laarD-wlTbaa) |
| فتح الطباعة في نافذة جديدة | Open Print In Browser Window | `value.info.openPrintInBrowserWindow` | [العرض والطباعة](#laarD-wlTbaa) |
| الطباعة باستخدام تطبيق الطباعة المباشرة | Print Using Nama Server | `value.info.printUsingNamaServer` | [العرض والطباعة](#laarD-wlTbaa) |
| إخفاء كود المستندات في سجل تطبيق الطباعة المباشرة | Do Not Show Document Code In Nama Server Printing Log | `value.info.doNotShowDocumentCodeInNamaServerPrintingLog` | [العرض والطباعة](#laarD-wlTbaa) |
| استعمال الكود كإسم لملف الطباعه | use Entity Code As File Name | `value.info.useEntityCodeForFileName` | [العرض والطباعة](#laarD-wlTbaa) |
| Use Adobe Syntax For PDF Printing | Use Adobe Syntax For PDF Printing | `value.info.useAdobeSyntaxForPDFPrinting` | [العرض والطباعة](#laarD-wlTbaa) |
| Use Legacy Printing Code In PDF | Use Legacy Printing Code In PDF | `value.info.useLegacyPrintingCodeInPDF` | [العرض والطباعة](#laarD-wlTbaa) |
| Reports Footer Note 1 | Reports Footer Note 1 | `value.info.reportsFooterNote1` | [محتوى التقارير](#mHtw-ltqryr) |
| Reports Footer Note 2 | Reports Footer Note 2 | `value.info.reportsFooterNote2` | [محتوى التقارير](#mHtw-ltqryr) |
| عرض اسم الشركه بديل عن اللوجو في ال GUI الجديد | Show Company Name Next To Logo In New GUI | `value.info.showCompanyNameNextToLogo` | يعرض اسم الشركة بدلاً من الشعار في الشريط العلوي لواجهة الويب القديمة. |
| استعمال لوجو هذه الشركة عند الدخول بالعام | Use This Legal Entity Logo For Public | `value.info.useLogoForPublic` | [محتوى التقارير](#mHtw-ltqryr) |
| استعمال لوجو شركة السند عند طباعة نموذج الشاشة | Use Document LegalEntity Logo When Print Form | `value.info.useEntityLegalEntityLogoWhenPrintForm` | [محتوى التقارير](#mHtw-ltqryr) |
| البحث عن لوجو الشركة في مدخلات التقرير عند الدخول بالشركة عام | Search LegalEntity Logo In Report Parameters When Public LegalEntity | `value.info.whenPublicLegalEntitySearchLegalEntityLogoInReportParameters` | [محتوى التقارير](#mHtw-ltqryr) |
| عرض التقرير اذا كان المستخدم/المجموعة/ملف الصلاحية مسموح له من خلال جدول الصلاحيات بغض النظر عن الصلاحيات | Allow Report If User/Group/Security Profile Allowed Through Security Table Regardless Of Security | `value.info.allowReportIfUserAllowedThroughSecurityTableRegardlessOfSecurity` | [تعريفات التقارير](#taaryft-ltqryr) |
| السماح بتغيير التقرير النظامي الي غير نظامي | Allow Change System Report To Non System | `value.info.allowChangeSystemReportToNonSystem` | [تعريفات التقارير](#taaryft-ltqryr) |
| عدم تحديث تقرير غير نظامي ولكن له كود تقرير نظامي | Do Not Update Report Not A System Report But Have Same Code Of System Report | `value.info.dontUpdateReportNotASystemReportButHaveSameCodeOfSystemReport` | [تعريفات التقارير](#taaryft-ltqryr) |
| جلب التقارير المعتمدة فقط عند تحديث تقارير النظام | Get Reviewed And Approved Reports Only When Update System Reports | `value.info.fetchReviewedAndApprovedReportsOnlyWhenUpdateSystemReports` | [تعريفات التقارير](#taaryft-ltqryr) |
| اظهار الذمم التالية فقط في مدخل نوع الذمة بالتقارير | Show Only These Subsidiary Types In Reports Subsidiary Type Parameter | `value.info.showOnlyTheseSubsidiaryTypesInReports` | [أنواع الذمم في مدخلات التقارير](#nwaa-ldhmm-fy-mdkhlt-ltqryr) |
| نوع الذمة | Subsidiary Type | `value.info.showOnlyTheseSubsidiaryTypesInReports.subsidiaryType` | [أنواع الذمم في مدخلات التقارير](#nwaa-ldhmm-fy-mdkhlt-ltqryr) |
| تعديل الشركة المختارة | Override Selected LegalEntity | `value.info.overrideSelectedLegalEntity` | [مدخلات المحددات في التقارير](#mdkhlt-lmHddt-fy-ltqryr) |
| تعديل القطاع المختار | Override Selected Sector | `value.info.overrideSelectedSector` | [مدخلات المحددات في التقارير](#mdkhlt-lmHddt-fy-ltqryr) |
| تعديل الفرع المختار | Override Selected Branch | `value.info.overrideSelectedBranch` | [مدخلات المحددات في التقارير](#mdkhlt-lmHddt-fy-ltqryr) |
| تعديل الادارة المختارة | Override Selected Department | `value.info.overrideSelectedDepartment` | [مدخلات المحددات في التقارير](#mdkhlt-lmHddt-fy-ltqryr) |
| تعديل المجموعة التحليلية المختارة | Override Selected AnalysisSet | `value.info.overrideSelectedAnalysisSet` | [مدخلات المحددات في التقارير](#mdkhlt-lmHddt-fy-ltqryr) |
| تسجيل أداء التقارير في قاعدة البيانات | Log Report Performance To DB | `value.info.logReportPerformanceToDB` | [تسجيل تشغيل التقارير](#tsjyl-tshGyl-ltqryr) |
| تخزين مدخلات التقارير في قاعدة البيانات عند التشغيل | Log Report Parameters To DB When Running | `value.info.logParametersToDB` | [تسجيل تشغيل التقارير](#tsjyl-tshGyl-ltqryr) |
| Log Report Exports To DB | Log Report Exports To DB | `value.info.logExportsToDB` | [تسجيل تشغيل التقارير](#tsjyl-tshGyl-ltqryr) |
| Log Forms To Report Log | Log Forms To Report Log | `value.info.logFormsToReportLog` | [تسجيل تشغيل التقارير](#tsjyl-tshGyl-ltqryr) |
| إضافة تشغيل التقارير إلى سجل التعديل | Add Report Runs To Action History | `value.info.addReportRunsToActionHistory` | [تسجيل تشغيل التقارير](#tsjyl-tshGyl-ltqryr) |
| إضافة التصدير إلى سجل التعديل | Add Export Action To Action History | `value.info.addExportToActionHistory` | [تسجيل تشغيل التقارير](#tsjyl-tshGyl-ltqryr) |
| Currency Pattern In Reports | Currency Pattern In Reports | `value.info.currencyPatternInReports` | [صيغ عرض القيم في التقارير](#SyG-aarD-lqym-fy-ltqryr) |
| Quantity Pattern In Reports | Quantity Pattern In Reports | `value.info.quantityPatternInReports` | [صيغ عرض القيم في التقارير](#SyG-aarD-lqym-fy-ltqryr) |
| Rate Pattern In Reports | Rate Pattern In Reports | `value.info.ratePatternInReports` | [صيغ عرض القيم في التقارير](#SyG-aarD-lqym-fy-ltqryr) |
| Percent Pattern In Reports | Percent Pattern In Reports | `value.info.percentPatternInReports` | [صيغ عرض القيم في التقارير](#SyG-aarD-lqym-fy-ltqryr) |
| Date Pattern In Reports | Date Pattern In Reports | `value.info.datePatternInReports` | [صيغ عرض القيم في التقارير](#SyG-aarD-lqym-fy-ltqryr) |
| Date Time Pattern In Reports | Date Time Pattern In Reports | `value.info.dateTimePatternInReports` | [صيغ عرض القيم في التقارير](#SyG-aarD-lqym-fy-ltqryr) |
| Time Pattern In Reports | Time Pattern In Reports | `value.info.timePatternInReports` | [صيغ عرض القيم في التقارير](#SyG-aarD-lqym-fy-ltqryr) |
| تخمين نوع الخلية | Detect Cell Type | `value.info.excelExportConfig.detectCellType` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| خلفية بيضاء | White Background | `value.info.excelExportConfig.whiteBackground` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| منع دمج السطور | Prevent Row Span | `value.info.excelExportConfig.preventRowSpan` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| تجاهل إطار الخلايا | Ignore Cell Border | `value.info.excelExportConfig.ignoreCellBorder` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| تجاهل خلفية الخلايا | Ignore Cell Background | `value.info.excelExportConfig.igonreCellBackground` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| تجاهل الرسومات | Ignore Graphics | `value.info.excelExportConfig.ignoreGraphics` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| بدون مسافات بين السطور | Remove Empty Space Between Rows | `value.info.excelExportConfig.removeEmptySpaceBetweenRows` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| بدون مسافات بين الأعمدة | Remove Empty Space Between Columns | `value.info.excelExportConfig.removeEmptySpaceBetweenColumns` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| حذف رأس الصفحة | Remove Page Header | `value.info.excelExportConfig.removePageHeader` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| عدم حذف رأس أول صفحة | Do Not Remove First Page Header | `value.info.excelExportConfig.dontRemoveFirstPageHeader` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| حذف ذيل الصفحة | Remove Page Footer | `value.info.excelExportConfig.removePageFooter` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| حذف رأس الأعمدة | Remove Column Header | `value.info.excelExportConfig.removeColumnHeader` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| حذف رأس الأعمدة | Remove Column Footer | `value.info.excelExportConfig.removeColumnFooter` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| حذف عنوان التقرير | Remove Report Title | `value.info.excelExportConfig.removeReportTitle` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
| استعمال نسخة المسودة عند التصدير | Export Draft Version | `value.info.exportDraftVersion` | [التصدير إلى إكسل](#ltSdyr-l-ksl) |
