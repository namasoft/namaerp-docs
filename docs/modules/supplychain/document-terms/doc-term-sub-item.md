---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# Sub-Item Configuration

A **sub-item** (الصنف الفرعي) is a serialized/tracked sub-unit of an item that carries its own warehouse, locator, taxes, status and back-links to the documents that created or touched it. The options on this tab control what header/line data a document writes into the sub-item record, how taxes are copied to and from it, and how sub-items are spread and filtered.

::: info Where to find it
Open the document's **Document Term** (توجيه), then the **Sub-Item** tab.
:::

![The Sub Item Documents Configurations tab of the Sales Invoice document term](../../../ar/modules/supplychain/images/document-terms/doc-term-sub-item-en.png)

## Creating & Spreading Sub-Items

These toggles control how many sub-item records a line produces and where their warehouse/locator come from.

**Spread Sub-Item Lines If Qty Greater Than One** `termConfig.spreadSubItemLinesIfQtyGreaterThanOne` — When a line carries a quantity greater than one, splits it into multiple lines of quantity 1 so each unit can be tracked as its own sub-item.

**Create Sub-Item From Line Information** `termConfig.createSubItemFromLineInfo` — Auto-creates a new sub-item record populated from the line's data when none is supplied on the line.

**Copy Warehouse To Sub-Item** `termConfig.copyWarehouseToSubItem` — On save, writes the line's destination warehouse into each line's sub-item record.

**Copy Locator To Sub-Item** `termConfig.copyLocatorToSubItem` — On save, writes the line's destination locator into each line's sub-item record.

## Copying Document References into the Sub-Item

Each toggle below stamps the **current document's reference** into the matching field of the sub-item record when the document is applied (and clears it on cancel / un-apply). This builds the back-links that let you trace which documents created or touched each sub-item.

| Option | Field ID |
|---|---|
| Update Purchase Invoice In Sub-Item | `termConfig.updatePurchaseInvoiceInSubItem` |
| Update Sales Invoice In Sub-Item | `termConfig.updateSalesInvoiceInSubItem` |
| Update Purchase Order In Sub-Item | `termConfig.updatePurchaseOrderInSubItem` |
| Update Sales Order In Sub-Item | `termConfig.updateSalesOrderInSubItem` |
| Update Stock Receipt In Sub-Item | `termConfig.updateStockReceiptInSubItem` |
| Update Traffic Letter In Sub-Item | `termConfig.updateTrafficLetterInSubItem` |
| Update Traffic Letter Request In Sub-Item | `termConfig.updateTrafficLetterReqInSubItem` |
| Update Sales Quotation In Sub-Item | `termConfig.updateSalesQuotationInSubItem` |
| Update Sales Quotation Request In Sub-Item | `termConfig.updateSalesQuotationReqInSubItem` |

**Update Salesman In Sub-Item** `termConfig.updateSalesmanInSubItem` — Writes the document's salesman into the sub-item's salesman field. Effective only when the document type carries a salesman.

## Copying Dimensions into the Sub-Item

These toggles copy the analytic **dimensions** (محددات) — branch, sector, department and analysis set — into the sub-item record. Each dimension has two variants: one that takes the value **from the invoice** (the document/line dimension) and one that takes it **from the warehouse** (the line warehouse's dimension). Enable the variant that matches where you maintain the dimension.

**From the invoice** — copies the document/line dimension into the sub-item:

| Option | Field ID |
|---|---|
| Update Branch In Sub-Item From Invoice | `termConfig.updateBranchInSubItemFromInvoice` |
| Update Sector In Sub-Item From Invoice | `termConfig.updateSectorInSubItemFromInvoice` |
| Update Department In Sub-Item From Invoice | `termConfig.updateDepartmentInSubItemFromInvoice` |
| Update Analysis Set In Sub-Item From Invoice | `termConfig.updateAnalysisSetInSubItemFromInvoice` |

**From the warehouse** — copies the line warehouse's dimension into the sub-item:

| Option | Field ID |
|---|---|
| Update Branch In Sub-Item From Warehouse | `termConfig.updateBranchInSubItemFromWarehouse` |
| Update Sector In Sub-Item From Warehouse | `termConfig.updateSectorInSubItemFromWarehouse` |
| Update Department In Sub-Item From Warehouse | `termConfig.updateDepartmentInSubItemFromWarehouse` |
| Update Analysis Set In Sub-Item From Warehouse | `termConfig.updateAnalysisSetInSubItemFromWarehouse` |

## Tax Percentages

These toggles copy the four tax percentages between the line and its sub-item. They take effect only on invoice lines. The **From Sub-Item** family pulls the stored percentage out of the sub-item and onto the line; the **To Sub-Item** family writes the line's percentage back into the sub-item record.

**From the sub-item onto the line:**

| Option | Field ID |
|---|---|
| Copy Tax 1 Percentage From Sub-Item | `termConfig.copyTax1PercentageFromSubItem` |
| Copy Tax 2 Percentage From Sub-Item | `termConfig.copyTax2PercentageFromSubItem` |
| Copy Tax 3 Percentage From Sub-Item | `termConfig.copyTax3PercentageFromSubItem` |
| Copy Tax 4 Percentage From Sub-Item | `termConfig.copyTax4PercentageFromSubItem` |

**From the line into the sub-item:**

| Option | Field ID |
|---|---|
| Copy Tax 1 Percentage To Sub-Item | `termConfig.copyTax1PercentageToSubItem` |
| Copy Tax 2 Percentage To Sub-Item | `termConfig.copyTax2PercentageToSubItem` |
| Copy Tax 3 Percentage To Sub-Item | `termConfig.copyTax3PercentageToSubItem` |
| Copy Tax 4 Percentage To Sub-Item | `termConfig.copyTax4PercentageToSubItem` |

**Copy Taxes From Sub-Item After** `termConfig.copyTaxesFromSubItemAfter` — A cut-off date that gates the copy-taxes logic above. If a date is set and the document's value date is on or before it, the tax-percentage copy is skipped entirely; only documents dated after this date apply the copy.

## Misc

**Sub-Item Status Value Date Field ID** `termConfig.subItemStatusValueDateFieldId` — Selects which document field supplies the effective ("value") date used when ordering and applying sub-item status entries. If empty, the document's normal value date is used.

**Update Delivery Date In Sub-Item** `termConfig.updateDeliveryDateInSubItem` — On apply, writes the document's delivery date into the sub-item's delivery-date field.

**Update Cancelled By Doc In Sub-Item** `termConfig.updateCancelledByDoc` — Stamps this document's reference into the sub-item's "cancelled by document" field, recording which document cancelled / voided the sub-item.

**Do Not Filter Sub-Items By From-Document Sub-Items** `termConfig.doNotFilterSubItemsByFromDocSubItems` — When building a document **based on** a From-Document, does not restrict the selectable sub-items to those present on the From-Document lines; any matching sub-item is allowed.

**Do Not Spread Line Data When Sub-Item Of From-Document Added** `termConfig.doNotSpreadLineDataWhenSubItemOfFromDocAdded` — When a sub-item that already exists on the From-Document is selected, skips auto-spreading / copying that From-Document line's data onto the new line.

**Ignore Validate If Return Should Be Sent To Tax Authority** `termConfig.ignoreValidateIfReturnShouldBeSentToTaxAuthority` — Sales-return documents only (Sales Return, Sales Return Request, Service-Center Sales Return). Suppresses the validation that blocks a return when the return itself should be sent to the tax authority, in the case where the parent (From-Document / invoice) is already eligible to be sent to the tax authority.
