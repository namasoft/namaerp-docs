---
description: "How Nama ERP is deployed and run: the standard single-server topology, what to build, network ports, where data lives, backup and recovery, availability, upgrades and multi-site setups."
---
# Infrastructure Architecture

This page answers the question a systems administrator actually needs answered: what has to be built, opened, backed up and watched in order to run Nama ERP.

The short version is reassuringly small. Nama ERP needs one Windows server running Apache Tomcat and SQL Server, a backup destination, a folder for attachments if you choose to keep them outside the database, and — if users work from outside the office — a domain name and two open ports. Most installations, including large ones, never grow beyond that.

## The standard topology

For the great majority of customers, the application server and the database server are the same machine. Keeping them together removes a network hop from every database call, which is the single largest influence on how fast the system feels.

```text
                             Internet
                                 │
                          ports 80, 443
                        ┌────────▼────────┐
                        │ Router/firewall │
                        └────────┬────────┘
                                 │
        Office LAN ──────────────┼──────────────────────────┐
                                 │                          │
                    ┌────────────▼─────────────┐   ┌────────▼────────┐
                    │   Windows Server         │   │  Client devices │
                    │                          │   │                 │
                    │  Apache Tomcat + Java 21 │   │  browsers       │
                    │  Nama ERP application    │   │  POS terminals  │
                    │  SQL Server + database   │   │  phones/tablets │
                    │  Attachments folder      │   └─────────────────┘
                    │  Local backup folder     │
                    └────────────┬─────────────┘
                                 │ scheduled upload
                        ┌────────▼────────┐
                        │  Cloud storage  │
                        │  (off-site copy)│
                        └─────────────────┘
```

Two variations on this are common and both are supported:

**Split application and database servers.** Where corporate policy requires databases to live on a managed database estate, SQL Server can run on its own machine. Put the two on the same fast local network segment — the application is chatty with its database, and a slow or high-latency link between them will be felt by every user.

**Hosted on the cloud.** Nama ERP can be installed on a virtual private server or a dedicated server from any provider, and Namasoft also offers hosting on its own infrastructure, primarily in European data centres (Germany, France and Finland). The one constraint worth stating plainly: it must not be a shared web-hosting account. The system needs a machine, virtual or otherwise, that you control.

## What to build

Sizing is covered in detail in [System Minimum Requirements](../getting-started/system-minimum-requirements.md); the summary is that a production server should be a server-class processor with 64 GB of memory as a floor and 128 GB or more recommended, SSD storage for the operating system and the database, and separate slower storage for backups.

The software stack on that machine is:

| Component | Version |
|---|---|
| Operating system | 64-bit Windows; Windows Server 2022 or newer recommended |
| Java | JDK 21 or higher |
| Application server | Apache Tomcat 10 |
| Database | Microsoft SQL Server 2016 or higher; 2022 or newer recommended |

Installation itself is performed by a graphical installer that creates the database and its user, sets up the backup jobs, deploys the application and can obtain an SSL certificate — the full walkthrough is in the [Installation Guide](../getting-started/installation-guide.md).

## Network and ports

| Direction | Port | Purpose |
|---|---|---|
| Inbound | 8080 | Tomcat, the default HTTP port for the application. Open it in Windows Firewall for LAN access. |
| Inbound | 443 | HTTPS, once an SSL certificate is installed. This is what remote users should be using. |
| Inbound | 80 | Needed by the certificate authority to issue and renew a Let's Encrypt certificate. |
| Internal | 1433 | SQL Server. Only needs to be reachable from the application server — never expose it to the internet. |
| Outbound | 443 | Downloading releases and upgrades, cloud backup uploads, tax-authority e-invoicing, e-commerce connectors. |
| Outbound | mail/SMS | Your SMTP server and your messaging provider, for notifications and document delivery. |

For users to reach the system from outside the office you need a static IP address and a domain name pointing at it, with ports 80 and 443 forwarded from the router. Where a static IP is not available, a dynamic DNS service works. Certificates are issued through Let's Encrypt by the installer and renew automatically.

::: warning Do not publish the database
The only thing that should be reachable from the internet is the application over HTTPS. SQL Server's port belongs on the internal network, and remote administrative access to the server itself belongs behind a VPN.
:::

## Where the data lives

Nama ERP keeps data in three places, and a complete recovery plan has to account for all three.

**The database** holds every record the system manages — masters, documents, configuration, screen layouts, security rules and the audit trail. It is the centre of gravity; restore it and you have the system back.

**The attachments folder** is optional. By default the files users attach to records — scanned documents, contracts, photographs — are stored inside the database. Switching on **Externalize Attachments** moves them to an ordinary folder on disk, whose location is a setting, so it can be placed on whichever volume has room. Once they are there they are *not* inside the database, so the folder needs to be in the backup plan explicitly — a database backup alone will not bring them back. Retention and size limits are configured in [Attachment settings](../platform/global-config/global-config-attachments.md).

**Logs** are written to the application log on the server. They are the first place to look when something misbehaves, and they are where slow SQL statements are recorded when timing thresholds are enabled.

## Backup and recovery

The installer configures a backup regime through SQL Server Agent, and it is worth understanding rather than simply inheriting:

- A **full backup** on a nightly schedule.
- **Differential backups** every two to three hours through the working day, so the worst case is measured in hours rather than a day.
- A **cleanup job** that removes older backup files, so the backup volume does not silently fill.
- An optional **upload to cloud storage** — Google Drive, Dropbox, OneDrive or similar — which is what turns a backup into a disaster-recovery plan. A backup sitting on a second drive inside the same server does not survive the events you are insuring against.

Two things are worth adding to what the installer sets up. First, if attachments are kept outside the database, include their folder in the off-site copy. Second, test a restore before you need one; an untested backup is a hypothesis.

## Availability and disaster recovery

Be clear-eyed here, because it is the point reviewers press on. The standard, supported deployment is a **single application server**. Nama ERP is not normally run as a load-balanced cluster, and resilience is therefore built at the layer below the application: run the server as a virtual machine on a hypervisor with host-level failover and snapshots, keep the backup regime above honest, and hold a documented rebuild procedure.

That combination gives most organisations a recovery time of hours and a recovery point of a couple of hours. If your requirements are stricter than that, the design needs to be agreed with Nama technical support before the environment is built rather than after.

## Upgrades

Nama ERP is upgraded in place, and every installation runs the same build — there is no per-customer fork to reconcile. Upgrades are triggered by an administrator from the utilities page inside the system, which downloads and applies the new release; a command-line upgrade tool is available for servers where that is not practical. Both routes are described in the [Installation Guide](../getting-started/installation-guide.md).

Database schema changes are applied automatically as part of starting the upgraded application, so a normal upgrade is: take a fresh backup, apply the upgrade, restart, verify. The one configuration detail that catches people out is that the Tomcat service must run under the Local System account for the in-application upgrade to work — if self-upgrade stops functioning, that setting is almost always the reason.

::: tip Keep a test environment
SQL Server Developer Edition is free for non-production use, which makes a test installation cheap. Restoring last night's production backup into it gives you a realistic place to rehearse upgrades and try configuration changes before they reach live data.
:::

## Multi-site deployments

Where branches are connected on reliable links — which today includes most of them — they simply use the central installation over the network, and there is nothing extra to deploy. Where connectivity genuinely cannot be relied upon, Nama supports running an installation at the site and **replicating** documents and master data with head office. This adds real operational complexity: two databases to back up, a replication link to monitor, and conflict rules to agree. Treat it as a considered exception and design it with Nama technical support — see [Replication](../admin/reprocessing/replication.md).

## Day-to-day operations

Routine administration happens from inside the application rather than on the server console. The utilities page carries the upgrade, diagnostic and maintenance tools; background work is visible and retryable through the business requests and scheduled task views; and the reprocessing tools exist for the recovery cases. The relevant reading is [Batch Utilities That Work From a List File](../admin/reprocessing/batch-utilities-from-file.md), [Scheduled Tasks](../platform/automation-and-rules/scheduled-tasks.md), and the [Reprocessing](../admin/reprocessing/index.md) and [Troubleshooting](../admin/troubleshooting/index.md) sections.

On the server itself, the recurring jobs are the ones any Windows server needs: confirm the backups ran, watch free space on the database and backup volumes, keep the operating system patched, and renew nothing by hand — the certificate renews itself.
