---
# صفحة هبوط مكتوبة يدويًا — يتخطاها GenNamaDocsIndex بسبب ملف .custom-index الموجود في هذا المجلد
title: أعدادات الحقول و الشاشات
---

# أعدادات الحقول و الشاشات

كل منشأة تريد من النظام أن يتصرف بطريقة تختلف قليلًا عن غيرها. واحدة تريد أن يبدأ كود العميل دائمًا
بالحروف `CU-`، وأخرى تريد أن يكون رقم الجوال في شاشة العميل قابلًا للضغط ليتصل به مندوب المبيعات
مباشرة، وثالثة تريد أن يعرض البحث عن الصنف في فاتورة المبيعات الأصناف القابلة للبيع فقط، ورابعة تريد
أن تظهر الفواتير المتأخرة بلون أحمر في قائمة العرض.

لا شيء من هذا يحتاج إلى مبرمج. كل ذلك يتم في شاشة واحدة — **أعدادات الحقول و الشاشات** — التي تصل
إليها من **الأساسيات ← الإعدادات**، حيث يكتب المسؤول سطرًا يصف السلوك المطلوب والحقل أو الشاشة التي
ينطبق عليها. تحتوي الشاشة على نحو أربعين جدولًا من هذه الإعدادات، ولهذا وُزّع الشرح على الصفحات
التالية بدلًا من حشره في صفحة واحدة.

إن كانت هذه أول مرة تفتح فيها الشاشة، فابدأ بصفحة «كيف تعمل»: فهي تشرح الأعمدة القليلة التي تتكرر في
كل الجداول تقريبًا، وتشرح — وهو الأهم — متى يصبح التعديل الذي حفظته مرئيًا فعلًا للمستخدمين.

<LandingGrid>
  <LandingCard icon="🧭" title="كيف تعمل" link="/ar/platform/fields-and-entities-settings/fields-settings-overview.md" details="أعمدة النطاق المشتركة بين كل الجداول، وكيف يُختار السطر المناسب، ومتى يسري التعديل، وخريطة بكل جداول الإعدادات." />
</LandingGrid>

## الحقول على الشاشة

كيف يبدو الحقل، وما الأداة التي يملأه بها المستخدم، وما الذي يقبله النظام عند الحفظ.

<LandingGrid>
  <LandingCard icon="🎨" title="مظهر الحقول وأدوات الإدخال" link="/ar/platform/fields-and-entities-settings/fields-settings-field-appearance.md" details="أقنعة عرض الأرقام، والألوان واتجاه الكتابة، ومحرر النصوص المنسّقة، وحقول الهاتف والبريد القابلة للضغط، ولوحات التوقيع، وأزرار الماسح الضوئي." />
  <LandingCard icon="✨" title="الأيقونات والألوان" link="/ar/platform/fields-and-entities-settings/fields-settings-field-icons.md" details="تبويب الأيقونات — أيقونات وألوان للوضع الفاتح والداكن لأنواع السجلات وقيم القوائم المنسدلة والحقول." />
  <LandingCard icon="🛑" title="قواعد الإدخال والحدود" link="/ar/platform/fields-and-entities-settings/fields-settings-input-validation.md" details="الصيغ والأنماط المطلوبة، وقوائم القيم المسموح بها، والحقول غير القابلة للتعديل، وحدود عدد السطور، وأقصى طول للحقول." />
</LandingGrid>

## البحث عن السجلات وتسميتها

كل ما يخص الحقول التي تشير إلى سجلات أخرى، وكيف يتم البحث عن تلك السجلات وفلترتها وعرض أسمائها.

<LandingGrid>
  <LandingCard icon="🔎" title="حقول المراجع والبحث فيها" link="/ar/platform/fields-and-entities-settings/fields-settings-reference-lookups.md" details="الأنواع التي يعرضها المرجع، والفلاتر الإضافية، وطريقة عرض اسم السجل، وأعمدة وأكواد بحث إضافية، وسرعة البحث، وماذا يحدث حين لا يوجد تطابق." />
  <LandingCard icon="🔢" title="الترقيم التلقائي للملفات" link="/ar/platform/fields-and-entities-settings/fields-settings-auto-coding.md" details="توليد كود واسم العملاء والأصناف والموردين من صيغة، مع أرقام متسلسلة وبادئات حسب الفرع." />
</LandingGrid>

## إظهار ما لا يحتويه السجل نفسه

<LandingGrid>
  <LandingCard icon="🧮" title="الحقول المحسوبة وتلوين الصفوف" link="/ar/platform/fields-and-entities-settings/fields-settings-calculated-fields.md" details="اربط استعلامًا بالشاشة لتظهر معلومة إضافية كحقل أو عمود عادي، ولوّن الصفوف كاملة حسب قاعدة تحددها." />
</LandingGrid>

## السجلات والشاشات والعالم الخارجي

<LandingGrid>
  <LandingCard icon="🧩" title="سلوك السجلات وكتل الشاشة" link="/ar/platform/fields-and-entities-settings/fields-settings-record-behaviour.md" details="ما الذي يُمسح عند أخذ نسخة مماثلة، والتدقيق التفصيلي للحقول، وكتل المناقشات والمستندات المرتبطة، وأنواع مستقبلي البريد." />
  <LandingCard icon="🔓" title="رفع القيود المدمجة" link="/ar/platform/fields-and-entities-settings/fields-settings-relaxing-restrictions.md" details="السماح باستخدام السجلات الممنوعة في حقول بعينها، وتخفيف فحص تطابق المحددات، وجعل نوع سجل عامًا لكل المحددات." />
  <LandingCard icon="🔌" title="التكامل مع الأنظمة الخارجية والروابط العامة" link="/ar/platform/fields-and-entities-settings/fields-settings-integrations.md" details="عناوين ويب مسماة تتيح لأنظمة خارجية إنشاء السجلات أو تحديثها أو استيرادها، وروابط عامة تسلّم العميل فاتورته." />
</LandingGrid>

## أدوات ذات صلة

<LandingGrid>
  <LandingCard icon="🎚️" title="تعديل الشاشات" link="/ar/platform/screen-modifier/" details="هذه الشاشة تغيّر كيف تتصرف الحقول، أما تعديل الشاشات فيغيّر أين تظهر — ترتيبها وإخفاؤها وإعادة تسميتها." />
  <LandingCard icon="🔐" title="الصلاحيات والأمان" link="/ar/platform/security/" details="جعل الحقل غير قابل للتعديل هنا تسهيل فقط؛ أما التحكم الفعلي فيمن يرى الحقل أو يعدّله فمكانه الصلاحيات." />
  <LandingCard icon="⚙️" title="الإعدادات العامة" link="/ar/platform/global-config/" details="الإعدادات الافتراضية على مستوى النظام التي تتجاوزها هذه الإعدادات على مستوى الحقل." />
</LandingGrid>
