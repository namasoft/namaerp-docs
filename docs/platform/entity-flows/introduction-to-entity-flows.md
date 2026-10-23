---
description: "How Entity Flows work: when a flow is triggered, creating one and its detail components, the most used elements, running a flow in the background, and what each event does, from creating a record through save, delete and revision to e-invoicing, record view, manual and automatic runs."
entities: [EntityFlow]
menu: Administration → Display Customization → Entity Flow
---
# Introduction to Entity Flows

Entity Flows are one of the most powerful features in Nama ERP. They provide high flexibility for executing custom actions based on user interactions with the system, without requiring programming experience.

These flows are designed to give implementation consultants and technical support staff capabilities that were previously exclusive to developers, through a simplified and easy-to-use interface.

## When a Flow Is Triggered

An Entity Flow is automatically executed after the user performs a specific action, such as:

- Saving a record
- Editing a record
- Deleting a record
- Revising a record
- ... etc.

::: tip A flow can also be started from outside the system
Not every trigger is a person clicking something. An **integrator endpoint**, registered in [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-integrations), gives an external system an address it can call; what arrives there is handed to an Entity Flow, which decides what to do with it. That is how a web shop, a payment gateway or a supplier's system feeds data straight into Nama with nobody sitting at a screen.
:::

![An Entity Flow that runs on Validate On Save for customers](../../ar/platform/images/entity-flows/entity-flow-customer-code-check-en.png)

## How to Create an Entity Flow

1. Open the **Entity Flows** screen.
2. Select the entity type (e.g., Sales Invoice, Purchase Order, Customer, Supplier...).
3. You can optionally specify a condition via the **"Apply When Query"** field, to apply the flow only to records for which the query does not return 0. Only a first value of 0 (or false) stops the flow — a query that returns no rows, or NULL, lets it run.
4. You can also specify:
    - A specific book
    - A specific term config (توجيه)
    - Additional criteria to filter the targeted records

::: tip The flow did not run?
A flow has a dozen header settings that can stop it silently, and a few timing traps on top. [Why an Entity Flow Did Not Run](/platform/entity-flows/entity-flow-troubleshooting) walks through them in the order the system checks them.
:::

## Components of Flow Details

In the details table of each Entity Flow, you will find:

- **Element Name**: The name of the associated programming class that performs the required task.
- **Parameter 1 to 15 Title**: A description of each available parameter, explaining what to enter.
- **Parameter 1 to 15 Value**: The actual value that will be passed to the element, defining how the task is executed.
- **With Action**: Specifies when this element is executed within the flow's execution stages (e.g., after save, after revision, ...etc.).

The system supports up to 15 parameters per element, allowing great flexibility in customizing the desired behavior.

## The Elements Used Most

There are a few hundred elements, but a handful do most of the work. Across the customer configurations Namasoft holds, the elements below appear in the most installations — learn these first. Each link opens the element's reference page, with its parameters in order. The [Entity Flows Reference](/entity-flows/) lists every other element, module by module.

| Purpose | Element | What it does |
|---|---|---|
| Fill or change fields | [EAFieldsValuesCalculator](/entity-flows/core/EAFieldsValuesCalculator) | Sets fields from a field map: copy one field to another, a fixed value, or the result of a SQL query. It is used by almost every installation. |
| | [EAIgnoringNotFoundTargetFieldsValuesCalculator](/entity-flows/core/EAIgnoringNotFoundTargetFieldsValuesCalculator) | The same field map, but a target field that does not exist on the record is skipped instead of stopping the flow. |
| Create one record from another | [EAGenerateEntityFromEntityAction](/entity-flows/core/EAGenerateEntityFromEntityAction) | Creates and saves a record of another type while this one is saved — a payment voucher from an invoice, for example. |
| | [EAGenerateEntityFromEntityActionWithApproval](/entity-flows/core/EAGenerateEntityFromEntityActionWithApproval) | The same, for a target that has an approval definition, so the new record goes to approval. |
| | [EAGenerateDraftEntityFromEntityAction](/entity-flows/core/EAGenerateDraftEntityFromEntityAction) | The same, but the new record is saved as a draft for someone to review. |
| | [DeleteRelatedEntityAction](/entity-flows/core/DeleteRelatedEntityAction) | Deletes the record created above when the source record is deleted. |
| | [EAGenSCDocFromDocWithFieldsMap](/entity-flows/supplychain/EAGenSCDocFromDocWithFieldsMap) | Creates a supply-chain document from another document, line by line, through a field map. |
| Accounting | [EAAddAccountingEffect](/entity-flows/accounting/EAAddAccountingEffect) | Adds extra debit and credit lines to the document's journal, from field values on the document. |
| Lines | [EAGuessSourceLineIdByItem](/entity-flows/supplychain/EAGuessSourceLineIdByItem) | Links each line to the matching line of the document it came from, by item, when that link is missing. |
| | [EADetailsRemover](/entity-flows/core/EADetailsRemover) | Removes the lines that match a condition. |
| Protect data | [EAPreventChangingFields](/entity-flows/core/EAPreventChangingFields) | Refuses the save when chosen fields of an already-saved record are changed. |
| | [EAMakeCreationDateInValueDate](/entity-flows/core/EAMakeCreationDateInValueDate) | Moves the document's creation date to its value date, keeping the time. |
| Bulk work by query | [EAExecuteUpdateQuery](/entity-flows/core/EAExecuteUpdateQuery) | Runs a SQL update, insert or delete statement. |
| | [EARecommitFromQuery](/entity-flows/core/EARecommitFromQuery) | Saves again every record a query returns, so their effects and flows run again. |
| | [SQLImporter](/entity-flows/core/SQLImporter) | Creates records from the rows of a SQL query — see [Importing Data from Excel or Queries](/platform/entity-flows/excel-and-sql-import-by-entity-flow). |
| Documents and scripts | [EAWordTemplate](/entity-flows/core/EAWordTemplate) | Fills a Word template with the record's data and saves the result in an attachment field. |
| | [EAGroovyAction](/entity-flows/core/EAGroovyAction) | Runs a custom Groovy script when no ready-made element fits. |
| | [EARunEntityFlow](/entity-flows/core/EARunEntityFlow) | Runs another entity flow by its code, so a common sequence is written once. |

## Running a Flow in the Background

Normally a flow runs *inside* the save: you press Save, the flow runs, the save finishes. Whatever the flow does — however slow, however likely to fail — the user is sitting there waiting for it, and a failure in the flow fails the save.

That is the right behaviour for a flow that validates something or fills in a field. It is the wrong behaviour for a flow that calls an outside system, rebuilds a costing, or generates a pile of related documents. For those, tick **Run After Committing Document And Affect On DataBase**.

A flow marked that way is *deferred*. The document is saved and committed, its accounting and inventory effects are raised, the user gets the screen back — and only afterwards is the flow picked up, separately, and run. Nothing it does can slow the save down, and nothing it does can fail the save.

Deferring a flow raises the questions that come with any unattended work, and the fields beside the tick box answer them:

| Field | What it does |
|---|---|
| **Task Queue** | Which lane the deferred flow is processed in. Flows on different queues are processed at the same time; flows sharing a queue are processed one at a time, in the order they were raised. Left empty, the flow joins the default lane with every other unassigned flow. See [Task Queues](/platform/background-processing/task-queues). |
| **Max Retry Count** | How many times a failed run is attempted again before the system gives up. Left empty, the first failure is final. |
| **Retry Every Seconds** | How long to wait between attempts — the setting that makes a flow survive an outside system being briefly unavailable. |
| **Wait For Quantity Processing** | Holds the flow back while inventory work is still outstanding, so it does not read stock quantities or costs that are about to change. |

::: warning Only five events can be deferred
The tick box is refused unless **every** element in the flow targets one of five actions: **Add Draft**, **Revise**, **UnRevise**, **Post Commit** or **Post Delete**. Anything that runs as part of building the record — Validate On Save, Update Calculated Fields, Pre Apply Effects and the rest — cannot be deferred, because by then the save is over and there is nothing left to influence. Saving the flow with any other element returns:

> Option ( Run After Committing Document And Affect On DataBase ) does not work with target action {0}

So a slow flow on Update Calculated Fields is not made background by ticking the box; it has to be rewritten to run at Post Commit first.
:::

::: tip Where deferred flows are visible
A deferred flow that has been raised but not yet run is a real row you can look at, on the **Queued Entity Flows** grid of its Task Queue — with its status, how many times it has been tried, and any error. That is where to look when someone says the flow "did not happen".
:::

# Understanding the Record Lifecycle in Entity Flows

To understand precisely how **Entity Flows** work in Nama ERP, it is important to first understand the sequence of actions that any record goes through during creation or modification. The system provides execution points (Events) to which you can attach flow elements to control business logic with precision.

## `Init` — When Creating a New Record

This action is executed immediately after the user clicks the "New" button.

- Purpose: Assign **default values** to certain fields.
- Note: The user can modify these values later before saving.

## `PreUpdateCalculatedFields` — Before Updating Calculated Fields

Some fields are calculated automatically during saving. For example:

- Total price = quantity × unit price
- Tax amount = rate × base
- Invoice total = sum of values + taxes

The purpose of this action is to modify values **before** the system calculates these computed fields.

- Example: If you want to change the quantity before the total price is calculated, you must do it here.

## `AfterTemplate` — After Applying a Default Value Template

If there is a **default values template** (Template) associated with the screen and it has been applied, elements attached to this action will run immediately after the template is applied.

- Useful for adjusting additional values based on what was set in the template.

## `UpdateCalculatedFields` — After Updating Calculated Fields

As explained, the system automatically calculates certain fields. This action is executed **after** those calculations are complete.

- Use this action if you need to work with calculated values (such as total price or tax).
- It allows you to make further adjustments that depend on already-calculated values.


## `SaveDraft` — Save as Draft

The system allows saving a record as a draft, a state in which data validation is not performed and effects (such as accounting or inventory effects) are not applied. In this state:

- Only **calculated fields are updated**.
- The rest of the save actions are not executed.
- Elements attached to this action will only run when saving as a draft.

## `ValidateOnSave` — Save Validation

After applying default values and calculating fields, the system begins **validating the data**, such as:

- Confirming sufficient stock quantity is available.
- Confirming the customer is permitted to make purchases.

You can use this action to attach elements that assist with validation, such as:

- `EAPreventChangingFields`: Prevents saving if specific fields defined in the flow parameters have been changed.

## `PreApplyEffects` — Before Save Effects

After successful data validation, the system prepares to apply effects such as:

- Creating accounting entries.
- Adjusting inventory quantities.
- Updating related records.

At this stage, you can use this action to make **final adjustments** to the record or **create additional records**, especially if these adjustments affect the effects that will be generated.

## `PostCommit` — Save Effects

This action is executed **after all document effects are completed**.

- Typically used to create related records after saving.
- Common example: Creating an inventory location with the same customer code immediately after saving the customer.

## `PreSendRequest` — PreSend Business Request

When saving a document that results in effects on quantities or costs, these effects are not applied immediately. Instead, **processing requests** are created and sent to a **dedicated queue** to ensure they are executed **sequentially and safely**, avoiding data conflicts caused by concurrent processing.

### Types of Processing Requests:

- `LedgerTransReq`: For accounting effects.
- `InvTransReq`: For inventory effects, including quantities and costs.

### Using This Action:

- Elements attached to this action are executed **before sending** the processing requests.
- It can be used to add adjustments or additional effects, such as creating a custom accounting effect.

---

## `PostInvTransReqRequestCreation` — After Inventory Effect Request Creation

As mentioned, an `InvTransReq` is created for each inventory effect (whether a change in quantity or costs) and sent to the processing queue.

Even in cases where there is no direct effect, this request may be created for validation purposes such as:

- **Confirming available quantities** without an actual reservation, when the "Confirm Quantities on Save" option is enabled only.

### Using This Action:

- It is executed **after creating** the `InvTransReq` request.
- It allows working with the resulting request and modifying it if necessary, to ensure correctness or customization of quantity and cost effects before actual processing.

## `PreValidateOnDelete` — Before Delete Validation

When attempting to delete any record, the system first checks whether the deletion is possible without compromising data integrity. Examples of cases where deletion is prevented:

- Other records are linked to the record (e.g., a document that depends on the record to be deleted).
- In inventory receipt documents, if the deletion would result in **negative quantities**.
- In contracting progress certificates, if there are **subsequent certificates** that depend on the current record.
- In cash receipt documents, if the deletion would result in **a negative treasury balance** (when preventing changes to the accounting side nature is enabled).

Elements attached to `PreValidateOnDelete` are executed **before the validation process**.
You can, for example:

- **Delete a document that was automatically created** based on this record, as preparation for the deletion.

---

## `ValidateOnDelete` — Delete Validation

After the system successfully validates that the record can be deleted, elements attached to this action are triggered.

- You can use this stage to verify additional conditions or cancel the deletion in certain cases not automatically covered by the system.

---

## `PostDelete` — Delete Effects

When a record is deleted, the system automatically removes the effects it had created when the record was saved.

- You can use this action to remove **additional records that were automatically created**.
- Example: Deleting the inventory location that was automatically created when the customer was saved.

---

## `DeleteDraft` — Delete Draft

Drafts have no direct effect on the system, but if you created an effect (such as a linked record) while executing the `SaveDraft` action, you must **remove it when the draft is deleted** through this action.

## `Revise` — Record Revision

Nama ERP provides a record revision mechanism aimed at locking data and ensuring its integrity. After revision:

- The record cannot be edited or deleted.
- Additional revision-related actions can be automatically executed, such as:
    - Creating new records.
    - Applying additional effects.

Elements attached to this action run during the revision process.

---

## `UnRevise` — Cancel Revision

When a user cancels the revision of a record, elements attached to this action are automatically executed.

- Useful for reversing effects or deleting records created during revision.

---

## `EInvoiceCreation` — E-Invoice Creation

In many countries (such as Egypt, Saudi Arabia, Jordan), companies are required to submit their invoices electronically to government tax authorities.

- The system converts the invoice format in Nama ERP to the format required by the official authority.
- Elements attached to this action are executed **after the e-invoice is created**, and before it is sent.
- This allows executing additional modifications such as:
    - Adding notes.
    - Editing lines.
    - Ensuring data compliance with the authority's requirements.

---

## `PosteInvoiceSend` — After E-Invoice Is Sent

After the invoice is successfully sent to the relevant authority (such as the Tax Authority or the Zakat, Tax and Customs Authority), and its status is recorded as "Sent", elements attached to this action are triggered.

- Typically used to perform logging or notification operations based on successful submission.

---

## `PosteInvoiceValid` — After E-Invoice Is Accepted

The government authority reviews the invoice and verifies:

- Correctness of the data.
- Correctness of the customer's tax number.
- Compliance of the invoice with the regulations.

When the authority confirms the invoice is valid and changes its status to "Valid" or "Accepted", elements attached to this action are triggered automatically.

- Used to follow up on subsequent actions such as final confirmation, internal forwarding, or notifications.

## `RecordView` — Record View

Elements attached to this action are executed when any record is opened by any user.
::: danger
Because this event occurs very frequently, the system **disables** running Entity Flows attached to it by default.

To enable this type of flow, you must set the following option in Global Configuration:
<GlobalConfigOption option-code="value.info.enableRecordViewEntityFlows" title="Enable Record View Entity Flows"/>
:::

---

## `Manual` — Manual Execution

This action is used to trigger an Entity Flow manually by the user, through:

- A button inside the edit screen.
- Or from the "More" menu in the edit screen or the list view screen.

::: tip
- Entity Flows using this action must be added to the target screen.
- This is done via "Edit Screen" → the "Actions and Notifications" table.
:::

### Saving the record after a manual run

On its own, a manual run only executes the flow's lines. If those lines change fields on the record, the changes stay on the open screen and it is up to the user to press Save. Two options in the Entity Flow header change that:

- **Requires Commit On Manual** — the flow puts the record in edit mode, runs its manual lines, then saves the record itself. A record that has never been saved before is saved as a draft instead. Integrations that run flows without a screen, such as the mobile QR integrator, need this option.
- **Consider Approvals On Commit On Manual** — makes that automatic save behave like a save from the screen. Approval definitions are checked first, and when one applies the record goes to approval instead of being saved as final. Without this option the flow saves the record straight away and no approval definition is consulted.

::: warning Consider Approvals needs Requires Commit
"Consider Approvals On Commit On Manual" has no meaning by itself. If you check it while "Requires Commit On Manual" is unchecked, the Entity Flow refuses to save and points you to the option.

The "this record will go to approval" confirmation that the screen normally asks for is answered automatically, so the save needs no user interaction.
:::
---

## `Automatic` — Automatic

Some programming elements determine the appropriate action automatically, so the action is set to `Automatic` to ensure no errors occur when the user selects an incorrect action.

::: warning
- Users are not expected to create elements with this action.
- If an element is created using `Automatic`, it will run with **all other system events** (except `Manual`).
:::
