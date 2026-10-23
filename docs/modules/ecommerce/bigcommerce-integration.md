---
entities: [MAGMagentoSite]
menu: e-Commerce Integration → Master Files → Magento Site
---
# BigCommerce Integration

This page explains how to connect a BigCommerce store to Nama ERP: the connection settings, how BigCommerce orders are read into Nama, and how products, prices and stock quantities are sent to the store.

## How the integration works

A BigCommerce store is set up in Nama as one record on the **Magento Site** screen. The screen carries
that name for every platform, not only Magento, so a BigCommerce store is a Magento Site whose
**Site Type** is **BigCommerce Site**. The screen needs the `magento` licence.

Orders come into Nama from BigCommerce and become sales documents; products, prices and quantities go
from Nama to BigCommerce. The settings that every platform shares (books, terms, customers,
payment-method lines, the **Magento Item Linker**, statuses and scheduled reading) are explained in the
[e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md). This page covers only
what is particular to BigCommerce.

## Connecting to BigCommerce

Nama connects with a store-level API account. Create one in the BigCommerce control panel with access to
orders and products. BigCommerce then shows you an **access token** and an **API path** like
`https://api.bigcommerce.com/stores/abc123xyz/v3/`. The part after `/stores/`, here `abc123xyz`, is
the **store hash**.

1. Open **e-Commerce Integration → Master Files → Magento Site** and create a new record.
2. Set **Site Type** to **BigCommerce Site**.
3. In **URL**, enter `https://api.bigcommerce.com/stores/`. This is the same for every store; Nama adds
   the store hash after it.
4. In **User Name (Consumer Key)**, enter the store hash.
5. In **Password (Consumer Secret)**, enter the access token.
6. Fill in the order settings as described in the
   [e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md).
7. Save.

![A BigCommerce Site: the API address in URL, the store hash in User Name and the access token in Password](../../ar/modules/ecommerce/images/bigcommerce-site-main-en.png)

## Reading orders from BigCommerce

**Read Sales** asks BigCommerce for the orders created since the start date: the date you give
**Read Sales From Date**, or otherwise the point the previous read reached. Use
**Read Sales From Date** for the first read, so that Nama knows where to begin.

BigCommerce orders are matched by the status name exactly as BigCommerce shows it, for example
`Pending` or `Awaiting Fulfillment`. Write these names in
**Only Transfer Orders With Status Equal to One of The Following**. If you leave the field empty, Nama
reads `Pending` orders only. Orders whose status is listed in
**Read Orders As Sales Return If Status Like One Of The Following** come in as sales returns.

**Read Sales** reports success on screen even when some orders could not be saved. Orders that failed
are listed, with the reason, in the **Log List** on the site's **Statistics** tab.

Nama reads orders from BigCommerce but does not change them there: neither the order status nor a
comment is sent back to BigCommerce when the sales document is saved. Update the order in BigCommerce
itself.

## Sending products, prices and quantities

::: tip The server must allow sending
Nothing is sent from Nama to any shop (products, prices or quantities) unless the server's
`nama.properties` file contains `send-ecommerce-data=true`.
:::

Nama finds a product in BigCommerce by its SKU: the SKU in the **Magento Item Linker** for that item, or the item
code when the item has no linker line. Keep the SKUs in BigCommerce identical to those in Nama.

- **Products.** When an item is saved and the site is set to send items (**Send Items To Magento** and
  its related settings, explained in the shared guide), Nama creates the product in BigCommerce if its
  SKU is not there yet, or updates it if it is. The product name is the item's English name (Name2),
  and the description is the item's Description 1 and Description 2, one under the other.
- **Prices.** The **Magento Price Updater Doc** sends the base price and the sale price. Only the
  prices are sent, not the sale's start and end dates, so a sale price applies in BigCommerce from the
  moment it arrives until it is changed.
- **Quantities.** BigCommerce receives one total quantity per product, which Nama sends automatically
  whenever stock moves. Leave the **Link Ecommerce Warehouses By Nama** grid empty on a BigCommerce site:
  quantities are not split by warehouse. To resend the quantities of every item, press
  **Update All Qtys**.
