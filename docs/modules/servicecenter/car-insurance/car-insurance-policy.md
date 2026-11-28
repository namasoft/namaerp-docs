---
description: "The Car Insurance Policy record: filling it from the sales order, which fields you type and which the documents set, its three status fields, the expiry date, and the Related Documents page."
entities: [SICustomerInsurancePolicy]
menu: cars → Car Insurance → Car Insurance Policy
---
# The Insurance Policy Record

::: info Required licence
`srvcenter-insurance-and-installments` **and** `srvcenter-subitems`. The [overview page](/modules/servicecenter/car-insurance/car-insurance-overview.md) explains why both are needed.
:::

Layla's policy has a number, a start date, an expiry date, a value and a car. It also has a life: it is ordered, it arrives, it is handed over, and later it may be renewed or cancelled. Nama keeps those two halves in two different places. The facts about the policy live on a **master record** — **Car Insurance Policy** / *وثيقة تأمين سيارة*, reached from **cars → Car Insurance** — and the events live on documents that point at it.

Al-Sahra creates one such record for Layla's car: policy `POL-2026-7741` against `INS-02` Wafa Insurance, programme `INSP-WAFA-COMP`, covering the [car record](/modules/servicecenter/cars-setup/car-master-file.md) `CAR-000318` (chassis `NWA7R24C26K000318`).

This page is about that record. The documents are on [the next page](/modules/servicecenter/car-insurance/car-insurance-policy-documents.md).

## Start from the sales order and let the screen fill itself

![The Customer Insurance Policy screen](../../../ar/modules/servicecenter/images/car-insurance/sc-car-insurance-policy-en.png)

The most efficient way to create a policy is not to type it. Open a new policy and pick the [**sales order**](/modules/servicecenter/car-sales/car-sales-order.md) first — `SISO-2026-0233` in Layla's case — and the screen pours the sale into itself.

From that one choice the policy takes the **customer**, the **insured name** (the one in [the order's financing block](/modules/servicecenter/car-installments/car-installment-programs.md), or the customer's name when that is empty), the **licensee** (the order's licensee, or its customer), the **bank** and the **insurance company** from the financing block, the **insurance programme** from the first order line that has one, the **policy category** from that programme's first band, the **car price** from the order's **Car Insurance Price** (*سعر تأمين السيارة*), and the **car** from the first order line that carries one, with its plate number, brand, chassis, engine number and item. The **Beneficiary Type** (*نوع المستفيد*) is filled from the order's **Sale Type** (*نوع البيع*): on a cash sale it is the customer, on any other sale it is the financing bank named in the financing block.

Two things worth knowing about that fill:

- Picking the order **overwrites** those fields with the order's values. Saving the policy then fills, from the linked order, only the fields that are **still empty** (the car price, the car details, the licensee and the beneficiary type only when the order has a Sale Type), so anything you type after picking the order is kept.
- The sales-order picker **hides orders that already carry a policy**, and when the policy already names an insurance company it offers only orders whose financing block names that company.

On commit the policy and the order are linked both ways: the order's **Policy** (*الوثيقة*) field points at the policy. The commit is refused when the order already belongs to another policy, or when the policy's insurance company differs from the one in the order's financing block:

- *Sales order {0} is already used in car insurance policy {1}* — «أمر بيع سيارة {0} مستخدم بالفعل في وثيقة تأمين سيارة {1}»
- *Insurance company {0} does not match insurance company {1} in sales order {2}* — «شركة التأمين {0} لا تطابق شركة التأمين {1} في أمر بيع سيارة {2}»

When a later save changes the policy value, the linked sales order is saved again so that it picks up the new value (see [the car sales order](/modules/servicecenter/car-sales/car-sales-order.md)).

What you still type yourself is the part the sale cannot know: the **Policy Type** (*نوع الوثيقة* — Issuance, External Issuance, Renewal or External Renewal) and the **effective start date**. The **policy number** the insurer issued is typed on the policy receipt, which copies it onto the policy.

## What is yours to type, and what belongs to the documents

The policy screen mixes two kinds of field, and telling them apart is the whole skill of using this record.

**Written by documents, read-only on the screen** — you will see them fill in as the cycle progresses, and you cannot edit them:

| Field | Arabic | Written by |
|---|---|---|
| Processed By | — | The policy order (cleared when the order is cancelled or deleted) |
| Physical Status | — | Order, receipt, delivery and the two cancellations of those |
| Payment Status | — | The customer's payments against the policy, the purchase invoice and the purchase return (see below) |
| Policy Status | — | Order, renewal, the two adjustments, cancellation |
| Insurance % and Buyer Insurance Percentage | التأمين % / نسبة تأمين المشتري | Copied on save from the programme band that covers the car price |
| **Renewed** and **New Insurance Policy** | تم التجديد / الوثيقة الجديدة | A committed renewal, value adjustment or period adjustment: it ticks **Renewed** on the policy of every row and copies the row's new policy, if any (both cleared when that document is cancelled or deleted) |
| Received Date and **Received** | تاريخ الاستلام / تم الاستلام | The policy receipt (cleared by the receipt cancellation) |
| Delivered Date and **Delivered** | تاريخ التسليم / تم التسليم | The policy delivery (cleared by the delivery cancellation) |
| **Purchased** | تم الشراء | The purchase invoice (cleared by the purchase return) |
| **Actual Cost** | التكلفة الفعلية | The purchase invoice: the net value of the policy's row. Back to zero when the purchase is returned or cancelled |
| Cancellation Date and Cancelled From Document | تاريخ الإلغاء | The cancellation document |

**Typed by you, freely, at any time** — the policy number, the effective date (*تاريخ فعلي*), the expiry date, the **Policy Duration** (*مدة الوثيقة*), the car price, the insurance company, the **Supplier** (*مورد*), the insurance programme, the policy category and the Policy Type. The **Canceled** (*تم الإلغاء*) tick is typed too; a policy with payments recorded against it cannot be ticked, and is refused with *Policy cannot be canceled because it has a paid amount of {0}* — «لا يمكن إلغاء الوثيقة لوجود مبلغ مسدد قدره {0}».

**The policy value.** Saving the policy works out its **Policy Value** from the programme band that covers the car price, or sets it to zero when no band matches. To keep a value you type, tick **Allow Calculating Policy Value Manually** (*السماح بحساب قيمة الوثيقة يدوياٌ*) in the Service Center configuration; a typed value is then kept, and only a zero value is worked out again.

**The two costs.** The **Initial Cost** (*التكلفة المبدئية*) is what you expect the policy to cost before the insurer bills you: type a percentage in the small box beside it and it is worked out as that percentage of the car price, or type the amount directly. The **Actual Cost** is what the purchase invoice says it cost. The receipt and the delivery book the policy's cost from the *Actual Cost* once there is one, and from the *Initial Cost* until then. The supplier you type here is copied onto the receipt, the delivery and the purchase invoice when their own supplier field is empty.

::: warning The record can quietly disagree with its own documents
Look at that second list again. **Policy Value, Expiry Date, Effective Date and Policy Number are all typed fields with no lock on them — and they are also written by committed documents.**

A policy receipt writes the policy number, the effective date and the expiry date. A value adjustment writes the policy value. A renewal writes the effective date and the expiry date. A period adjustment writes the expiry date. Once any of those has been committed, a user can still open the policy screen and type over the result, and the committed document keeps its own figures. Saving the policy screen also works its policy value out again from the programme band, unless **Allow Calculating Policy Value Manually** is ticked.

The practical rules:

- Once a policy has been through a renewal or an adjustment, **treat its value and dates as document-owned** and change them only by raising another adjustment.
- If a figure on a policy looks wrong, do not fix it on the master screen. Open the **Related Documents** page (below), find what the documents actually say, and correct it there.
- Never load policy values or dates through an import or an integration after the cycle has started — the import will overwrite whatever the documents wrote, silently.
:::

## The three status fields

The policy carries three independent status axes, all system-written, and it helps to read them as three different questions.

**Physical Status** — *where is the piece of paper?*

| Value | Arabic | Set by |
|---|---|---|
| Initial | — | The starting state; restored when the order is cancelled or deleted |
| Requested From Supplier | مطلوبة من المورد | The policy order, and the receipt cancellation |
| Received From Supplier | تم استلامها من المورد | The policy receipt, and the delivery cancellation |
| Delivered To Customer | تم تسليمها للعميل | The policy delivery |

**Payment Status** — *has it been paid for?* The customer pays the policy through receipt vouchers, which are listed in the policy's payment grid with the paid and remaining amounts. From those the status is worked out against the policy value: *Unpaid*, **Partially Paid** (*مسددة جزئياً*) or **Fully Paid** (*مسددة كلياًً*). The purchase invoice sets **Paid To Supplier** (*مدفوعة للمورد*), and the customer's payments no longer change it after that; cancelling the invoice or returning the purchase works the status out again from the payments.

**Policy Status** — *what phase of its life is it in?* Values are **First Time** (*أول مرة*), *Renewal*, **Period Adjustment** (*تعديل فترة*), **Value Adjustment** (*تعديل قيمة*) and *Cancelled*. Each of the corresponding documents stamps its own value here, so this field always tells you what happened to the policy most recently.

## The expiry date

Type the **effective date**, then either the **expiry date** or the **Policy Duration** (*مدة الوثيقة*) in months. When both the effective date and a duration are filled, saving sets the expiry date to the effective date plus that many months; leave the duration empty to keep an expiry date you typed. The policy receipt later overwrites both dates with the ones on its row.

Al-Sahra types Layla's dates directly, with no duration: effective **12 March 2026**, expiry **11 March 2027**. The record checks that the expiry date is not earlier than the effective date, and refuses one that is with *Effective start date must be before expiry date* — «تاريخ بداية السريان يجب أن يكون قبل تاريخ الانتهاء».

## The Related Documents page

The second page of the policy screen is the most useful screen in the whole area, and it is easy to miss.

It shows a timeline of every committed document whose grid contains this policy — orders, receipts and their cancellations, deliveries and their cancellations, purchase invoices and returns, renewals, adjustments and cancellations — in the order the cycle sees them. Each entry gives the document, its type, when it was created, the event date (the received or delivered date on a receipt or delivery, the value date otherwise) and the physical status the policy had after it. That is the complete history of the record in one place — and, because of the overwrite problem described above, it is the authoritative history. When the policy's value or dates look wrong, this page tells you what the documents actually recorded.
