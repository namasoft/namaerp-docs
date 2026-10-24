# Nama ERP Release Notes - February 2021

::: info Release Information
**Release Date:** February 2021  
**Release Number:** Nama-ERP-202102  
**Release Type:** Improvements and New Additions
:::

## Additions

### Inventory

#### Chain Supply Settings

- Added the option **"Allow a non-systematic book and term config for the items withdrawn and received in the term config of the Aggregation Voucher"** to the `Chain Supply` settings

#### Stocktaking Completion Lines

Added the following columns to the lines of `Stocktaking Completion` to show the serial numbers present in the stocktaking committee's count and the ones present in the books:
- Book Serial Number
- Serial Number in the Stocktaking Committee

The serial number is now taken into consideration in the Receipt and Issue vouchers

### Purchasing

#### Improving the Serial Field

Improved the Serial field in the `Purchase Invoice` so that, when clicking the magnifying-glass icon, the `focus` is on the serial-entry field in the first line, and when using the Enter key (`Enter`), it moves down to the next line and moves the `focus` to the same field in the next line, instead of the item-selection field

#### Miscellaneous Purchase Request and Miscellaneous Invoice

Added the following to both `Miscellaneous Purchase Request` and `Miscellaneous Invoice`:
- **5 description** fields, in addition to the ones already present in the document header
- **5 attachments** in the document header

#### Improving Duplicate Serial Handling

Improved the system in Supply Chain Management documents so that, when a duplicate serial number is entered within the same document, the system prevents saving and alerts the user that a duplicate serial number exists

### Letters of Credit

#### The LC Cost Document

Added the following two fields to the `Cost Document`:
- Total value of the terms that affect costs
- Total value of the terms that do not affect costs

### Sales

#### The Offers File

Added the field **"How to consider the item's sales from other invoices"** to the Offers file, in each of the following details:
- Item discount coupons on the main window
- Free items on items
- Discount coupons on the invoice value

This is so that the offer can be applied across more than one invoice, not just a single invoice

#### Customer Order Shortages Document

Added the Customer field to the line, so that it equals the Customer field on the header of the `Sales Invoice`, in order to know the customer's own requested quantity

#### Sales Invoice Term Config

- Added the option **"Call Post Action Of Field After Spreading Revisions Or Sizes"** to the term config of `Sales Invoice`

#### Service Expenses

Added the following fields to the term config of `Sales Invoice`, `Purchasing`, and `Miscellaneous Invoice`:
- **"Service Expenses"**
- **"Credit Service Expenses 1"**
- **"Debit Service Expenses 1"**
- **"Credit Service Expenses 2"**
- **"Debit Service Expenses 2"**
- **"Credit Service Expenses 3"**
- **"Debit Service Expenses 3"**
- **"Credit Service Expenses 4"**
- **"Debit Service Expenses 4"**
- **"Discount Service Expenses 1"**
- **"Discount Service Expenses 2"**
- **"Discount Service Expenses 3"**
- **"Discount Service Expenses 4"**
- **"Service Expense 1"**
- **"Service Expense 2"**
- **"Service Expense 3"**
- **"Service Expense 4"**

#### Improving Sales Returns

Improved so that, when the option **"Fill in the item's data in the line when adding this item from the document found in Based On"** is selected in `Sales Return`, the system adds all the lines of the selected item from the `Sales Invoice` to the `Return Invoice`, with all the line's details

#### Sales Price Lists

Added **5 ref fields** to the lines of `Sales Price Lists`

### Customer Relationship Management (CRM)

#### Updated Screens

Added **five references**, **five number fields**, and **five text fields** to the following two screens:
- `Complaint`
- `Suggestion`

### Accounting

#### Global Config

Added the field **"Do not show unpaid debt ages not manually settled before a date"** to Global Config; it is a date field

### Contracting

#### The Analysis Card

Added **five text fields** in addition to **five numeric fields** to the lines of the `Analysis Card` in Contracting

#### Dimension Fields

Added the following fields to each of **Contracts, Extracts, and Execution**:
- Dimensions | Width
- Dimensions | Length
- Dimensions | Height
- Quantity from Dimensions
- Deducted Quantity

Added the option **"Add the dimension fields to Contracts, Extracts, and Execution"** to the Contracting settings

#### Accounting Percentage

Added the option **"Take the Accounting Percentage into account when calculating the value of deductions"** to the term config of both `Project Extract` and `Subcontractor Extract`

### Real Estate

#### The Manual Level

Added the field **"Manual Level"** to each of `Assay`, `Estimated Budget`, and `Executive Budget`

### Project Management

#### Project Quotation

Added the field **"Project Duration"** to the group for the project's details, so that the project's start date is set, then the project duration, and the system determines the end date according to the duration in the Project Duration field. This information affects the Task Duration field on the tasks that are automatically created

### Customer Relationship Management (CRM)

#### New Documents

Added the following documents:
- `Initial Operation Document`
- `Solution Suggestion Document`
- `Problem Declaration Document`

### Human Resources

#### Salary Component Formulas

Added fields for calculating the Range using an `SQL` statement in Salary Component formulas

#### Performance Indicator

In the `Performance Indicator` screen, in the field **Consider Indicator Values**, added a fourth option (**For the Current Payroll Period**)

#### New Documents

Added the following two documents:
- `Aggregated Firing Request`
- `Aggregated Firing Document`

#### The Salary Voucher and Advances

- Added the field **"Maximum number of advance installments to be paid in the voucher"** to the term config of `Salary Voucher`
- Added a button **to create the installments** to the `Advance Request` document, like the one on the `Advance Voucher` screen

#### The Vacation Calendar

Added the field **"Vacation Calendar"** inside the employee, to calculate vacations from it instead of the calendar found in the settings

#### Improving the Employee's Status

In the case of creating a `Firing Document` for an employee and changing his status away from (**Active**), if a `Vacation Voucher` or another voucher was then created for the employee, his status was changed back to **Active** again. Improved so that creating vacation vouchers for employees no longer in service, and changing their status, is prevented unless they are rehired again

### Manufacturing

#### The Resource Voucher

Added **attachments** to the Resource Voucher

### Fixed Assets

#### Fixed Asset Purchase Document Term Config

Created **4 fields** in the term config of `Fixed Asset Purchase Document`, as follows:
- Prevent adding Tax 1
- Prevent adding Tax 2
- Prevent adding Tax 3
- Prevent adding Tax 4

#### Pending Invoices

Ordered **Pending Invoices** in the Pending Invoices window by time, descending, by default

#### Fixed Asset Purchase Document

Added the following fields:
- **5 text fields**
- **5 description fields**
- **5 number fields**

### Point of Sale

#### Displaying Free Items

When applying a free-item offer from a free group in Point of Sale, improved so that the system opens a screen with the free group's items so the user can choose any of them

#### Hiding the Company Name

Added the option **"Hide the company name on the login window"** to the Point of Sale settings

### Settings

#### Displaying Items in Documents

Added the option **"Show the items found in the document only on the line or in Based On"** to the term config of documents

#### Detailed Remark

Added **twenty checkbox fields** (`"Check Box"`) to the document header in each of `Detailed Remark`, `Meeting Remark`, and `Remark`

#### Translating an Error Message

Translated the error message **"Code can not have spaces in start or end"**

### Mobile Applications

#### Improving the Login Page

Improved so that the page (**Login, Register, and Skip for Now**) does not appear when opening the app for the first time; instead, when the app is opened, it shows the app from the inside, without this page

#### Interface Additions

- Added Search to the top bar, alongside Notifications and the Cart
- Changed the word **New Arrivals** to (**Best Sellers**)
- Inserted the phrase (**Latest Products**) above the banner

#### User Improvements

- When logging in with the username and password, the message **Welcome** appeared to the customer, followed by the customer code. Improved so that it is followed by the customer's name instead
- The customer is now required to change the username and password that were sent to him, after logging in for the first time
- Improved so that, when the customer logs in, the name of his company appears under his name in the dropdown menu, instead of `namasoft`

#### Page Improvements

- Improved so that the system opens the **My Orders** or **Favorites** page even when there is no item in either of them
- When clicking the customer's name in the dropdown menu, items such as (**Code, My Reports, and Contact Us**) appear. Improved by changing the text's font, color, and the icon size
- Removed the underline from the word **My Statement** inside My Reports
- Improved so that, when clicking **My Statement**, the statement appears in the app without downloading it as a `pdf`

#### The Help Page

Improved the (**Help**) page so that one of the three values (**Remark, Complaint, Suggestion**) is chosen on the outside, then the user is taken to another page once one of them is chosen

#### Item Images

Added another place on the item for adding another image for the item (**two images per item**), so that every item appears on the app with two images; the image is taken from **"Attachment 2"** in Nama

#### Description and Notifications

- The description found inside the item was displayed in (`Html`). Improved so that it is displayed in the language set in Nama
- Improved so that notifications give a sound alert on the phone

#### Additional Improvements

- Improved so that, once a customer's registration request is completed, the message **"A message with the username and password will be sent to your phone as soon as possible"** appears
- When logging in as a guest, the site name appeared under the word Guest. Improved so that only the word Guest appears, without the site name under it

#### More Improvements

- Improved so that, when registering and selecting the country, a list of country names is shown to choose from, instead of typing in the field
- Improved so that, when the user logs in as a guest, only the links (**Contact Us, Help**) appear, and the user-specific links such as (**My Reports, Change Password, and Change Mobile Number**) do not appear

#### Item Improvements

- Enlarged the font size of both **"Attachment"** and **"YouTube Link"** inside the item on the app; the link is taken from the field **"Description 5"** inside the item in Nama
- Improved so that the app allows the user to add a personal photo of himself from the phone

#### Price Lists and More

- Applied the `Sales Price List` with the app, and the prices of the items found in the price list now appear inside the app
- Removed the use of location (`location`) when opening the app
- Added a button **to download any PDF document** on the app

#### Sharing and Navigation

- Improved so that, when clicking **Share**, the apps found on the user's phone are listed, to choose the app to share the app's link on
- Added a button so that a user who has a username and password can go directly to the login page after logging in as a guest

#### The Menu and the User

- Improved so that, when clicking the menu, the user's name appears, and under the name, the company name found in the field `description 1` in the User window appears

#### Receipt Vouchers App Settings

- When registering anew and transferring the data to Nama, in the `Mobile Application Action` screen, the type specific to the operation does not appear
- Created an option in the Receipt Vouchers App Settings in `mobile apps`, named **"Do not save the voucher if the type is not selected"**
- Created an option in the Receipt Vouchers App Settings in `mobile apps`, named **"Save Electronic Receipt vouchers as a draft if an error occurs"**

### Reports

#### Subsidiary Account Statement

Changed `Subsidiary Account Statement` so that, when the Subsidiary type is selected, the report filters on the account code specific to the subsidiary code, and does not show all the accounts present in the system; the `query` of the Subsidiary Account Statement was modified for this

#### ReportLog Additions

- Added the field `runId` to the `ReportLog` table; it can be filtered on in the run log, and it can be displayed in the report by adding a parameter with the same name and type `java.lang.Long`

#### Storing Inputs

Added the checkbox **"Store the inputs in the database on run"** to the report definition. If it is checked, the system will record the inputs in the log, and the action **"Re-run the report with the same inputs"** can be used from the run log screen (the user must select the line they want to re-run), and it will open the report run with the same previous inputs recorded in the database

## Fixes

### Inventory

#### Quality Inspection

- Fixed an issue where a `Quality Inspection Voucher` could not be saved when based on a `Quality Inspection Document Request`

#### Stocktaking

- Fixed an issue where Stocktaking did not take into account items that have a serial number when a receipt or issue was made for them

#### The Receipt Voucher

- **The Receipt Voucher**: Fixed an issue where, when issuing a `Receipt Voucher` based on an `Inspection Document`, the system inserted the accepted quantities, then changed the quantity on saving. An entity flow was created to solve this issue

#### The Additional Cost Voucher

**The Additional Cost Voucher**: Fixed an issue where, when the option **"Tax 2 is a Value, not a Percentage"** was enabled, the system added the full tax value to each of the expense-distribution lines, instead of distributing the value across the lines, which caused the tax value to be multiplied in the journal entry according to the number of lines

### Purchasing

#### Error Creating a Purchase Invoice

Fixed an issue where, when saving a `Purchase Invoice` (that does not perform an automatic receipt) created based on a `Purchase Order` that had a `Direct Cost Voucher` linked to it, along with the mentioned purchase invoice, the error **"Error while creating a purchase invoice"** appeared

### Sales

#### Auto-Save

Fixed an issue where, in some cases, an error occurred when using the field **"The fields that are auto-saved after being entered (CSV)"** in the term config of `Sales Invoice`

#### Tooltip

Fixed an issue where, in some cases, the `Tooltip` mechanism for showing the quantity and price did not work correctly

### Accounting

#### Bank Transfer Term Config

Fixed an issue where the term config of `Bank Transfer` did not show the second page (**Effect**)

#### Electronic Receipt Vouchers

**Electronic Receipt Vouchers**: Fixed an issue where, when deleting an `Electronic Receipt Voucher` that has an accounting effect, its effect remained present in the chart of accounts

#### The Receipt Voucher

**The Receipt Voucher**: Fixed an issue where, in some cases, when selecting collection for a customer and searching by request number, the system did not search correctly

#### Linking Invoices

Fixed an issue where, in some cases, when linking a `Miscellaneous Invoice` to a `Cash Payment Voucher`, a message appeared saying the link could not be made because it would result in negative values, due to rounding in currency conversion

### Contracting

#### Execution

Fixed an issue where the system did not take the previous quantity into account in `Execution`, for both Project Execution and Subcontractor Execution, when creating a new document

### Human Resources

#### The Vacation Voucher

- Fixed an issue where, when creating a `Vacation Voucher` for a day that was an absence day, the system considered it a weekly-holiday day and did not accept creating the voucher
- Fixed an issue where, in some cases, extra work days were calculated for some employees

### Manufacturing

#### The Production Order

**The Production Order**: Fixed an issue where, when calculating the weight complement, the value of the field **"Finished Product Density"** was not taken into account when grouping Lots or grouping Boxes, but was only taken into account on saving, which resulted in lines being added that had to be deleted manually

### Project Management

#### The Project Invoice

Fixed the following issues in `Project Invoice`:
- When grouping on expenses, the error **"Could not perform the operation"** appeared, and the same for the rest of the groupings
- When performing **Create Periodic Invoices**, the system did not create the invoices, and the error message **"Could not perform the operation"** appeared

#### Project Quotation

**Project Quotation**: Fixed an issue where, when creating a `Project Quotation`, adding a task and assigning it to more than one employee, then confirming - when the project is created and the same task is created, the system duplicated it at the level of each employee. This was incorrect, since all employees should be added to the single task at the line level

### Settings

#### Filtering Collector Employees

Fixed an issue where the system did not filter collector employees when searching for the collector in the following windows:
- `Bank Transfer`
- `Payment Order`
- `Payment Voucher`
- `Receipts Book`
- `Receipt Order`
- `Receipt`
- `Receipt Voucher`

#### Server Issues

Fixed an issue where, when activating a server without a `sub server` and then adding a `sub server` afterward, the two servers could not run together - when one was running, the other did not work, because the license stopped

#### Report Groups

Fixed an issue where, in `Report Groups`, the report groups did not appear even though the option **"Add to the list automatically"** was checked, and when doing a `recommit` they appeared correctly

### Human Resources

#### Carrying Forward Vacations

Fixed an issue where, if a `Vacation Voucher` was issued while there was already a `Vacation Voucher` for the same employee in the previous year, and the vacation type was at the start or end of the month, the vacation was not carried forward

### Contracting

#### The Project Contract

- Fixed an issue where, when creating a `Project Contract` and clicking the source (**Term Sheet**), the quantity found in the Term Sheet did not appear in the contract; the correct behavior is that, when the source is added, the line data - including the quantity - should be added
- Fixed an issue where, when creating a `Subcontractor Extract` based on a `Subcontract`, the system refused to save

### Point of Sale

#### Displaying Errors

Fixed an issue where the system displayed errors in Point of Sale even though the user had not been given permission to view data-transfer errors

#### Items Sent

In the **"Items Sent to Point of Sale"** screen, prevented selecting an item that has the option **"Do not transfer to Point of Sale"** enabled

### Reports

#### Report SYSR-ACC028

Fixed some errors that appeared in the report **"SYSR-ACC028"**

### Mobile Applications

#### Page Issues

- Fixed an issue where, when entering the item section and going into any page then leaving it for another page, the previous page appeared for about a second before the new page opened

#### Banner Issues

Fixed an issue where, when the banners were changed and the phone was closed and opened again, they did not appear; but if the app was cleared and reinstalled, the banners appeared

#### Notifications

Fixed an issue where notifications did not work on the app
