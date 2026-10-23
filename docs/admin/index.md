---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: System Administration
description: "Landing page for system administration: troubleshooting pages, reprocessing and repair utilities, administration screens, and messaging tools such as the Tempo language."
---

# System Administration

This is the toolkit for keeping a Nama ERP installation healthy. When something goes wrong — a screen hangs, numbers don't add up, costs look off — this is where you find the answers and the queries to fix them. You'll also find the Tempo language manual for crafting dynamic messages, and a deep set of reprocessing utilities for putting inventory, accounting, and module data back in order when it drifts.

## Troubleshooting

When the system misbehaves, start here. These pages walk through diagnosing hangs and answer the questions that come up most often.

<LandingGrid>
  <LandingCard icon="🩺" title="Troubleshooting" link="/admin/troubleshooting/" details="Diagnose system hangs and unresponsiveness, plus general and database-error FAQs all in one place." />
  <LandingCard icon="🚨" title="Critical Errors at Login" link="/admin/troubleshooting/critical-errors.md" details="The red list of health checks shown at login: every check, what raises it, and what to do about it." />
  <LandingCard icon="🐢" title="When the System Is Slow" link="/admin/troubleshooting/system-is-slow.md" details="What to check when users say everything is slow: running reports, background jobs, searching and the database." />
  <LandingCard icon="⏳" title="System Hanging or Unresponsiveness" link="/admin/troubleshooting/troubleshooting-system-hanging.md" details="Track down why the system freezes or stops responding and how to recover." />
  <LandingCard icon="❓" title="General FAQ" link="/admin/troubleshooting/general-faq.md" details="Answers to the everyday questions administrators ask about running Nama ERP." />
</LandingGrid>

## Reprocessing & Utilities

When stored figures fall out of sync, these utilities recompute them and offer ready-made SQL queries to detect and fix problems across inventory, accounting, manufacturing, fixed assets, and more.

<LandingGrid>
  <LandingCard icon="🔁" title="Reprocessing Transactions" link="/admin/reprocessing/" details="The full collection of reprocessing tools and utility queries for repairing data across modules." />
  <LandingCard icon="📦" title="Quantity, Cost & Stock Ages" link="/admin/reprocessing/reprocess-qty-and-cost.md" details="Recompute inventory quantities, costs, and stock ages when they drift." />
  <LandingCard icon="📒" title="Ledger & Debt Ages Reprocessing" link="/admin/reprocessing/reprocess-ledger-and-debt-ages.md" details="Accounting utilities for reprocessing the ledger and debt ages." />
  <LandingCard icon="🔍" title="Cost & Qty Problem Queries" link="/admin/reprocessing/cost-and-qty-problems.md" details="Queries to detect and fix cost and quantity discrepancies." />
  <LandingCard icon="🏬" title="Inventory Utility Queries" link="/admin/reprocessing/inventory-utilities.md" details="Inventory-related utility queries for investigation and cleanup." />
  <LandingCard icon="🏭" title="Manufacturing Utilities" link="/admin/reprocessing/manufacturing-utilities.md" details="Utility queries for the manufacturing module." />
  <LandingCard icon="🏗️" title="Fixed Assets Utilities" link="/admin/reprocessing/fixed-asset-utilities.md" details="Utility queries for the fixed assets module." />
  <LandingCard icon="🏠" title="Real Estate Utilities" link="/admin/reprocessing/real-estate-utilities.md" details="Utility queries for the real estate module." />
  <LandingCard icon="⚙️" title="Database Operations" link="/admin/reprocessing/db-operations.md" details="Database-related operations for maintaining the installation." />
  <LandingCard icon="🚀" title="Suggest Indexes for Detail Tables" link="/admin/reprocessing/suggest-index-creation.md" details="Suggest indexes to speed up large detail tables." />
  <LandingCard icon="🧰" title="General Purpose Utility Queries" link="/admin/reprocessing/general-purpose-utility-queries.md" details="A grab-bag of general-purpose utility queries." />
  <LandingCard icon="🔗" title="Replication Utilities" link="/admin/reprocessing/replication.md" details="Utilities for working with database replication." />
  <LandingCard icon="📄" title="Batch Utilities From a List File" link="/admin/reprocessing/batch-utilities-from-file.md" details="Recommit, delete, re-replicate or export a list of records read from a file." />
  <LandingCard icon="🧱" title="Rebuilding Module System Entries" link="/admin/reprocessing/module-entries-rebuild-utilities.md" details="Rebuild the real estate, HR, service center and fixed asset histories from the documents." />
  <LandingCard icon="✅" title="Approval Repair Utilities" link="/admin/reprocessing/approval-repair-utilities.md" details="Refresh approval summaries and clear stale pending approvals." />
</LandingGrid>

## Administration Screens

The settings and security screens an administrator reaches for when something is missing, slow or capped for a whole company.

<LandingGrid>
  <LandingCard icon="🗂️" title="System Settings, Configuration Group and Edit File" link="/admin/system-settings-and-configuration-group.md" details="Where every module's settings record lives, the one group that hides screens and features for every company, and the raw layout file editor." />
  <LandingCard icon="🔎" title="Options Search" link="/admin/options-search.md" details="Type a word and find every document term option, module setting and configuration field that holds it, with a link straight to the field." />
  <LandingCard icon="⚡" title="Performance Optimizer" link="/admin/performance-optimizer.md" details="Speed up busy lists and lookups by dropping chosen dimension or view-capability checks for chosen record types or users." />
  <LandingCard icon="🔢" title="Users Counter and Capability Types" link="/admin/users-counter-and-security-capabilities.md" details="Cap how many users from one group may be signed in at once, and create your own named capabilities to lock records, reports and prices." />
  <LandingCard icon="⌨️" title="Shortcuts Definition and User Favourites" link="/admin/shortcuts-and-user-favourites.md" details="Which keyboard map each user gets, global keys that open a list, a new record or a link, and how each user's Favourites menu is built." />
  <LandingCard icon="🔑" title="OAuth Files" link="/admin/oauth-files.md" details="Authorise a Google account once so Nama can send mail through Gmail and check or clean backups on Google Drive." />
  <LandingCard icon="🌙" title="Hijri Table" link="/admin/hijri-table.md" details="Enter the official Hijri month lengths that every Hijri date, Hijri contract and Eltezam submission is converted through." />
  <LandingCard icon="🧙" title="Wizard File" link="/admin/wizard-file.md" details="The record that holds the setup wizard's answers — open the wizard from it, save part-way, and apply all of it or only chosen areas." />
  <LandingCard icon="📝" title="Submitting Development Requests" link="/admin/dev-request-guidelines.md" details="What support and setup staff check and attach before raising a new-feature or bug-fix request with Namasoft." />
</LandingGrid>

## Messaging Tools

<LandingGrid>
  <LandingCard icon="📨" title="Tempo Language Manual" link="/admin/tempo.md" details="Build dynamic notifications, emails, SMS, and validation messages with embedded record values." />
</LandingGrid>
