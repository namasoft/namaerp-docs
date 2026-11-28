---
description: "Ending employment in HR: the Firing Request and Firing Document, generating the final settlement, Termination Reasons with their end-of-service gratuity rules, and aggregated firing for many employees."
entities: [FiringDocument, FiringRequest, TerminationReason, AggFiringDocument, AggFiringRequest]
---
# Firing & Termination

Ending someone's employment is never just a status change. The moment a departure is confirmed,
a chain of obligations comes due: the final settlement of unpaid salary, the cash-out of unused
vacation, any outstanding loans — and, above all, the **end-of-service gratuity** the company owes
for the years served. Nama models the departure itself with a lightweight **request → document**
pair, and keeps the potentially complex gratuity rules in a reusable catalogue of **termination
reasons** so that the same policy is applied consistently to everyone who leaves for the same
reason.

::: info Licence
The Firing Request, the Firing Document, their aggregated versions and the Termination Reason need
the payroll HR licence (`humanresource-payroll`); none of them needs a Gulf licence. The gratuity
rules — months-of-salary bands, percentage entitlements and the end-of-service cap — are whatever
you enter on the termination reason, so the same screens express the Gulf / KSA rules or any other.
:::

## Request first, then document

Termination follows the standard HR triplet. A **Firing Request** (`طلب إنهاء الخدمة`) is the
approval-gated application to let someone go; once accepted it produces a **Firing Document**
(`سند إنهاء الخدمة`), the executed record that actually marks the employee as terminated. If your
process doesn't need an approval step you can raise the document directly. For the full mechanics of
how a request is accepted and turned into a document, see
[HR Requests, Documents & Aggregated Documents](/modules/hr/concepts/hr-requests-and-documents).

Both screens live under **Payroll → Dues Liquidation and Firing** —
`الرواتب > التصفية وإنهاء الخدمات > سند إنهاء الخدمة` (*Payroll → Dues Liquidation and Firing →
Firing Document*).

The request and the document share the same core fields:

| Field (English) | Arabic label | Purpose |
|---|---|---|
| Employee | الموظف | The person being terminated. |
| Organization Position | الدرجة الوظيفية | Their grade at the time of leaving. |
| Work Start Date | تاريخ بدء العمل | Service start — the anchor for length-of-service. |
| Work End Date | تاريخ انتهاء العمل | The last working day; the settlement counts up to here. |
| Firing Reason | سبب إنهاء الخدمة | Why they are leaving. |
| From Document | بناءً على | On the document: links back to the accepted request. |
| Ignore Vacation Work Starting Document For Vacation That Requires Work Starting Document | تجاهل عمل سند مباشرة عمل للإجازات التي تطلب سند المباشرة | Lets the firing document be saved although the employee's vacation that requires a Work Starting Document has none — for an employee who leaves straight from a vacation. |
| Attachment 1–5 | مرفق 1–5 | Supporting paperwork (resignation letter, clearance, etc.). |

The **Firing Reason** is a fixed list: **Resignation** (`استقالة`), **Dismissal** (`فصل`),
**Pension** (`على المعاش`), **Suspension** (`وقف عن العمل`), and ten open **Other** slots
(*Other 1*…*Other 10*, `أخرى 1`…`أخرى 10`) you can repurpose for locally-defined reasons. It does
not choose the gratuity policy: that is the **Termination Reason** picked on the settlement (below).

![Firing Document](../../../ar/modules/hr/images/end-of-service/firing-document-en.png)

## Generating the settlement

Neither the firing request nor the firing document works out or pays the money itself — that is the
job of the dues liquidation. To bridge the two, both screens carry a **Generate Dues Liquidation
Document (Termination)** button (`إنشاء مستند تصفية مستحقات (نهاية خدمة)`).
Pressing it opens a **new dues liquidation** pre-filled from the termination — the employee and the
service dates are carried across so you don't re-key them (the full list is under
[Actions on this screen](#Actions-on-this-screen)). You then pick the settlement's **Termination
Reason**, which is required when the termination settlement is calculated. From there the settlement
computes gratuity, vacation cash-out, loans and final salary, nets them, and produces the payment. See
[Dues Liquidation](/modules/hr/end-of-service/dues-liquidation) for the money math.

## Termination reasons — the gratuity rulebook

A **Termination Reason** (`سبب نهاية الخدمة`) is a master record that turns "why did they leave and
how long did they serve" into "how many months of salary do we owe". You keep one record per policy —
one for resignations and a more generous one for end-of-contract or pension, say — and the
settlement's **Termination Reason** field names the one to apply. The **Termination Reason** text
field (`سبب نهاية الخدمة`) on the record's header is a free-text description that is copied into the
calculation lines; it does not link the record to firing reasons. It is found at
**Payroll → Dues Liquidation and Firing → Termination Reason**.

The gratuity is computed from **two rule tables** that work together, then clamped by an overall
cap:

**1. Months-of-salary bands** — *Termination Allowance Dues Months Sections*
(`شرائح استحقاق شهور بدل نهاية الخدمة`). Each row is a service band and the entitlement it earns:

| Column (English) | Arabic label | Meaning |
|---|---|---|
| From Year / To Year | من سنة / إلى سنة | The service-length band this row applies to. |
| Due Months | عدد شهور استحقاق بدل نهاية الخدمة | Months of salary earned per year inside this band. |
| Days Per Year (Multiplied by) | عدد الأيام عن كل سنة(مضروبا في) | Alternative day-based factor: days credited per year. When it or the next column is filled, the band earns days per year × 12 × years ÷ days of year months instead of due months × years. |
| Days Of Year (Divided On) | عدد الأيام للسنة(مقسوما على) | The divisor that turns those days into a fraction of a year. |

This is where the familiar Gulf pattern lives — for example *half a month's wage for each of the
first five years, a full month for every year beyond that* becomes one band for years 0–5 and
another for years 5 and up.

**2. Percentage bands** — *Termination Dues Sections* (`شرائح نسبة استحقاق نهاية الخدمة`). These
scale the earned gratuity by *how* the person left:

| Column (English) | Arabic label | Meaning |
|---|---|---|
| From Year / To Year | من سنة / إلى سنة | The service-length band. |
| Multiply By | مضروب في | Numerator of the entitlement fraction. |
| Divide On | مقسوما على | Denominator of the entitlement fraction. |

The classic resignation ladder — *nothing under two years, one third between two and five years,
two thirds between five and ten, the full amount after ten* — is expressed as multiply-by /
divide-on fractions (1÷3, 2÷3, 1÷1) per band.

Two header fields govern the whole record: **Percentages Scale** (`عدد خانات الكسر للنسب`) sets the
number of decimal places the calculation keeps (20 when empty), and **Maximum End of Service Months**
(`الحد الأقصى لأشهر مكافأة نهاية الخدمة`) **caps** the total gratuity — no matter how long the service,
the payout can never exceed this many months of salary (the Gulf statutory ceiling, for example).

![Termination Reason](../../../ar/modules/hr/images/end-of-service/termination-reason-en.png)

## Terminating many employees at once

For restructurings or end-of-project releases, the **Aggregated Firing Document**
(`سند إنهاء خدمة مجمع`) — and its request counterpart, the **Aggregated Firing Request**
(`طلب إنهاء خدمة مجمعة`) — let you process a whole list of employees from a single header. On
commit the batch spawns one ordinary document per line — a Firing Document from the aggregated
document, a Firing Request from the aggregated request — each carrying its own reason and dates, in the
book named on the term (see
[Employment and Government Relations Document Terms](/modules/hr/document-terms/hr-terms-employment-and-government)).
You manage the batch, not the generated singles; the aggregated pattern is explained in
[HR Requests, Documents & Aggregated Documents](/modules/hr/concepts/hr-requests-and-documents).

## Actions on this screen

**On the Firing Request and the Firing Document:**

- **Generate Dues Liquidation Document (Termination)** — opens a new Dues Liquidation Document for the employee, linked back to this record, with the last work day and the liquidate-to date set to the work end date, the last liquidation date and the commencement date filled in, and the termination settlement switched on (see [Generating the settlement](#Generating-the-settlement)). The record must be saved first; the new document opens unsaved for you to complete.

The Aggregated Firing Document, the Aggregated Firing Request and the Termination Reason have no buttons of their own.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *The employee {0} has already fired by document {1}* — «الموظف {0} لديه بالفعل سند إنهاء خدمة {1}» | The employee's state is already *Dismissed*, *Resigned* or *Pension* and an earlier firing document exists for them, so this one would end the same employment twice. | Work on the document named in the message; to re-hire and release the person again, put them back on the payroll first. |
| *End date must be greater than start date* — «تاريخ النهاية يجب أن يكون أكبر من تاريخ البداية» | The firing document's **Work Start Date** falls after its **Work End Date**, so the service span would be negative. | Correct the dates; the start date is the employee's own commencement date. |
| *The employee {0} work start date is {1}, cannot be fired on same day* — «تاريخ بداية العمل للموظف {0} هو {1} , لا يمكن إنهاء خدمة الموظف بنفس اليوم» | The termination's value date is the employee's first working day — there is no served day to settle. | Use the following day as the value date, or cancel the work-starting document if the employee never actually started. |
| *To Year must be greater than From Year* — «إلى سنة يجب أن تكون أكبر من من سنة» | On a **Termination Reason**, a gratuity band's **To Year** is not above its **From Year**, so the service band covers nothing. | Set each band to run upwards, with each band starting where the previous one ended. |

## Related pages

- [Dues Liquidation](/modules/hr/end-of-service/dues-liquidation) — the settlement generated from a termination.
- [HR Provisions](/modules/hr/end-of-service/hr-provisions) — the gratuity liability that has been accruing all along.
- [HR Requests, Documents & Aggregated Documents](/modules/hr/concepts/hr-requests-and-documents) — the
  request → document → aggregated pattern behind firing.
