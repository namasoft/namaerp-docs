---
title: EAAttachReportResultToRecord
module: core
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAAttachReportResultToRecord

## Overview

Generates reports automatically and attaches the resulting files as attachments to the current entity record. Handles parameter mapping, report execution, file generation, and attachment storage in a single operation.

## When This Action Runs

Manual execution or automated workflows requiring document generation on any entity with attachment fields.

## How It Works

1. Finds report definition by ID or code
2. Maps entity data to report parameters using field expressions
3. Executes report and generates output in specified format
4. Creates or updates attachment in specified entity field
5. Sets attachment filename using report code and output format (e.g., `INVOICE_REPORT.pdf`)
6. Optionally runs for each detail line when configured

## Key Parameters

- **Parameter 1:** Report ID or Code (Required) - Report identifier or unique code
- **Parameter 2:** Save To Attachment Field ID (Required) - Must be attachment field (LargeData type)
- **Parameter 3:** Output Format (Required) - PDF, DOCX, PPTX, ODS, ODT, RTF, TXT, XLS, XLSX, CSV, JSON
- **Parameter 4:** Parameter Sources (field map: parameterName=sourceValueExpression) (Optional) - Field mapping expressions
- **Parameter 5:** Attachment File name tempo (Optional) - Template expression for custom file naming, e.g. `{customer.code}-{$today.$toStringYYYYMMDD}.pdf`
- **Parameter 6:** Run Report multiple times per each line in detail ID (Optional) - Detail collection ID to run report for each line (e.g., details, lines, paymentMethods)

Parameters 1, 2 and 3 must be filled when the entity flow is saved. When Parameter 6 is filled, Parameter 2 must start with the detail id
and a dot, otherwise saving is refused with *Attachment field {0} must be a sub-field of the detail {1}*. A report that is not found
stops the run with *Report not found: {0}*.

### Parameter Examples:

#### Basic Usage:
```
Report: INVOICE_REPORT
Field: attachment1
Format: PDF
Parameters:
  customerId=customer.id
  amount=money.total
  fromDate=$today.$yearStart
  toDate=$today
```

#### With Custom File Naming:
```
Report: INVOICE_REPORT
Field: attachment1
Format: PDF
Parameters:
  customerId=customer.id
  amount=money.total
Custom File Name: Invoice_{code}_{customer.name}_{$today.$toStringYYYYMMDD}
```

#### Running for Each Detail Line:
```
Report: LINE_REPORT
Field: details.attachment1
Format: PDF
Parameters:
  lineId=details.id
  itemCode=details.item.item.code
  quantity=details.quantity
Run On Detail: details
```

### Detail Processing Features:
- When **Run On Detail** is specified, the action iterates through each item in the detail collection
- The attachment field must be a sub-field of the specified detail (e.g., `lines.reportAttachment` when running on `lines`)
- Each detail line has access to its own context through `$line` expressions

### Attachment File Naming:
- **Default Naming:** Files are automatically named using the pattern: `[ReportCode].[format]`
  - Example: A report with code `INVOICE_REPORT` exported as PDF becomes `INVOICE_REPORT.pdf`
- **Custom Naming:** Use Parameter 5 to specify a template expression for dynamic file names
  - Template expressions can reference entity fields and use complex rendering
  - The appropriate file extension is automatically appended if not included
  - Example: `Invoice_{code}_{customer.code}` becomes `Invoice_INV001_CUST123.pdf`
- The filename is set on the attachment's `fileName` field for proper identification

## Database Tables Affected

- **Target Entity** - Attachment field updated with generated report file
- **ReportDefinition** - Report configuration and parameters read

## Related Actions

- [EAPrintReportToPrinter](EAPrintReportToPrinter.md)
- [EAGenerateEntityFromEntityAction](EAGenerateEntityFromEntityAction.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAAttachReportResultToRecord`

</div>

