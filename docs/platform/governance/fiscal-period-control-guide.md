---
description: "The three layers of fiscal period control: the period's open or closed status, Fiscal Year Status Update for closing a period selectively by user or document type, and Ignore Closed Periods exceptions, with how the layers interact and worked examples."
entities: [FiscalYearStatusUpdate, FiscalYear]
menu: Basic → Master Files → Fiscal Year Status Update
---

# Fiscal Period Control

In many organizations, simply marking an accounting period as "open" or "closed" for everyone is not enough. The accounting department may need to complete adjustment entries in a period that is about to close, while the sales team must be prevented from issuing any invoice in that same period. Sometimes the reverse is true: the period is closed for everyone, but you want to allow a single user to record an urgent corrective entry.

Nama ERP provides three integrated layers of period control that cover all these cases:

| Layer | Tool | Effect |
|-------|------|--------|
| **Base** | Fiscal Period Status | General open/close for the period — applies to everyone and all document types |
| **Narrowing** | Fiscal Year Status Update | **Selective** closing of an open period for specific permission files / users / document types |
| **Exception** | Ignore Closed Periods | **Selective** permission to work in a closed period for a specific party or document type |

::: tip Core Concept
- **Fiscal Year Status Update** *narrows*: it closes what is open for specific parties.
- **Ignore Closed Periods** *makes exceptions*: it opens what is closed for specific parties.
:::

## Base Layer: Fiscal Period Status

Each accounting period has a default status: **Opened** or **Closed**. When a period is closed at the base level, the system prevents any user from saving a document dated within it. This is the "general" close — it is the starting point on top of which the two remaining layers operate.

---

![The Fiscal Year screen and its periods](../../ar/modules/accounting/images/setup/fiscal-year-en.png)

## Part One: Fiscal Year Status Update — Selective Closing

This is a master file that lets you close (or open) periods in a precise, granular way based on **permission file or user**, **document type**, and **Dimensions** (Legal Entity / Sector / Branch / Department / Analysis Group) — instead of a blanket close.

### Screen Location

**Path**: Basic → Master Files → Fiscal Year Status Update

### Step 1: Activate the Feature

This file has no effect unless it is activated in **Global Configuration** via the option **Enable Fiscal Year Status Update**, on the [Documents and Books tab](/platform/global-config/global-config-documents#Fiscal-periods-and-closing). If this option is not enabled, the system ignores all Fiscal Year Status Update records entirely.

::: warning
Without enabling this global option, no Fiscal Year Status Update record will have any effect, regardless of how many rules you add.
:::

### Step 2: Create the Record and Add Rules

Create a new record and add lines to the detail grid — **each line represents an independent close/open rule**. Line fields:

| Field | Description |
|-------|-------------|
| **Fiscal Year / Fiscal Period** | The period the rule applies to (leave blank to apply to all) |
| **Target Entity** | The target document type (e.g., Sales Invoice). Blank = all types |
| **Entity Type List** | A predefined list of types to apply the rule to multiple documents at once |
| **User / Permission File** | Choose either a specific user or a full **permission file** to apply the rule to all its users |
| **Legal Entity / Sector / Branch / Department / Analysis Group** | Optional dimensions to restrict the rule to a specific organizational unit |
| **Status** | Rule outcome: **Opened** or **Closed** (required field) |

At the header level there is a **Priority** field for ordering the rules, and an **Inactive** option to disable the record without deleting it.

### How Does the System Apply Rules?

When a user attempts to save a document in a given period:

1. The system collects all active rules ordered **by priority**.
2. It takes the **first matching rule** for the combination: document type + dimensions + period + fiscal year + current user (or their permission file).
3. If that rule's status is **Closed**, saving is blocked for that user/document in that period.

::: tip The Most Important Matching Rule
Any field left blank in a line means **"applies to all"**. So a line with only: Status = Closed + Permission File = "Sales Representatives" + Target Entity = "Sales Invoice" closes sales invoices for sales representatives only and leaves everything else open.
:::

### Two Important Notes

::: warning This File Narrows — It Does Not Widen
The base period close is the strongest within this layer: if the period is already closed at the base level, this file cannot reopen it for anyone. However, if the period is open at the base level, you can use this file to selectively close it for specific parties. (To open a closed period for a specific party, use "Ignore Closed Periods" in the next section.)
:::

::: info Priority Resolves Conflicts
When more than one rule can apply to the same situation, the highest-priority rule (the first matching rule in order) is applied, so order your rules carefully when they overlap.
:::

### Practical Examples

**Closing the period for specific permission files:**
Add a line, select the period, and in the User/Permission File field select the relevant **permission file**. Leave the Target Entity blank. Set Status = **Closed**.
*Result:* The period is closed for all users in that file and remains open for everyone else.

**Closing the period for specific document types:**
Add a line, select the period, and in Target Entity select the document type (or an entity type list for multiple documents at once). Leave the user blank. Set Status = **Closed**.
*Result:* Those documents are closed for everyone in this period; all other documents remain open.

You can also combine a permission file, a document type, and a dimension (branch/legal entity) in a single rule for the most precise level of control.

---

## Part Two: Ignore Closed Periods — Exceptions

Sometimes a period is closed for everyone, but you want to **allow** a specific party or document to work in it (a corrective entry, a late adjustment, a special privilege for the Finance Manager). This is what **Ignore Closed Periods** does: an exception rule that makes the system treat a closed period as open — but only for those to whom the rule applies.

These exceptions can be defined in two places, both with the same fields and the same behavior:

### A. At the Global Configuration Level (Applies to All Fiscal Years)

In **Global Configuration** there is an **Ignore Closed Periods In** grid, on the same [Documents and Books tab](/platform/global-config/global-config-documents#Fiscal-periods-and-closing). Rules defined here apply at the system-wide level.

### B. At the Fiscal Year Level (Applies to a Specific Year)

Inside the **Fiscal Year** record (Basic > Master Files > Fiscal Year) there is an **Ignore Closed Periods** grid specific to that year, used when you want exceptions confined to a single year without affecting others.

::: info Both Grids Are Combined
When checking any document, the system merges the ignore rules from **Global Configuration** and from the **Fiscal Year** record for that period. A match in **either** is sufficient to grant access.
:::

### Fields of the Ignore Rule

| Field | Description |
|-------|-------------|
| **Entity Type** | The document type allowed to bypass the close. Blank = all types |
| **Fiscal Year / Fiscal Period** | Restrict the exception to a specific year or period |
| **User** | Allow a specific user |
| **Allow For** | A broader party to allow: **Employee**, **Permission File**, **Employee Group**, or **Main Group**. The current user only needs to belong to any one of these |
| **Legal Entity / Sector / Branch / Department / Analysis Group** | Optional dimensions to restrict the exception to a specific organizational unit |

### How Does the System Apply the Ignore Rule?

- If all fields of a rule are blank, the rule is **invalid and will not be applied** (protection against accidentally opening all periods).
- For every filled field, it must match the current document/user; blank fields mean "all".
- The **Allow For** field matches the user through: the user themselves, their employee record, their permission file, or their group; if it is an "Employee Group", the user's employee must be a member.

### Practical Examples

**Allowing the Finance Manager alone to work in a closed period:**
In Global Configuration, add a line in "Ignore Closed Periods In": specify the period, and in **User** select the Finance Manager (or in **Allow For** select their permission file). Leave the document type blank.
*Result:* The period remains closed for everyone except the Finance Manager.

**Allowing only journal entries in a closed period for a specific fiscal year:**
Inside the Fiscal Year record, add a line in "Ignore Closed Periods": specify the period, and in **Entity Type** select "Journal Entry". Leave User/Allow For blank.
*Result:* Journal entries are permitted in that closed period for everyone; all other documents remain blocked.

---

## Application Priority (How the Layers Interact)

When attempting to save a document in a period, the system decides to allow or block in the following order:

1. **Does an "Ignore Closed Periods" rule apply?** (from Global Configuration or the Fiscal Year) — If yes, **access is immediately granted**, regardless of any close. This exception has the highest priority.
2. Otherwise, the system retrieves the status from **Fiscal Year Status Update**. If no matching rule exists, or if the period is **closed at the base level**, the period's base status is used.
3. Saving is allowed only if the final status is **Opened**.

::: tip Summary
- "Ignore Closed Periods" overrides everything (explicit permission exception).
- "Fiscal Year Status Update" can close an open period for specific parties but cannot open a period that is already closed at the base level.
- The base period close is the default when no rule applies.
:::

## Technical Notes

::: details Caching
The rules for "Fiscal Year Status Update" and "Ignore Closed Periods" are cached in memory to improve performance. The cache is cleared automatically whenever any of these records or the Global Configuration are modified, so changes take effect immediately without restarting.
:::

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Can not have transactions on the closed period {0}* — «{0} لا يمكن إجراء معاملات في الفترة المغلقة» | The document's value date falls in a period that is closed for you — either closed at the base level, or closed for your party by a Fiscal Year Status Update rule. | Move the value date into an open period, reopen the period, or grant an Ignore Closed Periods exception for the party or the document type. |
| *Can not delete transactions on closed periods* — «لا يمكن حذف مستندات في فترة مغلقة» | Deleting a document whose value date sits in a closed period. Deletion is checked the same way as saving. | Reopen the period or grant the exception, then delete. |
| *Value Date {0} is not in the range of the fiscal period: [{1} - {2}]* — «التاريخ الفعلي {0} خارج نطاق تواريخ الفترة المالية [{1} - {2}]» | The fiscal period named on the document does not contain the value date. This is not a closing rule — the two simply disagree. | Correct the value date, or let the document pick its own period again. |
| *Could not find a fiscal period for the date {0}, please define a fiscal year or period* — «لم يمكن العثور على فترة مالية للتاريخ {0} - يرجي تعريف سنة مالية او فترة مالية لهذا التاريخ» | No fiscal period covers that date at all — commonly a recurring document rolling into a year nobody has defined yet. | Define the fiscal year and its periods for that date. |
