---
description: "The Routing screen: the operations a product goes through, the resources each step consumes and refreshing them from the standard operations, the Conversions tab, and how a routing gets used."
entities: [Routing]
menu: Manufacturing → Master Files → Routing
---
# Routings: The Steps a Product Goes Through

## What a Routing Adds to a BOM

A [bill of materials](/modules/manufacturing/manufacturing-bom) tells you what a product is made of. It says nothing about how it gets made — and for anything more involved than putting parts in a box, that second half matters just as much. The insulated copper pipe pair needs its pipes cut and flared, then insulated and taped. Two steps, in that order, on a particular line, taking a particular amount of time. That sequence is the **routing** (عملية تشغيل).

Where the BOM is a recipe's ingredient list, the routing is its method: *preheat the oven, cream the butter and sugar, fold in the flour, bake for 40 minutes*. And as in cooking, the order is not decorative. You cannot tape insulation onto a pipe you haven't cut yet, and the system needs to know that so it can tell you where an order actually is.

You'll find routings under **Manufacturing → Master Files → Routing** (التصنيع ← الملفات ← عملية تشغيل).

![The routing screen, with its operation sequence and resource grids](../../ar/modules/manufacturing/images/routing/routing-header-en.png)

::: info Required license
Routings are part of the core `manufacturing` license. If the **Manufacturing** menu is missing altogether, that license is not enabled.
:::

## The Header

**Code**, **Name1 / Name2** and **Item** work exactly as they do on a BOM — and pairing the codes (`BOM-CMP0001` with `RT-CMP0001`) is a small discipline that makes both files far easier to live with.

**Qty | UOM** is the routing's reference quantity. Each operation's produced quantity is measured against it (that ratio is the operation's **Rate**, below), and a resource row added by hand starts with it as its **Final Quantity**. Picking the **Item** fills the unit with the item's base unit.

**Unlimited Overcompletion For Operation 1** rewards a careful read. Manufacturing rarely produces exactly what was moved — a run of 100 might yield 103 because the machine was already set up and the operator kept going. An execution line records that in its **To Qty** (shown when **Use To Quantity In Execution** is on in the manufacturing configuration), and a **To Qty** above the quantity moved out of operation 1, the order's starting point, is refused unless this field is ticked. **Permitted Percentage For Operation 1** sits beside it. Both are copied into the production orders built from the routing.

Later operations carry their own tolerance on their rows in the details grid: **Permitted Percentage** lets an execution moving units out of that operation report a **To Qty** up to that percentage above the quantity moved, and **Unlimited Overcompletion** removes the ceiling for that operation.

**Allow Negative Quantity For Operation 1** answers a different question: not how much one execution may report, but whether operation 1 may give away more than the order quantity across several executions. Tick it for a first step that runs the order again and again past the planned figure; its balance then stops at zero instead of refusing the execution. The same flag on a row of the details grid, **Allow Negative Quantity**, does this for that step. Both are copied into production orders built from the routing and need **Use Production Movement System Entry** in the manufacturing configuration — see [Production Execution](/modules/manufacturing/production-execution#Scenario-5-One-Step-Keeps-Producing-Past-the-Order).

**Quality Assurance List** is the assurance checklist the operation rows start with (see the details grid below). **Group**, **Item Classifier**, **Revision ID**, **Size**, **Lot ID**, **Color**, **Box** and the **Active / Inactive Percentage** pair are optional refinements, as on the BOM.

## The Details Grid: The Operations

Each row is one step, and the rows run in the order the product travels.

**Operation Seq.** is the step number, and the convention of counting in tens — 10, 20, 30 — is worth adopting. It costs nothing and it means that when someone eventually needs to slip a deburring step between cutting and taping, it becomes 15 rather than a renumbering of the whole routing and every BOM line that pointed at it.

**Operation** references a [standard operation](/modules/manufacturing/manufacturing-work-centers) — a reusable definition of a step, with its own resources and rates already set up. **Operation Name** is the label that appears against it. Pulling steps from standard operations rather than describing them afresh on every routing is what stops a hundred routings from each carrying their own slightly different idea of what "cutting" costs.

**Work Center** is where the step happens — the line, cell or shop floor area. Both rows in the screenshot run at the AC Kit Assembly Line.

**Operation Duration** is how long the step takes for one unit. A production execution uses it to fill a line's **To Date** and **To-Time** from its start and its quantity; when the order's operation has no duration, the BOM's **Default Operation Duration** is used.

**Produced Quantity** (**UOM**, **Value**, **Rate**) is the step's output. **Rate** is not typed: it is worked out as the produced quantity divided by the header **Qty | UOM** (converted to the same unit), so a step that turns out as much as the header quantity has a rate of 1. Rates come into their own when an operation changes the counting: a step that cuts one sheet into four blanks has an output rate that is not 1, and getting it right is what keeps quantities honest down the rest of the line.

**Auto Charge**, ticked on both rows here, means the step does not need an execution of its own. When an execution moves units past it to a later operation, the step counts as done on the way: its auto-charged resources go into the [resource voucher](/modules/manufacturing/manufacturing-resource-voucher) the execution generates, and its check lists are included. A step cannot be both auto charge and **Allow Over (Turn On Parallel)**. For a routine, predictable step this is what you want. Untick it for steps where the real time varies enough that an automatic charge would be fiction.

**Control Check List** and **Quality Assurance List** attach per-operation checks — the gate that has to be passed before units move on. A new row takes its Control Check List from the item's **QC Check list** and its Quality Assurance List from the header's. Picking the header **Item** fills the empty Control Check Lists, and filling the header's Quality Assurance List fills the empty assurance lists.

## The Resources Grid: What the Steps Consume

Operations take time on machines and from people, and neither is free. The **Resources** grid attributes that consumption step by step.

**Operation Seq.** and **Operation Name** tie each resource line back to a step in the grid above, so one operation can draw on several resources — a machine *and* the crew that runs it.

**Resource** is the machine, crew or work centre being consumed. **Resources Count** is how many of them.

**Resource Rate** (**Value** + **Unit**) is the time the resource works — 0.25 hour, say. The money is not here: a resource voucher prices the time at the resource's own rate for the row's **Activity**. **Cost Basis** decides how the time is applied: **Item** means the time is for the row's **Final Quantity** of product, so it scales with the quantity produced; **Lot** means it is charged per lot regardless of size. That distinction is exactly the difference between a cost that scales with volume and a setup cost that does not, and it is where a lot of costing accuracy is won or lost. **Max Lot Quantity** is the most one lot covers. How a voucher turns these into money is on [Resource Vouchers](/modules/manufacturing/manufacturing-resource-voucher#The-Details-Grid).

**Auto Charge** on a resource row decides which voucher charges it: ticked, the resource voucher an execution generates; unticked, a resource voucher entered by hand. Picking a standard operation sets it from the operation's own Auto Charge.

### Refreshing resources from the standard operations

Resource lines are copied from the standard operation when an operation is first picked, so a routing does not follow later changes to that standard operation's rates. To bring routings back in line, select them in the routing list and use **More → Insert Resources From Standard Operations To Routing** (إضافة الموارد من العمليات القياسية إلى عمليات التشغيل). For every operation line that names a standard operation, the routing's resource lines for that operation sequence are replaced by the standard operation's current resources — resource, rate, count, cost basis, lot settings, activity and remarks, with Auto Charge taken from the standard operation and **Final Quantity** left empty — and the routing is saved. Resource lines typed by hand for those sequences are overwritten, so check before running it on a routing you have tuned.

## The Conversions Tab

The second tab handles products where the unit of measure changes as the product moves down the line. Material arrives in kilograms, gets processed into metres, and is sold by the piece.

![The Conversions tab](../../ar/modules/manufacturing/images/routing/routing-conversions-en.png)

Each row reads as a sentence: at a given **Operation Seq.**, **X of** one **Unit** **Equal Y of** another **Unit**. One row saying "at operation 20, 1 of Roll equals 250 of Sheet" is what keeps quantities coherent from one operation to the next instead of needing manual reconciliation at the end. Most routings need no rows here at all — the tab matters only where the unit genuinely changes mid-process.

## How a Routing Gets Used

A production order that names this routing copies the operations onto its own **Routings** tab, and from that moment the order has a shape: a list of steps, each with a work centre, a duration and a quantity that has yet to pass through it.

That is what makes [production execution](/modules/manufacturing/production-execution) possible.

![The Routings tab on a production order, carrying the operations and their resources](../../ar/modules/manufacturing/images/production-order/production-order-routings-tab-en.png)
 Every execution document records progress *against an operation* — so many units moved from step 10 to step 20 — and without a routing there are no steps to record against. It is also what makes work-in-process a real number rather than a guess: units that have cleared operation 10 but not 20 are, precisely and answerably, work in process.
