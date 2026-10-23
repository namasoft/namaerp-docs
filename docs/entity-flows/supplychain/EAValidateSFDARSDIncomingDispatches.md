---
title: EAValidateSFDARSDIncomingDispatches
module: supplychain
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAValidateSFDARSDIncomingDispatches

## Overview

Refuses to save a **Purchase Invoice** or **Car Purchase Invoice** whose medicine lines do not match the SFDA RSD dispatch notification the supplier sent for that delivery. It checks the supplier's GLN, each item's GTIN and batch, the expiry date, and that the quantity received does not exceed what is still left to receive from the notification.

For how medicine movements are reported to the SFDA and how the SFDA RSD Configuration is set up, see [Reporting Medicine Movements to the SFDA](/integration/sfda-drug-track-and-trace).

## When This Action Runs

Attach it to the purchase invoice's entity flow on **Validate On Save**, so a mismatched invoice is stopped before it is saved. It has no effect on other document types.

The same check can be run by hand on a saved invoice, without this flow, from the invoice's More menu: **Validate Against RSD Notifications**.

## How It Works

1. **Finds the SFDA RSD Configuration** from the invoice's book, or from its term when the book has none.
2. **Reads the notification ID** from the invoice field named in the configuration's **Purchase Invoice RSD Notification ID Field**. The field may sit on the header or in a grid; in a grid, the first line that carries a value is used. When the invoice has no notification ID, the check does nothing and the invoice saves normally.
3. **Reads the dispatch notification from the SFDA**, so the comparison is against the Authority's current data. It is also recorded in the **SFDA RSD Incoming Dispatch** list.
4. **Checks the supplier**: the GLN of the invoice's supplier must equal the GLN that sent the notification.
5. **Checks each line whose item is Subject To RSD Tracking** (other lines are ignored):
   - the item's GTIN (taken from where the configuration says) and the line's lot must match a product in the notification;
   - when the notification carries an expiry date, the line's expiry date must equal it.
6. **Checks quantities**: for each GTIN and batch in the notification, the quantity on this invoice (in the item's main unit) must not exceed the notified quantity minus what other saved invoices with the same notification ID have already received.

All mismatches are collected and shown together, without the entity flow's name in front of them.

## Parameters

This action takes no parameters.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *SFDA RSD: no SFDA RSD configuration is set on the book or the term of document {0}* — «SFDA RSD: لا توجد إعدادات تتبع الأدوية (رصد) على دفتر أو توجيه المستند {0}» | Neither the invoice's book nor its term points to an SFDA RSD Configuration. | Set the SFDA RSD Configuration on the book or the term. |
| *SFDA RSD: the purchase invoice RSD notification ID field is not set in SFDA RSD configuration {0}* — «SFDA RSD: حقل رقم إشعار رصد في فاتورة الشراء غير محدد في إعدادات تتبع الأدوية {0}» | The configuration does not say which invoice field holds the notification ID. | Fill **Purchase Invoice RSD Notification ID Field** in the configuration. |
| *SFDA RSD: dispatch notification {0} was not found* — «SFDA RSD: إشعار رصد رقم {0} غير موجود» | The SFDA returned nothing for that notification ID. | Check the notification ID typed on the invoice against the supplier's dispatch. |
| *SFDA RSD: dispatch notification {0} was sent by GLN {1}, while the GLN of supplier {2} is {3}* — «SFDA RSD: إشعار رصد رقم {0} مُرسَل من رقم الموقع العالمي (GLN) {1}، بينما رقم الموقع العالمي للمورد {2} هو {3}» | The notification came from a different party than the invoice's supplier. | Correct the supplier on the invoice, or the supplier's GLN on its record. |
| *SFDA RSD: line {0}: item {1} is not part of dispatch notification {2}* — «SFDA RSD: السطر {0}: الصنف {1} غير موجود في إشعار رصد رقم {2}» | No product in the notification has this item's GTIN. | Check the item on the line, or the GTIN on the item. |
| *SFDA RSD: line {0}: batch {1} of item {2} is not part of dispatch notification {3}* — «SFDA RSD: السطر {0}: رقم التشغيلة {1} للصنف {2} غير موجود في إشعار رصد رقم {3}» | The GTIN is in the notification, but not with this batch. | Correct the lot on the line to the batch the supplier dispatched. |
| *SFDA RSD: line {0}: expiry date {1} of item {2} differs from {3} in dispatch notification {4}* — «SFDA RSD: السطر {0}: تاريخ الإنتهاء {1} للصنف {2} يختلف عن {3} في إشعار رصد رقم {4}» | The line's expiry date is not the one in the notification. | Correct the expiry date on the line. |
| *SFDA RSD: quantity {0} of GTIN {1} batch {2} exceeds {3} still available to receive from dispatch notification {4}* — «SFDA RSD: الكمية {0} لرقم GTIN {1} رقم التشغيلة {2} تتجاوز الكمية المتبقية للاستلام {3} من إشعار رصد رقم {4}» | This invoice plus the invoices already saved for the same notification receive more than was dispatched. | Reduce the quantity, or check the earlier invoices that used the same notification ID. |

**Module:** supplychain

**Full Class Name:** `com.namasoft.modules.supplychain.domain.utils.EAValidateSFDARSDIncomingDispatches`


</div>

