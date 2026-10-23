---
description: "Answers to common Entity Flow questions: setting a generic reference field, fixing doubled accounting effects, deleting related documents with a purchase invoice, adding a bank charges effect, fetching selling and last purchase prices, calculating the warehouse, and saved records that skip approval."
entities: [EntityFlow]
menu: Administration → Display Customization → Entity Flow
---
# Entity Flow FAQ

## How can I set a value in a generic reference field when saving inside an entity flow? I tried:

```groovy
details.ref1='MCI0001'
```

I set the required type in [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-reference-lookups), but the value is not saved. I also tried setting the type and code together like this:

```groovy
details.ref1.entityType='PurchaseElement'
details.ref1='MCI0001'
```

Or on two lines:

```groovy
details.ref1.entityType='PurchaseElement'
details.ref1.code='MCI0001'
```

But when opening the reference in the system, it is not displayed correctly. What is the correct way to assign this type of field?

---

### Answer:

When working with generic reference fields (which accept references from more than one table and are displayed in the UI by selecting the type then the code), you must fill them in one integrated step — not by setting the type and code separately.

The recommended approach is to use the `ref` function as follows:

```groovy
details.ref1=ref('PurchaseElement', 'MCI0001')
```

You can also use a SQL query that returns the type and code or the ID, such as:

```groovy
details.ref1=sql(select 'PurchaseElement', 'MCI0001')
```

Or:

```groovy
details.ref1=sql(select entityType, id from PurchaseElement where code = 'MCI0001')
```

If you must use the approach that sets the type and code manually, you also need to set the ID so the system can identify the reference correctly:

```groovy
details.ref1.entityType='PurchaseElement'
details.ref1.code='MCI0001'
details.ref1.id='0xFFFF00018C21ED75F9000100FF1573C6'
```

However, this approach is complex and not recommended unless absolutely necessary. It is always better to use `ref` or `sql` for readability and to ensure the reference works correctly.

::: tip Summary
This question explains how to correctly assign a value to a generic reference field (`ref`) in an entity flow,
especially when the reference can point to multiple entity types.

It clarifies that you must set both the type and the code together using `ref()` or `sql()` instead of assigning them separately.
:::

## Fixing Doubled Accounting Effects Caused by Using the Wrong Field

In one scenario within a `CPAProjectInvoice` document, an entity flow was set up to calculate a commission for each line of the document by:

* Copying the `n2` value from the project in the line into the `details.n3` field
* Calculating the commission percentage by multiplying this value by the `totalActualValue` field in the document header, then storing the result in `details.n4`:

```
details.n3=details.project.n2
details.n4=sql(select {details.n3} * {totalActualValue} / 100)
```

The `details.n4` value was then used to add an accounting effect via the [`EAAddAccountingEffect`](/entity-flows/accounting/EAAddAccountingEffect) flow as follows:

```
details.n4=DrEffect,CrEffect
```

### Root Cause

The value in `totalActualValue` represents the sum of the `details.price.actualValue` field across all lines. Multiplying it by each line individually caused the final accounting effect value to be doubled.

### Correct Solution

Instead of using `totalActualValue` from the header, use the `actualVal` value specific to each line to calculate the commission accurately:

```
details.n4=sql(select {details.n3} * {details.price.actualVal} / 100)
```

### Full Corrected Flow

::: details Copy and use in Direct Import Menu Item

```json
{
    "targetType": "CPAProjectInvoice",
    "targetAction": "UpdateCalculatedFields",
    "details": [
        {
            "className": "com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator",
            "title1": "First",
            "parameter1": "details.n3=details.project.n2\ndetails.n4=sql(select {details.n3} *{details.price.actualVal}/100)",
            "targetAction": "UpdateCalculatedFields",
            "description": "Sets fields from one field to another.\nParameter 1: fields Map. Format as follows:\nwarehouse=book.ref1\nname1=code\nField Value can be another field id, \"quoted string\",sql(select max(n1) from InvItem where id <> {id})\ncustomer.runCommand=\"edit\"\ncustomer.runCommand=\"save\"\n"
        },
        {
            "className": "com.namasoft.modules.accounting.domain.utils.actions.EAAddAccountingEffect",
            "title1": "Effects: fieldId=DebitEffectAccSideCode,CreditEffectAccSideCode eg:\nn1=N1EffectDR,N1EffectCR\nlines.n2=DetailsN2EffectDR,DetailsN2EffectCR",
            "parameter1": "details.n4=DrEffect,CrEffect",
            "title2": "Apply When Query (Return 0 or 1), example:\nselect case when {lines.ref1.entityType} in ('Branch','Department') then 1 else 0 end\nThis example will make the effect happen only for lines ref1 being a branch or a department",
            "targetAction": "Automatic",
            "description": "Add Extra Effect to Any Document File existing ledger request."
        }
    ]
}
```

:::

With this correction, the accounting effect is calculated accurately for each line individually without doubling.

## Automatically Deleting Related Documents When Deleting a Purchase Invoice

In some cases, a client may require that a related document (such as a payment voucher) be automatically deleted when another document (such as a purchase invoice) is deleted. This can be implemented through an entity flow, but the following limitations must be noted.

### The Challenge

If a payment voucher was automatically created based on the purchase invoice, deleting the invoice will fail by default, because the system prevents deleting documents that are linked to other documents. As a result, **the delete flow in the entity flow will not execute**.

### Proposed Solution 1: Use a Button to Delete the Related Document

The preferred approach is to create a manual action on the purchase invoice screen to delete the related document (such as the payment voucher), and then let the user delete the invoice in the normal way.

#### Example entity flow that deletes the related payment voucher:

::: details JSON for direct import

```json
{
  "details" : [ {
    "className" : "com.namasoft.infor.domainbase.util.actions.DeleteRelatedEntityAction",
    "title1" : "Target Type",
    "parameter1" : "PaymentVoucher",
    "title2" : "Finder SQL. eg: select id from CreditNote where ref5Id={id}",
    "parameter2" : "select id from PaymentVoucher where fromDoc_id = {id}",
    "targetAction" : "Manual",
    "description" : "Delete Generated Entity from another entity, should be used in combination with EAGenerateEntityFromEntityAction"
  } ]
}
```

:::

::: warning
  This flow will not run automatically when the invoice is deleted unless there is no constraint preventing the invoice from being deleted (such as approvals or other relationships). It is therefore preferable to use this flow only in a manual button.
:::

### Proposed Solution 2: Change the Execution Point in the Entity Flow

If there are no approvals or constraints on deleting the invoice, the delete flow can be bound to the `PreValidateOnDelete` point so that it executes **before** the actual deletion attempt. However, in this case there is still a possibility that the system will prevent the deletion because the related document exists.


## Adding a Bank Charges Entry in a Receipt Voucher Without Using a Payment Method

### Scenario

A client wants to record **bank charges** inside a receipt voucher, but **without using a payment method**, and instead wants to enter the value manually in a custom numeric field (such as `n1`).

### Recommendation

It is always better to use a **payment method** to record bank charges, as it provides greater flexibility in distribution, ratios, and linking to accounts in a systematic and direct way.

However, if it is necessary to avoid using a payment method, this can be achieved through an **entity flow** using the action:

### EAAddAccountingEffect

#### Example entity flow to add an accounting effect based on the `n1` field:
::: details JSON for direct import
```json
{
  "targetType": "ReceiptVoucher",
  "details": [
    {
      "className": "com.namasoft.modules.accounting.domain.utils.actions.EAAddAccountingEffect",
      "title1": "Effects: fieldId=DebitEffectAccSideCode,CreditEffectAccSideCode eg:\nn1=N1EffectDR,N1EffectCR\nlines.n2=DetailsN2EffectDR,DetailsN2EffectCR",
      "parameter1": "n1=BankExpensesDebit,BankExpensesCredit",
      "title2": "Apply When Query (Return 0 or 1), example:\nselect case when {lines.ref1.entityType} in ('Branch','Department') then 1 else 0 end\nThis example will make the effect happen only for lines ref1 being a branch or a department",
      "title3": "ShortenLedger (true,false)",
      "parameter3": "true",
      "title4": "Currency Field  (optional)",
      "parameter4": "amount.value.currency",
      "title5": "Rate Field (optional)",
      "parameter5": "amount.rate",
      "targetAction": "Automatic",
      "description": "Add Extra Effect to Any Document File existing ledger request."
    }
  ]
}
```
:::

### Parameter Explanation:

* `parameter1`: Links the `n1` field to the accounting entry (debit and credit) using effect codes such as `BankExpensesDebit` and `BankExpensesCredit`.
* `parameter3`: When set to `true`, the system shortens the journal and does not display details if not required.
* `parameter4` and `parameter5`: Used to set the currency and conversion rate when needed.

::: tip
You can change the field name `n1` and the codes `BankExpensesDebit` and `BankExpensesCredit` according to the actual settings in the system.
:::

## How can I create an entity flow that fetches the item's selling price from the price list and stores it in the `n1` field within the lines of a stock supply order?

You can implement this request by using an **entity flow** of type [`EAFieldsValuesCalculator`](/entity-flows/core/EAFieldsValuesCalculator) with the `itemprice` function from the `tempo` library, as follows:

```
details.n1=tempo({itemprice(itemIdOrCode=details.item.item)})
```

### Component Explanation:

* `details.n1`: The field where the price extracted from the price list will be stored.
* `tempo(...)`: This function evaluates the expression inside it using the Tempo engine.
* `itemprice(...)`: This function fetches the item's selling price from the price list.
* `itemIdOrCode=details.item.item`: Refers to the code or ID of the item in the supply order line.

Please ensure that this flow is added to the "Stock Supply" document type and activated with the appropriate action, such as before updating calculated fields.

## I am trying to create an entity flow that automatically calculates the warehouse field, but the code I wrote did not work. Why?

**Answer:** When using the following statement:

```
details.specificDimensions.warehouse=sql(select case when {details.item.item.section.code} = '1' then 'W-MG' else  warehouse_id end from SrvJOrderMaterialLine where SrvCJobOrder_id = {ref1.$toReal.id} and {details.item.item.id} = material_id)
```

Two problems occurred:

1. **Ambiguous value type:**
   In the `case when` statement, you returned an identifier (`'W-MG'`) in one branch, and in the other branch you returned the `warehouse_id` field directly. This made it difficult for SQL Server to determine the required value type (is it text or an ID?). This mixing causes the execution to fail.

2. **No results from the table:**
   If there is no row in the `SrvJOrderMaterialLine` table that meets the filter criteria, the entire query will return no value, and therefore no warehouse will be assigned to the line.

**Solution:**
Use a `sub-query` correctly inside the `else` branch of `case when` to ensure the query always returns a value (even if `null`) rather than returning nothing at all.

Corrected syntax:

```ini
details.specificDimensions.warehouse=mlsql(
  select case 
    when {details.item.item.section.code} = '1' 
    then 0xffff00019247e58188000000ff09aee9 
    else (select warehouse_id from SrvJOrderMaterialLine where SrvCJobOrder_id = {ref1.$toReal.id} and {details.item.item.id} = material_id) 
  end
)endmlsql
```

This way, the statement is guaranteed to always return a single logical value that SQL Server can handle, and it ensures that the query does not fail if there are no matching rows in the table.

## I want to fetch the last purchase price of an item into the `details.n2` field

The easiest way to achieve this is to use the following syntax:

```ini
details.n2=sql(select top 1 cast(l.unitPrice as decimal(20,2)) lastPrice from PurchaseInvoiceLine l where l.item_id = {details.item.item.id} order by l.valueDate desc)
```

If you want to fetch the last purchase price on a date before the current document's date:

```ini
details.n2=sql(select top 1 cast(l.unitPrice as decimal(20,2)) lastPrice from PurchaseInvoiceLine l where l.item_id = {details.item.item.id} and l.valueDate <= {valueDate} order by l.valueDate desc)
```

## My flow saves another record with `runCommand="save"`, but that record has an approval definition and it never goes to approval. Why?

`runCommand="save"` saves the record the way a background business action does: it commits directly and never consults approval definitions. That is what you want for most automation, but it also means a customer or document that would normally wait for a manager's approval when saved from the screen is saved as final by the flow.

Use `runCommand="saveConsideringApprovals"` instead. It runs the same save path as the edit screen: approval definitions are checked, and when one applies the record goes to approval instead of being saved as final. The "this record will go to approval" confirmation the screen normally asks for is answered automatically, and the flow step itself still finishes successfully.

```ini
customer.runCommand="edit"
customer.description1="Updated from the invoice"
customer.runCommand="saveConsideringApprovals"
```

If the flow saves the record it is running on, and you trigger it manually, you do not need `runCommand` at all: check **Requires Commit On Manual** in the flow header, and add **Consider Approvals On Commit On Manual** to get the same approval-aware behaviour. See [Saving the record after a manual run](./introduction-to-entity-flows#Saving-the-record-after-a-manual-run).
