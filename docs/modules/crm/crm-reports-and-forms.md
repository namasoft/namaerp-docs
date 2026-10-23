---
description: "What reporting ships with CRM: the single customer visit printed form, no system reports or dashboards, and what to use instead."
---
# CRM Reports and Printed Forms

This is a short page, and the shortness is the point.

## What ships

**One printed form.** `SYSF-CRM001` prints a customer visit. That is the entire standard printing and reporting content of a ninety-six-screen module.

**No system reports.** There is no CRM report folder in the product — no pipeline report, no ticket ageing report, no contract expiry list, no machine service history, no maintenance revenue analysis. Not a reduced set: none.

**No dashboards.**

::: warning Plan for this before you go live
Sites regularly discover this during user-acceptance testing, after promising a sales manager a pipeline report and a service manager a monthly maintenance summary. Neither exists. Budget the reporting work as part of the implementation rather than assuming the module covers it.
:::

## What to use instead

You have four routes, and in practice most sites use all four.

**1. List views.** The fastest and most under-used option. Every screen's list view can be filtered, sorted, grouped and have its columns chosen, then saved as a named view and shared. For "show me every open ticket by technician" or "every contract ending in the next sixty days", a saved list view is usually the whole answer and takes minutes.

**2. Excel export.** Any list view exports. Where the module records data but never totals it — questionnaire answers, campaign costs, target-plan figures, competitor capture — exporting and pivoting is the intended path, and often the only one.

**3. BI.** For anything recurring or visual, the BI module reads CRM tables like any other. Sales pipeline movement, ticket volumes by type, maintenance revenue by machine type and contract renewal profiles are all straightforward BI subjects. If reporting matters to the customer, this is where the implementation effort belongs.

**4. Custom report definitions.** Where a genuine printed document is needed — a maintenance work order for a technician to carry, a service contract to hand a customer, an estimation to send for approval — a report is written for that site. Several such forms exist in the product repository for particular customers, which is a good sign of what is commonly needed, but they are per-customer deliverables and not something you can switch on.

## Printing individual documents

The absence of *forms* does not mean nothing can be printed. Any record can be printed through the standard print mechanism using a form defined for your installation. What the module does not give you is a ready-made, professionally laid out form for each document type — those are commissioned per site.

The one exception is the customer visit, which has a shipped form you can use immediately.

## A note on the maintenance suite

The maintenance half is where the gap is felt most, because it is the half that behaves like a trading operation — contracts, orders, invoices, stock movements and ledger entries — and therefore the half whose managers expect operational reports.

The data is all there and correctly structured; the machine record even carries a genuine service-history view showing every order, notice, contract and ownership transfer against it (see [The Machine File](/modules/crm/maintenance-setup/crm-machines)). What is missing is the layer that would summarise it across machines, contracts or periods. Plan for BI from the start on any maintenance implementation of meaningful size.
