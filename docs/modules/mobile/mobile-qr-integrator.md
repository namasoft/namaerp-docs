---
entities: [MobileQRIntegrator]
menu: Basic → Mobile Apps → Mobile QR Integrator
---
# Mobile QR Integrator Guide

## Overview
The Mobile QR Integrator is a powerful feature that enables Nama ERP to respond to QR codes scanned by mobile devices. It allows dynamic entity creation, updates, and custom actions based on QR code data, providing seamless integration between printed QR codes and the ERP system.

## Architecture

### Components
1. **MobileQRIntegrator Entity**: Defines how the system responds to scanned QR codes
2. **QR Code Generator**: Creates QR codes in Jasper Reports using `NamaRep.mobileQr()`
3. **Mobile Scanner**: Flutter-based QR scanner in Nama ERP mobile app
4. **Entity Flow Integration**: Executes custom business logic on QR scan

### Data Flow
```
QR Generation (Report) → QR Print → Mobile Scan → 
Server Processing → Entity Creation/Update → Response Display
```

## Configuration

### MobileQRIntegrator Entity Setup

The MobileQRIntegrator is a master file entity with the following key fields:

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| code | String | Unique identifier for the integrator | Yes |
| name1 | String | Arabic name | Yes |
| name2 | String | English name | No |
| createdEntityType | EntityTypeDF | The entity type to create/find | Yes |
| creationType | EntityCreationType | Creation behavior (CreateOnly, UpdateOnly, CreateAndUpdate) | Yes |
| entityFlow | EntityFlow | Flow to execute on the entity | Yes |
| finderQuery | QueryDF | SQL query to find existing entity | Conditional |
| successTempo | LongTextDF | Template for success message | No |

#### Creation Types
- **CreateOnly**: Always creates a new entity
- **UpdateOnly**: Only updates existing entities (fails if not found)
- **CreateAndUpdate**: Creates new or updates existing based on finder query

::: warning Important Validations
- For UpdateOnly and CreateAndUpdate types, a finderQuery is required
- The entityFlow must have at least one manual action line
- The entityFlow should have `requiresCommitOnManual` set to true
:::

### Entity Flow Requirements

The entity flow referenced by the integrator must:
1. Have at least one action with `targetAction: "Manual"`
2. Set `requiresCommitOnManual: true` for automatic commit, otherwise updates will fail
3. Access QR parameters via `$map` variables

![A Mobile QR Integrator that creates or updates a CRM lead from an exhibition QR code](../../ar/modules/mobile/images/administration/mobile-qr-integrator-en.png)

## QR Code Generation

### Using NamaRep.mobileQr() in Jasper Reports

```java
// Basic QR code
NamaRep.mobileQr()
    .code("IntegratorCode")
    .toString()

// QR with parameters
NamaRep.mobileQr()
    .code("CustomerInvoice")
    .addParam("customer", $F{customerCode})
    .addParam("branch", $F{branchId})
    .toString()

// Encrypted QR (Base64)
NamaRep.mobileQr()
    .code("SecureAction")
    .addParam("sensitive", $F{data})
    .encrypted()
    .toString()

// Using entity ID instead of code
NamaRep.mobileQr()
    .id($F{integratorId})
    .addParam("ref", $F{reference})
    .toString()
```

### QR Code Structure

The generated QR contains JSON data:
```json
{
  "idOrCode": "IntegratorCode",
  "params": {
    "param1": "value1",
    "param2": "value2"
  }
}
```

When encrypted, the JSON is encrypted and Base64 encoded with a prefix.

## Finder Query

The finder query determines if an entity already exists. It has access to:
- `{$map.paramName}`: Parameters from the QR code
- `{$user.property}`: Current user properties
- SQL functions and joins

### Examples

```sql
-- Find by customer code from QR
SELECT id FROM Customer WHERE code = {$map.customerCode}

-- Find today's attendance for current user
SELECT id FROM EDAttendance 
WHERE code = CONCAT('MA', {$user.code}, FORMAT(GETDATE(), 'yyyyMM'))

-- Find last invoice for customer
SELECT TOP 1 id FROM SalesInvoice s 
INNER JOIN Customer c ON c.id = s.customer_id 
WHERE c.code = {$map.customer}
ORDER BY s.valueDate DESC
```

## Entity Flow Configuration

### Accessing QR Parameters

Entity flows can access QR parameters through the `$map` variable:

```
fieldValue=$map.qrParam
otherField=$map.anotherParam"
```

### Example Flow: Field Calculator

```json
{
  "code": "QREntityCreation",
  "targetType": "SalesInvoice",
  "targetAction": "Manual",
  "requiresCommitOnManual": true,
  "details": [{
    "className": "com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator",
    "title1": "Set Fields",
    "parameter1": "customer=$map.customerCode\nvalueDate=$today\namount=$map.amount",
    "targetAction": "Manual"
  }]
}
```

## Success Message Templates

The `successTempo` field uses Tempo templating to generate response messages:

### Basic Template
```
Entity {code} created successfully for {customer.name1}
```

### With Collections
```
{loop(lines, last)}
Added line for item {lines.item.name1} with quantity {lines.quantity}
{endloop}
Total lines: {lines.$size}
```

### Conditional Display
```
{if=(status,"Stable")}
✓ Approved: {code}
{else}
⚠ Pending approval: {code}
{endif}
```

## Mobile App Integration

### QR Scanner Screen

The mobile app's QR scanner (Flutter) provides:
- **Camera View**: Real-time QR scanning
- **Results Panel**: Shows success (green) and failure (red) entries
- **Audio Feedback**: Error sound on failures
- **Continuous Scanning**: Processes multiple QRs without manual intervention

### Menu Configuration

To enable the QR scanner in the mobile app:
1. Create or modify a `MobileAppMenuDefinition`
2. Add the integrator to `targetItems.linkTarget`
3. Assign the menu to users/roles

## Practical Examples

### 1. Student Attendance System

**Scenario**: Teachers distribute printed QR codes for attendance tracking.

**Integrator Configuration**:
```json
{
  "code": "StudentAttendance",
  "createdEntityType": "EDAttendance",
  "creationType": "CreateAndUpdate",
  "entityFlow": "StudentAttendance",
  "finderQuery": "SELECT id FROM EDAttendance WHERE code = CONCAT('MA', {$user.code}, FORMAT(GETDATE(), 'yyyyMM'))",
  "successTempo": "{loop(attendances, last)}تم تسجيل حضور الطالب {attendances.student.name1}{endloop}\nإجمالي الحضور: {attendances.$size}"
}
```

**Entity Flow**:
```json
{
  "code": "StudentAttendance",
  "targetType": "EDAttendance",
  "targetAction": "Manual",
  "requiresCommitOnManual": true,
  "details": [{
    "className": "com.namasoft.infor.domainbase.util.actions.EAFieldsValuesCalculator",
    "parameter1": "code=sql(SELECT CONCAT('MA', {$user.code}, FORMAT(GETDATE(), 'yyyyMM')))\nbook=\"MA\"\nterm=\"STATT\"\nrunCommand=\"copyDimensionsFromBookOrGroup\"\nref1=$user.employee\nattendances=[addLines(1)]\nattendances=addedLinesOnly(attendances.student=$map.studentCode)\nattendances=addedLinesOnly(attendances.attend=\"true\")",
    "targetAction": "Manual"
  }]
}
```

**QR Generation in Report**:
```java
NamaRep.mobileQr()
    .code("StudentAttendance")
    .addParam("studentCode", $F{studentCode})
    .encrypted()
    .toString()
```


### 3. Customer Last Invoice Lookup

**Scenario**: Sales team scans customer card QR to view last invoice.

**Integrator Configuration**:
```json
{
  "code": "CustomerLastInvoice",
  "createdEntityType": "SalesInvoice",
  "creationType": "UpdateOnly",
  "entityFlow": "ViewOnly",
  "finderQuery": "SELECT TOP 1 id FROM SalesInvoice WHERE customer_id = (SELECT id FROM Customer WHERE code = {$map.customer}) ORDER BY valueDate DESC",
  "successTempo": "Last invoice: {code}\nDate: {valueDate}\nAmount: {money.netValue}\nStatus: {documentFileStatus}"
}
```


## Technical Implementation Details

### Server-Side Processing

1. **QR Parsing**: Decrypts (if needed) and parses JSON
2. **Integrator Lookup**: Finds MobileQRIntegrator by code/ID
3. **Entity Resolution**: 
   - For CreateOnly: Creates new entity
   - For UpdateOnly/CreateAndUpdate: Executes finder query
4. **Flow Execution**: Runs entity flow with parameters
5. **Auto-Commit**: Commits if requiresCommitOnManual is true
6. **Response Generation**: Renders successTempo against entity
