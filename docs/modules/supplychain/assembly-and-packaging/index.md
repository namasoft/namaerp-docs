---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Assembly & Packaging
description: "Landing page for assembly and packaging under Inventory → Assembly Documents: Assembly BOMs, Assembly Request, Assembly Document, Multi Assembly Document and Aggregated Packaging Document."
---

# Assembly & Packaging

Not everything you sell is bought ready to sell. A computer shop buys a case, a motherboard, memory and a drive, and sells a finished PC. A coffee roaster buys a 60 kg sack and sells 250 g bags. A packer receives loose goods and ships them in cartons on pallets. In every one of these cases stock goes **in** as one set of items and comes **out** as another, and the cost of what went in has to land on what came out.

That is what the assembly screens do. They are the "light manufacturing" inside the supply chain: no work orders, routings or production stages, just a recipe, a document that consumes the ingredients and receives the result, and a cost that follows the stock. When you need production orders with stages, labour and overhead, that is the [Manufacturing module](/modules/manufacturing/).

All the screens live in one menu, **Inventory → Assembly Documents**, and need the `supplychain-assembly` licence.

## How the pieces fit

Think of it in three layers:

1. **Recipes** — master files that say what a product is made of. The central one is the **Assembly BOM** (*طريقة تجميع أصناف*): one finished item, the components and quantities it needs, the by-products it gives off, and the warehouses it is usually built in. Components, alternative materials, packaging methods and assembly process files all hang off it.
2. **Doing the work** — documents that move stock. The **Assembly Document** (*سند تجميع*) is the workhorse: it issues the components and receives the finished goods by generating a Stock Issue and a Stock Receipt behind the scenes. An **Assembly Request** (*طلب تجميع*) can come first as the plan.
3. **Doing it at scale** — documents that drive many assemblies at once: the **Multi Assembly Document** (*سند تجميع متعدد*) builds a multi-level product by generating one assembly document per level, and the **Aggregated Packaging Document** (*سند تعبئة متعدد*) handles a day's packing line in one go. The **Processing Document** (*سند معالجة*) records a run on a machine with raw materials, consumables, outputs and machine costs.

Whatever the document, the inventory effect is always done by ordinary Stock Issues and Stock Receipts that the document generates and links back to itself — so item movement reports, cost and balances see assembly exactly as they see any other issue and receipt.

## The pages

<LandingGrid>
  <LandingCard icon="📋" title="Assembly BOMs, Components & Packaging Methods" link="/modules/supplychain/assembly-and-packaging/assembly-boms-and-components.md" details="The recipe and everything that hangs off it: components, partial BOMs, alternative materials and packaging methods." />
  <LandingCard icon="🔧" title="Assembly Requests & Assembly Documents" link="/modules/supplychain/assembly-and-packaging/assembly-documents-and-requests.md" details="Issuing components and receiving finished goods: the generated documents, the term settings, by-products, expenses, disassembly and how cost is split." />
  <LandingCard icon="🏗️" title="Multi-Level and Aggregated Assembly" link="/modules/supplychain/assembly-and-packaging/multi-level-and-aggregated-assembly.md" details="Building a product with sub-assemblies level by level, and packing a whole day's output in one aggregated document." />
  <LandingCard icon="⚙️" title="Processing Documents & Assembly Machines" link="/modules/supplychain/assembly-and-packaging/processing-documents-and-machines.md" details="A machine run: raw materials, consumables, outputs, machine costs and direct labour, set up once on the machine file." />
</LandingGrid>

## The screens at a glance

| Screen | Arabic name on screen | What it is |
|---|---|---|
| Assembly BOM | طريقة تجميع أصناف | The recipe of one finished item |
| Components | مكون | A set of interchangeable items used as one line of a BOM |
| Partial Assembly BOM | طريقة تجميع جزئية | A recipe fragment for an item classification, used to generate full BOMs |
| Assembly Alternative Material | خامات التجميع البديلة | A substitution plan for a BOM's classified materials |
| Packaging Method File | ملف طريقة تعبئة | The packing materials for one package |
| Assembly Process File | ملف عملية تجميع | Expense items charged automatically to an assembly |
| Assembly Request | طلب تجميع | The planned assembly, before any stock moves |
| Assembly Document | سند تجميع | Issues components, receives finished goods |
| Multi Assembly Docuemnt | سند تجميع متعدد | Generates one assembly document per BOM level |
| Aggregated Packaging Document | سند تعبئة متعدد | A day's packing output with cartons, pallets, sorting and waste |
| Assembly Machine | ماكينة تجميع | A machine's standard materials, outputs and costs |
| Processing Document | سند معالجة | One run of a machine |

The menu spells the multi-assembly screen *Multi Assembly Docuemnt*; that is how it appears on screen.

## Related pages

- [Inventory Costing & Revaluation](../inventory-costing.md) — how the cost of the received goods is built up, and the Receipt Additional Cost document the expense lines become
- [Document-Specific Options — Assembly / Multi-Assembly](../document-terms/doc-term-document-specific.md#Assembly--Multi-Assembly) — the reference list of the assembly term options
- [Quality Control](../quality-control.md)
- [Manufacturing module](/modules/manufacturing/) — full production with orders and stages
