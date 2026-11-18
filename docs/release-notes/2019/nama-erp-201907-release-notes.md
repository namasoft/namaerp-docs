
::: info Release Information
**Release Date:** July 2019  
**Release Number:** 2019.07
:::

# Nama ERP Release Notes - July 2019

## **Additions**

### **Inventory**
- Inside the item, on the Prices page, the statistics for price lists and quotations shown at the bottom of the page work correctly for price lists, but the results for the offers part are not correct
- With the entity flow `com.namasoft.modules.supplychain.domain.utils.plugnplay.EAGenSCDocFromDocWithFieldsMap`, a Purchase Invoice is created from the inventory Issue voucher using the service item found inside the Issue voucher. Added the ability to add the free item alongside the service item (a `text` field) at the line level
- In the **Assembly Voucher**, on the Expense Lines page, added 5 `number` fields at the line level
- **Assembly Machines file**: Added the following two pages:
  - **Raw Materials**: holding the same "Raw Materials" lines as the "Processing Voucher" document, so the lines are entered automatically when the machine is selected inside the Processing Voucher
  - **Outputs**: holding the same "Outputs" lines as the "Processing Voucher" document, so the lines are entered automatically when the machine is selected inside the Processing Voucher

### **Sales**
- The option `Do not copy the document header's warehouse from Based On`, in the Sales Invoice term config, was changed so it also does not copy the location, in addition to not copying the warehouse
- Activated the options named `Calculate Discount 1 Percentage from the Value` to work with entry, not only with save; these options also cannot be applied to the main discount, due to the many problems it could cause
- Added the following fields to the offer details, as follows:
  - Applies when the item's total on the line is less than or equal to
  - Applies when the item's total on the line is greater than or equal to
  - Item Section
- The two new fields in the Offers window (less than or equal to - greater than or equal to) allowed the user to enter the same value in two lines, such as 100-110 in one line and 110-120 in another, causing overlap. This was updated so the two fields are (greater than or equal to, less than)
- Added 5 reference (`ref`) fields to the **Sales Order** screen
- **Sales Order - Delivery page**: Added the grid "Shipping Information"
- Added the option `Search references by connected name` to Global Config, to require the user to use the "%" sign instead of spaces; without this option, searching with spaces is possible
- Added the option `Update line discounts from the offers on save` to the Sales term config, to be able to update the discounts for all lines after finishing the invoice, since doing so during entry causes some problems because the invoice total changes with every line entered
- Added the two columns `Greater Than or Equal To`, `Less Than` to the offers page for item discounts

### **Manufacturing**
- Added an attachment to **Product Components**

### **Real Estate**
- Created the **Rent Exemption Voucher**, responsible for exempting one or more months for a leased unit under an active contract for a specific owner
- Created the **Consolidated Collection Voucher for Lease Contracts**, which lists all instalments whose collection date has arrived but that have not yet been collected

### **Contracting**
- Added the option `Merge the Analysis Card tables into one table` to the Contracting settings
- Added the option `Prevent automatic coding of the Analysis Item code` to the Contracting settings
- Added the option `Allow creating an Analysis Card without a contract or an Assay` to the Contracting settings
- Added the ability to automatically code the Analysis Card's items when creating the Analysis Card based on the Assay, not just the contract

### **Human Resources**
- Adjusted the tool for recalculating the leave balance, `https://drive.google.com/file/d/14Erkp0CQzImlZr_ExX4sNTMqIIPmMQgR/view?usp=sharing`, so it prints a clear error message when an error occurs
- Added the option `Allow issuing the salary if there are official holiday days in the middle of a leave` to the Human Resources settings
- Added an attachment to each of the documents (**Exit and Return Visa Request**, **Passport Receipt Request**)
- Added the fields (the option `Used in salary rounding`, salary rounding method, round to nearest) to the **Salary Component** window
- **Human Resources settings**: Added `Calendar HR` to the social-insurance lines, so insurance percentages can be set according to the calendar the salary is paid on. For example, if the calendar is monthly, the employee's share percentage is 20%, whereas if the calendar is weekly, the employee's share percentage is 5%
- Added two fields to the Salary Component formula, `Minimum Formula Value` and `Maximum Formula Value`
- Added the field `Affects Other Leave by a Rate` to the "Leave Type" file, so that it affects another leave type by a specified rate. For example, Sick Leave can be set to reduce Annual Leave by (50%) half a day

### **Point of Sale**
- Added the field `Dimensions Copy Method` to the lines of discount vouchers in offers (from the invoice - from the offer)

### **Accounting**
- Added the type `Column Grouped And Stacked` for dashboard widgets
- Fixed an issue where, at the cashier, creating a Shift Open voucher and creating a Receipt voucher or any other operation, then creating a Shift Close voucher, made the lines in the close disappear on save, so no journal entry appeared

### **Fixed Assets**
- Users are now prevented from issuing an **Asset Addition or Exclusion Document** for an asset in a period if a Depreciation Document has not been issued for it in that period

### **Reports**
- Changed the leave reports (`014HRS-SYSR`, `013HRS-SYSR`); unsaved leaves are now prevented from being shown

### **Settings**
- Added the option `Maximum duration in seconds for executing reference-suggestion display queries` to Global Config
- Added the grid "Additional Search Fields When Searching for a Reference" to the Fields & Screens Settings
- Changed the entity flow `EAWordTemplate` so it retrieves the vendor file from a field specified in the second input. For example, to print the invoice according to the attachment found on the customer, the user can use: `customer.attachment`
- In the `Field Info` window, opened from the More menu via the shortcut (`CTRL+Alt+X`), added the following expressions to make them easier to copy when building reports from this window:
  - `NamaRep.name("اسم الحقل بالعربي","Field Name English")`
  - `$F{Column}`
  - `NamaRep.translate($F{Column})` if it does not contain `_id`
- Added the table "Search Fields (used for the search-for field)" to Screen Modifier, on the Edit Selection List page
- Added the two actions (Review, Cancel Review) to the action types in the Entity Flow window
- Added a new date to the License Manager - `Download Release Allow Temporary Until`, so that setup and support staff can download a release for the customer if this date is later than the technical support expiry date. The main purpose is to avoid changing the maintenance expiry date when temporarily wanting to open up releases for the customer
- **Dynamic Criteria was not able to render tempo syntax, the ability was added**: Added a new field to the filter lines, `Tempo Use`; check it, then use the following expression in the `Dynamic Criteria` field:
  ```tempo
  {loop($currentUser.employee.responsibilities)}
  section.code,Equal,{$currentUser.employee.responsibilities.responsibility.code},OR; 
  {endloop}
  ```
- **Screen Modifier - Reports page**: Added the option "Hide in Questions" next to each report parameter
- Added the option `Use the decision to return to the previous step` to Global Config
- Added the option `Allow editing while awaiting approval` to the Approval file
- Built a `Generator QR` with the current user's login data, allowing the user to use the application and do a `qr code scan` to log in to the mobile app

### **Mobile Applications**
- Added the following options:
  - Do not allow creating an Electronic Task voucher except through the app
  - Do not allow creating an Electronic Attendance/Departure voucher except through the app
  - Do not allow creating a Leave Request except through the app
  - Do not allow creating a Permission Request except through the app
  - Do not allow creating an Electronic Stocktaking except through the app
  - Do not allow creating an Electronic Receipt except through the app
- Added the option `Number of hours allowed before blocking departure check-out through the app` to the Nama Mobile settings
- Moved the old settings for the mobile applications to the new Mobile module settings, before updating to the latest release

### **New GUI**
- Improved so the table border color is closer to the theme in use
- Improved the translation of dimension fields to be similar to the Old GUI (where the line name is placed before the field, if one exists)
- Activated the periodic queries in (`User Timed Queries`)

## **Fixes**

### **Inventory**
- **Inventory Transfer Request**: Fixed an issue where, with "Inventory Location Mandatory" enabled and no default inventory location set on the location: when creating an Inventory Transfer Request, selecting the warehouse, and then the inventory location on the lines, the inventory location was cleared on save, so saving was not allowed
- Fixed an issue where the **Additional Costs Voucher** was not affected by weight-based distribution, but only worked with quantity
- **Assembly Machines file**: Added the following two pages:
  - The search did not work with some fields, whether using the mouse or the keyboard
  - Some fields were duplicated in the details of some windows
- Fixed an issue where, after duplicating a window (via Screen Modifier), only the original window appeared in searches. For example, after duplicating the Issue window, it did not appear in the Issue vouchers linked to the item on the Transactions page — only the original Issue vouchers appeared, and even searching by the duplicate's document code showed only the original

### **Sales**
- Fixed an issue where duplicating an invoice copied the `id` of the invoice's voucher, so the invoice could not be saved in the duplicate
- Fixed an issue where discount-voucher offers in Sales did not respect the segment or the dimensions of the document, because the voucher line has no segment or dimensions
- Fixed an issue where, with settings configured to consolidate Issue vouchers into the Sales Invoice, and the items' units differing across the consolidated vouchers, the consolidation was done incorrectly
- Fixed an issue where, creating a Sales Return and selecting a customer in the document header: selecting an item and then a Sales Invoice on the line (`sourceInvoice.details`) showed invoices that did not belong to the same customer

### **Purchasing**
- **Purchase Invoice**: Fixed an issue where, in some cases, showing the field `orginDoc` on the line and pulling in some Purchase Orders caused an error
- **Purchase Invoice**: Fixed an issue where showing the field `orginDoc.details` on the line and then pulling in some Purchase Orders caused an error

### **Accounting**
- Fixed an issue where creating a Disbursement Request and a Disbursement Voucher in a foreign currency, with a conversion factor different from the one defined in the exchange rates, caused an error in the remaining value on the Disbursement Request
- Fixed an issue where Nama accepted consolidating disbursement requests for more than their value into a Consolidated Disbursement Request, in the following two cases:
  - Duplicating another Consolidated Disbursement Request
  - Increasing the value on the lines of the Consolidated Disbursement Request
- Fixed an issue where creating a Receipt Voucher settling Sales Invoices from the Invoices page, then deleting it, did not delete its lines from the `AllManualDebtLines` table

### **Settings**
- Fixed an issue where editing a list and trying to place the favorite before the basics showed the error "the operation could not be completed"
- Fixed an issue where importing records from `SQLImporter` in a scheduled task, when an employee was not found for example, showed a `error technical` message in the error alert, instead of a clear message explaining the error
- Fixed an issue where writing the email from the shortcut on the user icon did not save the entered email in the user file
- Fixed an issue where running a scheduled task of type Report and choosing a text file as the attachment format showed the error "the operation could not be completed"
- Fixed an issue where, when deleting item categories from unused screens, those categories remained in the search fields; deleted item categories should also be removed from the search fields when deleted from unused screens
- Fixed an issue where an error appeared when trying to change users' passwords

### **Contracting**
- Fixed an issue where the system consolidated the Cost Execution incorrectly on the Project Contract: issuing the first Cost Execution correctly showed the costed quantity, but with the second Cost Execution document, the system added the second execution's quantity to the contracted quantity
- **Contracting Raw Material Issue document**: Fixed an issue where an error occurred when selecting the Analysis Item code at the line level
- Fixed an issue where the system did not allow deleting a "Project Extract" document when a "Contracting Cost Execution" document existed in the Based On field

### **Fixed Assets**
- Fixed an issue where, in some cases, opening a fixed asset showed the message "the operation could not be completed"; this error appears when more than one asset has the same code across different companies, resulting from an Excel import
- Fixed an issue where cancelling a document for either (**Fixed Asset Addition or Exclusion Document**, **Fixed Asset Depreciation Assignment Document**) reversed its journal-entry effect but did not reverse its effect in the `FAPropertiesEntry` table
- Fixed an issue where the **Asset Depreciation Assignment Document** did not affect the asset's properties the first time, but did affect them after doing a recommit
- Fixed an issue where setting an asset type with a count on the Asset Purchase document did not open the count field on the document

### **Point of Sale**
- Fixed an issue where discount vouchers issued from offers did not copy the dimensions of the invoice they were issued from, and were issued on General instead
- Fixed an issue where the system did not transfer some expense vouchers existing in Point of Sale to Nama

### **Manufacturing**
- Fixed an issue where creating a Raw Material Return voucher produced a resulting stock receipt with items that had no cost — even though cost tracking on warehouses was disabled and a reprocess was done, the items still kept coming back without a cost

### **Human Resources**
- **Leave Balance Adjustment Voucher**: Fixed an issue where, if the first movement in the leaves was the adjustment voucher, the document calculated incorrectly
- Fixed an issue where the system allowed saving a Leave Voucher with a start date of 2019-7-18 and also a return date of 2019-7-18; saving any Leave Voucher with a duration of zero days should be rejected instead (except when using the "Leave value less than a day" field)
- **Advance Voucher**: Fixed an issue where, after setting the repayment start date and the number of instalments and generating the instalments, the document's end date did not equal the date of the last instalment. Example: creating an advance with a repayment start date of 2019-1-1 and 5 instalments, the system calculated the repayment end date as 2019-06-01 instead of 2019-05-01

### **Real Estate**
- Fixed an issue where, in some cases, creating a new sales contract and clicking "Generate Instalments" showed the error "the operation could not be completed"

### **New GUI**
- Fixed an issue where changing dimensions for entering the company from General to a company other than General was not accepted, while the reverse was accepted
- Fixed an issue where clicking "New" in the list view for support requests did not apply the template, while clicking "New" from the edit screen did apply the template
- Fixed an issue where some data did not show when the company name was long, causing the list name not to show
- Fixed an issue where default-value templates flagged with the "Manual" option and linked inside Edit Lists did not work
- Fixed an issue where, if a reference had a long name, only part of the name (the middle part) was shown
- Fixed an issue where, with a dashboard set to `refresh` automatically, then navigating to any document or file, the GUI did not stop trying to fetch the dashboard's data
- Fixed an issue where the entry-dimensions window, opened from the dimensions icon at the top of the interface, did not contain the options (print a single barcode, always print directly, print documents on save)
- Fixed an issue where, with more than one window open, an automatic logout did not log out of all open windows
- Fixed an issue where, in the lines of inventory documents, it was not possible to search by lot number or box number with a double-click or any other search method, except by typing the batch number
- Fixed an issue where double-clicking on file fields did not bring up initial results, as in the Old GUI
- Fixed an issue where, in list views, filtering by the book or the term config for a Sales Invoice, for example, made the system's search show the books (or term configs) of all documents
- Fixed the following issues that occurred when duplicating:
  - The system did not perform the duplication until it was clicked twice
  - Fields disallowed from copying (`Clear On Duplicate`) were not cleared
  - Fields with the (`Fields Disabled`) property kept working normally
- Fixed an issue where some windows did not show all the icons at the top, such as the Add icon, in windows like Notifications and Viewing Notifications
- Fixed an issue where clicking Cancel Review or Review with no lines selected did not raise an objection from the system
- Fixed an issue where the notifications counter did not update automatically in the New GUI
- Fixed an issue where opening "Change Password" from inside the user screen had all the `checkbox` option fields checked, which does not happen in the Old GUI
- Fixed an issue where, in the List View display, selecting "Show All" made the system ignore the option in Global Config (maximum number of records when showing all in lists)

### **Reports**
- Fixed an issue where some account-statement reports did not work with sorting by debit or credit, such as reports (`SYSR-ACC002`, `SYSR-ACC032`, `SYSR-ACC034`, `SYSR-ACC040`)
- Changed the dimensions (From Customer, To Customer) to (From Vendor and To Vendor) in reports (`005PIV-SYSR`, `006PIV-SYSR`), because these reports concern purchasing
- Made changes to report `001SLS-SYSR`
- Made changes to report `010INV-SYSR`

### **General Fixes**
- Fixed an issue where resizing the search table's width did not take effect, and the table width stayed as it was
