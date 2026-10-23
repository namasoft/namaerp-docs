---
description: "The Finance Company and Car Installment Program master files and the financing block on the car sales order: lender, rate and fees used to quote monthly instalments for a car."
entities: [SIInstallmentProgram, FinanceCompany, SISalesOrder]
---
# Finance Companies and Instalment Programmes

::: info Required licence
`srvcenter-insurance-and-installments`. The **cars** menu root that contains this folder is itself gated on `srvcenter-subitems`, so in practice both codes are needed before the Car Installment menu appears at all.
:::

Most of Al-Sahra's customers do not pay 87,000 in cash. They walk in asking what a Rimal 2.4 costs *a month*, and the salesperson needs an answer before the conversation goes any further. **cars → Car Installment** exists to support that conversation.

Two master files and one document live here:

| Record | Arabic | What it is |
|---|---|---|
| **Finance Company** | شركة تقسيط | The lender's master file |
| **Car Installment Program** | برنامج تقسيط سيارة | The financing product: rate and fees |
| **Car Installment Quotation** | عرض سعر تقسيط سيارة | The offer sheet given to the customer — see [its own page](/modules/servicecenter/car-installments/car-installment-quotation.md) |

## The finance company file

The Finance Company record is the same screen and the same field list as the Insurance Company and the External Agency — a **Main** page with the code, names, subsidiary accounts and dimensions, and a **Contact Info** page with contact details, tax data and a bank block.

The **subsidiary account** (*الذمة*) makes the lender addressable in accounting.

![The Finance Company screen](../../../ar/modules/servicecenter/images/car-installments/sc-finance-company-en.png)

Al-Sahra creates `FIN-03` **Bayan Finance** / *بيان للتمويل*.

You pick a finance company on an instalment quotation line and in the financing block of a car sales order, so that the paperwork names the right lender.

## The instalment programme

An instalment programme is a lender's product: *Bayan Finance will finance cars for employed customers over one to five years at 6 % flat, with a 2 % administration fee and a minimum 20 % down payment.* You create one record per lender per product.

![The Instalment Programme screen](../../../ar/modules/servicecenter/images/car-installments/sc-car-installment-program-en.png)

### The fields a quotation reads

Two fields on the programme drive the quotation:

- **Financing Percent** (*نسبه التمويل* — the label is spelled this way on screen) — the annual flat rate, used to work out the monthly instalment on a quotation.
- **Admin Fees** (*مصاريف إدارية*) — the fixed amount the quotation charges as its administrative fee.

The two long-text blocks, **Customer Acceptance Conditions** (*شروط قبول العميل*) and **General Conditions** (*شروط عامة*), hold the lender's wording for the offer.

## The financing block on the car sales order

When the sale is actually agreed, the financing details are re-entered on the [**car sales order**](/modules/servicecenter/car-sales/car-sales-order.md), in a block that records the instalment programme, the finance company, the financing bank, the insurance company and the insured name.

The **Reservation Value** (*قيمة الحجز*) in that block drives the sales order's booking-deposit entry against the reservation-value accounts on [its document term](/modules/servicecenter/document-terms/servicecenter-terms-cars-and-other.md).

If you need to hold a car until the bank replies, model it with the vehicle's own [status configuration](/modules/servicecenter/cars-setup/car-status-configurations.md) or an approval cycle on the sales order.

The insurance side of the block saves typing: when you create an insurance policy and point it at this sales order, the policy takes its financing bank, insurance company and insured name from here. That is described on [the policy record page](/modules/servicecenter/car-insurance/car-insurance-policy.md).
