---
title: EAErrorIfQueryNotMatched
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAErrorIfQueryNotMatched

## Overview

An older entity flow for checking a record with an SQL query. It has been replaced by the **Criteria Based Validation** screen: to refuse saving a record when a query or a condition is not met, define the rule there. See [Criteria Based Validation](/platform/governance/criteria-based-validation).

## Parameters

The flow line shows these titles above its parameters:

**Parameter 1:** Query, eg: select case when {code} = 'abc' then 0 else 1 end - Required when the entity flow is saved

**Parameter 2:** Arabic Error Tempo, eg: The code {code} must not be abc, please use something else. - Required when the entity flow is saved

**Parameter 3:** English Error Tempo

## Database Tables Affected

- **None** - no database modifications

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAErrorIfQueryNotMatched`


</div>
