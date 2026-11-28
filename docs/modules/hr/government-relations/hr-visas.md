---
description: "Recording Gulf visa procedures for expatriate employees: exit / re-entry visas, single or in a batch, and their extension, final-exit and family-visit visas, passport delivery, and how each visa's end date is calculated."
entities: [HOExitReEntryVisaReq, AggrHOExitReEntryVisaReq, HOExtendingVisaReq, HOFinalExitVisaReq, HOFamilyVisitVisaRequest, HOPassportDeliveringReq]
---
# HR Visas

An expatriate employee in the Gulf cannot simply leave the country and come back, or bring family
over to visit, without a government visa each time — and every one of those visas has an issue date,
a duration and an expiry that HR has to track. Nama's **Visas** menu is where the PRO records each of
those procedures: exit / re-entry visas so a staff member can travel and return, extensions when a
trip runs long, the final-exit visa when someone leaves for good, a family-visit visa to bring
relatives over, and the paperwork for handing a passport back to its owner. Each is a short document
that captures the employee, their current residency and the visa's own dates.

::: info Gulf / KSA-specific, and part of one cycle
These are Saudi / Gulf immigration procedures and need the Gulf visa licence
(`humanresource-gulf-visa`). They all start the way the cycle on the
[Government Relations Overview](./government-relations-overview) describes: pick the employee, see
the current residency, record the procedure. Unlike the residence renewal, **none of them writes
anything back to the employee's file**: they are the record of the procedure.
:::

## The date pattern that runs through all of them

Before the individual documents, learn the one calculation the exit / re-entry visa requests share.
A visa has a **start date** and a **period in days**; its **end date is the start plus the period**.
When you change **Visa Start Date** or **Visa Period In Days**, Nama fills **End Date** for you, so
you do not have to work out the expiry yourself.

On the exit / re-entry, extending, final-exit and passport-delivering requests, **Residency** and
**Residency End Date** are copied from the employee when you pick them and copied again on every save,
so they always show the employee's current Iqama.

## Exit / Re-entry visa

The **Exit ReEntry Visa Request** (`طلب تأشيرة خروج وعودة`) is the everyday one: it lets an employee
leave the Kingdom and return on the same Iqama. You open it from **Human Resources → Visas → Exit
ReEntry Visa Request** (`الموارد البشرية > التأشيرات > طلب تأشيرة خروج وعودة`), pick the employee, and
the residency and its end date fill in. You then record the visa's duration and, once issued, its
number and dates.

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Employee | الموظف | The traveller. |
| Residency | الأقامة | The employee's current Iqama (copied from the employee). |
| Residency End Date | تاريخ إنتهاء الإقامة | When that Iqama expires (copied from the employee). |
| Visa Period In Days | مدة التأشيرة بالايام | How long the exit / re-entry is valid for. |
| Number Of Issued Visa | رقم التاشيرة | The visa number the government issued. |
| Visa Issue Date | تاريخ الإصدار | When the visa was issued. |
| Visa Start Date | تاريخ البدايه | The date the visa's validity begins. |
| End Date | تاريخ الإنتهاء | The expiry — **start date + period in days**. |
| Visa Fees | رسوم التأشيرة | The government charge for the visa. |
| From Document | بناءا على | The document this request was generated from, when applicable. |

![Exit / Re-entry Visa Request](../../../ar/modules/hr/images/government-relations/exit-reentry-visa-en.png)

### Issuing a batch at once

When a group of employees is travelling together — a whole crew going home for a season — you do not
open a request each. The **Aggregated Exit ReEntry Visa Request** (`طلب تأشيرة خروج وعودة مجمع`), also
under **Human Resources → Visas**, carries one line per employee in its details grid (employee,
residency, period, issued number and the same computed dates). When its document term names the
book or the term for the generated requests, committing the batch creates (or updates) one Exit
ReEntry Visa Request per line, and removing a line or cancelling the batch deletes the request it
created. You manage the batch, not the singles it spawns — the aggregated pattern is explained in
[HR Requests, Documents & Aggregated Documents](../concepts/hr-requests-and-documents).

## Extending an exit / re-entry visa

If the trip runs longer than the visa allows, the **Extending Visa Request**
(`طلب تمديد تاشيرة الخروج والعودة`) records the extension. Choose the original Exit ReEntry Visa
Request in **From Document** and Nama copies its employee, its visa number and its current end date,
and the employee's residency; you then record the new **Extend To Date** you are extending it to.

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Employee | الموظف | The employee whose visa is being extended. |
| Residency / Residency End Date | الأقامة / تاريخ إنتهاء الإقامة | Current Iqama context. |
| Number Of Exit Visa | رقم تأشيرة الخروج | The exit visa being extended. |
| End Date | تاريخ الإنتهاء | The visa's current expiry. |
| Extend To Date | تمديد إلى تاريخ | The new expiry the extension grants. |

## Final-exit visa

When an employee is leaving the country permanently — at the end of service — the **Final Exit Visa
Request** (`طلب تاشيرة خروج نهائي`) records that departure. It captures the residency, its end date
and the employee's **Last Work Date** (`اخر يوم عمل`). Choosing a source document in **From Document**
copies its employee and its start date into the request.

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Employee | الموظف | The departing employee. |
| Residency / Residency End Date | الأقامة / تاريخ إنتهاء الإقامة | Current Iqama context. |
| Last Work Date | اخر يوم عمل | The employee's final working day. |
| From Document | بناءا على | The document this request was generated from, when applicable. |

## Family-visit visa

The **Family Visit Visa Request** (`طلب زيارة عائليه`) is the one visa that concerns people other than
the employee: it brings the employee's relatives into the country for a visit. Alongside the
employee's own residency, nationality, position and work-owner details, it carries a **Details grid
that lists each family member** coming — their name, nationality, religion, birth date, relationship,
place of arrival and gender — because a single visit visa can cover a whole family. Picking the
employee fills their nationality, current position, address, mobile, residency and work owner (the
employee's **Insured Legal Entity**), and the request cannot be committed with an empty Details grid.

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Employee | الموظف | The sponsoring employee. |
| Nationality | الجنسية | The employee's nationality. |
| Current Position | المهنة بالأقامة | The employee's profession as printed on the Iqama. |
| Residency (Number / Issue / End) | الأقامة (رقم / تاريخ الإصدار / تاريخ الأنتهاء) | The sponsor's Iqama details. |
| Work Owner | صاحب العمل | The employer / sponsor. |
| Number Of Entries | عدد مرات الدخول | Single- or multiple-entry. |
| Residency Period In Days | مدة الاقامة بالايام | How long the visitors may stay. |
| Visit Purpose | غرض الزيارة | Why the family is visiting. |
| **Details** — Name | الاسم | Each visiting family member's name. |
| **Details** — Nationality / Religion | الجنسية / الديانة | Their nationality and religion. |
| **Details** — Birth date | تاريخ الميلاد | Their date of birth. |
| **Details** — Relation | العلاقة | Their relationship to the employee. |
| **Details** — Coming Place / Gender | جهة القدوم / النوع | Where they are travelling from, and gender. |

![Family Visit Visa Request](../../../ar/modules/hr/images/government-relations/family-visit-visa-en.png)

## Passport delivery

Companies often hold employees' passports for safekeeping. The **Passport Delivering Request**
(`طلب استلام جواز سفر`) documents handing a passport back — recording the employee, the passport
number and the **Purpose** (`الغرض`) of the release — so there is an auditable trail of who took their
passport and why.

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Employee | الموظف | The passport's owner. |
| Residency | الأقامة | The employee's Iqama context. |
| Passport Number | رقم جواز السفر | The passport being handed over, filled from the employee's passport. |
| Purpose | الغرض | Why the passport is being released: `renewal` or `Travel`. Required. |

## Actions on this screen

None of the visa and passport requests on this page — single or aggregated — has buttons of its own; you fill them in and save.

## How it's processed

None of these visa documents creates a general-ledger entry or changes the employee's file — they are
records and date-carriers, not accounting entries. Saving one is instant. The only document here with
an effect is the Aggregated Exit ReEntry Visa Request, which creates its individual requests when
committed. Any government fee attached to a visa is recorded and settled the way all government
charges are — see the Payment Request note on the
[Government Relations Overview](./government-relations-overview).

## Related pages

- [Government Relations Overview](./government-relations-overview) — the shared pick-employee →
  record cycle, the government-fee catalogue and the all-important payment-request
  accounting note.
