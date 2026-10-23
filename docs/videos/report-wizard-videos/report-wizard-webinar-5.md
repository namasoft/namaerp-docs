---
description: "Video summary: designing a Report Wizard print template for a document with several grids, using the multi-cell grid layout, merged cells, notes, signatures and an employee custody example."
---
# Creating a Print Template for a Filter Document Screen

[Watch the video](https://youtu.be/q16A05lIC5I)

**A detailed video** explaining how to design a print template for a filter document screen that contains more than one grid (data grid) using the multi-cell grid system - distributing fields, using Merge Center, adjusting positioning, and handling notes and reports.
Every step and detail was documented accurately and sequentially as presented in the video.

---

## Introduction and Project Overview

**00:00:01**
Welcome everyone. Based on viewer requests, this session explains how to create a print template for a filter document screen that contains more than one grid. We will start by expanding the discussion and adding various headings and points at the beginning of the project.
- Discussing additions and sub-items
- Identifying the main template type
- Working on the core fields and functional requirements.

[Watch from 00:00:01](https://youtu.be/q16A05lIC5I?t=1)

---

## Identifying the Core Fields in the Template

**00:01:20**
The template contains two main fields:
- Document number (document code), which represents the identifying code of the document.
- Clearance reason or filter type (e.g., leave, directive, etc.).

Defining these two fields is essential for establishing the basic structure of the template, where details are specified first such as:
- Header Columns Count (number of columns in the header)
- Field positioning type (Grid Positioning Method) - there is a grid system similar to an Excel table that distributes content by columns and rows.

[Watch from 00:01:20](https://youtu.be/q16A05lIC5I?t=80)

---

## Explaining the Grid System and Column Distribution

**00:02:05**
- Explaining the differences between Absolute positioning (pixel-precise position) and Grid (data grid, cells and columns built on a spreadsheet-like table).
- Print template columns and arranging the field order so that we start with 10 columns.
- Merging cells (Merge Center) to distribute text across more than one column.

[Watch from 00:02:05](https://youtu.be/q16A05lIC5I?t=125)

---

## Distributing Fields in the Template with Examples

**00:03:30**
- How to place the document number and clearance reason on the same row using the Merge Center feature.
- Explaining employee code and employee name fields in related positions.
- Explaining how to use Label and Value for each field and how they are displayed.

[Watch from 00:03:30](https://youtu.be/q16A05lIC5I?t=210)

---

## Notes and How to Handle Them

**00:03:54**
- How to import and display document notes.
- Adjusting the coordinates of notes on the Grid so they start from a specific column and row (x=1, y=1).
- Merging cells to center the text (Merge Center).
- Formatting notes so they fill their allocated space as long-form text documentation.

[Watch from 00:03:54](https://youtu.be/q16A05lIC5I?t=234)

---

## Adding Extra Fields: Date, Status, and Related Items

**00:05:20**
- Adding a first work start date field and a status field next to the notes.
- Adjusting Position and Width settings for each field so they do not overlap or stack.
- Practical exercise: saving and printing to preview the template.

[Watch from 00:05:20](https://youtu.be/q16A05lIC5I?t=320)

---

## Handling Multiple Merged Cells (Lats)

**00:07:30**
- The challenge caused by multiple mixed merged cells and their effect on positioning and splitting.
- Increasing the columns from 10 to 12 to distribute information better and eliminate problems related to decimal measurements.
- Proposing dynamic recalculation of columns using a dedicated button to clean up fields.

[Watch from 00:07:30](https://youtu.be/q16A05lIC5I?t=450)

---

## Practical Walkthrough: Distributing Columns and Rows

**00:09:45**
- Dividing the 12 columns into four groups in a practical exercise.
- Setting the position (x, y) for each Label and Value in detail.
- Explaining how to use Merge Center to merge multiple columns into a single text cell.

[Watch from 00:09:45](https://youtu.be/q16A05lIC5I?t=585)

---

## Adjusting Field Width and Height

**00:13:15**
- Confirming that field height should preferably be 1 (single row) except for multi-line text.
- A practical example of adjusting Width and the number of columns a given value covers inside the template.
- Explaining how to fill data vertically and horizontally.

[Watch from 00:13:15](https://youtu.be/q16A05lIC5I?t=795)

---

## Grouping Fields Across Multiple Rows

**00:15:50**
- Placing fields so they anchor to a specific Row inside the template.
- Explaining and positioning fields: employee code, employee name, notes, and date in their appropriate locations.
- Swapping and adjusting Value and Label entries to match the required design.

[Watch from 00:15:50](https://youtu.be/q16A05lIC5I?t=950)

---

## Adding Lines and Section Separators

**00:21:30**
- Discussing the use of separator lines between fields or headings.
- Possibility of adding a checkbox to apply Borders around individual fields as needed.
- Confirming that the current template does not support displaying Borders without using custom options.

[Watch from 00:21:30](https://youtu.be/q16A05lIC5I?t=1290)

---

## Working with Multi-Grid Layouts

**00:23:50**
- Explaining how to work with more than one Grid inside the same print template.
- Adjusting the order and position between a main grid and another detail grid (for example: leave filter details).
- The importance of using Titles for each grid section for easy reading and comprehension.

[Watch from 00:23:50](https://youtu.be/q16A05lIC5I?t=1430)

---

## Fetching Discussion and Attachment Data in the Report

**00:29:50**
- How to fetch Discussion data and linked discussions through Linked Fields.
- Importing time-based details (On Time) and attachments linked to the document.
- Displaying text and attachments in a formatted manner and printing the complete report.

[Watch from 00:29:50](https://youtu.be/q16A05lIC5I?t=1790)

---

## Displaying Employee Name, Signature, and Date in the Template

**00:32:50**
- Determining the positions of the employee name, signature, and date fields within the template.
- Merging these fields on a single row while leaving appropriate spacing between them.
- Using expressions such as Custom Expression to adjust output.

[Watch from 00:32:50](https://youtu.be/q16A05lIC5I?t=1970)

---

## Adding Lines and Final Design Details

**00:36:10**
- Discussing the possibility of adding Borders around fields and checkboxes to activate borders.
- Noting that some properties require additional programming or external support tools.
- The importance of a flexible design that allows modifications as needed.

[Watch from 00:36:10](https://youtu.be/q16A05lIC5I?t=2170)

---

## Practical Application: Employee Custody Template and Linking to Employees

**00:38:10**
- Explaining how to import and display custody data (such as tangible items, cash, etc.) linked to an employee in the template.
- Detailing how to link the structure between the custody and the employee.
- Displaying fields such as delivery date, custody officer, notes, and custody recovery percentage.

[Watch from 00:38:10](https://youtu.be/q16A05lIC5I?t=2290)

---

## Verifying, Adjusting the System, and Related Reports

**00:44:00**
- Reviewing fields and adjusting their bindings within the system to ensure they appear correctly in the template.
- Handling cases of overlapping dates or inconsistent data.
- Steps for reordering and updating fields when errors or incorrect display occur.

[Watch from 00:44:00](https://youtu.be/q16A05lIC5I?t=2640)

---

## Closing the Video and Future Plans

**00:47:30**
- Confirming that the approach to working on templates is similar across different templates and does not vary much.
- Mentioning some points related to using separators (horizontal dividers) for greater clarity.
- Hinting at another video that will continue the explanation with additional details such as enabling Gmail and more.

[Watch from 00:47:30](https://youtu.be/q16A05lIC5I?t=2850)

---

# Conclusion
This video provided a comprehensive and detailed walkthrough of every step involved in creating a print template for a filter document screen that contains more than one grid and multiple details, addressing technical issues related to the Grid system, positioning, cell merging, and displaying data in an organized and professional manner.

---