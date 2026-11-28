---
title: EARunEntityFlow
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARunEntityFlow

## Overview

Executes another entity flow by its business code. This meta-action allows one entity flow to trigger another, enabling complex workflow orchestration and reusable action patterns.

## When This Action Runs

Manual execution when one entity flow needs to invoke another entity flow as part of a larger workflow or business process sequence.

## How It Works

1. **Locates target flow** - Finds the entity flow by the code in Parameter 1; an unknown code stops with *Could not find entity flow with code {0}*
2. **Validates applicability** - When the target flow does not apply to the current record, the warning *Entity flow {0} is not applicable for entity {1}* is shown and nothing runs
3. **Runs it as a manual flow** - The active lines of the target flow whose **Target Action** is *Manual* (and any *Automatic* line, which runs on every event) run, exactly as when a user runs it from the record. A flow with no such line gives the warning *Entity flow {0} does not have any manual lines*; a user who may not run it manually gets *You are not allowed to run entity flow {0} on {1}*
4. **Executes flow** - Runs the target entity flow on the current entity
5. **Returns results** - Accumulates and returns results from the executed flow

## Parameters

**Parameter 1:** Entity Flow Code (Required) - Business code of the EntityFlow to execute

## Database Tables Affected

- **EntityFlow** - Reads flow configuration and execution parameters
- **Variable Tables** - Depends on the target entity flow being executed
- **Target Flow Impact** - Database changes depend entirely on what the target flow does

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EARunEntityFlow`


</div>