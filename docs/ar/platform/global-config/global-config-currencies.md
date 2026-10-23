---
description: "صفحة تفقيط العملات في الإعدادات العامة: الكلمات التي يستخدمها النظام لكل عملة لكتابة المبلغ بالحروف على الشيكات والفواتير، ولماذا تحتاج العملة الواحدة كل هذه الأعمدة."
entities: [ConfigEntry]
menu: إدارة النظام ← الإعدادات ← إعدادات النظام
---

# تفقيط العملات

التفقيط هو كتابة المبلغ بالحروف — ذلك السطر على الشيك أو الفاتورة الذي يقرأ «ألف ومئتا جنيه مصري وخمسون قرشاً فقط لا غير». وتحمل هذه الصفحة المفردات التي يحتاجها النظام ليكوّن تلك الجملة صحيحةً.

![صفحة تفقيط العملات](./images/gc-currencies-ar.png)

## لماذا تحتاج العملة الواحدة كل هذه الأعمدة

تحتاج العملة في الإنجليزية كلمتين: *pound* و*pounds*. أما العربية فأصعب، لأن الاسم يتغيّر شكله بحسب عدده. ولذلك يخزّن النظام أربع صور لاسم كل عملة وأربعاً لاسم كسرها:

| العدد | الصورة المخزّنة | مثال |
|---|---|---|
| 1 | `arabic1CurrencyName` | جنيه مصري |
| 2 | `arabic2CurrencyName` | جنيهان مصريان |
| 3 – 10 | `arabic310CurrencyName` | جنيهات مصرية |
| 11 – 99 | `arabic1199CurrencyName` | جنيهاً مصرياً |

والصور الأربع نفسها موجودة للوحدة الكسرية — القرش والهللة والفلس — تحت `arabic1CurrencyPartName` و`arabic2CurrencyPartName` و`arabic310CurrencyPartName` و`arabic1199CurrencyPartName`.

ويهمّ التذكير والتأنيث أيضاً، لأن لفظ العدد يجب أن يطابقه. ويسجّله حقلا **Is Currency Name Feminine?** (`currencyNameFeminine`) و**Is Currency Part Name Feminine?** (`currencyPartNameFeminine`) — فالليرة السورية مؤنثة والجنيه المصري ليس كذلك.

## الجدول

**تفقيط العملة** `value.info.tafqeetInfo` *(جدول)* — سطر لكل عملة. ويأتي النظام بنحو أربعين عملة مملوءة سلفاً، تغطي العالم العربي والعملات العالمية الرئيسية، فلا تلمس معظم التركيبات هذه الشاشة أبداً.

ويحمل كل سطر:

- **الوصف** و**Currency Code** — اسم العملة ورمزها الثلاثي (`EGP`، `SAR`، `USD`)، وبه يُطابَق السطر بالمبلغ.
- **English Currency Name** و**English Plural Currency Name** — المفرد والجمع، وهو كل ما تحتاجه الإنجليزية.
- **English Currency Part Name** و**English Plural Currency Part Name** — والمثل للوحدة الكسرية.
- الصور العربية الثماني وعلامتَي التأنيث الموصوفتين أعلاه.
- **Part Precision** — كم خانة عشرية للوحدة الكسرية. ومعظم العملات تستعمل 2 (مئة قرش للجنيه)، بينما الدينار الكويتي والبحريني والأردني والريال العماني والدينار التونسي والليبي والعراقي تستعمل 3 (ألف فلس للدينار). وإن أخطأت فيها كُتب المبلغ 1.500 ديناراً بخمسين فلساً بدل خمسمئة.

::: tip أضف سطراً لعملة تفقّطها فعلاً فقط
يحكم هذا الجدول المبالغ المكتوبة بالحروف، لا أسعار الصرف ولا المحاسبة. فالعملة التي تتاجر بها ولا تكتبها بالحروف على مستند لا تحتاج سطراً هنا. وحين تضيف سطراً فاملأ الصور العربية الأربع — فالصورة الناقصة تنتج جملة خاطئة نحوياً على شيك، وهو بالضبط نوع المستندات التي يُلحَظ فيها ذلك.
:::

وتُحمَّل القيم في الذاكرة عند حفظ الإعدادات، فيسري التصحيح على أول مستند تطبعه بعده.

## الإعدادات في هذه الصفحة

كل حقول هذه الصفحة باسمها الظاهر على الشاشة باللغتين، لتجد الإعداد بالاسم الذي تراه. ويشير العمود الأخير إلى القسم الذي يشرحه.

| الاسم العربي | الاسم الإنجليزي | معرّف الحقل | المعنى |
|---|---|---|---|
| تفقيط العملة | Tafqeet | `value.info.tafqeetInfo` | [الجدول](#ljdwl) |
| الوصف | Description | `value.info.tafqeetInfo.description` | [الجدول](#ljdwl) |
| Currency Code | Currency Code | `value.info.tafqeetInfo.currencyCode` | [الجدول](#ljdwl) |
| Is Currency Name Feminine? | Is Currency Name Feminine? | `value.info.tafqeetInfo.currencyNameFeminine` | [الجدول](#ljdwl) |
| English Currency Name | English Currency Name | `value.info.tafqeetInfo.englishCurrencyName` | [الجدول](#ljdwl) |
| English Plural Currency Name | English Plural Currency Name | `value.info.tafqeetInfo.englishpluralCurrencyName` | [الجدول](#ljdwl) |
| English Currency Part Name | English Currency Part Name | `value.info.tafqeetInfo.englishCurrencyPartName` | [الجدول](#ljdwl) |
| English Plural Currency Part Name | English Plural Currency Part Name | `value.info.tafqeetInfo.englishPluralCurrencyPartName` | [الجدول](#ljdwl) |
| Arabic1 Currency Name | Arabic1 Currency Name | `value.info.tafqeetInfo.arabic1CurrencyName` | [الجدول](#ljdwl) |
| Arabic2 Currency Name | Arabic2 Currency Name | `value.info.tafqeetInfo.arabic2CurrencyName` | [الجدول](#ljdwl) |
| Arabic310 Currency Name | Arabic310 Currency Name | `value.info.tafqeetInfo.arabic310CurrencyName` | [الجدول](#ljdwl) |
| Arabic1199 Currency Name | Arabic1199 Currency Name | `value.info.tafqeetInfo.arabic1199CurrencyName` | [الجدول](#ljdwl) |
| Arabic1 Currency Part Name | Arabic1 Currency Part Name | `value.info.tafqeetInfo.arabic1CurrencyPartName` | [الجدول](#ljdwl) |
| Arabic2 Currency Part Name | Arabic2 Currency Part Name | `value.info.tafqeetInfo.arabic2CurrencyPartName` | [الجدول](#ljdwl) |
| Arabic310 Currency Part Name | Arabic310 Currency Part Name | `value.info.tafqeetInfo.arabic310CurrencyPartName` | [الجدول](#ljdwl) |
| Arabic1199 Currency Part Name | Arabic1199 Currency Part Name | `value.info.tafqeetInfo.arabic1199CurrencyPartName` | [الجدول](#ljdwl) |
| Part Precision | Part Precision | `value.info.tafqeetInfo.partPrecision` | [الجدول](#ljdwl) |
| Is Currency Part Name Feminine? | Is Currency Part Name Feminine? | `value.info.tafqeetInfo.currencyPartNameFeminine` | [الجدول](#ljdwl) |
