---
description: "مرجع عنصر اللوحة EnhancedTable: بنية إعدادات JSON، وخيارات الجدول والترقيم من الخادم، وتعريف الأعمدة، والتنسيق والـ renderers، والتنسيق الشرطي، ومثال كامل، والانتقال من عنصر Table الكلاسيكي، وتخطيط الـ Pivot (cross-tab)."
entities: [DashBoardWidget]
menu: إدارة النظام ← لوحات ← عنصر اللوحة
---

# مرجع BI — EnhancedTable

هذه الصفحة مرجع نوع العنصر **EnhancedTable** في شاشة **عنصر اللوحة**، ومعه تخطيط الـ Pivot (cross-tab).
كل عمود في الجدول وتنسيقه وقواعد تلوينه محفوظة في حقل **Chart Config JSON** للعنصر، فارجع إلى هذه الصفحة حين
يعرض عنصر جدول عمودًا على غير المتوقع أو يطلب العميل تغييره. أما إعدادات النقر والتنقل التفصيلي والروابط التي
يشترك فيها مع باقي العناصر ففي [المرجع التقني لوحدة BI](./bi-module-technical-reference.md).

`EnhancedTable` هو جدول مدفوع بـ JSON — كل عمود معرَّف في `chartConfigJSON` له تنسيقه الخاص، وrenderer، وتنسيق شرطي، وتثبيت، وتجميع، وإجماليات. يعيد استخدام آلية تفاعل BI (`clickEmitMapping`، `drillDownMapping`، `linkMappings`، `clickAction` — المرجع الرئيسي §4–5b) مع حقل `column` اختياري في كل مدخل للتحديد إلى خلية بعينها. يبقى widget الكلاسيكي `Table` متاحاً؛ للانتقال استخدم `"type": "EnhancedTable"`.

![جدول الربحية حسب الشركة: أيقونات التحديث والتصدير والتوسيع في رأسه، وأعمدة للكود والشركة والإيراد والتكلفة ومجمل الربح ونسبة الهامش معروضة كشريط، وسبعة صفوف بيانات وصف إجمالي عام](images/bi-enhanced-table-widget-ar.png)

## 1. بنية chartConfigJSON

```json
{
  "tableOptions": { },
  "columnGroups": [ ],
  "columns": [ ],
  "rowConditionalFormatting": { "cascade": false, "rules": [ ] },
  "clickEmitMapping":  [ ],
  "drillDownMapping":  [ ],
  "linkMappings":      [ ],
  "clickAction":       { }
}
```

| المفتاح | مطلوب | الوصف |
|---|---|---|
| `columns` | نعم | تعريفات الأعمدة مرتبةً (§3 أدناه). يحدد ترتيب أعمدة الشبكة. |
| `columnGroups` | لا | مصفوفة من `{id, headerArTitle, headerEnTitle, marryChildren, openByDefault}`. تستعين الأعمدة بها عبر `groupId`. |
| `tableOptions` | لا | خيارات مستوى الشبكة (§2). القيم الافتراضية مناسبة. |
| `rowConditionalFormatting` | لا | تنسيق على مستوى الصف (§5). |
| `clickEmitMapping` / `drillDownMapping` / `linkMappings` / `clickAction` | لا | حقل `column` في كل مدخل يضيّق النطاق على عمود واحد؛ `onCellClick: true` يُطلَق عند النقر الأيسر. يُفضَّل استخدام `onCellClick` لكل مدخل بدلاً من `clickAction` على مستوى الـ widget للجداول — انظر المرجع الرئيسي §5a.1. |

لا يوجد `dataMapping` / `echartOption` — لا يستخدم EnhancedTable مكتبة ECharts.

## 2. tableOptions

```json
"tableOptions": {
  "pagination":         false,
  "pageSize":           25,
  "pageSizes":          [25, 50, 100, 250],
  "rowNumbers":         true,
  "enableRowGroup":     true,
  "enablePivot":        false,
  "pivotOpenByDefault": false,
  "grandTotalRow":      "bottom",
  "defaultColWidth":    null,
  "defaultFlex":        1,
  "defaultMinWidth":    130,
  "wrapText":           true,
  "autoHeight":         true,
  "enableRtl":          "auto",
  "cellSelection":      true,
  "rowModel":           "clientSide",
  "serverPageSize":     100
}
```

| الحقل | الافتراضي | ملاحظات |
|---|---|---|
| `pagination` | `false` | مُعطَّل افتراضياً — تحميل كامل مع التمرير. عند تفعيله، يُقسِّم AG Grid البيانات المحمَّلة في الذاكرة. للترقيم من الخادم استخدم `rowModel` بدلاً منه (§2.1). |
| `grandTotalRow` | `null` | `"top"` / `"bottom"` / `null`. يُحسَب من جانب العميل من الصفوف المرئية. **الأعمدة التي لها `aggFunc` فقط تُظهر قيمة في صف الإجمالي الكلي** — غيرها يبقى فارغاً. |
| `enableRowGroup` / `enablePivot` | `true` / `false` | وضعَا تجميع الصفوف والـ pivot في AG Grid. الأعمدة تحتاج `rowGroup: true` / `pivot: true` لتُجمَّع/تُحوَّل pivot افتراضياً. |
| `groupDefaultExpanded` | `-1` في وضع pivot | عدد مستويات التجميع المفتوحة عند التحميل، و`-1` تفتح كل المستويات. ويضع الخادم `-1` لـwidgets الـpivot التي لا تحدّده، لأن المجموعات المطوية تجعل الجدول المتقاطع يبدو فارغاً عند فتحه. حدّده بنفسك للتجاوز. |
| `groupIncludeFooter` | `true` عند تفعيل المجاميع الفرعية للصفوف في الـpivot | يضيف صف مجموع فرعي أسفل كل مجموعة. حدّده صراحةً لفرضه أو إلغائه. |
| `rowModel` | `"clientSide"` | `"clientSide"` يرسل كل الصفوف إلى المتصفح. `"serverSide"` يُبقي الصفوف على الخادم ويرسل صفحة واحدة في كل مرة — انظر §2.1. اسمه في المصمم: **طريقة تحميل الصفوف**. |
| `serverPageSize` | `100` | حجم الصفحة عندما يكون `rowModel` هو `"serverSide"`. إحدى القيم `25` أو `50` أو `100` أو `250` أو `500` أو `1000` أو `2500` أو `5000` أو `50000`. يُتجاهَل في وضع التحميل الكامل حيث يُستخدم `pageSize`. |

### 2.1 الترقيم من الخادم (`rowModel: "serverSide"`)

الجدول الذي يحتوي عشرات الآلاف من الصفوف يفتح ببطء إذا انتقلت كل صفوفه إلى المتصفح. مع `rowModel: "serverSide"` يُنفَّذ استعلام الـwidget مرة واحدة كما كان تماماً، لكن الخادم يحتفظ بالصفوف الجاهزة ويطلب الجدول صفحة واحدة في كل مرة. الفرز وفلاتر الأعمدة وقوائم قيم الفلتر كلها يجيب عنها الخادم على النتيجة الكاملة، فتعمل كما لو كانت كل البيانات محمّلة.

في المصمم: **Table Options ← طريقة تحميل الصفوف ← تحميل صفحة بصفحة من الخادم**، وبجانبه مربع **حجم الصفحة (الترقيم من الخادم)**.

**متى يُتجاهَل.** الترقيم من الخادم يحتاج جدولاً يستطيع الخادم تقسيمه إلى صفحات دون أن يرى المتصفح النتيجة كاملة. لذلك يعود الـwidget بصمت إلى وضع التحميل الكامل إذا تحقق أيٌّ مما يلي:

- وُجدت كتلة `pivot` (§8)؛
- ضُبط `grandTotalRow`، أو كان `groupIncludeFooter` بقيمة `true`؛
- كان لأي عمود `rowGroup: true` أو `pivot: true` أو `aggFunc`.

ويعرض المصمم هذه القاعدة أسفل مربع طريقة التحميل: «لا يُستخدم الترقيم من الخادم إذا كان في الجدول جدول محوري أو تجميع للصفوف أو تجميع للقيم أو صفوف إجماليات.»

**ما يتغيّر للمستخدم في وضع الخادم:**

- الترقيم مُفعَّل دائماً، وقائمة أحجام الصفحة هي القائمة أعلاه.
- لا يتوفر تجميع الصفوف ولا الـpivot: لا يمكن سحب الأعمدة إلى مجموعات، ولوحة الأعمدة بلا وضع pivot.
- النقر وإصدار الفلتر المتقاطع والـdrill-down والـdrill-by وروابط السجلات تعمل كما في وضع التحميل الكامل.
- **التصدير إلى Excel** يصدّر كل الصفوف المطابقة للفلاتر والفرز الحاليين، لا الصفحة المحمّلة فقط.
- تبقى الصفوف على الخادم 15 دقيقة دون استخدام. بعدها (أو بعد إعادة تشغيل الخادم) يجعل طلب الصفحة التالية الـwidget يعيد تنفيذ استعلامه ويُحدِّث نفسه تلقائياً. الذاكرة مشتركة بين كل المستخدمين وحدّها الافتراضي مليون صف إجمالاً (خاصية النظام `nama.bi.enhancedTable.maxCachedRows`)؛ وعند امتلائها تُحذف الجداول الأقدم استخداماً أولاً وتُعاد بالطريقة نفسها.
- زر المسؤول **نسخ JSON البيانات (Copy Data JSON)** يُظهر مصفوفة `rows` فارغة ومعها مدخل `serverSide` يحمل عدد الصفوف، لأن الصفوف لم تعد في المتصفح.

## 3. تعريف العمود (Column definition)

```json
{
  "id":            "amountCol",
  "field":         "netValue",
  "wizardFieldId": "price.netValue",
  "groupId":       "salesGroup",
  "headerArTitle": "الصافي",
  "headerEnTitle": "Net Value",
  "hide":          false,
  "width":         120,
  "minWidth":      80,
  "maxWidth":      240,
  "flex":          null,
  "pinned":        null,
  "sort":          null,
  "sortIndex":     null,
  "rowGroup":      false,
  "rowGroupIndex": null,
  "pivot":         false,
  "aggFunc":       "sum",
  "tooltipField":  null,
  "formatting":    { },
  "renderer":      { },
  "conditionalFormatting": { }
}
```

| الحقل | مطلوب | الوصف |
|---|---|---|
| `id` | نعم | معرِّف ثابت. يُستخدم بواسطة الـ mappings (حقل `column`)، و`compareColumn`، ومعرِّف عمود AG Grid. |
| `field` | أحدهما | اسم عمود SQL من `dataSource` الـ widget. |
| `wizardFieldId` | أحدهما | معرِّف حقل الـ wizard (وضع wizard). يُحلَّل عبر `displayAlias` المخزَّن مؤقتاً. انظر `bi-reference-wizard-mode.md`. |
| `groupId` | لا | يُشير إلى `columnGroups[].id`. |
| `headerArTitle` / `headerEnTitle` | لا | رأس العمود بلغتين. يرجع إلى `id` في حالة الغياب. |
| `hide`، `width`، `minWidth`، `maxWidth`، `flex` | لا | تخطيط AG Grid. |
| `pinned` | لا | `"start"` / `"end"` / `null`. تثبيت منطقي يتقلب مع اتجاه القراءة. |
| `sort`، `sortIndex` | لا | ترتيب أولي. |
| `rowGroup`، `rowGroupIndex`، `pivot`، `aggFunc` | لا | التجميع. `aggFunc`: `"sum"`، `"avg"`، `"min"`، `"max"`، `"count"`، `"first"`، `"last"`. |
| `tooltipField` | لا | `id` عمود آخر تُعرض قيمته كـ tooltip لهذه الخلية. |
| `formatting` | لا | §4.1 أدناه. |
| `renderer` | لا | §4.2 أدناه. الافتراضي `text`. |
| `conditionalFormatting` | لا | §5 أدناه. |

## 4. التنسيق والـ renderers (Formatting & renderers)

### 4.1 `formatting`

سلسلة عرض تُحسَب من جانب الخادم؛ يستخدمها العميل كما هي.

```json
"formatting": {
  "type":              "currency",
  "decimals":          2,
  "thousandSeparator": true,
  "currencyCode":      "SAR",
  "currencySymbol":    "SAR",
  "currencyPlacement": "suffix",
  "dateFormat":        "yyyy-MM-dd",
  "percentScale":      "asIs",
  "nullDisplay":       "—",
  "prefix":            "",
  "suffix":            ""
}
```

| `type` | الناتج | خيارات إضافية |
|---|---|---|
| `text` | بدون تغيير | — |
| `number` | `1,234.50` | `decimals`، `thousandSeparator` |
| `currency` | `1,234.50 SAR` | `decimals`، `currencySymbol`، `currencyPlacement` (`prefix`/`suffix`) |
| `percent` | `45.00%` | `decimals`، `percentScale` (`asIs`: 45→45%; `fraction`: 0.45→45%) |
| `date` | `2026-04-19` | `dateFormat` (SimpleDateFormat، الافتراضي `yyyy-MM-dd`) |
| `datetime` | `2026-04-19 14:30` | `dateFormat` (الافتراضي `yyyy-MM-dd HH:mm`) |
| `duration` | `1:23:45` | المدخل بالثواني |

`prefix`/`suffix` تُلتصق بالسلسلة المنسَّقة. `nullDisplay` تحلّ محل القيم الفارغة (الافتراضي `""`).

**ملاحظة:** حقل رمز العملة هنا هو `currencySymbol`. الكتلة `dataMapping.series[].format` في ECharts تستخدم `currency` بدلاً منه — ليسا قابلَين للتبادل. انظر المرجع الرئيسي §7.

### 4.2 `renderer`

```json
"renderer": {
  "type": "text" | "html" | "badge" | "bar" | "sparkline" | "progress" | "icon",
  "badge":    { "shape": "pill" | "square", "variant": "solid" | "outline" },
  "bar":      { "min": 0, "max": 100, "color": "#4caf50", "style": "simple" | "interactive" },
  "progress": { "min": 0, "max": 100, "style": "simple" | "interactive" },
  "icon":     { "mapping": [ { "when": "Approved", "icon": "check_circle", "color": "#2e7d32" } ], "position": "prefix" | "replace" },
  "sparkline":{ "type": "line" | "column" | "area", "lineColor": "#2196F3", "fill": "rgba(33,150,243,0.2)" }
}
```

حقل `style` في `bar` و`progress` يختار محرك الرسم:

| `style` | المظهر البصري |
|---|---|
| `simple` *(الافتراضي)* | div بـ CSS خالص مع تعبئة ملوَّنة — خفيف الوزن، بدون محرك رسم، واضح بأي حجم |
| `interactive` | شريط أفقي بـ ECharts مع tooltip عند التمرير |

تُرسَم الـ sparklines دائماً عبر ECharts (رسم مصغَّر line / area / column مع tooltip)؛ لا يوجد خيار style.

دمج `simple` و`interactive` في صف واحد مدعوم ومفيد في أغلب الأحيان — مثلاً: شريط CSS لـ `invoiced %` بجانب شريط ECharts تفاعلي لـ `revenue` يُشير بصرياً إلى أيهما يستحق الاستكشاف.

| النوع | المظهر البصري | ملاحظات |
|---|---|---|
| `text` | نص عادي | الافتراضي. لا حاجة لكتلة renderer. |
| `html` | HTML خام عبر `v-html` | نموذج الثقة يطابق `Param_INHTML` القديم — لا تطهير من جانب العميل. التصدير إلى Excel وفلتر العمود يستخدمان النص الظاهر للخلية: تُحذف الوسوم والسكربتات والأنماط والعناصر المخفية، و`<br>` يصبح سطراً جديداً. |
| `badge` | pill/مربع بنص الخلية | `bg`/`color` تأتي من `conditionalFormatting`؛ يرجع إلى أزرق فاتح. مع variant `outline` يتناسب مع `bg` الشرطي لتأثير pill مصبوغ. |
| `bar` | شريط أفقي مملوء (CSS افتراضياً، ECharts عند `style: "interactive"`) | القيمة مُدرجَة من `min` إلى `max`. **`max` اختياري** — عند حذفه يُضبط الـ renderer تلقائياً على الحد الأقصى لبيانات العمود (النمط الشائع). |
| `progress` | نفس آلية `bar`، تعبئة زرقاء | دلالياً "تقدّم نحو الهدف". |
| `sparkline` | رسم ECharts مصغَّر متعدد النقاط | يقرأ السلسلة من حقل SQL الخاص بالعمود — سلسلة CSV مثل `1,5,9,12` أو مصفوفة JSON `[1,5,9,12]`. |
| `icon` | قيمة الخلية مطابَقة مع `mapping[].when` | المدخل المطابق يُظهر أيقونة (يحلّ محل النص عند `position: "replace"`). |

## 5. التنسيق الشرطي (Conditional formatting)

القواعد تُقيَّم من جانب الخادم؛ النمط الفائز مضمَّن في حمولة الاتصال — العميل لا يُقيِّم أي قواعد.

```json
"conditionalFormatting": {
  "cascade": false,
  "rules": [
    { "when": { "type": "threshold", "op": ">=", "value": 1000 },
      "style": { "bg": "#e8f5e9", "color": "#1b5e20", "bold": true } },
    { "when": { "type": "threshold", "op": "<", "value": 0 },
      "style": { "bg": "#ffebee", "color": "#b71c1c", "bold": true } },
    { "when": { "type": "range", "min": 0, "max": 100, "maxExclusive": true },
      "style": { "bg": "#fff3e0" } },
    { "when": { "type": "enum", "values": ["Cancelled", "Rejected"] },
      "style": { "bg": "#eeeeee", "italic": true } },
    { "when": { "type": "compareColumn", "op": ">", "column": "budgetCol" },
      "style": { "bg": "#ffebee", "color": "#b71c1c" } },
    { "when": { "type": "isNull" },
      "style": { "italic": true, "color": "#9e9e9e" } }
  ]
}
```

**أنواع القواعد**:

| `type` | المعاملات | المقارنة |
|---|---|---|
| `threshold` | `op`، `value` | رقمي (أو تاريخ إذا كان `formatting.type` للعمود هو `date`/`datetime`). يُحوِّل كلا الطرفين؛ تُتجاهَل القاعدة إذا فشل التحويل — لا يمر أبداً إلى مقارنة نصية. |
| `range` | `min`، `max`، `minExclusive?`، `maxExclusive?` | نفس التحويل. |
| `compareColumn` | `op`، `column` (`id` عمود آخر) | مقارنة بخلية أخرى في نفس الصف. |
| `enum` | `values[]` | مساواة نصية حساسة لحالة الأحرف على قيمة الخلية بعد trim. |
| `isNull` / `isNotNull` | — | يختبر القيمة الخام قبل التحويل. |

العوامل: `>`، `>=`، `<`، `<=`، `=`، `!=`.

**`cascade`**: `false` (الافتراضي) ← أول تطابق يفوز وتتوقف المعالجة. `true` ← كل تطابق يُضاف فوق السابق (المفاتيح اللاحقة تُلغي السابقة).

**وصفة إشارة المرور**: مع `cascade: false` (الافتراضي)، رتّب القواعد **بالأشد تحديداً أولاً** حتى تفوز الحالة الأشد:

```json
"rules": [
  { "when": { "type": "threshold", "op": "<",  "value": 0   }, "style": { "bg": "#991b1b", "color": "#ffffff", "bold": true } },
  { "when": { "type": "threshold", "op": "<=", "value": 30  }, "style": { "bg": "#fecaca", "color": "#991b1b", "bold": true } },
  { "when": { "type": "threshold", "op": "<=", "value": 60  }, "style": { "bg": "#fde68a", "color": "#92400e" } },
  { "when": { "type": "threshold", "op": ">",  "value": 60  }, "style": { "bg": "#bfdbfe", "color": "#1e40af" } }
]
```

**مفردات الـ style** (لا CSS خام — مجموعة ثابتة محدودة):

| المفتاح | CSS المقابل |
|---|---|
| `bg` | `background-color` — يبقى كما كُتب طالما تباين مع لون نص السمة، وإلا رُسم كـ tint (§5.1) |
| `color` | `color` |
| `bold` | `font-weight: 700` |
| `italic` | `font-style: italic` |
| `underline` | `text-decoration: underline` |
| `border` | `border` (اختصار، سلسلة موثوقة) |
| `align` | `text-align` (`start`/`center`/`end`) |

### 5.1 الخلفيات والوضع الداكن

لوحة المعلومات تتبع سمة المستخدم (فاتح/داكن)، بينما اللون المكتوب داخل القاعدة ثابت. فأي تعبئة
فاتحة اختيرت أثناء النظر إلى السمة الفاتحة (`#fff8e1` أو `#e8f5e9` …) تصبح فاتحًا على فاتح — أي غير
مقروءة — بمجرد فتح اللوحة في الوضع الداكن، والتعبئة الداكنة تعاني نفس المشكلة في الوضع الفاتح.
الويدجت يعالج ذلك حسب السمة:

- **`bg` وحده** يُرسم كما كُتب تمامًا *طالما بقي لون نص السمة متباينًا معه*. والألوان الفاتحة في
  السمة الفاتحة تجتاز هذا الاختبار، لذا تبقى اللوحات الحالية كما هي في الوضع الفاتح. أما إذا كان
  التباين ضعيفًا — لون فاتح في الوضع الداكن، أو تعبئة داكنة في الوضع الفاتح — فيُرسم نفس اللون
  كـ **tint** (صبغة) مركَّبة فوق الجدول بشفافية 22%. وبذلك يتحوّل الصف الكريمي الفاتح إلى شريط
  كهرماني داكن في الوضع الداكن، فيحتفظ بلونه ويبقى لون نص السمة مقروءًا. ولا يحتاج الأمر أي ضبط
  لكل سمة.
- **`bg` مع `color`** يُطبَّقان كما كُتبا تمامًا وبدون أي تعديل: هنا أنت من أمسك بزمام الاثنين
  وأنت المسؤول عن مراجعتهما في السمتين. استخدم ذلك للأنماط الصمّاء على هيئة chip مثل
  `{ "bg": "#2e7d32", "color": "#ffffff" }`، فهي تُقرأ في الحالتين لأنها تحمل لون نصها معها.
- **`color` وحده** بدون `bg` يُعامَل بنفس المنطق لكن من الجهة المقابلة: يبقى كما كُتب طالما ظل
  مقروءًا على خلفية الجدول نفسها، وإلا سار في اتجاه السمة — أفتح في الوضع الداكن وأغمق في الوضع
  الفاتح — بخطوات تحافظ على درجة لونه. فالأخضر الغامق `#1b5e20` يبقى كما هو في الوضع الفاتح ويتحول
  إلى أخضر فاتح مقروء في الوضع الداكن.
- **اللون الذي يحمل شفافية أصلًا** — `rgba(...)` بوسيط alpha، أو hex من 4 أو 8 خانات — يمرّ كما هو
  دون تغيير: فأنت اخترت قوة الصبغة بنفسك. وكذلك كل ما ليس له لون ثابت يمكن الحكم عليه، مثل
  `var(...)` أو `color-mix(...)`.

ويقبل `bg` و`color` أي صيغة لون في CSS: hex أو `rgb()` أو `rgba()` أو `hsl()` أو اسم لون مثل
`lightyellow`.

الخلاصة: إمّا أن تكتب `bg` وحده وتترك الويدجت يغطّي السمتين (وهو الخيار الآمن الافتراضي)، وإمّا أن
تكتب `bg` و`color` معًا وتراجع السمتين بنفسك.

الـ renderer من نوع `badge` غير متأثر: فحبّاته (pills) تحدّد لون نصها دائمًا (§4).

### 5.2 `rowConditionalFormatting`

نفس المفردات، تُطبَّق على مستوى الصف. **يجب أن تسمّي كل قاعدة عمود الاختبار عبر `when.column`** — لا يوجد "هذه الخلية" ضمني. النمط الفائز يُطبَّق على الصف كاملاً عبر `getRowStyle` في AG Grid.

```json
"rowConditionalFormatting": {
  "cascade": false,
  "rules": [
    { "when": { "type": "threshold", "column": "marginCol", "op": "<", "value": 0 },
      "style": { "bg": "#ffebee" } },
    { "when": { "type": "enum", "column": "statusCol", "values": ["Cancelled"] },
      "style": { "bg": "#fafafa", "italic": true } }
  ]
}
```

## 6. مثال كامل (Complete example)

```json
{
  "tableOptions": {
    "pagination": false, "rowNumbers": true,
    "enableRowGroup": true, "grandTotalRow": "bottom"
  },
  "columnGroups": [
    { "id": "customerGroup", "headerArTitle": "بيانات العميل", "headerEnTitle": "Customer", "marryChildren": true }
  ],
  "columns": [
    { "id": "invoiceCode",  "field": "invoiceCode",  "headerArTitle": "الفاتورة", "headerEnTitle": "Invoice", "pinned": "start", "width": 120 },
    { "id": "valueDate",    "field": "valueDate",    "headerArTitle": "التاريخ",  "headerEnTitle": "Date", "formatting": { "type": "date" }, "width": 110 },
    { "id": "customerName", "field": "customerName", "groupId": "customerGroup", "headerArTitle": "العميل", "headerEnTitle": "Customer" },
    { "id": "branchName",   "field": "branchName",   "groupId": "customerGroup", "headerArTitle": "الفرع",  "headerEnTitle": "Branch" },
    { "id": "qty", "field": "qty", "headerArTitle": "الكمية", "headerEnTitle": "Qty",
      "formatting": { "type": "number", "decimals": 0 },
      "renderer":   { "type": "progress", "progress": { "min": 0, "max": 50 } },
      "aggFunc": "sum", "width": 140 },
    { "id": "netValue", "field": "netValue", "headerArTitle": "الصافي", "headerEnTitle": "Net",
      "formatting": { "type": "currency", "decimals": 2, "currencySymbol": "SAR" },
      "aggFunc": "sum",
      "conditionalFormatting": { "rules": [
        { "when": { "type": "threshold", "op": ">=", "value": 10000 }, "style": { "bg": "#e8f5e9", "color": "#1b5e20", "bold": true } },
        { "when": { "type": "threshold", "op": "<",  "value": 0 },     "style": { "bg": "#ffebee", "color": "#b71c1c", "bold": true } }
      ] } },
    { "id": "tier", "field": "tier", "headerArTitle": "الفئة", "headerEnTitle": "Tier",
      "renderer": { "type": "badge", "badge": { "shape": "pill" } },
      "conditionalFormatting": { "rules": [
        { "when": { "type": "enum", "values": ["High"] },   "style": { "bg": "#2e7d32", "color": "#ffffff" } },
        { "when": { "type": "enum", "values": ["Medium"] }, "style": { "bg": "#f9a825", "color": "#ffffff" } },
        { "when": { "type": "enum", "values": ["Low"] },    "style": { "bg": "#9e9e9e", "color": "#ffffff" } }
      ] } }
  ],
  "rowConditionalFormatting": { "rules": [
    { "when": { "type": "threshold", "column": "netValue", "op": ">=", "value": 50000 }, "style": { "bg": "#fff8e1", "bold": true } }
  ] },
  "clickEmitMapping": [
    { "crossFilterCode": "customerFilter", "column": "customerName", "valueColumn": "customerName" }
  ]
}
```

## 7. الترحيل من `Table`

لا يوجد ترقية تلقائية. التفعيل يتم لكل widget على حدة:

1. غيّر `type` من `Table` إلى `EnhancedTable`.
2. افتح محرر chart-config ← تبويب **Table Columns** ← انقر **Generate Columns From Result Set**.
3. خصِّص التنسيق / الـ renderers / التنسيق الشرطي.

تستمر `clickEmitMapping` / `drillDownMapping` / `linkMappings` الموجودة في العمل — يطابق `column` معرِّفات الأعمدة المُولَّدة تلقائياً (التي تأخذ اسم عمود SQL افتراضياً).

## 8. تخطيط الـ Pivot (cross-tab)

يحوِّل وضع الـ pivot الـ `EnhancedTable` إلى cross-tab بأسلوب JasperReports: محددات الصفوف تصبح مجموعات صفوف، ومحددات الأعمدة تصبح رؤوس أعمدة متداخلة، والمقاييس تملأ تقاطعات الخلايا — مع إجماليات جزئية اختيارية في كل مستوى وإجمالي كلي. تُتجاهَل كتلة `columns` المكتوبة يدوياً عند تعيين `pivot`؛ يُركِّب المحرك الأعمدة والمجموعات المتداخلة وخطة الصفوف من جانب الخادم.

### 8.1 الإعداد (Configuration)

```json
{
  "pivot": {
    "rowDimensions":      [ { "field": "sCode", "headerEnTitle": "Section" }, { "field": "iCode", "headerEnTitle": "Item" } ],
    "colDimensions":      [ { "field": "bCode", "headerEnTitle": "Branch" }, { "field": "wCode", "headerEnTitle": "Warehouse" } ],
    "measures": [
      { "field": "netQty",  "headerEnTitle": "Qty",  "aggFunc": "sum", "formatting": { "type": "number",   "decimals": 2 } },
      { "field": "netCost", "headerEnTitle": "Cost", "aggFunc": "sum", "formatting": { "type": "currency", "decimals": 2, "currencySymbol": "SAR" } }
    ],
    "useRowGrouping":     true,
    "rowSubtotals":       true,
    "colSubtotals":       true,
    "rowGrandTotal":      "bottom",
    "colGrandTotal":      "end",
    "subtotalLabelKey":   "biSubtotal",
    "grandTotalLabelKey": "biGrandTotal",
    "emptyCellAs":        null,
    "zeroAsEmpty":        true
  }
}
```

| الحقل | الافتراضي | ملاحظات |
|---|---|---|
| `rowDimensions` | مطلوب | مرتبة من الخارج للداخل. كل مدخل: `field` (اسم alias في SQL) **أو** `wizardFieldId`، رؤوس اختيارية + `formatting`. |
| `colDimensions` | مطلوب | نفس الشكل؛ الترتيب يتحكم في تداخل الرؤوس. |
| `measures` | مطلوب | كل مدخل: `field`/`wizardFieldId`، رؤوس، `aggFunc` (الافتراضي `sum`؛ الإصدار الأول يدعم `sum` فقط)، `formatting`، `conditionalFormatting` اختياري (يُطبَّق على أعمدة الورقة والإجماليات الجزئية والكلية المشتقة من هذا المقياس). |
| `useRowGrouping` | `true` | عند true وعدد محددات الصفوف ≥2، تصبح N-1 المحددات الخارجية مجموعات صفوف في AG Grid؛ أدناها هو صف الورقة. مع محدد صف واحد، التجميع لا فائدة منه — يعود الـ backend لصفوف مسطحة مع صفوف إجمالية جزئية/كلية مضمَّنة. |
| `rowSubtotals` | `false` | صفوف تذييل إجمالي جزئي لكل مجموعة. مع التجميع النشط ← AG Grid يُنشئها من جانب العميل. بدونه ← الـ backend يضمِّنها في النتائج. |
| `colSubtotals` | `false` | أعمدة إجمالي جزئي في كل مستوى col-dim غير ورقي. تُنشأ دائماً من جانب الـ backend (AG Grid لا يستطيع تركيب أعمدة cross-tab). |
| `rowGrandTotal` | `null` | `"top"` / `"bottom"` / `null`. مع التجميع: `grandTotalRow` في AG Grid. بدونه: مضمَّن في مجموعة النتائج. |
| `colGrandTotal` | `null` | `"start"` / `"end"` / `null`. **منطقي** — `start` = الحافة الأمامية بأي اتجاه قراءة. |
| `subtotalLabelKey` / `grandTotalLabelKey` | مُضمَّن | مفاتيح i18n؛ الواجهة الأمامية تحلّها عبر `Translator.translate()`. يرجع إلى `Subtotal` / `Grand Total` (والعربية). |
| `emptyCellAs` | `null` | ما تعرضه خلايا بلا بيانات: `null` (فارغة)، `0`، `"-"`، إلخ. |
| `zeroAsEmpty` | `false` | المقياس الذي يُجمِّع إلى صفر بالضبط ← يُعرَض كـ `emptyCellAs`. |

### 8.2 ما يُصدره المحرك

يمر على الصفوف مرة واحدة، يبني أشجاراً متميزة من tuples الصفوف/الأعمدة (مرتبة أبجدياً لكل مستوى)، يُعيد تجميع `(rowTuple, colTuple) → measures` عبر `sum`، ويُصدر:

- **`columns` مُركَّبة**: M أعمدة من محددات الصفوف (مثبتة `start`) + أعمدة مقاييس الورقة متخللة مع أعمدة إجمالي جزئي للأعمدة (لكل بادئة غير ورقية) + أعمدة إجمالي كلي للأعمدة في الطرف المختار. معرِّفات ثابتة مثل `pv:bCode=B1.wCode=W1:m=netQty`.
- **`columnGroups` متداخلة** مع `parentGroupId`: واحدة لكل بادئة tuple أعمدة غير ورقية.
- **صفوف مُركَّبة**: مع التجميع، صفوف البيانات الورقية فقط؛ بدونه، صفوف ورقية + إجمالية جزئية + إجمالية كلية متداخلة.
- **`enhancedTableData.styles`**: الصفوف/الأعمدة الإجمالية مُوسَمة عبر علامة `t` (`0`=كلي، `n>0`=جزئي عند العمق `n`)؛ يُطبَّق عريض + صبغة افتراضياً. `conditionalFormatting` الصريح يفوز دائماً.
- **`agColumnCellDataTypes`**: كل عمود مقياس مُوسَم `"number"` حتى تتدفق قيم الخلايا كأرقام JSON (مطلوب لتجميعات `aggFunc` في صفوف المجموعات).

### 8.3 وضع Wizard

في وضع wizard (الـ widget له `wizardDataSource`)، استخدم `wizardFieldId` بدلاً من `field` في كل محدد/مقياس. `WizardChartConfigRewriter` يحلّه إلى SQL alias المخزَّن مؤقتاً (`displayAlias`) قبل تشغيل المحرك.

### 8.4 تخطي التفاعل على الإجماليات

صفوف وأعمدة الإجمالي الجزئي والكلي هي تجميعات مشتقة بلا صف مصدر أساسي، لذا تتجاوزها click-emit / drill-down / link / drill-down-by جميعها. تُكشَف عبر علامة `t` في بيانات الصف (`_totalLevel`) وإعداد العمود (`t`). تلميح المؤشر مُعطَّل أيضاً.

### 8.5 التعايش مع pivot من جانب العميل في AG Grid

`tableOptions.enablePivot` (pivot بالسحب في وقت التشغيل) مستقل تماماً ويبقى كما هو. استخدمه للاستكشاف الحر؛ استخدم كتلة `pivot` للتقارير cross-tab التي يحددها المؤلف.

### 8.6 مثال pivot كامل

```sql
select w.code wCode, b.code bCode, i.code iCode, s.code sCode,
       sum(q.net) netQty, sum(q.netCost) netCost
from   ItemDimensionsQty q
left join InvItem      i on i.id = q.item_id
left join ItemSection  s on s.id = i.section_id
left join Warehouse    w on w.id = q.warehouse_id
left join Branch       b on b.id = w.branch_id
group  by w.code, b.code, i.code, s.code
```

```json
{
  "pivot": {
    "rowDimensions": [
      { "field": "sCode", "headerEnTitle": "Section",   "headerArTitle": "القسم" },
      { "field": "iCode", "headerEnTitle": "Item",      "headerArTitle": "الصنف" }
    ],
    "colDimensions": [
      { "field": "bCode", "headerEnTitle": "Branch",    "headerArTitle": "الفرع" },
      { "field": "wCode", "headerEnTitle": "Warehouse", "headerArTitle": "المخزن" }
    ],
    "measures": [
      { "field": "netQty",  "headerEnTitle": "Qty",  "headerArTitle": "الكمية",  "aggFunc": "sum", "formatting": { "type": "number", "decimals": 0 } },
      { "field": "netCost", "headerEnTitle": "Cost", "headerArTitle": "التكلفة", "aggFunc": "sum",
        "formatting": { "type": "currency", "decimals": 2, "currencySymbol": "SAR" },
        "conditionalFormatting": { "rules": [
          { "when": { "type": "threshold", "op": ">=", "value": 1000000 }, "style": { "bold": true, "color": "#1b5e20" } }
        ] } }
    ],
    "useRowGrouping": true, "rowSubtotals": true, "colSubtotals": true,
    "rowGrandTotal": "bottom", "colGrandTotal": "end",
    "zeroAsEmpty": true, "emptyCellAs": "-"
  }
}
```
