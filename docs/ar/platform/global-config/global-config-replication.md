---
description: "صفحة الـ Replication في الإعدادات العامة للمنشآت التي تُبقي عدة مواقع لنما متسقة: المحددات التي تقرر أي السجلات تنتقل وإلى أين، وتوصيل الرسائل والتعامل مع فشله، وما يُستثنى من الـ Replication."
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# Replication

يبقي الـ Replication عدة مواقع للنظام متسقة — مركزاً رئيسياً وفروعه، أو خوادم في بلدان مختلفة. فالسجلات المنشأة في موقع تُحزَم كرسائل وتُسلَّم إلى الباقي. وتحدد هذه الصفحة أي السجلات تسافر وإلى أين، وماذا يحدث حين يفشل التسليم.

![صفحة الـ Replication](./images/gc-replication-ar.png)

::: tip قد لا ترى خيارات هذه الصفحة
الـ Replication مرخَّص على حدة، وخياراته تُخفى تماماً لا تُعرض معطلة حين تغيب الرخصة. والصورة أعلاه من تركيبة لا تملكها — فلا يظهر فيها إلا عنوانا المجموعتين والخيارات القليلة غير المرتبطة بالرخصة. أما في التركيبة المرخَّصة فتحمل الصفحة نفسها كل الحقول الموصوفة أدناه إضافةً إلى جدولين.
:::

## المحددات المستخدمة في الـ Replication

أول سؤال على الـ Replication أن يجيب عنه: *إلى أي موقع ينتمي هذا السجل؟* — والجواب يأتي من محددات السجل. وهذه المفاتيح الخمسة تحدد أي المحددات تشارك.

**استخدام الشركة في الـ Replication** `value.info.useLegalEntityInReplication` — تشارك الشركة في التوجيه.

**استخدام القطاع في الـ Replication** `value.info.useSectorInReplication`، **استخدام الفرع في الـ Replication** `value.info.useBranchInReplication` *(مفعل افتراضياً)*، **استخدام الإدارة في الـ Replication** `value.info.useDepartmentInReplication`، **استخدام المجموعة التحليلية في الـ Replication** `value.info.useAnalysisSetInReplication` — والمثل مع المحددات الأربعة الأخرى.

والفرع مفعّل افتراضياً لأن البنية المعتادة خادم لكل فرع. ولا تفعّل محدداً ثانياً إلا حيث يعتمد التوجيه عليه فعلاً — فكل محدد تضيفه يجعل قواعد التوجيه أصعب على التحليل حين لا يصل سجل إلى حيث كان متوقعاً.

## توصيل الرسائل

**أقصي عدد محاولات عند فشل الرسائل** `value.info.maxTrialsForMessages` *(الافتراضي 0، ومعناه بلا حد)* — كم مرة تُحاوَل تسلمة رسالة الـ Replication قبل التخلي عنها.

**طلب إعادة الارسال بعد فشل الرسائ** `value.info.requestReCommitAfterFailures` — بعد إخفاقات متكررة، يطلب من الموقع المصدر إعادة حفظ السجل بدل الاستمرار في إعادة إرسال الرسالة نفسها.

**وقت مسح الرسائل المرسلة التي تم معالجتها** `value.info.replicationCleanUpTime` — وقت اليوم الذي تُحذف فيه الرسائل المسلَّمة. اجعله ساعة هادئة: فالتنظيف يمسّ أسطراً كثيرة.

**Do Not Replicate Attachments** `value.info.donotReplicateAttachments` — يُخرج المرفقات من حِزم الـ Replication. وهو الخيار الصحيح كثيراً على وصلة بطيئة أو محدودة، حيث قد تعطّل بضع صفحات ممسوحة كل رسالة أخرى خلفها.

**منع استعمال سيرفرات الفروع حال عمل الرئيسي** `value.info.preventUsingBranchesWhenHeadOfficeIsOnline` — ترفض خوادم الفروع العمل محلياً ما دام المركز الرئيسي متاحاً، فيكتب الجميع في مكان واحد ولا يبقى ما يُسوَّى. ويصير خادم الفرع بديلاً احتياطياً عند انقطاع الوصلة لا نظيراً.

**اقل توقيت لمنع استعمال سيرفرات الفروع** `value.info.preventUsingBranchesWhenHeadOfficeIsOnlineTimeout` *(الافتراضي 60)* — كم ثانية بلا رد قبل أن يُعدّ المركز الرئيسي غير متاح فيتولى الفرع. فالمهلة القصيرة تقلب الفرع إلى الوضع المحلي مراراً على وصلة بطيئة، والطويلة تجعل الموظفين ينتظرون دقيقة قبل أن يعملوا أثناء انقطاع حقيقي.

**رسالة خطا التكويد الالي مع موقع التكرار - عربي** / **رسالة خطا التكويد الالي مع موقع التكرار - إنجليزي** `value.info.replicationBookArabicError`, `value.info.replicationBookEnglishError` — الرسالة المعروضة حين يحاول أحدهم إنشاء سجل على الموقع الخطأ بالنسبة لموقع الـ Replication الخاص بمكوّده. وكلتاهما تقبل بديلين: `{0}` هو الخادم الذي كان ينبغي إنشاء السجل عليه، و`{1}` هو موقع الـ Replication الذي ينتمي إليه المكوّد. والقيم الافتراضية تذكر الاثنين أصلاً، وهذا ما يجعل الخطأ مفهوماً بذاته لمستخدم الفرع.

## ما يُستثنى من الـ Replication

**Do Not Replicate** `value.info.doNotReplicate` *(جدول)* — أنواع الكيانات التي لا تدخل الـ Replication أبداً. كل سطر يذكر نوع كيان أو قائمة أنواع. استعمله مع كل ما هو محلي بحق — كإعدادات أجهزة الموقع نفسه مثلاً.

**Do Not Replicate Entities In Sites** `value.info.noReplicationInSites` *(جدول)* — أكثر انتقائية: فكل سطر يذكر نوع كيان *وموقع Replication*، فيمكن مشاركة نوع سجل مع معظم المواقع وحجبه عن واحد. وبهذا تُبقي بيانات الرواتب مثلاً بعيدة عن موقع لا شأن له برؤيتها.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| مستخدم في التكرار | Use In Replication | `value.info.useLegalEntityInReplication` | [المحددات المستخدمة في الـ Replication](#lmHddt-lmstkhdm-fy-l-Replication) |
| مستخدم في التكرار | Use In Replication | `value.info.useSectorInReplication` | [المحددات المستخدمة في الـ Replication](#lmHddt-lmstkhdm-fy-l-Replication) |
| مستخدم في التكرار | Use In Replication | `value.info.useBranchInReplication` | [المحددات المستخدمة في الـ Replication](#lmHddt-lmstkhdm-fy-l-Replication) |
| مستخدم في التكرار | Use In Replication | `value.info.useDepartmentInReplication` | [المحددات المستخدمة في الـ Replication](#lmHddt-lmstkhdm-fy-l-Replication) |
| مستخدم في التكرار | Use In Replication | `value.info.useAnalysisSetInReplication` | [المحددات المستخدمة في الـ Replication](#lmHddt-lmstkhdm-fy-l-Replication) |
| أقصي عدد محاولات عند فشل الرسائل | Max Trials When Replication Failures Occur | `value.info.maxTrialsForMessages` | [توصيل الرسائل](#twSyl-lrsyl) |
| طلب إعادة الارسال بعد فشل الرسائ | Request ReCommit After Messages Fail | `value.info.requestReCommitAfterFailures` | [توصيل الرسائل](#twSyl-lrsyl) |
| وقت مسح الرسائل المرسلة التي تم معالجتها | Replication Clean Up Time | `value.info.replicationCleanUpTime` | [توصيل الرسائل](#twSyl-lrsyl) |
| Do Not Replicate Attachments | Do Not Replicate Attachments | `value.info.donotReplicateAttachments` | [توصيل الرسائل](#twSyl-lrsyl) |
| منع استعمال سيرفرات الفروع حال عمل الرئيسي | Prevent Using Branches When Headoffice Is Online | `value.info.preventUsingBranchesWhenHeadOfficeIsOnline` | [توصيل الرسائل](#twSyl-lrsyl) |
| اقل توقيت لمنع استعمال سيرفرات الفروع | Prevent Using Branches Timeout | `value.info.preventUsingBranchesWhenHeadOfficeIsOnlineTimeout` | [توصيل الرسائل](#twSyl-lrsyl) |
| رسالة خطا التكويد الالي مع موقع التكرار - عربي | Replication Autocoding Arabic Error | `value.info.replicationBookArabicError` | [توصيل الرسائل](#twSyl-lrsyl) |
| رسالة خطا التكويد الالي مع موقع التكرار - إنجليزي | Replication Autocoding English Error | `value.info.replicationBookEnglishError` | [توصيل الرسائل](#twSyl-lrsyl) |
| Do Not Replicate | Do Not Replicate | `value.info.doNotReplicate` | [ما يُستثنى من الـ Replication](#m-yustthn-mn-l-Replication) |
| النوع | Entity Type | `value.info.doNotReplicate.entityType` | [ما يُستثنى من الـ Replication](#m-yustthn-mn-l-Replication) |
| قائمة الأنواع | Entity Type List | `value.info.doNotReplicate.entityTypeList` | [ما يُستثنى من الـ Replication](#m-yustthn-mn-l-Replication) |
| Do Not Replicate Entities In Sites | Do Not Replicate Entities In Sites | `value.info.noReplicationInSites` | [ما يُستثنى من الـ Replication](#m-yustthn-mn-l-Replication) |
| النوع | Entity Type | `value.info.noReplicationInSites.entityType` | [ما يُستثنى من الـ Replication](#m-yustthn-mn-l-Replication) |
| قائمة الأنواع | Entity Type List | `value.info.noReplicationInSites.entityTypeList` | [ما يُستثنى من الـ Replication](#m-yustthn-mn-l-Replication) |
| موقع التكرار | Replication Site | `value.info.noReplicationInSites.replicationSite` | [ما يُستثنى من الـ Replication](#m-yustthn-mn-l-Replication) |
