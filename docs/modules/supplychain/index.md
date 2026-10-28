---
description: "Overview of the Supply Chain module: how purchasing, stock movement, production and sales documents fit together, how documents work in Nama, and a map of the guides on items, purchases, sales, sub-modules, configuration and reports."
---
# Supply Chain Management

Welcome to the Supply Chain Management module - the heart of how NaMa ERP helps you track, manage, and control the flow of goods through your organization.

## What This Module Does

Think of the Supply Chain module as the central nervous system for everything related to inventory, purchasing, and sales in your business. Whether you're receiving raw materials from suppliers, manufacturing products, selling to customers, or simply moving items between warehouses, this module orchestrates all these activities and ensures everything is properly tracked and accounted for.

## The Big Picture

Let's start with a simple story to understand how everything fits together.

Imagine you run a manufacturing company that makes furniture. Your journey with the Supply Chain module begins when you realize you need wood to make tables. You create a **purchase request** for wood, get **quotations** from suppliers, place a **purchase order**, and when the wood arrives, you create a **receipt document** that brings the wood into your inventory and updates your accounting books automatically.

Now you're ready to make tables. You **issue** the wood to your production department (which reduces your raw materials inventory), and when the tables are ready, you **receive** them back as finished products (which increases your finished goods inventory). The costs of the wood automatically flow into the value of your tables.

When a customer places an order, you create a **sales quotation**, convert it to a **sales order**, then issue a **sales invoice** that records the sale in accounting and issues the table from your warehouse at the same time. The system tracks every step, makes sure you have enough quantity, and helps you reserve items for specific customers.

Throughout this journey, the system does much more than just track numbers; it:
- Makes sure you don't sell what you don't own
- Calculates costs and profits automatically
- Creates accounting entries so your books are always up to date
- Tracks serial numbers and batch numbers when needed
- Manages multiple warehouses and locations
- Handles returns, replacements, and quality control
- Supports multiple units of measure (selling by piece, buying by carton)
- And much more...

## How Documents Work in NaMa ERP

::: tip Understanding Document States
Unlike some systems where a saved document needs a separate step before it takes effect, NaMa ERP works differently:

**Draft Mode**: Create and edit documents with no effect on inventory or accounting. Perfect for preparation and review.

**Saved**: Once a document is saved (out of draft mode), it **immediately** affects:
- Inventory quantities
- Accounting balances
- Customer and supplier accounts
- Available stock calculations

**Edits**: Any changes you make to saved documents appear in the system immediately, with no separate confirmation step needed.
:::

This immediate approach means:
- Real-time inventory accuracy
- Up-to-date accounting at all times
- No delays from periodic batch updates
- Instant visibility of changes

But it also means you need to be careful - once saved (out of draft), a document has a real effect!

## How This Guide Is Organized

The Supply Chain module is large, so we've split it into related groups that follow the way the system organizes itself into sub-modules. You don't have to read them in order; jump to whatever serves your current task.

### Foundations

Before you buy, sell, or store anything, you need to define **what** you deal in and **where** you keep it.

<LandingGrid>
  <LandingCard icon="📦" title="Understanding Inventory Items" link="/modules/supplychain/understanding-items.md" details="Items are the cornerstone: how you define them, classify them (by brand, category, color, size), track them by batch and serial number, and handle multiple units of measure." />
  <LandingCard icon="🛠️" title="Creating and Maintaining Items" link="/modules/supplychain/item-maintenance.md" details="The screens around the item card: opening requests, creating many items at once, the configuration profile that decides how an item is tracked, updating stocking policy, linking items to customers and suppliers, item relations, and storage allocation." />
  <LandingCard icon="🏷️" title="Item Classification Files" link="/modules/supplychain/item-classification-files.md" details="The master files behind the classification slots: item classes 1–10, sections and brands, colours and sizes, revisions, the size/colour matrix, and assortments." />
  <LandingCard icon="📏" title="Units of Measure" link="/modules/supplychain/units-of-measure.md" details="Units, unit groups, conversions and standard measures: choosing a base unit, and setting up an item you buy by the carton and sell by the piece." />
  <LandingCard icon="🏬" title="Warehouses & Locators" link="/modules/supplychain/warehouses-and-locators.md" details="Where your stock physically lives: warehouses and their groups, locators within each warehouse, and linking items to their preferred warehouses." />
  <LandingCard icon="🧾" title="The Anatomy of a Supply Chain Document" link="/modules/supplychain/the-document-screen.md" details="The parts every document screen shares — header, lines grid, dimensions, the term behind it, pricing and totals, sub-items, and the Collect/Apply pair — worked through the sales invoice." />
</LandingGrid>

### Stock Movement

Everything that enters your inventory, leaves it, or moves around inside it.

<LandingGrid>
  <LandingCard icon="📥" title="Receiving Stock" link="/modules/supplychain/receiving-stock.md" details="All the ways items enter your warehouse: stock receipts, opening balances, and initial receipts." />
  <LandingCard icon="📤" title="Issuing Stock" link="/modules/supplychain/issuing-stock.md" details="Issuing items to production, internal use, or writing off damaged goods." />
  <LandingCard icon="🔄" title="Moving Stock Between Warehouses" link="/modules/supplychain/moving-stock.md" details="Two-sided stock transfers (issue and receipt) and aggregated transfers." />
  <LandingCard icon="📋" title="Stock Taking" link="/modules/supplychain/stock-taking.md" details="Physical counting through start/end stock-taking documents, electronic counting, and reconciling differences." />
  <LandingCard icon="💲" title="Inventory Costing & Revaluation" link="/modules/supplychain/inventory-costing.md" details="Cost revaluation, additional costs on receipts, and freezing cost at period close." />
</LandingGrid>

### Purchases

<LandingGrid>
  <LandingCard icon="🛒" title="The Purchasing Journey" link="/modules/supplychain/purchasing-journey.md" details="The full purchase cycle: item request, quotation request, quotation, purchase order, receipt, purchase invoice, returns, and purchase price lists and comparisons." />
  <LandingCard icon="🏷️" title="How a Purchase Price Is Decided" link="/modules/supplychain/purchase-pricing.md" details="How a purchase price is arrived at: purchase price lists, vendor discounts and their eight slots, and invoice classification." />
  <LandingCard icon="🔮" title="Purchase Forecast" link="/modules/supplychain/purchase-forecast.md" details="Estimating future needs based on sales history or other quantity sources." />
</LandingGrid>

### Sales

<LandingGrid>
  <LandingCard icon="🤝" title="The Sales Journey" link="/modules/supplychain/sales-journey.md" details="From quotation to sales order to delivery to invoice, then returns and replacement." />
  <LandingCard icon="🗂️" title="Sales and Purchase Operations Documents" link="/modules/supplychain/sales-operations-documents.md" details="The small documents around the sales cycle: shortages, replacement requests, reservation cancellation, salesman and status changes, sales limits and discount updates." />
  <LandingCard icon="🎟️" title="Pricing, Offers & Coupons" link="/modules/supplychain/pricing-offers-and-coupons.md" details="Sales price lists, offers and free items, post-sales offers, coupons, and automatic pricing." />
  <LandingCard icon="🎯" title="Offer Apply Rules" link="/modules/supplychain/offer-apply-rules.md" details="The reusable line filter that decides which lines of a document an offer or coupon is measured against, and what happens when it matches nothing." />
  <LandingCard icon="🔖" title="Sales Price Classifiers" link="/modules/supplychain/sales-price-classifiers.md" details="The five extra price dimensions — trim, shift, channel — that price lists, offers and discounts can match on, and the dated extra prices contracting price lists add." />
  <LandingCard icon="👥" title="Customer and Supplier Classes" link="/modules/supplychain/customer-and-supplier-classes.md" details="Customers' Class, Customer Class 1–5, Customer Category and Suppliers' Class: what each holds and which price lists, offers, item links and limits read them." />
  <LandingCard icon="🔒" title="Comprehensive Reservation System Guide" link="/modules/supplychain/reservation-system-guide.md" details="How the system reserves items for specific customers and tracks reserved quantities." />
  <LandingCard icon="🚚" title="Delivery & Loading" link="/modules/supplychain/delivery-and-loading.md" details="Delivery and loading documents, delivery queues, driver setup, and pick rules." />
</LandingGrid>

### Specialized Sub-Modules

<LandingGrid>
  <LandingCard icon="🧩" title="Assembly & Packaging" link="/modules/supplychain/assembly-and-packaging/" details="Bills of materials (BOM), assembly documents, packaging methods, and processing." />
  <LandingCard icon="✅" title="Quality Control" link="/modules/supplychain/quality-control.md" details="Quality control and assurance documents, checklists, and integration with receiving and production." />
  <LandingCard icon="📜" title="Letters of Credit" link="/modules/supplychain/letters-of-credit.md" details="The letter-of-credit lifecycle: opening, shipments, costs, and expenses." />
  <LandingCard icon="⚖️" title="Weight Scale" link="/modules/supplychain/weight-scale.md" details="Weight scale configuration and the preparation documents tied to it." />
  <LandingCard icon="🧪" title="Specialized Scenarios" link="/modules/supplychain/specialized-scenarios.md" details="Other cases such as glass job orders, automatic document-generation rules, and tenders." />
</LandingGrid>

### Setting the Rules

Everything above behaves the way two settings files tell it to. When the system does something you did not expect — a cost calculated differently, a quantity refused, a price picked from the wrong list — the answer is almost always in one of these.

<LandingGrid>
  <LandingCard icon="⚙️" title="Supply Chain Configuration" link="/modules/supplychain/configuration/" details="the single module-wide configuration file, with one reference page per tab: costing, overdraft and quantity checking, pricing and price lists, purchasing, sales and offers, stock taking, item properties, barcode specifications, and more." />
  <LandingCard icon="📑" title="Document Terms" link="/modules/supplychain/document-terms/" details="the term attached to each document type, which decides what it copies from its source document, how it tracks and reserves quantity, how it prices, taxes and discounts its lines, what it records in the general ledger, and which documents it generates. One reference page per tab." />
</LandingGrid>

### Reports

<LandingGrid>
  <LandingCard icon="📊" title="Supply Chain and Sales Reports" link="/modules/supplychain/supplychain-reports.md" details="the catalogue of the shipped inventory, purchasing, sales and point-of-sale reports: item movement statements, balances and valuation, overdraft checks, purchase and sales detail, profitability, year comparisons and customer statements." />
</LandingGrid>

### Questions & Answers

<LandingGrid>
  <LandingCard icon="❓" title="Supply Chain FAQ" link="/modules/supplychain/supply-chain-faq.md" details="the questions support is asked most about distribution, warehousing, sales and purchasing, each with a worked answer." />
</LandingGrid>

::: info Point of Sale Has Its Own Module Now
The Point of Sale (POS) guides have moved to the standalone [Point of Sale module](/modules/pos/). There you'll find the guides for fingerprint login, free items in POS, and technical points of use.
:::

### Development Request Notes

Some client requests change how a core part of the module behaves in ways worth explaining on their own. The **[Development Request Notes](./development-requests/)** section keeps the story behind those changes — the business problem, what the feature does, and when to enable it.

<LandingGrid>
  <LandingCard icon="📅" title="Ignoring Specific Warehouses or Locators in the Reservation Quantity Check by Date" link="/modules/supplychain/ignore-reservation-qty-check-by-date.md" details="how to keep a warehouse or locator out of the available balance the by-date check uses, for reservations only." />
</LandingGrid>

## A Note About Document Types

As you read this documentation, you'll encounter many "document" types like PurchaseInvoice, StockReceipt, SalesOrder, and others. Don't let that confuse you!

Think of them as different kinds of forms you fill out to record different business events. Just like in a paper system where you have a "purchase order form" and a "goods receipt note," the system has different document types for different purposes.

Each document type is designed for a specific business transaction and contains exactly the fields and features appropriate to it. But they all follow similar patterns, so once you understand a few, the rest become intuitive.

## Integration with Other Modules

The Supply Chain module doesn't work in isolation; it's deeply integrated with:

**Accounting**: Every inventory transaction creates accounting entries automatically. When you receive purchases, the inventory asset rises and payables rise. When you sell, revenue rises and inventory falls. No need to think about it - it happens on its own.

**Manufacturing**: When you issue raw materials to production and receive finished products, the system tracks costs and ensures materials are available for production orders.

**CRM**: Sales quotations and orders can originate from CRM opportunities, and customer service cases can trigger returns and replacements.

**Fixed Assets**: Some items you buy become fixed assets rather than inventory. The system handles this distinction automatically.

**Hospital Management**: Pharmacies, blood banks, and medical supplies have special requirements that the system handles in a built-in way.

## Let's Get Started

Ready to dive in? Start with [Understanding Inventory Items](./understanding-items.md) to build your foundation, or jump straight to the section that matches what you're trying to accomplish right now.

Remember: this documentation focuses on helping you understand **how** and **why** the system works the way it does, not just listing features. If you're looking for a specific field or technical detail, those references live elsewhere. Here, we tell the story of your supply chain.

::: tip Navigation Tip
Use the sidebar to move between modules, and don't feel obligated to read everything in order. Each section is written to stand on its own while building on the core concepts introduced here.
:::
