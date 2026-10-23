---
entities: [OAuthFile]
menu: إدارة النظام ← أخري ← OAuth File
---

# ملفات OAuth (تسجيل الدخول بحساب Google لـ Gmail وGoogle Drive)

لم تعد Google تسمح لأي برنامج بالدخول إلى Gmail أو Google Drive باسم مستخدم وكلمة مرور عاديين.
بدلًا من ذلك يسجّل صاحب الحساب دخوله إلى Google مرة واحدة من المتصفح، ويمنح البرنامج إذنًا تستطيع
Google تجديده أو سحبه لاحقًا. و**OAuth File** هو السجل الذي يحفظ هذا الإذن في نما لحساب Google واحد.
لا يتصل أي جزء آخر من النظام بـ Google مباشرة: حساب إرسال البريد أو فحص النسخ الاحتياطية يشير فقط إلى
ملف OAuth، والملف هو الذي يوفّر الصلاحية.

تحتاج إليه في حالتين:

- حين يُرسَل البريد الصادر عبر حساب **Gmail**، فيشير حساب الإرسال في الإعدادات العامة إلى الملف بدل
  أن يحمل كلمة مرور؛
- أو حين تتحقق مهمة مجدولة من وصول **النسخ الاحتياطية لقاعدة البيانات إلى Google Drive** كل ليلة، أو
  تفرّغ سلة المحذوفات في حساب Drive حتى لا تملؤه النسخ القديمة.

## الشاشة

تظهر أسماء معظم حقول هذه الشاشة بالإنجليزية حتى في الواجهة العربية، لأن النظام لا يحمل لها ترجمة.

| الحقل | معناه |
|---|---|
| **الكود / الاسم** | مرجعك الخاص. تعثر مسارات الكيان وإعدادات البريد على الملف بكوده. |
| **Used For Checking Backups On Google Drive** | يطلب من Google صلاحية قراءة قائمة الملفات على Drive فقط. يحتاجها فحص النسخ الاحتياطية. |
| **Used For Emptying Trash of Google Drive Account** | يطلب صلاحية كاملة على Drive، وهي ما يتطلبه تفريغ سلة المحذوفات. |
| **Used For Sending Emails From Gmail** | يطلب إذنًا بإرسال البريد من الحساب. يحتاجه حساب إرسال البريد. |
| **Authorized** | يضع النظام عليه علامة بعد أن تمنح Google الصلاحية، ولا تضعها أنت. |
| **إيميل المستخدم** | يملؤه النظام بحساب Google الذي منح الصلاحية. |
| **Credentials JSON** | اختياري. اتركه فارغًا لاستخدام تطبيق Google الخاص بنما. لا تلصق فيه بيانات عميل OAuth خاص بك على Google Cloud إلا إذا اشترطت مؤسستك ذلك (انظر أدناه). |

يجب أن تختار واحدًا على الأقل من خيارات **Used For** الثلاثة، وإلا رُفض حفظ السجل. اختر ما ستستخدمه فقط،
فكل خيار يوسّع ما تطلب Google من صاحب الحساب الموافقة عليه.

وتحمل الشاشة أيضًا زرين: **Start OAuth Flow** و**Revoke Authentication**.

![ملف OAuth مُعد لإرسال البريد من Gmail، مع زري بدء التفويض وإلغائه](images/administration/oauth-file-gmail-ar.png)

## تفعيل الملف خطوة بخطوة

يريد المركز الرئيسي إرسال الفواتير بالبريد من `invoices@nilegroup.com`، وهو صندوق بريد على Google Workspace.

1. أنشئ ملف OAuth بالكود `GMAIL-INV`، وضع علامة على **Used For Sending Emails From Gmail**، واحفظ.
   يكون **Authorized** فارغًا.
2. اضغط **Start OAuth Flow**. يُفتح تبويب جديد في المتصفح وينقلك إلى صفحة تسجيل الدخول في Google.
3. سجّل الدخول **بحساب `invoices@nilegroup.com`** (لا بحسابك الشخصي)، ووافق على الصلاحيات التي تعرضها Google.
4. تعيد Google التحكم إلى صفحة قصيرة على موقع نما تمرّر الإذن إلى خادم نما لديك وتعرض
   *Response sent correctly*، ثم يُغلق التبويب نفسه بعد ثوانٍ.
5. أعد فتح ملف OAuth أو حدّثه. ستجد علامة على **Authorized**، وفي **إيميل المستخدم** القيمة
   `invoices@nilegroup.com`.
6. في الإعدادات العامة، في جدول **إعدادات البريد المرسل**، أضف صف الإرسال أو عدّله: ضع
   `invoices@nilegroup.com` في **اسم المستخدم**، وخادم Gmail SMTP ومنفذه، واختر `GMAIL-INV` في عمود
   **OAuth File**. انظر [إعدادات التنبيهات](/ar/platform/global-config/global-config-notifications).

::: warning اسم المستخدم يجب أن يكون الحساب الذي سجّل الدخول
ترفض الإعدادات العامة الحفظ إذا لم يكن **اسم المستخدم** في الصف مطابقًا تمامًا لـ **إيميل المستخدم** في
الملف، أو إذا لم يكن الملف مفعّلًا، أو إذا لم يكن عليه علامة **Used For Sending Emails From Gmail**. السبب
المعتاد هو الدخول إلى Google بحساب خاطئ في الخطوة 3. اضغط **Start OAuth Flow** مرة أخرى وادخل بالحساب الصحيح.
:::

يجب أن يصل المتصفح الذي تضغط فيه الزر إلى Google وإلى خادم نما معًا، لأن آخر خطوة في تسجيل الدخول هي
اتصال متصفحك أنت بخادمك أنت.

## متى تُفقد الصلاحية

تسقط الصلاحية وتُزال العلامة عن **Authorized** في هذه الحالات:

- عند ضغط **Revoke Authentication**، فينسى نما الإذن المحفوظ فورًا.
- عند تغيير أي من خيارات **Used For** الثلاثة أو **Credentials JSON** ثم الحفظ؛ فالصلاحيات المطلوبة
  تغيّرت ولم يعد الإذن القديم مناسبًا.
- عند حذف الملف.
- عند رفض Google تجديد الإذن، مثلًا لأن صاحب الحساب أزال صلاحية نما من حسابه في Google أو غيّر كلمة
  المرور. عندئذ تفشل المهمة أو الرسالة التي احتاجت الملف برسالة تطلب منك فتح الملف وبدء التفعيل من جديد.

والحل في كل الحالات واحد: اضغط **Start OAuth Flow** وسجّل الدخول مجددًا. ولا ضرر من ضغطه على ملف مفعّل
بالفعل؛ فهو يُسقط الإذن القديم ويطلب إذنًا جديدًا.

::: tip نقل النظام إلى خادم آخر
الإذن نفسه محفوظ على خادم التطبيق، لا في قاعدة البيانات. بعد نقل نما إلى خادم جديد، أو استعادة قاعدة
البيانات في مكان آخر، فعّل كل ملف OAuth من جديد قبل الاعتماد عليه.
:::

## استخدام تطبيق Google خاص بك

تعرض صفحة الدخول افتراضيًا أن **Nama ERP** هو من يطلب الصلاحية. بعض سياسات Google Workspace لا تسمح إلا
بالتطبيقات التي سجّلتها المؤسسة بنفسها. في هذه الحالة أنشئ عميل OAuth من نوع *Web application* في مشروعك
على Google Cloud. أضف `https://www.namasoft.com/googleauth.html` إلى عناوين إعادة التوجيه المسموح بها
(authorised redirect URIs)، لأن Google تعود إليه قبل أن يتلقى خادمك الإذن. ثم الصق ملف JSON الذي نزّلته
للعميل في **Credentials JSON**، واضغط **Start OAuth Flow**.

## أين تُستخدم ملفات OAuth

| يستخدمها | الخيار المطلوب |
|---|---|
| صف Gmail في الإعدادات العامة ← **إعدادات البريد المرسل** | Used For Sending Emails From Gmail |
| [فحص النسخة الاحتياطية اليومية على Google Drive](/entity-flows/core/EACheckDailyBackupOnGoogleDrive) (مهمة مجدولة تفحص كل مجلد نسخ احتياطية بحثًا عن نسخة اليوم أو الأمس وترسل تنبيهًا) | Used For Checking Backups On Google Drive، ومعه Used For Emptying Trash إذا كانت المهمة مضبوطة على تفريغ السلة في النهاية |
| [تفريغ سلة Google Drive](/entity-flows/core/EAClearGoogleDriveTrash) | Used For Emptying Trash of Google Drive Account |
| [تحديث صلاحية Google Drive](/entity-flows/core/EARefreshGoogleDriveOrMailToken) (يختبر الاتصال بـ Drive ويجدّد الصلاحية) | Used For Emptying Trash of Google Drive Account |
| [تجهيز قائمة مجلدات النسخ الاحتياطية](/entity-flows/core/EANamaCloudBackupPrepare) (يسرد مجلدات النسخ لفحص النسخ الاحتياطية) | Used For Checking Backups On Google Drive |

تأخذ مسارات الكيان **كود** الملف (أو معرّفه) ضمن المدخلات، وترفض حفظ المهمة إذا لم تجد الملف، أو لم يكن
مفعّلًا، أو كان ينقصه الخيار المطلوب.

## رسائل قد تظهر لك

لا يوجد لأي من هذه الرسائل نص عربي، فتظهر بالإنجليزية في الشاشات العربية أيضًا.

| الرسالة | السبب | ما العمل |
|---|---|---|
| *You must at least check one option {0}, {1}, or {2}* | لم تُختر أي من خيارات **Used For** الثلاثة. | اختر الخيار الذي تحتاجه. |
| *The OAuthFile {0} is not authorized, please open the file and click on Start OAuth* | حفظ الإعدادات العامة وفيها صف بريد ملف OAuth الخاص به غير مفعّل. | افتح الملف واضغط **Start OAuth Flow**. |
| *You must select the option {0} in the OAuthFile {1}* | ملف OAuth في صف البريد ليس عليه علامة **Used For Sending Emails From Gmail**. | ضع العلامة واحفظ ثم فعّل الملف من جديد (تغيير الخيار يُسقط الإذن). |
| *The OAuthFile {0} user email is {1}, and the provided user is {2}. They must match* | **اسم المستخدم** في صف البريد ليس حساب Google الذي سجّل الدخول. | صحّح اسم المستخدم، أو سجّل الدخول من جديد بالحساب الصحيح. |
| *Could not find an OAuthFile with the code {0}* | مدخل في مسار الكيان يذكر كود ملف غير موجود. | صحّح الكود في مدخلات المهمة. |
| *The OAuthFile {0} is not authenticated correctly, please open the file and click on Start OAuth Flow* | ملف مسار الكيان غير مفعّل. | فعّل الملف. |
| *You must select Used For Checking Backups On Google Drive in the OAuth FIle {0}* | فحص النسخ الاحتياطية يستخدم ملفًا ليس عليه خيار قراءة Drive. | ضع العلامة واحفظ ثم فعّل الملف من جديد. |
| *You must select Used For Emptying Trash of Google Drive Account in the OAuth FIle {0}* | المهمة تفرّغ السلة، أو تجدّد الصلاحية، بملف ينقصه هذا الخيار. | ضع العلامة واحفظ ثم فعّل الملف من جديد. |
| *OAuth refresh token has expired for file {0}. Please open the OAuthFile and click 'Start OAuth Flow' to re-authenticate.* | رفضت Google تجديد الإذن. | فعّل الملف من جديد. |
| *OAuth authentication failed for file {0}. The refresh token has expired or been revoked. Please open the OAuthFile and click 'Start OAuth Flow' to re-authenticate.* | السبب نفسه، لكنه يظهر أثناء تسجيل الدخول ذاته. | فعّل الملف من جديد. |
