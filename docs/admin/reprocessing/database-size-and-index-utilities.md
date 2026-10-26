---
description: "Utilities that shrink a Nama database and remove wasted indexes: narrowing the 255-byte reference columns older versions created, replacing the over-wide origin indexes, and dropping duplicate indexes, with their dry runs, apply buttons and the support-team login they need."
---

# Database Size and Index Utilities

Databases that were created by older versions of Nama carry a few leftovers that make them bigger and slower than they need to be. Nothing is wrong with the data — every document, balance and report is correct — but the same data takes more disk, more memory and more time to read. The three utilities on this page find those leftovers and repair them from inside the application, with no script to run by hand.

Think of it as repacking a warehouse whose shelves were built too deep: the stock does not change, but once the shelves are the right size the same stock fits in a smaller room and is quicker to reach.

| Leftover | What it costs | Utility |
|---|---|---|
| Reference columns created 255 bytes wide instead of 16 — the branch, department, sector, analysis set, legal entity, author and capability columns of tables created between 2018 and 2022, and the system entry column of most tables | Up to 2,390 wasted bytes on every row of every affected table; on a large header table that can mean one row per database page | [Reference Column Narrower](#Reference-Column-Narrower) |
| The three origin indexes on the transaction line tables, built over 17 columns instead of one | Three large copies of the same data per table, none of which helps the lookups they exist for | [Origin Indexes Fixer](#Origin-Indexes-Fixer) |
| Indexes that another index on the same table already covers | Disk space, and slower saving, for an index the database never needs | [Duplicate Index Finder](#Duplicate-Index-Finder) |

You rarely have to go looking: when a database still needs the first two, the [critical errors](/admin/troubleshooting/critical-errors#Database-schema-fixes-Namasoft-support-only) shown at login say so — to the Namasoft support team only.

## How these utilities behave

All three work the same way, so it is worth knowing the pattern once.

**Opening one changes nothing.** The link opens a report: what it found, how much space is involved, and the exact database statements it would run. Any administrator can open the report as often as they like.

**Applying needs the support team's login.** The buttons that change the database — **Narrow**, **Fix all indexes**, **Drop selected** and the like — appear only for an administrator who signed in through the Namasoft CRM, the QR login the support team uses. Anyone else sees the report with a note instead of the buttons, and an apply link opened by anyone else is refused with:

*Changing the database schema needs an admin user logged in through the Namasoft CRM* — «تغيير هيكل قاعدة البيانات يتطلب مستخدم مدير مسجل الدخول من خلال نظام CRM الخاص بنماسوفت»

On a test server running in debug mode any administrator may apply.

**Every apply button asks first.** It says what the change locks and asks you to confirm. Take a backup and run these outside working hours: while a table is being changed, users who need it wait.

**They run as jobs you can follow and stop.** A run shows its progress and log as it goes, and the report links to the job progress page, where a running job can be stopped. A stop takes effect at the next safe point — between two tables or two indexes — so whatever was finished stays finished and nothing is left half done. Only one of these jobs runs at a time.

**Check again afterwards.** When a run finishes, its page offers **Check again**, which opens the report fresh. The matching critical error is refreshed at the same moment, so it disappears once nothing is left to fix.

## Reference Column Narrower

Every record in Nama is linked to others — its branch, its department, the user who created it — through 16-byte reference columns. Older versions created some of those columns 255 bytes wide: the nine dimension, author and capability columns of every table created between June 2018 and September 2022, and the system entry column of almost every table. The extra 239 bytes are always zeros. The database still has to store them, read them, and keep them in memory.

<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.util.jpa.dynamicschema.ReferenceColumnNarrower"/>

The report lists every table that still has a wide column, smallest first, with its row count, data size, the columns involved and how many megabytes of zero padding they hold. From there the support team can:

- **Narrow** one table, or **Narrow all tables** — change the wide columns to 16 bytes. Each table is handled in one step: the indexes that use the columns are dropped, the columns are narrowed, the indexes are created again. If anything fails, that table is rolled back unchanged and the run moves on.
- **Narrow and rebuild** one table, or all of them — the same, then rebuild each table. This is the option that actually gives the space back: narrowing alone makes the columns smaller, but the rows stay where they are on disk until the table is rebuilt.

::: warning Run it off-hours, and watch the transaction log
Each table is locked for reading and writing while it is narrowed, which takes minutes on a large table. A rebuild also writes roughly the table's size to the transaction log, so on a database in full recovery mode take log backups during a long run, or the log file will grow by the size of the data.
:::

How much comes back depends on how many rows the affected tables have. On a large, long-running database expect a few percent of the data size; after the rebuild the database file keeps its size but has that much more free space inside it.

## Origin Indexes Fixer

Every inventory, cost and ledger transaction line remembers which document, transaction and line it came from, and three indexes — on the origin, the origin transaction and the origin line — make those lookups fast. Tables created since an earlier framework upgrade got each of those three indexes over 17 columns instead of one: three identical, very large indexes per table that all start with the wrong column and cannot speed up the lookups they were created for. The application's normal start-up check cannot repair them, because the index names are right.

<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.util.jpa.dynamicschema.OriginIndexesFixer"/>

The report lists each wrong index with its table, the columns it covers, its size and the statements that replace it. **Fix all indexes** builds the correct one-column index under a temporary name, drops the wide one and gives the new one its name, one step at a time. Where another index already starts with the right column, the wide one is simply dropped. A run that is stopped or interrupted leaves at most a temporary index behind, and the next run finishes the job from there.

On SQL Server Enterprise and Developer editions the new indexes are built while users keep working. On Standard edition building an index blocks saving to that table until it finishes, so run it outside working hours.

## Duplicate Index Finder

Over the years an installation collects indexes that another index on the same table already serves: exact duplicates, an index whose columns are just the beginning of a longer one, or the same columns with fewer extras. Each one costs disk space and slows every save to its table, and helps nothing. Primary keys, clustered indexes and filtered indexes are never suggested.

<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.util.jpa.dynamicschema.DuplicateIndexFinder"/>

Because deciding which index to drop needs a developer's judgment, this one is a round trip:

1. **On the customer's server**, open the report. It lists the candidates and offers them as a file to download.
2. **The development team** reviews the file, marks the indexes to drop, and loads it back on the same page on any server. The page turns the marked entries into a single drop link and shows the statements it stands for.
3. **The support team** opens that link on the customer's server. Opening it checks every entry again and changes nothing; adding `;execute=true` to the end of the link drops the entries it lists as *would drop*. An index is dropped only if it still exists exactly as it was in the report, another index still covers it, and the application does not declare it (it would be created again at the next start).

Logged in through the CRM, the support team can also tick indexes in the report itself and drop them with **Drop selected**, under the same checks.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Changing the database schema needs an admin user logged in through the Namasoft CRM* — «تغيير هيكل قاعدة البيانات يتطلب مستخدم مدير مسجل الدخول من خلال نظام CRM الخاص بنماسوفت» | An apply link or button was used by an administrator who did not sign in through the Namasoft CRM. | Leave it to the support team, who sign in through the CRM and apply it off-hours. |
| *{0} tables ({1} MB) still have 255-byte reference columns, run the utility {2} off-hours* — «يوجد {0} جدول ({1} ميجابايت) ما زالت أعمدة المراجع فيها بطول 255 بايت، يرجى تشغيل الأداة {2} خارج أوقات العمل» | A critical error, shown only to the support team: the database still has wide reference columns. | Run the [Reference Column Narrower](#Reference-Column-Narrower), with the rebuild, outside working hours. |
| *{0} origin indexes still cover more columns than they should, run the utility {1} off-hours* — «يوجد {0} فهرس أصل ما زال يشمل أعمدة أكثر من اللازم، يرجى تشغيل الأداة {1} خارج أوقات العمل» | A critical error, shown only to the support team: the database still has the 17-column origin indexes. | Run the [Origin Indexes Fixer](#Origin-Indexes-Fixer) outside working hours. |

## Related pages

- [The Utilities Catalog](/admin/reprocessing/utilities-catalog.md)
- [Suggest Indexes for Large Detail Tables](/admin/reprocessing/suggest-index-creation.md)
- [Database Related Operations](/admin/reprocessing/db-operations.md)
- [When the System Is Slow](/admin/troubleshooting/system-is-slow.md)
