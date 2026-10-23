# أدوات المحاسبة - إعادة معالجة دفتر الأستاذ وأعمار الديون (Accounting Utilities - Ledger and Debt Ages Reprocessing)

جمل SQL تعيد بناء قيود الأستاذ وأعمار الديون من المستندات المعتمدة، واستعلامات تكشف قيود الأستاذ العالقة أو غير المتوازنة وتصلحها، وأرصدة المحددات الناقصة، وقيود الأوراق المالية، ومشكلات حذف الحسابات.

## إعادة معالجة جميع حركات دفتر الأستاذ (Reprocess All Ledger Transactions)
::: details
```sql
truncate table AccountBalance
go
truncate table DimensionsBalance
go
truncate table LedgerTransLine

go
delete from LedgerTrans
go
delete from BusinessRequestStatus where requestType = 'Delete' and simpleName ='LedgerTransReq'
go
delete from LedgerTransReq where requestType = 'Delete'
go
truncate table LedgerTransSerial
go
update LedgerTransReq set transStatus ='Retry',debtAgesProcessed=0,reqProcessed=0,hasDebtAges=0
go
truncate table DebtLineMatcher
go
delete from DebtLine
go
```
:::

## إعادة معالجة أعمار الديون غير المطابقة فقط (Reprocess Unmatched Debt Ages Only)
::: details
```sql
with debtAgeReqs as  (
select distinct lr.id,lr.originCode from  LedgerTransReq lr 
inner join UnmatchedManualDebtLine udl on udl.originId = lr.originId or udl.invoiceId = lr.originId
where requestType <> 'Delete' and transStatus = 'Processed'
)
update lr set transStatus = 'Retry',hasDebtAges=1,debtAgesProcessed=0,reqProcessed=1 from
LedgerTransReq lr inner join debtAgeReqs dar on dar.id = lr.id
```
:::

## إعادة معالجة أعمار الديون (Reprocess Debt Ages)
::: details
```sql
truncate table DebtLineMatcher
go
truncate table AllManualDebtLines
go
delete from DebtLine
go
truncate table UnmatchedManualDebtLine
go
with debtAgeReqs as  (
select distinct lr.id from  LedgerTransReq lr inner join LedgerTrans lt on lt.requestId = lr.id inner join LedgerTransLine ltr on ltr.ledgerTrans_id = lt.id left join Account acc on acc.id = ltr.account_id
where requestType <> 'Delete'  and acc.trackDebtAges = 1 and transStatus = 'Processed'
)
update lr set transStatus = 'Retry',hasDebtAges=1,debtAgesProcessed=0,priority = 500  from
LedgerTransReq lr inner join debtAgeReqs dar on dar.id = lr.id
```
:::

## حذف سجلات AllManualDebtLines الوهمية (Delete Zombie AllManualDebtLines)
::: details 
```sql
delete l from AllManualDebtLines l left join EntitySystemEntry e on e.targetId = l.originId
where e.id is null

```
:::

## إصلاح فشل إعادة معالجة المقاولات (Fix Contracting Reprocessing Failure)
- Could not find class com.namasoft.modules.supplychain.domain.entities.ContractingMaterialIssue$ContractingMaterialIssueCostCallback
::: details
```sql
update InvTransReq set
 costCallbackClass = 'com.namasoft.modules.contracting.domain.entities.ContractingMaterialIssue$ContractingMaterialIssueCostCallback' 
where costCallbackClass = 'com.namasoft.modules.supplychain.domain.entities.ContractingMaterialIssue$ContractingMaterialIssueCostCallback'

```
:::

## السماح بتغيير عملة الحساب بعد حذف جميع حركاته (Allow Changing Currency of An Account After Deleting All its transactions)
::: details
```sql
delete b from AccountBalance b left join Account acc on acc.id = b.account_id where b.creditAmount = 0 and b.debitAmount = 0 and b.localCreditAmount = 0 and b.localDebitAmount = 0
delete b from DimensionsBalance b left join Account acc on acc.id = b.account_id where b.creditAmount = 0 and b.debitAmount = 0 and b.localCreditAmount = 0 and b.localDebitAmount = 0
```
:::
::: tip
ثم افتح الحساب وغيّر **العملة**، وشغّل **تحديث عملة الأرصدة** من قائمة المزيد، ثم نفّذ إعادة الحفظ لمستندات الحساب. والخطوات لحساب واحد موجودة في صفحة [الحسابات](/ar/modules/accounting/accounts#ljrt-fy-hdhh-lshsh).
:::

## البحث عن حركات دفتر الأستاذ الوهمية وحذفها (Find and Remove zombie ledger transactions)
::: details البحث عن الحركات الوهمية (Find Zombie Transactions)

```sql
select distinct r.originType,r.originId from LedgerTransReq r 
inner join LedgerTrans lr on lr.requestId = r.id
inner join LedgerTransLine l on l.ledgerTrans_id = lr.id
left join EntitySystemEntry e on e.targetId = r.originId
where (e.id is null or e.fileStatus = 'Cancelled' or r.requestType = 'Delete') 

```
:::
::: details حذف الحركات الوهمية (Remove Zombie Transactions)
```sql
update r set requestType ='Delete',transStatus = 'Retry',reqProcessed=0,debtAgesProcessed=0 from LedgerTransReq r 
inner join LedgerTrans lr on lr.requestId = r.id
inner join LedgerTransLine l on l.ledgerTrans_id = lr.id
left join EntitySystemEntry e on e.targetId = r.originId
where (e.id is null or e.fileStatus = 'Cancelled' or r.requestType = 'Delete') 

```
:::

## البحث عن الحركات غير المتوازنة (إجمالي المدين <> إجمالي الدائن) (Find Unbalanced Transactions (Total Debit <> Total Credit>)
::: details
```sql
select originType,originId,originCode,valueDate,SUM(creditLocalAmount) cr,SUM(debitLocalAmount) dr from LedgerTransLine group by originType,originId,originCode,valueDate
having ABS(SUM(creditLocalAmount)-SUM(debitLocalAmount))>0.0
order by valueDate

```
:::

## البحث عن حركات لجهات مساندة محذوفة (Find Transactions for deleted subsidiaries)
::: details
```sql
select l.originCode,l.originType,l.lineNumber+1,l.subsidiaryCode
from LedgerTransLine l left join EntitySystemEntry e on e.targetId = l.subsidiaryId where e.id is null and l.subsidiaryId

```
:::

## البحث عن إدخالات LedgerTransLine بدون سجلات DimensionsBalance مطابقة (Find LedgerTransLine Entries Without Matching DimensionsBalance Records)
::: details تحديد سجلات LedgerTransLine المعلقة (بدون DimensionsBalance مطابق) (Identify Orphaned LedgerTransLine Records (No Matching DimensionsBalance))

```sql
select originType,originId from LedgerTransLine d
left join DimensionsBalance b 
on d.account_id = b.account_id
and d.legalEntity_id = b.legalEntity_id
and d.sector_id = b.sector_id
and d.analysisSet_id = b.analysisSet_id
and d.branch_id = b.branch_id
and d.department_id = b.department_id
and coalesce(d.entityDimensionId,0x1) = coalesce(b.entityDimensionId, 0x1)
and coalesce(d.subsidiaryId,0x1) = coalesce(b.subsidiaryId, 0x1)
and d.fiscalPeriod_id = b.fiscalPeriod_id
where b.id is null


```
:::
::: warning
يجب إعادة حفظ نتيجة الاستعلام السابق
:::

::: details البحث عن عدم التطابق بين دفتر الأستاذ وأرصدة المحددات (حسب الفترة والكيان والحساب) (Find Mismatch in Ledger vs DimensionsBalance (By Period, Entity, Account))
```sql
with ledger as (
select sum(l.debitValueAmount) dr,sum(l.creditValueAmount) cr,sum(l.debitValueAmount)  - sum(l.creditValueAmount) dr_cr 
, fp.code fpCode, le.code leCode, fp.id fpId, le.id leId,acc.id accId, acc.code accCode
from LedgerTransLine l
left join Account acc on acc.id = l.account_id
left join FiscalPeriod fp on fp.id = l.fiscalPeriod_id
left join LegalEntity le on le.id = l.legalEntity_id
group by fp.code,le.code,fp.id,le.id,acc.id,acc.code
),
dimbal as (
select sum(l.debitAmount) dr,sum(l.creditAmount) cr,sum(l.debitAmount)  - sum(l.creditAmount) dr_cr 
, fp.code fpCode, le.code leCode, fp.id fpId, le.id leId,acc.id accId, acc.code accCode
from DimensionsBalance l
left join Account acc on acc.id = l.account_id
left join FiscalPeriod fp on fp.id = l.fiscalPeriod_id
left join LegalEntity le on le.id = l.legalEntity_id
group by fp.code,le.code,fp.id,le.id,acc.id,acc.code
)
select coalesce(dimbal.fpCode,ledger.fpCode) fpCode,coalesce(dimbal.leCode,ledger.leCode) leCode
, coalesce(dimbal.accCode,ledger.accCode) accCode, dimbal.dr_cr, ledger.dr_cr
 from dimbal 
full join ledger on ledger.fpId = dimbal.fpId 
	and ledger.accId = dimbal.accId
	and ledger.leId = dimbal.leId
where coalesce(dimbal.dr_cr,0) <> coalesce(ledger.dr_cr,0)
```
:::
- إصلاح أرصدة المحددات غير الصحيحة
::: danger
يرجى الحذر قبل تنفيذ الاستعلام التالي
:::
::: details
```sql
with dimbal as (
select
sum(l.debitValueAmount) debitAmount,sum(l.debitLocalAmount) localDebitAmount,sum(l.creditValueAmount) creditAmount,
sum(l.creditLocalAmount) localCreditAmount,
 l.account_id,coalesce(l.subsidiaryId,0x1) subsidiaryId,coalesce(l.subsidiaryEntityType,'') subsidiaryType,coalesce(l.entityDimensionId,0x1) entityDimensionId,coalesce(l.entityDimensionEntityType,'') entityDimensionType,
l.legalEntity_id,l.sector_id,l.branch_id,l.department_id,l.analysisSet_id,
l.fiscalPeriod_id 
from LedgerTransLine l
group by l.account_id,coalesce(l.subsidiaryId,0x1),coalesce(l.subsidiaryEntityType,''),coalesce(l.entityDimensionId,0x1),coalesce(l.entityDimensionEntityType,''),
l.legalEntity_id,l.sector_id,l.branch_id,l.department_id,l.analysisSet_id,
l.fiscalPeriod_id
)
update b set  b.debitAmount = coalesce(d.debitAmount,0),b.localDebitAmount = coalesce(d.localDebitAmount,0),b.creditAmount = coalesce(d.creditAmount,0),b.localCreditAmount = coalesce(d.localCreditAmount,0)
 from DimensionsBalance b 
left join dimbal d on d.account_id = b.account_id
and d.legalEntity_id = b.legalEntity_id
and d.sector_id = b.sector_id
and d.analysisSet_id = b.analysisSet_id
and d.branch_id = b.branch_id
and d.department_id = b.department_id
and d.entityDimensionId = coalesce(b.entityDimensionId, 0x1)
and d.entityDimensionType = coalesce(b.entityDimensionEntityType, '')
and d.subsidiaryId = coalesce(b.subsidiaryId, 0x1)
and d.subsidiaryType = coalesce(b.subsidiaryEntityType, '')
and d.fiscalPeriod_id = b.fiscalPeriod_id
where coalesce(d.debitAmount,0) <> b.debitAmount
or coalesce(d.creditAmount,0)  <> b.creditAmount
or coalesce(d.localDebitAmount,0) <> b.localDebitAmount
or coalesce(d.localCreditAmount,0) <> b.localCreditAmount 
```
:::

## أدوات الأوراق المالية (Financial Paper Utilities)

### إصلاح إدخالات الأوراق المالية بعد الحذف (Fix Financial Paper Entries after delete)
::: details
```sql
update fp set lastStatusEntry_id = null from FinancialPaperStatusEntry e left join EntitySystemEntry est on est.targetId = e.originDocId left join FinancialPaper fp on fp.id = e.financialPaper_id
where est.id is null or est.fileStatus = 'Cancelled'
delete e  from FinancialPaperStatusEntry e left join EntitySystemEntry se on se.targetId = e.originDocId left join FinancialPaper p on p.id = e.financialPaper_id where se.id is null or se.fileStatus = 'Cancelled'


update fp set lastStatusEntry_id = fpe.id,status = fpe.toStatus from FinancialPaper fp 
left join FinancialPaperStatusEntry fpe on fpe.financialPaper_id = fp.id and fpe.id =
(select top 1 id from FinancialPaperStatusEntry le where le.financialPaper_id = fp.id order by valueDate desc,creationDate desc)
where fp.lastStatusEntry_id is null and fpe.id is not null


```
:::

### إصلاح إلغاء الأوراق المالية (Fix Cancel of Financial Papers)
```sql
update l set cancelValue = fp.valueAmount from FinancialPaperCancelLine l left join FinancialPaper fp on fp.id = l.paper_id where l.cancelValue is null
```

### إصلاح آخر إدخال حالة خاطئ للأوراق المالية (Fix Financial Paper Bad Last Status Entry)
::: details
```sql
select code,fp.creationDate from FinancialPaper fp left join FinancialPaperStatusEntry e on e.id = fp.lastStatusEntry_id
where e.toStatus <> fp.status

update FinancialPaper set lastStatusEntry_id = (select top 1 id from FinancialPaperStatusEntry e where e.financialPaper_id = 0xFFFF00015134C8B294000000FF5C9560 order by valueDate desc,creationDate desc) where id = 0xFFFF00015134C8B294000000FF5C9560

```
:::

### السماح بحذف قيود اليومية الوهمية بعد حذف قيد الإقفال (Allow Deleting Zombie Journal Entries After Deleting Closing Entry)
::: details
```sql
update je set fromDoc_id = null,fromDoc_type = null,fromDoc_code = null,fromDoc_actualCode = null from JournalEntry je left join ClosingEntry ce on ce.id = je.fromDoc_id
where je.fromDoc_type = 'ClosingEntry' and ce.id is null

```
:::

## الحصول على شجرة الحسابات (Get Accounts Tree)
::: details
```sql
with x AS
(
	SELECT acc.id accountId,acc.id parentid
    FROM Account acc
	UNION ALL
    SELECT acc.id accountId,ch1.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	UNION ALL
	SELECT acc.id accountId,ch2.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	inner join AccountsChart ch2 on ch2.id = ch1.parent_id
	UNION ALL
	SELECT acc.id accountId,ch3.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	inner join AccountsChart ch2 on ch2.id = ch1.parent_id
	inner join AccountsChart ch3 on ch3.id = ch2.parent_id
	UNION ALL
	SELECT acc.id accountId,ch4.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	inner join AccountsChart ch2 on ch2.id = ch1.parent_id
	inner join AccountsChart ch3 on ch3.id = ch2.parent_id
	inner join AccountsChart ch4 on ch4.id = ch3.parent_id
	UNION ALL
	SELECT acc.id accountId,ch5.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	inner join AccountsChart ch2 on ch2.id = ch1.parent_id
	inner join AccountsChart ch3 on ch3.id = ch2.parent_id
	inner join AccountsChart ch4 on ch4.id = ch3.parent_id
	inner join AccountsChart ch5 on ch5.id = ch4.parent_id
	UNION ALL
	SELECT acc.id accountId,ch6.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	inner join AccountsChart ch2 on ch2.id = ch1.parent_id
	inner join AccountsChart ch3 on ch3.id = ch2.parent_id
	inner join AccountsChart ch4 on ch4.id = ch3.parent_id
	inner join AccountsChart ch5 on ch5.id = ch4.parent_id
	inner join AccountsChart ch6 on ch6.id = ch5.parent_id
	UNION ALL
	SELECT acc.id accountId,ch7.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	inner join AccountsChart ch2 on ch2.id = ch1.parent_id
	inner join AccountsChart ch3 on ch3.id = ch2.parent_id
	inner join AccountsChart ch4 on ch4.id = ch3.parent_id
	inner join AccountsChart ch5 on ch5.id = ch4.parent_id
	inner join AccountsChart ch6 on ch6.id = ch5.parent_id
	inner join AccountsChart ch7 on ch7.id = ch6.parent_id
	UNION ALL
	SELECT acc.id accountId,ch8.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	inner join AccountsChart ch2 on ch2.id = ch1.parent_id
	inner join AccountsChart ch3 on ch3.id = ch2.parent_id
	inner join AccountsChart ch4 on ch4.id = ch3.parent_id
	inner join AccountsChart ch5 on ch5.id = ch4.parent_id
	inner join AccountsChart ch6 on ch6.id = ch5.parent_id
	inner join AccountsChart ch7 on ch7.id = ch6.parent_id
	inner join AccountsChart ch8 on ch8.id = ch7.parent_id
	UNION ALL
	SELECT acc.id accountId,ch9.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	inner join AccountsChart ch2 on ch2.id = ch1.parent_id
	inner join AccountsChart ch3 on ch3.id = ch2.parent_id
	inner join AccountsChart ch4 on ch4.id = ch3.parent_id
	inner join AccountsChart ch5 on ch5.id = ch4.parent_id
	inner join AccountsChart ch6 on ch6.id = ch5.parent_id
	inner join AccountsChart ch7 on ch7.id = ch6.parent_id
	inner join AccountsChart ch8 on ch8.id = ch7.parent_id
	inner join AccountsChart ch9 on ch9.id = ch8.parent_id
	UNION ALL
	SELECT acc.id accountId,ch8.id parentid
    FROM Account acc inner join AccountsChart ch1 on ch1.id = acc.chartWhenDebit_id
	inner join AccountsChart ch2 on ch2.id = ch1.parent_id
	inner join AccountsChart ch3 on ch3.id = ch2.parent_id
	inner join AccountsChart ch4 on ch4.id = ch3.parent_id
	inner join AccountsChart ch5 on ch5.id = ch4.parent_id
	inner join AccountsChart ch6 on ch6.id = ch5.parent_id
	inner join AccountsChart ch7 on ch7.id = ch6.parent_id
	inner join AccountsChart ch8 on ch8.id = ch7.parent_id
	inner join AccountsChart ch9 on ch9.id = ch8.parent_id
	inner join AccountsChart ch10 on ch10.id = ch9.parent_id
	
)
SELECT t.nodeCode treeCode,t2.nodeCode accountCode FROM x 
left join ChartTree t on t.nodeId = x.parentid and t.defaultParentSide = 1
left join ChartTree t2 on t2.nodeId = x.accountId and t2.defaultParentSide =1

ORDER BY t.nodeCode,t2.nodeCode

```
:::

## إصلاح مشكلة حذف الحساب (Fix Deleting Account Problem)
إذا حاولت حذف حساب وظهر خطأ في قاعدة البيانات "Query optimizer ran out of space"، فاتبع الخطوات التالية:
نفّذ الاستعلام أدناه، ثم انسخ النتائج والصقها في نافذة جديدة ونفّذها
::: details
```sql
with x as (
SELECT  obj.name AS FK_NAME,
   sch.name AS [schema_name],
   tab1.name AS [table],
   col1.name AS [column],
   tab2.name AS [referenced_table],
   col2.name AS [referenced_column]
FROM sys.foreign_key_columns fkc
INNER JOIN sys.objects obj
   ON obj.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tab1
   ON tab1.object_id = fkc.parent_object_id
INNER JOIN sys.schemas sch
   ON tab1.schema_id = sch.schema_id
INNER JOIN sys.columns col1
   ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
INNER JOIN sys.tables tab2
   ON tab2.object_id = fkc.referenced_object_id
INNER JOIN sys.columns col2
   ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id
)
select 'alter table '+[table]+' drop constraint '+FK_NAME from x where referenced_table = 'account' and [table] 

```
:::
