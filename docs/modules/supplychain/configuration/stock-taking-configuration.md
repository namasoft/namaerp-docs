---
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Stock Taking Configuration

This page documents the **Stock Taking** tab — settings that govern how physical counts (stock taking) are entered, validated, ended, and turned into adjustment documents. For the count process itself, see the [Stock Taking guide](../stock-taking.md).

![The Stock Taking Configuration tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-stock-taking-en.png)

**Make Ended Stock Taking Documents Editable** `value.makeEndedSTakingDocsEditable` — Normally an End Stock Taking that has ended is locked against editing or deletion. When on, ended documents can still be edited/deleted. Generally left off to protect reconciled counts.

**Do not Re-Calculate Sales Return and Stock Taking, Uncosted Receipt Cost From Overdraft** `value.calculateSalesReturnCostFromOverdraft` — When on, the cost of sales returns, stock-taking receipts and uncosted receipts is not re-derived from overdraft coverage during cost processing; whatever cost they already carry is left alone. It is a cost-processing option that lives on this tab rather than the [Costing tab](./costing-configuration.md), so this is where to look for it. Enable it when overdraft-driven recalculation keeps changing costs you want left as they were entered.

**Delete Stock Taking Receipts** `value.deleteStockTakingReceipts` — Controls what happens to the adjustment documents a count previously generated when the End Stock Taking is re-saved: when on, the old generated documents are deleted and rebuilt; when off, they are preserved.

**Consider Dimensions in End Stock Taking Quantities** `value.considerDimensionsInEndStockTaking` — When on, the expected-vs-actual comparison at the end of the count is broken down by item dimensions (color, size, locator…), so the count reconciles per dimension rather than per item total.

**Do Not Check Quantities with Documents Created from Stock Taking** `value.doNotCheckQuantitiesWithStockTaking` *(on in newly created databases)* — When on, the quantity/overdraft validation that normally runs when creating the count's adjustment receipts and issues is skipped, so they are created even if they would otherwise fail availability checks.

**Allow Stock Taking After Issue or Receipt Date** `value.allowStockTakingAfterIssueOrReceiptDate` — Normally you cannot start a count on a warehouse/locator that already has a movement after the count's start date. When on, that restriction is lifted and the count can start anyway.

**Allow More Than One Stock Taking for the Same Warehouse on the Same Day** `value.allowMultipleStockTakingSameDayForSameWarehouse` — Normally a Start or End Stock Taking is rejected when another count already exists for the same warehouse on the same day, to stop a single day's stock from being counted twice. When on, that same-day duplicate check is skipped, so you can record more than one count for the same warehouse on the same day.

**Prevent Saving Before Taking** `value.preventSavingBeforeTaking` *(default on)* — Once a count has been ended for a warehouse (or locator), stock receipts and issues in it can no longer be saved or edited with a date before the count's date. This includes the receipts and issues that invoices and transfers create. The date checked is the start date of the latest ended count. The refusal reads *Can not Update This Document because there is an ended stock taking on {0} for the warehouse {1}*. The adjustment documents the End Stock Taking creates are exempt. Keep it on, so back-dated movements cannot change a finished count.

**Prevent Saving on Taking Date** `value.preventSavingOnTakingDate` — Works only together with the option above. It also blocks documents dated on the count date itself. When it is off, a document dated on the count day saves normally. If a document dated on the count day gets the refusal above, this setting is the cause, and the message links to it. The End Stock Taking field **Include Quantity Transaction on Same Day** plays no part here: it only decides whether that day's movements are counted in the expected quantity.

**Show Delivered and Canceled Quantities in Stock Receipt** `value.showReceivedAndCanceledQty` — Adds delivered (received) and canceled quantity columns to the Stock Receipt document layout. *(A display option — despite its place on this tab it affects the Stock Receipt screen.)*

**Allow Negative Quantities in Stock Taking Details** `value.allowNegativeQtiesTaking` — When off, negative counted quantities entered on stock-taking details are rejected. When on, negative actual quantities are permitted — for special cases only.

**Maximum Lines Per Stock Taking Warehouse Document** `value.maxStockTakingLines` — Caps the number of lines in the documents produced from a count, so very large counts are split across multiple documents.

**Show Stock Taking Lines in List View Instead of Grid** `value.useStockTakingListViewInsteadOfGrid` — Shows the End Stock Taking lines in a lighter list view instead of the full editable grid, which performs better for very large counts.

**Schedule Stock Taking Actions** `value.scheduleStockTakingActions` — When on, the heavy end-of-count actions (status changes, generating adjustments) are queued as background tasks that run within the windows defined below, instead of running inline and tying up the server. Use it for large counts so the end actions don't slow the system for everyone.

**Use Manual Creation Time in Stock Taking** `value.useManualCreationTimeInStockTaking` — When on, the End Stock Taking uses a manually entered creation date/time instead of the moment of processing, which affects where the resulting adjustments fall in time.

**Do Not Make Negative Actual Quantity Zero in Taking** `value.doNotMakeNegativeActualQtyZeroInTaking` — By default a negative counted quantity is floored to zero when ending the count. When on, the negative actual quantity is kept as-is so it flows through to reconciliation.

**Ignore the Difference Between the Number of Database Serials and the Actual Stock Quantity** `value.ignoreDifferenceBetweenNumberOfDBSerialsAndActualStockQuantity` — For serial-tracked items, the count normally checks that the number of recorded serials matches the actual quantity and separates mismatches onto their own lines. When on, this validation is skipped.

**Stock Taking Actions Processing Times** `value.stockTakingActionsTime` *(table)* — Time windows (start/stop) during which the scheduled stock-taking actions are allowed to run. Used with *Schedule Stock Taking Actions* to confine the heavy processing to off-peak hours.
