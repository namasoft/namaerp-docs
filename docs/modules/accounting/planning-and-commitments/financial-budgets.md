---
entities: [FinancialBudget, BudgetScenario]
menu: Budgets → Budgets → Financial Budget
---

# Financial Budgets

A budget is a plan with teeth: you decide up front how much each account may spend (or should earn) over a period, and then — if you want — the system holds your documents to that plan, warning or even blocking spending that would blow past it. Nama's **financial budgets** let you set those targets per account, per period, and per dimension, and then validate actual activity against them.

::: info Required license
Financial budgets are part of the `accounting-budget` license, and live under the **Budgets** menu root.
:::

## Building a budget

The **Financial Budget** (`Budgets > Budgets > Financial Budget`) is the plan document. It always belongs to a **Scenario**, and the scenario names the **Budget Year** and up to four earlier years to compare against (**Fiscal Year 1**, **Fiscal Year 2**, **Fiscal Year 3** and **Previous Year**). Each **details** line targets one **account** (or an **accounts chart** node) and carries its plan for the budget year in **Predicted Value**. Beside it the line shows the history the plan was built from: **Year 1**, **Year 2**, **Year 3** and **Year 4** hold the account's actual movement in the scenario's four earlier years, each with a **Change Percentage** against the year before, and **Actual Value** holds the budget year's own actual so far and cannot be typed into. **Predicted Value** has its own **Change Percentage** against Year 4: type the percentage and the value is calculated from Year 4, type the value and the percentage follows. The Year 1 to Year 4 figures can be typed over only where Global Configuration allows it (**Allow changing in budget year 1 values** … **year 4 values**). When **Calculate Financial Budget Credit Debit Values** is on in the accounting configuration, each of those figures also shows its **Debit** and **Credit**.

Every line is scoped by the **dimensions** that matter to you — sector, branch, department, analysis set, subsidiary, a record (entity dimension), references 1–3 — and by a **fiscal period** of the scenario's budget year; the legal entity is the document's. A **To Fiscal Period** column, for a period range, appears when **Use To Period In Financial and Sales Budgets** is on in Global Configuration. So "marketing department, branch Riyadh, this year: 500,000" is a single, precise budget line.

![The Financial Budget screen](../../../ar/modules/accounting/images/budgets/financial-budget-en.png)

You can keep several budgets as **scenarios** (`Budgets > Master Files > Budget Scenario`) — an optimistic plan, a conservative one — and each budget names the scenario it belongs to.

## Turning a budget into a control

A budget only constrains spending if you tell it to. The switch is **Use This Budget For Validation and Approvals** on the budget header; saving the budget copies it to every line. A scenario with **Use Scenario Budgets For Validation and Approvals** ticked switches it on for every budget saved under it. Once a budget is marked for validation, the system checks documents that hit its accounts against the line's **Predicted Value**.

When **Use From Date And To Date In Budget Validation And Approval** is on in the accounting configuration, each line also carries a **Validate From Date** and a **Validate To Date**, both required on a validation budget. A line then applies to documents whose value date falls inside that window, instead of being matched by fiscal year.

**What happens on an overrun is decided per account**, by the account's **Budget Exceeded Behavior** (see [Budget control on the account](../ledger-setup/accounts.md#Budget-control-on-the-account)):

- **Prevent Saving** — the document is blocked outright.
- **Request Approval** — the over-budget document is routed for **approval**, so an authorized user can let it through.

Two switches in the accounting configuration (see the [Accounting configuration](../support/accounting-configuration.md) catalog) unlock those choices: an account cannot be saved with **Prevent Saving** (or with **Prevent Save If No Budget Was Found For The Account**) until **Enable Prevent Saving For Budgets** (`value.enablePreventSavingForBudgets`) is on, nor with **Request Approval** until **Enable Approvals For Budgets** (`value.enableApprovalsForBudgets`) is on. An account left on **Allow** is never stopped — its budget is informational only, tracked and reportable.

Only movement that grows the account on its **natural side** is checked — a debit on a debit account, a credit on a credit account — and only against budget lines that are saved, not drafts, and have **Use This Budget For Validation and Approvals** ticked. If no such line matches, the budget total is zero and the document passes, unless the account has **Prevent Save If No Budget Was Found For The Account** ticked.

### Matching the right budget line

When it validates, the system needs to know *which* budget line a document maps to. A line always has to match the document's account and legal entity, and its fiscal year unless the Validate From Date / Validate To Date window above is in use. On top of that, the **Budget Validation Options** include a set of **"consider…"** toggles — consider sector, branch, department, analysis set, subsidiary, record (entity dimension), references 1–3, and fiscal period (`value.budgetValidationOptions.considerSector`, `…considerBranch`, `…considerDepartment`, `…considerAnalysisSet`, `…considerSubsidiary`, `…considerEntityDimension`, `…considerRef1` – `…considerRef3`, `…considerFiscalPeriod`) — that define how precisely actuals are matched to budget lines. Turn on the dimensions you budget by; leave off the ones you don't, so the match isn't too narrow to find its line.

## Actions on this screen

The history columns are not typed by hand — two buttons read them from the ledger once the lines name their accounts and dimensions:

- **Calculate Values** — for every line, reads the account's actual movement, narrowed by the line's subsidiary, dimensions, references and fiscal period, for the scenario's four earlier years and for the budget year. It fills **Year 1** to **Year 4** and **Actual Value** with the result and recalculates the change percentages. **Predicted Value** stays as you entered it.
- **Calculate Current Year Values** — the narrower version: it refreshes only **Actual Value**, the budget year's own actual, and leaves Year 1 to Year 4 alone.

With **Calculate By Inputting** ticked on the header, the same calculation runs for a line as soon as you choose its account, accounts chart, fiscal period, dimensions, record or references, without pressing a button.

Both act on the **details** grid, so add and scope your lines first, then press.

## For Support

- **"My budget isn't stopping anything"** — three things must line up: the budget line is saved and marked **Use This Budget For Validation and Approvals**, the account's **Budget Exceeded Behavior** is **Prevent Saving** or **Request Approval**, and the document moves the account on its natural side. Otherwise the budget is informational only.
- **"A document was blocked / sent for approval unexpectedly"** — it hit an account that has a validation budget and would exceed it; check the budget figure and the document's amount and dimensions.
- **"The system can't find the matching budget line"** — review the **consider…** toggles in the Budget Validation Options; if you budget by branch but "consider branch" is off (or vice-versa), the actual won't match the line.
- **"I want to compare plans"** — keep each plan as a separate **Budget Scenario** and tag its budget accordingly.

## Messages you may see

The refusals a document meets when it overruns a budget — *The account {0} has a budget {1}, and this document will exceed the budget because it will it make the balance {2}* and the approval-definition ones — are listed with the setting behind each under [Budget control on the account](../ledger-setup/accounts.md#Budget-control-on-the-account). The ones below come from setting budgets up.

| Message | Why | What to do |
|---|---|---|
| *The account {0} does not have a budget* — «لم يتم عمل موازنة للحساب {0}» | The account has **Prevent Save If No Budget Was Found For The Account** ticked, and no saved budget line marked **Use This Budget For Validation and Approvals** matches this document's account, dimensions and period. | Add a budget line for that account and dimension mix, or check the **consider…** toggles: every dimension they switch on must match exactly, empty included, so with **Consider Department** on, a line with no department is not found for a document that names one. |
| *You must enable the option {0} in accounting configuration to be able to use prevent saving when budget is exceeded* — «يتوجب عليك تفعيل الأوبشن {0} في إعدادات الحسابات لتتمكن من تفعيل منع الحفظ عند تخطي الموازنات» | The account is being saved with **Budget Exceeded Behavior** = **Prevent Saving** while **Enable Prevent Saving For Budgets** is off. | Turn the option on in the accounting configuration, then save the account again. |
| *You must enable the option {0} in accounting configuration to be able to use prevent saving if no budget was found* | The same, for **Prevent Save If No Budget Was Found For The Account** — it is unlocked by the same option. | As above. The message has no Arabic translation and appears in English on Arabic screens. |
| *You must enable the option {0} in accounting configuration to be able to use request approval when budget is exceeded* — «يتوجب عليك تفعيل الأوبشن {0} في إعدادات الحسابات لتتمكن من تفعيل طلب الموافقة عند تخطي الموازنات» | The account is being saved with **Request Approval** while **Enable Approvals For Budgets** is off. | Turn the option on, then save the account again. |
| *You can not enable replication and use request approval when budget is exceeded at the same time* — «لا يمكنك تفعيل الريبليكشن و طلب الموافقة عند تخطي الموازنات في نفس الوقت» | The installation runs Replication, and **Request Approval** on an account is not allowed there. | Use **Prevent Saving** on that account instead. |
| *This Period is not in the scenario periods* — «هذه الفترة ليست من فترات السيناريو» | A budget line's **Fiscal Period** is not one of the **Budget Year Period** values in the scenario's **Actual Sources** grid. | Pick a period the scenario lists, or add the period to the scenario. |
| *From Date {0} can not be after to date {1} at line number {2}* — «من تاريخ {0} لا يمكن أن يكون بعد إلى تاريخ {1} في السطر رقم {2}» | On a validation budget, a line's **Validate To Date** is earlier than its **Validate From Date**. | Correct the two dates on that line. |
