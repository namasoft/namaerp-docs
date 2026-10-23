# استعلامات عامة متعددة الأغراض (General Purpose Utility Queries)

أدوات SQL عامة غير مرتبطة بوحدة بعينها: توليد نطاقات التواريخ، والبحث عن أرقام المستندات المفقودة، وفك ربط المستندات بمستنداتها المصدر، وإلغاء حالة الموافقة الحالية لمستند، والتعافي بعد تشغيل خادمَي تطبيق على قاعدة بيانات واحدة، وتصدير جهات الاتصال إلى دليل هاتف Grandstream عبر LDAP، وإعادة ضبط علامتَي المراجعة ومنع الاستخدام.

## الحصول على جميع التواريخ بين تاريخين
::: details
```sql
with dates as (
SELECT  TOP (DATEDIFF(DAY, '20160101', '20161231') + 1)
        cast(DATEADD(DAY, ROW_NUMBER() OVER(ORDER BY a.object_id) - 1, '20160101') as date) dayDate
FROM    sys.all_objects a
        CROSS JOIN sys.all_objects b
)
select * from dates

```
:::

## تكرار الصف عدة مرات بناءً على الكمية
::: details
```sql
with numbers as (
SELECT  TOP 1000
        ROW_NUMBER() OVER(ORDER BY a.object_id) n
FROM    sys.all_objects a
        CROSS JOIN sys.all_objects b
)
select l.quantityPValue,n.n, * from SalesInvoiceLine l left join numbers n on CEILING(l.quantityPValue)>=n.n

```
:::

## إيجاد أرقام المستندات المفقودة
::: details
```sql
with numbers as (
SELECT  TOP 1000000
        ROW_NUMBER() OVER(ORDER BY a.object_id) n
FROM    sys.all_objects a
        CROSS JOIN sys.all_objects b
),
docs as (select cast(right(d.code,b.suffixLength) as numeric) num,s.ownerId book_id
 from SequenceEntity s inner join EntitySystemEntry d on d.targetId = s.recordId inner join DocumentBook b on b.id = s.ownerId
where b.autoCode = 1 
)
,maxdoc as(
select book_id, max(num) maxNum from docs group by book_id
)
select b.documentType, b.prefix+RIGHT('00000000000'+cast(n.n as nvarchar(10)),b.suffixLength) missingcode  from maxdoc left join numbers n on n.n <=maxdoc.maxNum left join docs on docs.book_id = maxdoc.book_id and docs.num = n.n
left join DocumentBook b on b.id = maxdoc.book_id
where docs.num is null and b.prefix like '%%'
order by b.documentType, missingcode
```
:::
## إلغاء ربط جميع المستندات بمصادرها
::: details تنبيه: راجع قبل تشغيل الاستعلام
```sql
update EntitySystemEntry set fromType = null,fromId = null where fromid is not null
```
:::

## إدخال نتائج في جدول مؤقت مع الحذف أولاً
::: details
```sql
DROP TABLE IF EXISTS #Items; 

select * into #Items from ( 
select code from InvItem 
) Items ; 
select code from #Items
```
:::

## إلغاء حالة الموافقة الحالية لمستند
::: details
```sql
update ApprovalCase set state = 'Approved' where approvedElementId = 0xffff00015c154d8be6000700ff20b6eb
update PaymentOrder set documentFileStatus = 'Draft'  where id = 0xffff00015c154d8be6000700ff20b6eb
```
:::

## التعافي من الكوارث: خادما تطبيقات يعملان على قاعدة البيانات نفسها
- إيجاد جميع QtyTrans المكررة
::: details
```sql
with x as(select id,requestId,ROW_NUMBER() over (order by requestid) rn from QtyTrans where requestId in (
select requestId from QtyTrans group by requestId,originId having count(1) > 1
)
)
select id from x  where rn%2 = 0
```
:::
- تعيين requestId إلى null:
::: details
```sql
update QtyTrans set requestid = null where id = 0x-------

```
:::
- FifoCostTrans
::: details
```sql
with x as(select id,requestId,ROW_NUMBER() over (order by requestid) rn from FifoCostTrans where requestId in (
select requestId from FifoCostTrans where originType <> 'StockTransfer'  group by requestId,originId having count(1) > 1 
)
)
select id from x  where rn%2 = 0

```
:::

- تعيين requestId إلى null:
::: details
```sql
update FifoCostTrans set requestid = null where id = 0x-------

```
:::
- FifoCostTrans - transfer
::: details
```sql
with x as(select id,requestId,ROW_NUMBER() over (order by requestid) rn from FifoCostTrans where requestId in (
select requestId from FifoCostTrans where originType <> 'StockTransfer'  group by requestId,originId having count(1) > 1 
)
)
select id from x 

```
:::
- ابحث يدوياً عن الطلبات المكررة للتحويل وعيّن requestId إلى null:
::: details
```sql
update FifoCostTrans set requestid = null where id = 0x-------
```
:::

- Ledger Trans:
::: details
```sql
with x as(select id,requestId,ROW_NUMBER() over (order by requestid) rn,originType,originId from LedgerTrans where requestId in (
select requestId from LedgerTrans  group by requestId,originId having count(1) > 1
)
)
select id,originType,originId,requestId from x  where rn%2=0
```
:::
::: details
```sql
update LedgerTrans set requestid = null where id = 0x-------
```
:::
::: details
```sql
delete l from left join Qtytrans h QtyTransLine l on h.id = l.qtytrans_id where h.requestId is null
go
delete from QtyTrans where requestId is null
go
delete m from FifoCostTrans h left join FifoCostTransLine l on h.id = l.FifoCostTrans_id left join FifoCostMatcher m on m.id = l.inLine or m.id  = l.outLine_id where h.requestId is null
go
delete l from FifoCostTrans h left join FifoCostTransLine l on h.id = l.FifoCostTrans_id where h.requestId is null
go
delete from FifoCostTrans where requestId is null

```
:::
## جلب جهات الاتصال من نما لدفتر عناوين Grandstream LDAP UCM
::: details
```sql
/*First Name	Last Name	Account Number	CallerID Name	Email	Department	Mobile Number 	Home Number	Fax	Phonebook DN*/

with data as (
select entityType firstName,name1 lastName,iif(telephone1='',mobile,telephone1) accountNumber,name2 CallerID, email,'' Department,mobile,'' Home,'' Fax,'c' Phonebook from Customer where mobile <> '' or telephone1 <> '' 
and branch_id = 0xFFFF000151A54C5F71000600FF3CC3AF
union
select entityType,name1,iif(contactinfotelephone1='',contactinfomobile,contactinfotelephone1),name2, contactinfoemail,'',contactinfomobile,'','','c' from REOwner where contactInfoMobile <> '' or contactInfoTelephone1 <> '' 
and branch_id = 0xFFFF000151A54C5F71000600FF3CC3AF
union  
select entityType,name1,iif(infotelephone1='',infomobile,infotelephone1),name2, infoemail,'',infomobile,'','','c' from CRMLead where infoMobile <> '' or infoTelephone1 <> '' 
and branch_id = 0xFFFF000151A54C5F71000600FF3CC3AF
union  
select entityType,name1,iif(infotelephone1='',infomobile,infotelephone1),name2, infoemail,'',infomobile,'','','c' from CRMPotential where infoMobile <> '' or infoTelephone1 <> '' 
and branch_id = 0xFFFF000151A54C5F71000600FF3CC3AF
union  
select entityType,name1,iif(telephone1='',mobile,telephone1),name2, email,'',mobile,'','','c' from Contact where mobile <> '' or telephone1 <> '' 
and branch_id = 0xFFFF000151A54C5F71000600FF3CC3AF
)
, clean as (
select firstName,lastName,replace(replace(replace(accountNumber,'-',''),'+','00'),' ','') accountNumber,CallerID,replace(email,',','-') email,Department,mobile,Home,Fax,Phonebook from data
)
select * from clean
--where TRY_PARSE(accountNumber as decimal(20,10)) is   null 

```
:::
## إصلاح حقل preventUsage الفارغ
::: details
```sql
DECLARE @Queries TABLE (ID INT IDENTITY(1,1),SQLScript VARCHAR(MAX))
DECLARE @STR_QUERY VARCHAR(MAX);
DECLARE @StartLoop INT
DECLARE @EndLoop INT


INSERT INTO @Queries
select 'UPDATE '+case when targetType = 'User' then 'NamaUser' else targetType end +' SET preventUsage = 0 where preventUsage is null ' SQLScript from  (
		select distinct targetType from EntitySystemEntry
		) s
SELECT @EndLoop = MAX(ID), @StartLoop = MIN(ID)
FROM @Queries

WHILE @StartLoop < = @EndLoop
BEGIN
    SELECT @STR_QUERY = SQLScript 
    FROM @Queries
    WHERE ID = @StartLoop
		BEGIN  transaction xx
		print @STR_QUERY
		EXEC (@STR_QUERY)
		commit transaction  xx
    SET @StartLoop = @StartLoop + 1
END

```
:::
## تعليم جميع السجلات كغير مراجَعة
::: details
```sql
DECLARE @Queries TABLE (ID INT IDENTITY(1,1),SQLScript VARCHAR(MAX))
DECLARE @STR_QUERY VARCHAR(MAX);
DECLARE @StartLoop INT
DECLARE @EndLoop INT


INSERT INTO @Queries
select 'UPDATE '+case when targetType = 'User' then 'NamaUser' else targetType end +' SET primitiveValue = 0 where primitiveValue = 1 ' SQLScript from  (
		select distinct targetType from EntitySystemEntry
		) s
SELECT @EndLoop = MAX(ID), @StartLoop = MIN(ID)
FROM @Queries

WHILE @StartLoop < = @EndLoop
BEGIN
    SELECT @STR_QUERY = SQLScript 
    FROM @Queries
    WHERE ID = @StartLoop
		BEGIN  transaction xx
		print @STR_QUERY
		EXEC (@STR_QUERY)
		commit transaction  xx
    SET @StartLoop = @StartLoop + 1
END

```
:::
::: tip
يجب نسخ الاستعلامات وتشغيلها في SQL Server Management Studio.
:::

## نسخ حالة المراجعة من الكيانات إلى EntitySystemEntry
::: details
```sql
DECLARE @Queries TABLE (ID INT IDENTITY(1,1),SQLScript VARCHAR(MAX))
DECLARE @STR_QUERY VARCHAR(MAX);
DECLARE @StartLoop INT
DECLARE @EndLoop INT


INSERT INTO @Queries
select 'update e set revised = s.primitiveValue from EntitySystemEntry e inner join ' +case when targetType = 'User' then 'NamaUser' else targetType end + 's on e.targetId = s.id' SQLScript from  (
		select distinct targetType from EntitySystemEntry
		) s
SELECT @EndLoop = MAX(ID), @StartLoop = MIN(ID)
FROM @Queries

WHILE @StartLoop < = @EndLoop
BEGIN
    SELECT @STR_QUERY = SQLScript 
    FROM @Queries
    WHERE ID = @StartLoop
		BEGIN  transaction xx
		print @STR_QUERY
		EXEC (@STR_QUERY)
		commit transaction  xx
    SET @StartLoop = @StartLoop + 1
END
```
:::
