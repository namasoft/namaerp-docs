# استعلامات للكشف عن مشاكل التكلفة والكميات (وإصلاحها)

استعلامات SQL تتحقق من تطابق تكلفة المخزون مع دفتر الأستاذ، وتعالج الأسباب المعتادة حين لا تتطابق: إعدادات محاسبية قديمة على طلبات المخزون، وطلبات مخزون عالقة، وكميات بلغت الصفر وما زالت تحمل تكلفة، وحركات تكلفة FIFO خاطئة. شغّل استعلامات الكشف أولاً، وخذ نسخة احتياطية من قاعدة البيانات قبل أي جملة تعدّل أو تحذف.

## التحقق من تطابق التكلفة مع دفتر الأستاذ
::: details
```sql
with Costs as
(
select SUM(totalCost) as costValue,originId,originType from CostInTransLine group by originId ,originType
union all
select SUM(totalCost) as costValue,originId,originType from CostOutTransLine where originType <> 'StockTransfer' group by originId,originType
)
,
Acc as (
select SUM(debitLocalAmount) as ledgerValue,originId,originType from LedgerTransLine group by originId,originType
)
select  c.originType,c.originId,ledgerValue,costValue,abs(ledgerValue-costValue) diff from Costs c left join Acc on acc.originId = c.originId where ABS(c.costValue-acc.ledgerValue)>0.1
order by diff desc
```
:::
## إعادة جلب إعدادات المحاسبة لكود توجيه محدد
::: details
```sql
update r set transStatus = 'Retry',regenerateLedgerReq = 1, reFetchAccConfig = 1
from InvTransReq r inner join EntitySystemEntry e on e.targetId = r.originId
left join DocumentTerm t on t.id = e.term_id
 where r.transStatus = 'Processed' and r.requestType <> 'Delete'
 and t.code = 'term_code_here'
```
:::
## إعادة جلب إعدادات المحاسبة في InvTransReq الفاشلة
::: details
```sql
update InvTransReq set transStatus = 'Retry',regenerateLedgerReq = 1, reFetchAccConfig = 1 
                   where transStatus = 'Processed' and requestType <> 'Delete'
```
:::
## إعادة جلب إعدادات المحاسبة في جميع الفواتير والمصروفات والصرف والاستلام والتحويلات
::: details
```sql
update InvTransReq set transStatus = 'Retry',regenerateLedgerReq = 1, reFetchAccConfig = 1 
                   where transStatus = 'Processed' and requestType <> 'Delete'
```
:::
## البحث عن InvTransReq الوهمية وإزالتها

::: details استعلام للمراجعة
```sql
select origintype,origincode from QtyTransLine r left join EntitySystemEntry e on e.targetId = r.originId
where e.id is null  or e.fileStatus = 'Cancelled'
union all
select origintype,origincode from ReservationTransLine r left join EntitySystemEntry e on e.targetId = r.originId
where e.id is null  or e.fileStatus = 'Cancelled'
union all
select origintype,origincode from CostInTransLine r left join EntitySystemEntry e on e.targetId = r.originId
where e.id is null  or e.fileStatus = 'Cancelled'
union all
select origintype,origincode from CostOutTransLine r left join EntitySystemEntry e on e.targetId = r.originId
where e.id is null  or e.fileStatus = 'Cancelled'

```
:::
::: details استعلام التحديث
```sql
update r set requestType = 'Delete',costTransStatus = 'Retry',qtyTransStatus = 'Retry',transStatus = 'Retry'
 from InvTransReq r inner join QtyTransLine l on l.requestId = r.id
 left join EntitySystemEntry e on e.targetId = l.originId
where e.id is null or e.fileStatus = 'Cancelled'
go
update r set requestType = 'Delete',costTransStatus = 'Retry',qtyTransStatus = 'Retry',transStatus = 'Retry'
 from InvTransReq r inner join ReservationTransLine l on l.requestId = r.id
 left join EntitySystemEntry e on e.targetId = l.originId
where e.id is null or e.fileStatus = 'Cancelled'
go
update r set requestType = 'Delete',costTransStatus = 'Retry',qtyTransStatus = 'Retry',transStatus = 'Retry'
 from InvTransReq r inner join costintransline l on l.requestId = r.id
 left join EntitySystemEntry e on e.targetId = l.originId
where e.id is null or e.fileStatus = 'Cancelled'
go
update r set requestType = 'Delete',costTransStatus = 'Retry',qtyTransStatus = 'Retry',transStatus = 'Retry'
 from InvTransReq r inner join costouttransline l on l.requestId = r.id
 left join EntitySystemEntry e on e.targetId = l.originId
where e.id is null or e.fileStatus = 'Cancelled'

```
:::
## البحث عن حركات بها فروقات أدت إلى "كمية صفر مع وجود تكلفة"
::: details استعلام للمراجعة
```sql
with x as (
select item_id,originType,originId,originCode,overdraftSatisCost,overdraftSatisQty,overdraftDetails,strSequence,sum(coalesce(netCost,0)-coalesce(overdraftSatisCost,0)) over(partition by dimensionCost order by strSequence  ROWS UNBOUNDED PRECEDING) currentCost,coalesce(currentNetCost,0) currentNetCost,
coalesce(currentNetQty,0) currentNetQty  ,dimensionCost

 from CostInTransLine c left join LegalEntity le on le.id = c.legalEntity_id 
--where valueDate < '20180101'
),
minByItem as (select min(strSequence) minStr,item_id from x 
where abs(currentCost-currentNetCost) > 0.0001
group by dimensionCost,item_id
)
select distinct originType,originId,valueDate from minByItem mi left join CostInTransLine cin on cin.strSequence = mi.minStr
```
:::
::: details استعلام لإعادة المعالجة
```sql
with x as (
select item_id,originType,originId,originCode,overdraftSatisCost,overdraftSatisQty,overdraftDetails,strSequence,sum(coalesce(netCost,0)-coalesce(overdraftSatisCost,0)) over(partition by dimensionCost order by strSequence  ROWS UNBOUNDED PRECEDING) currentCost,coalesce(currentNetCost,0) currentNetCost,
coalesce(currentNetQty,0) currentNetQty  ,dimensionCost

 from CostInTransLine c left join LegalEntity le on le.id = c.legalEntity_id 
--where valueDate < '20180101'
),
minByItem as (select min(strSequence) minStr,item_id from x 
where abs(currentCost-currentNetCost) > 0.0001
group by dimensionCost,item_id
)
, reproceess as (select distinct originType,originId from minByItem mi left join CostInTransLine cin on cin.strSequence = mi.minStr)
update r set transStatus = 'Retry', costTransStatus = 'Retry' from reproceess rp inner join InvTransReq  r on r.originId = rp.originId
```
:::
### البحث عن المستندات التي تحتاج إلى إعادة الحفظ لإصلاح مشكلة كمية صفر مع وجود تكلفة
::: details
```sql
with x as (
select item_id,originType,originId,originCode,overdraftSatisCost,overdraftSatisQty,overdraftDetails,strSequence,sum(coalesce(netCost,0)-coalesce(overdraftSatisCost,0)) over(partition by dimensionCost order by strSequence  ROWS UNBOUNDED PRECEDING) currentCost,coalesce(currentNetCost,0) currentNetCost,
coalesce(currentNetQty,0) currentNetQty 
 from CostInTransLine c left join LegalEntity le on le.id = c.legalEntity_id 
-- where valueDate < '20180101'
 -- item_id = 0xFFFF00015B5DDFD135000700FF106A84
),
minByItem as (select min(strSequence) minStr,item_id from x 
where currentCost<>currentNetCost
group by item_id
)
select originType,originId, * from minByItem mi left join CostInTransLine cin on cin.strSequence = mi.minStr
/*
select currentCost-currentNetCost costDiff, *
from x
where currentCost<>currentNetCost
order by item_id,strSequence*/

```
:::

## البحث عن حركات المخزون التي لا تؤثر على حركات دفتر الأستاذ
::: details
```sql
declare @valueDate as date = '20211231';
declare @invnetoryAccountCode as nvarchar(255) = '1207%' ;
with costs as (
select w.code wcode,w.id wid,w.name1 wname,originType,originCode,originId, netCost,totalCost*-1 totalCost,c.netQty  netQty ,i.id item,i.code itemCode,i.name1 itemName,b.name1 branch,leg.name1 legal,leg.id legalEntityId , valueDate

from CostInTransLine c
 left join InvItem i on i.id = c.item_id 
 	left join UOM U on U.id= i.primBaseUnit_id
 
 left join Branch b on b.id = c.branch_id
  left join LegalEntity leg on leg.id = c.legalEntity_id
  left join warehouse w on w.id = c.warehouse_id
where c.valuedate <=@valueDate

union all
select w.code wcode,w.id wid,w.name1 wname,originType,originCode,originId,netCost*-1 netCost,totalCost*-1 totalCost,c.netQty*-1 netQty ,i.id item,i.code itemCode,i.name1 itemName,b.name1 branch,leg.name1 legal,leg.id legalEntityId, valueDate

from CostOutTransLine c 
 left join InvItem i on i.id = c.item_id 
 	left join UOM U on U.id= i.primBaseUnit_id
 
 left join Branch b on b.id = c.branch_id
  left join LegalEntity leg on leg.id = c.legalEntity_id
  left join warehouse w on w.id = c.warehouse_id

where c.valuedate <=@valueDate
union all
select w.code wcode,w.id wid,w.name1 wname,originType,originCode,originId,outCost*-1 netCost,outCost*-1 totalCost,c.outQty  netQty ,i.id item,i.code itemCode,i.name1 itemName,b.name1 branch,leg.name1 legal,leg.id legalEntityId , valueDate

from fifocosttransline c
 left join InvItem i on i.id = c.item_id 
 	left join UOM U on U.id= i.primBaseUnit_id
 
 left join Branch b on b.id = c.branch_id
  left join LegalEntity leg on leg.id = c.legalEntity_id
  left join warehouse w on w.id = c.warehouse_id
where c.valuedate <=@valueDate and outQty > 0

union all
select w.code wcode,w.id wid,w.name1 wname,originType,originCode,originId,inCost netCost,incost totalCost,c.inQty netQty ,i.id item,i.code itemCode,i.name1 itemName,b.name1 branch,leg.name1 legal,leg.id legalEntityId, valueDate 

from fifocosttransline c 
 left join InvItem i on i.id = c.item_id 
 	left join UOM U on U.id= i.primBaseUnit_id
 
 left join Branch b on b.id = c.branch_id
  left join LegalEntity leg on leg.id = c.legalEntity_id
  left join warehouse w on w.id = c.warehouse_id

where c.valuedate <=@valueDate and inQty > 0
)
,
fromLedger as (
select sum(debitLocalAmount-creditLocalAmount) total,subsidiaryCode,subsidiaryId
,originId
from LedgerTransLine l
left join Account acc on acc.id = l.account_id
where acc.code like @invnetoryAccountCode
and l.valueDate <=@valueDate
group by subsidiaryCode,subsidiaryId
,originId
)
/*
select * from costs where item = 0xFFFF00016EEFACAFE2000000FF19F35D
order by strSequence,netQty
*/
, fromCost as (
select -- wcode, sum(netCost) cost,sum(netQty)qty,item,itemCode,itemName ,legalEntityId,min(valueDate) minDate,max(valueDate) maxDate,min(strSequence) minSeq,dimensionCost
wid,sum(totalCost) cost
,originId
from costs 
group by wid
,originId
)
, costledger as (
select distinct wid,originId from fromCost
union
select distinct subsidiaryId,originId from fromLedger
)
select sum(coalesce(c.cost,0)) c,sum(coalesce(l.total,0)) l,abs(abs(sum(coalesce(c.cost,0)))-abs(sum(coalesce(l.total,0)))) diff,cl.wid,w.code,w.name1 
,cl.originId,e.targetType,e.code
from costledger cl
left join fromCost c on c.wid = cl.wid and c.originId = cl.originId
left join fromLedger l on l.subsidiaryId = cl.wid and l.originId = cl.originId
left join Warehouse w on w.id = cl.wid
left join EntitySystemEntry e on e.targetId = cl.originId
group by cl.wid ,w.code,w.name1
,cl.originId,e.targetType,e.code
having abs(abs(sum(coalesce(c.cost,0)))-abs(sum(coalesce(l.total,0))))>1 
order by diff desc

```
:::
## التحقق من تطابق التكلفة مع دفتر الأستاذ (الإجماليات)
::: details
```sql
declare @onDate as date = '20231231'
declare @inventoryAccountsPrefix as nvarchar(30) = '1106'
;
with Costs1 as
(
select SUM(totalCost) as inCost,0 outCost
from CostInTransLine 
where valueDate<=@onDate

union all
select 0 inCost, SUM(totalCost) as outCost
from CostOutTransLine 
where valueDate<=@onDate
),
Costs as (
select SUM(inCost) -sum(outCost) costs
from Costs1 

)
,
Acc as (
select SUM(debitLocalAmount) - sum(creditLocalAmount) acc
from LedgerTransLine l left join Account acc on acc.id = l.account_id
where acc.code like @inventoryAccountsPrefix + '%' and originType in ('StockIssue','StockReceipt','StockTransfer','CostRevaluation')
and valueDate<=@onDate
)
select costs,acc,costs-acc diff from acc inner join costs on 1 = 1

```
:::
# التحقق من تطابق التكلفة مع دفتر الأستاذ لكل مستند
::: details
```sql
declare @onDate as date = '20231231'
declare @inventoryAccountsPrefix as nvarchar(30) = '1106'
;
with Costs1 as
(
select SUM(totalCost) as inCost,0 outCost,originId,originType,valueDate 
from CostInTransLine 
where valueDate <=@onDate
group by originId ,originType,valueDate
union all
select 0 inCost, SUM(totalCost) as outCost,originId,originType,valueDate 
from CostOutTransLine 
where valueDate <=@onDate
group by originId,originType ,valueDate
),
Costs as (
select SUM(inCost) as inCost,sum(outCost) outCost,originId,originType,valueDate 
from Costs1 
group by originId ,originType,valueDate
)
,
Acc as (
select SUM(debitLocalAmount) as dr,sum(creditLocalAmount) cr,originId,originType 
from LedgerTransLine l left join Account acc on acc.id = l.account_id
where acc.code like @inventoryAccountsPrefix+'%' and originType in ('StockIssue','StockReceipt','StockTransfer','CostRevaluation')
and valueDate <=@onDate
group by originId,originType
)

select case when c.originType <> 'CostRevaluation' 
then abs( sum(dr-inCost))+abs(sum(cr-outCost))
else abs( sum(dr-cr-(inCost-outCost))) end
diff ,c.originId,c.originType,
sum(sum(case when c.originType <> 'CostRevaluation' 
then  dr-inCost+cr-outCost
else dr-cr-(inCost-outCost) end)) over (partition by 1) tt

from Costs c left join Acc on acc.originId = c.originId 
left join InvTransReq r on r.originId = c.originId 

group by c.originId,c.originType
having  case when c.originType <> 'CostRevaluation' 
then abs( sum(dr-inCost))+abs(sum(cr-outCost))
else abs( sum(dr-cr-(inCost-outCost))) end >= 0.01

order by diff desc


```
:::

## إعادة توليد حركات دفتر الأستاذ للطلبات ذات تعارض بين التكلفة ودفتر الأستاذ
::: details
```sql
with Costs as
(
select SUM(totalCost) as costValue,originId,originType from CostInTransLine group by originId ,originType
union all
select SUM(totalCost) as costValue,originId,originType from CostOutTransLine where originType <> 'StockTransfer' group by originId,originType
)
,
Acc as (
select SUM(debitLocalAmount) as ledgerValue,originId,originType from LedgerTransLine group by originId,originType
)

update r set transStatus = 'Retry',regenerateLedgerReq = 1,priority = 3 from Costs c left join Acc on acc.originId = c.originId left join InvTransReq r on r.originId = c.originId
where ABS(c.costValue-acc.ledgerValue)>0.1 and r.requestType <> 'Delete'

```
:::
## البحث عن أصناف بكمية صفر مع وجود تكلفة
::: details
```sql
with costs as (
select w.code wcode,w.name1 wname, netCost,c.netQty  netQty ,i.id item,i.code itemCode,b.name1 branch,leg.name1 legal,leg.id legalEntityId 
from CostInTransLine c
 left join InvItem i on i.id = c.item_id 
 	left join UOM U on U.id= i.primBaseUnit_id
 
 left join Branch b on b.id = c.branch_id
  left join LegalEntity leg on leg.id = c.legalEntity_id
  left join warehouse w on w.id = c.warehouse_id
--where c.valuedate <'20180101'

union all
select w.code wcode,w.name1 wname,netCost*-1 netCost,c.netQty*-1 netQty ,i.id item,i.code itemCode,b.name1 branch,leg.name1 legal,leg.id legalEntityId from CostOutTransLine c 
 left join InvItem i on i.id = c.item_id 
 	left join UOM U on U.id= i.primBaseUnit_id
 
 left join Branch b on b.id = c.branch_id
  left join LegalEntity leg on leg.id = c.legalEntity_id
  left join warehouse w on w.id = c.warehouse_id

--where c.valuedate <'20180101'
)
select sum(netCost) cost,sum(netQty)qty,item,itemCode ,legalEntityId from costs 

group by item,itemCode,legalEntityId
having sum(netQty) = 0 and abs(sum(netCost)) > 0.01
order by abs(sum(netCost)) desc

```
:::
## إصلاح حقول CurrentNetQty غير الصحيحة
<UtilityLinkBuilder className="com.namasoft.modules.supplychain.domain.utils.UpdateCurrentNetCostAndCurrentNetQty"
/>

## مشكلة تكلفة تسليم الإنتاج (Cost Callback)
::: details
```sql
with delivery as (
select sum(cin.netCost) receiptCost,po.id from ProductionOrder po inner join ProductDelivery pod on pod.productionOrder_id = po.id inner join StockReceipt sr on sr.fromDoc_id = pod.id
inner join CostInTransLine cin on cin.originId = sr.id 
group by po.id
),
issue as (
select sum(cout.netCost) materialCost,po.id from ProductionOrder po inner join RawMaterialIssue pod on pod.productionOrder_id = po.id inner join StockIssue sr on sr.fromDoc_id = pod.id
inner join CostOutTransLine cout on cout.originId = sr.id
group by po.id
),
ret as (
select sum(cin.netCost) retCost,po.id from ProductionOrder po inner join RawMaterialReturn pod on pod.productionOrder_id = po.id inner join StockReceipt sr on sr.fromDoc_id = pod.id
inner join CostInTransLine cin on cin.originId = sr.id 
group by po.id
),
resources as(
select sum(l.total) resourceCost,po.id from ProductionOrder po inner join ResourceVoucher v on v.productionOrder_id = po.id left join ResourceVoucherLine l on l.resourceVoucher_id = v.id
group by po.id
)
select cv.entityType, cv.id,po.valueDate, receiptCost,materialCost+resourceCost-coalesce(retCost,0),receiptCost-(materialCost+resourceCost-coalesce(retCost,0)),issue.materialCost,ret.retCost,resources.resourceCost from ProductionOrder po left join
delivery on delivery.id = po.id left join issue on issue.id = po.id left join ret on ret.id = po.id 
left join resources on resources.id = po.id
left join OrderCloseVoucher cv on cv.productionOrder_id = po.id
where abs(receiptCost-(materialCost+resourceCost-coalesce(retCost,0)))>1.5 and cv.id is not null


```
:::

## إعادة معالجة حركات تكلفة Fifo التالفة
::: details
```sql
with toReproocess as (
select  distinct l.originType,l.originId,l.valueDate
 from FifoCostTransLine l 
left join FifoCostMatcher mi on mi.inLine_id = l.id
left join FifoCostMatcher mo on mo.outLine_id = l.id
group by l.originType,l.originId,l.remainingInQty,l.remainingOutQty,l.inQty,l.outQty,l.item_id,l.id,l.valueDate
having l.remainingInQty <> l.inQty - sum(coalesce(mi.consumedQty,0))
 or l.remainingOutQty <> l.outQty - sum(coalesce(mo.consumedQty,0))
 order by l.valueDate desc
 )
 update r set r.transstatus = 'Retry',r.costtransstatus = 'Retry' from toReproocess t inner join InvTransReq r on r.originId = t.originId

declare @annualIncome decimal(10,2) = 400000

```
:::
