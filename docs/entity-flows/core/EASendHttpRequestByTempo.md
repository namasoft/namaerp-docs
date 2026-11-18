---
title: EASendHttpRequestByTempo
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASendHttpRequestByTempo

## Overview

Generates HTTP requests using Tempo templates and queues them for asynchronous execution. Parses Tempo content to extract HTTP request definitions and creates pending system actions for external API communication.

## When This Action Runs

Manual execution for integrating with external APIs, web services, or third-party systems. Commonly used for sending notifications, synchronizing data, or triggering external workflows based on entity changes.

## How It Works

1. **Parses Tempo template** - Processes the Tempo template using ComplexRenderer to extract HTTP request definitions
2. **Renders entity data** - Uses entity data to populate template variables and generate final HTTP request content
3. **Extracts HTTP requests** - Identifies all HTTP request blocks defined in the rendered Tempo content
4. **Creates pending actions** - Generates PendingSystemAction records for each HTTP request
5. **Queues for execution** - Stores requests in the system action queue for asynchronous processing

## Parameters

**Parameter 1:** Request Tempo (Required) - Tempo template containing HTTP request definitions with entity data placeholders

**Parameter 2:** Do Not Delete Task After Finishing (Optional) - true/false to preserve action records after execution (default: false)

## Tempo Template Structure

The Tempo template should define HTTP requests using the system's HTTP request format:
- Example 1:
```tempo
{loop(details)}
{httprequest}
 {requesturl}https://namasoft.com/api/v3.0/item{endurl}
 {requestmethod}POST{endmethod}
 {contenttype}application/json{endcontenttype}
 {charset}utf8{endcharset}
 {headername}api-key{endheadername}
 {headervalue}xxHjjk889523{endheadervalue}
 {paramname}company_name{endparamname}
 {paramvalue}{legalEntity.name2}{endparamvalue}
 {bodypartname}user_whatsapp_number{endbodypartname}
 {bodypartvalue}{details.ref1.$toReal.contactInfo.mobile}{endbodypartvalue}
 {bodypartname}ordernumber{endbodypartname}
 {bodypartvalue}{details.ref2.$toReal.code}{endbodypartvalue}
{endrequest}
{endloop}
```
- Example 2:
```tempo
{loop(details)}
{httprequest}
 {requesturl}https://namasoft.com/api/v3.0/item{endurl}
 {requestmethod}POST{endmethod}
 {contenttype}application/json{endcontenttype}
 {charset}utf8{endcharset}
 {headername}api-key{endheadername}
 {headervalue}xxHjjk889523{endheadervalue}
 {paramname}company_name{endparamname}
 {paramvalue}{legalEntity.name2}{endparamvalue}
 {requestbody}
\{
"user_whatsapp_number":"{details.ref1.$toReal.contactInfo.mobile}"
,"ordernumber":"{details.ref2.$toReal.code}"
\}
{endbody}
{endrequest}
{endloop}
```
## Database Tables Affected

- **PendingSystemAction** - Creates new records for HTTP request execution
- **Entity Data** - Reads entity data to populate Tempo template variables

**Module:** core

**Full Class Name:** `com.namasoft.modules.basic.util.EASendHttpRequestByTempo`


</div>