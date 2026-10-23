---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# From-Document Configuration

The **from document** (بناءً على) is the source document a new document is created from — for example a Sales Order that a Sales Invoice is built on. This tab of the Document Term controls how the origin's lines, quantities, and prices are copied and linked into the new document, how copied lines are collected and filtered, and which linked lines are locked from editing.

::: info Where to find it
Open the document's **Document Term** (توجيه), then the **From Document** (بناءً على) tab.
:::

## Copying from the Source Document

These switches govern what is pulled from the origin document and how quantities and prices are carried over.

**Consistency with from Doc** `termConfig.consistencyWithFromDoc` — Controls how the new document's lines/quantities are validated against the origin: `Ignore` (no check), `NetQuantities` (totals must agree), or `LinePerLine` (each line matched against its origin line).

**Copy details** `termConfig.copyDetailsOfFromDoc` *(default on)* — When a from-document is selected, copy its detail lines into the new document. If disabled, only the header link is established and no lines are pulled in.

**Consider Satisfied Qties In From Doc** `termConfig.considerSatisfiedQtiesInFromDoc` — When copying remaining quantities from the origin, deduct quantities already satisfied (delivered/invoiced) by other related documents, so only the outstanding balance is brought over.

**Consider Satisfied Qties In From Doc Fields** `termConfig.considerSatisfiedQtiesInFromDocFields` — Selects which quantity-tracking fields are used when computing the "already satisfied" amount for the option above.

**Do Not Copy Quantity With From Doc** `termConfig.doNotCopyQuantityWithFromDoc` — Copy line data from the origin but leave the quantity blank rather than carrying the origin quantity over.

**Copy Quantity To Field With From Doc** `termConfig.copyQuantityToFieldWithFromDoc` — Instead of (or in addition to) the normal quantity field, copy the origin quantity into the specified target field id on the new line.

**Make Qty Zero With From Doc** `termConfig.makeQtyZeroWithFromDoc` — Copies lines from the origin but resets each copied line's quantity to zero, leaving the user to enter quantities manually.

**Make Quantity One With Selection Of The Item That Has Line In FromDoc** `termConfig.makeQtyOneWithSelectionOfTheItemThatHasLineInFromDoc` — When selecting an item that has a corresponding line in the from-document, default that line's quantity to 1 instead of copying the origin quantity.

**Copy One Line Details Of FromDoc For Item Without Repeat** `termConfig.copyOneLineDetailsOfFromDocForItemWithoutRepeat` — When an item appears on several origin lines, copy details from only one origin line for that item, avoiding duplicated lines.

**Spread Selected Item Data When Item Of From Doc Added** `termConfig.spreadSelectedItemDataWhenItemOfFromDocAdded` — When a from-document item is added to a line, auto-fill (spread) that line's item-related data (price, UOM, dimensions, etc.).

**Spread Item Revision Lines** `termConfig.spreadItemRevisionLines` — Explodes a single item line into one line per item revision when copying/adding.

**Spread Item Colors And Sizes Lines** `termConfig.spreadItemColorAnsSizeLines` — Explodes a single item line into one line per color/size combination.

**Call Post Action Of Field After Spreading Revisions Or Sizes** `termConfig.callPostActionOfFieldAfterSpreadingRevisionsOrSizes` — After spreading revision/color/size lines, run the post-action of the specified field id on the generated lines (e.g. to recalculate prices).

**Copy Price From Parent Document With From Document** `termConfig.copyPriceFromParentDocWithFromDoc` — Takes the unit price from the parent/origin document rather than recalculating it. Invoices only.

**Extra From Doc Fields Copier** `termConfig.extraFromDocFieldsCopier` — A free-text field map of additional `sourceField=targetField` pairs to copy from the origin document (header and detail) beyond the standard copied fields.

**Prevent Fill Lot Id According To Expiry Date If Empty** `termConfig.preventFillLotIdAccordingToExpiryDateIfEmpty` — Disables the default behavior of auto-deriving the lot/batch id from the expiry date when the lot field is empty.

**Allow Creating Document From Expired Quotation** `termConfig.allowCreatingDocumentFromExpiredQuotation` — By default a sales document created from a Sales Quotation must have its value date inside the quotation's **Valid from** / **Valid to** range, or the save is refused with *Value date must be within the range of sales quotation valid from and valid to.* Tick this on the new document's term to accept expired quotations. Sales documents only.

**Allow Item Code And Name Without An Item** `termConfig.allowItemCodeAndNameWithoutAnItem` — Permits typing a free item code/name on a line without selecting a registered item record.

**Do Not Copy Contract Terms When Selected** `termConfig.doNotCopyContractTermsWhenSelected` — When the origin is a contract, suppress copying the contract's terms/conditions into the new document. Contracting-material documents only.

## Filtering Which Lines Are Collected

These options restrict which origin lines (and which from-documents) are brought into the new document.

**Fetch Only Lines Matching Selected Item When Origin Document is Selected** `termConfig.fetchOnlyLinesMatchingItemFromOriginDoc` — When an origin document is selected, copy only the origin lines whose item matches the item already on the current line, instead of all lines.

**Show Only Items In OriginDoc Or FromDoc** `termConfig.showOnlyItemsInOriginDocOrFromDoc` — Restricts the line item picker to only items present in the from-document / origin document.

**Filter Lines With Same Warehouse From Doc Header** `termConfig.filterFromDocLinesByHeaderWarehouse` — When pulling from-document lines, only bring lines whose warehouse equals the header warehouse of the current document.

**Do Not Copy From Document Header Warehouse** `termConfig.doNotCopyFromDocHeaderWarehouse` — When copying from origin, do not carry the origin's header warehouse into the new document header.

**Filter From Doc By Supplier** `termConfig.filterFromDocBySupplier` — Restricts the from-document lookup to origin documents matching the current document's supplier.

**Filter From Doc By Customer** `termConfig.filterFromDocByCustomer` — Restricts the from-document lookup to origin documents matching the current document's customer.

**Do Not Empty Subsidiary With Choosing Supplier Or Customer** `termConfig.doNotEmptySubsidiaryWithSupplierOrCustomer` — Prevents the subsidiary (ledger account) field from being cleared when a supplier/customer is selected.

**Filter On Selected Items Only With From Doc** `termConfig.filterOnSelectedItemsOnlyWithFromDoc` — When copying, only bring origin lines for the items already entered on the current document.

**Show Only Orders With Unsatisfied Quantities In FromDoc** `termConfig.showOnlyOrdersWithUnsatisfiedQtyInFromDoc` — Restricts the from-document / origin-document lookup to orders that still have an unsatisfied (outstanding) quantity, hiding fully-executed orders. When the lookup is triggered from a specific line, results are further narrowed to orders that have an outstanding quantity for that line's item.

The following options each restrict copying to origin lines whose accounting dimension matches the current document's dimension.

| Option | Field ID |
|---|---|
| Filter Lines With Same Analysis Set With From Doc | `termConfig.filterLinesWithSameAnalysisSetWithFromDoc` |
| Filter Lines With Same Branch With FromDoc | `termConfig.filterLinesWithSameBranchWithFromDoc` |
| Filter Lines With Same Department With From Doc | `termConfig.filterLinesWithSameDepartmentWithFromDoc` |
| Filter Lines With Same Sector With From Doc | `termConfig.filterLinesWithSameSectorWithFromDoc` |

## Collecting & Merging Similar Lines

The **Collect Similar From Doc Lines** (`termConfig.collectSimilarFromDocLines`) switch merges similar origin lines into one when copying. The options below — under `termConfig.fromDocLinesCollectionOptions.*` — control the "same line" comparison key: each enabled `doNotConsider*` flag removes that dimension from the key, so lines differing only in that dimension are merged together.

| Option | Field ID |
|---|---|
| Do Not Consider Size | `termConfig.fromDocLinesCollectionOptions.doNotConsiderSize` |
| Do Not Consider Color | `termConfig.fromDocLinesCollectionOptions.doNotConsiderColor` |
| Do Not Consider Revision Id | `termConfig.fromDocLinesCollectionOptions.doNotConsiderRevisionId` |
| Do Not Consider Box | `termConfig.fromDocLinesCollectionOptions.doNotConsiderBox` |
| Do Not Consider Lot Id | `termConfig.fromDocLinesCollectionOptions.doNotConsiderLotId` |
| Do Not Consider Active Percentage | `termConfig.fromDocLinesCollectionOptions.doNotConsiderActivePercent` |
| Do Not Consider Inactive Percentage | `termConfig.fromDocLinesCollectionOptions.doNotConsiderInActivePercent` |
| Do Not Consider SubItem | `termConfig.fromDocLinesCollectionOptions.doNotConsiderSubItem` |
| Do Not Consider Warehouse | `termConfig.fromDocLinesCollectionOptions.doNotConsiderWarehouse` |
| Do Not Consider Measures | `termConfig.fromDocLinesCollectionOptions.doNotConsiderMeasures` |
| Do Not Consider Serial | `termConfig.fromDocLinesCollectionOptions.doNotConsiderSerial` |
| Do Not Consider Locator | `termConfig.fromDocLinesCollectionOptions.doNotConsiderLocator` |

## Locking Linked Lines

The **Prevent Editing Lines Linked To From Doc** (`termConfig.propertiesOfLinesLinkedToFromDoc.preventEditingLinesLinkedToFromDoc`) master switch locks lines that are linked to a from-document against editing. The `consider*` flags below — under `termConfig.propertiesOfLinesLinkedToFromDoc.*` — select which dimensions are checked when identifying and locking those linked lines.

| Option | Field ID |
|---|---|
| Prevent Editing Lines Linked To From Doc | `termConfig.propertiesOfLinesLinkedToFromDoc.preventEditingLinesLinkedToFromDoc` |
| Consider Lot | `termConfig.propertiesOfLinesLinkedToFromDoc.considerLotId` |
| Consider Revision | `termConfig.propertiesOfLinesLinkedToFromDoc.considerRevisionId` |
| Consider Active Percentage | `termConfig.propertiesOfLinesLinkedToFromDoc.considerActivePercentage` |
| Consider Inactive Percentage | `termConfig.propertiesOfLinesLinkedToFromDoc.considerInActivePercentage` |
| Consider Box | `termConfig.propertiesOfLinesLinkedToFromDoc.considerBox` |
| Consider Color | `termConfig.propertiesOfLinesLinkedToFromDoc.considerColor` |
| Consider Size | `termConfig.propertiesOfLinesLinkedToFromDoc.considerSize` |
| Consider Locator | `termConfig.propertiesOfLinesLinkedToFromDoc.considerLocator` |
| Consider Measures | `termConfig.propertiesOfLinesLinkedToFromDoc.considerMeasures` |
| Consider Serial | `termConfig.propertiesOfLinesLinkedToFromDoc.considerSerial` |
| Consider Warehouse | `termConfig.propertiesOfLinesLinkedToFromDoc.considerWarehouse` |

## Fields Not Copied

**Do Not Copy Fields With From Doc** `termConfig.doNotCopyFieldsWithFromDoc` *(grid)* — Lists specific fields that must NOT be copied from the origin document. Each row names one field (column `fieldID`, id `termConfig.doNotCopyFieldsWithFromDoc.fieldID`) to exclude when copying data from the from-document.

## Creation Criteria

**Criteria Definitions** `termConfig.criteriaDefinitions` *(grid)* — Defines per-target-type copy rules: when a criteria matches, the named created type uses the given extra-fields copier.

| Column | Field ID | Meaning |
|---|---|---|
| Created Type | `termConfig.criteriaDefinitions.createdType` | The target document/entity type this rule applies to. |
| When | `termConfig.criteriaDefinitions.whenCondition` | The criteria/condition under which this copy rule fires. |
| Copier Extra Fields | `termConfig.criteriaDefinitions.copierExtraFields` | The set of extra fields to copy when the rule matches. |

## Stock-Document Collection in Invoices

When an invoice or return auto-collects (links) stock documents, these options control which stock docs are gathered and how their lines are merged. They apply to the invoice/return family (Sales Invoice, Purchase Invoice, Sales/Purchase Returns, Sales Replacement, and their service-center variants).

**Consider From Document When Collect Documents** `termConfig.considerFromDocWhenCollectDocs` — Take the from-document link into account when collecting stock documents, so only stock docs tied to that origin are collected.

**Consider Contact In Collecting Stock Documents Inside Invoices** `termConfig.considerContactInCollectingStockDocs` — A stock doc only collects if its contact matches the invoice's contact.

**Consider Subsidiary In Collecting Stock Documents Inside Invoices** `termConfig.considerSubsidiaryInCollectingStockDocs` — Matches subsidiary (ledger account) when auto-collecting stock documents into the invoice.

**Copy Stock Docs From Origin Doc** `termConfig.copyStockDocsFromOriginDoc` — When a document is copied from an origin, also carry over the stock-document links attached to that origin.

**Copy Pricing Qty From Stock Doc Field** `termConfig.copyPricingQtyFromStockDocField` — Selects which numeric quantity field (`N1`/`N2`/`N3`) of the linked stock document supplies the pricing quantity used on the invoice line.

The **Stock Dock In Invoice Collection Options** group (`termConfig.stockDockInInvoiceCollectionOptions.*`) governs how stock-document lines are merged and matched when collected into the invoice. The `collectStockDocSimilarLines` switch merges similar lines; each `doNotConsider*` flag drops that dimension from the similar-line key.

| Option | Field ID |
|---|---|
| Collect Stock Documents Similar Lines | `termConfig.stockDockInInvoiceCollectionOptions.collectStockDocSimilarLines` |
| Do Not Consider Size | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderSize` |
| Do Not Consider Color | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderColor` |
| Do Not Consider Revision Id | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderRevisionId` |
| Do Not Consider Box | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderBox` |
| Do Not Consider Lot Id | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderLotId` |
| Do Not Consider Active Percentage | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderActivePercent` |
| Do Not Consider Inactive Percentage | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderInActivePercent` |
| Do Not Consider SubItem | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderSubItem` |
| Do Not Consider Warehouse | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderWarehouse` |
| Do Not Consider Measures | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderMeasures` |
| Do Not Consider Serial | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderSerial` |
| Do Not Consider Locator | `termConfig.stockDockInInvoiceCollectionOptions.doNotConsiderLocator` |

The `consider*` flags add a reference or attribute back into the matching key, and a few behavioral toggles govern quantity matching and unlinking.

| Option | Field ID |
|---|---|
| Consider Reference 1 | `termConfig.stockDockInInvoiceCollectionOptions.considerRef1` |
| Consider Reference 2 | `termConfig.stockDockInInvoiceCollectionOptions.considerRef2` |
| Consider Reference 3 | `termConfig.stockDockInInvoiceCollectionOptions.considerRef3` |
| Consider Driver | `termConfig.stockDockInInvoiceCollectionOptions.considerDriver` |
| Consider Unit Price of Line or From Doc | `termConfig.stockDockInInvoiceCollectionOptions.considerUnitPriceOfLineOrFromParent` |
| Invoice Quantity Must Match Stock Related Documents Quantity | `termConfig.stockDockInInvoiceCollectionOptions.matchInvoiceQtyWithRelatedDocsQty` |
| Automatically Unlink Manually-Linked Stock Documents When Deleting Those Documents | `termConfig.stockDockInInvoiceCollectionOptions.autoUnlinkManuallyLinkedStockDocsWithDelete` |

The **Filter Stock Docs By** family limits collected stock docs to those whose accounting dimension matches the invoice's.

| Option | Field ID |
|---|---|
| Filter By Sector | `termConfig.stockDockInInvoiceCollectionOptions.filterBySector` |
| Filter By Branch | `termConfig.stockDockInInvoiceCollectionOptions.filterByBranch` |
| Filter By Department | `termConfig.stockDockInInvoiceCollectionOptions.filterByDepartment` |
| Filter By Analysis Set | `termConfig.stockDockInInvoiceCollectionOptions.filterByAnalysisSet` |

## Price Update on Apply

When the **Apply** button links stock documents to an invoice or return, these options control whether and how line prices are recalculated. They apply to the invoice/return family.

**Don Not Update Price When Apply** `termConfig.donNotUpdatePriceWhenApply` — When applying (linking) stock documents to the invoice, do not recalculate/update line prices.

**Instantly Apply On Stock Doc Selection** `termConfig.instantlyApplyOnSIssuesSelection` — Applies a stock issue/document to the invoice immediately upon selecting it, without a separate Apply step.

The **Price Update With Apply Button Policy** group (`termConfig.priceUpdateDimensionsOnApply.*`) determines which dimensions are considered when re-pricing lines on Apply.

| Option | Field ID |
|---|---|
| Consider Box | `termConfig.priceUpdateDimensionsOnApply.considerBox` |
| Consider Lot | `termConfig.priceUpdateDimensionsOnApply.considerLotId` |
| Consider Revision | `termConfig.priceUpdateDimensionsOnApply.considerRevisionId` |
| Consider Size | `termConfig.priceUpdateDimensionsOnApply.considerSize` |
| Consider Color | `termConfig.priceUpdateDimensionsOnApply.considerColor` |
| Consider Active Percentage | `termConfig.priceUpdateDimensionsOnApply.considerActivePercentage` |
| Consider Inactive Percentage | `termConfig.priceUpdateDimensionsOnApply.considerInActivePercentage` |

## Material-Issue Validation

These options apply when copying remaining quantities into material-issue documents (Contracting Material Issue and its request, plus manufacturing raw-material issues).

**Copy Remaining Quantity Considering Previously Issued Quantity** `termConfig.copyRemainingQtyConsideringPreviouslyIssued` — When copying remaining quantity from the origin, subtract quantities already issued on previous issue documents so only the truly remaining amount is brought over.

**Do Not Save If Actual Quantity Greatr Than Planned Quantity** `termConfig.doNotSaveIfActualQtyGreatrThanTotalQty` — Blocks save when the actual issued quantity exceeds the planned quantity on the analysis card.

**Do Not Save If Actual Cost Greatr Than Planned Cost** `termConfig.doNotSaveIfActualCostGreatrThanTotalCost` — Blocks save when the actual cost exceeds the planned cost on the analysis card.
