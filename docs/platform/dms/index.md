---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Document Management
description: "Landing page for Document Management, the register of physical paperwork and its scans: overview, filing structure, archived documents, check-in and check-out movements and ZIP import."
---

# Document Management

The Document Management System is the register of the paperwork a business cannot throw away —
signed contracts, commercial registrations, title deeds — and of who holds each original. The
[overview](/platform/dms/dms-overview) explains the idea and walks through its seven screens.

## Start Here

The shape of the sub-module, and the order to build a fresh installation in.

<LandingGrid>
  <LandingCard icon="🗄️" title="Document Management Overview" link="/platform/dms/dms-overview.md" details="The seven screens, the two halves they divide into, the licence, and an honest list of what this sub-module does not do." />
  <LandingCard icon="🗂️" title="Archives, Folders and Topics" link="/platform/dms/dms-filing-structure.md" details="The filing structure you build once — including the one switch that decides whether a folder holds documents or other folders." />
</LandingGrid>

## Everyday Use

Registering paperwork, finding it again, and keeping track of who has it.

<LandingGrid>
  <LandingCard icon="📄" title="Archived Documents" link="/platform/dms/dms-documents.md" details="The document record itself: filing, owners, attached scans, states, copies, and the four ways to find something again." />
  <LandingCard icon="🔁" title="Checking Documents In and Out" link="/platform/dms/dms-movements.md" details="The movement voucher — the four types, what committing really changes, and why a transfer needs a manual follow-up." />
  <LandingCard icon="📦" title="Loading an Archive from a ZIP File" link="/platform/dms/dms-bulk-import.md" details="Turning one compressed file into hundreds of documents, and which columns reach the created documents." />
</LandingGrid>

## Setup

<LandingGrid>
  <LandingCard icon="⚙️" title="Settings and Integration" link="/platform/dms/dms-configuration.md" details="The three DMS settings, the storage and scanning options that matter for an archive, security, and reaching DMS from other screens." />
</LandingGrid>

::: tip Looking for something else?
Attaching a file to an ordinary record — an invoice, a customer — is not DMS at all; that is the
standard attachment field, configured in
[Attachments and Storage](/platform/global-config/global-config-attachments.md) and per field in
[Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-field-appearance.md).
And if you are looking for a way to delete old records rather than file them, that is data purging,
covered under [year-end and period control](/modules/accounting/ledger-setup/year-end-and-period-control.md) —
a different thing entirely, despite the similar vocabulary.
:::
