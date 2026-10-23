---
entities: [EltezamSubmissionDoc, EltezamConfiguration, EltezamCodeTable]
---
# حل مشكلات التزام

مشكلات التزام ثلاثة أنواع، وكود الخطأ في سجل الطلبات يخبرك بنوعها قبل أن تقرأ كلمة من الرسالة:

| كود الخطأ | أين المشكلة | من يصلحها |
|---|---|---|
| `001-000000` | فحص «نما» نفسه رفض الطلب قبل الإرسال، أو تعذر بناء الطلب | صحّح بيانات الموارد البشرية أو جداول الأكواد |
| `500-000001` | تعذر الوصول إلى خادم الوزارة أو لم يُعطِ رداً صالحاً | صحّح عنوان الخادم أو الشبكة |
| أي كود آخر | استلمت الوزارة الطلب ورفضته | اقرأ رسالة الوزارة — الكود والنص يأتيان من الوزارة كما هما |

كل الرسائل التي يُظهرها «نما» نفسه في التزام بالإنجليزية فقط، وتظهر بالإنجليزية على الشاشات العربية
أيضاً؛ لذلك تُقتبس أدناه بالإنجليزية كما هي. أما رفض الوزارة فيظهر باللغة التي تكتب بها الوزارة.

## أين تبحث

1. **جدول التفاصيل** في مستند الإرسال — عمود **آخر خطأ من التزام** يعطي آخر خطأ لكل موظف.
2. **الصفحة الثانية** (قيد التزام النظامي) — صف لكل طلب، بالعملية وكود الخطأ ورسالة الخطأ كاملة. صفِّ
   بحالة الإرسال **فشل** لترى المشكلات وحدها.
3. **ملف الإرسال / ملف الرد** — أعمدة مخفية في القائمة نفسها، تعرض بالضبط ما أُرسل وبالضبط ما عاد. وهذا
   ما تُرسله إلى الوزارة حين يكون رفضها غير واضح.
4. **سجل الخادم (log)** — كل سطر يبدأ بـ`Eltezam: `. ويعرض لكل طلب الطلب كاملاً، ورد HTTP، وتقريراً
   حقلاً بحقل بما أُرسل وما تُرك وما يستحق نظرة ثانية؛ وللطلب المرفوض يطبع الطلب بأرقام السطور، فتُطابق
   رسالة الوزارة التي تذكر رقم سطر بالحقل المقصود.

![جدول التفاصيل في سند الإرسال: حالة الإرسال وعدد العمليات وآخر خطأ من التزام لكل موظف](../images/eltezam-submission-details-grid-ar.png)

## قاعدة التوقف بعد ثلاثة إخفاقات

حين يفشل خادم الوزارة في الرد — لتعذر الوصول إليه، أو انتهاء المهلة، أو خطأ العنوان، أو الرد بلا شيء
أو بصفحة ويب — **ثلاث مرات متتالية**، يوقف «نما» التشغيل بدلاً من تجربة كل الموظفين الباقين على خادم
متوقف. ويبقى الموظفون الذين لم يُوصل إليهم **لم يرسل بعد**، ويُبلغ التشغيل بـ:

*Sending stopped after 3 technical failures in a row, the MCS server ({0}) is not answering*

حيث `{0}` هو العنوان الذي كان «نما» يتصل به. ولا تُحسب ضمن الثلاثة إلا إخفاقات `500-`؛ أما رفض الوزارة،
أو السجل الذي حجزه فحص «نما»، فلا يُحسب. وطلب واحد ناجح يعيد العدّ من الصفر. صحّح العنوان أو الاتصال،
ثم اضغط **إعادة إرسال الموظفين الذين فشل إرسالهم** — فهو يلتقط سطور فشل ولم يرسل بعد معاً.

## مشكلات شائعة

**لم يحدث شيء حين اعتمدت مستند الإرسال.** هذا متوقع: الاعتماد لا يرسل. تأكد أن مسار كيان يشغّل
`EASendEltezamSubmissionDoc` عند تأثيرات الحفظ (PostCommit) لمستند الإرسال، أو أرسله من مهمة مجدولة —
انظر [مستندات الإرسال وطريقة الإرسال](./eltezam-submissions-and-sending).

**كل الطلبات تفشل بـ`500-000001`.** العنوان خطأ أو لا يمكن الوصول إليه من خادم «نما». ومُدخل الخادم في
مسار الكيان أو المهمة المجدولة هو الذي يحدد العنوان، مدمجاً مع **عنوان الخدمة** في الإعدادات كما هو
موضح في صفحة الإرسال. جرّب العنوان من خادم «نما» نفسه؛ فالخدمة على قناة التكامل الحكومية، ولا يمكن
الوصول إليها عادة من الشبكات العادية.

**سجل الطلبات فارغ لكن الجدول يقول نجح.** حُفظ المستند مرة أخرى بعد إرساله، وهذا يمسح سجله. ويظل
الجدول يعرض نتيجة آخر إرسال.

**سطر موظف حالته لم يرسل بعد مع أن شيئاً لم يفشل.** لم يُنشأ شيء لهذا الموظف: مثلاً اختيرت المسيرات
وحدها وليس للموظف سند راتب معتمد في الفترة، أو اختيرت الإجازات وحدها ولا تبدأ أي إجازة في الفترة.

**أُرسلت إجازات أو بيانات تاريخية من سنوات سابقة.** كان في المستند فترة رواتب دون من تاريخ / إلى
تاريخ. وهاتان العمليتان تُضيَّقان بالتاريخين لا بفترة الرواتب — انظر «أي المستندات تُعدّ داخل الفترة» في
[ما الذي يرسله «نما» إلى التزام](./eltezam-data-sources).

**تاريخ «falls outside the configured hijri calendar».** كل تاريخ يُرسل بالهجري. حمّل الجدول الهجري إلى
أقدم تاريخ تذكره الرسالة — غالباً تاريخ ميلاد أو تعيين قديم.

## رسائل قد تظهر لك

### فحص «نما» قبل الإرسال (الكود `001-000000`)

اسم الحقل في بداية كل رسالة هو اسم القيمة لدى الوزارة. وحين تذكر الرسالة أين تُملأ القيمة، فذاك هو
المكان الذي تبحث فيه؛ وجداول [ما الذي يرسله «نما» إلى التزام](./eltezam-data-sources) تعطي المصدر
الكامل لكل قيمة.

| الرسالة | السبب | ما العمل |
|---|---|---|
| *EmployeeID is required* | ليس للموظف كود | أعطِ الموظف كوداً |
| *Either a national ID or an Iqama number is required* | لا رقم الهوية الوطنية ولا رقم الإقامة مملوء في الموظف | املأ أحدهما |
| *{0} must be exactly {1} characters, but {2} is {3}* | طول كود أو رقم غير صحيح — مثلاً رقم هوية ليس 10 أحرف، أو كود موقع ليس 7 أرقام | صحّح القيمة في الموظف أو كود الوزارة في جدول الأكواد |
| *{0} is required, fill it in {1}* | قيمة تشترطها الوزارة خرجت فارغة؛ والنصف الثاني يذكر مصدرها، مثلاً *LocationCode is required, fill it in the LocationCode code table: a grid row keyed on the employee Work Place, …* | أضف صف جدول الأكواد أو القالب أو الكود الافتراضي الذي تذكره الرسالة |
| *{0} is required* | قيمة إجبارية فارغة — مثلاً `BirthDate`، `MinistryHireDate`، `PersonNameAr.FirstName`، `Gender` | املأ الحقل المقابل في الموظف، أو جدول الأكواد للقيم المكوَّدة |
| *{0} is required when the code is {1}* | كود «أخرى» (مثل المسمى الوظيفي `000000000`) يحتاج إلى وصف بجانبه | اربط السجل بكود محدد من أكواد الوزارة بدلاً من كود «أخرى» |
| *TerminationDate is required when a termination reason is sent* | نتج سبب إنهاء خدمة دون تاريخ نهاية خدمة | املأ تاريخ نهاية الخدمة، أو صحّح جدول TerminationReasonCode |
| *EndDate is required for job transaction {0}* | حركتا الوظيفة `JTXN-04` و`JTXN-05` تحتاجان إلى تاريخ نهاية للوظيفة | استخدم كوداً افتراضياً آخر في JobTransactionCode، أو املأ تاريخ نهاية الخدمة |
| *At least one payslip element is required* | كل سطور سند الراتب صفر | راجع سند الراتب |
| *A payslip request accepts at most 100 elements* | في سند راتب واحد أكثر من 100 سطر غير صفري | راجع سند الراتب |
| *A vacation request accepts at most 100 vacations* | أكثر من 100 سند أجازة في الفترة لموظف واحد | ضيّق الفترة |
| *A qualification request accepts at most 100 qualifications* | للموظف أكثر من 100 سطر مؤهلات | احذف سطور المؤهلات المكررة |
| *UniversityName is required when the university code is 998 or 999* | نص جهة التخرج فارغ في مؤهل مربوط بـ«أخرى» | املأ جهة التخرج في سطر المؤهل |
| *Result (N3 of the employee evaluation, the score out of 5, is empty) is required* | الحقل **رقم 3** (N3، الدرجة من 5) في التقييم فارغ أو صفر | املأ **رقم 3** في التقييم |
| *StartDate (Date 1 of the employee evaluation) is required* / *EndDate (Date 2 of the employee evaluation) is required* | التاريخ 1 أو التاريخ 2 في التقييم فارغ | املأ التاريخين في التقييم |
| *{0} ({1}) falls outside the configured hijri calendar, so it cannot be sent. Load the hijri calendar files back far enough to cover it* | الجدول الهجري لا يغطي هذا التاريخ | مدّ الجدول الهجري |
| *Could not build the request: {0}* | تعذر على «نما» تجميع الطلب من البيانات | اقرأ بقية الرسالة؛ وراجع سطر سجل الخادم الخاص بالموظف |

### الوصول إلى الوزارة (الكود `500-000001`)

| الرسالة | السبب | ما العمل |
|---|---|---|
| *No Eltezam server was supplied, pass it as the server parameter of the entity flow action* | لا مُدخل الخادم ولا عنوان الخدمة أعطى عنواناً | املأ مُدخل MCS Server |
| *The Eltezam server ({0}) is not a usable address* | تعذرت قراءة العنوان كعنوان URL | صحّح المُدخل أو عنوان الخدمة |
| *Empty response received from the Eltezam service* | رد الخادم بلا شيء | تأكد أن العنوان يشير إلى خدمة التزام نفسها |
| *The address answered with a web page instead of an Eltezam response, check the MCS server parameter of the entity flow. It starts with: {0}* | وصل العنوان إلى خادم ويب أو صفحة دخول أو وسيط، لا إلى الخدمة | صحّح مسار العنوان |
| *The Eltezam service refused every SOAP action this version knows, so its operations are named differently. Ask MCS for the WSDL and compare it with what was tried:* | وُصل إلى الخدمة لكنها تسمي عملياتها بغير كل الصيغ التي يعرفها «نما» | أرسل الرسالة، التي تذكر كل الصيغ التي جُرّبت، مع ملف WSDL من الوزارة إلى دعم «نما» |
| رسالة تقنية مثل *SocketTimeoutException: Read timed out* أو *UnknownHostException: …* | انتهاء المهلة، أو خادم غير معروف، أو رفض الاتصال | راجع الشبكة؛ وزد **مهلة القراءة بالثانية** في الإعدادات إن كانت الوزارة بطيئة فقط |

### تشغيل الإجراءات وزر إعادة الإرسال

| الرسالة | السبب | ما العمل |
|---|---|---|
| *This action runs on an Eltezam submission document only, move the entity flow from {0} to {1}* | وُضع `EASendEltezamSubmissionDoc` في مسار كيان لشاشة أخرى | انقل المسار إلى إرسال بيانات التزام |
| *The Eltezam submission document {0} is a draft, commit it before sending* | مستند الإرسال ما زال مسودة | اعتمده أولاً |
| *An Eltezam configuration is required, either on the document or as the second parameter* | لا إعدادات في المستند ولا في المُدخل | املأ **إعدادات التزام** |
| *Could not find an Eltezam configuration with code {0}* | كود الإعدادات في المهمة المجدولة خطأ | صحّح الكود |
| *Either an Eltezam configuration code or the Eltezam submission documents to send is required* | لم يُعطَ `EASubmitEltezamData` أياً منهما | املأ المُدخل 1 أو 3 |
| *Could not find an Eltezam submission document with code {0}* | كود في قائمة المستندات خطأ | صحّح القائمة |
| *Could not find an HR period with code {0}* / *Could not find an HR year with code {0}* | مُدخل فترة الرواتب أو سنة الرواتب غير موجود | صحّح الكود |
| *From Date ({0}) must be written as yyyy-MM-dd, for example 2026-01-31* (أو *To Date …*) | مُدخل تاريخ بصيغة أخرى | أعد كتابته بصيغة `yyyy-MM-dd` |
| *Save the Eltezam submission document before retrying it* | ضُغط زر إعادة الإرسال على مستند غير محفوظ | احفظه واعتمده أولاً |
| *An Eltezam configuration is required before sending* | إعادة إرسال مستند بلا إعدادات | املأ **إعدادات التزام** |
| *Fill the Service URL of the Eltezam configuration {0}, resending the failed employees sends to it* | إعادة إرسال لمستند ليس في إعداداته عنوان خدمة؛ فإعادة الإرسال ترسل إليه دائماً | املأ عنوان الخدمة |
| *Every employee of the document {0} was already sent successfully, there is nothing to retry* | كل السطور نجح | لا شيء يُفعل |

### الإعداد

| الرسالة | السبب | ما العمل |
|---|---|---|
| *No employees to send, either select an employee group or add employees manually* | اعتماد مستند إرسال جدوله فارغ | اختر مجموعة موظفين، أو أضف موظفين |
| *No Eltezam operation is selected, either on the document or on the Eltezam configuration* | لا خانة إرسال … مفعّلة في المستند ولا في الإعدادات | فعّل خانة واحدة على الأقل |
| *Another Eltezam code table already covers {0}, use that one instead* | جدول ثانٍ لقائمة الأكواد نفسها | افتح الجدول الموجود بدلاً منه |
| *Could not open {0} to every context, this database has no public value for {1}* | تعذر على `EACreateEltezamCodeTables` جعل أحد محددات الجدول «أي» | أنشئ القيمة العامة الناقصة للمحدد المذكور، ثم شغّل الإجراء مرة أخرى |
