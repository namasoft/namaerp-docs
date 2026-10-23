---
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Documents & Details Configuration

This page documents the **Documents & Details** tab — how stock document lines are laid out, which dimensions can be entered per line, the extra columns and grids you can add to documents, delivery handling, and warehouse/locator filtering.

![The Documents & Details tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-documents-and-details-en.png)

## Dimensions & Warehouse on Lines

By default a stock document carries one warehouse and one set of accounting dimensions for the whole document. These switches let each **line** carry its own value instead.

**Warehouse in Details** (`value.warehouseInDetails`) — Lets each line carry its own warehouse, so a single document can move items across more than one warehouse.

**Analysis Set / Branch / Sector / Department in Details** — Each lets the corresponding accounting dimension be entered per line rather than only at the header, when different lines belong to different dimensions.

| Option | Field ID |
|---|---|
| Analysis Set in Details | `value.analysisSetInDetails` |
| Branch in Details | `value.branchInDetails` |
| Sector in Details | `value.sectorInDetails` |
| Department in Details | `value.departmentInDetails` |

**Salesman in Details** (`value.salesManInDetails`) — Lets each line carry its own salesman (and, with the option below, governs how the purchases man behaves per line). Use it when commission/attribution must be split among salesmen on one document.

**Salesman from Header if Detail is Empty** (`value.salesManFromHeaderIfDetEmpty`) — Only relevant when *Salesman in Details* is on: a line with no salesman is filled from the header, while a salesman already on the line is kept. With it off, the header value overrides the line whenever the header has one. The same applies to the purchases man.

**Purchases Man in Details** (`value.purchasesManInDetails`) — Shows the purchases man column on document lines (its per-line/header fill behavior follows the salesman options above).

**Apply Warehouse Usage Policies** (`value.applyWarehouseUsagePolicies`) — The company-wide switch for [Warehouse Usage Policies](/modules/supplychain/warehouses-and-locators#Warehouse-Usage-Policy). While it is off, no document is checked against any policy and the policy screen refuses to save.

## Document Behavior

**Quantity Before Value** (`value.quantityBeforeValue`) — Controls column order on the detail grid: when on, quantity columns appear before the value/price columns. A data-entry preference.

**Hide Old Track Quantity Settings from Term Config** (`value.hideTrackQtyFromTermConfig`) *(default on)* — Hides the legacy quantity-tracking settings from the Document Term screen, since the newer mechanism below replaces them. Keep on unless you still rely on the old per-term settings.

**Use System Table to Track Quantities** (`value.useEntriesForTrackQuantities`) *(on in newly created databases)* — Switches quantity tracking (the running "how much of this line has been delivered/satisfied" balance between linked documents) to a dedicated system table maintained automatically as documents are processed and deleted. This is the modern, recommended way to track delivered/remaining quantities across the document chain.

**Allow Non-System Term and Book in Assembly Document Term** (`value.allowNonSystemTermAndBook`) — On the assembly document term, this normally forces issued/received items to use the system-defined book and term. When on, you may assign your own (non-system) book and term for the issue and receipt sides.

**Copy Item Name with Entry and Keep It** (`value.copyItemNameWithEntryAndKeepIt`) — When an item is entered, its name is copied onto the line and kept even if it would otherwise be recomputed — useful when the captured name should be preserved for printing.

**Show To-Item Dimensions in Transfer and Use Them** (`value.showToItemDimensionsInTransfer`) — On stock transfers, shows and uses the destination "to-item" dimensions, so a transfer can map the item's dimensions on the receiving side (e.g. re-labeling color/size on transfer).

**Copy Line Dimensions Using Legacy Method** (`value.copyLineDimensionsUsingLegacyMethod`) — A compatibility switch: copies line dimensions between documents using the older method. Enable only if line-dimension copying must match historical behavior.

**Enable Pick Lines Usage** (`value.enablePickLinesUsage`) — Turns on the picking (pick-lines) workflow for sales documents. Enable when warehouse picking against sales documents is part of your fulfillment.

**Show Final Materials in Multi-Assembly Document** (`value.showFinalMaterialsGridInMultiAssembly`) — Adds a "final materials" grid to the Multi-Assembly document, summarizing the consolidated materials across the assembly.

**Only Add Alternative Material Found in Issued Material When Creating Assembly Alternative Material** (`value.onlyAddAltMaterialFoundInIssuedMaterialInAssemblyDocumentWhenCreatingAssemblyAltMaterial`) — When creating an Assembly Alternative-Material document, restricts the offered alternatives to materials that actually appear in the assembly's issued materials.

**Do Not Multiply Quantities in Assembly Document** (`value.doNotMultiplyQiesInAssemblyDoc`) — Normally, saving an assembly multiplies component quantities by the assembled quantity. When on, the entered component quantities are taken as-is. Use it when you enter absolute component quantities.

**Default Delivery Status** (`value.defaultDeliveryStatus`) — The delivery status automatically stamped on every new sales document (e.g. "Not Delivered"). Leave empty for no default.

**Use Delivery Organization Files** (`value.useDeliveryOrganization`) — Activates the Delivery Organization feature for drivers — the structure linking delivery zones to branches/warehouses and driving delivery/driver tracking. See the [Delivery & Loading guide](../delivery-and-loading.md).

## Document Grids & Extra Columns

These tables add optional grids or columns to specific document types. Each one (unless noted) takes a list of document types and turns the feature on for those types.

**Fields Order** (`value.scGridConfigLines`) *(table)* — The grid carries the title **Fields Order** on screen. It customizes the columns of the line grid on stock documents — which columns appear, their order, and width. Remaining columns are appended afterward.

**Add Quantity Tracking Fields To** (`value.addQtyTrackingFieldsTo`) **/ Add Quantity Tracking Fields To (2)** (`value.addQtyTrackingFieldsTo2`) *(tables)* — Add quantity-tracking columns (requested, satisfied, unsatisfied) to the listed document types' line grids, so staff see the running balance. The second table adds an independent *second* set of tracking columns for documents that need two tracking measures.

**Add Delete-on-Save Field To** (`value.addDeleteOnSaveFieldTo`) *(table)* — Adds a "delete on save" checkbox to each line (plus select-all/unselect-all actions) for the listed document types, so users can mark lines for removal and have them deleted on save.

**Add Gross Weight and Net Weight Fields To** (`value.addGrossWeightAndNetWeightFieldsTo`) *(table)* — Adds gross-weight and tare-weight columns next to the quantity column for the listed document types.

**Dimensions by Suffix** (`value.dimensionsBySuffix`) *(table)* — Lets a piece of text glued to the front or the back of an item code stand for a set of accounting dimensions. Each row holds the text, whether it is a **prefix** or a **suffix**, and the dimensions it means: legal entity, sector, branch, department and analysis set. A row must carry at least one dimension, and the same text cannot appear on two rows. When somebody types or scans a code, the system tries the rows in order; the first one that matches has its text stripped off before the item is looked up, and that row's dimensions are written onto the line. Use it when one physical label has to route the same item to different branches or sectors — `B1-` in front of every code meant for Branch 1, say — so staff scan a single label and the dimension follows automatically.

::: warning This is not barcode encoding
Despite the resemblance, this has nothing to do with reading colors, sizes or lots out of a barcode. That is a separate feature — see [Item Barcode Specifications](./item-barcode-specifications.md). Here the matched text is simply removed from the code and replaced by a set of accounting dimensions.
:::

**Add Generated Docs To** (`value.addGeneratedDocsTo`) *(table)* — Adds a grid (on the screen's last page) listing the documents generated from this one, for the listed document types, so users can see and open downstream documents.

**Add Delivery Table To** (`value.deliveryEntriesFor`) *(table)* — Adds a related-delivery-entries grid onto chosen document types/pages, so deliveries linked to a document can be viewed and managed from its edit screen. Each row chooses the document type, page, and position, and whether to include the document's own and/or the root document's delivery entries.

**Add Delivery Queue Table To** (`value.addDeliveryQueueEntriesTo`) *(table)* — The same idea for the delivery **queue** — adds a delivery-queue grid to chosen document types/pages so queue assignments can be viewed from the document.

**Warehouse Locator Filters** (`value.warehouseLocatorFilters`) *(table)* — Per-document-type rules that limit which warehouses/locators are selectable, optionally restricting to those with available quantity or related to the item, so users only pick from the allowed warehouses/locators for that document type.
