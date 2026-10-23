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
- **Vector Store URI** - Milvus/Zilliz database connection URL
- **Vector Store Token** - Database authentication token

## Related Actions

- **EAEmbedFileToAIDB** - Embeds PDF files into AI database
- **AI Module Setup** - Required configuration for AI features

**Module:** ai

**Full Class Name:** `com.namasoft.modules.ai.util.actions.EAKeepZillizClusterActive`

</div>
