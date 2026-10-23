---
description: "How to export records from a list screen to a file: the four export commands and where they live, the export options, what happens after you press OK, and why the workbook can be edited and imported back."
---
# Exporting Records

Every list screen in Nama can hand you its records as a file. You will reach for this constantly: to send a customer list to an auditor, to check three hundred item prices in Excel where sorting and filtering are easier, or — most often — to produce a template you can edit and upload straight back.

That last use is worth keeping in mind from the start. The workbook you get is not a report. It carries hidden marker rows that tell the system which entity type it came from and which column feeds which field, so the same file can be read back in. Everything on this page is shaped by that round trip.

## The Four Export Commands

There is no single "Export" button. Which command you pick decides *which* records end up in the file, and the four commands live in two different places.

Three of them sit in the **More** menu of a list screen:

| Command | Arabic | What goes into the file |
|---|---|---|
| **Export Selected** | تصدير السجلات المختارة | Only the rows you have ticked. If you have ticked nothing, the system asks you to select rows first. |
| **Export Page** | تصدير الصفحة | Every row on the page you are looking at right now. Ticking is irrelevant. |
| **Export All Records** | تصدير كل السجلات | Every record of that type, rather than just the page in front of you. |

The fourth lives in the **More** menu of an open record:

| Command | Arabic | What goes into the file |
|---|---|---|
| **Export Current** | تصدير السجل الحالى | Just the record on screen. It must be saved — the command refuses to run on a record with unsaved changes. |

All four commands only appear for users whose security profile grants **Can Export** on that entity type. If a colleague cannot see them at all, that permission is the first thing to check — see [Security Profiles](/platform/security/security-profiles.md).

## The Export Options

Whichever command you choose, the same dialog opens. Its title is the name of the command you picked, which is why it usually reads "تصدير السجلات المختارة".

| Option | Arabic label | Default | What it does |
|---|---|---|---|
| **Exported Fields** | الحقول المصدرة | Only Visible Fields | *Only Visible Fields* (الحقول الظاهرة فقط) exports the fields that appear on the entity's edit screen, in screen order. *All Fields* (تصدير كل الحقول) exports everything the record holds — far wider, and usually more than you want to look at. |
| **Or specify the list** | أو قم بتحديد قائمة الحقول | empty | A comma-separated list of field ids. Fill it and it wins: you get exactly those columns, in that order, and the choice above is ignored. The field lets you search for field ids as you type. |
| **Include ID Field** | إضافة حقل المعرف | Off | Adds the record's internal identifier as a column. You need it only when the records you plan to re-import have no reliable code to match on. |
| **Export Details In Seperate Sheets** | التفاصيل في ورقة منفصلة | **On** | On, each detail table becomes its own worksheet, linked back to the header rows by code. Off, the detail lines are written inline underneath each header row in a single sheet. Leave it on — separate sheets are far easier to read and edit. |
| **Exporting Type** | نوع التصدير | EXCEL | EXCEL, XML or JSON. |
| **Ignore Attachments** | تجاهل المرفقات | Off | On, attached files are skipped entirely. Off, you get a **second** download — a companion `-attachments.zip` — and the cells hold the file names that point into it. |
| **Include Lines ID Filed** | إضافة حقل معرف السطور | **On** | Keeps the technical identifier columns on detail lines. These are what let a re-import update the existing lines instead of appending duplicates, so leave it on whenever the file is going to come back. |
| **Files Export / Import Menu** | قائمة تصدير / استيراد ملفات | empty | Runs the export through a saved definition instead of the choices above. The dropdown only offers menus built for the entity type you are on. See [Files Export / Import Menu](/platform/import-export/files-export-import-menu.md). |
| **Export Draft Version** | استعمال نسخة المسودة عند التصدير | Off | Exports each record's draft version rather than its saved one. There is also a global setting with the same effect; if that is switched on, drafts are exported whether you tick this or not. |

::: info XML and JSON are for administrators
Excel is available to anyone with the export permission. Choosing **XML** or **JSON** requires an administrator account — those formats carry the record structure verbatim and are meant for moving data between systems, not for handing to a colleague.
:::

## What Happens After You Press OK

The export does not freeze your screen. It is handed to a background task, and a progress entry appears showing which record it is on — "Exporting record 340 of 1,200". You can carry on working, and you can cancel a long export from that same progress popup.

When it finishes, the progress entry turns into a download link with the file name on it. Click it to save the file. The link is one-time: it downloads the file once, so if you close the window before clicking, run the export again.

The file name tells you what it is:

- Several records → `SalesInvoice-ExportFile-20260801.1922.xlsx` — entity type, then the date and time to the minute.
- A single record → `SalesInvoice-SINV0000035-20260801.1922.xlsx` — the code is used instead.
- Attachments, when you did not ignore them → the same name with `-attachments.zip` on the end.

::: warning Exports run one or two at a time
There is a ceiling on how many exports **one user** may have running simultaneously — two by default. Start a third while two are still working and you get *"You exceeded the allowed maximum export count at the same time. Please try again later."* Wait for one to finish, or ask an administrator to raise the limit, which can be set per user or globally. There is no limit on how many *records* a single export may contain.
:::

Administrators can also switch on a global setting that writes an entry into each record's action history every time it is exported, so "who took this data out of the system?" has an answer.

## A Note on What You Will See in the File

Open the workbook and the first rows will look strange — two rows beginning with `//`, then a row beginning with `:-record:`, and only then your data. Some columns will be duplicated: a `customer` column holding a code, followed by a `customer: Name` column holding the name.

None of that is clutter. Those rows and suffixes are exactly what lets the file be read back in, and the name columns are there so a human can make sense of a sheet full of codes. [Anatomy of the Export File](/platform/import-export/export-file-format.md) walks through every one of them.

::: tip Export first, then import
When you need to load new data into a screen you have never imported into before, do not start from a blank sheet. Export one existing record — or an empty **Export Page** if the screen has no records yet — and use the file you get back as your template. The marker rows and column headings will already be correct, and you only have to fill in rows underneath.
:::
