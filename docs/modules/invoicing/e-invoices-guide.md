---
description: "How e-invoicing works in Nama for every country: the Electronic Tax Authority Configuration, the Tax Authority Submission Document, switching it on, collecting, checking and sending documents, what the statuses mean, and where to look when a document does not arrive."
entities: [TaxPayerConfiguration, TaxAuthoritySubmissionDoc]
menu: Basic → Electronic Tax Authority Configuration → Electronic Tax Authority Configuration
---
# Electronic Invoicing in Nama ERP

Most tax authorities no longer accept a printed invoice as the record of a sale. The invoice has to reach them electronically, in their format, within their deadline — and in some countries the invoice is not even legally valid until the authority has stamped and returned it. Saudi Arabia, Egypt, Jordan and the UAE each run their own platform, with their own rules about who may send, what an item code looks like, and how long you have to correct a mistake.

Nama ERP puts one machine behind all of them. Whichever country you operate in, the parts you work with are the same, and only the plug at the end changes. This page explains that shared machine — what the pieces are, how an invoice travels from a saved sales document to an accepted government record, and where to look when it does not arrive. Once you understand it, the country guide you need is a short read, because it only covers what is genuinely different.

## The three pieces

**The Electronic Tax Authority Configuration** is the record that holds everything about your relationship with one authority: which platform you are talking to, the credentials that identify you, the codes your items and taxes must be translated into, and the rules about what may be sent and when. You create one per authority and per establishment — a company registered in two countries has two, and so does a group whose branches file separately.

**The sales documents themselves** need no special treatment. Staff raise invoices, returns and receipts exactly as they always have. What makes a document eligible for submission is decided in the configuration, not on the document.

**The Tax Authority Submission Document** is the vehicle. It gathers the documents that are due, shows them to you as lines, and carries them to the authority. Every submission you have ever made stays on file as one of these records, together with what the authority answered — which is what makes it possible to prove, months later, exactly what was sent.

## Switching e-invoicing on

Before any of the screens are useful, the system has to know which country's page to show inside your invoices. In **Global Configuration**, page 2, set **e-Invoice Page To Show**:

<GlobalConfigOption option-code="value.info.einvoicePageShowType" />

The choices are **Egypt Page**, **ZATCA Page** (Saudi Arabia), **Jordan Page**, the UAE page, or **All Pages** if you file in more than one country. After changing it, run a **Regen UI** — the extra page will not appear on documents until you do.

Then create the configuration record and pick its **Tax Payer Type**. This single field selects both the country and the environment:

| Tax Payer Type | Country | Environment |
|---|---|---|
| Saudi Arab - Electronic Invoice Sandbox | Saudi Arabia | Developer sandbox |
| Saudi Arab - Electronic Invoice Simulation Site | Saudi Arabia | Simulation / trial |
| Saudi Arab - Electronic Invoice Site | Saudi Arabia | Live |
| Egypt - Electronic Invoice Site (Pre Production) | Egypt | Trial |
| Egypt - Electronic Invoice Site | Egypt | Live |
| Jordan - Electronic Invoice | Jordan | Live |
| UAE (Orchida) staging and live | UAE | Trial and live |

::: tip Always start on the trial platform
Picking the type fills in the **API URL** for you, so moving from trial to live later is a matter of changing this one field. Work through your real scenarios — an ordinary invoice, a return, an exempt line, an individual customer with no tax number — on the trial platform first. Rejections there cost nothing; rejections on the live platform are on your public record.
:::

Proving your identity to the authority is the one part that is genuinely country-specific: Saudi Arabia issues you a certificate through an onboarding sequence driven by a one-time password, Egypt registers each sending device and hands you a client id and secret, and the others differ again. That belongs to the country guides below.

## What the configuration decides

The configuration is long, but it answers only five questions. Knowing which question a field belongs to makes it much easier to find.

**Who are we?** — the tax registration number, the activity code, and the branch or legal entity whose address and commercial registration are sent as the seller. Authorities validate the seller's address in detail, so an incomplete branch address is one of the most common reasons a first submission fails.

**Which documents are eligible?** — this one is answered on the documents' side, not here. A document is sent when its **document book** or **term** has **Send To Tax Authority** ticked and names this configuration in its **Tax Configuration** field; a document whose book and term do neither is never collected. The configuration only adds the date limits described below.

**How do our items and taxes translate?** — authorities do not accept your internal item codes and tax names as they stand. Here you say where the item code comes from and how to build it, where the item's description comes from, and how each of the four tax slots maps to the authority's tax type and sub-type — including which code to send for exempt, zero-rated and out-of-scope lines, and whether a tax with a zero value should be sent at all.

**When may we send?** — **Start Sending From Date** draws the line before which nothing is submitted, so switching the feature on does not sweep up last year's invoices. **Max Days To Send Invoices** and **Max Days To Cancel Sent Invoices** hold you to the authority's deadlines, and a separate from/to pair opens a deliberate window when you have permission to send older documents.

**How much at a time?** — how many documents go in one request to the authority, and how many lines a single collection may pull in. Both matter on high-volume days: too large and the authority times out, too small and you are creating submission documents all afternoon.

![An Electronic Tax Authority Configuration record](../../ar/modules/invoicing/images/einvoice-taxpayer-config-egypt-en.png)

## Sending: collect, check, send

Open a new **Tax Authority Submission Document**, choose the configuration, and set the range you want to cover — a date range, a document range, or a narrowing by legal entity, branch, department, sector or analysis set.

1. **Collect Tax Authority Documents** fills the grid with every eligible document in that range that has not been accepted yet. Nothing has left the building at this point.
2. **Validate Tax Authority Documents** runs the authority's rules against the collected lines and reports what would be rejected — a missing buyer identity, an item with no registered code, an address field left blank. Fix the source documents, collect again, and repeat until it is clean.
3. **Preview Documents Before Sent** shows you the exact payload that will be transmitted, for when the validation message is not enough to explain itself.
4. **Sign Documents** (or **Sign Selected Documents**) applies the digital signature where the country requires one.
5. **Send Selected Documents** transmits the lines you ticked; **Send Not Sent Documents** transmits everything on the record that has not gone yet.

::: tip Validate before you send, every time
Validation checks the collected documents without committing anything. It is the difference between fixing ten invoices quietly and having ten rejections recorded against your tax file.
:::

### What the statuses mean

Each line carries a status that answers "where is this document now?":

| Status | Meaning |
|---|---|
| **Not Sent** | Collected but not yet transmitted. |
| **Sent** | The authority accepted it. |
| **Not Send Correctly** | Transmitted and refused. The line carries the authority's reason — fix the source document and send again. |
| **Cancelled** | Withdrawn after acceptance, within the days the authority allows. |
| **Rejected** | The authority rejected it after acceptance. |
| **Rejected by Receiver** | The buyer rejected it during the window their platform gives them. Nothing is wrong with your data — the customer disputed the document. |

**Check Tax Authority Status For Sent Document** re-asks the authority about the lines you have already sent and updates their status, which is how the last three states usually appear: they happen after your submission succeeded, on someone else's initiative.

From the invoice itself, **View Invoice At E Invoice Site** opens the document on the authority's own portal — the fastest way to answer a customer who says they cannot see it.

## Keeping it running without anyone watching

Collecting and sending by hand is fine while you are settling in, and unsustainable afterwards. Scheduled flows take it over:

- **[Auto Collect, Sign and Send](/entity-flows/core/EAAutoCollectSignAndSentEInvoice)** — runs the whole cycle unattended: collects the eligible documents, creates the submission records, signs them and sends them.
- **[Auto Send e-Invoice](/entity-flows/core/EAAutoSendEInvoice)** — submits each invoice on its own, as soon as it is committed, for businesses that want the document on the authority's record within minutes rather than overnight.
- **[Check Rejected by Receiver Documents](/entity-flows/core/EACheckTaxAuthorityRejectedByReceiverDocuments)** — watches recent submissions through the buyer's review window and brings back rejections and cancellations you would otherwise learn about from the customer.

There is also a retry flow that walks the submission documents still holding lines at *Not Sent* or *Not Send Correctly* and sends them again, in batches. It is worth scheduling even if you collect and send by hand, because it turns an evening when the authority's platform was down into a non-event.

## When a document does not arrive

Work from the line outward. The submission line holds the authority's own message, and it is usually specific: a buyer with no tax number and no accepted identity document, an item whose code is not registered, a tax with no mapped category, an address missing a building number. For Egypt, the messages Nama itself raises before anything is sent are listed under [Messages you may see](./egypt-einvoice-guide.md#Messages-you-may-see), together with the portal's signature refusal. The Saudi messages are under the ZATCA guide's [Messages you may see](./zatca-guide.md#Messages-you-may-see). Search those tables for the text the customer pasted. Fix it on the source document rather than on the submission — the submission is a snapshot, and the next collection will pick up the corrected version.

If the authority accepted a document but you have since changed it, the two export actions settle the argument. **Export Cleared / Sent XML For Selected Lines** gives you the payload the authority actually holds; **Export Current XML For Selected Lines** regenerates it from today's data. If the two differ, the document was edited after submission — which in most countries means it must be cancelled and re-issued rather than quietly corrected.

Deadlines are the other frequent cause. A document older than **Max Days To Send Invoices** will not be collected at all, which looks like the system ignoring it. That is deliberate: the authority would refuse it. Getting it accepted then means going through the authority's own late-submission process, not changing anything in Nama.

## The country guides

| Country | Guide |
|---|---|
| 🇸🇦 Saudi Arabia | [ZATCA (Fatoora)](./zatca-guide.md) — onboarding, clearance vs. reporting, VAT categories and buyer identity |
| 🇪🇬 Egypt | [e-Invoice and e-Receipt](./egypt-einvoice-guide.md) — connecting, buyer identity, EGS and GS1 item codes, receipts and POS devices, bank details, signing, cancelling |
| 🇦🇪 UAE | [UAE e-Invoicing through Orchida osTax](./uae-orchida-einvoice-guide.md) |
| 🇯🇴 Jordan | [JoFotara](./jofotara-jordan-guide.md) — credentials, buyer identity, and what the portal returns |
