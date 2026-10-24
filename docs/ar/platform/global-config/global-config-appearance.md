---
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# المظهر

كيف يبدو النظام وكيف يتنقل فيه المستخدمون: ماذا يُفتح عند بدء التشغيل، وماذا تعرض شاشة الدخول، وأي الخطوط والألوان تُستعمل، وكيف تتصرف النوافذ المنبثقة والمساعدات السريعة.

![صفحة المظهر](./images/gc-appearance-ar.png)

## بدء التشغيل والتنقل

**البدء دائما بال GUI الجديد** `value.info.startAlwaysByNewGui` *(مفعل افتراضياً)* — تفتح جلسات الويب الواجهة الحديثة بدل القديمة.

**استخدام الGUI الجديد دائماً (يمنع الوصول إلى الGUI القديم)** `value.info.alwaysUseNewGUI` — الخيار السابق لا يقرر إلا أين *تبدأ* الجلسة، ومن يعرف عنوان الواجهة القديمة يستطيع فتحها. وبتفعيل هذا يُغلق ذلك الباب: فكل محاولة لفتح شاشة قديمة يُعاد توجيهها إلى الواجهة الحديثة. وهذا هو الإعداد المناسب بعد أن تُتمّ التركيبة انتقالها — فما دامت الواجهتان متاحتين، سيظل قليل من المستخدمين يعملون على القديمة ويبلّغون عن مشكلات عولجت في الجديدة منذ أشهر. واتركه موقوفاً ما دام مسار عمل حقيقي يحتاج الشاشات القديمة. وللخادم كذلك أن يمنع الواجهة القديمة من تلقاء نفسه عبر الخاصية `disable-old-ui`، فإن بقيت الشاشات القديمة ممنوعة مع إيقاف هذا الخيار فابحث هناك.

**البدء بال GUI الجديد في الأجهزة المحمولة و اللوحية** `value.info.startInMobileByNewGui` *(مفعل افتراضياً)* — القرار نفسه لمتصفحات الهواتف.

**استعمال الجداول التفصيليه بشكل افتراضي في الموبايل** `value.info.useDetailedGridsInMobile` *(مفعل افتراضياً)* — يعرض الهاتف جداول كاملة بدل تخطيط البطاقات المضغوط. فالجداول التفصيلية تحمل معلومات أكثر، والبطاقات أسهل في اللمس. واختر بحسب ما يفعله مستخدمو الهاتف فعلاً — فمراجعة الأرقام تريد جداول، وإدخال بضعة حقول يريد بطاقات.

**تثبيت القائمة دائما** `value.info.fixMenuAsSideBar` — يثبّت القائمة الرئيسية مفتوحة كشريط جانبي بدل طيّها. مناسب على الشاشات العريضة حيث يتنقل المستخدمون باستمرار.

**طريقة عرض الملفات عند اختيارها من القائمة** `value.info.mfDefaultMenuItemBehavior` — ماذا يحدث حين يختار المستخدم ملفاً أساسياً من القائمة: **مطالعة القوائم** تفتح قائمة السجلات الموجودة، و**سجل جديد** تفتح سجلاً فارغاً. والمطالعة تناسب البيانات المرجعية التي يبحث فيها الناس، و«سجل جديد» تناسب الملفات التي تُنشأ غالباً.

**طريقة عرض المستندات عند اختيارها من القائمة** `value.info.docDefaultMenuItemBehavior` — والمثل مع وصلات المستندات في القائمة. والتركيبات كثيفة الإدخال تضبط المستندات على «سجل جديد» والملفات الأساسية على «مطالعة القوائم» عادةً.

ويُقرأ هذان الإعدادان أثناء بناء القائمة لا أثناء استعمالها، فتغيير أيٍّ منهما لا يمسّ القائمة القائمة بالفعل — انظر [كيف تُبنى القائمة](/ar/platform/menus/menu-structure).

**الذهاب الى الشاشة التى تم إنشاء السجل فيها عند فتحة** `value.info.shouldRedirectEditView` — حين يكون للسجل شاشة تعديل مخصصة معرّفة، يعيد فتحه التوجيه إليها بدل عرض الشاشة القياسية.

**عرض اوبشن طباعة الباركود القديم في قائمة المزيد** `value.info.showOldBarcodeMenu` — يبقي قائمة الباركود القديمة ظاهرة. ولا تلزم إلا حيث ما زال مسار عمل باركود قديم مستعملاً.

**ثيم النظام الافتراضي** `value.info.defaultSystemTheme` — ثيم النظام الجاهز الذي يبدأ به المستخدم إلى أن يختار ثيماً بنفسه: وردي، كحلي، فيروزي، أخضر وغيرها. يسري على كل المستخدمين وكل متصفح جديد، ولا يتجاوز أبداً ثيماً اختاره أحدهم. ويتقدم عليه أي ثيم مخصص مُعلَّم كافتراضي. وتجد كل الخيارات بالوضعين الفاتح والداكن في صفحة [الثيمات](/ar/platform/everyday-tools/ui-themes).

## شاشة الدخول والخلفية

**اسم الشركة (للعرض عند تسجيل الدخول )** `value.info.companyNameForLoginPage` — الاسم المعروض على شاشة الدخول.

**تعين خلفية** `value.info.useBackgroundImage` و**صورة الخلفية** `backgroundImage` — هل تُعرض صورة خلفية، والصورة نفسها.

**الاولوية 1** حتى **الاولوية 7** `value.info.firstPriority` … `value.info.seventhPriority` — يمكن تعريف صورة الخلفية على سبعة مستويات: الإعدادات العامة، والشركة، والقطاع، والفرع، والإدارة، والمجموعة التحليلية، والمستخدم نفسه. وهذه الخانات السبع ترتّب تلك المستويات، ويستعمل النظام أول مستوى تكون له صورة فعلاً. ضع **المستخدم** أولاً إن أردت أن يخصص الناس خلفياتهم مع الرجوع إلى صورة الشركة حين لا يفعلون، وضع **الشركة** أولاً في مجموعة شركات يجب أن تُظهر كل تابعة فيها هويتها البصرية.

## الخطوط

**اسم الخط** / **حجم الخط** / **لون الخط** `value.info.fontInfo.fontName`, `...fontSize`, `...fontColor` — خط الواجهة الرئيسي.

**اسم خط الحقل الغير قابل للتعديل** / **حجم خط الحقل الغير قابل للتعديل** / **لون خط الحقل الغير قابل للتعديل** `value.info.fontInfo.disabledFontName`, `...disabledFontSize`, `...disabledFontColor` — شكل عرض الحقول المعطلة. ويستحق ضبطاً مقصوداً: فالمستخدم يحتاج أن يميّز بنظرة أن الحقل للقراءة فقط، والرمادي المفرط في الفتوح يُقرأ «معطوب» لا «مقفل».

**اسم خط القوائم** / **حجم خط القوائم** / **لون خط القوائم** `value.info.fontInfo.menuFontName`, `...menuFontSize`, `...menuFontColor` — خط القائمة.

## ألوان وأنماط الجداول

يستعمل النظام اللون ليحمل معنى داخل الجداول، وهذه الإعدادات تحدد شكل كل معنى.

**لون المستوي الأول للتفاصيل** / **لون المستوي الثاني للتفاصيل** / **لون المستوي الثالث للتفاصيل** `value.info.gridLevel1Color`, `...gridLevel2Color`, `...gridLevel3Color` — ألوان الأسطر لمستويات التداخل الثلاثة في جدول التفاصيل، فيرى القارئ بنظرة أي الأسطر تتبع أي أصل.

**لون السطر المجاني** `value.info.freeLineColor` — الأسطر الحاملة أصنافاً مجانية.

**لون السطر التابع** `value.info.slaveLineColor` — الأسطر المولَّدة كأبناء لسطر آخر.

**لون الصنف المرتجع** `value.info.returnedItemColor` — الأسطر التي أُرجعت.

**لون السطور المرسلة** / **لون السطور المرشلة بشكل غير صحيح** `value.info.sentLineStyle`, `value.info.inValidSentLineStyle` — الأسطر المرسلة بالفعل إلى نظام خارجي، وتلك التي فشل إرسالها في التحقق. اختر لونين مختلفين بوضوح: فتمييز «مرسل» من «مرسل ومرفوض» بنظرة هو الغاية كلها.

**السماح بالتفاف النص في الجداول** / **السماح بالتفاف النص في جداول القوائم** `value.info.allowTextWrapInGrids`, `value.info.allowTextWrapInListViews` — يتيح لنص الخلية أن يلتف على أكثر من سطر بدل بتره. أوضح للقراءة، لكن عدد الأسطر التي تسع الشاشة يقل.

**عدد السطور في الجدوال** `value.info.linesCountInGrids` — عدد الأسطر الافتراضي في صفحة الجدول.

**Legacy UI Extra Styles** `value.info.legacyUIExtraStyles` — تنسيقات إضافية تُطبَّق في الواجهة القديمة، للتركيبات التي تحتاج مظهراً بعينه هناك.

::: tip لون وأيقونة لنوع سجل واحد أو حقل واحد
كل ما سبق يلوّن النظام كله على نمط واحد. فإن كان المعنى الذي تريد الإشارة إليه أضيق — أيقونة على فاتورة المبيعات في القائمة، أو لون على حقل *العميل*، أو أيقونة مختلفة لكل قيمة من قيم حالة ما — فاضبطه في [أعدادات الحقول و الشاشات](/ar/platform/fields-and-entities-settings/fields-settings-field-icons)، وهي تتيح أيضاً أن تعطي كل أيقونة لوناً للوضع الفاتح وآخر للوضع الداكن فتبقى واضحة في الحالتين.
:::

## النوافذ المنبثقة والمحررات

**إخفاء عمود اختيار السطر في قوائم الاختيار** `value.info.hideSelectColumnInSelectorPopup` — يزيل عمود الاختيار من نافذة اختيار السجلات.

**إخفاء عمود عدد مرات الإدارج في قوائم الاختيار** `value.info.hideCountColumnInSelectorPopup` — يزيل عمود العدد من النافذة نفسها. وكلاهما يشذّب نافذة اختيار يجدها المستخدمون مزدحمة.

**Always Use Text Area In Serial Popup** `value.info.alwaysUseTextAreaInSerialPopup` — يستعمل إدخال الأرقام المسلسلة مربعاً متعدد الأسطر دائماً، وهو ما يناسب لصق قائمة طويلة من الأرقام الممسوحة.

**عدم استعمال الوصف في الحقول** `value.info.doNotUseDescriptorsInFields` — تعرض حقول المرجع الكود والاسم فقط بدل النص الوصفي الأطول. فعّله حيث تكون الأوصاف طويلة إلى حد يدفع الجزء المفيد من الحقل خارج الشاشة.

**استعمال محرر النصوص الجديد** `value.info.useKendoRichEditor` — تستعمل حقول النص الغني محرر Kendo.

**إنشاء المستند الارشيفي في شاشة منبثقة** `value.info.createDMSDocInPopUpWindow` *(مفعل افتراضياً)* — يفتح إجراء «إنشاء مستند ارشيفي» [المستند الأرشيفي](/ar/platform/dms/dms-documents.md) الجديد في نافذة منبثقة بدل الانتقال بعيداً، فلا يفقد المستخدم السجل الذي كان يعمل عليه.

## المساعدات السريعة

**موضع المساعدة السريعة** `value.info.tooltipPosition` — هل تظهر المساعدة السريعة أعلى الحقل أم أسفله.

**تثبيت المساعدة السريعة** `value.info.pinToolTip` — يبقي المساعدة مفتوحة بدل اختفائها، وهو ما يعين المستخدمين وهم يتعلمون شاشة جديدة.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| البدء دائما بال GUI الجديد | Start Always By New Gui | `value.info.startAlwaysByNewGui` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| استخدام الGUI الجديد دائماً (يمنع الوصول إلى الGUI القديم) | Always Use New GUI (Prevent Use Old GUI) | `value.info.alwaysUseNewGUI` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| البدء بال GUI الجديد في الأجهزة المحمولة و اللوحية | Start With New GUI on Mobile and Tablet Devices | `value.info.startInMobileByNewGui` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| استعمال الجداول التفصيليه بشكل افتراضي في الموبايل | Use Detailed Grids In Mobile | `value.info.useDetailedGridsInMobile` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| تثبيت القائمة دائما | Fix Menu As Side Bar | `value.info.fixMenuAsSideBar` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| طريقة عرض الملفات عند اختيارها من القائمة | Master Files Default Menu Item Behavior | `value.info.mfDefaultMenuItemBehavior` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| طريقة عرض المستندات عند اختيارها من القائمة | Document Files Default Menu Item Behavior | `value.info.docDefaultMenuItemBehavior` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| الذهاب الى الشاشة التى تم إنشاء السجل فيها عند فتحة | Go To Screen Where Record Was Created When Opening It | `value.info.shouldRedirectEditView` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| عرض اوبشن طباعة الباركود القديم في قائمة المزيد | Show Old Print Barcode Option in More Menu | `value.info.showOldBarcodeMenu` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| ثيم النظام الافتراضي | Default System Theme | `value.info.defaultSystemTheme` | [بدء التشغيل والتنقل](#bd-ltshGyl-wltnql) |
| اسم الشركة (للعرض عند تسجيل الدخول ) | Company Name For Login Page | `value.info.companyNameForLoginPage` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| تعين خلفية | Use Background Image | `value.info.useBackgroundImage` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| صورة الخلفية | Background Image | `backgroundImage` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| الاولوية 1 | First Priority | `value.info.firstPriority` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| الاولوية 2 | Second Priority | `value.info.secondPriority` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| الاولوية 3 | Third Priority | `value.info.thirdPriority` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| الاولوية 4 | Fourth Priority | `value.info.fourthPriority` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| الاولوية 5 | Fifth Priority | `value.info.fifthPriority` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| الاولوية 6 | Sixth Priority | `value.info.sixthPriority` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| الاولوية 7 | Seventh Priority | `value.info.seventhPriority` | [شاشة الدخول والخلفية](#shsh-ldkhwl-wlkhlfy) |
| اسم الخط | Font Name | `value.info.fontInfo.fontName` | [الخطوط](#lkhTwT) |
| حجم الخط | Font Size | `value.info.fontInfo.fontSize` | [الخطوط](#lkhTwT) |
| لون الخط | Font Color | `value.info.fontInfo.fontColor` | [الخطوط](#lkhTwT) |
| اسم خط الحقل الغير قابل للتعديل | Disabled Font Name | `value.info.fontInfo.disabledFontName` | [الخطوط](#lkhTwT) |
| حجم خط الحقل الغير قابل للتعديل | Disabled Font Size | `value.info.fontInfo.disabledFontSize` | [الخطوط](#lkhTwT) |
| لون خط الحقل الغير قابل للتعديل | Disabled Font Color | `value.info.fontInfo.disabledFontColor` | [الخطوط](#lkhTwT) |
| اسم خط القوائم | Menu Font Name | `value.info.fontInfo.menuFontName` | [الخطوط](#lkhTwT) |
| حجم خط القوائم | Menu Font Size | `value.info.fontInfo.menuFontSize` | [الخطوط](#lkhTwT) |
| لون خط القوائم | Menu Font Color | `value.info.fontInfo.menuFontColor` | [الخطوط](#lkhTwT) |
| لون المستوي الأول للتفاصيل | Grid Level 1 Color | `value.info.gridLevel1Color` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| لون المستوي الثاني للتفاصيل | Grid Level 2 Color | `value.info.gridLevel2Color` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| لون المستوي الثالث للتفاصيل | Grid Level 3 Color | `value.info.gridLevel3Color` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| لون السطر المجاني | Free Line Color | `value.info.freeLineColor` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| لون السطر التابع | Slave Line Color | `value.info.slaveLineColor` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| لون الصنف المرتجع | Returned Item Color | `value.info.returnedItemColor` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| لون السطور المرسلة | Sent Line Style | `value.info.sentLineStyle` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| لون السطور المرشلة بشكل غير صحيح | Invalid Sent Line Style | `value.info.inValidSentLineStyle` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| السماح بالتفاف النص في الجداول | Allow Text Wrap In Grids | `value.info.allowTextWrapInGrids` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| السماح بالتفاف النص في جداول القوائم | Allow Text Wrap In List Views | `value.info.allowTextWrapInListViews` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| عدد السطور في الجدوال | Lines Count In Grids | `value.info.linesCountInGrids` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| Legacy UI Extra Styles | Legacy UI Extra Styles | `value.info.legacyUIExtraStyles` | [ألوان وأنماط الجداول](#lwn-wnmT-ljdwl) |
| إخفاء عمود اختيار السطر في قوائم الاختيار | Hide Select Column In Selector Popup | `value.info.hideSelectColumnInSelectorPopup` | [النوافذ المنبثقة والمحررات](#lnwfdh-lmnbthq-wlmHrrt) |
| إخفاء عمود عدد مرات الإدارج في قوائم الاختيار | Hide Count Column In Selector Popup | `value.info.hideCountColumnInSelectorPopup` | [النوافذ المنبثقة والمحررات](#lnwfdh-lmnbthq-wlmHrrt) |
| Always Use Text Area In Serial Popup | Always Use Text Area In Serial Popup | `value.info.alwaysUseTextAreaInSerialPopup` | [النوافذ المنبثقة والمحررات](#lnwfdh-lmnbthq-wlmHrrt) |
| عدم استعمال الوصف في الحقول | Do Not Use Descriptors In Fields | `value.info.doNotUseDescriptorsInFields` | [النوافذ المنبثقة والمحررات](#lnwfdh-lmnbthq-wlmHrrt) |
| استعمال محرر النصوص الجديد | Use New Rich Text Editor | `value.info.useKendoRichEditor` | [النوافذ المنبثقة والمحررات](#lnwfdh-lmnbthq-wlmHrrt) |
| إنشاء المستند الارشيفي في شاشة منبثقة | Create DMS Doc In Pop Up Window | `value.info.createDMSDocInPopUpWindow` | [النوافذ المنبثقة والمحررات](#lnwfdh-lmnbthq-wlmHrrt) |
| موضع المساعدة السريعة | Tooltip Position | `value.info.tooltipPosition` | [المساعدات السريعة](#lmsaadt-lsryaa) |
| تثبيت المساعدة السريعة | Pin Tool Tip | `value.info.pinToolTip` | [المساعدات السريعة](#lmsaadt-lsryaa) |
