---
title: EACreateAccommodationInvoice
module: hms
entities: [EntityFlow]
---


<div class='entity-flows'>

# EACreateAccommodationInvoice

## Overview

Creates invoices for hospital accommodation services based on patient admissions and room stays. Processes accommodation entries to calculate billable days, applies checkout times, and generates invoices for hospital bed charges and related services.

## When This Action Runs

Manual execution for billing patient accommodation charges, typically at discharge or during regular billing cycles. Used in hospital management systems to convert accommodation entries into billable invoices.

## How It Works

1. **Identifies accommodation entries** - Finds relevant accommodation entries based on source entity type
2. **Groups by admission** - Organizes entries by patient admission for consolidated billing
3. **Calculates end times** - For each open accommodation entry, sets the end date to today and the end time to the current time or to the configured Check Out Time, depending on the parameter. With the configured time, if the resulting end falls before the entry's start, the end date becomes tomorrow
4. **Computes billable days** - Calculates chargeable accommodation days based on stay duration
5. **Applies configuration** - Uses HMS module checkout time settings if not using current time
6. **Creates invoices** - Generates accommodation invoices through specialized invoice creation utility
7. **Handles multiple stays** - Processes overlapping or consecutive accommodation periods
8. **Skips closed periods** - An admission whose earliest accommodation entry starts on or before the last closing entry date of its legal entity is left untouched, with the warning `Accommodation invoice of admission {0} was not updated because it starts at {1}, before the closing entry on {2}`

## Parameters

**Parameter 1:** Use The Current Time Instead Of Defined Checkout Time(true or false) (Optional) - "true" to use current time; "false" or empty to use configured checkout time

## Entity Type Processing

### For HMSAbsAccommodation Entities
- Processes the accommodation entries of that document's patient admission
- Creates invoices for that admission only

### For Other Entity Types
- Processes the accommodation entries of every patient admission that has no Accommodation Exit Doc and has a current room
- Creates invoices for all of those admissions in one run

## Database Tables Affected

- **HMSAccommodationEntry** - Reads accommodation stay records; end times and billable days are calculated on a copy for the invoice
- **HMSPatientAdmission** - Groups accommodation entries by patient admission
- **HMSAccommodation** - Links to accommodation documents for invoice creation
- **HMSAccommodationInvoice** - Creates accommodation invoices through invoice creation utility
- **HMSConfiguration** - Reads checkout time settings and billing configuration

**Module:** hms

**Full Class Name:** `com.namasoft.modules.hms.domain.utils.EACreateAccommodationInvoice`


</div>

