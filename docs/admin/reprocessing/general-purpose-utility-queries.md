# General Purpose Utility Queries

General SQL helpers that are not tied to one module: generating date ranges, finding missing document numbers, unlinking documents from their source documents, cancelling a document's current approval case, recovering after two application servers ran on one database, exporting contacts to a Grandstream LDAP phonebook, and resetting the revised and prevent-usage flags.

## Get All Dates between two dates
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

## Repeat row many times depending on the row quantity
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

## Find Missing Document Numbers
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
## Unlink ALL From Docs
::: details Take care before running the query
```sql
update EntitySystemEntry set fromType = null,fromId = null where fromid is not null
```
:::

## Insert Into Temp Table Select From With Drop
::: details
```sql
DROP TABLE IF EXISTS #Items; 

select * into #Items from ( 
select code from InvItem 
) Items ; 
select code from #Items
```
:::

## Cancel Current Approval Case of a document
::: details
```sql
update ApprovalCase set state = 'Approved' where approvedElementId = 0xffff00015c154d8be6000700ff20b6eb
update PaymentOrder set documentFileStatus = 'Draft'  where id = 0xffff00015c154d8be6000700ff20b6eb
```
:::

## Disaster Recovery: Two Application Servers operated on the same database:
- Find All Duplicate QtyTrans
::: details
```sql
with x as(select id,requestId,ROW_NUMBER() over (order by requestid) rn from QtyTrans where requestId in (
select requestId from QtyTrans group by requestId,originId having count(1) > 1
)
)
select id from x  where rn%2 = 0
```
:::
- Make the request id null:
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

- Make the request id null:
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
- Manually find the repeated requests for transfer and make the request id null:
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
delete l from QtyTrans h left join QtyTransLine l on h.id = l.qtyTrans_id where h.requestId is null
go
delete from QtyTrans where requestId is null
go
delete m from FifoCostTrans h left join FifoCostTransLine l on h.id = l.FifoCostTrans_id left join FifoCostMatcher m on m.inLine_id = l.id or m.outLine_id = l.id where h.requestId is null
go
delete l from FifoCostTrans h left join FifoCostTransLine l on h.id = l.FifoCostTrans_id where h.requestId is null
go
delete from FifoCostTrans where requestId is null

```
:::
## Fetch Contacts in Nama for Grandstream LDAP Phonebook UCM
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
## Fix Null preventUsage Field
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
## Mark All Records as Unrevised
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
You need to copy the queries and run them in the SQL Server Management Studio.
:::

## Copy Revised From Entities to Entity System Entry
::: details
```sql
DECLARE @Queries TABLE (ID INT IDENTITY(1,1),SQLScript VARCHAR(MAX))
DECLARE @STR_QUERY VARCHAR(MAX);
DECLARE @StartLoop INT
DECLARE @EndLoop INT


INSERT INTO @Queries
select 'update e set revised = s.primitiveValue from EntitySystemEntry e inner join ' +case when targetType = 'User' then 'NamaUser' else targetType end + ' s on e.targetId = s.id' SQLScript from  (
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
