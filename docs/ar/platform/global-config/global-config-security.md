---
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# الأمان وتسجيل الدخول

كل ما يخص الدخول إلى النظام وما تراه بعد الدخول: محاولات الدخول والجلسات، وقواعد كلمة المرور، والمصادقة الثنائية، وLDAP، ورؤية السجلات، وصفحة تسجيل المستخدمين العامة.

وللصورة الأوسع عن ملفات الصلاحيات، انظر [نظرة عامة على الصلاحيات](/ar/platform/security/security-overview).

![صفحة الأمان وتسجيل الدخول](./images/gc-security-ar.png)

## تسجيل الدخول والجلسات

**أقصى عدد يتم السماح للمستخدم بإدخال كلمة المرور خطأ** `value.info.maxFailedLoginAttempts` *(الافتراضي 5)* — حين تتجاوز المحاولات الخاطئة للمستخدم هذا العدد، تُرفض محاولات دخوله التالية بالرسالة
«لقد استنفذت أقصى عدد من محاولات الدخول الخطأ. يرجى المحاولة مرة أخرى بعد {0} دقيقة أو التواصل مع مدير النظام. اسم المستخدم: {1}»
والدخول الناجح يمسح العدّ. والقيمة الفارغة أو الصفر تعني بلا حد.

**تذكر آخر محاولة خاطئة لإدخال كلمة المرور بالدقائق قبل السماح بالدخول مرة أخرى** `value.info.minutesToRememberFailedLogins` *(الافتراضي 30)* — مدة ذلك الرفض، محسوبة من أول محاولة خاطئة في السلسلة. وبعد مرورها تبدأ المحاولة التالية العدّ من الصفر. والرقمان معاً يفرّقان بين مستخدم نسي وبين من يخمّن كلمات المرور.

**أقصى عدد مرات تسجيل الدخول المتزامن للمستخدم الواحد** `value.info.maxLoginSessions` — كم جلسة يملكها المستخدم الواحد في وقت واحد. اتركه فارغاً لبلا حد. والقيمة في ملف صلاحيات المستخدم، وفوقها القيمة في إعدادات المستخدم نفسه، تحل محل هذه القيمة؛ والمستخدم `admin` لا يُقيَّد أبداً.

**تسجيل الخروج آليا عند تعدي أقصى عدد مرات تسجيل دخول (من الجلسات الأقدم)** `value.info.autoLogoutWithMaxSessions` — ماذا يحدث عند بلوغ الحد: مع تفعيله تُخرَج أقدم جلسة لإفساح المكان، ومع إيقافه يُرفض الدخول الجديد. والأول أرفق بمن ترك جلسة مفتوحة على جهاز آخر.

**تسجيل الخروج آليا عند عدم وجود نشاط لمدة (دقيقة)** `value.info.autoLogoutTime` *(الافتراضي 15)* — دقائق الخمول قبل إغلاق الجلسة آلياً.

**تسجيل الخروج حتى مع (الاحتفاظ بتسجيل الدخول)** `value.info.autoLogoutRememberMe` *(مفعل افتراضياً)* — هل تخضع جلسات «تذكرني» أيضاً لمهلة الخمول تلك.

## سياسة كلمة المرور

تُفحص هذه القواعد كلما ضُبطت كلمة مرور أو غُيّرت.

**أقل طول لحقل كلمة مرور المستخدم** `value.info.minPasswordLength` *(الافتراضي 6)*، **أقل عدد من الحروف الواجب توافرها** `value.info.minAlphaChars`، **أقل عدد من الرموز الواجب توافرها** `value.info.minSpecialChars`، **أقل عدد من الأرقام الواجب توافرها** `value.info.minNumbersChars`، **تحتوي على حروف صغيرة وكبيرة** `value.info.upperAndLowerCase` — متطلبات التعقيد المعتادة.

**منع استعمال نفس كلمة المرور القديمة عند تغييرها** `value.info.preventSamePasswordWhenChanging` *(مفعل افتراضياً)* — يرفض «تغييراً» يعيد كلمة المرور إلى ما كانت عليه.

**Send Password By Mail Template** / **Send Password By SMS Template** `value.info.sendPasswordByMailTemplate`, `value.info.sendPasswordBySMSTemplate` — الرسالتان المُرسلتان عند تسليم كلمة مرور جديدة. وكلتاهما تقبلان بدائل: `{name1}` لاسم المستخدم، و`{loginId}` لاسم الدخول، و`{changePasswordRequest.newPassword}` لكلمة المرور الجديدة نفسها.

## المصادقة الثنائية

**نوع المصادقة الثنائية لتسجيل الدخول** `value.info.login2FAMethod` — العامل الثاني المطلوب عند الدخول: **بدون**، أو **رمز تحقق برسالة (OTP)**، أو **Estidamah API**.

**تنبيه OTP للمصادقة الثنائية** `value.info.notificationFor2FAOtp` — التنبيه الذي يحمل الرمز. وهو **مطلوب** حين تكون الطريقة «رمز تحقق برسالة (OTP)» — ويرفض النظام الحفظ بدونه، لأن رمزاً لا يصل أحداً يقفل الجميع خارج النظام.

**OTP Format** `value.info.otpFormat` — **أرقام فقط** أو **أرقام و حروف** أو **حروف فقط**. والأرقام أسهل في القراءة من الهاتف والكتابة، والأرقام والحروف أقوى عند الطول نفسه.

**طول OTP** / **وقت انتهاء صلاحية OTP** / **مدة الانتظار قبل إعادة إرسال OTP** `value.info.otpLength`, `value.info.otpExpiryTime`, `value.info.otpResendDelay` — كم طول الرمز، وكم يبقى صالحاً، وكم ينتظر المستخدم قبل طلب رمز آخر. ومدة الانتظار هي ما يمنع مستخدماً متعثراً من إطلاق سيل من الرسائل.

**رابط بيئة Estidamah**، **مفتاح API الخاص بـ Estidamah**، **مفتاح التشفير الخاص بـ Estidamah**، **متجه التهيئة للتشفير (IV) الخاص بـ Estidamah** `value.info.estidamahEnvironmentUrl`, `value.info.estidamahApiKey`, `value.info.estidamahEncryptionKey`, `value.info.estidamahEncryptionIV` — عنوان الخدمة ومواد التشفير الخاصة بخدمة Estidamah. ومع اختيار تلك الطريقة يرفض النظام حفظ الإعدادات بدون رابط البيئة ومفتاح التشفير ومتجه التهيئة.

::: warning Estidamah تحتاج إعداداً على الخادم أيضاً
اختيار طريقة Estidamah يحتاج كذلك إعداداً في ملف `nama.properties` على الخادم: فيرفض النظام حفظ الإعدادات، برسالة تطلب `use-custom-password-validator=true`، حتى يوجد هذا الإعداد أو `use-ldap-for-authentication=true`.
:::

## LDAP

**Use LDAP For Users Login** `value.info.useLDAPForUsersLogin` — يوثّق المستخدمين لدى خادم الدليل بدل كلمات المرور المحفوظة داخل النظام.

**LDAP Server URL (eg. ldap://192.168.1.10:3268 )** / **Default LDAP Domain** `value.info.ldapServerURL`, `value.info.defaultLDAPDomain` — عنوان خادم الدليل، والنطاق المفترض حين يكتب المستخدم اسم دخول مجرداً.

::: warning LDAP تحتاج إعداداً على الخادم أيضاً
كما مع Estidamah، يستلزم تعليم هذا الخيار وضع `use-ldap-for-authentication=true` (أو `use-custom-password-validator=true`) في `nama.properties` قبل أن تُحفظ الإعدادات؛ ورسالة الرفض تطلب إعداد LDAP.
:::

## أمان السجلات

**Allow Disabling Code Field With Security** `value.info.allowDisablingCodeFieldWithSecurity` *(مفعل افتراضياً)* — يتيح لملف الصلاحيات تعطيل حقل الكود.

**Allow Filling Disabled Fields With Creators** `value.info.allowFillingDisabledFieldsWithCreators` *(مفعل افتراضياً)* — يدع مكوّنات النظام تكتب في حقول لا يُسمح للمستخدم بتعديلها. وهو المطلوب عادةً: فمن لا يُسمح له بكتابة الفرع يدوياً ينبغي أن يُملأ له آلياً.

**رفض الاستيراد الذي يحتوي على حقول ليس للمستخدم صلاحية تعديلها** `value.info.rejectImportOfFieldsUserCannotChange` *(غير مفعل افتراضياً)* — يحدد ما يفعله الاستيراد بحقل لا يحق للمستخدم المستورِد تغييره: حقل تجعله إعدادات الحقول الخاصة به *Disabled* أو *InVisible* في ذلك السجل، أو حقل تقفله خطوة الموافقة الحالية للسجل. إذا تُرك الخيار غير مفعل يُتخطى الحقل: تُتجاهل قيمته المستوردة، ويحتفظ السجل بما كان فيه، ويُحفظ الباقي، وتذكر النتيجة الحقول التي تُخطيت. وهذا ما يتيح للمستخدم أن يصدّر شاشة ويعدّل الأعمدة المسموح له بتعديلها ثم يستورد الملف كما هو. وإذا فُعّل يُرفض السجل كله بدلاً من ذلك مع ذكر كل حقل من هذه الحقول. أما سطور الجدول التي لا يحق للمستخدم إضافتها أو حذفها فتُرفض في الحالتين. ويسري الخيار على [استيراد السجلات](/ar/platform/import-export/importing-records) و[الـ REST API](/ar/integration/nama-erp-api) و[أداة الاستيراد في خادم MCP](/ar/modules/ai/ai-mcp-server)، ولا يتأثر به الحفظ من الشاشة.

**دمج ملفات الصلاحية البديلة في المستخدم الرئيسي** `value.info.mergeAlternateSecurityProfilesIntoMainUser` — المستخدم الذي مُنح صلاحيات مستخدم آخر بمستند [صلاحيات إضافية مؤقته](/ar/platform/security/security-delegation) يملك دائماً اتحاد صلاحياته وما نُقل إليه، وهذا الخيار لا يغيّر ذلك. وإنما يغيّر طريقة حساب هذا الاتحاد: فالنظام عادةً يسأل المستخدم أولاً ثم يسأل كل مستخدم نُقلت صلاحياته واحداً بعد الآخر، ومع تفعيل الخيار تُدمج سطورهم مرة واحدة في نسخة موحّدة من المستخدم تُقرأ منها كل الإجابات. والنتيجة واحدة، لكنها أسرع حيث تكثر الصلاحيات المنقولة.

**عرض السجلات الممنوعة من الاستعمال في البحث** `value.info.displayPreventedRecords` — تظل السجلات التي لا يملك المستخدم صلاحية عرضها مدرجةً (محجوبة لا مفتوحة) بدل اختفائها. وبعض المؤسسات تفضّل رسالة «لا يُسمح لك برؤية هذا» الظاهرة على قائمة أقصر في صمت.

**عدم عرض السجلات الممنوعة من الاستعمال في القوائم** `value.info.doNotdispPrevRecInListView` — القرار نفسه متخذاً على حدة لشاشات مطالعة القوائم. ويوجد كلاهما في ملف الصلاحيات أيضاً: فإذا عُلِّم هناك سرى على مستخدمي ذلك الملف حتى لو كان مطفأً هنا.

**عرض السجلات التي لها صلاحية تعديل مع المستخدم الحالي بالإضافة إلى السجلات التي لها صلاحية مطالعة معه** `value.info.displayRecordsWithUpdateCapabilityToUsers` — يصير السجل ظاهراً إذا ملك المستخدم صلاحية العرض *أو* التعديل، بدل اشتراط العرض تحديداً. ويعالج الحالة المفاجئة لمستخدم يُسمح له بتعديل سجل ولا يُسمح له برؤيته.

**تجاهل صلاحيات السجل مع القوائم في كل الشاشات** `value.info.ignoreRecordCapabilitiesInAllListViews` — يوقف ترشيح صلاحيات السجلات في كل شاشات مطالعة القوائم.

**تجاهل صلاحيات السجل مع شاشات محددة** `value.info.ignoreRecordCapabilitiesIn` *(جدول)* — الشيء نفسه مقصوراً على أنواع الكيانات التي تسردها. وهو مفضَّل على الخيار الشامل أعلاه.

**منع حذف المستخدم المرتبط ب Entity System Entries** `value.info.preventDeleteUserRelatedToEntitySystemEntries` *(مفعل افتراضياً)* — يرفض حذف مستخدم ما زالت المدخلات النظامية تشير إليه. اتركه مفعّلاً — فحذف مثل هذا المستخدم يكسر الأثر الرقابي الذي تمثله تلك المدخلات.

## طلبات إضافة المستخدمين

يستطيع النظام إتاحة صفحة عامة يطلب فيها المستخدمون الجدد حساباً، وهذه الإعدادات تتحكم فيها.

**توجيه إضافة مستخدم** / **دفتر إضافة مستخدم** `value.info.userAddRequestTerm`, `value.info.userAddRequestBook` — التوجيه والدفتر المستعملان للطلبات التي تنشئها تلك الصفحة.

**عدم عرض نوع المستخدم موظف** / **عدم عرض نوع المستخدم مقاول** / **عدم عرض نوع المستخدم عميل** / **عدم عرض نوع المستخدم مورد** `value.info.dontDisplayEmployeeType`, `...dontDisplayContractorType`, `...dontDisplayCustomerType`, `...dontDisplaySupplierType` — يزيل كل نوع حساب من الخيارات التي تعرضها الصفحة العامة. فالعمل الذي يسجّل العملاء فقط ينبغي أن يوقف الأنواع الثلاثة الأخرى.

**رسالة الترحيب العربية في طلب إضافة مستخدم** / **رسالة الترحيب الإنجليزية في طلب إضافة مستخدم** `value.info.userAddRequestWelcomeMessageAr`, `value.info.userAddRequestWelcomeMessageEn` — النص المعروض لمن يصل إلى تلك الصفحة، بكل لغة.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| أقصى عدد يتم السماح للمستخدم بإدخال كلمة المرور خطأ | Max Failed Login Attempts | `value.info.maxFailedLoginAttempts` | [تسجيل الدخول والجلسات](#tsjyl-ldkhwl-wljlst) |
| تذكر آخر محاولة خاطئة لإدخال كلمة المرور بالدقائق قبل السماح بالدخول مرة أخرى | Minutes To Remember Failed Logins | `value.info.minutesToRememberFailedLogins` | [تسجيل الدخول والجلسات](#tsjyl-ldkhwl-wljlst) |
| أقصى عدد مرات تسجيل الدخول المتزامن للمستخدم الواحد | Maximum Concurrent Sessions Per User | `value.info.maxLoginSessions` | [تسجيل الدخول والجلسات](#tsjyl-ldkhwl-wljlst) |
| تسجيل الخروج آليا عند تعدي أقصى عدد مرات تسجيل دخول (من الجلسات الأقدم) | Auto Logout From Older Sessions When The User Reaches Maximum Concurrent Sessions | `value.info.autoLogoutWithMaxSessions` | [تسجيل الدخول والجلسات](#tsjyl-ldkhwl-wljlst) |
| تسجيل الخروج آليا عند عدم وجود نشاط لمدة (دقيقة) | Automatically Logout If No Activity for (Minutes) | `value.info.autoLogoutTime` | [تسجيل الدخول والجلسات](#tsjyl-ldkhwl-wljlst) |
| تسجيل الخروج حتى مع (الاحتفاظ بتسجيل الدخول) | Automatically Logout even with (Stay signed in) | `value.info.autoLogoutRememberMe` | [تسجيل الدخول والجلسات](#tsjyl-ldkhwl-wljlst) |
| أقل طول لحقل كلمة مرور المستخدم | Minimum Password Length | `value.info.minPasswordLength` | [سياسة كلمة المرور](#sys-klm-lmrwr) |
| أقل عدد من الحروف الواجب توافرها | Minimum Alphabetic characters | `value.info.minAlphaChars` | [سياسة كلمة المرور](#sys-klm-lmrwr) |
| أقل عدد من الرموز الواجب توافرها | Minimum Special characters | `value.info.minSpecialChars` | [سياسة كلمة المرور](#sys-klm-lmrwr) |
| أقل عدد من الأرقام الواجب توافرها | Minimum Numeric characters | `value.info.minNumbersChars` | [سياسة كلمة المرور](#sys-klm-lmrwr) |
| تحتوي على حروف صغيرة وكبيرة | Contains Upper and Lower Case | `value.info.upperAndLowerCase` | [سياسة كلمة المرور](#sys-klm-lmrwr) |
| منع استعمال نفس كلمة المرور القديمة عند تغييرها | Prevent Using The Same Old Password When Changing It | `value.info.preventSamePasswordWhenChanging` | [سياسة كلمة المرور](#sys-klm-lmrwr) |
| Send Password By Mail Template | Send Password By Mail Template | `value.info.sendPasswordByMailTemplate` | [سياسة كلمة المرور](#sys-klm-lmrwr) |
| Send Password By SMS Template | Send Password By SMS Template | `value.info.sendPasswordBySMSTemplate` | [سياسة كلمة المرور](#sys-klm-lmrwr) |
| نوع المصادقة الثنائية لتسجيل الدخول | Login Two-Factor Authentication Method | `value.info.login2FAMethod` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| تنبيه OTP للمصادقة الثنائية | Notification For Two-Factor Authentication OTP | `value.info.notificationFor2FAOtp` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| OTP Format | OTP Format | `value.info.otpFormat` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| طول OTP | OTP Length | `value.info.otpLength` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| وقت انتهاء صلاحية OTP | OTP Expiry Time | `value.info.otpExpiryTime` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| مدة الانتظار قبل إعادة إرسال OTP | OTP Resend Delay | `value.info.otpResendDelay` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| رابط بيئة Estidamah | Estidamah Environment Url | `value.info.estidamahEnvironmentUrl` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| مفتاح API الخاص بـ Estidamah | Estidamah Api Key | `value.info.estidamahApiKey` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| مفتاح التشفير الخاص بـ Estidamah | Estidamah Encryption Key | `value.info.estidamahEncryptionKey` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| متجه التهيئة للتشفير (IV) الخاص بـ Estidamah | Estidamah Encryption IV | `value.info.estidamahEncryptionIV` | [المصادقة الثنائية](#lmSdq-lthnyy) |
| Use LDAP For Users Login | Use LDAP For Users Login | `value.info.useLDAPForUsersLogin` | [LDAP](#LDAP) |
| LDAP Server URL (eg. ldap://192.168.1.10:3268 ) | LDAP Server URL (eg. ldap://192.168.1.10:3268) | `value.info.ldapServerURL` | [LDAP](#LDAP) |
| Default LDAP Domain | Default LDAP Domain | `value.info.defaultLDAPDomain` | [LDAP](#LDAP) |
| Allow Disabling Code Field With Security | Allow Disabling Code Field With Security | `value.info.allowDisablingCodeFieldWithSecurity` | [أمان السجلات](#mn-lsjlt) |
| Allow Filling Disabled Fields With Creators | Allow Filling Disabled Fields With Creators | `value.info.allowFillingDisabledFieldsWithCreators` | [أمان السجلات](#mn-lsjlt) |
| رفض الاستيراد الذي يحتوي على حقول ليس للمستخدم صلاحية تعديلها | Reject Imports Containing Fields The User Cannot Change | `value.info.rejectImportOfFieldsUserCannotChange` | [أمان السجلات](#mn-lsjlt) |
| دمج ملفات الصلاحية البديلة في المستخدم الرئيسي | Merge Alternate Security Profiles Into Main User | `value.info.mergeAlternateSecurityProfilesIntoMainUser` | [أمان السجلات](#mn-lsjlt) |
| عرض السجلات الممنوعة من الاستعمال في البحث | Display Prevented Records In Search | `value.info.displayPreventedRecords` | [أمان السجلات](#mn-lsjlt) |
| عدم عرض السجلات الممنوعة من الاستعمال في القوائم | Do Not Display Prevented Records In List View | `value.info.doNotdispPrevRecInListView` | [أمان السجلات](#mn-lsjlt) |
| عرض السجلات التي لها صلاحية تعديل مع المستخدم الحالي بالإضافة إلى السجلات التي لها صلاحية مطالعة معه | Display Records With Update Capability To Users In Addition To Records With View Capability | `value.info.displayRecordsWithUpdateCapabilityToUsers` | [أمان السجلات](#mn-lsjlt) |
| تجاهل صلاحيات السجل مع القوائم في كل الشاشات | Ignore Record Capabilities In All List Views | `value.info.ignoreRecordCapabilitiesInAllListViews` | [أمان السجلات](#mn-lsjlt) |
| منع حذف المستخدم المرتبط ب Entity System Entries | Prevent Delete User Related To Entity System Entries | `value.info.preventDeleteUserRelatedToEntitySystemEntries` | [أمان السجلات](#mn-lsjlt) |
| تجاهل صلاحيات السجل مع شاشات محددة | Ignore Record Capabilities In Certain Entities | `value.info.ignoreRecordCapabilitiesIn` | [أمان السجلات](#mn-lsjlt) |
| النوع | Entity Type | `value.info.ignoreRecordCapabilitiesIn.entityType` | [أمان السجلات](#mn-lsjlt) |
| قائمة الأنواع | Entity Type List | `value.info.ignoreRecordCapabilitiesIn.entityTypeList` | [أمان السجلات](#mn-lsjlt) |
| توجيه إضافة مستخدم | User Add Request Term | `value.info.userAddRequestTerm` | [طلبات إضافة المستخدمين](#Tlbt-Df-lmstkhdmyn) |
| دفتر إضافة مستخدم | User Add Request Book | `value.info.userAddRequestBook` | [طلبات إضافة المستخدمين](#Tlbt-Df-lmstkhdmyn) |
| عدم عرض نوع المستخدم موظف | Don't Display Employee Type | `value.info.dontDisplayEmployeeType` | [طلبات إضافة المستخدمين](#Tlbt-Df-lmstkhdmyn) |
| عدم عرض نوع المستخدم مقاول | Don't Display Contractor Type | `value.info.dontDisplayContractorType` | [طلبات إضافة المستخدمين](#Tlbt-Df-lmstkhdmyn) |
| عدم عرض نوع المستخدم عميل | Don't Display Customer Type | `value.info.dontDisplayCustomerType` | [طلبات إضافة المستخدمين](#Tlbt-Df-lmstkhdmyn) |
| عدم عرض نوع المستخدم مورد | Don't Display Supplier Type | `value.info.dontDisplaySupplierType` | [طلبات إضافة المستخدمين](#Tlbt-Df-lmstkhdmyn) |
| رسالة الترحيب العربية في طلب إضافة مستخدم | User Add Request Welcome Message In Arabic | `value.info.userAddRequestWelcomeMessageAr` | [طلبات إضافة المستخدمين](#Tlbt-Df-lmstkhdmyn) |
| رسالة الترحيب الإنجليزية في طلب إضافة مستخدم | User Add Request Welcome Message In English | `value.info.userAddRequestWelcomeMessageEn` | [طلبات إضافة المستخدمين](#Tlbt-Df-lmstkhdmyn) |
