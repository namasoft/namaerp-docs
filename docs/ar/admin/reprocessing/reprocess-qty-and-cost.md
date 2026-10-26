# إعادة معالجة الكميات والتكاليف وأعمار المخزون (Reprocessing Quantity, Cost, and Stock Ages)

سكربتات وروابط أدوات تعيد بناء حركات الكميات ومتوسط التكلفة وأعمار المخزون من المستندات، إما لقاعدة البيانات كلها مع إيقاف Tomcat أو جزئياً بدءاً من تاريخ.

::: danger اقرأ هذا قبل أن تشغّل شيئاً في هذه الصفحة
السكربتات التالية **تحذف تاريخ حركات قاعدة البيانات كله ثم تعيد بناءه**. فالكتلة الأولى وحدها تُسقط
أرصدة الحسابات وسطور قيود الأستاذ وأرصدة المحددات، وتفرّغ قيود الأستاذ وسطور المديونية ومطابقاتها،
وتعيد كل طلبات الأستاذ والمخزون إلى بدايتها ليبنيها الخادم من المستندات من جديد. ولا تراجع في ذلك،
والسكربت الذي يعمل على قاعدة البيانات الخطأ لا يمكن استرجاعه بالكلام.

وقبل ذلك كله:

1. **خذ نسخة احتياطية كاملة وتأكد أنك تستطيع استرجاعها.** لا نسخة الأمس المجدولة، بل نسخة تؤخذ الآن.
2. **تحقق من قاعدة البيانات التي تتصل بها النافذة.** فكل خطأ وقع فيه أحد هنا كان هذا الخطأ.
3. **أوقف خادم التطبيق** حيث يقول القسم ذلك. فالخادم العامل يظل يكتب في الجداول التي يفرّغها السكربت.
4. **تأكد أنك تعرف لماذا تفعل ذلك.** فهذه أدوات إنقاذ لقاعدة بيانات أرصدتها خاطئة بالفعل — لا صيانة، ولا روتين، ولا هي أول رد على مستند واحد يبدو غريباً. فالمستند الواحد يُصلَح بإعادة معالجة طلب أعماله من شاشة [طلبات الأعمال](/ar/platform/background-processing/business-requests).

وإعادة معالجة قاعدة بيانات كاملة تستغرق أياما على القواعد الكبيرة، والنظام معطّل طوال ذلك. فاتفق على
الموعد مع العميل قبل أن تبدأ.
:::

<ServerBaseURL/>

## إعادة معالجة جميع حركات الكميات (يجب إيقاف Tomcat أولاً) (Reprocess All Quantity Transactions (Tomcat must be shutdown))
::: details
```sql
update FiscalYear set allowCostProcessingWithClosingEntry = 1 where commitedBefore = 1
go
delete from PartitionedCostReqInfo
go
drop table AccountBalance
go
drop table DimensionsBalance
go
drop table LedgerTransLine
go
delete from LedgerTrans
go
delete from BusinessRequestStatus where requestType = 'Delete'
go
delete from LedgerTransReq where requestType = 'Delete'
go
truncate table DebtLineMatcher
go
delete from DebtLine
go
update LedgerTransReq set transStatus ='Initial',requestType='Create',errorDescription='',errorMessage='',debtAgesProcessed=0,reqProcessed=0,hasDebtAges=0
go

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_t77042ol5jui5eda8vte88lei]') AND parent_object_id = OBJECT_ID(N'[dbo].[ItemSerialTrans]'))
ALTER TABLE [dbo].[ItemSerialTrans] DROP CONSTRAINT [FK_t77042ol5jui5eda8vte88lei]
GO

drop table ItemSerial
go
drop table ItemSerialTrans
go
drop table ReservationTransLine
go
delete from ReservationTrans
go
drop table QtyTransLine
go
delete from QtyTrans
go
drop table ItemDimensionCost
go
drop table ItemDimensionsQty
go
drop table CostOutTransLine
go
delete from CostOutTrans
go
drop table CostInTransLine
go
delete from CostInTrans
go
delete from CostOverdraftLine
go

delete from LedgerTransReq where  originTransId <> 0xd41d8cd98f003204a9800998ecf8427e
go
delete from BusinessRequestStatus where originTransId <> 0xd41d8cd98f003204a9800998ecf8427e
go

delete from InvTransReq where requestType = 'Delete'
go

update InvTransReq set costTransStatus = 'Initial',requestType='Create', qtyTransStatus = 'Initial', transStatus = 'Initial',regenerateLedgerReq=0,priority=0,errorDescription='',errorMessage=''
go

update BusinessRequestStatus set transStatus = 'Initial',errorDescription='',errorMessage='' where simpleName in ('InvTransReq','LedgerTransReq')
go
drop table LedgerTransSerial
go
truncate table FifoCostMatcher
go
delete from FifoCostTransLine
go
truncate table UnmatchedManualDebtLine
Go
truncate table StockAgesMatcher
go
truncate table StockAgesTask
go
truncate table StockAgesTaskUpdater
go
truncate table StockAgesTransLine
go
delete from StockAgesTrans

```
:::

### إعادة معالجة جزئية للتكلفة المتوسطة (سريعة) (Partial Reprocess of Average Cost (Fast))
تعيد معالجة التكلفة المتوسطة لكل الأصناف بدءاً من التاريخ الذي تدخله (بصيغة `yyyyMMdd`، مثل `20260101`) دون إيقاف السيرفر. وهي للتكلفة المتوسطة فقط: على نظام يعمل بطريقة FIFO ترفض بالرسالة *You are using FIFO costing method, this utility is for average cost*، وإذا كانت إعادة معالجة سريعة أخرى ما زالت تعمل ترفض بالرسالة *Can not start fast reprocessing from file, there is one already running*. الرسالتان بالإنجليزية فقط.

<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.FastReprocessCostFromDate"
:params="[
{ title: 'Start Date (yyyyMMdd)', default: 'yyyyMMdd' }
]"
/>

### إعادة معالجة جزئية لتحويلات المخزون المختلفة التكلفة (سريعة) (Partial Reprocess of Stock Transfers Whose Costs Disagree (Fast))
نسخة أضيق من الأداة نفسها. بدءاً من التاريخ الذي تدخله، تعيد معالجة الأصناف والمحددات التي خرج فيها تحويل مخزني من المخزن المصدر بتكلفة ودخل إلى المخزن المستلم بتكلفة أخرى، بفرق أكبر من الحد الأدنى للفرق، وهو `0.01` ما لم تُدخل قيمة أخرى. وتنطبق القاعدتان السابقتان نفسهما.

<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.FastReprocessInvalidTransfersFromDate"
:params="[
{ title: 'Start Date (yyyyMMdd)', default: 'yyyyMMdd' },
{ title: 'Minimum Cost Difference', default: '0.01' }
]"
/>

## إعادة معالجة أعمار المخزون (Reprocess Stock Ages)

### الطريقة الأولى (Method 1)
استخدم أداة إعادة المعالجة السريعة. تعيد بناء أعمار المخزون لكل صنف سياسة أعمار المخزون فيه «نعم» من طلبات المخزون المعالَجة الخاصة به، مئة طلب في كل مرة، وتكتب كل طلب انتهت منه في ملف متابعة، حتى يكمل التشغيل المتوقف من حيث توقف.

  <UtilityLinkBuilder
  className="com.namasoft.modules.supplychain.domain.utils.plugnplay.StockAgesFastReprocess"
  :params="[
  { title: 'Processed Ages File Path', default: 'E:/rc/stock-ages-done.txt' }
  ]"
  />

فتح الرابط لا يغير شيئاً. تعرض الصفحة ملف المتابعة وعدد الطلبات المسجلة فيه، مع أزرار تطلب التأكيد قبل البدء:

- **Start** — يظهر عندما يكون ملف المتابعة فارغاً أو غير موجود. يفرغ جداول أعمار المخزون ثم يعيد بناءها كلها.
- **Resume** — يظهر عندما يكون في ملف المتابعة طلبات بالفعل، مثلاً بعد إعادة تشغيل السيرفر أثناء التشغيل. يُبقي الجداول كما هي ويعالج فقط الطلبات غير المسجلة في الملف. إعادة معالجة طلب مرة ثانية لا تضر، فالاستكمال بعد التوقف لا يُنتج تكراراً.
- **Start from scratch** — يظهر بجوار Resume. يمسح ملف المتابعة أولاً ثم يعمل مثل Start.

::: warning
  - ملف متابعة متبقٍّ من تشغيل سابق اكتمل يجعل الأداة تعرض **Resume**، ولن يكون أمامها حينها ما تفعله تقريباً. لإعادة بناء كل شيء استخدم **Start from scratch** أو أدخل مسار ملف جديد.
  - تأكد من أنك تستخدم إصداراً بعد 21 أبريل
  - لا توجد أخطاء currentNetCost معروضة في النظام

:::

### الطريقة الثانية (Method 2)
- استخدام الاستعلام التالي (أبطأ من الطريقة الأولى)
::: details
```sql
truncate table StockAgesMatcher
go
truncate table StockAgesTask
go
truncate table StockAgesTaskUpdater
go
truncate table StockAgesTransLine
go
delete from StockAgesTrans
go
update r set transStatus = 'Retry',reprocessStockAges = 1 , priority = 500
from InvTransReq r inner join QtyTransLine l on l.requestId = r.id
inner join InvItem i on i.id = l.item_id
where i.stockAgesPolicy = 'Yes' and r.transStatus  ='Processed'
```
:::

### الطريقة الثالثة (Method 3)
استخدام أداة معالجة محددات معينة (Process Of Certain Dimensions Util)

<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.plugnplay.StockAgesProcessDimensions"
:params="[
{ title: 'CSV List Of StockAgesIdx IDs You Need', default: '0xFFFFFF44444,0xFFFF55566' }
]"
/>
