---
entities: [SalesPriceList, SalesOffers, DiscountCoupon, PostSalesOffer, PostSalesOfferConfig, PostSalesOfferClaim, PriceVotingDoc, PricingRange, AutoSalesPricing, SalesPriceInPoints, FreeItemGroup, PeriodicMonthlySalesOffer, DiscountCouponType, DiscountCouponBook, SalesCouponsCodingMethod, CouponsSalesOrder, CouponsSalesOrderReturn, PriceVotingFile, AutoSalesPricingSetting, Season, UpdateSeasonsDoc]
---
# Pricing, Offers & Coupons

The price a customer pays isn't a single number, but the result of several layers: a price list, a quantity discount, a promotional offer, and maybe a coupon. This guide gathers the supply-chain pricing tools and explains how they stack.

::: info Integration with the Invoicing Module
The shared document-level discount, offer, and loyalty-point mechanics are documented in the [Invoicing module](/modules/invoicing/) (the discounts, offers, and reward-points guides). This page focuses on the supply-chain-specific pricing entities and refers to those guides where they intersect, to avoid duplication.
:::

## Sales Price Lists (SalesPriceList)

The **Sales Price List** is the backbone of pricing: it sets each item's price for a specific customer segment, period, and currency. You can have multiple lists (retail, wholesale, VIP customers, promotions), and each list has an effective date range and a priority that prevents conflicts when more than one list overlaps. When creating an invoice, you choose the appropriate list and the system fills prices automatically.

![Sales price list screen in NaMa ERP](../../ar/modules/supplychain/images/pricing/sales-price-list-en.png)

### Quantity-Based Pricing (PricingRange)

The **Pricing Range** enables tiered prices by quantity: 1-10 pieces at one price, 11-50 at a lower price, and above that even lower - automatically rewarding larger purchases.

### Automatic Pricing (AutoSalesPricing)

Instead of setting the sales price manually, **Automatic Pricing** computes it from cost plus a profit margin (default, minimum, and maximum). When cost changes, the price is recalculated while respecting the margin policy. Its global behavior is configured via the **Auto Sales Pricing Setting** (AutoSalesPricingSetting).

### Pricing in Points (SalesPriceInPoints)

For loyalty programs, the **Sales Price in Points** lets you price items in points redeemable instead of (or alongside) money.

## Offers and Free Items (SalesOffers)

**Sales Offers** are the promotion engine: a percentage or amount discount, free items, or incentives based on invoice value or a minimum cart. You can target them with filters (invoice classification, customer, sector) and link them to a season, which stamps the season's own **From Date** and **To Date** onto the offer — see *Trading Seasons* below.

![Sales offers screen in NaMa ERP](../../ar/modules/supplychain/images/pricing/sales-offers-en.png)

And the **Free Item Group** (FreeItemGroup) lets you offer several free items as a single bundle within the offer, with repeat rules and policies configured.

## Trading Seasons (Season)

Both of the screens above want a **From Date** and a **To Date**, and in a business that runs on seasons you end up typing the same pair of dates into dozens of records: every price list for the summer collection, every offer that runs alongside it, every points price. Get one of them wrong by a day and that one record quietly behaves differently from all the others.

The **Season** (*Sales → Prices And Offers → Season*) is there to stop that. It is a small master file — a code, a name, a **From Date** and a **To Date** — that gives a trading period a name you can point at. "Summer 2026" gets defined once.

What it then does is deliberately narrow, and worth stating precisely: **choosing a season fills the record's own dates from it.** On a **Sales Price List**, a **Sales Offer** or a **Sales Price in Points**, picking the season copies its From and To dates into that record's From Date and To Date the moment you choose it — and again every time the record is saved. Push the season's end date out by a week and every record pointing at it follows on its next save.

::: warning The season wins over dates you type
Because the copy happens on every save and not only when you pick the season, you cannot keep a season on a record and override its dates by hand — your dates are simply replaced. If one price list genuinely needs a different window from the rest of the season, leave its **Season** empty and type the dates instead.
:::

Seasons also turn up as an ordinary grouping field on the **Sales Forecast** and the **Purchase Forecast**, where they label figures by trading period without driving any behaviour.

### Putting Items in a Season: the Update Seasons Document (UpdateSeasonsDoc)

A season on a price list dates the list. It says nothing about *which products belong to the season* — and for a clothing retailer, "what is in the summer collection" is a real question that outlives any one price list.

The **Update Seasons Document** (*Sales → Prices And Offers → Update Seasons Document*) records the answer. It is a document rather than a master file: it has a book and a code, a **Term**, an **Issue Date**, a **Value Date** and a **Fiscal Period**, so a season assignment is numbered, dated and attributable in a way an edited master file is not.

Its body is a **Seasons** grid with one line per assignment — the **Item**, the **Season**, and a **From Date** and **To Date** for the assignment itself. Above the grid sit four header fields carrying those same four names, and they behave in a way that catches people out.

::: warning The header overwrites the grid, it does not merely default it
An **Item**, **Season**, **From Date** or **To Date** filled in on the header is written onto *every* line of the grid on each save, replacing whatever the line held. That makes the header the fast way to do the common job — put four hundred items into one season by naming the season once and listing the items — but it also means a document that mixes seasons has to leave the header **Season** empty, or every line will come out carrying the header's season.
:::

Processing the document produces no stock movement and no accounting entry; what it produces is the record of the assignments. The place you read them back is the item itself: the item card's prices page carries a **Related Seasons** list showing every season that item has been put into, with the dates and the document each assignment came from. Correcting an assignment therefore means raising another document, and the item's list keeps the trail.

## Post-Sales Offers (PostSalesOffer)

Some incentives aren't granted at the time of sale but afterward (incentives, retroactive discounts, rebates). The **Post-Sales Offer** defines the program and its conditions via the **Post-Sales Offer Config** (PostSalesOfferConfig), and the customer claims their entitlement via the **Post-Sales Offer Claim** (PostSalesOfferClaim), which is reviewed, approved, and affects the customer's balance. There's also the **Periodic Monthly Offer** (PeriodicMonthlySalesOffer) that generates its incentives monthly via a periodic calculation.

## Coupons (DiscountCoupon)

The **Discount Coupon** is a targeted promotion tool: a discount value, item scope, usage limits, validity, and customer eligibility. Coupons are organized into:
- **Coupon type**: a category that governs its rules (store, online, seasonal).
- **Coupon book**: a collection of coupons for a promotional campaign and its distribution.
- **Coupon coding method**: the code format, its generation algorithm, and uniqueness validation.

At the point of sale, the coupon is applied via the **Coupons Sales Order**, and its reversal on a return is handled via the **Coupons Sales Order Return**.

### Coupon book settings

The **Discount Coupon Book** generates the coupons of a campaign and gives each one its settings. A coupon only reduces an invoice when **Use As Discount In Invoices** is ticked. Four settings decide how a percentage coupon is worked out:

- **Percentage Tiers Based on Invoice Value** — a grid of *Invoice Value Greater Than Or Equal* / *Invoice Value Less Than Or Equal* / *Discount* rows, so a bigger invoice earns a bigger percentage: for example 5% from 0 to 999, 10% from 1,000 up. The first row the invoice value falls into wins; an invoice outside every row gets the coupon's own percentage. With tiers filled, the header **Percentage** may stay empty. The **Maximum Coupon Value (Used With Percentage Type)** still caps the discount.
- **Invoice Value Used To Apply Coupon** — which invoice amount is compared with the tiers: *Total*, *Net Value* (the default when empty), *After Tax Value* or *After Discount 1*.
- **Discount Apply Rules For Lines** and **Invoice discount apply on** — fill both to give the coupon only to some lines. The coupon's percentage is then written into the chosen discount column (Discount 1 to 8) of the lines that the [offer apply rule](./offer-apply-rules.md) picks, instead of a discount on the whole invoice. Either one needs the other.

Tiers, apply rules and the discount column only work for a coupon whose **Discount Coupon Calculation Type** is *Percentage*, and a percentage coupon must also be **Used Once**. The book refuses to save otherwise:

| Message | Why | What to do |
|---|---|---|
| *Discount coupon type must be Percentage when percentage tiers are used* | The tiers grid has rows but the calculation type is Value. | Switch the calculation type to Percentage, or empty the grid. |
| *Invoice value range {0} - {1} is crossed with another tier* | Two tier rows overlap. This message has no Arabic translation, so it shows in English on Arabic screens. | Make the ranges follow one another without overlapping. |
| *Discount coupon type must be Percentage when discount apply rules or discount location is set* — «نوع القسيمة لابد أن يكون نسبة عند تحديد قواعد تطبيق الخصم أو مكان الخصم» | Apply rules or a discount column are filled on a Value coupon. | Switch to Percentage, or clear both fields. |
| *Option {0} must be true with {1} - {2}* — «الحقل {0} يجب ان يكون مفعلاً في حالة {1} - {2}» | A percentage coupon is not marked Used Once. | Tick **Used Once**. |

## Price Voting (PriceVotingDoc)

In organizations that require approval of price changes, the **Price Voting Document** provides a workflow: new prices are proposed and presented to approvers for a vote before taking effect, with their record kept in the **Price Voting File** (PriceVotingFile) as an audit trail of pricing decisions.

## Actions on these screens

Pricing screens are built around two moves: fill the lines from somewhere, then push a header value or a calculation down onto them.

**On the Sales Price List:**

- **Collect Items** — fills the lines from the item-collection criteria on the header instead of item by item.
- **Update Details** — stamps header values onto every line, asking one Yes/No at a time which to push: from date, to date, analysis set, legal entity, branch, department, sector, customer, invoice classification, and price classifiers 1 to 5. The button is only on the screen when **Do not Update Lines From Price List Header** is switched on in supply chain configuration; with that setting off the header values come down on their own and there is nothing to press.
- **Update Prices** — recalculates through the price-updater rules on the header: a source field, up to four destination fields, and up to five updaters, applied to all lines or only the selected ones. It refuses when the list has no lines, or when no updater is filled in.
- **calculate Price from Average Cost** — fills the destination price field from each item's average cost rather than from another price field.
- **Add additional source lines** — appends the lines of the price list named as the **additional source**, optionally carrying invoice discounts across and skipping items the list already holds.
- **Spread Selected Line Data** — expands the line you are standing on across the item's units, revisions, sizes and colours, following the spread switches on the header.

The **Purchase Price List** and the **Vendor Discount** carry the same **Update Details**. Its question there is still labelled *Update Customer*, but answering Yes writes the header's supplier onto the lines.

**On the Sales Offers screen** each grid has its own update button, because each grid has its own validity window:

- **Update Details** — pushes the header's dates, dimensions, customer, invoice classification and price classifiers onto the item-discount lines, again as a list of Yes/No questions.
- **Update Details From Time To Time** — a narrower one: it copies only the header's **from time** and **to time** onto every discount line, which is what an offer tied to certain hours of the day needs.
- **update Free Items**, **Update Invoice Discounts** and **Update Invoice Offers** — the same stamping, aimed at the free-items grid, the invoice-discount grid and the invoice-offers grid respectively.
- **Update Coupons** and **Update Lines** — for the coupons grid and the offers-on-item-count grid; these ask about three things only: from date, to date and priority.
- **Update Discounts Values - Percentages** — the price-updater engine again, this time writing discount values and percentages onto the item-discount lines.

**On the Periodic Monthly Sales Offer Calculation:** **Calculate Data** works out each candidate customer's figures, and **Generate Offers** then creates the offers themselves. Both need the document saved.

**On the Price Voting File:** **calculate Suggested Prices** collects what the voters suggested (the file must be saved first), and **Update Agreed Price** fills the agreed price on every line from the **agreed price source** chosen on the header — the highest suggested price, the lowest, the average, and so on.

**On the Item Voting File:** **Collect Doc Lines** pulls in the voting documents and their lines. **update Items** — on both the file and the individual Item Voting Doc — writes the voting result back onto the items themselves, and needs the record saved.

**On the Discounts Re-Calculation Document and the Discount Update:** **Collect** gathers the invoices to work on — by supplier and date range on the first, by collected invoice type and sector/branch ranges on the second — and **Apply** then writes the recalculated discounts back to those invoices. **Apply** needs the document saved.

## How the Layers Stack

When pricing an invoice line, the system first decides on a **base price**, then adjusts it: a
**quantity range**, then eligible **offers**, then a **coupon** if present, while respecting the
**minimum price** defined on the item. Understanding this order explains the final price the customer
sees.

The base price is where most "why did it price at that?" tickets actually end, and it is looked for
in three places, in this order:

1. **A matching price list line.** Whenever one matches the item, the customer and the document, it
   wins — nothing on the item file is consulted at all. Which *column* of that line becomes the unit
   price (default, minimum, maximum, or one of the custom tiers) is its own chain, described under
   [Price Lists](/modules/supplychain/configuration/pricing-and-price-lists).
2. **The last price sold**, if no price list matched and *Use Last Sales Price* is on: the price this
   customer last paid for this item. The purchase side has the mirror setting, *Use Last Purchase
   Price*.
3. **The item file's own prices**, if neither produced anything. The system looks at the item's unit
   lines for the unit on the document line and takes its default price; failing that, and where the
   item carries them, the price on the matching **revision**, then the price on the matching
   **size/colour** line; and failing all of those, the first unit line that has any price at all,
   converted to the document's unit by the unit factor.

So the item file is a fallback, not a competitor: a price list line beats it every time, and an item
price that "is being ignored" almost always means a price list line matched that nobody expected.

## Messages you may see

Pricing spans several screens, so the refusals are grouped by the screen that raises them.

### Sales price lists and automatic pricing

| Message | Why | What to do |
|---|---|---|
| *Found overlapped price list {0} with same priority* — «قائمة الأسعار {0} لها نفس الترتيب» | Another saved sales price list already has the priority you typed, and priority is what decides which list wins. The save stops at this one message and the rest of the list is not checked. | Give the list a free priority number, or have the supply chain option *Allow Repeating Offer Priority* enabled if two lists at the same rank is deliberate. |
| *The line at {0} is repeated with the line {1}* — «السطر رقم {0} مكرر مع السطر رقم {1}» | Two detail lines price the same thing — same item or item class, same unit, same colour, size, revision and the rest of the line's key. | Delete one of the two, or make them differ by unit, quantity band or dimension. |
| *Line {0} must have either an item or item class, but not both* — «السطر {0} يجب أن يحتوي على صنف أو تصنيف صنف وليس الاثنين معا» | A line names an item *and* an item classification. A line prices one or the other, never both. | Clear whichever of the two the line should not price by. |
| *Line {0} must have either an item or item class* — «السطر {0} يجب أن يحتوي على صنف أو تصنيف صنف» | A line names neither an item nor an item classification, so there is nothing for the price to attach to. | Fill one of the two. |
| *Line {0} cannot be priced by item class before setting the supply chain configuration Price By Item Class* — «السطر {0} لا يمكن التسعير على مستوى تصنيف الصنف قبل ضبط إعداد سلسلة الإمداد التسعير على مستوى تصنيف الصنف» | A line prices by item classification while the supply chain setting *Price By Item Class* is empty — the system has not been told which classification field pricing may use. | Set *Price By Item Class* in supply chain configuration, or price that line by item. |
| *Line {0} item class must be of type {1} per supply chain configuration* — «السطر {0} تصنيف الصنف يجب أن يكون من نوع {1} حسب إعدادات سلسلة الإمداد» | The line's classification is of a different kind from the one *Price By Item Class* names. Only that one kind may be priced. | Change the line to a classification of the type the message names. |
| *Revision {0} is not found in item {1} at line number {2}* — «الصنف {1} لا يحتوي على الإصدار {0} في السطر {2}» | The line prices a revision that the item's own revisions grid does not list. | Pick a revision the item has, or add it to the item card first. |
| *Color {0} is not found in item {1} at line number {2}* — «الصنف {1} لا يحتوي على اللون {0} في السطر {2}» | The line prices a colour that the item's sizes-and-colours grid does not list. | Pick a colour the item has, or add it to the item card first. |
| *Size {0} is not found in item {1} at line number {2}* — «الصنف {1} لا يحتوي على المقاس {0} في السطر {2}» | The line prices a size that the item's sizes-and-colours grid does not list. | Pick a size the item has, or add it to the item card first. |
| *Item {0} must have auto sales pricing default profit percent* — «يجب أن يحتوي الصنف {0} على قيمة نسبة ربح أفتراضية للتسعير الآلي» | Automatic pricing is running off a purchase document and the item carries no default profit percentage, so no selling price can be worked out. | Fill the item's automatic-pricing default profit percentage, on the item or on the classification it inherits from. |
| *Item {0} must have auto sales pricing minimum profit percent* — «يجب أن يحتوي الصنف {0} على قيمة أقل نسبة ربح  للتسعير الآلي» | The same run found no minimum profit percentage for the item. | Fill the item's minimum profit percentage. |
| *Item {0} must have auto sales pricing maximum profit percent* — «يجب أن يحتوي الصنف {0} على قيمة أعلى نسبة ربح  للتسعير الآلي» | The same run found no maximum profit percentage for the item. | Fill the item's maximum profit percentage. |
| *The option (Use In Active In Sales Price List Lines) in supply chain configurations must be activated when using price updating policy (Create One Price List For Current Doc And De Activate Item Pricing In All Other Price Lists)* — «عند استخدام التسعير الآلي واختيار سياسة التسعير (انشاء قائمة اسعار مبيعات و الغاء قوائم الأسعار الأخري ) يجب تفعيل اوبشن (استعمال غير نَشِطْ على مستوى السطور بقوائم أسعار المبيعات)» | The automatic-pricing setting builds one price list per document and switches the item off in every other list, which needs the line-level inactive flag that the supply chain option turns on. | Enable *Use In Active In Sales Price List Lines* in supply chain configuration, or choose another price updating policy on the automatic-pricing setting. |
| *You must at least choose one source* — «يجب اختيار مصدر واحد على الأقل» | An Automatic Sales Pricing record was saved with all three cost sources empty, so there is no figure to build a price on. | Fill at least one of the three sources. |
| *You must enter sql for calculating pricing source* — «يجب ادخال جملة SQL حساب تسعير المصدر» | One of the sources is set to come from a query, and the query itself is empty. | Write the query, or pick a source that is not query-based. |
| *First side can not be equal to second side* — «لا يمكن ان يكون الطرف الأول مساوي ل الطرف الثاني» | A condition line on Automatic Sales Pricing compares a value with itself, which is always true and decides nothing. | Change one of the two sides. |

### Offers, free items and periodic offers

| Message | Why | What to do |
|---|---|---|
| *Activate the option {0} in supply chain configuration* — «قم بتفعيل الاوبشن {0} من اعدادات ال supply chain» | The offer has lines in the invoice-items-count grid while the supply chain option the message names is off, so those lines would never fire. | Enable the named option in supply chain configuration, or empty that grid. |
| *You must choose offer apply rules, because you mark option discount basis from matched lines* — «يجب عليك إختيار قواعد تطبيق العروض , لأنك قد قمت بتفعيل الأوبشن اساس الخصم من إجمالى السطور المنطبقة فقط» | An invoice-discount line takes its discount basis from the matched lines only, but names no apply rules — so nothing says which lines count as matched. | Fill the line's offer apply rules, or untick the matched-lines basis. |
| *Discount Minimum Value {0} can not be greater than Discount Maximum Value {1}* — «قيمة الخصم الأدني {0} لا يمكن ان تكون اكبر من قيمة الخصم الأقصي {1}» | An invoice-discount line's floor is above its ceiling. An empty minimum is read as zero, so this only appears once a real figure was typed. | Correct one of the two figures. |
| *Activate (Ignore Other Offers If There is Item Count Offers and Ignore Other Offers is active) in supply chain configuration* — «قم بتفعيل اوبشن ( تجاهل العروض الأخرى عند وجود عروض على عدد أصناف الفاتورة بها تجاهل العروض الأخرى ) من اعدادات ال Supply Chain» | An items-count offer line is marked to ignore other offers, and the supply chain option that lets an items-count offer do so is off. | Enable that option in supply chain configuration, or untick *Ignore Other Offers* on the line. |
| *You must enter discount percentage or discount value* — «يجب عليك إدخال نسبة او قيمة التخفيض» | An items-count line gives a discount on the invoice header instead of a free item, and both the percentage and the value are empty. | Fill either the discount percentage or the discount value. |
| *Invoice Value -from- must be equal to invoice value -to- {0}* — «قيمه الفاتوره يجب ان تساوي قيمة الفاتوره -الي - {0}» | A coupon line on the offer counts sold items rather than invoice value, and counting only works at a single invoice value, not across a band. | Make the *from* and *to* invoice values equal, or set the sales items count type to none. |
| *Max quantity {0} can not be less than qty {1}* — «لا يمكن ان تكون قيمة أقصى كمية {0} أقل من الكمية {1}» | A line's maximum quantity is below the quantity that triggers it, so the band is empty. It is checked on the item-discount lines and on the free-item lines alike. | Raise the maximum, lower the quantity, or leave the maximum empty for no ceiling. |
| *{0} - {1} different from {0} in item {2} - {3}* | A line names an item classification that is not the classification the item itself carries, so the line would never match that item. This exact wording has no Arabic text, so it appears in English on Arabic screens, and its placeholders may come out unfilled. | Correct the classification on the line, or on the item card. |
| *Activate free items on invoice from supply chain configuration* — «قم بتفعيل الاوبشن - تفعيل الاصناف المجانية علي قيمة الفاتورة - من اعدادات ال supply chain» | The offer has free-items-on-invoice-value lines while the supply chain option for them is off. The same message appears when a sales invoice tries to apply such an offer. | Enable free items on invoice value in supply chain configuration, or empty that grid. |
| *Only one of {0} or {1} can be set in line {2}* — «{2} يمكن ملء حقل واحد فقط من {0} أو {1} في السطر» | A rule line on the Periodic Monthly Sales Offer carries both a discount percentage and a discount value. The placeholders come out partly unfilled, so read the message as "this rule line has both". | Leave exactly one of the two filled on that rule. |
| *Field {0} and {1} can not be both empty in line {2}* — «لا يمكنك ترك الحقلين {0}، {1} فارغين في السطر {2}» | The mirror of the above: a rule line has neither a discount percentage nor a discount value. | Fill one of the two. |
| *Period end can not be greater than period start* — «نهاية الفترة لا يمكن أن تكون اكبر من بداية الفترة» | Both figures are counted *backwards* from the record's creation date, so a period end further back than the period start gives a window that runs in reverse. What is compared is the resulting dates, not the two numbers. | Swap the two, remembering that the larger number is the older date. |

### Post-sales offers and claims

| Message | Why | What to do |
|---|---|---|
| *Item {0} in line {1} is repeated with line {2}* — «الصنف {0} في السطر رقم {1} مكرر مع السطر رقم {2}» | The Post-Sales Offer lists the same item twice, so two compensation rates would apply to it. | Keep one line per item. |
| *Items can not be empty* — «لا يمكن ترك سطور الأصناف فارغة» | A Post-Sales Offer Claim was saved with no item lines, so there is nothing to claim. | Add the items being claimed. |
| *The offer {0} is not applicable for item {1}* — «لا يمكن تطبيق العرض {0} على الصنف {1}» | A claim line names an item that the offer itself does not list. | Claim only the offer's own items, or add the item to the offer. |
| *The item {0} is duplicated* — «الصنف {0} متكرر» | The same item appears on two claim lines. | Merge the two lines into one. |
| *To claim quantity must be positive* — «يجب أن تكون الكمية المطلوب تعويضها رقم موجب» | A claim line's quantity is negative. | Enter a positive quantity; reverse a claim with a separate document. |
| *The post sales offer: {0} is not applicable for this customer: {1}* — «لا يمكن تطبيق عرض ما بعد البيع {0} للعميل {1}» | The customer on the claim is not among the offer's candidate customers, and neither is any of the customer's four classifications. | Claim for a customer the offer covers, or add the customer — or their classification — to the offer's candidate list. |
| *The offer: {0} was not applied to any invoice for customer: {1}* — «لم يتم تطبيق العرض: {0} على أي فاتورة للعميل: {1}» | The claim found no invoice for this customer that the offer was applied to, so there are no sales to compensate. | Check the customer and the offer's period; the offer has to have been applied on the invoices before it can be claimed. |
| *Item {0} : total sold quantity: {1}, total claimed quantity: {2} and available quantity to claim: {3}, so you can not claim this quantity {4} which is greater than available quantity* — «الصنف {0} : إجمالي الكلية المباعة {1} و إجمالي الكمية التي تم التعويض عنها سابقاً {2} و الكمية المتاحة للتعويض {3} و بالتالي لا يمكن التعويض عن الكمية {4} لأنها أكبر من الكمية المتاحة للتعويض» | The quantity claimed for the item exceeds what was sold minus what was already claimed. The message hands you all four figures. | Lower the claimed quantity to the available figure the message names. |

### Coupons and reward points

| Message | Why | What to do |
|---|---|---|
| *Option {0} must be true with {1} - {2}* — «الحقل {0} يجب ان يكون مفعلاً في حالة {1} - {2}» | A percentage coupon — on the coupon itself or on a coupon book line — is not marked *Used Once*. A percentage coupon reusable without limit has no ceiling on what it gives away. | Tick *Used Once*, or have the global option that lets a percentage coupon be used many times enabled. |
| *Total value {0} from documents is greater than coupon value {1}* — «مجموع المبالغ {0} من المستندات اكبر من قيمة الكوبون {1}» | The documents already recorded against a value coupon consume more than the coupon is worth. | Raise the coupon's value, or remove the document lines that overshoot it. |
| *You could not delete this coupon {0}, because it was redeemed* — «لا يمكنك حذف قسيمة الخصومات {0}, لقد تم عمل صرف مكأفاة به» | A coupon already redeemed against an outside reward points provider cannot be deleted; the redemption exists outside Nama. | Leave the coupon in place. Coupons redeemed through Nama's own reward points are not stopped by this check. |
| *You can not use coupon twice to redeem* — «لا يمكنك إستعمال الكوبون مرة اخري في برنامج المكأفات» | The coupon is already marked redeemed and a second redemption was attempted, whether from the screen or through the web service. | Issue a new coupon; a redeemed one is spent. |
| *The customer {0} prevented from rewards point redeem* — «العميل {0} ممنوع من صرف نقاط مكافأة» | A reward points restriction bars this customer from redeeming on the date of the attempt. | Check the reward points restrictions for the customer, or redeem on a date the restriction does not cover. |
| *The customer {0} prevented from rewards point granting* — «العميل {0} ممنوع من إحتساب نقاط مكافأة» | The same restriction on the granting side: the coupon's target is barred from earning points on the document's date. The message is raised without its argument, so `{0}` stays unfilled on screen. | Look at the reward points restrictions for the customer named on the coupon. |
| *Discount coupon book ( or group ) must be specified in document term or reward points config* — «يجب تحديد دفتر او مجموعة تكويد قسيمة الخصومات فى توجيه المستند او إعدادات نقاط المكافأة» | A redemption was requested with no coupon, and neither the document's term nor the reward points configuration says which coupon book or group the coupon should come from. | Fill the coupon book or group on the document's term, or on the reward points configuration. |
| *Redeem amount can not be empty or zero* — «قيمة المكأفاة لا يمكن ان تكون فارغه» | A redemption was requested with no amount. | Enter the amount to redeem. |
| *Field {0} must be of type {1}* — «الحقل {0} يجب ان يكون من النوع {1}» | A coupon, or a coupon book line, is tied to a reward points configuration while its type is percentage. Reward points work with value coupons only. | Set the coupon type to value, or clear the reward points configuration. |
| *Length is less than max number length* — «الطول أقل من طول الرقم الأخير» | The suffix length given for automatic coupon coding is shorter than the highest number it has to print, so the last codes would not fit. | Raise the suffix length, or lower the maximum number. |

### Coupon sales orders

| Message | Why | What to do |
|---|---|---|
| *Can not make sales coupons for item at line {0}* — «لا يمكن عمل قسائم البيع للصنف الموجود في السطر {0}» | The item on that line is not marked as having sales coupons on its item card. | Tick sales coupons on the item, or remove the line. |
| *Quantity at line {0} must be integer* — «الكمية في السطر {0} يجب أن تكون رقم صحيح» | Coupons are printed one per unit, so a fractional quantity has no meaning. | Round the quantity to a whole number. |
| *Could not find a coding method line in {0} for line {1} item {2}, uom {3}* — «لا يمكن إيجاد سطر طريقة تكويد قسائم في {0} للسطر رقم {1} للصنف {2}, للوحدة {3}» | The coding method named on the document has no line covering that item and unit, so the system does not know the prefix or number range for its coupons. | Add a line for that item and unit to the Sales Coupons Coding Method, or choose a coding method that covers it. |
| *Can not delete sales coupon {0} generated by this document because it was consumed in invoice {1}* — «لا يمكن مسح قسيمة البيع {0} المنشأة بواسطة هذا المستند. لأنها مستخدمة في الفاتورة {1}» | Reducing the quantity would drop a coupon that a sales invoice has already used. | Keep a quantity that covers the used coupons, or reverse the invoice that consumed the coupon first. |
| *The max suffix of coupons is {0}, and the coupon {1} will exceed that max* — «أقصى رقم لقسائم البيع هو {0}, و القسيمة {1} سوف تتعدي هذا الرقم» | The numbers left in the coding method line's range are fewer than the coupons this document needs. | Raise the maximum number on the coding method line, or add a line with a new prefix. |

## Next Steps

- [The Sales Journey](./sales-journey.md) - where these prices are applied to orders and invoices
- [Understanding Inventory Items](./understanding-items.md) - minimum price and automatic pricing on the item
- [Invoicing module](/modules/invoicing/) - document-level discount, offer, and loyalty mechanics
