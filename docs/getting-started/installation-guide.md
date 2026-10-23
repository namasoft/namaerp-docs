---
description: "How to install Nama ERP on Tomcat and SQL Server with the Nama installer: prerequisites, database setup, SSL, confirming the install, upgrading, and fixing common installer problems."
---
# Nama ERP Installation Guide

**Nama ERP** is a Java-based web application that runs on Apache Tomcat and uses Microsoft SQL Server as its database engine.

## System Requirements

* **Operating System:** 64-bit (Windows Server recommended)
* **Java JDK:** Version 21 or higher
  [Download JDK 21](https://www.oracle.com/eg/java/technologies/downloads/#jdk21-windows)
* **Apache Tomcat:** Version 10
  [Download Tomcat 10](https://tomcat.apache.org/download-10.cgi)
* **Database Engine:** Microsoft SQL Server 2016 or higher (SQL Server 2022 recommended)
  For test environments, use **SQL Server Developer Edition**
  [Download SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
* **SQL Server Management Studio**
  [Download SQL Server Management Studio](https://learn.microsoft.com/en-us/ssms/install/install#:~:text=Download%20SSMS)
* **7-Zip** (for handling compressed files)
  [Download 7-Zip](https://www.7-zip.org/download.html)
* **Notepad++** (for viewing logs or editing configuration files)
  [Download Notepad++](https://notepad-plus-plus.org/downloads/)
* **Nama ERP Installer**
  [Download Installer](https://namasoft.com/bin/installer/installer.zip)

## Database Setup

* Enable **Mixed Mode Authentication** in SQL Server.
* Create a database (avoid using the default name `namaerp` in production).
* Create a SQL user (or use `sa`) and grant full access to the database.
* Enable **TCP/IP Protocol** using **SQL Server Configuration Manager**.
* For **named instances**, assign a static port using the **IPAll** settings.

::: tip If you are installing SQL Server on a modern SSD drive, you might face an issue after the installation 
**Sample Log content** (Log is usually in `C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Log\ERRORLOG` )
```log
Error: 5179, Severity: 16, State: 1.
Cannot use file 'data file path', because it is on a volume with sector size 8192. SQL Server supports a maximum sector size of 4096 bytes. Move the file to a volume with a compatible sector size.
```
* Solution:
    1. Unistall SQL Server
    2. Run the following powershell script:
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\stornvme\Parameters\Device" -Name   "ForcedPhysicalSectorSizeInBytes" -PropertyType MultiString        -Force -Value "* 4095"
```
    3. Restart Windows
    3. Install SQL Server again 
:::

## Using the Installer

The **Nama ERP Installer** provides a graphical interface with the following key features:

### Core Installation Features
* Creating database and database users
* Generating SQL Server Agent **full backup job**
* Creating **differential backup job** (runs every 2–3 hours)
* Generating **backup cleanup script** (removes old backups)
* Option to **upload backups to cloud storage** (Google Drive, Dropbox, OneDrive, etc.)
* Automatic **SSL certificate** creation using [Let's Encrypt](https://letsencrypt.org/)

### Interface Sections
1. **License Information**: License key, customer name, sub-server (auto-populated)
2. **Database Configuration**: Server, port (1433), database name, credentials
3. **Server Configuration**: Tomcat path (auto-detected), server address
4. **Installation Paths**: Extras.zip URL/path, download destination
5. **Progress Monitoring**: Real-time status, logs, and progress bars

### Smart Features
* **Auto-detection**: Common Tomcat paths, existing configurations
* **Real-time validation**: Visual feedback (green/red borders) for field inputs
* **Configuration persistence**: Auto-save/restore settings via `installer.properties`
* **License key integration**: Automatic customer/sub-server population

## SSL Certificate Requirements

To install SSL with Let's Encrypt, you need:

1. A **static IP address**
2. A **domain name** that points to the static IP
3. **Port forwarding** for ports `80` and `443` from your router to your server

::: tip
If a static IP is not available, you can use a **Dynamic DNS service** (e.g., selfip, DDNS).
:::

## Supported Databases

While SQL Server is the default, other databases may be supported. Please contact Nama ERP technical support for confirmation before using alternatives.

---

## 📺 Full Installation Walkthrough

Watch the full installation tutorial here:
👉 [https://youtu.be/6UWe9GyZC20](https://youtu.be/6UWe9GyZC20)

## Confirming Nama ERP Installation

By default, Apache Tomcat runs on port `8080`. If you did not change the port during setup, you can confirm that Nama ERP is installed correctly by visiting:

```
http://localhost:8080/erp/
```

If the login page appears, the installation was successful.

To allow access for other users on your local network (LAN), make sure port `8080` is open in **Windows Firewall**:

* Go to **Windows Defender Firewall** > **Advanced Settings**
* Under **Inbound Rules**, create a new rule to allow traffic on port `8080`

---

## Upgrading Nama ERP

You can upgrade Nama ERP from the **utils page** within the system interface. Multiple upgrade methods are available depending on your setup.

### Manual Upgrade

To upgrade Nama ERP manually:

1. Download the upgrade tool:
   [https://namasoft.com/bin/upg-wget.jar](https://namasoft.com/bin/upg-wget.jar)

2. Copy the file into your **Tomcat installation folder**

3. You can run the JAR file by:

    * **Double-clicking** it
      **OR**
    * Using **Windows Command Prompt**:

      #### Steps:

        * Open Command Prompt (`cmd`)

        * Navigate to your Tomcat installation folder using the `cd` command, for example:

          ```cmd
          cd "C:\Program Files\Apache Software Foundation\Tomcat 10.1"
          ```

        * Run the upgrade tool:

          ```cmd
          java -jar upg-wget.jar
          ```

This tool will automatically download and apply the latest Nama ERP updates.

### How to Allow Downloading Releases from Utils Page?

To enable the system to download and install updates from the **utils** page (i.e., support self-upgrade functionality), the Tomcat service must run under the **Local System Account**.

::: tip
 This configuration is typically set automatically during the Nama ERP installation. If auto-upgrade stops functioning, follow these steps to restore it
:::

1. Open the **Tomcat Service Configuration Utility**:

    * Navigate to:
      `C:\Program Files\Apache Software Foundation\Tomcat 10.1\bin\tomcatw.exe`
    * Or search in the Windows Start Menu for: **Configure Tomcat**

2. In the configuration window, go to the **Log On** tab.

3. Select the radio option **Local System account**.

4. Save the configuration and restart the Tomcat service.

![Configure Tomcat Service Logon as](../ar/getting-started/images/installation-configure-logon-to-enable-auto-upgrade.png)

## Troubleshooting

### Common Issues & Solutions

**Pre-Installation Validation**: Use **Perform Checks** (F5) to diagnose problems:

1. **Port Conflicts**: Another program using Tomcat's port (usually 8080)
2. **Database Problems**: SQL Server not running, TCP/IP disabled, or incorrect credentials  
3. **Java Issues**: Missing or incorrectly configured Java path
4. **Invalid Paths**: Non-existent Tomcat directory or malformed URLs

### Debugging Installer Commands

::: tip Viewing Detailed Installer Output
To see detailed output from commands that run within the installer (useful for debugging installation issues), you can enable process output printing by modifying the installer launcher script.

Edit the `install-nama-erp.js` file and replace:
```javascript
Arguments = " -jar \""+oFolder.path+"\\nama-installer-0.0.1-SNAPSHOT.jar\"";
```

With:
```javascript
Arguments = " -Dprint-process-output=true -jar \""+oFolder.path+"\\nama-installer-0.0.1-SNAPSHOT.jar\"";
```

This will display the output of all commands executed by the installer, helping you identify the exact point where an installation issue occurs.
:::

### Error Resolution Process
1. **Run Diagnostics** → **Review Logs** → **Fix Fatal Errors** → **Retry Installation**
2. Use **Load From Tomcat** to import existing configurations
3. **Save Config** preserves settings between sessions for troubleshooting

## Installer Controls & Operations

### Main Action Buttons
* **Start Installation**: Begins installation after validation (Enter key or green button)
* **Perform Checks** (F5): Validates Tomcat, database, Java, and port configuration
* **Save Config** (Ctrl+S): Saves settings to `installer.properties`
* **Load From Tomcat** (Ctrl+L): Imports configuration from existing installation

### Advanced Operations  
* **Request Key**: Automated license key request from Nama servers with approval monitoring — see [Licensing](/getting-started/licensing)
* **Install SSL**: Launches Let's Encrypt certificate installation wizard
* **Migrate Tomcat**: Upgrades from Tomcat 9 to Tomcat 10 with configuration preservation
* **DB Scripts**: Generates database setup scripts

### Validation & Auto-Detection
* **Path Detection**: Automatically finds Tomcat in common locations
* **Field Validation**: Real-time feedback with colored borders (green=valid, red=invalid)
* **Configuration Import**: Loads existing settings from `nama.properties`
* **Progress Monitoring**: Real-time download progress, installation status, and detailed logging
