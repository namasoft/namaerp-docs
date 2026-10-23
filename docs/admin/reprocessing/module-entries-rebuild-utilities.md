# Rebuilding Module System Entries

Several modules keep a running history beside their documents: who owns each property unit, whether a unit is rented or free, which state each employee is in, how much vacation balance each employee has, which status each customer car has reached, and what each fixed asset is worth. That history is written as **system entries** when a document is committed, and screens and reports read the entries rather than going back through every document.

When the entries drift from the documents — after an SQL repair, an upgrade that changed how they are calculated, or documents deleted outside the application — the utilities on this page throw the entries away and write them again from the committed documents, in date order. Each one is limited to its own module and its own entries; none of them touches the ledger or stock.

::: danger Rebuilds empty the table first
Every utility here starts by deleting the entries it is about to rebuild. If it stops halfway, the history is incomplete until it is run again to the end. Take a backup, run it outside working hours, and on a large database expect it to take hours.
:::

## Before you run any of them

The same rules apply as for the [batch utilities](/admin/reprocessing/batch-utilities-from-file.md#Before-you-run-any-of-them): only the `admin` user or a user with **Allow Access to Admin Restricted Functionality (utils.html, kill tasks, logout users and so on)** can open the links, any file path is a path on the application server, and each link is built with the launcher described under [Launcher links on these pages](/admin/reprocessing/#Launcher-links-on-these-pages). The page shows *Done on* and the date when the run finishes.

## Real estate

### Reapply Real Estate Sales Contracts System Entries

Deletes all property ownership entries and writes them again from every committed **Opening sales doc**, **Sales Contract** and **Waiver Document**, oldest first. Run it when a unit shows the wrong owner — sold but still listed as available, or owned by the buyer of a contract that was later waived. The whole rebuild is one step: if any document fails, nothing is saved and the entries stay deleted until the cause is fixed and the utility is run again. Safe to run again.

<UtilityLinkBuilder
className="com.namasoft.modules.realstate.domain.utils.RESalesSysEntryMigratorUtility"/>

### Reapply Rent Contracts System Entries

Deletes all rental-status entries and writes them again from every committed **Rent Contract**, **Cancel Contract**, **Opening rent contract** and **Rent offer**, oldest first. Run it when a unit's rental status is wrong — shown as rented after its contract was ended, or free while a contract is running. It can be stopped as a running task; a stopped run leaves the history incomplete, so run it again to the end. Safe to run again.

<UtilityLinkBuilder
className="com.namasoft.modules.realstate.domain.utils.UpdateREReservationEntryUtil"/>

Other real-estate repairs — installment payments, collections — are queries on [Real Estate Utilities](/admin/reprocessing/real-estate-utilities.md).

## Human resources

### Recreate Employee State System Entries

Writes the employee state history again from every committed **Job Offer**, **Work Starting Document**, **Employement Information**, **ChangeEmployeeState**, **Update Employee Info**, **Vacation Document**, **Evacuation Party Document** and **Firing Document**. Run it when an employee's state on a given date is wrong — still working after a firing document, or on vacation after returning. Each document type is processed as one step, and the first document that fails stops the run. Safe to run again.

<UtilityLinkBuilder
className="com.namasoft.modules.humanresource.domain.entities.utils.MigrateEmpStateEntry"
/>

### Recreate Employee Vacation System Entries

Rebuilds the vacation balance of each employee from that employee's documents — the **Opening Vacation Balance Document**, **Vacation Document**, **Work Starting Document**, **Vacation Changing Document**, **Vacation Compensation**, **Update Employee Info**, **Firing Document**, **Suspension Document**, **Dues Liquidation Document** and **Holidays And Rest Days Balance Compensation Document**. Run it when balances on the vacation screens and reports disagree with the documents. ([Vacation Types and Balances](/modules/hr/vacations/vacation-types-and-balances.md) explains where a balance comes from.)

Employees are processed one at a time, each on its own: an employee whose documents fail is skipped with the reason, and the run carries on. When it finishes, the page lists every employee that failed. Safe to run again. Choose the form that fits:

- **All employees:**

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  />

- **Working employees only** — skips employees whose state is dismissed, resigned or pensioned:

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForWorkingEmps"
  />

- **All employees, resumable** — every employee the run has dealt with is written to the file, and a later run with the same file skips them. Use it on a large company where the run may be interrupted:

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Processed Employees File', default: 'e:/rc/processed-employees.txt' }
  ]"
  />

  ::: warning An employee that failed is in the file too
  The file records every employee the run reached, including those listed as failed at the end. After fixing their documents, rebuild them with the **specific employees** form below — a resumed run would skip them.
  :::

- **All employees, resumable, from a date** — keeps everything before the date and rebuilds only from it onwards (the date is written `yyyyMMdd`, for example `20260101`). Use it when the balances were right up to a known date:

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Processed Employees File', default: 'e:/rc/processed-employees.txt', id:'file' },
  { title: 'Start From Date', default: 'yyyyMMdd', id:'date' }
  ]"
  />

- **Specific employees** — employee codes separated by `-`:

  <UtilityLinkBuilder
  className="com.namasoft.modules.humanresource.domain.entities.utils.VacationsSysEntryMigratorForAllEmps"
  :params="[
  { title: 'Employee Codes', default: 'E001-E002-E003', id:'codes' }
  ]"
  />

Only one vacation rebuild runs at a time, whichever form it was started with.

## Service center

### Recreate Sub Item Status Entries

Deletes all status-movement entries of the customer cars (sub items) and writes them again from every committed document of each type that had produced such entries, oldest first, 100 documents at a time. Run it when a car's status, or its status history, is wrong — after changing the [Car Status Configurations](/modules/servicecenter/cars-setup/car-status-configurations.md), for example. Safe to run again.

The file is required. Before deleting anything, the utility writes into it the list of document types that have entries; a second run reads that list back, so if the first run stopped after the entries were deleted, the second still knows which documents to replay. Keep the file between runs.

<UtilityLinkBuilder
className="com.namasoft.modules.srvcenter.domain.utils.SubItemStatusSysEntryRecalculateUtil"
:params="[
{ title: 'Types To Process File', default: 'e:/rc/toProcessTypes.txt', id:'file' }
]"
/>

## Fixed assets

These rebuild each asset's location and properties history — cost, additions and deductions, accumulated depreciation, current value, last depreciation date — from every committed **Fixed Asset Opening Document**, **Fixed Asset Purchase Document**, **Fixed Asset Letter of Credit cost**, **Transfer document**, **Asset addition deduction**, **Fixed Asset Properties**, **Depreciation Document**, **Prevent Assets Depreciation Document**, **Fixed assets disposal document** and **Fixed Asset Partial Disposal Document**, oldest first. They first reset those values on the asset cards to zero and delete the entries, then replay the documents 100 at a time. Only one of them runs at a time.

- **Recreate all fixed asset entries.** Rebuilds the history and leaves the depreciation values on the documents as they are. Run it when an asset card's values or location disagree with its documents. Safe to run again.

  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil"
  />

- **Recreate all entries and recalculate depreciation installments.** As above, and also recalculates the depreciation values on the documents and regenerates the accounting effect of every depreciation document.

  ::: danger Depreciation values WILL change
  Every depreciation document is recalculated with today's rules and creates a new journal entry. Agree the result with the customer's accountant before running it on a closed year.
  :::

  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationUtil"
  />

- **Recalculate, and remove assets that are in prevent-depreciation documents.** As the previous one, and also removes from the documents being replayed any asset that a **Prevent Assets Depreciation Document** excludes from depreciation.

  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryAndRecalcDepreciationAndRemovePreventedAssetsUtil"
  />

- **Specific assets only.** Recreates the entries of the listed assets and leaves every other asset alone. The assets are given by their record IDs (not their codes), separated by `-`.

  <UtilityLinkBuilder
  className="com.namasoft.modules.fixedassets.domain.utils.SWSUpdatePropertyEntryUtil"
  :params="[
  { title: 'Asset IDs', default: 'ffff01-ffff02', id: 'ids' }
  ]"
  />

SQL repairs for the same module are on [Fixed Assets Utilities](/admin/reprocessing/fixed-asset-utilities.md).

## Related pages

- [Batch Utilities That Work From a List File](/admin/reprocessing/batch-utilities-from-file.md)
- [Approval Repair Utilities](/admin/reprocessing/approval-repair-utilities.md)
