---
description: "How to score customers, suppliers, third parties and banks with Party Evaluation: defining evaluation elements with their weights, grouping them into element groups, and recording a party's evaluation."
entities: [PartyEvaluation, PartyEvaluationElement, PartyEvalElementGroup]
menu: Accounting → Party Evaluations → Party Evaluation
---

# Party Evaluation

Numbers tell you what a supplier charged or what a customer paid, but not whether they're *good* to work with: Did the supplier deliver on time? Is the bank responsive? Is the customer reliable? **Party evaluation** is a structured way to score the parties you deal with — customers, suppliers, third parties, banks — against criteria you define, and keep that judgment on record alongside the financial picture.

::: info Required license
Party evaluation is part of the core `accounting` license. Its screens are under **Accounting > Party Evaluations**. It's a qualitative tool — it has **no accounting effect**.
:::

## Defining what "good" means

You build the scorecard from two master files:

1. **Party Evaluation Element** (`Accounting > Party Evaluations > Party Evaluation Element`) — a single criterion you'll score on: "delivery punctuality", "quality", "responsiveness", "price competitiveness". Each element carries its **Target Of Evaluation** (Customer, Supplier, Third Party or Bank) and its **Default Weight** — the most points the criterion can earn. The weights are what make the score meaningful: punctuality might be worth 40 points, price 30, and so on.
2. **Party Evaluation Elements Group** (`Accounting > Party Evaluations > Party Evaluation Elements Group`) — a bundle of elements that makes up a complete scorecard for one **Target Of Evaluation**. Every element in the group must have the same target as the group; an element with a different target is refused with *Invalid element* — «عنصر غير صالح». The group lists the elements only; the weights stay on the elements.

![The Party Evaluation Elements Group screen](../../../ar/modules/accounting/images/partyeval/party-eval-group-en.png)

## Scoring a party

The **Party Evaluation** (`Accounting > Party Evaluations > Party Evaluation`) is the actual assessment. Its header names the **evaluated party**, the **evaluator** doing the scoring, and the **elements group** used as the scorecard. The **details** grid then lists each criterion with its **Max Weight** (the element's **Default Weight**, re-read from the element on every save), the **points** awarded, the resulting **percentage**, a free-text **finding**, and **remarks** — so the evaluation is both a number and a narrative.

![The Party Evaluation screen](../../../ar/modules/accounting/images/partyeval/party-evaluation-en.png)

Because evaluations carry the party and a date, you can keep a history per party and watch how a supplier's or customer's score trends over time.

## For Support

- **"There's no journal entry"** — correct; party evaluation is purely qualitative and never touches the ledger.
- **"The percentage looks wrong"** — it's the **points** awarded against the line's **Max Weight**, which is the **Default Weight** of the Party Evaluation Element; check both.
- **"The criteria list is empty"** — the evaluation pulls its lines from the chosen **elements group**; make sure the group has its elements listed. An element may appear only once in an evaluation.
- **"I want to compare a party over time"** — each evaluation is dated and tied to the party, so list them by party to see the trend.
