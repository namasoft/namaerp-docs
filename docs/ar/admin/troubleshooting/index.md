---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: استكشاف الأخطاء وإصلاحها
---

# استكشاف الأخطاء وإصلاحها

نادرًا ما تذكر تذكرة الدعم الشاشة التي تتحدث عنها. إنها تذكر عَرَضًا: النظام بطيء، الفاتورة ليست في
الحسابات، البريد لم يصل، رسالة حمراء عند الدخول، حقل اختفى. والإجابات موزّعة على الموقع كله، بجوار الشاشات
التي تخصّها. وهذه الصفحة هي المدخل إليها من جهة العَرَض: ابحث عن الشكوى في الجداول أدناه، فتدلّك على الصفحة
التي تشرحها.

## صفحات هذا القسم

<LandingGrid>
  <LandingCard icon="🐢" title="حين يصبح النظام بطيئًا" link="/ar/admin/troubleshooting/system-is-slow.md" details="ما الذي تفحصه حين يشكو المستخدمون من بطء كل شيء: التقارير الجارية، وأعمال الخلفية، والبحث، وقاعدة البيانات." />
  <LandingCard icon="⏳" title="توقف النظام أو عدم استجابته" link="/ar/admin/troubleshooting/troubleshooting-system-hanging.md" details="توقف النظام عن الاستجابة: التقط Thread Dumps قبل إعادة التشغيل، وأرسلها إلى نما." />
  <LandingCard icon="🚨" title="الأخطاء الحرجة عند الدخول" link="/ar/admin/troubleshooting/critical-errors.md" details="قائمة الفحوص الحمراء التي تظهر عند الدخول: كل فحص، وما الذي يثيره، وما العمل." />
  <LandingCard icon="🧾" title="إصلاح طلب أعمال فاشل" link="/ar/admin/troubleshooting/failed-business-requests.md" details="مستند محفوظ فشل أثره المحاسبي أو المخزني: معنى كل رسالة، وما الذي تصلحه، ومتى تعيد المعالجة ومتى تعيد الحفظ." />
  <LandingCard icon="❓" title="أسئلة عامة" link="/ar/admin/troubleshooting/general-faq.md" details="إجابات عن أسئلة الإدارة اليومية، من أخطاء العدسة الفارغة إلى تنسيق الرسائل النصية." />
</LandingGrid>

## ابحث عن الصفحة من العَرَض

### السرعة والإتاحة

| الشكوى | اقرأ |
|---|---|
| «النظام بطيء.» | [حين يصبح النظام بطيئًا](/ar/admin/troubleshooting/system-is-slow) |
| «النظام متوقف؛ لا يستطيع أحد العمل.» | [استكشاف أخطاء توقف النظام أو عدم استجابته](/ar/admin/troubleshooting/troubleshooting-system-hanging) |
| «تقرير يعمل منذ نصف ساعة.» | [متابعة التقارير](/ar/platform/background-processing/report-monitoring) |
| «مهمة مجدولة بطيئة تعطّل كل ما بعدها.» | [طوابير المهام](/ar/platform/background-processing/task-queues) |
| «تظهر رسائل حمراء بمجرد الدخول.» | [الأخطاء الحرجة عند الدخول](/ar/admin/troubleshooting/critical-errors) |

### الحفظ والرسائل

| الشكوى | اقرأ |
|---|---|
| «رفض النظام الحفظ وأظهر رسالة.» | [الرسائل وحالات الرفض](/ar/platform/documents-and-records/messages-and-refusals) |
| «لا أستطيع حذف هذا السجل أو تعديله.» | [لماذا يرفض النظام حفظ سجل أو حذفه](/ar/platform/documents-and-records/why-a-record-will-not-save-or-delete) |
| «يقول إن حقلًا مطلوب، ولم يكن كذلك من قبل.» | [الحقول المطلوبة](/ar/platform/governance/required-fields) |
| «الفترة مقفلة، وأحتاج إلى التسجيل فيها.» | [التحكم في إقفال الفترات المحاسبية](/ar/platform/governance/fiscal-period-control-guide) |
| «من عدّل هذا السجل، ومتى؟» | [سجل التعديل وتاريخ النسخ](/ar/platform/governance/audit-trail) |

### العمل الذي يجري في الخلفية

| الشكوى | اقرأ |
|---|---|
| «الفاتورة محفوظة لكنها ليست في الحسابات.» / «المخزون لم يتحرك.» | [طلبات الأعمال](/ar/platform/background-processing/business-requests) |
| «المستند يظهر عليه المعالجة فشلت.» / «خطأ أثناء إنشاء التأثير المحاسبي للجانب {0}» | [إصلاح طلب أعمال فاشل](/ar/admin/troubleshooting/failed-business-requests) |
| «البريد أو الرسالة النصية أو رسالة الواتساب لم تصل.» | [المهام المعلقة](/ar/platform/background-processing/pending-tasks) |
| «التقرير المجدول لم يُرسَل.» | [المهام المجدولة](/ar/platform/automation-and-rules/scheduled-tasks) |
| «كشف الرواتب لم يُعَد بناؤه.» | [إجراءات النظام](/ar/platform/background-processing/system-actions) |
| «مسار الكيان لا يفعل ما توقعته.» | [أسئلة شائعة عن مسارات الكيان](/ar/platform/entity-flows/entity-flow-faq) |
| «الموافقة عالقة أو ذهبت إلى الشخص الخطأ.» | [الموافقات](/ar/platform/approvals/) |
| «انتهى الاستيراد لكن السجلات ليست صحيحة.» | [استيراد السجلات](/ar/platform/import-export/importing-records) |

### الشاشات والترخيص والصلاحيات

| الشكوى | اقرأ |
|---|---|
| «شاشة أو حقل مفقود.» | [الترخيص، ولماذا تغيب شاشة أو حقل](/ar/getting-started/licensing) |
| «مستخدم لا يستطيع الدخول.» | [المستخدمون وتسجيل الدخول](/ar/platform/security/users-and-login) |
| «مستخدم يرى ما لا ينبغي، أو لا يرى ما ينبغي.» | [نظرة عامة على نظام الصلاحيات](/ar/platform/security/security-overview) |
| رسالة «لم يمكن تنفيذ العملية» عند فتح شاشة. | [أسئلة عامة](/ar/admin/troubleshooting/general-faq) |

### أرقام تبدو خاطئة

| الشكوى | اقرأ |
|---|---|
| «كميات الأصناف أو تكاليفها لا تتطابق.» | [استعلامات للكشف عن مشاكل التكلفة والكميات (وإصلاحها)](/ar/admin/reprocessing/cost-and-qty-problems)، ثم [إعادة معالجة الكميات والتكاليف وأعمار المخزون](/ar/admin/reprocessing/reprocess-qty-and-cost) |
| «الحسابات أو أعمار الديون لا تتفق مع المستندات.» | [إعادة معالجة دفتر الأستاذ وأعمار الديون](/ar/admin/reprocessing/reprocess-ledger-and-debt-ages) |

### الفوترة الإلكترونية ونقاط البيع والتطبيقات

| الشكوى | اقرأ |
|---|---|
| «رفضت هيئة الزكاة والضريبة والجمارك الفاتورة.» | [الربط مع هيئة الزكاة والضريبة والجمارك بالسعودية](/ar/modules/invoicing/zatca-guide) |
| «رفضت مصلحة الضرائب المصرية الفاتورة أو الإيصال.» | [الفاتورة الإلكترونية والإيصال الإلكتروني في مصر](/ar/modules/invoicing/egypt-einvoice-guide) |
| «فشل الإرسال إلى التزام.» | [حل مشكلات التزام](/ar/modules/integrations/eltezam/eltezam-troubleshooting) |
| «مشكلة في نقطة البيع.» | [أسئلة شائعة حول نقاط البيع](/ar/modules/pos/pos-faq) |
| «مشكلة في تطبيق الهاتف المحمول.» | [تطبيق نما للهواتف المحمولة — نظرة عامة](/ar/modules/mobile/mobile-application-guide) |
| «التنبيهات لا تصل إلى المستخدمين.» | [أسئلة شائعة عن التنبيهات والرسائل](/ar/platform/notifications/notification-fq) |
