---
description: "The Global Configuration file, the one settings record shared by every module and the whole database: where to find it and a guide to each of its tabs, from decimals, taxes and discounts to documents, security and replication."
---
# Global Configuration

Almost every other configuration file in Nama belongs to one module — supply chain settings shape inventory, HR settings shape payroll. **Global Configuration** is the one that belongs to all of them. It decides how many decimal places a number carries, whether stock documents may be edited after a closing entry, how a tax is calculated on an invoice line, who is allowed to log in and how, what a printed report looks like, and where attachments are stored.

That reach is what makes it worth reading carefully. A single checkbox here can change arithmetic on every invoice in the database, or hide a field from every screen in the system.

::: info Where to find it
Open **Administration → Settings → System Settings** and choose the **Global Configurations** file (its code is `global`). Settings are grouped into tabs by theme, and each tab has its own reference page below.
:::

## One record for the whole database

There is exactly **one** Global Configuration per database. It cannot be duplicated, and it cannot be given a second copy scoped to a particular company or branch — every setting on these tabs applies to the entire installation. When you change something here, you are changing it for everyone.

The values are **cached** for speed. When you save, the system refreshes the cached copy automatically, so a change takes effect without a restart. If you ever suspect a node is serving stale values, the **Reload Configuration** action on the General tab forces every node to re-read the record.

## The tabs

<LandingGrid>
  <LandingCard icon="⚙️" title="General" link="/platform/global-config/global-config-general.html" details="Language, decimal places, Hijri date format, and item measures." />
  <LandingCard icon="🏢" title="Dimensions" link="/platform/global-config/global-config-dimensions.html" details="Turning the five dimensions on or off, their order, consistency checking, and account code segments." />
  <LandingCard icon="📄" title="Documents and Books" link="/platform/global-config/global-config-documents.html" details="Books and document terms, draft behaviour, automatic coding, installments, and closed fiscal periods." />
  <LandingCard icon="🧾" title="Taxes and e-Invoice" link="/platform/global-config/global-config-taxes.html" details="How each of the four taxes is calculated, its authority codes, rounding discount, and e-invoicing." />
  <LandingCard icon="🏷️" title="Discounts" link="/platform/global-config/global-config-discounts.html" details="The eight line discounts and the header discount — what each is applied to and which taxes it considers." />
  <LandingCard icon="📊" title="Accounting and Finance" link="/platform/global-config/global-config-accounting.html" details="Rounding tolerances, subsidiary accounts, credit limits, debt ages, payments, budgets, and cost." />
  <LandingCard icon="🤝" title="Customers and Sales" link="/platform/global-config/global-config-sales.html" details="Salesman defaults, customer coding, and the connection to Nama CRM." />
  <LandingCard icon="✅" title="Approvals and Revise" link="/platform/global-config/global-config-approvals.html" details="Which approval decisions exist, revise levels, and record version tracking." />
  <LandingCard icon="🔐" title="Security and Login" link="/platform/global-config/global-config-security.html" details="Login attempts, sessions, password policy, two-factor authentication, LDAP, and record-level security." />
  <LandingCard icon="⚡" title="Performance and Search" link="/platform/global-config/global-config-performance.html" details="Query time limits, per-user usage caps, and how searching by code and name behaves." />
  <LandingCard icon="🎨" title="Appearance" link="/platform/global-config/global-config-appearance.html" details="Startup behaviour, login page, fonts, grid colours, popups, and tooltips." />
  <LandingCard icon="🧩" title="Entities Screens" link="/platform/global-config/global-config-entity-screens.html" details="Extra pages, images, and colours the system adds to other entities' screens." />
  <LandingCard icon="🔔" title="Notifications and Messaging" link="/platform/global-config/global-config-notifications.html" details="Notification behaviour and sounds, plus the email and SMS sender accounts." />
  <LandingCard icon="🖨️" title="Reports and Printing" link="/platform/global-config/global-config-reports.html" details="Viewing format, logos and footers, dimension parameters, logging, value patterns, and Excel export." />
  <LandingCard icon="📎" title="Attachments and Storage" link="/platform/global-config/global-config-attachments.html" details="Where attachments live, disk space monitoring, scanning, and document conversion." />
  <LandingCard icon="🔄" title="Replication" link="/platform/global-config/global-config-replication.html" details="Which dimensions route records between sites, and how replication messages are delivered." />
  <LandingCard icon="💱" title="Currencies Tafqeet" link="/platform/global-config/global-config-currencies.html" details="The grammatical forms used when an amount is spelled out in words." />
</LandingGrid>

::: warning A few options deserve a second look
Three settings sit at a protected security level and **cannot be switched on from an ordinary session at all**: the two that allow reprocessing business requests dated before a closing entry, and *Do Not Check For Backup Existence*. Saving with one of them newly ticked is refused — *"You are not authorized to change the field … because it belongs to the security level L2Dangerous, please contact technical support team"* — and only a Namasoft support session can complete it. Switching them back off is not gated. Others are effectively implementation-time decisions: the **Issue Cost Policy** lives in supply chain settings, but the **rounding tolerances** and the **tax calculation model** on these tabs are just as consequential, because changing them alters the arithmetic on documents that already exist. Read the notes on each option before changing it on a live database.
:::

::: tip Options you may not see
Some options only appear when the matching licence is active. The replication options, for example, are hidden entirely on installations without the replication licence, and the eight line discounts appear only as far as your licensed discount count. An option described here but missing on your screen is almost always a licensing question, not a version one.
:::
