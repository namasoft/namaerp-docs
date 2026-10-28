---
entities: [DocumentTerm]
menu: Basic → Settings → Document Term
---
# Terms for Depreciation, Value Changes and Disposal

These are the terms that decide what the ledger sees while an asset is in service, and what it sees on
the day the asset leaves. They divide neatly: the depreciation side is almost entirely automatic and
needs very little from you, while the disposal side needs real decisions about where a gain and a loss
should land.

Read [how terms work](/modules/fixedassets/document-terms/fixedassets-terms-basics.md) first if you have
not — the account slots on the asset, described there, are the accounts most of these documents record their entries on.

## The Depreciation Term

The depreciation term is the shortest term screen in the module, and the reason is worth stating
plainly: **you cannot configure the depreciation accounts, because they are not the term's to give.**

Every period, the depreciation run debits each asset's **depreciation account** (`حساب الإهلاك`, the
Account 01 slot of its accounts bag) and credits its **accumulated depreciation account**
(`حساب الإهلاك التراكمي`, the Account 02 slot). Both come from the asset, which normally inherited them
from its [asset type](/modules/fixedassets/master-files/fixedassets-asset-types.md). Change the type's
accounts and every asset of that type follows; there is no term in between.

When `MCH-0007` is depreciated for January 2026, the instalment is 3,600 and the entry is simply:

| | Debit | Credit |
|---|---|---|
| Depreciation expense — `MCH-0007`'s Account 01 | 3,600 | |
| Accumulated depreciation — `MCH-0007`'s Account 02 | | 3,600 |

What the term *does* contribute to that entry is its wording — the narration templates and queries that
compose the description on each ledger line — and the source of the analysis set, set in its Debit
(`termConfig.config.debit`) and Credit (`termConfig.config.credit`) groups, which show only those fields. Those are worth
setting: a depreciation run touches hundreds of lines a month and a good narration template is the
difference between a readable ledger and a wall of identical rows.

Beyond that, the term carries three behaviour switches:

| Option | Field id | What it does |
|---|---|---|
| Allow a depreciation document dated before existing addition, deduction, transfer and partial-disposal documents | `termConfig.allowFADepBefAddDedPartial` | Relaxes the ordering rule so you can catch up on a missed month even though later documents already touched the asset |
| Use As Cost Source Document In Contracting (`إستخدام المستند كمصدر تكلفة في المقاولات`) | `termConfig.useAsSourceCostDoc` | Makes each period's depreciation feed the contracting cost of the project the asset is allocated to |
| Calculate Contracting Cost Debit And Credit From Asset If Found (`حساب مدين ودائن تكلفة المقاولات من الاصل الثابت إن وجد`) | `termConfig.calculateContractingCostDebitAndCreditFromAssetIfFound` | Takes the contracting cost accounts from the asset instead of the term, when the asset carries them |

The last two work with the **Contracting Cost Debit** (`termConfig.contractingCostDebit`) and **Contracting Cost
Credit** (`termConfig.contractingCostCredit`) fields on the same page, which name the accounts the contracting entry uses when the asset does not supply them.

### The aggregated depreciation term

The aggregated document does not book anything itself — it produces one ordinary depreciation document
per batch, and those do the booking. So its term has exactly one job: naming the **book and term the
generated depreciation documents should use** (`termConfig.aggrFADepreciationBook`, `termConfig.aggrFADepreciationTerm`). Point it at the depreciation term you configured above.

## The Revaluation Term

Revaluation is where the asset's carrying amount is restated to an appraised value, and unlike
depreciation, that produces a difference somebody has to own. The term is where you say who:

| Group | Field id | What it is for |
|---|---|---|
| Profit Config (`حساب المكسب`) | `termConfig.profitConfig` | The account that takes an upward revaluation |
| Loss Config (`حساب الخسارة`) | `termConfig.lossConfig` | The account that takes a downward one |

Both are full account sides, so either can be a fixed account or one resolved per asset.

The page also carries **Dimension From Document** (`المحددات من المستند`, `termConfig.dimFromDocument`), deciding whether the ledger
lines are stamped with the dimensions of the revaluation document or those of the asset, and a switch
allowing straight-line assets to be revalued and converted to the revaluation method
(`السماح بالأصول ذات الإهلاك الثابت و تغيير طريقة الإهلاك`, `termConfig.allowStraightLineAndChangeDepreciationMethod`), on
the term's Settings page.

::: warning Converting a straight-line asset is not a small change
Once that switch has let a revaluation convert an asset from straight-line to the revaluation method,
the asset stops being collected by the ordinary depreciation run. Deleting the revaluation document
reverts the conversion; nothing else does. See
[revaluation](/modules/fixedassets/depreciation/fixedassets-revaluation.md).
:::

## The Addition and Deduction Term

The addition and deduction document changes an asset's **cost** — Al-Waha's +30,000 control-unit
upgrade on `MCH-0007` in January 2027 is one. The asset's side of the entry is its own cost account;
the term supplies everything facing it.

Everything sits on one page, in this order:

1. **The account facing the asset** (`termConfig.credOrDebitSide`) — the first group on the page. This is where the
   value comes from on an addition, and where it goes on a deduction.
2. **Four tax pairs.** Two of them are the *addition* taxes (`termConfig.collectDebit1` / `termConfig.collectCredit1`
   and `termConfig.collectDebit2` / `termConfig.collectCredit2`), two the *discount* taxes (`termConfig.tempBounDebit1` /
   `termConfig.tempBounCredit1` and `termConfig.tempBounDebit2` / `termConfig.tempBounCredit2`), and each is a
   debit account and a credit account. What the term groups call a discount tax is what the document
   screen calls **Discount Tax**, so the names line up once you know that.
3. **Two more sides for the discount value itself** (`termConfig.discountValueDebit` / `termConfig.discountValueCredit`),
   immediately after the tax groups.

Each tax group carries its own switch deciding whether that tax is folded into the asset's value or
kept out of it — set it inside the group it belongs to, and the arithmetic on the document will follow. The
switches sit in the debit group of each pair: `termConfig.addTax1ToAssetValue`, `termConfig.addTax2ToAssetValue`,
`termConfig.subtractTax3FromAssetValue` and `termConfig.subtractTax4FromAssetValue`.

The page also has **Shorten Ledger Effect** (`اختصار القيد`, `termConfig.shortenLedgerEffect`), which collapses the entry into fewer
lines.

The aggregated version of this document generates one ordinary addition-and-deduction document per grid
line, so its term names the **book and term of the generated documents** (`termConfig.additionDeductionDocBook`,
`termConfig.additionDeductionDocTerm`), plus an option to produce an accounting effect even when a line has no value
to book (`termConfig.createEmptyAccountingEffect`).

## The Disposal Term

This is the term that needs thought, because a disposal is the one Fixed Assets document where the
outcome genuinely depends on the accounts you chose.

The disposal term's first page also carries the term's own identity — document type, code, name,
inactive flag and template — so this is one of the screens where you can name the term from the term
itself.

### What is on the screen

| Group | Field id | What it is for |
|---|---|---|
| Debit (`مدين`) | `termConfig.debit` | The proceeds side: the receivable, the bank, the cash account — whoever pays for the asset |
| Profit Config (`حساب المكسب`) | `termConfig.profitConfig` | The gain account |
| Loss Config (`حساب الخسارة`) | `termConfig.lossConfig` | The loss account |
| Tax 1 debit and credit, Tax 2 debit and credit | `termConfig.tax1Debit` / `termConfig.tax1Credit`, `termConfig.tax2Debit` / `termConfig.tax2Credit` | Two tax pairs |
| Dimension From Document (`المحددات من المستند`) | `termConfig.dimFromDocument` | Whether the ledger lines take the document's dimensions or the asset's |
| Taxable, Is Editable Tax, Tax Plan | `termConfig.taxable`, `termConfig.isEditableTax`, `termConfig.taxPlan` | The usual tax behaviour |

The second page names the **Fixed Asset Purchase Document Book and Term** (`termConfig.faPurchaseBook`,
`termConfig.faPurchaseTerm`) used for assets recovered from the disposal — when you strip a machine and keep its motor as a new asset, that is the book and term the
generated acquisition document uses.

Separate gain and loss accounts are the disposal's distinguishing feature. The partial disposal, below,
has only one.

### Worked example — selling `MCH-0007` at a gain

By 31 December 2027 the machine stands at cost 270,000 and accumulated depreciation 93,900, a book value
of 176,100. Al-Waha sells it for 200,000.

| | Debit | Credit |
|---|---|---|
| Receivable — *the term's debit side* | 200,000 | |
| Accumulated depreciation — *the asset's Account 02* | 93,900 | |
| `MCH-0007` cost account — *the asset's main account* | | 270,000 |
| Gain on disposal — *the term's profit account* | | 23,900 |

### Worked example — scrapping `MCH-0012` at a loss

The forklift stands at cost 60,000 and accumulated depreciation 38,000, a book value of 22,000. It is
scrapped, so the disposal value is entered as 0 and the term's debit side has nothing to carry:

| | Debit | Credit |
|---|---|---|
| Accumulated depreciation | 38,000 | |
| Loss on disposal — *the term's loss account* | 22,000 | |
| `MCH-0012` cost account | | 60,000 |

Both entries used the same term. Which of the two accounts was reached was decided by the arithmetic,
not by anything the user chose on the document.

::: tip Taxes and what the buyer owes
The term's debit side is charged with the **net** disposal value only — the tax pairs are booked
separately. If the buyer is to owe you the gross amount, point the term's debit side and its tax 1 debit
at the **same** receivable account, so the two lines add up on the customer's balance. And configure
both halves of a tax pair or neither: a half-configured tax pair drops out of the entry silently.
:::

![The Settings tab of the Fixed assets disposal document term, with its debit side](../../../ar/modules/fixedassets/images/disposal/fa-term-disposal-settings-en.png)

## The Partial Disposal Term

The partial disposal takes some units off a countable asset — three of Al-Waha's ten desks in
`FRN-0021` — and its term follows the same shape as the full disposal with one important difference.

**Gain and loss share a single account here.** The screen calls it the Profit & Loss Account
(`حساب المكسب - الخسارة`), and it takes the difference in either direction. If your chart of accounts
requires gains and losses to be kept apart, a partial disposal cannot do it; the full disposal can.

The rest of the screen:

| Group | Field id | What it is for |
|---|---|---|
| Profit & Loss Account (`حساب المكسب - الخسارة`) | `termConfig.config.credit` | The gain or the loss, whichever the arithmetic produces |
| Debit (`مدين`) | `termConfig.config.debit` | The proceeds side |
| Tax 1 debit and credit | `termConfig.tax1Debit` / `termConfig.tax1Credit` | The partial disposal's tax handling is a single pair |
| Taxable, Is Editable Tax, Tax Plan | `termConfig.taxable`, `termConfig.isEditableTax`, `termConfig.taxPlan` | The usual tax behaviour |
| An option allowing a partial disposal even when earlier months have not been depreciated | `termConfig.disposalCanBeNotSequential` | Relaxes the rule that depreciation must be caught up first |
| Fixed Asset Purchase Book and Term | `termConfig.faPurchaseBook`, `termConfig.faPurchaseTerm` | For assets recovered from the disposal, as on the full disposal |

The cost and accumulated depreciation that come off the asset are not the term's business — they are
computed from the asset's own accounts, pro-rata to the units disposed. For `FRN-0021`, disposing of
three desks out of ten removes 12,000 of cost and 3,600 of accumulated depreciation, leaving a book
value of 19,600 and a count of seven.

## The Aggregated Disposal Term

The aggregated disposal generates one ordinary disposal document per line, so its term names the
**disposal book and disposal term** those generated documents use (`termConfig.faDisposalBook`,
`termConfig.faDisposalTerm`). Both are mandatory: leave either
blank and the commit is refused with a message telling you to fill the fixed asset disposal book and
term in the term.

This is the pattern across every aggregated document in the module, and it has one consequence worth
remembering — **the accounting is on the generated term, not the aggregate's.** If your aggregated
disposals are recording gains on the wrong account, the term to fix is the disposal term the aggregate
points at.
