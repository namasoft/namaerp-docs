---
name: report-design
description: Make a hand-written Nama ERP Jasper report or printing form (.jrxml) support the run-time designs (Theme colors, Modern, Classic) by adding the nama-design markers - table cells, subreports, summary cards (including choosing numbers that are right for the report) and the "Powered by" footer. Use when a user asks to give an old/custom report or form the new design, theme colors, the Modern look, summary cards, or the Report Design question. Not for Report Wizard or Printing Form Wizard reports, which get all of this automatically.
---

# Nama report designs for hand-written reports

Wizard reports already have three designs, chosen when the report runs:

| Design | Look |
|---|---|
| **Theme colors** (default) | Table header, zebra rows and totals take the user's screen theme color |
| **Modern** | Fixed navy look; a hand-written report's cards show only in this design (wizard reports show cards in every design) |
| **Classic** | The report exactly as it was written, colors and lines untouched |

A hand-written `.jrxml` gets the same designs by **opting in with markers**. The report compiler (it runs when the
report is saved on the Report Definition screen) reads the markers and adds everything else: the "Report Design"
question, the hidden color parameters, and the color/line expressions on the marked elements.
**Never add those parameters or expressions by hand.**

Do not use this skill to change a **wizard** report's look: saving the wizard rewrites its `.jrxml`, so edit the wizard
instead. The user documentation of the whole feature is https://docs.namasoft.com/platform/reports/report-designs.

## How the design is chosen at run time

Knowing this saves time when checking the result:
- The compiler puts **Report Design** (and **Hide Summary Cards**, only when there is a `cards` frame) in a collapsed
  **Display Options** group at the end of the question screen. Both remember the user's last answer.
- **Theme colors** uses the theme color of the screen the report was run from. A very pale theme color gets dark header
  text instead of white. The report stays light even when the screen is in dark mode.
- Runs that have no screen theme use Nama blue (`#0C82AA`): the old (GWT) interface, scheduled tasks and entity flows.
- Changing the theme does not refresh a report already on screen, and **Apply** with the same answers does not rerun
  it. Press **Re-Run With Parameters [F5]** (the ▷ button).
- The **Default Report Design** field on the Report Definition screen works for hand-written reports too. On a report
  it is only the starting answer of the question; on a form or list it is the design used (see Printing forms).

## Step 1 - opt the report in

Add one report-level property, right after `<jasperReport ...>`:

```xml
<property name="nama-design" value="true"/>
```

`value="false"` switches the designs off again without removing the markers.

## Step 2 - mark the table cells

Put a `nama-design-role` property inside the `<reportElement>` of each table cell (`textField` or `staticText`, in any
band, also inside frames):

| Role | Mark these | Theme/Modern gives them |
|---|---|---|
| `header` | column titles (usually column header or page header band) | filled header color, light text, no borders |
| `row` | detail cells | zebra rows, a thin line under each row, link color for hyperlink cells |
| `total` | summary, group footer and group header total cells | light fill, bold color, a thick line on top |

```xml
<textField>
    <reportElement mode="Opaque" x="0" y="0" width="170" height="20">
        <property name="nama-design-role" value="row"/>
    </reportElement>
    ...
</textField>
```

Rules:
- Mark every cell of a row, including empty ones, or the zebra stripe has holes.
- Cells keep their own fonts, sizes and alignment. Their own colors and borders are replaced only in Theme and Modern;
  Classic shows them exactly as written.
- Header and total cells get their fill in Theme and Modern even when they are transparent (for example over a
  background image). Row cells need `mode="Opaque"` to show the zebra stripes. Classic keeps each cell's own mode.
- Values are case-insensitive (`Header` works); anything else (`head`, `totals`) fails the save on purpose.
- Theme and Modern draw only their own lines: a thin line under each row and a thick line above the totals. To draw
  more, add `<property name="nama-design-lines" value="left,right"/>` next to the role, naming any of `top`, `left`,
  `bottom`, `right`. They print as thin lines in the design color and replace the design's line on that side (the thick
  total line stays). Put it on every cell of the column (header, rows, total) for a full column line.
- To drop the design's own lines on a cell and draw only the listed ones, also add
  `<property name="nama-design-only-these-lines" value="true"/>` (an empty `nama-design-lines` then means no lines).
  The wizard does this for its **Border Line Preset**, on the table rows only.

## Step 3 - subreports

A subreport only sees what its parent passes, so:
- Opt in **both** files: the parent (`nama-design="true"`, even when the parent has no marked cells of its own) and the
  subreport file (`nama-design="true"` plus its own cell roles).
- The compiler then passes the design and the colors from the parent to every subreport automatically.
- A subreport whose parent is not opted in stays Classic.

## Step 4 - summary cards

A card is only useful if its number is right. A nicely drawn card with a wrong total is worse than no card, so choose the
numbers before drawing anything.

### What makes a number fit for a card

1. **It matches the table.** A card total must equal the report's own total of that column: same rows, same filters.
   Use a variable with `resetType="Report"`, never a page or group one.
2. **It can be added up.** Amounts and quantities can be summed. Running balances, stock on hand, prices, rates and
   percentages cannot. For those use the last value (a `calculation="Nothing"` variable keeps the last row's value,
   so it is a closing balance only when the report covers one account), a weighted average (sum of amount / sum of
   quantity), or no card.
3. **One currency, one unit.** If rows can be in different currencies or units (the SQL selects a currency or unit
   column), summing the document amount gives nothing meaningful. Sum the local-currency or base-unit column if the SQL
   has one; otherwise drop the card.
4. **Count of what?** `calculation="Count"` counts rows. When one row is one invoice line, that is the number of lines,
   not of invoices or customers. For "Invoices" or "Customers", use `calculation="DistinctCount"` over the **code**
   (`$F{CustomerCode}`), or over the id wrapped as `java.nio.ByteBuffer.wrap($F{CustomerId})`. Never over the bare
   id: ids are `binary(16)` and arrive as `byte[]`, and two arrays with the same bytes are not equal, so every row
   counts. Tested live: the bare id gave 1,927 (every row), and the code gave the correct 107.
5. **Average of what?** A plain average of the rows is the average line. The average invoice is the invoice total divided
   by the distinct count of invoices.
6. **The label says what it is.** "Net Sales", "Invoices", "Customers", not "Total". The period is already in the
   report's header. Write labels in both languages with `NamaRep.name("عربي","English")`, never as an English
   `staticText`, because the Arabic copy of the report would print it in English.
7. **Few numbers.** 2 to 4 cards that a reader would act on. The highlighted card is the report's main number.
8. **Check it.** Run the report with a small filter and compare each card with the table by hand.

### When the user did not say which cards

Choose them from the report itself, as meaningfully as the report allows:
1. **Read the report.** Read its title, its SQL (`queryString`), and what is already totalled in the summary band and
   the group footers. Those totals are the author's own choice of what matters.
2. **Find what one row is.** A join to a lines table or a `GROUP BY` tells you whether a row is a line, a document,
   or a customer. Rules 4 and 5 depend on this.
3. **Pick in this order:**
   - **The main number**, highlighted: the most important amount already totalled in the summary band, such as net
     sales or the closing balance.
   - **How many of the main subject**: a distinct count of documents, customers or items, matching the report's
     title.
   - **One or two more** that the report is clearly about: a quantity next to an amount, or the highest or average
     document when one row is one document.
4. **Skip what fails the rules above.** If nothing passes, add no cards. A master-data list with no measure gets
   none.
5. **Tell the user** which cards you chose and why, and ask them to check one against the table (rule 8).

### Drawing the cards

Draw the cards in a `frame` marked with the role `cards`, usually in the **title band**. Put the variables with the
report's other variables:

```xml
<variable name="netSales" class="java.math.BigDecimal" resetType="Report" calculation="Sum">
    <variableExpression><![CDATA[$F{netValue}]]></variableExpression>
</variable>
<variable name="customersCount" class="java.lang.Integer" resetType="Report" calculation="DistinctCount">
    <variableExpression><![CDATA[$F{CustomerCode}]]></variableExpression>
</variable>
```

```xml
<frame>
    <reportElement x="0" y="40" width="555" height="50">
        <property name="nama-design-role" value="cards"/>
    </reportElement>
    <rectangle radius="6">
        <reportElement mode="Opaque" x="0" y="0" width="180" height="46" forecolor="#E3EEFA" backcolor="#E3EEFA"/>
        <graphicElement><pen lineWidth="0"/></graphicElement>
    </rectangle>
    <textField>
        <reportElement x="10" y="4" width="160" height="14" forecolor="#5B6B7F"/>
        <textElement><font size="8"/></textElement>
        <textFieldExpression><![CDATA[NamaRep.name("صافي المبيعات","Net Sales")]]></textFieldExpression>
    </textField>
    <textField evaluationTime="Report" pattern="#,##0.00">
        <reportElement x="10" y="18" width="160" height="24" forecolor="#0E3A66"/>
        <textElement><font size="13" isBold="true"/></textElement>
        <textFieldExpression><![CDATA[$V{netSales} ?: 0]]></textFieldExpression>
    </textField>
    <!-- the next cards: the same rectangle + label + value, moved right by the card width + 8 -->
</frame>
```

The compiler makes the frame print only when the design is Modern and the user did not tick **Hide Summary Cards**
(a question it adds next to "Report Design"). If the frame already has a `printWhenExpression`, that must be true too.

So that hiding the cards leaves **no empty gap**:
- Nothing else may sit in the frame's rows (from its `y` to `y + height`); move other title elements above or below it.
- Values shown in the title band need `evaluationTime="Report"`, because the title prints before any row is read.
- Card print-when expressions can use parameters, not totals (totals are not known yet when the title prints).
- Keep all cards in one row inside the one frame. The title band prints once, so the cards show on the first page only.
- Without a `cards` frame the report has no cards and no **Hide Summary Cards** question.

Suggested look (matches the wizard cards): 4 cards across the width with an 8px gap, 46px high, radius 6,
background `#F1F4F8` (`#E3EEFA` for the main one), label `#5B6B7F` 8pt, value `#0E3A66` 13pt bold.

## Step 5 - "Powered by" footer (recommended)

At the bottom of the page footer (and of the last page footer if the report has one):

```xml
<textField hyperlinkType="Reference" hyperlinkTarget="Blank">
    <reportElement x="355" y="20" width="200" height="12" forecolor="#8A94A3"/>
    <textElement textAlignment="Right"><font size="7"/></textElement>
    <textFieldExpression><![CDATA[NamaRep.poweredBy()]]></textFieldExpression>
    <hyperlinkReferenceExpression><![CDATA[NamaRep.appUrl()]]></hyperlinkReferenceExpression>
</textField>
```

`NamaRep.poweredBy()` prints "Powered by" and the application name of the running brand (Nama ERP, Exceed ERP, ...);
the link opens the brand's website. If the report had no page footer, adding one takes space from every page.

## Printing forms

Forms use the same markers. Differences:
- There is no question screen: the design comes from the form's **Default Report Design** field (Report Definition
  screen) if it is set, otherwise from the user's **Print design** (Settings -> GUI Preferences -> General Preferences).
  Print design is saved in the browser, not on the user, so another computer can print with another design.
- Theme and Modern print in ink-friendly colors on forms: a light tint of the color for the header and totals, white
  rows, dark text, and the color kept only for the lines. Classic is untouched.
- Forms and lists printed from the old (GWT) interface use Nama blue, like any run without a screen theme.
- Grid subreports of a form: opt in the form and the grid file, as in Step 3.
- A form or list must keep exactly one question, the printed record. When the Report Definition is saved, the
  **Report Design** and **Hide Summary Cards** questions the compiler adds are removed from forms and lists
  automatically; their parameters stay and still get the design. Never add a design question of your own to a form.
- If saving an opted-in form fails with "Report Definition should have one parameter refer to id field", check the
  form's own parameters first: only the record id may be a prompting parameter. Builds made before 2026-10-29 had
  no such removal, so on those servers every opted-in form fails with this message.

## Errors the save can show

| Message | Fix |
|---|---|
| Some elements are marked with nama-design-role but the report does not enable the nama-design property | Add the Step 1 property |
| The report enables nama-design but has no element marked with nama-design-role and no subreport | Mark cells, or remove the property |
| Unknown nama-design-role X on the element at x .. and y .., use header, row, total or cards | Fix the typo at that position |

## Reserved names

Do not use these parameter names for anything else: `reportDesign`, `hideSummaryCards`, `reportDisplayOptions`,
`reportThemeColor`, and every name starting with `design` (`designHeaderBack`, `designRowLine`, ...).

Use only the element properties above (`nama-design-role`, `nama-design-lines`, `nama-design-only-these-lines`). The wizard uses other `nama-design-...` properties for its own banner
(`nama-design-modern-header`, `nama-design-hidden-in-modern`, `nama-design-remove-line-when-blank`,
`nama-design-powered-by`); do not put them in a hand-written report.

## Check the result

1. Save the report on the Report Definition screen (the save is where the compiler runs; errors show here).
2. Run it in **Classic**: it must look exactly like before. If not, a marker was put on the wrong element.
3. Run it in **Theme colors** and **Modern**, in English and Arabic (the Arabic copy is mirrored automatically). Run it
   from the new (Vue) interface; the old one always shows Nama blue.
4. Switch to a dark theme and to a very pale one, and rerun with F5 each time: the header text must stay readable.
5. If it has cards: run Modern with and without **Hide Summary Cards**; with it ticked there must be no empty gap.
6. If it is a form: print a document from its screen with each Print design.
