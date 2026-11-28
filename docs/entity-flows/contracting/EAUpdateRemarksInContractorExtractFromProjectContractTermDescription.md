---
title: EAUpdateRemarksInContractorExtractFromProjectContractTermDescription
module: contracting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAUpdateRemarksInContractorExtractFromProjectContractTermDescription

## Overview

Automatically updates remarks fields in Contractor Extract lines and conditions by copying remarks from related Project Contract Terms. Builds hierarchical chain of remarks from parent terms.

## When This Action Runs

- **Trigger:** Manual execution through entity flows
- **Target:** Contractor Extract documents
- **Purpose:** Propagate project contract term remarks to contractor extracts
- **Timing:** On-demand when remarks synchronization is needed

## How It Works

1. **Maps contractor terms** to project terms using `projTermCode` field
2. **Builds hierarchy** by walking up project contract term parent-child relationships
3. **Combines remarks** from all parent levels with specified separator
4. **Updates target fields** in extract lines and/or conditions

## Parameters

The six parameters and the titles shown on the flow line are those of [EAUpdateRemarksInExtractFromContractTermDescription](/entity-flows/contracting/EAUpdateRemarksInExtractFromContractTermDescription). On this flow they behave as follows:

### Parameter 1: Update Details Remarks
- **Values:** `true`, `false` or empty. At least one of Parameters 1 and 2 must be filled
- **Purpose:** Whether to update remarks in extract detail lines

### Parameter 2: Update Conditions Remarks
- **Values:** `true`, `false` or empty
- **Purpose:** Whether to update remarks in extract condition lines

### Parameter 3: Up to Level (Optional)
- **Default:** 255 (all levels)
- **Purpose:** Maximum hierarchy levels to include, counted from the project term itself upward
- **Examples:** `3`, `5`, `10`

### Parameter 4: Contract Field (Optional)
- **Purpose:** Field of the extract that holds the record whose terms are searched. Empty: the project contract of the extract; when the extract has no project contract no remarks are found
- **Examples:** `projContract.executiveBudget`

### Parameter 5: Term Code Field (Optional)
- **Purpose:** Field of the extract line that holds the term code. When it is filled its value is searched directly in the terms of Parameter 4, without the `projTermCode` mapping. Empty: the line's term code is mapped to the project term code through the contractor contract
- **Examples:** `executiveTermCode`, `estimatedTermCode`

### Parameter 6: Separator (Optional)
- **Default:** `" - "`
- **Purpose:** Text to separate remarks from different levels
- **Examples:** `" | "`, `"; "`

## Database Tables Affected

### Updated Tables
- **ContractorContrExtractLine** - Extract detail lines (remarks field)
- **ContractorExtractCondLine** - Extract condition lines (remarks field)

### Reference Tables
- **ContractorContractTermLine** - Term mapping via `projTermCode`
- **ProjContractTermLine** - Source of remarks

## SQL Verification

```sql
-- Check updated remarks in extract details
SELECT ce.code, cel.lineNumber, cel.termCode, cel.remarks
FROM ContractorContrExtract ce
INNER JOIN ContractorContrExtractLine cel ON ce.id = cel.contractorContrExtract_id
WHERE ce.id = [ExtractId] ORDER BY cel.lineNumber;
```

## Related Actions

- **Project Contract Term Management** - Maintains source remarks
- **Contractor Contract Setup** - Establishes term mappings via projTermCode
- **Extract Processing** - Uses updated remarks for documentation

**Module:** contracting

**Full Class Name:** `com.namasoft.modules.contracting.domain.utils.EAUpdateRemarksInContractorExtractFromProjectContractTermDescription`

</div>

