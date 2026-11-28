---
title: EAUpdateExtractsEffectsOnPaymentDocs
module: contracting
entities: [EntityFlow]
---

<div class='entity-flows'>

# EAUpdateExtractsEffectsOnPaymentDocs

## Overview

Automatically synchronizes payment transaction records when contracting extract documents are saved. Ensures payment amounts are correctly calculated across all related payment documents.

## When This Action Runs

- **Trigger:** The event chosen in **Target Action** on the flow line. An extract already runs this same recalculation by itself every time it is saved, so the flow is only needed to repeat it on demand, for example from a manual run
- **Target:** Project extracts and contractor extracts whose condition lines point to payment documents
- **Purpose:** Synchronize payment calculations with extract conditions
- **Parameters:** None

## How It Works

1. **Creates transaction entries** linking extract conditions to payment documents
2. **Recalculates payment balances** for all affected payment documents
3. **Validates payment limits** to prevent negative remaining values
4. **Synchronizes database** by removing old entries and saving new ones

## Database Tables Affected

### ContPaymentTransactionEntry
- **Purpose:** Links extract conditions to payment documents
- **Key Fields:** `paymentDoc`, `extractDoc`, `conditionValueAfterTax`, `termCode`

### ContractingPaymentRootEntry
- **Purpose:** Stores calculated totals for each payment term
- **Key Fields:** `paymentDoc`, `termCode`, `dueValue`, `paidValue`, `remainingValue`

## Business Logic Flow

### Transaction Entry Creation
```sql
-- Links extract conditions to payment documents
INSERT INTO ContPaymentTransactionEntry (
    extractDocId, paymentDocId, conditionValueAfterTax, termCode
) VALUES (@extractId, @paymentDocId, @conditionAmount, @termCode)
```

### Payment Calculation Update
```sql
-- Calculate total paid amount per term from all extracts
SELECT cpt.paymentDocId, cpt.termCode, SUM(cpt.conditionValueAfterTax) AS totalPaid
FROM ContPaymentTransactionEntry cpt
WHERE cpt.paymentDocId = @paymentDocId
GROUP BY cpt.paymentDocId, cpt.termCode
```

## Validation Rules

### Payment Limit Validation
- **Rule:** No payment term can have negative remaining balance
- **Exception:** An advance payment document whose term has **Allow Negative Remaining** ticked bypasses the check
- **Error:** *Term Code {0} remaining value is {1} is negative in document {2}* — «كود البند {0} المتبقي {1} سالب في المستند {2}»

### Final Extract Validation
- **Rule:** Final extracts must not leave remaining balances
- **Error:** *The payment {0} for the contract {1} still has a remaining {2}* — «مستند الدفع {0} للعقد {1} لا يزال متبقي مبلغ {2} فيه»

### Term Code Restrictions
- **Rule:** A term code that already has transactions cannot be changed or removed from its payment document. This check runs when the payment document itself is saved, not in this flow
- **Error:** *Document {0} you can not change or remove term code {1} because it has {2} transactions* — «المستند {0} لا يمكن تغيير أو حذف كود البند {1} لأنه له {2} عدد حركات»

## Related Actions

- **Payment Document Processing** - Updates individual payment totals
- **Extract Deletion Cleanup** - Removes transaction entries when extracts deleted
- **Contract Finalization** - Validates payment obligations completion

**Module:** contracting

**Full Class Name:** `com.namasoft.modules.contracting.domain.utils.EAUpdateExtractsEffectsOnPaymentDocs`

</div>

