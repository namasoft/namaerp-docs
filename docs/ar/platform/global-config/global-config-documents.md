---
description: "صفحة المستندات والدفاتر في الإعدادات العامة: كيف يُختار الدفتر والتوجيه وما يُسمح للتوجيه بالتحكم فيه، وترقيم المسودات، والتكويد الآلي للملفات، والأقساط، ومن يجوز له الحفظ في فترة مالية مغلقة."
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# المستندات والدفاتر

كل مستند في النظام يأخذ رقمه من **دفتر** وسلوكه من **توجيه**. وتحكم هذه الصفحة هذه الآلية: كيف يُختار الدفتر والتوجيه، وما الذي يُسمح للتوجيه بالتحكم فيه، وكيف تُرقَّم المسودات، وكيف تُكوَّد الملفات الأساسية آلياً، وكيف تُولَّد الأقساط، ومن يُسمح له بحفظ المستندات في فترة مالية مقفلة.

![صفحة المستندات والدفاتر](./images/gc-documents-ar.png)

## الدفاتر والتوجيهات

**عدم السماح بتغيير الكود في المستندات** `value.info.doNotAllowSpecifyingDocCode` *(مفعل افتراضياً)* — لا يستطيع المستخدم كتابة كود المستند يدوياً؛ فالرقم يأتي دائماً من مكوّد الدفتر. وهو مفعّل افتراضياً لسبب وجيه — فالأكواد المكتوبة يدوياً تُحدث فجوات وتكراراً يصعب تسويته لاحقاً.

**السماح بترك بادئة التكويد فارغة في الدفاتر اليدوية** `value.info.allowEmptyPrefixForManualBook` — يحتاج الدفتر المكوَّد يدوياً عادةً بادئة كود حتى تُميَّز مستنداته. فعّل هذا الخيار إذا كان لديك دفتر يجب أن تقف أرقامه وحدها.

**السماح باستعمال دفاتر مسموح بها دون حد أقصى في التوجيه** `value.info.unlimtedAllowedBooksInTerms` — يسرد التوجيه الدفاتر التي يسمح بها، وتُحفظ هذه القائمة في حقل سعته 700 حرف، فيفيض التوجيه الذي يسمح بدفاتر كثيرة. وتفعيل هذا الخيار ينقل القائمة إلى حقل طويل بلا حد عملي.

::: warning أعد حفظ التوجيهات بعد التفعيل
تُكتب قائمة الدفاتر المسموحة عند حفظ التوجيه. وتفعيل هذا الخيار لا يعيد كتابة التوجيهات الموجودة — بل عليك إعادة حفظ كل توجيه مستند بعده، وإلا ظلت تستعمل القائمة القصيرة القديمة.
:::

**اذا وجد دفتر واحد لمستند يتم استعماله مباشرة عند إنشاء جديد** `value.info.ifSingleBookIsDefinedForEntityUseItWithNew` — حين يوجد دفتر واحد فقط يناسب المستند الجاري إنشاؤه، يُختار آلياً بدل السؤال. تفصيل صغير يوفّر نقرة على كل مستند.

**اذا وجد توجيه واحد لمستند يتم استعماله مباشرة عند إنشاء جديد** `value.info.ifSingleTermIsDefinedForEntityUseItWithNew` — والمثل مع توجيهات المستندات.

**تجاهل محددات الدخول عند البحث عن دفتر و توجيه واحد** `value.info.doNotConsiderDimensionsWhenSearchingForSingleTermBook` — يجري فحص «هل يوجد واحد فقط؟» أعلاه ضمن المحددات الحالية افتراضياً. ومع تفعيل هذا الخيار يتجاهل البحث المحددات، فيُختار آلياً التوجيه أو الدفتر المناسب بصرف النظر عن الفرع.

**اظهار دفاتر المحددات الحالية فقط حتي لو كانت عام** `value.info.showOnlyCurrentDimensionBooks` — يقصر قائمة اختيار الدفتر على الدفاتر المطابقة لمحددات السجل. مفيد بعد أن يصير لكل فرع سلسلة ترقيم خاصة وتريد منع الموظفين من اختيار دفتر فرع آخر.

## القيم المشتقة من التوجيه

يستطيع التوجيه أن *يمدّ* المستند الذي يحكمه بالقيم؛ فتوجيه مبيعات فرع القاهرة يمكنه فرض الفرع وحقول المرجع بل والعملة. وكل خيار هنا يضيف عمود مصدر واحداً إلى شاشة توجيه المستند. وهي موقفة افتراضياً لأن كل عمود تضيفه قرار إضافي على من يصون التوجيهات.

- **إضافة تفاصيل القطاع للتوجيه** `value.info.addSectorSourceToTerms`
- **إضافة تفاصيل الفرع للتوجيه** `value.info.addBranchSourceToTerms`
- **إضافة تفاصيل المجموعة التحليلية للتوجيه** `value.info.addAnalysisSourceToTerms` *(مفعل افتراضياً)*
- **إضافة تفاصيل الإدارة للتوجيه** `value.info.addDeptSourceToTerms`
- **إضافة تفاصيل مصدر السجل للتوجيه** `value.info.addEntityDimSourceToTerms`
- **إضافة تفاصيل مصدر مرجع 1 للتوجيه** / **إضافة تفاصيل مصدر مرجع 2 للتوجيه** / **إضافة تفاصيل مصدر مرجع 3 للتوجيه** `value.info.addRef1SourceToTerms`, `...addRef2SourceToTerms`, `...addRef3SourceToTerms`
- **إضافة مصدر العملة و المعدل للتوجيه** `value.info.addCurrencyAndRateSourceToTerms`

## سلوك المستندات والمسودات

**استعمال الرقم التالي الحقيقي للمسودات** `value.info.useNextRealNumberForDrafts` — تسحب المسودات أرقامها عادةً من سلسلة مسودات منفصلة، فلا تستهلك المسودة التي لا تُعتمد أبداً رقماً حقيقياً. وتفعيل هذا الخيار يجعل المسودة تأخذ الرقم الحقيقي التالي، فتبقى سلسلة المستندات المعتمدة بلا فجوات، مقابل استهلاك أرقام على مسودات مهجورة. ويمكن لكل مكوّد على حدة تجاوز هذا الإعداد.

**Create Entity System Entry For Draft Records** `value.info.createEntitySystemEntryForDraftRecord` — يكتب مدخلاً نظامياً للمسودات كما للسجلات المعتمدة. ويلزم حين يحتاج ربطٌ خارجي أو تقرير أن يرى المستندات قبل اعتمادها.

**منع تغيير التاريخ مع النسخة المماثلة** `value.info.doNotChangeDateWithDuplicate` — يعيد إجراء «نسخة مماثلة» ضبط تاريخ المستند الجديد إلى اليوم افتراضياً. ومع تفعيل هذا الخيار يحتفظ بتاريخ المستند الأصلي، وهو السلوك الصحيح حين تنسخ لتصحيح قيد تاريخي.

**تفعيل منع مستند بناءا على من الاستعمال عند حفظ المسودة** `value.info.applyPreventUsageOfFromDocWithDrafts` — يمكن وسم المستند المصدر بحيث لا يُستهلك إلا مرة واحدة، ويُفحص ذلك عادةً عند الاعتماد. وهذا الخيار يطبّقه عند حفظ المسودة أيضاً، فلا يبدأ شخصان مسودتين من المصدر نفسه.

**Enable Record View Entity Flows** `value.info.enableRecordViewEntityFlows` — يسمح بمسارات الكيان التي محفّزها *عرض السجل*، فتُنفَّذ كلما فُتح سجل. وهو موقف افتراضياً ويُستحسن إبقاؤه كذلك ما لم تحتجه: فهو يضيف عملاً على فتح كل سجل. ويرفض النظام حفظ مسار كيان يستعمل هذا المحفّز ما دام الخيار موقفاً.

**أقصى عدد لسطور السندات والملفات** `value.info.maxLinesCount` *(الافتراضي 750)* — الحد الأعلى الافتراضي لعدد أسطر التفاصيل في السجل الواحد، وهو يحمي الخادم من مستند ضخم منفرد. ويمكن منح تركيبات كيان/جدول بعينها حداً خاصاً يتجاوز هذا.

**اقصي عدد من السطور عند إنشاء مستندات** `value.info.maxLinesPerGeneratedDoc` *(الافتراضي 1000)* — حين ينتج إقفال آخر السنة قيوده، يوزّعها على عدة مستندات بدل بناء قيد واحد هائل. وهذا هو عدد الأسطر في المستند المولَّد الواحد.

**الحقول المستبعدة من القوالب** `value.info.defaultValuesExcludedFields` — حين يحفظ المستخدم سجلاً كقالب «قيم افتراضية» يُنسخ كل ما فيه. اكتب هنا معرّفات الحقول — واحداً في كل سطر — لاستبعادها من هذه القوالب. والتواريخ والأكواد وأرقام المراجع هي المرشحة المعتادة.

## التكويد الآلي للملفات

يمكن تكويد الأصناف والحسابات وغيرها من الملفات الأساسية بصيغة حسابية بدل الكتابة اليدوية. وتعرّف هذه المجموعة تلك الصيغ، ويفحصها النظام عند حفظ الإعدادات.

::: info المستندات والأصناف وما عداهما
افصل بين الثلاثة. فرقم **المستند** يأتي من مكوّد دفتره لا من هنا. والصيغ أدناه تخص **الأصناف** وإصداراتها ومقاساتها وألوانها. أما أي ملف أساسي *آخر* — العملاء والموردون ومراكز التكلفة — فتُكوِّده [مجموعته](/ar/platform/documents-and-records/master-groups) إن كانت له مجموعة، وإلا فسطر في [أعدادات الحقول و الشاشات](/ar/platform/fields-and-entities-settings/fields-settings-auto-coding)، حيث تسمّي نوع السجل وتعطيه صيغة من النوع نفسه.
:::

**منع التكويد اليدوي للدفاتر الالية** `value.info.preventManualCoding` — يرفض حفظ سجل كُتب كوده يدوياً بينما مكوّده مضبوط على التكويد الآلي. وهو النظير الصارم لخيار كود المستند أعلاه.

**صيغة حساب الكود** `value.info.itemCodingFormula.codeCalculationFormula` — تبني الكود نفسه، وعادةً من مجموعة الصنف وتصنيفه ورقم متسلسل.

**Code Validity Query (Skip code if 1 is returned, and calculate next)** `value.info.itemCodingFormula.codeValidityQuery` — فحص يجب أن يجتازه الكود المولَّد. فإن طابق الاستعلام سجلاً موجوداً رُفض الكود وجُرِّب الرقم التالي. وبهذا تفرض قاعدة «لا يجوز أن يتشارك صنفان هذا الشكل من الكود».

**بادئة حساب التسلسل** `value.info.itemCodingFormula.codeSequencePrefix` — صيغة تنتج البادئة التي ينتمي عدّادها إلى اللاحقة الرقمية، فتحصل كل عائلة منتجات على سلسلة مستقلة.

**طول لاحقة الكود** / **أول رقم في لاحقة الكود** `value.info.itemCodingFormula.codeSuffixLength`, `...codeSuffixFirstNumber` — عرض الجزء الرقمي (مع أصفار التعبئة) والرقم الذي يبدأ منه.

**صيغة حساب الاسم العربي** / **صيغة حساب الاسم الإنجليزي** `value.info.itemCodingFormula.name1CalculationFormula`, `...name2CalculationFormula` — صيغتان تبنيان الاسمين العربي والإنجليزي، فيخرج الصنف المولَّد موصوفاً تماماً دون كتابة.

**صيغه الكود البديل** `value.info.itemCodingFormula.altCodeFormula` — تبني الكود البديل.

**صيغة حساب الكود للإصدارات** و**صيغة تكويد اسم 1 للاصدارة** / **صيغة تكويد اسم 2 للاصدارة** `value.info.itemCodingFormula.revCodeCalculationFormula`, `...rvName1Formula`, `...rvName2Formula` — الصيغ الثلاث نفسها مطبَّقة على مراجعات الأصناف المولَّدة.

**صيغة حساب الكود للمقاس و اللون** و**صيغة تكويد اسم 1 للون والمقاس** / **صيغة تكويد اسم 2 للون والمقاس** `value.info.itemCodingFormula.sizeAndColorCodeCalculationFormula`, `...szName1Formula`, `...szName2Formula` — والمثل مع متغيّرات المقاس واللون المولَّدة، وهنا يظهر عائد التكويد الآلي حقاً: فقميص بخمسة مقاسات وأربعة ألوان يصير عشرين سجلاً مسمّى تسمية صحيحة بلا كتابة.

**عدم تحديث الكود مع التعديل** `value.info.itemCodingFormula.doNotResetCodeWithUpdate` — يبقي الكود الحالي عند تعديل السجل، حتى لو تغيّرت مدخلات الصيغة.

**تحديث الإصدار إذا كان فارغا فقط** / **تحديث اللون والمقاس إذا كانا فارغين فقط** `value.info.itemCodingFormula.updateRevisionIfEmpty`, `...updateColorAndSizeIfEmpty` — يملأ هذه الأكواد فقط حين تكون فارغة، ولا يمس ما كُوِّد من قبل.

## الأقساط

**طريقة تكويد الأقساط** `value.info.installmentCodingMethod` — كيف تُرقَّم الأقساط المولَّدة: **كود المستند ورقم السطر**، أو **تاريخ القسط ورقم السطر**، أو **صيغة**.

**معادلة حساب كود القسط** `value.info.installmentCodingFormula` — الصيغة المستعملة حين تكون الطريقة «صيغة».

**القيمة المتجاهلة عند مقارنة المدفوع بالأقساط (الدفعات)** `value.info.ignoredValueWhenPayingInstallments` — التسامح عند مقارنة الدفعة بقيمة القسط. اضبطه فوق أصغر وحدة نقدية لديك بقليل، حتى لا يعطّل فرق تقريب بقرش واحد تسويةً كاملة.

**عدم مقارنة المتبقي بإجمالي الدفعات في الفواتير** `value.info.doNotCompareRemainingWithPaymentTotalInInvoices` — يتخطى التحقق من أن متبقي الفاتورة يساوي إجمالي جدول دفعاتها. استعمله فقط حيث يختلف الرقمان بحكم التصميم.

## الفترات المالية والإقفال

**السماح بتعديل المستندات قبل تاريخ القيد الختامى** `value.info.doNotPreventModifyingDocsBeforeLastCloseEntry` — يُقفل المستند المؤرخ قبل آخر قيد إقفال عادةً، لأن تعديله يغيّر فترة أُقفلت وصدرت عنها تقارير. وهذا الخيار يرفع ذلك القفل.

**Allow Reprocessing Of Ledger Trans Requests Before Closing Entry** (السماح بإعادة معالجة طلبات الأعمال المحاسبية قبل القيد الختامي؛ يظهر العنوان بالإنجليزية على الشاشة العربية أيضًا) `value.info.allowReprocessingOfLedgerTransRequestsBeforeClosingEntry` — يسمح بإعادة معالجة الآثار المحاسبية للمستندات المؤرخة قبل قيد الإقفال.

**Allow Reprocessing Of Inventory Trans Requests Before Closing Entry** (السماح بإعادة معالجة طلبات الأعمال المخزنية قبل القيد الختامي) `value.info.allowReprocessingOfInvTransRequestsBeforeClosingEntry` — والمثل مع الآثار المخزنية.

::: danger لا يفعّل هذين الخيارين إلا جلسة دعم من نما
تفعيل أيٍّ من الخيارين ليس تعديلاً عادياً. فكلاهما في مستوى أمان محمي، والحفظُ الذي يفعّل أحدهما من جلسة عادية يُرفض بالرسالة
*«انت لا تمتلك صلاحية التعديل على الحقل {0} لأنه ينتمى لمستوى الأمان {1} برجاء التواصل مع الدعم الفنى»*
— ويحل في الموضعين معرّف الخيار و`L2Dangerous`. أما إعادة إطفائهما فغير محجوبة.

وهذا مقصود: فإعادة المعالجة عبر قيد ختامي تعيد كتابة أرقام بُنيت عليها فترة مقفلة، فقد تتغيّر في صمت أرصدة سبق رفعها إلى الإدارة أو إلى مراجع الحسابات. وما دام أحدهما مفعّلاً يظهر عند كل دخول الخطأ الحرج *The option {0} in {1} config is enabled, it should be disabled. Please contact our support team.* (بالإنجليزية فقط) — انظر [الأخطاء الحرجة](/ar/admin/troubleshooting/critical-errors). فعّلهما لتصحيح مُراقَب ثم أطفئهما مرة أخرى.
:::

**تفعيل تحديث حالة السنة المالية** `value.info.enableFiscalYearStatusUpdateFile` — يفعّل ملف تحديث حالة السنة المالية، الذي يغلق فترةً مفتوحة إغلاقاً إضافياً لتركيبة بعينها من الكيان والمحددات والمستخدم. ولا يستطيع إعادة فتح فترة مغلقة — انظر [التحكم في إقفال الفترات المحاسبية](/ar/platform/governance/fiscal-period-control-guide).

**تجاهل الفترات المغلقة في** `value.info.ignoreClosedPeriodsIn` *(جدول)* — بديل أدق من الخيارات أعلاه. كل سطر يمنح مستخدماً واحداً (أو مجموعة «السماح لـ») حق حفظ المستندات في فترة مالية وسنة محددتين، لنوع كيان واحد، مع إمكانية تضييقه بمحددات بعينها. وبهذا تدع المحاسب ينهي تسويات الشهر الماضي دون فتح الفترة للجميع.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| عدم السماح بتغيير الكود في المستندات | Do Not Allow Changing Document Code | `value.info.doNotAllowSpecifyingDocCode` | [الدفاتر والتوجيهات](#ldftr-wltwjyht) |
| السماح بترك بادئة التكويد فارغة في الدفاتر اليدوية | Allow Empty Prefix For Manual Book | `value.info.allowEmptyPrefixForManualBook` | [الدفاتر والتوجيهات](#ldftr-wltwjyht) |
| السماح باستعمال دفاتر مسموح بها دون حد أقصى في التوجيه | Unlimeted Allowed Books in Terms | `value.info.unlimtedAllowedBooksInTerms` | [الدفاتر والتوجيهات](#ldftr-wltwjyht) |
| اذا وجد دفتر واحد لمستند يتم استعماله مباشرة عند إنشاء جديد | If Single Book Is Defined For Entity Use It With New | `value.info.ifSingleBookIsDefinedForEntityUseItWithNew` | [الدفاتر والتوجيهات](#ldftr-wltwjyht) |
| اذا وجد توجيه واحد لمستند يتم استعماله مباشرة عند إنشاء جديد | If Single Term Is Defined For Entity Use It With New | `value.info.ifSingleTermIsDefinedForEntityUseItWithNew` | [الدفاتر والتوجيهات](#ldftr-wltwjyht) |
| تجاهل محددات الدخول عند البحث عن دفتر و توجيه واحد | Do Not Consider Dimensions When Searching For Single Term And Book | `value.info.doNotConsiderDimensionsWhenSearchingForSingleTermBook` | [الدفاتر والتوجيهات](#ldftr-wltwjyht) |
| اظهار دفاتر المحددات الحالية فقط حتي لو كانت عام | Show Only Current Dimensions Books (Even if they are PUBLIC) | `value.info.showOnlyCurrentDimensionBooks` | [الدفاتر والتوجيهات](#ldftr-wltwjyht) |
| إضافة تفاصيل القطاع للتوجيه | Add Sector Source To Terms | `value.info.addSectorSourceToTerms` | [القيم المشتقة من التوجيه](#lqym-lmshtq-mn-ltwjyh) |
| إضافة تفاصيل الفرع للتوجيه | Add Branch Source To Terms | `value.info.addBranchSourceToTerms` | [القيم المشتقة من التوجيه](#lqym-lmshtq-mn-ltwjyh) |
| إضافة تفاصيل المجموعة التحليلية للتوجيه | Add AnalysisSet Source To Terms | `value.info.addAnalysisSourceToTerms` | [القيم المشتقة من التوجيه](#lqym-lmshtq-mn-ltwjyh) |
| إضافة تفاصيل الإدارة للتوجيه | Add Department Source To Terms | `value.info.addDeptSourceToTerms` | [القيم المشتقة من التوجيه](#lqym-lmshtq-mn-ltwjyh) |
| إضافة تفاصيل مصدر السجل للتوجيه | Add Entity Dimension Source To Terms | `value.info.addEntityDimSourceToTerms` | [القيم المشتقة من التوجيه](#lqym-lmshtq-mn-ltwjyh) |
| إضافة تفاصيل مصدر مرجع 1 للتوجيه | Add Ref1 Source To Terms | `value.info.addRef1SourceToTerms` | [القيم المشتقة من التوجيه](#lqym-lmshtq-mn-ltwjyh) |
| إضافة تفاصيل مصدر مرجع 2 للتوجيه | Add Ref2 Source To Terms | `value.info.addRef2SourceToTerms` | [القيم المشتقة من التوجيه](#lqym-lmshtq-mn-ltwjyh) |
| إضافة تفاصيل مصدر مرجع 3 للتوجيه | Add Ref3 Source To Terms | `value.info.addRef3SourceToTerms` | [القيم المشتقة من التوجيه](#lqym-lmshtq-mn-ltwjyh) |
| إضافة مصدر العملة و المعدل للتوجيه | Add Currency And Rate Source To Terms | `value.info.addCurrencyAndRateSourceToTerms` | [القيم المشتقة من التوجيه](#lqym-lmshtq-mn-ltwjyh) |
| استعمال الرقم التالي الحقيقي للمسودات | Use Next Real Number For Drafts | `value.info.useNextRealNumberForDrafts` | [سلوك المستندات والمسودات](#slwk-lmstndt-wlmswdt) |
| Create Entity System Entry For Draft Records | Create Entity System Entry For Draft Records | `value.info.createEntitySystemEntryForDraftRecord` | [سلوك المستندات والمسودات](#slwk-lmstndt-wlmswdt) |
| منع تغيير التاريخ مع النسخة المماثلة | Do Not Change Date With Duplicate | `value.info.doNotChangeDateWithDuplicate` | [سلوك المستندات والمسودات](#slwk-lmstndt-wlmswdt) |
| تفعيل منع مستند بناءا على من الاستعمال عند حفظ المسودة | Apply Prevent Usage Of From Doc With Drafts | `value.info.applyPreventUsageOfFromDocWithDrafts` | [سلوك المستندات والمسودات](#slwk-lmstndt-wlmswdt) |
| Enable Record View Entity Flows | Enable Record View Entity Flows | `value.info.enableRecordViewEntityFlows` | [سلوك المستندات والمسودات](#slwk-lmstndt-wlmswdt) |
| أقصى عدد لسطور السندات والملفات | Max Lines Count For Documents And Files | `value.info.maxLinesCount` | [سلوك المستندات والمسودات](#slwk-lmstndt-wlmswdt) |
| اقصي عدد من السطور عند إنشاء مستندات | Max. Lines Per Generated Doc. | `value.info.maxLinesPerGeneratedDoc` | [سلوك المستندات والمسودات](#slwk-lmstndt-wlmswdt) |
| الحقول المستبعدة من القوالب | Template Excluded Fields | `value.info.defaultValuesExcludedFields` | [سلوك المستندات والمسودات](#slwk-lmstndt-wlmswdt) |
| منع التكويد اليدوي للدفاتر الالية | Prevent Manual Coding for Autocoded books | `value.info.preventManualCoding` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغة حساب الكود | Code Calculation Formula | `value.info.itemCodingFormula.codeCalculationFormula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| Code Validity Query (Skip code if 1 is returned, and calculate next) | Code Validity Query (Skip code if 1 is returned, and calculate next) | `value.info.itemCodingFormula.codeValidityQuery` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| بادئة حساب التسلسل | Code Sequence Prefix | `value.info.itemCodingFormula.codeSequencePrefix` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| طول لاحقة الكود | Code Suffix Length | `value.info.itemCodingFormula.codeSuffixLength` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| أول رقم في لاحقة الكود | Suffix First Number | `value.info.itemCodingFormula.codeSuffixFirstNumber` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغة حساب الاسم العربي | Name1 Calculation Formula | `value.info.itemCodingFormula.name1CalculationFormula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغة حساب الاسم الإنجليزي | Name2 Calculation Formula | `value.info.itemCodingFormula.name2CalculationFormula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغه الكود البديل | Alternate Code Formula | `value.info.itemCodingFormula.altCodeFormula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغة حساب الكود للإصدارات | Revision Code Calculation Formula | `value.info.itemCodingFormula.revCodeCalculationFormula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغة تكويد اسم 1 للاصدارة | Name 1 Encoding Formula For Revision | `value.info.itemCodingFormula.rvName1Formula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغة تكويد اسم 2 للاصدارة | Name 2 Encoding Formula For Revision | `value.info.itemCodingFormula.rvName2Formula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغة حساب الكود للمقاس و اللون | Size And Color Code Calculation Formula | `value.info.itemCodingFormula.sizeAndColorCodeCalculationFormula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغة تكويد اسم 1 للون والمقاس | Name 1 Encoding Formula For Colour And Size | `value.info.itemCodingFormula.szName1Formula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| صيغة تكويد اسم 2 للون والمقاس | Name 2 Encoding Formula For Colour And Size | `value.info.itemCodingFormula.szName2Formula` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| عدم تحديث الكود مع التعديل | Do Not Reset Code With Update | `value.info.itemCodingFormula.doNotResetCodeWithUpdate` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| تحديث الإصدار إذا كان فارغا فقط | Update Revision If Empty Only | `value.info.itemCodingFormula.updateRevisionIfEmpty` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| تحديث اللون والمقاس إذا كانا فارغين فقط | Update Color and Size If Empty Only | `value.info.itemCodingFormula.updateColorAndSizeIfEmpty` | [التكويد الآلي للملفات](#ltkwyd-laly-llmlft) |
| طريقة تكويد الأقساط | Installment Coding Method | `value.info.installmentCodingMethod` | [الأقساط](#lqsT) |
| معادلة حساب كود القسط | Installment Coding Formula | `value.info.installmentCodingFormula` | [الأقساط](#lqsT) |
| القيمة المتجاهلة عند مقارنة المدفوع بالأقساط (الدفعات) | Ignored Value When Paying Installments | `value.info.ignoredValueWhenPayingInstallments` | [الأقساط](#lqsT) |
| عدم مقارنة المتبقي بإجمالي الدفعات في الفواتير | Do Not Compare Remaining With Payment Total In Invoices | `value.info.doNotCompareRemainingWithPaymentTotalInInvoices` | [الأقساط](#lqsT) |
| السماح بتعديل المستندات قبل تاريخ القيد الختامى | Do Not Prevent Modifying Documents Before Last Close Entry Date | `value.info.doNotPreventModifyingDocsBeforeLastCloseEntry` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| Allow Reprocessing Of Ledger Trans Requests Before Closing Entry | Allow Reprocessing Of Ledger Trans Requests Before Closing Entry | `value.info.allowReprocessingOfLedgerTransRequestsBeforeClosingEntry` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| Allow Reprocessing Of Inventory Trans Requests Before Closing Entry | Allow Reprocessing Of Inventory Trans Requests Before Closing Entry | `value.info.allowReprocessingOfInvTransRequestsBeforeClosingEntry` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| تفعيل تحديث حالة السنة المالية | Enable Fiscal Year Status Update | `value.info.enableFiscalYearStatusUpdateFile` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| تجاهل الفترات المغلقة في | Ignore Closed Periods In | `value.info.ignoreClosedPeriodsIn` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| النوع | Entity Type | `value.info.ignoreClosedPeriodsIn.entityType` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| الفترة | Fiscal Period | `value.info.ignoreClosedPeriodsIn.fiscalPeriod` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| السنة المالية | Fiscal Year | `value.info.ignoreClosedPeriodsIn.fiscalYear` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| المستخدم | User | `value.info.ignoreClosedPeriodsIn.user` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| السماح ل | Allow For | `value.info.ignoreClosedPeriodsIn.allowFor` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| الشركة | Legal Entity | `value.info.ignoreClosedPeriodsIn.legalEntity` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| المجموعة التحليلية | Analysis set | `value.info.ignoreClosedPeriodsIn.analysisSet` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| القطاع | Sector | `value.info.ignoreClosedPeriodsIn.sector` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| الفرع | Branch | `value.info.ignoreClosedPeriodsIn.branch` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
| الإدارة | Department | `value.info.ignoreClosedPeriodsIn.department` | [الفترات المالية والإقفال](#lftrt-lmly-wlqfl) |
