---
description: "POS sales returns (full or partial, with or without the original invoice, return reasons and wear deductions), replacements, credit notes and discount coupons, with the messages a cashier may see."
entities: [NamaPOSSalesReturn, NamaPOSSalesReplacement, NamaPOSCreditNote]
---

# Returns & Replacements

Goods come back. A customer changes their mind, an item is faulty, a size is wrong. Nama POS handles all of it — straight refunds, exchanges, store credit, and even a deduction for wear — and keeps each one tied to who did it and why.

## Returns

A return sends items back and gives the customer their money (or store credit) in exchange. Start one with `Ctrl+F1`.

![Sales return screen](../../ar/modules/pos/images/returns/pos-return-screen-en.png)

### Against the original invoice

The usual case: you have the original receipt. Look up that invoice, and its lines appear for you to choose from. Pick the items and the quantities coming back — partial returns are fine, and any free items that came with a returned item are brought back with it. The register works out the refund.

#### Full or partial return

When most of a long invoice comes back, it is quicker to remove the few lines that stay with the customer. When only a few items come back, it is quicker to scan just those. The **Return Type** field (*نوع المرتجع*) chooses between the two:

- **A full return** (the default) — the invoice lines load with their sold quantities, and the cashier lowers or removes what is not coming back.
- **A partial return** — the invoice lines load at zero quantity. Each scan of an item adds one piece to the first invoice line of that item that still has quantity left to return, so when the same item was sold at two prices the customer gets back what they paid for each piece. Lines still at zero when the cashier pays are dropped from the return.

Changing the type after the invoice is picked loads its lines again from scratch. The field appears only after it is added to **Main Page Fields** on the **Return Settings** page of the POS screen settings (see [Screen, Keyboard & Device Settings](./erp-setup/pos-screen-and-device-settings.md)).

### Without the original invoice

Sometimes there is no receipt — it was lost, or the sale is very old. You can still process the return by adding each item by hand: find the item, set the quantity, and enter the price the customer paid.

### Return reason

Returns ask for a **reason** — defective, wrong item, customer changed their mind, and so on. It is a small step that makes the difference at month-end when someone asks *why* goods are coming back.

![Return reason](../../ar/modules/pos/images/returns/pos-return-reason-en.png)

### Deducting for wear (depreciation)

Not everything comes back in mint condition. Each line has a **Depreciate** button that applies a **depreciation reason** — a preset deduction such as "opened packaging −5%" or "used a week −20%". Pick the reason (or tick the box to apply it to every line) and its percentages are written into the line's discounts, so the customer is refunded the reduced amount rather than the full price.

The button is the same one the sales invoice screen has, and the register shows it only when its screen settings allow it (see [Depreciation reasons](./erp-setup/pos-charges-and-returns-settings.md#Depreciation-reasons)). On a return the deduction is simply a line discount: the extra ledger lines a depreciation reason can carry are booked only when it is used on a sales invoice, never on a return.

![Depreciation deduction on a return](../../ar/modules/pos/images/returns/pos-return-depreciation-en.png)

### The refund

How the money goes back mirrors how it came in. You can refund cash from the drawer, return it to the same payment method, or issue a **credit note** instead of cash (see below). If the original was paid by several methods, the refund can follow the same split.

![Return refund](../../ar/modules/pos/images/returns/pos-return-refund-en.png)

::: tip Return windows
Businesses usually allow returns only within a set number of days. A return past that window is blocked for an ordinary cashier — but a supervisor can authorize it on the spot (`Ctrl+R`), the same way other restricted actions are approved.
:::

### Returns waiting for the server

Most returns are saved on the register and reach the server later. A return made against an invoice that lives on the server — and any return your [POS Saving Settings](./erp-setup/pos-items-and-sync-settings.md#Documents-that-must-reach-the-server-first) send first — goes the other way: the server saves it first, and the register saves it after the server says yes.

If the connection drops or the register closes between those two steps, the register cannot tell whether the server got the return. So before sending, it keeps a copy of the return among the **held** documents, marked as *pending server confirmation*. A pending return keeps its number, stays out of the shift's money and is not picked up by the background sender. When the server answers, the copy becomes the final return; when the server refuses a new return, the copy is removed.

A pending return left behind needs the cashier's attention, and it **blocks the shift close** until it is handled:

1. On the return screen, open the held documents (`Ctrl+F6`) and open the pending return. The register first asks the server whether it already has it.
2. **The server has it, with the same items and quantities** — the register says so and offers to save it on the register too. Press OK. **Do not refund the customer again**: the refund was already made. If the customer was refunded with a credit note, the credit note is issued at this point.
3. **The server does not have it** — the return opens as usual. Complete it at the tender screen so it is sent again. If the customer already took the money, do not hand it over a second time; completing the return only records it.
4. **The server has it with different items or quantities**, or the server cannot be reached — the register refuses to open it. Check the connection and try again; a mismatch needs support.

Deleting a pending return also asks the server first. If the server has it, deleting is refused — open it and confirm it instead. If the server does not have it, the register asks once more before deleting: delete it only if the customer did not get their money. Deleting all held documents (`Shift+F6`) and **Delete Held Invoices On Shift Closing** both leave pending returns alone.

## Replacements (exchanges)

A replacement is the classic "I'll swap this for that". Rather than a refund followed by a separate sale, Nama POS does both in one document: start a replacement with `Shift+F1`.

![Replacement screen](../../ar/modules/pos/images/returns/pos-replacement-screen-en.png)

On a replacement, the lines coming **back** are entered as returns and the lines going **out** as new sales. The register nets the two and tells you the difference:

- New items worth **more** than the returned ones → the customer pays the difference.
- New items worth **less** → the customer is refunded the difference.

You settle that single difference at the tender screen, in either direction.

![Replacement settlement](../../ar/modules/pos/images/returns/pos-replacement-settlement-en.png)

> **Example.** A customer brings back a size-L shirt (50) and takes a size-M shirt (50) plus a pair of trousers (80). The return is 50, the new sale is 130, so the customer simply pays the 80 difference.

## Credit notes

A **credit note** is store credit. Instead of handing over cash on a return, you can issue a credit note for the value; the customer redeems it against a future purchase. Some promotions also generate credit notes automatically.

![Credit note issued](../../ar/modules/pos/images/returns/pos-credit-note-issued-en.png)

Each note carries a unique code, the amount, and (where set) the customer it belongs to and an expiry. Redeeming one is done at the tender screen, exactly like any other payment method — enter the code and its value comes off the bill, with the remaining balance tracked for next time.

## Discount coupons

**Coupons** are the promotional cousin of credit notes — "spend 100, get a 15 coupon for next time", or a gift card converted to a coupon. They are handed to the customer (printed) and redeemed later at the tender screen by entering the code, within their valid dates and balance.

![Coupon redemption](../../ar/modules/pos/images/returns/pos-coupon-redeem-en.png)

The redemption side of both credit notes and coupons is also described on the [Payment & tender](./pos-payment-and-tender.md#Credit-notes-and-coupons) page, since that is where the customer actually uses them.

## Messages you may see

These come from returns waiting for the server (see [Returns waiting for the server](#Returns-waiting-for-the-server)).

| Message | Why | What to do |
|---|---|---|
| *You cannot close the shift while these returns are not confirmed by the server: {0}. Open them from the held documents to confirm or complete them, or delete them* — «لا يمكن غلق الوردية و هناك مردودات لم يؤكد السيرفر استلامها: {0}. افتحها من المستندات المعلقة لتأكيدها أو استكمالها، أو احذفها» | The listed returns are still pending server confirmation. No setting turns this check off. | Open each one from the held documents and handle it as described above, then close the shift. |
| *Return {0} is already saved on the server as {1}. Press OK to save it on this point of sale too. Do not refund the customer again* — «المردود {0} محفوظ بالفعل على السيرفر برقم {1}. اضغط موافق لحفظه على نقطة البيع أيضا. لا ترد المبلغ للعميل مرة أخرى» | The server already has this return, with the same items and quantities. | Press OK. Do not give the customer any money. |
| *Return {0} was saved on this point of sale* — «تم حفظ المردود {0} على نقطة البيع» | The pending return was confirmed. | Nothing; it now counts in the shift like any other return. |
| *Return {0} did not reach the server. Delete it only if the customer was not refunded. Continue?* — «المردود {0} لم يصل إلى السيرفر. احذفه فقط إذا لم يتم رد المبلغ للعميل. هل تريد المتابعة؟» | The cashier is deleting a pending return the server does not have. | Delete it only if the customer left without their money. Otherwise cancel, open it and complete it. |
| *Return {0} is already saved on the server as {1}, so it cannot be deleted. Open it to confirm it on this point of sale* — «المردود {0} محفوظ بالفعل على السيرفر برقم {1}، لذلك لا يمكن حذفه. افتحه لتأكيده على نقطة البيع» | The cashier tried to delete a pending return the server already has. | Open the return and press OK to confirm it. |
| *Return {0} is saved on the server as {1}, but its items or quantities differ from this point of sale. Contact support* — «المردود {0} محفوظ على السيرفر برقم {1} لكن أصنافه أو كمياته مختلفة عن نقطة البيع. تواصل مع الدعم الفني» | The server's copy has other items or quantities than the register's. | Compare the server return named in the message with the register's copy before refunding anything. |
| *Could not check whether return {0} reached the server. Check the connection and try again* — «تعذر التحقق من وصول المردود {0} إلى السيرفر. تأكد من الاتصال وحاول مرة أخرى» | The register could not reach the server to check. | Restore the connection and open or delete the return again. |
| *Could not issue the credit note for return {0}, so the return was not saved on this point of sale. Try again* — «تعذر إصدار إشعار الدائن للمردود {0}، لذلك لم يتم حفظ المردود على نقطة البيع. حاول مرة أخرى» | The customer was refunded with a credit note, and the register could not issue it while confirming the return. | Open the return again and confirm it once more. |
