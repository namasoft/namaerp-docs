---
description: "How to write an attendance and departure formula that teaches Nama to read a time attendance machine's export file: separators, rows and columns, column tokens, pairing entries with exits, cleaning up readings, and the buttons under the formula field."
entities: [TimeAttendance]
---
# Attendance and Departure Formulas

Most employees record attendance and departure with a fingerprint on a dedicated time attendance machine. The trouble is that no two machines export their readings the same way. One writes times in 24-hour format, another in 12-hour AM/PM. One produces an Excel sheet, another a text file separated by commas, semicolons, tabs or runs of spaces. One writes the day as `1`, the next as `01`. Some write a single reading per row and leave you to work out which is an entry and which is an exit; others write the entry and the exit side by side on the same row.

An **attendance and departure formula** is how you teach Nama to read one particular machine's file. It is a short line of `#`-prefixed tokens that describes, column by column, what the exported file actually contains. Once the formula exists, importing that machine's file is a two-click operation for the rest of its life.

::: tip There is also a direct, automated path
This page is about importing a **file the machine exported**. Nama can also connect to certain machines (or their databases) directly and pull punches on a schedule, with no file and no formula — see [Attendance Machines](attendance/attendance-machines.md). The two mechanisms are independent; a given machine normally needs only one of them.
:::

## Where formulas live, and how one is chosen

Formulas are written once, in **HR Configuration → Salary → Attendance Machines Settings**, in the **Attendance Machine Formula** field. That single field holds **one formula per line**:

```
AA=#empid#date{dd-MM-yyyy}#time{HH:mm}
ZK1=#empid#datetime{dd-MM-yyyy HH:mm:ss}#type{I-O}#exact
OldClock=#ignoreLinesFromTop{1}#empid#date{d-M-yyyy}#time{hh:mm}#am_pm{AM-PM}
```

Everything before the first `=` is the **formula name** — the label you will pick later when importing. Everything after it is the formula itself. The names you invent here are exactly what appears in the **Attendance Machine** dropdown on the Time Attendance document, so give them names your staff will recognise (`AA`, `ZK1`, `Warehouse-Gate`).

![Attendance Formula Settings Page in HR Settings](../../ar/modules/hr/images/attendance-formula-settings-page.png)

::: warning Names are matched exactly
The name is compared character for character, including case and spaces. `ZK1` and `zk1` are two different machines, and a stray space before the `=` will stop the formula being found at import time. A name must not contain `=`.
:::

To use a formula, open a **Time Attendance** document, select the machine name in the **Attendance Machine** field, attach the exported file (up to **five** attachments are read and processed as one continuous list), then run the import action.

![The Time Attendance document, with the Attendance Machine Name field, the five attachment slots and the Import Attendance Lines button](../../ar/modules/hr/images/attendance-formula-time-attendance-en.png)

::: warning Old Excel files are rejected
If the machine exports in the legacy `.xls` format, re-save it as `.xlsx` before attaching it. The attachment validation refuses old-format Excel files when the document is saved.
:::

## The anatomy of a formula

A formula is a sequence of tokens, each starting with `#`, some carrying a parameter in braces:

```
AA=#empid#date{dd-MM-yyyy}#time{HH:mm}
```

Two ideas explain almost everything about how formulas behave.

**First: position matters.** Each token stands for **one column** of the file, in the order the columns appear. `#empid` above means "column 1 is the employee's code on the machine", `#date{dd-MM-yyyy}` means "column 2 is the date, written day-month-year with dashes", `#time{HH:mm}` means "column 3 is the time in 24-hour form". Given that formula, Nama expects the file to look like this:

![Example of Expected Data Format](../../ar/modules/hr/images/attendance-formula-example-data.png)

**Second: tokens Nama doesn't recognise are simply placeholders.** There is no dictionary check. If your file has a column you don't care about — a department name, a serial number, a blank spacer — put any invented token there to occupy the position and it is skipped. The conventional choice is `#ignore`, but `#ignore` is not a keyword; `#skipMe` or `#column4` work identically.

::: warning The flip side of that convenience
Because unknown tokens are accepted silently, **a misspelled token is not an error** — it quietly becomes a skipped column. `#Date{dd-MM-yyyy}` with a capital D does not import the date; it discards the column and leaves every line dateless. Token names are case-sensitive, so use the buttons under the field wherever you can rather than typing tokens by hand.
:::

Not every token consumes a real column. Tokens such as `#exact` or `#sep{,}` change *how* the file is read rather than describing a column — but they still occupy a position in the sequence, so it is good practice to put them all at the end of the formula, after the columns they affect.

## Reading the file: separators, rows and columns

Before any dates or times are interpreted, Nama has to break the file into rows and columns. These tokens control that step.

### `#sep{,}` — the column separator

**Default: a comma.** Any literal string works, including multi-character separators. Single quotes are stripped, which is how you express a space: `#sep{' '}`.

::: warning Tabs must be typed literally
`#sep{\t}` does **not** mean a tab — for the separator, `\t` is taken as a literal backslash followed by `t`. If your file is tab-separated, paste a real tab character between the braces. (Escape sequences do work inside date and time patterns; see below.)
:::

::: tip Excel files ignore your separator
When the attachment is `.xlsx`, Nama reads the sheet cell by cell and re-joins each row with **commas** before applying the formula. So for Excel files, leave `#sep` at its default. Setting anything else will break the import — and a cell whose text contains a comma will be split into two columns.
:::

### `#ignoreLinesFromTop{1}` and `#ignoreLinesFromEnd{1}`

Skip a number of lines at the beginning (a header row) or at the end (a totals row) of the file. Both are applied to **each attachment separately**, which is what you want when you attach five files that all carry the same header.

`#ignoreLinesFromEnd` must be given a number — `#ignoreLinesFromEnd` on its own causes the import to fail.

### `#removeEmptyColumns`

Drops every blank column from each row after splitting. This is the cure for text files padded with runs of spaces, where `Ahmed    01-05-2026` would otherwise split into four columns instead of two.

::: warning It shifts the positions
Empty columns are removed *before* the tokens are matched to columns, so the token sequence must describe the row **as it looks after the blanks are gone**, not as it looks in the raw file.
:::

### The merge tokens

Occasionally a single value is spread across several columns — a date written `2019 01 15` in a space-separated file arrives as three columns rather than one. The merge tokens fold a column into the one before it:

| Token | Effect |
|---|---|
| `#mergeWithPreviousWithSeparator` | Joins using the file's separator (the `#sep` value, comma by default). |
| `#mergeWithPreviousWithSpace` | Joins with a single space. |
| `#mergeWithPreviousWithNoSeparator` | Joins with nothing at all. |

For the `2019 01 15` case, with a comma separator:

```
AA=#empid#date{yyyy,MM,dd}#mergeWithPreviousWithSeparator#mergeWithPreviousWithSeparator#time{HH:mm}
```

The token is used twice because two columns have to be folded back in, and the date pattern describes the *merged* result — three parts joined by the separator.

::: warning They must be written bare
`#mergeWithPreviousWithSeparator{-}` is not recognised and does nothing at all. You cannot choose the joining character; it is always the file's separator.
:::

### `#copylines{...}` — several shifts on one row

Some machines write a whole day on one row: entry and exit for the morning shift, then entry and exit for the evening shift, side by side. Nama stores one row per shift, so those extra columns need to be turned into extra rows.

Describe every column first, giving the extra ones names of your own:

```
AA=#date{dd-MM-yyyy}#intime{HH:mm:ss}#outtime{HH:mm:ss}#Checkin2#Checkout2#Checkin3#Checkout3
```

Then add `#copylines`, telling it which invented column should be copied into which real one. Groups separated by `|` each produce one additional row:

```
#copylines{intime=Checkin2,outtime=Checkout2|intime=Checkin3,outtime=Checkout3}
```

Each new row is a full copy of the original with only the named columns replaced, and is inserted immediately after it. If the source column is empty for a given row, that copy is skipped — so a day with only one shift does not produce phantom rows. Drop the second group if the file only ever has two shifts.

### `#trim{date}` — strip stubborn whitespace

Every column is trimmed of ordinary spaces automatically. `#trim` handles the harder cases — non-breaking spaces and other invisible characters that some machines pad their exports with. Pass a comma-separated list of the **token names** to clean: `#trim{date,time}`.

### `#noDateParsing`

For Excel files only. Without it, Nama interprets date-formatted cells itself and hands the formula a standardised value. With it, the cell's displayed text is used exactly as the sheet shows it. Reach for this when an Excel import produces dates that are shifted, reformatted, or refuse to match your pattern.

## Describing the columns

### `#empid` — the employee

**Required in practice.** This is the employee's code **on the machine**, which Nama matches against the **Attendance Machine Code** field on the Employee record.

- A row whose employee column is empty is silently skipped.
- If no employee carries that machine code, the import stops with *Could not find employee with attendance machine code {0}* — unless the **Ignore Unfound Employees** option is ticked on the import, in which case the row is skipped quietly.
- If **two** employees share the same machine code, the import stops and lists every offending employee: *"The employee {0} has a repeated attendance code {1}, please change it"*.
- When **Consider Legal Entity To Find Employee** is enabled in HR Configuration, the search is additionally restricted to the document's legal entity, which lets two companies reuse the same machine codes.

### Dates and times

| Token | Meaning |
|---|---|
| `#date{dd-MM-yyyy}` | The date of the reading. |
| `#time{HH:mm}` | The time of the reading. |
| `#datetime{dd-MM-yyyy HH:mm:ss}` | Date and time together in one column. |
| `#indate{dd-MM-yyyy}` / `#outdate{dd-MM-yyyy}` | Entry date and exit date in **separate** columns. |
| `#intime{HH:mm:ss}` / `#outtime{HH:mm:ss}` | Entry time and exit time in separate columns. |
| `#indatetime{…}` / `#outdatetime{…}` | Entry and exit, each as one date-and-time column. |

The pattern inside the braces spells out how the value is written:

- `dd` — day as two digits (`01`, `02` … `31`); a single `d` expects `1`, `2` … `31`.
- `MM` — month as two digits. **Use a capital `M`** — a lowercase `m` means minutes.
- `yyyy` — four-digit year; `yy` for two.
- `HH` — hour in 24-hour form; a single `H` expects `1` … `24`.
- `hh` — hour in 12-hour form, which needs an `a` in the pattern for the AM/PM marker: `#time{hh:mm a}`.
- `mm` — minutes; `ss` — seconds.

::: tip Escape sequences in patterns
`\n` (new line), `\r` (carriage return) and `\t` (tab) can be used inside a date or time pattern when the machine separates parts of a value with those characters — for example `#date{dd-MM-yyyy\t}`.

They work in `#date`, `#indate`, `#outdate`, `#intime`, `#outtime` and `#outdatetime`. They do **not** work in the time half of `#datetime` and `#indatetime`, so `#datetime{dd-MM-yyyy\tHH:mm:ss}` will read the date correctly but not the time. When a tab sits between the date and the time, use separate `#date` and `#time` tokens with `#sep` set to a tab instead.
:::

### `#type{I-O}` — is this an entry or an exit?

Use this when the file states the punch type in its own column. The parameter gives the **entry marker and the exit marker separated by a dash**: `#type{I-O}`, `#type{C/In-C/Out}`, `#type{1-2}`.

::: warning Only the entry marker is actually compared
Nama checks whether the column matches the marker **before** the dash. Anything else — the exit marker, an unexpected value, or an empty cell — is treated as an **exit**. The comparison is case-sensitive, and the entry marker itself cannot contain a dash.

If `#type` is left out altogether, **every** reading is treated as an entry.
:::

### The remaining column tokens

| Token | Purpose |
|---|---|
| `#machinecode` | The machine's own identifier, carried through to the attendance line — useful when several machines feed one document. |
| `#text1` | A free-text column kept alongside the line, e.g. nationality or a note. |
| `#ref1Code` / `#ref2Code` | The code of a reference record to attach to the line. |
| `#ref1EntityType{Project}` / `#ref2EntityType{Branch}` | What kind of record that code refers to. |

The two entity-type tokens work in either of two ways. **With** a value in braces, the type is fixed for every row and the token does not consume a column — `#ref1EntityType{Project}` means "every code in `#ref1Code` is a project". **With empty braces**, the token takes a column and each row states its own type, which lets one file mix projects and departments.

If any of `#empid`, `#machinecode`, `#text1`, `#ref1Code` or `#ref2Code` appears more than once in a formula, the values from those columns are joined together, using the text in the repeated token's braces as the glue.

## Pairing entries with exits

This is the part that decides how many rows the machine's readings turn into, and it is where most import problems come from. A machine that writes one reading per row gives you a pile of timestamps; Nama has to work out which of them is an entry, which is the matching exit, and which belong together on one attendance line.

Pick **one** of the modes below.

### The default: entry followed by exit

With no pairing token at all, Nama pairs an entry with the exit that immediately follows it **on the same date**, and leaves an unmatched exit as a line with only a departure time. This is identical to writing `#exact`.

Because it works on the punch *type*, this mode needs `#type` to be meaningful. Without `#type` every reading counts as an entry, nothing pairs up, and you get one entry-only line per reading.

| Token | Behaviour |
|---|---|
| `#exact` | The default described above: pair an entry with the next exit on the **same date**. |
| `#exactWithDifferentDays` | The same, except the pair may cross midnight into the following day. Use it for night shifts. |

### Pairing by order, ignoring the type

| Token | Behaviour |
|---|---|
| `#exactAlternating` | Take the readings in order: first is entry, second is exit, third is entry, and so on — but only pair two readings that fall on the **same date**. A reading whose neighbour is on another date is left as an entry-only line, so a new day always restarts with an entry. |
| `#exactAlternatingWithDifferentDays{22}` | The same alternating pairing, allowed to cross days. The number is the **maximum gap in hours** between the two readings of a pair; beyond it they are not paired. **Defaults to 24 hours** when the number is omitted. |

### `#alternatingPunch` — first and last of the day

Per employee and per calendar day, the **first** reading becomes the entry and the **last** becomes the exit; everything in between is discarded. This is the simplest and most forgiving mode, and the right choice when employees punch in and out several times a day but you only care about when they arrived and when they left.

If the two ended up the wrong way round, they are swapped. Where the first and last readings came from different machines, both machine codes (and both `#text1` values) are kept, separated by a comma.

### `#alternatingWithAttendancePlanPunch{2.5}` — let the shift decide

Instead of relying on order or on a type column, this mode compares each reading against the employee's own **attendance plan** and decides from the shift times whether it is an arrival or a departure.

The number in braces is a tolerance **in hours**. For an employee scheduled 8:00 AM to 4:00 PM with `{2}`:

- a reading between **6:00 AM and 10:00 AM** counts as an **entry**;
- a reading between **2:00 PM and 6:00 PM** counts as an **exit**.

Readings are then grouped by the shift they belong to, and each group becomes one attendance line. Overnight shifts that run past midnight are handled correctly. A reading that matches no shift — an employee punching on a day off, say — is grouped by its date alone.

::: warning The tolerance is required
Always give a number. `#alternatingWithAttendancePlanPunch` without braces has no sensible default.
:::

This is the mode to reach for when an employee has **more than one shift in a day**, or when several genuine entries and exits are recorded on the same day and neither order nor a type column can untangle them.

**`#respectAttendancePlanPunchType`** refines it. On its own, the plan mode keeps only the **first and last** reading of each shift group and throws away anything between — so an employee who steps out for a break and returns produces a single long line. Add `#respectAttendancePlanPunchType` and each reading's inferred type is honoured instead:

- an exit with no preceding entry in the shift becomes a departure-only line;
- an entry followed by an exit becomes a normal pair;
- an entry followed by another entry is written out on its own, and the next reading is then considered afresh.

Four readings in a day (in, out, in, out) therefore produce **two** lines representing the two working periods, rather than one line spanning from the first to the last.

```
AA=#empid#date{dd-MM-yyyy}#time{hh:mm}#alternatingWithAttendancePlanPunch{2}#respectAttendancePlanPunchType
```

**`#maxCheckInDistance{n}`** is a further refinement, meaningful only when `#alternatingWithAttendancePlanPunch` and `#exactAlternatingWithDifferentDays` are both present: if the next reading looks like an exit whose shift starts more than *n* hours after the current reading, the two are not paired.

### When the file already has both sides

If your formula uses `#indate`, `#intime` or `#indatetime`, the file is telling Nama that each row **already contains a complete entry and exit** — no pairing is needed and every pairing mode is ignored.

::: warning A row needs an exit date as well as an exit time
When you use the in/out columns you must also give Nama somewhere to read the exit **date** from: `#outdate`, `#outdatetime`, or a shared `#date` covering both. A formula with `#indate` and `#intime` and `#outtime` but no exit date fails the import with *"Could not find parameter outdatetime"*.
:::

### `#alternatingPunchByMachineName` — pair per machine

Normally all of an employee's readings are pooled together before pairing, whichever machine produced them. Add this token and readings are grouped by **employee and machine**, so an employee who is tracked separately at two gates gets a separate pair from each. (It has no effect in `#alternatingPunch` mode, which always pools by employee.)

### If you combine several modes by mistake

Only one mode is ever applied. When more than one is present the system silently picks one, and the order is not obvious — so treat these as rules for reading someone else's formula, not as something to rely on:

- If any of `#exactWithDifferentDays`, `#exactAlternating` or `#exact` is present, the **first one in that order** is used, and `#alternatingPunch` is ignored.
- `#exactAlternatingWithDifferentDays` overrides `#exactWithDifferentDays`, but loses to `#exactAlternating` and `#exact`.
- If none of those four is present, `#alternatingPunch` overrides everything, including in/out columns.
- In/out columns apply unless one of the four above or `#alternatingPunch` is present. Note that `#alternatingWithAttendancePlanPunch` does **not** override them — mixing in/out columns with the plan mode silently ignores the plan.
- `#alternatingWithAttendancePlanPunch` acts as a mode only when nothing above applies; alongside `#exactAlternatingWithDifferentDays` it acts as a refinement instead.

## Cleaning up the readings

### `#ignoreConsecutivePunches{5}`

Discards readings of the **same type** that fall within the given number of minutes of each other — the classic case of an employee scanning twice because the first beep wasn't heard. Of two entries that are too close, the **earlier** is kept; of two exits, the **later** is kept, so the working period is never shortened by a double scan.

### `#addhours{2}` — time zone correction

Adds the given number of hours to every time read from the file; a negative value such as `#addhours{-2}` subtracts. Use it when the machine's clock runs in a different time zone from the company's. It shifts **times only** — dates are not rolled forward by it.

### `#am_pm{AM-PM}` — 12-hour clocks with custom markers

For files that use a 12-hour clock with markers other than the standard AM/PM — most often Arabic ones. Give the morning marker and the evening marker separated by a dash: `#am_pm{صباحاً-مساءاً}`. When a time cell contains the evening marker, twelve hours are added to it.

::: warning Use either `a` or `#am_pm`, never both
`#time{hh:mm a}` already handles a standard AM/PM marker. Combining it with `#am_pm` shifts the same afternoon time twice. Also make sure the parameter contains a dash and both markers — `#am_pm{}` or a parameter without a dash will break the import.
:::

### `#minimumpunchintime{06:00}`

Only meaningful together with `#alternatingPunch`. An exit recorded **before** the stated time is treated as belonging to the **previous day**, provided the reading before it was an entry on that previous day. This is what stops a night shift ending at 2:00 AM from being filed as a stray departure on the following day.

### `#initialPunch{In}`

A button inserts this token, but it currently has **no effect** on the import — it can safely be removed from any formula you find it in.

## The buttons under the formula field

The development company strongly recommends building formulas with the buttons rather than typing tokens, because a mistyped token fails silently. Each button appends its token to the end of the field, ready for you to adjust the pattern inside the braces.

| Button | Inserts |
|---|---|
| Employee ID | `#empid` |
| Date Time | `#datetime{dd-MM-yyyy HH:mm:ss}` |
| Date | `#date{dd-MM-yyyy}` |
| Time | `#time{HH:mm}` |
| In Date Time / Out Date Time | `#indatetime{…}` / `#outdatetime{…}` |
| In Date / Out Date | `#indate{dd-MM-yyyy}` / `#outdate{dd-MM-yyyy}` |
| In Time / Out Time | `#intime{HH:mm:ss}` / `#outtime{HH:mm:ss}` |
| Text1 | `#text1` |
| Ref1 Code / Ref2 Code | `#ref1Code` / `#ref2Code` |
| Ref1 EntityType / Ref2 EntityType | `#ref1EntityType{replace with your Entity}` |
| Empty Column | `#ignore` |
| Machine Code | `#machinecode` |
| Merge With Previous With No Separator | `#mergeWithPreviousWithNoSeparator` |
| Merge With Previous With Separator | `#mergeWithPreviousWithSeparator` |
| Merge With Previous With Space | `#mergeWithPreviousWithSpace` |
| Remove Empty Columns | `#removeEmptyColumns` |
| Copy Lines | `#copylines{intime=checkin2,outtime=checkout2\|…}` |
| No Date Parsing | `#noDateParsing` |
| AM / PM | `#am_pm{AM-PM}` |
| Exact | `#exact` |
| Exact Alternating | `#exactAlternating` |
| Exact Alternating With Different Days | `#exactAlternatingWithDifferentDays{22}` |
| Alternating Punch By MachineName | `#alternatingPunchByMachineName` |
| Exact With Different Days | `#exactWithDifferentDays` |
| Alternating With Attendance Plan Punch | `#alternatingWithAttendancePlanPunch{2.5}` |
| Respect Attendance Plan Punch Type | `#respectAttendancePlanPunchType` |
| Initial Punch | `#initialPunch{In}` |
| Alternating Punch | `#alternatingPunch` |
| Minimum Punch-in Time | `#minimumpunchintime{06:00}` |
| Ignore Consecutive Punches | `#ignoreConsecutivePunches{5}` |
| Type: In or Out | `#type{C/In-C/Out}` |
| Add Hours: Time Zone Diff | `#addhours{2}` |
| Ignore Lines From Top / From End | `#ignoreLinesFromTop{1}` / `#ignoreLinesFromEnd{1}` |
| Separator | `#sep{,}` |
| Trim | `#trim{date}` |

There is no button for `#maxCheckInDistance`; type it by hand if you need it.

## What the import filters out

Two things quietly reduce the number of lines you end up with, and both surprise people.

**The document's date range.** Readings whose entry date falls outside the Time Attendance document's **From Date** / **To Date** are dropped, both while the file is read and again after pairing. Departure-only lines, which have no entry date, are never dropped by this filter.

**Rows with no employee code.** As noted above, a row whose `#empid` column is empty never becomes a line at all.

## When something goes wrong

None of the messages below has an Arabic translation, so they appear in English on Arabic screens too.

| Message | What it means |
|---|---|
| *You must specify formula name* | No machine was selected in the **Attendance Machine** field on the document. |
| *Could not find parameter {0}* | The formula refers to something it never defined — most often an exit date missing from an in/out formula. |
| *Could not find employee with attendance machine code {0}* | No employee carries that code. Fix the Employee record, or tick **Ignore Unfound Employees** to skip such rows. |
| *The employee {0} has a repeated attendance code {1}, please change it* | Two or more employees share one machine code; codes must be unique. |
| *There is Error in Parsing line {0}* | A row could not be read — usually a date or time that doesn't match its pattern. The number counts data rows after any `#ignoreLinesFromTop` skipping, so it will not match the physical line number in the file. |
| *The pattern {0} does not contain right hand side* | A `#copylines` assignment is missing its `=`. |
| *The pattern {0} left hand side {1} is not found in the formula* | A `#copylines` assignment names a column that the formula never declares. |

If the file imports but the result looks wrong rather than failing, the cause is almost always one of three things: a token silently misspelled into a placeholder, the wrong pairing mode, or a date pattern using lowercase `m` for the month.

## Related pages

- **[Attendance Machines](attendance/attendance-machines.md)** — how the two paths compare, and the full reference for the automated alternative that connects to the machine directly.
- **[Time Attendance](attendance/time-attendance.md)** — the document these formulas import into.
