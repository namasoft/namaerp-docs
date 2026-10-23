---
description: "Overview of Nama POS: the offline-first desktop register, the Captain Order mobile app, the central ERP side where registers and permissions are set up, and what can be done at the register."
---
# Nama POS — Overview

Most of Nama ERP runs in a web browser. **Nama POS** is the exception: it is a dedicated **desktop application** that runs right on the cash register, plus a companion **Captain Order** mobile app for waiters. It is built this way for one simple reason — a point of sale cannot stop selling just because the internet went down.

![Nama POS main screen](../../ar/modules/pos/images/overview/pos-app-overview-en.png)

## Why a desktop app?

A shop floor is a demanding place. The connection drops, a busy Friday night brings a queue to the counter, and the customer in front of you still expects a receipt in seconds. So Nama POS is designed to be **offline-first**:

- Every register keeps its own **local database** with the items, prices, customers and settings it needs to sell.
- Sales, returns, payments and shifts are all recorded **locally first**, so the register keeps working whether or not the server is reachable.
- In the background, the register **syncs** everything it creates up to the central Nama ERP, and pulls down fresh configuration and prices. When the connection comes back after an outage, the queued documents flow up automatically.

This is the single most important idea to understand about Nama POS, and it is covered in detail in [How POS data syncs with the server](./pos-data-sync.md).

## The pieces of the system

**The register (the desktop app).** This is what the cashier uses all day: ringing up sales, taking payments, opening and closing shifts, handling returns, and — in restaurants — managing tables. Everything a cashier needs is in this one application.

**Captain Order (the mobile app).** Waiters take orders at the table on a phone or tablet and send them straight to the kitchen and the register, instead of walking back and forth. It shares the same items, favourites and tables as the desktop register. See [Tables, reservations & Captain Order](./pos-tables-and-restaurant.md).

**The self-checkout kiosk.** The same Captain Order app, switched to its kiosk mode on an Android device, lets shoppers scan their own items and pay by card with no cashier. Every kiosk sale is saved on an ordinary register on the shop network. See [Self-Checkout Kiosk](./pos-self-checkout-kiosk.md).

**The central Nama ERP (the server).** This is the web system where head office lives. It is where each register is defined, where staff logins and their permissions are configured, and where every document a register creates eventually lands — to be processed into accounting, reconciled, and reported on. Operators rarely touch it; managers and IT do.

**Payment terminals and peripherals.** Nama POS talks to card terminals (through a built-in payment gateway layer), receipt printers, cash drawers, customer-facing pole displays, fingerprint readers, and barcode scanners.

## What you can do at the register

Think of the rest of this guide as a tour of the register, roughly in the order you would meet each part:

| Area | What it covers |
|---|---|
| [Getting started](./pos-getting-started.md) | Launching, signing in, the menu, shortcuts, locking the screen, language & theme |
| [The sales invoice](./pos-sales-invoice.md) | The main selling screen: adding items, discounts, the customer, holding a sale |
| [Payment & tender](./pos-payment-and-tender.md) | Taking the money: cash, card, split payments, coupons, credit notes, reward points |
| [Returns & replacements](./pos-returns-and-replacements.md) | Refunds, exchanges, credit notes, depreciation on returned goods |
| [Shifts & cash](./pos-shifts-and-cash.md) | Opening and closing a shift, counting the drawer, pay-ins and pay-outs |
| [Tables & restaurant](./pos-tables-and-restaurant.md) | Halls and tables, reservations, suspended orders, the call-center flow, Captain Order |
| [Item add-ons](./pos-item-addons.md) | Sizes, colours, and extras (like sugar and milk for a coffee) |
| [Inventory operations](./pos-inventory-operations.md) | Receiving, transferring, counting, scrapping stock from the register |
| [Reports & tools](./pos-reports-and-tools.md) | Running reports, internal messages, the price checker, maintenance utilities |
| [Data sync](./pos-data-sync.md) | How "sent" and "unsent" work, and what to do when a document won't go up |

::: tip Configuration is a separate topic
This guide is about **using** Nama POS day to day. Setting it up — defining registers, payment methods, security profiles, screen layouts, and the many POS settings — is covered in [POS — Server-Side Setup](./erp-setup/).
:::

## A word on roles

Throughout this guide you will see three kinds of user:

- **Cashiers** ring up sales and take payments. Most of what they need is on the sales and payment screens.
- **Waiters** take orders on Captain Order and bring them to a register to settle.
- **Supervisors and managers** do the things that need a higher permission: large discounts, returns outside the allowed window, closing shifts, running utilities. When a cashier hits one of these, Nama POS quietly asks a supervisor to authorize it on the spot — no need to log out and back in.
