---
description: "The OAuth File screen that holds Google sign-in access for Gmail sending and Google Drive backup checks: its fields, authorising a file step by step, lost access and using your own Google application."
entities: [OAuthFile]
menu: Administration → Other → OAuth File
---

# OAuth Files (Google Sign-In for Gmail and Google Drive)

Google no longer lets a program sign in to Gmail or Google Drive with a plain username and password.
Instead, the account owner signs in to Google once, in a browser, and grants the program a permission
that Google can later renew or withdraw. An **OAuth File** is the record in Nama that holds that
permission for one Google account. Nothing else in the system talks to Google directly: an email
sender account or a backup check simply points at an OAuth File, and the file supplies the access.

You need one when:

- outgoing email is sent through a **Gmail** account (the email sender account on Global Config
  points at the file instead of carrying a password), or
- a scheduled task checks that the nightly **database backups arrived on Google Drive**, or empties
  the Drive account's trash so old backups do not fill it.

## The screen

| Field | What it means |
|---|---|
| **Code / Name** | Your own reference. Entity flows and email settings find the file by its code. |
| **Used For Checking Backups On Google Drive** | Asks Google for read-only access to the list of files on Drive. Needed by the backup check. |
| **Used For Emptying Trash of Google Drive Account** | Asks Google for full Drive access, which emptying the trash requires. |
| **Used For Sending Emails From Gmail** | Asks Google for permission to send mail from the account. Needed by an email sender account. |
| **Authorized** | Ticked by the system once Google has granted access. You do not tick it yourself. |
| **User Email** | Filled by the system with the Google account that granted access. |
| **Credentials JSON** | Optional. Leave it empty to use Nama's own Google application. Paste your own Google Cloud OAuth client here only if your organisation insists on its own (see below). |

You must tick at least one of the three **Used For** options, otherwise the record will not save. Tick
only what you will use. Each option widens what Google asks the account owner to allow.

The screen also carries two buttons, **Start OAuth Flow** and **Revoke Authentication**.

![An OAuth File set up for sending email from Gmail, with the Start OAuth Flow and Revoke Authentication buttons](../ar/admin/images/administration/oauth-file-gmail-en.png)

## Authorising a file, step by step

A head office wants its invoices emailed from `invoices@nilegroup.com`, a Google Workspace mailbox.

1. Create an OAuth File with code `GMAIL-INV`, tick **Used For Sending Emails From Gmail** and
   save. **Authorized** is empty.
2. Press **Start OAuth Flow**. A new browser tab opens and sends you to Google's sign-in page.
3. Sign in **as `invoices@nilegroup.com`** (not as yourself) and accept the permissions Google
   lists.
4. Google hands control to a short Namasoft page that passes the grant back to your Nama server and
   shows *Response sent correctly*. The tab closes itself after a few seconds.
5. Reopen or refresh the OAuth File. **Authorized** is now ticked and **User Email** reads
   `invoices@nilegroup.com`.
6. On Global Config, in the **Email Sender Settings** table, add (or edit) the sender row: put
   `invoices@nilegroup.com` in **Username**, the Gmail SMTP server and port, and choose `GMAIL-INV`
   in the **OAuth File** column. See [Notifications settings](/platform/global-config/global-config-notifications#Email-sender-accounts).

::: warning The username must be the account that signed in
Global Config refuses to save if the row's **Username** is not exactly the file's **User Email**, if
the file is not authorised, or if **Used For Sending Emails From Gmail** is not ticked on it. Signing
in to Google with the wrong account in step 3 is the usual cause. Press **Start OAuth Flow** again
and sign in with the right one.
:::

The browser you press the button in must be able to reach both Google and your Nama server, because
the last hop of the sign-in is your own browser calling your own server.

## When the access is lost

Access is dropped, and **Authorized** clears, in these cases:

- You press **Revoke Authentication**. Nama forgets the stored grant at once.
- You change any of the three **Used For** options or the **Credentials JSON** and save. The
  permissions asked for have changed, so the old grant no longer fits.
- You delete the file.
- Google refuses to renew the grant, for example because the account owner removed Nama's access
  from their Google account or changed the password. The task or email that needed the file then
  fails with a message telling you to open the file and start the flow again.

In every case the fix is the same: press **Start OAuth Flow** and sign in again. Pressing it on an
already authorised file is also safe; it drops the old grant and asks for a new one.

::: tip Moving the system to another server
The grant itself is kept on the application server, not in the database. After you move Nama to a
new server or restore the database somewhere else, authorise each OAuth File again before you rely
on it.
:::

## Using your own Google application

By default the sign-in page tells the user that **Nama ERP** is asking for access. Some
organisations' Google Workspace policies only allow applications they registered themselves. In that
case, create an OAuth client of the *Web application* type in your Google Cloud project. Add
`https://www.namasoft.com/googleauth.html` to its authorised redirect URIs, because that is where
Google returns to before your server receives the grant. Then paste the client's downloaded JSON
into **Credentials JSON** and press **Start OAuth Flow**.

## Where OAuth Files are used

| Used by | Option it needs |
|---|---|
| A Gmail row in Global Config → **Email Sender Settings** | Used For Sending Emails From Gmail |
| [Check Daily Backup On Google Drive](/entity-flows/core/EACheckDailyBackupOnGoogleDrive) (a scheduled task that checks each backup folder for today's or yesterday's backup and sends a notification) | Used For Checking Backups On Google Drive, plus Used For Emptying Trash if the task is set to empty the trash at the end |
| [Clear Google Drive Trash](/entity-flows/core/EAClearGoogleDriveTrash) | Used For Emptying Trash of Google Drive Account |
| [Refresh Google Drive token](/entity-flows/core/EARefreshGoogleDriveOrMailToken) (tests the connection to Drive and renews the access) | Used For Emptying Trash of Google Drive Account |
| [Prepare backup folder list](/entity-flows/core/EANamaCloudBackupPrepare) (lists the backup folders for the backup check) | Used For Checking Backups On Google Drive |

The entity flows take the file's **code** (or ID) as a parameter and refuse to save the task if the
file cannot be found, is not authorised, or lacks the option they need.

## Messages you may see

None of these messages has an Arabic text, so they appear in English on Arabic screens too.

| Message | Why | What to do |
|---|---|---|
| *You must at least check one option {0}, {1}, or {2}* | None of the three **Used For** options is ticked. | Tick the option you need. |
| *The OAuthFile {0} is not authorized, please open the file and click on Start OAuth* | Saving Global Config with an email row whose OAuth file has not been authorised. | Open the file and press **Start OAuth Flow**. |
| *You must select the option {0} in the OAuthFile {1}* | The email row's OAuth file does not have **Used For Sending Emails From Gmail** ticked. | Tick it, save, and authorise the file again (changing an option drops the grant). |
| *The OAuthFile {0} user email is {1}, and the provided user is {2}. They must match* | The email row's **Username** is not the Google account that signed in. | Correct the username, or sign in again with the right account. |
| *Could not find an OAuthFile with the code {0}* | An entity flow parameter names a file code that does not exist. | Fix the code in the task's parameters. |
| *The OAuthFile {0} is not authenticated correctly, please open the file and click on Start OAuth Flow* | The entity flow's file is not authorised. | Authorise the file. |
| *You must select Used For Checking Backups On Google Drive in the OAuth FIle {0}* | The backup check uses a file without the Drive-reading option. | Tick the option, save, and authorise again. |
| *You must select Used For Emptying Trash of Google Drive Account in the OAuth FIle {0}* | The task empties the trash, or refreshes the token, with a file that lacks this option. | Tick the option, save, and authorise again. |
| *OAuth refresh token has expired for file {0}. Please open the OAuthFile and click 'Start OAuth Flow' to re-authenticate.* | Google refused to renew the grant. | Authorise the file again. |
| *OAuth authentication failed for file {0}. The refresh token has expired or been revoked. Please open the OAuthFile and click 'Start OAuth Flow' to re-authenticate.* | Same cause, raised during the sign-in itself. | Authorise the file again. |
