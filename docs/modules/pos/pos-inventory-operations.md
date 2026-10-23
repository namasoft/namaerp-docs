---
description: "The stock documents a shop user creates at the register: stock receipt, stock transfer request, stock taking, and scrap and shortfalls documents for damaged or missing stock."
entities: [NamaPOSStockReceipt, NamaPOSStockTransferReq, NamaPOSStockTakingDetails, NamaPOSScrapDoc, NamaPOSShortfallsDoc]
---

# Inventory Operations at the Register

A point of sale is not only a till — it is also the front line of the store's stock. From the **Documents** group of the slide menu a shop user can receive goods, move them to another branch, count them, and write off what is damaged or missing, all without leaving the register. Each of these is a document that syncs up to the central system like everything else.

The same group also holds the **Cash Count** screen, which `Ctrl+F2` opens directly. It counts the cash in the drawer, not stock — see [Shifts & cash](./pos-shifts-and-cash.md).

![The Cash Count screen, opened with Ctrl+F2](../../ar/modules/pos/images/inventory/pos-inventory-screen-en.png)

### Buttons on the Cash Count screen

The Cash Count screen has its own row of icon buttons under the title bar, and three buttons under the grid. Icon buttons show their name when you hover over them.

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **RePrint Document** | «إعادة طباعة المستند» | Shown only when the security profile has **Can RePrint Documents**. A saved cash count closes the screen, so this prints the register's last cash count again — when **Print Last Document If No Current Open Document** is ticked in POS Settings. |
| **Sign out** | «خروج» | Returns to the login screen. |
| **Show Document** | «عرض مستند» | Lists the earlier cash counts so you can open one. Needs **Can Open Old Document**. The same button sits beside **Ok** under the grid. |
| **Settings** | «الإعدادات» | Opens the register's settings window. Needs **Can Edit Settings**. |
| **Send All** | «إرسال الكل» | Opens a small window with two buttons. **Force Send** («إرسال إجباري») sends every document that has not reached the server yet; with nothing waiting it says *No Data to send* — «لا توجد بيانات للإرسال». **Reset and Force Send** («إعادة تعيين وإرسال إجباري») sends again the documents that used up their automatic retries; with none it says *No failed documents exceeding retry limit* — «لا توجد سندات تجاوزت الحد الأقصى لمحاولات الإرسال». |
| **Arabic** / **English** | «العربية» / «الإنجليزية» | Switches the interface language. The button is named after the other language. |
| **Ok** (`F2`) | «موافق» | Saves the cash count, prints it and goes back to the sales screen. `F2` does nothing when **Prevent Saving Shift By F2 Shortcut** is ticked in POS Settings. |
| **NO** | «لا» | Goes back to the sales screen without saving. |

## Receiving stock

When goods arrive — from a supplier, head office, or another branch — a **stock receipt** records them into the store's warehouse. Add each item and the quantity received, add a note if needed, and save. The receipt updates the store's stock and is sent up to the central system.

![Stock receipt](../../ar/modules/pos/images/inventory/pos-stock-receipt-en.png)

## Transferring stock

When stock needs to move to another warehouse or branch, a **stock transfer request** records it leaving here and heading there. Your own warehouse is filled in as the source; choose the destination, list the items and quantities, and save. The receiving location confirms it on their side to complete the move.

![Stock transfer](../../ar/modules/pos/images/inventory/pos-stock-transfer-en.png)

## Counting stock

A **stock-taking** document is a physical count — the periodic check that what is on the shelf matches what the system thinks. Choose the warehouse and location, scan or enter each item with the quantity actually on hand, and save. The counts go up to the central system, where they are compared against the records to surface any shortfall or surplus.

![Stock taking](../../ar/modules/pos/images/inventory/pos-stock-taking-en.png)

## Writing off damaged or missing stock

Two documents record the stock that should no longer be on the books:

- A **scrap document** is for goods that are damaged, expired, or otherwise unusable, recorded with a reason and an audit trail.
- A **shortfalls document** records stock that is missing or unaccounted for — shrinkage, loss, breakage — again with a description for later review.

Whether either one actually takes the quantity out of stock is decided on the server by the document term it is saved with, not by the register — see [POS documents on the server](./erp-setup/pos-documents-on-the-server.md). If a scrapped item still shows as available, check that term first.

![Scrap document](../../ar/modules/pos/images/inventory/pos-scrap-doc-en.png)

![Shortfalls document](../../ar/modules/pos/images/inventory/pos-shortfalls-doc-en.png)

## Buttons on the stock document screens

The stock receipt, stock transfer request, stock taking, scrap and shortfalls screens use the same toolbar as the sales invoice — see [Buttons on the sales screen](./pos-sales-invoice.md#Buttons-on-the-sales-screen). The one difference is that no money changes hands, so the **Payment** button is replaced by **Save**:

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Save** (`F5`) | «حفظ» | Checks the document, saves it under its next code, prints it and opens a new blank document of the same kind. |

::: info Why do this from the register?
Doing stock work where the goods physically are — at the store, on the device already in the staff's hands — means the count or the write-off happens at the moment it is observed, not hours later back at a desk. And because it all syncs to the central system, head office sees the same picture the store does.
:::
