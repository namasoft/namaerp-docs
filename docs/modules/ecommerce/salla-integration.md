---
entities: [MAGMagentoSite]
menu: e-Commerce Integration → Master Files → Magento Site
---
# Salla Integration

This page explains how Nama ERP works with a Salla store: connecting the store, bringing Salla orders and returns into Nama, sending prices and stock quantities to Salla, and receiving new orders within a minute through webhooks.

A Salla store is set up in Nama as a **Magento Site** record with **Site Type** = **Salla Site**. The screen keeps the name "Magento Site" in both languages for every platform, not only Magento. The screen needs the `magento` licence. Settings that every platform shares, such as the document books and terms, customers, payment methods, the Magento Item Linker, statuses and scheduled reading, are explained in the [e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md). This page covers only what is specific to Salla.

## What moves in each direction

| Direction | What | How |
|---|---|---|
| Salla → Nama | Orders, including bundle products, shipping cost, cash-on-delivery fee and payments | **Read Sales** / **Read Sales From Date**, scheduled reading, or webhooks |
| Salla → Nama | Returns | Orders in a return status, or the refund webhook event |
| Salla → Nama | Cancellations | The cancel webhook event |
| Nama → Salla | Prices and sale prices | **Magento Price Updater Doc** |
| Nama → Salla | Stock quantities, either one total or per Salla branch | Stock changes, or **Update All Qtys** |

Order status is not sent back to Salla. Nama does not change a Salla order's status or add notes to it, so on a Salla site leave **Change Request Status With Sales Document Commit** unticked and the **Update Magento Order Status To** grid empty.

## Connecting the store

Salla works with apps. A merchant installs an app in their store, and the app receives a token that lets it read orders and update products. There are two ways to connect: through the Namasoft app on the Namasoft gateway, which is the usual way, or through the customer's own Salla app.

Whichever way you choose, start the same way. Create a new Magento Site and set **Site Type** to **Salla Site**. Nama then fills in **URL** and **Redirect URL** (on the Salla Site tab) for you. Leave them as they are. The Salla Site tab also holds every other Salla-only field.

### Through the Namasoft app (recommended)

In this setup the merchant installs Namasoft's app from Salla. The Namasoft gateway receives the store's token and passes it on to the customer's own Nama server.

1. **The merchant installs the Namasoft app** from the Salla app store. After installation, Salla opens a Namasoft page that asks for the **Nama licence id**. The merchant types it and presses **Save license id**. Without this step the customer's server cannot collect the token later.
2. **The merchant keeps the installation email.** A message titled "Nama ERP Salla installation registered" goes to the email address of the merchant's Salla account. It contains the store's **Merchant ID**.
3. **Check the licence id on the server.** The licence id the merchant typed must be the same as the `serverid` general setting (in the `nama.properties` file) on the customer's Nama server. That match is how the gateway finds the right store.
4. **Fill in the Magento Site.**
   - **User Name (Consumer Key)** and **Password (Consumer Secret)**: the Namasoft app credentials, which Namasoft support provides.
   - **Merchant Id**: the number from the installation email. Nama does not fill it in for you.
   - On the Salla Site tab: **Gateway URL (Server Url)** is already filled with the Namasoft gateway address. **Gateway Client ID** and **Gateway Client Secret** are provided by Namasoft support.
5. **Save, then press Read Ecommerce Access Token** on the main tab. Do this soon after the merchant installs the app. Nama fetches the store's token from the gateway and saves it in **Refresh Token**. The site can now read orders and update products.

::: warning Keep User Name and Password filled
Salla tokens expire. Nama renews them automatically, and it uses **User Name (Consumer Key)** and **Password (Consumer Secret)** to do it. If those two fields are empty, the site works only until the first token expires. After that, every call fails with "User Name is missing" or "Password is missing".
:::

![The Salla Site tab with the Redirect URL and the Namasoft gateway fields filled](../../ar/modules/ecommerce/images/salla-site-tab-en.png)

### Through your own Salla app

A customer who has registered their own app with Salla can connect it directly.

1. Put the app's **Client ID** in **User Name (Consumer Key)** and its **Client Secret** in **Password (Consumer Secret)**.
2. Set **Redirect URL** to the callback URL registered in the Salla app. Namasoft support can tell you which callback URL to register.
3. Save, then press **Request Token** on the main tab. When it asks **Use Gateway Server**, answer No.
4. Salla's authorisation page opens in a new window. Sign in and approve the app. The browser then shows "Authorization updated", and Nama stores the tokens in **Authorization Code** and **Refresh Token** on the Salla Site tab.

Renewal works as it does for the Namasoft app: the app's client id and secret must stay in **User Name (Consumer Key)** and **Password (Consumer Secret)**.

## Orders coming into Nama

**Read Sales** continues from where the last read stopped (**Orders Updated Until** on the main tab). **Read Sales From Date** starts from a date you choose. Salla filters orders by day, so the time part of that date is ignored. Orders already in Nama are not created twice. To read automatically, use a scheduled task, as described in the shared guide. Leave **Date Pattern** empty for Salla, because the default pattern already matches Salla's dates.

The document Nama creates, and its book and term, come from **Order Info** and the related settings described in the shared guide. Nothing about that is Salla-specific. Each document records the Salla **order number the merchant sees**, so the order is easy to find from either side.

### Choosing which orders to read

**Only Transfer Orders With Status Equal to One of The Following** limits reading to orders in particular Salla statuses. On a Salla site this field offers a suggestion list that Nama reads live from your store, so the list includes any custom statuses the merchant has added. The site has to be saved and connected before the list can load. Every status you pick is added to the list. Leave the field empty to read orders in every status.

**Read Orders As Sales Return If Status Like One Of The Following** offers the same suggestion list. Orders in these statuses are read as returns and saved using the **Return Info** settings. A status that appears in both lists counts only as a return status.

### Lines, bundles, shipping and payments

- **Items** are matched by **SKU**, using the **Magento Item Linker** or the item code, exactly as described in the shared guide. Each line's price, discount and tax come from Salla's line amounts.
- **Bundles.** A Salla bundle ("group products") arrives as one line for each component product, not as one line for the bundle. The bundle's discount and tax are shared out across the component lines. Each component therefore needs its own SKU linked in Nama.
- **Shipping cost** becomes the shipping service line. The shipping company's name is the order's shipping description, so you can use it to choose a different shipping item for each courier. **Salla's cash-on-delivery fee** becomes the **Delivery Service Item** line.
- **Customer and address.** The customer's name and email come from the Salla customer. The address comes from the shipping receiver: name, phone, email, city, country, address line, street number and postcode. Salla sends no separate billing address.
- **Payments.** Each payment method used on the order arrives as its own payment, with its name, amount and transaction reference. Payment methods are matched as described in the shared guide. Salla does not supply payment transactions, so a payment-method row that relies on transaction types never matches a Salla order. Leave **Validate Order Payment Transactions** off for Salla.

### When an order fails

Since August 2026, one bad order no longer stops the whole read. If an order cannot be saved, for example because one of its SKUs is not linked to any Nama item, Nama records it as an error and carries on with the rest of the orders. **Read Sales** still reports success on screen when some orders fail, so check the **Log List** on the site's **Statistics** tab after a read. Each row shows the order number and the reason. Fix the cause, then select the row and use **More → ReRead Selected Orders**. Once the order saves, the row is removed. **Delete Error** clears rows you no longer need.

When Salla itself refuses a request, Nama shows Salla's own error text as Salla wrote it.

## Prices and quantities going to Salla

::: tip Nothing is sent until the server allows it
Nama sends nothing to any online store unless the server's `nama.properties` contains `send-ecommerce-data=true`.
:::

To find a product in Salla, Nama looks it up by SKU: the SKU in the **Magento Item Linker**, or otherwise the item code.

**Prices** are sent from a **Magento Price Updater Doc**. The price chosen by **Original Price Source** becomes the product's price in Salla. The price chosen by **Special Price Source** becomes Salla's sale price. In Nama, a line's sale price is sent only when both **Special Price From Date** and **Special Price To Date** are filled. Salla receives only the end date, **Special Price To Date**. The start date is not sent.

**Quantities** follow the site's quantity settings in the shared guide. Nama sends a quantity whenever stock changes, and **Update All Qtys** resends everything. By default Salla receives one total quantity per product.

### Quantities per Salla branch

If the merchant keeps stock per branch in Salla, fill the **Link Ecommerce Warehouses By Nama** grid on the main tab. Each row links a Nama **Warehouse** to a Salla branch. Type the branch's numeric id from Salla in **Ecommerce Warehouse Id**. There is no lookup for Salla branches.

Once the grid has rows:

- Nama sends a separate quantity for each linked warehouse to its branch, and no longer sends the total.
- The branch quantity in Salla is **overwritten** with Nama's figure. It is not adjusted up or down.
- Quantities are sent as whole numbers, so a stock of 7.5 is sent as 7.
- Stock in warehouses that are not in the grid is not sent to Salla.

For example, the Riyadh warehouse is linked to branch `1873245` and the Jeddah warehouse to branch `1873246`. A sale from the Jeddah warehouse updates only the Jeddah branch in Salla.

## Receiving orders live (webhooks)

Reading on a schedule leaves a gap between the time a customer orders and the time the order reaches Nama. Webhooks close most of that gap. Salla tells the Namasoft gateway about each order event, and your Nama server collects the waiting events from the gateway **once a minute**.

### Setting it up

1. **Ask Namasoft support to enable webhook forwarding** for the store. They need the store's **Merchant Id**, and they give you the value to put in **Webhook URL**.
2. On the Salla Site tab, fill **Webhook URL** and tick **Pull Webhook Events From Gateway**. Saving with this box ticked requires **Merchant Id**, **Gateway URL (Server Url)**, **Gateway Client ID** and **Gateway Client Secret**.
3. Save, then press **Register Webhooks** on the Salla Site tab. This subscribes the store to the four order events listed below.
4. Optionally, choose a user in **Save Order As User**. Orders that arrive through webhooks are saved as that user. If it is empty, they are saved as `admin`.

**Last Gateway Read Date Time** on the Salla Site tab shows how far Nama has read. Events are processed oldest first.

### What each event does

| Salla event | What Nama does |
|---|---|
| Order created | Saves the order, the same way **Read Sales** would |
| Order updated | Same as order created. This is how an order that was skipped earlier comes in once it is ready (see below) |
| Order cancelled | Cancels the order's Nama document. For this, add a row in **Generate Document Based On Order Criteria Lines** with **Ecommerce Entity Type** = **Cancel Or Reject Order** and **Import As** = **Document Cancel Document**. If the original order is not in Nama, the event is ignored |
| Order refunded | Creates a return document, using **Return Info** or a row with **Ecommerce Entity Type** = **Order Return** |

The order is built from the event itself. Nama does not read it from Salla again.

**Do Not Save Webhook Order Without Shipment** holds orders back until Salla has created a shipment for them. When the box is ticked, create and update events are skipped until the order has a shipment, so the order arrives with a later "order updated" event. Use it when your documents need the shipment number or courier.

If an event cannot be saved, it goes to the **Log List** like any other failed order and is not collected again. Fix the cause and use **ReRead Selected Orders**. Webhooks and scheduled reading can run together, and scheduled reading then acts as a safety net, because an order already in Nama is not created twice.

## Messages you may see

These messages have no Arabic translation, so they appear in English on Arabic screens too. The one exception is noted in the table.

| Message | Why | What to do |
|---|---|---|
| *Please set General Setting serverid* | **Read Ecommerce Access Token** was pressed, but the server has no `serverid` general setting. | Set `serverid` to the licence id the merchant saved during installation. |
| *No installation matched the supplied license id* (shown after "Gateway returned" and a status code) | The gateway has no installation for this server's licence id. Either the merchant never pressed **Save license id**, or they typed a different licence id from `serverid`. | Make the two match. If needed, have the merchant open the app's page again and save the licence id. |
| *Gateway did not return a token* | The gateway answered but sent back no token. | Ask Namasoft support to check the store's installation. |
| *Please fill field Gateway URL* | **Gateway URL (Server Url)** is empty. | Restore the gateway address, or ask Namasoft support for it. |
| *Please set Gateway Client Id* / *Please set Gateway Client Secret* | One of the gateway credentials is missing on the Salla Site tab. | Enter the values Namasoft support gave you. |
| *User Name is missing* / *Password is missing* | Nama tried to renew the Salla token, but **User Name (Consumer Key)** or **Password (Consumer Secret)** is empty. | Fill both fields with the app credentials. |
| *Please provide webhook url* | **Register Webhooks** was pressed with **Webhook URL** empty. | Enter the value Namasoft support gave you. |
| *You can use this button only with zid and salla* — «لا يمكن استخدام الزرار الا لمتجر زد وسلة» | **Request Token** was pressed on a site that is not a Salla or Zid site. | Check **Site Type**. |
