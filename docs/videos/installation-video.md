---
description: "Timestamped notes for the Nama ERP installation video: installing SQL Server and its tools, running several Tomcat instances on one server, restoring databases, database users, backup folders and schedules, SSL certificates, DNS and testing the installation."
---
# Documentation for the Nama ERP Installation Video and Supporting Software
- Installing Nama ERP

[Watch the video](https://youtu.be/EVaF2BtVPUU)

## Introduction and Basic Server Setup
[00:00:01 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=1)
Hello everyone, this video explains how to set up a new server with multiple Tomcat instances and multiple databases from scratch. It is recommended to use Google Chrome. The first step is to download the SQL Server Edition relevant to the client, and the language is changed from German to English to avoid issues with the Microsoft download page. The download link is copied and opened on the server to begin downloading the software.

---

## Downloading and Installing SQL Server Updates
[00:01:24 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=84)
The latest SQL Server updates for the Windows operating system must be downloaded to ensure the installation is up to date. It is recommended to use a legitimate and affordable Windows license available at low cost. The video uses Windows Server 2022 Standard Edition, which is considered very suitable for this purpose.

---

## SQL Server Installation Steps and Completing the Setup
[00:02:46 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=166)
- Open the setup file and choose the installation type (New SQL Server Installation).
- Select the appropriate edition based on the client's license (Developer or Standard).
- Enable the automatic updates option along with Windows updates.
- An explanation is given of distributing data across different drives, allocating drives for the application, others for Tomcat instances and databases, and others for backups.
- Enable backup options to ensure fast backup speeds.
- Choose the Authentication Mode and set a strong password for the "sa" user, avoiding weak names.
- Add new users to manage the databases.
- Continue the installation process until it is complete.

---

## Installing SQL Server Management Studio and Notepad++
[00:08:08 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=488)
- Download and install Microsoft Management Studio alongside SQL Server during installation.
- Download Notepad++ 64-bit version for use in text editing.
- Make sure the 64-bit version of Java is installed, as some Tomcat instances depend on it.

---

## Setting Up Multiple Tomcat Instances on a Single Server
[00:10:05 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=605)
- When more than one Tomcat instance is needed, it is preferable to number the ports and focus on organizing the names.
- Tomcat number 10 uses port 10.10.10.xxx, and so on for other numbers in sequence, to avoid conflicts.
- Rename server services to match the Tomcat numbers.
- Install each Tomcat instance independently, organizing its respective databases on the designated drives.

---

## Allocating Databases and Storage Drives
[00:13:52 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=832)
- An explanation of how to allocate databases to one of the suitable large storage drives instead of the default C drive.
- Re-verify the database names and link them to the appropriate users to prevent permission conflicts.

---

## Manual Download and Installation of the Installer and Linking with IIS
[00:15:39 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=939)
- Download the necessary software files, extract them, and link them with IIS (Internet Information Services) to run the Tomcat instances.
- Configure the server's TCP/IP settings to run services and access databases over the network.
- Confirm the connection works using official Microsoft tools.

---

## Restoring Databases (Restore)
[00:18:26 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=1106)
- Import databases from backup files.
- Name the databases and use the Express edition as needed.
- Create a separate database user for each database to secure access.

---

## Configuring User Accounts for Databases
[00:20:10 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=1210)
- Create a dedicated user account for each database, with precise permission definitions.
- Set strong, different passwords for each user to avoid security issues.
- An explanation of how to link a specific Tomcat instance to a specific database and server.

---

## Setting Up the Backup Folder
[00:23:34 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=1414)
- Set up a dedicated backup folder on a separate drive.
- An explanation of the automatic backup mechanism and the difference in usage between cloud and local (localhost) environments.
- Backups are compressed and uploaded to the network to ensure easy recovery.

---

## Backup Repetition Policy and Backup Schedule
[00:25:06 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=1506)
- Backups are performed at repeated intervals (every 10 minutes or every quarter hour) to minimize data loss in emergency situations.
- Full daily backups are performed during hours when the workload on servers is lower (for example, at 3 AM).
- The difference between backup schemes (Full backup and Differential backup).

---

## Executing SQL Scripts to Create Users and Set Permissions
[00:26:00 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=1560)
- An explanation of executing SQL scripts for creating users and linking them to databases.
- Clarification of the importance of separating users for each Tomcat instance and database to prevent errors and security issues.
- Modify login passwords as needed.

---

## Completing the Installation of Additional Tomcat Instances
[00:27:32 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=1652)
- Steps for reinstalling subsequent Tomcat instances (such as 11, 12) with the necessary adjustments to names, ports, and databases.
- Confirm that all Tomcat instances are running and responding via their designated links.

---

## Setting Up SSL Certificates to Secure the Connection
[00:30:23 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=1823)
- Install SSL certificates to secure the connection via HTTPS.
- Open ports 80 and 443 in the firewall and on the router when working on an external network.
- Work with Let's Encrypt technologies to obtain a free SSL certificate.
- Configure HTTPS on the Tomcat Server.

---

## Resolving DNS and Domain Name Issues and Additional Steps
[00:31:24 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=1884)
- An explanation of DNS routing issues and domain name problems during SSL installation.
- Modify client names in the settings to match a correct domain name.
- Tips for solving router port-forwarding issues, especially in Egypt and other locations.

---

## Testing Operation and Confirming Successful Installation
[00:34:33 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=2073)
- Test opening different Tomcat pages via a web browser using IP addresses or the domain name with HTTPS.
- Handle errors that occur when the server fails to load and the service needs to be restarted.

---

## Full Programmatic Backup and Setting Up Automated Backup Schedules
[00:40:22 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=2422)
- A detailed explanation of creating a backup job via SQL Server Agent.
- Set up different backup intervals (daily, every 10 minutes as needed).
- Enable the Full Recovery Model to make backups comprehensive.
- Handle Differential and Full Backup in cloud computing environments.

---

## Video Conclusion and General Tips
[00:43:35 - YouTube video](https://youtu.be/EVaF2BtVPUU?t=2615)
- Confirmation that all steps are detailed and clear, and that viewers can contact the presenter for any inquiries.
- Encouragement for viewers to follow the steps exactly as presented without modifications to avoid problems.
- A clarification that working in an organized, step-by-step manner ensures the successful setup of an efficient SQL Server with multiple Tomcat instances and databases, with secured backups.

---

> **Tip**
> Always ensure you use strong passwords for all database accounts, secure only the necessary open ports, and monitor system and software updates.

