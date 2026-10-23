# Accounting Document Terms

Every accounting document that creates a journal entry takes its accounts from its **document term** (توجيه) — so when
a voucher lands on the wrong account, a cheque moves to an unexpected status, or a letter of
guarantee creates no journal entry, the answer is almost always on the term. The idea of a term, and how a
document chooses one, is explained on
[Document Terms (per-type processing rules)](/modules/accounting/support/accounting-document-terms).
The pages below are the option-by-option reference, grouped by document family.

Every option is cited by its **field id** — `termConfig.` followed by the field name, for example
`termConfig.impliedCollection` — so you can search for a setting whatever language the screen is in.
The term screen is reached from **Basic → Settings → Document Term**.

<LandingGrid>
  <LandingCard icon="💵" title="Receipts, payments and requests" link="/modules/accounting/document-terms/acc-terms-vouchers-and-requests.md" details="Receipt and payment vouchers and orders, bank transfers, payment and receipt requests, electronic receipts and cashier documents." />
  <LandingCard icon="✍️" title="Journals, closing and other terms" link="/modules/accounting/document-terms/acc-terms-journals-and-closing.md" details="Journal entries, currency difference journals, exchange-rate updates, the closing entry, aging allocation, inter-company transfers and profit distribution." />
  <LandingCard icon="🧾" title="Credit/debit notes and misc invoices" link="/modules/accounting/document-terms/acc-terms-notes-and-misc-invoices.md" details="Credit and debit notes, miscellaneous invoices, requests and orders, and machine rent invoices." />
  <LandingCard icon="📝" title="Commercial papers" link="/modules/accounting/document-terms/acc-terms-commercial-papers.md" details="Opening papers, bank portfolios, bank notices, partial payment, cancel, agio and paper transfer." />
  <LandingCard icon="🛡️" title="Letters of guarantee and credit" link="/modules/accounting/document-terms/acc-terms-guarantees-and-credits.md" details="Issue, opening, changing and closing of letters of guarantee, and the letter-of-credit terms." />
  <LandingCard icon="💳" title="Loans, deposits and credit facilities" link="/modules/accounting/document-terms/acc-terms-loans-deposits-facilities.md" details="Loan issue, instalment payment and interest, credit facilities, fixed deposits and interest payment." />
  <LandingCard icon="💼" title="Investments and prepaid expenses" link="/modules/accounting/document-terms/acc-terms-investments-and-prepaid.md" details="Treasury bills, investment documents and fund certificates, investment portfolios and prepaid expenses." />
</LandingGrid>

::: tip Two kinds of account side
Some pairs on these screens are a full account-side block, described in
[Anatomy of an Account Side](/modules/supplychain/document-terms/doc-term-accounting-effects#Anatomy-of-an-Account-Side);
others are a single reference to a saved
[Accounting Side Config](/platform/shared-master-files/accounting-side-config) record. Either way, on
most terms a pair creates a ledger entry only when both its debit and its credit are set, and a half-filled pair is
skipped without a message. The few exceptions are noted on their pages.
:::
