---
description: "The small shared reference files under Basic → Master Files and Sales → Settings: Address Region and its country-to-street hierarchy, Freight Line, and Record Category, which decides which records a rule, a form or a price list applies to."
entities: [AddressRegion, FreightLine, DocCategory]
menu: Basic → Master Files → Address Region
---

# Address Regions, Freight Lines and Record Categories

Address Region, Freight Line and Record Category are short lists that many modules pick from. They are
quick to fill, but Address Region and Record Category each have a setting or two that decide where their
records show up. This page covers those settings.

Address Region and Freight Line are under **Basic → Master Files**; Record Category is under
**Sales → Settings**. Two neighbours on the same menu have pages of their own: **Nationality** is on
[HR Master Files](/modules/hr/setup/hr-master-files), and **Sales Price Classifier 1–5** on
[Sales Price Classifiers](/modules/supplychain/sales-price-classifiers).

## Address Region

An **Address Region** is one place in a geographic tree: a country, a state inside it, a city inside the
state, an area, a street. Address blocks have a **Region** field that points into this tree, for example
on customers, on an invoice's billing and shipping address, and on employees, banks, leads and legal
entities. When you pick a region there, the address's **Country**, **State**, **City**, **Area** and **Street**
text fields are filled from the region and the places above it. The names come in the language you are
working in.

The **Region Details** group decides where the record sits:

| Field | What it does |
|---|---|
| **Region Type** `regionType` | Required. **Country**, **State**, **City**, **Area** or **Street**. |
| **Parent** `parent` | The region one level up. Required for everything except a country. |
| **Used In Titles** `usedInTitles` | Only regions with this ticked are offered in the **Region** field of an address. Tick it on the regions people should pick, usually the lowest level you keep. |
| **Used In POS** `usedInPOS` | Sends the region to the point-of-sale devices with the rest of their master data. |
| **Description** `description` | Free text. |

The **Map Location** group holds a **URL** (`url`), **Longitude** (`longitude`) and **Latitude** (`latitude`)
for the place.

The parent has to fit the type. A state's parent must be a country, a city's parent a state and a street's
parent an area. An area needs a parent, but the system doesn't check its type, so you can hang an area under
a city or straight under a state. When a parent doesn't fit, saving is refused with one of these messages:

| Message | Why |
|---|---|
| *Country must not has a parent* — «يجب ألا يكون للدوله مجموعه اعلي» | The record is a country and the **Parent** is filled. |
| *State parent must be a country* — «االمجموعه الأعلي للمحافظه يجب ان تكون دوله» | The record is a state and its parent is not a country. |
| *City parent must be a State* — «المجموعه الأعلي للمدينه يجب أن تكون محافظه» | The record is a city and its parent is not a state. |
| *Street parent must be an area* — «المجموعة الأعلي للشارع يجب أن تكون منطقة» | The record is a street and its parent is not an area. |
| *Invalid Parent* | The record names itself as its own parent. This message has no Arabic text, so it shows in English on Arabic screens too. |

## Freight Line

A **Freight Line** is a shipping line: the carrier that moves an export shipment. It is a code-and-name
list. You pick from it in the **Freight Line** field on the **Shipping** tab of a **Sales Order**, next to
the **Arriving Port**, the **Freight Bill Code** and the **vessel Name**.

The Freight Management module doesn't use this list. Its operation orders and sailing schedules record the
shipping line as a supplier; see [Freight Master Files](/modules/freight/freight-master-files).

## Record Category

A **Record Category** (**Sales → Settings → Record Category**) is a tag you can put on any record, document
or master file, so that rules can tell records of the same type apart. Its **For Type** field (`forType`)
and **Type List** field (`typeList`) limit which screens offer it. When a record's **Record Category**
lookup opens, it shows only:

- categories whose **For Type** is that record's type,
- categories whose **Type List** includes that type, and
- categories with neither filled, which are open to every type.

Several features read the category:

- [Printed form selection](/platform/reports/printed-form-selection): a form can be limited to one
  category with **Form Doc Category**.
- [Recurring documents](/platform/automation-and-rules/recurring-documents) can stamp a category on every
  copy they generate.
- [Contracting price lists](/modules/contracting/setup/contracting-price-lists) can price per category.
- Point of sale: a register can give new documents a default category, and the
  [POS document terms](/modules/pos/erp-setup/pos-document-terms) choose a term by the category of the
  invoice, return or payment.
