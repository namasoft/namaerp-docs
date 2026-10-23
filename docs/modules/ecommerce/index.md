---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: e-commerce Integration
description: "Guides for connecting Nama ERP to online storefronts and fulfilment platforms: the shared e-commerce integration settings, then Salla, Zid, Shopify, WooCommerce, BigCommerce, Atheer, Salasa, OTO, Amazon and Omniful, and what moves in each direction."
---

# e-commerce Integration

This module connects Nama ERP to the outside world of online selling and fulfillment. It keeps your products, prices, stock and orders in sync between Nama and external e-commerce and supply-chain platforms — so a sale placed on your storefront, or an order routed through a fulfillment partner, flows straight into your ERP without re-keying.

If you run an online store backed by Nama, or use a third-party warehouse and fulfillment service, the guides below show how to wire each platform up and keep data flowing in both directions.

## Integrations

Connecting Nama ERP to storefronts and fulfillment platforms.

<LandingGrid>
  <LandingCard icon="🛒" title="E-Commerce Integration Guide" link="/modules/ecommerce/ecommerce-integration-guide.md" details="The settings every storefront shares: the shop record, item linking, order import, prices and stock." />
</LandingGrid>

## Storefronts

One page per platform: how to connect the store, and what moves in each direction.

<LandingGrid>
  <LandingCard icon="🟢" title="Salla" link="/modules/ecommerce/salla-integration.md" details="Connect a Salla store through Namasoft's app, read orders live or on demand, and push prices and branch stock." />
  <LandingCard icon="🟣" title="Zid" link="/modules/ecommerce/zid-integration.md" details="Connect a Zid store, read its orders and abandoned carts, and push prices and stock per Zid location." />
  <LandingCard icon="🛍️" title="Shopify" link="/modules/ecommerce/shopify-integration.md" details="Connect a Shopify store through its Admin API, read orders, and push products, prices and stock per location." />
  <LandingCard icon="🔌" title="WooCommerce" link="/modules/ecommerce/woocommerce-integration.md" details="Connect a WooCommerce shop with REST API keys, exchange orders, products and stock, and keep reward points in step." />
  <LandingCard icon="🏪" title="BigCommerce" link="/modules/ecommerce/bigcommerce-integration.md" details="Connect a BigCommerce store with its store hash and access token, read orders, and push products, prices and stock." />
  <LandingCard icon="📨" title="Atheer" link="/modules/ecommerce/atheer-integration.md" details="Receive Atheer invoices and requests as Nama documents, and answer each one with its ZATCA QR code." />
</LandingGrid>

## Fulfilment and marketplaces

<LandingGrid>
  <LandingCard icon="🏭" title="Salasa" link="/modules/ecommerce/salasa-integration.md" details="Let Salasa's warehouse events create stock transfers and sales returns and update delivery status in Nama." />
  <LandingCard icon="📊" title="OTO Stock Synchronisation" link="/modules/ecommerce/oto-stock-sync.md" details="Send each Nama warehouse's stock to its OTO fulfilment location whenever it changes." />
  <LandingCard icon="📦" title="Amazon Order Notifications" link="/modules/ecommerce/amazon-order-notifications.md" details="Turn Amazon SP-API order notifications into Sales Orders automatically when an order ships, via an SQS queue." />
  <LandingCard icon="🚛" title="Omniful Integration" link="/modules/ecommerce/omniful-integration.md" details="Two-way integration with the Omniful supply-chain platform for warehouse management and order fulfillment." />
</LandingGrid>
