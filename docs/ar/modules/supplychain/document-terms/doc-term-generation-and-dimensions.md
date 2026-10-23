---
entities: [DocumentTerm]
menu: الأساسيات ← الإعدادات ← توجيه مستند
---

# إعدادات التوليد والمحددات (Generation & Dimensions)

تغطي هذه الصفحة منطقتين مترابطتين في **توجيه المستند** للمخازن: كيف يقوم المستند بتوليد المستندات اللاحقة تلقائياً (عند الاعتماد، أو بشكل تلقائي/مؤجل عند الحفظ)، وكيف ترتبط المحددات المحاسبية للمستند (المحددات: الفرع، القطاع، الإدارة، المجموعة التحليلية) بمخزنه.

::: info مكان الإعداد
افتح **توجيه المستند** (توجيه)، ثم مجموعات **المحددات** و **التوليد** و **الإنشاء التلقائي مع الحفظ**.
:::

![تبويب المحددات في توجيه فاتورة المبيعات](../images/document-terms/doc-term-generation-and-dimensions-ar.png)

## المحددات (Dimensions)

افتراضياً يحمل مستند المخزون مخزناً واحداً ومجموعة واحدة من المحددات المحاسبية للمستند بأكمله. تتحكم هذه المفاتيح في كيفية ارتباط محددات المستند بالمخزن، وفي إمكانية تعديل السطور المسحوبة من مستند بناءً عليه.

**الربط مرة واحدة فقط (Relate Only Once)** (`termConfig.relateOnlyOnce`) — يمكن ربط/سحب سطر المستند بناءً عليه داخل مستند واحد فقط من هذا النوع، مما يمنع استهلاك السطر المصدر مرتين.

**منع تعديل السطور بناءً عليه (Prevent Modify From Doc Lines)** (`termConfig.preventModifyFromDocLines`) — يقفل السطور المسحوبة من مستند بناءً عليه فلا يمكن تعديلها.

**السماح بالحفظ بدون تفاصيل (Allow Save Without Details)** (`termConfig.allowSaveWithoutDetails`) — يسمح بحفظ المستند بدون أي سطور تفاصيل.

### مجموعة "المحدد يجب أن يطابق المخزن" (Must Be As Warehouse)

عندما يُطلب أن يكون المحدد *مطابقاً للمخزن*، يفرض النظام أن يساوي ذلك المحدد المحاسبي على السطر/الرأس محدد المخزن نفسه — فلا يمكن أن يختلف فرع/قطاع/إدارة/مجموعة تحليلية المستند عن المخزن الذي يحرّك المخزون من خلاله.

| الخيار | معرّف الحقل |
|---|---|
| يجب تطابق القطاع مع المخزن | `termConfig.sectorMustBeAsWarehouse` |
| يجب تطابق الفرع مع المخزن | `termConfig.branchMustBeAsWarehouse` |
| يجب تطابق الإدارة مع المخزن | `termConfig.departmentMustBeAsWarehouse` |
| يجب تطابق المجموعة التحليلية مع المخزن | `termConfig.analysisSetMustBeAsWarehouse` |

### السماح بمحدد مختلف عن المخزن (للتحويلات)

تظهر هذه المفاتيح فقط لمستندات التحويل المخزني وطلبات التحويل. يخفف كل منها قاعدة *المطابقة مع المخزن* في حالة التحويلات، فيتيح للمحدد المقابل أن يختلف عن محدد المخزن.

**السماح بالتحويل من وإلى أكثر من مخزن (Allow Transfer From And To Multiple Warehouses)** (`termConfig.allowMultipleWarehouses`) — يسمح لمستند التحويل الواحد بالإشارة إلى أكثر من مخزن مصدر/وجهة (التحويلات المخزنية وطلبات التحويل، بما في ذلك نقاط البيع).

| الخيار | معرّف الحقل |
|---|---|
| السماح باستعمال فرع مختلف عن فرع المخزن | `termConfig.allowUseDifferentBranchOfWarehouseBranch` |
| السماح باستعمال قطاع مختلف عن قطاع المخزن | `termConfig.allowUseDifferentSectorOfWarehouseSector` |
| السماح باستعمال قسم مختلف عن قسم المخزن | `termConfig.allowUseDifferentDepartmentOfWarehouseDepartment` |
| السماح باستعمال مجموعة تحليلية مختلفة عن المجموعة التحليلية للمخزن | `termConfig.allowUseDifferentAnalysisSetOfWarehouseAnalysisSet` |

## التوليد (Generation)

تتحكم هذه المجموعة في المستندات اللاحقة التي ينشئها هذا المستند عند اعتماده (أو عند تشغيل إجراء توليد يدوي). الحقول الأربعة الأساسية مدرجة ضمن كائن القيمة المشترك `generationConfigurations`؛ أما حقول الدفتر/التوجيه المتبقية فهي مباشرة على توجيه المستند وتظهر فقط لأنواع مستندات بعينها.

**إنشاء مستندات تلقائياً (Generate Document(s))** (`termConfig.generationConfigurations.generateDoc`) *(غير مفعّل افتراضياً)* — عند التفعيل، تُنشأ المستندات اللاحقة تلقائياً عند الحفظ/الاعتماد. متاح على المستندات التي لها مجموعة توليد (مخزون أول المدة، تنفيذ أمر، المرتجعات، الاستبدال، فاتورة/مرتجع الشراء، إلخ).

**إنشاء يدوي (Manual Generation)** (`termConfig.generationConfigurations.manualGeneration`) — يُشغَّل التوليد يدوياً (عبر إجراء/زر) بدلاً من التلقائي.

**دفتر المستند المُنشأ (Generation Book)** (`termConfig.generationConfigurations.generationBook`) — الدفتر المخصص للمستند المُنشأ.

**توجيه المستند المُنشأ (Generation Term)** (`termConfig.generationConfigurations.generationTerm`) — التوجيه المخصص للمستند المُنشأ.

**عدم إنشاء المستندات تلقائياً إذا تم إضافة مستندات يدوية (Do Not Generate Documents Automatically If Manual Documents Are Found)** (`termConfig.generationConfigurations.doNotGenDocsIfManualDocsFound`) — يمنع التوليد التلقائي عند وجود مستند لاحق مُنشأ يدوياً بالفعل.

**نوع المستند المُنشأ (Generated Document Type)** (`termConfig.generatedDocumentType`) — نوع الكيان الهدف الذي ينتجه التوليد، على المستندات القابلة للتوليد.

**قائمة القواعد (Rule Set)** (`termConfig.ruleSet`) — قائمة قواعد مُسمّاة لإنشاء المستندات الإضافية تتحكم في أي مستندات إضافية تُنشأ وكيف. استخدمها عندما يكون منطق التوليد أعقد من نوع هدف ثابت واحد.

**حفظ المستندات المُنشأة كمسودة (Save Generated Documents As Draft)** (`termConfig.saveGenDocumentsAsDraft`) — تُحفظ المستندات المُنشأة كمسودات بدلاً من اعتمادها (توقع الشراء الجديد).

### توليد التكلفة الإضافية (Additional Cost)

**إنشاء مستند تكلفة إضافية للاستلام بأصناف الخدمة (Create Receipt Additional Cost With Service Items)** (`termConfig.createReceiptAdditionalCostWithServiceItems`) — عند التوليد، يُنشئ مستند تكلفة إضافية للاستلام من أصناف الخدمة في الفاتورة (فاتورة الشراء).

**دفتر مستند التكلفة الإضافية (Additional Cost Document Book)** (`termConfig.additionalCostDocBook`) — دفتر مستند التكلفة الإضافية المُنشأ (فاتورة الشراء، التجميع).

**توجيه مستند التكلفة الإضافية (Additional Cost Document Term)** (`termConfig.additionalCostDocTerm`) — توجيه مستند التكلفة الإضافية المُنشأ (فاتورة الشراء، التجميع).

### توليد الاستبدال / المبيعات (Replacement / Sales)

**دفتر استلام المُنشأ (Receipt Generation Book)** (`termConfig.receiptGenerationBook`) — دفتر مستند الاستلام المخزني المُنشأ بواسطة الاستبدال (استبدال المبيعات / طلب الاستبدال).

**توجيه استلام المُنشأ (Receipt Generation Term)** (`termConfig.receiptGenerationTerm`) — توجيه ذلك الاستلام المُنشأ.

**دفتر فاتورة المبيعات (Sales Invoice Book)** (`termConfig.salesInvoiceBook`) — دفتر فاتورة المبيعات المُنشأة (استبدال المبيعات، تسليم الأمر).

**توجيه فاتورة المبيعات (Sales Invoice Term)** (`termConfig.salesInvoiceTerm`) — توجيه فاتورة المبيعات المُنشأة.

**دفتر مرتجع المبيعات (Sales Return Book)** (`termConfig.salesReturnBook`) — دفتر مرتجع المبيعات المُنشأ (استبدال المبيعات).

**توجيه مرتجع المبيعات (Sales Return Term)** (`termConfig.salesReturnTerm`) — توجيه مرتجع المبيعات المُنشأ.

**أنواع المستندات المُنشأة من مستند الاستبدال (Generated Document Types From Sales Replacement Document)** (`termConfig.generatedDocsType`) — يحدد أي أنواع مستندات ينتجها الاستبدال (تركيبة مرتجع / فاتورة / استلام).

**طريقة ترميز كوبونات المبيعات (Sales Coupons Coding Method)** (`termConfig.salesCouponsCodingMethod`) — طريقة الترميز المستخدمة عند توليد كوبونات المبيعات من الأمر (أمر بيع الكوبونات).

### توليد توقع الشراء (Purchase Forecast)

تظهر هذه الحقول على مستند توقع الشراء الجديد، الذي يولّد أوامر شراء وطلبات شراء/أصناف.

**دفتر أمر الشراء المُنشأ (Generated Purchase Order Book)** (`termConfig.genPurchaseOrderBook`) — دفتر أمر الشراء المُنشأ من التوقع.

**توجيه أمر الشراء المُنشأ (Generated Purchase Order Term)** (`termConfig.genPurchaseOrderTerm`) — توجيه ذلك أمر الشراء المُنشأ.

**دفتر طلب الشراء المُنشأ (Generated Item Request Book)** (`termConfig.genItemRequestBook`) — دفتر طلب الشراء/الصنف المُنشأ من التوقع.

**توجيه طلب الشراء المُنشأ (Generated Item Request Term)** (`termConfig.genItemRequestTerm`) — توجيه ذلك طلب الشراء المُنشأ.

### توريد أمر الشراء للكميات غير المنفّذة (Purchase-Order Receipt for Unsatisfied Quantities)

تظهر هذه الحقول على توجيه **أمر الشراء**. عند التفعيل، يُبقي الأمر سند توريد مخزني متزامنًا مع أي كمية لا تزال متبقية لديه — يعيد بناءه مع تنفيذ الفواتير اللاحقة للأمر ويحذفه حين لا يبقى شيء. انظر [سند توريد مخزني للجزء غير المنفّذ من أمر الشراء](../development-requests/stock-receipt-for-unsatisfied-order-quantities.md) للقصة الكاملة.

**إنشاء توريد مخزني للكميات الغير منفذة فقط (Generate Stock Receipt For Unsatisfied Quantities)** (`termConfig.genStockReceiptForUnsatisfiedQty`) *(غير مفعّل افتراضياً)* — عند التفعيل، يولّد أمر الشراء سند توريد مخزني تلقائياً ويبقيه يغطي كميات سطوره غير المنفّذة (المتبقية).

**دفتر سند توريد مخزني (Stock Receipt Book)** (`termConfig.stockReceiptBook`) — الدفتر المستخدم لذلك السند المُنشأ. إلزامي عند تفعيل المفتاح أعلاه.

**توجيه سند توريد مخزني (Stock Receipt Term)** (`termConfig.stockReceiptTerm`) — التوجيه المستخدم لذلك السند المُنشأ. إلزامي عند تفعيل المفتاح أعلاه.

### تأريخ وتقسيم توريد فاتورة الشراء (Purchase-Invoice Receipt Dating & Splitting)

تظهر هذه الحقول على توجيه **فاتورة الشراء** وتهذّب سندات التوريد التي تولّدها الفاتورة من سطورها.

**التاريخ الفعلي للتوريد المنشأ هو التاريخ الفعلي لمستند بناءا علي (Use From Document Value Date For Receipt)** (`termConfig.useFromDocValueDateForReceipt`) — يأخذ سند التوريد المُنشأ تاريخه الفعلي من الأمر الذي بُنيت عليه الفاتورة (مستند "بناءً على")، بدلاً من وراثة التاريخ الفعلي للفاتورة نفسها.

**إنشاء سند توريد مخزني لكل سند بالحقل (تم النسخ من سند) (Generate Receipt Document For Each Lines Origin Document)** (`termConfig.genReceiptDocsForLinesOriginDocs`) — يجمّع سندات التوريد المُنشأة حسب المستند المصدر لكل سطر (الأمر الذي نُسخ منه السطر) إضافةً إلى المخزن، فيحصل كل أمر مصدر على سند توريده الخاص بدلاً من سند واحد مجمّع لكل مخزن.

## الإنشاء التلقائي مع الحفظ (Auto-Generate With Save)

تظهر هذه المجموعة فقط لمستندات **BasicSCDocument**. وهي عملية توليد غير متزامنة (حفظ مؤجل) يقودها إجراء على حقل إدخال — مختلفة عن مجموعة التوليد عند الاعتماد أعلاه. فبدلاً من التوليد عند كل حفظ، يمكنها إنشاء أو تحديث مستند مرتبط في الخلفية عند تشغيل الإجراء التالي لحقل معيّن.

**إنشاء المستند مع الزر وليس الحفظ (Generate Document With Button Not Save)** (`termConfig.generateDocWithActionNotSave`) — يُنشأ المستند التلقائي عبر زر/إجراء صريح بدلاً من كل حفظ.

**حفظ أو تحديث المستند المُنشأ بشكل غير متزامن مع إجراء الإدخال (Generate Or Update Auto Generated Document Asynchronous With Input Action)** (`termConfig.generateOrUpdateDocAsyncWithAction`) — يُنشئ أو يحدّث المستند المرتبط بشكل غير متزامن (حفظ مؤجل) عند تشغيل إجراء حقل الإدخال.

**حقل مرجع المستند المُنشأ (Automatic Generated Document Reference Field)** (`termConfig.autoGeneratedDocReferenceField`) — الحقل على هذا المستند الذي يخزّن مرجع الربط بالمستند المُنشأ تلقائياً.

**تشغيل الحفظ المؤجل مع الحقل (Async Save With Field)** (`termConfig.asyncWithActionFieldId`) — حقل الإدخال الذي يُشغّل إجراؤه التالي التوليد المؤجل غير المتزامن.

**نوع المستند المُنشأ تلقائياً (Automatic Generated Type)** (`termConfig.autoGeneratedType`) — نوع كيان المستند المُنشأ تلقائياً.

**دفتر المستند المُنشأ تلقائياً (Automatic Generated Document Book)** (`termConfig.autoGeneratedDocBook`) — دفتر المستند المُنشأ تلقائياً.

**توجيه المستند المُنشأ تلقائياً (Automatic Generated Document Term)** (`termConfig.autoGeneratedDocTerm`) — توجيه المستند المُنشأ تلقائياً.

**تاريخ الإنشاء دائماً ما يبدأ في الساعة (Creation Date Time Always Start At Hour)** (`termConfig.creationAlwaysDateStartAtHour`) — يقيّد تاريخ ووقت إنشاء المستند المُنشأ بحيث لا يكون وقته من اليوم أبكر من هذه الساعة.

**تاريخ الإنشاء دائماً ما ينتهي عند الساعة (Creation Date Time Always End At Hour)** (`termConfig.creationAlwaysDateEndAtHour`) — يقيّد تاريخ ووقت إنشاء المستند المُنشأ بحيث لا يكون وقته من اليوم أبعد من هذه الساعة.
