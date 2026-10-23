# Self-Checkout Kiosk

A self-checkout kiosk lets shoppers scan their own items and pay by card without a cashier. It is not a separate product: the kiosk is an Android device running the **Captain Order** app in **Self Checkout Kiosk Mode**, and every sale it makes is saved on an ordinary Nama POS register on the same shop network. The register does the real work — prices, offers, the shift, saving the invoice and syncing it to the server. The kiosk is the screen the customer touches.

## What has to be in place

**A register that serves the kiosk.** On the register record (**Point of sale → Register → Register**, see [Setting Up a Register](./erp-setup/pos-register-setup.md)):

- **Machine Port** (*رقم منفذ الماكينه*) — the port the register program listens on for mobile apps, for example `8090`. The register program opens it when it starts, so restart it after the change has synced.
- **Available In Mobile Application** — ticked, or the kiosk cannot connect.
- **Payment Terminal**, on the register or on POS Settings — its payment gateway method group decides which payment method each card becomes, exactly as described in [Payment Methods and Payment Terminals](/platform/payments/payment-methods-and-terminals).

The register program must stay running, and its shift must be open, whenever the kiosk is in use.

**Permissions for the staff who look after it.** Every staff action on the kiosk asks for a user name and password, and checks that user's [POS Security Profile](./erp-setup/pos-security-profiles.md). The kiosk checks the profile's **Capabilities** grid, so add each permission below as a line in the grid.

## Setting up the kiosk

Install Captain Order on the kiosk device and fill in its settings screen:

| Field | Arabic on screen | What to enter |
|---|---|---|
| Register URL | رابط الماكينة | `http://<register PC address>:<Machine Port>`. Instead of typing it, press **QR Code** beside **Login** on the register's sign-in screen and scan the code with the app's **QR Code** button. |
| User Name / Password | المستخدم / كلمة المرور | The POS user the kiosk works as. |
| Register Code | كود الماكينة | The code of the register that serves the kiosk. |
| Self Checkout Kiosk Mode | وضع كشك الدفع الذاتي | Ticked. Leave **Price Checker** and **Work As Payment Gateway** unticked; either one takes over the device instead. |
| Self-checkout kiosk print server URL | عنوان خادم الطباعة لكشك الدفع الذاتي | The print service on the kiosk device that drives its receipt printer. Left empty, `http://127.0.0.1:50000/print` is used. |
| NearPay Settings | — | **Environment**, **Login Type** and **Login Value** of the kiosk's NearPay account, which takes the card on the device itself. |

Press **Login**. From then on the app opens straight into the kiosk's start screen, with the register's logo as its background.

## The customer's visit

1. The customer taps **Start**. The kiosk first checks that the register's shift is open.
2. They enter their mobile number (up to ten digits) and tap **Confirm**. A POS customer with that number is used; otherwise a new one is created on the register, with the number as its code, and reaches the server with the next sync.
3. They scan each item with the kiosk's barcode scanner, or tap the camera icon in the item field. Each line shows the item's picture, name, code and price, and the totals show the item count and the invoice net. Scans made in quick succession are queued, so none is lost. An item with [add-ons](./pos-item-addons.md) offers them as it is added.
4. They tap **Checkout**. When POS Settings has **Dont Auto-Add Free Items (Claim By Scan Or Resolve At Payment)** ticked, offers are applied now and any free items still owed are listed for the customer to scan, as described in [Free Items in POS](./pos-free-items-claim-and-reconciliation.md).
5. The kiosk asks for the card for the full invoice net. Once the card is approved, the register saves the invoice and records the payment.
6. **Payment Successful** appears with **Do you want a receipt?** — **Print Receipt** prints the register's invoice form on the kiosk printer.

## Staff actions

| Action | How | Permission line needed |
|---|---|---|
| Change a quantity | The + and − buttons on a line (− at one removes the line). Asked once per sale. | Can Edit Qty |
| Abandon the sale | **Cancel**, or the device's Back button | Can Cancel Invoice Before Save |
| Hold the sale for a cashier | Long-press **Powered by Namasoft** under the cart buttons | Can Hold Self Checkout Invoice |
| Reprint a receipt | Receipt icon on the start screen, then tap the invoice | Can RePrint Documents |
| Open or close the shift | Register icon on the start screen | Can Open-Close Shifts |
| Change the kiosk's settings | Gear icon on the start screen | Any valid user |

The globe icon switches the kiosk between Arabic and English without a sign-in.

**Holding** is for the customer who wants to pay another way. The sale is saved on the register as a held invoice, *Invoice held successfully* appears, and the kiosk returns to its start screen. A cashier then recalls it at the register (`Ctrl+F6`, see [The Sales Invoice](./pos-sales-invoice.md)) and takes payment there. A held sale is checked like any other: the shift must be open, and the POS Settings rules that require a customer or a salesman apply.

## Messages you may see

Messages without Arabic text in the product appear in English on Arabic screens too.

| Message | Why | What to do |
|---|---|---|
| *Please open shift first* — «يرجى فتح الوردية أولاً» | The register has no open shift. | Open it from the register icon, or at the register. |
| *Register not exists* — «ماكينة غير موجوده» | Login on the settings screen could not find the register: a wrong URL or code, or **Available In Mobile Application** is not ticked. | Correct the URL or code, or tick the field and sync. |
| *User does not have the capability* followed by the permission's name — «المستخدم ليس لديه هذه الصلاحية» | The user who signed in lacks that line in the Capabilities grid. | Sign in as a user who has it, or add the line. |
| *There is no payment method matched pgw properties* | The card was approved but no row of the terminal's method group matched it. | Add a matching or catch-all row to the method group. |
| *Open Shift firstly* | A sale was held while the register had no open shift. | Open the shift and hold the sale again. |
