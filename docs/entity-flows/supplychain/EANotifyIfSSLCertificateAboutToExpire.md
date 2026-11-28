---
title: EANotifyIfSSLCertificateAboutToExpire
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EANotifyIfSSLCertificateAboutToExpire

## Overview

Monitors SSL certificate expiration dates for specified websites and sends email notifications when certificates are about to expire. Connects to HTTPS URLs, retrieves certificate information, and creates pending email tasks when expiration is within the warning period.

## When This Action Runs

Manual execution or scheduled automation to monitor SSL certificate health, typically used by system administrators to proactively manage certificate renewals and prevent website security issues.

## How It Works

1. **Parses input parameters** - Reads CSV lists of URLs and corresponding common names
2. **Validates input data** - Fails with *Please make sure that URLs size {0} is the same as common names size {1}* when the URL and common name lists do not have the same number of entries
3. **Processes each URL** - For each URL-common name pair:
   - Establishes HTTPS connection to the URL
   - Retrieves SSL certificate chain from the server
   - Searches for the first certificate whose subject name contains the common name
   - Extracts certificate expiration date; when no certificate matches, adds the error *Could not find expire date for url {0} - common name {1}*
4. **Calculates remaining days** - Compares expiration date with current date
5. **Creates notifications** - If remaining days < warning period, creates email pending task
6. **Handles connection errors** - Waits 10 seconds after a failed connection and tries again, up to 11 retries; after that it fails with *Could not find ssl info for {0}*

## Parameters

**Parameter 1:** Reserved (Not used)

**Parameter 2:** URLs (CSV) (Required) - Comma-separated list of HTTPS URLs to check

Example: `https://crm.namasoft.com:8443/,https://erp.namasoft.com/`

**Parameter 3:** Common Names (CSV) (Required) - Comma-separated list of certificate common names to match, one per URL and in the same order, with no spaces after the commas

Example: `crm.namasoft.com,erp.namasoft.com`

**Parameter 4:** Warning Period In Days (Optional) - Days before expiration to trigger alerts (default: 10)

**Parameter 5:** Send To Email (Optional) - Email address for notifications (default: a.qasid@namasoft.com)

## Database Tables Affected

- **PendingTask** - Creates email notification tasks for certificates about to expire

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EANotifyIfSSLCertificateAboutToExpire`

**Related Systems:**
- Email notification system for sending alerts
- Network infrastructure for HTTPS connectivity
- Certificate management systems for renewals


</div>

