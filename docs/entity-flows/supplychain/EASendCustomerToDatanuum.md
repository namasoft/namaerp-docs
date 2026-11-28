---
title: EASendCustomerToDatanuum
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASendCustomerToDatanuum

## Overview

Synchronizes customer information with the Datanuum external service for reward points and loyalty program integration. Builds a JSON payload containing customer personal details and contact information, then sends it to Datanuum's API to create or update customer records in their loyalty platform.

## When This Action Runs

Manual execution when customer data needs to be synchronized with the Datanuum loyalty system, typically after customer registration, profile updates, or when setting up reward points integration for existing customers.

## How It Works

1. **Validates reward config** - Looks up the RewardPointsConfig by provided code or ID
2. **Extracts POS register** - Takes the code of the record in the customer's ref5 field when that record is a POS register. The request needs this code or the branch ID of the reward points configuration; when both are empty it fails with *At least one of those fields must be provided Pos Register Code or branch Id*
3. **Initializes API client** - Creates DatanuumApiClient with config and POS register information
4. **Builds customer payload** - Creates JSON request body with customer details:
   - Personal information (first name = the customer's Name 1, last name = the customer's Name 2, gender, birth date)
   - Contact details (mobile phone, email address)
   - Address information (nationality from country field)
5. **Sends to Datanuum** - Transmits customer data to Datanuum API endpoint
6. **Returns results** - Accumulates API response results and any errors

## Parameters

**Parameter 1:** Reward Points Config Code Or ID (Required) - Configuration record for Datanuum integration

Example: `DATANUUM_CONFIG_01` or `12345`

## Database Tables Affected

- **RewardPointsConfig** - Reads integration configuration settings (read-only)
- **Customer Data** - Reads customer personal and contact information (read-only)
- **External Datanuum System** - Creates/updates customer records via API calls

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.datanuum.EASendCustomerToDatanuum`

**Integration Type:** External API - Datanuum Loyalty Platform

**Related Actions:**
- Other Datanuum integration entity flows
- Reward points management actions
- Customer data synchronization utilities


</div>

