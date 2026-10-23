---
description: "Minimum and recommended server hardware and software for an on-premise Nama ERP installation, supported browsers, and the options for cloud hosting."
---
# System Minimum Requirements

Nama ERP is a web-based application, It can be hosted on-premise or on-cloud

If you will host Nama ERP on-premise, here are the minimum and recommended hardware and software specifications:


| **Spec**                     | **Minimum**                                                                                                                                                     | **Recommended**                                                 |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| **Processor**               | Core i5 or i7, recent generation                                                                                                                                | Intel Xeon or AMD Epyc                                          |
| **Storage**                 | 512 GB SSD for OS and Database<br>1 TB HDD for Backups                                                                                                          | 512 GB SSD for OS<br>512 GB SSD for Database<br>2 TB HDD for Backups |
| **RAM**                     | 64 GB                                                                                                                                                           | 128 GB or more                                                  |
| **OS**                      | Any recent Windows OS (64 Bit)                                                                                                                                  | Windows Server 2022 or Newer                                    |
| **Database Management System** | SQL Server 2016 (Standard, Developer or Enterprise edition)                                                                                                                                                 | SQL Server 2022 or Newer                                        |
| **Network**                 | To be able to access the server from outside your company LAN, we recommend a static IP, if none is available a DDNS service should be configured on the router |        |
| **Cloud Backup**            | 2 TB Google Drive account for daily backups<br>[Check plans](https://one.google.com/about/plans)                                                                |  |

The installer checks the database server before it writes anything and stops on two counts: a SQL Server older than **2016** (major version 13), and the **Express** edition at any version. Express is refused outright — install Standard, Developer or Enterprise.

## Browsers

Users work in an ordinary web browser, but not an old one. The login page checks the browser's version and refuses to go further on anything older than:

| Browser | Oldest version that works |
|---|---|
| Chrome, Edge, Opera and other Chrome-based browsers | 120 |
| Firefox | 117 |
| Safari | 16.5 |

An older browser sees only this message instead of the login page — the fix is to update the browser, not anything on the server:

*Your browser version is too old to run Nama ERP. Please update your browser to the latest version.* — «إصدار المتصفح الحالي قديم ولا يدعم نظام نما. برجاء تحديث المتصفح إلى أحدث إصدار.»

## Nama ERP can be installed on-cloud
#### Namasoft Provides Cloud ERP Hosting. The data centers we use are mainly in Europe (Germany, France, and Finland). Please request a quote from our sales team.

#### You can also install on your own cloud server, but make sure that the server is not a "shared host". Nama ERP can be installed on Virtual Private Servers (VMs) or dedicated servers.

