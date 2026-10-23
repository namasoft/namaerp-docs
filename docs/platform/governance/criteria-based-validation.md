---
description: "The Criteria Based Validator screen: When/Then rules and queries that refuse, warn or ask for confirmation on save, limiting them to certain users, checking only on change, worked examples and messages."
entities: [CriteriaBasedValidator]
menu: Basic → Settings → Criteria Based Validator
---
# Criteria Based Validation

Every business has rules that the standard screens know nothing about. "Don't let anyone save a
stock issue with a zero quantity." "Warn the salesman when he sells below cost." "Nobody except
the warehouse supervisor may receive into the in-transit warehouse." "Once an invoice has been
sent to the tax authority, the customer on it can never change again."

Criteria Based Validation is where you write those rules down. You pick a screen, describe the
situation you want to catch, write the message the user should see, and from that moment on the
system refuses to save (or warns, or asks for confirmation) whenever the situation occurs — on
every screen, for every user, through the web client, the mobile app and imports alike.

You will find it under **Basic → Settings → Criteria Based Validator**.

## The mental model: *when* … *then* …

A validator is a small stack of rules, and each rule reads like a sentence:

> **When** the document is a credit sale, **then** the customer must have a credit limit.

The system evaluates the two halves separately:

1. It checks the **When** half. If the situation doesn't apply to the record being saved, the rule
   is skipped entirely and nothing happens.
2. If the **When** half holds, it checks the **Then** half. If **Then** holds too, all is well.
   If **Then** fails, the user gets your error message and the save is refused.

Both halves are optional. A rule with only a **Then** is an unconditional requirement ("quantity
must never be zero"). A rule with only a **When** is a trap ("if this situation exists at all,
refuse") — which is why so many real-world validators consist of nothing but a When query that
returns 1 when something bad is true.

Each half can be expressed in two ways, and you can use both at once:

- **When / Then** — pick a saved criteria record, built with the ordinary filter builder. Readable,
  no SQL, but limited to what a filter can express.
- **When Query / Then Query** — a SQL query. Anything you can ask the database, you can validate.

The queries are what most implementations end up using, so the rest of this page concentrates on
them.

![A Criteria Based Validator with one rule line](../../ar/platform/images/governance/criteria-based-validator-screen-en.png)

## Choosing what the validator watches

The header of the validator answers one question: *which records does this thing look at?* You
have three mutually exclusive ways to answer it.

| Field | What it does |
|---|---|
| **Target Type** | A single screen, e.g. `SalesInvoice`, `StockIssue`, `Employee`. This is the usual choice. |
| **Apply Also To** | An **Entity Type List** record, so one validator can cover a whole family of screens (all the sales documents, all the accounts-receivable files, …). Can be combined with Target Type. |
| **Applicable For** | A blanket scope: **All Screens**, **Documents**, or **Master Files**. Use it for house rules like "the branch may never be left as PUBLIC on any document". |

::: warning Applicable For stands alone
If you fill **Applicable For**, you must leave both **Target Type** and **Apply Also To** empty —
the system rejects the combination on save.
:::

**Priority** decides the order when several validators watch the same screen: the higher the
number, the earlier it runs. It matters mostly when you want the most important message to be the
first one the user sees.

**Error Message (Arabic)** and **Error Message (English)** on the header are a convenience:
whatever you type there is copied down into *every* rule line when you save.

::: danger The header message overwrites the lines
This copy is not a default — it is an overwrite. If you fill the header message, every line loses
its own wording. Leave the header message empty whenever your lines say different things.
:::

## The rules grid

Each row in the grid is one rule. The columns:

| Column | Meaning |
|---|---|
| **When** / **Then** | Saved criteria records used as the two halves of the rule. |
| **When Query** / **Then Query** | SQL versions of the same two halves. |
| **Lines Should Match** | Evaluate the rule line by line inside the document instead of judging the document as a whole. See [Working with document lines](#Working-with-document-lines). |
| **Validate with** — Insert / Update / Draft / Revise / UnRevise / Delete / With Approval | The actions that trigger this rule. At least one must be ticked. |
| **Approval Definition** / **Approval Steps (CSV)** | Narrow a *With Approval* rule down to one approval cycle, and to specific step numbers (`2,3`). |
| **Error Message** (Arabic / English) | What the user reads. At least one language is required. |
| **Error Message Content Query** | An extra query whose columns you can drop into the message. |
| **Error Field** / **Show Error By Line Number** | Attach the error to a particular field, so the screen highlights it. |
| **Validator Type** | **Error**, **Warning** or **Confirm**. Empty means Error. |
| **Inactive** | Switch a single rule off without deleting it. |
| **Remarks** | A note to your future self. Nobody but you sees it. |

## Writing the queries

### The zero-or-one rule

A When/Then query is a question with a yes/no answer, and the answer is the **first column of the
first row** the query returns:

- **0** (or `false`) means **no** — the half did not hold.
- Anything else — `1`, a count greater than zero, a piece of text — means **yes**.

That is why nearly every validator in the field is written with the same shape:

```sql
select case when <the thing I want to be true> then 1 else 0 end
```

For a **Then Query** you phrase the condition positively — "this must be true" — and the user sees
the error when it comes back 0. A stock issue that must never carry a zero quantity:

```sql
select case when {details.quantity.quantity.primeQty.value} = 0 then 0 else 1 end
```

### Reading values off the record

Anything in curly braces is a **field ID** on the record being saved, and it is replaced by that
record's value before the query is sent to the database. `{code}`, `{valueDate}`,
`{customer.id}`, `{details.item.item.code}`, `{lines.account.code}` — the same paths you see in the
field-ID picker everywhere else in the system.

A few placeholder tricks are worth knowing:

- **`{something.$toReal.field}`** — reach through a generic reference (a field that can point at
  several different types) to the record it actually points at:
  `{relatedEntity1.$toReal.id}`, `{employee.$toReal.hiring}`.
- **`{$user.code}`**, **`{$creationDate}`** — the user who is saving, and the moment the record was
  created.
- **`{loginUserId}`, `{loginEmployeeId}`, `{loginLegalEntityId}`, `{loginBranchId}`,
  `{loginSectorId}`, `{loginDepartmentId}`, `{loginAnalysisSetId}`** and their `…Code` / `…Name1` /
  `…Name2` variants — the session the user is logged into. These are the same parameters the report
  engine exposes.

### Comparing against the previous value

`{oldData.…}` gives you the value a field had **before** the current edit — the single most useful
thing you can do in an *Update* rule. Catching any change to the remarks:

```sql
select case when {remarks} <> {oldData.remarks} then 1 else 0 end
```

Blank values will trip this up, because a field that was empty and is now filled counts as a
change. Guard against it:

```sql
select case when {remarks} <> {oldData.remarks} and coalesce({oldData.remarks}, '') <> '' then 1 else 0 end
```

A real example — an invoice that has already gone to the tax authority may keep its customer
forever:

```sql
-- When Query: has it been sent?
select case when {taxAuthoritySysFields.taxAuthEntityStatusType} = 'Sent' then 1 else 0 end
-- Then Query: the customer must still be the same one
select case when {oldData.customer.id} = {customer.id} then 1 else 0 end
```

::: tip oldData only exists on an update
On insert there is no previous version, so `{oldData.…}` is empty. Tick **Validate with → Update**
(and untick Insert) on rules built around it.
:::

### A query that returns nothing counts as "yes"

If a query returns no rows at all, the system treats the half as holding. That sounds like a
footnote, but it is actually a favourite shortcut: append a `where` clause that only lets the row
through in the situation you care about, and the rule quietly disappears everywhere else.

```sql
select case when datediff(day, {startDate}, getdate()) > -1 then 0 else 1 end
where {vacationType.code} = 'VT00001'
```

For every other vacation type the query returns nothing, so no error is raised.

## Working with document lines

Here is the part that surprises people. When a placeholder points into a grid —
`{details.item.item.id}`, `{lines.amount.value.amount}` — the query is not run once. It is run
**once per line**, with that line's values substituted. What the system then does with those
per-line answers depends on **Lines Should Match**.

**With Lines Should Match off**, the document is judged as a whole:

- the **When** half holds only if **no** line answered 0;
- the **Then** half is violated as soon as **any** line answers 0.

**With Lines Should Match on**, each line is judged on its own. The When half holds if *at least
one* line answers non-zero, and the error is raised for exactly those lines that passed **When**
but failed **Then**. This is what you want for anything phrased as "no line may…", and it is by
far the most common setting in real implementations.

### A half that reads only header fields

A rule often mixes the two: the **When** half looks at the lines, the **Then** half looks only at
the header, or the other way round. Take a vacation request where some vacation types are allowed
for female employees only:

```sql
-- When Query: this line asks for one of the restricted types
select case when {details.vacationType.code} in ('014','016','017') then 1 else 0 end
-- Then Query: the employee must not be male
select case when {employee.gender} = 'Male' then 0 else 1 end
```

The Then Query has no line placeholder, so it runs once for the whole document, and its answer
counts for **every** line. If the employee is female, every line passes; if male, every line that
asked for a restricted type is reported. The same holds for a **Then Condition** whose criteria
use only header fields, and for a **When** half that reads only the header: when it answers yes,
every line goes on to the **Then** check.

::: warning Releases before 20261014 judged a header-only half against the first line only
On releases older than 20261014, a half with no line placeholder counted for the first line only. A
header-only **Then** then rejected every later line that passed **When**, however it answered, and a
header-only **When** sent only the first line to the **Then** check. If a customer on one of these
releases meets this, repeat the line condition inside the header-only query, so it runs once per
line:

```sql
select case when {details.vacationType.code} in ('014','016','017')
    and {employee.gender} = 'Male' then 0 else 1 end
```
:::

::: warning With Lines Should Match on, a line with no answer fails Then
The "a query that returns nothing counts as yes" rule above does not hold for a **Then Query**
that runs per line. When it returns no rows for a line, that line counts as failing, and it is
reported if it passed **When**. Make a per-line Then Query always return a row: put the
condition inside the `case` rather than in a `where` clause.
:::

### Telling the user which line

Once a rule runs per line, the system knows the line numbers that failed and hands them to you as
`{$map.errorLines}`:

```
Selling price is below cost — line {$map.errorLines}
```

The placeholder expands to a comma-separated list of 1-based line numbers. At most 50 lines are
reported; beyond that the list is truncated so a broken 5,000-line import doesn't drown the user
in messages.

### Highlighting the field itself

Instead of (or as well as) naming the line in the text, you can attach the error to a field so the
screen jumps to it and marks it red:

- **Error Field** — the field ID to highlight, e.g. `details.price.unitPrice`.
- **Show Error By Line Number** — tick this when the error field lives in a grid. The system then
  raises one error per failing line, anchored to that line's cell.

::: warning The two settings travel together
A grid field without **Show Error By Line Number** is rejected when you save the validator, and
ticking **Show Error By Line Number** without an **Error Field** is rejected too. The field must
also really exist on the target screen — a typo is caught on save, not at runtime.
:::

## Making the message worth reading

"Invalid data" helps nobody. Three tools make the message specific.

**Fields of the record** can be dropped straight into the text:

```
User ({firstAuthor.name1}) is not allowed to receive into warehouse ({toWarehouse.name1})
```

**Error Message Content Query** pulls in facts from elsewhere. Every column the query selects
becomes a placeholder named after that column, usable in both messages. Telling the salesman what
the credit limit actually is:

```sql
-- Error Message Content Query
select c.limitValue, c.paymentPeriod from Customer c where c.id = {customer.id}
```

```
This customer has a credit limit of {limitValue} and a maximum payment period of {paymentPeriod}
```

**A clickable link** to the offending record turns a complaint into a shortcut. Select the record's
type, id and code in the content query, then wrap them:

```sql
-- Error Message Content Query
select top 1 entityType, id, code from MissionDocument
where employee_id = {employee.id} and id <> {id}
```

```
The employee already has a mission document {titledlink(entityType,id)}{code}{endlink}
```

Messages are full [Tempo templates](/admin/tempo.md), so the rest of that syntax is available too.

## Error, Warning or Confirm

The **Validator Type** decides how hard the rule pushes back.

**Error** is the default and the flat refusal: the message appears and nothing is saved.

**Warning** lets the save go through and shows the message anyway. Use it for things that are
usually a mistake but legitimately happen — "another customer is already registered with this tax
number", "this employee has been with us less than three months".

**Confirm** stops and asks. The user reads the message and either confirms and continues, or backs
out. It is the right choice for judgement calls: selling below cost, paying a customer into a
negative balance, creating a second mission document over the same dates.

::: warning Confirm only works on save and delete
There is no confirmation dialog behind a draft, a revise, an unrevise or an approval step, so a
**Confirm** rule may not tick **Draft**, **Revise**, **UnRevise** or **With Approval**. The system
refuses to save the validator if it does. Confirmations are also skipped during imports.
:::

## When the check runs

The **Validate with** columns are what connect a rule to an action. Tick only what you mean:

- **Insert** — the record is being committed for the first time.
- **Update** — an already-committed record is being committed again.
- **Draft** — the user is saving a draft. Untick it if drafts are meant to be a scratchpad.
- **Delete** — the user is deleting the record. This is where you protect referenced data: "this
  task appears on a meeting-minutes document and cannot be deleted".
- **Revise** / **UnRevise** — the document is being marked reviewed, or that mark is being removed.
- **With Approval** — someone is acting on an approval step. Combine it with **Approval Definition**
  and **Approval Steps (CSV)** to fire only inside a particular cycle, at particular steps. See
  [Approvals](/platform/approvals/approvals-system.md).

::: tip Validators do not run in the background
Business requests processed in the background — the accounting and inventory effects of a document
— never run criteria based validation. Validation happens while a human (or an import) is saving
the record, not while its effects are being processed later.
:::

## Limiting the check to certain people

Sometimes a rule is really about authority: everyone must respect it except the branch manager, or
only the two data-entry users are subject to it. That is what **Policy** and the **Selected Group**
grid are for.

Fill the grid with **users**, **user groups**, or **security profiles** — any mix — then choose:

- **Apply On Selected** — the rule affects only the people in the list.
- **Apply On All Except Selected** — the rule affects everybody else.

Leave the grid empty and the rule applies to everyone, whatever the policy says.

::: tip Prefer groups and profiles to user lists
Listing individual users works, and plenty of live systems do it — but every new hire then means
editing the validator. A user group or a security profile keeps the rule stable.
:::

## Only check when something actually changed

The **Critical Fields** grid at the bottom is a filter on *updates*. List a few field IDs there and
the validator is skipped on update unless at least one of those fields changed. Insert, delete and
revise are unaffected — the rule always runs for them.

It is the cure for the validator that keeps blocking a document because of a condition nobody on
this edit touched. If the rule is about the item's "free goods" flag, list
`details.item.item.b1` and the rule stops interfering with edits to the delivery address.

## Switching things off

Three separate switches, at three levels:

- **Inactive** on the header takes the whole validator out of circulation — and, as a convenience,
  ticks **Inactive** on every one of its lines when you save.
- **Inactive** on a line disables that single rule.
- **Inactive With Replication** keeps the validator active for normal users but skips it while data
  is arriving through replication — useful when a rule is about data entry discipline rather than
  data integrity, and the sending site has already enforced it.

**Ignore Validation On Approval** on the header does something narrower: it skips the whole
validator when the record is being committed as the *result* of an approval cycle finishing. The
document was already checked when it was submitted; this stops the same complaint from blocking
the approver.

::: info The script fields are retired
**Validation Script**, **Effect Script** and **Delete Script** still appear on old records but can
no longer be used — saving a validator that fills them fails with a message telling you to replace
them with an [Entity Flow](/platform/entity-flows/introduction-to-entity-flows.md).
:::

## Worked examples

The patterns below are drawn from live implementations, with the wording translated and the codes
made generic.

### Require a value

The simplest useful validator: no line of a stock issue may carry a zero quantity.

- **Target Type**: `StockIssue`
- **Validate with**: Insert, Draft
- **Then Query**:

```sql
select case when {details.quantity.quantity.primeQty.value} = 0 then 0 else 1 end
```

- **Message**: *You must enter a quantity for every item.*

### Require a value only in a particular case

When the country is "Other", the free-text country name becomes mandatory.

- **Target Type**: `Employee`
- **When Query**:

```sql
select case when {contactInfo.address.country} = 'Other' then 1 else 0 end
```

- **Then Query**:

```sql
select case when {description4} = '' then 0 else 1 end
```

- **Message**: *Please write the country name when you choose "Other".*

### Prevent a duplicate

No two employees may share a bank account, no two documents the same manual reference. The shape is
always a count against the same table with `id <> {id}` so the record doesn't collide with itself.

- **Target Type**: `PurchaseInvoice`
- **Then Query**:

```sql
select case when count(1) > 0 then 0 else 1 end
from PurchaseInvoice e where e.manualRef1 = {manualRef1} and e.id <> {id}
```

- **Error Message Content Query**:

```sql
select top 1 code from PurchaseInvoice e where e.manualRef1 = {manualRef1} and e.id <> {id}
```

- **Message**: *This manual reference is already used by invoice {code}.*

### Block a sale that exceeds the customer's credit limit

The credit limit on the customer file is recorded but never enforced by the product itself — see
[Credit limits](/platform/shared-master-files/customers-suppliers-and-parties#Credit-limits----what-the-system-does-and-what-it-does-not).
This validator is how the block is actually built, and it is the most frequently asked-for rule on
this screen.

- **Target Type**: `SalesInvoice`
- **Validate with**: Insert, Update
- **Then Query**:

```sql
select case when {customer.limitValue} > 0
             and coalesce(sum(l.debitLocalAmount - l.creditLocalAmount), 0) + {money.remaining}
                 > {customer.limitValue}
            then 0 else 1 end
from Customer c
left join ledgertransline l
       on l.subsidiaryId = c.id and l.account_id = c.mainAccount_id and l.originId <> {id}
where c.id = {customer.id}
```

- **Error Message Content Query**:

```sql
select c.limitValue, c.paymentPeriod from Customer c where c.id = {customer.id}
```

- **Message**: *This invoice takes the customer past a credit limit of {limitValue}.*

Reading it back: the query adds up the customer's movement on their subsidiary account — debits
minus credits, which is what they owe — and adds **`{money.remaining}`**, the unpaid part of the
invoice being saved. If the total goes over the limit, the *Then* half returns 0 and the save is
refused.

Three details make the difference between a rule that works and one that annoys everybody:

- **`{customer.limitValue} > 0` is the exemption.** A customer with no limit is not checked at all,
  which is how you let cash customers and exempt accounts through — leave their limit at zero.
- **`l.originId <> {id}` excludes the invoice's own entries.** Without it, re-saving an invoice that
  is already processed counts its amount twice and the customer is refused for a debt they took on
  with this very invoice.
- **Only the main account is counted.** If the customer's debt is spread over several accounts,
  widen the join instead:

```sql
and l.account_id in (coalesce(c.mainAccount_id, 0x1), coalesce(c.account1_id, 0x1))
```

If the house rule is a warning rather than a refusal — the salesman may proceed, but somebody should
know — set **Validator Type** to *Warning* or *Confirm* and the same query starts asking instead of
blocking.

### Block a change after a point of no return

Once the invoice has been reported to the tax authority, the customer is frozen. Shown in full
under [Comparing against the previous value](#Comparing-against-the-previous-value) above.

### Catch a bad line and point at it

No line may be sold below its average cost — reported per line, as a confirmation rather than a
hard stop, because management sometimes approves it.

- **Target Type**: `SalesInvoice`
- **Lines Should Match**: ticked
- **Validator Type**: Confirm
- **When Query**:

```sql
select top 1 case when coalesce(q.avgCost, 0) > {details.price.unitPrice} then 1 else 0 end
from ItemDimensionCost q where q.item_id = {details.item.item.id}
```

- **Then Query** — services have no cost, so exclude them:

```sql
select case when {details.item.item.itemType} = 'Service' then 1 else 0 end
```

- **Message**: *Selling price is below cost on line {$map.errorLines}.*

### Restrict an operation to certain people

Only a named set of users may receive into each warehouse. One rule per warehouse, all in the same
validator.

- **Target Type**: `ReceiptStockTransfer`
- **When Query**:

```sql
select case when {toWarehouse.code} = 'W0103' then 1 else 0 end
```

- **Then Query**:

```sql
select case when {firstAuthor.code} in ('10428', '10431', '10045') then 1 else 0 end
```

- **Message**: *User ({firstAuthor.name1}) is not allowed to receive into warehouse
  ({toWarehouse.name1}).*

### Enforce a house rule on every document

The analysis dimensions must be filled on every document in the system, except the HR documents
that legitimately run on the public dimension.

- **Applicable For**: Documents
- **When Query**:

```sql
select case when {entityType} in
  ('SalarySheet','TimeAttendance','LeavePermission','MissionDocument','VacationDocument')
then 0 else 1 end
```

- **Then Query**:

```sql
select case when {analysisSet.code} = 'PUBLIC' then 0 else 1 end
```

- **Message**: *Please choose a project.*

### Guard a deletion

A task that has been written into meeting minutes cannot simply disappear.

- **Target Type**: `WorkTask`
- **Validate with**: Delete
- **When Query**:

```sql
select case when count(1) > 0 then 1 else 0 end
from MeetingRemarkLine mrl where mrl.ref1id = {id}
```

- **Error Message Content Query**:

```sql
select top 1 mr.code as mr_code, mr.remarkDate as mr_remarkDate
from MeetingRemarkLine mrl
left join MeetingRemark mr on mr.id = mrl.meetingRemark_id
where mrl.ref1id = {id}
```

- **Message**: *This task is listed on meeting document {mr_code} dated {mr_remarkDate} and cannot
  be deleted.*

### Warn without blocking

The customer's tax policy is missing — worth mentioning, not worth refusing the sale over.

- **Target Type**: `SalesInvoice`
- **Validator Type**: Warning
- **Then Query**:

```sql
select case when {customer.taxPlan} is not null then 0 else 1 end
```

- **Message**: *Please check the tax policy on the customer file.*

## Checks the system runs on your validator

The validator itself is validated when you save it, which catches most mistakes before any user
ever meets them. Each line must carry a message in at least one language, must have at least one
of the four When/Then boxes filled, and must tick at least one **Validate with** action. The header
must name a Target Type, an Apply Also To list or an Applicable For scope — and Applicable For may
not be combined with the other two. An **Error Field** must exist on the target screen, and a
**Confirm** line may not be tied to draft, revise, unrevise or approval.

## Messages you may see

Refusals raised when you save the validator record itself.

| Message | Why | What to do |
|---|---|---|
| *You must select at least one value for validate with* — «يجب اختيار على الاقل قيمه فى التحقق مع» | A rules line has none of the **Validate with** actions ticked — not insert, update, delete, revise, unrevise, draft or approval — so the line would never run. | Tick at least one action on that line. |
| *Field {0} was not found in entity type {1}* — «الحقل {0} غير موجود فى نوع السجل {1}» | The **Error Field** on a line is not a field of the target screen — usually a typo, or a path copied from a different screen. | Re-pick the error field from the target screen, or clear it and let the message appear at record level. |
| *Field {0} is a detail field, you must activate {1}* — «الحقل {0} حقل تفاصيل, يجب تفعيل {1}» | The **Error Field** points inside a grid while **Show Error By Line Number** is off, so the system would have no line to attach the error to. | Tick **Show Error By Line Number** on that line, or choose a header field instead. |
| *Options {0}, {1}, {2}, and {3} could not be used with validator of type Confirm* — «الحقول {0} و {1} و {2} و {3} لا يمكن ان تكون مفعلة عند إستخدام المعيار مع التأكد» | A line of type **Confirm** is tied to draft, revise, unrevise or approval. A Confirm asks the user a question, and those four points have nobody to ask. | Leave a Confirm line on insert, update and delete only, or change its type to Error or Warning. |

## Related pages

- [Criteria from Text Parser](/platform/automation-and-rules/text-criteria-guide.md) — the filter syntax behind saved
  criteria records.
- [Tempo](/admin/tempo.md) — the template syntax used in error messages.
- [Entity Flows](/platform/entity-flows/introduction-to-entity-flows.md) — for when you need to
  *do* something rather than refuse something.
- [Approvals](/platform/approvals/approvals-system.md) — approval cycles, definitions and steps.
- [Input validation in Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-input-validation) —
  for rules about a single field's *shape* rather than the document's meaning. The Field Formats
  grid there enforces "a tax number is fifteen digits" or "a mobile number starts with 05" without
  a query, and each row can be gated by a criteria record so the format only applies in the
  situations you choose.
