---
entities: [RewardPointsConfig]
menu: الأساسيات ← المستندات ← إعدادات نقاط المكافأة
---

# نقاط مكافآت العملاء (Customer Reward Points / Loyalty Points)

تتناول هذه الصفحة الرسائل التي يرسلها نما للعملاء عن نقاط مكافآتهم، وإعدادات الاتصال بالمزوّدين الخارجيين (الراجحي وSTC وداتانيوم)، وشهادة STC قطاف. أما كيف تُكتسب النقاط ومتى تنتهي وكيف تُصرف، وشاشات الرصيد الافتتاحي والمنح الفتري والمنع، فموجودة في [إعداد نقاط المكافأة في نما](/ar/modules/invoicing/reward-points-setup).

![سجل إعدادات نقاط المكافأة](images/reward-points-config-ar.png)

## إرسال إشعار للعميل مع كل فاتورة يتضمن النقاط المكتسبة والمستردة والرصيد الإجمالي
* النسخة الإنجليزية
```
Dear {customer.name2},
Thanks for visiting {branch.name2}.
You earned {$earnedPoints} points. Your current balance is {customer.$availableRewardPoints} points (SAR {customer.$availableRewardAmount}).
Thanks for shopping with us!
```
* النسخة العربية
```
عزيزي {customer.name1}،
شكرًا لزيارتك فرع {branch.name1}.
كسبت {$earnedPoints} نقطة جديدة، ورصيدك الآن {customer.$availableRewardPoints} نقطة ({customer.$availableRewardAmount} ريال سعودي).
شكرًا لتسوقك معنا.
```

### خطوات إرسال إشعار OTP لنقاط المكافآت للعملاء:
* أنشئ تعريف إشعار (Notification Definition) لأي كيان (يُفضَّل العميل) وفعّل خيار "Manual".
* في ملف إعداد نقاط المكافآت (Reward Points Configuration)، عيّن حقل "OTP Notification" على تعريف الإشعار الذي أنشأته للتو.

### نماذج رسائل SMS/بريد إلكتروني

- النسخة الإنجليزية
```
To redeeem {rewardInfo.amount} {rewardInfo.currency.altCode} ({rewardInfo.redeemedPoints} points), please use the following OTP: {otpCode} 
```
- النسخة العربية
```
لاسترداد {rewardInfo.amount} ({rewardInfo.redeemedPoints} نقطة) {rewardInfo.currency.code}، يرجى استخدام رمز التحقق (OTP) التالي: {otpCode}.
```

::: tip يُنفَّذ OTP tempo مقابل سجل العميل
- يمكنك الوصول إلى أي معلومات من سجل العميل، مثل name1 وname2 والبريد الإلكتروني وغيرها.
:::

## مزوّدو النقاط الخارجيون: إعدادات الاتصال

حين يحدد **النوع** (`type`) مزوّدًا خارجيًا، يحتفظ المزوّد برصيد العميل ويقتصر دور نما على مخاطبته: يبلغه بما اشتراه العميل، ويطلب رمز تحقق لمرة واحدة، ويصرف النقاط نيابة عن العميل. اختر النوع الذي في اسمه *Test* أو *Pre Production* أثناء تجربة الاتصال، والنوع *Production* عند التشغيل الفعلي. ولا يُحفظ السجل حتى تُملأ الإعدادات التي يحتاجها ذلك المزوّد.

### حقول الصفحة الأولى

| الحقل | معرّف الحقل | ما يفعله |
|---|---|---|
| **رابط** (URL) | `url` | عنوان المزوّد. مطلوب لكل مزوّد خارجي. |
| **اسم المستخدم** / **كلمة المرور** | `userName`، `password` | معرّف العميل وكلمة سره كما أصدرهما المزوّد. مطلوبان للراجحي والعربي الوطني وSTC وبونات وكانجارو؛ ولا يستعملهما داتانيوم. |
| **Mobile Correction Query** | `mobileCorrectionQuery` | يتعرّف المزوّد على العميل برقم جواله. فإن لم تكن الأرقام في نما مخزّنة بالصيغة التي يتوقعها المزوّد، فاكتب هنا استعلامًا: يشغّله نما على القسيمة أو على العميل ويرسل العمود الأول من الصف الأول بدل الجوال المخزّن. اتركه فارغًا إن كانت الأرقام المخزّنة صحيحة أصلًا. |
| **Terminal and Branch ID Config** | `branchesInfo` | انظر أدناه. |

### جدول Terminal and Branch ID Config

يحتاج STC إلى معرفة الفرع ونقطة البيع اللذين جاءت منهما العملية، ويحتاج الراجحي إلى معرفة الفرع. المحل الواحد يكفيه أن يضع **Branch ID** واحدًا (و**Terminal ID** مع STC) في صفحة المزوّد. أما السلسلة فتملأ هذا الجدول بدلًا من ذلك، سطرًا لكل فرع أو نقطة بيع: **الدفتر** (`branchesInfo.documentBook`) و**التوجيه** (`branchesInfo.documentTerm`) والمحددات الخمسة (`branchesInfo.dimensions.legalEntity`، `branchesInfo.dimensions.sector`، `branchesInfo.dimensions.branch`، `branchesInfo.dimensions.department`، `branchesInfo.dimensions.analysisSet`) تصف المستندات التي يغطيها السطر، و**Branch ID** (`branchesInfo.branchId`) و**Terminal Id / Device Serial No** (`branchesInfo.terminalId`) هما ما يرسله نما عنها.

العمود الفارغ يطابق أي قيمة. وتُجرَّب السطور من الأعلى وأول سطر مطابق هو الذي يُطبَّق، فضع السطور الضيقة فوق الواسعة. والمستند الذي لا يطابق أي سطر يُرسَل بقيمتي Branch ID وTerminal ID من صفحة المزوّد.

### صفحة Rajhi Rewards

| الحقل | معرّف الحقل | ما يفعله |
|---|---|---|
| **معرف التاجر** (Merchant Token) | `merchantToken` | رمز التاجر الذي أصدره الراجحي. مطلوب. |
| **Partner Code** | `partnerCode` | كود الشريك لدى الراجحي. |
| **POS Register ID** | `posRegisterId` | معرّف نقطة البيع الذي ربطه الراجحي بك. ويستعمله العربي الوطني أيضًا، ويرفض العملية بدونه. |
| **Branch ID** | `branchID` | كود الموقع الذي يُرسَل حين لا يطابق أي سطر في الجدول السابق. |
| **Certificate** / **Private Key** / **Public Key** | `certificate`، `privateKey`، `publicKey` | زوج المفاتيح الذي يوقّع به نما طلباته إلى الراجحي. |

زر **Generate Cetficate And Keys** ينشئ زوج مفاتيح جديدًا وشهادة ويحفظها في هذه الحقول الثلاثة. ولا يعمل إلا على إعداد من نوع الراجحي. نزّل الجزء العام من حقله وأرسله إلى الراجحي حسب تعليماتهم، ولا ترسل المفتاح الخاص أبدًا. وتعرض قائمة **عمليات اكتساب و تحديث نقاط ولاء** في الصفحة نفسها كل عملية اكتساب وتحديث أُرسلت إلى المزوّد.

### صفحة STC Rewards

| الحقل | معرّف الحقل | ما يفعله |
|---|---|---|
| **API Token** | `apiToken` | رمز التاجر السري الذي أصدره STC، ويُرسَل مع كل طلب. مطلوب. |
| **معرف التاجر** (Merchant Token) | `merchantToken` | يجب ملؤه ليُحفظ السجل، لكن طلبات STC تستعمل **API Token**. |
| **Branch ID** / **Terminal ID** | `branchID`، `terminalID` | يُرسلان حين لا يطابق أي سطر في جدول Terminal and Branch ID Config. |
| **Certificate** / **Private Key** | `certificate`، `privateKey` | الشهادة التي وقّعها STC والمفتاح الخاص الذي صُنعت منه. كلاهما مطلوب، وطريقة توليدهما مشروحة في [إعداد التكامل مع STC Qitaf](#aadd-ltkml-maa-STC-Qitaf). |

### صفحة Datanuum Rewards

| الحقل | معرّف الحقل | ما يفعله |
|---|---|---|
| **API Token** | `apiToken` | الرمز الذي أصدره داتانيوم. مطلوب مع **رابط**. |
| **Branch ID** | `branchID` | كود الفرع الذي يُرسَل إلى داتانيوم. وفي نقاط البيع يُرسَل كود الكاشير بدلًا منه. |
| **عدد أحرف OTP** و**OTP Format** و**إنتهاء رمز التحقق اللحظي بعد (بالدقائق)** و**تنبية كود التحقق** | `otpCharacterCount`، `otpFormat`، `otpExpiresAfterInMinutes`، `otpNotification` | مع داتانيوم ينشئ نما بنفسه رمز التحقق الذي يؤكد الصرف ويرسله عبر هذا التنبيه. وتعمل كما في صفحة Nama Rewards؛ راجع [إعداد نقاط المكافأة في نما](/ar/modules/invoicing/reward-points-setup). |

وتسجّل قائمة **Datanuum Request Log** في الصفحة كل طلب وردّه، وهي أول ما تنظر فيه حين يفشل الصرف.

## إعداد التكامل مع STC Qitaf

### توليد CSR لشهادة STC Qitaf

عند التكامل مع برنامج ولاء STC Qitaf، ستطلب STC ملف CSR (Certificate Signing Request). ستزودك بالمعلومات التالية:
- **Partner ID** - معرّف الشريك الفريد الخاص بك
- **Country** - رمز الدولة (مثال: SA)
- **City** - اسم المدينة (مثال: Riyadh)
- **Organization** - اسم مؤسستك

#### الخطوة الأولى: توليد CSR والمفتاح الخاص

شغّل أمر OpenSSL التالي، مستبدلًا القيم بمعلوماتك:

```bash
openssl req -newkey rsa:2048 -nodes \
  -keyout qitaf-{PartnerID}.key \
  -out qitaf-{PartnerID}.csr \
  -subj "/C=SA/ST={State}/L={City}/O={OrganizationName}/CN=qitaf-{PartnerID}"
```

على سبيل المثال، إذا كان معرّف شريكك هو 2244 وتقع في الرياض:

```bash
openssl req -newkey rsa:2048 -nodes \
  -keyout qitaf-2244.key \
  -out qitaf-2244.csr \
  -subj "/C=SA/ST=Riyadh/L=Riyadh/O=YourCompanyName/CN=qitaf-2244"
```

ينشئ هذا الأمر ملفين:
- `qitaf-2244.key` - مفتاحك الخاص (احتفظ به بأمان ولا تشاركه مطلقًا)
- `qitaf-2244.csr` - ملف CSR الذي ترسله إلى STC

::: warning احتفظ بأمان مفتاحك الخاص (Keep Your Private Key Secure)
لا تشارك ملف `.key` مع أي أحد. أرسل ملف `.csr` فقط إلى STC.
:::

#### الخطوة الثانية: إرسال CSR إلى STC

أرسل ملف `.csr` فقط إلى STC. ستعالجه وترسل لك ملف شهادة موقّعة.

#### الخطوة الثالثة: الإعداد في نظام نما

1. افتح شاشة **Reward Points Config**
2. ارفع ملف الشهادة (المستلم من STC) في حقل **Certificate** (`certificate`) - يُسمى الملف عادةً `qitaf-{YourPartnerID}-{SomeSerialNumber}.pem.txt`
3. ارفع ملف مفتاحك الخاص (مثال: `qitaf-2244.key`) في حقل **Private Key** (`privateKey`)
4. أكمل بقية الإعدادات:
   - **رابط** (`url`) — عنوان واجهة STC
   - **اسم المستخدم** (`userName`) — معرّف العميل
   - **كلمة المرور** (`password`) — كلمة سر العميل
   - **API Token** (`apiToken`) — رمز التاجر؛ واملأ **معرف التاجر** (`merchantToken`) أيضًا وإلا لن يُحفظ السجل
   - **Branch ID** / **Terminal ID** (`branchID`، `terminalID`)، أو [جدول Terminal and Branch ID Config](#jdwl-Terminal-and-Branch-ID-Config) عند تعدد الفروع

::: tip احتفظ بنسخ احتياطية من ملفاتك (Backup Your Files)
احتفظ بنسخ احتياطية آمنة من ملف مفتاحك الخاص وملف الشهادة الصادر من STC.
:::

### تصحيح أخطاء طلبات STC Qitaf

إذا واجهت مشكلات في التكامل مع STC Qitaf، يمكنك تفعيل تسجيل التصحيح (debug logging) لالتقاط تفاصيل الطلب والاستجابة الكاملة.

#### تفعيل تسجيل التصحيح

أضف الخاصية التالية إلى ملف `nama.properties`:

```properties
debug-stc-qitaf=true
```

عند التفعيل، يسجّل النظام كل طلب API كأمر curl مع الاستجابة الكاملة. يُسهّل ذلك مشاركة تفاصيل الطلب الدقيقة مع دعم STC أو إعادة تنفيذ الطلب يدويًا.

#### نموذج لمخرجات السجل

يتضمن أمر curl المسجَّل وسيطَي `--cert` و`--key` مع أسماء الملفات من Reward Points Config، مما يُسهّل إعادة تنفيذ الطلب:

```
========== STC QITAF REQUEST ==========
curl -X POST 'https://api.qitaf.stc.com.sa/redemption/otp' \
  --cert 'qitaf-2244-123456.pem.txt' \
  --key 'qitaf-2244.key' \
  -H 'Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=' \
  -H 'Content-Type: application/json' \
  -H 'X-Secret-Token: your-merchant-token' \
  -H 'GlobalId: 550e8400-e29b-41d4-a716-446655440000' \
  -d '{"Msisdn":501234567,"BranchId":"B001","TerminalId":"T001","RequestDate":"2024-01-15T10:30:00"}'
========================================

========== STC QITAF RESPONSE ==========
Status: 200 OK
Headers:
  Content-Type: application/json
Body:
{"status":"success","message":"OTP sent successfully"}
=========================================
```

#### تشغيل أمر curl

لتشغيل أمر curl المسجَّل:

1. حمّل ملفَي **Certificate** و**Private Key** من Reward Points Config
2. ضعهما في المجلد الذي ستشغّل منه أمر curl
3. انسخ أمر curl من السجلات وشغّله

::: warning معلومات حساسة (Sensitive Information)
تحتوي سجلات التصحيح على معلومات حساسة تشمل ترويسات التفويض ورموز API. عطّل تسجيل التصحيح في بيئة الإنتاج بعد الانتهاء من استكشاف الأخطاء وإصلاحها.
:::
