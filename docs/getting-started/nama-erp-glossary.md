---
description: "Arabic-English glossary of recurring Nama ERP terms, grouped by subject (records, document behaviour, states, dates, ownership, fields and screens), with the pairs that get mixed up."
---
# Glossary of Nama ERP Terms

Nama ERP is used in Arabic and in English, often by the same team on the same call. The customer says
*التوجيه*, the screen in front of you says **Document Term**, and the page you are reading says
something else again. This glossary puts the pairs side by side, explains each one in a sentence or
two, and — where the site covers something properly — sends you there rather than repeating it.

It is grouped by subject rather than alphabetically, because these words only make sense in relation
to each other. If you are entirely new, read [What is Nama ERP](/getting-started/what-is-nama-erp)
first; it explains the two or three ideas the rest of this vocabulary hangs off.

## Records and their shapes

| Term | What it means |
|---|---|
| **Record** — سجل | One saved row of anything: a customer, an invoice, a user. Every screen in Nama edits one record at a time. |
| **Entity Type** — النوع | The *kind* of record — Sales Invoice, Item, Employee. It is the answer to "which screen is this?" and it is what permissions, approvals, entity flows and validation rules are attached to. |
| **Master File** — ملف رئيسي | A record for a thing that *exists*: a customer, an item, a warehouse, an account. It has a code and two names, belongs to a group, and has no date, no fiscal period and no effects. Saving a master file never moves money or stock. |
| **Document** — مستند | A record for something that *happened on a date*: an invoice, a receipt voucher, a stock issue. It has a book, a document term, a value date and a fiscal period — and it produces effects. Documents are the only records that move money and stock. |
| **Detail lines / grid** — سطور التفاصيل / جدول | The rows inside a document: the invoice's item lines, the journal entry's debit and credit lines. A grid has its own small set of buttons, described in [Buttons on every screen](/platform/everyday-tools/screen-buttons). |
| **Additional Fields** — الحقول الإضافية | Extra fields your implementer added to a screen for this customer, without changing the product. |
| **Master Group** — مجموعة | The tree a master file is filed under, which also codes it automatically. The master-file counterpart of a document book — see [Master Groups](/platform/documents-and-records/master-groups). |
| **Name 1 / Name 2** — الاسم العربي / الاسم الإنجليزي | Every master file carries two names. **Name 1 is the Arabic name and Name 2 is the English name** — never the other way round. |

## What makes a document behave the way it does

| Term | What it means |
|---|---|
| **Document Book** — دفتر المستند | The numbering series a document draws its number from, plus a handful of behaviours it imposes on every document written in it. One book serves exactly one document type — see [Document Books](/platform/documents-and-records/document-books). |
| **Document Term** — توجيه المستند | The record that decides *what a document type actually does*: what it copies from its source document, how it prices and taxes, which accounts its entry lands on, what it generates downstream. One document type can have several terms, each tuned for a different process — see [Supply Chain Document Terms](/modules/supplychain/document-terms/). Often shortened to just **the term** (التوجيه). |
| **Term Config** — إعدادات التوجيه | The block of settings *inside* a document term. When someone says "check the term config", they mean the options on the term, not a separate record. |
| **From Document** — بناءً على | The document this one was generated from: the order behind the invoice, the invoice behind the return. It is what links a chain of documents together and what quantity tracking counts against. |
| **Entity Flow** — مسار كيان | A rule that runs automatically at a defined moment in a record's life — when it is created, validated, saved, revised or deleted. This is how a customer's specific behaviour is added without changing the product — see [Introduction to entity flows](/platform/entity-flows/introduction-to-entity-flows). |
| **Business Request** — طلب أعمال | The instruction the system raises to itself when a document is saved, telling a background worker to produce that document's effects. There are two kinds you will meet: the accounting request that writes the ledger entry, and the inventory request that moves quantities and cost — see [Business Requests](/platform/background-processing/business-requests). |
| **Processing status** — حالة المعالجة | Where a business request has got to: waiting, processing, processed, or one of the two failure states. This is the field you filter on when a document exists but its effects do not. |

## The states a record passes through

| Term | What it means |
|---|---|
| **Draft** — مسودة | Saved but not taken seriously: required fields are not enforced, save-time validation does not run, and no effects are produced. A draft's code ends in `@draft` and is replaced by a real number when it is committed. |
| **Commit** — الاعتماد | What the **Save** button does. It validates the record, gives it its real number, stores it and queues its effects. |
| **Stable** — ثابت | The status a committed document shows once it is live and not in an approval cycle. |
| **Approval Case** — حالة الموافقة | The live approval request created when a record meets an approval definition's conditions. While it is open the document sits at **Approval Pending** (بانتظار موافقة) and its effects wait — see the [Approvals System](/platform/approvals/approvals-system). |
| **Revised** — تمت المراجعة | A stamp saying a named person checked this committed record on this date, which also locks it against editing and deletion. Revising happens *after* the record is already live and changes none of its effects — see [Revise and unrevise](/platform/governance/revise-and-unrevise). |
| **Cancelled** — ملغي | A committed document whose effects have been reversed by a *Document Cancel Document*. It keeps its number and stays visible in the list, and it cannot be deleted while it is in this state. |
| **Prevent Usage** — منع استعمال سجل | A soft deactivation. The record stays in the system and in the documents that already reference it, but stops appearing in the pickers when someone creates something new — see [Preventing a record from being used](/platform/everyday-tools/prevent-usage). |
| **Audit trail** — سجل التعديل | Who changed a record, when, and what it said before — including the ability to put two saved versions side by side. See [Audit trail and version history](/platform/governance/audit-trail). |

## Dates and periods

| Term | What it means |
|---|---|
| **Creation Date** — تاريخ الإنشاء | When the record entered the system. The system stamps it at the first commit and does not move it afterwards. A fact about data entry, not about the business. |
| **Issue Date** — تاريخ التحرير | The date written on the paper — when the document was issued to whoever received it. |
| **Value Date** — التاريخ الفعلي | The business date of the transaction, and **the one that decides which fiscal period and fiscal year the document belongs to**. Change it and you change which month the document counts in. |
| **Fiscal Year / Fiscal Period** — السنة المالية / الفترة | The year and the period (usually the month) the document's figures roll up into, both derived from its value date. A closed period refuses new documents — see [Fiscal periods, period locking and multi-currency](/modules/accounting/support/accounting-periods-and-currency) and [Fiscal Period Control](/platform/governance/fiscal-period-control-guide). |

## Where a record belongs

| Term | What it means |
|---|---|
| **Dimensions** — المحددات | The five fields that answer "which part of the business does this belong to?" — legal entity, sector, branch, department and analysis set. Almost every record carries all five, and they drive security, reporting and account structure — see [Dimensions and Composite Dimensions](/platform/shared-master-files/dimensions-and-composite-dimensions). |
| **Legal Entity** — الشركة | The company. It is the only dimension that cannot be switched off, and every record belongs to one — or to none, which makes it **public**. |
| **Sector / Branch / Department / Analysis Set** — القطاع / الفرع / الإدارة / المجموعة التحليلية | The four optional dimensions. Each can be switched off entirely if the business does not use it, and each can be made a security boundary as well as a reporting axis. |
| **Public record** | A record saved with no legal entity. Depending on configuration it is either visible from every legal entity or hidden from all of them — which is the usual explanation for "why can't he see this item?". |
| **Subsidiary** — الذمة | The *party* a balance breaks down by: a customer, a supplier, an employee, a bank, a safe. An account of type Subsidiary does not give you one number, it gives you a balance per party — see [Accounts](/modules/accounting/accounts). |
| **Entity Dimension** — السجل | An extra analysis axis that points at one specific *record* — a project, a contract, a vehicle — so entries can be filed under it and reports grouped by it, beyond the five standard dimensions. |

## Fields, screens and who may use them

| Term | What it means |
|---|---|
| **Reference field** — حقل مرجع | A field that points at another record. You type or pick its code and the system shows its name. Most of what looks like a dropdown in Nama is a reference field with a search behind it. |
| **Generic reference** | A reference field that can point at more than one kind of record — so you choose the record *type* first and the record second. The **From Document** field is the one you will meet most often. |
| **Criteria** — المعايير | A saved set of filter conditions. The same mechanism narrows a list, restricts what a reference field is allowed to pick ([Field filter with criteria](/platform/field-filtering/field-filter-with-criteria)), decides when an approval or a validation applies ([Criteria Based Validation](/platform/governance/criteria-based-validation)), and feeds reports. Note: **criteria**, not "conditions". |
| **List view** — شاشة القائمة | The screen listing records of one type, with its filters, its chosen columns and its own toolbar. A **custom list view** is something else: a small filtered list placed as a block inside another record's screen — see [Custom List Views](/platform/list-views/custom-list-views). |
| **Screen Modifier** — تعديل شاشة | The visual layout editor: rearrange fields, hide the ones this customer does not use, redesign an edit screen or a list. It is why the same screen can look different at two customers — see [Screen Modifier](/platform/screen-modifier/). |
| **Default Values Template** — قالب قيم افتراضية | A saved record used to pre-fill new records of its type — see [Default Values Templates](/platform/everyday-tools/default-values-templates). |
| **Printing form** — نموذج طباعة | The template that turns a record into a printed or PDF document. A document's appearance is configuration, not code, which is why each customer's invoice looks like their own — see [Reports](/platform/reports/). |
| **Capability** — الصلاحية | One named permission on one record type: view, edit, delete, print, revise and more. They are granted in a **security profile** (ملف الصلاحيات), which is attached to users — see [Security Profile](/platform/security/security-profiles). |
| **Licence** | What the customer bought. It decides which modules exist at all, and the menu is filtered down to it, so an entire missing branch of the menu usually means an unlicensed module — see [Who sees which menu](/platform/menus/menu-visibility). |

## Terms that get mixed up

These pairs are the ones that cause the most confusion on support calls.

**Document book vs. document term.** The **book** gives the document its *number* and a few numbering
behaviours. The **term** decides what it *does* — the accounts, the pricing, the generation. A wrong
book means a wrong number; a wrong term means a wrong journal entry. Both are chosen at the top of
every document and they are easy to swap in your head.

**Document term vs. term config.** The **document term** is a record you can open, list and copy. The
**term config** is the block of settings inside it. They are not two screens.

**Master file vs. document.** If it has a code, a group and two names, it is a master file and it books
nothing. If it has a book, a term and a value date, it is a document and it will. This is the first
thing to check when someone asks why a signed contract produced no journal entry.

**Creation date vs. value date.** The **creation date** is when the record was keyed in; the **value
date** is when the transaction happened. Only the value date decides the fiscal period. A document
keyed in February for a January transaction belongs to January.

**Legal entity vs. subsidiary.** The **legal entity** is one of your own companies — a dimension every
record carries. The **subsidiary** is the outside party a balance is broken down by. Both are
occasionally read as "the company"; only one of them is yours.

**Subsidiary vs. entity dimension.** The **subsidiary** is the party (a customer, a supplier). The
**entity dimension** is any other record you want the entry filed under (a project, a contract). They
sit next to each other on the same lines and are constantly confused.

**Revised vs. approved.** An **approval** happens *before* a document takes effect: it routes the
document, collects decisions, and can send it back. **Revising** happens *after* the document is
already live: nothing is routed, nothing is pending, and its effects are already in the ledger. If
someone wants a document stopped until it is signed off, they want an approval, not a revision.

**Cancelled vs. deleted.** A **cancelled** document has had its effects reversed but keeps its number
and stays in the list, so the history shows what happened. A **deleted** document is gone. Cancelling
is done with a separate cancel document, and deleting that cancel document brings the original back.

**Business request vs. approval request.** A **business request** is the system talking to itself
about work it still has to do — writing a ledger entry, moving stock. An **approval request** is the
system talking to a person. Only the second one waits for a human.

**Prevent Usage vs. Inactive vs. Delete.** **Prevent Usage** hides a record from the pickers but leaves
it and its history alone. **Inactive** on a book or a term stops it being chosen on new documents.
**Delete** removes the record and unwinds anything it did. Reach for the first one far more often than
the last.
