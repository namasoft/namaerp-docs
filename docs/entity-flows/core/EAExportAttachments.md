---
title: EAExportAttachments
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAExportAttachments

## Overview

Exports file attachments from entity attachment fields to server file system with flexible naming and organization options.

## When This Action Runs

Manual or automated execution for attachment export, data archival, backup operations, and file processing workflows.

## How It Works

1. **Reads the attachment fields** of Parameter 2; a line field gives one file per line
2. **Creates the target folder** when it does not exist
3. **Generates file names** using configurable naming components
4. **Copies each attachment** to the folder, overwriting a file of the same name unless Parameter 7 is `true`

## Parameters

**Parameter 1:** Folder Path (on the server) (Required) - Target export directory path on the application server

**Parameter 2:** Attachment Field Names (Optional) - Comma-separated field names (default: "mainFile"), e.g. `attachment1,attachment2,mainFile`

**Parameter 3:** Include Attachment Field Name in File (Optional) - `true` starts the file name with the field id

**Parameter 4:** Do not add entity code to file name (Optional) - `true` leaves the record code out of the file name

**Parameter 5:** Do not add attachment file name to file path (Optional) - `true` leaves the original file name out

**Parameter 6:** Do not add each entity in a separate folder (Optional) - Empty or `false` writes the files into a subfolder named after the record's entity type (`SalesInvoice`, ...); `true` writes them directly into the folder of Parameter 1

**Parameter 7:** Error if attachment exists in the folder before (Optional) - `true` fails with *The file {0} exists before, can not export the attachment in field {1} in entity {2}* when the file is already there. Empty or `false` overwrites it

With every option left empty the file is written as `<folder>/<entity type>/<record code>-<attachment file name>`.

## Database Tables Affected

- **Entity Attachment Fields** - Read-only access to attachment data and metadata

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAExportAttachments`


</div>