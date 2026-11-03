# Field Maps in Nama ERP - Complete Guide

## Overview

Field maps are a powerful feature in Nama ERP that allow automatic copying and transformation of data between different entities (records). This system is primarily used in Entity Flows to generate new documents from existing ones (e.g., creating a Credit Note from a Sales Invoice).

## Basic Concept

A field map is a set of instructions that tells the system:
- **What data to copy** (source field)
- **Where to copy it** (target field)
- **How to transform it** (optional functions)

The basic syntax is:
```
targetField=sourceField
```

## Simple Field Mapping

### Direct Field Copy
The simplest form copies a value from one field to another:

```ini
code=code                  # Copy code from source to target
description=description    # Copy description from source to target
customer=customer          # Copy customer reference from source to target
```

### Setting Fixed Values
You can set fields to specific values:

```ini
status="Active"           # Set status to the text "Active"
priority=1                # Set priority to number 1
isApproved=true          # Set boolean value
discount=null            # Clear the field
```

### Downloading Files from URLs (Attachments)
For attachment fields (LargeData type), you can provide a URL and the system will automatically download the file:

```ini
# Direct URL - downloads and stores the file
attachment="https://example.com/files/sample.pdf"

# URL from another field
attachment2=productImageURL

# Download contract document from customer website
contractFile=customer.contractDocumentURL

# Download image from product catalog
productImage=item.imageURL
```

::: tip How URL Download Works
When you set an attachment field to a URL (any string containing `://`), the system:
1. Detects it's a URL and initiates an HTTP GET request
2. Downloads the file content from the URL
3. Extracts the filename from the `Content-Disposition` header or URL path
4. Stores the file data in the LargeData field
5. If the field already has an attachment, it updates it instead of creating a new one
:::

::: warning URL Requirements
- URLs must be accessible via HTTP/HTTPS
- No authentication is performed (URL must be publicly accessible or include auth tokens in the URL)
- Failed downloads are logged but won't stop the field map execution
- Large files may impact performance - use cautiously
:::

### Special References
```ini
ref5=$this               # Set ref5 to reference the source entity itself
fromDocument=$this       # Create a link back to the source document
```

## Working with Collections (Detail Lines)

### Copying Entire Tables
When documents have detail lines (like invoice items), you can:

```ini
details=[lines]          # Create same number of lines as source
details=[5]              # Create exactly 5 empty lines
details=[clear]          # Remove all existing lines
```

### Copying All Fields of a Table at Once
`[lines]` only gives the target the right number of empty lines, so on its own it needs one more mapping line per column (`details.item=lines.item`, `details.quantity=lines.quantity`, …). When the two tables share most of their columns, as a document and a copy of it do, `copyOf` copies every column in one line:

```ini
details=copyOf(lines)                 # Another table on the same record
details=copyOf(salesOrder.details)    # The lines of the document picked in the salesOrder field
details=copyOf(details)               # In a generate-entity flow: the source document's lines into the new one
lines=copyOf(ref1.$toReal.lines)      # Through a generic reference: add $toReal
```

A generic reference such as `fromDoc` or `ref1` can point at any entity type, so it does not know which tables it has. Put `$toReal` after it to reach the record it points at, as everywhere else in field maps. Without it the flow stops with *error while trying to get value for field ref1.lines*.

How it behaves:
- The target ends up with exactly as many lines as the source, and line 1 holds a copy of source line 1, line 2 of source line 2, and so on. An empty source empties the target.
- A column is copied when both tables have a field with the **same id** and a compatible type. Any other column in the target is cleared: `copyOf` replaces the whole line, it does not merge into it.
- The target keeps its own lines. Running the same mapping again (for example each time the user changes the source) updates the existing lines in place rather than deleting and recreating them, so each line keeps its identity. When the source has more lines than the target, the extra lines are new; when it has fewer, the extra target lines are removed.
- Mapping lines that come after `copyOf` see the copied lines, so you can adjust some columns afterwards:

```ini
details=copyOf(salesOrder.details)
details.warehouse=warehouse
details.remarks="Copied from order"
```

The left side must be a table, and the right side must lead to a table. Anything else stops the flow with *copyOf can only fill a table, but {0} is not a table* or *copyOf needs a table to copy from, but {0} is not a table*.

In a [GUI post action](/platform/automation-and-rules/gui-post-actions.md), `copyOf` adds the target table to the context fields automatically, because the screen has to send the lines it already has for them to be reused. It also adds the source: the table itself, or the reference field it is reached through (`salesOrder` in the example above).

### Adding Lines
```ini
details=[addLines(5)]              # Add 5 new empty lines
details=[addLines(lines)]          # Add same number as source lines
details1=[addLines(details2)]      # Add lines based on another collection
```

### Removing Lines by SQL
Sometimes you do not want to clear the whole table, only the lines that meet (or fail) a condition. Put the detail table on the left and one of the two removal functions on the right. The SQL is evaluated **once per line** and must return `1` (keep the match) or `0`, exactly like the queries used in criteria and `Apply When Query`:

```ini
# Drop every line whose n1 is below 5
details=removeLinesMatchingSql(select case when {details.n1} < 5 then 1 else 0 end)

# Keep only the lines whose n1 is above 5 (everything else is removed)
details=removeLinesNotMatchingSql(select case when {details.n1} > 5 then 1 else 0 end)

# Remove lines whose item is a service
details=removeLinesMatchingSql(select case when {details.item.item.itemType} = 'Service' then 1 else 0 end)
```

For longer queries use the multi-line form, closed with the matching `end…` keyword on its own line:

```ini
details=mlRemoveLinesMatchingSql(
  select case
    when {details.n1} > 5 then 1
    else 0
  end
)endmlRemoveLinesMatchingSql

details=mlRemoveLinesNotMatchingSql(
  select case when {details.quantity.quantity.primeQty.value} > 0 then 1 else 0 end
)endmlRemoveLinesNotMatchingSql
```

How it behaves:
- The query runs against the entity whose lines are being removed (the target). In a GUI post action or a fields-values calculator that is simply the record on screen; in a *generate entity from entity* flow it is the generated document, so put the removal **after** the lines have been copied into it.
- A line matches when the query returns a non-zero / true first column. Lines whose query returns nothing are treated as not matching.
- If the query does not reference any field of the table (a header-only condition), the same answer applies to every line: `removeLinesMatchingSql` then empties the table when the condition holds, and `removeLinesNotMatchingSql` empties it when the condition fails.
- The remaining lines keep their order. Any later mapping line that copies by position (`details.n1=lines.n1`) sees the shortened table.

::: tip Related
`[clear]` removes every line unconditionally, and `filterLinesBy` only hides lines from a copy without deleting them. Use the removal functions when the lines must actually disappear from the record. The standalone entity flow action **EADetailsRemover** does the same job from its own parameters, without a field map.
:::

### Copying Field Values to All Lines
```ini
details.warehouse=warehouse        # Copy header warehouse to all detail lines
details.project=project           # Copy header project to all detail lines
```

### Line-by-Line Copying
```ini
details.quantity=lines.quantity    # Copy quantity from each source line
details.price=lines.unitPrice      # Copy price from corresponding lines
details.item=lines.item           # Copy item references
```

### Getting Collection Size
Use the `$size` operator to get the number of lines in a detail collection:

```ini
# Store the count of detail lines in a numeric field
n1=details.$size

```

You can also reference `$size` inside SQL expressions for conditional logic based on line counts:

```ini
# Conditional text based on number of lines
text1=sql(select case when {lines.$size} > 5 then N'More than 5' else N'Less than 5' end)

# Use the size in calculations
avgValue=sql(select {money.netValue} / {details.$size})
```

## Advanced Functions

### Text Manipulation

#### Masking
Format text according to a pattern:
```ini
altCode=mask(code,XXX-XXX-XXX)    # ABC123456 becomes ABC-123-456
phoneDisplay=mask(phone,XXXX XXX XXXX)  # 0501234567 becomes 0501 234 567
details.text1=mask(details.text2,XX-XX:X--X)  # Works on detail lines too
```
- `X` represents a character from the original value
- Any other character (like `-`, `.`, `:`, `*`, `@`) is inserted as-is

**Examples:**
- If item code is `111222333` and you use `mask(code,XXX-XXX*XXX)`, the result is `111-222*333`
- If item code is `ABC155713` and you use `mask(code,XXX-XXX@XXX)`, the result is `ABC-155@713`

#### Text Extraction
```ini
firstFive=description.$left_5      # Get first 5 characters
lastTwo=code.$right_2             # Get last 2 characters
middle=ref1.$mid_3_4              # Get 4 characters starting at position 3
```

### Data Field Functions

Every zero-argument method on a data field is callable from a field map with the `$methodName` syntax (e.g. `targetField=sourceField.$trim`). They can also appear only on right side of an `=` and inside SQL/tempo placeholders. The complete catalog grouped by purpose:

#### Whitespace

| Function | Description |
|----------|-------------|
| `$trim` | Trim leading and trailing whitespace (legacy `String.trim`, ASCII only) |
| `$strip` | Trim leading and trailing whitespace, Unicode-aware |
| `$stripLeading` | Trim only leading Unicode whitespace |
| `$stripTrailing` | Trim only trailing Unicode whitespace |
| `$normalizeSpace` | Trim edges **and** collapse any run of internal whitespace into a single space (Unicode-aware) |
| `$removeAllSpaces` | Remove every whitespace, Unicode-aware — including those in the middle of the value |

```ini
cleanName=customer.name1.$strip
leftClean=code.$stripLeading
tidyName=customer.name1.$normalizeSpace   # "  Ali   Hassan  " becomes "Ali Hassan"
compactCode=code.$removeAllSpaces
```

#### Text Normalization

| Function | Description |
|----------|-------------|
| `$normalizeAr` | Normalize Arabic letters (unify alef, ya, ta-marbuta variants, etc.) |
| `$replaceArNumerals` | Convert Arabic-Indic digits (٠–٩) to ASCII digits (0–9) |

```ini
normalizedName=customer.name1.$normalizeAr
westernPhone=phone.$replaceArNumerals
```

#### Letter Case

| Function | Description |
|----------|-------------|
| `$toUpperCase` | Convert all letters to upper case (uses `Locale.ROOT` so Turkish-locale quirks are avoided) |
| `$toLowerCase` | Convert all letters to lower case |

```ini
chassisNumber=chassisNumber.$toUpperCase   # "abc123def" becomes "ABC123DEF"
email=email.$toLowerCase
```

::: tip
Arabic letters are case-less, so these functions only affect Latin (and other bicameral) scripts. Digits and symbols are left untouched.
:::

#### Translation

| Function | Description |
|----------|-------------|
| `$arabic` | Return the Arabic translation of the value |
| `$english` | Return the English translation of the value |
| `$translate` | Translate using the current user's UI language |

```ini
arabicLabel=status.$arabic
englishLabel=status.$english
localizedLabel=status.$translate
```

#### Type Conversion

| Function | Description |
|----------|-------------|
| `$tryToInt` | Parse the value as an integer; returns `null` if it is not a valid integer |
| `$tryToDecimal` | Parse the value as a decimal; returns `null` if it is not a valid number |

```ini
n1=code.$tryToInt
amount=description1.$tryToDecimal
```

#### Serialization

| Function | Description |
|----------|-------------|
| `$jsonEscape` | Return the value JSON-escaped (including surrounding quotes for strings) |

```ini
payload=description1.$jsonEscape
```

#### Encryption / Decryption

| Function | Description |
|----------|-------------|
| `$encrypt1` / `$decrypt1` | Encrypt or decrypt using key set 1 |
| `$encrypt2` / `$decrypt2` | Encrypt or decrypt using key set 2 |
| `$encryptX` / `$decryptX` | Encrypt or decrypt using key set X |

See the [Encryption/Decryption](#EncryptionDecryption) section under Security Features for usage examples in field maps, SQL, and reports.

### Mathematical Functions

#### Totaling Values
Calculate sum of values in detail lines:
```ini
totalAmount=totalize(details,details.price)
netTotal=totalize(lines,lines.netAmount)
n1=totalize(details,details.price.unitPrice)
```

#### Conditional Totaling
Sum values only when a condition is met:
```ini
serviceTotal=totalizeif(details,details.price,select case when {details.item.item.itemType} = 'Service' then 1 else 0 end)
n1=totalizeif(details,details.price.unitPrice,select case when {details.item.item.section.code} = 'SEC001' then 1 else 0 end)
```

#### Min/Max Functions
Get the minimum or maximum value from detail lines:
```ini
n1=max(details.price.unitPrice)    # Get the maximum unit price
n1=min(details.price.unitPrice)    # Get the minimum unit price
```

#### SQL-Based Calculations
For complex calculations across detail lines:
```ini
# Sum of calculated values
weightedTotal=totalizesql(select {details.quantity} * {details.unitPrice} * {details.discount} / 100)
n1=totalizesql(select {details.price.unitPrice} * {details.n1} / {n3})

# Maximum of calculated values
n1=maxsql(select {details.price.unitPrice} * {details.n1} / {n3})

# Minimum of calculated values
n1=minsql(select {details.price.unitPrice} * {details.n1} / {n3})
```

#### Running Totals
While `totalize`/`totalizesql` collapse the detail lines into a single aggregate, `runningTotal`/`runningTotalSql` produce a **cumulative** value **for each line** — the total of that line plus every line before it. The target is therefore a detail field, and each line receives its own accumulated figure:

```ini
# Cumulative sum of a detail field, written back per line
details.n2=runningTotal(details.n1)

# Cumulative sum of a per-line calculation, written back per line
details.n3=runningTotalSql(select {details.n4} / 2)
```

For `details.n2=runningTotal(details.n1)`:

| Line | `n1` | `n2` (running total) |
|------|------|----------------------|
| 1    | 10   | 10                   |
| 2    | 25   | 35                   |
| 3    | 5    | 40                   |

- **Inclusive** — each line's value includes that line, so the first line shows its own amount and the last line equals the grand total (`totalize`).
- **`runningTotalSql`** runs the query once per line (like `totalizesql`) and accumulates the per-line scalar results. Because it executes per line, prefer `runningTotal` when a plain detail field is enough.
- **Grouping** — when the flow uses `Group Details By`, the running total restarts at zero for each group.
- **Line alignment** — values are mapped to the target lines by position (line 1 → line 1, line 2 → line 2, …). The source and target do **not** have to be the same detail table, but they must have the same number of lines for the mapping to line up.

### Database Queries

#### Simple SQL Queries
```ini
customerBalance=sql(select balance from Customer where id = {customer.id})
lastInvoiceDate=sql(select max(valueDate) from SalesInvoice where customer_id = {customer.id})
n1=sql(select sum(netValue) from SalesInvoice where customer_id = {customer.id})
```

::: warning An empty field becomes a NULL parameter, not a zero
Placeholders are bound as parameters, with the field's own type — a number goes in as a number. But a
field the user has left **empty** goes in as `NULL`, and SQL Server treats an untyped `NULL`
parameter as text: `select {details.n1} * {details.n2}` then fails with `Operand data type nvarchar
is invalid for multiply operator` as soon as one of the two cells is blank. That is the usual reason a
calculation that worked while testing fails on a half-filled document.

Guard any placeholder that may be empty:

```ini
details.n3=sql(select isnull(try_cast({details.n1} as decimal(20,6)), 0)
                    * isnull(try_cast({details.n2} as decimal(20,6)), 0))
```
:::

#### Multi-line SQL
For complex queries that span multiple lines:
```ini
complexValue=mlsql(
  select case
    when {totalAmount} > 1000 then 'High'
    when {totalAmount} > 500 then 'Medium'
    else 'Low'
  end
)endmlsql

# Another example with case statement
n1=mlsql(select case when {code} = 'abc' then 5 when {code} = 'cde' then 6 else 7 end)endmlsql
```

#### Detail SQL Fields
To access SQL-computed fields (sqlField1, sqlField2, etc.) in detail collections, you must first enable them:
```ini
enableDetailSqlFields="details"
details.n1=details.sqlField1
details.n2=details.sqlField2
```

::: warning Performance Consideration
Using detail SQL fields can significantly impact performance because the SQL statements are executed **per line**. For entities with many detail lines, this can result in slow processing. Use this feature sparingly and consider alternative approaches like `totalizesql` for aggregate calculations when possible.
:::

#### Advanced SQL Parameter Syntax

When writing SQL queries with parameters, Nama ERP provides several advanced parameter syntaxes for common patterns:

::: tip Also used by AI query tools
This same parameter syntax powers [AI query-based tools](../../modules/ai/ai-tool-definitions.md): the SQL written on an **AI Tool Definition**'s Query Based page uses these exact placeholders, which makes the conditional helpers below ideal for the many optional filters an AI tool usually exposes.
:::

##### Literal Substitution (`{!paramName}`)
Use `{!paramName}` to substitute a parameter value directly into the SQL statement (not as a prepared statement parameter). This is useful for dynamic table or column names:

```sql
-- Dynamic table name
select count(*) from {!tableName} where status = 'Active'

-- Dynamic column selection
select {!columnName} from Customer where id = {customer.id}
```

::: warning Security Note
Literal substitution inserts values directly into the SQL. Only use with trusted, controlled values - never with user input, as this could lead to SQL injection.
:::

##### IN Clause with Empty List Support (`{xIN,column,paramName}`)
Use `{xIN,column,paramName}` for IN clauses that gracefully handle empty collections:

```sql
/*
 If customerIds is empty: produces "1 = 1" (always true)
 If customerIds has values: produces "customer_id in (?,?,?)"
*/
select count(*) from SalesInvoice where {xIN,customer_id,customerIds}

-- Combined with other conditions
select sum(netValue) from SalesInvoice where status = 'Posted' and {xIN,customer_id,selectedCustomers}
```

| `customerIds` Value | Generated SQL |
|---------------------|---------------|
| `null` or empty list | `... where 1 = 1` |
| `[1, 2, 3]` | `... where customer_id in (?,?,?)` |
| Single value `5` | `... where customer_id in (?)` |

##### Between with Null Support (`{xBetween,column,fromParam,toParam}`)
Use `{xBetween,column,fromParam,toParam}` for range queries where either bound might be empty. Use brackets `[` and `]` to include the boundary values (>= and <=), or omit them for exclusive comparison (> and <):

```sql
-- Inclusive range: code >= ? and code <= ?
select count(*) from Customer where {[xBetween],code,fromCode,toCode}

-- Exclusive range: code > ? and code < ?
select count(*) from Customer where {xBetween,code,fromCode,toCode}

-- Left-inclusive only: code >= ? and code < ?
select count(*) from Customer where {[xBetween,code,fromCode,toCode}

-- Right-inclusive only: code > ? and code <= ?
select count(*) from Customer where {xBetween],code,fromCode,toCode}
```

| `fromCode` | `toCode` | Generated SQL (inclusive `[xBetween]`) |
|------------|----------|----------------------------------------|
| `"A"` | `"Z"` | `code >= ? and code <= ?` |
| `"A"` | `null` | `code >= ?` |
| `null` | `"Z"` | `code <= ?` |
| `null` | `null` | `1 = 1` |

##### Conditional Comparison Operators (`{xOP,column,paramName}`)
Use `{xOP,column,paramName}` where `OP` is a comparison operator (`=`, `<>`, `>`, `>=`, `<`, `<=`). If the parameter is null, the condition is replaced with `1 = 1`:

```sql
/*
If minAmount is null: produces "1 = 1"
If minAmount has value: produces "amount >= ?"
*/

select count(*) from SalesInvoice where {x>=,amount,minAmount}

-- Multiple conditional comparisons
select count(*) from SalesInvoice where {x=,status,filterStatus} and {x>=,valueDate,fromDate} and {x<=,valueDate,toDate}
```

| Syntax | Parameter Value | Generated SQL |
|--------|-----------------|---------------|
| `{x=,code,customerCode}` | `"ABC"` | `code=?` |
| `{x=,code,customerCode}` | `null` | `1 = 1` |
| `{x<>,status,excludeStatus}` | `"Draft"` | `status<>?` |
| `{x>=,amount,minAmount}` | `100` | `amount>=?` |

### Conditional Value Selection

#### First Not Empty
Returns the first value that is not empty:
```ini
details.ref1=firstNotEmpty(details.ref1,ref1,customer.ref1)
contactPhone=firstNotEmpty(customer.mobile,customer.phone,customer.contact.phone)
details.n1=firstNotEmpty(details.n5,netValue,n4)
```

::: tip
You can use an unlimited number of fields inside `firstNotEmpty`.
:::

#### First Not Null
Returns the first value that is not null:
```ini
details.project=firstNotNull(details.project,project,customer.defaultProject)
```

### Multilingual Support

#### name() Function
Use the `name()` function to support multiple languages. It returns the first value (Arabic) in Arabic environments and the second value (English) in English environments:

```ini
description1=name(name1,name2)           # Uses field values
description2=name("Arabic Text","English Text")  # Uses literal strings
```

### Reference Creation
Create references to other entities:
```ini
# Fixed reference by entity type and code
relatedInvoice=ref("SalesInvoice","SIV150160")

# Reference from a book code
book="BookCode"

# Reference from another field
term=book.code

# Reference to the current entity
ref5=$this

# Clear a reference
book=null

# Dynamic reference based on SQL
parentDoc=ref(ref2.entityType,sql(select id from SalesInvoice where code = {ref1}))
ref4=ref(ref2.$toReal.ref1.entityType,sql(select top 1 id from Customer where ref4id = {ref4.$toReal.id}))
```

## Advanced Line Matching

### Match Lines By Fields
Match source and target lines based on specific fields:
```ini
matchLinesBy=details.item.item=lines.ref1,details.warehouse=lines.warehouse(
  details.quantity=lines.quantity
  details.price=lines.unitPrice
  details.discount=lines.discount
)endMatchLinesBy
```

This will:
1. Match lines where item and warehouse are the same
2. Only copy data between matched lines
3. Ignore unmatched lines

### Match Lines by Source Line ID
When copying data from a parent document to a child document, you often need to match lines based on the `sourceLineId` field that links child lines back to their parent lines:

```ini
switchSource=fromDoc(
    matchLinesBy=details.sourceLineId=details.id(
    details.price.unitPrice=details.price.unitPrice
    details.n1=details.quantity.quantity.primeQty.value
    )endMatchLinesBy
)endSwitchSource
```

This will:
1. Switch context to the parent document referenced by `fromDoc`
2. Match each target line's `sourceLineId` with the source line's `id`
3. Copy field values only between matched lines
4. Preserve the relationship between parent and child document lines

::: tip When to Use
This pattern is particularly useful for:
- Updating child documents with data from their parent (e.g., updating delivery note from sales order)
- Syncing prices or quantities from the original source document
- Copying calculated fields back from processed documents
:::

### Filter Lines
Process only specific lines based on conditions:
```ini
filterLinesBy=(
  filterSourceDetail=details
  filterSourceBy=sql(select case when {details.quantity} > 0 then 1 else 0 end)
  filterTargetDetail=lines
  filterTargetBy=sql(select case when {lines.item.item.isActive} = 1 then 1 else 0 end)

  # Copy only between filtered lines
  lines.quantity=details.quantity
)endFilterLinesBy
```
You can filter source only, target only, or both.

#### Filter with Keyword Lines
You can also filter lines and copy them to a keyword collection:
```ini
filterLinesBy=(
  filterSourceDetail=creditLimits
  filterSourceBy=sql(select case when {creditLimits.paymentPeriod} > 5 then 1 else 0 end)
  keywordLines=[creditLimits]
  keywordLines.keyword=creditLimits.paymentPeriod
)endFilterLinesBy
```

::: tip
You can use a **numeric field** from the line instead of an SQL statement. In this case, lines where this field has a non-zero value will be included.
:::
## Tempo Expression Integration

### Single-Line Tempo Expressions
Field maps support embedded Tempo expressions for dynamic text generation and complex field calculations:

```ini
# Basic tempo field reference
customerInfo=tempo(Customer {customer.name1} has code {customer.code})

# Format with date functions
processedInfo=tempo(Processed by {$user.name2} on {$today})

# Conditional content
statusMessage=tempo({if(status)}Active since {valueDate}{else}Not active{endif})

# Links and hyperlinks
customerLink=tempo({link(customer)})

# Calculations and totals
summaryText=tempo(Total amount: {money.netValue}, Customer: {customer.name1})
```

### Multi-Line Tempo Expressions
For complex tempo templates with multiple lines, loops, or detailed formatting:

```ini
# Complex customer summary
customerSummary=mltempo(
Customer Details:
- Name: {customer.name1}
- Code: {customer.code}
- Balance: {customer.n1}
)endmltempo

# Invoice details with table
invoiceDetails=mltempo(
Invoice Summary for {customer.name1}

{opentable}
{row}{cell}Item{cell}Quantity{cell}Price{cell}Total{endrow}
{loop(details)}
  {row}
    {cell}{details.item.item.name1}
    {cell}{details.quantity.quantity.primeQty.value}
    {cell}{details.price.unitPrice}
    {cell}{details.price.netValue}
  {endrow}
{endloop}
{closetable}

Total Amount: {money.netValue}
)endmltempo

# Conditional content with complex logic
approvalMessage=mltempo(
{if(currentApprovalCase.state)}
  {if=(currentApprovalCase.state,"Approved")}
    ✅ Approved by {currentApprovalCase.lastStep.actualResponsible.name1} on {currentApprovalCase.currentApprovalCase.completionDate}
    {if(currentApprovalCase.lastStep.approvalComment)}
      Comment: {currentApprovalCase.lastStep.approvalComment}
    {endif}
  {else}
    ❌ Status: {translate(currentApprovalCase.state)}
  {endif}
{else}
  ⏳ Pending approval
{endif}
)endmltempo
```

## Special Operations

### Switch Target/Source

When working with collections (detail lines) in referenced entities, you need to use special syntax to properly access and modify fields.

#### Working with Header Fields in Referenced Entities

For header fields in referenced entities, you can use direct dot notation:

```ini
# This works - modifying a header field in customer
customer.n1="5"
```

#### The Problem with Collections in Referenced Entities

However, when you need to work with collections (details) inside referenced entities, the simple dot notation doesn't work:

```ini
# ❌ This will NOT work as expected
customer.lines.n1=n1
```

This is where `switchTarget` and `switchSource` become essential.

#### Using switchTarget - Modifying Collections in Referenced Entities

Use `switchTarget` when you need to **modify fields in collections** within a referenced entity:

```ini
# ✅ Correct way to modify collections in customer object
switchTarget=customer(
  lines.n1=n1
)endSwitchTarget
```

::: tip
Notice that inside `switchTarget`, we omit the `customer.` prefix because we're already working inside the customer context.
:::

**More Examples:**

```ini
# Update related document details
switchTarget=relatedDocument(
  # Now copying TO each related document's collections
  status="Processed"
  processedBy=currentUser
  processedDate=sql(select getdate())

  # Working with collections inside the related document
  details.processed=true
  details.processedDate=sql(select getdate())
)endSwitchTarget
```

#### Using switchSource - Copying from Collections in Referenced Entities

Use `switchSource` when you need to **copy data FROM collections** within a referenced entity TO collections in the current entity:

```ini
# ❌ This will NOT work as expected
details.n1=customer.lines.n1

# ✅ Correct way to copy from customer collections to invoice collections
switchSource=customer(
  details.n1=lines.n1
  details.item=lines.item
  details.quantity=lines.quantity
)endSwitchSource
```

::: tip
Inside `switchSource`, the left side (target) refers to the current entity's collections, and the right side (source) refers to the referenced entity's collections without the prefix.
:::

**More Examples:**

```ini
# Copy data from a nested reference
switchSource=customer.ref1(
  totalPurchases=n5  # n5 here will come from customer.ref1
  lastOrderDate=date1
)endSwitchSource

# Copy from supplier collections to purchase order
switchSource=supplier(
  details.defaultPrice=priceList.price
  details.leadTime=priceList.deliveryDays
)endSwitchSource
```

#### Working with Generic References ($toReal)

When working with generic reference fields (like `fromDoc` which can point to different entity types), you normally need to use `$toReal` to access the actual entity. However, `switchSource` and `switchTarget` handle this automatically:

```ini
# ❌ This will NOT work as expected
details=fromDoc.$toReal.details
details.text1=fromDoc.$toReal.details.description

# ✅ Correct way - $toReal is handled automatically
switchSource=fromDoc(
  details=[details]
  details.text1=details.description
)endSwitchSource
```

::: tip
Notice that we do **not** need `$toReal` inside `switchSource` and `switchTarget`. Generic references are automatically resolved to their real entity type within the switch context.
:::

**Why this works:**
- Outside the switch: `fromDoc` is a generic reference that needs `$toReal` to access actual data
- Inside the switch: The system automatically resolves `fromDoc` to its real entity type
- You can directly access collections and fields without the `$toReal` operator

#### When to Use Each

| Scenario | Syntax |
|----------|--------|
| Modify header field in referenced entity | `customer.n1="5"` |
| Modify collection in referenced entity | `switchTarget=customer(lines.n1=n1)endSwitchTarget` |
| Copy from collection in referenced entity | `switchSource=customer(details.n1=lines.n1)endSwitchSource` |

#### Applicability

These `switchTarget` and `switchSource` features work in:
- **Entity Flows** (Business process automation)
- **GUI Post Actions** (Field change handlers)

::: warning
Always remember to use `endSwitchTarget` and `endSwitchSource` to close the switch block. Missing these will cause syntax errors.
:::

### Working with Newly Added Lines
```ini
details=[addLines(5)]
details=addedLinesOnly(details.item=defaultItem)
details=addedLinesOnly(details.quantity=1)
details=addedLinesOnly(details.price=defaultPrice)
```

### Line Selection

Some field maps work on **one** line at a time rather than on the whole grid. `selectLine` picks that
line, and from then on `$line` (or `currentLine`) is a shorthand for it — on the left of the `=` to
write into it, and inside `{...}` in a query to read from it.

```ini
selectLine="details(0)"     # Select first line (0-based index)
$line.quantity=10          # Set quantity of selected line
$line.n1="15"              # Set n1 of selected line

selectLine="details(2)"     # Select third line (index 2)
n3=currentLine.n3          # Read from selected line using currentLine
n3=$line.n3                # Alternative: read from selected line using $line
$line.price=sql(select {$line.quantity} * {$line.unitPrice})  # Calculate price

selectLine="details(last)"  # Select last line
$line.isLast=true
```

::: warning `$line` means nothing until a line is current
`$line` is not a name for the grid — it is whichever **single** line is current at that point. The
lines of a field map are applied in order, so `$line` only carries a value once something has made a
line current:

| Where the field map runs | Is there a current line? |
|---|---|
| After `selectLine="details(0)"` earlier in the same field map | Yes — the line it selected |
| An entity flow with **Run Per Line** filled in | Yes — the line being processed |
| A calculated-field or row-colour query that has a **Detail Field** | Yes — the row being read |
| A GUI post action on a **grid** field | Yes — the row the user is editing |
| A GUI post action on a **header** field, or a field map with no `selectLine` | **No** |

With no current line the two halves fail differently, and neither error says "there is no line":

- as a **target**, `$line.n3=...` fails with `Could not find getter method for $line.n3 from JournalEntry:JE10104260900008`;
- as a **source**, `{$line.n1}` is sent to the database as a plain `NULL`. SQL Server types such a parameter as text, so an arithmetic expression fails with `Operand data type nvarchar is invalid for multiply operator` — a message about data types that is really about a missing line.

When in doubt, write the grid's own field id instead of `$line` (see below): it needs nothing to be
current and works in every context.
:::

#### Working on grid lines without selecting one

A query placeholder that names a grid — `{details.n1}` — makes the query run **once per line**, with
that line's own values substituted in. When the target is a field of the same grid, each result is
written back to the line it came from, so one line of field map fills a whole column:

```ini
# n3 = n1 x n2 on every line of the grid
details.n3=sql(select {details.n1} * {details.n2})

# The same thing on a journal entry, whose grid is called lines
lines.n3=sql(select {lines.n1} * {lines.n2})
```

This is the form to reach for in a **GUI post action**, where the user is editing one row and there is
no `selectLine` step to write.

### Entity Commands
```ini
runCommand="edit"                          # Start editing mode
runCommand="save"                          # Save the entity directly (approval definitions are NOT checked)
runCommand="saveConsideringApprovals"      # Save the entity the way the screen does: approval definitions are checked first
runCommand="recommit"                      # Re-save/recommit the entity
runCommand="forcestable"                   # Force update without validation
runCommand="unforcestable"                 # Cancel force update mode
runCommand="flush"                         # Flush database changes
runCommand="guessPeriod"                   # Auto-detect accounting period (DocumentFile only)
runCommand="makeValueDateToday"            # Set value date to today (DocumentFile only)
runCommand="setCodeIfNeeded"               # Set code from book or group
runCommand="copyDimensionsFromBookOrGroup"     # Copy Dimensions (legal entity, branch, department, analysis set, and branch) from book or group
runCommand="systemUpdateCalculatedFields"  # Update all calculated fields
runCommand="regenledger"                   # Regenerate ledger entries (if applicable)
runCommand="runManualEntityFlow(EF005)"    # Run specific entity flow by code
runCommand="encryptPassword"               # Encrypt password field (NaMaUser only)
runCommand="doNotCheckQty"                 # Skip quantity checks (InvoiceWithStockEffect only)
runCommand="collectStockDocsIfEmpty"       # Collect stock documents (InvoiceWithStockEffect only)
```

#### `save` vs `saveConsideringApprovals`
`runCommand="save"` commits the record straight away, exactly like a background business action: no approval definition is consulted, so a record that would normally go to approval when a user saves it from the screen is saved as final instead.

`runCommand="saveConsideringApprovals"` runs the same save path the edit screen uses. If an approval definition applies to the record, the record goes to approval instead of being saved as final, and the flow's own step finishes successfully. The "this record will go to approval" confirmation the screen normally asks for is answered automatically, so no user interaction is needed.

```ini
# Update the customer from within an invoice, respecting approvals on the customer
customer.runCommand="edit"
customer.description1="Updated from invoice"
customer.runCommand="saveConsideringApprovals"
```

#### Common Command Combinations
```ini
# Set value date to today and auto-detect accounting period
runCommand="guessPeriod"
valueDate=sql(select getdate())
```

### Adding Discussions
You can add discussion entries to an entity:
```ini
addDiscussion="New Discussion added by entity flow"
```

### Updating Related Entities
```ini
# Update item from within invoice line
details.item.item.runCommand="edit"
details.item.item.lastSaleDate=valueDate
details.item.item.lastSalePrice=details.price
details.item.item.runCommand="save"
```

## Security Features

### Encryption/Decryption
Multiple encryption methods are available with different passwords:
```ini
# Encrypt sensitive data using different encryption keys
encryptedCode=code.$encrypt1              # Encryption method 1
encryptedSSN=customer.ssn.$encrypt2       # Encryption method 2
encryptedData=data.$encryptX              # Encryption method X

# Decrypt when needed (use matching decrypt method)
originalCode=encryptedCode.$decrypt1
originalSSN=encryptedSSN.$decrypt2
originalData=encryptedData.$decryptX
```

You can also use encrypted values in SQL queries:
```ini
ref1=sql(select entityType,id from SalesInvoice where code = {description1.$decrypt1})
```

#### Using in Reports (Groovy/JasperReports)
```groovy
NamaRep.encrypt1($F{code})
NamaRep.decrypt1($F{description1})
```

### OTP Generation
Generate numeric or alphanumeric OTP codes with lengths from 4 to 8 characters:

```ini
# Numeric OTP (digits only)
description1=$createNumericOTP4     # e.g., 1234
description2=$createNumericOTP5     # e.g., 12345
description3=$createNumericOTP6     # e.g., 123456
description4=$createNumericOTP7     # e.g., 1234567
description5=$createNumericOTP8     # e.g., 12345678

# Alphanumeric OTP (letters and digits)
description1=$createOTP4            # e.g., A1B2
description2=$createOTP5            # e.g., A1B2C
description3=$createOTP6            # e.g., A1B2C3
description4=$createOTP7            # e.g., A1B2C3D
description5=$createOTP8            # e.g., A1B2C3D4
```

