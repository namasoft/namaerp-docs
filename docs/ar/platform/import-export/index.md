---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: استيراد السجلات وتصديرها
---

# استيراد السجلات وتصديرها

كل تطبيق جديد يبدأ من النقطة نفسها تقريبًا: لدى العميل سنوات من البيانات في ملفات Excel، ولا بد أن تنتقل إلى النظام. وفي كل شهر بعد ذلك تحتاج إلى العكس — إخراج بضع مئات من السجلات إلى Excel لمراجعتها وتصحيحها دفعة واحدة ثم إعادتها.

يتعامل نما مع الاتجاهين بالملف نفسه. فحين تُصدِّر سجلات لا تحصل على تقرير أنيق، بل على ملف يعرف النظام كيف يقرأه مرة أخرى. صدِّر مئة فاتورة مبيعات، وصحِّح مندوب المبيعات في أربعين منها، وارفع الملف نفسه، فتُحدَّث تلك الأربعون. هذه الرحلة ذهابًا وإيابًا هي جوهر هذا الباب كله، وهي سبب الشكل الغريب للملف المُصدَّر — بسطوره التي تبدأ بـ `//` وعلاماته من نوع `:-record:`.

ابدأ بالتصدير، فالملف المُصدَّر هو أفضل قالب ستحصل عليه للاستيراد.

## الاستعمال اليومي

<LandingGrid>
  <LandingCard icon="📤" title="تصدير السجلات" link="/ar/platform/import-export/exporting-records.md" details="أوامر التصدير الأربعة، وكل خيار في نافذة التصدير، وأين ينتهي الملف الناتج." />
  <LandingCard icon="📥" title="استيراد السجلات" link="/ar/platform/import-export/importing-records.md" details="ارفع ملفًا لإضافة السجلات أو تحديثها، وكيف تُطابَق المراجع، وكيف تقرأ الأخطاء العائدة إليك." />
  <LandingCard icon="🧩" title="تشريح ملف التصدير" link="/ar/platform/import-export/export-file-format.md" details="معنى كل سطر علامة ولاحقة وورقة تفاصيل في الملف — المرجع الذي تحتاجه قبل كتابة ملف استيراد بيدك." />
</LandingGrid>

## القوائم المحفوظة والأوراق المخصصة

<LandingGrid>
  <LandingCard icon="🗂️" title="قائمة تصدير / استيراد ملفات" link="/ar/platform/import-export/files-export-import-menu.md" details="احفظ عملية تصدير أو استيراد كتعريف قابل لإعادة الاستعمال، وصمِّم ورقة Excel خاصة بك بأعمدة ومعادلات وإجماليات." />
  <LandingCard icon="🛠️" title="الاستيراد المتقدم للسجلات" link="/ar/platform/import-export/advanced-record-import.md" details="اربط ملف مورّد أو نظام قديم — ملفًا لا تملك تغيير شكله — بسجلات نما عمودًا بعمود." />
</LandingGrid>

::: tip تبحث عن شيء آخر؟
سحب البيانات تلقائيًا وفق جدول زمني، أو مباشرة من استعلام SQL، هو عمل [مسار الكيان](/ar/platform/entity-flows/excel-and-sql-import-by-entity-flow.md) لا الاستيراد اليدوي الموصوف هنا. وإن كنت تحاول حفظ **تقرير** كملف Excel فتلك آلية مختلفة تمامًا — راجع [التقارير في الإعدادات العامة](/ar/platform/global-config/global-config-reports.md).
:::
