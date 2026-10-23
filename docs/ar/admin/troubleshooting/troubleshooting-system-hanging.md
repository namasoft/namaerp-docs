# استكشاف أخطاء توقف النظام أو عدم استجابته (Troubleshooting System Hanging or Unresponsiveness)

## نظرة عامة (Overview)

عندما يصبح نظام نما غير مستجيب أو بطيئًا أو يبدو أنه توقف، فإن أكثر أداة تشخيصية فعالية هي **thread dump** (تُعرف أيضًا بـ stack dump). يلتقط thread dump لقطة فورية لجميع الخيوط (threads) في عملية Tomcat في لحظة محددة، مما يُظهر بالضبط ما يفعله كل خيط. هذه المعلومات لا تُقدَّر بثمن لفريق التطوير لتحديد السبب الجذري لمشاكل الأداء.

## متى تلتقط Thread Dump

التقط thread dump عند مواجهة أي من هذه الأعراض:

- 🔴 **تجمد كامل للنظام** - يتوقف التطبيق عن الاستجابة تمامًا
- 🟡 **بطء شديد** - تستغرق الصفحات عدة دقائق للتحميل أو تنتهي مهلة العمليات
- 🔵 **ارتفاع استخدام المعالج (CPU)** - عملية Tomcat تستهلك 90-100% من المعالج باستمرار
- 🟣 **تعارضات قاعدة البيانات (Database Deadlocks)** - يواجه المستخدمون أخطاء انتهاء المهلة أو ينتظرون إلى أجل غير مسمى
- 🟠 **طلبات معلقة** - عمليات معينة لا تكتمل أبدًا (مثل إنشاء التقارير، استيراد البيانات)

::: tip أفضل ممارسة
التقط **2-3 thread dumps** بفترات 10-30 ثانية بينها. يساعد ذلك في تحديد الأنماط والتمييز بين الارتفاعات المؤقتة والمشكلات المستمرة.
:::

## ما هو Thread Dump؟

thread dump هو ملف نصي يحتوي على معلومات تفصيلية حول جميع الخيوط (threads) الجارية في الجهاز الافتراضي لجافا (JVM)، بما في ذلك:

- أسماء الخيوط ومعرفاتها (IDs)
- حالات الخيوط (RUNNABLE، WAITING، BLOCKED، إلخ)
- تتبع المكدس (stack traces) يُظهر السطر الدقيق من الكود الذي ينفذه كل خيط
- معلومات القفل (lock) والتعارضات المحتملة
- أنماط استخدام الموارد

## المتطلبات المسبقة (Prerequisites)

- **وصول المسؤول (Administrator)** إلى خادم Windows (ستطلب الأداة الرفع التلقائي للصلاحيات)
- **اتصال شبكي** لتنزيل الأداة (أو حفظها محليًا)

## تعليمات خطوة بخطوة

### الخطوة 1: تنزيل وتشغيل الأداة

افتح PowerShell (عادي أو كمسؤول) وانسخ الأوامر التالية:

```powershell
# Download the thread dump tool
Invoke-WebRequest https://namasoft.com/bin/nama-jstack.exe -OutFile "$env:USERPROFILE\nama-jstack.exe"

# Run the tool (will request admin privileges if needed)
& "$env:USERPROFILE\nama-jstack.exe"
```

::: tip الرفع التلقائي للصلاحيات
إذا لم تكن تعمل كمسؤول، ستطلب الأداة تلقائيًا رفع الصلاحيات وإعادة التشغيل بامتيازات المسؤول.
:::

::: info تنزيل بديل
يمكنك أيضًا تنزيل الأداة مباشرة من [namasoft.com/bin](https://namasoft.com/bin) — استخدم مربع البحث وابحث عن "jstack".
:::

### الخطوة 2: اختيار عملية Tomcat

ستكتشف الأداة عمليات Tomcat الجارية تلقائيًا:

#### سيناريو عملية واحدة
إذا كان هناك مثيل واحد فقط من Tomcat يعمل، ستختاره الأداة تلقائيًا:
```
Auto-detected: Tomcat101010 (PID: 29500)
```

#### سيناريو عمليات متعددة
إذا كانت هناك مثيلات متعددة من Tomcat تعمل، ستظهر قائمة:
```
Found 3 Tomcat processes:

[1] Tomcat109999 (PID: 2972)
[2] Tomcat101010 (PID: 29500)
[3] Tomcat101111 (PID: 20984)

Select process (1-3):
```

أدخل الرقم المقابل للـ **مثيل المعلق أو المشكل**.

::: tip كيفية تحديد المثيل الصحيح
- تحقق من **رقم المنفذ (port)** في اسم خدمة Tomcat (مثال: Tomcat10**1010** = المنفذ 1010)
- قارنه بعنوان URL الذي يصل إليه المستخدمون (مثال: `http://server:1010/namaerp`)
- إذا لم تكن متأكدًا، التقط dumps لجميع المثيلات
:::

### الخطوة 3: انتظار الاكتمال

ستقوم الأداة بـ:
1. إيجاد تثبيت JDK تلقائيًا
2. تحديد معرف العملية (PID)
3. تنفيذ أمر jstack
4. حفظ المخرجات في ملف بختم زمني في `%USERPROFILE%\nama-dumps\`
5. فتح الملف تلقائيًا في محرر النصوص الافتراضي

```
Process: Tomcat101010 (PID: 29500)
Running jstack...

Thread dump saved to: C:\Users\YourName\nama-dumps\Tomcat101010-20251102-143025.txt
File size: 2847623 bytes
Opening file...
```

::: info أين تُحفظ الـ Dumps؟
يتم حفظ جميع thread dumps تلقائيًا في مجلد `nama-dumps` في دليل المستخدم الخاص بك. يمكنك إيجادها بسهولة في `%USERPROFILE%\nama-dumps\`
:::

### الخطوة 4: التقاط dumps متعددة (موصى به)

للحصول على تحليل أفضل، قم بتشغيل الأداة 2-3 مرات بفترات 10-30 ثانية بين كل تشغيل. هذا ينشئ ملفات متعددة بختم زمني في مجلد `nama-dumps` الخاص بك توضح كيفية تطور حالات الخيوط عبر الزمن.

## Heap Dump (تفريغ الذاكرة)

::: danger فقط عند طلب فريق التطوير
يلتقط heap dump محتويات الذاكرة الكاملة لعملية Tomcat. **قم بتشغيل هذا فقط عندما يطلب فريق التطوير منك ذلك تحديدًا.** على عكس thread dumps، فإن heap dump:
- **يستهلك موارد معالج كبيرة** أثناء كتابة الـ dump
- **يستخدم مساحة قرص كبيرة** (يمكن أن يصل حجم الملف إلى عدة جيجابايت)
- **يجمد التطبيق مؤقتًا** أثناء عملية الـ dump

تشغيل هذا بدون تنسيق يمكن أن يُفاقم وضع النظام المتعثر.
:::

إذا طلب منك فريق التطوير التقاط heap dump، قم بتنزيل وتشغيل أداة heap dump:

```powershell
# Download the heap dump tool
Invoke-WebRequest https://namasoft.com/bin/nama-heap-dump.exe -OutFile "$env:USERPROFILE\nama-heap-dump.exe"

# Run the tool (will request admin privileges if needed)
& "$env:USERPROFILE\nama-heap-dump.exe"
```

يمكنك أيضًا تنزيله مباشرة من [namasoft.com/bin](https://namasoft.com/bin) بالبحث عن "heap".

عملية اختيار العملية تعمل بنفس طريقة أداة thread dump. سيُحفظ ملف المخرجات كملف `.hprof.gz` مضغوط في `%USERPROFILE%\nama-dumps\`.

## فهم المخرجات

سيحتوي ملف thread dump المُنشأ على أقسام مثل:

```text
"http-nio-8080-exec-42" #123 daemon prio=5 os_prio=0 tid=0x00007f8c4c123456 nid=0x4567 waiting on condition
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
        at com.namasoft.erp.service.InventoryService.processOrder(InventoryService.java:456)
```

::: details ماذا يعني هذا
- **اسم الخيط (Thread Name)**: `http-nio-8080-exec-42` (معالج طلبات HTTP)
- **حالة الخيط (Thread State)**: `WAITING` (الخيط خامل، ينتظر موردًا)
- **تتبع المكدس (Stack Trace)**: يُظهر مسار الكود الدقيق - في هذه الحالة، الانتظار في `InventoryService.java` في السطر 456
:::

## إرسال النتائج إلى فريق التطوير

### ما الذي ترسله

1. **جميع ملفات الـ dump المُنشأة** (مثال: `Tomcat101010-20251102-143025.txt`)
2. **الطابع الزمني** لوقت حدوث المشكلة
3. **وصف المشكلة**:
   - ما العملية التي كانت تُنفَّذ؟
   - كم عدد المستخدمين المتأثرين؟
   - كم من الوقت كان النظام غير مستجيب؟
   - أي رسائل خطأ ظهرت للمستخدمين؟

### نموذج البريد الإلكتروني (Email Template)

```
Subject: Thread Dump - System Hanging on [Server Name]

Hi Development Team,

The ERP system experienced [describe issue: hanging/slowness/high CPU]
on [date] at [time].

Issue Details:
- Server: [server name/IP]
- Tomcat Instance: [service name and port]
- Duration: [how long the issue lasted]
- Affected Operations: [what users were trying to do]
- Number of Users Affected: [approximate number]

I've captured thread dumps as requested. Files attached:
- Tomcat101010-20251102-143025.txt (2.8 MB)
- Tomcat101010-20251102-143035.txt (2.7 MB)
- Tomcat101010-20251102-143045.txt (2.9 MB)

The system [returned to normal/required restart] after [action taken].

Please let me know if you need additional information.

Best regards,
[Your name]
```

### طرق التسليم المفضلة

1. **البريد الإلكتروني** - للملفات التي تقل عن 10 MB
2. **محرك مشترك (Shared Drive)** - للملفات الكبيرة أو الـ dumps المتعددة
3. رسائل WhatsApp

## استكشاف الأخطاء

### JDK غير موجود

ستطلب منك الأداة مسار JDK إذا لم تتمكن من إيجاده تلقائيًا. أدخل المسار الكامل:
```
C:\Program Files\Java\jdk-21
```

أو ابحث عن موقع JDK الخاص بك:
```powershell
Get-ChildItem "C:\Program Files\Java" -Directory
```

### العملية غير موجودة

إذا لم يتم اكتشاف أي عملية Tomcat، ستعرض الأداة قائمة بأي عمليات Java/Tomcat المتاحة التي يمكنها إيجادها. تأكد من أن خدمة Tomcat تعمل:
```powershell
Get-Service | Where-Object {$_.Name -like "*Tomcat*"}
```

### رفض الإذن (Permission Denied)

تطلب الأداة تلقائيًا امتيازات المسؤول. إذا لا تزال ترى هذا الخطأ:
1. انقر **نعم** عندما تظهر نافذة UAC
2. تحقق من أن حساب المستخدم الخاص بك لديه حقوق مسؤول على الخادم
3. تحقق مما إذا كان برنامج مكافحة الفيروسات يحجب الأداة

## الاستخدام المتقدم

### تحديد اسم العملية مباشرة

إذا كنت تعرف اسم العملية الدقيق، مرره كمعامل (argument):

```powershell
& "$env:USERPROFILE\nama-jstack.exe" Tomcat101010
```

::: tip هل تحتاج مساعدة؟
إذا واجهت أي مشاكل مع الأداة أو تحتاج مساعدة في تفسير النتائج، تواصل مع فريق تطوير نما على dev@namasoft.com
:::
