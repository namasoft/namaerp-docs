---
description: "صفحة الخصومات في الإعدادات العامة: إعدادات الخصومات العامة، ولكل خصم من خصومات السطر الثمانية وخصم رأس المستند: على أي قيمة يُحسب وكيف يتفاعل مع الضرائب الأربع."
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# الخصومات

يستطيع سطر المستند في النظام أن يحمل حتى ثمانية خصومات منفصلة، إضافةً إلى خصم على رأس المستند. وقد تبدو الثمانية مبالغة حتى تقابل موزّعاً سعره هو سعر القائمة، ناقص الخصم التجاري، ناقص خصم الكمية، ناقص العرض الموسمي، ناقص خصم السداد المعجّل — كلٌّ متفاوض عليه على حدة، وكلٌّ يجب أن يظهر على الفاتورة قائماً بذاته.

وتحدد هذه الصفحة وعاء حساب كل خصم وكيفية تفاعله مع الضرائب الأربع.

![صفحة الخصومات](./images/gc-discounts-ar.png)

::: tip قد ترى أقل من ثمانية
الخصومات الثمانية مرخَّصة كلٌّ على حدة. فإن كانت تركيبتك مرخّصة لثلاثة، لم يظهر في هذه الصفحة وعلى أسطر المستندات إلا الخصم 1 إلى الخصم 3.
:::

## إعدادات الخصومات العامة

**وقت حساب التخفيض في الفاتورة** `value.discountLocation` *(الافتراضي الخصم 1)* — المستندات التي فيها حقل خصم واحد عام تحتاج أن تعرف أي الخانات الثماني يقابله. وما لم يكن لديك سبب لغير ذلك، اتركه على الخصم 1 لتقع الحالة البسيطة في الخانة الأولى.

**نوع تطبيق خصم الرأس** `value.info.headerDiscountApplyType` — الوعاء الذي تُطبَّق عليه نسبة خصم الرأس، بالقائمة نفسها المستعملة مع خصومات الأسطر أدناه. ويُطبَّق خصم الرأس على المستند ككل بعد حساب الأسطر.

**السماح باستعمال قسيمة الخصومات اكثر من مرة اذا كان النوع نسبة** `value.info.allowUsingDiscountCouponManyTimesIfPercentageType` — يُستهلك كوبون الخصم عادةً بأول مستند يستخدمه. وكوبون النسبة ليس له رصيد يُستنفد، فيتيح هذا الخيار استخدامه مراراً — وهو السلوك الصحيح لكود حملة «خصم 10٪ طوال الموسم».

**السماح بإلغاء مكافأة حتي وإن تم استخدامها في فواتير** `value.info.allowReverseDiscountCouponEvenIfUsedInInvoices` — يسمح بعكس استخدام كوبون استهلكته فواتير بالفعل. ويلزم لتصحيح خطأ، لكنه يعني بقاء خصم على الفواتير لم يعد الكوبون يسجّله.

## من الخصم 1 إلى الخصم 8

لكل خصم من الثمانية الأنواع الثلاثة نفسها من الإعدادات. وباستعمال الخصم *ن* للدلالة على أي منها:

**وعاء خصم ن** `value.info.discountNApplyType` — الوعاء الذي تُطبَّق عليه النسبة. والخيارات هي السلسلة نفسها التي تستعملها الضرائب: إجمالي السعر، أو السعر بعد أي خصم سابق، أو بعد خصم الرأس، أو قيمة خصم أو ضريبة بعينها، أو وعاء مخصص. وهذا ما يرتّب الخصومات — فالخصم 2 المضبوط على «السعر بعد الخصم 1» يُركَّب فوق الخصم 1، أما المضبوط على «إجمالي السعر» فيُحسب على السعر الأصلي ويتجمّع الخصمان بالجمع البسيط.

::: info مركَّب أم متوازٍ — قرار مقصود
خصمان بنسبة 10٪ على إجمالي السعر يقتطعان 20٪. والخصمان نفسهما مطبَّقين واحداً تلو الآخر يقتطعان 19٪. وعلى عقد كبير يكون هذا الفرق مالاً حقيقياً، وهو محكوم كلياً بنوع التطبيق. تأكّد من الإدارة التجارية أي السلوكين تفترضه اتفاقيات الأسعار.
:::

**احتساب نسبة خصم ن من القيمة** `value.info.calcDiscNPercentFromValue` — يكتب المستخدم النسبة عادةً فيحسب النظام المبلغ. ومع تفعيل هذا الخيار تنعكس العلاقة: يكتب المستخدم المبلغ فيستنتج النظام النسبة التي يمثلها. فعّله مع الخصومات المتفاوض عليها كمبالغ مقطوعة («انزل 500») لا كنسب.

**خصم ضريبة 1** / **خصم ضريبة 2** / **خصم ضريبة 3** / **خصم ضريبة 4** `value.info.discountN.considerTax1` حتى `...considerTax4` — هل تدخل كل ضريبة من الأربع في الوعاء الذي يُحسب عليه هذا الخصم. والحالة الشائعة خصم يؤخذ على الصافي قبل ضريبة القيمة المضافة، ومعناها ترك خانة تلك الضريبة فارغة. ولا تؤشّرها إلا حيث يخصم الاتفاق التجاري فعلاً من المبلغ شامل الضريبة.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| وقت حساب التخفيض في الفاتورة | Invoice discount apply on | `value.discountLocation` | [إعدادات الخصومات العامة](#aaddt-lkhSwmt-laam) |
| وعاء خصم 8 | Header Discount Apply Type | `value.info.headerDiscountApplyType` | [إعدادات الخصومات العامة](#aaddt-lkhSwmt-laam) |
| السماح باستعمال قسيمة الخصومات اكثر من مرة اذا كان النوع نسبة | Allow Using Discount Coupon Many Times If Type Is Percentage | `value.info.allowUsingDiscountCouponManyTimesIfPercentageType` | [إعدادات الخصومات العامة](#aaddt-lkhSwmt-laam) |
| السماح بإلغاء مكافأة حتي وإن تم استخدامها في فواتير | Allow Reverse Discount Coupon Even If Used In Invoices | `value.info.allowReverseDiscountCouponEvenIfUsedInInvoices` | [إعدادات الخصومات العامة](#aaddt-lkhSwmt-laam) |
| وعاء خصم 1 | Discount 1 Apply Type | `value.info.discount1ApplyType` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| احتساب نسبة خصم 1 من القيمة | Calculate discount 1 percentage from value | `value.info.calcDisc1PercentFromValue` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 1 | Discount Tax 1 | `value.info.discount1.considerTax1` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 2 | Discount Tax 2 | `value.info.discount1.considerTax2` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 3 | Discount Tax 3 | `value.info.discount1.considerTax3` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 4 | Discount Tax 4 | `value.info.discount1.considerTax4` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| وعاء خصم 2 | Discount 2 Apply Type | `value.info.discount2ApplyType` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| احتساب نسبة خصم 2 من القيمة | Calculate discount 2 percentage from value | `value.info.calcDisc2PercentFromValue` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 1 | Discount Tax 1 | `value.info.discount2.considerTax1` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 2 | Discount Tax 2 | `value.info.discount2.considerTax2` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 3 | Discount Tax 3 | `value.info.discount2.considerTax3` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 4 | Discount Tax 4 | `value.info.discount2.considerTax4` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| وعاء خصم 3 | Discount 3 Apply Type | `value.info.discount3ApplyType` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| احتساب نسبة خصم 3 من القيمة | Calculate discount 3 percentage from value | `value.info.calcDisc3PercentFromValue` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 1 | Discount Tax 1 | `value.info.discount3.considerTax1` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 2 | Discount Tax 2 | `value.info.discount3.considerTax2` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 3 | Discount Tax 3 | `value.info.discount3.considerTax3` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 4 | Discount Tax 4 | `value.info.discount3.considerTax4` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| وعاء خصم 4 | Discount 4 Apply Type | `value.info.discount4ApplyType` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| احتساب نسبة خصم 4 من القيمة | Calculate discount 4 percentage from value | `value.info.calcDisc4PercentFromValue` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 1 | Discount Tax 1 | `value.info.discount4.considerTax1` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 2 | Discount Tax 2 | `value.info.discount4.considerTax2` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 3 | Discount Tax 3 | `value.info.discount4.considerTax3` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 4 | Discount Tax 4 | `value.info.discount4.considerTax4` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| وعاء خصم 5 | Discount 5 Apply Type | `value.info.discount5ApplyType` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| احتساب نسبة خصم 5 من القيمة | Calculate discount 5 percentage from value | `value.info.calcDisc5PercentFromValue` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 1 | Discount Tax 1 | `value.info.discount5.considerTax1` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 2 | Discount Tax 2 | `value.info.discount5.considerTax2` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 3 | Discount Tax 3 | `value.info.discount5.considerTax3` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 4 | Discount Tax 4 | `value.info.discount5.considerTax4` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| وعاء خصم 6 | Discount 6 Apply Type | `value.info.discount6ApplyType` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| احتساب نسبة خصم 6 من القيمة | Calculate discount 6 percentage from value | `value.info.calcDisc6PercentFromValue` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 1 | Discount Tax 1 | `value.info.discount6.considerTax1` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 2 | Discount Tax 2 | `value.info.discount6.considerTax2` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 3 | Discount Tax 3 | `value.info.discount6.considerTax3` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 4 | Discount Tax 4 | `value.info.discount6.considerTax4` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| وعاء خصم 7 | Discount 7 Apply Type | `value.info.discount7ApplyType` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| احتساب نسبة خصم 7 من القيمة | Calculate discount 7 percentage from value | `value.info.calcDisc7PercentFromValue` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 1 | Discount Tax 1 | `value.info.discount7.considerTax1` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 2 | Discount Tax 2 | `value.info.discount7.considerTax2` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 3 | Discount Tax 3 | `value.info.discount7.considerTax3` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 4 | Discount Tax 4 | `value.info.discount7.considerTax4` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| وعاء خصم 8 | Discount 8 Apply Type | `value.info.discount8ApplyType` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| احتساب نسبة خصم 8 من القيمة | Calculate discount 8 percentage from value | `value.info.calcDisc8PercentFromValue` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 1 | Discount Tax 1 | `value.info.discount8.considerTax1` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 2 | Discount Tax 2 | `value.info.discount8.considerTax2` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 3 | Discount Tax 3 | `value.info.discount8.considerTax3` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
| خصم ضريبة 4 | Discount Tax 4 | `value.info.discount8.considerTax4` | [من الخصم 1 إلى الخصم 8](#mn-lkhSm-1-l-lkhSm-8) |
