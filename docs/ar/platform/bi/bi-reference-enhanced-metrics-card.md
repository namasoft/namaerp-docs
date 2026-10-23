---
description: "مرجع عنصري اللوحة EnhancedMetricsCard وMetricsCards القديم: متى تستخدم كلًا منهما، وإعدادات JSON، وربط الصفوف بالبطاقات، ووضع Partition والـ sparklines، والعناوين الفرعية بـ Tempo، والخلفية الشرطية وتبديل الأيقونة، والتفاعل، ووضع Wizard، والمصمم."
entities: [DashBoardWidget]
menu: إدارة النظام ← لوحات ← عنصر اللوحة
---

# مرجع BI — EnhancedMetricsCard (وwidget المقاييس القديم MetricsCards)

مرافق لـ [`bi-module-technical-reference.md`](./bi-module-technical-reference.md). استخدم هذا الملف مع `type: "EnhancedMetricsCard"` (الحديث، يعتمد على JSON) أو `type: "MetricsCards"` (القديم، يعتمد على value-object).

يقرأ `EnhancedMetricsCard` الحقل `chartConfigJSON` بالكامل، ويدعم sparklines مدمجة، وخلفيات بطاقة شرطية، وتبديل الأيقونات، وكامل مكدس التفاعل في BI (cross-filter / drill-down / link). يستمر widget المقاييس القديم `MetricsCards` في العمل جنبًا إلى جنب؛ للتحويل إلى النوع الجديد استخدم `type: "EnhancedMetricsCard"`.

## 1. متى تستخدم كل منهما

- **شريط KPI سريع — header / value / subtitle / icon، مع شارة نسبة اختيارية** → `MetricsCards` القديم (لا يتطلب كتابة JSON؛ ولا يدعم sparklines أو خلفية شرطية).
- **أي شيء أغنى** — sparklines، ألوان بطاقة شرطية، drill-down لكل بطاقة، تجميع قائم على partition عبر صفوف SQL متعددة → `EnhancedMetricsCard`.

وفي الحالتين، ما يظهر على لوحة المعلومات هو شريط بطاقات كهذا:

![widget بطاقات مؤشرات المجموعة: ست بطاقات — الإيراد، التكلفة والمصروفات، مجمل الربح، النقدية والبنوك، الذمم المدينة، الذمم الدائنة — لكل منها قيمة ملوّنة وأيقونة بخلفية خفيفة وعنوان فرعي](images/bi-metrics-card-strip-ar.png)

## 2. الـ `MetricsCards` القديم (`type: "MetricsCards"`)

يقرأ كائن القيمة `metricsCardConfig` على مستوى **أعلى** من `DashBoardWidget` مباشرة — **وليس** `chartConfigJSON`. بطاقة واحدة لكل صف SQL. تستبدل سلاسل Tempo الصيغة `{columnName}` بقيم الصف.

```json
{
  "code": "kpi-summary",
  "name1": "ملخص",
  "name2": "Summary",
  "type": "MetricsCards",
  "dataSource": "SELECT 1 sortOrder, N'YTD Payroll' headerEn, N'إجمالي الرواتب' headerAr, 1234567 cardValue, N'Year to date' subtitleEn, N'منذ بداية العام' subtitleAr, 'attach_money' iconCode UNION ALL ... ORDER BY sortOrder",
  "metricsCardConfig": {
    "headerTempoAr":   "{headerAr}",
    "headerTempoEn":   "{headerEn}",
    "valueTempo":      "{cardValue}",
    "subtitleTempoAr": "{subtitleAr}",
    "subtitleTempoEn": "{subtitleEn}",
    "iconCode":        "{iconCode}",
    "numberFormat":    "0,0",
    "suffix":          " SAR"
  }
}
```

| الحقل | الوصف |
|---|---|
| `headerTempoAr` / `headerTempoEn` | قالب الترويسة مع استبدال `{col}`. |
| `headerColumnAr` / `headerColumnEn` | اسم العمود مباشرةً (بديل للقالب). |
| `valueTempo` / `valueColumn` | الرقم الرئيسي — قالب أو عمود مباشر. |
| `subtitleTempoAr` / `subtitleTempoEn` / `subtitleColumnAr` / `subtitleColumnEn` | السطر الثانوي. |
| `iconCode` | اسم أيقونة Material؛ يدعم استبدال `{col}` لتغيير الأيقونة لكل صف. |
| `badgePercentTempo` / `badgePercentColumn` | شارة نسبة تغيير اختيارية (الزخرفة الوحيدة الشبيهة بالرسم البياني في widget القديم). |
| `linkTempo` / `linkColumn` | رابط عند النقر — قالب Tempo أو عمود مباشر. |
| `numberFormat` | قناع numeral.js (`"0,0"` ، `"0,0.00"` ، `"0a"`). **لغة تنسيق مختلفة** عن كائن `formatting` المنظّم المستخدم في أماكن أخرى. |
| `suffix` | نص ثابت يُلحق بعد القيمة المنسقة (مثل `" SAR"`). |

عندما يكون هذا الشكل كافيًا، يكون widget القديم أقصر من `EnhancedMetricsCard`. انتقل إلى `EnhancedMetricsCard` عند الحاجة إلى sparklines أو ألوان بطاقة شرطية أو click-emit/drill-down.

## 3. الـ `chartConfigJSON` الخاص بـ EnhancedMetricsCard

```jsonc
{
  "cardLayout": {
    "direction":      "row",         // row | grid
    "minCardWidth":   220,           // px; cards wrap below this
    "gap":            12,            // px between cards
    "columnsPerRow":  null,          // null = auto-fit; integer = fixed grid
    "partitionKeys":  []             // optional — see §5
  },

  "card": {
    // Header (optional)
    "headerArTitle":  "إجمالي الموظفين النشطين",
    "headerEnTitle":  "Active Headcount",
    "headerArField":  null,           // OR per-row header from a column
    "headerEnField":  null,

    // Value slot
    "value": {
      "field":      "activeCount",
      "aggregate":  "field",           // field | sum | avg | last | first | max | min
      "formatting": { "type": "number", "decimals": 0, "thousandSeparator": true },
      "fontSize":   "32px",
      "color":      null,
      "colorField": "valueColor"
    },

    // Subtitle (Tempo template)
    "subtitle": {
      "tempoAr": "من إجمالي {totalCount} · {suspendedCount} معلق",
      "tempoEn": "of {totalCount} total · {suspendedCount} suspended"
    },

    // Icon
    "icon": {
      "code":       "people",          // static Material icon
      "field":      null,               // OR per-row column with icon code
      "color":      "#3b82f6",
      "colorField": null,
      "bg":         "#dbeafe",
      "bgField":    null
    },

    // Badge (optional delta indicator)
    "badge": {
      "field":      "deltaPercent",
      "formatting": { "type": "percent", "decimals": 1, "percentScale": "fraction" },  // SQL returns 0.125 → 12.5%
      "prefixIcon": { "positive": "trending_up", "negative": "trending_down", "zero": "remove" },
      "colorRules": { "rules": [
        { "when": { "type": "threshold", "op": ">=", "value": 0 }, "style": { "color": "#065f46" } },
        { "when": { "type": "threshold", "op": "<",  "value": 0 }, "style": { "color": "#991b1b" } }
      ] }
    },

    // Sparkline (optional)
    "sparkline": {
      "type":           "area",        // line | area | column
      "mode":           "partition",   // partition (default) | inline
      "valueField":     "v",            // partition mode — column collected across partition rows
      "orderByField":   "monthIdx",     // optional; falls back to result-set order
      "orderDirection": "asc",
      "valuesField":    null,           // inline mode — CSV / JSON-array column on a single row
      "color":          "#3b82f6",
      "smooth":         true,
      "height":         40
    },

    // Card-level styling
    "cardStyle": {
      "bg":           "#ffffff",
      "borderColor":  "#e2e8f0",
      "borderWidth":  "1px",
      "borderRadius": "12px",
      "padding":      "16px",
      "shadow":       "sm"               // none | xs | sm | md | lg
    },

    // Conditional card bg / icon swap (§7)
    "cardConditionalFormatting": {
      "cascade": false,
      "rules": [
        { "when": { "type": "threshold", "column": "expiredCount", "op": ">", "value": 0 },
          "style": { "bg": "#fef2f2", "borderColor": "#fecaca", "iconCode": "warning", "iconColor": "#dc2626" } }
      ]
    }
  },

  // Same shape as EnhancedTable / Table — applied per card
  "clickEmitMapping":  [ ],
  "drillDownMapping":  [ ],
  "linkMappings":      [ ],
  "clickAction":       { "type": "crossFilter", "targetKey": "..." }
}
```

تُعرض قيمة `percent` **كما هي** ما لم يقل التنسيق غير ذلك: `12.5` تصبح `12.5%`. وإذا كان الاستعلام يرجع كسراً (`0.125`) فأضف `"percentScale": "fraction"` كما في الشارة أعلاه، وإلا ظهرت الشارة `0.1%`. أما بقية خيارات التنسيق — المنازل العشرية والعملة والتواريخ و`nullDisplay` — فهي نفسها في EnhancedTable؛ راجع [التنسيق](/ar/platform/bi/bi-reference-enhanced-table.md#41-formatting).

### `cardLayout.direction`

| القيمة | السلوك |
|---|---|
| `"row"` | شريط يلتف تلقائيًا. يستخدم `minCardWidth` + `gap`. مناسب لأشرطة chip. |
| `"grid"` | شبكة ثابتة بعدد N لكل صف (حدد `columnsPerRow`). يعود إلى auto-fit إذا كان `columnsPerRow` فارغًا. مناسب للـ KPI tiles المحاذاة لشبكة. |

## 4. ربط البطاقة بالصف (الافتراضي — صف واحد → بطاقة واحدة)

بشكل افتراضي، **ينتج كل صف من مجموعة النتائج بطاقة واحدة**. التمييز بين البطاقات يعتمد على الأعمدة (`iconCode`، `iconColor`، `valueColor`، إلخ) — اكتب UNION ALL بصف واحد لكل بطاقة واربط كل slot بعمودها.

```sql
SELECT 1 sortOrder, 'Active Headcount' headerEn, N'إجمالي الموظفين النشطين' headerAr,
       (SELECT COUNT(*) FROM Employee WHERE firingDate IS NULL) cardValue,
       'people' iconCode, '#3b82f6' iconColor, '#dbeafe' iconBg
UNION ALL
SELECT 2, 'Hires YTD', N'تعيينات منذ بداية العام',
       (SELECT COUNT(*) FROM Employee WHERE hiring >= DATEFROMPARTS(YEAR(GETDATE()),1,1)),
       'trending_up', '#10b981', '#ecfdf5'
ORDER BY sortOrder
```

```json
{
  "card": {
    "headerArField": "headerAr",
    "headerEnField": "headerEn",
    "value":  { "field": "cardValue", "formatting": { "type": "number", "decimals": 0 } },
    "icon":   { "field": "iconCode", "colorField": "iconColor", "bgField": "iconBg" }
  }
}
```

## 5. وضع Partition — N صفوف → بطاقة واحدة

عندما ينتج SQL صفًا واحدًا لكل `(كيان، دلو-زمني)` وتريد بطاقة واحدة لكل كيان مع sparkline عبر الدلاء، اضبط `cardLayout.partitionKeys` على أعمدة معرّف الكيان:

```json
{
  "cardLayout": { "partitionKeys": ["regionId", "regionName"] },
  "card": {
    "value": { "field": "monthlySales", "aggregate": "sum" },
    "sparkline": {
      "mode": "partition", "valueField": "monthlySales",
      "orderByField": "monthIdx", "orderDirection": "asc",
      "type": "area"
    }
  }
}
```

يجمّع المحرك الصفوف وفق مفتاح tuple، ويختار **أول صف في كل partition** كممثل (يُستخدم للـ slots غير المجمّعة والتنسيق الشرطي وحمولات click/drill)، ويطوي الصفوف في slots الـ sparkline والتجميع.

| `aggregate` | السلوك |
|---|---|
| `field` (الافتراضي) | يُقرأ مباشرةً من الصف الممثل |
| `sum` / `avg` / `max` / `min` | طي رقمي عبر كل صفوف الـ partition |
| `first` / `last` | يأخذ أول / آخر صف بترتيب الـ partition |

**ترتيب Sparkline** يستخدم `orderByField` إذا كان محددًا؛ وإلا الترتيب الطبيعي لمجموعة النتائج (لذا يعمل `ORDER BY` في SQL).

**Sparkline مضمّن** (`mode: "inline"`) — مخرج طارئ عندما تكون السلسلة مجمّعة مسبقًا. اضبط `valuesField` على عمود قيمته CSV `"3,5,4,8,6"` أو مصفوفة JSON `"[3,5,4,8,6]"`.

### وصفة Inline sparkline + SQL Server STUFF

لبناء sparklines من البيانات الأساسية في وضع inline، استخدم صيغة `STUFF / FOR XML PATH('')` داخل SQL:

```sql
WITH months AS (
  SELECT idx, DATEFROMPARTS(YEAR(EOMONTH(DATEADD(MONTH,-11+idx,GETDATE()))),
                            MONTH(EOMONTH(DATEADD(MONTH,-11+idx,GETDATE()))), 1) mStart,
         EOMONTH(DATEADD(MONTH,-11+idx,GETDATE())) mEnd
  FROM (VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11)) n(idx)
),
hcSeries AS (
  SELECT m.idx,
         ISNULL((SELECT COUNT(*) FROM Employee e
                 WHERE e.hiring <= m.mEnd
                   AND (e.firingDate IS NULL OR e.firingDate > m.mEnd) /*AND-FILTERS*/), 0) v
  FROM months m
)
SELECT 1 sortOrder, N'Active Headcount' headerEn,
       (SELECT COUNT(*) FROM Employee e WHERE e.firingDate IS NULL /*AND-FILTERS*/) cardValue,
       STUFF((SELECT ',' + CAST(v AS NVARCHAR(20)) FROM hcSeries ORDER BY idx FOR XML PATH('')), 1, 1, '') trendCsv
ORDER BY sortOrder
```

كل CTE يضم جدولًا مفلترًا يحتاج إلى `/*AND-FILTERS*/` خاص به — يُستبدل الحامل الوهمي في كل مكان يظهر فيه.

```json
{
  "card": {
    "value": { "field": "cardValue" },
    "sparkline": { "mode": "inline", "valuesField": "trendCsv", "type": "area", "color": "#3b82f6" }
  }
}
```

## 6. العناوين الفرعية بـ Tempo

تستبدل قوالب العنوان الفرعي `{columnName}` بقيم أعمدة الصف:

```json
"subtitle": {
  "tempoAr": "من إجمالي {totalCount} موظف · {suspendedCount} معلق",
  "tempoEn": "of {totalCount} total · {suspendedCount} suspended"
}
```

في وضع partition، يتم الاستبدال من الصف الممثل. النمط الشائع: يعرض slot القيمة المقياس الأساسي، بينما يضم `tempoAr/En` عمودًا *ثانويًا* لإضافة السياق (مثل `"{expiredCount} منتهية · تنتهي خلال 30 يومًا"`).

## 7. خلفية البطاقة الشرطية وتبديل الأيقونة

يستخدم `cardConditionalFormatting` نفس شكل القاعدة في `rowConditionalFormatting` الخاص بـ EnhancedTable (`threshold` / `range` / `enum` / `compareColumn` / `isNull` / `isNotNull`) — لكن مفاتيح `style` المعترف بها في الإخراج تشمل على مستوى البطاقة: `bg`، `borderColor`، `borderWidth`، `borderRadius`، `padding`، `color`، بالإضافة إلى تبديل الأيقونة: `iconCode`، `iconColor`، `iconBg`.

اضبط `"cascade": true` لدمج قواعد متطابقة متعددة؛ وإلا تفوز أول قاعدة مطابقة.

### الألوان والوضع الداكن

لوحة المعلومات تتبع سمة المستخدم (فاتح/داكن)، بينما اللون المكتوب داخل البطاقة ثابت وغالبًا ما
اختير أثناء النظر إلى السمة الفاتحة. الويدجت يبقي كل لون كما كُتب طالما ظل مقروءًا مع السمة
النشطة، ولا يعدّله إلا عند الحاجة:

- **خلفية البطاقة `bg`** تُرسم دائمًا كـ **wash** — 30% من اللون الذي كتبته، مركَّبة فوق سطح البطاقة
  الخاص بالسمة — فتصبغ البطاقة في السمتين بدل أن تحبس نصها على تعبئة فاتحة. وهذا سلوك قديم؛ الجديد
  أن كل صيغ ألوان CSS صارت تُقرأ، لا hex بست خانات فقط.
- **لون النص** — `color` الخاص بالبطاقة، أو `color` في خانة القيمة، أو لون شارة/أيقونة مذكور وحده —
  يبقى كما كُتب طالما ظل مقروءًا على البطاقة خلفه، وإلا سار في اتجاه السمة (أفتح على بطاقة داكنة،
  وأغمق على بطاقة فاتحة) بخطوات تحافظ على درجة لونه. فقيمة باللون `#0e7490` تبقى كما هي في الوضع
  الفاتح وتتحول إلى تركوازي أفتح مقروء في الوضع الداكن.
- **خلفية ولون نص معًا** — شارة أو حبّة أيقونة تحدّد `bg` و`color` — يُطبَّقان كما كُتبا تمامًا: فالزوج
  يحمل تباينه معه، لذا يُترك كما هو في السمتين.
- **اللون الذي يحمل شفافية أصلًا**، أو الذي ليس له قيمة ثابتة يمكن الحكم عليها مثل `var(...)` أو
  `color-mix(...)`، يمرّ دون تغيير.

وتُقبل أي صيغة لون في CSS: hex أو `rgb()` أو `rgba()` أو `hsl()` أو اسم لون.

### وصفة شريط Chip (enum على عمود discriminator)

مناسب لصفوف "حالة الفلتر" أو "رأس chip" — بطاقة واحدة لكل chip، كل منها بلون مختلف بناءً على عمود discriminator.

```sql
SELECT 1 sortOrder, 'date' chipKind, N'📅 ' + CONVERT(NVARCHAR(20), GETDATE(), 23) chipText
UNION ALL
SELECT 2, 'branch', N'🏢 ' + ISNULL((SELECT TOP 1 br.name1 FROM Branch br WHERE br.id = (SELECT MIN(e.branch_id) FROM Employee e WHERE 1=1 /*AND-FILTERS*/)), N'كل الفروع')
UNION ALL
SELECT 3, 'payday', N'🗓️ ' + ISNULL((SELECT TOP 1 CONVERT(NVARCHAR(20), MAX(sd.valueDate), 23) FROM SalaryDocument sd LEFT JOIN Employee e ON e.id = sd.employee_id WHERE sd.commitedBefore = 1 /*AND-FILTERS*/), N'لا توجد')
ORDER BY sortOrder
```

```json
{
  "cardLayout": { "direction": "row", "gap": 8, "minCardWidth": 180 },
  "card": {
    "value": { "field": "chipText", "fontSize": "14px" },
    "cardStyle": { "borderRadius": "20px", "padding": "6px 14px", "shadow": "none", "borderWidth": "1px" },
    "cardConditionalFormatting": { "rules": [
      { "when": { "type": "enum", "column": "chipKind", "values": ["date"]   }, "style": { "bg": "#dbeafe", "borderColor": "#bfdbfe" } },
      { "when": { "type": "enum", "column": "chipKind", "values": ["branch"] }, "style": { "bg": "#f1f5f9", "borderColor": "#e2e8f0" } },
      { "when": { "type": "enum", "column": "chipKind", "values": ["payday"] }, "style": { "bg": "#fef3c7", "borderColor": "#fde68a" } }
    ] }
  }
}
```

## 8. Cross-filtering وDrill-down والروابط

يستخدم `clickEmitMapping` و`drillDownMapping` و`linkMappings` و`clickAction` نفس الشكل تمامًا كما في EnhancedTable / legacy Table (المرجع الرئيسي §4 / §5 / §5b). مصفوفة `points` تتوافق 1:1 مع البطاقات المعروضة بالترتيب. في وضع partition، تتوفر فقط أعمدة الصف الممثل لحمولات النقر — أعمدة الصفوف الأخرى في الـ partition غير المفتاحية تُتجاهل.

## 9. وضع Wizard

كل slot من نوع `*field` يقبل عنصرًا شقيقًا `wizardFieldId` يُحلَّل إلى `displayAlias` الخاص بالـ wizard عند وقت العرض، مطابقًا لنمط wizard في EnhancedTable / EChart. **استثناء**: `sparkline.valuesField` (وضع inline) — أعمدة CSV / JSON-array لا تتلاءم مع تجريد wizard-field؛ مراجع الأعمدة الخام فقط هناك.

## 10. المصمم (Designer)

افتح مربع حوار chart-config من سجل الـ widget نفسه عبر إجراء **Edit Chart Config**. يكتشف مربع الحوار `type: "EnhancedMetricsCard"` ويعرض تبويب **Card Template** إلى جانب **Click & Links** و**Drill-Down Mapping** — ولا يوجد تبويب Data Mapping لهذا النوع من الـ widgets، ولا لوحة معاينة حية. يحتوي تبويب Card Template على أقسام قابلة للتوسع: Card Layout، Header، Value Slot، Subtitle، Icon، Badge، Sparkline، بالإضافة إلى محرري JSON خام لـ Card Style وCard Conditional Formatting. يتبدّل محدد الحقول تلقائيًا بين أعمدة SQL (الوضع الخام) وحقول wizard (عند ضبط `wizardDataSource`).

![مصمم بطاقات المؤشرات على تبويب Card Template، مع فتح أقسام تخطيط البطاقة (الاتجاه، أقل عرض، الفراغ، عدد الأعمدة في الصف، مفاتيح التقسيم) والرأس وفتحة القيمة (الحقل، التجميع، التنسيق، حجم الخط، حقل اللون) وبقية الفتحات مطوية](images/bi-metrics-card-designer-ar.png)
