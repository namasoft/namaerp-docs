---
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# المحاسبة والمالية

تجمع هذه الصفحة الإعدادات التي تقرر متى يكون الفرق صغيراً بما يكفي لتجاهله، وكم خانة حساب يحملها العميل أو المورد، وكيف تُتابَع حدود الائتمان وأعمار الديون، وكيف تتصرف المدفوعات والموازنات والتكاليف.

![صفحة المحاسبة والمالية](./images/gc-accounting-ar.png)

## حدود التقريب المسموحة

أي نظام يضرب الكميات في الأسعار ويطبّق النسب سينتج في النهاية إجمالي مدين وإجمالي دائن يختلفان بجزء من القرش. وهذه الأرقام الثلاثة تخبر النظام متى يتغاضى ومتى يرفض.

**القيمة المتجاهلة عند مقارنة الكسور** `value.info.lowMargin` *(الافتراضي 0.0001)* — «المبلغ المهمَل» العام في النظام. ويُرجَع إليه في مواضع كثيرة: قيود اليومية، والتحويلات بين الشركات، والحركات المحاسبية، وحصر المقاولات، والتحقق من الأسعار. وأي فرق أصغر منه يُعامل كصفر.

::: warning أبقِ الهامش صغيراً
الاسم وعد. فالنظام يرفض حفظ قيمة أكبر من 10 ويعترض صراحةً بأن الرقم «ليس صغيراً على الإطلاق»، لأن الهامش الكبير يبتلع في صمت اختلالات حقيقية. والقيمة الافتراضية 0.0001 مناسبة للجميع تقريباً.
:::

**أقصى قيمة لتصحيح فرق المدين عن الدائن** `value.info.maximumDrCrDiffCorrection` — أكبر اختلال يصححه النظام في صمت بدل رفضه عند كتابة حركة محاسبية. وموقعه فوق هامش الخطأ: فما دون الهامش لم يحدث شيء، وما بين الاثنين يصححه النظام، وما فوقه يُرفض القيد.

**اقل قيمة للحركة المدينة والدائنة** `value.info.minDebitCreditValue` *(الافتراضي 0.0005)* — المبالغ الأقل من هذا تُعدّ صفراً عند تحديد جانب القيد مديناً أو دائناً، فيمنع ذلك كسراً متبقياً من إنشاء سطر أحادي بلا معنى.

## حسابات الذمم

يحمل العميل أو المورد أو الموظف مجموعة خانات حسابات — مدينون، ودائنون، وسُلف، وغيرها. خمس منها موجودة دائماً، والخانات من 6 إلى 20 اختيارية.

**إستخدام حساب 6** حتى **إستخدام حساب 20** `value.info.useAccount6` … `value.info.useAccount20` — كل مفتاح يضيف خانة حساب واحدة إلى شاشات الملفات الأساسية المعنية. فعّل ما تستعمله فقط: فكل خانة تفعّلها حقل إضافي على كل شاشة عميل ومورد وموظف.

**يجب أن تطابق العملة في الذمة عملة الحساب** `value.info.subsidiaryCurrencyShouldMatchAccountsCurrency` — يتحقق من أن كل حساب مرتبط بالذمة يحمل عملة الذمة نفسها، ويرشّح قائمة اختيار الحسابات وفق ذلك. ويستحق التفعيل حيثما تتعامل بأكثر من عملة، لأن الحساب غير المطابق لا يُكتشف إلا حين ترفض الأرصدة أن تتطابق.

## حدود ائتمان العملاء

**إضافة الشركة للحدود الإتمانية للعميل** / **إضافة القسم للحدود الإتمانية للعميل** / **إضافة الفرع للحدود الإتمانية للعميل** / **إضافة الإدارة للحدود الإتمانية للعميل** / **إضافة المجموعة التحليلية للحدود الإتمانية للعميل** `value.info.addLegalEntityToCustCredits`, `...addSectorToCustCredits`, `...addBranchToCustCredits`, `...addDeptToCustCredits`, `...addAnalysisSetToCustCredits` — كل خيار يضيف ذلك المحدد عموداً في جدول حدود ائتمان العميل، فيمكن منح العميل الواحد حداً مختلفاً لكل فرع أو لكل شركة. فعّل المحددات التي تميّزها سياسة الائتمان لديك فعلاً، فكل واحد منها يضاعف عدد الأسطر التي على إدارة الائتمان صيانتها.

## أعمار الديون

أعمار الديون هي الطريقة التي يربط بها النظام المقبوضات بالفواتير التي تسددها، وبها يجيب عن سؤال «كم عمر هذا الرصيد؟».

**متابعة اعمار الديون على القطاع** / **متابعة اعمار الديون على الفرع** / **متابعة اعمار الديون على القسم** / **متابعة اعمار الديون على المجموعة التحليلية** / **متابعة اعمار الديون على السجل** `value.info.trackDebtAgesOn.trackDebtAgesOnSector` وأخواته — المحددات التي تكوّن المفتاح الذي تُتابع الديون وتُربط عليه. وإضافة محدد هنا تعني أن سند قبض في فرع لن يرتبط بفاتورة في فرع آخر. وهو صحيح حين تكون الفروع دفاتر منفصلة فعلاً، ومزعج حين لا تكون كذلك.

**اقصي عدد من الفواتير عند البحث** `value.info.trackDebtAgesOn.maxInvoicesInSuggestionList` *(الافتراضي 256)* — يحدّ عدد الفواتير المفتوحة المعروضة عند ربط سند قبض. ارفعه للعملاء ذوي القوائم المفتوحة الطويلة جداً؛ وكل سطر إضافي يكلّف وقتاً على الشاشة.

**إعادة معالجة الديون المربوطة بالخطا كل مرة** `value.info.trackDebtAgesOn.reprocessAllUnmatchedDebtAgesEveryTime` — يفحص كل دين غير مرتبط في كل تشغيل بدل الجديد وحده. شامل، لكنه يبطؤ تدريجياً كلما كبر تراكم غير المرتبط.

**عدم عرض اعمار الديون المسددة الياً** `value.info.trackDebtAgesOn.doNotDisplayAutomaticMatchedDebitAges` — يخفي الأسطر التي ربطها النظام بنفسه، فلا تبقى على الشاشة إلا ما يحتاج قراراً بشرياً.

**عدم عرض أعمار الديون الغير مسددة يدويا قبل تاريخ** `value.info.trackDebtAgesOn.doNotShowUnpaidDebtsBefore` — تاريخ فاصل. فالديون القديمة غير المسددة قبله تكفّ عن تكديس شاشة الربط، وهو مفيد بعد نقل بيانات من نظام سابق أدخل سنوات من البنود المفتوحة التاريخية.

**اختصار أعمار الديون في نفس السند** `value.info.trackDebtAgesOn.shortenDebtAgesInSameDocument` — يقاصّ المدين والدائن العائدين للمستند نفسه قبل الربط، فتتلاشى الفاتورة مع إشعار الخصم الخاص بها بدل ظهورهما بندين مفتوحين.

**عدم ربط أعمار الديون آليا (يدويا فقط)** `value.info.trackDebtAgesOn.neverAutoMatchDebtAges` — يعطّل الربط الآلي تماماً. اختره حيث يصرّ الفريق المحاسبي على أن يقرر كل تخصيص بنفسه.

## المدفوعات والمقبوضات

**استعمال الجداول النظامية لمتابعة ربط الصرف والقبض بالفواتير** `value.info.usePayReceiptDocsSysEntries` *(مفعل افتراضياً)* — تنشئ مستندات القبض والصرف مدخلات نظامية على الفواتير التي تسددها، وهذا ما يجعل الفاتورة على علم بما سُدِّد منها.

**خصم المدفوع والمقبوض عند حساب المتبقي في الفواتير** `value.info.deductPaymentAndReceiptInRemaining` — تنقص هذه المدفوعات أيضاً من *متبقي* الفاتورة. ويعتمد هذا الخيار على سابقه؛ ويرفض النظام حفظه وحده ويخبرك بذلك.

**تفعيل عدد الأيام قبل السماح بالمرتجع حسب طريقة الدفع** `value.info.enableDaysBeforeAllowingReturnInPaymentMethod` — يفعّل القاعدة الخاصة بكل طريقة دفع بأن البيع لا يُرتجع إلا بعد مرور عدد معيّن من الأيام. وتسويات البطاقات هي السبب المعتاد.

## الموازنات

**إمكانية التعديل في قيم السنة الأولي للموازنة** حتى **إمكانية التعديل في قيم السنة الرابعة للموازنة** `value.info.allowValuesChangeOfYear1` … `...Year4` — يقارن سيناريو الموازنة حتى أربع سنوات، ويحدد كل مفتاح هل تُعدَّل أرقام تلك السنة. وعادةً تُقفل السنوات الماضية وتُترك السنة الجاري تخطيطها مفتوحة.

**استخدام إلى فترة فى الموازنات المالية و البيعية** `value.info.useToPeriodInFinancialBudget` — يضيف عمود «إلى فترة» إلى جداول الموازنة المالية وسيناريو الموازنة، فيغطي السطر الواحد مدى فترات بدل فترة واحدة. فعّله حيث تُوضع الموازنات ربع سنوية أو سنوية لا شهراً بشهر.

## التكاليف

**إيقاف قيود التسوية المخزنية** `value.info.disableWarehousesAdjustment` *(مفعل افتراضياً)* — عند تفعيله لا ينتج النظام أسطر تسوية تكلفة لكل مخزن، ويتخطى فحص توازن تلك التسويات. وهو مفعّل افتراضياً لأن معظم التركيبات لا تتابع التكلفة على مستوى المخزن. لا توقفه إلا إذا كنت تحتاج تسوية التكلفة على مستوى المخزن فعلاً، وتوقّع أسطر قيود إضافية وتشغيل تكلفة أبطأ.

**Enable PresendRequests For Cost Ledger** `value.info.enablePresendRequestsForCostLedger` — يسمح بإنشاء طلب أعمال قبل حفظ المستند المالك له. وهذا ما يتيح إلحاق آثار محاسبية بصرف مخزني أو إذن إضافة أو تحويل عبر مسار كيان؛ ويرفض المسار العمل بدونه ويخبرك بذلك.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| القيمة المتجاهلة عند مقارنة الكسور | Ignored margin when comparing fractions | `value.info.lowMargin` | [حدود التقريب المسموحة](#Hdwd-ltqryb-lmsmwH) |
| أقصى قيمة لتصحيح فرق المدين عن الدائن | Maximum Debit/Credit Difference Correction Value | `value.info.maximumDrCrDiffCorrection` | [حدود التقريب المسموحة](#Hdwd-ltqryb-lmsmwH) |
| اقل قيمة للحركة المدينة والدائنة | Min Debit Credit Value | `value.info.minDebitCreditValue` | [حدود التقريب المسموحة](#Hdwd-ltqryb-lmsmwH) |
| إستخدام حساب 6 | Use Account 6 | `value.info.useAccount6` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 7 | Use Account 7 | `value.info.useAccount7` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 8 | Use Account 8 | `value.info.useAccount8` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 9 | Use Account 9 | `value.info.useAccount9` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 10 | Use Account 10 | `value.info.useAccount10` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 11 | Use Account 11 | `value.info.useAccount11` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 12 | Use Account 12 | `value.info.useAccount12` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 13 | Use Account 13 | `value.info.useAccount13` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 14 | Use Account 14 | `value.info.useAccount14` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 15 | Use Account 15 | `value.info.useAccount15` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 16 | Use Account 16 | `value.info.useAccount16` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 17 | Use Account 17 | `value.info.useAccount17` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 18 | Use Account 18 | `value.info.useAccount18` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 19 | Use Account 19 | `value.info.useAccount19` | [حسابات الذمم](#Hsbt-ldhmm) |
| إستخدام حساب 20 | Use Account 20 | `value.info.useAccount20` | [حسابات الذمم](#Hsbt-ldhmm) |
| يجب أن تطابق العملة في الذمة عملة الحساب | Subsidiary Currency Should Match Accounts Currency | `value.info.subsidiaryCurrencyShouldMatchAccountsCurrency` | [حسابات الذمم](#Hsbt-ldhmm) |
| إضافة الشركة للحدود الإتمانية للعميل | Add Legal Entity To Customer Credits | `value.info.addLegalEntityToCustCredits` | [حدود ائتمان العملاء](#Hdwd-ytmn-laaml) |
| إضافة القسم للحدود الإتمانية للعميل | Add Sector To Customer Credits | `value.info.addSectorToCustCredits` | [حدود ائتمان العملاء](#Hdwd-ytmn-laaml) |
| إضافة الفرع للحدود الإتمانية للعميل | Add Branch To Customer Credits | `value.info.addBranchToCustCredits` | [حدود ائتمان العملاء](#Hdwd-ytmn-laaml) |
| إضافة الإدارة للحدود الإتمانية للعميل | Add Department To Customer Credits | `value.info.addDeptToCustCredits` | [حدود ائتمان العملاء](#Hdwd-ytmn-laaml) |
| إضافة المجموعة التحليلية للحدود الإتمانية للعميل | Add Analysis Set To Customer Credits | `value.info.addAnalysisSetToCustCredits` | [حدود ائتمان العملاء](#Hdwd-ytmn-laaml) |
| متابعة اعمار الديون على القطاع | Track Debt Ages On Sector | `value.info.trackDebtAgesOn.trackDebtAgesOnSector` | [أعمار الديون](#aamr-ldywn) |
| متابعة اعمار الديون على الفرع | Track Debt Ages On Branch | `value.info.trackDebtAgesOn.trackDebtAgesOnBranch` | [أعمار الديون](#aamr-ldywn) |
| متابعة اعمار الديون على القسم | Track Debt Ages On Department | `value.info.trackDebtAgesOn.trackDebtAgesOnDepartment` | [أعمار الديون](#aamr-ldywn) |
| متابعة اعمار الديون على المجموعة التحليلية | Track Debt Ages On Analysis Set | `value.info.trackDebtAgesOn.trackDebtAgesOnAnalysisSet` | [أعمار الديون](#aamr-ldywn) |
| متابعة اعمار الديون على السجل | Track Debt Ages On Entity Dimension | `value.info.trackDebtAgesOn.trackDebtAgesOnEntityDimension` | [أعمار الديون](#aamr-ldywn) |
| اقصي عدد من الفواتير عند البحث | Max Invoices In Search | `value.info.trackDebtAgesOn.maxInvoicesInSuggestionList` | [أعمار الديون](#aamr-ldywn) |
| إعادة معالجة الديون المربوطة بالخطا كل مرة | Reprocess All Unmatched Debt Ages Every Time | `value.info.trackDebtAgesOn.reprocessAllUnmatchedDebtAgesEveryTime` | [أعمار الديون](#aamr-ldywn) |
| عدم عرض اعمار الديون المسددة الياً | Do Not Display Automatically Matched Debt Ages | `value.info.trackDebtAgesOn.doNotDisplayAutomaticMatchedDebitAges` | [أعمار الديون](#aamr-ldywn) |
| عدم عرض أعمار الديون الغير مسددة يدويا قبل تاريخ | Do Not Display Unpaid Debt Ages Before Date | `value.info.trackDebtAgesOn.doNotShowUnpaidDebtsBefore` | [أعمار الديون](#aamr-ldywn) |
| اختصار أعمار الديون في نفس السند | Shorten Debt Ages In Same Document | `value.info.trackDebtAgesOn.shortenDebtAgesInSameDocument` | [أعمار الديون](#aamr-ldywn) |
| عدم ربط أعمار الديون آليا (يدويا فقط) | Never Automatically Match Debt Ages (Manual Matching Only) | `value.info.trackDebtAgesOn.neverAutoMatchDebtAges` | [أعمار الديون](#aamr-ldywn) |
| استعمال الجداول النظامية لمتابعة ربط الصرف والقبض بالفواتير | Use System Entries For Payment/Receipt Documents Relationship to Invoices | `value.info.usePayReceiptDocsSysEntries` | [المدفوعات والمقبوضات](#lmdfwaat-wlmqbwDt) |
| خصم المدفوع والمقبوض عند حساب المتبقي في الفواتير | Deduct Payments And Receipts In Invoices Remaining | `value.info.deductPaymentAndReceiptInRemaining` | [المدفوعات والمقبوضات](#lmdfwaat-wlmqbwDt) |
| تفعيل عدد الأيام قبل السماح بالمرتجع حسب طريقة الدفع | Enable Days Before Allowing Return in Payment Methods | `value.info.enableDaysBeforeAllowingReturnInPaymentMethod` | [المدفوعات والمقبوضات](#lmdfwaat-wlmqbwDt) |
| إمكانية التعديل في قيم السنة الأولي للموازنة | Allow changing in budget year 1 values | `value.info.allowValuesChangeOfYear1` | [الموازنات](#lmwznt) |
| إمكانية التعديل في قيم السنة الثانية للموازنة | Allow changing in budget year 2 values | `value.info.allowValuesChangeOfYear2` | [الموازنات](#lmwznt) |
| إمكانية التعديل في قيم السنة الثالثة للموازنة | Allow changing in budget year 3 values | `value.info.allowValuesChangeOfYear3` | [الموازنات](#lmwznt) |
| إمكانية التعديل في قيم السنة الرابعة للموازنة | Allow changing in budget year 4 values | `value.info.allowValuesChangeOfYear4` | [الموازنات](#lmwznt) |
| استخدام إلى فترة فى الموازنات المالية و البيعية | Use To Period In Financial and Sales Budgets | `value.info.useToPeriodInFinancialBudget` | [الموازنات](#lmwznt) |
| إيقاف قيود التسوية المخزنية | Disable Warehouses Adjustment | `value.info.disableWarehousesAdjustment` | [التكاليف](#ltklyf) |
| Enable PresendRequests For Cost Ledger | Enable PresendRequests For Cost Ledger | `value.info.enablePresendRequestsForCostLedger` | [التكاليف](#ltklyf) |
