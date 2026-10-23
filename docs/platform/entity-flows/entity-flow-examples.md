---
description: "Ready-made Entity Flow recipes: recalculating resource rates, editing a field two documents up, filling a receipt line, creating production order requests or purchase orders per line or supplier, recalculating attendance, expanding serial numbers, converting digits and deleting the source document."
entities: [EntityFlow]
menu: Administration → Display Customization → Entity Flow
---

# Entity Flow Examples

![An Entity Flow that runs after commit on stock issues, with retries](../../ar/platform/images/entity-flows/entity-flow-stock-cost-rebuild-en.png)

### Create an Entity Flow to change the resource rate in resource vouchers in the system (simulates the user clicking the "Recalculate Rate with Save" option in the resource voucher)
Create an Entity Flow with the action "Manual" of type [`EAFieldsValuesCalculator`](/entity-flows/core/EAFieldsValuesCalculator) and place it in the edit screen. Enter the following in Parameter 1:

```ini
runCommand="edit"
recalculateRateWithSave="true"
runCommand="save"
```
### Create an Entity Flow to edit the description1 field in the parent document of the parent document of the current document (based on "Based On" then "Based On")
Create an Entity Flow with the action "Save Effects" of type `EAFieldsValuesCalculator`. Enter the following in Parameter 1:
```ini
switchTarget=fromDoc.$toReal.fromDoc(
runCommand="edit"
description1="ABC"
runCommand="save"
)endSwitchTarget
```
### Create an Entity Flow to fill the value field in the first line of a receipt voucher with the total of commercial papers
Create an Entity Flow with the action "Before Calculating Computed Fields" of type `EAFieldsValuesCalculator`. Enter the following in Parameter 1:
```ini
n1=totalize(fblines,fblines.fpCreationInfo.value.amount)
selectLine="lines(0)"
$line.amount.value.amount=n1
```
### Entity Flow that creates production order request vouchers for each line in a stock transfer request (or any distribution voucher — such as an item request, sales order, etc.)

Audio explanation of the example:

[Gen production order req from transfer req.m4a
](https://drive.google.com/file/d/1BMxLPE9aEjAjRs-VK7AfQgc0g9-oiHuR/view?usp=sharing)

Excel sheet for direct import:

[Gen production order req from transfer req.xlsx](https://drive.google.com/file/d/1EL8HmxkM5via_44KfWgNa4IaeRLFyKvQ/view?usp=sharing)

Element name: [`EAGenerateEntityFromEntityAction`](/entity-flows/core/EAGenerateEntityFromEntityAction)
::: details JSON code for Import Into Current Record
```json
{
  "details" : [ {
    "className" : "com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction",
    "title1" : "Target Type",
    "parameter1" : "ProductionOrderRequest",
    "title2" : "Finder SQL. eg: select id from CreditNote where ref5Id={id}",
    "parameter2" : "select {currentLine.ref1.id}",
    "title3" : "Field Map. eg: \ncode=code\nfromDoc=$this\nref5=$this",
    "parameter3" : "book=\"طلب امر انتاج'\nfromDoc=$this\ninvItem=$line.item.item\nbom=$line.item.item.code\nrouting=$line.item.item.code\nquantity.value=$line.quantity.quantity.primeQty.value\nquantity.uom=$line.quantity.quantity.primeQty.uom\nswitchSource=$target.bom(\ncomponents=[details]\ncomponents.operationSeq=details.operationSeq\ncomponents.item=details.item\ncomponents.quantity.quantity.primeQty.value=details.quantity.quantity.primeQty.value\ncomponents.quantity.quantity.primeQty.uom=details.quantity.quantity.primeQty.uom\ncomponents.finalQty.value=details.finalQty.value\ncomponents.finalQty.uom=details.finalQty.uom\ncomponents.materialClassification=details.materialClassification\ncomponents.specificDimensions.warehouse=details.specificDimensions.warehouse\ncomponents.issueType=details.issueType\ncomponents.remarks=details.remarks\n)endSwitchSource\nswitchSource=$target.routing(\nroutings=[details]\nroutings.operationSeq=details.operationSeq\nroutings.operation=details.operation\nroutings.workCenter=details.workCenter\nroutings.autoCharge=details.autoCharge\nroutings.description=details.description\nroutings.permittedPercentage=details.permittedPercentage\n)endSwitchSource\n",
    "title5" : "Inverse Copy (Copy Fields from Generated to Generator). \nExample:\nref5=$this\ndescription5=n1",
    "parameter5" : "$line.ref1=$this",
    "title6" : "Run Entity Flow Per Each Line. eg: details",
    "parameter6" : "details",
    "targetAction" : "PostCommit",
    "description" : "Creates Entity from another entity, should be used in combination with DeleteRelatedEntityAction"
  } ]
}
```
:::
### Recalculate attendance and departure data for the last two months for employees who have attendance records

Import the following file and modify it if needed:

[Task Schedule - إعادة حساب بيانات الحضور والانصراف لاخر شهرين لمن لهم سجل حضور و انصراف.xlsx](https://drive.google.com/file/d/1BpR-11cttBbC-E3S6w2cPexxjQKkv2w6/view?usp=sharing)

### Entity Flow that creates purchase order vouchers for each supplier in a purchase request
Audio explanation of the example:
[MultiplePurchaseOrdersFromRequest.m4a](https://drive.google.com/open?id=1GI9p-RH_C_VG9adGQaR-wYTuflDQhJq5)

Excel sheet for direct import:
[CreateMultipleOrdersFromItemOrderPerSupplier.xlsx](https://drive.google.com/open?id=1zaGJcwA8oqzlnG5OHqdCnzMotYppdRM5)

Element name: `EAGenerateEntityFromEntityAction`

    Parameter 1:
```
PurchaseOrder
```

    Parameter 2:
```sql
select id from PurchaseOrder where ref1Id = {id} and supplier_id = {$currentGroupKey.id}
```
    Parameter 3:
```ini
ref1=$this
fromDoc=$this
book="FPOR"
term="FPOR"
supplier=$currentGroupKey
details=[details]
details.item.item=details.item.item
details.quantity.quantity.primeQty.value=details.quantity.quantity.primeQty.value
details.quantity.quantity.primeQty.uom=details.quantity.quantity.primeQty.uom
details.price.unitPrice=details.price.unitPrice
```
    Parameter 9: (Group Details By)
```
details.recommendedSupplier
```
### Entity Flow that expands serial numbers onto lines in certain documents (for use with reports)

    EAAutoCreateSCDocSerial

### Entity Flow that replaces Hindi-Arabic numerals with Western Arabic numerals
```sql
code=mlsql(select REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE({code}
,N'٠',N'0'),N'١',N'1'),N'٢',N'2'),N'٣',N'3')
,N'٤',N'4'),N'٥',N'5'),N'٦',N'6'),N'٧',N'7')
,N'٨',N'8'),N'٩',N'9'))endmlsql
```


### Delete the document referenced in "Based On" after deleting the voucher itself, using the "Runs after the document is finally saved and the database is affected" option in the Entity Flow

You can use the Entity Flow `EADeleteFromQuery` with the following query:
```sql
select {pendingEntry.fromDoc.entityType},{fromDoc.id} 
```
