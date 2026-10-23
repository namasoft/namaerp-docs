---
description: "The five Machine Classification files (1 to 5) in CRM maintenance: what is on the screen, where they appear on machines, renaming their captions and filtering by them."
entities: [MnClassification1, MnClassification2, MnClassification3, MnClassification4, MnClassification5]
---
# Machine Classifications

Every maintenance business slices its equipment in a way nobody else does. Al Nokhba cares which units are **critical** — the ones that must never be down, because a hotel without chillers empties in an afternoon — and which are installed **outdoors**, because those need a different inspection in the summer. A lift company would care about rope type and travel height. A generator company would care about fuel and duty rating.

Rather than guess, the maintenance suite ships **five empty classification files** and lets each site decide what they mean.

::: info Required licence
`crm-maintenance`. The five screens are under **Customer Relationship Management → Maintenance Files**, named **Machine Classification1** to **Machine Classification5** (تصنيف آلة1 إلى تصنيف آلة5).
:::

## What Is on the Screen

Almost nothing, and that is deliberate. Each of the five files has the standard master-file fields only: code, group, Arabic name, English name, and the dimensions group. There is nothing else to fill in and nothing to configure.

Al Nokhba uses two of the five and leaves the rest empty:

| File | Code | Name |
|---|---|---|
| Machine Classification1 | `MC1-CRIT` | معدات حرجة / Critical Equipment |
| Machine Classification2 | `MC2-ROOF` | تركيب خارجي / Outdoor Installation |

All three Marina Plaza units are tagged `MC1-CRIT`; the two roof-mounted chillers are also `MC2-ROOF`.

Using two of five is normal. There is no penalty for leaving three files empty, and there is no way to add a sixth, so pick the five distinctions that matter most to the business and stop there.

## Where They Show Up

The five classifications appear on far more screens than their modest master files suggest:

- On the [machine record](/modules/crm/maintenance-setup/crm-machines) itself, and on the [machine update document](/modules/crm/maintenance-cycle/crm-machine-updates-and-transfers).
- On the machine lines of virtually every maintenance document — contracts, sales quotations and orders, work plans, notices, orders and invoices.
- On the header of the technician's execution sheet.

Some of that is filled in for you. When a machine goes onto a **notice**, or when an **execution sheet** is created, the machine's five classifications are copied across with its location. Order lines are the exception — the classifications are on the line, but nothing copies them there automatically, so they are yours to fill in if you want them.

## Renaming the Captions

Out of the box the five fields are labelled *Machine Classification1* to *Machine Classification5* — which tells a technician nothing. Renaming them so they read *Criticality* and *Installation Type* is normal and expected, and it is done with the platform's **Translation Change File** (ملف تغيير الترجمة) or a screen modifier, exactly as any other field caption is renamed.

There is no maintenance-specific setting for this, and that is not an oversight — it is how caption changes work everywhere in the system. Ask whoever configures your installation to make the change once; it then applies on every screen the fields appear on, in both languages.

::: tip Rename before you populate
Decide what the five mean, rename the captions, and only then start tagging machines. Sites that populate first and rename later end up with classification 3 holding two different ideas because the person entering data in month two guessed differently from the person in month one.
:::

## What You Get Out of Them

Classifications are **filter and search criteria**. Every screen that carries them lets you filter and search on them: find all critical equipment for a customer, list every outdoor unit, narrow a machine list before exporting it.

What they are not is a reporting dimension in the analytical sense. As with the rest of this module, **no report and no dashboard exists that groups or totals anything by classification** — there are no CRM system reports at all. What you have is the list screens with their filters, Excel export, and BI if you want a proper cross-tab.

They also drive no behaviour whatsoever. Tagging a machine as critical does not change a priority, shorten a response time, alter a price or raise an alert. Nothing in the module reads a classification and acts on it. They are labels — very useful labels, if you name them well and apply them consistently, but labels.
