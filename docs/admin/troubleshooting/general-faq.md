
# General FAQ

Answers to recurring support questions that do not belong to one screen: a blank error when searching with the lens, granting permissions on all record types at once, installing SQL Server on new SSDs, adding the discussion panel to a screen, and several error messages with their fixes.

<ServerBaseURL/>

### When Searching for Documents via the Lens, a Blank Error Sometimes Appears
This can be resolved by setting an appropriate number in `MaxRecordsPerPageForListViews` inside Global Configuration.
<GlobalConfigOption option-code="value.info.maxRecordsPerPageForListViews" />

##  How Can Permissions Be Assigned to All Record Types in Nama ERP in a Flexible and Fast Way Without Adding a Row for Each Type?

✅ **Answer:**

In Nama ERP, you can assign permissions to records using one of the following options within each permission row:

1. **A single specific type** (e.g., "Customer").
2. **A type list** containing more than one type.
3. **Both options together**.

Depending on what you specify, the permissions in that row apply to:

* The type only.
* Or the type list only.
* Or both together.

You can also leave **both the type field and the type list field empty**, in which case the permissions apply to **all screens** in the system.

🔽 **How the system selects the appropriate row when applying permissions:**

When a screen is opened (e.g., the Customer screen), the system searches for the most appropriate row based on the following **priority order**:

1. A row containing the **specific type** (e.g., "Customer").
2. If not found, it searches the **type list** for a row containing the "Customer" type.
3. If not found, it searches for a **general row** (containing no type and no type list).

Once the first matching row is found according to the order above, the system stops searching and applies only that row's permissions.

::: tip Note on Additional Temporary Permissions:

* The **broadest permission** (the one granting more access) is selected.
* But the **row priority order** still applies:

    * If "Save Only" permission is assigned to the "Customer" type,
    * And "Save and Edit" permission exists in a general row or a type list row,
    * Then the "Save Only" row takes priority because it is more specific according to the priority order.
:::

## SQL Server Installation problem related to block size on new M2 SSDs (especially on new hetzner servers)
* Refer to [this article](https://learn.microsoft.com/en-us/troubleshoot/sql/database-engine/database-file-operations/troubleshoot-os-4kb-disk-sector-size?tabs=PowerShell)
* You will need to completely uninstall 
* Then run the following command in PowerShell 
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\stornvme\Parameters\Device" -Name   "ForcedPhysicalSectorSizeInBytes" -PropertyType MultiString        -Force -Value "* 4095"
```
::: warning
Remember, PowerShell not command prompt

The window should be blue, not black
:::
* Restart the server
* Then install SQL Server again

## How Can the Discussion Screen Be Added to a Specific Screen
This can be done through [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-record-behaviour).
<NamaOptionURL entityType="GenericReferenceOverrider" new-mode optionCode="addDiscussionTo.addToPage" link-title="addDiscussionTo"/>

1. You can add the discussion to any screen in the system through the "Add Discussion To" table found in Fields and Entities Settings.
::: tip You Can Control the Fields Shown in Discussions
You can control which fields appear in the discussion screen by editing the screen - "Edit Discussion Fields" block:
  - Remove the Discussion field
  - Remove Attachment 1 - 2 - 3 - 4
  - Remove Reference 1 - 2
:::

::: warning The Discussion Appears After Saving, Not Before
The discussion screen only appears on saved records - when creating a new record before saving, discussions are not shown.
:::

## When Opening the Item Transactions Screen, an Error Appears
`Can not find Field getter method : userQty.measures.clippedHeight1`
::: details Full Log Details
```
com.namasoft.infra.domainbase.util.NaMaBusinessLogicExeption: Can not find Field getter method : userQty.measures.clippedHeight1 
	at com.namasoft.infra.domainbase.metadata.EntityReflection.getFieldValue(EntityReflection.java:292) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.metadata.EntityReflection.getDirectFieldValue(EntityReflection.java:174) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.objectListToTabularResults(Lister.java:308) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getQueryListFromDB(Lister.java:232) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getListFromDB(Lister.java:338) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:150) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:207) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.listFlat(Lister.java:830) ~[service-base-0.0.1-SNAPSHOT.jar:?]
```
:::

The cause of the problem is a field that was removed from the system still appearing in the list view.
The solution is to perform a RegenUI from the screen editing options.

## When Opening the Translation Override Screen or Any Other File, the Error Message "Operation Could Not Be Executed" Appears

::: details Error Details from the Log

```log
org.hibernate.query.sqm.PathElementException: Could not resolve attribute 'valueDate' of 'com.namasoft.modules.basic.domain.entities.TranslationOverRider'
	at org.hibernate.query.sqm.SqmPathSource.getSubPathSource(SqmPathSource.java:95) ~[hibernate-core-6.5.2.Final.jar:6.5.2.Final]
	...
	at com.namasoft.infra.domainbase.persistence.util.PersistenceUtility.getJoin(PersistenceUtility.java:138) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.util.PersistenceUtility.getPath(PersistenceUtility.java:109) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.SearchQueryUtils.convertColumnsToSelectionsAndAddJoins(SearchQueryUtils.java:117) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.GenericRepoImpl.countTabularResults(GenericRepoImpl.java:389) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.GenericRepoImpl.tabularListPage(GenericRepoImpl.java:304) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.DecoratedGenericRepo.tabularListPage(DecoratedGenericRepo.java:151) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.infra.domainbase.persistence.repos.Persister.tabularListPage(Persister.java:456) ~[domain-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getPropertyListFromDB(Lister.java:523) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.getListFromDB(Lister.java:336) ~[service-base-0.0.1-SNAPSHOT.jar:?]
	at com.namasoft.commonservices.utils.Lister.list(Lister.java:150) ~[service-base-0.0.1-SNAPSHOT.jar:?]
```

:::

### Explanation

This error most commonly occurs when a screen of type "For All Screens" or "All Files" is edited and the `valueDate` column is added to the columns displayed in the list table.

However, the `valueDate` field (actual date) exists only in vouchers (such as invoices or receipts) and is not present in files (such as translation override files).
Therefore, when attempting to load a list that includes this column for a file that does not support it, the problem occurs.

### Solution

Remove the `valueDate` column from the visible columns in this general modification (For All Screens or All Files), or specify the screen type precisely so that this modification is not applied to files that do not contain this field.

## Opening a Fixed Asset Expense Document Fails with "Could not perform the action."

The screen refuses to open with *Could not perform the action.* — «لم يمكن تنفيذ العملية», and the server log shows:

```log
Could not extract column [19] from JDBC ResultSet [The conversion from nvarchar to NCLOB is unsupported.]
```

The remarks columns of the fixed-asset line tables are still the old fixed-length text type on this database, while the application now reads them as long text. Widening them fixes it:

::: details SQL to widen the remarks columns to NVARCHAR(MAX)
```sql
ALTER TABLE FACustodyScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOrderScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOfferScheduledPay ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAInitialReceiptScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAOpeningDocumentScheduleLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAInitialReceiptLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOfferLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchaseOrderLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAPurchOrderReqLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FALcExpenseLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FALCScheduledPayLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAReceiptDocLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FAScheduleTemplateLine ALTER COLUMN remarks NVARCHAR(MAX);
ALTER TABLE FATakingActualLine ALTER COLUMN remarks NVARCHAR(MAX);

ALTER TABLE CustodyCustodianLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyDeliveryLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyDeliveryEmpLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyTransferFromLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodyTransferToLine ALTER COLUMN remark NVARCHAR(MAX);
ALTER TABLE FACustodianLine ALTER COLUMN remark NVARCHAR(MAX);
```
:::

## Warnings When Logging Into the System

The red list of messages that greets some users at login is the **critical errors** list — health
checks the server runs on itself. Every check it can raise, what causes it and what to do about it,
including the fiscal-year processing option, the notification limit and the backup folder, is on its
own page: [Critical Errors at Login](/admin/troubleshooting/critical-errors).

## I Want to Make a Text Field Convert to a Link So I Can Enter a Website URL, with a Button Appearing Next to the Field That Opens the Link When Clicked

To achieve this in Nama ERP, you can use the following table:

### Table: `Text Fields Converted to Links`

Table code: `textToLinkFields`
Located inside [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-field-appearance), which is also where a text field can be made to dial a phone number or open an e-mail instead of a web page.

- Setup method:

* Add a new record in the table.
* Specify the name of the field that contains the link (e.g., `details.text1` or `description2`).
* You can specify:

  * **Type**: such as `SalesInvoice` or `Customer`
  * Or **Entity Type List**: to apply it to more than one type
* Or leave both fields empty, in which case the conversion will be applied to this field on all screens where it appears.

- Result:

* A button will appear next to the text field.
* When clicked, the link stored in the field will open in a new window.
