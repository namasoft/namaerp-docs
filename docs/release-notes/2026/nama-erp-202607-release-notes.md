# Nama ERP Release Notes - July 2026

::: info Release Information
- **Release Date**: July 2026
- **Release Number**: Nama-ERP-202607
:::

## Additions

### Inventory

- Added an option in the Item file named (Always Free - alwaysFree) so that the line is automatically marked as free in sales documents and at Point of Sale, taking into account the (Compliance with Price Lists) option for free lines.
- Added an option named (allowTrackQtyForSysGeneratedDocs) in the Stock Receipt & Issue term config to allow tracking quantities in stock documents created by the system.
- In the Stock Transfer Issue (IssueStockTransfer), added the fields (sendToWarehouse, sendToLocator) on the line, copied from the Stock Transfer Request, with warehouses and locations now moving correctly between it and the Stock Transfer Receipt (ReceiptStockTransfer).
- Added an option in the Assembly Voucher term config named (Actual Receipt Quantity Does Not Affect the Withdrawn Quantity), so that the (Actually Supplied Quantity) field affects only the supplied quantities without automatically adjusting the withdrawn item quantities.
- Added the two fields (n4, n5) to the Sizes & Colors lines inside the Item file.
- In the (Colors & Sizes Matrix) file, the system now prevents saving when there is a duplicate in the item dimension lines (Size / Color / Version).
- Sped up Stock Aging processing so that it now starts after the last fully covered lines. Please verify the data is correct after updating the version.
- For items with Lots, completed the handling of quantities without a Lot number at Point of Sale and in full and partial return cases, with the Lot number copied from the invoice to the return, and the invoice now prevented from saving without entering the Lot and serial number values for items that require them. For details: [Allowing Items With Batch & Expiry to Hold Untagged Quantities](/modules/supplychain/development-requests/allow-empty-item-dimensions-before-date)

### Purchasing

- In Purchase Forecasts, the (itemsCollections) grid now allows multiple selection from (the item's default vendor, the item's ref1 field, the brand's lines.ref1 and lines.ref2 fields), with the (itemFilters) grid no longer needed.
- Added a Groovy entity flow named (EAUpdateItemDimensionsFromPurchaseReturnReqLines) that updates the item details from the Purchase Return Request lines, provided the warehouse and barcode match, and adds a new line if the condition is not met. When copying values into the item's (details) grid or (sizesAndColors) grid, the grid name must be written as a prefix in the entity flow inputs, for example: `details.description2=text1` and `sizesAndColors.n1=n3`.

### Sales & Quotations

- Added a field in the Supply Chain settings named (Stop Other Offers by Priority Across All Offer Types - prioritizedStopOtherDiscountsAcrossTypes) to control the overlap between free-item offers and offers that have "stop other discounts" enabled.
- Added two fields in the Invoices term config: (Alternative Component Item Field - bomAltItemField) for entering an alternative item for the main component, taking the size, color and version into account on issue and on returning goods, and (Spread Assembly Item Components with Insert - spreadAssemblyComponentsWithInsert) to spread the assembly item's components with insert.
- In the Discount Coupon and Discount Coupon Book, added the (Offer Apply Rules) fields to specify the departments, categories or items the discount applies to at the line level, and (Discount Location) to specify the discount slot the discount is recorded in on the line. If no apply rules are specified, the system continues applying the discount rate to the invoice total as before.

### Accounting

- Created a new method for generating Closing Entries so that it now runs in the background exactly like other processes, replacing the entry lines and posting entries with a list view, to address the severe save slowness experienced by customers with large transaction volumes.
- Added an option in the Closing Entry named (Skip Close Validations - skipCloseValidations) that stops the checks for (Zombie Ledger, Zombie Qty) and some other checks. Note: this option can only be enabled by technical support staff at L2Dangerous level.

### E-Invoicing & Government Portals

- The Collect Document (RECollectDoc) is now taken into account among the documents sent to the Saudi Zakat, Tax and Customs Authority (ZATCA).

### Fixed Assets

- Added Attachments (1 through 5) in the Asset Approval Expense screen (FALcExpenseDocument).

### Real Estate

- In the Real Estate Price List, added the Payment Model so it is taken into account when adding a Unit to a Sales Contract, along with adding two attachments in the Terms & Expenses grid of the Commissions table.
- In the Collect Document, added a field on the line named (Collection Discount) that deducts a value from the installment and has a debit and credit accounting effect, affecting the discount slot on the contract along with the amount paid for the installment, so the installment becomes fully paid once the difference is collected.

### Project Management

- In the Project Invoice (CPAProjectInvoice), added a field (Update Project Status) on the header and on the lines, so that the project status is updated automatically upon saving according to the selected status.

### Point of Sale

- Added an option in the Payment Method named (Actual Point of Sale Balance Is Mandatory), to prevent closing the shift without entering the actual balance and the resulting charge of the full book balance to the employee as a shortage, with the ability to restrict the requirement to a specific payment method instead of applying it to all payment methods.
- In the Point of Sale print form, it is now possible to set a criterion the invoice is printed based on, as in the print form on Nama, such as one form for the Tax Invoice and another for the Simplified Invoice.

### Service Center

- In the Service Request (SrvCServiceRequest), added a field (Arrival Date & Time).

### Human Resources

- Added an option in the Leave Type file named (Prevent Generating Salary If Work Start Is Not Registered - preventGenerateSalaryIfWorkingStartNotRegistered), so generating or regenerating the salary is prevented when the employee has Leave vouchers with no registered work start whose dates precede or fall within the salary period.
- Added an option in the Leave Type to calculate the leave from the start day through the return day, excluding the last weekly holiday if the return day is Sunday itself; if the return day is Monday or later, all days are counted.
- In the Employee Management screen, added a field (Department Manager - departmentManager) as a reference field to the Employee file.
- In the Bulk Residence Renewal voucher, added the employee status on the line (pulled automatically from the Employee file, read-only) and a Renewal Duration in Months field, with the number of days and the expiry date after renewal calculated automatically.
- In the Bulk Reward/Penalty voucher, added the fields (Disbursed, Remaining) on the lines, so that only the lines with a remaining amount, and only for the remaining value, are copied to the document built on it (the Disbursement Voucher).
- In the Loan voucher, it is now possible to select installments from the created installments and go to the Installment Payment screen with the selected installments via a dedicated button.
- In the Loan Type, the option (Take Into Account Installments of the Same Type in the Same Month) now takes into account Loan requests and their vouchers for the same payroll period when applying the maximum limit.
- In the Loan Type, added an option (Do Not Show in Mobile App - doNotShowInMobileApp).
- In the entity flow (EATimeAttendanceFromDBImporter) used in Scheduled Tasks, added an input named (Split To Multiple Documents Each With N Lines) to split the resulting Time Attendance document into several documents, none exceeding the specified number of lines, to address the slowness of importing and saving documents with tens of thousands of lines.

### Mobile Applications

- Added an entity flow named (EANotifyMissedAttendance) to notify the employee inside the app when they forget to clock in or clock out, after a predefined period based on the start and end of their shift.
- In the Bulk App Settings, added an option (Link - Is Link) in the Allowed Values grid for text fields, so the link is opened directly when the field is tapped.
- Added an icon for the Business Trip voucher on the Home screen in the Nama Mobile app.
- Sending the log from the app is now done as a text (txt) file, to avoid the issue of sending the log via WhatsApp.
- When user settings are changed, a message now appears asking to restart the app for the new icons to appear.

### Weighbridge Application

- Saving in the Weighbridge app is now done in the background without the interface stopping, with the number of unsent vouchers shown on the side and automatic retry every minute, so the operator can start weighing a new package as soon as the save button is pressed.
- In the Weighbridge Preparation voucher (WeightScalePreparationDoc), added a field (lastUpdateDate) at the line level to identify which lines were updated.

### Reports

- The financial statement system reports (SYSR-FNS010 through SYSR-FNS017) now show zero values as empty text, the same way as reports created with the Report Builder when its option (Show Zero As Empty Text - showZeroAsEmptyText) is ticked.
- Added a table in Global Config to control which subsidiary types appear in the Subsidiary Type input in reports, instead of showing all the types available under the license.

### New GUI

- Added an option (Prevent Auto Search in the List Grid - listViewPreventAutoLoad) in the (Custom List View - CustomListView) and (Screen Modifier - ScreenModifier) screens, and an option (Prevent Auto Search in the Search Grid - searchPreventAutoLoad) in the Screen Modifier screen, so that results are not loaded until search criteria are entered.
- Added the criteria (Within Period - WithinPeriod) and (Outside Period - OutsidePeriod) in the search criteria for quick access to a specific period.
- Added the criteria (Is One Of) and (Is Not One Of) in the list criteria.
- Added an option in the grid menu that lets you copy the column's name (title) to the clipboard, with a confirmation message after the copy succeeds.
- The Quick Help now works with the search in the selection list and with the list view, via new fields on the (Linking Inputs to Fields) table lines in the (Quick Help Definition - TooltipDefinition) screen: (Do Not Run in Edit View - doNotRunInEditView), (Runs with Search - runInSearcher), (Runs with List View - runInListView), along with an option for double-clicking the selection in search to select the line and run the Quick Help, and a Quick Help button in the toolbar that appears when a Quick Help exists for the screen.
- Added the ability to choose colors in the Rich Text Editor.

### Settings

- In Scheduled Tasks, the Execution Log now records all successful and failed attempts when the option (Enable Execution Log - enableExecutionLog) is turned on, with a field added (Execution Log Retention Days - logRetentionDays) to avoid data bloat.
- In the Approval Definition, added two fields on the step lines: (Step Apply When Query - stepApplyWhenQuery) and (Step Criteria - stepCriteria), so that the step's approval is only requested when a certain condition is met, and if the last optional step is not met, the document is considered saved. For details: [Approvals System - Approval Definition Full Guide](/platform/approvals/approvals-system)
- In Approvals, it is now possible to send the approval back to a previous step in the chain instead of only being able to reject it.
- In the User & Permission file, added a table (Search Extra Filters) to specify the fields and types for which the normal extra filters are canceled during search, to handle cases like selecting a substitute employee in the Leave voucher even though the user is restricted to their subordinates only.
- In Fields & Screens Settings (GenericReferenceOverrider), added a (dynamic filter) in the Extra Filter, as already exists in the User & Permission file.
- In Public IDs, it is now possible to leave the main (publicId) field empty if there is data in the (Public IDs by Sender) grid.
- Added the functions (runningTotal, runningTotalSql) in entity flows to calculate a running total for each line (the line's value plus all preceding lines), as opposed to (totalize, totalizesql) which sum the lines into a single value. The running total restarts from zero with each group when (Group Details By) is used, and values are matched between lines by their order.
- In the Criteria-Based Validation screen, added the fields (Show Error By Line Number) and (Error Field) to indicate the line and field causing the error.
- In the Permissions file and the User file, added views showing the Extra Permissions the file is used in, and the temporary Extra Permissions added to the user.
- In the list view for Dimensions, the composite dimensions were split into separate inputs: (Composite Legal Entities - compositeLegalEntity), (Composite Sectors - compositeSector), (Composite Branches - compositeBranch), (Composite Departments - compositeDepartment), (Composite Analysis Sets - compositeAnalysisSet).
- In the five Dimensions files and in the User file, added a (System Tables) page showing the (Edit Log, User Notifications, Journal Entry Requests, Stock Movement Requests, Business Request Status, EntitySystemEntry) records for the open record, with a button to purge data that opens options as check boxes to purge from more than one table at once, provided requests are only purged if their type is Delete and they have been processed. Execution is available to technical support users only.
- Added a new file named (Detailed Revision Config - DetailedRevisionConfig) that has, on the header, the document type and the list of types and criteria, and on the lines, the revision steps (sequence, step name, the responsible employee or employee group), along with new system tables (RevisionCase, RevCaseSteps, RevCaseCandidates) to record the revision data.
- In the (GUI Post Actions) screen, added a field (Run With System Action) to link the post actions to one of the ready-made system actions on the screen instead of linking them to a custom field or button. The post actions run automatically only when the system action succeeds, and do not run if it fails or error messages appear.
- In Word Templates, the (if) condition inside the (loop) is now evaluated before the table row is created, so that lines the condition does not apply to are excluded entirely instead of appearing as empty rows.
- When using the entity flow (EAAddAccountingEffect) to create the accounting entry for Loyalty Points in Sales Returns, please use (recalculatedCachedEarnedPointsValue) so the entry works on the very first save.

### e-commerce Integration

- In the entity flow (EAEcommerceReadAmazonNotifications), added an input to read events from a specific date and an input to specify which statuses are read.
- Added a new entity flow named (EAEcommerceReadReturns) to read return requests from Amazon (Amazon SP-API).
- Added the ability to integrate with WhatsApp via the API, for use in notifications when documents are saved.

## Fixes

### Inventory & Sales

- Fixed the calculation of the Amount Due in the Sales Invoice, where the value used to change after saving (by fractional differences) in invoices with a discount specified as a percentage, resulting in a remaining balance or an overpayment.
- Fixed an issue where the assembly item's components were not spread and not issued when the (spreadAssemblyComponentsWithInsert) option was enabled, with documents created based on another document.
- The (Allow Overdraft) field in the Item file is now treated as (No) when it is empty, to prevent overdrafts being allowed for items imported from Excel with an empty field.
- Fixed an issue where quantities greater than what was available were reserved in Sales Orders, caused by the (Allow Overdraft in Reservation) option having an empty value in older item settings.
- Fixed an issue where a Stock Transfer voucher was saved without an accounting entry for no apparent reason.
- The system now prevents editing the Stocktaking Start after Stocktaking End has been executed. Editing it used to make the system consider the warehouse still under stocktaking and reject any movement on it even though the stocktaking status was (Finished).
- Fixed an issue where a duplicate-code message appeared for the Colors & Sizes Matrix when re-inserting the matrix into the item after editing it, even though there was no actual duplication.

### Accounting

- Fixed an issue with saving Payment Vouchers caused by a term config pointing the tax accounting side to the VAT debit account, and an issue where the fees account was required for a cash Payment Method that has no fees.
- Fixed an issue with saving a document-cancellation document if the canceled document had already been sent to the Tax Authority.
- Fixed an issue where the record creator did not appear for some documents in the System Entries screen, even though it existed inside the document.

### Contracting

- Corrected the accounting entry for the tax value of the Advance Payment voucher (in the Terms grid) in the Project Extract, where the entry used to differ between the revenue account and the tax account after re-saving.
- Fixed an issue where an error appeared when navigating between documents with the Previous and Next buttons in the Employees, Equipment and Their Costs screen for a project, after sorting by one of the line fields.
- Fixed an issue with the Subcontractor Execution when a draft document existed.

### Fixed Assets

- Fixed an issue where the custody status (custodyStatus) was not updated after disposing of the Custody Delivery (FACustodyDeliveryDoc) and deleting it, where the status used to revert to (Draft) and not change even after re-saving the document.

### Real Estate

- In the Sales Contract (RESalesDoc), it is now possible to leave the field (price.maintenanceDepositPaymentDate) empty if there is an installment line of type Maintenance, as already happens with Multiple Payment.

### Human Resources

- Fixed an issue where importing Time Attendance data from the fingerprint machine via Scheduled Tasks did not complete, with the error (Error: null) appearing and a number of lines being lost.

### Point of Sale

- Fixed an issue where Point of Sale did not work with the latest version.

### Mobile Applications

- Corrected the actual date in the Sales Return created from the app, where it used to take the invoice date instead of today's date.

### New GUI

- Fixed an issue where the message (There are unsaved changes) appeared when navigating between records with the Previous and Next buttons even though there were no changes.
- Fixed an issue where an error appeared when sorting by the (Target Type) column in the All Records screen. As for the tree view of the Report Catalog appearing, that is the default behavior when it exists, and it can be hidden from the (Tree View) action in the toolbar.
- Fixed an issue where the account could not be edited in the document term config after selecting the account source type (Fixed) and saving.
- Fixed an issue where viewing attachments on the line did not work in the new interface.
- Fixed an issue where an added column in the list view disappeared when moving to the next page, and an issue where some employees did not appear when searched for in the list view.

### Settings

- In the Update Fiscal Year screen, the system now prevents saving when there is a duplicate line with the same details.
- In the entity flow (EAGenSCDocFromDocWithFieldsMap), writing a value into the target field (such as Ref1) is now prevented when the condition in the inputs is not met and the document is not actually created, after previously a value such as (DLV.000@draft) used to be recorded even though no Delivery voucher existed.
