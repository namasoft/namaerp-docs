---
title: Reserve a Draft's Code When It Is Saved
module: supplychain
entities: [EntityFlow]
groovy: recommended
description: A Groovy Save Draft flow that registers a draft record's codes at once, the way committing does, so no other record can be saved with the same code while the draft waits.
---

<div class='entity-flows'>

# Reserve a Draft's Code When It Is Saved

This Groovy script runs when a record is saved as a draft. It registers the draft's codes in the system's list of used codes straight away, which normally happens only when the record is committed. From then on, no other record of the same type can be saved with that code.

::: tip Recommended pattern
This script is not tied to any customer's setup. It has no parameters: attach it and it works.
:::

| | |
|---|---|
| **Class name** | `EACreateAliasesForDrafts` |
| **Script** | [EACreateAliasesForDrafts.groovy](/groovy-examples/EACreateAliasesForDrafts.groovy) |
| **Runs on** | Any master file or document. Target action **Add Draft**. |
| **Uses** | No parameters. Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

Every record's code is checked against a list of codes already in use, so that two customers, two items or two documents of the same type never share a code. A record joins that list when it is **committed**. A record that is only saved as a draft does not.

That leaves a gap. Suppose a data entry clerk drafts a new customer `C-2001` on Monday and plans to complete it on Tuesday. On Monday afternoon a colleague creates and commits another customer, and gives it `C-2001` as its alternative code. Nothing stops them, because the draft's code is not on the list yet. On Tuesday the clerk cannot commit the draft: its code is now taken.

With this script on the customer's **Add Draft** event, the draft's codes go on the list the moment the draft is saved. The colleague's save on Monday is refused instead, while it is still easy to pick another code.

The codes registered are the same ones a committed record registers: the record's code and its other codes, such as its alternative code. For items, when **Use Custom Item Codes as Alternative Code** is ticked in the supply chain settings, the item's custom item codes are registered too.

## How it works

The script makes one call: it saves the draft's codes to the list of used codes, in the same way the commit does. It changes nothing on the record itself. When the draft is committed later, the commit registers the codes again, which changes nothing.

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose **Target Type** is the screen you want to protect, for example Customer.
2. Add one line to the **Details** grid with target action **Add Draft**. Paste the whole script into its **Groovy Script** column and leave **Class Name** empty.
3. Save. **Class Name** now shows the script's class name, and the line's description is filled in.

One flow covers one target type. For several screens, create one flow per screen, or use an **Entity Type List** on the flow.

## Example

On the demo database, customer `GRVA-CUST1` was saved as a draft with this flow on the Customer **Add Draft** event. Another customer was then imported, committed, with `GRVA-CUST1` as its alternative code. The save was refused:

*The code GRVA-CUST1 for the entity type Customer is repeated, can not save*

The same test against a draft saved before the flow existed went through: that draft's code was not protected.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *The code {0} for the entity type {1} is repeated, can not save* — «الكود {0} للنوع {1} مكرر. لا يمكن الحفظ» | Another record of the same type, possibly a draft protected by this script, already uses this code or alternative code. | Search the list screen, including drafts, for the code. Pick another code, or complete the existing draft instead of creating a second record. |

## The script

<<< @/public/groovy-examples/EACreateAliasesForDrafts.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Introduction to Entity Flows](/platform/entity-flows/introduction-to-entity-flows)

</div>
