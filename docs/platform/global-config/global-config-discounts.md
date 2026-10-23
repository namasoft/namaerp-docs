---
description: "The Discounts tab of Global Configuration: the general discount settings and, for each of the eight line discounts and the header discount, what it is calculated on and how it interacts with the four taxes."
entities: [ConfigEntry]
menu: Administration → Settings → System Settings
---

# Discounts

A document line in Nama can carry up to eight separate discounts plus one discount at the document header. Eight sounds excessive until you meet a distributor whose price is list price, minus the trade discount, minus the volume discount, minus the seasonal promotion, minus the settlement discount — each negotiated separately, each needing to appear on the invoice in its own right.

This tab decides what each discount is calculated on and how it interacts with the four taxes.

![Discounts tab](../../ar/platform/global-config/images/gc-discounts-en.png)

::: tip You may see fewer than eight
The eight line discounts are separately licensed. If your installation is licensed for three, only Discount 1 to Discount 3 appear on this tab and on document lines.
:::

## General discount settings

**Invoice discount apply on** `value.discountLocation` *(default Discount 1)* — Documents that have a single, generic "discount" field need to know which of the eight slots it corresponds to. Unless you have a reason to do otherwise, leave this on Discount 1 so the simple case lands in the first slot.

**Header Discount Apply Type** `value.info.headerDiscountApplyType` — The base the header discount percentage is applied to, using the same list of options as the line discounts below. The header discount is applied to the document as a whole, after the lines have been calculated.

**Allow Using Discount Coupon Many Times If Type Is Percentage** `value.info.allowUsingDiscountCouponManyTimesIfPercentageType` — A discount coupon is normally consumed by the first document that redeems it. A percentage coupon has no balance to run down, so this option lets it be redeemed repeatedly — the right behaviour for a "10% off, all season" campaign code.

**Allow Reverse Discount Coupon Even If Used In Invoices** `value.info.allowReverseDiscountCouponEvenIfUsedInInvoices` — Permits reversing a coupon redemption that invoices have already consumed. Needed to unwind a mistake, but it means the invoices keep a discount whose coupon no longer records it.

## Discount 1 through Discount 8

Each of the eight discounts has the same three kinds of setting. Using discount *N* to stand for any of them:

**Discount N Apply Type** `value.info.discountNApplyType` — What the percentage is applied to. The choices are the same chain used by the taxes: the total price, the price after any earlier discount, after the header discount, the value of a particular discount or tax, or a custom base. This is what puts the discounts in order — a discount 2 set to *After Discount 1 Price* is compounded on top of discount 1, whereas one set to *Total Price* is calculated on the original price and the two simply add up.

::: info Compounded or parallel — decide deliberately
Two 10% discounts applied to the total price take 20% off. The same two applied one after the other take 19%. On a large contract that difference is real money, and it is decided entirely by the apply type. Confirm with the commercial team which behaviour the price agreements assume.
:::

**Calculate discount N percentage from value** `value.info.calcDiscNPercentFromValue` — Normally the user types a percentage and the system computes the amount. With this on the relationship is reversed: the user types the amount and the system works out the percentage it represents. Turn it on for discounts that are negotiated as round sums ("take 500 off") rather than as rates.

**Discount Tax 1** / **Discount Tax 2** / **Discount Tax 3** / **Discount Tax 4** `value.info.discountN.considerTax1` through `...considerTax4` — Whether each of the four taxes is included in the base this discount is calculated on. The common case is a discount taken on the net amount before VAT, which means leaving the VAT tax unchecked. Check it only where the commercial agreement genuinely discounts the tax-inclusive figure.

## Settings on this tab

Every field on this tab with its exact on-screen label in both languages, so you can find a setting by the name you see. The last column points to the section that explains it.

| Field id | English label | Arabic label | Meaning |
|---|---|---|---|
| `value.discountLocation` | Invoice discount apply on | وقت حساب التخفيض في الفاتورة | [General discount settings](#General-discount-settings) |
| `value.info.headerDiscountApplyType` | Header Discount Apply Type | وعاء خصم 8 | [General discount settings](#General-discount-settings) |
| `value.info.allowUsingDiscountCouponManyTimesIfPercentageType` | Allow Using Discount Coupon Many Times If Type Is Percentage | السماح باستعمال قسيمة الخصومات اكثر من مرة اذا كان النوع نسبة | [General discount settings](#General-discount-settings) |
| `value.info.allowReverseDiscountCouponEvenIfUsedInInvoices` | Allow Reverse Discount Coupon Even If Used In Invoices | السماح بإلغاء مكافأة حتي وإن تم استخدامها في فواتير | [General discount settings](#General-discount-settings) |
| `value.info.discount1ApplyType` | Discount 1 Apply Type | وعاء خصم 1 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.calcDisc1PercentFromValue` | Calculate discount 1 percentage from value | احتساب نسبة خصم 1 من القيمة | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount1.considerTax1` | Discount Tax 1 | خصم ضريبة 1 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount1.considerTax2` | Discount Tax 2 | خصم ضريبة 2 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount1.considerTax3` | Discount Tax 3 | خصم ضريبة 3 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount1.considerTax4` | Discount Tax 4 | خصم ضريبة 4 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount2ApplyType` | Discount 2 Apply Type | وعاء خصم 2 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.calcDisc2PercentFromValue` | Calculate discount 2 percentage from value | احتساب نسبة خصم 2 من القيمة | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount2.considerTax1` | Discount Tax 1 | خصم ضريبة 1 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount2.considerTax2` | Discount Tax 2 | خصم ضريبة 2 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount2.considerTax3` | Discount Tax 3 | خصم ضريبة 3 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount2.considerTax4` | Discount Tax 4 | خصم ضريبة 4 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount3ApplyType` | Discount 3 Apply Type | وعاء خصم 3 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.calcDisc3PercentFromValue` | Calculate discount 3 percentage from value | احتساب نسبة خصم 3 من القيمة | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount3.considerTax1` | Discount Tax 1 | خصم ضريبة 1 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount3.considerTax2` | Discount Tax 2 | خصم ضريبة 2 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount3.considerTax3` | Discount Tax 3 | خصم ضريبة 3 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount3.considerTax4` | Discount Tax 4 | خصم ضريبة 4 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount4ApplyType` | Discount 4 Apply Type | وعاء خصم 4 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.calcDisc4PercentFromValue` | Calculate discount 4 percentage from value | احتساب نسبة خصم 4 من القيمة | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount4.considerTax1` | Discount Tax 1 | خصم ضريبة 1 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount4.considerTax2` | Discount Tax 2 | خصم ضريبة 2 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount4.considerTax3` | Discount Tax 3 | خصم ضريبة 3 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount4.considerTax4` | Discount Tax 4 | خصم ضريبة 4 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount5ApplyType` | Discount 5 Apply Type | وعاء خصم 5 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.calcDisc5PercentFromValue` | Calculate discount 5 percentage from value | احتساب نسبة خصم 5 من القيمة | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount5.considerTax1` | Discount Tax 1 | خصم ضريبة 1 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount5.considerTax2` | Discount Tax 2 | خصم ضريبة 2 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount5.considerTax3` | Discount Tax 3 | خصم ضريبة 3 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount5.considerTax4` | Discount Tax 4 | خصم ضريبة 4 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount6ApplyType` | Discount 6 Apply Type | وعاء خصم 6 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.calcDisc6PercentFromValue` | Calculate discount 6 percentage from value | احتساب نسبة خصم 6 من القيمة | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount6.considerTax1` | Discount Tax 1 | خصم ضريبة 1 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount6.considerTax2` | Discount Tax 2 | خصم ضريبة 2 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount6.considerTax3` | Discount Tax 3 | خصم ضريبة 3 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount6.considerTax4` | Discount Tax 4 | خصم ضريبة 4 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount7ApplyType` | Discount 7 Apply Type | وعاء خصم 7 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.calcDisc7PercentFromValue` | Calculate discount 7 percentage from value | احتساب نسبة خصم 7 من القيمة | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount7.considerTax1` | Discount Tax 1 | خصم ضريبة 1 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount7.considerTax2` | Discount Tax 2 | خصم ضريبة 2 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount7.considerTax3` | Discount Tax 3 | خصم ضريبة 3 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount7.considerTax4` | Discount Tax 4 | خصم ضريبة 4 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount8ApplyType` | Discount 8 Apply Type | وعاء خصم 8 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.calcDisc8PercentFromValue` | Calculate discount 8 percentage from value | احتساب نسبة خصم 8 من القيمة | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount8.considerTax1` | Discount Tax 1 | خصم ضريبة 1 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount8.considerTax2` | Discount Tax 2 | خصم ضريبة 2 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount8.considerTax3` | Discount Tax 3 | خصم ضريبة 3 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
| `value.info.discount8.considerTax4` | Discount Tax 4 | خصم ضريبة 4 | [Discount 1 through Discount 8](#Discount-1-through-Discount-8) |
