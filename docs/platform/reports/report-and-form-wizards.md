---
description: "What the Report Wizard and Printing Form Wizard share and how they differ: the skills that carry over between them, the features unique to each, choosing which one to use, and editing the report record each one generates."
entities: [ReportWizard, PrintingFormWizard]
---
# Report and Form Wizards

Nama has two wizards. One builds reports, the other builds printed forms, and they look like separate
tools sitting in the same menu.

They are not. They are one tool with two outputs, and almost everything you learn on either screen
transfers directly to the other. This page is the half they share — read it once, and both guides
become much shorter.

## One tool, two outputs

Both wizards work the same way. You name a main table, optionally bring in more data alongside it,
list the fields you want printed, describe the page, and save. Saving builds the finished article and
puts it where users will find it.

The difference is what comes out and where it lands:

| | Report Wizard | Printing Form Wizard |
|---|---|---|
| Produces | A report | A printed form |
| Runs against | Whatever range the user asks for | One document at a time |
| Users reach it from | The Reports menu | The Print button on a document |
| Answers | "Show me all of these" | "Print me this one" |

That single difference — a range of records versus one record — explains nearly every other
difference between the two screens. Hold onto it and the rest follows.

![A Report Wizard record](../../ar/platform/images/reports/report-wizard-screen-en.png)

## What you learn once

These behave identically on both screens. Learn them on either wizard and you know them on both.

**The main table** is the thing you are reporting on or printing — a sales invoice, a customer, a
stock movement. Everything else hangs off it.

**Up to five extra data sources** bring in information that does not live on the main table. Each one
is linked back to the main data by linking lines, and narrowed by filter lines. Five is the limit on
both screens, and the fifth is no different from the first.

**The field list** is the heart of both wizards, and it is literally the same list of settings in both
places. A field row carries its Arabic and English titles, its width, how it is displayed, number and
date patterns, barcodes, aggregation, hyperlinks, the style attached to it and its own conditional
formatting. A column in a report and a column in a printed form are described with the same
vocabulary.

**Page setup** — paper size, orientation, margins, band heights, the fonts and colours of headers,
detail rows and summaries, zebra striping, background images — is the same tab on both.

**The page furniture.** Both wizards seed a new record with six header components: the logo, the
report title, the date and time, the page number, the login user and the legal entity. Both let you
add, move or remove them.

**Conditional styles, Jasper variables and security constraints** are the same grids in the same
places on both screens.

**Manual SQL, declare statements, drafts and the select prefix** behave the same on both.

::: tip Styles are shared too
[Report Styles](/platform/reports/report-styles) is a separate master file of reusable fonts, colours
and borders. Both wizards attach styles to fields the same way, and a style built for one is usable by
the other.
:::

## What only the Report Wizard has

These exist because a report covers a range of records and a form covers one:

- **Parameters.** A report asks the user questions before it runs — a date range, a customer, a
  branch. A printed form asks nothing; it prints the document you pressed Print on.
- **Grouping.** Five levels of grouping, each with its own header, footer, totals and page breaks.
- **Crosstabs**, for pivoting values into a matrix.
- **Union tables** and **where lines**, for combining and narrowing the main query.
- **A Run button.** You can run a report from the wizard and look at it. There is no equivalent for a
  form — you exercise a form by printing a real document.

## What only the Printing Form Wizard has

- **Five blocks instead of one.** A form has five header-and-grid pairs that print interleaved down
  the page. They are five independent sets of data, each with its own fields, sort order and title —
  not five column groups of one table.
- **Creating a form from a screen.** From the More menu of any edit or list screen, Nama reads the
  layout in front of you — its groups, its grids, its column order — and hands back a wizard record
  that already describes it. There is no equivalent for reports, and it is usually the fastest way to
  a working form. See
  [Building a form from the screen you are looking at](/platform/reports/printing-form-wizard-guide).

::: warning Coming from the other wizard
Two things reliably confuse someone who learned the Report Wizard first. **There are no parameters on
a form** — a form is always filtered to the one document being printed, and nothing else. And **there
is no Run button**, so the only way to see your work is to print a genuine document.
:::

## Choosing between them

Ask what the user will be looking at when they need the output.

If they are looking at **one document** and want it on paper — an invoice for a customer, a delivery
note for a driver, a receipt — that is a printed form.

If they are asking a **question about many records** — sales this month, stock below minimum,
customers who have not ordered since March — that is a report.

The awkward case is a list of documents printed to paper, and the Printing Form Wizard handles it:
a form set to print as a list runs against the records selected in a list view rather than a single
document.

## The generated record is yours to edit

Both wizards produce a real, editable record — a report definition — and this catches people out.

Anything the wizard does not manage, you can set on that generated record by hand, and re-saving the
wizard will leave it alone. That is how a form gets restricted to one document book, one term, one
group of users, or documents matching particular criteria: you set it on the generated form, not in
the wizard.

But the wizard does own part of that record, and rewrites it on every save. Do not hand-edit these,
because your changes will not survive the next save of the wizard:

- the code, and the Arabic and English names
- the report type and its order
- the group it appears under, and the capabilities that govern who may see and change it
- the fixed language and the point-of-sale flag
- the report file itself, and the background image

::: info Regeneration is not optional and not scheduled
There is no "generate now" on either wizard, because saving *is* generating. If a generated report or
form looks stale, save the wizard again.
:::

## See also

- [Report Wizard Guide](/platform/reports/report-wizard-guide) — building a report
- [Printing Form Wizard](/platform/reports/printing-form-wizard-guide) — building a printed form
- [Report Styles](/platform/reports/report-styles) — reusable fonts, colours and borders
- [How Nama chooses which form prints](/platform/reports/printed-form-selection) — for forms
  specifically, what decides which one a user gets
