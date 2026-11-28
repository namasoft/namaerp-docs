---
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# شاشات الكيانات

هذه الصفحة غير معتادة: فلا شيء فيها يغيّر *سلوك* النظام، بل كل ما فيها يغيّر **شكل شاشات الكيانات الأخرى** — أي الصفحات الإضافية تظهر على العميل، وهل تظهر صورة الصنف في نتائج البحث، وأي السجلات تحصل على ترميز لوني.

وهذا يجعلها المكان المناسب للبدء حين يسأل أحدهم: «لماذا في شاشة المورد عندنا صفحة جهات اتصال وليست موجودة في النسخة التجريبية؟».

::: info النظير على مستوى الحقل
ما تضبطه هنا افتراضيٌّ لنوع سجل كامل. أما الشاشة التي تؤدي المهمة نفسها لكل **حقل** على حدة فهي [أعدادات الحقول و الشاشات](/ar/platform/fields-and-entities-settings/) من **الأساسي ← الإعدادات** — أقنعة العرض وأنماط الحقول، والأيقونات والألوان، وقواعد الإدخال، وكيف يبحث حقل المرجع، والحقول المحسوبة وغيرها. فالجأ إلى تلك الشاشة حين تكون الإجابة «على هذا الحقل وحده».
:::

![صفحة شاشات الكيانات](./images/gc-entity-screens-ar.png)

## إضافات الشاشات

**فلترة المجلدات حسب الأرشيف في المستندات الأرشيفية** `value.info.dmsDocFilterFoldersByLocation` — يقصر قائمة اختيار المجلد في المستند الأرشيفي على المجلدات التي يطابق أرشيفها الافتراضي الأرشيف المختار في المستند، فلا يضطر مستخدم في مكتب إلى تصفح بنية حفظ كل المكاتب الأخرى. انظر [الإعدادات والتكامل](/ar/platform/dms/dms-configuration).

**مهام العمل التفصيلية** `value.info.detailedWorkTasks` — يضيف صفحة **التفاصيل** إلى شاشة مهمة العمل وفيها جدول **المنفذين**: لكل منفذ الموظف، والساعات المخططة والفعلية، والتكلفة المخططة والفعلية، ونسبة الإنجاز.

**إضافة مهام العمل لشاشة الموظف** `value.info.addWorkTasksListToEmployee` — يضيف قائمة مهام عمل الموظف إلى شاشة الموظف، فيرى المدير عبء عمل أحدهم من سجله بدل تشغيل استعلام منفصل.

**استخدام مستند تحديث موظف** `value.useUpdateEmpInfoDoc` — تُغيَّر بيانات الموظف عبر مستند مخصص هو *تحديث بيانات الموظف* بدل تعديلها مباشرةً على شاشة الموظف. وبهذا تحصل على أثر موافقة وتاريخ مؤرَّخ لتغييرات الموارد البشرية: فيصير التغيير مستنداً يمكن مراجعته واعتماده ورفع تقرير عنه، لا تعديلاً صامتاً.

**Google Maps API Key** `value.info.googleMapsApiKey` — المفتاح الذي يستعمله منتقي الخرائط في حقول المواقع، ويستعمله تطبيق التوصيل. وبدونه يفتح منتقي الخرائط صفحة خطأ بدل الخريطة (وعرض موقع محفوظ يفتحه في Google Maps بدلاً من ذلك)، ولا يستطيع تطبيق التوصيل ترتيب طلبات السائق حسب المسار.

## صفحات إضافية على الكيانات الأخرى

كل جدول من هذه الجداول يسمّي أنواع الكيانات التي ينبغي أن تحصل على صفحة إضافية واحدة. أضف سطراً لكل نوع كيان، أو استعمل عمود قائمة أنواع الكيانات لتغطية عدة أنواع دفعة واحدة.

**إضافة الملحوظات إلى** `value.info.addRemarksPageTo` — يضيف صفحة ملاحظات. ويأتي مضبوطاً مسبقاً على الموظف والمورد والعميل والأصل الثابت والطرف الآخر.

**إضافة الملحوظات التفصيلية إلى** `value.info.addDetailedRemarksPageTo` — يضيف صفحة الملاحظات التفصيلية، التي تسجّل الملاحظات كمدخلات مؤرَّخة منظمة لا كنص حر.

**إضافة ملحوظات الاجتماع إلى** `value.info.addMeetingRemarksPageTo` — يضيف صفحة لمحاضر الاجتماعات.

**إضافة جهات الاتصال إلى** `value.info.addContactsPageTo` — يضيف صفحة جهات اتصال، للأشخاص المعنيين لدى ذلك العميل أو المورد.

**إضافة المستندات الأرشيفية إلى** `value.info.addDMSDocsTo` — يضيف صفحة **مستندات أرشيفية** إلى كل نوع كيان مُدرج، فتظهر الأوراق المحفوظة على السجل الذي تخصه. ويأتي مضبوطاً مسبقاً بالأنواع الخمسة نفسها التي في قائمة الملحوظات: الموظف والمورد والعميل والأصل الثابت والطرف الآخر. انظر [إدارة المستندات](/ar/platform/dms/).

**إضافة أرصدة الذمم إلى** `value.info.addSubsidiaryBalanceTo` — يضيف إلى الصفحة الرئيسية للسجل قائمة **الأرصدة** القابلة للطي بأرصدة حساباته، فتفتح العميل وترى ما عليه دون مغادرة الشاشة.

::: tip أضف الصفحات حيث ستُستعمل لا في كل مكان
كل صفحة تضيفها هنا تظهر لكل مستخدم يفتح ذلك الكيان. فصفحة جهات الاتصال على العميل تستحق مكانها، والصفحة نفسها على اثني عشر كياناً لا يملؤها أحد ليست إلا اثنتي عشرة صفحة فارغة إضافية يتصفحها المستخدم.
:::

## ألوان السجلات

**استعمال الألوان في** `value.info.useColorFor` — نطاق الترميز اللوني للسجلات: **كل المستندات** أو **كل الملفات** أو **كل الأنواع** أو **أنواع معينة**.

**استعمال الألوان في** `value.info.useColorsIn` *(جدول)* — أنواع الكيانات التي تحصل على الترميز اللوني إضافةً إلى النطاق أعلاه. ومع **أنواع معينة**، وهي أيضاً معنى ترك **استعمال الألوان في** الأول فارغاً، تكون هذه القائمة هي النطاق كله. والترميز اللوني أنفع ما يكون حين يكون نادراً — طبّقه على الشاشات القليلة التي تحتاج حالتها أن تقفز إلى العين، لا على كل شيء.

## صور الكيانات

**صور الملفات** `value.info.entityImages` *(جدول)* — يستطيع النظام عرض صورة السجل في مواضع كثيرة، ويتحكم هذا الجدول في كل موضع على حدة، ولكل نوع كيان.

ولكل كيان تضيفه تختار هل تظهر صورته — وبأي عرض وارتفاع — في:

- **استعمال بقائمة المقترحات** (`useInSuggestion`, `widthInSuggestion`, `heightInSuggestion`) — القائمة المنسدلة التي تظهر بينما يكتب المستخدم في حقل مرجع.
- **استعمال بالجداول** (`useInGridColumns`, `widthInGridColumns`, `heightInGridColumns`) — داخل جداول التفاصيل.
- **إظهار الصورة في عمود منفصل في الجداول** (`showInSeparateColumn`, `widthOfSeparateColumns`, `heightOfSeparateColumns`) — كعمود قائم بذاته لا بجوار النص.
- **استعمال بشاشة البحث** (`useInSearch`, `widthInSearcher`, `heightInSearcher`).
- **استعمال بعرض القائمة** (`useInList`, `widthInList`, `heightInList`).
- **استعمال بالحقول** (`useInHeaderFields`, `widthInHeaderFields`, `heightInHeaderFields`) — بجوار حقل مرجع على رأس المستند.
- **عرض في نافذة مع الاقتراب من الكود** (`showInPopupWithCode`).

ويحدد **نسبة عرض الصورة** (`mainFileWidthPercent`) كم تشغل الصورة الرئيسية من شاشة السجل نفسه، لكن في الواجهة القديمة فقط. أما الواجهة الجديدة فتتجاهله: تأخذ الصورة الرئيسية دائماً عموداً بنحو 30% من العرض بجوار حقول الرأس (وكامل العرض على الهاتف)، وتحافظ على نسب أبعادها، ولا يزيد ارتفاعها على 350 بكسل. ولا يوجد إعداد يمدّ الصورة لتملأ ذلك العمود.

والحالة الواضحة هي دليل المنتجات، حيث تجعل الصورة في قائمة الاقتراحات اختيار الصنف الصحيح أسرع بكثير من قراءة الأكواد. وهي تكلّف نطاقاً ترددياً في كل قائمة تعرضها، ففعّل المواضع التي تنفع فيها الصورة فعلاً واترك بقيتها.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| فلترة المجلدات حسب الأرشيف في المستندات الأرشيفية | Filter Folders By Location in DMS Documents | `value.info.dmsDocFilterFoldersByLocation` | [إضافات الشاشات](#Dft-lshsht) |
| مهام العمل التفصيلية | Detailed Work Tasks | `value.info.detailedWorkTasks` | [إضافات الشاشات](#Dft-lshsht) |
| إضافة مهام العمل لشاشة الموظف | Add Work Tasks List To Employee | `value.info.addWorkTasksListToEmployee` | [إضافات الشاشات](#Dft-lshsht) |
| استخدام مستند تحديث موظف | Use Update EmpInfoDoc | `value.useUpdateEmpInfoDoc` | [إضافات الشاشات](#Dft-lshsht) |
| Google Maps API Key | Google Maps API Key | `value.info.googleMapsApiKey` | [إضافات الشاشات](#Dft-lshsht) |
| إضافة الملحوظات إلى | Add Related Remarks To | `value.info.addRemarksPageTo` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| النوع | Entity Type | `value.info.addRemarksPageTo.entityType` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| قائمة الأنواع | Entity Type List | `value.info.addRemarksPageTo.entityTypeList` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| إضافة الملحوظات التفصيلية إلى | Add Detailed Remarks To | `value.info.addDetailedRemarksPageTo` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| النوع | Entity Type | `value.info.addDetailedRemarksPageTo.entityType` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| قائمة الأنواع | Entity Type List | `value.info.addDetailedRemarksPageTo.entityTypeList` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| إضافة ملحوظات الاجتماع إلى | Add Meeting Remarks Page To | `value.info.addMeetingRemarksPageTo` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| النوع | Entity Type | `value.info.addMeetingRemarksPageTo.entityType` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| قائمة الأنواع | Entity Type List | `value.info.addMeetingRemarksPageTo.entityTypeList` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| إضافة جهات الاتصال إلى | Add Contacts Page To | `value.info.addContactsPageTo` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| النوع | Entity Type | `value.info.addContactsPageTo.entityType` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| قائمة الأنواع | Entity Type List | `value.info.addContactsPageTo.entityTypeList` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| إضافة المستندات الأرشيفية إلى | Add Related Archive Docs To | `value.info.addDMSDocsTo` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| النوع | Entity Type | `value.info.addDMSDocsTo.entityType` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| قائمة الأنواع | Entity Type List | `value.info.addDMSDocsTo.entityTypeList` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| إضافة أرصدة الذمم إلى | Add Subsidiary Balance To | `value.info.addSubsidiaryBalanceTo` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| النوع | Entity Type | `value.info.addSubsidiaryBalanceTo.entityType` | [صفحات إضافية على الكيانات الأخرى](#SfHt-Dfy-aal-lkynt-lkhr) |
| استعمال الألوان في | Use Color For | `value.info.useColorFor` | [ألوان السجلات](#lwn-lsjlt) |
| استعمال الألوان في | Use Colors In | `value.info.useColorsIn` | [ألوان السجلات](#lwn-lsjlt) |
| النوع | Entity Type | `value.info.useColorsIn.entityType` | [ألوان السجلات](#lwn-lsjlt) |
| قائمة الأنواع | Entity Type List | `value.info.useColorsIn.entityTypeList` | [ألوان السجلات](#lwn-lsjlt) |
| صور الملفات | Entity Images | `value.info.entityImages` | [صور الكيانات](#Swr-lkynt) |
| النوع | Entity Type | `value.info.entityImages.entityType` | [صور الكيانات](#Swr-lkynt) |
| قائمة الأنواع | Entity Type List | `value.info.entityImages.targetEntities` | [صور الكيانات](#Swr-lkynt) |
| استعمال بقائمة المقترحات | Use In Suggestion | `value.info.entityImages.useInSuggestion` | [صور الكيانات](#Swr-lkynt) |
| العرض بالمقترحات | Width In Suggestion | `value.info.entityImages.widthInSuggestion` | [صور الكيانات](#Swr-lkynt) |
| الارتفاع بالمقترحات | Height In Suggestion | `value.info.entityImages.heightInSuggestion` | [صور الكيانات](#Swr-lkynt) |
| استعمال بالجداول | Use In Grid Columns | `value.info.entityImages.useInGridColumns` | [صور الكيانات](#Swr-lkynt) |
| العرض بالجداول | Width In Grid Columns | `value.info.entityImages.widthInGridColumns` | [صور الكيانات](#Swr-lkynt) |
| الارتفاع بالجداول | Height In Grid Columns | `value.info.entityImages.heightInGridColumns` | [صور الكيانات](#Swr-lkynt) |
| إظهار الصورة في عمود منفصل في الجداول | Show In Separate Column | `value.info.entityImages.showInSeparateColumn` | [صور الكيانات](#Swr-lkynt) |
| عرض العمود المنفصل | Width Of Separate Column | `value.info.entityImages.widthOfSeparateColumns` | [صور الكيانات](#Swr-lkynt) |
| ارتفاع العمود المنفصل | Height Of Separate Column | `value.info.entityImages.heightOfSeparateColumns` | [صور الكيانات](#Swr-lkynt) |
| استعمال بشاشة البحث | Use In Search View | `value.info.entityImages.useInSearch` | [صور الكيانات](#Swr-lkynt) |
| العرض بالبحث | Width In Searcher | `value.info.entityImages.widthInSearcher` | [صور الكيانات](#Swr-lkynt) |
| الارتفاع بالبحث | Height In Searcher | `value.info.entityImages.heightInSearcher` | [صور الكيانات](#Swr-lkynt) |
| استعمال بعرض القائمة | Use In List View | `value.info.entityImages.useInList` | [صور الكيانات](#Swr-lkynt) |
| العرض بالقائمة | Width In List | `value.info.entityImages.widthInList` | [صور الكيانات](#Swr-lkynt) |
| الارتفاع بالقائمة | Height In List | `value.info.entityImages.heightInList` | [صور الكيانات](#Swr-lkynt) |
| استعمال بالحقول | Use In Header Fields | `value.info.entityImages.useInHeaderFields` | [صور الكيانات](#Swr-lkynt) |
| العرض بالحقول | Width In Header Fields | `value.info.entityImages.widthInHeaderFields` | [صور الكيانات](#Swr-lkynt) |
| الارتفاع بالحقول | Height In Header Fields | `value.info.entityImages.heightInHeaderFields` | [صور الكيانات](#Swr-lkynt) |
| نسبة عرض الصورة | Image Width Percent | `value.info.entityImages.mainFileWidthPercent` | [صور الكيانات](#Swr-lkynt) |
| عرض في نافذة مع الاقتراب من الكود | Show In Popup With Code Hover | `value.info.entityImages.showInPopupWithCode` | [صور الكيانات](#Swr-lkynt) |
