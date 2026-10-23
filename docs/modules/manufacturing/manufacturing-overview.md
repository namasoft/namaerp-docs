---
description: "Overview of the Manufacturing module: its core and add-on licences, the setup building blocks, how production flows from order to delivery, how costs are built, and where to start."
---
# Manufacturing Module Overview

## What Manufacturing is All About

Think about how products get made in the real world. You start with raw materials - maybe steel sheets, plastic pellets, or fabric rolls - and through a series of steps, you transform them into finished products that customers want to buy. That transformation process is what manufacturing is all about, and Nama ERP's Manufacturing module is designed to help you manage every aspect of it.

The challenge with manufacturing isn't just about making things. It's about knowing what materials you need, when you need them, who's going to do the work, how long it will take, and most importantly - how much it's all going to cost. You need to track work as it moves through your factory, handle quality issues when they come up, and make sure that when production is done, your inventory and costs are accurately recorded.

Nama ERP handles all of this complexity. Whether you're making simple products or complex assemblies with hundreds of components, the system gives you the tools to plan, execute, and track your manufacturing operations from start to finish.

## Licenses: One Core and Three Add-Ons

The module is sold as a core license plus three optional sub-licenses, and a missing menu is almost always a missing license rather than a missing permission.

| License | What it switches on |
|---|---|
| `manufacturing` | The core: BOMs, routings, work centers, standard operations, production order requests, production orders, execution, raw material issue and return, resource vouchers, product delivery and return, scrap receipts, order close and the costing screens. |
| `manufacturing-mrp` | Everything under **Manufacturing → Material Resource Planning** — see [Material Requirements Planning](/modules/manufacturing/material-requirements-planning). |
| `manufacturing-molds` | Everything under **Manufacturing → Manufacturing Molds** — see [Manufacturing Molds](/modules/manufacturing/manufacturing-molds). |
| `manufacturing-crtn-pln` | Everything under **Manufacturing → Cartoon** — see [Carton Manufacturing](/modules/manufacturing/carton-manufacturing-overview). |

## The Building Blocks: What You Need to Set Up

Before you can start making anything, you need to teach the system how your products are made. This is where the master data comes in - think of it as the instruction manual for your factory.

### Bill of Materials (BOM) - The Recipe

A **Bill of Materials** (BOM) is like a recipe for your product. Just as a recipe tells you "to make a cake, you need flour, eggs, sugar, and butter," a BOM tells you "to make this widget, you need these parts and materials."

Here's what makes BOMs powerful in Nama ERP: they're not just simple lists. You can have multi-level BOMs where a finished product is made from sub-assemblies, and those sub-assemblies are made from components. Think of it like building a car - the car is made from a chassis, engine, and body. The engine itself is made from pistons, cylinders, and a crankshaft. The system handles all these levels automatically.

BOMs also account for the messy reality of manufacturing. Maybe you expect to scrap 5% of your material during production - you can build that into the BOM. Maybe you have substitute materials you can use when the preferred one isn't available - the BOM can handle that too. You can even track by-products - things you produce as a side effect of making the main product.

### Routing - The Instructions

While the BOM tells you *what* materials you need, the **Routing** tells you *how* to make the product - the actual manufacturing steps.

Imagine you're making furniture. Your routing might say:
1. Cut the wood pieces (Operation 10)
2. Sand the pieces (Operation 20)
3. Apply stain (Operation 30)
4. Assemble the pieces (Operation 40)
5. Final inspection and packaging (Operation 50)

For each operation, you specify where it happens (which work center), how long it should take, what resources (people or machines) are needed, and any quality checks that need to be done. This becomes your production roadmap.

### Work Centers - Where the Magic Happens

A **Work Center** represents a physical location in your factory where work gets done. It could be a cutting machine, an assembly station, a paint booth, or a packaging area.

Work centers are important because they help you understand capacity. If your cutting machine can only process 100 pieces per day, and you have orders for 150 pieces, you have a problem. The system helps you spot these bottlenecks before they become crises.

### Standard Operations - Templates for Common Tasks

If you find yourself defining the same operation over and over - say, "Final Quality Inspection" - you can create a **Standard Operation** as a template. Then, whenever you need that operation in a routing, you just reference the template instead of entering all the details again. It's a time-saver and ensures consistency.

## How Manufacturing Actually Flows

Let's walk through a typical manufacturing process to see how everything connects.

### It Starts with a Production Order

When you need to make something, you create a **Production Order**. This is your formal instruction to the factory: "Make 1000 units of product XYZ, starting next Monday."

When you select the product, the system looks up its BOM and Routing. It automatically copies all the component materials and operation steps into the production order, calculating quantities based on how many units you want to make. If your BOM says you need 2 screws per widget and you're making 1000 widgets, the system calculates that you need 2000 screws.

At this point, the order is just a plan. You can review it, adjust quantities, change dates, even swap in substitute materials if needed. Once you're happy with it, you "start" the order, which locks down the structure and tells the factory floor that production is approved.

### Getting Materials Ready

Before production can begin, you need to get the raw materials to the shop floor. The system can help you identify which lots to use (especially important if you're tracking batches), and you can create Material Issues to withdraw components from your warehouse and allocate them to the production order.

Some companies prefer to issue materials upfront. Others wait until each operation actually needs them. Nama ERP handles both approaches - you configure it based on how your factory works.

### Production Execution - Where Real Work Happens

Now we get to the heart of manufacturing: actual production. As workers complete operations on the shop floor, they record their progress using **Production Execution** documents.

Here's where it gets interesting. In manufacturing, products don't just smoothly flow from operation 1 to operation 2 to operation 3. Reality is messier. Sometimes:
- Products move forward successfully (the normal case)
- Quality inspection finds problems, and items need to go back for rework
- Some pieces are scrapped because they're beyond repair
- You might take samples for testing

Nama ERP handles all these scenarios with "operation steps." Each operation can have quantities in different states:
- **ToMove**: Ready to move to the next operation - the normal work-in-process
- **Rejected**: Failed quality check, needs rework
- **Scrap**: Defective, can't be fixed
- **Sample**: Taken for quality testing

When you record a production execution, you're essentially saying "I moved X units from Operation 10-ToMove to Operation 20-ToMove" or "I found defects, moving Y units from Operation 30-ToMove to Operation 30-Rejected."

The system tracks all this in real-time, so you always know exactly where every unit is in your production process. You know how many units are at each operation, how many passed inspection, how many failed, how much scrap you've generated - everything.

### Automatic Document Generation

Here's where Nama ERP really shines: it can automatically create supporting documents based on what's happening in production.

When you record a production execution moving items through operations, the system can automatically:
- Issue the raw materials needed for those operations
- Create resource vouchers tracking labor and machine hours
- Generate quality control documents if inspections are required
- Deliver finished goods to inventory when the last operation completes

You configure what gets generated automatically versus what you want to do manually. The flexibility is there for your specific process.

### Wrapping Up: Closing the Order

Eventually, production is complete. All your finished goods have been delivered to inventory. Now it's time to close the production order and finalize the costs.

This is where the **Order Close Voucher** comes in. When you close an order, Nama ERP:

1. **Adds up all the actual costs** - everything you spent on materials, labor, machine time, and other resources
2. **Applies overhead costs** - those indirect costs like factory rent, utilities, and supervisors' salaries that can't be tied to a specific product but still need to be allocated
3. **Compares to standard prices** - if you record standard prices and switch deviations on, it shows you the variances (where you spent more or less than expected)
4. **Updates inventory values** - your finished goods get valued based on the actual costs of production
5. **Locks the order** - once closed, the order can't be modified, ensuring your historical records stay intact

If for some reason you need to cancel an order that wasn't completed, you can terminate it instead of doing a normal close. Terminating skips the check for quantities still waiting at an operation and marks the order Terminated; the costing and the accounting are the same as for a normal close.

## Understanding Costs in Manufacturing

One of the trickiest parts of manufacturing is getting accurate costs. It's not just about materials - there's so much more.

### Direct Costs - The Easy Part

Some costs are straightforward to trace:
- **Materials**: The steel, plastic, components you consume
- **Labor**: The time workers spend directly making products
- **Machines**: The hours your equipment runs

These are direct costs - you can point to a specific production order and say "this order used these materials, this many labor hours, and this much machine time."

### Indirect Costs - The Tricky Part (Overheads)

But what about all the other costs of running a factory?
- The factory rent - you can't say product A used $100 of rent and product B used $200
- Electricity for the whole facility
- The production manager's salary
- Cleaning supplies
- Equipment maintenance
- Quality inspectors who check all products

These are **Manufacturing Overheads** - indirect costs that need to be spread across your products somehow.

Nama ERP lets you define **Overhead Types** (templates for how to allocate these costs). You might say:
- "Add 15% of material costs as overhead" (to cover material handling and storage)
- "Add $5 per unit produced" (to cover general factory costs)
- "Add $50 per production hour" (to cover utilities and depreciation)

You can mix and match different allocation methods to match how your factory actually works.

### Actual vs. Standard: Getting Real Numbers

Inventory is always valued at actual cost - FIFO or moving average, company-wide. But many companies also want to know what production *should* have cost. Record standard prices for your products and materials, and each closed order is compared against them, so the variances show up order by order. This is incredibly valuable for spotting problems early.

Maybe your material costs are running 10% higher than expected - is it because prices went up, or because you're wasting material? Maybe labor is taking longer than standard - do workers need more training, or is the standard time unrealistic?

Nama ERP's **Actual Overhead Calculator** takes this a step further. Instead of using predetermined overhead rates, it can query your actual general ledger accounts to see how much you really spent on utilities, maintenance, supervision, etc. Then it allocates those actual costs to production orders. This gives you the most accurate product costing possible.

## How Everything Connects

What makes Nama ERP's Manufacturing module powerful is how everything ties together:

- Your **Items** define what you make and what you use to make it
- **BOMs** break down products into their components
- **Routings** define the manufacturing process
- **Production Orders** authorize making specific quantities
- **Production Execution** records actual work as it happens
- **Material Issues** and **Product Deliveries** move inventory
- **Order Close Vouchers** finalize costs and lock the records

Behind the scenes, the system is tracking work-in-process at each operation, maintaining inventory accuracy, collecting costs, and keeping the general ledger in sync. It's all connected, all integrated.

You can start a production order for a complex assembly, and the system automatically explodes all the sub-levels of the BOM. It knows every component needed, at every level. When you execute production, it tracks quantities operation by operation. When materials are issued, inventory decreases. When finished goods are delivered, inventory increases at the new value. When you close the order, variances flow to the general ledger.

## Different Ways to Work

One of the great things about Nama ERP is that it doesn't force you into one way of doing things. Different industries and companies have different needs, and the system adapts.

**Some factories** issue all materials at once when production starts. Others issue materials operation by operation as they're needed. You can configure either way.

**Some industries** (like pharmaceuticals or food) need to track costs separately for each batch or lot produced. Maybe one batch cost slightly more due to ingredient quality or longer processing time - you need that detail for compliance and analysis. Nama ERP supports cost-per-batch tracking.

**Some companies** need to handle parallel operations - multiple work centers doing the same operation simultaneously to increase capacity. The system handles this with parallel operation configurations.

**Some products** generate co-products or by-products - maybe you're processing meat and you get both the main product and other saleable parts. The system tracks all outputs and allocates costs appropriately.

The flexibility is there. You configure the system to match your process, not the other way around.

## Getting Started

The beauty of this module is that you can start simple and grow into the advanced features.

**Starting out:**
1. Set up your items (what you make and what you buy)
2. Create basic BOMs for your products
3. Define simple routings with main operations
4. Start creating production orders and executing them

**As you mature:**
- Add quality check lists to operations
- Record standard prices and use variance analysis
- Set up complex overhead allocations
- Use MRP for automated planning
- Track resources and capacity in detail
- Implement cost-per-batch for detailed analysis

The system supports wherever you are in your manufacturing journey.

## What's Next?

This overview gives you the big picture. To dive deeper into specific topics:

**[Production Orders](./production-orders.md)** - Learn how to create orders, work with BOMs and routings, manage components, and start production. This is where you'll spend most of your time planning what to make.

**[Production Execution](./production-execution.md)** - Understand how to record shop floor activities, track quantities through operations, handle rework and scrap, and capture actual time and resource usage.

**[Production Costing and Order Closing](./production-costing.md)** - See how costs flow through the system, how overhead allocation works, how to analyze variances, and how to close orders properly.

Each guide goes into the details, the workflows, and the options available. But they all build on the foundation we've covered here: manufacturing is about transforming materials through operations to create products, and Nama ERP gives you complete visibility and control over that process.

---

**Navigation**:
- Arabic: التصنيع > المستندات
- English: Manufacturing > Documents

The main documents you'll work with daily:
- Production Order (أمر إنتاج) - Your authorization to manufacture
- Production Execution (تنفيذ إنتاج) - Recording what actually happened
- Order Close Voucher (إغلاق أمر إنتاج) - Finalizing costs when done
