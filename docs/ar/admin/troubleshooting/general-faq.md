<rtl>

# أسئلة عامة 

إجابات عن أسئلة دعم متكررة لا تخص شاشة واحدة: الخطأ الفارغ عند البحث بالعدسة، ومنح الصلاحيات على كل أنواع السجلات دفعة واحدة، وتثبيت SQL Server على أقراص SSD الحديثة، وإضافة لوحة النقاش إلى شاشة، وعدد من رسائل الخطأ وحلولها.

<ServerBaseURL/>

### للبحث عن مستندات عن طريق العدسة بعض الأحيان يظهر خطأ فارغ
يمكن حلها بتحديد رَقْم مناسب في`MaxRecordsPerPageForListViews` داخل الإعدادات العامة
<GlobalConfigOption option-code="value.info.maxRecordsPerPageForListViews" />

##  كيف يمكن تحديد الصلاحيات لكل أنواع السجلات في نظام نما بطريقة مرنة وسريعة دون الحاجة إلى إدراج سطر لكل نوع؟

✅ **الإجابة:**

في نظام نما، يمكنك تحديد الصلاحيات للسجلات باستخدام أحد الخيارات التالية داخل كل سطر صلاحية:

1. **نوع واحد محدد** (مثل: "عميل").
2. **قائمة أنواع** تحتوي على أكثر من نوع.
3. **كلا الخيارين معًا**.

حسب ما تحدده، يتم تطبيق الصلاحيات في ذلك السطر على:

* النوع فقط.
* أو قائمة الأنواع فقط.
* أو كلاهما معًا.

كما يمكنك ترك **كل من حقل النوع وقائمة الأنواع فارغين**، وفي هذه الحالة تُطبَّق الصلاحيات على **جميع الشاشات** في النظام.

🔽 **آلية تحديد السطر المناسب عند تنفيذ الصلاحيات:**

عند فتح شاشة (مثلاً: شاشة العميل)، يقوم النظام بالبحث عن السطر الأنسب بناءً على **الأولوية التالية**:

1. سطر يحتوي على **النوع المحدد** (مثلاً: "عميل").
2. إذا لم يوجد، يبحث في **قائمة الأنواع** عن سطر يحتوي على النوع "عميل".
3. إذا لم يوجد، يبحث عن **سطر عام** (لا يحتوي على نوع ولا قائمة أنواع).

بمجرد العثور على أول سطر مطابق حسب الترتيب أعلاه، يتوقف النظام عن البحث ويطبّق صلاحيات هذا السطر فقط.

::: tip ️ **ملاحظة عند وجود صلاحيات إضافية مؤقتة:**

* يتم اختيار **الصلاحية الأوسع نطاقًا** (التي تمنح صلاحيات أكثر).
* لكن **الأولوية في السطور** ما تزال تطبق:

    * إذا كانت صلاحية "الحفظ فقط" مخصصة لنوع "عميل"،
    * وصلاحية "الحفظ والتعديل" موجودة في سطر عام أو لقائمة أنواع،
    * فإن الأولوية تذهب لسطر "الحفظ فقط" لأنه أكثر تحديدًا حسب ترتيب الأولويات.
:::

<ltr>

## SQL Server Installation problem related to block size on new M2 SSDs (especially on new hetzner servers)
* Refer to [this article](https://learn.microsoft.com/en-us/troubleshoot/sql/database-engine/database-file-operations/troubleshoot-os-4kb-disk-sector-size?tabs=PowerShell)
* You will need to completely uninstall 
* Then run the following command in PowerShell 
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\stornvme\Parameters\Device" -Name   "ForcedPhysicalSectorSizeInBytes" -PropertyType MultiString        -Force -Value "* 4095"
```
::: warning
Remember, PowerShell not command prompt

The window should be blue, not black
:::
* Restart the server
* Then install SQL Server again

</ltr>

## كيف يمكن إضافة شاشة النقاش إلى شاشة بعينها
يمكن عمل المطلوب من خلال [أعدادات الحقول و الشاشات](/ar/platform/fields-and-entities-settings/fields-settings-record-behaviour)
<NamaOptionURL entityType="GenericReferenceOverrider" new-mode optionCode="addDiscussionTo.addToPage" link-title="addDiscussionTo"/>

1. يمكنك إضافة النقاش إلى أي شاشة في النظام من خلال جدول "إضافة النقاش إلي" الموجود بأعدادات الحقول و الشاشات
::: tip يمكنك التحكم في الحقول الظاهرة في النقاشات
يمكنك التحكم في الحقول الظاهرة في شاشة النقاش من خلال تعديل الشاشة - بلوك "تعديل حقول النقاش"
  - إزالة حقل النقاش
  - إزالة مرفق 1 - 2 - 3 - 4
  - إزالة مرجع 1 - 2
:::

::: warning النقاش يظهر بعد الحفظ وليس قبله
لا تظهر شاشة النقاشات إلا في السجلات المحفوظة - مع إنشاء جديد قبل الحفظ لا تظهر النقاشات
:::

## عند فتح شاشة الحركات بالصنف تظهر رسالة خطأ 
`Can not find Field getter method : userQty.measures.clippedHeight1`
::: details وهذا هو اللوج الكامل
```
com.namasoft.infra.domainbase.util.NaMaBusinessLogicExeption: Can not find Field getter method : userQty.measures.clippedHeight1 
	at com.namasoft.infra.domainbase.metadata.EntityReflection.getFieldValue(EntityReflection.java:292) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.metadata.EntityReflection.getDirectFieldValue(EntityReflection.java:174) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.objectListToTabularResults(Lister.java:308) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getQueryListFromDB(Lister.java:232) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getListFromDB(Lister.java:338) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:150) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:207) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.listFlat(Lister.java:830) ~[service-base-0.0.1-SNAPSHOT.jar:?]
```
:::

سبب المشكلة هو وجود حقل تم إزالته من النظام في عرض القائمة
الحل أن تقوم بعمل RegenUI من تعديل شاشة

## عند فتح شاشة تغيير الترجمة أو أي ملف آخر تظهر رسالة الخطأ `لم يمكن تنفيذ العملية`

::: details  تفاصيل الخطأ من السجل (Log)

```log
org.hibernate.query.sqm.PathElementException: Could not resolve attribute 'valueDate' of 'com.namasoft.modules.basic.domain.entities.TranslationOverRider'
	at org.hibernate.query.sqm.SqmPathSource.getSubPathSource(SqmPathSource.java:95) ~[hibernate-core-6.5.2.Final.jar:6.5.2.Final]
	...
	at com.namasoft.infra.domainbase.persistence.util.PersistenceUtility.getJoin(PersistenceUtility.java:138) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.util.PersistenceUtility.getPath(PersistenceUtility.java:109) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.SearchQueryUtils.convertColumnsToSelectionsAndAddJoins(SearchQueryUtils.java:117) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.GenericRepoImpl.countTabularResults(GenericRepoImpl.java:389) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.GenericRepoImpl.tabularListPage(GenericRepoImpl.java:304) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.DecoratedGenericRepo.tabularListPage(DecoratedGenericRepo.java:151) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.Persister.tabularListPage(Persister.java:456) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getPropertyListFromDB(Lister.java:523) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getListFromDB(Lister.java:336) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:150) ~[service-base-0.0.1-SNAPSHOT.jar:?]
```

:::

### التفسير

غالبًا ما يحدث هذا الخطأ عندما يتم تعديل شاشة من النوع "لكل الشاشات" أو "كل الملفات"، ويتم فيها إضافة العمود `valueDate` ضمن الأعمدة المعروضة في جدول القائمة.

لكن الحقل `valueDate` (التاريخ الفعلي) موجود فقط في السندات (مثل فواتير أو إيصالات)، وليس موجودًا في الملفات (مثل ملفات تغيير الترجمة).
لذلك، عند محاولة تحميل قائمة تحتوي على هذا العمود لملف لا يدعمه، تحدث المشكلة.

### الحل

قم بإزالة العمود `valueDate` من الأعمدة الظاهرة في هذا التعديل العام (لكل الشاشات أو كل الملفات) أو قم بتحديد نوع الشاشة بدقة بحيث لا يتم تطبيق هذا التعديل على ملفات لا تحتوي على هذا الحقل.

## فتح مصروف اعتماد أصل يفشل برسالة «لم يمكن تنفيذ العملية»

ترفض الشاشة الفتح برسالة «لم يمكن تنفيذ العملية»، ويظهر في سجل الخادم:

```log
Could not extract column [19] from JDBC ResultSet [The conversion from nvarchar to NCLOB is unsupported.]
```

أعمدة الملاحظات في جداول سطور الأصول الثابتة ما زالت في قاعدة البيانات هذه بالنوع النصي القديم محدود الطول، بينما يقرؤها التطبيق الآن كنص طويل. وتوسيعها يحل المشكلة:

::: details استعلام SQL لتوسيع أعمدة الملاحظات إلى NVARCHAR(MAX)
```sql
ALTER TABLE FACustodyScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOrderScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOfferScheduledPay ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAInitialReceiptScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAOpeningDocumentScheduleLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAInitialReceiptLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOfferLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOrderLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchOrderReqLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FALcExpenseLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FALCScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAReceiptDocLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAScheduleTemplateLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FATakingActualLine ALTER COLUMN remarks NVARCHAR(MAX);

ALTER TABLE CustodyCustodianLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyDeliveryLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyDeliveryEmpLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyTransferFromLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyTransferToLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodianLine ALTER COLUMN remark NVARCHAR(MAX);
```
:::

## تنبيهات عند الدخول للنظام

قائمة الرسائل الحمراء التي تظهر لبعض المستخدمين عند الدخول هي قائمة **الأخطاء الحرجة** — فحوص يجريها
الخادم على نفسه. وكل فحص منها، وما يسببه وما تفعله تجاهه — بما في ذلك خيار المعالجة في السنوات المالية
وحد الإشعارات ومجلد النسخ الاحتياطي — صار له صفحة خاصة:
[الأخطاء الحرجة عند الدخول](/ar/admin/troubleshooting/critical-errors).

## أريد أن أجعل حقلًا نصيًا يتحول إلى رابط بحيث أستطيع وضع رابط موقع مثلًا، ويتم إظهار زر بجوار الحقل النصي، وعند الضغط عليه يقوم بفتح الرابط

لتحقيق ذلك في نظام Nama ERP، يمكنك استخدام الجدول التالي:

### الجدول: `الحقول النصية المحوّلة إلى روابط`

رمز الجدول: `textToLinkFields`
يوجد داخل [أعدادات الحقول و الشاشات](/ar/platform/fields-and-entities-settings/fields-settings-field-appearance)، وهي أيضًا الشاشة التي يمكن فيها جعل الحقل النصي يتصل برقم هاتف أو يفتح بريدًا إلكترونيًا بدلًا من صفحة ويب.

- طريقة الإعداد:

* قم بإضافة سجل جديد في الجدول.
* حدد اسم الحقل الذي يحتوي على الرابط (مثل: `details.text1` أو `description2`).
* يمكنك تحديد:

  * **النوع (Type)**: مثل `SalesInvoice` أو `Customer`
  * أو **قائمة الأنواع (Entity Type List)**: لتطبيقه على أكثر من نوع
* أو ترك كلا الحقلين فارغين، وفي هذه الحالة سيتم تطبيق التحويل على هذا الحقل في جميع الشاشات التي يظهر بها.

- النتيجة:

* سيظهر زر بجوار الحقل النصي.
* عند الضغط عليه، سيتم فتح الرابط الموجود في الحقل في نافذة جديدة.

</rtl>