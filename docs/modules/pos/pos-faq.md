---
description: "Point of sale questions: the deferred payment method still showing after it is hidden, the repeated payment method error when closing a shift, and building a stock movement report that runs from the POS."
---
# Point of Sale FAQ

## Why does the deferred payment method appear on the payment screen even after enabling the option to hide it from settings?

When the option **"Hide the system's default deferred payment method"** is enabled in the POS settings, the deferred payment method is expected to be hidden from the payment screen.

- Problem:

Despite enabling this option, the deferred payment method continues to appear on the payment screen.

- Reason:

This behavior occurs if the permission "Allow deferred payment" is enabled for the user in the POS permissions settings.

- Solution:

Disable the following permission in the POS permissions settings for the user:

* **Permission name:** Allow deferred payment

This ensures that the setting to hide deferred payment is respected, and the method will no longer appear on the payment screen.

## Q: When closing a shift, the error "Payment method Mada repeated in multi line" appeared. What causes it and how can it be resolved?

**A:**
The reason this error appears is that the payment method (e.g., "Mada") had its properties modified after it was used in actual transactions — specifically, the `'cash method'` property in the payment method definition was changed.
As a result, the same payment method appeared on more than one line when closing the shift: once as a cash method and once as a non-cash method (such as bank or deferred), which caused a duplication that is not allowed.

**Solution:**
To resolve this issue, use the following utility inside the POS system:

```
com.namasoft.pos.util.plugnplay.POSPaymentMethodToggledCashProperty
```

Pass it the **code of the payment method** where the change occurred.

::: tip

* For more details on running utilities inside POS, refer to the relevant section in [the POS Technical Points Usage Guide](./nama-pos.md)
* The original error message text: `Payment method {0} repeated in multi line`
:::

## How can I create an inventory movement statement report that works from within POS?

**Question:** Is it possible to create an inventory movement statement report for items that works from within POS, showing incoming, outgoing, and balance over a specific period?

**Answer:**

Yes, such a report can be created by following these steps:

### Creation Steps:

1. **Create the report on the main system:**
   - Create the report first on the main Nama system
   - Verify that the report works correctly and displays the required data (incoming, outgoing, balance)

2. **Test the report:**
   - Verify the accuracy of the displayed data
   - Test the report across different time periods to confirm result accuracy

3. **Enable the report in POS:**
   - Go to **Report Definition** in the main system
   - Enable the following options:

   **a. Used in POS (`usedInPOS`):**
   - Enable this option to make the report available in the POS interface

   **b. Run on POS server database (`runOnPosServerDB`):**
   - Enable this option to ensure the report runs on the server database
   - This guarantees up-to-date and comprehensive data from all points

::: tip Important Notes
- Make sure to thoroughly test the report on the main system before enabling it in POS
- Using the server database ensures data accuracy across all POS terminals
- The report can be accessed from within POS after enabling the mentioned options
:::
