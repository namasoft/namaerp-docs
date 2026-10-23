---
entities: [RewardPointsConfig]
menu: الأساسيات ← المستندات ← إعدادات نقاط المكافأة
---

# نقاط مكافآت العملاء (Customer Reward Points / Loyalty Points)

تتناول هذه الصفحة الرسائل التي يرسلها نما للعملاء عن نقاط مكافآتهم والربط مع STC قطاف. أما كيف تُكتسب النقاط ومتى تنتهي وكيف تُصرف، وشاشات الرصيد الافتتاحي والمنح الفتري والمنع، فموجودة في [إعداد نقاط المكافأة في نما](/ar/modules/invoicing/reward-points-setup).

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

#### الخطوة الثالثة: الإعداد في نظام Nama ERP

1. افتح شاشة **Reward Points Config**
2. ارفع ملف الشهادة (المستلم من STC) في حقل **Certificate** - يُسمى الملف عادةً `qitaf-{YourPartnerID}-{SomeSerialNumber}.pem.txt`
3. ارفع ملف مفتاحك الخاص (مثال: `qitaf-2244.key`) في حقل **Private Key**
4. أكمل بقية الإعدادات:
   - API URL
   - Client ID (Username)
   - Client Password
   - Merchant Token (API Token)
   - تعيينات Branch و Terminal ID

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
