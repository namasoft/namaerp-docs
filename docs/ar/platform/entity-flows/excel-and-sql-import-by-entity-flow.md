---
description: "استيراد البيانات من ملفات Excel وجمل SQL: تجهيز الملف، ودوال الاستيراد الخاصة، والاستيراد المتقدم من Excel، وسطور ربط الحقول التي تجعل مسار كيان أو إجراء واجهة مستخدم يقرأ ملفًا مرفقًا أو استعلامًا إلى سجلات."
entities: [EntityFlow]
---

# استيراد البيانات من Excel أو الاستعلامات

## استيراد البيانات من Excel إلى Nama ERP

يتيح Nama ERP استيراد البيانات مباشرةً من ملفات Excel. فيما يلي أبرز النقاط والتوصيات لضمان عملية استيراد سلسة:

### إرشادات عامة

* **دعم الصيغ (Formulas)**: يمكنك استخدام صيغ Excel القياسية في الخلايا عند إعداد بياناتك.
* **الممارسة الموصى بها**: من الأفضل أولاً تصدير بيانات نموذجية من Nama ERP واستخدام الملف المُصدَّر كقالب للتنسيق والبنية.

---

### دوال الاستيراد الخاصة

- `evalsql(sql statement)`

تنفذ هذه الدالة جملة SQL وتستخدم النتيجة كقيمة للخلية أثناء الاستيراد.

**أمثلة**:

```
evalsql(select top 1 id from SalesInvoice order by valueDate desc)
```

**مع صيغة Excel**:

```
="evalsql(select code from Account where subsidiaryType = '" & U13 & "')"
```

---

* أعمدة `findByCode` و`altCode`

إذا كانت مجموعة البيانات تحتوي على حقل ذي غرض خاص (مثل `contactInfo.mobile`) يعمل كمعرف فريد، يمكنك إضافة عمود باسم `findByCode` يحتوي على تلك القيمة. سيستخدمه النظام للعثور على السجل المقابل **فقط إذا لم يكن حقل `code` متاحًا**.

ينطبق نفس المنطق على عمود `altCode`.

---

### الاستيراد المتقدم من Excel

لمشاهدة شرح مرئي، شاهد الفيديو التعريفي التالي:
📺 [شرح الاستيراد من Excel](https://www.youtube.com/watch?v=FlKdarW1vJI)

---

* التعامل مع الأرقام في سكريبتات Groovy

عند استخدام تعبيرات Groovy أثناء الاستيراد:

* تُحلَّل الحقول الرقمية (`Long` و`Integer` و`Decimal`) تلقائيًا من قيم الخلايا.
* لتحليل خلية كرقم بشكل صريح، أضف البادئة `$` قبل اسم الخلية.

**أمثلة**:

```groovy
A + 5 * C
$A - 10 / $C
```
::: tip ملاحظة
مراجع الخلايا غير حساسة لحالة الأحرف. على سبيل المثال، `a+2` و`$a` صيغتان صحيحتان.
:::

---

* الإشارة إلى خلية ثابتة

المرجع مثل `A` أو `$C` يعني ذلك العمود من السطر الجاري استيراده. وإن أضفت رقم السطر حصلت على خلية واحدة بعينها — `B2` و`AA55` — أيًّا كان السطر المقروء حاليًا. وبهذا تلتقط قيمة ترد مرة واحدة قرب أعلى الورقة، كتاريخ كشف الحساب أو العملة أو اسم الفرع، فتختم بها كل سجل مستورد.

**أمثلة**:

```groovy
A + " / " + B2
$D1 * $H
```

ورقم السطر هو السطر المادي كما يرقّمه Excel، فلا يزحزحه `excel.ignoreLinesFromTop` ولا `excel.ignoreLinesFromBottom` — والقيمة القابعة في سطور العناوين التي تخطّيتها تبقى في المتناول.

وتعمل العناوين نفسها خارج Groovy: في خريطة الحقول بصيغة `excel.rows.B2`، وداخل جملة استعلام أو صيغة Tempo بصيغة `{B2}`. وهي الصورة العامة لـ `excel.row1.A` المذكور أدناه، الذي لا يبلغ إلا السطر الأول. ويستطيع سكربت Groovy كذلك أن يصل إلى الورقة نفسها عبر `sheet.getCell("A9")` أو الأقصر `sheet.A9`.


## الاستيراد عبر مسار كيان (Entity Flow) من ملفات Excel أو جملة SQL

كل سطر مما يلي هو سطر في خريطة حقول. اكتب هذه السطور في مدخل خريطة الحقول لعنصر مثل [`EAFieldsValuesCalculator`](/entity-flows/core/EAFieldsValuesCalculator) (لتعبئة السجل الحالي) أو [`EAGenerateEntityFromEntityAction`](/entity-flows/core/EAGenerateEntityFromEntityAction) (لإنشاء سجل جديد من الملف). الصفحات المرجعية باللغة الإنجليزية فقط.

- `excel.importFrom="attachment"`
- يحمّل ملف Excel المرفق. يمكنك استخدام أي حقل يُرجع اسمًا صالحًا لحقل مرفق. مثلاً، يمكنك وضع attachment1,attachment2,attachment3 في description 1 كقائمة منسدلة ثم استخدام `excel.importFrom=description1`

- `excel.activatedSheet="1"`
- يجعل الورقة رقم 1 هي الورقة الحالية. يمكنك أيضًا استخدام اسم الورقة.

- `excel.activatedSheet="invoices-sheet"`
- نفس السابق، لكن باستخدام اسم الورقة بدلاً من فهرسها.

- `excel.ignoreLinesFromTop="1"`
- في حال وجود صف عناوين في الورقة.

- `excel.ignoreLinesFromBottom="1"
`
- نفس ignoreLinesFromTop، لكن من الأسفل.

- `details=[excel.rows]
`
- يجعل details بنفس حجم صفوف الورقة الحالية، مع مراعاة إعدادات ignoreLinesFromTop وBottom.

- `details.item.item=excel.rows.A
`
- ينسخ محتوى الخلية A في كل صف إلى السطر المقابل في الجدول details.
- الأعمدة هي: A و B و C … Z، ثم AA و AB … AZ، ثم BA و BB … BZ، ثم CA … وهكذا حتى IZ.

- `details.text1=sql(select case when {excel.row1.A} = 'item' then 'ABC' when {excel.row1.B} = 'item' then 'BAC' else 'CAB' end)`
- `exel.row1` يمنحك الوصول إلى الصف الأول حتى لو كان مُتجاهَلاً، لتسهيل الاستعلام عن صفوف العناوين.


## الاستيراد من جملة SQL عبر مسار كيان (Entity Flow) أو إجراء واجهة مستخدم

- [شاهد هذا الفيديو للاطلاع على الخطوات التفصيلية](https://youtu.be/XAOituWQqsg)
- مثال 

```sql
sql.rows=sql(select top 10 id,code,n2,configuration_id from InvItem where section_id = {ref1.id})
details=[sql.rows]
details.item.itemCode=sql.rows.code
details.item.item=sql.rows.code
details.quantity.quantity.primeQty.value=sql.rows.n2
details.ref1=ref("ItemConfiguration",sql.rows.configuration_id)
```

- في هذا المثال نُنفّذ جملة SQL بـ `sql.rows=sql(statement here)`. يمكنك أيضًا استخدام جمل SQL متعددة الأسطر بتغييرها إلى:
```sql
sql.rows=mlsql(select
Column1, column2 from Table
)endmlsql
```

- يمكنك الوصول إلى أي عمود تُرجعه الاستعلام باستخدام sql.rows.columnAlias.
- يمكنك أيضًا استخدام فهرس العمود كالتالي: sql.rows.c1 ، sql.rows.c2، وهكذا.
***

- عند استيراد ملف العملاء والذي يحتوي على موقع جغرافي `contactInfo.address.region`، مطلوب ملء الحقول التالية بناءً على الموقع الجغرافي:

`contactInfo.address.country , contactInfo.address.city , contactInfo.address.state , contactInfo.address.area`

- وبالمثل في عنوان الشحن والدفع.

- يمكنك استعمال التالي في مسار كيان `EAFieldValuesCalculator` لنسخ المسميات باللغة العربية:

```ini
contactInfo.address.country=contactInfo.address.region.$countryAr
contactInfo.address.city=contactInfo.address.region.$cityAr
contactInfo.address.state=contactInfo.address.region.$stateAr
contactInfo.address.area=contactInfo.address.region.$areaAr
```

- لنسخ المسميات باللغة الإنجليزية:

```ini
contactInfo.address.country=contactInfo.address.region.$countryEn
contactInfo.address.city=contactInfo.address.region.$cityEn
contactInfo.address.state=contactInfo.address.region.$stateEn
contactInfo.address.area=contactInfo.address.region.$areaEn
```

- لنسخ المسميات حسب اللغة الحالية للمستخدم:

```ini
contactInfo.address.country=contactInfo.address.region.$country
contactInfo.address.city=contactInfo.address.region.$city
contactInfo.address.state=contactInfo.address.region.$state
contactInfo.address.area=contactInfo.address.region.$area

```

- بالطبع يمكنك تغيير `contactInfo` إلى أي حقل آخر.
