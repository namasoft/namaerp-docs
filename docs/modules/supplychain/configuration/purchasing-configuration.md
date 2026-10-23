---
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Purchasing Configuration

This page documents the **Purchasing** tab — settings that affect purchase orders, purchase invoices, purchase returns, and the letter-of-credit / proforma workflow.

![The Purchases tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-purchasing-en.png)

## Purchasing

**Copy Sector / Branch / Department / Analysis Set from Item** — When on, the line takes the corresponding accounting dimension from the **item's** own setup instead of inheriting it from the document header. Turn one on when items are pre-assigned to a dimension and you want lines stamped per item rather than by a single header value. *(These four switches are shared by sales and purchasing.)*

| Dimension | Field ID |
| --- | --- |
| Sector | `value.copyTranSectorFromItem` |
| Branch | `value.copyTranBranchFromItem` |
| Department | `value.copyTranDepartmentFromItem` |
| Analysis Set | `value.copyTranAnalysisSetFromItem` |

**Do Not Mark Purchase Request Processed** `value.doNotMarkPurchaseRequestProcessed` *(on in newly created databases)* — A purchase request can be marked "Processed" once a purchase order or issue is created from it, so that it no longer appears outstanding. When this switch is on the request is left unmarked, so one request can feed several downstream documents. Newly created databases are seeded with it **on**, which means requests are *not* marked processed unless you switch it off — check the screen before assuming either behavior.

**Do Not Mark Purchase Return Request Processed** `value.doNotMarkPurchaseReturnRequestProcessed` — The same behavior for purchase return requests, so one return request can be fulfilled by more than one return document.

**Do Not Save Purchase Documents if Item Not Purchasable** `value.doNotSavePurchaseDocsIfItemNotPurchasable` *(on in newly created databases)* — When on, saving a purchase document is blocked if any line uses an item flagged "not purchasable". Use it to enforce that only approved items appear on purchase documents.

**Do Not Save Purchase Return Documents if Item Not Returned** `value.doNotSavePurchaseReturnDocsIfItemNotReturned` — When on, saving a purchase return is blocked if any line uses a non-returnable item.

**Allow Changing Receipt and Issue After Relating with Invoices** `value.allowChangingReceiptAndIssueAfterRelatingWithInvoices` — By default, once a stock receipt/issue line is linked to an invoice its key fields (item, quantity, warehouse, dimensions) are locked. When on, those linked lines can still be edited. Use with caution — it can desynchronise stock and invoice figures.

**Insert N1 / N2 / N3 in Purchase Invoice Lines** `value.insertN1inPurchaseInvoiceLines`, `value.insertN2inPurchaseInvoiceLines`, `value.insertN3inPurchaseInvoiceLines` — When on, the corresponding note/analysis text (N1, N2, N3) is copied from the **purchase price list** onto the purchase line when the item is selected. Use when you store extra descriptive or analysis text on purchase price lists.

**Update Tax Registration and Commercial Registration Number in Purchase with Save** `value.updateTaxRegNoAndCommercialRegNoInPurchaseWithSave` — When on, the supplier's tax-registration and commercial-registration numbers are refreshed from the supplier file onto the document each time it is saved, so documents always reflect current values.

**Calculate Purchase Return Prices** `value.calculatePurchaseReturnPrices` *(default on)* — When on, the system auto-fills unit prices on purchase return lines (from the last purchase price) where they aren't entered manually. Turn off only if you always enter return prices by hand.

**Must Match Line Uom With Sales Price List Uom In Purchase While Searching For Price** `value.mustMatchLineUomWithPurchasePriceListUom` — When on, a purchase price-list price is used only if the line's unit of measure exactly matches the price-list line's unit, avoiding picking a price meant for another unit. The label says *Sales Price List*, but this is the purchasing setting and it reads the purchase price list.

**Calculate Total Quantity in Purchases from Purchase Unit** `value.totalQtyIsInPurchaseUnitForPurchases` — When on, the document's total-quantity figure on purchase documents is expressed in the supplier's purchase unit (e.g. cartons) instead of the item's base unit (e.g. pieces).

## Letters of Credit & Proforma

These settings relax the locking rules around the letter-of-credit (LC) import workflow and its proforma invoices.

**Allow Editing in LC Proforma Invoice and LC Expense Document** `value.allowEditingInLcProformaInvoiceAndLcExpenseDocument` — When on, LC proforma invoices and LC expense documents can be edited even after the credit has been closed. Use cautiously, only to correct LC paperwork after closing.

**Allow Editing LC Proforma Invoice After Expense Documents** `value.allowEditingProformaInvoiceAfterExpenseDocs` — When on, the LC proforma invoice can still be edited after LC expense documents have been created against it.

**Allow Create Proforma Invoice Before Creating the LOC** `value.allowCreateProformaInvoiceBeforeCreateLOC` — When on, an LC proforma invoice can be created before the letter of credit itself exists, for workflows that prepare the proforma ahead of opening the credit.

**Use Proforma Invoice per Shipment** `value.useProformaInvoicePerShipment` — For multi-shipment letters of credit, when on the system uses a separate proforma invoice for each shipment instead of one consolidated proforma — useful when a single LC covers several shipments you want to document and cost separately.
