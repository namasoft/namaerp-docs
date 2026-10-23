---
description: "The Performance and Search tab of System Settings: query time limits, per-user usage limits, and the settings that control how searching behaves."
entities: [ConfigEntry]
menu: Administration → Settings → System Settings
---

# Performance and Search

Two related concerns live on this tab. The first is protecting the server from work that will never finish: query time limits and per-user caps. The second is how searching behaves, which is both a usability question and — because of how databases use indexes — a performance one.

![Performance and Search tab](../../ar/platform/global-config/images/gc-performance-en.png)

## Query time limits

Each of these caps how long one kind of query may run before it is abandoned. They exist because a single badly written filter can otherwise occupy a database connection indefinitely and slow the system for everyone.

**Max Minutes To Execute SqlField Query** `value.info.maxMinutesToExecuteSqlFieldQuery` — Ceiling in minutes for an SQL field query.

**Max Seconds To Execute SqlField Query** `value.info.maxSecondsToExecuteSqlFieldQuery` — The same limit expressed in seconds, for finer control.

**Max Seconds To Execute User Timed Queries** `value.info.maxSecondsToExecuteUserTimedQueries` — For queries users schedule themselves.

**Max Seconds To Execute Dashboard Query** `value.info.maxSecondsToExecuteDashboardQuery` — For dashboard widgets. Worth setting fairly low: a dashboard is meant to load at a glance, and a widget that takes half a minute is broken whether or not it eventually returns.

**Max Seconds To Execute List View Queries** `value.info.maxSecondsToExecuteListViewQueries` *(default 300)* — For list views.

**Max Seconds To Execute Reference Suggestion Queries** `value.info.maxSecondsToExecuteListPageQueries` *(default 300)* — For the suggestions a reference field looks up while the user types or searches in it.

**Max Seconds To Execute Report Queries** `value.info.maxSecondsToExecuteReportsQueries` — For report queries. This is usually the most generous of the set, since a heavy month-end report legitimately takes minutes.

**Warn About SQL Statements Taking more than (milliseconds)** `value.info.logSqlStatementsTakingMS` *(2000 when empty)* — Any database statement slower than this is added to the list under **Utilities → View SQL Statements With Excessive Time**, once per statement, with its longest run time and how many times it ran. This is the setting to reach for when the system "feels slow" and nobody can say where: lower it for a day, read the list, then put it back. The list is kept in memory, so it starts empty after every restart — see [When the System Is Slow](/admin/troubleshooting/system-is-slow).

## Usage limits

**Maximum Records Per Page For List Views when using All** `value.info.maxRecordsPerPageForListViews` — Caps how many records a list shows when the user picks *All* as the page size. Without it, someone will eventually ask for fifty thousand rows in one page. A user's own settings, or their security profile, can set a different cap for them; and a user cannot be given *All* as their default page size while this is empty.

**Max Concurrent List View Operations Count Per User** `value.info.maxListViewCountPerUser` *(default 20)* — How many list-view loads one user may have running on the server at the same moment. A user who goes past it is refused until some of them finish.

**Max Concurrent List Page Matching Operations Count Per User** `value.info.maxListPageMatchingRefCountPerUser` *(default 10)* — The same cap for reference-field lookups: how many one user may have running at once.

**Maximum Export Count** `value.info.maxExportCount` *(default 2)* — How many exports one user may have running at the same time; a further export is refused until one finishes. The same field in a user's own settings overrides this for that user.

**Count Number Of Prints Per User** `value.info.countPrintsPerUser` — Changes how reprints are counted. Normally a record that has been printed once counts as printed for everyone, so the next print by anyone needs the **Print More Than Once** permission and counts toward the print limit. With this on, only the current user's own earlier prints of that record count.

**prevent User To Run Same Report Multiple Times** `value.info.prevUserToRunSameRepMultipleTimes` — Stops a user launching a report again while their previous run of it is still going. This one solves a real and common problem: a slow report appears to hang, the user clicks again, and now two copies compete for the same database. The same option exists in a user's settings and in a security profile, so it can be applied to some users only.

## Search behaviour

**Code Search Operator** `value.info.codeSearchOperator` *(default Contains)* — How a search on the code field is matched: **Contains**, **Starts With** or **Ends With**.

**Name 1 Search Operator** / **Name 2 Search Operator** `value.info.name1SearchOperator`, `value.info.name2SearchOperator` *(both default Contains)* — The same for the Arabic and English name fields.

::: tip Starts With is dramatically faster
*Contains* cannot use a database index — the server has to read every row and inspect the text. *Starts With* can, and on a table with millions of records the difference is between an instant answer and a visible wait. If searching has become slow as your data grew, switching code to *Starts With* is usually the single most effective change available on this screen.
:::

::: info The same choice, one lookup at a time
The three operators above apply to every search in the system. When only one master file is heavy enough to matter, the search operator can be set on that reference field alone in [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-reference-lookups) — which is also where you add extra columns and extra codes for a lookup to search in, so users can find a customer by phone number or tax number rather than by name.
:::

**Smart Arabic Search In Contains** `value.info.smartArabicSearchInContains` *(default on)* — Arabic is written inconsistently: أ, إ, آ and ا are typed interchangeably, as are ة and ه, and ى and ي. With this on the system expands those letters to their variants, so a user searching for محمد finds محمد however the name was originally typed. Almost always worth keeping on for Arabic data.

**Search With Connected Names In References** `value.info.searchWithConnectedNamesInRefs` — Reference suggestions also match against related record names, so typing a customer's name can find the contract that belongs to them.

**Show "Search In" For Top Panel** `value.info.showSearchInForTopPanel` — Adds the "search in" entity selector to the top search bar, letting the user narrow a global search to one kind of record.

**Must Select Entity In "Search In" Before Search On Server** `value.info.mustSelectEntityInSearchInBeforeSearchOnServer` — Requires the user to pick an entity there before any server search runs. On a large database this prevents an unfocused search from scanning everything. It depends on the option above — the system refuses to save it without the selector being shown, and says so.

**Ignore Word Order In Search** `value.info.ignoreWordOrderInSearch` — Normally the text a user types has to appear in the record exactly as typed and in that order, so a search for محمد أحمد finds nothing when the customer was entered as أحمد علي محمد. Turn this on and the typed text is split into words: a record matches when it contains all of them, in any order. It applies to reference lookups and to searching the code and name fields in lists. This is worth having wherever names are long and inconsistently ordered — Arabic personal names above all, where the same person is filed differently by different people.

::: warning It does not make searching faster
Matching words in any order still cannot use a database index; the server reads every row exactly as it does for *Contains*. If searching is slow this is not the fix, *Starts With* above is. And a search operator set on one reference field in [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-reference-lookups) still overrides this.
:::

## Settings on this tab

Every field on this tab with its exact on-screen label in both languages, so you can find a setting by the name you see. The last column points to the section that explains it.

| Field id | English label | Arabic label | Meaning |
|---|---|---|---|
| `value.info.maxMinutesToExecuteSqlFieldQuery` | Max Minutes To Execute SqlField Query | اقصى مدة بالدقائق لتنفيذ استعلام الحقول المحسوبه | [Query time limits](#Query-time-limits) |
| `value.info.maxSecondsToExecuteSqlFieldQuery` | Max Seconds To Execute SqlField Query | اقصى مدة بالثواني لتنفيذ استعلام الحقول المحسوبه | [Query time limits](#Query-time-limits) |
| `value.info.maxSecondsToExecuteUserTimedQueries` | Max Seconds To Execute User Timed Queries | اقصى مدة بالثواني لتنفيذ الاستعلامات الدورية | [Query time limits](#Query-time-limits) |
| `value.info.maxSecondsToExecuteDashboardQuery` | Max Seconds To Execute Dashboard Query | اقصى مدة بالثواني لتنفيذ استعلام اللوحات | [Query time limits](#Query-time-limits) |
| `value.info.maxSecondsToExecuteListViewQueries` | Max Seconds To Execute List View Queries | اقصى مدة بالثواني لتنفيذ استعلامات عرض القوائم | [Query time limits](#Query-time-limits) |
| `value.info.maxSecondsToExecuteListPageQueries` | Max Seconds To Execute Reference Suggestion Queries | اقصى مدة بالثواني لتنفيذ استعلامات عرض اقتراحات المراجع | [Query time limits](#Query-time-limits) |
| `value.info.maxSecondsToExecuteReportsQueries` | Max Seconds To Execute Report Queries | اقصى مدة بالثواني لتنفيذ استعلامات التقارير | [Query time limits](#Query-time-limits) |
| `value.info.logSqlStatementsTakingMS` | Warn About SQL Statements Taking more than (milliseconds) | Warn About SQL Statements Taking more than (milliseconds) | [Query time limits](#Query-time-limits) |
| `value.info.maxRecordsPerPageForListViews` | Maximum Records Per Page For List Views when using All | اقصي عدد من السجلات عند عرض الكل في القوائم | [Usage limits](#Usage-limits) |
| `value.info.maxListViewCountPerUser` | Max Concurrent List View Operations Count Per User | اقصي عدد مرات اجراء عرض بقائمة للمستخدم الواحد خلال نفس الوقت | [Usage limits](#Usage-limits) |
| `value.info.maxListPageMatchingRefCountPerUser` | Max Concurrent List Page Matching Operations Count Per User | Max Concurrent List Page Matching Operations Count Per User | [Usage limits](#Usage-limits) |
| `value.info.maxExportCount` | Maximum Export Count | الحد الأقصى لعدد مرات التصدير | [Usage limits](#Usage-limits) |
| `value.info.countPrintsPerUser` | Count Number Of Prints Per User | احتساب عدد مرات الطباعة لكل مستخدم | [Usage limits](#Usage-limits) |
| `value.info.prevUserToRunSameRepMultipleTimes` | prevent User To Run Same Report Multiple Times | منع المستخدم من تشغيل نفس التقرير مرتين في نفس الوقت | [Usage limits](#Usage-limits) |
| `value.info.codeSearchOperator` | Code Search Operator | معامل البحث في الكود | [Search behaviour](#Search-behaviour) |
| `value.info.name1SearchOperator` | Name 1 Search Operator | معامل البحث في الاسم العربي | [Search behaviour](#Search-behaviour) |
| `value.info.name2SearchOperator` | Name 2 Search Operator | معامل البحث في الاسم الإنجليزي | [Search behaviour](#Search-behaviour) |
| `value.info.smartArabicSearchInContains` | Smart Arabic Search In Contains | استعمال البحث الذكي للغة العربية | [Search behaviour](#Search-behaviour) |
| `value.info.searchWithConnectedNamesInRefs` | Search With Connected Names In References | البحث في المراجع بالاسم متصل | [Search behaviour](#Search-behaviour) |
| `value.info.showSearchInForTopPanel` | Show "Search In" For Top Panel | عرض حقل "البحث في" | [Search behaviour](#Search-behaviour) |
| `value.info.mustSelectEntityInSearchInBeforeSearchOnServer` | Must Select Entity In "Search In" Before Search On Server | يجب اختيار ملف أو مستند في البحث في قبل البحث على الخادم | [Search behaviour](#Search-behaviour) |
| `value.info.ignoreWordOrderInSearch` | Ignore Word Order In Search | تجاهل ترتيب الكلمات عند البحث | [Search behaviour](#Search-behaviour) |
