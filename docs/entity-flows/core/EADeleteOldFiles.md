---
title: EADeleteOldFiles
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EADeleteOldFiles

## Overview

Manages file system cleanup by keeping only a specified number of recent files in folders, deleting older files to maintain storage efficiency.

## When This Action Runs

Scheduled cleanup operations or manual execution for log rotation, backup maintenance, and storage management.

## How It Works

1. **Lists the files** directly inside the target folder. A folder that does not exist is treated as empty
2. **Sorts files** by last-modified date or by name
3. **Deletes excess files** from the start of that order (the oldest, or the first by name) until only the specified number remains
4. **Processes subdirectories** independently if recursive mode enabled: each subfolder keeps its own number of files

The flow runs from a task schedule.

## Parameters

**Parameter 1:** Folder Path (Required) - Target directory path for cleanup, on the application server

**Parameter 2:** Order By (date,name) (Required) - `date` for modification time. Any other value sorts by file name

**Parameter 3:** Files To Keep (Required) - Number of files to retain. `0` is refused with *Files to keep must greater than zero*

**Parameter 4:** Recursive (true,false) (Optional) - "true"/"false" to process subdirectories

## Database Tables Affected

- **None** - File system operation only, no database interaction

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADeleteOldFiles`


</div>

