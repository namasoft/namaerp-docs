---
title: EAEmptifyTomcatTemp
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEmptifyTomcatTemp

## Overview

Cleans Tomcat temp directory by removing old files while preserving recent items to manage server storage and improve performance.

## When This Action Runs

Scheduled maintenance or manual cleanup operations to remove old temporary files and free disk space.

## How It Works

1. **Locates temp directory** of the application server (the `java.io.tmpdir` system property)
2. **Calculates cutoff time** based on specified hours parameter
3. **Scans files recursively** in temp directory and subdirectories
4. **Removes old files** last modified before the cutoff

## Parameters

**Parameter 1:** Leave items newer than n hours (Optional) - Number of hours to preserve recent files. Empty, `0` or a value that is not a whole number means 12 hours

## Database Tables Affected

- **None** - File system operation only, no database interaction

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAEmptifyTomcatTemp`


</div>

