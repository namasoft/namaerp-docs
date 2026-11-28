---
title: EAClearGoogleDriveTrash
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAClearGoogleDriveTrash

## Overview

Empties the Google Drive trash folder, permanently deleting all trashed files. Maintenance utility for managing Google Drive storage by removing files no longer needed.

## When This Action Runs

Manual execution or scheduled maintenance tasks to permanently delete all files in Google Drive trash and free up storage space.

## How It Works

1. **Authenticates** to Google Drive using OAuth credentials
2. **Accesses trash folder** for the specified account
3. **Empties entire trash** in single bulk operation
4. **Permanently deletes** all files (cannot be recovered)

## Key Parameters

**Parameter 1:** OAuth file code or ID (Required) - The code or id of an **OAuth File** that is **Authorized** and has **Used For Emptying Trash of Google Drive Account** ticked. Saving the entity flow is refused otherwise, with the OAuth File messages listed on [EACheckDailyBackupOnGoogleDrive](/entity-flows/core/EACheckDailyBackupOnGoogleDrive)

## Database Tables Affected

- **OAuthFile** - Google Drive authentication configuration

No direct database modifications - only interacts with Google Drive through API calls.

## Related Actions

- [EACheckDailyBackupOnGoogleDrive](EACheckDailyBackupOnGoogleDrive.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EAClearGoogleDriveTrash`

</div>

