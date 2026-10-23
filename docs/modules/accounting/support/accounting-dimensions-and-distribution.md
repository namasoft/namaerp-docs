---
description: "The dimensions carried on ledger lines (legal entity, sector, branch, department, analysis set and more), restricting dimensions per account, and Account Distribution for spreading a value across them."
entities: [AccDistribution]
menu: Accounting → Settings → Account Distribution
---

# Dimensions, Cost Centers & Distribution

An account answers "what" — cash, sales, salaries. **Dimensions** answer everything else: *which* branch, *which* department, *which* cost center, *which* project. They're the extra coordinates carried on every ledger line, and they're what turn a flat trial balance into reports you can slice by branch, by sector, by cost center. This page explains the dimension set as the ledger sees it, how accounts can restrict which dimensions they accept, and how **account distribution** spreads a value across them automatically. The five master files themselves — where a branch or a cost centre is created, and the composite dimension that stands for several at once — are in [Dimensions and Composite Dimensions](/platform/shared-master-files/dimensions-and-composite-dimensions).

## The dimension set

Every accounting line can carry a standard set of dimensions:

- **Legal Entity** — the company the line belongs to (in a multi-company database).
- **Sector**, **Branch**, **Department** — the organizational coordinates.
- **Analysis Set** — the free-form **cost-center tree** (`Basic > Dimensions > Analysis Set`). Unlike the fixed sector/branch/department, the analysis set is a tree you shape to your own cost-centre or project structure, so it's the most flexible dimension.
- **References 1–3** and a **record (entity dimension)** — extra hooks for finer analysis.

Alongside these, an account can carry up to **five subsidiary types** (customer, supplier, employee, etc.), so a single account can be analyzed by more than one kind of party.

## Restricting dimensions on an account

Not every account should accept every dimension. On the account itself you can tighten this:

- **restrict to the public dimension only** — the account only accepts the shared/public value of a dimension, not private ones,
- **don't use with the public dimension** — the opposite: the account refuses the public value,
- **mandatory reference / mandatory narration** — force the user to fill a reference or a narration on lines hitting this account.

These rules keep your analysis clean: a department-expense account can be made to *require* a department, a head-office account can be barred from department analysis entirely.

## Account distribution: spreading a value automatically

Sometimes one figure needs to be split across many dimensions — shared rent across all branches, a marketing cost across several departments. Rather than entering the split by hand every time, an **Account Distribution** rule (`Accounting > Settings > Account Distribution`) describes how to spread a value, and the system applies it.

A distribution rule sets, **for each dimension** (account, analysis set, branch, department, sector, references, subsidiary, record), how that dimension participates:

- a **policy** — **None** (don't distribute this dimension), **Distribute Public Only** (spread only the public value), or **Distribute Any** (spread across all values),
- an **order** (which dimension is distributed first), a **minimum undistributed value** (below which it won't bother splitting), and a **keep-and-invert** option,
- and for advanced cases, a **query** or **script** that computes the split dynamically.

The **distribution type** is either **Normal** or **Composite** (a distribution built up from other distributions). When several rule lines could apply, the **multi-distribute** setting decides which fire: **first matching only**, **all matching consecutively**, or **all matching consecutively considering order**.

Finally, a distribution can be driven by the **other side** of the entry — "distribute based on the other side's branch / department / sector / subsidiary…" — and narrowed with **other-side criteria**, so the split mirrors how the opposite side of the transaction was analyzed.

## For Support

- **"A line won't accept a department / analysis set"** — the account is restricted; check its dimension rules (**restrict to public only** / **don't use with public**).
- **"The system forces a reference or narration"** — that account has **mandatory reference / narration** turned on.
- **"A value isn't being split the way I expect"** — review the **Account Distribution** rule: each dimension's **policy**, its **order**, the **minimum undistributed value**, and the **multi-distribute** matching mode.
- **"The cost-center list is wrong"** — cost centers are the **Analysis Set** tree under `Basic > Dimensions`; fix it there.
- For where a document's *accounts* (not dimensions) come from, see [Document terms](./accounting-document-terms.md).
