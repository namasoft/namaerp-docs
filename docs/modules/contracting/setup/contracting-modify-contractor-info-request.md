---
description: "The Modify Contractor Info Request document for updating an existing contractor or adding a new one: its fields, the two apply buttons, what is copied, the draft option on the term and its messages."
entities: [ModifyContractorInfoReq]
menu: Contracting → Master Files → Modify Contractor Info Request
---
# Modify Contractor Info Request

A subcontractor's file carries the details his payments depend on: his names, his supplier link, his
contact details, his accounts and his tax registration. In many companies the person who learns that
something has changed — a new address, a new tax number, a brand-new subcontractor to be set up — is
not the person allowed to edit the file. The **Modify Contractor Info Request** (طلب تعديل بيانات
المقاول) closes that gap: anyone can write down the change on a request, and someone with the
authority applies it with one button.

It is a document, not a master file, so it has a book, a term, a date and its own approval route.
You find it under **Contracting > Master Files > Modify Contractor Info Request**, next to the
[Contractor](/modules/contracting/setup/contracting-contractors-and-consultants.md) file it changes.

## What the request holds

The screen is the contractor screen with a few extra fields on top. You fill in only what should
change; everything left empty is ignored when the request is applied.

| Field | What it is for |
|---|---|
| **Update Type** (نوع التحديث) | Required. **Update Existing** (تحديث الموجود) to change a contractor you already have, **Add New** (إضافة جديد) to set up a new one. |
| **Referenced Contractor** (المقاول المراد تعديله) | The contractor being changed. On an *Add New* request it is filled in for you once the contractor is created. |
| **Arabic Contractor Name** / **English Contractor Name** | The names to give the contractor. |
| **Supplier**, **Contractor Classification** | As on the contractor file. |
| Contact Info, Accounts, Dimensions | The same groups as on the contractor file. |
| **Tax Information** page | The tax registration details. |
| **Updated** (تم التحديث) | Ticked by the system once the request has been applied. You never tick it yourself. |

## The two buttons

Both need the request saved first.

- **Update Contractor Info** (تحديث بيانات المقاول) — copies the request's filled-in values onto the
  **Referenced Contractor**, commits the contractor, and ticks **Updated** on the request. It needs a
  referenced contractor, so it is the button for *Update Existing* requests. The user pressing it
  must be allowed to commit (or edit after commit) contractors; otherwise the update is refused as a
  missing permission.
- **Create Contractor** (إنشاء مقاول) — creates a new contractor from the request, links it back in **Referenced Contractor**, and opens it in a pop-up so you can
  check it. Whether the new contractor is committed straight away or kept as a draft is decided by
  the request's document term (below).

The request has no other buttons.

## What gets copied, and what does not

Three rules decide what lands on the contractor:

1. **Empty never overwrites.** Only fields that have a value on the request are copied. Leaving the
   telephone empty on the request keeps the contractor's telephone as it is — you cannot use a
   request to clear a field.
2. **The term can restrict the fields.** The request's document term carries an **Allowed Fields
   For Update** (الحقول المسموح بالتعديل فيها) grid. If it lists any fields, only those are copied,
   whatever else the request contains. If it is empty, every filled field is copied.
3. **Only these fields travel:** the Arabic and English names, the supplier, the classification, the
   contact details (telephones, fax, e-mail, website and the address), the accounts block (accounts
   bag, main account, the numbered accounts and currency), the tax registration details, the
   analysis set and department, the remarks, and the generic date, number, reference and description
   fields.

Because **Update Contractor Info** commits the contractor, every check the contractor file runs on
save applies here too. A request that would leave the contractor without its required accounts
block, for example, is refused with the contractor's own message.

## The draft option on the term

The term of a modify request has a **create Record As Draft** (إنشاء السند كمسودة) switch. With it on,
**Create Contractor** saves the new contractor as a **draft** instead of committing it, so that the
person responsible can complete it — accounts, bank details — before it is used. A contractor that
was committed before is always committed again, never turned back into a draft.

## Where the requests show up

Every request raised against a contractor is listed on that contractor's **Statistics** (الإحصائيات)
page, under **Modify Contractor Info Requests**, with its update type, dates and author. That is the
quickest way to answer "who changed this subcontractor's bank account, and when did they ask?".

## An example

The blockwork subcontractor `SC-014` moves office.

1. A site administrator raises a request: **Update Type** *Update Existing*, **Referenced
   Contractor** `SC-014`, and only the new address and telephone filled in. She saves it.
2. The contracts manager opens it, checks the details, and presses **Update Contractor Info**.
3. `SC-014` now carries the new address and telephone; his names, accounts and tax details are
   untouched because the request left them empty. The request shows **Updated**, and it appears on
   `SC-014`'s Statistics page.

A brand-new subcontractor follows the same path with **Update Type** *Add New*, the names and
details filled in, and **Create Contractor** instead.

## When a button refuses

**Update Contractor Info** is refused with a permission message when the user pressing it may not
commit or edit contractors — someone with that permission has to apply the request. And because the
button commits the contractor, any check the contractor file fails (a missing accounts block, for
example) comes back with the contractor's own message; complete the details and press it again.

Suppliers and customers have the same kind of request; see
[Customers, suppliers and parties](/platform/shared-master-files/customers-suppliers-and-parties.md).
