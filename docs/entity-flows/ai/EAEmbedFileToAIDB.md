---
title: EAEmbedFileToAIDB
module: ai
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAEmbedFileToAIDB

## Overview

Processes PDF files attached to entities and converts them into AI-searchable format by storing them in a vector database. Enables AI assistants to search through document content.

## When This Action Runs

- **Trigger:** Manual execution through entity flows
- **Target:** Entities with PDF attachments
- **Purpose:** Make PDF content searchable by AI assistants
- **Timing:** On-demand when AI document search is needed

## How It Works

1. **Extracts PDF files** from specified attachment fields
2. **Converts content to text** and splits into 800-character chunks (200-character overlap)
3. **Creates vector embeddings** using the OpenAI model chosen in **Text Embedding Model** in the AI module configuration
4. **Stores embeddings** in the Milvus (or Zilliz) vector database for AI retrieval, one collection per file

## Parameters

### Parameter 1: Attachment IDs (Required)
**Title:** Attachment IDs (e.g: attachment1,details.attachment1)
**Format:** Field names separated by commas or newlines
**Examples:**
- `attachment1` (single header field)
- `attachment1,attachment2` (multiple fields)
- `details.attachment1` (collection field)
- `attachment1,details.attachment1` (mixed fields)

## Prerequisites

### Required AI Module Configuration (System Settings)
- **Open AI Embedding Key** - Required for embeddings
- **Text Embedding Model** - `text-embedding-3-small`, `text-embedding-3-large` or `text-embedding-ada-002`
- **Vector Store URI (Zilliz or Milvus)** - Milvus or Zilliz database connection
- **Vector Store Token (Zilliz or Milvus)**, or **Vector Store Username** and **Vector Store Password** - Database authentication

The flow stops with *AI vector store is not configured* when the key, the model or the URI is empty. See [AI Module Configuration](/modules/ai/ai-configuration).

### Database Requirements
- Accessible Milvus vector database
- Network connectivity to OpenAI services
- Sufficient vector database storage

## File Requirements

- **Supported:** PDF files only
- **Duplicate Prevention:** SHA-256 hash identification
- **Processing:** 800-character chunks with 200-character overlap

## Expected Results

### Success Cases
- **New File:** Successfully embedded into AI database
- **Duplicate File:** Warning "The file already exists" (skipped)

### Error Cases
- **Invalid File Type:** "Only PDF files are supported"
- **Configuration Issues:** Missing API keys or database connectivity
- **Field Issues:** Attachment fields don't exist or are empty

## Related Actions

- **AI Module Setup** - Required configuration for AI features
- **Vector Database Management** - Manages searchable document storage

**Module:** ai

**Full Class Name:** `com.namasoft.modules.ai.util.actions.EAEmbedFileToAIDB`

</div>

