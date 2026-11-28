---
title: EAKeepZillizClusterActive
module: ai
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAKeepZillizClusterActive

## Overview

Executes a lightweight query on the configured Zilliz (Milvus) vector database to prevent the cluster from being suspended due to inactivity. Zilliz cloud clusters may automatically suspend after periods of no activity, and this action keeps them active.

## When This Action Runs

- **Trigger:** Scheduled task or manual execution through entity flows
- **Target:** Any entity (the query does not depend on the record)
- **Purpose:** Prevent Zilliz cluster suspension due to inactivity
- **Timing:** Recommended to run periodically via scheduled task (e.g., once every day)

## Parameters

This action has no parameters. It uses the AI module configuration settings.

## Prerequisites

### Required AI Module Configuration (System Settings)
- **Vector Store URI (Zilliz or Milvus)** - Milvus/Zilliz database connection URL
- **Vector Store Token (Zilliz or Milvus)**, or **Vector Store Username** and **Vector Store Password** - Database authentication
- **Open AI Embedding Key** and **Text Embedding Model** - The vector store counts as configured only when both are filled as well

When any of the URI, the key or the model is empty the flow stops with *AI vector store is not configured*.

## Result

- **Success:** the message *Zilliz cluster ping successful. Found {0} collections.*
- **Failure:** *Failed to ping Zilliz cluster: {0}*

## Related Actions

- **EAEmbedFileToAIDB** - Embeds PDF files into AI database
- **AI Module Setup** - Required configuration for AI features

**Module:** ai

**Full Class Name:** `com.namasoft.modules.ai.util.actions.EAKeepZillizClusterActive`

</div>
