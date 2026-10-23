---
entities: [SalesStandardTerm, StandardTermFulfillment, StandardTermExtension]
menu: Basic → Master Files → Sales Standard Term
---
# Standard Terms and Conditions Feature Documentation

## Overview

The Standard Terms feature in Nama ERP provides a comprehensive mechanism for tracking terms and conditions in sales documents (invoices, quotations, etc.) and monitoring whether these terms have been fulfilled. This system allows businesses to define standardized terms, attach them to documents, track their fulfillment status, and manage extensions when needed.

## Key Components

### 1. Sales Standard Term (Master File)
**Entity**: `SalesStandardTerm`  
**Table**: `SalesStandardTerm`  
**Type**: Master File

This is the master definition of standard terms that can be attached to sales documents.

#### Configuration Fields:
- **Code** (`code`): Unique identifier for the term
- **Name 1** (`name1`): Primary name/description of the term
- **Requires Standard Term Fulfillment Document** (`requiresTermFulfillment`): Boolean flag indicating if this term needs formal fulfillment tracking
- **Used With Standard Term Extension Document** (`useWithTermExtension`): Boolean flag indicating if this term can be extended
- **Initial Term Work Period** (`initialTermWorkPeriod`): Default duration for the term (includes value and unit of measure)
- **Remarks 2** (`remarks2`): Additional notes or detailed description of the term

![A Sales Standard Term that needs a fulfillment document and can be extended, with a 30-day initial period](../../ar/modules/invoicing/images/sales-standard-term-en.png)

### 2. Standard Term Fulfillment Document
**Entity**: `StandardTermFulfillment`  
**Table**: `StandardTermFulfillment`  
**Type**: Document File

Document used to formally record that specific terms have been fulfilled.

#### Key Fields:
- **From Doc** (`fromDoc`): Generic reference to the source document (e.g., Sales Invoice)
- **Details** (`details`): Collection of fulfillment lines

#### Fulfillment Line Fields:
- **Standard Term** (`standardTerm`): Reference to the Sales Standard Term being fulfilled
- **Fulfillment Date** (`fulfillmentDate`): Date when the term was fulfilled

### 3. Standard Term Extension Document
**Entity**: `StandardTermExtension`  
**Table**: `StandardTermExtension`  
**Type**: Document File

Document used to extend the deadline for standard terms that allow extensions.

#### Key Fields:
- **From Doc** (`fromDoc`): Generic reference to the source document
- **Details** (`details`): Collection of extension lines

#### Extension Line Fields:
- **Standard Term** (`standardTerm`): Reference to the Sales Standard Term being extended
- **Extension Period** (`extensionPeriod`): Additional time period for the extension
- **Extension Fine** (`extensionFine`): Monetary penalty for the extension

## Implementation in Sales Documents

### Sales Invoice Standard Terms Line
Documents like Sales Invoices can include standard terms through detail lines.

#### Line Fields:
- **Standard Term** (`standardTerm`): Reference to the Sales Standard Term
- **Remarks** (`remarks`): Additional notes specific to this instance
- **Standard Term Planned End Date** (`termPlannedEndDate`): Original deadline for the term
- **Standard Term End Date After Extension** (`termExtendedEndDate`): Updated deadline after extensions (system-calculated)
- **Fulfillment Date** (`fulfillmentDate`): Date when fulfilled (system-updated)
- **Total Extension Fine** (`extensionFines`): Accumulated fines from all extensions (system-calculated)
- **Fulfillment Doc** (`fulfillmentDoc`): Reference to the Standard Term Fulfillment document (system-updated)

#### Additional Custom Fields:
The system provides flexible fields for custom data:
- **Reference Fields** (`ref1` to `ref5`): Generic references for linking to other entities
- **Numeric Fields** (`n1` to `n5`): Decimal values for custom calculations
- **Text Fields** (`text1` to `text5`): Text values for additional information
- **Date Fields** (`date1` to `date5`): Date values for tracking milestones
- **Attachments** (`attachment1` to `attachment3`): Binary data for supporting documents

## Business Process Flow

### 1. Setup Phase
1. Create Sales Standard Terms in the master file
2. Configure each term with:
   - Whether it requires fulfillment tracking
   - Whether it can be extended
   - Default work period duration

### 2. Document Creation
1. Add standard terms to sales documents (invoices, quotations, etc.)
2. System automatically calculates `termPlannedEndDate` based on:
   - Document value date
   - Term's initial work period
3. For extendable terms, system calculates `termExtendedEndDate` considering any existing extensions

### 3. Term Extension Process
1. Create a Standard Term Extension document
2. Reference the source document
3. Add extension lines specifying:
   - Which terms to extend
   - Extension period
   - Extension fines
4. System updates:
   - `termExtendedEndDate` on the original document
   - `extensionFines` accumulation

### 4. Term Fulfillment Process
1. Create a Standard Term Fulfillment document
2. Reference the source document
3. Add fulfillment lines specifying:
   - Which terms are fulfilled
   - Fulfillment dates
4. System validates and updates:
   - `fulfillmentDate` on the original document
   - `fulfillmentDoc` reference

## Validation Rules

### Term Uniqueness
- Each standard term can only appear once per document (for terms requiring fulfillment or extension)
- System validates during document save

### Extension Validation
- Extensions cannot be applied after a term has been fulfilled
- Extensions are processed chronologically based on creation date
- System prevents conflicting extensions

### Fulfillment Validation
- A term can only be fulfilled once
- If a fulfillment document already exists for a term, another document cannot fulfill it
- System validates fulfillment dates against extension periods

## Technical Implementation

### Key Interfaces

#### IHasStandardTerms
Implemented by documents that support standard terms:
- `fetchTerms()`: Returns the collection of standard term lines
- `termLineClassType()`: Returns the specific line class type
- `calcStandardTermEndDateAfterExtension()`: Calculates dates considering extensions
- `validateStandardTerms()`: Validates term uniqueness and rules

#### IStandardTermLine
Implemented by standard term line classes:
- Getters and setters for all term-related fields
- System fields are managed automatically

### Utility Class: StandardTermUtils
Provides core business logic:
- `markStandardTermAsFulfilled()`: Processes fulfillment documents
- `extendStandardTerm()`: Processes extension documents
- `unFilFullStandardTerms()`: Reverses fulfillment
- `cancelExtendStandardTerm()`: Reverses extension
- `calcTermEndDatesAfterExtension()`: Recalculates dates

## Configuration Examples

### Example 1: Payment Terms
**Term Setup**:
- Code: `PAY30`
- Name: "Payment within 30 days"
- Requires Fulfillment: Yes
- Allows Extension: Yes
- Initial Period: 30 days

**Usage**: Attached to sales invoices to track payment deadlines and extensions.

### Example 2: Delivery Terms
**Term Setup**:
- Code: `DEL7`
- Name: "Delivery within 7 days"
- Requires Fulfillment: Yes
- Allows Extension: No
- Initial Period: 7 days

**Usage**: Attached to sales orders to track delivery commitments.

### Example 3: Warranty Terms
**Term Setup**:
- Code: `WAR365`
- Name: "One year warranty"
- Requires Fulfillment: No
- Allows Extension: Yes
- Initial Period: 365 days

**Usage**: Attached to sales invoices for warranty tracking.

## Summary

The Standard Terms feature provides comprehensive tracking and management of contractual terms and conditions in Nama ERP. Through its flexible configuration, automated calculations, and validation rules, it ensures businesses can effectively monitor and fulfill their obligations while maintaining clear documentation of all extensions and completions.
