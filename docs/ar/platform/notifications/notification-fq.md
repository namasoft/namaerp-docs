---
description: "إجابات عن أسئلة شائعة في تعريف التنبيهات: إرسال تنبيه لكل عميل في سند قبض متعدد السطور، وإرسال كل تفاصيل الفاتورة في تنبيه نصي، وعرض اسم من وافق على المستند، وتنبيه مشرفي المبيعات بعروض الأسعار التي لم تُحوَّل إلى أوامر بيع."
entities: [NotificationDefinition]
menu: إدارة النظام ← تخصيص شكل النظام ← تعريف تنبيهات
---

<rtl>

# أسئلة شائعة عن التنبيهات والرسائل

## كيف أرسل تنبيه لكل عميل عند تسجيل سند قبض يحتوي على عدة سطور لعدة عملاء؟

عند تسجيل سند قبض يحتوي على عدة سطور لعدة عملاء، قد تلاحظ أن التنبيه يُرسل فقط لأول عميل ولا يُرسل لباقي العملاء الموجودين في السطور الأخرى.

### السبب

السبب هو أن القالب المستخدم لا يحتوي على جملة `loop` التي تسمح بتكرار الرسالة لكل سطر على حدة. وبالتالي، يتم توليد رسالة واحدة فقط باستخدام أول سطر، ويتم تجاهل باقي السطور.

### القالب غير الصحيح (لا يعمل بشكل متكرر)

```
الشركة المتحدة فارم صيدلية د/ {lines.subsidiary.$toReal.name1} نحيط علمكم بأنة
تم اضافة استلام نقدية لحسابكم رقم الايصال {lines.rpaper} قيمة الأيصال {lines.amount.value.amount} جنية  بتاريخ {valueDate}
```

هذا القالب يرسل رسالة واحدة فقط باستخدام بيانات أول سطر فقط.

---

### القالب الصحيح لإرسال رسالة لكل عميل على حدة

```
{loop(lines)}
{openmsg}
{sendto}{lines.subsidiary.$toReal.contactInfo.mobile}{endsendto}
الشركة المتحدة فارم صيدلية د/ {lines.subsidiary.$toReal.name1} نحيط علمكم بأنة
تم اضافة استلام نقدية لحسابكم رقم الايصال {lines.rpaper} قيمة الأيصال {lines.amount.value.amount} جنية  بتاريخ {valueDate}
{closemsg}
{endloop}
```

### شرح القالب سطرًا بسطر:

1. `{loop(lines)}`
   يبدأ تكرار على كل سطر في المستند.

2. `{openmsg}`
   يحدد بداية رسالة جديدة.

3. `{sendto}{lines.subsidiary.$toReal.contactInfo.mobile}{endsendto}`
   يحدد رقم الموبايل الذي ستُرسل إليه الرسالة — في هذه الحالة هو رقم العميل الموجود في السطر الحالي.

4. و5. محتوى الرسالة نفسه، مع استخدام بيانات السطر الحالي مثل اسم العميل، رقم الإيصال، المبلغ، وتاريخ السند.

5. `{closemsg}`
   ينهي الرسالة.

6. `{endloop}`
   ينهي التكرار.

بهذا الشكل، سيتم إرسال رسالة منفصلة لكل عميل موجود في كل سطر من سطور سند القبض، وبذلك يتم إعلام كل عميل بالمعلومة الخاصة به فقط.

## إرسال جميع تفاصيل الفاتورة في التنبيه النصي

عند إنشاء تنبيه مرتبط بفاتورة، قد تلاحظ أن القالب المستخدم يعرض فقط بيانات أول سطر من الفاتورة، على الرغم من وجود عدة أصناف داخلها.

في المثال التالي، تم إعداد قالب رسالة نصية داخل تنبيه:

::: details القالب المستخدم سابقًا

```
الشركة المتحدة فارم نحيط علمكم صيدلية د / {Customer.name1} بأن
تم اضافة فاتورة رقم {code} لحسابكم
_____  

قيمة الفاتورة {money.netValue} جنية
___محتويات الفاتورة ___
صنف    {details.item.item}
كمية {details.quantity.quantity.primeQty.value}
خصم     {details.price.discount2.percentage}
```
:::

--------
القالب السابق يعرض فقط **سطر واحد** من تفاصيل الفاتورة، لأن المتغيرات المستخدمة (`{details.item.item}`، `{details.quantity...}`) لا يتم تكرارها تلقائيًا عبر السطور.

### الحل: استخدام `{loop(details)}`

للحصول على كل السطور، يجب استخدام تعليمة `{loop(details)}` ليتكرر المحتوى حسب عدد سطور الفاتورة، مع إغلاق التكرار بـ `{endloop}`.

::: details القالب المعدل الصحيح

```
الشركة المتحدة فارم نحيط علمكم صيدلية د / {Customer.name1} بأن  
تم اضافة فاتورة رقم {code} لحسابكم  
_____  
قيمة الفاتورة {money.netValue} جنية
___محتويات الفاتورة ___
{loop(details)}
صنف    {details.item.item}  
كمية {details.quantity.quantity.primeQty.value}  
خصم     {details.price.discount2.percentage}  
{endloop}
```
:::

بهذا الشكل، سيتم إرسال كل تفاصيل سطور الفاتورة ضمن الرسالة النصية، وليس فقط السطر الأول.

## كيف يمكنني عرض اسم الشخص الذي وافق على المستند داخل قالب التنبيه في نما؟

**جواب:**
لعرض اسم الشخص الذي وافق على المستند في قالب التنبيه، يمكنك استخدام المتغير `currentApprovalCase.lastStep.actualResponsible`.

إذا كنت تريد عرض الاسم كرابط إلى ملف المستخدم، استخدم الصيغة التالية:

```
تمت الموافقة على السجل {link($this)} من قبل {link(currentApprovalCase.lastStep.actualResponsible)}
```

أما إذا كنت تريد عرض الاسم كنص فقط بدون رابط، فاستخدم:

```
تمت الموافقة على السجل {code} من قبل {currentApprovalCase.lastStep.actualResponsible.name1}
```

* يمكنك إضافة شرط للتأكد من وجود خطوة موافقة قبل عرض الاسم، كالتالي:

```
{if(currentApprovalCase.lastStep)}
تمت الموافقة على السجل {code} من قبل {currentApprovalCase.lastStep.actualResponsible.name1}
{else}
لم يتم الموافقة بعد على السجل {code}
{endif}
```

## كيف أرسل تنبيه لمشرفي المبيعات عند وجود عروض أسعار لم تُحوَّل إلى أوامر بيع خلال مدة معينة؟

يريد العميل إرسال تنبيه لكل مشرفي المبيعات عند وجود عرض أسعار لبائع تحت إدارة المشرف ولم يتم تحويله إلى أمر بيع بعد مدة تزيد عن 9 أو 10 أيام، وذلك من خلال مهمة مجدولة.

::: warning ملاحظة
العميل يريد إرسال **تنبيهات** داخل النظام وليس بريد إلكتروني أو تقرير.
:::

- الاستعلام

الاستعلام التالي يقوم بجلب عروض الأسعار التي مرّ عليها 10 أيام ولم تُحوَّل إلى أوامر بيع:

```sql
select s.code, c.name1 customername, s.valuedate,
       cast(s.netValue as decimal(20,2)) netValue,
       e.code supervisorCode, e.id supervisorId,
       e.entityType supervisorEntityType
from SalesQuotation s
left join SalesOrder o on o.fromDoc_id = s.id
left join Customer c on c.id = s.customer_id
left join DocumentTerm t on t.id = s.term_id
left join Employee e on e.id = s.salesMan_id
left join Employee esu on esu.id = e.supervisor_id
where datediff(day, s.valuedate, getdate()) + 1 = 10
  and s.commitedBefore = 1
  and o.code is null
ORDER BY esu.code
```

- قالب التنبيه

```
{loop()}
{header(supervisorCode)}
{openmsg}{sendto}{supervisorId}{endsendto}
السادة إدارة المبيعات
برجاء العلم أن عروض الاسعار الاتية لم يتم تحويلها الى عقود منذ 10 ايام
برجاء التواصل مع العميل لمعرفة الاسباب
وكتابة الملاحظات في عرض السعر
{opentable}
{row}{cell} كود عرض السعر {cell}  العميل {cell}  التاريخ   {cell}  بقيمة  {endrow}
{endheader}
{row}{cell}{code}{cell}{customername}{cell}{valuedate}{cell}{netValue}
{endrow}
{footer(supervisorCode)}
{closetable}
{closemsg}
{endfooter}
{endloop}
```

- ** شرح القالب **

يستخدم هذا القالب تقنية التجميع (`header`/`footer`) لتجميع عروض الأسعار حسب المشرف (`supervisorCode`)، بحيث يتلقى كل مشرف تنبيهًا واحدًا يحتوي على جدول بجميع عروض الأسعار المتأخرة للبائعين تحت إدارته.

- `{loop()}` — يبدأ التكرار على نتائج الاستعلام.
- `{header(supervisorCode)}` — يبدأ تجميع السطور حسب كود المشرف، ويُكتب محتوى الـ header مرة واحدة لكل مجموعة.
- `{sendto}{supervisorId}{endsendto}` — يُرسل التنبيه إلى المشرف المعني.
- `{opentable}` / `{closetable}` — ينشئ جدولًا يحتوي على تفاصيل عروض الأسعار.
- `{footer(supervisorCode)}` — يُغلق المجموعة ويُنهي الرسالة.

::: warning ملاحظة مهمة
يجب أن يحتوي الاستعلام على `ORDER BY esu.code` لضمان أن سجلات كل مشرف تأتي متتالية في النتائج. بدون الترتيب، قد تتداخل سجلات المشرفين ولن يعمل التجميع بـ `header`/`footer` بشكل صحيح.
:::

</rtl>
