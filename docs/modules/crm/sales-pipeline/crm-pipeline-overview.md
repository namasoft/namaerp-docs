---
description: "Overview of the CRM sales pipeline screens (Lead, Potential, Offer, Analysis, CRM Project, Development Request): where they are and which buttons link them."
---
# Sales Pipeline Overview

Al Nokhba Air Conditioning Systems met Marina Plaza Hotels on a stand at the International Cooling Expo on 8 January 2026. Four days later Hala Samir Abdel Rahman opened a **CRM Lead** and typed in what she knew: a hotel in Alexandria, a plant room being refurbished, two 300-TR chillers and an air-handling unit wanted, and a chief engineer who takes the calls. Five weeks after that, Marina Plaza was a customer in the accounting system.

Everything in between is what this section of the documentation is about — and the first thing to understand is how short that chain really is, and how much of what looks like it belongs to the chain does not.

::: info Required licence
Every screen in this section is unlocked by the licence code `crm`.
:::

## Where the screens live

The pipeline screens are not all in one menu folder, and that is a useful clue about how they relate to each other.

| Screen | Menu path |
|---|---|
| CRM Lead (خيط بيع) | Customer Relationship Management → Marketing → CRM Lead |
| CRM Potential (فرصة) | Customer Relationship Management → Marketing → CRM Potential |
| Offer (CRM عرض) | Customer Relationship Management → Marketing → Offer |
| Analysis (تحليل) | Customer Relationship Management → Marketing → Analysis |
| CRM Project (CRM مشروع) | Customer Relationship Management → Support → CRM Project |
| Development request (طلب تطوير) | Customer Relationship Management → Support → Development request |

Lead, Potential, Offer and Analysis are filed under **Marketing**. Project and Development Request are filed under **Support**. Nothing in the product moves a record from one of those folders to the other.

## The Real Chain

Here is the whole of it. Every arrow below is a **button that exists on a screen** and that a person presses.

```text
   CRM Lead                          the prospect you are working on
   خيط بيع
       |
       |  Convert To Potential   (تحويل إلي فرصة)
       |  opens a new, unsaved Potential - you complete it and save it
       v
   CRM Potential                     the same prospect, promoted
   فرصة
       |
       |  Convert To Customer   (تحويل إلي عميل)
       |  opens a new, unsaved Customer - the lead is only flagged
       |  "converted" once that Customer is actually SAVED
       v
   Customer                          the only "won" record the pipeline produces
   (Basic module)
       |
       |  Create Sales Quotation   (إنشاء عرض أسعار)
       |  refused until the record has been converted to a customer
       v
   Sales Quotation                   arrives with ONLY the customer filled in:
   (Supply Chain)                    no products, no quantities, no amounts,
                                     and no link back to the lead
```

Two side exits leave the same two screens:

```text
   CRM Lead / CRM Potential  --->  Convert To REOwner   (تحويل الي مشتري)
                                   a Real Estate owner record, same pattern as
                                   Convert To Customer - only offered when the
                                   Real Estate feature is installed

   CRM Lead / CRM Potential  --->  Create Contact, create CRM Call,
                                   create CRM Task, Create CRM Visit
                                   each opens a new, unsaved record linked
                                   back to this lead or potential
```

**Convert To Customer may be pressed on the Lead directly.** Promoting to a Potential first is a convention, not a requirement, and a conversion does not depend on the sales stage.

::: warning The chain stops at the quotation
There is no step after *Create Sales Quotation*. The quotation is an ordinary Supply Chain document from that moment on, and it carries no reference back to the lead or the potential it came from. That means **there is no lead-to-order conversion reporting anywhere in the product** — you cannot ask "which quotations came from the January expo campaign", because the quotation does not know.
:::

## What Is Not In The Chain

The Offer, the Analysis and the CRM Project sit in the same menu and use the same visual language, so readers reasonably assume they continue the story. They do not.

::: info Offers, Analysis and Projects are stand-alone screens
- **No button anywhere creates an Offer from a Lead or a Potential.** None exists on either screen. An Offer is typed from scratch and, if you want it connected to the prospect, you fill its *Related To* (يرتبط بـ) reference field by hand.
- **No button anywhere creates a CRM Project from an Offer or an Analysis** — and, the part that surprises people, **you cannot make that link by hand either.** The Project's *Related To* field accepts a Lead, a Potential, another Project, a Campaign, a Trouble Ticket, a Customer or a Development Request. An Offer is not in that list and neither is an Analysis. A project can therefore never point at the work package that preceded it, by any route at all.
- **Nothing is generated out of an Offer, an Analysis or a Project.** No quotation, no order, no invoice, no accounting entry, no stock movement.

The only place an Analysis and an Offer are ever shown together is a read-only *Offers* list on the Analysis screen, and that list is driven by the Offer's **second** reference field (مرتبط ب2), not by its main one.
:::

The honest summary is that the pipeline half of CRM (Lead → Potential → Customer) and the delivery half (Analysis → Offer → Project) are two separate collections of screens that share a menu. Read [Offers](/modules/crm/sales-pipeline/crm-offers) and [Projects, Analysis and Development Requests](/modules/crm/sales-pipeline/crm-projects-and-analysis) with that in mind — and note in particular that an **Offer is a work package, not a price offer**: there is no quantity, price, discount, tax, total, validity date or currency anywhere on it.

## Sales Stage and Probability Are Labels

The Lead and the Potential both carry a **Sales Stage** (مرحلة البيع) with twelve values — Prospecting, Qualification, Needs Analysis, Value Proposition, Decision Makers, Perception Analysis, Price Quote, Review, Closed Won, Closed Lost, Contract Preparation and Price Negotiation — and a **Probability (%)** (الإحتمالية) box beside it.

Both are pure record-keeping. Nothing in the product calculates from either one:

- there is no weighted pipeline value and no forecast;
- *Closed Won* and *Closed Lost* are labels too — they do not lock the record, do not create anything, and are not required before a conversion;
- no rule stops a stage moving backwards, and nothing sets a stage automatically.

They earn their keep on the list screen, where **Status** and **Sales Stage** are the two quick-filter chips, and as criteria you can filter and export by.

## A Pipeline With No Value

::: warning You cannot record what a deal is worth
The Lead screen shows a group labelled *Currency* holding a **currency** and an **exchange rate**, and neither the Lead nor the Potential screen has an amount box.

The **Budget** (الميزانية) box on the Lead is free text, so `about EGP 4.5 million` is a note, not a number: it cannot be summed, averaged or sorted numerically.

Out of the box, therefore, **a NaMa pipeline carries no value**. There is nothing to total, nothing to weight by probability and nothing to forecast. Sites that need a money figure per lead have it added to the screen by their implementer.
:::

## Nothing Here Is Scheduled, and Nobody Is Notified

This is worth stating once, plainly, because every part of the pipeline invites the opposite assumption.

- Putting an employee in the **Assigned To** grid notifies nobody. There is no e-mail, no alert, no task and no inbox item.
- The **Planned Re-Call Date** (التاريخ المخطط لمعاودة الإتصال) on a lead is a date you read with your eyes. Nothing reminds anyone when it arrives.
- There is no scheduler anywhere in the CRM module — no task schedule, no reminder, no alarm, no escalation. Everything that looks scheduled happens because somebody pressed a button.

The one thing that does move by itself is the **status**: a committed [CRM Call](/modules/crm/activities/crm-calls) or [Visit](/modules/crm/activities/crm-visits) writes its *Change Status To*, *Update Lead Classification To*, *Next Activity Type*, *New Rejection Reason* and *Planned Re-Call Date* onto the lead or potential it points at. That is the real state machine of the pipeline, and it lives on the activity documents rather than on the lead itself.

## Books, Terms and Effects

Lead, Potential and CRM Project are **master files**: no document book, no document term (توجيه), no value date, no document number and no approval cycle. Offer, Analysis and Development Request are documents with a **book** for numbering but **no document term** — so there is nothing to configure per book or term anywhere in this section.

None of the six screens has an accounting effect and none of them touches stock. Nothing here is processed in the background; saving the record is the whole of it.

## Reporting

**Reporting: none.** This module ships no system reports, and these screens have no print form. The Lead and Potential **list screens** are the reporting: filter by status, sales stage, mediator, campaign, probability, customer, lead type, area or budget, then export to Excel or build a BI view over the data.

## Where To Go Next

- [Leads](/modules/crm/sales-pipeline/crm-leads) — the screen you will spend the most time on.
- [Potentials](/modules/crm/sales-pipeline/crm-potentials) — what a promoted lead actually gains, and what it loses.
- [Converting a Lead](/modules/crm/sales-pipeline/crm-lead-conversion) — exactly what each conversion button copies, and what it silently leaves behind.
- [Offers](/modules/crm/sales-pipeline/crm-offers) — the work-package screen that is not a quotation.
- [Projects, Analysis and Development Requests](/modules/crm/sales-pipeline/crm-projects-and-analysis) — the delivery half.
