---
title: EAGroovyAction
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAGroovyAction

## Overview

Runs a custom Groovy script as an entity flow action. The script is compiled on the server when the flow runs, so custom business logic can be added without a new Nama release.

::: tip Writing a Groovy action?
Follow the **[Groovy Writer skill](https://docs.namasoft.com/skills/groovy-writer.md)** — a step-by-step guide (raw Markdown) for writing Nama `EntityAction` Groovy scripts in the correct Nama style, matching the established sample-script patterns. Intended for Claude Code and support staff drafting scripts. In a local copy of the docs (such as the support knowledge base) the same file is `docs/public/skills/groovy-writer.md`.
:::

## Two Ways to Attach a Script

An entity flow line can run a Groovy script in two ways. Use the first one for new flows.

### 1. The Groovy Script column (recommended)

Every line of the entity flow's grid has a **Groovy Script** column of its own, next to **Class Name**.

1. Paste the whole script into **Groovy Script**. Leave **Class Name** empty; it is filled in step 3.
2. Fill **Parameter 1**, **Parameter 2**, ... with the values the script expects.
3. Save. On save the system fills **Class Name** with the script's own class name (for example `EAPreventShortRemarks`) and fills the parameter titles from the script's `columnNames()`.

The parameters reach the script in order: **Parameter 1** is `parameters[0]`, **Parameter 2** is `parameters[1]`, and so on up to **Parameter 15**, which is `parameters[14]`.

::: warning Class Name changes on save
Seeing your script's class name in **Class Name** after saving is expected. As long as **Groovy Script** is filled, the system runs the script and ignores whatever Class Name says. To stop using the script, clear the **Groovy Script** cell, not Class Name.
:::

### 2. Class Name = EAGroovyAction (older setups)

Older flows put `com.namasoft.infor.domainbase.util.actions.EAGroovyAction` in **Class Name** and the script itself in **Parameter 1**. This still works, but the script's own inputs move up by one: `parameters[0]` holds the script text, so the script's first real input is **Parameter 2** (`parameters[1]`).

Do not combine the two: if **Groovy Script** is filled, it wins.

## How It Works

1. **Compiles the script** with a Groovy class loader the first time the line runs.
2. **Caches the compiled class** per flow line. Saving any entity flow or task schedule clears the cache, so an edited script takes effect on the next run.
3. **Validates the parameters** by calling the script's `validateParameters(...)`, both when the flow is saved and before each run.
4. **Runs the script's `doAction(...)`** and uses the `Result` it returns. A failure result stops the save the same way any other entity flow failure does.

## Script Requirements

- The script must declare one class that implements `com.namasoft.infra.domainbase.entity.base.EntityAction`.
- Package names are lowercase: `com.namasoft...`, never `com.Namasoft...`. A wrong case fails at compile time.
- Override `doAction(T object, LongTextDF... parameters)` and return a `Result`: `Result.createSuccessResult()` when nothing is wrong, `Result.createFailureResult("message {0}", value)` to refuse.
- Optionally override `describe()` (the line's description) and `columnNames()` (the titles shown above Parameter 1, 2, ...).
- `ObjectChecker.isTrue(...)` accepts only `Boolean` and `String`. For yes/no fields such as `l.getB1()` use `BooleanDF.isTrue(...)` / `BooleanDF.isFalse(...)`; passing a yes/no field to `ObjectChecker.isTrue` fails at runtime with `MissingMethodException`.

## Complete Example

Refuses to save a record whose remarks are shorter than the number of characters given in **Parameter 1**.

**Entity flow line:**

| Column | Value |
|---|---|
| Target Action | Validate On Save |
| Groovy Script | the script below |
| Parameter 1 | `10` |

```groovy
package com.namasoft.entityactions

import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.BaseEntity
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.Result

class EAPreventShortRemarks implements EntityAction<BaseEntity> {

    @Override
    Result doAction(BaseEntity object, LongTextDF... parameters) {
        if (ObjectChecker.isEmptyOrNull(parameters[0]))
            return Result.createSuccessResult()
        int minLength = Integer.parseInt(parameters[0].getPrimitiveValue().trim())
        String remarks = ObjectChecker.toStringOrEmpty(object.getRemarks()).trim()
        if (remarks.length() < minLength)
            return Result.createFailureResult("Remarks must be at least {0} characters", minLength)
        return Result.createSuccessResult()
    }

    @Override
    String describe() {
        return "Prevents saving when the remarks are too short"
    }

    @Override
    List<String> columnNames() {
        return ["Minimum remarks length"]
    }

    @Override
    boolean shouldNotDisplayEntityFlowNameWhenFailure() {
        return true
    }
}
```

After saving the flow, **Class Name** shows `com.namasoft.entityactions.EAPreventShortRemarks` and the title of Parameter 1 shows "Minimum remarks length".

## Notes

- To run a script from a task schedule, create a task of type **Action**, enter `com.namasoft.infor.domainbase.util.actions.EAGroovyAction` in **Class Name** and paste the script into **Parameter 1**, as in the older setup above. The script's first input is then **Parameter 2**.
- A script error (a typo, a wrong import, a missing method) appears when the flow is saved, because saving compiles the script to read its description and parameter titles.

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAGroovyAction`

</div>
