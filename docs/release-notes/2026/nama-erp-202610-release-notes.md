# Nama ERP Release Notes - October 2026

::: info Release Information
- **Release Date**: October 2026
- **Release Number**: Nama-ERP-202610
:::

## Additions

### Inventory

- In the Stock Issue Request and the Raw Material Issue Request, added a selection column and a line action named (Split Line By Maximum Quantity - splitLineByMaxQty) that splits the chosen line into several lines, none above the entered (Maximum Quantity Per Line), each new line getting its own preparation line code; lines whose status is (Packaged) or (Canceled) are not split. In the Weight Scale Preparation Document, the system now refuses to save a copied line with a repeated line code, with the message (Line code {0} is repeated at line {1}. Split the line from the issue request instead of copying it).
- Added a new file named (Picking Zone - PickingZone) holding the warehouse, a grid of locators and a grid of who may work in the zone (an employee, security profile, user or user group), and added a (Picking Zone - pickingZone) field to the Sales Order, Sales Quotation, Sales Invoice and Stock Transfer Request. In the WMS app, a picking user now sees only the item totals of their own zones, and a user who belongs to no zone sees the items that have no zone.
- In the Weight Scale Preparation Document term config, added an option (Collect Lots From Smallest Sufficient Quantity, Otherwise From Largest - collectLotsByBestFitQty) in the Collect Lots group, so the (Collect Lots) button takes each line's quantity from the smallest lot that covers it, compared in the line's unit after deducting what earlier lines of the document took, instead of the order set in the Supply Chain settings (expiry, first receipt or lot code). The same applies when collecting from the list screen.
- Added a new file named (Item Picking Zone Link - ItemPickingZoneLink) holding the warehouse, priority and picking zone in its header, and a grid that sets the (Preferred Picking Zone - preferredPickingZone) by item, or by size, color and revision, brand, item section or item classes. In the Aggregated Stock Transfer Request term config, added an option (Group by Picking Zone - groupByPickingZone) to split the generated stock transfer requests by picking zone and fill the zone on them, and a field (Max Lines for Generated Stock Transfer Req - maxLinesForGenStockTransReq).
- In the Supply Chain settings, added the fields (Store Gross Weight Reading Time In - grossWeightTimeField) and (Store Empty Weight Reading Time In - emptyWeightTimeField) to choose the line field (Text 1, Text 2 or Text 3) in which the date and time of entering the weight are recorded automatically, shown next to the weight columns as (Gross Weight Time) and (Empty Weight Time). The button that reads the weight from the scale now also refuses to read a weight again when it has already been read on the line, until it is cleared first.

### Sales

- Added payment through Geidea payment links: in the Sales Invoice through the (Pay with Geidea) button, which sends the payment link to the customer by SMS or shows a QR code and adds the payment line automatically once the customer pays; in the (Payment Links Creation Document), which creates a receipt voucher when the customer pays; and in the Point of Sale. It is set up through an (Online Payment Configuration) of type Geidea linked to a payment method, and supports EGP, AED and SAR. Also added the entity flows (EAGenerateGeideaPaymentLink), to create a payment link for any document that supports online payment, and (EACheckGeideaPaymentLinks), which checks the links not yet paid and can be scheduled. For details: [Online Payments Integration](/modules/invoicing/online-payments)
- In the sales documents term config, added a field (Check Min Price With Value After Effect - checkMinPriceWithValueAfterEffect) to choose a stage (a discount from 1 to 8, the header discount, or a tax from 1 to 4), so a line is refused when its net unit price after that stage falls below the price list's minimum price. For details: [Pricing, Taxes & Discounts Configuration](/modules/supplychain/document-terms/doc-term-pricing-taxes-discounts)

### Sales & Loyalty Points

- In the Reward Points Configuration, added an option (Points Expire At The End Of Their Creation Year - pointsExpireAtEndOfCreationYear), so points expire on 31 December of the year of the invoice that earned them, unless the (Points Expiration Period (Days Count)) ends earlier. For details: [Setting Up Nama Reward Points](/modules/invoicing/reward-points-setup)

### Accounting

- In the Prepaid Expense Contract lines, added a yearly amount field (yearlyAmount); when it is filled, the line's total amount is calculated as the yearly amount divided by 12 and multiplied by the number of months in the line's period, so the monthly installment comes out correctly whatever the contract duration.
- In the Receipt Voucher and the Payment Voucher, added a (Collection Discount - collectionDiscount) column to the installments grid to settle fraction differences on an installment so that it closes as fully paid; the discount counts towards the installment's paid amount, its journal entry sides are set in the term config (Collection Discount Debit - collectionDiscountDebit) and (Collection Discount Credit - collectionDiscountCredit), and negative values are not accepted.

### E-Invoicing & Government Portals

- In the Eltezam integration, the (Resend Failed Employees) button in the (MCS Eltezam Submission - EltezamSubmissionDoc) now resends straight to the service URL set in the configuration, without a dialog asking for the address, and an (Eltezam Vacations) list was added to the document to show the vacations that were sent. In the (MCS Eltezam Configuration - EltezamConfiguration), added the option (Log Sending Details - logSendingDetails) to follow the sending process in the server log. Appraisal data is now sent from the (Employee Evaluation) with the start date from (Date 1), the end date from (Date 2) and the result from (Number 3), converted from a score out of 5 to a percentage. For details: [Eltezam Submissions and Sending](/modules/integrations/eltezam/eltezam-submissions-and-sending)
- In the Eltezam integration, the rating code (RatingCode) sent with employee appraisal data is now taken from (Description 1) of the Employee Evaluation, matched against the (Nama Value) column of the RatingCode code table, with the table's default code used when nothing matches, instead of being derived from percentage thresholds on the result. The result (Result) is now sent as a decimal with two decimal places instead of being rounded to a whole number. After updating, the rows of the RatingCode code table must be changed to match the texts written in (Description 1). For details: [What Nama Sends to Eltezam](/modules/integrations/eltezam/eltezam-data-sources)
- Linked the (SFDA RSD Incoming Dispatch - SFDARSDIncomingDispatch) list to the Purchase Invoice: in the SFDA RSD Configuration, added a field (Purchase Invoice RSD Notification ID Field - incomingNotificationIdField) to choose the invoice field that holds the notification number, and added a (Validate Against RSD Notifications) button in the invoice's More menu that matches the lines against the notification (supplier GLN, item GTIN, batch number, expiry date, and a quantity not above what is still available to receive), along with the entity flow (EAValidateSFDARSDIncomingDispatches) to prevent saving a mismatched invoice. When the invoice is processed, edited or cancelled, the received quantity, remaining quantity and status are updated in the list, and the notification is added if it is not there yet. (Remaining Quantity) and (Related Invoices) columns were also added to the list, and the (Refresh Incoming Dispatches) button now asks for the SFDA RSD Configuration and refreshes the selected rows when the notification number is left empty. The check covers only the lines whose item has (Subject To RSD Tracking - subjectToRSD) enabled, and its error messages appear in Arabic. For details: [Reporting Medicine Movements to the SFDA](/integration/sfda-drug-track-and-trace)
- In the scheduled task that sends to Eltezam (EASubmitEltezamData), added an optional last parameter (Book Code of the Created Eltezam Submission Document): when no documents are given, a new (MCS Eltezam Submission) document is created in that book, or in the document's first book when it is left empty, then saved and sent in a transaction of its own, with each step and the run's outcome written to the server log.

### Real Estate

- In the Rent Contract (RERentContract), the installment taxes are now calculated by each installment's due date instead of the contract date. The value entered manually for the yearly increase, maintenance expenses, commission, insurance and water expenses is now kept as entered, with the percentage calculated from it using the currency's decimal places (and vice versa), instead of the value being recalculated from the rounded percentage and showing fractions.
- In the Rental Unit (RERentalUnit) screen, added an (Actions) page that shows, as a timeline, the documents linked to the unit (such as reservations, rent and sales contracts, collections, handovers, maintenance, fines and inspections), with the document type, code, creation date and value date; existing documents are added when upgrading.

### Contracting

- In the Contracting settings, added an option (Calculate Conditions Percentage From Contract Total Before Taxes - calcConditionsPercentFromTotalBeforeTaxes) to calculate the conditions' value in the Subcontractor Contract from the contract value before tax. In the Contracting Condition (ContractingCondition), added the fields (Taxable - taxable) and (Tax Percentage - taxPercent), used when the condition is added to a Subcontractor Contract.

### Customer Relationship Management (CRM)

- It is now possible to embed the (Technician Appointment Creator) screen inside any other screen (such as the Maintenance Order or the Sales Invoice) to book the appointment from inside the document itself, through the Screen Modifier by adding a line to the Embedded Records Editor grid with the type (Technician Appointment) and the layout ID (Technician Appointment Creator), and choosing the page it appears in. The (From Doc) field is fixed to the host document, and the calendar starts afresh when moving to another record.
- The appointment creation screen and the (My Appointments) screen now follow the regular permissions of the (Technician Appointment) type: opening them requires the view capability, saving requires the save capability, removing periods requires the delete capability, and field permissions apply when changing the appointment status, moving its periods or adding a remark, with a message naming the missing capability.
- In the appointment creation screen and the appointments schedule, added an (Open the from document) option to the right-click menu of an appointment, to open the document set in the appointment's (From Doc) field directly.
- In the CRM Lead (CRMLead) screen, added an (Actions) page that shows, as a timeline, the documents linked to the lead (such as calls, follow-ups, visits, offers and tasks), with the document type, code, creation date and value date; existing documents are added when upgrading.

### Human Resources

- Added five new values, (Other 1) through (Other 5), to the medical insurance category list (InsuranceCategory), available in the Employee, the Job Offer, the medical insurance documents and the insurance upgrade document.
- In the Aggregated Reward And Penalty Document (AggrRewardAndPenaltieDoc), the system now refuses to save when the same employee is repeated with the same reward / penalty on more than one line, with a message naming the two repeated lines, and added an option in the document's term config (Allow Repeating Employee With The Same Reward / Penalty - allowRepeatingEmployeeWithSameReward) to allow the repetition.
- In the Shift file (AttendanceShift), added the fields (Earliest Allowed Time Before Shift Start - overtimeEarliestTime) and (Latest Allowed Time After Shift End - overtimeLatestTime) for each work day and in the grouped shifts grid, so early arrival before the first time and staying after the second time are not counted as overtime. For details: [Attendance Plans & Shifts](/modules/hr/attendance/attendance-plans-and-shifts)
- In the Dues Liquidation Document (DuesLiquidationDoc), added a field (Ignore Vacation Work Starting Document For Vacation That Requires Work Starting Document - ignoreVacationWorkStartDoc), to allow saving the liquidation for an employee on vacation whose service ended without a Work Starting Document. For details: [Dues Liquidation](/modules/hr/end-of-service/dues-liquidation)

### Manufacturing

- In the Standard Operation, the routing lines and the Production Order, added an option (Allow Negative Quantity - allowNegativeQty), and in the Routing and Production Order header an option (Allow Negative Quantity For Operation 1 - allowNegativeQtyForOP1), so a Production Execution may move more out of a step than it holds (such as a step that keeps producing past the order quantity), and the step's balance stops at zero instead of the execution being refused. Both options are copied to the Production Orders built from the routing, and need (Use Production Movement System Entry) enabled in the manufacturing configuration. For details: [Production Execution: Recording What Actually Happens](/modules/manufacturing/production-execution)
- In the Carton Order lines, added the fields (Executed Quantity - executedQuantity) and (Unexecuted Quantity - unexecutedQuantity) to track how much of each line has been planned in CRTN Material Planning, and in the CRTN Material Planning item lines added a field (Manually Adjusted Quantity - manuallyAdjustedQty) to plan only part of the quantity, with the remainder brought into the next planning document automatically. The system now also refuses to plan a fully planned order, to reduce a line's quantity below what is already planned, and to remove a planned carton specification from the order. For details: [Carton Orders: From Customer Request to Production Plan](/modules/manufacturing/carton-orders)
- In CRTN Material Planning, added a (Manual Adjustment in Material Planning - manualAdjustmentsInMaterialPlanning) grid in which you pick the CRTN Specification and the (Stage Line Number - stageLineNumber) of its first production stage, to override that line's data manually (such as the material type and grammage) for this document only, instead of the data coming from the CRTN Specification.
- Added a new document named (Carton Sales Invoice - CRTNSalesInvoice) created based on a Carton Order, taking from it the customer, salesman, tax plan, subsidiary, currency and rate, and one line per order line with the CRTN Specification, item, quantity and price; from there it works as an ordinary sales invoice. For details: [Carton Orders: From Customer Request to Production Plan](/modules/manufacturing/carton-orders)

### Vehicles

- In car insurance, added the new documents (Car Insurance Policy Purchase Return - SIInsurancePurchaseReturn), (Car Insurance Policy Receipt Cancellation - SIInsurancePolicyReceiptCancel) and (Car Insurance Policy Delivery Cancellation - SIInsurancePolicyDeliveryCancel). In the Car Insurance Policy, added the fields (Initial Cost - initialCost) as a value or a percentage, (Actual Cost - actualCost) updated from the policy purchase invoice, the supplier, and the marks (Purchased - purchased), (Received - received) and (Delivered - delivered), which are updated by the documents and cleared when they are deleted. In the Car Insurance Policy Purchase Invoice and the Car Insurance Policy Delivery, added the payment methods grid and the discount, tax, total, paid and remaining fields, with their accounting effects in the term config; saving the invoice regenerates the receipt and delivery cost journal entries at the actual cost, and deleting it returns them to the initial cost. The cost sides (costDebit - costCredit) were also added to the receipt and delivery term configs, and the net value sides (netValueDebit - netValueCredit) to the delivery term config to record the revenue.
- In car insurance: added a field (Policy Service Item - policyServiceItem) in the Service Center configuration and an option (Add Policy Service Item Line With Save - addPolicyServiceItemLineWithSave) in the Car Sales Order term config, so saving adds a line with the insurance service item priced at the value of the policy set in the Sales Order header. In the Car Insurance Policy, added the fields (Policy Type - policyType) with the values (Issuance - External Issuance - Renewal - External Renewal), (Insurance % - insurancePercentage), (Buyer Insurance Percentage - buyerInsurancePercentage), (Renewed - renewed), (New Insurance Policy - newInsurancePolicy) and (Insurance Policy Image - insurancePolicyImage). In the Insurance Policy Issuance Order, added (Policy Type) to collect issuance or renewal policies, and the sales order date, policy delivery document and its date on the lines. In the Car Insurance Policy Receipt, added (Policy Number - policyNumber) and (Insurance Policy Image) on the line, which are copied to the policy along with the start and expiry dates. In the policy Renewal, Period Adjustment and Value Adjustment documents, added (New Insurance Policy) on the line to link the new policy to the old one and mark it (Renewed), with the sides (Total Insurance Price Debit - totalInsurancePriceDebit) and (Total Insurance Price Credit - totalInsurancePriceCredit) in the renewal term config. The buyer insurance percentage in the Car Insurance Program and the purchase value in the policy purchase invoice now accept 4 decimal places.

### Freight Management

- In the Service Sales Price List (FRMSalesPriceList), added the (Markup - markup) value and percentage fields to the Ocean Freight, Custom Clearance, Trucking, Genset and Other lines; the line's markup takes precedence, and when it is empty the markup in the document header (such as oceanFreightMarkup) is applied. The value is used when filled, otherwise the percentage is calculated from the pricing cost.
- In the FRM Operation Order (FRMOperationOrder), added the fields (Container - container), (Loading Date - loadingDate) and (Loading Time - loadingTime) to the (Multi Loading Points) grid, along with extra line fields (b1 - b3), (text1 - text3), (ref1 - ref3), (date1 - date3) and (remarks2 - remarks5).

### Travel

- Added two new files named (Platform - TRPlatform) with a percentage, and (External Driver - TRExternalDriver) with a phone number and address. In the Tour (TRTour), added the fields (Adult - adult) and (Child - child), whose sum cannot exceed (PAX), the fields (Internal Driver - internalDriver) from the employees, (External Driver - externalDriver) and (Car - car), and (Arrival Time - arrivalTime) and (Departure time - departureTime), with the same tour guide, car or driver prevented from being booked on two overlapping tours, and a (Pax Data - paxData) grid with the name, confirmation code, net, phone number, platform, three attachments and status. Also added a new document named (Pax Check-In - TRPaxCheckIn), created based on the tour to set each passenger's status (Confirm - No Show - Reschedule - Cancel); the status is carried to the tour and can only be changed through it.

### Point of Sale

- Added payment through Tamara in the Point of Sale: the cashier picks the Tamara payment method and enters the amount, then sends the payment link to the customer by SMS or shows a QR code, and the system follows the payment status until it completes; the order is cancelled at Tamara if the screen is closed before payment, and a return refunds the amount through Tamara. It is set up through an (Online Payment Configuration) of type Tamara, with the option (Test Mode - testMode) for the sandbox environment, linked to a payment method.
- In the POS Sales Return (NamaPOSSalesReturn) made from an invoice on the server, the register now keeps a held copy of the return (pending server confirmation) before sending it to Nama, and turns it into the final return once the send succeeds, so the return is no longer lost on the register if the connection drops after Nama saved it. Opening a pending return from the held documents first checks with Nama whether it already has it, to confirm or complete it, and the shift cannot be closed while returns are still unconfirmed by the server. For details: [Returns & Replacements](/modules/pos/pos-returns-and-replacements)
- In the POS settings, added an option (Consider Value Date From From Document In Pricing And Offers - considerValueDateFromFromDocInPricingAndOffers), on by default, so prices and offers in the POS Sales Return and replacement are calculated at the date and time of the original Sales Invoice rather than the return date, and an option (Do Not Update Prices When There is Sales Doc In From Doc - doNotUpdatePricesWhenThereSalesDocInFromDoc) to keep the original invoice's prices. For details: [The POS Settings Screen](/modules/pos/erp-setup/pos-settings-screen)
- In the POS Sales Return (NamaPOSSalesReturn), added a column (From Doc Quantity - fromDocQty) next to the returned quantity, showing the item's quantity on the original Sales Invoice. For details: [Returns & Replacements](/modules/pos/pos-returns-and-replacements)
- In the POS Security Profile (POSSecurityProfile), added a capability (Can Edit Free Item Dims - canEditFreeItemDims) that allows editing the dimensions of free items (such as lot, serial and expiry date) by hand, separately from the (Can Edit Item Dims - canEditItemDims) capability.
- In the POS Sales Return, added a (Return Type - ReturnType) field to the screen header fields with two values: (Full Return), where the items load with the original invoice quantities, and (Partial Return), where the items load at zero quantity and the cashier sets the quantity by scanning or typing; lines left at zero are dropped on payment, and prices and discounts are taken from the original invoice. For details: [Returns & Replacements](/modules/pos/pos-returns-and-replacements)

### Mobile Applications

- In the (Pending Orders) screen of the Nama Mobile app, added a summary showing the number of delivery documents in each delivery status and its share of the total. It shows only the driver's own documents, except for users listed in the new (Mobile Security Configuration - MobileSecurityConfig) screen with (See All Drivers Delivery Status - seeAllDriversDeliveryStatus) enabled. For details: [Administering Nama Mobile from the ERP](/modules/mobile/mobile-administration)
- Added a (Cars) module to the Nama Mobile app, containing the Car Sales Order (SISalesOrder), Car Receipt (SIReceipt), Car Final Delivery (SIFinalDelivery) and Car Allocation (SIAllocation), with the car details such as the chassis number, engine number and accessories. Attachments 3 to 10 were also added to the Car Receipt lines to upload pictures of each car.

### Reports

- Report parameters defined as a date range (showAsDateRange) now also show in the old GUI, as a (From) and (To) pair on one row whose values are written into the two linked date parameters (fromDateId - toDateId); either end can be left empty. For details: [Jasper Reports Complete Guide for Nama ERP](/platform/reports/reports-guide)
- It is now possible to sort report parameters into groups shown as titled, collapsible sections, through a group parameter (paramGroup) that the parameters refer to with (paramGroupId), with the (collapsed) property to show it folded, and, with the (rememberLastValue) property, to have the report screen open on the last value the user chose for a parameter. In the (Report Wizard - ReportWizard), added the grid (Parameter Groups - parameterGroups) and the columns (Parameter Group - paramGroupId) and (Remember Last Value - rememberLastValue) on the parameter lines. Both features work in the new GUI only. For details: [Jasper Reports Complete Guide for Nama ERP](/platform/reports/reports-guide)

### Settings

- In the (WhatsApp Message), added the column (Parameter Type - parameterType) to the (respond.io) template parameters grid, with the values (Body) and (URL Button - UrlButton), so it is now possible to pass a value to the template's URL button as well as to the message body.
- In a record's discussions list, added the action (Delete Selected Discussion Records) to the More menu; it is available to admin users only, and the deletion, with the number of deleted records, is logged in the record's Action History.
- In the Fields & Screens Settings, (Invoice Retriever Lines) grid, added the column (Print Using System Defined Printing Form - printUsingSystemForm), so the link in a notification prints each document with the form the system picks for it when printed from its own screen, with no need for a report definition and a line per document type, plus the columns (Entity Type - entityType) and (Entity Type List - entityTypeList) to limit the line to certain types. (Report Definition) must be left empty when it is ticked, and drafts follow the same draft printing rules as the Print button. For details: [Integrators and Public Links](/platform/fields-and-entities-settings/fields-settings-integrations)
- In the Entity Flow, added the grid (Manual Run Allowed Users - manualRunAllowedUsers) to set who may run the entity flow manually; each line sets (Allow - Disallow), the (Target) — a user, security profile, employee or employee group — and (Document Criteria - documentCriteria), and the system refuses a manual run by anyone the grid does not allow.

### Artificial Intelligence

- Added attachment upload and download tools to the Nama MCP server: (PrepareAttachmentUpload) creates a link to upload a file, which is then attached to the attachment field through the (ImportRecord) tool — which now also accepts an attachment as a (url) that the server downloads itself — and (PrepareAttachmentDownload) and (PrepareAttachmentDownloadById) create a link to download an existing attachment. For details: [Nama ERP MCP Server](/modules/ai/ai-mcp-server)

### Business Intelligence

- Dashboards now adapt to phone screens, showing the widgets one under another in a single column.

### New GUI

- In the report result screen, added a (Re-Run With Parameters) button with the (F5) shortcut, to run the report again with the same inputs instead of showing the previous result when the page is refreshed. The button is also available in the old GUI.
- Updated the PDF export of grids: the file now uses a font that supports Arabic and the page widens to fit all the columns instead of shrinking them; the export needs an internet connection to load the font. Also added a (Print) button to the lines grid toolbar that exports the lines to PDF for users with the print permission, and printing from a list with no rows selected now prints the rows of the current page.
- The new GUI no longer opens in old browser versions, and shows the message (Your browser version is too old to run Nama ERP. Please update your browser to the latest version.).

### e-commerce Integration

- In the Omniful Configuration, added a field (Shipping Item - shippingItem), so the shipping value of orders coming from Omniful is added as a line with that item in the Sales Order.
- When the SKU coming from the store is not found in the (Magento Item Linker - MagentoItemLinker), the system now looks it up in the Item Codes (InvItemCodes) and takes the item and its dimensions from there, before looking it up by the item's own code.
- In Sales Orders coming from Omniful, the price of the (Shipping Item) line is now calculated without the 15% VAT when the shipping value in Omniful is tax-inclusive.
- In the entity flows (EAReadOmnifulOrdersByIds) and (EAEcommerceReadOrders), added a parameter for an order IDs template (such as `{remarks}`) to read the order numbers from a field of the record the flow runs on; it is used only when the order IDs parameter is empty, and the two parameters cannot both be filled.

## Fixes

### Inventory

- In the Stock Issue, fixed an issue where the (Copied From Doc - orginDoc) field on the line was cleared after pressing Enter when a maintenance document was chosen in it. The references grid in the Fields & Screens Settings now also carries the title (Allowed Values For Generic References); allowed values for a reference field such as this one are added there, not in the allowed values grid for fields.
- The system now prevents saving a system-generated Stock Receipt or Stock Issue created from an invoice when it is not linked to its invoice, with the message (The system document {0} is not linked to its invoice {1}), after a missing link used to stop the stock document's effect from being cancelled when the invoice was cancelled.
- Fixed an issue where cost processing was very slow: settled cost overdraft lines are now deleted instead of being kept marked as deleted, and the existing ones are cleaned up automatically with the update.
- In the Weight Scale Preparation Document, fixed an issue where collecting lots split a line over several lots with the same line code; a line now takes the first lot that covers its whole quantity, and when no lot covers it, no lot is selected and the line's status changes to (Other 1).
- In the Weight Scale Preparation Document, the Stock Issue Request and the Raw Material Issue Request, the header status now follows the line statuses: (Packaged) when all lines are packaged, (Finished) when all lines are either packaged or canceled, and (In Progress) otherwise.

### Sales & Loyalty Points

- In the (Customer Reward Point Calculator - RewardPointCalculatorConfig), fixed an issue where the dimensions set in the file's header were ignored when calculating points, and where the header criteria were added as a separate line ahead of the file's lines. The matching line is now chosen by the item and the invoice line's dimensions (or the invoice header's when the line has none), including composite dimensions, and the header data is treated as a line only when the file has no lines.
- In the (Reward Points Restriction - RewardPointsRestriction), fixed an issue where loyalty points stayed earned on a restricted customer's past invoices when they were re-saved or their points were recalculated through an entity flow, as only the journal entry was removed; the points themselves are now cancelled. The date and repeated-customer checks also now run on every line of the document instead of the first line only.
- In the (Customer Reward Point Calculator - RewardPointCalculatorConfig), fixed an issue where the first line was applied regardless of the (From Amount) and (To Amount) fields; the line is now chosen by the invoice total, a return is matched by its original invoice's total, and the header values are copied to lines that leave them empty.

### Accounting

- Fixed an issue where the subsidiary, amount and currency were not copied when creating a Receipt Voucher based on a Maintenance Order or a Maintenance Invoice.
- Fixed an issue where the system journal entry generated by the Receipt Order had its sides reversed, with the treasury on the credit side and the lines on the debit side; the entry now matches the Receipt Voucher, and the same applies to the Payment Order.
- In the Ledger Transaction (LedgerTrans) screen, fixed an issue where the (Revised - revised) and (Revise Level - reviseLevel) filters did not work, along with the book, term and e-invoice status filters.

### E-Invoicing & Government Portals

- In the (SFDA RSD Line Results - SFDARSDLineError) screen, each line now shows the latest status it reached after correction and resending, instead of its status at the first submission, and a (Status) column was added for display, filtering and sorting.
- In the (SFDA RSD Incoming Dispatch - SFDARSDIncomingDispatch) list, fixed an issue where an error appeared when refreshing by notification number.

### Contracting

- In the Subcontractor Extract, the advance payment condition is now brought in at its value before tax with its tax calculated separately, including in the final extract, and the condition's tax percentage now follows the (Taxable) and (Tax Percentage) fields of the Contracting Condition.
- In the Project Extract (ProjContrExtract), fixed an issue where the (Total Due Value - totalDueValue) field included VAT in a project's first extract but not in the following extracts; in the first extract it now also equals the extract total before taxes and discounts.

### Customer Relationship Management (CRM)

- In the appointment creation screen, fixed an issue where adding only a reason, without changing the appointment time, did not update the appointment or its (Change History) page; adding a reason on its own is now recorded as well.

### Human Resources

- Fixed an issue where the Employee screen did not allow adding a new record or editing an existing one in the old GUI, while it worked normally in the new GUI.
- Fixed an issue where creating a Salary Sheet (SalarySheet) was slow and took an hour or more.
- Fixed an issue where the same Salary Document could be saved in more than one Salary Sheet; the system now refuses to save when the employee already has another salary document for the same period and issuance from outside the salary sheet, ignoring cancelled documents, and this also applies when saving as a draft.
- Fixed an issue where the employee, start date, return date and vacation period were not copied when creating an Evacuation Party Document (EvacuationPartyDocument) based on an Aggregated Vacation Document or an Aggregated Vacation Request, as they are from a Vacation Document; the contact information during the vacation is now copied as well.
- In the Manual Measure document (ManualMeasures), fixed an issue where the amount was silently left out of every salary document when the document's salary issuance differed from the issuance of the salary component linked to the indicator; the system now refuses to save with a message showing the component and its issuance.

### Manufacturing

- In the (Order Close - OrderCloseVoucher) document, fixed an issue where a second close voucher could be saved for a Production Order already closed by an earlier one; the system now refuses the save with the message (Production order {0} is already closed by order close voucher {1}).

### Point of Sale

- Fixed an issue where a Sales Offer (SalesOffers) was applied in the POS to all branches even when a specific branch was set on the offer line; the POS now honours the dimensions (such as the branch) set on the offer-on-items-count lines and the free item lines, as Nama does.
- With the option (Do Not Auto-Add Free Items (Claim By Scan Or Resolve At Payment) - dontAutoAddFreeItemsClaimByScanOrResolveAtPayment) enabled, fixed an issue where the free item's quantity was not adjusted when the main item's quantity was changed; claimed free items now follow the new quantity, with a message when they are reduced. In the (Pending Free Items) window it is also now possible to type the quantity and the code with a star between them (such as `3*6221234567890`) to add several units at once. For details: [Free Items in POS: Claim at Scan and Reconciliation at Payment](/modules/pos/pos-free-items-claim-and-reconciliation)
- Fixed an issue where the mobile number was not copied from the typed code when adding a new customer from the POS; a country code typed with the number now also moves to the country code field.
- When paying by card terminal (mada) through the PGW app, fixed an issue where the POS stopped responding if the screen was clicked while waiting for the terminal; it now shows a waiting window with a (Stop waiting) button, and if the terminal approves the payment after the wait is stopped, the payment is added to the payments or a message asks to refund it from the terminal. The POS also no longer sends a new payment to the terminal before the previous one has finished, to avoid charging twice.
- Fixed an issue reading the barcodes of RSD-tracked items in the Windows version of the (Captain Order) app, as already fixed in the Android version.

### Mobile Applications

- Fixed an issue where values in the dashboard tables of the Nama Mobile app were shown differently from how they appear in Nama.
- In the Service Queue app, fixed an issue where the user could not log out of the app after their password was changed in Nama; an engineer number held by a device that stopped connecting is now also released automatically after about a minute. For details: [The Service Queue App](/modules/mobile/mobile-service-queue-app)

### Settings

- Fixed an issue where an error appeared in the log when sending WhatsApp messages from the system to a recipient that has no mobile number; the system now skips sending to that recipient.
- In General Announcements, fixed an issue where an announcement disappeared from the (General Announcements) panel after it was shown once and the page was reloaded; an announcement now stays visible for its whole period while it is active. For details: [General Announcements](/platform/notifications/general-announcements)
- In the (Current Approvals) screen, fixed an issue where documents pending approval that belong to a legal entity other than the login legal entity appeared for a user whose permissions are at the public legal entity level; the list is now filtered by the login dimensions (legal entity, sector, branch, department and analysis set).
- Fixed an issue where the option (Ignore Word Order In Search - ignoreWordOrderInSearch) in the Global Config did not work when values were set in (Code Search Operator - codeSearchOperator), (Name 1 Search Operator - name1SearchOperator) and (Name 2 Search Operator - name2SearchOperator), or when searching in parameters or by the file's code.
- In Scheduled Tasks, the system now refuses to save a task of type (System) without a (Query), or with a (Class Name), which is used only by tasks of type (Action); previously such a task was saved and did nothing, as happened with the (EASubmitEltezamData) task of the Eltezam integration. For details: [Scheduled Tasks (Task Scheduler)](/platform/automation-and-rules/scheduled-tasks)
- In the entity flows that delete the related document generated from another document (DeleteRelatedEntityAction) and (EAAutomaticGenerateEntityFromEntityAction), fixed an issue where an error preventing the related document's deletion was ignored, so that document stayed in place with its effect when the original document was cancelled; the error is now shown and the operation is refused.
- Fixed an issue where deleting an attachment from a saved record and then saving always failed with the message (Can not create XML data), so the attachment could not be removed at all.

### Artificial Intelligence

- In the MCP server's record import tool (ImportRecord), the response now shows the code each record was actually saved under when it differs from the code sent (for example when a book, a master group or a default-values template assigns the code), and a reference code that matches no record now fails that record with a message instead of saving it with the field left empty. For details: [Nama ERP MCP Server](/modules/ai/ai-mcp-server)

### Business Intelligence

- Fixed an issue where cards overlapped on dashboards set to a fixed number of columns per row, and improved how widgets look in dark mode: light colours set on a card no longer show as grey blocks, and a chart's background now covers the whole widget including its title.

### New GUI

- In the Time Attendance screen (TimeAttendance), fixed an issue where the message (The operation cannot be performed) appeared when pressing (Import Attendance Lines - importAttendanceLines) for a fingerprint log file.
- Fixed an issue where the date value turned into (Invalid Date) when saving a criteria with a condition on a date field set to a specific date, such as (Value Date = a specific date).
- Fixed an issue where an error appeared when saving a Commercial Paper (FinancialPaper) opened from a create button on another document; date fields filled by the button are now read correctly.
- Fixed an issue where a column added to a grid through the Screen Modifier appeared as the last column; it now appears in its position according to the screen's column order.
- Fixed an issue where rows stayed selected in lists after leaving the page and returning to it; the selection is now cleared on leaving.
- When all the fields of a grid are hidden from the user through (Disabled Fields) in the Security Profile or the user, the whole grid including its title is now hidden, instead of the grid's title showing with nothing under it.
- Fixed an issue where showing a list took more than two minutes when using a saved filter containing brackets, because the conditions inside the brackets were repeated on saving.
- In the quick search of the code field in any master file, fixed an issue where the search used the dimensions of the currently displayed record (such as the selected customer's dimensions) instead of the user's login dimensions.
- Fixed an issue where editing a big text field (bigText) after filtering or sorting the grid also changed another line, and an issue where attachments uploaded on the lines disappeared after refreshing or sending for approval. In the Questionnaire (CRMQuestionair), fixed an issue where the message (The operation cannot be performed) appeared when choosing (Answer|Text - responses.textResponse) in the lines.
- Sorting by reference columns in the lines grid is now by code instead of by name.
- Fixed an issue where the message (The operation cannot be performed) appeared when sorting in the list screen (all records) if a column was repeated in the list's columns.
- Fixed an issue where page scrolling stopped when the mouse passed over code editor fields; the editor now takes the scroll only after clicking inside it.
- Fixed an issue where the (layout=alone) property was ignored in report parameters; the field now takes a line of its own as in the old GUI.
- Fixed a delay when using the create-document buttons.
- Fixed an issue where warning (yellow) and error messages showed incomplete on one line when they contained a long word such as a long code; the text now wraps to show in full.
- Fixed an issue where the drop-down of list and reference fields (such as the employee status) stayed open and moved with the page when scrolling with the mouse wheel; it now closes when the page scrolls.
- In the audit trail, fixed an issue where (Compare Selected Versions) worked only once and the screen had to be closed for it to work again. For details: [Audit Trail and Version History](/platform/governance/audit-trail)
- In lists (such as the Payment Request list - PVRequest), fixed an issue where a column filter's values list was empty with the message (Invalid criteria, closed brackets are more than open brackets) when opening it while another column filter was active, and an issue with typing to search inside the (Paid From) column filter.
- In the Options Search screen, fixed an issue where the (URL) column in the results showed as plain text that could not be clicked; it is now a link that opens directly on the option, as are link columns in other grids. For details: [Options Search — Finding Where an Option Lives](/admin/options-search)

### e-commerce Integration

- In the Salla integration, fixed an issue where some orders did not reach Nama unless read through the scheduled task that reads orders by IDs, and where cash-on-delivery orders did not become Sales Invoices after their status in the store changed to (Delivered).
- Fixed an issue where orders were not read from the (BigCommerce) store.
- In the entity flow (EAAmazonReadRefundsAsReturns), fixed an issue where an Amazon return with more than one item brought back only one item, and some returns failed with the error (details cannot be empty); the returned item is now also matched through the item linker.
- Fixed an issue where a payment method appeared with a negative value in Sales Orders coming from e-commerce stores (such as Salla) when the order was paid with more than one payment method.
- Fixed an issue where Sales Orders coming from Omniful were duplicated when the same order status arrived more than once through different (Webhooks) events.
