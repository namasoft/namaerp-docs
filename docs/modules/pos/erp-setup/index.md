---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: POS — Server-Side Setup
description: "Landing page for POS server-side setup: the register master file, POS Settings and the supporting screens that control warehouses, numbering, shift closing, accounts and cashier permissions."
---

# POS — Server-Side Setup

The rest of the POS guide is about the register: selling, taking payment, closing a shift. But every register is set up — and everything it does is collected — on the Nama server, under the **Point of sale** menu. That is where you decide which warehouse a register sells from, how its invoices are numbered, what happens to the cash when a shift closes, which accounts a sale is recorded on and what each cashier is allowed to do.

These pages are for the people who configure and support registers. They answer the questions that arrive as tickets: *"the shift is not reset at close"*, *"how do we change the invoice prefix?"*, *"why can't the cashier close the shift?"*.

## How the pieces fit

1. **The register** is a master file, one per machine. It names the warehouse, payment methods, terms and the many options that apply to that machine only.
2. **POS Settings** is a single screen of company-wide defaults. Wherever a register has its own value for the same option, the register wins.
3. **Supporting settings screens** — service charge, delivery cost, screen layouts, security profiles and the like — are separate records that the register or POS Settings points to.
4. **Documents** come back the other way. Each invoice, return, shift and payment a register saves is synced up and processed on the server through its document term.

Every change you make here reaches the registers through the normal data sync, so a register that is offline keeps the old values until it reconnects — see [How POS Data Syncs with the Server](../pos-data-sync.md).

## Start here

<LandingGrid>
  <LandingCard icon="🖥️" title="Setting Up a Register" link="/modules/pos/erp-setup/pos-register-setup.md" details="The register master file: warehouse, payment methods, terms, tables, allowed users and the register's own buttons." />
  <LandingCard icon="⚙️" title="The POS Settings Screen" link="/modules/pos/erp-setup/pos-settings-screen.md" details="The company-wide POS options, grouped by what they affect, and which ones a register can override." />
</LandingGrid>

## Most-asked settings

<LandingGrid>
  <LandingCard icon="🔢" title="Numbering POS Documents" link="/modules/pos/erp-setup/pos-document-numbering.md" details="How a register builds invoice and shift codes, and how to change the prefix, digits, date part and starting number." />
  <LandingCard icon="💵" title="Shift Opening, Closing & Cash-Reset Settings" link="/modules/pos/erp-setup/pos-shift-close-settings.md" details="What shift documents hold, Shift Close Reset Cash, the settings that block a close, and how differences are recorded." />
</LandingGrid>

## Accounting and control

<LandingGrid>
  <LandingCard icon="🧾" title="POS Document Terms" link="/modules/pos/erp-setup/pos-document-terms.md" details="The document terms behind every POS document and how a register picks the term for each sale, return or payment." />
  <LandingCard icon="🔐" title="POS Security Profiles" link="/modules/pos/erp-setup/pos-security-profiles.md" details="What each cashier may do at the register, capability by capability." />
</LandingGrid>

## Selling options

<LandingGrid>
  <LandingCard icon="🍽️" title="Service Charge, Minimum Charge, Delivery & Return Reasons" link="/modules/pos/erp-setup/pos-charges-and-returns-settings.md" details="Special items the register adds and prices for you, plus the return and depreciation reasons cashiers pick from." />
  <LandingCard icon="📦" title="What a Register Receives: Items, Barcodes & Sync Settings" link="/modules/pos/erp-setup/pos-items-and-sync-settings.md" details="Which items each register gets, stock checks at the till, scale and GS1 barcodes, save-on-server-first rules, and the read queue." />
  <LandingCard icon="🖱️" title="Screen, Keyboard & Device Settings" link="/modules/pos/erp-setup/pos-screen-and-device-settings.md" details="Screen layouts, the mobile app, keyboard shortcuts, the pole display, default values and required fields." />
</LandingGrid>

## After the sale

<LandingGrid>
  <LandingCard icon="📤" title="POS Documents on the Server" link="/modules/pos/erp-setup/pos-documents-on-the-server.md" details="The invoices, returns, payments and stock documents registers send up, and what you can and cannot do with them." />
</LandingGrid>
