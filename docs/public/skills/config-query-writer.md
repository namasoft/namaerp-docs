---
name: config-query-writer
description: >
  Write the queries and criteria that Nama ERP configuration screens evaluate against a record: Apply When /
  Do Not Apply When queries (entity flows, approvals, approval steps, notifications, GUI post actions),
  Criteria Based Validator When/Then queries, notification Targets Query, text criteria, and the Dynamic Filter
  of Field Filter With Criteria. Use it whenever the user asks for "a query so the flow/approval only runs when…",
  "a validation that blocks…", "filter this lookup to…", or pastes a configuration query that does not behave.
---

# Config Query Writer

Configuration screens hold three different languages. Find out which one the field takes before writing anything:

| The field | Language | Section |
|---|---|---|
| **Apply When Query**, **Do Not Apply When Query**, **Step Apply When Query**, a validator's **When Query** / **Then Query** | T-SQL yes/no question with `{field}` placeholders | Step 2 |
| Notification **Targets Query** | T-SQL returning recipients, with `{field}` placeholders | Step 3 |
| A **Criteria Definition**, a text criteria in an API or entity-flow parameter | Text criteria `fieldId,Operator,value,AND;` | Step 4 |
| **Dynamic Filter** of Field Filter With Criteria | Text criteria filled from the open record | Step 5 |
| A field map (`target=sql(…)` in an entity flow) | T-SQL with the same `{field}` placeholders | the [field maps guide](https://docs.namasoft.com/entity-flows/core/ai-generated-field-maps-documentation.html) |

All SQL is **T-SQL (SQL Server)** and read-only: a `select`, never a write.

---

## Step 1 — Learn the record's field ids

Placeholders and criteria use **field ids**, not column names. Read the entity's data-model JSON
(`namaerp-dm/docs/public/dm-json/<Entity>.json` in the support knowledge base, or `https://dm.namasoft.com`):
each field has an `id` (use it inside braces) and a `column` (use it in your own `from`/`where` against other
tables). Grid fields are listed under `details` with ids that already carry the grid name
(`details.item.item`, `details.quantity.quantity.primeQty.value`, `details.specificDimensions.warehouse`).

Totals people ask for most:

| Record | Field id |
|---|---|
| Sales/purchase invoices and orders — net total | `money.netValue` (gross before discounts: `money.total`) |
| Receipt / payment voucher amount | `amount.value.amount` |
| Journal entry, vouchers — totals | `totalDebit`, `totalCredit` |
| Line unit price / line net | `details.price.unitPrice` / `details.price.netValue` |

For table and join conventions in the SQL you write around the placeholders (`commitedBefore = 1`, `name1`
Arabic / `name2` English, where amounts and quantities live) read
`namaerp-docs/docs/platform/reports/querying-nama-tables.md`
(https://docs.namasoft.com/platform/reports/querying-nama-tables.html).

---

## Step 2 — Yes/no queries

### How the answer is read

Only the **first column of the first row** counts:

- a number equal to **0**, or a bit/boolean **false** → **no**;
- anything else → **yes**: any other number, any text (even `'0'`), and **NULL**;
- **no rows at all → yes.**

So always return an explicit number: `select case when <condition> then 1 else 0 end`. Wrap aggregates —
`isnull(sum(...), 0)` — because a `sum` over no rows is NULL, which reads as yes.

### Placeholders

- `{fieldId}` is replaced by the record's value **as a bound parameter**, not pasted as text. Never put it inside
  quotes: `'{code}'` and `like '%{code}%'` break. Write `{code}` and `like '%' + {code} + '%'`.
- Every `{` in the query text starts a placeholder, including inside a string or a comment. Keep braces out of
  everything except placeholders.
- How values arrive: a reference sends its **id** (`{customer}` = `{customer.id}`; compare with `customer_id`
  columns or `id`); an enum sends its constant name (`{employee.gender} = 'Male'`); dates and yes/no fields arrive
  typed.
- A field id that does not exist on the record is sent as **NULL**, with no error. A typo therefore turns the
  query silently into "no" (`NULL > 100` is not true) or "yes" (NULL in the first column). Check every id
  against the DM.
- `{x.$toReal.field}` reads through a generic reference to the record it points at; `{details.$size}` is the
  number of lines; `{oldData.field}` is the value before the current edit (empty on insert).
- Session values exist in every query: `{loginUserId}` / `Code` / `Name1` / `Name2`, `{loginEmployeeId}`,
  `{loginLegalEntityId}` and the same `Id` / `Code` / `AltCode` / `Name1` / `Name2` set for `loginBranch`,
  `loginSector`, `loginDepartment`, `loginAnalysisSet`, plus `{loginLanguage}`.
- An empty numeric placeholder binds an untyped NULL, and arithmetic on it fails with
  `Operand data type nvarchar is invalid for multiply operator`. Guard values that may be empty:
  `isnull(try_cast({details.n1} as decimal(20,6)), 0)`.

### Grid placeholders run the query once per line

If any placeholder points into a grid (`{details.…}`, `{lines.…}`), the query runs **once per line** with that
line's values. Header-only placeholders run it once. How the per-line answers combine depends on the field:

| Field | The record matches when |
|---|---|
| Entity flow **Apply When Query**, notification and GUI post action **Apply When Query** | no line answers 0 |
| Entity flow **Do Not Apply When Query** | (flow skipped when) no line answers 0 |
| Approval **Apply When Query**, **Step Apply When Query** | at least one line answers yes (or no line answers 0) |
| Criteria Based Validator When/Then | depends on **Lines Should Match** — read its page |

Lines that return no row count neither way. An entity flow's Apply When Query therefore means "every line".
For "run when **any** line…", invert it into the **Do Not Apply When Query**: the line that has the condition
answers 0, every other line 1, and the flow is skipped only when no line answered 0:

```sql
select case when {details.price.unitPrice} = 0 then 0 else 1 end   -- runs when any line has a zero price
```

### Validators

Criteria Based Validator has its own rules on top of these: Lines Should Match, `{$map.errorLines}`, Error
Field, Warning/Confirm. Read `namaerp-docs/docs/platform/governance/criteria-based-validation.md`
(https://docs.namasoft.com/platform/governance/criteria-based-validation.html) — sections "Writing the queries"
and "Working with document lines" — before writing one.

---

## Step 3 — Targets Query (notifications)

Return rows of **entity type, then id (or code)** — further columns are ignored, and a row with either value
empty is skipped. Placeholders work as in Step 2:

```sql
select entityType, id from Customer where parent_id = {relatedSubsidiary.id}
```

Page: `namaerp-docs/docs/platform/notifications/notifications-system.md`.

The approval **Responsible Type = Query** is different: it runs as an entity (HQL) query that must return
Employee records, and it fills no `{field}` placeholders. Prefer **From Field** or a criteria-based responsible
(see `namaerp-docs/docs/platform/approvals/responsibilities-and-delegation.md`).

---

## Step 4 — Text criteria

One condition per line or per `;`:

```
fieldId,Operator,value,AND;
```

- Operator names are case-sensitive: `Equal`, `NotEqual`, `GreaterThan`, `GreaterThanOrEqual`, `LessThan`,
  `LessThanOrEqual`, `StartsWith`, `NotStartsWith`, `EndsWith`, `NotEndWith`, `Contains`, `NotContain`, `In`,
  `NotIn`, `WithinPeriod`, `OutsidePeriod`, `OpenBracket`, `CloseBracket`. An empty operator means `Equal`.
- The connector is exactly `AND` or `OR` (upper case); omitted means `AND`.
- Add `OrEmpty` to an operator (`EqualOrEmpty`) to skip the line when its value is empty.
- The line is split on commas, so **a value cannot contain a comma**. Lists for `In`/`NotIn` use `@A=@X` between
  values.
- Dates are `dd-MM-yyyy`; references can be filtered by `field.id` or `field.code`.

Full syntax, period presets and `$today()`-style values: `namaerp-docs/docs/platform/automation-and-rules/text-criteria-guide.md`
(https://docs.namasoft.com/platform/automation-and-rules/text-criteria-guide.html). To build one visually, use a
Criteria Definition (`criteria-definitions.md` in the same folder).

---

## Step 5 — Field Filter With Criteria (Dynamic Filter)

The Dynamic Filter is text criteria (Step 4) about the **record being searched** (the item, customer,
warehouse), filled with values from the **record being edited**:

- Without **Use Tempo**: placeholders are `${field}` — `code,Equal,${customer.code},AND;`.
- With **Use Tempo** ticked: Tempo syntax, `{field}`, `{loop(details)}…{endloop}`, `{if(…)}…{endif}`.
- The left side names fields of the searched screen. The lookup on your document (`details.item.item`) goes in
  the line's **Field** column, never in the condition.

Page: `namaerp-docs/docs/platform/field-filtering/field-filter-with-criteria.md`.

---

## Step 6 — Test before you hand it over

1. Read a real record (`<prefix>GetRecord` when a Nama MCP server is connected, otherwise ask for one).
2. Replace each `{placeholder}` with that record's value. The read-only query tool
   (`<prefix>runReadOnlySqlQuery`) runs the text as written and fills no placeholders.
3. Run it and check the first column: 0 where the rule must say no, non-zero (or no rows) where it must say yes.
   Try one record of each kind.
4. For a grid query, run it once per line's values.

Hand over the query with the field it goes in, the record type, and one line on what yes and no mean.

---

## Reminders

- `case when … then 1 else 0 end`; `isnull()` around aggregates; no rows = yes, NULL = yes.
- No quotes around placeholders, no braces anywhere else.
- Field ids from the DM, `{customer.id}` against `customer_id`.
- Grid placeholders run the query per line. Check the table above for how the lines combine.
- SELECT only, T-SQL only.
