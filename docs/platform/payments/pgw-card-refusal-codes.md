# PGW: Card Refusal Codes

When a card payment through PGW fails, the cashier needs to know one thing quickly: is this a card the customer can try again, or a card that will never go through? The card machine answers every declined payment with a response code. This page lists the codes and their meanings, so a cashier or support agent can turn a number on the screen or on the slip into a decision.

How the payment travels and where it can fail is described in [How a Card Payment Travels Through PGW](/platform/payments/pgw-card-payment-flow).

## Where to find the code

- **Geidea machines.** Nama shows the code and its meaning in the refusal message itself, for example *Purchase Transaction refused - 116 - Not Enough Balance*.
- **Neoleap machines.** Nama's refusal message carries the meaning from the [Neoleap codes](#Neoleap-codes) table, for example *PIN timeout.*, but not the code itself. To see the code, open PGW's **Last Transactions** window. The machine's answer (the line that starts with *Here is the body of neoleap response*) contains the code in `TerminalStatusCode` and a short result in English, such as `DECLINED`.
- **InterPay.** softPOS returns the reason as text. It is in the `message` field of the answer in PGW's **Last Transactions** window.
- **Code `BUSY`, any machine.** PGW lets only one request at a time reach the machine. A payment or a recovery sent while another request is still running is refused by PGW itself, without reaching the machine, so nothing is charged for it. The reason names the running request and when it started, for example *Purchase Transaction refused - BUSY - The terminal is still busy with a payment of 1150 since 14:05:12. Finish or cancel it on the terminal and try again. If this continues, restart the PGW app*.

## Geidea codes

These are the three-digit codes Nama recognises. Every code that starts with `9` means *Declined, System Error*.

| Code | Meaning shown | What to do |
|---|---|---|
| 100, 102, 103, 105, 107, 108, 109, 110, 112, 114, 120, 122, 126, 128, 182, 183, 184, 185, 188, 190, 200, 202, 203, 205, 207 | *Declined* | The bank declined the card without giving a reason. Ask for another card or another way to pay. |
| 111, 118, 125, 129, 208, 209, 210 | *Declined, Contact your bank* | The customer has to settle it with their bank. Ask for another card. |
| 101, 201 | *Expired Card, Contact your bank* | Ask for another card. |
| 104 | *Restricted card, transaction not allowed* | Ask for another card. |
| 115, 204 | *Transaction not allowed* | The card cannot be used for this kind of purchase. Ask for another card. |
| 119 | *Transaction not permitted to cardholder* | Ask for another card. |
| 116 | *Not Enough Balance* | Ask for another card, or split the payment and take part of it in another way. |
| 121 | *Exceeds withdrawal amount limit* | The amount is over the card's limit. Split the payment or ask for another card. |
| 123 | *Declined, limits exceeded* | Same as 121. |
| 117 | *INVALID PIN* | Let the customer try again with the right PIN. |
| 127 | *Wrong PIN* | Same as 117. |
| 106, 206 | *PIN Tries Exceeded* | The card is locked for PIN entry. Ask for another card. |
| 480, 481 | *Un successful* | Try the payment once more. If it fails again, take another way to pay. |
| 501 | *RECONCILIATION UNSUCCESSFUL* | The machine's own settlement with the acquirer failed. Contact Geidea support about the machine. |
| 888 | *Error* | Try once more. If it repeats, press **Test Connection** in PGW. |
| Any code starting with 9 | *Declined, System Error* | A problem at the bank or the card network. Try again after a short while, or take another way to pay. |

## Neoleap codes

These are the two-digit `TerminalStatusCode` values. `00` means the payment was approved.

| Code | Meaning | What to do |
|---|---|---|
| 01 | Completed – transaction declined for different reasons (including invalid PIN), account not debited. | Ask the customer to try again, or ask for another card. |
| 02 | Completed – transaction rejected, account not debited. | Ask for another card. |
| 11 | Cancelled by user, account not debited. | The customer or the cashier cancelled on the machine. Take the payment again if needed. |
| 12 | Void due to communication failure or some other reason, account not debited. | Check the machine's connection, then try again. |
| 13 | Card Not Supported | Ask for another card. |
| 14 | Transaction Not allowed | Ask for another card. |
| 15 | Expired Card | Ask for another card. |
| 16 | No Dial Tone (Phone line disconnected) | The machine has lost its own line to the bank. Check its network or SIM. |
| 17 | Card is not accepted. | Ask for another card. |
| 86 | Incorrect Refund Card | Ask for another card. |
| 87 | PIN locked. | Ask for another card. |
| 88 | PIN timeout. | The customer took too long to enter the PIN. Try again. |
| 89 | Service is not accepted. | Ask for another card. |
| 90 | Card removed after PIN entry. | Try again and leave the card in until the machine says so. |
| 91 | Card removed Before PIN entry | Same as 90. |
| 92 | Card removed after sending request (ARQC check failed). | Same as 90. |
| 93 | Card Timeout. | Try again. |
| 94 | Invalid PIN. | Let the customer try again with the right PIN. |
| 95 | Invalid Amount. | Check the amount on the invoice, then try again. |
| 96 | Invalid Card (Blocked Card) | Ask for another card. |
| 97 | EMV Application is Blocked | Ask for another card. |
| 98 | Transaction declined by Card | Ask for another card. |
| 99 | EMV Card not Detected by POS (Card not inserted into POS) | Insert or tap the card properly, then try again. |

A declined payment does not fill in the payment line, so there is nothing to undo in Nama.
