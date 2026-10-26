---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: إدارة النظام
---

# إدارة النظام

هذه هي مجموعة الأدوات التي تُبقي تنصيب نظام نما سليمًا. حين يحدث خلل ما — تتوقف شاشة، أو لا تتطابق الأرقام، أو تبدو التكاليف غير صحيحة — فهنا تجد الإجابات والاستعلامات التي تصلحها. كما تجد دليل لغة Tempo لصياغة الرسائل الديناميكية، ومجموعة واسعة من أدوات إعادة المعالجة لإعادة بيانات المخزون والحسابات والوحدات إلى نصابها عند انحرافها.

## استكشاف الأخطاء وإصلاحها

عندما يسيء النظام التصرّف، ابدأ من هنا. تشرح هذه الصفحات تشخيص حالات التوقف، وتجيب عن أكثر الأسئلة تكرارًا.

<LandingGrid>
  <LandingCard icon="🩺" title="استكشاف الأخطاء وإصلاحها" link="/ar/admin/troubleshooting/" details="تشخيص توقف النظام وعدم استجابته، مع أسئلة شائعة عامة وأخرى عن أخطاء قاعدة البيانات في مكان واحد." />
  <LandingCard icon="🚨" title="الأخطاء الحرجة عند الدخول" link="/ar/admin/troubleshooting/critical-errors.md" details="قائمة فحوص الصحة الحمراء التي تظهر عند الدخول: كل فحص وما يرفعه وما تفعله تجاهه." />
  <LandingCard icon="🐢" title="حين يصبح النظام بطيئًا" link="/ar/admin/troubleshooting/system-is-slow.md" details="ما الذي تفحصه حين يشكو المستخدمون من بطء كل شيء: التقارير الجارية، وأعمال الخلفية، والبحث، وقاعدة البيانات." />
  <LandingCard icon="⏳" title="توقف النظام أو عدم استجابته" link="/ar/admin/troubleshooting/troubleshooting-system-hanging.md" details="اكتشف سبب تجمّد النظام أو توقفه عن الاستجابة وكيفية استعادته." />
  <LandingCard icon="❓" title="أسئلة عامة" link="/ar/admin/troubleshooting/general-faq.md" details="إجابات عن الأسئلة اليومية التي يطرحها مديرو النظام أثناء تشغيل نظام نما." />
</LandingGrid>

## إعادة المعالجة والأدوات

عندما تخرج الأرقام المخزّنة عن التزامن، تعيد هذه الأدوات احتسابها وتوفّر استعلامات SQL جاهزة لاكتشاف المشكلات وإصلاحها عبر المخزون والحسابات والتصنيع والأصول الثابتة وغيرها.

<LandingGrid>
  <LandingCard icon="🔁" title="إعادة معالجة الحركات" link="/ar/admin/reprocessing/" details="المجموعة الكاملة من أدوات إعادة المعالجة والاستعلامات المساعدة لإصلاح البيانات عبر الوحدات." />
  <LandingCard icon="📦" title="الكميات والتكاليف وأعمار المخزون" link="/ar/admin/reprocessing/reprocess-qty-and-cost.md" details="أعد احتساب كميات المخزون والتكاليف وأعمار المخزون عند انحرافها." />
  <LandingCard icon="📒" title="إعادة معالجة دفتر الأستاذ وأعمار الديون" link="/ar/admin/reprocessing/reprocess-ledger-and-debt-ages.md" details="أدوات محاسبية لإعادة معالجة دفتر الأستاذ وأعمار الديون." />
  <LandingCard icon="🔍" title="استعلامات مشاكل التكلفة والكميات" link="/ar/admin/reprocessing/cost-and-qty-problems.md" details="استعلامات للكشف عن فروق التكلفة والكميات وإصلاحها." />
  <LandingCard icon="🏬" title="استعلامات المخزون المساعدة" link="/ar/admin/reprocessing/inventory-utilities.md" details="استعلامات مساعدة خاصة بالمخزون للفحص والتنظيف." />
  <LandingCard icon="🏭" title="أدوات التصنيع" link="/ar/admin/reprocessing/manufacturing-utilities.md" details="استعلامات مساعدة لوحدة التصنيع." />
  <LandingCard icon="🏗️" title="أدوات الأصول الثابتة" link="/ar/admin/reprocessing/fixed-asset-utilities.md" details="استعلامات مساعدة لوحدة الأصول الثابتة." />
  <LandingCard icon="🏠" title="أدوات العقارات" link="/ar/admin/reprocessing/real-estate-utilities.md" details="استعلامات مساعدة لوحدة العقارات." />
  <LandingCard icon="⚙️" title="عمليات قاعدة البيانات" link="/ar/admin/reprocessing/db-operations.md" details="عمليات خاصة بقاعدة البيانات للحفاظ على التنصيب." />
  <LandingCard icon="🚀" title="اقتراح Indexes لجداول التفاصيل" link="/ar/admin/reprocessing/suggest-index-creation.md" details="اقتراح Indexes لتسريع جداول التفاصيل الكبيرة." />
  <LandingCard icon="📉" title="أدوات حجم قاعدة البيانات والفهارس" link="/ar/admin/reprocessing/database-size-and-index-utilities.md" details="تقليل حجم قاعدة البيانات بإصلاح أعمدة المراجع العريضة وفهارس الأصل والفهارس المكررة." />
  <LandingCard icon="🧰" title="دليل الأدوات المساعدة" link="/ar/admin/reprocessing/utilities-catalog.md" details="صفحة السيرفر التي تعرض أكثر الأدوات استخداماً مع أوصافها وأزرار فتحها." />
  <LandingCard icon="🧰" title="استعلامات عامة متعددة الأغراض" link="/ar/admin/reprocessing/general-purpose-utility-queries.md" details="مجموعة من الاستعلامات المساعدة العامة متعددة الأغراض." />
  <LandingCard icon="🔗" title="أدوات النسخ المتطابق" link="/ar/admin/reprocessing/replication.md" details="أدوات للتعامل مع النسخ المتطابق لقاعدة البيانات." />
  <LandingCard icon="📄" title="أدوات تعمل على دفعة سجلات من ملف" link="/ar/admin/reprocessing/batch-utilities-from-file.md" details="إعادة اعتماد قائمة سجلات من ملف أو حذفها أو إعادة إرسالها أو تصديرها." />
  <LandingCard icon="🧱" title="إعادة بناء قيود النظام في الوحدات" link="/ar/admin/reprocessing/module-entries-rebuild-utilities.md" details="إعادة بناء سجلات العقارات والموارد البشرية ومراكز الخدمة والأصول الثابتة من المستندات." />
  <LandingCard icon="✅" title="أدوات إصلاح الموافقات" link="/ar/admin/reprocessing/approval-repair-utilities.md" details="تحديث ملخصات الموافقات وتفريغ الموافقات المعلقة العالقة." />
</LandingGrid>

## شاشات إدارة النظام

شاشات الإعدادات والأمان التي يلجأ إليها مدير النظام حين تختفي شاشة، أو يبطؤ شيء، أو يُقيَّد لشركة كاملة.

<LandingGrid>
  <LandingCard icon="🗂️" title="إعدادات النظام وقائمة الإعدادات وتعديل ملف" link="/ar/admin/system-settings-and-configuration-group.md" details="أين يوجد سجل إعدادات كل موديول، والقائمة الوحيدة التي تُخفي الشاشات والمميزات عن كل الشركات، ومحرّر ملفات التخطيط الخام." />
  <LandingCard icon="🔎" title="البحث عن الخيارات" link="/ar/admin/options-search.md" details="اكتب كلمة فتجد كل خيار توجيه وإعداد موديول وحقل إعداد يحملها، مع رابط مباشر إلى الحقل." />
  <LandingCard icon="⚡" title="إعدادات لتحسين الأداء" link="/ar/admin/performance-optimizer.md" details="سرّع شاشات العرض والبحث بإسقاط شروط محددات أو صلاحية مطالعة بعينها عن أنواع سجلات أو مستخدمين بعينهم." />
  <LandingCard icon="🔢" title="عداد المستخدمين وأنواع الصلاحيات" link="/ar/admin/users-counter-and-security-capabilities.md" details="حدّد عدد المستخدمين المتزامنين لكل مجموعة، وأنشئ صلاحيات مسمّاة تقفل بها السجلات والتقارير والأسعار." />
  <LandingCard icon="⌨️" title="تعريف الاختصارات ومفضلة المستخدم" link="/ar/admin/shortcuts-and-user-favourites.md" details="أي خريطة اختصارات يحصل عليها كل مستخدم، ومفاتيح عامة تفتح قائمة أو سجلًا جديدًا أو رابطًا، وكيف تُبنى مفضلة كل مستخدم في القائمة." />
  <LandingCard icon="🔑" title="ملفات OAuth" link="/ar/admin/oauth-files.md" details="فعّل حساب Google مرة واحدة ليرسل نما البريد عبر Gmail ويفحص النسخ الاحتياطية على Google Drive أو ينظّفها." />
  <LandingCard icon="🌙" title="الجدول الهجري" link="/ar/admin/hijri-table.md" details="أدخل أطوال الشهور الهجرية الرسمية التي يُحوَّل عبرها كل تاريخ هجري وكل عقد هجري وكل إرسال لالتزام." />
  <LandingCard icon="🧙" title="ملف المعالج (Wizard File)" link="/ar/admin/wizard-file.md" details="السجل الذي يحمل إجابات معالج الإعداد — افتح منه المعالج، واحفظ في منتصف الطريق، وطبّقه كله أو مجالات مختارة فقط." />
  <LandingCard icon="📝" title="ضوابط إنشاء طلبات التطوير" link="/ar/admin/dev-request-guidelines.md" details="ما يتحقق منه فريقا الدعم الفني والتجهيز وما يرفقانه قبل رفع طلب ميزة جديدة أو إصلاح خطأ إلى نما." />
</LandingGrid>

## أدوات الرسائل

<LandingGrid>
  <LandingCard icon="📨" title="دليل لغة Tempo" link="/ar/admin/tempo.md" details="أنشئ تنبيهات وبريدًا إلكترونيًا ورسائل SMS ورسائل تحقق ديناميكية تتضمّن قيم السجلات." />
</LandingGrid>
