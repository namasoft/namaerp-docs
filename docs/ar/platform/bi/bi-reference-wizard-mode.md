---
description: "مرجع عناصر اللوحة المبنية على مصدر بيانات المعالج، التي تشير إعداداتها إلى معرّفات حقول المعالج بدل أعمدة SQL: التخزين المؤقت للبيانات الوصفية، ومفاتيح تعيين البيانات، والنقر والتنقل التفصيلي، والمحددات النشطة، والفلتر المتقاطع، والتعايش مع العناصر القديمة، ومثال كامل، واختيار الفتحة وقت التشغيل."
entities: [DashBoardWidgetWizard, DashBoardWidget]
---

# مرجع BI — وضع المعالج (Wizard Mode)

هذه الصفحة مرجع عناصر اللوحة المبنية من **أداة إنشاء عنصر لوحة**، أي العناصر التي امتلأ فيها حقل
**Wizard Data Source**. ارجع إليها حين يعرض عنصر من هذا النوع بيانات خاطئة، أو حين لا يتصرف التنقل التفصيلي أو
الفلتر المتقاطع منه كما يُتوقع، أو حين تعدّل حقل **Chart Config JSON** الخاص به يدويًا. أما العناصر المكتوبة
مباشرة بـ SQL فيغطيها [المرجع التقني لوحدة BI](./bi-module-technical-reference.md)، ولا ينطبق عليها شيء مما
في هذه الصفحة.

عندما يحتوي widget على `wizardDataSource`، يشير `chartConfigJSON` إلى **معرّفات حقول المعالج (wizard field IDs)** بدلاً من أسماء أعمدة SQL الخام. يُحلّل الخادم كل معرّف إلى اسم مستعار SQL من البيانات الوصفية المخزّنة مؤقتاً؛ لا تتأثر widgets وضع SQL بأي شيء هنا.

## 1. التخزين المؤقت للبيانات الوصفية (Metadata caching)

عند حفظ `DashBoardWidgetWizard`، يُشغِّل `postCommitAction` دالة `ReportWizardQuery.build()` مرة واحدة ويخزّن البيانات الوصفية لكل حقل في JSON الخاصة بالنظام `fieldMetadata` في كل سطر:

- `fieldId` — مسار خاصية حقل المعالج
- `chartUsage` — `Dimension` | `Measure`
- `paramType` — `Reference`, `Decimal`, `Text`, `Date`, `Integer`, `Genericreference`, `Enum`, `Boolean`
- `referencedEntityType` — لحقول المرجع فقط
- `aggregation` — `None`, `Count`, `Sum`, `Avg`, `Min`, `Max`, `DistinctCount`
- `displayAlias` — الاسم المستعار SQL لعمود العرض الأساسي للحقل
- `subColumns` — لحقول المرجع فقط: أسماء مستعارة للأعمدة الفرعية الموسّعة تلقائياً id/code/name1/name2/entityType/value
- `sqlLeftHandSide` — الجانب الأيسر المؤهل بالكامل المستخدم لحقن WHERE في الفلاتر المتقاطعة
- `arabicTitle` / `englishTitle` — يُمرَّران كما هما

يُفكّك البحث عند التصيير السجلات المخزّنة مؤقتاً — دون إعادة بناء `ReportWizardQuery`.

## 2. مفاتيح تعيين البيانات (Data-mapping keys)

لكل فتحة عمود في §3 من المرجع الرئيسي، يضيف وضع المعالج نظيراً `*WizardFieldId`:

| مفتاح SQL | نظير المعالج | يُحلَّل إلى |
|---|---|---|
| `categoryColumn` | `categoryWizardFieldId` | `displayAlias` |
| `labelColumn` | `labelWizardFieldId` | نفسه |
| `valueColumn` | `valueWizardFieldId` | نفسه |
| `xColumn` / `yColumn` | `xWizardFieldId` / `yWizardFieldId` | نفسه |
| `sizeColumn` | `sizeWizardFieldId` | حجم فقاعة Scatter |
| `innerLabelColumn` / `outerLabelColumn` | `innerLabelWizardFieldId` / `outerLabelWizardFieldId` | حلقات NestedLabelValue |
| `innerValueColumn` / `outerValueColumn` | `innerValueWizardFieldId` / `outerValueWizardFieldId` | قياسات NestedLabelValue |
| `leftValueColumn` / `rightValueColumn` | `leftValueWizardFieldId` / `rightValueWizardFieldId` | FunnelComparison |
| `series[].column` | `series[].wizardFieldId` | نفسه |
| `maxResultsRankBy` | `maxResultsRankByWizardFieldId` | قياس الترتيب top-N |

عند وجود المفتاحين معاً → يسود `*Column`. أعمدة Tempo / مقارنة الفترات ليست حقول معالج؛ استخدم `*Column` فقط — يُتجاهل `wizardFieldId` بصمت.

```json
"dataMapping": {
  "type": "CategoryLabelValue",
  "categoryWizardFieldId": "valueDate",
  "labelWizardFieldId": "customer.customerCategory",
  "valueWizardFieldId": "price.netValue",
  "seriesType": "bar"
}
```

## 3. إصدار النقر والتنقل التفصيلي مع `wizardFieldId`

```json
"clickEmitMapping": [
  { "crossFilterCode": "customerCategoryFilter", "wizardFieldId": "customer.customerCategory" }
]
```

لكل إدخال يحتوي على `wizardFieldId`:

1. **استنتاج الأعمدة الفرعية** — يملأ الخادم الأعمدة المفقودة `idColumn`/`codeColumn`/`name1Column`/`name2Column`/`entityTypeColumn`/`valueColumn`/`entityType` من `subColumns` المخزّنة + `referencedEntityType`.
2. **الفلترة لكل محدد** — يُطلق الإدخال فقط عندما يكون `wizardFieldId` الخاص به ضمن المحددات النشطة حالياً (انظر §4 أدناه).

الإدخالات التي لا تحتوي على `wizardFieldId` دائماً نشطة (سلوك وضع SQL القديم).

## 4. المحددات النشطة (Active dimensions)

قائمة "المحددات النشطة حالياً" بالترتيب:

1. إذا كان الطلب يحمل `drillDownByTargetDimension`، يكون معرّف الحقل هذا أولاً.
2. ثم `categoryWizardFieldId`, `labelWizardFieldId`, `xWizardFieldId`, `yWizardFieldId` — أيها كان مُعيَّناً في `dataMapping`.

يُتخطى المكرر. تقود هذه القائمة:

- **إعادة بناء SQL** عبر `ReportWizardQuery.buildForDrillDown(wizard, primary, otherDims)`. يصبح الأساسي أول GROUP BY؛ تُلحَق الأخرى؛ تبقى القياسات.
- **فلترة النقر/التفصيل** (§3 أعلاه).
- **استبعاد قائمة التنقل التفصيلي** — المحددات النشطة بالفعل مخفية من قائمة "Drill down by…" عند النقر بالزر الأيمن.

## 5. دلالات التنقل التفصيلي — الخيار أ (Drill-by semantics - Option A)

عندما ينقر المستخدم بالزر الأيمن ← "Drill down by… X":

1. الفئة **تُستبدل** — يأخذ المحدد المُنقَّل إليه المكان الأساسي.
2. المحددات النشطة الأخرى (label, x, y) **تبقى** — يُحافَظ على شكل الرسم البياني.
3. تراكم مكدس التنقل: إدخال واحد لكل تنقل `(categoryFieldId, clickedValue)`. القيمة المنقور عليها للـ label **لا** تُضاف.
4. تتراكم الفلاتر (بعد تنقلين: `WHERE month='Jan' AND region='West'`).

قائمة التنقل = `wizard.fields` مفلترة إلى `chartUsageType=Dimension` وغير موجودة في القائمة النشطة وغير موجودة في مكدس التنقل.

بعد التنقل، يقرأ الخادم `chartConfigJSON` الموجود ويُعيد كتابة `dataMapping.categoryColumn` بـ `displayAlias` الخاص بالمحدد المُنقَّل إليه (ويحذف `categoryWizardFieldId`). كل شيء آخر — `echartOption`، `valueColumn`/`valueWizardFieldId`، تنسيق السلاسل، الألوان، التعيينات — يُنقل كما هو.

## 6. جانب الفلتر المتقاطع الأيسر SQL (Cross-filter SQL LHS)

يقبل الجانب الأيسر للفلتر المتقاطع في widget المعالج (على الربط أو على `BICrossFilter`) **مسار حقل المعالج** بالإضافة إلى `alias.column` الخام. أي حقل يمكن الوصول إليه من الكيان الرئيسي للمعالج صالح — لا يلزم عرضه.

قيم LHS الصالحة:
- `customer` — حقل مرجع على الكيان الرئيسي. يرتبط تلقائياً بالمعرّف المُشار إليه.
- `customer.salesman.code` — مسار خاصية عبر ضمتين. تُضاف الضمات عند الحاجة.
- `valueDate` — عمود عددي على الكيان الرئيسي.
- `l.branch_id` — alias.column خام (قديم؛ لا يزال يعمل).

يُعامل المصنّف نقطتين أو أكثر، أو قيمة يتم حلّها مقابل نموذج بيانات الجدول الرئيسي، كمسار معالج؛ وإلا فهو SQL خام.

## 7. التعايش مع الـ widgets القديمة (Coexistence with legacy widgets)

الـ widgets ذات المعالج الموجودة مسبقاً (بدون مفاتيح `*WizardFieldId`، فقط `*Column`) تُقرأ كما كانت — أسماء أعمدة، بدون فلترة لكل محدد. إعادة الحفظ عبر مصمم الرسوم البيانية يُرقّي الـ widget إذا اختار المستخدم معرّفات الحقول.

## 8. مثال كامل (Complete example)

```json
{
  "echartOption": {
    "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
    "legend": {},
    "xAxis": {"type": "category", "data": "$DATA.categories"},
    "yAxis": {"type": "value"},
    "series": "$DATA.series"
  },
  "dataMapping": {
    "type": "CategoryLabelValue",
    "categoryWizardFieldId": "valueDate",
    "labelWizardFieldId": "customer.customerCategory",
    "valueWizardFieldId": "price.netValue",
    "seriesType": "bar",
    "stack": "total"
  },
  "clickEmitMapping": [
    { "crossFilterCode": "dateFromFilter",         "wizardFieldId": "valueDate" },
    { "crossFilterCode": "customerCategoryFilter", "wizardFieldId": "customer.customerCategory" }
  ],
  "drillDownMapping": [
    {
      "key": "categoryDetails",
      "wizardFieldId": "customer.customerCategory",
      "targetWidgetCode": "bi-category-details",
      "enTitle": "Category details", "arTitle": "تفاصيل التصنيف",
      "filters": [
        { "crossFilterCode": "customerCategoryFilter", "wizardFieldId": "customer.customerCategory" }
      ]
    }
  ]
}
```

المعالج:

```json
{
  "code": "bi-sales-breakdown",
  "type": "EChartDataSource",
  "tableType": "DetailLine",
  "mainTable": "SalesInvoiceLine",
  "fields": [
    {"fieldId": "valueDate",                 "chartUsageType": "Dimension"},
    {"fieldId": "customer.customerCategory", "chartUsageType": "Dimension"},
    {"fieldId": "price.netValue",            "chartUsageType": "Measure", "sqlAggregationType": "Sum"}
  ]
}
```

## 9. اختيار الفتحة في وقت التشغيل (Runtime slot selection)

تعرض widgets المعالج أداة اختيار في وقت التشغيل (شريط الأدوات / أيقونة صندوق أدوات echarts) حتى يتمكن المشاهدون من تبديل محدد الفئة، وتغيير القياسات، أو إضافة سلاسل — لجلسة العمل الحالية فقط.

![لوحة اختيار الفتحات في وقت التشغيل مفتوحة على مخطط معالج حي، وقائمة التصنيف المنسدلة تسرد المحددات التي يتيحها المعالج](images/bi-wizard-runtime-selector-ar.png)

| نوع التعيين | فتحات المحددات | فتحات القياسات | سلاسل متعددة القياسات |
|---|---|---|---|
| `CategoryValue` | `categoryWizardFieldId` | `series[].wizardFieldId` (N) | **نعم** (flexible فقط) |
| `LabelValue` | `labelWizardFieldId` | `valueWizardFieldId` | لا |
| `CategoryLabelValue` | `categoryWizardFieldId`, `labelWizardFieldId` | `valueWizardFieldId` | لا |
| `Scatter` | — | `xWizardFieldId`, `yWizardFieldId`, `sizeWizardFieldId` | لا |
| `Heatmap` | `xWizardFieldId`, `yWizardFieldId` | `valueWizardFieldId` | لا |
| `Gauge` | — | `valueWizardFieldId` | لا |
| `Tree` | `labelWizardFieldId` | `valueWizardFieldId` | لا |

`Waterfall`, `NestedLabelValue`, `GaugeMulti`, `Radar`, `FunnelComparison`, `Custom`, `Raw` ← لا يوجد أداة اختيار في وقت التشغيل.

**CategoryValue مرن مقابل ثابت**: يكون CategoryValue "مرناً" فقط عندما تكون جميع إدخالات `series[]` موحّدة — نفس `type`، بدون `yAxisIndex`، بدون `stack`، بدون `target`. الرسوم البيانية ذات المحورين / bar+line المدمج / المكدّسة / ذات الهدف ثابتة: يُخفى منتقي متعدد القياسات.

**لا أداة اختيار في وضع التنقل التفصيلي**: عندما يحمل الطلب `drillDownByTargetDimension`، يحذف الخادم `runtimeSelectorInfo`.

**أعلام الإلغاء** على `chartConfigJSON`:
- `disableRuntimeDimensionSelection: true` — يُخفي منتقيات المحددات (يبقي القياسات).
- `disableRuntimeMeasureSelection: true` — يُخفي منتقيات القياسات (يبقي المحددات).

ضبط كليهما على `true` يُخفي أداة الاختيار بالكامل.

**النقر/التنقل يتبعان المحددات النشطة**: تغييرات الفتحة في وقت التشغيل تُعيد تشكيل `activeDimensionFieldIds`، لذا تتبع إدخالات النقر والتنقل المفتاحة بـ `wizardFieldId` المحددات النشطة الجديدة تلقائياً.

**عند تعديل الـ JSON**: يُفضَّل استخدام مفاتيح وضع المعالج (`*WizardFieldId`) كلما كان `wizardDataSource` موجوداً حتى تكتسب widgets أداة الاختيار في وقت التشغيل تلقائياً.
