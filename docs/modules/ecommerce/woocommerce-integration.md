---
entities: [MAGMagentoSite, RewardPointsConfig]
menu: e-Commerce Integration → Master Files → Magento Site
---
# WooCommerce Integration

This page explains how to connect a WooCommerce shop to Nama ERP: importing shop orders as sales documents, sending products, prices and stock to the shop, writing order statuses and notes back, and keeping customer reward points in step between Nama and the shop.

WooCommerce is set up on the same screen as every other shop, which is called **Magento Site** on
screen for every platform, not only Magento. You need the `magento` licence to open it. Everything
the platforms share — the order and return generation info, books and terms, customers, payment
method lines, the **Magento Item Linker**, scheduled reading — is explained in the
[e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md). This page covers
what is particular to WooCommerce.

## How the two systems talk

Nama talks to WooCommerce through the shop's standard REST API. Nothing has to be installed in
WordPress for orders, products, prices, stock and order statuses. Nama asks the shop for new orders
when you press **Read Sales** (or on a schedule), and it calls the shop whenever something it is
configured to send changes in Nama.

The reward points sync is the exception: it needs extra endpoints on the WordPress side, described
in [Reward points](#Reward-points) below.

## Connecting the shop

First create a REST API key in WooCommerce: **WooCommerce → Settings → Advanced → REST API → Add
key**, with **Read/Write** permission. WooCommerce shows you a Consumer Key (starting `ck_`) and a
Consumer Secret (starting `cs_`). Copy both before you leave the page.

Then create a Magento Site record in Nama:

1. Set **Site Type** to **Woo Commerce Site**.
2. In **URL**, enter the address of the shop **including the scheme**, for example
   `https://shop.example.com`. Nama adds the API path itself.
3. In **User Name (Consumer Key)**, paste the Consumer Key; in **Password (Consumer Secret)**, paste the Consumer Secret.
4. Set **Date Pattern** to `yyyy-MM-dd'T'HH:mm:ss`. WooCommerce writes its dates in this form, and
   Nama uses this pattern to read the order dates and to send sale-price dates. Treat it as a
   required setting for WooCommerce.
5. Fill the order settings described below and in the shared guide, then save.

::: tip Use https
With an `https://` address Nama sends the key and secret as standard authentication over the
encrypted connection. Use https for any shop that is reachable from the internet.
:::

![A Woo Commerce Site with the shop address, the REST API key and secret, and the Date Pattern WooCommerce needs](../../ar/modules/ecommerce/images/woocommerce-site-main-en.png)

## Reading orders from the shop

### Choose exactly one status

WooCommerce gives every order a status: `pending`, `processing`, `on-hold`, `completed`,
`cancelled`, `refunded` or `failed`. In **Only Transfer Orders With Status Equal to One of The
Following**, list the **single** WooCommerce status you want to import — for most shops that is
`processing`, the status WooCommerce gives a paid order that is waiting to be shipped. Nama then
asks the shop only for orders in that status.

If you leave the field empty, Nama reads orders in the `pending` status.

### Page size and where reading starts

**Max Orders Per Read** sets how many orders Nama asks for in one request. The default is 25, and
WooCommerce accepts at most 100, so any larger value is treated as 100. Nama keeps asking page after
page until it has read everything newer than its starting point.

Each **Read Sales** continues from where the last one stopped. For the very first read, use
**Read Sales From Date** and give a date, so Nama starts from that date instead of reading the shop's
whole order history.

Each order becomes a sales document according to the **Order Info** settings, matched to its
customer and payment method lines exactly as the shared guide describes. The payment method Nama
reads from a WooCommerce order is the method's slug as WooCommerce stores it (for example `cod` or
`bacs`), so use that text in your payment method lines.

::: warning A "success" message does not mean every order was imported
**Read Sales** reports success on screen even when some orders fail. An order that could not be
saved is listed, with the reason, in **Log List** on the site's **Statistics** tab. Check that list
after a read, fix the cause, and re-read the order from there.
:::

## What Nama sends to the shop

::: tip Sending must be switched on for the server
Nama sends nothing to any shop — products, prices, quantities, order statuses or notes — unless the
server's `nama.properties` file contains `send-ecommerce-data=true`.
:::

### Products

With **Send Items To Magento** ticked, saving an item sends it to the shop (the shared guide explains
which items qualify). Nama looks the product up by SKU: if the shop has no product with that SKU it creates one, otherwise it updates the
existing product.

Shops that publish each product in several languages (for example with a translation plugin such
as WPML) keep a separate product copy per language. Two settings on the **Woo Commerce Site** tab
make Nama update those copies too:

- **Update Ecommerce Item Through Translation Ids** — when ticked, Nama reads the list of translated
  copies WooCommerce returns with the product and updates each of them as well as the original.
- **Ecommerce Item Id Path** — for shops that keep the ids of the copies somewhere else in the
  product data. Enter one path per line; Nama reads a product id from each path and updates that
  product too. When this field is filled it is used instead of the translation tick.

### Prices

Prices go out through the **Magento Price Updater Doc**. The price is written to the product's
regular price, rounded to two decimals. A special price is sent as WooCommerce's sale price together
with its dates, so give each special price both a **Special Price From Date** and a **Special Price
To Date**. The sale-price dates depend on the **Date Pattern** set during
[connection](#Connecting-the-shop).

### Stock quantities

Nama sends each product's stock as **one total quantity**. It switches on **Manage stock** for the
product in WooCommerce, sets the stock quantity, and sets the stock status. WooCommerce stores stock
as whole numbers, so any fraction is dropped: 7.6 units in Nama arrive as 7.

Leave the **Link Ecommerce Warehouses By Nama** grid **empty** on a WooCommerce site. The quantity
that goes out is the total calculated by the site's quantity settings (see the shared guide), and
**Update All Qtys** resends every item's quantity in one go.

If a price or quantity is sent for a SKU the shop does not have, the request fails with:

`Could not find product with sku {0}`

Create the product in the shop (or let Nama create it by saving the item), then retry the request
from the price or quantity request list on the **Statistics** tab.

### Order status and order notes

Nama can move the WooCommerce order forward when the matching sales document is committed in Nama —
for example, mark the order `completed` once its invoice is saved.

1. Tick **Change Request Status With Sales Document Commit**.
2. Add lines to **Update Magento Order Status To**. Use **Apply When Query** (or the criteria
   column) to decide which documents a line applies to, and put the WooCommerce status slug to set
   in **Status**, for example `completed`.
3. Optionally fill **Comment**. Nama adds it to the order as an **order note**; the text can use
   fields of the document, for example `Invoiced in Nama as {code}`. Tick **Comment Visible To
   Customer** to add it as a note to the customer rather than a private note.

When the document is committed, Nama reads the order again from the shop, sets the status and adds
the note. It sends the status only if it differs from the last status it sent for that document,
and the note only if its text differs from the last note, so saving the document again does not
repeat them.

## Reward points

When the shop runs a points programme and Nama runs one too, a customer should see one balance in
both places. The reward points sync does this: points the customer earns or loses in Nama are added
to their shop balance, and points they spend in the shop are deducted in Nama.

### What the shop needs

The sync works with the **YITH WooCommerce Points and Rewards** plugin in the shop. Nama also calls
two endpoints that are not part of standard WooCommerce: one to read a customer's points and one to
change them. The WordPress side needs Nama's points endpoints installed — ask Namasoft support for
them.

### Setting it up in Nama

1. Open the **Reward Points Configuration** that governs the points (**Basic → Documents → Reward
   Points Configuration**; how points are earned is explained in
   [Customer reward points](/modules/invoicing/reward-points.md)).
2. In **Synchronize Reward Points With Woo Commerce Site** (`synchronizeRewardPointsWithWooCommerceSites`), pick the WooCommerce Magento Site
   record. Only a site whose Site Type is Woo Commerce Site takes part.
3. Fill **Discount Coupon Book** on the same configuration — Nama needs it to create the coupons
   described below.
4. Make sure each customer's **Mobile** in Nama is the same number, in the same format, as the
   billing phone the customer uses in the shop. The mobile number is how the two systems recognise
   the same customer; a customer with no mobile in Nama is not synced.

### From Nama to the shop

Nama sends a points change to the shop when:

- a document earns the customer points, or its points change;
- the document's customer is changed (the points move from the old customer to the new one);
- the document is reversed (the points are taken back);
- a Nama discount coupon linked to the configuration is redeemed or cancelled.

Each change is sent as whole points with a short English reason, such as
`From namasoft erp SalesInvoice: SI-000125`.

Before sending, Nama checks whether the shop knows the customer's phone number. If it does not and
the record is a Nama customer, Nama first creates the customer in the shop with their name, email
and phone.

An invoice that was itself imported from the same WooCommerce shop is not sent back: the shop
already gave the customer points for that order.

Every call is queued and kept, with its status and any error, in **Reward Point Integration Error
Log** on the site's **Statistics** tab. Look there first if a customer's balances disagree.

### From the shop to Nama: points turned into a coupon

In YITH a customer can turn points into a discount coupon. To deduct those points in Nama, add a
webhook in WooCommerce (**WooCommerce → Settings → Advanced → Webhooks → Add webhook**) with the
topic **Coupon created** and this delivery URL:

`{your Nama address}/woo-points/{Reward Points Configuration code}`

For example, if users open Nama at `https://erp.example.com/erp` and the configuration's code is
`RP-WEB`, the URL is `https://erp.example.com/erp/woo-points/RP-WEB`.

When a customer creates a points coupon, Nama finds the Nama customer by the shop customer's billing
phone, creates a **Discount Coupon** with the shop's coupon code and amount (in the legal entity's
currency, for that customer, usable once, using the configuration's book and dimensions), and
redeems it straight away, which deducts the points in Nama. Coupons that were not created from
points, and customers whose phone does not match anyone in Nama, are ignored.

### From the shop to Nama: points spent on an order

A customer can also spend points directly at checkout. When Nama imports an order that carries a
YITH points discount, it redeems the same amount from the customer's points in Nama. If the order
used a points coupon that already reached Nama through the webhook, nothing more is deducted, and
re-reading the same order never deducts twice. An order saved as a draft deducts nothing.
