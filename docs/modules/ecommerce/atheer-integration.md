---
entities: [MAGMagentoSite]
menu: e-Commerce Integration → Master Files → Magento Site
---

# Atheer Integration

This page explains how the Atheer platform sends its orders and requests into Nama ERP: the Magento Site record to set up, the address Atheer calls, the four operations it can send, the ZATCA QR code Nama returns, and how to ask Atheer to send an order again.

With most online shops, Nama goes and fetches the orders. Atheer works the other way round: **Atheer calls Nama** each time something happens, and Nama answers with the document it created. Nama never polls Atheer, so the Atheer record is not read with **Read Sales**, and Nama does not send quantities or prices to Atheer.

## Setting up the Magento Site

Atheer is set up as a record on the **Magento Site** screen. The screen keeps that name in both languages even though it serves many platforms. It needs the `magento` licence.

1. Create a record with **Site Type** = **Atheer Site**. Give it a short code, for example `ATHEER`: Atheer uses that code in every call.
2. Fill the generation information that Atheer's operations use (see the table below): **Order Info**, **Request Info** and **Return Info**, each with the document type, book and term Nama should create. Also fill the customer, payment-method and item-linking settings. The [e-commerce integration guide](/modules/ecommerce/ecommerce-integration-guide.md) explains all of these.
3. On the Main tab, fill **Seller Name (ZATCA)** and **Vat Number (ZATCA)** with your company's registered name and VAT number. Nama uses them to build the ZATCA QR code it returns to Atheer.
4. On the **Atheer Site** tab, fill **Reset Order Link Template** (explained below). The record cannot be saved without it.
5. Give Atheer a Nama user name and password for the calls. The calls run as that user, so it needs the right to create the documents in step 2.

![The Atheer Site tab of a Magento Site, with the Reset Order Link Template](../../ar/modules/ecommerce/images/atheer-site-tab-en.png)

## The address Atheer calls

Atheer sends each call as an HTTP `POST` with the order or request as JSON in the body, to:

```
{your Nama address}/integrator?type=atheer&operation=...&siteCode=...&user=...&pass=...
```

| Parameter | Value |
|---|---|
| `operation` | One of the four operations below. |
| `siteCode` | The code of the Atheer Magento Site record, for example `ATHEER`. |
| `user`, `pass` | The Nama user name and password from step 5. |

For example, a new invoice for a site coded `ATHEER` goes to
`{your Nama address}/integrator?type=atheer&operation=add_invoice&siteCode=ATHEER&user=atheer&pass=...`.

Nama handles Atheer's calls one at a time, in the order they arrive.

## The four operations

| Operation | What it means | Generation info used |
|---|---|---|
| `add_invoice` | A completed sale. Nama creates the document from the order Atheer sends. | **Order Info** |
| `add_request` | A request that still needs confirming. Nama creates the document from the request Atheer sends. | **Request Info** |
| `request_confirm` | The customer confirmed an earlier request. Nama creates the document from that request. | **Order Info** |
| `request_reject` | The customer rejected an earlier request. Nama creates the document from that request. | **Return Info** |

The last two refer back to the request: Atheer keeps the Nama id it received when it sent `add_request`, and sends it again in the `accounting_offer_num` field of the header. For example, Atheer sends `add_request` for a quotation and Nama answers with id `5f2a…`; two days later the customer accepts, and Atheer sends `request_confirm` with `accounting_offer_num` = `5f2a…`, so the confirmed order is created from that quotation.

Atheer sends the order date as a Unix time in the header's `created` field. If that value cannot be read, the call is refused with:

```
Order with id {0} is failed parsing created field with value {1}
```

This message has no Arabic text and appears in English on both screens. It means the problem is in the data Atheer sent; ask Atheer to correct and resend the order.

## What Nama answers

Every successful call returns JSON with `success`, plus the `code`, the `id` and the `entityType` of the Nama document that was created. For `add_invoice` and `request_confirm`, when the document is a sales document, the answer also carries `qr_code`: the ZATCA QR code built from **Seller Name (ZATCA)**, **Vat Number (ZATCA)**, the document's dates and its totals, ready for Atheer to print on the customer's receipt.

Every call is recorded in the **Atheer Integration Log List** on the **Statistics** tab of the Magento Site: the date, the operation, the Nama document and the body Atheer sent. When a customer asks what Atheer sent for an order, this list holds the original request.

## Asking Atheer to send an order again

Because Atheer pushes and Nama never reads, a missed or wrong order cannot be fetched from Nama's side. Instead, Nama asks Atheer to send it again, through the address in **Reset Order Link Template**.

The template is a [Tempo](/admin/tempo.md) text that Nama turns into the address of Atheer's "resend this order" service, then calls with an HTTP `GET`. Use `{magentoSourceId}` where the Atheer order number belongs, for example:

```
https://<Atheer resend address>/{magentoSourceId}
```

Atheer gives you the actual address. Two places use it:

- **Re Read Order From Ecommerce Site**, an action on a sales document that came from Atheer. It asks Atheer to resend that document's order.
- The entity flow [EAEcommerceReadOrders](/entity-flows/magento/EAEcommerceReadOrders.md), with the Atheer site code and a comma-separated list of Atheer order numbers. It asks Atheer to resend each of them — useful for orders that never arrived in Nama, because there is no document to press the action on.

Atheer then calls Nama again with the order, as described above.
