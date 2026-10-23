---
description: "Notes for the first report wizard webinar: the parts of a report, choosing tables and fields, hyperlinks, grouping and aggregation, parameters and filters, sorting, calculated expressions, and exporting the finished report."
---
# Video (1): Report Designer Tool Walkthrough

[Watch the video](https://youtu.be/EUY4PkQbwp0)

This page provides a detailed explanation based on the content of the video, which covers how to build a complex report using an advanced report design tool, with links to specific parts of the video for reference.

---

## 1. Report Components

A report consists of several core components:

- **Data Source:** Such as databases containing Tables made up of Columns and Rows. For example, an Employees table has columns like code, name, date of birth, job title, etc., and the rows are the employee records such as Ahmed and Mohammed.

- **Query:** Data is extracted using a query language (such as SQL). It is important to use JOINs to combine data across tables, along with conditions such as WHERE to filter results (e.g., fetch employees born after 2000).

- **Report Structure:** Typically contains the following parts:
  - **Header:** Appears once at the top of the first page, or once at the top of every page.
  - **Columns:** Display data in an organized vertical and horizontal layout; they can be repeated and sized as needed for readability and printing.
  - **Groups:** Group data by criteria such as grouping invoices by customer or branch, with support for nested groups.
  - **Details:** The repeating row-level data in the report.
  - **Footer:** Summaries or totals that appear at the end of the report or at the end of each group.
  - **Summary:** A summary section that appears at the beginning or end of the report to consolidate information.
  
> You can watch a detailed explanation of report components at [00:00:21 - 00:05:56](https://youtu.be/EUY4PkQbwp0?t=21)

---

## 2. Steps to Create a Report

### a. Selecting Tables and Domains

- Identify the tables to include in the data, such as:
  - Sales Invoice table
  - Customers table
  - Purchase Invoice table

- Navigate between tables using JOINs to pull in related details.

### b. Selecting Fields

- Choose the fields to display, such as customer code, customer name, item, quantity, price, dates, etc.

- You can control the order and sizes of columns (in pixels) as needed for easy reading and printing.

### c. Working with Hyperlinks

- Create links within the report that navigate to detailed data (e.g., a link to invoice or customer information).

- Hyperlink generation can be enabled or disabled as needed.

> Watch a practical demonstration of selecting fields, adjusting columns, and configuring links at [00:13:00 - 00:20:00](https://youtu.be/EUY4PkQbwp0?t=780)

---

## 3. Groups and Aggregation (Grouping and Aggregation)

- Split data into groups, including nested groups within a larger group.

- For example: a primary group by branch, then a sub-group by customer.

- Display aggregations such as total invoices, total quantities, and create subtotals in the footer for each group.

- Handle line counters within each group or across the entire page.

> Watch the discussion and demonstration of groups at [00:03:44 - 00:05:56](https://youtu.be/EUY4PkQbwp0?t=224)

---

## 4. Parameters and Filters (Parameters & Filters)

- Allow the user to select a specific data range by entering criteria such as date, customer name, category, etc.

- Criteria can be set as mandatory or optional.

- Supports multiple filter types such as "greater than", "less than", "equals", or "between two values".

- Intelligent handling of NULL values that does not affect the results.

- Supports advanced parameter settings including default and reference values.

> Learn about parameters and how to use filters in detail at [00:49:37 - 01:06:23](https://youtu.be/EUY4PkQbwp0?t=2977)

---

## 5. Sorting

- Sort results by a chosen field such as invoice date, customer code, or other codes.

- Sorting can be set to ascending or descending.

- Multi-level sorting by selecting more than one field as a sort criterion.

> Learn about sorting and how to use it at [01:07:18 - 01:12:53](https://youtu.be/EUY4PkQbwp0?t=4038)

---

## 6. Working with Complex Values (Calculations & Expressions)

- Write expressions to compute composite data such as addition, subtraction, multiplication, or division.

- Example: calculating net from sales or returns by adding or subtracting values.

- Ability to work with cells that have additional formulas while preserving formatting.

---

## 7. Exporting and Displaying the Report

- Export reports to Excel or PDF while ensuring there are no data alignment issues.

- Easy display of the report on a separate page or within the same page.

- Support for properties that prevent pixel gaps between the header, footer, and details when exporting.

---

## 8. Summary

The tool demonstrated in the video allows both end users and technical experts to create multiple advanced reports quickly and easily, without needing deep technical or programming knowledge. The system focuses on making report design — including field selection, groups, filters, parameters, and sorting — flexible and straightforward, with support for dynamic linking.

---

# Key Video Links (Quick Reference)

| Topic | Start Time | Link |
| --- | --- | --- |
| Introduction and report components | 00:00:21 | [Watch](https://youtu.be/EUY4PkQbwp0?t=21) |
| Selecting fields and adjusting columns | 00:13:00 | [Watch](https://youtu.be/EUY4PkQbwp0?t=780) |
| Groups and aggregation explained | 00:03:44 | [Watch](https://youtu.be/EUY4PkQbwp0?t=224) |
| Parameters and filters explained | 00:49:37 | [Watch](https://youtu.be/EUY4PkQbwp0?t=2977) |
| Data sorting explained | 01:07:18 | [Watch](https://youtu.be/EUY4PkQbwp0?t=4038) |
