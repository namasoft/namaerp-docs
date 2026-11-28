---
title: EAPrintFormToPrinter
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAPrintFormToPrinter

## Overview

Prints entity forms directly to a specified printer using Jasper Reports. Automatically selects the most appropriate form for the entity or uses a specified form code, increments print count, and sends output to the configured printer.

## When This Action Runs

Manual execution for printing entity forms directly to physical printers without user preview or PDF generation.

## How It Works

1. **Locates form definition** - Finds the report definition by the code in Parameter 2, or, when it is empty, the system form of the record's type
2. **Validates form availability** - Stops with *Could not find form with the code {0}* or *Could not find form to print the entity {0}* when no form is found
3. **Prepares report data** - Creates filled question fields and report metadata for the entity
4. **Generates report** - Runs Jasper report with entity data and hidden question processing
5. **Prints to printer** - Sends generated report directly to specified printer and cleans up temporary files
6. **Updates print count** - Increments entity's print counter for tracking

## Parameters

**Parameter 1:** Printer Name (Optional) - Name of a printer installed on the application server. Empty prints to that server's default printer. One copy is printed on A4 paper, in the orientation of the form

**Parameter 2:** Form Report Code (Optional) - Business code of specific ReportDefinition to use (auto-selects if empty)

## Database Tables Affected

- **ReportDefinition** - Reads form configuration and metadata for report generation
- **Entity Print Count** - Increments print count field on the source entity
- **Temporary Print Records** - Creates and deletes temporary print job records

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAPrintFormToPrinter`


</div>