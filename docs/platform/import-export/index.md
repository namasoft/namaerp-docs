---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Importing & Exporting Records
description: "Landing page for exporting records to Excel and importing them back to create or update records, with links to saved import and export definitions and custom sheets."
---

# Importing & Exporting Records

Almost every implementation starts the same way: the customer has years of data sitting in spreadsheets, and it needs to end up in the system. And almost every month afterwards, somebody needs the opposite — a few hundred records pulled back out into Excel so they can be checked, corrected in bulk, and pushed back in.

Nama handles both directions with the same file. When you export records you don't get a pretty report; you get a workbook that the system knows how to read again. Export a hundred sales invoices, fix the salesman on forty of them, upload the same file, and those forty are updated. That round trip is the heart of this whole area, and it is the reason the exported sheet looks the way it does — with its odd `//` rows and `:-record:` markers.

Start with exporting, because an exported file is also the best template you will ever have for an import.

## Everyday Use

<LandingGrid>
  <LandingCard icon="📤" title="Exporting Records" link="/platform/import-export/exporting-records.md" details="The four export commands, every option in the export dialog, and where the finished file lands." />
  <LandingCard icon="📥" title="Importing Records" link="/platform/import-export/importing-records.md" details="Upload a workbook to add or update records, how references are matched, and how to read the errors that come back." />
  <LandingCard icon="🧩" title="Anatomy of the Export File" link="/platform/import-export/export-file-format.md" details="What every marker row, suffix and detail sheet in the workbook means — the reference you need before hand-writing an import file." />
</LandingGrid>

## Saved Definitions & Custom Sheets

<LandingGrid>
  <LandingCard icon="🗂️" title="Files Export / Import Menu" link="/platform/import-export/files-export-import-menu.md" details="Save an export or import as a reusable definition, and design your own Excel sheet with custom columns, formulas and totals." />
  <LandingCard icon="🛠️" title="Advanced Record Import" link="/platform/import-export/advanced-record-import.md" details="Map a supplier's or a legacy system's spreadsheet — one you cannot reshape — onto Nama records, column by column." />
</LandingGrid>

::: tip Looking for something else?
Pulling data in automatically on a schedule, or straight from a SQL query, is the job of an [entity flow](/platform/entity-flows/excel-and-sql-import-by-entity-flow.md) rather than the manual import described here. And if you are trying to save a **report** as a spreadsheet, that is a different mechanism entirely — see [Reports in the global configuration](/platform/global-config/global-config-reports.md).
:::
