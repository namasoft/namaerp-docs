---
entities: [DocumentTerm]
menu: الأساسيات ← الإعدادات ← توجيه مستند
---

# إعدادات الأسعار والضرائب والخصومات (Pricing, Taxes & Discounts)

يتحكم هذا التبويب في كيفية حساب أسعار الوحدة والخصومات والضرائب على المستندات المنشأة تحت التوجيه — هل تُفرض من قوائم الأسعار، أم يُعاد حسابها عند الحفظ، أم تُجمَّد بعد "بناءً على"، أم تُستبعد من تكلفة الصنف. تنطبق الخيارات على مستندات المبيعات والمشتريات معاً، وكثير منها مقصور على أحد الجانبين أو على نوع مستند واحد كما هو موضّح لكل خيار.

::: info مكان الإعداد
افتح **توجيه المستند** (Document Term) ثم تبويب **الأسعار والضرائب والخصومات** (Pricing, Taxes & Discounts).
:::

![تبويب الأسعار في توجيه فاتورة المبيعات](../images/document-terms/doc-term-pricing-taxes-discounts-ar.png)

## الضرائب (Taxes)

تظهر أساسيات الضريبة لأي مستند `IInvoice` خاضع للضريبة (مبيعات ومشتريات) وتتطلب تفعيل خاصية **ضريبة المبيعات** (Sales Tax).

**خاضع للضريبة (Taxable)** `termConfig.taxable` — يعلّم المستندات المنشأة تحت هذا التوجيه على أنها خاضعة للضريبة، مما يتيح حساب الضريبة على المستند. عند إيقافه لا تُحسب أي ضريبة.

**سياسة الضريبة (Tax Plan)** `termConfig.taxPlan` — يحدد سياسة الضريبة (مجموعة قواعد ونسب الضريبة) المطبَّقة على مستندات هذا التوجيه.

**يمكن تعديل الضريبة (Modifiable Tax)** `termConfig.modifiableTax` — يسمح للمستخدم بتعديل قيمة الضريبة المحسوبة يدوياً على المستند بدلاً من الاكتفاء بالضريبة المحسوبة آلياً.

**السماح بتعديل ضريبة الفاتورة في السطر (Allow Editing Header Tax In Details)** `termConfig.allowEditingHdrTaxInDetails` — يتيح تعديل ضريبة الرأس (مستوى الفاتورة) من داخل سطور التفاصيل.

**يمكن تعديل الضريبة (Editable Taxes)** `termConfig.editableTaxes` — يسمح بتعديل الضرائب يدوياً. مُعرَّف على مستندات التكاليف/المصروفات الإضافية (تكلفة إضافية على التوريد، مصروفات الاعتماد المستندي، مصروفات أمر الشغل) وليس على توجيهات فاتورة المبيعات/المشتريات الرئيسية.

## أسعار المشتريات وقفل الأمر (Purchase Prices & Order Lock)

تقع هذه الخيارات في مجموعة **الأسعار** (prices) للمشتريات وتتحكم في سلوك الأسعار والخصومات والدفعات المنسوخة من أمر الشراء المصدر على فاتورة المشتريات. تنطبق عائلة القفل أدناه على **فاتورة المشتريات / فاتورة مشتريات مركز الخدمة** فقط، ويجمّد كل مفتاح قيمة واحدة منسوخة من أمر الشراء المصدر.

| الخيار | معرّف الحقل |
|---|---|
| منع تعديل سعر أمر الشراء | `termConfig.preventOrderPriceUpdate` |
| منع تعديل تخفيض إجمالي أمر الشراء | `termConfig.preventOrderTotalDiscountUpdate` |
| منع تعديل تخفيض أمر الشراء | `termConfig.preventOrderDiscountUpdate` |
| منع تعديل خصم 1 أمر الشراء | `termConfig.preventOrderFirstDiscountUpdate` |
| منع تعديل خصم 2 أمر الشراء | `termConfig.preventOrderSecondDiscountUpdate` |

**منع التعديل بعد الاستخدام (Disable After Use)** `termConfig.disableAfterUse` — بمجرد أن يُستهلك الأمر/المستند بواسطة مستند لاحق، يُقفل من التعديل. ينطبق على أمر شراء المقاولات، وأمر الشراء، وفاتورة المشتريات المبدئية، وأمر شراء مركز الخدمة، وفاتورة مشتريات مركز الخدمة.

**نسخ المتبقي إلى المدفوع نقداً (Copy Remaining To Cash)** `termConfig.copyRemainingToCash` — ينسخ المبلغ المتبقي (غير المدفوع) إلى حقل المدفوع نقداً، فيُسوّى المستند كمدفوع نقداً. متاح على مستندات المشتريات والمبيعات.

**تاريخ الدفعة غير مطلوب (Payment Date Not Required)** `termConfig.paymentDateNotRequired` — يجعل تاريخ سطر الدفعة اختيارياً، فيمكن حفظ سطور الدفعات دون تحديد تاريخ. متاح على مستندات المشتريات والمبيعات.

**تشغيل تسعير المبيعات الآلي مع الحفظ (Run Auto Sales Pricing With Save)** `termConfig.runAutoSalesPricingWithSaving` — يشغّل روتين تسعير المبيعات الآلي (إعادة احتساب أسعار بيع الأصناف) كلما حُفظ مستند مشتريات من هذا التوجيه. مستندات المشتريات فقط.

## استراتيجية أسعار الموردين (Vendor Price Strategy)

تتحكم هذه الحقول الفرعية لاستراتيجية السعر (المعرّفات `termConfig.priceStrategy.<x>`) في كيفية جلب أسعار المشتريات وخصومات الموردين وإعادة تطبيقها. تظهر في مجموعة **الأسعار** (prices) للمشتريات.

**الالتزام بقوائم الأسعار (Force Price List)** `termConfig.priceStrategy.forcePriceList` — في فاتورة الشراء، يقارن سعر كل سطر بقائمة أسعار الشراء عند الحفظ ويرفض الحفظ عند اختلافهما، فلا تخالف الأسعار المُدخلة يدوياً القائمة. وله قيدان يجدر معرفتهما: التحقق لا يعمل إلا **إذا كان *إعادة تطبيق قائمة الأسعار عند الحفظ* مطفأً** — فمع تفعيله تُسحب الأسعار من القائمة من جديد ولا يجري أي تحقق — وهو يخص فواتير الشراء وحدها دون بقية مستندات الشراء.

**السماح بالحفظ مع وجود أصناف ليس لها سعر (Do Not Check Items Without Price List)** `termConfig.priceStrategy.doNotCheckItemsWithoutPriceList` — عند تفعيل الالتزام بقوائم الأسعار، يسمح بالحفظ حتى لو لم يكن لبعض الأصناف سعر في القائمة (يتجاوز فحص "الصنف ليس له سعر").

**تطبيق خصومات الموردين (Apply Discounts)** `termConfig.priceStrategy.useVendorDiscounts` — يطبّق خصومات الموردين المعدّة عند تسعير مستند المشتريات. مفعّل افتراضياً.

**إعادة تطبيق قوائم الأسعار عند الحفظ (Reapply Price List on Save)** `termConfig.priceStrategy.usePriceList` — يعيد تطبيق قائمة الأسعار على المستند عند كل حفظ، مع إعادة جلب الأسعار من القائمة. مفعّل افتراضياً.

يمنع كل مفتاح أدناه خانة خصم المورّد المقابلة له فلا تُطبَّق تلك الشريحة من الخصم أثناء تسعير المشتريات:

| الخيار | معرّف الحقل |
|---|---|
| عدم تطبيق خصم 1 للموردين | `termConfig.priceStrategy.doNotUseVendorDiscount1` |
| عدم تطبيق خصم 2 للموردين | `termConfig.priceStrategy.doNotUseVendorDiscount2` |
| عدم تطبيق خصم 3 للموردين | `termConfig.priceStrategy.doNotUseVendorDiscount3` |
| عدم تطبيق خصم 4 للموردين | `termConfig.priceStrategy.doNotUseVendorDiscount4` |
| عدم تطبيق خصم 5 للموردين | `termConfig.priceStrategy.doNotUseVendorDiscount5` |
| عدم تطبيق خصم 6 للموردين | `termConfig.priceStrategy.doNotUseVendorDiscount6` |
| عدم تطبيق خصم 7 للموردين | `termConfig.priceStrategy.doNotUseVendorDiscount7` |
| عدم تطبيق خصم 8 للموردين | `termConfig.priceStrategy.doNotUseVendorDiscount8` |

## استبعاد الضرائب والخصومات من التكلفة (Excluding Taxes & Discounts)

تقع هذه المفاتيح في مجموعة **الضرائب والخصومات** (taxAndDiscounts) للمشتريات وتتحكم فيما إذا كانت ضريبة أو خصم معيّن تُضمَّن في **تكلفة الصنف** المحسوبة. تنطبق على مستندات المشتريات فقط.

يستبعد كل مفتاح أدناه الضريبة المقابلة (1–4) من تكلفة الصنف المحسوبة، فلا تُرسمَل تلك الضريبة على تكلفة المخزون:

| الخيار | معرّف الحقل |
|---|---|
| عدم إضافة ضريبة 1 للتكلفة | `termConfig.excludeTax1` |
| عدم إضافة ضريبة 2 للتكلفة | `termConfig.excludeTax2` |
| عدم إضافة ضريبة 3 للتكلفة | `termConfig.excludeTax3` |
| عدم إضافة ضريبة 4 للتكلفة | `termConfig.excludeTax4` |

يستبعد كل مفتاح أدناه الخصم المقابل (1–8) من احتساب تكلفة الصنف (لا يُخصم من التكلفة):

| الخيار | معرّف الحقل |
|---|---|
| عدم احتساب خصم 1 للتكلفة | `termConfig.excludeDiscount1` |
| عدم احتساب خصم 2 للتكلفة | `termConfig.excludeDiscount2` |
| عدم احتساب خصم 3 للتكلفة | `termConfig.excludeDiscount3` |
| عدم احتساب خصم 4 للتكلفة | `termConfig.excludeDiscount4` |
| عدم احتساب خصم 5 للتكلفة | `termConfig.excludeDiscount5` |
| عدم احتساب خصم 6 للتكلفة | `termConfig.excludeDiscount6` |
| عدم احتساب خصم 7 للتكلفة | `termConfig.excludeDiscount7` |
| عدم احتساب خصم 8 للتكلفة | `termConfig.excludeDiscount8` |

**عدم احتساب التخفيض للتكلفة (Exclude Header Discount From Cost)** `termConfig.excludeHeaderDiscount` — يستبعد تخفيض الرأس (مستوى الفاتورة) من احتساب تكلفة الصنف.

## تسعير المبيعات (Sales Pricing)

تُضاف هذه المجموعة لمستندات **المبيعات** فقط. وتتحكم في كيفية فرض أسعار البيع من قوائم الأسعار، وتطبيق العروض والأصناف المجانية، وفحوص أقل كمية، والقسائم، ونقاط المكافأة.

**نوع الفاتورة (Invoice Type)** `termConfig.invoiceType` — يصنّف مستند المبيعات (نوع الفاتورة) بما يؤثر على المعالجة التسعيرية والمحاسبية اللاحقة.

**الالتزام بقوائم الأسعار (Force Price List)** `termConfig.forcePriceList` — يفرض أخذ أسعار البيع من قائمة الأسعار ويمنع الأسعار اليدوية المخالفة.

**عدم التحقق من خصم الفاتورة مع الالتزام بقوائم الأسعار (Do Not Check Header Discount While Force Price List)** `termConfig.doNotCheckDiscountsWhileForcePriceList` — عند تفعيل الالتزام بقوائم الأسعار، يتجاوز التحقق من خصم الرأس مقابل قائمة الأسعار.

**التحقق من الحد الأدنى للسعر بعد تأثير (Check Min Price With Value After Effect)** `termConfig.checkMinPriceWithValueAfterEffect` — مع تفعيل فرض قائمة الأسعار يُفحص سعر الوحدة مقابل الحد الأدنى في قائمة الأسعار قبل أي خصم. اختر هنا مرحلة (خصمًا من 1 إلى 8، أو تخفيض الفاتورة، أو ضريبة من 1 إلى 4) ليُفحص أيضًا صافي سعر الوحدة بعد تلك المرحلة: قيمة السطر بعد المرحلة المختارة مقسومة على الكمية يجب ألا تقل عن الحد الأدنى للسعر. والسطر الذي يقل يُرفض بالرسالة
«سعر الصنف {0} الصافي {1} بعد {2} أقل من الحد الأدنى للسعر {3}».
الفارغ يعني عدم إجراء هذا الفحص؛ والصنف الذي ليس له حد أدنى في قائمة الأسعار لا يُفحص.

**السعر الافتراضي في قائمة الأسعار (Price List Default Price)** `termConfig.priceListDefaultPrice` — يختار أي شريحة سعر من قائمة الأسعار (مثل الافتراضي/الأدنى/الأقصى) تُستخدم كسعر افتراضي عند تسعير السطور.

**تجاهل الالتزام بقوائم الأسعار مع الصنف المجاني (Ignore Force Price List With Free Item)** `termConfig.ignoreForcePriceListWithFreeItem` — يتجاوز فحص الالتزام بقوائم الأسعار للأصناف المجانية، فلا تُرفض سطور الهدايا لعدم وجود سعر لها في القائمة.

**السماح بالحفظ مع وجود أصناف ليس لها سعر (Do Not Check Items Without Price List)** `termConfig.doNotCheckItemsWithoutPriceList` — مع تفعيل الالتزام بقوائم الأسعار، يسمح بالحفظ حتى لو لم يكن لبعض أصناف البيع سعر في القائمة.

**تجاهل الالتزام بقوائم الأسعار في حالة وجود سند بيع في بناءً على (Do Not Force Price List When There is Sales Doc In From Doc)** `termConfig.doNotForcePriceListWhenThereSalesDocInFromDoc` — يلغي الالتزام بقوائم الأسعار عندما تتضمن سلسلة "بناءً على" سند بيع بالفعل، مع الإبقاء على الأسعار المنسوخة من سند البيع السابق.

**تجاهل السعر الحالي عند حساب الأسعار (Ignore Current Price When Calculating Prices)** `termConfig.ignoreCurrentPriceWhenCalculatingPrices` — يتجاهل سعر السطر الحالي أثناء إعادة الحساب، ويعيد احتساب الأسعار من جديد.

**استعمال عروض الخصومات في التأكد من نسب خصم الموظف (Consider Discount Offers For Employee Discount Percentage Validation)** `termConfig.considerDiscountOffersForEmpDiscountPercentageValidation` — يُضمّن عروض الخصومات عند التحقق من أقصى نسبة خصم يمنحها الموظف — كبديل عن استعمال الالتزام بقوائم الأسعار.

**تجاهل التحقق من حد الخصم الأقصى عند وجود الخصم بسند بناءً عليه (Ignore Max Discount Validation If Discount Exists In From Doc)** `termConfig.ignoreMaxDiscValidationIfDiscountExistsInFromDoc` — يتجاوز التحقق من أقصى خصم مسموح به للموظف بالنسبة لخصم سبق منحه في سند "بناءً على". فقد يكون عرض السعر معتمداً بخصم 20% يتجاوز ما يُسمح به للمندوب عادةً؛ وبدون هذا الخيار يُعاد تنفيذ التحقق عند تحويله إلى فاتورة فيُمنع الحفظ رغم أن الخصم لم يتغير. وعند تفعيله يُقارَن كل خصم من خصومات السطر (1–8) بنفس الخصم في السطر المقابل بسند "بناءً على"، ويُقارَن خصم الرأس بخصم رأس سند "بناءً على" — فإذا لم تكن القيمة والنسبة أعلى مما كان موجوداً يُتجاوز التحقق. أما إذا رُفع الخصم فوق قيمته في سند "بناءً على" فيخضع لحد الموظف كالمعتاد. ويعتمد ربط السطور على كون السطر منقولاً من السند المصدر، لذا تخضع السطور المضافة يدوياً في المستند الجديد للتحقق دائماً.

**حساب خصم الفاتورة من العروض عند الحفظ (Calculate Invoice Discount From Offer With Save)** `termConfig.calcDiscountFromOfferWithSave` — يعيد احتساب خصم الفاتورة من العروض الفعّالة في كل مرة يُحفظ فيها المستند.

**تطبيق الأصناف المجانية على قيمة الفاتورة مع الحفظ (Apply Free Items On Invoice With Save)** `termConfig.applyFreeItemsOnInvoiceWithSave` — يطبّق عروض الأصناف المجانية على قيمة الفاتورة تلقائياً عند الحفظ.

**الالتزام بالأسعار في جدول الوحدات للصنف (Force Item Prices From Units)** `termConfig.forceItemPricesFromUnits` — يُبقي سعر الوحدة في كل سطر بين **أقل سعر** و**اقصي سعر** في السطر المطابق من جدول وحدات القياس للصنف، ويُرفض الحفظ إذا خرج السعر عن هذا المدى برسالة
«سعر الوحده لا يمكن ان يكون أقل من {0} حيث الألتزام بالاسعار من جدول الواحدات مفعله» أو
*Unit price cannot be greater than {0} as force prices from units is activated* (هذه الرسالة ليس لها نص عربي فتظهر بالإنجليزية). إذا كان «اقصي سعر» فارغًا فلا حد أعلى. ولا يُفحص السطر المجاني الذي سعره صفر أو فارغ.

**منع البيع بكمية أقل من أقل كمية بيع في جدول الوحدات للصنف (Prevent Sales If Quantity Less Than UOM Min Quantity)** `termConfig.preventSalesIfQtyLessThanUOMMinQty` — يمنع الحفظ عندما تقل كمية السطر عن أقل كمية بيع للصنف المحددة في جدول الوحدات.

**اعتبار الكمية الإجمالية بالمستند في منع البيع بكمية أقل من أقل كمية بيع (Consider Total Qty In Doc For Prevent Sales Less Than Min Qty)** `termConfig.considerTotalQtyInDocForPreventSalesLessThanMinQty` — عند تطبيق فحص أقل كمية، يجمع كمية الصنف الإجمالية عبر كامل المستند بدلاً من تقييم كل سطر على حدة.

**تجاهل قيم الخصم الحالي عند إعادة الحساب (Do Not Consider Current Discount Values When Recalculating)** `termConfig.doNotConsiderCurrentDiscountValuesWhenRecalculating` — يتجاهل قيم خصم السطر الحالية عند إعادة تشغيل احتساب الأسعار/الخصومات.

**عدم تفعيل عروض الأصناف المجانية على عدد الأصناف في حالة "بناءً على" ليس فارغاً (Stop Items Count Offers If From Document Not Empty)** `termConfig.stopItemsCountOffersIfFromDocNotEmpty` — يعطّل عروض الأصناف المجانية المبنية على عدد الأصناف عندما يكون المستند مبنياً على "بناءً على".

**عدم تفعيل عروض الأصناف المجانية على عدد الأصناف مع الحفظ (Stop Items Count Offers With Save)** `termConfig.stopItemsCountOffersWithSave` — يعطّل إعادة تطبيق عروض الأصناف المجانية المبنية على عدد الأصناف عند الحفظ.

**تحديث خصومات السطور من العروض عند الحفظ (Update Lines Discounts From Offers With Save)** `termConfig.updateLinesDiscsFromOffersWithSave` — يحدّث خصومات مستوى السطر من العروض الفعّالة عند كل حفظ.

**إعادة احتساب الخصومات مع اختيار تصنيف الفاتورة (Recalculate Discounts With Invoice Classifications)** `termConfig.recalculateDiscountsWithInvoiceClassifications` — يعيد احتساب الخصومات عند اختيار تصنيف الفاتورة أو تغييره.

**مجموعة قسيمة الخصومات (Discount Coupon Group)** `termConfig.discountCouponGroup` — يقيّد أي مجموعة قسائم خصم تنطبق على مستندات هذا التوجيه.

**دفتر قسيمة الخصومات (Discount Coupon Book)** `termConfig.discountCouponBook` — يحدد دفتر قسائم الخصم التي يمكن استبدالها على هذه المستندات.

**إعدادات نقاط المكافأة (Reward Points Configuration)** `termConfig.rewardPointsConfig` — يربط إعدادات نقاط المكافأة/الولاء المطبَّقة عند حفظ مستندات المبيعات هذه.

**استخدام قواعد السحب (Use Pick List)** `termConfig.usePickList` — يفعّل قواعد السحب المخزني (Pick List) لفاتورة المبيعات. فاتورة المبيعات فقط.

ثلاثة خيارات أخرى في هذه المجموعة خاصة بمتاجر ماجنتو. يعمل كل منها مرة واحدة لكل مستند عند حفظه أول مرة، ويصعد في سلسلة **بناءا على** حتى الأمر الذي جاء من ماجنتو. انظر [دليل تكامل التجارة الإلكترونية](/ar/modules/ecommerce/ecommerce-integration-guide).

| الخيار | معرّف الحقل | ما يفعله |
|---|---|---|
| إنشاء فاتورة ماجنتو عند تطابق الشروط (Create Magento Invoice When Condition Applied) | `termConfig.createMagentoInvoiceWhenConditionApplied` | ينشئ الفاتورة في ماجنتو لذلك الأمر، إذا طابق المستند معايير إنشاء الفاتورة في الموقع. |
| إنشاء شحن فاتورة ماجنتو عند تطابق الشروط (Create Magento Invoice Shipping When Condition Applied) | `termConfig.createMagentoInvoiceShippingWhenConditionApplied` | ينشئ الشحنة في ماجنتو لذلك الأمر، إذا طابق المستند معايير إنشاء الشحن في الموقع. |
| تحديث حالة الأمر في ماجنتو عند تطابق الشروط في مستند بناءا علي (Update Magento Order Status When Condition Applied In From Doc) | `termConfig.updateMagentoStatusWhenConditionApplied` | يرسل حالة ذلك الأمر إلى ماجنتو، كما في قسم إرسال حالة الطلب إلى المتجر في الدليل نفسه. |

## التحكم في تحديث الأسعار (Price-Update Control)

شكوى «غيّرت التوجيه فاختفت الخصومات» شائعة، وهي ليست فقدًا للبيانات. ففي مستند المبيعات تُحسب أسعار **كل السطور** وخصوماتها من جديد عندما يغيّر المستخدم **التوجيه** أو **التاريخ الفعلي** أو **الذمة**. وتُحسب من جديد أيضًا عند تغيير **العميل**، لكن فقط إذا فُعّل *تحديث السعر مع تغيير العميل* في إعدادات سلسلة التوريد. وكل سعر أو خصم كُتب يدويًا يُستبدل بما تعطيه قوائم الأسعار والعروض. أما تغيير كمية الصنف أو وحدته فيعيد تسعير ذلك السطر وحده. والخيارات التالية توقف إعادة الاحتساب هذه، إما لحدث واحد أو بالكامل.

تُضاف هذه الخيارات إلى مجموعة "بناءً على" لأي مستند `IInvoice` (مبيعات ومشتريات). وتحدد متى تُجرى إعادة احتساب الأسعار آلياً، وأي سعر مقترح يُعرَض، وهل تُجمَّد الأسعار بعد "بناءً على" أو تغيير التوجيه أو تغيير التاريخ.

**عدم تحديث الأسعار على الإطلاق (Do Not Update Prices At All)** `termConfig.doNotUpdatePricesAtAll` — يعطّل إعادة احتساب الأسعار آلياً للمستند تماماً؛ وتبقى الأسعار كما أُدخلت.

**عدم حساب الأسعار والخصومات والأصناف المجانية إذا وجد سعر الوحدة (Do Not Calculate Prices, Discounts, and Free Items If Unit Price Exists)** `termConfig.doNotCalcPricesIfUnitPriceExist` — يتخطى حساب السعر/الخصم/الصنف المجاني لأي سطر له سعر وحدة بالفعل.

**تجاهل "عدم حساب الأسعار إذا وجد سعر الوحدة" قبل الحفظ أول مرة (Ignore "Do Not Calculate Prices If Unit Price Exists" Before First Save)** `termConfig.ignoreDoNotCalcPricesIfUnitPriceExistBeforeFirstSave` — يعلّق المفتاح أعلاه حتى أول حفظ للمستند، فيُجرى التسعير المبدئي.

مع تفعيل *عدم حساب الأسعار … إذا وجد سعر الوحدة*، يعيد تغيير الصنف تسعير سطره، أما تغيير أي شيء آخر فيه فلا. تسمّي الخيارات الأربعة التالية حقولًا أخرى في السطر يعيد تغييرها تسعير السطر رغم ذلك، في مستندات المبيعات:

| الخيار | معرّف الحقل |
|---|---|
| إعادة احتساب الأسعار دائما مع الوحدة (Recalculate Prices Always With UOM) | `termConfig.recalculatePricesAlwaysWithUOM` |
| إعادة احتساب الأسعار دائما مع اللون (Recalculate Prices Always With Color) | `termConfig.recalculatePricesAlwaysWithColor` |
| إعادة احتساب الأسعار دائما مع المقاس (Recalculate Prices Always With Size) | `termConfig.recalculatePricesAlwaysWithSize` |
| إعادة احتساب الأسعار دائما مع الإصدار (Recalculate Prices Always With Revision) | `termConfig.recalculatePricesAlwaysWithRevisionId` |

**عدم نزول سعر الوحدة للصنف تلقائياً (Do Not Automatically Add Unit Price)** `termConfig.doNotAddUnitPriceAuto` — يمنع تعبئة سعر الوحدة تلقائياً عند اختيار الصنف؛ فعلى المستخدم إدخاله.

**اقتراح أقل سعر للصنف (Suggest Minimum Price)** `termConfig.suggestMinPrice` — يقترح أقل سعر للصنف كسعر للسطر.

**اقتراح السعر الافتراضي للصنف (Suggest Default Price)** `termConfig.suggestDefaultPrice` — يقترح السعر الافتراضي للصنف كسعر للسطر.

**اقتراح أقصى سعر للصنف (Suggest Maximum Price)** `termConfig.suggestMaxPrice` — يقترح أقصى سعر للصنف كسعر للسطر.

تجمّد المفاتيح أدناه الأسعار بعد أحداث محددة فلا يُعاد احتسابها:

| الخيار | معرّف الحقل |
|---|---|
| عدم تحديث الأسعار بعد بناءً على | `termConfig.doNotUpdatePricesAfterFromDoc` |
| عدم تحديث أسعار وخصومات الأصناف المنسوخة من بناءً على | `termConfig.doNotUpdatePricesAndDiscountsCopiedFromDoc` |
| عدم تحديث الأسعار عند وجود سند بيع في بناءً على | `termConfig.doNotUpdatePricesWhenThereSalesDocInFromDoc` |
| عدم تحديث الأسعار بعد تغيير التوجيه | `termConfig.doNotUpdatePricesAfterTerm` |
| عدم تحديث الأسعار بعد تغيير التاريخ | `termConfig.doNotUpdatePricesAfterValueDate` |

## الدفعات بالتقسيط (Installments)

تتحكم هذه الخيارات في جدولة الأقساط على مستندات `IInvoice` ومجموعة "بناءً على" الأوسع.

**تدفع بالتقسيط (Paid in Installments)** `termConfig.paidInInstallments` — يعلّم المستندات تحت هذا التوجيه على أنها تُدفع وفق جدول أقساط، مما يتيح سطور الأقساط.

**دفع الأقساط بالترتيب (Pay Installments In Order)** `termConfig.payInstallmentsInOrder` — يفرض دفع الأقساط بتسلسلها المحدد (الأقدم أولاً).

**عدم نسخ سطور الدفعات من بناءً على (Do Not Copy Installments Lines Of From Doc)** `termConfig.doNotCopyInstallmentsLinesOfFromDoc` — يمنع نسخ سطور الأقساط عند بناء المستند من "بناءً على".

**السماح بدفع مبلغ أكبر من قيمة الفاتورة (Allow Payment More Than Invoice Amount)** `termConfig.allowPaymentMoreThanInvoiceAmount` — يسمح بتسجيل مبالغ دفع تتجاوز إجمالي الفاتورة (الدفع الزائد).
