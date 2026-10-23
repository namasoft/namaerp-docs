---
entities: [POSShiftOpening, POSShiftClosing, POSReceiptFromRegister, POSPaymentToRegister]
---

# Shifts & Cash

A **shift** is one work session on a register: it opens when a cashier starts, and closes when they count down the drawer and hand over. Getting the open and close right is what keeps the cash accountable. Reach the shift screen with `F2`.

## Opening a shift

You open a shift by recording what is in the drawer to begin with — the **opening balance**, entered per payment method and currency (so much cash, so much in each currency, and so on). The shift gets its own code, the date and time are stamped automatically, and the register it belongs to is known. You can add a remark or attach a count sheet.

![Shift opening](../../ar/modules/pos/images/shifts/pos-shift-open-en.png)

That opening balance becomes the baseline the system expects. Everything that happens during the shift adds to or subtracts from it.

### Buttons on the shift screen

The opening and closing screens share one layout: a row of icon buttons under the title bar (hover over one to see its name), and the action buttons at the bottom.

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **RePrint Document** (printer icon; needs **Can RePrint Documents**) | «إعادة طباعة المستند» | Prints the saved document on screen again. On a fresh screen it prints the latest document of this kind instead, when POS Settings has **Print Last Document If No Current Open Document** ticked. |
| **RePrint Last Open Shift** (second printer icon; closing screen only, same permission) | «إعادة طباعة آخر مستند فتح وردية» | Prints the opening document of the shift you are closing. |
| **Sign out** (power icon) | «خروج» | Returns to the login screen, asking first if something typed on screen would be lost. |
| **Show Document** (needs **Can Open Old Document**) | «عرض مستند» | Lists earlier documents of this kind so you can open one and look at it. |
| **Settings** (gear icon; needs **Edit Settings**) | «الإعدادات» | Opens the register's settings window — the same one filled in at [installation](./pos-installation.md). |
| **Send All** (cloud icon) | «إرسال الكل» | Opens a small window with **Force Send** («إرسال إجباري»), which sends every document still waiting to go to the server now, and **Reset and Force Send** («إعادة تعيين وإرسال إجباري»), which gives documents that ran out of automatic retries a fresh start and sends them. See [How POS data syncs](./pos-data-sync.md). |
| **Arabic** / **English** (language icon) | «العربية» / «الإنجليزية» | Switches the register's interface to the language its name shows. |
| **Open in Nama** (only once the document has reached the server) | «فتح المستند في نما» | Opens the same document in the ERP in your web browser. |
| **Ok** (`F2`) | «موافق» | Saves the shift document, prints it and returns to the sales screen. A closing document prints only for a cashier whose profile has **Can Print Shift Closing Document**. POS Settings can switch the `F2` key off with **Prevent Saving Shift By F2 Shortcut**. |
| **Cancel** | «إلغاء» | Returns to the sales screen without saving. |
| **Analyze Shift** (closing screen only; needs **Can View System Balance**) | «تحليل الوردية» | Opens the [shift analysis](#Analyzing-a-shift) window; its **Confirm** button («تأكيد») closes it. |

## During the shift

As the shift runs, every sale, return, pay-in and pay-out is tracked **by payment method**. You rarely think about it until closing time — but two deliberate cash movements are worth knowing about.

### Pay-in (receipt from register)

A **pay-in** adds cash to the drawer mid-shift — a supervisor tops up small change, or money comes in from the safe. You record the amount, currency, and where it came from. At close, the system expects to find this extra cash, so your count should include it.

![Receipt from register](../../ar/modules/pos/images/shifts/pos-receipt-from-register-en.png)

### Pay-out (payment to register)

A **pay-out** takes cash out of the drawer — a drop to the safe, a deposit, a small disbursement. You record the amount, currency, and destination. At close, the system has already subtracted it, so it does not expect to see it in the drawer.

![Payment to register](../../ar/modules/pos/images/shifts/pos-payment-to-register-en.png)

::: tip Drops to the safe
Rather than let the drawer fill up, a cashier can periodically drop bundles to a **safe deposit**. That cash still belongs to the shift — at close it is counted as part of the shift's total, just kept somewhere safer than the till.
:::

### Buttons on the pay-in and pay-out screens

Both screens carry the same row of icon buttons as the shift screen (reprint, sign out, show document, settings, send all, language, open in Nama — see [the shift screen's buttons](#Buttons-on-the-shift-screen)). On the form itself:

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Add Customer** (person icon beside **Receipt From** / **Paid To**; needs **Can Add Customer**) | «إضافة عميل» | Opens the new-customer window, for money received from or paid to a customer who is not on the register yet. |
| Pencil icon beside **Amount** (only when the party is a credit note and the cashier's profile has **Can Not Modify Credit Note Value In Payment**) | — | The amount comes from the credit note and is locked; the pencil unlocks it once a supervisor not under that restriction signs in, when that restriction is on the register's authorization list. |
| **Ok** | «موافق» | Saves the document, sends it to the server and prints it, then returns to the sales screen. With **Document To Pay Code** filled in, the document is saved only after the server accepts it; offline it is refused with *Cannot be saved, there is no connection* — «لا يمكن الحفظ حيث ان الاتصال بالسيرفر مفقود». When POS Settings has **Use Coupons** ticked and **Generate Coupons With Receipt Value** is ticked on a receipt from a customer, the coupons window opens before printing. |
| **Cancel** | «إلغاء» | Returns to the sales screen without saving. |

## Closing a shift

Closing is the reconciliation. The register lays out each payment method with what it **expects** to be there against what you **actually** counted, and the difference between them.

![Shift closing](../../ar/modules/pos/images/shifts/pos-shift-close-en.png)

The flow is:

1. Open the close screen — the register knows which shift is open.
2. **Count the drawer** and enter the actual amount for each method. For cash, a **denominations box** lets you key in how many of each note and coin you have; it totals them for you and double-checks your arithmetic.
3. The register works out the **variance**: actual minus expected. Positive is an **overage** (more than expected), negative a **shortage** (less). Zero is a clean close.
4. Add a remark to explain any variance, and save.

![Cash denominations](../../ar/modules/pos/images/shifts/pos-cash-denominations-en.png)

![Shift variance](../../ar/modules/pos/images/shifts/pos-shift-variance-en.png)

Whether a cashier can even see the "expected" figure is a permission — some businesses prefer the cashier to count blind, so the count is honest rather than nudged toward the expected number.

## Analyzing a shift

The **shift analysis** view answers "where did the money come from and go?" for the session. It breaks the total down by payment method and by transaction type — invoices, returns, replacements, reservations, pay-ins, pay-outs, credit notes, coupons — and shows the net for each method, with the grand total at the bottom. It also separates the **current shift's** cash from any older cash still sitting in the drawer.

![Shift analysis](../../ar/modules/pos/images/shifts/pos-shift-analysis-en.png)

For managers, this is the one screen that tells the whole financial story of a shift at a glance — useful both for the nightly cash-up and for investigating a stubborn variance.

::: info A quick cash count
You do not always need a full close to check the drawer. A standalone cash count, opened with `Ctrl+F2`, lets you reconcile cash mid-shift without ending it.
:::

::: tip Setting it up
Whether the cash is reset to zero at close, which held documents block a close, and how differences reach the accounts are all decided on the server — see [Shift Opening, Closing & Cash-Reset Settings](./erp-setup/pos-shift-close-settings.md).
:::
