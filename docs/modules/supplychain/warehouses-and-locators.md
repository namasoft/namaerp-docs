---
description: "Warehouses and locators: warehouse types, keepers and MRP inclusion, locators inside a warehouse, item-warehouse links, warehouse groups, the Warehouse Usage Policy and Prevent Using Batch."
entities: [Warehouse, Locator, WarehouseUsagePolicy, PreventUsingBatch, WarehouseGroup, WareLocationClass, ItemWarehouseRelation, RackQuantities]
menu: Inventory → Master Files → Warehouse
---
# Warehouses & Locators

You've defined your items - great. But where will you actually put them? This is where **Warehouses** and **Locators** come in. They're the spatial map of your inventory: where each item lives, how it moves, and who's responsible for it.

## The Warehouse: Your Primary Inventory Container

A warehouse in NaMa ERP isn't necessarily a building. It's any place where you want to track a separate inventory balance. It could be:
- A large physical warehouse
- A shelf in a showroom
- A mobile distribution truck
- A "goods in transit" area between two branches
- A sorting or quarantine area for goods under inspection

The simple rule: **if you want to know "how much do I have here?" independently, make it a warehouse.**

![Warehouse list in NaMa ERP](../../ar/modules/supplychain/images/warehouses/warehouse-list-en.png)

### Warehouse Types

Not all warehouses are the same. The system distinguishes several types, each with different behavior:

- **Standard warehouse**: ordinary storage for goods available to sell and issue.
- **Transit warehouse**: holds goods while they move between two locations, so they appear available at neither the sending nor the receiving side until the transfer completes.
- **Inspection/sorting warehouse**: received goods land here before approval, so they don't enter available stock until quality clears them.
- **Reservation warehouse**: dedicated to items reserved for specific customers or orders.

Choosing the right type matters because it determines when a location's stock counts toward "available to sell."

### Who's Responsible? The Warehouse Keeper and Permissions

For each warehouse you can assign a **warehouse keeper** - the employee responsible for it. This helps you:
- Route receiving and issuing tasks to the right person
- Set permissions that prevent users from transacting in warehouses outside their scope
- Maintain accountability during stock taking and reconciling differences

You can also link the warehouse to a branch and a group, set its priority (for automatic warehouse selection), and configure its own default purchase and sales units.

### Warehouses and Requirements Planning (MRP)

You can decide whether a particular warehouse is included in Material Requirements Planning (MRP) calculations. A showroom display warehouse may not be something you want counted as available for production, while your main raw-materials warehouse should be.

## Locators: Precision Inside the Warehouse

Inside a large warehouse, knowing you have "200 boxes" isn't enough - where exactly are they? Which aisle, which shelf, which pallet? This is where **Locators** come in.

A locator is a subdivision within the warehouse: aisle A, shelf 3, or a "fast-moving goods" zone. Enabling locators gives you:
- The exact location of each item
- Direction for warehouse staff straight to the pick location
- Organization of goods by movement, size, or storage requirements

### Locator Policy: Required or Prevented?

For each warehouse you set the locator policy:
- **Required**: no item can be received or issued without specifying its location - ideal for large, organized warehouses.
- **Prevented**: don't use locators at all - suitable for a small warehouse or a distribution truck.

Each locator can also prevent receiving or issuing individually (e.g. a "damaged" locator that accepts goods but prevents issuing them for sale), be linked to a specific supplier or customer when needed, and take a selection priority within automatic picking.

### Location Classes

When locators multiply, **location classes** help you group them by nature: refrigerated, frozen, high-value, quarantine... then apply rules to a whole class rather than a single locator. An item requiring refrigeration can be routed automatically to locators of the "refrigerated" class.

### Rack Quantities

Large distribution centres often have several racks inside one locator. **Rack Quantities** (*Inventory → Master Files → Rack Quantities*) records which rack each item sits on: you pick a warehouse and a locator, then list the items with their quantity and a free-text **Rack Code** (`details.rackCode`). It is a reference list for the storekeeper. It does not move stock, and the inventory balance is still kept per warehouse and locator, not per rack.

## Linking Items to Warehouses

It's impractical for every item to be stored in every warehouse. So the system lets you **link items to warehouses**, defining the preferred warehouses for each item with a given priority. The benefits:
- The system automatically suggests the most appropriate warehouse on receipt or issue
- It prevents storing items in warehouses unsuited to them
- It simplifies document entry for the user

## Warehouse Groups

When the number of warehouses grows, **warehouse groups** bundle them for reporting and organization: for example a "Northern Region Warehouses" group or a "Showroom Warehouses" group. You can then pull an inventory report for an entire group at once.

![Warehouse definition screen in NaMa ERP](../../ar/modules/supplychain/images/warehouses/warehouse-edit-en.png)

## Warehouse Usage Policy

Linking items to warehouses tells the system which warehouses *suit* an item. Sometimes, though, you need the opposite kind of rule: you want to *stop* a warehouse from being used at all - in certain documents, by certain users, or during a certain period. That's the job of the **Warehouse Usage Policy**.

Picture a few everyday situations:
- A warehouse is being counted this week, so nobody should issue or receive against it until the stock take is finished.
- A seasonal showroom warehouse should only be touched by the showroom team, not by central purchasing.
- An old warehouse is being phased out: you want to block new transactions on it from a certain date forward, without deleting any of its history.

### Switch it on first

Policies are off for the whole company until you tick **Apply Warehouse Usage Policies** (`value.applyWarehouseUsagePolicies`) in *Inventory → Settings → Supply Chain Configurations*, tab **Documents & Details**, group *Dimensions And Warehouse Config*. While that box is clear, no document is checked against any policy, and the policy screen itself refuses to save with:

*You must enable (Apply Warehouse Usage Policies) in supply chain configurations before using this screen*

This message has no Arabic translation, so it shows in English on Arabic screens too. When a customer says "the policy does nothing" or "the policy will not save", this switch is the first thing to check.

### The policy: a mode and a list of warehouses

You'll find **Warehouse Usage Policy** under *Inventory → Master Files*, right next to Warehouses and Warehouse Groups. Each policy has one required header field, **Usage Policy Mode** (طريقة تطبيق السياسة), which decides what the lines mean:

| Mode | What the lines are |
| --- | --- |
| **Allow All Warehouses Except Those In Lines** | A block list. Every warehouse stays usable except the ones the lines name. Use it to close a warehouse that is being counted or phased out. |
| **Prevent All Warehouses Except Those In Lines** | An allow list. For the users, document types and dates the lines match, only the warehouses the lines name can be used, and every other warehouse is blocked. Use it to keep the showroom team inside the showroom warehouse. |

Each line answers four questions: *which warehouse, in which documents, for whom, and when.*

| Column | What it controls |
| --- | --- |
| **For Type** (للنوع) | The document type the line applies to - e.g. a stock issue, stock receipt, or stock transfer. |
| **Entity List** (قائمة الأنواع) | A reusable list of several document types, for when one line should cover more than a single type. |
| **Applicable For** (مطبق على) | Who the line targets: a specific user, a user group, a security profile, or a criteria definition. Leave it empty to apply the line to everyone. |
| **Warehouse** (المخزن) | The warehouse - or a whole warehouse group - the line names. This is required. |
| **From Date / To Date** | The period during which the line is active. Leave both empty for an open-ended line. |

A line only ever affects the document types named in its **For Type** or **Entity List**, so always fill one of the two.

### How a rule kicks in

The check happens the moment you save a supply chain document - not buried in a report you read later. The system looks at the document's type, the user entering it, and the document's value date, then inspects both the header warehouse and the warehouse on every line. A policy line *matches* when:

- its **For Type** (or entity list) includes the document's type,
- the document date falls inside the **From/To** window (an empty window always matches),
- and **Applicable For** matches the current user - directly, through their group or security profile, or through a matching criteria definition - or is left empty.

A warehouse is then blocked when a matching line of an *Allow All … Except* policy names it (directly or through its warehouse group), or when the user has at least one matching line of a *Prevent All … Except* policy and none of those lines names that warehouse. The save is rejected with a message naming the blocked warehouse, the date, and the user:

*Warehouse {0} is prevented from being used on this date {1} for user {2}* — «المخزن {0} ممنوع إستخدامة في تاريخ {1} للمستخدم {2}»

Documents created in the background by the system, with no user entering them, are not checked.

## Taking a Batch Out of Circulation: Prevent Using Batch

A warehouse can be perfectly usable while one batch inside it is not. A lot of yoghurt reaches its expiry date. A delivery is held back until the laboratory result comes in. A supplier recalls a production run. A batch has been promised to one customer and must not be sold to anybody else. In every one of those cases the goods are still physically on the shelf and still on the books - what has to stop is people *using* them.

**Prevent Using Batch** (*Inventory → Master Files → Prevent Using Batch*) is the master file that stops them. Like the Warehouse Usage Policy above, it is a list of rules rather than a switch on the batch itself, which is what lets you quarantine a batch in one warehouse and leave the same batch usable in another.

Each line of the **Details** grid answers four questions: *which batch of which item, in which place, for how long, and who is exempt.*

| Column | What it controls |
| --- | --- |
| **Item** (الصنف) | The item whose batch is being blocked. The picker offers only items with **Has Lot** ticked, since nothing else has batches to block. |
| **Lot ID** (كود الشحنة) | The batch itself. The field suggests the lot numbers already recorded against the item you chose. |
| **Warehouse** (المخزن) | Restricts the block to one warehouse. Leave it empty and the batch is blocked wherever it sits. |
| **Locator** (الموقع) | Narrows it further to a single locator, which has to belong to the warehouse named on the same line. |
| **From Date / To Date** | The period during which this line blocks. Leave both empty and the block is permanent. |
| **Capability Types** (نوع الصلاحيات) | The one way past the block - see below. |

The **From Date** and **To Date** in the header are a convenience rather than a rule: each time you add a line they are copied into that line's own dates, and you are free to change them line by line afterwards. The dates that decide anything are the ones in the grid. (The header pair does get one check of its own - a **To Date** earlier than the **From Date** is refused.)

### When the block bites

The check runs the moment a supply chain document is saved, in the same pass as the warehouse policy described above. Every line of the document is examined, and the document's **Value Date** - not its issue date - is what the rule's date window is compared against.

A document line is refused when all of these are true at once:

- the rule names the **Item** on that line,
- the rule's **Lot ID** is the batch on that line,
- the document's value date falls inside the rule's **From/To** window (an empty window always matches),
- and the rule's **Warehouse** and **Locator** are either empty or exactly the ones on that line.

Two things about that deserve to be said plainly. First, this is a **hard block, not a warning**: the save is rejected and the Lot ID column of the offending line is flagged, so the document never comes into existence. Second, it blocks the batch **in both directions**. It is natural to assume a rule like this only stops stock going out, but the check never asks whether the line is an issue or a receipt - a stock receipt, a purchase invoice or a transfer *into* a warehouse naming that batch is refused exactly as a sale of it would be. For a recalled or expired lot that is usually what you want; it is occasionally a surprise to whoever tries to bring quarantined goods back in on a correcting document.

::: warning A rule line needs both an Item and a Lot ID
It is tempting to name the item, leave **Lot ID** empty and expect every batch of that item to be blocked. That is not what happens - a blank Lot ID matches only document lines that carry no batch at all. To stop several batches of one item, give each batch its own line.
:::

::: tip Letting one person through
**Capability Types** on a line is an exemption, not a target. Point it at a capability type and any user whose security profile grants that capability *on the document type being saved* may use the batch anyway - the quality manager entitled to move held stock, for instance, while everybody else is stopped. Leave it empty and nobody is exempt. Capability types themselves live under *Administration → Security → Capability Types*; see [Security Profile](/platform/security/security-profiles.md).
:::

Rules take effect immediately. Saving or changing a Prevent Using Batch record applies to the very next document saved, with no restart and no waiting.

## How It All Fits Together

Imagine a typical distribution center:

1. A shipment arrives and is first received into the **inspection warehouse**.
2. After quality clears it, it's transferred to the **main warehouse**, specifically to a **locator** in the appropriate aisle.
3. Items requiring refrigeration are routed automatically to locators of the **"refrigerated" class**.
4. When a sales order arrives, the system suggests the warehouse and locator based on **item-warehouse links** and **locator priorities**.
5. Goods distributed to distant branches are held in a **transit warehouse** during transport until they arrive and the transfer is received.

This spatial structure is the foundation on which all the stock movements we'll cover in the next sections operate.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Locators can not be modified because there is a transaction on warehouse* — «هناك حركة علي المخزن , لايمكن تغيير سياسة استعمال الموقع» | The warehouse's **Locator Policy** is being changed while movements already exist that contradict the new policy — stock sitting without a locator when the policy becomes *required*, or stock sitting in locators when it becomes *prevented*. | Leave the policy as it is on a warehouse that has history, or have **Allow Update Locator Of Warehouse In Trans** switched on in supply chain configuration if the change is deliberate. |
| *You can not change the legal entity from {0} to {1} because there are {2} quantity transactions.* — «لا يمكن تغيير الشركه من {0} إلى  {1} لوجود  {2} حركات مخزنية» | The warehouse is being moved to another company after stock has already moved through it. The message counts the movements. | Create a warehouse under the other company and transfer the stock to it, or have **Allow Changing Warehouse Legal Entity** switched on. |
| *You can not change the legal entity from {0} to {1} because there are {2} reservation transactions.* — «لا يمكن تغيير الشركه من {0} إلى  {1} لوجود  {2} حركات حجز» | The same block, raised by reservation movements rather than quantity movements — so it can appear on a warehouse that looks empty. | Cancel or move the reservations first, or have that same configuration option switched on. |
| *Reservation warehouse {0} in reservation locator {1} must equal to reservation warehouse {2}* — «مخزن الحجز {0} فى موقع الحجز {1} يجب ان يساوي مخزن الحجز {2}» | The warehouse names both a **Reservation Warehouse** and a **Reservation Locator**, and that locator belongs to a third warehouse. | Pick a locator that belongs to the reservation warehouse you named. |
| *Reservation warehouse {0} in reservation locator {1} must equal to current warehouse {2}* — «مخزن الحجز {0} فى موقع الحجز {1} يجب ان يساوي المخزن الحالي {2}» | A **Reservation Locator** was named without a reservation warehouse, so reservations stay in this warehouse — but the locator belongs to another one. | Use a locator of this warehouse, or name the reservation warehouse the locator really belongs to. |
| *Warehouse {0} is prevented from being used on this date {1} for user {2}* — «المخزن {0} ممنوع إستخدامة في تاريخ {1} للمستخدم {2}» | A **Warehouse Usage Policy** blocks this warehouse for this document type, this date and this user — either a block-list line names it, or the user has an allow list that does not. It is raised for the header warehouse and, separately, for a warehouse typed on a line. | Use a warehouse the policy allows, change the document date, or have the policy amended. The message names the user, which is what tells you the block is user-specific. |
| *You must enable (Apply Warehouse Usage Policies) in supply chain configurations before using this screen* | A Warehouse Usage Policy is being saved while the company-wide switch is off. No Arabic translation exists, so it shows in English on Arabic screens too. | Tick **Apply Warehouse Usage Policies** in supply chain configuration (Documents & Details tab), then save the policy. |
| *The locator {0} does not belong to warehouse {1}* — «الموقع {0} لا ينتمي إلى المخزن {1}» | A **Prevent Using Batch** line names a warehouse and a locator that sits in a different warehouse. | Either clear the warehouse and let the locator speak for itself, or use a locator of the warehouse you named. |
| *You must activate validate item warehouse relation in the SupplyChain Configurations* — «لا بد اولاً من تفعيل خيار ربط الاصناف بالمخزن فى إعدادات المخازن» | An **Item Warehouse Relation** record is being saved while the switch that makes those records mean anything is still off. | Switch **Activate Item Warehouse Relation** on in supply chain configuration, then save the record. |
| *You must fill one of the following fields: {0}, {1} at line {2}* — «يجب ملء حقل واحد من الحقول الأتية:{0}, {1} في السطر {2}» | An item-warehouse link line names neither a warehouse nor a warehouse group, so there is nothing for the item to be linked to. | Fill one of the two on that line. |
| *You must fill only one of the following fields: {0}, {1} at line {2}* — «يجب ملء حقل واحد فقط من الحقول الأتية:{0}, {1} في السطر {2}» | The same line names both a warehouse and a warehouse group. One link per line. | Clear one of the two, and add a second line if you meant both. |

## Next Steps

- [Receiving Stock](./receiving-stock.md) - bringing items into these warehouses
- [Issuing Stock](./issuing-stock.md) - taking them out
- [Moving Stock Between Warehouses](./moving-stock.md) - transferring them from one warehouse to another
- [Stock Taking](./stock-taking.md) - verifying that book and physical balances match
