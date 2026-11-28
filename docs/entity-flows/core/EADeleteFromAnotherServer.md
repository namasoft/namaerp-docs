---
title: EADeleteFromAnotherServer
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EADeleteFromAnotherServer

## Overview

Deletes entities from remote Nama ERP servers through web services to maintain data synchronization across multi-server environments.

## When This Action Runs

Manual or automated execution during delete operations to remove entities from secondary/backup servers after local deletion.

## How It Works

1. **Checks document cancellation status:** when the record is a cancelled document, or the delete is part of cancelling a document, nothing is sent to the other server
2. **Creates web service client** for remote server connection
3. **Authenticates** using provided credentials
4. **Sends delete request** to remote server's entity service for the record with the same entity type, id and code

## Parameters

**Parameter 1:** Other Server URL (Required) - Title: *Other Server URL (ex. `http://localhost:7070/` )*. Complete URL to remote Nama ERP server (e.g., `https://erp-backup.company.com/`)

**Parameter 2:** Login ID (Required) - Valid user login with delete permissions on remote server

**Parameter 3:** Password (Required) - Authentication password (hashed before transmission)

## Database Tables Affected

- **Local Server** - Read-only access for entity data construction
- **Remote Server** - Target entity table deletion with related records and audit logs

**Module:** core

**Full Class Name:** `com.namasoft.commonservices.utils.EADeleteFromAnotherServer`


</div>

