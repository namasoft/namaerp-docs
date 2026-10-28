---
description: "Specialized supply chain scenarios: glass job orders and their operations, Service Item BOMs, document automation tools, tenders, and resources and activities."
entities: [GlassJobOrder, GlassJobOrderReq, GlassOperationMap, ServiceItemBOM, OrderExecution, GlassJobOrderStatusUpdate, OrderDelivery, OrderFinished, OutsourceRequest, OutsourceIssue, OutsourceReceipt, OrderDamage, JOrderExpense, Tender, TenderCondition, DeliveryNumber, GlassOrderList, JobOrderPartialDelivery, SCDocRuleSet, SCExtraDocCreationRule, SCCopierExtraFields, OrderStatusQtyTrackConfig, DeliveryConfiguration, Resource, Activity, MaterialClassification]
---
# Specialized Scenarios

The previous pages cover the core supply chain paths. But some specialized cases don't fit a page of their own: sector-specific job orders, document-automation tools, and tenders. This guide gathers them, and points to their homes when they belong to other modules.

## Glass Job Orders (Glass Job Order)

For the glass-manufacturing sector and similar process-based manufacturing, the system provides the specialized **Glass Job Order** path: from estimating the request to operational execution to delivery.

![Glass job order screen in NaMa ERP](../../ar/modules/supplychain/images/specialized/glass-job-order-en.png)

The path starts with the **Job Order Request** (GlassJobOrderReq) for cost study and quotation, then converts to the **Glass Job Order** (GlassJobOrder) that carries the bill of materials, operations, and delivery items. Operations are defined via the **Operation Map** (GlassOperationMap), and executions are recorded via **Order Execution** (OrderExecution), which tracks the responsible employee, time, and actual cost and generates material issues. Status is updated via **Job Order Status Update** (GlassJobOrderStatusUpdate), and output is delivered via **Order Delivery** (OrderDelivery) and **Order Finished** (OrderFinished). The path also supports outsourcing via **Outsource Request / Issue / Receipt** (OutsourceRequest / OutsourceIssue / OutsourceReceipt), damage documentation via **Order Damage** (OrderDamage), and expenses via **Job Order Expense** (JOrderExpense).

Two more documents sit on the same menu. The **Day Order** (GlassOrderList) gathers the lines of several glass job orders, within an item range, into one day's production run, and shows a total quantity, value and number of orders per branch. Saving it approves the work: each order still at **Initial** status becomes **Approved**, and so do the order lines on the list and their service lines; deleting the Day Order puts them back to **Initial**. A Day Order holds one job order only, unless **Allow More Than One Job Order** is ticked.

The **Job Order Partial Delivery** (JobOrderPartialDelivery) hands over part of a glass job order before the rest is finished. You choose the job order and list the bill-of-materials lines being delivered with their quantity and a piece **Number**. Each saved partial delivery adds to the delivered quantity on the job order's lines, which is how the order knows what is still undelivered and when it is fully delivered. A line cannot take more than the order's undelivered quantity, and the same piece number cannot appear in two partial deliveries.

::: info A Specialized Sector
Glass job orders are a sector-specific sub-module; if your business isn't in this field, you won't need them. They rely on the same concepts as [assembly](./assembly-and-packaging/) and [resources](#Resources-and-Activities) but with a dedicated order path.
:::

## Bills of Materials for Services (Service Item BOM)

A glass job order does not only cut a sheet of glass. It tempers it, drills it, polishes its edges. Each of those operations is an item in its own right — an item whose type is **Service** rather than **Stock**. But a service still consumes things: adhesive, abrasive discs, an hour on a machine, two operators standing at it.

The **Service Item BOM** (*Job Orders → Master Files → Service Item BOM*) is where that is written down, once per service. It is the reason an order execution can work out what to issue from the warehouse and what the work cost without anybody typing either figure.

The header names the service and the scale everything below is measured against:

- **Service Item** — the picker offers only items of type Service. Choosing one copies its code and name onto the record and sets **Quantity** to 1 in the item's base unit.
- **Quantity** and **Service UOM** — how much service the rest of the screen describes. Everything underneath is a ratio against this figure, so a BOM written for 10 m² is scaled on its own when an execution covers 3 m².
- **Calculation Type** — **Lot** or **Item**: whether the cost is incurred once for the whole run or rises with the quantity produced. It is also the default that new lines in the Routes grid inherit.

Underneath sit the two grids that make up the BOM proper.

**Spare Parts** is the materials list. Each line names an **Item** (stock items only), the **Material Qty** consumed, and the **Service Prod.** quantity that consumption corresponds to — "1.5 litres of adhesive per 10 m² tempered". Recording it as a pair rather than as a single per-unit figure is what lets you write the ratio in the units the shop floor actually works in.

**Routes** is the resources list — the machines and the people. Each line names a **Resource**, the **Time** it is occupied for (the time unit defaults from the resource's own rate type), and the **Resources Count**, meaning how many of them at once. The line's **Cost** is worked out for you from the resource's rate, the time and the count; it is not something you type.

::: tip Two ways to cost a service, and one switch that chooses
Leave **Direct Cost** off and the cost is built up from the Routes grid, resource by resource — the fixed-cost field beside it stays greyed out. Turn it on and the opposite happens: the Routes grid is emptied and disabled, and you type a single figure into **DirectCost** instead. Use it for services bought in at a flat price, or for anything whose cost you simply know and would rather not model.
:::

**Auto Issue** deals with the base item rather than the spare parts. With it on, recording an execution automatically adds the executed line's own item to the materials issued, alongside everything the Spare Parts grid contributes. Each piece is only issued once, so recording a second execution against the same piece does not issue it twice, and lines marked as free items are left out.

::: info One BOM per service, and the order will not save without it
Two rules work together here. Saving a second Service Item BOM for a service that already has one is refused outright. And a glass job order checks, for every service applied to a stock item on it, that a BOM exists — when one is missing the order cannot be saved, and the message names both the service and the item it was applied to. So service BOMs are something you set up before the first order, not alongside it.
:::

## Document Automation Tools

Supply chain repeatedly generates one document from another (a receipt from a purchase order, an invoice from a delivery...). The system provides tools that make this generation automatic and controlled:

- **Document Rule Set** (SCDocRuleSet): a central rules engine that triggers automatic document creation from source documents under defined conditions.
- **Extra Document Creation Rule** (SCExtraDocCreationRule): defines generating an extra document on a particular event.
- **Copier Extra Fields** (SCCopierExtraFields): determines which fields are copied when a document is derived from another, with entity-type-specific copy scripts.
- **Quantity Tracking Source Config File** (OrderStatusQtyTrackConfig): decides which quantity a document passes back to the document it was created from when quantity tracking is updated. A term points at one in its **Quantity Tracking Source Config File** option (`termConfig.orderStatusQtyTrackConfig`). Its lines (`details`) are tried top to bottom and the first whose **Criteria** (`details.criteriaDefinition`) the document matches applies; **Calculate Tracked Field In From Document From Field** (`details.quantityValueCopyType`) then picks the line's **Quantity**, **Satisfied (System + Manual)**, **Satisfied (System Only)**, the same two for **Satisfied2**, or **Zero**. A document that matches no line passes its plain quantity.
- **Delivery Configuration File** (DeliveryConfiguration): keeps running totals of what was requested, finished and cancelled against each line of a root document — for five quantities: reservation, delivery, loading, and two spare ones (Other 1, Other 2). A term points at one in **Delivery Configuration File** (`termConfig.deliveryConfiguration`); a document on that term contributes only if it matches the file's **Criteria** (`criteriaDefinition`). Lines are kept apart by item and by the details ticked in the item configuration's **Dimensions For Delivery**.
  - **Affected quantity lines** (`affectedQtyLines`) say what the document adds: **Affect In** (`affectedQtyLines.affectIn`, which of the five quantities), **Quantity Type** (`affectedQtyLines.quantityType`: requested, finished or cancelled), **Source Quantity** (`affectedQtyLines.sourceQuantity`: the reserved quantity, the document quantity, a field or an SQL statement — the last two named in **Source Quantity ID**, `affectedQtyLines.sourceQtyFieldId`), **Component Effect Type** (`affectedQtyLines.effectType`: positive or negative), **Warehouse Source Type** (`affectedQtyLines.warehouseSourceType`, with **Source Warehouse ID**, `affectedQtyLines.sourceWarehouseFieldId`), and the conditions **Apply When** / **Do not Apply When** (`affectedQtyLines.applyWhen`, `affectedQtyLines.doNotApplyWhen`) and their query forms (`affectedQtyLines.applyWhenQuery`, `affectedQtyLines.doNotApplyWhenQuery`).
  - **Relations** (`relations`) are limits checked on every save: **The Quantity** of a given type (`relations.theQuantity`, `relations.theQuantityType`) must not exceed the sum of up to five other quantities (`relations.lessThanOrEqual1` … `relations.lessThanOrEqual5`, each with `quantity`, `quantityType` and a positive/negative `operator`) — for example, delivered must stay within reserved. A breach refuses the save with *The quantity {0} - {1} {2} is greater than the total of must be less than or equal quantities {3}, this is prevented by the rule in line number {4} of the file {5}*.

These tools are for advanced users and implementation administrators who tailor system behavior without coding.

## Tenders (Tender)

When you sell under a tender, for example a supply contract won from a government body, the **Tender** (Tender) records what was awarded. It is a sales document: the customer, a **Start Date** and **End Date**, and the awarded items with their quantities, prices and taxes, totalled the way an invoice is. Its **Conditions And Payment** tab lists the contract's **Conditions**, picked from the **Tender Condition** (TenderCondition) file, and the **Payment Lines** (date and amount). Its **Delivery** tab lists the **Delivery Lines**: which item is due on which **Expected Delivery Date**. Both schedules point at a **Delivery Number** (DeliveryNumber), a simple code-and-name list (*Inventory → Tenders → Delivery Number*) that names each delivery batch, so a payment line can be tied to the delivery it pays for. Whether a saved tender also affects the customer's account is decided by its term.

## Resources and Activities

Some specialized paths (such as job orders) rely on shared master files:
- **Resource** (Resource): defines human and machine resources for job-order and manufacturing operations, with rates, periods, costs, and accounting setup.
- **Activity** (Activity): a flexible file for tracking various activities and milestones within job orders.
- **Material Classification** (MaterialClassification): classifies materials by type, grade, or source for reporting and analysis.

## Actions on these screens

**On the Glass Job Order and its request:**

- **Collect Orders** — fills the bill-of-materials lines from the customer's open orders instead of entering them again.
- **Apply** — reads the order type, the order status and the down-payment percentage on the header and applies them to the order, which is how a glass order moves from entered to actionable.

**On the Order Execution:**

- **Add Order** — asks for an order and a customer and appends that order's work to the execution lines, against the operation named on the header.
- **Collect Data** — the bulk version: it fills the lines from the ranges on the header (from/to item, from/to job order and the rest) rather than one order at a time.
- **Clear Job Orders** and **Clear Details Lines** — empty the job-orders grid and the details grid respectively, which is how you start the collection over after setting different ranges.

**On the Day Order:** **Collect Orders** fills the list, **View** opens what a line points at, and **Export** sends the list out as a file.

## Scenarios That Belong to Other Modules

Some specialized scenarios have their own standalone modules even though they intersect with supply chain:
- **Point of Sale (POS)**: fast retail selling has its [own module](/modules/pos/).
- **Pharmacies and medical supplies**: in the Hospital Management (HMS) module with its own paths.
- **Project site materials**: in the Contracting module.
- **Complex manufacturing**: in the [Manufacturing module](/modules/manufacturing/).

## Next Steps

- [Assembly & Packaging](./assembly-and-packaging/) - the foundation job orders build on
- [The Sales Journey](./sales-journey.md) - the ordinary sales documents a tender sits beside
- [Supply Chain FAQ](./supply-chain-faq.md) - miscellaneous cases and questions
