---
title: EAJsonRecordExporter
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAJsonRecordExporter

## Overview

Exports entity data as JSON to external systems via HTTP requests with field filtering, renaming, and dynamic URL generation.

## When This Action Runs

Manual or automated execution for real-time JSON data export to external APIs and integration systems.

## How It Works

1. **Collects specified fields** from entity using CSV field list
2. **Converts to JSON** with optional field renaming
3. **Sends HTTP request** (GET/POST) to specified endpoint
4. **Supports test mode** for logging without transmission

## Parameters

**Parameter 1:** Request Type (Optional) - HTTP method "GET" or "POST" (default: POST). With POST the JSON is the request body; with GET it is sent in a query parameter named `entity`

**Parameter 2:** URL Tempo (Required) - Destination URL with optional Tempo field references (e.g., `https://api.example.com/customers/{customer.code}`)

**Parameter 3:** Only Export Fields (Optional) - CSV list of fields to export (e.g., `code,name1,customer.name1`)

**Parameter 4:** Rename Fields To (Optional) - Field mapping `internalField=externalField` format

**Parameter 5:** Do Not Send Request (Optional) - "true" for test mode (logs only), "false" to send HTTP request

## Database Tables Affected

- **Source Entity** - Read-only access to entity and related data for JSON conversion
- **External Systems** - Sends JSON data via HTTP to specified endpoints

**Module:** core

**Full Class Name:** `com.namasoft.modules.basic.util.EAJsonRecordExporter`


</div>