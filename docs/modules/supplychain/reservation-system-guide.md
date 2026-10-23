---
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
- **Updating reservation of related documents:** Through the `updateReservationOfRelatedDocs` configuration

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
1. Configure `reservationCriteria` in the document term to filter lines based on status
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

**Document Term Configuration:**
- **forceTrackQtyOfRelatedDocs:** Enable mandatory quantity tracking
- **updateTrackQtyInRelatedDoc:** Update tracking quantities in source documents
- **relatedDocQtyPolicy:** Policy for handling quantity variances
- **relatedDocQtyFields:** Which fields to use for tracking (first or second quantity)

**Reservation-Specific Configuration:**
- **reservationSatisfiedFields:** Which quantity fields track reservation satisfaction
- **updateReservationOfRelatedDocs:** Enable reservation updates when tracking quantities

## Item-Level Reservation Configuration

Items can be configured with specific reservation behaviors through `ItemConfigurations`:

### Core Reservation Settings

- **includeReservedInBalance:** Whether reserved quantities affect available balance calculations
- **allowOverdraftInReservation:** Lets the item go below zero in every document except Stock Issue, Stock Receipt and the three stock-transfer documents

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

## Comprehensive Configuration Options

### Document Term Configuration (InvDocTermConfig)

#### Basic Reservation Control
- **reserve:** Enable/disable reservation functionality
- **reserveFromReservationQty:** Reserve from existing reservation quantities instead of document quantities
- **preventCancelReservation:** Disable reservation cancellation

#### Reservation Sequentiality
- **checkReservationSequentiality:** Enforce proper reservation order
- **checkReservationSequentialityInFirstSaveOnly:** Apply sequentiality check only on initial save

#### Warehouse and Location Management
- **reservationWarehouseSource:**
  - `NormalWarehouse`: Use the document's normal warehouse
  - `ReservationWarehouse`: Use specialized reservation warehouse
- **reservationLocatorSource:**
  - `NormalLocator`: Use the document's normal locator
  - `ReservationLocator`: Use specialized reservation locator

#### Quantity Tracking Integration
- **reservationSatisfiedFields:**
  - `TrackInFirst`: Track satisfied quantities in first quantity field
  - `TrackInSecond`: Track satisfied quantities in second quantity field
- **reservationCriteria:** Filter criteria for which lines can be reserved

#### Related Document Handling
- **cancelReservationOfRelatedDocs:** Auto-cancel related reservations
- **updateReservationOfRelatedDocs:** Update connected reservations when quantities change
- **updateReservationStatusInFromDoc:** Sync status with source documents

#### Validation and Quality Control
- **checkAvailableQties:** Validate before saving
- **forceDoNotIncludeReserved:** Exclude reserved quantities from validation

#### Delivery System Integration
- **useDelivSysEntriesForReserv:** Use delivery system for reservations
- **reserveFromDeliveryEntryQty:** Reserve based on delivery quantities
- **rootDeliveryDocument:** Link to primary delivery document

## Reservation Process Flow

### 1. Document Creation and Setup

1. **Document Type Determination:** System identifies if document is Sales/Issue (Pre-Out) or Purchase/Receipt (Pre-In)
2. **Term Configuration Loading:** Retrieves reservation settings from document term configuration
3. **Item Configuration Check:** Validates item-level reservation permissions and overdraft policies
4. **Warehouse/Locator Assignment:** Applies reservation-specific warehouse and locator rules

### 2. Reservation Request Generation

When a document with reservations is saved:

1. **InvTransReq Creation:** System generates inventory transaction requests
2. **Line Processing:** Converts document lines to reservation request lines
3. **Quantity Calculation:** 
   - For new reservations: Uses full document quantities
   - For updates with satisfied quantities: Subtracts fulfilled amounts
4. **Dimension Transfer:** Copies item dimensions, warehouse, locator, and tracking information

**Code Reference:** `InvSystemFilesUtils.addRequestLine:354-373`

### 3. Quantity Validation and Effects

The `setIdAndValidateQtyEffects` method performs comprehensive validation:

1. **Available Quantity Check:** Verifies sufficient quantities exist
2. **Overdraft Validation:** Checks item, section, and system-level overdraft policies
3. **Reserved Quantity Processing:** 
   - For Sales/Issue documents: Increases Pre-Out quantities
   - For Purchase/Receipt documents: Increases Pre-In quantities
4. **Balance Calculation:** Updates available balance based on item configuration

**Code Reference:** `QtyTransUtils.setIdAndValidateQtyEffects:154-285`

### 4. Satisfied Quantity Updates (For Related Documents)

When a document is created from another document with reservations:

1. **Source Document Identification:** Finds the originating document
2. **Quantity Tracking Configuration:** Retrieves tracking field settings
3. **Satisfied Quantity Calculation:** Updates fulfilled amounts in source document
4. **Reservation Adjustment:** Reduces source document's reservation by satisfied amount
5. **New Reservation Creation:** Creates new reservation for the current document

**Code Reference:** `SCRelatedQtiesUtil.updateSatisfiedQtiesd:80-149`

### 5. Reservation Cancellation

#### Automatic Cancellation Triggers
- **Document Deletion:** Automatically cancels all reservation effects
- **CancelReservation Flag:** Manual cancellation through document interface
- **Related Document Processing:** Cascading cancellation through document chains

#### Cancellation Process
1. **Validation:** Check if cancellation is allowed by term configuration
2. **Request Type Change:** Converts reservation requests to DELETE operations
3. **Effect Reversal:** Removes Pre-In/Pre-Out quantities
4. **Related Updates:** Updates all connected documents in the chain

**Code Reference:** `BasicSCDocument.cancelReservationOfRelatedIfNeeded`

## System Integration Points

### Inventory Management Integration

#### Quantity Effects
- **ItemDimensionsQty Records:** Store reservation effects per item/dimension combination
- **ItemDimensionsQty.data:** Track in/out/pre-in/pre-out quantities
- **Balance Calculation:** Consider reserved quantities based on item configuration

#### Transaction Processing
- **ReservationTransLine:** Manages reservation transaction lines


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
- **DeliverySysEntry Integration:** Use delivery system quantities instead of document quantities
- **Root Entry Processing:** Creates reservation lines from delivery entries
- **Remaining Quantity Management:** Reserves based on delivery system remaining quantities

**Code Reference:** `InvSystemFilesUtils.createInvReqLinesFromEntries`

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
3. **Configuration Issue:** Item's `includeReservedInBalance` setting affecting calculations
4. **Dimension Mismatch:** Specific warehouse/locator/lot doesn't contain the item
5. **Overdraft Policy:** Item or system settings preventing overdraft

**Diagnostic Steps:**
1. Check actual inventory quantities in specified warehouse/locator
2. Review item configuration for `includeReservedInBalance` setting
3. Verify item's `allowOverdraftInReservation` configuration
4. Check dimension specifications match available inventory
5. Review system-level overdraft policies

**Solutions:**
1. **Transfer Inventory:** Move items from other locations
2. **Adjust Item Configuration:** Modify `includeReservedInBalance` if appropriate
3. **Cancel Competing Reservations:** Review and cancel unnecessary reservations
4. **Adjust Dimensions:** Modify warehouse, locator, or other dimension requirements

#### Issue: Reservation Sequentiality Violations

**Problem:** System rejects reservation due to sequentiality rules

**Causes:**
1. **Term Configuration:** `checkReservationSequentiality` enabled
2. **Document Order:** Documents not created in required sequence
3. **Chain Breaks:** Missing intermediate documents in the workflow

**Solutions:**
1. **Review Sequentiality Settings:** Check if `checkReservationSequentialityInFirstSaveOnly` can be used
2. **Document Order:** Ensure documents are created in proper sequence
3. **Configuration Adjustment:** Consider relaxing sequentiality requirements if business allows
4. **Workflow Review:** Ensure complete document chain exists

#### Issue: Related Document Updates Not Working

**Problem:** Changes in reservation document don't update source documents

**Diagnostic Checklist:**
1. **Document Relationships:** Verify proper "From Document" linkage
2. **Term Configuration:** Check `updateReservationOfRelatedDocs` setting
3. **Quantity Tracking:** Verify `reservationSatisfiedFields` configuration
4. **Status Updates:** Confirm `updateReservationStatusInFromDoc` is enabled

**Solutions:**
1. **Configure Relationships:** Ensure proper document chain setup
2. **Enable Updates:** Turn on related document update settings
3. **Field Mapping:** Configure appropriate satisfaction quantity fields
4. **Test Chain:** Verify updates flow through entire document hierarchy

#### Issue: Satisfied Quantity Tracking Errors

**Problem:** Satisfied quantities not updating correctly between documents

**Common Causes:**
1. **Configuration Missing:** `forceTrackQtyOfRelatedDocs` not enabled
2. **Field Mapping:** Wrong `relatedDocQtyFields` or `reservationSatisfiedFields` setting
3. **Unit Conversion:** UOM conversion failures between documents
4. **Chain Breaks:** Document relationship issues

**Solutions:**
1. **Enable Tracking:** Turn on quantity tracking in term configuration
2. **Field Configuration:** Verify correct quantity field mappings
3. **UOM Setup:** Ensure proper unit of measure conversions exist
4. **Relationship Verification:** Check document chain integrity

## Complete Configuration Reference

This section provides a comprehensive list of all configuration options related to the reservation system, organized by their location in the system.

### Document Term Configuration (InvDocTermConfig)
**Location:** Document Term > Term Configuration Tab

#### Basic Reservation Settings
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `reserve` | حجز | Enable/disable reservation functionality for this document type |
| `reserveFromReservationQty` | حجز من كميات الحجز وليس من كمية المستند | Reserve from existing reservation quantities instead of document quantities |
| `preventCancelReservation` | منع إلغاء الحجز | Disable reservation cancellation for this document type |

#### Reservation Sequentiality Control
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `checkReservationSequentiality` | التاكد من تسلسل الحجز | Enforce proper reservation order across document chain |
| `checkReservationSequentialityInFirstSaveOnly` | التاكد من التسلسل في الحفظ اول مرة فقط | Apply sequentiality check only on initial document save |

#### Warehouse and Location Management
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `reservationWarehouseSource` | مصدر مخزن الحجز | Define warehouse selection rules for reservations |
| `reservationLocatorSource` | مصدر موقع الحجز | Define locator selection rules for reservations |

**Warehouse Source Values:**
- `NormalWarehouse`: Use the document's normal warehouse
- `ReservationWarehouse`: Use specialized reservation warehouse

**Locator Source Values:**
- `NormalLocator`: Use the document's normal locator  
- `ReservationLocator`: Use specialized reservation locator

#### Quantity Tracking and Satisfaction
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `reservationSatisfiedFields` | حقول الكمية الملغي حجزها | Configure which fields track satisfied reservation quantities |
| `reservationCriteria` | فلتر سطور الحجز | Filter criteria for which lines can be reserved |

**Satisfied Fields Values:**
- `TrackInFirst`: Track satisfied quantities in first quantity field
- `TrackInSecond`: Track satisfied quantities in second quantity field

#### Related Document Processing
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `cancelReservationOfRelatedDocs` | إلغاء حجز المستندات المرتبطة | Automatically cancel related document reservations |
| `updateReservationOfRelatedDocs` | تحديث حجز المستندات المرتبطة | Update connected reservations when quantities change |
| `updateReservationStatusInFromDoc` | تحديث حالة الحجز في المستند المرتبط | Sync reservation status with source documents |

#### Quantity Tracking Configuration
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `forceTrackQtyOfRelatedDocs` | متابعة كمية المستند المرتبط إجبارياً | Enable mandatory quantity tracking between documents |
| `updateTrackQtyInRelatedDoc` | تحديث متابعة الكميات في السند المرتبط | Update tracking quantities in source documents |
| `relatedDocQtyPolicy` | متابعة كمية المستند المرتبط | Policy for handling quantity variances |
| `relatedDocQtyFields` | حقول متابعة الكميات في السند المرتبط | Which fields to use for tracking (first or second quantity) |

#### Validation and Quality Control
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `checkAvailableQties` | التاكد من الكميات المتاحة قبل الحفظ | Validate available quantities before saving |
| `forceDoNotIncludeReserved` | عدم اعتبار المحجوز عند التأكد من الكميات | Exclude reserved quantities from validation |

#### Delivery System Integration
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `useDelivSysEntriesForReserv` | الحجز بأستخدام جدول التوصيل النظامي | Use delivery system entries for reservations |
| `reserveFromDeliveryEntryQty` | حجز من كمية جدول التوصيل النظامي | Reserve based on delivery system quantities |
| `rootDeliveryDocument` | مستند توصيل رئيسي | Link to primary delivery document |

### Item Configuration (ItemConfigurations)
**Location:** Item Master > Item Configuration Tab

| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `includeReservedInBalance` | خصم المحجوز من المتاح للبيع | Whether reserved quantities affect available balance calculations |
| `allowOverdraftInReservation` | السماح بالسحب على المكشوف في الحجز | Lets the item go below zero in every document except Stock Issue, Stock Receipt and the three stock-transfer documents |
| `overDraftPolicy` | إمكانية السحب على المكشوف | Item-level overdraft policy (Yes/No/Inherited) |

### Supply Chain Configuration (SupplyChainConfigurations)  
**Location:** System Configuration > Supply Chain Configurations

#### Core Reservation Settings
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `checkQtiesInReservationDocs` | التأكد من الكميات في المستندات التي تقوم بالحجز | Check quantities in reservation documents |
| `cancelReservationOfDirectParentsOnly` | إلغاء حجز المستند الأعلى فقط عند استعمال خيار إلغاء الحجز بالتوجيه | Cancel reservation of direct parent documents only |

#### Overdraft Control
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `overDraftPolicy` | إمكانية السحب على المكشوف | System-level overdraft policy |
| `dimensionsWithAllowedOverdraft` | محددات تسمح بالسحب على المكشوف | Dimensions with allowed overdraft configurations |
| `checkOverdraftByDate` | التاكد من السحب على المكشوف بالتاريخ | Check overdraft by date |
| `includeReservationInCheckOverdraftByDate` | تضمين الحجز عند التأكد من السحب على المكشوف بالتاريخ | Include reservation in overdraft check by date |
| `doNotCheckOverdraftByDateForReservation` | عدم التاكد من السحب على المكشوف بالتاريخ في الحجز | Do not check overdraft by date for reservations |

#### Quantity Check Configuration
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `checkQtyByDateOnly` | التأكد من الكميات بالتاريخ فقط (تسمح بتجاهل المخازن مثلا) | Check quantity by date only |
| `checkQtyByDateOnlyWithReservation` | التأكد من الكميات بالتاريخ فقط مع الحجز (تسمح بتجاهل المخازن مثلا) | Check quantity by date only with reservation |
| `reservationSettings` | إعدادات التجاهل مع الحجز | Reservation-specific settings for ignoring certain validations |
| `doNotConsiderDimensionsInOverdraftByDate` | تجاهل المحددات التالية عند التأكد من الكميات بالتاريخ | Do not consider dimensions in overdraft by date |
| `doNotConsiderDimensionsInOverdraftByDateWithReservation` | تجاهل المحددات التالية عند التأكد من الكميات بالتاريخ مع الحجز | Do not consider dimensions in overdraft by date with reservation |

#### Quantity Tracking System
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `useEntriesForTrackQuantities` | إستخدام الجدول النظامي لمتابعة الكميات | Use system entries for quantity tracking |
| `ignoreQtyTrackingWhithDocumentDelete` | تجاهل اخطاء متابعة الكميات مع حذف المستندات | Ignore quantity tracking when deleting documents |
| `updateReservationQtyWithPrimeQtyChange` | تحديث كمية الحجز مع تغيير كمية المستند | Update reservation quantity with primary quantity changes |

#### Transfer and Stock Document Settings
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `transReqReserveQtyOutOnly` | طلب التحويل يقوم بحجز الكميات للخارج فقط | Transfer request reserves outbound quantity only |
| `showToItemDimensionsInTransfer` | عرض الي محددات الصنف في التحويل و استعمالها | Show destination item dimensions in transfers |
| `doNotUpdateItemLotAndBoxFromIssueAndSales` | Do Not Update Item Lot And Box From Issue And Sales | Do not update item lot and box from issue and sales |

#### Performance and Processing
| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `checkOverdraftNextTransCount` | عدد الحركات اللاحقة للسند التي يجب التاكد من انها لم تصبح مكشوفة | Number of next transactions to check for overdraft |
| `doNotCheckOverdraftWithRecommit` | Do Not Check Over Draft With Recommit | Do not check overdraft with recommit operations |

### Item Section Configuration
**Location:** Item Section Master > Configuration

| Configuration Field | Arabic label on screen | Description |
|---------------------|-------------------|-------------|
| `overDraftPolicy` | إمكانية السحب على المكشوف | Section-level overdraft policy (Yes/No/Inherited) |

### Which setting wins

Whether a line may take an item below zero is decided in a fixed order: the item's **Allow Overdraft In Reservation**, then the matching *Dimensions With Allowed Overdraft* row, the item's policy, the item section's policy and finally the company-wide policy. **Prevent Overdraft** on the document term can only make the check stricter, never looser. [Overdraft & Quantity Checking](/modules/supplychain/configuration/overdraft-and-quantity-checking) walks through the order step by step.

### Configuration Validation Rules

#### Required Configurations for Basic Reservation
- Document Term: `reserve = true`
- Item Configuration: Valid `overDraftPolicy` setting

#### Required Configurations for Quantity Tracking
- Document Term: `forceTrackQtyOfRelatedDocs = true`
- Document Term: `relatedDocQtyFields` must be specified
- System Configuration: `useEntriesForTrackQuantities` (optional)

#### Required Configurations for Reservation Updates
- Document Term: `updateReservationOfRelatedDocs = true`
- Document Term: `reservationSatisfiedFields` must be specified
- Source Document Term: `reserve = true`
