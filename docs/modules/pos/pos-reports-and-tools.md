---
entities: [NamaPOSInternalMessage]
---

# Reports & Tools

Beyond selling, the register carries a handful of everyday tools: running reports, messaging other staff, checking a price without making a sale, and — for supervisors — running maintenance utilities.

## Reports

You can run reports right inside the POS. Open the reports screen, pick a report, fill in any prompts it asks for (a date range, a warehouse filter), and it opens in a viewer you can page through, print, or export to PDF, Excel or an image.

![Reports list](../../ar/modules/pos/images/reports/pos-reports-list-en.png)

![Report parameters](../../ar/modules/pos/images/reports/pos-report-params-en.png)

![Report viewer](../../ar/modules/pos/images/reports/pos-report-viewer-en.png)

### Buttons on the reports screens

The reports list opens from the slide menu (**Actions → Reports**). Its icon buttons show their name when you hover over them.

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Search** | «بحث» | Lists the reports that match the filters typed at the top. |
| **Previous** / **Next** | «السابق» / «التالي» | Move one page back or forward through the list. The arrows beside them jump to the first and the last page. |
| **Ok** (`Enter`) | «موافق» | Opens the selected report; double-clicking a report does the same. The prompts window opens first, unless the report has nothing to ask. |
| **Cancel** | «إلغاء» | Closes the list. |
| **Confirm** | «تأكيد» | On the prompts window: runs the report with the values entered and opens it in the viewer. |
| **Cancel** | «إلغاء» | On the prompts window: closes it without running the report. |

The viewer has its own toolbar for saving the report to a file, printing it, moving between pages and zooming.

Which reports appear here is decided centrally — any report in the main Nama system can be made available to the POS. A report can run against the **local** register database (fast, and works offline, but only this register's data) or against the **server** database (a complete, up-to-date picture across all points). The [POS FAQ](./pos-faq.md) walks through making a report available in POS.

## Internal messages and notifications

Staff can send short **internal messages** to one another — to a few named employees at once — straight from the register. The recipient sees it as a pop-up on their machine, or it waits for them if they are offline.

![Internal message](../../ar/modules/pos/images/reports/pos-internal-message-en.png)

The message screen opens from the slide menu (**Documents → Write Internal Message**). Pick up to five employees, type the message, then:

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Send** | «إرسال» | Checks that at least one employee and a message body are filled in, saves the message, sends it to the server and returns to the sales screen. |
| **Cancel** | «إلغاء» | Returns to the sales screen without sending. |

Those pop-ups are part of a wider **notifications** stream. `Ctrl+F11` fetches your own notifications from the server and lists them; **Cancel** («إلغاء») closes the list.

The bell at the top of the screen is the register's own feed: it counts the documents this register has sent to the server, and the ones that failed to go, for users whose security profile lets them see data-transfer errors. Pressing the bell opens the **Notifications** window:

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Delete** | «مسح» | Empties the list and resets the bell's count. |
| **Close** | «إغلاق» | Closes the window and leaves the list as it is. |


## The price checker

`Ctrl+F9` gives any cashier a quick **price inquiry** mid-sale, as covered on the [sales page](./pos-sales-invoice.md). On top of that, a register can run as a dedicated **price-checker station** — a full-screen kiosk, often at the shop floor, where customers scan an item themselves and see its name and price in large, clear type (with promotional images cycling alongside). Scanning the next item clears the last.

A register becomes a price-checker station through its `nama.properties` file (in the POS folder), not through a screen. Restart POS after editing it:

| Property | What it does |
|---|---|
| `priceCheckerMode=1` | Starts POS as a price-checker station instead of the login screen. |
| `priceCheckerShowPOSButton=1` | Shows a **Point of sale** button beside the barcode field. It leaves the station and returns to the login screen. Without this property the button is hidden, so customers cannot leave the station. |
| `promotionalImagesFolderPath=D:/promo` | The folder whose `.png`, `.jpg`, `.jpeg` and `.gif` images cycle beside the price, after the register's logo. Defaults to `C:\posPromotionalImages`. |

![Price checker mode](../../ar/modules/pos/images/reports/pos-price-checker-mode-en.png)

## Running utilities

Now and then a supervisor needs to run a one-off **utility** on a register — a maintenance or fix-up routine named by the support team. The utilities dialog takes the utility's name and any parameters, runs it, and reports the result.

![Run utility dialog](../../ar/modules/pos/images/reports/pos-utils-dialog-en.png)

The menu entry is kept out of sight until it is needed: in the slide menu, press **Data Settings → Activate Server Log** first, and **Actions → Run POS Utility** then appears. In the dialog, type the utility's name in the first box and its parameters in the second, then:

| Button | Arabic caption | What pressing it does |
|---|---|---|
| **Confirm** | «تأكيد» | Runs the utility. *Done* («تم التنفيذ») means it finished; anything else is the utility's error message. |
| **Cancel** | «إلغاء» | Closes the dialog without running anything. |

You would normally only do this when asked to by support, with the exact name they give you. One common example appears in the [POS FAQ](./pos-faq.md): a utility that fixes a payment method whose cash/non-cash setting was changed after it had already been used.

::: warning
Utilities are maintenance tools — run one only when you know what it does (or have been told to by support) and with the parameters you were given. They act directly on the register's data.
:::
