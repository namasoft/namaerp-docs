---
entities: [MAGMagentoSite]
menu: e-Commerce Integration → Master Files → Magento Site
---

# Zid Integration

This page explains how to connect a Zid (zid.sa) store to Nama ERP: the two ways to authorise the connection, how Zid orders are read into Nama, what Nama sends back to Zid (prices and quantities), and how abandoned carts are collected.

A Zid store is set up like every other online shop in Nama: as one record on the **Magento Site** screen. The screen keeps that name in both languages even though it serves many platforms; picking **Zid Site** in **Site Type** is what makes the record talk to Zid. Settings that every platform shares (the books and terms of the documents Nama creates, customers, payment methods, linking items, scheduled reading) are explained in the [e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md). This page covers what is different for Zid. The screen needs the `magento` licence.

## Before you start

Zid does not give Nama a username and password. It hands out an access token after the store owner approves the connection, and Nama renews that token by itself afterwards. There are two ways to get that first token, and which one you choose decides who owns the Zid app:

- **Namasoft's Zid app, through the Namasoft gateway.** The merchant installs Namasoft's app in their Zid store, and Nama collects the token from the Namasoft gateway. You don't need to create anything in Zid. This is the usual choice.
- **The customer's own Zid app.** The customer registers their own app with Zid and Nama asks Zid for the token directly. Choose this when the customer wants the connection to run under an app they control.

Whichever way you choose, two fields on the tab named after Zid must be filled before the record will save:

| Field | What to enter |
|---|---|
| Ecommerce Store ID | The id Zid gives the store. Nama sends it with every product and stock call. |
| Ecommerce App Token | The screen requires a value here. The connection itself signs in with the access token it receives when the store is connected, as described below. |

When you pick **Zid Site**, Nama fills **URL** with `https://api.zid.sa/` and **Redirect URL** with the Namasoft gateway's Zid address. Leave **URL** as it is.

## Connecting through the Namasoft gateway

The gateway is a Namasoft server that receives the merchant's installation of Namasoft's Zid app and keeps the resulting token until your Nama server asks for it. Your server proves who it is with its licence id, so that id has to be the same in both places.

1. Ask Namasoft support for the gateway details: the **Gateway URL (Server Url)**, the **Gateway Client ID** and the **Gateway Client Secret**.
2. Check that your Nama server has the general setting `serverid` set in its `nama.properties` file. Its value is the Nama licence id that the merchant will type in step 3.
3. The merchant installs Namasoft's app from their Zid dashboard and approves it. A page then opens asking for the Nama licence id. The merchant enters the same value as `serverid` and saves it.
4. In Nama, open the **Magento Site** screen and create the record: **Site Type** = Zid Site, plus **Ecommerce Store ID** and **Ecommerce App Token** as described above.
5. Fill the three gateway fields from step 1. They are not on the Zid tab: the gateway fields sit on the tab named after Salla, because Salla and Zid share the same gateway. Save the record.
6. Press **Read Ecommerce Access Token**. Nama asks the gateway for the token that the installation produced and stores it on the record. From then on Nama renews the token on its own.

If the connection later stops being accepted by Zid, pressing **Read Ecommerce Access Token** again fetches the current token from the gateway.

![The Zid Site tab with the Ecommerce Store ID, the Ecommerce App Token and the gateway's Redirect URL](../../ar/modules/ecommerce/images/zid-site-tab-en.png)

## Connecting with the customer's own Zid app

Here the customer's app does the authorising and the token comes straight from Zid. Zid sends the store owner's browser back to a small Namasoft page, which passes the approval on to your Nama server. Use a browser that can reach your Nama server's address.

1. In the customer's Zid partner account, create an app and note its **Client ID** and **Client Secret**. Register `https://www.namasoft.com/googleauth.html` as the app's redirect (callback) URL.
2. Create the **Magento Site** record with **Site Type** = Zid Site and fill:
   - **User Name (Consumer Key)**: the app's Client ID.
   - **Password (Consumer Secret)**: the app's Client Secret.
   - **Redirect URL**: change it to `https://www.namasoft.com/googleauth.html`. The value Nama fills in is the Namasoft gateway's address, which only works with Namasoft's own app.
   - **Ecommerce Store ID** and **Ecommerce App Token** as described above.
3. Save the record, then press **Request Token**. When Nama asks **Use Gateway Server**, answer **No**.
4. A new browser window opens on Zid's authorisation page. Sign in as the store owner and approve the app. Zid returns to the Namasoft page, which shows "Response sent correctly" once your Nama server has the approval and closes itself after ten seconds. Refresh the record: the **Authorization Code** and **Refresh Token** fields are now filled.

Nama renews the token on its own with the Client ID and Client Secret, so leave **User Name (Consumer Key)** and **Password (Consumer Secret)** in place after the connection works.

## How Zid orders reach Nama

Nama reads Zid orders: it asks Zid for new orders each time you press **Read Sales** or **Read Sales From Date**, or when a scheduled reading runs. Zid does not push orders to Nama as they happen, so how fresh the orders in Nama are depends on how often you read. The shared guide explains scheduled reading.

### Which orders are read

**Only Transfer Orders With Status Equal to One of The Following** decides which orders come in. Zid offers no pick list here, so type Zid's status codes yourself, separated by commas. Zid uses these codes:

| Code | Meaning in Zid |
|---|---|
| `new` | New order |
| `preparing` | Being prepared |
| `ready` | Ready for shipping |
| `indelivery` | Out for delivery |
| `delivered` | Delivered |
| `cancelled` | Cancelled |

For example, `ready,delivered` brings in an order once it is ready to ship, and leaves new and cancelled orders in Zid. If the field is empty, orders are read whatever their status.

Returns come in the same way, through **Read Orders As Sales Return If Status Like One Of The Following**: an order whose Zid status is in this list is read as a return and created through the **Return Info** settings. The **Read Returns** button is not used for Zid. A status listed in both fields counts as a return.

### How much is read at a time

- **Max Orders Per Read** sets how many orders Nama asks Zid for in one page. Zid's limit is 100, so a larger value is treated as 100.
- Each read covers up to 100 days. **Read Sales From Date** starts from the date you give it; **Read Sales** and scheduled reading continue from **Orders Updated Until**, the date of the newest order already read. Zid filters by day, not by time of day.
- Make the first read with **Read Sales From Date**. While **Orders Updated Until** is still empty, a plain **Read Sales** asks Zid for the store's whole order history.
- Nama fetches every order's full details separately, and when Zid asks it to slow down it waits a few seconds and carries on. A large first read can therefore take a while.

Nama recognises a Zid order by its Zid order id, so reading the same order again does not create a second document. The shared guide explains what happens when an order that was already read changes.

Read Sales reports success on screen even when some orders fail. Each order that could not be saved is listed, with its reason, in the **Log List** on the record's **Statistics** tab. Fix the cause there (a missing item, for example) and re-read the orders from the list.

### What comes over with each order

- **Lines**: the SKU, quantity and price of each product. Nama matches the SKU to your items as the shared guide describes. When Zid sends a line without a SKU, Nama looks the product up in Zid and uses its SKU. A product sold at a discount brings that discount as a line discount.
- **Coupons**: a coupon discount on the order is spread over the lines as a percentage.
- **Shipping and cash on delivery**: the shipping charge and any shipping discount, the cash-on-delivery fee and any cash-on-delivery discount come over with the order. The shipping method's code maps through the shipping settings in the shared guide.
- **Payment**: the payment method's code, name and amount, mapped through the payment methods described in the shared guide.
- **Customer**: the name, email and mobile number. Zid keeps the customer's name as one value, so there is no separate last name.
- **Shipping address**: the recipient's name, email and mobile number, the city and the country.

Zid answers Nama in Arabic, so city names and payment and shipping method names arrive in Arabic.

Some things do not come over from Zid: the street, district, building number and postal code of the address; the customer's last name; payment transactions and their transaction numbers; and product options such as size and colour.

## What Nama sends to Zid

Nama finds the Zid product for an item by its SKU, so the SKU in Zid must match the SKU Nama holds for the item (the shared guide explains how items are linked). Nama then keeps the following up to date on that product:

- **Price**: the item's price.
- **Sale price**: a special price together with its start and end dates, which Zid shows as a sale for that period.
- **Quantity**: the item's stock, either as one total or per Zid location (see below).

The shared guide explains when prices and quantities are sent and how **Update All Qtys** resends every quantity. Nama does not send categories, images, descriptions or customers to Zid.

::: tip Sending must be switched on for the server
Nothing is sent to any shop unless the server's `nama.properties` file contains `send-ecommerce-data=true`.
:::

### Quantities per Zid location

If the store keeps stock in more than one Zid location (inventory location), you can send each location its own quantity. Fill the **Link Ecommerce Warehouses By Nama** grid: one row per Nama warehouse, with the Zid location in **Ecommerce Warehouse Id**. For a Zid site that column offers a list of the store's Zid locations, so you can pick the location instead of typing its id.

With the grid filled, each listed location receives the quantity of its Nama warehouse, and warehouses that are not in the grid are not sent. Zid locations receive whole numbers: a fractional quantity is cut to its whole part, so 7.5 is sent as 7. With the grid empty, Nama sends one total quantity for the product.

## Abandoned carts

Zid is the only platform from which Nama reads abandoned carts, meaning carts a shopper filled but never checked out. They are useful for follow-up calls and offers. Carts are read by the entity flow [EAEcommerceReadAbandonedCarts](/entity-flows/magento/EAEcommerceReadAbandonedCarts.md), normally run from a scheduled task. Its first parameter is the site's code and its second is how many carts to read per call (50 if left empty).

Each cart is saved as a document, chosen through the **Generate Document Based On Order Criteria Lines** grid. Add a row whose **Ecommerce Entity Type** is **Abandoned Cart** and give it the **Import As**, book and term you want carts kept as, such as a sales quotation. Without such a row, carts are saved with the **Order Info** settings, the same as real orders.

Each run reads up to 100 days of carts, starting from the record's **Last Abandoned Cart Read Date**, and moves that date forward as carts are saved.

## Messages you may see

These messages have no Arabic translation, except the two noted in the table, so they appear in English on Arabic screens too.

| Message | Why | What to do |
|---|---|---|
| *You can use this button only with zid and salla* — «لا يمكن استخدام الزرار الا لمتجر زد وسلة» | **Request Token** was pressed on a record whose Site Type is neither Zid nor Salla. | Set **Site Type** to Zid Site first. |
| *Please fill field Gateway URL* — «من فضلك ادخل قيمه الحقل Gateway URL» (Arabic on the Request Token button only) | **Read Ecommerce Access Token** needs the gateway address. | Fill **Gateway URL (Server Url)** on the tab named after Salla. |
| *Please set General Setting serverid* | The server has no licence id to send to the gateway. | Set the `serverid` general setting to your Nama licence id. |
| *Please set Gateway Client Id* / *Please set Gateway Client Secret* | One of the gateway credentials is empty. | Fill it with the value Namasoft support provided. |
| A message beginning *Gateway returned*, followed by a status code and the gateway's reason | The gateway refused the request. A reason such as *No installation matched the supplied license id* means no Zid installation is registered under your licence id. | Check that the merchant installed Namasoft's app and entered the same licence id as `serverid`, and that the gateway credentials are correct. |
| *Gateway did not return a token* | The gateway answered but had no token for this store. | Make sure the merchant finished installing the app, then press **Read Ecommerce Access Token** again. |
| *Failed to {0} error code: {1} message: {2}* | Zid refused a call, such as a price or quantity update. `{0}` names the action and `{2}` is Zid's own explanation. | Act on Zid's explanation. A product not found usually means the SKU in Zid does not match the item. |
| *method readReturns not implemented for site of type {0}* | **Read Returns** was pressed on a Zid site. | Returns come in through **Read Orders As Sales Return If Status Like One Of The Following** when you read sales. |
| *The method readAbandonedCart is available for sites with type ZID only* | The abandoned-cart entity flow was run for a site that is not a Zid site. | Pass the code of a Zid site. |
| *Another readAbandonedCarts is already running for site {0} ; skipping to avoid blocking on long-running JDBC work.* | An earlier abandoned-cart read for the same site was still running. | Nothing; the next run continues. If it happens often, schedule the flow less often. |
| *Can not find site with code {0}* | The site code passed to the entity flow does not exist. | Correct the code in the scheduled task's parameters. |
