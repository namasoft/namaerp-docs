---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---

# How CRM Document Terms Work

::: info Licence
The document terms on this page belong to screens gated on `crm`. The maintenance terms need
`crm-maintenance`, and the service-maintenance terms need `crm-maintenance-services` — those are
covered in [Maintenance Document Terms](/modules/crm/document-terms/crm-maintenance-terms).
:::

A document term is the small configuration record that hangs off a document book and tells the
system what a saved document should actually *do* — which accounts its value lands on, and which
other documents it should create. In most NaMa modules that is a big part of the setup work.

In CRM it is a surprisingly small part, and the first thing a configurer needs to know is which
screens have a term at all. Most do not.

## Most CRM screens have no term

Nine screens that everyone calls documents are in fact **master files**. They have no book, no
term, no document number, no value date and no approval cycle, and nothing you configure on a term
can ever reach them:

CRM Lead (خيط بيع) · CRM Potential (فرصة) · CRM Campaign (حملة) · MarketingPlan document
(خطة تسويق) · Operation goal (هدف تشغيل) · CRM Task (مهمة خدمة عملاء) · CRM Project (CRM مشروع) ·
CRM Warranty (ضمان) · Maintenance Service (خدمة صيانة)

A second, longer group *are* real documents — they have a book, a code and dates — but they
declare that they need no term at all, so the Term field is not even offered:

CRM Call (اتصال) · Visit (الزيارة) · Visit Request (طلب زيارة) · Follow Up Document (سند متابعة) ·
Complaint - Suggestion (شكوي - إقتراح) · Trouble Ticket (طلب دعم) · Ticket Execution
(تنفيذ طلب دعم) · Ticket Follow Up (متابعة طلب دعم) · Questionair (استبيان) · Offer (CRM عرض) ·
Analysis (تحليل) · Development request (طلب تطوير) · CRM Update Contract Status
(تغيير حالة عقد خدمة)

::: warning Three screens show a Term field that leads nowhere
The three risk-register documents — SMF Problem Declaration, SMF Solution Suggestion and SMF
Initial Operation — display a **Term** (توجيه المستند) picker even though they use no term and no
term configuration exists behind it. Leave it empty; nothing you put there changes anything. See
[Risk Register](/modules/crm/risk-register/crm-risk-register).
:::

A third group takes a generic Document Term because every document type can, but has **no
CRM-specific settings on it** — the term screen shows only the platform's standard options:
Maintenance Notice, Maintenance Sales Order, Maintenance Sales Quotation, Pre-Installation
Preview, CRM Maintenance Plan, Machine Update Document, Machine Ownership Transfer Document,
Maintenance Service Notice, Maintenance Service Order Execution, Maintenance Service Sales Order
and Maintenance Service Sales Quotation. Creating a term for these is only ever about numbering
and the standard platform behaviour, never about accounts or generation.

## What is left — the documents whose terms matter

Once you take all that away, twelve term shapes remain in the whole module, and several documents
share one shape. Two of them belong to core CRM and are described below; the rest belong to the
maintenance suites and have their own page.

| Term for | What its settings control |
|---|---|
| CRM Service Contract (عقد خدمة) | Accounts. The only core-CRM document whose value reaches the ledger. |
| Work Plan (خطة عمل) | Generation only — which book and term the Calls and Visits it creates are born with. |
| Maintenance Order, Maintenance Order Request, Maintenance Service Order | Accounts and four generation routes |
| Maintenance Contract, Maintenance Service Contract | Accounts and work-plan generation |
| Maintenance Invoice, Maintenance Service Invoice | Accounts and stock-issue generation |
| Maintenance Invoice Return, Maintenance Service Invoice Return | Accounts and stock-receipt generation |
| Maintenance Estimation (مقايسة صيانة) | Tax settings |
| Maintenance Work Plan, Maintenance Service Work Plan | Order generation |
| Maintenance Order Execution (تنفيذ أمر صيانة) | Tax settings only |
| Maintenance Visit (زيارة صيانة) | One option |
| CRM Maintenance Plan (خطة صيانة خدمة عملاء) | Nothing — the configuration behind it is empty |

## The two blocks every CRM term is built from

Whatever the document, a CRM term screen is assembled from the same two kinds of setting.

### The accounts block

This is the familiar invoice-effect shape: a **Debit** (مدين) side and a **Credit** (دائن) side,
each with its account source, subsidiary account type and dimensions, plus separate sides for
tax, the discounts, cash and the approximation discount. When the document is saved, its value is
turned into an accounting entry that a **ledger transaction request** processes in the background —
so a saved document is instant and the entry appears a moment later. If processing fails you find
the request in the **Business Requests** list view and reprocess it from the More menu.

::: warning One side is not enough — and you are not told
The accounting effect is switched on by having **both** the Debit and the Credit side configured.
Fill in only one of them — the natural half-finished state after an afternoon of setup — and the
document commits happily, shows no error, and creates **no accounting entry at all**. Nothing
appears in Business Requests either, because no request was ever raised.

If a CRM Service Contract, a maintenance contract or a maintenance invoice saves cleanly but never
turns up in the ledger, this is the first thing to check: open its term and confirm that both
sides are filled.
:::

### The generation block

CRM does not use the platform's standard generation settings. Instead, each CRM term carries its
own explicit pairs — a **book** and a **term** for each kind of document it can produce. The Work
Plan term names a Call book and term and a Visit book and term; the maintenance invoice term names
a stock-issue book and term; and so on down the list.

The rule that follows is simple and catches everyone once: **a generate button with no book and
term behind it produces nothing.** The manual buttons at least answer with a message telling you to
set the book and term on the term; the automatic ones — the stock document an invoice creates, the
warranty contract an installation order creates — simply do not happen, with no message at all.
The generation routes are set out document by document in
[Maintenance Document Terms](/modules/crm/document-terms/crm-maintenance-terms).

## The CRM Service Contract term

In our worked example, book `CSC` carries the term `T-CSC-STD`
(توجيه عقد الخدمة العادي / Standard Service Contract Term). Its screen has three pages.

The **Effect** (التأثير) page opens with **Contract Type** (نوع العقد) — pick the term on a
contract and this value is pushed onto the document, so the term is how a site decides that
contracts in one book are ordinary and contracts in another are, say, renewals. Next to it sits
**Use Payment Docs As Debt Ages** (استعال سندات الدفع في أعمار الديون), which decides whether the
contract's external payment lines are treated as debt-age rows. Then the **Debit** and **Credit**
groups — the on/off switch described above — the **Approximation Discount** side, and a Tax Plan
group with **Taxable**, **Modifiable Tax**, **Allow Editing Header Tax In Details**, **Allow
Payment More Than Invoice Amount** and **Link With Invoice Lines In accounting Document**.

The remaining two pages hold the tax sides, the cash side, the discount sides, and a grid of
conditional effects driven by which receipt voucher paid the contract.

One honest note about this screen: the service-fee sides and the second debit/credit pair that
other invoice terms offer are structurally unavailable on a CRM Service Contract. They are not
hidden by a licence or a setting — the document simply cannot use them, so don't go looking.

## The Work Plan term

The simplest term in the module. In our example, book `WPLAN` carries `T-WPLAN-STD`
(توجيه خطة العمل / Work Plan Term) and its Settings page holds exactly four fields:

| Arabic label | English label |
|---|---|
| دفتر سند إتصال | Call Document Book |
| توجيه سند إتصال | Call Document Term |
| دفتر سند زيارة | visit Document Book |
| توجيه سند زيارة | visit Document Term |

Tick some lines on a work plan and press *Generate Documents From Selected Lines*, and each line
becomes a committed Call or Visit born into the book and term named here — in our example books
`CALL` and `VISIT`, neither of which needs a term of its own. Leave the Call book empty and the
button refuses to generate the Call lines, naming the term in its message.

## A quirk of the CRM term screens

Several CRM term screens are missing the block of common document-term options that every other
module's term screen shows: the CRM Service Contract term and the Work Plan term, the maintenance
order, order request and service order terms, the order execution term, and both contract terms.
This is not a licence issue and nothing is broken by it — the options simply are not rendered on
those screens. If a colleague coming from another module asks where they went, that is the answer.
