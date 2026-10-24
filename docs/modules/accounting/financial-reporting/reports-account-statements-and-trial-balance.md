---
description: "Which accounting system report answers which question: the chart of accounts, account and subsidiary statements, trial balances, account analysis, debt ages, voucher and entry statements, tax rebate analysis, and on-screen inquiries."
---
# Account Statements, Trial Balance & Analysis

Once transactions are recorded, the moment of questions arrives: What is this account's balance? What moved on this customer's subsidiary? Are my books balanced? The **account reports** family (`SYSR-ACC*`) answers that — ready-made system reports invoked from the reports menu. This page is their guide: what each report answers and its key parameters.

::: info Required license
These reports are part of the core `accounting` license.
:::

::: tip Financial statements have their own page
The formal financial statements (balance sheet, income statement, cash flow, `SYSR-FNS*`) aren't here — they're the output of the **financial-statements engine** and are documented with it. This page is for the ledger statements, trial balances, and analysis that aren't tied to a particular document type.
:::

## Chart of accounts

The **Accounts Chart** report (`SYSR-ACC001`) prints the full tree with its levels and classifications — a quick reference to your account structure (see [Chart of Accounts](../ledger-setup/chart-of-accounts.md)).

![Accounts Chart sample: each account with its parent, level, subsidiary type, natural side and currency](../../../ar/modules/accounting/images/reports/SYSR-ACC001-en.png)

## Account statements

An account statement shows an account's movements over a period with the **running balance** (locally, and in foreign currency when needed). The variants differ by level of detail and angle:

- **General account statement** (`SYSR-ACC002`, `ACC029`) and its variants: by currency (`ACC030`), in detail (`ACC035`), by second side (`ACC037`), by exchange rate (`ACC038`), with revise capability (`ACC039`), by capabilities (`ACC040`).
- **Subsidiary account statement** (`SYSR-ACC003`, `ACC031`) and **by currency** (`ACC032`) — to show a specific party's movements.
- **Detail account statement** (`SYSR-ACC004`, `ACC033`), **by analysis set** (`ACC021`), **by currency** (`ACC034`).

![General account statement sample](../../../ar/modules/accounting/images/reports/acc002-en.png)

::: details More samples: general, subsidiary and detail statements
**General account statement** (`SYSR-ACC029`) — the cash account for one month, grouped by safe:

![General account statement sample (SYSR-ACC029)](../../../ar/modules/accounting/images/reports/SYSR-ACC029-en.png)

**Subsidiary account statement** (`SYSR-ACC031`) — one customer's movements on the receivables account:

![Subsidiary account statement sample (SYSR-ACC031)](../../../ar/modules/accounting/images/reports/SYSR-ACC031-en.png)

**Subsidiary account statement in local and foreign currency** (`SYSR-ACC003`) — the same customer, with the transaction-currency and local columns side by side:

![Subsidiary account statement by currency sample (SYSR-ACC003)](../../../ar/modules/accounting/images/reports/SYSR-ACC003-en.png)

**Detail account statement** (`SYSR-ACC033`) — an expense account that carries no subsidiary:

![Detail account statement sample (SYSR-ACC033)](../../../ar/modules/accounting/images/reports/SYSR-ACC033-en.png)

**Detail account statement in local and foreign currency** (`SYSR-ACC004`):

![Detail account statement by currency sample (SYSR-ACC004)](../../../ar/modules/accounting/images/reports/SYSR-ACC004-en.png)
:::

The key parameters in these statements: date/period range, the account or subsidiary, currency, and dimensions (branch/sector/department). The running balance is computed by ordering movements chronologically.

## Trial balances

A trial balance summarizes account balances (debit/credit) to verify the books are balanced:

- **General trial balance** (`SYSR-ACC005`), by total balance (`ACC026`), by date (`ACC036`), and including subsidiaries (`ACC044`).
- **Subsidiary trial balance** (`SYSR-ACC006`), by total balance (`ACC027`), by date (`ACC042`).
- **Trial balance with account category** (`SYSR-ACC007`) — the balances grouped under the account categories, with a range of categories and a level limit as parameters.

![Trial balance sample](../../../ar/modules/accounting/images/reports/acc005-en.png)

::: details More samples: subsidiary trial balance and trial balance with account category
**Subsidiary trial balance** (`SYSR-ACC006`) — every customer on the receivables account, with the balance before the period, the movement and the closing balance:

![Subsidiary trial balance sample (SYSR-ACC006)](../../../ar/modules/accounting/images/reports/SYSR-ACC006-en.png)

**Trial balance with account category** (`SYSR-ACC007`):

![Trial balance with account category sample (SYSR-ACC007)](../../../ar/modules/accounting/images/reports/SYSR-ACC007-en.png)
:::

## Account analysis

- **Accounts analysis monthly** (`SYSR-ACC012`) — distributing account balances across the year's months.
- **Accounts analysis by branch** (`SYSR-ACC013`) and **by branch and sector** (`SYSR-ACC028`).

![Accounts analysis monthly sample (SYSR-ACC012): one column per month, with quarter subtotals](../../../ar/modules/accounting/images/reports/SYSR-ACC012-en.png)

## Debt ages

These reports reveal how aged receivables are (they rely on the **Track Debt Ages** flag on the account — see [Accounts](../ledger-setup/accounts.md)):

- **Debt ages** (`SYSR-ACC024`), its document details (`ACC025`), **by invoice** (`ACC045`), and **all manual debt lines** (`ACC041`).

::: warning Copying one of these into a custom report?
The outstanding amount at the report's date is rebuilt from the dated matches every time — it is never
read from the item's stored remaining figure, which carries no date and describes today only. Keep that
part of the query when you adapt one of these reports, or the aging will be wrong at any date but
today: see [writing your own aging report](/modules/accounting/money-in-and-out/aging-allocation#Writing-your-own-aging-report-read-the-matches-not-the-remaining-figures).
:::

![Debt ages by invoice sample](../../../ar/modules/accounting/images/reports/acc045-en.png)

## Voucher and entry statements

Statements dedicated to receipt/payment and journal documents (also linked from the [Receipt & payment vouchers](../money-in-and-out/receipts-and-payments.md) and [Journal entries](../ledger-setup/journal-entries.md) pages):

- **Receipt voucher requests** statement (`SYSR-ACC015`), **receipt vouchers** (`ACC016`, `ACC046`).
- **Payment voucher requests** statement (`SYSR-ACC017`), **payment vouchers** (`ACC018`, `ACC047`).
- **Journal entries** statement (`SYSR-ACC019`).

::: details Samples: request, voucher and journal statements
**Receipt voucher requests** (`SYSR-ACC015`):

![Receipt voucher requests statement sample (SYSR-ACC015)](../../../ar/modules/accounting/images/reports/SYSR-ACC015-en.png)

**Receipt vouchers** (`SYSR-ACC016`):

![Receipt vouchers statement sample (SYSR-ACC016)](../../../ar/modules/accounting/images/reports/SYSR-ACC016-en.png)

**Payment voucher requests** (`SYSR-ACC017`):

![Payment voucher requests statement sample (SYSR-ACC017)](../../../ar/modules/accounting/images/reports/SYSR-ACC017-en.png)

**Payment vouchers** (`SYSR-ACC018`):

![Payment vouchers statement sample (SYSR-ACC018)](../../../ar/modules/accounting/images/reports/SYSR-ACC018-en.png)

**Journal entries** (`SYSR-ACC019`) — every ledger line of the documents in the date range, with its account, subsidiary and narration:

![Journal entries statement sample (SYSR-ACC019)](../../../ar/modules/accounting/images/reports/SYSR-ACC019-en.png)
:::

## Tax rebate analysis

**Tax rebate analysis** (`SYSR-ACC014`) for tax-claim and refund purposes.

## Ledger transaction form

The **Ledger Trans Form** (`SYSR-ACC048`) prints the single accounting movement with its details.

![Ledger transaction form sample](../../../ar/modules/accounting/images/reports/acc048-en.png)

## On-screen inquiries

Beyond the printed reports, there are **live inquiries** on screen that need no printing: the **Ledger Transactions** list and the account/dimension balance screens. You browse them directly on screen for a real-time view of balances.

## For Support

- **"The report balance doesn't match expectations"** — check the date/period range and the selected dimensions; most discrepancies are caused by an unintended filter.
- **"An account doesn't appear in debt ages"** — the **Track Debt Ages** flag isn't enabled on the account.
- **"The foreign-currency balance isn't shown"** — use the appropriate **by currency** statement variant (`ACC030`/`ACC032`/`ACC034`).
