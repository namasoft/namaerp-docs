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

When a customer places an order, you create a **Carton Order**. It's a sales document - customer, quantities, prices, delivery terms - but with carton-specific details.

Each order line references a carton specification and states the quantity needed. Behind the scenes, Nama automatically creates "manufacturing details" - the actual production requirements. If you ordered an assembled carton made of three components, the manufacturing details will show all three components need to be produced.

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

**Companion Orders**: Here's a powerful feature. Say you have one order to plan, but you know there are other pending orders for similar cartons. Click "Find Companion Orders" and Nama searches all unplanned orders, finds ones with compatible specs (same layers/grades), and calculates which companion order would give you the best material efficiency if you batched them together.

You see a list sorted by total waste - the orders that would waste the least material appear first. Accept the one you want (maybe based on customer priority), and Nama adds it to your planning document. Run optimization again, and now you're cutting multiple orders from shared rolls, minimizing waste across the batch.

### 4. Execute Production

Once planning is done, you can:

**Generate Production Orders**: Nama creates production orders for each carton spec in the plan. The production order includes:
- Bill of materials (BOM) - exactly which rolls to issue, in which quantities, from which lots
- Routings - the operations to perform (corrugating, slotting, printing, etc.)
- Co-products - if you configured trim as a co-product item, it's tracked

**Issue Materials**: Create **Carton Material Issues** to withdraw the planned rolls from inventory and allocate them to production. The material issue references the planning document, so you know exactly which materials are for which cutting plan.

**Track Production**: Use standard Nama production execution to record actual work as it happens on the shop floor.

## The Optimization Algorithm: What Happens Behind the Scenes

When you click "Collect Materials," Nama isn't doing simple arithmetic. It's solving what computer scientists call a "bin packing problem with multiple dimensions and constraints" - which is NP-hard (meaning there's no quick formula, you have to search for solutions).

Here's what the algorithm does:

**1. Gather candidate rolls**: For each layer of each carton spec, Nama queries inventory to find all rolls that:
   - Match the required item classes (paper grade, color, etc.)
   - Are wide enough to fit the carton sheet width plus minimum trim
   - Are long enough to be worth cutting
   - Meet minimum roll length requirements from your planning configuration

**2. Calculate possibilities**: For each candidate roll and each carton order:
   - How many pieces can we fit across the width (strikes)?
   - How many times can we cut along the length (operations)?
   - What's the trim waste (roll width minus total piece width)?
   - Does this meet minimum trim requirements?

**3. Group compatible orders**: If you have multiple orders, Nama looks for rolls that could serve multiple orders simultaneously (cutting different products from the same roll, side by side).

**4. Set up constraints**:
   - Each order must get the full quantity requested (or as close as possible)
   - Each roll has a maximum available quantity
   - Trim must meet minimum requirements
   - Number of different lengths per sheet is limited (reduces setup complexity)
   - Total cutting operations should be reasonable

**5. Define the objective**: Minimize total waste (trim) plus the number of rolls used (to reduce setup changes).

**6. Solve with constraint programming**: Nama uses the CP-SAT solver from Google OR-Tools - an industrial-strength optimizer used in logistics, scheduling, and manufacturing worldwide. You can configure solver parameters:
   - Max time to search for a solution (default 10 minutes)
   - Number of CPU threads to use (parallelizes the search)
   - Max different lengths per sheet

The solver searches through millions of possible cutting plans, applying constraints to eliminate invalid solutions, and finding the plan that minimizes waste.

**7. Return results**: Nama shows you:
   - **Optimal solution**: The best possible plan found (if solver had enough time)
   - **Feasible solution**: A good plan (if time limit hit before proving optimality)
   - **No solution**: Can't fulfill the order with available materials

You see the exact cutting plan: which rolls, how many strikes, how many operations, which lots, total quantities.

## Real-World Example

Let's walk through a realistic scenario to see how this all works together.

**Your situation**: You manufacture corrugated cartons for produce packaging. You have three production stages:
- Stage 1: Corrugating (laminating facing to fluting to liner)
- Stage 2: Printing and slotting (cutting flaps and slots)
- Stage 3: Stitching and bundling

**Your inventory**: You have rolls of:
- Kraft facing paper, 2000mm width, various lots
- C-flute medium, 2000mm width
- Test liner, 1800mm and 2000mm widths

**Customer Order #1**: A produce company wants 5000 cartons, spec "Tomato Box 250" which needs:
- Finished dimensions: 250mm × 200mm × 150mm
- Sheet dimensions: 520mm width × 440mm length
- Layer 1: Kraft facing 125gsm
- Layer 2: C-flute
- Layer 3: Test liner 150gsm

::: tip These figures are in millimetres; Nama's screens are not
Reel widths and sheet sizes are quoted in millimetres throughout this overview, because that is how the trade talks about them. Nama's own carton screens work in **centimetres** — a 2,000 mm reel is recorded as `200`, and a 520 × 440 mm blank as `52` × `44`. Getting that wrong is the commonest reason a plan finds no solution; [Carton Material Planning](./carton-material-planning.md) explains why.
:::

**The traditional approach**: You'd manually calculate: 2000mm roll ÷ 520mm = 3.84, so cut 3 pieces across (1560mm used, 440mm trim - 22% waste). Then figure out how many cuts along the length to hit 5000 pieces total.

**The Nama approach**: Create a carton specification for "Tomato Box 250" defining all those parameters. Create a carton order for 5000 units. Create a material planning document, add the order, hit "Collect Materials."

Nama searches and finds: "If you cut 4 pieces across a 2100mm roll (using a wider roll you have one lot of), waste drops to 5mm per piece. And I found pending Order #847 for a 480mm wide carton - if you cut that alongside your 520mm order on the same roll (520 + 480 = 1000mm, fit 2 pairs across a 2000mm roll with minimal trim), total waste is just 3%."

You review the companion order, see it's for another produce customer whose delivery is also next week, accept it. Nama generates the cutting plan, you generate production orders, issue materials from the exact lots Nama specified, and production executes the plan.

Result: You just reduced waste from 22% to 3% and got two orders done in the same setup time. That's real money saved and faster throughput.

## Key Features That Make This Powerful

### Multi-Layer Intelligence
Cartons aren't one-dimensional. A 3-layer corrugated board has facing, fluting, and liner - each potentially from different rolls, different grades, different widths. Nama optimizes each layer independently, finding the best roll for each layer's specific requirements.

### Lot Tracking
Paper quality varies by lot. Maybe Lot A2024-001 has slightly better strength than A2024-002. Nama tracks which specific lots go into which production orders, giving you full traceability if quality issues arise.

### Flexible Constraints
You control the trade-offs:
- **Minimum trim**: Don't allow cuts that waste too much (e.g., no cuts with less than 50mm trim)
- **Minimum roll cuts**: Don't use a roll unless you can get at least X cuts from it (avoids inefficient partial rolls)
- **Maximum time**: Limit how long the optimizer searches (faster results vs. better optimization)
- **Workers count**: Use more CPU threads for faster solving on multi-core servers

### Forced Roll Widths
Sometimes you need to use a specific roll width (maybe to finish off inventory or meet a specification requirement). You can force a particular layer to use a particular roll width, and Nama optimizes around that constraint.

### Production Integration
This isn't just a planning tool that outputs spreadsheets. Everything flows into Nama's production system:
- Automatic production order generation
- BOM lines populated from the cutting plan
- Material issues tied directly to the plan
- Production execution tracks actual consumption vs. plan
- Costing captures trim waste as co-product or scrap

### Review and Adjust
Before committing, you can review available quantities per roll width. Nama shows: "For 2000mm rolls, I have 25,000 linear meters available across layers 1-3. For 1800mm rolls, I have 12,000 meters in layer 1 only."

This helps you spot inventory gaps before you commit to a plan you can't execute.

## Who Uses This and When

**Production Planners** use this daily to create weekly or shift-based cutting plans. They batch orders, find companion orders, and optimize material usage.

**Shop Floor Supervisors** review the material issue documents to see exactly which rolls to pull for which jobs.

**Manufacturing Engineers** set up the carton specifications when new products are designed, defining the production stages and material requirements.

**System Administrators** configure the planning settings - optimization parameters, co-product items for trim, numbering schemes.

**Purchasing** monitors the "Available Materials" report to see which roll widths are running low and need reordering.

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

**Supporting Master Data**:
- **Carton Types**: Define types with default starch levels
- **Carton Patterns**: Define cutting patterns with formulas
- **Fluting Types**: E-flute, C-flute, B-flute, etc.
- **Corrugating Factors**: Define corrugation ratios
- **Molds**: Crease molds and printing molds
- **Items**: Set up inventory items for paper rolls with item classes for grades

**Document Terms**: Configure terms for:
- Carton Orders (auto-numbering, accounting effects)
- Material Planning (generation settings)
- Material Issues (warehouse defaults, accounting)

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
