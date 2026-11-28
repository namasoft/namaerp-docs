---
description: "The Raw Materials Issue, Raw Materials Return and Raw Material Change documents that move material to and from a production order: header, lot collection, details grid and what happens on save."
entities: [RawMaterialIssue, RawMaterialReturn, RawMaterialChangeDoc]
menu: Manufacturing → Documents → Raw Materials Issue
---
# Issuing and Returning Raw Materials

## The Document That Actually Moves the Material

A production order plans what a job will consume. A [BOM](/modules/manufacturing/manufacturing-bom) says what the recipe calls for. Neither of them takes anything off a shelf. The document that does — that reduces stock in the store, puts the material into the hands of the job, and makes it part of the product's cost — is the **Raw Materials Issue** (صرف مواد خام).

This is the workhorse of the module. It is the point where a plan stops being a plan.

You'll find it under **Manufacturing → Documents → Raw Materials Issue** (التصنيع ← المستندات ← صرف مواد خام).

![The raw materials issue screen](../../ar/modules/manufacturing/images/raw-material-issue/raw-material-issue-en.png)

The list view shows what has been drawn against which orders.

![The raw materials issue list view](../../ar/modules/manufacturing/images/raw-material-issue/raw-material-issue-list-en.png)

::: info Required license
Raw materials issue, return and change are part of the core `manufacturing` license. If the **Manufacturing** menu is missing altogether, that license is not enabled.
:::

## The Header

**Book** and **Term** are the document's book and its term configuration — the settings that decide how this kind of document behaves and what it does to stock and to the ledger. **Value Date** is the date the movement takes effect.

**Production Order** is required, and it is required for a reason. A raw materials issue is not a general-purpose stock withdrawal; it exists to charge material *to a job*. Without an order, the cost has nowhere to land. Naming the order is what lets the system propose the right components, check them against the plan, and eventually compare planned consumption against actual when the order closes. An issue against an order that is **Closed** or **Terminated** can be neither saved nor deleted: *Production order {0} is closed or terminated*.

Picking the order fills **Item**, **Warehouse** and the item dimensions from the order, and fills the grid with the order's component lines whose **Issue Type** is **Manual** — only those of the header's **Material Classification** when one is set. With **Do Not Calculate RMI From Production Order** ticked in the [manufacturing configuration](/modules/manufacturing/manufacturing-configuration), lines already typed are kept and only an empty grid is filled. Whether the lines carry the full planned quantity or only what is still to be issued is the term's **Copy Remaining Quantity Considering Previously Issued Quantity** ([Raw Material Document Terms](/modules/manufacturing/document-terms/mfg-terms-materials)).

When the production order's term has **Cost Per Batch** ticked, the header **Lot ID** is required too.

**Item** shows the finished product the order is making — filled in from the order, not typed.

**Warehouse** is where the material comes from. In the example above that's the Assembly Raw Materials Store in Cairo. Set it in the header and every line inherits it; override on a line where a component lives somewhere else.

**Work Center** and **Operation Seq.** attribute the issue to a place and a step. The example carries `10` — these materials go in at the first operation. Filling this in is what makes work-in-process meaningful: material consumed at step 10 is sitting in a different place in the process from material consumed at step 30.

**Issue For Finished Product Quantity** works with **From Doc**. When the issue is made from a [production execution](/modules/manufacturing/production-execution), the lines are built from the order's **Manual** components for the quantity each execution line recorded. Fill this field before choosing the execution and it replaces that quantity on every execution line, so the lines carry what that many finished units need: issuing for 10 pipe pairs fills the lines with the components ten units need.

**Production Date** and **Expiry Date** apply where the material carries them. **Material Classification** groups the issue for reporting. **Lot ID**, **Size**, **Color**, **Box**, **Revision ID** and the **Active / Inactive Percentage** pair carry item dimensions where the components use them. **Description** is free text — "Probe material issue" in the example.

### Collect Lots

The **Collect Lots** button sitting above the grid does the tedious part of lot-tracked issuing. Rather than naming lot numbers by hand for every line, it fills the lot on every line from what the header warehouse and locator hold, and first asks whether to clear the lots already entered. It works as on the Stock Issue, described in [Issuing Stock](/modules/supplychain/issuing-stock). On a store holding six lots of the same copper pipe, this is the difference between a thirty-second document and a five-minute one.

## The Details Grid

Each row is one component being issued.

**Operation Seq.** and **Operation** place the line in the process, defaulting from the header.

**Item** and **Code** identify the component. **Material Classification**, **Class 1** and **Class 2** classify it.

**Measures** (**Qty**, **L**, **W**, **H**) and **Item Quantity** (**UOM**, **Value**) carry the quantity. The four measure columns matter for materials bought by dimension — sheet, pipe, cable — where a length and a width are the honest description and a piece count is not.

**Serial** applies to serial-tracked components.

With **Can Issue Materials More Than Order Quantities** switched off in the manufacturing configuration, all the issues against an order together may not take an item, at one operation, past the order's quantity for it plus its permitted percentage; the message and the setting are on [Manufacturing Configuration](/modules/manufacturing/manufacturing-configuration).

::: tip Let the order fill the grid
The fastest way to raise an issue is to name the production order and let the system populate the lines from the order's components — then adjust the two or three rows where reality differs. Typing every line by hand is not just slower; it is how components that should have been consumed quietly get left off a job.
:::

## Raw Materials Return

Material goes out to the floor and some of it comes back. A run finishes early, an order is cancelled, more was drawn than the job needed. The **Raw Materials Return** (ارتجاع مواد خام) puts it back — into stock, and out of the job's cost.

You'll find it under **Manufacturing → Documents → Raw Materials Return** (التصنيع ← المستندات ← ارتجاع مواد خام).

![The raw materials return screen](../../ar/modules/manufacturing/images/raw-material-issue/raw-material-return-en.png)

The screen deliberately mirrors the issue: the same required **Production Order**, the same **Warehouse**, **Work Center** and **Operation Seq.**, the same **Collect Lots** button, nearly the same grid. If you can raise an issue you can raise a return, which is the point of making them look alike. The same closed-or-terminated order rule and the same **Cost Per Batch** Lot ID rule apply. With **Prevent RMR to RM Which Not Issued to Production Order** ticked in the manufacturing configuration, a return may not bring back an item, or more of it, than the order's issues gave out.

The differences: the return's header adds **Locator**, **Measures**, **Serial number** and **Second Serial**, and has no **Issue For Finished Product Quantity** or **Material Classification**; its grid has no **Material Classification**, **Class 1** or **Class 2** columns. Picking the order fills the lines from all of the order's components, whatever their issue type. Those lines come without a warehouse or locator unless **Copy Warehouse From Production Order Lines To Raw Material Return Lines** is ticked in the [manufacturing configuration](/modules/manufacturing/manufacturing-configuration).

::: warning A return is not a correction
If you issued the wrong material, returning it and issuing the right one leaves both movements on the record — which is usually what an auditor wants to see. But if you simply issued the wrong *quantity* on a document raised minutes ago and nothing has been processed against it, correcting the original is cleaner than layering a return on top of it. Decide which story the record should tell before reaching for a return.
:::

## Raw Material Change

The third screen in this family does not move any stock at all. The **Raw Material Change** (تغيير خامة), under **Manufacturing → Documents → Raw Material Change** (التصنيع ← المستندات ← تغيير خامة), is a bulk editor for bills of materials: it finds every BOM that uses one material and swaps in another.

The situation it exists for is a material that is being replaced for good — a supplier discontinues a grade of copper pipe and an equivalent takes its place in forty product recipes. Opening forty BOMs by hand is slow and easy to get half-done. This document does it in one pass and leaves a record of which BOMs were changed, when, and to what.

1. Fill in **Material** (the one being replaced — the only required field) and **Alternative Material** (its replacement). Narrow the search, if you need to, with **From Product Components** / **To Product Components** (a range of BOM codes) and **From Manufactured Item** / **To Manufactured Item** (a range of finished-item codes).
2. Press **Collect Components** (تجميع المكونات). Every BOM in the range whose component lines use the material is added to the grid as a line showing the **BOM**, the **Material Classification**, the **Material** and the **Alternative Material**. Pressing it again adds only BOMs not already listed. Without a material it stops with *Raw material is required* («يجب إدخال الخامة»).
3. Tick **Selected** on the lines you want changed. **Select All** (اختيار الكل), **Unselect All** (إلغاء اختيار الكل) and **Invert Selection** (عكس الاختيارات) work on the whole grid. You can also change the **Alternative Material** on an individual line.
4. Save, then press **Update Items In BOMS** (تبديل الخامات في مكونات المنتجات). For each selected BOM, every component line carrying the material is changed to that line's alternative material and the BOM is saved.

::: warning Saving changes nothing
Saving the document only records the plan. The BOMs change when **Update Items In BOMS** is pressed, and only for the selected lines. Production orders already created keep the components they were created with — the change affects orders built from those BOMs afterwards.
:::

![A Raw Material Change document after Collect Components and Select All](../../ar/modules/manufacturing/images/raw-material-issue/raw-material-change-en.png)

## What Happens After You Save

Saving does not block while stock and ledger effects are worked out. The document is stored immediately and its effects are raised as business requests processed in the background — which is why saving is instant even on a long document. When the raw materials issue's term names a generation book and term, saving also creates a **Stock Issue** from it (the return creates a **Stock Receipt** with its own term's generation book and term); the terms are on [Raw Material Document Terms](/modules/manufacturing/document-terms/mfg-terms-materials).

When an effect fails — a closed period, a stock rule that rejects the movement — the document stays saved and the failed request waits on the **Business Requests** screen; reading and reprocessing it is covered in [Business Requests](/platform/background-processing/business-requests).

## Where This Sits in the Cycle

Materials issued here — less what comes back on returns — are one of the cost streams that meet at [order close](/modules/manufacturing/production-costing). They are counted through the stock issues the raw materials issues generate, so an issue whose term generates no stock issue adds nothing to the order's cost. The other streams are the resources consumed — recorded on a [resource voucher](/modules/manufacturing/manufacturing-resource-voucher) or charged automatically — molds, scrap receipts, and overheads.

When the production order's term has **Calculate Deviations With Save** ticked, the Order Close voucher measures what was actually issued against what the production order planned for each component. The gap is the material variance, and it is the single most useful number the module produces about how a job really went.
