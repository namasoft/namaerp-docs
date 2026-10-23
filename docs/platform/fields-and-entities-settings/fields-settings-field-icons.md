---
description: "The Icons tab of Fields and Entities Settings: changing or adding the icon and colour shown for an entity type, an enum value or a single field, choosing an icon, the light and dark colour columns, and how your line overrides the built-in default."
entities: [GenericReferenceOverrider]
menu: Basic → Settings → Fields and Entities Settings
---

# Icons and Colours

Nama already ships an icon and a colour for most entity types and for the status values people meet
every day, so a user recognises a Sales Invoice, a Customer or an "Approved" status at a glance
without reading the label. The **Icons** tab — the fourth and last tab of the Fields and
Entities Settings screen — is where you change those defaults, or add an icon for something the
system has no opinion about: a document type your company uses constantly, a custom status value,
or the one field on a crowded screen that everybody keeps missing.

Three grids live on this tab, and all three feed the same visual system: one for whole entity types,
one for single values of a drop-down list, and one for individual fields.

![The Icons tab](../../ar/platform/images/fields-settings/fields-settings-icons-tab-en.png)

## Entity Icons

This grid attaches an icon and a colour to a whole entity type. Whatever you set here follows the
type everywhere it appears — in the menu, in list views, in search results, and in reference lookups
when a user is picking a record.

The usual reason to touch it is a type that matters a lot in your installation but shares a generic
icon with everything around it. If your operation lives on Stock Issue, give it a distinctive icon
and a strong colour, and it will stand out in the menu and in every selector that offers it.

| Column | What it does |
|---|---|
| Entity Type | The type the icon belongs to, for example Sales Invoice or Customer. Required. |
| Icon Code | The icon itself — pick it from the list the cell offers (see [Choosing an icon](#Choosing-an-icon) below). |
| Light Color Code | The colour used while the user is on the light theme. |
| Dark Color Code | The colour used while the user is on the dark theme. |

## Enum Icons

Some of the most useful icons are not on types at all — they are on the *values* of a drop-down
list. An approval status, a document state, a priority: a small coloured mark beside "Rejected"
tells a reviewer more in half a second than the word does. This grid gives one icon and one colour
to one value of one drop-down, and it shows up beside that value both inside the drop-down and in
grid cells that display it.

The two identifying columns work as a pair. **Enum Type** names the drop-down list itself, and
**Allowed Value** names the single option inside it. Fill in the type first: once it has a value,
the Allowed Value cell suggests exactly the options that list contains, so pick from the
suggestions rather than typing an option from memory — a value that does not belong to the chosen
list simply never matches anything at runtime.

| Column | What it does |
|---|---|
| Enum Type | The drop-down list whose values you are decorating. Choose from the suggestions. |
| Allowed Value | One option inside that list. Required. The suggestions appear once Enum Type is filled. |
| Icon Code | The icon shown next to that value. |
| Light Color Code | The colour used on the light theme. |
| Dark Color Code | The colour used on the dark theme. |

::: tip Do the whole set, not one value
Statuses read best as a family. If you colour "Approved" green, spend the extra two minutes on
"Rejected" and "Pending" as well — a screen where one value out of four is decorated looks like a
mistake rather than a system.
:::

## Field Icons

The last grid attaches an icon and a colour to a field label rather than to a record. It is the
answer to a screen that has grown busy: thirty fields, all typographically equal, and one of them —
the credit limit, the due date, the customer's blocked flag — is the one that actually decides what
the user does next. An icon in front of that label pulls the eye straight to it.

| Column | What it does |
|---|---|
| Entity Type | One type whose field you are decorating. |
| Entity Type List | A reusable named list of types, so one line covers several screens at once. |
| On Field | The field the icon sits on. The suggestions follow the type or list you chose. |
| Icon Code | The icon shown beside the field label. |
| Light Color Code | The colour used on the light theme. |
| Dark Color Code | The colour used on the dark theme. |

Leaving both Entity Type and Entity Type List empty makes the line generic — it decorates that field
on every screen that has it, which is what you usually want for a field like `remarks` or
`dueDate` that means the same thing everywhere. The general rules about generic versus
entity-specific lines are explained once on the
[overview page](/platform/fields-and-entities-settings/fields-settings-overview).

## How all three grids behave

The three grids differ only in what they point at. Everything below is true of all of them.

### Choosing an icon

You do not have to know icon names by heart. Every **Icon Code** cell opens a searchable list that
draws each candidate icon next to its name, so you can judge the picture rather than the word. Type
a few letters and the list narrows — it matches the icon's name and also the words the icon is
tagged with, so searching for "money" finds the icons a designer filed under money even when the
name is something else. Pick the one you like and the cell stores its code.

The list contains two families: Nama's own icon set, drawn for this system and covering ERP subjects
that a generic set has no picture for, and the standard Google Material icons for everything else.
Both behave identically once chosen.

### Two colour columns, one for each theme

**Light Color Code** is used when the user is on the light theme, **Dark Color Code** when they are
on the dark theme. Fill in both. A colour that reads beautifully on white — a mid grey, a soft
yellow — usually disappears entirely against a dark background, and the user on dark mode then sees
an icon they cannot make out at all.

Both columns are colour pickers, so you choose the colour visually rather than typing a code.

::: warning Contrast is the whole point
An icon exists to be spotted without effort. Aim for a colour with strong contrast against the
background it sits on — near-white in the light theme, near-black in the dark theme — rather than a
subtle tint that matches the screen's palette. A tasteful, low-contrast icon is an icon nobody
notices, which means the line you added is doing nothing.
:::

### Your line overrides the built-in default

The system builds its own icon and colour set first, then lays your lines on top of it. Where you
and the system point at the same thing, you win; where you say nothing, the built-in icon stays.
That means you never need to restate the defaults — add lines only for the things you actually want
to change, and the list stays short enough that a year from now someone can still see at a glance
what was customised and why.

### There are no other scope columns

Unlike most of the grids on the Main tab, the Icons grids have no **Applicable For** column and no
broader scoping beyond the entity type, entity type list and field shown above. What you see in the
tables on this page is the whole targeting story.

::: warning Users must sign out and back in
Icons and colours are browser-side settings — they are handed to the user's browser when the session
starts and cached there. A user who is already signed in keeps seeing the old icon no matter how many
times you save. They pick up the change after signing out and back in (or after a hard reload of the
page).
:::

::: tip Keep one field's settings in one record
Fields and Entities Settings is a master file, so there can be several records and all their active
lines are combined. That is convenient until two records both decorate the same type or the same
field — then which one wins is not something you can predict from reading them. Keep everything
about one target in one record.
:::

## Settings on this tab

Every grid and column this page covers, with its exact on-screen label in both languages, so you can find a setting by the name you see. The last column points to the section that explains it. The scope columns (For Type, Entity List, On Field and the like) are the same on every grid and are listed on the [overview page](/platform/fields-and-entities-settings/fields-settings-overview#Settings-on-this-tab).

| Field id | English label | Arabic label | Meaning |
|---|---|---|---|
| `entityIcons` | Entity Icons | Entity Icons | [Entity Icons](#Entity-Icons) |
| `entityIcons.iconCode` | Icon Code | كود الأيقونة | [Entity Icons](#Entity-Icons) |
| `entityIcons.lightColorCode` | Light Color Code | كود اللون في الوضع النهاري | [Entity Icons](#Entity-Icons) |
| `entityIcons.darkColorCode` | Dark Color Code | كود اللون في الوضع الداكن | [Entity Icons](#Entity-Icons) |
| `enumIcons` | Enum Icons | Enum Icons | [Enum Icons](#Enum-Icons) |
| `enumIcons.enumType` | Enum Type | Enum Type | [Enum Icons](#Enum-Icons) |
| `enumIcons.allowedValue` | Allowed Value | القيمة المسموح بها | [Enum Icons](#Enum-Icons) |
| `enumIcons.iconCode` | Icon Code | كود الأيقونة | [Enum Icons](#Enum-Icons) |
| `enumIcons.lightColorCode` | Light Color Code | كود اللون في الوضع النهاري | [Enum Icons](#Enum-Icons) |
| `enumIcons.darkColorCode` | Dark Color Code | كود اللون في الوضع الداكن | [Enum Icons](#Enum-Icons) |
| `fieldIcons` | Field Icons | Field Icons | [Field Icons](#Field-Icons) |
| `fieldIcons.iconCode` | Icon Code | كود الأيقونة | [Field Icons](#Field-Icons) |
| `fieldIcons.lightColorCode` | Light Color Code | كود اللون في الوضع النهاري | [Field Icons](#Field-Icons) |
| `fieldIcons.darkColorCode` | Dark Color Code | كود اللون في الوضع الداكن | [Field Icons](#Field-Icons) |

## Related pages

- [Fields and Entities Settings — Overview](/platform/fields-and-entities-settings/fields-settings-overview) — the scope columns, how lines are matched, and what the rest of the screen does.
- [Field Appearance](/platform/fields-and-entities-settings/fields-settings-field-appearance) — the other half of making a screen readable: display masks, field styles and colours on the field itself.
- [Appearance](/platform/global-config/global-config-appearance) — system-wide look and feel, including the themes these two colour columns are written for.
- [Screen Modifier — Edit-Screen Modifications](/platform/screen-modifier/screen-modifier-edit-screen) — when a field needs more than an icon and should be moved, renamed or hidden instead.
