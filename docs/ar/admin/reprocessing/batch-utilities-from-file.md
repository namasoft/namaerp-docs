# أدوات تعمل على دفعة سجلات من ملف

بعض الإصلاحات عبارة عن إجراء واحد يتكرر على مئات السجلات: أعد اعتماد هذه الـ800 فاتورة، احذف هذه الـ40 مسودة، أرسل هذه الـ300 سجل إلى الخادم الجديد مرة أخرى. تنفيذ ذلك يدوياً من شاشة القائمة بطيء ولا يترك أثراً لما تم. الأدوات في هذه الصفحة تنفذه من ملف نصي بسيط — سجل في كل سطر — وتحتفظ بملف ثانٍ فيه كل سطر نجح، فإذا توقف التشغيل في منتصفه أمكن بدؤه من جديد دون تكرار ما تم.

::: danger هذه الأدوات تغيّر البيانات بالجملة
كل أداة تعمل على كل سجل في الملف دون تأكيد لكل سجل. أداة **Delete From File** تحذف نهائياً، وتلغي مراجعة المستندات المراجَعة أولاً حتى لا يوقفها شيء. خذ نسخة احتياطية قبل أي تشغيل يغيّر البيانات، وجرّب الملف على سطرين أو ثلاثة أولاً.
:::

## قبل أن تشغّل أياً منها

**من يستطيع تشغيلها.** لا تعمل الروابط إلا لمستخدم مسجّل الدخول على ذلك الخادم، ويكون إما المستخدم `admin` أو مستخدماً معلَّماً عليه **Allow Access to Admin Restricted Functionality (utils.html, kill tasks, logout users and so on)** (يظهر بهذا النص الإنجليزي في الواجهة العربية أيضاً) — انظر [Treat As Admin](/ar/platform/security/users-and-login#Treat-As-Admin). أي مستخدم آخر لا يبدأ له الرابط شيئاً، والرابط المفتوح مع `&sync=true` يجيب بالرسالة *You are not admin* بالإنجليزية.

**كيف تبدأ أداة.** كل أداة أدناه رابط تشغيل: املأ الخانات، واضبط عنوان خادم العميل مرة واحدة، ثم انسخ الرابط وافتحه في تبويب متصفح مسجّل الدخول على ذلك الخادم. طريقة عمل روابط التشغيل مشروحة في [روابط التشغيل في هذه الصفحات](/ar/admin/reprocessing/#rwbT-ltshGyl-fy-hdhh-lSfHt).

**الملفات موجودة على الخادم.** المسارات (`e:/rc/recommit.txt` وأمثالها) تُقرأ على الجهاز الذي يعمل عليه خادم التطبيق، لا على جهازك. أنشئ المجلد هناك وضع فيه الملف الرئيسي قبل أن تبدأ.

**الملف الرئيسي.** سجل في كل سطر: نوع الكيان، ثم فاصلة (أو Tab)، ثم معرّف السجل (ID) — المعرّف الداخلي لا الكود. والطريقة المعتادة لإنتاجه استعلام، مثل:

```sql
select entityType, id from SalesInvoice where commitedBefore = 1 and valueDate >= '20260101'
```

الصق النتيجة في الملف كما تخرج من نافذة الاستعلام (الفصل بـ Tab مقبول). أداتا التصدير هما الاستثناء: تأخذان **كود** السجل في العمود الثاني لا معرّفه.

**ملف المُنجَز وملف الأخطاء.** كل سطر ينجح يُضاف إلى ملف المُنجَز (Done File)، وكل سطر موجود فيه يُتخطّى. وهذا ما يجعل إعادة تشغيل هذه الأدوات آمنة: شغّل الرابط نفسه مرة ثانية فيكمل من حيث توقف. السطر الذي يفشل لا يُضاف إلى ملف المُنجَز، ويُكتب خطؤه — الرسالة التي رفعها السجل أو التتبع الفني — في ملف الأخطاء (Errors File). ملف الأخطاء يُعاد كتابته من أوله في كل تشغيل، فاقرأه قبل أن تبدأ التشغيل التالي.

**تشغيل واحد في كل مرة.** أثناء عمل أداة، فتح رابطها مرة أخرى لا يبدأ تشغيلاً جديداً: ينتقل المتصفح إلى التشغيل الجاري في [مشغل الأدوات المساعدة](/ar/admin/reprocessing/utility-runner). ولا يُرفض إلا الرابط المفتوح مع `&sync=true`، برسالة بالإنجليزية تبدأ بـ *Please wait until running util of* وتنتهي باسم الأداة ثم *is finished*. ويظهر التقدم — *Finished 120 of 5000* — كمهمة جارية، والتشغيل الذي يُوقَف كمهمة يتوقف قبل السطر التالي.

## إعادة الاعتماد من ملف (Recommit From File)

تعيد اعتماد كل سجل في الملف — تماماً كإجراء **Recommit** على سجل واحد: يُحفظ السجل كما هو مرة أخرى، وتُنتج آثاره (الأستاذ، المخزون، القيود) من جديد مما يحمله الآن. استخدمها بعد إصلاح — إعداد صُحّح، أو مسار كيان صُحّح، أو إصلاح SQL على السطور — حين يجب أن تلتقط مجموعة معروفة من السجلات هذا التغيير. إعادة تشغيلها آمنة: سطور ملف المُنجَز تُتخطّى.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.RecommitFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/recommit.txt' },
{ title: 'Done File', default: 'e:/rc/done.txt' },
{ title: 'Errors File', default: 'e:/rc/errors.txt' }
]" :gui = "true"
/>

## إعادة الإرسال للفروع من ملف (Re-Replicate From File)

ترسل كل سجل في الملف إلى مواقع الـ Replication مرة أخرى، كأنه حُفظ للتو. استخدمها حين [يفوت موقعاً بعض السجلات](/ar/admin/reprocessing/replication.md) وتعرف أيها — السجلات نفسها لا تتغير على هذا الخادم. إعادة تشغيلها آمنة.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ReplicateFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/recommit.txt' },
{ title: 'Done File', default: 'e:/rc/done.txt' },
{ title: 'Errors File', default: 'e:/rc/errors.txt' }
]" :gui = "true"
/>

## الحذف من ملف (Delete From File)

تحذف كل سجل في الملف. المستند المراجَع تُلغى مراجعته أولاً، وتأكيدات الحذف تُجاب عنك، فلا يوقف السطر إلا رفض حقيقي — السجل مستخدم في مكان آخر، أو قاعدة تمنع حذفه — ويُكتب هذا الرفض في ملف الأخطاء. استخدمها لإزالة مجموعة معروفة من سجلات تجريبية أو مستوردة خطأً. **لا تراجع عنها**: خذ نسخة احتياطية أولاً. وإعادة تشغيلها تتخطى ببساطة ما حُذف.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.DeleteFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/delete.txt' },
{ title: 'Done File', default: 'e:/rc/done-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/delete-errors.txt' }
]" :gui = "true"
/>

## إعادة توليد الأثر المحاسبي من ملف (Regen Ledger From File)

تعيد بناء الأثر المحاسبي لكل مستند في الملف: يُنتج طلب أستاذ جديد من المستند كما هو الآن ويُعالَج كأي طلب آخر. استخدمها حين يكون لمجموعة معروفة من المستندات قيد ناقص أو خاطئ، وإعادة اعتمادها تفعل أكثر مما تريد. أما الأستاذ كله فله [إعادة معالجة الأستاذ وأعمار الديون](/ar/admin/reprocessing/reprocess-ledger-and-debt-ages.md). إعادة تشغيلها آمنة.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.RegenAccFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/regen-ledger.txt' },
{ title: 'Done File', default: 'e:/rc/regen-ledger-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/regen-ledger-errors.txt' }
]" :gui = "true"
/>

## إعادة توليد حركات المخزون من ملف (Regenerate Inventory Transactions From File)

تُنتج طلبات حركة المخزون لكل مستند في الملف من جديد وترسلها للمعالجة. وهي خطوة واحدة في إصلاح أطول — الإجراء كاملاً، بما فيه الاستعلام الذي يبني الملف وإعادة معالجة الكميات التي يجب أن تليها، في [أدوات المخزون](/ar/admin/reprocessing/inventory-utilities.md).

وهذه الأداة تختلف عن غيرها في هذه الصفحة:

- تعمل على الملف 500 سطر في كل مرة، ورفض من أي مستند **يوقف التشغيل كله** ويُلغي الدفعة الحالية من الـ500؛
- لا يمكن إيقافها في منتصفها كمهمة؛
- تتخطى السطور الموجودة في ملف المُنجَز، ولا تضيف سطور الدفعة إلى ملف المُنجَز إلا عند انتهاء تلك الدفعة من الـ500، فتشغيل الرابط مرة أخرى يكمل من الدفعة التي أُلغيت؛
- لا تكتب ملف أخطاء — الفشل الفني في سطر يُكتب في سجل الخادم، ويبقى السطر خارج ملف المُنجَز، ويستمر التشغيل.

<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.plugnplay.RegenInvTransReqFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/regen-inv-trans.txt' },
{ title: 'Done File', default: 'e:/rc/regen-inv-done.txt' },
{ title: 'Errors File', default: 'e:/rc/regen-inv-errors.txt' }
]"
/>

## التصدير إلى خادم آخر من ملف (Export To Another Server From File)

تنسخ كل سجل في الملف إلى خادم «نما» آخر. كل سطر فيه نوع الكيان و**كود** السجل. السجل الذي اعتُمد يوماً يُحفظ ويُعتمد على الخادم الآخر؛ والسجل الذي لم يُعتمد قط يُحفظ هناك مسودة. ويعامل الخادم الآخر السجل كأنه وصله عبر الـ Replication. استخدمها لنقل مجموعة من الملفات أو المستندات من تركيب إلى آخر. وإعادة تشغيلها ترسل السجلات التي ليست في ملف المُنجَز بعد.

املأ **Export To Server URL** بالعنوان الجذري للخادم الآخر — البروتوكول واسم الخادم والمنفذ فقط، بدون `erp` — مثل `http://192.168.1.20:8080/`.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ExportToServerFromFileByWS"
:params="[
{ title: 'Main File', default: 'e:/rc/export.txt' },
{ title: 'Done File', default: 'e:/rc/export-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/export-errors.txt' },
{ title: 'Export To Server URL', default: 'http://localhost:7070/' }
]" :gui = "true"
/>

## التصدير إلى خادم آخر من ملف عبر صفحات Excel

المهمة نفسها التي تؤديها الأداة السابقة، بطريق آخر: يتحول كل سجل إلى صفوف ورقة تصدير — الصيغة التي يستخدمها استيراد السجلات — ثم يُستورد على الخادم الآخر. صيغة الملف نفسها (نوع الكيان والكود)، وملفا المُنجَز والأخطاء نفسهما.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.ExportToServerFromFileByExcel"
:params="[
{ title: 'Main File', default: 'e:/rc/export.txt' },
{ title: 'Done File', default: 'e:/rc/export-delete.txt' },
{ title: 'Errors File', default: 'e:/rc/export-errors.txt' },
{ title: 'Export To Server URL', default: 'http://localhost:7070/' }
]" :gui = "true"
/>

## ما لم يُنجَز — مقارنة ملفين (Get Not Commited)

لا تغيّر شيئاً. تقرأ ملفين وتعرض في المتصفح كل سطر في الملف الأول ليس موجوداً في الثاني. وجّهها إلى ملف رئيسي وملف المُنجَز الخاص به فتحصل بالضبط على السطور التي لم تمر بعد — الصقها في ملف رئيسي جديد لتعيد محاولتها، أو لتمررها إلى أداة أخرى (لحذف السجلات التي رفضت إعادة الاعتماد مثلاً). شغّلها كلما شئت.

<UtilityLinkBuilder
className="com.namasoft.erp.gui.server.CompareTwoFiles"
:params="[
{ title: 'First File', default: 'e:/rc/recommit.txt' },
{ title: 'Second File', default: 'e:/rc/export-delete.txt' }
]" :gui = "true"
/>

## صفحات ذات صلة

- [إعادة بناء قيود النظام في الوحدات](/ar/admin/reprocessing/module-entries-rebuild-utilities.md) — أدوات كل وحدة التي تفرّغ مجموعة قيود وتعيد بناءها.
- [أدوات إصلاح الموافقات](/ar/admin/reprocessing/approval-repair-utilities.md)
- [طلبات الأعمال](/ar/platform/background-processing/business-requests) — حيث يُصلَح الأثر الفاشل لمستند واحد دون أي من أدوات هذه الصفحة.
