---
description: "فهرس استدعاءات NamaRep في تعبيرات التقارير: الترجمة، والتواريخ الهجرية والأوقات، والأرقام وتفقيط المبالغ، والأسعار، والروابط إلى السجلات والتقارير، وإنشاء السجلات، وأرصدة الإجازات، ونقاط المكافآت، والاستعلام من قاعدة البيانات، وقيود الأمان، ورموز QR، وسجل التدقيق، ومدخلات النظام."
entities: [ReportDefinition]
---

# مرجع تعبيرات NamaRep

داخل التقرير، وفي كل موضع يقبل فيه JasperReports تعبيراً — حقل نصي، أو متغير، أو قيمة افتراضية لمدخل، أو شرط طباعة — تستطيع استدعاء `NamaRep`. فهو الجسر بين التصميم وبقية نظام نما: يترجم، وينسّق التواريخ والأرقام، ويستخرج الأسعار، ويبني الروابط الراجعة إلى النظام، ويطبّق قواعد الأمان التي يتجاهلها استعلام SQL الخام.

وهذه الصفحة فهرس، مرتّب لتجد الاستدعاء وتنسخه. أما كيفية بناء التقارير ونشرها وتعريف مدخلاتها ففي [دليل Jasper Reports الشامل](/ar/platform/reports/reports-guide).

وثمة عرفان يسريان على كل ما يلي. الوسائط التي تسمّي سجلاً تقبل **المعرّف أو الكود** ما لم يُذكر خلاف ذلك. والاستدعاءات ذات البنّاء — `priceCalculator()` و`link()` و`listView()` و`newWithFields()` — سلاسل تنتهي باستدعاء ختامي مثل `.toString()` أو `.price()`، ولا يحدث شيء قبل تنفيذ الاستدعاء الختامي.

## الأسماء والترجمة

يحمل كل سجل اسماً عربياً واسماً إنجليزياً. و`name()` يختار المناسب للغة التي يشغّل بها القارئ التقرير، فيخدم حقل نصي واحد الجمهورَين معاً.

```groovy
// يختار الاسم العربي أو الإنجليزي بحسب اللغة الحالية
NamaRep.name(name1, name2)

// الشيء نفسه، مع الرجوع إلى الكود إذا كان الاسمان فارغين
NamaRep.nameOrCode(code, name1, name2)
```

```groovy
// ترجمة قيمة — نص، أو نعم/لا، أو قيمة اختيار
NamaRep.translate(value)
NamaRep.translate(true)          // يعطي «نعم» أو Yes بحسب اللغة

// ترجمة تسمية حقل في سياق نوع سجل
NamaRep.title(entityType, fieldId)
NamaRep.translate(entityType, fieldId)

// ترجمة "prefix.value"
NamaRep.translate("prefix", "value")

// تقسيم ترجمة تحمل عنواناً وعنواناً فرعياً يفصلهما |
NamaRep.head("header|subtitle")  // "header"
NamaRep.sub("header|subtitle")   // "subtitle"
```

## التواريخ والأوقات

### أسماء الأيام

```groovy
NamaRep.dayName($F{dateField})     // باللغة الحالية
NamaRep.arDayName($F{dateField})   // بالعربية
NamaRep.enDayName($F{dateField})   // بالإنجليزية
NamaRep.dayName(dayNumber)         // ١ = الأحد، ٢ = الاثنين، ...
```

### التواريخ الهجرية

```groovy
NamaRep.toHijri($F{date})          // التاريخ الهجري الكامل نصاً
NamaRep.toHijriDate($F{date})      // كائن تاريخ هجري
NamaRep.hijriDay($F{date})         // اليوم، بحشو أصفار
NamaRep.hijriMonth($F{date})       // الشهر، بحشو أصفار
NamaRep.hijriYear($F{date})        // السنة
NamaRep.hijri_yyyyMMdd($F{date})   // yyyyMMdd

// ركّب تنسيقك الخاص
NamaRep.hijriDay($F{date})+"/"+NamaRep.hijriMonth($F{date})+"/"+NamaRep.hijriYear($F{date})
```

### الأوقات

```groovy
// من ساعات عشرية إلى وقت
NamaRep.decimalToTime(9.5)                    // "09:30"
NamaRep.decimalToTimeWithSeconds(9.5)         // "09:30:00"
NamaRep.decimalToTimeNullable(0)              // لا شيء، بدل "00:00"
NamaRep.decimalToTimeWithSecondsNullable(0)   // لا شيء، بدل "00:00:00"

// من مللي ثانية إلى وقت
NamaRep.timeToString(9120000)                 // "02:32"
NamaRep.timeToStringNullable(0)               // لا شيء، بدل "00:00"
```

ووجدت صيغ `Nullable` لتطبع المدة الفارغة خانةً فارغة بدل `00:00` المضلِّل.

### الفرق بين تاريخين

```groovy
NamaRep.dateDiffInMonth(date1, date2)
```

وللتفصيل بالسنوات والأشهر والأيام، احسب الفرق في متغير نوعُ إعادة تعيينه ونوعُ زيادته كلاهما `None`:

```groovy
java.time.Period.between(
  new java.util.Date($F{FromDate}.getTime()).toInstant()
    .atZone(java.time.ZoneId.systemDefault()).toLocalDate(),
  java.time.LocalDate.now()
)
```

ثم اطبعه:

```groovy
$V{period}.getYears()+" سنة "+$V{period}.getMonths()+" شهر "+$V{period}.getDays()+" يوم"
```

## الأرقام والعملات والمبالغ كتابةً

### الأرقام العربية-الهندية

```groovy
NamaRep.arNumbers("123")   // ١٢٣
NamaRep.arNumbers(value)
```

### مساعدات آمنة من القيم الفارغة

الخانة الفارغة في التقرير ليست صفراً، والحساب عليها يفشل. وهذه تحوّلها قبل أن تصل إلى تعبيرك:

```groovy
NamaRep.zeroIfNull(fieldOrVariable)   // الفارغ يصير 0
NamaRep.oneIfZero(fieldOrVariable)    // الصفر يصير 1 — قسمة آمنة
NamaRep.nullIfZero(fieldOrVariable)   // الصفر يصير فارغاً — خانات فارغة بدل 0.00
NamaRep.objectToDecimal(value)        // تحويل آمن إلى عدد عشري
```

### رمز الريال السعودي

```groovy
NamaRep.sar()
```

يُرجع الرمز صورةً، فيوضع في عنصر صورة لا في حقل نصي.

### تفقيط المبالغ

```groovy
NamaRep.tafqeet(currencyCode, amount)         // اللغة الحالية
NamaRep.tafqeetArabic(currencyCode, amount)
NamaRep.tafqeetEnglish(currencyCode, amount)
NamaRep.tafqeetFrench(currencyCode, amount)
```

وطريقة كتابة كل عملة — اسم الوحدة واسم الكسر — تأتي من الإعداد العام تحت `value.info.tafqeetInfo.currencyCode`.

### أسعار صرف المجموعة

التقرير الذي يعرض مبالغ من شركات بعملات مختلفة يحتاج سعرًا واحدًا يجمعها. تقرأ `findCurrencyExchangeRate` هذا السعر من جدول أسعار المجموعة الذي يحدّثه نما تلقائيًا من شاشة سعر الصرف (راجع [العملات وأسعار الصرف](/ar/platform/shared-master-files/currencies-and-exchange-rates)). اضرب مبلغًا بالعملة الثانية في الناتج لتحصل عليه بالعملة الأولى:

```groovy
NamaRep.findCurrencyExchangeRate("USD", "EGP")                     // سعر الإقفال اليوم
NamaRep.findCurrencyExchangeRate("USD", "EGP", $P{asOfDate})        // سعر الإقفال في تاريخ
NamaRep.findCurrencyExchangeRate("USD", "EGP", $F{valueDate}, "Average")  // متوسط سعر الشهر
```

إذا كان دفتر الشركة المصرية على 49.9 جنيهًا للدولار، أعاد الاستدعاء الأول نحو 0.02، فيصير مبلغ 49,900 جنيه 1,000 دولار. ويمكن تمرير العملة بكودها أو بمعرّفها. والمدخل الأخير `"Closing"` (إقفال) أو `"Average"` (متوسط)؛ وإذا لم يكن للتاريخ سعر متوسط أُعيد سعر الإقفال. وأسعار المجموعة وحدها هي المعتمدة (الأسعار المُدخلة والشركة متروكة عامة)، ويعيد الاستدعاء قيمة فارغة إذا لم يكن بين العملتين أي سعر، فاحمِ التعبير بـ `NamaRep.zeroIfNull` أو بشرط طباعة.

## الأسعار

`priceCalculator()` يجيب عن سؤال «كم يساوي هذا الصنف، لهذا العميل، في هذا التاريخ؟» بتشغيل استخراج السعر نفسه الذي تستعمله شاشات المبيعات. وهو الطريق لعرض سعر حالي على التقرير دون أن تكتب استعلاماً على قوائم الأسعار بنفسك.

```groovy
NamaRep.priceCalculator()
  .item($F{item})
  .uom($F{UOM})
  .qty($F{Quantity})
  .unitPriceOnly()
  .price()
```

::: tip خزّن الناتج في متغير
`.price()` يُرجع كائن سعر كاملاً، لا رقماً. عرّف متغيراً يحمله — فئته `java.lang.Object`، والحساب `No Calculation Function`، ونوع الزيادة `None`، ونوع إعادة التعيين `None` — ثم اقرأ المكوّنات التي تحتاجها من `$V{price}`.
:::

وإن كنت تريد الرقم وحده فأنهِ السلسلة بـ `.unitPrice()` بدل `.price()`، فيُرجع سعر الوحدة مجرداً.

### اختيار السعر الساري في تاريخ معيّن

كثيراً ما تغطي عدة قوائم أسعار الصنفَ نفسه في فترات متداخلة. و`.date(...)` هو ما يحسم أيّها يفوز — مرّر مدخل التاريخ في التقرير لتسعير السطر بتاريخ السؤال لا بتاريخ اليوم:

```groovy
// السعر الساري اليوم
NamaRep.priceCalculator().item(@{details.item.item.id}@).unitPriceOnly().unitPrice()

// السعر الساري في التاريخ الذي اختاره المستخدم
NamaRep.priceCalculator().item(@{details.item.item.id}@).date($P{FromDate}).unitPriceOnly().unitPrice()
```

::: warning مرّر الشركة، ولا تختبر القيمة الفارغة
أمران يوقعان الناس هنا.

إن لم تحدد الشركة استُعملت الشركة الافتراضية للمستخدم الذي يشغّل التقرير — وليست بالضرورة الشركة التي يتكلم عنها التقرير. فقل أي شركة تقصد: `.legalEntity($P{loginLegalEntityId})`. و`loginLegalEntityId` هو المدخل الجاهز الذي يحمل الشركة التي سجّل المستخدم دخوله بها؛ ولا وجود لمدخل اسمه `CompanyId`.

والحساب لا يعود فارغاً بمعنى `null` أبداً. فالصنف الذي يتعذّر تحديده يعطي كائن سعر فارغاً؛ والصنف الذي لا تطابقه قائمة أسعار يعطي كائن سعر حقيقياً سعرُه صفر. لذلك فتعبير يفحص `null` لا يتحقق أبداً — افحص الصفر أو الفراغ بدلاً منه.
:::

### البنّاء كاملاً

```groovy
NamaRep.priceCalculator()
  .item($F{itemIdOrCode})
  .customer($F{customerIdOrCode})
  .supplier($F{supplierIdOrCode})
  .uom($F{uomIdOrCode})
  .invoiceClassification($F{classificationIdOrCode})
  .ic($F{classificationIdOrCode})               // اختصار invoiceClassification
  .legalEntity($F{legalEntityIdOrCode})
  .le($F{legalEntityIdOrCode})                  // اختصار legalEntity
  .sector($F{sectorIdOrCode})
  .sc($F{sectorIdOrCode})                       // اختصار sector
  .branch($F{branchIdOrCode})
  .br($F{branchIdOrCode})                       // اختصار branch
  .department($F{departmentIdOrCode})
  .dep($F{departmentIdOrCode})                  // اختصار department
  .analysisSet($F{analysisSetIdOrCode})
  .anset($F{analysisSetIdOrCode})               // اختصار analysisSet
  .priceClassifier1($F{priceClassifier1IdOrCode})
  .pc1($F{priceClassifier1IdOrCode})            // اختصار priceClassifier1
  .priceClassifier2($F{priceClassifier2IdOrCode})
  .pc2($F{priceClassifier2IdOrCode})
  .priceClassifier3($F{priceClassifier3IdOrCode})
  .pc3($F{priceClassifier3IdOrCode})
  .priceClassifier4($F{priceClassifier4IdOrCode})
  .pc4($F{priceClassifier4IdOrCode})
  .priceClassifier5($F{priceClassifier5IdOrCode})
  .pc5($F{priceClassifier5IdOrCode})
  .revision($F{revision})
  .color($F{colorCode})
  .size($F{size})
  .qty($F{qty})
  .date($F{date})
  .unitPriceOnly()
  .price()   // أو ‎.unitPrice()‎ — الاستدعاء الختامي، ويكون آخراً دائماً
```

### قراءة كائن السعر

```groovy
// القيم الرئيسية
$V{price}.unitPrice.primitiveValue
$V{price}.netValue.primitiveValue
$V{price}.custom.primitiveValue
$V{price}.totalCashShare.primitiveValue
$V{price}.totalPaymentMethodShare.primitiveValue

// الخصومات — من 1 إلى 8
$V{price}.discount1.percentage.primitiveValue
$V{price}.discount1.value.primitiveValue
$V{price}.discount1.afterValue.primitiveValue
$V{price}.discount1.maxNormalPercent.primitiveValue

// خصم الرأسية
$V{price}.headerDicount.percentage.primitiveValue
$V{price}.headerDicount.value.primitiveValue
$V{price}.headerDicount.afterValue.primitiveValue

// الضرائب — من 1 إلى 4
$V{price}.tax1.percentage.primitiveValue
$V{price}.tax1.value.primitiveValue
$V{price}.tax1.afterValue.primitiveValue
$V{price}.tax1.maxNormalPercent.primitiveValue
```

## الروابط الراجعة إلى النظام

التقرير المطبوع طريق مسدود، أما التقرير على الشاشة فلا يلزم أن يكون كذلك. وهذه البنّاءات تحوّل الصف إلى رابط يفتح السجل، أو تقريراً آخر، أو قائمة مفلترة.

### سجل

```groovy
NamaRep.link(entityType, id)
NamaRep.link(serverUrl, entityType, id)

// صيغة البنّاء، حين تحتاج شاشة أو قائمة بعينها
NamaRep.link()
  .entityType($F{entityType})
  .id($F{id})
  .viewName("theViewName")
  .menuCode("abcMenu")
  .url(serverUrl)
  .toString()
```

### مرفق

```groovy
NamaRep.attachmentLink(id)
NamaRep.attachmentLink(serverUrl, attachmentId)
```

### تقرير آخر

```groovy
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "ReportCode")
  .p("p1 id").v(value expression)
  .p("p2 id").v(value expression)
  .copyParams()      // مرّر مدخلات التقرير الحالي المشتركة
  .toString()
```

و`.p(...)` يسمّي المدخل الهدف، وما بعده يزوّده بقيمته:

```groovy
.p("param").v($F{id}, $F{entity}, $F{code}, $F{name1}, $F{name2})
.p("param").v($F{id}, $F{entity}, $F{code})
.p("param").ref($F{entityType}, $F{id})
.p("param").refCode($F{entityType}, $F{code})
```

وأضف `.directLink()` لحذف عنوان الخادم، فيصير الرابط `#rpt:xxx` بدل عنوان كامل — وهو مفيد حين لا يُتبع الرابط إلا من داخل النظام.

و`.toNoAuthResultLink()` ينتج رابطاً يعمل بلا تسجيل دخول أصلاً، لإرساله إلى العملاء. انظر «مشاركة تقرير مع شخص بلا حساب» في [الدليل](/ar/platform/reports/reports-guide) لما يجب إعداده أولاً.

::: details ثلاثة روابط تقارير جاهزة
```groovy
// كشف حساب
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "Statement")
  .copyParams()
  .p("fromAccount").v($F{accountId}, $F{accountEntityType}, $F{accountCode})
  .p("toAccount").v($F{accountId}, "Account", $F{accountCode})
  .toString()

// ملخص أرباح المبيعات
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "SalesProfitSummary")
  .copyParams($P{REPORT_PARAMETERS_MAP})
  .p("SalesInvoice").ref("SalesInvoice", $F{SSIid})
  .p("cust").refCode("Customer", "Customer501")
  .p("fromDate").v("23-04-2014")
  .p("showDetails").v("true")
  .toString()

// كشف حساب ذمة
NamaRep.repLinkByCode($P{REPORT_PARAMETERS_MAP}, "SubsidiaryAccountStatement")
  .p("subsidiaryType").v($F{CustomerEntityType})
  .p("fromSubsidiary").v($F{customerId}, $F{CustomerEntityType}, $F{customerCode})
  .p("toSubsidiary").v($F{customerId}, $F{CustomerEntityType}, $F{customerCode})
  .p("accuontType").v("mainAccount")
  .toString()
```
:::

::: tip اختصار رابط طويل
```groovy
NamaRep.shortenURL(serverurl, signature, url)
```
وقسم `{shortenurl()}` في وثائق Tempo يشرح التوقيع.
:::

### قائمة مفلترة

`listView()` يفتح شاشة قائمة مفلترة سلفاً — وهو رابط «أرني الفواتير التي وراء هذا الإجمالي» الطبيعي.

```groovy
NamaRep.listView()
  .entityType("SalesInvoice")
  .criteria($P{REPORT_SCRIPTLET}.tempo("""
    customer.code,Equal,{customerCode},AND;
    valueDate,GreaterThanOrEqual,{fromDate},AND;
    """))
  .toString()
```

وأضف `.directLink()` لرابط بلا عنوان خادم.

| الاستدعاء | ما يضبطه |
|---|---|
| `.entityType(String)` | أي سجلات تُعرض، مثلاً `"SalesInvoice"` أو `"Customer"` |
| `.criteria(String)` | الفلتر، بتنسيق المعايير النصي |
| `.listViewName(String)` | عرض قائمة بعينه يُفتح |
| `.menuCode(String)` | القائمة التي تُفتح تحتها |
| `.orderBy(String)` | الحقل الذي يُرتَّب به |
| `.ascending(Boolean)` | اتجاه الترتيب — `true` تصاعدي |
| `.currentPage(Integer)` | الصفحة التي يبدأ عندها |
| `.pageSize(Integer)` | عدد الصفوف في الصفحة؛ و`-1` تعني كلها |
| `.showTree(Boolean)` | عرض القائمة شجرةً |
| `.extraCriteriaId(String)` | معايير محفوظة إضافية تُطبَّق كذلك |

#### حقن قيم الصف في الفلتر

نص المعايير ثابت، ولفّه بـ `tempo(...)` يجعله ديناميكياً. فداخل الأقواس المعقوفة تسمّي حقلاً أو مدخلاً أو متغيراً فتحل قيمته الحالية محله، بلا حاجة إلى `$F{}` أو `$P{}` أو `$V{}`:

```groovy
$P{REPORT_SCRIPTLET}.tempo("""
  field,Operator,{value},AND;
  """)
```

فيستطيع تقرير العملاء أن يحمل رابطاً إلى فواتير العميل عن الفترة التي شُغّل عنها التقرير:

```groovy
NamaRep.listView()
  .entityType("SalesInvoice")
  .criteria($P{REPORT_SCRIPTLET}.tempo("""
    customer.code,Equal,{customerCode},AND;
    valueDate,GreaterThanOrEqual,{fromDate},AND;
    valueDate,LessThanOrEqual,{toDate},AND;
    """))
  .listViewName("SalesInvoicesForCustomer")
  .orderBy("valueDate")
  .ascending(false)
  .toString()
```

#### تنسيق المعايير

يتبع الفلتر [تنسيق معايير النص](../automation-and-rules/text-criteria-guide.md):

```
fieldID,operator,value,logic;
```

**العوامل:** `Equal`، `NotEqual`، `GreaterThan`، `GreaterThanOrEqual`، `LessThan`، `LessThanOrEqual`، `StartsWith`، `NotStartsWith`، `EndsWith`، `NotEndWith`، `Contains`، `NotContain`، `In`، `NotIn`

**روابط المنطق:** `AND`، `OR` — **التواريخ:** `dd-MM-yyyy` — **المراجع:** `id:entityType:code` والكود اختياري

::: tip دع النظام يكتب المعايير لك
ابنِ الشروط بصرياً في شاشة [تعريف المعايير](/ar/platform/automation-and-rules/criteria-definitions) (Criteria Definition)، ثم استخدم **Convert to Text**. والناتج قالب يعمل تلصقه ثم تجعله ديناميكياً بـ `tempo(...)`.
:::

## إنشاء السجلات من التقرير

يستطيع التقرير أن يحمل زراً يفتح سجلاً جديداً مملوءاً سلفاً — سند قبض مقابل الفاتورة التي على السطر، أو أمر شراء مبنياً على قائمة النواقص التي تُطبع. والرابط لا يحفظ شيئاً؛ إنما يفتح شاشة السجل الجديد وحقولها ممتلئة، ويعتمده المستخدم بنفسه.

::: tip لست مضطراً إلى تقرير لتفعل هذا
`NamaRep.creator(...)` هي صياغة **منشئ Tempo** من جهة التقارير، والمنشئ نفسه ليس خاصية من خواص
التقارير. فالشيء ذاته مكتوباً قالب Tempo — `{creator("ReceiptVoucher")}…{endcreator}` — يوضع مباشرة في
عمود **قالب الوصلة** في تعديل الشاشات فيصير زراً على الشاشة، بلا تقرير أصلاً. فإن كان مرادك زراً في شاشة
تعديل لا رابطاً في مطبوعة، فابدأ من
[إضافة أزرار إلى الشاشة](/ar/platform/screen-modifier/screen-modifier-action-buttons.md).
:::

```groovy
NamaRep.newWithFields("ReceiptVoucher")
  .f("term").value("POTermCode")
  .f("book").value("POBook1")
  .f("remarks").v("Auto Created")
  .f("fromDoc#type").v("SalesInvoice")
  .f("fromDoc#code").v($F{code})
  .menuCode("NormalReceiptMenu")
  .viewName("NormalReceipts")
  .toString()

// الشيء نفسه، مكتوباً بالكامل
NamaRep.creator("ReceiptVoucher")
  .field("supplier").value(supplierId)
  .toString()
```

![رابط إنشاء السجل في Jasper Studio: حقل نصّي فئة تعبيره java.lang.Object وتعبيره سلسلة إنشاء من NamaRep](../images/creator-link-sample.png)

### حقول المرجع العام تحتاج جزأين

الحقول مثل `ref1` إلى `ref5`، وكل حقل يمكن أن يشير إلى أكثر من نوع سجل، تحتاج أن تخبرها بالنوع كما تخبرها بالقيمة. فخاطب الجزأين على حدة بلاحقة على معرّف الحقل:

```groovy
  .f("ref2#type").v("Warehouse")
  .f("ref2#code").v($F{warehouseCode})
```

و`#entitytype` مقبولة مرادفاً لـ `#type`، و`#value` مرادفاً لـ `#code`.

ويجوز حذف `#type` **حين يسمح الحقل بنوع سجل واحد لا غير** — فعندها تختار الشاشة النوع الوحيد المسموح سلفاً وتخفي منتقي النوع، فلا يبقى ما تضبطه. أما الحقل الذي يسمح بنوعين فأكثر فيتجاهل بصمت قيمةً بلا نوع بجانبها، ويصل الحقل فارغاً.

### بناء سجل بأسطر

للتقرير الذي يجب أن تسهم حزمة تفاصيله بسطر عن كل صف:

1. عرّف متغيراً — سمّه `creatorLink` — تعبيرُ قيمته الأولية يبدأ السجل ويقف عند `.root()`:

```groovy
NamaRep.newWithFields("PurchaseOrder")
  .field("term").value("P.Order.Term")
  .root()
```

2. وفي حزمة التفاصيل، أضف سطراً لكل صف:

```groovy
$V{creatorLink}
  .field("details.item.itemCode").value($F{code})
  .field("details.quantity").value($F{qty})
  .row($V{REPORT_COUNT})
```

3. وحيث ينبغي أن يظهر الرابط — في الملخّص عادةً — حوّل البنّاء المتراكم إلى رابط:

```groovy
$V{creatorLink}.toString()
```

## الموافقات

التقارير هي وسيلة إنجاز كثير من الموافقات فعلياً: يستقبل المعتمِد المستند بالبريد وينقر رابطاً فيه.

```groovy
// التصرف في المستند كله
NamaRep.approveAllLink($P{REPORT_PARAMETERS_MAP})
NamaRep.rejectAllLink($P{REPORT_PARAMETERS_MAP})
NamaRep.returnAllLink($P{REPORT_PARAMETERS_MAP})
NamaRep.returnAllToPreviousStepLink($P{REPORT_PARAMETERS_MAP})

// أو مرّر القرار: "Approve" أو "Reject" أو "Return"
NamaRep.approveAllLink($P{REPORT_PARAMETERS_MAP}, decision)
```

وللمستندات التي تُعتمد سطراً سطراً:

```groovy
NamaRep.approveLink($P{REPORT_PARAMETERS_MAP}, $F{lineNumber})
NamaRep.rejectLink($P{REPORT_PARAMETERS_MAP}, $F{lineNumber})
NamaRep.returnLink($P{REPORT_PARAMETERS_MAP}, $F{lineNumber})
NamaRep.returnToPreviousStepLink($P{REPORT_PARAMETERS_MAP}, $F{lineNumber})

// مع سبب
NamaRep.approveLink($P{REPORT_PARAMETERS_MAP}, $F{lineNumber}, reasonCodeOrId)
NamaRep.rejectLink($P{REPORT_PARAMETERS_MAP}, $F{lineNumber}, reasonCodeOrId)

// هل هذا السطر مما يُسأل عنه هذا المعتمِد؟
NamaRep.isConcernedLine($P{REPORT_PARAMETERS_MAP}, $F{lineNumber})
```

استخدم `isConcernedLine` في شرط طباعة حتى لا تظهر الأزرار إلا بجانب الأسطر التي يستطيع القارئ التصرف فيها.

```groovy
// افتح حوار الموافقة في المتصفح بدل التصرف مباشرةً
NamaRep.approveFromJS(entityType, entityId, nextStepName,
                      concernedLines, nextStepSeq, summary)
```

## أرصدة إجازات الموظفين

أرصدة الإجازات محسوبة لا مخزّنة، ولذلك لا يستطيع التقرير أن يختارها ببساطة من عمود.

```groovy
// أنواع الإجازات الثلاثة القياسية
NamaRep.getVacation1RemainderBalance(empIdOrCode)
NamaRep.getVacation2RemainderBalance(empIdOrCode)
NamaRep.getVacation3RemainderBalance(empIdOrCode)

// أي نوع إجازة، وبتاريخ محدد اختيارياً
NamaRep.getVacationRemainderBalance(empCodeOrId, vacationTypeIdOrCode)
NamaRep.getVacationRemainderBalance(empCodeOrId, vacationTypeIdOrCode, atDate)

// موزعاً على السنوات
NamaRep.getRemainderBalancePerYears(employeeId, atDate, yearsCount)
```

### المستحق والمستهلك والمتبقي معاً

تُرجع `getVacationBalance` كائناً واحداً يحمل كل أرقام حساب الرصيد، كل رقم باسمه الخاص. تُقرأ الأرقام هكذا: `$V{balance}.assigned` و`$V{balance}.consumed` وهكذا.

```groovy
// رصيد موظف واحد ونوع إجازة واحد
NamaRep.getVacationBalance(employeeId, vacationType)
NamaRep.getVacationBalance(employeeId, vacationType, atDate)

// بتمرير مدخلات التقرير كأول وسيط تُحفظ النتيجة لبقية التشغيل،
// فيكلف طلب ثلاثة أرقام عملية حساب واحدة
NamaRep.getVacationBalance($P{REPORT_PARAMETERS_MAP}, employeeId, vacationType, atDate)
```

| الحقل | ما الذي يحمله |
|---|---|
| `assigned` | الأيام المستحقة للموظف عن السنة الحالية |
| `consumed` | الأيام المستهلكة فعلاً |
| `remainder` | الأيام المتبقية في التاريخ المطلوب |
| `yearRemainder` | الأيام المتبقية بعد احتساب استحقاق السنة كاملةً، لا الجزء المستحق حتى التاريخ المطلوب فقط. وهو الرقم نفسه الموجود في `remainder` عند تفعيل خيار «احتساب رصيد الاجازات بناء على تاريخ مباشرة العمل» في إعدادات الموارد البشرية |
| `balance` | الرصيد المستحق الذي بدأ منه الحساب، قبل تطبيق الأرصدة المضافة والأيام المستهلكة |
| `assignedTillEndOfYear` | إجمالي الأيام التي ستكون مستحقة للموظف بنهاية السنة — رصيد نهاية السنة مضافاً إليه الأيام المستهلكة |
| `remainderTillEndOfYear` | الأيام التي ستظل متبقية في نهاية السنة |

والترتيب المعتاد متغيّر واحد للرصيد وحقل نصي لكل رقم:

```groovy
// متغيّر باسم balance من النوع java.lang.Object
NamaRep.getVacationBalance($P{REPORT_PARAMETERS_MAP}, $F{EmployeeCode}, $F{VacationTypeCode}, $P{atDate})

// ثم في ثلاثة حقول نصية
$V{balance}.assigned
$V{balance}.consumed
$V{balance}.remainder
```

وتعتمد هذه الصيغة المختصرة على أن تكون لغة التقرير Groovy، وهو الإعداد المعتاد. أما في تقرير مضبوط على Java فاكتب `$V{balance}.getAssigned()` بدلاً منها.

::: tip
`getVacationAssignedConsumedRemainder` هي الصورة الأقدم من الاستدعاء نفسه. تُرجع الأرقام ذاتها مضغوطة في أزواج متداخلة — المستحق، ثم زوج من المستهلك والمتبقي، ثم متبقي السنة — ولا بد من فكها بـ `.x` و`.y.x` و`.y.y` و`.z`. وهي ما زالت تعمل فتستمر التقارير المكتوبة بها، لكن استخدم `getVacationBalance` في كل ما هو جديد.
:::

## نقاط المكافأة

```groovy
// ما هو متاح لعميل أو مورد
NamaRep.availableRewardPoints("Customer", $F{customerId})
NamaRep.availableRewardAmount("Customer", $F{customerId})

// ما كسبه مستند بعينه
NamaRep.earnedPoints("SalesInvoice", $F{invoiceId})
```

::: tip
`availableRewardPoints` و`availableRewardAmount` تعملان مع أي ملف رئيسي. أما `earnedPoints` فتعمل مع المستندات فقط — ومع الملف الرئيسي تعود فارغة. وثلاثتها تقبل معرّفاً أو كوداً وسيطاً ثانياً.
:::

## الاستعلام من قاعدة البيانات مباشرةً

أحياناً تريد قيمة واحدة لا يصل إليها استعلام التقرير نفسه.

```groovy
NamaRep.runSQLQuery(sql, paramName, paramValue, paramName, paramValue)

NamaRep.executeQuery(
  "SELECT cast(w.name1 collate Arabic_CI_AI_KS_WS as varchar(250))
   FROM warehouse w WHERE w.id = :wid",
  "wid", $F{wid}
)

// تسطيح عدة صفوف وأعمدة في نص واحد
NamaRep.formatQueryResult(results, "\n", ",")   // فاصل الصفوف، فاصل الأعمدة
```

::: warning استعلام لكل صف
تعبير كهذا يُنفَّذ مرة عن كل صف يطبعه التقرير. وفي تقرير من مئة صف يعني ذلك مئة رحلة إلى قاعدة البيانات. فحيث تستطيع أن تأتي بالقيمة من ربط داخل استعلام التقرير نفسه، ضعها هناك.
:::

### قراءة إعداد وحدة

```groovy
NamaRep.getValueFromModuleConfig(moduleId, fieldId)

NamaRep.getValueFromModuleConfig("basic", "value.info.useCurrentUserAsSalesMan")
```

ومعرّفات الوحدات: `accounting`، `basic`، `supplychain`، `fixedassets`، `humanresource`، `dms`، `project`، `ecpa`، `manufacturing`، `srvcenter`، `crm`، `contracting`، `travel`، `realestate`، `housing`، `auditing`، `education`، `namapos`، `mc`.

## قيود الأمان

```groovy
NamaRep.security()
  .fieldEntityType("Account")
  .tableAlias("acc")
  .capabilities("firstAuthor", "viewCapability", "usageCapability",
                "updateCapability", "legalEntity", "branch",
                "sector", "department", "analysisSet")
```

يُرجع جزءاً منطقياً من SQL خاصاً بالمستخدم الحالي، يُدرَج في جملة `WHERE` بـ `$P!{}`. أما الوصفة الكاملة، بما فيها المدخل المخفي الذي يسكنه وكيفية تغطية أكثر من جدول، ففي قسم «تحديد ما يراه كل مستخدم» من [الدليل](/ar/platform/reports/reports-guide).

```groovy
// هل يُسمح لهذا المستخدم برؤية موضوع هذا المدخل؟
NamaRep.canDisplay($P{param})
```

استخدمه في `printWhenExpression` لإخفاء العمود بدل عرضه فارغاً.

## النصوص والأرقام التسلسلية ورموز QR

### من HTML إلى نص عادي

```groovy
NamaRep.htmlToText(htmlContent)
```

حقول النص المنسّق تُخزَّن بصيغة HTML. وطباعتها كما هي تُظهر الوسوم، وهذه الدالة تنزعها.

### الأرقام التسلسلية

تُخزَّن الأرقام التسلسلية مضغوطةً في نطاقات. وسّعها لتطبع واحداً في كل سطر، أو اضغط قائمة إلى نطاقات لتبقى الخانة قصيرة:

```groovy
NamaRep.expandSerials(serials)                    // واحد في كل سطر
NamaRep.expandSerials(serials, separator)
NamaRep.unzipSerials(serials)                     // كقائمة
NamaRep.unzipSerialsWithNewLines(serials)
NamaRep.unzipSerialsWithComma(serials)
NamaRep.unzipSerialsWithSeparator(serials, ";")

NamaRep.zipSerialsRange(serials)                  // إعادة الضغط إلى نطاقات
```

### رموز QR لزاتكا

للفواتير التي يجب أن تحمل رمز QR الخاص بهيئة الزكاة والضريبة والجمارك:

```groovy
NamaRep.genZATCAQR(sellerName, vatNumber, timestamp,
                   invoiceAmount, vatAmount)

// حين يختلف تاريخ القيمة عن تاريخ الإنشاء
NamaRep.genZATCAQRWithCreationDate(sellerName, vatNumber,
                                   valueDate, creationDate,
                                   invoiceAmount, vatAmount)

// من المستند مباشرةً، فيملأ الحقول نيابةً عنك
NamaRep.genZatcaQrCodeFromEntity(entityType, idOrCode)
NamaRep.zatcaHashedInvoice(entityType, id)
```

### رموز QR للجوال

رمز QR يمسحه تطبيق نما للجوال لإنشاء سجل أو تحديثه — تسليم يُعتمد على عتبة الباب، أو مسح حضور في مقر عميل.

```groovy
NamaRep.mobileQr()
    .code("IntegratorCode")
    .toString()

// حاملاً قيماً إلى السجل الذي ينشئه
NamaRep.mobileQr()
    .code("CustomerAttendance")
    .addParam("customer", $F{customerCode})
    .addParam("date", $F{valueDate})
    .addParam("amount", $F{totalAmount})
    .toString()

// مشفّراً، لكل ما هو سرّي ويُطبع على ورق
NamaRep.mobileQr()
    .code("SecureIntegrator")
    .addParam("sensitive", $F{confidentialData})
    .encrypted()
    .toString()
```

ويحمل الرمز كودَ الـ integrator ومدخلاته بصيغة JSON، ويفك التطبيق تشفير المشفّر منها تلقائياً. وتصل المدخلات إلى مسار الكيان بصيغة `$map.paramName`، ولا بد أن يكون الـ integrator نفسه موجوداً سجلاً في Mobile QR Integrator قبل أن يفعل شيء من هذا شيئاً.

## مسار المراجعة

يمكن طباعة سجل الإصدارات داخل التقرير، وهو ما تحتاجه مراجعات الامتثال وملفات اعتماد التغيير.

```groovy
NamaRep.audit(entityType, id, versionNumber, actionType, language, outputFormat)
```

| الوسيط | ما تمرّره |
|---|---|
| `entityType` | نوع السجل، مثلاً `"SalesInvoice"` أو `"Customer"` |
| `id` | معرّف السجل |
| `versionNumber` | الإصدار الذي تجري المقارنة معه — الحالي عادةً |
| `actionType` | `"Update"` في العادة |
| `language` | `"arabic"` أو `"english"` |
| `outputFormat` | `"html"` أو `"text"` |

```groovy
NamaRep.audit($F{entityType}, $F{id}, $F{versionNumber}, "Update", "arabic", "html")
NamaRep.audit("Customer", $F{customerId}, $F{currentVersion}, "Update", "english", "text")
```

وما يعود يغطي تغييرات حقول الرأسية بقيمها القديمة والجديدة، وتغييرات الأسطر — مضافة ومحذوفة ومعدَّلة — ومن غيّر ماذا ومتى. و`"html"` ينتج جدولاً منسّقاً يناسب التقرير أو البريد؛ و`"text"` ينتج نصاً عادياً بمسافات بادئة يناسب رسالة قصيرة أو رسالة نصية بسيطة.

## تجميع عدة حقول في مفتاح واحد

```groovy
NamaRep.groupExpression(field1, field2, field3)
```

يدمج عدة حقول في قيمة واحدة، لمجموعة تقرير يجب أن تنكسر على تركيبة لا على عمود واحد.

## مدخلات النظام الجاهزة

يملأ النظام المدخلات التالية وقت التشغيل — دون استعلام ودون إعداد — لكن يبقى على التقرير أن يعرّف كل مدخل يستخدمه. أضفه كمدخل بالاسم نفسه حرفاً بحرف كما هو مذكور في القائمة وبالنوع الصحيح — و `java.lang.Object` يصلح لها جميعاً، والتقارير الجاهزة تستعمل `java.lang.String` كذلك للنصية منها — ثم أشر إليه بـ `$P{name}`: `$P{loginLegalEntityName1}` لاسم الشركة في رأس الصفحة، أو `$P{loginLegalEntityId}` لتسعير سطر بحسب الشركة التي سجّل المستخدم دخوله بها. ويتعرّف النظام على هذه الأسماء ولا يطالب المستخدم بإدخال قيمها، فتعريف مدخل نظام لا يظهر شيئاً على الشاشة — لكن أي تقرير يشير إلى مدخل لم يعرّفه يفشل في الترجمة (compile).

::: details القائمة الكاملة لمدخلات النظام
### المستخدم وتسجيل الدخول

- `loginLanguage` — اللغة التي يُشغَّل بها التقرير
- `originalLoginLanguage` — اللغة التي سجّل بها المستخدم دخوله
- `loginUserId`، `loginUserCode`، `loginUserName1`، `loginUserName2`
- `loginUserTreatAsAuthorIds` — المستخدمون الذين ينوب عنهم هذا المستخدم
- `loginEmployeeId`

### الهيكل التنظيمي

- `loginLegalEntityId`، `loginLegalEntityCode`، `loginLegalEntityName1`، `loginLegalEntityName2`
- `loginSectorId`، `loginSectorCode`، `loginSectorName1`، `loginSectorName2`
- `loginBranchId`، `loginBranchCode`، `loginBranchName1`، `loginBranchName2`
- `loginDepartmentId`، `loginDepartmentCode`، `loginDepartmentName1`، `loginDepartmentName2`
- `loginAnalysisSetId`، `loginAnalysisSetCode`، `loginAnalysisSetName1`، `loginAnalysisSetName2`

### معرّفات المنظمة العامة

- `publicLegalEntityId`، `publicSectorId`، `publicBranchId`
- `publicDepartmentId`، `publicAnalysisSetId`

### الشعارات والعلامة التجارية

- `loginLegalEntityLogo` — الشعار الرئيسي، صورةً
- `loginLegalEntityLogo2` إلى `loginLegalEntityLogo5` — شعارات إضافية
- `reportsFooterNote1`، `reportsFooterNote2` — سطرا التذييل من الإعداد العام

### سياق التقرير

- `formEntityType` — نوع السجل الذي يخصه النموذج، ويفيد في ترجمة التسميات
- `reportCode`، `reportId`، `reportName1`، `reportName2`
- `namaReportInstance` — التقرير الجاري نفسه
- `runId` — معرّف فريد لهذا التشغيل

### العناوين

- `guiServerURL`، `externalServerURL`، `currentGUIURL`

### الموافقات

- `concernedLines` — الأسطر التي يُسأل عنها هذا المعتمِد
- `candidateEmployeeId`، `candidateEmployeeCode`، `candidateEmployeeName1`، `candidateEmployeeName2`
- `approvedRecordId`، `approvedRecordType`، `approvedRecordCode`
- `approvalSecret`، `approvalStepSeq`

### الصلاحيات

- `allowedCapabilities`، `allowedEntities`، `allowedDocuments`، `allowedFiles`
- `notAllowedEntities`، `notAllowedDocuments`، `notAllowedFiles`
- `accessibleLegalEntityIds`، `accessibleSectorIds`، `accessibleBranchIds`
- `accessibleDepartmentIds`، `accessibleAnalysisSetIds`
- `legalEntityNotUsedInSecurity`، `sectorNotUsedInSecurity`، `branchNotUsedInSecurity`، `departmentNotUsedInSecurity`، `analysisSetNotUsedInSecurity`

### ما بقي

- `posShiftCode` — وردية نقطة البيع التي يخصها الإيصال
- `currentReplicationSiteId`، `currentReplicationSiteCode`، `currentReplicationSiteName1`، `currentReplicationSiteName2`
:::

::: warning لا وجود لمدخل اسمه `currentUser`
`$currentUser()` **دالة قيمة افتراضية** لمدخل، لا مدخلَ نظام — فـ `$P{currentUser}` غير موجود، والتقرير الذي يشير إليه يفشل في التصريف. وللمستخدم الذي يشغّل التقرير استخدم `$P{loginUserId}` أو `$P{loginUserCode}` أو `$P{loginUserName1}` / `$P{loginUserName2}`. ودوال القيم الافتراضية مسرودة في [الدليل](/ar/platform/reports/reports-guide).
:::
