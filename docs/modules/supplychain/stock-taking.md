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

The **Start Stock Taking** document opens the count and defines its scope. It stores no balances: the book quantity is calculated later by the End Stock Taking.
- Each line names a **warehouse** (required) and, optionally, a **locator**. A warehouse that appears on two lines needs a different locator on each.
- **Start Date** takes the value date when you leave it empty.
- The **Opening** box marks an opening count.
- The document term supplies the stock issue and stock receipt books and terms used for the adjustment documents, the **Missing Items Strategy** and the **System Stock Calculation**. Save is refused while any of the four books and terms or the strategy is empty in the term (see [Start Stock Taking term options](/modules/supplychain/document-terms/doc-term-document-specific#Start-Stock-Taking)).
- Unless **Allow Stock Taking After Issue Or Receipt Date** is switched on in [stock taking configuration](/modules/supplychain/configuration/stock-taking-configuration), save is refused when a saved stock issue or stock receipt on that warehouse (or locator) has a value date on or after the start date.

### End Stock Taking (EndStockTaking)

The **End Stock Taking** document closes the window and processes the results: it compares the physically-counted quantities to the book quantity, then **automatically generates** the adjustment documents - one stock receipt per warehouse for surplus items and one stock issue per warehouse for short items - so the books return to matching reality. Each Start Stock Taking can be closed by one End Stock Taking only.

- **System Stock Calculation** (copied from the start document) decides when the book quantity is taken: **On Save** or **On Value Date**. With **On Value Date**, the **End Date** must equal the value date.
- **Include Quantity Transaction on Same Day (Except transaction from this End Stock Taking)** decides whether the end day's own movements count in the book quantity.
- **Status** drives the effect. The adjustment documents are generated only when the status is **Ended & Active**; with **Ended**, the lines are calculated but no receipt or issue is created. Saving the end document also sets the same status on its Start Stock Taking and on every Stock Taking Details document of that start.

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

**On the Start Stock Taking:** **Create End Stock Taking** — the start document must be saved; it opens a new end document already pointing back at this start, so the pair is never mismatched. The new document takes status **Ended**, the start date as its end date and value date, and the start's System Stock Calculation, and its lines are filled with the book quantities.

**On the Stock Taking Details:**

- **Collect Stock Items** — fills the count lines from the item-collection criteria you entered. It refuses if those criteria lines are empty.
- **Collect Items** and **Collect Items In Period** — fill the lines from the book quantities the warehouse and locator hold. Both need a start stock taking chosen first, and both ask **Include Overdraft (Negative) Quantities** and **Include Only Items In Details**. **Collect Items In Period** also asks **Collect On Date (Except Stock Transactions On The Same Day)**.
- **Create Stock Taking Details Lines** — builds the count lines from the electronic-count lines on the document. It refuses when there are none, and tells you to enter the electronic stock-taking documents first.

**On the Electronic Stock Taking:** **Convert To Stock Taking Details** — creates a Stock Taking Details document from the electronic count and opens it.

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
| *There is already a start stock taking document on the same day {0} for warehouse {1} and locator {2}* — «يوجد بالفعل سند بدء جرد مخزني بتاريخ {0} للمخزن {1} والموقع {2}» | Another saved **Start Stock Taking** already opens a count for the same warehouse — and the same locator, when one is named — on that date. | Use the count that is already open, or have **Allow more than one stock taking for the same warehouse on the same day** switched on in [stock taking configuration](/modules/supplychain/configuration/stock-taking-configuration) if you genuinely count a warehouse twice in a day. |
| *Can not start stock taking on this warehouse because there is already stock issue overlapped with start date* — «لا يمكن بدء الجرد على هذا المخزن لوجود صرف مخزني يتزامن مع تاريخ بدء الجرد» (the receipt version: *Can not start stock taking on this warehouse because there is already stock receipt overlapped with start date* — «لا يمكن بدء الجرد على هذا المخزن لوجود توريد مخزني يتزامن مع تاريخ بدء الجرد») | A saved stock issue or stock receipt on that warehouse has a value date on or after the start date. A line with a locator gets the same refusal worded *on this locator*, which has no Arabic text and shows in English. | Start the count on a date after the last movement, or have **Allow Stock Taking After Issue Or Receipt Date** switched on in [stock taking configuration](/modules/supplychain/configuration/stock-taking-configuration). |
| *This Start Doc {0} is already used Previously* | Another saved End Stock Taking already closes this Start Stock Taking. This message has no Arabic text and shows in English on Arabic screens. | Open the existing end document instead of creating a second one. |
| *There is already an end stock taking document on the same day {0} for warehouse {1} and locator {2}* — «يوجد بالفعل سند إنهاء جرد مخزني بتاريخ {0} للمخزن {1} والموقع {2}» | The same guard on the closing side: an **End Stock Taking** for that warehouse and locator already exists on the date. | Close the count with the existing document, or allow multiple counts per day in configuration. |
| *Serial {0} should be in warehouse {1}, we found it in warehouse {2}* — «رقم المسلسل {0} يجب أن يكون في المخزن {1}, ولكنه موجود في المخزن {2}» | A counted serial number is recorded in the system as sitting in a different warehouse from the one on the count line. The message names both warehouses. | Either the serial was physically moved without a document — record the transfer — or it was counted in the wrong warehouse. Correct whichever is wrong before ending the count. |
| *Cannot modify Stock Taking after being ended* — «لا يمكن تعديل الجرد المخزني إذا كان منتهيا» | The **Stock Taking Details** document is being edited while its count has status **Ended & Active**, and **Make Ended Stock Taking Documents Editable** is off in stock taking configuration. | Leave the ended count alone and correct the stock with a separate document, or have that option switched on if the count itself must be reopened. |
| *The document {0} is already linked to the document {1}* — «المستند {0} مرتبط بالفعل بالمستند {1}» | An electronic count sheet listed on the details document is already attached to another details document. | Remove that line, or detach the sheet from the document the message names. |
| *You can not leave taking electronic, pos taking and initial taking empty* — «لا يمكنك ترك لجنة الجرد الإلكتروني، لجنة جرد نقط بيع ولجنة جرد مبدئي فارغين» | A line on the electronic grid of the details document names none of the three sources a count can come from — electronic taking, POS taking or initial taking. | Fill one of the three on that line, or delete the line. |

## Next Steps

- [Inventory Costing & Revaluation](./inventory-costing.md) - adjusting inventory values after reconciliation
- [Issuing Stock](./issuing-stock.md) - recording incidental damage via an issue
- [Warehouses & Locators](./warehouses-and-locators.md) - organizing inventory to ease counting
