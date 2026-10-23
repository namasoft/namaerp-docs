---
entities: [DocumentTerm]
menu: الأساسيات ← الإعدادات ← توجيه مستند
---

# إعدادات النسخ من المستند (From-Document)

**المستند المصدر** (بناءً على / from document) هو المستند الذي يُنشأ منه المستند الجديد — مثل أمر بيع تُبنى عليه فاتورة مبيعات. يتحكم هذا التبويب من توجيه المستند في كيفية نسخ وربط سطور المستند المصدر وكمياته وأسعاره داخل المستند الجديد، وكيفية تجميع السطور المنسوخة وفلترتها، وأي السطور المرتبطة تُقفل ضد التعديل.

::: info مكان الإعداد
افتح **توجيه المستند** (توجيه) ثم تبويب **بناءً على** (From Document).
:::

![تبويب بناءً على في توجيه فاتورة المبيعات](../images/document-terms/doc-term-from-document-ar.png)

## النسخ من المستند المصدر (Copying from the Source Document)

تتحكم هذه المفاتيح في ما يُسحب من المستند المصدر وكيفية نقل الكميات والأسعار.

**التحقق من التوافق (Consistency with from Doc)** `termConfig.consistencyWithFromDoc` — يتحكم في كيفية التحقق من توافق سطور/كميات المستند الجديد مع المستند المصدر: `Ignore` (بلا تحقق)، `NetQuantities` (يجب توافق الإجماليات)، أو `LinePerLine` (مطابقة كل سطر بسطره المصدر).

**نسخ التفاصيل (Copy details)** `termConfig.copyDetailsOfFromDoc` *(مفعّل افتراضياً)* — عند اختيار مستند "بناءً على" تُنسخ سطور تفاصيله إلى المستند الجديد. وعند إيقافه يُنشأ ربط الرأس فقط دون سحب أي سطور.

**اعتبار الكميات المسلمة في بناءً على (Consider Satisfied Qties In From Doc)** `termConfig.considerSatisfiedQtiesInFromDoc` — عند نسخ الكميات المتبقية من المصدر، يخصم الكميات التي تمت تلبيتها (تسليمها/فوترتها) في مستندات أخرى مرتبطة، فلا يُنقل إلا الرصيد المتبقي.

**حقول اعتبار الكميات المسلمة في بناءً على (Consider Satisfied Qties In From Doc Fields)** `termConfig.considerSatisfiedQtiesInFromDocFields` — يحدد أي حقول متابعة الكميات تُستخدم عند حساب الكمية "المُلبّاة سابقاً" للخيار أعلاه.

**عدم نسخ الكمية عند اختيار بناءً على (Do Not Copy Quantity With From Doc)** `termConfig.doNotCopyQuantityWithFromDoc` — ينسخ بيانات السطر من المصدر ولكنه يترك الكمية فارغة بدلاً من نقل كمية المصدر.

**نسخ الكمية إلى (Copy Quantity To Field With From Doc)** `termConfig.copyQuantityToFieldWithFromDoc` — بدلاً من حقل الكمية الاعتيادي (أو بالإضافة إليه)، ينسخ كمية المصدر إلى معرّف الحقل الهدف المحدد على السطر الجديد.

**جعل الكمية صفر مع بناءً على (Make Qty Zero With From Doc)** `termConfig.makeQtyZeroWithFromDoc` — ينسخ السطور من المصدر لكنه يصفّر كمية كل سطر منسوخ، فيُدخل المستخدم الكميات يدوياً.

**جعل الكمية واحد مع اختيار الصنف الذي له سطر في بناءً على (Make Quantity One With Selection Of The Item That Has Line In FromDoc)** `termConfig.makeQtyOneWithSelectionOfTheItemThatHasLineInFromDoc` — عند اختيار صنف له سطر مقابل في المستند المصدر، تكون الكمية الافتراضية لذلك السطر 1 بدلاً من نسخ كمية المصدر.

**نسخ بيانات سطر واحد فقط من بناءً على مع الصنف بدون تكرار (Copy One Line Details Of FromDoc For Item Without Repeat)** `termConfig.copyOneLineDetailsOfFromDocForItemWithoutRepeat` — عند ظهور صنف على عدة سطور مصدر، يُنسخ التفاصيل من سطر مصدر واحد فقط لذلك الصنف، تجنباً لتكرار السطور.

**ملء بيانات الصنف في السطر عند إضافة هذا الصنف من بناءً على (Spread Selected Item Data When Item Of From Doc Added)** `termConfig.spreadSelectedItemDataWhenItemOfFromDocAdded` — عند إضافة صنف من المستند المصدر إلى سطر، يملأ تلقائياً بيانات الصنف على السطر (السعر، الوحدة، المحددات، إلخ).

**فرد سطور لإصدارات الصنف (Spread Item Revision Lines)** `termConfig.spreadItemRevisionLines` — يفكّ سطر الصنف الواحد إلى سطر لكل إصدار من إصدارات الصنف عند النسخ/الإضافة.

**فرد سطور لمقاسات وألوان الصنف (Spread Item Colors And Sizes Lines)** `termConfig.spreadItemColorAnsSizeLines` — يفكّ سطر الصنف الواحد إلى سطر لكل تركيبة لون/مقاس.

**تشغيل الإجراء اللاحق لحقل بعد فرد الإصدارات أو المقاسات (Call Post Action Of Field After Spreading Revisions Or Sizes)** `termConfig.callPostActionOfFieldAfterSpreadingRevisionsOrSizes` — بعد فرد سطور الإصدار/اللون/المقاس، يشغّل الإجراء اللاحق لمعرّف الحقل المحدد على السطور المُنشأة (مثل إعادة حساب الأسعار).

**نسخ السعر من المستند الأعلى مع بناءً على (Copy Price From Parent Document With From Document)** `termConfig.copyPriceFromParentDocWithFromDoc` — يأخذ سعر الوحدة من المستند الأعلى/المصدر بدلاً من إعادة حسابه. للفواتير فقط.

**ناسخ الحقول الإضافية من بناءً على (Extra From Doc Fields Copier)** `termConfig.extraFromDocFieldsCopier` — خريطة حقول نصية حرة من أزواج إضافية `sourceField=targetField` تُنسخ من المستند المصدر (الرأس والتفاصيل) إضافة إلى الحقول المنسوخة القياسية.

**منع ملء رقم الشحنة طبقاً لتاريخ الانتهاء إن كان حقل الشحنة فارغاً (Prevent Fill Lot Id According To Expiry Date If Empty)** `termConfig.preventFillLotIdAccordingToExpiryDateIfEmpty` — يعطّل السلوك الافتراضي الذي يشتق رقم الشحنة/الدفعة من تاريخ الانتهاء عندما يكون حقل الشحنة فارغاً.

**السماح بعمل فاتورة مستند على عرض سعر منتهي (Allow Creating Document From Expired Quotation)** `termConfig.allowCreatingDocumentFromExpiredQuotation` — افتراضيًا يجب أن يقع التاريخ الفعلي لمستند المبيعات المنشأ بناءً على عرض أسعار داخل مدى **صالح من** / **صالح حتي** في العرض، وإلا رُفض الحفظ بالرسالة «التاريخ الفعلي يجب ان يكون في المدي المحدد في صالح من و صالح إلي في عرض الأسعار». فعّل هذا الخيار في توجيه المستند الجديد لقبول العروض المنتهية. لمستندات المبيعات فقط.

**السماح بإدخال كود واسم صنف بدون اختيار صنف (Allow Item Code And Name Without An Item)** `termConfig.allowItemCodeAndNameWithoutAnItem` — يسمح بكتابة كود/اسم صنف حر على السطر دون اختيار سجل صنف مُسجّل.

**عدم نسخ بنود العقد عند اختياره (Do Not Copy Contract Terms When Selected)** `termConfig.doNotCopyContractTermsWhenSelected` — عندما يكون المصدر عقداً، يمنع نسخ بنود/شروط العقد إلى المستند الجديد. لمستندات خامات المقاولات فقط.

## فلترة السطور التي تُجمع (Filtering Which Lines Are Collected)

تقيّد هذه الخيارات أي سطور مصدر (وأي مستندات مصدر) تُجلب إلى المستند الجديد.

**نسخ السطور التي تحتوي على الصنف المختار فقط عند اختيار سند "تم النسخ من" (Fetch Only Lines Matching Selected Item When Origin Document is Selected)** `termConfig.fetchOnlyLinesMatchingItemFromOriginDoc` — عند اختيار مستند مصدر، يُنسخ فقط سطور المصدر التي يطابق صنفها الصنف الموجود على السطر الحالي، بدلاً من كل السطور.

**عرض الأصناف الموجودة في المستند على السطر أو بناءً على فقط (Show Only Items In OriginDoc Or FromDoc)** `termConfig.showOnlyItemsInOriginDocOrFromDoc` — يقصر اختيار الأصناف على السطور على الأصناف الموجودة في المستند المصدر / بناءً على فقط.

**فلترة السطور بنفس المخزن من رأس السند مع بناءً على (Filter Lines With Same Warehouse From Doc Header)** `termConfig.filterFromDocLinesByHeaderWarehouse` — عند سحب سطور بناءً على، يجلب فقط السطور التي يساوي مخزنها مخزن رأس المستند الحالي.

**عدم نسخ مخزن رأس المستند من بناءً على (Do Not Copy From Document Header Warehouse)** `termConfig.doNotCopyFromDocHeaderWarehouse` — عند النسخ من المصدر، لا ينقل مخزن رأس المصدر إلى رأس المستند الجديد.

**البحث بالمورد داخل حقل بناءً على (Filter From Doc By Supplier)** `termConfig.filterFromDocBySupplier` — يقصر البحث عن المستند المصدر على المستندات المطابقة لمورد المستند الحالي.

**البحث بالعميل داخل حقل بناءً على (Filter From Doc By Customer)** `termConfig.filterFromDocByCustomer` — يقصر البحث عن المستند المصدر على المستندات المطابقة لعميل المستند الحالي.

**عدم تفريغ حقل الذمة مع اختيار العميل أو المورد (Do Not Empty Subsidiary With Choosing Supplier Or Customer)** `termConfig.doNotEmptySubsidiaryWithSupplierOrCustomer` — يمنع تفريغ حقل الذمة (الحساب المحاسبي) عند اختيار مورد/عميل.

**الفلترة على الأصناف المختارة فقط في السطور مع بناءً على (Filter On Selected Items Only With From Doc)** `termConfig.filterOnSelectedItemsOnlyWithFromDoc` — عند النسخ، يجلب فقط سطور المصدر للأصناف المُدخلة بالفعل على المستند الحالي.

**عرض اوامر الشراء التي بها كميات غير منفذه فقط في بناءا علي (Show Only Orders With Unsatisfied Quantities In FromDoc)** `termConfig.showOnlyOrdersWithUnsatisfiedQtyInFromDoc` — يقصر بحث "بناءً على" / المستند المصدر على الأوامر التي لا تزال بها كمية غير منفّذة (متبقية)، مُخفيًا الأوامر المنفّذة بالكامل. وعند تشغيل البحث من سطر بعينه، تُضيَّق النتائج أكثر إلى الأوامر التي بها كمية متبقية لصنف ذلك السطر.

تقصر الخيارات التالية النسخ على سطور المصدر التي يطابق محددها المحاسبي محدد المستند الحالي.

| الخيار | معرّف الحقل |
|---|---|
| الفلترة على السطور المطابقة لنفس المجموعة التحليلية مع بناءً على | `termConfig.filterLinesWithSameAnalysisSetWithFromDoc` |
| الفلترة على السطور المطابقة لنفس الفرع مع بناءً على | `termConfig.filterLinesWithSameBranchWithFromDoc` |
| الفلترة على السطور المطابقة لنفس الإدارة مع بناءً على | `termConfig.filterLinesWithSameDepartmentWithFromDoc` |
| الفلترة على السطور المطابقة لنفس القطاع مع بناءً على | `termConfig.filterLinesWithSameSectorWithFromDoc` |

## تجميع ودمج السطور المتشابهة (Collecting & Merging Similar Lines)

يدمج مفتاح **تجميع السطور المتشابهة مع بناءً على** (`termConfig.collectSimilarFromDocLines`) سطور المصدر المتشابهة في سطر واحد عند النسخ. تتحكم الخيارات أدناه — ضمن `termConfig.fromDocLinesCollectionOptions.*` — في مفتاح مقارنة "نفس السطر": كل علامة `doNotConsider*` مفعّلة تُزيل ذلك المحدد من المفتاح، فتُدمج السطور التي لا تختلف إلا في ذلك المحدد.

| الخيار | معرّف الحقل |
|---|---|
| عدم اعتبار المقاس | `termConfig.fromDocLinesCollectionOptions.doNotConsiderSize` |
| عدم اعتبار اللون | `termConfig.fromDocLinesCollectionOptions.doNotConsiderColor` |
| عدم اعتبار الإصدار | `termConfig.fromDocLinesCollectionOptions.doNotConsiderRevisionId` |
| عدم اعتبار الصندوق | `termConfig.fromDocLinesCollectionOptions.doNotConsiderBox` |
| عدم اعتبار الشحنة | `termConfig.fromDocLinesCollectionOptions.doNotConsiderLotId` |
| عدم اعتبار النسبة الفعالة | `termConfig.fromDocLinesCollectionOptions.doNotConsiderActivePercent` |
| عدم اعتبار النسبة غير الفعالة | `termConfig.fromDocLinesCollectionOptions.doNotConsiderInActivePercent` |
| عدم اعتبار الصنف الفرعي | `termConfig.fromDocLinesCollectionOptions.doNotConsiderSubItem` |
| عدم اعتبار المخزن | `termConfig.fromDocLinesCollectionOptions.doNotConsiderWarehouse` |
| عدم اعتبار الأبعاد | `termConfig.fromDocLinesCollectionOptions.doNotConsiderMeasures` |
| عدم اعتبار الرقم المسلسل | `termConfig.fromDocLinesCollectionOptions.doNotConsiderSerial` |
| عدم اعتبار الموقع | `termConfig.fromDocLinesCollectionOptions.doNotConsiderLocator` |

## قفل السطور المرتبطة (Locking Linked Lines)

يقفل المفتاح الرئيسي **منع تعديل خصائص السطور المرتبطة ببناءً على** (`termConfig.propertiesOfLinesLinkedToFromDoc.preventEditingLinesLinkedToFromDoc`) السطور المرتبطة بمستند مصدر ضد التعديل. تحدد علامات `consider*` أدناه — ضمن `termConfig.propertiesOfLinesLinkedToFromDoc.*` — أي المحددات تُفحص عند تحديد تلك السطور المرتبطة وقفلها.

| الخيار | معرّف الحقل |
|---|---|
| منع تعديل خصائص السطور المرتبطة ببناءً على | `termConfig.propertiesOfLinesLinkedToFromDoc.preventEditingLinesLinkedToFromDoc` |
| اعتبار الشحنة | `termConfig.propertiesOfLinesLinkedToFromDoc.considerLotId` |
| اعتبار الإصدار | `termConfig.propertiesOfLinesLinkedToFromDoc.considerRevisionId` |
| اعتبار النسبة الفعالة | `termConfig.propertiesOfLinesLinkedToFromDoc.considerActivePercentage` |
| اعتبار النسبة غير الفعالة | `termConfig.propertiesOfLinesLinkedToFromDoc.considerInActivePercentage` |
| اعتبار الصندوق | `termConfig.propertiesOfLinesLinkedToFromDoc.considerBox` |
| اعتبار اللون | `termConfig.propertiesOfLinesLinkedToFromDoc.considerColor` |
| اعتبار المقاس | `termConfig.propertiesOfLinesLinkedToFromDoc.considerSize` |
| اعتبار الموقع | `termConfig.propertiesOfLinesLinkedToFromDoc.considerLocator` |
| اعتبار المقاسات | `termConfig.propertiesOfLinesLinkedToFromDoc.considerMeasures` |
| اعتبار الرقم المسلسل | `termConfig.propertiesOfLinesLinkedToFromDoc.considerSerial` |
| اعتبار المخزن | `termConfig.propertiesOfLinesLinkedToFromDoc.considerWarehouse` |

## الحقول التي لا تُنسخ (Fields Not Copied)

**عدم نسخ الحقول مع بناءً على (Do Not Copy Fields With From Doc)** `termConfig.doNotCopyFieldsWithFromDoc` *(جدول)* — يسرد حقولاً محددة يجب ألا تُنسخ من المستند المصدر. كل سطر يسمّي حقلاً واحداً (العمود `fieldID`، المعرّف `termConfig.doNotCopyFieldsWithFromDoc.fieldID`) يُستثنى عند نسخ البيانات من بناءً على.

## معايير الإنشاء (Creation Criteria)

**تعريفات المعايير (Criteria Definitions)** `termConfig.criteriaDefinitions` *(جدول)* — يعرّف قواعد نسخ لكل نوع هدف: عند تطابق معيار، يستخدم النوع المنشأ المُسمّى ناسخ الحقول الإضافية المحدد.

| العمود | معرّف الحقل | المعنى |
|---|---|---|
| نوع المستند المنشأ | `termConfig.criteriaDefinitions.createdType` | نوع المستند/الكيان الهدف الذي تنطبق عليه القاعدة. |
| عندما | `termConfig.criteriaDefinitions.whenCondition` | المعيار/الفلتر الذي تنطلق عنده قاعدة النسخ. |
| الحقول الإضافية عند النسخ | `termConfig.criteriaDefinitions.copierExtraFields` | مجموعة الحقول الإضافية التي تُنسخ عند تطابق القاعدة. |

## تجميع السندات المخزنية في الفواتير (Stock-Document Collection in Invoices)

عندما تجمع فاتورة أو مرتجع السندات المخزنية تلقائياً (تربطها)، تتحكم هذه الخيارات في أي السندات تُجمع وكيف تُدمج سطورها. وهي تنطبق على عائلة الفواتير/المرتجعات (فاتورة مبيعات، فاتورة مشتريات، مرتجعات المبيعات/المشتريات، الاستبدال، ونظائرها في مراكز الخدمة).

**وضع بناءً على في الاعتبار عند تجميع المستندات (Consider From Document When Collect Documents)** `termConfig.considerFromDocWhenCollectDocs` — يأخذ ربط بناءً على في الاعتبار عند تجميع السندات المخزنية، فلا يُجمع إلا ما يرتبط بذلك المصدر.

**اعتبار جهة الاتصال عند تجميع السندات المخزنية في الفواتير (Consider Contact In Collecting Stock Documents Inside Invoices)** `termConfig.considerContactInCollectingStockDocs` — لا يُجمع السند المخزني إلا إذا طابقت جهة اتصاله جهة اتصال الفاتورة.

**اعتبار الذمة عند تجميع السندات المخزنية في الفواتير (Consider Subsidiary In Collecting Stock Documents Inside Invoices)** `termConfig.considerSubsidiaryInCollectingStockDocs` — يطابق الذمة (الحساب المحاسبي) عند تجميع السندات المخزنية في الفاتورة.

**نسخ السندات المخزنية من حقل تم النسخ من سند (Copy Stock Docs From Origin Doc)** `termConfig.copyStockDocsFromOriginDoc` — عند نسخ مستند من مصدر، ينقل أيضاً روابط السندات المخزنية المرفقة بذلك المصدر.

**نسخ كمية التسعير من حقل السند المخزني (Copy Pricing Qty From Stock Doc Field)** `termConfig.copyPricingQtyFromStockDocField` — يحدد أي حقل كمية رقمي (`N1`/`N2`/`N3`) في السند المخزني المرتبط يوفّر كمية التسعير المستخدمة على سطر الفاتورة.

تتحكم مجموعة **سياسة تجميع سطور السندات المخزنية في الفواتير** (`termConfig.stockDockInInvoiceCollectionOptions.*`) في كيفية دمج ومطابقة سطور السندات المخزنية عند جمعها في الفاتورة. يدمج مفتاح `collectStockDocSimilarLines` السطور المتشابهة؛ وكل علامة `doNotConsider*` تُسقط ذلك المحدد من مفتاح تشابه السطور.

| الخيار | معرّف الحقل |
|---|---|
| تجميع سطور السندات المخزنية المتشابهة | `termConfig.stockDockInInvoiceCollectionOptions.collectStockDocSimilarLines` |
| عدم اعتبار المقاس | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderSize` |
| عدم اعتبار اللون | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderColor` |
| عدم اعتبار الإصدار | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderRevisionId` |
| عدم اعتبار الصندوق | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderBox` |
| عدم اعتبار الشحنة | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderLotId` |
| عدم اعتبار النسبة الفعالة | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderActivePercent` |
| عدم اعتبار النسبة غير الفعالة | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderInActivePercent` |
| عدم اعتبار الصنف الفرعي | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderSubItem` |
| عدم اعتبار المخزن | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderWarehouse` |
| عدم اعتبار الأبعاد | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderMeasures` |
| عدم اعتبار الرقم المسلسل | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderSerial` |
| عدم اعتبار الموقع | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderLocator` |

تضيف علامات `consider*` مرجعاً أو خاصية إلى مفتاح المطابقة، كما تحكم بضعة مفاتيح سلوكية مطابقة الكمية وفك الارتباط.

| الخيار | معرّف الحقل |
|---|---|
| اعتبار مرجع 1 | `termConfig.stockDockInInvoiceCollectionOptions.considerRef1` |
| اعتبار مرجع 2 | `termConfig.stockDockInInvoiceCollectionOptions.considerRef2` |
| اعتبار مرجع 3 | `termConfig.stockDockInInvoiceCollectionOptions.considerRef3` |
| اعتبار السائق | `termConfig.stockDockInInvoiceCollectionOptions.considerDriver` |
| اعتبار سعر الوحدة بالسطر أو ببناءً على | `termConfig.stockDockInInvoiceCollectionOptions.considerUnitPriceOfLineOrFromParent` |
| يجب تطابق كمية الفاتورة مع المستندات المخزنية المرتبطة | `termConfig.stockDockInInvoiceCollectionOptions.matchInvoiceQtyWithRelatedDocsQty` |
| فك الارتباط بالسندات المخزنية التي رُبطت يدوياً آلياً عند حذفها | `termConfig.stockDockInInvoiceCollectionOptions.autoUnlinkManuallyLinkedStockDocsWithDelete` |

تقصر عائلة **الفلترة على السندات المخزنية** السندات المُجمَّعة على ما يطابق محددها المحاسبي محدد الفاتورة.

| الخيار | معرّف الحقل |
|---|---|
| الفلترة بالقطاع | `termConfig.stockDockInInvoiceCollectionOptions.filterBySector` |
| الفلترة بالفرع | `termConfig.stockDockInInvoiceCollectionOptions.filterByBranch` |
| الفلترة بالإدارة | `termConfig.stockDockInInvoiceCollectionOptions.filterByDepartment` |
| الفلترة بالمجموعة التحليلية | `termConfig.stockDockInInvoiceCollectionOptions.filterByAnalysisSet` |

## تحديث الأسعار عند التطبيق (Price Update on Apply)

عندما يربط زر **التطبيق** السندات المخزنية بفاتورة أو مرتجع، تتحكم هذه الخيارات في ما إذا كانت أسعار السطور تُعاد حسابها وكيف. وهي تنطبق على عائلة الفواتير/المرتجعات.

**عدم تحديث الأسعار مع تطبيق السندات المخزنية (Don Not Update Price When Apply)** `termConfig.donNotUpdatePriceWhenApply` — عند تطبيق (ربط) السندات المخزنية بالفاتورة، لا يعيد حساب/تحديث أسعار السطور.

**تطبيق المستند المخزني بمجرد اختياره (Instantly Apply On Stock Doc Selection)** `termConfig.instantlyApplyOnSIssuesSelection` — يطبّق السند المخزني على الفاتورة فور اختياره، دون خطوة تطبيق منفصلة.

تحدد مجموعة **سياسة تحديث السعر بزر التطبيق** (`termConfig.priceUpdateDimensionsOnApply.*`) أي المحددات تُعتبر عند إعادة تسعير السطور عند التطبيق.

| الخيار | معرّف الحقل |
|---|---|
| اعتبار الصندوق | `termConfig.priceUpdateDimensionsOnApply.considerBox` |
| اعتبار الشحنة | `termConfig.priceUpdateDimensionsOnApply.considerLotId` |
| اعتبار الإصدار | `termConfig.priceUpdateDimensionsOnApply.considerRevisionId` |
| اعتبار المقاس | `termConfig.priceUpdateDimensionsOnApply.considerSize` |
| اعتبار اللون | `termConfig.priceUpdateDimensionsOnApply.considerColor` |
| اعتبار النسبة الفعالة | `termConfig.priceUpdateDimensionsOnApply.considerActivePercentage` |
| اعتبار النسبة غير الفعالة | `termConfig.priceUpdateDimensionsOnApply.considerInActivePercentage` |

## التحقق من صرف الخامات (Material-Issue Validation)

تنطبق هذه الخيارات عند نسخ الكميات المتبقية إلى مستندات صرف الخامات (صرف خامات المقاولات وطلبه، إضافة إلى صرف الخامات الأولية في التصنيع).

**نسخ الكمية المتبقية واعتبار ما تم صرفه سابقاً (Copy Remaining Quantity Considering Previously Issued Quantity)** `termConfig.copyRemainingQtyConsideringPreviouslyIssued` — عند نسخ الكمية المتبقية من المصدر، يطرح الكميات التي صُرفت في مستندات صرف سابقة، فلا يُنقل إلا المتبقي فعلاً.

**منع الحفظ إذا تعدّت الكمية الفعلية الكمية المخططة في كارت التحليل (Do Not Save If Actual Quantity Greatr Than Planned Quantity)** `termConfig.doNotSaveIfActualQtyGreatrThanTotalQty` — يمنع الحفظ عندما تتجاوز الكمية المصروفة الفعلية الكمية المخططة في كارت التحليل.

**منع الحفظ إذا تعدّت التكلفة الفعلية التكلفة المخططة في كارت التحليل (Do Not Save If Actual Cost Greatr Than Planned Cost)** `termConfig.doNotSaveIfActualCostGreatrThanTotalCost` — يمنع الحفظ عندما تتجاوز التكلفة الفعلية التكلفة المخططة في كارت التحليل.
