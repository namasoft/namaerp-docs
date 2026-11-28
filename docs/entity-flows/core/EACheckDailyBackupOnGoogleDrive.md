---
title: EACheckDailyBackupOnGoogleDrive
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACheckDailyBackupOnGoogleDrive

## Overview

Monitors Google Drive folders for backup files, verifying daily backups were created successfully. Checks folders for files created on target date and sends notifications based on findings.

## When This Action Runs

Scheduled maintenance task on Google Drive folders containing backup files. Typically runs daily to monitor backup processes.

## How It Works

1. **Authenticates** to Google Drive using configured OAuth file
2. **Scans folders** (files in the trash are ignored) for backup files of the target date (today/yesterday)
3. **Detects files** by creation date (a file created on the target date or later counts) or by file name (the name must contain the target date as `yyyyMMdd`)
4. **Sends notifications** for found/missing backups
5. **Optionally cleans** Google Drive trash after check

## Key Parameters

The **Title** column is the caption the entity flow line shows above each parameter after saving.

| Parameter | Title | What to enter |
|---|---|---|
| Parameter 1 | OAuth file code or ID | Required. The code or id of an **OAuth File** that is **Authorized** and has **Used For Checking Backups On Google Drive** ticked. |
| Parameter 2 | Drive Folder ID (in case of multi-folder, user folderId=title) | Required. The id of the Google Drive folder. In multi-folder mode (see Parameter 8): one `folderId=title` per line; a line that starts with `$#` is a section heading for the folders after it. |
| Parameter 3 | Backup Was NOT Found Notification Definition Code or ID | Required. The notification definition sent when no backup file is found. |
| Parameter 4 | Backup Was Found Notification Definition Code or ID | Required. The notification definition sent when a backup file is found. |
| Parameter 5 | Check Backup File for (today,yesterday) default is today | `today` or `yesterday`. Empty means `today`. |
| Parameter 6 | Send Success Notification only on weekday (everyday,saturday,sunday,monday,tuesday,wednesday,thursday,friday), default everyday | The day on which the "found" notification is sent. Empty or `everyday` sends it on every run. The "not found" notification is always sent. |
| Parameter 7 | Clear Trash After Check (true,false) | `true` empties the Google Drive trash after each folder is checked. The OAuth File must also have **Used For Emptying Trash of Google Drive Account** ticked. |
| Parameter 8 | Check Files By Name Not Date (File Name Should contain yyyyMMdd)(true,false) | `true` matches files by name instead of creation date, and reads Parameter 2 as a multi-folder list: all folders are checked first, then one "not found" notification is sent for the folders without a backup and one "found" notification for the others. |

The parameters are checked when the entity flow or task schedule is saved; a wrong value is refused with one of these messages:

- *Could not find an OAuthFile with the code {0}*
- *The OAuthFile {0} is not authenticated correctly, please open the file and click on Start OAuth Flow*
- *You must select Used For Checking Backups On Google Drive in the OAuth FIle {0}*
- *You must select Used For Emptying Trash of Google Drive Account in the OAuth FIle {0}*
- *The value {0} is not a valid day of week, please use one of the following: everyday,saturday,sunday,monday,tuesday,wednesday,thursday,friday*
- *The value {0} is not valid , please use one of the following: today, yesterday*

## Database Tables Affected

- **OAuthFile** - Google Drive authentication configuration
- **NotificationDefinition** - Templates for success/failure notifications

No direct database modifications - only reads configuration and uses Google Drive API.

## Related Actions

- [EAClearGoogleDriveTrash](EAClearGoogleDriveTrash.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EACheckDailyBackupOnGoogleDrive`

</div>

