---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# Generation & Dimensions Configuration

This page covers two related areas of the supply-chain **Document Term**: how a document automatically **generates** downstream documents (on commit, or auto/async on save), and how the document's **accounting dimensions** (محددات: branch, sector, department, analysis set) relate to its warehouse.

::: info Where to find it
Open the document's **Document Term** (توجيه), then the **Dimensions**, **Generation**, and **Auto-Generate With Save** groups.
:::

![The Dimensions tab of the Sales Invoice document term](../../../ar/modules/supplychain/images/document-terms/doc-term-generation-and-dimensions-en.png)

## Dimensions

By default a stock document carries one warehouse and one set of accounting dimensions for the whole document. These switches govern how the document's dimensions relate to the warehouse, and how lines pulled from a from-document may be edited.

**Relate Only Once** (`termConfig.relateOnlyOnce`) — A from-document line may be related/pulled into only one document of this type, preventing the same source line from being consumed twice.

**Prevent Modify From Doc Lines** (`termConfig.preventModifyFromDocLines`) — Locks lines that were pulled from a from-document so they can no longer be edited.

**Allow Save Without Details** (`termConfig.allowSaveWithoutDetails`) — Permits saving the document with no detail/line rows.

### Dimension-Must-Match-Warehouse Family

When a dimension *must be as warehouse*, the system forces that accounting dimension on the line/header to equal the warehouse's own dimension — so the document's branch/sector/department/analysis set cannot diverge from the warehouse it moves stock through.

| Option | Field ID |
|---|---|
| Sector Must Be As Warehouse | `termConfig.sectorMustBeAsWarehouse` |
| Branch Must Be As Warehouse | `termConfig.branchMustBeAsWarehouse` |
| Department Must Be As Warehouse | `termConfig.departmentMustBeAsWarehouse` |
| Analysis Set Must Be As Warehouse | `termConfig.analysisSetMustBeAsWarehouse` |

### Allow Different Dimension Than Warehouse (Transfers)

These flags render only for stock transfers and transfer-request documents. Each one relaxes the *must-be-as-warehouse* rule for transfers, letting the corresponding dimension differ from the warehouse's dimension.

**Allow Transfer From And To Multiple Warehouses** (`termConfig.allowMultipleWarehouses`) — Allows a single transfer document to reference more than one source/destination warehouse (stock transfers and transfer-requests, including POS).

| Option | Field ID |
|---|---|
| Allow Different Branch other than Warehouse Branch | `termConfig.allowUseDifferentBranchOfWarehouseBranch` |
| Allow Different Sector other than Warehouse Sector | `termConfig.allowUseDifferentSectorOfWarehouseSector` |
| Allow Different Department other than Warehouse Department | `termConfig.allowUseDifferentDepartmentOfWarehouseDepartment` |
| Allow Different Analysis Set other than Warehouse Analysis Set | `termConfig.allowUseDifferentAnalysisSetOfWarehouseAnalysisSet` |

## Generation

This group controls the downstream documents this document creates when it is committed (or when a manual generation action is triggered). The four core fields are nested under the shared `generationConfigurations` value object; the remaining book/term fields are direct on the term config and appear only for specific document types.

**Generate Document(s)** (`termConfig.generationConfigurations.generateDoc`) *(default off)* — When on, the downstream document(s) are generated automatically on save/commit. Available on documents that have a generation group (Opening Stock, Order Execution, returns, replacement, purchase invoice/return, etc.).

**Manual Generation** (`termConfig.generationConfigurations.manualGeneration`) — Generation is triggered manually (via an action/button) instead of automatically.

**Generation Book** (`termConfig.generationConfigurations.generationBook`) — Book assigned to the generated document.

**Generation Term** (`termConfig.generationConfigurations.generationTerm`) — Term assigned to the generated document.

**Do Not Generate Documents Automatically If Manual Documents Are Found** (`termConfig.generationConfigurations.doNotGenDocsIfManualDocsFound`) — Suppresses auto-generation when a manually-created downstream document already exists.

**Generated Document Type** (`termConfig.generatedDocumentType`) — Target entity type that generation produces, on generation-capable documents.

**Rule Set** (`termConfig.ruleSet`) — A named extra-document-creation rule set that controls which extra documents are spawned and how. Use it when generation logic is more complex than a single fixed target type.

**Save Generated Documents As Draft** (`termConfig.saveGenDocumentsAsDraft`) — Generated documents are saved as drafts rather than committed (New Purchase Forecast).

### Additional-Cost Generation

**Create Receipt Additional Cost With Service Items** (`termConfig.createReceiptAdditionalCostWithServiceItems`) — On generation, creates a Receipt-Additional-Cost document from the invoice's service items (Purchase Invoice).

**Additional Cost Document Book** (`termConfig.additionalCostDocBook`) — Book for the generated additional-cost document (Purchase Invoice, Assembly).

**Additional Cost Document Term** (`termConfig.additionalCostDocTerm`) — Term for the generated additional-cost document (Purchase Invoice, Assembly).

### Replacement / Sales Generation

**Receipt Generation Book** (`termConfig.receiptGenerationBook`) — Book for the stock-receipt document generated by a replacement (Sales Replacement / replacement-request).

**Receipt Generation Term** (`termConfig.receiptGenerationTerm`) — Term for that generated receipt.

**Sales Invoice Book** (`termConfig.salesInvoiceBook`) — Book for the generated sales invoice (Sales Replacement, Order Delivery).

**Sales Invoice Term** (`termConfig.salesInvoiceTerm`) — Term for the generated sales invoice.

**Sales Return Book** (`termConfig.salesReturnBook`) — Book for the generated sales return (Sales Replacement).

**Sales Return Term** (`termConfig.salesReturnTerm`) — Term for the generated sales return.

**Generated Document Types From Sales Replacement Document** (`termConfig.generatedDocsType`) — Selects which document types the replacement produces (return / invoice / receipt combination).

**Sales Coupons Coding Method** (`termConfig.salesCouponsCodingMethod`) — Coding method used when generating sales coupons from the order (Coupons Sales Order).

### Purchase-Forecast Generation

These appear on the New Purchase Forecast document, which generates purchase orders and item/purchase requests.

**Generated Purchase Order Book** (`termConfig.genPurchaseOrderBook`) — Book for the purchase order generated from a forecast.

**Generated Purchase Order Term** (`termConfig.genPurchaseOrderTerm`) — Term for that generated purchase order.

**Generated Item Request Book** (`termConfig.genItemRequestBook`) — Book for the item/purchase request generated from a forecast.

**Generated Item Request Term** (`termConfig.genItemRequestTerm`) — Term for that generated item request.

### Purchase-Order Receipt for Unsatisfied Quantities

These appear on the **Purchase Order** term. When enabled, the order keeps a stock receipt in sync with whatever quantity it still has outstanding — rebuilding it as downstream invoices satisfy the order and deleting it once nothing remains. See [Stock Receipts for the Unsatisfied Part of a Purchase Order](../development-requests/stock-receipt-for-unsatisfied-order-quantities.md) for the full story.

**Generate Stock Receipt For Unsatisfied Quantities** (`termConfig.genStockReceiptForUnsatisfiedQty`) *(default off)* — When on, the purchase order automatically generates and maintains a stock receipt covering its unsatisfied (outstanding) line quantities.

**Stock Receipt Book** (`termConfig.stockReceiptBook`) — Book used for that generated stock receipt. Required when the switch above is on.

**Stock Receipt Term** (`termConfig.stockReceiptTerm`) — Term used for that generated stock receipt. Required when the switch above is on.

### Purchase-Invoice Receipt Dating & Splitting

These appear on the **Purchase Invoice** term and refine the stock receipts the invoice generates from its lines.

**Use From Document Value Date For Receipt** (`termConfig.useFromDocValueDateForReceipt`) — The generated receipt takes its value date from the order the invoice was built on (the from-document), instead of inheriting the invoice's own value date.

**Generate Receipt Document For Each Lines Origin Document** (`termConfig.genReceiptDocsForLinesOriginDocs`) — Groups generated receipts by each line's origin document (the order the line was copied from) in addition to warehouse, so every originating order gets its own receipt rather than one combined receipt per warehouse.

## Auto-Generate With Save

This group renders only for **BasicSCDocument** documents. It is asynchronous, "deferred-save" generation driven by an input-field action — distinct from the commit-time generation group above. Instead of generating on every save, it can produce or update a linked document in the background when a specific field's post-action fires.

**Generate Document With Button Not Save** (`termConfig.generateDocWithActionNotSave`) — The auto-generated document is produced via an explicit button/action rather than on every save.

**Generate Or Update Auto Generated Document Asynchronous With Input Action** (`termConfig.generateOrUpdateDocAsyncWithAction`) — Generates or updates the linked document asynchronously (deferred save) when an input-field action fires.

**Automatic Generated Document Reference Field** (`termConfig.autoGeneratedDocReferenceField`) — The field on this document that stores the reference link to the auto-generated document.

**Async Save With Field** (`termConfig.asyncWithActionFieldId`) — The input field whose post-action triggers the deferred async generation.

**Automatic Generated Type** (`termConfig.autoGeneratedType`) — Entity type of the auto-generated document.

**Automatic Generated Document Book** (`termConfig.autoGeneratedDocBook`) — Book for the auto-generated document.

**Automatic Generated Document Term** (`termConfig.autoGeneratedDocTerm`) — Term for the auto-generated document.

**Creation Date Time Always Start At Hour** (`termConfig.creationAlwaysDateStartAtHour`) — Clamps the generated document's creation datetime so its time-of-day is not earlier than this hour.

**Creation Date Time Always End At Hour** (`termConfig.creationAlwaysDateEndAtHour`) — Clamps the generated document's creation datetime so its time-of-day is not later than this hour.
