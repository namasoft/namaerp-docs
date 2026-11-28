---
description: "Point of sale questions: when the deferred payment field shows on the payment screen, and building a stock movement report that runs from the POS."
---
# Point of Sale FAQ

## When does the deferred payment field appear on the payment screen?

The **Debit Value** («قيمة الأجل») field shows only when **Hide Default System Debit Method** is not ticked on the POS Settings screen, the invoice has a customer, and the cashier's POS security profile has **Can Pay With Credit Val**. Ticking **Hide Default System Debit Method** removes it for every user, whatever their security profile says. The rule is explained under *Deferred (pay later)* on [Payment & Tender](/modules/pos/pos-payment-and-tender).

## How can I create an inventory movement statement report that works from within POS?

**Question:** Is it possible to create an inventory movement statement report for items that works from within POS, showing incoming, outgoing, and balance over a specific period?

**Answer:**

Yes. Build the report on the main Nama system and check its incoming, outgoing and balance figures over several periods. Then, on its **Report Definition**, tick **Used In POS** so the register lists it, and **Run On Server Database Not On POS Database** so it runs on the server and covers the stock movements of every point, not only this register's. Both options are explained in [Reports & Tools](/modules/pos/pos-reports-and-tools#Reports).
