---
description: "Video summary: Report Wizard report permissions, filtering report data by the user's branch, a sales invoice report, data sources and joins, SQL, and first and last invoice per customer."
---
# Comprehensive Documentation: Report Wizard Reports and Permission Management

[Watch the video](https://youtu.be/jvAJ5UjiIS8)

_Full video with detailed explanations of all sections, examples, and instructions_

---

## Introduction and Greetings - [00:00:01](https://youtu.be/jvAJ5UjiIS8?t=1)
The video opens with greetings from the speakers and an exchange of pleasantries. Ahmed and the attendees welcome each other and confirm the weekly meeting commitment and open Q&A session.

---

## Reports and User Permissions Management - [00:01:15](https://youtu.be/jvAJ5UjiIS8?t=75)
- Explaining the importance of tailoring each user's permissions so they can only see the data available to them in reports.
- Clarifying that there are multiple ways to manage viewer permissions and make edits, by navigating to "More" then "Edit Permissions".
- How to choose the appropriate permission type (view or edit) and then link it to the report or task.

---

## Filtering Report Data by User Branch - [00:02:17](https://youtu.be/jvAJ5UjiIS8?t=137)
- How to set a branch filter so the report displays only the invoices belonging to the user's own branch.
- A practical example in the report explaining how to apply the filter on the login branch inside the table.
- Using fields to query customers and invoices linked to multiple branches, with an explanation of the difference between showing invoices for the user's own branch and showing customers belonging to that branch regardless of which branch their invoices belong to.

---

## Applying Various Filters in Reports - [00:04:38](https://youtu.be/jvAJ5UjiIS8?t=278)
- A systematic explanation of how to apply multiple conditions together (AND rather than OR) in filtering.
- Illustrative examples of filters based on record creator, view permission, company, branch, department, and group.
- Clarifying the mechanism for filtering data within the customer list so it is visible only to users with the appropriate permission.

---

## Getting Started: Building a Practical Sales Invoice Report - [00:06:11](https://youtu.be/jvAJ5UjiIS8?t=371)
- Demonstrating the creation of a new report to test data display for invoices.
- Explaining how to split equal installments for a specific invoice, specifying the amount and its dates.
- Entering multiple invoices with different lines and applying split payments across several installments.

---

## Item and Price Data Display Settings - [00:08:31](https://youtu.be/jvAJ5UjiIS8?t=511)
- Reviewing how to fetch data for a specific item along with its name and price in the report.
- Using inputs to filter by invoice code and customer.
- Explaining the steps to calculate aggregate dates such as total payments and remaining balances.

---

## Working with Data Sources and Joins Between Tables - [00:11:58](https://youtu.be/jvAJ5UjiIS8?t=718)
- Explaining how to fetch invoice payment data using joins between invoice and payment tables via a shared key.
- The importance of using aliases to simplify working with fields and data sources inside the report.
- Demonstrating how to remove the second table (square lines) when it is not needed, to avoid duplicating rows.

---

## Advanced Development: Grouping Customers and Their Invoices - [00:14:14](https://youtu.be/jvAJ5UjiIS8?t=854)
- Converting the report to focus on customers rather than individual invoices.
- How to aggregate data and display total invoices and remaining amounts per customer based on a join between invoices and customers.
- Detailing the join between key fields such as Customer ID to avoid row duplication.

---

## Using SQL and Cartesian Products in Complex Reports - [00:20:45](https://youtu.be/jvAJ5UjiIS8?t=1245)
- Discussing the complexities of reports that merge tables line by line, especially when there are multiple codes or complex data sets.
- Explaining how to use joins to display consistent data sets without repetition or result inflation.

---

## Setting Up a Multiple Data Source to Show First and Last Customer Invoice - [00:23:20](https://youtu.be/jvAJ5UjiIS8?t=1400)
- How to create a second data source in the report to fetch the first and last invoice for each customer using aggregate queries (such as MIN and MAX for dates).
- The necessity of clearly naming data sources (aliases) to distinguish data.
- Linking this source to the customer's primary data in the report.

---

## Performance Optimization and Advanced Report Options - [00:27:30](https://youtu.be/jvAJ5UjiIS8?t=1650)
- Explaining the importance of controlling filter conditions precisely to speed up the process and the performance optimization tools available.
- Handling repeated data display by adjusting the join between sources.
- Suggestions for displaying data efficiently and avoiding duplicate fields.

---

## Resolving Invoice Editing Issues After Changing Branch/Sector Assignment - [00:29:31](https://youtu.be/jvAJ5UjiIS8?t=1771)
- Presenting a problem that arises when moving a branch from one sector to another and its effect on editing invoices linked to that branch.
- Explaining why errors appear during edits due to invoices being linked to related financial documents (journal entries, payment vouchers).
- Offering two solutions:
  1. Create a new branch and leave the old one unmodified.
  2. Enable a temporary option from support to bypass system restrictions until the edit is complete.

---

## Closing and Invitation for Future Questions - [00:31:30](https://youtu.be/jvAJ5UjiIS8?t=1890)
- A quick summary and opening the floor for additional questions and suggestions.
- Agreement to follow up on new inquiries and use the group for continued discussion.
- Announcing the next meeting date and farewell.

---

> **Tip:**
> Multiple reports can be created, divided by entity, and different permissions built to provide users with a precise and secure view of data. It is important to carefully order sources and avoid duplicate data to prevent calculation errors.

---

# Content Summary
The documentation above accurately reflects all steps, examples, and instructions presented in the video, with each section linked to the appropriate timestamp for easy reference and review of details.