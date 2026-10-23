---
description: "Two admin utilities that repair stale approval cases: Regenerate Approvals Summary rewrites the summaries of in-progress cases, and Remove Zombie Approvals clears pending approvals left behind by deleted or already committed records."
---
# Approval Repair Utilities

Every record that waits for approval has an **approval case** behind it. The case carries two things that approvers see without opening the record: a **summary** of what is being approved, and the list of **next candidates** — the people whose pending approvals show it. Both are written when the case moves forward, so they can go stale: a summary template changed after hundreds of cases were opened still shows the old wording on those cases, and a record that was deleted or committed by another route can stay in somebody's pending list long after there is nothing left to approve.

The two utilities on this page fix exactly those two things. Neither one approves, rejects or changes a record.

## Before you run them

Only the `admin` user or a user with **Allow Access to Admin Restricted Functionality (utils.html, kill tasks, logout users and so on)** can open the links, and each link is built with the launcher described under [Launcher links on these pages](/admin/reprocessing/#Launcher-links-on-these-pages). Both report *Done on* and the date and time when they finish. Neither needs downtime or a backup in the way a rebuild does, and both can be run as often as needed.

## Regenerate Approvals Summary

Writes the summary of every **in-progress** approval case again, using its approval definition as it is now — the summary template and summary query if the definition has them, otherwise the record's own default summary (see [Approval Summary Configuration](/platform/approvals/approvals-system#Approval-Summary-Configuration)). Run it after changing a definition's summary template or query, so the cases already waiting show the new summary too. Finished and cancelled cases keep the summary they had.

<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.common.approval.RecalcSummaryUtil"
/>

## Remove Zombie Approvals

Goes through every approval case that still has next candidates and empties that list when there is no longer anything to approve:

- the case is no longer in progress;
- the record it was approving no longer exists;
- the record has moved on to a different approval case;
- the record is a document that is already committed.

Run it when users see entries in their pending approvals that open onto a deleted record, or onto one that was finished long ago. Cases still genuinely waiting are left alone, so the run is safe to repeat.

<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.common.approval.FixZombieApprovalUtil"
/>

## Related pages

- [Approvals System](/platform/approvals/approvals-system)
- [Batch Utilities That Work From a List File](/admin/reprocessing/batch-utilities-from-file.md)
- [Rebuilding Module System Entries](/admin/reprocessing/module-entries-rebuild-utilities.md)
