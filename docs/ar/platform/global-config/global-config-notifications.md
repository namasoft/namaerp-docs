---
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# الإشعارات والمراسلات

كل ما يحتاجه النظام ليخبر أحداً بشيء: الإشعارات داخل التطبيق وأصواتها، وحسابات البريد والرسائل القصيرة التي يرسل عبرها.

ولمعرفة كيف تُعرَّف الإشعارات وتُطلَق، انظر [منظومة الإشعارات](../notifications/notifications-system.md) و[الرسائل القصيرة وواتساب](../notifications/sms-and-whatsapp.md).

![صفحة الإشعارات والمراسلات](./images/gc-notifications-ar.png)

## الإشعارات

**محتوى التنبيه** `value.info.notificationContent` — هل يُعرض نص الإشعار نفسه (**عرض المحتوى**) أم مجرد تلميح محايد بأن «لديك إشعاراً» (**عدم عرض المحتوى**). اختر «عدم عرض المحتوى» حيث قد تحمل الإشعارات أرقام رواتب أو بيانات عملاء أو أي شيء لا ينبغي أن يبقى على شاشة غير مراقَبة.

**عدد التنبيهات اللتى سوف تظهر عند وجود تنبيه جديد** `value.info.notificationsCount` — كم إشعاراً يُدرج في اللوحة.

**أقصى عدد لإشعارات المستخدم** `value.info.maxUserNotificationCount` *(الافتراضي 10000)* — حد احتفاظ لكل مستخدم. وعند تجاوزه يرفع النظام رسالة حرجة. وبلا حد ينمو تاريخ الإشعارات بلا نهاية على تركيبة مزدحمة.

**عدم إرسال التنبيهات للموظف المفوض** `value.info.doNotSendNotificationsToDelegates` — في الوضع المعتاد، إذا كان للموظف تفويض ساري رُفعت التنبيهات الموجهة إليه لنائبه أيضاً موسومةً بـ**مفوض من**. وتفعيل هذا الخيار يوقف ذلك في كل مكان. والأفضل استعمال حقل **عدم تطبيق التفويض** في تعريف التنبيه نفسه حين يراد إبقاء تنبيهات حساسة قليلة مع مستلمها الأصلي فقط — انظر [منظومة الإشعارات](../notifications/notifications-system.md).

**تجاهل حالة الموظف عند إرسال التنبيهات** `value.info.ignoreEmployeeStateWhenSendingNotifications` — في الوضع المعتاد يُسقط النظام في صمت كل مستقبِل حالة موظفه: مستقيل، أو تم فصله، أو على المعاش، أو موقوف، وكل مستخدم مرتبط بموظف كهذا. وتفعيل هذا الخيار يوقف هذا الفحص للتركيب كله، فيستمر وصول التنبيهات إلى الموظفين السابقين. أما المستخدم المعلَّم عليه **منع الدخول** فيُسقَط في الحالتين — انظر [لماذا لم يصل التنبيه](../notifications/notifications-system.md).

**صوت الاشعارات** / **صوت إشعار الموافقات** / **صوت الرسائل** / **صوت انتهاء المهمة** `value.info.notificationsSound`, `value.info.approvalsSound`, `value.info.messagesSound`, `value.info.taskEndedSound` — كل منها **بدون** أو أحد خمسة أصوات. ومنح الموافقات صوتاً مميزاً عن الإشعارات العامة مفيد بحق لمن يعتمد طوال اليوم، أما منح الأربعة الصوت نفسه فليس إلا ضجيجاً.

## إعدادات الإرسال

**Rotate Sender Emails** `value.info.rotateSenderEmails` *(مفعل افتراضياً)* — يتنقل بين حسابات الإرسال المعرّفة بدل استعمال الأول دائماً. وهذا يوزّع الحجم على الحسابات، وهو مهم لأن معظم مزوّدي البريد يحدّون من معدل الحساب الواحد.

**ارسال البريد و الرسائل من الخوادم (CSV)** `value.info.sendMailsAndSMSOnlyFromServers` — قائمة معرّفات الخوادم المسموح لها بالإرسال فعلاً. وقيمته الافتراضية هي معرّف هذا الخادم نفسه، وهذا الافتراضي ميزة أمان تستحق الفهم.

::: warning هذا ما يمنع نسخة الاختبار من مراسلة عملائك
حين تستعيد قاعدة بيانات الإنتاج على خادم اختبار، تأتي معها كل الإشعارات المجدولة. ولأن هذا الحقل يحمل معرّف خادم *الإنتاج* ومعرّف خادم الاختبار مختلف، تمتنع نسخة الاختبار في صمت عن إرسال أي شيء. اتركه مملوءاً، وحين تنقل الإنتاج عمداً إلى خادم جديد فتذكّر تحديثه — وإلا توقّف خادم الإنتاج الجديد عن الإرسال هو الآخر.
:::

**Max Retray Number For Pending Tasks** `value.info.maxRetrayNumForPendingTasks` *(الافتراضي 250)* — كم مرة يُعاد تنفيذ المهمة المعلقة قبل التخلي عنها.

**Failed Pending Tasks Notification** `value.info.failedPendingTasksNotification` — الإشعار الذي يُرفع حين تستسلم المهمة أخيراً، فيعلم إنسانٌ أن الرسائل لا تخرج.

## حسابات إرسال البريد

**إعدادات البريد المرسل** `value.info.emailSettings` *(جدول)* — سطر لكل حساب إرسال. ويحمل كل سطر **اسم النطاق** و**البريد** و**اسم المستخدم** و**كلمة المرور** و**الخادم** و**المنفذ** وخيارَي **استخدام SSL** و**استخدام TLS**، إضافةً إلى **ملف OAuth** اختياري للمزوّدين الذين يشترطونه بدل كلمة المرور.

ويسم **استخدام فقط إذا كان مفضلاً** حساباً ينبغي ألا يُستعمل إلا حين يطلبه شيء صراحةً، بدل دخوله في التدوير العام.

وتتيح أعمدة المحددات الخمسة — الشركة والقطاع والفرع والإدارة والمجموعة التحليلية — تخصيص نطاق الحساب، فترسل كل شركة في المجموعة من عنوانها.

::: info حسابات OAuth تُفحص عند الحفظ
إذا أشار سطر إلى ملف OAuth فإن الحفظ يفحص ثلاثة أمور: أن يكون الملف مصرَّحاً (افتحه واستعمل «بدء OAuth» إن لم يكن)، وأن يكون موسوماً بأنه لإرسال البريد من Gmail، وأن يكون بريد مستخدمه مطابقاً تماماً لاسم المستخدم في السطر. وكل إخفاق يذكر اسم الملف ويبيّن الخطأ بالضبط.
:::

## استقبال البريد

**إعدادات البريد المستقبل** `value.info.emailReceiverSettings` *(جدول)* — حسابات البريد الوارد، لمسارات العمل التي تنشئ سجلات من بريد مستلَم. ولكل سطر **نمط البريد** و**البروتوكول** و**الخادم** و**المنفذ** وخيار **استخدام SSL**.

## مزوّدو الرسائل القصيرة

**إعدادات الرسائل القصيرة** `value.info.smsSettings` *(جدول)* — سطر لكل مزوّد رسائل، بأعمدة المحددات الخمسة نفسها لتخصيص النطاق.

وإلى جانب **المزود** و**المرسل** و**اسم المستخدم** و**كلمة المرور** و**استخدام فقط إذا كان مفضلاً**، يحمل السطر ما يحتاجه أي مزوّد HTTP عام: **استخدام طريقة POST** و**ترويسات HTTP** و**قالب جسم الطلب** و**مؤشر النجاح** (النص الذي يعني في الرد أن الإرسال نجح) و**إعدادات أخرى**.

و**مصحح رقم الهاتف** استعلام يعيد كتابة الأرقام إلى الصيغة التي يتوقعها المزوّد — فيحوّل `01012345678` المحفوظ محلياً إلى `201012345678` مثلاً.

::: warning مزوّدان لهما متطلبات إضافية
لا يقبل **WaboxApp** إلا الأرقام بالصيغة الدولية، فمصحح رقم الهاتف مطلوب — ويرفض النظام حفظ السطر بدونه. ويشترط مزوّد **الرابط العام** وضع الرابط المستهدف في «إعدادات أخرى»، ولا يُحفظ بدونه كذلك. وفي الحالتين يذكر الخطأ رقم السطر.
:::

## خادم البريد القديم

**الخادم** / **المنفذ** / **نوع الإتصال** / **يحتاج كلمة سر** / **اسم المستخدم** / **كلمة المرور** `value.info.mailServerSettings.server` وأخواته — حساب SMTP واحد، من قبل وجود جدول المرسِلين أعلاه. وما زال يُستعمل بديلاً احتياطياً حين لا يطابق أي سطر في جدول إعدادات البريد المرسل. وينبغي للتركيبات الجديدة أن تضبط الجدول وتترك هذا فارغاً.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| محتوى التنبيه | Notification Content | `value.info.notificationContent` | [الإشعارات](#lshaart) |
| عدد التنبيهات اللتى سوف تظهر عند وجود تنبيه جديد | Number of notifications that will appear when there is a new one | `value.info.notificationsCount` | [الإشعارات](#lshaart) |
| أقصى عدد لإشعارات المستخدم | Max User Notification Count | `value.info.maxUserNotificationCount` | [الإشعارات](#lshaart) |
| صوت الاشعارات | Notifications Sound | `value.info.notificationsSound` | [الإشعارات](#lshaart) |
| صوت إشعار الموافقات | Approvals Sound | `value.info.approvalsSound` | [الإشعارات](#lshaart) |
| صوت الرسائل | Messages Sound | `value.info.messagesSound` | [الإشعارات](#lshaart) |
| صوت انتهاء المهمة | Task Ended Sound | `value.info.taskEndedSound` | [الإشعارات](#lshaart) |
| عدم إرسال التنبيهات للموظف المفوض | Do Not Send Notifications To Delegated Employee | `value.info.doNotSendNotificationsToDelegates` | [الإشعارات](#lshaart) |
| تجاهل حالة الموظف عند إرسال التنبيهات | Ignore Employee State When Sending Notifications | `value.info.ignoreEmployeeStateWhenSendingNotifications` | [الإشعارات](#lshaart) |
| Rotate Sender Emails | Rotate Sender Emails | `value.info.rotateSenderEmails` | [إعدادات الإرسال](#aaddt-lrsl) |
| ارسال البريد و الرسائل من الخوادم (CSV) | Send Mails And SMS Only From Servers (CSV) | `value.info.sendMailsAndSMSOnlyFromServers` | [إعدادات الإرسال](#aaddt-lrsl) |
| Max Retray Number For Pending Tasks | Max Retray Number For Pending Tasks | `value.info.maxRetrayNumForPendingTasks` | [إعدادات الإرسال](#aaddt-lrsl) |
| Failed Pending Tasks Notification | Failed Pending Tasks Notification | `value.info.failedPendingTasksNotification` | [إعدادات الإرسال](#aaddt-lrsl) |
| إعدادات البريد المرسل | Email Sender Settings | `value.info.emailSettings` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| يتسعمل فقط اذا كان مضافا في المرسل المفضل | Use Only If Specified in Preferred Sender | `value.info.emailSettings.useOnlyIfPreferred` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| Domain Name | Domain Name | `value.info.emailSettings.domainName` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| إيميل | E-mail | `value.info.emailSettings.email` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| اسم المستخدم | Username | `value.info.emailSettings.username` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| كلمة المرور | Password | `value.info.emailSettings.password` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| الخادم | Server | `value.info.emailSettings.server` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| المنفذ | Port | `value.info.emailSettings.port` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| استخدام SSL | Use SSL | `value.info.emailSettings.useSSL` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| استخدام TLS | Use TLS | `value.info.emailSettings.useTLS` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| OAuth File | OAuth File | `value.info.emailSettings.oAuthFile` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| الشركة | Legal Entity | `value.info.emailSettings.dimensions.legalEntity` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| القطاع | Sector | `value.info.emailSettings.dimensions.sector` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| الفرع | Branch | `value.info.emailSettings.dimensions.branch` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| المجموعة التحليلية | Analysis set | `value.info.emailSettings.dimensions.analysisSet` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| الإدارة | Department | `value.info.emailSettings.dimensions.department` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| إعدادات البريد المستقبل | Email Receiver Settings | `value.info.emailReceiverSettings` | [استقبال البريد](#stqbl-lbryd) |
| العنوان المستعمل | Email Address Pattern | `value.info.emailReceiverSettings.emailPattern` | [استقبال البريد](#stqbl-lbryd) |
| البروتوكول | Protocol | `value.info.emailReceiverSettings.protocol` | [استقبال البريد](#stqbl-lbryd) |
| الخادم | Server | `value.info.emailReceiverSettings.server` | [استقبال البريد](#stqbl-lbryd) |
| المنفذ | Port | `value.info.emailReceiverSettings.port` | [استقبال البريد](#stqbl-lbryd) |
| استخدام SSL | Use SSL | `value.info.emailReceiverSettings.useSSL` | [استقبال البريد](#stqbl-lbryd) |
| إعدادات الرسائل القصيرة | SMS Settings | `value.info.smsSettings` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| مزود الخدمة | Service Provider | `value.info.smsSettings.provider` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| يتسعمل فقط اذا كان مضافا في المرسل المفضل | Use Only If Specified in Preferred Sender | `value.info.smsSettings.useOnlyIfPreferred` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| المرسل | Sender | `value.info.smsSettings.sender` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| اسم المستخدم | Username | `value.info.smsSettings.username` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| كلمة المرور | Password | `value.info.smsSettings.password` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| إعدادات أخرى | Other Settings | `value.info.smsSettings.otherSettings` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| استعلام تصحيح رقم الهاتف | Phone Number Corrector Query | `value.info.smsSettings.phoneNumberCorrector` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| Use POST Method | Use POST Method | `value.info.smsSettings.usePOSTMethod` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| HTTP Headers(header1==>value2) - Multiple Headers Should Be in Separate Lines | HTTP Headers(header1==>value2) - Multiple Headers Should Be in Separate Lines | `value.info.smsSettings.httpHeaders` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| Request Body Template (Can Be Used For JSON and XML requests) | Request Body Template (Can Be Used For JSON and XML requests) | `value.info.smsSettings.requestBodyTemplate` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| Success Indicator (String that must be included in the response to consider the send operation successful) | Success Indicator (String that must be included in the response to consider the send operation successful) | `value.info.smsSettings.successIndicator` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| الشركة | Legal Entity | `value.info.smsSettings.dimensions.legalEntity` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| القطاع | Sector | `value.info.smsSettings.dimensions.sector` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| الفرع | Branch | `value.info.smsSettings.dimensions.branch` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| المجموعة التحليلية | Analysis set | `value.info.smsSettings.dimensions.analysisSet` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| الإدارة | Department | `value.info.smsSettings.dimensions.department` | [مزوّدو الرسائل القصيرة](#mzwWdw-lrsyl-lqSyr) |
| الخادم | Server | `value.info.mailServerSettings.server` | [خادم البريد القديم](#khdm-lbryd-lqdym) |
| المنفذ | Port | `value.info.mailServerSettings.port` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
| نوع الإتصال | Connection Type | `value.info.mailServerSettings.connectionType` | [خادم البريد القديم](#khdm-lbryd-lqdym) |
| يحتاج كلمة سر | Authenticated | `value.info.mailServerSettings.authenticated` | [خادم البريد القديم](#khdm-lbryd-lqdym) |
| اسم المستخدم | User Name | `value.info.mailServerSettings.userName` | [خادم البريد القديم](#khdm-lbryd-lqdym) |
| كلمة المرور | Password | `value.info.mailServerSettings.password` | [حسابات إرسال البريد](#Hsbt-rsl-lbryd) |
