---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: إعادة المعالجة والأدوات
---

# إعادة المعالجة والأدوات

في هذا المجلد أدوات الإنقاذ: السكربتات والأدوات التي تعيد بناء الكميات والتكاليف وأرصدة الأستاذ وأعمار الديون لقاعدة بيانات صارت أرقامها خاطئة بالفعل. وهي ليست صيانة، ولا روتيناً، ولا واحدة منها أول رد على مشكلة.

::: danger اقرأ هذا قبل أن تشغّل شيئاً هنا
**المستند الواحد الذي يبدو غريباً ليس سبباً لإعادة بناء قاعدة بيانات أبداً.** فالمستند الواحد الذي لا أثر محاسبي أو مخزني له يُصلَح من شاشة [طلبات الأعمال](/ar/platform/background-processing/business-requests) — تجد طلبه، وتقرأ سبب فشله، وتعالج السبب، ثم تعيد معالجة ذلك الطلب وحده.

أما أدوات هذه الصفحات فتفرّغ جداول كاملة وتعيد بناءها. وعلى قاعدة كبيرة تستغرق إعادة البناء الكاملة **أياماً**، والنظام معطّل طوال ذلك، ولا رجعة فيها. فقبل أن تبدأ أياً منها: خذ نسخة احتياطية، واتفق على وقت التوقف مع العميل، وأوقف خادم التطبيق حيث تقول الصفحة ذلك.
:::

## من أين تبدأ، حسب العَرَض

| ما تراه | اذهب إلى |
|---|---|
| مستند واحد بلا قيد في الأستاذ أو بلا أثر مخزني | [طلبات الأعمال](/ar/platform/background-processing/business-requests) — لا هذا المجلد |
| أرصدة الأصناف أو تكاليفها خاطئة في مستندات كثيرة | [إعادة معالجة الكميات والتكاليف وأعمار المخزون](/ar/admin/reprocessing/reprocess-qty-and-cost.md) |
| أرصدة الحسابات أو أعمار ديون العملاء/الموردين خاطئة | [إعادة معالجة الأستاذ وأعمار الديون](/ar/admin/reprocessing/reprocess-ledger-and-debt-ages.md) |
| تشك أن ثمة خطأ ولا تستطيع تسميته بعد | [استعلامات الكشف عن مشاكل التكلفة والكميات](/ar/admin/reprocessing/cost-and-qty-problems.md) |
| المشكلة داخل وحدة بعينها | أدوات تلك الوحدة — المخزون أو التصنيع أو الأصول الثابتة أو العقارات، أدناه |
| قائمة معروفة من السجلات يجب إعادة اعتمادها أو حذفها أو إعادة إرسالها أو تصديرها | [أدوات تعمل على دفعة سجلات من ملف](/ar/admin/reprocessing/batch-utilities-from-file.md) |
| الملكية أو حالة الإيجار أو حالة الموظف أو أرصدة الأجازات أو حالة السيارة أو قيم الأصول تختلف عن المستندات | [إعادة بناء قيود النظام في الوحدات](/ar/admin/reprocessing/module-entries-rebuild-utilities.md) |
| الموافقات المعلقة تعرض سجلات منتهية أو محذوفة، أو ملخصاً قديماً | [أدوات إصلاح الموافقات](/ar/admin/reprocessing/approval-repair-utilities.md) |
| موقع خرج عن التوافق مع المركز الرئيسي | [أدوات النسخ المتطابق](/ar/admin/reprocessing/replication.md) |
| كل شيء صحيح لكن البطء شديد | [اقتراح Indexes لجداول التفاصيل الكبيرة](/ar/admin/reprocessing/suggest-index-creation.md) |

## ترتيب العمل

1. **اقرأ قبل أن تكتب.** ابدأ بالاستعلامات التشخيصية، فهي تُخبر ولا تغيّر شيئاً، وتكشف لك اتساع المشكلة حقاً.
2. **أصلح أضيق ما يفسّرها.** طلب أعمال فاشل، أو مستند واحد، أو محدد واحد.
3. **أعِد بناء منطقة واحدة** — الكميات والتكلفة، أو الأستاذ، أو جداول وحدة بعينها — ولا تفعل إلا بعد أن تعرف أن الخلل فيها.
4. **وإعادة البناء الكاملة آخر شيء**، ومعها نسخة احتياطية ووقت متفق عليه وخادم موقَف.

فإذا لم تفسّر الخطوة الأولى العَرَض، فتلك لحظة التصعيد لا لحظة توسيع دائرة الضرر.

## روابط التشغيل في هذه الصفحات

كثير من الأدوات في هذه الصفحات تُشغَّل من رابط لا من قائمة. ويظهر كل منها كنموذج صغير: خانة لكل مُدخل من مُدخلات الأداة، والرابط الجاهز تحتها، وزرّان بجانبه — **نسخ**، الذي ينسخ الرابط كما هو، و**إظهار عنوان الخادم** (أيقونة العين)، الذي يفتح خانة تكتب فيها عنوان خادم العميل. ويُعاد بناء الرابط أثناء الكتابة، ويحفظ المتصفح العنوان الذي أدخلته لكل روابط التشغيل في الموقع، فتضبطه مرة لكل خادم لا مرة لكل صفحة.

### بناء رابط التشغيل يدوياً

في مصدر الصفحة (ملف markdown) يظهر كل رابط تشغيل كوسم `<UtilityLinkBuilder>` فيه `className`، وأحياناً قائمة `:params`، وفي بعضها `:gui="true"`. والرابط الذي يعرضه يُبنى دائماً بالطريقة نفسها، فتستطيع كتابته بنفسك من المصدر:

```text
<server address>/utils?util=<className>-<value 1>,<value 2>,<id>=<value>&gui=true
```

- **عنوان الخادم** — عنوان نظام العميل حتى `/erp` ضمناً، مثل `http://localhost:8080/erp` على الخادم نفسه.
- **`className`** — يُنسخ كما هو في الوسم تماماً.
- **القيم** — علامة `-`، ثم قيم قائمة `:params` مفصولة بفواصل `,`: أولاً كل مُدخل ليس له `id` بقيمته وحدها وبترتيب القائمة، ثم كل مُدخل له `id` بالشكل `id=value`. استعمل القيمة `default` ما لم تحتج حالة العميل غيرها. والقيمة الفارغة تُحذف، وإن لم تبقَ قيم حُذفت علامة `-` أيضاً. وكل ما بعد أول `-` يصل إلى الأداة كما هو، فيجوز أن تحتوي القيمة على `-` (أكواد موظفين مثل `E001-E002-E003`) ولا يجوز أن تحتوي على فاصلة.
- **`&gui=true`** — تُضاف فقط إذا كان الوسم يحمل `:gui="true"`.

افتح الرابط في متصفح سجّلت فيه الدخول إلى ذلك الخادم بمستخدم مدير، ويظهر رد الأداة صفحةً.

مثال: رابط **إعادة الاعتماد من ملف (Recommit From File)** في صفحة [أدوات تعمل على دفعة سجلات من ملف](/ar/admin/reprocessing/batch-utilities-from-file.md) مكتوب هكذا:

```text
className="com.namasoft.erp.gui.server.RecommitFromFile"
:params="[
{ title: 'Main File', default: 'e:/rc/recommit.txt' },
{ title: 'Done File', default: 'e:/rc/done.txt' },
{ title: 'Errors File', default: 'e:/rc/errors.txt' }
]" :gui = "true"
```

ورابطه بالقيم الافتراضية:

```text
http://localhost:8080/erp/utils?util=com.namasoft.erp.gui.server.RecommitFromFile-e:/rc/recommit.txt,e:/rc/done.txt,e:/rc/errors.txt&gui=true
```

والمُدخل الذي له `id` مثل `{ title: 'Types To Process File', default: 'e:/rc/toProcessTypes.txt', id:'file' }` يصير `-file=e:/rc/toProcessTypes.txt`، ورابط التشغيل الذي ليس له `:params` هو `<server address>/utils?util=<className>` فقط.

## اكتشف المشكلة أولاً

<LandingGrid>
  <LandingCard icon="🔍" title="مشاكل التكلفة والكميات" link="/ar/admin/reprocessing/cost-and-qty-problems.md" details="استعلامات تقارن التكلفة بالأستاذ مستنداً مستنداً وتُظهر أين اختلفا." />
  <LandingCard icon="🧰" title="استعلامات عامة متعددة الأغراض" link="/ar/admin/reprocessing/general-purpose-utility-queries.md" details="استعلامات تحقيق يومية تصلح لأي وحدة." />
  <LandingCard icon="⚡" title="اقتراح Indexes لجداول التفاصيل الكبيرة" link="/ar/admin/reprocessing/suggest-index-creation.md" details="اعرف جداول التفاصيل التي يبطئ حجمها التركيبة، وما الذي يُفهرس." />
</LandingGrid>

## إعادة بناء الأرصدة

<LandingGrid>
  <LandingCard icon="📦" title="إعادة معالجة الكميات والتكاليف وأعمار المخزون" link="/ar/admin/reprocessing/reprocess-qty-and-cost.md" details="إعادة البناء الكاملة لكميات المخزون وتكاليفه وأعماره — وتحتاج نسخة احتياطية ووقت توقف وخادماً موقَفاً." />
  <LandingCard icon="📒" title="إعادة معالجة الأستاذ وأعمار الديون" link="/ar/admin/reprocessing/reprocess-ledger-and-debt-ages.md" details="أعِد بناء أرصدة الحسابات وأعمار ديون العملاء والموردين حين لا يوافق الأستاذ المستندات." />
</LandingGrid>

## أدوات الوحدات

<LandingGrid>
  <LandingCard icon="🏬" title="أدوات المخزون" link="/ar/admin/reprocessing/inventory-utilities.md" details="استعلامات وإصلاحات موجّهة لمستندات المخزون والأرقام المسلسلة وبيانات المخازن." />
  <LandingCard icon="🏭" title="أدوات التصنيع" link="/ar/admin/reprocessing/manufacturing-utilities.md" details="إصلاحات مستندات التجميع وأوامر الإنتاج وآثارها على التكلفة." />
  <LandingCard icon="🏗️" title="أدوات الأصول الثابتة" link="/ar/admin/reprocessing/fixed-asset-utilities.md" details="الإهلاك وبطاقات الأصول والقيود التي وراءها." />
  <LandingCard icon="🏢" title="أدوات العقارات" link="/ar/admin/reprocessing/real-estate-utilities.md" details="الوحدات والعقود وبيانات الأقساط التي خرجت عن الاتساق." />
</LandingGrid>

## أدوات تُشغَّل من رابط

<LandingGrid>
  <LandingCard icon="📄" title="أدوات تعمل على دفعة سجلات من ملف" link="/ar/admin/reprocessing/batch-utilities-from-file.md" details="إعادة اعتماد قائمة سجلات من ملف أو حذفها أو إعادة إرسالها أو إعادة توليدها أو تصديرها، مع الاستئناف سطراً بسطر." />
  <LandingCard icon="🧱" title="إعادة بناء قيود النظام في الوحدات" link="/ar/admin/reprocessing/module-entries-rebuild-utilities.md" details="تفريغ سجلات العقارات والموارد البشرية ومراكز الخدمة والأصول الثابتة وإعادة بنائها من المستندات المعتمدة." />
  <LandingCard icon="✅" title="أدوات إصلاح الموافقات" link="/ar/admin/reprocessing/approval-repair-utilities.md" details="تحديث ملخصات الموافقات وتفريغ الموافقات المعلقة التي لم يبق فيها شيء للاعتماد." />
</LandingGrid>

## قاعدة البيانات والمواقع

<LandingGrid>
  <LandingCard icon="🗄️" title="عمليات قاعدة البيانات" link="/ar/admin/reprocessing/db-operations.md" details="عمليات على قاعدة البيانات نفسها على مستوى الخادم — وهي أشد صفحات هذا المجلد تدميراً." />
  <LandingCard icon="🔁" title="أدوات النسخ المتطابق" link="/ar/admin/reprocessing/replication.md" details="تشخيص موقع تخلّف عن المركز الرئيسي وإصلاحه." />
</LandingGrid>
