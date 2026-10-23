---
entities: [MobileQRIntegrator]
menu: الأساسيات ← إعدادات التطبيقات ← Mobile QR Integrator
---

# دليل Mobile QR Integrator

## نظرة عامة
Mobile QR Integrator هي خاصية قوية تُمكّن نما ERP من الاستجابة لرموز QR التي تمسحها الأجهزة المحمولة. تتيح إنشاء الكيانات وتحديثها وتنفيذ إجراءات مخصصة بشكل ديناميكي استناداً إلى بيانات رمز QR، مما يوفر تكاملاً سلساً بين رموز QR المطبوعة ونظام ERP.

## البنية التقنية

### المكونات
1. **كيان MobileQRIntegrator**: يحدد كيفية استجابة النظام لرموز QR الممسوحة
2. **منشئ رمز QR**: ينشئ رموز QR في Jasper Reports باستخدام `NamaRep.mobileQr()`
3. **الماسح الضوئي للجوال**: ماسح QR مبني على Flutter في تطبيق نما ERP للجوال
4. **تكامل مسار الكيان**: ينفذ منطق العمل المخصص عند مسح رمز QR

### تدفق البيانات
```
إنشاء رمز QR (التقرير) ← طباعة رمز QR ← المسح بالجوال ←
معالجة الخادم ← إنشاء/تحديث الكيان ← عرض الاستجابة
```

## الإعداد

### إعداد كيان MobileQRIntegrator

MobileQRIntegrator هو كيان ملف رئيسي يحتوي على الحقول الرئيسية التالية:

| الحقل | النوع | الوصف | مطلوب |
|-------|-------|-------|-------|
| code | String | معرف فريد للمُدمج | نعم |
| name1 | String | الاسم بالعربية | نعم |
| name2 | String | الاسم بالإنجليزية | لا |
| createdEntityType | EntityTypeDF | نوع الكيان المراد إنشاؤه/البحث عنه | نعم |
| creationType | EntityCreationType | سلوك الإنشاء (CreateOnly, UpdateOnly, CreateAndUpdate) | نعم |
| entityFlow | EntityFlow | مسار الكيان المراد تنفيذه على الكيان | نعم |
| finderQuery | QueryDF | استعلام SQL للبحث عن كيان موجود | مشروط |
| successTempo | LongTextDF | قالب رسالة النجاح | لا |

#### أنواع الإنشاء
- **CreateOnly**: ينشئ كياناً جديداً دائماً
- **UpdateOnly**: يُحدّث الكيانات الموجودة فقط (يفشل إن لم يُعثر عليها)
- **CreateAndUpdate**: ينشئ كياناً جديداً أو يُحدّث موجوداً بناءً على استعلام البحث

::: warning تحققات مهمة
- بالنسبة لنوعَي UpdateOnly وCreateAndUpdate، يُشترط توفر finderQuery
- يجب أن يحتوي مسار الكيان على سطر إجراء يدوي واحد على الأقل
- ينبغي ضبط `requiresCommitOnManual` على true في مسار الكيان
:::

### متطلبات مسار الكيان

يجب أن يستوفي مسار الكيان المُشار إليه بالمُدمج الشروط التالية:
1. احتواؤه على إجراء واحد على الأقل بقيمة `targetAction: "Manual"`
2. ضبط `requiresCommitOnManual: true` للحفظ التلقائي، وإلا ستفشل التحديثات
3. الوصول إلى معاملات QR عبر متغيرات `$map`

![مُكامل QR للموبايل ينشئ خيط بيع أو يحدّثه من رمز QR في المعرض](images/administration/mobile-qr-integrator-ar.png)

## إنشاء رمز QR

### استخدام NamaRep.mobileQr() في Jasper Reports

```java
// رمز QR أساسي
NamaRep.mobileQr()
    .code("IntegratorCode")
    .toString()

// رمز QR مع معاملات
NamaRep.mobileQr()
    .code("CustomerInvoice")
    .addParam("customer", $F{customerCode})
    .addParam("branch", $F{branchId})
    .toString()

// رمز QR مشفّر (Base64)
NamaRep.mobileQr()
    .code("SecureAction")
    .addParam("sensitive", $F{data})
    .encrypted()
    .toString()

// استخدام معرّف الكيان بدلاً من الكود
NamaRep.mobileQr()
    .id($F{integratorId})
    .addParam("ref", $F{reference})
    .toString()
```

### بنية رمز QR

يحتوي رمز QR المُنشأ على بيانات JSON:
```json
{
  "idOrCode": "IntegratorCode",
  "params": {
    "param1": "value1",
    "param2": "value2"
  }
}
```

عند التشفير، يُشفَّر JSON ويُرمَّز بـ Base64 مع بادئة.

## استعلام البحث

يحدد استعلام البحث ما إذا كان الكيان موجوداً بالفعل. يمكنه الوصول إلى:
- `{$map.paramName}`: المعاملات من رمز QR
- `{$user.property}`: خصائص المستخدم الحالي
- دوال SQL والربط (joins)

### أمثلة

```sql
-- البحث عن طريق كود العميل من رمز QR
SELECT id FROM Customer WHERE code = {$map.customerCode}

-- البحث عن حضور اليوم للمستخدم الحالي
SELECT id FROM EDAttendance 
WHERE code = CONCAT('MA', {$user.code}, FORMAT(GETDATE(), 'yyyyMM'))

-- البحث عن آخر فاتورة للعميل
SELECT TOP 1 id FROM SalesInvoice s 
INNER JOIN Customer c ON c.id = s.customer_id 
WHERE c.code = {$map.customer}
ORDER BY s.valueDate DESC
```

## إعداد مسار الكيان

### الوصول إلى معاملات QR

يمكن لمسارات الكيان الوصول إلى معاملات QR عبر المتغير `$map`:

```
fieldValue=$map.qrParam
otherField=$map.anotherParam"
```

### مثال على مسار: حاسبة قيم الحقول

```json
{
  "code": "QREntityCreation",
  "targetType": "SalesInvoice",
  "targetAction": "Manual",
  "requiresCommitOnManual": true,
  "details": [{
    "className": "com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator",
    "title1": "Set Fields",
    "parameter1": "customer=$map.customerCode\nvalueDate=$today\namount=$map.amount",
    "targetAction": "Manual"
  }]
}
```

## قوالب رسائل النجاح

يستخدم حقل `successTempo` نظام قوالب Tempo لإنشاء رسائل الاستجابة:

### قالب أساسي
```
Entity {code} created successfully for {customer.name1}
```

### مع المجموعات
```
{loop(lines, last)}
Added line for item {lines.item.name1} with quantity {lines.quantity}
{endloop}
Total lines: {lines.$size}
```

### عرض شرطي
```
{if=(status,"Stable")}
✓ Approved: {code}
{else}
⚠ Pending approval: {code}
{endif}
```

## التكامل مع تطبيق الجوال

### شاشة الماسح الضوئي

يوفر ماسح QR في تطبيق الجوال (Flutter):
- **عرض الكاميرا**: مسح QR في الوقت الفعلي
- **لوحة النتائج**: تعرض إدخالات النجاح (خضراء) والفشل (حمراء)
- **التغذية الراجعة الصوتية**: صوت خطأ عند الإخفاقات
- **المسح المستمر**: معالجة رموز QR متعددة دون تدخل يدوي

### إعداد القائمة

لتفعيل ماسح QR في تطبيق الجوال:
1. إنشاء أو تعديل `MobileAppMenuDefinition`
2. إضافة المُدمج إلى `targetItems.linkTarget`
3. تعيين القائمة للمستخدمين/الأدوار

## أمثلة عملية

### 1. نظام تسجيل حضور الطلاب

**السيناريو**: يوزع المعلمون رموز QR مطبوعة لتتبع الحضور.

**إعداد المُدمج**:
```json
{
  "code": "StudentAttendance",
  "createdEntityType": "EDAttendance",
  "creationType": "CreateAndUpdate",
  "entityFlow": "StudentAttendance",
  "finderQuery": "SELECT id FROM EDAttendance WHERE code = CONCAT('MA', {$user.code}, FORMAT(GETDATE(), 'yyyyMM'))",
  "successTempo": "{loop(attendances, last)}تم تسجيل حضور الطالب {attendances.student.name1}{endloop}\nإجمالي الحضور: {attendances.$size}"
}
```

**مسار الكيان**:
```json
{
  "code": "StudentAttendance",
  "targetType": "EDAttendance",
  "targetAction": "Manual",
  "requiresCommitOnManual": true,
  "details": [{
    "className": "com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator",
    "parameter1": "code=sql(SELECT CONCAT('MA', {$user.code}, FORMAT(GETDATE(), 'yyyyMM')))\nbook=\"MA\"\nterm=\"STATT\"\nrunCommand=\"copyDimensionsFromBookOrGroup\"\nref1=$user.employee\nattendances=[addLines(1)]\nattendances=addedLinesOnly(attendances.student=$map.studentCode)\nattendances=addedLinesOnly(attendances.attend=\"true\")",
    "targetAction": "Manual"
  }]
}
```

**إنشاء رمز QR في التقرير**:
```java
NamaRep.mobileQr()
    .code("StudentAttendance")
    .addParam("studentCode", $F{studentCode})
    .encrypted()
    .toString()
```


### 3. البحث عن آخر فاتورة للعميل

**السيناريو**: يمسح فريق المبيعات رمز QR ببطاقة العميل لعرض آخر فاتورة.

**إعداد المُدمج**:
```json
{
  "code": "CustomerLastInvoice",
  "createdEntityType": "SalesInvoice",
  "creationType": "UpdateOnly",
  "entityFlow": "ViewOnly",
  "finderQuery": "SELECT TOP 1 id FROM SalesInvoice WHERE customer_id = (SELECT id FROM Customer WHERE code = {$map.customer}) ORDER BY valueDate DESC",
  "successTempo": "Last invoice: {code}\nDate: {valueDate}\nAmount: {money.netValue}\nStatus: {documentFileStatus}"
}
```


## تفاصيل التنفيذ التقني

### المعالجة على جانب الخادم

1. **تحليل QR**: فك التشفير (إن لزم) وتحليل JSON
2. **البحث عن المُدمج**: إيجاد MobileQRIntegrator بالكود/المعرف
3. **تحديد الكيان**:
   - لـ CreateOnly: إنشاء كيان جديد
   - لـ UpdateOnly/CreateAndUpdate: تنفيذ استعلام البحث
4. **تنفيذ المسار**: تشغيل مسار الكيان مع المعاملات
5. **الحفظ التلقائي**: الحفظ إذا كانت `requiresCommitOnManual` تساوي true
6. **إنشاء الاستجابة**: عرض `successTempo` على الكيان
