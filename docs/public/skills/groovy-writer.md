---
name: groovy-writer
description: >
  Write Nama ERP EntityAction Groovy scripts in the correct Nama style, matching the established patterns from sample scripts.
  Use this skill whenever the user asks to write, create, generate, or draft a Groovy script for Nama ERP — even if they just say
  "write me an action", "I need validation for X", "create an EA for Y", or paste a DM URL and describe logic.
  Always read the entity's data-model JSON to learn its fields before writing (from a local namaerp-dm checkout when
  there is one; otherwise ask for the DM URL).
---

# Groovy Writer

Write Nama ERP `EntityAction` Groovy scripts that match the established Nama coding style exactly.

---

## Step 1 — Gather Requirements

Before writing any code, make sure you have:

1. **A description of the logic** — what the action should validate or do
2. **The entity/entities involved** (by name, screen name, or DM URL)

**Where to read the fields:**
- **A local `namaerp-dm/docs/public/dm-json/` folder exists** (for example inside the support knowledge base):
  read `<Entity>.json` there. Don't ask for DM URLs and don't fetch the web. If you only know the screen name,
  find the entity in `namaerp-dm/docs/public/llms.txt` or `dm-json/index.json` first.
- **No local copy:** ask the user for the DM URL(s), then fetch each one:
  > "Please provide the DM URL(s) for the entity/entities involved so I can check the available fields before writing. Example: `https://dm.namasoft.com/modules/basic-forms-7-8/FormDoc7.html`"

Do not write the script until you have the logic description and have read each entity's fields.

---

## Step 2 — Read the Data Model, Then Work Out the Imports

From each entity's DM JSON (or page), take:
- Available fields and their ids: `ref1`–`ref8`, `number1`–`number35`, `date1`–`dateN`, `text1`–`textN`, `description1`–`descriptionN`
- Any special fields (e.g. `remarkDate`, `valueDate`, `term`, `code`, `altCode`)
- The detail grids (the `details` part of the JSON) and their field ids

The DM does **not** give Java class names or packages. Its `module` value is a display group
(`supplychain-sales`, `basic-forms-5-6`), not a package. Take the imports from the published example closest to
the task (Step 2b) or from this table:

| Entity | Entity import | `IdsOf*` import |
|---|---|---|
| Sales Invoice | `com.namasoft.modules.supplychain.domain.entities.SalesInvoice` | `com.namasoft.common.fieldids.newids.supplychain.IdsOfSalesInvoice` |
| Purchase Invoice | `com.namasoft.modules.supplychain.domain.entities.PurchaseInvoice` | `com.namasoft.common.fieldids.newids.supplychain.IdsOfPurchaseInvoice` |
| Stock Transfer | `com.namasoft.modules.supplychain.domain.entities.StockTransfer` | `com.namasoft.common.fieldids.newids.supplychain.IdsOfStockTransfer` |
| Item | `com.namasoft.modules.supplychain.domain.entities.InvItem` | `com.namasoft.common.fieldids.newids.supplychain.IdsOfInvItem` |
| Customer | `com.namasoft.modules.basic.domain.entities.Customer` | `com.namasoft.common.fieldids.newids.basic.IdsOfCustomer` |
| Employee | `com.namasoft.infra.domainbase.modules.hr.Employee` | `com.namasoft.common.fieldids.newids.basic.IdsOfEmployee` |
| Journal Entry | `com.namasoft.modules.accounting.domain.entities.JournalEntry` | `com.namasoft.common.fieldids.newids.accounting.IdsOfJournalEntry` |
| Receipt Voucher | `com.namasoft.modules.accounting.domain.entities.ReceiptVoucher` | `com.namasoft.common.fieldids.newids.accounting.IdsOfReceiptVoucher` |
| Form Document 5 (same for 1–16) | `com.namasoft.modules.basic.domain.entities.FormDoc5` | `com.namasoft.common.fieldids.newids.basic.IdsOfFormDoc5` |
| Remark | `com.namasoft.modules.basic.domain.entities.Remark` | `com.namasoft.common.fieldids.newids.basic.IdsOfRemark` |

Detail line classes sit in the `.domain.details` package next to the entity's `.domain.entities` package
(e.g. `com.namasoft.modules.supplychain.domain.details.SalesInvoiceLine`,
`com.namasoft.modules.basic.domain.details.FormDoc5Line1`). For an entity not listed here, find an example
script that imports it (`grep -h "import .*\.<Entity>$"` over `docs/public/groovy-examples/`); if none does,
tell the user the import is a best guess that the save will confirm.

---

## Step 2b — Learn From the Published Examples

Before writing, read the published example closest to the requested logic. Each one is a tested product
script with a page explaining what it does, which event it runs on and how its parameters are filled:

- In a local checkout of the docs (the support knowledge base has one at `namaerp-docs/`), read them there: the
  pages are under `docs/entity-flows/groovy/` and the scripts under `docs/public/groovy-examples/`.
- Without a local checkout: the index is https://docs.namasoft.com/entity-flows/groovy/, each page is
  `https://docs.namasoft.com/entity-flows/groovy/<ClassName>.html` and each raw script is
  `https://docs.namasoft.com/groovy-examples/<ClassName>.groovy`.

Pick the example closest to the task. Each name below is both a page (`<ClassName>.html`) and a script
(`<ClassName>.groovy`):

| The script must… | Study |
|---|---|
| Refuse a save with a message, checking lines against the From Document | `EAQtyMustMatchFromDocPerItem` |
| Refuse a save based on one field's format | `EASerialNumberLen` |
| Validate a master file's grid for duplicates or conflicts | `EAPreventDifferentNamesForSameSizeOrColor` |
| Refuse editing or deleting lines that were already saved (old vs new lines) | `EAPreventChangingItemPriceLines` |
| Fill an empty line field from the item or a fixed default | `EAFillDefaultRevision`, `EASetDefaultLocatorIfEmpty` |
| Clear line values that are not valid for the line's warehouse or item | `EAClearLocatorWhenWarehouseDoesNotAllowLocators`, `EAClearLotIdsWithNoItemDimensionsQty` |
| Copy prices or discounts from the document this one was made from | `EACopyLinePriceAndHeaderDiscountFromFromDoc` |
| Find source lines by query and split a line across them | `EACollectInvoicesInReturn` |
| Add lines, or replace one line with several | `EAAddFreeLinesFromLineReferences`, `EASpreadAssemblyBOMLineByItemClass` |
| Create other documents from this one and keep them in step on re-save | `EAGenMultiplePurchaseOrdersFromQuotation` |
| Update the From Document (or a chain of them) after commit | `EASetDeliveryStatusInFromDocLines`, `EAMarkFromDocFulfilled` |
| Find or create another record by query and maintain one line in it | `EAMaintainLimitSalesQtyFromItem` |
| Write back into a master file from a document | `EAUpdateItemDimensionsFromPurchaseReturnReqLines`, `EALearnDefaultLocatorFromStockTransfer` |
| Number lines with a running serial per group and year | `EACreateSerialForLineSubsidiary`, `EAAutoLotIdFromItemSectionAndYear` |
| Enforce a cap with running totals across earlier documents | `EAYearlyLimitPerEmployeeInPVRequest` |
| Take field ids from the parameters instead of hard-coding them | `EAGroovyUpdateRefInMiscPurchaseInvDetails` |
| Recalculate totals after the script or a field map changes prices | `EACalculateMoneyFields` |
| Change the accounting or inventory request just before it is sent | `EASetTransCurrencyToLocalCurrencyAndRateOne`, `EASetInvRequestAnalysisSetFromWarehouse` |
| Change the electronic invoice sent to the tax authority | `EAEInvoiceCreationWithCustomServiceFees` |
| Call an external web service for all lines at once | `EAIPSCDSFetchMailItemData` |
| Copy a security setting (View Capability) onto documents | `EACopyViewCapabilityFromAccountToJournalEntry` |
| Fix attendance lines (times, check-in vs check-out) | `EAClearFromDateIfFromTimeIsMidnight`, `EATimeAttendanceMakeInOutIfBeforeTime` |
| Run on a Document Term and force one of its settings | `EASetDoNotUpdateSalesPrice` |
| Show diagnostic information as messages from a Manual flow | `EAFindDaysInfoForEmployee` |
| Run as a task schedule over a query's records | `EAUpdateQtyTrackingEffectsFromQuery` |

Reuse the example's structure, imports and calls. Don't copy its business logic beyond what was asked. Pages tagged
*Customer-specific example* hard-wire one setup's fields or codes, so treat them as a pattern only.

**Parameter numbering in the examples.** The published scripts read their first input from `parameters[1]`
(Parameter 2) and leave `parameters[0]` unused. They were written for the older setup, where Parameter 1 held the
script itself (see Step 4). Their `columnNames()` therefore starts with a "Not used - leave empty" title. When you
write a **new** script for the Groovy Script column, start at `parameters[0]` as Step 4 describes. Do not copy the
examples' offset.

---

## Step 3 — Write the Script

### Package & Class Naming

```groovy
package com.namasoft.entiyactions
// OR for plug-n-play:
package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy
```

Package names are always lowercase `com.namasoft...`. Groovy resolves imports case-sensitively, so `com.Namasoft...` fails to compile.

Class name format: `EA` + `[ClientName]` + `[DescriptiveName]`
Example: `EAKuwaitPreventRemarkMoreThan1DayConsideringLineDate`

---

### Standard Imports (include only what's needed)

```groovy
import com.namasoft.common.Pair
import com.namasoft.common.fieldids.newids.basic.IdsOf[Entity]
import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.common.utilities.NaMaLogger
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.criteria.CriteriaBuilder
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.DateDF
import com.namasoft.infra.domainbase.datafields.DecimalDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.TextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.persistence.repos.ListPageMatchingParameters
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.basic.domain.details.[DetailLineClass]
import com.namasoft.modules.basic.domain.entities.[EntityClass]
```

---

### Class Structure

```groovy
public class EA[Name] implements EntityAction<[EntityClass]> {

    // Instance-level maps if needed (e.g. for totals accumulation)
    private Map<Pair<GenericReference, DateDF>, List<DecimalDF>> totals = new HashMap<>();

    @Override
    public Result doAction([EntityClass] object, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();

        // --- logic here ---

        return result;
    }

    // Helper methods below doAction

    @Override
    boolean shouldNotDisplayEntityFlowNameWhenFailure() {
        return true;
    }
}
```

---

### Core Patterns

**Null / empty check:**
```groovy
ObjectChecker.isEmptyOrNull(l.getRef1())
!ObjectChecker.isEmptyOrNull(l.getRef1())
```

**Yes/no (BooleanDF) fields:**
```groovy
BooleanDF.isTrue(l.getB1())    // null counts as false
BooleanDF.isFalse(l.getB1())   // true when false or null
```
Never pass a BooleanDF to `ObjectChecker.isTrue(...)` — it only accepts `Boolean` and `String`, and fails at runtime with
`MissingMethodException: No signature of method ObjectChecker.isTrue() ... (BooleanDF)`.
Never write `!BooleanDF.isTrue(x)`; use `BooleanDF.isFalse(x)`.

**Has numeric values:**
```groovy
private static boolean hasValues(List<DecimalDF> numbers) {
    return numbers.stream().anyMatch(n -> DecimalDF.isNotEmptyOrZero(n));
}
// Usage:
hasValues(CollectionsUtility.asList(l.getNumber1(), l.getNumber11(), l.getNumber21(), l.getNumber31()))
```

**Failure result (accumulating):**
```groovy
Result.createFailureResult("Error message {0} and {1}", param1, param2).addToAccumulatingResult(result);
```

**Iterating details:**
```groovy
for (int i = 0; i < object.getDetails().size(); i++) {
    def l = object.getDetails()[i];
    // ...
}
// OR simpler:
for (def l : object.getDetails()) { ... }
```

**TextDF comparison:**
```groovy
def overtime = TextDF.fromString("وقت اضافي")
if (ObjectChecker.areEqual(object.getDescription1(), overtime))
    return result;
```

**Day of week check:**
```groovy
boolean isFriday = l.getDate1()?.getPrimitiveValue()?.getDayOfWeek() == DayOfWeek.FRIDAY;
```

**Totals accumulation map:**
```groovy
void addNumbers(GenericReference ref, [DetailLine] l, List<DecimalDF> ns) {
    if (ObjectChecker.isEmptyOrNull(ref))
        return;
    def refNumbers = totals.computeIfAbsent(
        new Pair<GenericReference, DateDF>(ref, l.getDate1()),
        { new ArrayList<>(List.of(DecimalDF.zero(), DecimalDF.zero(), DecimalDF.zero(), DecimalDF.zero())) }
    );
    for (int i = 0; i < refNumbers.size(); i++) {
        refNumbers[i] = refNumbers[i] + ns[i];
    }
}
```

**DB query with Persister + CriteriaBuilder:**
```groovy
List<[Entity]> results = Persister.listPageMatching([Entity].class,
    ListPageMatchingParameters.create().criteria(
        CriteriaBuilder.create()
            .field(IdsOf[Entity].details + ".date1").in(dates)
            .and().idNotEqual(object.getId())
            .and().field(IdsOf[Entity].[dateField]).greaterThanOrEqual(object.get[DateField]().monthStart())
            .and().field(IdsOf[Entity].[dateField]).lessThanOrEqual(object.get[DateField]().monthEnd())
            .build()));
```

**Raw JDBC query:**
```groovy
def sql = "select sum(number1+number2) from [DetailTable] l where l.ref1Id = {ref1Id} and l.remark_id <> {id}";
NaMaLogger.error("{0}", sql); // never NaMaLogger.error(sql): the logger reads {...} in its first argument as placeholders
DecimalDF total = DecimalDF.fromQueryResult(
    Persister.prepareAndExecuteJDBCQuery(
        Map.of("ref1Id", ref.getId(), "id", object.getId()),
        sql));
```

**Totalize number fields (varargs):**
```groovy
static DecimalDF totalizeNumberFields([DetailLine] l, int ... ns) {
    DecimalDF total = DecimalDF.zero();
    for (final def n in ns) {
        total += (l["number" + n] as DecimalDF)
    }
    return total;
}
```

**GenericReference toReal:**
```groovy
def ref1 = GenericReference.toReal(l.getRef1())
if (ref1 == null) continue;
```

**Field access via bracket notation (dynamic):**
```groovy
ref8["n" + ref8N] as DecimalDF
ref8["description" + (ref8N - 100)].toString()
l["number" + n] as DecimalDF
```

**Distinct dates stream:**
```groovy
def dates = object.getDetails().stream()
    .map { it.getDate1() }
    .filter { it != null }
    .distinct()
    .toList();
```

---

### Error Message Style

- Arabic messages for Kuwait/Gulf clients: `"إجمالي اليومية لـ {0} في التاريخ {1} هو {2}، لا يمكن أن يكون أكثر من 1"`
- English messages for generic/international: `"Total of day for {0} on date {1} is {2}, it can not be more than 1"`
- Always use `{0}`, `{1}`, `{2}` placeholders — never string concatenation in error messages
- Pass entity references, dates, and values directly as parameters to `createFailureResult`

---

### DecimalDF Helpers

```groovy
DecimalDF.zero()
DecimalDF.one()
DecimalDF.fromInteger(2)
DecimalDF.fromString("50")
DecimalDF.isNotEmptyOrZero(n)
DecimalDF.fromQueryResult(...)
```

---

## Step 4 — Wire the Script into an Entity Flow

Tell the user how to attach the script. On the Entity Flow screen, each line of the actions grid has its own **Groovy Script** column:

1. Paste the complete script into **Groovy Script**.
2. Leave **Class Name** empty. On save the system fills it with the script's own class name (e.g. `com.namasoft.entiyactions.EAKuwaitPrevent...`) before the required-field check runs — that is expected.
3. Choose the **Target Action** (e.g. Validate On Save for a validator).
4. Fill **Parameter 1..15** if the script reads parameters. They arrive in order: Parameter 1 = `parameters[0]`, Parameter 2 = `parameters[1]`, ... Parameter 15 = `parameters[14]`.
5. Save. Saving compiles the script, so a syntax or import error shows at save time. The parameter titles are filled from the script's `columnNames()`.

Older flows instead put `EAGroovyAction` in Class Name and the script in **Parameter 1**. In that setup `parameters[0]` is the script text itself and the script's first real input is Parameter 2 (`parameters[1]`). Prefer the Groovy Script column for new flows; if both are filled, the Groovy Script column wins.

When the script reads parameters, override `columnNames()` so the user sees a title above each one:

```groovy
@Override
List<String> columnNames() {
    return ["Minimum remarks length"]
}
```

Full page: https://docs.namasoft.com/entity-flows/core/EAGroovyAction.html

---

## Step 5 — Output

- Provide the **complete `.groovy` file** — no placeholders, no "fill this in" comments
- Class name and package must be correct
- All imports must be present and correct based on what's actually used
- Add inline `//` comments in Arabic or English matching the client's language preference
- If the logic is complex, add a brief explanation after the code block describing what each section does

---

## Reminders

- Never use string concatenation in `createFailureResult` — always use `{0}` placeholders
- Always null-check dates before using `.getDayOfWeek()` — use safe navigation `?.`
- Always filter null dates before passing to `.in(dates)` in CriteriaBuilder
- Use `computeIfAbsent` for map initialization, not `putIfAbsent`
- `shouldNotDisplayEntityFlowNameWhenFailure()` should return `true` when the action is a pure validator
- Yes/no fields: `BooleanDF.isTrue/isFalse`, never `ObjectChecker.isTrue`
- Packages and imports are lowercase `com.namasoft...`

---

## Known Runtime Errors (confirmed from production logs)

### ❌ `def` as generic type parameter
```groovy
// WRONG — compilation error: "Unexpected input: ','"
Map<String, def> myMap = new HashMap<>()

// CORRECT
Map<String, Object> myMap = new HashMap<>()
```
Groovy does not allow `def` inside generic type parameters `<>`. Always use a concrete type like `Object`, `String`, `List`, etc.

---

### ❌ `Result.isFailure()` does not exist — use `result.failed()`
```groovy
// WRONG — runtime error: "No signature of method: Result.isFailure()"
if (result.isFailure()) {
    return result
}

// CORRECT
if (result.failed()) {
    return result
}
```
An accumulating result turns failed as soon as a failure is added to it, so `failed()` works for early exit too:

```groovy
Result result = Result.createAccumulatingResult()
for (def l : object.getDetails()) {
    // ... validate ...
    if (someConditionFails)
        Result.createFailureResult("رسالة الخطأ {0}", param).addToAccumulatingResult(result)
}
if (result.failed())
    return result  // stop here, don't proceed to next phase

// continue with next validation phase...
```

---

### ❌ `NamaLogger` does not exist — the logger is `NaMaLogger`
```groovy
// WRONG — saving fails with "unable to resolve class"
import com.namasoft.common.utilities.NamaLogger

// CORRECT
import com.namasoft.common.utilities.NaMaLogger
NaMaLogger.error("Value is {0}", value)
```
The first argument is a message pattern: `{0}`, `{1}` are replaced by the following arguments. To log text that
contains braces (a SQL statement with `{id}` parameters, JSON), pass it as an argument: `NaMaLogger.error("{0}", sql)`.

---

### ❌ `ObjectChecker.isTrue(...)` on a yes/no field
```groovy
// WRONG — runtime error: "MissingMethodException: No signature of method ObjectChecker.isTrue() ... (BooleanDF)"
if (ObjectChecker.isTrue(l.getB1())) { ... }

// CORRECT
if (BooleanDF.isTrue(l.getB1())) { ... }
```

---

### ❌ Calling an `EntityAction` static helper without its class name
```groovy
// WRONG: saving the flow fails with "Could not perform the action."
ensureParamIsNotEmpty(info, result, 1, parameters)

// CORRECT
EntityAction.ensureParamIsNotEmpty(info, result, 1, parameters)
```
A Groovy class does not inherit the static methods of an interface it implements. Inside a script that
`implements EntityAction`, always prefix the interface's static helpers with `EntityAction.`. (Confirmed on a
test server, 2026-10-14.)
