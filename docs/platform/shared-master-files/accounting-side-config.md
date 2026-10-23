---
entities: [AccountingSideConfig]
menu: Basic → Settings → Accounting Side Config
---
# Accounting Side Config

Every document that reaches the general ledger describes its lines the same way: which account to hit, whose subsidiary (portfolio) account to use, which cost-centre dimensions to carry, and what narration to write. On a document term that description is an **account side** — the block of fields you fill in on the Effect tab, once for the debit, once for the credit, and again for every tax, discount, cash and fees side the document exposes.

In a real installation the same block gets typed over and over. Twelve sales terms all credit the same revenue account, all take the branch from the document header, all write the same narration. Change the narration and you are editing twelve terms, hoping you did not miss one.

**Accounting Side Config** is that block saved as a master file. Fill it in once, give it a code, and point as many terms as you like at it. Edit the record and every term that points at it follows.

::: info Where to find it
**Basic → Settings → Accounting Side Config**. It is an ordinary master file — code, Arabic and English names, groups and dimensions — with one extra group holding the account side itself.
:::

## What the record holds

The fields are the same ones an account side has on a document term, so the [anatomy of an account side](/modules/supplychain/document-terms/doc-term-accounting-effects#Anatomy-of-an-Account-Side) describes them in full. In short:

| Setting | Field | What it does |
|---|---|---|
| Account source / Account | `accountSource.type` + `accountRef` | Either a fixed account, or an account resolved from a source on the document. When it comes from a referenced record, `accountSource.entityType` names that record's type and `accountSource.fieldID` the field on it that yields the account. |
| Account from portfolio currency | `accountSource.accFrmBagCrrncy` | Resolves the account through the portfolio (bag) currency. |
| Subsidiary account type | `subsidiaryAccountType` + `bagAccountId` | The portfolio type (customer, supplier, …) the subsidiary account is derived from, and the portfolio account identifier. |
| Narration / Narration 2 | `narrationTemplate` · `narrationQuery` · `narration2Template` · `narration2Query` | The two description lines of the ledger entry, each from a template or a query. |
| Dimension sources | `sectorSource` · `branchSource` · `departmentSource` · `analysisSetSource` (+ the matching `dimensions.…` fixed values) | Where each cost-centre dimension comes from — a fixed value, or a field on the document. |
| Entity dimension & references | `entityDimensionSource` + `entityDimension`, `ref1Source` … `ref3Source` | The generic entity dimension and the three generic reference dimensions. |
| Ignore unfound fields | `ignoreUnfoundFieldsInRefsAndEntityDimension` | Don't fail the entry when a source field named above is missing on the document. |
| Currency / Rate source field | `currencySourceField` · `rateSourceField` | The fields the line's currency and rate are read from. Both must start with `$doc.` or `$line.`. |

Just as on a document term, the dimension, entity-dimension and reference rows only appear when their matching switches are enabled in [Dimensions](/platform/global-config/global-config-dimensions) — a side whose dimension sources are invisible is a global-config question, not a missing feature.

::: warning An account is mandatory here, unlike an inline side
An account side typed directly into a term may be left completely empty — the term then simply contributes nothing on that side, and saves without complaint. A master record cannot: it refuses to save until **Account source type** is filled in, and if that type is *Specific* it also insists on the account itself. That is deliberate — an empty shared side would silently produce nothing everywhere it is used.
:::

![An Accounting Side Config with a specific account](../../ar/platform/images/shared-master-files/accounting-side-config-screen-en.png)

## Where a saved record is used

**As the Side Configuration of a term's account side.** Every account side on a document term's Effect tab opens with a **Side Configuration** field. Point it at a record here and the term stops describing that side itself.

**As a tax or discount other side.** The *Tax 1..4 other side*, *Discount 1..8 other side* and *Header discount other side* fields on an invoice-style term are not blocks you fill in — they accept an Accounting Side Config record and nothing else. If you want a tax counter-entry to land somewhere specific, you have to create the record here first. See [Accounting Effects Configuration](/modules/supplychain/document-terms/doc-term-accounting-effects#Tax-Effects).

**On Payment Method and Additional Cost.** Both master files describe their accounting through these records rather than inline blocks — a payment method's payment-value, fees-value, fees-tax and shift-difference sides, and an additional cost's debit, credit and four tax pairs.

::: danger A Side Configuration replaces the block — it does not merge with it
When a side's **Side Configuration** is filled in, everything else typed into that same block is ignored: the account, the subsidiary type, the narrations, the dimension sources, all of it. The system uses the referenced record as it stands.

This matters because the fields stay on screen and keep showing whatever was there before. A term that used to credit account 4100 directly, and later had a Side Configuration added, still *reads* as though it credits 4100 — but its amounts go wherever the referenced record says. If an entry lands on an account nobody recognises, check the Side Configuration field before checking anything else, and clear it to go back to the values typed in the block.
:::

## Sharing a side, and when not to

The obvious use is the one above: one revenue side, one narration, twelve terms. The less obvious one is the tax and discount other sides, where the master record is not a convenience but the only way to state the account at all.

Sharing has a cost, and it is worth being deliberate about it. A record used by twenty terms is edited by whoever needs the twenty-first, and the edit reaches the other twenty the moment it is saved. If two terms are only *currently* alike — same account today, different tomorrow — give them a record each. Records are cheap; an untangling exercise six months later is not.

Changing a record does not rewrite entries that already exist. Documents processed before the change keep the entry they produced; they take the new side only if they are saved again, or reprocessed from the Business Requests list.
