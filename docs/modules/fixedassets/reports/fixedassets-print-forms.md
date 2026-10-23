---
description: "The thirteen printable forms (SYSF-AST001 to SYSF-AST013) shipped with Fixed Assets: how a form is bound to a document type, book or term, which document each form prints, and which documents have none."
---
# Printable Document Forms

A report answers a question about many records. A **form** does something narrower and more everyday: it prints *one document* on paper — the purchase document you file with the supplier's invoice, the transfer note the receiving department signs, the count sheet somebody walks round the plant with.

Fixed Assets ships **thirteen** such forms, coded `SYSF-AST001` to `SYSF-AST013`. They are installed with the system and each one is tied to a single document type, so there is nothing to set up: open a document of a type that has a form, print, and the paper comes out.

## How Printing Works

A form is not a general-purpose template — it is **bound to one document type**. That binding is the whole mechanism, and it explains everything you will notice in practice.

Open a Fixed Asset Purchase Document and the print action offers `SYSF-AST005`, because that form is bound to purchase documents. Open a revaluation and the print action offers nothing from this module, because no form is bound to revaluations. Nothing is broken when that happens; there is simply no shipped stationery for that document type, and adding one is a small piece of setup rather than a repair.

Beyond the document type, a form can be narrowed further — to a particular **document book**, a particular **document term** (توجيه) or a particular document category. That is how a site prints one layout for its Riyadh purchase book and a different one for Jeddah: two forms, same document type, each pinned to its own book. If more than one form matches the document in front of you, they are all offered and you choose; if only one matches, that one is used.

The thirteen shipped forms are **system forms and cannot be edited** — the system refuses any change to a system report or form. That is deliberate: an upgrade would overwrite your work anyway. When a shipped form is nearly right, take a **copy**, edit the copy, and bind the copy to the book or document term you want it used for. The original stays untouched underneath.

::: tip One form does not mean one printout
Because forms are bound by document type and optionally by book or document term, the practical question is never "does this document have a form" but "does this document have *my* form". A site that has built its own stationery may have five layouts for purchase documents and none of them the shipped one.
:::

## The Thirteen Shipped Forms

| Code | Document (Arabic) | Document (English) | What it prints |
|---|---|---|---|
| `SYSF-AST001` | سند إهلاك | Depreciation Document | The period's depreciation run: fiscal period, value date, document term and narration in the header, then one line per asset with its instalment amount, the document's dimensions, a total, and a signature block |
| `SYSF-AST002` | سند نقل الأصل | Transfer document | The asset moved, the destination location, and the *from* and *to* sides of the move side by side — legal entity, branch, sector, department and custodian — with a signature block |
| `SYSF-AST003` | سند الإضافة و الإستبعاد | Asset addition deduction | The addition or deduction, labelled as whichever it is, with fiscal period, value date, the asset, the amount in document and local currency, and a signature block |
| `SYSF-AST004` | مصروف اعتماد أصل | Fixed Asset Expense Document | The letter-of-credit expense document: the credit, the shipment, the currency and rate, then one line per expense item with its value, credit side, account and subsidiary, and the local-currency total |
| `SYSF-AST005` | سند شراء أصل ثابت | Fixed Asset Purchase Document | The acquisition invoice: counterparty, date, remarks, and one line per asset with unit price and value, totalled |
| `SYSF-AST006` | طلب شراء أصل | Fixed Asset Purchase Request | The request as raised: requesting employee, location, suggested supplier, remarks, and one line per asset wanted with its quantity |
| `SYSF-AST007` | أمر شراء أصل | Fixed Asset Purchase Order | The same shape as the request, with prices — the sheet you send the supplier |
| `SYSF-AST008` | مستند أستلام أصل | Fixed Asset Receipt Document | Physical receipt: fiscal period, the letter of credit and source document it came from, and one line per asset with the receiving employee and the location it went to |
| `SYSF-AST009` | تخلص من الأصل | Fixed assets disposal document | The disposal: fiscal period, the asset, the disposal value, the source document and remarks |
| `SYSF-AST010` | أفتتاح أصل ثابت | Fixed Asset Opening Document | The opening balances as entered: per asset, the depreciation start date, useful life, salvage value, acquisition value and opening accumulated depreciation — the sheet auditors ask for when a register is first loaded |
| `SYSF-AST011` | مستند جرد أصول | FixedAssets Taking Document | The stocktaking sheet: fiscal period and status in the header, then one line per asset with its acquisition cost and current book value |
| `SYSF-AST012` | فاتوره اعتماد مبدئية | Fixed Asset ProformaInvoice | The proforma invoice: credit, supplier, currency and fiscal period, then one line per asset with quantity, unit price and value |
| `SYSF-AST013` | سند تكليف اعتماد أصل | Fixed Asset Letter of Credit cost | The document that closes the import chain: per asset, the landed unit cost, salvage value, useful life and depreciation start date |

Four of these belong to documents that are gated behind a sub-module licence, which is worth knowing before you go looking for them. `SYSF-AST004`, `SYSF-AST012` and `SYSF-AST013` belong to the letter-of-credit chain and appear only where `fixedassets-lc` is installed — and so does `SYSF-AST008`, because the Fixed Asset Receipt Document is itself an LC-licensed document even though it sits in the Custody of Assets menu folder. See [Receipts](/modules/fixedassets/acquisition/fixedassets-receipts.md).

## The Documents That Ship Without a Form

The thirteen forms cover the documents that most often leave the building on paper — the ones a supplier, an auditor, a department head or a storekeeper signs. Plenty of Fixed Assets documents ship with no form at all, and there is no point hunting for one:

- **Revaluation** (إعادة تقييم الأصول) and **Prevent Assets Depreciation** (مستند منع اهلاك اصول) — internal value and policy decisions that stay in the system.
- **Fixed Asset Properties** (خصائص أصل ثابت) and **Fixed Asset Opening Document Update** (تعديل أفتتاح أصل ثابت) — corrections to numbers already recorded.
- **Partial Disposal** (سند تخلص جزئي من أصل) — the full disposal has a form, the partial one does not.
- **Fixed Asset Offer** (عرض سعر أصل) and **Fixed Asset Initial Receipt** (سند استلام أصل مبدئي) — the two steps of the buying chain either side of the order and the receipt, both of which do have forms.
- **Fixed Asset Out** and **Fixed Asset Return** documents (سند خروج أصول / سند رجوع أصول).
- **Fixed Asset Creation Document** (سند إنشاء أصول) and **Fixed asset Letter of Credit** (اعتماد أصول) — the credit header itself prints nothing; its proforma invoice, expense document and cost document all do.
- **Every aggregated document** — aggregated depreciation, addition and deduction, properties, disposal, transfer and transfer request. This one is rarely a problem in practice: an aggregate exists to generate per-asset documents, and those documents have forms of their own.
- **Every custody document** — purchase, delivery, transfer and disposal of custodies, and the Custodies Delivery Receipt Document (سند استلام وتسليم عهد). See [Custody](/modules/fixedassets/custody/fixedassets-custody-overview.md).
- **Every maintenance document** — plans, records and record requests. See [Maintenance](/modules/fixedassets/maintenance/fixedassets-maintenance-overview.md).

Where a site genuinely needs paper for one of these — a custody receipt for an employee to sign is the usual one — the answer is to build a form for that document type and, if you want it used only for one book, bind it to that book. Nothing about the document has to change; the stationery is added around it.

For the reports that look across many assets rather than printing one document, see [Fixed Assets Reports](/modules/fixedassets/reports/fixedassets-reports.md).
