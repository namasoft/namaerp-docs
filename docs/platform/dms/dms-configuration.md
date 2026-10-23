---
entities: [ConfigEntry]
menu: Administration → Settings → System Settings
---

# Settings and Integration

Document Management has only three settings of its own. Everything else that shapes how it
behaves — where files are stored, how scanning works, who may see what — is shared with the rest
of the system, and this page points you at the right place for each.

## The Licence

All seven DMS screens are gated behind a single licence code, `basic-dms`. If the **Document
Management System** section is missing from the Basic menu, or the screens report that the entity
is not licensed, that is the cause. The compressed-file loader is the newest of the seven; a very
old licence file may cover the other six without it.

## The Three DMS Settings

All three live in the [global configuration](/platform/global-config/), on two different tabs.

### Add Related Archive Docs To

**إضافة المستندات الارشيفية إلي** — on the **Entities Screens** tab.

A grid of entity types. Every type you list gains a **DMS Documents / مستندات أرشيفية** page on
its edit screen, listing the archived documents that belong to that record.

It arrives pre-filled with **Employee, Supplier, Customer, Fixed Asset** and **Third Party** —
which are, not coincidentally, exactly the five types that a document's owner may be. Add a type
only if documents can genuinely be owned by it.

::: tip It only applies to the default screen layout
The extra page is added to the standard layout. A screen that has been replaced with a custom
named layout will not receive it — you have to add the list to that layout yourself.
:::

### Filter Folders By Location in DMS Documents

**فلترة المجلدات حسب الأرشيف في المستندات الأرشيفية** — on the **Entities Screens** tab, in the
Screens Additions group. Off by default.

The folder picker on a document always hides folders that do not accept elements. Turn this on and
it additionally hides folders whose default archive is not the archive already chosen on the
document.

Useful when several branches keep parallel folder trees in their own archives and you want people
to see only the tree for the archive they are working in. Confusing if your folders do not have
default archives set — the picker will simply come up empty.

### Create DMS Doc In Pop Up Window

**إنشاء المستند الارشيفي في شاشة منبثقة** — on the **Appearance** tab, in the Popups And Editors
group. **On by default.**

Controls the **Create Archive** action described below: on, the new document opens in a popup over
the record you started from; off, the system navigates to the full document screen and you lose
your place.

## Storage, Scanning and Previews

DMS files are ordinary Nama attachments, so everything on the
[Attachments and Storage](/platform/global-config/global-config-attachments.md) tab applies to
them. The settings that matter most for an archive:

| Setting | Why it matters for DMS |
|---|---|
| **Externalize Attachments** | Keeps scans on the file system instead of inside the database. Worth turning on before a bulk load — an archive of scans will bloat a database quickly. |
| **External Attachments Folder** | Where those files land. Point your backups at it. |
| **Create Attachment Preview and Thumbnail** | Generates the preview renditions that let people read a scan without downloading it. Needs the Documents Converter settings on the same tab to be filled in. |
| **Disk Space Monitoring** | Point it at the attachments folder. An archive fills a volume steadily and silently. |
| **Scanner App / Scanner Profile** | The scan-straight-into-an-attachment path — the natural way to get paper into DMS. |
| **Allow Downloading Attachment Without Authentication** | Turning this on makes attachment downloads public to anyone with the link. Think carefully before enabling it on an archive of contracts and identity documents. |

Allowed file extensions are **not** a global setting. They are configured per attachment field in
[Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-field-appearance.md),
where the default is to allow everything. That is also where you mark an attachment field as a
scanner field so it gets its own scan button.

## Security

There is no DMS-specific permission system — no per-folder or per-topic access control. DMS relies
on ordinary [security profiles](/platform/security/security-profiles.md), which is usually enough:

- **Standard privileges** per screen — who may add, update, delete, view or print archived
  documents and movements.
- **Action privileges** — including the buttons described in these pages, such as Copy To and the
  two bulk-import actions.
- **Field-level security** — for instance leaving the position fields editable while making the
  attached scan read-only.
- **Page and list-view security** — enough to hide the DMS Documents page from roles that should
  not see it.
- **Row filters** — the closest thing to per-folder access control. A filter on the document's
  folder path or archive restricts a profile to one branch of the tree.

Remember that the document state restricts nothing, so a profile that can edit documents can edit
disposed ones too.

## Reaching DMS from Other Screens

Two actions appear in the **More** menu of any record whose type is an allowed document owner:

- **Create Archive / إنشاء مستند ارشيفي** — creates a new archived document with the current record
  already set as its owner. Honours the popup setting above.
- **DMS Documents Archive / أرشيف المستندات** — opens the list of documents belonging to this
  record, matching on the header owner *or* any row of the multi-owner grid.

Both disappear when the DMS licence is absent. Adding the entity type to **Add Related Archive
Docs To** gives you the same list as a permanent page rather than a menu action.

## Integration

Every DMS entity has a standard web service, so archived documents can be created, updated and
read from outside the system like any other record — through the ordinary SOAP services or the
[REST API](/integration/nama-erp-api#Uploading-and-Attaching-Files): upload the scan with
`/erp/rest/v1/upload`, then save the document with `/erp/rest/v1/DMSDocument/save`.

The point worth knowing is that **the file travels with the record**. A document's attached scan is
part of the same create-or-update call as its metadata, so one round trip registers a document and
uploads its file together. Reading a file back is a separate call, whose behaviour depends on the
authentication setting mentioned above.

For loading an existing archive, the two bulk operations behind the
[ZIP loader](/platform/dms/dms-bulk-import.md) are also exposed as services — unpack an uploaded
archive into staging rows, then turn those rows into documents. Note the limits described on that
page before building anything on top of them.
