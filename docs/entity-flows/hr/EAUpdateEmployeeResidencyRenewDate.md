---
title: EAUpdateEmployeeResidencyRenewDate
module: hr
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAUpdateEmployeeResidencyRenewDate

## Overview

Writes the new residency and work license end dates of a Residence Renew Request, or of every line of an Aggregated Residence Renew Request, to the employee's record.

## When This Action Runs

Manual execution on residence renewal documents. Typically used after processing residency renewals for expatriate employees to update their main employee records with new residency expiration dates.

## How It Works

1. **Takes the lines** - A Residence Renew Request is treated as one line; an Aggregated Residence Renew Request is processed line by line
2. **Checks each line** - The flow fails when:
   - **Is paid** is not ticked: *You must check is paid*
   - **Is Renewed** is not ticked: *You must check is renewed*
   - both **Residency New End Date** and **Work License New End Date** are empty: *You must fill residency and work license new end date*
   - **Residency New End Date** is before the employee's current residency end date: *Document residency date is before employee*
   - **Work License New End Date** is before the employee's current work license end date: *Document work license date is before employee*
3. **Updates the employee** - Sets the employee's residency end date to **Residency New End Date** and work license end date to **Work License New End Date**, each only when filled, and saves the employee

## Parameters

**No Parameters** - This action does not require any input parameters

## Database Tables Affected

- **Employee** - Updates the residency end date and the work license end date
- **ResidenceRenewReq**, **AggrResidenceRenewReq** - The two documents the flow runs on (read-only)

**Module:** hr

**Full Class Name:** `com.namasoft.modules.humanresource.utils.actions.EAUpdateEmployeeResidencyRenewDate`


</div>

