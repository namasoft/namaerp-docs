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

![A Payment Terminal](../../ar/platform/images/payments/payment-terminal-main-en.png)

## In Nama POS

Nama POS does not run in a browser. The POS program calls PGW on `localhost:7842` itself, but the idea is the same:

- The terminal comes from the **Register**, or from the POS configuration when the register has none.
- On the payment screen, a terminal button appears on the rows of the payment methods that appear in that terminal's Method Group. The cashier enters the amount on a row and presses the button, or `Alt+F2`.
- While the customer uses the card, the POS shows *Waiting for the terminal to complete the payment of {0}* with a **Stop waiting** button. The button stays disabled, with a countdown, for the first 30 seconds. The POS waits up to three minutes for PGW's answer. If none comes, it stops with *The terminal did not answer within 3 minutes. Check the terminal screen or its last receipt before taking another payment*.
- The POS cannot cancel a payment on the machine. **Stop waiting** first asks *The POS cannot cancel the payment on the terminal. To cancel it, press cancel on the terminal itself. Stop waiting anyway?* and then closes the wait with *Stopped waiting for the terminal. Finish or cancel the payment on the terminal and check its screen before taking another payment*. Cancel on the machine too, or the customer can still pay there.
- The POS never asks PGW for the machine's last transaction. Only one terminal payment can be open at a time: pressing the terminal button again on the same payment screen reopens the wait (*Still waiting for the terminal to complete the previous payment of {0}*), and on another payment screen the POS refuses with *The terminal is still processing a previous payment of {0}. If the terminal shows nothing, wait {1} seconds for the POS to stop waiting automatically, or restart the PGW app, then try again*.
- If the machine approves the card after **Stop waiting**, and PGW answers within the three minutes, the POS still catches it. While the payment screen is open, the amount is added to the payments with *The terminal approved a payment of {0} after it was cancelled, and it was added to the payments*. If the payments then exceed the invoice, it shows *The terminal approved a payment of {0} after it was cancelled. The payments now exceed the invoice by {1}. Remove the other payment, or refund it from the terminal* instead. If the payment screen was already closed, the POS shows *The terminal approved a payment of {0} after it was cancelled, and the payment screen was already closed. Please refund it from the terminal*.
- When the answer comes back, the POS finds the payment method from the Method Group. If the card belongs to another method than the row the cashier used, for example the cashier used the *Cards* row but the card was mada, the amount moves to the *mada* row, and the approval code goes into that row's authorization field.
- Unlike the web screens, the POS fills in no payment for a card that matches no row of the Method Group. When the card was charged, it says so with the amount and the approval code: *The {0} card was charged {1} with authorization code {2}, but this card is not defined in the Payment Gateway Method Group {3}. Add a line to that group with Scheme Id / Card Scheme Name set to {4} and choose its payment method. For this payment, add it manually or refund it from the terminal* when the answer carries a **Scheme Id / Card Scheme Name** value, otherwise *The card was charged {0} with authorization code {1}, but no payment method matches the terminal response. Add the payment manually or refund it from the terminal*. When the card was not charged, *There is no payment method matched pgw properties* is shown next to the refusal. Add a catch-all last row to the Method Group to avoid this.
- With **Automatic Save Invoice After Terminal Payment** (الحفظ التلقائي للفاتورة بعد الدفع بال terminal) on in the POS configuration, the invoice is saved as soon as the card payment brings the paid total up to the invoice total.

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

On the sales invoice, press **Fetch Last Terminal Payment Transaction** (إيجاد آخر عملية دفع تمت ولم تصل معلوماتها) in the **same browser** that sent the payment. The browser sends PGW the reference it remembered in step 3. PGW asks the machine for its last transaction and returns it only if it carries that same reference. The line is then filled in exactly as in step 8. If the machine's last transaction is a different one, nothing is filled in and the browser shows *Purchase Transaction not completed successfully*.

When the recovery does not fill in the line, check the machine's printed slip and PGW's **Last Transactions** window. If they show the payment as approved, enter the payment line by hand with the approval code from the slip.

Nama POS has no recovery button. After **Stop waiting** it keeps listening for that payment's answer until PGW answers or the three minutes pass (see [In Nama POS](#In-Nama-POS)). Do not key in a POS card payment by hand during that time: the POS may still add it, and the customer would be counted twice. When the message says that the payment screen was already closed, the payment is on the machine but not in the POS: refund it from the machine, as the message says, and take the payment again. When the POS reports that the terminal did not answer within 3 minutes, or the POS program itself was closed while the machine was working, nothing catches the answer any more: check the slip and PGW's **Last Transactions** window, and if the payment was approved, type the amount on the card method's row with the approval code from the slip instead of charging the card again.

PGW only sends payments. It has no refund. A card refund is made outside Nama, through the acquirer's own procedure, and the refund line is entered by hand.

## When the card is declined

A declined card shows *Purchase Transaction refused*. When the machine returns a response code that Nama knows, the code and its reason follow, for example *Purchase Transaction refused - 116 - Not Enough Balance*. The code tells the cashier whether to try again, ask for another card, or ask the customer to call their bank. Every code and its meaning is listed in [Card Refusal Codes](/platform/payments/pgw-card-refusal-codes).

## Chrome asks to allow access to this device

Newer Chrome versions ask before a web page may talk to a program on the same PC. The first time the cashier pays by card, Chrome shows a prompt asking to let the Nama site **Access other apps and services on this device** (older versions say **Look for and connect to any device on your local network**). Click **Allow**.

If the prompt was blocked or dismissed, card payments fail with the port 7842 message even though PGW is running. To allow it again, click the site-info icon to the left of the address, open **Site settings**, and set **Apps on device** (older versions: **Local network access**) to **Allow**. Then reload the page.

## Messages you may see

Apart from *Please select payment terminal*, the web-screen messages have no Arabic text and appear in English on Arabic screens too. Most Nama POS messages at the end of the table do have Arabic text; the ones shown without it appear in English.

| Message | Why | What to do |
|---|---|---|
| *There is no connection on port 7842, please make sure that the PGW server is running. You can download the setup file from here* | The browser could not reach PGW on this PC, or could not process PGW's answer. | Check that PGW is running (its icon is in the notification area) and that **Test Connection** succeeds. In Chrome, check that `chrome://flags/#block-insecure-private-network-requests` is disabled. In newer Chrome versions, check that the site is allowed to reach PGW (see [Chrome asks to allow access to this device](#Chrome-asks-to-allow-access-to-this-device)). If PGW is running and the message persists, check that the Payment Terminal has a **Method Group**. The installer is at `https://www.namasoft.com/bin/PGW-setup.msi`. |
| *Please select payment terminal* — «برجاء اختيار payment terminal» | The document has no **Payment Terminal**. | Pick the terminal in the document header. |
| *Purchase Transaction refused* (sometimes followed by a code and a reason) | The machine or the bank declined the card, or the answer has no approval code and no card type. With the code `BUSY`, PGW refused the request itself because the machine was still busy with another one. | For `BUSY`, finish or cancel the other request on the machine and try again. Otherwise see [Card Refusal Codes](/platform/payments/pgw-card-refusal-codes) for the reason. Ask for another card or another way to pay. |
| *Purchase Transaction not completed successfully* | The machine answered without any card details, for example because the customer cancelled on the machine, the machine timed out, or a recovery found a different last transaction. | Check the machine's slip. If nothing was charged, take the payment again. |
| *There is no uncompleted transaction* | **Fetch Last Terminal Payment Transaction** was pressed in a browser that never sent a payment to a terminal. | Use the browser that sent the payment, or check the machine's slip and enter the line by hand. |
| *There is no payment method matched pgw properties* | Nama POS: no row of the terminal's Method Group matches the card, and the card was not charged. | Add a row for that card, or a catch-all last row with no details, to the Method Group. |
| *The {0} card was charged {1} with authorization code {2}, but this card is not defined in the Payment Gateway Method Group {3}. Add a line to that group with Scheme Id / Card Scheme Name set to {4} and choose its payment method. For this payment, add it manually or refund it from the terminal* — «تم خصم مبلغ {1} من بطاقة {0} برقم الموافقة {2}، ولكن هذه البطاقة غير معرفة في Payment Gateway Method Group {3}. برجاء إضافة سطر في هذه المجموعة بقيمة {4} في حقل Scheme Id / Card Scheme Name واختيار طريقة الدفع الخاصة به. أما هذه الدفعة فبرجاء إضافتها يدويا أو استرداد المبلغ من جهاز الدفع» | Nama POS: the card was charged, but no row of the Method Group matches it. | Type the amount on the card method's row with the authorization code from the message, or refund it from the machine. Then add the row the message names. |
| *The card was charged {0} with authorization code {1}, but no payment method matches the terminal response. Add the payment manually or refund it from the terminal* — «تم خصم مبلغ {0} من البطاقة برقم الموافقة {1}، ولكن لا توجد طريقة دفع مطابقة لرد جهاز الدفع. برجاء إضافة الدفعة يدويا أو استرداد المبلغ من جهاز الدفع» | Nama POS: as above, for an answer with no scheme value. | As above, and add a row or a catch-all last row to the Method Group. |
| *Please enter amount to pay by terminal* — «من فضلك ادخل المبلغ المراد دفعه بال terminal» | Nama POS: the terminal button was pressed on a row with no amount. | Type the amount on the row first. |
| *Waiting for the terminal to complete the payment of {0}* — «في انتظار إتمام دفع مبلغ {0} على جهاز الدفع» | Nama POS: the amount was sent to the machine and the customer has not finished yet. | Let the customer finish on the machine. **Stop waiting** is available after 30 seconds. |
| *The POS cannot cancel the payment on the terminal. To cancel it, press cancel on the terminal itself. Stop waiting anyway?* | Nama POS: the cashier pressed **Stop waiting**. | Confirm only after cancelling on the machine, or when the customer is still paying and the POS should keep listening in the background. |
| *Stopped waiting for the terminal. Finish or cancel the payment on the terminal and check its screen before taking another payment* — «تم إيقاف انتظار جهاز الدفع. برجاء إتمام الدفع أو إلغاؤه من الجهاز ومراجعة شاشته قبل تحصيل دفعة أخرى» | Nama POS: the cashier confirmed **Stop waiting**. | Cancel on the machine if it is still waiting. A late approval is still added, as described above. |
| *The terminal did not answer within 3 minutes. Check the terminal screen or its last receipt before taking another payment* — «لم يرد جهاز الدفع خلال 3 دقائق. برجاء مراجعة شاشة جهاز الدفع أو آخر إيصال قبل تحصيل دفعة أخرى» | Nama POS: PGW gave no answer within three minutes. | Check the slip and PGW's **Last Transactions** window. If the payment was approved, type it on the card method's row with the approval code. |
| *The terminal is still processing a previous payment of {0}. If the terminal shows nothing, wait {1} seconds for the POS to stop waiting automatically, or restart the PGW app, then try again* — «لا يزال جهاز الدفع يعالج دفعة سابقة بمبلغ {0}. إذا لم يظهر شيء على شاشة الجهاز، برجاء الانتظار {1} ثانية حتى يتوقف البرنامج عن الانتظار تلقائيا، أو إعادة تشغيل برنامج PGW، ثم المحاولة مرة أخرى» | Nama POS: a terminal payment started from another payment screen is still open. | Wait the seconds shown, or restart PGW. |
| *The terminal is still busy with another request. Finish or cancel it on the terminal and try again. If this continues, restart the PGW app* — «جهاز الدفع لا يزال مشغولاً بطلب آخر. برجاء إتمامه أو إلغاؤه من الجهاز ثم المحاولة مرة أخرى. إذا استمرت المشكلة برجاء إعادة تشغيل برنامج PGW» | Nama POS: PGW refused the payment because the machine was still busy with another request. Nothing was charged. | Finish or cancel the other request on the machine, then try again. |
| *The terminal approved a payment of {0} after it was cancelled, and it was added to the payments* — «وافق جهاز الدفع على دفع مبلغ {0} بعد إلغائه، وتمت إضافته إلى المدفوعات» | Nama POS: the customer finished paying on the machine after the cashier stopped waiting. | Nothing; do not take the amount again. |
| *The terminal approved a payment of {0} after it was cancelled. The payments now exceed the invoice by {1}. Remove the other payment, or refund it from the terminal* — «وافق جهاز الدفع على دفع مبلغ {0} بعد إلغائه. إجمالي المدفوعات الآن يزيد عن قيمة الفاتورة بمبلغ {1}. برجاء حذف الدفعة الأخرى أو استرداد المبلغ من جهاز الدفع» | Nama POS: the late approval was added, and the cashier had already taken the amount another way. | Remove the other payment, or refund the card amount from the machine. |
| *The terminal approved a payment of {0} after it was cancelled, and the payment screen was already closed. Please refund it from the terminal* — «وافق جهاز الدفع على دفع مبلغ {0} بعد إلغائه، وكانت شاشة الدفع قد أغلقت بالفعل. برجاء استرداد المبلغ من جهاز الدفع» | Nama POS: the late approval arrived after the payment screen was closed, so the POS could not record it. | Refund the amount from the machine, then take the payment again. |
| *There is no connection on port {0}, please make sure that the PGW server is running. You can download the setup file from {1}* — «لا يوجد اتصال على المنفذ {0}، برجاء التأكد من تشغيل برنامج PGW. يمكنك تحميل ملف التثبيت من {1}» | Nama POS: the POS could not reach PGW on this PC. Nothing was charged. | Check that PGW is running and that **Test Connection** succeeds. |
| *The PGW app is outdated. Please update it from {0}* — «برنامج PGW قديم. برجاء تحديثه من {0}» | Nama POS: the PGW program on this PC is too old to accept the payment's reference. | Install the current PGW from the link in the message. |
| *The PGW app returned an error: {0}. Check the terminal screen or its last receipt before taking another payment* — «أعاد برنامج PGW خطأ: {0}. برجاء مراجعة شاشة جهاز الدفع أو آخر إيصال قبل تحصيل دفعة أخرى» | Nama POS: PGW answered the request with an error. | Check the machine's screen or slip before taking the payment again. |
| *Could not read the terminal response: {0}* — «تعذرت قراءة رد جهاز الدفع: {0}» | Nama POS: PGW answered, but the POS could not process the answer. | Check the machine's slip and PGW's **Last Transactions** window. If the payment was approved and no payment row was filled, type the amount on the card method's row with the approval code from the slip instead of charging the card again. |
