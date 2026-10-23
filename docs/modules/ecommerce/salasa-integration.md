---
entities: [EcommerceShippingSite, MAGMagentoSite]
menu: e-Commerce Integration → Master Files → Ecommerce Shipping Site
---

# Salasa Integration

This page explains how to connect Nama ERP to Salasa, the fulfilment (3PL) company that stores your goods in its warehouses and ships your orders: the two records to set up, how Salasa's webhooks reach Nama, and which Nama documents each Salasa event creates or updates.

Salasa is not an online shop. It is the warehouse and the delivery service behind your shops. Once stock is sitting in Salasa's warehouse, the interesting things happen on Salasa's side: a replenishment arrives, a customer sends goods back, a shipment moves from *processing* to *delivered*, or an order comes in from Jahez. Salasa tells Nama about each of these by calling a webhook, and Nama turns the call into a document or an update. Nama does not poll Salasa for orders. The one thing Nama reads from Salasa on request is a snapshot of the stock Salasa holds, through the entity flow [EAReadSalasaInventoryData](/entity-flows/magento/EAReadSalasaInventoryData.md).

## Two records, two jobs

The connection is set up on two records:

1. **An Ecommerce Shipping Site with Type = Salasa.** This is the main record. It holds the Salasa credentials, the list of webhooks, the warehouses, and the books and terms of the documents Nama creates from Salasa's events. Almost all the set-up happens here.
2. **A Magento Site with Site Type = Salasa.** This one has a single job: it is the import configuration for orders that Salasa forwards from Jahez. Nama saves those orders exactly as it saves orders from any online shop, so it needs the usual order settings (document type, book and term, customers, payment methods, item linking), and those live on a Magento Site. The screen is called **Magento Site** in both languages even when the record is not a Magento shop. It needs the `magento` licence.

The shipping site points to the Magento Site through **Save Salasa Orders Using Magento Site**, so create the Magento Site first.

## Step 1: the Magento Site for Jahez orders

1. Open the **Magento Site** screen and create a record with **Site Type** = Salasa. Nama clears **URL** when you pick Salasa; leave it empty, because Salasa orders never come from an address on this record.
2. Fill the order settings as for any online shop: **Order Info** (the document type, book and term of the order Nama creates), the customer settings, the payment-method lines and the item linking. The [e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md) explains each of them.
3. Save the record.

Orders reach this record only through the Salasa webhooks described below. Only orders whose platform is Jahez are saved this way; the order number Nama keeps is Salasa's original order number.

## Step 2: the Ecommerce Shipping Site

Open **e-Commerce Integration → Master Files → Ecommerce Shipping Site** and create a new record. **Type** starts as Oto; change it to **Salasa**. Everything below is checked when you save, so it is easiest to fill it all in one go.

### Credentials (Main tab)

| Field | What to enter |
|---|---|
| Username | Your Salasa **account number**. |
| Password | Your Salasa **secret**. |
| Nama API Key | A Nama API key. Its secret is handed to Salasa when the webhooks are created, and Salasa sends it back with every webhook call. Nama accepts the call only with that key and does the work as the key's user, so that user needs the right to create stock transfers, sales returns and stock issues and to edit sales invoices and sales orders. |

**URL** is not used for Salasa; Nama already knows Salasa's address. Nama signs in to Salasa with the account number and secret, keeps the access token Salasa returns on the record, and reuses it until it expires.

### Status To Run Entity Flow (Main tab)

This grid tells Nama what each Salasa shipment status means for your documents. Each line pairs a Salasa **Status** with the Nama delivery status to set, in **Change Delivery Status To**. The grid needs at least one line, and the status must be typed exactly as Salasa sends it — the suggestion list offers the valid ones:

`shipped`, `in transit`, `delivered`, `pending`, `processing`, `return`, `cancelled`, `backorder`

A typical grid:

| Status | Change Delivery Status To |
|---|---|
| processing | NotDelivered |
| shipped | Delivering |
| in transit | Delivering |
| delivered | Totally Delivered |
| cancelled | Cancelled |

Salasa uses only these two columns; leave **Entity Flow** empty. A status that has no line in the grid is recorded in the log but changes nothing on the document.

![The Main tab of an Ecommerce Shipping Site of type Salasa, with the credentials, the Nama API key and the Status To Run Entity Flow grid](../../ar/modules/ecommerce/images/salasa-shipping-site-main-en.png)

### Salasa Auto Generation (Salasa tab)

| Field | What it is for |
|---|---|
| Save Salasa Orders Using Magento Site | The Magento Site from step 1. It must be a Salasa site. |
| Magento Item Linker | The item linker that translates Salasa SKUs into Nama items. Every SKU Salasa sends must appear in it, once. |
| Stock Transfer Book Generated By Salasa / Stock Transfer Term Generated By Salasa | Book and term of the stock transfer Nama creates when a replenishment arrives. Required. |
| Warehouse / to Warehouse | The two warehouses of that stock transfer: goods move from **Warehouse** to **to Warehouse**. For example, from your main warehouse to a warehouse named "Salasa Riyadh" that stands for Salasa's stock. Both are required. |
| Sales Return Book Generated By Salasa / Sales Return Term Generated By Salasa | Book and term of the sales return Nama creates when Salasa receives a return. |
| Generated Sales Return Save Behavior | Whether that sales return is saved as a draft (the default, when the field is empty) or with **Save And Commit**. |

### Salasa Webhooks (Salasa tab)

List the events you want Salasa to send, one per line, spelled exactly as below. The grid cannot be empty, and a line that repeats an event is removed when you save.

| Event | What Nama does with it |
|---|---|
| `replenishment_received` | Creates a stock transfer for the goods Salasa received. |
| `return_received` | Creates a sales return, and a stock issue for damaged goods. |
| `order_created` | Saves a Jahez order, or updates delivery information for other orders. |
| `order_updated` | Same as `order_created`. |
| `stock_updated` | Updates delivery information when the call carries an order. |

The next section explains each one in detail.

### Creating the webhooks in Salasa

Save the record, then press **Create Webhook In Salasa** on the Salasa tab. For every event in the grid, Nama asks Salasa to create a webhook that calls your Nama server for that event, and gives Salasa the Nama API key's secret to send with each call. The webhook address is built from your server's public ERP address, so Salasa must be able to reach that address from the internet; if you are not sure it is configured, ask Namasoft support.

The action asks **Force Generate New Access Token**. Leave it unticked normally. Tick it when you have just changed **Username** or **Password**, or when Salasa refuses the stored token, so that Nama signs in to Salasa again before creating the webhooks.

Press the action again whenever you add an event to the grid.

## What each Salasa event does

### A replenishment arrives: a draft stock transfer

When Salasa receives a delivery of your goods (`replenishment_received`), Nama creates a **Stock Transfer** from **Warehouse** to **to Warehouse**, with the book, term and dimensions from the shipping site. Each line is a SKU Salasa received, turned into an item through the **Magento Item Linker**, with the quantity Salasa received in the linker line's unit.

The transfer is saved as a **draft**, so someone checks it and commits it. Suppose Salasa reports 120 units of SKU `TSHIRT-RED-M` and 40 of `TSHIRT-RED-L`: a draft transfer with those two lines appears, waiting to be committed.

If a SKU is not in the **Magento Item Linker**, no transfer is created and Salasa's call fails with:

```
Could not find sku {0} in linker file {1}
```

Add the SKU to the **Magento Item Linker**. The replenishment is not resent automatically, so enter that transfer by hand.

### A return is received: a sales return and a stock issue

When Salasa receives goods a customer sent back (`return_received`), Nama looks for the **Sales Invoice** whose e-commerce order number equals Salasa's original order number — the invoice that was created when the order was imported. If there is no such invoice, nothing is created.

When it finds the invoice, Nama creates:

- a **Sales Return** for that invoice, with the sales return book and term from the shipping site and the date Salasa received the return. It is saved as a draft or committed according to **Generated Sales Return Save Behavior**.
- a **draft Stock Issue** for the items Salasa marks as damaged, one line per damaged SKU with the damaged quantity. When nothing is damaged, no stock issue is created. Review it and commit it to take the damaged goods out of stock.

### An order from Jahez: a sales document through the Magento Site

When the call carries an order whose platform is Jahez, Nama hands it to the Magento Site named in **Save Salasa Orders Using Magento Site**, which saves it as a sales order or sales invoice according to its **Order Info**, exactly as it saves an order from any online shop. `order_created` creates the order and `order_updated` updates it; Salasa's original order number becomes the document's e-commerce order number.

### Any other event: delivery status, carrier and shipping number

Every other call — typically `order_created`, `order_updated` or `stock_updated` for an order that came from one of your own shops — updates the order's delivery information in Nama. Nama finds the document by Salasa's original order number:

- the **Sales Invoice** with that e-commerce order number, or
- the **Sales Order** with that number when the order is paid cash on delivery.

It then sets the document's delivery status to the **Change Delivery Status To** of the grid line that matches Salasa's status, and records the carrier and the shipping number Salasa sent. If the status is not in the grid, the document is left as it is.

Each of these calls is recorded in the **Salasa Shipping Event Log** on the **Statistics** tab of the shipping site: the document, the request date, Salasa's status, and the delivery status and shipping company before and after. When a customer asks why an invoice still shows *Delivering*, this log shows the last status Salasa sent.

## Reading Salasa's stock into Nama

Salasa's stock can drift from Nama's: damaged goods, counting differences, returns not yet entered. The entity flow [EAReadSalasaInventoryData](/entity-flows/magento/EAReadSalasaInventoryData.md) reads every stock line Salasa holds for you and saves it as one committed document, so you can report on it and compare it with Nama's own balances. Run it from a Task Schedule with the code of this shipping site; the entity-flow page lists its parameters.

## Messages you may see

These messages appear in English on both the English and the Arabic screens, except the one that has an Arabic text, shown with it. Missing required fields (Nama API Key, Magento Item Linker, Save Salasa Orders Using Magento Site, Warehouse, to Warehouse, Stock Transfer Book Generated By Salasa, Stock Transfer Term Generated By Salasa) raise the standard required-field message.

| Message | Why | What to do |
|---|---|---|
| *Filed: {0} in details can not be empty* — «الحقل {0} في السطور لا يمكن أن يكون فارغاً» | The **Status To Run Entity Flow** grid has no status. | Add at least one Salasa status with its delivery status. |
| *Status: {0} is not a salasa status* | A status in the grid is not one Salasa sends, often a typing or case difference. | Pick the status from the suggestion list. |
| *Salasa webhooks grid can not be empty* | The **Salasa Webhooks** grid has no lines. | Add the events you want Salasa to send. |
| *Event: {0} is not a salasa webhook event* | An event in the webhooks grid is misspelled. | Use one of the five event names above, in lower case with underscores. |
| *The site type in {0} is {1}. It should be of type {2}* | **Save Salasa Orders Using Magento Site** points to a Magento Site that is not a Salasa site. | Choose a Magento Site whose **Site Type** is Salasa, or change that site's type. |
| *Can not generate salasa access token* | Salasa refused the account number and secret when you pressed **Create Webhook In Salasa**. | Check **Username** (account number) and **Password** (secret) with Salasa. |
| *Failed to generate salasa webhook for event: {0}. message: {1}* | Salasa refused to create the webhook for that event; `{1}` is Salasa's own reason. | Act on Salasa's reason, then press **Create Webhook In Salasa** again. |
| *Could not find sku {0} in linker file {1}* | A replenishment contained a SKU that is not in the **Magento Item Linker**. | Add the SKU to the **Magento Item Linker** and enter that transfer by hand. |
