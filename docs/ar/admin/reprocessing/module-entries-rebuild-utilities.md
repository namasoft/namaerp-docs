# إعادة بناء قيود النظام في الوحدات

عدد من الوحدات يحتفظ بسجل جارٍ بجانب مستنداته: مَن يملك كل وحدة عقارية، وهل الوحدة مؤجرة أم شاغرة، وفي أي حالة كل موظف، وكم رصيد أجازة كل موظف، وإلى أي حالة وصلت كل سيارة عميل، وكم تساوي كل أصل ثابت. هذا السجل يُكتب في صورة **قيود نظام** عند اعتماد المستند، والشاشات والتقارير تقرأ هذه القيود بدل أن تعود إلى كل مستند.

حين تبتعد القيود عن المستندات — بعد إصلاح بـ SQL، أو ترقية غيّرت طريقة حسابها، أو مستندات حُذفت من خارج البرنامج — تتخلص الأدوات في هذه الصفحة من القيود وتكتبها من جديد من المستندات المعتمدة بترتيب التاريخ. كل أداة محصورة في وحدتها وفي قيودها، ولا تلمس أي منها الأستاذ أو المخزون.

::: danger إعادة البناء تُفرغ الجدول أولاً
كل أداة هنا تبدأ بحذف القيود التي ستعيد بناءها. فإن توقفت في منتصفها بقي السجل ناقصاً حتى تُشغَّل مرة أخرى إلى النهاية. خذ نسخة احتياطية، وشغّلها خارج ساعات العمل، وتوقع على قاعدة بيانات كبيرة أن تستغرق ساعات.
:::

## قبل أن تشغّل أياً منها

تنطبق القواعد نفسها التي تنطبق على [أدوات الدفعات من ملف](/ar/admin/reprocessing/batch-utilities-from-file.md#qbl-n-tshGWl-yan-mnh): لا يفتح الروابط إلا المستخدم `admin` أو مستخدم معلَّم عليه **Allow Access to Admin Restricted Functionality (utils.html, kill tasks, logout users and so on)**، وكل مسار ملف هو مسار على خادم التطبيق، وكل رابط يُبنى بأداة التشغيل الموضحة في [روابط التشغيل في هذه الصفحات](/ar/admin/reprocessing/#rwbT-ltshGyl-fy-hdhh-lSfHt). وحين ينتهي التشغيل تعرض الصفحة *Done on* ثم التاريخ.

## العقارات

### إعادة تطبيق قيود النظام لعقود البيع (Reapply Real Estate Sales Contracts System Entries)

تحذف كل قيود ملكية الوحدات وتكتبها من جديد من كل **عقد بيع افتتاحي** و**عقد بيع** و**سند تنازل عن ملكية** معتمد، الأقدم أولاً. شغّلها حين تظهر وحدة بمالك خاطئ — مباعة وما زالت متاحة، أو باسم مشترٍ في عقد تُنوزل عنه لاحقاً. إعادة البناء كلها خطوة واحدة: إن فشل أي مستند لم يُحفظ شيء، وتبقى القيود محذوفة حتى يُعالج السبب وتُشغَّل الأداة مرة أخرى. إعادة تشغيلها آمنة.

<UtilityLinkBuilder
className="com.namasoft.modules.realstate.domain.utils.RESalesSysEntryMigratorUtility"/>

### إعادة تطبيق قيود النظام لعقود الإيجار (Reapply Rent Contracts System Entries)

تحذف كل قيود حالة الإيجار وتكتبها من جديد من كل **عقد إيجار** و**انهاء عقد ايجار** و**عقد ايجار افتتاحي** و**عرض سعر ايجار** معتمد، الأقدم أولاً. شغّلها حين تكون حالة إيجار وحدة خاطئة — تظهر مؤجرة بعد إنهاء عقدها، أو شاغرة وعقدها سارٍ. يمكن إيقافها كمهمة جارية؛ والتشغيل الموقوف يترك السجل ناقصاً، فشغّلها مرة أخرى إلى النهاية. إعادة تشغيلها آمنة.

<UtilityLinkBuilder
className="com.namasoft.modules.realstate.domain.utils.UpdateREReservationEntryUtil"/>

إصلاحات العقارات الأخرى — مدفوعات الأقساط والتحصيلات — استعلامات في [أدوات العقارات](/ar/admin/reprocessing/real-estate-utilities.md).

## الموارد البشرية

### إعادة إنشاء قيود حالة الموظف (Recreate Employee State System Entries)

تكتب سجل حالة الموظف من جديد من كل **عرض وظيفي** و**سند مباشرة عمل** و**بيان توظيف** و**تغير حالة موظف** و**تحديث بيانات الموظف** و**سند أجازة** و**سند إخلاء طرف** و**سند إنهاء الخدمة** معتمد. شغّلها حين تكون حالة موظف في تاريخ ما خاطئة — ما زال على رأس العمل بعد سند إنهاء خدمة، أو في أجازة بعد عودته. كل نوع مستند يُعالج كخطوة واحدة، وأول مستند يفشل يوقف التشغيل. إعادة تشغيلها آمنة.

<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.MigrateEmpStateEntry"
/>

### إعادة إنشاء قيود أرصدة الأجازات (Recreate Employee Vacation System Entries)

تعيد بناء رصيد أجازة كل موظف من مستنداته — **سند إدخال رصيد أجازة إفتتاحية** و**سند أجازة** و**سند مباشرة عمل** و**سند تعديل رصيد أجازة** و**سند صرف بدل أجازة** و**تحديث بيانات الموظف** و**سند إنهاء الخدمة** و**إيقاف عن العمل** و**مستند تصفية مستحقات** و**بدل أرصده راحات أسبوعية و عطلات رسمية**. شغّلها حين تختلف الأرصدة في شاشات وتقارير الأجازات عن المستندات. (صفحة [أنواع وأرصدة الأجازات](/ar/modules/hr/vacations/vacation-types-and-balances.md) تشرح من أين يأتي الرصيد.)

يُعالج الموظفون واحداً واحداً، كل موظف مستقلاً: الموظف الذي تفشل مستنداته يُتخطّى مع السبب ويستمر التشغيل. وحين ينتهي تعرض الصفحة كل موظف فشل. إعادة تشغيلها آمنة. اختر الصيغة المناسبة:

- **كل الموظفين:**

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  />

- **الموظفون على رأس العمل فقط** — تتخطى الموظفين الذين حالتهم مفصول أو مستقيل أو متقاعد:

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForWorkingEmps"
  />

- **كل الموظفين، مع إمكانية الاستئناف** — كل موظف تعامل معه التشغيل يُكتب في الملف، والتشغيل اللاحق بالملف نفسه يتخطاه. استخدمها في شركة كبيرة قد ينقطع فيها التشغيل:

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Processed Employees File', default: 'e:/rc/processed-employees.txt' }
  ]"
  />

  ::: warning الموظف الذي فشل موجود في الملف أيضاً
  الملف يسجل كل موظف وصل إليه التشغيل، ومنهم من ظهر فاشلاً في النهاية. بعد إصلاح مستنداتهم أعد بناءهم بصيغة **موظفين محددين** أدناه — فالتشغيل المستأنف سيتخطاهم.
  :::

- **كل الموظفين، مع الاستئناف، ابتداءً من تاريخ** — تُبقي كل ما قبل التاريخ وتعيد البناء منه فصاعداً فقط (يُكتب التاريخ بالصيغة `yyyyMMdd`، مثل `20260101`). استخدمها حين تكون الأرصدة صحيحة حتى تاريخ معروف:

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Processed Employees File', default: 'e:/rc/processed-employees.txt', id:'file' },
  { title: 'Start From Date', default: 'yyyyMMdd', id:'date' }
  ]"
  />

- **موظفون محددون** — أكواد الموظفين مفصولة بـ `-`:

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Employee Codes', default: 'E001-E002-E003', id:'codes' }
  ]"
  />

لا يعمل إلا تشغيل واحد لإعادة بناء الأجازات في كل مرة، أياً كانت الصيغة التي بدأ بها.

## مراكز الخدمة

### إعادة إنشاء قيود حالة الصنف الفرعي (Recreate Sub Item Status Entries)

تحذف كل قيود حركة حالة سيارات العملاء (الأصناف الفرعية) وتكتبها من جديد من كل مستند معتمد من الأنواع التي كانت تُنتج هذه القيود، الأقدم أولاً، 100 مستند في كل مرة. شغّلها حين تكون حالة سيارة أو سجل حالاتها خاطئاً — بعد تعديل [إعدادات حالة السيارة](/ar/modules/servicecenter/cars-setup/car-status-configurations.md) مثلاً. إعادة تشغيلها آمنة.

الملف إلزامي. قبل أن تحذف شيئاً، تكتب الأداة فيه قائمة أنواع المستندات التي لها قيود؛ والتشغيل الثاني يقرأ هذه القائمة، فإن توقف التشغيل الأول بعد حذف القيود ظل الثاني يعرف أي المستندات يعيد تطبيقها. احتفظ بالملف بين التشغيلات.

<UtilityLinkBuilder
className="com.namasoft.modules.srvcenter.domain.utils.SubItemStatusSysEntryRecalculateUtil"
:params="[
{ title: 'Types To Process File', default: 'e:/rc/toProcessTypes.txt', id:'file' }
]"
/>

## الأصول الثابتة

تعيد هذه الأدوات بناء سجل موقع وخصائص كل أصل — التكلفة، والإضافات والاستبعادات، ومجمع الإهلاك، والقيمة الحالية، وتاريخ آخر إهلاك — من كل **أفتتاح أصل ثابت** و**سند شراء أصل ثابت** و**سند تكليف اعتماد أصل** و**سند نقل الأصل** و**سند الإضافة و الإستبعاد** و**خصائص أصل ثابت** و**سند إهلاك** و**مستند منع اهلاك اصول** و**تخلص من الأصل** و**سند تخلص جزئي من أصل** معتمد، الأقدم أولاً. تبدأ بتصفير هذه القيم في بطاقات الأصول وحذف القيود، ثم تعيد تطبيق المستندات 100 في كل مرة. ولا يعمل منها إلا واحدة في كل مرة.

- **إعادة إنشاء كل قيود الأصول الثابتة.** تعيد بناء السجل وتترك قيم الإهلاك في المستندات كما هي. شغّلها حين تختلف قيم بطاقة أصل أو موقعه عن مستنداته. إعادة تشغيلها آمنة.

  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil"
  />

- **إعادة إنشاء كل القيود وإعادة حساب أقساط الإهلاك.** كالسابقة، وتعيد أيضاً حساب قيم الإهلاك في المستندات وتعيد توليد الأثر المحاسبي لكل سند إهلاك.

  ::: danger قيم الإهلاك ستتغير
  يُعاد حساب كل سند إهلاك بقواعد اليوم ويُنتج قيداً جديداً. اتفق على النتيجة مع محاسب العميل قبل تشغيلها على سنة مقفلة.
  :::

  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationUtil"
  />

- **إعادة الحساب، مع إزالة الأصول الموجودة في مستندات منع الإهلاك.** كالسابقة، وتزيل أيضاً من المستندات التي يُعاد تطبيقها كل أصل يستثنيه **مستند منع اهلاك اصول** من الإهلاك.

  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationAndRemovePreventedAssetsUtil"
  />

- **أصول محددة فقط.** تعيد إنشاء قيود الأصول المذكورة وتترك باقي الأصول كما هي. تُعطى الأصول بمعرّفاتها (ID) لا بأكوادها، مفصولة بـ `-`.

  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil"
  :params="[
  { title: 'Asset IDs', default: 'ffff01-ffff02', id: 'ids' }
  ]"
  />

إصلاحات SQL للوحدة نفسه في [أدوات الأصول الثابتة](/ar/admin/reprocessing/fixed-asset-utilities.md).

## المقاولات

### إعادة احتساب حصر التكاليف وتكاليف المستخلصات (Recalculate Cost Executions and Project Extract Costs)

تجمع قيود التكلفة لكل **حصر تكاليف مقاولات** من جديد، الأقدم أولاً، ثم تحدّث التكاليف في كل **مستخلص مشروع** للعقود نفسها. شغّلها حين يعرض حصر أو مستخلص تكاليف لم تعد تطابق المستندات التي وراءه. تتوقف عند أول حصر يفشل وتعرض السبب، دون أن تلمس المستخلصات. يمكن تشغيلها أكثر من مرة بأمان.

<UtilityLinkBuilder
className="com.namasoft.modules.contracting.domain.utils.util.RecalculateCostExecutionAndUpdateProjExtractCostsUtil"/>

## صفحات ذات صلة

- [أدوات تعمل على دفعة سجلات من ملف](/ar/admin/reprocessing/batch-utilities-from-file.md)
- [أدوات إصلاح الموافقات](/ar/admin/reprocessing/approval-repair-utilities.md)
