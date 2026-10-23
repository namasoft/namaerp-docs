---
entities: [CRMLead, CRMPotential]
---
# Converting a Lead

There are four conversion buttons on the Lead and Potential screens, and they all work the same way: **each one opens a new, unsaved screen with some fields already filled in, and then gets out of your way.** Nothing is created until you complete that screen and save it. Nothing is queued, nothing is processed in the background, and nothing happens if you close the tab.

Knowing exactly what each button copies — and, more usefully, what it does not — is the difference between a clean pipeline and a customer file that has lost its campaign.

::: info Required licence
All four buttons live on screens unlocked by the licence code `crm`.
:::

We follow Marina Plaza Hotels from lead `LD-00417` through to customer `C-01188`.

![A CRM Lead](../../../ar/modules/crm/images/sales-pipeline/crm-lead-en.png)

## Convert To Potential

**On:** CRM Lead. **Label:** تحويل إلي فرصة / Convert To Potential.

Press it and a new **CRM Potential** opens in a pop-up, partly filled in. Complete it, save it, and the lead is flagged *Converted To Potential* (تم تحويلة إلي فرصة) and points at the new record. Press it on a lead that has already been converted and it refuses.

On 2 February 2026 this is how `PT-00203` was born out of `LD-00417`.

| Carried across | Left behind |
|---|---|
| Source Lead (the link back) | **Campaign** |
| Arabic and English names | Sales Stage and Probability |
| The free-text Legal Entity | Industry |
| Status | Mediator |
| Customer Classification | Salesman and Sales Manager |
| Lead Source | Remarks and attachments |
| The whole contact-information block | The **Contacts** grid |
| The **Assigned To** grid | The master group |
| The **Products** grid | The currency and the amount behind it |
| The *Converted To Customer* flag and Customer reference | |

::: warning The campaign does not survive promotion
This is the single most consequential omission on the list. The **Campaign** is the field marketing uses to attribute a win, and *Convert To Potential* drops it. Because a customer created from a **potential** takes its campaign from that potential, a deal promoted to a potential and then converted arrives at the Customer file with **no campaign at all** — which is why `C-01188` never appears on `CAMP-2026-01`'s list of customers.

If campaign attribution matters to you, either re-type the campaign on the potential immediately after converting, or press **Convert To Customer** on the **Lead** rather than on the potential.
:::

Also worth planning around: the **Contacts** grid is not copied. The generated Contact master files (`CNT-0904`, `CNT-0905`) still exist and still point at the lead, but the potential's own Contacts grid starts empty. And because Sales Stage and Probability are dropped, a potential begins life back at the default stage even though the deal has clearly moved on.

## Convert To Customer

**On:** CRM Lead and CRM Potential. **Label:** تحويل إلي عميل / Convert To Customer.

This is the button that wins the deal. It opens a new, unsaved **Customer** master file carrying:

- the Arabic and English names;
- the salesman;
- the whole contact-information block;
- the campaign — **only when the button is pressed on a Lead**;
- your dimensions (legal entity, branch, sector, department, analysis set) from the current context;
- and a reference back to the lead or potential it came from.

Everything that makes a customer an accounting object — the subsidiary account, credit limit, tax card, price list, payment terms — is yours to complete. On 16 February 2026 that is what turned `PT-00203` into `C-01188`.

::: warning The lead is flagged only when the customer is saved
Pressing the button changes nothing on the lead. *Converted To Customer* (تم تحويلة إلي عميل) is ticked, and the *Customer* reference filled, at the moment the **Customer record is saved** — not before. If the person who pressed the button abandons the half-finished customer screen, the lead stays exactly as it was, and nothing records the attempt.

The reverse also holds: **deleting the customer clears the flag** on the lead and hands it back to the pipeline.
:::

A lead or potential can produce only one customer. If somebody tries to point a second customer at the same record, the save is refused with *"This Lead has customer"* on the customer's own lead/potential field.

::: info Promoting to a potential first is optional
Nothing forces a lead through the Potential screen. *Convert To Customer* sits on the Lead as well, and pressing it there is the shortest route — and, as noted above, the only route that carries the campaign through to the customer file.
:::

### After the conversion: what is locked and what is not

Once the customer is saved, the **Lead** is frozen: opening and saving it fails with *"Cannot be updated as it is converted to customer"*. To keep working on it, switch on *Allow Editing CRM Lead After Connection* in [CRM Settings](/modules/crm/crm-configuration).

The **Potential** is not frozen. It carries the same *Converted To Customer* tick and remains fully editable, and there is no setting that changes that.

The lock does not apply to activity documents either: a committed [Call](/modules/crm/activities/crm-calls) or [Visit](/modules/crm/activities/crm-visits) can still change a locked lead's status.

## Create Sales Quotation

**On:** CRM Lead and CRM Potential. **Label:** إنشاء عرض أسعار / Create Sales Quotation.

Press it before the record has become a customer and it refuses: *"You must convert it to customer firstly"* / *يجب عليك تحويلة لعميل أولا*. Press it afterwards and a brand-new Supply Chain **Sales Quotation** opens.

::: danger The quotation arrives empty, and it does not remember where it came from
Only the **customer** is filled in. The lead's Products grid is not transferred, so the chiller and the air-handling unit Marina Plaza asked about are not on it. There are no quantities, no prices, no currency, no remarks — and, critically, **no reference back to the lead or the potential**.

`SQ-0771` is therefore an ordinary quotation for `C-01188` and nothing more. Everything on it is typed from scratch in Supply Chain, and no report can ever trace an order or an invoice back to the lead that produced it. If lead-to-order tracing matters to your business, plan to record the lead code in a field on the quotation by hand.
:::

Think of this button as a convenience that saves you picking the customer — not as a hand-over of the deal.

## Convert To REOwner

**On:** CRM Lead and CRM Potential. **Label:** تحويل الي مشتري / Convert To REOwner.

In a real-estate installation this replaces *Convert To Customer*: it opens a new, unsaved Real Estate **owner** record following exactly the same pattern — pre-filled, saved by you, and the lead flagged only when the save happens. The button is only present when the Real Estate feature is installed; on an installation without it, you will not see it at all.

## The Whole Conversion Story, End to End

1. **12 January 2026** — Hala opens lead `LD-00417` for Marina Plaza Hotels, sets the campaign, the industry, the mediator and the products, and puts herself and Tarek in the Assigned To grid.
2. **14 January – 22 January** — a call, a site visit and a call-back move the status from *Initial* to *Contacted* to *Warm* to *Qualified*. Hala moves Sales Stage to *Price Quote* and Probability to 70 by hand.
3. **2 February** — *Convert To Potential*. `PT-00203` opens pre-filled; Hala re-types the campaign, the industry, the mediator, the salesman, the sales manager, the sales stage and the probability, then saves. The lead is now flagged and locked to further edits.
4. **16 February** — *Convert To Customer* on the potential. The Customer screen opens with the names, the salesman and the contact block; the accountant adds the subsidiary account, the credit limit and the tax card, and saves. `C-01188` exists, and only now is the record flagged *Converted To Customer*.
5. **16 February** — *Create Sales Quotation*. `SQ-0771` opens with `C-01188` in the customer field and nothing else. The commercial offer is built there, in Supply Chain, from scratch.

Step 3 is where most of the work of a conversion actually is — re-entering what the button did not carry. It is worth writing that list into your own working procedure.

## Reporting

**Reporting: none.** This module ships no system reports, and none of these screens has a print form. Because the generated quotation keeps no link back, conversion reporting has to be built from the lead and potential list views (filter on *Converted To Customer*) rather than from the sales documents.
