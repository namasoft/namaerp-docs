# Reprocessing Quantity, Cost, and Stock Ages

Scripts and utility links that rebuild quantity transactions, average cost and stock ages from the documents, either for the whole database with Tomcat stopped or partially, starting from a date.

::: danger Read this before you run anything on this page
The scripts below **delete and rebuild the database's whole transaction history**. The first block
alone drops the account balances, the ledger transaction lines and the dimension balances, empties
the ledger transactions, the debt lines and their matches, and resets every ledger and inventory
request so the server builds them all again from the documents. There is no undo, and a script run
against the wrong database cannot be talked back.

Before any of it:

1. **Take a full database backup and verify you can restore it.** Not yesterday's scheduled backup — one taken now.
2. **Check which database the window is connected to.** Every mistake anyone has made here is this one.
3. **Stop the application server** where the section says so. A running server keeps writing into the tables the script is emptying.
4. **Make sure you know why you are doing it.** These are recovery tools for a database whose balances are already wrong — not maintenance, not a routine, and never a first response to a single document that looks odd. One wrong document is fixed by reprocessing that document's business request from the [Business Requests](/platform/background-processing/business-requests) screen.

Reprocessing a whole database takes DAYS on a large one and the system is unusable while it runs.
Agree the window with the customer before you start.
:::

<ServerBaseURL/>

## Reprocess All Quantity Transactions (Tomcat must be shutdown)
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
### Partial Reprocess of Average Cost (Fast)
Reprocesses the average cost of every item from the date you give (written as `yyyyMMdd`, for example `20260101`) without stopping the server. It works for average cost only: on a FIFO installation it refuses with *You are using FIFO costing method, this utility is for average cost*, and while another fast reprocess is still running it refuses with *Can not start fast reprocessing from file, there is one already running*.

<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.FastReprocessCostFromDate"
:params="[
{ title: 'Start Date (yyyyMMdd)', default: 'yyyyMMdd' }
]"
/>

### Partial Reprocess of Stock Transfers Whose Costs Disagree (Fast)
A narrower version of the same tool. From the date you give, it reprocesses only the items and dimensions where a stock transfer left the source warehouse at one cost and arrived at the destination at another — by more than the minimum difference, `0.01` unless you enter another one. The same average-cost and already-running rules apply.

<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.FastReprocessInvalidTransfersFromDate"
:params="[
{ title: 'Start Date (yyyyMMdd)', default: 'yyyyMMdd' },
{ title: 'Minimum Cost Difference', default: '0.01' }
]"
/>

## Reprocess Stock Ages
### Method 1:
Use the fast reprocess utility. It rebuilds the stock ages of every item whose stock ages policy is Yes from its processed inventory requests, a hundred requests at a time, and writes each finished request to a progress file so an interrupted run can carry on where it stopped.

  <UtilityLinkBuilder
  className="com.namasoft.modules.supplychain.domain.utils.plugnplay.StockAgesFastReprocess"
  :params="[
  { title: 'Processed Ages File Path', default: 'E:/rc/stock-ages-done.txt' }
  ]"
  />

Opening the link changes nothing. It shows the progress file and how many requests it already lists, with buttons that ask for confirmation before they start:

- **Start** — shown when the progress file is empty or missing. It empties the stock ages tables and rebuilds them all.
- **Resume** — shown when the progress file already lists requests, for example after the server was restarted mid-run. It keeps the tables and processes only the requests that are not in the file yet. Running a request again is harmless, so resuming after a crash leaves no duplicates.
- **Start from scratch** — shown next to Resume. It clears the progress file first, then behaves like Start.

::: warning
  - A progress file left over from an earlier, finished run makes the tool offer **Resume**, which then has almost nothing to do. To rebuild everything, use **Start from scratch** or give a new file path.
  - Make sure that you are on a release after April 21st
  - There are no currentNetCost errors displayed in the system

:::
### Method 2:
- Use Following Query (Slower than method 1)
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
### Method 3:
Use Process Of Certain Dimensions Util

<UtilityLinkBuilder
className="com.namasoft.modules.supplychain.domain.utils.plugnplay.StockAgesProcessDimensions"
:params="[
{ title: 'CSV List Of StockAgesIdx IDs You Need', default: '0xFFFFFF44444,0xFFFF55566' }
]"
/>
