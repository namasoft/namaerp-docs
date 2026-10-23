---
entities: [LimitUserToYear]
menu: Administration → Security → Limit User To Year
---

# Limit User To Year

This feature lets you restrict users' access to specific fiscal years and accounting periods, preventing them from viewing or creating documents in fiscal years they are not authorized to work with.

## Screen Location

**Path**: Administration → Security → Limit User To Year

## Overview

The "Limit User To Year" screen is used to control:

1. **Document restrictions**: Prevent users from viewing or creating documents in specific fiscal years or accounting periods
2. **Report restrictions**: Set a minimum date that a user can use in reports

## Details

### Fiscal Year and Period Restriction Fields

| Field | Description |
|-------|-------------|
| **Apply To** | The party the restriction will be applied to: user, user group, permission file, or employee |
| **Document Type** | The document type to restrict (optional) |
| **Type List** | A predefined list of document types to restrict at once (optional) |
| **Fiscal Year** | The fiscal year the user is allowed to work with |
| **Fiscal Period** | The accounting period allowed (optional — for more granular restriction) |

### Fiscal Year and Period Restriction Behavior

- If you leave both "Document Type" and "Type List" blank, the restriction will apply to **all document types**
- You can add multiple lines for the same party to allow several fiscal years
- Restrictions are **cumulative**: if a user has multiple restrictions (directly, through their group, permission file, or employee), the system combines all allowed years

## Limit User to Dates In Reports

### Date Restriction Fields

| Field | Description |
|-------|-------------|
| **Apply To** | The party the restriction will be applied to |
| **Min Date** | A fixed minimum date the user can select in reports |
| **Min Date From Today** | Number of days before the current date as a minimum date (a dynamic value) |

### Date Restriction Behavior

- If "Min Date From Today" is specified, it takes priority and the date is calculated dynamically
- The system chooses the most recent (largest) date from all restrictions applied to the user

![A Limit User To Year record: fiscal-year lines for two users above, report date limits below](../../ar/platform/images/list-views/limit-user-to-year-en.png)

## How the System Works

### 1. Restricting Document List Views

When displaying a document list (such as an invoice list), the system automatically:

```
1. Checks the document type
2. Looks up restrictions for the current user (directly or via group/permission file/employee)
3. Adds an automatic filter on the fiscal year and/or accounting period
```

::: tip Note
The user will not see documents in unauthorized years, even if they have permission for the document type itself.
:::

### 2. Restricting Report Questions

When running a report, the system:

- **Date fields**: Automatically adjusts the "from" date to be the minimum allowed date
- **Fiscal Year fields**: Automatically selects the first allowed year if the selected value is not permitted
- **Fiscal Period fields**: Automatically selects the first allowed period

::: warning "To Date" is recognised by name, not by meaning
A to-date prompt has to be left alone or the range would collapse, and Nama decides which prompts those are from the parameter's **name**: a prompt is exempt when its name contains `to` and does not contain `from` (case ignored), or when the name is exactly `tdate`. So `toDate`, `dateTo` and `ToDocDate` are exempt, and `fromDate` is correctly raised.

A to-date named anything else — `endDate`, `until`, `dueDate` — matches none of that. It is raised like a from-date, the range turns inside out, and the restricted user gets an empty report while everyone else gets the right one. Two escapes exist: a date prompt declared as a multi-selection list is never touched, and the report author can add `ignoreMinDates` = `true` to the parameter to opt that one prompt out. See [When Nama changes the answer the user gave](/platform/reports/reports-guide#When-Nama-changes-the-answer-the-user-gave).
:::

## Practical Examples

### Example 1: Restrict an Accountant to the Current Year Only

1. Create a new record in the "Limit User To Year" screen
2. In the details grid:
   - **Apply To**: Select the user to restrict
   - **Fiscal Year**: Select the current fiscal year (e.g., 2024)
3. Save the record

**Result**: The user will not be able to see documents from previous years in any list.

### Example 2: Restrict a Group to the Last 90 Days in Reports

1. Create a new record
2. In the "Limit User to Dates In Reports" grid:
   - **Apply To**: Select the user group
   - **Min Date From Today**: 90
3. Save the record

**Result**: Any report run by a user in this group will have the "from" date set to at least 90 days before today.

### Example 3: Restrict to a Specific Document Type

1. Create a new record
2. In the details grid:
   - **Apply To**: Select the user
   - **Document Type**: Select "Sales Invoice" for example
   - **Fiscal Year**: 2024
3. Add another line:
   - **Apply To**: Same user
   - **Document Type**: Leave blank (for the remaining document types)
   - **Fiscal Year**: 2023

**Result**: The user sees sales invoices for 2024 only, but all other documents for 2023.

## Application Priority

When a user has multiple restrictions, they are applied as follows:

1. Direct user restrictions
2. User group restrictions
3. Permission file restrictions
4. Linked employee restrictions

::: info
All restrictions are **combined** — meaning the user receives the union of all allowed years/periods from all sources.
:::

## Technical Notes

### Caching

- Restriction data is cached in memory to improve performance
- The cache is cleared automatically whenever any "Limit User To Year" record is changed

### Performance Impact

- Restrictions are added as SQL filters on document lists
- There is no noticeable performance impact during normal use
