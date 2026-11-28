---
title: Set a Default Locator on Lines Without One
module: srvcenter
entities: [EntityFlow, Locator, ItemSection]
groovy: recommended
description: Two Groovy scripts that put a fixed default locator on document lines that have none, either for every item or only for the items of chosen item sections.
---

<div class='entity-flows'>

# Set a Default Locator on Lines Without One

These two Groovy scripts fill an empty locator on document lines with a default locator that you name. The first one does it for every item. The second one does it only for items of the item sections you list, and lets you exclude single items.

::: tip Recommended pattern
These scripts are not tied to any customer's setup. You control them entirely through their parameters.
:::

| | |
|---|---|
| **Class names** | `EASetDefaultLocatorIfEmpty` and `EASetDefaultLocatorForItemSections` |
| **Scripts** | [EASetDefaultLocatorIfEmpty.groovy](/groovy-examples/EASetDefaultLocatorIfEmpty.groovy), [EASetDefaultLocatorForItemSections.groovy](/groovy-examples/EASetDefaultLocatorForItemSections.groovy) |
| **Runs on** | Any supply chain document with lines. Target action **Pre Update Calculated Fields**. |
| **Uses** | Parameter 2 (first script), or Parameters 2 to 4 (second script). Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use them

In a warehouse whose **Locator Usage** is **Required**, every line must name a locator, or the save is refused with the message *The field {0} can not be empty, at line {1} , item is {2}* — «لا يمكن ترك الحقل {0} فارغا، في السطر {1} للصنف {2}», where `{0}` is **Locator**. That is right for shelved stock, but some goods always land in the same place: a receiving bay, a bulk area, a "service parts" shelf. Asking the user to pick that locator on every line is busywork.

- Use **EASetDefaultLocatorIfEmpty** when every line without a locator should go to one default locator, for example the receiving bay `RCV-01`.
- Use **EASetDefaultLocatorForItemSections** when only some kinds of items have a fixed place, for example all items of the sections `SERV` and `CONS` go to locator `SVC-SHELF`, except two items that are stored elsewhere.

A line that already has a locator is never changed, so users can still choose a different locator when they need to.

## How they work

Both scripts look up the locator first. If the code or id in the locator parameter does not match any locator, the script refuses the save with the message below, for every document it runs on. Then, for each line that has an item and no locator:

1. **It finds the warehouse.** A line with no warehouse first takes the document's warehouse. If the document has no warehouse either, the line is skipped.
2. **It checks the warehouse.** The line is skipped when its warehouse prevents locators, or when it is not the warehouse that the default locator belongs to. A default locator therefore only ever lands in its own warehouse; lines in other warehouses are left alone.
3. **It sets the locator.** The first script sets it on every remaining line. The second one sets it only when the item's **Item Section** code is in the list in Parameter 2 and the item code is not in the list in Parameter 3.

::: tip One element per warehouse
Each element covers one locator, and so one warehouse. To give several warehouses their own default locator, add one element per warehouse to the same flow, each with its own locator in the parameter.
:::

::: info The analysis set in the section version
EASetDefaultLocatorForItemSections also writes the warehouse's analysis set onto each line that has an item, no locator and a warehouse, before it checks the warehouse and the item section. The line keeps it when **Analysis Set In Details** is ticked in the supply chain configuration, or when the document has no analysis set. When that option is off and the document has an analysis set, the save puts the document's analysis set back on every line.
:::

## Setting them up

1. Open **Administration → Display Customization → Entity Flow** and create a flow whose target type is the document to cover (for example **Stock Issue**).
2. In the **Details** grid, add a line with **Target Action** set to **Pre Update Calculated Fields**, and paste the whole script you chose into its **Groovy Script** column. Leave **Class Name** empty: it is filled in when you save.
3. Fill in the parameters and save the flow.

**EASetDefaultLocatorIfEmpty**

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Default Locator Code Or Id | The code of the default locator, for example `RCV-01`. |

**EASetDefaultLocatorForItemSections**

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Apply On Section Codes (CSV) | The item section codes, separated by commas with no spaces, for example `SERV,CONS`. |
| Parameter 3 | Excluded Item Codes(CSV) | Item codes that never get the default locator, separated by commas with no spaces. Leave it empty to exclude none. |
| Parameter 4 | Default Locator Code Or Id | The code of the default locator, for example `SVC-SHELF`. |

## Example

Warehouse `MAIN` requires locators, and locator `SVC-SHELF` belongs to it. The section version is set up with Parameter 2 `SERV`, Parameter 3 `SRV-099` and Parameter 4 `SVC-SHELF`. A stock issue from `MAIN` has three lines with no locator:

| Line | Item | Item section | After saving |
|---|---|---|---|
| 1 | `SRV-001` | `SERV` | Locator `SVC-SHELF`. |
| 2 | `SRV-099` | `SERV` | No locator: the item is excluded. |
| 3 | `RAW-010` | `RAW` | No locator: the section is not listed. |

Lines 2 and 3 still need a locator from the user before the warehouse accepts the issue.

## Messages you may see

This message has no Arabic translation, so it appears in English on Arabic screens as well. The product text ends with a space after `{0}`.

| Message | Why | What to do |
|---|---|---|
| `Could not find a locator with the code {0} ` | The locator parameter (Parameter 2 or Parameter 4) does not match any locator. `{0}` is the value you entered. Every save of the target document is refused until this is fixed. | Correct the locator code in the flow, or deactivate the element. |

## The scripts

**EASetDefaultLocatorIfEmpty**

<<< @/public/groovy-examples/EASetDefaultLocatorIfEmpty.groovy{groovy}

**EASetDefaultLocatorForItemSections**

<<< @/public/groovy-examples/EASetDefaultLocatorForItemSections.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows.
- [Warehouses & Locators](/modules/supplychain/warehouses-and-locators#Locator-Policy-Required-or-Prevented): the warehouse's locator setting.
- [Clear the Locator When the Warehouse Does Not Use Locators](/entity-flows/groovy/EAClearLocatorWhenWarehouseDoesNotAllowLocators): the opposite clean-up.

</div>
