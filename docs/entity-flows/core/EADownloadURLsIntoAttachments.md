---
title: EADownloadURLsIntoAttachments
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EADownloadURLsIntoAttachments

## Overview

Downloads the file at each URL field value into the matching attachment field, setting the file name on the stored file. URL and attachment fields are matched by position, so both header fields and detail-line fields are supported.

## When This Action Runs

Manual or automated execution to pull externally hosted files into Nama attachment fields — for example, fetching images or documents referenced by a URL on a record (or its detail lines) into the corresponding attachment field.

## How It Works

1. **Reads both fields** (URL field and attachment field), so header and detail-line values are resolved into two parallel lists
2. **Validates compatibility** by requiring both fields to resolve to the same number of values; otherwise the action fails
3. **Skips values that should not change** — empty URLs are skipped, and non-empty attachments are skipped unless overwriting is enabled
4. **Downloads each file** via an HTTP GET request, streaming the response into the attachment and deriving the file name from the `Content-Disposition` header or, failing that, the URL path
5. **Creates or updates the attachment** — a new file is set on the holder when the attachment is empty, otherwise the existing attachment is updated in place
6. **Accumulates per-URL errors** so a single failed download is reported without aborting the remaining downloads

## Parameters

**Parameter 1:** URL Field Id (Required) - Field holding the source URL(s), header or detail (e.g., `description1` or `details.text1`)

**Parameter 2:** Target Attachment Field Id (Required) - Attachment field to fill (e.g., `attachment1` or `details.attachment`)

**Parameter 3:** Update Even If Not Empty (Optional) - "true" to overwrite the attachment every time; empty/"false" to only fill empty attachments

## Database Tables Affected

- **Source Entity** - Reads the URL field values and writes the downloaded files into the entity's attachment fields (header or detail lines)
- **External Systems** - Downloads files via HTTP GET from the specified URLs

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EADownloadURLsIntoAttachments`


</div>
