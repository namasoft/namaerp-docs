---
description: "The document terms of the employee health insurance and car insurance documents: the accounts, tax and accounting switches each term carries, and what each health insurance document adds to their shared term layout."
entities: [EmployeeHealthInsurance, HealthInsuranceUpgrade, EmpHealthInsurDelete, HealthInsuranceClaimDoc, HealthInsuranceCredence, CarInsurancePolicy, CarInsuranceAddingDoc, CarInsuranceRemovingDoc, CarInsuranceInstallmentProofDoc]
menu: Basic → Settings → Document Term
---

# Insurance Document Terms

Two insurance products live in the HR module and they are not related to each other. **Employee
health insurance** — adding staff and their dependants to a medical policy, upgrading them, claiming
against it — needs the Gulf health-insurance licence (`humanresource-gulf-health-insurance`).
**Car insurance** — a fleet policy, cars added to and removed from it, and the instalments proved
against it — needs the car-insurance licence (`humanresource-car-insurance`).

What they have in common is that both genuinely have an accounting effect, both involve a third party who invoices you,
and both carry tax. Their terms are therefore the most account-heavy in the module after dues
liquidation.

The shared mechanics — what a term is, why most aggregated terms only name a book and a term, and
the three differently-named accounting switches — are on
[Salary and Dues Document Terms](/modules/hr/document-terms/hr-terms-salary-and-dues#How-HR-document-terms-work).

![The Effect tab of the Employee Health Insurance term](../../../ar/modules/hr/images/document-terms/hr-term-insurance-en.png)

## The health insurance terms

Four documents — the employee insurance itself, an upgrade, a deletion, and a credence — share one
long common shape, and each then adds a little of its own.

### What every health insurance term carries

**The main sides.** *Debit* and *Credit*, plus a second pair *Debit 2* `termConfig.debit2` and
*Credit 2* `termConfig.credit2` for splitting the entry, and a **covering** pair
(`termConfig.coveringDebit`, `termConfig.coveringCredit`) for the covering side of the arrangement.
Neither covering field carries a translated label, so both show their internal names on screen, as
does *first Discount Acc* `termConfig.firstDiscountAcc`.

**Tax.** *Tax Plan* `termConfig.taxPlan` names the plan; *Tax* `termConfig.tax` and *Tax 2*
`termConfig.tax2` are the sides it is recorded on; *Modifiable Tax* `termConfig.modifiableTax` lets a user
override the computed tax on the document; and *Tax After Discount* `termConfig.taxAfterDiscount`
decides whether tax is calculated on the gross or on the net after discount. The employee's own
share of tax has its own pair, *Employee Tax Debit* and *Employee Tax Credit*.

**Administrative fees.** Insurers charge a handling fee, and it is tracked separately: *Administrative
Fees Value Debit* / *Credit*, *Administrative Fees Tax Value Debit* / *Credit*, and its own
*Administrative Fees Tax Plan* `termConfig.administrativeFeesTaxPlan` — because the fee is often
taxed at a different rate from the premium.

**Two tolerances.**

| Option | Field | What it does |
|---|---|---|
| **Allow Empty Company** | `termConfig.allowEmptyCompany` | The insurance document may be saved without naming the insurance company. |
| **Allow Manual Insurance Without Insurance Offer** | `termConfig.allowManualInsuranceValues` | Values may be typed in directly instead of coming from an insurance offer. This is the term for insuring somebody outside the normal offer process. The shipped Arabic label misspells «التأمينات». |

**Always Generate Accounting Effects For Attendants** `termConfig.genAccountingEffectsForAttendants`
— dependants ("attendants") always produce their own accounting effect, rather than being folded
into the employee's.

### What each document adds

**The Health Insurance Upgrade term** is the interesting one. Upgrading somebody's insurance
category mid-year means reversing part of what was already booked, so it carries a whole second set
of sides for the **previous** arrangement: *Previous Insurance Category Debit* / *Credit* and
*Previous Insurance Value Debit* / *Credit*, plus *Refund Tax Debit* / *Credit* for the tax on the
refunded portion.

It also carries **Use Health Insurance Upgrade Document To Downgrade Employee Insurance**
`termConfig.useHealthInsuranceUpgradeDocToDowngradeEmpInsurance` — the same document, run in
reverse, moves an employee to a **cheaper** category. Without this the upgrade document only ever
goes up, and a downgrade has to be done by deleting and re-adding.

**The Health Insurance Delete term** adds *Do Not Override Value With Save*
`termConfig.doNotOverrideValueWithSave`: the refund value typed by the user is kept instead of being
recalculated every time the document is saved. Useful when the insurer has told you the exact refund
and it does not match what the system would compute.

**The Health Insurance Claim term** adds only a second pair of sides, *Debit 2* and *Credit 2*.
**The Health Insurance Credence term** adds nothing at all beyond the common shape.

Health insurance is on
[Employee Health Insurance](/modules/hr/health-insurance/employee-health-insurance).

## The car insurance terms

Four documents — the policy, a car added, a car removed, and an instalment proof — share a second
common shape. It looks like the health one but is not the same.

**The main sides**, *Debit* / *Credit* and *Debit 2* / *Credit 2*, plus a **discount** pair
(`termConfig.discountDebit`, `termConfig.discountCredit`) and a **fees** pair with its own tax pair:
*Fees Debit* / *Credit* and *Fees Taxes Debit* / *Credit*.

::: warning The fees labels are borrowed from another module
The Arabic labels on *Fees Debit* and *Fees Credit* read «مدين/دائن رسوم انهاء خطاب الضمان» —
letter-of-guarantee termination fees — which has nothing to do with car insurance. The fields work
correctly; only the caption was copied from elsewhere. Read them as the insurance fees.
:::

**Tax.** *Tax Plan* and *Modifiable Tax*, as on the health side.

**Cost and the daily rate.** *Calculate Day Cost From Value After Discount*
`termConfig.calculateDayCostFromValueAfterDiscount` decides whether the per-day cost of insuring a
car is derived from the gross premium or from the net after discount — which matters because that
daily figure is what gets charged when a car joins or leaves the policy part-way through the year.
*Use As Cost Source Document In Contracting* and the two *Contracting Cost* sides appear here too.

**The instalment proof chain.** Three fields work together:

| Option | Field | What it does |
|---|---|---|
| **Generate Insurance Installment Proof Document** | `termConfig.generateInsuranceInstallmentProofDoc` | Saving the document also creates the entry that proves the premium instalment is due. |
| **Proof Document Book** / **Proof Document Term** | `termConfig.proofDocBook`, `termConfig.proofDocTerm` | Where that proof document is filed and what accounting effect it has. |
| **Save Insurance Installment Proof Document As Draft** | `termConfig.saveInsuranceInstallmentProofDocAsDraft` | The proof is created as a draft, so somebody reviews it before it reaches the accounts. |

**Allow Adding Insurances Without Insurance Request or Insurance Offer**
`termConfig.allowAddingInsuranceWithoutRequestOrOffer` is the car-side equivalent of the health
side's manual tolerance: insurance may be added without a request or an offer behind it.

**The Car Insurance Adding term** adds one option of its own: *Allow Adding Car To Insurance If It
Found In Policy* `termConfig.allowAddingCarToInsuranceIfItFoundInPolicy` — a car already on the
policy may be added again. Normally that is a mistake, but it is legitimate when a car is re-added
after a mid-term removal.

**The Car Insurance Removing term**, **the Policy term** and **the Instalment Proof term** add
nothing of their own; everything they have comes from the common shape.

## Related pages

- **[Salary and Dues Document Terms](/modules/hr/document-terms/hr-terms-salary-and-dues)** — the
  shared mechanics and the money documents.
- **[Employment and Government Relations Document Terms](/modules/hr/document-terms/hr-terms-employment-and-government)**
- **[Employee Health Insurance](/modules/hr/health-insurance/employee-health-insurance)**
- **[Account Side Configuration](/platform/shared-master-files/accounting-side-config)** — how a debit or credit side
  finds its account.
