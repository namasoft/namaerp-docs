---
description: "How stock reservation works: the Reservation Document, pre-out and pre-in quantities by document type, reservation statuses, satisfied quantities, item and document term settings, the overdraft policy, cancellation and troubleshooting."
entities: [ReservationDocument]
menu: Inventory → Reservation Documents → Reservation Document
---
# Comprehensive Reservation System Guide

This guide provides comprehensive documentation for the Reservation System in Nama ERP, intended for technical support staff and system administrators.

## Overview

The Reservation System in Nama ERP is a sophisticated inventory management feature that allows organizations to reserve inventory items across different types of supply chain documents. The system manages reservation effects differently based on document types and integrates with quantity tracking mechanisms to provide real-time inventory allocation control.

**Menu Path:** Inventory > Reservation Documents > Reservation Document

![Reservation document screen in NaMa ERP](../../ar/modules/supplychain/images/reservation/reservation-document-en.png)

::: tip Where Reservation Fits in Your Journey
Reservation is part of [The Sales Journey](./sales-journey.md) (reserving stock for a customer's order) and sets up [Delivery & Loading](./delivery-and-loading.md). To ignore specific warehouses/locators in the reservation quantity check by date, see [the dedicated guide](./ignore-reservation-qty-check-by-date.md).
:::

## Fundamental Concepts

### Reservation Direction by Document Type

The reservation system affects inventory quantities differently based on the document type:

#### Sales and Issue Documents (Pre-Out Reservations)
- **Sales Documents:** Sales quotations, sales orders, sales invoices
- **Issue Documents:** Stock issue requests, transfer requests, production withdrawals
- **Effect:** Creates **Pre-Out** quantities (reserved for outbound)
- **Purpose:** Ensures items are allocated for customer orders or internal consumption

#### Purchase and Receipt Documents (Pre-In Reservations)  
- **Purchase Documents:** Purchase requests, purchase orders, purchase invoices
- **Receipt Documents:** Stock receipt requests
- **Effect:** Creates **Pre-In** quantities (reserved for inbound)
- **Purpose:** Tracks expected inventory arrivals and allocations

#### Stock Documents (No Direct Reservation)
**Stock Issue, Stock Receipt, and Stock Transfer documents do not create reservations** because they affect actual inventory quantities (In and Out), not reserved quantities.

**However, these documents support:**
- **Cancelling reservation of upper documents:** When a stock issue is created from a sales order, it should cancel the sales order's reservation
- **Updating reservation of related documents:** Through the **Update Reservation Of Related Docs** configuration

**Example:** Creating a stock issue from a sales order should cancel the sales order's Pre-Out reservation since the items are now actually issued (moved from reserved to actual Out quantities).

### Quantity Types in Reservation System

The system manages four types of quantities for each item dimension:

| Quantity Type | Arabic | Description |
|---------------|--------|-------------|
| **In** | داخل | Actual received quantities |
| **Out** | خارج | Actual issued quantities |
| **Pre-In** | محجوز داخل | Reserved quantities expecting receipt |
| **Pre-Out** | محجوز خارج | Reserved quantities allocated for issue |

**Available Balance Calculation:**
```
Available = (In + Pre-In) - (Out + Pre-Out)
```

*Note: Pre-In and Pre-Out inclusion in balance depends on item configuration.*

## Reservation Document Structure

### Main Entity: ReservationDocument

**Entity Type:** ReservationDocument  
**Database Table:** ReservationDocument  
**Classification:** Document File (not Master File)

### Key Header Fields

- **Reservation Status:** Controls the current state of the entire document
- **Due Date:** When the reservation expires or should be fulfilled
- **To Employee:** Employee assigned to handle the reservation
- **Copy To Employee:** Additional employee to be notified
- **Warehouse:** Primary warehouse for the reservation
- **Locator:** Specific location within the warehouse
- **Customer:** Customer associated with the reservation
- **From Document:** Source document that generated this reservation

### Detail Lines

Each reservation document contains detail lines that specify:

- **Item Information:** Item code, name, and specifications
- **Quantities:** Reserved quantity with primary and secondary units
- **Dimensions:** Warehouse, locator, lot, serial numbers, colors, sizes
- **Reservation Details:** Line-level reservation status, date, and specific warehouse/locator
- **Tracking Information:** Satisfied and unsatisfied quantities for linked documents

## Reservation Status Values

| English | Arabic | Description |
|---------|--------|-------------|
| Reserved | محجوز | Items are fully reserved and allocated |
| PostReserved | حجز مؤجل | Reservation is pending or delayed |
| None | بدون | No reservation status |
| Confirmed | مؤكد | Reservation is confirmed and locked |
| PartialyReserved | PartialyReserved | Only partial quantities are reserved |

### Selective Line Reservation

By default, the reservation status has no effect on whether a line is reserved. However, when combined with the **reservationCriteria** configuration in the document term, the reservation status can be used to selectively apply reservations to specific lines.

**Usage Pattern:**
1. Configure **Reservation Lines Criteria** in the document term to filter lines based on status
2. Set line-level reservation status to control which lines get reserved
3. Only lines matching the criteria will have reservation effects applied

This allows fine-grained control over which document lines participate in the reservation system.

## Document Quantity Tracking and Satisfied Quantities

### The Satisfied Quantity Mechanism

The reservation system includes a sophisticated quantity tracking mechanism that monitors how much of a document's quantities have been fulfilled by subsequent documents.

#### Key Concepts

**Satisfied Quantity:** The amount of a document line that has been fulfilled by other documents  
**Unsatisfied Quantity:** The remaining amount that still needs to be fulfilled  
**User Satisfied Quantity:** Manually adjusted satisfied quantities

#### Practical Example: Sales Quotation to Orders

1. **Create Sales Quotation:** 100 pieces of Item A with reservation enabled
   - **Effect:** Creates Pre-Out reservation for 100 pieces
   - **Satisfied Qty:** 0, **Unsatisfied Qty:** 100

2. **Create Sales Order #1:** 50 pieces from the quotation
   - **System Updates Quotation:**
     - **Satisfied Qty:** 50, **Unsatisfied Qty:** 50
   - **System Updates Reservation:** Reduces quotation reservation to 50 pieces
   - **Order Creates:** New Pre-Out reservation for 50 pieces

3. **Create Sales Order #2:** 20 pieces from the same quotation
   - **System Updates Quotation:**
     - **Satisfied Qty:** 70, **Unsatisfied Qty:** 30
   - **System Updates Reservation:** Reduces quotation reservation to 30 pieces
   - **Order Creates:** New Pre-Out reservation for 20 pieces

#### Configuration for Quantity Tracking

The term settings behind this — quantity tracking against the source document, plus **Reservation Satisfied Fields** and **Update Reservation Of Related Docs** for the reservation itself — are listed in the [Configuration Reference](#Configuration-Reference) below.

## Item-Level Reservation Configuration

Each item's **Item Configurations** record (**Inventory → Settings → Item Configurations**) carries two reservation settings:

### Core Reservation Settings

- **Include Reserved In Balance:** the availability check counts other documents' reservations
- **Allow Overdraft In Reservation:** lets the item go below zero in every document except Stock Issue, Stock Receipt and the three stock-transfer documents

### Overdraft Policy Hierarchy

The system decides whether a line may go below zero in this order:

1. **Item's Allow Overdraft In Reservation:** when ticked, allows it in every document except Stock Issue, Stock Receipt and the three stock-transfer documents
2. **Dimensions With Allowed Overdraft:** the first matching row in the supply chain configuration (not for stock transfers)
3. **Item Level:** the item's own overdraft policy
4. **Item Section Level:** the item section's overdraft policy
5. **System Level:** the global supply chain configuration overdraft policy

**Prevent Overdraft** on the document term can only make the check stricter. The full rules are on [Overdraft & Quantity Checking](/modules/supplychain/configuration/overdraft-and-quantity-checking).

**Policy Values:**
- **Yes:** Allow overdraft
- **No:** Prevent overdraft
- **Inherited:** Use parent level policy

## Reservation Process Flow

### 1. Document Creation and Setup

1. **Document Type Determination:** System identifies if document is Sales/Issue (Pre-Out) or Purchase/Receipt (Pre-In)
2. **Term Configuration Loading:** Retrieves reservation settings from document term configuration
3. **Item Configuration Check:** Validates item-level reservation permissions and overdraft policies
4. **Warehouse/Locator Assignment:** Applies reservation-specific warehouse and locator rules

### 2. Reservation Request Generation

When a document with reservations is saved:

1. **Inventory request:** the system creates the document's inventory transaction request
2. **Line Processing:** Converts document lines to reservation request lines
3. **Quantity Calculation:** 
   - For new reservations: Uses full document quantities
   - For updates with satisfied quantities: Subtracts fulfilled amounts
4. **Dimension Transfer:** Copies item dimensions, warehouse, locator, and tracking information

### 3. Quantity Validation and Effects

Saving runs these checks:

1. **Available Quantity Check:** Verifies sufficient quantities exist
2. **Overdraft Validation:** Checks item, section, and system-level overdraft policies
3. **Reserved Quantity Processing:** 
   - For Sales/Issue documents: Increases Pre-Out quantities
   - For Purchase/Receipt documents: Increases Pre-In quantities
4. **Balance Calculation:** Updates available balance based on item configuration

### 4. Satisfied Quantity Updates (For Related Documents)

When a document is created from another document with reservations:

1. **Source Document Identification:** Finds the originating document
2. **Quantity Tracking Configuration:** Retrieves tracking field settings
3. **Satisfied Quantity Calculation:** Updates fulfilled amounts in source document
4. **Reservation Adjustment:** Reduces source document's reservation by satisfied amount
5. **New Reservation Creation:** Creates new reservation for the current document

### 5. Reservation Cancellation

#### Automatic Cancellation Triggers
- **Document Deletion:** Automatically cancels all reservation effects
- **Cancel Reservation:** manual cancellation from the document's screen
- **Related Document Processing:** Cascading cancellation through document chains

#### Cancellation Process
1. **Validation:** Check if cancellation is allowed by term configuration
2. **Request Type Change:** Converts reservation requests to DELETE operations
3. **Effect Reversal:** Removes Pre-In/Pre-Out quantities
4. **Related Updates:** Updates all connected documents in the chain

## System Integration Points

### Inventory Management Integration

#### Quantity Effects
- **Item balances:** reservation effects are kept per item and dimension combination, as in, out, pre-in and pre-out quantities
- **Balance Calculation:** Consider reserved quantities based on item configuration


### Document Workflow Integration

#### Source Document Relationships
- **From Document Processing:** Automatic creation from sales orders, purchase orders, etc.
- **Document Chain Tracking:** Maintains relationships for quantity tracking
- **Quantity Inheritance:** Copies quantities and dimensions from source documents

#### Stock Document Behavior
**Important:** Stock Issue, Stock Receipt, and Stock Transfer documents have special behavior:
- **No Direct Reservations:** They do not create Pre-In or Pre-Out quantities
- **Actual Quantity Effects:** They modify actual In and Out quantities only
- **Reservation Cancellation:** They can cancel reservations of parent documents

### Delivery System Integration

#### Delivery-Based Reservations
- **Delivery system table:** Use delivery system quantities instead of document quantities
- **Root Entry Processing:** Creates reservation lines from delivery entries
- **Remaining Quantity Management:** Reserves based on delivery system remaining quantities

## User Interface and Operations

### Main Edit Screen Layout

#### Details Grid
The details grid provides comprehensive item management:

**Item Identification:**
- Item code and description
- Assortment and measure quantities
- Dimensions (length, width, height)

**Quantity Management:**
- Primary quantity with UOM
- Secondary quantity tracking
- Reserved quantity display
- Satisfied/unsatisfied quantity tracking

**Dimension Specifications:**
- Warehouse and locator (can differ from header)
- Serial numbers and identifiers
- Item-specific dimensions (box, revision, size, color, lot)
- Active/inactive percentages
- Production, expiry, and retest dates

**Tracking Information:**
- Line reservation status
- Reservation date and warehouse assignment

#### Available Actions

**Core Reservation Actions:**
1. **Apply Reservation** - Execute the reservation effects on inventory
2. **Cancel Reservation** - Cancel reservation effects for related documents

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue: Insufficient Quantity Errors

**Error Message:** *Insufficient quantity for item {0} {1},Available Quantity is {2}, Reserved quantity is {3}* — «الكمية من الصنف {0} {1} لا تكفي. الكمية المتاحه {2} . الكميه المحجوزه {3}»

**Root Causes:**
1. **Actual Shortage:** Item doesn't have enough available quantity
2. **Reserved Quantity Blocking:** Previous reservations are consuming availability
3. **Configuration Issue:** Item's **Include Reserved In Balance** setting affecting calculations
4. **Dimension Mismatch:** Specific warehouse/locator/lot doesn't contain the item
5. **Overdraft Policy:** Item or system settings preventing overdraft

**Diagnostic Steps:**
1. Check actual inventory quantities in specified warehouse/locator
2. Review item configuration for **Include Reserved In Balance** setting
3. Verify item's **Allow Overdraft In Reservation** configuration
4. Check dimension specifications match available inventory
5. Review system-level overdraft policies

**Solutions:**
1. **Transfer Inventory:** Move items from other locations
2. **Adjust Item Configuration:** Modify **Include Reserved In Balance** if appropriate
3. **Cancel Competing Reservations:** Review and cancel unnecessary reservations
4. **Adjust Dimensions:** Modify warehouse, locator, or other dimension requirements

#### Issue: Reservation Sequentiality Violations

**Problem:** System rejects reservation due to sequentiality rules

**Causes:**
1. **Term Configuration:** **Check Reservation Sequentiality** enabled
2. **Document Order:** Documents not created in required sequence
3. **Chain Breaks:** Missing intermediate documents in the workflow

**Solutions:**
1. **Review Sequentiality Settings:** Check if **Check Reservation Sequentiality In First Save Only** can be used
2. **Document Order:** Ensure documents are created in proper sequence
3. **Configuration Adjustment:** Consider relaxing sequentiality requirements if business allows
4. **Workflow Review:** Ensure complete document chain exists

#### Issue: Related Document Updates Not Working

**Problem:** Changes in reservation document don't update source documents

**Diagnostic Checklist:**
1. **Document Relationships:** Verify proper "From Document" linkage
2. **Term Configuration:** Check **Update Reservation Of Related Docs** setting
3. **Quantity Tracking:** Verify **Reservation Satisfied Fields** configuration
4. **Status Updates:** Confirm **Update Reservation Status In From Doc** is enabled

**Solutions:**
1. **Configure Relationships:** Ensure proper document chain setup
2. **Enable Updates:** Turn on related document update settings
3. **Field Mapping:** Configure appropriate satisfaction quantity fields
4. **Test Chain:** Verify updates flow through entire document hierarchy

#### Issue: Satisfied Quantity Tracking Errors

**Problem:** Satisfied quantities not updating correctly between documents

**Common Causes:**
1. **Configuration Missing:** **Force Qty** not enabled
2. **Field Mapping:** Wrong **Related Doc Qty Fields** or **Reservation Satisfied Fields** setting
3. **Unit Conversion:** UOM conversion failures between documents
4. **Chain Breaks:** Document relationship issues

**Solutions:**
1. **Enable Tracking:** Turn on quantity tracking in term configuration
2. **Field Configuration:** Verify correct quantity field mappings
3. **UOM Setup:** Ensure proper unit of measure conversions exist
4. **Relationship Verification:** Check document chain integrity

## Configuration Reference

Reservation is switched on and shaped in four places. The tables below list the settings that matter for reservation, with the label you see on screen; each group links to the page that explains it in full.

### Document term

Open the document's term (**Basic → Settings → Document Term**). The full descriptions are on [Reservation & Delivery System](/modules/supplychain/document-terms/doc-term-reservation-and-delivery) and [Quantity Tracking](/modules/supplychain/document-terms/doc-term-quantity-tracking). The terms of Stock Issue, Stock Receipt and the three stock-transfer documents do not offer the reserve fields, because those documents move real stock instead of reserving it.

| Setting | Arabic label | What it does |
|---|---|---|
| **Reserve** `reserve` | حجز | The master switch: documents of this term reserve stock for their lines. |
| **Reserve From Reservation** `reserveFromReservationQty` | حجز من كميات الحجز وليس من كمية المستند | Sales documents only: reserves the line's reserved quantity instead of its main quantity. |
| **Reservation Lines Criteria** `reservationCriteria` | فلتر سطور الحجز | Reserves only the lines that match this criteria — for example by the line's reservation status. |
| **Reservation Warehouse Source** `reservationWarehouseSource` | مصدر مخزن الحجز | Reserves against the line's normal warehouse, or against its separate reservation warehouse. |
| **Reservation Locator Source** `reservationLocatorSource` | مصدر موقع الحجز | The same choice for the locator. |
| **Reservation Satisfied Fields** `reservationSatisfiedFields` | حقول الكمية الملغي حجزها | Reserves only what is still open on the line: the quantity already satisfied by later documents (first or second tracking quantity) is taken off the reservation. |
| **Prevent Cancel Reservation** `preventCancelReservation` | منع إلغاء الحجز | Later documents cannot cancel this document's reservation. |
| **Cancel Reservation Of Related Docs** `cancelReservationOfRelatedDocs` | إلغاء حجز المستندات المرتبطة | Saving this document releases the reservation held by the document it was created from — invoicing an order frees the order's reservation. |
| **Update Reservation Of Related Docs** `updateReservationOfRelatedDocs` | تحديث حجز المستندات المرتبطة | Instead of releasing it, recalculates the source document's reservation so it covers only what is still open. Cannot be on together with the cancel option. |
| **Check Reservation Sequentiality** `checkReservationSequentiality` | التاكد من تسلسل الحجز | First reserved, first served: a document that delivers against a reservation is refused when the stock on hand, after setting aside the reservations made before its source document, does not cover it. |
| **Check Reservation Sequentiality In First Save Only** `checkReservationSequentialityInFirstSaveOnly` | التاكد من التسلسل في الحفظ اول مرة فقط | Runs that check on the document's first save only. |
| **Check Available Quantities Before Save** `checkAvailableQties` | التاكد من الكميات المتاحة قبل الحفظ | Checks that the quantities are available when the document is saved, even when the document does not reserve them itself. |
| **Force Do Not Include Reserved With Qty Validation** `forceDoNotIncludeReserved` | عدم اعتبار المحجوز عند التأكد من الكميات | For this document, other documents' reservations are left out of the availability check, even for items set to count them. |
| **Update Reservation Status In From Doc** `updateReservationStatusInFromDoc` | تحديث حالة الحجز في المستند المرتبط | Reservation Document terms only: writes each line's reservation status back to the document it was created from. |
| **Reserve Using Delivery System Table** `useDelivSysEntriesForReserv` | الحجز بأستخدام جدول التوصيل النظامي | Reserves from the delivery system table instead of the document lines. |
| **Reserve From Delivery System Table Quantity** `reserveFromDeliveryEntryQty` | حجز من كمية جدول التوصيل النظامي | Which quantity column of the delivery system table is reserved. |

### Item Configurations

The item's **Item Configurations** record (**Inventory → Settings → Item Configurations**).

| Setting | Arabic label | What it does |
|---|---|---|
| **Include Reserved In Balance** `includeReservedInBalance` | خصم المحجوز من المتاح للبيع | The availability check counts other documents' reservations: reserved-out quantities reduce what is available, reserved-in quantities add to it. |
| **Allow Overdraft In Reservation** `allowOverdraftInReservation` | السماح بالسحب على المكشوف في الحجز | Lets the item go below zero in every document except Stock Issue, Stock Receipt and the three stock-transfer documents. |

### Supply Chain Configurations

**Inventory → Settings → Supply Chain Configurations**. Each setting is explained in full on [Overdraft & Quantity Checking](/modules/supplychain/configuration/overdraft-and-quantity-checking).

| Setting | Arabic label | What it does |
|---|---|---|
| **Check Quantities In Reservation Documents** `checkQtiesInReservationDocs` | التأكد من الكميات في المستندات التي تقوم بالحجز | Whether reserving documents are checked for available quantity at all. |
| **Cancel Reservation Of Direct Parent Only When Using (Cancel Reservation Option) In Document Terms** `cancelReservationOfDirectParentsOnly` | إلغاء حجز المستند الأعلى فقط عند استعمال خيار إلغاء الحجز بالتوجيه | Cancelling releases only the direct source document's reservation, not the whole chain above it. |
| **Transfer Request Reserve Quantity Out Only** `transReqReserveQtyOutOnly` | طلب التحويل يقوم بحجز الكميات للخارج فقط | A transfer request reserves only the outgoing side; off, it also reserves the incoming side at the destination. |
| **Update Reservation Quantity With Prime Quantity Change** `updateReservationQtyWithPrimeQtyChange` | تحديث كمية الحجز مع تغيير كمية المستند | Editing a sales line's quantity updates its reserved quantity to match. |
| **Over Draft Policy** `overDraftPolicy` | إمكانية السحب على المكشوف | The company-wide fallback when the item and its section inherit. |
| **Dimensions With Allowed Over Draft** `dimensionsWithAllowedOverdraft` | محددات تسمح بالسحب على المكشوف | Allows or refuses overdraft for lines in matching warehouses, locators and dimensions. |
| **Include Reservation In Check Overdraft By Date** `includeReservationInCheckOverdraftByDate` | تضمين الحجز عند التأكد من السحب على المكشوف بالتاريخ | The by-date check also counts reservations as of the document date. |
| **Do Not Check Overdraft By Date For Reservation** `doNotCheckOverdraftByDateForReservation` | عدم التاكد من السحب على المكشوف بالتاريخ في الحجز | Reserving documents skip the by-date check. |
| **Check Overdraft By Date Only With Reservation** `checkQtyByDateOnlyWithReservation` | التأكد من الكميات بالتاريخ فقط مع الحجز (تسمح بتجاهل المخازن مثلا) | The by-date-only choice for reserving documents, separate from the one for real stock movements. |
| **Ignore Settings With Reservation** `reservationSettings` | إعدادات التجاهل مع الحجز | Whether reservations ignore the same dimensions as real movements, or a set of their own. |
| **Do Not Consider Dimensions In Overdraft By Date With Reservation** `doNotConsiderDimensionsInOverdraftByDateWithReservation` | تجاهل المحددات التالية عند التأكد من الكميات بالتاريخ مع الحجز | That separate set of dimensions for reservations. |

### Item section

The item section's **Over Draft Policy** (إمكانية السحب على المكشوف) applies when the item's own policy is **Inherited**.

### Which setting wins

Whether a line may take an item below zero is decided in a fixed order: the item's **Allow Overdraft In Reservation**, then the matching *Dimensions With Allowed Overdraft* row, the item's policy, the item section's policy and finally the company-wide policy. **Prevent Overdraft** on the document term can only make the check stricter, never looser. [Overdraft & Quantity Checking](/modules/supplychain/configuration/overdraft-and-quantity-checking) walks through the order step by step.

### Combinations the system refuses

- **Cancel Reservation Of Related Docs** and **Update Reservation Of Related Docs** on the same term. Saving a document of that term is refused with
*You have selected two conflicting options in the term {0} for document {1}: update reservation and cancel reservation, please uncheck one of them* — «لقد قمت بالتعليم علي اختيارين متعارضين في التوجيه {0} للمستند {1}: تحديث الحجز و الغاء الحجز. يرجي ازالة العلامة من أحدهما»
- A reserving document created from another reserving document when its term has neither option on, so both would hold the same stock. It is refused with
*Cannot create reserve document based on other reserve document* — «لا يمكن إنشاء مستند يقوم بالحجز بناءا على مستند حجز اخر»
