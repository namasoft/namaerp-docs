---
entities: [CriteriaDefinition]
---
# معايير من المحلل النصي (دليل معايير النص)

يوفر نظام نما ERP آلية مرنة للتصفية النصية تتيح للمستخدمين تعريف معايير الفلترة باستخدام صيغة بسيطة ومنظمة.

يتكوّن كل شرط فلترة في نظام نما ERP من المكونات التالية:

* **Field ID**: الخاصية (الحقل) المراد تطبيق الفلتر عليها.
* **Operator**: أحد الخيارات التالية:

    * `Equal`, `NotEqual`
    * `GreaterThan`, `GreaterThanOrEqual`
    * `LessThan`, `LessThanOrEqual`
    * `StartsWith`, `NotStartsWith`
    * `EndsWith`, `NotEndWith`
    * `Contains`, `NotContain`
    * `In`, `NotIn` (انظر [قيم متعددة مع In/NotIn](#qym-mtaadd-maa-InNotIn) أدناه)
    * `WithinPeriod`, `OutsidePeriod` (لحقول التاريخ / التاريخ والوقت، انظر [معاملات الفترة (WithinPeriod/OutsidePeriod)](#maamlt-lftr-WithinPeriodOutsidePeriod) أدناه)
    * `OpenBracket`, `CloseBracket` (تُستخدم لتجميع التعبيرات، ولا تتطلب Field ID أو قيمة)
* **Compared Value**: القيمة المراد المقارنة بها.
* **Logical Relationship**: الرابط المنطقي للشرط التالي (`AND` أو `OR`).

### المعاملات الشرطية (لاحقة OrEmpty)

يمكن إضافة اللاحقة `OrEmpty` لأي معامل لجعل الشرط اختياريًا عندما لا تُوفَّر قيمة. إذا كانت القيمة فارغة، يُتجاهل الشرط بالكامل.

على سبيل المثال:
* `EqualOrEmpty` - يطبّق Equal فقط إذا كانت القيمة موجودة
* `ContainsOrEmpty` - يطبّق Contains فقط إذا كانت القيمة موجودة
* `GreaterThanOrEqualOrEmpty` - يطبّق GreaterThanOrEqual فقط إذا كانت القيمة موجودة

هذا مفيد لبناء فلاتر ديناميكية قد تحتوي بعض المعايير على قيم أو لا:
```
code,StartsWithOrEmpty,{userInput},AND;
```
إذا كان `{userInput}` فارغًا، يُتجاهل هذا الشرط كليًا.

### أوامر خاصة

**distinct-values**: أضف هذا في سطر منفصل للحصول على سجلات فريدة فقط:
```
distinct-values
code,StartsWith,01,AND;
```

### قيم متعددة مع In/NotIn

تتيح معاملات `In` و`NotIn` مطابقة حقل مع قيم متعددة. لتحديد قيم متعددة في صيغة معايير النص، افصل بينها بالمحدد الخاص `@A=@X`.

**الصيغة:**
```
fieldID,In,value1@A=@Xvalue2@A=@Xvalue3,AND;
```

**أمثلة:**

تصفية العناصر التي حالتها "Active" أو "Pending" أو "Review":
```
status,In,Active@A=@XPending@A=@XReview,AND;
```

تصفية السجلات التي رمز الفئة فيها ليس "CAT01" أو "CAT02":
```
category.code,NotIn,CAT01@A=@XCAT02,AND;
```

التصفية بمعرّفات مرجعية متعددة:
```
warehouse.id,In,id1@A=@Xid2@A=@Xid3,AND;
```

::: warning
يجب استخدام المحدد `@A=@X` بالضبط كما هو موضح (حساس لحالة الأحرف). لا تضف مسافات حول المحدد.
:::

![تعريف معايير؛ يحوّل زر التحويل إلى نص الشجرة إلى معايير نصية](../images/criteria-definitions/criteria-definition-screen-ar.png)

## معاملات الفترة (WithinPeriod/OutsidePeriod)

ينطبق المعاملان `WithinPeriod` و`OutsidePeriod` على **حقول التاريخ** و**حقول التاريخ والوقت** فقط. يتحققان مما إذا كان تاريخ الحقل يقع داخل الفترة (`WithinPeriod`) أو خارجها (`OutsidePeriod`). بالنسبة لحقول التاريخ والوقت، يُؤخذ جزء التاريخ فقط في الاعتبار.

القيمة ليست تاريخًا مفردًا، بل فترة، تُعبَّر عنها بإحدى طريقتين:

### 1. قيمة معرّفة مسبقًا (Preset)

كلمة مفتاحية تُحسب نسبةً إلى التاريخ الحالي. القيم المسموح بها هي:

| القيمة | الوصف |
|--------|-------------|
| `Today` | اليوم الحالي |
| `Yesterday` | اليوم السابق |
| `ThisWeek` | الأسبوع الحالي (من الأحد إلى السبت) |
| `PreviousWeek` | الأسبوع السابق (من الأحد إلى السبت) |
| `ThisMonth` | الشهر الميلادي الحالي |
| `PreviousMonth` | الشهر الميلادي السابق |
| `ThisQuarter` | الربع الميلادي الحالي |
| `PreviousQuarter` | الربع الميلادي السابق |
| `ThisYear` | السنة الميلادية الحالية |
| `PreviousYear` | السنة الميلادية السابقة |
| `Last7` | آخر 7 أيام (اليوم والأيام الستة السابقة له) |
| `Last30` | آخر 30 يومًا (اليوم والـ 29 يومًا السابقة له) |
| `Last90` | آخر 90 يومًا (اليوم والـ 89 يومًا السابقة له) |
| `Last365` | آخر 365 يومًا (اليوم والـ 364 يومًا السابقة له) |

**أمثلة:**

تصفية السجلات التي يقع فيها `date1` ضمن الشهر الحالي:
```
date1,WithinPeriod,ThisMonth,AND;
```

تصفية السجلات التي يقع فيها `creationDate` خارج آخر 7 أيام:
```
creationDate,OutsidePeriod,Last7,AND;
```

### 2. نطاق تاريخ صريح

تاريخ `from` وتاريخ `to` صريحان مفصولان بـ `@`. يستخدم كلا التاريخين الصيغة `yyyy-MM-dd`:

```
fieldID,WithinPeriod,<from>@<to>,AND;
```

**مثال** — السجلات التي يقع فيها `date1` ضمن النصف الأول من عام 2025:
```
date1,WithinPeriod,2025-01-01@2025-06-30,AND;
```

::: warning
مع `WithinPeriod` / `OutsidePeriod` يجب أن تكون القيمة إمّا إحدى القيم المعرّفة مسبقًا المذكورة أعلاه، أو نطاق تاريخ صريح بالصيغة `yyyy-MM-dd@yyyy-MM-dd`. صيغة التاريخ المفرد (`dd-MM-yyyy`) المستخدمة مع المعاملات الأخرى لا تنطبق هنا.
:::

## الصيغة

يُمثَّل كل شرط فلترة كسطر نصي يتكون من أربعة أجزاء مفصولة بفاصلات:

```
fieldID,operator,value,logic;
```

يمكن فصل الشروط المتعددة بفاصلات منقوطة (`;`) أو أسطر جديدة. كلا الصيغتين صالحتان:

**الصيغة في سطر واحد:**
```
code,StartsWith,01,AND;name1,Contains,abc,AND;
```

**الصيغة متعددة الأسطر:**
```
code,StartsWith,01,AND
name1,Contains,abc,AND
```

### القيم الافتراضية

* إذا حُذف **operator**، يكون الافتراضي `Equal`
* إذا حُذف **logical relationship**، يكون الافتراضي `AND`

وهذا يعني أن أبسط صيغة للفلتر هي:
```
fieldID,,value
```
وهي مكافئة لـ `fieldID,Equal,value,AND`

### صيَغ حقول خاصة

* **حقول التاريخ**: يجب أن تكون الصيغة `dd-MM-yyyy`
* **حقول التاريخ والوقت**: يجب أن تكون الصيغة `yyyy-MM-ddTHH:mm:ss.SSS` (يمكن أن تكون الميلي ثانية `000`)
* **حقول المرجع**: يُكتب المرجع كسلسلة مفصولة بنقطتين:

  ```
  <id>:<entityType>:<code>
  ```

    * جزء `code` اختياري.
    * يمكن بديلًا الإشارة إلى أجزاء محددة باستخدام `.id` أو `.code` للوضوح والبساطة.

## مثال

```csv
code,StartsWith,01,AND;
name1,Contains,abc,AND;
date1,Equal,06-07-2025,AND;
creationDate,GreaterThanOrEqual,2025-07-06T13:05:00.000,AND;
n1,Equal,10,AND;
section,Equal,ffff0001-79e2-11f2-8800-0000ff79c2dd:ItemSection:00,AND;
```

يمكن أيضًا التعبير عن السطر الأخير بصيغتين بديلتين:

```csv
section.id,Equal,ffff0001-79e2-11f2-8800-0000ff79c2dd,AND;
section.code,Equal,00,AND;
```

## القيم الديناميكية

بالإضافة إلى القيم الثابتة، يدعم نظام نما ERP قيمًا ديناميكية تُحسب في وقت التشغيل. وهي مفيدة بشكل خاص للفلاتر المستندة إلى التاريخ والمعايير الخاصة بالمستخدم.

### القيم الديناميكية للتاريخ

يمكن استخدام القيم الديناميكية التالية بدلًا من التواريخ الثابتة:

| القيمة | الوصف |
|-------|-------------|
| `$today()` | التاريخ الحالي |
| `$now()` | التاريخ والوقت الحاليان |
| `$monthStart()` | أول يوم في الشهر الحالي |
| `$monthEnd()` | آخر يوم في الشهر الحالي |
| `$previousMonthStart()` | أول يوم في الشهر الماضي |
| `$previousMonthEnd()` | آخر يوم في الشهر الماضي |
| `$nextMonthStart()` | أول يوم في الشهر القادم |
| `$nextMonthEnd()` | آخر يوم في الشهر القادم |
| `$yearStart()` | أول يوم في السنة الحالية |
| `$yearEnd()` | آخر يوم في السنة الحالية |
| `$previousYearStart()` | أول يوم في السنة الماضية |
| `$previousYearEnd()` | آخر يوم في السنة الماضية |
| `$nextYearStart()` | أول يوم في السنة القادمة |
| `$nextYearEnd()` | آخر يوم في السنة القادمة |
| `$quarterStart()` | أول يوم في الربع الحالي |
| `$quarterEnd()` | آخر يوم في الربع الحالي |
| `$halveStart()` | أول يوم في النصف الحالي من السنة (6 أشهر) |
| `$halveEnd()` | آخر يوم في النصف الحالي من السنة |
| `$thirdStart()` | أول يوم في الثلث الحالي (4 أشهر) |
| `$thirdEnd()` | آخر يوم في الثلث الحالي |

### القيم النسبية للتاريخ

يمكنك أيضًا حساب تواريخ نسبة إلى اليوم:

| القيمة | الوصف |
|-------|-------------|
| `$todayPlusDays(N)` | اليوم زائد N أيام |
| `$todayMinusDays(N)` | اليوم ناقص N أيام |
| `$todayPlusWeeks(N)` | اليوم زائد N أسابيع |
| `$todayMinusWeeks(N)` | اليوم ناقص N أسابيع |
| `$todayPlusMonths(N)` | اليوم زائد N أشهر |
| `$todayMinusMonths(N)` | اليوم ناقص N أشهر |
| `$todayPlusYears(N)` | اليوم زائد N سنوات |
| `$todayMinusYears(N)` | اليوم ناقص N سنوات |

### قيم سياق المستخدم

هذه الرموز تُستبدل بقيم من الجلسة التي تُقيَّم لها المعايير. وهي — بخلاف قيم التواريخ أعلاه — تُكتب
بين قوسين معقوفين لا بعلامة `$`:

| القيمة | الوصف |
|-------|-------------|
| `{loginUserId}` | معرّف المستخدم المسجّل دخوله — وهناك كذلك `{loginUserCode}` و`{loginUserName1}` و`{loginUserName2}` |
| `{loginEmployeeId}` | معرّف الموظف المرتبط بذلك المستخدم |
| `{loginLegalEntityId}` | الشركة التي دخل بها المستخدم — ونفس المجموعة `…Id` و`…Code` و`…Name1` و`…Name2` موجودة لـ `loginBranch` و`loginSector` و`loginDepartment` و`loginAnalysisSet` |
| `{loginLanguage}` | لغة الجلسة |

### مثال على القيم الديناميكية

```csv
date1,GreaterThanOrEqual,$monthStart(),AND;
date1,LessThanOrEqual,$monthEnd(),AND;
createdBy.id,Equal,{loginUserId},AND;
dueDate,LessThanOrEqual,$todayPlusDays(30),AND;
```

يُصفّي هذا المثال السجلات حيث:
* `date1` ضمن الشهر الحالي
* `createdBy` هو المستخدم الحالي المسجّل دخوله
* `dueDate` خلال الـ 30 يومًا القادمة

::: tip
يمكنك استخدام شاشة [تعريف معايير](/ar/platform/automation-and-rules/criteria-definitions) لبناء شروط الفلترة المطلوبة بصريًا عبر واجهة النظام.
وبعد بناء المعايير التي تريدها، اضغط زر **تحويل الي نص** لتوليد التمثيل النصي المكافئ.
يمكن بعد ذلك استخدام هذا النص مباشرةً في APIs أو سكريبتات الأتمتة.
:::
