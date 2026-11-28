---
description: "Recording manual entries with the Journal Entry: header, lines, balancing and the difference account, and cost allocation, plus the Currency Diff Journal, the Exchange Rate Update and the Inter-Company Transfer."
entities: [JournalEntry, CurrencyDiffJournal, ExchangeRateUpdate, InterCompanyTransfer]
menu: Accounting → Documents → Journal Entry
---

# Journal Entries & Adjustments

Most entries in Nama are generated automatically from other documents (an invoice, a stock issue, a payroll run...), but there's always a need to record **manual** entries: an adjustment, a petty expense, an opening balance, clearing a suspense account. That's the job of the **Journal Entry**. Alongside it are specialized entry documents that handle particular cases: the **Currency Diff Journal**, the **Exchange Rate Update**, and the **Inter-Company Transfer**.

::: info Required license
The journal entry, currency-difference journal, and inter-company transfer are part of the core `accounting` license. The **Exchange Rate Update**, however, is a feature within the banks license `accounting-banks`.
:::

## The Journal Entry

The journal entry (`Accounting > Documents > Journal Entry`) is the balanced document where you enter the debit and credit lines yourself — with the condition that total debit equals total credit before the system will accept it.

![The Journal Entry screen](../../../ar/modules/accounting/images/journal/journal-entry-en.png)

### Document header

In the header you set:

- **Term** — the document term (`توجيه`) that governs the entry's behavior and where its special accounts (such as the difference account) come from. Term details are in the [Document terms](../support/accounting-document-terms.md) reference.
- **Document Code** and **Issue Date** — the book with the serial number, and the date the document was issued.
- **Value Date** — the accounting date the effect is recorded under (which determines the period), and may differ from the issue date.
- **Fiscal Period** — the accounting period the value date falls in; the system sets it automatically, and if it's closed the save is rejected.
- **Narration** and **dimensions** (legal entity, branch, sector, department, analysis set) at the document level.

### Detail lines

In the **Details** grid each line carries:

- **Account** and **Subsidiary** (the party, if the account is of subsidiary type).
- **Debit Amount** or **Credit Amount** — the line's value on its side, in the line's currency, with the corresponding **local** value shown after translation at the exchange rate.
- **Narration**, **Narration 2**, and line dimensions (sector, branch, department, analysis set, entity dimension) for whoever needs finer detail than the document header.
- Tax fields (tax 1 and 2 percentage and value) appear when the options that add them to the journal entry are ticked in [Accounting configuration](../support/accounting-configuration.md), linking the manual entry to its tax effect.

### Balancing and the difference account

At the bottom of the screen the **Totals** show: **Debit Only** (total debit), **Credit Only** (total credit), and **Total Difference**, all in local currency. An entry whose difference is larger than the global configuration's **Ignored margin when comparing fractions** is unbalanced and is refused with *Transaction is not balanced, difference is  {0}* — «المستند غير موزون. الفرق {0}». The term can balance the entry for you: with **Add Line In The End Of The Document With Difference Between Debit And Credit On Save** ticked and **The Mediator Account Used To Handle Difference Between Debit And Credit** filled, saving an entry whose difference exceeds that margin adds one line for the whole difference on that account.

### Cost allocation

The **Cost Allocation** grid is part of the Contracting module: it appears on the journal entry only when that module is installed, and each line charges a cost to a project contract and one of its terms.

## Currency Diff Journal

The **Currency Diff Journal** (`Accounting > Documents > Currency Diff Journal`) is a journal entry you enter by hand to record the differences arising from exchange-rate fluctuations on foreign-currency balances. It differs from an ordinary journal entry in one way: the **local** amount you type on a line is kept as it is, not recalculated from the amount and the rate, so a line can change an account's local balance and leave its foreign-currency balance untouched. The **Exchange Rate Update** (see below) does the same job in bulk and records its own entry; it does not create Currency Diff Journal documents.

## Exchange Rate Update

When currency rates change, your foreign-currency balances need **revaluation** at the new rate. The **Exchange Rate Update** (`Accounting > Documents > Exchange Rate Update`) does this in one batch: you specify the **account** (or a range of accounts), the **currency**, the new **exchange rate**, and the **mediator account** where revaluation differences are recorded; the system computes the difference for each balance and records it, against the mediator account, as the document's own accounting entry.

This document revalues balances you already hold. The day-to-day rates that new documents pick up are entered on a different screen, **Exchange Rate** — see [Currencies and exchange rates](../../../platform/shared-master-files/currencies-and-exchange-rates.md).

::: warning
Accounts with **Do Not Automatically Include In Exchange Rate Update** enabled (see [Accounts](./accounts.md)) are left out when the update does not name an account. Naming such an account on the update still revalues it. This is a feature within the banks license `accounting-banks`.
:::

## Inter-Company Transfer

When transferring value between two companies in the same group, the **Inter Company Transfer** (`Accounting > Documents > Inter Company Transfer`) records both sides in one step: it generates a **journal entry** in the first company and a matching one in the second, so the "inter-company current" accounts stay in sync without double manual entry. The lines must include the document's own legal entity, or the save is refused with *Must use legal entity {0} in the document* — «يجب استخدام الشركة {0} في المستند», and must carry exactly two legal entities, or it is refused with *This document must be on 2 legal entities* — «هذا المستند يجب أن يطبق على شركتين». The accounting configuration option **Allow Transfer Between More Than Two Companies Inside InterCompany Transfer** lifts the limit, and one journal entry is then generated per company.

Each line names the legal entity it belongs to. Each company's journal is balanced on the **other** company's **Mediator account**, taken from that company's Legal Entity record. The head office's journal therefore carries Egypt's mediator account, and Egypt's carries the head office's. Flag the mediator accounts **Intercompany** so the [consolidated statements](../financial-reporting/consolidated-statements.md) eliminate them.

### Between companies with different currencies

The transfer also works between companies whose ledgers keep different currencies, for example a head office in US dollars and a subsidiary in Egyptian pounds. Three things differ from a same-currency transfer:

- **One currency on every line.** All lines must use the same transaction currency. Otherwise the save is refused with *An inter-company transfer between companies with different currencies must use one currency on all lines* — «التحويل بين شركات بعملات مختلفة يجب أن يستخدم عملة واحدة في جميع السطور».
- **Each company's own rate.** A line of another company is always converted at that company's own exchange rate on the document's value date, so its local amount is in that company's currency; a rate typed on such a line is replaced when the document is saved. If that company has no rate for the currency on that date, the document cannot be committed:
  *Legal entity {0} has no exchange rate for {1} on {2}* — «لا يوجد سعر صرف للعملة {1} في الشركة {0} بتاريخ {2}».
- **The same amount on both mediator accounts.** The balancing line on the mediator account is in that account's own currency when it has one, otherwise in the transfer's currency. Both companies' mediator accounts then hold the same amount.

So when Egypt sends USD 10,000 to the head office, Egypt books USD 10,000 at its own dollar rate, in pounds. The head office books USD 10,000 at rate 1. Both mediator accounts hold USD 10,000, and the consolidated reports eliminate them exactly.

## Actions on this screen

Three buttons carry most of the day-to-day work on these documents.

On the **journal entry**:

- **Reverse Document** — the answer to "this entry was wrong and the period is already closed to editing". It opens a **new, unsaved** entry that copies the original line for line with debit and credit swapped, so saving it cancels the original's effect instead of erasing history. The original must be saved first, and the reversal is an ordinary entry: you choose its own value date, period and book before saving.
- **Delete Empty Lines** — sweeps out every detail line whose debit and credit are both zero or blank. Handy after pasting or importing lines, where blank rows come along for the ride and the entry then refuses to balance cleanly.

On the **Exchange Rate Update**:

- **Preview Results** — computes the revaluation and fills the document's lines with what *would* be recorded for each balance at the new rate, so you can inspect the differences before committing. Run it after setting the account (or account range), currency, new rate and mediator account; the document must be saved first.

## Reports and forms

- Entry and daily-movement statements (`SYSR-ACC` journal statements) are covered on the [Account statements & trial balance](../financial-reporting/reports-account-statements-and-trial-balance.md) page.
- The printed form for the journal entry is `SYSF-ACC001`, for the currency-difference journal `SYSF-ACC008`, and for the inter-company transfer `SYSF-ACC007`.

## In practice

- Manual entries never go away. Nearly every company issues journal entries even though most of its ledger comes from other documents: a typical company issues several hundred a year, and the busiest tenth more than 3,000.
- Year-end sits next to them. About 2 in 5 companies that issue journal entries also close the year with a **Closing Entry**, which generates its own balancing journal entry (see [Year-end & period control](./year-end-and-period-control.md)).
- The **Exchange Rate Update** is used by about 1 in 6 companies, those whose foreign-currency balances need revaluing. They typically run it about once a month, so around a dozen a year.
- The **Inter-Company Transfer** is used by about 1 in 20 companies, those that keep several companies of a group in one database. Where it is used it is routine work, typically more than a hundred transfers a year.

## For Support

- **"The entry won't save — unbalanced"** — check the **Total Difference**; it must not exceed the global configuration's **Ignored margin when comparing fractions**. To have the system add the balancing line, tick **Add Line In The End Of The Document With Difference Between Debit And Credit On Save** and fill the difference account in the term.
- **"Save rejected because of the period"** — the value date falls in a **closed** period or no period covers it; see [Year-end & period control](./year-end-and-period-control.md).
- **"Tax fields don't appear on the entry"** — the tax features aren't enabled in the [Accounting configuration](../support/accounting-configuration.md) catalog.
- **"Where does the difference account / the term's accounts come from?"** — from the **document term**; details in the [Document terms](../support/accounting-document-terms.md) reference.
- How a document turns into an accounting effect and how to reprocess a stuck entry are in [How documents are processed into accounting effects](../support/accounting-request-processing.md).
