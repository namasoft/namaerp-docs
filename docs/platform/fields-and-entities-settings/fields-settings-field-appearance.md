---
description: "Fields and Entities Settings grids that change how fields are drawn: display masks, field styles, rich text, text-to-link, colour fields, signatures and scanner input, seen after users sign in again."
entities: [GenericReferenceOverrider]
menu: Basic → Settings → Fields and Entities Settings
---

# Field Appearance and Input Widgets

A number is a number and a piece of text is a piece of text — but `1250000` and `1,250,000` are very different things to read at a glance, and a mobile number you can tap to dial saves a user from copying digits by hand. The seven grids on this page all deal with that difference. None of them changes what is **stored** in the database; they change how a field is **drawn** on screen and what tool the user gets to fill it in.

Because presentation is decided by the browser rather than the server, everything here lands in one place: the user's session.

::: warning Users must sign out and back in
All seven grids on this page are browser-side. After you save your changes, a user who is already signed in keeps seeing the old appearance until they **sign out and sign back in** (or force a hard reload of the page). This catches people out constantly — test your line in a fresh session before concluding it does not work.
:::

Every grid below starts with the same scope columns — **For Type**, **Entity List** and **On Field** — which decide *which* screens and *which* field the line applies to, and which are explained in full on the [overview page](/platform/fields-and-entities-settings/fields-settings-overview). The tables here repeat them briefly and then concentrate on the columns that are unique to each grid.

## Display Masks

Financial screens are read, not just filled in. A total of `1250000.5` is technically correct and practically useless — the eye has to count digits. A display mask solves this by formatting the value as it is drawn, while the number kept in the database stays exactly what it always was. Nothing is rounded, nothing is truncated; only the rendering changes.

The classic use is on document totals and grid amount columns. On a Sales Invoice, a mask of `##,#` on the net total turns `1250000` into `1,250,000`; a mask of `##.00` on a unit price forces two decimals so `12.5` shows as `12.50` and lines up with the rest of the column; a mask of `c` renders the value as currency.

| Column | What it does |
|---|---|
| For Type | The entity type the line applies to (for example Sales Invoice). |
| Entity List | A named list of entity types, so one line covers several at once. |
| On Field | The field ID to format, for example `netValue`, `details.quantity`. |
| Display Mask | The format string read by the older screens. |
| Display Mask (G2) | The format string read by the current screens. |

::: warning Fill in both mask columns
There are two mask columns because the older interface and the current interface read different ones. If you fill in only one, the other interface shows the field completely unformatted and users will report the setting as "not working" from whichever screen they happen to be on. Unless you are deliberately formatting one interface differently, put the **same mask in both columns**.
:::

Display Masks is also the one grid on this whole screen with a **recursive wildcard lookup**. When the system needs a mask for `details.quantity` it tries, in order:

1. `details.quantity` — the exact field,
2. `details.*` — any field inside the `details` grid,
3. `*` — any field at all.

The first line it finds wins. That makes a single line with `details.*` in the On Field column enough to format **every** numeric column of that grid at once, which is usually what you want on a document with a wide detail grid. It also means a `*` line is a genuinely global default — use it deliberately, because it reaches every screen in the system.

::: tip Start narrow, then widen
Set the mask on one specific field first and confirm it renders the way you expect. Only then replace it with a `details.*` or `*` line. Debugging a wildcard that is quietly winning over the exact field you meant to change is far harder than building up from a single field.
:::

## Field Styles

Some fields need a fixed look no matter who is typing in them. An item code that must always be captured in English capitals, left to right, is a good example: leaving it to the user's keyboard state produces a file full of `abc-100`, `ABC-100` and Arabic-typed lookalikes that never match. A password-like field that anyone can read over a shoulder is another. **Field Styles** pins those decisions to the field itself.

To force an English-only, upper-case, left-to-right code field on Item, add one line with For Type = Item, On Field = `code`, Text Direction = LTR, Fixed Input Language = English, Fixed Letter Case = Upper Case. From then on every user typing into that field gets the same result regardless of their own keyboard or interface language. To hide a sensitive value instead, set **Show As Password** on that field and it is drawn as asterisks.

| Column | What it does |
|---|---|
| For Type | The entity type the line applies to. |
| Entity List | A named list of entity types, so one line covers several at once. |
| On Field | The field ID to style. |
| Text Direction | Forces the field itself to read right-to-left or left-to-right (RTL / LTR). |
| Suggestion Direction | The direction of the type-ahead suggestion list under the field (RTL / LTR). |
| List Column Direction | The direction of this field's column in list views and grids (RTL / LTR). |
| Fixed Input Language | Forces the input language to Arabic or English regardless of the user's keyboard. |
| Fixed Letter Case | Leaves the text as typed (All), or forces Lower Case or Upper Case. |
| Show As Password | Draws the value as asterisks instead of readable text. |
| Foreground Colour | The colour of the text in the field. |
| Background Colour | The colour of the field's background. |
| Disable Suggestion Provider | Switches off the type-ahead suggestion list for this field. |
| Do Not Go To Next With Enter | Pressing Enter keeps the cursor in this field instead of jumping to the next one. |

**Disable Suggestion Provider** earns its place on fields where the suggestion list is either unhelpful — a free-text remarks field where past values are noise — or slow, because the underlying data is large enough that the type-ahead lookup makes typing feel sticky. **Do Not Go To Next With Enter** is for fields the user types several lines into: without it, Enter jumps to the next field and the user loses their place mid-sentence.

::: warning A line with no style set is ignored
If you add a line and leave **every** style column empty — no direction, no language, no case, no colour, no flag — the whole line is discarded rather than treated as "default styling". You must set at least one style column for the line to have any effect at all. An empty line is a common cause of "I configured it and nothing happened".
:::

::: info Two screens ignore the direction settings
The SQL and query text fields on the **Report Wizard** and **Printing Form Wizard** screens are always forced left-to-right, because a query is code and mixing directions makes it unreadable. A Field Styles line cannot override that — it is deliberate, not a fault.
:::

Do not confuse this grid with **Field Formats**, which lives on a different grid of the same screen: Field Styles is cosmetic and applied by the browser, while formats are rules **enforced when the record is saved**. If what you actually need is "this code must match a pattern or be rejected", see [Input Restrictions and Validation](/platform/fields-and-entities-settings/fields-settings-input-validation).

## Rich Text Fields

Long text fields are drawn as a plain box: whatever the user types arrives exactly as typed, with no headings, no bold, no lists. That is right for an internal note and wrong for text that ends up in a printed document — contract terms, a quotation preamble, a detailed item description that a customer will read.

Listing a long-text field here turns it into a formatted editor. The user gets a small toolbar and can apply bold, italic, lists and similar formatting, and the formatting is preserved when the text is printed.

| Column | What it does |
|---|---|
| For Type | The entity type the line applies to. |
| Entity List | A named list of entity types, so one line covers several at once. |
| On Field | The long-text field to turn into a rich-text editor. |

::: tip Choose the fields that get printed
The fields worth converting are the ones a customer or supplier eventually sees — terms and conditions, notes printed on the document, long descriptions. Internal remarks fields rarely benefit, and a formatting toolbar on a field nobody formats is just clutter.
:::

The HTML sheet field on the import configuration screen is an exception in the other direction: it is always a rich-text field whether or not anything is configured here.

## Text To Link Fields

A telephone number stored as text is just text — the user reads it, copies it, switches to another application and pastes it. The same is true of an e-mail address or a website. **Text To Link Fields** makes those values clickable, so a single tap starts the call, opens the mail client or opens the site.

The obvious candidates are the contact fields on master files: the mobile number on the Customer screen becomes a dial or WhatsApp action, and a website field on Supplier becomes a link that opens the address. This works both on edit screens and in grid and list-view columns, which is what makes it genuinely useful — a sales user can call straight from a customer list without opening each record.

| Column | What it does |
|---|---|
| For Type | The entity type the line applies to (for example Customer). |
| Entity List | A named list of entity types, so one line covers several at once. |
| On Field | The text field to turn into a link. |
| Link Type | What clicking does: **URL** opens the address, **Phone Number** offers a dial or WhatsApp action, **E-mail** opens the mail client. |

::: tip The value still has to be valid
The system turns the text into a link; it does not correct it. A mobile number captured with stray spaces or a missing country code produces a link that dials the wrong thing. If the data is inconsistent, pair this with a format rule on the same field — see [Input Restrictions and Validation](/platform/fields-and-entities-settings/fields-settings-input-validation).
:::

## Not Color Fields

This grid is the only one here that switches a feature **off** rather than on. Any text field whose value looks like a colour code — `#1A73E8` and similar — is normally drawn as a colour swatch, which is exactly right for a field that really does hold a colour, such as an item's colour attribute or a status highlight.

The problem is text that only happens to have that shape. A part number written as `#1A73E8`, a hashtag in a marketing field, an external reference from another system that starts with `#` — all of these are drawn as a block of colour, and the user can no longer read their own data. List the field here and it goes back to being shown as plain text.

| Column | What it does |
|---|---|
| For Type | The entity type the line applies to. |
| Entity List | A named list of entity types, so one line covers several at once. |
| On Field | The field that must **not** be rendered as a colour swatch. |

## Signatures

Collecting a signature on paper means printing the document, getting it signed, scanning it and attaching the scan — four steps and a delay of hours or days. This grid removes them. Point it at an attachment or binary field and the field's upload button becomes a **Sign** button: pressing it opens a drawing canvas that the user signs with a mouse, a finger or a stylus, and the drawing is stored in that field.

The natural example is a delivery note signed by the receiving customer on a tablet at the door. The driver opens the document, hands over the tablet, the customer signs, and the signature is on the record before the driver leaves.

| Column | What it does |
|---|---|
| For Type | The entity type the line applies to (for example a delivery document). |
| Entity List | A named list of entity types, so one line covers several at once. |
| On Field | The attachment or binary field that becomes a signature field. |
| Width | The width of the signing canvas. |
| Height | The height of the signing canvas. |
| Signature Line Width | The thickness of the pen stroke. |
| Background Image | An image drawn behind the signature — a ruled signing line, or a company frame. |
| ePad Ink | Captures the signature from a connected signature-pad device instead of the on-screen canvas. |

::: tip Size the canvas for the device
A canvas sized for a desktop screen is awkward on a phone, and a thin pen stroke drawn with a fingertip looks ragged. If signatures are collected on tablets, set a width and height that suit the tablet and increase the signature line width a little — a finger needs a thicker pen than a stylus.
:::

## Use Scanner In Fields

The same idea, applied to paper that already exists. Attachment fields normally open a file picker, which assumes the document has already been scanned and saved somewhere. If a scanner is connected to the user's machine, listing the field here gives it a **Scan** button wired straight to that scanner: the user puts the page in, presses Scan, and the result is attached without ever becoming a loose file on a desktop.

| Column | What it does |
|---|---|
| For Type | The entity type the line applies to. |
| Entity List | A named list of entity types, so one line covers several at once. |
| On Field | The attachment field that gets a Scan button. |
| Use Normal Upload By Default | Decides which of the two buttons is the primary one — the ordinary upload, or the scan. |

This grid supports the full wildcard chain, so a single line with `*` in the field column enables scanning on **every** attachment field in the system. That is often the right setting in an installation where paper arrives constantly and every user has a scanner; where only the archiving desk scans, a few targeted lines are tidier.

**Use Normal Upload By Default** is worth thinking about rather than leaving to chance: put the scan button first where most attachments come from paper, and leave normal upload first where most come from e-mail. Both buttons remain available either way — this only decides which one the user reaches without thinking.

The scanner application and its profile are not configured here; they are set in global configuration, on the [Attachments and Storage](/platform/global-config/global-config-attachments) page.

## Related pages

- [Fields and Entities Settings — Overview](/platform/fields-and-entities-settings/fields-settings-overview) — the scope columns, how lines are matched, and when changes take effect.
- [Input Restrictions and Validation](/platform/fields-and-entities-settings/fields-settings-input-validation) — the enforced counterpart to these cosmetic settings, including Field Formats.
- [Field Icons](/platform/fields-and-entities-settings/fields-settings-field-icons) — adding icons to fields and buttons, another browser-side appearance setting.
- [Screen Modifier — Edit-Screen Modifications](/platform/screen-modifier/screen-modifier-edit-screen) — for moving, hiding or renaming a field rather than restyling it.
- [Appearance](/platform/global-config/global-config-appearance) — the system-wide fonts, colours and interface behaviour these settings sit on top of.
- [Attachments and Storage](/platform/global-config/global-config-attachments) — where the scanner application and attachment storage are configured.
- [Document Management](/platform/dms/) — where scanned paperwork with a physical shelf location and a borrowing history is registered; this is also where per-field allowed extensions matter most.
