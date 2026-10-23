---
description: "Restaurant service at the POS: halls and tables and their statuses, table reservations, suspended orders and the call-center flow, online orders, and the Captain Order mobile app for waiters."
entities: [NamaPOSHall, NamaPOSTable, NamaPOSOrderReservation, NamaPOSCancelReservation]
---

# Tables, Reservations & Captain Order

Restaurants and cafés sell differently from a shop counter: orders belong to **tables**, waiters take them away from the till, and some are booked in advance. This page covers table service, reservations, the suspended-order and call-center flow, and the **Captain Order** mobile app.

## Halls and tables

Seating is organised into **halls** (dining areas) and the **tables** within them. The table viewer shows every table as a button, coloured by status so a glance tells you the floor at a time:

- **Free** — open, ready to seat.
- **Busy** — already has an order; the button shows its invoice code.
- **Reserved** — held for a booking in a given time window.

![Halls and tables](../../ar/modules/pos/images/tables/pos-halls-tables-en.png)

To seat guests, pick a free table in the viewer; it fills the invoice's **Table** field and you add items exactly as in any [sales invoice](./pos-sales-invoice.md). Hold the order with `F6` and the table turns busy. A busy table cannot be picked again from the viewer — to add another round, recall the table's order from the held-orders list (`Ctrl+F6`), add the items, and hold it again. When the guests are ready, recall the order, settle it at the [tender screen](./pos-payment-and-tender.md), and the table returns to free.

![Busy table](../../ar/modules/pos/images/tables/pos-table-busy-en.png)

![Table order](../../ar/modules/pos/images/tables/pos-table-order-en.png)

### Buttons in the table viewer

The viewer opens from the invoice's **Table** field.

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Main**, then a hall's name | «الرئيسية» | The trail at the top. Each hall is a button that shows that hall's tables; pressing **Main** goes back to the list of halls. |
| **All** / **Available** / **Busy** / **Reserved** | «الكل» / «متاحة» / «مشغولة» / «محجوزة» | Show every table, or only the free, busy or reserved ones. The **Filter by name** box («تصفية حسب الاسم») beside them keeps only the tables whose code or name contains what you type. |
| A table | — | Puts that table on the invoice and closes the viewer. A busy table is refused with *Busy table* — «طاولة مشغولة», a reserved one with *Reserved table* — «طاولة محجوزه». When **Use Multi Table As Default** is ticked in [Pos UI Settings](./erp-setup/pos-screen-and-device-settings.md#Screen-layout-Pos-UI-Settings), pressing tables selects and unselects them instead, so one order can take several tables. |
| **Confirm** | «تأكيد» | When several tables are being picked, saves the selected ones on the invoice. |
| **Cancel** | «إلغاء» | Closes the viewer without changing the tables. |

Two more entries sit in the slide menu under **Actions**:

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Invoice Tables** | «طاولات المستند» | With **Use Multi Table As Default** ticked, opens the same viewer to pick several tables for the current invoice, reservation or reservation cancellation. |
| **Tables Inquiry** | «استعلام عن طاولات» | Opens a window with **On Date**, **From-Time** and **To-Time**. Its **Tables Inquirment** button («استعلام عن طاولات») lists every busy table with the document that holds it, and the reservations that fall inside that time window. Leaving any of the three empty gives *please enter date, from time and to time* — «من فضلك ادخل التاريخ ومن والي وقت». |

## Reservations

A **reservation** holds a table — and often takes a deposit — for a future booking. You record the customer, the date and time, the items if they are pre-ordered, and the deposit paid. While the booking stands, the table shows as reserved and cannot be given to a walk-in.

![Reservation](../../ar/modules/pos/images/tables/pos-reservation-en.png)

When the guests arrive, pull up the reservation, add anything extra they order, and settle — the deposit is credited against the final bill. If the booking falls through, a **cancellation** records the reason and handles any refund (a cancellation fee can apply), and the table is freed again.

![Cancel reservation](../../ar/modules/pos/images/tables/pos-cancel-reservation-en.png)

The reservation and cancellation screens use the same toolbar as the sales invoice — see [Buttons on the sales screen](./pos-sales-invoice.md#Buttons-on-the-sales-screen). They appear in the **Documents** group of the slide menu, as **Reservation Screen** («شاشة حجز اوردر») and **Cancel Reservation Screen** («شاشة إلغاء الحجز»), only when **Use Reservation Document** is ticked in POS Settings. When **Do Not Show Payment Dialog In Reservation** is ticked too, the reservation screen shows **Save** («حفظ», `F5`) instead of **Payment**: it saves and prints the reservation without opening the tender screen.

## Suspended orders and the call center

**Suspending** an order is the same idea as holding an invoice on a shop counter — park it now, come back to it later — but it earns its own name here because of what it enables across machines.

![Suspended orders](../../ar/modules/pos/images/tables/pos-suspended-orders-en.png)

### Holding and recalling

Hold the current order with `F6`; it is saved and your screen clears for the next customer. Recall it later from the held-orders list (`Ctrl+F6`). An order held on one register can be found and recalled on another, which is what makes the next part possible.

The held-orders list, **List Hold Invoices** («الفواتير المعلقة»), has filters at the top and these buttons:

| Button | Arabic caption | What pressing it does |
|---|---|---|
| Magnifier icon | «بحث» | Runs the search with the filters at the top. The arrow icons beside it move to the first, previous, next and last page. |
| **Search In All Registers** | «البحث في كل الماكينات» | A tick box: when ticked, the search is no longer limited to this register's documents. |
| Tick boxes in the first column | — | Select orders for **Remove Selected Invoices**; the box in the header selects them all. |
| **OK** | «موافق» | Opens the highlighted order on the screen so you can carry on with it. |
| **Cancel** | «إلغاء» | Closes the list. |
| **Remove Selected Invoices** | «حذف الفواتير المختارة» | Asks for confirmation, then deletes the ticked orders. Needs **Can Delete Held Invoices** on the security profile, or a supervisor's approval. |

### The call-center flow

This turns a register into a **call-center station** that takes orders by phone and sends them to the branch that will actually prepare and deliver them.

It is built from two settings on the machine records:

- The taking machine runs in **customer-service mode**. The operator builds the order, picks the destination branch/machine, and instead of paying, **suspends** it — which sends it to that destination.
- The destination machine has **read orders from the customer-service center** switched on. It checks for incoming orders about once a minute, pops up a notification when one arrives, and the order shows up in its suspended-orders list (`Ctrl+Shift+F6`) ready to be opened and completed as a normal sale.

The whole order travels — items, quantities and prices, the customer details, notes, and any discounts — and the system retries if the network hiccups. It is ideal for delivery operations and centralized order intake across several branches.

## Online / remote orders

Orders can also arrive from online channels. **Inquiry POS Online Order Status** («استعلام عن حالة طلب نقاط بيع أون لاين», `Ctrl+O`, in the slide menu under **Actions**) opens the **Online Order Inquiry** window. It asks the server for the 25 most recent online orders and shows each one's customer, status, creation date and last update date. To see one customer's orders, pick the customer and press **Search** («بحث»); **Cancel** («إلغاء») closes the window. The window is a lookup only — it has no button to open an order — and the register must be online.

![Online order inquiry](../../ar/modules/pos/images/tables/pos-online-order-inquiry-en.png)

## Captain Order — the mobile app

**Captain Order** puts the order pad on a phone or tablet so waiters take orders at the table instead of walking back to the till. It shares the same items, favourites and tables as the register.

![Captain Order tables](../../ar/modules/pos/images/mobile/pos-mobile-tables-en.png)

A waiter opens a table, adds items — tapping favourites for speed and picking [add-ons](./pos-item-addons.md) where an item has them — and **sends** the order. It lands at the register and the kitchen straight away. More rounds can be sent to the same table through the evening, all accumulating on its bill, which is settled at a register when the guests leave.

![Captain Order order entry](../../ar/modules/pos/images/mobile/pos-mobile-order-en.png)

![Captain Order favourites](../../ar/modules/pos/images/mobile/pos-mobile-favourites-en.png)

![Captain Order send](../../ar/modules/pos/images/mobile/pos-mobile-send-en.png)
