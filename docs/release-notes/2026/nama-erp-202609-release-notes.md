# Nama ERP Release Notes - September 2026

::: info Release Information
- **Release Date**: September 2026
- **Release Number**: Nama-ERP-202609
:::

## Additions

### Inventory

- In the Supply Chain settings, added an option named (Round Ledger Lines After Merging Cost Lines - roundLedgerLinesAfterMergingCostLines), so the stock receipt voucher's journal entry is rounded after its lines are merged, and matches the journal entry of a Purchase Invoice in a foreign currency that has more decimal places than the local currency.
- In the Discount Coupon Book (DiscountCouponBook), added a grid of percentage brackets on the invoice value, to set different discount percentages for the same coupon depending on the invoice value (greater than / less than), along with a field (Invoice Value Used To Apply Coupon - invoiceValueSource).
- In the Multi Assembly Document (MultiAssemblyDoc) term config, added the options (Spread From-Doc Lines To Main Items - addFromDocLinesToMainItems), (Save All Assembly Documents As Drafts - saveAllAssemblyDocumentsAsDrafts) and (Spread Only Stock Items From From-Doc - spreadOnlyStockItemsFromDoc), along with a quantity-tracking page so that only the remaining quantity is brought in when creating the document based on a Sales Order.
- In the price list, the system now refuses to save when pricing by item class without enabling the field (Price By Item Class - priceByItemClass) in the Supply Chain settings, after the price used to silently not appear in this case.
- In the Warehouse Receipt Voucher (WMSReceiptDoc) term config, added a field (Item Status (Damaged / Pass) Line Field - itemStatusLineField) to choose the field in which the item status is saved on the generated documents, and a field (Damaged Items Handling - receiptItemStatusHandling).

### Accounting

- In the Prepaid Expense Contract, added a field (Payment Frequency Type - paymentFrequencyType) and a grid of payment dues, along with a new document named (Prepaid Expense Payment - PrepaidExpensePayment) that is created for each line of the grid through the (Create Prepaid Expense Payments) button, with its book and term set in the contract's term config (generatedPaymentBook - generatedPaymentTerm).
- In the Prepaid Expense Contract term config, added an option (Use Fixed Monthly Amount - useFixedMonthlyAmount) to calculate the incomplete month at the start and end of the contract by the actual number of days, and the full months in between as a fixed monthly installment.
- In the Debit Note and Credit Note term config, added an option (Calculate Ledger Value From Header Amount Not Lines - calculateLedgerValueFromHeaderAmountNotLines), as the lines are then used only for tracking debt ages.
- In the Debit Note and Credit Note term config, added an option (Add Taxes To Value Of Generated Debt Ages Line Whether From Header Or Lines - addTaxesToDebtAgesValue).
- In the Closing Entry term config, added the fields (Settle Rounding Difference - settleRoundingDiff) and (Rounding Difference Account - roundingDiffAccount) to post the fraction differences caused by rounding to the selected account.
- Added a new screen named (System Accounts Transactions Exceptions - SystemAccountTransException) that allows transactions on system accounts during a specified period, by document type, account, subsidiary, user or book, term and transaction nature (Debit / Credit / Debit and Credit). For details: [System Accounts & Transaction Exceptions](/modules/accounting/ledger-setup/system-accounts-and-exceptions)
- In the Account file, it is now possible to set subsidiary type 2 after transactions have been made on the account if it was previously empty, while changing an already-set value is still prevented.

### E-Invoicing & Government Portals

- In the term configs of the Sales Invoice, Sales Return, Credit and Debit Notes and Miscellaneous Invoices, added the fields (E-Invoice Bank Account Field - eInvoiceBankAccountField) and (E-Invoice Payment Terms Field - eInvoicePaymentTermsField), to choose the field from which the bank details and payment terms are taken for each invoice when sending to the Egyptian Tax Authority. For details: [Egyptian e-Invoice and e-Receipt](/modules/invoicing/egypt-einvoice-guide)
- In the Tax Authority Submission Document (TaxAuthoritySubmissionDoc), added the fields (Collect Document From Creation Date Time - minCreationDateTimeToCollectDocs) and (Collect Document To Creation Date Time - maxCreationDateTimeToCollectDocs).
- Added the integration with the Eltezam platform. For details: [Eltezam (MCS) Integration — Overview](/modules/integrations/eltezam/eltezam-overview)
- Added a new list screen named (Drug Tracking Errors at Item Level) in the Drug Tracking settings menu, which splits the error returned by RSD into a separate line for each rejected item, and shows the GTIN, batch number, serial number, expiry date and the error code and description, along with the matching data from the document line, with filtering and sorting. The system now also keeps the batch number and expiry date returned by RSD. Only errors from submissions made after the update appear in it.

### Real Estate

- In the term config of the Sales Contract, Opening Sales Contract and Waiver Document, added the ledger sides for Tax 1 and Tax 2 (tax1Debit - tax1Credit - tax2Debit - tax2Credit), so sales contract taxes now have an accounting effect, posted for each installment line.

### Fixed Assets

- In the Fixed Asset Transfer Request and the Fixed Asset Transfer Document, added the fields (To Classification) 1 through 5.

### Customer Relationship Management (CRM)

- In the appointment creation screen, it is now possible to cancel or reschedule an appointment while recording the reason.
- In the Technician Appointment screen, added an (Items And Services) grid to link items to services (the item with its quantity and unit, and the service with its quantity and unit), with an option (Copy Items Of From Doc - copyItemsOfFromDoc) to copy the items from the document set in the From Doc field; an empty service unit is filled from the item's unit on save. An (Actual Quantity) column and a remaining column were also added to the grid.
- In the Technician Appointment screen, added a customer field copied from the parent document, and a customer address page filled automatically from the customer file.
- In the Technician Appointment screen, added a (Change History) page that tracks every change to the appointment's status, day or time, with the old and new values.
- In the appointment creation screen, the system now prevents booking a period that starts before the current time on the server.
- In the department section file, added a (Supervisors) grid, so a supervisor sees all appointments of the section's technicians in one place in the (My Appointments) screen, with filtering by technician, period, customer, appointment status and more.
- It is now possible to create a Technician Appointment from inside any document with a button defined through a URL template, for example:
  `{OpenInNewWindow}{CreateAppointment(technicianProcedure="01",departmentSection="01",fromDocType=entityType,fromDocCodeOrId=id)}`
- Added a new screen named (Technician Unavailability - TechnicianUnavailability) in which an HR employee records that a technician is unavailable on a given day from one hour to another, so the system excludes them from booking during that period. For details: [Technician Unavailability](/modules/crm/technician-appointments/crm-technician-unavailability)
- In the Maintenance Order and the Maintenance Invoice, added the (payment terminal) field and the payment actions (pay the invoice and partial payment), as in the Sales Invoice.
- In the Maintenance Invoice and Maintenance Invoice Return term configs, added the fields (Services Debit - servicesDebit) and (Services Credit - servicesCredit) to separate the services grid's journal entry from the spare parts grid's journal entry.
- When creating a Maintenance Invoice based on a Maintenance Order, the document header data (such as references and remarks) is now copied as well, subject to the (doNotCopyHeaderDataOfFromDoc) option in the term config.

### Service Center

- In the Job Order Execution term config, added an option (Allow Time Overlap - allowTimeOverlap) to allow task times to overlap.

### Human Resources

- In the Salary Component Type, added an option (Estimate Salary Element Value From Formula - estimateValueFromFormula) to calculate the component's value inside the Job Offer and the Update Employee Info document.
- In the (System Indicator Approval) document, the field (details.indicatorValueOverPeriod) is now calculated when saving as a draft. In the (Aggregated Reward And Penaltie Document), added a (Recalculate Reward Values - recalculateRewardValues) button to calculate the fields (details.rewardAndPenaltyValue - details.finalValue - details.remainingValue).
- In the Aggregated Vacation Document, added line-level fields for the previous balance of the main vacation type before the vacation starts and the remaining balance after it, as in the Vacation Document.
- In the Vacation Document and the Aggregated Vacation Document, added an option (Postpone Loans During Vacation - postponeLoansDuringVacation), so saving creates a (Generated Loan Installments Reschedule - generatedLoanReschedule) document that gathers the employee's loans during the vacation period, with its book and term set in the document's term config (generatedLoanRescheduleBook - generatedLoanRescheduleTerm).

### Manufacturing

- In the Production Order, added (Planned Delivery - plannedDeliveries) lines holding the dimensions of the expected finished product and the planned quantity, and in its term config the fields (Prevent Delivery Outside Planned Deliveries - preventDeliveryOutsidePlannedDeliveries) and (Planned Deliveries Matching Options - plannedDeliveryMatchingOptions). A field (Expected Delivery Code - expectedDeliveryCode) was also added to the Product Delivery, Product Return and Aggregated Product Delivery, which brings the dimensions and remaining quantity from the matching line.

### Point of Sale

- In the Machine file, added a field (posCustomerCalculatedFields) for the calculated fields when transferring a POS customer, taking precedence over the POS settings field.
- Improved the performance of reading POS data, and added a new file named (POS Read Queue Priority Configuration - NamaPOSReadQueuePriorityConfig) to set the processing priority of each file type.
- The POS program now honours the preferred language field in the User file.
- When running a machine for the first time, the settings screen now creates the (nama.properties) file if it does not exist, with improved error messages. The program now shows an error message instead of closing abruptly when there is an error in the database data, connects to the server first to fetch the release when (useDomainServerForRelease) is enabled, and blocks login with a (Loading data) message until the first data load is complete.

### Mobile Applications

- Added a (Customer Relationship Management) module to the Nama Mobile app, containing the Leads escalated to the user or to their subordinates, the CRM Call (CRMCall) and the Follow Up Document (CRMFollowUp).
- In the NAMA ESS app settings, added an option (Hide Mobile Attendance Dashboard - hideMobileAttendanceDashboard).
- In the NAMA ESS app settings, removed the grids for the electronic receipt voucher, attendance, vacation and permission book settings and the electronic vacation type and permission type fields; the grid for creating documents and files from apps in the unified app settings is used instead.
- In the comprehensive attendance log of the Nama Mobile app, the attendance file name now wraps onto two lines on small screens.

### Settings

- Added the Telegram integration for sending messages the same way as WhatsApp, including images and PDF files, through the (Telegram Bot Configuration) and (Telegram Message) screens. For details: [Telegram Notifications in Nama ERP](/platform/notifications/telegram)
- Added the (WasenderAPI) WhatsApp provider. The (respond.io) integration now also checks whether the customer's mobile number exists before sending the message, and adds it first if it does not. For details: [SMS and WhatsApp Configuration in Nama ERP](/platform/notifications/sms-and-whatsapp)
- In the Global Config, added an option (Ignore Employee State When Sending Notifications - ignoreEmployeeStateWhenSendingNotifications); it does not affect blocking notifications to a user who is prevented from logging in.
- In entity flows, added the command (runCommand="saveConsideringApprovals") to save while requesting approval, and added an option (Consider Approvals On Commit On Manual - considerApprovalsOnManualCommit) in the entity flow header.
- In field maps of entity flows and GUI Post Actions, added the functions (removeLinesMatchingSql) and (removeLinesNotMatchingSql) and their multi-line forms (mlRemoveLinesMatchingSql) to delete specific lines from a table based on an SQL condition, instead of clearing the whole table.
- In fields that have search extra filters (from a security profile or user permissions), the system now rejects a disallowed record when its code is typed manually.
- In the Screen Modifier, on the selection list page, added a column (Enable Visibility Control By Type And Field - enableVisibilityControl) for the displayed columns, and a table (Search Columns Visibility - searchColumnsVisibility) that shows or hides a column depending on the type and the field being searched from.
- In the Screen Modifier, on the blocks editing page, the system now suggests the names of the blocks in the selected page, including statistics blocks.
- In the Screen Modifier, in the search fields grid of the selection list page, entering the name of a reference field (such as customer) now searches its code and name automatically, and the code only for documents.
- In the Report Definition, added (XLSX) to the output format field options, and re-running a report from the run report results screen now uses the format it was run with.
- In the Report Definition, the page field now lists the page names (pageID) and accepts more than one page.

### Business Intelligence

- Added a search box and a (Show more) button to the (Chips) lists in cross filters instead of stopping at the first 25 options, and added support for (sankey), (sunburst), (boxplot), (pictorialBar) charts and more.

### New GUI

- Enabled sorting from the column headers in the search screen and the custom list.
- The color field in the document header now shows its allowed values (allowedValues) and works like the color field on the line.
- In the Journal Entry lines, the account now shows as code then name instead of the name repeated twice.
- The (Approve Selected Records) dialog now looks like the approval dialog, with the decisions shown as buttons.

### e-commerce Integration

- Added a new entity flow named (EAAmazonReadRefundsAsReturns) to read Amazon returns that are missing from the returns report, based on the Order IDs.

## Fixes

### Inventory

- Fixed an issue where (Distribute Only On Item Cost) was ignored in assembly documents and costs were distributed equally across the received items.
- In the Weight Scale Preparation Documents Generator, fixed an issue where stock issue requests whose lines had all been prepared were fetched; it now fetches only requests with at least one unprepared line.
- In the weight scale preparation document, the stock issue request now becomes (Finished) when all its lines are either (Packed) or (Cancelled).
- Fixed an issue where the weight scale app showed a quantity different from the quantity requested in the stock issue request (such as 1 kilogram instead of 250 grams).
- Fixed an issue where the error (Invalid from document,please review reservation configuration and ensure that no manual lines is added) appeared when saving a Sales Replacement.

### Accounting

- Fixed an issue where a fraction difference appeared between debit and credit in a journal entry; rounding now follows the number of decimal places of the local currency.
- Fixed an issue where an error appeared in the Payment Voucher when creating it based on an additional receipt costs document.
- In the LGT Receipt, LGT Delivery and LGT Closing documents, the system now shows a message explaining that the values are inherited from the previous document in the letter's chain and that they are changed through the (LGT Changing) document, instead of silently discarding the edit; the (A technical error occurred) message when editing a saved LGT Delivery was also fixed.

### Fixed Assets

- Fixed an issue where an asset's status showed (Depreciated) instead of (Disposed) after a disposal document, and an issue where some assets were not depreciated and the last depreciation date and remaining life were shown incorrectly in the asset screen.

### Vehicles

- In the Car Insurance Policy, the Sales Order is now filtered by the insurance company and the car is filled automatically when it is selected. In the insurance policy purchase invoice, fixed an issue where the car's sale price was not fetched and more than one invoice could be created for the same policy. Fixed an error when saving the insurance policy receipt document (the term config must be re-saved).
- When creating a Car Purchase Invoice based on a Car Receipt, the stock receipt generated from the Car Receipt is now added to the related documents and costed.

### Hospital Management System

- Fixed a recurring issue in creating accommodation invoices.

### Human Resources

- Fixed an issue where some employee data did not match the employee's latest Update Employee Info when a Job Offer was re-saved; the system now relies on the latest update or job offer. To correct existing employees, re-save the job offers or the employee info updates.
- Fixed an issue where an employee on unpaid vacation with no return-to-work document was paid a full salary, even though counting the vacation to the end of the month was enabled.
- Fixed an issue with rounding the vacation dues value in the Dues Liquidation Document.
- Fixed an issue where (remainingLoanAmount) was not calculated when a loan exemption document was first saved.
- In the Aggregated Vacation Document, the reason type field on the line now lists the types assigned to vacations, as in the Vacation Document.
- In the Dues Liquidation Document, deleting the Payment Voucher created from the liquidation now clears the (Liquidated) mark on the salary document.
- Corrected a spelling mistake in the translation of the option (preventSaveIfAttendanceOutOfZone).

### Manufacturing

- Fixed an issue with issuing the quantity of components that have dimensions in a Production Order with a quantity greater than 1; it is now calculated as the component quantity multiplied by the Production Order quantity.

### Point of Sale

- Fixed an issue where the Held Invoice (NamaPOSHeldInvoice) added lines to the (ItemLot) table with lots that do not exist.
- When paying with NearPay through the (Captain Order) app, the app now comes to the front when pressing (Pay Invoice) and the browser returns after the payment ends, a payment request is cancelled if not completed within one minute, and fixed an issue where the first payment line was deleted when paying partially in two steps.

### Mobile Applications

- Leave permissions are now shown in the app from the server rather than from the data saved on the mobile.
- The system now prevents saving documents from the mobile app if (allow login from mobile) is not enabled for the user.

### Reports

- Reviewed the system reports in which some parameters did not affect the results: SYSF-ACC013, SYSF-ACC017, SYSR-ACC004, SYSR-ACC024, SYSR-ACC033, SYSR-ACC045, SYSR-AUD016, SYSR-BNK001, SYSR-BNK002, SYSR-BNK004, SYSR-CTR001, SYSR-FNS008, SYSR-HRS001, SYSR-HRS002, SYSR-HRS006, SYSR-INV006, SYSR-INV014, SYSR-INV020, SYSR-INV031, SYSR-IVS001, SYSR-PIV002, SYSR-PIV004, SYSR-PMG002, SYSR-SLS012, SYSR-SLS016, SYSR-TAX001.
- Fixed an issue where the general assets report (SYSR-AST003) did not work in the new GUI.
- In the virtual entity, the (Edit Mappings) button now shows a message explaining that the editor is available in the new GUI only, the (Column Mapping) field now refuses to save invalid JSON, and fixed an issue where virtual entities appeared only after restarting the server. For details: [Virtual Entities — Reusable SQL Building Blocks for Reports & Dashboards](/platform/automation-and-rules/virtual-entity-guide)

### Business Intelligence

- In drill-down to another dashboard, the selected value is now applied to every widget on the target dashboard and every widget type is shown in the popup. Fixed clicks on (Treemap) charts, area-filled line charts and the metrics card, the display of date-range filters as (from – to), and popup filters leaking into the page. Also fixed braces inside text literals in the AI read-only SQL tool.

### Settings

- Fixed issues with drawn signatures through attachments, which required pressing (clear all) before signing and saved an empty image.
- Fixed an issue where only the first condition was applied when using more than one (EqualOrEmpty) condition in a filter.
- Fixed an issue where the serial column was not updated when sorting users in the (utils/viewusers) screen.
- Fixed an issue where the list screen failed with (SQL Server Error 8618) when sorting by a reference field; sorting is now by code.
- In GUI Post Actions, (`$line`) now refers to the line the user is standing on, with a clear message if no line is selected, after it used to produce a (Could not find getter method) error, an (nvarchar) data type error, or a zero result.
- Fixed an issue where the error (At least one generated stock issue book and term line is required) appeared when applying a wizard file.
- The allowed values of the (From Doc) field in the Technician Appointment, set from the fields and screens settings, now also apply to the appointment creation screen.

### New GUI

- Fixed an issue where the list looked different between the old and new GUI.
- Fixed an issue where sorting by the reference column in the details grid was incorrect.
- Fixed an issue where an error message appeared and loading never finished when sorting by any column in the run report results screen.
- Fixed an issue where columns shown from the control buttons disappeared when changing the sort direction in the list screen.
- Fixed an issue where the (Reset) button sometimes did not respond when filtering a column in the lines grid.
- Fixed an issue where the unit price did not appear in the Sales Invoice when selecting an item until the field was clicked.
- Fixed an issue where adding a new item to an invoice changed the values of the existing items.
- Fixed an issue where pressing (Ctrl + Left Shift) did not change the writing direction.
- Fixed an issue where deleting after filtering deleted all lines instead of the selected ones.
- In the appointment creation screen, clicking anywhere on the calendar now closes the open appointment properties window instead of booking a new appointment.

### e-commerce Integration

- In the scheduled task (EAEcommerceReadOrdersFromDate), the invoice is no longer re-created when the order's status in Amazon has not changed.
