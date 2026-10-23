# Supply Chain Document Terms

A **Document Term** (توجيه المستند) is the main mechanism for customizing how a Supply Chain document type behaves. Almost every behavioral decision a document makes — what it copies from its source document, how it tracks and reserves quantity, how it prices and taxes its lines, what it records in the general ledger, and which documents it generates — is driven by the term assigned to it. A single document type can have several terms, each tuned for a different process.

::: info Where to find it
Open any Supply Chain document's **Document Term** (توجيه) file. The term's settings are organized into purpose-named tabs by theme. The exact set of tabs and options shown depends on the document type the term targets.
:::

Because the options are numerous, they are grouped into themed tabs. Each tab has its own reference page, and every option lists its **field id** (e.g. `termConfig.copyDetailsOfFromDoc`) so you can search for the exact setting regardless of how its label is translated.

- **[General](./doc-term-general.md)** — the term's identity (target document type, code, names, active state, template, filters) and a few cross-cutting toggles.
- **[From-Document](./doc-term-from-document.md)** — how lines, quantities and prices are copied and linked from the source document (بناءً على), how similar lines are collected and merged, and which copied lines are locked.
- **[Sub-Item](./doc-term-sub-item.md)** — what document references, dimensions and tax percentages are written into the sub-item (الصنف الفرعي) record.
- **[Quantity Tracking](./doc-term-quantity-tracking.md)** — how the document tracks how much of a linked document has been satisfied, including serial handling.
- **[Reservation & Delivery System](./doc-term-reservation-and-delivery.md)** — stock reservation behavior, sources and criteria, and the delivery-system table configuration.
- **[Pricing, Taxes & Discounts](./doc-term-pricing-taxes-discounts.md)** — price-list forcing, recalculation, locking and exclusion of prices, taxes and discounts for sales and purchase documents.
- **[Accounting Effects](./doc-term-accounting-effects.md)** — the debit/credit account sides and tax, discount, service-fee, control-journal and letter-of-credit effects each document records in the ledger.
- **[Generation & Dimensions](./doc-term-generation-and-dimensions.md)** — automatic generation of downstream documents (on commit or async on save) and how the document's accounting dimensions relate to its warehouse.
- **[Document-Specific Options](./doc-term-document-specific.md)** — options that surface only for particular document types (stock receipts, transfers, returns, replacement, assembly, job orders, stock taking, and more).

::: tip Field ids are stable
Throughout these pages each option is cited by its field id in backticks. Use the id (not the translated label) when searching the term config or referencing an option — it is unambiguous and does not change between languages.
:::
