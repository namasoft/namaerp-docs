---
title: EASetFieldByTemplate
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASetFieldByTemplate

## Overview

Sets an entity field value using a Tempo template that can include dynamic content based on the current entity's data. Processes template placeholders and entity references to generate the final field value.

## When This Action Runs

Manual execution for dynamic field population, automated data formatting, content generation based on entity data, or creating calculated field values using complex templates.

## How It Works

1. **Identifies target field** - Locates the specified field ID in the entity (can be header or detail field)
2. **Processes template** - Renders the Tempo template using DomainComplexRenderer with entity data
3. **Replaces placeholders** - Substitutes template variables with actual entity field values
4. **Sets field value** - Updates the target field with the rendered template result
5. **Handles type conversion** - Automatically converts string result to appropriate field type

## Parameters

**Parameter 1:** Field Id (Required) - Target field ID to set (supports header fields and detail collection fields)

**Parameter 2:** Template (Required) - Tempo template with entity data placeholders

## Template Examples

Simple field reference:
```tempo
Customer: {entity.customerName} - Order: {entity.orderNumber}
```

Complex formatting:
```tempo
Invoice #{code} dated {valueDate} 
Amount: {money.netValue} 
Status: {documentFileStatus}
```

## Database Tables Affected

- **Entity Tables** - Updates the specified field in the entity's main table or detail collection tables
- **Related Tables** - No direct changes, but template may reference related entity data

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EASetFieldByTemplate`


</div>