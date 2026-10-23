# Keyboard Shortcuts

Every keyboard shortcut in Nama, grouped by where it works: support and debug keys, grids, the find bar, reference and date fields, the criteria editor, menus and search, chat, login, the business functions on edit and list screens, and the POS.


## Support / Debug Shortcuts
These are global shortcuts (handled anywhere in the app) intended for support staff and developers.

- **Ctrl + Alt + X**: Activate replication options
- **Ctrl + Alt + Shift + X**: Toggle "Show IDs" mode (reveals internal field/entity IDs)
- **Ctrl + Alt + I**: Activate "Show Field Info" (right-click a field afterwards to inspect its metadata)
- **Ctrl + Alt + L**: Activate and open the Server Logs dialog
- **Ctrl + Alt + H**: Show help messages
- **Ctrl + Alt + T**: Activate editing of UI element properties
- **F9** (with a field focused): Show the tooltip / help for the focused field

## Grid Shortcuts
Available while editing detail grids on an edit screen. **Insert on its own does nothing** — every
row key is Insert with a modifier.

- **Ctrl + Insert**: Add a new empty row after the current one. Refused while an empty row is already open: *"Could not insert new line while you have an empty line"*
- **Shift + Insert**: Copy the current row into a new row. Refused on an empty row: *"Could not duplicate empty line"*
- **Ctrl + Alt + Insert**: Copy the current row **multiple times** (opens a count dialog)
- **Ctrl + Delete**: Delete the current row
- **Arrow Down** (while editing a cell): Move to the next row; if you are on the last row, a new row is created automatically
- **Arrow Up** (while editing a cell): Move to the previous row
- **F9**: Show the tooltip / help for the focused grid cell's field
- **Alt + F**: Toggle the find (search) bar for the grid

::: tip Adding a row while the grid is filtered
If a column filter is active, adding a row asks first — *"The grid currently has filters, the line you want to add may not be displayed even though it will added. Are you sure?"* The row is added either way; it is the filter that hides it.
:::

## Find Bar Shortcuts
Available when the grid find bar is open.

- **Enter**: Go to the next match
- **Shift + Enter**: Go to the previous match
- **Escape**: Close the find bar
- **Alt + F**: Toggle the find bar

## Reference Field Shortcuts
Available when a reference (lookup) field is focused, both on edit screens and in grid cells. What the pop-up window can do is on [Quick Create and Quick Edit from a Field](/platform/everyday-tools/quick-create-and-quick-edit).

- **F4**: Open the search / browse picker
- **F6** (or **Ctrl + Click** on the link): Open the referenced record in a new tab
- **F7** (or **Alt + Click** on the link): Edit the referenced record in a popup
- **F8**: Create a new referenced record

## Date / Time Field Shortcuts
- **F4**: Open the date / time picker
- **Tab**: Close the open date / time picker and move to the next field

## Field Navigation
- **Enter**: Move to the next field (unless the field is configured to keep focus on Enter)
- **Shift + Enter**: Move back to the previous field

## Criteria / Expression Editor Shortcuts
Available in the criteria expression editor.

- **F7**: Append a new expression line
- **F8**: Append a copy of the current expression line
- **Ctrl + Delete**: Remove the current expression line

## Menu & Search Shortcuts
- **Arrow Up / Arrow Down**: Move the selection in the "More" menu and the navbar search results
- **Enter**: Open the highlighted menu item or search result
- **Ctrl + Enter** / **Alt + Enter**: Open the highlighted navbar search result in a new browser tab
- **Escape**: Close the open menu, dropdown, or dialog

## Chat Shortcuts
- **Enter**: Send the message (in both the user chat and the AI assistant)
- **Escape**: Close the @mention suggestions dropdown

## Login Shortcuts
- **Enter**: Submit the sign-in, change-password, forgot-password, or OTP form

## Report Viewer Shortcuts
- **F5**: Re-Run With Parameters — run the open report again with the same parameter values

## Business Function Shortcuts
These shortcuts trigger business functions (the standard actions on edit and list screens). They are defined by the `default` Shortcuts Definition that ships with the system, and they can be customized per user. When a function has a shortcut assigned, the key combination is shown in square brackets next to its button or menu item (for example, `[Ctrl + S]`).

### Record Actions
- **Ctrl + S**: Save
- **Alt + S**: Save and continue (save then start a new record)
- **Ctrl + R**: Save Draft — stores the record without committing it
- **Alt + R**: Reverse document
- **Alt + N**: New record
- **Ctrl + D**: Duplicate the current record
- **Alt + Delete**: Delete the current record
- **Alt + P**: Print
- **Alt + F5**: Refresh
- **Ctrl + M**: Open the "More" menu

### Navigation
- **Alt + F**: General search
- **Ctrl + G**: Go (open a record by code)
- **Alt + H**: Go to record
- **Ctrl + L**: List view
- **Ctrl + T**: Tree view
- **Alt + Page Down**: Previous record
- **Alt + Page Up**: Next record
- **Alt + Home**: First record
- **Alt + End**: Last record

### Grid Rows
- **Alt + Ctrl + N**: Append a row
- **Shift + Insert**: Insert a row — in the edit-screen grids this copies the current row, as described above
- **Shift + Delete**: Delete the current row
- **Ctrl + Arrow Up**: Move the current row up
- **Ctrl + Arrow Down**: Move the current row down
- **Alt + Arrow Up** / **Alt + Arrow Down**: Toggle the sort direction

### Global Shortcuts

Two keys work anywhere in the application, whatever screen is open:

- **Ctrl + K**: Jump to the search box in the top bar (search everything)
- **Ctrl + U**: Open the side menu and put the cursor in its search box

These live in a separate grid on the same Shortcuts Definition, and that grid takes more than search:
a line can bind a key to **open an entity's list**, **start a new record of a type**, **open one
specific record**, or **open a link** — internal or external. That is how an implementation gives the
storekeeper one key for "new stock issue".

::: tip Customizable
These mappings come from the `default` Shortcuts Definition. An administrator can change any of them, so the keys shown above are the out-of-the-box defaults — your system may differ.
:::

## POS Shortcuts
These shortcuts apply to the Point of Sale (POS) application. The keys listed are the defaults — each one can be reassigned (or cleared) per register through the POS Shortcuts configuration.

### Screens & Navigation
- **F1**: Move between screens
- **Alt + F1**: New sales invoice
- **Shift + F1**: Replacement (replacement invoice)
- **Ctrl + F1**: Return invoice
- **F2**: Shift screen
- **Ctrl + F2**: Inventory screen
- **F3**: Show the search table
- **Ctrl + F3**: Open invoice
- **Ctrl + F4**: Show the data status screen
- **Page Down**: Move focus to the lines grid
- **Page Up**: Move focus to the header fields

### Payment & Invoicing
- **F5**: Pay dialog (and Invoice pay)
- **Ctrl + F5**: Pay without printing (multi-payment dialog)
- **Alt + R**: Pay using reward points
- **Alt + P**: Reprint
- **Ctrl + D**: Disable printing
- **Alt + V**: Edit delivery cost
- **Ctrl + Shift + N**: Transfer credit notes
- **Ctrl + R**: Return after the allowed period
- **Ctrl + O**: Online order inquiry

### Held Invoices
- **F6**: Hold invoice
- **Ctrl + I**: Open held invoice
- **Ctrl + F6**: Show held invoices
- **Ctrl + Shift + F6**: Show call-center held invoices
- **Alt + F6**: Delete held invoices
- **Shift + F6**: Delete all held invoices

### Discounts
- **F10**: Invoice discount
- **Ctrl + F10**: Delete discount
- **Alt + 1** through **Alt + 8**: Apply line discount 1–8

### Lines
- **Ctrl + Delete**: Delete the current line
- **Num +** (numpad plus): Duplicate the current line
- **Ctrl + Q**: Edit the line quantity

### Customer & Salesman
- **F7**: Activate the customer field
- **Shift + F7**: Add a new customer
- **Ctrl + Shift + C**: Edit the customer
- **Ctrl + F7**: Delete the customer
- **F8**: Activate the salesman field
- **Ctrl + F8**: Delete the salesman
- **Ctrl + F**: Activate the item field

### Other
- **Ctrl + F9**: Price inquiry
- **F4**: Change font
- **F11**: Lock screen
- **F12**: Help
- **Ctrl + F11**: Show all notifications
- **Ctrl + Shift + I**: Edit the invoice classification
- **Alt + F4**: Terminate (exit) the POS application

::: tip Customizable
The POS shortcuts above are defaults defined in code. If a register's POS configuration defines its own shortcut for a function, that takes precedence — and if a default key is already used by another function, the default is dropped to avoid conflicts.
:::
