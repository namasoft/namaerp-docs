---
title: EANamaCloudBackupPrepare
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EANamaCloudBackupPrepare

## Overview

Prepares Google Drive backup configuration by scanning folder structures, authenticating via OAuth, and generating configuration for backup validation processes.

## When This Action Runs

Backup preparation for TaskSchedule entities requiring Google Drive folder structure configuration.

## How It Works

1. **Authenticates with Google Drive** using OAuth credentials from OAuthFile
2. **Scans folder structures** in specified Google Drive folders
3. **Validates folder hierarchy** (expects 2 subfolders per backup folder)
4. **Generates configuration** mapping folder IDs to names by section
5. **Stores output** in task schedule parameters for backup validation


## Parameters

**Parameter 1:** (Not Used) - Ignored

**Parameter 2:** OAuth File Code or ID (Required) - Reference to OAuthFile entity with Google Drive credentials

**Parameter 3:** Drive Folder IDs (Required) - Maps sections to folder IDs: `sectionName=folderId1,folderId2`

**Parameter 4:** Append To Output (Optional) - Additional text to append to configuration

**Parameter 5:** Save Output To Task Schedule (Optional) - Target task schedule to save output

**Parameter 6:** Output (Output) - Generated folder configuration for backup validation

**Parameter 7:** Errors (Output) - Filled by the flow with the backup folders that do not contain exactly two sub-folders; empty when every folder is valid

## Database Tables Affected

- **TaskSchedule Parameters** - Updates parameter6 with generated configuration, optionally parameter2 of target task
- **OAuthFile Access** - Reads Google Drive OAuth credentials for authentication
- **Google Drive** - Read-only access to folder structures, no modifications


**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EANamaCloudBackupPrepare`

**Related Actions:**
- [EACheckDailyBackupOnGoogleDrive](EACheckDailyBackupOnGoogleDrive.md) - Uses output from this action for backup validation


</div>