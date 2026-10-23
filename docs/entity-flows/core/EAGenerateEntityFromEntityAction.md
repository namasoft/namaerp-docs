---
title: EAGenerateEntityFromEntityAction
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGenerateEntityFromEntityAction

## Overview

Creates new entities from existing entities with full database commitment. Core action for most document generation workflows providing field mapping, conditional processing, and automatic persistence.

Please review the page at [Field Values Calculator](../../entity-flows/core/ai-generated-field-maps-documentation.md)

## When This Action Runs

Manual execution or automated through entity flows requiring full document generation with immediate commitment.

## How It Works

1. **Analyzes source entity** for data extraction
2. **Maps fields** from source to target based on configuration  
3. **Searches for existing** target entities using finder SQL
4. **Creates or updates** target entity with mapped values
5. **Commits to database** with full validation and business rules
6. **Triggers workflows** and related processes

## Key Parameters

- **Parameter 1:** Target Type (Required) - Entity type to create (e.g., `SalesInvoice`, `CreditNote`)
- **Parameter 2:** Finder SQL (Required) - Query to find existing entity for updates
- **Parameter 3:** Field Map (Optional) - Field mapping configuration (`targetField=sourceValue`)
- **Parameter 4:** Update Only (Optional) - Only update existing entities, don't create new
- **Parameter 5:** Inverse Copy (Optional) - Copy fields back from generated to source entity
- **Parameter 6:** Run Per Each Line (Optional) - Execute for each collection item
- **Parameter 7:** Insert Only (Optional) - Only create new entities, don't update existing
- **Parameter 8:** Apply When Query (Optional) - Conditional logic for generation
- **Parameter 9:** Group Details By (Optional) - Group detail lines by criteria
- **Parameter 10:** Run Only If (Optional) - Execute only if expression returns > 0

## Database Tables Affected

- **Target Entity Table** - Creates/updates records with full commitment
- **Source Entity Table** - May update via inverse copy configuration  
- **Detail Collections** - Generates detail lines based on source collections
- **Related Tables** - Updates cross-references and relationships

## Example for creating delivery documents from FormDoc1 per line

```json
{
  "targetType": "FormDoc2",
  "details": [
    {
      "className": "com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction",
      "parameter1": "DeliveryDocument",
      "parameter2": "select id from DeliveryDocument where id={line.ref5.id}",
      "parameter3": "ref1=$line.relatedEntity1\nfromDoc=$line.relatedEntity2\nbook='DD'\nterm='DD'\nvalueDate=valueDate\nlegalEntity=$target.book.legalEntity\nbranch=$target.book.branch\ndepartment=$target.book.department\nsector=$target.book.sector\nanalysisSet=$target.book.analysisSet\ndriver=$target.ref1\ndelivStatus='Delivering'",
      "parameter5": "$line.ref5=$this",
      "parameter6": "details",
      "parameter8": "select case when {currentLine.relatedEntity2.$toReal.delivStatus} in ('' , 'NotDelivered') and {line.relatedEntity2.$toReal.sector.code} = '1' then 1 else 0 end",
      "targetAction": "PostCommit"
    }
  ]
}
```

## Related Actions

- [EAGenerateDraftEntityFromEntityAction](EAGenerateDraftEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionNoFlush](EAGenerateEntityFromEntityActionNoFlush.md)
- [EAAutomaticGenerateEntityFromEntityAction](EAAutomaticGenerateEntityFromEntityAction.md)
- [EAGenerateEntityFromEntityActionWithApproval](EAGenerateEntityFromEntityActionWithApproval.md)
- [EAGenerateEntityFromEntityActionNoFlushWithApproval](EAGenerateEntityFromEntityActionNoFlushWithApproval.md)
- [EAAutomaticGenerateEntityFromEntityActionWithApproval](EAAutomaticGenerateEntityFromEntityActionWithApproval.md)

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction`

</div>