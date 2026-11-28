---
description: "The three layers of fiscal period control: the period's open or closed status, Fiscal Year Status Update for closing a period selectively by user or document type, and Ignore Closed Periods exceptions, with how the layers interact and worked examples."
entities: [FiscalYearStatusUpdate, FiscalYear, FiscalPeriod]
menu: Basic → Master Files → Fiscal Year Status Update
---

# Fiscal Period Control

In many organizations, simply marking an accounting period as "open" or "closed" for everyone is not enough. The accounting department may need to complete adjustment entries in a period that is about to close, while the sales team must be prevented from issuing any invoice in that same period. Sometimes the reverse is true: the period is closed for everyone, but you want to allow a single user to record an urgent corrective entry.

Nama ERP provides three integrated layers of period control that cover all these cases:

| Layer | Tool | Effect |
|-------|------|--------|
| **Base** | Fiscal Period Status | General open/close for the period — applies to everyone and all document types |
| **Narrowing** | Fiscal Year Status Update | **Selective** closing of an open period for specific security profiles / users / document types |
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

This is a master file that lets you close (or open) periods in a precise, granular way based on **security profile or user**, **document type**, and **Dimensions** (Legal Entity / Sector / Branch / Department / Analysis Group) — instead of a blanket close.

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
| **Fiscal Year** | The year the rule applies to (required on every line) |
| **Fiscal Period** | The period the rule applies to. Blank = every period of that year. It must belong to the line's fiscal year |
| **Target Entity** | The target document type (e.g., Sales Invoice). Blank = all types |
| **Entity Type List** | A predefined list of types to apply the rule to multiple documents at once |
| **User** | Either a specific user or a whole **Security Profile**, to apply the rule to all its users |
| **Legal Entity / Sector / Branch / Department / Analysis Group** | Optional dimensions to restrict the rule to a specific organizational unit |
| **Status** | Rule outcome: **Opened** or **Closed** (required field) |

At the header level there is a **Priority** field for ordering the records, and an **Inactive** option to disable the record without deleting it. The header also carries the same fields as a line (Fiscal Year, Fiscal Period, Target Entity, Entity Type List, User, Status and the dimensions): whatever you fill on the header is copied onto **every** line when you save, replacing what the line had. Two identical lines in the same record are refused on save.

### How Does the System Apply Rules?

When a user attempts to save a document in a given period:

1. The system collects the lines of all saved, active records, ordered by the record's **Priority** — the **smallest number first** — and, within a record, in grid order.
2. It takes the **first matching rule** for the combination: document type + dimensions + period + fiscal year + current user (or their security profile).
3. If that rule's status is **Closed**, saving is blocked for that user/document in that period.

::: tip The Most Important Matching Rule
Any field left blank in a line means **"applies to all"**. So a line with only: Fiscal Year + Status = Closed + User = the "Sales Representatives" security profile + Target Entity = "Sales Invoice" closes sales invoices for sales representatives only, for that year, and leaves everything else open.
:::

### Two Important Notes

::: warning This File Narrows — It Does Not Widen
The base period close is the strongest within this layer: if the period is already closed at the base level, this file cannot reopen it for anyone. However, if the period is open at the base level, you can use this file to selectively close it for specific parties. (To open a closed period for a specific party, use "Ignore Closed Periods" in the next section.)
:::

::: info Priority Resolves Conflicts
When more than one rule can apply to the same situation, the first matching rule in order is applied: the record with the smallest **Priority** number wins, and inside a record the earlier line wins. Order your rules carefully when they overlap.
:::

### Practical Examples

**Closing the period for specific security profiles:**
Add a line, select the year and period, and in the **User** field select the relevant **Security Profile**. Leave the Target Entity blank. Set Status = **Closed**.
*Result:* The period is closed for all users of that security profile and remains open for everyone else.

**Closing the period for specific document types:**
Add a line, select the year and period, and in Target Entity select the document type (or an entity type list for multiple documents at once). Leave the user blank. Set Status = **Closed**.
*Result:* Those documents are closed for everyone in this period; all other documents remain open.

You can also combine a security profile, a document type, and a dimension (branch/legal entity) in a single rule for the most precise level of control.

---

## Part Two: Ignore Closed Periods — Exceptions

Sometimes a period is closed for everyone, but you want to **allow** a specific party or document to work in it (a corrective entry, a late adjustment, a special privilege for the Finance Manager). This is what **Ignore Closed Periods** does: an exception rule that makes the system treat a closed period as open — but only for those to whom the rule applies.

These exceptions can be defined in two places, with the same fields and the same behavior, except that the Fiscal Year grid has no Fiscal Year column (the year is the record itself):

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
| **Fiscal Year / Fiscal Period** | Restrict the exception to a specific year or period. When a period is chosen, the year is not checked |
| **User** | Allow a specific user |
| **Allow For** | A broader party to allow: an **Employee**, a **Security Profile**, or a **Group**. The current user only needs to belong to the one chosen |
| **Legal Entity / Sector / Branch / Department / Analysis Group** | Optional dimensions to restrict the exception to a specific organizational unit |

### How Does the System Apply the Ignore Rule?

- In the Global Configuration grid, a rule with every field blank is **never applied** (protection against accidentally opening all periods).
- In the Fiscal Year grid, a line whose **Entity Type**, **Fiscal Period**, **User** and **Allow For** are all blank is refused when you save the year. A line with a blank **Fiscal Period** covers every period of that year.
- For every filled field, it must match the current document/user; blank fields mean "all".
- The **Allow For** field matches the user through: the user themselves, their employee record, their security profile, or their group.

### Practical Examples

**Allowing the Finance Manager alone to work in a closed period:**
In Global Configuration, add a line in "Ignore Closed Periods In": specify the period, and in **User** select the Finance Manager (or in **Allow For** select their security profile). Leave the document type blank.
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
| *Can not have transactions on the closed period {0}* — «لا يمكن إجراء معاملات في الفترة المغلقة {0}» | The document's value date falls in a period that is closed for you — either closed at the base level, or closed for your party by a Fiscal Year Status Update rule. | Move the value date into an open period, reopen the period, or grant an Ignore Closed Periods exception for the party or the document type. |
| *Can not delete transactions on closed periods* — «لا يمكن حذف مستندات في فترة مغلقة» | Deleting a document whose value date sits in a closed period. Deletion is checked the same way as saving. | Reopen the period or grant the exception, then delete. |
| *Value Date {0} is not in the range of the fiscal period: [{1} - {2}]* — «التاريخ الفعلي {0} خارج نطاق تواريخ الفترة المالية [{1} - {2}]» | The fiscal period named on the document does not contain the value date. This is not a closing rule — the two simply disagree. | Correct the value date, or let the document pick its own period again. |
| *Could not find a fiscal period for the date {0}, please define a fiscal year or period* — «لم يمكن العثور على فترة مالية للتاريخ {0} - يرجى تعريف سنة مالية أو فترة مالية لهذا التاريخ» | No fiscal period covers that date at all — commonly a recurring document rolling into a year nobody has defined yet. | Define the fiscal year and its periods for that date. |
| *The line {0} is repeated with line {1}* | Two lines of a Fiscal Year Status Update record are identical in every field. The message has no Arabic translation, so it appears in English on Arabic screens. | Delete one of the two lines. |
| *Fiscal Period {0} does not belong to the selected Fiscal Year {1}* | On a Fiscal Year Status Update record, the period chosen (on the header or a line) is from another year. The message has no Arabic translation. | Pick a period of the selected year, or leave the period blank to cover the whole year. |
| *Entity type, fiscal period and user can not all be empty* — «لا يمكن ترك النوع والفترة والمستخدم فارغين معًا» | A line of the Fiscal Year's **Ignore Closed Periods** grid has none of Entity Type, Fiscal Period, User and Allow For, so it would open every closed period of the year for everyone. | Fill at least one of them. |
