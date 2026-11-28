---
description: "Overview of carton manufacturing: carton specifications, carton orders, material planning that cuts paper rolls with minimum trim waste across layers and orders, the move to production, and the setup it needs."
---
# Carton Manufacturing: Smart Material Planning for Corrugated Products

## The Challenge of Carton Manufacturing

If you make corrugated cartons, you know the problem intimately: You buy paper rolls in standard widths - maybe 1800mm, 2000mm, 2200mm. Your customers order cartons in all different sizes - 300mm wide, 450mm, 680mm, whatever fits their product.

How do you cut those standard rolls efficiently? If you're making a 450mm wide carton and you have a 2000mm roll, you can fit four cartons across (4 × 450 = 1800mm) with 200mm of trim waste. That's about 10% waste - not terrible, but not great.

But what if you have three different orders to fulfill: one for 450mm cartons, one for 320mm, and one for 230mm? Could you cut all three from the same roll and reduce waste? What about different layers - the outer facing and inner liner might come from different paper grades. Can you mix and match rolls to minimize trim?

This is where things get complicated fast. The math becomes a massive optimization problem: which orders to batch together, which rolls to use for which layers, how many pieces to cut from each roll, how to minimize setup changes while still getting orders out the door on time.

**Nama ERP's Carton Manufacturing module** solves this with industrial-strength optimization algorithms. You tell it what orders you need to fulfill and what rolls you have in stock. It figures out the optimal cutting plan, minimizes waste, and even helps you find "companion orders" - other pending orders that would fit perfectly with what you're already planning to cut.

::: info Required license
Carton manufacturing is part of the `manufacturing-crtn-pln` license, the carton-planning sub-license of the Manufacturing module. Without it the **Cartoon** menu does not appear, even when the core `manufacturing` license is on.
:::

## How It All Fits Together

Think of carton manufacturing in Nama ERP as flowing through four stages:

### 1. Define Your Products (Carton Specifications)

Before you can make or sell cartons, you need to teach the system what each carton looks like. That's where **Carton Specifications** come in.

A specification describes everything about a carton:
- **Physical dimensions**: Length, width, height of the finished box
- **Sheet dimensions**: How big the flat sheet needs to be before folding
- **Material structure**: What paper grades go into each layer (facing, fluting, liner)
- **Manufacturing details**: Fluting type, pattern, joining method, whether it has a badge or printing
- **Production stages**: First stage (typically corrugating/laminating), second stage (printing/slotting), third stage (final finishing)

You set these up once per carton design. When a customer orders that carton, you just reference the specification.

The smart part: specifications can be hierarchical. An "assembled carton" specification might reference several "normal carton" specifications as components. Order the assembled carton, and Nama automatically figures out you need to manufacture all the pieces.

### 2. Receive Customer Orders (Carton Orders)

When a customer places an order, you create a **Carton Order**. It's a sales document - customer, quantities, prices, taxes - but with carton-specific details.

Each order line references a carton specification and states the quantity needed. Behind the scenes, Nama works out the actual production requirements: an assembled carton made of three components means three components to produce, and the order's **Manufacturing Details** grid lists them as planning documents take them up.

Orders track their planning status. Once an order (or part of an order) gets planned for production, Nama marks it so you don't accidentally plan the same order twice.

### 3. Plan Material Cutting (Material Planning & Optimization)

This is where the magic happens. **Carton Material Planning** is Nama's optimization engine.

You start a material planning document and select one or more carton orders to fulfill. Nama looks at:
- What carton specs you need to produce
- What quantities you need
- What paper rolls you have in inventory (items, grades, widths, lengths, lot numbers)
- Your optimization constraints (minimum trim allowed, minimum roll length to use, time limits for the optimizer)

Then you hit "Collect Materials" and Nama runs a constraint-programming solver (using Google's OR-Tools) to figure out the optimal cutting plan.

The result: a detailed cutting plan showing:
- Which rolls to use for each layer of each carton
- How many pieces to cut across the width of each roll (strikes)
- How many strikes to make along the length (operations)
- Total quantity planned per order
- Material efficiency (trim/waste calculated)

**Companion Orders**: Here's a powerful feature. Say you have one carton to plan, but you know there are other pending orders for similar cartons. Click "Find Companion Orders" and Nama searches the committed orders that are not fully planned, finds the ones whose specs have the same layers (grade, grammage, corrugating factor and layer type), and calculates which companion order would give you the best material efficiency if you batched them together.

You see a list sorted by total waste - the orders that would waste the least material appear first. Accept the one you want (maybe based on customer priority), and Nama adds it to your planning document. Run optimization again, and now you're cutting multiple orders from shared rolls, minimizing waste across the batch.

### 4. Execute Production

Once planning is done, you can:

**Generate Production Orders**: Nama creates a production order for each carton in the plan. The production order includes:
- Components - which paper (grade, grammage and reel width) to issue, in which quantities
- Routings - the operations to perform (corrugating, slotting, printing, etc.)
- Co-products - if you configured trim as a co-product item, it's tracked

**Issue Materials**: Create **Carton Material Issues** to withdraw the planned rolls from inventory and allocate them to production. The material issue references the planning document, so you know exactly which materials are for which cutting plan.

**Track Production**: Use standard Nama production execution to record actual work as it happens on the shop floor.

## The Optimization Algorithm: What Happens Behind the Scenes

When you click "Collect Materials," Nama isn't doing simple arithmetic. It builds a constraint model of every way the reels in stock could be cut and hands it to the CP-SAT solver from Google OR-Tools. The solver looks for the plan that cuts at least the ordered quantity with the least trim and the fewest reel patterns, inside the limits of the planning configuration, and marks the result **Optimal** or **Feasible (Not the best)**, or fails when no plan exists.

How reels are matched to layers, why every dimension must be in centimetres, what each configuration parameter does and how to read the result are all on [Carton Material Planning](/modules/manufacturing/carton-material-planning).

## Real-World Example

A complete run — a 4,000-carton order on a three-layer build, from the empty planning document to the picking list — is worked through in [A Worked Example](/modules/manufacturing/carton-material-planning#A-Worked-Example) on the planning page. Nama's carton screens work in **centimetres**, not the millimetres the trade usually quotes.

## Key Features That Make This Powerful

### Multi-Layer Intelligence
Cartons aren't one-dimensional. A 3-layer corrugated board has facing, fluting, and liner - each potentially from different rolls, different grades, different widths. Nama looks for each layer's reels by that layer's own grade and grammage, while every layer of one carton is cut to the same number of pieces across and strikes along.

### Lot Tracking
Paper quality varies by lot. The plan works on grade, grammage and reel width; the specific lot is recorded when the reel is issued on the Carton Material Issue, which is what traces a lot to the production order it was charged to.

### Flexible Constraints
You control the trade-offs:
- **Minimum trim**: The smallest trim every reel in the plan must leave (e.g., at least 2 cm), so no pattern leaves a sliver that jams the machine
- **Minimum roll cuts**: Don't use a roll unless you can get at least X cuts from it (avoids inefficient partial rolls)
- **Maximum time**: Limit how long the optimizer searches (faster results vs. better optimization)
- **Workers count**: Use more CPU threads for faster solving on multi-core servers

### Forced Roll Widths
Sometimes you need to use a specific roll width (maybe to finish off inventory or meet a specification requirement). You can force a particular layer to use a particular roll width, and Nama optimizes around that constraint.

### Production Integration
This isn't just a planning tool that outputs spreadsheets. Everything flows into Nama's production system:
- Automatic production order generation
- Component lines populated from the cutting plan
- Material issues tied directly to the plan
- Production execution tracks actual consumption vs. plan
- Trim booked as a co-product when the planning configuration names a trim item

### Review and Adjust
Before committing, you can review available quantities per roll width. **Review Available Quantities** lists each reel width with the quantity each layer needs (layers 1 to 7), the total required, the quantity in stock and the shortfall, in the reels' stock unit — usually kilogrammes.

This helps you spot inventory gaps before you commit to a plan you can't execute.

## Who Uses This and When

**Production Planners** use this daily to create weekly or shift-based cutting plans. They batch orders, find companion orders, and optimize material usage.

**Shop Floor Supervisors** review the material issue documents to see exactly which rolls to pull for which jobs.

**Manufacturing Engineers** set up the carton specifications when new products are designed, defining the production stages and material requirements.

**System Administrators** configure the planning settings - optimization parameters, co-product items for trim, numbering schemes.

**Purchasing** checks the **Available Materials** grid of planning documents to see which roll widths are running low and need reordering.

## Common Workflows

**Daily Planning Cycle**:
1. Review pending carton orders
2. Create material planning document
3. Add primary orders to fulfill
4. Search for companion orders to batch
5. Run optimization
6. Review cutting plan and waste %
7. Generate production orders
8. Issue materials
9. Send cutting plan to shop floor

**New Product Setup**:
1. Create carton specification
2. Define physical dimensions
3. Configure first/second/third stage materials
4. Set up routings (operations)
5. Test with a sample order
6. Adjust specifications based on actual results

**Material Availability Check**:
1. Create material planning document
2. Add order to plan
3. Run "Review Available Quantities"
4. See which roll widths have stock
5. Identify shortages before committing to production

## Configuration and Setup

Before you start using carton manufacturing, you need to set up:

**Planning Configuration**: Create at least one configuration defining:
- Minimum roll length to use
- Minimum number of cuts per roll
- Minimum trim allowed
- Maximum search time for optimizer
- Trim co-product item (if you want to track trim as inventory)

**Supporting Master Data** (the lookup files are described on [Carton Lookup Files](/modules/manufacturing/carton-lookup-files)):
- **Carton Types**: Define types with default starch levels
- **Carton Patterns**: Define cutting patterns with formulas
- **Fluting Types**: E-flute, C-flute, B-flute, etc.
- **Corrugating Factors** and **Corrugating Types**: Define corrugation ratios
- **Printing Types**: Presses and their maximum sheet length
- **Molds**: Crease molds and printing molds
- **Items**: Set up inventory items for paper rolls, with the grade in Class 1, the grammage in Class 2 and the reel width in the Box dimension — see [What the Optimizer Matches Reels On](/modules/manufacturing/carton-material-planning#What-the-Optimizer-Matches-Reels-On)

**Document Terms**: Configure terms for (see [Carton Document Terms](/modules/manufacturing/document-terms/mfg-terms-carton)):
- Carton Orders: numbering, and the book and term **Generate Carton Material Planning** creates its planning document in
- Material Planning: **Generated Production Book** and **Generated Production Term**
- Material Issues: **Generated Raw Material Issue Book** and **Generated Raw Material Issue Term**

## Next Steps

Ready to dive deeper? The detailed guides cover:

- **[Carton Specifications](./carton-specifications.md)** - How to define carton products in detail
- **[Carton Orders](./carton-orders.md)** - Creating customer orders and managing sales
- **[Material Planning & Optimization](./carton-material-planning.md)** - The complete guide to the optimization engine
- **[Material Issues](./carton-material-issue.md)** - Issuing materials to production

---

::: tip Why This Matters
Material is typically 60-70% of the cost of a corrugated carton. Reducing waste from 15% to 5% through better planning can increase profit margins by 10-15% or more. The optimization literally pays for itself in saved material.
:::

::: info Navigation
Find carton manufacturing under **Manufacturing > Cartoon** in the menu.
:::
