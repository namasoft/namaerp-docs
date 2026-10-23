---
title: EAEmbedRecordsFromQuery
module: ai
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAEmbedRecordsFromQuery

## Overview

**Description:** This entity flow processes database records to create AI embeddings (vector representations) for search and AI-powered features. It takes a SQL query that returns entity types and record IDs, then processes each record to generate embeddings that can be used for semantic search, similarity matching, and other AI operations.

**Module:** ai

**Full Class Name:** `com.namasoft.modules.ai.util.actions.EAEmbedRecordsFromQuery`

## Parameters

The **Title** column is the caption the entity flow line shows above each parameter after saving.

| Parameter | Title | What to enter |
|---|---|---|
| Parameter 1 | - | Not used. Leave it empty. |
| Parameter 2 | Records To Embed Query, eg: select entityType,id from CRMLead where lastUpdateDate >= '20250901' and commitedBefore = 1 | A query whose first column is the entity type and second column is the record id. See [SQL Query Requirements](#SQL-Query-Requirements). |

Only master files can be embedded (customers, items, leads, ...). Of those, only the types listed in the
**AI Record Embedding Config** screen are embedded; a row of any other type is skipped without a message.
See [AI Module Configuration](../../modules/ai/ai-configuration.md).

## How It Works

::: info What are AI Embeddings?
AI embeddings are numerical representations (vectors) of text content that capture semantic meaning. They allow the system to understand and compare the meaning of different records, enabling features like:
- Semantic search ("find customers similar to this one")
- Content recommendations
- Automated categorization
- Intelligent matching
:::

### Processing Flow

1. **Query Execution**: The system executes your SQL query against the database
2. **Record Processing**: For each row returned:
   - Extracts the entity type and record ID
   - Loads the complete record from the database
   - Processes the record's text content to generate embeddings
   - Stores the embeddings for future AI operations
3. **Progress Tracking**: Shows progress like "Embedding record 15 of 100"
4. **Transaction Safety**: Each record is processed in its own database transaction

::: warning Important Notes
- A record whose text has not changed since it was last embedded is left as it is; a changed one is embedded again
- Nothing is embedded until the vector store is set up in the AI configuration
- Large queries may take significant time to process
- Each record is processed individually, so 1000 records = 1000 separate operations
- The system shows progress updates during processing
:::

## SQL Query Requirements

Your query must follow this exact structure:

```sql
SELECT entityType, id
FROM [TableName]
WHERE [your conditions]
```

### Required Columns

| Column Name | Type | Description | Example Values |
|-------------|------|-------------|---------------|
| `entityType` | text | Entity type name | 'CRMLead', 'Customer', 'InvItem' |
| `id` | uniqueidentifier | The record's id (a GUID) | the `id` column of the record's table |

The columns are read by position, not by name: the first is the entity type, the second the id.


## Common Usage Examples

### Example 1: Process Recent CRM Leads
```sql
SELECT 'CRMLead' as entityType, id
FROM CRMLead
WHERE lastUpdateDate >= '2025-09-01'
AND commitedBefore = 1
```

### Example 2: Process Customer Records by Date Range
```sql
SELECT 'Customer' as entityType, id
FROM Customer
WHERE creationDate BETWEEN '2025-01-01' AND '2025-09-30'
AND commitedBefore = 1
```
 
### Example 3: Process Multiple Entity Types
```sql
SELECT 'CRMLead' as entityType, id FROM CRMLead WHERE lastUpdateDate >= '2025-09-01'
UNION ALL
SELECT 'Customer' as entityType, id FROM Customer WHERE lastUpdateDate >= '2025-09-01'
UNION ALL
SELECT 'Supplier' as entityType, id FROM Supplier WHERE lastUpdateDate >= '2025-09-01'
```

</div>