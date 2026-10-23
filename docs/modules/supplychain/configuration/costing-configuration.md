---
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Costing Configuration

This page documents the **Costing** tab of the Supply Chain configuration. These settings decide how the system values your inventory — how cost is taken out on every issue/sale, how it handles receipts that arrive without a cost, and how often it is allowed to re-run cost calculations.

::: info Where to find it
Open the Supply Chain module **Configuration** file and go to the **Costing** tab. The configuration is cached, so a change takes effect once you save it (the system refreshes the cached values automatically).
:::

## Costing Method

This group holds the core valuation choices.

**Issue Cost Policy** `value.costOutType` — The single most important costing switch. It decides how the cost of every issued, sold, or transferred quantity is calculated and removed from stock: **FIFO** (oldest layers consumed first) or **Average** (moving weighted average). It changes the whole costing path — how returns, overdraft and recalculation behave. Set it once at implementation to match your inventory valuation method; the system blocks changing it once stock transactions exist. Defaults to Average.

**Tax Effect on Cost Type** `value.taxEffectOnCostsType` — Decides *where* the system reads the rule for whether purchase taxes are added to or excluded from item cost. The dropdown holds four choices, and knowing which is which matters because the labels are long:

- **From Configuration** — also what an empty field means. The single *Exclude Purchase Taxes from Cost* switch below is applied to all four taxes.
- **1 and 2 from Item Tax Plan, 3 and 4 from Term Tax Plan** — a split rule: taxes 1 and 2 follow the item's tax plan, taxes 3 and 4 follow the document term's tax plan.
- **From Item Tax Plan then Term Tax Plan for All Taxes** — all four taxes follow the item's tax plan, falling back to the term's plan when the item has none.
- **From Term Tax Plan then Item Tax Plan for All Taxes** — the mirror image: the term's plan is read first, the item's plan only when the term has none.

The last three are what let different items or document types treat taxes differently instead of applying one blanket switch.

**Exclude Purchase Taxes from Cost** `value.excludePurchaseTaxesFromCost` — When on (and the rule source above is the configuration), purchase taxes are *not* added to inventory cost — items are valued at their pre-tax price. Turn it on when purchase taxes are recoverable/deductible and shouldn't inflate inventory value; leave it off when taxes are a real, non-recoverable part of cost.

**Exception for Circular Cost** `value.exceptionForCircularCost` — During cost processing the system can detect a "circular cost" loop (for example transfers whose costs depend on each other). When on, such a case raises a hard error that stops processing so the data can be fixed; when off, it is only written to the cost log and processing continues.

**Calculate Item Average Cost with Voting File** `value.calculateItemAverageCostWithVotingFile` — When on, opening the Price Voting (price-agreement) file also computes each item's current average cost and shows the profit margin against the agreed price. Turn it on when staff setting agreed prices need to see cost/margin alongside the price.

**Show Narration in Stock Receipt, Issue and Transfer Ledgers** `value.showNarrationInStockIssueReceiptTransferLedgers` — When on, the remark/narration from stock issue, receipt and transfer documents is copied onto the lines of the accounting entries they generate. Useful when accountants need the source-document remark on the journal lines for traceability.

**Round Ledger Lines After Merging Cost Lines** `value.roundLedgerLinesAfterMergingCostLines` — Normally each cost line is rounded to the currency's decimal places before it goes into the stock document's accounting entry, and the small rounding remainders add up. When on, the cost lines go in unrounded and each side of the finished entry is rounded once, with the remainder spread over its lines. Turn it on when a stock receipt's entry differs by a few fractions from the foreign-currency purchase invoice it came from, which happens when that currency has more decimal places than the local one.

**Show Affect Only Cost of Assembled Item** `value.showAffectOnlyCostOfItem` — Changes how assembly cost is reported. When on, the calculation isolates and shows only the assembled item's own cost contribution (prorated by quantity). Turn it on for assembly/manufacturing setups that need the assembled item's own cost impact shown separately.

## Quantity & Cost Tracking

These settings control whether the system tracks quantity and cost at all, and how finely.

**Default Configurations** `value.defaultConfigurations` — The default tracking profile applied to items: whether the system keeps a running quantity balance and/or a cost for stock movements. This underpins everything else — an item that isn't quantity-tracked won't have stock balances, and one that isn't cost-tracked won't carry a value.

**Sector / Branch / Department / Analysis Set Configurations** — For each accounting dimension you can independently turn **Track Quantity** and **Track Cost** on or off. This lets you, for example, keep separate quantity balances per branch while costing at a higher level, or stop the system from splitting cost by a dimension you don't care about. Tracking cost or quantity at a finer dimension makes balances more detailed but heavier to process.

| Option | Field ID |
|---|---|
| Sector Configurations | `value.sectorConfigurations` |
| Branch Configurations | `value.branchConfigurations` |
| Department Configurations | `value.departmentConfigurations` |
| Analysis Set Configurations | `value.analysisSetConfigurations` |

::: warning
Changing what is tracked after stock transactions exist can make historical balances inconsistent. Set these at implementation time. The *Allow Changing Cost and Quantity Tracking After Usage* option (on the Item Properties tab) governs whether the system even lets you change tracking once an item has been used.
:::

## Uncosted Receipts

An **uncosted receipt** is a stock receipt that arrives without a known price — typically a sales return, a stock-taking surplus, or a receipt with no source invoice. The system has to derive a cost for it, and this group controls how and when.

**When to Recalculate Cost of Uncosted Receipts, Returns and Stock Taking** `value.uncostedReceiptBehavior` — Controls *when* the system may (re)calculate the cost of these special receipts, based on the document's accounting period status:

- *Recalculate if year has at least one normal open period (or the period itself is open)* — the default and most permissive: recalculate if the document's own period is open, or if any normal period in its fiscal year is still open. A fully closed year keeps the existing cost.
- *Always recalculate* — recalculate regardless of period status; costs can change even in closed periods.
- *Recalculate only if period is open* — the strictest: recalculate only when the document's own period is open.

Choose a stricter value when you have closed periods and don't want late processing to disturb finalized costs.

**Ignore Current Average for Uncosted Receipt** `value.ignoreCurrentAvgForUnCostedReceipt` *(Average costing)* — Normally an uncosted receipt is valued at the item's running average at its position, and the cost sources are consulted only when that average is zero. Turn this on to skip the average entirely: every uncosted receipt is then valued from the cost sources (see *Receipt Cost Sources*), each time its cost is recalculated.

::: warning One mistyped purchase price travels
With this on and **Real In Cost on Date** as the source that answers, each uncosted receipt copies the unit cost of the most recent purchase (or other real receipt) of the same item before it. A purchase invoice entered at the wrong price — or against the wrong item — is therefore copied onto every uncosted receipt of that item until the next purchase, and from there into the average and the cost of everything issued afterwards. Correcting the purchase makes the system recalculate those receipts, apart from the cases listed in [When a Receipt Carries the Wrong Cost](../inventory-costing.md#When-a-Receipt-Carries-the-Wrong-Cost).
:::

**Use Zero for Uncosted FIFO Receipt** `value.useZeroForUnCostedFifoReceipt` *(FIFO costing)* — When on, an uncosted FIFO receipt is costed at **zero** instead of borrowing a cost from earlier receipts. Use it when you deliberately want returns / stock-taking surpluses under FIFO to carry no cost.

**Exclude Returns from "Use Zero for Uncosted FIFO Receipt"** `value.excludeReturnsFromZeroForUnCostedFifoReceipt` — A modifier for the option above: when *Use Zero* is on, this carves out an exception so **sales-return** receipts still recover a real cost through the normal logic, while other uncosted FIFO receipts stay at zero.

**Use FIFO Line Cost if Found (Except Returns)** `value.useFifoLineCostIfFoundExceptReturns` *(default on)* — For a non-return uncosted FIFO receipt, if the line already carries its own non-zero cost, keep it instead of searching previous receipts. Sales returns are excluded. Leave it on so a line that already has a cost is trusted.

**Use FIFO Line Cost Even if Zero** `value.useFifoLineCostEvenIfZero` — A stronger version of the above: accept the receipt line's own cost **even when it is zero**, locking the line at exactly the value it was entered with rather than filling in a borrowed cost.

**Consider Transfers for Return Cost (After Receipts)** `value.considerTransfersForReturnCostAfterReceipts` *(FIFO)* — When searching earlier receipts for a cost, the system normally skips stock-transfer lines. When on, if no normal receipt cost is found it makes a second pass that also pulls cost from the nearest transfer. Enable when transfers are a legitimate cost reference for your returns.

**FIFO Uncosted Receipt Query** `value.fifoUncostedReceiptQuery` — *(Advanced)* A custom database query that returns a unit cost for an uncosted FIFO receipt. When set, it runs first; a positive result is used directly and no further searching happens. For implementation specialists only — requires a correctly written query.

**Do Not Calculate Return Cost from Invoice** `value.doNotCalcReturnCostFromInvoice` *(Average, purchase returns)* — By default a return receipt derives its cost from the original issue lines of the invoice it relates to. When on, that step is skipped and the return is costed using the normal cost sources instead. Enable when the link to the original invoice gives the wrong cost.

**Do not Re-Calculate Sales Return and Stock Taking, Uncosted Receipt Cost From Overdraft** `value.calculateSalesReturnCostFromOverdraft` — A cost-processing switch that does **not** live on this tab: you will find it on the **Stock Taking** tab, among the count settings. When on, the system does not re-derive the cost of sales returns, stock-taking receipts and uncosted receipts when they are used to cover an overdraft. It is explained in full on [Stock Taking Configuration](./stock-taking-configuration.md).

## Cost Reprocessing

When a cost changes, the system re-runs cost calculation for affected documents. Because this can cascade, several caps and thresholds exist to keep it under control.

**Maximum Reprocessing when Overdraft Cost Changes** `value.maximumReprocessByOverdraftChangedCost` *(default 5)* — How many times a single line may be reprocessed because the cost covering an overdraft changed, before the system stops (preventing endless loops). Set to 0 to disable overdraft-driven reprocessing.

**Reprocess by Overdraft Margin** `value.reprocessByOverdraftMargin` *(default 0.05)* — Paired with the cap above: only reprocess if the cost difference is at least this margin, so rounding-level changes are ignored. Raise it to reprocess less, lower it for more precision.

**Reprocess Assembly Margin** `value.reprocessAssemblyMargin` *(default 0.0002)* — A small "is this change effectively zero?" threshold for assembly documents and ledger-effect updates. Changes smaller than the margin are treated as zero and skipped. Generally leave at the default.

**Reprocess Production Order Margin** `value.reprocessProductionOrderMargin` *(default -1)* — Controls when a production order's cost is reprocessed after a related issue/receipt cost changes. The default −1 skips the check (reprocess as normal). Set a small positive value to suppress reprocessing for negligible production-order cost changes.

**Maximum Reprocess by Transfer** `value.maximumReprocessByTransfer` *(default 3)* — A cap for stock-transfer cost cascades: how many times a cost dimension may be reprocessed because of transfers before the system stops. Increase if legitimate multi-step transfer chains need more passes to settle.

**Reprocess by Transfer Margin** `value.reprocessByTransferMargin` *(default 0.0002)* — The "don't bother" threshold for transfer-driven reprocessing; sub-margin differences are ignored.

**Do Not Reprocess Receipts if Count Greater Than** `value.doNotReprocessReceiptsIfCountGreaterThan` — Once a document's recorded processing count exceeds this number, the system stops recalculating its receipt cost and keeps the existing value. Requires processing-count tracking to be enabled. Empty means no limit. Use it when certain documents keep getting reprocessed and you want to freeze their receipt cost after N passes.

::: danger Do Not Reprocess Any Cost if Count Greater Than `value.doNotReprocessAnyCostIfCountGreaterThan`
A hard, document-wide cap: once the processing count is exceeded, the system refuses to process **any** cost for that document and leaves whatever cost it currently has. This can intentionally leave costs incorrect/frozen. It is a last-resort safety valve for documents stuck in runaway reprocessing — keep it disabled in normal operation.
:::

**Consider Overdraft per Cost Dimension not Quantity Dimension** `value.considerOverdraftPerCostDimensionNotQtyDimension` *(on in newly created databases)* — Changes the granularity at which negative stock is evaluated and covered. On, overdraft is judged at the broader cost grouping; off, at the most detailed quantity breakdown. There is no built-in default: newly created databases are seeded with it on, but an older installation may well have it off, so read the screen rather than assuming. A fundamental costing-behavior switch — change it deliberately, ideally before transactions exist.

**Use Current Average for Stock Transfer Self Overdraft Coverage** `value.useCurrentAverageForStockTransferSelfOverdraftCoverage` *(on in newly created databases)* — Handles the case where a transfer covers its own overdraft (the same line is both the out and the later in). When on, that self-coverage portion is valued at the current average cost rather than borrowing from the receipt line. It works together with the option above, and newly created databases arrive with it already on.

**Enable Cost Replay Early Termination** `value.enableCostReplayEarlyTermination` *(Average costing)* — A performance option for reprocessing. When a change forces the system to recalculate an item's cost history, it normally replays every movement from the changed point to the most recent one. With this on, the moment the recalculated running values line up exactly with what is already stored — meaning nothing further would change — it stops replaying the rest of the history. On items with very long movement histories this can turn a full replay into a short one. Newly created databases (from July 2026 onward) have it **on** by default; databases created before that have it **off**, and turning it on for an existing installation is **not recommended** — leave the setting as your installation shipped it.

**Enable Cost Invariants Verification** `value.enableCostInvariantsVerification` *(off by default)* — A self-check that runs after cost processing. It re-examines the cost bookkeeping of the items just processed and writes any inconsistency it finds to the cost log. It never changes data — it only reports — so it is a diagnostic aid, not a correction. Turn it on temporarily when investigating a suspected cost discrepancy; leave it off in normal operation, since the extra checking adds work to every cost run.

## Cost Sources

These tables tell the system where to pull a unit cost from in tricky situations. Each line offers up to five fallback sources tried in order, and the first non-zero result wins. There are nine sources to pick from: **Out Cost on Date**, **In Cost on Date**, **Real In Cost on Date** (purchases, opening balances, assembly and the like), **Absolute Last In Cost**, **Absolute Current Average Cost**, **Standard Cost**, **Line Cost**, **Query** (run the line's own query) and **Zero**. Lines can be scoped by document type, accounting dimensions and item-specific dimensions.

Three of the sources behave in ways worth knowing. **Real In Cost on Date** looks only at the same item and cost dimensions, and takes the most recent real receipt before the line. **Query** adds up the first column of every row the query returns, so a query that can return several rows gives their sum — write it to return one row; a query that returns no row counts as zero and the next source is tried. **Line Cost** keeps the cost the receipt line already carries instead of looking for a new one.

**Receipt Cost Sources** `value.costSources` — Where an uncosted receipt takes its cost from when it is calculated: always, if *Ignore Current Average for Uncosted Receipt* is on; otherwise only when the running average is zero. If no matching line exists, a built-in fallback order is used (out cost on date → in cost on date → absolute last in cost → line cost → standard cost).

**Overdraft Cost Sources** `value.overdraftCostSources` — Same structure, but for valuing overdrawn (negative-stock) quantities. Built-in fallback: last cost → current average → average cost → last cost → standard cost.

**When more than one line matches.** In both tables the system reads the lines from top to bottom and uses the **first** line that matches the receipt. It does not look for the most specific line. A line matches when each document type, accounting dimension and item dimension cell is either empty or equal to the receipt's value, so an empty cell matches anything. Say the table holds a general line for legal entity *A* with no document type, and a second line for *A* with document type **End Stock Taking**. If the general line comes first, it catches the stock-taking receipts too, and the second line is never reached. Put the specific line above the general one. Once a line matches, it is the only line used. If all five of its sources come back zero, the receipt is costed at zero. The system does not try the next matching line or the built-in fallback order, which applies only when no line matches at all.

**Cost Schedule** `value.costSchedule` — A list of time windows (start/stop) that restricts when automatic cost processing may run. If the current time falls inside any window, processing runs; an empty table means it can run any time. Use it to confine heavy recalculation to off-peak hours.

## Specific Dimensions in LC, Receipt Cost and Tender Prices

Whenever a cost has to be spread over received lines — import (Letter of Credit) cost, a **Receipt Additional Cost** document, or ordinary receipt cost distribution — the system first has to decide which lines count as "the same thing". These switches build that grouping key. Including a property means the cost is tracked and distributed separately per value of that property; excluding it merges those lines together. The very same key decides how tender lines are matched to a sales-price request, so a change here moves the tender-pricing side as well as the cost side.

**Use Lot / Box / Color / Measure / Size / Revision / Active Percentage / Inactive Percentage / Sub-Item in LC Cost** — Each adds (or removes) the corresponding property from the LC cost-grouping key. Color, Measure, Size and Revision default to on; the rest default to off.

| Option | Field ID |
|---|---|
| Use Lot | `value.useLotInLcCost` |
| Use Box | `value.useBoxInLcCost` |
| Use Color | `value.useColorInLcCost` |
| Use Measure | `value.useMeasureInLcCost` |
| Use Size | `value.useSizeInLcCost` |
| Use Revision | `value.useRevisionInLcCost` |
| Use Active Percentage | `value.useActivePercentInLcCost` |
| Use Inactive Percentage | `value.useInActivePercentInLcCost` |
| Use Sub-Item | `value.useSubItemLcCost` |

**Use Net not Price in LC** `value.useNetNotPriceInLC` — Chooses the value basis for distributing import cost: the line's gross price (off) or its net value after line discount (on).
