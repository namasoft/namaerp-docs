# Nama ERP Release Notes - August 2026

::: info Release Information
- **Release Date**: August 2026
- **Release Number**: Nama-ERP-202608
:::

## Additions

### Inventory

- In the Item file, an option was added in the colors and sizes lines named (Not Used in Point of Sale) that prevents using the color/size barcode within Point of Sale.
- Added the ability to generate a custom serial number for items during stock receipt based on the batch number (Batch), in a format made up of a fixed prefix, then the year, then the item department code, then a numeric sequence, with the sequence linked to the item department rather than the receipt voucher, so it keeps incrementing with each new batch for items of the same department, whether in the same voucher or in a later one.

- Added the Warehouse Management System (WMS) within the Supply Chain, made up of three screens: (Warehouse Receipt Voucher - WMSReceiptDoc), (Warehouse Picking Voucher - WMSPickingDoc), and (Warehouse Pallet - WMSPallet), along with a dedicated mobile app for warehouse workers. Receipt and picking vouchers are created from source documents according to a creation method and criteria configured in the term config, and they track received, stored, picked, and packed quantities, their remaining quantities, execution priority, and damaged items, then generate the resulting stock receipt, issue, and transfer vouchers.

### Sales & Quotations

- In the Sales Return, the (details.sourceInvoice) field on the line now displays the customer's invoices that contain the item mentioned on the line, and when an invoice is selected, its prices and discounts for this item are fetched. Invoices in which the item's quantity has already been fully returned are hidden, and the return is limited to the invoice's remaining quantity. This also works in the Sales Return Request and in the return vouchers of Service Centers.
- Added an option in the Sales Invoice term config named (Ignore Max Discount Validation If Discount Exists In From Doc - ignoreMaxDiscValidationIfDiscountExistsInFromDoc), so the system no longer objects to the discount again when creating the invoice based on a Sales Order whose discount was already approved by the permission holder.
- Added an option in the Sales Documents term config, within the Rounding Discount group, named (Consider Payments Not Affecting Remaining With Approximation Discount), to handle the rounding discount configuration in Sales Returns.

### Accounting

- Added a new document named (Aging Allocation) to settle a subsidiary's debit or credit debt aging directly according to the nature of its account, without needing to open a Receipt or Payment Voucher and add the invoices inside it.
- Added an option in the Credit Notes term config named (Use Total After Taxes As Invoice Payment - useTotalAfterTaxesAsInvoicePayment), after the note's value used to be transferred to the invoice before tax, which resulted in a remaining balance on the invoice.
- In issuing financial statements, it is now possible to produce the General Ledger trial balance comparing between years.

### E-Invoicing & Government Portals

- In the Debit and Credit Notes term config, added a field (send As) to determine the nature of the document sent to the Authority (treated as a Sales Invoice / as a Sales Return / as a Debit Note), and the selected value is linked to the (InvoiceTypeCode) field in the sent XML file. The same field was added to the term config of the Lease Contract Cancellation voucher (RECancelContract) and the Fine voucher (REFineDoc).
- It is now possible to send the seller's bank details with invoices sent to the Egyptian Tax Authority. For details: [Egyptian e-Invoice and e-Receipt](/modules/invoicing/egypt-einvoice-guide)
- Added a new table (SFDARSDDocStatus) and a list screen for it that shows the latest status of each document in the Drug Tracking Authority (RSD) just once, instead of tracking it in the (SFDARSDReportTask) lines, which repeat with every resend, with the ability to select a group of documents and resend them.

### Contracting

- Added an option in the Subcontractor Extract term config named (Consider Previous Tax Values From Previous Extracts - termConfig.considerPreviousTaxValues), so the tax journal entry is issued with the value of the current extract only, not the total taxes of previous extracts, as is the case in the Project Extract term config.
- In the Contracting settings, added an option (Do Not Copy Contract Data In Contracting Purchase Order and Request When Selecting The Contract - doNotCopyContractDataInPurchaseDocs).

### Real Estate

- Added an option in the Rent Contract and Opening Rent Contract term config named (generateRentInstallmentLedgerByLine) to issue the rent accrual journal entry for each installment separately, so the insurance installment is not combined with the first installment in a single entry when they fall in the same period.

### Fixed Assets

- Added attachments (1 through 5) in the header of the Custody Purchase Document (FACustodyPurchaseDocument) and in the header of the Fixed Assets Opening Document (FAOpeningDocument).

### Vehicles

- In the (SIAllocation) screen, added the payment-by-external-vouchers grid and the installments grid.

### Customer Relationship Management (CRM)

- Added a new group of screens for the Technician Appointments system. For details: [Technician Appointments Overview](/modules/crm/technician-appointments/crm-technician-appointments-overview)
- In the Technician Appointments system, added the (Technician Appointments Schedule) screen where each technician sees only their own appointments, in a daily or weekly view, without seeing others' appointments; also added a (Create New) button inside the Technician Appointment Creator screen, and (Descriptors) are now taken into account in the appointment name shown on the appointment creation page.
- In the (Update Customer Info) screen, the screen now includes all editable customer fields instead of a limited number of them, so modification dates and previous values are recorded for data such as contact methods, address, and national ID number.
- In the Questionnaire Template file, added the options (showAttachment1InQuestionnaire through showAttachment8InQuestionnaire) to show the attachment fields inside the questionnaire page, so the customer can upload attachments while answering.
- In the Maintenance Order (MnOrder) and Maintenance Order Request (MnRequest), added accounting effects.

### Human Resources

- In the Job Candidate screen (HRCandidate), added residence data (number, issue date, and expiry date) on the Personal Information page, transferred to the Employee file when choosing to create an employee.
- In the Residence Renewal voucher (ResidenceRenewReq), added attachments 2 through 5.
- In the entity flow (EATimeAttendanceFromDBImporter), it is now possible to specify an employee or group of employees via a query to import only their fingerprint data without the rest of the employees.
- It is now possible to integrate with the (timetaag) site via (attcron) to import attendance and departure records. For details: [Integration with Attendance Machines](/integration/attendance-machines-integration) and [Attendance Machines](/modules/hr/attendance/attendance-machines)

### Point of Sale

- Added a field (Shift Work Time) in the POS settings and in the Machine file, with the Machine file's value taking precedence over the settings' value, so no new operations are allowed on the POS after the specified time as long as the shift is open, until it is closed.
- Added a button (Instant Data Sync) inside the POS screen, containing options for customers, items, price lists, and offers, to sync what the user selects with the main server.
- In Point of Sale, it is now possible to return an invoice containing a quantity without a shipment number, without being required to enter a shipment number.
- Added a permission named (Ability to Edit Item Dimensions) in the POS permissions file, to control editing the shipment number, serial number, and the production and expiry dates.
- Added a new file that is sent to POS to execute an (update) statement on the POS databases specified inside it.
- It is now possible to complete payment via (NearPay) through the browser on tablet devices running Android, by enabling the (work as payment gateway) option in the (Captain Order) app and setting the port, then defining a (Payment Terminal) file with the values: provider = nearpay, ip = 127.0.0.1, and port = the port shown on the gateway screen on the mobile, with this file used in the Sales Invoice or the voucher through which payment will be made.

### Mobile Applications

- In the Nama Aggregate app, added the (Employee Info) screen within Payroll, ordered first before Electronic Attendance, showing the employee's data as (Tabs) pages.
- Added the Salary Voucher in the app, showing the salary details when tapping the month, with access to it via fingerprint.
- In the employee's dashboard, added the accrued, consumed, and remaining vacation balance as a chart at the top of the dashboard, and the vacation circle now shows the current balance inside it and the annual accrued balance outside it.
- In the Delivery screen, it is now possible to copy text from the text fields in (Pending Delivery) and (Assign To Delivery), whether viewed from the list or from inside the screen.
- In the delivery vouchers awaiting delivery, added (Based On) with the type and code, along with reducing the spacing between lines to show a larger number of vouchers on the screen.
- Added a (General Announcements) file to display general instructions and decisions, shown to specific users or to all users if none is specified, both in the app and in Nama.
- In Quick Help, added an option (Do Not Apply With Mobile App - doNotApplyWithMobileApp).

### Reports

- After running a report and the result appearing, the link in the browser now includes the temporary print ID, so refreshing the page fetches the previous result instead of rerunning the report. Also, running the same report with the same inputs by the same user now shows the same result on both pages, reusing the output of the ongoing run instead of starting a new run.
- In the Report Builder tool, added a field (borderLinePreset) in the document header with the options (No Lines / Outer Lines Only / Inner Lines Only), and two fields (horizontalBorders, verticalBorders) on the lines to control the lines of each column separately.
- In the Report Builder tool, added an option (allowSelectingMultipleGroupsAsParameter) to select more than one group through a parameter.
- Added an action (Create Printing Form From This Screen) in the (More) menu on list screens and edit screens.
- Documented how to use the function (getVacationAssignedConsumedRemainder) to extract the accrued, consumed, and remaining amounts, each separately. For details: [NamaRep Expression Reference](/platform/reports/reports-namarep-reference)

### Import & Export

- In the Record Import settings (RecordImportConfig), it is now possible to reference a direct cell address in the Excel sheet such as (B3) or (A99), and the same capability is available in Excel import via entity flows and in SQL statements. For details: [Advanced Record Import](/platform/import-export/advanced-record-import)

### New GUI

- Added a field (Visible Only To User - onlyForUser) in the Theme screen (GUITheme), and a field (Allow Creating Theme Visible To All - canCreateThemeForAllUsers) in the permissions file, and the (Add New) button in the interface settings was changed to an (Edit My Theme) button. So a user's themes no longer appear to others, and only someone with the permission can create a theme visible to everyone.
- Added an option (Used As Module - useAsModule) in the (Entity Type List - EntityTypeList) screen, so all vouchers and files in the list are treated as a single module that automatically appears in the quick filtering of the (Approval Case, Recycle Bin, PendingTasks, User Notifications) tables, while preventing any type from being duplicated across two files marked with this option.
- Added an option in Global Config (Ignore Word Order In Search - ignoreWordOrderInSearch), and a new criterion among the criteria named (Contains - Ignore Word Order - ContainsWithAnyOrder).
- Added an option in Global Config (Always Use New GUI - alwaysUseNewGUI) that blocks access to the old interface.
- Office attachments (Word, Excel, and others) are now displayed via (Google Docs) by default, with an option in Global Config to turn this off named (Do Not Use Google Docs To Preview Office Attachments - dontUseGoogleDocsForOfficeFilesPreview).
- The company name now appears on the login page before logging into the program, taken from Global Config (value.info.companyNameForLoginPage).
- Added the ability to color fonts in the new interface.
- In the list view, it is now possible to search within the screen's (ID) column.
- In Chat, added an indicator showing the message status (Sent / Seen).

### Settings

- Added (Task Queue - TaskQueue) to divide tasks into independent groups, each group running isolated from the others. Entity flows that require saving to the database before execution (runAfterCommitDocAndEffectOnDB) no longer block each other by running one after another, and it is now possible to dedicate a queue to a group of scheduled tasks that wait on one another without affecting the rest of the tasks.
- In Approvals, added Escalation to Direct Supervisor, and (Escalate to Direct Manager) was renamed to (Escalate to Senior Manager) to match the label used in the Employee screen.
- In Approvals, escalation to the direct supervisor or senior manager now takes delegation into account, so the approval is sent to the delegated employee instead of the original employee specified in the approval path.
- When an employee has an active delegation, every alert sent to them now also reaches the delegated employee for the whole delegation period, with a note that the alert originally belongs to the primary employee. This feature is enabled by default and can be turned off with the option (Do Not Send Alerts To Delegated Employee) on the Notifications page in Global Config, or a specific alert can be excluded with the option (Do Not Apply Delegation) in the alert definition. It is also now possible to use the action (Transfer Notifications To Delegated Employee) after saving the delegation to transfer unread notifications to them.
- The system no longer sends alerts to users banned from logging in or to employees not currently active on the job, and logs this in the log.
- In Global Config, added a field (Backup Folder - backupFolder) and an option (Do Not Check For Backup Existence - doNotCheckForBackupExistence). If the field is empty, a critical error appears, and if the folder has no backup dated today or yesterday, an error message appears. The option works with both permission levels (L1, L2).
- In the (Detailed Remark) screen, added a large text field in the header named (remarks2), which already exists in (Form Docs) and (Meeting Remark).
- The Chat feature is now available within the customer's license content.
- In the (Search Extra Filters) table in the User and Permission file, the fields (Works Only When Searching Within Type) and (Within Type List) now refer to the type that owns the field, so the criteria are applied to fields found inside Approval screens such as (steps.escalateTo).

## Fixes

### Inventory

- Fixed an issue where the item cost was not recalculated in a Stock Receipt after deleting the Purchase Invoice it was based on, where the system kept the cost as if the invoice still existed.
- Fixed an issue where the quantity was multiplied by the conversion rate when creating a Stock Receipt in the smaller unit based on a Purchase Order in the larger unit, and the resulting incorrect effect on the item's warehouse cost.
- In the Additional Receipt Costs screen, corrected the remaining balance formula to become (Net After Tax - Paid), and corrected the total in the document currency to be the total after tax.

### Sales

- Fixed an issue where the message (Document is not balanced. Difference 0.01) appeared when re-saving the Sales Invoice after changing the separator settings and the number of decimal places for the currency and entering the exchange rate manually, where the final result was not being rounded.

### Accounting

- Fixed a severe slowness issue in account processing caused by calculating the debt aging of electronic payment methods despite them being excluded.
- Completed the fix for an issue where the record creator did not appear for some documents in the System Journal Entries screen, where the field was empty in the (LedgerTransLine) table despite being present inside the document.

### E-Invoicing & Government Portals

- In the (TaxAuthoritySubmissionDoc) document, the value of the field (taxAuthEntityStatusType) now stays (Not Sent Yet) as long as the field (statusInTaxAuthority) is empty, meaning no response has been received from the Authority, with these documents allowed to be resent.
- The price of an item marked as (Free) in a Sales Invoice or Sales Return is no longer counted within the totals sent to the Zakat, Tax and Customs Authority, so the line appears with a zero price in the XML file, with this reflected on the total, tax, and net. The system also now prevents enabling the (Debit Note) option together with the (Sales Return) option in the Miscellaneous Invoice term config (MiscPurchaseInvoice), to avoid a conflict between the two transaction types when sending.
- Fixed an issue where an error appeared in the electronic document signing step when sending invoices to the Tax Authority from the new interface.

### Contracting

- Corrected the price transfer when creating a Contracting Price Quotation based on an Assay, where the (Unit Cost) field from the Assay was being transferred to the (Unit Price) field in the price quotation instead of the (Unit Price) field from the Assay.

### Real Estate

- Fixed an issue where an error appeared when trying to select the building or floor in the Rent Contract (RERentContract).
- The system now recalculates the (Partially Rented) and (Partially Sold) fields in the Building screen with any addition, modification, or deletion of rent contracts or sale transactions, after the value used to stay (Yes) even though no contract was linked to the building's units; the two fields are now also visible inside the Building screen.

### Hospital Management System

- Fixed an issue where some days were duplicated and other days were dropped in stay invoices, and the resulting discrepancies in patient account statements.

### Human Resources

- Fixed an issue where the message (Shift Time Overlaps) appeared when saving the Attendance Plan (AttendancePlan) using the job position field (lines.jobPosition) on two lines.
- The system now accepts two consecutive departure permits for an employee on the same day (such as a permit from 9 to 10 and another from 10 to 11), after previously treating them as overlapping and calculating a delay against the employee.
- Fixed an issue where the employee's status remained (On Vacation) when changing the vacation type inside the Aggregated Vacation voucher to another type that restores the status to (Active).
- Fixed an issue where an error appeared when converting the Aggregated Vacation Request (AggregatedVacationRequest) into a document, and an issue where the field (vacation1RemainderBalance) in the Employee file was not affected when creating a vacation voucher.
- Fixed an issue where an error appeared in the Bonus voucher linked to a formula that aggregates the employee's regulatory indicators during the month, after the regulatory indicator was approved.
- Corrected the calculation of the Aggregated Bonus voucher when using a bonus type with a formula based on a percentage of specific salary items.

### Point of Sale

- Fixed an issue where error statistics remained on the POS machine without being deleted when refreshing errors, and added the entity flow (EARefreshPOSErrors) to use in a scheduled task that automatically deletes documents and files that have been processed.
- Fixed an issue where a payment-time error appeared on the machine when applying the (Buy Two, Get The Third Free) offer to the invoice's items.
- Fixed an issue where a message appeared claiming there were unused notes even though they had actually been used, with their invoices later posted to Nama on credit without the linked invoices appearing; an issue reading items when letter case (Capital / Small) differed; and an issue where some sales returns were not linked to the original invoice inside Nama.
- Fixed an issue where the update was not executed when selecting (Download Latest Version) from the machine despite the request being sent to it.

### Mobile Applications

- In the (Queue) app: the Engineer screen now shows only tickets created today, fixed an issue with the audio when announcing the ticket number, and an error message now appears when printing fails.

### e-commerce Integration

- In reading sales from (Salla) and (Zid), an error in a single order — such as a missing (SKU) for a certain item — is now logged among the pending errors while reading and processing the rest of the orders continues, instead of the whole reading process stopping until the error is corrected, with the ability to review and handle the errors later.
- Fixed the error issue in reading sales from the (WooCommerce) site.

### Import & Export

- Fixed an issue where a log appeared for items already existing with the same code when importing them with the Record Import Document (RecordImportDoc), despite the option (Do Not Update Existing Records - Add Only) being enabled in the settings file.

### New GUI

- Fixed a sorting issue in the list view.
- Fixed an issue where the message (Could Not Execute The Operation) appeared when sorting by any of the line fields.
- Fixed an issue of slowness when searching in line details in the list view, and an issue of duplicated search options.
- Fixed an issue where some types did not appear in the sub-search filter despite appearing and working in the main filter.
- Fixed an issue where an error appeared when filtering in the list view of the Document Cancellation Document screen.
- Fixed an issue where the current line order was not respected when clicking the (Go To Linked Field) icon in the line validation error message.
- Fixed an issue where a new empty screen opened instead of a duplicate when duplicating the Alert Definition screen.
- Fixed an issue where the selected version from the modification log was not displayed when viewing it.
- The error message text for a failed task is now selectable and copyable, after it used to appear only inside a (Tooltip) when hovering the cursor over the error icon.
- Fixed an issue of overlapping in the New Chat form and in the section dedicated to writing messages inside the chat, and the error related to it.
- Fixed an issue of severe slowness when loading the Recycle Bin screen and when changing the sort order to ascending or descending.

### Settings

- The system now rejects edits to disabled fields even if the user enables them through the browser's Developer Tools.
- Fixed an issue where the user was able to run the report more than once at the same time despite the (prevUserToRunSameRepMultipleTimes) option being checked, by duplicating the browser page then going back to change the inputs.
- Fixed an issue where a log appeared when using an entity flow with the input (n1=details.$size) on the Item file.
- In screens added from the Wizard, the fields (Wizard Code) and (Wizard Classification) are now cleared when duplicating.
- Fixed an issue where the draft code remained recorded in the (EntitySystemEntry) table after canceling or deleting the draft.
- In the old interface, fixed an issue where it was not possible to handle disabled fields in the (Creator), and fields the user does not have permission to use.
- Fixed an issue preventing login to the system using the technical support user permission, with a message appearing that the username and password do not match.
