---
entities: [ScreenModifier]
menu: Administration → Display Customization → Screen Modifier
---
# Screen Modifier — List View & Selector Pop-up

Besides edit screens, a Screen Modifier can reshape the two places where records are *listed*:

- the **List View** — the full grid you open to browse, filter and manage records of a type, and
- the **Selector Pop-up** (the searcher) — the smaller pop-up that appears when you pick a value for a reference field on another screen.

The two are configured by parallel sets of collections: the list-view ones, and a matching set prefixed with *Search* for the selector pop-up. They work the same way, so once you understand one you understand both.

As on the edit screen, you enter each column or field by its **field id** (property path, e.g. `customer.name`), not its label, and suggestions are scoped to the type(s) in *For Type* / *For Type List*.

## Replace or add — the modification type

Several of these collections come with a companion **modification type** that decides how your list of columns/fields interacts with the ones already there:

- **Override Existing (Remove Existing)** — discard the current set entirely and use *only* what you list. Choose this to take full control of, say, the displayed columns.
- **Add To Existing** — keep the current set and append yours to it.

You will see this choice on display columns, criteria, sorting and the search-for fields, each with its own modification-type field.

## List View

![Screen Modifier — List View Modification tab](../../ar/platform/screen-modifier/images/screen-modifier-list-view-tab-en.png)

| Setting | What it controls |
| --- | --- |
| **Display Columns** + *Display Modify Type* | The columns shown in the list grid, their order and placement (relative to an existing column). |
| **Criteria Fields** + *Criteria Modify Type* | The fields offered as filters in the list's search panel. |
| **Sort Fields** + *Sort Modify Type* | The fields the list is sorted by. |
| **Default Sort Type** | Whether the default sort is **Ascending** or **Descending**. |
| **Default Selector Popup Sort Type** | The same Ascending/Descending choice, but for the selector pop-up. |
| **Quick Filter** | One-click filters shown above the list so users can narrow it without building a filter by hand. Each line either generates value buttons automatically from a chosen column's most common values, or links to a separately defined custom criteria; the buttons can render as chips or as a dropdown. |
| **Template Columns** | **Computed columns** — extra columns whose values are calculated from a template rather than read straight from a single field. |
| **List View Default Page Size** | How many rows the list loads per page by default — one of the fixed choices **25, 50, 75, 100 or All**. |
| **List View** *(width)* | The default width of the list grid. |
| **List View Default Criteria** | A criteria definition applied automatically whenever the list opens, so users start from a pre-filtered view. |
| **List View Always Apply Default Criteria** | Re-applies the **List View Default Criteria** every time the list is opened, discarding whatever filter the user last left behind. Only meaningful when a default criteria is set — it stops users from getting stuck on a stale filter from a previous visit. |
| **List View Prevent Auto Load** | Stops the list from loading automatically when it opens. The grid stays empty — with a reminder to add a filter — until the user types a filter and searches (or presses Refresh). Useful for very large lists where an unfiltered load would be slow. |

## Selector Pop-up (the searcher)

These mirror the list-view settings, but apply to the pop-up used to pick a reference value:

![Screen Modifier — Search View Modify tab](../../ar/platform/screen-modifier/images/screen-modifier-search-view-tab-en.png)

| Setting | What it controls |
| --- | --- |
| **Search Display Columns** + *Search Display Modify Type* | The columns shown in the selector pop-up. |
| **Search Criteria Fields** + *Search Criteria Modify Type* | The filter fields available inside the pop-up. |
| **Search Sort Fields** + *Search Sort Modify Type* | The sort order in the pop-up. |
| **Criteria Fields (Used For "Search For")** + *Search For Modify Type* | The fields covered by the pop-up's single free-text **Search For** box — i.e. which columns a typed search term is matched against. |
| **Search Quick Filter** | The same quick filters, for the selector pop-up. |
| **Searcher Template Columns** | Computed columns for the selector pop-up. |
| **Searcher Default Page Size** | Rows per page in the pop-up — the same fixed choices **25, 50, 75, 100 or All**. |
| **Search View** *(width)* | The default width of the selector pop-up. |
| **Search View Default Criteria** | A criteria definition applied automatically every time the pop-up opens. |
| **Searcher Prevent Auto Load** | Stops the selector pop-up from listing anything when it first opens; no rows appear until the user types a search term or filter and searches. Handy for reference types with very many records, where an immediate unfiltered load would be slow. |

### Showing a pop-up column only for some lookups

The same pop-up serves every lookup of a type: the item pop-up opens from the sales invoice, the stock issue,
the price list and dozens of other screens. Sometimes a column only makes sense from one of them — the
item's barcode when picking items on a sales invoice, say, and nowhere else. The **Default Columns
Visibility Control** grid does this:

1. In **Search Display Columns**, tick **Enable Visibility Control By Type And Field** on the column.
2. In **Default Columns Visibility Control**, add a line for that **Column** with the **Searched From Type**
   (the screen the lookup is opened from), the **Searched From Field** (the lookup field on it), or both,
   and set **Visibility** to **Visible** or **Hidden**.

A controlled column is **hidden unless a line matches** the lookup being opened. When several lines match,
the most specific wins: a line naming both type and field, then one naming the field only, then one naming
the type only. Columns without the tick are not affected.

These three refusals come from this grid. They have no Arabic text and appear in English on Arabic screens too:

| Message | Why | What to do |
|---|---|---|
| *You must specify the searched from type or the searched from field, line {0}* | A visibility line names neither a type nor a field. | Fill **Searched From Type**, **Searched From Field** or both. |
| *You must enable the visibility control for column {0}, line {1}* | The column has visibility lines, but its box in Search Display Columns is not ticked. | Tick **Enable Visibility Control By Type And Field** on that column. |
| *You must add at least one line to control the visibility of column {0}, line {1}* | The column is ticked but has no visibility line. | Add a line for it, or untick the box. |

::: tip
You don't have to type every column id by hand. The Screen Modifier toolbar has **Select … Fields** actions (Select Display Columns Fields, Select Search For Fields, Select Criteria Fields, Select Sort Fields, and their search-side equivalents) that open a field picker for the target type and fill the matching collection for you.
:::

## Reference columns (code, name and image)

When a column points at a **reference** (for example `lines.account`), you usually want to show something *about* that reference. Append a suffix to the column's field id to surface it as its own column:

- **`.code`** — the reference's code. Example: `lines.account.code`
- **`.name`** — the reference's name. Example: `lines.account.name`
- **`.image`** — the reference's image. Example: `lines.account.image`

These suffixes work anywhere you enter a column id — list display columns, search display columns, and grid columns on the edit screen alike.

## See also

- **[Overview & Concepts](/platform/screen-modifier/screen-modifier-overview.md)** — applicability, priority, and how to make changes take effect.
- **[Edit-Screen Modifications](/platform/screen-modifier/screen-modifier-edit-screen.md)** — for changes to the single-record edit screen.
- **[Quick Filters](/platform/list-views/quick-filters.md)** — more on building the quick-filter chips referenced above.
