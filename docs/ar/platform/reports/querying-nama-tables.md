# الاستعلام من جداول نما بلغة SQL

تجمع هذه الصفحة القواعد التي يجب أن يلتزم بها كل استعلام SQL على قاعدة بيانات نما، سواء كان مصدرًا لتقرير أو لـWidget في وحدة ذكاء الأعمال أو لكيان افتراضي أو لشرط اعتماد، أو كان استعلامًا سريعًا أثناء مكالمة دعم فني. يعمل نما على Microsoft SQL Server، فكل ما هنا بلغة T-SQL.

كل قاعدة هنا سببها أن تجاهلها ينتج استعلامًا يعمل بلا أي خطأ ويعيد رقمًا خاطئًا. وهذا أسوأ أنواع الأخطاء، لأن أحدًا لا ينتبه له.

## القواعد

| القاعدة | معناها عمليًا |
|---|---|
| **اسم الجدول = اسم الكيان** | جدول فاتورة المبيعات هو `SalesInvoice`، وسطورها في `SalesInvoiceLine`، وملف الأصناف هو `InvItem`. يعرض موقع [dm.namasoft.com](https://dm.namasoft.com) كل جدول بأعمدته. |
| **احسب `commitedBefore = 1` فقط** | يدخل المستند جدوله من أول حفظ له، حتى لو كان مسودة. المسودة تحمل `commitedBefore = 0`، وإلغاء المستند يعيدها إلى 0. ضع `h.commitedBefore = 1` على رأس كل مستند تقرأ منه (اسم العمود مكتوب هكذا بحرف t واحد). |
| **السطور لا تحمل حالة** | لا يوجد عمود `commitedBefore` في `SalesInvoiceLine`. لاستبعاد سطور المسودات والمستندات الملغاة اربط السطر برأس مستنده وطبّق الشرط على الرأس. |
| **السطور تحمل حقول الرأس الأساسية** | يحمل السطر نسخة من تاريخ مستنده وأطرافه: في `SalesInvoiceLine` توجد `valueDate` و`customer_id` و`branch_id` و`legalEntity_id` و`warehouse_id`. جمّع وصفِّ على السطر نفسه، ولا تحتاج الرأس إلا لحالته. |
| **المعرّفات ثنائية، وحقول المرجع تنتهي بـ`_id`** | مفتاح كل جدول هو `id` (قيمة ثنائية من 16 بايت). ويُخزَّن حقل المرجع في عمود `<الحقل>_id`، فيكون الربط دائمًا `c.id = l.customer_id`. ويشير السطر إلى مستنده بعمود يحمل اسم المستند: `SalesInvoiceLine.salesInvoice_id` و`StockIssueLine.stockIssue_id`. |
| **المرجع الذي يقبل أكثر من نوع له عمودان** | عمود للمعرّف وآخر لنوع الكيان: `fromDoc_id` و`fromDoc_type` في المستند، و`subsidiaryId` و`subsidiaryEntityType` في سطر القيد. صفِّ على النوع مع المعرّف. |
| **`name1` عربي و`name2` إنجليزي** | للعملاء والأصناف والمخازن والفروع وكل الملفات الرئيسية الاسمان معًا. اختر العمود الذي يناسب لغة التقرير. |
| **المبالغ المرحّلة في `LedgerTransLine`** | عند معالجة المستند يُكتب أثره المحاسبي في `LedgerTransLine`: المبلغان `debitLocalAmount` و`creditLocalAmount` بعملة الشركة، و`account_id`، وعمودا الذمة، و`originType` / `originId` اللذان يشيران إلى المستند. الأرصدة تؤخذ من هنا، لا من إجماليات المستندات. |
| **الكميات في `QtyTransLine`** | كل حركة مخزنية صف فيه `item_id` و`warehouse_id` و`netQty` بالوحدة الرئيسية للصنف، و`qtyTransType` بقيمة `In` أو `Out`. لا تكون `netQty` سالبة أبدًا، فالاتجاه يؤخذ من `qtyTransType`. وللرصيد الحالي يحمل `ItemDimensionsQty.net` الرصيد الجاري، وهو يساوي مجموع الحركات. |

قيمة `netValue` في سطر المبيعات هي القيمة بعد خصومات السطر شاملة الضريبة.

## ثلاثة استعلامات محلولة

مبيعات كل عميل في كل شهر، من الفواتير الفعلية وحدها:

```sql
SELECT c.code, c.name1 AS customerName,
       YEAR(l.valueDate) AS yr, MONTH(l.valueDate) AS mon,
       SUM(l.netValue) AS netSales
FROM SalesInvoiceLine l
JOIN SalesInvoice h ON h.id = l.salesInvoice_id
JOIN Customer c ON c.id = l.customer_id
WHERE h.commitedBefore = 1
GROUP BY c.code, c.name1, YEAR(l.valueDate), MONTH(l.valueDate)
ORDER BY c.code, yr, mon
```

مردودات المبيعات مستند منفصل (`SalesReturn` / `SalesReturnLine`). اطرحها إن كان الرقم المطلوب صافيًا بعد المردودات.

رصيد كل عميل، من القيود:

```sql
SELECT c.code, c.name1, c.name2,
       SUM(t.debitLocalAmount - t.creditLocalAmount) AS balance
FROM LedgerTransLine t
JOIN Customer c ON c.id = t.subsidiaryId
WHERE t.subsidiaryEntityType = 'Customer'
GROUP BY c.code, c.name1, c.name2
HAVING SUM(t.debitLocalAmount - t.creditLocalAmount) <> 0
```

الكمية المتاحة لكل صنف في كل مخزن، من الحركات (أضف `AND q.valueDate <= @date` لرصيد في تاريخ سابق):

```sql
SELECT i.code, i.name1 AS itemName, w.name1 AS warehouse,
       SUM(CASE WHEN q.qtyTransType = 'In' THEN q.netQty ELSE -q.netQty END) AS onHand
FROM QtyTransLine q
JOIN InvItem i ON i.id = q.item_id
JOIN Warehouse w ON w.id = q.warehouse_id
GROUP BY i.code, i.name1, w.name1
```

## من الاستعلام إلى التقرير

الاستعلام الناجح لا يصبح بعد شيئًا يفتحه المستخدم من القائمة. هناك أربعة طرق، ويتوقف اختيارك على مقدار التحكم الذي تحتاجه في الشكل:

1. **الكيان الافتراضي** (*إدارة النظام ← التقارير ← كيان افتراضي*). احفظ الاستعلام مرة واحدة فيصبح جدولًا تختاره في أداة إنشاء التقارير وفي معالج Widget لوحات المعلومات، مع ربط أعمدة المراجع تلقائيًا. هذا هو الطريق المعتاد. راجع [دليل الكيانات الافتراضية](/ar/platform/automation-and-rules/virtual-entity-guide).
2. **أداة إنشاء التقارير** (*إدارة النظام ← التقارير ← أداة إنشاء تقرير*). إن كفاك جدول حقيقي (أو كيان افتراضي) بنت الأداة التقرير منه دون أي SQL. راجع [دليل أداة إنشاء التقارير](/ar/platform/reports/report-wizard-guide).
3. **Widget في وحدة ذكاء الأعمال بوضع SQL.** يوضع الاستعلام في الـWidget كما هو، مع العلامة `/*AND-FILTERS*/` التي تملؤها الفلاتر المتقاطعة. راجع القسم الثاني من [المرجع التقني لوحدة ذكاء الأعمال](/ar/platform/bi/bi-module-technical-reference#2-staalm-mSdr-lbynt-SQL).
4. **تصميم Jasper مكتوب نصًا.** يمكن إنشاء تعريف تقرير من نص تصميم ملصوق دون رفع أي ملف، فيبني أول حفظ الملف. راجع «تعديل التصميم في مكانه» في [دليل Jasper Reports الشامل](/ar/platform/reports/reports-guide).

القواعد نفسها تسري على الاستعلامات الصغيرة داخل النظام. فاستعلام **تطبيق عند التوافق مع الاستعلام** في تعريف الاعتماد يقرأ السجل المعتمَد عبر علامات `{fieldId}` (راجع [دليل نظام الاعتمادات](/ar/platform/approvals/approvals-system))، لكن أي جدول يربطه يحتاج شرط `commitedBefore` وربط الرأس الموضحين أعلاه.
