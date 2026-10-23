---
title: EASubmitEltezamData
module: integrations
entities: [EntityFlow]
---


<div class='entity-flows'>

# EASubmitEltezamData

## Overview

Sends Eltezam data to the MCS server from a task schedule. Given the codes of committed MCS Eltezam Submission documents, it sends each of them exactly as the post-commit flow [EASendEltezamSubmissionDoc](EASendEltezamSubmissionDoc.md) would. Given no documents, it creates and commits a new submission document for the employees of the Eltezam Configuration's employee group, then sends it. See [Eltezam Submissions and Sending](/modules/integrations/eltezam/eltezam-submissions-and-sending).

## When This Action Runs

From a Task Schedule of type **Action**, for sending at night or re-sending on demand. Two runs cannot overlap.

## How It Works

1. **Checks the parameters** - The server is required. If a configuration code is given but no configuration has it, the run fails. Any HR Period or HR Year code given must exist.
2. **With document codes** (parameter 3):
   - Finds each listed submission. A code that is not found, or a submission that is still a draft, fails the run before anything is sent.
   - For each submission, uses the configuration from parameter 1 instead of the document's when one is given, combines the period parameters with the document's own period (each filled parameter wins), then clears the document's previous request log and sends its employee lines. The document's grid, counts and request log are updated.
3. **Without document codes** - Creates a new submission document dated today for the configuration in parameter 1, with the period from parameters 4 to 7, in the book given as parameter 8 (or the first book of the submission document when parameter 8 is empty). Committing it fills its employee lines from the configuration's employee group; it is then sent like the documents above. The document is created and sent in a transaction of its own, so it and its request log are kept even when the run ends as a failure. If the document cannot be committed, nothing is sent.
4. **Stops if the server is down** - After three technical failures in a row it stops sending and reports that it stopped.

## Parameters

**Parameter 1:** Eltezam Configuration Code (Can be Empty when documents are given) - The configuration to send with. Required when parameter 3 is empty.

**Parameter 2:** MCS Server (IP, host or full URL) (Required) - Where to send. A full URL is used as it is; a bare host or IP keeps the scheme and path of the configuration's Service URL and replaces only the host.

**Parameter 3:** Eltezam Submission Document Codes (Comma Separated, Can be Empty) - The committed submissions to send, for example `EZS-0012, EZS-0013`.

**Parameter 4:** From Date (yyyy-MM-dd, Can be Empty) - Start of the period, for example `2026-01-01`.

**Parameter 5:** To Date (yyyy-MM-dd, Can be Empty) - End of the period.

**Parameter 6:** HR Period Code (Can be Empty) - The HR Period to send.

**Parameter 7:** HR Year Code (Can be Empty) - The HR Year to send. When From Date or To Date is empty, the HR Year's start or end date takes its place.

**Parameter 8:** Book Code of the Created Eltezam Submission Document (Can be Empty) - The book of the document created when parameter 3 is empty. When empty, the first book of the MCS Eltezam Submission document is used; the run fails if there is none.

## Important Notes

- Whatever is sent is always shown on a submission document: the documents given in parameter 3, or the one the run created.
- In the task schedule's **Class Name**, write the full class name below; the short name alone is not found.

**Module:** integrations

**Full Class Name:** `com.namasoft.modules.integrations.utils.actions.EASubmitEltezamData`

## Related Actions

- [EASendEltezamSubmissionDoc](EASendEltezamSubmissionDoc.md)
- [EACreateEltezamCodeTables](EACreateEltezamCodeTables.md)


</div>
