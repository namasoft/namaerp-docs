---
description: "The POS sales screen: its layout and every button on its tabs, header and lines, and the everyday flow of ringing up a sale, from adding items and discounts to setting the customer and getting ready to pay."
entities: [NamaPOSSalesInvoice]
menu: Point of sale → Documents → POS Sales Invoice
---

# The Sales Invoice

The sales screen is where a cashier spends almost the whole day. It is built to do one thing very fast: turn a basket of goods into a paid receipt. This page is a tour of that screen and the everyday flow of ringing up a sale.

![Empty sales screen](../../ar/modules/pos/images/sales/pos-sales-empty-en.png)

## The layout

At first glance there is a lot on screen, but it settles into a few regions:

- **The header**, across the top, carries the invoice's own details — its code and date, the customer, the salesman, the warehouse, and any extra fields your business uses. A running summary (total quantity, number of distinct items, and the amount) updates as you go.
- **The favourites panel**, down one side, is a grid of quick buttons for the items you sell most. There is a small **quantity** box here and a search filter.
- **The item-entry field** is where you type or scan an item.
- **The line grid** fills the middle: one row per item, with its quantity, unit price, discounts, tax and line total.
- **The totals panel** sits to the side, showing the items value, the discounts, the tax, and the final **net** the customer pays.

![Sales screen regions](../../ar/modules/pos/images/sales/pos-sales-regions-callout-en.png)

A floating **numeric keypad** can be shown on top of all this for entering quantities and amounts without a hardware keyboard; drag it wherever suits you and its position is remembered.

![On-screen keypad](../../ar/modules/pos/images/sales/pos-keypad-en.png)

## Buttons on the sales screen

Most buttons on this screen are icons. Rest the mouse on one and its name appears; the names below are those tooltips. If the **Shortcut Image Buttons To Text Buttons** option is ticked on the register's [UI settings](./erp-setup/pos-screen-and-device-settings.md), the Home buttons show their names as text instead of icons. A button whose permission the cashier lacks is either hidden or greyed out; the permission names are those on the [POS Security Profile](./erp-setup/pos-security-profiles.md).

The same title bar and toolbar sit on top of the return, replacement, reservation and stock document screens, so this section applies to them too.

### The title bar

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Notifications** (bell) | «تنويهات و اجرائات» | Opens the list of notifications the register has received. A red badge on the bell counts the unread ones. |
| **Menu** (☰) | «القائمه» | Slides the main menu in from the side of the screen; press it again to close it. The menu is described in [Getting started](./pos-getting-started.md#The-slide-menu). |

Under the title bar are three tabs: **Home** («الرئيسية»), **Shortcuts** («الاختصارات») and **Favourite Documents** («المستندات المفضلة»). Pressing a tab shows its row of buttons; pressing the open tab again folds the row away to give the line grid more room.

### The Home tab

In the screenshot above the Home row shows, from left to right, the first ten buttons of this table.

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Favourite Items** / **Invoice Data** | «الأصناف المفضلة» / «بيانات الفاتورة» | Switches the left-hand panel between the favourite-items grid and the invoice header fields. The button is named after the panel it will show. On a register that does not use the favourites panel it stays on Invoice Data and does nothing. |
| **Payment - F5** | «الدفع» | Opens the tender screen for the current invoice — see [Payment & tender](./pos-payment-and-tender.md). Not shown on a register in call-center mode, or for a user whose profile has **Prevent Payment**. |
| **Save** | «حفظ» | Takes the place of Payment on the stock documents (transfer request, stock receipt, stock taking, shortfalls, scrap) and on a reservation without payment: saves the document. |
| **Calculator** | «آلة حاسبة» | Opens the Windows calculator. Needs **Can Use Calculator**. |
| **Keyboard** | «لوحة المفاتيح» | Opens the Windows on-screen keyboard, for touch screens. Needs **Can Use KeyBoard**. |
| **Discount - F10** | «خصم» | Unlocks the invoice-discount fields (percentage and value) and puts the cursor in them. Works on the sales invoice only and needs **Can Make Document Discount**; otherwise the supervisor-authorization window appears. |
| **Lock - F11** | «قفل» | Locks the screen until someone signs in again — see [Getting started](./pos-getting-started.md#Locking-the-screen). |
| **Hold - F6** | «تعليق الفاتورة» | Holds (suspends) the invoice and starts a fresh one. An invoice with no lines is refused. Shown only with **Can Hold Invoice**. |
| **Cash drawer** | «فتح - غلق الدرج» | Opens the cash drawer without a sale. Shown only with **Can Open Cash Drawer**. |
| **List Hold Invoices** | «الفواتير المعلقة» | Lists the held invoices on this register so you can pick one and carry on with it. |
| *Your filtered held-invoice buttons* | (their own Arabic name) | One button for each line of **Filtered Held Invoices Buttons** on the [POS settings](./erp-setup/pos-settings-screen.md) screen. Each lists only the held invoices matching that line's filter condition. They show their names as text. |
| **Call Center** | «خدمة العملاء» | Lists the held orders that came in from the call center. It turns red and shows the count while any are waiting. Only on a register with **Read Orders From Call Center** ticked. |
| **Numbers Pad** | «لوحة الأرقام» | Shows or hides the floating numeric keypad. The register remembers the choice. |

### The Shortcuts tab

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Remove Line Discounts** | «إلغاء تخفيضات السطور» | Sets every line discount on the invoice to zero, and then also removes the line taxes, as the next button does. Works on an invoice that is not yet paid (new or held). Greyed out unless the profile has both **Make Line Discount** and **Can Cancel Taxes**. |
| **Print Full Invoice** | «طباعة الفاتورة الكامله» | Prints the full printed form of the invoice. The invoice must have been saved first. A held invoice needs **Can Print Held Invoice**. |
| **RePrint Document** | «إعادة طباعة المستند» | Prints the receipt of the document on screen again. On an empty screen it reprints the last document, if the POS settings option **Print Last Document If No Current Open Document** is ticked. Greyed out without **Can RePrint Documents**. |
| **Delete Hold Document** | «حذف المعلق» | After a confirmation, deletes the held invoice that is open on screen. Greyed out without **Can Delete Held Invoices**. |
| **Exit** | «خروج» | Signs the cashier out and goes back to the login screen. If the invoice has unsaved changes you are asked first. |
| **Show Payments Details** | «الإطلاع علي تفاصيل الدفع» | Shows how a paid invoice was settled: each payment method, its value and authorization number. Does nothing on a held or deferred invoice. Greyed out without **Can Show Payments Details**. |
| **Remove Line Taxes** | «إلغاء ضرائب السطور» | Sets the taxes on every line to zero. Works on a new or held invoice. Greyed out unless the profile has both **Can Make Line Taxes** and **Can Cancel Taxes**. |
| **Show Document** | «عرض مستند» | Opens the search window to pick an earlier document of this type (`Ctrl+F3` does the same). Greyed out without **Can Open Old Document**. |
| **Open in Nama** | «فتح المستند في نما» | Opens the same document in the ERP in your web browser. Appears only once the document has reached the server. |
| **Arabic** / **English** | «العربية» / «الإنجليزية» | Switches the register's language. The button is named after the language it switches to. |
| **Add Service Item** | «إضافة صنف الخدمة السياحية» | Adds the service-charge item to the invoice. Shown only when a service-charge item is set on the register or in the POS settings. |
| **Add Delivery Item** | «إضافة خدمة التوصيل» | Adds the delivery item to the invoice. Shown only when a delivery item is set on the register or in the POS settings. |
| **Update SalesMan** | «تعديل مندوب المبيعات» | Saves a changed salesman on an invoice that is already paid, and sends the change to the server if the invoice was already sent. Shown only with **Allow Salesman Update**. |
| **Customer Display Window** | «نافذة العميل» | Opens or closes the customer-facing window on the second screen. Shown only when the computer has two screens. |
| *Favourite procedures* | (the menu caption) | Each action listed under **POS Favourite Procedures** in the register's UI settings gets a button here that does exactly what the menu entry of the same name does. |

### The Favourite Documents tab

Each button opens a new document of the type it names — a sales invoice in a given category, a return, a stock transfer request, a receipt, the shift screen, and so on. The buttons, their Arabic and English titles and their record category are set in the **Favourite Documents** grid of the [POS register](./erp-setup/pos-register-setup.md); when the register lists none, the list in the POS settings is used.

### Buttons in the invoice header and on each line

The **Invoice Data** panel has two person icons above the salesman and customer fields:

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Add Customer** | «إضافة عميل» | Opens the new-customer window; the new customer goes straight onto the invoice. Shown only with **Can Add Customer**. |
| **Edit Customer** | «تعديل العميل» | Asks for a customer, then opens that customer's details for editing. Shown only with **Can Edit Customer**. |

Each line of the grid ends with small buttons. Any of them can be removed with the **Sales Line Buttons** options on the register's UI settings.

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Duplicate Line** | «تكرار سطر» | Adds a copy of the line with the same details. |
| **Remove** | «حذف» | Deletes the line. |
| **Depreciate** | «تحويل إلى هالك» | Asks for a depreciation reason and applies that reason's discounts to the line. Tick **Depreciate All Lines** in the same window to apply it to every line. Needs **Can Depreciate Sales Line**. |
| **Increase Line Quantity** (+) | «زيادة كمية الصنف» | Adds one to the line's quantity and reprices the line. |
| **Decrease Line Quantity** (−) | «خفض كمية الصنف» | Takes one off the line's quantity. It does nothing once the quantity is 1. |

## Ringing up a sale

### Start a new invoice

Press `Alt+F1` (or pick **Sales Screen** under **Documents** in the menu). You get a fresh invoice with the cursor already in the item field, ready for the first scan.

### Add items — four ways

Cashiers reach for whichever is fastest in the moment:

1. **Scan a barcode.** The item drops in with quantity 1 and the field clears for the next scan. This is the bread and butter of the counter.
2. **Type an item code** and press Enter — same result, for items without a barcode to hand.
3. **Search by name.** Type part of the name and pick from the list that appears. Handy when neither code nor barcode is at hand.
4. **Tap a favourite.** On the favourites panel, tap the item's button. Use the breadcrumb to drill into categories (say, *Drinks → Cold*). To add several at once, type the number in the **quantity** box first, then tap the button.

An item whose **Sellable** box (*يمكن بيعه*) is off on the item card is refused with a beep and this message, where `{0}` is the item code and name joined by `_`:

*Item {0} is unsellable in POS* — «الصنف {0} غير قابل للبيع في نقاط البيع»

Tick **Sellable** on the item card on the server; the register picks the change up with the next data sync. An item deleted on the server that the register could not remove is also kept on the register as not sellable, so it gives the same message.

![Sales screen with lines](../../ar/modules/pos/images/sales/pos-sales-with-lines-en.png)

![Item search dialog](../../ar/modules/pos/images/sales/pos-item-search-dialog-en.png)

### Adjust a line

Click a line to select it, then:

- **Change the quantity** with `Ctrl+Q`, which opens a small editor (it copes with fractional and weight quantities).
- **Edit the line's details** — serial or lot numbers, expiry, a line remark, a reference — from the line's action buttons.
- **Duplicate the line** with `+` when you need another identical unit with the same details.
- **Delete the line** with `Ctrl+Del`.

![Edit quantity dialog](../../ar/modules/pos/images/sales/pos-edit-qty-dialog-en.png)


If an item carries **add-ons** — sizes, colours, or extras like sugar and milk — the add-ons dialog opens when you add it. That whole topic has its own page: [Item add-ons](./pos-item-addons.md).

### Apply discounts

There are two levels, and they stack:

- **Line discounts.** Select a line and press `Alt+1` through `Alt+8` for up to eight discount levels, entering a percentage or a fixed amount. Whether a cashier may do this at all is a permission on their POS Security Profile; how deep each discount may go is set per employee — see [Salesman Discount Limits](/modules/invoicing/salesman-discount-limits), which also explains why an offer's discount can snap back when you change it.
- **Invoice discount.** Press `F10` to discount the whole invoice; `Ctrl+F10` removes it.



The totals panel recalculates the moment you change anything.


### Set the customer

For a quick cash sale you often need no named customer at all. When you do:

- Press `F7` to pick an existing customer by code or name.
- Press `Shift+F7` to register a **new** customer on the spot without leaving the sale.
- Press `Ctrl+F7` to clear the customer off the invoice.

The customer brings their own pricing, credit terms and any loyalty along with them.

![Customer on the invoice](../../ar/modules/pos/images/sales/pos-customer-on-invoice-en.png)

![Add new customer](../../ar/modules/pos/images/sales/pos-add-customer-dialog-en.png)

## Handy tools while selling

**Favourites.** More than a convenience — for a fast counter they are the difference between keeping up with the queue and falling behind. Supervisors arrange them into categories so the common items are one tap away.


**Price inquiry (`Ctrl+F9`).** Check an item's price and units without disturbing the sale in progress — perfect for answering "how much is this?" over the counter or on the phone.

![Price inquiry](../../ar/modules/pos/images/sales/pos-price-inquiry-en.png)

**Hold and recall (`F6` / `Ctrl+F6`).** If a customer dashes back for a forgotten item, **hold** the invoice with `F6`, serve the next person, then **recall** it with `Ctrl+F6` and carry on. Held invoices can even be picked up on another register — see [Tables & restaurant](./pos-tables-and-restaurant.md#Suspended-orders-and-the-call-center) for how that works across machines.

![Held invoices](../../ar/modules/pos/images/sales/pos-held-list-en.png)

**Open an existing invoice (`Ctrl+F3`).** Pull up an earlier invoice to review it, reprint it, or use it as the basis for a return.

## Ready to pay

When every item and discount is in, the **net** in the totals panel is what the customer owes. Press `F5` to move to the tender screen and take the money — that is the next page, [Payment & tender](./pos-payment-and-tender.md).
