---
entities: [MAGMagentoSite]
menu: e-Commerce Integration → Master Files → Magento Site
---
# OTO Stock Synchronisation

This page explains how Nama ERP keeps the stock quantities in OTO's fulfilment locations in step with the quantities in your Nama warehouses.

OTO is a fulfilment and shipping platform. When OTO holds your stock in its locations, the shops it serves sell from the quantities OTO knows about. If those figures drift away from Nama's, OTO either sells stock you no longer have or refuses orders for stock you do have. The OTO site in Nama prevents that: whenever stock changes in a linked Nama warehouse, Nama sends the new figure to the matching OTO location.

The connection works in one direction only. Nama sends stock quantities to OTO; it does not read orders, prices or products from OTO, and it does not send products or prices to it.

Like every other platform, OTO is set up on the **Magento Site** screen, which keeps that name for every platform, not only Magento. The screen needs the `magento` licence. The quantity settings that every platform shares are explained in the [e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md).

## Setting up the OTO site

1. Create a new **Magento Site** and set **Site Type** to **OTO Updater**.
2. In **Password (Consumer Secret)**, paste the API refresh token from your OTO account. Nama uses it to obtain a fresh access token whenever it sends quantities. You do not need to fill **URL**: Nama always talks to OTO's own address.
3. Fill the **Link Ecommerce Warehouses By Nama** grid. Each row links a Nama **Warehouse** to an OTO location: put the OTO location code in **Ecommerce Warehouse Id**. The site cannot be saved while this grid is empty, because OTO keeps every quantity per location.
4. Fill the **QTy Update Configuration** grid so it covers the items and warehouses you want to send, exactly as for any other platform (see the shared guide).
5. Save.

::: tip Sending must be switched on for the server
Nama sends nothing to any shop or platform unless the server's `nama.properties` file contains `send-ecommerce-data=true`.
:::

![The Link Ecommerce Warehouses By Nama grid of an OTO site: each Nama warehouse with its OTO location code](../../ar/modules/ecommerce/images/oto-warehouse-links-en.png)

## What OTO receives

Whenever the stock of an item changes in one of the linked warehouses, Nama calculates the item's quantity the same way it does for every platform: the quantity basis, the minimum-quantity rule and the rounding all come from the site's quantity settings. It then sends that figure to the OTO location linked to the warehouse.

- **OTO replaces its quantity with Nama's.** The figure Nama sends becomes OTO's quantity for that item in that location; it is not added to what OTO already had. Sending the same figure twice therefore changes nothing.
- **Each location is updated separately.** A sale from the Riyadh warehouse updates only the OTO location linked to Riyadh.
- **Warehouses that are not in the grid are not sent.** Their stock never reaches OTO.
- **Quantities are whole numbers.** A stock of 12.5 is sent as 12.
- **Items are identified by SKU:** the SKU in the **Magento Item Linker**, or the item code when there is none. The SKU must exist in OTO.

To push every item's quantity again, for example after setting up a new location, press **Update All Qtys** on the site.

## When a location update fails

If OTO refuses an update, the quantity request fails with a message that names the location and repeats OTO's own answer, line by line:

`Failed to update quantities for warehouse with code: {code}`

followed by `caused by :` and each field of OTO's response. The text is built from OTO's reply, so it appears in English on Arabic screens too. Failed requests stay in the **Items Quantities Change Requests** list on the site's **Statistics** tab. Once the cause is fixed (usually an unknown SKU or location code), select them and press **Retry Selected Lines**.

OTO's shipping orders — creating, updating and cancelling shipments for your sales — are a separate feature, set up on the **Ecommerce Shipping Site** screen, not on this site.
