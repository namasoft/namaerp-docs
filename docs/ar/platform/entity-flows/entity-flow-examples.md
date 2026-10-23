---
description: "أمثلة جاهزة لمسارات كيان: إعادة حساب معدل الموارد، وتعديل حقل في السند الأعلى للسند الأعلى، وملء سطر سند القبض، وإنشاء طلبات أوامر إنتاج أو أوامر شراء لكل سطر أو مورد، وإعادة حساب الحضور والانصراف، وفرد الأرقام المسلسلة، واستبدال الأرقام، وحذف المستند الأصلي."
entities: [EntityFlow]
menu: إدارة النظام ← تخصيص شكل النظام ← مسار الكيان
---

<rtl>

# أمثلة لمسارات كيان

![مسار كيان يعمل بعد الحفظ على صرف مخزني، مع إعادة المحاولة](../images/entity-flows/entity-flow-stock-cost-rebuild-ar.png)

### إنشاء مسار كيان ليقوم بتغيير معدل الموارد في سندات الموارد في النظام (يقوم بمحاكاة أن المستخدم ضغط علي الاوبشن "اعادة حساب المعدل مع الحفظ" في سند الموارد
قم بإنشاء مسار كيان مع الاجراء "يدوي" و نوعه [`EAFieldsValuesCalculator`](/entity-flows/core/EAFieldsValuesCalculator) و قم بوضعه بتعديل شاشة. قم بإدخال التالي في المدخل 1:

```ini
runCommand="edit"
recalculateRateWithSave="true"
runCommand="save"
```
### إنشاء مسار كيان ليقوم بتعديل حقل description1 في السند الأعلى للسند الأعلى للسند الحالي (بناءا على ثم بناءا على)
قم بإنشاء مسار كيان مع الاجراء "تأثيرات الحفظ" و نوعه `EAFieldsValuesCalculator` . قم بإدخال التالي في المدخل 1:
```ini
switchTarget=fromDoc.$toReal.fromDoc(
runCommand="edit"
description1="ABC"
runCommand="save"
)endSwitchTarget
```
### إنشاء مسار كيان ليقوم بملء حقل القيمة في أول سطر في سند القبض بإجمالي الأوراق التجارية
قم بإنشاء مسار كيان مع الإجراء "ما قبل تحديث الحقول المحسوبة" و نوعه `EAFieldsValuesCalculator` . قم بإدخال التالي في المدخل 1:
```ini
n1=totalize(fblines,fblines.fpCreationInfo.value.amount)
selectLine="lines(0)"
$line.amount.value.amount=n1
```
### مسار كيان يقوم بإنشاء سندات طلب أمر انتاج لكل سطر من سطور طلب تحويل مخزني (او أي سند من سندات التوزيع - مثل طلب اصناف - امر بيع و هكذا)

الشرح الصوتي للمثال:

[Gen production order req from transfer req.m4a
](https://drive.google.com/file/d/1BMxLPE9aEjAjRs-VK7AfQgc0g9-oiHuR/view?usp=sharing)

شيت الاكسيل للاستيراد المباشر:

[Gen production order req from transfer req.xlsx](https://drive.google.com/file/d/1EL8HmxkM5via_44KfWgNa4IaeRLFyKvQ/view?usp=sharing)

اسم العنصر: [`EAGenerateEntityFromEntityAction`](/entity-flows/core/EAGenerateEntityFromEntityAction)
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
### اعادة حساب بيانات الحضور و الانصراف لاخر شهرين لمن لهم سجل حضور و انصراف

قم باستيراد الملف التالي و عدل عليه إن تطلب الأمر

[Task Schedule - إعادة حساب بيانات الحضور والانصراف لاخر شهرين لمن لهم سجل حضور و انصراف.xlsx](https://drive.google.com/file/d/1BpR-11cttBbC-E3S6w2cPexxjQKkv2w6/view?usp=sharing)

### مسار كيان يقوم بإنشاء سندات أوامر شراء لكل مورد في سند طلب الشراء
الشرح الصوتي للمثال:
[MultiplePurchaseOrdersFromRequest.m4a](https://drive.google.com/open?id=1GI9p-RH_C_VG9adGQaR-wYTuflDQhJq5)

شيت الاكسيل للاستيراد المباشر:
[CreateMultipleOrdersFromItemOrderPerSupplier.xlsx](https://drive.google.com/open?id=1zaGJcwA8oqzlnG5OHqdCnzMotYppdRM5)

اسم العنصر: `EAGenerateEntityFromEntityAction`

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
### مسار كيان يقوم بفرد الأرقام المسلسلة علي سطور في مستندات معينة (للاستعمال مع التقارير)

    EAAutoCreateSCDocSerial

### مسار كيان يقوم باستبدال الأرقام الهندي بالأرقام الإنجليزية
```sql
code=mlsql(select REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE({code}
,N'٠',N'0'),N'١',N'1'),N'٢',N'2'),N'٣',N'3')
,N'٤',N'4'),N'٥',N'5'),N'٦',N'6'),N'٧',N'7')
,N'٨',N'8'),N'٩',N'9'))endmlsql
```


### حذف المستند الموجود ببناءا على بعد حذف السند نفسه و باستعمال الاوبشن "يعمل بعد حفظ المستند نهائيا و التأثير على قاعدة البيانات" في مسار الكيان

يمكنك استعمال مسار الكيان `EADeleteFromQuery` و قم باستعمال الاستعلام التالي:
```sql
select {pendingEntry.fromDoc.entityType},{fromDoc.id} 
```

</rtl>