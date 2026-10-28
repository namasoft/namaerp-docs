---
entities: [ApprovalDefinition, ApprovalReason]
menu: Administration → Display Customization → Approval Definition
---
# Approvals System - Approval Definition Full Guide

## Overview

An approval definition holds a record of a chosen type until the people it names have approved it. It says which records need approval, in what steps, and who decides each step. The approvers are notified by e-mail, SMS, in-app notification and the mobile apps, and every decision is kept on the approval case.

## Core Concepts

### Approval Definition
An Approval Definition is the master configuration that defines when, how, and who should approve specific business transactions. Each definition contains:

- **Approval Entity**: Which type of record requires approval (invoices, purchase orders, etc.)
- **Approval Steps**: Sequential or parallel approval stages
- **Responsible Parties**: Who can approve at each step
- **Conditions**: When the approval should be triggered
- **Notification Templates**: How approvers are notified

![An Approval Definition](../../ar/platform/images/approvals/approval-definition-screen-en.png)

### Approval Case
When a transaction meets approval criteria, an Approval Case is automatically created. This represents an active approval request that tracks:

- **Current Status**: In Progress, Approved, Rejected, or Returned
- **Approval Steps**: History of decisions made by each approver
- **Next Candidates**: Who needs to act next
- **Summary Information**: Key details about the transaction requiring approval

## Getting Started

### Accessing Approval Definitions

Navigate to: **Administration → Display Customization → Approval Definition**

### Creating Your First Approval Definition

1. **Basic Information**
   - **Code**: Unique identifier for the approval definition
   - **Name**: Descriptive name (e.g., "Invoice Approval Above 10,000")
   - **Approval Entity**: Select the entity type that requires approval

2. **Approval Conditions**
   - **Use With Insert**: Apply when creating new records
   - **Use With Update**: Apply when modifying existing records
   - **Use With Delete**: Apply when deleting records
   - **Use With Budget Exceeded**: Apply when transactions exceed budget limits
   - **Apply When Query**: SQL query to determine when approval is needed

3. **Define Approval Steps**
   - Add sequential approval steps
   - Assign responsible employees or roles
   - Configure decision options (Approve, Reject, Return, etc.)

### Special Approval Options

#### Require Execution
When **Require Execution** is enabled, the system automatically adds a final execution step after all approval steps are completed. This step requires the original **Approval Initiator** (the person who created/modified the record) to confirm final execution.

::: info Execution Step Behavior
- **Automatic Addition**: System adds execution step with sequence number after the last approval step
- **Responsible Party**: Always assigned to the approval initiator (original requester)
- **Purpose**: Ensures the person who requested the approval confirms final execution
- **Use Case**: Common in scenarios where approved transactions need final confirmation before processing
:::

**Example Flow with Require Execution:**
```
1. User creates Invoice → Approval triggered
2. Manager approves → Next step
3. Finance Director approves → All approvals complete
4. System creates "Execution Step" → Assigns back to original user
5. Original user confirms execution → Document is committed
```

#### Confirm Before Starting
When **Confirm Before Starting** is enabled, the system displays a confirmation dialog before initiating the approval process. This gives users a final opportunity to review their input and cancel if they made an error.

::: info Confirmation Dialog Features
- **Tempo Language**: Use `arabicConfirmation` and `englishConfirmation` fields with Tempo template syntax
- **Dynamic Content**: Support for field references from the approved element (e.g., `{money.netValue}`, `{code}`, `{department}`)
- **User Choice**: Users can click "Confirm" to proceed or "Cancel" to abort the approval process
- **Language Support**: Displays appropriate message based on user's language preference
:::

**Example Confirmation Messages with Dynamic Content:**
```
Arabic Confirmation:
"تأكيد: هل أنت متأكد من طلب الموافقة على {entityType} رقم {code} بمبلغ {money.netValue} للقسم {department.name1}؟"

English Confirmation:
"Confirmation: Are you sure you want to request approval for {entityType} #{code} with amount {money.netValue} for department {department.name2}?"

Static Example:
Arabic: "تأكيد: هذا المبلغ كبير، هل تريد المتابعة؟"
English: "Confirmation: This is a large amount, do you want to proceed?"
```

**Available Dynamic Fields:**
- **Entity Fields**: Any field from the record being approved, by its field id (e.g., `{money.netValue}` for the net total of an invoice or order, `{customer.name1}`). Field ids are listed per screen on [dm.namasoft.com](https://dm.namasoft.com)
- **System Fields**: Built-in fields like `{code}`, `{entityType}`, `{creationDate}`
- **Related Entity Fields**: Referenced entity fields using dot notation (e.g., `{department.name1}`, `{customer.creditLimit}`)
- **Calculated Values**: Custom calculations or formatted values

#### Revise On Completion
When **Revise On Completion** is enabled, the system automatically marks the record as "revised" after the approval process is successfully completed. This provides an additional layer of data integrity and audit control.

#### Modify While Under Approval
By default, records awaiting approval cannot be edited to maintain data integrity during the approval process. However, the system provides flexible options to allow modifications under specific conditions.

**Configuration Options:**

**Allow Modify While Under Approval** (on the Approval Definition):
- When **disabled** (default): Records cannot be edited during approval process
- When **enabled**: Records can be modified based on the policy settings below

**Modify While Under Approval Policy** (Per Step):
The system supports three different policies for controlling modifications during approval:

::: info Modify Policies
1. **Allow For Authorized Users** (Default)
   - Users with `EditUnderApproval` capability can modify the record
   - Requires specific security permission
   - Most flexible option for authorized personnel

2. **Allow For Authorized And Can Approve**
   - Users must have `EditUnderApproval` capability AND be eligible to approve current step
   - More restrictive - only current step approvers can modify
   - Ensures modifications are made by those responsible for approval

3. **Prevent Modify**
   - No modifications allowed regardless of user permissions
   - Highest security level for critical approval steps
   - Overrides the definition's **Allow Modify While Under Approval** option
:::

#### Field-Level Editing Control

Beyond the **Allow Modify While Under Approval** option on the Approval Definition, the system provides granular field-level control over what can be edited during approval. This allows organizations to permit modifications to specific fields while keeping others locked.

**Configuration Options:**

**Allow Editing Fields (Per Step):**
- **Field Name**: `allowEditingFields`
- **Format**: Comma-separated list of field IDs
- **Scope**: Applies to the specific approval step
- **UI Behavior**: Only listed fields remain editable; all others are disabled

**How Field-Level Control Works:**

::: info Field Editing Logic
```
User attempts to edit field during approval:
1. Check if approval is pending
2. Check if current step has allowEditingFields configured
3. If configured:
   - Listed fields → Remain editable
   - Unlisted fields → Become disabled
4. If not configured:
   - Fall back to modifyWhileUnderApprovalPolicy
5. Apply security validation for authorized users
```
:::

#### OTP (One-Time Password) Security
The system provides enhanced security through OTP verification for approval decisions. This feature ensures that approval actions are performed by the intended person and adds an extra layer of authentication.

**Configuration Options:**

**Require OTP For All Steps** (on the Approval Definition):
- When **enabled**: All approval steps require OTP verification
- Applies to every step in the approval definition
- Overrides individual step settings

**Require OTP** (Per Step Setting):
- When **enabled**: Specific approval step requires OTP verification
- Allows selective OTP requirement for sensitive steps

#### Require All Approvers

When approval responsibilities are assigned to multiple employees simultaneously (either through employee groups, special responsibilities, or multiple candidates), the **Require All Approvers** setting controls whether ALL designated employees must approve before the step is considered complete.

**Configuration Options:**

**Require All Approvers** (Per Step Setting):
- **Field Name**: `requireAllApprovers` (يتطلب موافقة الجميع)
- **Type**: Boolean (Yes/No)
- **Default**: Disabled (any single approver can complete the step)

**How It Works:**

::: info Default Behavior (Require All Approvers = Disabled)
When **disabled** (default behavior):
- The system assigns the approval step to multiple candidates
- **Any ONE** of the candidates can approve
- Once one candidate approves, the step is considered complete
- The approval workflow proceeds to the next step immediately
- Other candidates are no longer required to act
:::

::: warning Require All Approvers = Enabled
When **enabled**:
- The system assigns the approval step to multiple candidates
- **ALL** candidates must approve before the step is complete
- Each candidate approves independently
- After each approval, the system removes that candidate from the list
- The step remains **in progress** until ALL candidates have approved
- Only after ALL approvals are received does the workflow proceed to the next step
:::

## Advanced Configuration

### Conditional Approvals

Use a [Criteria Definition](/platform/automation-and-rules/criteria-definitions) and **Apply When Query** to create sophisticated approval triggers:

```sql
-- Example on a purchase order definition: approve orders above 50,000
SELECT CASE WHEN {money.netValue} > 50000 THEN 1 ELSE 0 END
```

The names in braces are field ids of the record being approved; [dm.namasoft.com](https://dm.namasoft.com) lists them for every screen. On invoices and orders the net total is `money.netValue`. A name that is not a field of the record makes the query return 0, so the approval never starts.

### Approval Rules

Approval Rules are pre-built business logic components that automatically detect when approval is needed based on specific business conditions. These rules can be attached to approval definitions to trigger approvals for scenarios that require complex validation logic.

#### How Approval Rules Work

1. **Rule Evaluation**: When a document is saved, attached rules are evaluated
2. **Applicability Check**: Each rule determines if it applies to the current transaction
3. **Line Detection**: Rules can identify specific lines that triggered the approval
4. **Approval Triggering**: If any rule applies, the approval process starts
5. **Context Information**: The triggering lines are stored in `$map.approvalRuleLines` for use in templates

#### Available Built-in Rules

::: info Common Approval Rules
The system includes several pre-built rules for sales and purchasing scenarios:

**Sales Price Rules:**
- **BelowMinSalesPriceApprovalRule**: Triggers when selling below minimum allowed price
- **BelowDefaultSalesPriceApprovalRule**: Triggers when selling below standard price
- **AboveMaxSalesPriceApprovalRule**: Triggers when price exceeds maximum limit
- **MaxUserDiscountPercentageApprovalRule**: Triggers when discount exceeds user's allowed percentage

**Purchase Price Rules:**
- **AboveLastPricePurchasesApprovalRule**: Triggers when purchase price exceeds last purchase price


#### Configuring Approval Rules

**Step 1: Add Rules to Approval Definition**
In the approval definition, add rules in the "Rules" section:
- Select from available rules for your entity type
- Rules are evaluated in sequence
- All rules must pass for approval to be skipped

#### Using Rule Information in Templates

When a rule triggers approval, the affected lines are available in templates:

```
{if($map.approvalRuleLines)}
<h3>Lines Requiring Approval:</h3>
<table>
  <tr><th>Item</th><th>Price</th><th>Reason</th></tr>
  {loop($map.approvalRuleLines)}
    <tr>
      <td>{link($map.approvalRuleLines.item.item)}</td>
      <td>{$map.approvalRuleLines.price.unitPrice}</td>
      <td>Price below minimum threshold</td>
    </tr>
  {endloop}
</table>
{endif}
```

### Budget Exceeded Approvals

A document that would push an account over its budget can be sent for approval instead of being refused. The budget check itself belongs to the accounting module — how budgets are built, which lines are checked and how a document is matched to a budget line is on [Financial Budgets](../../modules/accounting/planning-and-commitments/financial-budgets.md). This section covers only the approval side.

What happens on an overrun is decided **per account**, by the account's **Budget Exceeded Behavior** (see [Budget control on the account](../../modules/accounting/ledger-setup/accounts.md#Budget-control-on-the-account)): **Prevent Saving** refuses the document outright, **Request Approval** sends it for approval, and **Allow** lets it through.

To make **Request Approval** work:

1. In the **accounting configuration** (not the global configuration), turn on **Enable Approvals For Budgets**. Until it is on, no account can be saved with **Request Approval** and no approval definition can be saved with **Use With Budget Exceeded**.
2. Set **Budget Exceeded Behavior** to **Request Approval** on the accounts you want to control, and mark the budget lines **Use This Budget For Validation and Approvals**.
3. Create an approval definition for the document type with **Use With Budget Exceeded** ticked — and none of **Use With Insert**, **Use With Update** or **Use With Delete**: a budget definition cannot be combined with them. The document type must be one that produces accounting effects.

The check runs when a new document is saved, or an existing one that has never been committed, and when a committed document is deleted. Nama works out the ledger lines the document would create, and if any of them takes a **Request Approval** account over budget, the document enters the approval cycle of that definition. An edit to a document that was already committed is not sent for budget approval.

### Dynamic Responsible Parties

Configure approval routing based on:

- **Organizational Hierarchy**: Supervisor approval chains
- **Department-based**: Route to department managers
- **Field-based**: Use employee fields from the transaction
- **Custom Selectors**: Advanced logic for approver selection

To send a step to a role or to "the manager of the document's branch" rather than to a named person, see [Responsibilities, Special Responsibles and Delegation](/platform/approvals/responsibilities-and-delegation).

#### Worked example: route a stock transfer to the receiving warehouse

A company runs several warehouses, each with its own **warehouse keeper**, and that keeper has a direct supervisor. It wants a stock transfer approved by the warehouse that **receives** the goods, not the one that sends them.

1. Create an approval definition for **Stock Transfer** (`StockTransfer`).
2. Add one step and set its **Responsible Type** to **From Field**.
3. In the step's field id, list the receiving side's people, separated by a comma:

```
toWarehouse.warehouseKeeper,toWarehouse.warehouseKeeper.directSupervisor
```

The request now goes to the receiving warehouse's keeper and to that keeper's direct supervisor, so each transfer follows the management line of the warehouse it lands in.

::: details JSON for direct import
```json
{
  "approvalEntity": "StockTransfer",
  "steps": [
    {
      "stepSeq": 1,
      "name1": "موافقة أمين المخزن",
      "responsible": {
        "responsibleType": "Field",
        "fieldId": "toWarehouse.warehouseKeeper,toWarehouse.warehouseKeeper.directSupervisor"
      }
    }
  ]
}
```
Open a new Approval Definition, then **More → Import Into Current Record** and paste it — see [Importing Into the Record You Have Open](/platform/import-export/importing-records.md#Importing-Into-the-Record-You-Have-Open).
:::

#### Responsible Type = Query: a fixed list from a query

Set a step's **Responsible Type** to **Query** when the approvers are best described as a filter on employees, for example everyone in one department. The step's **Query** field takes an HQL query that selects **Employee** records:

```
select e from Employee e where e.department.code = '01'
```

Every employee the query returns is a candidate for the step, plus the definition's alternates. HQL names entities and their fields (`Employee`, `e.department.code`), not tables and columns (`department_id`). The query receives no `{fieldId}` placeholders, so it returns the same people for every record; to pick approvers from the record itself, use **From Field** as in the example above.

### Alternate Approvers

The system provides flexibility by allowing alternate approvers who can act on ANY step of the approval process, regardless of the specific step assignments. This ensures approvals can proceed even when primary approvers are unavailable.

#### Types of Alternates

**1. Alternate (Single Employee)**
- **Configuration**: Select a single employee as global alternate
- **Scope**: Can approve any step in the approval process
- **Use Case**: Designate a deputy or backup approver for the entire workflow

**2. Other Alternates (Dynamic List)**
- **Configuration**: Use SpecialResponsible selectors to dynamically determine alternates
- **Scope**: Can approve any step based on dynamic criteria
- **Options**:
  - **Initiator**: The person who created/modified the document
  - **Supervisor**: Direct supervisor of the initiator
  - **Field-based**: Employees referenced in document fields
  - **Custom Logic**: Dynamic selection based on business rules

#### Difference from Fallback

::: warning Important Distinction
- **Fallback**: Only used when system cannot determine regular approver (error handling)
- **Alternate**: Always available to approve alongside regular approvers (business flexibility)
- **Other Alternates**: Dynamically determined alternates based on context
:::

#### Approval Reference Fields

The approval system provides two optional reference fields that can be used to store additional contextual information about approved records. These references help with filtering, reporting, and obtaining extra information about the approval case.

**Configuration:**

**Approval Reference 1 Source (approvalRef1Source)** and **Approval Reference 2 Source (approvalRef2Source)**:
- **Field Type**: FieldID (field selector)
- **Source**: Select any reference or generic reference field from the approved entity
- **Purpose**: Automatically populate `approvalRef1` and `approvalRef2` in the approval case
- **Availability**: Context-aware based on approval entity and "Apply Also To" settings

::: info How Reference Fields Work
1. **Configure Source**: In approval definition, select source fields from the approved entity
2. **Automatic Population**: When approval case is created, values are copied from source fields
3. **Filtering**: Use `approvalRef1` and `approvalRef2` to filter approval cases in lists
4. **Reporting**: Include references in approval reports and summaries
5. **Context Information**: Access related data without navigating to the approved record
6. **Supports Field Values Calculator Syntax** for example `sql(select entityType,id from Table where x= {y})` 
:::

**Example Use Cases:**
- **Customer Approvals**: Store customer reference for filtering customer-specific approvals
- **Department Tracking**: Link approvals to departments for departmental reporting
- **Project Association**: Track approvals by project for project management
- **Location-Based**: Filter approvals by branch or warehouse
- **Category Grouping**: Group approvals by product category or service type

#### Consider Request Date As Creation Date

By default, the system sets the record's `creationDate` when the final approval step is completed and the record is committed. However, the `considerRequestDateAsCreationDate` option changes this behavior to use the approval request date instead.

#### Approval Summary Configuration

The system can generate customized summaries for approval requests that provide approvers with essential information about what they're approving. These summaries appear in approval lists and can be included in notification emails.

**Summary Generation Options:**

**1. Default Entity Summary**
- If no custom summary is configured, the system uses the entity's built-in `summaryForApproval()` method
- Provides basic information about the record
- Standard format across all entities of the same type

**2. Custom Summary Template**
- **summaryTemplate**: Uses Tempo language to create formatted summaries
- Access to all entity fields and related data
- Flexible formatting with HTML support
- Dynamic content based on record data

**3. Query-Based Summary**
- **summaryQuery**: SQL query to gather specific data for the summary
- **summaryTemplate**: Template that processes query results
- Powerful for complex summaries requiring calculated data or aggregations

**4. Flush Before Summary**
- **flushBeforeSummary**: Forces database commit before generating summary
- Ensures all changes are persisted before summary calculation
- Required when summary depends on data that might not be saved yet
- Use only with summaryQuery

## Step-by-Step Configuration Guide

### Step 1: Define Basic Settings

| Field | Description |
|-------|-------------|
| **Approval Entity** | Type of record to approve |
| **Priority** | Processing order when multiple definitions match |
| **Use With Insert** | Trigger on new records |
| **Use With Update** | Trigger on modifications |
| **Comment Required** | Force approvers to add comments |
| **Require Execution** | Add final execution step for initiator |
| **Confirm Before Starting** | Show confirmation dialog before starting approval |
| **Revise On Completion** | Mark record as revised after approval (locks editing/deletion) |
| **Allow Modify While Under Approval** | Allow editing records during approval process |
| **Require OTP For All Steps** | Require OTP verification for all approval decisions |
| **Approve Lines** | Ask for approval on the lines that meet the definition's conditions instead of on the whole record; approvers decide on those lines |
| **Reject Line Delete It** | When the case ends approved, the lines an approver rejected are deleted from the record. Only record types that support approval per line accept it |
| **Allow Edit After Usage** | Lets you change this definition while records based on it are still waiting for approval; without it that save is refused |
| **Request Comment In Approval Links** | An approver who decides from the links in an approval e-mail is asked for a comment |
| **Ignore Usage Capability When Approving** | When an approver's decision saves the record, the approver's usage permissions on the records it refers to are not checked |
| **Remove Other Employees From approval When Escalate** | When an approver escalates the step to a specific employee, the step's other candidates are dropped, so only the escalated-to employee decides |
| **WhatsApp Message**, **WhatsApp Preferred Sender**, **Telegram Message** | Also send each approver the request over [WhatsApp](/platform/notifications/sms-and-whatsapp) or [Telegram](/platform/notifications/telegram) |
| **Fallback** | Employee to handle system errors (required) |
| **Alternate** | Employee who can approve any step |
| **Other Alternates** | Dynamic alternates (supervisor, field-based, etc.) |
| **Approval Reference 1 Source** | Source field for first approval reference (approvalRef1Source) |
| **Approval Reference 2 Source** | Source field for second approval reference (approvalRef2Source) |
| **Consider Request Date As Creation Date** | Use approval request date as record creation date |
| **Summary Template** | Tempo template for custom approval summaries |
| **Summary Query** | SQL query to gather data for summary generation |
| **Flush Before Summary** | Commit changes to database before generating summary |

### Step 2: Configure Approval Steps

1. **Add Approval Steps**
   - Step Sequence: 1, 2, 3, etc.
   - Step Name: "Department Manager Approval"
   - Required Status: All candidates must approve

2. **Assign Responsibilities**
   - **Direct Assignment**: Specific employee
   - **Role-based**: Job title or department role
   - **Dynamic**: Based on transaction data

3. **Set Decision Options**
   - **Approve**: Move to next step
   - **Reject**: Stop process and reject
   - **Return**: Send back for modifications
   - **Escalate to Supervisor**: Hand the step to the approver's **Supervisor**
   - **Escalate to Direct Supervisor**: Hand the step to the approver's **Direct Supervisor**
   - **Escalate to Specific Employee**: Hand the step to a person the approver chooses

#### Conditional (Optional) Steps

Not every approval step has to run for every record. Sometimes you want a step to appear only under certain circumstances — for example, "only ask the General Manager to approve when the invoice total is above 100,000" while smaller invoices stop at the Finance Manager. That is exactly what conditional steps are for.

Each approval step can carry its own condition through two fields:

- **Step Criteria** (معايير الخطوة): a saved Criteria Definition built with the visual criteria builder.
- **Step Apply When Query** (استعلام تطبيق الخطوة): an SQL query that returns whether the step applies to the record.

The rule is simple:

- A step whose **Step Criteria and Step Apply When Query are both empty** is a normal **mandatory** step — it always runs.
- A step that has **either** a criteria **or** a query becomes **optional (conditional)**: it runs only when its condition matches the record. When the condition does not match, the step is skipped and the workflow moves straight to the next step.
- If a step defines **both** a criteria and a query, **both must match** for the step to apply.

The condition is evaluated at the moment the workflow reaches the step, based on the record's data at that time.

```sql
-- Example on a step: only require this step when the total is above 100,000
SELECT CASE WHEN {money.netValue} > 100000 THEN 1 ELSE 0 END
```

::: tip Document is saved when a trailing optional step does not apply
When the workflow reaches the last remaining step and that step is optional and its condition is not met, there is nothing left to approve — the approval is considered complete and the document is saved, exactly as if all steps had been approved. This lets you add "extra" approval steps that only kick in for higher-risk records, while ordinary records finish as soon as their mandatory steps are done.
:::

::: warning At least one step must apply
An approval must always have something to do. If you make **every** step conditional and, for a given record, **none** of the conditions match, the system blocks the save and asks you to fix the definition — either make at least one step match the record, or leave one step's criteria and query empty so it always runs. This prevents a record from silently entering an approval that can never progress.
:::

#### Global Approval Decision Configuration

The system provides global configuration options to control which approval decisions are available in approval workflows. These settings are configured in Global Configuration and affect all approval processes system-wide.

##### Available Decision Configuration Options

| Configuration Option | Arabic Name | English Name | Description |
|---------------------|-------------|--------------|-------------|
| **useRejectDecision** | استعمال قرار الرفض | Use Reject Decision | Controls availability of "Reject" (رفض) decision option |
| **useReturnDecision** | استعمال قرار الارجاع | Use Return Decision | Controls availability of "Return" (إرجاع) decision option |
| **useEscalateToSupervisor** | استخدام قرار تصعيد إلى المدير الأعلي | Use Escalate To Supervisor | Controls availability of "Escalate to Supervisor" (تصعيد إلى المدير الأعلي) option |
| **useEscalateToDirectSupervisor** | استخدام قرار تصعيد إلى المشرف المباشر | Use Escalate To Direct Supervisor | Controls availability of "Escalate to Direct Supervisor" (تصعيد إلى المشرف المباشر) option |
| **useEscalateToSpecificEmployee** | استخدام قرار تصعيد الي موظف بعينه | Use Escalate To Specific Employee | Controls availability of "Escalate to Specific Employee" (تصعيد الي موظف بعينه) option |
| **useReturnToPreviousStep** | استخدام قرار إرجاع إلي الخطوة السابقة | Use Return To Previous Step | Controls availability of "Return to Previous Step" (إرجاع للخطوة السابقة) option |
| **useReturnToSpecificStep** | استخدام قرار الإرجاع لخطوة محددة | Use Return To Specific Step | Controls availability of "Return To A Specific Step" (إرجاع لخطوة محددة) option |

All of these options are **enabled by default** — a fresh system offers every decision until you switch one off.

##### Two Ways of Escalating Upwards

Escalating hands your step to somebody else instead of deciding it yourself, and the system offers two hierarchical routes because an employee record carries **two** separate managers:

| Decision | Reads the employee field | Typical meaning |
|---|---|---|
| **Escalate to Supervisor** (تصعيد إلى المدير الأعلي) | **Supervisor** (المدير الأعلي) | The higher manager in the organizational chain — the person above the approver's own line manager |
| **Escalate to Direct Supervisor** (تصعيد إلى المشرف المباشر) | **Direct Supervisor** (المشرف المباشر) | The line manager the approver reports to day to day |

Think of a purchase request sitting with a warehouse keeper. If the amount is unusual but routine, the keeper escalates to their **Direct Supervisor** — the warehouse manager who signs off on stock decisions every day. If the request is contentious enough that the warehouse manager shouldn't be the one to decide it, the keeper escalates to their **Supervisor** instead, jumping straight to the operations director recorded in that field.

In both cases the escalation targets the manager of **the approver who made the decision**, not the manager of whoever created the document. The escalated-to employee becomes a candidate on the same step — the workflow does not move forward a step — so once they decide, the case continues from where it paused.

::: warning The target field must be filled in
The decision fails with a message such as *"Employee X does not have a direct supervisor"* when the approver's employee record has no value in the field that decision reads. Before enabling either decision system-wide, make sure the Supervisor and Direct Supervisor fields are actually maintained on your employee records — an empty field turns the decision into a dead end for that approver.
:::

::: tip Reasons and comments cover both decisions
Approval reasons flagged **Used With Escalation** (تستخدم مع التصعيد) are offered for all three escalation decisions, and the step-level settings **Comment Required With Escalation** and **Reason Required With Escalation** apply to escalations to the Supervisor and to the Direct Supervisor alike. You do not maintain a separate reason list per escalation route.

Returning works the same way. **Return To A Specific Step** has its own step columns, **Comment Required With Returning To Specific Step** and **Reason Required With Returning To Specific Step**, and offers the approval reasons flagged **Used With Returning To Specific Step**.
:::

##### Configuration Impact

**When Decision Options are Disabled:**
- The corresponding decision will not appear in the approval dropdown
- Approvers cannot select that decision type
- Existing approval definitions that rely on disabled decisions may have limited functionality
- The system will show only the enabled decision options

**Example Scenarios:**
1. **Simplified Approval Process**: Disable "Return" and "Escalate" options to only allow "Approve" or "Reject"
2. **No Rejection Policy**: Disable "Reject" to force approvers to use "Return" for modifications instead
3. **Hierarchical Only**: Disable "Escalate to Specific Employee" to enforce strict supervisor escalation

::: warning Configuration Considerations
- Disabling decision options affects all approval processes system-wide
- Ensure that approval definitions are compatible with the enabled decision set
- Consider the impact on existing approval workflows before making changes
- Some approval processes may require specific decision types to function properly
:::

### Step 3: Notification Configuration

The messages sent to each step's approvers are set on the **Advanced** tab:

- The **Templates** group holds **Email Template**, **Approval Email Subject (With Report)**, **Notification Template** and **SMS Template**. It also has the same per-channel templates, **Copy … From** fields and preferred senders as a [notification definition](/platform/notifications/notifications-system).
- The **Mobile Apps Notifications Templates** group holds the push **Notification Title Template (Optional)** and **Notification Body Template**, plus **Do Not Send Notifications To Mobile Apps**.

To copy a step's approval e-mail to addresses outside the approver list, fill **Send Emails To Addresses** on that row of the **Steps** grid.

### Step 4: Advanced Features

#### Critical Fields
The **Critical Fields** grid at the bottom of the **Advanced** tab lists field ids. For an update, the definition applies only when one of those fields actually changed. **Skip notification when only critical fields changed** reverses that: the definition applies only when something *other* than the listed fields changed. Leave the grid empty and every update qualifies.

#### Auto-escalation
**Automatic Escalate To After Period** on the main tab takes a number and a unit. Once an approver has had a case for longer than that, a scheduled action escalates it on their behalf. Each candidate is escalated only once.

::: warning Task Schedule Required
For auto-escalation to work, you must create a **Task Schedule** with the following configuration:
- **Schedule Type**: Action
- **Class Name**: Choose one of:
  - `EAAutoEscalateApprovalToSupervisor` - Escalates to the approver's **Supervisor** (the higher manager), exactly like the **Escalate to Supervisor** decision
  - `EAAutoEscalateApprovalToFallBackEmployee` - Escalates to the **Fallback Employee** defined in the approval definition
- **Schedule Frequency**: Recommended to run every 15-30 minutes to check for overdue approvals
:::

## User Workflow

### For Transaction Creators

1. **Create/Modify Record**: Enter transaction data normally
2. **Save Record**: System checks approval requirements
3. **Approval Triggered**: If criteria met, approval case is created
4. **Notification Sent**: Approvers receive notifications
5. **Track Status**: Monitor approval progress in transaction

### For Approvers

1. **Receive Notification**: Email, SMS, or in-app alert
2. **Review Request**: Access approval details and transaction summary
3. **Make Decision**: Approve, Reject, Return, or Escalate
4. **Add Comments**: Provide reasoning for decision
5. **Submit**: Decision is recorded and workflow continues

### Approval Actions Available

| Action | Description | Next Step |
|--------|-------------|-----------|
| **Approve** | Accept the request | Move to next approval step |
| **Reject** | Deny the request | Stop workflow, notify creator |
| **Return** | Send back for changes | Allow modifications, restart approval |
| **Escalate to Supervisor** | Forward to the approver's Supervisor (the higher manager) | That manager becomes a candidate on the same step |
| **Escalate to Direct Supervisor** | Forward to the approver's Direct Supervisor (the line manager) | That manager becomes a candidate on the same step |
| **Escalate to Specific Employee** | Forward to chosen person | Specific employee approves |
| **Return To Previous Step** | Send the case back one step | The previous step's approver decides again |
| **Return To A Specific Step** | Send the case back to a step you name | That step's approver decides again |

## Actions on these screens

The decisions above are what an approver chooses. These are the buttons that get them there, and they sit on the ordinary record screens rather than on the Approval Definition itself.

- **Approve Selected Lines** — the bulk decision, offered on the list view of any entity under approval. Tick the pending rows and press it, and one dialog settles them all. Fill in what the decision needs — **Escalate To** (an employee, a security profile or an employee group), **OTP** where the step requires one, **Description** for the reasoning, and an **Approval Reason** — then press the decision itself: the dialog has an **Approve**, a **Reject** and a **Return** button. The other decisions sit behind **Other Decision**, which opens a second dialog with one button per decision. It refuses if you ticked nothing. Six of the eight decisions are offered here: Approve, Reject, Return, Escalate To Supervisor, Return To Previous Step and Escalate To Specific Employee — **Return To A Specific Step and Escalate To Direct Supervisor are only available one record at a time**, because both need you to look at the case's own step list first.
- **Revoke Approval Request** — cancels the pending approval request and takes the record back out of the workflow. It works on the record you are in, or on every row you ticked in a list.
- **Move Approvals To Delegated Employee** — on the **Delegation** screen. Save the delegation, tick the rows, and the pending approval cases belonging to the delegating employee move across to the delegate. This is the button that makes a delegation retroactive; without it a new delegation only catches cases raised after it.

## Notification System

### Notification Types

1. **Email Notifications**
   - Embedded approval links
   - Attachment support
2. **SMS Messages**
3. **In-App Notifications**
4. **Push Notifications**
   - Mobile app alerts

### Notification Templates

Templates use Tempo language for dynamic content rendering. The templates have access to the `$notificationInfo` object containing:
- `$notificationInfo.employee` - The employee who should approve
- `$notificationInfo.approvalCase` - The full approval case details
- `$notificationInfo.otp` - The approval OTP (if configured)

**Email Template Example:**
```
<h2>Approval Required: {entityType} #{code}</h2>
<p>Dear {$notificationInfo.employee.name2},</p>

<p>Please review and approve the following {entityType}:</p>
<ul>
    <li><strong>Document:</strong> {link(this)} (#{code})</li>
    <li><strong>Amount:</strong> {money.netValue}</li>
    <li><strong>Department:</strong> {department.name2}</li>
    <li><strong>Date:</strong> {$creationDate}</li>
    <li><strong>Current Step:</strong> {$notificationInfo.approvalCase.nextStepName2}</li>
</ul>

{if($notificationInfo.otp)}
<p><strong>Security Code (OTP):</strong> {$notificationInfo.otp}</p>
{endif}

<h3>Summary:</h3>
<p>{$notificationInfo.approvalCase.summary}</p>

<h3>Actions:</h3>
<table>
    <tr>
        <td>{approvelink}</td>
        <td>{rejectlink}</td>
        <td>{returnlink}</td>
    </tr>
</table>
```

**SMS Template Example:**
```
{$notificationInfo.employee.name2}: Approval needed for {entityType} #{code}
Amount: {money.netValue}
OTP: {$notificationInfo.otp}

{approvelink}
{rejectlink}
```

**In-App Notification Template:**
```
<strong>Approval Request</strong>{enter}
{entityType} #{code} requires your approval{enter}
Amount: {money.netValue}{enter}
Department: {department.name1}{enter}
{enter}
{titledlink("View Details", this)}
```

#### Available Tempo Variables for Approval Templates

::: info Context Variables
All notification templates have access to the following context objects and variables:

**Document Fields:**
- Direct field access: `{code}`, `{money.netValue}`, `{creationDate}`, etc.
- Related entity fields: `{customer.name1}`, `{department.code}`, etc.
- System fields: `{entityType}`, `{firstAuthor}`, `{currentVersion}`

**NotificationInfo Object (`$notificationInfo`):**
- `$notificationInfo.employee` - The employee who should approve
- `$notificationInfo.approvalCase` - The full approval case object
- `$notificationInfo.approvalCase.summary` - Approval summary
- `$notificationInfo.approvalCase.requestedBy` - Who requested approval
- `$notificationInfo.approvalCase.nextStepName1` - Current step Arabic name
- `$notificationInfo.approvalCase.nextStepName2` - Current step English name
- `$notificationInfo.otp` - The OTP code (if configured)
- `$notificationInfo.concernedLines` - Lines requiring approval

**Approval Action Links:**
- `{approvelink}` - Link/button to approve
- `{rejectlink}` - Link/button to reject
- `{returnlink}` - Link/button to return for modifications
- `{escalatelink}` - Link/button to escalate to the Supervisor
- `{escalatetodirectsupervisorlink}` - Link/button to escalate to the Direct Supervisor

:::

### Accessing Approval Case Data in Notification Templates

In notification templates (email, SMS, in-app notifications, etc.), you can access detailed approval case information using the `currentApprovalCase` prefix. This allows you to display approval history, previous decisions, candidate information, and OTP codes in your notifications.

#### Available ApprovalCase Fields

Access approval case information using `{currentApprovalCase.<field>}`:

**Step Information:**
- `{currentApprovalCase.$lastStep}` - The most recent approval step
- `{currentApprovalCase.$firstStep}` - The first approval step
- `{currentApprovalCase.nextStepSequence}` - Current step sequence number
- `{currentApprovalCase.nextStepName1}` - Current step Arabic name
- `{currentApprovalCase.nextStepName2}` - Current step English name

**Candidate Information:**
- `{currentApprovalCase.$firstCandidate}` - First candidate in current step
- `{currentApprovalCase.$secondCandidate}` - Second candidate
- `{currentApprovalCase.$thirdCandidate}` - Third candidate
- `{currentApprovalCase.$fourthCandidate}` - Fourth candidate
- `{currentApprovalCase.$fifthCandidate}` - Fifth candidate

**Approval State:**
- `{currentApprovalCase.state}` - Current approval state (InProgress, Approved, Rejected, Returned)
- `{currentApprovalCase.requestedBy}` - Employee who initiated the approval
- `{currentApprovalCase.requestDate}` - When approval was requested
- `{currentApprovalCase.completionDate}` - When approval was completed
- `{currentApprovalCase.summary}` - Approval summary text
- `{currentApprovalCase.approvalRef1}` - First approval reference (if configured)
- `{currentApprovalCase.approvalRef2}` - Second approval reference (if configured)

#### ApprovalCaseStep Fields

Access step details from `$lastStep`, `$firstStep`, or other step references:

- `{currentApprovalCase.$lastStep.decision}` - The decision made (Approve, Reject, Return, etc.)
- `{currentApprovalCase.$lastStep.actualResponsible}` - Employee who made the decision
- `{currentApprovalCase.$lastStep.approvalDate}` - When the decision was made
- `{currentApprovalCase.$lastStep.comment}` - Comment provided with the decision
- `{currentApprovalCase.$lastStep.approvalStepName1}` - Step Arabic name
- `{currentApprovalCase.$lastStep.approvalStepName2}` - Step English name
- `{currentApprovalCase.$lastStep.approvalReason}` - Reason for the approval (if provided)
- `{currentApprovalCase.$lastStep.escalated}` - Whether step was escalated
- `{currentApprovalCase.$lastStep.escalatedFrom}` - Who escalated it
- `{currentApprovalCase.$lastStep.escalateTo}` - Who it was escalated to

#### ApprovalCaseStepCandidate Fields

Access candidate details from `$firstCandidate`, `$secondCandidate`, etc.:

- `{currentApprovalCase.$firstCandidate.candidate}` - The employee candidate
- `{currentApprovalCase.$firstCandidate.concernedLines}` - Lines assigned to this candidate
- `{currentApprovalCase.$firstCandidate.otp}` - OTP code for this candidate (if OTP is enabled)
- `{currentApprovalCase.$firstCandidate.requestedOn}` - When candidate was assigned
- `{currentApprovalCase.$firstCandidate.escalated}` - Whether escalated to this candidate
- `{currentApprovalCase.$firstCandidate.escalatedFrom}` - Original approver who escalated
- `{currentApprovalCase.$firstCandidate.source}` - Source of responsibility assignment
- `{currentApprovalCase.$firstCandidate.responsibility}` - Type of responsibility

#### Practical Examples for Notification Templates

**Example 1: Display OTP Code**
```
{if(currentApprovalCase.$firstCandidate.otp)}
<p>Your Security Code (OTP): <strong>{currentApprovalCase.$firstCandidate.otp}</strong></p>
{endif}
```

**Example 2: Show Previous Approver's Decision and Comment**
```
{if(currentApprovalCase.$lastStep)}
<h3>Previous Approval Step:</h3>
<p><strong>Approved By:</strong> {currentApprovalCase.$lastStep.actualResponsible.name2}</p>
<p><strong>Decision:</strong> {currentApprovalCase.$lastStep.decision}</p>
<p><strong>Date:</strong> {currentApprovalCase.$lastStep.approvalDate}</p>
{if(currentApprovalCase.$lastStep.comment)}
<p><strong>Comment:</strong> {currentApprovalCase.$lastStep.comment}</p>
{endif}
{endif}
```

**Example 3: Display Escalation Information**
```
{if(currentApprovalCase.$firstCandidate.escalated)}
<p style="color: orange;">
    <strong>Note:</strong> This approval was escalated from {currentApprovalCase.$firstCandidate.escalatedFrom.name2}
</p>
{endif}
```

**Example 4: Show All Current Candidates**
```
<h3>Awaiting Approval From:</h3>
<ul>
{if(currentApprovalCase.$firstCandidate)}
    <li>{currentApprovalCase.$firstCandidate.candidate.name2}</li>
{endif}
{if(currentApprovalCase.$secondCandidate)}
    <li>{currentApprovalCase.$secondCandidate.candidate.name2}</li>
{endif}
{if(currentApprovalCase.$thirdCandidate)}
    <li>{currentApprovalCase.$thirdCandidate.candidate.name2}</li>
{endif}
</ul>
```

**Example 5: Complete Email Template with Approval History**
```
<h2>Approval Request: {entityType} #{code}</h2>
<p>Dear {$notificationInfo.employee.name2},</p>

<h3>Document Details:</h3>
<ul>
    <li><strong>Document:</strong> {link(this)}</li>
    <li><strong>Amount:</strong> {money.netValue}</li>
    <li><strong>Requested By:</strong> {currentApprovalCase.requestedBy.name2}</li>
    <li><strong>Request Date:</strong> {currentApprovalCase.requestDate}</li>
</ul>

{if(currentApprovalCase.$lastStep)}
<h3>Previous Approval:</h3>
<p>{currentApprovalCase.$lastStep.actualResponsible.name2} - {currentApprovalCase.$lastStep.decision} on {currentApprovalCase.$lastStep.approvalDate}</p>
{if(currentApprovalCase.$lastStep.comment)}
<p><em>"{currentApprovalCase.$lastStep.comment}"</em></p>
{endif}
{endif}

{if(currentApprovalCase.$firstCandidate.otp)}
<h3>Security Code (OTP):</h3>
<p style="font-size: 24px; font-weight: bold; color: #2196F3;">{currentApprovalCase.$firstCandidate.otp}</p>
{endif}

<h3>Summary:</h3>
<p>{currentApprovalCase.summary}</p>

<p>{approvelink} {rejectlink} {returnlink}</p>
```

::: tip Use Cases for currentApprovalCase
- **OTP Display**: Show one-time passwords to candidates in notifications
- **Approval History**: Display previous approval decisions and comments
- **Escalation Alerts**: Indicate when approval was escalated and by whom
- **Multi-Candidate Notifications**: Show all candidates awaiting approval
- **Audit Trail**: Include complete approval chain in email notifications
- **Context Information**: Display step names, dates, and responsible parties
:::

#### Budget-Based Approvals
```
Account Setup:
- Expense Accounts → Budget Exceeded Behavior = Request Approval
- Budget Limits → Department/Branch level allocation
- Approval Flow → Department Head → Finance Manager

Process:
Document Creation → Budget Check → Approval (if exceeded) → Commitment
```

#### Multi-criteria Approvals
```
IF (Amount > 50,000 OR Customer = "High Risk" OR Payment Terms > 60 days)
THEN Require: Credit Manager + Finance Director approval
```

## Actions History and Audit Trail

The system automatically creates detailed audit trails for all approval activities through the Actions History system. This provides comprehensive tracking of approval decisions and workflow progression.

### Default Actions History Behavior

By default, the system creates **one Actions History record** when the entire approval process is completed:

- **Action Type**: `Approval`
- **Created**: After the final approval step is finished
- **Content**: Records the completion of the entire approval workflow
- **Purpose**: Provides basic audit trail for completed approvals

### Enhanced Step-by-Step Tracking

For organizations requiring detailed audit trails, the system supports granular tracking of every approval step through the global configuration option:

**Global Configuration option**: **Add Approval Steps To Action History**

When **enabled**, this option creates an Actions History record for **each individual approval step**:

::: info Enhanced Tracking Features
- **Individual Step Records**: Separate audit entry for each approval decision
- **Decision Types Tracked**:
  - `Approve` - When a step is approved
  - `Reject` - When a step is rejected
  - `Return` - When returned for modifications
  - `Return To Previous Step` - When handed back one step
  - `Return To A Specific Step` - When handed back to a named step
  - `Escalate To Supervisor` - When escalated to the approver's Supervisor
  - `Escalate To Direct Supervisor` - When escalated to the approver's Direct Supervisor
  - `Escalate To Specific Employee` - When escalated to a chosen employee
- **Final Completion Record**: Still creates the standard `Approval` record when workflow completes
- **User Context**: Captures who made each decision and when
:::

## Common configuration traps

### An update approval on a document will not save

Ticking **Use With Update** on a definition for a document — a stock transfer, an invoice — is refused when the definition is saved:

*Update approval can not be used with documents, can be used with documents only* — «لا يمكن استعمال "مع التعديل" مع المستندات - تستعمل مع الملفات فقط»

Update approvals are meant for master files. This is deliberate: editing a document after it has been approved invites manipulation, so the normal route is to reverse the document and issue a new one. When a genuine business case needs approvals on document edits, switch on this Global Configuration option first:

<GlobalConfigOption option-code="value.info.allowApprovalsOnDocumentsUpdate" />

::: tip Locking approved records instead
If what you actually want is to stop people changing a document once it is approved, you do not need an update approval at all: tick **Prevent Edit After Approval** (and, for deletion, **Prevent Delete After Approval**) on the security profile's lines or in the user's settings.
:::

### A purchase invoice asks for approval again when a receipt is saved

With an update approval on the purchase invoice, saving a **stock receipt** or a **receipt additional costs** document linked to that invoice raises a fresh approval request on the invoice. Those documents write back to the invoice — they update its received quantities and its cost distribution, and make it re-save its other linked receipts — so to the approval engine it looks like an edit.

These saves are made by the system, not by a user, and the record carries a flag saying so. Make the definition ignore them by putting this in its **Apply When Query**:

```sql
select case when {$systemIsCommiting} = 1 then 0 else 1 end
```

The approval still fires when a user edits the invoice directly, and no longer fires when a receipt updates it.

## Messages you may see

Refusals raised while a record is in an approval cycle:

| Message | Why | What to do |
|---|---|---|
| *Can not edit while under Approval* — «لا يمكن التعديل أثناء الموافقات» · *Can not edit while under Approval for step {0}* — «لا يمكن التعديل أثناء انتظار الموافقة للخطوة {0}» | The record has an open approval case and you do not hold the edit-under-approval capability, or the step's policy forbids it. | Finish or cancel the approval, or use **Allow Modify While Under Approval** with the right per-step policy and the capability. |
| *The employee {0} can not approve the step {1} in record {2}, so he also can not edit while under approval* — «الموظف {0} لا يمكنه الموافقة على  الخطوة {1} في السجل {2} لذلك لا يمكنه التعديل أثناء انتظار الموافقة» | The step's policy is **Allow For Authorized And Can Approve**, and this person is not an approver of the step currently waiting. | Let one of that step's approvers make the change, or relax the policy to **Allow For Authorized Users**. |
| *Object is in approval cycle, can not commit any new changes unless approval is finished* — «السجل بانتظار موافقة. لا يمكن حفظ أي تعديلات إلى أن يتم انهاء الموافقات» | A commit was attempted on a record whose approval is still open. The variant ending *…but you can save it as draft* means the draft route is still available. | Wait for the decision, or save as a draft where the message offers it. |
| *Object is in approval cycle, can not delete unless approval is finished* — «السجل بانتظار موافقة. لا يمكن الحذف إلى أن يتم انهاء الموافقات» | Deleting a record with an open approval case. | Complete or cancel the approval first. |
| *Record {0} is being approved* — «السجل {0} خاضع لموافقة حاليا» | Revising or a similar operation was attempted mid-cycle. | Wait for the approval to finish. |
| *Current user can not delete {0} after approval* — «لا يمكن للمستخدم الحالي حذف {0} بعد الموافقة» | The record is approved and your security profile does not allow deleting approved records. | Ask someone whose profile permits it, or cancel the record instead of deleting it. |
| *Reject can be used only with documents and requests - use Return with master files* — «يمكن استعمال الرفض مع المستندات و الطلبات فقط - في الملفات قم باستعمال قرار الإرجاع» | **Reject** was pressed on a master file. | Use **Return** — master files are handed back, not rejected. |

Refusals raised while saving the Approval Definition itself:

| Message | Why | What to do |
|---|---|---|
| *Approval definition must at least have one step* — «تعريف سير العمل يجب أن يحتوي على خطوة واحدة على الأقل» | The steps grid is empty. | Add a step. |
| *Must specify when to use the approval. (with insert, delete, update, etc)* — «يجب تحديد حالة علي الأقل يتم استخدام سير العمل معها (عند الانشاء أو الحذف ... إلخ)» | None of the *use with* switches is ticked, so the definition would never fire. | Tick at least one of insert, update, delete and the rest. |
| *Duplicate step sequence : {0}* — «مسلسل خطوة مكرر : {0}» | Two steps carry the same sequence number. | Renumber one of them. |
| *Update approval can not be used with documents, can be used with documents only* — «لا يمكن استعمال "مع التعديل" مع المستندات - تستعمل مع الملفات فقط» | **Use With Update** is ticked on a definition for a document. | See [An update approval on a document will not save](#An-update-approval-on-a-document-will-not-save). |
| *Approval Definition priority repeated before in definition {0}* — «أولوية تعريف سير العمل مكررة مسبقا في تعريف آخر {0}» | Another definition for the same entity already uses that priority, so the order between them would be undefined. | Give this one a different priority. |
| *Modify while under approval policy should be {0} or empty, as allow modify while under approval is not checked* — «سياسة التعديل أثناء الموافقة يجب أن تكون {0} أو فارغة لأن اوبشن التعديل أثناء الموافقة غير مفعل» | A per-step modify policy was chosen while the global **Allow Modify While Under Approval** is off. | Enable the global option, or clear the step's policy. |
| *You must enable the option {0} in accounting configuration to be able to use the option {1}* — «يتوجب عليك تفعيل الأوبشن {0} في إعدادات الحسابات حتي تتمكن من استعمال الأوبشن {1}» | **Use With Budget Exceeded** is ticked while **Enable Approvals For Budgets** is off in the accounting configuration. | Turn the option on in the accounting configuration, or untick **Use With Budget Exceeded**. |
| *You can not select the field {0} and also any of the fields {1},{2},{3}, please unselect these fields* — «لا يمكنك التعليم علي الحقل {0} و أي من الحقول {1},{2},{3} في نفس الوقت. يرجي ازالة العلامة من تلك الحقول» | **Use With Budget Exceeded** is ticked together with insert, delete or update. | Keep a separate definition for the budget approval. |
| *The entity type {0} can not be used with budget approval because it does not generate an accounting request.* (English only — the product has no Arabic for it) | The definition, or its **Apply Also To** list, names a type that never produces accounting effects, so it can never go over a budget. | Remove that type from the budget definition. |
