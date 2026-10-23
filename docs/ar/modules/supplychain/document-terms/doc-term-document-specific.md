---
entities: [DocumentTerm]
menu: الأساسيات ← الإعدادات ← توجيه مستند
---

# خيارات خاصة بأنواع المستندات (Document-Specific)

معظم خيارات توجيه المستند مشتركة بين أنواع المستندات، وقد غطّتها الصفحات الأخرى (عام، بناءً على المستند، متابعة الكميات، الحجز والتسليم، الأسعار/الضرائب/الخصومات، الصنف الفرعي). تجمع هذه الصفحة الخيارات التي تظهر **فقط لأنواع مستندات معينة** — أي تلك التي تظهر على شاشة التوجيه بحسب **نوع المستند** الذي يستهدفه التوجيه.

::: info مكان الإعداد
افتح **توجيه المستند** (توجيه). تظهر الخيارات أدناه فقط عندما يكون **نوع المستند** للتوجيه أحد المستندات المذكورة في كل مجموعة.
:::

![الخيارات الخاصة بالمستند في تبويب الإعدادات بتوجيه التوريد المخزني](../images/document-terms/doc-term-document-specific-ar.png)

## التوريد المخزني (Stock Receipt)

*ينطبق على: التوريد المخزني (Stock Receipt).*

**قابل للإرجاع (Returnable)** `termConfig.config.returnable` — يجعل الأثر المحاسبي للتوريد أثر مردود حتى يُتحقَّق من جانب المورد/العميل وفقاً لذلك.

**حساب التكلفة المؤقتة بناءً على المستند (Calculate Temp Cost By From Doc)** `termConfig.calculateTempCostByFromDoc` — يستخدم تكلفة المستند المبني عليه كتكلفة مؤقتة للتوريد بدلاً من إعادة حسابها.

**السماح بشراء الإصدارات من مورد مختلف** `termConfig.allowRevsionPurchaseFromDifSupplier` — يسمح باستلام إصدار الصنف من مورد غير المورد الافتراضي لذلك الإصدار. وعنوانه على الشاشة الإنجليزية *Prevent Revsion Purchase From Different Supplier*، لكن تفعيله **يسمح** بالشراء ولا يمنعه.

تجعل مجموعة **اعتبار … في التكلفة (Consider … For Cost)** طبقة التكلفة/التقييم تميّز التوريدات حسب المحدد المختار، فتُحسَّب تكلفة الوحدات التي تختلف في ذلك المحدد فقط بشكل منفصل.

| الخيار | معرّف الحقل |
|---|---|
| اعتبار المراجعة في التكلفة (Consider Revision For Cost) | `termConfig.considerRevisionForCost` |
| اعتبار المقاس في التكلفة (Consider Size For Cost) | `termConfig.considerSizeForCost` |
| اعتبار اللون في التكلفة (Consider Color For Cost) | `termConfig.considerColorForCost` |
| اعتبار الصندوق في التكلفة (Consider Box For Cost) | `termConfig.considerBoxForCost` |
| اعتبار رقم اللوت في التكلفة (Consider Lot Id For Cost) | `termConfig.considerLotIdForCost` |
| اعتبار النسبة الفعّالة في التكلفة (Consider Active Percent For Cost) | `termConfig.considerActivePercentForCost` |
| اعتبار النسبة غير الفعّالة في التكلفة (Consider Inactive Percent For Cost) | `termConfig.considerInActivePercentForCost` |
| اعتبار الصنف الفرعي في التكلفة (Consider Sub Item For Cost) | `termConfig.considerSubItemForCost` |

## الصرف المخزني (Stock Issue)

*ينطبق على: الصرف المخزني (Stock Issue).*

**قابل للإرجاع (Returnable)** `termConfig.config.returnable` — يجعل الأثر المحاسبي للصرف أثر مردود؛ يُفحَص عند التحقق من جانب المورد/العميل في المستند.

## التحويل المخزني (Stock Transfer)

*ينطبق على: التحويل المخزني (Stock Transfer).*

**نوع التحويل (Transfer Type)** `termConfig.transferType` — يصنّف التحويل (مثل داخلي مقابل بين الفروع)، وهو ما يتحكم في آثاره.

**صلاحية عكس التحويل (Reverse Transfer Capability)** `termConfig.reverseTransferCapability` — الصلاحية الأمنية المطلوبة لعكس/إلغاء التحويل.

**نوع التحويل الداخلي (Internal Transfer Type)** `termConfig.internalTransferType` — تصنيف فرعي للتحويلات الداخلية يحكم المعالجة من مخزن إلى مخزن.

## المردودات (Returns)

*ينطبق على: مردود المبيعات ومردود المشتريات (Sales Return / Purchase Return).*

**نوع المردود (Return Type)** `termConfig.returnType` — يحدد نمط المردود، ويؤثر على التسعير والمعالجة المخزنية (مردود مبيعات).

**طريقة حساب الفاتورة (Invoice Calculation)** `termConfig.sourceInvoiceCalculation` — يتحكم في كيفية إعادة حساب القيم مقابل الفاتورة المصدر (تناسبي، بناءً على المستند، أو معاد الحساب).

**استخدام المستند المبني عليه لأعمار الديون (Use From Doc For Debt Ages)** `termConfig.useFromDocForDebitAges` — يستخدم تواريخ المستند الأصلي لتقادم الديون بدلاً من تاريخ المردود نفسه.

**السماح بإرجاع فواتير لم يُصرف منها (Allow Return Not Issued Invoices)** `termConfig.allowReturnNotIssuedInvoices` — يسمح بالإرجاع مقابل فواتير لم تُصرف بضاعتها من المخزن (مردود مبيعات).

**منع إرجاع الفاتورة إذا وُجدت أصناف مجانية (Prevent Return Invoice If Free Items Found)** `termConfig.preventReturnInvoiceIfFreeItemsFound` — يمنع إرجاع فاتورة تحتوي على أصناف مجانية/ترويجية (مردود مبيعات).

**إعادة إنشاء مستند مخزون الفاتورة عند حفظ فاتورة المردود (Recreate Invoice Stock Document With Return Invoice Saving)** `termConfig.recreateInvStockDocWithReturnInv` — يعيد إنشاء مستند مخزون الفاتورة الأصلية عند حفظ فاتورة المردود (مردود مشتريات).

## المردودات والإحلال — الكوبونات والدفع (Returns & Replacement — Coupons & Payment)

*ينطبق على: مردود المبيعات / مردود المشتريات / مردود مشتريات مركز الخدمة ومستندات طلباتها.*

**تعليم الكوبون المنشأ بفاتورة المردود كمستخدم (Mark Generated Coupon By Returned Invoice As Used)** `termConfig.markGeneratedCouponByReturnedInvoiceAsUsed` — يعلّم الكوبونات التي أنشأتها الفاتورة المرتجعة كمستخدمة لمنع إعادة استعمالها.

**منع إرجاع الفاتورة بكوبون منشأ مستخدم (Prevent Return Invoice With Used Generated Coupon)** `termConfig.preventReturnInvoiceWithUsedGeneratedCoupon` — يمنع إرجاع فاتورة استُخدم كوبونها المنشأ بالفعل.

**إضافة المردود إلى سندات دفع الفاتورة وخصم المتبقي (Add Return To Invoice Payment Docs and Decrease Remaining)** `termConfig.addReturnToInvoicePayment` — يضيف قيمة المردود إلى سندات دفع الفاتورة ويخفّض رصيدها المتبقي.

**سداد أقساط الفاتورة بفاتورة المردود (Payment Of Invoice Installments With Return Invoice)** `termConfig.allowPaymentOfInvoiceInstallementsWithReturn` — يسمح للمردود بسداد أقساط الفاتورة.

## إحلال المبيعات (Sales Replacement)

*ينطبق على: إحلال المبيعات (Sales Replacement) ومستندات طلبات الإحلال.*

**يجب وجود سطور بيع وسطور مردود (Must Have Sales And Return Lines)** `termConfig.mustHaveSalesAndReturnLines` — يشترط أن يحتوي مستند الإحلال على سطر بيع وسطر مردود معاً.

**منع الحفظ إذا لم يوجد الصنف المُحلَّل في المستند المبني عليه (Prevent Save If Replaced Item Not Exist In From Doc)** `termConfig.preventSaveIfReplacedItemNotExistInFromDoc` — يمنع الحفظ عند عدم العثور على الصنف المُحلَّل في المستند المبني عليه.

## الفواتير (Invoices)

*ينطبق على: فاتورة المبيعات وفاتورة المشتريات (Sales Invoice / Purchase Invoice) كما هو موضّح بجانب كل خيار.*

**يجب تطابق كمية الفاتورة مع المستند المخزني (Quantity Of Invoice Should Match Stock Document)** `termConfig.quantityOfInvoiceShouldMatchStockDocument` — يتحقق من تساوي كميات الفاتورة مع كميات المستند المخزني المرتبط (فاتورة مشتريات).

**توزيع التكلفة بناءً على كمية التوريد (Distribute Cost Based On Receipt Quantity)** `termConfig.distributeCostBasedOnReceiptQty` — يوزّع التكلفة الإضافية على السطور بترجيح الكمية المستلمة (فاتورة مشتريات).

**استخدام بضائع خارجية (Use External Wares)** `termConfig.useExtenalWares` — يعامل المخزون كبضائع خارجية/غير نظامية فيتخطى التحقق المخزني الداخلي (فاتورة/مردود مشتريات ومردود مبيعات).

**عن السنة السابقة (For Previous Year)** `termConfig.previousYear` — يعلّم الفاتورة بأنها تخص السنة المالية السابقة لأغراض المحاسبة والتقادم.

**آجل (Credit)** `termConfig.creditInvoice` — يعامل الفاتورة كفاتورة آجلة (بيع آجل).

**فرد مكونات الصنف المجمع مع الحفظ (Spread Assembly Components With Save)** `termConfig.spreadAssemblyComponentsWithSave` — للصنف الذي له **طريقة فرد مكونات الصنف المجمع**، يضيف حفظ مستند المبيعات مكونات تلك الطريقة سطورًا مجانية تحت سطر الصنف، ويُستبعد سطر الصنف نفسه من سند الصرف المنشأ، فيخرج المخزون على هيئة المكونات (مستندات المبيعات).

**فرد مكونات الصنف المجمع مع الإدخال (Spread Assembly Components With Insert)** `termConfig.spreadAssemblyComponentsWithInsert` — يضيف سطور المكونات على الشاشة تحت سطر الصنف بمجرد أن يحمل السطر الصنف والكمية معًا، فيرى المستخدم المكونات قبل الحفظ، ولا يعيد الحفظ فرد الصنف مرة ثانية. أبقِ خيار **…مع الحفظ** مفعّلًا أيضًا، فهو الذي يستبعد سطر الصنف نفسه من سند الصرف (مستندات المبيعات).

**حقل الصنف البديل للمكونات (Bom Alt Item Field)** `termConfig.bomAltItemField` — يحدد أحد أعمدة المراجع في السطر (مرجع 1–4) مكانًا لصنف بديل. فإذا احتوى ذلك العمود صنفًا، صار الأثر المخزني والتكلفة للسطر، في الصرف وفي الإرجاع، على ذلك الصنف بدلًا من صنف السطر، بمقاس السطر ولونه وإصداره. ويُقرأ الخيار من توجيه المستند نفسه، ثم من توجيهات المستندات الأعلى في سلسلة **بناءا على** (الفواتير).

## مستندات الإلغاء (Cancellation Documents)

*ينطبق على: مستند إلغاء الحجز ومستند إلغاء التسليم (Reservation Cancellation / Delivery Cancellation).*

**إعادة حفظ المستندات الأعلي من النوع (Re-commit Upper Document Of Type)** `termConfig.recommitUpperDocumentOfType` — بعد الإلغاء، يعيد حفظ المستند الأب/الأعلى من نوع الكيان المحدد.

**حذف السطر المبني على المستند إذا كانت الكمية المحجوزة صفراً (Remove Line With From Document If Reserved Quantity Is Zero)** `termConfig.removeLineWithFromDocIfReservedQtyIsZero` — يحذف السطر المرتبط بالمستند المبني عليه عندما تصبح كميته المحجوزة صفراً (إلغاء حجز).

## التجميع والتجميع المتعدد (Assembly / Multi-Assembly)

*ينطبق على: مستند التجميع (Assembly) والتجميع المتعدد (Multi-Assembly) كما هو موضّح بجانب كل خيار.*

**حساب كمية قائمة المكونات من المنتجات المصاحبة (Calculate BOM Qty From Co-Products)** `termConfig.calculateBOMQtyFromCoProducts` — يشتق كميات قائمة المكونات من كميات مخرجات المنتجات المصاحبة (تجميع).

**إعادة توزيع سطور الصرف عند تغيّر كمية المنتجات المصاحبة (Spread Issue Lines When Co-Products Qty Changed)** `termConfig.spreadIssueLinesWhenCoProductsQtyChanged` — يعيد توزيع سطور المواد المصروفة عند تغيّر كميات المنتجات المصاحبة (تجميع).

**استخدام التفاصيل المخططة في حساب التكلفة (Use Planned Details For Cost Calculation)** `termConfig.usePlannedDetailsForCostCalculation` — يستخدم التفاصيل المخططة (لا الفعلية) عند حساب التكلفة (تجميع).

**توزيع التكلفة بمتوسط سعر البيع (Distribute Cost By Avg Sales Price)** `termConfig.distributeCostByAvgSalesPrice` — يوزّع التكلفة المشتركة على المنتجات حسب متوسط سعر بيعها (تجميع).

**حساب المنتجات المصاحبة من قائمة تجميع الصنف المصروف (Calculate Co-Products From Issued Item Assembly BOM)** `termConfig.calculateCoProductsFromIssuedItemAssemblyBom` — يحسب المنتجات المصاحبة من قائمة تجميع الصنف المصروف (تجميع).

**السماح بصرف وتوريد نفس الصنف في مستند التجميع نفسه (Allow Issue And Receipt The Same Item In The Same Assembly Doc)** `termConfig.allowIssueAndReceiptTheSameItemInTheSameAssemblyDoc` — يسمح بصرف وتوريد نفس الصنف ضمن مستند تجميع واحد (تجميع).

**منع الحفظ إذا لم يكن المنتج المصاحب ضمن عمليات التجميع (Prevent Save If Co-Product Not In Assembly Operations)** `termConfig.preventSaveIfCoProdNotInAssemblyOperations` — يمنع الحفظ عندما لا يكون المنتج المصاحب جزءاً من عمليات التجميع (تجميع).

**توزيع التكلفة على سطر المنتج المصاحب المصدر فقط (Distribute Cost On Source Co-Product Line Only)** `termConfig.distributeCostOnSourceCoProdLineOnly` — يقصر توزيع التكلفة على سطر المنتج المصاحب المصدر (تجميع).

**منع الحفظ بدون أصناف مصروفة عند استخدام قائمة المكونات (Prevent Save Without Issued Items If Using BOM)** `termConfig.preventSaveWithoutIssuedItemsIfUsingBOM` — يمنع الحفظ بدون أصناف مصروفة عند استخدام طريقة تجميع بقائمة مكونات (تجميع).

**حساب متوسط سعر البيع من تكلفة صرف التفكيك (Calc Average Sales Price From Disassembly Issue Cost)** `termConfig.calcAverageSalesPriceFromDisAssemblyIssueCost` — يشتق متوسط سعر البيع من تكلفة صرف التفكيك (تجميع).

**عدم تأثير كمية الاستلام الفعلية على الكمية المسحوبة (Do Not Affect Issued Qty By Actual Receipt Qty)** `termConfig.doNotAffectDetailsQtyByActualReceiptQty` — في الوضع الافتراضي تُعاد كميات الأصناف المسحوبة (كميات التفاصيل) بناءً على كمية المنتج النهائي المستلمة فعليًا. وعند تفعيل هذا الخيار تبقى الكميات المسحوبة محسوبة من كمية التجميع، فلا يؤدي تعديل كمية الاستلام الفعلية إلى تغيير الكميات المسحوبة (تجميع).

**إنشاء مستند للسطور التي لها حالة (Create Document For Lines Which Have Status)** `termConfig.createDocLineWithStatus` — ينشئ مستندات التجميع فقط للسطور عند الحالة المختارة (تجميع متعدد).

**استخدام الكمية المطلوبة للمواد النهائية (Use Required Quantity For Final Materials)** `termConfig.useRequiredQtyForFinalMaterials` — يستخدم الكمية المطلوبة (المخططة) لاستهلاك المواد النهائية (تجميع متعدد).

**دفتر مستند التجميع (Assembly Document Book)** `termConfig.assemblyDocumentBook` — دفتر مستندات التجميع المُنشأة من التجميع المتعدد.

**توجيه مستند التجميع (Assembly Document Term)** `termConfig.assemblyDocumentTerm` — توجيه مستندات التجميع المُنشأة تلك.

**فرد سطور (بناءا على) إلى الأصناف الرئيسية (Spread From Document Lines To Main Items)** `termConfig.addFromDocLinesToMainItems` — ينسخ سطور مستند **بناءا على** إلى جدول **الأصناف الرئيسية** بدلًا من **التفاصيل**، وتتبع متابعة الكميات مقابل المصدر حينئذٍ سطور الأصناف الرئيسية (تجميع متعدد).

**فرد الأصناف المخزنية فقط من (بناءا على) (Spread Only Stock Items From Document)** `termConfig.spreadOnlyStockItemsFromDoc` — لا ينسخ من مستند **بناءا على** إلا الأصناف المخزنية، ويتجاوز سطور الخدمات (تجميع متعدد).

**حفظ كل سندات التجميع كمسودات (Save All Assembly Documents As Drafts)** `termConfig.saveAllAssemblyDocumentsAsDrafts` — يعلّم **الحفظ كمسودة** على كل السطور، فتُحفظ سندات التجميع المنشأة مسودات (تجميع متعدد). انظر [التجميع متعدد المستويات والتعبئة المجمّعة](../assembly-and-packaging/multi-level-and-aggregated-assembly.md).

## أمر تشغيل الزجاج (Glass Job Order)

*ينطبق على: أمر تشغيل الزجاج (Glass Job Order).*

**فرض قائمة الأسعار (Force Price List)** `termConfig.forcePriceList` — يفرض أن تأتي أسعار السطور من قائمة أسعار.

**عدم التحقق من الأصناف التي ليس لها قائمة أسعار (Do Not Check Items Without Price List)** `termConfig.doNotCheckItemsWithoutPriceList` — يتخطى التحقق من وجوب أن يكون للأصناف بند في قائمة الأسعار.

**عدم فرض قائمة الأسعار عند وجود مستند مبيعات في المبني عليه (Do Not Force Price List When There Sales Doc In From Doc)** `termConfig.doNotForcePriceListWhenThereSalesDocInFromDoc` — يخفّف فرض قائمة الأسعار عندما يكون المستند المبني عليه مستند مبيعات.

**تجاهل السعر الحالي عند حساب الأسعار (Ignore Current Price When Calculating Prices)** `termConfig.ignoreCurrentPriceWhenCalculatingPrices` — يتجاهل الأسعار الموجودة أثناء إعادة الحساب.

**الاعتماد غير مطلوب (Approval Not Required)** `termConfig.approvalNotRequired` — يتخطى خطوة الاعتماد.

**الإنهاء غير مطلوب (Finish Not Required)** `termConfig.finishNotRequired` — يتخطى خطوة الإنهاء.

**دفتر الصرف المخزني (Stock Issue Book)** `termConfig.stockIssueBook` — دفتر الصرف المخزني المُنشأ من أمر التشغيل.

**توجيه الصرف المخزني (Stock Issue Term)** `termConfig.stockIssueTerm` — توجيه ذلك الصرف المخزني المُنشأ.

## تسليم/تنفيذ/إنهاء الأمر (Order Delivery / Execution / Finished)

*ينطبق على: تسليم الأمر (Order Delivery) وتنفيذ الأمر (Order Execution).*

**التعبئة التلقائية لأصناف الأمر (Automatic Fill Order Items)** `termConfig.automaticFillOrderItems` — يملأ سطور التسليم تلقائياً من أصناف الأمر (تسليم أمر).

**التسليم التلقائي (Automatic Delivery)** `termConfig.automaticFinished` — ينشئ مستند إنهاء الأمر تلقائياً عند التسليم (تسليم أمر).

**دفتر إنهاء الأمر (Order Finish Book)** `termConfig.finishBook` — دفتر مستند إنهاء الأمر المُنشأ.

**توجيه إنهاء الأمر (Order Finish Term)** `termConfig.finishTerm` — توجيه مستند إنهاء الأمر المُنشأ.

**مخزن الإنهاء (Finishing Warehouse)** `termConfig.finishingWarehouse` — المخزن المستخدم في خطوة الإنهاء.

**الدفع مع الفاتورة (Payment With Invoice)** `termConfig.paymentWithInvoice` — يلتقط الدفع مع فاتورة المبيعات المُنشأة.

**فاتورة مبيعات تلقائية (Automatic Sales Invoice)** `termConfig.automaticSalesInvoice` — ينشئ فاتورة مبيعات تلقائياً عند التسليم (باستخدام `termConfig.salesInvoiceBook` / `termConfig.salesInvoiceTerm`).

**نمط التكلفة (Cost Mode)** `termConfig.costMode` — يحدد كيفية حساب تكلفة التنفيذ (تنفيذ أمر).

## بدء الجرد (Start Stock Taking)

*ينطبق على: بدء الجرد (Start Stock Taking).*

**استراتيجية الأصناف المفقودة (Missing Items Strategy)** `termConfig.missingItemsStrategy` — يتحكم في معالجة الأصناف الموجودة في المخزون والغائبة عن الجرد.

**حساب رصيد النظام (System Stock Calculation)** `termConfig.stockCalculation` — الطريقة المستخدمة لحساب رصيد النظام (الدفتري) للمقارنة.

**عرض الأصناف التي لها تفاصيل جرد فقط (Show Only Items That Have Stock Taking Details)** `termConfig.showOnlyItemsThatHaveStockTakingDetail` — يقصر قائمة الجرد على الأصناف التي لها سطر تفاصيل جرد بالفعل.

تستخدم مستندات تسوية المخزون المُنشأة هذه الدفاتر والتوجيهات:

| الخيار | معرّف الحقل |
|---|---|
| دفتر الصرف المخزني (Stock Issue Book) | `termConfig.issueBook` |
| توجيه الصرف المخزني (Stock Issue Term) | `termConfig.issueTerm` |
| دفتر التوريد المخزني (Stock Receipt Book) | `termConfig.receiptBook` |
| توجيه التوريد المخزني (Stock Receipt Term) | `termConfig.receiptTerm` |

## مراقبة/ضمان الجودة (Quality Control / Assurance)

*ينطبق على: مستند مراقبة الجودة ومستند ضمان الجودة (Quality Control / Quality Assurance).*

**استخدام تفاصيل المسار لأمر الإنتاج (Use Routing Details For Production Order)** `termConfig.useRoutingDetailsForProductionOrder` — يسحب تفاصيل المسار/العمليات من أمر الإنتاج المرتبط إلى مستند الجودة.

## تقطيع الأصناف (Item Cutting)

*ينطبق على: مستند تقطيع الأصناف (Item Cutting).*

**دفتر مستند التجميع المُنشأ (Generated Assembly Document Book)** `termConfig.generatedDocAssembBook` — دفتر مستند التجميع المُنشأ من مستند التقطيع.

**توجيه مستند التجميع المُنشأ (Generated Assembly Document Term)** `termConfig.generatedDocAssembTerm` — توجيه مستند التجميع المُنشأ ذاك.
