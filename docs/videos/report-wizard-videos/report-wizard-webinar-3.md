---
description: "Video summary: building Cross Tab reports, account statements and inventory movement reports with the Report Wizard, step by step."
---
# Complete Documentation for Creating Cross Tab Reports, Account Statements, and Inventory Movement Using the Report Builder

[Watch the video](https://youtu.be/jZGCZt99ouw)

Welcome. Today we present a comprehensive and detailed walkthrough of how to create **Cross Tab** reports as well as **Account Statements** and **Inventory Movement** reports using the Report Builder tool. This documentation matches exactly what is covered in the video, including all details, examples, steps, and instructions without omission or summarization.

To watch the original video you can go directly to:  
[Start from 00:00:01](https://youtu.be/jZGCZt99ouw?t=1)

---

# 1. What Is a Cross Tab Report and How to Create One?  
_00:00:01 - 00:09:42_

- A Cross Tab report displays data by expanding columns rather than rows - a fundamental difference from regular reports.
- Columns are repeated according to the variable you want to focus on (e.g., warehouses), while rows represent items.
- The table used in the example is "Item Dimension Key", which contains item, warehouse, and quantity data.
- The first step is to choose appropriate colors for the report design, with options similar to Jasper colors such as (Hard, Light, Blue).
- In the settings we select the report type "Cross Tab only" without a regular table.
- Columns in the Cross Tab represent warehouses while rows represent items.
- A filter is added to show only quantities greater than or equal to 0.
- The formula type on columns is usually Sum.

### Practical Example  
- Selecting the first 25 items out of a total of 164 items.
- Displaying columns (warehouses), rows (items), and current quantities.
- Note: Links on warehouses are not currently supported in Cross Tab.

[Watch from 00:00:01](https://youtu.be/jZGCZt99ouw?t=1)  
[Watch from 00:07:19](https://youtu.be/jZGCZt99ouw?t=439)

---

# 2. Developing the Cross Tab Report and Linking to Categories  
_00:07:19 - 00:11:37_

- Adding different categories in rows such as (Category 1) before items.
- Selecting categories correctly so they appear in a logical order (category before item).
- Being precise when selecting category fields and linking them correctly to the items table.
- Enabling a link for canned goods and baked goods within categories while showing totals.
- Providing an example that displays more than one numeric field (current quantity, issued quantity).
- Confirming the ability to handle report groups and complex breakdowns easily.
- A tip for those interested in supporting the system: try building Cross Tab reports.

[Watch from 00:07:19](https://youtu.be/jZGCZt99ouw?t=439)  
[Watch from 00:11:37](https://youtu.be/jZGCZt99ouw?t=697)

---

# 3. Controlling Permissions and Security Constraints Inside the Report  
_00:11:37 - 00:16:42_

- Explaining how user permissions are applied to the data displayed by the report.
- Defining read or edit permissions based on company, branch, or sector.
- Composite company system: if the user is inside a composite company, they only see data belonging to the subsidiaries of that group.
- Hiding sensitive items that the user does not have permission to view.
- Practical explanations of how to apply security filters using specific columns inside the Grid.
- Confirmation that the system automatically handles these permissions to restrict data according to access rights.

[Watch from 00:11:37](https://youtu.be/jZGCZt99ouw?t=697)  
[Watch from 00:16:42](https://youtu.be/jZGCZt99ouw?t=1002)

---

# 4. The Difference Between a Cross Tab Report and a Regular Report (Group Report)  
_00:18:07 - 00:21:40_

- The regular report uses Grouping in rows but does not expand columns.
- The fundamental difference is explained between Cross Tab, which expands columns, and a regular report that contains multi-level row grouping.
- The ability to place multiple Levels in rows as a hierarchy (e.g., item then category).
- How the total display differs in each report type.
- Clarification that Cross Tab is very useful when you want to compare data by warehouses horizontally.
- A note about fixes for missing features in older versions of the software and the need to update them.

[Watch from 00:18:07](https://youtu.be/jZGCZt99ouw?t=1087)  
[Watch from 00:21:40](https://youtu.be/jZGCZt99ouw?t=1300)

---

# 5. Creating a Detailed Account Statement and Inventory Movement Report  
_00:26:09 - 00:54:30_

- Beginning the explanation of the Account Statement, which contains:
  - Opening balance.
  - Financial transactions (debit and credit) by account and liability.
  - Closing balance.

- Identifying the main tables used:
  - `ledger_trans_line` tables for transactions.
  - `item_dimension_key` tables for quantities and warehouses.
  - Average cost and costing tables via `item_dimension_cost`.

- A detailed look at how to retrieve transactions under time-based conditions (date filters).
- Handling cases:
  - An account with an opening balance only.
  - An account with transactions only.
  - An account with both a balance and transactions.
  - An account with no data.
- Using calculation functions and formulas built into the Report Builder for accurate computation such as:
  
  ```sql
  Balance = Opening Balance + Sum of Transactions (Debit - Credit)
  ```

- Explaining how to handle `NULL` values within SQL and avoid their impact on calculations.
- Sorting data by date using an ordering method based on `value_date` and `creation_date`.
- Showing how to form Groups and compute totals dynamically at the account and receivables level.
- A detailed explanation of the fields used and manual methods for correcting errors and reordering groups.

[Watch from 00:26:09](https://youtu.be/jZGCZt99ouw?t=1569)  
[Watch from 00:54:30](https://youtu.be/jZGCZt99ouw?t=3270)

---

# 6. Designing the Print Template  
_00:57:24 - 01:11:35_

- A simplified explanation of building a print template within the report tool:
    - Defining the data source (e.g., a sales invoice).
    - Splitting the template into a Header and Details.
- Choosing the fields to display such as:  
  Quantity, unit, price, total price, customer data, address.
- A warning against using multiple tables, which can cause unwanted repetition (e.g., payment methods with multiple items).
- Drawing tables and fields in a logical and simple way.
- Creating Subreports to display payment voucher details inside the report.
- Achieving flexibility in field ordering and the ability to easily modify field positions via the Screen Modifier.
- Clarifying the mechanisms for assigning types to each field (e.g., quantity field, price field, or text field).
- The ability to display sequential numbers (Line Number) for each item.
- Handling field properties such as line type (Type) and number of lines.
- Summary: a print template is simpler than a Cross Tab report but more suitable for formal printouts.

[Watch from 00:57:24](https://youtu.be/jZGCZt99ouw?t=3444)  
[Watch from 01:11:35](https://youtu.be/jZGCZt99ouw?t=4295)

---

# 7. Frequently Asked Questions and Closing Discussion  
_01:14:57 - End of video_

- The ability to modify old Jasper tool reports and convert them to the new reports and vice versa, along with an explanation of the complexities of this process and that it is not currently practically available.
- A lighthearted discussion about having to wait for the future (45 years as stated) to get these features.
- Some technical issues during the session such as screen loss and resetting.
- Thanks and appreciation to attendees with a mention of upcoming sessions for additional follow-up questions.

[Watch from 01:14:57](https://youtu.be/jZGCZt99ouw?t=4497)

---

# General Notes

- All design steps were performed using the Report Builder without the need to write code directly, using simple SQL parameters within the tools.
- Care was taken to display all numerical data accurately with full control over filters and permissions management.
- The practices used enable building complex reports that include detailed views, financial transactions, and printing capabilities.
- The video is very rich in technical information and practical steps that can be applied directly.

---

# Video Section Timestamps for Reviewing Details

| Section                                  | Start         | Video Link                    |
|------------------------------------------|---------------|-------------------------------|
| Introduction                             | 00:00:01      | [Watch](https://youtu.be/jZGCZt99ouw?t=1)       |
| Cross Tab Explanation                    | 00:00:01      | [Watch](https://youtu.be/jZGCZt99ouw?t=1)       |
| Developing the Cross Tab                 | 00:07:19      | [Watch](https://youtu.be/jZGCZt99ouw?t=439)     |
| Permissions and Security                 | 00:11:37      | [Watch](https://youtu.be/jZGCZt99ouw?t=697)     |
| Cross Tab vs. Regular Report             | 00:18:07      | [Watch](https://youtu.be/jZGCZt99ouw?t=1087)    |
| Account Statement and Inventory Movement | 00:26:09      | [Watch](https://youtu.be/jZGCZt99ouw?t=1569)    |
| Print Template                           | 00:57:24      | [Watch](https://youtu.be/jZGCZt99ouw?t=3444)    |
| Questions and Closing Discussion         | 01:14:57      | [Watch](https://youtu.be/jZGCZt99ouw?t=4497)    |

---
