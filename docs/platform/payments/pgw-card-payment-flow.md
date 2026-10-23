---
entities: [PaymentTerminal, PGWMethodGroup]
---

# How a Card Payment Travels Through PGW

When the cashier presses **Pay Invoice**, four parties take part: the Nama screen in the browser, the PGW program on the same PC, the card machine, and the Nama server. The result lands on a payment line of the invoice. Knowing the order in which they talk to each other explains most support calls. If the machine approved the card but the line stays empty, the answer was lost between PGW and the browser. If the line fills in with no payment method, the Method Group did not recognise the card. If the browser reports that there is no connection on port 7842, PGW was never reached.

This page follows one payment from start to finish and shows what each make of machine sends back. Installing and setting up PGW is covered in [Installing and Setting Up the Card Terminal Program](/platform/payments/pgw-card-terminal-app). The terminal and Method Group records are described in [Payment Methods and Payment Terminals](/platform/payments/payment-methods-and-terminals#Payment-terminals).

## One payment, step by step

Take a sales invoice of 1,150 with a **Payment Terminal** selected and nothing paid yet.

1. **The cashier presses Pay Invoice.** Nama takes the remaining 1,150. **Pay Part Of Invoice** takes the amount the cashier types, and a voucher takes its own amount. If the last row of the payment-lines grid has no value yet, Nama uses that row. Otherwise it adds a new row, so a line already paid by hand or by an earlier card is never overwritten.
2. **Nama checks the terminal.** The browser asks the Nama server whether the terminal is a NearPay device. For any other terminal the browser goes on to PGW.
3. **The browser calls PGW.** It creates a new reference for this payment and remembers it in this browser, then calls PGW at `http://localhost:7842` with the amount and the reference. Nothing goes through the Nama server at this step. The call goes straight from the browser to the PC it runs on. If PGW does not answer, the browser shows *There is no connection on port 7842, please make sure that the PGW server is running.* and nothing is charged.
4. **PGW drives the machine.** The PGW status bar shows *Payment Transaction with value 1150 is processing*. PGW sends the amount to the machine over the connection chosen in its window, and the machine asks the customer for the card. The browser waits while the customer taps, inserts or enters a PIN.
5. **The machine answers, and PGW passes the answer back.** PGW turns the machine's answer into one common set of card details (listed [below](#What-each-machine-sends-back)), records it in its log and its **Last Transactions** window, and returns it to the browser.
6. **The Nama server picks the payment method.** The browser sends the card details to the Nama server. The server looks up the terminal's **Method Group** and returns the payment method of the first row that matches the card.
7. **The browser checks for a refusal.** A declined card, or an answer with no card details at all, stops here with *Purchase Transaction refused* or *Purchase Transaction not completed successfully*. The payment line is left as it was.
8. **The line is filled in.** The payment line gets the amount, the **Payment Method**, the approval code in **Authorization Number**, and the card details, and it is marked as paid from the terminal. Nama then recalculates the line as if the amount had been typed in, so the method's fee and its tax follow.

The invoice is **not** saved automatically. The cashier still saves it, as with any other document. Until then, the card has been charged but Nama holds the payment only on the screen. Do not close the screen without saving.

If no row of the Method Group matches the card, the line is still filled in, but without a payment method. The cashier picks one by hand.

## In Nama POS

Nama POS does not run in a browser. The POS program calls PGW on `localhost:7842` itself, but the idea is the same:

- The terminal comes from the **Register**, or from the POS configuration when the register has none.
- On the payment screen, a terminal button appears on the rows of the payment methods that appear in that terminal's Method Group. The cashier enters the amount on a row and presses the button, or `Alt+F2`.
- While the customer uses the card, the POS shows *Waiting for the terminal to complete the payment of {0}* with a **Cancel** button. The POS waits up to three minutes.
- If the cashier presses **Cancel**, or the three minutes pass, the POS does not simply give up. It shows *Checking the last transaction on the terminal to make sure the payment was not completed* and asks PGW for the machine's last transaction with this payment's reference. If that transaction was approved, the payment is filled in as if the answer had arrived normally. If not, the POS shows *The terminal payment was cancelled and no completed payment was found. If the terminal is still waiting for the card, cancel it on the terminal*. Cancel on the machine too, or the customer can still pay there.
- If the machine approves the card after the cancel, the POS still catches it. While the payment screen is open, the amount is added to the payments with *The terminal approved a payment of {0} after it was cancelled, and it was added to the payments*. If the payment screen was already closed, the POS shows *The terminal approved a payment of {0} after it was cancelled, and the payment screen was already closed. Please refund it from the terminal*.
- When the answer comes back, the POS finds the payment method from the Method Group. If the card belongs to another method than the row the cashier used, for example the cashier used the *Cards* row but the card was mada, the amount moves to the *mada* row, and the approval code goes into that row's authorization field.
- Unlike the web screens, the POS refuses a card that matches no row of the Method Group: *There is no payment method matched pgw properties*. Add a catch-all last row to the Method Group to avoid this.
- With **Automatic Save Invoice After Terminal Payment** (الحفظ التلقائي للفاتوره بعد الدفع بال terminal) on in the POS configuration, the invoice is saved as soon as the card payment brings the paid total up to the invoice total.

The card-payment screen itself is described in [Payment & Tender](/modules/pos/pos-payment-and-tender).

## What each machine sends back

The Method Group has nine detail columns, and each make of machine fills a different set of them. Build the Method Group rows on a column that your machine actually fills. A rule on a column the machine leaves empty never matches.

| Method Group column | Geidea | InterPay | Neoleap |
|---|---|---|---|
| **PAN Number / ApprovalCode** | An internal result code, not the card number | The approval code | The masked card number |
| **Merchant Id** | Merchant ID | Empty | Merchant ID |
| **Scheme Id / Card Scheme Name** | The card scheme code | The card scheme name | The card scheme code, for example `P1` |
| **Terminal Id / Device Serial No** | Terminal ID | The device serial number | Terminal ID |
| **ECR Ref Number / Local Reference Number** | The reference Nama sent | The local reference number | The retrieval reference number (RRN) |
| **STAN Number / rrNumber** | STAN | The retrieval reference number | STAN |
| **De55 Response** | Empty | The DE55 response | The response code |
| **Card Type** | Empty | The card type | The card scheme name, for example `mada` |
| **Masked Card Number** | Empty | The masked card number | The merchant category code |

In practice:

- **Neoleap**: match on **Card Type**, for example `mada`. Letter case does not matter.
- **InterPay**: match on **Card Type** or **Scheme Id / Card Scheme Name**.
- **Geidea**: Card Type stays empty, so match on **Scheme Id / Card Scheme Name**.

To see the exact values your machine sends, take one small payment with each kind of card and open PGW's **Last Transactions** window. The line that starts with *Response of payment transaction is* shows every field. Copy the value into the Method Group row. The Contains rule (the default) is the most forgiving choice.

## When the answer gets lost

Sometimes the machine approves the card but the browser never gets the answer: the cashier refreshed the page, the browser timed out, or PGW was restarted. The customer has paid, but the line is empty. **Do not charge the card again.**

On the sales invoice, press **Fetch Last Terminal Payment Transaction** (ايجاد اخر عمليه دفع تمت ولم تصل معلوماتها) in the **same browser** that sent the payment. The browser sends PGW the reference it remembered in step 3. PGW asks the machine for its last transaction and returns it only if it carries that same reference. The line is then filled in exactly as in step 8. If the machine's last transaction is a different one, nothing is filled in and the browser shows *Purchase Transaction not completed successfully*.

When the recovery does not fill in the line, check the machine's printed slip and PGW's **Last Transactions** window. If they show the payment as approved, enter the payment line by hand with the approval code from the slip.

Nama POS has no recovery button because it checks the last transaction by itself (see [In Nama POS](#In-Nama-POS)). Do not key in a POS card payment by hand after a cancel: the POS may already have added it, and the customer would be counted twice. The one case left is the message that the payment screen was already closed. Then the payment is on the machine but not in the POS: refund it from the machine, as the message says, and take the payment again. If the POS program itself was closed while the machine was working, nothing could catch the answer: check the slip and PGW's **Last Transactions** window, and if the payment was approved, type the amount on the card method's row with the approval code from the slip instead of charging the card again.

PGW only sends payments. It has no refund. A card refund is made outside Nama, through the acquirer's own procedure, and the refund line is entered by hand.

## When the card is declined

A declined card shows *Purchase Transaction refused*. When the machine returns a response code that Nama knows, the code and its reason follow, for example *Purchase Transaction refused - 116 - Not Enough Balance*. The code tells the cashier whether to try again, ask for another card, or ask the customer to call their bank. Every code and its meaning is listed in [Card Refusal Codes](/platform/payments/pgw-card-refusal-codes).

## Chrome asks to allow access to this device

Newer Chrome versions ask before a web page may talk to a program on the same PC. The first time the cashier pays by card, Chrome shows a prompt asking to let the Nama site **Access other apps and services on this device** (older versions say **Look for and connect to any device on your local network**). Click **Allow**.

If the prompt was blocked or dismissed, card payments fail with the port 7842 message even though PGW is running. To allow it again, click the site-info icon to the left of the address, open **Site settings**, and set **Apps on device** (older versions: **Local network access**) to **Allow**. Then reload the page.

## Messages you may see

None of the web-screen messages has Arabic text. They appear in English on Arabic screens too. The Nama POS messages at the end of the table do have Arabic text.

| Message | Why | What to do |
|---|---|---|
| *There is no connection on port 7842, please make sure that the PGW server is running. You can download the setup file from here* | The browser could not reach PGW on this PC, or could not process PGW's answer. | Check that PGW is running (its icon is in the notification area) and that **Test Connection** succeeds. In Chrome, check that `chrome://flags/#block-insecure-private-network-requests` is disabled. In newer Chrome versions, check that the site is allowed to reach PGW (see [Chrome asks to allow access to this device](#Chrome-asks-to-allow-access-to-this-device)). If PGW is running and the message persists, check that the Payment Terminal has a **Method Group**. The installer is at `https://www.namasoft.com/bin/PGW-setup.msi`. |
| *Please select payment terminal* — «برجاء إختيار payment terminal» | The document has no **Payment Terminal**. | Pick the terminal in the document header. |
| *Purchase Transaction refused* (sometimes followed by a code and a reason) | The machine or the bank declined the card, or the answer has no approval code and no card type. | See [Card Refusal Codes](/platform/payments/pgw-card-refusal-codes) for the reason. Ask for another card or another way to pay. |
| *Purchase Transaction not completed successfully* | The machine answered without any card details, for example because the customer cancelled on the machine, the machine timed out, or a recovery found a different last transaction. | Check the machine's slip. If nothing was charged, take the payment again. |
| *There is no uncompleted transaction* | **Fetch Last Terminal Payment Transaction** was pressed in a browser that never sent a payment to a terminal. | Use the browser that sent the payment, or check the machine's slip and enter the line by hand. |
| *There is no payment method matched pgw properties* | Nama POS: no row of the terminal's Method Group matches the card. | Add a row for that card, or a catch-all last row with no details, to the Method Group. |
| *Please enter amount to pay by terminal* — «من فضلك ادخل المبلغ المراد دفعه بال terminal» | Nama POS: the terminal button was pressed on a row with no amount. | Type the amount on the row first. |
| *Waiting for the terminal to complete the payment of {0}* — «في انتظار إتمام دفع مبلغ {0} على جهاز الدفع» | Nama POS: the amount was sent to the machine and the customer has not finished yet. | Let the customer finish on the machine, or press **Cancel**. |
| *Checking the last transaction on the terminal to make sure the payment was not completed* — «جاري التحقق من آخر عملية على جهاز الدفع للتأكد من عدم إتمام الدفع» | Nama POS: the cashier pressed **Cancel**, or the machine took longer than three minutes. | Wait; the POS fills in the payment if the machine approved it. |
| *The terminal payment was cancelled and no completed payment was found. If the terminal is still waiting for the card, cancel it on the terminal* — «تم إلغاء الدفع عن طريق جهاز الدفع ولم يتم العثور على عملية دفع مكتملة. إذا كان الجهاز لا يزال في انتظار البطاقة فقم بإلغائه من الجهاز» | Nama POS: the machine's last transaction for this payment is not an approved one. | Cancel on the machine if it is still waiting, then take the payment again. |
| *The terminal approved a payment of {0} after it was cancelled, and it was added to the payments* — «وافق جهاز الدفع على دفع مبلغ {0} بعد إلغائه، وتمت إضافته إلى المدفوعات» | Nama POS: the customer finished paying on the machine after the cashier cancelled. | Nothing; do not take the amount again. |
| *The terminal approved a payment of {0} after it was cancelled, and the payment screen was already closed. Please refund it from the terminal* — «وافق جهاز الدفع على دفع مبلغ {0} بعد إلغائه، وكانت شاشة الدفع قد أغلقت بالفعل. برجاء استرداد المبلغ من جهاز الدفع» | Nama POS: the late approval arrived after the payment screen was closed, so the POS could not record it. | Refund the amount from the machine, then take the payment again. |
| *There is no connection on port {0}, please make sure that the PGW server is running. You can download the setup file from {1}* — «لا يوجد اتصال على المنفذ {0}، برجاء التأكد من تشغيل برنامج PGW. يمكنك تحميل ملف التثبيت من {1}» | Nama POS: the POS could not reach PGW on this PC. Nothing was charged. | Check that PGW is running and that **Test Connection** succeeds. |
| *Could not read the terminal response: {0}* — «تعذرت قراءة رد جهاز الدفع: {0}» | Nama POS: PGW answered, but the POS could not process the answer. | Check the machine's slip and PGW's **Last Transactions** window. If the payment was approved and no payment row was filled, type the amount on the card method's row with the approval code from the slip instead of charging the card again. |
