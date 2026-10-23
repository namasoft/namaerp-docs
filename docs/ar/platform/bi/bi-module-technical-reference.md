---
entities: [DashBoardWidget, BICrossFilter, DashBoard, DashBoardWidgetWizard]
---

# وحدة BI في Nama ERP — المرجع التقني

هذا المستند هو المرجع التقني الموثوق لبنى JSON في وحدة BI (ذكاء الأعمال) في Nama ERP. يُكتب أساساً للمساعدين الذكيين والمطورين الذين يحتاجون إلى إنشاء استعلامات SQL وإعدادات المخططات وروابط cross-filter وتعيينات drill-down وملفات الاستيراد الجماعي التي تعمل مباشرةً عند لصقها في Nama ERP.

تستخدم وحدة BI مكتبة [Apache ECharts](https://echarts.apache.org/) لعرض المخططات. تفهم أدوات الذكاء الاصطناعي خيارات ECharts القياسية بالفعل — يركز هذا المستند حصراً على **امتدادات Nama ERP** فوق ECharts: بنية `chartConfigJSON` ونظام placeholder الخاص بـ`$DATA` وحقن `/*AND-FILTERS*/` في SQL وروابط cross-filter وتعيينات drill-down وصيغة الاستيراد الجماعي.

::: tip اكتشاف Schema
نموذج بيانات Nama ERP منشور على [https://dm.namasoft.com](https://dm.namasoft.com). يمكن لأدوات الذكاء الاصطناعي والمطورين استخدام هذا الموقع لاكتشاف schemas الكيانات — أسماء الجداول والأعمدة وأنواع البيانات وأعمدة الربط والمفاتيح الخارجية ومسارات الخاصية. وهذا ضروري لكتابة استعلامات SQL صحيحة في مصادر بيانات الـwidget ولمعرفة مسارات `fieldId` المناسبة في تعريفات wizard.
:::

::: info الملفات المرافقة
ثلاثة مراجع تفصيلية موجودة بجانب هذا الملف. حمّلها عند الحاجة للإبقاء على السياق مختصراً:
- [`bi-reference-wizard-mode.md`](./bi-reference-wizard-mode.md) — wizard widgets (`wizardDataSource`) وdrill-by واختيار الفتحات في وقت التشغيل
- [`bi-reference-enhanced-table.md`](./bi-reference-enhanced-table.md) — widget `EnhancedTable` وpivot/cross-tab
- [`bi-reference-enhanced-metrics-card.md`](./bi-reference-enhanced-metrics-card.md) — `EnhancedMetricsCard` والـ`MetricsCards` القديمة
:::

---

## 1. بنية chartConfigJSON

يخزّن كل widget في BI إعداداته في حقل واحد هو `chartConfigJSON`، ويُحفَظ كسلسلة JSON. ويظهر هذا الحقل في ملفات الاستيراد/التصدير الجماعي الموضّحة في القسم 10 ككائن JSON متداخل (بلا تهريب). هذا هو الهيكل الرئيسي:

```json
{
  "echartOption": { },
  "dataMapping": { },
  "clickEmitMapping": [ ],
  "clickAction": { },
  "drillDownMapping": [ ],
  "linkMappings": [ ],
  "disableRuntimeDimensionSelection": false,
  "disableRuntimeMeasureSelection": false
}
```

| المفتاح | مطلوب | الوصف |
|---|---|---|
| `echartOption` | نعم | كائن خيارات ECharts قياسي يحتوي على placeholders من نوع `$DATA.*`. يحلّ الخادم هذه الـplaceholders باستخدام نتائج الاستعلام قبل إرسالها إلى الواجهة الأمامية. |
| `dataMapping` | نعم | يخبر الخادم بكيفية تحويل صفوف نتائج SQL إلى قيم `$DATA.*` التي تحلّ محل الـplaceholders. |
| `clickEmitMapping` | لا | يحدد cross-filters التي يُصدرها هذا الـwidget عند نقر المستخدم على نقطة بيانات. |
| `clickAction` | لا | إجراء النقر الأيسر على مستوى الـwidget للمخططات (واحتياطي للجداول): إصدار cross-filters أو التنقل عبر رابط أو تشغيل drill-down. يُفضي إلى إصدار cross-filter إذا كان غائباً. للجداول، يُفضَّل استخدام `onCellClick` لكل مدخل في `linkMappings` / `drillDownMapping` — انظر القسم 5a. |
| `drillDownMapping` | لا | يحدد الـwidgets أو لوحات البيانات المستهدفة التي تظهر في قائمة السياق بالنقر الأيمن، وقيم الفلاتر التي تُمرَّر إليها. |
| `linkMappings` | لا | يحدد روابط التنقل التي تظهر في قائمة السياق تحت "Navigate To". انظر القسم 5b. |
| `disableRuntimeDimensionSelection` | لا (wizard mode فقط) | عندما يكون `true`، يُخفي منتقيات الأبعاد في محدد الفتحات في وقت التشغيل. القيمة الافتراضية `false`. انظر القسم 13.9. |
| `disableRuntimeMeasureSelection` | لا (wizard mode فقط) | عندما يكون `true`، يُخفي منتقيات المقاييس في محدد الفتحات في وقت التشغيل. القيمة الافتراضية `false`. انظر القسم 13.9. |

وتحتفظ أنواع الـwidget غير البيانية بشكلها الخاص في الحقل نفسه: `EnhancedTable` يحمل `columns` و`tableOptions` (القسم 14)، و`EnhancedMetricsCard` يحمل تعريفات بطاقاته (القسم 15)، و`TextBlock` يحمل `html` / `htmlEn` وأنماط الإطار (القسم 9b). ولا يستخدم أيٌّ منها `echartOption` ولا `dataMapping`.

### سطح ECharts المدعوم

يحزم العميل نسخة مختصرة من ECharts لا المكتبة الكاملة، لذا لا يمكن لـ`echartOption` أن يستخدم إلا أنواع السلاسل والمكوّنات المسجَّلة فيها. وأي شيء آخر — نوع سلسلة أو مكوّن غير موجود في القائمة أدناه — يُتجاهل بصمت: يُرسَم المخطط من دونه ولا يظهر أي خطأ.

**أنواع السلاسل (14):** `bar`، `line`، `pie`، `gauge`، `heatmap`، `scatter`، `funnel`، `treemap`، `radar`، `sankey`، `sunburst`، `custom`، `boxplot`، `pictorialBar`.

**المكوّنات (17):** `grid`، `tooltip`، `legend`، `title`، `toolbox`، `dataZoom`، `visualMap`، `aria`، `radar` (نظام الإحداثيات)، `markLine`، `markPoint`، `markArea`، `graphic`، `dataset`، `dataset.transform`، `polar`، `calendar`.

**غير مسجَّل:** `map` / `geo`، `graph`، `tree`، `lines`، `themeRiver`، `parallel`، `effectScatter`، `brush`، `timeline`.

المُصيِّر (renderer) هو Canvas فقط، ولا يوجد مُصيِّر SVG. و`dataset` و`dataset.transform` (الفلترة / الفرز) مسجَّلان، لكن ينبغي عادةً إجراء تشكيل البيانات في SQL أو في `dataMapping`، لأن ذلك يُبقي بيانات نقاط الحفر (drill-down) والفلاتر المتقاطعة متوافقة مع ما يُرسَم.

### 1.1 Wizard Mode مقابل SQL Mode

يعمل الـwidget في أحد وضعَين بحسب وجود `wizardDataSource` أم لا:

- **SQL mode** (الـ`widget.dataSource` محدد والـ`widget.wizardDataSource` فارغ): كل إشارة لعمود في `chartConfigJSON` هي اسم عمود نتيجة خام (مثل `"categoryColumn": "branchName"`). هذا الوضع الكلاسيكي وجميع الأمثلة في هذا المستند تفترضه.
- **Wizard mode** (الـ`widget.wizardDataSource` محدد): يمكن لفتحات الأعمدة الإشارة إلى **wizard field IDs** — مسارات الخاصية المُعرَّفة على الـwizard (مثل `"categoryWizardFieldId": "customer.customerCategory"`). يحلّ الخادم الخلفي كل field ID إلى اسم مستعار SQL في وقت التشغيل باستخدام البيانات الوصفية المُخزَّنة مؤقتاً على سطر حقل الـwizard.

يُدخل wizard mode مفاتيح أشقاء بجانب كل مفتاح عمود موجود — `*WizardFieldId` بجانب `*Column`. كلا الشكلَين يتعايشان في نفس JSON؛ يستخدم الخادم الخلفي أيهما كان محدداً مع إعطاء الأولوية للعمود المحلول.

انظر القسم 13 للقائمة الكاملة لأزواج مفاتيح wizard mode وتفاعلات cross-filter / drill-down ودلالات drill-by.

---

## 2. استعلام مصدر البيانات (SQL)

يحتوي كل widget على حقل `dataSource` يتضمن استعلام SQL (T-SQL لـSQL Server). **يجب** أن يتضمن الاستعلام placeholder نصي `/*AND-FILTERS*/` في جملة WHERE الخاصة به. يستبدل الخادم هذا بشروط cross-filter النشطة في وقت التشغيل. بما أن الـplaceholder تعليق SQL، يظل الاستعلام صالحاً عند تشغيله مباشرةً في SQL Server Management Studio دون أي تعديلات.

القواعد العامة لكتابة SQL على جداول نما (احتساب المستندات التي `commitedBefore = 1` فقط، وربط السطور برأس مستندها لمعرفة الحالة، و`name1` عربي و`name2` إنجليزي، والمبالغ من `LedgerTransLine` والكميات من `QtyTransLine`) موجودة في [الاستعلام من جداول نما بلغة SQL](/ar/platform/reports/querying-nama-tables). ويحتاجها كل استعلام widget كذلك.

::: tip إعادة استخدام SQL المعقد عبر الـwidgets
إذا ظهر نفس الـ`UNION` / multi-join / SELECT مكتوباً يدوياً عبر عدة widgets بوضع SQL، فكِّر في ترقيته إلى **Virtual Entity** بدلاً من ذلك. يلفّ Virtual Entity الـSELECT في view لـSQL Server ويسجّله ككيان من الدرجة الأولى، فيصبح قابلاً للاختيار من منتقي الجدول الرئيسي في الـwizard (`tableType = "VirtualEntity"`) — ومن هناك تعمل كل ميزات wizard mode (الربط التلقائي على حقول المراجع، وdrill-by الأبعاد، وأعمدة cross-filter المستنتجة تلقائياً) مقابله كما لو كان جدولاً حقيقياً. انظر [دليل Virtual Entity](../automation-and-rules/virtual-entity-guide.md).
:::

### النمط

```sql
SELECT columns
FROM tables
WHERE 1=1 /*AND-FILTERS*/
GROUP BY columns
ORDER BY columns
```

### كيف يعمل `/*AND-FILTERS*/`

في وقت التشغيل، يبني الخادم تعبيرات جملة WHERE من روابط cross-filter الخاصة بالـwidget ويستبدل `/*AND-FILTERS*/` بها:

- إذا لم تكن هناك فلاتر نشطة: يُحذف `/*AND-FILTERS*/` (سلسلة فارغة)، ويبقى الاستعلام كما هو
- إذا كانت هناك فلاتر نشطة: يصبح `/*AND-FILTERS*/` هو ` AND expr1 AND expr2 AND expr3`

بما أن `/*AND-FILTERS*/` تعليق SQL، فالاستعلام صالح دائماً من الناحية النحوية — يمكنك لصقه مباشرةً في SQL Server Management Studio وتشغيله دون أي تعديلات.

### قواعد الاستعلام

1. دائماً أدرج `/*AND-FILTERS*/` — حتى لو لم يكن للـwidget روابط cross-filter. يتوقعها الخادم.
2. **يُسمح بوجود عدة placeholders من نوع `/*AND-FILTERS*/`** وكلها تُستبدل بنفس تعبير الفلتر. مطلوب للاستعلامات الثقيلة بـCTE: كل جسم CTE يربط جدولاً مُصفَّى يحتاج placeholder خاصاً به حتى يُطبَّق الفلتر داخله.
3. يوجد الـplaceholder في جملة WHERE فقط. لا يُحقن في `HAVING` أو `JOIN ON` أو CTE خارجي. إذا احتجت تطبيق فلتر على `HAVING`، أعد هيكلة الاستعلام.
4. استخدم أسماء مستعارة للجداول باستمرار. يستهدف `sqlLeftHandSide` في cross-filter هذه الأسماء (مثل `l.branch_id`). لكي يعمل الربط، **يجب أن يوجد الاسم المستعار في الاستعلام** عند نطاق الـplaceholder.
5. بالنسبة لـwidgets EChart، يجب أن تتطابق أسماء أعمدة SQL مع الأسماء المشار إليها في `dataMapping`.
6. بالنسبة لـwidgets Table / EnhancedTable، تصبح أسماء أعمدة SQL مفاتيح `field` للأعمدة.
7. يُوصى بـ`SELECT TOP N` للـwidgets ذات القوائم المصنّفة. اقرنها بـ`ORDER BY` — بدونه يكون ترتيب مجموعة النتائج غير محدد.
8. لإعادة استخدام عمود في payloads روابط الكيانات، استخدم اسماً مستعاراً لعمود `entityType` الخاص بالكيان صراحةً (مثل `SELECT b.id branchId, b.entityType branchEntityType, ...`) حتى يتمكن `linkMappings.linkToEntityTypeColumn` من الإشارة إليه.

### مثال

```sql
SELECT TOP 10
  i.name2 itemName,
  SUM(l.netValue) netValue
FROM SalesInvoiceLine l
  JOIN SalesInvoice h ON h.id = l.salesInvoice_id
  LEFT JOIN InvItem i ON i.id = l.item_id
  LEFT JOIN Branch b ON b.id = l.branch_id
WHERE h.commitedBefore = 1 /*AND-FILTERS*/
GROUP BY i.name2
ORDER BY netValue DESC
```

---

## 3. dataMapping — الأنواع والحل

يخبر كائن `dataMapping` الخادمَ بكيفية تحويل صفوف نتائج الاستعلام إلى هياكل البيانات التي تحلّ محل placeholders من نوع `$DATA.*` في `echartOption`.

::: tip التمرير العددي (Scalar pass-through)
أي مفتاح في `dataMapping` ليس حقلاً بنيوياً محجوزاً (مثل `type` أو `*Column` أو `series` أو `stack` أو `format` إلخ) يُعرَض تلقائياً بوصفه `$DATA.<key>`. يتيح ذلك للقوالب حمل ثوابت — مثلاً `"target": 150` في dataMapping يصبح `$DATA.target` في echartOption. المفاتيح المحجوزة: `type`, `categoryColumn`, `labelColumn`, `valueColumn`, `xColumn`, `yColumn`, `sizeColumn`, `innerLabelColumn`, `outerLabelColumn`, `leftValueColumn`, `rightValueColumn`, `seriesType`, `stack`, `areaStyle`, `percentMode`, `sort`, `series`, `format`.
:::

### 3.1 CategoryValue

النوع الأكثر شيوعاً. يُوفر عمود واحد تسميات الفئات (محور X)، وعمود سلاسل واحد أو أكثر يوفر قيماً عددية.

**الحقول المطلوبة:**
- `type`: `"CategoryValue"`
- `categoryColumn`: اسم العمود لفئات محور X
- `series`: مصفوفة من تعريفات السلاسل

**تعريف السلسلة:**
```json
{
  "column": "netValue",
  "name": "Net Value",
  "type": "bar",
  "format": {"type": "currency", "decimals": 0, "compact": true},
  "yAxisIndex": 0
}
```

| حقل السلسلة | مطلوب | الوصف |
|---|---|---|
| `column` | نعم | اسم عمود SQL لقراءة القيم العددية منه |
| `name` | لا | الاسم المعروض في المفتاح. يُستخدم اسم العمود افتراضياً. |
| `type` | لا | نوع سلسلة ECharts: `"bar"` أو `"line"` أو `"scatter"`. الافتراضي `"bar"`. |
| `format` | لا | مواصفات تنسيق الأرقام (انظر القسم 7). |
| `yAxisIndex` | لا | محور Y الذي ترتبط به هذه السلسلة (للمخططات ذات المحورين). الافتراضي `0`. |
| `stack` | لا | اسم مجموعة التكديس. السلاسل التي تشترك في نفس قيمة `stack` تُكدَّس. |
| `areaStyle` | لا | `true` أو كائن — يحوّل السلسلة إلى مساحة مملوءة (للمخططات الخطية). |

**ينتج placeholders من نوع `$DATA` التالية:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.categories` | `string[]` | القيم المتميزة من `categoryColumn` بترتيب أول ظهور — انظر التنبيه أدناه |
| `$DATA.series` | `object[]` | مصفوفة من كائنات `{name, type, data}` |
| `$DATA.series[0].name` | `string` | اسم السلسلة الأولى |
| `$DATA.series[0].data` | `number[]` | القيم العددية للسلسلة الأولى |
| `$DATA.series[N].name` | `string` | اسم السلسلة رقم N |
| `$DATA.series[N].data` | `number[]` | القيم العددية للسلسلة رقم N |
| `$DATA.min` | `number` | الحد الأدنى عبر كل السلاسل |
| `$DATA.max` | `number` | الحد الأقصى عبر كل السلاسل |

::: warning الصفوف التي تشترك في تسمية الفئة تُدمَج
تُجمَّع الصفوف بحسب القيمة المتميزة لـ`categoryColumn` بترتيب أول ظهور لكل قيمة. وعندما تحمل عدة صفوف التسمية نفسها **تُجمَع** قيمها العددية في فئة واحدة، وتُؤخذ بيانات نقطة drill-down / cross-filter لتلك الفئة من **أول** صف يحمل تلك التسمية. وإذا كان يجب أن يبقى كل صف شريطاً مستقلاً، فاجعل التسمية فريدة في SQL — مثلاً بإلحاق الكود أو التاريخ بالاسم.
:::

**مثال:**

```json
{
  "dataMapping": {
    "type": "CategoryValue",
    "categoryColumn": "branchName",
    "series": [
      {"column": "netValue", "name": "Net Value", "type": "bar"},
      {"column": "totalQty", "name": "Quantity", "type": "line", "yAxisIndex": 1}
    ]
  }
}
```

**echartOption الذي يستخدمه:**

```json
{
  "echartOption": {
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": [{"type": "value"}, {"type": "value"}],
    "series": [
      {"name": "$DATA.series[0].name", "type": "bar", "data": "$DATA.series[0].data"},
      {"name": "$DATA.series[1].name", "type": "line", "data": "$DATA.series[1].data", "yAxisIndex": 1}
    ]
  }
}
```

**الاختصار**: إذا استخدم echartOption `"series": "$DATA.series"`، تُحقن مصفوفة السلاسل بأكملها تلقائياً. هذا مريح لكنه يمنح تحكماً أقل في تنسيق كل سلسلة منفردة.

### 3.2 CategoryLabelValue

نمط جدول pivot: عمود للفئات (محور X)، وعمود تصبح قيمه المتميزة سلاسل منفصلة، وعمود للقيم العددية. يُحوّل الخادم تلقائياً مجموعة النتائج المسطحة إلى سلاسل مجمّعة.

**الحقول المطلوبة:**
- `type`: `"CategoryLabelValue"`
- `categoryColumn`: العمود لفئات محور X
- `labelColumn`: العمود الذي تصبح قيمه المتميزة أسماء السلاسل
- `valueColumn`: العمود للقيم العددية
- `seriesType`: نوع المخطط الافتراضي لكل السلاسل (مثل `"bar"` أو `"line"`)

**الحقول الاختيارية:**
- `stack`: إذا حُدد (مثل `"total"`)، تحصل كل السلاسل على مجموعة التكديس هذه
- `percentMode`: إذا كان `true`، تُطبَّع القيم كنسب مئوية ضمن كل فئة
- `areaStyle`: إذا كان `true`، تحصل السلاسل على `areaStyle: {}`
- `format`: تنسيق أرقام يُطبَّق على كل السلاسل

**ينتج placeholders من نوع `$DATA` التالية:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.categories` | `string[]` | القيم المتميزة من `categoryColumn` بترتيب أول ظهور |
| `$DATA.series` | `object[]` | سلسلة واحدة لكل تسمية فريدة. كل منها لها `name` و`type` و`data`. والصفوف التي تشترك في الفئة والتسمية معاً **تُجمَع** في نقطة واحدة، وتأتي بيانات drill-down / cross-filter لها من **أول** صف منها — وهي قاعدة الدمج نفسها في القسم 3.1. |

**مثال SQL:**

```sql
SELECT YEAR(l.valueDate) salesYear, b.name2 branchName, SUM(l.netValue) netValue
FROM SalesInvoiceLine l JOIN SalesInvoice h ON h.id = l.salesInvoice_id LEFT JOIN Branch b ON b.id = l.branch_id
WHERE h.commitedBefore = 1 /*AND-FILTERS*/
GROUP BY YEAR(l.valueDate), b.name2
ORDER BY salesYear
```

**مثال الإعداد:**

```json
{
  "echartOption": {
    "legend": {},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": {"type": "value"},
    "series": "$DATA.series"
  },
  "dataMapping": {
    "type": "CategoryLabelValue",
    "categoryColumn": "salesYear",
    "labelColumn": "branchName",
    "valueColumn": "netValue",
    "seriesType": "bar",
    "stack": "total"
  }
}
```

### 3.3 LabelValue

للمخططات الدائرية والقمعية وما شابهها: عمود للتسميات وعمود للقيم. تصبح كل تسمية **متميزة** نقطة بيانات بالشكل `{name, value}` — فالصفوف التي تشترك في التسمية **تُجمَع** في شريحة واحدة، وتأتي بيانات drill-down / cross-filter لها من **أول** صف منها (قاعدة الدمج في القسم 3.1). وإذا كان يجب أن يبقى كل صف شريحة مستقلة، فاجعل التسمية فريدة في SQL.

**الحقول المطلوبة:**
- `type`: `"LabelValue"`
- `labelColumn`: العمود لأسماء العناصر
- `valueColumn`: العمود للقيم العددية

**الحقول الاختيارية:**
- `centerText`: نص يُعرض في وسط مخطط donut (يُستخدم عبر `$DATA.centerText`)
- `format`: مواصفات تنسيق الأرقام

**ينتج placeholders من نوع `$DATA` التالية:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.values` | `{name, value}[]` | كائن واحد لكل قيمة متميزة من `labelColumn` بترتيب أول ظهور. و`value` هو مجموع `valueColumn` عبر الصفوف التي تشترك في تلك التسمية. |
| `$DATA.centerText` | `string` | فقط إذا كان `centerText` محدداً في dataMapping. |

**مثال:**

```json
{
  "echartOption": {
    "tooltip": {"trigger": "item", "formatter": "{b}: {c} ({d}%)"},
    "series": [{"type": "pie", "radius": "60%", "data": "$DATA.values"}]
  },
  "dataMapping": {
    "type": "LabelValue",
    "labelColumn": "categoryName",
    "valueColumn": "netValue"
  }
}
```

### 3.4 Gauge

لمخططات المقياس. يستخدم الصف الأول فقط من مجموعة النتائج.

**الحقول المطلوبة:**
- `type`: `"Gauge"`
- `valueColumn`: العمود لقيمة المقياس

**الحقول الاختيارية:**
- `unit`: سلسلة وحدة العرض (مثل `"%"` أو `"SAR"`)
- `max`: القيمة القصوى لمقياس المؤشر
- `min`: القيمة الدنيا لمقياس المؤشر
- `bands`: مصفوفة نطاقات الألوان (مثل `[[0.3, "#67e0e3"], [0.7, "#37a2da"], [1, "#fd666d"]]`)

**ينتج placeholders من نوع `$DATA` التالية:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.value` | `number` | القيمة العددية من الصف الأول |
| `$DATA.unit` | `string` | من حقل `unit` |
| `$DATA.max` | `number` | من حقل `max` |
| `$DATA.min` | `number` | من حقل `min` |
| `$DATA.bands` | `array` | من حقل `bands` |

### 3.5 Scatter

لمخططات الانتشار والفقاعات. يصبح كل صف نقطة `[x, y]` أو `[x, y, size]`.

**الحقول المطلوبة:**
- `type`: `"Scatter"`
- `xColumn`: العمود لقيم X (عددية)
- `yColumn`: العمود لقيم Y (عددية)

**الحقول الاختيارية:**
- `sizeColumn`: العمود لحجم الفقاعة (عددي)

**ينتج:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.rows` | `number[][]` | مصفوفة من مصفوفات `[x, y]` أو `[x, y, size]` |

### 3.6 Heatmap

لمخططات الخريطة الحرارية/المصفوفة. يوفر كل صف فئة X وفئة Y وقيمة عددية.

**الحقول المطلوبة:**
- `type`: `"Heatmap"`
- `xColumn`: العمود لفئات محور X
- `yColumn`: العمود لفئات محور Y
- `valueColumn`: العمود لقيم الخلايا (عددية)

**ينتج:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.xCategories` | `string[]` | القيم الفريدة لـX |
| `$DATA.yCategories` | `string[]` | القيم الفريدة لـY |
| `$DATA.rows` | `number[][]` | مصفوفة من مصفوفات `[xIndex, yIndex, value]` |
| `$DATA.min` | `number` | أدنى قيمة خلية |
| `$DATA.max` | `number` | أعلى قيمة خلية |

### 3.7 Tree

سياق الصفوف الخام العام (مثل `Custom`). لمخططات treemap، يُفضَّل استخدام `LabelValue` — فهو ينتج شكل `{name, value}[]` الذي يتوقعه ECharts treemap مباشرةً.

**الحقول المطلوبة:**
- `type`: `"Tree"`

**ينتج:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.rows` | `string[][]` | جميع الصفوف كمصفوفات نصية |
| `$DATA.columns` | `string[]` | رؤوس الأعمدة |

### 3.8 Waterfall

لمخططات الشلال (bridge). بناءً على عمود قيمة واحد يمثل دلتا، يبني الخادم سلسلتين مكدستين: `Placeholder` غير مرئي يرفع القاعدة ويخفضها، وشريط `Value` مرئي يُظهر حجم كل دلتا.

**الحقول المطلوبة:**
- `type`: `"Waterfall"`
- `categoryColumn`: العمود لفئات محور X (بترتيب العرض)
- `valueColumn`: العمود للدلتا عند كل فئة (يمكن أن تكون موجبة أو سالبة)

**ينتج:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.categories` | `string[]` | القيم الفريدة من `categoryColumn`، بالحفاظ على ترتيب الصفوف |
| `$DATA.series` | `object[]` | مدخلان: `[0]` هو placeholder غير المرئي، `[1]` هو سلسلة القيمة المرئية. كلاهما يحمل `stack: "Total"`. |
| `$DATA.series[0].data` | `number[]` | ارتفاعات الـplaceholder |
| `$DATA.series[1].data` | `object[]` | `[{value: <abs delta>, _signedValue: <raw delta>}, ...]`. |

### 3.9 Radar

لمخططات الرادار/العنكبوت. يوفر عمود واحد أسماء المؤشرات؛ كل عمود سلسلة هو مقياس منفصل مرسوم عبر المؤشرات.

**الحقول المطلوبة:**
- `type`: `"Radar"`
- `categoryColumn`: العمود الذي تصبح قيمه المتميزة مؤشرات الرادار (المحاور)
- `series`: مصفوفة من `{column, name}` — مدخل واحد لكل كيان مقارَن

**ينتج:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.indicators` | `{name, max}[]` | واحد لكل فئة فريدة. `max` هو الحد الأقصى العام عبر كل السلاسل. |
| `$DATA.series` | `{name, value}[]` | واحد لكل إعداد سلسلة. `value` مصفوفة محاذية لـ`$DATA.indicators`. |

### 3.10 GaugeMulti

لمقاييس متعددة الحلقات المتحدة المركز — يصبح كل صف حلقة/عنصر مقياس.

**الحقول المطلوبة:**
- `type`: `"GaugeMulti"`
- `labelColumn`: العمود لاسم كل حلقة
- `valueColumn`: العمود للقيمة العددية لكل حلقة

**ينتج:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.values` | `object[]` | `[{value, name, title: {show: false}, detail: {show: false}}, ...]`. |

### 3.11 NestedLabelValue

للمخططات الدائرية المتداخلة / donuts ثنائية المستوى. كل حلقة مخطط دائري مستقل — بُعدها الخاص ومقياسها الخاص — وتُرسم الحلقتان بأنصاف قطر مختلفة.

**الحقول المطلوبة:**
- `type`: `"NestedLabelValue"`
- `innerLabelColumn`: العمود لتسميات الحلقة الداخلية
- `outerLabelColumn`: العمود لتسميات الحلقة الخارجية
- `innerValueColumn`: المقياس المجمَّع للحلقة الداخلية
- `outerValueColumn`: المقياس المجمَّع للحلقة الخارجية

**الحقول الاختيارية:**
- `innerSeriesName` / `outerSeriesName`: أسماء عرض للحلقتين.
- `innerFormat` / `outerFormat`: مواصفات تنسيق لكل حلقة.

**ينتج:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.innerValues` | `{name, value}[]` | مجمَّع حسب `innerLabelColumn` على `innerValueColumn` |
| `$DATA.outerValues` | `{name, value}[]` | مجمَّع حسب `outerLabelColumn` على `outerValueColumn` |
| `$DATA.innerSeriesName` | `string` | اسم الحلقة الداخلية المحلول (سلسلة فارغة إذا لم يُحدد) |
| `$DATA.outerSeriesName` | `string` | اسم الحلقة الخارجية المحلول (سلسلة فارغة إذا لم يُحدد) |

### 3.12 FunnelComparison

لمقارنة القمعَين جنباً إلى جنب. عمود تسميات واحد مع عمودَي قيمة (قمع أيسر + قمع أيمن).

**الحقول المطلوبة:**
- `type`: `"FunnelComparison"`
- `labelColumn`: العمود لأسماء المراحل
- `leftValueColumn`: العمود لقيم الجانب الأيسر
- `rightValueColumn`: العمود لقيم الجانب الأيمن

**ينتج:**

| الـPlaceholder | النوع | الوصف |
|---|---|---|
| `$DATA.leftValues` | `{name, value}[]` | مجمَّع من `leftValueColumn` |
| `$DATA.rightValues` | `{name, value}[]` | مجمَّع من `rightValueColumn` |

### 3.13 Custom / Raw

- `Custom`: مثل Tree — يوفر `$DATA.rows` و`$DATA.columns`.
- `Raw`: لا يُبنى سياق `$DATA`. يجب ألا يحتوي echartOption على placeholders من نوع `$DATA`. مفيد للمخططات الثابتة تماماً.

### 3.14 الحد الأقصى للنتائج — Top N مع Others

بالنسبة لأنواع التعيين حيث يُنتج بُعد واحد صفوف الدلو، يحتفظ `dataMapping.maxResults` بأعلى N ويطوي كل شيء آخر في دلو **Others** اصطناعي.

| المفتاح | الغرض |
|---|---|
| `maxResults` | عدد صحيح. احتفظ بهذا العدد من الدلاء؛ يُجمَّع الباقي في مدخل "Others" واحد. غير محدد / ≤ 0 = لا تجميع |
| `maxResultsRankBy` | العمود المستخدم لترتيب الدلاء (تنازلياً). عند الفراغ، يُستخدم افتراضياً `series[0].column` ثم `valueColumn` ثم `leftValueColumn` |
| `maxResultsRankByWizardFieldId` | الشقيق في wizard mode لـ`maxResultsRankBy` |
| `othersLabelEn` / `othersLabelAr` | نص عرض لدلو Others. عند الفراغ، يستخدم مفتاح الترجمة `biOthers` |

**أنواع التعيين المدعومة:** `CategoryValue` و`LabelValue` و`CategoryLabelValue` و`Radar` و`Waterfall` و`GaugeMulti` و`FunnelComparison` و`NestedLabelValue`. لا ينطبق على `Scatter` أو `Heatmap` أو `Gauge` أو `Raw` أو `Custom` أو `Tree`.

**خصوصية CategoryLabelValue:** يُحسَب Top N **عبر كل التسميات** — أي الفئات N ذات أعلى مجموع مرتَّب عبر كل تسمية تفوز؛ كل منها يحتفظ بتفاصيل كل تسمية سليمة.

**سلوك التفاعل:** شريحة Others لا تُصدر أي cross-filter أو drill-down أو رابط أو drill-by.

**قوالب المخططات:** تُطبَّق افتراضياً: pie / funnel = 6، radar = 8، bar / treemap = 15.

```json
"dataMapping": {
  "type": "CategoryValue",
  "categoryColumn": "customerName",
  "series": [{"column": "totalSales", "name": "Total Sales", "type": "bar"}],
  "maxResults": 10,
  "maxResultsRankBy": "totalSales",
  "othersLabelEn": "Other Customers",
  "othersLabelAr": "عملاء آخرون"
}
```

---

## 4. clickEmitMapping — إصدار Cross-Filter

عندما ينقر مستخدم على نقطة بيانات في مخطط، يمكن للـwidget إصدار قيم cross-filter تُصفِّي الـwidgets الأخرى في نفس لوحة البيانات. تُعرِّف مصفوفة `clickEmitMapping` القيم التي يجب استخراجها من النقطة المنقورة وأي cross-filter يجب تعيينه.

```json
"clickEmitMapping": [
  {
    "crossFilterCode": "itemFilter",
    "idColumn": "itemId",
    "codeColumn": "itemCode",
    "name1Column": "itemName1",
    "name2Column": "itemName2",
    "entityType": "InvItem"
  }
]
```

| الحقل | مطلوب | الوصف |
|---|---|---|
| `crossFilterCode` | نعم | الـ`code` لكيان `BICrossFilter` المراد تعيينه |
| `valueColumn` | لا | العمود للقيم العددية (للفلاتر غير المرجعية كالتواريخ والأرقام) |
| `idColumn` | لا | العمود الذي يحتوي على معرّف الكيان (binary(16) على SQL Server، مُحوَّل تلقائياً) |
| `codeColumn` | لا | العمود الذي يحتوي على كود الكيان |
| `name1Column` | لا | العمود الذي يحتوي على الاسم العربي |
| `name2Column` | لا | العمود الذي يحتوي على الاسم الإنجليزي |
| `entityType` | لا | سلسلة نوع الكيان الثابتة (مثل `"InvItem"` أو `"Customer"`) |
| `entityTypeColumn` | لا | العمود الذي يحتوي على نوع الكيان (للمراجع العامة) |
| `wizardFieldId` | wizard mode | معرّف حقل wizard المرتبط بهذا الإصدار. انظر القسم 13. |

**القواعد:**
- لفلاتر نوع **Reference**: أدرج `idColumn` (مطلوب لكي يعمل الفلتر)، بالإضافة إلى `codeColumn`/`name1Column`/`name2Column` للعرض.
- لفلاتر نوع **scalar** (Date وInteger وDecimal وText): أدرج `valueColumn`.
- المدخلات المتعددة في المصفوفة تعني أن الـwidget يُصدر cross-filters متعددة من نقرة واحدة.
- الأعمدة المشار إليها هنا يجب أن توجد في استعلام SQL الخاص بالـwidget.

**كيف يعمل في وقت التشغيل:**
1. ينقر المستخدم على نقطة بيانات
2. تقرأ الواجهة الأمامية بيانات `_clickEmitData` (المُحقنة من الخادم في echartOption)
3. لفهرس النقطة المنقورة، تستخرج القيم من بيانات النقطة المُبناة مسبقاً
4. تستدعي متجر cross-filter Pinia لتعيين الفلتر
5. تعيد جميع الـwidgets الأخرى المرتبطة بهذا الـcross-filter جلب بياناتها مع الفلتر الجديد

---

## 5. drillDownMapping — Drill-Down للـWidget

عند النقر بزر الماوس الأيمن على نقطة بيانات، تُعرض قائمة سياق بأهداف drill-down. النقر على أحدها يفتح نافذة منبثقة تُظهر مخطط الـwidget المستهدف، مُصفَّى بالقيم من النقطة المنقورة.

```json
"drillDownMapping": [
  {
    "key": "invoiceDetails",
    "targetWidgetCode": "bi-item-invoice-details",
    "arTitle": "عرض تفاصيل الفواتير",
    "enTitle": "View invoice details",
    "orderInMenu": 1,
    "filters": [
      {
        "crossFilterCode": "itemFilter",
        "idColumn": "itemId",
        "codeColumn": "itemCode",
        "name1Column": "itemName1",
        "name2Column": "itemName2",
        "entityType": "InvItem"
      }
    ]
  }
]
```

| حقل الهدف | مطلوب | الوصف |
|---|---|---|
| `key` | لا | معرّف فريد لهذا الهدف. مطلوب عند الإشارة إليه من `clickAction.targetKey`. |
| `targetType` | لا | `"widget"` (الافتراضي) أو `"dashboard"`. يتحكم في ما إذا كان الهدف widget واحداً أو لوحة بيانات كاملة. |
| `targetWidgetCode` | إذا widget | الـ`code` لـ`DashBoardWidget` المراد فتحه |
| `targetDashboardCode` | إذا dashboard | الـ`code` للـ`DashBoard` المستهدف للفتح |
| `arTitle` | لا | نص عنصر القائمة بالعربية |
| `enTitle` | لا | نص عنصر القائمة بالإنجليزية |
| `openMode` | لا | كيفية فتح الهدف: `"popup"` (الافتراضي)، أو `"navigate"` (نفس التبويب)، أو `"newTab"`. |
| `orderInMenu` | لا | ترتيب الفرز في قائمة السياق (تصاعدياً) |
| `column` | widgets الجداول فقط | يحصر المدخل في عمود محدد. الغياب = مستوى الصف. |
| `onCellClick` | لا | widgets الجداول فقط. عندما `true`، يُطلق النقر الأيسر على خلية مطابقة drill-down مباشرةً. انظر القسم 5a. |
| `filters` | نعم | مصفوفة من تعريفات الفلاتر (نفس بنية مدخلات `clickEmitMapping`) |
| `wizardFieldId` | wizard mode | البُعد الذي ينتمي إليه هذا الهدف. انظر القسم 13. |

**كيف يعمل:**
1. ينقر المستخدم بزر الماوس الأيمن على نقطة بيانات
2. تُعرض قائمة السياق بأهداف drill-down مرتَّبة حسب `orderInMenu`
3. يختار المستخدم هدفاً
4. تبني الواجهة الأمامية `drillDownFilters` من قيم النقطة المنقورة
5. يستقبل الخادم الطلب ويُطبق فلاتر drill-down كجمل WHERE إضافية
6. يُعرض مخطط الـwidget المستهدف في نافذة منبثقة

**يمكن تعريف أهداف drill-down متعددة** للـwidget نفسه — تُعرض قائمة السياق جميعها.

### Drill-Down للوحة البيانات

`targetType: "dashboard"` يتيح الانتقال إلى لوحة بيانات كاملة بدلاً من widget واحد.

عند `targetType` هو `"dashboard"`، تُدرج `targetDashboardCode` بدلاً من `targetWidgetCode`. تُمرَّر فلاتر drill-down إلى جميع الـwidgets على لوحة البيانات المستهدفة.

```json
"drillDownMapping": [
  {
    "key": "salesDetail",
    "targetType": "widget",
    "targetWidgetCode": "SALES_DETAIL",
    "enTitle": "Sales Details",
    "arTitle": "تفاصيل المبيعات",
    "orderInMenu": 1,
    "filters": [...]
  },
  {
    "key": "regionalDash",
    "targetType": "dashboard",
    "targetDashboardCode": "REGIONAL",
    "enTitle": "Regional Dashboard",
    "arTitle": "لوحة المنطقة",
    "openMode": "popup",
    "orderInMenu": 2,
    "filters": [...]
  }
]
```

| `openMode` | السلوك |
|---|---|
| `"popup"` | الافتراضي. يفتح DrillDownDialog. بالنسبة لأهداف لوحة البيانات، هذه نافذة منبثقة بملء الشاشة تُعرض جميع الـwidgets. |
| `"navigate"` | ينتقل في نفس تبويب المتصفح. |
| `"newTab"` | يفتح الهدف في تبويب متصفح جديد. |

::: tip
drill-down للوحة البيانات مفيد بشكل خاص للتحليل الهرمي — مثل الانتقال من ملخص على مستوى الشركة إلى لوحة إقليمية، ومنها إلى لوحة على مستوى الفرع.
:::

---

## 5a. التحكم في سلوك النقر الأيسر

افتراضياً، يُصدر النقر على نقطة بيانات في مخطط (أو خلية في جدول) cross-filters. آليتان تتيحان تجاوز ذلك: علامة `onCellClick` لكل مدخل على الروابط وdrill-downs (الجداول)، والـ`clickAction` على مستوى الـwidget (المخططات بدون أعمدة).

### 5a.1 onCellClick — النقر الأيسر لكل مدخل (Tables + EnhancedTable)

الطريقة الموصى بها لـwidgets Table/EnhancedTable: ضع علامة `"onCellClick": true` على مدخل محدد في `linkMappings` أو `drillDownMapping`.

```json
"linkMappings": [
  {
    "key": "openCustomer",
    "column": "customerName",
    "onCellClick": true,
    "linkToEntityTypeColumn": "customerEntityType",
    "linkToIdColumn": "customerId",
    "openMode": "popup"
  }
]
```

**قواعد المطابقة لمدخلات `onCellClick: true`:**

| نطاق المدخل | يطابق |
|---|---|
| `column` محدد (مثل `"customerName"`) | فقط عند وجود الخلية المنقورة في هذا العمود |
| `column` غائب (مستوى الصف) | أي خلية في الصف |

**ترتيب الأولوية داخل widget واحد:**

1. مدخلات drill-down مع `onCellClick: true` (drill-down يفوز على الرابط عند التطابق).
2. مدخلات الرابط مع `onCellClick: true`.
3. `clickAction` على مستوى الـwidget (انظر أدناه).
4. إصدار cross-filter (`clickEmitMapping`).

المدخلات بدون `onCellClick` لا تزال تظهر في قائمة السياق بالنقر الأيمن.

### 5a.2 clickAction على مستوى الـWidget (المخططات + الاحتياطي)

لـwidgets ECharts لا يوجد مفهوم لكل خلية — النقر يصيب نقطة بيانات لا عموداً. يُعرِّف كائن `clickAction` على مستوى الـwidget إجراءً واحداً للـwidget بأكمله:

```json
"clickAction": {
  "type": "crossFilter | link | drillDown",
  "targetKey": "someKey"
}
```

| الحقل | مطلوب | الوصف |
|---|---|---|
| `type` | نعم | أحد `"crossFilter"` أو `"link"` أو `"drillDown"`. |
| `targetKey` | إذا link أو drillDown | الـ`key` للهدف في `linkMappings` (لـ`"link"`) أو `drillDownMapping` (لـ`"drillDown"`). |

الأوضاع الثلاثة:

- **`"crossFilter"`** — السلوك الافتراضي الحالي. يُصدر الـwidget قيم cross-filter من `clickEmitMapping`.
- **`"link"`** — ينتقل باستخدام رابط مُعرَّف في `linkMappings`.
- **`"drillDown"`** — يُشغِّل drill-down إلى هدف مُعرَّف في `drillDownMapping`.

::: warning
إذا لم يُحدد `onCellClick` ولا `clickAction`، يُعيد الـwidget إلى إصدار cross-filter — نفس السلوك تماماً قبل تقديم هذه الميزات. الإعدادات الموجودة لا تحتاج إلى أي تغييرات.
:::

**مثال — النقر الأيسر يفتح widget drill-down مباشرةً:**

```json
{
  "clickAction": {
    "type": "drillDown",
    "targetKey": "invoiceDetails"
  },
  "drillDownMapping": [
    {
      "key": "invoiceDetails",
      "targetWidgetCode": "bi-item-invoice-details",
      "enTitle": "Invoice Details",
      "arTitle": "تفاصيل الفواتير",
      "filters": [...]
    }
  ]
}
```

### أي أجزاء المخطط تستجيب للنقر

ليس كل بكسل في المخطط نقطة بيانات. فمعالجة النقر الموضحة أعلاه لا تعمل إلا حيث يُبلِغ المخطط عن إصابة عنصر فعلي، ولذلك تبدو بعض المناطق قابلة للنقر وهي ليست كذلك:

- مسار `showBackground` خلف الشريط (الشريط الباهت بكامل الارتفاع) غير قابل للنقر — الشريط نفسه فقط هو القابل للنقر.
- العناصر المرسومة بـ`opacity: 0` لا تخضع لاختبار الإصابة؛ فالعنصر الشفاف تماماً لا يمكن النقر عليه.
- المقياس (gauge) لا يستجيب إلا على قوس التقدم والمؤشر، لا على مسار المحور خلفهما.
- في المخطط المدمج، تقع تعبئة `areaStyle` على سلسلة خطية فوق الأشرطة. والنقر على المساحة المظللة يُحلّ بأقرب فئة على محور X، فيصل النقر إلى الشريط الواقع تحت التعبئة. وإذا أردت أن يكون الخط شفافاً تماماً للنقرات، فاضبط `"silent": true` على تلك السلسلة (انظر الملاحظة تحت [مخطط خطي مع تعبئة المساحة](#mkhTT-khTy-maa-taaby-lmsH)).
- في treemap، تُحدَّد العقدة المنقورة باسمها لا بموضعها.

---

## 5b. linkMappings — التنقل بالروابط

تُعرِّف مصفوفة `linkMappings` روابط التنقل التي تظهر في قائمة السياق بالنقر الأيمن تحت مجموعة "Navigate To".

```json
"linkMappings": [
  {
    "key": "openCustomer",
    "enLabel": "Open Customer",
    "arLabel": "فتح العميل",
    "linkToEntityTypeColumn": "CustomerEntityType",
    "linkToIdColumn": "CustomerId",
    "openMode": "popup",
    "labelColumn": "CustomerName"
  },
  {
    "key": "openWebsite",
    "enLabel": "Open Website",
    "arLabel": "فتح الموقع",
    "linkColumn": "WebsiteURL"
  }
]
```

نوعان من الروابط يتميزان بالحقول التي تُدرجها:

### رابط مباشر (قائم على URL)

استخدم حقل `linkColumn` للإشارة إلى عمود SQL يحتوي على URL. يفحص النظام URL لاتخاذ قرار كيفية فتحه:

- **URLs مطلقة** (تبدأ بـ`http://` أو `https://`) تُفتح في تبويب متصفح جديد.
- **URLs نسبية** تُعامَل كمسارات تطبيق داخلية وتتنقل داخل التطبيق.

| الحقل | مطلوب | الوصف |
|---|---|---|
| `key` | نعم | معرّف فريد للرابط. مُشار إليه من `clickAction.targetKey`. |
| `enLabel` | لا | التسمية الإنجليزية في قائمة السياق |
| `arLabel` | لا | التسمية العربية في قائمة السياق |
| `linkColumn` | نعم | عمود SQL يحتوي على URL |
| `column` | widgets الجداول فقط | يحصر المدخل في عمود محدد. |
| `onCellClick` | لا | widgets الجداول فقط. عندما `true`، يُطلق النقر الأيسر على الخلية المطابقة هذا الرابط. انظر القسم 5a.1. |

### رابط تنقل الكيان

استخدم `linkToEntityTypeColumn` + `linkToIdColumn` لبناء رابط يفتح واجهة تعديل الكيان.

| الحقل | مطلوب | الوصف |
|---|---|---|
| `key` | نعم | معرّف فريد للرابط. مُشار إليه من `clickAction.targetKey`. |
| `enLabel` | لا | التسمية الإنجليزية في قائمة السياق |
| `arLabel` | لا | التسمية العربية في قائمة السياق |
| `linkToEntityTypeColumn` | نعم | عمود SQL يحتوي على سلسلة نوع الكيان (مثل `"Customer"`) |
| `linkToIdColumn` | نعم | عمود SQL يحتوي على معرّف الكيان |
| `entityType` | لا | سلسلة نوع الكيان الثابتة. استخدمها بدلاً من `linkToEntityTypeColumn` عند ارتباط كل الصفوف بنفس نوع الكيان. |
| `openMode` | لا | كيفية فتح الكيان: `"popup"` (نافذة Quasar، الافتراضي)، أو `"navigate"` (نفس التبويب)، أو `"newTab"`. |
| `labelColumn` | لا | عمود SQL يُستخدم لإثراء تسمية قائمة السياق. |
| `column` | widgets الجداول فقط | يحصر المدخل في عمود محدد. |
| `onCellClick` | لا | widgets الجداول فقط. عندما `true`، يفتح النقر الأيسر على الخلية المطابقة الرابط. انظر القسم 5a.1. |

::: tip
حقل `labelColumn` لمسة صغيرة تُحدث فارقاً كبيراً في قابلية الاستخدام. بدلاً من عنصر قائمة عام "Open Customer"، يرى المستخدم "Open Customer 'ABC Trading'" — يعرف تماماً إلى أين سيأخذه الرابط قبل النقر.
:::

**مثال — widget مخطط، النقر الأيسر ينتقل إلى كيان عميل:**

```json
{
  "clickAction": {
    "type": "link",
    "targetKey": "openCustomer"
  },
  "linkMappings": [
    {
      "key": "openCustomer",
      "enLabel": "Open Customer",
      "arLabel": "فتح العميل",
      "linkToEntityTypeColumn": "CustomerEntityType",
      "linkToIdColumn": "CustomerId",
      "openMode": "popup",
      "labelColumn": "CustomerName"
    }
  ]
}
```

**مثال — EnhancedTable، النقر على خلية اسم العميل يفتح سجله:**

```json
{
  "columns": [
    {"id": "code", "field": "code"},
    {"id": "customerName", "field": "customerName"}
  ],
  "linkMappings": [
    {
      "key": "openCustomer",
      "column": "customerName",
      "onCellClick": true,
      "enLabel": "Open Customer",
      "arLabel": "فتح العميل",
      "linkToEntityTypeColumn": "CustomerEntityType",
      "linkToIdColumn": "CustomerId",
      "openMode": "popup",
      "labelColumn": "CustomerName"
    }
  ]
}
```

---

## 6. روابط Cross-Filter

تُعرِّف روابط cross-filter الفلاتر التي **يستجيب** لها الـwidget (لا يُصدرها — ذلك هو `clickEmitMapping`). توجد في مكانين بـ**شكلين مختلفين**:

### مستوى الـWidget (`DashBoardWidget.crossFilterBindings`) — الشكل الشائع

```json
"crossFilterBindings": [
  {"crossFilter": "branchFilter"},
  {"crossFilter": "dateFrom"},
  {"crossFilter": "dateTo"}
]
```

كل مدخل يُشير إلى `BICrossFilter` بالـ`code`. عند وجود قيمة للفلتر، يُحقن الخادم جملة WHERE في SQL الخاص بالـwidget. الحقول الاختيارية لكل مدخل: `sqlLeftHandSide` (تجاوز)، و`operator` (تجاوز)، و`customWhereClause`، و`localScope`.

### مستوى لوحة البيانات (`DashBoard.crossFilterBindings`) — التجاوزات فقط، **`element` مطلوب**

```json
"crossFilterBindings": [
  {"element": "ex-top-items", "crossFilter": "branchFilter", "operator": "In"}
]
```

تحمل مدخلات مستوى لوحة البيانات حقل `element` **مطلوباً** إضافياً يُسمّي الـwidget المستهدف. توجد فقط لتجاوز ربط واحد لـwidget محدد على هذه اللوحة.

**لا تستخدم روابط مستوى لوحة البيانات بديلاً عن روابط مستوى الـwidget.** مدخل مجرد `{"crossFilter": "X"}` في نطاق لوحة البيانات غير صالح.

**مثال على التدفق:**
1. `BICrossFilter` بكود `"branchFilter"` لديه `sqlLeftHandSide: "l.branch_id"` و`operator: "Equal"`
2. Widget X لديه `crossFilterBindings: [{"crossFilter": "branchFilter"}]`
3. ينقر المستخدم على فرع في widget آخر، مُعيِّناً `branchFilter`
4. يُعيد Widget X جلب البيانات؛ يستبدل الخادم `/*AND-FILTERS*/` بـ`AND l.branch_id = <selected branch ID>`

### المشغِّلات المدعومة

| المشغِّل | SQL | حالة الاستخدام |
|---|---|---|
| `Equal` | `=` | مطابقة تامة (الافتراضي) |
| `In` | `IN (...)` | تحديد متعدد القيم |
| `GreaterThanOrEqual` | `>=` | من تاريخ، الحد الأدنى للقيمة |
| `LessThanOrEqual` | `<=` | إلى تاريخ، الحد الأقصى للقيمة |
| `GreaterThan` | `>` | أكبر بشكل صارم |
| `LessThan` | `<` | أصغر بشكل صارم |
| `NotEqual` | `<>` | الاستبعاد |
| `Contains` | `LIKE '%value%'` | البحث النصي |
| `StartsWith` | `LIKE 'value%'` | مطابقة بادئة النص |

هذه هي المشغِّلات الوحيدة التي يطبّقها الفلتر المتقاطع.

### النطاق المحلي للـWidget (`localScope`)

تحمل روابط cross-filter علامة `localScope` اختيارية:

```json
"crossFilterBindings": [
  {"crossFilter": "regionFilter", "localScope": true},
  {"crossFilter": "dateFrom"}
]
```

عندما يكون `localScope` هو `true` لربط ما، فإن الفلتر ينتمي إلى نافذة الفلتر المنبثقة الخاصة بالـwidget بدلاً من شريط الفلتر العام للوحة البيانات. تحديداً:

- يُظهر الـwidget زر فلتر في رأسه. النقر عليه يفتح نافذة منبثقة بإدخال واحد لكل ربط `localScope`.
- cross-filters المُصدَرة بالنقر من مخططات أخرى، والقيم المُدخَلة في شريط فلتر لوحة البيانات، **تُتجاهل** لروابط `localScope`.
- إذا كان كل ربط لكود cross-filter معين `localScope`، يختفي ذلك الكود من شريط فلتر لوحة البيانات تماماً.
- طلب drill-down الذي يستهدف كود مرتبطاً بـ`localScope` لا يزال يُمرر قيمته.

استخدم `localScope` عندما يحتاج مخطط واحد إلى محدد مستقل لا يجب أن ينتشر إلى الـwidgets الشقيقة.

---

## 7. مواصفات تنسيق الأرقام

يوجد شكلان للتنسيق — اختر بحسب فئة الـwidget:

| أين يُستخدم | الشكل | حقل رمز العملة |
|---|---|---|
| ECharts `dataMapping.series[].format` (القسم 3) | كائن `format` أدناه | `currency` |
| عمود EnhancedTable / فتحة EnhancedMetricsCard `formatting` (القسمان 14.4.1 و15.2) | كائن `formatting` أغنى | `currencySymbol` (أيضاً `currencyCode` و`currencyPlacement`) |
| `MetricsCards` القديمة `metricsCardConfig.numberFormat` | سلسلة قناع numeral.js (مثل `"0,0"`) بالإضافة إلى `suffix` منفصل | لا ينطبق |

الشكلان **غير قابلَين للتبادل** — وضع `currency: "SAR"` على عمود EnhancedTable لا يُنتج شيئاً؛ ووضع `currencySymbol: "SAR"` في تنسيق سلسلة ECharts لا يُنتج شيئاً.

### تنسيق سلسلة ECharts (`dataMapping.series[].format`)

```json
"format": {
  "type": "currency",
  "decimals": 0,
  "compact": true,
  "currency": "SAR"
}
```

| الحقل | القيم | الوصف |
|---|---|---|
| `type` | `"number"` أو `"currency"` أو `"percent"` أو `"compact"` | وضع التنسيق |
| `decimals` | `0` أو `1` أو `2` إلخ | الخانات العشرية |
| `compact` | `true` / `false` | استخدام الترميز المضغوط (1K و1M و1B) |
| `currency` | `"SAR"` أو `"USD"` إلخ | رمز العملة. إذا حُذف والنوع `"currency"`، يُستخدم العملة الافتراضية للنظام. |

---

## 8. كيان BICrossFilter

cross-filters كيانات ملف رئيسي تُعرِّف معاملات فلتر قابلة لإعادة الاستخدام. تُنتج بيانات وصفية من نوع `QuestionField` لعرض عناصر تحكم واجهة مستخدم الفلتر.

```json
{
  "code": "branchFilter",
  "name1": "فلتر الفرع",
  "name2": "Branch Filter",
  "paramType": "Reference",
  "referencedEntityType": "Branch",
  "listParam": true,
  "listDisplayType": "Chips",
  "arTitle": "الفرع",
  "enTitle": "Branch",
  "sqlLeftHandSide": "l.branch_id",
  "operator": "In"
}
```

| الحقل | مطلوب | الوصف |
|---|---|---|
| `code` | نعم | معرّف فريد، مُشار إليه من الـwidgets |
| `name1` / `name2` | نعم | الاسم العربي / الإنجليزي |
| `paramType` | نعم | النوع العددي الأساسي. القيم المسموح بها: `"Text"` و`"Integer"` و`"Long"` و`"Decimal"` و`"Boolean"` و`"Date"` و`"Time"` و`"Reference"` و`"Genericreference"` و`"BigText"` و`"Enum"` و`"ID"` و`"EntityType"` و`"Password"` و`"LatLng"`. (لا توجد قيمة `"ListParam"` — وضع متعدد القيم هو علامة `listParam` الأعمدية المنفصلة.) |
| `listParam` | لا | عندما `true`، يستطيع المستخدم اختيار عدة قيم. استخدمه مع `operator: "In"`؛ ويعمل فلتر `In` بدونه بالقيمة الواحدة المختارة. |
| `listDisplayType` | لا | واجهة العرض لفلاتر `listParam: true`: `"Default"` أو `"Dropdown"` أو `"Chips"` (شريط الرقائق هو الأكثر شيوعاً). ويُظهر `Chips` مربع بحث وزر «عرض المزيد» عندما تتجاوز القائمة صفحة واحدة من الخيارات (حجم الصفحة 25)، فتبقى القوائم الطويلة قابلة للاختيار؛ ويظل `Dropdown` الخيار الأكثر اختصاراً للقوائم الطويلة جداً. |
| `referencedEntityType` | إذا `paramType=Reference` | نوع الكيان (مثل `"Branch"` أو `"Customer"` أو `"InvItem"`) |
| `arTitle` / `enTitle` | لا | التسميات المُترجَمة المعروضة في شريط الفلتر. |
| `sqlLeftHandSide` | نعم | الطرف الأيسر من شرط WHERE: عمود (مثل `"l.branch_id"`) أو أي تعبير SQL بدءاً من إصدار 20260929؛ راجع **الفلترة على قيمة محسوبة** أدناه. لفلاتر `Reference`، أشر إلى **عمود ID** — ليس عمود اسم أو كود. |
| `operator` | نعم | مشغِّل المقارنة (انظر §6). وللاختيار المتعدد استخدم `"In"` مع `listParam: true`. |
| `customWhereClause` | لا | جزء WHERE مخصص كامل (يُلغي `sqlLeftHandSide` + `operator`). |
| `required` | لا | يجب أن يكون للفلتر قيمة قبل تشغيل أي استعلام widget. |
| `defaultValue` | لا | القيمة الأولية المُطبَّقة عند تحميل لوحة البيانات. ويقبل فلتر `Reference` أيضاً `$currentUser()` و`$currentUserEmployee()`؛ راجع **القيمة الافتراضية بالمستخدم الحالي** أدناه. |
| `allowedValues` | لا | قائمة بيضاء من القيم الحرفية المقبولة (للتحقق فقط). |
| `hidden` | لا | إخفاء من شريط الفلتر (لا يزال قابلاً للتطبيق عبر URL أو click-emit). |
| `requiredGroup` | لا | كود مجموعة "واحد على الأقل من" للفلاتر المتعددة. |
| `criteriaExpression` | لا | معايير من جانب الخادم لمنتقي مرجع الفلتر. والصيغة هي صيغة `filter` في مدخلات التقارير نفسها، ومنها استبدال `${otherFilterCode}` — راجع [تضييق ما يستطيع المستخدم اختياره](/ar/platform/reports/reports-guide#tDyyq-m-ystTyaa-lmstkhdm-khtyrh). |
| `suggestionQuery` | لا | SQL مخصص يُعيد صفوف اقتراحات للمنتقيات التلقائية. |
| `comparisonConfig` | لا | كود `BIPeriodComparisonConfig` (الإزاحة وتسميتا الفترتين) — راجع [10.5](#105-mSfwf-BIPeriodComparisonConfig-khtyry). ضعه على كل فلتر تاريخ يجب أن يُزاح. |
| `showAsDateRange` | لا | عرض الفلتر كمنتقي نطاق واحد من/إلى يتوسّع إلى مُدخلَين مربوطَين — انظر القسم 8a. |
| `autoCreateWidget` | لا | عند true، يُنشئ حفظ cross-filter أيضاً widget `CrossFilterControl` مقترناً. |
| `hideFilterTitle` | لا | إخفاء تسمية العنوان عبر جميع طرق العرض. |

**عقد Operator/listParam:**

| `operator` | `listParam` | السلوك |
|---|---|---|
| `Equal` / `NotEqual` / `>` / `>=` / `<` / `<=` / `Contains` / `StartsWith` | `false` (أو محذوف) | قيمة واحدة. |
| `In` | `true` | متعدد القيم؛ يُصدر `IN (...)` بالقيم المختارة. |
| `In` | `false` (أو محذوف) | قيمة واحدة؛ يُصدر `IN (value)`. |

**الفلترة على قيمة محسوبة**: بدءاً من إصدار 20260929 يقبل `sqlLeftHandSide` أي تعبير SQL، لا عموداً فقط. لنفترض أن التسليمات التي ليس لها حالة يجب أن تُحسب «لم تُسلَّم»:

```json
"sqlLeftHandSide": "ISNULL(d.delivStatus, 'NotDelivered')"
```

يضع الخادم التعبير كما كُتب على يسار مشغِّل الفلتر، أي `ISNULL(d.delivStatus, 'NotDelivered') = ?`، فتعمل الدوال و`CASE` والعمليات الحسابية كلها، ولو احتوت على فواصل. ويُشترط ألا يحتوي التعبير على الأقواس المعقوفة `{ }` لأن محرك الاستعلام يحجزها لمواضع المُدخلات. وفي الـwidget المبني بالمعالج يظل الاسم المنقَّط المجرد يُقرأ مساراً لحقل في المعالج، وأي شيء غيره يُمرَّر إلى SQL كما هو.

وإذا ظهرت في أحد الـwidgets الرسالة التالية، فالخادم على إصدار أقدم من 20260929، وهو الإصدار الذي خُفِّفت فيه هذه الشروط على `sqlLeftHandSide` (وليس للرسالة ترجمة عربية، فتظهر بالإنجليزية على الشاشات العربية أيضاً):

*Invalid cross-filter SQL expression: {0}. Must be a simple column reference (e.g., invoice.valueDate, t.customerId).*

**القيمة الافتراضية بالمستخدم الحالي**: يمكن لفلتر `Reference` أن يُفتح مضبوطاً مسبقاً على من يشاهد لوحة البيانات:

| `defaultValue` | القيمة التي يأخذها |
|---|---|
| `$currentUser()` | المستخدم الحالي. استخدمه في فلتر `referencedEntityType` فيه `User`. |
| `$currentUserEmployee()` | الموظف المرتبط بالمستخدم الحالي (بدءاً من إصدار 20260929). استخدمه في فلتر `referencedEntityType` فيه `Employee`، مثل فلتر السائق أو المندوب الذي يعرض لكل موظف سجلاته هو فقط. |

وتُحسب هذه الدوال في كل مرة تُحمَّل فيها لوحة البيانات، فتخدم لوحة واحدة جميع المستخدمين. أما المستخدم الذي لا يرتبط به موظف فيظل الفلتر مطبَّقاً عليه لكنه لا يطابق أي سجل، فتظهر الـwidgets المربوطة به فارغة لهذا المستخدم. اربط موظفاً بالمستخدم، أو اترك `defaultValue` فارغاً في لوحات البيانات التي يفتحها أمثال هذا المستخدم.

---

### 8a. الفلاتر المتقاطعة من نوع نطاق التاريخ (`showAsDateRange`)

`showAsDateRange: true` يحوّل سجل فلتر متقاطع واحد إلى زوج من/إلى. يبقى السجل واحداً (`BICrossFilter` واحد)، ويشتق منه الخادم مُدخلَين مربوطَين.

```json
{
  "code": "docDate",
  "name1": "تاريخ المستند",
  "name2": "Document Date",
  "paramType": "Date",
  "showAsDateRange": true,
  "arTitle": "الفترة",
  "enTitle": "Period",
  "sqlLeftHandSide": "h.value_date"
}
```

**أسماء المُدخلات المشتقة** — كود الفلتر بحرف أول كبير، مسبوقاً بـ `From` و`To`:

| `code` | مُدخل «من» | مُدخل «إلى» |
|---|---|---|
| `docDate` | `FromDocDate` | `ToDocDate` |

أما كود الفلتر نفسه فلا يُربط أبداً كمُدخل في حالة نطاق التاريخ — الزوج المشتق وحده هو المربوط.

**شروط WHERE المولَّدة** — لكل widget مرتبط بالفلتر:

```sql
h.value_date >= :FromDocDate
h.value_date <= :ToDocDate
```

ولا يُصدَر أي شرط إلا إذا كان طرفه ذا قيمة، فالنطاق المفتوح من جهة يعطي شرطاً واحداً. و`operator` — على الفلتر وعلى الربط — **يُتجاهل**، إذ إن الزوج ثابت على `>=` / `<=`. أما `customWhereClause` (على الفلتر أو على الربط) فيظل الأسبق: يستبدل الزوج كله بـ SQL الذي كتبته.

**صيغة القيمة المخزَّنة** — يخزّن المنتقي نصاً واحداً بإحدى صيغتين:

| الصيغة | مثال | المعنى |
|---|---|---|
| مفتاح مدة جاهزة | `ThisMonth` | يُعاد حسابه بالنسبة لـ*اليوم* عند كل جلب |
| نطاق صريح | `2026-01-01@2026-03-31` | تاريخان حرفيان بصيغة `yyyy-MM-dd` يفصلهما `@` |

مفاتيح المدد الجاهزة: `Today` و`Yesterday` و`ThisWeek` و`PreviousWeek` و`ThisMonth` و`PreviousMonth` و`ThisQuarter` و`PreviousQuarter` و`ThisYear` و`PreviousYear` و`Last7` و`Last30` و`Last90` و`Last365`. والأسبوع يبدأ الأحد وينتهي السبت، و`Last7` تعني اليوم والستة أيام التي قبله. و`defaultValue` يقبل الصيغتين.

ولأن المدة الجاهزة تخزّن المدة لا التاريخين، فاللوحة المحفوظة بـ`ThisMonth` تسير مع التقويم بدل أن تتجمد على الشهر الذي أُعدّت فيه.

**كيف تُعرض القيمة** — تعرض رقائق الفلاتر (chips) والشارات (badges) ونافذة drill-down النطاق الصريح بصيغة «من – إلى» (التاريخان معاً)، ويعرض النطاق المفتوح من جهة الطرفَ المحدد وحده.

**ملاحظات على الربط:**

- `listParam` و`listDisplayType` لا ينطبقان — النطاق قيمة واحدة لا اختيار متعدد.
- `paramType` هو `Date`، لكن القيمة المنتقلة بين الواجهة والخادم هي نص النطاق أعلاه لا تاريخ.
- ربط `localScope` يتصرف كما مع أي فلتر آخر: ينتقل الزوج إلى حوار الفلاتر الخاص بالـwidget.
- `comparisonConfig` يوضع على السجل الواحد: وفي تشغيل الفترة السابقة يُزاح المُدخلان المشتقان معاً بمقدار المدة المطروحة في الـconfig.

---

## 9. أنواع الـWidget

| النوع | طريقة العرض | هل chartConfigJSON مطلوب؟ |
|---|---|---|
| `EChart` | مخطط ECharts (يستخدم echartOption + dataMapping) | نعم |
| `Table` | جدول AG Grid (الأعمدة من SQL، الصفوف من البيانات) | لا |
| `EnhancedTable` | جدول AG Grid مُشغَّل بالكامل بواسطة `chartConfigJSON.columns`. انظر القسم 14. | نعم |
| `CrossFilterControl` | widget فلتر slicer — يُعرض `BICrossFilter` واحد كمحرر على شبكة لوحة البيانات. يتطلب فقط `crossFilterRef`. انظر القسم 9a. | لا |
| `TextBlock` | widget HTML غني غير بياني. الاستخدام الرئيسي: رؤوس أقسام وعناوين. انظر القسم 9b. | نعم |
| `EnhancedMetricsCard` | شريط بطاقات مؤشرات مقاد بالـJSON — بطاقات وخانات وخطوط اتجاه مصغّرة وتلوين شرطي. انظر القسم 15. | نعم |
| `MetricsCards` | بطاقات مؤشرات قديمة تُقاد بحقول `metricsCardConfig` على سجل الـwidget لا بـ`chartConfigJSON`. | لا |
| `PieChart` و`ColumnWithRotatedLabels` إلخ | أنواع Highcharts القديمة (تُترجم تلقائياً إلى ECharts من جانب الخادم) | لا |

بالنسبة لـwidgets `Table`، تصبح أسماء أعمدة SQL رؤوس أعمدة الشبكة. لا يلزم `chartConfigJSON` — فقط أدرج `dataSource` بـSQL و`crossFilterBindings`.

بالنسبة لـwidgets `EnhancedTable`، كل عمود مُعلَن صراحةً في `chartConfigJSON` مع مواصفات التنسيق ومُصيِّر الخلية وقواعد التنسيق الشرطي. انظر القسم 14 للـschema الكامل.

بالنسبة لـwidgets `CrossFilterControl`، لا `dataSource` ولا `chartConfigJSON` ولا `crossFilterBindings`. فقط `crossFilterRef` مطلوب.

---

## 9a. Widget CrossFilterControl

يُعرض `BICrossFilter` واحد كـslicer على شبكة لوحة البيانات. يمكن وضع نفس cross-filter في أكثر من widget؛ يُسمح بوجود عدة widgets `CrossFilterControl` لكل لوحة بيانات.

![أربعة widgets للتحكم في الفلاتر المتقاطعة موضوعة كبلاطات على شبكة لوحة المعلومات، ومنتقي الشركة مفتوح يعرض مربع البحث وقائمة مربعات الاختيار](images/bi-crossfilter-control-widget-ar.png)

```json
{
  "code": "branchFilter",
  "name1": "فلتر الفرع",
  "name2": "Branch Filter",
  "type": "CrossFilterControl",
  "crossFilterRef": "branchFilter"
}
```

أسرع طريقة لإنشائه هي تعيين `autoCreateWidget: true` على `BICrossFilter` (القسم 8) — حفظ cross-filter يُنشئ الـwidget المقترن. وإلا أنشئ الـwidget يدوياً باستخدام JSON أعلاه.

عندما تحتوي لوحة البيانات على `CrossFilterControl` لكود ما، يُخفى ذلك الفلتر من نافذة تعديل الشريط العام؛ لا تزال القيمة النشطة تظهر كـchip في الشريط.

---

## 9b. Widget TextBlock

widget HTML غني غير بياني. الاستخدام الرئيسي: رؤوس أقسام تفصل مجموعات الـwidgets البيانية على لوحة بيانات. أيضاً العناوين الفرعية والأوصاف والتعليمات.

لا `dataSource`، ولا `crossFilterBindings`، ولا `wizardDataSource`. الـwidget مُصيِّر ثابت؛ `chartConfigJSON` يحمل المحتوى وأنماط الإطار.

```json
{
  "code": "salesHeader",
  "name1": "ترويسة المبيعات",
  "name2": "Sales Header",
  "type": "TextBlock",
  "chartConfigJSON": {
    "html": "<h2>أداء المبيعات</h2>",
    "htmlEn": "<h2>Sales Performance</h2>",
    "bgColor": "#f5f5f5",
    "padding": "8px",
    "textAlign": "center"
  }
}
```

مفاتيح `chartConfigJSON` (جميعها اختيارية، لكن يلزم واحد على الأقل من `html` / `htmlEn` كي يعرض الـwidget شيئاً):

| المفتاح | التأثير |
|---|---|
| `html` | المحتوى العربي، يُصيَّر كـHTML. يُؤلَّف في تبويب **نص عربي** بالمصمم (المحرر الغني أو صندوق HTML الخام). |
| `htmlEn` | المحتوى الإنجليزي. التأليف نفسه، في تبويب **نص إنجليزي**. |
| `bgColor` | `background-color` للغلاف. |
| `color` | `color` للغلاف (لون النص الافتراضي). |
| `padding` | اختصار CSS (مثل `8px` أو `8px 12px`). |
| `fontSize` | `font-size` للغلاف. |
| `borderColor` و`borderWidth` و`borderRadius` | حدود الغلاف. |
| `textAlign` | `left` / `center` / `right` / `justify`. |

ومفتاحا المحتوى مستقلان عن أنماط الإطار التي تنطبق على اللغتين معاً. وكل لغة ترتد إلى الأخرى عند خلوّ مفتاحها: الواجهة العربية تعرض `html`، أو `htmlEn` إن كان `html` فارغاً؛ والواجهة الإنجليزية تعرض `htmlEn`، أو `html` إن كان `htmlEn` فارغاً. لذا يظل أي widget أُنشئ قبل وجود `htmlEn` يعرض كتلة `html` الوحيدة في اللغتين.

---

## 10. صيغة الاستيراد الجماعي JSON

يدعم Nama ERP استيراد إعداد لوحة بيانات كاملة (cross-filters وwidgets وwizards وتخطيط لوحة البيانات) من ملف JSON واحد.

::: warning تحفظ عبر `ImportRecord`؟ أرسل `chartConfigJSON` كنص
كل الأمثلة في هذا المرجع تكتب `chartConfigJSON` ككائن JSON متداخل. وهذه الصيغة لا تصلح إلا في **ملف**
استيراد يُحمَّل بأمر **استيراد سجلات** (راجع [كيفية الاستيراد](#kyfy-lstyrd)). أما حين يحفظ مساعد الذكاء
الاصطناعي widget بأداة `ImportRecord` فيجب أن تكون `chartConfigJSON` **نصاً** JSON — الإعداد كله محوَّلاً
إلى سلسلة نصية، `"chartConfigJSON":"{\"series\":[…]}"`. والكائن المتداخل المُرسَل هناك يُقرأ كمرجع إلى
سجل آخر، فيُحفظ الـ widget بلا إعداد مخطط صالح.
:::

::: tip ملف نموذجي
مثال كامل يعمل من البداية إلى النهاية متاح: [HR_DASHBOARD_IMPORT.json](/HR_DASHBOARD_IMPORT.json). نزّله واستورده عبر تدفق الاستيراد الجماعي الموضح في [كيفية الاستيراد](#kyfy-lstyrd).
:::

### الهيكل الرئيسي

```json
{
  "BIPeriodComparisonConfig": [ ],
  "BICrossFilter": [ ],
  "DashBoardWidgetWizard": [ ],
  "DashBoardWidget": [ ],
  "DashBoard": [ ]
}
```

كل المفاتيح اختيارية — أدرج فقط أنواع الكيانات التي تحتاجها. تُنشأ السجلات بترتيب ظهور المفاتيح في الملف، فحافظ على الترتيب أعلاه: كل نوع لا يشير إلا إلى أنواع مذكورة قبله، وهو الترتيب الذي يكتبه أمر **تصدير اللوحة JSON**. والإشارات بين الكيانات تكون بالـ `code` لا بالمعرّفات. ولا يلزم `BIPeriodComparisonConfig` إلا لمقارنة الفترات — راجع [10.5](#105-mSfwf-BIPeriodComparisonConfig-khtyry).

### 10.1 مصفوفة BICrossFilter

كل مدخل يُنشئ كيان ملف رئيسي `BICrossFilter`. انظر القسم 8 لتعريفات الحقول.

```json
{
  "code": "branchFilter",
  "name1": "فلتر الفرع",
  "name2": "Branch Filter",
  "paramType": "Reference",
  "referencedEntityType": "Branch",
  "arTitle": "الفرع",
  "enTitle": "Branch",
  "sqlLeftHandSide": "l.branch_id",
  "operator": "Equal"
}
```

### 10.2 مصفوفة DashBoardWidget

كل مدخل يُنشئ كيان `DashBoardWidget`. الحقول الرئيسية:

```json
{
  "code": "bi-sales-by-item",
  "name1": "المبيعات حسب الصنف",
  "name2": "Sales by Item",
  "chartTitle": "المبيعات حسب الصنف",
  "englishChartTitle": "Sales by Item",
  "type": "EChart",
  "dataSource": "SELECT ... WHERE 1=1 /*AND-FILTERS*/ ...",
  "chartConfigJSON": { },
  "horizontalMode": true,
  "crossFilterBindings": [
    {"crossFilter": "branchFilter"},
    {"crossFilter": "dateFrom"}
  ]
}
```

| الحقل | مطلوب | الوصف |
|---|---|---|
| `code` | نعم | كود widget فريد |
| `name1` / `name2` | نعم | الاسم العربي / الإنجليزي |
| `chartTitle` / `englishChartTitle` | لا | العنوان المُترجَم المعروض فوق المخطط. |
| `type` | نعم | أحد: `"EChart"` أو `"Table"` أو `"EnhancedTable"` أو `"EnhancedMetricsCard"` أو `"MetricsCards"` (قديم) أو `"CrossFilterControl"` أو `"TextBlock"` أو `"PieChart"` وغيرها. انظر §9. |
| `dataSource` | معظم الأنواع | استعلام SQL مع placeholder `/*AND-FILTERS*/`. يُتخطى لـ`CrossFilterControl` و`TextBlock`. |
| `chartConfigJSON` | إذا EChart / EnhancedTable / EnhancedMetricsCard / TextBlock | **كائن** JSON متداخل يُكتب مباشرةً بلا تهريب. يتولّى الاستيراد تسلسله إلى السلسلة المخزَّنة نيابةً عنك. وتظل القيم القديمة على هيئة سلسلة مُهرَّبة مقبولة. |
| `wizardDataSource` | لا | كود كيان `DashBoardWidgetWizard` (بديل لـSQL الخام). انظر §13. |
| `horizontalMode` | لا | تلميح تخطيط. على widgets `CrossFilterControl`، true = شريط chip مضمَّن، false = محرر مكدَّس. |
| `crossFilterBindings` | لا | مصفوفة من `{"crossFilter": "filterCode"}` (مستوى widget — انظر §6). |
| `metricsCardConfig` | إذا type=`MetricsCards` | كائن قيمة على المستوى الرئيسي (ليس داخل `chartConfigJSON`). انظر §15.1. |
| `crossFilterRef` | إذا type=`CrossFilterControl` | سلسلة مجردة — كود الـ`BICrossFilter` (مثل `"branchFilter"`). **لا** تستخدم كائناً (`{"code": "..."}`) — الاستيراد يرفضه برسالة "لا يمكن ترك crossFilterRef فارغاً". انظر §9a. |
| `enableComparison` | لا | يُبدِّل تنفيذ مقارنة الفترة. |
| `mergeComparisonByColumns` | لا | CSV لأسماء الأعمدة التي تُشكِّل مفتاح الدمج. |
| `comparisonDataMapping` | لا | جدول يقسم المقياس إلى عمود للفترة الحالية وعمود للفترة السابقة: `[{"originalColumn": "netValue", "previousPeriodColumn": "prevNetValue"}]`. فصفوف الفترة السابقة تنقل قيمة `netValue` إلى `prevNetValue`، فيرسم المخطط الاثنين سلسلتين منفصلتين. راجع [10.5](#105-mSfwf-BIPeriodComparisonConfig-khtyry). |

::: info
تُكتب قيمة `chartConfigJSON` ككائن JSON **متداخل** في ملفات الاستيراد/التصدير — بلا تهريب وبلا تسلسل يدوي إلى سلسلة. يتولّى النظام تسلسلها إلى سلسلة JSON المخزَّنة عند الاستيراد، ويعيد تحليلها إلى كائن عند التصدير. وتظل الملفات القديمة التي تحمل `chartConfigJSON` كسلسلة مُهرَّبة تُستورَد دون تغيير. أما حفظ widget عبر أداة الذكاء الاصطناعي `ImportRecord` فمختلف — راجع التحذير في أول هذا القسم.
:::

### 10.3 مصفوفة DashBoardWidgetWizard (اختيارية)

تُعرِّف Wizards مصادر البيانات باستخدام معرّفات الحقول بدلاً من SQL الخام. يُنشئ النظام SQL من تعريف wizard ويُتيح عدة ميزات. انظر القسم 13.

```json
{
  "code": "bi-sales-breakdown",
  "name1": "bi-sales-breakdown",
  "name2": "bi-sales-breakdown",
  "type": "EChartDataSource",
  "tableType": "DetailLine",
  "mainTable": "SalesInvoiceLine",
  "fields": [
    {"fieldId": "customer.customerCategory", "chartUsageType": "Dimension"},
    {"fieldId": "genericDimensions.branch", "chartUsageType": "Dimension"},
    {"fieldId": "price.netValue", "sqlAggregationType": "Sum", "chartUsageType": "Measure"}
  ]
}
```

| الحقل | مطلوب | الوصف |
|---|---|---|
| `code` | نعم | كود wizard فريد (مُشار إليه من `wizardDataSource` للـwidget) |
| `type` | نعم | دائماً `"EChartDataSource"` |
| `tableType` | نعم | `"Entity"` أو `"DetailLine"` أو `"SystemTable"` أو `"VirtualEntity"` |
| `mainTable` | نعم | اسم جدول/نوع كيان قاعدة البيانات |
| `fields[].fieldId` | نعم | مسار الخاصية (مثل `"customer.customerCategory"`) |
| `fields[].chartUsageType` | نعم | `"Dimension"` أو `"Measure"` |
| `fields[].sqlAggregationType` | إذا Measure | `"Sum"` أو `"Count"` أو `"DistinctCount"` أو `"Avg"` أو `"Min"` أو `"Max"` |

### 10.4 مصفوفة DashBoard

كل مدخل يُنشئ كيان `DashBoard`. نوعان: **`Single`** (شبكة widgets) و**`Tabbed`** (أب يؤلف لوحات Single كتبويبات).

#### لوحة بيانات Single (شبكة widgets)

```json
{
  "code": "bi-sales-dashboard",
  "name1": "لوحة تحليل المبيعات",
  "name2": "Sales Analysis Dashboard",
  "kind": "Single",
  "rowsCount": 3,
  "colsCount": 3,
  "charts": [
    { "element": "bi-sales-by-item",   "rowNumber": 1, "columnNumber": 1, "heightInRows": 1, "widthInColumns": 2 },
    { "element": "bi-monthly-trend",   "rowNumber": 2, "columnNumber": 1, "heightInRows": 2, "widthInColumns": 3 }
  ],
  "crossFilterBindings": []
}
```

ينتهي أبعد widget هنا على الصف 3 من 3، فتملأ هذه اللوحة شاشة واحدة بالضبط ولا تمرّر أبداً — يأخذ
مخطط الاتجاه ثلثي الارتفاع ويأخذ الـ widget العلوي الثلث. وهذه هي الصورة الصحيحة للوحة ملخّص،
والخاطئة لأي لوحة فيها جدول؛ والقسم التالي يشرح السبب.

#### تحديد الأحجام والتمرير (Sizing and scrolling)

`rowsCount` **ليس** عدد خلايا ثابتة الارتفاع، بل هو **مقام قسمة**. تأخذ اللوحة الارتفاع المتاح لها
على الشاشة وتقسمه على `rowsCount`، فيصير الصف الواحد `الارتفاع المتاح ÷ rowsCount`، ويصير الـ widget
`heightInRows ÷ rowsCount` من الشاشة. لا توجد قيمة بالبكسل لـ«الصف» في النظام كله؛ الصف لا يعني شيئاً
إلا بالنسبة إلى `rowsCount` الخاص بنفس اللوحة: فـ `heightInRows: 6` هو نصف الشاشة حين يكون
`rowsCount` يساوي `12`، وثُمن الشاشة حين يكون `48`.

والنتيجة التي يخطئ فيها المؤلفون دائماً: **رفع `rowsCount` يُصغّر كل شيء ولا يُكبّره.** لتكبير widget
ارفع `heightInRows` الخاص به وحده؛ أما `rowsCount` فهو المقياس الذي تُقاس عليه لا أكثر.

و«الارتفاع المتاح» هو منطقة التمرير الخاصة باللوحة — نافذة المتصفح ناقص شريط أدوات البرنامج وناقص
شريط الفلاتر/التبويبات فوق الـ widgets. ولكل widget أيضاً هامش داخلي بضعة بكسلات داخل حيّزه، فيكون
الـ widget نفسه أقصر قليلاً من حصته.

##### متى تمرّر اللوحة (When a dashboard scrolls)

ترسم اللوحة من الصفوف بقدر ما يحتاجه أبعد widget، حتى لو تجاوز ذلك `rowsCount`:

```
المدى (extent)   = أكبر قيمة لـ (rowNumber + heightInRows - 1) بين كل الـ widgets
الصفوف المرسومة  = max(rowsCount, extent)
```

ثم تُوزَّع الصفوف بمقدار شاشة كاملة في كل مرة: كل مجموعة من `rowsCount` صفاً تأخذ ارتفاع شاشة واحدة
بالضبط. أي أن:

- `extent <= rowsCount` ← يُضغط كل شيء في شاشة واحدة و**لا تمرّر اللوحة أبداً**، مهما بلغ عدد
  الـ widgets فيها.
- `extent > rowsCount` ← يصير ارتفاع اللوحة `extent ÷ rowsCount` شاشة وتمرّر رأسياً.

::: warning فخ تساوي المدى مع عدد الصفوف
ضبط اللوحة بحيث ينتهي آخر widget على آخر صف تماماً — `extent == rowsCount` — يضمن أنها لن تمرّر
أبداً. عندئذٍ يُحشر كل شيء في شاشة واحدة، والمحتوى الطويل هو أول من يتضرر: الجدول الذي يأخذ حصة
صغيرة من شاشة واحدة يظهر كشريط عناوين بلا صفوف بيانات مرئية. فإن وجدت نفسك ترفع `rowsCount` لتكبير
جدول، فأنت في الحقيقة تُصغّره. ارفع `heightInRows` الخاص بالجدول ودع المدى يتجاوز `rowsCount`.
:::

##### شاشة واحدة مقابل التمرير — نفس الـ widgets ونفس الارتفاعات

| المقصود | `rowsCount` | ينتهي أبعد widget عند | النتيجة |
|---|---|---|---|
| ملء شاشة واحدة | 12 | 12 | لا تمرير. الجدول عند `heightInRows: 5` يأخذ 5/12 من الشاشة. |
| تقرير قابل للتمرير | 12 | 28 | تمرير بمقدار 2.3 شاشة تقريباً. الجدول نفسه ما زال يأخذ 5/12 من شاشة — لكنها الآن 5/12 من شاشة داخل صفحة يمرّر إليها القارئ. |

نقطة انطلاق عملية للوحة على هيئة تقرير: اختر `rowsCount` بمعنى «كم أريد أن يظهر من هذا دفعة واحدة،
بوحدات مريحة للتفكير» — و`12` رقم مريح — ثم ضع الـ widgets بالارتفاع الذي يحتاجه كلٌّ منها فعلاً ودع
المدى يتجاوز `rowsCount`. عادةً يكون شريط مؤشرات الأداء `heightInRows: 2`، والمخطط من `4` إلى `6`،
والجدول الذي يقرؤه المستخدم فعلاً من `8` إلى `12`.

::: tip الجداول تمرّر داخل حيّزها
لا يحتاج الجدول إلى حيّز يتسع لكل صفوفه. فكلا نوعَي الجدول يملأ الارتفاع الممنوح له ويمرّر داخلياً،
أي أن `heightInRows` يحدد كم صفاً يظهر *في وقت واحد* لا كم صفاً يستطيع الجدول أن يحمل. فمجموعة
نتائج من 70 صفاً ومجموعة من 700 صف تريدان الحيّز نفسه. وما تختاره أنت هو مقدار الشاشة الذي ينظر
إليه القارئ وهو يمرّر — وثلث الشاشة يُظهر نحو عشرة صفوف، وهذا أدنى ما يستحق العناء؛ وما دونه يجعل
القارئ يمرّر عبر ثقب.

ولذلك، في اللوحة الكلاسيكية «شريط مؤشرات في الأعلى وجدول طويل تحته»: اجعل `rowsCount: 12`، وشريط
المؤشرات عند `heightInRows: 2` على الصف 1 (وهو ذاتي الارتفاع أصلاً فسيأخذ ما تحتاجه بطاقاته)،
والجدول عند `heightInRows: 10` على الصف 3. عندئذٍ يكون المدى 12 مساوياً لـ `rowsCount` فلا تمرّر
الصفحة نفسها — بل تصير الشاشة كلها تحت المؤشرات جدولاً، ويمرّر القارئ داخله. وإن فضّلت أن تمرّر
الصفحة وأن يكون الجدول أطول من شاشة، فامنح الجدول `heightInRows: 14` بدلاً من ذلك.
:::

##### الصفوف لا تتساوى دائماً

تتساوى الصفوف فقط حين تحمل كلها widgets عادية. وثلاثة أشياء تقتطع ارتفاعها أولاً قبل قسمة الباقي:

- **صفوف الـ widgets ذاتية الارتفاع.** الصف الذي تكون *كل* الـ widgets الظاهرة فيه من الأنواع
  ذاتية الارتفاع المذكورة أدناه يأخذ ارتفاع محتواه بدل حصة من الشاشة. والقرار هنا على مستوى *الصف*
  لا على مستوى الـ widget: ضع مخططاً بجانب بطاقة مؤشرات في نفس الصف يعُد الصف صفاً عادياً، وتُمَطّ
  البطاقة لتملأه.
- **الـ widgets المطوية.** الصف الذي يطوي المستخدم widgets يتقلّص إلى شريط عنوان بارتفاع ثابت.
- **الباقي** يُقسَّم بالتساوي على الصفوف العادية في تلك الشاشة، مع تقريب إلى بكسلات صحيحة. وهذا
  التقريب هو سبب الفرق الطفيف بين لوحتين «يُفترض» أن تتطابقا — 10 صفوف من لوحة بـ 500 صف مقابل صف
  واحد من لوحة بـ 50 صفاً.

ولأن الصفوف ذاتية الارتفاع تُقتطع من ميزانية شاشتها بدل أن تدفع الباقي لأسفل، فإن widget ذاتي
الارتفاع وطويلاً جداً يترك أقل للصفوف العادية التي تشاركه الشاشة. وإن لم يترك لها شيئاً أُلغي حساب
الأحجام كله وعاد كل صف إلى ارتفاع محتواه.

أنواع الـ widgets ذاتية الارتفاع — هذه تتجاهل `heightInRows` في تحديد ارتفاعها (وما زال يحدد الصفوف
التي تشغلها):

**Metrics Cards** و**Metrics Cards v2 (Enhanced)** و**Card Menu** و**Text Block**
و**Cross-Filter Control** و**Recent Visits**.

وكل نوع آخر — جميع المخططات و**Table** و**Table v2 (Enhanced)** و**HTML** و**Calendar**
و**Resource View** و**Report** و**Timeline** — يملأ حيّزه بالضبط.

::: tip الصفوف الفارغة ليست مجانية
الصف الذي لا widget عليه يبقى صفاً عادياً ويأخذ حصة كاملة مثل غيره. فالفجوة في ترقيم الصفوف مساحة
بيضاء حقيقية: مفيدة إن قصدتها، ومساحة شاشة مهدورة إن لم تقصدها.
:::

##### الأعمدة تعمل بنفس الطريقة لكنها لا تمرّر

`colsCount` هو مقام القسمة الأفقي: عرض الـ widget هو `widthInColumns ÷ colsCount` من العرض المتاح.
والفرق أنه لا يوجد مقابل أفقي لمدى الصفوف — فالأعمدة لا تُضاف لتستوعب الزائد. أبقِ كل widget داخل
الحد `columnNumber + widthInColumns - 1 <= colsCount`.

##### اللوحات الفرعية تُحدَّد أحجامها باستقلال

كل تبويب في لوحة Tabbed هو لوحة Single تقسم **ارتفاعها هي** على **`rowsCount` الخاص بها**. والتبويبات
الشقيقة لا شأن لبعضها ببعض: يمكن أن يكون تبويب ملخصاً مضغوطاً في شاشة واحدة عند `rowsCount: 6`
ويكون التالي تقريراً طويلاً قابلاً للتمرير عند `rowsCount: 12` بمدى `30`. اضبط كل تبويب على حدة.

##### على الهواتف والشاشات الضيقة

تحت حد الشاشات الصغيرة تتوقف الشبكة عن كونها شبكة. تُرصّ الـ widgets في عمود واحد بعرض كامل، بترتيب
الصف ثم العمود، وتُتجاهل `rowsCount` و`colsCount` و`heightInRows` و`widthInColumns` كلها. ويتولى
`mobileMaxRowsCount` الأمر بمعنى «كم widget يظهر على شاشة هاتف واحدة» — فيأخذ كل widget عادي
`1 ÷ mobileMaxRowsCount` من الارتفاع المرئي، وتمرّر القائمة بعد ذلك. وتركه فارغاً (أو `0`) يترك القرار
للوحة: إن لم يكن فيها إلا widget عادي واحد أخذ الشاشة كلها، وإن كان فيها اثنان أو أكثر ظهر منها اثنان
في كل شاشة. وفي الحالتين لا يُرسم أي widget بارتفاع أقل من 260 بكسل، فالقيمة الكبيرة على هاتف قصير
تؤدي إلى التمرير لا إلى ضغط المخططات. أما الـ widgets ذاتية الارتفاع فتبقى على ارتفاع محتواها.

#### لوحة بيانات Tabbed (تؤلف لوحات Single فرعية)

```json
{
  "code": "hr-overview",
  "name1": "لوحة الموارد البشرية",
  "name2": "HR Overview",
  "kind": "Tabbed",
  "rowsCount": 1,
  "colsCount": 1,
  "subDashboards": [
    { "subDashboard": "hr-tab-overview",   "arTitle": "نظرة عامة",  "enTitle": "Overview" },
    { "subDashboard": "hr-tab-workforce",  "arTitle": "العمالة",    "enTitle": "Workforce" }
  ]
}
```

لا تحتوي اللوحة الأب Tabbed على `charts` خاصة بها — بل تُدرج `subDashboards` مع عناوين تبويب مُترجَمة. `rowsCount`/`colsCount` على الأب مطلوبان بالـschema لكنهما غير مستخدمَين؛ اضبط كليهما على `1`.

**مشاركة الفلاتر عبر التبويبات:** أعلن عن widget `CrossFilterControl` للفلتر المشترك وضعه على كل لوحة Single فرعية. نفس كيان `BICrossFilter` يجعل القيمة المختارة في أحد التبويبات مرئية في غيره.

#### مرجع الحقول

| الحقل | مطلوب | الوصف |
|---|---|---|
| `code` | نعم | كود لوحة بيانات فريد |
| `name1` / `name2` | نعم | الاسم العربي / الإنجليزي |
| `kind` | نعم | `"Single"` أو `"Tabbed"` |
| `rowsCount` / `colsCount` | نعم | **مقاما قسمة لا عددا خلايا.** الصف الواحد هو `الارتفاع المتاح ÷ rowsCount` والعمود الواحد هو `العرض المتاح ÷ colsCount`، ووضع الـ widgets يبدأ من 1 بالنسبة إليهما. رفع `rowsCount` يُصغّر كل widget. اقرأ [تحديد الأحجام والتمرير](#tHdyd-lHjm-wltmryr-Sizing-and-scrolling) قبل اختيار القيم. الوضع الأبي Tabbed: اضبط كليهما على `1`. |
| `charts` | Single فقط | مصفوفة من أماكن الـwidgets (`element` و`rowNumber` و`columnNumber` و`heightInRows` و`widthInColumns`). |
| `subDashboards` | Tabbed فقط | مصفوفة من `{subDashboard, arTitle, enTitle}`. |
| `crossFilterBindings` | لا | **تجاوزات** مستوى لوحة البيانات — كل مدخل يحتاج `element` بالإضافة إلى `crossFilter`. عادةً `[]`. انظر §6. |
| `totalDashboardRowsCount` | لا | حقل خاص بوقت التصميم فقط — ارتفاع لوحة الرسم في محرر التخطيط. تأخذ اللوحة المعروضة أحجامها وتمريرها من `rowsCount`/`colsCount` ومواضع الـ widgets، فاتركه فارغاً أو عند `0` عند التأليف بالاستيراد، ولا تحاول إبقاءه متسقاً مع `rowsCount` أو مع مدى الـ widgets. وفتح محرر التخطيط والضغط على OK يكتب فيه قيمة إن كان فارغاً. |
| `mobileMaxRowsCount` | لا | خاص بتخطيط الهاتف فقط: كم widget يظهر على شاشة ضيقة واحدة. على الهواتف تُلغى الشبكة — تُرصّ الـ widgets بعرض كامل بترتيب الصف ثم العمود وتُتجاهل `rowsCount` و`colsCount` و`heightInRows` و`widthInColumns` — ويأخذ كل widget عادي `1 ÷ mobileMaxRowsCount` من الارتفاع المرئي، وليس أقل من 260 بكسل أبداً. وتركه فارغاً أو `0` يعني التوزيع الآلي: widget واحد لكل شاشة إن لم يكن في اللوحة إلا widget عادي واحد، وإلا فاثنان. |
| `refreshDashboardPer` | لا | كائن قيمة `TimePeriod` (مثل `{"value": 5, "uom": "Minute"}`) — فترة التحديث التلقائي. |

### 10.5 مصفوفة BIPeriodComparisonConfig (اختيارية)

تشغّل مقارنة الفترات استعلام الـ widget مرتين — مرة للتواريخ التي اختارها المستخدم ومرة للتواريخ نفسها
بعد إزاحتها إلى الوراء — ثم تدمج النتيجتين. يحدد سجل الإعداد مقدار الإزاحة واسم كل فترة؛ وتشير إليه فلاتر
التاريخ المتقاطعة عبر `comparisonConfig`، ويضبط كل widget يُراد أن يقارن `enableComparison: true`. ويشرح
قسم [مقارنة الفترات](/ar/platform/bi/bi-module-guide.md#mqrn-lftrt-Period-Comparison) في الدليل الطريقتين اللتين يعرض بهما
المخطط النتيجة.

```json
{
  "code": "yoy-comparison",
  "name1": "مقارنة سنوية",
  "name2": "Year-over-Year Comparison",
  "subtractedPeriod": {"value": 1, "uom": "Year"},
  "periodColumnArName": "periodAr",
  "periodColumnEnName": "periodEn",
  "currentPeriodArValue": "السنة الحالية",
  "currentPeriodEnValue": "Current Year",
  "previousPeriodArValue": "السنة السابقة",
  "previousPeriodEnValue": "Previous Year"
}
```

| الحقل | مطلوب | الوصف |
|---|---|---|
| `code` | نعم | يُشار إليه من `comparisonConfig` في الفلتر المتقاطع. |
| `name1` / `name2` | نعم | الاسم العربي / الإنجليزي. |
| `subtractedPeriod` | نعم | كم ترجع الفترة السابقة: `{"value": 1, "uom": "Year"}`، وقيمة `uom` إحدى `Day` و`Week` و`Month` و`Year`. فلتر التاريخ يُزاح بهذه المدة؛ وفلتر السنة المالية أو الفترة المالية ينتقل إلى السنة أو الفترة التي تقع فيها بداية الفترة بعد الإزاحة. |
| `periodColumnArName` / `periodColumnEnName` | نعم | اسما العمودين اللذين يُضافان إلى كل صف في النتيجة ويحملان تسمية الفترة. استعمل أحدهما `labelColumn` في المخطط لتحصل على سلسلة لكل فترة. |
| `currentPeriodArValue` / `currentPeriodEnValue` | نعم | التسمية التي تُكتب في هذين العمودين للفترة الحالية. |
| `previousPeriodArValue` / `previousPeriodEnValue` | نعم | التسمية التي تُكتب فيهما للفترة السابقة. |

وتصل التسميات نفسها إلى الاستعلام كمدخلين `{periodArValue}` و`{periodEnValue}`، فيمكن استعمالهما في
`CASE` أو `CONCAT`. ولا يجوز أن تصل روابط الـ widget إلا إلى إعداد **واحد**؛ فإعدادان مختلفان على widget
واحد يُرفضان. وما لم يعطِ المستخدم أحد الفلاتر المرتبطة قيمة، يعمل الـ widget مرة واحدة للفترة الحالية فقط.

مثال على الربط، من جهة الفلتر المتقاطع ومن جهة الـ widget:

```json
{
  "BICrossFilter": [
    {"code": "dateFrom", "paramType": "Date", "sqlLeftHandSide": "l.valueDate", "operator": "GreaterThanOrEqual", "comparisonConfig": "yoy-comparison"},
    {"code": "dateTo",   "paramType": "Date", "sqlLeftHandSide": "l.valueDate", "operator": "LessThanOrEqual",    "comparisonConfig": "yoy-comparison"}
  ],
  "DashBoardWidget": [
    {
      "code": "bi-top-item-classes",
      "enableComparison": true,
      "mergeComparisonByColumns": "itemClassName",
      "comparisonDataMapping": [
        {"originalColumn": "netValue", "previousPeriodColumn": "prevNetValue"}
      ],
      "crossFilterBindings": [ {"crossFilter": "dateFrom"}, {"crossFilter": "dateTo"} ]
    }
  ]
}
```

---

## 11. مثال كامل — لوحة بيانات المبيعات

فيما يلي JSON استيراد كامل يعمل لإنشاء لوحة تحليل مبيعات مع 3 cross-filters و3 widgets (دائري + شريطي + جدول) وإصدار cross-filter وتنقل drill-down.

```json
{
  "BICrossFilter": [
    {
      "code": "custCategoryFilter",
      "name1": "تصنيف العميل",
      "name2": "Customer Category",
      "paramType": "Reference",
      "referencedEntityType": "CustomerCategory",
      "arTitle": "تصنيف العميل",
      "enTitle": "Customer Category",
      "sqlLeftHandSide": "cc.id",
      "operator": "Equal"
    },
    {
      "code": "dateFromFilter",
      "name1": "من تاريخ",
      "name2": "Date From",
      "paramType": "Date",
      "arTitle": "من تاريخ",
      "enTitle": "From",
      "sqlLeftHandSide": "l.valueDate",
      "operator": "GreaterThanOrEqual"
    },
    {
      "code": "dateToFilter",
      "name1": "إلى تاريخ",
      "name2": "Date To",
      "paramType": "Date",
      "arTitle": "إلى تاريخ",
      "enTitle": "To",
      "sqlLeftHandSide": "l.valueDate",
      "operator": "LessThanOrEqual"
    }
  ],
  "DashBoardWidget": [
    {
      "code": "ex-sales-by-category",
      "name1": "المبيعات حسب التصنيف",
      "name2": "Sales by Category",
      "chartTitle": "المبيعات حسب التصنيف",
      "englishChartTitle": "Sales by Category",
      "type": "EChart",
      "dataSource": "SELECT cc.id ccId, cc.code ccCode, cc.name1 ccName1, cc.name2 ccName2, SUM(l.netValue) netValue FROM SalesInvoiceLine l JOIN SalesInvoice h ON h.id = l.salesInvoice_id LEFT JOIN Customer c ON c.id = l.customer_id LEFT JOIN CustomerCategory cc ON cc.id = c.customerCategory_id WHERE h.commitedBefore = 1 /*AND-FILTERS*/ GROUP BY cc.id, cc.code, cc.name1, cc.name2",
      "chartConfigJSON": {
        "echartOption": {
          "tooltip": {"trigger": "item", "formatter": "{b}: {c} ({d}%)"},
          "legend": {"orient": "vertical", "left": "left"},
          "series": [{"type": "pie", "radius": "60%", "data": "$DATA.values"}]
        },
        "dataMapping": {"type": "LabelValue", "labelColumn": "ccName2", "valueColumn": "netValue"},
        "clickEmitMapping": [
          {"crossFilterCode": "custCategoryFilter", "idColumn": "ccId", "codeColumn": "ccCode", "name1Column": "ccName1", "name2Column": "ccName2", "entityType": "CustomerCategory"}
        ]
      },
      "crossFilterBindings": [
        {"crossFilter": "dateFromFilter"},
        {"crossFilter": "dateToFilter"}
      ]
    },
    {
      "code": "ex-top-items",
      "name1": "أعلى الأصناف",
      "name2": "Top Items",
      "chartTitle": "أعلى 10 أصناف",
      "englishChartTitle": "Top 10 Items",
      "type": "EChart",
      "dataSource": "SELECT TOP 10 i.name2 itemName, SUM(l.netValue) netValue FROM SalesInvoiceLine l JOIN SalesInvoice h ON h.id = l.salesInvoice_id LEFT JOIN InvItem i ON i.id = l.item_id LEFT JOIN Customer c ON c.id = l.customer_id LEFT JOIN CustomerCategory cc ON cc.id = c.customerCategory_id WHERE h.commitedBefore = 1 /*AND-FILTERS*/ GROUP BY i.name2 ORDER BY netValue DESC",
      "chartConfigJSON": {
        "echartOption": {
          "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
          "grid": {"left": 120, "right": 40, "top": 10, "bottom": 20},
          "xAxis": {"type": "value"},
          "yAxis": {"type": "category", "data": "$DATA.categories", "inverse": true, "axisLabel": {"width": 110, "overflow": "truncate"}},
          "series": [{"name": "$DATA.series[0].name", "type": "bar", "data": "$DATA.series[0].data", "itemStyle": {"borderRadius": [0, 4, 4, 0]}, "label": {"show": true, "position": "right"}}]
        },
        "dataMapping": {
          "type": "CategoryValue",
          "categoryColumn": "itemName",
          "series": [{"column": "netValue", "name": "Net Value", "type": "bar", "format": {"type": "currency", "decimals": 0, "compact": true}}]
        }
      },
      "crossFilterBindings": [
        {"crossFilter": "custCategoryFilter"},
        {"crossFilter": "dateFromFilter"},
        {"crossFilter": "dateToFilter"}
      ]
    },
    {
      "code": "ex-invoice-details",
      "name1": "تفاصيل الفواتير",
      "name2": "Invoice Details",
      "chartTitle": "تفاصيل الفواتير",
      "englishChartTitle": "Invoice Details",
      "type": "Table",
      "dataSource": "SELECT TOP 200 s.code invoiceCode, l.valueDate, c.name2 customerName, i.name2 itemName, l.quantityBaseValue qty, l.netValue FROM SalesInvoiceLine l JOIN SalesInvoice s ON s.id = l.salesInvoice_id LEFT JOIN InvItem i ON i.id = l.item_id LEFT JOIN Customer c ON c.id = l.customer_id LEFT JOIN CustomerCategory cc ON cc.id = c.customerCategory_id WHERE s.commitedBefore = 1 /*AND-FILTERS*/ ORDER BY l.valueDate DESC",
      "crossFilterBindings": [
        {"crossFilter": "custCategoryFilter"},
        {"crossFilter": "dateFromFilter"},
        {"crossFilter": "dateToFilter"}
      ]
    }
  ],
  "DashBoard": [
    {
      "code": "ex-sales-dashboard",
      "name1": "لوحة المبيعات",
      "name2": "Sales Dashboard",
      "rowsCount": 6,
      "colsCount": 3,
      "charts": [
        {"element": "ex-sales-by-category", "heightInRows": 2, "widthInColumns": 1, "rowNumber": 1, "columnNumber": 1},
        {"element": "ex-top-items", "heightInRows": 2, "widthInColumns": 2, "rowNumber": 1, "columnNumber": 2},
        {"element": "ex-invoice-details", "heightInRows": 5, "widthInColumns": 3, "rowNumber": 3, "columnNumber": 1}
      ],
      "crossFilterBindings": []
    }
  ]
}
```

### ما الذي يُنشئه هذا

- **3 cross-filters**: تصنيف العميل (منتقي مرجع)، من تاريخ، إلى تاريخ (منتقيات تاريخ)
- **مخطط دائري** (`ex-sales-by-category`): يُظهر توزيع المبيعات حسب تصنيف العميل. النقر على شريحة يُعيِّن `custCategoryFilter`، الذي يُصفِّي الـwidgets الأخرَين.
- **مخطط شريطي أفقي** (`ex-top-items`): أعلى 10 أصناف حسب صافي القيمة. يستجيب لفلتر التصنيف وفلاتر التاريخ.
- **جدول** (`ex-invoice-details`): تفاصيل سطور الفواتير. يستجيب للفلاتر الثلاثة.
- **لوحة البيانات** (`ex-sales-dashboard`): بعرض 3 أعمدة، و`rowsCount: 6` هو المقياس الرأسي. الدائري في الأعلى والشريطي يمتد بجانبه، وكلاهما بارتفاع صفَّين — أي ثلث شاشة لكل منهما. والجدول تحتهما بارتفاع 5 صفوف ويبدأ من الصف 3، فينتهي أبعد widget عند الصف 7. والسبعة أكبر من الستة، ولذلك **تمرّر هذه اللوحة** — نحو 1.2 شاشة — ويأخذ الجدول خمسة أسداس شاشة لنفسه بدل أن يُحشر فيما تبقى من شاشة واحدة. راجع [تحديد الأحجام والتمرير](#tHdyd-lHjm-wltmryr-Sizing-and-scrolling) لمعرفة سبب كون هذه المتباينة هي جوهر الموضوع كله.

### كيفية الاستيراد

لا توجد شاشة مخصصة لاستيراد اللوحات. فالملف ملف استيراد عادي، ويدخل النظام عبر أمر **استيراد سجلات**
نفسه الذي تُستورد به أي بيانات أخرى:

1. احفظ JSON في ملف بامتداد `.json`.
2. افتح قائمة **لوحة** (*إدارة النظام ← لوحات ← لوحة*) — أو قائمة أي نوع من السجلات الموجودة في الملف،
   أو لوحة مفتوحة — واختر **استيراد سجلات** من قائمة **المزيد**. فالملف هو الذي يقرر ما يُستورد، لا
   الشاشة التي بدأت منها.
3. اختر الملف وشغّل الاستيراد. تُنشأ السجلات بترتيب المفاتيح في الملف — راجع
   [الهيكل الرئيسي](#lhykl-lryysy).
4. اقرأ ملف النتيجة الذي يعيده الاستيراد — فهو يبيّن كل سجل أُنشئ أو رُفض. راجع
   [استيراد السجلات](/ar/platform/import-export/importing-records.md) للخيارات ولملف النتيجة.
5. افتح لوحة البيانات بكودها (`ex-sales-dashboard`).

لا يظهر الأمر إلا للمستخدمين الذين يمنحهم ملف الصلاحيات حق **الاستيراد** على نوع السجل.

::: tip ابدأ من ملف مُصدَّر
الأمر **تصدير اللوحة JSON** في قائمة **المزيد** للوحة مفتوحة يُنتج ملفاً بهذه الصيغة نفسها تماماً —
اللوحة ومعها الـ widgets والـ wizards والفلاتر المتقاطعة التابعة لها. وتصدير لوحة قائمة هو أسرع طريق
للحصول على قالب يعمل، وهو طريقة نقل لوحة من تركيبة إلى أخرى.
:::

---

## 12. مرجع سريع — الأنماط الشائعة

### مخطط شريطي عمودي (CategoryValue)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "xAxis": {"type": "category", "data": "$DATA.categories", "axisLabel": {"rotate": 45}},
    "yAxis": {"type": "value"},
    "series": [{"name": "$DATA.series[0].name", "type": "bar", "data": "$DATA.series[0].data", "itemStyle": {"borderRadius": [4, 4, 0, 0]}}]
  },
  "dataMapping": {"type": "CategoryValue", "categoryColumn": "categoryName", "series": [{"column": "value", "name": "Value", "type": "bar"}]}
}
```

### مخطط شريطي أفقي (CategoryValue مع محاور مقلوبة)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "grid": {"left": 140, "right": 40, "top": 10, "bottom": 20},
    "xAxis": {"type": "value"},
    "yAxis": {"type": "category", "data": "$DATA.categories", "inverse": true, "axisLabel": {"width": 130, "overflow": "truncate"}},
    "series": [{"name": "$DATA.series[0].name", "type": "bar", "data": "$DATA.series[0].data", "itemStyle": {"borderRadius": [0, 4, 4, 0]}, "label": {"show": true, "position": "right"}}]
  },
  "dataMapping": {"type": "CategoryValue", "categoryColumn": "itemName", "series": [{"column": "netValue", "name": "Net Value", "type": "bar"}]}
}
```

### شريطي مكدَّس (CategoryLabelValue)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "legend": {},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": {"type": "value"},
    "series": "$DATA.series"
  },
  "dataMapping": {"type": "CategoryLabelValue", "categoryColumn": "year", "labelColumn": "branch", "valueColumn": "amount", "seriesType": "bar", "stack": "total"}
}
```

### مخطط خطي مع تعبئة المساحة
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis"},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": {"type": "value"},
    "series": [{"name": "$DATA.series[0].name", "type": "line", "data": "$DATA.series[0].data", "areaStyle": {}, "smooth": true}]
  },
  "dataMapping": {"type": "CategoryValue", "categoryColumn": "month", "series": [{"column": "total", "name": "Total", "type": "line"}]}
}
```

في المخطط المدمج تغطي تعبئة المساحة الأشرطة؛ والنقر على التعبئة يُحلّ بأقرب فئة على محور X فتبقى الأشرطة تحتها مستجيبة. ولجعل الخط يتجاهل النقرات كلياً أضف `"silent": true` إلى السلسلة الخطية — انظر [أي أجزاء المخطط تستجيب للنقر](#y-jz-lmkhTT-tstjyb-llnqr).

### مخطط دائري (LabelValue)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "item", "formatter": "{b}: {c} ({d}%)"},
    "legend": {"orient": "vertical", "left": "left"},
    "series": [{"type": "pie", "radius": "60%", "data": "$DATA.values"}]
  },
  "dataMapping": {"type": "LabelValue", "labelColumn": "name", "valueColumn": "amount"}
}
```

### مخطط Donut مع تسمية وسطية
```json
{
  "echartOption": {
    "tooltip": {"trigger": "item", "formatter": "{b}: {c} ({d}%)"},
    "graphic": [{"type": "text", "left": "center", "top": "center", "style": {"text": "$DATA.centerText", "fontSize": 24, "fontWeight": "bold", "textAlign": "center"}}],
    "series": [{"type": "pie", "radius": ["45%", "70%"], "data": "$DATA.values", "label": {"show": false}}]
  },
  "dataMapping": {"type": "LabelValue", "labelColumn": "name", "valueColumn": "amount", "centerText": "Total"}
}
```

### مقياس (Gauge)
```json
{
  "echartOption": {
    "series": [{"type": "gauge", "min": 0, "max": "$DATA.max", "data": [{"value": "$DATA.value", "name": "$DATA.unit"}], "axisLine": {"lineStyle": {"width": 30, "color": "$DATA.bands"}}, "detail": {"formatter": "{value}"}}]
  },
  "dataMapping": {"type": "Gauge", "valueColumn": "score", "unit": "%", "max": 100, "bands": [[0.3, "#67e0e3"], [0.7, "#37a2da"], [1, "#fd666d"]]}
}
```

### مخطط مدمج (شريطي + خطي، محور مزدوج)
```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "legend": {},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": [{"type": "value"}, {"type": "value", "splitLine": {"show": false}}],
    "series": "$DATA.series"
  },
  "dataMapping": {
    "type": "CategoryValue",
    "categoryColumn": "month",
    "series": [
      {"column": "revenue", "name": "Revenue", "type": "bar"},
      {"column": "margin", "name": "Margin %", "type": "line", "yAxisIndex": 1}
    ]
  }
}
```

### خريطة حرارية (Heatmap)
```json
{
  "echartOption": {
    "tooltip": {"position": "top"},
    "xAxis": {"type": "category", "data": "$DATA.xCategories", "splitArea": {"show": true}},
    "yAxis": {"type": "category", "data": "$DATA.yCategories", "splitArea": {"show": true}},
    "visualMap": {"min": "$DATA.min", "max": "$DATA.max", "calculable": true, "orient": "horizontal", "left": "center", "bottom": 0},
    "series": [{"type": "heatmap", "data": "$DATA.rows", "label": {"show": true}}]
  },
  "dataMapping": {"type": "Heatmap", "xColumn": "dayOfWeek", "yColumn": "hourSlot", "valueColumn": "count"}
}
```

---

## 13. Wizard Mode

التفاصيل نُقلت إلى ملف مرافق للحفاظ على هذا المرجع مختصراً. حمِّله فقط عند تأليف widget مع تعيين `wizardDataSource`.

→ [`bi-reference-wizard-mode.md`](./bi-reference-wizard-mode.md)

يغطي: التخزين المؤقت للبيانات الوصفية، ومفاتيح `*WizardFieldId`، وclick-emit / drill-down مع `wizardFieldId`، وقائمة الأبعاد النشطة، ودلالات drill-by (الخيار A)، وLHS cross-filter لمسار wizard، واختيار الفتحات في وقت التشغيل، وعلامات إلغاء الاشتراك.

---

## 14. EnhancedTable — شبكة مُشغَّلة بـJSON

التفاصيل نُقلت إلى ملف مرافق. حمِّله عند تأليف widgets من نوع `type: "EnhancedTable"` (أو وضع pivot/cross-tab).

→ [`bi-reference-enhanced-table.md`](./bi-reference-enhanced-table.md)

يغطي: `tableOptions` (ومنها الترقيم من الخادم عبر `rowModel` / `serverPageSize`)، وتعريفات الأعمدة، و`formatting` (مع `currencySymbol`/`currencyPlacement`)، والمُصيِّرات (`badge`/`bar`/`progress`/`sparkline`/`icon`)، والتنسيق الشرطي (خلية + صف، وصفة traffic-light)، وتخطيط pivot (cross-tab) — أبعاد الصفوف/الأعمدة والمقاييس والإجماليات الجزئية والإجماليات الكلية.

---

## 15. EnhancedMetricsCard (والـMetricsCards القديمة)

التفاصيل نُقلت إلى ملف مرافق. حمِّله عند تأليف widgets من نوع (`type: "EnhancedMetricsCard"` أو `type: "MetricsCards"` القديم).

→ [`bi-reference-enhanced-metrics-card.md`](./bi-reference-enhanced-metrics-card.md)

يغطي: متى تستخدم أيهما، وشكل كائن قيمة `metricsCardConfig` القديم، وشكل `chartConfigJSON` (cardLayout وفتحات value/subtitle/icon/badge/sparkline)، ووضع card-to-row مقابل partition (N صفوف → بطاقة واحدة)، وsparkline مضمَّن + وصفة STUFF/FOR XML PATH، وتبديل bg + icon للبطاقة الشرطي، ووصفة شريط chip.

---

## الملفات المرافقة — خريطة سريعة

| عندما تتضمن المهمة… | حمِّل |
|---|---|
| Widget مع `wizardDataSource` محدد، وdrill-by، واختيار الفتحات في وقت التشغيل | [`bi-reference-wizard-mode.md`](./bi-reference-wizard-mode.md) |
| `type: "EnhancedTable"` — الأعمدة والمُصيِّرات والتنسيق الشرطي وpivot | [`bi-reference-enhanced-table.md`](./bi-reference-enhanced-table.md) |
| `type: "EnhancedMetricsCard"` أو `type: "MetricsCards"` القديم | [`bi-reference-enhanced-metrics-card.md`](./bi-reference-enhanced-metrics-card.md) |
| أي شيء آخر (chartConfigJSON وSQL وdataMapping وBICrossFilter وDashBoard والاستيراد الجماعي) | هذا الملف |
