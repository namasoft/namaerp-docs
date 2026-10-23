---
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Items & Master Data Configuration

This page documents the **Items & Master Data** tab — settings that affect the item master, item codes and coding, item search (including button/level browsers), the item–warehouse–locator relationships, and item links to customers and suppliers.

![The Items & Master Data tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-items-and-master-data-en.png)

## Items

**Activate Item Categories** `value.activateItemCategories` *(default on)* — Turns on the item-category field so items can be assigned to categories. Turn off to hide it when unused.

**Activate Item Classes** `value.activateItemClasses` *(default on)* — Turns on the item-classification fields (Item Class 1–10) on the item and across documents, so items can be grouped into classification hierarchies.

**Show Item Classes Relations** `value.showItemClassesRelations` — Reveals the "relations" grid on item classes, letting you define links between class levels (e.g. to filter one class by another).

**Allow Update Base UOM if Item has transactions** `value.allowUpdateItemUOMInTrans` — Allows changing an item's base unit of measure even after it has stock transactions (normally locked because it affects costing and historical quantities). Use only for careful corrections.

**Allow Update Rate To Base if Item has transactions** `value.allowUpdateRateToBaseInTrans` — Allows changing a unit's conversion rate to the base unit after the item has transactions. Affects how past quantities convert — use with caution.

**Allow Duplicate Details in Item** `value.allowDuplicateItemDetails` — Permits duplicate rows in the item's detail grids, which the system normally rejects.

**Allow Editing Item Name** `value.allowEditingItemName` — Lets users edit the item name/description directly on a document line instead of it being fixed from the item master.

**Allow Changing Item Type from Service to Stock and Vice-Versa After Use** `value.allowChangeItemTypeFromServiceToStockAndOppositeAfterUsingIt` — Allows switching an item between "service" and "stock" type even after it has been used in stock documents (normally blocked because the type governs whether the item carries balances). Use only to correct a wrongly-typed item.

**Allow Receipt of Service Items** `value.allowReceiptServiceItems` — Allows service-type items to appear on stock receipt/return documents, which are otherwise meant for stock items only.

**Do Not Include Service Items in Items Count Offers** `value.doNotIncludeServiceItemsInItemsCountOffers` — Excludes service items from count-based promotions, so only physical stock items count toward them.

**Show Item Substitute if No Quantity** `value.showItemSubstituteIfNoQty` — When the requested item has no available balance, the system surfaces its defined substitute item(s) so an alternative can be sold/issued.

**Price by Item Class** `value.priceByItemClass` — When set to a specific class level, pricing is resolved at the **item-class** level rather than per individual item — the system reads the chosen class from each item to find the applicable price. Use when a whole class shares a price.

**Use Size and Color Attachment as Image in POS** `value.useSizeAndColorAttachmentAsImageInPOS` — In POS, uses the attachment defined on the item's size/color combination as the displayed product image, so each variant can show its own picture.

**Do Not Copy Code When Convert to Item** `value.doNotCopyCodeWhenConvertToItem` — When converting an item-open-request into an actual item, the request's code is not carried over — a fresh code is assigned by the item's own coding rules.

**Ignore Quantity Tracking with Document Delete** `value.ignoreQtyTrackingWhithDocumentDelete` — Controls whether the quantity-tracking figures shown on document lines are recalculated when a document is deleted; when on, deletion skips that recalculation.

## Item Codes & Coding Formula

**Stop Using Alt-Code in Items** `value.stopUsingAltCodeInItems` — Disables the alternative-code feature on items entirely, so the alt-code field is no longer used for entry or search.

**Neglect Customer-Assigned Codes in Item** `value.neglectCustAssignedCodesInItem` — Item search ignores the codes customers use for the item, so they are not treated as part of the item's searchable codes.

**Neglect Supplier-Assigned Codes in Item** `value.neglectSuppAssignedCodesInItem` — The same for supplier-assigned item codes.

**Use Custom Item Codes as Alternative Code** `value.useCustomItemCodesInItemSearch` *(default on)* — Lets custom item codes be matched when searching/scanning for an item. Turn off to restrict search to the main item code only.

**Allow Empty Warranty Code** `value.allowEmptyWarrantyCode` — Permits saving an item/line without a warranty code where one would otherwise be required. Enable when warranty tracking is optional.

**Item Coding Formula — Name 1 / Name 2 for Color & Size, Name 1 / Name 2 for Revision** — Formula strings that auto-generate the Arabic name (Name 1) and English name (Name 2) of generated size/color combinations and revision records. Set them when you auto-generate variants and want their names composed by a formula. *(These belong to the shared item-coding configuration.)*

| Name | Field ID |
| --- | --- |
| Name 1 for Color & Size | `value.info.itemCodingFormula.szName1Formula` |
| Name 2 for Color & Size | `value.info.itemCodingFormula.szName2Formula` |
| Name 1 for Revision | `value.info.itemCodingFormula.rvName1Formula` |
| Name 2 for Revision | `value.info.itemCodingFormula.rvName2Formula` |

## Item Search & Buttons

**Allow Item Search by Barcode Specification** `value.allowItemSearchByBarCodeSpecification` — Enables parsing a scanned barcode through the configured Item Barcode Specifications when searching for an item, so a single scanned string yields the item code plus properties/quantity. Required for the [Item Barcode Specifications](./item-barcode-specifications.md) to take effect.

**Search for Item Coupons in Sales by Item Code** `value.searchForItemCouponsInSalesByItemCode` — In sales, entering an item code also looks up item coupons keyed to that code.

**Show Item Selection Dialog if Barcode Does Not Exist** `value.showItemSelectionDialogIfBarcodeDoesNotExist` — If a typed/scanned code doesn't match exactly, a dialog opens listing items whose code *starts with* the entered value, instead of a "not found" error.

**Item Button Width / Height** `value.itemButtonWidth`, `value.itemButtonHeight` — The on-screen size of the item buttons in the touch/button-style item search.

**Show Items as Buttons in Last Search Level** `value.showItemsAsButtonsInLastSearchLevel` — In the multi-level item browser, the final level shows items as clickable buttons instead of a list — useful for touch selection.

**Max Item Buttons to Show in Search** `value.maxItemButtonsToShowInSearch` — Caps how many item buttons render in the button-style search level, so very large lists don't overwhelm the screen.

**Filter Item Level Lines by User Dimensions** `value.filterItemLevelLinesByUserDimensions` — Filters the first item-search level by the current user's dimensions (e.g. their branch/sector), so each user only sees relevant entries.

**Item Levels** `value.itemLevels` *(table)* — Defines the multi-level (favourites) item-search hierarchy. Each line maps up to five levels: the first can be an item section/brand/category or any Item Class 1–10, and levels 2–5 are favourite item-level values. This drives the drill-down/touch item picker.

## Warehouse & Locator

**Activate Item Warehouse Relation** `value.activateItemWarehouseRelation` — Activates a defined relationship between items and warehouses (which items belong in which warehouses), used to filter and validate item–warehouse combinations.

**Item Relation to Warehouse Must Be Specified** `value.itemRelationToWarehouseMustBeSpecified` *(default on)* — When item–warehouse relations are active, requires the relation to be explicitly defined; an item with no defined relation to the warehouse is rejected.

**Do Not Add Locator to Warehouse** `value.doNotAddLocatorToWarehouse` *(default on)* — Prevents the system from auto-adding a newly used locator to the warehouse's locator list, keeping warehouse locator lists controlled. Turn off to auto-register locators as they are used.

**Allow Update Locator Policy if Warehouse has Transactions** `value.allowUpdateLocatorOfWarehouseInTrans` — Allows changing a warehouse's "use locators" policy even after it has stock movements (normally locked). Use cautiously.

**Allow Changing Warehouse Legal Entity** `value.allowChangingWareHouseLegalEnt` — Allows changing the company assigned to a warehouse (normally locked because it affects ownership and accounting of the stock held there). Use only for corrections.

**Filter Locator Based on Subsidiary / Customer** `value.filterLocatorBasedOnSubsidiary`, `value.filterLocatorBasedOnCustomer` — Filters the locator dropdown on a document line by the line's subsidiary (account) or by the document's customer, when locators are reserved per subsidiary/customer.

**Enable Locators Filtering by Item Storage Allocation Files** `value.enableLocatorsFilteringByItemStorageAllocationFiles` — Filters the available locators for an item using dedicated storage-allocation files that define which items may be stored in which locators.

## Item Links to Customers & Suppliers

These options restrict which items may be sold to a customer or bought from a supplier, by linking items to customers/suppliers and filtering or validating accordingly.

**Link Items to Customers / Suppliers in Documents** `value.linkItemsToCustomers`, `value.linkItemsToSuppliers` — Activates a link between an item and a single customer (sales/issue documents) or supplier (purchase documents); the item list is filtered to the items linked to that party.

**Link Items to Multiple Customers / Suppliers** `value.linkItemsToMultipleCustomers`, `value.linkItemsToMultipleSuppliers` — Extends the link so an item can be linked to several customers or suppliers rather than just one. The links are recorded on the [Item Customer Link and Item Supplier Link screens](../item-maintenance.md), not on the item itself, and a link to a customer's group or customer class counts as a match for every customer in it.

**Link Items to Multiple Customers / Suppliers Without Nulls** `value.linkItemsToMultipleCustomersWithoutNulls`, `value.linkItemsToMultipleSuppliersWithoutNulls` — Refines the "multiple" options: items with **no** linked customers/suppliers are excluded from the filtered list (treated as "available to none" rather than "available to all"). Effective only with the matching "multiple" option on.

**Check Items Relationship to Customers and Suppliers When Saving** `value.checkItemsRelatedToCustomersOrSuppliers` — Enforces the links at save time: a document cannot be saved if it contains an item not linked to its customer/supplier (a hard block, not just a filtered search).

**Do Not Save if Customer Not Allowed to Use Item** `value.doNotSaveIfCustomerNotAllowedToUseItem` — Blocks saving a sales/issue document when the customer is not allowed to use one of its items.

**Activate Relationships of Items in Next Docs** `value.activateRelationshipsOfItemsInNextDocs` *(table)* — Lists the document types in which these item relationships are enforced in downstream documents. Only the document types added here honor the relationships.
