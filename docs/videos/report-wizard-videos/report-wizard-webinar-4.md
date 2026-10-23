---
description: "Timestamped notes for the fourth report wizard webinar: building a sales invoice report with a date parameter, hyperlinks to an account statement, merged headers, conditional styling, cross tab reports, a per-salesman filter, and a tour of the new interface."
---
# Documentation for the Sales Invoice Report Training Video and New GUI Features

[Watch the video](https://youtube.com/watch?v=524hzeG10Ic)

This document provides a complete and detailed record of the training video content without summarizing or omitting any part. The content is organized according to the sections covered in the video, with precise timestamps for each part.

---

## 00:00:01 - Introduction and Overview of the Sales Invoice Report

- The video began with an apology for the delay in starting the recording.
- Creating a sales invoice report was explained, containing:
  - Total number of lines at the top.
  - The code field and actual date of the invoice.
  - The customer field repeated twice (code and name) to display the name and net amount at the end.
- A parameter (input) was created for the invoice date so that it falls between two values, asking the user for "from date" and "to date".
- When the values are entered (e.g., from the 23rd until today), the report appears in the same window, displaying the data in the required format such as customer code, name, code again, name, and so on.

[Watch from 00:00:01](https://youtube.com/watch?v=524hzeG10Ic&t=1s)

---

## 00:01:50 - Linking the Customer Code to an Account Statement Report Hyperlink

- Explanation of how to convert the customer code into a Hyperlink to an account statement report.
- Using "Open Hyperlink Expression" to select the appropriate report.
- Selecting the system account statement report (number 32 in the system).
- Setting the report parameters (such as start and end date, liability type: customer).
- Copying the code and saving the report to preserve the changes.
- When run, the report appears linked to the customer, with filtering by dates and liability type.
- Testing by clicking on customer number 6, which correctly displayed the closing balance data.

[Watch from 00:01:50](https://youtube.com/watch?v=524hzeG10Ic&t=110s)

---

## 00:06:12 - Merge Headers

- Explanation of the merge column headers feature to use a shared header (e.g., "Customer" with "Code" and "Name" underneath).
- Using `mergeArabicTitle` and `mergeEnglishTitle` fields to set the upper headers.
- Clarifying the importance of not leaving headers duplicated because it looks illogical (e.g., Customer Customer Customer).
- An example of merging two columns such as "Invoice Data" covering "Code" and "Actual Date", with a note that the merge should be between adjacent columns without any separating columns.

[Watch from 00:06:12](https://youtube.com/watch?v=524hzeG10Ic&t=372s)

---

## 00:08:08 - Details of Using the Hyperlink Feature and Parameters

- A full display of the hyperlink expression text to clarify all link details and parameters.
- Emphasis on the importance of including all related logical parameters for the report (e.g., you cannot create an account statement link without the customer identifier).
- The ability to select additional parameters depending on the nature of the report, such as accounts and time schedules.
- General instructions on how to think about how the link will appear based on the entered parameters.

[Watch from 00:08:08](https://youtube.com/watch?v=524hzeG10Ic&t=488s)

---

## 00:09:53 - Conditional Styling

- Defining conditional styling and its situation with programs that work similarly (such as Jasper).
- Creating new Styles including:
  - Default.
  - Red.
  - Yellow.
  - Green.
- Applying these styles to fields based on a specific value such as the "Net" field value.
- The conditions that were set up:
  - Less than or equal to 100 takes the yellow color (by default no color).
  - Greater than 100 and less than or equal to 500 takes the red color.
  - Greater than 1000 takes the green color.
- The explanation that the first matching condition will be applied and subsequent conditions will not be tested (order of conditions matters).
- Other fields such as date can have separate conditions applied to them.

[Watch from 00:09:53](https://youtube.com/watch?v=524hzeG10Ic&t=593s)

---

## 00:15:14 - Applying Conditional Styling Inside the Report

- Explaining how to link custom conditional styles to different fields.
- A reminder that a Static Style or a Conditional Style can be applied.
- Testing and adjusting the conditions to see their results on the report.
- It was noted that the entire customer report in red did not change until the first condition was modified.
- Emphasis on the sensitivity of condition order because the first matching condition is applied immediately and stops.

[Watch from 00:15:14](https://youtube.com/watch?v=524hzeG10Ic&t=914s)

---

## 00:18:41 - Overview of the New GUI Interface

- A quick display of the new GUI interface with its features such as:
  - The Search list.
  - The main report for Sales Invoices.
- The ability to modify column positions and show/hide columns as needed.
- The ability to do Grouping of repeated records, for example grouping purchases for the same customer or a specific item.
- Showing data export buttons to Excel similar to the old version.
- Observations on the difference in the report appearance depending on whether grouping is present or not.

[Watch from 00:18:41](https://youtube.com/watch?v=524hzeG10Ic&t=1121s)

---

## 00:22:31 - Invoice and Grid Editing Features Inside the System

- The invoice has become Collapsible with the ability to control opening/closing sections.
- A button to add a new line, copy the line, delete the line, and open the dedicated invoice editor.
- The ability to apply groupings inside the invoice itself (within line details).
- Support for multiple row copies and running groupings on them.
- Important explanations on preserving spacing through options inside the Grid.
- Displaying invoice data clearly with greater control.

[Watch from 00:22:31](https://youtube.com/watch?v=524hzeG10Ic&t=1351s)

---

## 00:24:02 - System Themes and Interface Colors

- There are two types of system styles:
  - The normal theme (Light Theme) with colors such as green and other contrasts.
  - The dark theme (Dark Theme) with a black background and light text to protect from eye strain, especially at night.
- The ability to choose custom colors for the user and save their custom color names.
- Using colors to differentiate between different companies and customers in the system.
- The theme selection feature interacts simply with the system without the need for a radical change in all elements.

[Watch from 00:24:02](https://youtube.com/watch?v=524hzeG10Ic&t=1442s)

---

## 00:26:00 - Beta Version of the New GUI and the Ability to Try It

- Explanation of the beta status of the new GUI and that a complete switch is not recommended yet because some things are still incomplete.
- An invitation to interested customers to try the beta by informing technical support and getting a copy to try.
- The change in the beta version is simple and within the scope of updates.
- The old version still works well and is synchronized with updates.

[Watch from 00:26:00](https://youtube.com/watch?v=524hzeG10Ic&t=1560s)

---

## 00:27:36 - Example of Cross Tab Reports

- Reviewing an example of Cross Tab reports and displaying quantities and cost.
- Changing the display order by code, Arabic name, or English name.
- The ability to do advanced sorting by item name or code.
- Support for more than one Measure in a single report, such as quantity and cost.
- The ability to categorize items within Cross Tab tables and multiple sections.
- Activating the single-page display feature instead of multiple pages to make data display better for viewing rather than printing.

[Watch from 00:27:36](https://youtube.com/watch?v=524hzeG10Ic&t=1656s)

---

## 00:33:56 - Invoice Report for the Current Sales Representative Only

- How to create a report that shows only the invoices of the current representative logged into the system.
- Setting the criteria so that "Salesman = ID of the current employee".
- Testing the report to show invoices related to that user only.
- Removing or modifying the date filter to adjust invoice display as needed.
- Mentioning the ability to modify the report to also show salary data for the current employee.
- The ability to modify the report to show manager and department head data when needed.

[Watch from 00:33:56](https://youtube.com/watch?v=524hzeG10Ic&t=2036s)

---

## 00:36:36 - Session Closing and General Questions

- The official session time ended with the floor open for questions.
- The team expressed readiness to receive suggestions and questions in the dedicated support group.
- A promise to hold additional clarification sessions based on requests and questions.
- Thanks to attendees and appreciation for the level of work and cooperation.

[Watch from 00:36:36](https://youtube.com/watch?v=524hzeG10Ic&t=2196s)

---

## General Notes

> **Tip**: When working with reports and formatting inside the system, focus on the order of conditions in conditional styling and do not forget to set important parameters such as customer and dates to ensure links work correctly.

> **Technical note**: Merging columns (Merge Headers) must be done on adjacent columns only; skipping non-adjacent columns is not allowed.

---

## Conditional Styling Code Examples

```json
[
  {
    "condition": "value <= 100",
    "style": "default"
  },
  {
    "condition": "value > 100 && value <= 500",
    "style": "red"
  },
  {
    "condition": "value > 1000",
    "style": "green"
  }
]
```

---

## Simplified Hyperlink Expression Example

```text
OpenHyperlink(
  ReportName = "Account Statement",
  Parameters = {
    "fromDate": [ParameterFromDate],
    "toDate": [ParameterToDate],
    "customerType": "Customer",
    "customerCode": [FieldCustomerCode]
  }
)
```
