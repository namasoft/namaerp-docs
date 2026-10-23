---
description: "Stock taking: the Start and End Stock Taking documents, entering counts in Stock Taking Details or electronically, the surplus and shortage documents it generates, and handling natural loss."
entities: [StartStockTaking, EndStockTaking, StockTakingDetails, StockTakingElectronic]
---
# Stock Taking

No matter how accurate your system is, one fundamental question remains: does what's in the books actually match what's on the shelves? **Stock taking** is the process by which you verify that and reconcile the differences. It's the heartbeat of confidence in your inventory numbers.

## Why Count?

Even with immediate recording of every movement, discrepancies creep in:
- Shortages, loss, or theft
- Unrecorded damage
- Transactions entered with wrong quantities or locations
- Natural loss (evaporation, drying, weight loss)
- Human error in counting or handling

Stock taking surfaces these differences and re-aligns the book balance with reality, so your decisions (purchasing, selling, pricing) stay based on correct numbers.

![Start stock taking list in NaMa ERP](../../ar/modules/supplychain/images/stock-taking/start-stock-taking-list-en.png)

## The Counting Cycle: Start and End

Stock taking in NaMa ERP is built on two paired documents that define the counting window:

### Start Stock Taking (StartStockTaking)

The **Start Stock Taking** document captures a snapshot of the inventory balance at the moment counting begins. From that point:
- The expected balance for the included items is frozen as a reference for comparison
- The scope of the count is defined (warehouse, locator, item group, branch)
- You choose whether it's a comprehensive opening count or a partial cycle count

### End Stock Taking (EndStockTaking)

The **End Stock Taking** document closes the window and processes the results: it compares the physically-counted quantities to the expected balance, then **automatically generates** the necessary adjustment documents - receipts for surplus items and issues for short items - so the books return to matching reality. You can configure the calculation method and whether the count-day's transactions are included in the reconciliation.

::: tip The Counting Window
Between starting and ending the count there's a window during which counting happens. The shorter this window, the less stock moves during the count and the more accurate the reconciliation. For large warehouses, frequent cycle counts over smaller scopes are more accurate than one giant annual count.
:::

![End stock taking screen in NaMa ERP](../../ar/modules/supplychain/images/stock-taking/end-stock-taking-en.png)

## Entering Count Results

### Stock Taking Details (StockTakingDetails)

The **Stock Taking Details** document carries the physically-counted quantities line by line, so expected is compared to actual and the difference is highlighted per item/location. This is where field count results are entered.

### Electronic Stock Taking (StockTakingElectronic)

When counting is done with barcode scanners, **Electronic Stock Taking** captures the readings electronically and feeds them straight into the counting process. This reduces manual-entry errors and speeds up counting in large, item-dense warehouses.

## Handling Natural Loss and Shrinkage

::: warning This Is Where Weight Losses Are Handled
Natural loss - such as meat losing weight, some materials drying, or evaporation - isn't recorded with a manual damage document; it appears as a difference during counting and is settled through stock taking. This is the system's correct way to handle weight loss and natural shrinkage, returning the book balance to match the actual weight with a proper accounting entry for the loss.
:::

Specific incidental damage (a particular event), on the other hand, is recorded through a [stock issue](./issuing-stock.md) directed to a loss account, not through stock taking.

## Actions on these screens

**On the Start Stock Taking:** **Create End Stock Taking** — the start document must be saved; it creates the matching end document already pointing back at this start, so the pair is never mismatched.

**On the Stock Taking Details:**

- **Collect Stock Items** — fills the count lines from the item-collection criteria you entered. It refuses if those criteria lines are empty.
- **Collect Items** and **Collect Items In Period** — fill the lines from what the warehouse and locator actually hold. The second one asks three things first: the date to collect on, whether to include negative quantities, and whether to limit the result to items already in the details.
- **Create StockTaking Details Lines** — builds the count lines from the electronic-count lines on the document. It refuses when there are none, and tells you to enter the electronic stock-taking documents first.

**On the Stock Taking Electronic:** **Convert To StockTaking Details** — creates a Stock Taking Details document from the electronic count and opens it.

**On the End Stock Taking:** **Preview Stock Items On Date** — the document must be saved; it shows what the system believes the stock was on the value date, so you can compare before committing. It needs a **start stock taking** to be chosen, and it only works when the quantity calculation method is the one that works on the value date; otherwise it says so and does nothing.

## Best Practices for Stock Taking

::: tip Practical Tips
**Freeze movement during counting**: Reduce or stop movements in the warehouse being counted during the count period to avoid the balance changing between start and end.

**Adopt cycle counting**: Don't wait for a single annual count. Regular cycle counts over small scopes catch problems early and keep accuracy high year-round.

**Document the reason for the difference**: When settling a difference, record what the investigation revealed (a location always short? a particular shift with recording issues?) - patterns matter more than individual numbers.

**Reconcile accounting after the count**: After ending the count, verify that the inventory value in the books matches the total adjustments.
:::

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *There is already a start stock taking document on the same day {0} for warehouse {1} and locator {2}* — «يوجد بالفعل سند بدء جرد مخزني بتاريخ {0} للمخزن {1} والموقع {2}» | Another saved **Start Stock Taking** already opens a count for the same warehouse — and the same locator, when one is named — on that date. | Use the count that is already open, or have **Allow Multiple Stock Taking Same Day For Same Warehouse** switched on in supply chain configuration if you genuinely count a warehouse twice in a day. |
| *There is already an end stock taking document on the same day {0} for warehouse {1} and locator {2}* — «يوجد بالفعل سند إنهاء جرد مخزني بتاريخ {0} للمخزن {1} والموقع {2}» | The same guard on the closing side: an **End Stock Taking** for that warehouse and locator already exists on the date. | Close the count with the existing document, or allow multiple counts per day in configuration. |
| *Serial {0} should be in warehouse {1}, we found it in warehouse {2}* — «رقم المسلسل {0} يجب ان يكون في المخزن {1}, ولكنه موجود في المخزن {2}» | A counted serial number is recorded in the system as sitting in a different warehouse from the one on the count line. The message names both warehouses. | Either the serial was physically moved without a document — record the transfer — or it was counted in the wrong warehouse. Correct whichever is wrong before ending the count. |
| *Cannot modify Stock Taking after being ended* — «لا يمكن تعديل الجرد المخزني إذا كان منتهيا» | The **Stock Taking Details** document is being edited after the count was ended and settled, and **Make Ended Stock Taking Docs Editable** is off in supply chain configuration. | Leave the ended count alone and correct the stock with a separate document, or have that option switched on if the count itself must be reopened. |
| *The document {0} is already linked to the document {1}* — «المستند {0} مرتبط بالفعل بالمستند {1}» | An electronic count sheet listed on the details document is already attached to another details document. | Remove that line, or detach the sheet from the document the message names. |
| *You can not leave taking electronic, pos taking and initial taking empty* — «لا يمكنك ترك لجنة الجرد الإلكتروني، لجنة جرد نقط بيع ولجنة جرد مبدئي فارغين» | A line on the electronic grid of the details document names none of the three sources a count can come from — electronic taking, POS taking or initial taking. | Fill one of the three on that line, or delete the line. |

## Next Steps

- [Inventory Costing & Revaluation](./inventory-costing.md) - adjusting inventory values after reconciliation
- [Issuing Stock](./issuing-stock.md) - recording incidental damage via an issue
- [Warehouses & Locators](./warehouses-and-locators.md) - organizing inventory to ease counting
