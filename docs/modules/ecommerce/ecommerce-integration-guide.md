---
entities: [MAGMagentoSite, MagentoItemLinker, MagentoPriceUpdaterDoc, EcommerceProductConfig, EcommerceCategoryConfig, MagentoSiteGroup]
menu: e-Commerce Integration → Master Files → Magento Site
---
# E-Commerce Integration Guide

This guide explains the settings that every online shop connected to Nama ERP shares: the shop record, linking items to the shop's products, turning shop orders into sales documents, and sending stock, prices and items back to the shop, with the Magento-specific settings at the end.

Each online shop you sell through is one record on the **Magento Site** screen (**e-Commerce Integration → Master Files → Magento Site**). The screen kept its name from the first platform Nama supported, but it serves every platform: the **Site Type** field decides whether the record talks to Magento, Salla, Zid, Shopify or another platform. The screen needs the `magento` licence, and the licence also sets how many sites can be active at the same time. A business with a Salla store and a Shopify store therefore has two Magento Site records, both active, and needs a licence for at least two sites.

Most of a site's settings work the same way on every platform, and they are explained here. How to connect each platform, and what that platform can and cannot do, is on its own page.

## Supported platforms

| Platform | Site Type | Where to read more |
|---|---|---|
| Magento | Magento Site | This page, including [Magento sites](#Magento-sites) below |
| Salla | Salla Site | [Salla integration](/modules/ecommerce/salla-integration.md) |
| Zid | Zid Site | [Zid integration](/modules/ecommerce/zid-integration.md) |
| Shopify | Shopify Site | [Shopify integration](/modules/ecommerce/shopify-integration.md) |
| WooCommerce | Woo Commerce Site | [WooCommerce integration](/modules/ecommerce/woocommerce-integration.md) |
| BigCommerce | BigCommerce Site | [BigCommerce integration](/modules/ecommerce/bigcommerce-integration.md) |
| Atheer | Atheer Site | [Atheer integration](/modules/ecommerce/atheer-integration.md) |
| Amazon | Amazon / Amazon (Sandbox) | [Amazon order notifications](/modules/ecommerce/amazon-order-notifications.md) |
| Salasa | Salasa | [Salasa integration](/modules/ecommerce/salasa-integration.md) |
| OTO | OTO Updater | [OTO stock synchronisation](/modules/ecommerce/oto-stock-sync.md) |

Omniful is set up on its own screen rather than on a Magento Site; see [Omniful integration](/modules/ecommerce/omniful-integration.md).

## How the pieces fit together

Think of the integration as four conversations between Nama and the shop, all governed by the same site record.

1. **Who is who.** The shop knows its products by SKU; Nama knows them by item. The **Magento Item Linker** screen pairs the two. Where an item has no linker line, Nama assumes the SKU is the item code.
2. **Orders come in.** Nama asks the shop for new orders, when someone presses **Read Sales** or on a schedule, and turns each one into a sales document (an invoice, an order, a return …) using the books, terms, customers and payment settings on the site. Some platforms can also push orders to Nama as they happen; their pages explain how.
3. **Stock goes out.** Every time an item's stock changes in Nama, the site calculates the quantity the shop should show and sends it.
4. **Prices and items go out.** Prices are sent from a **Magento Price Updater Doc**. Items can be created and updated in the shop when they are saved in Nama.

A concrete example: a customer orders two units of SKU `TSHIRT-RED-M` on the shop. Nama reads the order, finds the item and colour through the item linker, finds or creates the customer from the order's phone number, and saves a sales invoice. Committing that invoice lowers the stock, and within moments the shop's quantity for `TSHIRT-RED-M` drops by two.

::: warning Nothing is sent to any shop until the server allows it
Items, prices, stock quantities, order statuses and Magento invoices and shipments reach a shop only when the server's `nama.properties` file contains `send-ecommerce-data=true`. Without it, the outgoing requests are still created and then marked as done with nothing sent. See [Server settings](#Server-settings).
:::

## Setting up a site

1. Open **e-Commerce Integration → Master Files → Magento Site** and create a record. Give it a code and a name, for example `WEB-SA` / "Online store – Saudi Arabia".
2. Pick the **Site Type**. The connection fields (**URL**, **User Name (Consumer Key)**, **Password (Consumer Secret)** and the platform tab) mean different things on each platform, so fill them as the platform's page says. For Magento, see [Magento sites](#Magento-sites).
3. Fill the site's **Legal Entity** and other dimensions. They decide which stock movements the site reacts to (see [Sending stock quantities](#Sending-stock-quantities)) and which dimensions are used when Nama looks up an item's current price for the shop.
4. Fill the order settings: **Order Info** and, if you take returns, **Return Info**, plus the customer and payment settings explained in [Bringing orders in](#Bringing-orders-in).
5. Fill the **QTy Update Configuration** grid if the site should receive stock quantities.
6. Save.

A few general fields are worth knowing:

- **Inactive** switches the site off. An inactive site receives no stock or item updates, and it does not count against the licence.
- **Date Pattern** is the format of the dates the shop sends. Leave it empty unless the platform's page tells you to set it; the default is `yyyy-MM-dd HH:mm:ss`.
- **Max Orders Per Read** is how many orders Nama asks for in one request (25 when empty). Nama keeps asking until it has read everything new, so this sets the size of each request, not a limit on the whole read.

![A Magento Site for a Magento shop: the site type, the shop address and the connection fields on the Main tab](../../ar/modules/ecommerce/images/ecommerce-magento-site-main-en.png)

## Linking items to the shop

Every order line, stock update and price update needs to know which Nama item a shop SKU means. Nama answers that question in this order:

1. A line on a **Magento Item Linker** for this site with that SKU. The line gives the item and, when filled, its **Item UOM**, size, colour and revision.
2. Otherwise, an entry in **Item Codes** — the item's barcodes and alternative codes — whose code equals the SKU. It gives the item together with the size, colour, revision, lot and box recorded on that code.
3. Otherwise, the Nama item whose **code** equals the SKU.

So if your item codes — or the barcodes and alternative codes in Item Codes, which can also carry the size and colour — already match the shop's SKUs, you need no linker for order reading. You need one when the codes differ and you do not want them as item codes in Nama, or when the shop sells an item in a different unit.

### The Magento Item Linker screen

Open **e-Commerce Integration → Master Files → Magento Item Linker** and create a record. Fill **Magento Site**, or **Magento Site Group** when the same items are linked to several shops at once (a Magento Site Group is simply a list of sites). Then add one line per shop product:

- **Item**, and optionally its size, colour and revision.
- **SKU**: the product's SKU in the shop.
- **Item UOM**: the unit the shop sells in. If the shop sells a drink by the carton of 24 under its own SKU, link that SKU with **Item UOM** = Carton; Nama then converts stock into cartons for that SKU and reads one carton per unit ordered.
- **Parent ID**: used for product variations on WooCommerce.

A SKU can appear only once among all the linkers of a site, and the same item with the same size, colour, revision and unit can be linked only once per site. Tick **Allow Multiple SKUs Per Item In Linkers** on the site when the shop really has several products for the same item.

The linker's buttons act on the lines you tick in the **Select** column (**Select All** and **Deselect All** help with long lists):

- **Resend Quantities for Selected Lines** sends the selected items' stock to the shop again. It asks **Quantities Send Type**, explained under [Resending quantities](#Resending-quantities).
- **Update Ecommerce Items** sends the linker's items to the shop as products (see [Sending items](#Sending-items)).

### Link Items To This Site

**Link Items To This Site** is ticked on every new site. While it is ticked, the site sends stock quantities only for items that appear on one of its linkers, and a linker can point at the site only while the option is ticked. Untick it when every item should be sent, for example when the shop's SKUs are simply your item codes. The **Magento Site Items From Linker** list on the site's **Statistics** tab shows the items currently linked.

## Bringing orders in

### When orders are read

- **Read Sales** reads the orders created since the last read. Nama remembers how far it got in the read-only **Orders Updated Until** field on the main tab.
- **Read Sales From Date** asks for a **From Date** (date and time) and reads the orders created since then. Use it for the very first read of a new site, so Nama starts from a date you choose rather than from nothing, and whenever you need to go back further.
- **Reading on a schedule**: create a **Task Schedule** with **Task Type** = **Read Magento Orders** and pick the site in its **Magento Site** field. Each run does exactly what **Read Sales** does. On a multi-branch (replication) installation, these tasks run only at the head office unless **Run In Sites** names the branches. See [Scheduled tasks](/platform/automation-and-rules/scheduled-tasks.md).

Orders that are already in Nama are not created twice, so it is safe to read the same period again.

### Which orders are read

**Only Transfer Orders With Status Equal to One of The Following** lists, separated by commas, the shop statuses whose orders should come in, for example `processing,complete` on Magento. **Read Orders As Sales Return If Status Like One Of The Following** lists the statuses whose orders should come in as returns. After reading the normal statuses, **Read Sales** reads the return statuses too. A status listed in both fields counts as a return status only.

Each platform names and filters its statuses differently, and some offer a pick list. Check the platform's page before filling these fields.

### Which document is created

The **Order Info** group says what an order becomes: **Import As** (Sales Invoice, Sales Order, Sales Quotation, POS Sales Invoice, Sales Return, Sales Return Request or POS Sales Return), its **Book** and its **Term**. The term must belong to the document type in **Import As**. **Return Info** does the same for returns, and **Request Info** for the platforms that send requests (Atheer).

When one shop needs different documents for different orders, for example a sales order for cash-on-delivery orders and a sales invoice for prepaid ones, use the **Generate Document Based On Order Criteria Lines** grid. Each row has an **Ecommerce Entity Type** (Order, Order Return …), an **Apply When Query** run against the order's data, and its own Import As, book and term. Nama uses the first row of the right type whose query returns a result, and falls back to Order Info or Return Info when none does.

How the document is saved:

- By default the document is committed, following any approvals set up for it.
- **Save Order As Draft** saves new documents as drafts, for someone to review and commit. A document that was committed before is committed again.
- **Save Orders As Draft If Errors Occurs** keeps orders from being lost: when an order cannot be committed, Nama saves it as a draft instead.
- An order already imported as a committed document is left alone on later reads. Tick **Update Sales Document Even If It was Read Before** to update it from the shop each time. **Ignore Matched Documents Query** and **Ignore Matched Documents Criteria** let you protect particular documents from being updated, for example those already delivered.

The document's date is the order's creation time. Its currency is the order's currency when a Nama currency has the same code. Its dimensions come from the book. Each document keeps the shop's order number, which is how Nama recognises the order on later reads.

**Returns.** An order in a return status becomes a return document made from the document Nama created for the original order, using Return Info. If the original order was never imported, the return is skipped, unless **Create Invoice For Returns If Invoice Not Found** is ticked: Nama then creates the original document first and the return from it.

### Lines and items

Each order line's SKU is matched to an item as described in [Linking items to the shop](#Linking-items-to-the-shop).

- An unknown SKU stops the order with *un defined item with code {0}*. Tick **Ignore Error If No Item Matches SKU** to save the order without that line instead.
- The quantity is in the unit set by **Magento Item UOM Type** (the base unit when empty), unless the linker line names a unit.
- Size, colour and revision come from the order's product options or from the linker line. **Prefer Specific Dimensions From Linker Than Metadata** makes the linker win.
- **Put SKU In Order Details Item Code** writes the SKU into the line's item code.
- **Read Item Specifications With Order** reads the product options with each line, so field maps can use them.
- **Copy To Details Remarks (Keys Seperated By Comma)** copies the listed order-line keys into the line remarks.

### Customers

Nama looks for the customer in this order:

1. A customer whose **code** is the order's phone number (the billing phone, otherwise the shipping phone).
2. A customer whose mobile is that number, whose code starts with it, or whose e-mail is the order's e-mail. Tick **Search For Customer Using Mobile Only** to leave e-mail out of the search.

When phone numbers arrive in a different format from the one in Nama, for example `+966 5…` against `05…`, write a **Mobile Correction Query**: its first column replaces the phone number before the search.

If no customer is found and **Create Customer If Not Found** is ticked, Nama creates one with the phone number as its code and the name, mobile, e-mail and address from the order; **Customer Fields Map** can fill more fields. Otherwise the document is saved without a customer. An existing customer is updated when the order brings a different name, mobile or e-mail; tick **Update Customer if Exists (Even If No Data Was Changed)** to update it with every order. The order's billing and shipping addresses are copied to the document.

### Prices, discounts and tax

- **Price Type** says whether the shop's prices include tax (**Price Include Tax**) or not (**Price Exclude Tax**). It is required.
- Each line's unit price is the shop's price for the product. **Tax is not read from the order**: Nama calculates it from the item and the document term, exactly as for a document entered by hand.
- **Do Not Update Prices From Price Lists in Orders** is ticked on new sites, so the shop's prices are kept. Untick it to re-price the lines from Nama's price lists.
- Line discounts: a line's discount percent goes to **Put Lines Discount To (Percent)** (Discount 1 when empty), and a line's discount amount goes to **Put Lines Discount 2 To (Percent)** (Discount 2 when empty) as a percent of the line.
- Coupon discounts go to **Put Coupon Discount To (Percent)** (the document's Header Discount when empty).
- The order's header discount goes to the document's header discount, or to a line discount when **Put Header Discount In Line Discount** is filled.
- **From Discount1** … **From Discount4** and **To Discount** in Order Info handle a product sold below its list price: the gap between the shop's original price and the sold price, less the discounts named in the From fields, is put into the discount named in To Discount.

### Shipping, cash on delivery and gift wrapping

These charges become extra service lines on the document:

- **Shipping.** The shipping amount goes to the item of the first **Shipping Service Items** row whose **Apply When Query** matches the order, or whose **Shipping Method Type** equals the order's shipping method. With no matching row it goes to **Shipment Service Item**. A row per courier lets each courier's charge land on its own service item.
- **Cash on delivery fee** goes to **Delivery Service Item**.
- **Gift wrapping** goes to **Gift Wrapping Service Item**.

Charges of zero are not added. Tick **Calculate Service Items Price From Sales Price Lists** to price these lines from Nama's price lists instead of the shop's amounts.

### Payments

Payment lines are added to document types that have them, when **Payment Method Calculate Type** is set:

- **From Site Header**: a payment method whose name contains `cod` or `cash` uses **Cash on delivery Payment Method**; anything else uses **Visa Payment Method**.
- **From Payment Grid**: the first **Payment Methods** row that matches is used. A row matches when its **Apply When Query** matches the order, or its **Payment Method Type** equals the order's payment method, or its **Payment Method Name** equals the method's name. A row can be limited to a period with its From and To dates, which helps when a payment provider changes. When the method is stored elsewhere in the order's data, point **Payment Method Name Type ID** and **Payment Method Name Field ID** at it.

The payment line carries the amount paid. Its authorization number is the payment's transaction id, or the value found at **Authorization Number Path** in the order's data. An order paid in several ways gets one line per payment. **Copy Specific Fields To Payment Line** on a row, or **Copy Payment Line Field Map** on the site, fills more fields of the payment line.

**Validate Order Payment Transactions** makes a payment row with **Copy Only Lines with Transaction Types** match only when the shop reports a payment transaction of those types. Only some platforms report payment transactions; their pages say whether to use this.

### Field maps

Three maps let you copy order data into fields the standard reading does not fill, such as a delivery slot or a gift message:

- **Copy Sales Document Field Map** fills header fields of the document from the order's data.
- **Copy Sales Document Line Field Map** fills line fields from each order line.
- **Header Fields Map** in Order Info, Return Info or Request Info sets header fields of the document from the document itself, for example a fixed salesman.

The rows of **Generate Document Based On Order Criteria Lines** carry their own copies of these maps and of **Customer Fields Map**.

### When an order fails

An order that cannot be saved does not stop the read: Nama records it and carries on with the next order. The **Read Sales** button still reports success, so after a read check **Log List** on the site's **Statistics** tab. Each row shows the order number, the operation and the reason.

1. Fix the cause, for example link the unknown SKU or correct the term.
2. Select the row and use **ReRead Selected Orders** from the list's actions. Nama reads that order from the shop again; when it saves, the row disappears.
3. **Delete Error** removes rows you no longer need.

To hear about failures without watching the list, pick a notification in **Order Read Error Notification**; it is sent for every failed order. To fetch a single order again from one of its documents, use the document's **Re Read Order From Ecommerce Site** action.

## Sending stock quantities

Whenever the stock of an item changes in Nama, every active site is asked whether it cares:

- The movement must belong to the site's legal entity and other dimensions, for the dimensions on which the item tracks quantities. A site of the Riyadh branch ignores movements in the Jeddah branch.
- With **Link Items To This Site** ticked, the item must be on one of the site's linkers.

The site then works out the quantity, looks the product up in the shop by SKU (the linker SKU for that item, size, colour and unit, otherwise the item code) and sends it. Nama sends one update per unit linked on the linkers, so an item sold both by the piece and by the carton updates both products.

### Choosing what is sent: QTy Update Configuration

The **QTy Update Configuration** grid on the main tab says which items are sent and which warehouses count. Each row can be narrowed by item section, item, unit, revision, size, colour, lot, measures and dimensions. Its warehouse columns list up to 20 warehouses, and **Warehouse Apply Type** says whether the stock of those warehouses is counted (**Include**) or left out (**Exclude**).

All the rows that match the item are added together. Tick **First Applied Line** to use only the first matching row. An item that matches no row is not sent, and its request fails with *Could not find matched configuration lines for request with item {0}* followed by the item's details.

For example, a shop that sells from the two retail warehouses but never from the bonded warehouse has one row with **Warehouse Apply Type** = Include and the two retail warehouses.

### How the quantity is calculated

1. **The basis.** **Magento Sent Quantity** decides which stock figure is summed: **Net With Reservation** (the default) leaves out stock reserved for orders, **Available(Ignoring Auto Reservation)** does not. The **Consider Size On Update**, **Consider Color On Update** and **Consider Revision Id On Update** options make the sum count only the stock of the product's own size, colour or revision.
2. **A query instead, when needed.** Tick **Use Quantity Calculation Query** to calculate the quantity with your own SQL in each row's **Quantity Calculation Query** (every row then needs one). The query's first column is the quantity and an optional second column is the warehouse; `{item.id}` in the query is the item being sent. **Modified Quantity Query(Added To Calculated Quantity)** adds to the calculated quantity, for example stock in transit.
3. **The minimum-quantity rule.** Shops oversell when the last units are already picked. **Minimum Quantity To Send(Value)** and **Minimum Quantity To Send(Percent)** set a safety level (the larger of the two counts), and **Send Quantity (If Quantity is less than minimum quantity to send)** says what to do with it:
   - **Zero Quantity(If Quantity Reached to Less or equal Minimum Quantity)**: send 0 once the stock is at or below the level.
   - **Quantity - minQtyToSend**: always hold the level back.
   - **Maximum Of Quantity And Minimum Quantity**: never send less than the level.

   With a level of 3 and 5 units in stock, the three options send 5, 2 and 5. With 2 units in stock, the first option sends 0 and the third sends 3.

   The header's values are copied into every row of the grid when you save. To give some items a different rule, leave these header fields empty, fill the values on the rows, and untick **Calculate Minimum Quantity and Quantity Send Type From Header** on them.
4. **Rounding.** **Sent Quantity Rounding Type** and **Send Quantity Scale** round the result, for example down to whole units.

**Change Item Status When Quantity Changes** also marks the product in stock or out of stock as the quantity becomes positive or zero.

### One total, or one figure per location

By default the shop receives one total quantity per product. Shops that keep stock per branch or location can receive one figure per Nama warehouse instead: fill **Link Ecommerce Warehouses By Nama** with a **Warehouse** and its **Ecommerce Warehouse Id** in the shop. This grid is used by Salla, Zid, Shopify and OTO only. On every other platform leave it empty, and the shop receives the total. The platform pages explain the location ids.

### Resending quantities

**Update All Qtys** on the site sends every item's quantity again, for example after setting the site up or changing its quantity settings. It asks **Quantities Send Type**:

- **ALL** takes every stock record that matches each **QTy Update Configuration** row. This is the usual choice.
- **First Matched** takes only the first matching stock record of each row, so only one item per row is sent. It suits rows that name a single item.

Whichever you choose, each item's quantity is recalculated in full before it is sent. That is why **Resend Quantities for Selected Lines** on a linker can use **First Matched** safely: there it takes one stock record for each selected line's item, which is enough to resend that item.

Requests are processed in the background, and their progress is listed on the site's **Statistics** tab:

- **Items Quantities Change Requests Updater**: stock changes waiting to be turned into requests.
- **Items Quantities Change Requests**: one row per quantity sent, with the quantity, its status and any error. **Retry Selected Lines** sends failed rows again once the cause is fixed, and **Delete Finished Requests** clears the rows that are done.

Failed requests are retried automatically a limited number of times. The limit is set per kind of request in the module's configuration, under **e-Commerce Integration → Settings**, in the **Max Retry Count** group:

| Field | Field id | What it limits |
|---|---|---|
| **Max retry for item update request** | `value.maxRetryForItemChangeReq` | Retries of a product (item) sent to the shop. |
| **Max retry for item quantity update request** | `value.maxRetryForQtyChangeReq` | Retries of a stock quantity sent to the shop. |
| **Max retry for item price update request** | `value.maxRetryForPriceChangeReq` | Retries of a price sent to the shop. |

Left empty or zero, a field falls back to **Max Retry Number For Pending Tasks** in [Global Configuration](/platform/global-config/global-config-notifications#Sending-settings) (250 by default). A request that has used up its retries stays failed until you press **Retry Selected Lines**.

To be told about failures, add rows to **Ecommerce Event Actions Line** on the **Statistics** tab: pick the event (**Update Item Quantity**, **Update Item Price**, **Update Item**, **Item Not Found** or **Configuration Not Matched**) and the notifications to send when a request fails, when it stops being retried, and when it succeeds after failing.

### Bundles sold as service items

Some shops sell sets that Nama keeps as service items, such as a bedroom set made of a bed, two nightstands and a dresser. Service items have no stock, so nothing would ever tell the shop that the set ran out when the beds did.

**Related Parent Service Items Query For Qty Update**, on the site's **Magento Site** tab, closes that gap. Whenever a physical item's stock changes, Nama runs the query; it must return, in its first column, the ids of the service items that contain that item. `{dimensions.item.id}` in the query is the item whose stock changed. For each service item returned, Nama sends that service item's quantity to the shop too. Because the service item has no real stock of its own, calculate its quantity with **Use Quantity Calculation Query**, for example the number of complete sets the components allow.

## Sending prices

Prices are sent only from the **Magento Price Updater Doc** (**e-Commerce Integration → Master Files → Magento Price Updater Doc**). It looks like a sales document: one line per item, with a unit price and up to eight discounts. You can type the lines or bring them from another document with **From Document**; tick **Include Linked Items Only** to keep only the items linked to the site.

1. Pick the **Magento Site**.
2. Choose **Original Price Source**: which figure of each line becomes the product's normal price (**Unit Price**, **Net Value**, or the price after discount 1 to 8).
3. For a sale price, choose **Special Price Source** too and fill **Special Price From Date** and **Special Price To Date**. The dates are copied to every line; a line can carry its own dates. A sale price is sent only for lines that have both dates.
4. Save, then press **Update Ecommerce Prices**.

A typical use: a line with a unit price of 200 and a 25% discount 1, with Original Price Source = Unit Price and Special Price Source = After Discount 1, puts the product on the shop at 200 with a sale price of 150 for the chosen dates.

**Update Ecommerce Prices** sends only the lines not sent yet; the **Request Created** column shows which ones were. Changing a line's item or price makes it eligible again, so you can correct a few lines and press the button once more. **Resend Prices To E-Commerce site - Including Previously Sent** sends every line again. **Clear Lines Discounts** removes all the line discounts from the document. **Update Ecommerce Items** sends the document's items to the shop as products.

The product is found in the shop by SKU, as for stock. A product the shop does not have fails with *Could not find item with sku {0} in ecommerce site {1}*. Price requests are listed in **Items Prices Change Requests** on the site's **Statistics** tab, with the same **Retry Selected Lines** and **Delete Finished Requests** actions. Prices are not sent to OTO, Atheer, Salasa or Amazon sites.

## Sending items

With **Send Items To Magento** ticked, saving an item in Nama sends it to the shop as a product, provided the item qualifies:

- With **Link Items To This Site** ticked, the item must be on one of the site's linkers.
- Otherwise it must match a row of **Item Update Configuration** (by item section, item class 1-10 or category 1-5).
- **Items Send Query**, when filled, must also return a result for the item. With **Link Items To This Site** ticked, the query takes the place of the linker condition, so items that match it are sent even if they are on no linker.
- **Send Item When New Only** sends an item only when it is first created, so later edits in Nama never overwrite what the shop team did.

Saving a linker also sends its items, unless Send Item When New Only is ticked, and the **Update Ecommerce Items** button on a linker or a price document sends its items on demand.

When the shop has no product with the item's SKU, Nama creates one with the item's name, description and current price; on Magento the new product starts disabled and hidden, ready for the shop team to complete. When the product exists, Nama keeps its name, status and description as they are in the shop and updates only the fields listed in **Copy Fields Value From The System To Ecommerce Site**. Each row of that grid names the shop's field (**Product Field Name In Ecommerce Site**), the value (**Product Field Value**, which can use the item's fields) and the type of the value (**Product Type**: String, Integer, Double, Boolean or Array).

Item requests are listed in **Items Change Requests** on the **Statistics** tab. Items are sent to Magento, WooCommerce, BigCommerce, Shopify, Zid and Salla sites; the platform pages describe what each one receives.

### Product and category settings for Magento

Magento products carry more than a name and a price: categories, images, attribute sets and, for products sold in variants, a configurable parent. Two screens prepare that for Magento sites.

**Ecommerce Category Configuration** (one record per site) maps Nama's item groupings to Magento categories. Each line pairs an **Ecommerce Category** (an item section, brand, category or item class 1-10) with a **Category Id** picked from the shop's active categories; **Category Level** narrows the list.

**Ecommerce Product Configuration** describes one Magento product:

1. Pick the **Magento Site** and the **Item**. Nama fills the **SKU** and names from the item, the **Category Lines** from the category configuration, and the **Product Attributes Lines** from the site's **Copy Fields Value From The System To Ecommerce Site** grid.
2. Choose the **Product Type**: **Simple** for a product sold as it is, **Configurable** for a parent product whose variants are separate simple products.
3. Add pictures in **Gallery Lines**, and attribute values in **Product Custom Attributes Lines** (for example `color` = Red; the codes and values are offered from the shop). On a configurable product, the attribute codes listed there become the options customers choose from.
4. For each variant, create a simple product configuration and point its **Parent Product** at the configurable one.
5. Press **Create Or Update Ecommerce Product**. Send the simple variants first, then the configurable parent: the parent links the variants that already exist in the shop. **Last Request Sent Time** records the last send.

A product created this way is enabled and visible in the shop straight away.

## Sending order status back to the shop

On Magento and WooCommerce, Nama can move the shop's order forward when its document is committed in Nama, for example to mark it complete once the invoice is saved.

1. Tick **Change Request Status With Sales Document Commit**. The status grid can be filled only while it is ticked.
2. Add rows to **Update Magento Order Status To**. Each row has criteria and an **Apply When Query** that decide which documents it applies to, the shop **Status** to set, and an optional **Comment** added to the order (the text can use the document's fields); **Comment Visible To Customer** shows the comment to the customer.

When an imported document is committed, Nama uses the first matching row. The status is sent only when it differs from the last status sent for that document, and the comment only when its text changed, so saving the document again does not repeat them. To react to a later document instead, such as a sales invoice made from an imported sales order, tick **Update Magento Order Status When Condition Applied In From Doc** on that later document's term: committing it checks the rows again for the imported document.

On every other platform, leave **Change Request Status With Sales Document Commit** unticked and the **Update Magento Order Status To** grid empty.

## Magento sites

### Connecting

Nama connects to Magento's REST API as a Magento admin user.

- **URL**: the store's address, for example `https://shop.example.com/`.
- **Integrator Name**: the REST path added after the URL; new sites have `rest`, which suits a standard Magento installation.
- **User Name (Consumer Key)** and **Password (Consumer Secret)**: the admin user's name and password.
- **Hours To Cache Access Token**: Nama logs in once and reuses the login for this many **minutes** before logging in again. It is 3 when empty.

### Magento-only features

- **Read Returns** reads the orders cancelled in Magento and brings them in as returns. It looks back 30 days, or to **Read Orders From Date** when that date is later, so fill **Read Orders From Date** before using it. To run it on a schedule, use a Task Schedule with **Task Type** = **Read Magento Returns**. On other platforms, returns arrive through the return statuses described in [Which orders are read](#Which-orders-are-read); Amazon has its own returns reading, described on its page.
- **Magento invoices and shipments.** Nama can create the invoice and the shipment in Magento from a Nama document. Tick **Create Magento Invoice When Condition Applied** and **Create Magento Invoice Shipping When Condition Applied** on the term of the document that should trigger them, and choose which documents qualify with **Criteria For Magento Invoice Creation** / **Magento Invoice Creation Query** and **Magento Invoice Shipping Creation Criteria** / **Magento Invoice Shipping Creation Query** on the site. The trigger can be the imported document itself or any document made from it, and Nama does it once per document. Leave these settings empty on other platforms.
- **Ignore Lines With Parent Product** (on the **Magento Site** tab): Magento lists a variant of a configurable product as a parent line plus a child line. Tick it to drop the child lines.
- **Warehouse Quantities Field** (on the **Magento Site** tab): the code of a product attribute that should receive each warehouse's quantity as text, besides the total.
- **Update Product Endpoint**, **Update Product Body** and **Update Quantity Per Warehouse** are for shops with a custom update endpoint; leave them empty unless Namasoft support set one up for your shop.

Configurable products and categories are prepared on the screens described in [Product and category settings for Magento](#Product-and-category-settings-for-Magento).

## Server settings

These keys go in the server's `nama.properties` file. A normal setup needs only the first.

::: danger send-ecommerce-data is required
Without `send-ecommerce-data=true`, Nama sends nothing to any shop: no items, prices, stock quantities, order statuses, or Magento invoices and shipments. While any site is active and the key is missing, the system raises a critical error that names the active sites.
:::

| Key | What it does |
|---|---|
| `send-ecommerce-data=true` | Lets Nama send data to the shops. Required. |
| `do-not-send-magento-qty-updates=true` | Stops stock quantities going to every site, while items, prices and statuses are still sent. Useful while stock is being loaded or recounted. |
| `magento-find-first-customer-for-duplicates=true` | When several customers have the order's phone number as their code, uses the first of them instead of failing to choose. |
| `serverid` | This server's licence id. Salla and Zid use it to collect the store's access token from the Namasoft gateway; see their pages. |
| `run-ecommerce-webhook-in-debug=true` | Lets a server running in development mode collect webhook events from the Namasoft gateway; such servers skip them otherwise. |
| `read-ecommerce-webhook-events-page-size` | How many webhook events are collected from the gateway at a time (300 when not set). |

## Messages you may see

Most of these messages have no Arabic translation and appear in English on Arabic screens too; where one exists it follows the English text.

| Message | Why | What to do |
|---|---|---|
| *Attribute send-ecommerce-data is not true in nama.properties and magento sites with codes {0} is active* — «الخاصية send-ecommerce-data غير مفعلة في nama.properties و مواقع ماجنتو بألاكواد {0} مفعلة» | Sites are active but the server is not allowed to send data to shops. | Add `send-ecommerce-data=true` to `nama.properties`, or mark the listed sites **Inactive**. |
| *Your licence has {0} magento sites, you are trying to create {1} active sites* | Saving or reading would make more sites active than the licence allows. | Mark an unused site **Inactive**, or extend the licence. |
| *un defined item with code {0}* | An order line's SKU matches no linker line and no item code. | Link the SKU on a Magento Item Linker, then use **ReRead Selected Orders**. Or tick **Ignore Error If No Item Matches SKU**. |
| *Book not configured for Type {0}* / *Term  not configured for Type {0}* | The Order Info, Return Info or generation row used for the order has no book or term. | Fill **Book** and **Term** in that group or row. |
| *Document term {0} not compatible with {1}* | The term belongs to a different document type from **Import As**. | Pick a term of the Import As type. |
| *Could not create customer because the code is null or empty* | A new customer was needed, but the order has no phone number to use as its code. | Correct the order in the shop, or adjust the **Mobile Correction Query**. |
| *No source invoice found for the return of order {0}; the return was skipped. Enable "Create invoice for returns if invoice not found" on the site to auto-create the invoice.* | An order in a return status was read, but its original order was never imported. | Tick **Create Invoice For Returns If Invoice Not Found**, or import the original order first. |
| *method readReturns not implemented for site of type {0}* | **Read Returns** was pressed on a site that is not a Magento or Amazon site. | Bring returns in through the return statuses. |
| *Could not find matched configuration lines for request with item {0}* (followed by the item's details) | The item changed stock but matches no **QTy Update Configuration** row. | Add or widen a row, or ignore it if the item is not meant for the shop. |
| *Could not find item with sku {0} in ecommerce site {1}* | A price was sent for a SKU the shop does not have. | Create the product or correct the linker, then **Retry Selected Lines**. |
| *Magento Site {0} can not used to link Items, please check this option {1} must be true* — «موقع ماجنتو {0} لا يمكن استخدامه لربط الأصناف, الرجاء التاكد من تفعيل الأوبشن {1}» | A linker points at a site whose **Link Items To This Site** is unticked. | Tick the option on the site, or link the items to another site. |
| *SKU {0} is repeated in linker {1} line {2} and linker {3} line {4}* | The same SKU is used twice among the site's linkers. | Remove one of the two lines. |
| *Fields {0} , {1} should not be empty, you must fill at least one* — «لا يجب ترك الحقلين فارغين {0} , {1} , يجب علي الأقل ملئ واحد منهم» | A price updater document has neither a special price source nor an original price source. | Fill at least one of them. |
| *Special price from date and to date is required* — «لا يمكن ترك من تاريخ وإلي تاريخ للسعر الخاص فارغين» | A special price source is chosen but one of its dates is empty. | Fill both dates, or clear the special price source. |
| *You can not create more than one file for type {0} for ecommerce site {1}* — «لا يمكنك إنشاء أكثر من ملف من النوع {0} للمتجر الإلكتروني {1}» | The site already has a committed category configuration. | Edit the existing record instead. |
| *Percentage must be between 0 and 100* — «النسبه يجب أن تكون بين صفر و 100» | **Minimum Quantity To Send(Percent)** is outside 0-100. | Correct the percent. |
| *User name or password are missing for site {0}* / *URL is missing for site {0}* | A Magento site is missing its admin user, password or URL. | Fill the connection fields. |
