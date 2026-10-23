---
description: "How the discount limits on the Employee record cap line and document discounts in sales documents and on the POS, how they interact with Sales Offer ranges and permissions, the exceptions, and POS supervisor approval."
entities: [Employee]
---
# Salesman Discount Limits

A shop usually wants a sliding scale of discount authority: a salesperson may knock up to 10% off, the branch manager up to 15%, and anything beyond that needs head office. Nama records that scale on each person's **Employee** record. The same limits are checked in the ERP sales documents and in the point-of-sale app, so you set them once.

Three separate things decide how big a discount can be on a line, and most "why can't I change the discount?" questions are caused by mixing them up:

1. **Is this person allowed to give a discount at all?** This is a permission. In the ERP it is the user's security; on the POS it is the **POS Security Profile**.
2. **What range does the offer allow?** A **Sales Offer** line that gives the discount has its own minimum, default and maximum. A figure outside that range is replaced without any message.
3. **How deep can this employee go?** These are the limits on the Employee record. Saving is refused when a discount goes past them.

This page covers the second and third, and how the POS's supervisor approval fits in with them.

## Where the limits live

Open the employee (*Employee* screen, first page) and find the **Allowed Sales Discounts Percentages** group. It holds a pair of fields for each of the eight line discounts and one pair for the discount on the whole document:

| Field | What it limits |
|---|---|
| **Max Discount 1 Percentage** … **Max Discount 8 Percentage** | The percentage of that discount level on any line. |
| **Max Discount 1 Value** … **Max Discount 8 Value** | The amount of that discount level on any line. |
| **Max Header Discount Percentage** | The percentage of the discount on the whole document. |
| **Max Header Discount Value** | The amount of the discount on the whole document. This one is checked only on the POS. |

A few rules apply to all of them:

- **Empty or zero means no limit.** An employee with nothing filled in can give any discount. To stop someone from discounting at all, take away the permission. Do not set the limit to 0.
- **Each level is checked against its own pair.** The limit on discount 1 says nothing about discount 2. If your price structure uses two levels, fill both.
- **The percentage and the amount are separate checks.** When both are filled, the discount has to stay within both.
- **The POS uses the same fields.** They are sent to the POS devices with the rest of the employee data, so after you change a limit, the next data sync brings it to the tills.

![The Allowed Sales Discounts Percentages group on the Employee screen](../../ar/modules/invoicing/images/employee-discount-limits-en.png)

## Whose limits are checked

The limits belong to an employee, but a document passes through several hands. The two sides choose the employee differently.

**In the ERP** (sales quotation, sales order, sales invoice, sales replacement), the global setting **use Current User As Sales Man** (*System Settings → Customers and Sales*, on by default) decides:

- When it is **on**, the employee linked to the logged-in user is checked, whoever the document names as salesman.
- When it is **off**, the employee in the document's **Salesman** field is checked.

If that employee cannot be found (the user has no employee record, or the Salesman field is empty), nothing is checked.

**On the POS**, the first of these that exists is checked:

1. The supervisor who approved that discount in the approval window (see *Supervisor approval on the POS* below).
2. The **Salesman** on the invoice.
3. The employee linked to the cashier who is logged in.

So on the POS, a salesperson picked on the invoice brings their own limits with them, even when a manager is the one at the till.

## When the check runs

The limits are checked **when the document is saved**, not while you type. Typing 12% for a 10% salesperson is accepted on the line, and the save then refuses it with a message naming the item, the discount level and the limit.

- **ERP:** sales quotations, sales orders, sales invoices and sales replacements are checked when their **Invoice Type** is *Normal*. *Special* and *In Points* documents are not checked. A sales return is checked only when its term has **Force Price List** on.
- **POS:** sales invoices and the new lines of a sales replacement are checked. Sales returns, and the returned lines of a replacement, are not.

The ERP checks the document discount only by its percentage. It also skips that check when the discount does not go beyond what the document's discount coupon gives.

## Why a discount jumps back by itself

This is the behaviour behind most complaints that "the offer applied 10% and the salesperson can't change it". It comes from the offer, not from the employee limit.

Each item-discount line on a **Sales Offer** (*Sales → Prices And Offers → Sales Offer*, the **Item Discounts** grid) carries three figures: **Discount | Min. Value**, **Discount | Default** and **Discount | Max. Value**. Whenever the system prices a line, it:

1. puts the **Default** on the line when no discount was typed. If the Default is empty, it uses the Min. Value;
2. keeps a discount the user typed **only if it lies between Min. Value and Max. Value**;
3. otherwise replaces it with the **Default**, without any message.

On the POS, the line is priced again every time it changes, including when a discount is typed, so an out-of-range discount is replaced the moment it is entered. In the ERP, pricing happens when the item, quantity or unit is chosen, or when prices are recalculated. A discount edited by hand after that stays on the line. If the term has **Force Price List** on, though, saving refuses any discount outside the offer's range with *Item {0} discount1 is invalid* (and the same for discount2 to discount8).

**An empty Max. Value counts as zero.** So an offer line filled in with only *Default = 10* sets a range of 0 to 0. Every figure the salesperson types is outside it, and the discount keeps returning to 10%. To leave room for the salesperson, give the offer line a real range:

| Discount \| Min. Value | Discount \| Default | Discount \| Max. Value |
|---|---|---|
| 0 | 10 | 15 |

Set the offer's Max. Value to the **highest discount anyone may give**, and let the employee limits make the cut for each person. Asking the offer to do that job does not work, because one offer line has one maximum for everybody.

When **no** offer covers the item, the discount the user types is kept as it is. The one exception is **Prevent Non Offered Discounts** in *Supply Chain Configurations*: with it on, any discount that no offer covers goes back to zero.

## Exceptions you can switch on

Two settings let a discount past the employee limit on purpose:

- **Deactivate Salesman Discounts Validations**, on an item-discount line of the Sales Offer. A discount that comes from that offer line is not checked against the employee at all. Use it for promotions deeper than any salesperson's own authority. On the POS it always applies. In the ERP it applies only when the document's term has **Force Price List** or **Consider Discount Offers For Employee Discount Percentage Validation** on, because otherwise the ERP does not look at the offers when it checks the limits.
- **Ignore Max Discount Validation If Discount Exists In From Doc**, on the term of the ERP document. A discount brought over from an approved source document, such as a quotation converted into an invoice, is accepted as long as it is not higher than it was on the source. Both are explained under [Sales Pricing](/modules/supplychain/document-terms/doc-term-pricing-taxes-discounts#Sales-Pricing) in the term settings.

## Supervisor approval on the POS

On the POS, the **POS Security Profile** (*Point of sale → Settings → POS Security Profile*) decides whether a cashier may discount at all: **Make Line Discount 1** to **Make Line Discount 8** for the line levels and **Can Make Document Discount** for the whole invoice. When the cashier lacks the permission, the till opens an approval window and a supervisor enters their own user name and password.

The approval also changes whose limits apply:

- **For a line discount**, the limits of the supervisor who approved that discount level on this invoice are used instead of the salesperson's. If several approvals were given for the same level, the most recent one counts.
- **For the invoice discount**, the supervisor's limits are used only when **Consider Max Discount From Discount Applier** is on in *POS Configuration*. When it is off, the invoice discount is checked against the salesman or the cashier as usual.

## Worked example: salesperson 10%, branch manager 15%

A showroom sells with one discount level. Most items fall under a standing offer that gives 5% by default.

1. On the salesperson's Employee record, set **Max Discount 1 Percentage** to *10*. On the branch manager's, set it to *15*.
2. On the Sales Offer line, set **Discount | Min. Value** *0*, **Discount | Default** *5* and **Discount | Max. Value** *15*.
3. A customer asks for 8%. The salesperson types 8. It lies inside the offer's 0–15 range, so it stays, and it is within their own 10%, so the invoice saves.
4. The customer pushes for 12%. The salesperson types 12. The offer keeps it, but the save is refused: *Item … discount 1 exceed salesman … max discount percentage 10* in the ERP, or *Discount 1 12 cannot exceed sales man maximum 10* on the POS.
5. On the POS, the branch manager approves the discount in the approval window (the salesperson's profile does not have *Make Line Discount 1*). The 12% is now checked against the manager's 15%, and the invoice saves. In the ERP, the manager saves the invoice under their own login. With *Use Current User as Salesman* on, the manager's limit is the one checked.
6. Nobody gets 18%, even with approval. On the POS, an 18 typed on the line goes straight back to the 5% default because the offer stops at 15. In the ERP, the manager's own 15% limit refuses the save, and with Force Price List on, the offer range refuses it as well.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Item {0} discount {1} exceed salesman {2} max discount percentage {3}* — «خصم {1} للصنف {0} لا يمكن أن يتعدى أقصى نسبة خصم {3} للموظف {2}» | ERP: discount level {1} on the item's line is a higher percentage than the employee's **Max Discount {1} Percentage**. | Lower the discount, or have a user whose employee has a higher limit save it. |
| *Item {0} discount {1} exceed salesman {2} max discount value {3}* — «خصم {1} للصنف {0} لا يمكن أن يتعدى أقصى قيمة خصم {3} للموظف {2}» | ERP: the same, for the discount amount and **Max Discount {1} Value**. | As above. |
| *Header discount cannot exceed {0} for the employee {1}* — «التخفيض علي الفاتورة لا يمكن أن يتخطي {0} للموظف {1}» | ERP: the document discount is a higher percentage than the employee's **Max Header Discount Percentage**. | Lower the document discount, or check *Use Current User as Salesman*: it decides whether your own employee or the document's salesman is checked. |
| *Item {0} discount1 is invalid* — «خصم 1 الصنف {0} غير صحيح» | ERP, with **Force Price List** on: discount 1 on the item's line is outside the Min. Value to Max. Value range of the offer that covers it. Discounts 2 to 8 have the same message with their own number. | Bring the discount inside the offer's range, or widen the range on the Sales Offer. |
| *Discount 1 {0} cannot exceed sales man maximum {1}* — «الخصم 1 - {0} - لا يمكن أن تتعدي أقصي قيمة مسموحة لمندوب المبيعات {1}» | POS: discount level 1 (or 2 to 8, same wording) is above the limit of the employee being checked: the approving supervisor, the salesman or the cashier. | Lower the discount, or have a supervisor with a higher limit approve it. |
| *Header discount percentage cannot exceed sales man maximum percentage* — «نسبة الخصم الرئيسي لا يمكن أن تتعدي أقصي نسبة مسموحة لمندوب المبيعات» | POS: the invoice discount percentage is above **Max Header Discount Percentage**. | Lower the invoice discount. To let the approving supervisor's limit count, turn on *Consider Max Discount From Discount Applier*. |
| *Header discount value cannot exceed sales man maximum value* — «قيمة الخصم الرئيسي لا يمكن ان تتعدي اقصي قيمة مسموحه لمندوب المبيعات» | POS: the invoice discount amount is above **Max Header Discount Value**. | As above. |

## Related pages

- [Pricing and Offers Management Guide](./pricing-and-offers-guide.md) - the Sales Offer screen and its discount grids
- [Pricing, Taxes & Discounts Configuration](/modules/supplychain/document-terms/doc-term-pricing-taxes-discounts) - the term settings that change the check
- [Customers and Sales settings](/platform/global-config/global-config-sales) - *Use Current User as Salesman*
- [The POS Sales Invoice](/modules/pos/pos-sales-invoice) - giving discounts at the till
