# Nama ERP Release Notes - February 2020

::: info Release Information
**Release Date:** February 2020  
**Release Number:** 2020.02
:::

## Additions

### Inventory
- Added the option `Copy Price from the Source Document with Based On` to the Sales and Purchasing term configs
- Displayed the tax properties by default in the Purchase Request document's term config
- In the lines of the **End Stock Taking** document (`EndStockTaking`), added `ref` and `Description` fields to the lines
- The **Alternative Assembly Raw Materials** document was moved to the Assembly menu instead of the Sales menu
- Added the option `Schedule Stock Taking Procedures` in the Distribution Management Settings, to conserve server resources and avoid disrupting users. The times during which stock-taking procedures are allowed can be set through a table in the Distribution Management Settings
- Added 3 `Ref` fields to the **Costed Vouchers** lines in the Additional Receiving Costs voucher
- Added the option `Show End Stock Taking Lines in List View Instead of a Grid` to the Distribution Management Settings
- Added the option `Allow Editing Issue and Receipt Vouchers After Linking Them to Invoices` to the Distribution Management Settings
- Added the option `Exclude Returns from the Option "Use Zero for Uncosted Receipts in FIFO"`

### Sales
- Changed the translation of the field `satisfiedQty2.details` to **Fulfilled 2** instead of Unreceived Quantity 2, on the Sales Order screen
- **The New Discount Coupon**, created via development request number `ECDR03644`, includes the following:
  - Filtering the field to the customer only
  - Preventing the use of the discount coupon in a sales document (Sales Order - Sales Invoice) except for the same customer (i.e. the customer on the coupon must be the same as on the sales document, or the coupon must have no customer)
  - Copying the coupon data from the Sales Order to the invoice
  - Cancelling the coupon's effect when it is removed from the document
  - The coupon had an error in the value, where the coupon's value was not deducted from the invoice, but a different value was deducted instead
- Added the option `Do Not Apply the Coupon If There Are Promotions with Stop Other Discounts` to the coupon lines in Promotions, since a coupon will not be created if any promotion applied to the current invoice has the option **Stop Other Discounts** enabled

### Purchasing
- Improved so that when creating a Purchase Quotation, and a Purchase Price List exists for the items, the item price is shown just as it is in the Purchase Order and the Purchase Invoice

### Accounting
- **Journal Voucher**: Updated the system so that, on save, it fills the currency on the line with the account's currency if it was left empty
- **Financial Paper Transfer document**: Added 5 attachments to the document
- In the **Recurring Documents** lines: Added Record Classification, which is copied to the Record Classification of the automatically created documents
- Created a new voucher, the **Alternative Assembly Raw Materials**, and added a reference to it in the Supplied Items lines of the Assembly Voucher; also added the Raw Material Classification to the Assembly Method lines

### Customer Relationship Management (CRM)
- Added 5 attachments to the **Sales Lead** (`CRM Lead`)

### Human Resources
- When editing the Component Order field on the Component Type, it is now copied to the components belonging to that type
- Made the field `Settled Up To Date` editable, so the employee's last settlement date can be entered manually when registering their first settlement document on the system
- In the term config of the **Settlement of Dues** document, added the Net value for the settlement component in the Effect Settings grid; this field was also split into two fields, one representing the type (Leave - End of Service) and the other the previously existing types plus the Net, to make things easier for the user
- Added a new document named **Bulk Recalculate Entitlements**
- In the Shift file, added a new page named **Labor Group**, containing 2 grids as follows:
  - Labor Group grid: Work Day - Weekly Rest - 3 (From - To) pairs
  - Rotation grid: Rotation Date - Starting from Line (can be left empty)
- Added a new field to the Payroll Year lines named **Bulk Period Code**
- Added 3 `ref` fields and 3 `description` fields to the Business Trip screen
- Added the following `service` for querying an employee's balance:
```
http://serverip:8080/erp/integrator?type=vacbal&empCode=[employee_code]&vacTypeCode=[vacatioType_code]&onDate=[Date]&user=[user_name]&pass=[password]
```
- Added the ability to group employees within the Payroll record by Reference 1 and Description 10

### Manufacturing
- **Grouped Production Order Voucher**: Added the option `Merge Similar Lines` to the document header, to combine quantities of the same item
- Added the option `Deduct Line Quantities from the Quantity Calculated from the Operation` in the Manufacturing Settings; its default value is disabled
- Improved so that, when reserving quantities in the Production Order using the Raw Material Issue Request that is created automatically via the Production Order term config, the quantities reserved are taken from the Total Required Quantity rather than the default quantity

### Fixed Assets
- **Fixed Assets**: Improved so that when duplicating an Asset Depreciation Voucher, the current installment value from the asset is copied to the Amount on the lines

### Contracting
- **Term Sheets**: Added the Total field to the document header
- Added a new document named **Another Subcontractor Payment**
- In the Subcontractor Contract and the Project Contract, added a list view for each voucher linked to the contract
- Added 5 `ref` fields to the Contracting Supplies Purchase Invoice screen
- **Term Sheets screen**: Added the Total Price field to the document header
- Added 5 attachments to each of the following two documents:
  - Conditional Payment screen
  - Another Subcontractor Payment screen
- Handled discounts in Extracts so that they are `Accumulative`. That is, the discount value = the total quantities executed in the previous and current Extracts * the current unit price * the discount percentage - the total value of the previous discounts, taking into account that the discount value may be negative

### Service Center
- Added the field `Prevent Closing the Work Order If There Are Unfinished Tasks` in the Service Center Settings, with a default value of `true`; to remove this behavior, change the option to `false`
- Added the option `Do Not Copy Lines When Selecting the Work Order` in the Service Center Settings
- Copied the Expected Next Visit Date from the Work Order to the Work Order Closing automatically upon selecting the Work Order, as well as upon saving it
- In each of the **Add Task**, **Work Order**, and **Assay** vouchers, and every voucher that has task lines, the following was added:
  - Added the field `Count`, whose effect makes the Total = Time * Hourly Rate * Count
  - The Count is carried over between all the vouchers
  - The Count is carried over to the Quantity in the invoices created via (Create Customer Invoice - Create Warranty Invoice - Create Insurance Invoice) in the Work Order
  - Repeating the same task for the same Work Order is prevented (and likewise for Add Task and the other vouchers)

### Point of Sale
- Added a Remarks field at the line level in the Stock Transfer Request document. It can be added through the new method, from Nama into the `point of sale` screens
- Added a `keyboard` shortcut on the Point of Sale login screen for entering the username and password when working on touch devices with no mouse or keyboard
- Added a numeric keypad like the one on the Sales screen to the Payment screen (for full reliance on touch)
- Added support for `Display Pole` devices, and developed a dedicated file describing how to work with these devices, named the **Point of Sale Display Pole Properties** file
- Added the field `Add Items to "Items Sent to Point of Sale"` to Sales Price Lists - the items in the file are replaced with what is in this list. Items are now re-saved when editing the **Sent Items** file, and this behavior can be turned off with the field `Do Not Re-save Items on Save` in the same file. Note the following:
  - The system rejects edits to the **Sent Items** file if it is found in any price list
  - The system rejects selecting the **Sent Items** file in more than one price list
- Added the field `lastDeletedLine` for use in the delete-line template
- Improved so that the item code field is cleared when an incorrect item code is entered, or when the item's barcode is scanned and it does not exist, on the Point of Sale Invoice and Sales Return screens
- Added the property `logPole` to the `properties.nama` file, to enable logging `pole` information
- Added the option `Save Documents with Errors as Draft` to the Point of Sale Settings - using it, documents with errors are transferred as drafts, along with the error so the user can fix it; they are marked as sent so they are not resent, and the user re-saves them after correcting the errors
- Displayed only the menus the user has permission for; for example, if the user has permission for Sales Invoices and opening/closing the shift, the Exchange Invoice, the Return, etc., will not appear in the menu (according to the permission)

### Reports
- Created a system report for the commercial books found in the Financial Papers Definition, with code `SYSR-BNK004`
- Modified the report **Subsidiaries Trial Balance - Total Balance**, code `027ACC-SYSR`, where the option to hide zero balances and hide balanced movements did not work
- Added a From Sector to Sector filter to each of:
  - General Account Statement `029ACC-SYSR`
  - Subsidiary Account Statement `031ACC-SYSR`
  - Sub-Account Statement `033ACC-SYSR`
- Added the two options `Prevent Resizing Sales Columns` and `Prevent Reordering Sales Columns` to the Point of Sale permissions, noting that **Prevent Reordering Sales Columns** only affects the old Point of Sale interface, since in the new interface the column order follows their order in their tables in the (New Point of Sale Interface Settings)

### Settings
- **Payment Methods**: Added the field `Direct Term Config for the Fees Value` to the payment method
- **Payment Methods**: Made the payment method a subsidiary with its own accounts, and accordingly made the following changes:
  - Added a Subsidiary Accounts Group to the Payment Method file
  - Added two new types to the reference type in the term config (Payment Method, Payment Method Subsidiary)
- Added `entityType` to the columns displayed in the `bizRequestView` screen
- Added the following options to the Global Config:
  - Maximum Number of Concurrent Logins for a Single User
  - Automatically Log Out When the Maximum Number of Logins Is Exceeded (from the oldest sessions)
- For the option **Maximum Number of Concurrent Logins for a Single User**, the value set on the User is considered first (if not zero), then on the Permission File (if not zero), then the Global Config. If the User's field above has a value other than zero, the field **Automatically Log Out When the Maximum Number of Logins Is Exceeded (from the oldest sessions)** is taken from the User - and this field is honored if it is enabled on the User or on the Permission File, even without setting a maximum number of concurrent sessions
- Added the function `round`; for example, `{round(netPrice,"2")}` displays two decimal places, and the number of display decimal places from the currency can also be used. See the following example:
```tempo
{round(netPrice,currency.displayDecimalPlaces)}
```
- Added the option `Do Not Compare the Remaining Amount to the Total Payments on Invoices` to the Global Config
- Added a validation across all system documents so that a user cannot save a document missing any information needed for the accounting entry. For example: when the accounting term config comes from the document's subsidiary, and while creating the document **Account** is selected and a subsidiary account is chosen instead of a sub-account, an error now appears on save indicating that a sub-account must be selected, or a subsidiary account and then the subsidiary must be selected - to prevent saving documents whose processing would fail
- Added the field `Show Only in User File Fields` to the Dimensions
- Improved so that when any manual alert sends text messages, sending is rejected if a message already exists for the same number, and the user is shown a warning with the numbers that were skipped; likewise, for automatic alerts, sending the messages is rejected with a message showing what was rejected. Also added an option to allow sending text messages more than once from the same voucher to the same number
- Improved so that when an error occurs while running `regenui`, the error is shown in a readable way instead of the log, which did not show the nature of the error
- When there was an error in the name of one of the fields in a Default Values Template, the message **The operation could not be performed** appeared when trying to create a new record. Improved so that a clear error message is shown, naming the wrong field and the template that contains it, to make correcting the error easier
- Added the field `Alert Note` to the Approval file lines, so the alert wording can differ at each step
- Updated `Jasper` in Nama to include the new features in its latest version, 6.11.0
- Created the entity flow `EAReviseUnReviseFromQuery`, which automatically marks system documents as reviewed; the documents are determined via a query in the flow's inputs
- Added the ability to fetch the first and last period of the fiscal year within reports, so report links on the fiscal year can work on a from-period to-period basis
- Changed the CRM link to `https://crm.namasoft.com/erp`

### Mobile Applications
- Fetched the remaining leave balance and the leave duration when selecting the leave type
- Improved so that swiping on approvals lets the user reject or accept the leave from the Approval screen

### New GUI
- Improved so that, for a customer in Kuwait, the new interface displays the `Exceed` logo instead of the Nama logo, as is the case with the old interface
- Sorted the contents of any `Combo Box` by the translation in the currently active language
- Added a new field `DisplayMask2g` to the grid in the Fields & Screens Settings, since the `formatting` method differs between the old and new GUI
- Added the ability to select multiple lines in document details for any purpose, such as deleting them all

## Fixes

### Inventory
- When applying the following scenario:
  - Creating a Sales Order
  - Creating a Stock Issue Voucher based on the Sales Order
  - Creating a Sales Invoice based on the Issue Voucher did not copy the price from the Sales Order, whereas grouping and applying the Issue Voucher into the invoice did copy the price from the Sales Order. To fix this, the option **Copy Price from the Source Document with Based On** was added to the Sales and Purchasing term configs
- Fixed an issue where an error occurred when running `regenerate ledger trans from file`
- Fixed an issue where the system made the Account field on the Additional Receiving Costs screen (expense item) mandatory, even though a subsidiary account might sometimes be selected
- Fixed an issue where, on the Assembly Request and Stock Transfer screens, even though items were linked to specific warehouses and locations, the system allowed transferring an item to a location not linked to it
- Fixed an issue where the error **The operation could not be performed** occurred when grouping Lots in the Distribution Management documents
- Fixed an issue where, when using the option `The promotion is limited to the item that will be issued free, ignoring its quantity`, after the promotion was applied and saved, the free item's quantity could be increased and the program did not reapply the promotion on saving again; this only appeared in an exceptional case where the base item's quantity was edited to 1 and the free item's quantity to 3, the reverse of the promotion's numbers (the base item was 3 and the free item was 1)
- Fixed an issue where grouping Lots in Stock Issue Vouchers showed **The operation cannot be performed**
- **Item File - Conversions**: Fixed an issue where trying to change one of the conversion units, when the unit existed in price lists linked to the item, showed an error. The message shown was changed to be clear
- In the Distribution Settings, such as Administration on Line - Branch on Line - Warehouse on Line, the default value was currently **Yes**. Changed it to **No** so that it does not cause problems for new customers
- Fixed an issue where processing for inventory aging sometimes failed

### Purchasing
- Fixed an issue where, on a Purchase Price List, setting the source to **Purchase Invoice** to fetch items, then entering the prices and saving, the system showed the error message (The operation could not be performed)
- Fixed an issue where the system did not calculate a cost for the Receipt Voucher sourced from the Sales Exchange voucher (even after removing the Uncosted Receipt flag)
- Fixed an issue where, on Purchase Orders, opening the item list via the search lens worked correctly if no vendor was selected, but showed an error once a vendor was selected

### Sales
- Fixed an issue where, with the option `Never Update Prices` enabled in the term config, creating a Sales Invoice from within the Sales Order via Create Invoice from the More menu did not apply the tax
- Fixed an issue where, with several promotions on the invoice, the system could apply more than one promotion. For example, with a promotion when the invoice value equals `200` and another when the invoice value is 500, both were applied; this was resolved by setting a range for the invoice value for the promotion to apply
- Fixed an issue where, sometimes, an error occurred in Sales Orders due to the entity flow for coding sizes
- Fixed an issue where, sometimes, an error occurred when searching for the color or size in the Sales Order
- Fixed an issue where processing of the Sales Invoice sometimes failed
- Fixed an issue where creating a Sales Invoice based on a Sales Order that had a free item showed the error message (The free item is invalid)
- Fixed an issue where, creating a Sales Order then a Sales Invoice based on it, with a free-items promotion that included Discount 1, Discount 1 was applied to the free item and the error message (Discount value must be less than the total price) appeared
- Fixed an issue where creating a Sales Invoice whose term config had the option **Check Compatibility - Per Line** enabled, based on a Sales Order with a free-items-on-invoice-item-count promotion applied, resulted in the promotion being applied differently on the invoice - by splitting lines into more lines - which prevented saving and showed the message (The line does not exist in the original document)
- Fixed an issue where creating a Sales Return based on an invoice applied the invoice's promotion a second time on the Sales Return, even though it had already been applied on the invoice, and likewise when duplicating
- Fixed an issue where duplicating a Sales Order to which a promotion applied caused, on save, the promotion to be applied to it a second time on both the base items and the free items - meaning two promotions were applied, one on the remaining base items and one on the free items
- Fixed an issue where, when a promotion split a single line into two lines - a base line and a free line - the quantity in the field `details.quantity.quantity.primeQty.value` was changed, but the quantities in the fields `details.quantity.baseQty.value`, `details.unReservedQty`, `details.unsatisfiedQty`, and `details.unsatisfiedQty2` were not changed
- Fixed an issue where, in a Sales Exchange, the price on the line for the exchanged quantity in the return (negative) was not fetched from the price lists, while it worked correctly when the quantity was greater than zero; the fix ignores the negative sign when fetching from price lists on the Exchange screen

### Accounting
- Fixed an issue where the system posted the journal entry for Additional Receiving Costs included in the Stock Receipt using an incorrect accounting term config
- Fixed an issue where, with the option `Never Update Prices` enabled in the term config, creating a Sales Invoice from within the Sales Order via Create Invoice from the More menu did not apply the tax
- Fixed an issue where, with several promotions on the invoice, the system could apply more than one promotion. For example, with a promotion when the invoice value equals `200` and another when the invoice value is 500, both were applied; this was resolved by setting a range for the invoice value for the promotion to apply
- Fixed an issue where, sometimes, an error occurred in Sales Orders due to the entity flow for coding sizes
- Fixed an issue where, sometimes, an error occurred when searching for the color or size in the Sales Order
- Fixed an issue where processing of the Sales Invoice sometimes failed
- Fixed an issue where creating a Sales Invoice based on a Sales Order that had a free item showed the error message (The free item is invalid)
- Fixed an issue where, creating a Sales Order then a Sales Invoice based on it, with a free-items promotion that included Discount 1, Discount 1 was applied to the free item and the error message (Discount value must be less than the total price) appeared
- Fixed an issue where creating a Sales Invoice whose term config had the option **Check Compatibility - Per Line** enabled, based on a Sales Order with a free-items-on-invoice-item-count promotion applied, resulted in the promotion being applied differently on the invoice - by splitting lines into more lines - which prevented saving and showed the message (The line does not exist in the original document)
- Fixed an issue where creating a Sales Return based on an invoice applied the invoice's promotion a second time on the Sales Return, even though it had already been applied on the invoice, and likewise when duplicating

### Manufacturing
- **Grouped Production Order Voucher**: Fixed an issue where trying to delete the Grouped Production Order showed a message that it was used in a Production Order, and trying to delete the Production Order showed a message that it existed in the Grouped Production Order's lines
- Fixed an issue where some quantities in the product's components ended up at zero, caused by a quantity being a small value like 0.00001 that then rounded to zero; the error message was also corrected to be clear

### Settings
- Fixed an issue where, in the Contracting Raw Materials Return document, creating it based on the Contracting Raw Materials Issue voucher caused the following errors:
  - The system did not copy the contract from the Issue voucher
  - The system did not copy the item code and the standard item from the Issue voucher
- Fixed an issue in displaying custom lists, where editing the screen and adding a new page, then adding a custom list view to the new page, meant it did not appear there and remained on the main screen

### Contracting
- **Term Sheets window - Items grid**: Fixed an issue where entering the unit price and the contracted quantity meant the system did not calculate the Total Price until after saving, whereas it should calculate it on entry
- **Term Sheets window - Items grid**: Fixed an issue where the field Actual Cost `terms.ctrActualCost` showed the number of decimal places from the field `fractionDecimalPlaces` instead of `displayDecimalPlaces` on the Currency screen
- Fixed an issue where the Subcontractor Extract document did not affect the Subcontractor Contract, resulting in an incorrect quantity and accounting percentage
- Fixed an issue where grouping items on the Execution Status screen did not show the item description
- Fixed an issue where creating a Subcontractor Extract with no change in quantity, only a change in price, calculated the unit-price difference incorrectly
- **Subcontractor Payment document**: Fixed an issue where, after setting up a term config and adding accounting aspects for the system journal entry, saving showed an error that the document was not balanced
- Fixed an issue discovered in the entity flow code **Create Warehouse with the Project and a Project Contract**, for creating a preliminary Project Contract as soon as the project is defined
- Fixed an issue where, in the Check Issue Voucher, if the user entered all the data but not the check number, saving showed the error message (The code cannot be left empty) and gave a red error indicator next to the voucher code
- Fixed an issue where importing an Excel file into the Bank Reconciliation Memo document stopped when a field had the wrong type, such as a text field containing a numeric value. Improved so that the line number containing the problem is shown, so the user can correct that field in the Excel file
- Fixed an issue where the sales reports did not match the Sales account in the Trial Balance; investigating the cause found that some invoices had their actual date changed without the date on the system journal entry being changed

### Service Center
- Fixed an issue where saving a Work Order with a Current Reading and Previous Reading caused the system to change the Current and Previous Reading incorrectly the second time it was saved

### Fixed Assets
- Fixed several issues in the journal entry generated from the Partial Disposal document for Fixed Assets
- Fixed an issue where creating a Disposal voucher for an asset that had not been depreciated to date did not raise an objection from the system
- After running the following `Utility`:
```
http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationUtil
```
to fix Fixed Assets issues, the old problems were fixed, including issues with taxes that are and are not added to the asset value, and recalculating depreciation installments; however, these were fixed in Fixed Asset purchase vouchers only, and not fixed in Addition and Exclusion vouchers
- Fixed an issue where, even after running the tool to fix Fixed Assets issues, the Total Cost field on the Statistics screen inside the Fixed Assets file still had an incorrect value for assets that were entered into the system as an opening balance

### Point of Sale
- Fixed an issue where creating a Stock Transfer Request without completing it, then going to the Sales Invoice screen and returning to the Transfer Request, deleted the request's data; it should have been kept
- Fixed an issue where creating a Stock Transfer Request document and suspending it, then viewing it and trying to edit or delete it, did not allow editing or deletion
- Fixed an issue where using the field `lastLine` in the add-line template in the `display pole` properties caused an error; the field `lastModifiedLine` can be used instead
- Fixed an issue where Point of Sale sometimes did not allow adding items (by typing the item code manually and pressing Enter)
- Fixed an issue where, sometimes, paying the cashier an amount greater than the sales invoice value affected the journal entry by debiting the full amount to the Treasury subsidiary and crediting the Machine subsidiary account, so the Machine subsidiary appeared as a credit in the accounts and the Treasury account showed a balance higher than the actual one
- Fixed an issue where creating a Point of Sale Issue voucher from within Nama caused the problem "the operation cannot be performed", or when duplicating an existing document; the payment method must be taken into account when used in the journal entry
- Fixed an issue where, on the Expense Voucher screen, the term config did not affect the journal entry data - if the effect pages in the term config were left with no data, the journal entry still existed
- Fixed an issue where the quantity in Point of Sale was not rounded according to the unit's decimal places, so when transferring data, rounding on the main Nama system caused a difference in value from Point of Sale
- **Subcontractor Payment document**: Fixed an issue where, when selecting the payment method Percentage of Each Extract, the system rejected saving if the Payment Percentage field was empty; likewise, if the payment method was Fixed Value with Each Extract, the Payment Amount field must not be empty

### Human Resources
- Fixed an issue where saving a Work Order with a Current Reading and Previous Reading caused the system to change the Current and Previous Reading incorrectly the second time it was saved

### Fixed Assets
- Fixed several issues in the journal entry generated from the Partial Disposal document for Fixed Assets
- Fixed an issue where creating a Disposal voucher for an asset that had not been depreciated to date did not raise an objection from the system
- After running the following `Utility`:
```
http://localhost:8080/erp/test?util=com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationUtil
```
to fix Fixed Assets issues, the old problems were fixed, including issues with taxes that are and are not added to the asset value, and recalculating depreciation installments; however, these were fixed in Fixed Asset purchase vouchers only, and not fixed in Addition and Exclusion vouchers

### Point of Sale
- Fixed an issue where creating a Stock Transfer Request without completing it, then going to the Sales Invoice screen and returning to the Transfer Request, deleted the request's data; it should have been kept
- Fixed an issue where creating a Stock Transfer Request document and suspending it, then viewing it and trying to edit or delete it, did not allow editing or deletion
- Fixed an issue where using the field `lastLine` in the add-line template in the `display pole` properties caused an error; the field `lastModifiedLine` can be used instead
- Fixed an issue where Point of Sale sometimes did not allow adding items (by typing the item code manually and pressing Enter)
- Fixed an issue where, sometimes, paying the cashier an amount greater than the sales invoice value affected the journal entry by debiting the full amount to the Treasury subsidiary and crediting the Machine subsidiary account, so the Machine subsidiary appeared as a credit in the accounts and the Treasury account showed a balance higher than the actual one

### Reports
- Fixed an issue in the system report `SYSR-ACC033`
- Fixed an issue where the system report `SYSR-SLS007`, Best- and Least-Selling Items in the Sales Group, did not show the item name
- Fixed an issue in the report `"SYSR-SLS031"`, Monthly Total Sales Values by Item Section by Sector, where the From Sector - To Sector filter showed the item section
- Fixed an issue with the two reports `SYSR_ACC005` and `SYSR_ACC026` in the Financial Statements group - both are a General Ledger Trial Balance, but the balances did not match and not all accounts appeared in the report `YSR_ACC026`
- Fixed an issue where updating the system reports showed that they were updated, but they were not actually updated to the latest version released by development; also, opening `Repo Implementation open` opened the screen incorrectly, without the table

### Mobile Applications
- Fixed an issue where times displayed incorrectly, showing AM times as PM

### New GUI
- Fixed an issue where an error occurred while printing on the new interface, whether using the `windows` operating system or using an `ipad`
- While testing the new `GUI`, the following issues were found:
  - **Accounting Reports**: Could not filter from Subsidiary Code to Subsidiary Code
  - Could not filter by period, From Date to To Date
  - The Debt Aging reports showed all debt ages as more than 360 days
  - **Accounting module**: Could not link payment to invoices in Receipt Vouchers and Issue Vouchers
- Fixed an issue where opening any draft in the files (Customer, for example) showed only the code
- Fixed an issue where duplicating a line using the button at the end of the line, then editing a field value on the new line, caused the same field on the old line to be changed to the new value on save
- `In new gui, in mobile view the top logo is not aligned with the menu arrow, there is too much space above it`
- Fixed an issue where the tree view did not work in the New GUI
