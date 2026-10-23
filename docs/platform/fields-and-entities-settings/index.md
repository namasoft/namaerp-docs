---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Fields and Entities Settings
description: "Landing page for the Fields and Entities Settings screen (Basic → Settings), where administrators change how fields, reference lookups and screens behave, with links to each group of grids."
---

# Fields and Entities Settings

Every organisation wants the system to behave slightly differently. One wants customer codes that
always start with `CU-`. Another wants the mobile number on the customer screen to be clickable so
the sales team can dial it. A third wants the item lookup on a sales invoice to offer only the items
that are actually for sale, and a fourth wants overdue invoices to show up red in the list.

None of that needs a programmer. It all lives on one screen — **Fields and Entities Settings**,
reached from **Basic → Settings** — where an administrator writes a line describing the behaviour
they want and which field or screen it applies to. The screen carries around forty of these settings
grids, which is why the documentation is split across the pages below rather than crammed into one.

If you are new to this screen, start with the overview: it explains the handful of columns that
appear on nearly every grid, and — just as importantly — when a change you save actually becomes
visible to users.

<LandingGrid>
  <LandingCard icon="🧭" title="How It Works" link="/platform/fields-and-entities-settings/fields-settings-overview.md" details="The scope columns every grid shares, how a line is matched, when changes take effect, and a map of all the settings grids." />
</LandingGrid>

## Fields on the Screen

How a field looks, what tool the user gets to fill it in, and what the system accepts when they do.

<LandingGrid>
  <LandingCard icon="🎨" title="Field Appearance and Input Widgets" link="/platform/fields-and-entities-settings/fields-settings-field-appearance.md" details="Number masks, colours and text direction, rich-text editors, clickable phone and e-mail fields, signature pads, and scanner buttons." />
  <LandingCard icon="✨" title="Icons and Colours" link="/platform/fields-and-entities-settings/fields-settings-field-icons.md" details="The Icons tab — icons and light/dark colours for record types, drop-down values, and individual fields." />
  <LandingCard icon="🛑" title="Input Rules and Limits" link="/platform/fields-and-entities-settings/fields-settings-input-validation.md" details="Required formats and patterns, picklists of allowed values, read-only fields, row limits, and maximum field lengths." />
</LandingGrid>

## Finding and Naming Records

Everything about the fields that point at other records, and how those records are searched, filtered
and labelled.

<LandingGrid>
  <LandingCard icon="🔎" title="Reference Fields and Lookups" link="/platform/fields-and-entities-settings/fields-settings-reference-lookups.md" details="Which types a lookup offers, extra filters, how a record is labelled, extra searchable columns and codes, search speed, and what happens when nothing matches." />
  <LandingCard icon="🔢" title="Automatic Coding of Master Files" link="/platform/fields-and-entities-settings/fields-settings-auto-coding.md" details="Build the code and names of customers, items and suppliers from a formula, with running numbers and branch prefixes." />
</LandingGrid>

## Showing More Than the Record Holds

<LandingGrid>
  <LandingCard icon="🧮" title="Calculated Fields and Row Colouring" link="/platform/fields-and-entities-settings/fields-settings-calculated-fields.md" details="Attach a query to a screen so extra information appears as an ordinary field or column, and colour whole rows by rule." />
</LandingGrid>

## Records, Screens and the Outside World

<LandingGrid>
  <LandingCard icon="🧩" title="Record Behaviour and Screen Blocks" link="/platform/fields-and-entities-settings/fields-settings-record-behaviour.md" details="What is cleared when a record is duplicated, detailed field auditing, discussion and related-document panels, and e-mail recipient types." />
  <LandingCard icon="🔓" title="Lifting Built-in Restrictions" link="/platform/fields-and-entities-settings/fields-settings-relaxing-restrictions.md" details="Allow blocked records on specific fields, relax the dimension consistency check, and make a record type public across all dimensions." />
  <LandingCard icon="🔌" title="Integrators and Public Links" link="/platform/fields-and-entities-settings/fields-settings-integrations.md" details="Named web addresses that let external systems create, update or import records, and public links that hand a customer their own invoice." />
</LandingGrid>

## Related Tools

<LandingGrid>
  <LandingCard icon="🎚️" title="Screen Modifier" link="/platform/screen-modifier/" details="This screen changes how fields behave; Screen Modifier changes where they appear — rearranging, hiding and renaming what is on a screen." />
  <LandingCard icon="🔐" title="Security & Permissions" link="/platform/security/" details="Read-only fields here are a convenience; real enforcement of who may see or change a field belongs to security." />
  <LandingCard icon="⚙️" title="Global Configuration" link="/platform/global-config/" details="System-wide defaults that these per-field settings override." />
</LandingGrid>
