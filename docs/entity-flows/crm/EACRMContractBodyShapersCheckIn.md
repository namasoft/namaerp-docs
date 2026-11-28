---
title: EACRMContractBodyShapersCheckIn
module: crm
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACRMContractBodyShapersCheckIn

## Overview

Records customer check-in for CRM service contracts by creating or updating meeting remark documents. Validates contract existence and validity, then logs check-in time with optional hour adjustments and comments for service contract tracking.

## When This Action Runs

Runs on a Customer record. Manual execution when customers check in for services under active CRM service contracts. Typically used for fitness centers, gyms, spas, or other service-based businesses that track customer attendance.

## How It Works

1. **Finds active contract** - Locates the customer's most recent CRM service contract by value date
2. **Validates contract existence** - Ensures customer has at least one service contract; otherwise it fails with `The customer {0} does not have a service contract`
3. **Checks contract validity** - Verifies that at least one line of that contract covers today's date; otherwise it fails with `The contract {0} is expired`
4. **Creates/updates check-in record** - Finds the meeting remark whose code equals the contract code, or creates a new one with that code, and links it to the contract
5. **Records check-in details** - Adds new meeting remark line with current date, adjusted time, and customer reference
6. **Saves check-in** - Commits the meeting remark document with check-in information

## Parameters

**Parameter 1:** Added Hours (Required) - Number of hours to add to current time for check-in timestamp (can be decimal). Enter 0 to record the current time

**Parameter 2:** Value for text1 (Optional) - Additional text/comments to record in the Text 1 field of the new check-in line

## Database Tables Affected

- **CRMServiceContract** - Reads customer's service contracts to find active contract
- **ServiceContractLine** - Checks contract line validity dates
- **MeetingRemark** - Creates or updates check-in document
- **MeetingRemarkLine** - Adds new check-in entry with timestamp and details

**Module:** crm

**Full Class Name:** `com.namasoft.modules.crm.domain.entityactions.EACRMContractBodyShapersCheckIn`


</div>