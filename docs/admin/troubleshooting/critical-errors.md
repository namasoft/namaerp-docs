---
description: "The critical errors list shown at login: how it is built and refreshed, who sees it, how to post your own message to users, and every health check with its cause and fix."
---
# Critical Errors at Login

A user signs in and, before anything else, a stack of red messages appears: *There are 3 failed
requests…*, *Backup folder … does not exist…*, *Database transaction isolation level is not
correct…*. Nothing the user did caused them, and nothing they can do will make them go away.

This is the **critical errors** list: a set of health checks the server runs on itself and shows to
whoever logs in. It is the closest thing Nama has to a dashboard warning light, and it is usually
the first thing pasted into a support ticket. Everything on the list is real, every entry has a
cause you can find, and most of them are somebody's configuration rather than a fault in the
product.

::: info These are not refusals
A critical error never blocks a save. It is a statement about the server, not about the record in
front of you. Refused saves are a different family entirely —
[Messages and Refusals](/platform/documents-and-records/messages-and-refusals).
:::

## How the list behaves

**It is built once and then cached.** The checks are expensive — they count rows, read folders, ask
the database about itself — so the server works the list out once and hands the same list to every
login afterwards. That is why correcting the problem does not clear the message.

**Four things rebuild it:**

- **Once an hour**, automatically. The schedule can be changed with the
  `critical-errors-refresh-cron` key in `nama.properties`.
- **On demand**, from **Utilities → Caching → Refresh Critical Errors** — the "Refresh Critical Errors"
  the troubleshooting answers ask for. Like the rest of the Utilities page, it needs the `admin` user or a
  user with **Allow Access to Admin Restricted Functionality**; the same link opened directly
  (<NamaURL url="utils?refreshcriticalerrors=true"/>) also needs such a session.
- **From a scheduled task**, with the
  [EARefreshCriticalErrors](/entity-flows/core/EARefreshCriticalErrors) action — the way to make the
  refresh part of a nightly routine.
- **Whenever a business request fails or succeeds**, for the failed-requests count only. That one
  number keeps itself current; everything else waits for a refresh.

**It is shown at login, at most three times per session.** The list is pushed at the user the moment
they sign in. If they dismiss it, it will come back at most twice more in that browser session and
then stop, so "the message disappeared" does not mean "the problem was fixed".

## Who sees it

Not everybody, by design — a shop floor of cashiers does not need to know about the isolation level.
The list is hidden from a user in either of two ways:

- **Do Not Display Critical Errors To This User** (عدم إظهار الأخطاء الحرجة لهذا المستخدم) on the
  user's own settings, or
- **Do Not Display Critical Errors** (عدم إظهار الأخطاء الحرجة) on their
  [security profile](/platform/security/security-profiles), which hides it from a whole role at once.

The `admin` user is the exception: it may not be shielded from them. Trying to save that
configuration on `admin` is refused with *You can not disable critical errors for administrator*.

::: warning Switching the checks off is not the same as answering them
`disable-critical-errors` in [nama.properties](/getting-started/nama-properties) turns the whole
mechanism off, and a single check can be silenced with a key of its own. Both exist for servers where
a particular check is genuinely meaningless — a managed database whose backups Nama cannot see, for
instance, which has a supported option of its own. Reach for them last, and never for the backup
check just because it is inconvenient.
:::

## Posting your own message to a customer's users

Support sometimes needs to tell everybody at a site something — a planned outage, a data-correction
campaign, "do not enter invoices on the old book". A file called `critical-error-messages.txt` in the
server's working folder does exactly that: every line in it becomes an entry on the critical errors
list, translated like any other message. A long message can be split over several lines by ending
each one with a backslash. Remove the file and, at the next refresh, the messages disappear.

## The checks, one by one

### Server and database

| Message | What raised it | What to do |
|---|---|---|
| *Database transaction isolation level is not correct, please contact our support team and provide them the following message: TIL is {n}* | The database is not running in read-committed-snapshot isolation. Nama needs it; without it, readers and writers block each other and the whole system feels slow. English only. | A DBA change on the database, not in Nama. The number in the message tells support which level it found. |
| *The background processor is not working, please check the server* | The thread that processes business requests is not alive. Nothing will be recorded in the ledger or the warehouse until it is back. English only. | The most urgent entry on this page. Check the server log for the failure that killed it, and restart the application server. |
| *Folder {0} is almost full, remaining space is less than {1} GB* | A folder being watched for free space fell below the threshold. Which folders and which threshold come from **Check The Following Folders for Empty Space (CSV)** and **Warn Users When Empty Space Is Less Than (GB)**; with nothing configured it watches the system drive. English only. | Free space, or point the watch at the right folders: <GlobalConfigOption option-code="value.info.foldersToCheckSpace" /> |
| *Tomcat logs folder is {0} MB, please review and clean up old log files* | The application server's log folder passed 6 GB. Nama deletes the Windows service wrapper's own logs older than five days by itself, but nothing else in that folder. English only. | Clear out the old logs, and set log rotation on the application server. |
| *You did not define server id in global configuration, all e-mail, SMS, and Mobile Push notifications will be postponed.* | **Send Mails And SMS Only From Servers (CSV)** is empty. It names which server instance is allowed to send messages, so that a test copy of the database does not e-mail real customers — and while it is empty, nothing is sent at all. English only. | Fill it with this server's id: <GlobalConfigOption option-code="value.info.sendMailsAndSMSOnlyFromServers" /> |

### Backups

Three messages come from one check — the one that makes sure a fresh database backup actually
exists:

- *Backup folder is not configured in general settings, please fill the Backup Folder field* — «لم يتم تحديد مجلد النسخ الاحتياطي في الإعدادات العامة، برجاء تعبئة حقل مجلد النسخ الاحتياطي»
- *Backup folder {0} does not exist or is not accessible* — «مجلد النسخ الاحتياطي {0} غير موجود أو لا يمكن الوصول إليه»
- *There is no backup file from today or yesterday in the backup folder {0}* — «لا توجد نسخة احتياطية بتاريخ اليوم أو الأمس في مجلد النسخ الاحتياطي {0}»

Each links straight to the setting it is about, so clicking the message opens Global Configuration with
the **Backup Folder** field in focus:
<GlobalConfigOption option-code="value.info.backupFolder" />

**What the check looks for.** Nama reads the folder named in **Backup Folder**, plus up to two levels
of sub-folders beneath it, and looks for a file ending in `.bak` or `.dbak` that is either named with
today's or yesterday's date in `YYYYMMDD` form, or was last modified since the start of yesterday. If
it finds one, nothing is raised.

**What to do about each one:**

1. **The first** — the field is empty. Open the **Attachments and Storage** tab of Global Configuration
   and fill in **Backup Folder** with the path the backup job writes to.
2. **The second** — the path is filled in but the server cannot reach it. The path is resolved by the
   application server, not by your own machine: check the spelling, and for a network share check
   that the Windows account the server runs as can open it.
3. **The third** — the folder is reachable but holds nothing recent. This is the one that matters:
   it usually means the backup job itself stopped running or started failing. Check the SQL Server
   maintenance plan (or whichever tool takes the backups) and read its history, then confirm it
   writes into this folder with a `.bak` or `.dbak` extension.

::: danger Do not silence this one lightly
The third message is exactly the warning you want on the day a server dies. Treat it as a broken
backup until you have proven otherwise — do not switch the check off to make it go away.
:::

Some sites back up in a way the server cannot see — a storage snapshot, a managed cloud database, an
agent that ships files off the machine. There the check has nothing to find and would raise a
permanent false alarm, so turn it off deliberately with:
<GlobalConfigOption option-code="value.info.doNotCheckForBackupExistence" />

Both settings are described in
[Attachments and Storage](/platform/global-config/global-config-attachments#Database-backup).

### Processing and housekeeping

| Message | What raised it | What to do |
|---|---|---|
| *There are {0} failed requests, please contact our support team and provide them the following message: SYSFRQS is {1}* — «يوجد {0} مستندات فشلت معالجتها. يرجي التواصل مع الدعم الفني و ابلاغهم بالخطأ التالي: SYSFRQS is {1}» | Business requests are sitting in *Failed* or *Failed By Exception*. Documents were saved and their effects never happened. | Open the [Business Requests](/platform/background-processing/business-requests) list view, filter by status, read the error on the row, then **More → Reprocess**. The count refreshes itself as the failures clear. |
| *There are {0} user notifications which exceeds the limit of {1}, this may affect system performance. Please review and clean up old notifications* | The notification table passed its limit — 10,000 unless **Max User Notification Count** says otherwise. A very large table slows the system for everyone. English only. | Delete the old ones, and set up a scheduled task so it does not come back (below). Or raise the limit: <GlobalConfigOption option-code="value.info.maxUserNotificationCount" /> |
| *There is no next normal fiscal period, please define one* — «لا توجد فترة محاسبية عادية تالية للفترة الحالية , برجاء تعريفها» | There is no normal fiscal period starting the day after the current one ends. **The check only runs in December**, as a reminder to open next year before anybody needs it. | Create the next fiscal year and its periods. |

To keep notifications from piling up again, create a scheduled task of type *Action* that deletes
them by age. This one runs every night at 02:30 and removes everything older than 25 days:

```json
{
  "scheduleType" : "Action",
  "scheduleInfo" : {
    "timeMinute" : "30",
    "timeHour" : "2"
  },
  "hourInfo" : {
    "runOnHour0230" : true
  },
  "sendAsMail" : true,
  "className" : "com.namasoft.infor.domainbase.util.actions.EADeleteNotificationsByDuration",
  "title1" : "Duration Days (default is 25 days)",
  "title2" : "Delete Type (all, readonly) - Default is all",
  "actionDescription" : "Deletes notifications older than specified number of days. Delete type: 'readonly' deletes only viewed notifications, 'all' deletes all notifications."
}
```

**Duration Days** is the age in days; **Delete Type** is `all` (the default) or `readonly`, which
deletes only notifications the user has already seen.

### Dangerous options that were left switched on

Some options exist for a one-off recovery and are dangerous to leave on. Nama watches four of them
and complains for as long as they are enabled. All of these appear in English only.

| Message | What raised it | What to do |
|---|---|---|
| *There are fiscal years with AllowCostProcessingWithClosingEntry set to TRUE* | At least one fiscal year has **Allow Cost, Quantity, and Ledger Processing For Documents Before Closing Entry** ticked. By default Nama refuses to change entries dated before the closing entry; with this on, it allows them — which silently changes the financial statements of a closed year. | Open **Fiscal Years**, untick it on every year that has it, save, then refresh the critical errors. Leave it off except during a deliberate, approved correction. |
| *The option {0} in {1} config is enabled, it should be disabled. Please contact our support team.* | One of the reprocessing-before-closing-entry options in Global Configuration, or **Allow Changing Cost And Qty Tracking After Usage** / **Allow Overdraft In Stock Transfers** in the supply-chain configuration, is on. The message names the option and the configuration, and links to it. | Follow the link, turn the option off, refresh. If it was turned on for a recovery, this message is the reminder to turn it back off afterwards. |
| *Debt ages processing of document {0} had to {1} {2} rows; its account/subsidiary debt ages history is huge and slows the ledger queue - consider stopping debt ages tracking for it* | One document's debt-age history is so large that processing it is holding up the ledger queue for everybody. | Consider switching debt-ages tracking off for that account or subsidiary — see [Accounts](/modules/accounting/ledger-setup/accounts). |

### Supply chain and cost

| Message | What raised it | What to do |
|---|---|---|
| *There are inconsistent transfer costs, please contact customer support - THIS IS URGENT* | A consistency check over transfer costs found a mismatch. Checked only where costing is not FIFO. English only. | This one is meant for us, not for the site: it says the cost data itself is wrong, and it needs a cost reprocessing run decided by support. Raise it. |
| *The columns currentNetCost and currentNetQty have errors, please contact customer support - THIS IS URGENT* | The running cost and quantity totals do not agree with the movements behind them. Nama asks for a repair of the quantity side by itself unless that has been switched off. English only. | Raise it with support; do not run cost utilities on a hunch. |
| *There are failed stock ages tasks, please contact customer support* | A stock-ages task ended in *Failed*. Stock-age reports will be wrong or empty until it is re-run. English only. | Look at the failed task, fix the cause, run it again. |
| *There are {0} expired sales price list lines for more than {1} days, please review them* — «يوجد {0} سطور قوائم أسعار مبيعات منتهية منذ أكثر من {1} يوم. يرجى المراجعة» | More than a thousand price-list lines expired longer ago than the configured number of days. Large dead price lists slow pricing down. | Delete or archive the old lines. The threshold is **Number of Days of Expired Price List to Show Critical Errors After Them** — see [Pricing and Price Lists](/modules/supplychain/configuration/pricing-and-price-lists); a negative value switches the check off. |
| *You need to recommit the receipt additional cost document {0} because it contains an old bug* | A named receipt-additional-cost document was created by an old version whose distribution is known to be wrong. English only. | Open the document named in the message and recommit it. |

### Point of sale and e-commerce

| Message | What raised it | What to do |
|---|---|---|
| *There are {0} documents type {1} with Errors. Please fix them.* — «يوجد عدد مستندات {0} من النوع {1} بها أخطاء. يرجى معالجتها.» | Point-of-sale documents are sitting as drafts. The POS keeps a document that fails validation as a draft rather than losing the sale, so a draft here means a real transaction that never reached the books. | Open each one, fix what it complains about, and commit it. A growing count means the cause is still there. |
| *There are {0} undeleted online orders ({1}) older than 12 hours. Please review and process them.* — «يوجد {0} طلب أونلاين ({1}) منذ أكثر من 12 ساعة لم بتم حذفها بعد. يرجى مراجعتها ومعالجتها.» | Online-order entries are not being cleared. The check raises it when more than nine thousand entries are older than a day. | Process the backlog, and schedule the clean-up action that deletes old entries. |
| *Attribute send-ecommerce-data is not true in nama.properties and magento sites with codes {0} is active* — «الخاصية send-ecommerce-data غير مفعلة في nama.properties و مواقع ماجنتو بألاكواد {0} مفعلة» | An e-commerce site record is active but this server is not configured to send data to it — so the shop and the ERP are silently drifting apart. | Either set `send-ecommerce-data` on the server that should be publishing, or mark the site record inactive. It is normal to see this on a test copy of a live database. |

## See also

- [Messages and Refusals](/platform/documents-and-records/messages-and-refusals) — messages that refuse a save, which these are not
- [Business Requests](/platform/background-processing/business-requests) — the failed-requests count, and how to clear it
- [General FAQ](/admin/troubleshooting/general-faq) — other questions from the same corner of the system
- [nama.properties](/getting-started/nama-properties) — the server keys named here
- [Attachments and Storage](/platform/global-config/global-config-attachments) — the backup settings
