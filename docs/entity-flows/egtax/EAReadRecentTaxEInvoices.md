---
title: EAReadRecentTaxEInvoices
module: egtax
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAReadRecentTaxEInvoices

## Overview

Retrieves recent electronic invoices from the Egyptian Tax Authority API and imports them into the system. Connects to the official tax authority portal to fetch newly submitted e-invoices and synchronizes them with local tax e-invoice records.

## When This Action Runs

Runs from a Task Schedule (the class targets the Task Schedule record), to import the documents received on the Egyptian Tax Authority portal at regular intervals.

## How It Works

1. **Locates tax configuration** - Finds the specified TaxPayerConfiguration record by code or ID; if none is found it fails with `Could not find config file`
2. **Connects to tax authority** - Establishes API connection using the configuration credentials
3. **Fetches recent invoices** - Calls Egyptian Tax Authority API to retrieve recent documents. When the configuration already has a Last Read Submission Date For Received Documents, only documents submitted from that date until now are requested
4. **Processes invoice data** - Converts API response data into system-compatible format
5. **Saves local records** - Creates one Tax Electronic Invoice record per fetched document, each in its own transaction, using the Recent Document Book and Recent Document Term set on the configuration. A document whose UUID already exists for the same configuration is skipped
6. **Advances the last read date** - Moves the configuration's Last Read Submission Date For Received Documents forward to the latest received date among the saved documents

## Parameters

**Parameter 1:** Tax Payer Configuration Code (Required) - Code or ID of the TaxPayerConfiguration entity containing API credentials and settings

## Database Tables Affected

- **TaxPayerConfiguration** - Reads configuration for API access credentials and updates its last read submission date
- **TaxEInvoice** - Creates local e-invoice records

**Module:** egtax

**Full Class Name:** `com.namasoft.modules.egtax.util.actions.EAReadRecentTaxEInvoices`


</div>

