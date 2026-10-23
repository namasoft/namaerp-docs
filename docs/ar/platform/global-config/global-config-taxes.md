---
description: "صفحة الضرائب والفاتورة الإلكترونية في الإعدادات العامة: كيف تُوصف كل ضريبة من ضرائب السطر الأربع وتُحسب، وإعدادات الضرائب العامة، وخصم التقريب، وإعدادات الفاتورة الإلكترونية."
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# الضرائب والفاتورة الإلكترونية

يحمل النظام أربع ضرائب مستقلة على كل سطر مستند، وهي عامة عن قصد: فالضريبة 1 هي ضريبة القيمة المضافة عادةً، لكن الضريبة 2 قد تكون خصماً تحت حساب الضريبة، والضريبة 3 رسماً بلدياً، والضريبة 4 دمغة. وما *هي* كل ضريبة يأتي كلياً من طريقة ضبطها هنا.

ولأن هذه الإعدادات نفسها يستعملها الخادم، والعميل على الويب أثناء كتابة المستخدم، وجهاز نقطة البيع، فإن الثلاثة يصلون إلى الرقم نفسه — ولهذا يهمّ أن تُضبط مرة واحدة مركزياً وأن تكون مفهومة.

![صفحة الضرائب والفاتورة الإلكترونية](./images/gc-taxes-ar.png)

## كيف تُوصف الضريبة

تحصل كل ضريبة من الأربع على المجموعة نفسها من الخيارات. وبدل تكرارها أربع مرات، إليك معنى كل خيار، مستعملين الضريبة *ن* للدلالة على أي منها.

**وقت حساب ضريبة ن** `value.info.taxNLocation` — موضع الضريبة في سلسلة حساب السطر: بعد السعر الأساسي مباشرة (**السعر الاساسي**)، أو بعد أحد الخصومات الثمانية مباشرة، أو بعد خصم الرأس. وكل أثر يأتي بعدها في السلسلة يرى إجماليًا جاريًا يشمل هذه الضريبة. والموقع يحدد الموضع فقط — أما هل تُضاف الضريبة إلى السطر أم تُخصم منه فيحدده خيار **ضريبة ن خصم** أدناه. وحين تُختار **إعدادات تأثير الخصومات و الضرائب**، يحل ترتيبها محل هذه المواضع.

**وعاء ضريبة ن** `value.info.taxNApplyType` — الوعاء الذي تُطبَّق عليه النسبة، وهو أهم اختيار في هذه المجموعة على الإطلاق. وتتدرّج خياراته مع حساب السطر: **إجمالي السعر**، و**السعر بعد الخصم 1** حتى **السعر بعد الخصم 8**، و**بعد خصم الرأس**، وقيمة أي خصم منفرد، وقيمة خصم الفاتورة، وقيمة ضريبة أخرى، أو **مخصص**. فضريبة القيمة المضافة التي تُحتسب على الصافي بعد كل الخصومات التجارية هي «السعر بعد الخصم ن» لآخر خصم في سلسلتك؛ والضريبة المحتسبة على الإجمالي هي «إجمالي السعر».

**ضريبة ن خصم** `value.info.taxNIsDiscount` — يسم الضريبة بأنها اقتطاع لا إضافة. والخصم تحت حساب الضريبة هو الحالة المعتادة: يُحسب كضريبة لكنه يُطرح مما يدفعه العميل.

**ضريبة ن قيمة و ليست نسبة** `value.info.taxNIsValue` — تُدخل الضريبة كمبلغ مطلق بدل نسبة مئوية. استعمله مع الرسوم الثابتة على الوحدة.

**قيمة ضريبة ن للإجمالي و ليس لكل وحدة** `value.info.taxNValueIsForTotal` — يُقرأ مع الخيار السابق: حين تكون الضريبة قيمة، هل هي للوحدة أم للسطر كله؟ التفعيل يعني السطر كله.

**السعر يشمل الضريبة ن** `value.info.priceIncludesTax` (للضريبة 1)، `value.info.priceIncludesTax2`, `...3`, `...4` — سعر الوحدة يتضمن هذه الضريبة أصلاً، فيستخرجها النظام بدل إضافتها فوقه. وهذه حالة التجزئة: فسعر الرف هو ما يدفعه العميل، وعلى النظام أن يستخرج الضريبة منه عكسياً.

**ضريبة ن غير مضافة الي الإجمالي** `value.info.taxNNotIncludedInTotal` — تُحسب الضريبة وتُعرض لكنها لا تدخل في إجمالي المستند. تُستعمل مع الضرائب الإعلامية التي يُبلَّغ عنها ولا تُحصَّل على هذا المستند.

**عدم إضافة قيمة إضافية ن إلي إجمالي السعر** `value.info.doNotUseTaxNPercentageAsAdditionalValueN` — تُنسخ نسبة الضريبة عادةً إلى حقل القيمة الإضافية على السطر، حيث تلتقطها التقارير وعمليات الربط. فعّل هذا الخيار إذا أردت ذلك الحقل لغرض آخر.

**الضريبة ن كود الضريبة ن** / **الضريبة ن كود الضريبة الفرعي ن** `value.info.taxesCodes.taxNTaxAuthType`, `...taxNTaxAuthSubType` — الأكواد التي تتوقعها مصلحة الضرائب لهذه الضريبة على الفاتورة الإلكترونية.

**الضريبة ن كود الضريبة الصفرية ن** / **الضريبة ن كود الضريبة الصفرية الفرعي ن** `value.info.taxesCodes.taxNZeroTaxAuthType`, `...taxNZeroTaxAuthSubType` — الأكواد المستعملة بدلاً منها حين تكون قيمة الضريبة صفراً، إذ تطلب معظم المصالح الإبلاغ عن التوريد صفري النسبة بكود يختلف عن كود التوريد الخاضع.

**إرسال الضريبة ن بصفر** `value.info.taxesCodes.sendTaxNWithZero` — يُضمّن عنصر الضريبة في الإرسال حتى لو كانت قيمته صفراً. فبعض المصالح تشترط وجود السطر، وبعضها يرفضه.

::: tip اضبط السلسلة على الورق أولاً
الموقع ونوع التطبيق وإعدادات الخصومات في [صفحة الخصومات](./global-config-discounts.md) تصف معاً سلسلة حساب واحدة. اكتب سطر فاتورة حقيقياً على الورق — سعر القائمة، وكل خصم، وكل ضريبة، والإجمالي الذي يدفعه العميل فعلاً — ثم اضبط الخيارات بعد ذلك ليعيد النظام إنتاجه. فتغيير نوع التطبيق لاحقاً يغيّر حسابات كل مستند تُعاد حسبته.
:::

## إعدادات الضرائب العامة

**إعدادات تأثير الخصومات و الضرائب** `value.info.effectsConfig` — يشير إلى ملف إعدادات تأثيرات الضرائب والخصومات. وهو البديل العام للسلسلة الثابتة أعلاه: فبدل الترتيب المدمج للخصومات والضرائب، يعرّف ذلك الملف حتى ثلاثة عشر تأثيراً مالياً وترتيبها وما يُحسب عليه كل منها بالضبط. الجأ إليه حين يتعذّر التعبير عن حساباتك بالإعدادات القياسية فعلاً.

**سياسة الضريبة الافتراضية لسعر الصنف** `value.info.defaultTaxPlanForItemPrice` — خطة الضرائب المفترضة عند تسعير صنف ليست له خطة خاصة.

**عدم احتساب ضريبة للصنف المجاني** `value.info.noTaxesForFreeItem` — يصفّر الضرائب الأربع على الأسطر الموسومة بأنها أصناف مجانية، فلا تولّد الهدية الترويجية ضريبة على سعر صفري.

**كود سبب الإعفاء (E) - هيئة الزكاة** `value.info.taxesCodes.vatExemptReasonCode` — سبب الإعفاء الافتراضي المُرسل مع التوريدات المعفاة.

**كود سبب نسبة الصفر (Z) - هيئة الزكاة** `value.info.taxesCodes.vatZeroRateReasonCode` — السبب الافتراضي المُرسل مع التوريدات صفرية النسبة.

**نص سبب عدم الخضوع للضريبة (O) - هيئة الزكاة** `value.info.taxesCodes.vatOutOfScopeReasonText` — نص حر يُستعمل سبباً للتوريدات الخارجة عن نطاق ضريبة القيمة المضافة.

## خصم التقريب

كثيراً ما تقرّب الأعمال النقدية إجمالي الفاتورة إلى رقم قابل للدفع — فيصير الإجمالي 99.87 مئةً كاملة أو العكس — وتقيّد الفرق في مكان مناسب.

**تفعيل خصم التقريب** `value.info.activateApproximationDiscount` — يفعّل التقريب.

**خصم قيمة التقريب عندما تكون القيمة اقل من او تساوى** `value.info.approximationDiscountValue` — خطوة التقريب. اضبطها على أصغر عملة تتعامل بها فعلاً: `0.05` إن لم يكن لديك أصغر من خمسة قروش.

**إعتبار إجمالى المدفوع من السندات مع تفعيل خصم التقريب** `value.info.considerVouchersPaymentWithApproxDisc` — يُدخل الدفع بالقسائم في المبلغ المقرَّب، بدل تقريب الجزء النقدي وحده.

وهذه الثلاثة تقرر *هل* نقرّب و*إلى أي حد*. أما *أين* يُقيَّد المبلغ المقرَّب فقرار على مستوى المستند: فلكل توجيه مستند جانبه المحاسبي الخاص بخصم التقريب، وتضيف توجيهات المبيعات مفتاحًا للمدفوعات الموسومة بـ *عدم التأثير على المتبقي* — انظر [إعدادات التأثيرات المحاسبية](/ar/modules/supplychain/document-terms/doc-term-accounting-effects).

## الفاتورة الإلكترونية

**عرض صفحة الفاتورة الإلكترونية الخاصة بـ** `value.info.einvoicePageShowType` — يدعم النظام عدة أنظمة وطنية للفوترة الإلكترونية، ويضيف كل منها صفحة حقول خاصة به إلى الشاشات الضريبية. اختر **مصر** أو **ZATCA** (السعودية) أو **JoFotara** (الأردن) أو **الإمارات** أو **كل الصفحات**. واختيار البلد الذي تعمل فيه يُخفي حقول الأنظمة الأخرى، وهو تقليل كبير للتشويش على الشاشة. وتركه فارغاً يتصرف كاختيار مصر.

**اقصي عدد للسطور عند تجميع مستندات الضرائب** `value.info.maxNumberOfLinesWhenCollectTaxAuthDocs` — عند تجميع المستندات لإرسالها إلى المصلحة، يحدّ هذا الخيار عدد ما يدخل الدفعة الواحدة. أنقصه إذا انتهت مهلة الإرسال، وزده لترسل دفعات أقل عدداً وأكبر حجماً.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| إعدادات تأثير الخصومات و الضرائب | Tax and Discounts Effects Configuration | `value.info.effectsConfig` | [إعدادات الضرائب العامة](#aaddt-lDryb-laam) |
| سياسة الضريبة الافتراضية لسعر الصنف | Default Tax Plan For Item Price | `value.info.defaultTaxPlanForItemPrice` | [إعدادات الضرائب العامة](#aaddt-lDryb-laam) |
| عدم احتساب ضريبة للصنف المجاني | No Taxes For Free Item | `value.info.noTaxesForFreeItem` | [إعدادات الضرائب العامة](#aaddt-lDryb-laam) |
| كود سبب الإعفاء (E) - هيئة الزكاة | ZATCA Exempt (E) Reason Code | `value.info.taxesCodes.vatExemptReasonCode` | [إعدادات الضرائب العامة](#aaddt-lDryb-laam) |
| كود سبب نسبة الصفر (Z) - هيئة الزكاة | ZATCA Zero Rate (Z) Reason Code | `value.info.taxesCodes.vatZeroRateReasonCode` | [إعدادات الضرائب العامة](#aaddt-lDryb-laam) |
| نص سبب عدم الخضوع للضريبة (O) - هيئة الزكاة | ZATCA Out Of Scope (O) Reason Text | `value.info.taxesCodes.vatOutOfScopeReasonText` | [إعدادات الضرائب العامة](#aaddt-lDryb-laam) |
| وقت حساب ضريبة 1 | Tax 1 Location | `value.info.tax1Location` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| وعاء ضريبة 1 | Tax 1 Apply Type | `value.info.tax1ApplyType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 1 خصم | Tax 1 Is Discount | `value.info.tax1IsDiscount` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 1 قيمة و ليست نسبة | Tax 1 Is Value Not Percentage | `value.info.tax1IsValue` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| قيمة ضريبة 1 للإجمالي و ليس لكل وحدة | Tax 1 Value Is For Total Not Per Piece | `value.info.tax1ValueIsForTotal` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| السعر يشمل الضريبة 1 | Price Includes Tax 1 | `value.info.priceIncludesTax` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 1 غير مضافة الي الإجمالي | Tax 1 Not Included In Total | `value.info.tax1NotIncludedInTotal` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| عدم إضافة قيمة إضافية 1 إلي إجمالي السعر | Do Not Use Tax1 Percentage As Additional Value1 | `value.info.doNotUseTax1PercentageAsAdditionalValue1` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 1 كود الضريبة 1 | Tax 1 Tax Type | `value.info.taxesCodes.tax1TaxAuthType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 1 كود الضريبة الفرعي 1 | Tax 1 Tax SubType | `value.info.taxesCodes.tax1TaxAuthSubType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 1 كود الضريبة الصفرية 1 | Tax 1 Zero Tax Auth Type | `value.info.taxesCodes.tax1ZeroTaxAuthType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 1 كود الضريبة الصفرية الفرعي 1 | Tax 1 Zero Tax Auth Sub Type | `value.info.taxesCodes.tax1ZeroTaxAuthSubType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| إرسال الضريبة 1 بصفر | Send Tax 1 With Zero | `value.info.taxesCodes.sendTax1WithZero` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| وقت حساب ضريبة 2 | Tax 2 Location | `value.info.tax2Location` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| وعاء ضريبة 2 | Tax 2 Apply Type | `value.info.tax2ApplyType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 2 خصم | Tax 2 Is Discount | `value.info.tax2IsDiscount` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 2 قيمة و ليست نسبة | Tax 2 Is Value Not Percentage | `value.info.tax2IsValue` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| قيمة ضريبة 2 للإجمالي و ليس لكل وحدة | Tax 2 Value Is For Total Not Per Piece | `value.info.tax2ValueIsForTotal` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| السعر يشمل الضريبة 2 | Price Includes Tax 2 | `value.info.priceIncludesTax2` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 2 غير مضافة الي الإجمالي | Tax 2 Not Included In Total | `value.info.tax2NotIncludedInTotal` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| عدم إضافة قيمة إضافية 2 إلي إجمالي السعر | Do Not Use Tax2 Percentage As Additional Value2 | `value.info.doNotUseTax2PercentageAsAdditionalValue2` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 2 كود الضريبة 2 | Tax2 Tax Type | `value.info.taxesCodes.tax2TaxAuthType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 2 كود الضريبة الفرعي 2 | Tax2 Tax Sub Type | `value.info.taxesCodes.tax2TaxAuthSubType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 2 كود الضريبة الصفرية 2 | Tax 2 Zero Tax Auth Type | `value.info.taxesCodes.tax2ZeroTaxAuthType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 2 كود الضريبة الصفرية الفرعي 2 | Tax 2 Zero Tax Auth Sub Type | `value.info.taxesCodes.tax2ZeroTaxAuthSubType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| إرسال الضريبة 2 بصفر | Send Tax 2 With Zero | `value.info.taxesCodes.sendTax2WithZero` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| وقت حساب ضريبة 3 | Tax 3 Location | `value.info.tax3Location` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| وعاء ضريبة 3 | Tax 3 Apply Type | `value.info.tax3ApplyType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 3 خصم | Tax 3 Is Discount | `value.info.tax3IsDiscount` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 3 قيمة و ليست نسبة | Tax 3 Is Value Not Percentage | `value.info.tax3IsValue` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| قيمة ضريبة 3 للإجمالي و ليس لكل وحدة | Tax 3 Value Is For Total Not Per Piece | `value.info.tax3ValueIsForTotal` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| السعر يشمل الضريبة 3 | Price Includes Tax 3 | `value.info.priceIncludesTax3` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 3 غير مضافة الي الإجمالي | Tax 3 Not Included In Total | `value.info.tax3NotIncludedInTotal` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| عدم إضافة قيمة إضافية 3 إلي إجمالي السعر | Do Not Use Tax3 Percentage As Additional Value3 | `value.info.doNotUseTax3PercentageAsAdditionalValue3` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 3 كود الضريبة 3 | Tax3 Tax Type | `value.info.taxesCodes.tax3TaxAuthType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 3 كود الضريبة الفرعي 3 | Tax3 Tax Sub Type | `value.info.taxesCodes.tax3TaxAuthSubType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 3 كود الضريبة الصفرية 3 | Tax 3 Zero Tax Auth Type | `value.info.taxesCodes.tax3ZeroTaxAuthType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 3 كود الضريبة الصفرية الفرعي 3 | Tax 3 Zero Tax Auth Sub Type | `value.info.taxesCodes.tax3ZeroTaxAuthSubType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| إرسال الضريبة 3 بصفر | Send Tax 3 With Zero | `value.info.taxesCodes.sendTax3WithZero` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| وقت حساب ضريبة 4 | Tax 4 Location | `value.info.tax4Location` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| وعاء ضريبة 4 | Tax 4 Apply Type | `value.info.tax4ApplyType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 4 خصم | Tax 4 Is Discount | `value.info.tax4IsDiscount` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 4 قيمة و ليست نسبة | Tax 4 Is Value Not Percentage | `value.info.tax4IsValue` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| قيمة ضريبة 4 للإجمالي و ليس لكل وحدة | Tax 4 Value Is For Total Not Per Piece | `value.info.tax4ValueIsForTotal` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| السعر يشمل الضريبة 4 | Price Includes Tax 4 | `value.info.priceIncludesTax4` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| ضريبة 4 غير مضافة الي الإجمالي | Tax 4 Not Included In Total | `value.info.tax4NotIncludedInTotal` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| عدم إضافة قيمة إضافية 4 إلي إجمالي السعر | Do Not Use Tax4 Percentage As Additional Value4 | `value.info.doNotUseTax4PercentageAsAdditionalValue4` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 4 كود الضريبة 4 | Tax4 Tax Type | `value.info.taxesCodes.tax4TaxAuthType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 4 كود الضريبة الفرعي 4 | Tax4 Tax Sub Type | `value.info.taxesCodes.tax4TaxAuthSubType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 4 كود الضريبة الصفرية 4 | Tax 4 Zero Tax Auth Type | `value.info.taxesCodes.tax4ZeroTaxAuthType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| الضريبة 4 كود الضريبة الصفرية الفرعي 4 | Tax 4 Zero Tax Auth Sub Type | `value.info.taxesCodes.tax4ZeroTaxAuthSubType` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| إرسال الضريبة 4 بصفر | Send Tax 4 With Zero | `value.info.taxesCodes.sendTax4WithZero` | [كيف تُوصف الضريبة](#kyf-tuwSf-lDryb) |
| تفعيل خصم التقريب | Activate Approximation Discount | `value.info.activateApproximationDiscount` | [خصم التقريب](#khSm-ltqryb) |
| خصم قيمة التقريب عندما تكون القيمة اقل من او تساوى | Approximation Discount Value | `value.info.approximationDiscountValue` | [خصم التقريب](#khSm-ltqryb) |
| إعتبار إجمالى المدفوع من السندات مع تفعيل خصم التقريب | Consider Vouchers Payment With Activate Approximation Discount | `value.info.considerVouchersPaymentWithApproxDisc` | [خصم التقريب](#khSm-ltqryb) |
| عرض صفحة الفاتورة الإلكترونية الخاصة بـ | e-Invoice Page To Show | `value.info.einvoicePageShowType` | [الفاتورة الإلكترونية](#lftwr-llktrwny) |
| اقصي عدد للسطور عند تجميع مستندات الضرائب | Max Number Of Lines When Collect Tax Auth Docs | `value.info.maxNumberOfLinesWhenCollectTaxAuthDocs` | [الفاتورة الإلكترونية](#lftwr-llktrwny) |
