---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Integrations
---

# Integrations

The Integrations module is where Nama keeps its ready-made links to outside platforms that a
customer is *required* to report to. Today it holds two, both Saudi, and they have nothing in
common beyond sharing a menu:

- **Eltezam** is for government agencies. The Ministry of Civil Service (MCS) expects every agency
  to report its employees — who they are, their jobs, their monthly payslips, qualifications,
  vacations and appraisals — to its Eltezam service, in the ministry's own codes. Nama reads all of
  that from the HR module, translates it through code tables, and sends it one request at a time
  over the Government Service Bus.
- **Alwatania Distributors** is for companies that distribute for Alwatania. Nama pushes the
  distributor's master data — customers, salesmen, items and the places they belong to — and every
  sales invoice and return to Alwatania's platform. It is one-way: Nama sends, and reads back only
  the platform's answer to each request.

Each one has its own licence, its own screens and its own way of being sent, so read only the part
you need. Neither has a Send button: in both, data leaves Nama when an entity flow or a task
schedule runs one of the integration's actions.

![The Integrations menu in the sidebar](../../ar/modules/integrations/images/integrations-menu-en.png)

The menu has the same shape for both: the configuration screens under **Master Files**, and — for
Eltezam only — the submission document under **Documents**, all under the **Integrations** root.

::: tip Looking for another integration?
The platform-wide integrations — the Nama ERP API, attendance machines, the invoice retriever,
SFDA drug track and trace and others — are in [External Integrations](/integration/). E-commerce
platforms have their own [e-commerce Integration](/modules/ecommerce/) module.
:::

## Eltezam — reporting employees to the Ministry of Civil Service

Licence `integrations-ksa-estidamah-eltezam`. Three screens: the configuration, the code tables and
the submission document.

<LandingGrid>
  <LandingCard icon="🏛️" title="Eltezam Overview" link="/modules/integrations/eltezam/eltezam-overview.md" details="What the ministry expects, the seven operations Nama sends, and the workflow from HR data to a sent submission." />
  <LandingCard icon="⚙️" title="Setting up Eltezam" link="/modules/integrations/eltezam/eltezam-setup.md" details="The configuration: service address, agency IDs, the employee group, employee-field templates and which operations to send." />
  <LandingCard icon="🔣" title="Eltezam Code Tables" link="/modules/integrations/eltezam/eltezam-code-tables.md" details="Creating all 29 tables at once and mapping Nama records and values to the ministry's codes." />
  <LandingCard icon="📋" title="What Nama Sends to Eltezam" link="/modules/integrations/eltezam/eltezam-data-sources.md" details="Where every value of every operation comes from, and which documents count as in the period." />
  <LandingCard icon="📤" title="Submissions and Sending" link="/modules/integrations/eltezam/eltezam-submissions-and-sending.md" details="The submission document, the two sending actions, the request log and resending the employees that failed." />
  <LandingCard icon="🩺" title="Eltezam Troubleshooting" link="/modules/integrations/eltezam/eltezam-troubleshooting.md" details="Reading the error codes, the three-failures stop rule, and every message the integration raises." />
</LandingGrid>

## Alwatania Distributors — pushing master data and sales to Alwatania

Licence `integrations-ksa-watania-samil`. One screen, the config, which also holds both send logs.

<LandingGrid>
  <LandingCard icon="🚚" title="Alwatania Overview" link="/modules/integrations/alwatania/alwatania-overview.md" details="What is sent, how Nama records map onto the platform, and the three rules that shape every run." />
  <LandingCard icon="🔑" title="Setting up the Alwatania Config" link="/modules/integrations/alwatania/alwatania-setup.md" details="The token and API addresses, the client credentials and the batch sizes." />
  <LandingCard icon="📦" title="Sending Master Data and Invoices" link="/modules/integrations/alwatania/alwatania-sending-data.md" details="The three actions, their parameters, and ready-to-copy task schedules and entity flows." />
  <LandingCard icon="🧾" title="Send Logs and Resending" link="/modules/integrations/alwatania/alwatania-send-logs.md" details="Reading the two logs, why something was refused, forcing a resend, and the messages you may see." />
</LandingGrid>
