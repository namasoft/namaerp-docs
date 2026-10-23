---
entities: [CriteriaDefinition]
---
# Criteria from Text Parser (Text Criteria Guide)

Nama ERP provides a flexible text-based filtering mechanism that allows users to define filter criteria using a simple, structured format.

Each filter condition in Nama ERP consists of the following components:

* **Field ID**: The property (field) to apply the filter on.
* **Operator**: One of the following options:

    * `Equal`, `NotEqual`
    * `GreaterThan`, `GreaterThanOrEqual`
    * `LessThan`, `LessThanOrEqual`
    * `StartsWith`, `NotStartsWith`
    * `EndsWith`, `NotEndWith`
    * `Contains`, `NotContain`
    * `In`, `NotIn` (see [Multiple Values with In/NotIn](#Multiple-Values-with-InNotIn) below)
    * `WithinPeriod`, `OutsidePeriod` (for date / date-time fields, see [Period Operators (WithinPeriod/OutsidePeriod)](#Period-Operators-WithinPeriodOutsidePeriod) below)
    * `OpenBracket`, `CloseBracket` (used for grouping expressions, and do not require a field ID or value)
* **Compared Value**: The value to compare against.
* **Logical Relationship**: The logical connector to the next condition (`AND` or `OR`).

### Conditional Operators (OrEmpty Suffix)

Any operator can have the `OrEmpty` suffix appended to make the condition optional when no value is provided. If the value is empty, the entire condition is skipped.

For example:
* `EqualOrEmpty` - Applies Equal only if a value is provided
* `ContainsOrEmpty` - Applies Contains only if a value is provided
* `GreaterThanOrEqualOrEmpty` - Applies GreaterThanOrEqual only if a value is provided

This is useful for building dynamic filters where some criteria may or may not have values:
```
code,StartsWithOrEmpty,{userInput},AND;
```
If `{userInput}` is empty, this condition is ignored entirely.

### Special Commands

**distinct-values**: Add this as a separate line to return only distinct records:
```
distinct-values
code,StartsWith,01,AND;
```

### Multiple Values with In/NotIn

The `In` and `NotIn` operators allow you to match a field against multiple values. To specify multiple values in the text criteria format, separate them with the special delimiter `@A=@X`.

**Syntax:**
```
fieldID,In,value1@A=@Xvalue2@A=@Xvalue3,AND;
```

**Examples:**

Filter items where status is either "Active", "Pending", or "Review":
```
status,In,Active@A=@XPending@A=@XReview,AND;
```

Filter records where category code is NOT "CAT01" or "CAT02":
```
category.code,NotIn,CAT01@A=@XCAT02,AND;
```

Filter by multiple reference IDs:
```
warehouse.id,In,id1@A=@Xid2@A=@Xid3,AND;
```

::: warning
The separator `@A=@X` must be used exactly as shown (case-sensitive). Do not add spaces around the separator.
:::

![A Criteria Definition; Convert To Text turns the tree into text criteria](../../ar/platform/images/criteria-definitions/criteria-definition-screen-en.png)

## Period Operators (WithinPeriod/OutsidePeriod)

The `WithinPeriod` and `OutsidePeriod` operators apply only to **date** and **date-time** fields. They check whether the field's date falls inside (`WithinPeriod`) or outside (`OutsidePeriod`) a date range. For date-time fields, only the date part is considered.

The value is **not** a single date — it is a period, expressed in one of two ways:

### 1. Named preset

A preset keyword that is resolved relative to the current date. The allowed presets are:

| Preset | Description |
|--------|-------------|
| `Today` | The current day |
| `Yesterday` | The previous day |
| `ThisWeek` | The current week (Sunday to Saturday) |
| `PreviousWeek` | The previous week (Sunday to Saturday) |
| `ThisMonth` | The current calendar month |
| `PreviousMonth` | The previous calendar month |
| `ThisQuarter` | The current calendar quarter |
| `PreviousQuarter` | The previous calendar quarter |
| `ThisYear` | The current calendar year |
| `PreviousYear` | The previous calendar year |
| `Last7` | The last 7 days (today and the 6 days before it) |
| `Last30` | The last 30 days (today and the 29 days before it) |
| `Last90` | The last 90 days (today and the 89 days before it) |
| `Last365` | The last 365 days (today and the 364 days before it) |

**Examples:**

Filter records where `date1` falls within the current month:
```
date1,WithinPeriod,ThisMonth,AND;
```

Filter records whose `creationDate` is outside the last 7 days:
```
creationDate,OutsidePeriod,Last7,AND;
```

### 2. Explicit date range

An explicit `from` and `to` date separated by `@`. Both dates use the ISO format `yyyy-MM-dd`:

```
fieldID,WithinPeriod,<from>@<to>,AND;
```

**Example** — records where `date1` is within the first half of 2025:
```
date1,WithinPeriod,2025-01-01@2025-06-30,AND;
```

::: warning
With `WithinPeriod` / `OutsidePeriod` the value must be either one of the presets listed above or an explicit `yyyy-MM-dd@yyyy-MM-dd` range. The single-date format (`dd-MM-yyyy`) used by other operators does not apply here.
:::

## Format

Each filter condition is represented as a line of text with four parts separated by commas:

```
fieldID,operator,value,logic;
```

Multiple conditions can be separated by semicolons (`;`) or newlines. Both formats are valid:

**Single-line format:**
```
code,StartsWith,01,AND;name1,Contains,abc,AND;
```

**Multi-line format:**
```
code,StartsWith,01,AND
name1,Contains,abc,AND
```

### Default Values

* If **operator** is omitted, it defaults to `Equal`
* If **logical relationship** is omitted, it defaults to `AND`

This means the simplest form of a filter is just:
```
fieldID,,value
```
Which is equivalent to `fieldID,Equal,value,AND`

### Special Field Formats

* **Date Fields**: Format must be `dd-MM-yyyy`
* **Date-Time Fields**: Format must be `yyyy-MM-ddTHH:mm:ss.SSS` (milliseconds can be `000`)
* **Reference Fields**: A reference is written as a colon-separated string:

  ```
  <id>:<entityType>:<code>
  ```

    * The `code` part is optional.
    * Alternatively, you can reference specific parts using `.id` or `.code` for clarity and simplicity.

## Example

```csv
code,StartsWith,01,AND;
name1,Contains,abc,AND;
date1,Equal,06-07-2025,AND;
creationDate,GreaterThanOrEqual,2025-07-06T13:05:00.000,AND;
n1,Equal,10,AND;
section,Equal,ffff0001-79e2-11f2-8800-0000ff79c2dd:ItemSection:00,AND;
```

The last line can also be expressed in two alternative forms:

```csv
section.id,Equal,ffff0001-79e2-11f2-8800-0000ff79c2dd,AND;
section.code,Equal,00,AND;
```

## Dynamic Values

In addition to static values, Nama ERP supports dynamic values that are evaluated at runtime. These are especially useful for date-based filters and user-specific criteria.

### Date Dynamic Values

The following dynamic values can be used in place of static dates:

| Value | Description |
|-------|-------------|
| `$today()` | Current date |
| `$now()` | Current date and time |
| `$monthStart()` | First day of the current month |
| `$monthEnd()` | Last day of the current month |
| `$previousMonthStart()` | First day of the previous month |
| `$previousMonthEnd()` | Last day of the previous month |
| `$nextMonthStart()` | First day of the next month |
| `$nextMonthEnd()` | Last day of the next month |
| `$yearStart()` | First day of the current year |
| `$yearEnd()` | Last day of the current year |
| `$previousYearStart()` | First day of the previous year |
| `$previousYearEnd()` | Last day of the previous year |
| `$nextYearStart()` | First day of the next year |
| `$nextYearEnd()` | Last day of the next year |
| `$quarterStart()` | First day of the current quarter |
| `$quarterEnd()` | Last day of the current quarter |
| `$halveStart()` | First day of the current half-year (6-month period) |
| `$halveEnd()` | Last day of the current half-year |
| `$thirdStart()` | First day of the current third (4-month period) |
| `$thirdEnd()` | Last day of the current third |

### Relative Date Values

You can also calculate dates relative to today:

| Value | Description |
|-------|-------------|
| `$todayPlusDays(N)` | Today plus N days |
| `$todayMinusDays(N)` | Today minus N days |
| `$todayPlusWeeks(N)` | Today plus N weeks |
| `$todayMinusWeeks(N)` | Today minus N weeks |
| `$todayPlusMonths(N)` | Today plus N months |
| `$todayMinusMonths(N)` | Today minus N months |
| `$todayPlusYears(N)` | Today plus N years |
| `$todayMinusYears(N)` | Today minus N years |

### User Context Values

These tokens are replaced with values taken from the session the criteria is evaluated for. Unlike
the date values above they are written in braces, not with a `$`:

| Value | Description |
|-------|-------------|
| `{loginUserId}` | ID of the current logged-in user — `{loginUserCode}`, `{loginUserName1}` and `{loginUserName2}` also exist |
| `{loginEmployeeId}` | ID of the employee linked to that user |
| `{loginLegalEntityId}` | The legal entity the user is logged in with — the same `…Id` / `…Code` / `…Name1` / `…Name2` set exists for `loginBranch`, `loginSector`, `loginDepartment` and `loginAnalysisSet` |
| `{loginLanguage}` | The language of the session |

### Dynamic Values Example

```csv
date1,GreaterThanOrEqual,$monthStart(),AND;
date1,LessThanOrEqual,$monthEnd(),AND;
createdBy.id,Equal,{loginUserId},AND;
dueDate,LessThanOrEqual,$todayPlusDays(30),AND;
```

This example filters records where:
* `date1` is within the current month
* `createdBy` is the current logged-in user
* `dueDate` is within the next 30 days

::: tip
You can use the screen [Criteria Definition](/platform/automation-and-rules/criteria-definitions) to visually build the required filter conditions through the system interface.
Once you've defined the desired criteria using the UI, simply click the **Convert to Text** button to generate the equivalent text-based representation.
This text can then be used directly in APIs or automation scripts.
:::
