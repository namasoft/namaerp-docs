---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Architecture
description: "Landing page for the technical architecture of Nama ERP: application architecture, infrastructure and deployment, and security architecture, written for IT and server administrators."
---

# Architecture

Sooner or later someone in your IT department will ask the question that no feature list answers: *what is this thing, exactly, and what will it do to our servers?* Perhaps a security review board wants to see the design before it approves the purchase. Perhaps a systems administrator has been handed a budget line for a new machine and needs to know what to buy. Perhaps you are simply being asked, in a tender document, to attach "the application and infrastructure architecture".

These pages are that attachment. They describe how Nama ERP is put together, how it is deployed and operated, and how it is secured — written for the people who run servers rather than the people who post invoices.

<LandingGrid>
  <LandingCard icon="🏗️" title="Application Architecture" link="/architecture/application-architecture.md" details="How the system is built: layers, modules, clients, the data model, and how a saved document becomes an accounting entry." />
  <LandingCard icon="🖥️" title="Infrastructure Architecture" link="/architecture/infrastructure-architecture.md" details="How it is deployed and run: servers, ports, storage, backups, upgrades, and the supported topologies." />
  <LandingCard icon="🔒" title="Security Architecture" link="/architecture/security-architecture.md" details="How access is controlled and data protected: authentication, permissions, transport security, and the audit trail." />
</LandingGrid>

::: tip Looking for something more specific?
Hardware sizing lives in [System Minimum Requirements](../getting-started/system-minimum-requirements.md), the step-by-step install in the [Installation Guide](../getting-started/installation-guide.md), and the programmatic interface in [Nama ERP REST API](../integration/nama-erp-api.md).
:::
