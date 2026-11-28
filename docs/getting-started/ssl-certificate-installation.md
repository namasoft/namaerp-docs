---
description: "How to put Nama ERP and the customer portal on HTTPS with the installer's SSL helper: a free Let's Encrypt certificate, a certificate bought from a provider (with the CSR), or a self-signed certificate for a site used only inside the company."
---

# Installing an SSL Certificate

An SSL certificate is what lets users open Nama ERP at an `https://` address, so the browser shows a padlock and everything between the browser and the server is encrypted. The Nama installer has an **SSL helper** that does the whole job: it gets or checks the certificate, installs Apache in front of Tomcat, writes the HTTPS site and restarts Apache.

The helper offers three kinds of certificate. Which one you need depends on one question: can the server be reached from the internet?

| Your situation | Choose | Who trusts it |
|---|---|---|
| The server has a public domain name, and port 80 reaches it from the internet | **Free certificate from Let's Encrypt** | Every browser and phone. It renews itself. |
| You bought a certificate (Sectigo, GoDaddy, DigiCert, …), or your IT department gave you one from the company's own CA | **A certificate I bought or received from my IT department** | Every browser for a bought certificate; for a company CA, the devices that trust that CA |
| The site is opened only from the company's network, by a local IP address or name, and you have no certificate | **A certificate I bought…**, then **Create self-signed...** | Only the devices you install it on |

The SSL helper's window is in English only, so the labels below are quoted as the window shows them.

## Opening the SSL helper

**For Nama ERP itself:** open the installer, check that the **server address** (the site URL users will type, starting with `https://`) and the Tomcat path are filled in, then click **Install SSL**. The address must not have a port: `https://erp.company.com`, not `https://erp.company.com:8443`.

**For the customer portal:** in the installer, click **More ▼ → Create SSL for Customer Portal**. You are asked for:

- the portal's HTTPS address, for example `https://portal.company.com`, as a host only, with no port and no path;
- the portal's web app name in Tomcat, which is the name of its WAR file without `.war` (`customerportal` by default).

The portal needs a host name of its own. If you type the same host as the ERP, the installer refuses with *The host {host} is the GUI Server URL of {Tomcat}. The customer portal needs a host of its own.*

Either way, the **SSL Certificate Installation** window opens with the site address at the top, a **Certificate source** box where you choose one of the options below, and the **Step 2: Apache HTTP Server** panel underneath. If Apache is not installed yet, click its **Download** button there, or **Browse...** to an Apache folder you already have. The helper remembers the source you chose last time.

The **Install SSL Certificate** button stays disabled until the chosen source is ready. The reason it is disabled is shown in red next to it, so you always know what is still missing.

## Free certificate from Let's Encrypt

This is the right choice for any server that is published on the internet. The certificate costs nothing and renews itself every couple of months, so nobody has to remember it.

It needs:

1. a **domain name** (for example `erp.company.com`) pointing to the server's public IP address. Where the office has no static IP, a dynamic DNS service works;
2. **ports 80 and 443** forwarded from the router to the server. Let's Encrypt checks port 80 to confirm that you control the name.

In **Step 1: WACS (Let's Encrypt Client)**, point **WACS Path** at the win-acme folder, or click **Download** to fetch it, and give a **Notification Email**. Then click **Install SSL Certificate**. The helper first publishes the site on port 80 and asks the Nama licence server to open it from outside. If that fails, the log says *Please review your firewall setting for port 80, and make sure that the url http://… is reachable from outside the network*: fix the port forwarding and try again. The **Skip URL validation during installation** option in the Apache panel skips this outside check, which is useful only when you know the site is reachable but the check cannot see it.

## A certificate you bought or received

Choose **A certificate I bought or received from my IT department**. This path does not use port 80 and does not check the site from outside, so it also works for a server that is reachable only inside the company, as long as its name is covered by the certificate, a wildcard such as `*.company.com` for example.

### 1. Ask for the certificate with a CSR

A provider issues a certificate in answer to a **certificate request (CSR)**. Making the CSR in the installer saves the most trouble, because the private key then stays on the server and the installer finds it by itself later.

1. Click **Generate CSR...**.
2. **Name of the site (common name)** is filled in from the site address. Under **Other names**, add any other names the same certificate should cover, separated by commas, for example `www.erp.company.com` or the portal's host.
3. Organisation, city and country are optional. Most certificates sold today (domain validated) ignore them.
4. Leave **Key type** on **RSA 2048 (works everywhere)** unless the provider asks for something else.
5. Click OK. The request appears with a **Save as...** button. Paste the text into the provider's site, or send them the `.csr` file.

The key is saved on the server, in the `letsencrypt\pending` folder next to the Tomcat folder. Do not delete it: without it, the certificate the provider sends cannot be used.

::: tip The CSR was made in IIS or the Windows certificate manager
Then the private key is inside Windows, not in any file the provider sends. Complete the request in IIS (or the certificate manager), export the certificate as a **.pfx with its private key**, and add that `.pfx` file in the next step.
:::

### 2. Add the files the provider sent

When the provider's email arrives, open the SSL helper again, choose the same source, and add everything they sent. There is no need to sort the files first:

- **Add files...** picks files from disk; you can also drop them on the list.
- **Paste text...** takes certificate text copied from the provider's portal or an email (the blocks that start with `-----BEGIN CERTIFICATE-----`).

The installer reads each file by its contents, not by its extension. It understands a provider's `.zip` as it arrives, `.crt`, `.cer`, `.pem`, `.ca-bundle`, `.p7b`, `.pfx` / `.p12` and `.key` files. A `.pfx` or an encrypted key asks for its password as soon as you add it; type the password it was exported with. If you close that box, the file shows **Password needed** until you select it and click **Enter password...**. A file the installer does not need, such as a readme in the zip, shows **Not used**, which is harmless. **Remove** takes a file out of the list.

### 3. Read the Result panel

After every change, the **Result** panel checks the certificate as a browser would:

| Line | What it tells you |
|---|---|
| Issued to | The names the certificate covers |
| Issued by | The authority that issued it |
| Valid | From and to dates, and the days left |
| Chain | The path from your certificate up to the root authority. A tick means the server trusts it. |
| Private key | Whether the matching key was found, and whether it came from a CSR made by this installer |
| Site address | Whether `https://<your site>` is covered by the certificate |

Below the table, any problems are listed. An **Error** keeps the Install button disabled; a **Warning** still lets you install. When nothing is wrong the panel says **Ready to install.** The order in which the provider's files arrived does not matter: the installer puts the chain in the right order itself. If an intermediate certificate is missing from the files, it downloads it from the address written in the certificate and says so.

Then click **Install SSL Certificate**.

### Replacing the certificate when it expires

Bought certificates no longer last a year. Since 15 March 2026 a public certificate is valid for at most 200 days, and from 15 March 2027 for at most 100 days, so plan to repeat this two to four times a year. Nama ERP does not warn you before a certificate expires. Note the expiry date shown in the Result panel, or set up the [EANotifyIfSSLCertificateAboutToExpire](/entity-flows/supplychain/EANotifyIfSSLCertificateAboutToExpire) entity flow to email you in time.

To renew, repeat the same three steps: **Generate CSR...** (a new key is made each time, which is the safe default; the **Keep the key of the certificate installed now** option is there if the provider insists on the old one), give the CSR to the provider, add what they send and install. The new files replace the old ones; the old ones are kept as a backup.

### Moving a site from Let's Encrypt to a bought certificate

If the site used Let's Encrypt before, win-acme still has a renewal scheduled for it, and at its next run it would overwrite the certificate you just installed. The Result panel shows this as an error, and a box appears: **Cancel the Let's Encrypt renewal for &lt;host&gt;**. Install stays disabled until you tick it; the installer never cancels the renewal without that tick. When you install, the renewal is cancelled and the log confirms *The Let's Encrypt renewal … was cancelled*.

### One certificate for the ERP and the portal

A certificate that covers several names, or a wildcard, can be used for more than one site. When installing SSL for the second site, click **Use a certificate already on this server...**. The list shows every certificate already installed on this server that covers the new site's address and has not expired. Pick one, and it is loaded as if you had added its files.

## Self-signed certificate for an internal-only site

When users open the system only from the company's network, often by the server's local IP address such as `192.168.1.10`, no public authority will issue a certificate for that address. A self-signed certificate still encrypts the connection, but each device has to be told to trust it.

1. Choose **A certificate I bought or received from my IT department**, then click **Create self-signed...**.
2. **Other names and IP addresses** is filled in with the server's local IP addresses. Add any other name users type to reach the server.
3. **Valid for (days)** starts at 825, the longest that Apple devices accept.
4. Click OK. The Result panel shows the certificate with a warning that devices will show a security warning until it is installed on them. Click **Install SSL Certificate**.

When it finishes, the installer saves a copy of the certificate as `<host>-for-devices.crt` in the `letsencrypt` folder next to the Tomcat folder, and the completion message names that file. Copy it to each device, open it and install it **for the Local Machine** under **Trusted Root Certification Authorities**. Until then, the browser on that device warns about the site.

## What happens when you click Install

Whatever the source, the installer:

1. for a certificate you added (bought, received or self-signed), keeps a backup of the current certificate files in `letsencrypt\backup\` and a copy of the files you added in `letsencrypt\imported\`, for support. A Let's Encrypt installation skips this step;
2. writes the certificate as `<host>-chain.pem` and its key as `<host>-key.pem` in the `letsencrypt` folder. The key is saved without a password, because Apache runs as a Windows service and cannot ask for one;
3. writes the HTTPS site for Apache, and turns the plain `http://` address into a redirect to `https://`;
4. **tests the new Apache configuration before restarting.** If Apache rejects it, the log says *Apache rejected the new configuration, the previous configuration was restored*, followed by Apache's own explanation, and the previous files are put back. A mistake therefore never takes down the other sites on the same Apache;
5. restarts Apache and connects to the site on port 443, then writes in the log what is actually being served: *Apache now serves for &lt;host&gt;: …*.

## Messages you may see

These messages come from the installer and appear in English only.

| Message | Why | What to do |
|---|---|---|
| *The private key for this certificate was not found. If the certificate request (CSR) was made in IIS or the Windows certificate manager, the key is in Windows: complete the request there, export the certificate as a .pfx with its private key, and add the .pfx here* | Only the certificate was added; its key is somewhere else | Add the key file, or the `.pfx` exported from Windows. If the CSR was made by this installer on another server, add the key from that server's `letsencrypt\pending` folder. |
| *None of the private keys match this certificate. The certificate was issued for a different certificate request (CSR)* | The key in the list belongs to another request | Find the key of the CSR you actually sent, or make a new CSR and ask the provider to re-issue the certificate. |
| *The certificate is for {names}, not for {host}* | The site address is not among the names the certificate covers | Use a certificate issued for this host, or change the site address to one it covers. A wildcard `*.company.com` covers `erp.company.com` but not `a.b.company.com`. |
| *Only CA certificates were found. Add the server certificate issued for {host}* | Only the provider's bundle was added | Add the certificate issued for your site, usually the file named after your domain. |
| *The chain is incomplete: the certificate of {issuer} is missing. Add the CA bundle the provider sent; devices that do not have it will show a security warning* | An intermediate certificate is missing and could not be downloaded | Add the `.ca-bundle` or intermediate file from the provider. You can still install, but some devices will warn. |
| *The certificate is issued by {CA}, which this server does not trust. Devices that do not trust it will show a security warning* | The certificate comes from a company or internal CA | Normal for a company CA. Make sure the company's devices trust that CA. |
| *The certificate expired on {date}* / *The certificate is not valid before {date}* | The certificate is outside its validity dates | Get a current certificate. For "not valid before", check the server's date and time. |
| *The certificate expires in {n} days* | Fewer than 30 days are left | You can install, but start the renewal now. |
| *The password is wrong. {file} is protected by a password:* | The password entered for a `.pfx` or an encrypted key does not open it | Type the password the file was exported with. Ask whoever exported it if you do not have it. |
| *A Let's Encrypt renewal exists for {host}. It will replace this certificate at its next renewal. Tick the box below to cancel it* | The site used Let's Encrypt before | Tick **Cancel the Let's Encrypt renewal for {host}**, then install. |
| *Please review your firewall setting for port 80, and make sure that the url http://{host}/ is reachable from outside the network* | Let's Encrypt only: the site cannot be opened from the internet on port 80 | Fix the DNS record and the port forwarding for port 80, then try again. |
| *Could not request the certificate from Let's Encrypt, please review the logs above* | Let's Encrypt refused to issue the certificate | Read the win-acme output above the message in the log; it gives Let's Encrypt's own reason. |
