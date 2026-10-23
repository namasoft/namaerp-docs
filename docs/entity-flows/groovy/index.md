---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Groovy Script Examples
---

<div class='entity-flows'>

# Groovy Script Examples

These pages are ready-made Groovy scripts for entity flows and task schedules, each one checked on a demo database before it was published. Every page explains what the script does, when it helps, how to set it up and what its messages mean, and gives the full source to copy.

None of these scripts is built into the system. They are samples: you paste the source into the customer's flow or task, and you can adapt it.

## Using a script from these pages

Each page has a **Script** link to a `.groovy` file and shows the same source at the bottom of the page. Copy the whole file, from the `package` line to the last brace.

- **On an entity flow:** open **Administration → Display Customization → Entity Flow**, add a line to the **Details** grid with the target action the page gives, and paste the script into the line's **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
- **On a task schedule:** open **Basic → Settings → Task Schedule**, create a task of type **Action**, and paste the script into **Groovy Script** on the **Action** tab. Leave **Class Name** empty: it is filled in when you save.

**Every script takes its first input from Parameter 2.** Parameter 1 stays empty, on an entity flow and on a task schedule alike, and the parameter table on each page starts at Parameter 2. When you save, the line's description and the titles above the parameters fill in from the script itself.

[EAGroovyAction](/entity-flows/core/EAGroovyAction) explains how the system compiles and runs these scripts.

Each page is marked one of two ways:

- **Recommended pattern**: generic. It works as it is, controlled through its parameters.
- **Customer-specific example**: written for one installation, with fields or codes fixed in the source. The page lists what to change before using it elsewhere.

## Repair and maintenance

<LandingGrid>
  <LandingCard icon="🔁" title="Rebuild Quantity Tracking for Documents From a Query" link="/entity-flows/groovy/EAUpdateQtyTrackingEffectsFromQuery.md" details="Rebuilds the satisfied and open quantities that the documents a query returns leave on their source documents." />
  <LandingCard icon="🔒" title="Reserve a Draft's Code When It Is Saved" link="/entity-flows/groovy/EACreateAliasesForDrafts.md" details="Registers a draft's codes at once, so no other record can take its code before it is committed." />
  <LandingCard icon="🧮" title="Recalculate an Invoice's Totals After a Field Map" link="/entity-flows/groovy/EACalculateMoneyFields.md" details="Recalculates line values, taxes and totals after a field map that changes prices on Validate On Save." />
  <LandingCard icon="📱" title="Keep Only a User's Last Mobile Device Token" link="/entity-flows/groovy/EARemoveAllFCMTokens.md" details="Stops push notifications reaching old phones by keeping only a user's newest device token." />
  <LandingCard icon="▶️" title="Run Several Entity Flows on Records From a Query" link="/entity-flows/groovy/EARunEntityFlowFromQueryMultiEntityType.md" details="One task runs several manual flows on the records a query returns, each record getting the flows meant for its type." />
</LandingGrid>

## Accounting and other modules

<LandingGrid>
  <LandingCard icon="💱" title="Send One Account's Ledger Lines in Local Currency at Rate 1" link="/entity-flows/groovy/EASetTransCurrencyToLocalCurrencyAndRateOne.md" details="Rewrites one account's ledger lines as their local amount at rate 1, just before the accounting request is sent." />
  <LandingCard icon="🔐" title="Hide Entries and Vouchers Behind Their Account's View Capability" link="/entity-flows/groovy/EACopyViewCapabilityFromAccountToJournalEntry.md" details="Journal entries and vouchers take the View Capability of the first account on their lines." />
  <LandingCard icon="🔢" title="Number Voucher Lines per Subsidiary and Fiscal Year" link="/entity-flows/groovy/EACreateSerialForLineSubsidiary.md" details="A running number per customer or supplier per fiscal year on receipt and payment voucher lines." />
  <LandingCard icon="☑️" title="Tick a Line Flag on Every Line That Shares a Reference" link="/entity-flows/groovy/EAGroovyUpdateRefInMiscPurchaseInvDetails.md" details="On a misc invoice, one ticked line ticks its whole group. The field ids come from the parameters." />
  <LandingCard icon="🩺" title="Cap a Yearly Allowance per Employee on Payment Requests" link="/entity-flows/groovy/EAYearlyLimitPerEmployeeInPVRequest.md" details="Yearly limits per employee, per item and in total, with running totals on each request line." />
  <LandingCard icon="🏗️" title="Copy Project Contract Term Codes Into Its Budgets" link="/entity-flows/groovy/EAUpdateProjectContractTermCodeInBudgets.md" details="Saving a project contract writes its term codes into the estimated and executive budget lines." />
  <LandingCard icon="🏠" title="Rebuild a Cancel Contract's Expense Lines From the Lease" link="/entity-flows/groovy/EAFillExpensesWithRecommitRECancelContract.md" details="Refills a lease termination's Expense grid from the lease's non-installment lines on every save." />
  <LandingCard icon="📮" title="Fill Postal Parcels Sort Lines From IPS" link="/entity-flows/groovy/EAIPSCDSFetchMailItemData.md" details="Looks up every line's mail item in IPS in one go, for lines that were scanned or imported without the look-up." />
  <LandingCard icon="🧾" title="Add a Service Fees Line to the Electronic Invoice" link="/entity-flows/groovy/EAEInvoiceCreationWithCustomServiceFees.md" details="Adds Service Fees 1 to the e-invoice as an item line with 15% tax. The document itself is unchanged." />
  <LandingCard icon="📝" title="Stamp and Lock the Follow-Up Lines of a Complaint" link="/entity-flows/groovy/EAStampAndLockComplaintFollowUps.md" details="Customer-specific: new follow-ups get the user's employee and today's date; edits to saved ones are undone on save." />
</LandingGrid>

## HR and the item master file

<LandingGrid>
  <LandingCard icon="🕛" title="Clear Attendance Punches Recorded at Midnight" link="/entity-flows/groovy/EAClearFromDateIfFromTimeIsMidnight.md" details="Clears a Time Attendance check-in or check-out that the machine wrote as 00:00." />
  <LandingCard icon="🚪" title="Treat a Late Check-In as a Check-Out" link="/entity-flows/groovy/EATimeAttendanceMakeInOutIfBeforeTime.md" details="Turns a lone check-in after a cut-off time into a check-out." />
  <LandingCard icon="⏰" title="Fill a Forgotten Punch's Hour From the Employee's Shift" link="/entity-flows/groovy/EASetPermissionHourFromAttendanceShift.md" details="Sets a Forgot Check In / Out leave permission's hour from the employee's shift." />
  <LandingCard icon="📅" title="Show What the System Thinks Each Day Is for an Employee" link="/entity-flows/groovy/EAFindDaysInfoForEmployee.md" details="A diagnostic that lists each day's shift, holiday, weekend and weekly-rest status for one employee." />
  <LandingCard icon="💰" title="Drop Salary Documents of Another Period From a Salary Sheet" link="/entity-flows/groovy/EARemoveSalaryDocsFromSalarySheetWithDifferentPeriod.md" details="Removes salary sheet lines whose salary document is of another fiscal period." />
  <LandingCard icon="🎨" title="Validate an Item's Sizes and Colors Grid" link="/entity-flows/groovy/EAPreventDifferentNamesForSameSizeOrColor.md" details="Refuses one size or color code with two names, and two default lines for one size and color." />
  <LandingCard icon="⚖️" title="Rewrite an Item's Unit Conversions to the Base Unit" link="/entity-flows/groovy/EAFixUOMConversionsToBaseUnit.md" details="Turns chained conversions (1 Pallet = 50 Carton) into direct ones to the base unit." />
  <LandingCard icon="📍" title="Learn an Item's Default Locator From Stock Movements" link="/entity-flows/groovy/EALearnDefaultLocatorFromStockTransfer.md" details="Records the locator a stock transfer or opening stock used as the item's default locator." />
</LandingGrid>

## Supply chain: lots, locators and other item dimensions

<LandingGrid>
  <LandingCard icon="🏷️" title="Number Lot-Tracked Lines by Item Section and Year" link="/entity-flows/groovy/EAAutoLotIdFromItemSectionAndYear.md" details="Writes QC-26-RAW00001-style numbers into Text 1, counted per section and year." />
  <LandingCard icon="🧹" title="Clear Lots That Were Never Received, and Unused Dimensions" link="/entity-flows/groovy/EAClearLotIdsWithNoItemDimensionsQty.md" details="Clears lots the item never had stock of, and dimensions the item does not use." />
  <LandingCard icon="🚫" title="Clear the Locator When the Warehouse Does Not Use Locators" link="/entity-flows/groovy/EAClearLocatorWhenWarehouseDoesNotAllowLocators.md" details="Drops leftover locators on lines whose warehouse prevents locators." />
  <LandingCard icon="📦" title="Set a Default Locator on Lines Without One" link="/entity-flows/groovy/EASetDefaultLocatorIfEmpty.md" details="Fills empty locators with a fixed default, for all items or for chosen item sections." />
  <LandingCard icon="🔖" title="Fill the Item's Default Revision on Document Lines" link="/entity-flows/groovy/EAFillDefaultRevision.md" details="Empty revisions get the item's default revision." />
  <LandingCard icon="🔀" title="Move a Serial Number Typed by Mistake Into the Lot" link="/entity-flows/groovy/EACopySerialToLot.md" details="For lot-only items, a typed serial becomes the lot." />
  <LandingCard icon="👕" title="Fill the Default Size and Color When a Committed Document Is Edited" link="/entity-flows/groovy/EAFillDefaultSizeAndColor.md" details="Customer-specific: repairs size and color on re-saved committed documents." />
  <LandingCard icon="📏" title="Refuse Serial Numbers That Are Not 15 Characters Long" link="/entity-flows/groovy/EASerialNumberLen.md" details="Customer-specific: a fixed-length serial validation." />
  <LandingCard icon="🏬" title="Update Items' Warehouse Settings From a Purchase Return Request" link="/entity-flows/groovy/EAUpdateItemDimensionsFromPurchaseReturnReqLines.md" details="Customer-specific: request lines write into the items' warehouse rows." />
  <LandingCard icon="🧩" title="Spread an Assembly BOM Line Into One Line per Item of a Class" link="/entity-flows/groovy/EASpreadAssemblyBOMLineByItemClass.md" details="Customer-specific: one BOM line per item of an Item Class 4." />
</LandingGrid>

## Supply chain documents: source documents and generated documents

<LandingGrid>
  <LandingCard icon="↩️" title="Link Sales Return Lines to the Invoices They Came From" link="/entity-flows/groovy/EACollectInvoicesInReturn.md" details="Finds each return line's invoice by query and splits a line across invoices." />
  <LandingCard icon="🎁" title="Link Free Item Lines of a Sales Return to the Invoice" link="/entity-flows/groovy/EASetSourceLineIDForFreeItemInSalesReturn.md" details="Fills the Source Line Id of free lines from the invoice." />
  <LandingCard icon="🚗" title="Collect a Purchase Invoice's Stock Receipts From Its Car Receipts" link="/entity-flows/groovy/EACollectStockReceiptsByFromDoc.md" details="Fills Stock Documents with the receipts made from the car receipts." />
  <LandingCard icon="💲" title="Keep the Prices of the Document a Sales Document Was Made From" link="/entity-flows/groovy/EACopyLinePriceAndHeaderDiscountFromFromDoc.md" details="Lines take the source line's price, also through a stock issue." />
  <LandingCard icon="🛒" title="Create One Purchase Order per Supplier From a Purchase Quotation" link="/entity-flows/groovy/EAGenMultiplePurchaseOrdersFromQuotation.md" details="Splits a quotation into orders or invoices per supplier and keeps them in step." />
  <LandingCard icon="📋" title="Create One Purchase Order per Recommended Supplier From a Purchase Request" link="/entity-flows/groovy/EAGenPurchaseOrdersPerRecommendedSupplier.md" details="Customer-specific: one order per Recommended Supplier, ordering each line's Number 2." />
  <LandingCard icon="🔗" title="Point Invoice Lines Back at the From Document's Lines" link="/entity-flows/groovy/EAGuessInvoiceSourceLineOfSourceLineId.md" details="Lines taken from stock issues or receipts get the Source Line Id of the order line they came from." />
  <LandingCard icon="🟰" title="Refuse a Document Whose Quantities Differ From Its From Document" link="/entity-flows/groovy/EAQtyMustMatchFromDocPerItem.md" details="An item-by-item quantity check against the From Document." />
</LandingGrid>

## Supply chain documents: statuses and lines

<LandingGrid>
  <LandingCard icon="🚚" title="Set the Delivery Status of the Lines a Document Was Made From" link="/entity-flows/groovy/EASetDeliveryStatusInFromDocLines.md" details="Stamps a fixed delivery status on source lines, climbing the from-document chain to the type you name." />
  <LandingCard icon="✅" title="Mark the From Document as Fulfilled" link="/entity-flows/groovy/EAMarkFromDocFulfilled.md" details="Writes Fullfilled into the from-document's Description 1 once the documents made from it cover every line." />
  <LandingCard icon="🗂️" title="Record Inventory Effects Under the Warehouse's Analysis Set" link="/entity-flows/groovy/EASetInvRequestAnalysisSetFromWarehouse.md" details="Inventory request lines take their warehouse's analysis set." />
  <LandingCard icon="🔏" title="Lock Saved Price Lines on Items and Sales Price Lists" link="/entity-flows/groovy/EAPreventChangingItemPriceLines.md" details="Refuses deleting or editing existing price lines. New lines are still allowed." />
  <LandingCard icon="🆓" title="Add Free Lines From the References on Each Sales Line" link="/entity-flows/groovy/EAAddFreeLinesFromLineReferences.md" details="Reference 1-3 plus Number 1-3 on a sales line become free lines under it." />
  <LandingCard icon="🛑" title="Force Do Not Update Prices At All on Sales Return Request Terms" link="/entity-flows/groovy/EASetDoNotUpdateSalesPrice.md" details="A Document Term flow that forces one term setting on save." />
  <LandingCard icon="📊" title="Maintain Limit Sales Qty Lines From Items and Customers" link="/entity-flows/groovy/EAMaintainLimitSalesQtyFromItem.md" details="Find-or-create a Limit Sales Qty record by query and keep this item's or customer's line in it." />
</LandingGrid>

</div>
