---
description: "تبويب اقتراح الكميات: ترتيب اقتراح الشحنات والمسلسلات والمقاسات والمخازن والمواقع على سطور المستندات، وما يُقترح وما يُعرض، وكيف تُدمج السطور المتشابهة عند نسخ المستندات أو تجميعها."
entities: [ConfigEntry]
menu: المخازن ← الإعدادات ← إعدادات Supply Chain
---

# إعدادات اقتراح الكميات (Quantity Suggestion Configuration)

تشرح هذه الصفحة تبويب **اقتراح الكميات**. وهو يتحكم في سلوكين مرتبطين:

- **اقتراح الكميات** — عندما يُدخل المستخدم صنفًا (أو إحدى خصائصه) في سطر مستند، يبحث النظام عن المكان الذي يوجد فيه هذا الصنف حاليًا في المخزون (الشحنات، المسلسلات، المقاسات/الألوان، الإصدارات، الأبعاد، المخازن، المواقع) و*يقترح* الكميات المتاحة والخاصية التي يُسحب منها.
- **تجميع السطور المتشابهة** — عند نسخ المستندات أو تجميعها، يمكن *دمج* السطور المتطابقة بحيث يصبح المستند الناتج أقصر.

![تبويب اقتراح الكميات في إعدادات سلسلة الإمداد](../images/configuration/sc-config-quantity-suggestion-ar.png)

## ترتيب الاقتراح

عندما يعرض النظام المخزون المتاح لصنف، فإنه يرتّب الاقتراحات باستخدام ما يصل إلى ثلاثة مفاتيح ترتيب مرتّبة، لكل منها اتجاه. ويمكن أن يكون كل مفتاح:

- **تاريخ الانتهاء (Expiry Date)** — الترتيب حسب تاريخ انتهاء الشحنة (فقط عندما يتتبّع الصنف تاريخ الانتهاء). استعمله لصرف الأقرب انتهاءً أولًا، بحيث يُقترح المخزون قريب الانتهاء أولًا.
- **تاريخ أول استلام (First Receipt Date)** — الترتيب حسب وقت أول استلام للمخزون. استعمله لصرف الوارد أولًا صادر أولًا (FIFO)، بحيث يأتي المخزون الأقدم أولًا.
- **خاصية البحث (Search Property)** — الترتيب حسب الخاصية التي يُدخلها المستخدم حاليًا (مثل الشحنة/المقاس/اللون الذي يُكتب).

**ترتيب الاقتراح الأول / الثاني / الثالث** `value.firstSuggestionOrder` `value.secondSuggestionOrder` `value.thirdSuggestionOrder` *(القيم الافتراضية: تاريخ الانتهاء، تاريخ أول استلام، خاصية البحث)* — مفتاح الترتيب الأساسي ومفتاحان لفض التساوي، لكل منها اتجاه **تصاعدي / تنازلي** (`value.firstOrderDescOrAsc` و`value.secondOrderDescOrAsc` و`value.thirdOrderDescOrAsc`). اضبطها لتطابق سياسة دوران المخزون لديك.

**ترتيب حقول التجميع بواسطة (Collect Property Order Configuration Lines)** `value.collectPropertyOrderConfigLines` *(جدول)* — تجاوز لكل خاصية على حدة لمفاتيح الترتيب الثلاثة أعلاه. يحدد كل سطر خاصية (الشحنة، المقاس، اللون، المخزن، الموقع…)، والحقل الذي تُرتّب اقتراحاتها بناءً عليه، والاتجاه. وعندما يطابق سطرٌ الخاصيةَ التي يجري البحث عنها، فإنه يحل محل المفاتيح العامة الثلاثة لتلك الخاصية بالكامل. استعمله عندما تحتاج خاصية واحدة إلى ترتيب مختلف عن الافتراضي العام.

## ما الذي يُقترح

**إضافة الكميات للبحث في خصائص الأصناف في سندات الصرف (Add Quantity to Item Property Suggestion in Issues)** `value.addQtyToItemDimensionsSuggestion` *(مفعّل افتراضيًا)* — يعرض الكميات المتاحة فعليًا لكل خاصية عند إدخال صنف في مستندات **الصرف / الخارجة** (المبيعات، الصرف المخزني)، حتى يستطيع المستخدم اختيار ما يصرفه. أوقفه لإدخال الخصائص يدويًا دون البحث.

**إضافة الكميات للبحث في خصائص الأصناف في سندات التوريد (Add Quantity to Item Property Suggestion in Receipts)** `value.addQtyToItemDimensionsSuggestionInRecipts` *(مفعّل افتراضيًا)* — نفس الأمر بالنسبة لمستندات **التوريد / الواردة** (المشتريات، التوريد المخزني)، حيث يعرض الكميات المتاحة فعليًا أثناء التوريد.

**استعمال اقتراح الكميات فقط في السندات التالية (Use Quantity Suggestion Only in the Following Types)** `value.addQtyToItemDimensionsSuggestionInTypes` *(جدول)* — يقصر اقتراح الكميات على أنواع المستندات المذكورة **فقط**. الجدول الفارغ يعني عدم وجود قيود (يسري المفتاحان أعلاه بشكل طبيعي).

**اعتبار تاريخ الفاتورة في اقتراح الكميات (Consider Invoice Date in Quantity Suggestion)** `value.considerInvoiceDateInQtySuggestion` — عند تفعيله، تُحسب الكمية المتاحة المقترحة **اعتبارًا من تاريخ المستند** بدلًا من الرصيد الحالي اللحظي — وهو مفيد للمستندات المؤرّخة بتاريخ سابق.

**عرض الكميات الأكبر من الصفر فقط في اقتراحات سندات التوريد (Show Only Non-Zero Quantities in Receipt Docs Suggestions)** `value.showOnlyNonZeroQtiesInReceiptDocsSuggestions` — في مستندات التوريد، يمكن للاقتراحات عادةً أن تشمل خصائص رصيدها صفر (حتى تتمكن من التوريد في شحنة جديدة). عند تفعيله، تُقترح فقط الخصائص ذات الكمية الموجبة.

**اعتبار المخزن في اقتراحات سندات التوريد (Consider Warehouse in Receipt Docs Suggestions)** `value.considerWarehouseInReceiptDocsSuggestions` *(مفعّل افتراضيًا)* — في مستندات الصرف يُفلتر الاقتراح دائمًا حسب مخزن/موقع السطر؛ أما في مستندات التوريد فلا يحدث ذلك إلا عند تفعيل هذا الخيار. أوقفه للبحث عبر جميع المخازن أثناء التوريد.

**الوحدة المستعملة لاقتراح الكميات (Unit Used for Quantity Suggestions)** `value.unitUsedForSuggestions` — عند عدم وجود وحدة على السطر، يحدد هذا الخيار وحدة الصنف (الأساسية، أو وحدة البيع، أو وحدة الشراء) التي تُعرض بها الكميات المقترحة.

**وضع إجمالي الكمية بعد تغيير الخاصية (Set Total Quantity with Property Change)** `value.addTotalQtyWithPropertyChange` — عند تفعيله، وبعد أن يختار المستخدم قيمة خاصية (مثل شحنة)، تُملأ كمية السطر تلقائيًا بـ**إجمالي الكمية المتاحة** لتلك الخاصية. استعمله عندما ينقل المستخدمون عادةً كامل الكمية المتاحة للشحنة المختارة.

### عدم اقتراح أي شيء عند عدم وجود مخزون

تسري هذه المفاتيح على مستندات **الصرف**. عند تفعيلها، يُعيد بحث الخاصية القيمة المُدخلة كما هي ولا يقترح قيم خصائص بديلة ليس لها مخزون — بحيث لا تصرف إلا ما هو موجود فعليًا.

يقمع كل مفتاح اقتراحات الخاصية المقابلة عند عدم توفّر كمية:

| الخيار | معرّف الحقل |
| --- | --- |
| عدم اقتراح أي أبعاد في حالة عدم وجود كميات | `value.doNotSuggestAnyMeasuresInQtiesAbsence` |
| عدم اقتراح أي صناديق في حالة عدم وجود كميات | `value.doNotSuggestAnyBoxInQtiesAbsence` |
| عدم اقتراح أي شحنات في حالة عدم وجود كميات | `value.doNotSuggestAnyLotInQtiesAbsence` |
| عدم اقتراح أي إصدارات في حالة عدم وجود كميات | `value.doNotSuggestAnyRevisionInQtiesAbsence` |
| عدم اقتراح أي مقاسات أو ألوان في حالة عدم وجود كميات | `value.doNotSuggestAnySizeColorInQtiesAbsence` |

### ضبط التصفية والاحتساب

**احتساب كمية الأبعاد بناءً على معامل تحويل وحدة الحركة إلى الوحدة الأساسية (Calculate Measures Quantity Based on Transaction Unit Rate to Base Unit)** `value.calcMeasuresQtyBasedOnTransUOMRateToBaseUOM` — للأصناف ذات الأبعاد/المقيسة، يحتسب كمية الأبعاد باستخدام معامل تحويل وحدة الحركة إلى الوحدة الأساسية للصنف، مع توحيدها عندما تختلف وحدة الإدخال عن الوحدة الأساسية.

**عدم تصفية المخزن والموقع حسب المحددات في اقتراح الكميات (Do Not Filter Warehouse and Locator by Dimensions in Quantity Suggestion)** `value.doNotFilterWarehouseAndLocatorByDimensionsInQtySuggestion` — عادةً تُفلتر المخازن/المواقع المقترحة حسب محددات المستند (الفرع/الإدارة/القطاع). عند تفعيله، يُتخطّى هذا الفلتر بحيث يُقترح أي مخزن/موقع.

**اقتراح الكميات لكل موقع تخزيني أو مخزن (Suggest Quantity in Locator and Warehouse)** `value.suggestQtyInLocatorAndWarehouse` — عند تفعيله، توفّر حقول الموقع/المخزن اقتراح كمية لكل موقع / لكل مخزن. وعند إيقافه، يُعطّل اقتراح الموقع في الصرف المخزني. فعّله للمخازن التي تستخدم المواقع.

### عرض التشكيلة والتعبئة والتجميع

**فرد التشكيلة في السندات التالية (Expand Item Assortment in Documents)** `value.expandItemAssortmentInDocuments` *(جدول)* — لأنواع المستندات المذكورة، يُفرد صنف "التشكيلة" (وهو حزمة تحدد الكميات لكل مقاس/لون) تلقائيًا إلى سطر تفصيلي لكل مقاس/لون، مع ضرب الكميات في الكمية المُدخلة. استعمله عندما تبيع حزم مقاسات/ألوان معرّفة مسبقًا.

**إظهار قائمة التعبئة (Show Packing List)** `value.showPackingList` — يضيف صفحة "تعبئة" إضافية إلى شاشة تحرير المستند المخزني لإدخال تفاصيل التعبئة.

**عرض الأصناف الموردة الخاصة بالطريقة فقط في سند التجميع (Show BOM Materials Only in Assembly Document)** `value.showBOMMaterialsOnlyInAssembly` — عند تفعيله، لا يعرض سند التجميع إلا الأصناف التابعة للطريقة المختارة، مع إخفاء المدخلات غير المرتبطة.

**عرض الخامات الناتجة الخاصة بالطريقة فقط في سند التجميع (Show BOM Co-Products Only in Assembly Document)** `value.showBOMCoProdsOnlyInAssembly` — نفس القيد بالنسبة للمنتجات الناتجة المعرّفة في الطريقة المختارة.

### عرض أسماء الخصائص

**إضافة اسم اللون / إضافة اسم المقاس / إضافة اسم الإصدار (Add Color Name / Add Size Name / Add Revision Name)** `value.addColorName` `value.addSizeName` `value.addRevisionName` — يضيف كل منها *الاسم* المقروء للخاصية بجوار كودها في نتائج البحث/الاقتراح عن الأصناف. فعّلها عندما يصعب قراءة الأكواد وحدها.

## تجميع السطور المتشابهة

عند تجميع المستندات أو نسخها، يمكن دمج السطور المتطابقة في سطر واحد. ويُتحكم في التجميع عبر تحديد الخصائص التي تُعدّ مؤثّرة — فتفعيل خاصية يُبقي السطور **منفصلة** عند اختلاف تلك الخاصية، ويدمجها عند تطابقها.

**تجميع سطور الشراء المتشابهة في طلب الشراء المجمع (Collect Similar Request Lines in Consolidated Request)** `value.collectSimilarReqLinesInConsolidated` — المفتاح الرئيسي الذي يفعّل دمج سطور الطلب لنفس الصنف والوحدة عند بناء **طلب شراء مجمع**.

يضيف كل خيار أدناه الخاصية المقابلة إلى مفتاح التجميع، بحيث تبقى السطور المختلفة في تلك الخاصية منفصلة بدلًا من دمجها:

| الخيار | معرّف الحقل |
| --- | --- |
| تجميع بالإصدار | `value.collectSimilarReqLinesInRevision` |
| تجميع بالمقاس | `value.collectSimilarReqLinesInSize` |
| تجميع بالصندوق | `value.collectSimilarReqLinesInBox` |
| تجميع باللون | `value.collectSimilarReqLinesInColor` |
| تجميع بالشحنة | `value.collectSimilarReqLinesInItemLotId` |
| تجميع بالنسبة الفعّالة | `value.collectSimilarReqLinesInActivePercent` |
| تجميع بالنسبة غير الفعّالة | `value.collectSimilarReqLinesInNotActivePercent` |
| تجميع بالصنف الفرعي | `value.collectSimilarReqLinesInSubItem` |
| تجميع بمحدد السعر 1 | `value.collectSimilarReqLinesInPriceClassifier1` |
| تجميع بمحدد السعر 2 | `value.collectSimilarReqLinesInPriceClassifier2` |
| تجميع بمحدد السعر 3 | `value.collectSimilarReqLinesInPriceClassifier3` |
| تجميع بمحدد السعر 4 | `value.collectSimilarReqLinesInPriceClassifier4` |
| تجميع بمحدد السعر 5 | `value.collectSimilarReqLinesInPriceClassifier5` |

**تجميع سطور الصرف المتشابهة في المبيعات (Collect Similar Issue Lines in Sales)** `value.collectSimilarIssueLinesInSales` — عند نسخ سطور الصرف المخزني إلى مستند مبيعات، تُدمج السطور المتطابقة في سطر واحد. استعمله لتقصير مستندات المبيعات المنشأة من سندات الصرف.

**تجميع سطور التوريد المتشابهة في المشتريات (Collect Similar Receipt Lines in Purchase)** `value.collectSimilarRecLinesInPurchase` — نفس الأمر في جانب المشتريات — تُدمج سطور التوريد المتطابقة عند بناء مستند شراء.

**تجميع السطور المتطابقة في سندات فحص وتأكيد الجودة (Aggregate Identical Lines of Quality Control / Assurance Documents)** `value.collectSimilarLinesOfQualityContDoc` — عند تفعيله، تُدمج السطور المتطابقة في سندات فحص / تأكيد الجودة في سطر واحد.
