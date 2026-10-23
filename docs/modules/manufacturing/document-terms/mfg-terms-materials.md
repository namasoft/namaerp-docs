---
entities: [RawMaterialIssue, RawMaterialReturn, RawMaterialIssueReq, RawMaterialReturnReq, ManufacturingStockTaking]
menu: Basic → Settings → Document Term
---

# Raw Material Document Terms

Raw materials leave the store on a **Raw Materials Issue**, come back on a **Raw Materials Return**, may be asked for first on a request, and are trued up against a count on a **Manufacturing Stock Taking**. The terms of these documents are mostly supply chain terms — they carry the full set of inventory tabs — with a handful of manufacturing options added on top.

How manufacturing terms work in general is on [Production Order and Planning Document Terms](/modules/manufacturing/document-terms/mfg-terms-production-orders#How-manufacturing-terms-work).

::: info Required license
These terms belong to the core `manufacturing` license.
:::

## The supply chain tabs

The issue, the return and both requests show the same tabs as any inventory document's term: **From Document**, **Sub Item Documents Configurations**, quantity tracking, **Reservation**, **Dimensions**, **Generation** and **Delivery System Table Configuration**. They behave as they do on any supply chain document and are described there:

- [From-Document Configuration](/modules/supplychain/document-terms/doc-term-from-document)
- [Sub-Item Configuration](/modules/supplychain/document-terms/doc-term-sub-item)
- [Quantity Tracking](/modules/supplychain/document-terms/doc-term-quantity-tracking)
- [Reservation and Delivery](/modules/supplychain/document-terms/doc-term-reservation-and-delivery)
- [Generation and Dimensions](/modules/supplychain/document-terms/doc-term-generation-and-dimensions)

What follows is only what manufacturing adds.

## Raw Materials Issue

**The stock issue it can create.** When the **Generation** block of the **Generation** tab names both a **Generation Book** and a **Generation Term**, saving a raw materials issue also creates a **stock issue** with that book and term, and keeps it in step when the issue is changed. With either field empty, no stock issue is created.

**Material Classification** (تصنيف الخامة), in its own block on the Settings tab, ties the term to one material classification. Choosing the term fills the issue's **Material Classification**, and when a production order is then picked, only that order's component lines of that classification are copied in. It is how one factory keeps separate issue documents — and separate storekeepers — for, say, packaging and chemicals drawn against the same order.

**Copy Remaining Quantity Considering Previously Issued Quantity** (نسخ الكمية المتبقية واعتبار ما تم صرفه سابقا), on the **From Document** tab, makes the lines copied from a production order carry only what is still to be issued, after earlier issues against the same order, instead of the full planned quantity. Turn it on wherever an order is issued in several instalments.

![The Settings tab of the Raw Materials Issue term](../../../ar/modules/manufacturing/images/document-terms/mfg-term-raw-material-issue-en.png)

## Raw Materials Return

A raw materials return moves material back into stock through a **stock receipt** it generates. Its book and term are the **Generation Book** and **Generation Term** in the **Generation** block of the **Generation** tab; fill both.

## Raw material issue request

The request's term adds a **Weight Scale** block (الميزان), for stores that weigh what they hand over:

- **Generated Weight Scale Preparation Document Book** / **Term** (دفتر / توجيه سند تحضير الميزان المنشأ) — when a request line is weighed on the weight scale, a weight scale preparation document is created with this book and term.
- **Generated Raw Material Issue Book** / **Term** (دفتر / توجيه مستند صرف المواد الخام المنشأ) — when that preparation document is saved, and its own term is set to generate documents, it creates or updates the raw materials issue from the weighed lines with this book and term.

A request with no weight scale in the process needs neither.

## Raw material return request

The return request's term adds nothing of its own beyond the supply chain tabs.

## Manufacturing Stock Taking

A manufacturing stock taking counts materials and then pushes each difference back onto the production orders that used the material. For every counted item with a difference, the difference is shared across the production orders that issued that item from the counted warehouse in the period, in proportion to what each consumed. Each order's share becomes a raw materials issue or a raw materials return, depending on its sign, and those come from the term:

- **Raw Material Issue Book** / **Raw Material Issue Term** (دفتر / توجيه صرف المواد الخام)
- **Raw Material Return Book** / **Raw Material Return Term** (دفتر / توجيه مرتجع المواد الخام)

Documents it generated earlier that are no longer needed are deleted when it is saved again. An item that no production order issued in the period cannot be spread anywhere: *The item {0} was not issued in any production order within the specified period* — «لم يتم صرف العنصر {0} في أي أمر إنتاج خلال الفترة المحددة».

The stock taking's own screen has two buttons: **Collect Production Orders And Materials** (تجميع أوامر الإنتاج و خاماتها) and **Collect Production Orders For Materials** (تجميع أوامر الإنتاج الخاصة بالخامات). Both need a saved document, fill its grids from the production orders in its range, and save it.
