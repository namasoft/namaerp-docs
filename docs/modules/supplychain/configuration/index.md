# Supply Chain Configuration

The Supply Chain module has a single, large **configuration file** that controls how inventory, purchasing, sales, costing, and stock documents behave across the whole system. It is one of the most consequential screens in the product: a single switch here can change how cost is calculated, whether stock may go negative, what is shown on every document line, and much more.

::: info Where to find it
Open the Supply Chain module **Configuration** file. Settings are organized into tabs by theme. The configuration is cached for performance, so a change takes effect once you save it — the system refreshes the cached values automatically.
:::

Because the options are numerous, they are grouped into purpose-named tabs. Each tab has its own reference page:

- **[Costing](./costing-configuration.md)** — the costing method, tax effect on cost, uncosted-receipt handling, cost reprocessing caps, cost sources, and Letter-of-Credit cost dimensions.
- **[Overdraft & Quantity Checking](./overdraft-and-quantity-checking.md)** — whether stock may go negative, where, and how strictly the by-date and reservation quantity checks are enforced.
- **[Quantity Suggestion](./quantity-suggestion-configuration.md)** — how the system suggests available lots/quantities when you enter an item, and how it merges similar lines.
- **[Item Properties](./item-properties-configuration.md)** — the tracking properties on each line (lot, serial, revision, size & color, measures) and how they are entered, validated, and matched.
- **[Items & Master Data](./items-and-master-data-configuration.md)** — item master behavior, codes, search, warehouse/locator relationships, and item links to customers and suppliers.
- **[Purchasing](./purchasing-configuration.md)** — purchase documents, returns, and the letter-of-credit / proforma workflow.
- **[Sales & Offers](./sales-and-offers-configuration.md)** — sales documents, offers and coupons, discounts, free items, and price classifiers.
- **[Pricing & Price Lists](./pricing-and-price-lists.md)** — last-price fallback, price-list behavior, and the default units for new items.
- **[Documents & Details](./documents-and-details-configuration.md)** — line layout, per-line dimensions, extra columns and grids, delivery handling, and warehouse/locator filtering.
- **[Stock Taking](./stock-taking-configuration.md)** — how physical counts are entered, validated, ended, and turned into adjustments.
- **[Stock Ages](./stock-ages-configuration.md)** — inventory-aging tracking and how finely held stock is broken down.
- **[Item Barcode Specifications](./item-barcode-specifications.md)** — how composite barcodes are parsed into an item plus its properties and quantity.

::: warning Some options are fundamental
A few settings — most notably the **Issue Cost Policy** (FIFO vs Average) and what is tracked for quantity and cost — should be decided at implementation time, because once stock transactions exist the system refuses to change them unless **Allow Changing Cost And Quantity Tracking After Item Usage** is on. A few options sit at a protected security level (for example allowing overdraft in manufacturing issues or stock transfers): a save that switches one on from a normal session is refused with *You are not authorized to change the field  {0} because it belongs to the security level {1}, please contact technical support team*. Read each option's notes before changing it on a live database.
:::
