---
entities: [MAGMagentoSite]
menu: e-Commerce Integration → Master Files → Magento Site
---
# Shopify Integration

This page explains how to connect a Shopify store to Nama ERP: how the connection is set up, how Shopify orders become sales documents in Nama, and how products, prices and stock quantities are sent from Nama to Shopify.

## How the integration works

A Shopify store is set up in Nama as one record on the **Magento Site** screen. The screen carries that
name for every platform, not only Magento, so a Shopify store is simply a Magento Site whose
**Site Type** is **Shopify Site**. The screen needs the `magento` licence.

The work goes in two directions:

- **Orders come in.** Nama asks Shopify for new orders, either when someone presses **Read Sales** or on a
  schedule, and turns each one into a sales document using the books, terms, customers and
  payment-method lines you set on the site.
- **Products, prices and quantities go out.** When an item is saved, when a price changes or when stock
  moves, Nama sends the change to Shopify.

Everything that is shared by all platforms (the order settings, customers, payment-method lines, the
item linker, statuses and scheduled reading) is explained in the
[e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md). This page covers only
what is particular to Shopify.

## Connecting to Shopify

Nama talks to Shopify through Shopify's GraphQL Admin API. To use it, tick **Use GraphQL Api** on the
site. Sites created before this option existed used an older connection; a new Shopify site should
always have **Use GraphQL Api** ticked.

You need an app in the Shopify store that is allowed to read orders and to manage products and
inventory. Shopify then gives you its credentials in one of two forms, and Nama accepts either.

1. Open **e-Commerce Integration → Master Files → Magento Site** and create a new record.
2. Set **Site Type** to **Shopify Site**.
3. Tick **Use GraphQL Api**.
4. In **URL**, enter the store address **including `https://`**, for example
   `https://my-store.myshopify.com`. Nama adds nothing in front of it, so an address without
   `https://` does not connect.
5. Enter the credentials in one of these two ways:
   - **With an access token.** If the store gave you an Admin API access token, paste it into
     **Ecommerce Generated Application Access Token**. When this field is filled, Nama uses the token
     as it is and ignores the user name and password.
   - **With the app's client ID and secret.** Leave **Ecommerce Generated Application Access Token**
     empty, enter the app's Client ID in **User Name (Consumer Key)** and its Client Secret in
     **Password (Consumer Secret)**. Nama asks Shopify for an access token by itself, keeps it, and
     asks for a fresh one shortly before it expires, so nobody has to renew anything by hand.
6. Fill in the order settings (books, terms, customers, payment-method lines, statuses) as described in
   the [e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md).
7. Link your warehouses to Shopify locations (see [Stock quantities](#Stock-quantities) below).
8. Save.

![A Shopify Site with Use GraphQL Api ticked, the store address in URL and an Admin API access token](../../ar/modules/ecommerce/images/shopify-site-main-en.png)

## Reading orders from Shopify

When **Read Sales** runs, Nama asks Shopify for orders newer than the last order it has already read and
created after the start date. The start date is the one you give **Read Sales From Date**, or otherwise
the point the previous read reached. The date is written into the search using the site's
**Date Pattern**. For the very first read, use **Read Sales From Date**: with no start date Nama
begins at the store's oldest order and brings in its whole history.

The statuses in **Only Transfer Orders With Status Equal to One of The Following** are passed to
Shopify one at a time, so they must be Shopify order statuses such as `open`, `closed` or `cancelled`.
Nama reads all the orders in the first status, then moves on to the next. Orders in the statuses
listed in **Read Orders As Sales Return If Status Like One Of The Following** are read afterwards and
come in as sales returns. Each read fetches **Max Orders Per Read** orders at a time.

**Read Sales** reports success on screen even when some orders could not be saved. Orders that failed
are listed, with the reason, in the **Log List** on the site's **Statistics** tab, where
**ReRead Selected Orders** tries them again once the cause is fixed.

### Payment methods

A Shopify order does not carry a payment method name the way other platforms do. A payment-method line
on the site therefore cannot match a Shopify order by method name. Instead, give the line an
**Apply When Query** that recognises the orders it should apply to. The
[e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md) explains how
payment-method lines and their queries work.

### What is not sent back to Shopify

Nama reads orders from Shopify but does not change them there. When the sales document is saved in
Nama, the Shopify order keeps its status: the status settings that update the order in the shop do not
change Shopify orders. Fulfil, close or cancel the order in Shopify itself.

## Sending products, prices and quantities

::: tip The server must allow sending
Nothing is sent from Nama to any shop (products, prices or quantities) unless the server's
`nama.properties` file contains `send-ecommerce-data=true`.
:::

Nama finds a product in Shopify by its SKU. The SKU is the one in the **Magento Item Linker** for that item, or the
item code when the item has no linker line. Keep the SKUs in Shopify identical to those in Nama, or
Nama cannot find the product to update.

### Products

When an item is saved and the site is set to send items (**Send Items To Magento** and its related
settings, explained in the shared guide), Nama looks for the SKU in Shopify. If the product is not
there it creates it; if it is there it updates it. Nama sends the SKU, the item's Arabic name (Name1) and
its current price.

### Prices

Prices are sent from the **Magento Price Updater Doc**. A base price becomes the product's price in
Shopify. A sale price is sent the Shopify way: the sale price becomes the product's selling price and
the regular price becomes its *compare-at price*, so Shopify shows the old price crossed out next to
the new one.

### Stock quantities

Shopify keeps stock per location (a shop, a warehouse, a fulfilment centre), so Nama sends quantities
per location too. This is why the **Link Ecommerce Warehouses By Nama** grid is required for Shopify:
without it, quantity updates stop with an error.

Add one row per Nama warehouse whose stock should reach Shopify:

| Column | What to enter |
|---|---|
| **Warehouse** | The Nama warehouse. |
| **Ecommerce Warehouse Id** | The Shopify location ID. Either the number, for example `71234567890`, or the full form `gid://shopify/Location/71234567890`. The number is the last part of the location's page address in the Shopify admin. |

Each warehouse's quantity goes to its own location. A warehouse that has no row is not sent. Shopify
counts stock in whole units, so quantities are sent as whole numbers, and any fraction is dropped:
12.75 is sent as 12.

Quantities are sent automatically whenever stock moves. To resend the quantities of every item, for
example after linking the warehouses for the first time, press **Update All Qtys**.

## Changing the queries Nama sends

Every call Nama makes to Shopify (listing orders, reading one order, finding a product, creating or
updating a product, and updating a price, a sale price or a quantity) uses a built-in GraphQL query.
The **Graph QL Lines** grid lets you replace one of them, for example to read an extra order field
that your payment-method queries need.

Leave the grid empty to use the built-in queries. To change one, add a row and choose its
**Operation Type**; Nama fills **Graph Query** and **Variables Fields Map As JSON (Root Entity order/item)**
with the built-in version, which you can then edit. Only the operations that have a row are replaced;
the rest keep their built-in queries. This is advanced work and is normally done by Namasoft support.

## When Shopify is busy

Shopify limits how many requests a store may receive in a short time. When it answers that Nama is
sending too fast, Nama waits and tries again, waiting a little longer each time, up to 10 attempts.
Only after the tenth refusal does the operation fail.

## Messages you may see

These messages have no Arabic translation, so they appear in English on both the English and the Arabic
screens. Errors in reading orders appear in the **Log List**; errors in sending products, prices or
quantities appear on the matching request list on the **Statistics** tab. When Shopify itself rejects a
request, its own message is shown as it is.

| Message | Why | What to do |
|---|---|---|
| `Failed to fetch Shopify access token: {0} - {1}` | Shopify refused the Client ID and Client Secret. `{0}` and `{1}` are Shopify's error and its description. | Check the Client ID in **User Name (Consumer Key)**, the Client Secret in **Password (Consumer Secret)**, and the **URL**. |
| `Failed to fetch Shopify access token: {0}` | Nama could not get a token from Shopify, for example because the store address is wrong or unreachable. | Check that **URL** is the store address with `https://`. |
| `Failed to fetch Shopify access token: empty response` | Shopify returned nothing when Nama asked for a token. | Check the **URL** and try again. |
| `You are using shopify graph ql, you need to link nama warehouses with ecommerce stores by the grid {0}` | A quantity update was attempted while **Link Ecommerce Warehouses By Nama** is empty. | Fill the grid with your warehouses and their Shopify location IDs. |
| `Wrong Location id format` followed by the value | An **Ecommerce Warehouse Id** is neither a number nor a `gid://shopify/Location/` ID. | Correct the location ID in the grid. |
| `Error while finding item with sku {0} in ecommerce site {1}, API Exception : {2}` | Nama could not look up the product with that SKU in Shopify. `{2}` is the underlying error. | Read the error in `{2}`; check the connection and the SKU. |
| `Failed to execute Shopify GraphQL query because of API throttling after 10 retries` | Shopify kept refusing requests because too many arrived in a short time. | Try again later. The failed request can be retried from its list on the **Statistics** tab. |
